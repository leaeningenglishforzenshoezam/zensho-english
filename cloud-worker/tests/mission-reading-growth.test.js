import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import vm from 'node:vm';
import {readingGrowthPlan} from '../src/mission_reading_growth.js';
import {getDefaultCurrent} from '../src/data/mission-growth-rules.js';
import {issueChallengeAttempt,submitChallengeAttempt} from '../src/mission_rewards.js';
import {applyMissionGrowth} from '../src/mission_growth.js';import {readMissionLearning} from '../src/mission_learning.js';
import {syncMissionSnapshot} from '../src/mission_sync.js';
import {createOfflineDb} from './offline-db.js';import {startHarness} from '../dev/server.js';
const current='zensho_goimon_current_v4_lv1',stateKeys={dialogue8:'dialogueCompletionState_v1',q10:'q10ReadingCompletionState_v1'};
test('Reading amounts match existing Q7 function; Q8/10 require perfect and preserve page state',async()=>{
 const source=await readFile(new URL('../../goimon.js',import.meta.url),'utf8'),fn=source.match(/  function addQ7ReadingResult\([^]*?\n  \}/)[0],context={addLearningPointsOnce:(_id,delta)=>delta};vm.runInNewContext(fn,context);
 for(let score=0;score<=5;score++){
  const attempt={category:'q7',score,private_json:JSON.stringify({setId:'S1',questions:Array(5).fill({})})};assert.equal(readingGrowthPlan({},attempt).points,context.addQ7ReadingResult('attempt',score).bunmyaku);
  for(const category of ['dialogue8','q10']){
   const key=stateKeys[category],data={[key]:JSON.stringify({userAnswers:{keep:1},rewardedQuestions:{other:true}})},plan=readingGrowthPlan(data,{...attempt,category});
   assert.equal(plan.points,score===5?1:0);assert.equal(plan.hidden,score===5?category:null);assert.deepEqual(JSON.parse(data[key]).userAnswers,{keep:1});
   if(score===5){assert.equal(readingGrowthPlan(data,{...attempt,category}).points,0);assert.equal(readingGrowthPlan({}, {...attempt,category},true).points,0);}
  }
 }
});
for(const platform of ['offline','D1/HTTP'])test('Reading rewards: per-attempt Q7, per-set Q8/10, imported markers, rollback and restore guard: '+platform,async()=>{
 const h=platform==='offline'?await createOfflineDb():await startHarness();try{const db=h.db,user='local-test',pet=getDefaultCurrent();pet.id='reading-pet';
 await db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind(user,JSON.stringify({schemaVersion:1,data:{[current]:JSON.stringify(pet)}})).run();
 let day=Date.parse('2026-10-14T01:00:00Z');
 async function scored(score){const a=await issueChallengeAttempt(db,user,'1','reading',day,()=>0);const row=await db.prepare('SELECT * FROM mission_attempts WHERE attempt_id=?').bind(a.attemptId).first(),p=JSON.parse(row.private_json);const unused=a.category==='dialogue8'?p.questions[0].choices.findIndex((_,i)=>!p.questions.some(q=>q.answer===i)):null;await submitChallengeAttempt(db,user,a.attemptId,p.questions.map((q,i)=>i<score?q.answer:unused??(q.answer+1)%q.choices.length),'reading',day+1);return {...a,setId:String(p.setId)};}
 const apply=async(a,revision)=>{
  if(!h.origin)return applyMissionGrowth(db,user,a.attemptId,revision);
  const r=await fetch(h.origin+'/api/v1/missions/growth/apply',{method:'POST',headers:{Origin:h.origin,'Content-Type':'application/json'},body:JSON.stringify({attemptId:a.attemptId,expectedRevision:revision})}),data=await r.json();if(!r.ok)throw Error(data.error);return data;
 };
 let s=await readMissionLearning(db,user);const q7=await scored(4);assert.equal(q7.category,'q7');assert.equal((await apply(q7,s.revision)).awardedPoints,8);assert.equal((await apply(q7,0)).replayed,true);
 s=await readMissionLearning(db,user);assert.equal((await apply(await scored(5),s.revision)).awardedPoints,20);
 for(const category of ['dialogue8','q10']){
  day+=86400000;const partial=await scored(4);assert.equal(partial.category,category);s=await readMissionLearning(db,user);assert.equal((await apply(partial,s.revision)).awardedPoints,0);
  assert.equal(await db.prepare('SELECT * FROM mission_reading_growth_claims WHERE category=?').bind(category).first(),null);
  const perfect=await scored(5),key=stateKeys[category];s=await readMissionLearning(db,user);
  // Simulate a snapshot already rewarded by the normal Q8 page; do not pay again.
  if(category==='dialogue8'){s.snapshot.data[key]=JSON.stringify({rewardedQuestions:{[perfect.setId]:true},userAnswers:{preserve:1}});await db.prepare('UPDATE saves SET save_json=? WHERE user_id=?').bind(JSON.stringify(s.snapshot),user).run();}
  const before=await readMissionLearning(db,user);
  await db.prepare("CREATE TRIGGER fail_reading BEFORE UPDATE ON saves BEGIN SELECT RAISE(ABORT,'test_failure'); END").run();
  await assert.rejects(apply(perfect,before.revision),/test_failure|server_error/);assert.deepEqual(await readMissionLearning(db,user),before);assert.equal(await db.prepare('SELECT * FROM mission_reading_growth_claims WHERE category=?').bind(category).first(),null);
  await db.prepare('DROP TRIGGER fail_reading').run();const result=await apply(perfect,before.revision);assert.equal(result.awardedPoints,category==='q10'?1:0);
  s=await readMissionLearning(db,user);const g=JSON.parse(s.snapshot.data[current]);assert.equal(g.hiddenPoints[category],category==='q10'?1:0);if(category==='dialogue8')assert.deepEqual(JSON.parse(s.snapshot.data[key]).userAnswers,{preserve:1});
  const damaged=structuredClone(s.snapshot);delete damaged.data[key];
  assert.equal((await syncMissionSnapshot(db,user,{operationId:'remove_reading_marker_'+category,baseRevision:s.revision,expectedRevision:s.revision,snapshot:damaged})).conflict,true);
  // Bypass sync in the fixture only: the durable set claim still prevents payout
  // if a stale external snapshot lost the marker AND switched to another pet.
  const other=getDefaultCurrent();other.id='other_'+category;damaged.data[current]=JSON.stringify(other);await db.prepare('UPDATE saves SET save_json=? WHERE user_id=?').bind(JSON.stringify(damaged),user).run();
  const repeated=await scored(5);assert.equal(repeated.setId,perfect.setId);assert.equal((await apply(repeated,s.revision)).awardedPoints,0);
  s=await readMissionLearning(db,user);assert.equal(JSON.parse(s.snapshot.data[current]).totalPoints,0);assert.equal(JSON.parse(s.snapshot.data[key]).rewardedQuestions[perfect.setId],true);
 }
 assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM mission_reading_growth_claims').first()).n,2);assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM economy_receipts').first()).n,0);
 await db.prepare('DELETE FROM users WHERE id=?').bind(user).run();assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM mission_reading_growth_claims').first()).n,0);
 }finally{await h.close();}
});
