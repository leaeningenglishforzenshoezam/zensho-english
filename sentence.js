// sentence.js（丸ごと置き換え）
// 固定問題（window.SENTENCE_FIXED）だけで動く版
// 追加仕様：ニガテ演習で正解した問題は自動でニガテから外す（自動管理）

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
  const randomOrder= document.getElementById("randomOrder");
  const poolInfo   = document.getElementById("poolInfo");
  const weakInfo   = document.getElementById("weakInfo");

  const statsEl    = document.getElementById("stats");
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

  function must(el, id){ if(!el) throw new Error(`sentence.html に #${id} が見つかりません`); }
  [
    [setupBox,"setupBox"],[playBox,"playBox"],[summaryBox,"summaryBox"],
    [startBtn,"startBtn"],[startWeakBtn,"startWeakBtn"],[clearWeakBtn,"clearWeakBtn"],
    [backBtn,"backBtn"],[summaryBackBtn,"summaryBackBtn"],[continueBtn,"continueBtn"],[retryWeakBtn,"retryWeakBtn"],
    [blockSelect,"blockSelect"],[countInput,"countInput"],[randomOrder,"randomOrder"],[poolInfo,"poolInfo"],[weakInfo,"weakInfo"],
    [statsEl,"stats"],[hintBtn,"hintBtn"],[nextBtn,"nextQ"],
    [questionEl,"question"],[qMetaEl,"qMeta"],[hintArea,"hintArea"],[choicesEl,"choices"],
    [resultEl,"result"],[detailEl,"detail"],
    [summaryLine,"summaryLine"],[wrongEmpty,"wrongEmpty"],[wrongTable,"wrongTable"],[wrongTbody,"wrongTbody"]
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
  const WEAK_KEY = `zensho_sentence_fixed_weak_lv${lv}`; // { [questionId]: true }
  const ORDER_CURSOR_KEY = `zensho_sentence_fixed_order_cursor_lv${lv}`; // { [blockValue]: cursorIndex }

  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
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

  // ===== 活用形→基本形 推定 =====
  const IRREGULAR = new Map([
    ["bound","bind"],["woven","weave"],["wove","weave"],
    ["written","write"],["wrote","write"],
    ["spoken","speak"],["spoke","speak"],
    ["broken","break"],["broke","break"],
    ["taken","take"],["took","take"],
    ["given","give"],["gave","give"],
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

  // ===== weak store =====
  function loadWeakSet(){
    const obj = safeParse(WEAK_KEY);
    const s = new Set();
    if (obj && typeof obj === "object") {
      for (const k of Object.keys(obj)) s.add(String(k));
    }
    return s;
  }
  function saveWeakSet(set){
    const obj = {};
    for (const id of set) obj[String(id)] = true;
    localStorage.setItem(WEAK_KEY, JSON.stringify(obj));
  }

  // 追加：ニガテ削除（正解したら自動で外す）
  function removeWeakId(id){
    const weakSet = loadWeakSet();
    if (!weakSet.has(String(id))) return;
    weakSet.delete(String(id));
    saveWeakSet(weakSet);
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
    const weakSet = loadWeakSet();
    weakInfo.textContent = `保存済みニガテ：${weakSet.size}問（ニガテ演習で正解すると自動で外れます）`;
    startWeakBtn.disabled = (weakSet.size === 0);
    retryWeakBtn.disabled = (weakSet.size === 0);
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
    random: false,
  };

  let current = null;
  let answeredThis = false;

  // ログ（結果表示用）
  let askedLog = [];

  function resetUIForNewQuestion(){
    answeredThis = false;
    nextBtn.disabled = true;
    resultEl.textContent = "";
    detailEl.textContent = "";
    hintArea.textContent = "";
    setHintVisible(false);
    hintBtn.disabled = false;
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

  function renderQuestion(){
    // ニガテモードは「保存済みニガテが0になったら即終了」
    if (session.mode === "weak") {
      const weakSet = loadWeakSet();
      if (weakSet.size === 0) {
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

    // ニガテモード：毎回「現在の弱点集合」から order を作り直してもいいが、重いので最小限にする。
    // ここでは「出題直前に、order の先頭がすでに外れていればスキップ」する方式にする。
    if (session.mode === "weak") {
      const weakSet = loadWeakSet();
      // order から弱点に残ってない問題を掃除（先頭から）
      while (session.cursor < session.order.length) {
        const qIndex = session.order[session.cursor];
        const qId = fixed[qIndex]?.id;
        if (qId && weakSet.has(String(qId))) break;
        session.cursor++;
      }
      // もう出題できるものがない
      if (session.cursor >= session.order.length) {
        // まだ弱点が残ってる可能性があるので、残りから新orderを再構築
        const ids = Array.from(weakSet);
        const eligible = [];
        const idSet = new Set(ids.map(String));
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

    // 順番モードの続き保存（通常のみ）
    if (!session.random && session.mode === "normal") {
      saveCursor(session.blockValue, session.cursor % session.order.length);
    }

    current = fixed[qIndex];

    questionEl.textContent = current.en;
    qMetaEl.textContent =
      `問題 ${session.answered + 1} / ${session.limit}` +
      `  ${session.random ? "・ランダム" : "・順番"}` +
      `  ${session.mode === "weak" ? "・ニガテ（正解で自動解除）" : ""}`;

    // 選択肢は毎回シャッフル
    const shownChoices = shuffle(current.choices);
    current._shownChoices = shownChoices;

    choicesEl.innerHTML = "";
    for (const c of shownChoices) {
      const btn = document.createElement("button");
      btn.textContent = c;
      btn.addEventListener("click", () => handleChoice(c));
      choicesEl.appendChild(btn);
    }

    renderStats();
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

  function handleChoice(choice){
    if (answeredThis) return;
    answeredThis = true;

    const correctChoiceNorm = currentCorrectChoiceNorm();
    const isCorrect = (norm(choice) === correctChoiceNorm);

    session.answered += 1;
    if (isCorrect) {
      session.correct += 1;
      resultEl.innerHTML = `<span class="ok">⭕️ 正解！</span>`;
    } else {
      const show = (current._shownChoices || current.choices).find(x => norm(x) === correctChoiceNorm) || current.choices[0];
      resultEl.innerHTML = `<span class="ng">❌ 不正解。</span> 正解は「${show}」`;
    }

    // ★ニガテ自動解除：ニガテ演習で正解なら、即WEAKから削除
    if (session.mode === "weak" && isCorrect) {
      removeWeakId(current.id);
      updateWeakInfo();
    }

    // 解説
    const fullJa = String(current.ja || "").trim();
    const note = String(current.note || "").trim();
    const meanings = buildChoiceMeanings(current._shownChoices || current.choices);

    let text = `【全文訳】\n${fullJa || "（なし）"}\n\n`;
    if (note) text += `【注釈】\n${note}\n\n`;
    text += `【選択肢の意味】\n${meanings}`;

    detailEl.innerHTML = `<pre class="pre">${escapeHtml(text)}</pre>`;

    // ログ
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

  // ===== summary =====
  function blockSelectLabel(v){
    if (v === "all") return "全範囲";
    return `Block ${v}`;
  }

  function renderSummary(autoCleared){
    const wrongs = askedLog.filter(x => !x.isCorrect);

    const tail = autoCleared ? "（ニガテを全て解消！）" : "";
    summaryLine.textContent =
      `結果：${session.correct} / ${session.limit}（${session.mode === "weak" ? "ニガテ演習" : "通常演習"}｜${session.random ? "ランダム" : "順番"}｜${blockSelectLabel(session.blockValue)}）${tail}`;

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

      // 自動管理なのでチェックは「表示だけ」扱い（UIは壊さずにそのまま）
      const tdChk = document.createElement("td");
      tdChk.innerHTML = `<span class="muted">自動</span>`;
      tr.appendChild(tdChk);

      wrongTbody.appendChild(tr);
    }
  }

  function finishSession(autoCleared){
    showSummary();
    renderSummary(autoCleared);

    // 「続き」は通常のみ
    continueBtn.disabled = (session.mode === "weak");
    retryWeakBtn.disabled = (loadWeakSet().size === 0);
  }

  // ===== build sessions =====
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
    session.random = !!randomOrder.checked;

    if (session.random) {
      session.order = shuffle(eligible);
      session.cursor = 0;
    } else {
      session.order = [...eligible];
      session.cursor = loadCursor(session.blockValue);
    }

    askedLog = [];
    showPlay();
    renderQuestion();
  }

  function startWeakSession(){
    const weakSet = loadWeakSet();
    const idSet = new Set(Array.from(weakSet).map(String));

    const eligible = [];
    for (let i = 0; i < fixed.length; i++) {
      if (idSet.has(fixed[i].id)) eligible.push(i);
    }

    if (eligible.length === 0) {
      alert("ニガテ問題がありません。");
      updateWeakInfo();
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

    session.random = true;
    session.order = shuffle(eligible);
    session.cursor = 0;

    askedLog = [];
    showPlay();
    renderQuestion();
  }

  // ===== EVENTS =====
  blockSelect.addEventListener("change", updatePoolInfo);
  countInput.addEventListener("input", updatePoolInfo);
  randomOrder.addEventListener("change", updatePoolInfo);

  startBtn.addEventListener("click", startNormalSession);

  startWeakBtn.addEventListener("click", () => {
    const weakSet = loadWeakSet();
    if (weakSet.size === 0) {
      alert("ニガテ問題がまだありません。まず通常演習で間違えた問題を登録してください。");
      return;
    }
    startWeakSession();
  });

  clearWeakBtn.addEventListener("click", () => {
    if (!confirm("保存済みニガテ問題をすべて消しますか？")) return;
    localStorage.removeItem(WEAK_KEY);
    updateWeakInfo();
  });

  backBtn.addEventListener("click", () => {
    showSetup();
    updatePoolInfo();
    updateWeakInfo();
  });

  summaryBackBtn.addEventListener("click", () => {
    showSetup();
    updatePoolInfo();
    updateWeakInfo();
  });

  continueBtn.addEventListener("click", () => {
    // 設定は維持したまま次セットへ（順番なら続きから）
    startNormalSession();
  });

  retryWeakBtn.addEventListener("click", () => {
    if (loadWeakSet().size === 0) {
      alert("ニガテがありません。");
      updateWeakInfo();
      return;
    }
    startWeakSession();
  });

  hintBtn.addEventListener("click", showHint);
  nextBtn.addEventListener("click", () => {
    if (!answeredThis) return;
    renderQuestion();
  });

  // ===== INIT =====
  function init(){
    renderBlockSelect();
    updatePoolInfo();
    updateWeakInfo();
    showSetup();
  }
  init();
});
