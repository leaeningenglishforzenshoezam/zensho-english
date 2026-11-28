const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'rogue_dungeon1.js'), 'utf8');
const statStart = source.indexOf('  function statsFor(');
const statEnd = source.indexOf('  const BADGES=[', statStart);
const unlockStart = source.indexOf('  const stage2Unlocked=');
const unlockEnd = source.indexOf('\n', unlockStart);
const journalStart = source.indexOf('  const JOURNAL=[');
const journalEnd = source.indexOf('  function renderJournalSummary()', journalStart);
assert(statStart >= 0 && statEnd > statStart && unlockStart > 0 && unlockEnd > unlockStart && journalStart > 0 && journalEnd > journalStart);

const stored = [];
const state = {dungeon: 1, companionId: 'companion-a', act: 1, stage: 0};
const context = vm.createContext({
  state,
  runStats: {},
  RUN_STATS_KEY: 'records',
  DEPARTMENT_ART: 'images/dungeons/night-department-',
  STATION_ART: {}, STATION_EVENTS: {},
  $: () => ({textContent: ''}),
  storeJson: (key, value) => stored.push([key, JSON.stringify(value)]),
  renderJournalSummary() {}
});
vm.runInContext(source.slice(statStart, statEnd) + source.slice(unlockStart, unlockEnd) + '\n' + source.slice(journalStart, journalEnd), context);

const call = expression => vm.runInContext(expression, context);
assert.equal(call('stage2Unlocked()'), false);
assert.equal(call('journalUnlocked().length'), 0);

// Attempts, boss victories, and retries must never serve as story progress.
call("recordRun('start')");
call("recordRun('boss2')");
call("recordRun('start')");
call("recordRun('start')");
assert.equal(context.runStats[1].attempts, 3);
assert.equal(context.runStats[1].clears || 0, 0);
assert.equal(call('journalUnlocked().length'), 0);
assert.equal(call('stage2Unlocked()'), false);

// The first real clear grants the ticket, but the next stage stays locked.
call("recordRun('clear')");
assert.equal(context.runStats[1].clears, 1);
assert.equal(call('journalUnlocked().length'), 2);
assert.equal(call('stage2Unlocked()'), false);
assert.equal(call("JOURNAL.find(item=>item.id==='claim-ticket').unlocked(statsFor(1))"), true);

// Only the second actual clear unlocks the station and its records.
call("recordRun('clear')");
assert.equal(context.runStats[1].clears, 2);
assert.equal(call('stage2Unlocked()'), true);
assert.equal(call('journalUnlocked().length'), 4);
assert.equal(stored.at(-1)[0], 'records');

// The game records a clear only on the ACT 3 boss victory path.
const victoryStart = source.indexOf('  function winBattle(){');
const victoryEnd = source.indexOf('  function selectUpgrade(', victoryStart);
const victory = source.slice(victoryStart, victoryEnd);
assert.match(victory, /if\(state\.act===3\).*recordRun\('clear'\)/s);
assert.match(source, /if\(state\.hp<=0\)\{GoimonDungeonMission\.recordDefeat\(state\);playSfx\('defeat'\);showChoice\('defeat'\);return;\}/);
assert.match(source, /const returnVisit=state\.dungeon===1 && \(statsFor\(1\)\.clears\|\|0\)===1;/);
assert.match(source, /returnVisit\?Math\.round\(encounterHp\*1\.05\):encounterHp/);
assert.match(source, /const pairsAllowed=state\.dungeon!==1 \|\| returnVisit/);

console.log('Dungeon 1 two-clear progression: OK');
