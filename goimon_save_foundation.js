/* GOIMON cloud-save foundation (audit/backup only). No network or automatic overwrite. */
(function (root) {
  'use strict';
  const VERSION = 1;
  const exact = new Set([
    'zensho_level_v1', 'q7SetHistory_v1', 'q7Sessions_v1', 'q7VocabHistory_v1',
    'q10ReadingCompletionState_v1', 'q10WeakExpressions_v1', 'q10QuestionHistory_v1',
    'dialogueCompletionState_v1', 'dialogueQuestionHistory_v1'
  ]);
  const cloudPatterns = [
    /^zensho_goimon_(current|archive|dex_discovery|hall_count|mr_uno_unlocked)_v\d+(?:_lv[12])?$/,
    /^zensho_learning_log_v\d+_lv[12]$/,
    /^zensho_block_global_lv[12]_v\d+$/,
    /^zensho_block_stats_(enja|jaen)_v\d+_lv[12]$/,
    /^zensho_(quiz|accent|audio_quiz|sentence|listening|idiom|paraphrase|reorder)_[\w]+(?:_lv[12])$/,
    /^zensho_listening_(attempts|method_attempts|progress|weak)_v\d+_lv[12]$/
  ];
  const devicePatterns = [
    /^zensho_level_v1$/,
    /(?:_ui_|_settings_|_cursor_|_order_cursor_|_state_)/,
    /^(?:goimon_learning_request|zensho_goimon_home_ui|zensho_goimon_last_event)/
  ];
  const transientPatterns = [/^q7Sessions_v1$/, /^zensho_study_state_/, /_last_event_/];
  function classify(key) {
    if (root.GOIMONCloudSchema?.allowed(key)) return 'cloud-candidate';
    if (transientPatterns.some(r => r.test(key))) return 'transient';
    if (devicePatterns.some(r => r.test(key))) return 'device';
    if (exact.has(key) || cloudPatterns.some(r => r.test(key))) return 'cloud-candidate';
    return 'unknown';
  }
  function audit(storage = root.GOIMONStorage || root.localStorage) {
    const result = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (typeof key !== 'string') continue;
      const value = storage.getItem(key);
      result.push({key, category: classify(key), characters: value == null ? 0 : value.length});
    }
    return result.sort((a,b) => a.key.localeCompare(b.key));
  }
  function snapshot(storage = root.GOIMONStorage || root.localStorage) {
    const data = {};
    for (const rec of audit(storage)) {
      if (rec.category === 'cloud-candidate' || rec.category === 'device' || rec.category === 'transient') {
        data[rec.key] = storage.getItem(rec.key); // keep raw values, including non-JSON
      }
    }
    return {format:'goimon-local-backup', schemaVersion:VERSION, exportedAt:new Date().toISOString(), entries:data};
  }
  function validate(snapshotObject) {
    if (!snapshotObject || snapshotObject.format !== 'goimon-local-backup' ||
        snapshotObject.schemaVersion !== VERSION || !snapshotObject.entries ||
        typeof snapshotObject.entries !== 'object' || Array.isArray(snapshotObject.entries)) {
      throw new Error('GOIMON backup format is invalid');
    }
    const keys = Object.keys(snapshotObject.entries);
    if (keys.length > 1000) throw new Error('Unexpectedly many entries');
    for (const key of keys) {
      if (classify(key) === 'unknown' || typeof snapshotObject.entries[key] !== 'string') {
        throw new Error('Unexpected key or value in backup: '+ key);
      }
    }
    return {entries:keys.length, keys};
  }
  function downloadBackup() {
    const data = snapshot();
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'goimon-backup-'+new Date().toISOString().slice(0,10)+'.json';
    document.body.appendChild(a);
    a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return data;
  }
  root.GOIMONSaveFoundation = Object.freeze({audit, classify, snapshot, validate, downloadBackup});
})(typeof window !== 'undefined' ? window : globalThis);
