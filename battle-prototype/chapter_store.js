(function(root){'use strict';
function validate(s,data){
 if(!s||s.version!==1||s.scriptVersion!==data.scriptVersion||!Number.isSafeInteger(s.revision)||s.revision<0||!Number.isInteger(s.scene)||s.scene<0||s.scene>=data.scenes.length||!Number.isInteger(s.line)||s.line<0||s.line>data.scenes[s.scene].lines.length||!['story','battle','gift','defeat','complete'].includes(s.mode)||!Array.isArray(s.read)||!Array.isArray(s.cleared)||typeof s.partnerId!=='string'||!s.tutorial)throw Error('セーブ形式を確認できません。元の記録は残しています。');
 const ids=new Set(data.scenes.flatMap(x=>x.lines.map(l=>l.id)));if(s.read.some(id=>!ids.has(id))||s.cleared.some(id=>![1,2,3,4,5,'mist'].includes(id)))throw Error('進行記録を確認できません');
 if((s.mode==='battle'||s.mode==='defeat')&&(!s.combat||!s.checkpoint))throw Error('戦闘の再開情報が不足しています');
 if(s.mode==='complete'&&!s.cleared.includes('mist'))throw Error('章完了の記録が一致しません');
 return s;
}
function create(storage,key,data){let last=storage.getItem(key);return {load(){return last?validate(JSON.parse(last),data):null;},save(s){if(storage.getItem(key)!==last)throw Error('別のタブで物語が更新されました。再読み込みしてください。');validate(s,data);const next={...s,revision:s.revision+1},raw=JSON.stringify(next);storage.setItem(key,raw);last=raw;s.revision=next.revision;},raw:()=>last};}
const api={validate,create};if(typeof module!=='undefined')module.exports=api;else root.GoimonChapterStore=api;
})(typeof window!=='undefined'?window:globalThis);
