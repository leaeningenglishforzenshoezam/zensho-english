(() => {'use strict';
const D=GoimonChapter1Data,C=GoimonBattleCatalog,E=GoimonBattlePrototype,T=GoimonQuestTutorial,Q=GoimonChapterQuestions,N=GoimonStoryNames,$=id=>document.getElementById(id),app=$('app');
const account=GOIMONProfiles.account||'guest',key='goimon_chapter1_v1:'+account+':lv1'+(window.GoimonDeveloper?.keySuffix||'');
let store,state=null,blocked=false,interval=null,skipTimer=null;
const source={q1:window.ACCENT_1KYU,q3:window.LISTENING_TYPE3_1KYU,words:window.WORDS_1KYU,idioms:window.IDIOM_DATA_1KYU,q9:window.SENTENCE_FIXED_1KYU,q11:window.PARAPHRASE_DATA_1KYU,q12:window.REORDER_1KYU};
const enemyKinds=['intro','normal','swift','tank','boss'],enemyNames=['森の入口の小番人','装甲甲虫','霧の山猫','遺跡門の番人','ことばの祭壇の守護者'];
const defaults=['N_echo','N_aid','N_comfort','N_prepare'];
function tell(t){$('notice').textContent=t;}
function guarded(fn){return (...args)=>{if(blocked)return;try{assertAccount();fn(...args);}catch(e){fail(e);}};}
function assertAccount(){if((localStorage.getItem('goimon_cloud_v2:active')||'guest')!==account)throw Error('アカウントが変わりました。再読み込みして続けてください。');}
function save(){assertAccount();store.save(state);}
function fail(e){window.GoimonQuestQuestionAudio?.stop();blocked=true;clearInterval(interval);clearTimeout(skipTimer);tell(e.message+' 進行の書き出しはメニューから利用できます。');app.querySelectorAll('button,select').forEach(b=>b.disabled=true);}
function button(text,fn,primary=false){const b=document.createElement('button');b.textContent=text;if(primary)b.className='primary';b.onclick=guarded(fn);return b;}
function text(tag,value,parent=app,cls=''){const el=document.createElement(tag);el.textContent=value;if(cls)el.className=cls;parent.append(el);return el;}
function card(parent=app,cls='card'){const el=document.createElement('section');el.className=cls;parent.append(el);return el;}
function pets(){if(window.GoimonDeveloper?.active)return [GoimonDeveloper.pet];const current=JSON.parse(GOIMONStorage.getItem('zensho_goimon_current_v4_lv1')||'null'),archive=JSON.parse(GOIMONStorage.getItem('zensho_goimon_archive_v4_lv1')||'[]');return [current,...archive].filter(Boolean);}
function partner(){return pets().find(p=>p.id===state?.partnerId)||state?.pet;}
function names(){return {playerName:N.playerName(sessionStorage,GOIMON_CLOUD_CONFIG.apiBase,account==='guest'?null:account),partnerName:N.partnerName(partner(),GoimonDex)};}
const interpolate=s=>N.interpolate(s,names());
function picture(p=partner()){return GoimonDex.getEntry(p?.type,p?.stage)?.image||'images/goimon/goimon_egg.png';}
let lastArtSpeaker='',storyArt=null,musicMode='setup';
function setMusicMode(next){musicMode=next;window.GoimonQuestAudio?.setMode(next);}
function sceneArt(kind,enemy){
 const fighting=typeof enemy==='number'||enemy==='mist',sc=state?.scene??0,ln=state?.line??0;
 const f=GoimonChapterStaging.frame(sc,ln,state?.mode==='complete');
 if(fighting){f.background='forest_battle';f.memory=false;f.people=['partner'];f.enemy=enemy||null;f.mist=false;if(enemy===0)f.people.push('morii');}
 const reuse=!fighting&&state?.mode==='story';
 const el=reuse&&storyArt?.parentNode===app?storyArt:card(app,'scene illustrated'),asset='images/quest/chapter1/';
 if(reuse)storyArt=el;
 el.className='scene illustrated '+(f.memory?'memory-art':'');
 if(f.enemy)el.classList.add(f.enemy===5||f.enemy==='mist'?'enemy-boss':f.enemy===4?'enemy-giant':'enemy-large');
 let bg=el.querySelector('.scene-background');if(!bg){bg=document.createElement('img');bg.className='scene-background';bg.alt='';el.append(bg);}const bgSrc=asset+f.background+'.png';if(bg.getAttribute('src')!==bgSrc)bg.src=bgSrc;
 const present=new Set();
 if(f.memory){el.querySelectorAll('.character').forEach(img=>img.remove());return el;}
 const line=D.scenes[sc]?.lines[ln],speaker=fighting?'':line?.speaker||'';
 const active=speaker==='{{partnerName}}'?'partner':speaker==='モリィ'?'morii':speaker==='？？？'?'unknown':['小番人','装甲甲虫','霧の山猫','門の番人','守護者'].includes(speaker)?'enemy':'';
 const moved=active&&active!==lastArtSpeaker;lastArtSpeaker=active;
 function add(key,src,alt,slot,extra=''){
  present.add(key);let img=el.querySelector('[data-character="'+key+'"]');if(!img){img=document.createElement('img');img.dataset.character=key;el.append(img);}if(img.getAttribute('src')!==src)img.src=src;img.alt=alt;img.className='character '+slot+' '+extra+(active?(active===key?' speaking':' listening'):'')+(moved&&active===key?' speak-motion':'');
 }
 const allies=f.people.includes('morii'),grouped=allies&&!!(f.enemy||f.mist||f.people.includes('unknown'));add('partner',picture(),names().partnerName,grouped?'ally-one':'ally-solo');
 if(allies){let expression='normal';if(sc===17)expression='serious';else if(active==='morii'&&/びっくり|へえ/.test(line?.text))expression='surprised';else if(sc===18)expression='smile';add('morii',asset+'morii_'+expression+'.png','モリィ',grouped?'ally-two':'morii-right');}
 if(f.enemy)add('enemy',asset+(f.enemy==='mist'?'black_mist':'enemy_0'+f.enemy)+'.png',f.enemy==='mist'?'黒い霧':enemyNames[f.enemy-1],'enemy-slot');
 if(f.people.includes('unknown'))add('unknown',asset+'unknown_presence.png','？？？','presence-slot');
 if(f.mist)add('mist',asset+(sc===19?'black_mist_going_anywhere':'black_mist')+'.png','黒い霧','mist-slot',f.departing?'mist-depart':'');
 el.querySelectorAll('.character').forEach(img=>{if(!present.has(img.dataset.character))img.remove();});
 if(sc===1&&ln>=6&&ln<=9)el.classList.add('rockfall-motion');
 return el;
}
function fresh(p,skills,gear){return {version:1,scriptVersion:D.scriptVersion,revision:0,partnerId:p.id,pet:p,scene:0,line:0,mode:'story',read:[],cleared:[],tutorial:T.create(),skills,gear,run:null,combat:null,question:null,feedback:null,checkpoint:null,misses:[],completed:false};}
function setup(restart=false){setMusicMode('setup');clearInterval(interval);app.replaceChildren();text('p','GOIMON QUEST · 第1章',app,'eyebrow');text('h1','聞こえた言葉');text('p','ある日、相棒の声が届いた。ことばの森で始まる、ふたりの冒険。');
const c=card();text('h2','一緒に出発する相棒',c);let list=pets();if(!list.length){text('p','ホームで1級の相棒を迎えてから、森へ出発しよう。',c);const link=document.createElement('a');link.href='index.html?panel=goimon&manage=1';link.className='button';link.textContent='ホームで相棒に会う';c.append(link);return;}
const inventory=window.GoimonDeveloper?.active?GoimonDeveloper.inventory(C):GoimonItemStore.parse(GOIMONStorage.getItem('goimon_item_state_v1_lv1'),'1');
const petLabel=text('label','相棒（1級の現役・保存箱）',c),select=document.createElement('select');select.id='partner';list.forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=N.partnerName(p,GoimonDex);select.append(o);});petLabel.append(select);
if(state&&list.some(x=>x.id===state.partnerId))select.value=state.partnerId;
text('p','所持している技と装備を選べます。技がなくても通常攻撃で挑戦できます。大問1・3の技は時間制限なしで音声を再生できます。',c,'small');
const selects=[];for(let i=0;i<4;i++){const label=text('label','SKILL '+(i+1),c),s=document.createElement('select');s.id='chapterSkill'+i;const none=document.createElement('option');none.value='';none.textContent='セットしない';s.append(none);C.skills.filter(x=>inventory.owned.skills[x.id]>0).forEach(x=>{const o=document.createElement('option');o.value=x.id;o.disabled=!Q.supported.includes(x.questionFormat);o.textContent=x.rarity+' '+x.name+' · '+(C.questionFormats[x.questionFormat]?.label||x.questionFormat)+' · '+x.uses+'回'+(o.disabled?'（準備中）':'');s.append(o);});label.append(s);selects.push(s);}
const gearLabel=text('label','EQUIPMENT',c),gear=document.createElement('select');gear.id='chapterGear';C.gear.filter(x=>x.id==='none'||inventory.owned.gear[x.id]>0).forEach(x=>{const o=document.createElement('option');o.value=x.id;o.textContent=x.name;gear.append(o);});gearLabel.append(gear);
function registered(){const set=inventory.loadouts[select.value]||{};selects.forEach((el,i)=>{const id=set.skillIds?.[i];el.value=inventory.owned.skills[id]>0&&Q.supported.includes(C.skills.find(x=>x.id===id)?.questionFormat)?id:'';});gear.value=inventory.owned.gear[set.gearId]>0?set.gearId:'none';}select.onchange=registered;registered();
text('p','STAGE1〜5は技の残り回数を引き継ぎ、クリアごとに減ったHPの1/3を回復します。単語問題は1〜4が10秒、5が5秒。大問1・3は時間制限なし、その他の大問別SKILLは30秒、語句整序は45秒です。',c,'small');
c.append(button(restart?'この編成で森の入口から再挑戦':'物語をはじめる',()=>{const ids=selects.map(s=>s.value).filter(Boolean);if(new Set(ids).size!==ids.length){tell('同じSKILLは複数セットできません。');return;}
 const p=list.find(p=>p.id===select.value);if(restart){state.partnerId=p.id;state.pet=p;state.skills=ids;state.gear=gear.value;state.scene=6;state.line=0;state.mode='story';state.run=null;state.combat=null;state.question=null;state.feedback=null;state.misses=[];}else state=fresh(p,ids,gear.value);save();render();},true));
if(state)c.append(button('続きに戻る',render));}
function advance(){const s=D.scenes[state.scene],line=s.lines[state.line];if(line&&!state.read.includes(line.id))state.read.push(line.id);state.line++;if(state.line>=s.lines.length){if(state.scene===D.scenes.length-1){state.mode='complete';state.completed=true;}else{state.scene++;state.line=0;}}save();render();}
function render(){for(const p of [state?.run,state?.checkpoint,state?.combat?.player])E.refreshSkills(p,C);setMusicMode(state?.mode==='battle'?(state.battleId==='mist'?'blackfog':state.battleId===5?'boss':'battle'):state?.mode==='story'?'story':'setup');clearInterval(interval);clearTimeout(skipTimer);if(state?.mode==='story'&&storyArt?.parentNode===app){Array.from(app.children).forEach(node=>{if(node!==storyArt)node.remove();});}else{app.replaceChildren();storyArt=null;}tell('');if(blocked)return;
if(!state){setup();return;}if(state.mode==='complete'){complete();return;}if(state.mode==='battle'){battleView();return;}if(state.mode==='defeat'){defeat();return;}if(state.mode==='gift'){gift();return;}
if(state.recoveryNotice){const recovery=card();text('p',state.recoveryNotice,recovery,'recovery-notice');window.GoimonQuestReview?.show(state.misses||[],recovery);recovery.append(button('確認した',()=>{state.recoveryNotice=null;save();render();}));}
const s=D.scenes[state.scene],line=s.lines[state.line];if(!line)throw Error('場面の続きが見つかりません');const heading=text('p','第1章 · '+s.title,app,'eyebrow'),art=sceneArt(s.background);app.insertBefore(heading,art);
if(line.event){const box=card();text('h2',line.event==='tutorial'?'モリィと戦い方を練習':line.event==='gift'?'ガチャの練習と装備':line.battleId==='mist'?'黒い霧から守護者を救おう':'STAGE '+line.battleId+' · '+enemyNames[line.battleId-1],box);
 if(line.event==='gift')box.append(button('装備の練習へ',()=>{state.mode='gift';save();render();},true));
 else{if(line.battleId==='mist')text('p','STAGE5からのHP・技を引き継ぎます。敗北したら戦闘直前の状態から再挑戦できます。編成を変える場合は、既読を残して森の入口からやり直せます。',box);box.append(button('準備できた・戦闘へ',()=>startBattle(line.event==='tutorial'?0:line.battleId),true));}return;}
const panel=card(app,'text-panel');if(line.speaker)text('p',interpolate(line.speaker),panel,'speaker');text('p',interpolate(window.GoimonAdventureProfile?.line(line.text,line.speaker)||line.text),panel,line.speaker?'story-text':'story-text narration-text');
text('p',(state.scene+1)+' / 20 場面 · '+(state.line+1)+' / '+s.lines.length+' 行',app,'progress');
const actions=card(app,'actions');const next=button(state.scene===19&&state.line===s.lines.length-1?'第1章を終える':'次へ',advance,true);next.id='next';actions.append(next,button('履歴',showHistory),button('既読をスキップ',()=>{function step(){if(blocked||state.mode!=='story')return;const l=D.scenes[state.scene].lines[state.line];if(!l||l.event||!state.read.includes(l.id))return;advance();skipTimer=setTimeout(guarded(step),80);}step();}));
let down;panel.onpointerdown=e=>{down={x:e.clientX,y:e.clientY};};panel.onpointerup=guarded(e=>{if(down&&Math.abs(e.clientX-down.x)<8&&Math.abs(e.clientY-down.y)<8&&!getSelection().toString())advance();down=null;});}
function makeActor(){const p=partner()||state.pet,species=C.species.find(x=>x.id===p.type)||C.species[0],stats=Object.fromEntries(['chie','kotoba','onkan','bunmyaku'].map(k=>[k,Math.max(0,Number(p.stats?.[k])||0)]));state.pet=structuredClone(p);return E.actor(species,C.stages[p.stage]||1,stats,C.gear.find(x=>x.id===state.gear),state.skills.map(id=>C.skills.find(x=>x.id===id)));}
function enemy(id,player){const kind=id==='mist'?'boss':enemyKinds[id-1],base=id===0?{hp:999,attack:2,defense:10,speed:1,skillTurns:0,skillPower:1}:C.enemies[kind],scale=Math.max(1,C.stages[state.pet.stage]||1);const e={...base,id:'chapter-enemy',attr:id==='mist'?'mirage':id===3?'mirage':'metal',reference:20*scale,shield:{hits:0,factor:1}};for(const stat of ['hp','attack','defense','speed'])e[stat]=Math.round(e[stat]*scale);if(id===5){e.hp=Math.round(200*scale);e.defense=Math.round(22*scale);e.attack=Math.round(18*scale);}if(id==='mist'){e.hp=Math.round(140*scale);e.defense=Math.round(20*scale);e.attack=Math.round(13*scale);}e.maxHp=e.hp;if(id===0)e.speed=0;return e;}
function startBattle(id,retry=false){let p;if(retry){p=structuredClone(state.checkpoint);}
else if(id===0){p=makeActor();p.hp=p.maxHp;p.skills=[{...C.skills.find(x=>x.id==='N_echo'),left:3,maxUses:3}];}
else{p=state.run?structuredClone(state.run):makeActor();if(p.hp<=0)throw Error('森の入口から再挑戦してください');state.checkpoint=structuredClone(p);}
if(id===0)state.checkpoint=structuredClone(p);state.battleId=id;state.combat=E.create(p,enemy(id,p));state.mode='battle';state.question=null;state.feedback=null;state.misses=[];state.combat.log=[];save();render();}
function battleView(){const b=state.combat,id=state.battleId;app.id='app';const root=card(app,'battle');root.id='arena';
const hud=card(root,'hud');for(const [name,a]of [[names().partnerName,b.player],[id===0?'モリィの練習':id==='mist'?'黒い霧':enemyNames[id-1],b.enemy]]){const c=card(hud,'');text('p',name+' · HP '+a.hp+'/'+a.maxHp,c);const bar=document.createElement('progress');bar.max=a.maxHp;bar.value=a.hp;bar.setAttribute('aria-label',name+'のHP');c.append(bar);}
const art=sceneArt(id==='mist'?'mist':'forest',id);root.append(art);
const panel=card(root,'question');panel.id='question';
if(state.feedback){text('p',state.feedback.correct?'正解！':'もう一度、覚えよう',panel,'feedback');text('p',state.feedback.answer,panel);text('p',state.feedback.action,panel);showExplanation(panel,state.feedback.explanation);panel.append(button('次へ',()=>{state.feedback=null;if(id===0&&state.tutorial.trained){if(!state.tutorial.failuresDone){save();render();return;}state.combat=null;state.mode='story';advance();return;}if(b.ended&&b.winner!=='player'){finishBattle();return;}save();render();},true));return;}
if(b.ended){if(b.winner==='player'&&id!==0){GoimonVictory.show({chapter:1,id,stage:art,panel,onContinue:()=>{finishBattle();},guard:fn=>()=>{try{fn();}catch(e){fail(e);}}});return;}finishBattle();return;}
if(id===0&&state.tutorial.trained&&!state.question){failureLesson(panel);return;}
text('p',id===0?(state.tutorial.trained?((state.tutorial.failureStep||0)===0?'練習 4/5：時間切れを体験しよう':'練習 5/5：防御の失敗を体験しよう'):'練習 '+(state.tutorial.practice+1)+'/5：'+['通常攻撃を選ぼう','問題に答えて防ごう','SKILLを使ってみよう'][state.tutorial.practice]):(E.current(b)==='player'?'あなたのターン':'敵の攻撃 · 正解でダメージ軽減'),panel,id===0?'tutorial-heading':'turn-heading');
if(id===0){text('p',['通常攻撃は単語の意味を答えて攻撃します。正解で力が届き、誤答では1ダメージになります。','敵の攻撃には、問題に答えて防御します。正解ならダメージを軽減。誤答や時間切れでは被ダメージが増えます。','SKILLは強い攻撃・回復・防護などを行う技です。技ごとに使用回数と問題形式が違います。残り回数はステージをまたいで引き継ぎます。'][state.tutorial.practice]||'時間制限と失敗時の動きを試そう。',panel,'tutorial-copy');}
if(state.question){questionView(panel);return;}
if(E.current(b)==='enemy'){panel.append(button('防御の問題へ',()=>ask('normal'),true));return;}
const actions=card(panel,'grid');let commands=E.commands(b);if(id===0)commands=commands.filter(x=>state.tutorial.practice===0?x.id==='normal':x.id==='skill:0');
for(const cmd of commands){const skill=cmd.id==='normal'?null:b.player.skills[Number(cmd.id.slice(-1))];const btn=button(cmd.name+(skill?' · 残り'+skill.left+'/'+skill.maxUses+'回':''),()=>ask(cmd.id));btn.disabled=cmd.disabled||!!(skill&&!Q.supported.includes(skill.questionFormat));btn.className='skill';if(skill)text('small',C.questionFormats[skill.questionFormat]?.label||skill.questionFormat,btn);actions.append(btn);}
const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='SKILLの効果（強化後の倍率）';details.append(summary);b.player.skills.forEach(s=>text('p',s.name+'：'+s.description,details,'small'));panel.append(details);}
function showExplanation(panel,explanation){
 if(!explanation||explanation.notes?.some(note=>note.includes('英語と意味を組にして覚えましょう')))return;
 const ex=explanation;
 const toggle=button('解説を見る',()=>{const expanded=toggle.getAttribute('aria-expanded')==='true';body.hidden=expanded;toggle.setAttribute('aria-expanded',String(!expanded));toggle.textContent=expanded?'解説を見る':'解説を閉じる';});
 toggle.classList.add('explanation-toggle');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','answer-explanation');panel.append(toggle);
 const body=card(panel,'answer-explanation');body.id='answer-explanation';body.hidden=true;
 if(ex.completed){text('h3',ex.format==='q11'?'言い換え後の英文':'英文',body);text('p',ex.completed,body,'completed-sentence');}
 if(ex.translation){text('h3','日本語訳・意味',body);text('p',ex.translation,body);}
 const notes=ex.format?(ex.notes||[]):(ex.notes||[]).filter(note=>!note.startsWith('空所には ')&&!note.startsWith('この問題では ')&&!note.startsWith('文bの空所に ')&&!note.startsWith('正しい語順：'));
 if(notes.length){text('h3','理解のポイント',body);for(const note of notes)text('p',note,body);}
}
function failureLesson(panel){
 const step=state.tutorial.failureStep||0;text('h2',step===0?'時間制限を体験しよう':'防御に失敗したら？',panel,'tutorial-heading');
 text('p',step===0?'本番では単語問題は10秒、STAGE5は5秒です。今回は5秒間、答えずに待ってみよう。時間切れは誤答として扱われ、通常攻撃は1ダメージになります。':'防御で間違えると、敵の攻撃ダメージが1.5倍になります。今回は「間違えた場合を体験」を押して、HPの減り方を見てみよう。練習では倒れません。',panel,'tutorial-copy');
 panel.append(button(step===0?'5秒の時間切れを体験':'防御の失敗を体験',()=>{const b=state.combat;b.ended=false;b.winner=null;b.player.hp=b.player.maxHp;b.index=b.order.indexOf(step===0?'player':'enemy');state.tutorial.demoKind=step===0?'timeout':'wrong-defense';const q=Q.select('word_meaning',1,source,GoimonQuestQuestionBank);state.question={...q,command:'normal',selected:[],startedAt:Date.now(),deadline:step===0?Date.now()+5000:null};save();render();},true));
}
function ask(command){const b=state.combat,format=GoimonSkillQuestionRouting.skillFormat(b.player.skills,command,E.current(b),state.battleId===0),stage=state.battleId==='mist'?5:state.battleId||1;
const q=Q.select(format,stage,source,GoimonQuestQuestionBank,Math.random,state.lastQuestion||'');state.lastQuestion=q.id;
const seconds=state.battleId===0||['q1','q3'].includes(format)?null:format==='q12'?45:format==='word_meaning'?(state.battleId===5?5:10):30;
if(state.battleId!==0&&!window.GoimonDeveloper?.active)window.GoimonStudyTime?.begin({q1:'accent',q3:'listening',word_meaning:'quiz_enja',idiom:'idiom_quiz',q9:'sentence',q11:'paraphrase_quiz',q12:'reorder'}[format],'1');state.question={...q,command,selected:[],startedAt:Date.now(),deadline:seconds?Date.now()+seconds*1000:null};save();render();window.scrollTo?.({top:0,behavior:'instant'});}
function questionView(panel){const q=state.question;const labels={q1:'最も強く読む音節を選ぼう',q3:'音声に合う応答を選ぼう',word_meaning:'英語の意味を選ぼう',idiom:'同じ意味の英語表現を選ぼう',q9:'空所に入る最も適切な語句を選ぼう',q11:'文aと文bが同じ意味になる語句を選ぼう',q12:'語句を正しい順番に並べよう'};const timer=text('span','',panel,'timer');timer.id='timer';text('p',labels[q.format],panel,'small');text('h2',q.prompt,panel);text('p',['q1','q3'].includes(q.format)?'時間制限・3秒以内ボーナスはありません。落ち着いて聞いて答えよう。':q.deadline?'制限時間内に答えよう。3秒以内の正解は、この一回だけ攻撃力×1.1／防御力×1.1。':'3秒以内の正解で、この一回だけ攻撃力×1.1／防御力×1.1。',panel,'small');
window.GoimonQuestQuestionAudio?.mount(panel,q);if(q.format==='q12'){const chosen=card(panel,'chips');chosen.id='chosen';for(const id of q.selected){const chunk=q.chunks.find(c=>c.id===id);chosen.append(button(chunk.text,()=>{q.selected=q.selected.filter(x=>x!==id);save();render();}));}
 const choices=card(panel,'chips');for(const ch of q.chunks){const b=button(ch.text,()=>{q.selected.push(ch.id);save();render();});b.disabled=q.selected.includes(ch.id);choices.append(b);}const submit=button('この順番で答える',()=>answer([...q.selected]),true);submit.disabled=q.selected.length!==q.chunks.length;panel.append(submit,button('並べ直す',()=>{q.selected=[];save();render();}));
}else{const choices=card(panel,'grid');choices.id='choices';for(const value of q.choices){const choice=button(value,()=>answer(value));choice.disabled=state.tutorial.demoKind==='timeout'&&state.battleId===0;choices.append(choice);}if(state.battleId===0&&state.tutorial.demoKind==='wrong-defense')panel.append(button('練習：間違えた場合を体験',()=>answer('__tutorial_wrong__')));if(state.battleId===0&&state.tutorial.demoKind==='timeout')text('p','今回は時間切れの練習です。残り0秒まで待って、結果を見てみよう。',panel,'tutorial-copy');}
if(q.deadline){const tick=()=>{if(!state.question||blocked)return;const left=q.deadline-Date.now();timer.textContent=Math.max(0,Math.ceil(left/1000))+'秒';if(left<=0)guarded(()=>answer(null))();};interval=setInterval(tick,200);tick();}}
function answer(value){if(!state.question)return;window.GoimonQuestQuestionAudio?.stop();clearInterval(interval);const q=state.question,expired=q.deadline&&Date.now()>=q.deadline,correct=!expired&&Q.correct(q,value),side=E.current(state.combat);
try{if(state.battleId!==0&&!window.GoimonDeveloper?.active)window.ZenshoLearningLog?.addResult({q1:'accent',q3:'listening',word_meaning:'quiz_enja',idiom:'idiom_quiz',q9:'sentence',q11:'paraphrase_quiz',q12:'reorder'}[q.format],correct,{level:'1'});}catch(e){console.warn('学習記録を保存できませんでした',e);}if(!window.GoimonDeveloper?.active)window.GoimonStudyTime?.end();
const entry=E.resolve(state.combat,q.command,correct,{elapsedMs:!['q1','q3'].includes(q.format)&&Number.isFinite(q.startedAt)?Date.now()-q.startedAt:Infinity});if(state.battleId===0&&state.tutorial.demoKind){if(state.tutorial.demoKind==='timeout')state.tutorial.failureStep=1;else if(!correct){state.tutorial.failureStep=2;state.tutorial.failuresDone=true;}delete state.tutorial.demoKind;if(state.combat.player.hp<=0){state.combat.player.hp=1;state.combat.ended=false;state.combat.winner=null;}}else if(state.battleId===0)T.practice(state.tutorial,side==='enemy'?'defense':q.command==='normal'?'normal':'skill');
const answerText=q.format==='q12'?q.answer.map(id=>q.chunks.find(c=>c.id===id).text).join(' '):q.answer;
if(!correct){const miss={prompt:q.prompt,answer:answerText,review:q.review,reviewId:q.reviewId};state.misses.push(miss);state.allMisses ||= [];if(!state.allMisses.some(m=>m.review===miss.review&&m.reviewId===miss.reviewId))state.allMisses.push(miss);}state.feedback={correct,answer:(expired?'時間切れ。':'')+'正答：'+answerText,action:entry.text,explanation:Q.explain(q,source)};state.question=null;state.run=state.battleId===0?state.run:structuredClone(state.combat.player);save();render();app.querySelector('.scene')?.classList.add('strike');}
function finishBattle(){if(state.combat.winner!=='player'){state.mode='defeat';save();render();return;}const id=state.battleId;if(!state.cleared.includes(id))state.cleared.push(id);state.run=structuredClone(state.combat.player);if((Number.isInteger(id)&&id>=1&&id<=5)||id==='mist'){const amount=Math.ceil((state.run.maxHp-state.run.hp)/3);state.run.hp=Math.min(state.run.maxHp,state.run.hp+amount);state.recoveryNotice=(id==='mist'?'黒い霧':'STAGE '+id)+' クリア！ 減っていたHPの1/3（'+amount+'）を回復しました。HP '+state.run.hp+'/'+state.run.maxHp;}state.combat=null;state.question=null;state.mode='story';advance();}
function gift(){text('h1','モリィと装備の練習');text('p','学習でほしのかけらを集めて、ガチャでSKILLやEQUIPMENTを増やそう。回復技は正解すると最大HPの55％以上を回復できます。戦闘前にセットして、残り回数を考えて使おう。');const c=card();text('p','練習用のほしのかけらと装備です。実際の所持品には加算されません。',c);text('p','練習用 ✦ '+state.tutorial.shards,c);
if(!state.tutorial.claimed)c.append(button('練習用10個を受け取る',()=>{T.claim(state.tutorial);save();render();},true));
else if(!state.tutorial.item)c.append(button('装備ガチャをひく · ✦10',()=>{T.draw(state.tutorial,C.gear);save();render();GoimonGachaReveal.play([state.tutorial.item],'gear',{label:'TUTORIAL · 装備ガチャ',note:'練習用の装備です。実際の所持品は変わりません。'}).catch(fail);},true));
else{text('h2',state.tutorial.item.name,c);text('p',state.tutorial.item.description,c);c.append(button('練習装備をセットして進む',()=>{if(!state.tutorial.equipped)T.equip(state.tutorial);state.mode='story';save();advance();},true));}}
function defeat(){text('h1','もう一度、声をつなごう');window.GoimonQuestReview?.studyLinks(state.misses||[],state.battleId,app);window.GoimonQuestReview?.show(state.misses||[],app);const help=card();text('h2','HPがなくなったら、回復技も試そう',help);text('p','回復SKILLは問題に正解すると最大HPの55％以上を回復します。HPが0になる前に使うのがポイント。ほしのかけらを集め、技ガチャで新しいSKILLを手に入れよう。回復技を手に入れたら、相棒の管理画面でセットできます。',help);text('p',state.battleId==='mist'?'守護者の救出は、まだ終わっていません。黒い霧との戦闘直前から再挑戦できます。':'少し準備して、もう一度森へ。読んだ物語とクリア済みの記録は残ります。');const c=card();
if(state.battleId==='mist')c.append(button('霧の戦闘直前から再挑戦',()=>startBattle('mist',true),true));c.append(button('編成を見直して森の入口から',()=>setup(true)));}
function showHistory(){const body=$('logBody');body.replaceChildren();for(const s of D.scenes){const lines=s.lines.filter(l=>!l.event&&state?.read.includes(l.id));if(!lines.length)continue;text('h3',s.title,body);for(const l of lines)text('p',(l.speaker?interpolate(l.speaker)+'\n':'')+interpolate(window.GoimonAdventureProfile?.line(l.text,l.speaker)||l.text),body,l.speaker?'':'narration-text');}if(!body.children.length)text('p','読み終えた文章がここに残ります。',body);if($('menu').open)$('menu').close();$('log').showModal();}
function complete(){window.GoimonQuestReview?.show(state.allMisses||state.misses||[],app);text('p','CHAPTER 1 · COMPLETE',app,'eyebrow');text('h1','聞こえた言葉');sceneArt('forest');text('p','相棒とつないだ声は、森の外へ。第1章クリア！');text('p','第2章「ふたつの声」が解放されました。クエストメニューで章を切り替えて、冒険を続けよう。');const c=card();GoimonChapterComplete.mount(c,{history:guarded(showHistory),restart:guarded(()=>setup(true)),restartLabel:'別の編成で森に再挑戦',home:'quest_home.html?chapter=chapter2'});}
$('home').onclick=()=>{clearTimeout(skipTimer);$('menu').showModal();};$('resume').onclick=()=>$('menu').close();$('closeLog').onclick=()=>$('log').close();$('history').onclick=guarded(showHistory);
$('restartRun').onclick=guarded(()=>{if(!state)return;if(!state.tutorial.complete){tell('教習と練習装備を終えてから編成を変更できます。');return;}if(confirm('既読とクリア記録を残して、森の入口から挑戦し直しますか？')){$('menu').close();setup(true);}});
$('export').onclick=()=>{const content=state?JSON.stringify(state,null,2):store?.raw()||'';const url=URL.createObjectURL(new Blob([content],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='GOIMON-chapter1-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
window.addEventListener('storage',e=>{if(e.key==='goimon_cloud_v2:active'||e.key===key)fail(Error('別のタブでアカウントまたは進行が更新されました。再読み込みしてください。'));});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target===document.body&&!$('menu').open&&!$('log').open){const b=$('next');if(b){e.preventDefault();b.click();}}});
window.GoimonChapter1=Object.freeze({snapshot:()=>structuredClone(state),musicMode:()=>musicMode});
try{store=GoimonChapterStore.create(window.GoimonDeveloper?.storage||localStorage,key,D);state=store.load();render();if(new URLSearchParams(location.search).get('configure')==='1'&&state){if(state.tutorial.complete){setup(true);}else{tell('チュートリアルを終えると編成を変更できます。');}}}catch(e){fail(e);}
})();
