/* Chapter 2 adapter: shared battle/question engines are read-only dependencies. */
(()=>{'use strict';
const D=GoimonChapter2Data,A=GoimonChapter2Assets,P=GoimonChapter2Progress,C=GoimonBattleCatalog,E=GoimonBattlePrototype,Q=GoimonChapterQuestions,N=GoimonStoryNames;
const $=id=>document.getElementById(id),app=$('app'),account=GOIMONProfiles.account||'guest',key='goimon_chapter2_v1:'+account+':lv1';
const source={words:window.WORDS_1KYU,idioms:window.IDIOM_DATA_1KYU,q9:window.SENTENCE_FIXED_1KYU,q11:window.PARAPHRASE_DATA_1KYU,q12:window.REORDER_1KYU};
let state,store,timer,blocked=false,art=null;
const clone=x=>JSON.parse(JSON.stringify(x));
function fail(e){blocked=true;clearInterval(timer);$('notice').textContent=e.message+' 元の育成・学習記録は変更していません。';app.querySelectorAll('button').forEach(b=>b.disabled=true);}
function guard(fn){return (...args)=>{if(blocked)return;try{if((localStorage.getItem('goimon_cloud_v2:active')||'guest')!==account)throw Error('アカウントが変わりました。再読み込みしてください。');fn(...args);}catch(e){fail(e);}};}
function save(){store.save(state);}
function el(tag,value,parent=app,cls=''){const n=document.createElement(tag);n.textContent=value;n.className=cls;parent.append(n);return n;}
function btn(label,fn,parent,primary=false){const b=el('button',label,parent,primary?'primary':'');b.onclick=guard(fn);return b;}
function link(label,href,parent){const a=el('a',label,parent,'link');a.href=href;return a;}
function pets(){const cur=JSON.parse(GOIMONStorage.getItem('zensho_goimon_current_v4_lv1')||'null'),archive=JSON.parse(GOIMONStorage.getItem('zensho_goimon_archive_v4_lv1')||'[]');return [cur,...archive].filter(Boolean).filter((p,i,a)=>a.findIndex(x=>x.id===p.id)===i);}
function partner(){return pets().find(p=>p.id===state?.partnerId)||state?.pet;}
function names(){return {playerName:N.playerName(sessionStorage,GOIMON_CLOUD_CONFIG.apiBase,account==='guest'?null:account),partnerName:N.partnerName(partner(),GoimonDex)};}
const interpolate=s=>N.interpolate(s,names());
function image(){const p=partner();return GoimonDex.getEntry(p?.type,p?.stage)?.image||'images/goimon/goimon_egg.png';}
function music(mode){window.GoimonQuestAudio?.setMode(mode);}
function setup(){music('setup');app.replaceChildren();art=null;el('p','CHAPTER 02 · 1級',app,'eyebrow');el('h1','ふたつの声');el('p','森の外で出会う、もうひと組の相棒。');const box=el('section','',app,'panel'),list=pets();
 if(!list.length){el('p','ホームで1級の相棒を迎えると、この相棒で冒険できます。',box);link('ホームで相棒に会う','index.html?panel=goimon&manage=1',box);return;}
 const inv=GoimonItemStore.parse(GOIMONStorage.getItem('goimon_item_state_v1_lv1'),'1');const label=el('label','冒険の相棒',box),select=el('select','',label);for(const p of list){const o=el('option',N.partnerName(p,GoimonDex),select);o.value=p.id;}
 const info=el('p','',box);function describe(){const load=inv.loadouts[select.value]||{};info.textContent='登録中の技：'+((load.skillIds||[]).filter(id=>inv.owned.skills[id]>0).map(id=>C.skills.find(s=>s.id===id)?.name).filter(Boolean).join('・')||'なし（通常攻撃で挑戦できます）');}select.onchange=describe;describe();
 el('p','23シーン・9戦。HPと技の残り回数を引き継ぎ、勝利後は減ったHPの1/4を回復します。敗北時は戦闘直前から再挑戦できます。',box,'muted');el('p','出題範囲・敵の強さは確認版の仮設定です。第1章の単語範囲と既存の大問別SKILLを再利用しています。',box,'muted');
 link('技・装備を確認','index.html?panel=goimon&manage=1',box);
 btn('この相棒と出発',()=>{const pet=list.find(p=>p.id===select.value),load=inv.loadouts[pet.id]||{};const ids=(load.skillIds||[]).filter(id=>inv.owned.skills[id]>0&&Q.supported.includes(C.skills.find(s=>s.id===id)?.questionFormat));state=P.fresh(D,pet,[...new Set(ids)],inv.owned.gear[load.gearId]>0?load.gearId:'none');save();render();},box,true);
}
function active(speaker){return speaker==='{{partnerName}}'?'partner':speaker==='モリィ'?'morii':['サーヤ','少女'].includes(speaker)?'saya':speaker==='トヨヨ'?'toyoyo':'';}
function staging(battle=false){const s=D.scenes[state.scene],line=s.lines[Math.min(state.line,s.lines.length-1)],n=state.scene+1,ln=state.line;
 if(!art){art=el('div','',app,'stage');art.setAttribute('role','img');}art.className='stage';art.setAttribute('aria-label',s.title);
 const detail=n===17&&ln>=3&&ln<=12?(ln<6?'founders_relief':'work_log'):null;
 art.style.backgroundImage='url("'+(detail?A.path('details',detail):A.path('backgrounds',s.background))+'")';if(detail)art.classList.add('detail');
 const capture=n===19&&(battle||ln>=5),rescue=n===20&&ln===0;
 const enemy=battle?s.battleId:capture||rescue?9:s.battleId&&((n===2&&ln>=7)||(n===5)||(n===8&&ln>=1)||(n===9&&ln>=4)||(n===11)||(n===15&&ln>=2)||(n===16)||(n===18&&ln>=4))?s.battleId:null;
 if(enemy)art.classList.add('encounter');if(capture||rescue)art.classList.add('boss');if(rescue)art.classList.add('rescue');
 const present=new Set(),talk=active(line?.speaker);
 function add(id,src,alt,cls=id){if(!src)return;present.add(id);let img=art.querySelector('[data-id="'+id+'"]');if(!img){img=document.createElement('img');img.dataset.id=id;img.onerror=()=>{img.hidden=true;};art.append(img);}if(img.getAttribute('src')!==src){img.hidden=false;img.src=src;}img.alt=alt;img.className='character '+cls+(!battle&&talk&&talk!==id?' listening':'');}
 add('partner',image(),names().partnerName);if(!battle)add('morii','images/quest/chapter1/morii_normal.png','モリィ');
 const together=n>=2&&!(n>=7&&n<=9)&&!(n===10&&ln<3)&&!(n===23&&ln>=8);
 if(together&&!capture&&!rescue&&!battle){let expressions={saya:'saya_normal',toyoyo:'toyoyo_normal'};for(const l of s.lines.slice(0,ln+1)){const p=GoimonChapter2Portraits.portrait(l);if(p)expressions[p.startsWith('saya')?'saya':'toyoyo']=p;}add('saya',A.path('characters',expressions.saya),n<=2?'少女':'サーヤ');add('toyoyo',A.path('characters',expressions.toyoyo),'トヨヨ');}
 if(capture||rescue)add('captives',A.path('events','captives'),'黒霧に囚われたサーヤとトヨヨ');if(enemy)add('enemy',A.path('enemies',enemy),D.battles.find(x=>x.id===enemy).name);
 art.querySelectorAll('[data-id]').forEach(img=>{if(!present.has(img.dataset.id))img.remove();});return art;
}
function render(){clearInterval(timer);if(blocked)return;const retain=state?.mode==='story'&&art?.isConnected;if(retain){[...app.children].forEach(c=>{if(c!==art)c.remove();});}else{app.replaceChildren();art=null;}
 if(!state){setup();return;}if(state.mode==='battle'){battleView();return;}if(state.mode==='defeat'){defeat();return;}if(state.mode==='complete'){music('setup');el('p','CHAPTER 02 · COMPLETE',app,'eyebrow');el('h1','ふたつの声');el('p','次の目的地は、トシャカ中央記録院。');btn('物語の記録を見る',history,app,true);reviews(app);return;}
 music('story');const s=D.scenes[state.scene],line=s.lines[state.line],heading=el('p','第2章 · '+s.title,app,'eyebrow');staging();app.insertBefore(heading,art);
 const panel=el('section','',app,'panel');if(!line&&s.battleId){el('h2',D.battles.find(x=>x.id===s.battleId).name,panel);el('p','問題に正解して攻撃・防御。時間切れは不正解になります。',panel,'muted');btn('戦闘へ',()=>startBattle(false),panel,true);return;}
 el('p',interpolate(line.speaker)||s.title,panel,'speaker');const dialogue=el('p',interpolate(line.text),panel,'story-text');dialogue.onclick=guard(()=>{if(!getSelection().toString())advance();});el('p',(state.scene+1)+' / 23 場面 · '+(state.line+1)+' / '+s.lines.length+' 行',panel,'muted');
 const actions=el('div','',panel,'actions');btn('次へ',advance,actions,true);btn('既読を進める',()=>{let count=0;while(state.mode==='story'&&count++<500){const l=D.scenes[state.scene].lines[state.line];if(!l||!state.read.includes(l.id))break;P.advance(state,D);}save();render();},actions);
}
function advance(){P.advance(state,D);save();render();}
function actor(){const p=partner(),species=C.species.find(s=>s.id===p.type)||C.species[0];const points=Object.fromEntries(['chie','kotoba','onkan','bunmyaku'].map(k=>[k,Math.max(0,Number(p.stats?.[k])||0)]));return E.actor(species,C.stages[p.stage]||1,points,C.gear.find(g=>g.id===state.gear)||C.gear.find(g=>g.id==='none'),state.skills.map(id=>C.skills.find(s=>s.id===id)).filter(Boolean));}
function startBattle(retry){const id=D.scenes[state.scene].battleId;const p=retry?clone(state.checkpoint):state.run?clone(state.run):actor();if(!retry)state.checkpoint=clone(p);const enemy=GoimonChapter2Battle.enemy(C,id,C.stages[state.pet.stage]);
 state.battleId=id;state.combat=E.create(p,enemy);state.mode='battle';state.question=null;state.feedback=null;save();render();}
function battleView(){const b=state.combat,id=state.battleId;music(id===9?'boss':id===1||id===8?'blackfog':'battle');const wrap=el('div','',app,'battle'),hud=el('div','',wrap,'hud');for(const [name,a]of [[names().partnerName,b.player],[D.battles.find(x=>x.id===id).name,b.enemy]]){const box=el('div','',hud);el('p',name+' · HP '+a.hp+'/'+a.maxHp,box);const meter=el('progress','',box);meter.max=a.maxHp;meter.value=a.hp;meter.setAttribute('aria-label',name+'のHP');}wrap.append(staging(true));const panel=el('section','',wrap,'panel');
 if(state.feedback){const f=state.feedback;el('h2',f.correct?'正解！':f.expired?'時間切れ':'もう一度、覚えよう',panel,f.correct?'correct':'wrong');el('p','正答：'+f.answer,panel);el('p',f.action,panel);if(f.translation||f.explanation){const details=el('details','',panel);el('summary','訳・解説を見る',details);if(f.translation)el('p',f.translation,details);const ex=f.explanation;if(ex){for(const value of [ex.completed,...(ex.notes||[])].filter(Boolean))el('p',value,details);}}btn('次へ',()=>{state.feedback=null;if(b.ended)P.finish(state,D);save();render();},panel,true);return;}
 if(b.ended){P.finish(state,D);save();render();return;}
 el('p',E.current(b)==='player'?'攻撃を選ぼう':'敵の攻撃 · 正解でダメージ軽減',panel,'muted');if(state.question){questionView(panel);return;}if(E.current(b)==='enemy'){btn('防御の問題へ',()=>ask('normal'),panel,true);return;}
 const actions=el('div','',panel,'actions');for(const cmd of E.commands(b)){const skill=cmd.id==='normal'?null:b.player.skills[Number(cmd.id.split(':')[1])];const button=btn(cmd.name+(skill?' · '+skill.left+'/'+skill.maxUses+'回':''),()=>ask(cmd.id),actions);button.disabled=cmd.disabled||!!(skill&&!Q.supported.includes(skill.questionFormat));}
 const details=el('details','',panel);el('summary','技の効果と問題形式',details);for(const s of b.player.skills)el('p',s.name+'：'+s.description+'（'+(C.questionFormats[s.questionFormat]?.label||s.questionFormat)+'）',details);
}
function ask(command){const b=state.combat,format=GoimonSkillQuestionRouting.skillFormat(b.player.skills,command,E.current(b),false),stage=Math.min(5,Math.ceil(state.battleId/2));const q=Q.select(format,stage,source,GoimonQuestQuestionBank,Math.random,state.lastQuestion||'');state.lastQuestion=q.id;window.GoimonStudyTime?.begin(({word_meaning:'quiz_enja',idiom:'idiom_quiz',q9:'sentence',q11:'paraphrase_quiz',q12:'reorder'})[format],'1');const seconds=format==='word_meaning'?10:format==='q12'?45:30;state.question={...q,command,selected:[],startedAt:Date.now(),deadline:Date.now()+seconds*1000};save();render();}
function questionView(panel){const q=state.question,t=el('span','',panel,'timer');el('p',({word_meaning:'英語の意味を選ぼう',idiom:'同じ意味の表現を選ぼう',q9:'空所に合う語句を選ぼう',q11:'文aと文bが同じ意味になる語句を選ぼう',q12:'語句を正しい順番に並べよう'})[q.format],panel,'muted');el('h2',q.prompt,panel,'prompt');
 if(q.format==='q12'){const chosen=el('div','',panel,'chips');for(const id of q.selected)btn(q.chunks.find(c=>c.id===id).text,()=>{q.selected=q.selected.filter(x=>x!==id);save();render();},chosen);const choices=el('div','',panel,'chips');for(const c of q.chunks){const b=btn(c.text,()=>{q.selected.push(c.id);save();render();},choices);b.disabled=q.selected.includes(c.id);}const submit=btn('この順番で答える',()=>answer([...q.selected]),panel,true);submit.disabled=q.selected.length!==q.chunks.length;}else{const choices=el('div','',panel,'choices');for(const value of q.choices)btn(value,()=>answer(value),choices);}
 const tick=guard(()=>{if(!state.question)return;const ms=q.deadline-Date.now();t.textContent=Math.max(0,Math.ceil(ms/1000))+'秒';if(ms<=0)answer(null);});timer=setInterval(tick,200);tick();}
function answer(value){const q=state.question;if(!q)return;clearInterval(timer);const expired=Date.now()>=q.deadline,correct=!expired&&Q.correct(q,value),entry=E.resolve(state.combat,q.command,correct,{elapsedMs:Date.now()-q.startedAt});const answer=q.format==='q12'?q.answer.map(id=>q.chunks.find(c=>c.id===id).text).join(' '):q.answer;
 if(!correct&&!state.misses.some(m=>m.review===q.review&&m.reviewId===q.reviewId))state.misses.push({prompt:q.prompt,answer,review:q.review,reviewId:q.reviewId});state.feedback={correct,expired,answer,action:entry.text,translation:q.translation||'',explanation:Q.explain?.(q,source)||null};state.question=null;save();try{window.ZenshoLearningLog?.addResult(({word_meaning:'quiz_enja',idiom:'idiom_quiz',q9:'sentence',q11:'paraphrase_quiz',q12:'reorder'})[q.format],correct,{level:'1'});window.GoimonStudyTime?.end();}catch{ $('notice').textContent='学習記録の保存を確認できませんでした。第2章の進行は保存済みです。';}render();}
function reviews(parent){if(!state.misses.length)return;const details=el('details','',parent);el('summary','間違えた問題を復習（'+state.misses.length+'問）',details);for(const m of state.misses){el('p',m.prompt+' → '+m.answer,details);const u=new URL(m.review,location.href);u.searchParams.set('reviewIds',m.reviewId);u.searchParams.set('returnTo','quest_chapter2.html');if(m.review==='idiom_quiz.html')u.searchParams.set('idiomMode','synonym');const a=link('対応する学習へ',u.pathname+u.search,details);a.onclick=guard(()=>GOIMONStorage.setItem('zensho_level_v1','1'));}}
function defeat(){music('setup');el('h1','もう一度、声をつなごう');el('p','戦闘前のHP・技の回数に戻して再挑戦できます。物語の進行は失われません。');btn('戦闘直前から再挑戦',()=>startBattle(true),app,true);reviews(app);}
function history(){const body=$('history-body');body.replaceChildren();if(!state){el('p','読み終えた物語がここに残ります。',body);}else for(const scene of D.scenes){const lines=scene.lines.filter(l=>state.read.includes(l.id));if(!lines.length)continue;el('h2',scene.title,body);for(const l of lines)el('p',(l.speaker?interpolate(l.speaker)+'\n':'')+interpolate(l.text),body);}if(!$('history-dialog').open)$('history-dialog').showModal();}
 $('history').onclick=guard(history);$('close-history').onclick=()=>$('history-dialog').close();window.addEventListener('storage',e=>{if(e.key===key||e.key==='goimon_cloud_v2:active')fail(Error('別の画面で進行またはアカウントが更新されました。再読み込みしてください。'));});
 window.GoimonChapter2=Object.freeze({snapshot:()=>state?clone(state):null});try{store=P.create(localStorage,key,D);state=store.load();render();}catch(e){fail(e);}
})();
