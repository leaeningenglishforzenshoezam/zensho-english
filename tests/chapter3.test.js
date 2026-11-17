// Run: node tests/chapter3.test.js
'use strict';
const assert=require('node:assert/strict');
const D=require('../battle-prototype/chapter3_data.js');
const C=require('../battle-prototype/chapter3_choices.js');
globalThis.GoimonChapter3Choices=C;
const P=require('../battle-prototype/chapter3_progress.js');
const B=require('../battle-prototype/chapter3_battle.js');
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
   P.beginBattle(s,D,{hp:25,maxHp:50},{ended:true,winner:['ambush','bado'].includes(node.battleId)?'enemy':'player',player:{hp:0,maxHp:50}});
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
const mock={enemies:{normal:{speed:2},tank:{speed:2},boss:{speed:2}}};
const allyBoss=B.enemy(mock,'hiro_ally',1),duelBoss=B.enemy(mock,'hiro_duel',1);
assert.equal(allyBoss.hp,duelBoss.hp);
assert(allyBoss.attack<duelBoss.attack);
console.log('Chapter 3 tests passed: scenes, 6,561 choices, two routes, survival, saving, and battle balance.');
