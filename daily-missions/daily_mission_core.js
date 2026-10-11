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
function getStatus(level=activeLevel(),day=dateKey()){
 const daily=getOrCreate(level,day);
 // No category counters can prove a perfect/80% single-session achievement.
 // Explicitly keep every available mission pending until verified session integration exists.
 return {...daily,missions:daily.missions.map(m=>({...m,progress:0,completed:false})),
 completedCount:0,basicCompletedCount:0,pendingStarEstimate:0,
 info:"演習単位の採点連携は未実装です。達成・報酬はまだ記録しません。"};
}
window.GoimonDailyMissions=Object.freeze({dateKey,tokyoDateKey:dateKey,selectWordRange,selectMissions,getOrCreate,getStatus});
})();
