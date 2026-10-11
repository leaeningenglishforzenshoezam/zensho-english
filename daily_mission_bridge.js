// daily_mission_bridge.js
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
window.GoimonMissionBridge=Object.freeze({createWordSessionResult,evaluateWordSession});
})();
