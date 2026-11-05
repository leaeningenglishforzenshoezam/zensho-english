// Opt-in transport. Not enabled on the public gacha page until wallet migration is approved.
// `storage` must be account-scoped; `lock` must serialize tabs for this account/API.
export function createCloudDraw({account,apiBase,activeAccount,storage,lock,request,uuid=()=>crypto.randomUUID()}){
 if(!account||account==='guest'||!apiBase||typeof lock!=='function')throw Error('cloud_draw_configuration');
 const key='goimon_draw_pending_v1:'+encodeURIComponent(apiBase)+':'+encodeURIComponent(account);
 const scope=()=>{if(activeAccount()!==account)throw Error('cloud_draw_account_changed');};
 function read(){
  scope();const raw=storage.getItem(key);if(raw===null)return null;
  let p;try{p=JSON.parse(raw);}catch{throw Error('cloud_draw_invalid_checkpoint');}
  if(p?.version!==1||p.account!==account||p.apiBase!==apiBase||!p.command||
   !/^[A-Za-z0-9_-]{16,80}$/.test(p.command.operationId)||!Number.isSafeInteger(p.command.expectedRevision)||p.command.expectedRevision<0||
   !['gear','skills'].includes(p.command.kind)||!Number.isInteger(p.command.count)||p.command.count<1||p.command.count>10)throw Error('cloud_draw_invalid_checkpoint');
  return p;
 }
 function write(p){scope();const raw=JSON.stringify(p);storage.setItem(key,raw);if(storage.getItem(key)!==raw)throw Error('cloud_draw_checkpoint_failed');}
 async function run(fn){return lock('goimon-cloud-draw:'+apiBase+':'+account,async()=>{scope();return fn();});}
 async function finish(p){
  // Keep the exact request unless the server certifies this operation did not
  // commit. Never automatically start another draw, even after a rejection.
  if(!p.response){
   let r;
   try{r=await request('economy/draw',structuredClone(p.command));}
   catch(e){
    scope();
    if(e.status===409&&['economy_revision_conflict','insufficient_shards'].includes(e.message)&&
     e.drawRejection?.operationId===p.command.operationId&&e.drawRejection.expectedRevision===p.command.expectedRevision){
     storage.removeItem(key);if(storage.getItem(key)!==null)throw Error('cloud_draw_checkpoint_failed');
     e.drawRejected=true;
    }
    throw e;
   }
   scope();
   if(r?.revision!==p.command.expectedRevision+1||r.result?.kind!==p.command.kind||r.result?.count!==p.command.count||
    r.result?.cost!==p.command.count*10||!Array.isArray(r.result.items)||r.result.items.length!==p.command.count||
    r.result.items.some(x=>typeof x?.id!=='string'||!['N','R','SR'].includes(x.rarity)))throw Error('cloud_draw_invalid_response');
   p.response=r;write(p);
  }
  return structuredClone(p);
 }
 return Object.freeze({
  pending:read,
  draw:(kind,count)=>run(async()=>{
   if(read())throw Error('cloud_draw_resume_required');
   if(!['gear','skills'].includes(kind)||!Number.isInteger(count)||count<1||count>10)throw Error('invalid_draw');
   const current=await request('economy');scope();
   if(!Number.isSafeInteger(current?.revision)||current.revision<0||!Number.isSafeInteger(current.state?.shards)||current.state.shards<0)throw Error('cloud_draw_invalid_response');
   if(current.state.shards<count*10)throw Error('insufficient_shards');
   const operationId=uuid();if(!/^[A-Za-z0-9_-]{16,80}$/.test(operationId))throw Error('cloud_draw_invalid_operation');
   const p={version:1,account,apiBase,command:{operationId,expectedRevision:current.revision,kind,count}};
   write(p);return finish(p);
  }),
  resume:()=>run(async()=>{const p=read();return p?finish(p):null;}),
  // UI calls only after showing results. Failure leaves the receipt available on reload.
  acknowledge:operationId=>run(async()=>{
   const p=read();if(!p||!p.response||p.command.operationId!==operationId)throw Error('cloud_draw_receipt_required');
   storage.removeItem(key);if(storage.getItem(key)!==null)throw Error('cloud_draw_checkpoint_failed');
  })
 });
}
