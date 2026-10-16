import test from 'node:test';
import assert from 'node:assert/strict';
import {createOfflineDb} from './offline-db.js';
import {readMissionStatus} from '../src/mission_status.js';
import {issueWordAttempt,submitWordAttempt} from '../src/mission_rewards.js';
import {applyMissionLearning} from '../src/mission_learning.js';
import {handleMissionDraft} from '../src/mission_api.js';

test('dashboard reads server grading and saved receipts, scoped to account and JST day',async()=>{
 const h=await createOfflineDb();try{
  const now=Date.now(),before=await readMissionStatus(h.db,'local-test',now);
  assert.equal(before.missions.length,6);assert.ok(before.missions.every(m=>m.submitted===0));
  const a=await issueWordAttempt(h.db,'local-test','1',now);
  assert.equal((await readMissionStatus(h.db,'local-test',now)).missions[0].submitted,0);
  const row=await h.db.prepare('SELECT private_json FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind('local-test',a.attemptId).first();
  await submitWordAttempt(h.db,'local-test',a.attemptId,JSON.parse(row.private_json).questions.map(q=>q.answer));
  let m=(await readMissionStatus(h.db,'local-test',now)).missions[0];
  assert.equal(m.completed,true);assert.equal(m.submitted,1);assert.equal(m.learningSaved,0);
  await applyMissionLearning(h.db,'local-test',a.attemptId,0);
  await applyMissionLearning(h.db,'local-test',a.attemptId,0);
  m=(await readMissionStatus(h.db,'local-test',now)).missions[0];
  assert.equal(m.learningSaved,1);assert.equal(m.growthSaved,0);
  assert.equal((await readMissionStatus(h.db,'different-user',now)).missions[0].submitted,0);
  assert.equal((await readMissionStatus(h.db,'local-test',now+86400000)).missions[0].submitted,0);
  assert.deepEqual(Object.keys(m).sort(),['completed','goal','group','growthSaved','learningSaved','slot','submitted','title'].sort());
 }finally{h.close();}
});

test('status API stays gated and requires authentication',async()=>{
 const h=await createOfflineDb();try{
  const request=new Request('https://local.test/api/v1/missions/status',{headers:{Origin:'https://local.test'}});
  assert.equal((await handleMissionDraft(request,{})).status,404);
  const env={DB:h.db,MISSION_REWARDS_TEST_ENABLED:true,ALLOWED_ORIGIN:'https://local.test',RATE_LIMITER:{limit:async()=>({success:true})},AUTH_RATE_LIMITER:{limit:async()=>({success:true})}};
  assert.equal((await handleMissionDraft(request,env)).status,401);
 }finally{h.close();}
});
