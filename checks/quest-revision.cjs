const assert=require('node:assert/strict');
const E=require('../battle-prototype/core.js');
const S=require('../battle-prototype/chapter_staging.js');
const Q=require('../battle-prototype/chapter_questions.js');
const actor=()=>({id:'test',hp:1000,maxHp:1000,attack:100,defense:100,reference:100,speed:10,attr:'echo',skills:[],shield:{hits:0,factor:1},nextPower:1,streak:0});
const battle=()=>E.create(actor(),{...actor(),skillTurns:0},()=>0);
function hit(ms,rng=.5,side=0,correct=true){const b=battle();b.index=side;const entry=E.resolve(b,'normal',correct,{elapsedMs:ms,rng:()=>rng});return {b,entry,amount:1000-(side?b.player.hp:b.enemy.hp)};}
assert(hit(3000).amount>hit(3001).amount);assert.equal(hit(3000).b.player.attack,100);assert.equal(hit(3000,0).entry.variance,.95);assert.equal(hit(3000,1).entry.variance,1.05);assert(hit(3000,.5,1).amount<hit(3001,.5,1).amount);assert.equal(hit(3000,.5,1).b.player.defense,100);assert.equal(hit(2000,.5,0,false).amount,1);
const b=battle();b.player.hp=1;b.player.skills=[{id:'heal',name:'heal',type:'heal',healFraction:.25,left:2}];E.resolve(b,'skill:0',true);assert.equal(b.player.hp,501);assert.equal(b.player.skills[0].left,1);
assert.equal(S.frame(1,5).background,'rockfall_before');assert.equal(S.frame(1,6).background,'rockfall_falling');assert.equal(S.frame(2,0).background,'rockfall_after');assert.equal(S.frame(15,0).background,'altar');assert.equal(S.frame(15,7).background,'stele_awakened');assert.equal(S.frame(15,10).memory,false);assert.equal(S.frame(15,11).memory,true);assert.equal(S.frame(15,0).enemy,5);assert(S.frame(15,0).people.includes('morii'));
assert.equal(S.frame(19,4).mist,false);assert.equal(S.frame(19,5).mist,true);assert.equal(S.frame(19,7).departing,true);assert.equal(S.frame(19,8).mist,false);
const q={id:9,format:'q9',prompt:'I ( ) a book.',answer:'have'};const ex=Q.explain(q,{q9:[{id:9,ja:'私は本を持っています。',note:'have は「持っている」。'}]});assert.equal(ex.completed,'I have a book.');assert(ex.translation);assert(ex.notes.includes('have は「持っている」。'));
console.log('PASS combat thresholds, unchanged stats, random bounds, failed attack, healing, staging, Q9 explanation');

assert.equal(hit(3000).amount,E.damage({...actor(),attack:110},actor(),1,1,'echo'));
assert.equal(hit(3000,.5,1).amount,E.damage(actor(),{...actor(),defense:110},1,.7,'echo'));
assert.equal(hit(3001).entry.quick,false);assert.equal(hit(1,.5,0,false).entry.quick,false);

assert.equal(Q.explain({format:'word_meaning',prompt:'income',en:'income',answer:'収入'},{words:[{en:'income',ja:'収入'}]}),null);
const detailed=Q.explain({id:'p',format:'q11',answer:'used to'},{q11:[{id:'p',a:'a',b:'I ( ) swim.',pointA:'formerly',pointB:'used to',pointNote:'used to + 動詞の原形で過去の習慣を表す。'}]});assert(detailed.notes.includes('used to + 動詞の原形で過去の習慣を表す。'));
