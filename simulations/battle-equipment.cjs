// Equipment percentages tested with the actual isolated prototype engine.
const E=require('../battle-prototype/core.js'),C=require('../battle-prototype/catalog.js'),{rng}=require('./battle-balance.cjs'),assert=require('node:assert/strict'),fs=require('node:fs');
const results=[],p={chie:0,kotoba:0,bunmyaku:0,onkan:0};
for(const difficulty of ['normal','swift'])for(const gear of C.gear){let wins=0,turns=0,timeout=0;const perSpecies=[];for(let i=0;i<7;i++){let w=0,t=0;for(let j=0;j<3;j++)for(let r=0;r<400;r++){
 const attr=['echo','mirage','metal'][j],s=C.species[i],alt={echo:'metal',metal:'mirage',mirage:'echo'}[s.attr],skills=[C.skills.find(x=>x.id==='N_'+s.attr),C.skills.find(x=>x.id==='N_'+alt)];
 const a=E.actor(s,1,p,gear,skills),raw=C.enemies[difficulty],b={...raw,id:'enemy',attr,maxHp:raw.hp,reference:20};const random=rng(101+i*100000+j*1000+r),battle=E.create(a,b,random);
 while(!battle.ended&&battle.turn<=30){let command=null;if(E.current(battle)==='player'){const ranked=a.skills.map((skill,k)=>({k,skill,value:skill.power*E.affinity(skill.attr,b.attr)})).filter(x=>x.skill.left>0).sort((x,y)=>y.value-x.value);command=ranked.length?'skill:'+ranked[0].k:'normal';}E.resolve(battle,command,random()<.8);}
 w+=battle.winner==='player';t+=battle.turn;timeout+=!battle.ended;
 }wins+=w;turns+=t;perSpecies.push({name:C.species[i].entries.label,winRate:+(w/1200*100).toFixed(1),meanTurns:+(t/1200).toFixed(2)});}
 assert.equal(timeout,0);results.push({difficulty,gear:gear.id,bonus:gear.bonus,battles:8400,winRate:+(wins/8400*100).toFixed(1),meanTurns:+(turns/8400).toFixed(2),timeout,perSpecies});}
fs.writeFileSync(process.argv[2]||'/tmp/goimon-equipment.json',JSON.stringify({assumptions:'Actual prototype engine; 7 normal species, 3 normal quest enemy attributes, 400 trials each; 80% answer accuracy; two distinct N attack skills; choose available skill with highest attribute-adjusted power. Learning and stage bonuses zero/child; no recovery/support.',results},null,2));for(const r of results)console.log(r.difficulty,r.gear,r.winRate,r.meanTurns);
