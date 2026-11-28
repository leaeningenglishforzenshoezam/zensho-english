const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const base = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(base, 'rogue_dungeon1.js'), 'utf8');
function section(start, end) {
  const first = source.indexOf(start);
  const last = source.indexOf(end, first);
  assert(first >= 0 && last > first, 'Missing source section: ' + start);
  return source.slice(first, last);
}
function contextWith(parts, values) {
  const context = vm.createContext(values);
  vm.runInContext(parts.join('\n'), context);
  return {context, run: code => vm.runInContext(code, context)};
}

test('six unique artifacts have real image assets and cannot appear in ordinary drops', () => {
  const state = {artifacts: []};
  const {run} = contextWith([
    section('  const artifacts = {', '  const enemySets = [')
  ], {state, random: list => list[0], hasArtifact: id => state.artifacts.includes(id), Math});
  const ids = ['LostChildTicket', 'CrackedMirror', 'NoReturnStamp', 'SecurityBell', 'VanishingFloorMap', 'FinalSettlementSeal'];
  for (const id of ids) {
    const item = run('artifacts.' + id);
    assert.equal(item.eventOnly, true, id);
    assert.equal(item.rank, id === 'FinalSettlementSeal' ? 'SR' : 'R', id);
    const file = fs.readFileSync(path.join(base, 'images', 'artifacts', item.file));
    assert.equal(file.subarray(1, 4).toString(), 'PNG', id);
    assert.equal(file.readUInt32BE(16), 256, id + ' width');
    assert.equal(file.readUInt32BE(20), 256, id + ' height');
  }
  for (const sourceKind of ['shop', 'treasure', 'elite', 'boss', 'event']) {
    for (let i = 0; i < 25; i++) {
      const dropped = run("artifactRoll('" + sourceKind + "')");
      assert(!ids.includes(dropped), sourceKind + ' must exclude ' + dropped);
    }
  }
});

test('seven themed events, second-visit passage, unique rewards, and 60%-off sale', () => {
  const state = {dungeon: 1, eventHistory: [], choiceEvent: 'broadcast', choiceOffer: null, artifacts: [], hp: 90, coins: 120, basicAttack: 5, basicGuard: 3, owned: []};
  let clears = 0;
  const {run} = contextWith([
    section('  const artifacts = {', '  const enemySets = ['),
    section('  const storeEvents={', '  function showChoice(')
  ], {
    state, Math, random: list => list[0], hasArtifact: id => state.artifacts.includes(id),
    statsFor: () => ({clears}), basicCount: id => state[id === 'Attack' ? 'basicAttack' : 'basicGuard'],
    availableRewardSkills: () => [], canAddSkill: () => true, skills: {}, STATION_EVENTS: {}
  });
  const seven = [];
  for (let i = 0; i < 7; i++) seven.push(run('drawMapEvent()'));
  assert.equal(new Set(seven).size, 7);
  assert.deepEqual(seven.sort(), ['register', 'cafe', 'tailor', 'exchange', 'clock', 'broadcast', 'sale'].sort());
  assert.equal(run('saleArtifactPrice("IronShield")'), 16);
  assert.equal(run('saleArtifactPrice("CompoundInterest")'), 30);
  assert.equal(run('saleArtifactPrice("MasterAbacus")'), 48);

  clears = 1;
  state.eventHistory = [];
  const secondVisit = [];
  for (let i = 0; i < 8; i++) secondVisit.push(run('drawMapEvent()'));
  assert.equal(new Set(secondVisit).size, 8);
  assert(secondVisit.includes('passage'));

  const pairs = {
    broadcast: 'LostChildTicket', tailor: 'CrackedMirror',
    exchange: 'NoReturnStamp', register: 'SecurityBell',
    passage: 'VanishingFloorMap', clock: 'FinalSettlementSeal'
  };
  for (const [event, artifact] of Object.entries(pairs)) {
    const options = run("storeEventChoices('" + event + "')");
    assert.equal(options.filter(o => o.artifact === artifact).length, 1, event);
  }
  state.artifacts.push('CrackedMirror');
  assert.equal(run("storeEventChoices('tailor').some(o => o.artifact)"), false);
  assert.equal(run("storeEventLimit({coins:-121})"), 'COIN不足');
  assert.equal(run("storeEventLimit({hp:-90})"), 'HP不足');

  state.dungeon = 2;
  state.eventHistory = [];
  const station = Array.from({length: 8}, () => run('drawMapEvent()'));
  assert.equal(new Set(station).size, 8);
  assert.deepEqual(station, ['umbrella','song','postcard','childTicket','timetable','punch','seat','meal']);
});

