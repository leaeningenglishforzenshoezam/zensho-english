import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {createOfflineDb} from './offline-db.js';import {saveLoadout,readLoadouts} from '../src/economy_loadouts.js';import {emptyEconomy} from '../src/economy.js';
import release from '../src/mission_release.js';import {createSession} from '../src/session.js';
test('server loadouts: both grades share copies, replay is safe, stale devices and unknown owners fail',async()=>{
 const h=await createOfflineDb();try{
  const sql=await readFile(new URL('../migrations/0010_economy_loadouts.sql',import.meta.url),'utf8');for(const s of sql.match(/CREATE TABLE[\s\S]*?;|CREATE TRIGGER[\s\S]*?\nEND;/g))await h.db.prepare(s).run();
  const snapshot=JSON.stringify({schemaVersion:1,data:{zensho_goimon_current_v4_lv1:JSON.stringify({id:'pet1'}),zensho_goimon_current_v4_lv2:JSON.stringify({id:'pet2'})}});
  await h.db.prepare('INSERT INTO saves(user_id,save_json) VALUES (?,?)').bind('local-test',snapshot).run();
  const economy={...emptyEconomy(),shards:50,owned:{gear:{N_hp:1},skills:{N_echo:1}}};
  await h.db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?)').bind('local-test',JSON.stringify(economy)).run();
  const p={operationId:'loadout_operation_01',expectedRevision:0,level:'1',goimonId:'pet1',gearId:'N_hp',skillIds:['N_echo',null,null,null]};
  const first=await saveLoadout(h.db,'local-test',p);assert.equal(first.revision,1);
  assert.equal((await saveLoadout(h.db,'local-test',p)).replayed,true);
  await assert.rejects(saveLoadout(h.db,'local-test',{...p,gearId:null}),/operation_id_reused/);
  await assert.rejects(saveLoadout(h.db,'local-test',{...p,operationId:'loadout_operation_02'}),/revision_conflict/);
  const q={...p,operationId:'loadout_operation_02',expectedRevision:1,level:'2',goimonId:'pet2'};
  await assert.rejects(saveLoadout(h.db,'local-test',q),/inventory_exceeded/);
  await assert.rejects(saveLoadout(h.db,'local-test',{...q,goimonId:'other'}),/owner_missing/);
  await assert.rejects(saveLoadout(h.db,'local-test',{...q,skillIds:['N_echo','N_echo',null,null]}),/invalid_loadout/);
  await saveLoadout(h.db,'local-test',{...p,operationId:'loadout_operation_03',expectedRevision:1,gearId:null,skillIds:[null,null,null,null]});
  await saveLoadout(h.db,'local-test',{...q,expectedRevision:2});
  const result=await readLoadouts(h.db,'local-test');assert.equal(result.loadouts['2'].pet2.gearId,'N_hp');assert.equal(result.loadouts['1'].pet1.gearId,null);
  assert.equal((await h.db.prepare('SELECT save_json FROM saves WHERE user_id=?').bind('local-test').first()).save_json,snapshot);
  assert.equal((await h.db.prepare('SELECT state_json FROM economy_accounts WHERE user_id=?').bind('local-test').first()).state_json,JSON.stringify(economy));
  assert.deepEqual((await readLoadouts(h.db,'another')).loadouts,{'1':{},'2':{}});
  const session=await createSession(h.db,'local-test'),limiter={limit:async()=>({success:true})};
  const env={DB:h.db,ALLOWED_ORIGIN:'https://page.test',MISSION_RELEASE_ENABLED:'true',ECONOMY_LOADOUTS_ENABLED:'true',RATE_LIMITER:limiter,AUTH_RATE_LIMITER:limiter};
  const get=(overrides={},headers={})=>release.fetch(new Request('https://api.test/api/v1/economy/loadouts',{headers:{Origin:env.ALLOWED_ORIGIN,Authorization:'Bearer '+session.token,...headers}}),{...env,...overrides});
  assert.equal((await get({ECONOMY_LOADOUTS_ENABLED:'false'})).status,404);
  assert.equal((await get({}, {Authorization:''})).status,401);
  assert.equal((await get({}, {Origin:'https://wrong.test'})).status,403);
  const restored=await get();assert.equal(restored.status,200);assert.deepEqual((await restored.json()).loadouts,result.loadouts);
  const batch=h.db.batch;
  h.db.batch=async statements=>{await h.db.prepare('UPDATE saves SET revision=revision+1 WHERE user_id=?').bind('local-test').run();return batch(statements);};
  await assert.rejects(saveLoadout(h.db,'local-test',{...q,operationId:'loadout_operation_04',expectedRevision:3,gearId:null,skillIds:[null,null,null,null]}),/learning_revision_conflict/);
  assert.deepEqual(await readLoadouts(h.db,'local-test'),result);
 }finally{h.close();}
});
