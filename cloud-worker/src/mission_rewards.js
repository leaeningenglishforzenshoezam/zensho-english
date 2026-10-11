// Internal draft only: no Worker route or client connection.
import rules from '../../daily-missions/daily_mission_rules.js';
import bank from './data/mission-words.json' with {type:'json'};
import idioms from './data/mission-idioms.json' with {type:'json'};
import sentenceA from './data/mission-sentenceA.json' with {type:'json'};
import sentenceB from './data/mission-sentenceB.json' with {type:'json'};
import paraphrase from './data/mission-paraphrase.json' with {type:'json'};
import {emptyEconomy,validateState,secureRandom} from './economy.js';
import {readEconomy} from './economy_repository.js';
const DAY=86400000,token=/^[A-Za-z0-9_-]{16,80}$/;
function identity(userId){if(typeof userId!=='string'||!userId)throw Error('unauthorized');}
function validId(id){if(typeof id!=='string'||!token.test(id))throw Error('invalid_operation');}
function time(now){if(!Number.isSafeInteger(now)||now<0)throw Error('invalid_time');}
export function jstDay(now){time(now);return new Date(now+9*3600000).toISOString().slice(0,10);}
function pickIndex(length,rng){const r=rng();if(!Number.isFinite(r)||r<0||r>=1)throw Error('invalid_random');return Math.floor(r*length);}
function shuffle(xs,rng){for(let i=xs.length-1;i>0;i--){const j=pickIndex(i+1,rng);[xs[i],xs[j]]=[xs[j],xs[i]];}return xs;}
function range(first,day){const days=Math.floor((Date.parse(day)-Date.parse(first))/DAY),blocks=Math.ceil(bank.length/20);if(days<0)throw Error('invalid_first_day');const start=Math.min((days%blocks)*20,bank.length-20);return {rangeStart:start+1,rangeEnd:start+20};}
function publicAttempt(row){const p=JSON.parse(row.private_json);return {attemptId:row.attempt_id,level:row.level,date:row.mission_day,slot:row.slot,category:row.category,...(p.mode?{mode:p.mode}:{}),...(p.variant?{variant:p.variant}:{}),expiresAt:row.expires_at,rangeStart:p.rangeStart,rangeEnd:p.rangeEnd,questions:p.questions.map(({id,prompt,choices})=>({id,prompt,choices}))};}
async function find(db,userId,id){return db.prepare('SELECT * FROM mission_attempts WHERE user_id=? AND attempt_id=?').bind(userId,id).first();}
export async function issueWordAttempt(db,userId,level='1',now=Date.now(),rng=secureRandom){
 identity(userId);if(level!=='1')throw Error('mission_not_supported');const day=jstDay(now);
 // First day is assigned by the server. Local learning dates are never imported automatically.
 await db.prepare('INSERT INTO mission_word_starts(user_id,level,first_day) VALUES (?,?,?) ON CONFLICT(user_id,level) DO NOTHING').bind(userId,level,day).run();
 const first=await db.prepare('SELECT first_day FROM mission_word_starts WHERE user_id=? AND level=?').bind(userId,level).first();
 const r=range(first.first_day,day),questions=[];
 for(let n=r.rangeStart;n<=r.rangeEnd;n++){
  const word=bank[n-1],pool=shuffle([...new Set(bank.map(w=>w.ja))].filter(x=>x!==word.ja),rng);
  const choices=shuffle([word.ja,...pool.slice(0,3)],rng);
  questions.push({id:n,prompt:word.en,choices,answer:choices.indexOf(word.ja)});
 }
 const id=crypto.randomUUID(),endOfDay=Date.parse(day+'T00:00:00+09:00')+DAY;
 const expiry=Math.min(now+2*3600000,endOfDay);
 await db.prepare('INSERT INTO mission_attempts(user_id,attempt_id,level,mission_day,slot,category,private_json,expires_at) VALUES (?,?,?,?,?,?,?,?)').bind(userId,id,level,day,'words','quiz_enja',JSON.stringify({...r,questions,rulesVersion:rules.version}),expiry).run();
 return publicAttempt(await find(db,userId,id));
}
async function submitMissionAttempt(db,userId,attemptId,answers,now,slot){
 identity(userId);validId(attemptId);time(now);const row=await find(db,userId,attemptId);if(!row)throw Error('attempt_not_found');
 if(row.slot!==slot||row.level!=='1'||!rules.missionSlots.find(s=>s.slot===slot).candidates.some(c=>c.category===row.category))throw Error('unsupported_attempt');
 const p=JSON.parse(row.private_json),candidate=rules.missionSlots.find(s=>s.slot===slot).candidates.find(c=>c.category===row.category),count=candidate.count;
 if(!Array.isArray(answers)||answers.length!==count||Array.from(answers).some(a=>!Number.isInteger(a)||a<0||a>3))throw Error('invalid_answers');
 const json=JSON.stringify(answers);
 if(row.submission_json!==null){if(row.submission_json!==json)throw Error('attempt_already_submitted');return {correct:row.score,total:count,completed:!!row.completed,replayed:true};}
 if(now>=row.expires_at||jstDay(now)!==row.mission_day)throw Error('attempt_expired');
 if(p.rulesVersion!==rules.version||p.questions.length!==count)throw Error('unsupported_attempt');
 const correct=answers.reduce((n,a,i)=>n+(a===p.questions[i].answer?1:0),0);
 const required=candidate.required;
 const done=correct>=required;
 const update=await db.prepare('UPDATE mission_attempts SET submission_json=?,score=?,completed=? WHERE user_id=? AND attempt_id=? AND submission_json IS NULL').bind(json,correct,done?1:0,userId,attemptId).run();
 const saved=await find(db,userId,attemptId);if(saved.submission_json!==json)throw Error('attempt_already_submitted');
 return {correct:saved.score,total:count,completed:!!saved.completed,replayed:update.meta.changes===0};
}
async function rewardReceipt(db,userId,id){return db.prepare('SELECT * FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,id).first();}
function replay(row,json){if(row.request_json!==json)throw Error('operation_id_reused');return {replayed:true,revision:row.expected_revision+1,result:JSON.parse(row.result_json)};}
async function claimMissionReward(db,userId,attemptId,operationId,expectedRevision,now,slot){
 identity(userId);validId(attemptId);validId(operationId);time(now);if(!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw Error('invalid_revision');
 const attempt=await find(db,userId,attemptId);if(!attempt||attempt.completed!==1||attempt.submission_json===null)throw Error('mission_not_completed');
 if(attempt.level!=='1'||attempt.slot!==slot||!rules.missionSlots.find(s=>s.slot===slot).candidates.some(c=>c.category===attempt.category)||JSON.parse(attempt.private_json).rulesVersion!==rules.version)throw Error('unsupported_attempt');
 return commitReward(db,userId,attempt.level,attempt.mission_day,slot,attemptId,operationId,expectedRevision,rules.missionSlots.find(s=>s.slot===slot).rewardStars);
}
async function commitReward(db,userId,level,day,slot,attemptId,operationId,expectedRevision,stars){
 const json=JSON.stringify({type:'mission_reward',level:level,day:day,slot});
 const old=await rewardReceipt(db,userId,operationId);if(old)return replay(old,json);
 async function claimed(){const c=await db.prepare('SELECT operation_id FROM mission_reward_claims WHERE user_id=? AND level=? AND mission_day=? AND slot=?').bind(userId,level,day,slot).first();return c?await rewardReceipt(db,userId,c.operation_id):null;}
 const prior=await claimed();if(prior)return replay(prior,json);
 // A server-scored completed attempt may be claimed after midnight, using its original day.
 const current=await readEconomy(db,userId);if(current.revision!==expectedRevision)throw Error('economy_revision_conflict');
 const next=structuredClone(current.state);next.shards+=stars;validateState(next);
 const result={type:'mission_reward',level,date:day,slot,shards:stars,rulesVersion:rules.version};
 try{await db.batch([
  db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?) ON CONFLICT(user_id) DO NOTHING').bind(userId,JSON.stringify(emptyEconomy())),
  db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)').bind(userId,operationId,json,expectedRevision,JSON.stringify(next),JSON.stringify(result)),
  db.prepare('INSERT INTO mission_reward_claims(user_id,level,mission_day,slot,operation_id,attempt_id) VALUES (?,?,?,?,?,?)').bind(userId,level,day,slot,operationId,attemptId)
 ]);}catch(error){const same=await rewardReceipt(db,userId,operationId);if(same)return replay(same,json);const prior=await claimed();if(prior)return replay(prior,json);if((await readEconomy(db,userId)).revision!==expectedRevision)throw Error('economy_revision_conflict');throw error;}
 return {replayed:false,revision:expectedRevision+1,result};
}

export const submitWordAttempt=(db,userId,id,answers,now=Date.now())=>submitMissionAttempt(db,userId,id,answers,now,'words');
export const submitIdiomAttempt=(db,userId,id,answers,now=Date.now())=>submitMissionAttempt(db,userId,id,answers,now,'idioms');
export const claimWordReward=(db,userId,id,op,revision,now=Date.now())=>claimMissionReward(db,userId,id,op,revision,now,'words');
export const claimIdiomReward=(db,userId,id,op,revision,now=Date.now())=>claimMissionReward(db,userId,id,op,revision,now,'idioms');
export async function issueIdiomAttempt(db,userId,level,mode,now=Date.now(),rng=secureRandom){
 identity(userId);if(level!=='1'||!['meaning','synonym'].includes(mode))throw Error('mission_not_supported');const day=jstDay(now);
 await db.prepare('INSERT INTO mission_idiom_cursors(user_id,level,mode,mission_day) VALUES (?,?,?,?) ON CONFLICT(user_id,level,mode) DO NOTHING').bind(userId,level,mode,day).run();
 await db.prepare('UPDATE mission_idiom_cursors SET mission_day=?,range_start=next_start,advanced=0 WHERE user_id=? AND level=? AND mode=? AND mission_day<?').bind(day,userId,level,mode,day).run();
 const cursor=await db.prepare('SELECT * FROM mission_idiom_cursors WHERE user_id=? AND level=? AND mode=?').bind(userId,level,mode).first();
 if(cursor.mission_day!==day)throw Error('mission_day_conflict');
 const questions=[],normalize=x=>x.trim().replace(/\s+/g,' ').toLowerCase();
 for(let n=cursor.range_start;n<cursor.range_start+15;n++){
  const item=idioms[n-1],valid=mode==='meaning'?[item.ja]:item.paraphraseTo;
  const correct=valid[pickIndex(valid.length,rng)],known=new Set(valid.map(normalize));
  const pool=[...new Set(idioms.filter(other=>other.id!==item.id&&!other.noteIds.some(id=>item.noteIds.includes(id))).flatMap(other=>mode==='meaning'?[other.ja]:other.paraphraseTo))].filter(x=>!known.has(normalize(x)));
  const distinct=[...new Map(pool.map(x=>[normalize(x),x])).values()],wrong=shuffle(distinct,rng).slice(0,3);
  if(wrong.length!==3)throw Error('question_bank_incomplete');const choices=shuffle([correct,...wrong],rng);
  questions.push({id:n,prompt:item.expression,choices,answer:choices.indexOf(correct)});
 }
 const id=crypto.randomUUID(),expiry=Math.min(now+2*3600000,Date.parse(day+'T00:00:00+09:00')+DAY);
 await db.prepare('INSERT INTO mission_attempts(user_id,attempt_id,level,mission_day,slot,category,private_json,expires_at) VALUES (?,?,?,?,?,?,?,?)').bind(userId,id,level,day,'idioms','idiom_quiz',JSON.stringify({mode,rangeStart:cursor.range_start,rangeEnd:cursor.range_start+14,questions,rulesVersion:rules.version}),expiry).run();
 return publicAttempt(await find(db,userId,id));
}

export const submitExamAttempt=(db,userId,id,answers,now=Date.now())=>submitMissionAttempt(db,userId,id,answers,now,'exam');
export const claimExamReward=(db,userId,id,op,revision,now=Date.now())=>claimMissionReward(db,userId,id,op,revision,now,'exam');
export async function issueExamAttempt(db,userId,level,category,variant,now=Date.now(),rng=secureRandom){
 identity(userId);if(level!=='1'||!(category==='sentence'&&['a','b','mix'].includes(variant)||category==='paraphrase_quiz'&&variant==='standard'))throw Error('mission_not_supported');const day=jstDay(now);
 const pool=category==='paraphrase_quiz'?paraphrase:variant==='a'?sentenceA:variant==='b'?sentenceB:[...sentenceA,...sentenceB];
 const chosen=shuffle([...pool],rng).slice(0,10).map(q=>{const choices=shuffle([...q.choices],rng);return {id:q.id,prompt:category==='sentence'?q.en:q.a+'\n'+q.b,choices,answer:choices.indexOf(q.answer)};});
 await db.prepare('INSERT INTO mission_exam_sets(user_id,level,mission_day,category,variant,private_json) VALUES (?,?,?,?,?,?) ON CONFLICT(user_id,level,mission_day,category,variant) DO NOTHING').bind(userId,level,day,category,variant,JSON.stringify({variant,questions:chosen,rulesVersion:rules.version})).run();
 const set=await db.prepare('SELECT private_json FROM mission_exam_sets WHERE user_id=? AND level=? AND mission_day=? AND category=? AND variant=?').bind(userId,level,day,category,variant).first();
 if(JSON.parse(set.private_json).rulesVersion!==rules.version)throw Error('unsupported_attempt');
 const id=crypto.randomUUID(),expiry=Math.min(now+2*3600000,Date.parse(day+'T00:00:00+09:00')+DAY);
 await db.prepare('INSERT INTO mission_attempts(user_id,attempt_id,level,mission_day,slot,category,private_json,expires_at) VALUES (?,?,?,?,?,?,?,?)').bind(userId,id,level,day,'exam',category,set.private_json,expiry).run();
 return publicAttempt(await find(db,userId,id));
}
export async function claimBasicBonus(db,userId,level,day,operationId,expectedRevision,now=Date.now()){
 identity(userId);validId(operationId);time(now);if(level!=='1')throw Error('mission_not_supported');
 if(typeof day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(day)||!Number.isFinite(Date.parse(day+'T00:00:00Z'))||new Date(day+'T00:00:00Z').toISOString().slice(0,10)!==day||day>jstDay(now))throw Error('invalid_mission_day');
 if(!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw Error('invalid_revision');
 const complete=await db.prepare("SELECT COUNT(DISTINCT slot) AS n FROM mission_attempts WHERE user_id=? AND level=? AND mission_day=? AND completed=1 AND slot IN ('words','idioms','exam') AND json_extract(private_json,'$.rulesVersion')=?").bind(userId,level,day,rules.version).first();
 if(complete.n!==3)throw Error('basic_missions_not_completed');
 return commitReward(db,userId,level,day,'basic_bonus',null,operationId,expectedRevision,rules.allBasicBonusStars);
}
