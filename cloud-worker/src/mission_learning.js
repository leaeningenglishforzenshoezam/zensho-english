// Isolated draft only. Learning records are independent of spendable rewards.
import words from './data/mission-words.json' with {type:'json'};
import words2 from './data/mission-words-2kyu.json' with {type:'json'};
import {validateSnapshot} from './validation.js';
import rules from '../../daily-missions/daily_mission_rules.js';
const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
export async function readMissionLearning(db,userId){
 const row=await db.prepare('SELECT revision,save_json FROM saves WHERE user_id=?').bind(userId).first();
 return {revision:row?.revision||0,snapshot:row?JSON.parse(row.save_json):{schemaVersion:1,data:{}}};
}
export async function reviewMissionAttempt(db,userId,attemptId){
 if(typeof attemptId!=='string'||!/^[A-Za-z0-9_-]{16,80}$/.test(attemptId))throw Error('invalid_operation');
 const row=await db.prepare('SELECT * FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind(userId,attemptId).first();
 if(!row)throw Error('attempt_not_found');if(row.submission_json===null)throw Error('attempt_not_submitted');
 const p=JSON.parse(row.private_json),answers=JSON.parse(row.submission_json);
 return {attemptId,category:row.category,date:row.mission_day,correct:row.score,total:p.questions.length,completed:!!row.completed,
  questions:p.questions.map((q,i)=>({id:q.id,prompt:q.prompt||q.stemBefore||'',selected:answers[i],answer:q.answer,correct:JSON.stringify(answers[i])===JSON.stringify(q.answer),...(q.chunks?{chunks:q.chunks,stemAfter:q.stemAfter}:{choices:q.choices})}))};
}
function record(x){if(!object(x))throw Error('invalid_learning_record');return x;}
function child(x,key){if(!Object.hasOwn(x,key))x[key]={};return record(x[key]);}
function increment(x,key,n){const value=Object.hasOwn(x,key)?x[key]:0;if(!Number.isSafeInteger(value)||value<0||!Number.isSafeInteger(value+n))throw Error('invalid_learning_counter');x[key]=value+n;}
function read(data,key){if(!Object.hasOwn(data,key))return {};try{return record(JSON.parse(data[key]));}catch{throw Error('invalid_learning_record');}}
export function projectMissionLearning(snapshot,attempt){
 validateSnapshot(snapshot);const next=structuredClone(snapshot),data=next.data;
 if(!['1','2'].includes(attempt.level)||attempt.submission_json===null||!Number.isInteger(attempt.score))throw Error('attempt_not_submitted');
 // Grade 2 projection preparation only: issuing/claiming grade 2 attempts remains
 // disabled until schema, reward rules and player routes are ready together.
 if(attempt.level==='2'&&!(attempt.slot==='words'&&['quiz_enja','quiz_jaen','audio_quiz'].includes(attempt.category)||attempt.slot==='exam'&&attempt.category==='sentence'))throw Error('unsupported_attempt');
 const level=attempt.level,bank=level==='2'?words2:words;
 const p=JSON.parse(attempt.private_json),answers=JSON.parse(attempt.submission_json);
 if(p.rulesVersion!==rules.version)throw Error('unsupported_attempt');
 if(!Array.isArray(answers)||answers.length!==p.questions.length)throw Error('invalid_learning_record');
 const correct=p.questions.map((q,i)=>JSON.stringify(q.answer)===JSON.stringify(answers[i]));
 if(correct.filter(Boolean).length!==attempt.score)throw Error('invalid_learning_record');
 const key='zensho_learning_log_v1_lv'+level,log=read(data,key),day=child(log,attempt.mission_day),slot=child(day,attempt.category);
 increment(slot,'attempt',answers.length);increment(slot,'correct',attempt.score);increment(slot,'wrong',answers.length-attempt.score);data[key]=JSON.stringify(log);
 if(attempt.slot==='words'){
  const mode={quiz_enja:'enja',quiz_jaen:'jaen',audio_quiz:'audio'}[attempt.category];if(!mode)throw Error('unsupported_attempt');
  const weakKey={enja:'zensho_quiz_weak_points_enja_v2_lv',jaen:'zensho_quiz_weak_points_jaen_v3_lv',audio:'zensho_audio_quiz_weak_v1_lv'}[mode]+level;
  const globalKey='zensho_block_global_lv'+level+'_v1',weak=read(data,weakKey),global=read(data,globalKey),byBlock=child(global,'byBlock');
  const statsKey=(mode==='jaen'?'zensho_block_stats_jaen_v2_lv':'zensho_block_stats_enja_v1_lv')+level,stats=mode==='audio'?null:read(data,statsKey);
  const fields={enja:['quizAttempted','quizCorrect'],jaen:['quizAttemptedJaEn','quizCorrectJaEn'],audio:['audioAttempted','audioCorrect']}[mode];
  p.questions.forEach((q,i)=>{
   if(!Number.isInteger(q.id)||q.id<1||q.id>bank.length)throw Error('invalid_learning_record');
   // Both existing grade-specific block definitions use groups of 50 words.
   const block=String(Math.floor((q.id-1)/50)+1),word=bank[q.id-1].en,key=mode==='audio'?word.trim().toLowerCase():word;
   const old=Object.hasOwn(weak,key)?weak[key]:0;if(!Number.isSafeInteger(old)||old<0)throw Error('invalid_learning_counter');
   const value=correct[i]?Math.max(0,old-1):old+1;if(!Number.isSafeInteger(value))throw Error('invalid_learning_counter');if(value)weak[key]=value;else delete weak[key];
   const g=child(byBlock,block);increment(g,fields[0],1);increment(g,fields[1],correct[i]?1:0);
   if(stats){const b=child(stats,block);increment(b,'attempted',1);increment(b,'correct',correct[i]?1:0);}
  });
  data[weakKey]=JSON.stringify(weak);data[globalKey]=JSON.stringify(global);if(stats)data[statsKey]=JSON.stringify(stats);
 }
 validateSnapshot(next);return next;
}
export async function applyMissionLearning(db,userId,attemptId,expectedRevision){
 if(typeof userId!=='string'||!userId)throw Error('unauthorized');
 if(typeof attemptId!=='string'||!/^[A-Za-z0-9_-]{16,80}$/.test(attemptId))throw Error('invalid_operation');
 if(!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw Error('invalid_revision');
 const receipt=()=>db.prepare('SELECT applied_revision FROM mission_learning_receipts WHERE user_id=? AND attempt_id=?').bind(userId,attemptId).first();
 const old=await receipt();if(old)return {replayed:true,revision:old.applied_revision,growthApplied:false};
 const attempt=await db.prepare('SELECT * FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind(userId,attemptId).first();
 if(!attempt)throw Error('attempt_not_found');if(attempt.submission_json===null)throw Error('attempt_not_submitted');
 const current=await db.prepare('SELECT revision,save_json FROM saves WHERE user_id=?').bind(userId).first();
 if((current?.revision||0)!==expectedRevision)throw Error('learning_revision_conflict');
 const next=projectMissionLearning(current?JSON.parse(current.save_json):{schemaVersion:1,data:{}},attempt),json=validateSnapshot(next);
 try{await db.batch([
  db.prepare('INSERT INTO mission_learning_receipts(user_id,attempt_id,applied_revision) VALUES (?,?,?)').bind(userId,attemptId,expectedRevision+1),
  db.prepare('INSERT OR IGNORE INTO save_revisions(user_id,revision,schema_version,save_json) SELECT user_id,revision,schema_version,save_json FROM saves WHERE user_id=?').bind(userId),
  db.prepare("INSERT INTO saves(user_id,revision,schema_version,save_json) VALUES (?,?,1,?) ON CONFLICT(user_id) DO UPDATE SET revision=excluded.revision,save_json=excluded.save_json,updated_at=datetime('now')").bind(userId,expectedRevision+1,json)
 ]);}catch(error){const saved=await receipt();if(saved)return {replayed:true,revision:saved.applied_revision,growthApplied:false};const latest=await db.prepare('SELECT revision FROM saves WHERE user_id=?').bind(userId).first();if((latest?.revision||0)!==expectedRevision)throw Error('learning_revision_conflict');throw error;}
 return {replayed:false,revision:expectedRevision+1,growthApplied:false};
}
