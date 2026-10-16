// Explicitly instantiated by a mission page; no background activity or login creation.
export function createMissionAccountClient({apiBase,account,credential,activeAccount,profiles,schema,fetch:send=globalThis.fetch,lock,restoreData=(device,remote)=>({...device,...remote})}){
 const equal=(a,b)=>JSON.stringify(Object.entries(a).sort())===JSON.stringify(Object.entries(b).sort());
 function assertAccount(){if(!account||activeAccount()!==account||profiles.account!==account||!profiles.isWriter())throw Error('mission_account_changed');const s=credential();if(s?.userId!==account||s.apiBase!==apiBase||s.expiresAt*1000<=Date.now()||!/^gs1_[a-f0-9]{64}$/.test(s.token||''))throw Error('mission_login_required');return s;}
 async function request(path,body){
  const s=assertAccount();
  const r=await send(apiBase.replace(/\/$/,'')+'/api/v1/'+path,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+s.token,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}),cache:'no-store'});
  assertAccount();const data=await r.json();if(!r.ok)throw Object.assign(Error(data.error||'mission_request_failed'),{status:r.status});return data;
 }
 async function reconcile(){
  assertAccount();const p=profiles.read(account),local=profiles.cloudData(p.data);
  schema.validate({schemaVersion:1,data:local});
  if(!equal(local,p.base||{})){
   const saved=await request('save',{expectedRevision:p.revision,snapshot:{schemaVersion:1,data:local}});
   if(saved.revision!==p.revision+1)throw Error('invalid_revision');
   const current=profiles.read(account);
   if(current.revision!==p.revision||!equal(current.base||{},p.base||{}))throw Error('mission_local_changed');
   profiles.write(account,{...current,base:local,revision:saved.revision});
  }
  const remote=await request('save');
  if(remote.userId!==account||!Number.isSafeInteger(remote.revision)||remote.revision<0||(!remote.snapshot&&remote.revision!==0))throw Error('invalid_response');
  if(remote.snapshot)schema.validate(remote.snapshot);
  const current=profiles.read(account),data=remote.snapshot?.data||{};
  if(!equal(profiles.cloudData(current.data),current.base||{}))throw Error('mission_unsaved_changes');
  if(remote.revision<current.revision)throw Error('invalid_revision');
  if(!equal(profiles.cloudData(current.data),data))profiles.recovery(account,current);
  const device=Object.fromEntries(Object.entries(current.data).filter(([key])=>!schema.allowed(key)));
  profiles.write(account,{...current,data:restoreData(device,data),base:data,revision:remote.revision});
  return remote;
 }
 // Same lock used by cloud_auto.js. Mission pages must not host normal learning edits.
 async function run(work){if(typeof lock!=='function')throw Error('mission_lock_required');return lock('goimon-cloud-sync',async()=>{assertAccount();return work();});}
 return {
  prepare:()=>run(reconcile),
  request:(path,body)=>run(async()=>{if(!/^missions\/|^economy$/.test(path))throw Error('invalid_mission_path');return request(path,body);}),
  finish:()=>run(reconcile)
 };
}
