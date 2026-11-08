// Device-local recovery only. Server grading and receipts remain authoritative.
export function createMissionCheckpoint({storage,account,apiBase,activeAccount,isWriter}){
 if(!account||!apiBase)throw Error('mission_login_required');
 const key='goimon_mission_checkpoint_v1:'+encodeURIComponent(apiBase)+':'+encodeURIComponent(account);
 let observed;
 const scope=()=>{if(activeAccount()!==account||!isWriter())throw Error('mission_account_changed');};
 function validate(s){
  if(!s||s.version!==1||s.account!==account||s.apiBase!==apiBase||!Array.isArray(s.answers))throw Error('mission_checkpoint_invalid');
  const a=s.attempt;
  if(a&&(!['1','2'].includes(a.level)||typeof a.attemptId!=='string'||!['words','idioms','exam','listening','reading','reorder'].includes(a.slot)||!Array.isArray(a.questions)||a.questions.length>20||a.questions.length<1||s.answers.length!==a.questions.length))throw Error('mission_checkpoint_invalid');
  if(s.pending&&(!a||!Array.isArray(s.pending.answers)||s.pending.answers.length!==a.questions.length||!/^[A-Za-z0-9_-]{16,80}$/.test(s.pending.operationId||'')))throw Error('mission_checkpoint_invalid');
  return s;
 }
 return {
  read(){scope();observed=storage.getItem(key);if(observed===null)return null;if(observed.length>600000)throw Error('mission_checkpoint_invalid');try{return validate(JSON.parse(observed));}catch{throw Error('mission_checkpoint_invalid');}},
  write(value){scope();if(observed===undefined)throw Error('mission_checkpoint_not_loaded');if(storage.getItem(key)!==observed)throw Error('mission_checkpoint_conflict');
   const next=JSON.stringify(validate({...value,version:1,account,apiBase}));if(next.length>600000)throw Error('mission_checkpoint_invalid');
   storage.setItem(key,next);if(storage.getItem(key)!==next)throw Error('mission_checkpoint_failed');observed=next;
  }
 };
}
