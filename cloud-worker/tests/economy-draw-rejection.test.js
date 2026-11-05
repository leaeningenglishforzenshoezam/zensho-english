import test from 'node:test';
import assert from 'node:assert/strict';
import {createOfflineDb} from './offline-db.js';
import {emptyEconomy} from '../src/economy.js';
import {executeDraw,readEconomy} from '../src/economy_repository.js';
const command={type:'draw',kind:'gear',count:1};

test('draw rejection proves stale revision or insufficient balance, never future revision or generic failure',async()=>{
 const h=await createOfflineDb();try{
  const db=h.db,id='local-test',op='rejected_operation_001';
  await assert.rejects(executeDraw(db,id,op,0,command),e=>e.message==='insufficient_shards'&&e.drawRejection.operationId===op&&e.drawRejection.expectedRevision===0);
  await assert.rejects(executeDraw(db,id,op,5,command),e=>e.message==='economy_revision_conflict'&&!e.drawRejection);
  await db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?)').bind(id,JSON.stringify({...emptyEconomy(),shards:100})).run();
  await executeDraw(db,id,'accepted_operation_001',0,command,()=>0);
  await assert.rejects(executeDraw(db,id,op,0,command),e=>e.message==='economy_revision_conflict'&&e.drawRejection.operationId===op);
  await assert.rejects(executeDraw(db,id,op,1,command,()=>{throw Error('random_failed');}),e=>e.message==='random_failed'&&!e.drawRejection);
  assert.equal((await readEconomy(db,id)).state.shards,90);
 }finally{h.close();}
});

test('identical request committing between receipt lookup and revision read returns its receipt, not rejection',async()=>{
 const h=await createOfflineDb();try{
  const db=h.db,id='local-test',op='concurrent_operation_001';
  await db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?)').bind(id,JSON.stringify({...emptyEconomy(),shards:100})).run();
  let intercepted=false,original;
  const race={...db,prepare(sql){return {bind(...args){const statement=db.prepare(sql).bind(...args);
   if(sql.startsWith('SELECT request_json,result_json,expected_revision')&&!intercepted){intercepted=true;return {...statement,async first(){original=await executeDraw(db,id,op,0,command,()=>0);return null;}};}
   return statement;
  }};}};
  const result=await executeDraw(race,id,op,0,command,()=>{throw Error('must_not_reroll');});
  assert.equal(result.replayed,true);assert.deepEqual(result.result,original.result);
  assert.equal((await readEconomy(db,id)).revision,1);assert.equal((await readEconomy(db,id)).state.shards,90);
 }finally{h.close();}
});
