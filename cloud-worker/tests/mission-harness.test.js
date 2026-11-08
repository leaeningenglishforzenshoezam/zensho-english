import test from 'node:test';
import assert from 'node:assert/strict';
import {startHarness} from '../dev/server.js';
test('Local HTTP harness isolates assets, rejects foreign origins and serves all mission formats',async()=>{
 const h=await startHarness();try{
 const call=(path,body)=>fetch(h.origin+'/api/v1/'+path,{method:body?'POST':'GET',headers:{Origin:h.origin,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
 assert.equal((await fetch(h.origin)).status,200);
 const dashboard=await (await fetch(h.origin+'/daily_mission_test.html')).text();
 assert.ok(dashboard.includes('id="cards"'));
 assert.deepEqual([...dashboard.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(m=>m[1]),['/mission-dashboard.js']);
 assert.equal((await fetch(h.origin+'/mission-dashboard.js')).status,200);
 assert.equal((await fetch(h.origin+'/cloud_auto.js')).status,404);
 assert.equal((await (await call('missions/status')).json()).missions.length,6);
 for(const path of ['/src/data/mission-words.json','/cloud-worker/src/data/mission-words.json','/.git/config'])assert.equal((await fetch(h.origin+path)).status,404);
 assert.equal((await fetch(h.origin+'/api/v1/economy')).status,403);
 assert.equal((await fetch(h.origin+'/api/v1/economy',{headers:{'Sec-Fetch-Site':'same-origin'}})).status,200);
 assert.equal((await fetch(h.origin,{headers:{Origin:'https://example.com'}})).status,403);
 for(const [slot,extra] of [['words',{mode:'enja'}],['words',{mode:'jaen'}],['words',{mode:'audio'}],['idioms',{mode:'meaning'}],['exam',{category:'sentence',variant:'a'}],['listening',{}],['reading',{}],['reorder',{}]]){
  const response=await call('missions/'+slot+'/start',{level:'1',...extra});assert.equal(response.status,200);const a=await response.json();
  const privateData=JSON.parse((await h.db.prepare('SELECT private_json FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind('local-test',a.attemptId).first()).private_json);
  if(a.questions[0].audioFile)assert.equal((await fetch(h.origin+'/'+a.questions[0].audioFile)).status,200);
  assert.equal((await call('missions/'+slot+'/submit',{attemptId:a.attemptId,answers:privateData.questions.map(q=>q.answer)})).status,200);
  const state=await (await call('economy')).json();const claim=await call('missions/'+slot+'/claim',{attemptId:a.attemptId,operationId:crypto.randomUUID(),expectedRevision:state.revision});assert.equal(claim.status,200);
 }
 assert.equal((await (await call('economy')).json()).state.shards,17);
 const status=await (await call('missions/status')).json();
 assert.ok(status.missions.every(m=>m.completed&&m.submitted>0&&m.learningSaved===0&&m.growthSaved===0));
 }finally{await h.close();}
});
