const test=require('node:test'),assert=require('node:assert/strict');
function storage(){const map=new Map();return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k),map};}
async function fixture(){
 const {createCloudDraw}=await import('../goimon-items/cloud-draw.mjs');
 const s=storage();let active='a',tail=Promise.resolve(),spends=0,lose=false;
 const receipts=new Map(),sent=[];
 const options={account:'a',apiBase:'https://api.test',activeAccount:()=>active,storage:s,
  lock:(_,fn)=>{const p=tail.then(fn);tail=p.catch(()=>{});return p;},uuid:()=> 'operation_number_'+(sent.length+1),
  request:async(path,body)=>{
   if(path==='economy')return {revision:spends,state:{shards:100-spends*30}};
   sent.push(structuredClone(body));let r=receipts.get(body.operationId);
   if(!r){spends++;r={revision:body.expectedRevision+1,result:{kind:body.kind,count:body.count,cost:body.count*10,items:Array.from({length:body.count},()=>({id:'N_hp',rarity:'N'}))}};receipts.set(body.operationId,r);}
   if(lose){lose=false;throw Error('connection_lost');}return r;
  }};
 return {s,options,make:()=>createCloudDraw(options),sent,spends:()=>spends,lose:()=>lose=true,switch:()=>active='b'};
}
test('lost draw reply survives reload and returns original items without charging again',async()=>{
 const f=await fixture();f.lose();await assert.rejects(f.make().draw('gear',3),/connection_lost/);
 const c=f.make();await assert.rejects(c.draw('skills',1),/resume_required/);
 const p=await c.resume();assert.equal(p.response.result.items.length,3);assert.equal(f.spends(),1);assert.deepEqual(f.sent[0],f.sent[1]);
 await c.resume();assert.equal(f.sent.length,2); // result already persisted, no request
 await c.acknowledge(p.command.operationId);assert.equal(c.pending(),null);
});
test('two tabs serialize; account changes and checkpoint failures stop further spending',async()=>{
 const f=await fixture();const results=await Promise.allSettled([f.make().draw('gear',3),f.make().draw('gear',3)]);
 assert.equal(results.filter(x=>x.status==='fulfilled').length,1);assert.equal(f.spends(),1);
 f.switch();await assert.rejects(f.make().resume(),/account_changed/);
 const g=await fixture();g.s.setItem=()=>{throw Error('quota');};await assert.rejects(g.make().draw('gear',3),/quota/);assert.equal(g.spends(),0);
});
test('failed result save retains original request; ambiguous failures cannot be acknowledged',async()=>{
 const f=await fixture(),set=f.s.setItem;let calls=0;
 f.s.setItem=(k,v)=>{if(++calls===2)throw Error('quota');set(k,v);};
 const c=f.make();await assert.rejects(c.draw('gear',3),/quota/);
 await assert.rejects(c.acknowledge(c.pending().command.operationId),/receipt_required/);
 const p=await f.make().resume();assert.equal(f.spends(),1);assert.equal(p.response.result.count,3);
});
test('only a matching server rejection clears a pending draw; retry is an explicit new action',async()=>{
 const f=await fixture(),request=f.options.request;let reject=true,calls=0;
 f.options.request=async(path,body)=>{
  if(path==='economy/draw'&&reject){calls++;throw Object.assign(Error('economy_revision_conflict'),{status:409,drawRejection:{operationId:body.operationId,expectedRevision:body.expectedRevision}});}
  return request(path,body);
 };
 const c=f.make();await assert.rejects(c.draw('gear',3),e=>e.drawRejected===true);
 assert.equal(c.pending(),null);assert.equal(calls,1);assert.equal(f.spends(),0);
 reject=false;const p=await c.draw('skills',1);assert.equal(p.response.result.count,1);assert.equal(f.spends(),1);
});
test('unproven conflict, wrong operation, wrong revision, and failed checkpoint removal retain request',async()=>{
 for(const type of ['absent','operation','revision','status','inventory','storage']){
  const f=await fixture();f.options.request=async(path,body)=>{
   if(path==='economy')return {revision:0,state:{shards:100}};
   throw Object.assign(Error(type==='inventory'?'inventory_limit':'economy_revision_conflict'),{status:type==='status'?500:409,...(type==='absent'?{}:{drawRejection:{operationId:type==='operation'?'different_operation':body.operationId,expectedRevision:type==='revision'?99:body.expectedRevision}})});
  };
  if(type==='storage')f.s.removeItem=()=>{};
  const c=f.make();await assert.rejects(c.draw('gear',3),e=>!e.drawRejected,type);
  assert(c.pending(),type);assert.equal(f.spends(),0);
 }
});
test('legacy backup preserves both grades, corrupt raw strings, and loadouts without minting or removing items',async()=>{
 const {backupLegacyItems}=await import('../goimon-items/legacy-backup.mjs');const s=storage();
 s.setItem('goimon_item_state_v1_lv1','{"shop":{"stars":30},"loadouts":{"pet":{}}}');s.setItem('goimon_item_state_v1_lv2','broken raw data');
 const options={account:'a',activeAccount:()=> 'a',storage:s};const b=backupLegacyItems(options);
 assert.equal(b.raw['1'],s.getItem('goimon_item_state_v1_lv1'));assert.equal(b.raw['2'],'broken raw data');
 s.setItem('goimon_item_state_v1_lv1','changed later');assert.deepEqual(backupLegacyItems(options),b);
 assert.throws(()=>backupLegacyItems({...options,activeAccount:()=> 'b'}),/account_changed/);
 const t=storage();t.setItem=()=>{};assert.throws(()=>backupLegacyItems({...options,storage:t}),/backup_failed/);
});
