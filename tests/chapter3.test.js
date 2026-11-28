// Run: node tests/chapter3.test.js
'use strict';
const assert=require('node:assert/strict');
const D=require('../battle-prototype/chapter3_data.js');
const C=require('../battle-prototype/chapter3_choices.js');
globalThis.GoimonChapter3Choices=C;
const P=require('../battle-prototype/chapter3_progress.js');
const B=require('../battle-prototype/chapter3_battle.js');
const A=require('../battle-prototype/chapter3_assets.js');
const possible=D.scenes.flatMap(s=>s.nodes);
assert.equal(D.scenes.length,19);
assert.equal(C.events.length,8);
assert.equal(new Set(possible.map(n=>n.id)).size,possible.length);
assert.deepEqual(possible.filter(n=>n.type==='choice').map(n=>n.choiceId),C.events.map(x=>x.id));
assert(C.events.every(e=>e.options.length===3));
assert(C.events.every(e=>e.options.every(o=>o.lines.length>0)));
let total=0,ally=0;
for(let i=0;i<3**8;i++){
 let x=i,answers={};
 for(const e of C.events){answers[e.id]='abc'[x%3];x=Math.floor(x/3);}
 const result=C.evaluate(answers);total++;
 if(result.ally){ally++;assert(result.score>=10);assert(result.gaveBudChoice);assert(result.respectedPartner);}
}
assert.equal(total,6561);
assert.equal(ally,744);
function runAll(key){
 const s=P.fresh(D,{id:'test-pet',stage:'egg'}),battles=[],seen=[];
 let steps=0;
 while(s.mode!=='complete'&&++steps<1000){
  const node=P.current(s,D);
  if(node.type==='choice'){seen.push(node.choiceId);P.choose(s,D,node.choiceId,key);}
  else if(node.type==='battle'){
   battles.push(node.battleId);
   P.beginBattle(s,D,{hp:25,maxHp:50},{ended:true,winner:node.battleId==='ambush'?'enemy':node.battleId==='bado'?'survived':'player',player:{hp:0,maxHp:50}});
   assert(P.finishBattle(s,D));
  }else P.advance(s,D);
  P.validate(s,D);
 }
 assert(steps<1000);assert.equal(s.mode,'complete');assert.equal(seen.length,8);
 assert.equal(s.budTrust,C.evaluate(s.choices).score);
 return {battles,route:s.budRoute};
}
assert.deepEqual(runAll('a'),{battles:['ambush','demo','hiro_ally'],route:'ally'});
assert.deepEqual(runAll('b'),{battles:['ambush','demo','bado','hiro_duel'],route:'duel'});
assert.deepEqual(runAll('c'),{battles:['ambush','demo','bado','hiro_duel'],route:'duel'});
const storeData=new Map();
const storage={getItem:key=>storeData.get(key)||null,setItem:(key,value)=>storeData.set(key,value)};
const first=P.create(storage,'chapter3-test',D),s=P.fresh(D,{id:'test-pet',stage:'egg'});
first.save(s);assert.equal(first.load().revision,1);
const other=P.create(storage,'chapter3-test',D),stale=other.load();
P.advance(s,D);first.save(s);
assert.throws(()=>other.save(stale),/別のタブ/);
while(P.current(s,D).type!=='battle')P.advance(s,D);
P.beginBattle(s,D,{hp:50},{ended:true,winner:'enemy',player:{hp:0,maxHp:50}});
assert(P.finishBattle(s,D),'Scripted ambush completes even if HP reaches zero');
// The ambush is scripted rescue, but losing the six-question Bud chase must not advance.
const lose=P.fresh(D,{id:'test-pet',stage:'egg'});
while(P.current(lose,D).type!=='battle')P.advance(lose,D);
P.beginBattle(lose,D,{hp:50},{ended:true,winner:'enemy',player:{hp:0,maxHp:50}});
assert(P.finishBattle(lose,D));assert.equal(lose.run.hp,50,'Hirotoshi rest restores full HP after ambush');
// Verify asset registry and each of the 19 stages can render without missing keys.
assert.equal(Object.keys(A.files.backgrounds).length,11);
assert.equal(Object.keys(A.files.characters).length,11);
assert.equal(Object.keys(A.files.events).length,4);
assert.equal(Object.keys(A.files.enemies).length,1);
for(const scene of D.scenes)for(let i=0;i<scene.nodes.length;i++){
 const frame=A.frame(scene.id,i,'ally',null);
 assert(A.path('backgrounds',frame.background),'missing background: '+scene.id+'/'+i);
 if(frame.event)assert(A.path('events',frame.event));
 for(const item of frame.people)assert(A.path(item.kind,item.key));
}
const badChase=P.fresh(D,{id:'pet-bad',stage:'egg'});
let safety=0;while(++safety<700){const node=P.current(badChase,D);if(node.type==='choice')P.choose(badChase,D,node.choiceId,'c');else if(node.type==='battle'){
 if(node.battleId==='bado')break;
 P.beginBattle(badChase,D,{hp:50},{ended:true,winner:node.battleId==='ambush'?'enemy':'player',player:{hp:50,maxHp:50}});assert(P.finishBattle(badChase,D));
 }else P.advance(badChase,D);
}
assert.equal(P.current(badChase,D).battleId,'bado');
P.beginBattle(badChase,D,{hp:50},{ended:true,winner:'enemy',player:{hp:0,maxHp:50}});
assert.equal(P.finishBattle(badChase,D),false);assert.equal(badChase.mode,'defeat');
// Five supplied Bud sprite poses match their narrative moments.
const bud=(scene,line,route=null,battle=null)=>A.frame(scene,line,route,battle).people.filter(p=>p.key.startsWith('bado_')).map(p=>p.key);
assert.deepEqual(bud('s01',16),['bado_normal']);
assert.deepEqual(bud('s12',0),['bado_normal']);
assert.deepEqual(bud('s12',2,null,'demo'),['bado_alert']);
assert.deepEqual(bud('s09',6),['bado_conflicted']);
assert.deepEqual(bud('s14',17,'duel','bado'),['bado_defensive']);
assert.deepEqual(bud('s14',10,'ally','hiro_ally'),['bado_ally']);
const mock={enemies:{normal:{speed:2},tank:{speed:2},boss:{speed:2}}};
const allyBoss=B.enemy(mock,'hiro_ally',1),duelBoss=B.enemy(mock,'hiro_duel',1);
assert.equal(allyBoss.hp,duelBoss.hp);
assert(allyBoss.attack<duelBoss.attack);
assert.equal(B.enemy(mock,'hiro_ally',0.5).maxHp,Math.round(170*.65),'Egg scaling should not produce an impossible boss');
console.log('Chapter 3 tests passed: 19 scenes, 6,561 choices, route gating, rescue/chase/defeat, concurrent save, 27 assets, and boss balance.');
