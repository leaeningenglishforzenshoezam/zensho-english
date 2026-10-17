(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.GoimonQuestQuestionBank=api;})(typeof window==='object'?window:globalThis,()=>{'use strict';
const ranges=[[1,50],[51,100],[101,150],[151,200],[201,300]];
function allWords(words){return (Array.isArray(words)?words:[]).map((w,i)=>({kind:'単語',en:w.en,ja:w.ja,no:i+1,id:'word_1kyu_'+String(i+1).padStart(3,'0')})).filter(q=>typeof q.en==='string'&&q.en.trim()&&typeof q.ja==='string'&&q.ja.trim());}
function allIdioms(idioms){return (Array.isArray(idioms)?idioms:[]).map((w,i)=>({kind:'熟語',en:w.expression,ja:w.ja,id:w.id||'idiom_'+i})).filter(q=>typeof q.en==='string'&&q.en.trim()&&typeof q.ja==='string'&&q.ja.trim());}
function pool(kind,stage,words,idioms){
 if(kind==='熟語')return allIdioms(idioms);
 const scope=ranges[stage-1];const full=allWords(words);
 return scope?full.filter(q=>q.no>=scope[0]&&q.no<=scope[1]):full;
}
function select(kind,stage,words,idioms,random=Math.random,previousId=''){
 const p=pool(kind,stage,words,idioms);
 const eligible=p.length>1?p.filter(q=>q.id!==previousId):p;
 if(!eligible.length)return null;
 const r=random();const index=Math.min(eligible.length-1,Math.max(0,Math.floor((Number.isFinite(r)?r:0)*eligible.length)));
 return eligible[index];
}
function options(chosen,stage,words,idioms,random=Math.random){
 const candidates=pool(chosen.kind,stage,words,idioms);
 // An identical Japanese gloss must not be offered as a distractor.
 const unique=[...new Set(candidates.filter(q=>q.id!==chosen.id&&q.ja!==chosen.ja).map(q=>q.ja))];
 for(let i=unique.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[unique[i],unique[j]]=[unique[j],unique[i]];}
 const result=[chosen.ja,...unique.slice(0,3)];
 for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
 return result;
}
return {ranges,allWords,allIdioms,pool,select,options};
});
