import {createMissionAccountClient} from '../daily-missions/mission_account_client.mjs';
import {createCloudWallet} from './cloud-wallet.mjs';

export function dayKey(now=new Date()){
 return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
}
export async function claim(root=window){
 const P=root.GOIMONProfiles,storage=root.GOIMONStorage;
 if(!P||!storage||!root.navigator.locks)throw Error('安全な端末保存を確認できません。');
 const owner=P.account||'guest',date=dayKey(),key='goimon_device_bonus_v1:'+date;
 const scope=()=>{if((P.currentAccount()||'guest')!==owner)throw Error('学習先が変わりました。開き直してください。');};
 return root.navigator.locks.request('goimon-device-daily-bonus',async()=>{
  scope();
  const read=()=>{const raw=root.localStorage.getItem(key);if(!raw)return null;const value=JSON.parse(raw);if(value.date!==date||typeof value.owner!=='string'||!['pending','claimed'].includes(value.status))throw Error('ボーナスの受取記録を確認できません。');return value;};
  const save=status=>{scope();const raw=JSON.stringify({date,owner,status});root.localStorage.setItem(key,raw);if(root.localStorage.getItem(key)!==raw)throw Error('受取記録を端末に保存できません。');};
  const previous=read();
  if(previous?.status==='claimed')return 0;
  if(previous&&previous.owner!==owner)throw Error('別の学習先でボーナスの保存待ちです。元の学習先で開き直してください。');
  if(owner!=='guest'&&!P.isWriter()){
   const {waitForWriter}=await import('./runtime.mjs');
   await waitForWriter(root,P);scope();
  }
  if(!root.GoimonBattleCatalog)await import('../battle-prototype/catalog.js');
  if(!root.GoimonItemStore)await import('./store.js');
  scope();
  const S=root.GoimonItemStore,mode=storage.getItem('goimon_economy_mode_v1');
  let amount=0;
  if(mode){
   const state=JSON.parse(mode);
   if(state.status!=='server'||state.account!==owner||owner==='guest')throw Error('星のかけらの保存先を確認してください。');
   const cfg=root.GOIMON_CLOUD_CONFIG;
   const client=createMissionAccountClient({apiBase:cfg.apiBase,account:owner,activeAccount:()=>P.currentAccount(),profiles:P,schema:root.GOIMONCloudSchema,credential:()=>JSON.parse(root.sessionStorage.getItem('goimon_cloud_session_v1')||'null'),fetch:root.fetch.bind(root),lock:(name,fn)=>root.navigator.locks.request(name,fn)});
   await client.prepare();scope();
   const bonus=await client.request('economy/bonus');
   if(bonus.date!==date)throw Error('日付が変わりました。開き直してください。');
   const wallet=createCloudWallet({account:owner,apiBase:cfg.apiBase,activeAccount:()=>P.currentAccount(),storage,lock:(name,fn)=>root.navigator.locks.request(name,fn),request:client.request,readLocal:()=>S.readShared(storage).state,catalog:root.GoimonBattleCatalog});
   if(!bonus.login){
    const current=await wallet.refresh();
    save('pending');
    const result=await client.request('economy/bonus/claim',{kind:'login',date,expectedRevision:current.revision});
    amount=result.replayed?0:result.result.shards;
   }
   await wallet.refresh();await client.finish();
  }else{
   amount=await root.navigator.locks.request('goimon-item-common-'+owner,()=>{
    scope();if(storage.getItem('goimon_economy_mode_v1'))throw Error('保存先が変わりました。開き直してください。');
    if(owner!=='guest'&&!P.isWriter())throw Error('別の学習タブを閉じてください。');
    const ctx=S.readShared(storage),state=ctx.state,id='login:'+date;
    if(state.shop.claims[id])return 0;
    if(state.shop.stars>=1000000)throw Error('星のかけらが上限です。');
    save('pending');
    state.shop.stars++;state.shop.claims[id]=true;
    S.commitShared(storage,ctx,state);
    return 1;
   });
  }
  save('claimed');
  root.dispatchEvent(new Event('goimon-wallet-changed'));
  return amount;
 });
}
export function start(root=window){
 let busy=false;
 const receive=async()=>{
  if(busy||root.document.hidden)return;
  busy=true;
  try{
   const amount=await claim(root);
   if(amount){
    let note=root.document.getElementById('daily-bonus-notice');
    if(!note){note=root.document.createElement('p');note.id='daily-bonus-notice';note.setAttribute('role','status');note.style.cssText='margin:12px auto;padding:12px 16px;max-width:480px;box-sizing:border-box;background:#fff4d7;color:#243e2e;border-radius:12px;text-align:center;font:700 14px/1.6 system-ui';root.document.body.prepend(note);}
    note.textContent='今日のボーナス　ほしのかけら ＋1';
   }
  }catch(error){root.console.warn('今日のボーナスは受取待ちです。',error.message);}
  finally{busy=false;}
 };
 root.GoimonDailyBonus={claim:()=>claim(root)};
 receive();
 root.addEventListener('focus',receive);
 root.addEventListener('goimon-storage-ready',receive);
}
