// Internal draft only: no Worker route or client connection.
import rules from '../../daily-missions/daily_mission_rules.js';
import bank from './data/mission-words.json' with {type:'json'};
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
function publicAttempt(row){const p=JSON.parse(row.private_json);return {attemptId:row.attempt_id,level:row.level,date:row.mission_day,slot:row.slot,category:row.category,expiresAt:row.expires_at,rangeStart:p.rangeStart,rangeEnd:p.rangeEnd,questions:p.questions.map(({id,prompt,choices})=>({id,prompt,choices}))};}
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
export async function submitWordAttempt(db,userId,attemptId,answers,now=Date.now()){
 identity(userId);validId(attemptId);time(now);const row=await find(db,userId,attemptId);if(!row)throw Error('attempt_not_found');
 const p=JSON.parse(row.private_json);
 if(!Array.isArray(answers)||answers.length!==20||Array.from(answers).some(a=>!Number.isInteger(a)||a<0||a>3))throw Error('invalid_answers');
 const json=JSON.stringify(answers);
 if(row.submission_json!==null){if(row.submission_json!==json)throw Error('attempt_already_submitted');return {correct:row.score,total:20,completed:!!row.completed,replayed:true};}
 if(now>=row.expires_at||jstDay(now)!==row.mission_day)throw Error('attempt_expired');
 if(p.rulesVersion!==rules.version||p.questions.length!==20)throw Error('unsupported_attempt');
 const correct=answers.reduce((n,a,i)=>n+(a===p.questions[i].answer?1:0),0);
 const required=rules.missionSlots.find(s=>s.slot==='words').candidates.find(c=>c.category==='quiz_enja').required;
 const done=correct>=required;
 await db.prepare('UPDATE mission_attempts SET submission_json=?,score=?,completed=? WHERE user_id=? AND attempt_id=? AND submission_json IS NULL').bind(json,correct,done?1:0,userId,attemptId).run();
 const saved=await find(db,userId,attemptId);if(saved.submission_json!==json)throw Error('attempt_already_submitted');
 return {correct:saved.score,total:20,completed:!!saved.completed,replayed:false};
}
async function rewardReceipt(db,userId,id){return db.prepare('SELECT * FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,id).first();}
function replay(row,json){if(row.request_json!==json)throw Error('operation_id_reused');return {replayed:true,revision:row.expected_revision+1,result:JSON.parse(row.result_json)};}
export async function claimWordReward(db,userId,attemptId,operationId,expectedRevision,now=Date.now()){
 identity(userId);validId(attemptId);validId(operationId);time(now);if(!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw Error('invalid_revision');
 const attempt=await find(db,userId,attemptId);if(!attempt||attempt.completed!==1||attempt.submission_json===null)throw Error('mission_not_completed');
 if(attempt.level!=='1'||attempt.slot!=='words'||attempt.category!=='quiz_enja'||JSON.parse(attempt.private_json).rulesVersion!==rules.version)throw Error('unsupported_attempt');
 const json=JSON.stringify({type:'mission_reward',level:attempt.level,day:attempt.mission_day,slot:'words'});
 const old=await rewardReceipt(db,userId,operationId);if(old)return replay(old,json);
 async function claimed(){const c=await db.prepare('SELECT operation_id FROM mission_reward_claims WHERE user_id=? AND level=? AND mission_day=? AND slot=?').bind(userId,attempt.level,attempt.mission_day,'words').first();return c?await rewardReceipt(db,userId,c.operation_id):null;}
 const prior=await claimed();if(prior)return replay(prior,json);
 // A server-scored completed attempt may be claimed after midnight, using its original day.
 const current=await readEconomy(db,userId);if(current.revision!==expectedRevision)throw Error('economy_revision_conflict');
 const stars=rules.missionSlots.find(s=>s.slot==='words').rewardStars,next=structuredClone(current.state);next.shards+=stars;validateState(next);
 const result={type:'mission_reward',level:attempt.level,date:attempt.mission_day,slot:'words',shards:stars,rulesVersion:rules.version};
 try{await db.batch([
  db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?) ON CONFLICT(user_id) DO NOTHING').bind(userId,JSON.stringify(emptyEconomy())),
  db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)').bind(userId,operationId,json,expectedRevision,JSON.stringify(next),JSON.stringify(result)),
  db.prepare('INSERT INTO mission_reward_claims(user_id,level,mission_day,slot,operation_id,attempt_id) VALUES (?,?,?,?,?,?)').bind(userId,attempt.level,attempt.mission_day,'words',operationId,attemptId)
 ]);}catch(error){const same=await rewardReceipt(db,userId,operationId);if(same)return replay(same,json);const prior=await claimed();if(prior)return replay(prior,json);if((await readEconomy(db,userId)).revision!==expectedRevision)throw Error('economy_revision_conflict');throw error;}
 return {replayed:false,revision:expectedRevision+1,result};
}
