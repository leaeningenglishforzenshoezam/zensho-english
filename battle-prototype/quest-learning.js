/* Shared post-battle learning. Only bounded question snapshots are saved in combat.
 * Short practice is separate from combat; optional learning writes go through the caller. */
(function(root){'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
const formats={word_meaning:'単語',audio_word_meaning:'音声→意味',idiom:'イディオム',q1:'アクセント',q3:'応答問題',q9:'短文空所補充',q11:'同意文完成',q12:'語句整序'};
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
function result(parent,combat,{guard=fn=>fn,onContinue,continueLabel='物語の続きへ',misses=[],onAnswer,onSkillRestore,recoveryState,unlocked=false}={}){
 const resultOptions={guard,onContinue,continueLabel,misses,onAnswer,onSkillRestore,recoveryState};

 root.GoimonQuestQuestionAudio?.stop();parent.replaceChildren();
 const box=node('section','',parent,'quest-learning'),s=summary(combat),review=s.misses.length?s.misses:misses;
 const title=node('h2','戦闘の学習結果',box);node('p',s.total?s.correct+' / '+s.total+'問 正解':'以前の戦闘記録',box,'ql-score');
 node('p',review.length?'復習したい問題 '+review.length+'問':s.total&&s.correct===s.total?'この戦闘はすべて正解！':'この戦闘の復習問題は保存されていません。',box,'ql-note');
 if(onAnswer)root.GoimonQuestGrowth?.note(box);
 const actions=node('div','',box,'ql-actions');
 if(s.questions.length){const b=node('button',s.questions.length+'問だけ再挑戦',actions,'ql-primary');b.type='button';b.onclick=guard(()=>practice(box,s.questions,{guard,onAnswer,onExit:score=>result(parent,combat,{...resultOptions,unlocked:unlocked||score>=Math.min(3,s.questions.length)})}));}
 const next=node('button',continueLabel,actions,s.questions.length?'':'ql-primary');next.type='button';let continued=false;next.onclick=guard(()=>{if(continued)return;try{onContinue();continued=true;next.disabled=true;}catch(e){continued=false;next.disabled=false;throw e;}});
 if(s.questions.length)node('p','間違えた問題から最大5問。時間制限なしで練習できます。',box,'ql-note');
 if(onSkillRestore&&recoveryState){
  const section=node('section','',box,'ql-skill-recovery'),claimed=recoveryClaimed(recoveryState),available=recoverySkills(recoveryState);
  node('h3','復習でSKILLを1回回復',section);
  if(claimed)node('p','この戦闘のSKILL回復は受け取り済みです。',section,'ql-note');
  else if(!available.length)node('p','回復できるSKILLはありません（すべて使用回数が満タンです）。',section,'ql-note');
  else if(!unlocked&&!(s.total>0&&s.correct===s.total)){
   node('p','復習で'+Math.min(3,s.questions.length)+'問正解すると、好きなSKILLを1回回復できます。全問正解なら復習不要です。',section,'ql-note');
   if(!s.questions.length)node('p','この記録には復習できる問題が保存されていません。',section,'ql-note');
  }else{
   node('p','回復するSKILLを1つ選ぼう。各SKILLの上限を超えて回復することはできません。',section,'ql-note');
   const choices=node('div','',section,'ql-recovery-choices');
   for(const skill of available){
    const b=node('button',skill.name+'（'+skill.left+'/'+skill.maxUses+'回 → '+(skill.left+1)+'/'+skill.maxUses+'回）',choices);
    b.type='button';
    b.onclick=guard(()=>{onSkillRestore(skill.id);result(parent,combat,{...resultOptions,unlocked:true});});
   }
  }
 }
 if(review.length){try{root.GoimonQuestReview?.show(review,box);}catch(e){console.warn('復習一覧を表示できませんでした',e);node('p','復習一覧の一部を読み込めませんでした。戦闘の再挑戦はできます。',box,'ql-note');}}
 focus(title);return box;
}
function practice(box,questions,{guard=fn=>fn,onExit,onAnswer}={}){
 const queue=clone(questions).slice(0,5);let index=0,score=0,graded=false,selection=[],closed=false;
 function action(label,fn,parent,primary=false){const b=node('button',label,parent,primary?'ql-primary':'');b.type='button';b.onclick=guard(()=>{if(!closed)fn();});return b;}
 function exit(){if(closed)return;closed=true;root.GoimonQuestQuestionAudio?.stop();onExit(score);}
 function render(){root.GoimonQuestQuestionAudio?.stop();box.replaceChildren();
  if(index>=queue.length){const title=node('h2','復習、おつかれさま！',box);node('p',score+' / '+queue.length+'問 正解',box,'ql-score');node('p',score===queue.length?'さっきの問題、今度はできた！':'迷った問題は「苦手」に残して、また練習しよう。',box);action('戦闘結果へ戻る',exit,box,true);focus(title);return;}
  graded=false;selection=[];const q=queue[index];node('p','復習 '+(index+1)+' / '+queue.length+' · '+(formats[q.format]||''),box,'ql-note');
  const instructions={q1:'最も強く読む音節を選ぼう',q3:'音声を聞いて、合う応答を選ぼう',q9:'空所に入る語句を選ぼう',q11:'文aと文bが同じ意味になる語句を選ぼう',q12:'語句を正しい順番に並べよう',idiom:'同じ意味の表現を選ぼう',word_meaning:'英語の意味を選ぼう',audio_word_meaning:'音声を聞いて意味を選ぼう'};
  node('p',instructions[q.format]||'',box,'ql-note');
  const title=node('h2',q.prompt,box,'ql-prompt');
  root.GoimonQuestQuestionAudio?.mount(box,q);
  const controls=node('div','',box,'ql-answers'),feedback=node('div','',box);feedback.setAttribute('aria-live','polite');
  function grade(value){if(graded)return;graded=true;root.GoimonQuestQuestionAudio?.stop();const ok=root.GoimonChapterQuestions.correct(q,value);onAnswer?.(q,ok);if(ok)score++;controls.replaceChildren();const h=node('h3',ok?'正解！':'もう一度、確認しよう',feedback);const answer=q.format==='q12'?q.answer.map(id=>q.chunks.find(c=>c.id===id)?.text||'').join(' '):q.answer;node('p','正答：'+answer,feedback,'ql-answer');explain(feedback,q);nextKey(action(index+1===queue.length?'復習の結果へ':'次の問題へ',()=>{index++;render();},feedback,true));focus(h);}
  if(q.format==='q12'){
   const actions=node('div','',controls,'ql-actions'),chosen=node('div','',controls,'ql-chosen'),options=node('div','',controls,'ql-options');chosen.setAttribute('aria-label','選んだ語句');
   const submit=action('答え合わせ',()=>grade([...selection]),actions,true);action('並びをリセット',()=>{selection=[];paint();},actions);
   const chunks=[...q.chunks].reverse();function paint(){chosen.replaceChildren();options.replaceChildren();for(const id of selection)action(q.chunks.find(c=>c.id===id).text,()=>{selection=selection.filter(x=>x!==id);paint();},chosen);for(const c of chunks){const b=action(c.text,()=>{selection.push(c.id);paint();},options);b.disabled=selection.includes(c.id);}submit.disabled=selection.length!==q.answer.length;}paint();
  }else{[...(q.choices||[])].reverse().forEach((value,index)=>choiceKey(action(value,()=>grade(value),controls),index));}
  action('戦闘結果へ戻る',exit,box);focus(title);
 }
 render();
}
function eligibility(parent){const details=node('details','',parent,'quest-eligibility');node('summary','参加条件と、進化したときのこと',details);node('p','参加できるのは、たまご・幼体・成長体です。',details);node('p','中級体に進化すると、冒険の途中でも参加できなくなります。育成・学習・既読・クリア記録は消えません。',details);node('p','保存箱などから参加できる相棒を選び、章の最初から再挑戦できます。編成の確定までは今の冒険を残します。',details);const a=node('a','育成・保存箱を確認',details);a.href='index.html?panel=goimon&manage=1';return details;}
const api={record,summary,result,practice,eligibility,showChoiceMeanings,choiceKey,nextKey,bindKeys,recoverySkills,recoveryClaimed,restoreSkill};if(typeof module!=='undefined')module.exports=api;else root.GoimonQuestLearning=api;
})(typeof window!=='undefined'?window:globalThis);
