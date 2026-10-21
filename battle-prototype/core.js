// Isolated combat state machine. All state stays in memory.
(function(root){'use strict';
const speedIds=['hirameki','yomitoki','q8_special'],guardIds=['nagomi','shirabe','q7_special'],attackIds=['kotonoha','mr_uno','q10_special'];
const gain=p=>1+.6*p/(p+200),round=n=>Math.max(1,Math.round(n));
function affinity(a,b){return a===b?1:({echo:'metal',metal:'mirage',mirage:'echo'}[a]===b?1.2:.8);}
function actor(species,stage,points,gear,skills){
 if(!Array.isArray(skills)||skills.length>4||skills.some(s=>!s)||new Set(skills.map(s=>s.id)).size!==skills.length)throw Error('技は重複なしで最大4つです。');
 const out={...species,reference:20*stage*gain(points.chie),shield:{hits:0,factor:1},nextPower:1,streak:0,gearEffect:gear?.effect||null,spareUsed:false,steadyUsed:false};
 const map={hp:'kotoba',attack:'chie',defense:'bunmyaku',speed:'onkan'};
 for(const stat of Object.keys(map)){if(!Number.isFinite(points[map[stat]])||points[map[stat]]<0)throw Error('invalid points');out[stat]=round(species[stat]*stage*gain(points[map[stat]]));const bonus=gear?.bonuses?.[stat]||(gear?.stat===stat?gear.bonus:0);if(bonus)out[stat]=round(out[stat]*(1+bonus));}
 out.maxHp=out.hp;out.skills=skills.map(s=>{const maxUses=s.uses+(species.id==='hibiki'?1:0);return {...s,left:maxUses,maxUses};});return out;
}
function damage(a,b,power,answer,attribute,bonus=1,shield=1,variance=1){const base=((a.attack+a.reference)/2)*Math.sqrt(2*a.attack/(a.attack+b.defense));return round(base*power*answer*affinity(attribute,b.attr)*bonus*shield*variance);}
function speedBonus(a,b){return speedIds.includes(a.id)&&a.speed>b.speed?(a.id==='yomitoki'?1.65:1.35):1;}
function counter(a,b){return round(a.defense*({nagomi:.20,shirabe:.18,q7_special:.12}[a.id]||0)*affinity(a.attr,b.attr));}
function create(player,enemy,rng=Math.random){enemy.weaken={hits:0,factor:1};return {player,enemy,turn:1,ended:false,winner:null,questions:0,log:[],order:player.speed===enemy.speed?(rng()<.5?['player','enemy']:['enemy','player']):player.speed>enemy.speed?['player','enemy']:['enemy','player'],index:0};}
function current(b){return b.ended?'ended':b.order[b.index];}
function commands(b){return [{id:'normal',name:'通常攻撃'},...b.player.skills.map((s,i)=>({id:'skill:'+i,name:s.name,left:s.left,disabled:s.left===0}))];}
function restoreTarget(p,excluded){return p.skills.filter(s=>s!==excluded&&s.type!=='replenish'&&s.left<s.maxUses).sort((a,b)=>(b.maxUses-b.left)-(a.maxUses-a.left))[0];}
function heal(p,amount){const before=p.hp;p.hp=Math.min(p.maxHp,p.hp+round(amount));return p.hp-before;}
function resolve(b,command,correct,options={}){
 if(b.ended)throw Error('battle ended');if(typeof correct!=='boolean')throw Error('invalid answer');const side=current(b),p=b.player,e=b.enemy;let skill=null;
 if(side==='player'&&command!=='normal'){if(!/^skill:[0-3]$/.test(command))throw Error('invalid command');skill=p.skills[Number(command.slice(-1))];if(!skill||skill.left<=0)throw Error('skill exhausted');}
 const quick=correct&&Number.isFinite(options.elapsedMs)&&options.elapsedMs>=0&&options.elapsedMs<=3000;const rng=options.rng||Math.random;const variance=.95+.1*Math.min(1,Math.max(0,rng()));const attackActor=quick?{...p,attack:p.attack*1.1}:p,defendActor=quick?{...p,defense:p.defense*1.1}:p;const entry={turn:b.turn,side,correct,quick,variance,text:''};b.questions++;if(skill)skill.left--;
 if(side==='player'){
  if(skill?.type==='heal'){entry.text=skill.name+'：HPを'+heal(p,p.maxHp*Math.max(.5,skill.healFraction||.5)*(p.id==='tsumugi'?1.3:1)*(correct?1:.5))+'回復';}
  else{
   let extra=p.nextPower;p.nextPower=1;
   if(p.gearEffect==='courage'&&p.hp<=p.maxHp/2)extra*=1.12;
   if(p.gearEffect==='streak'){if(p.streak>=2){extra*=1.15;p.streak=0;}else p.streak=correct?p.streak+1:0;}
   const attr=skill?.attr||p.attr,amount=correct?damage(attackActor,e,skill?.power||1,1,attr,speedBonus(p,e)*(attackIds.includes(p.id)?1.1:1)*extra,1,variance):1;
   e.hp=Math.max(0,e.hp-amount);entry.text=(skill?.name||'通常攻撃')+'：'+amount+'ダメージ';
   if(correct&&skill?.type==='replenish'){const target=restoreTarget(p,skill);if(target){const restored=Math.min(skill.restoreUses,target.maxUses-target.left);target.left+=restored;entry.text+='・'+target.name+'の使用回数を'+restored+'回復';}else entry.text+='・回復できる技がありません';}
   if(skill?.type==='ward'){p.shield={hits:skill.shieldHits,factor:correct?skill.shieldFactor:skill.wrongShieldFactor};entry.text+='・盾を展開';}
   if(correct&&skill?.type==='prepare'){p.nextPower=skill.nextPower;entry.text+='・次の攻撃を'+p.nextPower+'倍に準備';}
   if(correct&&skill?.type==='weaken'){e.weaken={hits:1,factor:skill.weakFactor};entry.text+='・次の敵攻撃を弱めた';}
   if(correct&&skill?.type==='attack'&&skill.onCorrect){
    const bonus=skill.onCorrect;
    if(Number.isFinite(bonus.nextPower)&&bonus.nextPower>1){p.nextPower=bonus.nextPower;entry.text+='・次の攻撃を'+bonus.nextPower+'倍に連携';}
    if(Number.isFinite(bonus.weakFactor)&&bonus.weakFactor>0&&bonus.weakFactor<1){e.weaken={hits:1,factor:bonus.weakFactor};entry.text+='・次の敵攻撃を'+Math.round(bonus.weakFactor*100)+'％に妨害';}
   }
  }
  if(p.gearEffect==='spare'&&!p.spareUsed&&skill&&skill.type!=='replenish'&&skill.left===0){skill.left=1;p.spareUsed=true;entry.text+='・Spareで使用回数＋1';}
 }else{
  let protection=1;if(p.shield.hits>0){protection*=p.shield.factor;p.shield.hits--;}
  if(e.weaken.hits>0){protection*=e.weaken.factor;e.weaken.hits--;}
  if(p.gearEffect==='patient'&&p.speed<e.speed)protection*=.9;
  let answer=correct?.7:1.5;if(!correct&&p.gearEffect==='steady'&&!p.steadyUsed){answer=1;p.steadyUsed=true;entry.text='Steadyで不正解時の増加を抑制・';}
  const amount=damage(e,defendActor,b.turn<=e.skillTurns?e.skillPower:1,answer,e.attr,1,protection,variance);p.hp=Math.max(0,p.hp-amount);entry.text+='相手の攻撃：'+amount+'ダメージ';
  if(p.hp>0&&correct){if(guardIds.includes(p.id)){const reflected=round(counter(defendActor,e)*variance);e.hp=Math.max(0,e.hp-reflected);entry.text+='・反撃'+reflected;}if(p.gearEffect==='harmony')entry.text+='・HarmonyでHPを'+heal(p,p.maxHp*.03)+'回復';}
 }
 if(quick&&!(side==='player'&&skill?.type==='heal'))entry.text+='・3秒以内！ '+(side==='player'?'攻撃力×1.1':'防御力×1.1');
 b.log.push(entry);if(p.hp===0||e.hp===0){b.ended=true;b.winner=e.hp===0?'player':'enemy';return entry;}
 b.index++;if(b.index===2){b.index=0;b.turn++;}return entry;
}
const api={gain,affinity,actor,damage,speedBonus,counter,create,current,commands,resolve};if(typeof module!=='undefined')module.exports=api;else root.GoimonBattlePrototype=api;
})(typeof window!=='undefined'?window:globalThis);
