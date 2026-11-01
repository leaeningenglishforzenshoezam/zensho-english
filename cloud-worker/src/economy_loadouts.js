import catalog from '../../battle-prototype/catalog.js';
import {readEconomy} from './economy_repository.js';
const empty=()=>({'1':{},'2':{}});
const id=x=>typeof x==='string'&&/^[A-Za-z0-9_-]{1,96}$/.test(x)&&!['__proto__','prototype','constructor'].includes(x);
export async function readLoadouts(db,userId){
 const row=await db.prepare('SELECT revision,state_json FROM economy_loadouts WHERE user_id=?').bind(userId).first();
 return row?{revision:row.revision,loadouts:JSON.parse(row.state_json)}:{revision:0,loadouts:empty()};
}
function owners(snapshot){
 const result={};
 try{for(const level of ['1','2']){
  const current=JSON.parse(snapshot.data?.['zensho_goimon_current_v4_lv'+level]||'null');
  const archive=JSON.parse(snapshot.data?.['zensho_goimon_archive_v4_lv'+level]||'[]');
  if(!Array.isArray(archive))throw Error();const pets=[current,...archive].filter(Boolean);
  if(pets.some(p=>!id(p.id))||new Set(pets.map(p=>p.id)).size!==pets.length)throw Error();
  result[level]=new Set(pets.map(p=>p.id));
 }}catch{throw Error('invalid_growth_record');}return result;
}
// Import only the immutable snapshot already accepted for this account's wallet.
// A second device cannot supply another set, and an edited registry is never reset.
export async function importLegacyLoadouts(db,userId){
 const current=await readLoadouts(db,userId);if(current.revision>0)return current;
 const row=await db.prepare('SELECT payload_hash,approved_hash,payload_json FROM economy_legacy_imports WHERE user_id=?').bind(userId).first();
 const imported=await db.prepare('SELECT result_json FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,'legacy_import_once_v1').first();
 if(!row||row.payload_hash!==row.approved_hash||!imported||JSON.parse(imported.result_json).hash!==row.payload_hash)throw Error('loadout_import_unavailable');
 let next;try{
  const backup=JSON.parse(JSON.parse(row.payload_json).backup);
  if(backup.schemaVersion!==2||!backup.loadouts)throw Error();
  next=backup.loadouts;
  if(Object.keys(next).length!==2||!['1','2'].every(n=>next[n]&&typeof next[n]==='object'&&!Array.isArray(next[n])))throw Error();
 }catch{throw Error('invalid_loadout');}
 const learned=await db.prepare('SELECT revision,save_json FROM saves WHERE user_id=?').bind(userId).first();
 const live=owners(learned?JSON.parse(learned.save_json):{}),economy=await readEconomy(db,userId),used={gear:{},skills:{}};
 for(const grade of ['1','2']){
  if(Object.keys(next[grade]).length>128)throw Error('loadout_storage_limit');
  for(const [pet,slots]of Object.entries(next[grade])){
   if(!id(pet)||!live[grade].has(pet))throw Error('loadout_owner_missing');
   if(!slots||!Object.keys(slots).every(k=>['gearId','skillIds','updatedAt'].includes(k))||!(slots.gearId===null||catalog.gear.some(x=>x.id!=='none'&&x.id===slots.gearId))||!Array.isArray(slots.skillIds)||slots.skillIds.length!==4||slots.skillIds.some(s=>s!==null&&!catalog.skills.some(x=>x.id===s))||new Set(slots.skillIds.filter(Boolean)).size!==slots.skillIds.filter(Boolean).length||('updatedAt' in slots&&(!Number.isSafeInteger(slots.updatedAt)||slots.updatedAt<0)))throw Error('invalid_loadout');
   for(const [kind,items]of [['gear',[slots.gearId]],['skills',slots.skillIds]])for(const item of items.filter(Boolean))used[kind][item]=(used[kind][item]||0)+1;
  }
 }
 for(const kind of ['gear','skills'])for(const [item,n]of Object.entries(used[kind]))if(n>(economy.state.owned[kind][item]||0))throw Error('loadout_inventory_exceeded');
 try{await db.batch([
  db.prepare('INSERT INTO economy_loadouts(user_id,state_json) VALUES (?,?) ON CONFLICT(user_id) DO NOTHING').bind(userId,JSON.stringify(empty())),
  db.prepare('INSERT INTO economy_loadout_receipts(user_id,operation_id,request_json,expected_revision,economy_revision,learning_revision,next_json) VALUES (?,?,?,?,?,?,?)').bind(userId,'legacy_loadout_import_v1',JSON.stringify({hash:row.payload_hash}),0,economy.revision,learned?.revision||0,JSON.stringify(next))
 ]);}catch(e){const latest=await readLoadouts(db,userId);if(latest.revision>0)return latest;throw e;}
 return readLoadouts(db,userId);
}
export async function saveLoadout(db,userId,p){
 if(!p||Object.keys(p).length!==6||!['operationId','expectedRevision','level','goimonId','gearId','skillIds'].every(k=>Object.hasOwn(p,k)))throw Error('invalid_loadout');
 const {operationId,expectedRevision,level,goimonId,gearId,skillIds}=p;
 if(typeof operationId!=='string'||!/^[A-Za-z0-9_-]{16,80}$/.test(operationId)||!Number.isSafeInteger(expectedRevision)||expectedRevision<0||!['1','2'].includes(level)||!id(goimonId))throw Error('invalid_loadout');
 if(!(gearId===null||catalog.gear.some(x=>x.id!=='none'&&x.id===gearId))||!Array.isArray(skillIds)||skillIds.length!==4||skillIds.some(s=>s!==null&&!catalog.skills.some(x=>x.id===s))||new Set(skillIds.filter(Boolean)).size!==skillIds.filter(Boolean).length)throw Error('invalid_loadout');
 const json=JSON.stringify({expectedRevision,level,goimonId,gearId,skillIds});
 const receipt=()=>db.prepare('SELECT request_json,expected_revision,next_json FROM economy_loadout_receipts WHERE user_id=? AND operation_id=?').bind(userId,operationId).first();
 const replay=r=>{if(r.request_json!==json)throw Error('operation_id_reused');return {replayed:true,revision:r.expected_revision+1,loadouts:JSON.parse(r.next_json)};};
 const old=await receipt();if(old)return replay(old);
 const current=await readLoadouts(db,userId);if(current.revision!==expectedRevision)throw Error('loadout_revision_conflict');
 const learned=await db.prepare('SELECT revision,save_json FROM saves WHERE user_id=?').bind(userId).first();
 const live=owners(learned?JSON.parse(learned.save_json):{});
 if(!live[level].has(goimonId))throw Error('loadout_owner_missing');
 const economy=await readEconomy(db,userId),next=structuredClone(current.loadouts);
 next[level][goimonId]={gearId,skillIds:[...skillIds]};
 const used={gear:{},skills:{}};
 for(const grade of ['1','2']){
  if(Object.keys(next[grade]).length>128)throw Error('loadout_storage_limit');
  for(const [pet,slots]of Object.entries(next[grade])){if(!live[grade].has(pet))continue;
   for(const [kind,items]of [['gear',[slots.gearId]],['skills',slots.skillIds]])for(const item of items.filter(Boolean))used[kind][item]=(used[kind][item]||0)+1;
  }
 }
 for(const kind of ['gear','skills'])for(const [item,n]of Object.entries(used[kind]))if(n>(economy.state.owned[kind][item]||0))throw Error('loadout_inventory_exceeded');
 try{await db.batch([
  db.prepare('INSERT INTO economy_loadouts(user_id,state_json) VALUES (?,?) ON CONFLICT(user_id) DO NOTHING').bind(userId,JSON.stringify(empty())),
  db.prepare('INSERT INTO economy_loadout_receipts(user_id,operation_id,request_json,expected_revision,economy_revision,learning_revision,next_json) VALUES (?,?,?,?,?,?,?)').bind(userId,operationId,json,expectedRevision,economy.revision,learned?.revision||0,JSON.stringify(next))
 ]);}catch(e){const r=await receipt();if(r)return replay(r);if((await readLoadouts(db,userId)).revision!==expectedRevision)throw Error('loadout_revision_conflict');throw e;}
 return {replayed:false,revision:expectedRevision+1,loadouts:next};
}
