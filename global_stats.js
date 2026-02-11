// global_stats.js：横断ブロック進捗（暗記/英→日/日→英）を保存する共通モジュール
(() => {
  const LEVEL_KEY = "zensho_level_v1";

  function getLevel() {
    return localStorage.getItem(LEVEL_KEY) || "1";
  }

  function globalKey(lv) {
    return `zensho_block_global_lv${lv}_v1`;
  }

  function empty() {
    return { byBlock: {} };
  }

  function load(lv = getLevel()) {
    const raw = localStorage.getItem(globalKey(lv));
    if (!raw) return empty();
    try {
      const obj = JSON.parse(raw);
      if (!obj || typeof obj !== "object") return empty();
      if (!obj.byBlock || typeof obj.byBlock !== "object") obj.byBlock = {};
      return obj;
    } catch {
      return empty();
    }
  }

  function save(obj, lv = getLevel()) {
    localStorage.setItem(globalKey(lv), JSON.stringify(obj));
  }

  function ensureRec(g, blockId) {
    const id = String(blockId);
    if (!g.byBlock[id] || typeof g.byBlock[id] !== "object") {
      g.byBlock[id] = {
        studyDone: 0,
        quizAttempted: 0,       // 英→日
        quizCorrect: 0,         // 英→日
        quizAttemptedJaEn: 0,   // 日→英
        quizCorrectJaEn: 0      // 日→英
      };
    }
    return g.byBlock[id];
  }

  // 暗記：ブロック学習回数（1回進めたら+1 など）
  function addStudy(blockId, delta = 1) {
    if (!blockId) return;
    const g = load();
    const r = ensureRec(g, blockId);
    r.studyDone = (r.studyDone || 0) + (Number(delta) || 0);
    if (r.studyDone < 0) r.studyDone = 0;
    save(g);
  }

  // 英→日クイズ：1問解いたら attempted+1、正解なら correct+1
  function addQuizEnJa(blockId, isCorrect) {
    if (!blockId) return;
    const g = load();
    const r = ensureRec(g, blockId);
    r.quizAttempted = (r.quizAttempted || 0) + 1;
    if (isCorrect) r.quizCorrect = (r.quizCorrect || 0) + 1;
    save(g);
  }

  // 日→英クイズ：1問解いたら attemptedJaEn+1、正解なら correctJaEn+1
  function addQuizJaEn(blockId, isCorrect) {
    if (!blockId) return;
    const g = load();
    const r = ensureRec(g, blockId);
    r.quizAttemptedJaEn = (r.quizAttemptedJaEn || 0) + 1;
    if (isCorrect) r.quizCorrectJaEn = (r.quizCorrectJaEn || 0) + 1;
    save(g);
  }

  // 外から呼べるように
  window.GlobalStats = {
    getLevel,
    load,
    addStudy,
    addQuizEnJa,
    addQuizJaEn
  };
})();
