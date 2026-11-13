// Connected candidate entry point; enabled only by the release configuration.
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
  const loadoutEnabled=['/api/v1/economy/loadouts','/api/v1/economy/loadouts/save','/api/v1/economy/loadouts/import'].includes(path)&&env.ECONOMY_LOADOUTS_ENABLED==='true';
  const bonusEnabled=['/api/v1/economy/bonus','/api/v1/economy/bonus/claim'].includes(path)&&env.ECONOMY_BONUS_ENABLED==='true';
  // Gift endpoints stay unreachable until the Worker is explicitly released with this flag.
  const giftEnabled=['/api/v1/economy/gift','/api/v1/economy/gift/claim','/api/v1/economy/gift/tutorial-gear/claim'].includes(path)&&env.ECONOMY_GIFT_ENABLED==='true';
  if(env.MISSION_RELEASE_ENABLED==='true'&&(publicRoutes.has(path)||drawEnabled||importEnabled||autoImportEnabled||loadoutEnabled||bonusEnabled||giftEnabled)){
   return handleMissionDraft(request,{...env,MISSION_REWARDS_TEST_ENABLED:true});
  }
  const connected=env.MISSION_RELEASE_ENABLED==='true'&&['ECONOMY_DRAW_ENABLED','ECONOMY_IMPORT_ENABLED','ECONOMY_AUTO_IMPORT_ENABLED','ECONOMY_LOADOUTS_ENABLED','ECONOMY_BONUS_ENABLED'].every(k=>env[k]==='true');
  return worker.fetch(request,{...env,CONNECTED_MISSION_RELEASE:connected,CONNECTED_TUTORIAL_GIFTS:connected&&env.ECONOMY_GIFT_ENABLED==='true'},ctx);
 }
};
