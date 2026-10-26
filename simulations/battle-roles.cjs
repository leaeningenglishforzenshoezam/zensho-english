// Complete role candidates and separate PvE benchmarks; never reads app data.
const {config:base,fight,heal,slots}=require('./battle-support.cjs'),{species,stats}=require('./battle-balance.cjs'),assert=require('node:assert/strict'),fs=require('node:fs');
const before={...base,id:'before'},variants=[before,...[.45,.55,.65].map(shirabe=>({...base,id:'roles_'+shirabe,bodyHeal:true,attackTrait:true,guardById:{...base.guardById,shirabe}}))];
const builds=[['attack','attack'],['attack','heal'],['attack','ward']];
const normal=species.slice(0,7),hidden=species.slice(7),intro=['echo','mirage','metal'].map(attr=>({id:'intro_'+attr,name:'入門敵_'+attr,attr,hp:80,attack:14,defense:14,speed:12}));
function bench(players,enemies,rules,build,accuracy=.8,stage=1,points=0){let wins=0,turns=0,timeout=0,target=0;const perSpecies=[];for(let i=0;i<players.length;i++){let w=0,t=0;for(let j=0;j<enemies.length;j++)for(let r=0;r<400;r++){
 const a=stats({...players[i],...rules.rosterOverrides[players[i].id]},stage,points),b=stats({...enemies[j],...rules.rosterOverrides[enemies[j].id]},stage,points),scale=stage*(1+.6*points/(points+200));const f=fight(a,b,accuracy,build,101+species.findIndex(s=>s.id===players[i].id)*100000+j*1000+r,scale,.8,rules);w+=f.win;t+=f.turn;timeout+=!!f.timeout;target+=f.turn>=3&&f.turn<=5;assert(f.questions<=2*f.turn);}
 const n=enemies.length*400;wins+=w;turns+=t;perSpecies.push({name:players[i].name,winRate:+(100*w/n).toFixed(1),meanTurns:+(t/n).toFixed(2)});}
 const battles=players.length*enemies.length*400;return {candidate:rules.id,build,accuracy,stage,points,battles,winRate:+(100*wins/battles).toFixed(1),meanTurns:+(turns/battles).toFixed(2),target3to5:+(100*target/battles).toFixed(1),timeout,perSpecies};}
assert.equal(heal(30,120,true,1.3),69);assert.equal(heal(30,120,false,1.3),50);assert.equal(heal(119,120,true,1.3),120);assert.equal(slots('hibiki',['attack','heal'],3)[0].left,4);
const results=[];for(const v of variants)for(const build of builds)results.push({group:'normal_vs_normal',...bench(normal,normal,v,build)});
const selected=variants[2];for(const [label,players,enemies] of [['normal_vs_hidden',normal,hidden],['hidden_vs_normal',hidden,normal]])for(const build of builds)results.push({group:label,...bench(players,enemies,selected,build)});
for(const accuracy of [.6,.8,1])for(const build of builds)results.push({group:'intro_N_skills',...bench(normal,intro,{...selected,attackPower:1.2,attackUses:3,enemySkillTurns:0,enemyTraits:false},build,accuracy)});
for(const [accuracy,stage,points] of [[.6,1,0],[1,1,0],[.8,1.3,100],[.8,1.6,400],[.8,2,1000]])for(const build of builds)results.push({group:'normal_vs_normal_extra',...bench(normal,normal,selected,build,accuracy,stage,points)});
const standard=intro.map(e=>({...e,id:e.id.replace('intro','standard'),name:e.name.replace('入門','通常'),hp:100,attack:18,defense:18,speed:18}));
const boss=intro.map(e=>({...e,id:e.id.replace('intro','boss'),name:e.name.replace('入門','ボス'),hp:160,attack:20,defense:22,speed:18}));
for(const [group,enemies,turns,power] of [['stage_N_skills',standard,2,1.2],['boss_N_skills',boss,3,1.4]])for(const accuracy of [.6,.8,1])for(const build of builds)results.push({group,...bench(normal,enemies,{...selected,attackPower:1.2,attackUses:3,enemySkillTurns:turns,enemyPower:power,enemyTraits:false},build,accuracy)});
const firstBoss=boss.map(e=>({...e,id:e.id.replace('boss','first_boss'),name:e.name.replace('ボス','初回ボス'),hp:140,attack:14,defense:16,speed:16}));
for(const accuracy of [.6,.8,1])for(const build of builds)results.push({group:'first_boss_N_skills',...bench(normal,firstBoss,{...selected,attackPower:1.2,attackUses:3,enemySkillTurns:2,enemyPower:1.2,enemyTraits:false},build,accuracy)});
assert(results.every(r=>r.timeout===0));
for(const group of ['intro_N_skills','stage_N_skills','first_boss_N_skills'])assert(results.filter(r=>r.group===group&&r.accuracy===1).every(r=>r.perSpecies.every(s=>s.winRate===100)));fs.writeFileSync(process.argv[2]||'/tmp/goimon-roles.json',JSON.stringify({variants,selected,intro,standard,boss,firstBoss,results},null,2));
for(const r of results.filter(r=>r.group==='normal_vs_normal'||(r.group==='intro_N_skills'&&r.accuracy===.8)))console.log(JSON.stringify(r));
