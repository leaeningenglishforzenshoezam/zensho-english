/* Chapter 3 browser adapter. Keeps Chapter 1/2 and the shared combat core unchanged. */
(async()=>{'use strict';
const D=GoimonChapter3Data,C3=GoimonChapter3Choices,P=GoimonChapter3Progress,B=GoimonChapter3Battle;
const C=GoimonBattleCatalog,E=GoimonBattlePrototype,Q=GoimonChapterQuestions,N=GoimonStoryNames;
const $=id=>document.getElementById(id),app=$('app'),account=GOIMONProfiles.account||'guest';
const key='goimon_chapter3_v1:'+account+':lv1'+(window.GoimonDeveloper?.keySuffix||'');
const clone=x=>JSON.parse(JSON.stringify(x));
const source={q1:window.ACCENT_1KYU,q3:window.LISTENING_TYPE3_1KYU,words:window.WORDS_1KYU,idioms:window.IDIOM_DATA_1KYU,q9:window.SENTENCE_FIXED_1KYU,q11:window.PARAPHRASE_DATA_1KYU,q12:window.REORDER_1KYU,words2:window.WORDS_2KYU,extraWords:window.EXTRA_WORDS};
let state=null,store=null,timer=null,blocked=!!window.GoimonEconomyReady;
function el(tag,value,parent=app,cls=''){const node=document.createElement(tag);node.textContent=value||'';if(cls)node.className=cls;parent.append(node);return node;}
function btn(text,fn,parent=app,primary=false){const b=el('button',text,parent,primary?'primary':'');b.onclick=guard(fn);return b;}
function link(text,href,parent=app){const a=el('a',text,parent,'link');a.href=href;return a;}
function notice(message){$('notice').textContent=message||'';}
function clearTimer(){if(timer){clearInterval(timer);timer=null;}}
function music(type){window.GoimonQuestAudio?.setMode(type);}
function guard(fn){return (...args)=>{if(blocked)return;try{
 if((localStorage.getItem('goimon_cloud_v2:active')||'guest')!==account)throw Error('アカウントが変わりました。再読み込みしてください。');
 if(!(window.GoimonDeveloper?.active||GoimonChapter3Access.current()))throw Error('第2章のクリア記録を確認できません。');
 fn(...args);
 }catch(err){fail(err);}};}
function fail(err){blocked=true;clearTimer();window.GoimonQuestQuestionAudio?.stop();notice(err.message+' 現在の進行記録は上書きしていません。');app.querySelectorAll('button,select').forEach(x=>x.disabled=true);}
function save(){P.syncDecision(state);store.save(state);}
function pets(){
 if(window.GoimonDeveloper?.active)return [GoimonDeveloper.pet];
 const cur=JSON.parse(GOIMONStorage.getItem('zensho_goimon_current_v4_lv1')||'null');
 const archive=JSON.parse(GOIMONStorage.getItem('zensho_goimon_archive_v4_lv1')||'[]');
 return [cur,...(Array.isArray(archive)?archive:[])].filter(Boolean).filter((p,i,a)=>a.findIndex(x=>x.id===p.id)===i);
}
function partner(){return pets().find(x=>x.id===state?.partnerId)||state?.pet;}
function names(){return {playerName:N.playerName(sessionStorage,GOIMON_CLOUD_CONFIG.apiBase,account==='guest'?null:account),partnerName:N.partnerName(partner(),GoimonDex)};}
function interpolate(s){return N.interpolate(String(s||''),names());}
const imageChecks=new Map();
function showAsset(url,onReady){
 if(!url)return;
 let status=imageChecks.get(url);
 if(!status){
  status=new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(true);image.onerror=()=>resolve(false);image.src=url;});
  imageChecks.set(url,status);
 }
 status.then(ok=>{if(ok)onReady(url);}).catch(()=>{});
}
function stage(parent,battle=false){
 const scene=D.scenes[state.scene],wrap=el('div','',parent,'stage'),visual=GoimonChapter3Assets.frame(scene.id,state.line,state.budRoute,battle?state.battleId:null);
 wrap.dataset.background=visual.background;
 const background=visual.event?GoimonChapter3Assets.path('events',visual.event):GoimonChapter3Assets.path('backgrounds',visual.background);
 showAsset(background,url=>{if(wrap.isConnected){wrap.style.backgroundImage='url("'+url+'")';wrap.classList.add('art-ready');}});
 if(!visual.event){
  // Partner identity varies by player and must never be represented by a fixed chapter sprite.
  const pet=partner(),petImage=GoimonDex.getEntry(pet?.type,pet?.stage)?.image;
  if(petImage){
   const sprite=el('img','',wrap,'character chapter3-partner');sprite.alt='';sprite.setAttribute('aria-hidden','true');
   showAsset(petImage,url=>{if(sprite.isConnected)sprite.src=url;});
  }
  for(const [index,item]of visual.people.entries()){
   const sprite=el('img','',wrap,'character ch3-cast ch3-cast-'+index);
   sprite.alt='';sprite.setAttribute('aria-hidden','true');
   const url=GoimonChapter3Assets.path(item.kind,item.key);
   showAsset(url,ready=>{if(sprite.isConnected)sprite.src=ready;});
  }
 }
 const label=el('div',scene.title,wrap,'stage-label');
 if(battle)wrap.classList.add('encounter');
 return wrap;
}
function skillsInventory(){return window.GoimonDeveloper?.active?GoimonDeveloper.inventory(C):GoimonItemStore.readState(GOIMONStorage,'1');}
function setup(restart=false){
 clearTimer();window.GoimonQuestQuestionAudio?.stop();window.GoimonStudyTime?.end();music('setup');app.replaceChildren();
 el('p','CHAPTER 03 · 1級',app,'eyebrow');el('h1','山道の罠');
 const box=el('section','',app,'panel quest-setup-card'),list=pets().filter(GoimonChapterStore.eligible);
 el('h2','冒険の準備',box);
 if(!list.length){el('p','参加できる相棒がいません。たまご・幼体・成長体を選んでください。',box);link('育成・保存箱へ','index.html?panel=goimon&manage=1',box);return;}
 const inv=skillsInventory(),select=el('select','',el('label','一緒に出発するゴイモン',box,'quest-setup-picker'));
 for(const pet of list){const o=el('option',N.partnerName(pet,GoimonDex),select);o.value=pet.id;}
 if(state&&list.some(x=>x.id===state.partnerId))select.value=state.partnerId;
 const overview=el('div','',box,'quest-setup-overview');
 const preview=GoimonQuestPartnerPreview.mount(overview,select,list,GoimonDex,N);
 const loadout=el('section','',overview,'quest-setup-loadout'),grid=el('div','',loadout,'quest-skill-grid');
 el('h3','SKILL・EQUIPMENT',loadout);
 const skillSelectors=[];
 for(let i=0;i<4;i++){
  const field=el('select','',el('label','SKILL '+(i+1),grid,'quest-skill-field'));
  const none=el('option','セットしない',field);none.value='';
  for(const sk of C.skills.filter(s=>(inv.owned?.skills?.[s.id]||0)>0)){
   const opt=el('option',sk.rarity+' '+sk.name+' · '+sk.uses+'回',field);opt.value=sk.id;
   opt.disabled=!Q.supported.includes(sk.questionFormat);
  }
  skillSelectors.push(field);
 }
 const gearSelect=el('select','',el('label','EQUIPMENT',loadout,'quest-gear-field'));
 for(const item of C.gear.filter(g=>g.id==='none'||(inv.owned?.gear?.[g.id]||0)>0)){const opt=el('option',item.name,gearSelect);opt.value=item.id;}
 el('p','First Aidは全員が使用できます。',loadout,'quest-setup-perk');
 function refresh(){
  preview.refresh();const load=inv.loadouts?.[select.value]||{};
  skillSelectors.forEach((field,i)=>{const id=load.skillIds?.[i];field.value=(inv.owned?.skills?.[id]||0)>0&&Q.supported.includes(C.skills.find(s=>s.id===id)?.questionFormat)?id:'';});
  gearSelect.value=(inv.owned?.gear?.[load.gearId]||0)>0?load.gearId:'none';
 }
 select.onchange=refresh;refresh();
 const help=el('details','',box);el('summary','参加条件・進行について',help);
 el('p','参加できるのはたまご・幼体・成長体。学習問題の正解は相棒の成長につながります。',help);
 el('p','第3章は19シーン、8回の行動選択、共闘・対決の2つの結末を持ちます。選択履歴と進行は途中保存されます。',help);
 el('p','英語の選択肢には日本語訳が併記されます。選択肢に正誤はありません。',help);
 if(restart)btn('続きへ戻る',render,box);
 btn(restart?'この編成で第3章を最初から':'この相棒と出発',()=>{
  const pet=list.find(x=>x.id===select.value);GoimonChapterStore.assertEligible(pet);
  const ids=skillSelectors.map(f=>f.value).filter(Boolean);
  if(new Set(ids).size!==ids.length){notice('同じSKILLは複数セットできません。');return;}
  if(restart&&!confirm('第3章の最初からやり直しますか？ 今回の行動選択と戦闘はリセットされます。学習・育成記録は残ります。'))return;
  const next=restart?P.restart(state,D,pet,ids,gearSelect.value):P.fresh(D,pet,ids,gearSelect.value);
  store.save(next);state=next;render();
 },box,true);
}
function locked(){
 clearTimer();music('setup');app.replaceChildren();el('h1','第3章 山道の罠');el('p','第2章クリア後に解放されます。');link('第2章へ','quest_chapter2.html');link('クエストホーム','quest_home.html?chapter=chapter3');
}
function story(){
 music('story');app.replaceChildren();
 const scene=D.scenes[state.scene],node=P.current(state,D);if(state.mode==='complete'){render();return;}
 el('p','CHAPTER 03 · '+scene.title,app,'eyebrow');stage(app);
 const panel=el('section','',app,'panel');
 if(node.type==='choice'){
  const event=C3.byId[node.choiceId];
  el('h2','どうする？',panel,'choice-title');
  const options=el('div','',panel,'decision-options');
  event.options.forEach((op,i)=>{
   const b=btn('',()=>{P.choose(state,D,event.id,op.key);save();render();},options);
   b.className='decision-option';
   el('span',String.fromCharCode(65+i),b,'choice-letter');
   const body=el('span','',b);
   el('strong',op.en,body);el('small',op.ja,body);
  });
 }else if(node.type==='battle'){
  const spec=D.battles.find(b=>b.id===node.battleId);
  el('h2',spec.name,panel);
  el('p',spec.objective==='survive'?'攻撃をしのぎ、救出や脱出の機会を待とう。':'問題に答え、相棒と連携して戦おう。',panel,'muted');
  btn('戦闘へ',()=>startBattle(),panel,true);
 }else {
  if(node.speaker)el('p',interpolate(node.speaker),panel,'speaker');
  el('p',interpolate(node.text),panel,node.speaker?'story-text':'story-text narration-text');
  const actions=el('div','',panel,'actions');
  GoimonQuestLearning.nextKey(btn('次へ',()=>{P.advance(state,D);save();render();},actions,true));
  btn('履歴',history,actions);
 }
 el('p','場面 '+(state.scene+1)+' / '+D.scenes.length,app,'story-progress');
}
function actor(){
 const pet=state.pet,species=C.species.find(s=>s.id===pet.type)||C.species[0];
 const points=Object.fromEntries(['chie','kotoba','onkan','bunmyaku'].map(k=>[k,Math.max(0,Number(pet.stats?.[k])||0)]));
 return E.actor(species,C.stages[pet.stage]||1,points,C.gear.find(g=>g.id===state.gear)||C.gear.find(g=>g.id==='none'),state.skills.map(id=>C.skills.find(s=>s.id===id)).filter(Boolean));
}
function startBattle(retry=false){
 GoimonChapterStore.assertEligible(state.pet);
 const node=P.current(state,D),id=node?.battleId;
 if(!id)throw Error('戦闘位置が一致しません。');
 const player=retry?clone(state.checkpoint):state.run?clone(state.run):actor();
 E.ensureFirstAid(player,C);
 if(!Number.isFinite(player.wordPoints))player.wordPoints=Math.max(0,Number(state.pet.stats?.kotoba)||0);
 const enemy=B.enemy(C,id,C.stages[state.pet.stage]),combat=E.create(player,enemy);
 if(id==='bado')combat.extraInterval=0; // The chase has evasion turns, not consecutive attacks.
 P.beginBattle(state,D,player,combat);
 state.question=null;state.feedback=null;save();render();
}
function battleResult(){
 const b=state.combat,id=state.battleId,objective=D.battles.find(x=>x.id===id)?.objective;
 const panel=el('section','',app,'panel');
 el('h2',objective==='survive'?'切り抜けた！':'勝利！',panel);
 el('p',objective==='survive'?'相棒と協力して耐え抜いた。物語が続きます。':'連携によって敵の動きが止まった。',panel,'story-text');
 const result=el('div','',panel);
 GoimonQuestLearning.result(result,b,{guard,onAnswer:(q,correct)=>GoimonQuestGrowth.practice(state,q,correct,save),
  onContinue:()=>{P.finishBattle(state,D);save();render();},recoveryState:state,
  onSkillRestore:id=>GoimonQuestLearning.restoreSkill(state,id,save)});
}
function battleView(){
 clearTimer();app.replaceChildren();const b=state.combat,id=state.battleId;
 music(id.startsWith('hiro')||id==='bado'?'boss':'battle');
 el('p','CHAPTER 03 · '+D.battles.find(x=>x.id===id).name,app,'eyebrow');
 const wrap=el('div','',app,'battle'),hud=el('div','',wrap,'hud');
 for(const [name,a] of [[names().partnerName,b.player],[D.battles.find(x=>x.id===id).name,b.enemy]]){
  const box=el('div','',hud);
  const scripted=['bado','ambush'].includes(id)&&a===b.enemy;
  const max=scripted?B.durability[id].requiredQuestions:a.maxHp;
  const value=scripted?Math.min(max,b.questions):a.hp;
  el('p',scripted?'対応した問題 '+value+' / '+max:name+' · HP '+a.hp+'/'+a.maxHp,box);
  const meter=el('progress','',box);meter.max=max;meter.value=value;
 }
 stage(wrap,true);
 if(id==='hiro_ally')el('p','バドが斧の攻撃を妨げ、受けるダメージが減少しています。',wrap,'quest-battle-hint');
 if(id==='hiro_duel')el('p','障害物を利用してヒロトシの攻撃をしのごう。',wrap,'quest-battle-hint');
 if(id==='bado')el('p','バドと戦うのではなく、追跡をかわそう。移動や防御の問題で進みます。',wrap,'quest-battle-hint');
 const panel=el('section','',wrap,'panel');
 if(state.feedback){
  const f=state.feedback;
  el('h2',f.correct?'正解！':f.expired?'時間切れ':'もう一度、覚えよう',panel,f.correct?'correct':'wrong');
  el('p','正答：'+f.answer,panel);el('p',f.action,panel);
  if(f.translation||f.explanation){
   const d=el('details','',panel);el('summary','訳・解説を見る',d);
   if(f.translation)el('p',f.translation,d);
   if(f.explanation)for(const s of [f.explanation.completed,...(f.explanation.notes||[])].filter(Boolean))el('p',s,d);
   GoimonQuestLearning.showChoiceMeanings(d,f.explanation);
  }
  GoimonQuestLearning.nextKey(btn('次へ',()=>{state.feedback=null;save();render();},panel,true));return;
 }
 if(b.ended){const spec=D.battles.find(x=>x.id===id);if(spec?.objective!=='survive'&&b.winner!=='player'){state.mode='defeat';save();defeat();return;}battleResult();return;}
 el('p',b.extraAttackPending?'追加攻撃！ 正解するともう一撃（SKILL不可）':E.current(b)==='player'?'攻撃を選ぼう':'敵の攻撃 · 正解でダメージ軽減',panel,'muted');
 if(state.question){questionView(panel);return;}
 if(E.current(b)==='enemy'){btn(id==='bado'?'バドの攻撃をかわす（防御問題）':'防御の問題へ',()=>ask('normal'),panel,true);return;}
 if(id==='bado'){
  const actions=el('div','',panel,'actions');btn('隙を見て進む（問題へ）',()=>ask('normal'),actions,true);
  for(const cmd of E.commands(b).filter(c=>c.id!=='normal')){
   const skill=b.player.skills[Number(cmd.id.split(':')[1])];
   if(!['heal','ward','weaken'].includes(skill?.type))continue;
   const button=btn(cmd.name+' · '+skill.left+'/'+skill.maxUses+'回',()=>ask(cmd.id),actions);
   button.disabled=cmd.disabled||!Q.supported.includes(skill.questionFormat);
  }
  return;
 }
 const actions=el('div','',panel,'actions');
 for(const cmd of E.commands(b)){
  const skill=cmd.id==='normal'?null:b.player.skills[Number(cmd.id.split(':')[1])];
  const button=btn(cmd.name+(skill?' · '+skill.left+'/'+skill.maxUses+'回':''),()=>ask(cmd.id),actions);
  button.disabled=cmd.disabled||!!(skill&&!Q.supported.includes(skill.questionFormat));
 }
 const detail=el('details','',panel);el('summary','技の効果・問題形式',detail);
 for(const s of b.player.skills)el('p',s.name+'：'+s.description,detail);
}
function ask(command){
 const b=state.combat,base=GoimonSkillQuestionRouting.skillFormat(b.player.skills,command,E.current(b),false),format=base;
 const stage={words:[1,500],idioms:[1,198]};
 const q=Q.select(format,stage,source,GoimonQuestQuestionBank,Math.random,state.lastQuestion||'');
 state.lastQuestion=q.id;
 const seconds=['q1','q3','audio_word_meaning'].includes(format)?null:format==='word_meaning'?10:format==='q12'?45:30;
 state.question={...q,command,selected:[],startedAt:Date.now(),deadline:seconds?Date.now()+seconds*1000:null};
 if(!window.GoimonDeveloper?.active)window.GoimonStudyTime?.begin(({q1:'accent',q3:'listening',word_meaning:'quiz_enja',audio_word_meaning:'audio_quiz',idiom:'idiom_quiz',q9:'sentence',q11:'paraphrase_quiz',q12:'reorder'})[format],'1');
 save();render();
}
function questionView(panel){
 const q=state.question,t=el('span','',panel,'timer');
 el('p',({q1:'最も強く読む音節を選ぼう',q3:'音声に合う応答を選ぼう',word_meaning:'英語の意味を選ぼう',audio_word_meaning:'音声を聞いて意味を選ぼう',idiom:'同じ意味の表現を選ぼう',q9:'空所に合う語句を選ぼう',q11:'文aと文bが同じ意味になる語句を選ぼう',q12:'語句を並べ替えよう'})[q.format]||'',panel,'muted');
 el('h2',q.prompt,panel,'prompt');window.GoimonQuestQuestionAudio?.mount(panel,q);
 if(q.format==='q12'){
  const chosen=el('div','',panel,'chips');
  for(const id of q.selected)btn(q.chunks.find(c=>c.id===id)?.text||'',()=>{q.selected=q.selected.filter(x=>x!==id);save();render();},chosen);
  const opts=el('div','',panel,'chips');
  for(const chunk of q.chunks){const b=btn(chunk.text,()=>{q.selected.push(chunk.id);save();render();},opts);b.disabled=q.selected.includes(chunk.id);}
  const send=btn('この順番で答える',()=>answer([...q.selected]),panel,true);send.disabled=q.selected.length!==q.chunks.length;
 }else{
  const options=el('div','',panel,'choices');
  q.choices.forEach((value,i)=>GoimonQuestLearning.choiceKey(btn(value,()=>answer(value),options),i));
 }
 if(!q.deadline){t.textContent='時間制限なし';return;}
 const tick=guard(()=>{if(!state.question)return;const ms=q.deadline-Date.now();t.textContent=Math.max(0,Math.ceil(ms/1000))+'秒';if(ms<=0)answer(null);});
 timer=setInterval(tick,200);tick();
}
function answer(value){
 const q=state.question;if(!q)return;
 window.GoimonQuestQuestionAudio?.stop();clearTimer();
 const expired=!!q.deadline&&Date.now()>=q.deadline,correct=!expired&&Q.correct(q,value);
 const b=state.combat,side=E.current(b),entry=E.resolve(b,q.command,correct,{elapsedMs:['q1','q3','audio_word_meaning'].includes(q.format)?Infinity:Date.now()-q.startedAt});
 if(state.battleId==='bado'&&side==='player'){
  // The duel-route encounter is a chase. Do not harm Bud while answering.
  b.enemy.hp=b.enemy.maxHp;
  if(q.command==='normal')entry.text=correct?'バドの動きを読み、距離をとった':'足場を探しながら下がった';
  else if(!entry.text.includes('回復'))entry.text='バドの動きをかわしながら '+entry.text;
 }
 if(!b.ended&&B.scriptedEnd(state.battleId,b)){b.ended=true;b.winner='survived';}
 const explanation=Q.explain?.(q,source),response=q.format==='q12'?q.answer.map(id=>q.chunks.find(c=>c.id===id)?.text||'').join(' '):q.answer;
 GoimonQuestLearning.record(b,q,correct,expired,explanation);
 if(!correct&&!state.misses.some(m=>m.review===q.review&&m.reviewId===q.reviewId))state.misses.push({prompt:q.prompt,answer:response,review:q.review,reviewId:q.reviewId});
 state.feedback={correct,expired,answer:response,action:entry.text,translation:q.translation||'',explanation:explanation||null};
 state.question=null;GoimonQuestGrowth.queue(state,q,correct);save();GoimonQuestGrowth.flush(state,save);
 try{if(!window.GoimonDeveloper?.active)window.ZenshoLearningLog?.addResult(({q1:'accent',q3:'listening',word_meaning:'quiz_enja',audio_word_meaning:'audio_quiz',idiom:'idiom_quiz',q9:'sentence',q11:'paraphrase_quiz',q12:'reorder'})[q.format],correct,{level:'1'});if(!window.GoimonDeveloper?.active)window.GoimonStudyTime?.end();}
 catch{notice('学習履歴の保存を確認できませんでした。第3章の進行は保存済みです。');}
 render();
}
function defeat(){
 music('setup');app.replaceChildren();el('h1','もう一度、挑もう');el('p','戦闘前のHP・技の回数に戻して再挑戦できます。',app);
 GoimonQuestLearning.result(el('section','',app,'panel'),state.combat,{guard,onAnswer:(q,c)=>GoimonQuestGrowth.practice(state,q,c,save),
  onContinue:()=>{
   const before=clone(state.checkpoint);
   state.mode='story';state.combat=null;state.battleId=null;state.checkpoint=null;state.question=null;state.feedback=null;
   const node=P.current(state,D),enemy=B.enemy(C,node.battleId,C.stages[state.pet.stage]);
   E.ensureFirstAid(before,C);P.beginBattle(state,D,before,E.create(before,enemy));save();render();
  },continueLabel:'戦闘直前から再挑戦',recoveryState:state,onSkillRestore:id=>GoimonQuestLearning.restoreSkill(state,id,save)});
}
function complete(){
 music('setup');app.replaceChildren();el('p','CHAPTER 03 · COMPLETE',app,'eyebrow');
 el('h1','山道の罠');el('p','トシャカへたどり着いた。バドとヒロトシの物語は、まだ終わっていない。');
 el('h2','CHAPTER 3 CLEAR');el('p','次の目的地：トシャカ');
 const actions=el('div','',app,'actions');btn('物語を振り返る',history,actions);btn('別の選択で再挑戦',()=>setup(true),actions);link('クエストホームへ','quest_home.html?chapter=chapter3',actions);
}
function render(){
 clearTimer();if(blocked)return;
 for(const p of [state?.run,state?.checkpoint,state?.combat?.player]){E.ensureFirstAid(p,C);E.refreshSkills(p,C);}
 if(!state){setup();return;}
 if(state.mode!=='complete'&&!GoimonChapterStore.eligible(partner())){setup(true);notice('この相棒は参加条件に合いません。別の相棒を選んでください。');return;}
 if(state.mode==='battle'){battleView();return;}
 if(state.mode==='defeat'){defeat();return;}
 if(state.mode==='complete'){complete();return;}
 story();
}
function history(){
 const body=$('history-body');body.replaceChildren();
 if(!state){el('p','まだ読んだ物語がありません。',body);}
 else for(const scene of D.scenes){
  const lines=[];
  for(const node of scene.nodes){
   if(node.type==='choice'){
    const key=state.choices[node.choiceId];
    if(!key)continue;
    const op=C3.option(node.choiceId,key);
    op.lines.forEach((l,i)=>{if(state.read.includes('ch3.'+node.choiceId+'.'+key+'.'+i))lines.push(l);});
   }else if((node.type==='line'||node.type==='narration')&&state.read.includes(node.id))lines.push(node);
  }
  if(!lines.length)continue;el('h2',scene.title,body);
  for(const line of lines){el('p',(line.speaker?interpolate(line.speaker)+'\n':'')+interpolate(line.text),body,line.speaker?'':'narration-text');}
 }
 if(!$('history-dialog').open)$('history-dialog').showModal();
}
$('restartRun').onclick=guard(()=>setup(!!state));
$('history').onclick=guard(history);
$('close-history').onclick=()=>$('history-dialog').close();
window.addEventListener('storage',e=>{if(e.key===key||e.key==='goimon_cloud_v2:active')fail(Error('別の画面で進行またはアカウントが更新されました。再読み込みしてください。'));});
GoimonQuestLearning.bindKeys(app);
window.GoimonChapter3=Object.freeze({snapshot:()=>state?clone(state):null});
try{
 if(window.GoimonEconomyReady)await window.GoimonEconomyReady;
 blocked=false;
 store=P.create(window.GoimonDeveloper?.storage||localStorage,key,D);
 if(window.GoimonDeveloper?.active||GoimonChapter3Access.current()){
  state=store.load();if(state)GoimonQuestGrowth.flush(state,save);
  render();
  if(new URLSearchParams(location.search).get('configure')==='1'&&state)setup(true);
 }else locked();
}catch(e){fail(e);}
})();
