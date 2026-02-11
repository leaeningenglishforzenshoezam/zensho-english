// quiz.js（英→日）完全版：Block＋3モード＋順番続き＋級ごと保存＋横断ブロック記録＋URLパラメータ（範囲/弱点/自動開始）

document.addEventListener("DOMContentLoaded", () => {
  const words = window.WORDS || [];
  const blocks = window.BLOCKS || [];
  const PASS_LINE = 80;

  // ===== レベル（1級/2級）取得 =====
  const LEVEL_KEY = "zensho_level_v1";
  function getLevel() {
    return localStorage.getItem(LEVEL_KEY) || "1";
  }
  const LV = getLevel();

  // ===== 保存キー（級ごと）=====
  const WEAK_KEY = `zensho_quiz_weak_points_enja_v2_lv${LV}`;
  const ORDER_CURSOR_KEY = `zensho_quiz_order_cursor_v1_enja_lv${LV}`;
  const SETTINGS_KEY = `zensho_quiz_settings_enja_v1_lv${LV}`;
  const BLOCK_STATS_KEY = `zensho_block_stats_enja_v1_lv${LV}`;

  // ===== 横断ブロック記録キー（級ごと・暗記/英→日/日→英で共通）=====
  const GLOBAL_BLOCK_KEY = `zensho_block_global_lv${LV}_v1`;

  // ===== DOM =====
  const statsEl = document.getElementById("stats");
  const qMetaEl = document.getElementById("qMeta");
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const resultEl = document.getElementById("result");
  const nextBtn = document.getElementById("nextQ");
  const startBtn = document.getElementById("startTest");
  const resetBtn = document.getElementById("resetQuiz");

  const rangeStartEl = document.getElementById("rangeStart");
  const rangeEndEl = document.getElementById("rangeEnd");
  const limitEl = document.getElementById("limitCount");

  const blockSelectEl = document.getElementById("blockSelect");
  const applyBlockBtn = document.getElementById("applyBlock");
  const blockStatsEl = document.getElementById("blockStats");

  const weakModeEl = document.getElementById("weakMode");
  const clearWeakBtn = document.getElementById("clearWeak");
  const weakInfoEl = document.getElementById("weakInfo");

  const speakQBtn = document.getElementById("speakQ");
  const autoSpeakQEl = document.getElementById("autoSpeakQ");

  const toggleSettingsBtn = document.getElementById("toggleSettings");
  const settingsArea = document.getElementById("settingsArea");
  const settingsSummaryEl = document.getElementById("settingsSummary");

  const modeSelectEl = document.getElementById("modeSelect");

  // 結果画面
  const playBox = document.getElementById("playBox");
  const summaryBox = document.getElementById("summaryBox");
  const finalScoreEl = document.getElementById("finalScore");
  const finalBlockLineEl = document.getElementById("finalBlockLine");
  const askedListEl = document.getElementById("askedList");
  const wrongListEl = document.getElementById("wrongList");
  const backToSetupBtn = document.getElementById("backToSetup");

  // 結果画面ボタン（このBlockを暗記 / 弱点で復習）
  const goStudyBlockBtn = document.getElementById("goStudyBlock");
  const goWeakReviewBtn = document.getElementById("goWeakReview");

  // ===== 安全チェック =====
  function must(el, name) {
    if (!el) throw new Error(`quiz.html に #${name} が見つかりません`);
  }
  [
    [statsEl,"stats"],[qMetaEl,"qMeta"],[questionEl,"question"],[choicesEl,"choices"],[resultEl,"result"],
    [nextBtn,"nextQ"],[startBtn,"startTest"],[resetBtn,"resetQuiz"],
    [rangeStartEl,"rangeStart"],[rangeEndEl,"rangeEnd"],[limitEl,"limitCount"],
    [blockSelectEl,"blockSelect"],[applyBlockBtn,"applyBlock"],[blockStatsEl,"blockStats"],
    [weakModeEl,"weakMode"],[clearWeakBtn,"clearWeak"],[weakInfoEl,"weakInfo"],
    [speakQBtn,"speakQ"],[autoSpeakQEl,"autoSpeakQ"],
    [toggleSettingsBtn,"toggleSettings"],[settingsArea,"settingsArea"],[settingsSummaryEl,"settingsSummary"],
    [modeSelectEl,"modeSelect"],
    [summaryBox,"summaryBox"],[playBox,"playBox"],[finalScoreEl,"finalScore"],[finalBlockLineEl,"finalBlockLine"],
    [askedListEl,"askedList"],[wrongListEl,"wrongList"],[backToSetupBtn,"backToSetup"],
  ].forEach(([el,n]) => must(el,n));

  // ===== Utility =====
  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
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

  // ===== 音声 =====
  function speakEnglish(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  // ===== 横断ブロック記録（英→日）=====
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
      g.byBlock[k] = { studyDone: 0, quizAttempted: 0, quizCorrect: 0, quizAttemptedJaEn: 0, quizCorrectJaEn: 0 };
    }
    g.byBlock[k].quizAttempted += 1;
    if (isCorrect) g.byBlock[k].quizCorrect += 1;
    saveGlobal(g);
  }

  // ===== 弱点ポイント（級別）=====
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

  // ===== 順番モードの「続き」（級別）=====
  function loadOrderCursor(start, end) {
    const raw = localStorage.getItem(ORDER_CURSOR_KEY);
    if (!raw) return start;
    try {
      const o = JSON.parse(raw);
      if (o && o.start === start && o.end === end && Number.isFinite(o.cursor)) return o.cursor;
    } catch {}
    return start;
  }
  function saveOrderCursor(start, end, cursor) {
    localStorage.setItem(ORDER_CURSOR_KEY, JSON.stringify({ start, end, cursor }));
  }

  // ===== 設定保存（級別）=====
  let autoSpeakQ = false;
  let quizMode = "order"; // order / random / weak
  function loadSettings() {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return;
    try {
      const s = JSON.parse(raw);
      autoSpeakQ = !!s.autoSpeakQ;
      if (s.quizMode === "order" || s.quizMode === "random" || s.quizMode === "weak") quizMode = s.quizMode;
    } catch {}
  }
  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ autoSpeakQ, quizMode }));
  }

  // ===== Block累計（このページ内の表示用・級別）=====
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

    // 横断（progress.js用）
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

  // ===== セッション =====
  let session = {
    active: false,
    answered: 0,
    correct: 0,
    limit: 10,
    start: 0,
    end: Math.max(0, words.length - 1)
  };

  let current = null;
  let answeredThisQuestion = false;
  let weakMode = false;

  let askedSet = new Set();
  let askedLog = [];
  let wrongMap = {};

  let orderCursor = 0;

  // ===== 設定折りたたみ＋要約 =====
  let settingsOpen = false;

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
      `（${summaryRangeText()}｜${session.limit}問｜${weakMode ? "弱点ON" : "弱点OFF"}｜モード:${modeText()}｜${LV}級）`;
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

  // ===== Block UI =====
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

  // ===== 結果画面ボタン（範囲を渡す）=====
  function getCurrentRangeFromInputs() {
    let s = Number(rangeStartEl.value) - 1;
    let e = Number(rangeEndEl.value) - 1;
    [s, e] = clampRange(s, e);
    return { s, e };
  }

  if (goStudyBlockBtn) {
    goStudyBlockBtn.addEventListener("click", () => {
      const { s, e } = getCurrentRangeFromInputs();
      location.href = `study.html?start=${s + 1}&end=${e + 1}`;
    });
  }

  if (goWeakReviewBtn) {
    goWeakReviewBtn.addEventListener("click", () => {
      const { s, e } = getCurrentRangeFromInputs();
      location.href = `quiz.html?start=${s + 1}&end=${e + 1}&mode=weak&weak=1&autostart=1`;
    });
  }

  // ===== 出題作成 =====
  function renderMeta(no) {
    const b = getBlockByNo(no);
    if (b) qMetaEl.textContent = `Block ${b.id}（${b.start}〜${b.end}）｜番号 ${no} / ${words.length}（${LV}級）`;
    else qMetaEl.textContent = `番号 ${no} / ${words.length}（${LV}級）`;
  }

  function getRangePool() {
    const [s, e] = clampRange(session.start, session.end);
    return { s, e };
  }

  // 4択（日本語を選ぶ）
  function makeChoices(correctWord, s, e) {
    const candidates = [];
    for (let i = s; i <= e; i++) {
      const w = words[i];
      if (w.en !== correctWord.en) candidates.push(w.ja);
    }
    const uniq = Array.from(new Set(candidates));
    const picked = shuffle(uniq).slice(0, 3);
    while (picked.length < 3) picked.push("（該当なし）");
    return shuffle([correctWord.ja, ...picked]);
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
    for (let i = s; i <= e; i++) if (!askedSet.has(words[i].en)) remain.push(i);
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

    for (const x of cand) if (!askedSet.has(words[x.i].en)) return x.i;
    return cand[0].i;
  }

  function pickCorrectIndex(s, e) {
    if (quizMode === "order") return pickIndex_order(s, e);
    if (quizMode === "random") return pickIndex_random(s, e);
    return pickIndex_weak(s, e);
  }

  function makeQuestion() {
    const { s, e } = getRangePool();
    let idx = pickCorrectIndex(s, e);

    // 弱点モードONなら、順番以外は弱点寄り
    if (weakMode && quizMode !== "order") {
      const weakIdxs = [];
      for (let i = s; i <= e; i++) if (getPoint(words[i].en) > 0) weakIdxs.push(i);
      if (weakIdxs.length > 0) {
        const remaining = weakIdxs.filter(i => !askedSet.has(words[i].en));
        const pool = remaining.length ? remaining : weakIdxs;
        idx = pool[Math.floor(Math.random() * pool.length)];
      }
    }

    askedSet.add(words[idx].en);

    const no = idx + 1;
    const b = getBlockByNo(no);
    const blockId = b ? Number(b.id) : 0;

    return {
      idx, no, blockId,
      en: words[idx].en,
      ja: words[idx].ja,
      choices: makeChoices(words[idx], s, e)
    };
  }

  // ===== 画面表示 =====
  function showPlayView() {
    playBox.style.display = "block";
    summaryBox.style.display = "none";
  }
  function showSummaryView() {
    playBox.style.display = "none";
    summaryBox.style.display = "block";
  }

  function renderStats() {
    statsEl.textContent = `今回：${session.answered}/${session.limit}（正解 ${session.correct}）`;
  }

  function updateWeakInfo() {
    weakInfoEl.textContent = `弱点数：${weakCount()}（弱点モード：${weakMode ? "ON" : "OFF"}）`;
  }

  function renderQuestion() {
    renderStats();
    updateWeakInfo();
    renderBlockStatsLine();
    updateSettingsSummary();

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
    resultEl.textContent = "";

    current = makeQuestion();
    questionEl.textContent = current.en;
    renderMeta(current.no);

    askedLog.push({ no: current.no, en: current.en, ja: current.ja, blockId: current.blockId });

    if (autoSpeakQ) speakEnglish(current.en);

    choicesEl.innerHTML = "";
    current.choices.forEach(text => {
      const btn = document.createElement("button");
      btn.textContent = text;
      btn.style.display = "block";
      btn.style.width = "100%";
      btn.style.margin = "8px 0";
      btn.addEventListener("click", () => handleChoice(text));
      choicesEl.appendChild(btn);
    });
  }

  function handleChoice(choiceText) {
    if (answeredThisQuestion) return;
    answeredThisQuestion = true;

    session.answered++;

    const correct = (choiceText === current.ja);
    if (correct) {
      session.correct++;
      resultEl.textContent = "⭕️ 正解！";
      const p = getPoint(current.en);
      if (p > 0) {
        setPoint(current.en, p - 1);
        saveWeakPoints();
      }
    } else {
      resultEl.textContent = `❌ 不正解。正解は「${current.ja}」`;
      setPoint(current.en, getPoint(current.en) + 2);
      saveWeakPoints();
      if (!wrongMap[current.en]) {
        wrongMap[current.en] = { no: current.no, en: current.en, ja: current.ja, blockId: current.blockId };
      }
    }

    if (current.blockId) addBlockResult(current.blockId, correct);

    renderStats();
    updateWeakInfo();
    renderBlockStatsLine();
    updateSettingsSummary();

    if (session.answered < session.limit) nextBtn.disabled = false;
    else finishSession();
  }

  function finishSession() {
    showSummaryView();

    finalScoreEl.textContent = `結果：${session.correct} / ${session.limit}`;

    const rangeText = (blockSelectEl.value === "all") ? "全範囲" : `Block ${blockSelectEl.value}`;
    finalBlockLineEl.textContent = `出題範囲：${rangeText}｜モード：${modeText()}｜${weakMode ? "弱点ON" : "弱点OFF"}｜${LV}級`;

    askedListEl.innerHTML = "";
    askedLog.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.no}｜${item.en} → ${item.ja}`;
      askedListEl.appendChild(li);
    });

    wrongListEl.innerHTML = "";
    const wrongArr = Object.values(wrongMap).sort((a, b) => a.no - b.no);
    if (wrongArr.length === 0) {
      const li = document.createElement("li");
      li.textContent = "間違いなし！";
      wrongListEl.appendChild(li);
    } else {
      wrongArr.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.no}｜${item.en} → ${item.ja}`;
        wrongListEl.appendChild(li);
      });
    }
  }

  // ===== イベント =====
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

  weakModeEl.addEventListener("change", () => {
    weakMode = !!weakModeEl.checked;
    updateWeakInfo();
    updateSettingsSummary();
  });

  clearWeakBtn.addEventListener("click", () => {
    if (!confirm("弱点をすべて消しますか？")) return;
    weakPoints = {};
    saveWeakPoints();
    updateWeakInfo();
  });

  nextBtn.addEventListener("click", () => {
    if (!answeredThisQuestion) {
      resultEl.textContent = "まず1つ選んでください。";
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

    weakMode = !!weakModeEl.checked;

    session.answered = 0;
    session.correct = 0;
    session.active = true;

    askedSet.clear();
    askedLog = [];
    wrongMap = {};

    if (quizMode === "order") orderCursor = loadOrderCursor(session.start, session.end);
    else orderCursor = session.start;

    closeSettings();
    showPlayView();
    renderQuestion();
  });

  resetBtn.addEventListener("click", () => {
    if (!confirm("今回の成績をリセットしますか？")) return;
    session.active = false;
    session.answered = 0;
    session.correct = 0;
    askedSet.clear();
    askedLog = [];
    wrongMap = {};
    showPlayView();
    renderQuestion();
  });

  backToSetupBtn.addEventListener("click", () => {
    showPlayView();
  });

  // 順番モードの「続き」をリセット（ボタンがある場合のみ）
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

  // ===== URLパラメータ反映（範囲・モード・弱点・自動開始）=====
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

    if (weakModeEl && weak === "1") {
      weakModeEl.checked = true;
      weakMode = true;
      updateWeakInfo();
    }

    renderBlockStatsLine();
    updateSettingsSummary();

    if (autostart === "1") setTimeout(() => startBtn.click(), 0);
  }

  // ===== 起動 =====
  loadWeakPoints();
  loadSettings();
  loadBlockStats();

  autoSpeakQEl.checked = !!autoSpeakQ;
  modeSelectEl.value = quizMode;

  renderBlockSelect();
  applySelectedBlockToRange();

  session.limit = Number(limitEl.value) || session.limit;
  weakMode = !!weakModeEl.checked;

  closeSettings();
  showPlayView();
  renderQuestion();

  applyQuery();
});
