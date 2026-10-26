// Uses the existing real question banks and strict SKILL format routing.
(function(root){'use strict';
const supported=['word_meaning','idiom','q9','q11','q12'];
function shuffle(a,rng){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function select(format,stage,data,bank,rng=Math.random,previous=''){
 if(!supported.includes(format))throw Error('この形式はまだ接続されていません。別のSKILLを選んでください。');
 if(format==='word_meaning'){const q=bank.select('単語',stage,data.words,data.idioms,rng,previous);if(!q)throw Error('単語データがありません');return {...q,format,prompt:q.en,answer:q.ja,choices:bank.options(q,stage,data.words,data.idioms,rng),review:'quiz.html',reviewId:q.no};}
 const source={idiom:data.idioms,q9:data.q9,q11:data.q11,q12:data.q12}[format]||[];
 const pool=source.filter(q=>format==='idiom'?q.expression&&q.paraphraseTo?.length:format==='q12'?q.chunks?.length&&q.answer?.length:format==='q11'?q.a&&q.b&&q.choices?.includes(q.answer):q.en&&q.choices?.includes(q.answer));
 if(!pool.length)throw Error('問題データがありません');
 const eligible=pool.length>1?pool.filter(q=>q.id!==previous):pool,q=eligible[Math.floor(rng()*eligible.length)];
 if(format==='q12')return {id:q.id,format,prompt:(q.stemBefore||'')+'（　）'+(q.stemAfter||''),chunks:shuffle(q.chunks,rng),answer:q.answer,translation:q.ja||'',review:'reorder.html',reviewId:q.id};
 if(format==='idiom'){const acceptable=new Set(q.paraphraseTo);const distractors=[...new Set(pool.flatMap(x=>x.paraphraseTo).filter(x=>!acceptable.has(x)))];if(distractors.length<3)throw Error('選択肢が不足しています');return {id:q.id,format,prompt:q.expression,answer:q.paraphraseTo[0],choices:shuffle([q.paraphraseTo[0],...shuffle(distractors,rng).slice(0,3)],rng),translation:q.ja,review:'idiom_quiz.html',reviewId:q.id};}
 return {id:q.id,format,prompt:format==='q11'?'文a：'+q.a+'\n\n文b：'+q.b:q.en,answer:q.answer,choices:shuffle(q.choices,rng),translation:q.ja||'',review:format==='q11'?'paraphrase_quiz.html':'sentence.html',reviewId:q.id};
}
function correct(q,value){return q.format==='q12'?Array.isArray(value)&&value.length===q.answer.length&&value.every((x,i)=>x===q.answer[i]):value===q.answer;}
const api={supported,select,correct};if(typeof module!=='undefined')module.exports=api;else root.GoimonChapterQuestions=api;
})(typeof window!=='undefined'?window:globalThis);
