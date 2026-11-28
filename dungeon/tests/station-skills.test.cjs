const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const root=path.join(__dirname,'..');
const code=fs.readFileSync(path.join(root,'rogue_dungeon1.js'),'utf8');
function section(start,end){const a=code.indexOf(start),b=code.indexOf(end,a);assert(a>=0&&b>a,start);return code.slice(a,b);}
const catalog=section('  const skills = {','  const COMMON_SKILLS=')+
  section('  const STAGE_SKILLS={','  const availableSkills=')+
  section('  const baseName =','  function onCardExhausted()');
const railway=section('  function stationBookSeats(', '  function handChoices()');
const effects=section('  function applyCard(', '  function endTurn(');

function setup(override={}){
  const state={dungeon:2,phase:'battle',hp:40,maxHp:100,ap:3,apTotal:3,block:0,guardPriceCut:0,
    stationTransferPoints:0,stationLastSkillType:null,stationReserved:[],stationQueued:[],stationNextTurnAp:0,
    hand:[],handDiscounts:[],used:[],deck:[],enemies:[{id:0,hp:250,maxHp:250,shield:0}],turn:1,
    type:'nagomi',typeBattleUses:new Set(),artifactBattleUses:new Set(),artifactTurnUses:new Set(),
    nextPlus:0,buff:1,growUses:0,discardedTurn:0,recoveredTurn:0,correctFormats:[],turnUsedNames:[],
    artifactAttacks:0,artifactCompound:0,attackSkillCount:0,shieldPierce:0,chainApGained:0,
    momentumActive:false,momentumAttackCount:0,nextGuardBlock:0,attackGuardCap:0,nextAttackApCut:0,
    ...override};
  let draws=0;
  const ctx=vm.createContext({state,MAX_HAND:9,hasArtifact:()=>false,
    alive:()=>state.enemies.filter(x=>x.hp>0),draw:n=>{draws+=n;},
    pickCard:(_title,_desc,choices,choose)=>{if(choices.length)choose(choices[0].name,choices[0].index);},
    takeUsed(){},discardHand(){},replayUsed(){},onCardExhausted(){},
    handChoices:()=>state.hand.map((name,index)=>({name,index})),
  });
  vm.runInContext(catalog+railway+effects,ctx);
  return {state,run:s=>vm.runInContext(s,ctx),get draws(){return draws;}};
}

test('39 exclusive railway cards have exactly N17/R16/SR6; Dungeon 1 pool stays intact',()=>{
  const {run}=setup();
  const pool=Array.from(run('STAGE_SKILLS[2]'));
  assert.equal(pool.length,39);
  assert.equal(new Set(pool).size,39);
  const count=rank=>pool.filter(name=>run(`skills.${name}.rank`)==rank).length;
  assert.deepEqual([count('N'),count('R'),count('SR')],[17,16,6]);
  assert(!pool.includes('Pretend'));
  assert(Array.from(run('STAGE_SKILLS[1]')).includes('Absolute'));
  assert(Array.from(run('STAGE_SKILLS[1]')).every(name=>!pool.includes(name)));
  for(const name of pool){
    assert.equal(run(`typeof skills.${name}.format`),'string',name);
    assert(run(`skills.${name}.plus`)!=null,name);
    assert(run(`skills.${name}.ap`)>=0,name);
  }
  assert.equal(fs.existsSync(path.join(root,'station-skills.css')),true);
  assert.match(fs.readFileSync(path.join(root,'index.html'),'utf8'),/id="stationTactics"/);
});

test('TP scales attacks, is capped at three and only consumed when a bonus is affordable',()=>{
  const t=setup({stationTransferPoints:2});
  t.run("applyCard(getSkill('Express'),'Express',0)");
  assert.equal(t.state.enemies[0].hp,215); // 25 + TP2*5
  assert.equal(t.state.stationTransferPoints,2);
  t.run("applyCard(getSkill('Overtake'),'Overtake',0)");
  assert.equal(t.state.ap,5); // TP2 -> AP+2
  assert.equal(t.state.stationTransferPoints,0);
  t.run("applyCard(getSkill('TicketPunch'),'TicketPunch',0)");
  assert.equal(t.state.stationTransferPoints,1);
  t.state.stationTransferPoints=3;
  t.run("applyCard(getSkill('ZeroHour'),'ZeroHour',0)");
  assert.equal(t.state.stationTransferPoints,0);
  const d1=setup({dungeon:1,stationTransferPoints:3});
  d1.run("applyCard(getSkill('ZeroHour'),'ZeroHour',0)");
  assert.equal(d1.state.stationTransferPoints,3);
  assert.equal(d1.state.enemies[0].hp,230); // no D2 bonus
});

