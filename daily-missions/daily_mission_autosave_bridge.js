// Feature-only packing and restoration. Runtime activation is restricted to isolated local tests.
(function(root){
 'use strict';
 const D=root.GoimonDailyCloudState, S=root.GOIMONCloudSchema;
 const key=lv=>'goimon_daily_cloud_state_v1_lv'+lv;
 const today=()=>new Date(Date.now()+9*3600000).toISOString().slice(0,10);
 const blank=(lv,day)=>D.pack({},String(lv),day);
 function enabled(){
  const cfg=root.GOIMON_CLOUD_CONFIG;
  if(cfg?.dailyMissionSync!==true)return false;
  try{return ['localhost','127.0.0.1'].includes(root.location.hostname)&&['localhost','127.0.0.1','api.test'].includes(new URL(cfg.apiBase).hostname);}catch{return false;}
 }
 function project(profile,level,day=today()){
  if(!profile?.data||!profile.base)throw Error('invalid_profile');
  const lv=String(level), k=key(lv);
  const decode=raw=>raw===undefined?blank(lv,day):D.decodeFromCloud(raw,lv,day);
  const prior=decode(profile.data[k]??profile.base[k]),base=decode(profile.base[k]);
  const sources=Object.fromEntries(Object.entries(profile.data).filter(([name])=>D.isAllowed(name,lv)));
  // Missing unpacked keys are retained. Pruning is performed only inside the bounded cloud projection.
  const local=D.pack({...prior.data,...sources},lv,day);
  const merged=D.merge(base,local,prior);
  if(merged.conflicts.length)return {ready:false,reason:'existing_cloud_state_requires_reconciliation',conflicts:merged.conflicts};
  const data=Object.fromEntries(Object.entries(profile.data).filter(([name])=>S.allowed(name)));
  if(Object.keys(merged.data).length||profile.data[k]!==undefined)data[k]=D.encodeForCloud(D.pack(merged.data,lv,day));
  S.validate({schemaVersion:1,data});
  return {ready:true,data,sourceKeys:Object.keys(sources).length};
 }
 function projectData(data,base={},day=today()){
  let next=data;
  for(const lv of ['1','2']){
   const result=project({data:next,base},lv,day);
   if(!result.ready)throw Error('daily_reconciliation_required');
   next={...next,...result.data};
  }
  return Object.fromEntries(Object.entries(next).filter(([k])=>S.allowed(k)));
 }
 function restoreData(device,data,day=today()){
  const next={...device,...data};
  for(const lv of ['1','2'])if(data[key(lv)]!==undefined){
   const state=D.decodeFromCloud(data[key(lv)],lv,day);
   Object.assign(next,state.data);
  }
  return next;
 }
 function mergeCloud(base,local,remote,day=today()){
  const merged=S.merge(base,local,remote);
  const unresolved=[];
  for(const k of merged.conflicts){
   const match=k.match(/^goimon_daily_cloud_state_v1_lv([12])$/);
   if(!match||local[k]===undefined||remote[k]===undefined){unresolved.push(k);continue;}
   const lv=match[1],decode=raw=>raw===undefined?blank(lv,day):D.decodeFromCloud(raw,lv,day);
   const result=D.merge(decode(base[k]),decode(local[k]),decode(remote[k]));
   if(result.conflicts.length){unresolved.push(k);continue;}
   merged.data[k]=D.encodeForCloud(D.pack(result.data,lv,day));
  }
  merged.conflicts=unresolved;return merged;
 }
 root.GoimonDailyAutosaveBridge=Object.freeze({project,projectData,restoreData,mergeCloud,enabled});
})(typeof window!=='undefined'?window:globalThis);
