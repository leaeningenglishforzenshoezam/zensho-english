// Site audio/navigation adapter; chapter selection uses the shared hub.
(()=>{'use strict';if(!location.pathname.includes('quest_chapter2'))return;
const link=document.getElementById('quest-home-link');if(link){link.href='quest_home.html?chapter=chapter2';link.textContent='‹ クエスト';}
const audio=document.createElement('script');audio.src='battle-prototype/quest_audio.js';audio.onload=()=>{const s=window.GoimonChapter2?.snapshot();window.GoimonQuestAudio?.setMode(s?.mode==='story'?'story':s?.mode==='battle'?(s.battleId===9?'boss':s.battleId===1||s.battleId===8?'blackfog':'battle'):'setup');};document.head.append(audio);
})();
