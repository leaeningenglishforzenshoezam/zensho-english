// study.js（暗記ページ）アクセントページ風ゴイモンミニカード版
// ★暗記は 1語完了ごとに ちえ +0.1
// ★ゴイモンは通常は閉じた状態
// ★進化条件達成時は「あれ、ゴイモンの様子が…！？」を表示
// ★進化演出は goimon.js の共通 overlay を使用

document.addEventListener("DOMContentLoaded", () => {
  const words = window.WORDS || [];
  const blocks = window.BLOCKS || [];
  const lv = window.ACTIVE_LEVEL || "1";

  const GLOBAL_BLOCK_KEY = `zensho_block_global_lv${lv}_v1`;
  const STATE_KEY = `zensho_study_state_lv${lv}_v1`;
  const CURSOR_KEY = `zensho_study_cursor_v2_lv${lv}`;
  const WEAK_ENJA_KEY = `zensho_quiz_weak_points_enja_v2_lv${lv}`;
  const STUDY_UI_KEY = `zensho_study_ui_v1_lv${lv}`;

  const wordEl = document.getElementById("word");
  const meaningEl = document.getElementById("meaning");

  const speakBtn = document.getElementById("speakBtn");
  const autoSpeakEl = document.getElementById("autoSpeak");
  const unifiedBtn = document.getElementById("unifiedBtn");

  const progressEl = document.getElementById("progress");
  const randomCountEl = document.getElementById("randomCount");

  const targetInput = document.getElementById("targetInput");
  const targetStatus = document.getElementById("targetStatus");
  const resetBtn = document.getElementById("resetBtn");

  const blockSelectEl = document.getElementById("blockSelect");
  const applyBlockBtn = document.getElementById("applyBlock");
  const orderModeEl = document.getElementById("orderMode");
  const blockInfoEl = document.getElementById("blockInfo");
  const blockRateEl = document.getElementById("blockRate");
  const modeInfoEl = document.getElementById("modeInfo");

  const levelBadgeEl = document.getElementById("levelBadge");

  const goimonToggleBtn = document.getElementById("goimonToggleBtn");
  const goimonPanel = document.getElementById("goimonPanel");
  const evolutionNoticeBtn = document.getElementById("evolutionNoticeBtn");

  const studyGoimonStageEl = document.getElementById("studyGoimonStage");
  const studyGoimonImageEl = document.getElementById("studyGoimonImage");
  const studyGoimonNameEl = document.getElementById("studyGoimonName");
  const studyGoimonMetaEl = document.getElementById("studyGoimonMeta");
  const studyGoimonDescEl = document.getElementById("studyGoimonDesc");

  function clamp(n, min, max) {
    n = Math.floor(Number(n));
    if (!Number.isFinite(n)) n = min;
    return Math.max(min, Math.min(max, n));
  }

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

  function speakEnglish(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function getBlockByNo(no) {
    const n = Number(no);
    return blocks.find(b => n >= Number(b.start) && n <= Number(b.end)) || null;
  }

  function loadStudyUiState() {
    return safeParse(STUDY_UI_KEY) || {
      goimonOpen: false
    };
  }

  function saveStudyUiState() {
    saveJson(STUDY_UI_KEY, uiState);
  }

  function loadGlobal() {
    return safeParse(GLOBAL_BLOCK_KEY) || { byBlock: {} };
  }

  function saveGlobal(obj) {
    localStorage.setItem(GLOBAL_BLOCK_KEY, JSON.stringify(obj));
  }

  function addStudyDone(blockId) {
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
        quizCorrectJaEn: 0
      };
    }
    g.byBlock[k].studyDone += 1;
    saveGlobal(g);
  }

  function getBlockGlobalText(blockId) {
    const g = loadGlobal();
    const s = g.byBlock?.[String(blockId)];
    if (!s) return "記録なし";
    const enja = (s.quizAttempted > 0) ? `${Math.round((s.quizCorrect / s.quizAttempted) * 100)}%（${s.quizCorrect}/${s.quizAttempted}）` : "未";
    const jaen = (s.quizAttemptedJaEn > 0) ? `${Math.round((s.quizCorrectJaEn / s.quizAttemptedJaEn) * 100)}%（${s.quizCorrectJaEn}/${s.quizAttemptedJaEn}）` : "未";
    return `暗記完了:${s.studyDone}回｜英→日:${enja}｜日→英:${jaen}`;
  }

  function loadWeakEnja() {
    const obj = safeParse(WEAK_ENJA_KEY);
    return (obj && typeof obj === "object") ? obj : {};
  }

  function getWeakPoint(enLower) {
    const obj = loadWeakEnja();
    const v = obj[String(enLower || "").trim().toLowerCase()];
    return typeof v === "number" ? v : 0;
  }

  let state = safeParse(STATE_KEY) || {
    idx: 0,
    randomCount: 0,
    autoSpeak: false,
    rangeStart: 1,
    rangeEnd: Math.max(1, words.length),
    meaningShown: false,
    studyFinishedCount: 0,
    orderMode: "continue",
    weakCursor: 0
  };

  let uiState = loadStudyUiState();

  if (!Number.isFinite(state.studyFinishedCount)) state.studyFinishedCount = 0;
  if (!state.orderMode) state.orderMode = "continue";
  if (!Number.isFinite(state.weakCursor)) state.weakCursor = 0;

  (function applyQueryRange() {
    const p = new URLSearchParams(location.search);
    const st = Number(p.get("start"));
    const ed = Number(p.get("end"));
    if (Number.isFinite(st) && st >= 1) state.rangeStart = st;
    if (Number.isFinite(ed) && ed >= 1) state.rangeEnd = ed;
  })();

  function getRange0() {
    const s = clamp(state.rangeStart, 1, Math.max(1, words.length)) - 1;
    const e = clamp(state.rangeEnd, 1, Math.max(1, words.length)) - 1;
    return (s <= e) ? { s, e } : { s: e, e: s };
  }

  function rangeKey() {
    const r = getRange0();
    return `${r.s}-${r.e}`;
  }

  function loadCursor(rangeKeyStr) {
    const obj = safeParse(CURSOR_KEY) || {};
    const v = obj[rangeKeyStr];
    return Number.isFinite(v) ? v : null;
  }

  function saveCursor(rangeKeyStr, idx) {
    const obj = safeParse(CURSOR_KEY) || {};
    obj[rangeKeyStr] = idx;
    localStorage.setItem(CURSOR_KEY, JSON.stringify(obj));
  }

  function saveState() {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
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

    const r = getRange0();
    const startNo = r.s + 1;
    const endNo = r.e + 1;
    const blk = blocks.find(b => Number(b.start) === startNo && Number(b.end) === endNo);
    blockSelectEl.value = blk ? String(blk.id) : "all";

    updateBlockInfo();
  }

  function applySelectedBlockToRange() {
    const v = blockSelectEl.value;
    if (v === "all") {
      state.rangeStart = 1;
      state.rangeEnd = words.length;
    } else {
      const b = blocks.find(x => String(x.id) === String(v));
      if (b) {
        state.rangeStart = Number(b.start);
        state.rangeEnd = Number(b.end);
      }
    }
    state.meaningShown = false;
    state.weakCursor = 0;
    syncIndexToMode(true);
    saveState();
    updateBlockInfo();
    renderCurrent();
  }

  function updateBlockInfo() {
    const r = getRange0();
    const startNo = r.s + 1;
    const endNo = r.e + 1;

    const size = endNo - startNo + 1;
    blockInfoEl.textContent = `学習範囲：${startNo}〜${endNo}（${size}語）`;

    const blk = blocks.find(b => Number(b.start) === startNo && Number(b.end) === endNo);
    if (blk) {
      blockRateEl.textContent = `このBlockの累計：${getBlockGlobalText(blk.id)}`;
    } else {
      blockRateEl.textContent = "";
    }

    if (state.orderMode === "weak") {
      const weakOrder = buildWeakOrder();
      modeInfoEl.textContent = weakOrder.length
        ? `苦手順：この範囲に ${weakOrder.length} 語の苦手があります。`
        : "苦手順：この範囲に苦手がないため、先頭語を表示しています。";
    } else if (state.orderMode === "continue") {
      modeInfoEl.textContent = "続きから：前回の続き位置を使います。";
    } else if (state.orderMode === "start") {
      modeInfoEl.textContent = "先頭から：この範囲の先頭から学習します。";
    } else {
      modeInfoEl.textContent = "ランダム：この範囲からランダムに出題します。";
    }
  }

  function buildWeakOrder() {
    const r = getRange0();
    const arr = [];

    for (let i = r.s; i <= r.e; i++) {
      const en = String(words[i]?.en || "").trim().toLowerCase();
      const p = getWeakPoint(en);
      if (p > 0) {
        arr.push({ idx: i, point: p, no: i + 1 });
      }
    }

    arr.sort((a, b) => {
      if (b.point !== a.point) return b.point - a.point;
      return a.no - b.no;
    });

    return arr.map(x => x.idx);
  }

  function pickRandomIndex() {
    const r = getRange0();
    return r.s + Math.floor(Math.random() * (r.e - r.s + 1));
  }

  function syncIndexToMode(resetWeakCursor = false) {
    const r = getRange0();

    if (resetWeakCursor) state.weakCursor = 0;

    if (state.orderMode === "start") {
      state.idx = r.s;
      return;
    }

    if (state.orderMode === "continue") {
      const saved = loadCursor(rangeKey());
      state.idx = Number.isFinite(saved) ? clamp(saved, r.s, r.e) : r.s;
      return;
    }

    if (state.orderMode === "random") {
      state.idx = pickRandomIndex();
      return;
    }

    if (state.orderMode === "weak") {
      const weakOrder = buildWeakOrder();
      if (weakOrder.length > 0) {
        state.weakCursor = clamp(state.weakCursor, 0, weakOrder.length - 1);
        state.idx = weakOrder[state.weakCursor];
      } else {
        state.idx = r.s;
      }
    }
  }

  function renderProgress() {
    const r = getRange0();
    const total = (r.e - r.s + 1);
    const pos = clamp(state.idx, r.s, r.e) - r.s + 1;

    progressEl.textContent =
      `範囲内の位置：${pos} / ${total}（全体番号：${state.idx + 1} / ${words.length}）｜完了語数：${state.studyFinishedCount}｜モード：${modeLabel(state.orderMode)}`;

    if (state.orderMode === "random") {
      randomCountEl.style.display = "block";
      randomCountEl.textContent = `ランダム学習回数：${state.randomCount}`;
    } else {
      randomCountEl.style.display = "none";
    }

    const target = Number(targetInput.value) || 0;
    if (state.orderMode === "random" && target > 0 && state.randomCount >= target) {
      targetStatus.style.display = "block";
    } else {
      targetStatus.style.display = "none";
    }
  }

  function modeLabel(mode) {
    if (mode === "start") return "先頭から";
    if (mode === "continue") return "続きから";
    if (mode === "random") return "ランダム";
    return "苦手順";
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

  function renderEvolutionNotice() {
    if (!window.GoimonUI) return;
    window.GoimonUI.renderEvolutionNoticeButton("evolutionNoticeBtn");
  }

  function renderStudyGoimonMini() {
    const g = window.GoimonUI?.loadCurrent?.();
    if (!g) return;

    const stageMap = {
      egg: "たまご期",
      child: "幼体",
      growth: "成長体",
      mid: "中級体",
      final: "上級体"
    };

    const descMap = {
      nagomi: "バランスよく育つ、やさしい守護神獣タイプ。",
      hirameki: "知性とひらめきが伸びる、啓示神獣タイプ。",
      tsumugi: "ことばと感情があふれる、表現神獣タイプ。",
      yomitoki: "読む・見抜く力が育つ、解読神獣タイプ。",
      shirabe: "音・響き・共鳴をまとう、音楽神獣タイプ。",
      hibiki: "知性と音感が響き合う、共鳴神獣タイプ。",
      kotonoha: "ことばと文脈を束ねる、言霊神獣タイプ。",
      mr_uno: "特別に解放された、学びを導く隠しルート。"
    };

    const stageLabel = stageMap[g.stage] || "たまご期";
    const displayName = window.GoimonUI?.getGoimonPrimaryName
      ? window.GoimonUI.getGoimonPrimaryName(g)
      : (g.nickname || "ゴイモン");

    const pt = Number(g.totalPoints || 0);
    const ptText = Number.isInteger(pt) ? String(pt) : pt.toFixed(1);

    if (studyGoimonStageEl) studyGoimonStageEl.textContent = stageLabel;
    if (studyGoimonNameEl) studyGoimonNameEl.textContent = displayName;
    if (studyGoimonMetaEl) studyGoimonMetaEl.textContent = `Lv ${g.level} / ${ptText} pt`;
    if (studyGoimonDescEl) {
      studyGoimonDescEl.textContent =
        g.stage === "egg" && g.specialRoute === "mr_uno"
          ? "隠し分岐を選択中です。次の進化から MR.UNO として育ちます。"
          : (descMap[g.type] || "学習に応じて成長し、進化していきます。");
    }

    if (studyGoimonImageEl) {
      studyGoimonImageEl.src = g.imageKey || "images/goimon/goimon_egg.png";
      studyGoimonImageEl.alt = displayName;
    }

    renderEvolutionNotice();
  }

  function renderCurrent() {
    if (!words.length) {
      wordEl.textContent = "単語データがありません";
      meaningEl.textContent = "";
      return;
    }

    const r = getRange0();
    state.idx = clamp(state.idx, r.s, r.e);

    const w = words[state.idx];
    wordEl.textContent = w.en;

    if (state.meaningShown) {
      meaningEl.classList.remove("meaningInvisible");
      meaningEl.textContent = w.ja;
      unifiedBtn.textContent = "次へ";
    } else {
      meaningEl.classList.add("meaningInvisible");
      meaningEl.textContent = w.ja;
      unifiedBtn.textContent = "意味を見る";
    }

    autoSpeakEl.checked = !!state.autoSpeak;
    orderModeEl.value = state.orderMode;
    updateBlockInfo();
    renderProgress();
    renderGoimonPanelState();
    renderStudyGoimonMini();
  }

  function goNext() {
    const r = getRange0();

    if (state.orderMode === "random") {
      state.idx = pickRandomIndex();
      state.randomCount += 1;
    } else if (state.orderMode === "weak") {
      const weakOrder = buildWeakOrder();
      if (weakOrder.length > 0) {
        state.weakCursor += 1;
        if (state.weakCursor >= weakOrder.length) state.weakCursor = 0;
        state.idx = weakOrder[state.weakCursor];
      } else {
        state.idx = r.s;
      }
    } else {
      state.idx += 1;
      if (state.idx > r.e) state.idx = r.s;

      if (state.orderMode === "continue") {
        saveCursor(rangeKey(), state.idx);
      }
    }

    state.meaningShown = false;
    saveState();
    renderCurrent();
  }

  function addStudyProgressToGoimon() {
    try {
      if (window.GoimonUI && typeof window.GoimonUI.addStudyProgress === "function") {
        window.GoimonUI.addStudyProgress();
      }
    } catch (e) {
      console.warn("Goimon addStudyProgress failed:", e);
    }

    renderStudyGoimonMini();
    renderEvolutionNotice();
  }

  function completeOneStudyWord() {
    state.studyFinishedCount += 1;
    saveState();
    addStudyProgressToGoimon();
  }

  unifiedBtn.addEventListener("click", () => {
    if (!state.meaningShown) {
      state.meaningShown = true;
      saveState();
      renderCurrent();
      return;
    }

    const no = state.idx + 1;
    const b = getBlockByNo(no);
    if (b) addStudyDone(Number(b.id));

    completeOneStudyWord();
    goNext();
  });

  speakBtn.addEventListener("click", () => {
    const w = words[state.idx];
    if (w) speakEnglish(w.en);
  });

  autoSpeakEl.addEventListener("change", () => {
    state.autoSpeak = !!autoSpeakEl.checked;
    saveState();
  });

  function maybeAutoSpeak() {
    if (!state.autoSpeak) return;
    const w = words[state.idx];
    if (w) speakEnglish(w.en);
  }

  const _goNext = goNext;
  goNext = function () {
    _goNext();
    maybeAutoSpeak();
  };

  orderModeEl.addEventListener("change", () => {
    state.orderMode = String(orderModeEl.value || "continue");
    state.meaningShown = false;
    state.weakCursor = 0;
    syncIndexToMode(true);
    saveState();
    renderCurrent();
    maybeAutoSpeak();
  });

  applyBlockBtn.addEventListener("click", () => {
    applySelectedBlockToRange();
    maybeAutoSpeak();
  });

  resetBtn.addEventListener("click", () => {
    if (!confirm("暗記の保存データをリセットしますか？")) return;

    localStorage.removeItem(STATE_KEY);

    state = {
      idx: 0,
      randomCount: 0,
      autoSpeak: false,
      rangeStart: 1,
      rangeEnd: Math.max(1, words.length),
      meaningShown: false,
      studyFinishedCount: 0,
      orderMode: "continue",
      weakCursor: 0
    };

    saveState();
    renderBlockSelect();
    syncIndexToMode(true);
    renderCurrent();
  });

  goimonToggleBtn.addEventListener("click", () => {
    uiState.goimonOpen = !uiState.goimonOpen;
    saveStudyUiState();
    renderGoimonPanelState();
  });

  if (levelBadgeEl) {
    levelBadgeEl.textContent = `現在：全商英検 ${lv}級（暗記）`;
  }

  if (window.GoimonUI && typeof window.GoimonUI.ensureCurrent === "function") {
    window.GoimonUI.ensureCurrent();
  }

  if (window.GoimonUI) {
    window.GoimonUI.renderEvolutionNoticeButton("evolutionNoticeBtn");
    window.GoimonUI.bindEvolutionNoticeButton("evolutionNoticeBtn", {
      onComplete: () => {
        renderCurrent();
      }
    });
  }

  if (state.idx < 0) state.idx = 0;
  if (state.idx >= words.length) state.idx = 0;

  renderBlockSelect();
  syncIndexToMode(true);
  renderCurrent();
  maybeAutoSpeak();
});
