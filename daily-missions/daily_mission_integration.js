// daily_mission_integration.js
// Existing quiz session summaries -> mission validation. Read-only: never awards stars.
(function(){
"use strict";
const categoryByMode=Object.freeze({enja:"quiz_enja",jaen:"quiz_jaen",audio:"audio_quiz"});
function createWordSessionResult(mission,mode,attempts){
 if(!mission||mission.slot!=="words")return {ok:false,reason:"not_word_mission"};
 const category=categoryByMode[mode];
 if(!category || category!==mission.category)return {ok:false,reason:"category_mismatch"};
 if(!Array.isArray(attempts))return {ok:false,reason:"invalid_attempts"};
 // Require one answer per question and disallow null/unanswered records.
 if(attempts.some(a=>!a || !Number.isInteger(a.no) || typeof a.isCorrect!=="boolean"))
   return {ok:false,reason:"unanswered_or_invalid"};
 const wordIds=attempts.map(a=>a.no);
 return {ok:true,result:{
    missionId:mission.id,category,rangeStart:mission.rangeStart,rangeEnd:mission.rangeEnd,
    total:attempts.length,correct:attempts.filter(a=>a.isCorrect).length,wordIds
 }};
}
function evaluateWordSession(mission,mode,attempts){
 const converted=createWordSessionResult(mission,mode,attempts);
 if(!converted.ok)return {valid:false,completed:false,reason:converted.reason};
 if(typeof window.GoimonMissionSession?.evaluate!=="function")return {valid:false,completed:false,reason:"validator_missing"};
 return window.GoimonMissionSession.evaluate(mission,converted.result);
}
// Prepare only the settings already supported by existing quiz URLs.
// The quiz pages do not yet support mission-locked question counts or automatic result callbacks.
function getWordMissionLaunch(mission){
 if(!mission || mission.slot!=="words" || !mission.available ||
    !Number.isInteger(mission.rangeStart) || !Number.isInteger(mission.rangeEnd) ||
    mission.rangeEnd-mission.rangeStart!==19)return {ready:false,reason:"invalid_mission"};
 const pageByCategory={quiz_enja:"quiz.html",quiz_jaen:"quiz_jaen.html",audio_quiz:"audio_quiz.html"};
 const page=pageByCategory[mission.category];
 if(!page)return {ready:false,reason:"unsupported_category"};
 const params=new URLSearchParams({start:String(mission.rangeStart),end:String(mission.rangeEnd)});
 if(mission.category!=="audio_quiz")params.set("mode","random");
 params.set("dailyMission","words");
 return {ready:true,url:page+"?"+params.toString(),autoStart:false,
   note:"出題範囲と20問を設定します。演習結果は一時記録されますが星のかけらはまだ付与されません。"};
}
window.GoimonMissionBridge=Object.freeze({createWordSessionResult,evaluateWordSession,getWordMissionLaunch});
})();
