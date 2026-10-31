import test from 'node:test';
import assert from 'node:assert/strict';
import {createOfflineDb} from './offline-db.js';
import {createSession} from '../src/session.js';
import {emptyEconomy} from '../src/economy.js';
import {readEconomy} from '../src/economy_repository.js';
import release from '../src/mission_release.js';

test('gacha API: explicit gates, session ownership, bounded input, replay and stale-device protection',async()=>{
 const h=await createOfflineDb();
 try{
  const db=h.db,session=await createSession(db,'local-test');
  const limiter={limit:async()=>({success:true})};
  const env={DB:db,ALLOWED_ORIGIN:'https://pages.test',MISSION_RELEASE_ENABLED:'true',ECONOMY_DRAW_ENABLED:'true',RATE_LIMITER:limiter,AUTH_RATE_LIMITER:limiter};
  const state={...emptyEconomy(),shards:100};
  await db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?)').bind('local-test',JSON.stringify(state)).run();
  await db.prepare('INSERT INTO saves(user_id,save_json) VALUES (?,?)').bind('local-test','{"learning":"unchanged"}').run();
  const payload={operationId:'draw_operation_000001',expectedRevision:0,kind:'skills',count:3};
  const call=(p=payload,overrides={},headers={},method='POST')=>release.fetch(new Request('https://api.test/api/v1/economy/draw',{method,headers:{Origin:env.ALLOWED_ORIGIN,Authorization:'Bearer '+session.token,'Content-Type':'application/json',...headers},...(method==='POST'?{body:JSON.stringify(p)}:{})}),{...env,...overrides});
  assert.equal((await call(payload,{MISSION_RELEASE_ENABLED:'false'})).status,404);
  assert.equal((await call(payload,{ECONOMY_DRAW_ENABLED:'false'})).status,404);
  assert.equal((await call(payload,{}, {Origin:'https://other.test'})).status,403);
  assert.equal((await call(payload,{}, {Authorization:''})).status,401);
  assert.equal((await call(payload,{}, {},'GET')).status,405);
  assert.equal((await call(payload,{RATE_LIMITER:null})).status,503);
  assert.equal((await call(payload,{RATE_LIMITER:{limit:async()=>({success:false})}})).status,429);
  assert.equal((await call({...payload,userId:'another-user'})).status,400);
  assert.equal((await call({...payload,count:11})).status,400);
  assert.equal((await call({...payload,count:'3'})).status,400);
  assert.equal((await call({...payload,extra:'x'.repeat(5000)})).status,413);
  assert.deepEqual((await readEconomy(db,'local-test')).state,state);
  const first=await call();assert.equal(first.status,200);const result=await first.json();
  assert.equal(result.result.items.length,3);assert.equal(result.result.cost,30);
  const replay=await (await call()).json();assert.equal(replay.replayed,true);assert.deepEqual(replay.result,result.result);
  assert.equal((await readEconomy(db,'local-test')).state.shards,70);
  assert.equal((await call({...payload,count:2})).status,409);
  assert.equal((await call({...payload,operationId:'draw_operation_000002'})).status,409);
  assert.equal((await call({...payload,operationId:'draw_operation_000002',expectedRevision:1,count:10})).status,409);
  assert.equal((await readEconomy(db,'local-test')).state.shards,70);
  await db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind('other','other').run();
  const other=await createSession(db,'other');
  assert.equal((await call({...payload,expectedRevision:0},{},{Authorization:'Bearer '+other.token})).status,409);
  assert.equal((await readEconomy(db,'other')).state.shards,0);
  assert.equal((await db.prepare('SELECT save_json FROM saves WHERE user_id=?').bind('local-test').first()).save_json,'{"learning":"unchanged"}');
 }finally{h.close();}
});
