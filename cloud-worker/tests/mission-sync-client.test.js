import test from 'node:test';import assert from 'node:assert/strict';
import {MissionSyncClient} from '../dev/sync-client.js';import {createOfflineDb} from './offline-db.js';
import {readMissionLearning} from '../src/mission_learning.js';import {syncMissionSnapshot} from '../src/mission_sync.js';import {validateSnapshot} from '../src/validation.js';
const key='zensho_goimon_current_v4_lv1',snap=name=>({schemaVersion:1,data:{[key]:JSON.stringify({id:'test',nickname:name})}});
test('Sync client persists requests, survives lost replies/recreation and keeps edits made in flight',async()=>{
 const h=await createOfflineDb();try{let state=null,owner='local-test',lost=false,after,failWrite=false;const bodies=[];
 const request=async(path,body)=>{
  if(!body)return readMissionLearning(h.db,'local-test');bodies.push(structuredClone(body));
  const r=await syncMissionSnapshot(h.db,'local-test',body);if(r.conflict)throw Object.assign(Error('sync_conflict'),{status:409,data:r});
  after?.();after=null;if(lost){lost=false;throw Error('offline');}return r;
 };
 const create=()=>new MissionSyncClient({request,scope:()=>owner,read:()=>structuredClone(state),write:s=>{if(failWrite)throw Error('quota');state=structuredClone(s);},validate:validateSnapshot});
 let c=create();await c.load();c.edit(snap('A'));lost=true;await assert.rejects(c.save(),/offline/);assert(state.pending);assert.equal(state.revision,0);
 c=create();await c.save();assert.deepEqual(bodies[0],bodies[1]);assert.equal(state.revision,1);assert.equal(state.pending,null);
 c.edit(snap('B'));after=()=>c.edit(snap('C'));await c.save();assert.equal(JSON.parse(state.base.data[key]).nickname,'B');assert.equal(JSON.parse(state.local.data[key]).nickname,'C');await c.save();assert.equal(JSON.parse((await readMissionLearning(h.db,'local-test')).snapshot.data[key]).nickname,'C');
 c.edit(snap('D'));const count=bodies.length;failWrite=true;await assert.rejects(c.save(),/quota/);assert.equal(bodies.length,count);failWrite=false;
 after=()=>{owner='other';};await assert.rejects(c.save(),/account_changed/);assert(state.pending);owner='local-test';await c.save();assert.equal(state.pending,null);
 }finally{await h.close();}
});
test('Same-field conflicts retain both the local edit and immutable pending request',async()=>{
 const h=await createOfflineDb();try{const make=()=>{let state=null;return new MissionSyncClient({scope:()=> 'local-test',read:()=>structuredClone(state),write:s=>state=structuredClone(s),validate:validateSnapshot,request:async(path,body)=>{if(!body)return readMissionLearning(h.db,'local-test');const r=await syncMissionSnapshot(h.db,'local-test',body);if(r.conflict)throw Object.assign(Error('sync_conflict'),{status:409,data:r});return r;}});};
 const a=make(),b=make();await a.load();a.edit(snap('original'));await a.save();await b.load();a.edit(snap('device A'));b.edit(snap('device B'));await a.save();await assert.rejects(b.save(),/sync_conflict/);assert.equal(JSON.parse(b.state().local.data[key]).nickname,'device B');assert(b.state().conflict&&b.state().pending);await assert.rejects(b.load(),/unsaved_changes/);
 }finally{await h.close();}
});
test('A replay acknowledges the original committed snapshot, not later server changes',async()=>{
 const h=await createOfflineDb();try{const first={operationId:crypto.randomUUID(),baseRevision:0,expectedRevision:0,snapshot:snap('first')};await syncMissionSnapshot(h.db,'local-test',first);await syncMissionSnapshot(h.db,'local-test',{operationId:crypto.randomUUID(),baseRevision:1,expectedRevision:1,snapshot:snap('second')});const replay=await syncMissionSnapshot(h.db,'local-test',first);assert.equal(replay.revision,1);assert.equal(JSON.parse(replay.snapshot.data[key]).nickname,'first');}finally{await h.close();}
});
test('Reload cannot overwrite an edit made while the server response is pending',async()=>{
 let resolve,state={owner:'local-test',revision:1,base:snap('before'),local:snap('before'),pending:null,conflict:null};
 const c=new MissionSyncClient({scope:()=> 'local-test',read:()=>structuredClone(state),write:s=>state=structuredClone(s),validate:validateSnapshot,request:()=>new Promise(r=>resolve=r)});
 const loading=c.load();c.edit(snap('typed while loading'));resolve({revision:2,snapshot:snap('server')});await assert.rejects(loading,/local_changed_during_load/);assert.equal(JSON.parse(state.local.data[key]).nickname,'typed while loading');assert.equal(state.revision,1);
});
