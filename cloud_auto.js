(() => {
 'use strict';
 const P=GOIMONProfiles,cfg=GOIMON_CLOUD_CONFIG,authKey='goimon_cloud_session_v1',activeKey='goimon_cloud_v2:active',isCloud=location.pathname.endsWith('/cloud.html');
 const id=P.account,metaKey='goimon_cloud_v2:auto:'+id;
 let memoryMeta=null;
 let timer=null,expiryTimer=null,engine,kind='pending',interacted=false,closed=false,lastEdit=0,firstEdit=0;
 const readMeta=()=>{try{return memoryMeta||JSON.parse(localStorage.getItem(metaKey))||{};}catch{return {};}};
 const storeMeta=x=>{memoryMeta=x;try{localStorage.setItem(metaKey,JSON.stringify(x));}catch{}};
 function session(){try{const x=JSON.parse(sessionStorage.getItem(authKey));if(x?.apiBase===cfg.apiBase&&x.userId===localStorage.getItem(activeKey)&&/^gs1_[a-f0-9]{64}$/.test(x.token)&&x.expiresAt*1000>Date.now())return x;}catch{}return null;}
 const bar=document.createElement('aside');bar.id='goimon-account-bar';bar.setAttribute('aria-label','アカウントと保存状態');
 const account=document.createElement('a');account.href='cloud.html';
 const status=document.createElement('span');status.setAttribute('role','status');status.setAttribute('aria-live','polite');bar.append(account,status);
 document.body.prepend(bar);
 const labels={saved:'クラウド保存済み',pending:'端末に保存済み · 自動保存待ち',saving:'クラウドに保存中…',waiting:'端末に保存済み · 通信待ち',auth:'端末保存のみ · 再ログインしてください',conflict:'別端末の記録を確認してください',error:'自動保存を停止 · 保存画面で確認',blocked:'別の学習タブを閉じて再読み込み',guest:'この端末に保存'};
 function render(){const s=session(),active=localStorage.getItem(activeKey);let k=kind;
  if(!active)k='guest';else if(!s)k='auth';else if(!isCloud&&active!==id)k='auth';
  account.textContent=s?'● ログイン中'+(s.displayName?' · '+s.displayName:''):'○ '+(active?'再ログイン':'ゲスト · Googleでログイン');
  status.textContent=isCloud&&s?'自動保存を設定・確認':labels[k]||labels.pending;
  if(k==='conflict'||k==='error'){account.textContent+=' · 保存を確認';}
  bar.dataset.state=k;
  clearTimeout(expiryTimer);if(s)expiryTimer=setTimeout(render,Math.min(2147483647,Math.max(1,s.expiresAt*1000-Date.now()+1)));
 }
 function canWrite(){return !closed&&id&&localStorage.getItem(activeKey)===id&&P.isWriter();}
 function schedule(check=false){
  if(isCloud||!engine||engine.stopped||!canWrite()||!session())return;
  clearTimeout(timer);const m=readMeta(),now=Date.now();
  if(!engine.dirty()&&!check)return;
  const due=engine.dirty()?Math.max(firstEdit?Math.min(lastEdit+10000,firstEdit+30000):now+10000,(m.attemptAt||0)+30000,m.retryAt||0):Math.max(now,m.retryAt||0);
  timer=setTimeout(()=>flush(check),Math.max(0,due-now));
 }
 async function flush(check=false){
  if(!navigator.onLine){kind='waiting';render();return;}
  if(!canWrite()||!session())return;
  await navigator.locks.request('goimon-cloud-sync',()=>engine.run(check));
  firstEdit=0;render();if(engine.dirty()||readMeta().retryAt)schedule(!!readMeta().retryAt);
 }
 if(!isCloud&&id&&navigator.locks){
  engine=GOIMONAutosave.create({schema:GOIMONCloudSchema,account:id,read:()=>P.read(id),write:p=>P.write(id,p),cloudData:P.cloudData,recovery:p=>P.recovery(id,p),now:Date.now,meta:readMeta,saveMeta:storeMeta,canWrite,credential:()=>session()?.token,canApplyRemote:()=>!interacted,reload:()=>location.reload(),expire:()=>{const s=session();if(s?.userId===id)sessionStorage.removeItem(authKey);},state:k=>{kind=k;render();},request:async(method,body)=>{
   const token=session()?.token;if(!token)throw Object.assign(Error('unauthorized'),{status:401});
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
   try{const r=await fetch(cfg.apiBase.replace(/\/$/,'')+'/api/v1/save',{method,headers:{Authorization:'Bearer '+token,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,signal:controller.signal,cache:'no-store'});if(!r.ok)throw Object.assign(Error('http_error'),{status:r.status});return await r.json();}finally{clearTimeout(timeout);}
  }});
  addEventListener('goimon-profile-written',()=>{if(!canWrite()||engine.stopped)return;if(engine.dirty()){lastEdit=Date.now();if(!firstEdit)firstEdit=lastEdit;kind='pending';render();schedule();}});
  addEventListener('goimon-storage-ready',()=>{kind='pending';render();schedule(true);});
  for(const event of ['pointerdown','keydown','input'])addEventListener(event,()=>{interacted=true;},{capture:true,once:true});
  addEventListener('online',()=>schedule(true));
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')schedule(true);});
  addEventListener('pagehide',()=>{closed=true;clearTimeout(timer);clearTimeout(expiryTimer);});
  addEventListener('goimon-storage-error',()=>{closed=true;clearTimeout(timer);kind='error';render();});
  addEventListener('goimon-storage-conflict',()=>{closed=true;clearTimeout(timer);kind='blocked';render();});
  if(canWrite())schedule(true);else kind='blocked';
  if(readMeta().conflict)kind='conflict';
 }
 addEventListener('storage',e=>{if(e.key===activeKey){clearTimeout(timer);render();}});
 addEventListener('goimon-auth-changed',render);
 render();
})();
