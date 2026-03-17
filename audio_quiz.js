// audio_quiz.js
// 音声→意味4択クイズ
// - 英単語を音で聞いて、日本語の意味を4択で選ぶ
// - 正解時：ゴイモン おんかん +0.5 / ちえ +0.5
// - 先頭から / 続きから / ランダム / 苦手
// - 自動再生ON/OFF
// - 苦手機能あり
// - ゴイモン表示は折りたたみ式＋共通進化演出
// - 改修：問題切り替え時に playBox 先頭へ自動スクロール
// - 改修：高さブレを減らして連続で解きやすくする
// - 改修：正解でピンポン / 不正解でブッブー
// - 改修：正解時にゴイモン表示ptをその場更新

document.addEventListener("DOMContentLoaded", () => {
  function addLearningLog(isCorrect) {
    try {
      if (typeof window.zenshoLogAdd === "function") {
        window.zenshoLogAdd("audio_quiz", !!isCorrect);
      }
    } catch {}
  }

  const el = (id) => document.getElementById(id);

  const errorArea = el("errorArea");
  const levelBadge = el("levelBadge");

  const toggleGoimonBtn = el("toggleGoimon");
  const goimonCard = el("goimonCard");
  const evolutionNoticeBtn = el("evolutionNoticeBtn");

  const audioGoimonImage = el("audioGoimonImage");
  const audioGoimonName = el("audioGoimonName");
  const audioGoimonMeta = el("audioGoimonMeta");
  const audioGoimonSub = el("audioGoimonSub");

  const setupBox = el("setupBox");
  const playBox = el("playBox");
  const summaryBox = el("summaryBox");

  const blockSelect = el("blockSelect");
  const applyBlockBtn = el("applyBlock");
  const blockStats = el("blockStats");
  const rangeStart = el("rangeStart");
  const rangeEnd = el("rangeEnd");
  const limitCount = el("limitCount");
  const modeSelect = el("modeSelect");
  const autoPlay = el("autoPlay");
  const resetCursor = el("resetCursor");
  const setupInfo = el("setupInfo");
  const startBtn = el("startBtn");

  const stats = el("stats");
  const qMeta = el("qMeta");
  const speakBtn = el("speakBtn");
  const choices = el("choices");
  const result = el("result");
  const detail = el("detail");
  const nextBtn = el("nextBtn");
  const backBtn = el("backBtn");

  const summaryLine = el("summaryLine");
  const wrongEmpty = el("wrongEmpty");
  const wrongList = el("wrongList");
  const retryBtn = el("retryBtn");
  const summaryBackBtn = el("summaryBackBtn");

  function must(x, name) {
    if (!x) throw new Error(`audio_quiz.html に #${name} が見つかりません`);
  }

  try {
    [
      [errorArea, "errorArea"], [levelBadge, "levelBadge"],
      [toggleGoimonBtn, "toggleGoimon"], [goimonCard, "goimonCard"], [evolutionNoticeBtn, "evolutionNoticeBtn"],
      [audioGoimonImage, "audioGoimonImage"], [audioGoimonName, "audioGoimonName"], [audioGoimonMeta, "audioGoimonMeta"], [audioGoimonSub, "audioGoimonSub"],
      [setupBox, "setupBox"], [playBox, "playBox"], [summaryBox, "summaryBox"],
      [blockSelect, "blockSelect"], [applyBlockBtn, "applyBlock"], [blockStats, "blockStats"],
      [rangeStart, "rangeStart"], [rangeEnd, "rangeEnd"], [limitCount, "limitCount"],
      [modeSelect, "modeSelect"], [autoPlay, "autoPlay"], [resetCursor, "resetCursor"],
      [setupInfo, "setupInfo"], [startBtn, "startBtn"],
      [stats, "stats"], [qMeta, "qMeta"], [speakBtn, "speakBtn"], [choices, "choices"], [result, "result"], [detail, "detail"],
      [nextBtn, "nextBtn"], [backBtn, "backBtn"],
      [summaryLine, "summaryLine"], [wrongEmpty, "wrongEmpty"], [wrongList, "wrongList"], [retryBtn, "retryBtn"], [summaryBackBtn, "summaryBackBtn"]
    ].forEach(([x, n]) => must(x, n));
  } catch (e) {
    errorArea.innerHTML = `<div class="errorBox">${String(e.message || e)}</div>`;
    return;
  }

  const LV = String(window.ACTIVE_LEVEL || localStorage.getItem("zensho_level_v1") || "1");
  const WORDS = Array.isArray(window.WORDS) ? window.WORDS : [];
  const BLOCKS = Array.isArray(window.BLOCKS) ? window.BLOCKS : [];
  const GOIMON_UI_KEY = `zensho_audio_quiz_goimon_ui_v1_lv${LV}`;

  const WEAK_KEY = `zensho_audio_quiz_weak_v1_lv${LV}`;
  const CURSOR_KEY = `zensho_audio_quiz_cursor_v1_lv${LV}`;
  const SETTINGS_KEY = `zensho_audio_quiz_settings_v1_lv${LV}`;

  levelBadge.textContent = `現在：全商英検 ${LV}級（音声→意味クイズ）`;

  function showError(msg) {
    errorArea.innerHTML = `<div class="errorBox">${String(msg || "")}</div>`;
  }

  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  function saveSettings(obj) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ autoPlay: !!obj.autoPlay }));
  }

  function loadSettings() {
    const obj = safeParse(SETTINGS_KEY);
    return { autoPlay: !!obj?.autoPlay };
  }

  function clamp(n, min, max) {
    const x = Number(n);
    if (!Number.isFinite(x)) return min;
    return Math.max(min, Math.min(max, Math.floor(x)));
  }

  function norm(s) {
    return String(s || "").trim().toLowerCase();
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function scrollPlayToTop() {
    if (!playBox || playBox.classList.contains("hidden")) return;
    requestAnimationFrame(() => {
      playBox.scrollIntoView({
        behavior: "auto",
        block: "start"
      });
    });
  }

  function showSetup() {
    setupBox.classList.remove("hidden");
    playBox.classList.add("hidden");
    summaryBox.classList.add("hidden");
  }

  function showPlay() {
    setupBox.classList.add("hidden");
    playBox.classList.remove("hidden");
    summaryBox.classList.add("hidden");
    scrollPlayToTop();
  }

  function showSummary() {
    setupBox.classList.add("hidden");
    playBox.classList.add("hidden");
    summaryBox.classList.remove("hidden");
  }

  function speakEnglish(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text || ""));
    u.lang = "en-US";
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
  }

  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
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

  function getBlockByNo(no) {
    const n = Number(no);
    return BLOCKS.find(b => n >= Number(b.start) && n <= Number(b.end)) || null;
  }

  function getBlockById(id) {
    return BLOCKS.find(b => Number(b.id) === Number(id)) || null;
  }

  function renderBlockSelect() {
    blockSelect.innerHTML = "";
    const all = document.createElement("option");
    all.value = "all";
    all.textContent = "全範囲";
    blockSelect.appendChild(all);

    for (const b of BLOCKS) {
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
      rangeStart.value = "1";
      rangeEnd.value = String(Math.max(WORDS.length, 1));
      return;
    }
    const b = getBlockById(v);
    if (!b) return;
    rangeStart.value = String(b.start);
    rangeEnd.value = String(b.end);
  }

  function renderBlockStats() {
    const v = blockSelect.value;
    blockStats.textContent = (v === "all") ? "Block：全範囲" : `Block：${v}`;
  }

  function buildPool(startNo, endNo) {
    const s = clamp(startNo, 1, 999999);
    const e = clamp(endNo, 1, 999999);
    const lo = Math.min(s, e);
    const hi = Math.max(s, e);

    const pool = [];
    const seenEn = new Set();

    for (let i = 0; i < WORDS.length; i++) {
      const no = i + 1;
      if (no < lo || no > hi) continue;

      const en = String(WORDS[i]?.en || "").trim();
      const ja = String(WORDS[i]?.ja || "").trim();
      if (!en || !ja) continue;

      const enKey = norm(en);
      if (seenEn.has(enKey)) continue;
      seenEn.add(enKey);

      pool.push({
        no,
        en,
        ja,
        enKey,
        blockId: Number(getBlockByNo(no)?.id || 0)
      });
    }

    return pool;
  }

  function weakLoad() {
    const obj = safeParse(WEAK_KEY);
    return (obj && typeof obj === "object") ? obj : {};
  }

  function weakSave(obj) {
    localStorage.setItem(WEAK_KEY, JSON.stringify(obj));
  }

  function weakGetPoint(map, key) {
    const v = map[String(key)];
    return (typeof v === "number") ? v : 0;
  }

  function weakAddPoint(map, key, delta) {
    const k = String(key);
    const next = weakGetPoint(map, k) + Number(delta || 0);
    if (next <= 0) delete map[k];
    else map[k] = next;
  }

  function weakCount() {
    return Object.keys(weakLoad()).length;
  }

  function cursorRangeKey(startNo, endNo) {
    const s = clamp(startNo, 1, 999999);
    const e = clamp(endNo, 1, 999999);
    const lo = Math.min(s, e);
    const hi = Math.max(s, e);
    return `${lo}-${hi}`;
  }

  function loadCursor(startNo, endNo) {
    const obj = safeParse(CURSOR_KEY) || {};
    const k = cursorRangeKey(startNo, endNo);
    const v = obj[k];
    return Number.isFinite(v) ? v : 0;
  }

  function saveCursor(startNo, endNo, cursor) {
    const obj = safeParse(CURSOR_KEY) || {};
    const k = cursorRangeKey(startNo, endNo);
    obj[k] = Math.max(0, Number(cursor) || 0);
    localStorage.setItem(CURSOR_KEY, JSON.stringify(obj));
  }

  function updateSetupInfo() {
    const pool = buildPool(rangeStart.value, rangeEnd.value);
    const wc = weakCount();
    const c = loadCursor(rangeStart.value, rangeEnd.value);
    setupInfo.textContent = `この設定で出題可能：${pool.length}問｜保存済み苦手：${wc}問｜続き位置：${c + 1}問目から`;
  }

  let session = {
    active: false,
    mode: "head",
    pool: [],
    order: [],
    cursor: 0,
    limit: 10,
    answered: 0,
    correct: 0,
    startNo: 1,
    endNo: 100,
    autoPlay: false
  };

  let current = null;
  let answeredThis = false;
  let askedLog = [];
  let wrongLog = [];

  function modeLabel(m) {
    if (m === "head") return "先頭から";
    if (m === "continue") return "続きから";
    if (m === "random") return "ランダム";
    return "苦手";
  }

  function resetPlayUI() {
    answeredThis = false;
    result.textContent = "";
    detail.innerHTML = "";
    nextBtn.disabled = true;
    choices.innerHTML = "";
  }

  function renderStats() {
    stats.textContent = `今回：${session.answered}/${session.limit}（正解 ${session.correct}）`;
  }

  function renderMeta() {
    if (!current) {
      qMeta.textContent = "";
      return;
    }
    const b = getBlockByNo(current.no);
    const blockText = b ? `Block ${b.id}（${b.start}〜${b.end}）` : (current.blockId ? `Block ${current.blockId}` : "Block ?");
    qMeta.textContent = `${blockText}｜番号 ${current.no}｜モード：${modeLabel(session.mode)}｜${LV}級`;
  }

  function persistContinueCursor() {
    if (session.mode !== "continue") return;
    saveCursor(session.startNo, session.endNo, session.cursor);
  }

  function buildWeakOrder(pool) {
    const weakMap = weakLoad();
    const arr = [];
    for (let i = 0; i < pool.length; i++) {
      const p = weakGetPoint(weakMap, pool[i].enKey);
      if (p > 0) arr.push({ i, p, no: pool[i].no });
    }
    arr.sort((a, b) => (b.p - a.p) || (a.no - b.no));
    return arr.map(x => x.i);
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

    if (session.answered >= session.limit) {
      finishSession(false);
      return;
    }

    current = pickNextQuestion();
    if (!current) {
      finishSession(session.mode === "weak");
      return;
    }

    resetPlayUI();
    renderStats();
    renderMeta();
    renderEvolutionNotice();

    const choiceList = buildChoices(current, session.pool);
    current.choiceList = choiceList;

    for (const ja of choiceList) {
      const btn = document.createElement("button");
      btn.textContent = ja;
      btn.addEventListener("click", () => {
        ensureAudioReady();
        handleChoice(ja, btn);
      });
      choices.appendChild(btn);
    }

    scrollPlayToTop();

    if (session.autoPlay) {
      try { speakEnglish(current.en); } catch {}
    }
  }

  function buildChoices(current, pool) {
    const correct = current.ja;
    const used = new Set([norm(correct)]);
    const wrongs = [];

    const candidates = shuffleArray(pool.filter(x => x.enKey !== current.enKey));
    for (const item of candidates) {
      const jaKey = norm(item.ja);
      if (used.has(jaKey)) continue;
      used.add(jaKey);
      wrongs.push(item.ja);
      if (wrongs.length >= 3) break;
    }

    if (wrongs.length < 3) {
      const more = shuffleArray(WORDS);
      for (const item of more) {
        const ja = String(item?.ja || "").trim();
        if (!ja) continue;
        const jaKey = norm(ja);
        if (used.has(jaKey)) continue;
        used.add(jaKey);
        wrongs.push(ja);
        if (wrongs.length >= 3) break;
      }
    }

    return shuffleArray([correct, ...wrongs.slice(0, 3)]);
  }

  function handleChoice(selectedJa, clickedBtn) {
    if (answeredThis) return;
    answeredThis = true;

    session.answered++;
    const isCorrect = norm(selectedJa) === norm(current.ja);
    addLearningLog(isCorrect);

    const btns = [...choices.querySelectorAll("button")];
    for (const b of btns) {
      if (norm(b.textContent) === norm(current.ja)) b.classList.add("correct");
      b.disabled = true;
    }
    if (!isCorrect && clickedBtn) clickedBtn.classList.add("wrong");

    const weakMap = weakLoad();

    if (isCorrect) {
      session.correct++;
      result.innerHTML = `<span class="ok">⭕️ 正解！</span>`;
      playCorrectSound();

      try {
        if (window.GoimonUI && typeof window.GoimonUI.addAudioMeaningCorrect === "function") {
          window.GoimonUI.addAudioMeaningCorrect();
        }
      } catch {}

      if (typeof window.renderAudioGoimonMini === "function") {
        window.renderAudioGoimonMini();
      }

      weakAddPoint(weakMap, current.enKey, -1);
    } else {
      result.innerHTML = `<span class="ng">❌ 不正解。</span>`;
      playWrongSound();
      weakAddPoint(weakMap, current.enKey, +1);
    }

    weakSave(weakMap);
    updateSetupInfo();

    detail.innerHTML = `
      <div class="detailCard">
        <div class="detailTitle">答えの単語</div>
        <div class="detailMain mono">${escapeHtml(current.en)}</div>
        <div class="detailSub">意味：${escapeHtml(current.ja)}</div>
      </div>
    `;

    askedLog.push({
      no: current.no,
      en: current.en,
      ja: current.ja,
      chosen: selectedJa,
      isCorrect
    });
    if (!isCorrect) wrongLog.push(askedLog[askedLog.length - 1]);

    renderStats();
    renderEvolutionNotice();
    nextBtn.disabled = false;
  }

  function finishSession(autoWeakEnd) {
    showSummary();
    const tail = (session.mode === "weak" && autoWeakEnd) ? "（この回の苦手出題が終わりました）" : "";
    summaryLine.textContent = `結果：${session.correct} / ${session.answered}（${modeLabel(session.mode)}｜範囲 ${session.startNo}〜${session.endNo}｜${LV}級）${tail}`;

    wrongList.innerHTML = "";

    if (wrongLog.length === 0) {
      wrongEmpty.classList.remove("hidden");
      return;
    }
    wrongEmpty.classList.add("hidden");

    for (const w of wrongLog) {
      const div = document.createElement("div");
      div.className = "wrongRow";
      div.innerHTML = `
        <div><span class="mono">${escapeHtml(w.en)}</span></div>
        <div>あなたの選択：${escapeHtml(w.chosen)}</div>
        <div>正しい意味：${escapeHtml(w.ja)}</div>
      `;
      wrongList.appendChild(div);
    }
  }

  function startSession() {
    const startNo = clamp(rangeStart.value, 1, 999999);
    const endNo = clamp(rangeEnd.value, 1, 999999);
    let limit = clamp(limitCount.value, 1, 999999);
    const pool = buildPool(startNo, endNo);

    if (pool.length < 4) {
      showError("この範囲では4択を作るのに十分な単語数がありません。範囲を広げてください。");
      return;
    }

    session.startNo = startNo;
    session.endNo = endNo;
    session.pool = pool;
    session.mode = ["head", "continue", "random", "weak"].includes(modeSelect.value) ? modeSelect.value : "head";
    session.autoPlay = !!autoPlay.checked;
    session.answered = 0;
    session.correct = 0;
    session.active = true;

    if (session.mode === "weak") {
      session.order = buildWeakOrder(pool);
      if (session.order.length === 0) {
        showError("苦手モードですが、この範囲内に保存済み苦手がありません。");
        return;
      }
      session.order = shuffleArray(session.order);
      session.cursor = 0;
    } else {
      session.order = [...Array(pool.length)].map((_, i) => i);

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

    askedLog = [];
    wrongLog = [];
    errorArea.innerHTML = "";
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

  function renderAudioQuizGoimonMini() {
    try {
      if (!window.GoimonUI || typeof window.GoimonUI.loadCurrent !== "function") return;
      const g = window.GoimonUI.loadCurrent();
      if (!g) return;

      const name = (typeof window.GoimonUI.getGoimonPrimaryName === "function")
        ? window.GoimonUI.getGoimonPrimaryName(g)
        : "ゴイモン";

      const desc = (typeof window.GoimonUI.getDisplayDescription === "function")
        ? window.GoimonUI.getDisplayDescription(g)
        : "学習に応じて成長します。";

      const pointText = (typeof window.GoimonUI.formatPoint === "function")
        ? window.GoimonUI.formatPoint(g.totalPoints || 0)
        : String(g.totalPoints || 0);

      audioGoimonImage.src = g.imageKey || "images/goimon/goimon_egg.png";
      audioGoimonImage.alt = name;
      audioGoimonName.textContent = name;
      audioGoimonMeta.textContent = `Lv ${g.level} / ${pointText} pt`;
      audioGoimonSub.textContent = desc;
    } catch {}
  }

  window.renderAudioGoimonMini = renderAudioQuizGoimonMini;

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
            renderAudioQuizGoimonMini();
            renderEvolutionNotice();
          }
        });
        return;
      }

      if (window.GoimonUI && typeof window.GoimonUI.playPendingEvolutionSequence === "function") {
        window.GoimonUI.playPendingEvolutionSequence({
          onComplete: () => {
            renderAudioQuizGoimonMini();
            renderEvolutionNotice();
          }
        });
        return;
      }

      if (window.GoimonUI && typeof window.GoimonUI.confirmEvolution === "function") {
        window.GoimonUI.confirmEvolution();
        renderAudioQuizGoimonMini();
        renderEvolutionNotice();
      }
    } catch (e) {
      console.warn("openSharedEvolution failed:", e);
    }
  }

  blockSelect.addEventListener("change", renderBlockStats);
  applyBlockBtn.addEventListener("click", () => {
    applySelectedBlockToRange();
    updateSetupInfo();
  });

  rangeStart.addEventListener("input", updateSetupInfo);
  rangeEnd.addEventListener("input", updateSetupInfo);
  limitCount.addEventListener("input", updateSetupInfo);

  autoPlay.addEventListener("change", () => {
    saveSettings({ autoPlay: !!autoPlay.checked });
  });

  resetCursor.addEventListener("click", () => {
    saveCursor(rangeStart.value, rangeEnd.value, 0);
    alert("「続きから」の開始位置をリセットしました。");
    updateSetupInfo();
  });

  startBtn.addEventListener("click", startSession);

  speakBtn.addEventListener("click", () => {
    if (!current) return;
    ensureAudioReady();
    speakEnglish(current.en);
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

  evolutionNoticeBtn.addEventListener("click", openSharedEvolution);

  function init() {
    if (!Array.isArray(WORDS) || WORDS.length === 0) {
      showError("WORDS が読み込めていません。words_1kyu.js / words_2kyu.js の読み込みを確認してください。");
      return;
    }

    if (window.GoimonUI && typeof window.GoimonUI.ensureEvolutionUIReady === "function") {
      window.GoimonUI.ensureEvolutionUIReady();
    }

    renderBlockSelect();
    renderBlockStats();

    rangeStart.value = "1";
    rangeEnd.value = String(Math.max(WORDS.length, 1));

    const settings = loadSettings();
    autoPlay.checked = !!settings.autoPlay;

    updateSetupInfo();
    renderGoimonVisibility();
    renderAudioQuizGoimonMini();
    renderEvolutionNotice();
    showSetup();
  }

  init();
});
