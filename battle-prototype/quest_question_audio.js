/* One English voice at a time. Never change the user's BGM setting. */
(()=>{'use strict';let active=null,serial=0,release=null;
function stop(){serial++;if(active){if(active.pause)active.pause();else window.speechSynthesis?.cancel();active=null;}if(release){release();release=null;}}
function mount(parent,q){if(!q.audio&&!q.speech)return;const row=document.createElement('div'),button=document.createElement('button'),status=document.createElement('span');button.type='button';button.textContent='▶ 音声を聞く・もう一度';status.setAttribute('role','status');row.append(button,status);parent.append(row);
button.onclick=()=>{stop();const token=serial;release=window.GoimonQuestAudio?.suspend?.()||null;status.textContent='再生中';const done=error=>{if(token!==serial)return;active=null;if(release){release();release=null;}status.textContent=error?'再生できませんでした。もう一度お試しください。':'再生終了';};
try{if(q.audio){active=new Audio(q.audio);active.onended=()=>done(false);active.onerror=()=>done(true);active.play().catch(()=>done(true));}else{if(!window.speechSynthesis)throw Error('Speech unavailable');active=new SpeechSynthesisUtterance(q.speech);active.lang='en-US';active.rate=.9;active.onend=()=>done(false);active.onerror=()=>done(true);window.speechSynthesis.speak(active);}}catch{done(true);}};
const hint=document.createElement('p');hint.textContent='時間制限なし・音声中はBGMを停止';row.append(hint);}
window.addEventListener('pagehide',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.GoimonQuestQuestionAudio={mount,stop};})();
