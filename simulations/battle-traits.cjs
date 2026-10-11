// Isolated candidate mechanics; no app storage or networking.
const {species,stats,affinity,damage:original,rng}=require('./battle-balance.cjs'),fs=require('node:fs'),assert=require('node:assert/strict');
const speedIds=new Set(['hirameki','yomitoki','q8_special']),guardIds=new Set(['nagomi','shirabe','q7_special']);
const candidates=[{id:'baseline',traits:false,formula:false},{id:'traits_only',traits:true,formula:false},{id:'formula_only',traits:false,formula:true},{id:'combined',traits:true,formula:true}];
function base(a,b,formula,scale){return formula?((a.attack+20*scale)/2)*Math.sqrt(2*a.attack/(a.attack+b.defense)):a.attack*2*a.attack/(a.attack+b.defense);}
function hit(a,b,power,answer,config,scale,bonus){return Math.max(1,Math.round(base(a,b,config.formula,scale)*power*answer*affinity(a.attr,b.attr)*bonus));}
function skillPower(id,turn,config,traitsEnabled){
 const bonus=config.balance&&traitsEnabled&&id==='hibiki'?1:0;
 const pool=config.skillPool||[{power:1.4,uses:2},{power:1.4,uses:2}];
 let left=turn;for(const skill of pool){if(left<=skill.uses+bonus)return skill.power;left-=skill.uses+bonus;}return 1;
}
function fight(a,b,accuracy,skills,config,seed,scale,enemyTraits=false,enemySkills=false){let hp=a.hp,ehp=b.hp,questions=0,counters=0;const random=rng(seed),first=a.speed===b.speed?random()<.5:a.speed>b.speed;
 const playerBonus=config.traits&&speedIds.has(a.id)&&a.speed>b.speed?(config.speedById?.[a.id]??config.speedBonus??1.35):1;
 const enemyBonus=config.traits&&enemyTraits&&speedIds.has(b.id)&&b.speed>a.speed?(config.speedById?.[b.id]??config.speedBonus??1.35):1;
 for(let turn=1;turn<=60;turn++)for(const player of first?[true,false]:[false,true]){
  questions++;const correct=random()<accuracy;
  if(player){ehp-=hit(a,b,skills?skillPower(a.id,turn,config,true):1,correct?1:.5,config,scale,playerBonus);
   // CPU guard assumes automatic success; no extra enemy quiz.
   if(ehp>0&&config.traits&&enemyTraits&&guardIds.has(b.id)){hp-=Math.max(1,Math.round(b.defense*(config.guardById?.[b.id]??config.guardBonus??.35)*affinity(b.attr,a.attr)));counters++;}
  }else{hp-=hit(b,a,enemySkills?skillPower(b.id,turn,config,enemyTraits):1,correct?.7:1.2,config,scale,enemyBonus);
   if(hp>0&&correct&&config.traits&&guardIds.has(a.id)){ehp-=Math.max(1,Math.round(a.defense*(config.guardById?.[a.id]??config.guardBonus??.35)*affinity(a.attr,b.attr)));counters++;}
  }
  if(hp<=0||ehp<=0)return {win:ehp<=0,turn,questions,counters};
 }
 return {win:false,turn:60,questions,counters,timeout:true};}
function run(config,accuracy=.8,stage=1,points=0,enemyTraits=false,enemySkills=false){const out={candidate:config.id,accuracy,stage,points,enemyTraits,enemySkills,battles:48400,winRate:0,meanTurns:0,under3:0,target3to5:0,timeout:0,perSpecies:[]};let wins=0,turns=0,short=0,target=0,questions=0;
 const scale=stage*(1+.6*points/(points+200));for(let i=0;i<11;i++){let sw=0,st=0;for(let j=0;j<11;j++)for(let r=0;r<400;r++){const f=fight(stats(species[i],stage,points),stats(species[j],stage,points),accuracy,true,config,101+i*100000+j*1000+r,scale,enemyTraits,enemySkills);sw+=f.win;st+=f.turn;short+=f.turn<3;target+=f.turn>=3&&f.turn<=5;questions+=f.questions;out.timeout+=!!f.timeout;}wins+=sw;turns+=st;out.perSpecies.push({name:species[i].name,winRate:+(sw/4400*100).toFixed(1),meanTurns:+(st/4400).toFixed(2)});}
 Object.assign(out,{winRate:+(wins/out.battles*100).toFixed(1),meanTurns:+(turns/out.battles).toFixed(2),under3:+(short/out.battles*100).toFixed(1),target3to5:+(target/out.battles*100).toFixed(1),meanQuestions:+(questions/out.battles).toFixed(2)});return out;}
if(require.main===module){
// Candidate invariants and baseline reproduction are checked below.
const balanced=species[5];for(const c of candidates){assert.equal(hit(balanced,balanced,1,1,c,1,1),20);assert.equal(hit(balanced,balanced,1,.7,c,1,1),14);assert.equal(hit(balanced,balanced,1,1.2,c,1,1),24);}
assert.equal(fight(species[0],species[5],0,true,candidates[1],123,1).counters,0);
const results=candidates.map(c=>run(c));assert.equal(results[0].winRate,74.5);assert.equal(results[0].meanTurns,3.89);
for(const accuracy of [.6,1])results.push(run(candidates[3],accuracy));for(const [stage,points] of [[1.3,100],[1.6,400],[2,1000]])results.push(run(candidates[3],.8,stage,points));
results.push(run(candidates[0],.8,1,0,false,true),run(candidates[3],.8,1,0,true,false));
for(const c of candidates)results.push(run(c,.8,1,0,true,true));
const survival=species.map(s=>({name:s.name,hp:s.hp,worstIncorrectSkill:Math.max(...species.map(e=>hit(e,s,1.4,1.2,candidates[3],1,speedIds.has(e.id)&&e.speed>s.speed?1.35:1)))}));
const report={mechanics:{speed:'Speed-type characters with strictly higher speed deal 1.35x attack damage. No additional actions/questions; tied speed gets no bonus.',guard:'Guard-type characters surviving a correctly answered defense retaliate for 0.35*defense*affinity, rounded (minimum 1). No quiz, attack-answer multiplier or retaliation chains.',formula:'((attack+20*commonScale)/2)*sqrt(2*attack/(attack+defense)); commonScale is stage and uniform learning scale for this simulation only.'},results,survival};
fs.writeFileSync(process.argv[2]||'/tmp/goimon-traits.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));

}
module.exports={run,fight,hit,skillPower};
