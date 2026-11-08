import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import words from '../src/data/mission-words-2kyu.json' with {type:'json'};
import rules from '../../daily-missions/daily_mission_rules.js';
import {projectMissionLearning} from '../src/mission_learning.js';
import {projectMissionGrowth} from '../src/mission_growth.js';
import {issueWordAttempt,issueExamAttempt} from '../src/mission_rewards.js';
import {createOfflineDb} from './offline-db.js';

const day='2026-11-05',now=Date.parse(day+'T01:00:00Z');
const pet=id=>({id,type:'nagomi',stage:'egg',specialRoute:'',stats:{chie:0,kotoba:0,onkan:0,bunmyaku:0},totalPoints:0,level:1,custom:{keep:true}});
function snapshot(){return {schemaVersion:1,data:{
 zensho_goimon_current_v4_lv1:JSON.stringify(pet('grade1')),
 zensho_goimon_current_v4_lv2:JSON.stringify(pet('grade2')),
 zensho_goimon_archive_v4_lv1:'[{"id":"old1"}]',zensho_goimon_archive_v4_lv2:'[{"id":"old2"}]',
 zensho_learning_log_v1_lv1:'{"2026-10-31":{"quiz_enja":{"attempt":3,"correct":2,"wrong":1}}}',
 zensho_goimon_dex_discovery_v2_lv1:'{"hirameki:child":true}',
 zensho_quiz_weak_points_enja_v2_lv1:'{"absence":2}',zensho_block_global_lv1_v1:'{"byBlock":{"1":{"quizAttempted":3}}}'
 }};}
function attempt(category='quiz_enja',slot='words'){
 const questions=Array.from({length:slot==='words'?20:10},(_,i)=>({id:slot==='words'?531+i:'F_test_'+i,answer:0}));
 return {level:'2',slot,category,mission_day:day,score:questions.length-1,growth_target_id:'grade2',
  submission_json:JSON.stringify(questions.map((_,i)=>i===0?1:0)),private_json:JSON.stringify({rulesVersion:rules.version,questions})};
}

test('grade 2 bank and all 550 block positions exactly match existing learning sources',async()=>{
 const c={window:{}};
 for(const name of ['words_2kyu.js','blocks_2kyu.js'])vm.runInNewContext(await readFile(new URL('../../'+name,import.meta.url),'utf8'),c);
 assert.deepEqual(words,JSON.parse(JSON.stringify(c.window.WORDS_2KYU.map(({en,ja})=>({en,ja})))));
 assert.equal(words.length,550);
 for(let id=1;id<=words.length;id++)assert.equal(c.window.BLOCKS_2KYU.find(b=>id>=b.start&&id<=b.end).id,Math.floor((id-1)/50)+1);
});

test('grade 2 word projections use only grade 2 logs, weak words, block counters, pet and dex',()=>{
 for(const category of ['quiz_enja','quiz_jaen','audio_quiz']){
  const initial=snapshot(),before=structuredClone(initial),a=attempt(category),learned=projectMissionLearning(initial,a);
  assert.deepEqual(initial,before);
  for(const [key,value]of Object.entries(initial.data))assert.equal(learned.data[key],value,key);
  assert.deepEqual(JSON.parse(learned.data.zensho_learning_log_v1_lv2)[day][category],{attempt:20,correct:19,wrong:1});
  const weakKey={quiz_enja:'zensho_quiz_weak_points_enja_v2_lv2',quiz_jaen:'zensho_quiz_weak_points_jaen_v3_lv2',audio_quiz:'zensho_audio_quiz_weak_v1_lv2'}[category];
  const weakWord=category==='audio_quiz'?words[530].en.trim().toLowerCase():words[530].en;
  assert.deepEqual(JSON.parse(learned.data[weakKey]),{[weakWord]:1});
  const block=JSON.parse(learned.data.zensho_block_global_lv2_v1).byBlock['11'];
  assert.equal(block[{quiz_enja:'quizAttempted',quiz_jaen:'quizAttemptedJaEn',audio_quiz:'audioAttempted'}[category]],20);
  const grown=projectMissionGrowth(learned,a,now),g=JSON.parse(grown.data.zensho_goimon_current_v4_lv2);
  assert.deepEqual(g.stats,{chie:category==='quiz_enja'?19:category==='audio_quiz'?9.5:0,kotoba:category==='quiz_jaen'?19:0,onkan:category==='audio_quiz'?9.5:0,bunmyaku:0});
  assert.equal(g.id,'grade2');assert.deepEqual(g.custom,{keep:true});
  assert.deepEqual(JSON.parse(grown.data.zensho_goimon_dex_discovery_v2_lv2),{'nagomi:egg':true});
  for(const [key,value]of Object.entries(initial.data))if(key!=='zensho_goimon_current_v4_lv2')assert.equal(grown.data[key],value,key);
  assert.equal(grown.data.zensho_learning_log_v1_lv2,learned.data.zensho_learning_log_v1_lv2);
 }
});

test('grade 2 sentence projection preserves grade 1 and never substitutes its companion',()=>{
 const initial=snapshot(),a=attempt('sentence','exam'),learned=projectMissionLearning(initial,a),grown=projectMissionGrowth(learned,a,now);
 assert.equal(JSON.parse(grown.data.zensho_goimon_current_v4_lv2).stats.bunmyaku,9);
 assert.equal(grown.data.zensho_goimon_current_v4_lv1,initial.data.zensho_goimon_current_v4_lv1);
 assert.throws(()=>projectMissionGrowth(initial,{...a,growth_target_id:'grade1'},now),/growth_target_mismatch/);
 const missing=structuredClone(initial);delete missing.data.zensho_goimon_current_v4_lv2;
 assert.throws(()=>projectMissionGrowth(missing,a,now),/invalid_growth_record/);
 for(const [slot,category]of [['idioms','idiom_quiz'],['exam','paraphrase_quiz'],['listening','listening'],['reorder','reorder'],['reading','q7']])assert.throws(()=>projectMissionLearning(initial,attempt(category,slot)),/unsupported_attempt/);
});

test('unsupported grade and grade 2 variant are rejected without issuing attempts',async()=>{
 const h=await createOfflineDb();try{
  await assert.rejects(issueWordAttempt(h.db,'local-test','3',now),/mission_not_supported/);
  await assert.rejects(issueExamAttempt(h.db,'local-test','2','sentence','a',now),/mission_not_supported/);
  assert.equal((await h.db.prepare('SELECT COUNT(*) AS n FROM mission_attempts').first()).n,0);
 }finally{h.close();}
});
