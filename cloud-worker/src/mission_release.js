// Candidate entry point only. No deployment config points here yet.
import worker from './index.js';
import {handleMissionDraft} from './mission_api.js';
const publicRoutes=new Set(['/api/v1/economy',...['status','learning','learning/apply','growth/apply','review','basic-bonus/claim'].map(p=>'/api/v1/missions/'+p),...['words','idioms','exam','listening','reading','reorder'].flatMap(slot=>['start','submit','claim'].map(action=>`/api/v1/missions/${slot}/${action}`))]);
export default {
 scheduled:worker.scheduled,
 async fetch(request,env,ctx){
  const path=new URL(request.url).pathname;
  if(env.MISSION_RELEASE_ENABLED==='true'&&publicRoutes.has(path)){
   return handleMissionDraft(request,{...env,MISSION_REWARDS_TEST_ENABLED:true});
  }
  return worker.fetch(request,env,ctx);
 }
};