test('reserved seats are player-selected, capped at two and removed from the current hand',()=>{
  const t=setup({hand:['Attack','Guard','FirstAid','Burst'],handDiscounts:[0,1,0,0]});
  t.run('stationBookSeats(2)');
  assert.deepEqual(Array.from(t.state.stationReserved),['Attack','Guard']);
  assert.deepEqual(Array.from(t.state.hand),['FirstAid','Burst']);
  assert.deepEqual(Array.from(t.state.handDiscounts),[0,0]);
  t.run('stationBookSeats(2)');
  assert.equal(t.state.stationReserved.length,2);
});

test('next-turn reservations resolve once, respect shields, and show full-queue fallback',()=>{
  const t=setup({enemies:[{id:0,hp:50,maxHp:50,shield:5}],hp:45});
  t.run("stationQueueDeparture({kind:'damage',amount:12},'Departure Bell')");
  t.run("stationQueueDeparture({kind:'block',amount:8},'Timetable')");
  t.run("stationQueueDeparture({kind:'heal',amount:6},'Maintenance')");
  t.run("stationQueueDeparture({kind:'damage',amount:99},'Overflow')");
  assert.equal(t.state.stationQueued.length,3);
  assert.equal(t.state.block,4);
  const notice=t.run('stationDeparturesArrive()');
  assert.match(notice,/3件/);
  assert.equal(t.state.enemies[0].shield,0);
  assert.equal(t.state.enemies[0].hp,43);
  assert.equal(t.state.block,12);
  assert.equal(t.state.hp,51);
  assert.equal(t.state.stationQueued.length,0);
  assert.equal(t.run('stationDeparturesArrive()'),'');
});

test('turn boundary places selected seats first, fills to five, resets TP, then applies departures',()=>{
  const state={dungeon:2,phase:'battle',pending:null,cardSelection:null,
    turn:1,hand:['Attack','Guard'],handDiscounts:[0,0],deck:['Aid','Burst','Shade','FirstAid','Flash'],used:[],
    hp:40,maxHp:100,ap:2,apTotal:3,block:0,guardPriceCut:0,artifactNextGuard:0,
    stationTransferPoints:3,stationLastSkillType:'guard',stationReserved:['WindowSeat','RailSignal'],
    stationQueued:[{kind:'block',amount:8,source:'Timetable'},{kind:'heal',amount:7,source:'Maintenance'}],stationNextTurnAp:0,
    enemies:[{id:0,hp:120,maxHp:120,shield:0,kind:'ordinary',weak:0,canceled:false}],
    turnUsedNames:[],artifactBattleUses:new Set(),artifactTurnUses:new Set(),typeTurnUses:new Set(),typeCorrectNames:new Set(),
    reserveAp:0,reserveUsed:false,carry:0,carryAll:false,buff:1,nextPlus:0,shieldPierce:0,
  };
  const ctx=vm.createContext({state,MAX_HAND:9,$:()=>({hidden:false}),hasArtifact:()=>false,
    alive:()=>state.enemies.filter(e=>e.hp>0),intent:()=>({attack:0,label:'待機'}),
    giveEnemyShield(){},giveEnemyHealing(){},maxHp:()=>state.maxHp,
    draw:n=>{for(let i=0;i<n&&state.deck.length;i++){state.hand.push(state.deck.pop());state.handDiscounts.push(0);}},
    renderBattle(){},flashNotice(){},showBattleFx(){},playSfx(){},winBattle(){},
    GoimonDungeonMission:{recordDefeat(){}},showChoice(){},openBossChallenge(){},
  });
  vm.runInContext(railway+section('  function endTurn(', '  // Rarity is rolled'),ctx);
  vm.runInContext('endTurn()',ctx);
  assert.equal(state.turn,2);
  assert.deepEqual(Array.from(state.hand.slice(0,2)),['WindowSeat','RailSignal']);
  assert.equal(state.hand.length,5);
  assert.equal(state.stationReserved.length,0);
  assert.equal(state.stationQueued.length,0);
  assert.equal(state.stationTransferPoints,0);
  assert.equal(state.stationLastSkillType,null);
  assert.equal(state.block,8);
  assert.equal(state.hp,47);
  assert.deepEqual(Array.from(state.used),['Attack','Guard']);
});
