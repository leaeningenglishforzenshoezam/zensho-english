import {emptyEconomy,validateState} from './economy.js';
import {readEconomy} from './economy_repository.js';
const operationId='legacy_import_once_v1';
function payloadJson(payload){
 if(!payload||Object.keys(payload).length!==3||payload.version!==1||typeof payload.backup!=='string'||payload.backup.length>250000)throw Error('invalid_import');
 validateState(payload.assets);
 // Backup is retained verbatim and never executed, merged into learning, or trusted as a grant.
 return JSON.stringify({version:1,assets:payload.assets,backup:payload.backup});
}
async function digest(value){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),x=>x.toString(16).padStart(2,'0')).join('');}
export async function stageLegacyImport(db,userId,payload){
 const json=payloadJson(payload),hash=await digest(json);
 await db.prepare('INSERT INTO economy_legacy_imports(user_id,payload_hash,payload_json) VALUES (?,?,?) ON CONFLICT(user_id) DO NOTHING').bind(userId,hash,json).run();
 const row=await db.prepare('SELECT payload_hash,approved_hash FROM economy_legacy_imports WHERE user_id=?').bind(userId).first();
 if(row.payload_hash!==hash)throw Error('import_snapshot_conflict');
 return {hash,approved:row.approved_hash===hash};
}
export async function applyApprovedLegacyImport(db,userId,hash){
 if(typeof hash!=='string'||!/^\w{64}$/.test(hash))throw Error('invalid_import');
 const row=await db.prepare('SELECT payload_hash,payload_json,approved_hash FROM economy_legacy_imports WHERE user_id=?').bind(userId).first();
 if(!row||row.payload_hash!==hash||row.approved_hash!==hash)throw Error('import_not_approved');
 const receipt=()=>db.prepare('SELECT result_json FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,operationId).first();
 const prior=await receipt();if(prior)return {replayed:true,...JSON.parse(prior.result_json)};
 const p=JSON.parse(row.payload_json);payloadJson(p);
 const current=await readEconomy(db,userId);
 if(current.revision!==0||current.state.shards!==0||Object.values(current.state.owned).some(inv=>Object.values(inv).some(n=>n!==0)))throw Error('import_target_not_empty');
 const result={hash,revision:1};
 try{
  await db.batch([
   db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?) ON CONFLICT(user_id) DO NOTHING').bind(userId,JSON.stringify(emptyEconomy())),
   db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)').bind(userId,operationId,JSON.stringify({type:'legacy_import',hash}),0,JSON.stringify(p.assets),JSON.stringify(result))
  ]);
 }catch(error){const saved=await receipt();if(saved)return {replayed:true,...JSON.parse(saved.result_json)};throw error;}
 return {replayed:false,...result};
}
