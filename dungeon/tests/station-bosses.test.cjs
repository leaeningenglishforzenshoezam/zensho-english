const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../rogue_dungeon1.js'), 'utf8');
function section(start, end) {
  const a = source.indexOf(start), b = source.indexOf(end, a);
  assert(a >= 0 && b > a, `Missing ${start}`);
  return source.slice(a, b);
}

const state = {dungeon: 1, act: 1, turn: 1, turnUsedNames: [], block: 0, enemies: []};
const context = vm.createContext({state, BOSS_SERIOUS_TURN: 15, random: items => items[0]});
vm.runInContext(
  section('  const bossMonsters={', '  const ENEMY_ROLES=') +
  section('  function baseIntent(', '  function alive(){') +
  'this.getBoss=bossForAct;this.move=baseIntent;this.d1=bossMonsters;this.d2=stationBossMonsters;',
  context
);
assert.equal(Object.keys(context.d1).length, 3);
assert.equal(Object.keys(context.d2).length, 3);
assert.deepEqual(Object.values(context.d1).map(b => b.name),
  ['ラーメン魔人HODAKA', '熱血簿記RIKI', '女社長MIKA']);
assert.deepEqual(Object.values(context.d2).map(b => b.name),
  ['LOST & FOUND NAKAJIMA', '冷酷検札官REI', '忘却車掌YOSHI']);

for (const dungeon of [1, 2]) {
  state.dungeon = dungeon;
  for (const act of [1, 2, 3]) {
    state.act = act;
    assert.equal(context.getBoss().bossId, (dungeon === 1 ? context.d1 : context.d2)[act].bossId);
  }
}

const enemy = (act, hpFraction = 1) => {
  const boss = context.d2[act];
  return {...boss, hp: boss.hp * hpFraction, maxHp: boss.hp, id: 0};
};
function move(foe, turn) {
  state.turn = turn;
  state.enemies = [foe];
  return context.move(foe, turn);
}

const nakajima = enemy(1);
assert.equal(move(nakajima, 1).shield, 18);
assert.match(move(nakajima, 3).label, /次ターン大問3で回避/);
assert.deepEqual(Array.from(move(nakajima, 4).quizFormats), ['q3']);
assert.equal(move(nakajima, 4).quizAttack, 34);
assert.equal(move(enemy(1, 0.49), 4).quizAttack, 40);

const rei = enemy(2);
assert.deepEqual(Array.from(move(rei, 1).multiHit), [8, 8]);
assert.deepEqual(Array.from(move(rei, 2).multiHit), [7, 7, 7]);
assert.match(move(rei, 3).label, /次ターン大問11で回避/);
assert.deepEqual(Array.from(move(rei, 4).quizFormats), ['q11','q11']);
assert.equal(move(rei, 4).quizAttack, rei.attack + 11);
assert.equal(move(enemy(2, 0.49), 4).quizAttack, rei.attack + 14);

const yoshi = enemy(3);
assert.equal(move(yoshi, 1).shield, 16);
assert.equal(move(yoshi, 3).heal, 12);
assert.match(move(yoshi, 4).label, /次ターン大技/);
assert.deepEqual(Array.from(move(yoshi, 5).quizFormats), ['q9','q11','q12']);
assert.equal(move(yoshi, 5).quizAttack, yoshi.attack + 14);
assert.deepEqual(Array.from(move(enemy(3, 0.49), 1).multiHit), [10, 10]);
assert.equal(move(enemy(3, 0.49), 3).heal, 6);
assert.equal(move(enemy(3, 0.49), 5).quizAttack, yoshi.attack + 19);

// Lore, guide and dialogue are separate for the two dungeon rosters.
assert.match(source, /const BOSS_GUIDE=\{/);
assert.match(source, /'忘却車掌YOSHI':'[^']*かんぺち[^']*じゃかあしい[^']*終着駅だ。'/);
assert.match(source, /nakajima:\{opening:'いらっしゃいませ/);
assert.match(source, /rei:\{opening:'はい！ 乗車券！/);
assert.match(source, /yoshi:\{opening:'よう来たのう/);
assert.match(source, /const bestiaryRoster=\(\)=>state\.dungeon===2\?\[\.\.\.stationMonsters,\.\.\.stationElites,\.\.\.Object\.values\(stationBossMonsters\)\]/);

const artCode = fs.readFileSync(path.join(__dirname, '../enemy-art.js'), 'utf8');
const artContext = {window: {}};
vm.runInNewContext(artCode, artContext);
for (const boss of Object.values(context.d2)) {
  const markup = artContext.window.enemyArt(boss.kind, boss.name);
  assert.match(markup, /<img/);
  assert.match(markup, /enemy-sprite/);
}
assert.match(artContext.window.enemyArt('boss', context.d2[1].name), /bosses\/nakajima\.png/);
assert.match(artContext.window.enemyArt('boss', context.d2[2].name), /bosses\/rei\.png/);
assert.match(artContext.window.enemyArt('boss', context.d2[3].name), /bosses\/yoshi-angry\.png/);
assert.match(artContext.window.enemyArt('boss', context.d1[3].name), /mika\.webp/);

console.log('Dungeon 2 bosses, distinct portraits, lore and D1 isolation: OK');
