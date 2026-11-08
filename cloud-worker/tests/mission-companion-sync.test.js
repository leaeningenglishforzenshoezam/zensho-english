import test from 'node:test';import assert from 'node:assert/strict';
import {companionSyncConflicts} from '../src/mission_companion_sync.js';
import {mergeMissionSnapshot,syncMissionSnapshot} from '../src/mission_sync.js';
import {applyMissionGrowth} from '../src/mission_growth.js';
import {readMissionLearning} from '../src/mission_learning.js';
import {issueWordAttempt,submitWordAttempt} from '../src/mission_rewards.js';
import {createOfflineDb} from './offline-db.js';import {startHarness} from '../dev/server.js';
const current='zensho_goimon_current_v4_lv1',archive='zensho_goimon_archive_v4_lv1';
const pet=(id,points=90)=>({id,stage:'child',type:'hirameki',nickname:'',stats:{chie:points,kotoba:0,onkan:0,bunmyaku:0},totalPoints:points,level:Math.floor(points/20)+1,updatedAt:1,hallOfFame:false,evolutionHistory:[{stage:'egg'}],discoveredForms:['egg','child'],custom:{keep:true}});
const snap=()=>({schemaVersion:1,data:{[current]:JSON.stringify(pet('A')),[archive]:JSON.stringify([{...pet('B'),hallOfFame:true}])}});
function swap(s){const next=structuredClone(s),a=JSON.parse(next.data[current]),list=JSON.parse(next.data[archive]),b=list.shift();b.hallOfFame=false;list.unshift(a);next.data[current]=JSON.stringify(b);next.data[archive]=JSON.stringify(list);return next;}
function edit(s,key,fn){const value=JSON.parse(s.data[key]);fn(value);s.data[key]=JSON.stringify(value);}
test('Companion gate allows same-ID swap/nickname but rejects loss, cloning, stat/history tampering and duplicate IDs',()=>{
 const before=snap(),next=swap(before);assert.deepEqual(companionSyncConflicts(before,next),[]);
 edit(next,current,g=>{g.nickname='テスト';g.updatedAt=2;});assert.deepEqual(companionSyncConflicts(before,next),[]);
 for(const mutate of [s=>edit(s,archive,a=>{a[0].stats.chie=70;a[0].totalPoints=70;a[0].level=4;}),s=>edit(s,archive,a=>{a[0].evolutionHistory=[];}),s=>edit(s,archive,a=>{a[0].id='cloned';}),s=>edit(s,archive,a=>a.pop()),s=>edit(s,archive,a=>a.push({...a[0]})),s=>edit(s,current,g=>{g.stage='final';}),s=>edit(s,current,g=>{g.nickname='x'.repeat(21);}),s=>edit(s,current,g=>{g.updatedAt=0;}),s=>{s.data.zensho_goimon_dex_discovery_v2_lv1='{"fake:final":true}';}]){
  const bad=structuredClone(next);mutate(bad);assert.ok(companionSyncConflicts(before,bad).length);
 }
 const egg=snap();edit(egg,current,g=>{g.stage='egg';});const renamed=structuredClone(egg);edit(renamed,current,g=>{g.nickname='名前';});assert.ok(companionSyncConflicts(egg,renamed).length);
 // Property order alone must not block a valid move.
 next.data[current]=JSON.stringify(Object.fromEntries(Object.entries(JSON.parse(next.data[current])).reverse()));assert.deepEqual(companionSyncConflicts(before,next),[]);
 assert.deepEqual(before,snap());
});
test('Stale swaps conflict atomically instead of mixing different individuals across nested fields',()=>{
 const base=snap(),local=swap(base),remote=structuredClone(base);edit(remote,current,g=>{g.stats.chie=110;g.totalPoints=110;g.level=6;});
 const result=mergeMissionSnapshot(base,local,remote);assert.equal(result.ready,false);assert.ok(result.conflicts.some(p=>p.length===1&&p[0]===current));
 assert.equal(mergeMissionSnapshot(base,remote,local).ready,false);
});
for(const platform of ['offline','D1'])test('Receipt-safe swap and restore transaction: '+platform,async()=>{
 const h=platform==='offline'?await createOfflineDb():await startHarness();try{const db=h.db,user='local-test';
 await db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind(user,JSON.stringify(snap())).run();
 async function scored(){const now=Date.parse('2026-10-12T01:00:00Z'),a=await issueWordAttempt(db,user,'1',now);const row=await db.prepare('SELECT private_json FROM mission_attempts WHERE attempt_id=?').bind(a.attemptId).first();await submitWordAttempt(db,user,a.attemptId,JSON.parse(row.private_json).questions.map(q=>q.answer),now+1);return a.attemptId;}
 const awarded=await scored(),pending=await scored();await applyMissionGrowth(db,user,awarded,1);
 let saved=await readMissionLearning(db,user),candidate=swap(saved.snapshot);
 const request={operationId:'swap_companions_0001',baseRevision:2,expectedRevision:2,snapshot:candidate};
 await db.prepare("CREATE TRIGGER fail_swap BEFORE UPDATE ON saves BEGIN SELECT RAISE(ABORT,'test_failure'); END").run();
 await assert.rejects(syncMissionSnapshot(db,user,request),/test_failure/);assert.deepEqual(await readMissionLearning(db,user),saved);assert.equal(await db.prepare('SELECT * FROM mission_sync_receipts WHERE operation_id=?').bind(request.operationId).first(),null);
 await db.prepare('DROP TRIGGER fail_swap').run();const changed=await syncMissionSnapshot(db,user,request);assert.equal(changed.revision,3);assert.equal((await syncMissionSnapshot(db,user,request)).replayed,true);
 assert.equal(JSON.parse(changed.snapshot.data[current]).id,'B');assert.equal(JSON.parse(changed.snapshot.data[archive])[0].totalPoints,110);
 assert.equal((await applyMissionGrowth(db,user,awarded,0)).replayed,true);await assert.rejects(applyMissionGrowth(db,user,pending,3),/growth_target_mismatch/);
 // Old data cannot replace a protected archived individual, even at current base.
 candidate=structuredClone(changed.snapshot);edit(candidate,archive,a=>{a[0]=pet('A');});
 const refused=await syncMissionSnapshot(db,user,{operationId:'old_archive_restore',baseRevision:3,expectedRevision:3,snapshot:candidate});assert.equal(refused.conflict,true);assert.equal((await readMissionLearning(db,user)).revision,3);
 const back=await syncMissionSnapshot(db,user,{operationId:'swap_companions_back',baseRevision:3,expectedRevision:3,snapshot:swap(changed.snapshot)});assert.equal(back.revision,4);
 await applyMissionGrowth(db,user,pending,4);saved=await readMissionLearning(db,user);assert.equal(JSON.parse(saved.snapshot.data[current]).totalPoints,130);
 candidate=structuredClone(saved.snapshot);edit(candidate,current,g=>{g.nickname='相棒';g.updatedAt++;});
 const renamed=await syncMissionSnapshot(db,user,{operationId:'rename_companion_001',baseRevision:5,expectedRevision:5,snapshot:candidate});assert.equal(renamed.revision,6);assert.equal(JSON.parse(renamed.snapshot.data[current]).nickname,'相棒');
 assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM mission_growth_receipts').first()).n,2);assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM economy_receipts').first()).n,0);
 }finally{await h.close();}
});
