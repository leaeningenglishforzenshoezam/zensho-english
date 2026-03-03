// quiz_jaen.js（日→英）完全版：Block＋3モード＋順番続き＋順番リセット＋結果画面＋結果ボタン＋URLパラメータ＋「級ごとに保存」対応
// ★追加：正解=緑/不正解=赤、正解ピンポン/不正解ブッブー、1問1回だけ押せる（連打防止）

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

  // ===== 保存キー（日→英専用）（★級ごとに分離）=====
  const WEAK_KEY = `zensho_quiz_weak_points_jaen_v3_lv${LV}`;
  const ORDER_CURSOR_KEY = `zensho_quiz_order_cursor_jaen_v2_lv${LV}`;
  const SETTINGS_KEY = `zensho_quiz_settings_jaen_v2_lv${LV}`;
  const BLOCK_STATS_KEY = `zensho_block_stats_jaen_v2_lv${LV}`;

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
  const resetOrderBtn = document.getElementById("resetOrderCursor");

  const playBox = document.getElementById("playBox");
  const summaryBox = document.getElementById("summaryBox");
  const finalScoreEl = document.getElementById("finalScore");
  const finalBlockLineEl = document.getElementById("finalBlockLine");
  const askedListEl = document.getElementById("askedList");
  const wrongListEl = document.getElementById("wrongList");
  const backToSetupBtn = document.getElementById("backToSetup");

  const goStudyBlockBtn = document.getElementById("goStudyBlock");
  const goWeakReviewBtn = document.getElementById("goWeakReview");

  // ===== 安全チェック =====
  function must(el, name) {
    if (!el) throw new Error(`quiz_jaen.html に #${name} が見つかりません`);
  }
  [
    [statsEl,"stats"],[qMetaEl,"qMeta"],[questionEl,"question"],[choicesEl,"choices"],[resultEl,"result"],
    [nextBtn,"nextQ"],[startBtn,"startTest"],[resetBtn,"resetQuiz"],
    [rangeStartEl,"rangeStart"],[rangeEndEl,"rangeEnd"],[limitEl,"limitCount"],
    [blockSelectEl,"blockSelect"],[applyBlockBtn,"applyBlock"],[blockStatsEl,"blockStats"],
    [weakModeEl,"weakMode"],[clearWeakBtn,"clearWeak"],[weakInfoEl,"weakInfo"],
    [speakQBtn,"speakQ"],[autoSpeakQEl,"autoSpeakQ"],
    [toggleSettingsBtn,"toggleSettings"],[settingsArea,"settingsArea"],[settingsSummaryEl,"settingsSummary"],
    [modeSelectEl,"modeSelect"],[resetOrderBtn,"resetOrderCursor"],
    [playBox,"playBox"],[summaryBox,"summaryBox"],
    [finalScoreEl,"finalScore"],[finalBlockLineEl,"finalBlockLine"],
    [askedListEl,"askedList"],[wrongListEl,"wrongList"],[backToSetupBtn,"backToSetup"],
    [goStudyBlockBtn,"goStudyBlock"],[goWeakReviewBtn,"goWeakReview"],
  ].forEach(([el,n]) => must(el,n));

  // ===== 音声（英語）=====
  function speakEnglish(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  // ===== 効果音（ファイル不要）=====
  let _audioCtx = null;
  function getAudioCtx() {
    if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return _audioCtx;
  }
  function ensureAudioReady() {
    // iPhone等は「ユーザー操作後に resume」が必要なことがある
    try {
      const ctx = getAudioCtx();
      if (ctx.state === "suspended") ctx.resume();
    } catch {}
  }

  // ピンポン（高い音2回）
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

  // ブッブー（低い音）
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
    document.querySelectorAll("#choices button").forEach(b => {
      if (current && b.textContent === current.en) b.classList.add("correct");
    });
  }

  // ===== Utility =====
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

  // ===== 弱点ポイント（日→英）=====
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

  // ===== 順番モード「続き」保存（日→英）=====
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

  // ===== 設定保存（日→英）=====
  let autoSpeakQ = false; // 解答後に正解を読む
  let quizMode = "order"; // order / random / weak
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

  // ===== Block累計（表示用）=====
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

    // ===== ここから追加：横断の共通記録（レベル別）=====
    const lv = window.ACTIVE_LEVEL || "1";
    const GLOBAL_BLOCK_KEY = `zensho_block_global_lv${lv}_v1`;
    const g = JSON.parse(localStorage.getItem(GLOBAL_BLOCK_KEY) || '{"byBlock":{}}');
    const k2 = String(blockId);
    if (!g.byBlock[k2]) g.byBlock[k2] = { studyDone: 0, quizAttempted: 0, quizCorrect: 0, quizAttemptedJaEn: 0, quizCorrectJaEn: 0 };
    g.byBlock[k2].quizAttemptedJaEn += 1;
    if (isCorrect) g.byBlock[k2].quizCorrectJaEn += 1;
    localStorage.setItem(GLOBAL_BLOCK_KEY, JSON.stringify(g));
    // ===== 追加ここまで =====
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
  let askedLog = [];   // {no, ja, en, blockId}
  let wrongMap = {};   // {en: {no, ja, en, blockId}}

  let orderCursor = 0;

  // ===== 表示切り替え =====
  function showPlayView() {
    playBox.style.display = "block";
    summaryBox.style.display = "none";
  }
  function showSummaryView() {
    playBox.style.display = "none";
    summaryBox.style.display = "block";
  }

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

  // ===== 順番続きリセット =====
  resetOrderBtn.addEventListener("click", () => {
    if (!confirm("順番モードの進捗を最初からに戻しますか？")) return;
    let s = Number(rangeStartEl.value) - 1;
    let e = Number(rangeEndEl.value) - 1;
    [s, e] = clampRange(s, e);
    saveOrderCursor(s, e, s);
    alert("順番モードを最初からにリセットしました。");
  });

  // ===== 結果画面ボタン =====
  function getCurrentRangeFromInputs() {
    let s = Number(rangeStartEl.value) - 1;
    let e = Number(rangeEndEl.value) - 1;
    [s, e] = clampRange(s, e);
    return { s, e };
  }

  goStudyBlockBtn.addEventListener("click", () => {
    const { s, e } = getCurrentRangeFromInputs();
    location.href = `study.html?start=${s + 1}&end=${e + 1}`;
  });

  goWeakReviewBtn.addEventListener("click", () => {
    const { s, e } = getCurrentRangeFromInputs();
    location.href = `quiz_jaen.html?start=${s + 1}&end=${e + 1}&mode=weak&weak=1&autostart=1`;
  });

  // ===== 出題作成（日→英）=====
  function renderMeta(no) {
    const b = getBlockByNo(no);
    if (b) qMetaEl.textContent = `Block ${b.id}（${b.start}〜${b.end}）｜番号 ${no} / ${words.length}（${LV}級）`;
    else qMetaEl.textContent = `番号 ${no} / ${words.length}（${LV}級）`;
  }

  function renderStats() {
    statsEl.textContent = `今回：${session.answered}/${session.limit}（正解 ${session.correct}）`;
  }

  function updateWeakInfo() {
    weakInfoEl.textContent = `弱点数：${weakCount()}（弱点モード：${weakMode ? "ON" : "OFF"}）`;
  }

  function getRangePool() {
    const [s, e] = clampRange(session.start, session.end);
    return { s, e };
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
    let idx = pickCorrectIndex(s, e);

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

  function finishSession() {
    showSummaryView();

    finalScoreEl.textContent = `結果：${session.correct} / ${session.limit}`;
    const rangeText = (blockSelectEl.value === "all") ? "全範囲" : `Block ${blockSelectEl.value}`;
    finalBlockLineEl.textContent = `出題範囲：${rangeText}｜モード：${modeText()}｜${weakMode ? "弱点ON" : "弱点OFF"}｜${LV}級`;

    askedListEl.innerHTML = "";
    askedLog.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.no}｜${item.ja} → ${item.en}`;
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
        li.textContent = `${item.no}｜${item.ja} → ${item.en}`;
        wrongListEl.appendChild(li);
      });
    }
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
    questionEl.textContent = current.ja;
    renderMeta(current.no);

    askedLog.push({ no: current.no, ja: current.ja, en: current.en, blockId: current.blockId });

    choicesEl.innerHTML = "";
    current.choices.forEach(text => {
      const btn = document.createElement("button");
      btn.textContent = text;

      // ★クリックで効果音を鳴らせるように準備してから判定
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

    session.answered++;

    const correct = (choiceText === current.en);

    // ★見た目（色）＋効果音
    if (correct) {
      clickedBtn.classList.add("correct");
      playCorrectSound();

      session.correct++;
      resultEl.textContent = "⭕️ 正解！";

      const p = getPoint(current.en);
      if (p > 0) {
        setPoint(current.en, p - 1);
        saveWeakPoints();
      }
    } else {
      clickedBtn.classList.add("wrong");
      playWrongSound();

      resultEl.textContent = `❌ 不正解。正解は「${current.en}」`;

      // 不正解のとき、正解のボタンも緑で見せる
      markCorrectButtonGreen();

      setPoint(current.en, getPoint(current.en) + 2);
      saveWeakPoints();

      if (!wrongMap[current.en]) {
        wrongMap[current.en] = { no: current.no, ja: current.ja, en: current.en, blockId: current.blockId };
      }
    }

    // ★連打防止：全部押せなくする
    lockChoices();

    if (window.GlobalStats && current.blockId) {
      window.GlobalStats.addQuizJaEn(current.blockId, correct);
    }
    if (current.blockId) addBlockResult(current.blockId, correct);

    // ★あなたの仕様のまま：解答後に英語を読む
    if (autoSpeakQ) speakEnglish(current.en);

    renderStats();
    updateWeakInfo();
    renderBlockStatsLine();
    updateSettingsSummary();

    if (session.answered >= session.limit) {
      finishSession();
    } else {
      nextBtn.disabled = false;
    }
  }

  // ===== イベント =====
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

    if (quizMode === "order") {
      orderCursor = loadOrderCursor(session.start, session.end);
    } else {
      orderCursor = session.start;
    }

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

    updateSettingsSummary();

    if (autostart === "1") {
      setTimeout(() => startBtn.click(), 0);
    }
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

  updateWeakInfo();
  closeSettings();
  showPlayView();
  renderQuestion();

  applyQuery();
});
