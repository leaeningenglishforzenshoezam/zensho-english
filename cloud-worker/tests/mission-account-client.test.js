import test from 'node:test';
import assert from 'node:assert/strict';
import {createMissionAccountClient} from '../../daily-missions/mission_account_client.mjs';
import release from '../src/mission_release.js';

function setup(){
 let profile={data:{study:'new',device:'keep'},base:{study:'old'},revision:1},active='user',remote={userId:'user',revision:1,snapshot:{schemaVersion:1,data:{study:'old'}}};
 const calls=[],backups=[];
 const client=createMissionAccountClient({apiBase:'https://test.invalid',account:'user',activeAccount:()=>active,credential:()=>({userId:'user',apiBase:'https://test.invalid',expiresAt:Date.now()/1000+600,token:'gs1_'+'a'.repeat(64)}),profiles:{account:'user',isWriter:()=>true,read:()=>structuredClone(profile),write:(_,p)=>profile=p,recovery:(_,p)=>backups.push(p),cloudData:data=>Object.fromEntries(Object.entries(data).filter(([k])=>k!=='device'))},schema:{validate:()=>{},allowed:key=>key!=='device'},lock:async(name,fn)=>{assert.equal(name,'goimon-cloud-sync');return fn();},fetch:async(url,options)=>{
  calls.push({url,options});if(options.method==='POST'){const body=JSON.parse(options.body);if(body.expectedRevision!==remote.revision)return Response.json({error:'revision_conflict'},{status:409});remote={...remote,revision:remote.revision+1,snapshot:body.snapshot};return Response.json({revision:remote.revision});}return Response.json(remote);
 }});
 return {client,calls,backups,profile:()=>profile,setRemote:value=>remote=value,setActive:value=>active=value};
}
test('account client saves pending study before start and imports server growth without losing device keys',async()=>{
 const f=setup();await f.client.prepare();assert.equal(f.profile().revision,2);assert.equal(f.calls[0].options.headers.Authorization,'Bearer gs1_'+'a'.repeat(64));
 f.setRemote({userId:'user',revision:3,snapshot:{schemaVersion:1,data:{study:'new',pet:'grown'}}});await f.client.finish();
 assert.deepEqual(f.profile().data,{device:'keep',study:'new',pet:'grown'});assert.equal(f.profile().revision,3);assert.equal(f.backups.length,1);
});
test('account conflict and account switch stop without replacing local records',async()=>{
 const f=setup(),before=f.profile();f.setRemote({userId:'user',revision:2,snapshot:{schemaVersion:1,data:{study:'other'}}});await assert.rejects(f.client.prepare(),/revision_conflict/);assert.deepEqual(f.profile(),before);
 f.setActive('other');await assert.rejects(f.client.request('economy'),/mission_account_changed/);assert.equal(f.calls.length,1);
});
test('release candidate stays off by default and enabled routes still require session authentication',async()=>{
 const req=new Request('https://test.invalid/api/v1/missions/status',{headers:{Origin:'https://test.invalid'}}),env={ALLOWED_ORIGIN:'https://test.invalid'};
 assert.equal((await release.fetch(req,env)).status,404);
 const limiter={limit:async()=>({success:true})};
 assert.equal((await release.fetch(req,{...env,MISSION_RELEASE_ENABLED:'true',RATE_LIMITER:limiter,AUTH_RATE_LIMITER:limiter})).status,401);
});
