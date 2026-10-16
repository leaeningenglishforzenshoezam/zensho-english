import {createBrowserMissionClient} from './mission_browser_client.mjs';
import {MissionFlow} from './mission_flow.mjs';
const $=id=>document.getElementById(id);let flow,answers=[],working=false;
function add(parent,tag,value){const n=document.createElement(tag);n.textContent=value;parent.append(n);return n;}
function media(parent,file){if(file){const a=document.createElement('audio');a.controls=true;a.preload='none';a.src=file;parent.append(a);}}
function render(a){
 const root=$('questions');root.replaceChildren();add(root,'h2',a.title||'問題');
 for(const key of ['passage','summary','dialogue'])for(const item of [].concat(a[key]||[]))add(root,'p',typeof item==='string'?item:(item.speaker||'')+'：'+(item.blank?'（'+item.blank+'）':item.text||''));
 media(root,a.audioFile);
 a.questions.forEach((q,i)=>{const box=add(root,'fieldset','');add(box,'legend',`${i+1}問目`);add(box,'p',q.prompt||q.stemBefore||'語句を順番に選んでください');media(box,q.audioFile);
  if(q.speech){const b=add(box,'button','音声を再生');b.onclick=()=>{if(!window.speechSynthesis){$('status').textContent='この端末では読み上げを利用できません。';return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(q.speech.text);u.lang=q.speech.lang;u.onerror=()=>{$('status').textContent='音声を再生できませんでした。';};speechSynthesis.speak(u);};}
  if(q.chunks){answers[i]=[];const line=add(box,'p','');for(const chunk of q.chunks){const b=add(box,'button',chunk.text);b.onclick=()=>{answers[i].push(chunk.id);b.disabled=true;line.textContent=answers[i].map(id=>q.chunks.find(c=>c.id===id).text).join(' ');};}const reset=add(box,'button','選び直す');reset.onclick=()=>{answers[i]=[];line.textContent='';box.querySelectorAll('button').forEach(b=>b.disabled=false);};if(q.stemAfter)add(box,'p',q.stemAfter);}
  else q.choices.forEach((choice,j)=>{const label=add(box,'label',''),input=document.createElement('input');input.type='radio';input.name='q'+i;input.onchange=()=>{answers[i]=j;};label.append(input,document.createTextNode(choice));});
 });
}
async function run(fn){if(working)return;working=true;$('start').disabled=true;$('finish').disabled=true;try{await fn();}catch(e){const messages={missions_not_enabled:'ミッションは公開準備中です。',mission_login_required:'保存画面でログインしてから開いてください。',mission_account_changed:'アカウントまたは保存タブが変わりました。保存画面で確認してください。',revision_conflict:'別端末の記録と競合しています。保存画面で確認してください。',growth_target_mismatch:'挑戦中に育成する個体が変わりました。元の個体に戻してから再試行してください。'};$('status').textContent=messages[e.message]||'処理を完了できませんでした：'+e.message;if(flow?.pending)$('status').textContent+='\nこの画面を閉じず「保存を再試行」を押してください。完了済みの処理は重複しません。';}finally{working=false;$('start').disabled=!flow||!!flow.pending;$('finish').disabled=!flow?.attempt||!!flow.result;$('finish').textContent=flow?.pending?'保存を再試行':'採点して保存する';}}
$('start').onclick=()=>run(async()=>{const [slot,mode]=$('kind').value.split(':'),body={level:'1'};if(['words','idioms'].includes(slot))body.mode=mode;if(slot==='exam'){body.category=mode==='standard'?'paraphrase_quiz':'sentence';body.variant=mode;}const a=await flow.start(slot,body);answers=Array(a.questions.length).fill(null);render(a);$('status').textContent=`${a.date} / ${a.questions.length}問。回答後に採点・保存します。`;});
$('finish').onclick=()=>run(async()=>{
 if(!flow.pending&&answers.some((a,i)=>a===null||Array.isArray(a)&&a.length!==flow.attempt.questions[i].chunks.length))throw Error('すべての問題に回答してください');
 $('questions').querySelectorAll('input,button').forEach(n=>n.disabled=true);
 const r=await flow.finish(answers);$('balance').textContent=`星のかけら：${r.balance}個`;
 $('status').textContent=`${r.grade.correct} / ${r.grade.total}問正解 — ${r.grade.completed?'達成！':'今回は未達成'}\n学習記録を保存しました。`+(r.growth.growthApplied===false?'\n出題時に育成個体がなかったため、育成加点はありません。':`\n育成反映：${r.growth.awardedPoints}pt`)+(r.reward?`\n${r.reward.replayed?'今回のかけらは受取済みです。追加付与はありません。':`星のかけらを${r.reward.result.shards}個獲得！`}`:'');
 if(r.bonus&&!r.bonus.replayed)$('status').textContent+=`\n基本3ミッション達成ボーナス：${r.bonus.result.shards}個！`;
});
window.addEventListener('beforeunload',e=>{if(flow?.pending||working){e.preventDefault();e.returnValue='';}});
window.addEventListener('pagehide',()=>window.speechSynthesis?.cancel());
const initialize=()=>run(async()=>{if(flow)return;const client=createBrowserMissionClient();await client.prepare();const balance=await client.request('economy');flow=new MissionFlow(client);$('balance').textContent=`星のかけら：${balance.state.shards}個`;$('status').textContent='挑戦するミッションを選んでください。';});
window.addEventListener('goimon-storage-ready',initialize);
initialize();
