// Candidate entry point only. No deployment config points here yet.
import worker from './index.js';
import {handleMissionDraft} from './mission_api.js';
const publicRoutes=new Set(['/api/v1/economy',...['status','learning','learning/apply','growth/apply','review','basic-bonus/claim'].map(p=>'/api/v1/missions/'+p),...['words','idioms','exam','listening','reading','reorder'].flatMap(slot=>['start','submit','claim'].map(action=>`/api/v1/missions/${slot}/${action}`))]);
export default {
 scheduled:worker.scheduled,
 async fetch(request,env,ctx){
  const path=new URL(request.url).pathname;
  const drawEnabled=path==='/api/v1/economy/draw'&&env.ECONOMY_DRAW_ENABLED==='true';
  const importEnabled=['/api/v1/economy/import/stage','/api/v1/economy/import/apply'].includes(path)&&env.ECONOMY_IMPORT_ENABLED==='true';
  const autoImportEnabled=path==='/api/v1/economy/import/auto'&&env.ECONOMY_IMPORT_ENABLED==='true'&&env.ECONOMY_AUTO_IMPORT_ENABLED==='true';
  const loadoutEnabled=['/api/v1/economy/loadouts','/api/v1/economy/loadouts/save'].includes(path)&&env.ECONOMY_LOADOUTS_ENABLED==='true';
  if(env.MISSION_RELEASE_ENABLED==='true'&&(publicRoutes.has(path)||drawEnabled||importEnabled||autoImportEnabled||loadoutEnabled)){
   return handleMissionDraft(request,{...env,MISSION_REWARDS_TEST_ENABLED:true});
  }
  return worker.fetch(request,env,ctx);
 }
};
