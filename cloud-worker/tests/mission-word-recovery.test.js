import test from 'node:test';
import assert from 'node:assert/strict';
import {WordSession} from '../dev/word-session.js';

function fixture(){
 let raw=null,failSave=false,lose=null;const sent=[];
 const checkpoint={load:()=>raw?JSON.parse(raw):null,save:value=>{if(failSave)throw Error('checkpoint_unavailable');raw=JSON.stringify(value);}};
 const request=async(path,body)=>{
  sent.push({path,body:structuredClone(body)});
  if(path.endsWith('/start'))return {mode:'enja',attemptId:'attempt-1',questions:Array.from({length:20},()=>({choices:['a','b']}))};
  if(path==='missions/learning')return {revision:2,snapshot:{data:{}}};
  if(path==='economy')return {revision:3};
  if(path===lose){lose=null;throw Error('connection_lost');}
  if(path.endsWith('/submit'))return {correct:20,total:20,completed:true};
  return {revision:3,awardedPoints:20};
 };
 return {checkpoint,request,sent,setLose:path=>lose=path,setFailSave:v=>failSave=v,restore:()=>new WordSession(request,'enja',checkpoint)};
}
async function answered(f){const s=f.restore();await s.start();for(let i=0;i<20;i++){s.choose(0);if(i<19)s.next();}return s;}

test('reload preserves position, answers and immutable uncertain submission',async()=>{
 const f=fixture();let s=f.restore();await s.start();s.choose(1);s.next();s=f.restore();assert.equal(s.index,1);assert.equal(s.answers[0],1);
 for(let i=1;i<20;i++){s.choose(0);if(i<19)s.next();}
 f.setLose('missions/words/submit');await assert.rejects(s.submit(),/connection_lost/);
 s=f.restore();assert.throws(()=>s.choose(1),/session_locked/);await assert.rejects(s.start(),/submit_retry_required/);await s.submit();
 const requests=f.sent.filter(x=>x.path.endsWith('/submit'));assert.deepEqual(requests[0],requests[1]);assert.equal(f.restore().result.correct,20);
});

test('reload retries growth, companion and test claim with original operation identity',async()=>{
 for(const path of ['missions/growth/apply','missions/companion/action','missions/words/claim']){
  const f=fixture();let s=await answered(f);await s.submit();
  const invoke=()=>path.includes('growth')?s.saveGrowth():path.includes('companion')?s.companionAction('evolve',{revision:2,snapshot:{data:{zensho_goimon_current_v4_lv1:JSON.stringify({id:'pet-1'})}}}):s.claim();
  f.setLose(path);await assert.rejects(invoke(),/connection_lost/);s=f.restore();await assert.rejects(s.start(),/retry_required/);await invoke();
  const requests=f.sent.filter(x=>x.path===path);assert.equal(requests.length,2);assert.deepEqual(requests[0],requests[1]);
 }
});

test('checkpoint failure blocks submission before any request; mismatched mode is rejected',async()=>{
 const f=fixture(),s=await answered(f),before=f.sent.length;f.setFailSave(true);
 await assert.rejects(s.submit(),/checkpoint_unavailable/);assert.equal(f.sent.length,before);
 f.setFailSave(false);assert.throws(()=>new WordSession(f.request,'jaen',f.checkpoint),/invalid_checkpoint/);
});
