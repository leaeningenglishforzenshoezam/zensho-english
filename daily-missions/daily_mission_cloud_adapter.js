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
 // Prepare an atomic revision-checked cloud update without performing network writes.
 // The caller must use the returned expectedRevision with the existing Workers API.
 function prepareCloudUpdate(level,baseRaw,localRaw,remoteResponse,day=todayJst()){
  if(!remoteResponse||!Number.isSafeInteger(remoteResponse.revision)||remoteResponse.revision<0)throw Error('invalid_remote_revision');
  const remoteData=remoteResponse.snapshot?.data;
  if(remoteData!==undefined&&(!remoteData||typeof remoteData!=='object'||Array.isArray(remoteData)))throw Error('invalid_remote_snapshot');
  const key=storageKey(level);
  const blank=daily.encodeForCloud(daily.pack({},String(level),day));
  const remoteRaw=remoteData?.[key]??blank;
  const merged=prepareMerge(level,baseRaw??blank,localRaw??blank,remoteRaw,day);
  if(!merged.ready)return {ready:false,conflicts:merged.conflicts};
  // Carry forward every existing learning key, not only daily mission state.
  const snapshot={schemaVersion:1,data:{...(remoteData||{}),[key]:merged.value}};
  root.GOIMONCloudSchema.validate(snapshot);
  if(remoteData?.[key]===merged.value)return {ready:true,unchanged:true,expectedRevision:remoteResponse.revision};
  return {ready:true,unchanged:false,expectedRevision:remoteResponse.revision,snapshot};
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
 root.GoimonDailyCloudAdapter=Object.freeze({todayJst,snapshotFrom,inspect,prepareMerge,prepareCloudUpdate,stageToProfile});
})(typeof window!=='undefined'?window:globalThis);