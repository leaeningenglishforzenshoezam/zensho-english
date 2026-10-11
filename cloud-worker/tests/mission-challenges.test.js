import test from 'node:test';import assert from 'node:assert/strict';import {readFile,stat} from 'node:fs/promises';import vm from 'node:vm';import {getPlatformProxy} from 'wrangler';
import {issueChallengeAttempt,submitChallengeAttempt,claimChallengeReward,issueWordAttempt,submitWordAttempt,claimWordReward,issueIdiomAttempt,submitIdiomAttempt,claimIdiomReward,issueExamAttempt,submitExamAttempt,claimExamReward,claimBasicBonus} from '../src/mission_rewards.js';import {readEconomy} from '../src/economy_repository.js';import {handleMissionDraft} from '../src/mission_api.js';import {createSession} from '../src/session.js';
const now=Date.parse('2026-10-12T00:00:00Z'),DAY=86400000,plain=x=>JSON.parse(JSON.stringify(x));
test('All listening, reading and reorder content and answers match original data; audio assets exist',async()=>{
 const c=vm.createContext({window:{}});for(const f of ['listening_type2_1kyu.js','listening_type3_1kyu.js','listening_type5_1kyu.js','q7_data.js','q10_data.js','dialogue_data.js','reorder_1kyu.js'])vm.runInContext(await readFile(new URL('../../'+f,import.meta.url),'utf8'),c);
 const listening=JSON.parse(await readFile(new URL('../src/data/mission-listening.json',import.meta.url),'utf8')),reading=JSON.parse(await readFile(new URL('../src/data/mission-reading.json',import.meta.url),'utf8')),reorder=JSON.parse(await readFile(new URL('../src/data/mission-reorder.json',import.meta.url),'utf8'));
 for(const n of [2,3,5]){const original=c.window['LISTENING_TYPE'+n+'_1KYU'];assert.equal(listening[n].length,original.length);for(let i=0;i<original.length;i++){const q=original[i],s=listening[n][i];assert.equal(s.id,q.id);assert.equal(s.audioFile,q.audioFile);assert.ok((await stat(new URL('../../'+s.audioFile,import.meta.url))).size>100);const pairs=n===5?s.questions.map((x,j)=>[x,q.questions[j]]):[[s,q]];for(const [x,raw]of pairs){assert.deepEqual(x.choices,plain(raw.choices.map(c=>c.text)));assert.equal(x.answer,raw.choices.findIndex(c=>c.id===raw.answerId));if(n===5)assert.equal(x.prompt,raw.stem);}}}
 for(const [category,original]of [['q7',c.window.q7Sets],['dialogue8',vm.runInContext('dialogueQuestions',c)],['q10',c.window.q10Questions]]){
  assert.equal(reading[category].length,original.length);for(let i=0;i<original.length;i++){const q=original[i],s=reading[category][i];assert.equal(s.id,String(q.id));assert.equal(s.questions.length,5);
   if(category==='q7'){assert.deepEqual(s.passage,plain(q.passage));assert.deepEqual(s.summary,plain(q.summary));for(let j=0;j<5;j++){assert.deepEqual(s.questions[j].choices,plain(q.questions[j].choices));assert.equal(s.questions[j].answer,q.questions[j].answer-1);}}
   if(category==='dialogue8'){assert.equal(new Set(s.questions.map(x=>x.answer)).size,5);assert.deepEqual(s.dialogue,plain(q.dialogue.map(({speaker,text,blank})=>({speaker,...(blank?{blank}:{text})}))));for(const x of s.questions){assert.deepEqual(x.choices,plain(q.choices.map(c=>c.text)));assert.equal(x.answer,q.choices.findIndex(c=>c.id===q.answers[x.id]));}}
   if(category==='q10'){assert.deepEqual(s.passage,plain(q.paragraphs.map(p=>p.sentences.map(x=>x.en).join(' '))));for(const x of s.questions){const raw=q.blanks.find(b=>b.id===x.id);assert.deepEqual(x.choices,plain(raw.choices.map(c=>c.text)));assert.equal(x.answer,raw.choices.findIndex(c=>c.id===raw.answer));}}
  }
 }
 assert.deepEqual(reorder,plain(c.window.REORDER_1KYU.map(({id,stemBefore,stemAfter,chunks,answer})=>({id,stemBefore,stemAfter,chunks,answer}))));
});
function noSecrets(value){if(!value||typeof value!=='object')return;for(const [k,v]of Object.entries(value)){assert.ok(!['answer','answerId','answers','script','explanation','evidence','completed'].includes(k));noSecrets(v);}}
test('Local D1 challenge rotations, complete sets, thresholds, reorder validation and daily maximum 19',async()=>{
 const mf=await getPlatformProxy({configPath:new URL('../wrangler.jsonc',import.meta.url).pathname,persist:false});try{const db=mf.env.DB;
 for(const f of ['0001_initial.sql','0002_sessions.sql'])for(const sql of (await readFile(new URL('../migrations/'+f,import.meta.url),'utf8')).split(';').filter(x=>x.trim()))await db.prepare(sql).run();
 for(const f of ['economy-v1.sql','mission-rewards-v1.sql'])for(const sql of (await readFile(new URL('../schema-drafts/'+f,import.meta.url),'utf8')).match(/CREATE TABLE[\s\S]*?;|CREATE TRIGGER[\s\S]*?\nEND;/g))await db.prepare(sql).run();
 for(const id of ['a','b','api'])await db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind(id,'sub-'+id).run();await db.prepare('INSERT INTO saves(user_id,save_json) VALUES (?,?)').bind('a','{"learning":"untouched"}').run();
 const secret=async(a,user='a')=>JSON.parse((await db.prepare('SELECT private_json FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind(user,a.attemptId).first()).private_json);
 const key=async(a,user='a')=>(await secret(a,user)).questions.map(q=>q.answer);
 const issue=(slot,day=now,user='a',rng=()=>.5)=>issueChallengeAttempt(db,user,'1',slot,day,rng);
 for(const slot of ['listening','reading','reorder']){
  const pair=await Promise.all([issue(slot,now,'a',()=>.5),issue(slot,now,'a',()=>.1)]),a=pair[0];assert.deepEqual(a.questions,pair[1].questions);assert.equal(a.questions.length,5);noSecrets(a);const answers=await key(a),bad=structuredClone(answers);
  for(let i=0;i<2;i++){if(slot==='reorder')[bad[i][0],bad[i][1]]=[bad[i][1],bad[i][0]];else bad[i]=(bad[i]+1)%a.questions[i].choices.length;}
  assert.equal((await submitChallengeAttempt(db,'a',a.attemptId,bad,slot,now+1)).correct,3);await assert.rejects(claimChallengeReward(db,'a',a.attemptId,'failed_'+slot+'_0001',0,slot,now+2),/mission_not_completed/);
  const four=structuredClone(await key(pair[1]));if(slot==='reorder')[four[0][0],four[0][1]]=[four[0][1],four[0][0]];else four[0]=(four[0]+1)%pair[1].questions[0].choices.length;
  await assert.rejects(submitChallengeAttempt(db,'b',pair[1].attemptId,four,slot,now),/attempt_not_found/);
  await assert.rejects(submitChallengeAttempt(db,'a',pair[1].attemptId,four,'exam',now),/mission_not_supported/);
  if(slot==='reorder'){const invalid=structuredClone(four);invalid[0][1]=invalid[0][0];await assert.rejects(submitChallengeAttempt(db,'a',pair[1].attemptId,invalid,slot,now),/invalid_answers/);const unk=structuredClone(four);unk[0][0]='unknown';await assert.rejects(submitChallengeAttempt(db,'a',pair[1].attemptId,unk,slot,now),/invalid_answers/);const p=await secret(pair[1]);for(const q of p.questions){assert.ok(q.chunks.every(c=>/^[a-f0-9-]{36}$/.test(c.id)));assert.equal(new Set(q.answer).size,q.chunks.length);}}
  assert.equal((await submitChallengeAttempt(db,'a',pair[1].attemptId,four,slot,now+3)).completed,true);const revision=(await readEconomy(db,'a')).revision;
  const claims=await Promise.all(['claim_'+slot+'_00001','claim_'+slot+'_00002'].map(op=>claimChallengeReward(db,'a',pair[1].attemptId,op,revision,slot,now+4)));assert.equal(claims.filter(x=>x.replayed).length,1);
 }
 assert.equal((await readEconomy(db,'a')).state.shards,9);
 const w=await issueWordAttempt(db,'a','1',now,()=>.5),i=await issueIdiomAttempt(db,'a','1','meaning',now,()=>.5),e=await issueExamAttempt(db,'a','1','sentence','a',now,()=>.5);
 await submitWordAttempt(db,'a',w.attemptId,await key(w),now+10);await submitIdiomAttempt(db,'a',i.attemptId,await key(i),now+10);await submitExamAttempt(db,'a',e.attemptId,await key(e),now+10);
 await claimWordReward(db,'a',w.attemptId,'daily_word_000001',3,now+11);await claimIdiomReward(db,'a',i.attemptId,'daily_idiom_00001',4,now+11);await claimExamReward(db,'a',e.attemptId,'daily_exam_000001',5,now+11);await claimBasicBonus(db,'a','1','2026-10-12','daily_bonus_00001',6,now+11);assert.equal((await readEconomy(db,'a')).state.shards,19);
 const again=await issue('reading');await submitChallengeAttempt(db,'a',again.attemptId,await key(again),'reading',now+20);await claimChallengeReward(db,'a',again.attemptId,'new_reading_00001',7,'reading',now+21);assert.equal((await readEconomy(db,'a')).state.shards,19);
 // First opened day: L2 / q7. Subsequent opened dates rotate once, even across skipped days.
 const l2=await issue('listening'),r7=await issue('reading');assert.equal(l2.format,2);assert.equal(r7.category,'q7');assert.ok(r7.passage.length&&r7.summary.length);
 const l3=await issue('listening',now+DAY),r8=await issue('reading',now+DAY);assert.equal(l3.format,3);assert.equal(r8.category,'dialogue8');assert.equal(r8.questions[0].choices.length,6);assert.ok(r8.dialogue.some(x=>x.blank));
 await assert.rejects(submitChallengeAttempt(db,'a',r8.attemptId,Array(5).fill(0),'reading',now+DAY+1),/invalid_answers/);await submitChallengeAttempt(db,'a',r8.attemptId,await key(r8),'reading',now+DAY+1);
 const l5=await issue('listening',now+3*DAY),r10=await issue('reading',now+3*DAY);assert.equal(l5.format,5);assert.ok(l5.audioFile&&l5.setId);assert.equal(r10.category,'q10');assert.ok(r10.passage.length);assert.deepEqual((await issue('listening',now+3*DAY)).questions,l5.questions);
 await submitChallengeAttempt(db,'a',l5.attemptId,await key(l5),'listening',now+3*DAY+1);await submitChallengeAttempt(db,'a',r10.attemptId,await key(r10),'reading',now+3*DAY+1);assert.equal((await issue('listening',now+4*DAY)).format,2);assert.equal((await issue('reading',now+4*DAY)).category,'q7');
 const bfirst=await issue('listening',now+4*DAY,'b');assert.equal(bfirst.format,2);await assert.rejects(issueChallengeAttempt(db,'a','2','reading',now),/mission_not_supported/);
 await assert.rejects(submitChallengeAttempt(db,'b',bfirst.attemptId,await key(bfirst,'b'),'listening',bfirst.expiresAt),/attempt_expired/);
 assert.equal((await db.prepare('SELECT save_json FROM saves WHERE user_id=?').bind('a').first()).save_json,'{"learning":"untouched"}');
 const session=await createSession(db,'api'),env={DB:db,ALLOWED_ORIGIN:'http://localhost:8765',MISSION_REWARDS_TEST_ENABLED:true,RATE_LIMITER:{limit:async()=>({success:true})},AUTH_RATE_LIMITER:{limit:async()=>({success:true})}};
 const call=(path,payload)=>handleMissionDraft(new Request('https://test/api/v1/missions/'+path,{method:'POST',headers:{Origin:env.ALLOWED_ORIGIN,Authorization:'Bearer '+session.token,'Content-Type':'application/json'},body:JSON.stringify(payload)}),env);
 assert.equal((await call('listening/start',{level:'1',format:5})).status,400);for(const slot of ['listening','reading','reorder']){const a=await (await call(slot+'/start',{level:'1'})).json();noSecrets(a);assert.equal((await call(slot+'/submit',{attemptId:a.attemptId,answers:await key(a,'api')})).status,200);const rev=(await readEconomy(db,'api')).revision;assert.equal((await call(slot+'/claim',{attemptId:a.attemptId,operationId:'api_'+slot+'_claim01',expectedRevision:rev})).status,200);}assert.equal((await readEconomy(db,'api')).state.shards,9);
 }finally{await mf.dispose();}
});
