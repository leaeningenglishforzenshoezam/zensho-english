import test from 'node:test';
import assert from 'node:assert/strict';
import {startHarness} from '../dev/server.js';
import {MissionFlow} from '../../daily-missions/mission_flow.mjs';
test('one-button flow saves all six slots and retries lost growth/reward replies without duplicate awards',async()=>{
 const h=await startHarness(0,{seedGrowth:true});try{
  let lose=null;const requests=[];
  const request=async(path,body)=>{requests.push({path,body:structuredClone(body)});const r=await fetch(h.origin+'/api/v1/'+path,{method:body?'POST':'GET',headers:{Origin:h.origin,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const data=await r.json();if(!r.ok)throw Object.assign(Error(data.error),{status:r.status});if(lose===path){lose=null;throw Error('lost_reply');}return data;};
  const client={request,prepare:()=>request('missions/learning'),finish:()=>request('missions/learning')};
  for(const [slot,extra] of [['words',{mode:'enja'}],['idioms',{mode:'meaning'}],['exam',{category:'sentence',variant:'mix'}],['listening',{}],['reading',{}],['reorder',{}]]){
   const flow=new MissionFlow(client),a=await flow.start(slot,{level:'1',...extra});
   const row=await h.db.prepare('SELECT private_json FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind('local-test',a.attemptId).first();const answers=JSON.parse(row.private_json).questions.map(q=>q.answer);
   if(slot==='words')lose='missions/growth/apply';if(slot==='idioms')lose='missions/idioms/claim';
   if(lose){await assert.rejects(flow.finish(answers),/lost_reply/);await assert.rejects(flow.start(slot,{level:'1',...extra}),/finish_retry_required/);}
   const result=await flow.finish(answers);assert.equal(result.grade.completed,true);assert.equal(flow.pending,null);
  }
  assert.equal((await request('economy')).state.shards,19);
  const state=await request('missions/status');assert.ok(state.missions.every(m=>m.learningSaved===1&&m.growthSaved===1));
  const growth=requests.filter(r=>r.path==='missions/growth/apply');assert.deepEqual(growth[0],growth[1]);
  const claims=requests.filter(r=>r.path==='missions/idioms/claim');assert.deepEqual(claims[0],claims[1]);
  const html=await (await fetch(h.origin+'/mission_play.html')).text();assert.ok(html.includes('実報酬は付与しません'));assert.ok(!html.includes('src="cloud_config.js"'));
  for(const file of ['mission_play','mission_flow','mission_browser_client'])assert.equal((await fetch(h.origin+'/daily-missions/'+file+'.mjs')).status,200);
 }finally{await h.close();}
});
