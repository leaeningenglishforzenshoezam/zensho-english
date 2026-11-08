import {createMissionAccountClient} from './mission_account_client.mjs';

// Opt-in only. The existing public config does not enable this adapter.
export function createBrowserMissionClient(root=window){
 const config=root.GOIMON_CLOUD_CONFIG,profiles=root.GOIMONProfiles;
 if(config?.missionsEnabled!==true)throw Error('missions_not_enabled');
 if(!profiles||!root.GOIMONCloudSchema)throw Error('mission_storage_not_ready');
 const activeAccount=()=>root.localStorage.getItem('goimon_cloud_v2:active');
 const credential=()=>{try{return JSON.parse(root.sessionStorage.getItem('goimon_cloud_session_v1')||'null');}catch{return null;}};
 return createMissionAccountClient({apiBase:config.apiBase,account:profiles.account,activeAccount,credential,profiles,schema:root.GOIMONCloudSchema,
  fetch:root.fetch.bind(root),lock:root.navigator.locks?((name,fn)=>root.navigator.locks.request(name,fn)):null,
  ...(root.GoimonDailyAutosaveBridge?.enabled()?{restoreData:root.GoimonDailyAutosaveBridge.restoreData}:{})
 });
}
