// Chapter 3 opens only after Chapter 2 completion; old progress remains untouched.
(function(root){'use strict';
function unlocked(storage,account,data,progress){
 try{
  const key='goimon_chapter2_v1:'+(account||'guest')+':lv1';
  const source=root.GOIMONQuestStorage?.forKey(storage,key)||storage;
  const raw=source.getItem(key);
  if(!raw||!data||!progress)return false;
  const s=progress.validate(JSON.parse(raw),data);
  return s.completed===true&&data.battles.every(b=>s.cleared.includes(b.id));
 }catch{return false;}
}
function current(){return unlocked(localStorage,root.GOIMONProfiles?.account||'guest',root.GoimonChapter2Data,root.GoimonChapter2Progress);}
const api=Object.freeze({unlocked,current});
if(typeof module==='object'&&module.exports)module.exports=api;else root.GoimonChapter3Access=api;
})(typeof window!=='undefined'?window:globalThis);
