// Guest storage is untouched. Every page pins its account until navigation.
(function(root){
  'use strict';
  const native=root.localStorage, PREFIX='goimon_cloud_v2:', ACTIVE=PREFIX+'active';
  const profileKey=id=>PREFIX+'profile:'+id;
  const account=native.getItem(ACTIVE)||null;
  const cache=new Map();
  let lockState=account?'pending':'guest',pending=null,pendingBase=null,release=null;
  const tabId=root.crypto.randomUUID();
  function read(id){const raw=native.getItem(profileKey(id));return raw?JSON.parse(raw):{data:{},base:{},revision:0};}
  function write(id,p){native.setItem(profileKey(id),JSON.stringify(p));}
  function collect(){const data={};for(let i=0;i<native.length;i++){const k=native.key(i);if(/^(zensho_|q7|q10|dialogue|goimon_)/.test(k)&&!k.startsWith(PREFIX))data[k]=native.getItem(k);}return data;}
  function recovery(id,p){const key=PREFIX+'recovery:'+id+':'+Date.now()+':'+Math.random();native.setItem(key,JSON.stringify(p));return key;}
  function mutate(k,v){
    const p=pending?JSON.parse(JSON.stringify(pending)):read(account),current=p.data[k]??null;
    if(!pending)pendingBase=JSON.stringify(p);
    if(cache.has(k)&&cache.get(k)!==current){
      recovery(account,{...p,data:{...p.data,[k]:v},reason:'parallel-tab'});
      root.dispatchEvent(new Event('goimon-storage-conflict'));
      throw Error('別のタブで更新されました。今回の変更は復旧用に保存しました。再読み込みしてください。');
    }
    if(v===null)delete p.data[k];else p.data[k]=String(v);
    try {
      native.setItem(PREFIX+'journal:'+account+':'+tabId,JSON.stringify(p));
      if(lockState==='owned'){write(account,p);pending=null;}
      else if(lockState==='pending')pending=p;
      else {pending=p;throw Error('別のタブが使用中です。学習タブを閉じて再読み込みしてください。');}
      cache.set(k,v===null?null:String(v));
    } catch(error) {
      pending=p;root.GOIMONPendingRecovery={account,profile:p};
      root.dispatchEvent(new Event('goimon-storage-error'));
      throw error;
    }
  }
  const storage=account?{
    getItem(k){const v=(pending||read(account)).data[k]??null;cache.set(k,v);return v;},
    setItem(k,v){mutate(String(k),String(v));},removeItem(k){mutate(String(k),null);},
    key(i){return Object.keys(read(account).data)[i]??null;},get length(){return Object.keys(read(account).data).length;}
  }:native;
  if(account && !root.location?.pathname.endsWith('/cloud.html')) {
    if(root.navigator?.locks) {
      root.navigator.locks.request('goimon-profile-'+account,{ifAvailable:true},async lock=>{
        if(!lock){lockState='blocked';if(pending)root.GOIMONPendingRecovery={account,profile:pending};root.dispatchEvent(new Event('goimon-storage-conflict'));return;}
        try {
          if(pending){
            if(JSON.stringify(read(account))!==pendingBase)throw Error('profile_changed');
            write(account,pending);pending=null;
          }
          lockState='owned';await new Promise(resolve=>{release=resolve;});
        } catch(error){lockState='blocked';root.GOIMONPendingRecovery={account,profile:pending};root.dispatchEvent(new Event('goimon-storage-error'));}
      });
      root.addEventListener('pagehide',()=>{lockState='blocked';release?.();});
      root.addEventListener('pageshow',e=>{if(e.persisted)root.location.reload();});
    } else lockState='blocked';
  }
  root.GOIMONStorage=storage;
  root.GOIMONProfiles={account,read,write,recovery,collect,profileKey,
    activate(id){if(!/^[a-zA-Z0-9-]{1,128}$/.test(id))throw Error('invalid_account');native.setItem(ACTIVE,id);},
    logout(){native.removeItem(ACTIVE);},
    cloudData(data){return Object.fromEntries(Object.entries(data).filter(([k])=>root.GOIMONCloudSchema.allowed(k)));}
  };
  root.addEventListener('goimon-storage-error',()=>{
    if(!root.document?.body){root.alert('端末に保存できません。空き容量を確認してください。');return;}
    let box=root.document.getElementById('goimon-storage-error');
    if(!box){box=root.document.createElement('aside');box.id='goimon-storage-error';
      box.style.cssText='position:fixed;z-index:99999;bottom:0;left:0;right:0;padding:16px;background:#fff0d0;color:#321';
      box.textContent='端末に保存できませんでした。このページを閉じる前に今回の記録を書き出してください。 ';
      const button=root.document.createElement('button');button.textContent='未保存の記録を書き出す';button.onclick=()=>{
        const url=URL.createObjectURL(new Blob([JSON.stringify(root.GOIMONPendingRecovery)],{type:'application/json'}));
        const a=root.document.createElement('a');a.href=url;a.download='goimon-unsaved-recovery.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      };box.appendChild(button);root.document.body.appendChild(box);
    }
  });
  root.addEventListener('goimon-storage-conflict',()=>{root.alert('別のタブで学習データが更新されています。今回の変更は復旧用に保存しました。このページを再読み込みしてください。');});
})(window);
