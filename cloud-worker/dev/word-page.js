import {WordSession} from './word-session.js';
const mode={ '/quiz.html':'enja','/quiz_jaen.html':'jaen','/audio_quiz.html':'audio'}[location.pathname];
const $=id=>document.getElementById(id),show=(node,on)=>{if(node){node.classList.toggle('hidden',!on);node.style.display=on?'block':'none';}};
const scope=$('missionRecoveryScope')?.content;
const checkpoint=scope?{
 load(){try{return JSON.parse(sessionStorage.getItem('goimon:isolated-word:'+scope+':'+mode)||'null');}catch{const p=document.createElement('p');p.textContent='中断データを読み込めません。保存内容を消さずに停止しました。';document.body.prepend(p);throw Error('checkpoint_unavailable');}},
 save(value){try{sessionStorage.setItem('goimon:isolated-word:'+scope+':'+mode,JSON.stringify(value));}catch{throw Error('checkpoint_unavailable');}}
}:null;
const session=new WordSession(async(path,body)=>{const r=await fetch('/api/v1/'+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const data=await r.json();if(!r.ok)throw Object.assign(Error(data.error||'通信に失敗しました'),{status:r.status});return data;},mode,checkpoint);
// Use the actual quiz DOM and styles; leave all ordinary storage/learning scripts unloaded.
for(const id of ['setupBox','toggleSettings','toggleGoimon','goimonCard','evolutionNoticeBtn','goimonTrainingRoute','nextQTop','prevBtn','backBtn','summaryBox'])show($(id),false);
const status=document.createElement('p');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.textContent='ローカル専用のサーバーミッション。20問全問正解で達成。通常の学習記録には保存しません。';
const start=$('startTest')||$('startBtn');start.before(status);start.textContent='ミッションの20問を始める';
const back=document.createElement('a');back.href='/daily_mission_test.html';back.textContent='ミッション一覧・保存状況へ戻る';status.before(back);
const warning=document.createElement('p');warning.textContent='同じタブ・同じテストサーバーの起動中は、再読込・一覧から戻った後も回答を復旧します。タブを閉じる・サーバーを再起動すると引き継げません。';status.before(warning);
const learning=document.createElement('button');learning.textContent='学習記録へ反映（テスト）';learning.hidden=true;status.after(learning);
const growth=document.createElement('button');growth.textContent='育成へ反映（テスト）';growth.hidden=true;status.after(growth);
const growthBox=document.createElement('section');growthBox.setAttribute('aria-label','テスト個体の育成状態');status.before(growthBox);
const growthState=document.createElement('p'),refreshGrowth=document.createElement('button');refreshGrowth.textContent='テスト個体の状態を確認';growthBox.append(growthState,refreshGrowth);
let displayedGrowth=null;
const evolve=document.createElement('button'),generation=document.createElement('button');evolve.textContent='進化を確定（テスト）';generation.textContent='保存して次世代へ（テスト）';evolve.hidden=true;generation.hidden=true;growthBox.append(evolve,generation);
growthState.textContent='育成確認は --growth-demo を付けてローカルサーバーを起動してください。実際の個体・記録は使いません。';
function showGrowth(state){
 displayedGrowth=state;
 const raw=state.snapshot?.data?.zensho_goimon_current_v4_lv1;
 if(!raw){evolve.hidden=true;generation.hidden=true;growthState.textContent='テスト個体がありません。--growth-demo を付けて再起動し、新しく出題してください。';return;}
 const g=JSON.parse(raw);if(!g?.stats)throw Error('invalid_growth_record');
 evolve.hidden=!g.pendingEvolution;generation.hidden=false;
 growthState.textContent=`${g.nickname||g.id} / 現在の姿：${g.stage} / Lv.${g.level} / 合計 ${g.totalPoints}pt\nちえ ${g.stats.chie}・ことば ${g.stats.kotoba}・おんかん ${g.stats.onkan}・ぶんみゃく ${g.stats.bunmyaku}\n${g.pendingEvolution?'進化可能（未確定）：'+g.pendingType+' / '+g.pendingStage:'進化候補なし'} / 保存revision ${state.revision}`;
 growthState.style.whiteSpace='pre-line';
}
const reviewBox=document.createElement('section');status.after(reviewBox);
const reviewButton=document.createElement('button');reviewButton.textContent='解答を確認する';reviewButton.hidden=true;status.after(reviewButton);
const next=$('nextQ')||$('nextBtn'),speak=$('speakQ')||$('speakBtn');
const claim=document.createElement('button');claim.textContent='テスト報酬を受け取る';claim.hidden=true;status.after(claim);
function render(){show($('playBox'),true);const q=session.attempt.questions[session.index];if($('question'))$('question').textContent=q.prompt;
 $('qMeta').textContent=`単語 ${q.id} / 範囲 ${session.attempt.rangeStart}〜${session.attempt.rangeEnd}`;
 $('stats').textContent=`${session.index+1} / 20問`;if($('questionProgress'))$('questionProgress').textContent=`${session.index+1} / 20問`;
 $('result').textContent='';$('choices').replaceChildren();q.choices.forEach((choice,i)=>{const b=document.createElement('button');b.type='button';b.className='choiceBtn';b.textContent=choice;b.setAttribute('aria-pressed','false');b.onclick=()=>{try{session.choose(i);$('choices').querySelectorAll('button').forEach(x=>{x.setAttribute('aria-pressed',String(x===b));x.style.outline=x===b?'3px solid #287eab':'';});$('result').textContent='回答を選びました。';next.disabled=false;}catch(e){status.textContent=e.message;}};$('choices').append(b);});
 next.textContent=session.index===19?'20問の回答を送信して採点':'次の問題へ';show(next,true);next.disabled=session.answers[session.index]===null;show(speak,mode!=='jaen');
 $('choices').querySelectorAll('button').forEach((button,i)=>{button.setAttribute('aria-pressed',String(session.answers[session.index]===i));button.disabled=!!session.submitted;});
}
async function run(fn){
 if(session.pending)return;
 const buttons=[start,next,claim,learning,growth,refreshGrowth,reviewButton,evolve,generation];for(const b of buttons)b.disabled=true;
 try{await fn();}catch(e){
  if(e.message==='checkpoint_unavailable'){
   status.textContent='中断データを端末に保存できません。回答はこの画面に残っています。このページを閉じず、保存領域を確認してから再操作してください。';
   return;
  }
  const messages={growth_target_missing:'対象のテスト個体がありません。状態を確認し、新しく出題してください。',growth_target_mismatch:'対象と現在の個体が異なるため処理を止めました。状態を確認してください。',learning_revision_conflict:'別の保存と競合しました。「テスト個体の状態を確認」で更新してから再操作してください。',growth_retry_required:'育成の結果が未確認です。先に育成反映を再送してください。',companion_retry_required:'個体操作の結果が未確認です。同じボタンから再送してください。',evolution_not_ready:'まだ進化条件を満たしていません。',companion_archive_full:'保存箱が満杯のため、次世代を作成していません。',invalid_growth_record:'個体データの不整合を検出しました。初期化せず停止しました。',sync_ack_unavailable:'処理済み結果の履歴を取得できません。新しい操作としてやり直さず、復旧確認が必要です。'};
  status.textContent=(messages[e.message]||'通信・処理エラー：'+e.message)+' 回答はこのページ内に残っています。'+(session.growthPending?'「育成へ反映」を再度押して結果を確認してください。':'')+(session.companionPending?' 未確認の個体操作：'+session.companionPending.action+'。':'');
 }finally{
  for(const b of buttons)b.disabled=false;next.disabled=!session.attempt||session.result!==null||session.answers[session.index]===null;
  // Refreshing the panel must not hide the retry button for an uncertain write.
  if(session.companionPending?.action==='evolve')evolve.hidden=false;
  if(session.companionPending?.action==='new-generation')generation.hidden=false;
 }
}
window.addEventListener?.('pagehide',()=>{window.speechSynthesis?.cancel();});
start.onclick=()=>run(async()=>{await session.start();window.speechSynthesis?.cancel();claim.hidden=true;learning.hidden=true;growth.hidden=true;reviewBox.replaceChildren();reviewButton.hidden=true;render();start.textContent='最初から挑戦し直す';status.textContent='20問の回答後にサーバーで採点します。育成の反映先は出題時のテスト個体です。';});
next.onclick=()=>run(async()=>{if(session.index<19){session.next();render();return;}const r=await session.submit();$('result').textContent=`${r.correct} / ${r.total}問正解 — ${r.completed?'達成':'未達成'}`;$('choices').querySelectorAll('button').forEach(b=>b.disabled=true);claim.hidden=!r.completed;status.textContent='採点結果をサーバーに記録しました（テスト用）。学習記録と育成はそれぞれのボタンで反映します。';learning.hidden=false;growth.hidden=false;reviewButton.hidden=false;});
reviewButton.onclick=()=>run(async()=>{const review=await session.review();reviewBox.replaceChildren();for(const q of review.questions){const p=document.createElement('p');p.textContent=`単語 ${q.id}：${q.correct?'正解':'不正解'} / 選択：${q.choices[q.selected]} / 正答：${q.choices[q.answer]}`;reviewBox.append(p);}});
if(speak)speak.onclick=()=>{const q=session.attempt?.questions[session.index];if(!q)return;if(!window.speechSynthesis){status.textContent='このブラウザでは音声を再生できません。';return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(q.speech?.text||q.prompt);u.lang=q.speech?.lang||'en-US';u.onerror=()=>{status.textContent='音声再生に失敗しました。再度お試しください。';};speechSynthesis.speak(u);};
claim.onclick=()=>run(async()=>{const r=await session.claim();claim.hidden=true;status.textContent=r.replayed?'本日の単語報酬は受取済みです。':'テスト報酬を受け取りました。';});
learning.onclick=()=>run(async()=>{const r=await session.saveLearning();learning.hidden=true;status.textContent=r.replayed?'学習記録は反映済みです（二重加算なし）。':'テスト用の学習ログ・弱点・ブロック進捗に反映しました。育成は別ボタンで反映します。';});
growth.onclick=()=>run(async()=>{const {result,state}=await session.saveGrowth();showGrowth(state);growth.hidden=true;status.textContent=`${result.replayed?'育成は反映済みです（二重加算なし）。':'正解数に応じた育成を反映しました。'} 対象：${result.targetId}。進化は自動確定しません。`;});
refreshGrowth.onclick=()=>run(async()=>{showGrowth(await session.readGrowth());});
evolve.onclick=()=>run(async()=>{const r=await session.companionAction('evolve',displayedGrowth);showGrowth(r);status.textContent=r.replayed?'進化は確定済みです（追加進化なし）。':'進化を1段階確定しました（テスト用）。';});
generation.onclick=()=>run(async()=>{if(!session.companionPending&&!window.confirm('現在のテスト個体を保存箱に残し、新しいたまごに切り替えます。よろしいですか？'))return;const r=await session.companionAction('new-generation',displayedGrowth);showGrowth(r);status.textContent=r.replayed?'次世代は作成済みです（追加作成なし）。':'元の個体を保存箱に残し、次世代のたまごを作りました（テスト用）。';});
show($('playBox'),false);
if(session.attempt){
 render();status.textContent='中断したミッションを復旧しました。';
 if(session.result){
  $('result').textContent=`${session.result.correct} / ${session.result.total}問正解 — ${session.result.completed?'達成':'未達成'}`;
  next.disabled=true;learning.hidden=!!session.learningSaved;growth.hidden=false;claim.hidden=!session.result.completed||!!session.claimed;reviewButton.hidden=false;
 }else if(session.submitted){next.textContent='同じ回答を再送して採点結果を確認';status.textContent='採点結果が未確認です。同じ回答を再送できます。';}
}
if(session.companionPending?.action==='evolve')evolve.hidden=false;
if(session.companionPending?.action==='new-generation')generation.hidden=false;