test('floor map can change only an unvisited non-combat node, once per ACT', () => {
  const state = {dungeon: 1, phase: 'route', stage: 2, act: 1, mapEditMode: true,
    artifacts: ['VanishingFloorMap'], artifactMapUsedActs: [],
    route: Array.from({length: 9}, () => ['battle', 'rest', 'elite'])};
  const {run} = contextWith([
    section('  const mapCanEdit=', '  function showRoute()')
  ], {
    state, random: choices => choices[0], hasArtifact: id => state.artifacts.includes(id),
    playSfx: () => {}, showRoute: () => {}, flashNotice: () => {},
    artifacts: {VanishingFloorMap: {name: '消えたフロア案内図'}},
    NODE: {rest: ['', '休憩'], event: ['', '未知'], treasure: ['', '宝箱'], shop: ['', 'SHOP']}
  });
  assert.equal(run('mapCanEdit(1,1)'), false);
  assert.equal(run('mapCanEdit(3,0)'), false);
  assert.equal(run('mapCanEdit(3,1)'), true);
  run('rerollRouteNode(3,1)');
  assert.equal(state.route[3][1], 'event');
  assert.deepEqual(state.artifactMapUsedActs, [1]);
  assert.equal(state.mapEditMode, false);
  state.mapEditMode = true;
  run('rerollRouteNode(4,1)');
  assert.equal(state.route[4][1], 'rest');
});

test('rejected skill gets exactly one next-turn retry without refunding AP', () => {
  const state = {artifacts: ['LostChildTicket'], artifactBattleUses: new Set(), used: ['Flash'], delayedRetryCard: null};
  const context = vm.createContext({state, success: false, name: 'Flash', retryTicket: false,
    hasArtifact: id => state.artifacts.includes(id), baseName: name => name});
  vm.runInContext(section('    let retryTicket=false;', '    const hpBefore=').replace('    let retryTicket=false;', ''), context);
  assert.equal(state.delayedRetryCard, 'Flash');
  assert.deepEqual(state.used, []);
  assert(state.artifactBattleUses.has('LostChildTicket'));
  assert.equal(context.retryTicket, true);
  state.used = ['Whisper'];
  context.name = 'Whisper';
  vm.runInContext(section('    let retryTicket=false;', '    const hpBefore=').replace('    let retryTicket=false;', ''), context);
  assert.equal(state.delayedRetryCard, 'Flash', 'cannot trigger twice in the same fight');
  assert(source.includes('if(state.delayedRetryCard){state.deck.push(state.delayedRetryCard);state.delayedRetryCard=null;}'));
});

test('shield reduction, anti-heal, full block counter, and one-time lethal survival', () => {
  const state = {
    phase: 'battle', artifacts: ['NoReturnStamp', 'SecurityBell'], artifactBattleUses: new Set(),
    artifactTurnUses: new Set(), typeTurnUses: new Set(), typeCorrectNames: new Set(),
    hand: [], handDiscounts: [], used: [], deck: [], sealed: [], enemies: [],
    hp: 50, maxHp: 90, block: 0, turn: 1, ap: 3, reserveAp: 0, carry: 0, carryAll: false,
    artifactNextGuard: 0, turnUsedNames: [], attackSkillCount: 0
  };
  let lastScreen = null;
  const {run} = contextWith([
    section('  function giveEnemyShield(', '  // Rarity is rolled separately')
  ], {
    state, Math, selectedHandIndex: -1, $: () => ({hidden: false}),
    hasArtifact: id => state.artifacts.includes(id), maxHp: () => state.maxHp,
    alive: () => state.enemies.filter(e => e.hp > 0), intent: e => e.move,
    playSfx: () => {}, showBattleFx: () => {}, flashNotice: () => {},
    draw: () => {}, renderBattle: () => {}, renderResources: () => {},
    showChoice: screen => {lastScreen = screen;}, winBattle: () => {},
    GoimonDungeonMission: {recordDefeat: () => {}}
  });
  const enemy = {id: 1, hp: 50, maxHp: 100, shield: 0, weak: 0, move: {attack: 7}};
  state.enemies = [enemy];
  run('giveEnemyShield(state.enemies[0], 11)');
  assert.equal(enemy.shield, 3);
  run('giveEnemyShield(state.enemies[0], 11)');
  assert.equal(enemy.shield, 14);
  run('giveEnemyHealing(state.enemies[0], 12)');
  assert.equal(enemy.hp, 56, 'heal 12 is reduced by 6');
  run('giveEnemyHealing(state.enemies[0], 30)');
  assert.equal(enemy.hp, 78, 'heal 30 is reduced by the cap of 8');

  state.artifacts = ['CrackedMirror'];
  state.block = 7;
  run('endTurn(false)');
  assert.equal(enemy.hp, 72);
  assert(state.artifactBattleUses.has('CrackedMirror'));
  state.block = 7;
  run('endTurn(false)');
  assert.equal(enemy.hp, 72, 'the counter fires only once per fight');

  state.artifacts = ['FinalSettlementSeal'];
  state.block = 0;
  state.hp = 5;
  enemy.move = {attack: 10};
  run('endTurn(false)');
  assert.equal(state.hp, 1);
  assert.equal(state.finalSettlementUsed, true);
  state.hp = 1;
  run('endTurn(false)');
  assert.equal(state.hp, 0);
  assert.equal(lastScreen, 'defeat');
});
