/* Shared post-battle learning. Preserve every distinct missed question for in-quest review. */
(function(root){'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
const formats={word_meaning:'単語',audio_word_meaning:'音声→意味',idiom:'イディオム',q1:'アクセント',q3:'応答問題',q9:'短文空所補充',q11:'同意文完成',q12:'語句整序'};
function record(combat,q,correct,expired,explanation){
 const learn=combat.learning||(combat.learning={questions:[],misses:[]});
 if(correct)return;
 const identity=q.review+':'+q.reviewId;
 if(!learn.misses.some(m=>m.review+':'+m.reviewId===identity))learn.misses.push({prompt:q.prompt,answer:q.format==='q12'?q.answer.map(id=>q.chunks.find(c=>c.id===id)?.text||'').join(' '):q.answer,review:q.review,reviewId:q.reviewId});
 if(!learn.questions.some(x=>x.review+':'+x.reviewId===identity)){
  const snapshot={};for(const key of ['id','format','prompt','answer','choices','chunks','translation','audio','speech','review','reviewId','en','teaching'])if(q[key]!==undefined)snapshot[key]=clone(q[key]);
  snapshot.explanation=explanation?clone(explanation):null;learn.questions.push(snapshot);
 }
}

function recoveryClaimed(state){return (state.skillRecoveryClaimed||[]).includes(String(state.battleId));}
function recoveryActor(state){return state.combat?.winner==='player'?state.combat.player:state.checkpoint;}
function recoverySkills(state){
 if(!state?.combat?.ended||state.battleId===0||recoveryClaimed(state))return [];
 const actor=recoveryActor(state);
 return (actor?.skills||[]).filter(s=>Number.isFinite(s.left)&&Number.isFinite(s.maxUses)&&s.left<s.maxUses&&s.maxUses>0).map(s=>({id:s.id,name:s.name,left:s.left,maxUses:s.maxUses}));
}
function restoreSkill(state,id,save){
 if(!state?.combat?.ended||state.battleId===0||recoveryClaimed(state))throw Error('この戦闘の回復権は利用できません。');
 const actor=recoveryActor(state);
 const skill=actor?.skills?.find(s=>s.id===id&&Number.isFinite(s.left)&&Number.isFinite(s.maxUses)&&s.left<s.maxUses);
 if(!skill)throw Error('このSKILLは回復できません。');
 const previous=state.skillRecoveryClaimed;
 state.skillRecoveryClaimed=[...(previous||[]),String(state.battleId)];
 skill.left++;
 try{save();}catch(e){skill.left--;state.skillRecoveryClaimed=previous;throw e;}
 return skill;
}
function summary(combat){const log=(combat?.log||[]).filter(x=>typeof x.correct==='boolean');return {total:log.length,correct:log.filter(x=>x.correct).length,misses:combat?.learning?.misses||[],questions:combat?.learning?.questions||[]};}
function node(tag,text,parent,cls){const n=document.createElement(tag);n.textContent=text||'';if(cls)n.className=cls;if(parent)parent.append(n);return n;}
function focus(n){n.tabIndex=-1;n.focus({preventScroll:true});n.scrollIntoView?.({block:'nearest',behavior:'auto'});}
function showChoiceMeanings(parent,ex,order){
 if(!ex?.choiceMeanings?.length)return;
 node('h3','選択肢の意味',parent);
 const list=node('ol','',parent);
 const meanings=new Map(ex.choiceMeanings.map(({choice,meaning})=>[choice,meaning]));
 for(const choice of order||meanings.keys())node('li',choice+'：'+meanings.get(choice),list);
}
function choiceKey(button,index){
 const key=String(index+1);
 button.dataset.questChoiceKey=key;
 button.setAttribute('aria-keyshortcuts',key);
 return button;
}
function nextKey(button){
 button.dataset.questNextKey='';
 button.setAttribute('aria-keyshortcuts','Enter');
 return button;
}
function bindKeys(app){
 document.addEventListener('keydown',event=>{
  if(event.defaultPrevented||event.repeat||event.isComposing||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||document.querySelector('dialog[open]'))return;
  if(event.target.closest?.('input, select, textarea, [contenteditable]'))return;
  let button;
  if(/^[1-4]$/.test(event.key))button=app.querySelector('[data-quest-choice-key="'+event.key+'"]');
  else if(event.key==='Enter'&&!event.target.closest?.('button, a, summary'))button=app.querySelector('[data-quest-next-key], #next');
  if(!button||button.disabled||!button.getClientRects().length)return;
  event.preventDefault();
  button.click();
 });
}
function explain(parent,q){const ex=q.explanation;if(!ex)return;const d=node('details','',parent,'ql-explanation');node('summary','訳・解説を見る',d);for(const s of [ex.completed,ex.translation,...(ex.notes||[])].filter(Boolean))node('p',s,d);showChoiceMeanings(d,ex,[...q.choices||[]].reverse());}

const legacyFormats={'quiz.html':'word_meaning','audio_quiz.html':'audio_word_meaning','accent.html':'q1','listening.html':'q3','idiom_quiz.html':'idiom','sentence.html':'q9','paraphrase_quiz.html':'q11','reorder.html':'q12'};
function reviewGroups(combat,misses=[]){
 const s=summary(combat),snapshots=new Map(s.questions.map(q=>[(q.review||'')+':'+q.reviewId,q]));
 const items=[],seen=new Set();
 for(const m of [...s.misses,...misses]){
  const id=(m.review||'')+':'+m.reviewId;
  if(seen.has(id))continue;
  seen.add(id);
  const saved=snapshots.get(id);
  // Old saves kept only five full questions. Remaining questions can still be
  // reviewed as answer-reveal cards without pretending a self-check is graded.
  items.push(saved?{...saved,reviewKey:id}:{format:'legacy_card',originalFormat:legacyFormats[m.review]||'legacy_card',prompt:m.prompt,answer:m.answer,review:m.review,reviewId:m.reviewId,reviewKey:id});
 }
 const groups=new Map();
 for(const item of items){
  const format=item.format==='legacy_card'?item.originalFormat:item.format;
  if(!groups.has(format))groups.set(format,[]);
  groups.get(format).push(item);
 }
 return [...groups].map(([format,questions])=>({format,questions,label:formats[format]||'その他'}));
}
function result(parent,combat,{guard=fn=>fn,onContinue,continueLabel='物語の続きへ',misses=[],onAnswer,onSkillRestore,recoveryState,reviewProgress={}}={}){
 const options={guard,onContinue,continueLabel,misses,onAnswer,onSkillRestore,recoveryState};
 root.GoimonQuestQuestionAudio?.stop();parent.replaceChildren();
 const box=node('section','',parent,'quest-learning'),s=summary(combat),groups=reviewGroups(combat,misses);
 const total=groups.reduce((n,g)=>n+g.questions.length,0),done=Object.values(reviewProgress).reduce((n,x)=>n+x.answered,0),correct=Object.values(reviewProgress).reduce((n,x)=>n+x.correct,0);
 const gradedTotal=groups.reduce((n,g)=>n+g.questions.filter(q=>q.format!=='legacy_card').length,0);
 const allReviewed=total>0&&groups.every(g=>reviewProgress[g.format]?.answered===g.questions.length);
 const threshold=Math.min(3,gradedTotal);
 const earned=allReviewed&&gradedTotal>0&&correct>=threshold;
 const title=node('h2','戦闘の学習結果',box);node('p',s.total?s.correct+' / '+s.total+'問 正解':'以前の戦闘記録',box,'ql-score');
 node('p',total?'復習対象 '+total+'問 · 確認済み '+done+'問':s.total&&s.correct===s.total?'この戦闘はすべて正解！':'この戦闘の復習問題は保存されていません。',box,'ql-note');
 if(onAnswer)root.GoimonQuestGrowth?.note(box);
 if(groups.length){
  const section=node('section','',box,'ql-review-groups');
  node('h3','間違えた問題をまとめて復習',section);
  node('p','問題形式を選ぶと、この画面だけでその形式の全問題を続けて解けます。',section,'ql-note');
  for(const group of groups){
   const p=reviewProgress[group.format],finished=p?.answered===group.questions.length;
   const b=node('button',group.label+' · '+group.questions.length+'問'+(finished?'（復習済み）':''),section,'ql-group-button');
   b.type='button';
   b.onclick=guard(()=>practice(box,group.questions,{guard,onAnswer,onExit:progress=>{
    result(parent,combat,{...options,reviewProgress:{...reviewProgress,[group.format]:progress}});
   }}));
  }
 }
 const actions=node('div','',box,'ql-actions');
 const next=node('button',continueLabel,actions,groups.length?'':'ql-primary');next.type='button';
 let continued=false;next.onclick=guard(()=>{if(continued)return;try{onContinue();continued=true;next.disabled=true;}catch(e){continued=false;next.disabled=false;throw e;}});
 if(onSkillRestore&&recoveryState){
  const section=node('section','',box,'ql-skill-recovery'),claimed=recoveryClaimed(recoveryState),available=recoverySkills(recoveryState);
  node('h3','復習でSKILLを1回回復',section);
  if(claimed)node('p','この戦闘のSKILL回復は受け取り済みです。',section,'ql-note');
  else if(!available.length)node('p','回復できるSKILLはありません（すべて使用回数が満タンです）。',section,'ql-note');
  else if(!earned&&!(s.total>0&&s.correct===s.total)){
   const requirement=gradedTotal?gradedTotal<=3?'すべて正解':'3問以上正解':'保存されている問題を確認';
   node('p','全'+total+'問を復習し、採点できる問題で'+requirement+'すると回復できます。'+(gradedTotal<total?'旧記録の一部は答えの確認形式で、正解数には含みません。':''),section,'ql-note');
   if(!total)node('p','この記録には復習できる問題が保存されていません。',section,'ql-note');
  }else{
   node('p','回復するSKILLを1つ選ぼう。各SKILLの上限を超えて回復することはできません。',section,'ql-note');
   const choices=node('div','',section,'ql-recovery-choices');
   for(const skill of available){
    const b=node('button',skill.name+'（'+skill.left+'/'+skill.maxUses+'回 → '+(skill.left+1)+'/'+skill.maxUses+'回）',choices);
    b.type='button';b.onclick=guard(()=>{onSkillRestore(skill.id);result(parent,combat,{...options,reviewProgress});});
   }
  }
 }
 focus(title);return box;
}
function practice(box,questions,{guard=fn=>fn,onExit,onAnswer}={}){
 const queue=clone(questions),correctKeys=new Set(),answeredKeys=new Set();
 let index=0,graded=false,selection=[],closed=false;
 function action(label,fn,parent,primary=false){const b=node('button',label,parent,primary?'ql-primary':'');b.type='button';b.onclick=guard(()=>{if(!closed)fn();});return b;}
 function progress(){return {answered:answeredKeys.size,correct:correctKeys.size};}
 function exit(){if(closed)return;closed=true;root.GoimonQuestQuestionAudio?.stop();onExit(progress());}
 function render(){
  root.GoimonQuestQuestionAudio?.stop();box.replaceChildren();
  if(index>=queue.length){
   const result=progress(),title=node('h2','この形式の復習が完了！',box);
   node('p',result.correct+' / '+queue.filter(q=>q.format!=='legacy_card').length+'問 正解',box,'ql-score');
   node('p','間違えた問題は、同じ形式を選んで何度でも復習できます。',box);
   action('戦闘結果へ戻る',exit,box,true);focus(title);return;
  }
  graded=false;selection=[];
  const q=queue[index],key=q.reviewKey||q.review+':'+q.reviewId;
  node('p',(formats[q.originalFormat||q.format]||'復習')+' · '+(index+1)+' / '+queue.length+'問',box,'ql-note');
  const title=node('h2',q.prompt,box,'ql-prompt');
  if(q.format!=='legacy_card')root.GoimonQuestQuestionAudio?.mount(box,q);
  const controls=node('div','',box,'ql-answers'),feedback=node('div','',box);feedback.setAttribute('aria-live','polite');
  function grade(value){
   if(graded)return;
   const ok=root.GoimonChapterQuestions.correct(q,value);
   onAnswer?.(q,ok);
   graded=true;root.GoimonQuestQuestionAudio?.stop();
   answeredKeys.add(key);if(ok)correctKeys.add(key);
   controls.replaceChildren();
   const h=node('h3',ok?'正解！':'もう一度、確認しよう',feedback);
   const answer=q.format==='q12'?q.answer.map(id=>q.chunks.find(c=>c.id===id)?.text||'').join(' '):q.answer;
   node('p','正答：'+answer,feedback,'ql-answer');explain(feedback,q);
   nextKey(action(index+1===queue.length?'復習の結果へ':'次の問題へ',()=>{index++;render();},feedback,true));focus(h);
  }
  if(q.format==='legacy_card'){
   node('p','この問題は旧記録のため選択肢がありません。答えを確認してください。',controls,'ql-note');
   action('正答を確認する',()=>{
    if(graded)return;graded=true;answeredKeys.add(key);controls.replaceChildren();
    const h=node('h3','答えを確認',feedback);
    node('p','正答：'+q.answer,feedback,'ql-answer');
    nextKey(action(index+1===queue.length?'復習の結果へ':'次の問題へ',()=>{index++;render();},feedback,true));focus(h);
   },controls,true);
  }else if(q.format==='q12'){
   const actions=node('div','',controls,'ql-actions'),chosen=node('div','',controls,'ql-chosen'),options=node('div','',controls,'ql-options');chosen.setAttribute('aria-label','選んだ語句');
   const submit=action('答え合わせ',()=>grade([...selection]),actions,true);
   action('並びをリセット',()=>{selection=[];paint();},actions);
   const chunks=[...q.chunks].reverse();
   function paint(){chosen.replaceChildren();options.replaceChildren();for(const id of selection)action(q.chunks.find(c=>c.id===id).text,()=>{selection=selection.filter(x=>x!==id);paint();},chosen);for(const c of chunks){const b=action(c.text,()=>{selection.push(c.id);paint();},options);b.disabled=selection.includes(c.id);}submit.disabled=selection.length!==q.answer.length;}paint();
  }else{[...(q.choices||[])].reverse().forEach((value,index)=>choiceKey(action(value,()=>grade(value),controls),index));}
  action('戦闘結果へ戻る',exit,box);focus(title);
 }
 render();
}
function eligibility(parent){const details=node('details','',parent,'quest-eligibility');node('summary','参加条件と、進化したときのこと',details);node('p','参加できるのは、たまご・幼体・成長体です。',details);node('p','中級体に進化すると、冒険の途中でも参加できなくなります。育成・学習・既読・クリア記録は消えません。',details);node('p','保存箱などから参加できる相棒を選び、章の最初から再挑戦できます。編成の確定までは今の冒険を残します。',details);const a=node('a','育成・保存箱を確認',details);a.href='index.html?panel=goimon&manage=1';return details;}
const api={record,summary,result,practice,reviewGroups,eligibility,showChoiceMeanings,choiceKey,nextKey,bindKeys,recoverySkills,recoveryClaimed,restoreSkill};if(typeof module!=='undefined')module.exports=api;else root.GoimonQuestLearning=api;
})(typeof window!=='undefined'?window:globalThis);
