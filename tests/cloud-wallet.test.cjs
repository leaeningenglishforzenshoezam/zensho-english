const test=require('node:test'),assert=require('node:assert/strict'),C=require('../battle-prototype/catalog.js');
async function fixture(){
 const {createCloudWallet}=await import('../goimon-items/cloud-wallet.mjs'),map=new Map();let active='a',drop=false,reads=0,remote=null,calls=[];
 const local={shop:{stars:30,claims:{welcome:true}},owned:{gear:{N_hp:1},skills:{}},loadouts:{'1':{pet:{gearId:'N_hp'}},'2':{}}};
 const storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};
 const options={account:'a',apiBase:'https://api.test',activeAccount:()=>active,storage,catalog:C,lock:async(_,f)=>f(),readLocal:()=>{reads++;return structuredClone(local);},request:async(path,p)=>{
  if(path==='economy/import/auto'){calls.push(structuredClone(p));remote||={revision:1,state:structuredClone(p.assets)};if(drop){drop=false;throw Error('lost_reply');}}
  return structuredClone(remote);
 }};
 return {map,local,storage,options,create:()=>createCloudWallet(options),drop:()=>drop=true,switch:()=>active='b',calls,reads:()=>reads};
}
test('wallet freezes old data before POST and resumes same proposal after reload',async()=>{
 const f=await fixture();f.drop();await assert.rejects(f.create().migrate(),/lost_reply/);
 const original=f.create().checkpoint().payload;assert.equal(JSON.parse(original.backup).loadouts['1'].pet.gearId,'N_hp');
 f.local.shop.stars=999;const c=f.create(),state=await c.migrate();assert.equal(state.state.shards,30);assert.equal(f.reads(),1);assert.deepEqual(f.calls[0],f.calls[1]);
 assert.equal(c.read().state.owned.gear.N_hp,1);assert.equal(JSON.parse(f.map.get('goimon_economy_mode_v1')).status,'server');
});
test('wallet storage failure sends nothing; account switch preserves old checkpoint',async()=>{
 const f=await fixture();f.storage.setItem=()=>{throw Error('quota');};await assert.rejects(f.create().migrate(),/quota/);assert.equal(f.calls.length,0);
 const g=await fixture();g.drop();await assert.rejects(g.create().migrate());const before=[...g.map];g.switch();await assert.rejects(g.create().migrate(),/account_changed/);assert.deepEqual([...g.map],before);
});
test('failed cache save can resume without overwriting legacy data or creating a new proposal',async()=>{
 const f=await fixture(),set=f.storage.setItem;f.storage.setItem=(k,v)=>{if(k.endsWith(':cache'))throw Error('quota');set(k,v);};
 await assert.rejects(f.create().migrate(),/quota/);assert.equal(f.create().read(),null);
 f.storage.setItem=set;await f.create().migrate();assert.deepEqual(f.calls[0],f.calls[1]);assert.equal(f.local.shop.stars,30);
});
