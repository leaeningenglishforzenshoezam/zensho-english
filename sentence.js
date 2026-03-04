// sentence.js（丸ごと置き換え）
// 固定問題（window.SENTENCE_FIXED）だけで動く版
// 追加仕様：
// - 音読（読み上げ）は () を削除した文字列で行う
// - 出題順：先頭から / 続きから / ランダム
// - 自動読み上げ：チェックONなら問題表示時に自動で読む（設定は保存）
// - 語句補充で不正解になった「正解語(answer)」だけを 英→日クイズの弱点に +1 連携（localStorageへ直接）
// - ニガテ：自動（間違いで入る）＋手動（ピン留め）
// - ニガテ演習は「自動＋手動」
// - ニガテ演習で正解：自動は解除 / 手動は残る
// - 手動チェックOFFは「完全削除」（自動も手動も消す）

document.addEventListener("DOMContentLoaded", () => {
  // ===== DOM =====
  const setupBox   = document.getElementById("setupBox");
  const playBox    = document.getElementById("playBox");
  const summaryBox = document.getElementById("summaryBox");

  const startBtn   = document.getElementById("startBtn");
  const startWeakBtn = document.getElementById("startWeakBtn");
  const clearWeakBtn = document.getElementById("clearWeakBtn");

  const backBtn    = document.getElementById("backBtn");
  const summaryBackBtn = document.getElementById("summaryBackBtn");
  const continueBtn = document.getElementById("continueBtn");
  const retryWeakBtn = document.getElementById("retryWeakBtn");

  const blockSelect= document.getElementById("blockSelect");
  const countInput = document.getElementById("countInput");
  const orderModeEl= document.getElementById("orderMode");
  const autoReadEl = document.getElementById("autoRead");
  const poolInfo   = document.getElementById("poolInfo");
  const weakInfo   = document.getElementById("weakInfo");

  const statsEl    = document.getElementById("stats");
  const readBtn    = document.getElementById("readBtn");
  const hintBtn    = document.getElementById("hintBtn");
  const nextBtn    = document.getElementById("nextQ");
  const questionEl = document.getElementById("question");
  const qMetaEl    = document.getElementById("qMeta");
  const hintArea   = document.getElementById("hintArea");
  const choicesEl  = document.getElementById("choices");
  const resultEl   = document.getElementById("result");
  const detailEl   = document.getElementById("detail");

  const summaryLine = document.getElementById("summaryLine");
  const wrongEmpty = document.getElementById("wrongEmpty");
  const wrongTable = document.getElementById("wrongTable");
  const wrongTbody = document.getElementById("wrongTbody");

  // ニガテ管理
  const refreshWeakViewBtn = document.getElementById("refreshWeakView");
  const weakAutoListEl = document.getElementById("weakAutoList");
  const weakPinListEl = document.getElementById("weakPinList");
  const weakAutoEmptyEl = document.getElementById("weakAutoEmpty");
  const weakPinEmptyEl = document.getElementById("weakPinEmpty");

  function must(el, id){ if(!el) throw new Error(`sentence.html に #${id} が見つかりません`); }
  [
    [setupBox,"setupBox"],[playBox,"playBox"],[summaryBox,"summaryBox"],
    [startBtn,"startBtn"],[startWeakBtn,"startWeakBtn"],[clearWeakBtn,"clearWeakBtn"],
    [backBtn,"backBtn"],[summaryBackBtn,"summaryBackBtn"],[continueBtn,"continueBtn"],[retryWeakBtn,"retryWeakBtn"],
    [blockSelect,"blockSelect"],[countInput,"countInput"],[orderModeEl,"orderMode"],[autoReadEl,"autoRead"],
    [poolInfo,"poolInfo"],[weakInfo,"weakInfo"],
    [statsEl,"stats"],[readBtn,"readBtn"],[hintBtn,"hintBtn"],[nextBtn,"nextQ"],
    [questionEl,"question"],[qMetaEl,"qMeta"],[hintArea,"hintArea"],[choicesEl,"choices"],
    [resultEl,"result"],[detailEl,"detail"],
    [summaryLine,"summaryLine"],[wrongEmpty,"wrongEmpty"],[wrongTable,"wrongTable"],[wrongTbody,"wrongTbody"],
    [refreshWeakViewBtn,"refreshWeakView"],[weakAutoListEl,"weakAutoList"],[weakPinListEl,"weakPinList"],
    [weakAutoEmptyEl,"weakAutoEmpty"],[weakPinEmptyEl,"weakPinEmpty"],
  ].forEach(([el,id]) => must(el,id));

  // ===== DATA =====
  const fixedRaw = window.SENTENCE_FIXED || [];
  const lv = String(window.ACTIVE_LEVEL || localStorage.getItem("zensho_level_v1") || "1");

  // 意味参照の優先順：1kyu → 2kyu → extra
  const WORDS_1 = window.WORDS_1KYU || [];
  const WORDS_2 = window.WORDS_2KYU || [];
  const EXTRA  = window.EXTRA_WORDS || [];
  const words  = window.WORDS || [];
  const blocks = window.BLOCKS || [];

  const norm = (s) => String(s || "").trim().toLowerCase();

  // ===== LocalStorage keys =====
  // 弱点： { [questionId]: { auto: true/false, pin: true/false } }
  const WEAK_KEY = `zensho_sentence_fixed_weak_v2_lv${lv}`;
  const ORDER_CURSOR_KEY = `zensho_sentence_fixed_order_cursor_lv${lv}`; // { [blockValue]: cursorIndex }
  const SETTINGS_KEY = `zensho_sentence_fixed_settings_v1_lv${lv}`; // { autoRead: true/false }

  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  function loadSettings(){
    const s = safeParse(SETTINGS_KEY);
    return { autoRead: !!s?.autoRead };
  }
  function saveSettings(obj){
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ autoRead: !!obj.autoRead }));
  }

  // ===== meaning maps (priority) =====
  function buildMeaningMapFrom(list){
    const map = new Map();
    for (const w of (list || [])) {
      const en = norm(w?.en);
      const ja = String(w?.ja || "").trim();
      if (en && ja && !map.has(en)) map.set(en, ja);
    }
    return map;
  }
  const map1 = buildMeaningMapFrom(WORDS_1);
  const map2 = buildMeaningMapFrom(WORDS_2);
  const mapE = buildMeaningMapFrom(EXTRA);

  function lookupMeaningBase(wordLower){
    if (!wordLower) return "";
    return map1.get(wordLower) || map2.get(wordLower) || mapE.get(wordLower) || "";
  }

  // WORDS index（answer→語彙番号）: ブロック判定用（WORDS=現在レベル）
  const wordIndexMap = new Map();
  for (let i = 0; i < words.length; i++) {
    const en = norm(words[i]?.en);
    if (en && !wordIndexMap.has(en)) wordIndexMap.set(en, i);
  }

  // 固定問題整形
  const fixed = fixedRaw
    .map(q => ({
      id: String(q.id || ""),
      answer: norm(q.answer),
      en: String(q.en || ""),
      ja: String(q.ja || q.hint || ""),
      note: String(q.note || ""),
      choices: Array.isArray(q.choices) ? q.choices.map(x => String(x)) : [],
    }))
    .filter(q => q.id && q.en && q.ja && q.choices.length === 4);

  const fixedById = new Map();
  for (const q of fixed) fixedById.set(String(q.id), q);

  // ===== UTIL =====
  function shuffle(arr){
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }
  function showSetup(){
    setupBox.style.display = "block";
    playBox.style.display = "none";
    summaryBox.style.display = "none";
  }
  function showPlay(){
    setupBox.style.display = "none";
    playBox.style.display = "block";
    summaryBox.style.display = "none";
  }
  function showSummary(){
    setupBox.style.display = "none";
    playBox.style.display = "none";
    summaryBox.style.display = "block";
  }
  function setHintVisible(on){
    hintArea.style.display = on ? "block" : "none";
  }
  function stripAnswerInJaForHint(ja){
    return String(ja || "")
      .replace(/「[^」]*」/g, "「」")
      .replace(/\s{2,}/g, " ")
      .trim();
  }
  function escapeHtml(s){
    return String(s)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;");
  }

  // ===== 音読（英文）=====
  function sanitizeForSpeech(text){
    let t = String(text || "");
    t = t.replace(/\([^)]*\)/g, " ");
    t = t.replace(/\s{2,}/g, " ").trim();
    return t;
  }
  function speakEnglish(text){
    if (!("speechSynthesis" in window)) return;
    const t = sanitizeForSpeech(text);
    if (!t) return;

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "en-US";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }

  // ===== 効果音（ファイル不要）=====
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
  function markCorrectButtonGreen(correctNorm) {
    document.querySelectorAll("#choices button").forEach(b => {
      if (norm(b.textContent) === correctNorm) b.classList.add("correct");
    });
  }

  // ===== 活用形→基本形 推定 =====
  const IRREGULAR = new Map([
    ["bound","bind"],["woven","weave"],["wove","weave"],
    ["written","write"],["wrote","write"],
    ["spoken","speak"],["spoke","speak"],
    ["broken","break"],["broke","break"],
    ["taken","take"],["took","take"],["dropped","drop"],
    ["given","give"],["gave","give"],["stirred","stir"],
    ["made","make"],
    ["ran","run"],
    ["gone","go"],["went","go"],
    ["seen","see"],["saw","see"],
    ["known","know"],["knew","know"],
    ["felt","feel"],["left","leave"],["lost","lose"],["paid","pay"],
    ["kept","keep"],["held","hold"],["built","build"],["bought","buy"],
    ["caught","catch"],["taught","teach"],["thought","think"],
    ["found","find"],["said","say"],["sent","send"],["spent","spend"],
    ["stood","stand"],["told","tell"],["understood","understand"],
    ["worn","wear"],["wore","wear"],
    ["cut","cut"],["put","put"],["set","set"],["hit","hit"],["hurt","hurt"],
  ]);

  function CAZ(x){ return String(x||"").trim().toLowerCase().replace(/[^a-z]/g,""); }

  function guessBaseForms(w){
    const s = CAZ(w);
    const cand = [];
    if (!s) return cand;

    const irr = IRREGULAR.get(s);
    if (irr) cand.push(irr);

    cand.push(s);

    if (s.endsWith("ied")) cand.push(s.slice(0, -3) + "y");
    if (s.endsWith("ed"))  cand.push(s.slice(0, -2));
    if (s.endsWith("ed"))  cand.push(s.slice(0, -1));

    if (s.endsWith("ing"))  cand.push(s.slice(0, -3));
    if (s.endsWith("ing"))  cand.push(s.slice(0, -3) + "e");

    if (s.endsWith("ies")) cand.push(s.slice(0, -3) + "y");
    if (s.endsWith("es"))  cand.push(s.slice(0, -2));
    if (s.endsWith("s"))   cand.push(s.slice(0, -1));

    return Array.from(new Set(cand)).filter(Boolean);
  }

  function meaningForForm(word){
    const w = CAZ(word);
    if (!w) return "(未登録)";

    const direct = lookupMeaningBase(w);
    if (direct) return direct;

    const bases = guessBaseForms(w);
    for (const b of bases) {
      const m = lookupMeaningBase(b);
      if (m) return (b === w) ? m : `${m}（= ${b}）`;
    }
    return "(未登録)";
  }

  // ===== 弱点ストア（auto/pin）=====
  function loadWeakMap(){
    const obj = safeParse(WEAK_KEY);
    if (!obj || typeof obj !== "object") return {};
    const out = {};
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (v && typeof v === "object") out[String(k)] = { auto: !!v.auto, pin: !!v.pin };
      else out[String(k)] = { auto: true, pin: false };
    }
    return out;
  }
  function saveWeakMap(map){
    localStorage.setItem(WEAK_KEY, JSON.stringify(map));
  }
  function addAutoWeak(id){
    const map = loadWeakMap();
    const k = String(id);
    if (!map[k]) map[k] = { auto: true, pin: false };
    map[k].auto = true;
    saveWeakMap(map);
  }
  function setPinned(id, on){
    const map = loadWeakMap();
    const k = String(id);
    if (on) {
      if (!map[k]) map[k] = { auto: false, pin: true };
      map[k].pin = true;
      saveWeakMap(map);
      return;
    }
    // OFF＝完全削除（自動も手動も消す）
    if (map[k]) {
      delete map[k];
      saveWeakMap(map);
    }
  }
  function removeAutoIfNotPinned(id){
    const map = loadWeakMap();
    const k = String(id);
    if (!map[k]) return;
    if (map[k].pin) return;
    delete map[k];
    saveWeakMap(map);
  }
  function weakCounts(){
    const map = loadWeakMap();
    let autoOnly = 0;
    let pinned = 0;
    for (const k of Object.keys(map)) {
      if (map[k].pin) pinned++;
      else autoOnly++;
    }
    return { autoOnly, pinned, total: autoOnly + pinned };
  }

  // ===== order cursor store (per block) =====
  function loadCursor(blockValue){
    const obj = safeParse(ORDER_CURSOR_KEY);
    const v = obj?.[String(blockValue)];
    return Number.isFinite(v) ? v : 0;
  }
  function saveCursor(blockValue, cursor){
    const obj = safeParse(ORDER_CURSOR_KEY) || {};
    obj[String(blockValue)] = cursor;
    localStorage.setItem(ORDER_CURSOR_KEY, JSON.stringify(obj));
  }

  // ===== block UI =====
  function renderBlockSelect(){
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

  function getRangeByBlockValue(v){
    if (v === "all") return [0, Math.max(0, words.length - 1)];
    const b = blocks.find(x => String(x.id) === String(v));
    if (!b) return [0, Math.max(0, words.length - 1)];
    const s = Math.max(0, Number(b.start) - 1);
    const e = Math.min(words.length - 1, Number(b.end) - 1);
    return [s, e];
  }

  function buildEligibleQuestionsByRange(startIdx, endIdx){
    const list = [];
    for (let i = 0; i < fixed.length; i++) {
      const a = fixed[i].answer;
      const idx = wordIndexMap.get(a);
      if (idx == null) continue;
      if (idx < startIdx || idx > endIdx) continue;
      list.push(i);
    }
    return list;
  }

  function updatePoolInfo(){
    const [s,e] = getRangeByBlockValue(blockSelect.value);
    const eligible = buildEligibleQuestionsByRange(s,e);
    poolInfo.textContent = `この設定で出題可能：${eligible.length}問`;
  }

  function updateWeakInfo(){
    const c = weakCounts();
    weakInfo.textContent = `ニガテ：合計 ${c.total}（自動 ${c.autoOnly} / 手動 ${c.pinned}）`;
    startWeakBtn.disabled = (c.total === 0);
    retryWeakBtn.disabled = (c.total === 0);
  }

  function renderWeakManagement(){
    const map = loadWeakMap();
    const autoIds = [];
    const pinIds = [];

    for (const id of Object.keys(map)) {
      const st = map[id];
      if (st.pin) pinIds.push(id);
      else autoIds.push(id);
    }

    autoIds.sort((a,b) => Number(a) - Number(b));
    pinIds.sort((a,b) => Number(a) - Number(b));

    weakAutoListEl.innerHTML = "";
    weakPinListEl.innerHTML = "";

    weakAutoEmptyEl.style.display = (autoIds.length === 0) ? "block" : "none";
    weakPinEmptyEl.style.display = (pinIds.length === 0) ? "block" : "none";

    for (const id of autoIds) {
      const q = fixedById.get(String(id));
      const li = document.createElement("li");
      const title = q ? q.en : `（問題ID: ${id}）`;
      const small = q ? ` / ${q.ja}` : "";
      li.innerHTML = `<span class="mono">${escapeHtml(title)}</span><span class="muted">${escapeHtml(small)}</span>`;

      const btnWrap = document.createElement("div");
      btnWrap.style.marginTop = "6px";
      btnWrap.style.display = "flex";
      btnWrap.style.gap = "8px";
      btnWrap.style.flexWrap = "wrap";

      const pinBtn = document.createElement("button");
      pinBtn.type = "button";
      pinBtn.className = "miniBtn";
      pinBtn.textContent = "ピン留めON";
      pinBtn.addEventListener("click", () => {
        setPinned(id, true);
        updateWeakInfo();
        renderWeakManagement();
      });

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "miniBtn";
      delBtn.textContent = "完全削除";
      delBtn.addEventListener("click", () => {
        setPinned(id, false);
        updateWeakInfo();
        renderWeakManagement();
      });

      btnWrap.appendChild(pinBtn);
      btnWrap.appendChild(delBtn);
      li.appendChild(btnWrap);
      weakAutoListEl.appendChild(li);
    }

    for (const id of pinIds) {
      const q = fixedById.get(String(id));
      const li = document.createElement("li");

      const title = q ? q.en : `（問題ID: ${id}）`;
      const small = q ? ` / ${q.ja}` : "";

      const label = document.createElement("label");
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.gap = "8px";

      const chk = document.createElement("input");
      chk.type = "checkbox";
      chk.checked = true;
      chk.addEventListener("change", () => {
        if (!chk.checked) {
          setPinned(id, false);
          updateWeakInfo();
          renderWeakManagement();
        }
      });

      const span = document.createElement("span");
      span.innerHTML = `<span class="mono">${escapeHtml(title)}</span><span class="muted">${escapeHtml(small)}</span>`;

      label.appendChild(chk);
      label.appendChild(span);
      li.appendChild(label);
      weakPinListEl.appendChild(li);
    }
  }

  // ===== 英→日クイズ弱点へ +1（sentence側からlocalStorageへ直接）=====
  function pushWeakToEnJa(answerWordLower, weight){
    const w = String(answerWordLower || "").trim().toLowerCase();
    let add = Number(weight);
    if (!w) return;
    if (!Number.isFinite(add) || add <= 0) add = 1;

    const LV = localStorage.getItem("zensho_level_v1") || "1";
    const WEAK_KEY_ENJA = `zensho_quiz_weak_points_enja_v2_lv${LV}`;

    let obj = {};
    try {
      obj = JSON.parse(localStorage.getItem(WEAK_KEY_ENJA) || "{}");
      if (!obj || typeof obj !== "object") obj = {};
    } catch {
      obj = {};
    }

    const cur = (typeof obj[w] === "number") ? obj[w] : 0;
    obj[w] = cur + add;
    localStorage.setItem(WEAK_KEY_ENJA, JSON.stringify(obj));
  }

  // ===== QUIZ STATE =====
  let session = {
    mode: "normal",     // normal / weak
    blockValue: "all",
    eligible: [],
    order: [],
    cursor: 0,
    limit: 20,
    answered: 0,
    correct: 0,
    orderMode: "continue", // start / continue / random / weak
    autoRead: false,
  };

  let current = null;
  let answeredThis = false;
  let askedLog = [];

  function resetUIForNewQuestion(){
    answeredThis = false;
    nextBtn.disabled = true;
    resultEl.textContent = "";
    detailEl.textContent = "";
    hintArea.textContent = "";
    setHintVisible(false);
    hintBtn.disabled = false;

    document.querySelectorAll("#choices button").forEach(b => {
      b.classList.remove("correct", "wrong");
      b.disabled = false;
    });
  }

  function currentCorrectChoiceNorm(){
    const ans = current.answer;
    const inChoices = current.choices.map(norm).includes(ans);
    if (ans && inChoices) return ans;
    return norm(current.choices[0] || "");
  }

  function renderStats(){
    statsEl.textContent = `今回：${session.answered}/${session.limit}（正解 ${session.correct}）`;
  }

  function orderModeText(){
    if (session.mode === "weak") return "ニガテ";
    if (session.orderMode === "start") return "先頭";
    if (session.orderMode === "continue") return "続き";
    return "ランダム";
  }

  function renderQuestion(){
    if (session.mode === "weak") {
      const c = weakCounts();
      if (c.total === 0) {
        finishSession(true);
        return;
      }
    }

    if (session.answered >= session.limit) {
      finishSession(false);
      return;
    }

    if (session.order.length === 0) {
      questionEl.textContent = "この条件では出題できる固定問題がありません。";
      qMetaEl.textContent = "";
      choicesEl.innerHTML = "";
      hintBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    resetUIForNewQuestion();

    if (session.mode === "weak") {
      const map = loadWeakMap();
      while (session.cursor < session.order.length) {
        const qIndex = session.order[session.cursor];
        const qId = fixed[qIndex]?.id;
        if (qId && map[String(qId)]) break;
        session.cursor++;
      }
      if (session.cursor >= session.order.length) {
        const map2 = loadWeakMap();
        const ids = Object.keys(map2);
        const idSet = new Set(ids.map(String));
        const eligible = [];
        for (let i = 0; i < fixed.length; i++) {
          if (idSet.has(fixed[i].id)) eligible.push(i);
        }
        session.order = shuffle(eligible);
        session.cursor = 0;
        if (session.order.length === 0) {
          finishSession(true);
          return;
        }
      }
    }

    const qIndex = session.order[session.cursor % session.order.length];
    session.cursor++;

    if (session.mode === "normal" && session.orderMode === "continue") {
      saveCursor(session.blockValue, session.cursor % session.order.length);
    }

    current = fixed[qIndex];

    questionEl.textContent = current.en;
    qMetaEl.textContent =
      `問題 ${session.answered + 1} / ${session.limit}` +
      ` ・${orderModeText()}` +
      ` ・${session.mode === "weak" ? "自動は正解で解除／手動は残る" : ""}` +
      ` ・自動読み上げ:${session.autoRead ? "ON" : "OFF"}`;

    const shownChoices = shuffle(current.choices);
    current._shownChoices = shownChoices;

    choicesEl.innerHTML = "";
    for (const c of shownChoices) {
      const btn = document.createElement("button");
      btn.textContent = c;
      btn.addEventListener("click", () => {
        ensureAudioReady();
        handleChoice(c, btn);
      });
      choicesEl.appendChild(btn);
    }

    renderStats();

    // ★自動読み上げ（問題表示時）
    if (session.autoRead) {
      // iOS対策：ここで例外が出ても進行は止めない
      try { speakEnglish(current.en); } catch {}
    }
  }

  function showHint(){
    if (!current) return;
    const h = stripAnswerInJaForHint(current.ja);
    hintArea.textContent = h ? `ヒント：${h}` : "ヒント：（なし）";
    setHintVisible(true);
    hintBtn.disabled = true;
  }

  function buildChoiceMeanings(choices){
    const lines = [];
    for (const c of choices) lines.push(`・${c}：${meaningForForm(c)}`);
    return lines.join("\n");
  }

  function handleChoice(choice, clickedBtn){
    if (answeredThis) return;
    answeredThis = true;

    const correctChoiceNorm = currentCorrectChoiceNorm();
    const isCorrect = (norm(choice) === correctChoiceNorm);

    session.answered += 1;

    if (isCorrect) {
      session.correct += 1;
      resultEl.innerHTML = `<span class="ok">⭕️ 正解！</span>`;
      clickedBtn.classList.add("correct");
      playCorrectSound();
    } else {
      const show = (current._shownChoices || current.choices).find(x => norm(x) === correctChoiceNorm) || current.choices[0];
      resultEl.innerHTML = `<span class="ng">❌ 不正解。</span> 正解は「${show}」`;
      clickedBtn.classList.add("wrong");
      playWrongSound();
      markCorrectButtonGreen(correctChoiceNorm);

      addAutoWeak(current.id);
      pushWeakToEnJa(current.answer, 1);

      updateWeakInfo();
      renderWeakManagement();
    }

    if (session.mode === "weak" && isCorrect) {
      removeAutoIfNotPinned(current.id);
      updateWeakInfo();
      renderWeakManagement();
    }

    lockChoices();

    const fullJa = String(current.ja || "").trim();
    const note = String(current.note || "").trim();
    const meanings = buildChoiceMeanings(current._shownChoices || current.choices);

    let text = `【全文訳】\n${fullJa || "（なし）"}\n\n`;
    if (note) text += `【注釈】\n${note}\n\n`;
    text += `【選択肢の意味】\n${meanings}`;

    detailEl.innerHTML = `<pre class="pre">${escapeHtml(text)}</pre>`;

    const correctShown = (current._shownChoices || current.choices).find(x => norm(x) === correctChoiceNorm) || current.choices[0];
    askedLog.push({
      qId: current.id,
      en: current.en,
      ja: current.ja,
      yourChoice: String(choice),
      correctChoice: String(correctShown),
      isCorrect
    });

    nextBtn.disabled = false;
    hintBtn.disabled = true;
    setHintVisible(false);
    renderStats();
  }

  function blockSelectLabel(v){
    if (v === "all") return "全範囲";
    return `Block ${v}`;
  }

  function isPinned(id){
    const map = loadWeakMap();
    const st = map[String(id)];
    return !!(st && st.pin);
  }

  function renderSummary(autoCleared){
    const wrongs = askedLog.filter(x => !x.isCorrect);
    const c = weakCounts();
    const tail = autoCleared ? "（ニガテが0になりました）" : "";

    summaryLine.textContent =
      `結果：${session.correct} / ${session.limit}` +
      `（${session.mode === "weak" ? "ニガテ演習" : "通常演習"}｜${orderModeText()}｜${blockSelectLabel(session.blockValue)}）` +
      `｜ニガテ合計 ${c.total}（自動 ${c.autoOnly} / 手動 ${c.pinned}）` +
      `｜自動読み上げ:${session.autoRead ? "ON" : "OFF"}${tail}`;

    wrongTbody.innerHTML = "";

    if (wrongs.length === 0) {
      wrongEmpty.style.display = "block";
      wrongTable.style.display = "none";
      return;
    }
    wrongEmpty.style.display = "none";
    wrongTable.style.display = "table";

    for (let i = 0; i < wrongs.length; i++) {
      const w = wrongs[i];
      const tr = document.createElement("tr");

      const tdNo = document.createElement("td");
      tdNo.textContent = String(i + 1);
      tr.appendChild(tdNo);

      const tdText = document.createElement("td");
      tdText.innerHTML =
        `<div class="mono" style="margin-bottom:6px;">${escapeHtml(w.en)}</div>` +
        `<div>${escapeHtml(w.ja)}</div>`;
      tr.appendChild(tdText);

      const tdAns = document.createElement("td");
      tdAns.innerHTML =
        `<div>誤答：<span class="pill mono">${escapeHtml(w.yourChoice)}</span></div>` +
        `<div style="margin-top:6px;">正答：<span class="pill mono">${escapeHtml(w.correctChoice)}</span></div>`;
      tr.appendChild(tdAns);

      const tdChk = document.createElement("td");
      const label = document.createElement("label");
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.gap = "8px";

      const chk = document.createElement("input");
      chk.type = "checkbox";
      chk.checked = isPinned(w.qId);

      chk.addEventListener("change", () => {
        if (chk.checked) setPinned(w.qId, true);
        else setPinned(w.qId, false);
        updateWeakInfo();
        renderWeakManagement();
        renderSummary(false);
      });

      const span = document.createElement("span");
      span.className = "muted";
      span.textContent = "ピン";

      label.appendChild(chk);
      label.appendChild(span);
      tdChk.appendChild(label);
      tr.appendChild(tdChk);

      wrongTbody.appendChild(tr);
    }
  }

  function finishSession(autoCleared){
    showSummary();
    renderSummary(autoCleared);

    continueBtn.disabled = (session.mode === "weak");
    retryWeakBtn.disabled = (weakCounts().total === 0);
  }

  function startNormalSession(){
    const [s,e] = getRangeByBlockValue(blockSelect.value);
    const eligible = buildEligibleQuestionsByRange(s,e);

    let limit = Number(countInput.value);
    if (!Number.isFinite(limit) || limit < 1) limit = 20;
    if (eligible.length > 0) limit = Math.min(limit, eligible.length);

    session.mode = "normal";
    session.blockValue = blockSelect.value;
    session.eligible = eligible;
    session.limit = Math.max(1, limit);
    session.answered = 0;
    session.correct = 0;

    session.orderMode = String(orderModeEl.value || "continue");

    if (session.orderMode === "random") {
      session.order = shuffle(eligible);
      session.cursor = 0;
    } else {
      session.order = [...eligible];
      if (session.orderMode === "start") {
        session.cursor = 0;
        saveCursor(session.blockValue, 0);
      } else {
        session.cursor = loadCursor(session.blockValue);
      }
    }

    // 自動読み上げ設定反映
    session.autoRead = !!autoReadEl.checked;

    askedLog = [];
    showPlay();
    renderQuestion();
  }

  function startWeakSession(){
    const map = loadWeakMap();
    const ids = Object.keys(map);

    const eligible = [];
    const idSet = new Set(ids.map(String));
    for (let i = 0; i < fixed.length; i++) {
      if (idSet.has(fixed[i].id)) eligible.push(i);
    }

    if (eligible.length === 0) {
      alert("ニガテ問題がありません。");
      updateWeakInfo();
      renderWeakManagement();
      return;
    }

    let limit = Number(countInput.value);
    if (!Number.isFinite(limit) || limit < 1) limit = 20;
    limit = Math.min(limit, eligible.length);

    session.mode = "weak";
    session.blockValue = blockSelect.value;
    session.eligible = eligible;
    session.limit = Math.max(1, limit);
    session.answered = 0;
    session.correct = 0;

    session.orderMode = "weak";
    session.order = shuffle(eligible);
    session.cursor = 0;

    session.autoRead = !!autoReadEl.checked;

    askedLog = [];
    showPlay();
    renderQuestion();
  }

  // ===== EVENTS =====
  blockSelect.addEventListener("change", updatePoolInfo);
  countInput.addEventListener("input", updatePoolInfo);
  orderModeEl.addEventListener("change", updatePoolInfo);

  autoReadEl.addEventListener("change", () => {
    saveSettings({ autoRead: !!autoReadEl.checked });
  });

  startBtn.addEventListener("click", startNormalSession);

  startWeakBtn.addEventListener("click", () => {
    if (weakCounts().total === 0) {
      alert("ニガテ問題がありません。まず通常演習で間違えるか、結果画面でピン留めしてください。");
      return;
    }
    startWeakSession();
  });

  clearWeakBtn.addEventListener("click", () => {
    if (!confirm("ニガテをすべて消しますか？（自動・手動どちらも全消去）")) return;
    localStorage.removeItem(WEAK_KEY);
    updateWeakInfo();
    renderWeakManagement();
  });

  backBtn.addEventListener("click", () => {
    showSetup();
    updatePoolInfo();
    updateWeakInfo();
    renderWeakManagement();
  });

  summaryBackBtn.addEventListener("click", () => {
    showSetup();
    updatePoolInfo();
    updateWeakInfo();
    renderWeakManagement();
  });

  continueBtn.addEventListener("click", startNormalSession);

  retryWeakBtn.addEventListener("click", () => {
    if (weakCounts().total === 0) {
      alert("ニガテがありません。");
      updateWeakInfo();
      renderWeakManagement();
      return;
    }
    startWeakSession();
  });

  readBtn.addEventListener("click", () => {
    if (!current) return;
    ensureAudioReady();
    speakEnglish(current.en);
  });

  hintBtn.addEventListener("click", showHint);

  nextBtn.addEventListener("click", () => {
    if (!answeredThis) return;
    renderQuestion();
  });

  refreshWeakViewBtn.addEventListener("click", () => {
    updateWeakInfo();
    renderWeakManagement();
    alert("ニガテ一覧を更新しました。");
  });

  function init(){
    // 初期：保存した設定をUIへ反映
    const s = loadSettings();
    autoReadEl.checked = !!s.autoRead;

    renderBlockSelect();
    updatePoolInfo();
    updateWeakInfo();
    renderWeakManagement();
    showSetup();
  }
  init();
});
