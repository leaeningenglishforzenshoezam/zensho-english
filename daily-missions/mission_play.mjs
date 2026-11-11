import {createBrowserMissionClient} from './mission_browser_client.mjs';
import {missionOptions,missionSettings} from './mission_options.mjs';
import {createMissionCheckpoint} from './mission_checkpoint.mjs';
import {MissionFlow} from './mission_flow.mjs';
import {explanationBank,explanationFor} from './mission_explanations.mjs';
import {createReviewGate,answerText,dashboardRows} from './mission_presentation.mjs';
const $=id=>document.getElementById(id);let flow,answers=[],working=false;const rules=window.GOIMON_DAILY_MISSION_RULES;
const reviewGate=createReviewGate(()=>flow?.attempt?.attemptId);let dailyState=null,statusGeneration=0;
function add(parent,tag,value){const n=document.createElement(tag);n.textContent=value;parent.append(n);return n;}
function media(parent,file){if(file){const a=document.createElement('audio');a.controls=true;a.preload='none';a.src=file;parent.append(a);}}
function progress(){try{flow.saveAnswers(answers);}catch(e){$('status').textContent='回答を端末に保存できません。この画面を閉じず、空き容量や保存タブを確認してください。';$('finish').disabled=true;throw e;}const n=answers.filter((x,i)=>x!==null&&(!Array.isArray(x)||x.length===flow.attempt.questions[i].chunks.length)).length;$('answered').textContent=`解答 ${n} / ${answers.length}`;}
const instructions={words:'単語に合う意味・英語を選びましょう。',idioms:'熟語の意味、または同じ意味を表す表現を選びましょう。',paraphrase_quiz:'文(a)と文(b)がほぼ同じ意味になるように、空欄に入る最も適切なものを選びなさい。',sentence:'英文の空欄に入る最も適切な語句を選びなさい。',q7:'本文Aを読み、要約Bの空欄に入る最も適切なものを選びなさい。',dialogue8:'会話の流れに合うように、空欄に入る最も適切なものを選びなさい。',q10:'長文を読み、空欄に入る最も適切なものを選びなさい。',listening:'音声を聞き、質問に対する最も適切な答えを選びなさい。',reorder:'英文が完成するように語句を正しい順番に並べ替えなさい。'};
function reviewUrl(a,ids){const page=a.slot==='words'?(a.mode==='jaen'?'quiz_jaen.html':a.mode==='audio'?'audio_quiz.html':'quiz.html'):a.slot==='idioms'?'idiom_quiz.html':({paraphrase_quiz:'paraphrase_quiz.html',sentence:'sentence.html',q7:'q7.html',dialogue8:'dialogue.html',q10:'q10.html',listening:'listening.html',reorder:'reorder.html'}[a.category]);const p=new URLSearchParams({level:a.level,reviewIds:ids.join(','),fromMission:a.slot});if(a.setId)p.set('setId',a.setId);if(a.format)p.set('format',a.format);if(a.mode)p.set('idiomMode',a.mode);return page+'?'+p;}
function render(a){
 const root=$('questions');root.replaceChildren();add(root,'h2',a.title||'問題');
 for(const key of ['passage','summary','dialogue']){if(!a[key])continue;const panel=add(root,'section','');panel.className='reading-panel';add(panel,'h3',key==='passage'?'本文 A':key==='summary'?'要約 B':'会話文');for(const item of [].concat(a[key])){const line=add(panel,'p',typeof item==='string'?item:(item.speaker||'')+'：'+(item.blank?'（'+item.blank+'）':item.text||''));line.lang='en';}}
 media(root,a.audioFile);
 a.questions.forEach((q,i)=>{const box=add(root,'fieldset','');box.dataset.id=q.id;add(box,'legend',`${i+1}問目 · No.${q.id}`);if(a.category==='paraphrase_quiz'){(q.prompt||'').split('\n').forEach((text,j)=>{const line=add(box,'p',`(${j===0?'a':'b'}) ${text}`);line.className='sentence-pair';line.lang='en';});}else add(box,'p',q.prompt||q.stemBefore||'語句を順番に選んでください');media(box,q.audioFile);
  if(q.speech){const b=add(box,'button','音声を再生');b.onclick=()=>{if(!window.speechSynthesis){$('status').textContent='この端末では読み上げを利用できません。';return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(q.speech.text);u.lang=q.speech.lang;u.onerror=()=>{$('status').textContent='音声を再生できませんでした。';};speechSynthesis.speak(u);};}
  if(q.chunks){answers[i]??=[];const line=add(box,'p',answers[i].map(id=>q.chunks.find(c=>c.id===id)?.text||'').join(' '));for(const chunk of q.chunks){const b=add(box,'button',chunk.text);b.disabled=answers[i].includes(chunk.id);b.onclick=()=>{answers[i].push(chunk.id);b.disabled=true;line.textContent=answers[i].map(id=>q.chunks.find(c=>c.id===id).text).join(' ');progress();};}const reset=add(box,'button','選び直す');reset.onclick=()=>{answers[i]=[];line.textContent='';progress();box.querySelectorAll('button').forEach(b=>b.disabled=false);};if(q.stemAfter)add(box,'p',q.stemAfter);}
  else q.choices.forEach((choice,j)=>{const label=add(box,'label',''),input=document.createElement('input');input.type='radio';input.name='q'+i;input.checked=answers[i]===j;input.onchange=()=>{answers[i]=j;progress();};label.append(input,document.createTextNode(choice));});
 });
}
async function run(fn){if(working)return;working=true;$('resetMission').disabled=true;renderDashboard();$('start').disabled=true;$('finish').disabled=true;try{await fn();}catch(e){const messages={missions_not_enabled:'ミッションは公開準備中です。',mission_login_required:'保存画面でログインしてから開いてください。',mission_account_changed:'アカウントまたは保存タブが変わりました。保存画面で確認してください。',revision_conflict:'別端末の記録と競合しています。保存画面で確認してください。',AbortError:'通信が時間切れになりました。保存を再試行するか、今回の挑戦をリセットできます。',growth_target_mismatch:'挑戦中に育成する個体が変わりました。元の個体に戻して保存を再試行するか、「今回の挑戦をリセット」で一覧へ戻ってください。'};$('status').textContent=messages[e.name]||messages[e.message]||'処理を完了できませんでした：'+e.message;$('status').scrollIntoView({block:'center'});if(flow?.pending)$('status').textContent+='\n「保存を再試行」を押してください。再読み込み後も保留中の処理を引き継ぎます。完了済みの処理は重複しません。';}finally{working=false;$('resetMission').hidden=!flow?.attempt;$('resetMission').disabled=false;$('start').disabled=!flow||!!flow.pending;$('finish').disabled=!flow?.attempt||!!flow.result;$('finish').textContent=flow?.pending?'保存を再試行':'採点する';renderDashboard();}}
$('start').onclick=()=>run(async()=>{const {slot,body}=missionSettings($('missionLevel').value,$('kind').value);reviewGate.invalidate();const a=await flow.start(slot,body);$('reviewToolbar').hidden=true;$('wrongOnly').checked=false;setQuestionView(true);answers=Array(a.questions.length).fill(null);render(a);progress();$('missionSetup').open=false;$('instructions').hidden=false;$('instructions').textContent=instructions[a.category]||instructions[a.slot];$('status').textContent=`${a.date} / ${a.questions.length}問。回答後に採点・保存します。`;$('instructions').scrollIntoView({block:'start'});});
$('finish').onclick=()=>run(async()=>{
 if(!flow.pending&&answers.some((a,i)=>a===null||Array.isArray(a)&&a.length!==flow.attempt.questions[i].chunks.length))throw Error('すべての問題に回答してください');
 $('questions').querySelectorAll('input,button').forEach(n=>n.disabled=true);
 const r=await flow.finish(answers);$('balance').textContent=`星のかけら：${r.balance}個`;let walletWarning='';if(window.GoimonCloudWallet){try{await window.GoimonCloudWallet.refresh();}catch{walletWarning='\n学習結果は保存済みです。残高表示の更新は画面を開き直して確認してください。';}}
 $('status').textContent=`${r.grade.correct} / ${r.grade.total}問正解 — ${r.grade.completed?'達成！':'今回は未達成'}\n学習記録を保存しました。`+(r.growth.growthApplied===false?'\n出題時に育成個体がなかったため、育成加点はありません。':`\n育成反映：${r.growth.awardedPoints}pt`)+(r.reward?`\n${r.reward.replayed?'今回のかけらは受取済みです。追加付与はありません。':`星のかけらを${r.reward.result.shards}個獲得！`}`:'');
 showResult(r);refreshDashboard();$('status').textContent+=walletWarning;if(r.bonus&&!r.bonus.replayed)$('status').textContent+=`\n基本3ミッション達成ボーナス：${r.bonus.result.shards}個！`;
});
function setQuestionView(active){
 document.body.classList.toggle('answering',active);
 $('dashboard').hidden=active;$('loginBonus').hidden=active;
 $('gradingBar').hidden=!active;$('finish').hidden=!!flow?.result;
 $('backToMissions').hidden=!flow?.result;
 $('questions').hidden=!active;$('instructions').hidden=!active;
 $('reviewToolbar').hidden=!active||!flow?.result;
}
$('backToMissions').onclick=()=>{setQuestionView(false);$('missionSetup').open=false;$('dashboard').scrollIntoView({block:'start'});refreshDashboard();};

$('resetMission').onclick=()=>run(async()=>{
 if(!flow?.attempt)return;
 if(!window.confirm('今回の挑戦をリセットして一覧に戻りますか？\n保存済みの学習記録・育成・獲得済み報酬は残ります。未保存の回答と、未受取の育成加点・報酬は、この挑戦からは再試行できなくなります。'))return;
 flow.reset();
 reviewGate.invalidate();
 answers=[];
 window.speechSynthesis?.cancel();
 $('questions').querySelectorAll('audio').forEach(audio=>audio.pause());
 $('questions').replaceChildren();
 if($('resultDialog').open)$('resultDialog').close();
 $('reviewToolbar').hidden=true;
 $('reviewStatus').textContent='';
 $('wrongOnly').checked=false;
 $('answered').textContent='問題を選んでスタート';
 $('finish').textContent='採点する';
 setQuestionView(false);
 $('missionSetup').open=false;
 $('status').textContent='今回の挑戦をリセットしました。ミッションを選んで始められます。保存済みの学習記録・育成・獲得済み報酬は残っています。';
 $('dashboard').scrollIntoView({block:'start'});
 await refreshDashboard();
});
function filterReview(){
 $('questions').querySelectorAll('fieldset').forEach(box=>box.hidden=$('wrongOnly').checked&&box.classList.contains('correct'));
}
$('wrongOnly').onchange=filterReview;
function showResult(r){
 const root=$('resultContent');root.replaceChildren();
 add(root,'span',r.grade.completed?'MISSION CLEAR':'TRY AGAIN');
 add(root,'h2',r.grade.completed?'ミッションクリア！':'復習して、もう一度').id='resultTitle';
 add(root,'p',`${r.grade.correct} / ${r.grade.total}問正解`).className='result-score';
 add(root,'p',r.reward?(r.reward.replayed?'報酬は受取済みです':`ほしのかけら ＋${r.reward.result.shards}個`):'学習記録は保存しました。');
 if(r.bonus&&!r.bonus.replayed)add(root,'p',`達成ボーナス ＋${r.bonus.result.shards}個`);
 const a=flow.attempt,link=add(root,'a','同じ問題を学習する');link.id='resultStudyLink';link.href=reviewUrl(a,a.questions.map(q=>q.id));link.className='button secondary';
 const retry=add(root,'button','もう一度挑戦');retry.onclick=()=>{if(working)return;$('resultDialog').close();$('start').click();};
 setQuestionView(true);$('reviewToolbar').hidden=false;
 if(!$('resultDialog').open)$('resultDialog').showModal();
 loadReview(a,link);
}
async function loadReview(attempt,link){
 const current=reviewGate.begin(attempt.attemptId);
 $('reviewStatus').textContent='答えを確認しています…';$('retryReview').hidden=true;
 try{
  const review=await flow.client.request('missions/review',{attemptId:attempt.attemptId});
  if(!current())return;
  if(review.attemptId!==attempt.attemptId)throw Error('review_mismatch');
  const boxes=[...$('questions').querySelectorAll('fieldset')];
  review.questions.forEach(q=>{
   const box=boxes.find(b=>b.dataset.id===String(q.id));if(!box||box.querySelector('.review-answer'))return;
   box.classList.add(q.correct?'correct':'wrong');
   const panel=document.createElement('section');panel.className='review-answer';
   add(panel,'h3',q.correct?'✓ 正解':'もう一度確認');
   if(q.prompt&&!q.chunks){const prompt=add(panel,'p',q.prompt);prompt.className='review-prompt';prompt.lang='en';}
   if(!q.correct){add(panel,'p','あなたの答え').className='answer-label';add(panel,'p',answerText(q,q.selected)).className='selected-answer';}
   add(panel,'p','正解').className='answer-label';add(panel,'p',answerText(q,q.answer)).className='correct-answer';
   if(q.chunks)add(panel,'p',[q.prompt,answerText(q,q.answer),q.stemAfter].filter(Boolean).join(' ')).lang='en';
   const details=document.createElement('details');details.className='review-choices';add(details,'summary','問題・選択肢を確認');
   [...box.children].filter(n=>n.tagName!=='LEGEND').forEach(n=>details.append(n));
   box.append(panel,details);
   const learn=add(panel,'a','この問題の訳・解説を学習画面で見る');learn.href=reviewUrl(attempt,[q.id]);learn.className='review-link';
  });
  // Text is optional: grading and answer review do not wait for this download.
  attachExplanations(attempt,review,current);
  const wrong=review.questions.filter(q=>!q.correct);
  if(link?.isConnected&&wrong.length){link.href=reviewUrl(attempt,wrong.map(q=>q.id));link.textContent='間違えた問題を学習する';}
  $('reviewStatus').textContent=wrong.length?`復習したい問題は${wrong.length}問。「訳・解説を見る」から振り返りましょう。`:'全問正解！問題ごとに学習画面で振り返れます。';
  filterReview();
 }catch{
  if(!current())return;
  $('reviewStatus').textContent='答えを取得できませんでした。学習結果は保存済みです。再取得するか、学習画面で確認してください。';
  $('retryReview').hidden=false;
 }
}
$('retryReview').onclick=()=>{if(flow?.result)loadReview(flow.attempt,$('resultStudyLink'));};
$('closeResult').onclick=()=>{$('resultDialog').close();$('reviewToolbar').scrollIntoView({block:'start'});};
async function attachExplanations(attempt,review,current){
 try{
  const bank=await explanationBank(attempt);if(!current())return;
  for(const q of review.questions){
   const text=explanationFor(bank,q);if(!text||!text.translation&&!text.notes.length)continue;
   const box=[...$('questions').querySelectorAll('fieldset')].find(n=>n.dataset.id===String(q.id));
   const panel=box?.querySelector('.review-answer');if(!panel||panel.querySelector('.review-explanation'))continue;
   const details=document.createElement('details');details.className='review-explanation';add(details,'summary','訳・解説を見る');
   if(text.translation){add(details,'h4','日本語訳');add(details,'p',text.translation);}
   if(text.notes.length){add(details,'h4','考え方');text.notes.forEach(note=>add(details,'p',note));}
   panel.insertBefore(details,panel.querySelector('.review-link'));
  }
 }catch{
  if(current())$('reviewStatus').textContent+=' 訳・解説を読み込めませんでした。各問題の学習画面から確認できます。';
 }
}
function renderDashboard(){
 const rows=dashboardRows(rules,missionOptions($('missionLevel').value),dailyState);
 $('missionCards').replaceChildren();
 for(const row of rows){
  const card=add($('missionCards'),'section','');card.className='mission-card '+row.state;
  const header=add(card,'div','');header.className='card-top';
  add(header,'span',row.group==='basic'?'BASIC':'CHALLENGE').className='eyebrow';
  add(header,'span',row.state==='completed'?'✓ 達成済み':row.state==='open'?'挑戦しよう':'状況未確認').className='mission-state';
  add(card,'h3',row.title);add(card,'p',row.goal).className='mission-goal';
  add(card,'p',`✦ ほしのかけら ${row.rewardStars}個`).className='mission-reward';
  const actions=add(card,'div','');actions.className='card-actions';
  for(const [value,label] of row.options){
   const b=add(actions,'button',label);b.type='button';
   b.disabled=!flow||working||!!flow.pending||!!flow.attempt&&!flow.result;
   b.onclick=()=>{$('kind').value=value;showGoal();$('start').click();};
  }
 }
 $('refreshMissions').disabled=!flow||working;
 $('basicBonus').hidden=$('missionLevel').value!=='1';
 $('basicBonus').textContent=`基本3ミッションを達成すると、さらに${rules.allBasicBonusStars}個。`;
}
async function refreshDashboard(){
 if(!flow)return;
 const generation=++statusGeneration,level=$('missionLevel').value;
 dailyState=null;renderDashboard();$('dailyProgress').hidden=true;$('dailySummary').textContent='達成状況を確認しています…';
 try{
  const state=await flow.client.request('missions/status?level='+level);
  if(generation!==statusGeneration||$('missionLevel').value!==level)return;
  dailyState=state;const done=state.missions.filter(m=>m.completed).length;
  $('dailySummary').textContent=`${state.date} · ${done} / ${state.missions.length} 達成`;
  $('dailyProgress').max=state.missions.length;$('dailyProgress').value=done;$('dailyProgress').hidden=false;
 }catch{if(generation!==statusGeneration)return;$('dailySummary').textContent='達成状況を取得できません。「更新」で再確認できます。';}
 if(generation===statusGeneration)renderDashboard();
}
$('refreshMissions').onclick=refreshDashboard;
const params=new URLSearchParams(location.search),grade=$('missionLevel');
grade.value=(params.get('level')||window.GOIMONStorage.getItem('zensho_level_v1'))==='2'?'2':'1';
function setOptions(){ $('kind').replaceChildren(...missionOptions(grade.value).map(([value,label])=>new Option(label,value)));renderDashboard(); }
setOptions();
grade.onchange=()=>{if(working||flow?.pending||flow?.attempt&&!flow.result){grade.value=flow?.attempt?.level||grade.value;$('status').textContent='回答・保存を終えてから級を切り替えてください。';return;}setOptions();showGoal();refreshDashboard();};
const selectedSlot=params.get('slot');const selected=[...$('kind').options].find(x=>x.value.split(':')[0]===selectedSlot);if(selected)$('kind').value=selected.value;
function showGoal(){const slot=$('kind').value.split(':')[0],rule=rules.missionSlots.find(x=>x.slot===slot);$('notice').textContent=`${rule.goal}で、ほしのかけら${rule.rewardStars}個。各ミッションの報酬は1日1回です。`;}
$('kind').onchange=showGoal;showGoal();
window.addEventListener('beforeunload',e=>{if(flow?.pending||working){e.preventDefault();e.returnValue='';}});
window.addEventListener('pagehide',()=>window.speechSynthesis?.cancel());
async function refreshLoginBonus(){
 const date=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const received=JSON.parse(localStorage.getItem('goimon_device_bonus_v1:'+date)||'null')?.status==='claimed';
 $('loginBonus').hidden=document.body.classList.contains('answering');
 $('claimLoginBonus').hidden=true;
 $('loginBonusStatus').textContent=date+' · '+(received?'今日は受取済みです。':'このブラウザで1日1回、自動で受け取れます。');
}
window.addEventListener('goimon-wallet-changed',()=>refreshLoginBonus().catch(()=>{}));
refreshLoginBonus().catch(()=>{});
window.addEventListener('focus',()=>{if(!working&&flow&&!flow.pending)refreshLoginBonus().catch(()=>{$('claimLoginBonus').disabled=true;$('loginBonusStatus').textContent='受取状況を確認できません。画面を開き直してください。';});});
const initialize=()=>run(async()=>{if(flow)return;if(window.GoimonEconomyReady)await window.GoimonEconomyReady;const client=createBrowserMissionClient();await client.prepare();const balance=await client.request('economy');const profiles=window.GOIMONProfiles;
 const checkpoint=createMissionCheckpoint({storage:window.GOIMONStorage,account:profiles.account,apiBase:window.GOIMON_CLOUD_CONFIG.apiBase,activeAccount:()=>profiles.currentAccount(),isWriter:()=>profiles.isWriter()});
 flow=new MissionFlow(client,checkpoint);$('balance').textContent=`星のかけら：${balance.state.shards}個`;$('status').textContent='挑戦するミッションを選んでください。';
 if(flow.attempt){
  const a=flow.attempt;grade.value=a.level;setOptions();
  const value=a.slot==='exam'?(a.level==='2'?'exam:sentence2':a.category==='sentence'?'exam:'+a.variant:'exam:standard'):['words','idioms'].includes(a.slot)?a.slot+':'+a.mode:a.slot;
  $('kind').value=value;showGoal();answers=structuredClone(flow.pending?.answers||flow.answers);render(a);progress();
  setQuestionView(true);$('instructions').textContent=instructions[a.category]||instructions[a.slot];
  $('status').textContent=flow.pending?'保存が保留中です。「保存を再試行」で続けてください。':flow.result?'前回の結果を復元しました。':'前回の回答を復元しました。期限切れの場合は新しく開始してください。';
  if(flow.pending||flow.result)$('questions').querySelectorAll('input,button').forEach(n=>n.disabled=true);
  if(flow.result)showResult(flow.result);
 }
 refreshDashboard();
 await refreshLoginBonus().catch(()=>{$('claimLoginBonus').disabled=true;$('loginBonusStatus').textContent='受取状況を確認できません。画面を開き直してください。';});
});
window.addEventListener('goimon-storage-ready',initialize);
initialize();

