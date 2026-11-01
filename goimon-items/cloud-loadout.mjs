export function createCloudLoadout({account,apiBase,activeAccount,storage,lock,request,localStore,validate,level,uuid=()=>crypto.randomUUID()}){
 if(!account||account==='guest'||!apiBase||!['1','2'].includes(level)||typeof lock!=='function')throw Error('loadout_configuration');
 const key='goimon_loadout_pending_v1:'+encodeURIComponent(apiBase)+':'+encodeURIComponent(account);let remote=null;
 function scope(){if(!account||activeAccount()!==account)throw Error('loadout_account_changed');}
 function check(r){if(!Number.isSafeInteger(r?.revision)||r.revision<0||!r.loadouts)throw Error('loadout_response_invalid');validate(r.loadouts);return r;}
 function pending(){scope();const raw=storage.getItem(key);if(!raw)return null;const p=JSON.parse(raw);if(p.account!==account||p.apiBase!==apiBase||!p.command)throw Error('loadout_checkpoint_invalid');return p;}
 function savePending(p){scope();const raw=JSON.stringify(p);storage.setItem(key,raw);if(storage.getItem(key)!==raw)throw Error('loadout_checkpoint_failed');}
 function clearPending(){scope();storage.removeItem(key);if(storage.getItem(key)!==null)throw Error('loadout_checkpoint_failed');}
 async function send(p){
  try{const result=check(await request('economy/loadouts/save',p.command));scope();if(result.revision!==p.command.expectedRevision+1)throw Error('loadout_response_invalid');remote=result;clearPending();}
  catch(e){if(['loadout_revision_conflict','economy_revision_conflict','learning_revision_conflict','loadout_owner_missing','loadout_inventory_exceeded','invalid_loadout'].includes(e.message))clearPending();throw e;}
 }
 async function run(fn){return lock('goimon-cloud-loadout:'+apiBase+':'+account,async()=>{scope();return fn();});}
 function read(){scope();if(!remote)throw Error('loadout_not_ready');const ctx=localStore.read();ctx.state.loadouts=structuredClone(remote.loadouts[level]);ctx.serverRevision=remote.revision;return ctx;}
 return {
  init:()=>run(async()=>{const p=pending();if(p)await send(p);remote=check(await request('economy/loadouts'));scope();return read();}),
  read,writable:()=>activeAccount()===account&&remote!==null,
  save:(ctx,goimonId,gearId,skillIds)=>run(async()=>{
   if(pending())throw Error('loadout_resume_required');
   if(ctx.account!==account||ctx.level!==level||ctx.serverRevision!==remote?.revision)throw Error('loadout_revision_conflict');
   const p={account,apiBase,command:{operationId:uuid(),expectedRevision:remote.revision,level,goimonId,gearId,skillIds:[...skillIds]}};
   savePending(p);await send(p);return read();
  })
 };
}
