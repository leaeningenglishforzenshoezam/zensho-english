// Uses the existing real question banks and strict SKILL format routing.
(function(root){'use strict';
const supported=['word_meaning','idiom','q1','q3','q9','q11','q12'];
function shuffle(a,rng){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function select(format,stage,data,bank,rng=Math.random,previous=''){
 if(!supported.includes(format))throw Error('この形式はまだ接続されていません。別のSKILLを選んでください。');
 if(format==='q1'||format==='q3'){
  const pool=(data[format]||[]).filter(q=>format==='q1'?q.sylRaw&&q.stress>=1:q.audioFile&&q.choices?.some(c=>c.id===q.answerId));
  const eligible=pool.filter(q=>(format==='q1'?'accent_'+q.no:q.id)!==previous);const choices=eligible.length?eligible:pool;if(!choices.length)throw Error('音声問題データがありません');const q=choices[Math.floor(rng()*choices.length)];
  if(format==='q1')return {id:'accent_'+q.no,format,prompt:q.sylRaw.replace(/[ˈˌ]/g,''),answer:'第'+Math.min(4,q.stress)+'音節',choices:[1,2,3,4].map(n=>'第'+n+'音節'),speech:q.en,translation:q.ja,teaching:q.note||'',completed:q.sylRaw,review:'accent.html',reviewId:String(q.no)};
  return {id:q.id,format,prompt:'音声を聞き、最も適切な応答を選ぼう。',answer:q.choices.find(c=>c.id===q.answerId).text,choices:shuffle(q.choices.map(c=>c.text),rng),audio:q.audioFile,translation:q.scriptJa,teaching:q.explanation,completed:q.script,review:'listening.html',reviewId:q.id};
 }
 if(format==='word_meaning'){const q=bank.select('単語',stage,data.words,data.idioms,rng,previous);if(!q)throw Error('単語データがありません');return {...q,format,prompt:q.en,answer:q.ja,choices:bank.options(q,stage,data.words,data.idioms,rng),review:'quiz.html',reviewId:q.no};}
 let source={idiom:data.idioms,q9:data.q9,q11:data.q11,q12:data.q12}[format]||[];
 if(format==='idiom'&&stage?.idioms)source=source.slice(stage.idioms[0]-1,stage.idioms[1]);
 const pool=source.filter(q=>format==='idiom'?q.expression&&q.paraphraseTo?.length:format==='q12'?q.chunks?.length&&q.answer?.length:format==='q11'?q.a&&q.b&&q.choices?.includes(q.answer):q.en&&q.choices?.includes(q.answer));
 if(!pool.length)throw Error('問題データがありません');
 const eligible=pool.length>1?pool.filter(q=>q.id!==previous):pool,q=eligible[Math.floor(rng()*eligible.length)];
 if(format==='q12')return {id:q.id,format,prompt:(q.stemBefore||'')+'（　）'+(q.stemAfter||''),chunks:shuffle(q.chunks,rng),answer:q.answer,translation:q.ja||'',review:'reorder.html',reviewId:q.id};
 if(format==='idiom'){const acceptable=new Set(q.paraphraseTo);const distractors=[...new Set(pool.flatMap(x=>x.paraphraseTo).filter(x=>!acceptable.has(x)))];if(distractors.length<3)throw Error('選択肢が不足しています');return {id:q.id,format,prompt:q.expression,answer:q.paraphraseTo[0],choices:shuffle([q.paraphraseTo[0],...shuffle(distractors,rng).slice(0,3)],rng),translation:q.ja,review:'idiom_quiz.html',reviewId:q.id};}
 return {id:q.id,format,prompt:format==='q11'?'文a：'+q.a+'\n\n文b：'+q.b:q.en,answer:q.answer,choices:shuffle(q.choices,rng),translation:q.ja||'',review:format==='q11'?'paraphrase_quiz.html':'sentence.html',reviewId:q.id};
}
function correct(q,value){return q.format==='q12'?Array.isArray(value)&&value.length===q.answer.length&&value.every((x,i)=>x===q.answer[i]):value===q.answer;}
const sentenceMeaningFallback = {
  "passport": "旅券、パスポート",
  "postpone": "延期する",
  "biological": "生物学の、生物学的な",
  "gratitude": "感謝",
  "fresh": "新鮮な、新しい",
  "volume": "量、容積、巻",
  "omitted": "省いた、省略した",
  "rubbish": "ごみ、くだらないもの",
  "smile": "ほほ笑む、ほほ笑み",
  "temporary": "一時的な",
  "toward": "～の方へ、～に向かって",
  "stone": "石"
};
  const IRREGULAR = new Map([
    ["bound", "bind"], ["woven", "weave"], ["wove", "weave"], ["occurred", "occur"],
    ["written", "write"], ["wrote", "write"], ["drove", "drive"], ["driven", "drive"],
    ["spoken", "speak"], ["spoke", "speak"], ["broken", "break"], ["broke", "break"],
    ["taken", "take"], ["took", "take"], ["dropped", "drop"], ["given", "give"], ["gave", "give"],
    ["stirred", "stir"], ["made", "make"], ["ran", "run"], ["gone", "go"], ["went", "go"],
    ["seen", "see"], ["saw", "see"], ["known", "know"], ["knew", "know"], ["felt", "feel"],
    ["left", "leave"], ["lost", "lose"], ["paid", "pay"], ["kept", "keep"], ["held", "hold"],
    ["built", "build"], ["bought", "buy"], ["caught", "catch"], ["taught", "teach"],
    ["thought", "think"], ["found", "find"], ["said", "say"], ["sent", "send"], ["spent", "spend"],
    ["stood", "stand"], ["told", "tell"], ["understood", "understand"], ["worn", "wear"],
    ["wore", "wear"], ["cut", "cut"], ["put", "put"], ["set", "set"], ["hit", "hit"], ["hurt", "hurt"]
  ]);

  function CAZ(x) {
    return String(x || "").trim().toLowerCase().replace(/[^a-z]/g, "");
  }

  function guessBaseForms(w) {
    const s = CAZ(w);
    const cand = [];
    if (!s) return cand;

    const irr = IRREGULAR.get(s);
    if (irr) cand.push(irr);

    cand.push(s);

    if (s.endsWith("ied")) cand.push(s.slice(0, -3) + "y");
    if (s.endsWith("ed")) cand.push(s.slice(0, -2));
    if (s.endsWith("ed")) cand.push(s.slice(0, -1));

    if (s.endsWith("ing")) cand.push(s.slice(0, -3));
    if (s.endsWith("ing")) cand.push(s.slice(0, -3) + "e");

    if (s.endsWith("ies")) cand.push(s.slice(0, -3) + "y");
    if (s.endsWith("es")) cand.push(s.slice(0, -2));
    if (s.endsWith("s")) cand.push(s.slice(0, -1));

    return Array.from(new Set(cand)).filter(Boolean);
  }

  function meaningForForm(word, lookupMeaningBase) {
    const w = CAZ(word);
    if (!w) return "(未登録)";

    const direct = lookupMeaningBase(w);
    if (direct) return direct;

    const bases = guessBaseForms(w);
    for (const b of bases) {
      const m = lookupMeaningBase(b);
      if (m) return (b === w) ? m : `${m}（= ${b}）`;
    }
    return "(未登録)";
  }
function explain(q,data){

 if(q.format==='q1'||q.format==='q3')return {format:q.format,completed:q.completed,translation:q.translation,notes:q.teaching?[q.teaching]:[]};
 const source={word_meaning:data.words,idiom:data.idioms,q9:data.q9,q11:data.q11,q12:data.q12}[q.format]||[];
 const original=(q.id!=null?source.find(x=>x.id===q.id):null)||(q.format==='word_meaning'?source.find(x=>x.en===(q.en||q.prompt)):null)||q;
 const notes=[];let completed='',translation=original.ja||q.translation||'';
 const fill=(value,answer)=>String(value||'').replace(/（\s*）|\(\s*\)|_{2,}/g,answer);
 if(q.format==='q9')completed=fill(q.prompt,q.answer);
 if(q.format==='q11'){
  completed='文a：'+(original.a||'')+'\n文b：'+fill(original.b||q.prompt,q.answer);
  if(original.pointA&&original.pointB)notes.push('言い換え：'+original.pointA+' → '+original.pointB);
  if(original.pointNote)notes.push(original.pointNote);
 }
 if(q.format==='q12'){
  const ordered=q.answer.map(id=>q.chunks.find(c=>c.id===id)?.text||'').join(' ');
  completed=original.completed||fill(q.prompt,ordered);
  if(Array.isArray(original.grammarFocus))notes.push(...original.grammarFocus);
 }
 for(const note of [original.note,original.explanation])if(typeof note==='string'&&note.trim()&&!notes.includes(note))notes.push(note);
 // No filler explanation that simply repeats the answer. Preserve authored teaching notes.
 if(q.format==='word_meaning'||q.format==='idiom'){
  if(!notes.length)return null;
  completed=q.en||q.prompt;
 }
 if(!completed&&!translation&&!notes.length)return null;
 const explanation={format:q.format,completed,translation,notes};
 if(q.format==='q9'){
  const meanings=new Map();
  for(const item of [...(data.words||[]),...(data.words2||[]),...(data.extraWords||[])]){
   const key=CAZ(item.en);
   if(key&&item.ja&&!meanings.has(key))meanings.set(key,item.ja);
  }
  explanation.choiceMeanings=q.choices.map(choice=>({
   choice, meaning:meaningForForm(choice,key=>meanings.get(key)||Object.prototype.hasOwnProperty.call(sentenceMeaningFallback,key)&&sentenceMeaningFallback[key])
  }));
 }
 return explanation;
}
const api={supported,select,correct,explain};if(typeof module!=='undefined')module.exports=api;else root.GoimonChapterQuestions=api;
})(typeof window!=='undefined'?window:globalThis);
