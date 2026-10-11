// Explicit cloud staging adapter; deliberately no automatic writes or network calls.
(function(root){
 'use strict';
 const daily=root.GoimonDailyCloudState;
 const storageKey=level=>'goimon_daily_cloud_state_v1_lv'+level;
 function todayJst(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
 function snapshotFrom(storage,level,day=todayJst()){
  if(!daily)throw Error('missing_daily_state');
  const values={};
  for(let i=0;i<storage.length;i++){const k=storage.key(i);if(daily.isAllowed(k,level)){const v=storage.getItem(k);if(v!==null)values[k]=v;}}
  return daily.pack(values,level,day);
 }
 function validateForCloud(state,level){
  const key=storageKey(level),json=daily.encodeForCloud(state);
  const schema=root.GOIMONCloudSchema;
  if(!schema||!schema.allowed(key))throw Error('daily_cloud_schema_not_ready');
  schema.validate({schemaVersion:1,data:{[key]:json}});
  return {key,value:json};
 }
 function inspect(level,options={}){
  const day=options.day||todayJst();
  // Account-scoped data is exposed by GOIMONStorage, NOT native localStorage.
  const source=options.source||root.GOIMONStorage||root.localStorage;
  const state=snapshotFrom(source,String(level),day);
  const ready=validateForCloud(state,level);
  return {state,cloudKey:ready.key,bytes:new TextEncoder().encode(ready.value).length,keys:Object.keys(state.data)};
 }
 function prepareMerge(level,base,local,remote,day=todayJst()){
  const normalized=[base,local,remote].map(raw=>daily.decodeFromCloud(raw,String(level),day));
  const result=daily.merge(...normalized);
  if(result.conflicts.length)return {ready:false,conflicts:result.conflicts};
  const next=daily.pack(result.data,String(level),day);
  const prepared=validateForCloud(next,level);
  return {ready:true,conflicts:[],...prepared,state:next};
 }
 // Staging is NOT automatic. Do not call from the live UI before conflict/recovery testing.
 function stageToProfile(level,options={}){
  if(options.confirmed!==true)throw Error('explicit_confirmation_required');
  const target=root.GOIMONStorage;
  if(!target||!root.GOIMONProfiles?.account||!root.GOIMONProfiles.isWriter())throw Error('account_storage_not_ready');
  const next=inspect(level,{...options,source:target}),key=next.cloudKey;
  if(next.keys.length===0)throw Error('no_daily_mission_data_to_stage');
  if(target.getItem(key)!==null)throw Error('existing_cloud_daily_state_requires_merge');
  // GOIMONStorage uses an account-scoped journal and recovery on write failure.
  target.setItem(key,daily.encodeForCloud(next.state));
  return {staged:true,key,count:next.keys.length,bytes:next.bytes};
 }
 root.GoimonDailyCloudAdapter=Object.freeze({todayJst,snapshotFrom,inspect,prepareMerge,stageToProfile});
})(typeof window!=='undefined'?window:globalThis);