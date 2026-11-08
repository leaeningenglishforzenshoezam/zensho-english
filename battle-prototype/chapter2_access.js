// Read-only unlock rule. Replaying Chapter 1 does not revoke completion.
(function(root){'use strict';
function unlocked(storage,account,data,chapterStore){try{const key='goimon_chapter1_v1:'+(account||'guest')+':lv1';storage=root.GOIMONQuestStorage?.forKey(storage,key)||storage;const raw=storage.getItem(key);if(!raw||!data||!chapterStore)return false;const s=chapterStore.validate(JSON.parse(raw),data);return s.completed===true&&[1,2,3,4,5,'mist'].every(id=>s.cleared.includes(id));}catch{return false;}}
function current(){return unlocked(localStorage,root.GOIMONProfiles?.account||'guest',root.GoimonChapter1Data,root.GoimonChapterStore);}
const api={unlocked,current};if(typeof module!=='undefined')module.exports=api;else root.GoimonChapter2Access=api;
})(typeof window!=='undefined'?window:globalThis);
