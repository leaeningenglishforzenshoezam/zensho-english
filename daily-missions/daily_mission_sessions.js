// Session result validator for future integration. No writes, rewards or XP.
(function(){
"use strict";
function evaluate(mission, result){
 if(!mission?.available)return {valid:false,completed:false,reason:"unavailable"};
 if(!result || result.category!==mission.category || result.missionId!==mission.id)
   return {valid:false,completed:false,reason:"identity_mismatch"};
 if(!Number.isInteger(result.total)||!Number.isInteger(result.correct)||result.total<1||result.correct<0||result.correct>result.total)
   return {valid:false,completed:false,reason:"invalid_score"};
 if(mission.slot==="words"){
   if(!Number.isInteger(mission.rangeStart)||!Number.isInteger(mission.rangeEnd)||mission.rangeEnd-mission.rangeStart!==19)
     return {valid:false,completed:false,reason:"invalid_range"};
   if(result.rangeStart!==mission.rangeStart||result.rangeEnd!==mission.rangeEnd)
     return {valid:false,completed:false,reason:"range_mismatch"};
   if(result.total!==20 || !Array.isArray(result.wordIds) || result.wordIds.length!==20
    || new Set(result.wordIds).size!==20
    || result.wordIds.some(n=>!Number.isInteger(n)||n<mission.rangeStart||n>mission.rangeEnd))
     return {valid:false,completed:false,reason:"word_set_mismatch"};
 }
 if(mission.count!==null && mission.count!==undefined && result.total!==mission.count)
   return {valid:false,completed:false,reason:"question_count_mismatch"};
 const threshold=mission.required!==null&&mission.required!==undefined
   ? mission.required : Math.ceil(result.total * (mission.requiredPercent||100)/100);
 return {valid:true,completed:result.correct>=threshold,correct:result.correct,total:result.total,required:threshold};
}
window.GoimonMissionSession=Object.freeze({evaluate});
})();
