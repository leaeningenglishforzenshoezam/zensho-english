// Candidate tuning only; no account data, storage or HTTP.
const {run,skillPower,fight}=require('./battle-traits.cjs'),{species}=require('./battle-balance.cjs'),fs=require('node:fs'),assert=require('node:assert/strict');
const configs=[
 {id:'previous',traits:true,formula:true},
 {id:'balance_only',traits:true,formula:true,balance:true},
 {id:'all_types_up',traits:true,formula:true,balance:true,speedBonus:1.55,guardBonus:.55},
 {id:'targeted_medium',traits:true,formula:true,balance:true,speedById:{yomitoki:1.5},guardById:{nagomi:.5}},
 {id:'targeted_high',traits:true,formula:true,balance:true,speedById:{yomitoki:1.65},guardById:{nagomi:.65}},
 {id:'targeted_max',traits:true,formula:true,balance:true,speedById:{yomitoki:1.8},guardById:{nagomi:.8}}
];
const strong=[{power:1.8,uses:1},{power:1.4,uses:2}];
assert.equal(skillPower('hibiki',5,configs[1],true),1.4);assert.equal(skillPower('hibiki',6,configs[1],true),1.4);assert.equal(skillPower('hibiki',7,configs[1],true),1);
assert.equal(skillPower('hirameki',5,configs[1],true),1);
assert.equal(skillPower('hibiki',2,{...configs[1],skillPool:strong},true),1.8);assert.equal(skillPower('hirameki',2,{...configs[1],skillPool:strong},true),1.4);
assert.equal(skillPower('hibiki',5,configs[1],false),1);
const results=[];for(const c of configs)results.push(run(c,.8,1,0,true,true));
for(const c of [configs[0],configs[1],configs[3],configs[4]])results.push(run({...c,id:c.id+'_strong',skillPool:strong},.8,1,0,true,true));
for(const config of [configs[3],configs[4]])for(const [accuracy,stage,points] of [[.6,1,0],[1,1,0],[.8,1.3,100],[.8,1.6,400],[.8,2,1000]])results.push(run(config,accuracy,stage,points,true,true));
// Baseline model must still match previous published symmetric-CPU comparison.
assert.equal(results[0].winRate,57.2);assert.equal(results[0].meanTurns,3.11);
assert.equal(fight(species[0],species[5],0,true,configs[3],123,1).counters,0);
assert.equal(fight({...species[0],hp:1,speed:0},species[5],1,true,configs[4],123,1).counters,0);
assert(results.every(r=>r.timeout===0));
const report={configs,strongSkillAssumption:'Hypothetical 1.8-power skill (1 use) plus 1.4-power skill (2 uses), strongest used first; effects/actual catalog not decided.',results};
fs.writeFileSync(process.argv[2]||'/tmp/goimon-tuning.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
