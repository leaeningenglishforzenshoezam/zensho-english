const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const test = require('node:test');
const filter = require('../reorder_grammar_filter.js');

function loadData() {
  const context = { window: {} };
  vm.createContext(context);
  for (const file of ['grammar_cards.js', 'reorder_1kyu.js', 'reorder_2kyu.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
  }
  return context.window;
}

const data = loadData();

for (const [level, questions, dictionary] of [
  ['1級', data.REORDER_1KYU, data.GRAMMAR_CARD_DICT],
  ['2級', data.REORDER_2KYU, { ...data.GRAMMAR_CARD_DICT, ...data.REORDER_2KYU_GRAMMAR }]
]) {
  test(`${level}: 登録済みのタグが全問で日本語表示できる`, () => {
    const summaries = filter.collectTags(questions, dictionary, {}, {}, {});
    assert.equal(questions.length, 100);
    assert.ok(summaries.length > 30);
    for (const entry of summaries) {
      assert.ok(dictionary[entry.tag]?.label, `${level}: ${entry.tag} has no label`);
      assert.notEqual(entry.group, 'other', `${level}: ${entry.tag} has no category`);
      assert.ok(filter.UNIT_BY_TAG.has(entry.tag), `${level}: ${entry.tag} has no learning unit`);
      assert.ok(entry.questionCount > 0);
      assert.equal(entry.attempts, 0);
    }
  });

  test(`${level}: 7STEPの統合単元は問題を漏らさず重複なく抽出する`, () => {
    const units = filter.collectUnits(questions, dictionary, {}, {}, {});
    assert.ok(units.length >= 15 && units.length <= 21);
    assert.equal(new Set(units.map(unit => unit.id)).size, units.length);
    const indexes = questions.map((_, i) => i);
    for (const unit of units) {
      const actual = filter.filterIndexes(questions, indexes, unit.tags);
      assert.equal(actual.length, unit.questionCount);
      assert.equal(actual.length, new Set(actual).size);
      assert.ok(unit.questionCount > 0);
      assert.deepEqual(filter.tagsForUnits([unit.id]), filter.UNITS.find(item => item.id === unit.id).tags);
    }
    const selected = filter.tagsForUnits(units.slice(0, 2).map(unit => unit.id));
    assert.deepEqual(filter.filterIndexes(questions, indexes, selected), indexes.filter(i =>
      filter.questionTags(questions[i]).some(tag => selected.includes(tag))));
    assert.ok(questions.every(question => filter.questionTags(question).length), '未分類の問題を残さない');
  });

  test(`${level}: 複数タグは OR で絞り込み、問題の重複なし`, () => {
    const [a, b] = filter.collectTags(questions, dictionary, {}, {}, {}).slice(0, 2).map(x => x.tag);
    const indexes = Array.from({ length: questions.length }, (_, index) => index);
    const result = filter.filterIndexes(questions, indexes, [a, b]);
    const expected = indexes.filter(i => filter.questionTags(questions[i]).some(tag => tag === a || tag === b));
    assert.deepEqual(result, expected);
    assert.equal(result.length, new Set(result).size);
    assert.deepEqual(filter.filterIndexes(questions, indexes, []), indexes);
    assert.deepEqual(filter.filterIndexes(questions, indexes, ['does-not-exist']), []);
  });
}

test('7STEPの順序と否定倒置の位置が正しい', () => {
  assert.deepEqual(filter.STEPS.map(step => step.id), [
    'sentence', 'verbals', 'clauses', 'comparison', 'connectors', 'negative', 'idioms'
  ]);
  assert.equal(filter.UNIT_BY_TAG.get('negative_inversion'), 'negative_inversion');
  const target = data.REORDER_1KYU.find(q => q.id === 'R1_PASTLIKE_042');
  assert.deepEqual([...target.grammarTags], ['negative_inversion']);
});

test('統合単元の苦手表示は細かなタグだけに基づく', () => {
  const questions = [
    { id: 'a', grammarTags: ['verb_object_do'] },
    { id: 'b', grammarTags: ['verb_object_pp'] },
    { id: 'c', grammarTags: ['formal_object_it'] }
  ];
  const dict = {
    verb_object_do: { label: '原形不定詞' },
    verb_object_pp: { label: '過去分詞' },
    formal_object_it: { label: '形式目的語 it' }
  };
  const units = filter.collectUnits(questions, dict, { b: 1 }, {}, {});
  const svoc = units.find(unit => unit.id === 'sentence_svoc');
  assert.equal(svoc.questionCount, 2);
  assert.deepEqual(svoc.weakTags, ['verb_object_pp']);
  assert.deepEqual(svoc.weakLabels, ['過去分詞']);
  assert.equal(units.find(unit => unit.id === 'sentence_it').weak, false);
});

test('タグ別の正誤記録は複数タグの両方に一度ずつ記録する', () => {
  const once = filter.recordAttempt({}, ['relative', 'inversion', 'relative'], false);
  assert.equal(once.relative.attempts, 1);
  assert.equal(once.inversion.attempts, 1);
  assert.equal(once.relative.correct, 0);
  const twice = filter.recordAttempt(once, ['relative'], true);
  assert.deepEqual(twice.relative, { attempts: 2, correct: 1 });
  assert.deepEqual(twice.inversion, { attempts: 1, correct: 0 });
  assert.equal(once.relative.attempts, 1, '前の記録を破壊しない');
});

test('苦手問題の既存記録と新しいタグ別正答率の両方から苦手候補を出す', () => {
  const questions = [
    { id: 'a', grammarTags: ['t1', 't2'] },
    { id: 'b', grammarTags: ['t2'] },
    { id: 'c', grammarTags: ['t3'] }
  ];
  const dict = { t1: { label: 'A' }, t2: { label: 'B' }, t3: { label: 'C' } };
  const stats = { t1: { attempts: 3, correct: 2 }, t2: { attempts: 2, correct: 0 }, t3: { attempts: 4, correct: 4 } };
  const summaries = filter.collectTags(questions, dict, { b: 2 }, { c: true }, stats);
  const byTag = Object.fromEntries(summaries.map(s => [s.tag, s]));
  assert.equal(byTag.t1.weak, true); // 3回・67％
  assert.equal(byTag.t2.weak, true); // 従来の自動苦手問題が残っている
  assert.equal(byTag.t3.weak, true); // 手動で苦手登録されている問題
  assert.equal(byTag.t1.accuracy, 67);
  assert.equal(byTag.t2.weakQuestionCount, 1);
  assert.equal(byTag.t3.weakQuestionCount, 1);

  const recovered = filter.collectTags(questions, dict, {}, {}, { t1: { attempts: 5, correct: 4 } });
  assert.equal(recovered.find(s => s.tag === 't1').weak, false);
});

test('文法タグ選択UIの要素とスクリプト読込順が一致している', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'reorder.html'), 'utf8');
  for (const id of [
    'grammarStudyPicker', 'grammarFilterDetails', 'grammarFilterCount',
    'grammarFilterSearch', 'grammarCategoryTabs', 'grammarFilterAll',
    'grammarFilterSelectWeak', 'grammarFilterSelectStep', 'grammarFilterClear', 'grammarFilterTags',
    'grammarFilterStatus', 'grammarFilterSelected', 'grammarSelectedProblemCount'
  ]) {
    assert.match(html, new RegExp(`id="${id}"`), `${id} is missing`);
  }
  assert.ok(html.indexOf('src="reorder_grammar_filter.js"') < html.indexOf('src="reorder.js?'));
});
