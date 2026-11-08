// Isolated before/after test. Historical baseline data remains reproducible.
const {run,skillPower}=require('./battle-traits.cjs'),assert=require('node:assert/strict'),fs=require('node:fs');
const previous={id:'before',traits:true,formula:true,balance:true,speedById:{yomitoki:1.65},guardById:{nagomi:.65}};
const after={...previous,id:'after',rosterOverrides:{hibiki:{hp:96,attack:22,defense:22,speed:20}}};
const strong=[{power:1.8,uses:1},{power:1.4,uses:2}],results=[];
for(const pool of ['standard','strong'])for(const accuracy of [.6,.8,1])for(const c of [previous,after])results.push({...run(pool==='strong'?{...c,skillPool:strong}:c,accuracy,1,0,true,true),pool});
for(const [stage,points] of [[1.3,100],[1.6,400],[2,1000]])for(const c of [previous,after])results.push({...run(c,.8,stage,points,true,true),pool:'standard'});
const hibiki=r=>r.perSpecies.find(s=>s.name==='ひびき');
assert.equal(hibiki(results.find(r=>r.candidate==='before'&&r.accuracy===.8&&r.pool==='standard')).winRate,20.7);
assert.equal(hibiki(results.find(r=>r.candidate==='before'&&r.accuracy===.8&&r.pool==='strong')).winRate,35.8);
assert.equal(skillPower('hibiki',6,after,true),1.4);assert.equal(skillPower('hibiki',7,after,true),1);
for(let i=0;i<results.length;i+=2){assert(hibiki(results[i+1]).winRate>=hibiki(results[i]).winRate);assert.equal(results[i+1].timeout,0);}
fs.writeFileSync(process.argv[2]||'/tmp/goimon-hibiki.json',JSON.stringify({previous,after,results},null,2));
for(let i=0;i<results.length;i+=2)console.log(JSON.stringify({pool:results[i].pool,accuracy:results[i].accuracy,stage:results[i].stage,points:results[i].points,before:hibiki(results[i]),after:hibiki(results[i+1]),allAfterWinRate:results[i+1].winRate,allAfterMeanTurns:results[i+1].meanTurns}));
