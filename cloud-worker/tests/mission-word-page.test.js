import test from 'node:test';
import assert from 'node:assert/strict';
import {startHarness} from '../dev/server.js';
import {WordSession} from '../dev/word-session.js';
test('Shared quiz pages use isolated server sessions; failed submissions and claims are safe to retry',async()=>{
 const h=await startHarness();try{
 for(const page of ['quiz.html','quiz_jaen.html','audio_quiz.html']){
  const r=await fetch(h.origin+'/'+page),html=await r.text();assert.equal(r.status,200);assert.match(html,/id="choices"/);assert.match(html,/src="\/word-page.js"/);
  const scripts=[...html.matchAll(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi)];assert.equal(scripts.length,1);assert.doesNotMatch(html,/<script[^>]*(?:cloud_|words_|goimon\.js|quiz\.js)/);
  assert.match(r.headers.get('content-security-policy'),/connect-src 'self'/);
 }
 for(const path of ['quiz.js','words_1kyu.js','cloud_auto.js','cloud_config.js'])assert.equal((await fetch(h.origin+'/'+path)).status,404);
 let loseSubmit=false,loseClaim=false;
 const request=async(path,body)=>{const r=await fetch(h.origin+'/api/v1/'+path,{method:body?'POST':'GET',headers:{Origin:h.origin,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const data=await r.json();if(!r.ok)throw Error(data.error);
 if(path.endsWith('/submit')&&loseSubmit){loseSubmit=false;throw Error('lost_response');}if(path.endsWith('/claim')&&loseClaim){loseClaim=false;throw Error('lost_response');}return data;};
 for(const mode of ['enja','jaen','audio']){
  const s=new WordSession(request,mode);await s.start();assert.throws(()=>s.next(),/answer_required/);await assert.rejects(s.submit(),/answer_required/);
  const privateData=JSON.parse((await h.db.prepare('SELECT private_json FROM mission_attempts WHERE attempt_id=?').bind(s.attempt.attemptId).first()).private_json);
  for(let i=0;i<20;i++){assert.equal(s.index,i);s.choose(privateData.questions[i].answer);if(i<19)s.next();}
  loseSubmit=true;await assert.rejects(s.submit(),/lost_response/);assert.equal(s.pending,false);assert.throws(()=>s.choose(0),/session_locked/);const result=await s.submit();assert.equal(result.correct,20);assert.equal(result.replayed,true);
  loseClaim=true;await assert.rejects(s.claim(),/lost_response/);assert.equal((await s.claim()).replayed,true);assert.equal((await request('economy')).state.shards,3);
 }
 assert.equal((await h.db.prepare('SELECT COUNT(*) AS n FROM saves').first()).n,0);
 }finally{await h.close();}
});
test('Pending requests cannot start overlapping attempts or erase the current answers',async()=>{
 let resolve;const s=new WordSession(()=>new Promise(r=>resolve=r),'enja');const first=s.start();await assert.rejects(s.start(),/request_pending/);resolve({mode:'enja',questions:Array.from({length:20},()=>({choices:['a','b','c','d']}))});await first;s.choose(2);s.request=async()=>{throw Error('offline');};await assert.rejects(s.start(),/offline/);assert.equal(s.answers[0],2);
});
