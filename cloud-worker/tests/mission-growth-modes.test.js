import test from 'node:test';import assert from 'node:assert/strict';
import {createOfflineDb} from './offline-db.js';import {startHarness} from '../dev/server.js';
import {getDefaultCurrent} from '../src/data/mission-growth-rules.js';
import {issueIdiomAttempt,submitIdiomAttempt,issueExamAttempt,submitExamAttempt,issueChallengeAttempt,submitChallengeAttempt} from '../src/mission_rewards.js';
import {applyMissionGrowth} from '../src/mission_growth.js';import {readMissionLearning} from '../src/mission_learning.js';
const key='zensho_goimon_current_v4_lv1',bonusKey='zensho_reorder_bonus_stat_v1_lv1',user='local-test';
for(const platform of ['offline','D1/HTTP'])test('Non-word growth follows existing per-mode rules and pins reorder bonus: '+platform,async()=>{
 const h=platform==='offline'?await createOfflineDb():await startHarness();try{const db=h.db,g=getDefaultCurrent();g.id='test-companion';const initial={schemaVersion:1,data:{[key]:JSON.stringify(g)}};
 await db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind(user,JSON.stringify(initial)).run();
 const apply=async(id,revision)=>{
  if(!h.origin)return applyMissionGrowth(db,user,id,revision);
  const r=await fetch(h.origin+'/api/v1/missions/growth/apply',{method:'POST',headers:{Origin:h.origin,'Content-Type':'application/json'},body:JSON.stringify({attemptId:id,expectedRevision:revision})});const result=await r.json();if(!r.ok)throw Error(result.error);return result;
 };
 let date=Date.parse('2026-10-14T01:00:00Z');
 const cases=[['idioms','meaning',1,{chie:7,kotoba:7}],['idioms','synonym',15,{}],['exam','sentence',1,{bunmyaku:9}],['exam','paraphrase_quiz',1,{kotoba:4.5,bunmyaku:4.5}],['listening',null,5,{onkan:5}],['listening',null,0,{onkan:5}],['listening',null,2,{onkan:5}],...['chie','kotoba','onkan','bunmyaku'].map(stat=>['reorder',stat,1,stat==='bunmyaku'?{bunmyaku:8}:{[stat]:6,bunmyaku:2}])];
 for(const [slot,mode,miss,delta]of cases){
  if(slot==='reorder'){
   const s=await readMissionLearning(db,user);s.snapshot.data[bonusKey]=mode;await db.prepare('UPDATE saves SET save_json=? WHERE user_id=?').bind(JSON.stringify(s.snapshot),user).run();
  }
  const a=slot==='idioms'?await issueIdiomAttempt(db,user,'1',mode,date):slot==='exam'?await issueExamAttempt(db,user,'1',mode,mode==='sentence'?'a':'standard',date):await issueChallengeAttempt(db,user,'1',slot,date);
  const row=await db.prepare('SELECT * FROM mission_attempts WHERE attempt_id=?').bind(a.attemptId).first(),p=JSON.parse(row.private_json);
  if(slot==='reorder'){assert.equal(row.growth_bonus_stat,mode);const s=await readMissionLearning(db,user);s.snapshot.data[bonusKey]=mode==='chie'?'kotoba':'chie';await db.prepare('UPDATE saves SET save_json=? WHERE user_id=?').bind(JSON.stringify(s.snapshot),user).run();}
  const answers=p.questions.map((q,i)=>i>=miss?q.answer:Array.isArray(q.answer)?[...q.answer.slice(1),q.answer[0]]:(q.answer+1)%q.choices.length);
  if(slot==='idioms')await submitIdiomAttempt(db,user,a.attemptId,answers,date+1);else if(slot==='exam')await submitExamAttempt(db,user,a.attemptId,answers,date+1);else await submitChallengeAttempt(db,user,a.attemptId,answers,slot,date+1);
  const before=await readMissionLearning(db,user),old=JSON.parse(before.snapshot.data[key]);await apply(a.attemptId,before.revision);
  const after=await readMissionLearning(db,user),updated=JSON.parse(after.snapshot.data[key]);
  for(const stat of ['chie','kotoba','onkan','bunmyaku'])assert.equal(updated.stats[stat],old.stats[stat]+(delta[stat]||0),slot+':'+mode+':'+stat);
  assert.deepEqual(updated.hiddenPoints,old.hiddenPoints);assert.equal((await apply(a.attemptId,0)).replayed,true);assert.deepEqual(await readMissionLearning(db,user),after);
  date+=86400000;
 }
 const a=await issueChallengeAttempt(db,user,'1','reading',date),p=JSON.parse((await db.prepare('SELECT private_json FROM mission_attempts WHERE attempt_id=?').bind(a.attemptId).first()).private_json);await submitChallengeAttempt(db,user,a.attemptId,p.questions.map(q=>q.answer),'reading',date+1);
 const before=await readMissionLearning(db,user);assert.equal((await apply(a.attemptId,before.revision)).awardedPoints,20);
 assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM economy_receipts').first()).n,0);
 }finally{await h.close();}
});
