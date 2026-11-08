import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import vm from 'node:vm';
import {createOfflineDb} from './offline-db.js';
import {issueWordAttempt,submitWordAttempt,issueChallengeAttempt,submitChallengeAttempt} from '../src/mission_rewards.js';
import {applyMissionLearning,readMissionLearning} from '../src/mission_learning.js';
const now=Date.parse('2026-10-12T01:00:00Z');
test('Word block mapping matches source and audio key normalization',async()=>{const c={window:{}};vm.runInNewContext(await readFile(new URL('../../blocks_1kyu.js',import.meta.url),'utf8'),c);for(let id=1;id<=500;id++)assert.equal(c.window.BLOCKS_1KYU.find(b=>id>=b.start&&id<=b.end).id,Math.floor((id-1)/50)+1);});
test('Offline SQLite learning projection: exactly once, backups, conflicts, failed grades, all word modes and immutable GOIMON',async()=>{
 const h=await createOfflineDb();try{const db=h.db,user='local-test',goimon='{"id":"existing-companion","stats":{"chie":19},"custom":"keep"}',archive='[{"id":"archived"}]';
 const initial={schemaVersion:1,data:{zensho_goimon_current_v4_lv1:goimon,zensho_goimon_archive_v4_lv1:archive,zensho_learning_log_v1_lv2:'{"old":{"quiz_enja":{"attempt":7,"correct":4,"wrong":3}}}'}};
 await db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind(user,JSON.stringify(initial)).run();
 const make=async(mode='enja',miss=0)=>{const a=await issueWordAttempt(db,user,'1',now,()=>.4,mode);const p=JSON.parse((await db.prepare('SELECT private_json FROM mission_attempts WHERE attempt_id=?').bind(a.attemptId).first()).private_json);const answers=p.questions.map((q,i)=>i<miss?(q.answer+1)%4:q.answer);await submitWordAttempt(db,user,a.attemptId,answers,now+1);return a;};
 const first=await make('enja',1);const races=await Promise.all([applyMissionLearning(db,user,first.attemptId,1),applyMissionLearning(db,user,first.attemptId,1)]);assert.equal(races.filter(x=>!x.replayed).length,1);
 let save=await readMissionLearning(db,user);assert.equal(save.revision,2);let log=JSON.parse(save.snapshot.data.zensho_learning_log_v1_lv1);assert.deepEqual(log['2026-10-12'].quiz_enja,{attempt:20,correct:19,wrong:1});
 assert.deepEqual(JSON.parse((await db.prepare('SELECT save_json FROM save_revisions WHERE user_id=? AND revision=1').bind(user).first()).save_json),initial);
 for(const mode of ['jaen','audio']){const a=await make(mode,2);await applyMissionLearning(db,user,a.attemptId,save.revision);save=await readMissionLearning(db,user);assert.equal((await applyMissionLearning(db,user,a.attemptId,0)).replayed,true);}
 assert.equal(save.snapshot.data.zensho_goimon_current_v4_lv1,goimon);assert.equal(save.snapshot.data.zensho_goimon_archive_v4_lv1,archive);assert.equal(save.snapshot.data.zensho_learning_log_v1_lv2,initial.data.zensho_learning_log_v1_lv2);
 const global=JSON.parse(save.snapshot.data.zensho_block_global_lv1_v1).byBlock['1'];assert.equal(global.quizAttempted,20);assert.equal(global.quizCorrect,19);assert.equal(global.quizAttemptedJaEn,20);assert.equal(global.audioCorrect,18);
 assert.equal(Object.keys(JSON.parse(save.snapshot.data.zensho_audio_quiz_weak_v1_lv1)).length,2);
 const [a,b]=await Promise.all([make(),make()]);const revision=save.revision;
 const results=await Promise.allSettled([applyMissionLearning(db,user,a.attemptId,revision),applyMissionLearning(db,user,b.attemptId,revision)]);assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.match(results.find(r=>r.status==='rejected').reason.message,/learning_revision_conflict/);
 const unapplied=(await db.prepare('SELECT attempt_id FROM mission_learning_receipts WHERE attempt_id=?').bind(a.attemptId).first())?b:a;
 const before=await readMissionLearning(db,user);await db.prepare("CREATE TRIGGER reject_learning_save BEFORE UPDATE ON saves BEGIN SELECT RAISE(ABORT,'test_write_failure'); END").run();
 await assert.rejects(applyMissionLearning(db,user,unapplied.attemptId,before.revision),/test_write_failure/);assert.deepEqual(await readMissionLearning(db,user),before);assert.equal(await db.prepare('SELECT * FROM mission_learning_receipts WHERE attempt_id=?').bind(unapplied.attemptId).first(),null);
 await db.prepare('DROP TRIGGER reject_learning_save').run();await applyMissionLearning(db,user,unapplied.attemptId,before.revision);
 await assert.rejects(applyMissionLearning(db,'other-user',first.attemptId,0),/attempt_not_found/);
 const unsubmitted=await issueWordAttempt(db,user,'1',now);await assert.rejects(applyMissionLearning(db,user,unsubmitted.attemptId,0),/attempt_not_submitted/);
 // Other mission types receive the same common learning log; no made-up growth rules.
 for(const slot of ['listening','reading','reorder']){const attempt=await issueChallengeAttempt(db,user,'1',slot,now);const p=JSON.parse((await db.prepare('SELECT private_json FROM mission_attempts WHERE attempt_id=?').bind(attempt.attemptId).first()).private_json);await submitChallengeAttempt(db,user,attempt.attemptId,p.questions.map(q=>q.answer),slot,now+1);await applyMissionLearning(db,user,attempt.attemptId,(await readMissionLearning(db,user)).revision);}
 const bad=await make();save=await readMissionLearning(db,user);const damaged=structuredClone(save.snapshot);damaged.data.zensho_quiz_weak_points_enja_v2_lv1='{"absence":"bad"}';
 await db.prepare('UPDATE saves SET save_json=? WHERE user_id=?').bind(JSON.stringify(damaged),user).run();await assert.rejects(applyMissionLearning(db,user,bad.attemptId,save.revision),/invalid_learning_counter/);assert.equal(await db.prepare('SELECT * FROM mission_learning_receipts WHERE attempt_id=?').bind(bad.attemptId).first(),null);
 }finally{await h.close();}
});
