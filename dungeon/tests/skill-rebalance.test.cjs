const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {test} = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'rogue_dungeon1.js'), 'utf8');
function section(start, end) {
  const a = source.indexOf(start), b = source.indexOf(end, a);
  assert(a >= 0 && b > a, `Missing function: ${start}`);
  return source.slice(a, b);
}

function setup(extra = {}) {
  const foe = {id: 0, kind: 'attacker', hp: 300, maxHp: 300, shield: 0};
  const state = {
    phase: 'battle', hp: 50, maxHp: 100, ap: 5, apTotal: 5, block: 0, guardPriceCut: 0,
    hand: [], handDiscounts: [], used: [], deck: [], enemies: [foe], turn: 1,
    nextPlus: 0, buff: 1, growUses: 0, discardedTurn: 0, recoveredTurn: 0,
    correctFormats: [], turnUsedNames: [], artifactAttacks: 0, artifactCompound: 0,
    artifactBattleUses: new Set(), typeBattleUses: new Set(), type: 'nagomi',
    sealed: [], artifactTurnUses: new Set(), artifactUniqueCards: [],
    typeTurnUses: new Set(), typeCorrectNames: new Set(), artifactNextGuard: 0,
    shieldPierce: 0, chainApGained: 0, momentumActive: false, momentumAttackCount: 0,
    encourageHeal: 0, encourageCount: 0, nextGuardBlock: 0, attackGuardCap: 0, attackSkillCount: 0,
    nextAttackApCut: 0, marginCallUsed: false, carry: 0, carryAll: false,
    reserveAp: 0, reserveUsed: false, freeReplayCard: null, artifactCardUses: 0,
    artifactCorrectStreak: 0, turnDamage: 0, turnGuardGained: 0,
    ...extra
  };
  let draws = 0;
  let recoveries = [];
  const resultElement = {classList: {contains: () => true}};
  const context = vm.createContext({
    state, $: () => resultElement, MAX_HAND: 9,
    hasArtifact: () => false, alive: () => state.enemies.filter(e => e.hp > 0),
    draw: count => {draws += count;}, takeUsed: (count, cut) => {recoveries.push([count, cut]);},
    pickCard: (title, detail, candidates, choose) => {
      if (candidates.length) choose(candidates[0].name, candidates[0].index);
    },
    discardHand() {}, replayUsed() {}, onCardExhausted() {},
    selectedHandIndex: -1, applyAnswerArtifacts: () => [], applyTypeBoost: () => [],
    awardBadge() {}, winBattle() {}, playSfx() {}, renderBattle() {}, flashNotice() {}, showBattleFx() {},
    maxHp: () => state.maxHp, advance() {}
  });
  vm.runInContext(section('  const skills = {', '  const COMMON_SKILLS=') +
    section('  const baseName =', '  function onCardExhausted()') +
    section('  function finishQuestion()', '  function applyAnswerArtifacts(') +
    section('  function applyCard(', '  function endTurn('), context);
  const run = code => vm.runInContext(code, context);
  return {state, run, context, get draws() {return draws;}, get recoveries() {return recoveries;}};
}

test('agreed base and plus values are reflected in skill definitions', () => {
  const {run} = setup();
  const check = (id, base, plus) => {
    for (const [key, value] of Object.entries(base)) assert.equal(run(`getSkill('${id}').${key}`), value, `${id}.${key}`);
    for (const [key, value] of Object.entries(plus)) assert.equal(run(`getSkill('${id}+').${key}`), value, `${id}+.${key}`);
  };
  check('Attack', {dmg:10}, {dmg:14});
  check('Guard', {block:5}, {block:8});
  check('Flash', {dmg:15}, {dmg:20});
  check('Cure', {heal:9,block:5}, {heal:12,block:8});
  check('Remind', {ap:1}, {ap:0});
  check('Whisper', {dmg:8,draw:1}, {dmg:12,draw:1});
  check('Repair', {ap:2,heal:8,block:8}, {ap:1,heal:8,block:8});
  check('Surround', {ap:2,dmg:14}, {ap:1,dmg:14});
  check('Disturb', {ap:2,cancel:true}, {ap:1,cancel:true});
  check('Extend', {retrieve:2}, {retrieve:2,gainAp:1});
  check('Absolute', {block:18,carry:5}, {block:18,carryAll:true});
  check('GuardShift', {block:10}, {block:15});
  check('Harvest', {ap:2}, {ap:1});
  check('Archive', {retrieve:2,ap:2}, {retrieve:2,retrievedApCut:1});
  check('Overgrowth', {dmg:20,scaleGrow:8}, {dmg:20,scaleGrow:10});
  check('Chain', {dmg:10}, {dmg:15});
  check('Sweep', {dmg:15,range:3,sweepKillAp:1}, {dmg:20,range:3,sweepKillAp:2});
  check('Momentum', {momentum:1}, {draw:1});
  check('Reserve', {reserveAp:2}, {reserveAp:2,gainAp:1});
  check('Clearance', {ap:2,dmg:13,scaleBlock:1}, {ap:1,dmg:13,scaleBlock:1});
  check('LedgerCut', {dmg:7,scaleUsed:1}, {dmg:7,scaleUsed:2});
  check('Overtime', {ap:2,dmg:10,scaleTurn:2}, {ap:1,dmg:10,scaleTurn:2});
  check('LastMinute', {ap:2,dmg:20,perPriorAttackDmg:8}, {ap:1,dmg:20,perPriorAttackDmg:8});
});

