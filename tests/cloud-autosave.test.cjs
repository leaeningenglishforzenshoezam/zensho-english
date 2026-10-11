const test=require('node:test'),assert=require('node:assert/strict');
require('../cloud_schema.js');const {create}=require('../cloud_autosave.js');
const key='q7SetHistory_v1';
function setup(){let now=100000,p={data:{},base:{},revision:0},remote={data:{},revision:0},meta={},state,writer=true,auth=true,apply=true,reloads=0,hook=null,failure=0,lost=false;const calls=[];
 const copy=x=>structuredClone(x);
 const e=create({schema:global.GOIMONCloudSchema,account:'A',read:()=>copy(p),write:x=>p=copy(x),cloudData:d=>Object.fromEntries(Object.entries(d).filter(([k])=>GOIMONCloudSchema.allowed(k))),recovery(){},now:()=>now,meta:()=>copy(meta),saveMeta:x=>meta=copy(x),canWrite:()=>writer,credential:()=>auth?'session':null,canApplyRemote:()=>apply,reload:()=>reloads++,expire:()=>auth=false,state:x=>state=x,request:async(method,body)=>{
  calls.push(method);if(hook){const f=hook;hook=null;await f();}if(failure)throw Object.assign(Error('http'),{status:failure});
  if(method==='GET')return {userId:'A',revision:remote.revision,snapshot:remote.revision?{schemaVersion:1,data:copy(remote.data)}:null};
  if(body.expectedRevision!==remote.revision)throw Object.assign(Error('conflict'),{status:409});remote={data:copy(body.snapshot.data),revision:remote.revision+1};if(lost){lost=false;throw Error('network');}return {revision:remote.revision};
 }});
 return {e,calls,get p(){return p},get meta(){return meta},get state(){return state},get authenticated(){return auth},get remote(){return remote},get reloads(){return reloads},edit:v=>p.data[key]=JSON.stringify({v}),advance:x=>now+=x,remote:v=>remote=v,hook:f=>hook=f,failure:x=>failure=x,lost:()=>lost=true,writer:x=>writer=x,apply:x=>apply=x};
}
test('Autosave sends only dirty allowed data; POST at most once/30s, clean GET at most once/60s',async()=>{
 const x=setup();await x.e.run(true);assert.deepEqual(x.calls,['GET']);await x.e.run(true);assert.equal(x.calls.length,1);
 x.p.data.zensho_setting='ignored';await x.e.run();assert.equal(x.calls.length,1);
 x.edit(1);await x.e.run();assert.deepEqual(x.calls,['GET','POST']);assert.equal(x.p.revision,1);assert.equal(x.state,'saved');
 x.edit(2);await x.e.run();assert.equal(x.calls.length,2);x.advance(30000);await x.e.run();assert.equal(x.calls.length,3);assert.equal(x.p.revision,2);
 x.advance(60000);await x.e.run(true);await x.e.run(true);assert.equal(x.calls.filter(x=>x==='GET').length,2);
});
test('Answers during an in-flight save survive; overlapping calls produce one POST',async()=>{
 const x=setup();x.edit(1);let release;x.hook(()=>new Promise(r=>release=r));const saving=x.e.run();x.edit(2);await x.e.run();assert.equal(x.calls.length,1);release();await saving;assert.equal(x.p.data[key],'{"v":2}');assert.equal(x.p.base[key],'{"v":1}');assert.equal(x.e.dirty(),true);x.advance(30000);await x.e.run();assert.equal(x.p.base[key],'{"v":2}');
});
test('Retry backoff 60/120/240/300 seconds survives attempts and preserves data',async()=>{
 const x=setup();x.edit(1);x.failure(500);for(const gap of [60000,120000,240000,300000]){const before=x.meta.retryAt||100000;await x.e.run();const until=x.meta.retryAt;assert.equal(until-before,gap);const count=x.calls.length;await x.e.run();assert.equal(x.calls.length,count);x.advance(gap);}x.failure(0);await x.e.run();assert.equal(x.p.revision,1);assert.equal(x.meta.retryAt,0);
});
test('Lost successful response reconciles without duplicate revision',async()=>{
 const x=setup();x.edit(1);x.lost();await x.e.run();assert.equal(x.p.revision,0);x.advance(60000);await x.e.run();assert.equal(x.p.revision,1);assert.equal(x.state,'saved');assert.deepEqual(x.calls,['POST','POST','GET']);
});
test('Competing edits stop autosave; current data is not overwritten',async()=>{
 const x=setup();x.edit(1);x.remote({revision:1,data:{[key]:'{"remote":1}'}});await x.e.run();assert.equal(x.state,'conflict');assert.equal(x.p.data[key],'{"v":1}');x.advance(300000);await x.e.run();assert.equal(x.calls.length,2);
});
test('Remote restore only before interaction with clean local data',async()=>{
 const x=setup();x.remote({revision:1,data:{[key]:'{}'}});await x.e.run(true);assert.equal(x.p.data[key],'{}');assert.equal(x.reloads,1);
 const y=setup();y.remote({revision:1,data:{[key]:'{}'}});y.apply(false);await y.e.run(true);assert.equal(y.state,'conflict');assert.equal(y.reloads,0);assert.equal(y.p.data[key],undefined);
});
test('Revoked session and account switch stop writes; data retained',async()=>{
 const x=setup();x.edit(1);x.failure(401);await x.e.run();assert.equal(x.state,'auth');assert.equal(x.p.revision,0);await x.e.run();assert.equal(x.calls.length,1);
 const y=setup();y.edit(1);y.hook(()=>y.writer(false));await y.e.run();assert.equal(y.p.revision,0);assert.equal(y.authenticated,true);assert.equal(y.p.data[key],'{"v":1}');await y.e.run();assert.equal(y.calls.length,1);
});
