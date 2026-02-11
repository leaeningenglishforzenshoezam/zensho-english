// study.js（暗記ページ）完全版：Block表示復活＋1ボタン（意味→次へ）＋横断ブロック記録

document.addEventListener("DOMContentLoaded", () => {
  // dataset.js が window.WORDS / window.BLOCKS / window.ACTIVE_LEVEL を決める前提
  const words = window.WORDS || [];
  const blocks = window.BLOCKS || [];
  const lv = window.ACTIVE_LEVEL || "1";

  // ===== 共通の“横断”ブロック記録キー（暗記/英→日/日→英で共有）=====
  const GLOBAL_BLOCK_KEY = `zensho_block_global_lv${lv}_v1`;

  // ===== 暗記ページの保存キー（レベル別）=====
  const STATE_KEY = `zensho_study_state_lv${lv}_v1`;

  // ===== DOM =====
  const wordEl = document.getElementById("word");
  const meaningEl = document.getElementById("meaning");

  const speakBtn = document.getElementById("speakBtn");
  const autoSpeakEl = document.getElementById("autoSpeak");

  const unifiedBtn = document.getElementById("unifiedBtn");

  const progressEl = document.getElementById("progress");
  const toggleModeBtn = document.getElementById("toggleMode");
  const randomCountEl = document.getElementById("randomCount");

  const targetInput = document.getElementById("targetInput");
  const targetStatus = document.getElementById("targetStatus");
  const resetBtn = document.getElementById("resetBtn");

  const blockSelectEl = document.getElementById("blockSelect");
  const applyBlockBtn = document.getElementById("applyBlock");
  const blockInfoEl = document.getElementById("blockInfo");
  const blockRateEl = document.getElementById("blockRate");

  // ===== Utility =====
  function clamp(n, min, max) {
    n = Math.floor(Number(n));
    if (!Number.isFinite(n)) n = min;
    return Math.max(min, Math.min(max, n));
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

  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  // ===== 横断ブロック記録（暗記分）=====
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
    if (!g.byBlock[k]) g.byBlock[k] = { studyDone: 0, quizAttempted: 0, quizCorrect: 0, quizAttemptedJaEn: 0, quizCorrectJaEn: 0 };
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

  // ===== 状態（暗記）=====
  let state = safeParse(STATE_KEY) || {
    idx: 0,                 // 0-based
    isRandom: false,
    randomCount: 0,
    autoSpeak: false,
    // block学習の範囲（1-basedで持つ）
    rangeStart: 1,
    rangeEnd: Math.max(1, words.length),
    // 1ボタン用
    meaningShown: false
  };

  // URLで範囲指定（?start=xx&end=yy）
  (function applyQueryRange() {
    const p = new URLSearchParams(location.search);
    const st = Number(p.get("start"));
    const ed = Number(p.get("end"));
    if (Number.isFinite(st) && st >= 1) state.rangeStart = st;
    if (Number.isFinite(ed) && ed >= 1) state.rangeEnd = ed;
  })();

  // 0-basedレンジ
  function getRange0() {
    const s = clamp(state.rangeStart, 1, Math.max(1, words.length)) - 1;
    const e = clamp(state.rangeEnd, 1, Math.max(1, words.length)) - 1;
    return (s <= e) ? { s, e } : { s: e, e: s };
  }

  function saveState() {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }

  // ===== Blockセレクト表示 =====
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

    // 今の範囲に合うBlockがあれば選択状態に寄せる（なければall）
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
        // 範囲を変えたら、その範囲の先頭に合わせる
        const r = getRange0();
        state.idx = r.s;
      }
    }
    state.meaningShown = false;
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

    // ブロックごとの横断記録表示（allでも“今の範囲”のBlockが1つなら出す）
    const blk = blocks.find(b => Number(b.start) === startNo && Number(b.end) === endNo);
    if (blk) {
      blockRateEl.textContent = `このBlockの累計：${getBlockGlobalText(blk.id)}`;
    } else {
      blockRateEl.textContent = "";
    }
  }

  // ===== 表示更新 =====
  function renderProgress() {
    const r = getRange0();
    const total = (r.e - r.s + 1);
    const pos = clamp(state.idx, r.s, r.e) - r.s + 1;

    progressEl.textContent =
      `範囲内の進捗：${pos} / ${total}（全体番号：${state.idx + 1} / ${words.length}）`;

    toggleModeBtn.textContent = `ランダム出題：${state.isRandom ? "ON" : "OFF"}`;

    if (state.isRandom) {
      randomCountEl.style.display = "block";
      randomCountEl.textContent = `ランダム学習回数：${state.randomCount}`;
    } else {
      randomCountEl.style.display = "none";
    }

    const target = Number(targetInput.value) || 0;
    if (target > 0 && state.randomCount >= target) {
      targetStatus.style.display = "block";
    } else {
      targetStatus.style.display = "none";
    }
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

    // 意味は “meaningShown” がtrueの時だけ表示
    if (state.meaningShown) {
      meaningEl.classList.remove("hidden");
      meaningEl.textContent = w.ja;
      unifiedBtn.textContent = "次へ";
    } else {
      meaningEl.classList.add("hidden");
      meaningEl.textContent = w.ja;
      unifiedBtn.textContent = "意味を見る";
    }

    autoSpeakEl.checked = !!state.autoSpeak;
    renderProgress();
  }

  // ===== 次の単語へ（範囲内）=====
  function goNext() {
    const r = getRange0();

    if (state.isRandom) {
      // ランダム：範囲内からランダムに飛ぶ（回数＋）
      const next = r.s + Math.floor(Math.random() * (r.e - r.s + 1));
      state.idx = next;
      state.randomCount += 1;
    } else {
      // 順番：範囲内で進む
      state.idx += 1;
      if (state.idx > r.e) state.idx = r.s;
    }

    state.meaningShown = false;
    saveState();
    renderCurrent();
  }

  // ===== 1ボタン（意味→次へ）=====
  unifiedBtn.addEventListener("click", () => {
    // まだ意味を見てない → 見せる（ここでは“学習完了”にしない）
    if (!state.meaningShown) {
      state.meaningShown = true;
      saveState();
      renderCurrent();
      return;
    }

    // 意味を見た後に押された → この単語を1回“完了”扱いで記録して次へ
    const no = state.idx + 1;
    const b = getBlockByNo(no);
    if (b) addStudyDone(Number(b.id));

    goNext();
  });

  // ===== 発音 =====
  speakBtn.addEventListener("click", () => {
    const w = words[state.idx];
    if (w) speakEnglish(w.en);
  });

  autoSpeakEl.addEventListener("change", () => {
    state.autoSpeak = !!autoSpeakEl.checked;
    saveState();
  });

  // 表示した瞬間に自動発音（単語切り替え時）
  function maybeAutoSpeak() {
    if (!state.autoSpeak) return;
    const w = words[state.idx];
    if (w) speakEnglish(w.en);
  }

  // renderCurrent の最後に自動発音したいので軽くフック
  const _renderCurrent = renderCurrent;
  renderCurrent = function () {
    _renderCurrent();
    // meaning表示/非表示の切替だけでは鳴らさない（次へで変わったときのみ鳴らしたい）
    // なので、次へ(goNext)内で鳴らす
  };

  // 次へ(goNext)の最後に鳴らす
  const _goNext = goNext;
  goNext = function () {
    _goNext();
    maybeAutoSpeak();
  };

  // ===== ランダム切替 =====
  toggleModeBtn.addEventListener("click", () => {
    state.isRandom = !state.isRandom;
    saveState();
    renderCurrent();
  });

  // ===== Block適用 =====
  applyBlockBtn.addEventListener("click", () => {
    applySelectedBlockToRange();
  });

  // ===== リセット =====
  resetBtn.addEventListener("click", () => {
    if (!confirm("暗記の保存データをリセットしますか？")) return;
    localStorage.removeItem(STATE_KEY);
    state = {
      idx: 0,
      isRandom: false,
      randomCount: 0,
      autoSpeak: false,
      rangeStart: 1,
      rangeEnd: Math.max(1, words.length),
      meaningShown: false
    };
    saveState();
    renderBlockSelect();
    renderCurrent();
  });

  // ===== 初期化 =====
  // levelBadge
  (function () {
    const el = document.getElementById("levelBadge");
    if (!el) return;
    el.textContent = `現在：全商英検 ${lv}級`;
  })();

  // targetInput 初期値は state には持たずそのまま
  if (state.idx < 0) state.idx = 0;
  if (state.idx >= words.length) state.idx = 0;

  renderBlockSelect();
  renderCurrent();
  maybeAutoSpeak();
});