test('Sweep restores AP only once even when it defeats several enemies', () => {
  const {state, run} = setup({enemies:[
    {id:0,kind:'attacker',hp:8,maxHp:8,shield:0},
    {id:1,kind:'attacker',hp:9,maxHp:9,shield:0},
    {id:2,kind:'attacker',hp:10,maxHp:10,shield:0}
  ]});
  run("applyCard(getSkill('Sweep'), 'Sweep', 0)");
  assert.equal(state.ap, 6);
  assert.deepEqual(state.enemies.map(e=>e.hp), [0,0,0]);
  const boosted=setup({enemies:[{id:0,kind:'attacker',hp:8,maxHp:8,shield:0},{id:1,kind:'attacker',hp:8,maxHp:8,shield:0}]});
  boosted.run("applyCard(getSkill('Sweep+'), 'Sweep+', 0)");
  assert.equal(boosted.state.ap, 7);
});

test('Momentum rewards every two attack SKILL resolutions, including zero damage and multi-target cards', () => {
  const {state, run} = setup({enemies:[0,1].map(id=>({id,kind:'attacker',hp:1000,maxHp:1000,shield:0}))});
  const use = id => run(`applyCard(getSkill('${id}'), '${id}', 0)`);
  use('Flash');
  use('Momentum');
  for(const id of ['Attack','Attack+','Guard','Disappear'])use(id);
  assert.equal(state.momentumAttackCount,0);
  const attacks=['Counter','Sweep','Grow','Flash','Sweep+','Counter+'];
  attacks.forEach((id,index)=>{
    use(id);
    assert.equal(state.momentumAttackCount,index+1);
    assert.equal(state.ap,5+Math.floor((index+1)/2));
  });
});

test('Shock discounts the next attack; Overtime and Last Minute scale by turn and attacks', () => {
  const {state, run} = setup();
  run("applyCard(getSkill('Shock'), 'Shock', 0)");
  assert.equal(run("cardCost('Chain',getSkill('Chain'))"), 0);
  assert.equal(run("cardCost('Guard',getSkill('Guard'))"), 1);
  state.nextAttackApCut=0;state.turn=3;
  const before=state.enemies[0].hp;
  run("applyCard(getSkill('Overtime'), 'Overtime', 0)");
  assert.equal(before-state.enemies[0].hp, 14);
  state.attackSkillCount=5;
  const next=state.enemies[0].hp;
  run("applyCard(getSkill('LastMinute'), 'LastMinute', 0)");
  assert.equal(next-state.enemies[0].hp, 44);
});

test('Clearance copies all defense into damage without consuming it', () => {
  const {state, run} = setup({block:42});
  run("applyCard(getSkill('Clearance'), 'Clearance', 0)");
  assert.equal(state.enemies[0].hp, 245);
  assert.equal(state.block, 42);
});

test('Pattern boosts the next guard, Guard Shift converts actual HP damage to defense', () => {
  const {state, run} = setup();
  run("applyCard(getSkill('Pattern'), 'Pattern', 0)");
  assert.equal(state.block, 6);
  run("applyCard(getSkill('Guard'), 'Guard', 0)");
  assert.equal(state.block, 19);
  assert.equal(state.nextGuardBlock, 0);
  run("applyCard(getSkill('GuardShift+'), 'GuardShift+', 0)");
  assert.equal(state.block, 34);
  run("applyCard(getSkill('Flash'), 'Flash', 0)");
  assert.equal(state.block, 41); // 50% of 15 damage, rounded down.
  assert.equal(state.attackGuardCap, 0);
});

