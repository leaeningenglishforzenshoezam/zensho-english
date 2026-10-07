// 大問別の正誤だけを保存する。既存の共通ログ・練習回数には加算しない。
(function () {
  'use strict';
  const key = level => `zensho_listening_progress_v1_lv${level}`;
  function read(level) {
    try { const x = JSON.parse(localStorage.getItem(key(level)) || '{}'); return x && typeof x === 'object' && !Array.isArray(x) ? x : {}; }
    catch (_) { return {}; }
  }
  const count = n => Number.isFinite(Number(n)) ? Math.max(0, Math.floor(Number(n))) : 0;
  function record(level, format, correct) {
    if (String(level) !== '1' || ![2,3,5].includes(Number(format)) || typeof correct !== 'boolean') return;
    try {
      const data = read(level), old = data[format] || {};
      data[format] = { correct: count(old.correct) + Number(correct), wrong: count(old.wrong) + Number(!correct), lastAt: Date.now() };
      localStorage.setItem(key(level), JSON.stringify(data));
    } catch (error) { console.warn('大問別の正誤記録を保存できませんでした。', error); }
  }
  window.ListeningProgress = { read, record };
})();
