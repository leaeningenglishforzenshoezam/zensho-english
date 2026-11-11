export class MissionFlow {
 constructor(client,checkpoint=null){this.client=client;this.checkpoint=checkpoint;this.busy=false;this.pending=null;this.answers=[];const saved=checkpoint?.read();if(saved){this.attempt=saved.attempt;this.pending=saved.pending;this.answers=saved.answers;this.result=saved.result;}}
 save(){this.checkpoint?.write({attempt:this.attempt||null,pending:this.pending,answers:this.answers,result:this.result||null});}
 reset(){
  if(this.busy)throw Error('request_pending');
  const cleared={attempt:null,pending:null,answers:[],result:null};
  if(this.checkpoint)this.checkpoint.reset(cleared);
  this.attempt=null;this.pending=null;this.answers=[];this.result=null;
 }
 saveAnswers(answers){if(this.pending||this.result)return;this.answers=structuredClone(answers);this.save();}
 async request(path,body){this.save();return this.client.request(path,body);}
 async locked(fn){if(this.busy)throw Error('request_pending');this.busy=true;try{return await fn();}finally{this.busy=false;this.save();}}
 async start(slot,settings){return this.locked(async()=>{
  if(this.pending)throw Error('finish_retry_required');
  this.save();await this.client.prepare();this.attempt=await this.request(`missions/${slot}/start`,settings);this.answers=Array(this.attempt.questions.length).fill(null);this.result=null;return this.attempt;
 });}
 async finish(answers){return this.locked(async()=>{
  if(!this.attempt)throw Error('attempt_required');
  if(this.result)return this.result;
  if(!this.pending){this.answers=structuredClone(answers);this.pending={answers:structuredClone(answers),operationId:crypto.randomUUID()};}
  const p=this.pending,a=this.attempt;
  if(!p.grade)p.grade=await this.request(`missions/${a.slot}/submit`,{attemptId:a.attemptId,answers:p.answers});
  if(!p.learning){
   if(!p.learningRequest){const s=await this.request('missions/learning');p.learningRequest={attemptId:a.attemptId,expectedRevision:s.revision};}
   try{p.learning=await this.request('missions/learning/apply',p.learningRequest);}catch(e){if(e.status===409&&e.message==='learning_revision_conflict')p.learningRequest=null;throw e;}
  }
  if(!p.growth){
   if(!p.growthRequest){const s=await this.request('missions/learning');p.growthRequest={attemptId:a.attemptId,expectedRevision:s.revision};}
   try{p.growth=await this.request('missions/growth/apply',p.growthRequest);}
   catch(e){if(e.message==='growth_target_missing')p.growth={growthApplied:false,awardedPoints:0};else{if(e.status===409&&e.message==='learning_revision_conflict')p.growthRequest=null;throw e;}}
  }
  if(p.grade.completed&&!p.reward){
   if(!p.rewardRequest){const e=await this.request('economy');p.rewardRequest={attemptId:a.attemptId,operationId:p.operationId,expectedRevision:e.revision};}
   try{p.reward=await this.request(`missions/${a.slot}/claim`,p.rewardRequest);}catch(e){if(e.message==='economy_revision_conflict')p.rewardRequest=null;throw e;}
  }
  if(p.grade.completed&&a.level==='1'&&!p.bonusChecked){
   if(!p.bonusRequest){const e=await this.request('economy');p.bonusRequest={level:a.level,date:a.date,operationId:crypto.randomUUID(),expectedRevision:e.revision};}
   try{p.bonus=await this.request('missions/basic-bonus/claim',p.bonusRequest);p.bonusChecked=true;}
   catch(e){if(e.message==='basic_missions_not_completed')p.bonusChecked=true;else{if(e.message==='economy_revision_conflict')p.bonusRequest=null;throw e;}}
  }
  await this.client.finish();const balance=await this.request('economy');
  this.result={grade:p.grade,growth:p.growth,reward:p.reward||null,bonus:p.bonus||null,balance:balance.state.shards};this.pending=null;return this.result;
 });}
}
