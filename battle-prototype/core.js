// Isolated combat state machine. All state stays in memory.
(function(root){'use strict';
const speedIds=['hirameki','yomitoki','q8_special'],guardIds=['nagomi','shirabe','q7_special'],attackIds=['kotonoha','mr_uno','q10_special'];
const gain=p=>1+.6*p/(p+200),round=n=>Math.max(1,Math.round(n));
function affinity(a,b){return a===b?1:({echo:'metal',metal:'mirage',mirage:'echo'}[a]===b?1.2:.8);}
function actor(species,stage,points,gear,skills){const out={...species,reference:20*stage*gain(points.chie),shield:{hits:0,factor:1}};const map={hp:'kotoba',attack:'chie',defense:'bunmyaku',speed:'onkan'};
 for(const stat of Object.keys(map)){if(!Number.isFinite(points[map[stat]])||points[map[stat]]<0)throw Error('invalid points');out[stat]=round(species[stat]*stage*gain(points[map[stat]]));if(gear?.stat===stat)out[stat]=round(out[stat]*(1+gear.bonus));}
 out.maxHp=out.hp;out.skills=skills.map(s=>({...s,left:s.uses+(species.id==='hibiki'?1:0)}));return out;}
function damage(a,b,power,answer,attribute,bonus=1,shield=1){const base=((a.attack+a.reference)/2)*Math.sqrt(2*a.attack/(a.attack+b.defense));return round(base*power*answer*affinity(attribute,b.attr)*bonus*shield);}
function speedBonus(a,b){return speedIds.includes(a.id)&&a.speed>b.speed?(a.id==='yomitoki'?1.65:1.35):1;}
function counter(a,b){return round(a.defense*({nagomi:.65,shirabe:.55,q7_special:.35}[a.id]||0)*affinity(a.attr,b.attr));}
function create(player,enemy,rng=Math.random){const battle={player,enemy,turn:1,ended:false,winner:null,questions:0,log:[],order:player.speed===enemy.speed?(rng()<.5?['player','enemy']:['enemy','player']):player.speed>enemy.speed?['player','enemy']:['enemy','player'],index:0};return battle;}
function current(b){return b.ended?'ended':b.order[b.index];}
function commands(b){return [{id:'normal',name:'通常攻撃'},...b.player.skills.map((s,i)=>({id:'skill:'+i,name:s.name,left:s.left,disabled:s.left===0}))];}
function resolve(b,command,correct){if(b.ended)throw Error('battle ended');if(typeof correct!=='boolean')throw Error('invalid answer');const side=current(b),p=b.player,e=b.enemy;let skill=null;
 if(side==='player'&&command!=='normal'){if(!/^skill:[01]$/.test(command))throw Error('invalid command');skill=p.skills[Number(command.slice(-1))];if(!skill||skill.left<=0)throw Error('skill exhausted');}
 const entry={turn:b.turn,side,correct,text:''};b.questions++;if(skill)skill.left--;
 if(side==='player'){
  if(skill?.type==='heal'){const old=p.hp;p.hp=Math.min(p.maxHp,p.hp+round(p.maxHp*.25*(p.id==='tsumugi'?1.3:1)*(correct?1:.5)));entry.text=skill.name+'：HPを'+(p.hp-old)+'回復';}
  else{let shield=1;const attr=skill?.attr||p.attr,power=skill?.power||1;const amount=damage(p,e,power,correct?1:.5,attr,speedBonus(p,e)*(correct&&attackIds.includes(p.id)?1.1:1),shield);e.hp=Math.max(0,e.hp-amount);entry.text=(skill?.name||'通常攻撃')+'：'+amount+'ダメージ';if(skill?.type==='ward'){p.shield={hits:2,factor:correct?.7:.85};entry.text+='・盾を展開';}}
 }else{let protection=1;if(p.shield.hits>0){protection=p.shield.factor;p.shield.hits--;}
  const amount=damage(e,p,b.turn<=e.skillTurns?e.skillPower:1,correct?.7:1.2,e.attr,1,protection);p.hp=Math.max(0,p.hp-amount);entry.text='相手の攻撃：'+amount+'ダメージ';
  if(p.hp>0&&correct&&guardIds.includes(p.id)){const reflected=counter(p,e);e.hp=Math.max(0,e.hp-reflected);entry.text+='・反撃'+reflected;}
 }
 b.log.push(entry);if(p.hp===0||e.hp===0){b.ended=true;b.winner=e.hp===0?'player':'enemy';return entry;}
 b.index++;if(b.index===2){b.index=0;b.turn++;}return entry;}
const api={gain,affinity,actor,damage,speedBonus,counter,create,current,commands,resolve};if(typeof module!=='undefined')module.exports=api;else root.GoimonBattlePrototype=api;
})(typeof window!=='undefined'?window:globalThis);
