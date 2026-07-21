// quiz_jaen.js（日→英）ゴイモン版
// - Block対応
// - 順番 / ランダム / ニガテ順
// - 順番モードは続きから再開
// - 結果画面あり
// - URLパラメータ対応
// - 級ごと保存
// - 学習ログ（ホーム用）に 1問ごとに加算
// - 日→英正解で ゴイモンの「ことば +1」
// - ゴイモンは折りたたみ表示＋進化通知＋共通進化演出
// - 結果画面から「同じ問題セットに再挑戦」「同じ設定で次へ」が可能

document.addEventListener("DOMContentLoaded", () => {
  const words = window.WORDS || [];
  const blocks = window.BLOCKS || [];
  const PASS_LINE = 80;

  const LEVEL_KEY = "zensho_level_v1";
  function getLevel() {
    return localStorage.getItem(LEVEL_KEY) || "1";
  }
  const LV = getLevel();

  function addLearningLog(isCorrect) {
    try {
      if (typeof window.zenshoLogAdd === "function") {
        window.zenshoLogAdd("quiz_jaen", !!isCorrect);
      }
    } catch {}
  }

  const WEAK_KEY = `zensho_quiz_weak_points_jaen_v3_lv${LV}`;
  const ORDER_CURSOR_KEY = `zensho_quiz_order_cursor_jaen_v2_lv${LV}`;
  const SETTINGS_KEY = `zensho_quiz_settings_jaen_v2_lv${LV}`;
  const BLOCK_STATS_KEY = `zensho_block_stats_jaen_v2_lv${LV}`;
  const UI_KEY = `zensho_quiz_jaen_ui_v1_lv${LV}`;

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
  const setupBox = document.getElementById("setupBox");

  const modeSelectEl = document.getElementById("modeSelect");
  const resetOrderBtn = document.getElementById("resetOrderCursor");

  const playBox = document.getElementById("playBox");
  const summaryBox = document.getElementById("summaryBox");
  const finalScoreEl = document.getElementById("finalScore");
  const finalBlockLineEl = document.getElementById("finalBlockLine");
  const askedListEl = document.getElementById("askedList");
  const wrongListEl = document.getElementById("wrongList");
  const retrySameSetBtn = document.getElementById("retrySameSet");
  const retrySameConditionBtn = document.getElementById("retrySameCondition");
  const backToSetupBtn = document.getElementById("backToSetup");
  const levelBadgeEl = document.getElementById("levelBadge");
  const goimonToggleBtn = document.getElementById("goimonToggleBtn");
  const goimonPanel = document.getElementById("goimonPanel");
  const evolutionNoticeBtn = document.getElementById("evolutionNoticeBtn");

  function must(el, name) {
    if (!el) throw new Error(`quiz_jaen.html に #${name} が見つかりません`);
  }

  [
    [statsEl,"stats"],[qMetaEl,"qMeta"],[questionEl,"question"],[choicesEl,"choices"],[resultEl,"result"],
    [nextBtn,"nextQ"],[startBtn,"startTest"],
    [rangeStartEl,"rangeStart"],[rangeEndEl,"rangeEnd"],[limitEl,"limitCount"],
    [blockSelectEl,"blockSelect"],[applyBlockBtn,"applyBlock"],[blockStatsEl,"blockStats"],
    [weakInfoEl,"weakInfo"],
    [speakQBtn,"speakQ"],[autoSpeakQEl,"autoSpeakQ"],
    [toggleSettingsBtn,"toggleSettings"],[settingsArea,"settingsArea"],[settingsSummaryEl,"settingsSummary"],[setupBox,"setupBox"],
    [modeSelectEl,"modeSelect"],[resetOrderBtn,"resetOrderCursor"],
    [playBox,"playBox"],[summaryBox,"summaryBox"],
    [finalScoreEl,"finalScore"],[finalBlockLineEl,"finalBlockLine"],
    [askedListEl,"askedList"],[wrongListEl,"wrongList"],
    [retrySameSetBtn,"retrySameSet"],[retrySameConditionBtn,"retrySameCondition"],
    [backToSetupBtn,"backToSetup"],
    [levelBadgeEl,"levelBadge"],[goimonToggleBtn,"goimonToggleBtn"],[goimonPanel,"goimonPanel"],
    [evolutionNoticeBtn,"evolutionNoticeBtn"]
  ].forEach(([el,n]) => must(el,n));

  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

  function loadUiState() {
    return safeParse(UI_KEY) || { goimonOpen: false };
  }

  function saveUiState() {
    saveJson(UI_KEY, uiState);
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
    if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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

  function lockChoices() {
    document.querySelectorAll("#choices button").forEach(b => { b.disabled = true; });
  }

  function markCorrectButtonGreen() {
  document
    .querySelectorAll("#choices button")
    .forEach(button => {
      if (
        current &&
        String(button.dataset.choiceEn) ===
          String(current.en)
      ) {
        button.classList.add("correct");
      }
    });
}

  function renderAnswerDetail(isCorrect, selectedChoice) {
  const choiceNumbers = ["①", "②", "③", "④"];

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
        <span class="choiceNumber">${choiceNumbers[index] || index + 1}</span>
        <span class="answerChoiceJa">${escapeHtml(choice.ja)}</span>
        <span class="answerChoiceEn">＝ ${escapeHtml(choice.en || "—")}</span>
        ${correctTag}
        ${selectedTag}
      </div>
    `;
  }).join("");

  resultEl.innerHTML = `
    <div style="font-weight:800; margin-bottom:8px;">${mainText}</div>
    <div class="answerDetailBox">
      <div class="answerDetailTitle">選択肢の確認</div>
      ${rows}
    </div>
  `;
}

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function clampRange(s, e) {
    if (!Number.isFinite(s)) s = 0;
    if (!Number.isFinite(e)) e = words.length - 1;
    s = Math.max(0, Math.min(words.length - 1, Math.floor(s)));
    e = Math.max(0, Math.min(words.length - 1, Math.floor(e)));
    if (s > e) [s, e] = [e, s];
    return [s, e];
  }

  function getBlockById(id) {
    return blocks.find(b => Number(b.id) === Number(id)) || null;
  }

  function getBlockByNo(no) {
    const n = Number(no);
    return blocks.find(b => n >= Number(b.start) && n <= Number(b.end)) || null;
  }

  let weakPoints = {};
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

  function weakCount() {
    return Object.keys(weakPoints).length;
  }

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
    try { statsMap = JSON.parse(raw) || {}; } catch {}
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

    const lv = window.ACTIVE_LEVEL || "1";
    const GLOBAL_BLOCK_KEY = `zensho_block_global_lv${lv}_v1`;
    const g = JSON.parse(localStorage.getItem(GLOBAL_BLOCK_KEY) || '{"byBlock":{}}');
    const k2 = String(blockId);
    if (!g.byBlock[k2]) {
      g.byBlock[k2] = {
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
    if (!Number.isFinite(g.byBlock[k2].quizAttemptedJaEn)) g.byBlock[k2].quizAttemptedJaEn = 0;
    if (!Number.isFinite(g.byBlock[k2].quizCorrectJaEn)) g.byBlock[k2].quizCorrectJaEn = 0;

    g.byBlock[k2].quizAttemptedJaEn += 1;
    if (isCorrect) g.byBlock[k2].quizCorrectJaEn += 1;
    localStorage.setItem(GLOBAL_BLOCK_KEY, JSON.stringify(g));
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
  

  let askedSet = new Set();
  let askedLog = [];
  let wrongMap = {};

  let orderCursor = 0;
  let uiState = loadUiState();
  let settingsOpen = false;

  function showSetupView() {
    setupBox.style.display = "block";
    playBox.style.display = "none";
    summaryBox.style.display = "none";

    settingsOpen = true;
    settingsArea.style.display = "block";
    toggleSettingsBtn.textContent = "▲ 設定を閉じる";
    updateSettingsSummary();
  }

  function showPlayView() {
    setupBox.style.display = "none";
    playBox.style.display = "block";
    summaryBox.style.display = "none";
  }

  function showSummaryView() {
    setupBox.style.display = "none";
    playBox.style.display = "none";
    summaryBox.style.display = "block";
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

  function renderBlockStatsLine() {
    const v = blockSelectEl.value;
    if (v === "all") {
      blockStatsEl.textContent = `Block累計正答率：全範囲（合格 ${PASS_LINE}%）`;
      return;
    }
    const id = Number(v);
    blockStatsEl.textContent = `このBlockの累計正答率：${getBlockAccText(id)}（合格 ${PASS_LINE}%）`;
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

  resetOrderBtn.addEventListener("click", () => {
    if (!confirm("順番モードの進捗を最初からに戻しますか？")) return;
    let s = Number(rangeStartEl.value) - 1;
    let e = Number(rangeEndEl.value) - 1;
    [s, e] = clampRange(s, e);
    saveOrderCursor(s, e, s);
    alert("順番モードを最初からにリセットしました。");
  });





  function renderMeta(no) {
    const b = getBlockByNo(no);
    if (b) qMetaEl.textContent = `Block ${b.id}（${b.start}〜${b.end}）｜番号 ${no} / ${words.length}（${LV}級）`;
    else qMetaEl.textContent = `番号 ${no} / ${words.length}（${LV}級）`;
  }

  function renderStats() {
    statsEl.textContent = `今回：${session.answered}/${session.limit}（正解 ${session.correct}）`;
  }

  function updateWeakInfo() {
    weakInfoEl.textContent = `保存済みニガテ数：${weakCount()}（復習したいときは出題モードで「ニガテ順」を選んでください）`;
  }

  function getRangePool() {
    const [s, e] = clampRange(session.start, session.end);
    return { s, e };
  }

  function getJapaneseForEnglish(en) {
  const found =
    words.find(word => {
      return String(word.en) === String(en);
    });

  return found
    ? String(found.ja || "")
    : "";
}

  function makeChoices(correctWord, s, e) {
    const candidates = [];
    for (let i = s; i <= e; i++) {
      const w = words[i];
      if (w.en !== correctWord.en) candidates.push(w.en);
    }
    const uniq = Array.from(new Set(candidates));
    const picked = shuffle(uniq).slice(0, 3);
    while (picked.length < 3) picked.push("（該当なし）");
    return shuffle([correctWord.en, ...picked]);
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
    const pool = remain.length ? remain : (() => {
      const all = [];
      for (let i = s; i <= e; i++) all.push(i);
      return all;
    })();
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function pickIndex_weak(s, e) {
    const arr = [];
    for (let i = s; i <= e; i++) arr.push({ i, p: getPoint(words[i].en) });
    const maxP = Math.max(...arr.map(x => x.p));
    if (maxP <= 0) return pickIndex_random(s, e);

    arr.sort((a, b) => b.p - a.p);
    const top = arr.slice(0, Math.min(10, arr.length)).filter(x => x.p > 0);
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
    }

    askedSet.add(words[idx].en);

    const no = idx + 1;
    const b = getBlockByNo(no);
    const blockId = b ? Number(b.id) : 0;

    return {
      idx, no, blockId,
      ja: words[idx].ja,
      en: words[idx].en,
      choices: makeChoices(words[idx], s, e)
    };
  }

  function renderAskedSummaryList() {
  askedListEl.innerHTML = "";
  askedListEl.className =
    "summaryWordList";

  if (!askedLog.length) {
    const li =
      document.createElement("li");

    li.className =
      "summaryEmpty";

    li.textContent =
      "結果がありません。";

    askedListEl.appendChild(li);
    return;
  }

  askedLog.forEach(item => {
    const li =
      document.createElement("li");

    li.className =
      "summaryWordCard";

    li.innerHTML = `
      <div class="summaryWordHead">
        <div>
          <div class="summaryWordNumber">
            単語番号 ${escapeHtml(item.no)}
          </div>

          <div class="summaryWordJapanese">
            ${escapeHtml(item.ja)}
          </div>

          <div class="summaryWordEnglish">
            ${escapeHtml(item.en)}
          </div>
        </div>

        <span class="
          summaryResultBadge
          ${
            item.isCorrect
              ? "correct"
              : "wrong"
          }
        ">
          ${
            item.isCorrect
              ? "正解"
              : "不正解"
          }
        </span>
      </div>
    `;

    askedListEl.appendChild(li);
  });
}

function renderWrongSummaryList() {
  wrongListEl.innerHTML = "";
  wrongListEl.className =
    "summaryWordList";

  const wrongArr =
    Object
      .values(wrongMap)
      .sort(
        (a, b) =>
          a.no - b.no
      );

  if (!wrongArr.length) {
    const li =
      document.createElement("li");

    li.className =
      "summaryEmpty";

    li.textContent =
      "全問正解です！";

    wrongListEl.appendChild(li);
    return;
  }

  wrongArr.forEach(item => {
    const li =
      document.createElement("li");

    li.className =
      "summaryWrongCard";

    li.innerHTML = `
      <div class="summaryWordNumber">
        単語番号 ${escapeHtml(item.no)}
      </div>

      <div class="summaryWordJapanese">
        ${escapeHtml(item.ja)}
      </div>

      <div class="summaryWordEnglish">
        正解：${escapeHtml(item.en)}
      </div>
    `;

    wrongListEl.appendChild(li);
  });
}

  function finishSession() {
  session.active = false;

  showSummaryView();

  const attempted =
    session.limit;

  const correct =
    session.correct;

  const percent =
    attempted > 0
      ? Math.round(
          (
            correct /
            attempted
          ) * 100
        )
      : 0;

  const passed =
    percent >= PASS_LINE;

  finalScoreEl.innerHTML = `
    <div class="summaryScoreCard">
      <div class="summaryScoreLabel">
        今回のスコア
      </div>

      <div class="summaryScoreMain">
        ${correct} / ${attempted}
      </div>

      <div class="summaryScorePercent">
        正答率 ${percent}%
      </div>

      <div class="
        summaryPassBadge
        ${
          passed
            ? "pass"
            : "challenge"
        }
      ">
        ${
          passed
            ? "合格ライン達成"
            : "もう一度挑戦"
        }
      </div>
    </div>
  `;

  const rangeText =
    blockSelectEl.value === "all"
      ? "全範囲"
      : `Block ${blockSelectEl.value}`;

  finalBlockLineEl.innerHTML = `
    <div class="summaryMeta">
      出題範囲：${escapeHtml(rangeText)}
      <br>
      出題モード：${escapeHtml(modeText())}
      ／ 全商英検${escapeHtml(LV)}級
      <br>
      合格ライン：${PASS_LINE}%
    </div>
  `;

  renderAskedSummaryList();
  renderWrongSummaryList();
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

  function renderEvolutionNotice() {
    try {
      if (window.GoimonUI && typeof window.GoimonUI.renderEvolutionNoticeButton === "function") {
        window.GoimonUI.renderEvolutionNoticeButton("evolutionNoticeBtn");
      }
    } catch {}
  }

  function renderGoimonStatus() {
    if (typeof window.renderQuizJaEnGoimonMini === "function") {
      window.renderQuizJaEnGoimonMini();
      return;
    }
    renderEvolutionNotice();
  }

  function openSharedEvolution() {
    try {
      if (window.GoimonUI && typeof window.GoimonUI.openEvolutionOverlay === "function") {
        window.GoimonUI.openEvolutionOverlay({
          onComplete: () => {
            renderGoimonStatus();
          }
        });
        return;
      }

      if (window.GoimonUI && typeof window.GoimonUI.confirmEvolution === "function") {
        window.GoimonUI.confirmEvolution();
        renderGoimonStatus();
      }
    } catch (e) {
      console.warn("openSharedEvolution failed:", e);
    }
  }

  function renderLevelBadge() {
    levelBadgeEl.textContent = `現在：全商英検 ${LV}級`;
  }

  function renderGoimonPanelState() {
    if (uiState.goimonOpen) {
      goimonPanel.classList.remove("hidden");
      goimonToggleBtn.textContent = "ゴイモンを閉じる";
    } else {
      goimonPanel.classList.add("hidden");
      goimonToggleBtn.textContent = "ゴイモンの様子を見る";
    }
  }

  function renderQuestion() {
    renderStats();
    updateWeakInfo();
    renderBlockStatsLine();
    updateSettingsSummary();
    renderGoimonPanelState();
    renderGoimonStatus();

    if (!session.active) {
      questionEl.textContent = "テスト未開始";
      qMetaEl.textContent = "";
      choicesEl.innerHTML = "";
      resultEl.textContent = "";
      nextBtn.disabled = true;
      return;
    }

    if (session.answered >= session.limit) {
      finishSession();
      return;
    }

   answeredThisQuestion = false;

nextBtn.disabled = true;
nextBtn.textContent =
  "次の問題";

resultEl.textContent = "";

    current = makeQuestion();
    questionEl.textContent = current.ja;
    renderMeta(current.no);

   askedLog.push({
  no: current.no,
  ja: current.ja,
  en: current.en,
  blockId: current.blockId,
  isCorrect: null
});

   choicesEl.innerHTML = "";
choicesEl.classList.remove("answered");

current.choices.forEach((text, index) => {
  const btn =
    document.createElement("button");

  const japanese =
    getJapaneseForEnglish(text);

  btn.type = "button";
  btn.className = "choiceBtn";
  btn.dataset.choiceEn = text;

  btn.innerHTML = `
    <span class="choiceIndex">
      ${index + 1}
    </span>

    <span class="choiceContent">
      <span class="choiceEnglish">
        ${escapeHtml(text)}
      </span>

      <span class="choiceJapanese">
        ${escapeHtml(japanese)}
      </span>
    </span>
  `;

  btn.addEventListener("click", () => {
    ensureAudioReady();
    handleChoice(text, btn);
  });

  choicesEl.appendChild(btn);
});
  }

  function handleChoice(choiceText, clickedBtn) {
  if (answeredThisQuestion) return;

  answeredThisQuestion = true;

  choicesEl.classList.add("answered");

  session.answered++;

    const correct = (choiceText === current.en);

    addLearningLog(correct);

    if (correct) {
      clickedBtn.classList.add("correct");
      playCorrectSound();

      session.correct++;
      resultEl.textContent = "⭕️ 正解！";

      const currentWeakPoint = getPoint(current.en);

      if (window.GoimonUI && typeof window.GoimonUI.addQuizJaEnCorrect === "function") {
        try {
          window.GoimonUI.addQuizJaEnCorrect();
        } catch (e) {
          console.warn("Goimon addQuizJaEnCorrect failed:", e);
        }
      }

      if (currentWeakPoint > 0) {
        setPoint(current.en, currentWeakPoint - 1);
        saveWeakPoints();
      }
    } else {
      clickedBtn.classList.add("wrong");
      playWrongSound();

      resultEl.textContent = `❌ 不正解。正解は「${current.en}」`;

      markCorrectButtonGreen();

      setPoint(current.en, getPoint(current.en) + 2);
      saveWeakPoints();

      if (!wrongMap[current.en]) {
        wrongMap[current.en] = { no: current.no, ja: current.ja, en: current.en, blockId: current.blockId };
      }
    }

    lockChoices();

const lastAsked =
  askedLog[
    askedLog.length - 1
  ];

if (lastAsked) {
  lastAsked.isCorrect =
    correct;
}

if (window.GlobalStats && current.blockId) {
      window.GlobalStats.addQuizJaEn(current.blockId, correct);
    }
    if (current.blockId) addBlockResult(current.blockId, correct);

    if (autoSpeakQ) speakEnglish(current.en);

    renderStats();
    updateWeakInfo();
    renderBlockStatsLine();
    updateSettingsSummary();
    renderGoimonStatus();

    nextBtn.disabled = false;

if (
  session.answered >=
  session.limit
) {
  nextBtn.textContent =
    "結果を見る";
} else {
  nextBtn.textContent =
    "次の問題";
}
  }

  speakQBtn.addEventListener("click", () => {
    if (!current) return;
    if (!answeredThisQuestion) {
      resultEl.textContent = "まず1つ選んでください（解答後に発音できます）。";
      return;
    }
    speakEnglish(current.en);
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



  nextBtn.addEventListener(
  "click",
  () => {
    if (!answeredThisQuestion) {
      resultEl.textContent =
        "まず1つ選んでください。";

      return;
    }

    if (
      session.answered >=
      session.limit
    ) {
      finishSession();
      return;
    }

    renderQuestion();
  }
);

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



  backToSetupBtn.addEventListener("click", () => {
    showSetupView();
  });
    retrySameSetBtn.addEventListener("click", () => {
    startRetrySameSetSession();
  });

  retrySameConditionBtn.addEventListener("click", () => {
    startSameConditionNextSession();
  });

  function registerQuizShortcuts() {
  if (
    !window.QuizShortcuts ||
    typeof window.QuizShortcuts.register !== "function"
  ) {
    console.warn(
      "quiz_shortcuts.jsが読み込まれていません。"
    );
    return;
  }

  window.QuizShortcuts.register({
    isActive: () => {
      return (
        session.active &&
        playBox.style.display !== "none" &&
        !!current
      );
    },

    canAnswer: () => {
      return (
        session.active &&
        !answeredThisQuestion &&
        choicesEl.querySelectorAll(
          "button:not(:disabled)"
        ).length === 4
      );
    },

    canNext: () => {
      return (
        session.active &&
        answeredThisQuestion &&
        !nextBtn.disabled
      );
    },

    canSpeak: () => {
      return (
        session.active &&
        !!current &&
        answeredThisQuestion
      );
    },

    canBack: () => {
      return (
        session.active &&
        playBox.style.display !== "none"
      );
    },

    onAnswer: index => {
      const buttons =
        Array.from(
          choicesEl.querySelectorAll(
            "button:not(:disabled)"
          )
        );

      const targetButton =
        buttons[index - 1];

      if (!targetButton) {
        return;
      }

      targetButton.click();
    },

    onNext: () => {
      if (nextBtn.disabled) {
        return;
      }

      nextBtn.click();
    },

    onSpeak: () => {
      if (
        !current ||
        !answeredThisQuestion
      ) {
        return;
      }

      speakEnglish(current.en);
    },

    onBack: () => {
      const ok =
        window.confirm(
          "現在のテストを中断して設定画面に戻りますか。"
        );

      if (!ok) {
        return;
      }

      if (
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.cancel();
      }

      session.active = false;
      current = null;
      answeredThisQuestion = false;

      showSetupView();
      renderQuestion();
    }
  });
}

  

  function applyQuery() {
    const p = new URLSearchParams(location.search);

    const start = Number(p.get("start"));
    const end = Number(p.get("end"));
    const mode = p.get("mode");
    const autostart = p.get("autostart");

    if (Number.isFinite(start) && start >= 1) rangeStartEl.value = String(start);
    if (Number.isFinite(end) && end >= 1) rangeEndEl.value = String(end);

    if (modeSelectEl && (mode === "order" || mode === "random" || mode === "weak")) {
      modeSelectEl.value = mode;
      quizMode = mode;
      saveSettings();
    }



    updateSettingsSummary();

    if (autostart === "1") {
      setTimeout(() => startBtn.click(), 0);
    }
  }

  goimonToggleBtn.addEventListener("click", () => {
    uiState.goimonOpen = !uiState.goimonOpen;
    saveUiState();
    renderGoimonPanelState();
  });

  evolutionNoticeBtn.addEventListener("click", () => {
    openSharedEvolution();
  });

  loadWeakPoints();
  loadSettings();
  loadBlockStats();

  if (window.GoimonUI && typeof window.GoimonUI.ensureCurrent === "function") {
    window.GoimonUI.ensureCurrent();
  }

  autoSpeakQEl.checked = !!autoSpeakQ;
  modeSelectEl.value = quizMode;

  renderLevelBadge();
  renderBlockSelect();
  applySelectedBlockToRange();

  session.limit = Number(limitEl.value) || session.limit;

  updateWeakInfo();

 showSetupView();
renderQuestion();

registerQuizShortcuts();
applyQuery();
});
