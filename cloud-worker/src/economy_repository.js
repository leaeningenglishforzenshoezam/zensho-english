// Internal draft repository, NOT imported by Worker index.js.
import {emptyEconomy,validateState,planDraw} from './economy.js';
const opPattern=/^[A-Za-z0-9_-]{16,80}$/;
function requestJson(command){
 if(!command||typeof command!=='object'||Array.isArray(command)||Object.keys(command).length!==3||command.type!=='draw'||!['gear','skills'].includes(command.kind)||![1,10].includes(command.count))throw Error('invalid_command');
 return JSON.stringify({type:'draw',kind:command.kind,count:command.count});
}
async function receipt(db,userId,operationId){return db.prepare('SELECT request_json,result_json,expected_revision FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,operationId).first();}
function replay(row,json){if(row.request_json!==json)throw Error('operation_id_reused');return {replayed:true,revision:row.expected_revision+1,result:JSON.parse(row.result_json)};}
export async function readEconomy(db,userId){
 const row=await db.prepare('SELECT revision,state_json FROM economy_accounts WHERE user_id=?').bind(userId).first();
 return row?{revision:row.revision,state:validateState(JSON.parse(row.state_json))}:{revision:0,state:emptyEconomy()};
}
// userId must be obtained from authenticateSession. No userId in request payload.
// Caller must also enforce the feature gate, rate limit and bounded JSON input.
export async function executeDraw(db,userId,operationId,expectedRevision,command,rng){
 if(typeof userId!=='string'||!userId||(typeof operationId!=='string'||!opPattern.test(operationId))||!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw Error('invalid_operation');
 const json=requestJson(command),old=await receipt(db,userId,operationId);if(old)return replay(old,json);
 const current=await readEconomy(db,userId);if(current.revision!==expectedRevision)throw Error('economy_revision_conflict');
 const planned=planDraw(current.state,command.kind,command.count,rng);
 try{
  await db.batch([
   db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?) ON CONFLICT(user_id) DO NOTHING').bind(userId,JSON.stringify(emptyEconomy())),
   db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)').bind(userId,operationId,json,expectedRevision,JSON.stringify(planned.next),JSON.stringify(planned.result))
  ]);
 }catch(error){
  // A lost response or concurrent identical request returns the originally persisted result.
  const committed=await receipt(db,userId,operationId);if(committed)return replay(committed,json);
  if((await readEconomy(db,userId)).revision!==expectedRevision)throw Error('economy_revision_conflict');
  throw error;
 }
 return {replayed:false,revision:expectedRevision+1,result:planned.result};
}
