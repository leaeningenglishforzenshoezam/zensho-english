const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'rogue_dungeon1.js'), 'utf8');
const storyStart = source.indexOf('  let activeStory=null;');
const storyEnd = source.indexOf('  function showFirstNight(){', storyStart);
const actStart = source.indexOf('  function showActInterlude(');
const actEnd = source.indexOf('  function showFinalBossOmen(){', actStart);
const dawnStart = source.indexOf('  function showDawnSequence(){');
const dawnEnd = source.indexOf('  const JOURNAL=', dawnStart);
const journalStart = source.indexOf('  function openJournalEntry(id)');
const journalEnd = source.indexOf('  const NODE=', journalStart);
assert(storyStart >= 0 && storyEnd > storyStart && actStart >= 0 && actEnd > actStart && dawnStart >= 0 && dawnEnd > dawnStart && journalStart >= 0 && journalEnd > journalStart);

const elements = Object.fromEntries(['storyOverlay', 'storyArt', 'storyEyebrow', 'storyTitle', 'storyText', 'storyContinue', 'storyCompanion', 'journalOverlay']
  .map(id => [id, {hidden: true, dataset: {}, style: {setProperty() {}}, textContent: '', innerHTML: ''}]));
const timers = new Map();
let nextTimer = 0;
const journal = {
  id: 'receipt', number: '01', title: '返品不可のレシート', image: 'entrance.jpg',
  leadLines: ['これは1ページ目', 'ゆっくり読む'], lines: ['これは2ページ目'], unlocked: () => true
};
const context = vm.createContext({
  $: id => elements[id],
  DUNGEONS: {1: {battleArt: ['act1.jpg', 'act2.jpg', 'vault.jpg'], clearVaultArt: 'vault-open.jpg', dawnArt: 'dawn.jpg', art: 'entrance.jpg'}},
  JOURNAL: [journal], JOURNAL_SEEN_KEY: 'seen', journalSeen: new Set(),
  statsFor: () => ({}), journalUnlocked: () => [journal],
  storeJson() {}, renderJournalSummary() {}, playSfx() {},
  selectedCompanion: () => ({name: '相棒'}),
  escapeHtml: value => String(value),
  setTimeout: callback => {const id = ++nextTimer; timers.set(id, callback); return id;},
  clearTimeout: id => timers.delete(id)
});
vm.runInContext(source.slice(storyStart, storyEnd) + source.slice(actStart, actEnd) + source.slice(dawnStart, dawnEnd) + source.slice(journalStart, journalEnd), context);

// A record's first page waits indefinitely; only the visible button advances it.
vm.runInContext("openJournalEntry('receipt')", context);
assert.equal(elements.storyOverlay.hidden, false);
assert.equal(elements.storyTitle.textContent, '閉店後に残されたもの');
assert.equal(elements.storyContinue.textContent, '次へ');
assert.equal(timers.size, 0);
elements.storyOverlay.onclick({target: elements.storyOverlay});
assert.equal(elements.storyTitle.textContent, '閉店後に残されたもの');
assert.equal(elements.storyOverlay.hidden, false);

elements.storyContinue.onclick();
assert.equal(elements.storyTitle.textContent, '返品不可のレシート');
assert.equal(elements.storyContinue.textContent, '記録を閉じる');
assert.equal(elements.storyOverlay.hidden, false);
assert.equal(timers.size, 0);
elements.storyContinue.onclick();
assert.equal(elements.storyOverlay.hidden, true);

// ACT interludes and all three final-clear scenes require deliberate input.
vm.runInContext('showActInterlude(1)', context);
assert.equal(elements.storyTitle.textContent, '眠らない売り場');
assert.equal(elements.storyContinue.textContent, '次へ');
assert.equal(timers.size, 0);
elements.storyContinue.onclick();
assert.equal(elements.storyOverlay.hidden, true);

vm.runInContext('showDawnSequence()', context);
assert.equal(elements.storyTitle.textContent, '最後の鍵が外れた');
assert.equal(elements.storyContinue.textContent, '次へ');
assert.equal(timers.size, 0);
elements.storyOverlay.onclick({target: elements.storyOverlay});
assert.equal(elements.storyTitle.textContent, '最後の鍵が外れた');
elements.storyContinue.onclick();
assert.equal(elements.storyTitle.textContent, '時計が動き始めた');
assert.equal(elements.storyContinue.textContent, '次へ');
assert.equal(timers.size, 0);
elements.storyContinue.onclick();
assert.equal(elements.storyTitle.textContent, '夜明けの百貨店');
assert.equal(elements.storyContinue.textContent, '結果を見る');
assert.equal(timers.size, 0);
elements.storyContinue.onclick();
assert.equal(elements.storyOverlay.hidden, true);

// Timed cinematic pages retain their original automatic-advance behavior.
vm.runInContext("playStory([{moment:'vault',image:'a.jpg',title:'金庫',lines:[],duration:100}, {moment:'dawn',image:'b.jpg',title:'朝',lines:[],button:'結果を見る'}])", context);
assert.equal(timers.size, 1);
const callback = [...timers.values()][0];
timers.clear();
callback();
assert.equal(elements.storyTitle.textContent, '朝');
elements.storyContinue.onclick();
assert.equal(elements.storyOverlay.hidden, true);

console.log('Dungeon story manual advance: OK');
