(() => {'use strict';
const $=id=>document.getElementById(id),engine=window.GoimonDailyMissions,bridge=window.GoimonMissionBridge,level=$('missionLevel');
level.value=GOIMONStorage.getItem('zensho_level_v1')==='2'?'2':'1';
const resultTypes=[['result','recordWordSession'],['idiom','recordIdiomSession'],['exam','recordExamSession'],['reorder','recordReorderSession'],['reading','recordReadingSet'],['listening','recordListeningSession']];
function importResults(){
 const account=localStorage.getItem('goimon_cloud_v2:active')||'guest';
 if(account!=='guest'&&!window.GOIMONProfiles?.isWriter?.())return;
 for(const [suffix,method] of resultTypes){const key='goimon_daily_mission_latest_'+suffix+'_v1';let raw;try{raw=JSON.parse(sessionStorage.getItem(key)||'null');}catch{continue;}
  if(!raw||raw.level!==level.value||raw.day!==engine.dateKey()||raw.missionAccount!==account)continue;
  const result=engine[method](raw);if(result?.valid&&result.persisted)sessionStorage.removeItem(key);
 }
}
function launch(m,s){
 if(m.slot==='words'){const result=bridge.getWordMissionLaunch(m);return result?.ready?result.url+'&missionDate='+encodeURIComponent(s.date):null;}
 if(m.slot==='idioms'){const range=engine.selectIdiomModeRange(s.level,s.date,'synonym');return 'idiom_quiz.html?dailyMission=idioms&idiomMode=synonym&missionDate='+encodeURIComponent(s.date)+'&start='+range.rangeStart+'&end='+range.rangeEnd;}
 if(m.slot==='exam')return (m.category==='sentence'?'sentence.html':'paraphrase_quiz.html')+'?dailyMission=exam&missionDate='+encodeURIComponent(s.date);
 if(m.slot==='reorder')return 'reorder.html?dailyMission=reorder&missionDate='+encodeURIComponent(s.date);
 if(m.slot==='reading'){
  const entries=m.category==='q7'?(window.q7Sets||[]):m.category==='dialogue8'?(typeof dialogueQuestions!=='undefined'?dialogueQuestions:[]):(typeof q10Questions!=='undefined'?q10Questions:[]);
  const id=engine.assignDailyReadingSet(s.level,m.category,entries.map(x=>String(x.id)),s.date);
  if(id)return (m.category==='q7'?'q7.html':m.category==='dialogue8'?'dialogue.html':'q10.html')+'?dailyMission=reading&setId='+encodeURIComponent(id)+'&missionDate='+encodeURIComponent(s.date);
 }
 if(m.slot==='listening')return 'listening.html?dailyMission=listening&format='+encodeURIComponent(m.format||2)+'&missionDate='+encodeURIComponent(s.date);
 return null;
}
function text(tag,value,parent){const el=document.createElement(tag);el.textContent=value;parent.append(el);return el;}
function render(){try{
 importResults();const s=engine.getStatus(level.value);$('missionStatus').textContent=s.date+' · '+s.completedCount+' / '+s.missions.length+' 達成';$('missionCards').replaceChildren();$('missionMessage').textContent='';
 for(const m of s.missions){const card=document.createElement('section');card.className='card';text('p',m.completed?'✓ 達成済み':m.available?'挑戦できます':'準備中',card);text('h2',m.title||m.slot,card);text('p',m.goal,card);if(m.rangeStart)text('p','No. '+m.rangeStart+'〜'+m.rangeEnd,card);text('p','クリア報酬：星のかけら '+m.rewardStars+'個（付与準備中）',card);
  const href=m.available?launch(m,s):null;if(href){const a=text('a',m.completed?'もう一度練習する':'挑戦する',card);a.href=href;a.className='btn';a.onclick=()=>{GOIMONStorage.setItem('zensho_level_v1',level.value);sessionStorage.setItem('goimon_daily_mission_launch_account_v1',localStorage.getItem('goimon_cloud_v2:active')||'guest');};} $('missionCards').append(card);
 }
}catch(e){$('missionMessage').textContent=e.message;}}
level.onchange=()=>{GOIMONStorage.setItem('zensho_level_v1',level.value);render();};window.addEventListener('pageshow',render);window.addEventListener('goimon-storage-ready',render);render();
})();
