// Candidate support skills only. No account storage, reward writes or HTTP.
const {species,stats,affinity,rng}=require('./battle-balance.cjs'),{hit,run}=require('./battle-traits.cjs'),assert=require('node:assert/strict'),fs=require('node:fs');
const config={id:'support_trial',traits:true,formula:true,balance:true,speedById:{yomitoki:1.65},guardById:{nagomi:.65},rosterOverrides:{hibiki:{hp:96,attack:22,defense:22,speed:20}}};
const speedIds=new Set(['hirameki','yomitoki','q8_special']),guardIds=new Set(['nagomi','shirabe','q7_special']);
function heal(hp,max,correct){return Math.min(max,hp+Math.max(1,Math.round(max*.25*(correct?1:.5))));}
function ward(correct){return {factor:correct?.7:.85,hits:2};}
function protect(raw,shield){if(!shield.hits)return raw;shield.hits--;return Math.max(1,Math.round(raw*shield.factor));}
function slots(id,build){const bonus=id==='hibiki'?1:0;return build.map(type=>({type,left:2+bonus}));}
function choose(hp,max,shield,pool){let s=pool.find(s=>s.type==='heal'&&s.left>0&&hp<=max*.5);if(!s)s=pool.find(s=>s.type==='ward'&&s.left>0&&!shield.hits&&hp<=max*.7);if(!s)s=pool.find(s=>s.type==='attack'&&s.left>0);return s||{type:'normal',left:Infinity};}
function fight(a,b,accuracy,build,seed,scale,wardAttack=0){let hp=a.hp,ehp=b.hp,questions=0,heals=0,wards=0;const random=rng(seed),first=a.speed===b.speed?random()<.5:a.speed>b.speed,pool=slots(a.id,build),shield={hits:0,factor:1};
 const pa=speedIds.has(a.id)&&a.speed>b.speed?(config.speedById[a.id]||1.35):1,ea=speedIds.has(b.id)&&b.speed>a.speed?(config.speedById[b.id]||1.35):1;
 for(let turn=1;turn<=60;turn++)for(const player of first?[true,false]:[false,true]){questions++;const correct=random()<accuracy;
  if(player){const skill=choose(hp,a.hp,shield,pool);skill.left--;
   if(skill.type==='heal'){hp=heal(hp,a.hp,correct);heals++;}
   else if(skill.type==='ward'){Object.assign(shield,ward(correct));wards++;if(wardAttack){ehp-=hit({...a,attr:"metal"},b,wardAttack,correct?1:.5,config,scale,pa);if(ehp>0&&guardIds.has(b.id))hp-=Math.max(1,Math.round(b.defense*(config.guardById[b.id]||.35)*affinity(b.attr,a.attr)));}}
   else{ehp-=hit(a,b,skill.type==='attack'?1.4:1,correct?1:.5,config,scale,pa);if(ehp>0&&guardIds.has(b.id))hp-=Math.max(1,Math.round(b.defense*(config.guardById[b.id]||.35)*affinity(b.attr,a.attr)));}
  }else{hp-=protect(hit(b,a,turn<=4+(b.id==='hibiki'?2:0)?1.4:1,correct?.7:1.2,config,scale,ea),shield);
   if(hp>0&&correct&&guardIds.has(a.id))ehp-=Math.max(1,Math.round(a.defense*(config.guardById[a.id]||.35)*affinity(a.attr,b.attr)));
  }
  assert(hp<=a.hp);if(hp<=0||ehp<=0)return {win:ehp<=0,turn,questions,heals,wards};
 }
 return {win:false,turn:60,questions,heals,wards,timeout:true};}
function trial(build,accuracy=.8,stage=1,points=0,wardAttack=0){let totalWins=0,totalTurns=0,totalHeals=0,totalWards=0,timeout=0;const perSpecies=[],scale=stage*(1+.6*points/(points+200));
 for(let i=0;i<11;i++){let wins=0,turns=0,heals=0,wards=0;for(let j=0;j<11;j++)for(let r=0;r<400;r++){const f=fight(stats({...species[i],...config.rosterOverrides[species[i].id]},stage,points),stats({...species[j],...config.rosterOverrides[species[j].id]},stage,points),accuracy,build,101+i*100000+j*1000+r,scale,wardAttack);wins+=f.win;turns+=f.turn;heals+=f.heals;wards+=f.wards;timeout+=!!f.timeout;}totalWins+=wins;totalTurns+=turns;totalHeals+=heals;totalWards+=wards;perSpecies.push({name:species[i].name,winRate:+(wins/4400*100).toFixed(1),meanTurns:+(turns/4400).toFixed(2),meanHeals:+(heals/4400).toFixed(2),meanWards:+(wards/4400).toFixed(2)});}
 return {build,accuracy,stage,points,wardAttack,battles:48400,winRate:+(totalWins/48400*100).toFixed(1),meanTurns:+(totalTurns/48400).toFixed(2),meanHeals:+(totalHeals/48400).toFixed(2),meanWards:+(totalWards/48400).toFixed(2),timeout,perSpecies};}
assert.equal(heal(95,96,true),96);assert.equal(heal(40,96,true),64);assert.equal(heal(40,96,false),52);
const shield=ward(true);assert.equal(protect(20,shield),14);assert.equal(protect(20,shield),14);assert.equal(protect(20,shield),20);
assert.equal(slots('hibiki',['heal','ward'])[0].left,3);assert.equal(slots('tsumugi',['heal','ward'])[0].left,2);
const builds=[['attack','attack'],['attack','heal'],['attack','ward'],['heal','ward']];const results=[];
for(const accuracy of [.6,.8,1])for(const build of builds)results.push(trial(build,accuracy));
for(const [stage,points] of [[1.3,100],[1.6,400],[2,1000]])for(const build of builds)results.push(trial(build,.8,stage,points));
for(const accuracy of [.6,.8,1])for(const build of [['attack','ward'],['heal','ward']])results.push(trial(build,accuracy,1,0,.8));
const baseline=run(config,.8,1,0,true,true),test=results.find(x=>x.accuracy===.8&&x.build.join(',')==='attack,attack');assert.equal(test.winRate,baseline.winRate);assert.deepEqual(test.perSpecies.map(s=>s.winRate),baseline.perSpecies.map(s=>s.winRate));assert(results.every(r=>r.timeout===0));
fs.writeFileSync(process.argv[2]||'/tmp/goimon-support.json',JSON.stringify({config,results},null,2));
for(const r of results.filter(r=>r.accuracy===.8&&r.stage===1))console.log(JSON.stringify(r));
