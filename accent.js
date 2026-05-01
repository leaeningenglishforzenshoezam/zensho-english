// accent.js（丸ごと置き換え）
// ★既存の大問1演習は維持
// ★原則一覧 / 原則確認クイズを追加
// ★学習ログ（ホーム用）は既存の演習のみ 1問ごとに加算
// ★ゴイモン：既存のアクセント演習正解で おんかん +1
// ★原則クイズは学習ログ・ゴイモン加算なし
// ★ゴイモン表示は折りたたみ式＋共通進化演出
// ★同じ問題が連続で出ないよう、1セッション内では出題順を先に作って1問ずつ出す
// ★ACCENT データに同一問題が重複していても buildPool 時点で除外する
// ★「続きから」は保存した位置から確実に再開するよう修正
// ★Block横断記録に accentAttempted / accentCorrect を保存
// ★問題番号表示
// ★キーボード操作（1〜4 / Enter / Space / V）
// ★結果画面で手動苦手の追加・解除

document.addEventListener("DOMContentLoaded", () => {
  function addLearningLog(isCorrect) {
    try {
      if (typeof window.zenshoLogAdd === "function") {
        window.zenshoLogAdd("accent", !!isCorrect);
      }
    } catch {}
  }

  const el = (id) => document.getElementById(id);

  const setupBox = el("setupBox");
  const playBox = el("playBox");
  const summaryBox = el("summaryBox");

  const blockSelect = el("blockSelect");
  const applyBlockBtn = el("applyBlock");
  const blockStats = el("blockStats");

  const rangeStartEl = el("rangeStart");
  const rangeEndEl = el("rangeEnd");
  const limitEl = el("limitCount");
  const modeSelect = el("modeSelect");
  const autoSpeakAfterEl = el("autoSpeakAfter");
  const resetCursorBtn = el("resetCursor");

  const startBtn = el("startBtn");
  const setupInfo = el("setupInfo");

    const openAccentWeakListBtn = el("openAccentWeakListBtn");
  const accentWeakListBox = el("accentWeakListBox");
  const accentWeakBackBtn = el("accentWeakBackBtn");
  const accentWeakEmpty = el("accentWeakEmpty");
  const accentWeakTable = el("accentWeakTable");
  const accentWeakTbody = el("accentWeakTbody");
    const toggleAccentWeakJaMaskBtn = el("toggleAccentWeakJaMaskBtn");
  const toggleAccentWeakAccentMaskBtn = el("toggleAccentWeakAccentMaskBtn");

  const questionProgressEl = el("questionProgress");
  const statsEl = el("stats");
  const qMetaEl = el("qMeta");
  const wordEl = el("word");
  const syllablesEl = el("syllables");
  const choicesEl = el("choices");
  const resultEl = el("result");
  const detailEl = el("detail");

  const speakBtn = el("speakBtn");
  const nextBtn = el("nextBtn");
  const backBtn = el("backBtn");

  const summaryLine = el("summaryLine");
  const retrySameBtn = el("retrySameBtn");
  const retryBtn = el("retryBtn");
  const summaryBackBtn = el("summaryBackBtn");
  const wrongEmpty = el("wrongEmpty");
  const wrongList = el("wrongList");

  const levelBadge = el("levelBadge");
  const errorArea = el("errorArea");

  const toggleGoimonBtn = el("toggleGoimon");
  const goimonCard = el("goimonCard");
  const evolutionNoticeBtn = el("evolutionNoticeBtn");

  const accentLearnBox = el("accentLearnBox");
  const openAccentRulesBtn = el("openAccentRulesBtn");
  const openAccentRulesQuizBtn = el("openAccentRulesQuizBtn");
  const closeAccentRulesBtn = el("closeAccentRulesBtn");
  const accentLearnPanel = el("accentLearnPanel");
  const accentRulesView = el("accentRulesView");
  const accentRuleList = el("accentRuleList");
  const accentQuizView = el("accentQuizView");
  const accentQuizMeta = el("accentQuizMeta");
  const accentQuizStem = el("accentQuizStem");
  const accentQuizChoices = el("accentQuizChoices");
  const accentQuizResult = el("accentQuizResult");
  const accentQuizExplanation = el("accentQuizExplanation");
  const accentQuizNextBtn = el("accentQuizNextBtn");
  const backToAccentRulesBtn = el("backToAccentRulesBtn");

  function showError(msg) {
    if (!errorArea) return;
    const d = document.createElement("div");
    d.className = "errorBox";
    d.textContent = msg;
    errorArea.innerHTML = "";
    errorArea.appendChild(d);
  }

  function must(x, name) {
    if (!x) throw new Error(`accent.html に #${name} が見つかりません`);
  }

  try {
    [
      [setupBox, "setupBox"], [playBox, "playBox"], [summaryBox, "summaryBox"],
      [blockSelect, "blockSelect"], [applyBlockBtn, "applyBlock"], [blockStats, "blockStats"],
      [rangeStartEl, "rangeStart"], [rangeEndEl, "rangeEnd"], [limitEl, "limitCount"],
      [modeSelect, "modeSelect"], [autoSpeakAfterEl, "autoSpeakAfter"], [resetCursorBtn, "resetCursor"],
      [startBtn, "startBtn"], [setupInfo, "setupInfo"],
            [openAccentWeakListBtn, "openAccentWeakListBtn"],
      [accentWeakListBox, "accentWeakListBox"],
      [accentWeakBackBtn, "accentWeakBackBtn"],
            [toggleAccentWeakJaMaskBtn, "toggleAccentWeakJaMaskBtn"],
      [toggleAccentWeakAccentMaskBtn, "toggleAccentWeakAccentMaskBtn"],
      [accentWeakEmpty, "accentWeakEmpty"],
      [accentWeakTable, "accentWeakTable"],
      [accentWeakTbody, "accentWeakTbody"],
      [questionProgressEl, "questionProgress"], [statsEl, "stats"], [qMetaEl, "qMeta"], [wordEl, "word"], [syllablesEl, "syllables"],
      [choicesEl, "choices"], [resultEl, "result"], [detailEl, "detail"],
      [speakBtn, "speakBtn"], [nextBtn, "nextBtn"], [backBtn, "backBtn"],
      [summaryLine, "summaryLine"], [retrySameBtn, "retrySameBtn"], [retryBtn, "retryBtn"], [summaryBackBtn, "summaryBackBtn"],
      [wrongEmpty, "wrongEmpty"], [wrongList, "wrongList"],
      [levelBadge, "levelBadge"], [errorArea, "errorArea"],
      [toggleGoimonBtn, "toggleGoimon"], [goimonCard, "goimonCard"], [evolutionNoticeBtn, "evolutionNoticeBtn"],
      [accentLearnBox, "accentLearnBox"], [openAccentRulesQuizBtn, "openAccentRulesQuizBtn"], [openAccentRulesBtn, "openAccentRulesBtn"], [closeAccentRulesBtn, "closeAccentRulesBtn"],
      [accentLearnPanel, "accentLearnPanel"], [accentRulesView, "accentRulesView"], [accentRuleList, "accentRuleList"],
      [accentQuizView, "accentQuizView"], [accentQuizMeta, "accentQuizMeta"], [accentQuizStem, "accentQuizStem"],
      [accentQuizChoices, "accentQuizChoices"], [accentQuizResult, "accentQuizResult"],
      [accentQuizExplanation, "accentQuizExplanation"], [accentQuizNextBtn, "accentQuizNextBtn"],
      [backToAccentRulesBtn, "backToAccentRulesBtn"]
    ].forEach(([x, n]) => must(x, n));
  } catch (e) {
    showError(String(e?.message || e));
    return;
  }

  const LEVEL_KEY = "zensho_level_v1";
  const LV = localStorage.getItem(LEVEL_KEY) || "1";
  const GOIMON_UI_KEY = `zensho_accent_goimon_ui_v1_lv${LV}`;
  const GLOBAL_BLOCK_KEY = `zensho_block_global_lv${LV}_v1`;
  const WEAK_KEY = `zensho_accent_weak_v1_lv${LV}`;
  const MANUAL_WEAK_KEY = `zensho_accent_manual_weak_v1_lv${LV}`;
  const CURSOR_KEY = `zensho_accent_cursor_v1_lv${LV}`;
    const ACCENT_WEAK_LIST_UI_KEY = `zensho_accent_weak_list_ui_v1_lv${LV}`;

  levelBadge.textContent = `現在：全商英検 ${LV}級（アクセント演習）`;

  const blocks = window.BLOCKS || [];
  const ACCENT = (LV === "2") ? (window.ACCENT_2KYU || []) : (window.ACCENT_1KYU || []);
  const ACCENT_RULES = Array.isArray(window.ACCENT_RULES) ? window.ACCENT_RULES : [];

  if (!Array.isArray(blocks) || blocks.length === 0) {
    showError("BLOCKS が読み込めていません。blocks_1kyu.js / blocks_2kyu.js の読み込み順や定義を確認してください。");
  }
  if (!Array.isArray(ACCENT) || ACCENT.length === 0) {
    showError("アクセントデータが読み込めていません。accent_1kyu.js / accent_2kyu.js の window.ACCENT_* を確認してください。");
  }

  function addAccentGoimonProgress() {
    try {
      if (!window.GoimonUI || typeof window.GoimonUI.addAccentCorrect !== "function") return;
      window.GoimonUI.addAccentCorrect();
      if (typeof window.renderAccentGoimonMini === "function") {
        window.renderAccentGoimonMini();
      }
      renderEvolutionNotice();
    } catch (e) {
      console.warn("addAccentGoimonProgress failed:", e);
    }
  }

  const norm = (s) => String(s || "").trim();

  function clamp(n, min, max) {
    n = Number(n);
    if (!Number.isFinite(n)) n = min;
    return Math.max(min, Math.min(max, Math.floor(n)));
  }

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

    function showSetup() {
    accentLearnBox.style.display = "block";
    setupBox.style.display = "block";
    accentWeakListBox.style.display = "none";
    playBox.style.display = "none";
    summaryBox.style.display = "none";
    if (window.QuizUICommon && typeof window.QuizUICommon.clearText === "function") {
      window.QuizUICommon.clearText(questionProgressEl);
    } else if (questionProgressEl) {
      questionProgressEl.textContent = "";
    }
  }

    function showPlay() {
    accentLearnBox.style.display = "none";
    setupBox.style.display = "none";
    accentWeakListBox.style.display = "none";
    playBox.style.display = "block";
    summaryBox.style.display = "none";
  }

    function showSummary() {
    accentLearnBox.style.display = "none";
    setupBox.style.display = "none";
    accentWeakListBox.style.display = "none";
    playBox.style.display = "none";
    summaryBox.style.display = "block";
    if (window.QuizUICommon && typeof window.QuizUICommon.clearText === "function") {
      window.QuizUICommon.clearText(questionProgressEl);
    } else if (questionProgressEl) {
      questionProgressEl.textContent = "";
    }
  }

  function speakEnglish(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text || ""));
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function cleanSyllableString(raw) {
    return String(raw || "").replace(/[ˈ']/g, "");
  }

  function splitSyllables(cleanOrRaw) {
    const s = cleanSyllableString(cleanOrRaw);
    return s.split("-").map(x => x.trim()).filter(Boolean);
  }

  function makeStressedUpper(raw, stressPos) {
    const parts = splitSyllables(raw);
    const pos = Number(stressPos);
    if (!Number.isFinite(pos) || pos < 1 || pos > parts.length) return parts.join("-");
    return parts.map((p, i) => (i === pos - 1 ? p.toUpperCase() : p)).join("-");
  }

  function syllableCountFromRaw(raw) {
    return splitSyllables(raw).length;
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeAttr(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function getBlockByNo(no) {
    const n = Number(no);
    return blocks.find(b => n >= Number(b.start) && n <= Number(b.end)) || null;
  }

  function getBlockById(id) {
    return blocks.find(b => Number(b.id) === Number(id)) || null;
  }

  function renderBlockSelect() {
    blockSelect.innerHTML = "";

    const optAll = document.createElement("option");
    optAll.value = "all";
    optAll.textContent = "全範囲";
    blockSelect.appendChild(optAll);

    for (const b of blocks) {
      const opt = document.createElement("option");
      opt.value = String(b.id);
      opt.textContent = `Block ${b.id}（${b.start}〜${b.end}）`;
      blockSelect.appendChild(opt);
    }

    blockSelect.value = "all";
  }

  function applySelectedBlockToRange() {
    const v = blockSelect.value;
    if (v === "all") {
      const maxNo = Math.max(...ACCENT.map(x => Number(x.no) || 0), 0) || 500;
      rangeStartEl.value = "1";
      rangeEndEl.value = String(maxNo);
      return;
    }

    const b = getBlockById(v);
    if (!b) return;
    rangeStartEl.value = String(b.start);
    rangeEndEl.value = String(b.end);
  }

  function renderBlockStatsLine() {
    const v = blockSelect.value;
    blockStats.textContent = (v === "all") ? "Block：全範囲" : `Block：${v}`;
  }

  function loadGlobal() {
    const raw = localStorage.getItem(GLOBAL_BLOCK_KEY);
    if (!raw) return { byBlock: {} };
    try {
      const obj = JSON.parse(raw);
      if (obj && typeof obj === "object" && obj.byBlock && typeof obj.byBlock === "object") {
        return obj;
      }
    } catch {}
    return { byBlock: {} };
  }

  function saveGlobal(g) {
    localStorage.setItem(GLOBAL_BLOCK_KEY, JSON.stringify(g));
  }

  function addGlobalAccent(blockId, isCorrect) {
    if (!blockId) return;

    const g = loadGlobal();
    if (!g.byBlock) g.byBlock = {};

    const k = String(blockId);
    if (!g.byBlock[k]) {
      g.byBlock[k] = {
        studyDone: 0,
        quizAttempted: 0,
        quizCorrect: 0,
        quizAttemptedJaEn: 0,
        quizCorrectJaEn: 0,
        accentAttempted: 0,
        accentCorrect: 0,
        sentenceAttempted: 0,
        sentenceCorrect: 0,
        audioAttempted: 0,
        audioCorrect: 0
      };
    }

    if (!Number.isFinite(g.byBlock[k].accentAttempted)) g.byBlock[k].accentAttempted = 0;
    if (!Number.isFinite(g.byBlock[k].accentCorrect)) g.byBlock[k].accentCorrect = 0;

    g.byBlock[k].accentAttempted += 1;
    if (isCorrect) g.byBlock[k].accentCorrect += 1;

    saveGlobal(g);
  }

  function loadWeak() {
    const raw = localStorage.getItem(WEAK_KEY);
    if (!raw) return {};
    try {
      const o = JSON.parse(raw);
      return (o && typeof o === "object") ? o : {};
    } catch {
      return {};
    }
  }

  function saveWeak(obj) {
    localStorage.setItem(WEAK_KEY, JSON.stringify(obj));
  }

  function getWeakPoint(map, no) {
    const v = map[String(no)];
    return (typeof v === "number") ? v : 0;
  }

  function addWeakPoint(map, no, delta) {
    const k = String(no);
    const cur = getWeakPoint(map, no);
    const next = cur + delta;
    if (next <= 0) delete map[k];
    else map[k] = next;
  }

  function loadManualWeak() {
    const raw = localStorage.getItem(MANUAL_WEAK_KEY);
    if (!raw) return {};
    try {
      const o = JSON.parse(raw);
      return (o && typeof o === "object") ? o : {};
    } catch {
      return {};
    }
  }

  function saveManualWeak(obj) {
    localStorage.setItem(MANUAL_WEAK_KEY, JSON.stringify(obj));
  }

  function isManualWeak(manualMap, no) {
    return !!manualMap[String(no)];
  }

  function setManualWeak(manualMap, no, enabled) {
    const k = String(no);
    if (enabled) manualMap[k] = true;
    else delete manualMap[k];
  }

  function getCombinedWeakCount() {
    const autoMap = loadWeak();
    const manualMap = loadManualWeak();
    const merged = new Set([
      ...Object.keys(autoMap),
      ...Object.keys(manualMap)
    ]);
    return merged.size;
  }

  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

      function loadAccentWeakListUi() {
    const saved = safeParse(ACCENT_WEAK_LIST_UI_KEY);

    return {
      jaMasked: !!saved?.jaMasked,
      accentMasked: !!saved?.accentMasked,
      revealedJa: (saved?.revealedJa && typeof saved.revealedJa === "object") ? saved.revealedJa : {},
      revealedAccent: (saved?.revealedAccent && typeof saved.revealedAccent === "object") ? saved.revealedAccent : {}
    };
  }

  let accentWeakListUi = loadAccentWeakListUi();

  function saveAccentWeakListUi() {
    localStorage.setItem(ACCENT_WEAK_LIST_UI_KEY, JSON.stringify(accentWeakListUi));
  }

  function updateAccentWeakMaskButtons() {
    toggleAccentWeakJaMaskBtn.textContent = accentWeakListUi.jaMasked
      ? "日本語を一括表示"
      : "日本語を一括で隠す";

    toggleAccentWeakAccentMaskBtn.textContent = accentWeakListUi.accentMasked
      ? "アクセント位置を一括表示"
      : "アクセント位置を一括で隠す";
  }

  function isAccentWeakJaHiddenForNo(no) {
    const k = String(no);
    return accentWeakListUi.jaMasked && !accentWeakListUi.revealedJa[k];
  }

  function isAccentWeakAccentHiddenForNo(no) {
    const k = String(no);
    return accentWeakListUi.accentMasked && !accentWeakListUi.revealedAccent[k];
  }

  function revealAccentWeakJaForNo(no) {
    const k = String(no);
    accentWeakListUi.revealedJa[k] = true;
    saveAccentWeakListUi();
  }

  function revealAccentWeakAccentForNo(no) {
    const k = String(no);
    accentWeakListUi.revealedAccent[k] = true;
    saveAccentWeakListUi();
  }

  function cursorKeyOfRange(startNo, endNo) {
    const s = clamp(startNo, 1, 99999);
    const e = clamp(endNo, 1, 99999);
    const lo = Math.min(s, e);
    const hi = Math.max(s, e);
    return `${lo}-${hi}`;
  }

  function loadCursor(startNo, endNo) {
    const obj = safeParse(CURSOR_KEY) || {};
    const k = cursorKeyOfRange(startNo, endNo);
    const v = obj[k];
    return Number.isFinite(v) ? v : 0;
  }

  function saveCursor(startNo, endNo, cursor) {
    const obj = safeParse(CURSOR_KEY) || {};
    const k = cursorKeyOfRange(startNo, endNo);
    obj[k] = Math.max(0, Number(cursor) || 0);
    localStorage.setItem(CURSOR_KEY, JSON.stringify(obj));
  }

  function buildPool(startNo, endNo) {
    const s = clamp(startNo, 1, 99999);
    const e = clamp(endNo, 1, 99999);
    const lo = Math.min(s, e);
    const hi = Math.max(s, e);

    const pool = [];
    const seen = new Set();

    for (const item of ACCENT) {
      const no = Number(item.no);
      if (!Number.isFinite(no)) continue;
      if (no < lo || no > hi) continue;

      const sylRaw = item.sylRaw || item.syllables || item.syl || "";
      if (syllableCountFromRaw(sylRaw) <= 1) continue;

      const blockFromNo = getBlockByNo(no);
      const derivedBlockId = Number(
        item.blockId ||
        item.block ||
        (String(item.blockLabel || "").replace(/[^0-9]/g, "")) ||
        (blockFromNo ? blockFromNo.id : 0) ||
        0
      ) || 0;

      const row = {
        blockId: derivedBlockId,
        no,
        en: norm(item.en),
        ja: norm(item.ja),
        sylRaw: String(sylRaw),
        stress: Number(item.stress || item.stressPos || item.position || 0) || 0,
        note: norm(item.note || "")
      };

      const dupKey = [
        row.no,
        row.en.toLowerCase(),
        cleanSyllableString(row.sylRaw).toLowerCase(),
        row.stress
      ].join("||");

      if (seen.has(dupKey)) continue;
      seen.add(dupKey);

      pool.push(row);
    }

    pool.sort((a, b) => a.no - b.no);
    return pool;
  }

  function updateSetupInfo() {
    const pool = buildPool(rangeStartEl.value, rangeEndEl.value);
    const wc = getCombinedWeakCount();
    const savedCursor = loadCursor(rangeStartEl.value, rangeEndEl.value);
    setupInfo.textContent = `この条件で出題可能：${pool.length}問（1音節語は除外）｜保存済み苦手：${wc}問｜続き位置：${savedCursor + 1}問目から`;
  }

  let session = {
    active: false,
    pool: [],
    order: [],
    cursor: 0,
    limit: 10,
    answered: 0,
    correct: 0,
    mode: "head",
    startNo: 1,
    endNo: 500,
    askedSet: []
  };

  let current = null;
  let answeredThis = false;
  let askedLog = [];
  let wrongLog = [];

  function modeLabel(m) {
    if (m === "head") return "先頭から";
    if (m === "continue") return "続きから";
    if (m === "random") return "ランダム";
    if (m === "retry") return "同じ問題に再挑戦";
    return "苦手";
  }

  function renderFixedChoices() {
    choicesEl.innerHTML = "";
    const labels = [
      { n: 1, label: "第1音節" },
      { n: 2, label: "第2音節" },
      { n: 3, label: "第3音節" },
      { n: 4, label: "第4音節" }
    ];

    for (const c of labels) {
      const btn = document.createElement("button");
      btn.textContent = c.label;
      btn.addEventListener("click", () => handleChoice(c.n, btn));
      choicesEl.appendChild(btn);
    }
  }

  function renderQuestionProgress() {
    if (!window.QuizUICommon || typeof window.QuizUICommon.renderQuestionProgress !== "function") {
      if (questionProgressEl) {
        const currentNo = Math.min(session.answered + 1, session.limit);
        questionProgressEl.textContent = (session.limit > 0 && session.active)
          ? `第${currentNo}問 / ${session.limit}問`
          : "";
      }
      return;
    }

    if (!session.active || session.limit <= 0) {
      window.QuizUICommon.clearText(questionProgressEl);
      return;
    }

    const currentNo = Math.min(session.answered + 1, session.limit);
    window.QuizUICommon.renderQuestionProgress(questionProgressEl, currentNo, session.limit);
  }

  function renderStats() {
    statsEl.textContent = `今回：${session.answered}/${session.limit}（正解 ${session.correct}）`;
  }

  function renderMeta() {
    if (!current) {
      qMetaEl.textContent = "";
      return;
    }

    const b = getBlockByNo(current.no);
    const blockText = b ? `Block ${b.id}（${b.start}〜${b.end}）` : (current.blockId ? `Block ${current.blockId}` : "Block ?");
    qMetaEl.textContent = `${blockText}｜番号 ${current.no}｜モード：${modeLabel(session.mode)}｜${LV}級`;
  }

  function resetUIForNewQuestion() {
    answeredThis = false;
    nextBtn.disabled = true;
    resultEl.textContent = "";
    detailEl.textContent = "";
    renderFixedChoices();
  }

  function buildWeakOrder(pool) {
    const weakMap = loadWeak();
    const manualMap = loadManualWeak();
    const arr = [];

    for (let i = 0; i < pool.length; i++) {
      const autoPoint = getWeakPoint(weakMap, pool[i].no);
      const manual = isManualWeak(manualMap, pool[i].no);

      if (manual || autoPoint > 0) {
        arr.push({
          i,
          manual: manual ? 1 : 0,
          autoPoint,
          no: pool[i].no
        });
      }
    }

    arr.sort((a, b) =>
      (b.manual - a.manual) ||
      (b.autoPoint - a.autoPoint) ||
      (a.no - b.no)
    );

    return arr.map(x => x.i);
  }

  function persistContinueCursor() {
    if (session.mode !== "continue") return;
    saveCursor(session.startNo, session.endNo, session.cursor);
  }

  function pickNextQuestion() {
    if (session.order.length === 0) return null;
    if (session.cursor >= session.order.length) return null;

    const idx = session.order[session.cursor];
    if (!Number.isFinite(idx)) return null;

    session.cursor++;
    persistContinueCursor();

    return session.pool[idx];
  }

  function renderEvolutionNotice() {
    try {
      if (window.GoimonUI && typeof window.GoimonUI.renderEvolutionNoticeButton === "function") {
        window.GoimonUI.renderEvolutionNoticeButton("evolutionNoticeBtn");
        return;
      }

      if (!window.GoimonUI || typeof window.GoimonUI.loadCurrent !== "function") return;
      const g = window.GoimonUI.loadCurrent();
      if (!g) return;

      if (g.pendingEvolution) evolutionNoticeBtn.classList.remove("hidden");
      else evolutionNoticeBtn.classList.add("hidden");
    } catch {}
  }

  function renderQuestion() {
    if (!session.active) return;

    if (session.pool.length === 0) {
      showError("この条件では出題できる問題がありません。範囲かデータを確認してください。");
      session.active = false;
      showSetup();
      return;
    }

    if (session.answered >= session.limit) {
      finishSession(false);
      return;
    }

    current = pickNextQuestion();
    if (!current) {
      finishSession(session.mode === "weak");
      return;
    }

    if (session.askedSet.length < session.limit) {
      session.askedSet.push({ ...current });
    }

    resetUIForNewQuestion();

    wordEl.textContent = current.en;
    syllablesEl.textContent = `音節区切り：${cleanSyllableString(current.sylRaw)}`;

    renderQuestionProgress();
    renderMeta();
    renderStats();
    renderEvolutionNotice();
  }

  function handleChoice(chosenPos, clickedBtn) {
    if (answeredThis) return;
    answeredThis = true;

    session.answered++;

    let correctPos = Number(current.stress);
    if (!Number.isFinite(correctPos) || correctPos < 1) correctPos = 1;
    if (correctPos > 4) correctPos = 4;

    const isCorrect = (Number(chosenPos) === correctPos);

    addLearningLog(isCorrect);

    const btns = [...choicesEl.querySelectorAll("button")];
    for (const b of btns) {
      const t = b.textContent || "";
      const m = t.match(/第(\d)音節/);
      const n = m ? Number(m[1]) : 0;
      if (n === correctPos) b.classList.add("correct");
    }
    if (!isCorrect && clickedBtn) clickedBtn.classList.add("wrong");

    const weakMap = loadWeak();

    if (isCorrect) {
      session.correct++;
      resultEl.innerHTML = `<span class="ok">⭕️ 正解！</span>`;

      addAccentGoimonProgress();
      addWeakPoint(weakMap, current.no, -1);
    } else {
      resultEl.innerHTML = `<span class="ng">❌ 不正解。</span> 正解は「第${correctPos}音節」`;
      addWeakPoint(weakMap, current.no, +1);
    }

    saveWeak(weakMap);
    updateSetupInfo();

    if (current.blockId) {
      addGlobalAccent(current.blockId, isCorrect);
    }

    const stressed = makeStressedUpper(current.sylRaw, correctPos);
    const meaning = current.ja || "（なし）";
    const note = current.note ? `<div style="margin-top:10px; font-size:16px; line-height:1.7;">解説：${escapeHtml(current.note)}</div>` : "";

    detailEl.innerHTML = `
      <div style="
        margin-top:10px; padding:12px;
        border:1px solid #e6e6e6; border-radius:12px;
        background:#fafafa;
      ">
        <div style="font-size:18px; font-weight:800; margin-bottom:6px;">意味：${escapeHtml(meaning)}</div>
        <div style="font-size:22px; font-weight:900; letter-spacing:0.4px;">
          強勢表示：<span style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;">${escapeHtml(stressed)}</span>
        </div>
        ${note}
      </div>
    `;

    if (autoSpeakAfterEl.checked) speakEnglish(current.en);

    askedLog.push({
      no: current.no,
      en: current.en,
      ja: current.ja,
      correct: correctPos,
      chosen: chosenPos,
      sylRaw: current.sylRaw,
      note: current.note,
      blockId: current.blockId,
      isCorrect
    });

    if (!isCorrect) wrongLog.push(askedLog[askedLog.length - 1]);

    renderStats();
    renderEvolutionNotice();
    nextBtn.disabled = false;
  }

  function getAccentWeakState(no) {
    const weakMap = loadWeak();
    const manualMap = loadManualWeak();

    const autoPoint = getWeakPoint(weakMap, no);
    const manual = isManualWeak(manualMap, no);

    return {
      autoPoint,
      manual
    };
  }

  function renderAccentWeakBadges(no) {
    const state = getAccentWeakState(no);
    const chips = [];

    if (state.manual) {
      chips.push(`
        <span style="
          display:inline-block;
          padding:6px 10px;
          border-radius:999px;
          background:#fff4d6;
          color:#8a5a00;
          border:1px solid #f0d28a;
          font-size:12px;
          font-weight:700;
        ">
          手動で苦手
        </span>
      `);
    }

    if (state.autoPoint > 0) {
      chips.push(`
        <span style="
          display:inline-block;
          padding:6px 10px;
          border-radius:999px;
          background:#eef5ff;
          color:#1f58b1;
          border:1px solid #cfe0ff;
          font-size:12px;
          font-weight:700;
        ">
          自動苦手 ${state.autoPoint}
        </span>
      `);
    }

    if (!chips.length) {
      chips.push(`
        <span style="
          display:inline-block;
          padding:6px 10px;
          border-radius:999px;
          background:#f5f5f5;
          color:#666;
          border:1px solid #ddd;
          font-size:12px;
          font-weight:700;
        ">
          通常
        </span>
      `);
    }

    return chips.join("");
  }

    function buildAccentWeakSyllableHtml(sylRaw, stressPos) {
    const parts = splitSyllables(sylRaw);
    const pos = Number(stressPos);

    if (!parts.length) {
      return escapeHtml(cleanSyllableString(sylRaw));
    }

    return parts.map((part, index) => {
      const isHit = index === pos - 1;
      return `
        <span class="accentWeakSyllablePart ${isHit ? "accentWeakStressPart" : ""}">
          ${escapeHtml(part)}
        </span>
      `;
    }).join(`<span class="muted">-</span>`);
  }

  function getAccentWeakListItems() {
    const weakMap = loadWeak();
    const manualMap = loadManualWeak();

    const weakNos = new Set();

    Object.keys(weakMap).forEach(no => {
      if (getWeakPoint(weakMap, no) > 0) weakNos.add(String(no));
    });

    Object.keys(manualMap).forEach(no => {
      if (manualMap[no]) weakNos.add(String(no));
    });

    if (weakNos.size === 0) return [];

    const maxNo = Math.max(...(ACCENT || []).map(x => Number(x.no) || 0), 0) || 500;
    const allPool = buildPool(1, maxNo);

    return allPool
      .filter(item => weakNos.has(String(item.no)))
      .map(item => {
        const autoPoint = getWeakPoint(weakMap, item.no);
        const manual = isManualWeak(manualMap, item.no);

        return {
          ...item,
          autoPoint,
          manual
        };
      })
      .sort((a, b) =>
        (b.manual ? 1 : 0) - (a.manual ? 1 : 0) ||
        b.autoPoint - a.autoPoint ||
        a.no - b.no
      );
  }

  function clearAccentWeak(no) {
    const key = String(no);

    const weakMap = loadWeak();
    if (weakMap[key] != null) {
      delete weakMap[key];
      saveWeak(weakMap);
    }

    const manualMap = loadManualWeak();
    if (manualMap[key] != null) {
      delete manualMap[key];
      saveManualWeak(manualMap);
    }
  }

    function renderAccentWeakList() {
    updateAccentWeakMaskButtons();

    const items = getAccentWeakListItems();

    accentWeakTbody.innerHTML = "";

    if (!items.length) {
      accentWeakEmpty.style.display = "block";
      accentWeakTable.style.display = "none";
      return;
    }

    accentWeakEmpty.style.display = "none";
    accentWeakTable.style.display = "table";

    items.forEach(item => {
      const tr = document.createElement("tr");
      tr.className = "accentWeakRow";
      tr.dataset.en = item.en;

      const b = getBlockByNo(item.no);
      const blockText = b ? `Block ${b.id}` : (item.blockId ? `Block ${item.blockId}` : "Block ?");
      const stressPos = Number(item.stress) || 1;

      const badges = [];

      if (item.manual) {
        badges.push(`<span class="accentWeakBadge manual">手動苦手</span>`);
      }

      if (item.autoPoint > 0) {
        badges.push(`<span class="accentWeakBadge auto">自動苦手 ${item.autoPoint}</span>`);
      }

      const jaHidden = isAccentWeakJaHiddenForNo(item.no);
      const accentHidden = isAccentWeakAccentHiddenForNo(item.no);

      const jaHtml = jaHidden
        ? `
          <span
            class="accentWeakMaskedValue"
            data-action="reveal-accent-weak-ja"
            data-no="${escapeAttr(String(item.no))}"
          >
            日本語を非表示（タップで表示）
          </span>
        `
        : escapeHtml(item.ja || "（なし）");

      const accentHtml = accentHidden
        ? `
          <div class="accentWeakSyllableDisplay">
            ${escapeHtml(cleanSyllableString(item.sylRaw))}
          </div>
          <div
            class="accentWeakMaskedAccentBox"
            data-action="reveal-accent-weak-accent"
            data-no="${escapeAttr(String(item.no))}"
          >
            アクセント位置を非表示（タップで表示）
          </div>
        `
        : `
          <div class="accentWeakSyllableDisplay">
            ${buildAccentWeakSyllableHtml(item.sylRaw, stressPos)}
          </div>

          <div style="margin-top:8px;">
            <span class="accentWeakStressMain">第${escapeHtml(String(stressPos))}音節</span>
          </div>
        `;

      tr.innerHTML = `
        <td>
          <div class="accentWeakWord">${escapeHtml(item.en)}</div>
          <div class="accentWeakNo">${escapeHtml(blockText)} / 番号 ${escapeHtml(String(item.no))}</div>
          <div class="accentWeakReadHint">この行を押すと発音</div>
        </td>

        <td>
          ${jaHtml}
        </td>

        <td>
          ${accentHtml}

          <div class="accentWeakBadgeRow">
            ${badges.join("")}
          </div>

          <button
            type="button"
            class="accentWeakRemoveBtn"
            data-action="clear-accent-weak"
            data-no="${escapeAttr(String(item.no))}"
          >
            苦手から外す
          </button>
        </td>
      `;

      accentWeakTbody.appendChild(tr);
    });
  }

  function showAccentWeakList() {
    accentLearnBox.style.display = "none";
    setupBox.style.display = "none";
    accentWeakListBox.style.display = "block";
    playBox.style.display = "none";
    summaryBox.style.display = "none";

    if (window.QuizUICommon && typeof window.QuizUICommon.clearText === "function") {
      window.QuizUICommon.clearText(questionProgressEl);
    } else if (questionProgressEl) {
      questionProgressEl.textContent = "";
    }

    renderAccentWeakList();
  }

  function renderAccentSummaryList() {
    if (!askedLog.length) {
      wrongEmpty.style.display = "block";
      wrongList.innerHTML = "";
      return;
    }

    wrongEmpty.style.display = "none";

    const cards = askedLog.map((w, idx) => {
      const b = getBlockByNo(w.no);
      const btxt = b ? `Block ${b.id}` : (w.blockId ? `Block ${w.blockId}` : "Block ?");
      const stressed = makeStressedUpper(w.sylRaw, w.correct);
      const noteHtml = w.note
        ? `<div style="margin-top:8px; font-size:14px; line-height:1.7;">解説：${escapeHtml(w.note)}</div>`
        : "";

      const weakState = getAccentWeakState(w.no);
      const toggleLabel = weakState.manual ? "苦手から外す" : "苦手に追加";

      return `
        <div style="
          border-top:${idx === 0 ? "0" : "1px solid #eee"};
          padding:${idx === 0 ? "0 0 14px 0" : "14px 0"};
        ">
          <div style="display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-bottom:8px;">
            <div style="font-weight:800; font-size:16px;">
              ${escapeHtml(w.en)}
            </div>
            <div class="muted" style="font-size:13px;">
              ${escapeHtml(btxt)} / 番号 ${escapeHtml(String(w.no))}
            </div>
          </div>

          <div style="font-size:15px; line-height:1.7; margin-bottom:8px;">
            意味：${escapeHtml(w.ja || "（なし）")}
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
            <span style="
              display:inline-block;
              padding:6px 10px;
              border-radius:999px;
              background:${w.isCorrect ? "#eefaf1" : "#ffecec"};
              color:${w.isCorrect ? "#0a7a2f" : "#b00020"};
              border:1px solid ${w.isCorrect ? "#bfe7ca" : "#f3b5bf"};
              font-size:13px;
              font-weight:700;
            ">
              ${w.isCorrect ? "正解" : "不正解"}
            </span>

            <span style="
              display:inline-block;
              padding:6px 10px;
              border-radius:999px;
              background:#f5f5f5;
              color:#555;
              border:1px solid #ddd;
              font-size:13px;
              font-weight:700;
            ">
              あなた：第${escapeHtml(String(w.chosen))}音節
            </span>

            <span style="
              display:inline-block;
              padding:6px 10px;
              border-radius:999px;
              background:#eefaf1;
              color:#0a7a2f;
              border:1px solid #bfe7ca;
              font-size:13px;
              font-weight:700;
            ">
              正解：第${escapeHtml(String(w.correct))}音節
            </span>
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:10px;">
            ${renderAccentWeakBadges(w.no)}
          </div>

          <div style="
            padding:10px 12px;
            border:1px solid #eee;
            border-radius:12px;
            background:#fafafa;
            font-size:18px;
            font-weight:800;
            letter-spacing:0.4px;
            line-height:1.7;
            margin-bottom:8px;
          ">
            ${escapeHtml(stressed)}
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
            <button
              type="button"
              data-action="toggle-manual-weak"
              data-no="${escapeAttr(String(w.no))}"
            >
              ${toggleLabel}
            </button>
          </div>

          ${noteHtml}
        </div>
      `;
    });

    wrongList.innerHTML = cards.join("");
  }

  function finishSession(autoClearedWeak) {
    showSummary();
    const tail = (session.mode === "weak" && autoClearedWeak) ? "（この回の苦手出題が終わりました）" : "";
    summaryLine.textContent = `結果：${session.correct} / ${session.answered}（${modeLabel(session.mode)}｜範囲 ${session.startNo}〜${session.endNo}｜${LV}級）${tail}`;

    renderAccentSummaryList();
  }

  function startRetrySameSetSession() {
    const askedSet = Array.isArray(session.askedSet) ? session.askedSet.map(x => ({ ...x })) : [];

    if (!askedSet.length) {
      alert("解き直せる問題セットがありません。");
      return;
    }

    session.active = true;
    session.pool = askedSet;
    session.order = [];
    for (let i = 0; i < askedSet.length; i++) session.order.push(i);
    session.cursor = 0;
    session.limit = askedSet.length;
    session.answered = 0;
    session.correct = 0;
    session.mode = "retry";
    session.askedSet = [];

    askedLog = [];
    wrongLog = [];

    showPlay();
    renderQuestion();
  }

  function loadGoimonUiState() {
    return safeParse(GOIMON_UI_KEY) || { open: false };
  }

  let goimonUi = loadGoimonUiState();

  function saveGoimonUiState() {
    localStorage.setItem(GOIMON_UI_KEY, JSON.stringify(goimonUi));
  }

  function renderGoimonVisibility() {
    if (goimonUi.open) {
      goimonCard.classList.remove("hidden");
      toggleGoimonBtn.textContent = "ゴイモンを閉じる";
    } else {
      goimonCard.classList.add("hidden");
      toggleGoimonBtn.textContent = "ゴイモンの様子を見る";
    }
  }

  function openSharedEvolution() {
    try {
      if (window.GoimonUI && typeof window.GoimonUI.openEvolutionOverlay === "function") {
        window.GoimonUI.openEvolutionOverlay({
          onComplete: () => {
            if (typeof window.renderAccentGoimonMini === "function") {
              window.renderAccentGoimonMini();
            }
            renderEvolutionNotice();
          }
        });
        return;
      }

      if (window.GoimonUI && typeof window.GoimonUI.confirmEvolution === "function") {
        window.GoimonUI.confirmEvolution();
        if (typeof window.renderAccentGoimonMini === "function") {
          window.renderAccentGoimonMini();
        }
        renderEvolutionNotice();
      }
    } catch (e) {
      console.warn("openSharedEvolution failed:", e);
    }
  }

  const accentLearnState = {
    panelOpen: false,
    activeRuleId: "",
    quizOrder: [],
    quizCursor: 0,
    quizAnswered: false,
    quizMode: "rule",
    allQuizEntries: []
  };

  function findAccentRuleById(ruleId) {
    return ACCENT_RULES.find(rule => String(rule.id) === String(ruleId)) || null;
  }

  function getCurrentAccentRule() {
    return findAccentRuleById(accentLearnState.activeRuleId);
  }

  function getCurrentAccentQuizContext() {
    if (accentLearnState.quizMode === "all") {
      const entry = accentLearnState.allQuizEntries[accentLearnState.quizCursor];
      if (!entry) return null;

      const rule = findAccentRuleById(entry.ruleId);
      if (!rule || !Array.isArray(rule.quizItems)) return null;

      const quizItem = rule.quizItems[entry.quizIndex] || null;
      if (!quizItem) return null;

      return { rule, quizItem };
    }

    const rule = getCurrentAccentRule();
    if (!rule || !Array.isArray(rule.quizItems) || !rule.quizItems.length) return null;

    const idx = accentLearnState.quizOrder[accentLearnState.quizCursor];
    if (!Number.isFinite(idx)) return null;

    const quizItem = rule.quizItems[idx] || null;
    if (!quizItem) return null;

    return { rule, quizItem };
  }

  function getCurrentAccentQuizItem() {
    const ctx = getCurrentAccentQuizContext();
    return ctx ? ctx.quizItem : null;
  }

  function renderWordChips(items) {
    if (!Array.isArray(items) || items.length === 0) return "";

    const chips = items.map(item => {
      const label = item?.label ? `${escapeHtml(item.label)}: ` : "";
      const en = escapeHtml(item?.en || "");
      const ja = item?.ja ? `（${escapeHtml(item.ja)}）` : "";
      const sylRaw = escapeHtml(item?.sylRaw || "");

      return `
        <span class="accentWordChip">
          ${label}${en}${ja} <span class="muted">/ ${sylRaw}</span>
        </span>
      `;
    }).join("");

    return `<div class="accentWordChips">${chips}</div>`;
  }

  function buildAccentRuleExplanationHtml(rule, quizItem) {
    if (!rule) return "";

    const titleHtml = rule.title
      ? `<div style="font-weight:800; font-size:15px; margin-bottom:8px;">原則：${escapeHtml(rule.title)}</div>`
      : "";

    const desc = rule.description
      ? `<div style="margin-bottom:8px; line-height:1.7;">${escapeHtml(rule.description)}</div>`
      : "";

    const quizHint = (quizItem && quizItem.explanation)
      ? `<div style="margin-bottom:8px; line-height:1.7;">${escapeHtml(quizItem.explanation)}</div>`
      : "";

    const examplesHtml = Array.isArray(rule.examples) && rule.examples.length
      ? `
        <div style="margin-top:8px;">
          <div style="font-weight:700; margin-bottom:6px;">例語</div>
          ${renderWordChips(rule.examples)}
        </div>
      `
      : "";

    const exceptionsHtml = Array.isArray(rule.exceptions) && rule.exceptions.length
      ? `
        <div style="margin-top:10px;">
          <div style="font-weight:700; margin-bottom:6px;">例外</div>
          ${renderWordChips(rule.exceptions)}
        </div>
      `
      : "";

    return `${titleHtml}${desc}${quizHint}${examplesHtml}${exceptionsHtml}`;
  }

  function renderAccentRulesList() {
    if (!ACCENT_RULES.length) {
      accentRuleList.innerHTML = `<div class="muted">accent_rules.js の原則データがまだありません。</div>`;
      return;
    }

    const html = ACCENT_RULES.map(rule => {
      const examplesHtml = renderWordChips(rule.examples || []);
      const exceptionsHtml = Array.isArray(rule.exceptions) && rule.exceptions.length > 0
        ? `
          <div class="accentRuleBlockTitle">例外</div>
          ${renderWordChips(rule.exceptions)}
        `
        : "";

      return `
        <div class="accentRuleCard">
          <div class="accentRuleTitle">${escapeHtml(rule.title)}</div>

          <div class="accentRuleBlockTitle">例語</div>
          ${examplesHtml || `<div class="muted">例語なし</div>`}

          ${exceptionsHtml}

          <div class="accentRuleActions">
            <button
              type="button"
              class="accentLearnBtn"
              data-action="start-rule-quiz"
              data-rule-id="${escapeAttr(rule.id)}"
            >
              この原則をクイズで確認する
            </button>
          </div>
        </div>
      `;
    }).join("");

    accentRuleList.innerHTML = html;
  }

  function renderAccentLearnVisibility() {
    if (accentLearnState.panelOpen) {
      accentLearnPanel.classList.remove("hidden");
      openAccentRulesBtn.classList.add("hidden");
      closeAccentRulesBtn.classList.remove("hidden");
    } else {
      accentLearnPanel.classList.add("hidden");
      openAccentRulesBtn.classList.remove("hidden");
      closeAccentRulesBtn.classList.add("hidden");
    }
  }

  function showAccentRulesView() {
    accentRulesView.classList.remove("hidden");
    accentQuizView.classList.add("hidden");

    accentQuizResult.textContent = "";
    accentQuizResult.className = "accentQuizResult";
    accentQuizExplanation.innerHTML = "";
    accentQuizNextBtn.disabled = true;
    accentQuizNextBtn.textContent = "次の問題へ";
  }

  function showAccentQuizView() {
    accentRulesView.classList.add("hidden");
    accentQuizView.classList.remove("hidden");
  }

  function openAccentLearnPanel() {
    accentLearnState.panelOpen = true;
    renderAccentLearnVisibility();
    showAccentRulesView();
  }

  function closeAccentLearnPanel() {
    accentLearnState.panelOpen = false;
    accentLearnState.activeRuleId = "";
    accentLearnState.quizOrder = [];
    accentLearnState.quizCursor = 0;
    accentLearnState.quizAnswered = false;
    renderAccentLearnVisibility();
    showAccentRulesView();
  }

  function setAccentQuizButtonStyle(btn, kind) {
    if (!btn) return;

    if (kind === "correct") {
      btn.style.background = "#0a7a2f";
      btn.style.borderColor = "#0a7a2f";
      btn.style.color = "#fff";
      return;
    }

    if (kind === "wrong") {
      btn.style.background = "#b00020";
      btn.style.borderColor = "#b00020";
      btn.style.color = "#fff";
      return;
    }

    btn.style.background = "";
    btn.style.borderColor = "";
    btn.style.color = "";
  }

  function renderCurrentAccentRuleQuiz() {
    const ctx = getCurrentAccentQuizContext();
    if (!ctx) {
      showAccentRulesView();
      return;
    }

    const { quizItem } = ctx;
    accentLearnState.quizAnswered = false;

    const totalCount = accentLearnState.quizMode === "all"
      ? accentLearnState.allQuizEntries.length
      : accentLearnState.quizOrder.length;

    const metaPrefix = accentLearnState.quizMode === "all"
      ? "原則横断クイズ"
      : "原則確認クイズ";

    accentQuizMeta.textContent = `${metaPrefix}｜${accentLearnState.quizCursor + 1} / ${totalCount}`;
    accentQuizStem.textContent = quizItem.stem || "";
    accentQuizResult.textContent = "";
    accentQuizResult.className = "accentQuizResult";
    accentQuizExplanation.innerHTML = "";

    accentQuizNextBtn.disabled = true;
    accentQuizNextBtn.textContent =
      (accentLearnState.quizCursor + 1 >= totalCount)
        ? "一覧へ戻る"
        : "次の問題へ";

    accentQuizChoices.innerHTML = "";

    const choices = Array.isArray(quizItem.choices) ? quizItem.choices : [];
    choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = String(choice);
      btn.dataset.choice = String(choice);
      btn.addEventListener("click", () => handleAccentRuleQuizChoice(String(choice), btn));
      accentQuizChoices.appendChild(btn);
    });

    showAccentQuizView();
  }

  function handleAccentRuleQuizChoice(chosen, clickedBtn) {
    if (accentLearnState.quizAnswered) return;

    const ctx = getCurrentAccentQuizContext();
    if (!ctx) return;

    const { rule, quizItem } = ctx;
    accentLearnState.quizAnswered = true;

    const answer = String(quizItem.answer || "");
    const isCorrect = (String(chosen) === answer);

    const btns = [...accentQuizChoices.querySelectorAll("button")];
    btns.forEach(btn => {
      btn.disabled = true;

      if (String(btn.dataset.choice) === answer) {
        setAccentQuizButtonStyle(btn, "correct");
      } else if (!isCorrect && btn === clickedBtn) {
        setAccentQuizButtonStyle(btn, "wrong");
      } else {
        setAccentQuizButtonStyle(btn, "");
      }
    });

    if (isCorrect) {
      accentQuizResult.textContent = "⭕️ 正解！";
      accentQuizResult.className = "accentQuizResult ok";
    } else {
      accentQuizResult.textContent = `❌ 不正解。正解は「${answer}」`;
      accentQuizResult.className = "accentQuizResult ng";
    }

    accentQuizExplanation.innerHTML = buildAccentRuleExplanationHtml(rule, quizItem);
    accentQuizNextBtn.disabled = false;
  }

  function startAccentRuleQuiz(ruleId) {
    const rule = findAccentRuleById(ruleId);
    if (!rule) return;

    if (!Array.isArray(rule.quizItems) || rule.quizItems.length === 0) {
      alert("この原則には、まだクイズがありません。");
      return;
    }

    accentLearnState.activeRuleId = rule.id;
    accentLearnState.quizMode = "rule";
    accentLearnState.allQuizEntries = [];
    accentLearnState.quizOrder = shuffleArray(rule.quizItems.map((_, idx) => idx));
    accentLearnState.quizCursor = 0;
    accentLearnState.quizAnswered = false;

    renderCurrentAccentRuleQuiz();
  }

  function startAccentAllRulesQuiz() {
    const entries = [];

    ACCENT_RULES.forEach(rule => {
      if (!Array.isArray(rule.quizItems)) return;
      rule.quizItems.forEach((_, quizIndex) => {
        entries.push({
          ruleId: rule.id,
          quizIndex
        });
      });
    });

    if (!entries.length) {
      alert("原則クイズがまだありません。");
      return;
    }

    accentLearnState.panelOpen = true;
    accentLearnState.activeRuleId = "";
    accentLearnState.quizMode = "all";
    accentLearnState.quizOrder = [];
    accentLearnState.allQuizEntries = shuffleArray(entries);
    accentLearnState.quizCursor = 0;
    accentLearnState.quizAnswered = false;

    renderAccentLearnVisibility();
    renderCurrentAccentRuleQuiz();
  }

  function moveToNextAccentRuleQuiz() {
    if (!accentLearnState.quizAnswered) return;

    const totalCount = accentLearnState.quizMode === "all"
      ? accentLearnState.allQuizEntries.length
      : accentLearnState.quizOrder.length;

    if (accentLearnState.quizCursor + 1 >= totalCount) {
      showAccentRulesView();
      return;
    }

    accentLearnState.quizCursor += 1;
    renderCurrentAccentRuleQuiz();
  }

  blockSelect.addEventListener("change", () => {
    renderBlockStatsLine();
  });

  applyBlockBtn.addEventListener("click", () => {
    applySelectedBlockToRange();
    updateSetupInfo();
  });

  rangeStartEl.addEventListener("input", updateSetupInfo);
  rangeEndEl.addEventListener("input", updateSetupInfo);
  limitEl.addEventListener("input", updateSetupInfo);

  resetCursorBtn.addEventListener("click", () => {
    const startNo = clamp(rangeStartEl.value, 1, 99999);
    const endNo = clamp(rangeEndEl.value, 1, 99999);
    saveCursor(startNo, endNo, 0);
    alert("「続きから」の開始位置をリセットしました。");
    updateSetupInfo();
  });

  startBtn.addEventListener("click", () => {
    const startNo = clamp(rangeStartEl.value, 1, 99999);
    const endNo = clamp(rangeEndEl.value, 1, 99999);
    let limit = clamp(limitEl.value, 1, 99999);

    const pool = buildPool(startNo, endNo);
    if (pool.length === 0) {
      showError("この条件では出題できる問題がありません。範囲やアクセントデータの no を確認してください。");
      return;
    }

    const mode = modeSelect.value;
    session.mode = (mode === "continue" || mode === "random" || mode === "weak") ? mode : "head";

    session.startNo = startNo;
    session.endNo = endNo;
    session.pool = pool;

    if (session.mode === "weak") {
      session.order = buildWeakOrder(pool);
      if (session.order.length === 0) {
        showError("苦手モードですが、保存済み苦手がありません（この範囲内）。まず通常で間違えて苦手を作ってください。");
        return;
      }
      session.order = shuffleArray(session.order);
      session.cursor = 0;
    } else {
      session.order = [];
      for (let i = 0; i < pool.length; i++) session.order.push(i);

      if (session.mode === "random") {
        session.order = shuffleArray(session.order);
        session.cursor = 0;
      } else if (session.mode === "continue") {
        const saved = loadCursor(startNo, endNo);
        session.cursor = clamp(saved, 0, Math.max(0, session.order.length - 1));
        if (saved >= session.order.length) {
          session.cursor = 0;
          saveCursor(startNo, endNo, 0);
        }
      } else {
        session.cursor = 0;
      }
    }

    limit = Math.min(limit, session.order.length);
    session.limit = limit;
    session.answered = 0;
    session.correct = 0;
    session.active = true;
    session.askedSet = [];

    askedLog = [];
    wrongLog = [];

    errorArea.innerHTML = "";
    showPlay();
    renderQuestion();
  });

    toggleAccentWeakJaMaskBtn.addEventListener("click", () => {
    accentWeakListUi.jaMasked = !accentWeakListUi.jaMasked;

    // 一括切り替え時は、単語ごとの個別表示状態をリセット
    accentWeakListUi.revealedJa = {};

    saveAccentWeakListUi();
    renderAccentWeakList();
  });

  toggleAccentWeakAccentMaskBtn.addEventListener("click", () => {
    accentWeakListUi.accentMasked = !accentWeakListUi.accentMasked;

    // 一括切り替え時は、単語ごとの個別表示状態をリセット
    accentWeakListUi.revealedAccent = {};

    saveAccentWeakListUi();
    renderAccentWeakList();
  });

    openAccentWeakListBtn.addEventListener("click", () => {
    showAccentWeakList();
  });

  accentWeakBackBtn.addEventListener("click", () => {
    showSetup();
    updateSetupInfo();
  });

    accentWeakTbody.addEventListener("click", (e) => {
    const revealJa = e.target.closest('[data-action="reveal-accent-weak-ja"]');
    if (revealJa) {
      e.stopPropagation();

      const no = Number(revealJa.getAttribute("data-no"));
      if (!Number.isFinite(no)) return;

      revealAccentWeakJaForNo(no);
      renderAccentWeakList();
      return;
    }

    const revealAccent = e.target.closest('[data-action="reveal-accent-weak-accent"]');
    if (revealAccent) {
      e.stopPropagation();

      const no = Number(revealAccent.getAttribute("data-no"));
      if (!Number.isFinite(no)) return;

      revealAccentWeakAccentForNo(no);
      renderAccentWeakList();
      return;
    }

    const clearBtn = e.target.closest('[data-action="clear-accent-weak"]');
    if (clearBtn) {
      e.stopPropagation();

      const no = Number(clearBtn.getAttribute("data-no"));
      if (!Number.isFinite(no)) return;

      const weakMap = loadWeak();
      delete weakMap[String(no)];
      saveWeak(weakMap);

      const manualMap = loadManualWeak();
      setManualWeak(manualMap, no, false);
      saveManualWeak(manualMap);

      delete accentWeakListUi.revealedJa[String(no)];
      delete accentWeakListUi.revealedAccent[String(no)];
      saveAccentWeakListUi();

      updateSetupInfo();
      renderAccentWeakList();
      return;
    }

    const row = e.target.closest("tr[data-en]");
    if (row) {
      const en = row.getAttribute("data-en");
      if (en) speakEnglish(en);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (!answeredThis) return;
    renderQuestion();
  });

  backBtn.addEventListener("click", () => {
    session.active = false;
    showSetup();
    updateSetupInfo();
  });

  speakBtn.addEventListener("click", () => {
    if (!current) return;
    speakEnglish(current.en);
  });

  retrySameBtn.addEventListener("click", () => {
    startRetrySameSetSession();
  });

  retryBtn.addEventListener("click", () => {
    session.answered = 0;
    session.correct = 0;
    session.active = true;

    if (session.mode === "random" || session.mode === "weak") {
      session.cursor = 0;
      session.order = shuffleArray(session.order);
    } else if (session.mode === "head") {
      session.cursor = 0;
    } else if (session.mode === "continue") {
      session.cursor = loadCursor(session.startNo, session.endNo);
      if (!Number.isFinite(session.cursor) || session.cursor < 0 || session.cursor >= session.order.length) {
        session.cursor = 0;
      }
    } else {
      session.cursor = 0;
    }

    session.askedSet = [];
    askedLog = [];
    wrongLog = [];
    showPlay();
    renderQuestion();
  });

  summaryBackBtn.addEventListener("click", () => {
    session.active = false;
    showSetup();
    updateSetupInfo();
  });

  toggleGoimonBtn.addEventListener("click", () => {
    goimonUi.open = !goimonUi.open;
    saveGoimonUiState();
    renderGoimonVisibility();
  });

  evolutionNoticeBtn.addEventListener("click", () => {
    openSharedEvolution();
  });

  openAccentRulesBtn.addEventListener("click", () => {
    openAccentLearnPanel();
  });

  openAccentRulesQuizBtn.addEventListener("click", () => {
    startAccentAllRulesQuiz();
  });

  closeAccentRulesBtn.addEventListener("click", () => {
    closeAccentLearnPanel();
  });

  backToAccentRulesBtn.addEventListener("click", () => {
    showAccentRulesView();
  });

  accentQuizNextBtn.addEventListener("click", () => {
    moveToNextAccentRuleQuiz();
  });

  accentRuleList.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-action="start-rule-quiz"]');
    if (!btn) return;

    const ruleId = btn.getAttribute("data-rule-id");
    if (!ruleId) return;

    startAccentRuleQuiz(ruleId);
  });

  wrongList.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-action="toggle-manual-weak"]');
    if (!btn) return;

    const no = Number(btn.getAttribute("data-no"));
    if (!Number.isFinite(no)) return;

    const manualMap = loadManualWeak();
    const nextState = !isManualWeak(manualMap, no);

    setManualWeak(manualMap, no, nextState);
    saveManualWeak(manualMap);

    updateSetupInfo();
    renderAccentSummaryList();
  });

  function init() {
    const hasWeak = [...modeSelect.options].some(o => o.value === "weak");
    if (!hasWeak) {
      const opt = document.createElement("option");
      opt.value = "weak";
      opt.textContent = "苦手";
      modeSelect.appendChild(opt);
    }

    if (window.GoimonUI && typeof window.GoimonUI.ensureEvolutionUIReady === "function") {
      window.GoimonUI.ensureEvolutionUIReady();
    }

    renderBlockSelect();
    renderBlockStatsLine();

    const maxNo = Math.max(...(ACCENT || []).map(x => Number(x.no) || 0), 0) || 500;
    rangeEndEl.value = String(maxNo);

    updateSetupInfo();
    renderGoimonVisibility();
    renderEvolutionNotice();

    renderAccentRulesList();
    renderAccentLearnVisibility();
    showAccentRulesView();
    showSetup();

    if (typeof window.renderAccentGoimonMini === "function") {
      window.renderAccentGoimonMini();
    }
  }

  init();

  if (window.QuizShortcuts && typeof window.QuizShortcuts.register === "function") {
    window.QuizShortcuts.register({
      isActive: () => session.active && playBox.style.display !== "none",
      canAnswer: () => session.active && playBox.style.display !== "none" && !answeredThis,
      canNext: () => session.active && playBox.style.display !== "none" && answeredThis && !nextBtn.disabled,
      canSpeak: () => session.active && playBox.style.display !== "none" && !!current,
      onAnswer: (index) => {
        const btns = choicesEl.querySelectorAll("button");
        const btn = btns[index - 1];
        if (btn) btn.click();
      },
      onNext: () => {
        if (!nextBtn.disabled) nextBtn.click();
      },
      onSpeak: () => {
        if (current) speakBtn.click();
      }
    });
  }
});
