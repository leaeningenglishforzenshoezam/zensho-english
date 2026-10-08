(() => {
  'use strict';
  const P=GOIMONProfiles,S=GOIMONCloudSchema,cfg=GOIMON_CLOUD_CONFIG,$=id=>document.getElementById(id);
  let token=null,userId=null,busy=false,conflict=null,epoch=0;
  const message=t=>{$('status').textContent=t;};
  const current=()=>P.read(userId);
  const snap=data=>({schemaVersion:1,data});
  const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  function render(){
    $('sync').disabled=busy||!userId;
    $('import-guest').disabled=busy||!userId||Object.keys(current().data).length>0||current().revision!==0;
    $('logout').disabled=busy;
    for(const id of ['use-local','use-remote'])$(id).disabled=busy;
    $('conflict').hidden=!conflict;
    $('profile').textContent=userId?'学習先：ログイン中のアカウント':localStorage.getItem('goimon_cloud_v2:active')?'学習先：前回選択したアカウント（端末保存）':'学習先：ゲスト';
  }
  function download(data,name){const u=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=u;a.download=name+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
  async function request(method,body,credential=token){
    const c=new AbortController(),timer=setTimeout(()=>c.abort(),15000);
    try{const r=await fetch(cfg.apiBase.replace(/\/$/,'')+'/api/v1/save',{method,headers:{Authorization:'Bearer '+credential,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,signal:c.signal,cache:'no-store'});
      const j=await r.json();if(!r.ok){const e=Error(r.status===409?'別の端末が先に保存しました。もう一度同期してください。':r.status===401?'認証の期限が切れました。再ログインしてください。':`通信できませんでした (${r.status})`);e.status=r.status;throw e;}return j;
    }finally{clearTimeout(timer);}
  }
  async function run(fn){if(busy)return;busy=true;render();try{if(!navigator.locks)throw Error('このブラウザは安全な同期に未対応です。新しいブラウザを使ってください。');await navigator.locks.request('goimon-cloud-sync',()=>userId?navigator.locks.request('goimon-profile-'+userId,{ifAvailable:true},lock=>{if(!lock)throw Error('同じアカウントの学習タブを閉じてから同期してください。');return fn();}):fn());}catch(e){message(e.name==='AbortError'?'通信が時間切れになりました。端末データは残っています。':e.message);}finally{busy=false;render();}}
  function checkRemote(r){if(!Number.isSafeInteger(r.revision)||r.revision<0)throw Error('invalid_revision');if(r.snapshot)S.validate(r.snapshot);else if(r.revision!==0)throw Error('missing_snapshot');}
  function localUnchanged(before){if(!equal(current(),before))throw Error('同期中に別のタブで学習しました。端末の変更は残っています。もう一度同期してください。');}
  function apply(before,data,revision){
    localUnchanged(before);P.recovery(userId,before);
    const device=Object.fromEntries(Object.entries(before.data).filter(([k])=>!S.allowed(k)));
    P.write(userId,{data:{...device,...data},base:data,revision});
    conflict=null;message('同期しました。学習ページを開き直すと新しい記録が使われます。');
  }
  async function sync(){
    const before=current(),local=P.cloudData(before.data);S.validate(snap(local));
    const remote=await request('GET');checkRemote(remote);localUnchanged(before);
    if(remote.userId!==userId)throw Error('account_mismatch');
    const r=remote.snapshot?.data||{}, merged=S.merge(before.base||{},local,r);
    if(merged.conflicts.length){conflict={before,local,remote:r,revision:remote.revision,keys:merged.conflicts};$('conflict-keys').textContent=merged.conflicts.join('\n');message('競合が見つかったため、自動上書きを止めました。');return;}
    if(equal(merged.data,r)){apply(before,merged.data,remote.revision);return;}
    const result=await request('POST',{expectedRevision:remote.revision,snapshot:snap(merged.data)});
    apply(before,merged.data,result.revision);
  }
  async function resolve(which){if(!conflict)return;const c=conflict;localUnchanged(c.before);
    if(!confirm(which==='local'?'競合した記録にこの端末の内容を採用しますか？':'競合した記録にクラウドの内容を採用しますか？'))return;
    const merged=S.merge(c.before.base||{},c.local,c.remote).data,chosen=which==='local'?c.local:c.remote;
    for(const k of c.keys){if(chosen[k]===undefined)delete merged[k];else merged[k]=chosen[k];}
    S.validate(snap(merged));P.recovery(userId,{...c.before,conflict:c});
    const result=await request('POST',{expectedRevision:c.revision,snapshot:snap(merged)});apply(c.before,merged,result.revision);
  }
  $('sync').onclick=()=>run(sync);
  $('use-local').onclick=()=>run(()=>resolve('local'));
  $('use-remote').onclick=()=>run(()=>resolve('remote'));
  $('export-conflict').onclick=()=>download(conflict,'goimon-conflict');
  $('backup').onclick=()=>download({format:'goimon-local-backup-v2',account:userId||P.account,data:userId?current().data:P.account?P.read(P.account).data:P.collect()},'goimon-backup');
  $('recovery').onclick=()=>{const data={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k.startsWith('goimon_cloud_v2:recovery:')||k.startsWith('goimon_cloud_v2:journal:'))data[k]=JSON.parse(localStorage.getItem(k));}download(data,'goimon-recovery');};
  $('import-guest').onclick=()=>run(async()=>{
    const p=current();if(Object.keys(p.data).length||p.revision)throw Error('初回だけ引き継ぎできます');
    if(!confirm('この端末のゲスト記録を、このGoogleアカウントにコピーしますか？'))return;
    const data=P.collect();S.validate(snap(P.cloudData(data)));P.write(userId,{...p,data});message('コピーしました。「同期する」でクラウドに保存してください。');
  });
  $('logout').onclick=()=>{epoch++;token=null;userId=null;conflict=null;P.logout();$('account').textContent='ログインしていません';window.google?.accounts.id.disableAutoSelect();message('ゲストに戻りました。開いている学習タブは閉じ、学習ページを開き直してください。');render();};
  window.goimonGoogleLogin=credential=>run(async()=>{
    const e=++epoch;token=null;userId=null;conflict=null;
    const remote=await request('GET',undefined,credential);checkRemote(remote);if(e!==epoch)return;
    if(!/^[a-zA-Z0-9-]{1,128}$/.test(remote.userId))throw Error('invalid_account');
    // Identity comes exclusively from the verified Worker response, never decoded JWT.
    P.activate(remote.userId);userId=remote.userId;token=credential;
    $('account').textContent='Googleログイン済み';message('ログインしました。「同期する」で保存・引き継ぎできます。');
  });
  render();
  if(!cfg.googleClientId||!/^https:\/\//.test(cfg.apiBase)){message('検証用の設定待ちです。GoogleクライアントIDとWorker URLを設定してください。ゲスト学習は利用できます。');return;}
  const sdk=document.createElement('script');sdk.src='https://accounts.google.com/gsi/client';sdk.async=true;
  sdk.onload=()=>{google.accounts.id.initialize({client_id:cfg.googleClientId,callback:r=>window.goimonGoogleLogin(r.credential),auto_select:false});google.accounts.id.renderButton($('google-button'),{theme:'outline',size:'large',locale:'ja'});message('Googleでログインしてください。');};
  sdk.onerror=()=>message('Googleログインを読み込めません。通信を確認してください。端末の学習は続けられます。');document.head.appendChild(sdk);
})();
