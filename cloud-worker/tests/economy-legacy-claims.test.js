import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createOfflineDb} from './offline-db.js';
import {autoImportLegacy} from '../src/economy_import.js';
import {readLegacyClaims,legacyMissionClaimed} from '../src/economy_legacy_claims.js';
import {issueWordAttempt,submitWordAttempt,claimWordReward} from '../src/mission_rewards.js';
import {readEconomy} from '../src/economy_repository.js';
const now=Date.parse('2026-11-01T10:00:00+09:00');
async function setup(claims){
 const h=await createOfflineDb();const sql=await readFile(new URL('../migrations/0009_economy_legacy_imports.sql',import.meta.url),'utf8');
 for(const s of sql.match(/CREATE TABLE[\s\S]*?;/g))await h.db.prepare(s).run();
 await autoImportLegacy(h.db,'local-test',{version:1,assets:{version:1,shards:30,owned:{gear:{},skills:{}}},backup:JSON.stringify({schemaVersion:2,shop:{claims}})});return h;
}
async function completed(db,time){
 const a=await issueWordAttempt(db,'local-test','1',time,()=>.5);
 const row=await db.prepare('SELECT private_json FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind('local-test',a.attemptId).first();
 await submitWordAttempt(db,'local-test',a.attemptId,JSON.parse(row.private_json).questions.map(q=>q.answer),time+1);return a;
}
test('imported claims suppress only matching day/grade/slot and retain welcome/login markers',async()=>{
 const h=await setup({'lv1:mission:2026-11-01:words':true,welcome:true,'login:2026-11-01':true});try{
  assert.equal(await legacyMissionClaimed(h.db,'local-test','1','2026-11-01','words'),true);
  assert.equal(await legacyMissionClaimed(h.db,'local-test','2','2026-11-01','words'),false);
  assert.equal(await legacyMissionClaimed(h.db,'local-test','1','2026-11-01','exam'),false);
  assert.equal((await readLegacyClaims(h.db,'local-test')).welcome,true);
  assert.deepEqual(await readLegacyClaims(h.db,'other'),{});
  const a=await completed(h.db,now);
  const result=await claimWordReward(h.db,'local-test',a.attemptId,'legacy_claim_retry_01',1,now+2);
  assert.equal(result.result.shards,0);assert.equal(result.result.legacyClaimed,true);
  assert.equal((await readEconomy(h.db,'local-test')).state.shards,30);
  assert.equal((await claimWordReward(h.db,'local-test',a.attemptId,'legacy_claim_retry_02',2,now+3)).replayed,true);
  const b=await completed(h.db,now+86400000);
  assert.equal((await claimWordReward(h.db,'local-test',b.attemptId,'legacy_claim_nextday_01',2,now+86400002)).result.shards,3);
  assert.equal((await readEconomy(h.db,'local-test')).state.shards,33);
 }finally{h.close();}
});
test('damaged imported claims stop rewards instead of being treated as unclaimed',async()=>{
 const h=await setup(null);try{
  const a=await completed(h.db,now);const before=await readEconomy(h.db,'local-test');
  await assert.rejects(claimWordReward(h.db,'local-test',a.attemptId,'legacy_claim_invalid_01',1,now+2),/legacy_claims_invalid/);
  assert.deepEqual(await readEconomy(h.db,'local-test'),before);
 }finally{h.close();}
});
