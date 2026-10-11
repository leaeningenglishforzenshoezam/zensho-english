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
function daysBetween(start,day){
 const a=Date.parse(start+"T12:00:00Z"),b=Date.parse(day+"T12:00:00Z");
 return Number.isFinite(a)&&Number.isFinite(b)?Math.max(0,Math.floor((b-a)/86400000)):0;
}
function firstMissionDay(level,kind,day){
 const key="goimon_daily_first_day_v1_lv"+level+"_"+kind;
 let start=null;try{start=localStorage.getItem(key);}catch(_){}
 if(!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(start||"")||start>day){
  start=day;try{localStorage.setItem(key,start);}catch(_){}
 }
 return start;
}
function selectNumberRange(level,kind,day,totalCount,size){
 const number=Math.floor(Number(totalCount)),blocks=Math.ceil(number/size);
 if(!Number.isInteger(number)||number<size||blocks<1)return null;
 const first=firstMissionDay(level,kind,day);
 const blockIndex=daysBetween(first,day)%blocks;
 const start=Math.min(blockIndex*size+1,number-size+1);
 return {rangeStart:start,rangeEnd:Math.min(number,start+size-1)};
}
function selectWordRange(level,day){return selectNumberRange(level,"words",day,wordCount(level),20);}
function selectIdiomRange(level,day){return level==="1"?selectNumberRange(level,"idioms",day,287,15):null;}
// Each idiom question mode advances independently after a fully answered 15-question session.
function selectIdiomModeRange(level,day,mode){
 if(level!=="1"||!["meaning","synonym"].includes(mode))return null;
 const key="goimon_daily_idiom_cursor_v1_lv"+level+"_"+mode;
 let record={};try{record=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(_){}
 const sameDay=record.day===day&&Number.isInteger(record.rangeStart)&&Number.isInteger(record.rangeEnd);
 if(sameDay)return {rangeStart:record.rangeStart,rangeEnd:record.rangeEnd};
 const start=Math.max(1,Math.min(273,Number(record.nextStart)||1));
 const range={rangeStart:start,rangeEnd:start+14};
 const next={day,rangeStart:range.rangeStart,rangeEnd:range.rangeEnd,nextStart:start};
 try{localStorage.setItem(key,JSON.stringify(next));}catch(_){}
 return range;
}
function advanceIdiomModeRange(level,day,mode,range){
 const key="goimon_daily_idiom_cursor_v1_lv"+level+"_"+mode;
 let rec={};try{rec=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(_){}
 if(rec.day!==day||rec.rangeStart!==range.rangeStart||rec.rangeEnd!==range.rangeEnd)return;
 if(rec.advanced)return;
 const nextStart=range.rangeEnd>=287?1:Math.min(range.rangeStart+15,273);
 try{localStorage.setItem(key,JSON.stringify({...rec,nextStart,advanced:true}));}catch(_){}
}
function storageKey(level,day){return PREFIX+"_lv"+level+"_"+day;}
function getOrCreate(level=activeLevel(),day=dateKey()){
 const key=storageKey(level,day);
 try{
  const old=JSON.parse(localStorage.getItem(key)||"null");
  if(old?.version===rules.version && old?.level===level && old?.date===day && old.missions?.length===6)return old;
 }catch(_){}
 const missions=selectMissions(level);
 // Round-robin by completed daily reading category, not overall learning log frequency.
 const reading=missions.find(m=>m.slot==="reading");
 if(reading&&level==="1"){
  const categories=["q7","dialogue8","q10"].filter(category=>candidatesFor(rules.missionSlots.find(slot=>slot.slot==="reading"),level).some(c=>c.category===category));
  if(categories.length){
   const key="goimon_daily_reading_rotation_v1_lv"+level;
   let last="";try{last=localStorage.getItem(key)||"";}catch(_){}
   const next=categories[(categories.indexOf(last)+1)%categories.length];
   const selected=rules.missionSlots.find(slot=>slot.slot==="reading").candidates.find(c=>c.category===next);
   Object.assign(reading,{category:next,page:selected.page||window.LearningCategories?.getCategory(next)?.page||null,count:selected.count??null,required:selected.required??null,requiredPercent:selected.requiredPercent??null});
   try{localStorage.setItem(key,next);}catch(_){}
  }
 }
 const range=selectWordRange(level,day);
 const wordMission=missions.find(m=>m.slot==="words");
 if(wordMission){ if(range){Object.assign(wordMission,range);}else{wordMission.available=false;wordMission.reason="単語データが20語未満です";wordMission.status="unavailable";} }
 const idiomMission=missions.find(m=>m.slot==="idioms");
 const idiomRange=selectIdiomModeRange(level,day,"meaning");
 if(idiomMission){if(idiomRange){Object.assign(idiomMission,idiomRange);}else{idiomMission.available=false;idiomMission.status="unavailable";}}
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
function recordIdiomSession(payload){
 const today=dateKey(),level=String(payload?.level||"");
 if(!payload || payload.day!==today || level!=="1")return {valid:false,completed:false,reason:"invalid_day_or_level"};
 const daily=getOrCreate(level,today),mission=daily.missions.find(m=>m.slot==="idioms");
 if(!mission || mission.category!=="idiom_quiz" || payload.category!=="idiom_quiz")
   return {valid:false,completed:false,reason:"mission_mismatch"};
 if(!["meaning","synonym"].includes(payload.questionMode) || !Array.isArray(payload.attempts))
   return {valid:false,completed:false,reason:"invalid_mode_or_attempts"};
 const expected=selectIdiomModeRange(level,today,payload.questionMode);
 if(!expected||payload.start!==expected.rangeStart||payload.end!==expected.rangeEnd)return {valid:false,completed:false,reason:"range_mismatch"};
 if(payload.attempts.length!==15 || payload.attempts.some(a=>typeof a?.correct!=="boolean" || !Number.isInteger(a?.displayNo)||a.displayNo<expected.rangeStart||a.displayNo>expected.rangeEnd)
    || new Set(payload.attempts.map(a=>a.displayNo)).size!==15)
   return {valid:false,completed:false,reason:"invalid_question_set"};
 const correct=payload.attempts.filter(a=>a.correct).length,complete=correct>=12;
 const record=readCompletion(level,today),previous=record.completed.idioms;
 const sessionId=String(payload.finishedAt||"");
 if(!sessionId||!Number.isFinite(Date.parse(sessionId)))return {valid:false,completed:false,reason:"invalid_session"};
 if(previous?.lastSessionId===sessionId)return {valid:true,completed:!!previous.completed,duplicate:true,persisted:true};
 record.completed.idioms={category:"idiom_quiz",lastSessionId:sessionId,rangeStart:expected.rangeStart,rangeEnd:expected.rangeEnd,questionMode:payload.questionMode,
  attempts:Math.min(100000,Number(previous?.attempts||0)+1),
  bestCorrect:Math.max(correct,Number(previous?.bestCorrect||0)),
  completed:!!previous?.completed||complete,
  completedAt:previous?.completedAt||(complete?new Date().toISOString():null)};
 try{localStorage.setItem(completionKey(level,today),JSON.stringify(record));}
 catch(_){return {valid:true,completed:record.completed.idioms.completed,persisted:false,reason:"storage_unavailable"};}
 advanceIdiomModeRange(level,today,payload.questionMode,expected);
 return {valid:true,completed:record.completed.idioms.completed,correct,total:15,required:12,persisted:true};
}
// Daily-only history, separate from normal quiz cursors. Only actual completed sessions are recorded.
function examHistoryKey(level,category){return "goimon_daily_exam_history_v1_lv"+level+"_"+category;}
function examHistory(level,category){
 try{const x=JSON.parse(localStorage.getItem(examHistoryKey(level,category))||"{}");return x&&typeof x==="object"?x:{};}catch(_){return {};}
}
function rankExamQuestionIds(level,category,ids){
 const history=examHistory(level,category);
 return ids.slice().sort((a,b)=>{
  const x=history[String(a)]||{},y=history[String(b)]||{};
  return Number(x.attempts||0)-Number(y.attempts||0)
   || Number(x.lastSeen||0)-Number(y.lastSeen||0);
 });
}
function updateExamHistory(level,category,attempts){
 const history=examHistory(level,category),now=Date.now();
 attempts.forEach(a=>{
  const id=String(a.id),prev=history[id]||{};
  history[id]={attempts:Number(prev.attempts||0)+1,wrong:Number(prev.wrong||0)+(a.correct?0:1),lastSeen:now};
 });
 try{localStorage.setItem(examHistoryKey(level,category),JSON.stringify(history));return true;}catch(_){return false;}
}
function recordExamSession(payload){
 const today=dateKey(),level=String(payload?.level||"");
 if(!payload||payload.day!==today||!["1","2"].includes(level))return {valid:false,completed:false,reason:"invalid_day_or_level"};
 const mission=getOrCreate(level,today).missions.find(m=>m.slot==="exam");
 if(!mission?.available||mission.category!==payload.category||!["sentence","paraphrase_quiz"].includes(payload.category))
  return {valid:false,completed:false,reason:"mission_mismatch"};
 if(!Array.isArray(payload.attempts)||payload.attempts.length!==10||
   payload.attempts.some(a=>(typeof a?.correct!=="boolean")||typeof a?.id!=="string"||!a.id)||
   new Set(payload.attempts.map(a=>a.id)).size!==10)
  return {valid:false,completed:false,reason:"invalid_question_set"};
 const correct=payload.attempts.filter(a=>a.correct).length;
 const record=readCompletion(level,today),old=record.completed.exam;
 const sessionId=String(payload.finishedAt||"");
 if(!sessionId || !Number.isFinite(Date.parse(sessionId)))return {valid:false,completed:false,reason:"missing_session_id"};
 if(old?.lastSessionId===sessionId)return {valid:true,completed:!!old.completed,correct,total:10,required:8,persisted:true,duplicate:true};
 updateExamHistory(level,mission.category,payload.attempts);
 record.completed.exam={category:mission.category,lastSessionId:sessionId,attempts:Math.min(100000,Number(old?.attempts||0)+1),
  bestCorrect:Math.max(correct,Number(old?.bestCorrect||0)),
  completed:!!old?.completed||correct>=8,
  completedAt:old?.completedAt||(correct>=8?new Date().toISOString():null)};
 try{localStorage.setItem(completionKey(level,today),JSON.stringify(record));}
 catch(_){return {valid:true,completed:record.completed.exam.completed,persisted:false};}
 return {valid:true,completed:record.completed.exam.completed,correct,total:10,required:8,persisted:true};
}
function recordReorderSession(payload){
 const today=dateKey(),level=String(payload?.level||"");
 if(!payload||payload.day!==today||level!=="1")return {valid:false,completed:false,reason:"invalid_day_or_level"};
 const mission=getOrCreate(level,today).missions.find(m=>m.slot==="reorder");
 if(!mission?.available||mission.category!=="reorder"||payload.category!=="reorder")return {valid:false,completed:false,reason:"mission_mismatch"};
 if(!Array.isArray(payload.attempts)||payload.attempts.length!==5||
  payload.attempts.some(a=>typeof a?.correct!=="boolean"||typeof a?.id!=="string"||!a.id)||
  new Set(payload.attempts.map(a=>a.id)).size!==5)return {valid:false,completed:false,reason:"invalid_question_set"};
 const id=String(payload.finishedAt||"");
 if(!id||!Number.isFinite(Date.parse(id)))return {valid:false,completed:false,reason:"missing_session_id"};
 const state=readCompletion(level,today),previous=state.completed.reorder;
 if(previous?.lastSessionId===id)return {valid:true,completed:!!previous.completed,duplicate:true,persisted:true};
 const correct=payload.attempts.filter(a=>a.correct).length;
 updateExamHistory(level,"reorder",payload.attempts);
 state.completed.reorder={category:"reorder",lastSessionId:id,attempts:Number(previous?.attempts||0)+1,
  bestCorrect:Math.max(correct,Number(previous?.bestCorrect||0)),
  completed:!!previous?.completed||correct>=4,
  completedAt:previous?.completedAt||(correct>=4?new Date().toISOString():null)};
 try{localStorage.setItem(completionKey(level,today),JSON.stringify(state));}
 catch(_){return {valid:true,completed:state.completed.reorder.completed,persisted:false};}
 return {valid:true,completed:state.completed.reorder.completed,correct,total:5,required:4,persisted:true};
}
// SET selection works with IDs from the actual question data.
// This prototype only selects. It does not grant rewards or declare a result completed.
function dailySetHistoryKey(level,kind){return "goimon_daily_set_history_v1_lv"+level+"_"+kind;}
function dailySetHistory(level,kind){
 try{const x=JSON.parse(localStorage.getItem(dailySetHistoryKey(level,kind))||"{}");
  return x&&typeof x==="object"&&!Array.isArray(x)?x:{};}catch(_){return {};}
}
function chooseDailySet(level,kind,ids,day=dateKey()){
 const unique=[...new Set((ids||[]).map(x=>String(x)).filter(Boolean))];
 if(!unique.length)return null;
 const history=dailySetHistory(level,kind),used=unique.map(id=>({id,
  attempts:Number(history[id]?.attempts||0),lastSeen:Number(history[id]?.lastSeen||0)}))
  .sort((a,b)=>a.attempts-b.attempts||a.lastSeen-b.lastSeen||a.id.localeCompare(b.id));
 const key="goimon_daily_set_selection_v1_lv"+level+"_"+kind+"_"+day;
 try{const saved=localStorage.getItem(key);if(saved&&unique.includes(saved))return saved;}catch(_){}
 const picked=used[0].id;try{localStorage.setItem(key,picked);}catch(_){}
 return picked;
}
function noteDailySetCompletion(level,kind,id){
 // Call only after an actual completed set has passed a session-integrity check.
 const history=dailySetHistory(level,kind),k=String(id);
 history[k]={attempts:Number(history[k]?.attempts||0)+1,lastSeen:Date.now()};
 try{localStorage.setItem(dailySetHistoryKey(level,kind),JSON.stringify(history));return true;}catch(_){return false;}
}
function recordReadingSet(payload){
 const day=dateKey(),level=String(payload?.level||"");
 if(!payload||payload.day!==day||level!=="1")return {valid:false,completed:false,reason:"invalid_day_or_level"};
 const daily=getOrCreate(level,day),mission=daily.missions.find(m=>m.slot==="reading");
 const accepted=["q7","dialogue8","q10"];
 if(!mission?.available||!accepted.includes(payload.category)||payload.category!==mission.category)
  return {valid:false,completed:false,reason:"category_mismatch"};
 if(typeof payload.setId!=="string"||!payload.setId || !Number.isInteger(payload.correct)||!Number.isInteger(payload.total)
  ||payload.total!==5||payload.correct<0||payload.correct>5)
  return {valid:false,completed:false,reason:"invalid_set_result"};
 const selected=daily.readingSetId;
 if(!selected||payload.setId!==selected)return {valid:false,completed:false,reason:"set_mismatch"};
 const timestamp=String(payload.finishedAt||"");
 if(!Number.isFinite(Date.parse(timestamp)))return {valid:false,completed:false,reason:"invalid_timestamp"};
 const state=readCompletion(level,day),old=state.completed.reading;
 if(old?.lastSessionId===timestamp)return {valid:true,completed:!!old.completed,duplicate:true,persisted:true};
 const completed=payload.correct>=4;
 state.completed.reading={category:mission.category,setId:selected,lastSessionId:timestamp,
  attempts:Number(old?.attempts||0)+1,bestCorrect:Math.max(payload.correct,Number(old?.bestCorrect||0)),
  completed:!!old?.completed||completed,
  completedAt:old?.completedAt||(completed?new Date().toISOString():null)};
 try{localStorage.setItem(completionKey(level,day),JSON.stringify(state));}catch(_){return {valid:true,completed:state.completed.reading.completed,persisted:false};}
 noteDailySetCompletion(level,"reading:"+mission.category,selected);
 return {valid:true,completed:state.completed.reading.completed,correct:payload.correct,total:5,required:4,persisted:true};
}
function assignDailyReadingSet(level,category,ids,day=dateKey()){
 const daily=getOrCreate(level,day),m=daily.missions.find(m=>m.slot==="reading");
 if(!m?.available||m.category!==category)return null;
 if(daily.readingSetId)return ids.map(String).includes(daily.readingSetId)?daily.readingSetId:null;
 const chosen=chooseDailySet(level,"reading:"+category,ids,day);
 if(!chosen)return null;
 daily.readingSetId=chosen;
 try{localStorage.setItem(storageKey(level,day),JSON.stringify(daily));}catch(_){}
 return chosen;
}
function recordListeningSession(payload){
 const day=dateKey(),level=String(payload?.level||"");
 if(!payload||payload.day!==day||level!=="1")return {valid:false,completed:false,reason:"invalid_day_or_level"};
 const m=getOrCreate(level,day).missions.find(x=>x.slot==="listening");
 if(!m?.available||payload.category!=="listening"||![2,3,5].includes(payload.format))
  return {valid:false,completed:false,reason:"invalid_category_or_format"};
 if(!Array.isArray(payload.attempts)||payload.attempts.length!==5||
  payload.attempts.some(a=>typeof a?.id!=="string"||!a.id||typeof a.correct!=="boolean")||
  new Set(payload.attempts.map(a=>a.id)).size!==5)return {valid:false,completed:false,reason:"invalid_questions"};
 const time=String(payload.finishedAt||"");
 if(!time||!Number.isFinite(Date.parse(time)))return {valid:false,completed:false,reason:"invalid_session"};
 const state=readCompletion(level,day),old=state.completed.listening;
 if(old?.lastSessionId===time)return {valid:true,completed:!!old.completed,duplicate:true,persisted:true};
 const correct=payload.attempts.filter(a=>a.correct).length;
 state.completed.listening={category:"listening",format:payload.format,lastSessionId:time,
  attempts:Number(old?.attempts||0)+1,bestCorrect:Math.max(correct,Number(old?.bestCorrect||0)),
  completed:!!old?.completed||correct>=4,completedAt:old?.completedAt||(correct>=4?new Date().toISOString():null)};
 try{localStorage.setItem(completionKey(level,day),JSON.stringify(state));}catch(_){return {valid:true,completed:state.completed.listening.completed,persisted:false};}
 updateExamHistory(level,"listening:"+payload.format,payload.attempts);
 return {valid:true,completed:state.completed.listening.completed,correct,total:5,required:4,persisted:true};
}
function getStatus(level=activeLevel(),day=dateKey()){
 const daily=getOrCreate(level,day),state=readCompletion(level,day);
 const missions=daily.missions.map(m=>{
  const record=m.slot==="words"?state.completed?.words:(m.slot==="idioms"?state.completed?.idioms:(m.slot==="exam"?state.completed?.exam:(m.slot==="reorder"?state.completed?.reorder:(m.slot==="reading"?state.completed?.reading:(m.slot==="listening"?state.completed?.listening:null)))));
  const matches=record?.category===m.category&&((m.slot!=="words")||(record?.rangeStart===m.rangeStart&&record?.rangeEnd===m.rangeEnd));
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
window.GoimonDailyMissions=Object.freeze({dateKey,tokyoDateKey:dateKey,selectWordRange,selectMissions,getOrCreate,getStatus,selectIdiomRange,selectIdiomModeRange,recordWordSession,recordIdiomSession,recordExamSession,recordReorderSession,rankExamQuestionIds,chooseDailySet,dailySetHistory,assignDailyReadingSet,recordReadingSet,recordListeningSession});
})();
