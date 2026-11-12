'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const C=require('../battle-prototype/catalog.js'),E=require('../battle-prototype/core.js'),B=require('../battle-prototype/question_bank.js'),Q=require('../battle-prototype/chapter_questions.js'),R=require('../battle-prototype/question-routing.js');
const gift=C.skills.find(s=>s.id==='N_first_aid_gift');
const text=fs.readFileSync(path.join(__dirname,'../words_1kyu.js'),'utf8');
const window={};vm.runInNewContext(text,{window});
const words=window.WORDS_1KYU;
const source={words,idioms:[]};
const points={chie:0,kotoba:0,onkan:0,bunmyaku:0};

test('First Aid is a gift-only audio meaning skill, not a gacha item',()=>{
 assert.ok(gift);
 assert.equal(gift.giftOnly,true);
 assert.equal(gift.rarity,'N');
 assert.equal(gift.type,'heal');
 assert.equal(gift.questionFormat,'audio_word_meaning');
 assert.equal(gift.healFraction,.4);
 assert.equal(gift.healMultiplier,1);
 assert.equal(gift.uses,2);
 assert.equal(R.skillFormat([gift],'skill:0','player',false),'audio_word_meaning');
 assert.ok(C.skills.filter(s=>!s.giftOnly).every(s=>s.id!==gift.id));
});

test('First Aid uses a four-option listening question with no visible English word',()=>{
 const q=Q.select('audio_word_meaning',1,source,B,()=>.21);
 assert.equal(q.format,'audio_word_meaning');
 assert.equal(q.speech,q.en);
 assert.notEqual(q.prompt,q.en);
 assert.equal(q.choices.length,4);
 assert.equal(new Set(q.choices).size,4);
 assert.ok(q.choices.includes(q.answer));
 assert.equal(Q.correct(q,q.answer),true);
 assert.equal(Q.correct(q,'not an option'),false);
});

test('First Aid honors every chapter 1 word range and unrestricted stages',()=>{
 for(let stage=1;stage<=5;stage++){
  const q=Q.select('audio_word_meaning',stage,source,B,()=>.6);
  const [min,max]=B.ranges[stage-1];
  assert.ok(q.no>=min&&q.no<=max, 'stage '+stage+': '+q.no);
  assert.equal(q.choices.length,4);
 }
 const unrestricted=Q.select('audio_word_meaning',null,source,B,()=>.99);
 assert.ok(unrestricted.no>300);
});

test('First Aid honors chapter 2 range and uses full bank when no range is set',()=>{
 const inScope=Q.select('audio_word_meaning',{words:[451,500]},source,B,()=>.5);
 assert.ok(inScope.no>=451&&inScope.no<=500);
 const unrestricted=Q.select('audio_word_meaning',{words:undefined},source,B,()=>.9);
 assert.ok(unrestricted.no>300);
});

test('recovery matches 40% correct, 20% wrong for each species and consumes uses',()=>{
 for(const species of C.species){
  for(const isCorrect of [true,false]){
   const player=E.actor(species,1,points,null,[gift]);
   player.hp=1;
   const enemy={id:'test-enemy',attr:'metal',hp:999,maxHp:999,attack:1,defense:10,speed:0,reference:1,skillTurns:0,skillPower:1};
   const fight=E.create(player,enemy,()=>.5);
   const result=E.resolve(fight,'skill:0',isCorrect,{elapsedMs:9000,rng:()=>.5});
   assert.equal(player.hp-1,Math.round(player.maxHp*(isCorrect?.4:.2)),species.id);
   assert.equal(player.skills[0].left,1,species.id);
   assert.match(result.text,/回復/);
  }
 }
});
