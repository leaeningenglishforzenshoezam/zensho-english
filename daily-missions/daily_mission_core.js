// GOIMON daily missions v2: definition and display ONLY.
// No XP, shards, cloud DB, learning log, or production home modifications.
(function(){
"use strict";
const rules=window.GOIMON_DAILY_MISSION_RULES;
if(!rules)return;
const PREFIX="goimon_daily_missions_v2";
function dateKey(date=new Date()){
 const pad=n=>String(n).padStart(2,"0");
 return [date.getFullYear(),pad(date.getMonth()+1),pad(date.getDate())].join("-");
}
function activeLevel(){return localStorage.getItem("zensho_level_v1")==="2"?"2":"1";}
function allowed(c,level){
 if(c.levels && !c.levels.includes(level))return false;
 return !!window.LearningCategories?.isAvailableForLevel(c.category,level) || (c.category==="q7"&&level==="1");
}
function countRecent(category,level){
 return Number(window.ZenshoLearningLog?.getCategorySummary?.(category,7,level)?.attempt||0);
}
function candidatesFor(slot,level){return slot.candidates.filter(c=>allowed(c,level));}
function selectMissions(level=activeLevel()){
 return rules.missionSlots.map(slot=>{
  const options=candidatesFor(slot,level);
  if(!options.length)return {id:slot.slot,slot:slot.slot,title:slot.title,group:slot.group,rewardStars:slot.rewardStars,available:false,reason:"この級に対応する問題が未整備です",status:"unavailable"};
  // Rotate by history, with stable tie-breaking. Store selection once per day.
  const selected=options.map((candidate,index)=>({candidate,index,uses:countRecent(candidate.category,level)}))
   .sort((a,b)=>a.uses-b.uses || a.index-b.index)[0].candidate;
  return {id:slot.slot,slot:slot.slot,title:slot.title,group:slot.group,rewardStars:slot.rewardStars,
   goal:slot.goal,available:true,category:selected.category,page:selected.page||window.LearningCategories?.getCategory(selected.category)?.page||null,
   count:selected.count??null,required:selected.required??null,requiredPercent:selected.requiredPercent??null,
   rangeSize:selected.rangeSize??null,formatCandidates:selected.formatCandidates||null,
   status:"awaiting_session",description:selected.description||null};
 });
}
function wordCount(level){return (level==="2"?window.WORDS_2KYU:window.WORDS_1KYU)?.length || 0;}
function selectWordRange(level,day){
 const count=wordCount(level);
 if(count<20)return null;
 // Stable across reloads; rotates across nonoverlapping 20-word ranges by day.
 const total=Math.floor(count/20);
 const dayNumber=Math.floor(new Date(day+"T12:00:00").getTime()/86400000);
 const blockIndex=((dayNumber%total)+total)%total;
 return {rangeStart:blockIndex*20+1,rangeEnd:blockIndex*20+20};
}
function storageKey(level,day){return PREFIX+"_lv"+level+"_"+day;}
function getOrCreate(level=activeLevel(),day=dateKey()){
 const key=storageKey(level,day);
 try{
  const old=JSON.parse(localStorage.getItem(key)||"null");
  if(old?.version===rules.version && old?.level===level && old?.date===day && old.missions?.length===6)return old;
 }catch(_){}
 const missions=selectMissions(level);
 const range=selectWordRange(level,day);
 const wordMission=missions.find(m=>m.slot==="words");
 if(wordMission){ if(range){Object.assign(wordMission,range);}else{wordMission.available=false;wordMission.reason="単語データが20語未満です";wordMission.status="unavailable";} }
 const fresh={version:rules.version,level,date:day,createdAt:new Date().toISOString(),missions};
 try{localStorage.setItem(key,JSON.stringify(fresh));}catch(_){}
 return fresh;
}
// Device-local, provisional completion state. Not a spendable reward ledger.
function completionKey(level,day){return "goimon_daily_mission_completions_v1_lv"+level+"_"+day;}
function readCompletion(level,day){
 try{
  const data=JSON.parse(localStorage.getItem(completionKey(level,day))||"null");
  return data && typeof data==="object" && data.date===day && data.level===level ? data : {date:day,level,completed:{}};
 }catch(_){return {date:day,level,completed:{}};}
}
function recordWordSession(payload){
 const today=dateKey(), level=String(payload?.level||"");
 if(!payload || payload.day!==today || !["1","2"].includes(level))return {valid:false,completed:false,reason:"invalid_day_or_level"};
 const daily=getOrCreate(level,today), mission=daily.missions.find(m=>m.slot==="words");
 if(!mission || payload.category!==mission.category || payload.start!==mission.rangeStart || payload.end!==mission.rangeEnd)
   return {valid:false,completed:false,reason:"mission_mismatch"};
 const mode={quiz_enja:"enja",quiz_jaen:"jaen",audio_quiz:"audio"}[payload.category];
 const result=window.GoimonMissionBridge?.evaluateWordSession(mission,mode,payload.attempts);
 if(!result?.valid)return result||{valid:false,completed:false,reason:"bridge_missing"};
 const record=readCompletion(level,today);
 const previous=record.completed.words||null;
 const score=Number(result.correct);
 record.completed.words={
   category:mission.category,rangeStart:mission.rangeStart,rangeEnd:mission.rangeEnd,
   bestCorrect:Math.max(score,Number(previous?.bestCorrect||0)),
   attempts:Math.min(100000,Number(previous?.attempts||0)+1),
   completed:!!previous?.completed || !!result.completed,
   completedAt:previous?.completedAt || (result.completed ? new Date().toISOString():null)
 };
 try{localStorage.setItem(completionKey(level,today),JSON.stringify(record));}
 catch(_){return {valid:true,completed:record.completed.words.completed,persisted:false,reason:"storage_unavailable"};}
 return {...result,completed:record.completed.words.completed,persisted:true};
}
function getStatus(level=activeLevel(),day=dateKey()){
 const daily=getOrCreate(level,day),state=readCompletion(level,day);
 const missions=daily.missions.map(m=>{
  const record=m.slot==="words"?state.completed?.words:null;
  const matches=record?.category===m.category&&record?.rangeStart===m.rangeStart&&record?.rangeEnd===m.rangeEnd;
  return {...m,completed:!!(matches&&record.completed),bestCorrect:matches?record.bestCorrect:0,
    attemptCount:matches?record.attempts:0,progress:matches?record.bestCorrect:0};
 });
 const completedCount=missions.filter(m=>m.completed).length;
 const basicCompletedCount=missions.filter(m=>m.group==="basic"&&m.completed).length;
 return {...daily,missions,completedCount,basicCompletedCount,
   // Preview only. NO grants or cloud synchronization.
   pendingStarEstimate:missions.filter(m=>m.completed).reduce((sum,m)=>sum+m.rewardStars,0)
     +(basicCompletedCount===3?rules.allBasicBonusStars:0),
   info:"端末上の仮達成記録です。星のかけらの正式付与・クラウド同期は未実装です。"};
}
window.GoimonDailyMissions=Object.freeze({dateKey,tokyoDateKey:dateKey,selectWordRange,selectMissions,getOrCreate,getStatus,recordWordSession});
})();
