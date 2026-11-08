'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const C=require('../battle-prototype/catalog.js');
const R=require('../battle-prototype/question-routing.js');
test('SKILL commands respect assigned question formats',()=>{
 for(let i=0;i<C.skills.length;i++){
  const s=C.skills[i];
  assert.equal(R.skillFormat([s],'skill:0','player',false),s.questionFormat,s.id);
 }
});
test('normal attacks and enemy defense use basic questions',()=>{
 const skills=[C.skills.find(s=>s.questionFormat==='q12')];
 assert.equal(R.skillFormat(skills,'normal','player',false),'word_meaning');
 assert.equal(R.skillFormat(skills,null,'enemy',false),'word_meaning');
 assert.equal(R.skillFormat(skills,'skill:0','player',true),'word_meaning');
});
test('unsupported formats do not silently fall back',()=>{
 assert.equal(R.assertAvailable('q9',{q9:[{id:'x'}]}),true);
 assert.throws(()=>R.assertAvailable('q12',{}),/接続されていません/);
 assert.throws(()=>R.skillFormat([],'skill:0','player',false),/unavailable/);
});
test('R and SR skills exclude word-meaning questions',()=>{
 assert.ok(C.skills.every(s=>s.rarity==='N'||s.questionFormat!=='word_meaning'));
});
