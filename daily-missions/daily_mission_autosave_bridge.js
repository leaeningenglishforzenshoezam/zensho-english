// Daily mission autosave bridge, feature branch only.
// Pure projection: never mutates the account profile or makes network requests.
(function(root){
 'use strict';
 function project(profile,level,day){
  if(!profile||!profile.data||!profile.base)throw Error('invalid_profile');
  const adapter=root.GoimonDailyCloudAdapter,schema=root.GOIMONCloudSchema;
  if(!adapter||!schema)throw Error('missing_cloud_dependencies');
  const key='goimon_daily_cloud_state_v1_lv'+level;
  const keys=Object.keys(profile.data).filter(k=>root.GoimonDailyCloudState.isAllowed(k,String(level)));
  const source={
   get length(){return keys.length;},
   key(i){return keys[i]??null;},
   getItem(k){return profile.data[k]??null;}
  };
  const report=adapter.inspect(level,{source,day});
  const original=Object.fromEntries(Object.entries(profile.data).filter(([k])=>schema.allowed(k)));
  // Never quietly replace a pre-existing packed state; it may contain newer
  // records imported from another device.
  if(Object.prototype.hasOwnProperty.call(original,key)){
   const prior=root.GoimonDailyCloudState.decodeFromCloud(original[key],String(level),day);
   const combined=root.GoimonDailyCloudState.merge(prior,report.state,prior);
   // Compare un-packed local values with cloud values: conflict requires review.
   const conflicts=keys.filter(k=>prior.data[k]!==undefined&&prior.data[k]!==profile.data[k]);
   if(conflicts.length)return {ready:false,reason:'existing_cloud_state_requires_reconciliation',conflicts};
   const next={...prior.data,...report.state.data};
   const packed=root.GoimonDailyCloudState.encodeForCloud(root.GoimonDailyCloudState.pack(next,String(level),day));
   return {ready:true,data:{...original,[key]:packed},sourceKeys:keys.length};
  }
  if(!keys.length)return {ready:true,data:original,sourceKeys:0};
  return {ready:true,data:{...original,[key]:report.state&&root.GoimonDailyCloudState.encodeForCloud(report.state)},sourceKeys:keys.length};
 }
 root.GoimonDailyAutosaveBridge=Object.freeze({project});
})(typeof window!=='undefined'?window:globalThis);
