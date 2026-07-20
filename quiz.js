// quiz.js（英→日）ゴイモン版 完全版
// Block＋3モード＋順番続き＋級ごと保存＋横断ブロック記録＋URLパラメータ（範囲/弱点/自動開始）
// ★正解=緑/不正解=赤、正解ピンポン/不正解ブッブー、1問1回だけ押せる（連打防止）
// ★学習ログ（ホームのログ表示用）に 1問ごとに加算（attempt/correct/wrong）
// ★ゴイモン：英→日正解で ちえ +1
// ★ゴイモン表示は折りたたみ式＋進化演出共通化
// ★選択肢を同じ品詞中心で作成
// ★選択肢に①〜④を表示
// ★解答後に全選択肢の「日本語＝英語」を表示

document.addEventListener("DOMContentLoaded", () => {
  const words = window.WORDS || [];
const blocks = window.BLOCKS || [];
const PASS_LINE = 80;

const LEVEL_KEY = "zensho_level_v1";
function getLevel() {
  return localStorage.getItem(LEVEL_KEY) || "1";
}
const LV = getLevel();

const sentenceFixedData =
  (LV === "2" ? window.SENTENCE_FIXED_2KYU : window.SENTENCE_FIXED_1KYU) || [];

const WEAK_KEY = `zensho_quiz_weak_points_enja_v2_lv${LV}`;
  const MANUAL_WEAK_KEY = `zensho_quiz_manual_weak_enja_v1_lv${LV}`;
  const ORDER_CURSOR_KEY = `zensho_quiz_order_cursor_v1_enja_lv${LV}`;
  const SETTINGS_KEY = `zensho_quiz_settings_enja_v1_lv${LV}`;
  const BLOCK_STATS_KEY = `zensho_block_stats_enja_v1_lv${LV}`;
  const GLOBAL_BLOCK_KEY = `zensho_block_global_lv${LV}_v1`;
  const GOIMON_UI_KEY = `zensho_quiz_goimon_ui_v2_lv${LV}`;

  function addLearningLog(isCorrect) {
    try {
      if (typeof window.zenshoLogAdd === "function") {
        window.zenshoLogAdd("quiz_enja", !!isCorrect);
      }
    } catch {}
  }

  function addQuizGoimonProgress() {
    try {
      if (!window.GoimonUI || typeof window.GoimonUI.addQuizEnJaCorrect !== "function") return;

      window.GoimonUI.addQuizEnJaCorrect();

      if (typeof window.renderQuizGoimonMini === "function") {
        window.renderQuizGoimonMini();
      }

      renderEvolutionNotice();
    } catch (e) {
      console.warn("addQuizGoimonProgress failed:", e);
    }
  }

  const questionProgressEl = document.getElementById("questionProgress");
  const statsEl = document.getElementById("stats");
  const qMetaEl = document.getElementById("qMeta");
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const resultEl = document.getElementById("result");
  const nextBtn = document.getElementById("nextQ");
  const startBtn = document.getElementById("startTest");

  const rangeStartEl = document.getElementById("rangeStart");
  const rangeEndEl = document.getElementById("rangeEnd");
  const limitEl = document.getElementById("limitCount");

  const blockSelectEl = document.getElementById("blockSelect");
  const applyBlockBtn = document.getElementById("applyBlock");
  const blockStatsEl = document.getElementById("blockStats");

  const weakInfoEl = document.getElementById("weakInfo");

  const speakQBtn = document.getElementById("speakQ");
  const autoSpeakQEl = document.getElementById("autoSpeakQ");

  const toggleSettingsBtn = document.getElementById("toggleSettings");
  const settingsArea = document.getElementById("settingsArea");
  const settingsSummaryEl = document.getElementById("settingsSummary");

  const modeSelectEl = document.getElementById("modeSelect");
  const levelBadgeEl = document.getElementById("levelBadge");

  const setupBox = document.getElementById("setupBox");
  const playBox = document.getElementById("playBox");
  const summaryBox = document.getElementById("summaryBox");
  const finalScoreEl = document.getElementById("finalScore");
  const finalBlockLineEl = document.getElementById("finalBlockLine");
  const askedListEl = document.getElementById("askedList");
  const wrongListEl = document.getElementById("wrongList");
  const retrySameSetBtn = document.getElementById("retrySameSet");
  const retrySameConditionBtn = document.getElementById("retrySameCondition");
  const backToSetupBtn = document.getElementById("backToSetup");

  const toggleGoimonBtn = document.getElementById("toggleGoimon");
  const goimonCardEl = document.getElementById("goimonCard");
  const evolutionNoticeBtn = document.getElementById("evolutionNoticeBtn");

  function must(el, name) {
    if (!el) throw new Error(`quiz.html に #${name} が見つかりません`);
  }

  [
    [questionProgressEl, "questionProgress"],
    [statsEl, "stats"],
    [qMetaEl, "qMeta"],
    [questionEl, "question"],
    [choicesEl, "choices"],
    [resultEl, "result"],
    [nextBtn, "nextQ"],
    [startBtn, "startTest"],
    [rangeStartEl, "rangeStart"],
    [rangeEndEl, "rangeEnd"],
    [limitEl, "limitCount"],
    [blockSelectEl, "blockSelect"],
    [applyBlockBtn, "applyBlock"],
    [blockStatsEl, "blockStats"],
    [weakInfoEl, "weakInfo"],
    [speakQBtn, "speakQ"],
    [autoSpeakQEl, "autoSpeakQ"],
    [toggleSettingsBtn, "toggleSettings"],
    [settingsArea, "settingsArea"],
    [settingsSummaryEl, "settingsSummary"],
    [modeSelectEl, "modeSelect"],
    [levelBadgeEl, "levelBadge"],
    [summaryBox, "summaryBox"],
    [playBox, "playBox"],
    [finalScoreEl, "finalScore"],
    [finalBlockLineEl, "finalBlockLine"],
    [askedListEl, "askedList"],
    [wrongListEl, "wrongList"],
    [retrySameSetBtn, "retrySameSet"],
    [retrySameConditionBtn, "retrySameCondition"],
    [backToSetupBtn, "backToSetup"],
    [toggleGoimonBtn, "toggleGoimon"],
    [goimonCardEl, "goimonCard"],
    [evolutionNoticeBtn, "evolutionNoticeBtn"]
  ].forEach(([el, n]) => must(el, n));

  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
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

  function normalizeTextKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function normalizeIdWord(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function findSentenceExamplesForWord(en) {
  const wordKey = normalizeTextKey(en);
  const idKey = normalizeIdWord(en);

  if (!wordKey && !idKey) return [];

  return sentenceFixedData
    .filter(item => {
      if (!item) return false;

      const answerKey = normalizeTextKey(item.answer);
      const id = normalizeTextKey(item.id);

      return answerKey === wordKey || id.startsWith(`f_${idKey}_`);
    })
    .slice(0, 3);
}

function renderSentenceExamplesHtml(en) {
  const examples = findSentenceExamplesForWord(en);

  if (!examples.length) return "";

  const itemsHtml = examples.map(item => {
    const enText = String(item.en || "").trim();
    const jaText = String(item.ja || "").trim();
    const noteText = String(item.note || "").trim();

    return `
      <div class="sentenceExampleItem">
        <div class="sentenceExampleEn">${escapeHtml(enText)}</div>

        ${
          jaText
            ? `
              <div
                class="sentenceExampleJaMasked"
                data-action="reveal-sentence-ja"
                data-sentence-ja="${escapeAttr(jaText)}"
              >
                日本語訳を表示
              </div>
            `
            : ""
        }

        ${
          noteText
            ? `<div class="sentenceExampleNote">メモ：${escapeHtml(noteText)}</div>`
            : ""
        }
      </div>
    `;
  }).join("");

  return `
    <div class="sentenceExampleBox">
      <div class="sentenceExampleTitle">大問9の例文</div>
      ${itemsHtml}
    </div>
  `;
}

  function clampRange(s, e) {
    if (!Number.isFinite(s)) s = 0;
    if (!Number.isFinite(e)) e = words.length - 1;

    s = Math.max(0, Math.min(words.length - 1, Math.floor(s)));
    e = Math.max(0, Math.min(words.length - 1, Math.floor(e)));

    if (s > e) [s, e] = [e, s];

    return [s, e];
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getBlockById(id) {
    return blocks.find(b => Number(b.id) === Number(id)) || null;
  }

  function getBlockByNo(no) {
    const n = Number(no);
    return blocks.find(b => n >= Number(b.start) && n <= Number(b.end)) || null;
  }

  function speakEnglish(text) {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;

    window.speechSynthesis.speak(u);
  }

  let _audioCtx = null;

  function getAudioCtx() {
    if (!_audioCtx) {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return _audioCtx;
  }

  function ensureAudioReady() {
    try {
      const ctx = getAudioCtx();
      if (ctx.state === "suspended") ctx.resume();
    } catch {}
  }

  function playCorrectSound() {
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, now);

      gain1.gain.setValueAtTime(0.0001, now);
      gain1.gain.exponentialRampToValueAtTime(0.25, now + 0.01);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc1.connect(gain1).connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.13);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1175, now + 0.14);

      gain2.gain.setValueAtTime(0.0001, now + 0.14);
      gain2.gain.exponentialRampToValueAtTime(0.25, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

      osc2.connect(gain2).connect(ctx.destination);
      osc2.start(now + 0.14);
      osc2.stop(now + 0.27);
    } catch {}
  }

  function playWrongSound() {
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.25);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.35, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  function loadGlobal() {
    return safeParse(GLOBAL_BLOCK_KEY) || { byBlock: {} };
  }

  function saveGlobal(g) {
    localStorage.setItem(GLOBAL_BLOCK_KEY, JSON.stringify(g));
  }

  function addGlobalEnJa(blockId, isCorrect) {
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

    if (!Number.isFinite(g.byBlock[k].quizAttempted)) g.byBlock[k].quizAttempted = 0;
    if (!Number.isFinite(g.byBlock[k].quizCorrect)) g.byBlock[k].quizCorrect = 0;

    g.byBlock[k].quizAttempted += 1;
    if (isCorrect) g.byBlock[k].quizCorrect += 1;

    saveGlobal(g);
  }

  let weakPoints = {};
  let manualWeakMap = {};

  function normalizeWeakKey(en) {
    return String(en || "").trim().toLowerCase();
  }

  function loadWeakPoints() {
    const raw = localStorage.getItem(WEAK_KEY);
    if (!raw) return;

    try {
      const obj = JSON.parse(raw);
      if (obj && typeof obj === "object") weakPoints = obj;
    } catch {}
  }

  function saveWeakPoints() {
    localStorage.setItem(WEAK_KEY, JSON.stringify(weakPoints));
  }

  function getPoint(en) {
    const p = weakPoints[en];
    return typeof p === "number" ? p : 0;
  }

  function setPoint(en, p) {
    if (p <= 0) delete weakPoints[en];
    else weakPoints[en] = p;
  }

  function loadManualWeakMap() {
    const raw = localStorage.getItem(MANUAL_WEAK_KEY);
    if (!raw) return;

    try {
      const obj = JSON.parse(raw);
      if (obj && typeof obj === "object") manualWeakMap = obj;
    } catch {}
  }

  function saveManualWeakMap() {
    localStorage.setItem(MANUAL_WEAK_KEY, JSON.stringify(manualWeakMap));
  }

  function isManualWeak(en) {
    return !!manualWeakMap[normalizeWeakKey(en)];
  }

  function setManualWeak(en, enabled) {
    const key = normalizeWeakKey(en);
    if (!key) return;

    if (enabled) manualWeakMap[key] = true;
    else delete manualWeakMap[key];
  }

  function weakCount() {
    const merged = new Set();

    Object.keys(weakPoints).forEach(k => merged.add(normalizeWeakKey(k)));
    Object.keys(manualWeakMap).forEach(k => merged.add(normalizeWeakKey(k)));

    return merged.size;
  }

  window.addWeakFromSentenceToEnJa = (en, weight = 1) => {
    try {
      const w = String(en || "").trim().toLowerCase();
      let add = Number(weight);

      if (!w) return;
      if (!Number.isFinite(add) || add <= 0) add = 1;

      setPoint(w, getPoint(w) + add);
      saveWeakPoints();
    } catch (e) {
      console.warn("addWeakFromSentenceToEnJa failed:", e);
    }
  };

  function loadOrderCursor(start, end) {
    const raw = localStorage.getItem(ORDER_CURSOR_KEY);
    if (!raw) return start;

    try {
      const o = JSON.parse(raw);
      if (o && o.start === start && o.end === end && Number.isFinite(o.cursor)) {
        return o.cursor;
      }
    } catch {}

    return start;
  }

  function saveOrderCursor(start, end, cursor) {
    localStorage.setItem(ORDER_CURSOR_KEY, JSON.stringify({ start, end, cursor }));
  }

  let autoSpeakQ = false;
  let quizMode = "order";

  function loadSettings() {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return;

    try {
      const s = JSON.parse(raw);

      autoSpeakQ = !!s.autoSpeakQ;

      if (s.quizMode === "order" || s.quizMode === "random" || s.quizMode === "weak") {
        quizMode = s.quizMode;
      }
    } catch {}
  }

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ autoSpeakQ, quizMode }));
  }

  let statsMap = {};

  function loadBlockStats() {
    const raw = localStorage.getItem(BLOCK_STATS_KEY);
    if (!raw) return;

    try {
      statsMap = JSON.parse(raw) || {};
    } catch {}
  }

  function saveBlockStats() {
    localStorage.setItem(BLOCK_STATS_KEY, JSON.stringify(statsMap));
  }

  function addBlockResult(blockId, isCorrect) {
    const k = String(blockId);

    if (!statsMap[k]) statsMap[k] = { attempted: 0, correct: 0 };

    statsMap[k].attempted += 1;
    if (isCorrect) statsMap[k].correct += 1;

    saveBlockStats();
    addGlobalEnJa(blockId, isCorrect);
  }

  function getBlockAccText(blockId) {
    const k = String(blockId);
    const s = statsMap[k];

    if (!s || s.attempted === 0) return "未受験";

    const pct = Math.round((s.correct / s.attempted) * 100);
    const tag = pct >= PASS_LINE ? "✅ 合格" : "🟡 挑戦中";

    return `${tag}（${pct}%｜${s.correct}/${s.attempted}）`;
  }

  let session = {
    active: false,
    answered: 0,
    correct: 0,
    limit: 50,
    start: 0,
    end: Math.max(0, words.length - 1),
    retryOrder: null
  };

  let current = null;
  let answeredThisQuestion = false;
  let weakMode = false;

  let askedSet = new Set();
  let askedLog = [];
  let wrongMap = {};

  let orderCursor = 0;
  let settingsOpen = false;

  function loadGoimonUiState() {
    return safeParse(GOIMON_UI_KEY) || { open: false };
  }

  let goimonUi = loadGoimonUiState();

  function saveGoimonUiState() {
    localStorage.setItem(GOIMON_UI_KEY, JSON.stringify(goimonUi));
  }

  function renderGoimonVisibility() {
    if (goimonUi.open) {
      goimonCardEl.classList.remove("hidden");
      toggleGoimonBtn.textContent = "ゴイモンを閉じる";
    } else {
      goimonCardEl.classList.add("hidden");
      toggleGoimonBtn.textContent = "ゴイモンの様子を見る";
    }
  }

  function renderEvolutionNotice() {
    try {
      if (window.GoimonUI && typeof window.GoimonUI.renderEvolutionNoticeButton === "function") {
        window.GoimonUI.renderEvolutionNoticeButton("evolutionNoticeBtn");
      }
    } catch {}
  }

  function modeText() {
    if (quizMode === "order") return "順番";
    if (quizMode === "random") return "ランダム";
    return "ニガテ順";
  }

  function summaryRangeText() {
    if (blockSelectEl.value === "all") return "全範囲";
    return `Block ${blockSelectEl.value}`;
  }

  function updateSettingsSummary() {
    if (settingsOpen) {
      settingsSummaryEl.textContent = "";
      return;
    }

    settingsSummaryEl.textContent =
      `（${summaryRangeText()}｜${session.limit}問｜モード:${modeText()}｜${LV}級）`;
  }

  function closeSettings() {
    settingsOpen = false;
    settingsArea.style.display = "none";
    toggleSettingsBtn.textContent = "▶ 設定";
    updateSettingsSummary();
  }

  toggleSettingsBtn.addEventListener("click", () => {
    settingsOpen = !settingsOpen;
    settingsArea.style.display = settingsOpen ? "block" : "none";
    toggleSettingsBtn.textContent = settingsOpen ? "▲ 設定を閉じる" : "▶ 設定";
    updateSettingsSummary();
  });

  toggleGoimonBtn.addEventListener("click", () => {
    goimonUi.open = !goimonUi.open;
    saveGoimonUiState();
    renderGoimonVisibility();
  });

  function renderBlockStatsLine() {
    const v = blockSelectEl.value;

    if (v === "all") {
      blockStatsEl.textContent = `Block累計正答率：全範囲（合格 ${PASS_LINE}%）`;
      return;
    }

    const id = Number(v);
    blockStatsEl.textContent = `このBlockの累計正答率：${getBlockAccText(id)}（合格 ${PASS_LINE}%）`;
  }

  function renderBlockSelect() {
    blockSelectEl.innerHTML = "";

    const optAll = document.createElement("option");
    optAll.value = "all";
    optAll.textContent = `全範囲（1〜${words.length}）`;
    blockSelectEl.appendChild(optAll);

    for (const b of blocks) {
      const opt = document.createElement("option");
      opt.value = String(b.id);
      opt.textContent = `Block ${b.id}（${b.start}〜${b.end}）`;
      blockSelectEl.appendChild(opt);
    }

    if (!blockSelectEl.value) blockSelectEl.value = "all";

    renderBlockStatsLine();
    updateSettingsSummary();
  }

  function applySelectedBlockToRange() {
    const v = blockSelectEl.value;

    if (v === "all") {
      rangeStartEl.value = "1";
      rangeEndEl.value = String(words.length);
    } else {
      const b = getBlockById(Number(v));

      if (b) {
        rangeStartEl.value = String(b.start);
        rangeEndEl.value = String(b.end);
      }
    }
  }

  blockSelectEl.addEventListener("change", () => {
    renderBlockStatsLine();
    updateSettingsSummary();
  });

  applyBlockBtn.addEventListener("click", () => {
    applySelectedBlockToRange();
    renderBlockStatsLine();
    updateSettingsSummary();
  });

  function getCurrentRangeFromInputs() {
    let s = Number(rangeStartEl.value) - 1;
    let e = Number(rangeEndEl.value) - 1;

    [s, e] = clampRange(s, e);

    return { s, e };
  }

  function renderMeta(no) {
    const b = getBlockByNo(no);

    if (b) {
      qMetaEl.textContent = `Block ${b.id}（${b.start}〜${b.end}）｜番号 ${no} / ${words.length}（${LV}級）`;
    } else {
      qMetaEl.textContent = `番号 ${no} / ${words.length}（${LV}級）`;
    }
  }

  function getRangePool() {
    const [s, e] = clampRange(session.start, session.end);
    return { s, e };
  }

  function normalizePos(pos) {
    const p = String(pos || "").trim().toLowerCase();

    if (p === "noun" || p === "n" || p === "名詞") return "noun";
    if (p === "verb" || p === "v" || p === "動詞") return "verb";
    if (p === "adjective" || p === "adj" || p === "形容詞") return "adjective";
    if (p === "adverb" || p === "adv" || p === "副詞") return "adverb";
    if (p === "phrase" || p === "熟語" || p === "表現") return "phrase";

    return "";
  }

  function guessPos(word) {
    if (!word) return "unknown";

    const explicitPos = normalizePos(word.pos);
    if (explicitPos) return explicitPos;

    const en = String(word.en || "").trim().toLowerCase();
    const ja = String(word.ja || "").trim();

    if (!en && !ja) return "unknown";
    if (en.includes(" ")) return "phrase";

    if (/的な$|な$|しい$|い$/.test(ja)) {
      return "adjective";
    }

    if (/的に$/.test(ja)) {
      return "adverb";
    }

    if (/する$|される$|させる$|できる$|える$|める$|れる$|られる$|う$|く$|ぐ$|す$|つ$|ぬ$|ぶ$|む$|る$/.test(ja)) {
      return "verb";
    }

    if (/ly$/.test(en)) {
      return "adverb";
    }

    if (/(tion|sion|ment|ness|ity|ance|ence|ship|hood|ism|age)$/.test(en)) {
      return "noun";
    }

    if (/(ous|ful|less|able|ible|ive|al|ic|ent|ant|ary)$/.test(en)) {
      return "adjective";
    }

    return "noun";
  }

  function uniqueChoiceWords(pool, correctWord) {
    const result = [];
    const usedJa = new Set();

    const correctEn = String(correctWord.en || "").trim().toLowerCase();
    const correctJa = String(correctWord.ja || "").trim();

    for (const w of pool) {
      if (!w || !w.en || !w.ja) continue;

      const en = String(w.en || "").trim().toLowerCase();
      const ja = String(w.ja || "").trim();

      if (!en || !ja) continue;
      if (en === correctEn) continue;
      if (ja === correctJa) continue;
      if (usedJa.has(ja)) continue;

      usedJa.add(ja);
      result.push(w);
    }

    return result;
  }

  function toChoiceItem(word, isCorrect) {
    return {
      en: String(word.en || ""),
      ja: String(word.ja || ""),
      pos: word.pos || "",
      isCorrect: !!isCorrect
    };
  }

  function makeChoices(correctWord, s, e) {
    const correctPos = guessPos(correctWord);

    const rangeWords = [];
    for (let i = s; i <= e; i++) {
      if (words[i]) rangeWords.push(words[i]);
    }

    const samePosInRange = uniqueChoiceWords(
      rangeWords.filter(w => guessPos(w) === correctPos),
      correctWord
    );

    const samePosAll = uniqueChoiceWords(
      words.filter(w => guessPos(w) === correctPos),
      correctWord
    );

    const otherInRange = uniqueChoiceWords(
      rangeWords.filter(w => guessPos(w) !== correctPos),
      correctWord
    );

    const allOthers = uniqueChoiceWords(words, correctWord);

    const picked = [];
    const usedJa = new Set();

    function addFrom(pool, maxCount) {
      const shuffled = shuffle(pool);

      for (const w of shuffled) {
        if (picked.length >= maxCount) break;

        const ja = String(w.ja || "").trim();
        if (!ja) continue;
        if (usedJa.has(ja)) continue;

        usedJa.add(ja);
        picked.push(w);
      }
    }

    addFrom(samePosInRange, 3);
    addFrom(samePosAll, 3);
    addFrom(otherInRange, 3);
    addFrom(allOthers, 3);

    while (picked.length < 3) {
      picked.push({
        en: "",
        ja: "（該当なし）",
        pos: "",
        isPlaceholder: true
      });
    }

    const choiceItems = [
      toChoiceItem(correctWord, true),
      ...picked.slice(0, 3).map(w => toChoiceItem(w, false))
    ];

    return shuffle(choiceItems);
  }

  function pickIndex_order(s, e) {
    if (orderCursor < s || orderCursor > e) orderCursor = s;

    const idx = orderCursor;

    orderCursor++;

    if (orderCursor > e) orderCursor = s;

    saveOrderCursor(s, e, orderCursor);

    return idx;
  }

  function pickIndex_random(s, e) {
    const remain = [];

    for (let i = s; i <= e; i++) {
      if (!askedSet.has(words[i].en)) remain.push(i);
    }

    const pool = remain.length
      ? remain
      : (() => {
          const all = [];
          for (let i = s; i <= e; i++) all.push(i);
          return all;
        })();

    return pool[Math.floor(Math.random() * pool.length)];
  }

  function pickIndex_weak(s, e) {
    const arr = [];

    for (let i = s; i <= e; i++) {
      arr.push({
        i,
        manual: isManualWeak(words[i].en) ? 1 : 0,
        p: getPoint(words[i].en)
      });
    }

    const hasAnyWeak = arr.some(x => x.manual > 0 || x.p > 0);
    if (!hasAnyWeak) return pickIndex_random(s, e);

    arr.sort((a, b) => (b.manual - a.manual) || (b.p - a.p));

    const top = arr
      .filter(x => x.manual > 0 || x.p > 0)
      .slice(0, Math.min(10, arr.length));

    const cand = shuffle(top);

    for (const x of cand) {
      if (!askedSet.has(words[x.i].en)) return x.i;
    }

    return cand[0].i;
  }

  function pickCorrectIndex(s, e) {
    if (quizMode === "order") return pickIndex_order(s, e);
    if (quizMode === "random") return pickIndex_random(s, e);
    return pickIndex_weak(s, e);
  }

  function makeQuestion() {
    const { s, e } = getRangePool();
    let idx;

    if (Array.isArray(session.retryOrder)) {
      if (session.retryOrder.length === 0) return null;
      idx = session.retryOrder.shift();
    } else {
      idx = pickCorrectIndex(s, e);

      if (weakMode && quizMode !== "order") {
        const weakIdxs = [];

        for (let i = s; i <= e; i++) {
          if (getPoint(words[i].en) > 0) weakIdxs.push(i);
        }

        if (weakIdxs.length > 0) {
          const remaining = weakIdxs.filter(i => !askedSet.has(words[i].en));
          const pool = remaining.length ? remaining : weakIdxs;
          idx = pool[Math.floor(Math.random() * pool.length)];
        }
      }
    }

    askedSet.add(words[idx].en);

    const no = idx + 1;
    const b = getBlockByNo(no);
    const blockId = b ? Number(b.id) : 0;

    return {
      idx,
      no,
      blockId,
      en: words[idx].en,
      ja: words[idx].ja,
      choices: makeChoices(words[idx], s, e)
    };
  }

  function showPlayView() {
    playBox.style.display = "block";
    summaryBox.style.display = "none";
  }

  function showSummaryView() {
    playBox.style.display = "none";
    summaryBox.style.display = "block";

    if (window.QuizUICommon && typeof window.QuizUICommon.clearText === "function") {
      window.QuizUICommon.clearText(questionProgressEl);
    } else if (questionProgressEl) {
      questionProgressEl.textContent = "";
    }
  }

  function renderQuestionProgress() {
    if (!window.QuizUICommon || typeof window.QuizUICommon.renderQuestionProgress !== "function") {
      if (questionProgressEl) {
        const currentNo = Math.min(session.answered + 1, session.limit);
        questionProgressEl.textContent = (session.active && session.limit > 0)
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

  function updateWeakInfo() {
    weakInfoEl.textContent =
      `保存済みニガテ数：${weakCount()}（手動追加を含む。復習したいときは出題モードで「ニガテ順」を選んでください）`;
  }

  function renderQuestion() {
    renderStats();
    updateWeakInfo();
    renderBlockStatsLine();
    updateSettingsSummary();
    renderEvolutionNotice();

    if (!session.active) {
      if (window.QuizUICommon && typeof window.QuizUICommon.clearText === "function") {
        window.QuizUICommon.clearText(questionProgressEl);
      } else if (questionProgressEl) {
        questionProgressEl.textContent = "";
      }

      questionEl.textContent = "テスト未開始";
      qMetaEl.textContent = "";
      choicesEl.innerHTML = "";
      resultEl.textContent = "";
      nextBtn.disabled = true;
      nextBtn.textContent = "次の問題";
      return;
    }

    if (session.answered >= session.limit) {
      finishSession();
      return;
    }

    answeredThisQuestion = false;
    nextBtn.disabled = true;
    nextBtn.textContent = "次の問題";
    resultEl.textContent = "";

    current = makeQuestion();

    if (!current) {
      finishSession();
      return;
    }

    questionEl.textContent = current.en;

    renderQuestionProgress();
    renderMeta(current.no);

    askedLog.push({
      no: current.no,
      en: current.en,
      ja: current.ja,
      blockId: current.blockId,
      isCorrect: null
    });

    if (autoSpeakQ) speakEnglish(current.en);

    choicesEl.innerHTML = "";

    const choiceNumbers = ["①", "②", "③", "④"];

    current.choices.forEach((choice, index) => {
      const btn = document.createElement("button");

      btn.type = "button";
      btn.className = "choiceBtn";
      btn.dataset.correct = choice.isCorrect ? "1" : "0";

      btn.innerHTML = `
        <span class="choiceIndex">${choiceNumbers[index] || index + 1}</span>
        <span class="choiceText">${escapeHtml(choice.ja)}</span>
      `;

      btn.addEventListener("click", () => {
        ensureAudioReady();
        handleChoice(choice, btn);
      });

      choicesEl.appendChild(btn);
    });
  }

  function lockChoices() {
    document.querySelectorAll("#choices button").forEach(b => {
      b.disabled = true;
    });
  }

  function markCorrectButtonGreen() {
    document.querySelectorAll("#choices button").forEach(b => {
      if (b.dataset.correct === "1") {
        b.classList.add("correct");
      }
    });
  }

  function renderAnswerDetail(isCorrect, selectedChoice) {
    const choiceNumbers = ["1", "2", "3", "4"];

    const mainText = isCorrect
      ? "⭕️ 正解！"
      : `❌ 不正解。正解は「${escapeHtml(current.ja)}」＝ ${escapeHtml(current.en)}`;

    const rows = current.choices.map((choice, index) => {
      const isAnswer = !!choice.isCorrect;

      const isSelected =
        selectedChoice &&
        String(choice.en) === String(selectedChoice.en) &&
        String(choice.ja) === String(selectedChoice.ja);

      const correctTag = isAnswer
        ? `<span class="answerChoiceTag correctTag">正解</span>`
        : "";

      const selectedTag = !isAnswer && isSelected
        ? `<span class="answerChoiceTag selectedTag">選択</span>`
        : "";

      return `
        <div class="answerChoiceRow">
          <span class="choiceIndex">${choiceNumbers[index] || index + 1}</span>
          <span class="answerChoiceJa">${escapeHtml(choice.ja)}</span>
          <span class="answerChoiceEn">＝ ${escapeHtml(choice.en || "—")}</span>
          ${correctTag}
          ${selectedTag}
        </div>
      `;
    }).join("");

    const sentenceExamplesHtml = renderSentenceExamplesHtml(current.en);

resultEl.innerHTML = `
  <div style="font-weight:800; margin-bottom:8px;">${mainText}</div>
  <div class="answerDetailBox">
    <div class="answerDetailTitle">選択肢の確認</div>
    ${rows}
  </div>
  ${sentenceExamplesHtml}
`;
  }

  function handleChoice(choice, clickedBtn) {
    if (answeredThisQuestion) return;

    answeredThisQuestion = true;
    session.answered++;

    const correct = !!choice.isCorrect;

    addLearningLog(correct);

    if (correct) {
      clickedBtn.classList.add("correct");
      playCorrectSound();
      session.correct++;

      renderAnswerDetail(true, choice);

      const currentWeakPoint = getPoint(current.en);

      addQuizGoimonProgress();

      if (currentWeakPoint > 0) {
        setPoint(current.en, currentWeakPoint - 1);
        saveWeakPoints();
      }
    } else {
      clickedBtn.classList.add("wrong");
      playWrongSound();

      markCorrectButtonGreen();
      renderAnswerDetail(false, choice);

      setPoint(current.en, getPoint(current.en) + 2);
      saveWeakPoints();

      if (!wrongMap[current.en]) {
        wrongMap[current.en] = {
          no: current.no,
          en: current.en,
          ja: current.ja,
          blockId: current.blockId
        };
      }
    }

    lockChoices();

    if (current.blockId) addBlockResult(current.blockId, correct);

    const lastAsked = askedLog[askedLog.length - 1];
    if (lastAsked) {
      lastAsked.isCorrect = correct;
    }

    renderStats();
    updateWeakInfo();
    renderBlockStatsLine();
    updateSettingsSummary();
    renderEvolutionNotice();

    nextBtn.disabled = false;

    if (session.answered >= session.limit) {
      nextBtn.textContent = "結果を見る";
    } else {
      nextBtn.textContent = "次の問題";
    }
  }

  function renderWeakBadges(en) {
    const chips = [];
    const autoPoint = getPoint(en);
    const manual = isManualWeak(en);

    if (manual) {
      chips.push(`
        <span style="
          display:inline-block;
          padding:4px 8px;
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

    if (autoPoint > 0) {
      chips.push(`
        <span style="
          display:inline-block;
          padding:4px 8px;
          border-radius:999px;
          background:#eef5ff;
          color:#1f58b1;
          border:1px solid #cfe0ff;
          font-size:12px;
          font-weight:700;
        ">
          自動苦手 ${autoPoint}
        </span>
      `);
    }

    if (!chips.length) {
      chips.push(`
        <span style="
          display:inline-block;
          padding:4px 8px;
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

  function renderAskedSummaryList() {
    askedListEl.innerHTML = "";

    if (!askedLog.length) {
      const li = document.createElement("li");
      li.textContent = "結果がありません。";
      askedListEl.appendChild(li);
      return;
    }

    askedLog.forEach(item => {
      const toggleLabel = isManualWeak(item.en) ? "苦手から外す" : "苦手に追加";

      const li = document.createElement("li");

      li.style.listStyle = "none";
      li.style.margin = "0 0 12px 0";
      li.style.padding = "12px";
      li.style.border = "1px solid #eee";
      li.style.borderRadius = "12px";
      li.style.background = "#fafafa";

      li.innerHTML = `
        <div style="display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-bottom:8px;">
          <div style="font-weight:800;">${item.no}｜${escapeHtml(item.en)}</div>
          <div style="font-size:13px; color:#666;">${escapeHtml(item.ja)}</div>
        </div>

        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
          <span style="
            display:inline-block;
            padding:4px 8px;
            border-radius:999px;
            background:${item.isCorrect ? "#eefaf1" : "#ffecec"};
            color:${item.isCorrect ? "#0a7a2f" : "#b00020"};
            border:1px solid ${item.isCorrect ? "#bfe7ca" : "#f3b5bf"};
            font-size:12px;
            font-weight:700;
          ">
            ${item.isCorrect ? "正解" : "不正解"}
          </span>

          ${renderWeakBadges(item.en)}
        </div>

        <div>
          <button
            type="button"
            data-action="toggle-manual-weak"
            data-en="${escapeAttr(item.en)}"
            style="margin-top:0;"
          >
            ${toggleLabel}
          </button>
        </div>
      `;

      askedListEl.appendChild(li);
    });
  }

  function renderWrongSummaryList() {
    wrongListEl.innerHTML = "";

    const wrongArr = Object.values(wrongMap).sort((a, b) => a.no - b.no);

    if (wrongArr.length === 0) {
      const li = document.createElement("li");
      li.textContent = "間違いなし！";
      wrongListEl.appendChild(li);
      return;
    }

    wrongArr.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.no}｜${item.en} → ${item.ja}`;
      wrongListEl.appendChild(li);
    });
  }

  function finishSession() {
    session.active = false;

    showSummaryView();

    finalScoreEl.textContent = `結果：${session.correct} / ${session.limit}`;

    const rangeText = blockSelectEl.value === "all" ? "全範囲" : `Block ${blockSelectEl.value}`;
    finalBlockLineEl.textContent = `出題範囲：${rangeText}｜モード：${modeText()}｜${LV}級`;

    renderAskedSummaryList();
    renderWrongSummaryList();
  }

  function startSameConditionNextSession() {
    session.answered = 0;
    session.correct = 0;
    session.active = true;
    session.retryOrder = null;

    askedSet.clear();
    askedLog = [];
    wrongMap = {};

    if (quizMode === "order") {
      orderCursor = loadOrderCursor(session.start, session.end);
    } else {
      orderCursor = session.start;
    }

    showPlayView();
    renderQuestion();
  }

  function startRetrySameSetSession() {
    if (!askedLog.length) {
      alert("再挑戦できる問題セットがありません。");
      return;
    }

    session.active = true;
    session.answered = 0;
    session.correct = 0;
    session.limit = askedLog.length;
    session.retryOrder = askedLog.map(item => item.no - 1);

    askedSet.clear();
    askedLog = [];
    wrongMap = {};

    showPlayView();
    renderQuestion();
  }

  speakQBtn.addEventListener("click", () => {
    if (current) speakEnglish(current.en);
  });

  autoSpeakQEl.addEventListener("change", () => {
    autoSpeakQ = !!autoSpeakQEl.checked;
    saveSettings();
  });

  modeSelectEl.addEventListener("change", () => {
    quizMode = modeSelectEl.value;
    saveSettings();
    updateSettingsSummary();
  });

  resultEl.addEventListener("click", e => {
  const target = e.target.closest('[data-action="reveal-sentence-ja"]');
  if (!target) return;

  const ja = target.getAttribute("data-sentence-ja") || "";

  target.className = "sentenceExampleJaText";
  target.removeAttribute("data-action");
  target.removeAttribute("data-sentence-ja");
  target.textContent = ja;
});

  nextBtn.addEventListener("click", () => {
    if (!answeredThisQuestion) {
      resultEl.textContent = "まず1つ選んでください。";
      return;
    }

    if (session.answered >= session.limit) {
      finishSession();
      return;
    }

    renderQuestion();
  });

  startBtn.addEventListener("click", () => {
    let s = Number(rangeStartEl.value) - 1;
    let e = Number(rangeEndEl.value) - 1;
    let l = Number(limitEl.value);

    if (!Number.isFinite(l) || l < 1) l = 10;

    [s, e] = clampRange(s, e);

    session.start = s;
    session.end = e;
    session.limit = Math.floor(l);
    session.answered = 0;
    session.correct = 0;
    session.active = true;
    session.retryOrder = null;

    askedSet.clear();
    askedLog = [];
    wrongMap = {};

    if (quizMode === "order") {
      orderCursor = loadOrderCursor(session.start, session.end);
    } else {
      orderCursor = session.start;
    }

    closeSettings();
    showPlayView();
    renderQuestion();
  });

  retrySameSetBtn.addEventListener("click", () => {
    startRetrySameSetSession();
  });

  askedListEl.addEventListener("click", e => {
    const btn = e.target.closest('[data-action="toggle-manual-weak"]');
    if (!btn) return;

    const en = btn.getAttribute("data-en");
    if (!en) return;

    const nextState = !isManualWeak(en);

    setManualWeak(en, nextState);
    saveManualWeakMap();

    updateWeakInfo();
    renderAskedSummaryList();
  });

  retrySameConditionBtn.addEventListener("click", () => {
    startSameConditionNextSession();
  });

  backToSetupBtn.addEventListener("click", () => {
    summaryBox.style.display = "none";
    playBox.style.display = "block";

    session.active = false;
    current = null;
    answeredThisQuestion = false;

    closeSettings();
    renderQuestion();
  });

  const resetOrderBtn = document.getElementById("resetOrderCursor");

  if (resetOrderBtn) {
    resetOrderBtn.addEventListener("click", () => {
      if (!confirm("順番モードの進捗を最初からに戻しますか？")) return;

      let s = Number(rangeStartEl.value) - 1;
      let e = Number(rangeEndEl.value) - 1;

      [s, e] = clampRange(s, e);

      saveOrderCursor(s, e, s);

      alert("順番モードを最初からにリセットしました。");
    });
  }

  document.addEventListener("keydown", e => {
    const activeTag = document.activeElement ? document.activeElement.tagName : "";
    if (["INPUT", "SELECT", "TEXTAREA"].includes(activeTag)) return;

    if (!session.active) return;
    if (playBox.style.display === "none") return;

    const key = e.key;

    if (!answeredThisQuestion && /^[1-4]$/.test(key)) {
      const btns = choicesEl.querySelectorAll("button");
      const btn = btns[Number(key) - 1];

      if (btn) {
        e.preventDefault();
        btn.click();
      }

      return;
    }

    const isNextKey =
      key === "Enter" ||
      key === " " ||
      key === "Spacebar" ||
      key === "ArrowRight" ||
      key === "ArrowDown";

    if (isNextKey && answeredThisQuestion && !nextBtn.disabled) {
      e.preventDefault();
      nextBtn.click();
    }
  });

  function applyQuery() {
    const p = new URLSearchParams(location.search);

    const start = Number(p.get("start"));
    const end = Number(p.get("end"));
    const mode = p.get("mode");
    const weak = p.get("weak");
    const autostart = p.get("autostart");

    if (Number.isFinite(start) && start >= 1) rangeStartEl.value = String(start);
    if (Number.isFinite(end) && end >= 1) rangeEndEl.value = String(end);

    if (modeSelectEl && (mode === "order" || mode === "random" || mode === "weak")) {
      modeSelectEl.value = mode;
      quizMode = mode;
      saveSettings();
    }

    if (weak === "1") {
      weakMode = true;
      quizMode = "weak";
      modeSelectEl.value = "weak";
      saveSettings();
    }

    renderBlockStatsLine();
    updateSettingsSummary();

    if (autostart === "1") {
      setTimeout(() => startBtn.click(), 0);
    }
  }

  loadWeakPoints();
  loadManualWeakMap();
  loadSettings();
  loadBlockStats();

  autoSpeakQEl.checked = !!autoSpeakQ;
  modeSelectEl.value = quizMode;

  renderBlockSelect();
  applySelectedBlockToRange();

  session.limit = Number(limitEl.value) || session.limit;

  if (levelBadgeEl) {
    levelBadgeEl.textContent = `現在：全商英検 ${LV}級`;
  }

  renderGoimonVisibility();

  settingsOpen = true;
  settingsArea.style.display = "block";
  toggleSettingsBtn.textContent = "▲ 設定を閉じる";
  updateSettingsSummary();

  showPlayView();
  summaryBox.style.display = "none";
  renderQuestion();

  if (typeof window.renderQuizGoimonMini === "function") {
    window.renderQuizGoimonMini();
  }

  renderEvolutionNotice();

  applyQuery();
});
