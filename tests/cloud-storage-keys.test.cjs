// Audit cross-device learning state against the shared cloud allowlist.
// This test deliberately does not read or change real users' localStorage/D1 data.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('../cloud_schema.js');
const schema = globalThis.GOIMONCloudSchema;
const source = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

const learningKeys = {
  'Vocabulary and block results': [
    'zensho_quiz_weak_points_enja_v2_lv1',
    'zensho_quiz_manual_weak_enja_v1_lv2',
    'zensho_quiz_weak_points_jaen_v3_lv1',
    'zensho_block_global_lv1_v1',
    'zensho_block_stats_enja_v1_lv1',
    'zensho_block_stats_jaen_v2_lv2'
  ],
  'Accent, listening and sentences': [
    'zensho_accent_weak_v1_lv1',
    'zensho_accent_manual_weak_v1_lv2',
    'zensho_audio_quiz_weak_v1_lv1',
    'zensho_sentence_fixed_weak_v2_lv1',
    'zensho_listening_progress_v1_lv1',
    'zensho_listening_weak_v1_lv2',
    'zensho_listening_attempts_v1_lv1',
    'zensho_listening_method_attempts_v1_lv2'
  ],
  'Idioms, paraphrases and reorder': [
    'zensho_idiom_quiz_weak_meaning_v1_lv1',
    'zensho_idiom_quiz_weak_synonym_v1_lv1',
    'zensho_idiom_quiz_weak_expression_from_meaning_v1_lv1',
    'zensho_idiom_quiz_manual_weak_v1_lv1',
    'zensho_paraphrase_quiz_weak_v1_lv1',
    'zensho_paraphrase_quiz_manual_weak_v1_lv1',
    'zensho_reorder_auto_weak_v1_lv1',
    'zensho_reorder_manual_weak_v1_lv1',
    'zensho_reorder_bonus_stat_v1_lv1'
  ],
  'Reading and listening question history': [
    'q7SetHistory_v1',
    'q7VocabHistory_v1',
    'q10ReadingCompletionState_v1',
    'q10WeakExpressions_v1',
    'q10QuestionHistory_v1',
    'dialogueCompletionState_v1',
    'dialogueQuestionHistory_v1'
  ],
  'GOIMON raising, achievements and learning log': [
    'zensho_goimon_current_v4_lv1',
    'zensho_goimon_archive_v4_lv2',
    'zensho_goimon_dex_discovery_v2_lv1',
    'zensho_goimon_hall_count_v2_lv2',
    'zensho_goimon_mr_uno_unlocked_v1_lv1',
    'zensho_goimon_learning_achievements_v1_lv1',
    'goimon_dialogue_history_v2',
    'zensho_learning_log_v1_lv1'
  ]
};

const deviceOnly = [
  'zensho_level_v1',
  'zensho_study_state_lv1_v1',
  'zensho_study_cursor_v2_lv1',
  'zensho_quiz_settings_enja_v1_lv1',
  'zensho_quiz_order_cursor_v1_enja_lv1',
  'zensho_audio_quiz_settings_v1_lv1',
  'zensho_idiom_quiz_settings_v5_lv1',
  'zensho_reorder_settings_v1_lv1',
  'q7Sessions_v1',
  'q7VocabSettings_v1',
  'goimon_cloud_session_v1'
];

test('Every documented learning/raising key is eligible for cloud sync', () => {
  for (const [area, keys] of Object.entries(learningKeys)) {
    for (const key of keys) assert.equal(schema.allowed(key), true, area + ': ' + key);
  }
});
test('UI settings, session credentials and short-lived state never go to cloud', () => {
  for (const key of deviceOnly) assert.equal(schema.allowed(key), false, key);
});
test('Both exam levels are covered wherever keys are level-specific', () => {
  for (const keys of Object.values(learningKeys)) {
    for (const key of keys) {
      if (!/_lv[12](?:_|$)/.test(key)) continue;
      const other = key.replace(/_lv([12])(?=_|$)/, (_, lv) => '_lv' + (lv === '1' ? '2' : '1'));
      assert.equal(schema.allowed(other), true, other);
    }
  }
});
test('No accidental broad cloud keys: secrets and unrecognized progress remain blocked', () => {
  for (const key of ['token', 'access_token', 'google_client_secret',
    'goimon_cloud_v2:active', 'zensho_unknown_progress_v1_lv1',
    'q7Settings_v1', 'dailyMissionProgress_v1']) {
    assert.equal(schema.allowed(key), false, key);
  }
});
test('Changes to the source storage key declarations require updating this audit', () => {
  const expected = [
    ['goimon.js', 'zensho_goimon_current_v4'],
    ['learning_log.js', 'zensho_learning_log_v1'],
    ['quiz.js', 'zensho_quiz_weak_points_enja_v2'],
    ['quiz_jaen.js', 'zensho_quiz_weak_points_jaen_v3'],
    ['accent.js', 'zensho_accent_weak_v1'],
    ['audio_quiz.js', 'zensho_audio_quiz_weak_v1'],
    ['sentence.js', 'zensho_sentence_fixed_weak_v2'],
    ['idiom_quiz.js', 'zensho_idiom_quiz_weak_meaning_v1'],
    ['paraphrase_quiz.js', 'zensho_paraphrase_quiz_weak_v1'],
    ['reorder.js', 'zensho_reorder_auto_weak_v1'],
    ['q7_page.js', 'q7SetHistory_v1'],
    ['q7_vocab.js', 'q7VocabHistory_v1'],
    ['q10_page.js', 'q10QuestionHistory_v1'],
    ['dialogue_page.js', 'dialogueQuestionHistory_v1'],
    ['listening.js', 'zensho_listening_attempts_v1'],
    ['global_stats.js', 'zensho_block_global_']
  ];
  for (const [file, fragment] of expected) {
    assert.ok(source(file).includes(fragment), file + ' no longer defines ' + fragment);
  }
});
