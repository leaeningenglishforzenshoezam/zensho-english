import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {growthRulesSource} from '../scripts/growth-rules-source.js';
import {createOfflineDb} from './offline-db.js';
import {startHarness} from '../dev/server.js';
import {issueWordAttempt,submitWordAttempt} from '../src/mission_rewards.js';
import {applyMissionGrowth,projectMissionGrowth} from '../src/mission_growth.js';
import {applyMissionLearning,readMissionLearning} from '../src/mission_learning.js';
import {syncMissionSnapshot} from '../src/mission_sync.js';
import {STAGE_ORDER,images} from '../src/data/mission-growth-rules.js';
const user='local-test',key='zensho_goimon_current_v4_lv1',now=Date.parse('2026-10-12T01:00:00Z');
const pet=(id='original')=>({id,type:'nagomi',stage:'egg',specialRoute:'',stats:{chie:90,kotoba:0,onkan:0,bunmyaku:0},totalPoints:90,level:5,custom:{preserve:true},hiddenPoints:{q10:3},pendingEvolution:false});
const snapshot=g=>({schemaVersion:1,data:{[key]:JSON.stringify(g),zensho_goimon_archive_v4_lv1:'[{"id":"archived"}]',zensho_learning_log_v1_lv2:'{}'}});
async function scored(db,mode='enja',miss=0){
 const a=await issueWordAttempt(db,user,'1',now,()=>.4,mode);
 const row=await db.prepare('SELECT * FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind(user,a.attemptId).first();
 const p=JSON.parse(row.private_json),answers=p.questions.map((q,i)=>i<miss?(q.answer+1)%4:q.answer);
 await submitWordAttempt(db,user,a.attemptId,answers,now+1);
 return await db.prepare('SELECT * FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind(user,a.attemptId).first();
}
test('Growth rules are reproducibly extracted from existing browser rules, not independently tuned',async()=>{
 assert.equal(await readFile(new URL('../src/data/mission-growth-rules.js',import.meta.url),'utf8'),await growthRulesSource());
});
test('Growth projection: all word modes, threshold boundaries, special routes, zero score, invalid records',async()=>{
 const h=await createOfflineDb();try{
  await h.db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind(user,JSON.stringify(snapshot(pet()))).run();
  const attempts={};for(const mode of ['enja','jaen','audio'])attempts[mode]=await scored(h.db,mode,1);
  for(const mode of Object.keys(attempts)){
   const result=projectMissionGrowth(snapshot(pet()),attempts[mode],now),g=JSON.parse(result.data[key]);
   assert.deepEqual(g.stats,{chie:mode==='enja'?109:mode==='audio'?99.5:90,kotoba:mode==='jaen'?19:0,onkan:mode==='audio'?9.5:0,bunmyaku:0});
   assert.equal(g.totalPoints,109);assert.equal(g.stage,'egg');assert.equal(g.pendingStage,'child');assert.equal(g.pendingEvolution,true);
   assert.equal(g.pendingType,'hirameki');assert.deepEqual(g.custom,{preserve:true});assert.deepEqual(g.hiddenPoints,{q10:3});
  }
  const a=await scored(h.db,'enja');
  for(const [stats,type]of [[{chie:40,kotoba:0,onkan:40,bunmyaku:0},'hibiki'],[{chie:0,kotoba:40,onkan:0,bunmyaku:40},'kotonoha'],[{chie:5,kotoba:25,onkan:25,bunmyaku:25},'nagomi'],[{chie:0,kotoba:80,onkan:0,bunmyaku:0},'tsumugi'],[{chie:0,kotoba:0,onkan:80,bunmyaku:0},'shirabe'],[{chie:0,kotoba:0,onkan:0,bunmyaku:80},'yomitoki']]){
   const g={...pet(),stats,totalPoints:80,level:5};assert.equal(JSON.parse(projectMissionGrowth(snapshot(g),a,now).data[key]).pendingType,type);
  }
  for(const [stage,threshold]of [['egg',100],['child',300],['growth',600],['mid',900]])for(const offset of [-1,0]){
   const g=pet();g.stage=stage;g.stats.chie=threshold-20+offset;g.totalPoints=g.stats.chie;g.level=Math.floor(g.totalPoints/20)+1;
   const out=JSON.parse(projectMissionGrowth(snapshot(g),a,now).data[key]);assert.equal(out.pendingEvolution,offset===0);assert.equal(out.stage,stage);if(offset===0)assert.equal(out.pendingStage,STAGE_ORDER[STAGE_ORDER.indexOf(stage)+1]);
  }
  for(const route of ['mr_uno','q7_special','q8_special','q10_special']){
   const g=pet();g.specialRoute=route;const out=JSON.parse(projectMissionGrowth(snapshot(g),a,now).data[key]);assert.equal(out.pendingType,route);assert.equal(out.pendingImageKey,images[route].child);
  }
  const final=pet();final.stage='final';assert.equal(JSON.parse(projectMissionGrowth(snapshot(final),a,now).data[key]).pendingEvolution,false);
  const zero=await scored(h.db,'enja',20);assert.deepEqual(projectMissionGrowth(snapshot(pet()),zero,now),snapshot(pet()));
  for(const damage of [g=>g.stats.chie=-1,g=>g.totalPoints=0,g=>g.level=1,g=>g.stage='unknown',g=>g.stats.onkan='0',g=>g.stats.chie=Infinity]){const g=pet();damage(g);assert.throws(()=>projectMissionGrowth(snapshot(g),a,now),/invalid_growth_record/);}
  assert.throws(()=>projectMissionGrowth(snapshot(pet()),{...a,score:0},now),/invalid_learning_record/);
  assert.throws(()=>projectMissionGrowth(snapshot(pet()),{...a,slot:'reading',category:'unknown'},now),/unsupported_attempt/);
 }finally{await h.close();}
});
for(const platform of ['offline SQLite','isolated D1/HTTP'])test('Growth transactions: '+platform,async()=>{
 const h=platform==='offline SQLite'?await createOfflineDb():await startHarness();try{const db=h.db;
  const missing=await scored(db);assert.equal(missing.growth_target_id,null);
  await assert.rejects(applyMissionGrowth(db,user,missing.attempt_id,0),/growth_target_missing/);
  const initial=snapshot(pet());await db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind(user,JSON.stringify(initial)).run();
  await assert.rejects(applyMissionGrowth(db,user,missing.attempt_id,1),/growth_target_missing/);
  const a=await scored(db);assert.equal(a.growth_target_id,'original');
  const unsubmitted=await issueWordAttempt(db,user,'1',now);await assert.rejects(applyMissionGrowth(db,user,unsubmitted.attemptId,1),/attempt_not_submitted/);
  await assert.rejects(applyMissionGrowth(db,'other',a.attempt_id,0),/attempt_not_found/);
  await db.prepare('UPDATE saves SET save_json=? WHERE user_id=?').bind(JSON.stringify(snapshot(pet('other-pet'))),user).run();
  await assert.rejects(applyMissionGrowth(db,user,a.attempt_id,1),/growth_target_mismatch/);
  await db.prepare('UPDATE saves SET save_json=? WHERE user_id=?').bind(JSON.stringify(initial),user).run();
  const results=await Promise.all([applyMissionGrowth(db,user,a.attempt_id,1),applyMissionGrowth(db,user,a.attempt_id,1)]);assert.equal(results.filter(r=>!r.replayed).length,1);
  let saved=await readMissionLearning(db,user);assert.equal(saved.revision,2);assert.equal(JSON.parse(saved.snapshot.data[key]).totalPoints,110);
  assert.equal(saved.snapshot.data.zensho_goimon_archive_v4_lv1,initial.data.zensho_goimon_archive_v4_lv1);
  assert.deepEqual(JSON.parse((await db.prepare('SELECT save_json FROM save_revisions WHERE user_id=? AND revision=1').bind(user).first()).save_json),initial);
  await applyMissionLearning(db,user,a.attempt_id,2);saved=await readMissionLearning(db,user);assert.equal(JSON.parse(saved.snapshot.data[key]).totalPoints,110);
  assert.equal((await applyMissionGrowth(db,user,a.attempt_id,0)).revision,2);
  const b=await scored(db,'jaen'),c=await scored(db,'audio');const races=await Promise.allSettled([applyMissionGrowth(db,user,b.attempt_id,3),applyMissionGrowth(db,user,c.attempt_id,3)]);
  assert.equal(races.filter(r=>r.status==='fulfilled').length,1);assert.match(races.find(r=>r.status==='rejected').reason.message,/learning_revision_conflict/);
  const pending=races[0].status==='rejected'?b:c,before=await readMissionLearning(db,user);
  await db.prepare("CREATE TRIGGER fail_growth BEFORE UPDATE ON saves BEGIN SELECT RAISE(ABORT,'test_failure'); END").run();
  await assert.rejects(applyMissionGrowth(db,user,pending.attempt_id,4),/test_failure/);assert.deepEqual(await readMissionLearning(db,user),before);
  assert.equal(await db.prepare('SELECT * FROM mission_growth_receipts WHERE attempt_id=?').bind(pending.attempt_id).first(),null);
  await db.prepare('DROP TRIGGER fail_growth').run();await applyMissionGrowth(db,user,pending.attempt_id,4);
  // Generic synchronization cannot erase applied growth, swap or remove a pet.
  saved=await readMissionLearning(db,user);
  const changed=structuredClone(saved.snapshot);changed.data[key]=initial.data[key];
  assert.equal((await syncMissionSnapshot(db,user,{operationId:'restore_old_growth_01',baseRevision:5,expectedRevision:5,snapshot:changed})).conflict,true);
  for(const action of ['swap','remove']){
   const candidate=structuredClone(saved.snapshot);if(action==='remove')delete candidate.data[key];else candidate.data[key]=JSON.stringify(pet('replacement'));
   assert.equal((await syncMissionSnapshot(db,user,{operationId:'growth_'+action+'_operation',baseRevision:5,expectedRevision:5,snapshot:candidate})).conflict,true);
  }
  const independent=structuredClone(initial);independent.data.zensho_learning_log_v1_lv2='{"custom":1}';
  const merged=await syncMissionSnapshot(db,user,{operationId:'independent_save_001',baseRevision:1,expectedRevision:5,snapshot:independent});assert.equal(merged.revision,6);assert.equal(JSON.parse(merged.snapshot.data[key]).totalPoints,150);
  if(h.origin){
   const call=body=>fetch(h.origin+'/api/v1/missions/growth/apply',{method:'POST',headers:{Origin:h.origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
   const replay=await call({attemptId:a.attempt_id,expectedRevision:0});assert.equal(replay.status,200);assert.equal((await replay.json()).replayed,true);
   assert.equal((await call({attemptId:a.attempt_id,expectedRevision:6,score:20})).status,400);
   const noTarget=await call({attemptId:missing.attempt_id,expectedRevision:6});assert.equal(noTarget.status,409);assert.equal((await noTarget.json()).error,'growth_target_missing');
  }
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM economy_receipts').first()).n,0);
  await db.prepare('DELETE FROM users WHERE id=?').bind(user).run();assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM mission_growth_receipts').first()).n,0);
 }finally{await h.close();}
});
