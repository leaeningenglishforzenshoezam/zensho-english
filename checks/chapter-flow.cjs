// Logic-only integration check: executes the actual controller with rendering suppressed.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..');let now=100000;
const memory=new Map();const storage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,String(v))};
const elements=new Map();const element=()=>({attributes:{},style:{},append(...nodes){this.children.push(...nodes);},setAttribute(k,v){this.attributes[k]=v;},getAttribute(k){return this.attributes[k];},replaceChildren(){this.children=[];},querySelector(){return null},querySelectorAll(){return []},classList:{add(){}},children:[]});
const ctx={console,structuredClone,URL,URLSearchParams,location:{search:""},Blob,Date:class extends Date{static now(){return now;}},setInterval:()=>1,clearInterval(){},setTimeout:()=>1,clearTimeout(){},localStorage:storage,sessionStorage:storage,GOIMONStorage:storage,GOIMONProfiles:{account:'guest'},GOIMON_CLOUD_CONFIG:{apiBase:''},GoimonDex:{getEntry:()=>({image:''})},document:{getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},createElement:element,addEventListener(){}},addEventListener(){}};ctx.window=ctx;vm.createContext(ctx);
for(const file of ['battle-prototype/catalog.js','battle-prototype/core.js','battle-prototype/tutorial.js','battle-prototype/story_names.js','battle-prototype/question-routing.js','battle-prototype/question_bank.js','words_1kyu.js','idiom_data_1kyu.js','sentence_fixed_1kyu.js','paraphrase_data_1kyu.js','reorder_1kyu.js','battle-prototype/chapter1_data.js','battle-prototype/chapter_questions.js','battle-prototype/chapter_store.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
let controller=fs.readFileSync(path.join(root,'battle-prototype/chapter1.js'),'utf8').replace('function render(){','function render(){return;');
controller=controller.replace('window.GoimonChapter1=Object.freeze','window.test={makeActor,enemy,showExplanation,fresh,advance,startBattle,ask,answer,finishBattle,save,get:()=>state,set:s=>{state=s;},reload:()=>{store=GoimonChapterStore.create(localStorage,key,D);state=store.load();}};window.GoimonChapter1=Object.freeze');vm.runInContext(controller,ctx);
const a=ctx.test,T=ctx.GoimonQuestTutorial,E=ctx.GoimonBattlePrototype,D=ctx.GoimonChapter1Data;
const pet={id:'test-pet',type:'nagomi',stage:'child',stats:{chie:0,kotoba:0,bunmyaku:0,onkan:0}};
a.set(a.fresh(pet,['N_echo','N_aid','N_comfort','N_prepare'],'none'));a.save();
let events=[],questions=0,stages=0;
for(let step=0;step<1000;step++){
 let s=a.get();if(s.mode==='complete')break;
 const line=D.scenes[s.scene].lines[s.line];
 if(!line.event){a.advance();continue;}
 events.push(line.event==='battle'?line.battleId:line.event);
 if(line.event==='gift'){T.claim(s.tutorial);T.draw(s.tutorial,ctx.GoimonBattleCatalog.gear,()=>0);T.equip(s.tutorial);a.advance();continue;}
 const id=line.event==='tutorial'?0:line.battleId;a.startBattle(id);
 if(id===0){for(const cmd of ['normal','normal','skill:0']){a.ask(cmd);s=a.get();a.answer(s.question.answer);s.feedback=null;}assert(s.tutorial.trained);
  // Resume during the timed failure lesson, then complete the defense-failure lesson.
  s.tutorial.demoKind='timeout';s.combat.index=s.combat.order.indexOf('player');a.ask('normal');s.question.deadline=now+5000;a.save();a.reload();now+=5001;a.answer(null);s=a.get();assert.equal(s.tutorial.failureStep,1);assert(!s.feedback.correct);s.feedback=null;
  s.tutorial.demoKind='wrong-defense';s.combat.index=s.combat.order.indexOf('enemy');a.ask('normal');a.answer('__wrong__');assert(s.tutorial.failuresDone);s.feedback=null;s.combat=null;s.mode='story';a.advance();continue;}
 // Exercise a real loss and checkpoint retry on the mist encounter.
 if(id==='mist'){s=a.get();s.combat.player.hp=1;s.combat.index=s.combat.order.indexOf('enemy');a.ask('normal');a.answer('__wrong__');a.finishBattle();assert.equal(s.mode,'defeat');a.reload();a.startBattle('mist',true);assert.equal(a.get().combat.player.hp,a.get().checkpoint.hp);}
 s=a.get();
 // Deterministic win isolates stage-transition persistence from balance (tested separately).
 s.combat.enemy.hp=1;s.combat.index=s.combat.order.indexOf('player');s.combat.player.hp=Math.max(1,s.combat.player.maxHp-10);
 const before=s.combat.player.hp,max=s.combat.player.maxHp;a.ask('normal');a.save();const expected=JSON.stringify(s.question);a.reload();assert.equal(JSON.stringify(a.get().question),expected);
 a.answer(a.get().question.answer);questions++;s=a.get();assert.equal(s.feedback.explanation,null);assert.equal(s.combat.winner,'player');a.finishBattle();s=a.get();if(typeof id==='number'){assert.equal(s.run.hp,before+Math.ceil((max-before)/4));stages++;}a.reload();assert.equal(a.get().run.hp,s.run.hp);
}
assert.equal(a.get().mode,'complete');assert.equal(stages,5);assert.equal(questions,6);assert(a.get().cleared.includes('mist'));
a.reload();assert.equal(a.get().mode,'complete');
const stale=ctx.GoimonChapterStore.create(storage,'conflict',D),other=ctx.GoimonChapterStore.create(storage,'conflict',D);stale.save(a.get());assert.throws(()=>other.save(a.get()),/別のタブ/);
console.log('PASS 20 scenes; tutorial failures; 5 stages + mist; explanation; answer resume; quarter-missing-HP recovery; mist defeat/retry; completion resume; cross-tab conflict');

const panel=element();a.showExplanation(panel,null);assert.equal(panel.children.length,0);
a.showExplanation(panel,{format:'q12',completed:'I study English.',translation:'私は英語を学びます。',notes:['文法上のポイント']});
const [toggle,body]=panel.children;assert.equal(body.hidden,true);assert.equal(toggle.textContent,'解説を見る');toggle.onclick();assert.equal(body.hidden,false);assert.equal(toggle.getAttribute('aria-expanded'),'true');toggle.onclick();assert.equal(body.hidden,true);assert.equal(toggle.textContent,'解説を見る');
console.log('PASS explanation hidden initially; accessible toggle opens/closes; no empty word explanation');

// Quest hub must read the same account save without changing progress or inventory.
const beforeHub=JSON.stringify([...memory]);
for(const file of ['battle-prototype/chapter_staging.js','quest_library.js','quest_home.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
assert.equal(JSON.stringify([...memory]),beforeHub);
assert.equal(elements.get('qh-continue').textContent,'クリア記録を見る');
assert.equal(elements.get('qh-stages').children.length,5);
console.log('PASS quest home reads completion without writing player data');

// Egg combat stats are weaker without reducing enemy strength or modifying growth records.
const eggPet={...pet,stage:'egg'};
a.set(a.fresh(eggPet,[],'none'));const egg=a.makeActor(),eggEnemy=a.enemy(1,egg);
assert.deepEqual([egg.hp,egg.attack,egg.defense,egg.speed],[50,7,13,8]);
a.set(a.fresh(pet,[],'none'));const child=a.makeActor(),childEnemy=a.enemy(1,child);
assert.deepEqual([child.hp,child.attack,child.defense,child.speed],[100,14,26,15]);
assert.deepEqual(JSON.parse(JSON.stringify(eggEnemy)),JSON.parse(JSON.stringify(childEnemy)));
assert.equal(eggPet.stats.kotoba,0);
console.log('PASS egg half-strength; child and enemies unchanged; learning points preserved');

const library=ctx.GoimonQuestLibrary,chapter=library.get('chapter1');
assert.equal(library.characters(chapter,null).filter(c=>c.unlocked).length,0);
assert.equal(library.scenes(chapter,null).filter(s=>s.lines.length).length,0);
const partial={...a.fresh(pet,[],'none'),scene:0,line:1,read:[chapter.data.scenes[0].lines[0].id]};
assert.equal(library.scenes(chapter,partial)[0].lines.length,1);
assert.equal(library.scenes(chapter,partial)[1].lines.length,0);
assert.equal(library.characters(chapter,partial).filter(c=>c.unlocked).length,0);
const met={...partial,scene:3,line:1};
assert.equal(library.characters(chapter,met).filter(c=>c.unlocked).length,1);
assert(library.characters(chapter,met).find(c=>c.id==='morii').unlocked);
const defeated={...partial,mode:'defeat',battleId:2};
assert(library.characters(chapter,defeated).find(c=>c.id==='guardian2').unlocked);
assert.equal(library.load(chapter,storage,'different-account'),null);
assert.equal(JSON.stringify([...memory]),beforeHub);
console.log('PASS quest records: unread content hidden, encounters including defeat, account isolation, no save writes');
