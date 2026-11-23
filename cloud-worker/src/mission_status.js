import {readLegacyClaims} from './economy_legacy_claims.js';
import rules from '../../daily-missions/daily_mission_rules.js';
import {jstDay} from './mission_rewards.js';

// Read-only, authenticated dashboard. Never expose answers or private question data.
export async function readMissionStatus(db,userId,now=Date.now(),level='1'){
 if(!['1','2'].includes(level))throw Error('mission_not_supported');
 const date=jstDay(now);
 const {results}=await db.prepare(`SELECT a.slot, COUNT(*) AS submitted,
 MAX(a.completed) AS completed,
 SUM(CASE WHEN l.attempt_id IS NOT NULL THEN 1 ELSE 0 END) AS learningSaved,
 SUM(CASE WHEN g.attempt_id IS NOT NULL THEN 1 ELSE 0 END) AS growthSaved
 FROM mission_attempts a
 LEFT JOIN mission_learning_receipts l ON l.user_id=a.user_id AND l.attempt_id=a.attempt_id
 LEFT JOIN mission_growth_receipts g ON g.user_id=a.user_id AND g.attempt_id=a.attempt_id
 WHERE a.user_id=? AND a.level=? AND a.mission_day=? AND a.submission_json IS NOT NULL
 GROUP BY a.slot`).bind(userId,level,date).all();
 const dungeonReceipt=await db.prepare('SELECT operation_id FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,'bonus_dungeon_'+date.replaceAll('-','')+'_v1').first();
 const dungeonClaimed=!!dungeonReceipt||!!(await readLegacyClaims(db,userId))['dungeon:'+date];
 return {date,level,dungeonClaimed,missions:rules.missionSlots.filter(s=>level==='1'||['words','exam'].includes(s.slot)).map(({slot,title,goal,group})=>{
  const row=results.find(r=>r.slot===slot);
  return {slot,title,goal,group,completed:!!row?.completed,submitted:row?.submitted||0,learningSaved:row?.learningSaved||0,growthSaved:row?.growthSaved||0};
 })};
}
