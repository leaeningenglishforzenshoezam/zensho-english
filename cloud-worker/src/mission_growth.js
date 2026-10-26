// Draft-only, explicit growth operation. No production import or currency writes.
import {validateSnapshot} from './validation.js';
import {projectMissionLearning} from './mission_learning.js';
import {readingGrowthPlan} from './mission_reading_growth.js';
import {POINT_RULES,MISSION_EXTRA_POINT_RULES,STAGE_ORDER,images,roundPoint,sumStats,calculateLevel,getImageFor,determinePendingEvolution} from './data/mission-growth-rules.js';
const key='zensho_goimon_current_v4_lv1',dexKey='zensho_goimon_dex_discovery_v2_lv1';
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
function read(data,k){try{const value=JSON.parse(data[k]);if(!object(value))throw Error();return value;}catch{throw Error('invalid_growth_record');}}
export function projectMissionGrowth(snapshot,attempt,now=Date.now(),readingClaimed=false){
 // Reuse grade/version/question validation; its learning projection is not saved here.
 projectMissionLearning(snapshot,attempt);
 const categories={words:['quiz_enja','quiz_jaen','audio_quiz'],idioms:['idiom_quiz'],exam:['sentence','paraphrase_quiz'],listening:['listening'],reorder:['reorder'],reading:['q7','dialogue8','q10']};
 if(!categories[attempt.slot]?.includes(attempt.category))throw Error('unsupported_attempt');
 let delta=POINT_RULES[attempt.category]||MISSION_EXTRA_POINT_RULES[attempt.category];
 if(attempt.category==='reorder'){
  if(!['chie','kotoba','onkan','bunmyaku'].includes(attempt.growth_bonus_stat))throw Error('unsupported_attempt');
  delta={chie:0,kotoba:0,onkan:0,bunmyaku:0.5};delta[attempt.growth_bonus_stat]+=1.5;
 }
 let units=attempt.category==='listening'?JSON.parse(attempt.submission_json).length:attempt.score;
 if(typeof attempt.growth_target_id!=='string'||!attempt.growth_target_id)throw Error('growth_target_missing');
 const next=structuredClone(snapshot),data=next.data,g=read(data,key);
 if(g.id!==attempt.growth_target_id)throw Error('growth_target_mismatch');
 if(!STAGE_ORDER.includes(g.stage)||!Object.hasOwn(images,g.type)||!object(g.stats)||
  (g.specialRoute!==undefined&&g.specialRoute!==''&&!['mr_uno','q7_special','q8_special','q10_special'].includes(g.specialRoute)))throw Error('invalid_growth_record');
 for(const stat of ['chie','kotoba','onkan','bunmyaku']){
  const value=g.stats[stat];if(typeof value!=='number'||!Number.isFinite(value)||value<0||value>1e9||roundPoint(value)!==value)throw Error('invalid_growth_record');
 }
 if(g.totalPoints!==sumStats(g.stats)||g.level!==calculateLevel(g.totalPoints))throw Error('invalid_growth_record');
 if(attempt.slot==='reading'){
  const plan=readingGrowthPlan(data,attempt,readingClaimed);delta={bunmyaku:plan.points};units=plan.points>0?1:0;
  if(plan.hidden){
   if(Object.hasOwn(g,'hiddenPoints')&&!object(g.hiddenPoints))throw Error('invalid_growth_record');
   g.hiddenPoints??={dialogue8:0,q10:0};const n=Object.hasOwn(g.hiddenPoints,plan.hidden)?g.hiddenPoints[plan.hidden]:0;
   if(!Number.isSafeInteger(n)||n<0||!Number.isSafeInteger(n+1))throw Error('invalid_growth_record');g.hiddenPoints[plan.hidden]=n+1;
  }
 }
 const discovery=Object.hasOwn(data,dexKey)?read(data,dexKey):{};
 if(!Object.values(discovery).every(v=>typeof v==='boolean'))throw Error('invalid_growth_record');
 // Listening awards completion regardless of correctness, matching listening.js.
 // Other supported modes award correct answers. Never auto-evolve or touch archives.
 if(units>0){
  for(let i=0;i<units;i++)for(const [stat,points]of Object.entries(delta))g.stats[stat]=roundPoint(g.stats[stat]+points);
  g.totalPoints=sumStats(g.stats);g.level=calculateLevel(g.totalPoints);
  determinePendingEvolution(g);g.imageKey=getImageFor(g.type,g.stage);g.updatedAt=now;
  discovery[g.type+':'+g.stage]=true;data[dexKey]=JSON.stringify(discovery);data[key]=JSON.stringify(g);
 }
 validateSnapshot(next);return next;
}
export async function applyMissionGrowth(db,userId,attemptId,expectedRevision){
 if(typeof userId!=='string'||!userId)throw Error('unauthorized');
 if(typeof attemptId!=='string'||!/^[A-Za-z0-9_-]{16,80}$/.test(attemptId))throw Error('invalid_operation');
 if(!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw Error('invalid_revision');
 const receipt=()=>db.prepare('SELECT target_id,applied_revision,awarded_points FROM mission_growth_receipts WHERE user_id=? AND attempt_id=?').bind(userId,attemptId).first();
 const response=(r,replayed)=>({replayed,revision:r.applied_revision,targetId:r.target_id,growthApplied:true,awardedPoints:r.awarded_points});
 const old=await receipt();if(old)return response(old,true);
 const attempt=await db.prepare('SELECT * FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind(userId,attemptId).first();
 if(!attempt)throw Error('attempt_not_found');if(attempt.submission_json===null)throw Error('attempt_not_submitted');
 const current=await db.prepare('SELECT revision,save_json FROM saves WHERE user_id=?').bind(userId).first();
 if((current?.revision||0)!==expectedRevision)throw Error('learning_revision_conflict');
 const readingSet=attempt.slot==='reading'&&['dialogue8','q10'].includes(attempt.category)&&attempt.score===5?String(JSON.parse(attempt.private_json).setId??''):null;
 const claimed=readingSet?await db.prepare('SELECT 1 AS present FROM mission_reading_growth_claims WHERE user_id=? AND level=? AND category=? AND set_id=?').bind(userId,attempt.level,attempt.category,readingSet).first():null;
 const snapshot=current?JSON.parse(current.save_json):{schemaVersion:1,data:{}},next=projectMissionGrowth(snapshot,attempt,Date.now(),!!claimed),json=validateSnapshot(next);
 const points=roundPoint(JSON.parse(next.data[key]).totalPoints-JSON.parse(snapshot.data[key]).totalPoints);
 try{await db.batch([
  db.prepare('INSERT INTO mission_growth_receipts(user_id,attempt_id,target_id,applied_revision,awarded_points) VALUES (?,?,?,?,?)').bind(userId,attemptId,attempt.growth_target_id,expectedRevision+1,points),
  ...(readingSet&&!claimed?[db.prepare('INSERT INTO mission_reading_growth_claims(user_id,level,category,set_id,attempt_id) VALUES (?,?,?,?,?)').bind(userId,attempt.level,attempt.category,readingSet,attemptId)]:[]),
  db.prepare('INSERT OR IGNORE INTO save_revisions(user_id,revision,schema_version,save_json) SELECT user_id,revision,schema_version,save_json FROM saves WHERE user_id=?').bind(userId),
  db.prepare("UPDATE saves SET revision=?,save_json=?,updated_at=datetime('now') WHERE user_id=?").bind(expectedRevision+1,json,userId)
 ]);}catch(error){const saved=await receipt();if(saved)return response(saved,true);const latest=await db.prepare('SELECT revision FROM saves WHERE user_id=?').bind(userId).first();if((latest?.revision||0)!==expectedRevision)throw Error('learning_revision_conflict');throw error;}
 return response({applied_revision:expectedRevision+1,target_id:attempt.growth_target_id,awarded_points:points},false);
}
