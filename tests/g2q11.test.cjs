'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
function load(file) {
  const ctx = { window: {} };
  vm.runInNewContext(read(file), ctx, { filename: file, timeout: 3000 });
  return ctx.window;
}
const questions = load('g2q11_questions.js').GOIMON_G2_Q11_SET1;

test('200 distinct 2級 Q11 IDs, all consecutive', () => {
  assert.equal(questions.length, 200);
  const ids = questions.map(q => q.id);
  assert.equal(new Set(ids).size, 200);
  for (let i = 1; i <= 200; i++) {
    assert.ok(ids.includes('G2_Q11_' + String(i).padStart(3, '0')));
  }
  assert.ok(questions.every(q => String(q.level) === '2' && Number(q.section) === 11));
});
test('each question has exactly one answer in 3 unique options and explanatory content', () => {
  for (const q of questions) {
    assert.ok(q.stem.includes('（　　）') || q.stem.includes('(　　)'), q.id + ' missing gap');
    assert.equal(q.distractors.length, 2, q.id);
    assert.equal(new Set([q.answer, ...q.distractors]).size, 3, q.id);
    for (const field of ['tag', 'stem', 'ja', 'explanation', 'comparison']) {
      assert.ok(typeof q[field] === 'string' && q[field].trim(), q.id + ' empty '+field);
    }
  }
});
test('four 50-item SETS, stable tag grouping', () => {
  for (let set = 0; set < 4; set++) {
    const subset = questions.slice(set * 50, set * 50 + 50);
    assert.equal(subset.length, 50);
    assert.ok(subset.every(q => q.set === 'SET ' + (set + 1)));
  }
  assert.ok(new Set(questions.map(q => q.tag)).size >= 8);
});
test('category is available only to grade 2', () => {
  const cats = load('learning_categories.js').LearningCategories;
  assert.equal(cats.isAvailableForLevel('q11_grammar', '2'), true);
  assert.equal(cats.isAvailableForLevel('q11_grammar', '1'), false);
});
test('client cloud schema accepts grade 2 weak key and rejects unregistered variant', () => {
  const ctx = { globalThis: null, TextEncoder };
  ctx.globalThis = ctx;
  vm.runInNewContext(read('cloud_schema.js'), ctx, { timeout: 3000 });
  const allow = ctx.GOIMONCloudSchema.allowed;
  assert.equal(allow('zensho_q11_grammar_weak_v1_lv2'), true);
  assert.equal(allow('zensho_q11_grammar_weak_v1_lv1'), false);
  assert.equal(allow('goimon_preview_g2q11_weak_v1'), false);
});
test('HTML loads prerequisites before quiz and grade routing stays separate', () => {
  const html = read('g2q11.html');
  for (const asset of ['cloud_schema.js','cloud_storage.js','learning_categories.js','learning_log.js','goimon.js','g2q11_questions.js','g2q11.js']) {
    assert.ok(html.includes('src="'+asset+'"'), asset + ' script not loaded');
  }
  assert.ok(html.indexOf('src="g2q11_questions.js"') < html.indexOf('src="g2q11.js"'));
  const index = read('index.html');
  assert.ok(index.includes('getLevel() === "2" ? "g2q11.html" : "paraphrase_quiz.html"'));
  assert.ok(fs.existsSync(path.join(root,'paraphrase_quiz.html')));
});
test('reward call uses existing guarded, idempotent API', () => {
  const js = read('g2q11.js');
  const goimon = read('goimon.js');
  assert.ok(js.includes('window.GoimonUI.addLearningPointsOnce(claimId'));
  assert.ok(js.includes('if(correct && saved && window.GoimonUI?.addLearningPointsOnce)'));
  assert.ok(js.includes("if(activeLevel!=='2')"));
  assert.ok(goimon.includes('function addLearningPointsOnce('));
  assert.ok(goimon.includes('    addLearningPointsOnce,'));
});
test('read-only diagnostic page does not save or award', () => {
  const html = read('g2q11_diagnostics.html');
  assert.ok(!html.includes('GOIMONStorage.setItem('));
  assert.ok(!html.includes('addPoints('));
});
