import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import vm from 'node:vm';import {getPlatformProxy} from 'wrangler';
import {issueIdiomAttempt,submitIdiomAttempt,claimIdiomReward,submitWordAttempt,claimWordReward} from '../src/mission_rewards.js';import {readEconomy} from '../src/economy_repository.js';import {handleMissionDraft} from '../src/mission_api.js';import {createSession} from '../src/session.js';
const now=Date.parse('2026-10-12T00:00:00Z'),DAY=86400000;
test('Server idiom bank equals active quiz data',async()=>{
 const c={window:{}};vm.runInNewContext(await readFile(new URL('../../idiom_data_1kyu.js',import.meta.url),'utf8'),c);
 const bank=JSON.parse(await readFile(new URL('../src/data/mission-idioms.json',import.meta.url),'utf8'));assert.deepEqual(bank,JSON.parse(JSON.stringify(c.window.IDIOM_DATA_1KYU.map(({id,expression,ja,paraphraseTo,noteIds})=>({id,expression,ja,paraphraseTo,noteIds})))));assert.equal(bank.length,287);
});
test('Local D1: independent mode cursors, full-session-only advancement, scoring, common daily reward and rollback',async()=>{
 const mf=await getPlatformProxy({configPath:new URL('../wrangler.jsonc',import.meta.url).pathname,persist:false});try{const db=mf.env.DB;
 for(const f of ['0001_initial.sql','0002_sessions.sql'])for(const sql of (await readFile(new URL('../migrations/'+f,import.meta.url),'utf8')).split(';').filter(x=>x.trim()))await db.prepare(sql).run();
 for(const f of ['economy-v1.sql','mission-rewards-v1.sql'])for(const sql of (await readFile(new URL('../schema-drafts/'+f,import.meta.url),'utf8')).match(/CREATE TABLE[\s\S]*?;|CREATE TRIGGER[\s\S]*?\nEND;/g))await db.prepare(sql).run();
 for(const id of ['a','b','api','bank'])await db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind(id,'sub-'+id).run();
 await db.prepare('INSERT INTO saves(user_id,save_json) VALUES (?,?)').bind('a','{"learning":"preserved"}').run();
 const issue=(mode='meaning',day=now,user='a')=>issueIdiomAttempt(db,user,'1',mode,day,()=>.5);
 const key=async(a,user='a')=>JSON.parse((await db.prepare('SELECT private_json FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind(user,a.attemptId).first()).private_json).questions.map(q=>q.answer);
 const cursor=async(mode='meaning')=>db.prepare('SELECT * FROM mission_idiom_cursors WHERE user_id=? AND level=? AND mode=?').bind('a','1',mode).first();
 const m=await issue(),s=await issue('synonym');assert.equal(m.questions.length,15);assert.equal(m.mode,'meaning');assert.equal(s.mode,'synonym');assert.equal(JSON.stringify(s).includes('answer'),false);
 assert.ok(s.questions.every(q=>q.choices.length===4&&new Set(q.choices).size===4));
 const bank=JSON.parse(await readFile(new URL('../src/data/mission-idioms.json',import.meta.url),'utf8')),sk=await key(s);
 for(let i=0;i<15;i++){const valid=bank[s.questions[i].id-1].paraphraseTo;assert.equal(s.questions[i].choices.filter(x=>valid.includes(x)).length,1);assert.ok(valid.includes(s.questions[i].choices[sk[i]]));}
 await assert.rejects(submitIdiomAttempt(db,'a',m.attemptId,Array(14).fill(0),now),/invalid_answers/);assert.equal((await cursor()).next_start,1);assert.equal((await cursor()).advanced,0);
 await assert.rejects(submitIdiomAttempt(db,'b',m.attemptId,Array(15).fill(0),now),/attempt_not_found/);await assert.rejects(submitWordAttempt(db,'a',m.attemptId,Array(20).fill(0),now),/unsupported_attempt/);
 const mk=await key(m),wrong=mk.map((x,i)=>i<4?(x+1)%4:x);assert.equal((await submitIdiomAttempt(db,'a',m.attemptId,wrong,now+1)).correct,11);assert.equal((await cursor()).next_start,16);assert.equal((await cursor('synonym')).next_start,1);
 await assert.rejects(claimIdiomReward(db,'a',m.attemptId,'idiom_claim_000001',0,now+2),/mission_not_completed/);await assert.rejects(submitIdiomAttempt(db,'a',m.attemptId,mk,now+3),/attempt_already_submitted/);
 const retry=await issue();assert.equal(retry.rangeStart,1);await submitIdiomAttempt(db,'a',retry.attemptId,(await key(retry)).map((x,i)=>i<3?(x+1)%4:x),now+4);assert.equal((await cursor()).next_start,16);
 await assert.rejects(claimWordReward(db,'a',retry.attemptId,'idiom_claim_000001',0,now+5),/unsupported_attempt/);
 const races=await Promise.all(['idiom_claim_000001','idiom_claim_000002'].map(op=>claimIdiomReward(db,'a',retry.attemptId,op,0,now+6)));assert.equal(races.filter(x=>x.replayed).length,1);assert.equal((await readEconomy(db,'a')).state.shards,2);
 await submitIdiomAttempt(db,'a',s.attemptId,sk,now+7);assert.equal((await cursor('synonym')).next_start,16);assert.equal((await claimIdiomReward(db,'a',s.attemptId,'idiom_claim_000003',1,now+8)).replayed,true);assert.equal((await readEconomy(db,'a')).state.shards,2);
 const next=await issue('meaning',now+DAY);assert.equal(next.rangeStart,16);const aborted=await issue('synonym',now+DAY);await assert.rejects(submitIdiomAttempt(db,'a',aborted.attemptId,await key(aborted),now+DAY+2*3600000),/attempt_expired/);
 assert.equal((await issue('synonym',now+2*DAY)).rangeStart,16);assert.equal((await issue('meaning',now+2*DAY)).rangeStart,16);
 // Grading and advancement roll back together if the trigger fails.
 const roll=await issue('meaning',now+2*DAY),before=await cursor();await db.prepare("CREATE TRIGGER test_fail_grade AFTER UPDATE OF next_start ON mission_idiom_cursors BEGIN SELECT RAISE(ABORT,'test_failure'); END;").run();
 await assert.rejects(submitIdiomAttempt(db,'a',roll.attemptId,await key(roll),now+2*DAY+1));assert.deepEqual(await cursor(),before);assert.equal((await db.prepare('SELECT submission_json FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind('a',roll.attemptId).first()).submission_json,null);await db.prepare('DROP TRIGGER test_fail_grade').run();await submitIdiomAttempt(db,'a',roll.attemptId,await key(roll),now+2*DAY+2);assert.equal((await cursor()).next_start,31);
 // Tail matches browser progression: 256..270, 271..285, 273..287, then wrap.
 await db.prepare('UPDATE mission_idiom_cursors SET next_start=271 WHERE user_id=? AND mode=?').bind('a','meaning').run();const tail1=await issue('meaning',now+3*DAY);assert.equal(tail1.rangeStart,271);await submitIdiomAttempt(db,'a',tail1.attemptId,await key(tail1),now+3*DAY+1);
 const tail2=await issue('meaning',now+4*DAY);assert.equal(tail2.rangeStart,273);assert.equal(tail2.rangeEnd,287);await submitIdiomAttempt(db,'a',tail2.attemptId,await key(tail2),now+4*DAY+1);assert.equal((await issue('meaning',now+5*DAY)).rangeStart,1);
 await assert.rejects(issueIdiomAttempt(db,'a','2','meaning',now),/mission_not_supported/);await assert.rejects(issueIdiomAttempt(db,'a','1','expression_from_meaning',now),/mission_not_supported/);
 // All 287 entries can issue unambiguous choices relative to their known synonyms.
 const visited=new Set();await issue('synonym',now,'bank');
 const starts=[...Array.from({length:19},(_,i)=>1+15*i),273];
 for(let block=0;block<starts.length;block++){
  await db.prepare('UPDATE mission_idiom_cursors SET next_start=? WHERE user_id=? AND mode=?').bind(starts[block],'bank','synonym').run();
  const attempt=await issue('synonym',now+(block+1)*DAY,'bank'),correct=await key(attempt,'bank');
  for(let i=0;i<15;i++){const q=attempt.questions[i],valid=bank[q.id-1].paraphraseTo.map(x=>x.trim().toLowerCase());assert.equal(q.choices.filter(x=>valid.includes(x.trim().toLowerCase())).length,1);assert.ok(valid.includes(q.choices[correct[i]].trim().toLowerCase()));visited.add(q.id);}
 }assert.equal(visited.size,287);
 const bm1=await issue('meaning',now,'b'),bm2=await issue('meaning',now,'b');await Promise.all([submitIdiomAttempt(db,'b',bm1.attemptId,await key(bm1,'b'),now+1),submitIdiomAttempt(db,'b',bm2.attemptId,await key(bm2,'b'),now+1)]);
 assert.equal((await db.prepare('SELECT next_start FROM mission_idiom_cursors WHERE user_id=? AND mode=?').bind('b','meaning').first()).next_start,16);
 // Actual authenticated request adapter; test-only, no external HTTP.
 const session=await createSession(db,'api'),env={DB:db,ALLOWED_ORIGIN:'http://localhost:8765',MISSION_REWARDS_TEST_ENABLED:true,RATE_LIMITER:{limit:async()=>({success:true})},AUTH_RATE_LIMITER:{limit:async()=>({success:true})}};
 const call=(path,payload)=>handleMissionDraft(new Request('https://test/api/v1/missions/'+path,{method:'POST',headers:{Origin:env.ALLOWED_ORIGIN,Authorization:'Bearer '+session.token,'Content-Type':'application/json'},body:JSON.stringify(payload)}),env);
 assert.equal((await call('idioms/start',{level:'1'})).status,400);const issued=await (await call('idioms/start',{level:'1',mode:'meaning'})).json();assert.equal(issued.slot,'idioms');assert.equal((await call('words/submit',{attemptId:issued.attemptId,answers:Array(20).fill(0)})).status,400);
 assert.equal((await call('idioms/submit',{attemptId:issued.attemptId,answers:await key(issued,'api')})).status,200);assert.equal((await call('idioms/claim',{attemptId:issued.attemptId,operationId:'api_idiom_claim_01',expectedRevision:0})).status,200);assert.equal((await readEconomy(db,'api')).state.shards,2);
 assert.equal((await db.prepare('SELECT save_json FROM saves WHERE user_id=?').bind('a').first()).save_json,'{"learning":"preserved"}');
 }finally{await mf.dispose();}
});
