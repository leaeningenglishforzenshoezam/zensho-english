import test from 'node:test';import assert from 'node:assert/strict';
import {projectCompanionAction,applyCompanionAction} from '../src/mission_companion.js';
import {getDefaultCurrent,names} from '../src/data/mission-growth-rules.js';
import {readMissionLearning} from '../src/mission_learning.js';
import {syncMissionSnapshot} from '../src/mission_sync.js';
import {createOfflineDb} from './offline-db.js';import {startHarness} from '../dev/server.js';
import {handleMissionDraft} from '../src/mission_api.js';
const current='zensho_goimon_current_v4_lv1',archive='zensho_goimon_archive_v4_lv1',dex='zensho_goimon_dex_discovery_v2_lv1';
function fixture(points=900){const g=getDefaultCurrent();Object.assign(g,{id:'original',stats:{chie:points,kotoba:0,onkan:0,bunmyaku:0},totalPoints:points,level:Math.floor(points/20)+1,createdAt:1,updatedAt:1,custom:{preserve:true}});return {schemaVersion:1,data:{[current]:JSON.stringify(g),[archive]:'[]',zensho_learning_log_v1_lv1:'{}'}};}
const change=(s,fn)=>{const g=JSON.parse(s.data[current]);fn(g);s.data[current]=JSON.stringify(g);return s;};
test('Lifecycle projection recomputes evolution and preserves full history; new generation preserves original individual',()=>{
 const initial=fixture(),stages=['child','growth','mid','final'];let snapshot=initial;
 for(const stage of stages){snapshot=projectCompanionAction(snapshot,'evolve','original',100);const g=JSON.parse(snapshot.data[current]);assert.equal(g.stage,stage);assert.equal(g.type,'hirameki');assert.equal(g.pendingEvolution,false);assert.equal(g.totalPoints,900);assert.equal(g.evolutionHistory.at(-1).label,names.hirameki[stage]);assert.equal(JSON.parse(snapshot.data[dex])['hirameki:'+stage],true);}
 assert.equal(JSON.parse(snapshot.data[current]).evolutionHistory.length,5);assert.throws(()=>projectCompanionAction(snapshot,'evolve','original'),/evolution_not_ready/);
 const next=projectCompanionAction(snapshot,'new-generation','original',123,'new-egg'),egg=JSON.parse(next.data[current]);
 assert.equal(egg.id,'new-egg');assert.equal(egg.generation,2);assert.equal(egg.totalPoints,0);assert.equal(egg.createdAt,123);assert.equal(egg.stage,'egg');assert.deepEqual(JSON.parse(next.data[archive])[0],JSON.parse(snapshot.data[current]));assert.equal(next.data[dex],snapshot.data[dex]);assert.equal(next.data.zensho_learning_log_v1_lv1,'{}');assert.deepEqual(initial,fixture());
 const fake=change(fixture(99),g=>{g.pendingEvolution=true;g.pendingStage='final';g.pendingType='mr_uno';});assert.throws(()=>projectCompanionAction(fake,'evolve','original'),/evolution_not_ready/);
 for(const route of ['mr_uno','q7_special','q8_special','q10_special']){const s=change(fixture(100),g=>{g.specialRoute=route;});assert.equal(JSON.parse(projectCompanionAction(s,'evolve','original').data[current]).type,route);}
 for(const damage of [g=>g.evolutionHistory=null,g=>g.discoveredForms=['unknown'],g=>g.specialRoute='made-up',g=>g.totalPoints=1])assert.throws(()=>projectCompanionAction(change(fixture(),damage),'evolve','original'),/invalid_growth_record/);
 const corrupt=fixture();corrupt.data[dex]='[]';assert.throws(()=>projectCompanionAction(corrupt,'evolve','original'),/invalid_record/); // Shared schema rejects this before growth validation.
 const full=fixture();full.data[archive]=JSON.stringify(Array.from({length:15},(_,i)=>({...JSON.parse(initial.data[current]),id:'archived_'+i})));assert.throws(()=>projectCompanionAction(full,'new-generation','original'),/companion_archive_full/);
 assert.throws(()=>projectCompanionAction(initial,'evolve','other'),/growth_target_mismatch/);assert.throws(()=>projectCompanionAction(initial,'new-generation','original',1,'original'),/invalid_growth_record/);
});
for(const platform of ['offline','D1'])test('Lifecycle exactly-once transactions, snapshot replay, sync protection and rollback: '+platform,async()=>{
 const h=platform==='offline'?await createOfflineDb():await startHarness();try{const db=h.db,user='local-test',initial=fixture();
 await db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind(user,JSON.stringify(initial)).run();
 const first={operationId:'evolve_original_0001',expectedRevision:1,action:'evolve',targetId:'original'};
 const races=await Promise.all([applyCompanionAction(db,user,first),applyCompanionAction(db,user,first)]);assert.equal(races.filter(r=>!r.replayed).length,1);assert.ok(races.every(r=>JSON.parse(r.snapshot.data[current]).stage==='child'));
 const second=await applyCompanionAction(db,user,{...first,operationId:'evolve_original_0002',expectedRevision:2});assert.equal(JSON.parse(second.snapshot.data[current]).stage,'growth');
 const generation={operationId:'new_generation_0001',expectedRevision:3,action:'new-generation',targetId:'original'};
 const births=await Promise.all([applyCompanionAction(db,user,generation),applyCompanionAction(db,user,generation)]);assert.equal(births.filter(r=>!r.replayed).length,1);assert.deepEqual(births[0].snapshot,births[1].snapshot);const egg=JSON.parse(births[0].snapshot.data[current]);assert.notEqual(egg.id,'original');assert.equal(JSON.parse(births[0].snapshot.data[archive]).length,1);
 const replay=await applyCompanionAction(db,user,first);assert.equal(replay.revision,2);assert.equal(JSON.parse(replay.snapshot.data[current]).stage,'child');
 await assert.rejects(applyCompanionAction(db,user,{...first,action:'new-generation'}),/operation_id_reused/);
 await assert.rejects(applyCompanionAction(db,'other',first),/learning_revision_conflict/);
 const restored=await syncMissionSnapshot(db,user,{operationId:'restore_pre_lifecycle',baseRevision:4,expectedRevision:4,snapshot:initial});assert.equal(restored.conflict,true); // protected even without growth receipts
 const before=await readMissionLearning(db,user),next={operationId:'new_generation_0002',expectedRevision:4,action:'new-generation',targetId:egg.id};
 await db.prepare("CREATE TRIGGER fail_lifecycle BEFORE UPDATE ON saves BEGIN SELECT RAISE(ABORT,'test_failure'); END").run();await assert.rejects(applyCompanionAction(db,user,next),/test_failure/);assert.deepEqual(await readMissionLearning(db,user),before);assert.equal(await db.prepare('SELECT * FROM mission_companion_receipts WHERE operation_id=?').bind(next.operationId).first(),null);assert.equal(await db.prepare('SELECT * FROM save_revisions WHERE user_id=? AND revision=4').bind(user).first(),null);
 await db.prepare('DROP TRIGGER fail_lifecycle').run();await applyCompanionAction(db,user,next);
 const state=await readMissionLearning(db,user),targetId=JSON.parse(state.snapshot.data[current]).id;
 const competing=await Promise.allSettled(['a','b'].map(suffix=>applyCompanionAction(db,user,{operationId:'competing_generation_'+suffix,expectedRevision:5,action:'new-generation',targetId})));assert.equal(competing.filter(r=>r.status==='fulfilled').length,1);assert.match(competing.find(r=>r.status==='rejected').reason.message,/learning_revision_conflict/);
 if(h.origin){
  const call=body=>fetch(h.origin+'/api/v1/missions/companion/action',{method:'POST',headers:{Origin:h.origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
  const response=await call(first);assert.equal(response.status,200);assert.equal((await response.json()).replayed,true);
  assert.equal((await call({...first,stage:'final'})).status,400);
  const currentState=await readMissionLearning(db,user);const notReady=await call({operationId:'evolve_empty_egg_0001',expectedRevision:6,action:'evolve',targetId:JSON.parse(currentState.snapshot.data[current]).id});assert.equal(notReady.status,409);assert.equal((await notReady.json()).error,'evolution_not_ready');
 }
 // An expired acknowledgement history must fail, never execute the action again.
 await db.prepare('DELETE FROM save_revisions WHERE user_id=? AND revision=2').bind(user).run();await assert.rejects(applyCompanionAction(db,user,first),/sync_ack_unavailable/);assert.equal((await readMissionLearning(db,user)).revision,6);
 assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM economy_receipts').first()).n,0);
 await db.prepare('DELETE FROM users WHERE id=?').bind(user).run();assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM mission_companion_receipts').first()).n,0);
 }finally{await h.close();}
});
test('Lifecycle API remains disabled by default and enforces origin/authentication before operations',async()=>{
 const request=new Request('https://local.test/api/v1/missions/companion/action',{method:'POST',body:'{}'});
 assert.equal((await handleMissionDraft(request,{})).status,404);
 assert.equal((await handleMissionDraft(request,{MISSION_REWARDS_TEST_ENABLED:true,ALLOWED_ORIGIN:'https://local.test'})).status,403);
 const h=await createOfflineDb();try{const r=await handleMissionDraft(new Request(request,{headers:{Origin:'https://local.test','Content-Type':'application/json'}}),{MISSION_REWARDS_TEST_ENABLED:true,ALLOWED_ORIGIN:'https://local.test',DB:h.db,RATE_LIMITER:{limit:async()=>({success:true})},AUTH_RATE_LIMITER:{limit:async()=>({success:true})}});assert.equal(r.status,401);}finally{await h.close();}
});
