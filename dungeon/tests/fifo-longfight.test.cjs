const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'rogue_dungeon1.js'), 'utf8');
function section(start, end) {
  const a = source.indexOf(start), b = source.indexOf(end, a);
  assert(a >= 0 && b > a, `Missing code: ${start}`);
  return source.slice(a, b);
}

const state = {artifacts: ['FIFOBox'], used: [], hand: [], recoveredTurn: 0, replayUsed: false, freeReplayCard: null, enemies: [], block: 0, turn: 1};
let lastQuestionIndex = null;
const context = vm.createContext({
  state,
  MAX_HAND: 9,
  BOSS_SERIOUS_TURN: 15,
  hasArtifact: id => state.artifacts.includes(id),
  baseName: name => name.endsWith('+') ? name.slice(0, -1) : name,
  pickCard: (title, detail, candidates, choose) => choose(candidates[0].name, candidates[0].index),
  openQuestion: index => {lastQuestionIndex = index;},
  alive: () => state.enemies.filter(enemy => enemy.hp > 0)
});
vm.runInContext(
  section('  const skills = {', '  const COMMON_SKILLS=') +
  section('  function handChoices(){', '  function discardHand(') +
  section('  function replayUsed(){', '  const BOSS_SERIOUS_TURN=') +
  section('  function intent(', '  function alive(){'),
  context
);

const run = code => vm.runInContext(code, context);

// FIFO upgrades every retrieved eligible SKILL, even AP0 cards and multiple cards per turn.
state.used = ['Shock', 'Command'];
run('takeUsed(2)');
assert.deepEqual(state.hand, ['Shock+', 'Command+']);
assert.equal(state.recoveredTurn, 2);
assert.equal(run("skills.Command.ap"), 0);
assert.equal(run("skills.Command.plus.block"), 5);

// Existing + cards and junk remain unchanged; basic attack/guard can now become +.
state.hand = [];
state.used = ['Shock+', 'Attack', 'Guard', 'BadStock'];
run('takeUsed(4)');
assert.deepEqual(state.hand, ['Shock+', 'Attack+', 'Guard+', 'BadStock']);

// Replay still costs AP0 but gains FIFO's + upgrade.
state.hand = [];
state.used = ['Shock'];
state.replayUsed = false;
run('replayUsed()');
assert.deepEqual(state.hand, ['Shock+']);
assert.equal(state.freeReplayCard, 'Shock+');
assert.equal(lastQuestionIndex, 0);

// When FIFO is absent, USED recovery and Replay leave card strength unchanged.
state.artifacts = [];
state.hand = [];
state.used = ['Shock'];
run('takeUsed(1)');
assert.deepEqual(state.hand, ['Shock']);
state.hand = [];
state.used = ['Shock'];
state.replayUsed = false;
run('replayUsed()');
assert.deepEqual(state.hand, ['Shock']);

// Long-fight pressure still increases actual damage while keeping the attack preview accurate.
const foe = {kind: 'attacker', attack: 10, hp: 100, maxHp: 100, id: 1};
state.enemies = [foe];
assert.equal(run('intent(state.enemies[0], 6).attack'), 10);
assert.equal(run('intent(state.enemies[0], 7).attack'), 11);
assert.equal(run('intent(state.enemies[0], 14).attack'), 18);
assert.equal(run('intent(state.enemies[0], 25).attack'), 18);
assert.equal(run('intent(state.enemies[0], 14).label'), '⚔ 攻撃 18');
assert.equal(run("intent(state.enemies[0], 14).label.includes('長期戦')"), false);

assert.equal(run("intent({kind:'tank',attack:8,hp:10}, 1).label"), '⬡ 防御 +11');
vm.runInContext(section('  const effects =', '  const basicCount='), context);
assert.equal(run("effects(skills.Guard)"), '防御 +5');
assert.equal(run("briefEffect(skills.Guard)"), '防御 +5');
assert.equal(run("effects(skills.Attack)"), '10ダメージ');
assert.equal(run("DECK_TYPES.attack"), '攻撃系');
assert.equal(run("DECK_TYPES.guard"), '防御系');

// Composite boss actions keep shield/HP numbers intact and update only the attack damage.
state.enemies = [{kind: 'boss', bossId: 'hodaka', attack: 10, hp: 100, maxHp: 100, id: 1}];
const bossMove = run('intent(state.enemies[0], 14)');
assert.equal(bossMove.attack, 15);
assert.equal(bossMove.shield, 10);
assert.match(bossMove.label, /防御 \+10・攻撃 15/);
const bossQuiz = run('intent(state.enemies[0], 8)');
assert.equal(bossQuiz.quizAttack, 30);
assert.equal(bossQuiz.attack, undefined);

state.enemies = [{kind: 'exchange', attack: 10, hp: 100, maxHp: 100, id: 1}];
const exchange = run('intent(state.enemies[0], 14)');
assert.equal(exchange.attack, 24);
assert.equal(exchange.selfDamage, 16);
assert.match(exchange.label, /等価交換 24・自身HP−16/);

for (const kind of ['attacker','support','sentinel','conductor','tank','charger','counter','inflator',
  'breaker','disruptor','trickster','variable','swarm','leech','inventory','sapper','exchange','taxer','boss']) {
  for (const turn of [7, 8, 14, 15, 20]) {
    const bossIds = kind === 'boss' ? ['hodaka', 'riki', 'mika'] : [undefined];
    for (const bossId of bossIds) {
      state.enemies = [{kind, bossId, attack: 12, hp: 100, maxHp: 100, id: 1}];
      const move = run(`intent(state.enemies[0], ${turn})`);
      assert(!move.label.includes('長期戦'), `${kind} ${turn}: ${move.label}`);
      if (move.attack) {
        const displayedAttack = new RegExp(`(^|[^0-9])${move.attack}(?![0-9])`);
        assert(displayedAttack.test(move.label), `${kind} ${turn}: expected ${move.attack}, got ${move.label}`);
      }
    }
  }
}

console.log('FIFO upgrades and silent long-fight pressure: OK');
