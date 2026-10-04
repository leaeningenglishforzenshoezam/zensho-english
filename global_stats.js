// global_stats.js
// ゴイモン v1.1 横断Block進捗 共通モジュール
//
// 保存キーは従来と同じ：
// zensho_block_global_lv1_v1
// zensho_block_global_lv2_v1
//
// 既存記録を壊さず、足りない項目だけ補完する。

(() => {
  "use strict";

  const LEVEL_KEY = "zensho_level_v1";

  function getLevel() {
    return localStorage.getItem(LEVEL_KEY) || "1";
  }

  function globalKey(lv) {
    return `zensho_block_global_lv${lv}_v1`;
  }

  function empty() {
    return {
      byBlock: {}
    };
  }

  function load(lv = getLevel()) {
    const raw = localStorage.getItem(globalKey(lv));

    if (!raw) {
      return empty();
    }

    try {
      const obj = JSON.parse(raw);

      if (!obj || typeof obj !== "object") {
        return empty();
      }

      if (!obj.byBlock || typeof obj.byBlock !== "object") {
        obj.byBlock = {};
      }

      return obj;
    } catch {
      return empty();
    }
  }

  function save(obj, lv = getLevel()) {
    localStorage.setItem(
      globalKey(lv),
      JSON.stringify(obj)
    );
  }

  function ensureRec(g, blockId) {
    const id = String(blockId);

    if (
      !g.byBlock[id] ||
      typeof g.byBlock[id] !== "object"
    ) {
      g.byBlock[id] = {};
    }

    const r = g.byBlock[id];

    // 既存データを維持しながら、
    // 足りない項目だけ初期値を入れる

    if (typeof r.studyDone !== "number") {
      r.studyDone = 0;
    }

    if (typeof r.quizAttempted !== "number") {
      r.quizAttempted = 0;
    }

    if (typeof r.quizCorrect !== "number") {
      r.quizCorrect = 0;
    }

    if (typeof r.quizAttemptedJaEn !== "number") {
      r.quizAttemptedJaEn = 0;
    }

    if (typeof r.quizCorrectJaEn !== "number") {
      r.quizCorrectJaEn = 0;
    }

    if (typeof r.accentAttempted !== "number") {
      r.accentAttempted = 0;
    }

    if (typeof r.accentCorrect !== "number") {
      r.accentCorrect = 0;
    }

    if (typeof r.sentenceAttempted !== "number") {
      r.sentenceAttempted = 0;
    }

    if (typeof r.sentenceCorrect !== "number") {
      r.sentenceCorrect = 0;
    }

    if (typeof r.audioAttempted !== "number") {
      r.audioAttempted = 0;
    }

    if (typeof r.audioCorrect !== "number") {
      r.audioCorrect = 0;
    }

    return r;
  }

  // =========================================================
  // 暗記
  // =========================================================

  function addStudy(blockId, delta = 1) {
    if (!blockId) return;

    const g = load();
    const r = ensureRec(g, blockId);

    r.studyDone =
      (r.studyDone || 0) +
      (Number(delta) || 0);

    if (r.studyDone < 0) {
      r.studyDone = 0;
    }

    save(g);
  }

  // =========================================================
  // 英→日
  // =========================================================

  function addQuizEnJa(blockId, isCorrect) {
    if (!blockId) return;

    const g = load();
    const r = ensureRec(g, blockId);

    r.quizAttempted =
      (r.quizAttempted || 0) + 1;

    if (isCorrect) {
      r.quizCorrect =
        (r.quizCorrect || 0) + 1;
    }

    save(g);
  }

  // =========================================================
  // 日→英
  // =========================================================

  function addQuizJaEn(blockId, isCorrect) {
    if (!blockId) return;

    const g = load();
    const r = ensureRec(g, blockId);

    r.quizAttemptedJaEn =
      (r.quizAttemptedJaEn || 0) + 1;

    if (isCorrect) {
      r.quizCorrectJaEn =
        (r.quizCorrectJaEn || 0) + 1;
    }

    save(g);
  }

  // =========================================================
  // アクセント
  // =========================================================

  function addAccent(blockId, isCorrect) {
    if (!blockId) return;

    const g = load();
    const r = ensureRec(g, blockId);

    r.accentAttempted =
      (r.accentAttempted || 0) + 1;

    if (isCorrect) {
      r.accentCorrect =
        (r.accentCorrect || 0) + 1;
    }

    save(g);
  }

  // =========================================================
  // 大問9
  // =========================================================

  function addSentence(blockId, isCorrect) {
    if (!blockId) return;

    const g = load();
    const r = ensureRec(g, blockId);

    r.sentenceAttempted =
      (r.sentenceAttempted || 0) + 1;

    if (isCorrect) {
      r.sentenceCorrect =
        (r.sentenceCorrect || 0) + 1;
    }

    save(g);
  }

  // =========================================================
  // 音声→意味
  // =========================================================

  function addAudio(blockId, isCorrect) {
    if (!blockId) return;

    const g = load();
    const r = ensureRec(g, blockId);

    r.audioAttempted =
      (r.audioAttempted || 0) + 1;

    if (isCorrect) {
      r.audioCorrect =
        (r.audioCorrect || 0) + 1;
    }

    save(g);
  }

  // =========================================================
  // 公開API
  // =========================================================

  window.GlobalStats = {
    getLevel,
    load,

    addStudy,
    addQuizEnJa,
    addQuizJaEn,
    addAccent,
    addSentence,
    addAudio
  };
})();
