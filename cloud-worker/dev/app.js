const $=id=>document.getElementById(id);let attempt,answers,operationId,busy=false,revision=0;
const requested=new URLSearchParams(location.search).get('mission');
if(requested&&Array.from($('kind').options).some(option=>option.value===requested))$('kind').value=requested;
const dashboard=document.createElement('a');dashboard.href='/daily_mission_test.html';dashboard.textContent='ミッション一覧・保存状況へ戻る';$('kind').closest('section').before(dashboard);
let pendingGrowth=null;
const growthButton=document.createElement('button');growthButton.id='saveGrowth';growthButton.textContent='育成へ反映（テスト）';growthButton.disabled=true;$('saveLearning').after(growthButton);
async function api(path,body){const response=await fetch('/api/v1/'+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const data=await response.json();if(!response.ok)throw Error(data.error||String(response.status));return data;}
function text(parent,tag,value){const node=document.createElement(tag);node.textContent=value;parent.append(node);return node;}
function audio(parent,file){if(!file)return;const player=document.createElement('audio');player.controls=true;player.preload='none';player.src='/'+file;parent.append(player);}
async function balance(){const state=await api('economy');revision=state.revision;$('balance').textContent='テスト残高：'+state.state.shards;}
async function action(fn){if(busy)return;busy=true;$('start').disabled=true;try{await fn();}catch(e){$('status').textContent='エラー：'+e.message;}finally{busy=false;$('start').disabled=false;}}
function render(){const root=$('questions');root.replaceChildren();text(root,'h2',attempt.title||attempt.category);
 for(const key of ['passage','summary','dialogue'])if(attempt[key]){const box=text(root,'section','');for(const item of [].concat(attempt[key]))text(box,'p',typeof item==='string'?item:(item.speaker||'')+'：'+(item.blank?'（'+item.blank+'）':item.text||''));}
 audio(root,attempt.audioFile);
 attempt.questions.forEach((q,i)=>{const box=text(root,'fieldset','');text(box,'legend',String(i+1));text(box,'p',q.prompt||q.stemBefore||'カードを順に選んでください。');audio(box,q.audioFile);
 if(q.speech){const button=text(box,'button','音声を再生');button.onclick=()=>{if(!('speechSynthesis' in window)){$('status').textContent='このブラウザは読み上げに対応していません。';return;}speechSynthesis.cancel();const speech=new SpeechSynthesisUtterance(q.speech.text);speech.lang=q.speech.lang;speech.onerror=()=>{$('status').textContent='音声を再生できませんでした。もう一度お試しください。';};speechSynthesis.speak(speech);};}
 if(q.chunks){answers[i]=[];const result=text(box,'p','');for(const chunk of q.chunks){const b=text(box,'button',chunk.text);b.onclick=()=>{answers[i].push(chunk.id);b.disabled=true;result.textContent=answers[i].map(id=>q.chunks.find(c=>c.id===id).text).join(' ');};}const reset=text(box,'button','並び順をリセット');reset.onclick=()=>{answers[i]=[];result.textContent='';box.querySelectorAll('button').forEach(b=>b.disabled=false);};if(q.stemAfter)text(box,'p',q.stemAfter);}
 else q.choices.forEach((choice,j)=>{const label=text(box,'label','');const input=document.createElement('input');input.type='radio';input.name='q'+i;input.value=j;input.onchange=()=>{answers[i]=j;};label.append(input,document.createTextNode(' '+choice));});
 });}
$('start').onclick=()=>action(async()=>{const [slot,mode]=$('kind').value.split(':');const payload={level:'1'};if(slot==='words'||slot==='idioms')payload.mode=mode;if(slot==='exam'){payload.category=mode==='standard'?'paraphrase_quiz':'sentence';payload.variant=mode;}
 if(pendingGrowth)throw Error('先に育成反映を再送して結果を確認してください。');
 const next=await api('missions/'+slot+'/start',payload);window.speechSynthesis?.cancel();attempt=next;answers=Array(attempt.questions.length).fill(null);operationId=crypto.randomUUID();render();$('submit').disabled=false;$('claim').disabled=true;$('saveLearning').disabled=true;growthButton.disabled=true;$('status').textContent=attempt.date+' / '+attempt.questions.length+'問';await balance();});
$('submit').onclick=()=>action(async()=>{if(answers.some((a,i)=>a===null||Array.isArray(a)&&a.length!==attempt.questions[i].chunks.length))throw Error('すべての問題に回答してください。');const result=await api('missions/'+attempt.slot+'/submit',{attemptId:attempt.attemptId,answers});$('status').textContent=result.correct+' / '+result.total+'問正解 — '+(result.completed?'達成':'未達成')+(attempt.slot==='reading'?'（大問7：正解×2＋全問正解10pt。大問8/10：全問正解で初回のみ1pt＋隠しポイント1）':'');$('submit').disabled=true;$('questions').querySelectorAll('input,button').forEach(x=>x.disabled=true);$('claim').disabled=!result.completed;$('saveLearning').disabled=false;growthButton.disabled=false;});
$('claim').onclick=()=>action(async()=>{await balance();const result=await api('missions/'+attempt.slot+'/claim',{attemptId:attempt.attemptId,operationId,expectedRevision:revision});$('status').textContent=result.replayed?'受取済みです（追加付与なし）。':'テスト報酬を受け取りました。';$('claim').disabled=true;await balance();});
action(balance);

$('saveLearning').onclick=()=>action(async()=>{const state=await api('missions/learning');const r=await api('missions/learning/apply',{attemptId:attempt.attemptId,expectedRevision:state.revision});$('saveLearning').disabled=true;$('status').textContent=r.replayed?'学習記録は反映済みです。':'テスト学習記録へ反映しました。育成は別ボタンで反映します。';});
growthButton.onclick=()=>action(async()=>{
 if(!pendingGrowth){const state=await api('missions/learning');pendingGrowth={attemptId:attempt.attemptId,expectedRevision:state.revision};}
 let result;try{result=await api('missions/growth/apply',pendingGrowth);pendingGrowth=null;}catch(error){if(['learning_revision_conflict','growth_target_missing','growth_target_mismatch','invalid_growth_record','unsupported_attempt'].includes(error.message))pendingGrowth=null;throw error;}
 const state=await api('missions/learning'),g=JSON.parse(state.snapshot.data.zensho_goimon_current_v4_lv1);growthButton.disabled=true;
 $('status').textContent=(result.replayed?'育成は反映済み（追加加点なし）。':`今回の加点：${result.awardedPoints}pt。`)+` 合計 ${g.totalPoints}pt / ちえ ${g.stats.chie}・ことば ${g.stats.kotoba}・おんかん ${g.stats.onkan}・ぶんみゃく ${g.stats.bunmyaku}`;
});
