// Preserve the result before attempting account-scoped persistence. No reward grants.
(function(root){
 'use strict';
 const methods={goimon_daily_mission_latest_result_v1:'recordWordSession',goimon_daily_mission_latest_idiom_v1:'recordIdiomSession',goimon_daily_mission_latest_exam_v1:'recordExamSession',goimon_daily_mission_latest_reorder_v1:'recordReorderSession',goimon_daily_mission_latest_reading_v1:'recordReadingSet',goimon_daily_mission_latest_listening_v1:'recordListeningSession'};
 function store(key,raw){
  const payload=JSON.parse(raw); // Serialize once so the recovery copy and persisted record match.
  root.sessionStorage.setItem(key,raw);
  const result=root.GoimonDailyMissions?.[methods[key]]?.(payload);
  root.dispatchEvent(new CustomEvent('goimon-daily-result',{detail:result}));
  return result;
 }
 function show(key,payload,summary){
  let result;
  try{result=store(key,JSON.stringify(payload));}catch(error){console.warn('ミッション結果を保存できませんでした。',error);}
  let notice=summary.querySelector('.daily-mission-result');
  if(!notice){
   notice=root.document.createElement('p');
   notice.className='daily-mission-result';
   notice.setAttribute('role','status');
  }
  notice.textContent=result?.persisted
   ? (result.completed?'デイリーミッション達成！':'今回の結果を記録しました。ミッション達成には5問中4問以上の正解が必要です。')
   : 'ミッション結果を保存できませんでした。「今日のミッションへ戻る」から達成状況を確認してください。';
  summary.prepend(notice);
 }
 root.GoimonDailyResultStore=Object.freeze({store,show});
 if(new URLSearchParams(root.location.search).has('dailyMission')){
  const link=root.document.createElement('a');link.href='missions.html';link.textContent='今日のミッションへ戻る';
  link.style.cssText='display:block;margin:12px;padding:12px;text-align:center;background:#edf7f1;color:#195c45;border-radius:10px';
  root.document.body.prepend(link);
 }
})(window);
