import test from 'node:test';import assert from 'node:assert/strict';
import {createOfflineDb} from './offline-db.js';import {startHarness} from '../dev/server.js';
import {mergeMissionSnapshot,syncMissionSnapshot} from '../src/mission_sync.js';
import {applyMissionLearning,readMissionLearning} from '../src/mission_learning.js';
import {issueWordAttempt,submitWordAttempt} from '../src/mission_rewards.js';
const key='zensho_learning_log_v1_lv1',pet='zensho_goimon_current_v4_lv1',now=Date.parse('2026-10-12T01:00:00Z');
const snapshot=values=>({schemaVersion:1,data:Object.fromEntries(Object.entries(values).map(([k,v])=>[k,JSON.stringify(v)]))});
test('Three-way merge preserves server changes, merges independent fields, refuses ambiguous counts and deletion',()=>{
 const base=snapshot({[key]:{today:{quiz_enja:{attempt:1}}},[pet]:{id:'a',nickname:'A',stats:{chie:1}}});
 const remote=snapshot({[key]:{today:{quiz_enja:{attempt:21}}},[pet]:{id:'a',nickname:'A',stats:{chie:1}}});
 const local=snapshot({[key]:{today:{quiz_enja:{attempt:1}}},[pet]:{id:'a',nickname:'B',stats:{chie:1}}});
 const inputs=JSON.stringify([base,local,remote]),merged=mergeMissionSnapshot(base,local,remote);assert(merged.ready);assert.equal(merged.snapshot.data[key],remote.data[key]);assert.equal(JSON.parse(merged.snapshot.data[pet]).nickname,'B');assert.equal(JSON.stringify([base,local,remote]),inputs);
 const competing=structuredClone(local);competing.data[key]=remote.data[key];assert.equal(mergeMissionSnapshot(base,competing,remote).ready,false);
 delete competing.data[key];assert.equal(mergeMissionSnapshot(base,competing,remote).ready,false);
 const disjoint=snapshot({[key]:{today:{quiz_enja:{attempt:1},audio_quiz:{attempt:2}}},[pet]:JSON.parse(base.data[pet])});assert(mergeMissionSnapshot(base,disjoint,remote).ready);
 assert.equal(mergeMissionSnapshot(remote,base,remote).ready,false); // Old restore with a fresh revision cannot lower totals.
});
for(const [name,createDb]of [['offline SQLite',createOfflineDb],['isolated D1',startHarness]])test(name+': stale device sync keeps mission increments, replay is safe and conflicts roll back',async()=>{
 const h=await createDb();try{const db=h.db,user='local-test';
 const original=snapshot({[pet]:{id:'keep',nickname:'before',stats:{chie:7}},[key]:{'2026-10-12':{quiz_enja:{attempt:3,correct:2,wrong:1}}}});
 await db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind(user,JSON.stringify(original)).run();
 const attempt=await issueWordAttempt(db,user,'1',now);const p=JSON.parse((await db.prepare('SELECT private_json FROM mission_attempts WHERE attempt_id=?').bind(attempt.attemptId).first()).private_json);await submitWordAttempt(db,user,attempt.attemptId,p.questions.map(q=>q.answer),now+1);await applyMissionLearning(db,user,attempt.attemptId,1);
 const local=structuredClone(original);local.data[pet]=JSON.stringify({id:'keep',nickname:'after',stats:{chie:7}});
 const command={operationId:crypto.randomUUID(),baseRevision:1,expectedRevision:2,snapshot:local};
 const r=await syncMissionSnapshot(db,user,command);assert.equal(r.revision,3);assert.equal((await syncMissionSnapshot(db,user,command)).replayed,true);
 const saved=await readMissionLearning(db,user);assert.equal(JSON.parse(saved.snapshot.data[key])['2026-10-12'].quiz_enja.attempt,23);assert.equal(JSON.parse(saved.snapshot.data[pet]).nickname,'after');
 assert.equal((await applyMissionLearning(db,user,attempt.attemptId,3)).replayed,true);
 await assert.rejects(syncMissionSnapshot(db,user,{...command,snapshot:original}),/operation_id_reused/);
 const competing=structuredClone(original);const log=JSON.parse(competing.data[key]);log['2026-10-12'].quiz_enja.attempt++;competing.data[key]=JSON.stringify(log);
 assert.equal((await syncMissionSnapshot(db,user,{operationId:crypto.randomUUID(),baseRevision:1,expectedRevision:3,snapshot:competing})).conflict,true);assert.deepEqual(await readMissionLearning(db,user),saved);
 const next={operationId:crypto.randomUUID(),baseRevision:3,expectedRevision:3,snapshot:saved.snapshot};
 await db.prepare("CREATE TRIGGER reject_sync BEFORE UPDATE ON saves BEGIN SELECT RAISE(ABORT,'test_failure'); END").run();await assert.rejects(syncMissionSnapshot(db,user,next),/test_failure/);assert.deepEqual(await readMissionLearning(db,user),saved);assert.equal(await db.prepare('SELECT * FROM mission_sync_receipts WHERE operation_id=?').bind(next.operationId).first(),null);await db.prepare('DROP TRIGGER reject_sync').run();
 const parallel=await Promise.allSettled([syncMissionSnapshot(db,user,next),syncMissionSnapshot(db,user,{...next,operationId:crypto.randomUUID()})]);assert.equal(parallel.filter(x=>x.status==='fulfilled').length,1);assert.match(parallel.find(x=>x.status==='rejected').reason.message,/learning_revision_conflict/);
 await db.prepare('DELETE FROM save_revisions WHERE user_id=? AND revision=1').bind(user).run();await assert.rejects(syncMissionSnapshot(db,user,{...command,operationId:crypto.randomUUID(),expectedRevision:4}),/sync_base_unavailable/);
 assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM mission_learning_receipts').first()).n,1);
 if(h.origin){
  const current=await readMissionLearning(db,user),body={operationId:crypto.randomUUID(),baseRevision:current.revision,expectedRevision:current.revision,snapshot:current.snapshot};
  const call=payload=>fetch(h.origin+'/api/v1/missions/learning/sync',{method:'POST',headers:{Origin:h.origin,'Content-Type':'application/json'},body:JSON.stringify(payload)});
  assert.equal((await call({...body,userId:'other'})).status,400);assert.equal((await call(body)).status,200);assert.equal((await (await call(body)).json()).replayed,true);
 }
 }finally{await h.close();}
});
