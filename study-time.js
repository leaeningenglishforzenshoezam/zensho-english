// Active learning-page time, stored locally in batches. No network timer.
(()=>{'use strict';if(window.GoimonStudyTime||!window.ZenshoLearningLog)return;
const L=ZenshoLearningLog,account=window.GOIMONProfiles?.account||'guest',page=location.pathname.split('/').pop(),map={'quiz.html':'quiz_enja','quiz_jaen.html':'quiz_jaen','audio_quiz.html':'audio_quiz','study.html':'study','accent.html':'accent','idiom_quiz.html':'idiom_quiz','sentence.html':'sentence','paraphrase_quiz.html':'paraphrase_quiz','reorder.html':'reorder','g2q11.html':'q11_grammar','listening.html':'listening','q7.html':'q7','q10.html':'q10','dialogue.html':'dialogue8'};
let category=map[page],level=L.getLevel(),active=false,last=Date.now(),touched=0,visible=!document.hidden;
const batches=new Map(),dayOf=ms=>new Date(ms+9*3600000).toISOString().slice(0,10);
function writable(){return (window.GOIMONProfiles?.account||'guest')===account&&(localStorage.getItem('goimon_cloud_v2:active')||'guest')===account&&(account==='guest'||window.GOIMONProfiles?.isWriter?.()!==false);}
function flush(){if(!writable())return;for(const [key,b] of batches){try{if(L.addTime(b.category,b.seconds,b.level,b.day))batches.delete(key);}catch{/* Retain this batch for retry, without writing it to another account. */}}}
function tick(){const now=Date.now();if(active&&visible&&writable()&&category){const end=Math.min(now,touched+120000);let start=Math.max(last,end-15000);while(start<end){const day=dayOf(start),edge=Date.parse(day+'T00:00:00+09:00')+86400000,stop=Math.min(end,edge),key=[level,category,day].join(':');const b=batches.get(key)||{category,level,day,seconds:0};b.seconds+=(stop-start)/1000;batches.set(key,b);start=stop;}}last=now;if([...batches.values()].reduce((n,b)=>n+b.seconds,0)>=15)flush();}
function touch(e){if(!category||document.hidden||e.target?.closest?.('#goimon-navigation,dialog,header,a'))return;tick();touched=Date.now();active=true;}
function begin(next,lv){tick();flush();category=next;level=String(lv||L.getLevel());last=touched=Date.now();active=true;}
function end(){tick();flush();active=false;}
window.GoimonStudyTime={begin,end,flush};
if(map[page])for(const event of ['pointerdown','keydown','input','scroll'])document.addEventListener(event,touch,{passive:true});
document.addEventListener('visibilitychange',()=>{tick();flush();visible=!document.hidden;last=Date.now();if(visible){touched=last;}});
window.addEventListener('pagehide',end);setInterval(tick,5000);
})();
