import test from 'node:test';
import assert from 'node:assert/strict';
import {createOfflineDb} from './offline-db.js';
import {createSession} from '../src/session.js';
import release from '../src/mission_release.js';
import {createMissionAccountClient} from '../../daily-missions/mission_account_client.mjs';
import {MissionFlow} from '../../daily-missions/mission_flow.mjs';
import {validateSnapshot,isAllowedKey} from '../src/validation.js';

test('real session adapter: normal save → mission growth/reward → normal save; stale device cannot overwrite',async()=>{
 const h=await createOfflineDb();try{
  const apiBase='https://mission.test',origin='https://pages.test',session=await createSession(h.db,'local-test');
  const limiter={limit:async()=>({success:true})},env={DB:h.db,ALLOWED_ORIGIN:origin,MISSION_RELEASE_ENABLED:'true',RATE_LIMITER:limiter,AUTH_RATE_LIMITER:limiter};
  const send=(url,options={})=>release.fetch(new Request(url,{...options,headers:{...options.headers,Origin:origin}}),env);
  for(const path of ['learning/sync','companion/action'])assert.equal((await send(apiBase+'/api/v1/missions/'+path,{method:'POST',headers:{Authorization:'Bearer '+session.token,'Content-Type':'application/json'},body:'{}'})).status,404);
  const key='zensho_goimon_current_v4_lv1';
  const pet={id:'saved-pet',stage:'egg',type:'nagomi',specialRoute:'',stats:{chie:20,kotoba:0,onkan:0,bunmyaku:0},totalPoints:20,level:2,pendingEvolution:false};
  let profile={revision:0,base:{},data:{[key]:JSON.stringify(pet),deviceOnly:'retained'}};
  const client=createMissionAccountClient({apiBase,account:session.userId,credential:()=>({...session,apiBase}),activeAccount:()=>session.userId,profiles:{account:session.userId,isWriter:()=>true,read:()=>structuredClone(profile),write:(_,p)=>profile=p,recovery:()=>{},cloudData:data=>Object.fromEntries(Object.entries(data).filter(([k])=>isAllowedKey(k)))},schema:{validate:validateSnapshot,allowed:isAllowedKey},fetch:send,lock:async(_,fn)=>fn()});
  const flow=new MissionFlow(client),a=await flow.start('words',{level:'1',mode:'enja'});
  const stale=structuredClone(profile);
  const row=await h.db.prepare('SELECT private_json FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind(session.userId,a.attemptId).first();
  const r=await flow.finish(JSON.parse(row.private_json).questions.map(q=>q.answer));
  assert.equal(r.balance,3);assert.equal(JSON.parse(profile.data[key]).totalPoints,40);assert.equal(profile.data.deviceOnly,'retained');
  // Simulate the next ordinary learning page adding one point after the mission.
  const current=JSON.parse(profile.data[key]);current.stats.chie++;current.totalPoints++;profile.data[key]=JSON.stringify(current);
  await client.prepare();assert.equal(JSON.parse(profile.base[key]).totalPoints,41);
  const rejected=await send(apiBase+'/api/v1/save',{method:'POST',headers:{Authorization:'Bearer '+session.token,'Content-Type':'application/json'},body:JSON.stringify({expectedRevision:stale.revision,snapshot:{schemaVersion:1,data:stale.base}})});
  assert.equal(rejected.status,409);
  assert.equal((await client.request('economy')).state.shards,3);
  const final=await client.finish();assert.equal(JSON.parse(final.snapshot.data[key]).totalPoints,41);
 }finally{h.close();}
});
