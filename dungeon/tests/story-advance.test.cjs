const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'rogue_dungeon1.js'), 'utf8');
const storyStart = source.indexOf('  let activeStory=null;');
const storyEnd = source.indexOf('  function showFirstNight(){', storyStart);
const introStart = storyEnd;
const introEnd = source.indexOf('  function showActInterlude(', introStart);
const actStart = source.indexOf('  function showActInterlude(');
const actEnd = source.indexOf('  function showDawnSequence(){', actStart);
const dawnStart = source.indexOf('  function showDawnSequence(){');
const dawnEnd = source.indexOf('  const JOURNAL=', dawnStart);
const journalStart = source.indexOf('  function openJournalEntry(id)');
const journalEnd = source.indexOf('  const NODE=', journalStart);
assert(storyStart >= 0 && storyEnd > storyStart && introEnd > introStart && actStart >= 0 && actEnd > actStart && dawnStart >= 0 && dawnEnd > dawnStart && journalStart >= 0 && journalEnd > journalStart);

const elements = Object.fromEntries(['storyOverlay', 'storyArt', 'storyEyebrow', 'storyTitle', 'storyText', 'storyContinue', 'storyCompanion', 'journalOverlay']
  .map(id => [id, {hidden: true, dataset: {}, style: {setProperty() {}}, textContent: '', innerHTML: ''}]));
const timers = new Map();
let nextTimer = 0;
const journal = {
  id: 'receipt', number: '01', title: '返品不可のレシート', image: 'entrance.jpg',
  leadLines: ['これは1ページ目', 'ゆっくり読む'], lines: ['これは2ページ目'], unlocked: () => true
};
let clearCount = 1;
const savedFlags = new Map();
const context = vm.createContext({
  $: id => elements[id],
  DUNGEONS: {1: {battleArt: ['act1.jpg', 'act2.jpg', 'vault.jpg'], clearVaultArt: 'vault-open.jpg', dawnArt: 'dawn.jpg', art: 'entrance.jpg', departureArt: 'door.jpg'}},
  INTRO_STORY_KEY: 'intro', RETURN_STORY_KEY: 'return',
  localStorage: {setItem: (key, value) => savedFlags.set(key, value)},
  JOURNAL: [journal], JOURNAL_SEEN_KEY: 'seen', journalSeen: new Set(),
  statsFor: () => ({clears: clearCount}), journalUnlocked: () => [journal],
  storeJson() {}, renderJournalSummary() {}, playSfx() {},
  selectedCompanion: () => ({name: '相棒'}),
  escapeHtml: value => String(value),
  setTimeout: callback => {const id = ++nextTimer; timers.set(id, callback); return id;},
  clearTimeout: id => timers.delete(id)
});
vm.runInContext(source.slice(storyStart, storyEnd) + source.slice(introStart, introEnd) + source.slice(actStart, actEnd) + source.slice(dawnStart, dawnEnd) + source.slice(journalStart, journalEnd), context);

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

// First arrival is distinct from the return visit; neither is automatic or skippable.
vm.runInContext('showFirstNight()', context);
assert.equal(elements.storyTitle.textContent, '真夜中の百貨店');
elements.storyOverlay.onclick({target: elements.storyOverlay});
assert.equal(elements.storyOverlay.hidden, false);
elements.storyContinue.onclick();
assert.equal(elements.storyTitle.textContent, '閉じたシャッター');
elements.storyContinue.onclick();
assert.equal(elements.storyOverlay.hidden, true);
assert.equal(savedFlags.get('intro'), '1');

vm.runInContext('showReturnNight()', context);
assert.equal(elements.storyTitle.textContent, 'お忘れ物引換票');
elements.storyContinue.onclick();
assert.equal(elements.storyTitle.textContent, 'もう一度、午前0時へ');
elements.storyContinue.onclick();
assert.equal(savedFlags.get('return'), '1');

// ACT interludes and boss forewarnings present dialogue for the appropriate clear count.
clearCount = 0;
vm.runInContext('showActInterlude(1)', context);
assert.equal(elements.storyTitle.textContent, '眠らない売り場');
assert.equal(elements.storyContinue.textContent, '次へ');
assert.match(elements.storyText.innerHTML, /非常鍵/);
assert.equal(timers.size, 0);
elements.storyContinue.onclick();
assert.equal(elements.storyOverlay.hidden, true);

clearCount = 1;
vm.runInContext('showActInterlude(1)', context);
assert.match(elements.storyText.innerHTML, /郷土資料館/);
elements.storyContinue.onclick();
vm.runInContext('showActInterlude(2)', context);
assert.match(elements.storyText.innerHTML, /旧駅貨物通路/);
elements.storyContinue.onclick();
vm.runInContext('showFinalBossOmen()', context);
assert.match(elements.storyText.innerHTML, /また、お会いしましたね/);
elements.storyContinue.onclick();

// First clear grants the claim ticket after opening the shutter and reaching dawn.
vm.runInContext('showDawnSequence()', context);
assert.equal(elements.storyTitle.textContent, '非常シャッターの鍵');
assert.equal(elements.storyContinue.textContent, '次へ');
assert.equal(timers.size, 0);
elements.storyOverlay.onclick({target: elements.storyOverlay});
assert.equal(elements.storyTitle.textContent, '非常シャッターの鍵');
elements.storyContinue.onclick();
assert.equal(elements.storyTitle.textContent, '朝が来た');
assert.equal(elements.storyContinue.textContent, '次へ');
assert.equal(timers.size, 0);
elements.storyContinue.onclick();
assert.equal(elements.storyTitle.textContent, 'お忘れ物引換票');
assert.match(elements.storyText.innerHTML, /引取場所：記載なし/);
elements.storyContinue.onclick();
assert.equal(elements.storyTitle.textContent, '終わらなかった夜');
assert.equal(elements.storyContinue.textContent, '結果を見る');
assert.equal(timers.size, 0);
elements.storyContinue.onclick();
assert.equal(elements.storyOverlay.hidden, true);

// Second clear returns to the basement before the old cargo gate opens.
clearCount = 2;
vm.runInContext('showDawnSequence()', context);
assert.equal(elements.storyTitle.textContent, 'もう一本の鍵');
elements.storyContinue.onclick();
assert.equal(elements.storyTitle.textContent, '地下倉庫へ引き返す');
elements.storyContinue.onclick();
assert.equal(elements.storyTitle.textContent, '封鎖された搬入口');
elements.storyContinue.onclick();
assert.equal(elements.storyTitle.textContent, '帰らずの終着駅');
elements.storyContinue.onclick();
assert.equal(elements.storyOverlay.hidden, true);

// Replay after two clears does not grant another ticket or key.
clearCount = 3;
vm.runInContext('showDawnSequence()', context);
assert.equal(elements.storyTitle.textContent, '百貨店・追想挑戦');
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
