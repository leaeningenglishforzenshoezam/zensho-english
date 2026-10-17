'use strict';
const assert=require('node:assert/strict');
const test=require('node:test');
const C=require('../battle-prototype/catalog.js');
const E=require('../battle-prototype/core.js');
const points={kotoba:0,chie:0,bunmyaku:0,onkan:0};
function battleFor(id){
 const species=C.species.find(s=>s.id==='hibiki');
 const skill=C.skills.find(s=>s.id===id);
 const player=E.actor(species,1,points,null,[skill]);
 const enemy={id:'enemy',attr:'metal',hp:1000,maxHp:1000,attack:12,defense:16,speed:5,reference:20,skillTurns:0,skillPower:1};
 return E.create(player,enemy,()=>0);
}
for(const id of ['N_pronounce','N_chase','N_press']){
 test(id+' only boosts the next attack on correct skill answers',()=>{
  const b=battleFor(id);
  E.resolve(b,'skill:0',true);
  assert.equal(b.player.nextPower,C.skills.find(s=>s.id===id).onCorrect.nextPower);
  E.resolve(b,'normal',true); // enemy defense phase
  E.resolve(b,'normal',true); // next player attack
  assert.equal(b.player.nextPower,1);
  const wrong=battleFor(id);
  E.resolve(wrong,'skill:0',false);
  assert.equal(wrong.player.nextPower,1);
  assert.equal(wrong.player.skills[0].left,wrong.player.skills[0].maxUses-1);
 });
}
for(const id of ['N_whisper','N_mysterious','R_mirage']){
 test(id+' weakens exactly one enemy attack after correct answer',()=>{
  const b=battleFor(id),factor=C.skills.find(s=>s.id===id).onCorrect.weakFactor;
  E.resolve(b,'skill:0',true);
  assert.equal(b.enemy.weaken.factor,factor);
  assert.equal(b.enemy.weaken.hits,1);
  E.resolve(b,'normal',true);
  assert.equal(b.enemy.weaken.hits,0);
  const wrong=battleFor(id);
  E.resolve(wrong,'skill:0',false);
  assert.equal(wrong.enemy.weaken.hits,0);
  assert.equal(wrong.player.skills[0].left,wrong.player.skills[0].maxUses-1);
 });
}
test('all skills remain and R/SR never use word-meaning questions',()=>{
 assert.equal(C.skills.length,51);
 assert.equal(C.gear.length,27);
 assert.ok(C.skills.filter(s=>s.rarity!=='N').every(s=>s.questionFormat!=='word_meaning'));
});