test('Night Shift counts preceding attack skills, not tactic skills that deal damage', () => {
  const {state, run} = setup();
  run("applyCard(getSkill('Disappear'), 'Disappear', 0)");
  assert.equal(state.attackSkillCount, 0);
  run("applyCard(getSkill('Attack'), 'Attack', 0)");
  run("applyCard(getSkill('NightShift+'), 'NightShift+', 0)");
  assert.equal(state.block, 11); // 7 base + 4 for one prior attack.
});

test('Margin Call has no AP gain cap and cannot be activated twice in one turn', () => {
  const {state, run} = setup({block:90});
  run("applyCard(getSkill('MarginCall+'), 'MarginCall+', 0)");
  assert.equal(state.ap, 35);
  assert.equal(state.block, 0);
  assert.equal(state.marginCallUsed, true);
  run("applyCard(getSkill('MarginCall+'), 'MarginCall+', 0)");
  assert.equal(state.ap, 35);
});

test('Encourage heals only on subsequent correct Q12 skill uses and at most twice', () => {
  const {state, run} = setup();
  run("applyCard(getSkill('Encourage+'), 'Encourage+', 0)");
  assert.equal(state.hp, 50);
  for(let i=0;i<3;i++){
    state.hand=['Pattern'];state.handDiscounts=[0];state.pending={resolved:true,index:0,cost:1,targetId:0};
    state.question={format:'q12'};
    run('finishQuestion()');
  }
  assert.equal(state.hp, 58);
  assert.equal(state.encourageCount, 2);
});

test('Quick Audit adds one deck card with an instance-specific AP discount', () => {
  const {state, run} = setup({deck:['Shock','Guard']});
  run("applyCard(getSkill('QuickAudit+'), 'QuickAudit+', 0)");
  assert.deepEqual(state.hand,['Shock']);
  assert.deepEqual(state.handDiscounts,[1]);
  assert.deepEqual(state.deck,['Guard']);
  assert.equal(run("cardCost('Shock',getSkill('Shock'),0)"), 1);
  assert.equal(state.block, 5);
});

test('Archive+ discounts both selected USED cards, without discounting Archive itself', () => {
  const {state, run, context} = setup({used:['Archive+','Flash','Guard']});
  vm.runInContext(section('  function handChoices()', '  function discardHand('), context);
  run('takeUsed(2,1)');
  assert.deepEqual(state.hand,['Flash','Guard']);
  assert.deepEqual(state.handDiscounts,[1,1]);
  assert.deepEqual(state.used,['Archive+']);
  assert.equal(run("cardCost('Flash',getSkill('Flash'),0)"),0);
  assert.equal(run("cardCost('Guard',getSkill('Guard'),1)"),0);
});

test('upgrading one basic card replaces only that copy in the deck inventory', () => {
  const {state, run, context} = setup({basicAttack:5,basicGuard:3,owned:[],choiceMode:'upgrade'});
  vm.runInContext('let upgradeSelectionIndex=-1;' + section('  function confirmUpgrade()', '  function selectRewardSkill('), context);
  run('confirmUpgrade()');
  assert.equal(state.basicAttack,4);
  assert.deepEqual(state.owned,['Attack+']);
  run('upgradeSelectionIndex=-2;confirmUpgrade()');
  assert.equal(state.basicGuard,2);
  assert.deepEqual(state.owned,['Attack+','Guard+']);
  assert.equal(state.basicAttack+state.basicGuard+state.owned.length,8);
});

test('Absolute+ carries all remaining defense after enemy attacks; per-turn effects reset', () => {
  const {state, run, context} = setup({
    block:50,carry:5,carryAll:true,enemies:[{id:0,kind:'attacker',hp:300,maxHp:300,shield:0,attack:5,weak:0}],
    hand:['Guard'],handDiscounts:[1],momentumActive:true,encourageHeal:3,nextAttackApCut:1
  });
  context.intent=()=>({attack:5,label:'攻撃 5'});
  vm.runInContext(section('  function endTurn(', '  // Rarity is rolled'), context);
  run('endTurn()');
  assert.equal(state.carryOver,45);
  assert.equal(state.block,45);
  assert.equal(state.carryAll,false);
  assert.deepEqual(Array.from(state.handDiscounts),[]);
  assert.equal(state.momentumActive,false);
  assert.equal(state.encourageHeal,0);
  assert.equal(state.nextAttackApCut,0);
});
