import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {createOfflineDb} from './offline-db.js';
import {issueWordAttempt,issueExamAttempt,submitWordAttempt,submitExamAttempt,claimWordReward,claimExamReward,claimBasicBonus,issueIdiomAttempt,issueChallengeAttempt} from '../src/mission_rewards.js';
import {applyMissionLearning,readMissionLearning} from '../src/mission_learning.js';
import {applyMissionGrowth} from '../src/mission_growth.js';
import {readEconomy} from '../src/economy_repository.js';
import {readMissionStatus} from '../src/mission_status.js';
import bank from '../src/data/mission-sentence2.json' with {type:'json'};
import {missionOptions,missionSettings} from '../../daily-missions/mission_options.mjs';
const now=Date.parse('2026-11-05T01:00:00Z'),user='local-test';
const pet=id=>({id,type:'nagomi',stage:'egg',stats:{chie:0,kotoba:0,onkan:0,bunmyaku:0},totalPoints:0,level:1});

test('grade 2 sentences match existing content, deduplicate only identical questions, and use displayed inflected answers',async()=>{
 const c={window:{}};vm.runInNewContext(await readFile(new URL('../../sentence_fixed_2kyu.js',import.meta.url),'utf8'),c);
 const original=c.window.SENTENCE_FIXED_2KYU;
 assert.equal(original.length,549);assert.equal(bank.length,548);
 for(const row of bank){const originals=original.filter(q=>q.id===row.id);assert(originals.length);
  for(const q of originals){assert.equal(row.en,q.en);assert.equal(row.ja,q.ja);assert.deepEqual(row.choices,Array.from(q.choices));assert.equal(row.lemma,q.answer);assert.equal(row.answer,q.choices.find(x=>x.toLowerCase()===q.answer.toLowerCase())||q.choices[0]);}
 }
 assert.equal(missionOptions('2').length,4);
 assert.deepEqual(missionSettings('2','exam:sentence2'),{slot:'exam',body:{level:'2',category:'sentence',variant:'standard'}});
 assert.throws(()=>missionSettings('2','exam:standard'),/not_supported/);
 assert.equal(missionOptions('1').length,10);
});

test('grade 2 complete learning/growth/reward flow preserves grade 1 and grants each slot only once',async()=>{
 const h=await createOfflineDb();try{
  const db=h.db,data={zensho_goimon_current_v4_lv1:JSON.stringify(pet('one')),zensho_goimon_current_v4_lv2:JSON.stringify(pet('two')),zensho_learning_log_v1_lv1:'{}'};
  await db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind(user,JSON.stringify({schemaVersion:1,data})).run();
  for(const mode of ['enja','jaen','audio','sentence']){
   const exam=mode==='sentence',a=exam?await issueExamAttempt(db,user,'2','sentence','standard',now,()=>.5):await issueWordAttempt(db,user,'2',now,()=>.5,mode);
   const row=await db.prepare('SELECT * FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind(user,a.attemptId).first();
   assert.equal(row.growth_target_id,'two');
   const answers=JSON.parse(row.private_json).questions.map(q=>q.answer);
   await (exam?submitExamAttempt:submitWordAttempt)(db,user,a.attemptId,answers,now+1);
   await applyMissionLearning(db,user,a.attemptId,(await readMissionLearning(db,user)).revision);
   await applyMissionGrowth(db,user,a.attemptId,(await readMissionLearning(db,user)).revision);
   const state=await readMissionLearning(db,user);
   assert.equal(state.snapshot.data.zensho_goimon_current_v4_lv1,data.zensho_goimon_current_v4_lv1);
   assert.equal(state.snapshot.data.zensho_learning_log_v1_lv1,data.zensho_learning_log_v1_lv1);
   assert.equal((await applyMissionGrowth(db,user,a.attemptId,0)).replayed,true);
   const claim=exam?claimExamReward:claimWordReward;
   await claim(db,user,a.attemptId,'grade2_claim_'+mode+'_0001',(await readEconomy(db,user)).revision,now+2);
   assert.equal((await claim(db,user,a.attemptId,'grade2_retry_'+mode+'_0001',0,now+3)).replayed,true);
  }
  assert.equal((await readEconomy(db,user)).state.shards,6);
  const two=await readMissionStatus(db,user,now,'2'),one=await readMissionStatus(db,user,now,'1');
  assert.equal(two.missions.length,2);assert(two.missions.every(m=>m.completed));assert(one.missions.every(m=>!m.completed));
  await assert.rejects(claimBasicBonus(db,user,'2','2026-11-05','grade2_bonus_00001',2,now),/mission_not_supported/);
  await assert.rejects(issueIdiomAttempt(db,user,'2','meaning',now),/mission_not_supported/);
  await assert.rejects(issueChallengeAttempt(db,user,'2','listening',now),/mission_not_supported/);
  const tail=await issueWordAttempt(db,user,'2',now+27*86400000,()=>.5);assert.equal(tail.rangeStart,531);assert.equal(tail.rangeEnd,550);
  const wrap=await issueWordAttempt(db,user,'2',now+28*86400000,()=>.5);assert.equal(wrap.rangeStart,1);
  const s=await readMissionLearning(db,user),g=JSON.parse(s.snapshot.data.zensho_goimon_current_v4_lv2);
  assert.deepEqual(g.stats,{chie:30,kotoba:20,onkan:10,bunmyaku:10});
 }finally{h.close();}
});
