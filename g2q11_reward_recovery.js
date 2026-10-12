// Durable Q11 reward recovery: no new top-level cloud key is required.
// Pending items live inside the existing 2級 learning log and are processed
// with GoimonUI.addLearningPointsOnce (idempotent claim).
(function (root) {
 'use strict';
 const KEY='zensho_learning_log_v1_lv2', PROP='_q11PendingRewards';
 const storage=()=>root.GOIMONStorage;
 function read(){const raw=storage()?.getItem(KEY);if(!raw)return {};const x=JSON.parse(raw);return x&&typeof x==='object'&&!Array.isArray(x)?x:{};}
 function write(x){storage().setItem(KEY,JSON.stringify(x));}
 function pending(){const log=read();const list=log[PROP];return Array.isArray(list)?list:[];}
 function settle(claimId){
   const log=read(),list=Array.isArray(log[PROP])?log[PROP]:[];
   if(!list.includes(claimId))return;
   log[PROP]=list.filter(x=>x!==claimId);write(log);
 }
 function deliver(claimId){
   if(!root.GoimonUI?.addLearningPointsOnce)return false;
   root.GoimonUI.addLearningPointsOnce(claimId,{kotoba:0.5,bunmyaku:0.5},'q11_grammar');
   // addLearningPointsOnce returning false means already claimed; settling is safe.
   settle(claimId);return true;
 }
 function retry(){
   let done=0;
   for(const id of pending()){
     try{if(deliver(id))done++}catch(e){console.error('[Q11 rewards] retry failed',e);break}
   }
   return done;
 }
 root.G2Q11RewardRecovery={deliver,retry,pending};
})(window);
