(() => {'use strict';
const D=GoimonChapter1Data,C=GoimonBattleCatalog,E=GoimonBattlePrototype,T=GoimonQuestTutorial,Q=GoimonChapterQuestions,N=GoimonStoryNames,$=id=>document.getElementById(id),app=$('app');
const account=GOIMONProfiles.account||'guest',key='goimon_chapter1_v1:'+account+':lv1';
let store,state=null,blocked=false,interval=null,skipTimer=null;
const source={words:window.WORDS_1KYU,idioms:window.IDIOM_DATA_1KYU,q9:window.SENTENCE_FIXED_1KYU,q11:window.PARAPHRASE_DATA_1KYU,q12:window.REORDER_1KYU};
const enemyKinds=['intro','normal','swift','tank','boss'],enemyNames=['森の入口の小番人','装甲甲虫','霧の山猫','遺跡門の番人','ことばの祭壇の守護者'];
const defaults=['N_echo','N_aid','N_comfort','N_prepare'];
function tell(t){$('notice').textContent=t;}
function guarded(fn){return (...args)=>{if(blocked)return;try{assertAccount();fn(...args);}catch(e){fail(e);}};}
function assertAccount(){if((localStorage.getItem('goimon_cloud_v2:active')||'guest')!==account)throw Error('アカウントが変わりました。再読み込みして続けてください。');}
function save(){assertAccount();store.save(state);}
function fail(e){blocked=true;clearInterval(interval);clearTimeout(skipTimer);tell(e.message+' 進行の書き出しはメニューから利用できます。');app.querySelectorAll('button,select').forEach(b=>b.disabled=true);}
function button(text,fn,primary=false){const b=document.createElement('button');b.textContent=text;if(primary)b.className='primary';b.onclick=guarded(fn);return b;}
function text(tag,value,parent=app,cls=''){const el=document.createElement(tag);el.textContent=value;if(cls)el.className=cls;parent.append(el);return el;}
function card(parent=app,cls='card'){const el=document.createElement('section');el.className=cls;parent.append(el);return el;}
function pets(){const current=JSON.parse(GOIMONStorage.getItem('zensho_goimon_current_v4_lv1')||'null'),archive=JSON.parse(GOIMONStorage.getItem('zensho_goimon_archive_v4_lv1')||'[]');return [current,...archive].filter(Boolean);}
function partner(){return pets().find(p=>p.id===state?.partnerId)||state?.pet;}
function names(){return {playerName:N.playerName(sessionStorage,GOIMON_CLOUD_CONFIG.apiBase,account==='guest'?null:account),partnerName:N.partnerName(partner(),GoimonDex)};}
const interpolate=s=>N.interpolate(s,names());
function picture(p=partner()){return GoimonDex.getEntry(p?.type,p?.stage)?.image||'images/goimon/goimon_egg.png';}
function sceneArt(kind,enemy){const el=card(app,'scene '+kind),img=document.createElement('img');img.src=picture();img.alt=names().partnerName;img.onerror=()=>{img.hidden=true;};el.append(img);if(enemy){if(enemy==='mist'){text('span','≋',el,'mist-symbol').setAttribute('aria-label','黒い霧');}else{const foe=document.createElement('img');foe.src='local-preview/art/enemy'+enemy+'.jpeg';foe.alt=enemyNames[enemy-1];foe.onerror=()=>{foe.hidden=true;text('span',enemyNames[enemy-1],el);};el.append(foe);}}return el;}
function fresh(p,skills,gear){return {version:1,scriptVersion:D.scriptVersion,revision:0,partnerId:p.id,pet:p,scene:0,line:0,mode:'story',read:[],cleared:[],tutorial:T.create(),skills,gear,run:null,combat:null,question:null,feedback:null,checkpoint:null,misses:[],completed:false};}
function setup(restart=false){clearInterval(interval);app.replaceChildren();text('p','GOIMON QUEST · 第1章',app,'eyebrow');text('h1','聞こえた言葉');text('p','ある日、相棒の声が届いた。ことばの森で始まる、ふたりの冒険。');
const c=card();text('h2','一緒に出発する相棒',c);let list=pets();if(!list.length)list=[{id:'chapter-demo-partner',type:'nagomi',stage:'child',nickname:'',stats:{chie:0,kotoba:0,onkan:0,bunmyaku:0}}];
const petLabel=text('label','相棒（1級の現役・保存箱）',c),select=document.createElement('select');select.id='partner';list.forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=N.partnerName(p,GoimonDex);select.append(o);});petLabel.append(select);
if(state&&list.some(x=>x.id===state.partnerId))select.value=state.partnerId;
text('p','開発版の体験編成です。実際のSKILL・EQUIPMENT所持数は変更しません。未接続の大問1・3の技は選択できません。',c,'small');
const selects=[];for(let i=0;i<4;i++){const label=text('label','SKILL '+(i+1),c),s=document.createElement('select');s.id='chapterSkill'+i;const none=document.createElement('option');none.value='';none.textContent='セットしない';s.append(none);C.skills.forEach(x=>{const o=document.createElement('option');o.value=x.id;o.disabled=!Q.supported.includes(x.questionFormat);o.textContent=x.rarity+' '+x.name+' · '+(C.questionFormats[x.questionFormat]?.label||x.questionFormat)+' · '+x.uses+'回'+(o.disabled?'（準備中）':'');s.append(o);});s.value=state?.skills[i]||defaults[i];label.append(s);selects.push(s);}
const gearLabel=text('label','EQUIPMENT（体験用）',c),gear=document.createElement('select');gear.id='chapterGear';C.gear.forEach(x=>{const o=document.createElement('option');o.value=x.id;o.textContent=x.name;gear.append(o);});gear.value=state?.gear||'none';gearLabel.append(gear);
text('p','STAGE1〜5はHPと技の残り回数を引き継ぎます。単語問題は1〜4が10秒、5が5秒。大問別SKILLは30秒、語句整序は45秒です。',c,'small');
c.append(button(restart?'この編成で森の入口から再挑戦':'物語をはじめる',()=>{const ids=selects.map(s=>s.value).filter(Boolean);if(new Set(ids).size!==ids.length){tell('同じSKILLは複数セットできません。');return;}
 const p=list.find(p=>p.id===select.value);if(restart){state.partnerId=p.id;state.pet=p;state.skills=ids;state.gear=gear.value;state.scene=6;state.line=0;state.mode='story';state.run=null;state.combat=null;state.question=null;state.feedback=null;state.misses=[];}else state=fresh(p,ids,gear.value);save();render();},true));
if(state)c.append(button('続きに戻る',render));}
function advance(){const s=D.scenes[state.scene],line=s.lines[state.line];if(line&&!state.read.includes(line.id))state.read.push(line.id);state.line++;if(state.line>=s.lines.length){if(state.scene===D.scenes.length-1){state.mode='complete';state.completed=true;}else{state.scene++;state.line=0;}}save();render();}
function render(){clearInterval(interval);clearTimeout(skipTimer);app.replaceChildren();tell('');if(blocked)return;
if(!state){setup();return;}if(state.mode==='complete'){complete();return;}if(state.mode==='battle'){battleView();return;}if(state.mode==='defeat'){defeat();return;}if(state.mode==='gift'){gift();return;}
const s=D.scenes[state.scene],line=s.lines[state.line];if(!line)throw Error('場面の続きが見つかりません');text('p','第1章 · '+s.title,app,'eyebrow');sceneArt(s.background);
if(line.event){const box=card();text('h2',line.event==='tutorial'?'モリィと戦い方を練習':line.event==='gift'?'体験ガチャと装備':line.battleId==='mist'?'黒い霧から守護者を救おう':'STAGE '+line.battleId+' · '+enemyNames[line.battleId-1],box);
 if(line.event==='gift')box.append(button('装備の練習へ',()=>{state.mode='gift';save();render();},true));
 else{if(line.battleId==='mist')text('p','STAGE5からのHP・技を引き継ぎます。敗北したら戦闘直前の状態から再挑戦できます。編成を変える場合は、既読を残して森の入口からやり直せます。',box);box.append(button('準備できた・戦闘へ',()=>startBattle(line.event==='tutorial'?0:line.battleId),true));}return;}
const panel=card(app,'text-panel');text('p',interpolate(line.speaker)||'ことばの森',panel,'speaker');text('p',interpolate(line.text),panel,'story-text');
text('p',(state.scene+1)+' / 20 場面 · '+(state.line+1)+' / '+s.lines.length+' 行',app,'progress');
const actions=card(app,'actions');const next=button(state.scene===19&&state.line===s.lines.length-1?'第1章を終える':'次へ',advance,true);next.id='next';actions.append(next,button('履歴',showHistory),button('既読をスキップ',()=>{function step(){if(blocked||state.mode!=='story')return;const l=D.scenes[state.scene].lines[state.line];if(!l||l.event||!state.read.includes(l.id))return;advance();skipTimer=setTimeout(guarded(step),80);}step();}));
let down;panel.onpointerdown=e=>{down={x:e.clientX,y:e.clientY};};panel.onpointerup=guarded(e=>{if(down&&Math.abs(e.clientX-down.x)<8&&Math.abs(e.clientY-down.y)<8&&!getSelection().toString())advance();down=null;});}
function makeActor(){const p=partner()||state.pet,species=C.species.find(x=>x.id===p.type)||C.species[0],stats=Object.fromEntries(['chie','kotoba','onkan','bunmyaku'].map(k=>[k,Math.max(0,Number(p.stats?.[k])||0)]));state.pet=structuredClone(p);return E.actor(species,C.stages[p.stage]||1,stats,C.gear.find(x=>x.id===state.gear),state.skills.map(id=>C.skills.find(x=>x.id===id)));}
function enemy(id,player){const kind=id==='mist'?'boss':enemyKinds[id-1],base=id===0?{hp:999,attack:2,defense:10,speed:1,skillTurns:0,skillPower:1}:C.enemies[kind],scale=C.stages[state.pet.stage]||1;const e={...base,id:'chapter-enemy',attr:id==='mist'?'mirage':id===3?'mirage':'metal',reference:20*scale,shield:{hits:0,factor:1}};for(const stat of ['hp','attack','defense','speed'])e[stat]=Math.round(e[stat]*scale);if(id==='mist'){e.hp=Math.round(90*scale);e.attack=Math.round(10*scale);}e.maxHp=e.hp;if(id===0)e.speed=0;return e;}
function startBattle(id,retry=false){let p;if(retry){p=structuredClone(state.checkpoint);}
else if(id===0){p=makeActor();p.hp=p.maxHp;p.skills=[{...C.skills.find(x=>x.id==='N_echo'),left:3,maxUses:3}];}
else{p=state.run?structuredClone(state.run):makeActor();if(p.hp<=0)throw Error('森の入口から再挑戦してください');state.checkpoint=structuredClone(p);}
if(id===0)state.checkpoint=structuredClone(p);state.battleId=id;state.combat=E.create(p,enemy(id,p));state.mode='battle';state.question=null;state.feedback=null;state.misses=[];state.combat.log=[];save();render();}
function battleView(){const b=state.combat,id=state.battleId;app.id='app';const root=card(app,'battle');root.id='arena';
const hud=card(root,'hud');for(const [name,a]of [[names().partnerName,b.player],[id===0?'モリィの練習':id==='mist'?'黒い霧':enemyNames[id-1],b.enemy]]){const c=card(hud,'');text('p',name+' · HP '+a.hp+'/'+a.maxHp,c);const bar=document.createElement('progress');bar.max=a.maxHp;bar.value=a.hp;bar.setAttribute('aria-label',name+'のHP');c.append(bar);}
const art=sceneArt(id==='mist'?'mist':'forest',id||null);root.append(art);
const panel=card(root,'question');panel.id='question';
if(state.feedback){text('p',state.feedback.correct?'正解！':'もう一度、覚えよう',panel,'feedback');text('p',state.feedback.answer,panel);text('p',state.feedback.action,panel);panel.append(button('次へ',()=>{state.feedback=null;if(id===0&&state.tutorial.trained){state.combat=null;state.mode='story';advance();return;}if(b.ended){finishBattle();return;}save();render();},true));return;}
if(b.ended){finishBattle();return;}
text('p',id===0?'練習 '+(state.tutorial.practice+1)+'/3：'+['通常攻撃を選ぼう','問題に答えて防ごう','SKILLを使ってみよう'][state.tutorial.practice]:(E.current(b)==='player'?'あなたのターン':'敵の攻撃 · 正解でダメージ軽減'),panel,'small');
if(state.question){questionView(panel);return;}
if(E.current(b)==='enemy'){panel.append(button('防御の問題へ',()=>ask('normal'),true));return;}
const actions=card(panel,'grid');let commands=E.commands(b);if(id===0)commands=commands.filter(x=>state.tutorial.practice===0?x.id==='normal':x.id==='skill:0');
for(const cmd of commands){const skill=cmd.id==='normal'?null:b.player.skills[Number(cmd.id.slice(-1))];const btn=button(cmd.name+(skill?' · 残り'+skill.left+'/'+skill.maxUses+'回':''),()=>ask(cmd.id));btn.disabled=cmd.disabled||!!(skill&&!Q.supported.includes(skill.questionFormat));btn.className='skill';if(skill)text('small',C.questionFormats[skill.questionFormat]?.label||skill.questionFormat,btn);actions.append(btn);}
const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='SKILLの効果';details.append(summary);b.player.skills.forEach(s=>text('p',s.name+'：'+s.description,details,'small'));panel.append(details);}
function ask(command){const b=state.combat,format=GoimonSkillQuestionRouting.skillFormat(b.player.skills,command,E.current(b),state.battleId===0),stage=state.battleId==='mist'?5:state.battleId||1;
const q=Q.select(format,stage,source,GoimonQuestQuestionBank,Math.random,state.lastQuestion||'');state.lastQuestion=q.id;
const seconds=state.battleId===0?null:format==='q12'?45:format==='word_meaning'?(state.battleId===5?5:10):30;
state.question={...q,command,selected:[],deadline:seconds?Date.now()+seconds*1000:null};save();render();}
function questionView(panel){const q=state.question;const labels={word_meaning:'英語の意味を選ぼう',idiom:'同じ意味の英語表現を選ぼう',q9:'空所に入る最も適切な語句を選ぼう',q11:'文aと文bが同じ意味になる語句を選ぼう',q12:'語句を正しい順番に並べよう'};const timer=text('span','',panel,'timer');timer.id='timer';text('p',labels[q.format],panel,'small');text('h2',q.prompt,panel);
if(q.format==='q12'){const chosen=card(panel,'chips');chosen.id='chosen';for(const id of q.selected){const chunk=q.chunks.find(c=>c.id===id);chosen.append(button(chunk.text,()=>{q.selected=q.selected.filter(x=>x!==id);save();render();}));}
 const choices=card(panel,'chips');for(const ch of q.chunks){const b=button(ch.text,()=>{q.selected.push(ch.id);save();render();});b.disabled=q.selected.includes(ch.id);choices.append(b);}const submit=button('この順番で答える',()=>answer([...q.selected]),true);submit.disabled=q.selected.length!==q.chunks.length;panel.append(submit,button('並べ直す',()=>{q.selected=[];save();render();}));
}else{const choices=card(panel,'grid');choices.id='choices';for(const value of q.choices)choices.append(button(value,()=>answer(value)));}
if(q.deadline){const tick=()=>{if(!state.question||blocked)return;const left=q.deadline-Date.now();timer.textContent=Math.max(0,Math.ceil(left/1000))+'秒';if(left<=0)guarded(()=>answer(null))();};interval=setInterval(tick,200);tick();}}
function answer(value){if(!state.question)return;clearInterval(interval);const q=state.question,expired=q.deadline&&Date.now()>=q.deadline,correct=!expired&&Q.correct(q,value),side=E.current(state.combat);
const entry=E.resolve(state.combat,q.command,correct);if(state.battleId===0)T.practice(state.tutorial,side==='enemy'?'defense':q.command==='normal'?'normal':'skill');
const answerText=q.format==='q12'?q.answer.map(id=>q.chunks.find(c=>c.id===id).text).join(' '):q.answer;
if(!correct)state.misses.push({prompt:q.prompt,answer:answerText,review:q.review,reviewId:q.reviewId});state.feedback={correct,answer:(expired?'時間切れ。':'')+'正答：'+answerText,action:entry.text};state.question=null;state.run=state.battleId===0?state.run:structuredClone(state.combat.player);save();render();app.querySelector('.scene')?.classList.add('strike');}
function finishBattle(){if(state.combat.winner!=='player'){state.mode='defeat';save();render();return;}const id=state.battleId;if(!state.cleared.includes(id))state.cleared.push(id);state.run=structuredClone(state.combat.player);state.combat=null;state.question=null;state.mode='story';advance();}
function gift(){text('h1','モリィと装備の練習');const c=card();text('p','体験用のほしのかけらと装備です。実際の所持品には加算されません。',c);text('p','体験用 ✦ '+state.tutorial.shards,c);
if(!state.tutorial.claimed)c.append(button('体験用10個を受け取る',()=>{T.claim(state.tutorial);save();render();},true));
else if(!state.tutorial.item)c.append(button('装備ガチャをひく · ✦10',()=>{T.draw(state.tutorial,C.gear);save();render();},true));
else{text('h2',state.tutorial.item.name,c);text('p',state.tutorial.item.description,c);c.append(button('体験装備をセットして進む',()=>{if(!state.tutorial.equipped)T.equip(state.tutorial);if(state.gear==='none')state.gear=state.tutorial.item.id;state.mode='story';save();advance();},true));}}
function defeat(){text('h1','もう一度、声をつなごう');text('p',state.battleId==='mist'?'守護者の救出は、まだ終わっていません。黒い霧との戦闘直前から再挑戦できます。':'少し準備して、もう一度森へ。読んだ物語とクリア済みの記録は残ります。');const c=card();if(state.misses.length){text('h2','間違えた問題を復習',c);for(const m of state.misses){text('p',m.prompt+' → '+m.answer,c);const a=document.createElement('a');const u=new URL(m.review,location.href);u.searchParams.set('reviewIds',String(m.reviewId));u.searchParams.set('returnTo','quest_chapter1.html');if(m.review==='idiom_quiz.html')u.searchParams.set('idiomMode','synonym');a.href=u.pathname+u.search;a.onclick=e=>{e.preventDefault();guarded(()=>{GOIMONStorage.setItem('zensho_level_v1','1');location.assign(a.href);})();};a.textContent='対応する学習画面へ';a.className='button';c.append(a);}}
if(state.battleId==='mist')c.append(button('霧の戦闘直前から再挑戦',()=>startBattle('mist',true),true));c.append(button('編成を見直して森の入口から',()=>setup(true)));}
function showHistory(){const body=$('logBody');body.replaceChildren();for(const s of D.scenes){const lines=s.lines.filter(l=>!l.event&&state?.read.includes(l.id));if(!lines.length)continue;text('h3',s.title,body);for(const l of lines)text('p',(l.speaker?interpolate(l.speaker)+'\n':'')+interpolate(l.text),body);}if(!body.children.length)text('p','読み終えた文章がここに残ります。',body);if($('menu').open)$('menu').close();$('log').showModal();}
function complete(){text('p','CHAPTER 1 · COMPLETE',app,'eyebrow');text('h1','聞こえた言葉');sceneArt('forest');text('p','相棒とつないだ声は、森の外へ。第1章クリア！');text('p','物語の続きは準備中です。');const c=card();c.append(button('物語を読み返す',showHistory,true),button('別の編成で森に再挑戦',()=>setup(true)));const a=document.createElement('a');a.className='button';a.href='index.html';a.textContent='ホームへ戻る';c.append(a);}
$('home').onclick=()=>{clearTimeout(skipTimer);$('menu').showModal();};$('resume').onclick=()=>$('menu').close();$('closeLog').onclick=()=>$('log').close();$('history').onclick=guarded(showHistory);
$('restartRun').onclick=guarded(()=>{if(!state)return;if(!state.tutorial.complete){tell('教習と体験装備を終えてから編成を変更できます。');return;}if(confirm('既読とクリア記録を残して、森の入口から挑戦し直しますか？')){$('menu').close();setup(true);}});
$('export').onclick=()=>{const content=state?JSON.stringify(state,null,2):store?.raw()||'';const url=URL.createObjectURL(new Blob([content],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='GOIMON-chapter1-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
window.addEventListener('storage',e=>{if(e.key==='goimon_cloud_v2:active'||e.key===key)fail(Error('別のタブでアカウントまたは進行が更新されました。再読み込みしてください。'));});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target===document.body&&!$('menu').open&&!$('log').open){const b=$('next');if(b){e.preventDefault();b.click();}}});
window.GoimonChapter1=Object.freeze({snapshot:()=>structuredClone(state)});
try{store=GoimonChapterStore.create(localStorage,key,D);state=store.load();render();}catch(e){fail(e);}
})();
