'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const C=require('../battle-prototype/catalog.js');
const E=require('../battle-prototype/core.js');
const R=require('../battle-prototype/question-routing.js');
const Q=require('../battle-prototype/chapter_questions.js');
const B=require('../battle-prototype/question_bank.js');
const window={};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../words_1kyu.js'),'utf8'),{window});
const points={chie:40,kotoba:40,onkan:40,bunmyaku:40};
const species=C.species[0],gift=C.skills.find(s=>s.id==='N_first_aid_gift');
const other=C.skills.filter(s=>s.id!==gift.id).slice(0,4);
const make=()=>E.actor(species,1,points,C.gear.find(g=>g.id==='none'),other);
test('universal First Aid adds fifth quest-only option without changing four equipped skills',()=>{
 const p=make(),owned=JSON.stringify({gear:{},skills:{}});
 assert.deepEqual(p.skills.map(s=>s.id),other.map(s=>s.id));
 assert.equal(E.ensureFirstAid(p,C),true);
 assert.equal(p.skills.length,5);
 assert.deepEqual(p.skills.slice(0,4).map(s=>s.id),other.map(s=>s.id));
 assert.equal(p.skills[4].id,'N_first_aid_gift');
 assert.equal(p.skills[4].questStarter,true);
 assert.equal(p.skills[4].left,2);
 assert.equal(E.commands({player:p}).at(-1).id,'skill:4');
 assert.equal(R.skillFormat(p.skills,'skill:4','player',false),'audio_word_meaning');
 assert.equal(owned,JSON.stringify({gear:{},skills:{}}));
});
test('a saved quest run or checkpoint rehydrates the quest-only recovery exactly once',()=>{
 const p=make(),save=JSON.parse(JSON.stringify(p));
 assert.equal(E.ensureFirstAid(save,C),true);
 save.skills[4].left=1;
 const recovered=JSON.parse(JSON.stringify(save));
 assert.equal(E.ensureFirstAid(recovered,C),false);
 E.refreshSkills(recovered,C);
 assert.equal(recovered.skills.length,5);
 assert.equal(recovered.skills[4].left,1);
 assert.equal(recovered.skills[4].questStarter,true);
 const legacy=JSON.parse(JSON.stringify(p));
 assert.equal(E.ensureFirstAid(legacy,C),true);
 assert.equal(E.ensureFirstAid(legacy,C),false);
});
test('a user who already equipped First Aid does not receive a duplicate',()=>{
 const p=E.actor(species,1,points,null,[gift]);
 assert.equal(E.ensureFirstAid(p,C),false);
 assert.equal(p.skills.length,1);
 assert.equal(p.skills[0].left,2);
});
test('universal recovery works in battle and retains correct/wrong healing',()=>{
 for(const correct of [true,false]){
  const p=make();
  E.ensureFirstAid(p,C);
  p.hp=1;
  const enemy={id:'dummy',attr:'metal',hp:9999,maxHp:9999,attack:1,defense:12,speed:0,reference:1,skillTurns:0,skillPower:1};
  const b=E.create(p,enemy,()=>0);
  assert.equal(E.current(b),'player');
  const text=E.resolve(b,'skill:4',correct,{elapsedMs:9000,rng:()=>0.5}).text;
  assert.match(text,/回復/);
  assert.equal(p.hp,1+Math.round(p.maxHp*(correct?0.4:0.2)));
  assert.equal(p.skills[4].left,1);
  E.resolve(b,'normal',true,{elapsedMs:9000,rng:()=>0.5});
  E.resolve(b,'skill:4',correct,{elapsedMs:9000,rng:()=>0.5});
  assert.equal(p.skills[4].left,0);
  assert.equal(E.commands(b).at(-1).disabled,true);
 }
});
test('universal recovery audio question uses four meanings and existing vocabulary',()=>{
 const p=make();E.ensureFirstAid(p,C);
 const format=R.skillFormat(p.skills,'skill:4','player',false);
 const q=Q.select(format,2,{words:window.WORDS_1KYU,idioms:[]},B,()=>0.3);
 assert.equal(q.choices.length,4);
 assert.equal(q.speech,q.en);
 assert.ok(q.no>=51&&q.no<=100);
});
