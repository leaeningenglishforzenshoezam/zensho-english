// Explicit draft-only lifecycle operations, not arbitrary client snapshot writes.
import {validateSnapshot} from './validation.js';
import {readMissionLearning} from './mission_learning.js';
import {readCompanionCollection} from './mission_companion_sync.js';
import {STAGE_ORDER,names,getDefaultCurrent,determinePendingEvolution,getImageFor} from './data/mission-growth-rules.js';
const currentKey='zensho_goimon_current_v4_lv1',archiveKey='zensho_goimon_archive_v4_lv1',dexKey='zensho_goimon_dex_discovery_v2_lv1';
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
export function projectCompanionAction(snapshot,action,targetId,now=Date.now(),newId='goimon_'+crypto.randomUUID()){
 validateSnapshot(snapshot);if(!['evolve','new-generation'].includes(action))throw Error('invalid_request');
 const next=structuredClone(snapshot);let collection;
 try{collection=readCompanionCollection(next);}catch{throw Error('invalid_growth_record');}
 const {current:g,archive,byId}=collection;if(g.id!==targetId)throw Error('growth_target_mismatch');
 if(!Number.isSafeInteger(now)||now<0)throw Error('invalid_growth_record');
 if(action==='evolve'){
  if(g.specialRoute!==undefined&&g.specialRoute!==''&&!['mr_uno','q7_special','q8_special','q10_special'].includes(g.specialRoute))throw Error('invalid_growth_record');
  // Ignore client-stored candidate fields: recompute from the saved abilities.
  determinePendingEvolution(g);if(!g.pendingEvolution)throw Error('evolution_not_ready');
  if(Object.hasOwn(g,'discoveredForms')&&(!Array.isArray(g.discoveredForms)||!g.discoveredForms.every(s=>STAGE_ORDER.includes(s))))throw Error('invalid_growth_record');
  if(Object.hasOwn(g,'evolutionHistory')&&(!Array.isArray(g.evolutionHistory)||!g.evolutionHistory.every(object)))throw Error('invalid_growth_record');
  g.discoveredForms??=[g.stage];g.evolutionHistory??=[{stage:g.stage,type:g.type,imageKey:getImageFor(g.type,g.stage),label:names[g.type][g.stage]}];
  g.stage=g.pendingStage;g.type=g.pendingType;g.imageKey=g.pendingImageKey;
  g.pendingEvolution=false;g.pendingStage='';g.pendingType='';g.pendingImageKey='';
  if(!g.discoveredForms.includes(g.stage))g.discoveredForms.push(g.stage);
  g.evolutionHistory.push({stage:g.stage,type:g.type,imageKey:g.imageKey,label:names[g.type][g.stage]});g.updatedAt=now;
  let dex={};try{if(Object.hasOwn(next.data,dexKey))dex=JSON.parse(next.data[dexKey]);}catch{throw Error('invalid_growth_record');}
  if(!object(dex)||!Object.values(dex).every(v=>typeof v==='boolean'))throw Error('invalid_growth_record');
  dex[g.type+':'+g.stage]=true;next.data[dexKey]=JSON.stringify(dex);next.data[currentKey]=JSON.stringify(g);
 }else{
  if(archive.length>=15)throw Error('companion_archive_full');
  const generation=g.generation===undefined?1:g.generation;
  if(!Number.isSafeInteger(generation)||generation<1||!Number.isSafeInteger(generation+1)||typeof newId!=='string'||!newId||byId.has(newId))throw Error('invalid_growth_record');
  // Preserve the old individual byte-for-field, including growth and history.
  archive.unshift(g);const egg=getDefaultCurrent();egg.id=newId;egg.generation=generation+1;egg.createdAt=now;egg.updatedAt=now;
  next.data[archiveKey]=JSON.stringify(archive);next.data[currentKey]=JSON.stringify(egg);
 }
 validateSnapshot(next);return next;
}
export async function applyCompanionAction(db,userId,{operationId,expectedRevision,action,targetId}){
 if(typeof userId!=='string'||!userId)throw Error('unauthorized');
 if(typeof operationId!=='string'||!/^[A-Za-z0-9_-]{16,80}$/.test(operationId))throw Error('invalid_operation');
 if(!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw Error('invalid_revision');
 if(!['evolve','new-generation'].includes(action)||typeof targetId!=='string'||!targetId||targetId.length>200)throw Error('invalid_request');
 const request=JSON.stringify({expectedRevision,action,targetId}),digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(request))),n=>n.toString(16).padStart(2,'0')).join('');
 const receipt=()=>db.prepare('SELECT request_hash,applied_revision FROM mission_companion_receipts WHERE user_id=? AND operation_id=?').bind(userId,operationId).first();
 const replay=async r=>{
  if(r.request_hash!==digest)throw Error('operation_id_reused');
  const state=await readMissionLearning(db,userId);let snapshot=state.revision===r.applied_revision?state.snapshot:null;
  if(!snapshot){const row=await db.prepare('SELECT save_json FROM save_revisions WHERE user_id=? AND revision=?').bind(userId,r.applied_revision).first();if(!row)throw Error('sync_ack_unavailable');snapshot=JSON.parse(row.save_json);}
  return {replayed:true,revision:r.applied_revision,snapshot};
 };
 const old=await receipt();if(old)return replay(old);
 const state=await readMissionLearning(db,userId);if(state.revision!==expectedRevision)throw Error('learning_revision_conflict');
 const next=projectCompanionAction(state.snapshot,action,targetId),json=validateSnapshot(next);
 try{await db.batch([
  db.prepare('INSERT INTO mission_companion_receipts(user_id,operation_id,request_hash,applied_revision) VALUES (?,?,?,?)').bind(userId,operationId,digest,expectedRevision+1),
  db.prepare('INSERT OR IGNORE INTO save_revisions(user_id,revision,schema_version,save_json) SELECT user_id,revision,schema_version,save_json FROM saves WHERE user_id=?').bind(userId),
  db.prepare("UPDATE saves SET revision=?,save_json=?,updated_at=datetime('now') WHERE user_id=?").bind(expectedRevision+1,json,userId)
 ]);}catch(error){const saved=await receipt();if(saved)return replay(saved);if((await readMissionLearning(db,userId)).revision!==expectedRevision)throw Error('learning_revision_conflict');throw error;}
 return {replayed:false,revision:expectedRevision+1,snapshot:next};
}
