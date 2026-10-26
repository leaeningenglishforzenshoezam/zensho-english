import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import vm from 'node:vm';import {createLocalPlatform} from '../dev/local-platform.js';
import {issueExamAttempt,submitExamAttempt,claimExamReward,issueWordAttempt,submitWordAttempt,claimWordReward,issueIdiomAttempt,submitIdiomAttempt,claimIdiomReward,claimBasicBonus} from '../src/mission_rewards.js';import {readEconomy} from '../src/economy_repository.js';import {handleMissionDraft} from '../src/mission_api.js';import {createSession} from '../src/session.js';import rules from '../../daily-missions/daily_mission_rules.js';
const now=Date.parse('2026-10-12T00:00:00Z'),DAY=86400000;
test('All 1198 exam questions match originals and legacy shown answers, with explicit inflection mappings',async()=>{
 const c={window:{}};for(const f of ['sentence_fixed_1kyu.js','sentence_fixed_1kyu_b.js','paraphrase_data_1kyu.js'])vm.runInNewContext(await readFile(new URL('../../'+f,import.meta.url),'utf8'),c);
 const norm=x=>x.trim().toLowerCase(),override=JSON.parse(await readFile(new URL('../src/data/sentence-choice-overrides.json',import.meta.url),'utf8'));
 for(const [name,original]of [['sentenceA',c.window.SENTENCE_FIXED_1KYU],['sentenceB',c.window.SENTENCE_FIXED_1KYU_B],['paraphrase',c.window.PARAPHRASE_DATA_1KYU]]){
  const actual=JSON.parse(await readFile(new URL('../src/data/mission-'+name+'.json',import.meta.url),'utf8'));assert.equal(actual.length,original.length);
  for(let i=0;i<original.length;i++){const q=original[i],s=actual[i];assert.equal(s.id,q.id);assert.deepEqual(s.choices,Array.from(q.choices));
   if(name==='paraphrase'){assert.equal(s.a,q.a);assert.equal(s.b,q.b);assert.equal(s.answer,q.answer);}else{assert.equal(s.en,q.en);assert.equal(s.ja,q.ja);assert.equal(s.lemma,q.answer);assert.equal(s.answer,q.choices.find(x=>norm(x)===norm(q.answer))||q.choices[0]);}
   assert.equal(s.choices.filter(x=>x===s.answer).length,1);
  }
 }
 assert.equal(Object.keys(override).length,44);assert.deepEqual(override.F_bind_01,{lemma:'bind',answer:'bound'});assert.equal(rules.allBasicBonusStars,2);
});
test('Local D1 exam thresholds and frozen daily sets, one exam reward, atomic bonus from three server proofs',async()=>{
 const mf=await createLocalPlatform();try{const db=mf.env.DB;
 for(const f of ['0001_initial.sql','0002_sessions.sql'])for(const sql of (await readFile(new URL('../migrations/'+f,import.meta.url),'utf8')).split(';').filter(x=>x.trim()))await db.prepare(sql).run();
 for(const f of ['economy-v1.sql','mission-rewards-v1.sql'])for(const sql of (await readFile(new URL('../schema-drafts/'+f,import.meta.url),'utf8')).match(/CREATE TABLE[\s\S]*?;|CREATE TRIGGER[\s\S]*?\nEND;/g))await db.prepare(sql).run();
 for(const id of ['a','b','api'])await db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind(id,'sub-'+id).run();await db.prepare('INSERT INTO saves(user_id,save_json) VALUES (?,?)').bind('a','{"completed":true,"learning":"untouched"}').run();
 const issue=(category='sentence',variant='a',day=now,user='a',rng=()=>.5)=>issueExamAttempt(db,user,'1',category,variant,day,rng);
 const key=async(a,user='a')=>JSON.parse((await db.prepare('SELECT private_json FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind(user,a.attemptId).first()).private_json).questions.map(q=>q.answer);
 const a=await issue(),retry=await issue('sentence','a',now,'a',()=>.1);assert.equal(a.questions.length,10);assert.deepEqual(a.questions,retry.questions);assert.equal(new Set(a.questions.map(q=>q.id)).size,10);assert.equal(JSON.stringify(a).includes('answer'),false);
 const wrong=(await key(a)).map((x,i)=>i<3?(x+1)%4:x);assert.equal((await submitExamAttempt(db,'a',a.attemptId,wrong,now+1)).correct,7);await assert.rejects(claimExamReward(db,'a',a.attemptId,'exam_claim_000001',0,now+2),/mission_not_completed/);
 await assert.rejects(submitExamAttempt(db,'a',retry.attemptId,Array(9).fill(0),now),/invalid_answers/);await assert.rejects(submitExamAttempt(db,'b',retry.attemptId,Array(10).fill(0),now),/attempt_not_found/);
 const eight=(await key(retry)).map((x,i)=>i<2?(x+1)%4:x);assert.equal((await submitExamAttempt(db,'a',retry.attemptId,eight,now+3)).completed,true);
 await assert.rejects(submitExamAttempt(db,'a',retry.attemptId,await key(retry),now+4),/attempt_already_submitted/);await claimExamReward(db,'a',retry.attemptId,'exam_claim_000001',0,now+4);assert.equal((await readEconomy(db,'a')).state.shards,3);
 const b=await issue('sentence','b'),mix=await issue('sentence','mix'),para=await issue('paraphrase_quiz','standard');assert.ok(b.questions.every(q=>q.id.startsWith('B_')));assert.ok(para.questions.every(q=>q.prompt.includes('\n')));assert.equal(mix.questions.length,10);
 await submitExamAttempt(db,'a',para.attemptId,await key(para),now+5);assert.equal((await claimExamReward(db,'a',para.attemptId,'exam_claim_000002',1,now+6)).replayed,true);assert.equal((await readEconomy(db,'a')).state.shards,3);
 // Client-shaped learning save above cannot unlock a bonus, nor can another account.
 await assert.rejects(claimBasicBonus(db,'a','1','2026-10-12','bonus_claim_00001',1,now),/basic_missions_not_completed/);
 const word=await issueWordAttempt(db,'a','1',now,()=>.5);await submitWordAttempt(db,'a',word.attemptId,await key(word),now+10);
 await assert.rejects(claimBasicBonus(db,'a','1','2026-10-12','bonus_claim_00001',1,now),/basic_missions_not_completed/);
 const idiom=await issueIdiomAttempt(db,'a','1','meaning',now,()=>.5);await submitIdiomAttempt(db,'a',idiom.attemptId,await key(idiom),now+11);
 await assert.rejects(claimBasicBonus(db,'b','1','2026-10-12','bonus_claim_00001',0,now),/basic_missions_not_completed/);
 // Completion suffices; individual base rewards may be collected afterward.
 const claims=await Promise.all(['bonus_claim_00001','bonus_claim_00002'].map(op=>claimBasicBonus(db,'a','1','2026-10-12',op,1,now+20)));assert.equal(claims.filter(x=>x.replayed).length,1);assert.equal((await readEconomy(db,'a')).state.shards,5);
 await claimWordReward(db,'a',word.attemptId,'word_claim_000001',2,now+21);await claimIdiomReward(db,'a',idiom.attemptId,'idiom_claim_00001',3,now+22);assert.equal((await readEconomy(db,'a')).state.shards,10);
 assert.equal((await claimBasicBonus(db,'a','1','2026-10-12','bonus_claim_00003',0,now+DAY)).replayed,true);assert.equal((await readEconomy(db,'a')).state.shards,10);
 await assert.rejects(claimBasicBonus(db,'a','1','2026-10-13','bonus_claim_00004',4,now),/invalid_mission_day/);await assert.rejects(claimBasicBonus(db,'a','1','2026-02-30','bonus_claim_00004',4,now),/invalid_mission_day/);
 await assert.rejects(issueExamAttempt(db,'a','2','sentence','a',now),/mission_not_supported/);await assert.rejects(issue('paraphrase_quiz','a'),/mission_not_supported/);
 const expired=await issue('sentence','a',now+DAY);await assert.rejects(submitExamAttempt(db,'a',expired.attemptId,await key(expired),now+DAY+2*3600000),/attempt_expired/);
 // Full bonus transaction rolls back if the final receipt link is rejected.
 const nextday=now+DAY,w2=await issueWordAttempt(db,'a','1',nextday,()=>.5),i2=await issueIdiomAttempt(db,'a','1','synonym',nextday,()=>.5);
 await submitWordAttempt(db,'a',w2.attemptId,await key(w2),nextday+1);await submitIdiomAttempt(db,'a',i2.attemptId,await key(i2),nextday+1);const e2=await issue('sentence','b',nextday);await submitExamAttempt(db,'a',e2.attemptId,await key(e2),nextday+1);
 await db.prepare("CREATE TRIGGER test_reject_bonus BEFORE INSERT ON mission_reward_claims WHEN NEW.slot='basic_bonus' BEGIN SELECT RAISE(ABORT,'test_failure'); END;").run();const before=await readEconomy(db,'a');await assert.rejects(claimBasicBonus(db,'a','1','2026-10-13','bonus_rollback_01',4,nextday+2));assert.deepEqual(await readEconomy(db,'a'),before);await db.prepare('DROP TRIGGER test_reject_bonus').run();await claimBasicBonus(db,'a','1','2026-10-13','bonus_rollback_01',4,nextday+3);assert.equal((await readEconomy(db,'a')).state.shards,12);
 // DB guard also rejects a bonus without proofs, rolling back its economic receipt.
 await db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?)').bind('b',JSON.stringify({version:1,shards:0,owned:{gear:{},skills:{}}})).run();
 await assert.rejects(db.batch([db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)').bind('b','forged_bonus_0001','{}',0,JSON.stringify({version:1,shards:2,owned:{gear:{},skills:{}}}),'{}'),db.prepare('INSERT INTO mission_reward_claims(user_id,level,mission_day,slot,operation_id,attempt_id) VALUES (?,?,?,?,?,?)').bind('b','1','2026-10-12','basic_bonus','forged_bonus_0001',null)]));assert.equal((await readEconomy(db,'b')).state.shards,0);
 // Authenticated adapter continues to reject client reward and completion declarations.
 const session=await createSession(db,'api'),env={DB:db,ALLOWED_ORIGIN:'http://localhost:8765',MISSION_REWARDS_TEST_ENABLED:true,RATE_LIMITER:{limit:async()=>({success:true})},AUTH_RATE_LIMITER:{limit:async()=>({success:true})}};
 const call=(path,payload)=>handleMissionDraft(new Request('https://test/api/v1/missions/'+path,{method:'POST',headers:{Origin:env.ALLOWED_ORIGIN,Authorization:'Bearer '+session.token,'Content-Type':'application/json'},body:JSON.stringify(payload)}),env);
 assert.equal((await call('basic-bonus/claim',{level:'1',date:'2026-10-12',operationId:'api_bonus_claim_01',expectedRevision:0,completed:true})).status,400);
 const issued=await (await call('exam/start',{level:'1',category:'paraphrase_quiz',variant:'standard'})).json();assert.equal(issued.slot,'exam');assert.equal((await call('exam/submit',{attemptId:issued.attemptId,answers:await key(issued,'api')})).status,200);assert.equal((await call('exam/claim',{attemptId:issued.attemptId,operationId:'api_exam_claim_01',expectedRevision:0})).status,200);assert.equal((await readEconomy(db,'api')).state.shards,3);
 assert.equal((await db.prepare('SELECT save_json FROM saves WHERE user_id=?').bind('a').first()).save_json,'{"completed":true,"learning":"untouched"}');
 }finally{await mf.dispose();}
});
