/* Temporary owner-private Site test mode. Never grant real inventory or progress. */
(()=>{'use strict';const allowed=['terminal.local','localhost','127.0.0.1','goimon-chapter1-playtest-oct19.speedydove1024.chatgpt.site'].includes(location.hostname);let config=null;try{config=JSON.parse(sessionStorage.getItem('goimon_dev_config')||'null');}catch{}
const active=allowed&&new URLSearchParams(location.search).get('dev')==='1'&&!!config?.token;
const pet=active?{id:'developer-partner',type:config.type,stage:config.stage,stats:{chie:0,kotoba:0,bunmyaku:0,onkan:0}}:null;
function inventory(catalog){return {owned:{skills:Object.fromEntries(catalog.skills.map(s=>[s.id,1])),gear:Object.fromEntries(catalog.gear.map(g=>[g.id,1]))},loadouts:{'developer-partner':{skillIds:config.skills,gearId:'none'}}};}
window.GoimonDeveloper={allowed,active,pet,inventory,keySuffix:active?':developer:'+config.token:'',storage:active?sessionStorage:localStorage};
if(active){document.addEventListener('DOMContentLoaded',()=>{const p=document.createElement('p');p.textContent='開発者用 · 仮の相棒・技／通常の記録や所持品には反映しません';p.style.cssText='background:#eedfa5;color:#173c2d;padding:12px;text-align:center;margin:0';const a=document.createElement('a');a.href='quest_developer.html';a.textContent='　編成を選び直す';p.append(a);document.body.prepend(p);});}
})();
