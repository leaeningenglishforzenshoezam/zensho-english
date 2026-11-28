const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../rogue_dungeon1.js'), 'utf8');
const start = source.indexOf('  function confirmUpgrade(){');
const end = source.indexOf('  function selectRewardSkill(', start);
assert.ok(start >= 0 && end > start, 'upgrade confirmation is available');
const upgradeCode = source.slice(start, end) + '\nthis.confirm = confirmUpgrade;';

function confirmWith(state, selectedIndex) {
  let advanced = 0;
  const context = {state, upgradeSelectionIndex: selectedIndex, playSfx() {}, advance() {advanced++;}};
  vm.runInNewContext(upgradeCode, context);
  context.confirm();
  return advanced;
}

test('Innovation Plan upgrades the chosen owned skill and clears its reward context', () => {
  const state = {choiceMode: 'upgrade', upgradeSource: 'innovation', upgradeFromEvent: false,
    basicAttack: 5, basicGuard: 3, owned: ['Repair', 'Cure']};
  assert.equal(confirmWith(state, 0), 1);
  assert.deepEqual(state.owned, ['Repair+', 'Cure']);
  assert.equal(state.upgradeSource, null);
  assert.equal(state.basicAttack, 5);
});

test('the main-branch camp rule still upgrades one individual basic STRIKE card', () => {
  const state = {choiceMode: 'upgrade', upgradeSource: 'camp', upgradeFromEvent: false,
    basicAttack: 5, basicGuard: 3, owned: ['Cure']};
  assert.equal(confirmWith(state, -1), 1);
  assert.equal(state.basicAttack, 4);
  assert.deepEqual(state.owned, ['Cure', 'Attack+']);
  assert.equal(state.upgradeSource, null);
});

test('the previous event-upgrade context is cleared after confirming', () => {
  const state = {choiceMode: 'upgrade', upgradeSource: 'event', upgradeFromEvent: true,
    basicAttack: 5, basicGuard: 3, owned: ['Cure']};
  assert.equal(confirmWith(state, 0), 1);
  assert.equal(state.upgradeFromEvent, false);
  assert.equal(state.upgradeSource, null);
});
