import test from 'node:test';
import assert from 'node:assert/strict';
import {createOfflineDb} from './offline-db.js';
import {createSession} from '../src/session.js';
import {emptyEconomy} from '../src/economy.js';
import {readEconomy,executeDraw} from '../src/economy_repository.js';
import release from '../src/mission_release.js';
import {createMissionAccountClient} from '../../daily-missions/mission_account_client.mjs';
import {createCloudDraw} from '../../goimon-items/cloud-draw.mjs';

test('account client → gacha API → SQLite: reload after lost reply charges once and retains receipt',async()=>{
 const h=await createOfflineDb();try{
  const session=await createSession(h.db,'local-test'),apiBase='https://api.test',origin='https://pages.test';
  const limiter={limit:async()=>({success:true})};
  const env={DB:h.db,ALLOWED_ORIGIN:origin,MISSION_RELEASE_ENABLED:'true',ECONOMY_DRAW_ENABLED:'true',RATE_LIMITER:limiter,AUTH_RATE_LIMITER:limiter};
  await h.db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?)').bind(session.userId,JSON.stringify({...emptyEconomy(),shards:100})).run();
  let drop=true;
  const client=createMissionAccountClient({apiBase,account:session.userId,credential:()=>({...session,apiBase}),activeAccount:()=>session.userId,profiles:{account:session.userId,isWriter:()=>true},schema:{},lock:async(_,fn)=>fn(),fetch:async(url,options)=>{
   const response=await release.fetch(new Request(url,{...options,headers:{...options.headers,Origin:origin}}),env);
   if(url.endsWith('/economy/draw')&&drop){drop=false;assert.equal(response.status,200);throw Error('lost_reply');}
   return response;
  }});
  const values=new Map(),storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};
  const create=()=>createCloudDraw({account:session.userId,apiBase,activeAccount:()=>session.userId,storage,lock:async(_,fn)=>fn(),request:client.request});
  await assert.rejects(create().draw('skills',3),/lost_reply/);
  assert.equal((await readEconomy(h.db,session.userId)).state.shards,70);
  const reloaded=create(),p=await reloaded.resume();assert.equal(p.response.replayed,true);
  assert.equal((await readEconomy(h.db,session.userId)).revision,1);
  assert.equal(Object.values((await readEconomy(h.db,session.userId)).state.owned.skills).reduce((a,b)=>a+b,0),3);
  await reloaded.acknowledge(p.command.operationId);assert.equal(reloaded.pending(),null);
  await assert.rejects(client.request('economy/draw/other',{}),/invalid_mission_path/);
 }finally{h.close();}
});

test('a competing device rejects without charging this draw, clears only its checkpoint, and permits explicit retry',async()=>{
 const h=await createOfflineDb();try{
  const session=await createSession(h.db,'local-test'),apiBase='https://api.test',origin='https://pages.test',limiter={limit:async()=>({success:true})};
  const env={DB:h.db,ALLOWED_ORIGIN:origin,MISSION_RELEASE_ENABLED:'true',ECONOMY_DRAW_ENABLED:'true',RATE_LIMITER:limiter,AUTH_RATE_LIMITER:limiter};
  await h.db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?)').bind(session.userId,JSON.stringify({...emptyEconomy(),shards:100})).run();
  let compete=true,requests=0;
  const client=createMissionAccountClient({apiBase,account:session.userId,credential:()=>({...session,apiBase}),activeAccount:()=>session.userId,profiles:{account:session.userId,isWriter:()=>true},schema:{},lock:async(_,fn)=>fn(),fetch:async(url,options)=>{
   if(url.endsWith('/economy/draw')){
    requests++;
    if(compete){compete=false;await executeDraw(h.db,session.userId,'other_device_draw_0001',0,{type:'draw',kind:'skills',count:1},()=>0);}
   }
   return release.fetch(new Request(url,{...options,headers:{...options.headers,Origin:origin}}),env);
  }});
  const values=new Map(),storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};
  const draw=createCloudDraw({account:session.userId,apiBase,activeAccount:()=>session.userId,storage,lock:async(_,fn)=>fn(),request:client.request});
  await assert.rejects(draw.draw('gear',3),e=>e.message==='economy_revision_conflict'&&e.drawRejected===true);
  assert.equal(draw.pending(),null);assert.equal(requests,1);assert.equal((await readEconomy(h.db,session.userId)).state.shards,90);
  const result=await draw.draw('gear',3);assert.equal(result.response.result.items.length,3);
  assert.equal((await readEconomy(h.db,session.userId)).state.shards,60);assert.equal(requests,2);
 }finally{h.close();}
});
