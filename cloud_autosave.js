// Shared autosave state machine. No DOM or credentials are persisted here.
(function(root){
 'use strict';
 const equal=(a,b)=>{const ak=Object.keys(a),bk=Object.keys(b);return ak.length===bk.length&&ak.every(k=>a[k]===b[k]);};
 function create(o){
  const S=o.schema;let running=false,stopped=false;
  const dirty=p=>!equal(o.cloudData(p.data),p.base||{});
  function state(kind){o.state(kind);}
  async function run(check=false){
   if(running||stopped||!o.canWrite())return;
   if(!o.credential()){state('auth');return;}
   let meta=o.meta(),now=o.now(),p=o.read(),changed=dirty(p);
   if(meta.conflict){stopped=true;state('conflict');return;}
   if(meta.retryAt>now){state('waiting');return;}
   if(changed&&meta.attemptAt&&now-meta.attemptAt<30000){state('pending');return;}
   if(!changed&&(!check||(meta.checkedAt&&now-meta.checkedAt<60000))){state('saved');return;}
   running=true;state('saving');
   const valid=()=>{if(!o.canWrite())throw Object.assign(Error('account_changed'),{code:'cancelled'});if(!o.credential())throw Object.assign(Error('expired'),{status:401});};
   async function reconcile(){
    const r=await o.request('GET');valid();
    if(r.userId!==o.account||!Number.isSafeInteger(r.revision)||r.revision<0||(!r.snapshot&&r.revision!==0))throw Error('invalid_response');
    if(r.snapshot)S.validate(r.snapshot);const remote=r.snapshot?.data||{},current=o.read();
    meta.checkedAt=o.now();o.saveMeta(meta);
    if(equal(o.cloudData(current.data),remote)){
     o.write({...current,base:remote,revision:r.revision});state('saved');return;
    }
    if(r.revision===current.revision&&equal(remote,current.base||{})){state(dirty(current)?'pending':'saved');return;}
    // Never replace data held in an active learning UI after user interaction.
    if(!dirty(current)&&o.canApplyRemote()){
     o.recovery(current);const device=Object.fromEntries(Object.entries(current.data).filter(([k])=>!S.allowed(k)));
     o.write({...current,data:{...device,...remote},base:remote,revision:r.revision});state('saved');o.reload();return;
    }
    meta.conflict=true;o.saveMeta(meta);stopped=true;state('conflict');
   }
   try{
    if(changed){
     const sent=o.cloudData(p.data);S.validate({schemaVersion:1,data:sent});
     meta.attemptAt=now;o.saveMeta(meta);
     const r=await o.request('POST',{expectedRevision:p.revision,snapshot:{schemaVersion:1,data:sent}});valid();
     if(r.revision!==p.revision+1)throw Error('invalid_revision');
     const current=o.read();
     if(current.revision!==p.revision||!equal(current.base||{},p.base||{}))throw Error('local_revision_changed');
     // Keep answers made while the request was in flight; only advance the acknowledged base.
     o.write({...current,base:sent,revision:r.revision});
     meta.checkedAt=o.now();state(dirty(o.read())?'pending':'saved');
    }else await reconcile();
    meta.failures=0;meta.retryAt=0;o.saveMeta(meta);
   }catch(e){
    if(e.code==='cancelled'){stopped=true;}
    else if(e.status===401){stopped=true;o.expire();state('auth');}
    else if(e.status===409){try{await reconcile();meta.failures=0;meta.retryAt=0;o.saveMeta(meta);}catch(next){if(next.code==='cancelled'){stopped=true;}else if(next.status===401){stopped=true;o.expire();state('auth');}else{meta.failures=(meta.failures||0)+1;meta.retryAt=o.now()+60000;o.saveMeta(meta);state('waiting');}}}
    else if(e.status===400||e.status===413||/invalid_|save_too_large|too_many_keys|unsafe_property|data_too_deep/.test(e.message)){stopped=true;state('error');}
    else{meta.failures=(meta.failures||0)+1;meta.retryAt=o.now()+Math.min(300000,60000*2**Math.min(meta.failures-1,3));o.saveMeta(meta);state('waiting');}
   }finally{running=false;}
  }
  return {run,dirty:()=>dirty(o.read()),get stopped(){return stopped;}};
 }
 root.GOIMONAutosave={create};if(typeof module!=='undefined')module.exports={create};
})(globalThis);
