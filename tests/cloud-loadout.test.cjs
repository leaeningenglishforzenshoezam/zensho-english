const test=require('node:test'),assert=require('node:assert/strict');
test('loadout client resumes identical save after lost reply and preserves chosen slots',async()=>{
 const {createCloudLoadout}=await import('../goimon-items/cloud-loadout.mjs');const map=new Map();let fail=true,revision=0,loadouts={'1':{},'2':{}},calls=[];
 const config={account:'a',apiBase:'https://api.test',activeAccount:()=> 'a',level:'1',uuid:()=> 'loadout_operation_01',storage:{getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)},lock:async(_,f)=>f(),validate:()=>{},localStore:{read:()=>({account:'a',level:'1',state:{owned:{},loadouts:{}}})},request:async(path,p)=>{
  if(path.endsWith('/save')){calls.push(structuredClone(p));if(revision===0){revision=1;loadouts['1'].pet={gearId:p.gearId,skillIds:p.skillIds};}if(fail){fail=false;throw Error('lost_reply');}}
  return structuredClone({revision,loadouts});
 }};
 const first=createCloudLoadout(config);await first.init();await assert.rejects(first.save(first.read(),'pet',null,['N_echo',null,null,null]),/lost_reply/);
 const next=createCloudLoadout(config);await next.init();assert.deepEqual(calls[0],calls[1]);assert.equal(next.read().state.loadouts.pet.skillIds[0],'N_echo');assert.equal(map.size,0);assert.equal(revision,1);
});
test('runtime is inert without explicit opt-in',async()=>{
 const {connect}=await import('../goimon-items/runtime.mjs');let calls=0;await connect({GOIMON_CLOUD_CONFIG:{},fetch:()=>calls++});assert.equal(calls,0);
});
test('loadout account switch during reply retains pending command; checkpoint failure prevents send',async()=>{
 const {createCloudLoadout}=await import('../goimon-items/cloud-loadout.mjs');
 const map=new Map();let active='a',sends=0,drop=false;
 const config={account:'a',apiBase:'https://api.test',activeAccount:()=>active,level:'1',uuid:()=> 'loadout_operation_02',storage:{getItem:k=>map.get(k)??null,setItem:(k,v)=>{if(!drop)map.set(k,v);},removeItem:k=>map.delete(k)},lock:async(_,f)=>f(),validate:()=>{},localStore:{read:()=>({account:'a',level:'1',state:{loadouts:{}}})},request:async(path)=>{if(path.endsWith('/save')){sends++;active='b';}return {revision:sends,loadouts:{'1':{},'2':{}}};}};
 const client=createCloudLoadout(config);await client.init();const ctx=client.read();drop=true;
 await assert.rejects(client.save(ctx,'pet',null,[null,null,null,null]),/checkpoint_failed/);assert.equal(sends,0);
 drop=false;await assert.rejects(client.save(ctx,'pet',null,[null,null,null,null]),/account_changed/);assert.equal(map.size,1);assert.equal(sends,1);
});
test('pending loadout commands are backed up locally but not accepted by ordinary cloud saves',()=>{
 const fs=require('node:fs'),vm=require('node:vm'),root={};root.window=root;
 for(const file of ['cloud_schema.js','goimon_save_foundation.js'])vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'..',file),'utf8'),root);
 const key='goimon_loadout_pending_v1:api:account';
 assert.equal(root.GOIMONSaveFoundation.classify(key),'device');assert.equal(root.GOIMONCloudSchema.allowed(key),false);
});
