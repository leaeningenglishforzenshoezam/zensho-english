// Feature-gated request adapter. Intentionally NOT wired into index.js.
import {authenticateSession} from './session.js';
import {issueWordAttempt,submitWordAttempt,claimWordReward,issueIdiomAttempt,submitIdiomAttempt,claimIdiomReward,issueExamAttempt,submitExamAttempt,claimExamReward,claimBasicBonus,issueChallengeAttempt,submitChallengeAttempt,claimChallengeReward} from './mission_rewards.js';
import {applyMissionLearning,readMissionLearning,reviewMissionAttempt} from './mission_learning.js';
import {readEconomy} from './economy_repository.js';
import {syncMissionSnapshot} from './mission_sync.js';
import {applyMissionGrowth} from './mission_growth.js';
import {applyCompanionAction} from './mission_companion.js';
import {readMissionStatus} from './mission_status.js';
const routes=['/api/v1/missions/learning/sync','/api/v1/missions/review','/api/v1/missions/learning','/api/v1/missions/learning/apply','/api/v1/missions/words/start','/api/v1/missions/words/submit','/api/v1/missions/words/claim','/api/v1/economy','/api/v1/missions/idioms/start','/api/v1/missions/idioms/submit','/api/v1/missions/idioms/claim','/api/v1/missions/exam/start','/api/v1/missions/exam/submit','/api/v1/missions/exam/claim','/api/v1/missions/basic-bonus/claim',...['listening','reading','reorder'].flatMap(slot=>['start','submit','claim'].map(action=>'/api/v1/missions/'+slot+'/'+action))];
const json=(value,status=200,headers={})=>new Response(JSON.stringify(value),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers}});
async function body(request,limit=4096){
 if(!request.headers.get('content-type')?.startsWith('application/json'))throw Error('json_required');
 if(Number(request.headers.get('content-length'))>limit)throw Error('request_too_large');
 const reader=request.body?.getReader();if(!reader)throw Error('invalid_json');let bytes=0,parts=[];
 while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>limit){await reader.cancel();throw Error('request_too_large');}parts.push(value);}
 const all=new Uint8Array(bytes);let offset=0;for(const part of parts){all.set(part,offset);offset+=part.byteLength;}
 try{return JSON.parse(new TextDecoder().decode(all));}catch{throw Error('invalid_json');}
}
function exact(o,keys){if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).length!==keys.length||!keys.every(k=>Object.hasOwn(o,k)))throw Error('invalid_request');}
export async function handleMissionDraft(request,env){
 // Tests explicitly opt in against persist:false D1. Nothing is enabled by default.
 if(env.MISSION_REWARDS_TEST_ENABLED!==true)return json({error:'not_found'},404);
 const path=new URL(request.url).pathname,origin=request.headers.get('Origin');
 if(!routes.includes(path)&&!['/api/v1/missions/status','/api/v1/missions/growth/apply','/api/v1/missions/companion/action'].includes(path))return json({error:'not_found'},404);
 if(!origin||origin!==env.ALLOWED_ORIGIN)return json({error:'origin_not_allowed'},403);
 const headers={'access-control-allow-origin':origin,'vary':'Origin'};
 const reply=(v,status=200)=>json(v,status,headers);
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...headers,'access-control-allow-headers':'Authorization, Content-Type','access-control-allow-methods':'GET, POST, OPTIONS'}});
 if((['/api/v1/economy','/api/v1/missions/status','/api/v1/missions/learning'].includes(path)?request.method!=='GET':request.method!=='POST'))return reply({error:'method_not_allowed'},405);
 if(!env.RATE_LIMITER||!env.AUTH_RATE_LIMITER)return reply({error:'rate_limiter_not_configured'},503);
 try{
  if(!(await env.AUTH_RATE_LIMITER.limit({key:'ip:'+(request.headers.get('CF-Connecting-IP')||'unknown')})).success)return reply({error:'rate_limited'},429);
  const {userId}=await authenticateSession(request,env.DB);
  if(!(await env.RATE_LIMITER.limit({key:'user:'+userId})).success)return reply({error:'rate_limited'},429);
  if(path==='/api/v1/missions/learning')return reply(await readMissionLearning(env.DB,userId));
  if(path==='/api/v1/missions/status')return reply(await readMissionStatus(env.DB,userId));
  if(path==='/api/v1/economy')return reply(await readEconomy(env.DB,userId));
  const payload=await body(request,path==='/api/v1/missions/learning/sync'?920000:4096),isIdiom=path.includes('/idioms/'),isExam=path.includes('/exam/'),challenge=path.split('/')[4];
  if(path==='/api/v1/missions/learning/sync'){exact(payload,['operationId','baseRevision','expectedRevision','snapshot']);const result=await syncMissionSnapshot(env.DB,userId,payload);return reply(result,result.conflict?409:200);}
  if(path==='/api/v1/missions/review'){exact(payload,['attemptId']);return reply(await reviewMissionAttempt(env.DB,userId,payload.attemptId));}
  if(path==='/api/v1/missions/learning/apply'){exact(payload,['attemptId','expectedRevision']);return reply(await applyMissionLearning(env.DB,userId,payload.attemptId,payload.expectedRevision));}
  if(path==='/api/v1/missions/growth/apply'){exact(payload,['attemptId','expectedRevision']);return reply(await applyMissionGrowth(env.DB,userId,payload.attemptId,payload.expectedRevision));}
  if(path==='/api/v1/missions/companion/action'){exact(payload,['operationId','expectedRevision','action','targetId']);return reply(await applyCompanionAction(env.DB,userId,payload));}
  if(['listening','reading','reorder'].includes(challenge)){
   if(path.endsWith('/start')){exact(payload,['level']);return reply(await issueChallengeAttempt(env.DB,userId,payload.level,challenge));}
   if(path.endsWith('/submit')){exact(payload,['attemptId','answers']);return reply(await submitChallengeAttempt(env.DB,userId,payload.attemptId,payload.answers,challenge));}
   exact(payload,['attemptId','operationId','expectedRevision']);return reply(await claimChallengeReward(env.DB,userId,payload.attemptId,payload.operationId,payload.expectedRevision,challenge));
  }
  if(path.includes('/basic-bonus/')){exact(payload,['level','date','operationId','expectedRevision']);return reply(await claimBasicBonus(env.DB,userId,payload.level,payload.date,payload.operationId,payload.expectedRevision));}
  if(path.endsWith('/start')){if(isExam){exact(payload,['level','category','variant']);return reply(await issueExamAttempt(env.DB,userId,payload.level,payload.category,payload.variant));}exact(payload,isIdiom||Object.hasOwn(payload||{},'mode')?['level','mode']:['level']);return reply(isIdiom?await issueIdiomAttempt(env.DB,userId,payload.level,payload.mode):await issueWordAttempt(env.DB,userId,payload.level,Date.now(),undefined,Object.hasOwn(payload,'mode')?payload.mode:'enja'));}
  if(path.endsWith('/submit')){exact(payload,['attemptId','answers']);return reply(await (isExam?submitExamAttempt:isIdiom?submitIdiomAttempt:submitWordAttempt)(env.DB,userId,payload.attemptId,payload.answers));}
  exact(payload,['attemptId','operationId','expectedRevision']);return reply(await (isExam?claimExamReward:isIdiom?claimIdiomReward:claimWordReward)(env.DB,userId,payload.attemptId,payload.operationId,payload.expectedRevision));
 }catch(error){
  const name=error.message;
  if(['growth_target_missing','growth_target_mismatch','invalid_growth_record','evolution_not_ready','companion_archive_full'].includes(name))return reply({error:name},409);
  const status=name==='unauthorized'?401:name==='request_too_large'?413:name==='json_required'?415:name==='attempt_not_found'?404:['sync_ack_unavailable','sync_base_unavailable','mission_daily_limit','mission_storage_limit','learning_revision_conflict','economy_revision_conflict','operation_id_reused','attempt_already_submitted','mission_day_conflict'].includes(name)?409:['attempt_not_submitted','invalid_learning_record','invalid_learning_counter','invalid_request','invalid_answers','invalid_operation','invalid_revision','invalid_json','mission_not_supported','mission_not_completed','attempt_expired','unsupported_attempt','invalid_mission_day','basic_missions_not_completed'].includes(name)?400:500;
  return reply({error:status===500?'server_error':name},status);
 }
}
