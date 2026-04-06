// accent.js（丸ごと置き換え）
// ★選択肢位置固定 / 苦手モード / 正解後の表示を大きく
// ★学習ログ（ホーム用）に 1問ごとに加算
// ★ゴイモン：アクセント正解で おんかん +1
// ★ゴイモン表示は折りたたみ式＋共通進化演出
// ★同じ問題が連続で出ないよう、1セッション内では出題順を先に作って1問ずつ出す
// ★ACCENT データに同一問題が重複していても buildPool 時点で除外する
// ★「続きから」は保存した位置から確実に再開するよう修正
// ★追加：Block横断記録に accentAttempted / accentCorrect を保存

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
      [setupBox,"setupBox"],[playBox,"playBox"],[summaryBox,"summaryBox"],
      [blockSelect,"blockSelect"],[applyBlockBtn,"applyBlock"],[blockStats,"blockStats"],
      [rangeStartEl,"rangeStart"],[rangeEndEl,"rangeEnd"],[limitEl,"limitCount"],
      [modeSelect,"modeSelect"],[autoSpeakAfterEl,"autoSpeakAfter"],[resetCursorBtn,"resetCursor"],
      [startBtn,"startBtn"],[setupInfo,"setupInfo"],
      [statsEl,"stats"],[qMetaEl,"qMeta"],[wordEl,"word"],[syllablesEl,"syllables"],
      [choicesEl,"choices"],[resultEl,"result"],[detailEl,"detail"],
      [speakBtn,"speakBtn"],[nextBtn,"nextBtn"],[backBtn,"backBtn"],
      [summaryLine,"summaryLine"],[retrySameBtn,"retrySameBtn"],[retryBtn,"retryBtn"],[summaryBackBtn,"summaryBackBtn"],
      [wrongEmpty,"wrongEmpty"],[wrongList,"wrongList"],
      [levelBadge,"levelBadge"],[errorArea,"errorArea"],
      [toggleGoimonBtn,"toggleGoimon"],[goimonCard,"goimonCard"],[evolutionNoticeBtn,"evolutionNoticeBtn"]
    ].forEach(([x,n]) => must(x,n));
  } catch (e) {
    showError(String(e?.message || e));
    return;
  }

  const LEVEL_KEY = "zensho_level_v1";
  const LV = localStorage.getItem(LEVEL_KEY) || "1";
  const GOIMON_UI_KEY = `zensho_accent_goimon_ui_v1_lv${LV}`;
  const GLOBAL_BLOCK_KEY = `zensho_block_global_lv${LV}_v1`;

  levelBadge.textContent = `現在：全商英検 ${LV}級（アクセント演習）`;

  const blocks = window.BLOCKS || [];
  const ACCENT = (LV === "2") ? (window.ACCENT_2KYU || []) : (window.ACCENT_1KYU || []);

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
    setupBox.style.display = "block";
    playBox.style.display = "none";
    summaryBox.style.display = "none";
  }
  function showPlay() {
    setupBox.style.display = "none";
    playBox.style.display = "block";
    summaryBox.style.display = "none";
  }
  function showSummary() {
    setupBox.style.display = "none";
    playBox.style.display = "none";
    summaryBox.style.display = "block";
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
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;");
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

  const WEAK_KEY = `zensho_accent_weak_v1_lv${LV}`;
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
  function weakCount(map) {
    return Object.keys(map).length;
  }

  const CURSOR_KEY = `zensho_accent_cursor_v1_lv${LV}`;
  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
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
    const weakMap = loadWeak();
    const wc = weakCount(weakMap);
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
      { n: 4, label: "第4音節" },
    ];
    for (const c of labels) {
      const btn = document.createElement("button");
      btn.textContent = c.label;
      btn.addEventListener("click", () => handleChoice(c.n, btn));
      choicesEl.appendChild(btn);
    }
  }

  function renderStats() {
    statsEl.textContent = `今回：${session.answered}/${session.limit}（正解 ${session.correct}）`;
  }

  function renderMeta() {
    if (!current) { qMetaEl.textContent = ""; return; }
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
    const arr = [];
    for (let i = 0; i < pool.length; i++) {
      const p = getWeakPoint(weakMap, pool[i].no);
      if (p > 0) arr.push({ i, p, no: pool[i].no });
    }
    arr.sort((a, b) => (b.p - a.p) || (a.no - b.no));
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

    function finishSession(autoClearedWeak) {
    showSummary();
    const tail = (session.mode === "weak" && autoClearedWeak) ? "（この回の苦手出題が終わりました）" : "";
    summaryLine.textContent = `結果：${session.correct} / ${session.answered}（${modeLabel(session.mode)}｜範囲 ${session.startNo}〜${session.endNo}｜${LV}級）${tail}`;

    if (wrongLog.length === 0) {
      wrongEmpty.style.display = "block";
      wrongList.innerHTML = "";
      return;
    }

    wrongEmpty.style.display = "none";

    const cards = wrongLog.map((w, idx) => {
      const b = getBlockByNo(w.no);
      const btxt = b ? `Block ${b.id}` : (w.blockId ? `Block ${w.blockId}` : "Block ?");
      const stressed = makeStressedUpper(w.sylRaw, w.correct);
      const noteHtml = w.note
        ? `<div style="margin-top:8px; font-size:14px; line-height:1.7;">解説：${escapeHtml(w.note)}</div>`
        : "";

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
              background:#ffecec;
              color:#b00020;
              border:1px solid #f3b5bf;
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

          <div style="
            padding:10px 12px;
            border:1px solid #eee;
            border-radius:12px;
            background:#fafafa;
            font-size:18px;
            font-weight:800;
            letter-spacing:0.4px;
            line-height:1.7;
            margin-bottom:6px;
          ">
            ${escapeHtml(stressed)}
          </div>

          ${noteHtml}
        </div>
      `;
    });

    wrongList.innerHTML = cards.join("");
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
    showSetup();

    if (typeof window.renderAccentGoimonMini === "function") {
      window.renderAccentGoimonMini();
    }
  }

  init();
});
