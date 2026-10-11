// GOIMON daily mission design v2. Standalone prototype; no rewards are issued.
(function(){
"use strict";
window.GOIMON_DAILY_MISSION_RULES = Object.freeze({
 version:2, timezone:"device-local", // Match existing learning_log.js until login sync standardizes timezone
 allBasicBonusStars:2,
 missionSlots:[
  {slot:"words",title:"単語マスター",group:"basic",rewardStars:3,goal:"20問を1回で全問正解",requireSession:true,candidates:[
   {category:"quiz_enja",count:20,required:20,rangeSize:20},
   {category:"quiz_jaen",count:20,required:20,rangeSize:20},
   {category:"audio_quiz",count:20,required:20,rangeSize:20}]},
  {slot:"idioms",title:"熟語マスター",group:"basic",rewardStars:2,goal:"15問中12問以上正解",requireSession:true,candidates:[
   {category:"idiom_quiz",count:15,required:12},
   {category:"paraphrase_quiz",count:15,required:12,description:"同義表現・言い換え（暫定）"}]},
  {slot:"exam",title:"大問別演習",group:"basic",rewardStars:3,goal:"10問中8問以上正解",requireSession:true,candidates:[
   {category:"sentence",count:10,required:8},
   {category:"paraphrase_quiz",count:10,required:8}]},
  {slot:"listening",title:"リスニングチャレンジ",group:"challenge",rewardStars:3,goal:"実装済み大問の1教材で80%以上",requireSession:true,candidates:[
   {category:"listening",count:null,requiredPercent:80,formatCandidates:[2,3,5]}]},
  {slot:"reading",title:"読解・会話チャレンジ",group:"challenge",rewardStars:3,goal:"大問7・8・10から1セットで80%以上",requireSession:true,candidates:[
   {category:"q7",page:"q7.html",count:5,required:4,levels:["1"]},
   {category:"dialogue8",count:null,requiredPercent:80},
   {category:"q10",count:null,requiredPercent:80}]},
  {slot:"reorder",title:"大問12チャレンジ",group:"challenge",rewardStars:3,goal:"5問中4問以上正解",requireSession:true,candidates:[
   {category:"reorder",count:5,required:4}]}
 ]});
})();
