(function(root){'use strict';
function validate(s,data){
 if(!s||s.version!==1||s.scriptVersion!==data.scriptVersion||!Number.isSafeInteger(s.revision)||s.revision<0||!Number.isInteger(s.scene)||s.scene<0||s.scene>=data.scenes.length||!Number.isInteger(s.line)||s.line<0||s.line>data.scenes[s.scene].lines.length||!['story','battle','gift','defeat','complete'].includes(s.mode)||!Array.isArray(s.read)||!Array.isArray(s.cleared)||typeof s.partnerId!=='string'||!s.tutorial)throw Error('セーブ形式を確認できません。元の記録は残しています。');
 const ids=new Set(data.scenes.flatMap(x=>x.lines.map(l=>l.id)));if(s.read.some(id=>!ids.has(id))||s.cleared.some(id=>![1,2,3,4,5,'mist'].includes(id)))throw Error('進行記録を確認できません');
 if((s.mode==='battle'||s.mode==='defeat')&&(!s.combat||!s.checkpoint))throw Error('戦闘の再開情報が不足しています');
 if(s.mode==='complete'&&!s.cleared.includes('mist'))throw Error('章完了の記録が一致しません');
 return s;
}
function create(storage,key,data){storage=root.GOIMONQuestStorage?.forKey(storage,key)||storage;let last=storage.getItem(key);return {load(){return last?validate(JSON.parse(last),data):null;},save(s){if(storage.getItem(key)!==last)throw Error('別のタブで物語が更新されました。再読み込みしてください。');validate(s,data);const next={...s,revision:s.revision+1},raw=JSON.stringify(next);storage.setItem(key,raw);last=raw;s.revision=next.revision;},raw:()=>last};}
// The chapter save carries individual IDs through restarts and cloud transfers.
function growthParticipants(state){
 const ids=new Set(Array.isArray(state?.growthParticipants)?state.growthParticipants:[]);
 if(state?.pet?.stage==='growth'&&state.pet.id===state.partnerId)ids.add(state.partnerId);
 return ids;
}
function rememberParticipation(next,previous,live){
 const ids=growthParticipants(previous);
 for(const id of growthParticipants(next))ids.add(id);
 if(live?.stage==='growth'&&live.id===next.partnerId)ids.add(live.id);
 next.growthParticipants=[...ids];
}
function eligibleForLevel(p,level){
 if(!p)return false;
 if(['egg','child','growth'].includes(p.stage))return true;
 if(p.stage!=='mid'||!p.id||String(level)!=='1')return false;
 const storage=root.GoimonDeveloper?.storage||root.GOIMONQuestStorage?.source;
 if(!storage)return false;
 const owner=root.GOIMONProfiles?.account||'guest',suffix=root.GoimonDeveloper?.keySuffix||'';
 return [1,2].some(chapter=>{
  const key='goimon_chapter'+chapter+'_v1:'+owner+':lv1'+suffix;
  const raw=(root.GOIMONQuestStorage?.forKey(storage,key)||storage).getItem(key);
  if(!raw)return false;
  try{return growthParticipants(JSON.parse(raw)).has(p.id);}catch{return false;}
 });
}
function eligible(p){return eligibleForLevel(p,'1');}
function assertEligible(p){if(!eligible(p))throw Error('参加できる相棒を選んでください。中級体は成長体での参加記録が必要です。');}
function restart(previous,data,next){validate(previous,data);assertEligible(next.pet);const copy=x=>JSON.parse(JSON.stringify(x));next.revision=previous.revision;next.read=copy(previous.read);next.cleared=copy(previous.cleared);next.completed=!!previous.completed;next.allMisses=copy(previous.allMisses||previous.misses||[]);
 // Repeat practice, but retain the one-time practice gift and its equipment.
 for(const k of ['claimed','shards','item','equipped','complete'])if(previous.tutorial[k]!==undefined)next.tutorial[k]=copy(previous.tutorial[k]);
 return validate(next,data);}
const api={validate,create,eligible,eligibleForLevel,rememberParticipation,assertEligible,restart};if(typeof module!=='undefined')module.exports=api;else root.GoimonChapterStore=api;
})(typeof window!=='undefined'?window:globalThis);
