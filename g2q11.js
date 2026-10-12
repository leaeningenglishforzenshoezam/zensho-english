(() => {
'use strict';
const data=window.GOIMON_G2_Q11_SET1||[],$=id=>document.getElementById(id);
const KEY='zensho_q11_grammar_weak_v1_lv2';
const store=window.GOIMONStorage||window.localStorage;
const activeLevel=String(store.getItem('zensho_level_v1')||'1');
if(activeLevel!=='2') { document.body.insertAdjacentHTML('afterbegin','<div style="padding:14px;background:#fff0da;text-align:center">このページは2級用です。ホームで2級を選んでください。</div>'); }
function load(){try{const obj=JSON.parse(store.getItem(KEY)||'{}');return obj&&typeof obj==='object'&&!Array.isArray(obj)?obj:{}}catch{return {}}}
let weak=load();
const state={session:[],index:0,selection:null,checked:false,correct:0,mistakes:[],context:null,runId:''};
function createRunId(){return (window.crypto&&typeof window.crypto.randomUUID==='function')?window.crypto.randomUUID():String(Date.now())+'-'+Math.random().toString(36).slice(2)}
const tags=[...new Set(data.map(q=>q.tag))];
for(const tag of tags){let e=document.createElement('option');e.value=tag;e.textContent=tag;$('category').append(e)}
const pool=()=>data.filter(q=>$('category').value==='all'||q.tag===$('category').value);
const info=id=>{const x=weak[id]||{};return {manual:!!x.manual,wrong:Math.max(0,Number(x.wrong)||0),auto:!!x.auto}};
const isWeak=id=>{const x=info(id);return x.manual||x.auto};
const weakItems=()=>data.filter(q=>isWeak(q.id));
function save(){store.setItem(KEY,JSON.stringify(weak));}
function setManual(id,val){const x=info(id);weak[id]={...x,manual:val};try{save()}catch(error){weak[id]=x;console.error(error);alert('苦手記録を保存できません。別タブの競合を確認してください。');return} updatePool();if(!$('catalog').classList.contains('hidden'))renderCatalog();if(!$('play').classList.contains('hidden'))bookmark()}
function recordWrong(id){const x=info(id);weak[id]={...x,wrong:x.wrong+1,auto:true};try{save()}catch(error){weak[id]=x;console.error(error);alert('誤答の苦手登録を保存できませんでした。');return false}updatePool();return true}
function clearWeak(id){const x=info(id);weak[id]={manual:false,wrong:0,auto:false};try{save()}catch(error){weak[id]=x;console.error(error);alert('苦手登録を解除できませんでした。');return}updatePool();renderCatalog()}
function updatePool(){$('poolInfo').textContent=`対象 ${pool().length}問／苦手 ${weakItems().length}問。選択肢は毎回シャッフルされます。`;$('weakCount').textContent=`(${weakItems().length})`}
$('category').addEventListener('change',updatePool);
function shuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function show(page){for(const id of ['setup','catalog','play','summary'])$(id).classList.toggle('hidden',id!==page);window.scrollTo?.(0,0)}
function run(questions,all=false){if(activeLevel!=='2'){alert('2級を選択してから演習してください。');return}if(!questions.length){alert('該当する問題がありません。');return}state.runId=createRunId();state.session=questions.map(q=>({...q,options:shuffle([q.answer,...q.distractors])}));state.index=0;state.correct=0;state.mistakes=[];show('play');render()}
function orderQuestions(questions,mode){if(mode==='random')return shuffle(questions);if(mode==='weak')return questions.slice().sort((a,b)=>{const x=info(a.id),y=info(b.id);const ax=isWeak(a.id)?1:0,by=isWeak(b.id)?1:0;return by-ax||y.wrong-x.wrong||a.id.localeCompare(b.id)});return questions.slice()}
$('start').addEventListener('click',()=>run(orderQuestions(pool(),$('order').value).slice(0,Number($('count').value))));
$('startWeak').addEventListener('click',()=>run(orderQuestions(weakItems(),'weak').slice(0,Number($('count').value))));
$('clearWeak').addEventListener('click',()=>openCatalog('weak'));
$('openQuestions').addEventListener('click',()=>openCatalog('questions'));
$('openGrammar').addEventListener('click',()=>openCatalog('grammar'));
$('catalogBack').addEventListener('click',()=>show('setup'));
function node(tag,cls,txt){let n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n}
function btn(label,fn,cls){let b=node('button',cls||'',label);b.type='button';b.addEventListener('click',fn);return b}
let catalogMode='questions';
function openCatalog(mode){catalogMode=mode;show('catalog');renderCatalog()}
function renderCatalog(){const body=$('catalogBody');body.replaceChildren();const mode=catalogMode;
 $('catalogHeading').textContent=mode==='questions'?`問題一覧（${data.length}問）`:mode==='grammar'?`文法一覧（${tags.length}分野）`:`苦手問題（${weakItems().length}問）`;
 $('catalogHelp').textContent=mode==='grammar'?'各文法の問題をまとめて解けます。登録済みの苦手も確認できます。':mode==='questions'?'英文を確認して、個別演習や手動の苦手登録ができます。':'誤答は自動登録されます。☆は手動登録です。「解除」で誤答回数もリセットされます。';
 if(mode==='grammar'){
  for(const tag of tags){const list=data.filter(q=>q.tag===tag),box=node('div','catalog-group');box.append(node('h3','',`${tag}（${list.length}問）`));const row=node('div','catalog-controls');row.append(btn(`この文法の全${list.length}問を解く →`,()=>run(list),'primary'));row.append(btn('問題を見る',()=>openCatalog('questions')));box.append(row);const ul=node('div','');for(const q of list){const item=node('div','catalog-item');item.append(node('span','catalog-copy',`${q.id.slice(-3)}　${q.stem}`));item.append(btn(isWeak(q.id)?'★ 苦手':'☆ 登録',()=>setManual(q.id,!info(q.id).manual),'bookmark'));ul.append(item)}box.append(ul);body.append(box)}return
 }
 const list=mode==='weak'?weakItems():data;if(!list.length){body.append(node('p','empty','まだ苦手問題はありません。'));return}
 if(mode==='weak'){const r=node('div','catalog-controls');r.append(btn(`苦手を全${list.length}問解く →`,()=>run(orderQuestions(list,'weak')),'primary'));body.append(r)}
 for(const q of list){const item=node('div','catalog-item');const copy=node('div','catalog-copy');copy.append(node('strong','',`${q.id}　｜　${q.tag}`));copy.append(node('p','',q.stem));const x=info(q.id);copy.append(node('span','weak-info',`誤答 ${x.wrong}回${isWeak(q.id)?'・苦手登録中':''}${x.manual?'（手動）':''}`));item.append(copy);item.append(btn('解く',()=>run([q])));if(mode==='weak')item.append(btn('解除',()=>clearWeak(q.id),'bookmark'));else item.append(btn(x.manual?'★ 手動解除':isWeak(q.id)?'★ 苦手（自動）・手動追加':'☆ 苦手登録',()=>setManual(q.id,!info(q.id).manual),'bookmark'));body.append(item)}
}
function bookmark(){const q=state.session[state.index],x=info(q.id);$('bookmark').textContent=x.manual?'★ 手動登録済み':isWeak(q.id)?'★ 苦手登録中':'☆ 苦手に登録';$('bookmark').classList.toggle('active',isWeak(q.id));$('bookmark').setAttribute('aria-pressed',String(x.manual));$('weakMeta').textContent=`誤答 ${x.wrong}回`}
$('bookmark').addEventListener('click',()=>{const q=state.session[state.index];setManual(q.id,!info(q.id).manual)});
function render(){const q=state.session[state.index];state.selection=null;state.checked=false;$('bar').style.width=`${100*state.index/state.session.length}%`;$('number').textContent=`QUESTION ${state.index+1} / ${state.session.length}`;$('score').textContent=`正解 ${state.correct}問`;$('tag').textContent=q.tag;$('stem').textContent=q.stem;bookmark();$('choices').replaceChildren();
 q.options.forEach((option,i)=>{const b=node('button','choice');b.type='button';b.append(node('b','',['①','②','③'][i]),node('span','',option));b.addEventListener('click',()=>{if(state.checked)return;state.selection=option;for(const n of $('choices').children)n.classList.remove('selected');b.classList.add('selected');$('check').disabled=false});$('choices').append(b)});
 $('feedback').classList.add('hidden');$('check').classList.remove('hidden');$('next').classList.add('hidden');$('check').disabled=true;$('next').textContent=state.index===state.session.length-1?'結果を見る →':'次の問題へ →'}
function check(){if(state.checked||state.selection===null||activeLevel!=='2')return;state.checked=true;const q=state.session[state.index],correct=state.selection===q.answer;if(correct)state.correct++;else{state.mistakes.push({id:q.id,stem:q.stem,answer:q.answer,choice:state.selection});const weaknessSaved=recordWrong(q.id);if(!weaknessSaved){state.checked=false;state.mistakes.pop();alert('苦手の保存が失敗したため、学習記録と育成ポイントの付与を中止しました。');return}}
 let saved=false;
 if(activeLevel==='2' && window.ZenshoLearningLog?.addResult) {
   try { saved=window.ZenshoLearningLog.addResult('q11_grammar',correct,{level:'2'})===true; }
   catch(error) { console.error(error); alert('学習記録の保存に失敗しました。別タブの競合や空き容量を確認してください。'); }
 }
 if(correct && saved && window.GoimonUI?.addLearningPointsOnce) {
   const claimId='g2q11:'+state.runId+':'+q.id+':'+state.index;
   try { window.GoimonUI.addLearningPointsOnce(claimId,{kotoba:0.5,bunmyaku:0.5},'q11_grammar'); }
   catch(error) { console.error(error); alert('解答記録は保存しましたがGOIMON加点に失敗しました。'); }
 }
 bookmark();for(const b of $('choices').children){b.disabled=true;const value=b.lastChild.textContent;b.classList.remove('selected');if(value===q.answer)b.classList.add('correct');else if(value===state.selection)b.classList.add('wrong')}
 $('result').textContent=correct?'✓ 正解！':'✕ 不正解';$('result').className='result '+(correct?'ok':'ng');$('translation').textContent=q.ja;$('explanation').textContent=q.explanation;$('comparison').textContent=q.comparison;$('feedback').classList.remove('hidden');$('check').classList.add('hidden');$('next').classList.remove('hidden');$('score').textContent=`正解 ${state.correct}問`}
$('check').addEventListener('click',check);
$('next').addEventListener('click',()=>{if(!state.checked)return;if(state.index+1>=state.session.length)finish();else{state.index++;render()}});
$('back').addEventListener('click',()=>{if(confirm('今回の回答状況を破棄して問題設定に戻りますか？'))show('setup')});
function finish(){show('summary');const n=state.session.length;$('finalScore').textContent=`${state.correct} / ${n} 問正解`;$('finalMessage').textContent=`正答率 ${Math.round(state.correct/n*100)}％。誤答は自動的に苦手登録されました。`;$('wrongList').replaceChildren();if(!state.mistakes.length){$('wrongList').textContent='全問正解です！';return}for(const m of state.mistakes){const d=node('div','wrong-item');d.append(node('strong','',`${m.id}｜${m.stem}`),node('div','',`あなたの回答：${m.choice} ／ 正答：${m.answer}`));$('wrongList').append(d)}}
$('retry').addEventListener('click',()=>run(orderQuestions(pool(),$('order').value).slice(0,Number($('count').value))));$('toSetup').addEventListener('click',()=>show('setup'));
updatePool();
})();