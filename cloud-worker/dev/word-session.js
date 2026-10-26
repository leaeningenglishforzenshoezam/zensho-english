// Caller supplies isolated transport and optional tab-scoped checkpoint storage.
const fields=['attempt','answers','index','result','submitted','claimed','operationId','growthResult','growthPending','companionPending','claimPending','learningSaved'];
export class WordSession {
 constructor(request,mode,checkpoint=null){if(!['enja','jaen','audio'].includes(mode))throw Error('invalid_mode');this.request=request;this.mode=mode;this.attempt=null;this.pending=false;this.checkpoint=checkpoint;
  const saved=checkpoint?.load();
  if(saved){if(saved.version!==1||saved.mode!==mode||!saved.state||saved.state.attempt&&(saved.state.attempt.mode!==mode||saved.state.attempt.questions?.length!==20||saved.state.answers?.length!==20||!Number.isInteger(saved.state.index)||saved.state.index<0||saved.state.index>19))throw Error('invalid_checkpoint');for(const key of fields)if(Object.hasOwn(saved.state,key))this[key]=saved.state[key];}
 }
 persist(){if(this.checkpoint)this.checkpoint.save({version:1,mode:this.mode,state:Object.fromEntries(fields.filter(k=>this[k]!==undefined).map(k=>[k,this[k]]))});}
 async locked(work){if(this.pending)throw Error('request_pending');this.persist();this.pending=true;try{return await work();}finally{this.pending=false;this.persist();}}
 async start(){return this.locked(async()=>{if(this.submitted&&!this.result)throw Error('submit_retry_required');if(this.claimPending)throw Error('claim_retry_required');if(this.growthPending)throw Error('growth_retry_required');if(this.companionPending)throw Error('companion_retry_required');const a=await this.request('missions/words/start',{level:'1',mode:this.mode});if(a.mode!==this.mode||a.questions?.length!==20)throw Error('invalid_server_attempt');this.attempt=a;this.answers=Array(20).fill(null);this.index=0;this.result=null;this.submitted=false;this.claimed=false;this.learningSaved=false;this.growthResult=null;this.operationId=crypto.randomUUID();return a;});}
 choose(choice){if(this.pending||!this.attempt||this.submitted||this.result)throw Error('session_locked');if(!Number.isInteger(choice)||choice<0||choice>=this.attempt.questions[this.index].choices.length)throw Error('invalid_choice');this.answers[this.index]=choice;this.persist();}
 next(){if(this.pending||this.submitted||this.result||!this.attempt)throw Error('session_locked');if(this.answers[this.index]===null)throw Error('answer_required');if(this.index===19)throw Error('last_question');this.index++;this.persist();}
 async submit(){return this.locked(async()=>{if(!this.attempt||this.answers.some(x=>x===null))throw Error('answer_required');if(this.result)return this.result;
 // Freeze answers before the request: a lost response must retry the identical submission.
 this.submitted=true;this.persist();this.result=await this.request('missions/words/submit',{attemptId:this.attempt.attemptId,answers:[...this.answers]});return this.result;});}
 async claim(){return this.locked(async()=>{if(!this.result?.completed)throw Error('mission_not_completed');if(!this.claimPending){const state=await this.request('economy');this.claimPending={attemptId:this.attempt.attemptId,operationId:this.operationId,expectedRevision:state.revision};}this.persist();try{const result=await this.request('missions/words/claim',{...this.claimPending});this.claimed=true;this.claimPending=null;return result;}catch(error){if(error.status>=400&&error.status<500&&!['operation_id_reused','sync_ack_unavailable'].includes(error.message))this.claimPending=null;throw error;}});}
 async saveLearning(){return this.locked(async()=>{if(!this.result)throw Error('attempt_not_submitted');const state=await this.request('missions/learning');const result=await this.request('missions/learning/apply',{attemptId:this.attempt.attemptId,expectedRevision:state.revision});this.learningSaved=true;return result;});}
 async review(){return this.locked(async()=>{if(!this.result)throw Error('attempt_not_submitted');return this.request('missions/review',{attemptId:this.attempt.attemptId});});}
 async readGrowth(){return this.locked(()=>this.request('missions/learning'));}
 async companionAction(action,displayedState){return this.locked(async()=>{
  if(this.growthPending)throw Error('growth_retry_required');
  if(!['evolve','new-generation'].includes(action))throw Error('invalid_request');
  if(this.companionPending&&this.companionPending.action!==action)throw Error('companion_retry_required');
  if(!this.companionPending){
   const pet=JSON.parse(displayedState?.snapshot?.data?.zensho_goimon_current_v4_lv1||'null');
   if(!pet?.id||!Number.isSafeInteger(displayedState.revision))throw Error('growth_target_missing');
   this.companionPending={operationId:crypto.randomUUID(),expectedRevision:displayedState.revision,action,targetId:pet.id};
  }
  this.persist();
  try{const result=await this.request('missions/companion/action',{...this.companionPending});this.companionPending=null;return result;}
  catch(error){if(error.status>=400&&error.status<500&&!['sync_ack_unavailable','operation_id_reused'].includes(error.message))this.companionPending=null;throw error;}
 });}
 async saveGrowth(){return this.locked(async()=>{
  if(this.companionPending)throw Error('companion_retry_required');
  if(!this.result)throw Error('attempt_not_submitted');
  if(!this.growthResult){
   if(!this.growthPending){const state=await this.request('missions/learning');this.growthPending={attemptId:this.attempt.attemptId,expectedRevision:state.revision};}
   this.persist();
   try{this.growthResult=await this.request('missions/growth/apply',{...this.growthPending});this.growthPending=null;}
   catch(error){
    // Definite rejection: a later retry may refresh revision. Ambiguous network
    // or server failures retain exactly the original request and pinned target.
    if(error.status>=400&&error.status<500)this.growthPending=null;
    throw error;
   }
  }
  return {result:this.growthResult,state:await this.request('missions/learning')};
 });}
}
