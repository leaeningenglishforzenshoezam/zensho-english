(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.GoimonStoryNames=api;})(typeof window==='object'?window:globalThis,()=>{'use strict';
const AUTH_KEY='goimon_cloud_session_v1';
function playerName(storage,apiBase,activeUserId){
 try{
  const raw=storage?.getItem(AUTH_KEY);if(!raw)return 'あなた';
  const session=JSON.parse(raw);
  if(!session||typeof session!=='object'||typeof session.userId!=='string'||!Number.isSafeInteger(session.expiresAt)||session.expiresAt*1000<=Date.now()||!/^gs1_[a-f0-9]{64}$/.test(session.token)||typeof session.displayName!=='string')return 'あなた';
  if(activeUserId!==undefined&&activeUserId!==session.userId)return 'あなた';
  if(apiBase&&session.apiBase!==apiBase)return 'あなた';
  const name=session.displayName.trim();return name||'あなた';
 }catch(_){return 'あなた';}
}
function partnerName(goimon,dex){
 if(!goimon||typeof goimon!=='object')return '相棒ゴイモン';
 const nickname=typeof goimon.nickname==='string'?goimon.nickname.trim():'';
 if(nickname)return nickname;
 const name=dex?.getEntry?.(goimon.type,goimon.stage)?.name;
 return typeof name==='string'&&name.trim()?name.trim(): '相棒ゴイモン';
}
function interpolate(value,names){
 return String(value??'').replace(/\{\{(playerName|partnerName)\}\}/g,(_,key)=>names?.[key]|| (key==='playerName'?'あなた':'相棒ゴイモン'));
}
return Object.freeze({playerName,partnerName,interpolate});
});
