/* Shared post-battle learning. Only bounded question snapshots are saved in combat.
 * Short practice is deliberately separate from combat, growth and reward transactions. */
(function(root){'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
const formats={word_meaning:'単語',idiom:'イディオム',q1:'アクセント',q3:'応答問題',q9:'短文空所補充',q11:'同意文完成',q12:'語句整序'};
function record(combat,q,correct,expired,explanation){
 const learn=combat.learning||(combat.learning={questions:[],misses:[]});
 if(correct)return;
 const identity=q.review+':'+q.reviewId;
 if(!learn.misses.some(m=>m.review+':'+m.reviewId===identity))learn.misses.push({prompt:q.prompt,answer:q.format==='q12'?q.answer.map(id=>q.chunks.find(c=>c.id===id)?.text||'').join(' '):q.answer,review:q.review,reviewId:q.reviewId});
 if(learn.questions.length<5&&!learn.questions.some(x=>x.review+':'+x.reviewId===identity)){
  const snapshot={};for(const key of ['id','format','prompt','answer','choices','chunks','translation','audio','speech','review','reviewId'])if(q[key]!==undefined)snapshot[key]=clone(q[key]);
  snapshot.explanation=explanation?clone(explanation):null;learn.questions.push(snapshot);
 }
}
function summary(combat){const log=(combat?.log||[]).filter(x=>typeof x.correct==='boolean');return {total:log.length,correct:log.filter(x=>x.correct).length,misses:combat?.learning?.misses||[],questions:combat?.learning?.questions||[]};}
function node(tag,text,parent,cls){const n=document.createElement(tag);n.textContent=text||'';if(cls)n.className=cls;if(parent)parent.append(n);return n;}
function focus(n){n.tabIndex=-1;n.focus({preventScroll:true});n.scrollIntoView?.({block:'nearest',behavior:'auto'});}
function explain(parent,q){const ex=q.explanation;if(!ex)return;const d=node('details','',parent,'ql-explanation');node('summary','訳・解説を見る',d);for(const s of [ex.completed,ex.translation,...(ex.notes||[])].filter(Boolean))node('p',s,d);}
function result(parent,combat,{guard=fn=>fn,onContinue,continueLabel='物語へ進む',misses=[]}={}){
 root.GoimonQuestQuestionAudio?.stop();parent.replaceChildren();
 const box=node('section','',parent,'quest-learning'),s=summary(combat),review=s.misses.length?s.misses:misses;
 const title=node('h2','今回の学び',box);node('p',s.total?s.correct+' / '+s.total+'問 正解':'以前の戦闘記録',box,'ql-score');
 node('p',review.length?'復習したい問題 '+review.length+'問':s.total&&s.correct===s.total?'この戦闘はすべて正解！':'この戦闘の復習問題は保存されていません。',box,'ql-note');
 const actions=node('div','',box,'ql-actions');
 if(s.questions.length){const b=node('button',s.questions.length+'問だけ再挑戦',actions,'ql-primary');b.type='button';b.onclick=guard(()=>practice(box,s.questions,{guard,onExit:()=>result(parent,combat,{guard,onContinue,continueLabel,misses})}));}
 const next=node('button',continueLabel,actions,s.questions.length?'':'ql-primary');next.type='button';let continued=false;next.onclick=guard(()=>{if(continued)return;continued=true;next.disabled=true;try{onContinue();}catch(e){continued=false;next.disabled=false;throw e;}});
 if(s.questions.length)node('p','時間制限なし・最大5問。冒険のHPや技の回数は変わりません。',box,'ql-note');
 if(review.length)root.GoimonQuestReview?.show(review,box);
 focus(title);return box;
}
function practice(box,questions,{guard=fn=>fn,onExit}={}){
 const queue=clone(questions).slice(0,5);let index=0,score=0,graded=false,selection=[],closed=false;
 function action(label,fn,parent,primary=false){const b=node('button',label,parent,primary?'ql-primary':'');b.type='button';b.onclick=guard(()=>{if(!closed)fn();});return b;}
 function exit(){if(closed)return;closed=true;root.GoimonQuestQuestionAudio?.stop();onExit();}
 function render(){root.GoimonQuestQuestionAudio?.stop();box.replaceChildren();
  if(index>=queue.length){const title=node('h2','復習、おつかれさま！',box);node('p',score+' / '+queue.length+'問 正解',box,'ql-score');node('p',score===queue.length?'さっきの問題、今度はできた！':'迷った問題は「苦手」に残して、また練習しよう。',box);action('戦闘結果へ戻る',exit,box,true);focus(title);return;}
  graded=false;selection=[];const q=queue[index];node('p','復習 '+(index+1)+' / '+queue.length+' · '+(formats[q.format]||''),box,'ql-note');
  const title=node('h2',q.prompt,box,'ql-prompt');node('p','時間制限なし · 復習練習（育成・報酬・学習集計への追加なし）',box,'ql-note');
  root.GoimonQuestQuestionAudio?.mount(box,q);
  const controls=node('div','',box,'ql-answers'),feedback=node('div','',box);feedback.setAttribute('aria-live','polite');
  function grade(value){if(graded)return;graded=true;root.GoimonQuestQuestionAudio?.stop();const ok=root.GoimonChapterQuestions.correct(q,value);if(ok)score++;controls.replaceChildren();const h=node('h3',ok?'正解！':'もう一度、確認しよう',feedback);const answer=q.format==='q12'?q.answer.map(id=>q.chunks.find(c=>c.id===id)?.text||'').join(' '):q.answer;node('p','正答：'+answer,feedback,'ql-answer');explain(feedback,q);action(index+1===queue.length?'復習の結果へ':'次の問題へ',()=>{index++;render();},feedback,true);focus(h);}
  if(q.format==='q12'){
   const actions=node('div','',controls,'ql-actions'),chosen=node('div','',controls,'ql-chosen'),options=node('div','',controls,'ql-options');chosen.setAttribute('aria-label','選んだ語句');
   const submit=action('答え合わせ',()=>grade([...selection]),actions,true);action('並びをリセット',()=>{selection=[];paint();},actions);
   const chunks=[...q.chunks].reverse();function paint(){chosen.replaceChildren();options.replaceChildren();for(const id of selection)action(q.chunks.find(c=>c.id===id).text,()=>{selection=selection.filter(x=>x!==id);paint();},chosen);for(const c of chunks){const b=action(c.text,()=>{selection.push(c.id);paint();},options);b.disabled=selection.includes(c.id);}submit.disabled=selection.length!==q.answer.length;}paint();
  }else{for(const value of [...(q.choices||[])].reverse())action(value,()=>grade(value),controls);}
  action('結果に戻る',exit,box);focus(title);
 }
 render();
}
function eligibility(parent){const details=node('details','',parent,'quest-eligibility');node('summary','参加条件と、進化したときのこと',details);node('p','参加できるのは、たまご・幼体・成長体です。',details);node('p','中級体に進化すると、冒険の途中でも参加できなくなります。育成・学習・既読・クリア記録は消えません。',details);node('p','保存箱などから参加できる相棒を選び、章の最初から再挑戦できます。編成の確定までは今の冒険を残します。',details);const a=node('a','育成・保存箱を確認',details);a.href='index.html?panel=goimon&manage=1';return details;}
const api={record,summary,result,practice,eligibility};if(typeof module!=='undefined')module.exports=api;else root.GoimonQuestLearning=api;
})(typeof window!=='undefined'?window:globalThis);
