import test from 'node:test';import assert from 'node:assert/strict';
import {createOfflineDb} from './offline-db.js';import {createSession} from '../src/session.js';
import {handleMissionDraft} from '../src/mission_api.js';import {WordSession} from '../dev/word-session.js';
test('Offline Request/Response: all six learning slots, review gating, authenticated ownership and client retry',async()=>{
 const h=await createOfflineDb();try{const db=h.db,session=await createSession(db,'local-test'),origin='http://localhost:8877';
 const env={DB:db,ALLOWED_ORIGIN:origin,MISSION_REWARDS_TEST_ENABLED:true,RATE_LIMITER:{limit:async()=>({success:true})},AUTH_RATE_LIMITER:{limit:async()=>({success:true})}};
 const call=(path,body,token=session.token,enabled=true)=>handleMissionDraft(new Request(origin+'/api/v1/'+path,{method:body?'POST':'GET',headers:{Origin:origin,'Content-Type':'application/json',Authorization:'Bearer '+token},...(body?{body:JSON.stringify(body)}:{})}),{...env,MISSION_REWARDS_TEST_ENABLED:enabled});
 const request=async(path,body)=>{const r=await call(path,body);const result=await r.json();assert.equal(r.status,200,JSON.stringify(result));return result;};
 assert.equal((await call('missions/learning',undefined,session.token,false)).status,404);
 assert.equal((await call('missions/learning',undefined,'bad')).status,401);
 const s=new WordSession(request,'enja');await s.start();assert.equal((await call('missions/review',{attemptId:s.attempt.attemptId})).status,400);
 const p=JSON.parse((await db.prepare('SELECT private_json FROM mission_attempts WHERE attempt_id=?').bind(s.attempt.attemptId).first()).private_json);
 for(let i=0;i<20;i++){s.choose(p.questions[i].answer);if(i<19)s.next();}await s.submit();
 const review=await s.review();assert.equal(review.questions.length,20);assert.ok(review.questions.every(q=>q.correct));
 assert.equal((await s.saveLearning()).replayed,false);assert.equal((await s.saveLearning()).replayed,true);
 assert.equal((await call('missions/learning/apply',{attemptId:s.attempt.attemptId,expectedRevision:1,score:20})).status,400);
 await db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind('other','other').run();const other=await createSession(db,'other');
 assert.equal((await call('missions/review',{attemptId:s.attempt.attemptId},other.token)).status,404);
 assert.equal((await call('missions/learning/apply',{attemptId:s.attempt.attemptId,expectedRevision:0},other.token)).status,404);
 for(const [slot,extra]of [['idioms',{mode:'meaning'}],['exam',{category:'sentence',variant:'a'}],['listening',{}],['reading',{}],['reorder',{}]]){
  const a=await request('missions/'+slot+'/start',{level:'1',...extra});const p=JSON.parse((await db.prepare('SELECT private_json FROM mission_attempts WHERE attempt_id=?').bind(a.attemptId).first()).private_json);
  await request('missions/'+slot+'/submit',{attemptId:a.attemptId,answers:p.questions.map(q=>q.answer)});
  const before=await request('missions/learning');await request('missions/learning/apply',{attemptId:a.attemptId,expectedRevision:before.revision});
  assert.equal((await request('missions/review',{attemptId:a.attemptId})).questions.length,p.questions.length);
 }
 const final=await request('missions/learning');assert.equal(final.revision,6);const log=JSON.parse(final.snapshot.data.zensho_learning_log_v1_lv1);assert.equal(Object.keys(Object.values(log)[0]).length,6);
 assert.equal((await request('economy')).state.shards,0); // Learning writes never grant currency.
 }finally{await h.close();}
});
test('Offline attempt quota aborts issuance without deleting prior evidence',async()=>{
 const h=await createOfflineDb();try{const db=h.db,day='2026-10-12';
 for(let i=0;i<200;i++)await db.prepare("INSERT INTO mission_attempts(user_id,attempt_id,level,mission_day,slot,category,private_json,expires_at) VALUES (?,?,'1',?,'words','quiz_enja','{}',1)").bind('local-test','quota_'+i,day).run();
 await assert.rejects(db.prepare("INSERT INTO mission_attempts(user_id,attempt_id,level,mission_day,slot,category,private_json,expires_at) VALUES ('local-test','overflow','1',?,'words','quiz_enja','{}',1)").bind(day).run(),/mission_daily_limit/);
 assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM mission_attempts').first()).n,200);
 await db.prepare("WITH RECURSIVE seq(n) AS (VALUES(200) UNION ALL SELECT n+1 FROM seq WHERE n<4999) INSERT INTO mission_attempts(user_id,attempt_id,level,mission_day,slot,category,private_json,expires_at) SELECT 'local-test','quota_'||n,'1',date('2026-10-13','+'||CAST(n/200 AS TEXT)||' days'),'words','quiz_enja','{}',1 FROM seq").run();
 await assert.rejects(db.prepare("INSERT INTO mission_attempts(user_id,attempt_id,level,mission_day,slot,category,private_json,expires_at) VALUES ('local-test','overflow_total','1','2027-01-01','words','quiz_enja','{}',1)").run(),/mission_storage_limit/);
 assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM mission_attempts').first()).n,5000);
 }finally{await h.close();}
});
