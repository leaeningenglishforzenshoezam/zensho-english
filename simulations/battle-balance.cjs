// Isolated arithmetic simulation. Never loads app storage or sends HTTP.
const fs=require('node:fs'),assert=require('node:assert/strict');
const species=[
 ['nagomi','なごみ','echo',100,14,26,15],['hirameki','ひらめき','mirage',80,26,14,20],['tsumugi','つむぎ','mirage',120,18,18,14],['yomitoki','よみとき','metal',80,18,16,26],['shirabe','しらべ','echo',88,18,28,12],['hibiki','ひびき','echo',80,20,20,20],['kotonoha','ことのは','echo',80,30,16,14],['mr_uno','MR.UNO','mirage',88,30,18,18],['q7_special','七人の小人','metal',120,18,30,10],['q8_special','オーディン','metal',88,28,14,24],['q10_special','クラーケン','mirage',120,30,16,12]
].map(([id,name,attr,hp,attack,defense,speed])=>({id,name,attr,hp,attack,defense,speed}));
function stats(s,stage,points){const out={...s};for(const k of ['hp','attack','defense','speed'])out[k]=Math.round(s[k]*stage*(1+.6*points/(points+200)));return out;}
function affinity(a,b){return a===b?1:({echo:'metal',metal:'mirage',mirage:'echo'}[a]===b?1.2:.8);}
function damage(a,d,power,answer,attr=true){return Math.max(1,Math.round(a.attack*(2*a.attack/(a.attack+d.defense))*power*answer*(attr?affinity(a.attr,d.attr):1)));}
function rng(seed){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
function fight(a,b,accuracy,skills,seed,attr=true){let hp=a.hp,enemy=b.hp,questions=0;const random=rng(seed),first=a.speed===b.speed?random()<.5:a.speed>b.speed;
 for(let turn=1;turn<=60;turn++){
  for(const player of first?[true,false]:[false,true]){
   questions++;const correct=random()<accuracy;
   if(player)enemy-=damage(a,b,skills&&turn<=4?1.4:1,correct?1:.5,attr);
   else hp-=damage(b,a,1,correct?.7:1.2,attr);
   if(hp<=0||enemy<=0)return {win:enemy<=0,turn,questions};
  }
 }
 return {win:false,turn:60,questions,timeout:true};}
function scenario(accuracy,skills,stage=1,points=0,attr=true,enemyPoints=points){let wins=0,turns=0,short=0,target=0,timeouts=0;const perSpecies=[];
 for(let i=0;i<species.length;i++){let sw=0,st=0,n=0;for(let j=0;j<species.length;j++)for(let r=0;r<400;r++){const f=fight(stats(species[i],stage,points),stats(species[j],stage,enemyPoints),accuracy,skills,101+i*100000+j*1000+r,attr);sw+=f.win;st+=f.turn;n++;short+=f.turn<3;target+=f.turn>=3&&f.turn<=5;timeouts+=!!f.timeout;}wins+=sw;turns+=st;perSpecies.push({name:species[i].name,winRate:+(100*sw/n).toFixed(1),meanTurns:+(st/n).toFixed(2)});}
 const n=species.length**2*400;return {accuracy,skills,stage,points,enemyPoints,attr,battles:n,winRate:+(100*wins/n).toFixed(1),meanTurns:+(turns/n).toFixed(2),under3Percent:+(100*short/n).toFixed(1),target3to5Percent:+(100*target/n).toFixed(1),timeouts,perSpecies};}
assert.equal(damage(species[5],species[5],1,1),20);assert.equal(damage(species[5],species[5],1,.7),14);assert.equal(damage(species[5],species[5],1,1.2),24);
for(const s of species)for(const t of [1,1.3,1.6,2]){assert(stats(s,t,100).hp>=stats(s,t,0).hp);assert(stats(s,t,1000).hp>stats(s,t,100).hp);}
const results=[scenario(1,false),scenario(.8,false),scenario(.6,false),scenario(1,true),scenario(.8,true),scenario(.6,true),scenario(.8,true,1.3,100),scenario(.8,true,1.6,400),scenario(.8,true,2,1000),scenario(.8,true,1,0,false),scenario(.8,true,1,0,true,1000),scenario(.8,true,1,1000,true,0)];
const firstHit=species.map(s=>({name:s.name,hp:s.hp,worstIncorrectNormal:Math.max(...species.map(e=>damage(e,s,1,1.2))),worstIncorrectSkill:Math.max(...species.map(e=>damage(e,s,1.4,1.2)))}));
const report={assumptions:['CPU uses normal attacks only; player uses either normal only or two same-attribute skills with two uses each (first four turns).','Both sides have equal stage and all four learning points. No equipment or status effects.','Attack and defense answers are independent Bernoulli trials. Same speed order selected randomly once per battle.','All 121 matchups equally weighted; hidden characters included as enemies. This is not the quest enemy distribution.'],results,firstHit};
fs.writeFileSync(process.argv[2]||'/tmp/goimon-battle-balance.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
