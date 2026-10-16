export class MissionFlow {
 constructor(client){this.client=client;this.busy=false;this.pending=null;}
 async locked(fn){if(this.busy)throw Error('request_pending');this.busy=true;try{return await fn();}finally{this.busy=false;}}
 async start(slot,settings){return this.locked(async()=>{
  if(this.pending)throw Error('finish_retry_required');
  await this.client.prepare();this.attempt=await this.client.request(`missions/${slot}/start`,settings);this.result=null;return this.attempt;
 });}
 async finish(answers){return this.locked(async()=>{
  if(!this.attempt)throw Error('attempt_required');
  if(!this.pending)this.pending={answers:structuredClone(answers),operationId:crypto.randomUUID()};
  const p=this.pending,a=this.attempt;
  if(!p.grade)p.grade=await this.client.request(`missions/${a.slot}/submit`,{attemptId:a.attemptId,answers:p.answers});
  if(!p.learning){const s=await this.client.request('missions/learning');p.learning=await this.client.request('missions/learning/apply',{attemptId:a.attemptId,expectedRevision:s.revision});}
  if(!p.growth){
   if(!p.growthRequest){const s=await this.client.request('missions/learning');p.growthRequest={attemptId:a.attemptId,expectedRevision:s.revision};}
   try{p.growth=await this.client.request('missions/growth/apply',p.growthRequest);}
   catch(e){if(e.message==='growth_target_missing')p.growth={growthApplied:false,awardedPoints:0};else{if(e.status===409&&e.message==='learning_revision_conflict')p.growthRequest=null;throw e;}}
  }
  if(p.grade.completed&&!p.reward){
   if(!p.rewardRequest){const e=await this.client.request('economy');p.rewardRequest={attemptId:a.attemptId,operationId:p.operationId,expectedRevision:e.revision};}
   try{p.reward=await this.client.request(`missions/${a.slot}/claim`,p.rewardRequest);}catch(e){if(e.message==='economy_revision_conflict')p.rewardRequest=null;throw e;}
  }
  if(p.grade.completed&&!p.bonusChecked){
   if(!p.bonusRequest){const e=await this.client.request('economy');p.bonusRequest={level:a.level,date:a.date,operationId:crypto.randomUUID(),expectedRevision:e.revision};}
   try{p.bonus=await this.client.request('missions/basic-bonus/claim',p.bonusRequest);p.bonusChecked=true;}
   catch(e){if(e.message==='basic_missions_not_completed')p.bonusChecked=true;else{if(e.message==='economy_revision_conflict')p.bonusRequest=null;throw e;}}
  }
  await this.client.finish();const balance=await this.client.request('economy');
  this.result={grade:p.grade,growth:p.growth,reward:p.reward||null,bonus:p.bonus||null,balance:balance.state.shards};this.pending=null;return this.result;
 });}
}
