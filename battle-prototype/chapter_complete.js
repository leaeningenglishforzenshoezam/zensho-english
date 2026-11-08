(function(root){'use strict';
// Shared, presentation-only completion actions. All writes stay with each chapter's guarded handlers.
function mount(parent,{history,restart,restartLabel,home}){
 const actions=document.createElement('div');actions.className='actions';
 for(const [label,handler,primary] of [['物語を読み返す',history,true],[restartLabel,restart,false]]){
  const button=document.createElement('button');button.textContent=label;if(primary)button.className='primary';button.onclick=handler;actions.append(button);
 }
 const link=document.createElement('a');link.className='button link';link.href=home;link.textContent='クエストホームへ';actions.append(link);parent.append(actions);
}
root.GoimonChapterComplete=Object.freeze({mount});
})(typeof window!=='undefined'?window:globalThis);
