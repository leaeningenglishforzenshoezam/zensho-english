const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),crypto=require('node:crypto');
const read=f=>fs.readFileSync(f,'utf8');
function harness(){
 const mem=new Map(),storage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)};
 const c={GOIMONStorage:storage,structuredClone,crypto:crypto.webcrypto,console};c.window=c;vm.createContext(c);
 for(const f of ['goimon_rules.js','goimon_dex.js','goimon.js','battle-prototype/quest-growth.js'])vm.runInContext(read(f),c);
 const pet={id:'p',type:'hirameki',stage:'child',stats:{chie:298,kotoba:0,onkan:0,bunmyaku:0},totalPoints:298};
 storage.setItem('zensho_goimon_current_v4_lv1',JSON.stringify(pet));storage.setItem('zensho_goimon_current_v4_lv2',JSON.stringify({...pet,id:'lv2'}));
 let saved;
 const state={partnerId:'p',pet:structuredClone(pet),run:{hp:9,attack:2,skills:[{left:1}]},checkpoint:{hp:10,attack:2}};
 return {c,mem,storage,state,save(){saved=JSON.stringify(state);},get saved(){return saved;},pet:()=>JSON.parse(storage.getItem('zensho_goimon_current_v4_lv1'))};
}
test('all formats use the learning-page amounts, including selected reorder bonus',()=>{
 const h=harness(),d=(f)=>JSON.parse(JSON.stringify(h.c.GoimonQuestGrowth.delta(f,h.storage)));
 for(const [f,expected] of Object.entries({word_meaning:{chie:1},audio_word_meaning:{chie:.5,onkan:.5},q1:{onkan:1},q3:{onkan:1},idiom:{chie:.5,kotoba:.5},q9:{bunmyaku:1},q11:{kotoba:.5,bunmyaku:.5},q12:{bunmyaku:2}}))assert.deepEqual(d(f),expected);
 h.storage.setItem('zensho_reorder_bonus_stat_v1_lv1','kotoba');assert.deepEqual(d('q12'),{bunmyaku:.5,kotoba:1.5});
 const goimon=read('goimon.js');assert.match(goimon,/quiz_enja: \{ chie: 1 \}/);assert.match(goimon,/audio_quiz: \{ chie: 0.5, onkan: 0.5 \}/);
 assert.match(read('idiom_quiz.js'),/IDIOM_GOIMON_DELTA = \{ chie: 0.5, kotoba: 0.5 \}/);assert.match(read('paraphrase_quiz.js'),/PARAPHRASE_GOIMON_DELTA = \{ kotoba: 0.5, bunmyaku: 0.5 \}/);
});
test('correct answers persist growth and evolution eligibility without changing this run, stage or level 2',()=>{
 const h=harness(),g=h.c.GoimonQuestGrowth,before=JSON.stringify([h.state.pet,h.state.run,h.state.checkpoint]),lv2=h.storage.getItem('zensho_goimon_current_v4_lv2');
 for(let i=0;i<2;i++){g.queue(h.state,{format:'word_meaning'},true);h.save();g.flush(h.state,h.save);}
 assert.equal(h.pet().stats.chie,300);assert.equal(h.pet().level,16);assert.equal(h.pet().stage,'child');assert.equal(h.pet().pendingEvolution,true);
 assert.equal(JSON.stringify([h.state.pet,h.state.run,h.state.checkpoint]),before);assert.equal(h.storage.getItem('zensho_goimon_current_v4_lv2'),lv2);
 g.queue(h.state,{format:'word_meaning'},false);g.flush(h.state,h.save);assert.equal(h.pet().stats.chie,300);assert.equal(Object.keys(h.pet().learningRewardClaims).length,1);
 const P=require('../battle-prototype/chapter2_progress.js'),D=require('../battle-prototype/chapter2_data.js');
 const next=P.fresh(D,h.pet());assert.equal(next.pet.stats.chie,300);assert.equal(next.run,null);
});
test('archive participant receives points while the current companion remains untouched',()=>{
 const h=harness(),original=h.storage.getItem('zensho_goimon_current_v4_lv1'),archived={...h.pet(),id:'stored'};
 h.storage.setItem('zensho_goimon_archive_v4_lv1',JSON.stringify([archived]));h.state.partnerId='stored';
 h.c.GoimonQuestGrowth.queue(h.state,{format:'q11'},true);h.save();h.c.GoimonQuestGrowth.flush(h.state,h.save);
 assert.equal(h.storage.getItem('zensho_goimon_current_v4_lv1'),original);const p=JSON.parse(h.storage.getItem('zensho_goimon_archive_v4_lv1'))[0];assert.equal(p.stats.kotoba,.5);assert.equal(p.stats.bunmyaku,.5);
});
test('a failed pet write retains the pending answer; a failed receipt cleanup replays without double points',()=>{
 const h=harness(),g=h.c.GoimonQuestGrowth;g.queue(h.state,{format:'word_meaning'},true);h.save();const pending=h.saved,write=h.storage.setItem;
 h.storage.setItem=()=>{throw Error('QuotaExceeded')};assert.throws(()=>g.flush(h.state,h.save),/Quota/);assert.equal(h.pet().stats.chie,298);assert(h.state.growthReward);
 h.storage.setItem=write;assert.throws(()=>g.flush(h.state,()=>{throw Error('quest save failed')}),/quest save/);assert.equal(h.pet().stats.chie,299);
 const restored=JSON.parse(pending);g.flush(restored,()=>{});assert.equal(h.pet().stats.chie,299);assert.equal(restored.growthReward,null);
});
test('practice gives points and records results; developer mode never writes real growth',()=>{
 const h=harness(),results=[];h.c.ZenshoLearningLog={addResult:(...a)=>results.push(a)};const g=h.c.GoimonQuestGrowth;
 g.practice(h.state,{format:'q1'},true,h.save);g.practice(h.state,{format:'q1'},false,h.save);assert.equal(h.pet().stats.onkan,1);assert.equal(results.length,2);
 h.c.GoimonDeveloper={active:true};const before=JSON.stringify([...h.mem]);g.practice(h.state,{format:'q1'},true,h.save);assert.equal(JSON.stringify([...h.mem]),before);assert.equal(results.length,2);
});
test('actual chapter answer and retry handlers award once and use the original actor until reconfiguration',()=>{
 for(const n of [1,2]){
  const h=harness(),c=h.c,E=require('../battle-prototype/core.js'),C=require('../battle-prototype/catalog.js'),S=require('../battle-prototype/chapter_store.js');
  const D=require('../battle-prototype/chapter'+n+'_data.js'),pet=h.pet(),skills=[],points={chie:298,kotoba:0,onkan:0,bunmyaku:0};
  const actor=E.actor(C.species.find(s=>s.id===pet.type),C.stages[pet.stage],points,C.gear.find(g=>g.id==='none'),skills);
  Object.assign(c,{E,C,D,state:h.state,Q:{correct:require('../battle-prototype/chapter_questions.js').correct,explain:()=>null},GoimonChapterStore:S,source:{},interval:null,timer:null,clearInterval(){},partner:()=>h.pet(),save:h.save,render(){},app:{querySelector:()=>null},$(){return {textContent:''};},clone:structuredClone,window:c});
  Object.assign(h.state,{scene:n===2?D.scenes.findIndex(s=>s.battleId):0,battleId:1,skills:[],gear:'none',misses:[],tutorial:{},question:{id:'word_1',format:'word_meaning',answer:'収入',prompt:'income',choices:['収入','支出'],review:'quiz.html',reviewId:1,command:'normal',startedAt:Date.now(),deadline:null},combat:E.create(structuredClone(actor),{...structuredClone(actor),id:'enemy',hp:9999,maxHp:9999,speed:1}),checkpoint:structuredClone(actor)});
  h.state.combat.order=['player','enemy'];h.state.combat.index=0;
  vm.runInContext(read('battle-prototype/quest-learning.js'),c);
  const code=read('battle-prototype/chapter'+n+'.js');
  function load(name){const begin=code.indexOf('function '+name+'('),end=code.indexOf('\nfunction ',begin+1);assert(begin>=0);vm.runInContext(code.slice(begin,end<0?undefined:end),c);}
  load('answer');load(n===1?'makeActor':'actor');if(n===1){vm.runInContext(code.match(/const enemyKinds=[^\n]+/)[0],c);load('enemy');}else c.GoimonChapter2Battle=require('../battle-prototype/chapter2_battle.js');load('startBattle');
  c.answer('収入');c.answer('収入');assert.equal(h.pet().stats.chie,299);assert.equal(h.state.pet.stats.chie,298);assert.equal(h.state.combat.player.attack,actor.attack);assert.equal(h.state.combat.player.reference,actor.reference);
  const checkpoint=JSON.stringify(h.state.checkpoint);n===1?c.startBattle(1,true):c.startBattle(true);assert.equal(JSON.stringify(h.state.checkpoint),checkpoint);assert.equal(h.state.combat.player.reference,actor.reference);
  // Even before the first battle of this adventure, later live learning stays outside the actor.
  h.state.run=null;n===1?c.startBattle(1,false):c.startBattle(false);assert.equal(h.state.combat.player.reference,actor.reference);
  // The same confirmed-lineup functions now see the updated pet after reconfiguration.
  h.state.pet=h.pet();const rebuilt=n===1?c.makeActor():c.actor();assert(rebuilt.reference>actor.reference);
 }
});
