import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {createOfflineDb} from './offline-db.js';import {stageLegacyImport,applyApprovedLegacyImport} from '../src/economy_import.js';import {readEconomy,executeDraw} from '../src/economy_repository.js';import {emptyEconomy} from '../src/economy.js';
import release from '../src/mission_release.js';import {createSession} from '../src/session.js';
import {autoImportLegacy} from '../src/economy_import.js';
test('automatic import accepts first device once, restores second device, and never refills a spent wallet',async()=>{
 const h=await createOfflineDb();try{
  await h.db.prepare(await readFile(new URL('../migrations/0009_economy_legacy_imports.sql',import.meta.url),'utf8')).run();
  const make=n=>({version:1,assets:{...emptyEconomy(),shards:n},backup:'device '+n});
  await Promise.all([autoImportLegacy(h.db,'local-test',make(30)),autoImportLegacy(h.db,'local-test',make(90))]);
  const first=await readEconomy(h.db,'local-test');assert.ok([30,90].includes(first.state.shards));assert.equal(first.revision,1);
  const restored=await autoImportLegacy(h.db,'local-test',make(999));assert.equal(restored.mode,'restore');assert.deepEqual(restored.state,first.state);
  await executeDraw(h.db,'local-test','spend_import_once_01',1,{type:'draw',kind:'gear',count:first.state.shards/10},()=>0);
  const zero=await autoImportLegacy(h.db,'local-test',make(999));assert.equal(zero.mode,'restore');assert.equal(zero.state.shards,0);
  assert.equal(zero.revision,2);
  await h.db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind('other','other').run();
  await assert.rejects(autoImportLegacy(h.db,'other',make(-1)),/invalid_economy/);
  assert.equal((await readEconomy(h.db,'other')).revision,0);
 }finally{h.close();}
});
test('legacy import: unapproved snapshots grant nothing; approval imports once even after draws and retries',async()=>{
 const h=await createOfflineDb();try{
  const sql=await readFile(new URL('../migrations/0009_economy_legacy_imports.sql',import.meta.url),'utf8');for(const s of sql.split(';').filter(x=>x.trim()))await h.db.prepare(s).run();
  const user='local-test',backup='exact original local record',payload={version:1,assets:{...emptyEconomy(),shards:30},backup};
  await h.db.prepare('INSERT INTO saves(user_id,save_json) VALUES (?,?)').bind(user,'{"learning":"unchanged"}').run();
  const pending=await stageLegacyImport(h.db,user,payload);assert.equal(pending.approved,false);assert.equal((await readEconomy(h.db,user)).state.shards,0);
  await assert.rejects(applyApprovedLegacyImport(h.db,user,pending.hash),/not_approved/);
  await assert.rejects(stageLegacyImport(h.db,user,{...payload,assets:{...payload.assets,shards:999}}),/snapshot_conflict/);
  assert.deepEqual(await stageLegacyImport(h.db,user,payload),pending);
  // Operator action in isolated test DB only. No user-facing approval route exists.
  await h.db.prepare('UPDATE economy_legacy_imports SET approved_hash=payload_hash WHERE user_id=?').bind(user).run();
  const both=await Promise.all([applyApprovedLegacyImport(h.db,user,pending.hash),applyApprovedLegacyImport(h.db,user,pending.hash)]);
  assert.equal(both.filter(x=>x.replayed).length,1);assert.equal((await readEconomy(h.db,user)).state.shards,30);
  await executeDraw(h.db,user,'draw_after_import_01',1,{type:'draw',kind:'gear',count:1},()=>0);
  await applyApprovedLegacyImport(h.db,user,pending.hash);assert.equal((await readEconomy(h.db,user)).state.shards,20);
  await h.db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind('other','other').run();
  await assert.rejects(applyApprovedLegacyImport(h.db,'other',pending.hash),/not_approved/);
  assert.equal((await h.db.prepare('SELECT save_json FROM saves WHERE user_id=?').bind(user).first()).save_json,'{"learning":"unchanged"}');
  const saved=await h.db.prepare('SELECT payload_json FROM economy_legacy_imports WHERE user_id=?').bind(user).first();assert.equal(JSON.parse(saved.payload_json).backup,backup);
 }finally{h.close();}
});
test('import API is gated, authenticated, cannot approve itself, and never overwrites a funded wallet',async()=>{
 const h=await createOfflineDb();try{
  await h.db.prepare(await readFile(new URL('../migrations/0009_economy_legacy_imports.sql',import.meta.url),'utf8')).run();
  const session=await createSession(h.db,'local-test'),limiter={limit:async()=>({success:true})};
  const env={DB:h.db,ALLOWED_ORIGIN:'https://page.test',MISSION_RELEASE_ENABLED:'true',ECONOMY_IMPORT_ENABLED:'true',RATE_LIMITER:limiter,AUTH_RATE_LIMITER:limiter};
  const p={version:1,assets:{...emptyEconomy(),shards:10},backup:'original'};
  const call=(path,body,overrides={},headers={})=>release.fetch(new Request('https://api.test/api/v1/economy/import/'+path,{method:'POST',headers:{Origin:env.ALLOWED_ORIGIN,Authorization:'Bearer '+session.token,'Content-Type':'application/json',...headers},body:JSON.stringify(body)}),{...env,...overrides});
  assert.equal((await call('stage',p,{ECONOMY_IMPORT_ENABLED:'false'})).status,404);
  assert.equal((await call('auto',p)).status,404);
  assert.equal((await call('stage',p,{},{Authorization:''})).status,401);
  assert.equal((await call('stage',p,{},{Origin:'https://wrong.test'})).status,403);
  assert.equal((await call('stage',{...p,approved_hash:'fake'})).status,400);
  const response=await call('stage',p);assert.equal(response.status,200);const {hash}=await response.json();
  assert.equal((await call('apply',{hash})).status,409);
  assert.equal((await call('approve',{hash})).status,404);
  await h.db.prepare('UPDATE economy_legacy_imports SET approved_hash=payload_hash WHERE user_id=?').bind('local-test').run();
  await h.db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?)').bind('local-test',JSON.stringify({...emptyEconomy(),shards:5})).run();
  assert.equal((await call('apply',{hash})).status,409);assert.equal((await readEconomy(h.db,'local-test')).state.shards,5);
 }finally{h.close();}
});
