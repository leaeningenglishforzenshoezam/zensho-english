import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createOfflineDb} from './offline-db.js';
import {autoImportLegacy} from '../src/economy_import.js';
import {importLegacyLoadouts,readLoadouts,saveLoadout} from '../src/economy_loadouts.js';
import release from '../src/mission_release.js';
import {createSession} from '../src/session.js';

async function setup(loadouts){
 const h=await createOfflineDb();
 for(const file of ['0009_economy_legacy_imports.sql','0010_economy_loadouts.sql']){
  const sql=await readFile(new URL('../migrations/'+file,import.meta.url),'utf8');
  for(const s of sql.match(/CREATE TABLE[\s\S]*?;|CREATE TRIGGER[\s\S]*?\nEND;/g))await h.db.prepare(s).run();
 }
 const snapshot=JSON.stringify({schemaVersion:1,data:{zensho_goimon_current_v4_lv1:JSON.stringify({id:'pet1'}),zensho_goimon_current_v4_lv2:JSON.stringify({id:'pet2'})}});
 await h.db.prepare('INSERT INTO saves(user_id,save_json) VALUES (?,?)').bind('local-test',snapshot).run();
 const assets={version:1,shards:30,owned:{gear:{N_hp:1},skills:{N_echo:1}}};
 await autoImportLegacy(h.db,'local-test',{version:1,assets,backup:JSON.stringify({schemaVersion:2,loadouts})});
 return {...h,snapshot,assets};
}
const slots=()=>({gearId:'N_hp',skillIds:['N_echo',null,null,null],updatedAt:1793458800000});
test('legacy loadouts import once from accepted wallet snapshot; edits and learning survive retry',async()=>{
 const h=await setup({'1':{pet1:slots()},'2':{}});try{
  const first=await importLegacyLoadouts(h.db,'local-test');assert.equal(first.revision,1);assert.equal(first.loadouts['1'].pet1.gearId,'N_hp');
  assert.deepEqual(await importLegacyLoadouts(h.db,'local-test'),first);
  await saveLoadout(h.db,'local-test',{operationId:'loadout_update_after_import',expectedRevision:1,level:'1',goimonId:'pet1',gearId:null,skillIds:[null,null,null,null]});
  const restored=await importLegacyLoadouts(h.db,'local-test');assert.equal(restored.revision,2);assert.equal(restored.loadouts['1'].pet1.gearId,null);
  assert.equal((await h.db.prepare('SELECT save_json FROM saves WHERE user_id=?').bind('local-test').first()).save_json,h.snapshot);
  assert.deepEqual(JSON.parse((await h.db.prepare('SELECT state_json FROM economy_accounts WHERE user_id=?').bind('local-test').first()).state_json),h.assets);
 }finally{h.close();}
});
test('legacy loadout import rejects excess copies and missing pets without partial changes',async()=>{
 for(const [loadouts,error]of [[{'1':{pet1:slots()},'2':{pet2:slots()}},/inventory_exceeded/],[{'1':{missing:slots()},'2':{}},/owner_missing/]]){
  const h=await setup(loadouts);try{await assert.rejects(importLegacyLoadouts(h.db,'local-test'),error);assert.equal((await readLoadouts(h.db,'local-test')).revision,0);}finally{h.close();}
 }
});
test('legacy loadout import rolls back if learning changes during commit',async()=>{
 const h=await setup({'1':{pet1:slots()},'2':{}});try{
  const batch=h.db.batch;h.db.batch=async s=>{await h.db.prepare('UPDATE saves SET revision=revision+1 WHERE user_id=?').bind('local-test').run();return batch(s);};
  await assert.rejects(importLegacyLoadouts(h.db,'local-test'),/learning_revision_conflict/);
  assert.equal((await readLoadouts(h.db,'local-test')).revision,0);
 }finally{h.close();}
});
test('concurrent imports share one revision; HTTP import is authenticated, gated and accepts no replacement payload',async()=>{
 const h=await setup({'1':{pet1:slots()},'2':{}});try{
  const [a,b]=await Promise.all([importLegacyLoadouts(h.db,'local-test'),importLegacyLoadouts(h.db,'local-test')]);assert.equal(a.revision,1);assert.equal(b.revision,1);
  await assert.rejects(importLegacyLoadouts(h.db,'unknown'),/import_unavailable/);
  const session=await createSession(h.db,'local-test'),limiter={limit:async()=>({success:true})};
  const env={DB:h.db,ALLOWED_ORIGIN:'https://page.test',MISSION_RELEASE_ENABLED:'true',ECONOMY_LOADOUTS_ENABLED:'true',RATE_LIMITER:limiter,AUTH_RATE_LIMITER:limiter};
  const send=(payload={},overrides={},headers={})=>release.fetch(new Request('https://api.test/api/v1/economy/loadouts/import',{method:'POST',headers:{Origin:env.ALLOWED_ORIGIN,Authorization:'Bearer '+session.token,'Content-Type':'application/json',...headers},body:JSON.stringify(payload)}),{...env,...overrides});
  assert.equal((await send({}, {ECONOMY_LOADOUTS_ENABLED:'false'})).status,404);
  assert.equal((await send({}, {},{Authorization:''})).status,401);
  assert.equal((await send({}, {},{Origin:'https://other.test'})).status,403);
  assert.equal((await send({loadouts:{}})).status,400);
  const response=await send();assert.equal(response.status,200);assert.deepEqual(await response.json(),a);
 }finally{h.close();}
});
