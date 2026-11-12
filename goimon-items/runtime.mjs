import {createMissionAccountClient} from '../daily-missions/mission_account_client.mjs';
import {createCloudWallet} from './cloud-wallet.mjs';
import {createCloudDraw} from './cloud-draw.mjs';
import {createCloudLoadout} from './cloud-loadout.mjs';

// Explicit development opt-in only. Public config leaves economyServerEnabled unset.
export async function connect(root){
 await root.GoimonReleaseReady;
 const cfg=root.GOIMON_CLOUD_CONFIG,P=root.GOIMONProfiles,S=root.GoimonItemStore,C=root.GoimonBattleCatalog,storage=root.GOIMONStorage;
 if(cfg?.economyServerEnabled!==true){if(storage?.getItem('goimon_economy_mode_v1'))throw Error('サーバー接続を確認できません。通信を確認して開き直してください。');return;}
 // Preserve the existing device-only guest path. Never fall back to local
 // spending for an account whose wallet was already migrated.
 if(P&&!P.account&&!P.currentAccount()){
  if(storage.getItem('goimon_economy_mode_v1'))throw Error('移行済みのアカウントでログインしてください。');
  return;
 }
 if(!P.account||!root.navigator.locks)throw Error('ログインしてから開き直してください。');
 await waitForWriter(root,P);
 const account=P.account,activeAccount=()=>P.currentAccount(),lock=(name,fn)=>root.navigator.locks.request(name,fn);
 const client=createMissionAccountClient({apiBase:cfg.apiBase,account,activeAccount,profiles:P,schema:root.GOIMONCloudSchema,
  credential:()=>JSON.parse(root.sessionStorage.getItem('goimon_cloud_session_v1')||'null'),lock,fetch:root.fetch.bind(root)});
 await client.prepare();
 const existing=await client.request('economy');
 if(existing.revision===0&&!storage.getItem('goimon_economy_mode_v1')){
  const local=S.readShared(storage).state;
  if(!root.confirm('この端末のほしのかけら '+local.shop.stars+'個と所持品を引き継ぎます。別の端末に記録がある場合はキャンセルしてください。'))throw Error('移行は行っていません。記録のある端末から開始してください。');
 }
 const wallet=createCloudWallet({account,apiBase:cfg.apiBase,activeAccount,storage,lock,request:client.request,readLocal:()=>S.readShared(storage).state,catalog:C});
 await wallet.migrate();
 await client.request('economy/loadouts/import',{});
 let bonuses=await client.request('economy/bonus');
 let firstAidGift=null;
 try{firstAidGift=await client.request('economy/gift');}catch(error){console.warn('First Aidギフトの受取状況を確認できませんでした。',error.message);}
 async function claim(kind){
  bonuses=await client.request('economy/bonus');
  if(bonuses[kind])return 0;
  const current=await wallet.refresh();
  const response=await client.request('economy/bonus/claim',{kind,date:bonuses.date,expectedRevision:current.revision});
  await wallet.refresh();bonuses=await client.request('economy/bonus');
  return response.replayed?0:response.result.shards;
 }
 const draw=createCloudDraw({account,apiBase:cfg.apiBase,activeAccount,storage,lock,request:client.request});
 let receipt=draw.pending(),drawNotice='';
 if(receipt){
  try{receipt=await draw.resume();}catch(e){if(!e.drawRejected)throw e;receipt=null;drawNotice='前回の抽選は成立していません。かけらは消費されていません。残高を確認して、もう一度選んでください。';}
  await wallet.refresh();
 }
 function project(level){const legacy=S.project(S.readShared(storage).state,level),cloud=wallet.read();return {...legacy,owned:cloud.state.owned,shop:{...legacy.shop,stars:cloud.state.shards,claims:{...legacy.shop.claims,welcome:bonuses.welcome,['login:'+bonuses.date]:bonuses.login}}};}
 root.GoimonShop={read:project,drawNotice:()=>drawNotice,
  firstAidClaimed:()=>firstAidGift?.claimed===true||(wallet.read()?.state?.owned?.skills?.N_first_aid_gift||0)>0,
  claimFirstAid:async()=>{
   if(firstAidGift?.claimed)return false;
   if(!firstAidGift)throw Error('プレゼント受取機能がサーバー側で利用できません。');
   const current=await wallet.refresh();
   const response=await client.request('economy/gift/claim',{expectedRevision:current.revision});
   await wallet.refresh();firstAidGift=await client.request('economy/gift');
   root.dispatchEvent(new Event('goimon-wallet-changed'));
   return !!response.result?.received&&!response.replayed;
  },
  welcome:()=>claim('welcome'),claimLogin:()=>import('./daily-bonus.mjs').then(module=>module.claim(root)),
  loginStatus:()=>({date:bonuses.date,loggedIn:activeAccount()===account,claimed:bonuses.login}),
  draw:async(level,kind,count)=>{if(receipt)throw Error('前回の結果を確認してください。');try{receipt=await draw.draw(kind,count);}catch(e){if(!e.drawRejected)throw e;await wallet.refresh();throw Error('抽選は成立していません。残高を更新しました。回数を選び直してください。');}await wallet.refresh();return receipt.response.result.items.map(x=>C[kind].find(i=>i.id===x.id));},
  acknowledge:async()=>{if(receipt){await draw.acknowledge(receipt.command.operationId);receipt=null;}},
  pendingResult:()=>receipt?.response?{kind:receipt.response.result.kind,items:receipt.response.result.items.map(x=>C[receipt.response.result.kind].find(i=>i.id===x.id))}:null
 };
 const level=storage.getItem('zensho_level_v1')==='2'?'2':'1';
 const local=S.create({storage,profiles:P,activeAccount,level:()=>level,locks:root.navigator.locks});
 const adapter=createCloudLoadout({account,apiBase:cfg.apiBase,activeAccount,storage,lock,request:client.request,level,localStore:local,
  validate:loadouts=>{for(const n of ['1','2'])S.validate({...S.empty(n),owned:wallet.read().state.owned,loadouts:displayLoadouts(loadouts[n])},n);}});
 await adapter.init();
 function cacheLoadouts(){
  const key='goimon_loadout_cache_v1:'+encodeURIComponent(cfg.apiBase)+':'+encodeURIComponent(account),value=adapter.snapshot();
  const previous=JSON.parse(storage.getItem(key)||'null');
  if(previous&&previous.revision>value.revision)throw Error('loadout_stale_response');
  const raw=JSON.stringify(value);storage.setItem(key,raw);if(storage.getItem(key)!==raw)throw Error('loadout_checkpoint_failed');
 }
 cacheLoadouts();
 const originalRead=adapter.read;adapter.read=()=>{const ctx=originalRead();ctx.state.owned=wallet.read().state.owned;ctx.state.loadouts=displayLoadouts(ctx.state.loadouts);return ctx;};
 const originalSave=adapter.save;adapter.save=async(...args)=>{const ctx=await originalSave(...args);cacheLoadouts();ctx.state.owned=wallet.read().state.owned;ctx.state.loadouts=displayLoadouts(ctx.state.loadouts);return ctx;};
 root.GoimonItemStore=Object.freeze({...S,create:()=>adapter});
 root.GoimonCloudWallet=wallet;
 root.dispatchEvent(new Event('goimon-wallet-changed'));
}
// Server revisions establish ordering. Legacy UI requires a timestamp field;
// zero means unavailable, never a fabricated update time or a new server write.
export function displayLoadouts(loadouts){
 if(!loadouts||typeof loadouts!=='object'||Array.isArray(loadouts))throw Error('loadout_response_invalid');
 return Object.fromEntries(Object.entries(loadouts).map(([id,slots])=>[id,{...slots,updatedAt:slots.updatedAt??0}]));
}
export async function waitForWriter(root,profiles){
 if(profiles.isWriter())return;
 await new Promise((resolve,reject)=>{
  const events=['goimon-storage-ready','goimon-storage-conflict','goimon-storage-error'];
  const cleanup=()=>{clearTimeout(timer);for(const e of events)root.removeEventListener(e,check);};
  const check=()=>{cleanup();if(profiles.isWriter())resolve();else reject(Error('保存の準備ができません。他の学習タブを閉じて開き直してください。'));};
  const timer=setTimeout(check,5000);for(const e of events)root.addEventListener(e,check);
  if(profiles.isWriter())check();
 });
}
