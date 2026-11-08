// Draft-only three-way synchronization. No production route imports this file.
import {validateSnapshot} from './validation.js';
import {readMissionLearning} from './mission_learning.js';
import {companionSyncConflicts} from './mission_companion_sync.js';
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const absent=Symbol('absent');
export function mergeMissionSnapshot(base,local,remote){
 for(const snapshot of [base,local,remote])validateSnapshot(snapshot);
 const conflicts=[];
 function merge(b,l,r,path){
  if(same(l,b))return r;if(same(r,b))return l;
  // Never graft one individual's stats onto another individual's ID during a
  // stale swap. The whole current companion is conflicting in this situation.
  if(path.length===1&&path[0]==='zensho_goimon_current_v4_lv1'&&object(l)&&object(r)&&(!object(b)||l.id!==b.id||r.id!==b.id)){
   conflicts.push(path);return r;
  }
  // Two changes to the same counter may be independent even if values match.
  // Never guess an additive/max policy for achievements, progress or weak points.
  if(object(l)&&object(r)&&(object(b)||b===absent)){
   const out={};for(const key of new Set([...Object.keys(b===absent?{}:b),...Object.keys(l),...Object.keys(r)])){
    const get=(x,k)=>x!==absent&&Object.hasOwn(x,k)?x[k]:absent;
    const value=merge(get(b,key),get(l,key),get(r,key),[...path,key]);if(value!==absent)out[key]=value;
   }return out;
  }
  conflicts.push(path);return r;
 }
 const data={};for(const key of new Set([...Object.keys(base.data),...Object.keys(local.data),...Object.keys(remote.data)])){
  const parse=s=>Object.hasOwn(s.data,key)?JSON.parse(s.data[key]):absent;
  // bonus-stat is the one non-JSON legacy value.
  const value=key.includes('reorder_bonus_stat')?merge(base.data[key]??absent,local.data[key]??absent,remote.data[key]??absent,[key]):merge(parse(base),parse(local),parse(remote),[key]);
  if(value!==absent)data[key]=key.includes('reorder_bonus_stat')?value:JSON.stringify(value);
 }
 // A restore that falsely uses the current revision as its base must not silently
 // erase cumulative learning counters. Intentional resets need a separate review.
 function checkCounters(previous,next,path){
  if(typeof previous==='number'){
   if(typeof next!=='number'||next<previous)conflicts.push(path);
  }else if(object(previous))for(const [key,value]of Object.entries(previous))checkCounters(value,object(next)?next[key]:undefined,[...path,key]);
 }
 for(const key of Object.keys(remote.data))if(/^zensho_(learning_log|block_global|block_stats)_/.test(key))checkCounters(JSON.parse(remote.data[key]),Object.hasOwn(data,key)?JSON.parse(data[key]):undefined,[key]);
 for(const key of ['dialogueCompletionState_v1','q10ReadingCompletionState_v1']){
  const before=remote.data[key]?JSON.parse(remote.data[key]).rewardedQuestions:null,after=data[key]?JSON.parse(data[key]).rewardedQuestions:null;
  if(object(before))for(const [id,value]of Object.entries(before))if(value===true&&(!object(after)||after[id]!==true))conflicts.push([key,'rewardedQuestions',id]);
 }
 if(conflicts.length)return {ready:false,conflicts};
 const snapshot={schemaVersion:1,data};validateSnapshot(snapshot);return {ready:true,snapshot,conflicts:[]};
}
export async function syncMissionSnapshot(db,userId,{operationId,baseRevision,expectedRevision,snapshot}){
 if(typeof userId!=='string'||!userId)throw Error('unauthorized');
 if(typeof operationId!=='string'||!/^[A-Za-z0-9_-]{16,80}$/.test(operationId))throw Error('invalid_operation');
 if(!Number.isSafeInteger(baseRevision)||baseRevision<0||!Number.isSafeInteger(expectedRevision)||expectedRevision<baseRevision)throw Error('invalid_revision');
 const json=validateSnapshot(snapshot),bytes=new TextEncoder().encode(JSON.stringify({baseRevision,expectedRevision,snapshot:JSON.parse(json)}));
 const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');
 const receipt=()=>db.prepare('SELECT request_hash,applied_revision FROM mission_sync_receipts WHERE user_id=? AND operation_id=?').bind(userId,operationId).first();
 const replay=async r=>{if(r.request_hash!==digest)throw Error('operation_id_reused');
  const current=await readMissionLearning(db,userId);let accepted=current.revision===r.applied_revision?current.snapshot:null;
  if(!accepted){const row=await db.prepare('SELECT save_json FROM save_revisions WHERE user_id=? AND revision=?').bind(userId,r.applied_revision).first();if(!row)throw Error('sync_ack_unavailable');accepted=JSON.parse(row.save_json);}
  return {replayed:true,revision:r.applied_revision,snapshot:accepted};};
 const old=await receipt();if(old)return replay(old);
 const current=await readMissionLearning(db,userId);if(current.revision!==expectedRevision)throw Error('learning_revision_conflict');
 let base;if(baseRevision===current.revision)base=current.snapshot;
 else if(baseRevision===0)base={schemaVersion:1,data:{}};
 else {const saved=await db.prepare('SELECT save_json FROM save_revisions WHERE user_id=? AND revision=?').bind(userId,baseRevision).first();if(!saved)throw Error('sync_base_unavailable');base=JSON.parse(saved.save_json);}
 const plan=mergeMissionSnapshot(base,snapshot,current.snapshot);if(!plan.ready)return {replayed:false,conflict:true,paths:plan.conflicts,revision:current.revision};
 // Allow identity-preserving swaps/nicknames, never generic growth/lifecycle edits.
 const growth=await db.prepare('SELECT 1 AS present FROM mission_growth_receipts WHERE user_id=? UNION ALL SELECT 1 AS present FROM mission_companion_receipts WHERE user_id=? LIMIT 1').bind(userId,userId).first();
 if(growth){
  const paths=companionSyncConflicts(current.snapshot,plan.snapshot);
  if(paths.length)return {replayed:false,conflict:true,paths,revision:current.revision};
 }
 try{await db.batch([
  db.prepare('INSERT INTO mission_sync_receipts(user_id,operation_id,request_hash,applied_revision) VALUES (?,?,?,?)').bind(userId,operationId,digest,current.revision+1),
  db.prepare('INSERT OR IGNORE INTO save_revisions(user_id,revision,schema_version,save_json) SELECT user_id,revision,schema_version,save_json FROM saves WHERE user_id=?').bind(userId),
  db.prepare("INSERT INTO saves(user_id,revision,schema_version,save_json) VALUES (?,?,1,?) ON CONFLICT(user_id) DO UPDATE SET revision=excluded.revision,save_json=excluded.save_json,updated_at=datetime('now')").bind(userId,current.revision+1,validateSnapshot(plan.snapshot))
 ]);}catch(error){const saved=await receipt();if(saved)return replay(saved);if((await readMissionLearning(db,userId)).revision!==expectedRevision)throw Error('learning_revision_conflict');throw error;}
 return {replayed:false,revision:current.revision+1,snapshot:plan.snapshot};
}
