// sentence.js（丸ごと置き換え）
// 固定問題（window.SENTENCE_FIXED）だけで動く版
// - 音読（読み上げ）は通常時は () を削除した文字列で行う
// - 正解表示後の読み上げは、正解語を () に入れた完成文で行う
// - 出題順：先頭から / 続きから / ランダム
// - 自動読み上げ：チェックONなら問題表示時に自動で読む（設定は保存）
// - 正解表示後も、自動読み上げONなら完成文を1回自動で読む
// - 語句補充で不正解になった「正解語(answer)」だけを 英→日クイズの弱点に +1 連携
// - ニガテ：自動（間違いで入る）＋手動（ピン留め）
// - ニガテ演習は「自動＋手動」
// - ニガテ演習で正解：自動は解除 / 手動は残る
// - 手動チェックOFFは「完全削除」（自動も手動も消す）
// ★学習ログ（ホーム用）に 1問ごとに加算
// ★ゴイモン：大問9正解で ぶんみゃく +1
// ★ゴイモン表示は折りたたみ式
// ★進化演出は goimon.js の共通演出を利用
// ★追加：Block横断記録に sentenceAttempted / sentenceCorrect を保存

document.addEventListener("DOMContentLoaded", () => {
  function addLearningLog(isCorrect) {
    try {
      if (typeof window.zenshoLogAdd === "function") {
        window.zenshoLogAdd("sentence", !!isCorrect);
      }
    } catch {}
  }

  const questionProgressEl = document.getElementById("questionProgress");
  const setupBox = document.getElementById("setupBox");
  const playBox = document.getElementById("playBox");
  const summaryBox = document.getElementById("summaryBox");

  const startBtn = document.getElementById("startBtn");
  let openProblemListBtn = document.getElementById("openProblemListBtn");
  const startWeakBtn = document.getElementById("startWeakBtn");
  const clearWeakBtn = document.getElementById("clearWeakBtn");

  const backBtn = document.getElementById("backBtn");
  const summaryBackBtn = document.getElementById("summaryBackBtn");
  const retrySameBtn = document.getElementById("retrySameBtn");
  const continueBtn = document.getElementById("continueBtn");
  const retryWeakBtn = document.getElementById("retryWeakBtn");

  const blockSelect = document.getElementById("blockSelect");
  const countInput = document.getElementById("countInput");
  const orderModeEl = document.getElementById("orderMode");
  const autoReadEl = document.getElementById("autoRead");
  const poolInfo = document.getElementById("poolInfo");
  const weakInfo = document.getElementById("weakInfo");

  const statsEl = document.getElementById("stats");
  const readBtn = document.getElementById("readBtn");
  const hintBtn = document.getElementById("hintBtn");
  const nextBtn = document.getElementById("nextQ");
  const questionEl = document.getElementById("question");
  const qMetaEl = document.getElementById("qMeta");
  const hintArea = document.getElementById("hintArea");
  const choicesEl = document.getElementById("choices");
  const resultEl = document.getElementById("result");
  const detailEl = document.getElementById("detail");

const summaryLine = document.getElementById("summaryLine");
const askedEmpty = document.getElementById("askedEmpty");
const askedTable = document.getElementById("askedTable");
const askedTbody = document.getElementById("askedTbody");
const wrongEmpty = document.getElementById("wrongEmpty");
const wrongTable = document.getElementById("wrongTable");
const wrongTbody = document.getElementById("wrongTbody");

  const refreshWeakViewBtn = document.getElementById("refreshWeakView");
  const weakAutoListEl = document.getElementById("weakAutoList");
const weakAutoEmptyEl = document.getElementById("weakAutoEmpty");
const weakPinListEl = document.getElementById("weakPinList");
const weakPinEmptyEl = document.getElementById("weakPinEmpty");
  let problemListBox = document.getElementById("problemListBox");
  let problemListBackBtn = document.getElementById("problemListBackBtn");
  let problemListSummary = document.getElementById("problemListSummary");
  let problemListEmpty = document.getElementById("problemListEmpty");
  let problemListBody = document.getElementById("problemListBody");

  let problemListBlockSelect = document.getElementById("problemListBlockSelect");
  let toggleProblemListAnswersBtn = document.getElementById("toggleProblemListAnswersBtn");
  let shuffleProblemListBtn = document.getElementById("shuffleProblemListBtn");
    function ensureProblemListDom() {
    // 問題一覧ボタンがHTML側にない場合は、JS側で作る
    if (!openProblemListBtn && startBtn && startBtn.parentElement) {
      openProblemListBtn = document.createElement("button");
      openProblemListBtn.id = "openProblemListBtn";
      openProblemListBtn.type = "button";
      openProblemListBtn.textContent = "問題一覧を見る";

      startBtn.insertAdjacentElement("afterend", openProblemListBtn);
    }

    // 問題一覧BOXがHTML側にない場合は、JS側で作る
    if (!problemListBox && setupBox) {
      problemListBox = document.createElement("div");
      problemListBox.className = "card problemListBox";
      problemListBox.id = "problemListBox";
      problemListBox.style.display = "none";

      problemListBox.innerHTML = `
        <div class="row">
          <div>
            <div style="font-size:18px; font-weight:700;">大問9 問題一覧</div>
            <div class="problemListSummary" id="problemListSummary">
              固定問題の問題文・選択肢・正答・日本語訳を確認できます。
            </div>
          </div>
          <div>
            <button id="problemListBackBtn" type="button">設定へ戻る</button>
          </div>
        </div>

        <div class="problemListControls">
          <label>
            表示ブロック
            <select id="problemListBlockSelect">
              <option value="all">すべて</option>
            </select>
          </label>

          <button id="toggleProblemListAnswersBtn" type="button">正答を隠す</button>
          <button id="shuffleProblemListBtn" type="button">ランダム表示</button>
        </div>

        <div class="hr"></div>

        <div class="muted" style="margin-bottom:10px;">
          チェックをONにすると手動ニガテに追加されます。OFFにすると手動ニガテだけ解除します。自動ニガテが残っている場合は、自動ニガテは消えません。
        </div>

        <div id="problemListEmpty" class="muted" style="display:none;">
          表示できる問題がありません。
        </div>

        <div id="problemListBody"></div>
      `;

      setupBox.insertAdjacentElement("afterend", problemListBox);
    }

    // 問題一覧BOXはあるが、中の操作部品だけない場合の保険
    if (problemListBox && !document.getElementById("problemListBlockSelect")) {
      const controlBox = document.createElement("div");
      controlBox.className = "problemListControls";
      controlBox.innerHTML = `
        <label>
          表示ブロック
          <select id="problemListBlockSelect">
            <option value="all">すべて</option>
          </select>
        </label>

        <button id="toggleProblemListAnswersBtn" type="button">正答を隠す</button>
        <button id="shuffleProblemListBtn" type="button">ランダム表示</button>
      `;

      const hr = problemListBox.querySelector(".hr");
      if (hr) {
        hr.insertAdjacentElement("beforebegin", controlBox);
      } else {
        problemListBox.insertAdjacentElement("afterbegin", controlBox);
      }
    }

    // 再取得
    problemListBox = document.getElementById("problemListBox");
    problemListBackBtn = document.getElementById("problemListBackBtn");
    problemListSummary = document.getElementById("problemListSummary");
    problemListEmpty = document.getElementById("problemListEmpty");
    problemListBody = document.getElementById("problemListBody");

    problemListBlockSelect = document.getElementById("problemListBlockSelect");
    toggleProblemListAnswersBtn = document.getElementById("toggleProblemListAnswersBtn");
    shuffleProblemListBtn = document.getElementById("shuffleProblemListBtn");

    // CSSがHTML側に反映されていない場合の最低限の保険
    if (!document.getElementById("problemListFallbackStyle")) {
      const style = document.createElement("style");
      style.id = "problemListFallbackStyle";
      style.textContent = `
        .problemListBox { margin-top: 12px; }
        .problemListControls {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          margin-top: 12px;
        }
        .problemListControls label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #555;
          font-weight: 700;
        }
        .problemListControls select {
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid #ddd;
          background: #fff;
          font-size: 14px;
        }
        .problemListItem {
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 12px;
          margin: 10px 0;
          background: #fff;
        }
        .problemMaskedCard {
          border: 1px dashed #d8d8d8;
          background: #fafafa;
          border-radius: 12px;
          padding: 12px;
          color: #777;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          width: 100%;
          cursor: pointer;
        }
      `;
      document.head.appendChild(style);
    }
  }

  ensureProblemListDom();

  const levelBadgeEl = document.getElementById("levelBadge");

  const toggleGoimonBtn = document.getElementById("toggleGoimon");
  const goimonCardEl = document.getElementById("goimonCard");
  const evolutionNoticeBtn = document.getElementById("evolutionNoticeBtn");

  function must(el, id) {
    if (!el) throw new Error(`sentence.html に #${id} が見つかりません`);
  }

  [
    [questionProgressEl, "questionProgress"],
[askedEmpty, "askedEmpty"],
[askedTable, "askedTable"],
[askedTbody, "askedTbody"],
    [setupBox, "setupBox"],
    [playBox, "playBox"],
    [summaryBox, "summaryBox"],
    [startBtn, "startBtn"],
    [openProblemListBtn, "openProblemListBtn"],
    [startWeakBtn, "startWeakBtn"],
    [clearWeakBtn, "clearWeakBtn"],
    [backBtn, "backBtn"],
    [summaryBackBtn, "summaryBackBtn"],
    [retrySameBtn, "retrySameBtn"],
    [continueBtn, "continueBtn"],
    [retryWeakBtn, "retryWeakBtn"],
    [blockSelect, "blockSelect"],
    [countInput, "countInput"],
    [orderModeEl, "orderMode"],
    [autoReadEl, "autoRead"],
    [poolInfo, "poolInfo"],
    [weakInfo, "weakInfo"],
    [statsEl, "stats"],
    [readBtn, "readBtn"],
    [hintBtn, "hintBtn"],
    [nextBtn, "nextQ"],
    [questionEl, "question"],
    [qMetaEl, "qMeta"],
    [hintArea, "hintArea"],
    [choicesEl, "choices"],
    [resultEl, "result"],
    [detailEl, "detail"],
    [summaryLine, "summaryLine"],
    [wrongEmpty, "wrongEmpty"],
    [wrongTable, "wrongTable"],
    [wrongTbody, "wrongTbody"],
    [refreshWeakViewBtn, "refreshWeakView"],
    [weakAutoListEl, "weakAutoList"],
[weakAutoEmptyEl, "weakAutoEmpty"],
[weakPinListEl, "weakPinList"],
[weakPinEmptyEl, "weakPinEmpty"],
    [problemListBox, "problemListBox"],
    [problemListBackBtn, "problemListBackBtn"],
    [problemListSummary, "problemListSummary"],
    [problemListEmpty, "problemListEmpty"],
    [problemListBody, "problemListBody"],
    [problemListBlockSelect, "problemListBlockSelect"],
    [toggleProblemListAnswersBtn, "toggleProblemListAnswersBtn"],
    [shuffleProblemListBtn, "shuffleProblemListBtn"],
    [levelBadgeEl, "levelBadge"],
    [toggleGoimonBtn, "toggleGoimon"],
    [goimonCardEl, "goimonCard"],
    [evolutionNoticeBtn, "evolutionNoticeBtn"]
  ].forEach(([el, id]) => must(el, id));

  const lv = String(window.ACTIVE_LEVEL || localStorage.getItem("zensho_level_v1") || "1");
  const fixedRaw = (lv === "2")
    ? (window.SENTENCE_FIXED_2KYU || [])
    : (window.SENTENCE_FIXED_1KYU || []);
    
  const GOIMON_UI_KEY = `zensho_sentence_goimon_ui_v1_lv${lv}`;
  const GLOBAL_BLOCK_KEY = `zensho_block_global_lv${lv}_v1`;

  if (levelBadgeEl) {
    levelBadgeEl.textContent = `現在：全商英検 ${lv}級（大問9演習）`;
  }

  const WORDS_1 = window.WORDS_1KYU || [];
  const WORDS_2 = window.WORDS_2KYU || [];
  const EXTRA = window.EXTRA_WORDS || [];
  const words = window.WORDS || [];
  const blocks = window.BLOCKS || [];

  const norm = (s) => String(s || "").trim().toLowerCase();

  const WEAK_KEY = `zensho_sentence_fixed_weak_v2_lv${lv}`;
  const ORDER_CURSOR_KEY = `zensho_sentence_fixed_order_cursor_lv${lv}`;
  const SETTINGS_KEY = `zensho_sentence_fixed_settings_v1_lv${lv}`;

  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function loadSettings() {
    const s = safeParse(SETTINGS_KEY);
    return { autoRead: !!s?.autoRead };
  }

  function saveSettings(obj) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ autoRead: !!obj.autoRead }));
  }

  function addSentenceGoimonProgress() {
    try {
      if (!window.GoimonUI || typeof window.GoimonUI.addSentenceCorrect !== "function") return;
      window.GoimonUI.addSentenceCorrect();

      if (typeof window.renderSentenceGoimonMini === "function") {
        window.renderSentenceGoimonMini();
      }

      renderEvolutionNotice();
    } catch (e) {
      console.warn("addSentenceGoimonProgress failed:", e);
    }
  }

  function buildMeaningMapFrom(list) {
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

  function lookupMeaningBase(wordLower) {
    if (!wordLower) return "";
    return map1.get(wordLower) || map2.get(wordLower) || mapE.get(wordLower) || "";
  }

  const wordIndexMap = new Map();
  for (let i = 0; i < words.length; i++) {
    const en = norm(words[i]?.en);
    if (en && !wordIndexMap.has(en)) wordIndexMap.set(en, i);
  }

  function getBlockByWordIndex(idx) {
    if (!Number.isFinite(idx)) return null;
    const no = idx + 1;
    return blocks.find(b => no >= Number(b.start) && no <= Number(b.end)) || null;
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

  function addGlobalSentence(blockId, isCorrect) {
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

    if (!Number.isFinite(g.byBlock[k].sentenceAttempted)) g.byBlock[k].sentenceAttempted = 0;
    if (!Number.isFinite(g.byBlock[k].sentenceCorrect)) g.byBlock[k].sentenceCorrect = 0;

    g.byBlock[k].sentenceAttempted += 1;
    if (isCorrect) g.byBlock[k].sentenceCorrect += 1;

    saveGlobal(g);
  }

  const fixed = fixedRaw
    .map(q => {
      const answerNorm = norm(q.answer);
      const wordIdx = wordIndexMap.get(answerNorm);
      const block = getBlockByWordIndex(wordIdx);
      return {
        id: String(q.id || ""),
        answer: answerNorm,
        en: String(q.en || ""),
        ja: String(q.ja || q.hint || ""),
        note: String(q.note || ""),
        choices: Array.isArray(q.choices) ? q.choices.map(x => String(x)) : [],
        wordIndex: Number.isFinite(wordIdx) ? wordIdx : -1,
        blockId: block ? Number(block.id) : 0
      };
    })
    .filter(q => q.id && q.en && q.ja && q.choices.length === 4);

  const fixedById = new Map();
  for (const q of fixed) fixedById.set(String(q.id), q);

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function clearQuestionProgress() {
  if (window.QuizUICommon && typeof window.QuizUICommon.clearText === "function") {
    window.QuizUICommon.clearText(questionProgressEl);
  } else if (questionProgressEl) {
    questionProgressEl.textContent = "";
  }
}

function showSetup() {
  setupBox.style.display = "block";
  problemListBox.style.display = "none";
  playBox.style.display = "none";
  summaryBox.style.display = "none";
  clearQuestionProgress();
}

function showProblemList() {
  setupBox.style.display = "none";
  problemListBox.style.display = "block";
  playBox.style.display = "none";
  summaryBox.style.display = "none";
  clearQuestionProgress();
}

function showPlay() {
  setupBox.style.display = "none";
  problemListBox.style.display = "none";
  playBox.style.display = "block";
  summaryBox.style.display = "none";
}

function showSummary() {
  setupBox.style.display = "none";
  problemListBox.style.display = "none";
  playBox.style.display = "none";
  summaryBox.style.display = "block";
  clearQuestionProgress();
}
  function setHintVisible(on) {
    hintArea.style.display = on ? "block" : "none";
  }

  function stripAnswerInJaForHint(ja) {
    return String(ja || "")
      .replace(/「[^」]*」/g, "「」")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  function escapeHtml(s) {
    return String(s)
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

  function sanitizeForQuestionSpeech(text) {
    let t = String(text || "");
    t = t.replace(/\([^)]*\)/g, " ");
    t = t.replace(/（[^）]*）/g, " ");
    t = t.replace(/\s{2,}/g, " ").trim();
    return t;
  }

  function buildAnswerFilledSpeechText(text, answer) {
    const ans = String(answer || "").trim();
    let t = String(text || "");

    if (!ans) return sanitizeForQuestionSpeech(t);

    const replaced = t
      .replace(/\([^)]*\)/g, `(${ans})`)
      .replace(/（[^）]*）/g, `(${ans})`);

    if (replaced !== t) {
      return replaced.replace(/\s{2,}/g, " ").trim();
    }

    return `${sanitizeForQuestionSpeech(t)} (${ans})`.replace(/\s{2,}/g, " ").trim();
  }

  function speakEnglish(text) {
    if (!("speechSynthesis" in window)) return;
    const t = String(text || "").trim();
    if (!t) return;

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "en-US";
    u.rate = 0.95;
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
    document.querySelectorAll("#choices button").forEach(b => {
      b.disabled = true;
    });
  }

  function markCorrectButtonGreen(correctNorm) {
  document.querySelectorAll("#choices button").forEach(b => {
    const choiceNorm = b.dataset.choiceNorm || "";
    if (choiceNorm === correctNorm) {
      b.classList.add("correct");
    }
  });
}

  const IRREGULAR = new Map([
    ["bound", "bind"], ["woven", "weave"], ["wove", "weave"], ["occurred", "occur"],
    ["written", "write"], ["wrote", "write"], ["drove", "drive"], ["driven", "drive"],
    ["spoken", "speak"], ["spoke", "speak"], ["broken", "break"], ["broke", "break"],
    ["taken", "take"], ["took", "take"], ["dropped", "drop"], ["given", "give"], ["gave", "give"],
    ["stirred", "stir"], ["made", "make"], ["ran", "run"], ["gone", "go"], ["went", "go"],
    ["seen", "see"], ["saw", "see"], ["known", "know"], ["knew", "know"], ["felt", "feel"],
    ["left", "leave"], ["lost", "lose"], ["paid", "pay"], ["kept", "keep"], ["held", "hold"],
    ["built", "build"], ["bought", "buy"], ["caught", "catch"], ["taught", "teach"],
    ["thought", "think"], ["found", "find"], ["said", "say"], ["sent", "send"], ["spent", "spend"],
    ["stood", "stand"], ["told", "tell"], ["understood", "understand"], ["worn", "wear"],
    ["wore", "wear"], ["cut", "cut"], ["put", "put"], ["set", "set"], ["hit", "hit"], ["hurt", "hurt"]
  ]);

  function CAZ(x) {
    return String(x || "").trim().toLowerCase().replace(/[^a-z]/g, "");
  }

  function guessBaseForms(w) {
    const s = CAZ(w);
    const cand = [];
    if (!s) return cand;

    const irr = IRREGULAR.get(s);
    if (irr) cand.push(irr);

    cand.push(s);

    if (s.endsWith("ied")) cand.push(s.slice(0, -3) + "y");
    if (s.endsWith("ed")) cand.push(s.slice(0, -2));
    if (s.endsWith("ed")) cand.push(s.slice(0, -1));

    if (s.endsWith("ing")) cand.push(s.slice(0, -3));
    if (s.endsWith("ing")) cand.push(s.slice(0, -3) + "e");

    if (s.endsWith("ies")) cand.push(s.slice(0, -3) + "y");
    if (s.endsWith("es")) cand.push(s.slice(0, -2));
    if (s.endsWith("s")) cand.push(s.slice(0, -1));

    return Array.from(new Set(cand)).filter(Boolean);
  }

  function meaningForForm(word) {
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

  function loadWeakMap() {
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

  function saveWeakMap(map) {
    localStorage.setItem(WEAK_KEY, JSON.stringify(map));
  }

  function addAutoWeak(id) {
    const map = loadWeakMap();
    const k = String(id);
    if (!map[k]) map[k] = { auto: true, pin: false };
    map[k].auto = true;
    saveWeakMap(map);
  }

  function setPinned(id, on) {
    const map = loadWeakMap();
    const k = String(id);
    if (on) {
      if (!map[k]) map[k] = { auto: false, pin: true };
      map[k].pin = true;
      saveWeakMap(map);
      return;
    }
    if (map[k]) {
      delete map[k];
      saveWeakMap(map);
    }
  }

  function removeAutoIfNotPinned(id) {
    const map = loadWeakMap();
    const k = String(id);
    if (!map[k]) return;
    if (map[k].pin) return;
    delete map[k];
    saveWeakMap(map);
  }

  function weakCounts() {
    const map = loadWeakMap();
    let autoOnly = 0;
    let pinned = 0;
    for (const k of Object.keys(map)) {
      if (map[k].pin) pinned++;
      else autoOnly++;
    }
    return { autoOnly, pinned, total: autoOnly + pinned };
  }

  function getWeakStateById(id) {
  const map = loadWeakMap();
  const st = map[String(id)] || { auto: false, pin: false };
  return { auto: !!st.auto, pin: !!st.pin };
}

  function loadCursor(blockValue) {
    const obj = safeParse(ORDER_CURSOR_KEY);
    const v = obj?.[String(blockValue)];
    return Number.isFinite(v) ? v : 0;
  }

  function saveCursor(blockValue, cursor) {
    const obj = safeParse(ORDER_CURSOR_KEY) || {};
    obj[String(blockValue)] = cursor;
    localStorage.setItem(ORDER_CURSOR_KEY, JSON.stringify(obj));
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

  function getRangeByBlockValue(v) {
    if (v === "all") return [0, Math.max(0, words.length - 1)];
    const b = blocks.find(x => String(x.id) === String(v));
    if (!b) return [0, Math.max(0, words.length - 1)];
    const s = Math.max(0, Number(b.start) - 1);
    const e = Math.min(words.length - 1, Number(b.end) - 1);
    return [s, e];
  }

  function buildEligibleQuestionsByRange(startIdx, endIdx) {
    const list = [];
    for (let i = 0; i < fixed.length; i++) {
      const idx = fixed[i].wordIndex;
      if (!Number.isFinite(idx) || idx < 0) continue;
      if (idx < startIdx || idx > endIdx) continue;
      list.push(i);
    }
    return list;
  }

  function updatePoolInfo() {
    const [s, e] = getRangeByBlockValue(blockSelect.value);
    const eligible = buildEligibleQuestionsByRange(s, e);
    poolInfo.textContent = `この設定で出題可能：${eligible.length}問`;
  }

  function updateWeakInfo() {
    const c = weakCounts();
    weakInfo.textContent = `ニガテ：合計 ${c.total}（自動 ${c.autoOnly} / 手動 ${c.pinned}）`;
    startWeakBtn.disabled = (c.total === 0);
    retryWeakBtn.disabled = (c.total === 0);
  }

  function renderWeakManagement() {
    const map = loadWeakMap();
    const autoIds = [];
    const pinIds = [];

    for (const id of Object.keys(map)) {
      const st = map[id];
      if (st.pin) pinIds.push(id);
      else autoIds.push(id);
    }

    autoIds.sort((a, b) => Number(a) - Number(b));
    pinIds.sort((a, b) => Number(a) - Number(b));

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

  function pushWeakToEnJa(answerWordLower, weight) {
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

  let session = {
    mode: "normal",
    blockValue: "all",
    eligible: [],
    order: [],
    cursor: 0,
    limit: 20,
    correct: 0,
    answered: 0,
    orderMode: "continue",
    autoRead: false,
    askedOrder: []
  };

  let current = null;
  let answeredThis = false;
  let askedLog = [];

  let problemListBlockFilter = "all";
  let problemListAnswersVisible = true;
  let problemListRandomMode = false;
  let problemListRandomIds = [];
  let problemListChoiceMeaningOpenMap = {};
  let problemListAnswerOpenMap = {};
  let problemListChoiceResultMap = {};
  let problemListHiddenChoiceMap = {};
  let problemListMeaningMapCache = null;

  function resetUIForNewQuestion() {
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

  function currentCorrectChoiceNorm() {
    const ans = current.answer;
    const inChoices = current.choices.map(norm).includes(ans);
    if (ans && inChoices) return ans;
    return norm(current.choices[0] || "");
  }

  function currentCorrectChoiceShown() {
    const correctNorm = currentCorrectChoiceNorm();
    return (current._shownChoices || current.choices).find(x => norm(x) === correctNorm) || current.choices[0] || current.answer || "";
  }

  function speakCurrentQuestionVersion() {
    if (!current) return;
    speakEnglish(sanitizeForQuestionSpeech(current.en));
  }

  function speakCurrentAnsweredVersion() {
    if (!current) return;
    const correctShown = currentCorrectChoiceShown();
    speakEnglish(buildAnswerFilledSpeechText(current.en, correctShown));
  }

  function renderStats() {
    statsEl.textContent = `今回：${session.answered}/${session.limit}（正解 ${session.correct}）`;
  }

  function renderQuestionProgress() {
  if (!session.limit || session.limit <= 0 || !playBox || playBox.style.display === "none") {
    clearQuestionProgress();
    return;
  }

  const currentNo = Math.min(session.answered + 1, session.limit);

  if (window.QuizUICommon && typeof window.QuizUICommon.renderQuestionProgress === "function") {
    window.QuizUICommon.renderQuestionProgress(questionProgressEl, currentNo, session.limit);
    return;
  }

  questionProgressEl.textContent = `第${currentNo}問 / ${session.limit}問`;
}

  function orderModeText() {
    if (session.mode === "weak") return "ニガテ";
    if (session.orderMode === "retry") return "同セット再挑戦";
    if (session.orderMode === "start") return "先頭";
    if (session.orderMode === "continue") return "続き";
    return "ランダム";
  }
  function renderQuestion() {
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
  clearQuestionProgress();
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
    if (session.askedOrder.length < session.limit) session.askedOrder.push(qIndex)
  
    if (session.mode === "normal" && session.orderMode === "continue") {
      saveCursor(session.blockValue, session.cursor % session.order.length);
    }

current = fixed[qIndex];

renderQuestionProgress();

const blockText = current.blockId ? `Block ${current.blockId}` : "Block ?";
questionEl.textContent = current.en;
qMetaEl.textContent =
  `${blockText}` +
  ` ・${orderModeText()}` +
  ` ・${session.mode === "weak" ? "自動は正解で解除／手動は残る" : "通常演習"}` +
  ` ・自動読み上げ:${session.autoRead ? "ON" : "OFF"}`;

    const shownChoices = shuffle(current.choices);
    current._shownChoices = shownChoices;

    choicesEl.innerHTML = "";

const choiceNumbers = ["①", "②", "③", "④"];

for (let i = 0; i < shownChoices.length; i++) {
  const c = shownChoices[i];

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "choiceBtn";
  btn.dataset.choiceNorm = norm(c);

  btn.innerHTML = `
    <span class="choiceIndex">${choiceNumbers[i] || String(i + 1)}</span>
    <span class="choiceText">${escapeHtml(c)}</span>
  `;

  btn.addEventListener("click", () => {
    ensureAudioReady();
    handleChoice(c, btn);
  });

  choicesEl.appendChild(btn);
}

    renderStats();
    renderEvolutionNotice();

    if (session.autoRead) {
      try {
        speakCurrentQuestionVersion();
      } catch {}
    }
  }

  function showHint() {
    if (!current) return;
    const h = stripAnswerInJaForHint(current.ja);
    hintArea.textContent = h ? `ヒント：${h}` : "ヒント：（なし）";
    setHintVisible(true);
    hintBtn.disabled = true;
  }

  function buildChoiceMeanings(choices) {
    const lines = [];
    for (const c of choices) lines.push(`・${c}：${meaningForForm(c)}`);
    return lines.join("\n");
  }

  function handleChoice(choice, clickedBtn) {
  if (answeredThis) return;
  answeredThis = true;

  const correctChoiceNorm = currentCorrectChoiceNorm();
  const isCorrect = (norm(choice) === correctChoiceNorm);

  session.answered += 1;
  addLearningLog(isCorrect);

  // ★先に次へ進める状態にしておく
  // 不正解時の弱点登録や解説表示の途中でエラーが出ても、次へ進めるようにする
  nextBtn.disabled = false;
  hintBtn.disabled = true;
  setHintVisible(false);

  const weakMapBefore = loadWeakMap();
  const wasWeak = !!weakMapBefore[String(current.id)];

  if (isCorrect) {
    session.correct += 1;
    resultEl.innerHTML = `<span class="ok">⭕️ 正解！</span>`;

    if (clickedBtn) {
      clickedBtn.classList.add("correct");
    }

    playCorrectSound();
    addSentenceGoimonProgress();

  } else {
    const show = currentCorrectChoiceShown();
    resultEl.innerHTML = `<span class="ng">❌ 不正解。</span> 正解は「${escapeHtml(show)}」`;

    if (clickedBtn) {
      clickedBtn.classList.add("wrong");
    }

    playWrongSound();
    markCorrectButtonGreen(correctChoiceNorm);

    addAutoWeak(current.id);
    pushWeakToEnJa(current.answer, 1);

    updateWeakInfo();
    renderWeakManagement();
  }

  if (current.blockId) {
    addGlobalSentence(current.blockId, isCorrect);
  }

  if (session.mode === "weak" && isCorrect && wasWeak) {
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

  const correctShown = currentCorrectChoiceShown();

  askedLog.push({
    qId: current.id,
    en: current.en,
    ja: current.ja,
    yourChoice: String(choice),
    correctChoice: String(correctShown),
    isCorrect,
    blockId: current.blockId
  });

  renderStats();
  renderEvolutionNotice();

  if (session.autoRead) {
    try {
      setTimeout(() => {
        speakCurrentAnsweredVersion();
      }, 250);
    } catch {}
  }
}

  function blockSelectLabel(v) {
    if (v === "all") return "全範囲";
    return `Block ${v}`;
  }

  function isPinned(id) {
    const map = loadWeakMap();
    const st = map[String(id)];
    return !!(st && st.pin);
  }

 function renderWeakBadgesById(qId) {
  const st = getWeakStateById(qId);
  const chips = [];

  if (st.pin) {
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
        手動ニガテ
      </span>
    `);
  }

  if (st.auto) {
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
        自動ニガテ
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

function getProblemListCorrectChoiceShown(q) {
  if (!q) return "";

  const ans = norm(q.answer);
  const choices = Array.isArray(q.choices) ? q.choices : [];

  const found = choices.find(c => norm(c) === ans);
  if (found) return found;

  return choices[0] || q.answer || "";
}

function renderProblemListBadges(qId) {
  const st = getWeakStateById(qId);
  const chips = [];

  if (st.pin) {
    chips.push(`
      <span class="pill" style="background:#fff4d6; color:#8a5a00; border-color:#f0d28a;">
        手動ニガテ
      </span>
    `);
  }

  if (st.auto) {
    chips.push(`
      <span class="pill" style="background:#eef5ff; color:#1f58b1; border-color:#cfe0ff;">
        自動ニガテ
      </span>
    `);
  }

  if (!chips.length) {
    chips.push(`
      <span class="pill" style="background:#f5f5f5; color:#666; border-color:#ddd;">
        通常
      </span>
    `);
  }

  return chips.join("");
}

/*
  問題一覧専用の手動ニガテ切り替え。
  既存の setPinned(id, false) は「完全削除」仕様なので、
  問題一覧では auto を壊さない専用処理にする。
*/
function setProblemListPinned(id, on) {
  const map = loadWeakMap();
  const k = String(id);

  if (on) {
    if (!map[k]) {
      map[k] = { auto: false, pin: true };
    }
    map[k].pin = true;
    saveWeakMap(map);
    return;
  }

  if (!map[k]) return;

  map[k].pin = false;

  // 自動ニガテが残っているなら、auto は消さない
  if (map[k].auto) {
    saveWeakMap(map);
    return;
  }

  // 手動だけのニガテだった場合は、項目ごと削除
  delete map[k];
  saveWeakMap(map);
}

function getProblemListBlockOptions() {
  const set = new Set();

  fixed.forEach(q => {
    if (q && q.blockId !== undefined && q.blockId !== null && q.blockId !== "") {
      set.add(String(q.blockId));
    }
  });

  return Array.from(set).sort((a, b) => {
    const na = Number(a);
    const nb = Number(b);

    if (!Number.isNaN(na) && !Number.isNaN(nb)) {
      return na - nb;
    }

    return String(a).localeCompare(String(b), "ja");
  });
}

function renderProblemListControls() {
  const blocks = getProblemListBlockOptions();

  const currentValue = problemListBlockFilter;

  problemListBlockSelect.innerHTML = `
    <option value="all">すべて</option>
    ${blocks.map(blockId => {
      return `<option value="${escapeAttr(blockId)}">Block ${escapeHtml(blockId)}</option>`;
    }).join("")}
  `;

  if (currentValue === "all" || blocks.includes(String(currentValue))) {
    problemListBlockFilter = currentValue;
  } else {
    problemListBlockFilter = "all";
  }

  problemListBlockSelect.value = problemListBlockFilter;

  toggleProblemListAnswersBtn.textContent = problemListAnswersVisible
    ? "正答を隠す"
    : "正答を表示する";

  shuffleProblemListBtn.textContent = problemListRandomMode
    ? "元の順に戻す"
    : "ランダム表示";
}

function getProblemListBaseItems() {
  return fixed.map((q, index) => ({
    q,
    index
  }));
}

function getProblemListFilteredItems() {
  let items = getProblemListBaseItems();

  if (problemListBlockFilter !== "all") {
    items = items.filter(item => {
      return String(item.q.blockId) === String(problemListBlockFilter);
    });
  }

  return items;
}

function shuffleArray(arr) {
  const copied = arr.slice();

  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copied[i];
    copied[i] = copied[j];
    copied[j] = tmp;
  }

  return copied;
}

function getProblemListDisplayChoices(q) {
  if (!q || !Array.isArray(q.choices)) return [];

  // 正答表示中は、元データの順番で表示
  if (problemListAnswersVisible) {
    return q.choices;
  }

  const key = String(q.id);

  // 正答を隠している間は、問題ごとにランダム順を固定する
  if (!Array.isArray(problemListHiddenChoiceMap[key])) {
    problemListHiddenChoiceMap[key] = shuffleArray(q.choices);
  }

  return problemListHiddenChoiceMap[key];
}

function refreshProblemListRandomIds() {
  const ids = getProblemListFilteredItems().map(item => String(item.q.id));
  problemListRandomIds = shuffleArray(ids);
}

function getProblemListVisibleItems() {
  const items = getProblemListFilteredItems();

  if (!problemListRandomMode) {
    return items;
  }

  const currentIds = items.map(item => String(item.q.id));
  const currentIdSet = new Set(currentIds);

  const randomIsValid =
    problemListRandomIds.length === currentIds.length &&
    problemListRandomIds.every(id => currentIdSet.has(String(id)));

  if (!randomIsValid) {
    refreshProblemListRandomIds();
  }

  const orderMap = new Map();
  problemListRandomIds.forEach((id, index) => {
    orderMap.set(String(id), index);
  });

  return items.slice().sort((a, b) => {
    return orderMap.get(String(a.q.id)) - orderMap.get(String(b.q.id));
  });
}

function normalizeMeaningKey(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function addMeaningToMap(map, en, ja) {
  const key = normalizeMeaningKey(en);
  const val = String(ja || "").trim();

  if (!key || !val) return;

  if (!map.has(key)) {
    map.set(key, val);
  }
}

function buildProblemListMeaningMap() {
  const map = new Map();

  const sourceArrays = [
    window.WORDS,
    window.WORDS_1KYU,
    window.WORDS_2KYU,
    window.WORD_EXTRA,
    window.WORD_EXTRA_1KYU,
    window.WORD_EXTRA_2KYU,
    window.EXTRA_WORDS,
    window.EXTRA_WORDS_1KYU,
    window.EXTRA_WORDS_2KYU
  ];

  sourceArrays.forEach(arr => {
    if (!Array.isArray(arr)) return;

    arr.forEach(item => {
      if (!item) return;

      // オブジェクト形式 { en, ja } 想定
      if (typeof item === "object" && !Array.isArray(item)) {
        const en =
          item.en ||
          item.word ||
          item.answer ||
          item.expression ||
          item.term ||
          "";

        const ja =
          item.ja ||
          item.meaning ||
          item.jp ||
          item.answerJa ||
          item.translation ||
          "";

        addMeaningToMap(map, en, ja);
        return;
      }

      // 配列形式 ["word", "意味"] の保険
      if (Array.isArray(item)) {
        addMeaningToMap(map, item[0], item[1]);
      }
    });
  });

  return map;
}

function getProblemListMeaningMap() {
  if (!problemListMeaningMapCache) {
    problemListMeaningMapCache = buildProblemListMeaningMap();
  }

  return problemListMeaningMapCache;
}

function getChoiceMeaning(choice) {
  const map = getProblemListMeaningMap();
  const key = normalizeMeaningKey(choice);

  return map.get(key) || "意味データ未登録";
}

function renderChoiceMeaningList(q, correctShown, displayChoices) {
  const choiceNumbers = ["①", "②", "③", "④"];
  const correctNorm = norm(correctShown);
  const choices = Array.isArray(displayChoices) ? displayChoices : q.choices;

  const rows = choices.map((choice, i) => {
    const isCorrect = norm(choice) === correctNorm;
    const meaning = getChoiceMeaning(choice);

    return `
      <div class="choiceMeaningRow ${isCorrect ? "correct" : ""}">
        <div class="choiceMeaningWord">
          ${choiceNumbers[i] || String(i + 1)}
          <span class="mono">${escapeHtml(choice)}</span>
        </div>
        <div class="choiceMeaningJa">
          ${escapeHtml(meaning)}
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="choiceMeaningBox">
      ${rows}
    </div>
  `;
}

function renderProblemList() {
  renderProblemListControls();

  problemListBody.innerHTML = "";

  if (!fixed.length) {
    problemListEmpty.style.display = "block";
    problemListSummary.textContent = "表示できる固定問題がありません。";
    return;
  }

  const visibleItems = getProblemListVisibleItems();

  if (!visibleItems.length) {
    problemListEmpty.style.display = "block";
    problemListSummary.textContent = "この条件で表示できる問題がありません。";
    return;
  }

  problemListEmpty.style.display = "none";

  const weakMap = loadWeakMap();
  const manualCount = Object.keys(weakMap).filter(id => weakMap[id]?.pin).length;
  const autoCount = Object.keys(weakMap).filter(id => weakMap[id]?.auto).length;

  const blockText = problemListBlockFilter === "all"
    ? "すべて"
    : `Block ${problemListBlockFilter}`;

  const orderText = problemListRandomMode
    ? "ランダム表示"
    : "通常順";

  problemListSummary.textContent =
    `収録数：${fixed.length}問 / 表示：${visibleItems.length}問 / 表示ブロック：${blockText} / 表示順：${orderText} / 自動ニガテ：${autoCount}問 / 手動ニガテ：${manualCount}問`;

  visibleItems.forEach(({ q, index }, visibleIndex) => {
    const correctShown = getProblemListCorrectChoiceShown(q);
    const correctNorm = norm(correctShown);
    const st = getWeakStateById(q.id);

    const choiceResult = problemListChoiceResultMap[String(q.id)] || null;
    const isAnswerOpenForThis = !!problemListAnswerOpenMap[String(q.id)] || !!choiceResult;
    const shouldShowAnswer = problemListAnswersVisible || isAnswerOpenForThis;
    const canTapChoice = !problemListAnswersVisible && !shouldShowAnswer;

    const choiceNumbers = ["①", "②", "③", "④"];
    const displayChoices = getProblemListDisplayChoices(q);
    const selectedChoiceNorm = choiceResult ? norm(choiceResult.selected) : "";

    const choiceHtml = displayChoices.map((choice, i) => {
      const choiceNorm = norm(choice);
      const isCorrectChoice = shouldShowAnswer && choiceNorm === correctNorm;
      const isWrongSelected =
        shouldShowAnswer &&
        choiceResult &&
        !choiceResult.isCorrect &&
        choiceNorm === selectedChoiceNorm;

      const className =
        `problemChoice problemChoiceBtn ${isCorrectChoice ? "correct" : ""} ${isWrongSelected ? "wrong" : ""}`;

      return `
        <button
          type="button"
          class="${className}"
          data-action="problem-list-choice-answer"
          data-qid="${escapeAttr(q.id)}"
          data-choice="${escapeAttr(choice)}"
          ${canTapChoice ? "" : "disabled"}
        >
          <span>${choiceNumbers[i] || String(i + 1)}</span>
          <span class="mono">${escapeHtml(choice)}</span>
        </button>
      `;
    }).join("");

        const choiceResultHtml = choiceResult && shouldShowAnswer
      ? `
        <div class="problemListMiniResult ${choiceResult.isCorrect ? "ok" : "ng"}">
          ${choiceResult.isCorrect ? "⭕ 正解！" : "❌ 不正解"}
          あなたの選択：
          <span class="mono">${escapeHtml(choiceResult.selected)}</span>
        </div>
      `
      : "";

    const blockShown = q.blockId ? `Block ${q.blockId}` : "Block ?";
    const isMeaningOpen = !!problemListChoiceMeaningOpenMap[String(q.id)];

    const answerAndJaHtml = shouldShowAnswer
      ? `
        <div class="problemField">
          <div class="problemLabel">正答</div>
          <div class="problemText">
            <span class="pill mono">${escapeHtml(correctShown)}</span>
          </div>
        </div>

        <div class="problemField">
          <div class="problemLabel">日本語訳</div>
          <div class="problemText">${escapeHtml(q.ja || "（なし）")}</div>
        </div>
      `
      : `
        <div class="problemField">
          <button
            type="button"
            class="problemMaskedCard"
            data-action="toggle-one-answer"
            data-qid="${escapeAttr(q.id)}"
          >
            正答と日本語訳を隠しています<br>
            タップすると、この問題だけ表示します
          </button>
        </div>
      `;

    const meaningButtonHtml = shouldShowAnswer
      ? `
        <div class="problemField">
          <button
            type="button"
            data-action="toggle-choice-meanings"
            data-qid="${escapeAttr(q.id)}"
          >
            ${isMeaningOpen ? "選択肢の意味を隠す" : "選択肢の意味一覧"}
          </button>

        ${isMeaningOpen ? renderChoiceMeaningList(q, correctShown, displayChoices) : ""}
        </div>
      `
      : "";

    const noteHtml = q.note && shouldShowAnswer
      ? `
        <div class="problemField">
          <div class="problemLabel">補足</div>
          <div class="problemText">${escapeHtml(q.note)}</div>
        </div>
      `
      : "";

    const item = document.createElement("div");
    item.className = "problemListItem";

    item.innerHTML = `
      <div class="problemListHead">
        <div>
          <div class="problemListNo">
            No.${index + 1} 
            <span class="muted">/ 表示${visibleIndex + 1}問目</span>
          </div>
          <div class="problemListId">
            ${escapeHtml(blockShown)} / ID：<span class="mono">${escapeHtml(q.id)}</span>
          </div>
        </div>

        <div class="problemListBadges">
          ${renderProblemListBadges(q.id)}
        </div>
      </div>

      <div class="problemField">
        <div class="problemLabel">問題文</div>
        <div class="problemText mono">${escapeHtml(q.en)}</div>
      </div>

      <div class="problemField">
        <div class="problemLabel">選択肢</div>
        <div class="problemChoiceList">
          ${choiceHtml}
        </div>
        ${choiceResultHtml}
      </div>

      ${answerAndJaHtml}

      ${meaningButtonHtml}

      ${noteHtml}

      <div class="problemField">
        <label class="problemWeakCheck">
          <input
            type="checkbox"
            data-action="problem-list-pin"
            data-qid="${escapeAttr(q.id)}"
            ${st.pin ? "checked" : ""}
          />
          <span>手動ニガテにする</span>
        </label>
      </div>
    `;

    problemListBody.appendChild(item);
  });
}

function renderAskedSummary() {
  askedTbody.innerHTML = "";

  if (!askedLog.length) {
    askedEmpty.style.display = "block";
    askedTable.style.display = "none";
    return;
  }

  askedEmpty.style.display = "none";
  askedTable.style.display = "table";

  for (let i = 0; i < askedLog.length; i++) {
    const item = askedLog[i];
    const tr = document.createElement("tr");

    const tdNo = document.createElement("td");
    tdNo.textContent = String(i + 1);
    tr.appendChild(tdNo);

    const tdText = document.createElement("td");
    tdText.innerHTML =
      `<div class="mono" style="margin-bottom:6px;">${escapeHtml(item.en)}</div>` +
      `<div>${escapeHtml(item.ja)}</div>`;
    tr.appendChild(tdText);

    const tdAns = document.createElement("td");
    tdAns.innerHTML =
      `<div style="margin-bottom:6px;">
        <span class="pill" style="background:${item.isCorrect ? "#eefaf1" : "#ffecec"}; color:${item.isCorrect ? "#0a7a2f" : "#b00020"}; border-color:${item.isCorrect ? "#bfe7ca" : "#f3b5bf"};">
          ${item.isCorrect ? "正解" : "不正解"}
        </span>
      </div>` +
      `<div>あなた：<span class="pill mono">${escapeHtml(item.yourChoice)}</span></div>` +
      `<div style="margin-top:6px;">正答：<span class="pill mono">${escapeHtml(item.correctChoice)}</span></div>` +
      `<div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">${renderWeakBadgesById(item.qId)}</div>`;
    tr.appendChild(tdAns);

    const tdBtn = document.createElement("td");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-action", "toggle-pin");
    btn.setAttribute("data-qid", escapeAttr(item.qId));
    btn.textContent = getWeakStateById(item.qId).pin ? "手動ニガテ解除" : "手動ニガテ追加";
    tdBtn.appendChild(btn);
    tr.appendChild(tdBtn);

    askedTbody.appendChild(tr);
  }
}

function renderWrongSummary() {
  const wrongs = askedLog.filter(x => !x.isCorrect);
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
    chk.checked = getWeakStateById(w.qId).pin;

    chk.addEventListener("change", () => {
      if (chk.checked) setPinned(w.qId, true);
      else setPinned(w.qId, false);
      updateWeakInfo();
      renderWeakManagement();
      renderAskedSummary();
      renderWrongSummary();
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

function renderSummary(autoCleared) {
  const c = weakCounts();
  const tail = autoCleared ? "（ニガテが0になりました）" : "";

  summaryLine.textContent =
    `結果：${session.correct} / ${session.limit}` +
    `（${session.mode === "weak" ? "ニガテ演習" : "通常演習"}｜${orderModeText()}｜${blockSelectLabel(session.blockValue)}）` +
    `｜ニガテ合計 ${c.total}（自動 ${c.autoOnly} / 手動 ${c.pinned}）` +
    `｜自動読み上げ:${session.autoRead ? "ON" : "OFF"}${tail}`;

  renderAskedSummary();
  renderWrongSummary();
}

  function finishSession(autoCleared) {
    showSummary();
    renderSummary(autoCleared);

    retrySameBtn.disabled = !(session.askedOrder && session.askedOrder.length > 0);
    continueBtn.disabled = (session.mode === "weak");
    retryWeakBtn.disabled = (weakCounts().total === 0);
  }

  function startNormalSession() {
    const [s, e] = getRangeByBlockValue(blockSelect.value);
    const eligible = buildEligibleQuestionsByRange(s, e);

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

    session.autoRead = !!autoReadEl.checked;
    session.askedOrder = [];

    askedLog = [];
    showPlay();
    renderQuestion();
  }

  function startWeakSession() {
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
    session.askedOrder = [];

    askedLog = [];
    showPlay();
    renderQuestion();
  }

    function startRetrySameSession() {
    const validOrder = Array.isArray(session.askedOrder)
      ? session.askedOrder.filter(i => Number.isInteger(i) && i >= 0 && i < fixed.length)
      : [];

    if (!validOrder.length) {
      alert("解き直せる問題セットがありません。");
      return;
    }

    session.mode = "normal";
    session.eligible = [...validOrder];
    session.order = [...validOrder];
    session.cursor = 0;
    session.limit = validOrder.length;
    session.answered = 0;
    session.correct = 0;
    session.orderMode = "retry";
    session.askedOrder = [];
    session.autoRead = !!autoReadEl.checked;

    askedLog = [];
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
        return;
      }

      if (!window.GoimonUI || typeof window.GoimonUI.loadCurrent !== "function") return;
      const g = window.GoimonUI.loadCurrent();
      if (!g) return;
      if (g.pendingEvolution) evolutionNoticeBtn.classList.remove("hidden");
      else evolutionNoticeBtn.classList.add("hidden");
    } catch {}
  }

  function openSharedEvolution() {
  try {
    if (window.GoimonUI && typeof window.GoimonUI.openEvolutionOverlay === "function") {
      window.GoimonUI.openEvolutionOverlay({
        onComplete: () => {
          if (typeof window.renderSentenceGoimonMini === "function") {
            window.renderSentenceGoimonMini();
          }
          renderEvolutionNotice();
        }
      });
      return;
    }

    if (window.GoimonUI && typeof window.GoimonUI.confirmEvolution === "function") {
      window.GoimonUI.confirmEvolution();
      if (typeof window.renderSentenceGoimonMini === "function") {
        window.renderSentenceGoimonMini();
      }
      renderEvolutionNotice();
    }
  } catch (e) {
    console.warn("openSharedEvolution failed:", e);
  }
}

  blockSelect.addEventListener("change", updatePoolInfo);
  countInput.addEventListener("input", updatePoolInfo);
  orderModeEl.addEventListener("change", updatePoolInfo);

  autoReadEl.addEventListener("change", () => {
    saveSettings({ autoRead: !!autoReadEl.checked });
  });

  startBtn.addEventListener("click", startNormalSession);

    openProblemListBtn.addEventListener("click", () => {
    renderProblemList();
    showProblemList();
  });

  problemListBackBtn.addEventListener("click", () => {
    showSetup();
    updatePoolInfo();
    updateWeakInfo();
    renderWeakManagement();
  });

  problemListBlockSelect.addEventListener("change", () => {
    problemListBlockFilter = problemListBlockSelect.value || "all";

    if (problemListRandomMode) {
      refreshProblemListRandomIds();
    }

    problemListAnswerOpenMap = {};
    problemListChoiceResultMap = {};
    problemListChoiceMeaningOpenMap = {};
    problemListHiddenChoiceMap = {};
    renderProblemList();
  });

  toggleProblemListAnswersBtn.addEventListener("click", () => {
    problemListAnswersVisible = !problemListAnswersVisible;

    // 正答表示を切り替える時は、個別表示・選択結果・意味一覧・選択肢ランダム順をリセット
    problemListAnswerOpenMap = {};
    problemListChoiceResultMap = {};
    problemListChoiceMeaningOpenMap = {};
    problemListHiddenChoiceMap = {};

    renderProblemList();
  });

  shuffleProblemListBtn.addEventListener("click", () => {
    problemListRandomMode = !problemListRandomMode;

    if (problemListRandomMode) {
      refreshProblemListRandomIds();
    } else {
      problemListRandomIds = [];
    }

    problemListAnswerOpenMap = {};
    problemListChoiceResultMap = {};
    problemListChoiceMeaningOpenMap = {};
    problemListHiddenChoiceMap = {};
    renderProblemList();
  });

  problemListBody.addEventListener("click", (e) => {
        const choiceBtn = e.target.closest('button[data-action="problem-list-choice-answer"]');
    if (choiceBtn && !choiceBtn.disabled) {
      const qId = choiceBtn.getAttribute("data-qid");
      const selected = choiceBtn.getAttribute("data-choice");

      if (!qId || !selected) return;

      const q = fixedById.get(String(qId));
      if (!q) return;

      const correctShown = getProblemListCorrectChoiceShown(q);
      const isCorrect = norm(selected) === norm(correctShown);

      problemListChoiceResultMap[String(qId)] = {
        selected: String(selected),
        isCorrect
      };

      problemListAnswerOpenMap[String(qId)] = true;

      renderProblemList();
      return;
    }
    const answerBtn = e.target.closest('button[data-action="toggle-one-answer"]');
    if (answerBtn) {
      const qId = answerBtn.getAttribute("data-qid");
      if (!qId) return;

      const key = String(qId);
      problemListAnswerOpenMap[key] = true;

      renderProblemList();
      return;
    }

    const meaningBtn = e.target.closest('button[data-action="toggle-choice-meanings"]');
    if (meaningBtn) {
      const qId = meaningBtn.getAttribute("data-qid");
      if (!qId) return;

      const key = String(qId);
      problemListChoiceMeaningOpenMap[key] = !problemListChoiceMeaningOpenMap[key];

      renderProblemList();
      return;
    }
  });

  problemListBody.addEventListener("change", (e) => {
    const chk = e.target.closest('input[data-action="problem-list-pin"]');
    if (!chk) return;

    const qId = chk.getAttribute("data-qid");
    if (!qId) return;

    setProblemListPinned(qId, chk.checked);

    updateWeakInfo();
    renderWeakManagement();
    renderProblemList();
  });

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

    retrySameBtn.addEventListener("click", () => {
    startRetrySameSession();
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
    if (answeredThis) speakCurrentAnsweredVersion();
    else speakCurrentQuestionVersion();
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

  askedTbody.addEventListener("click", (e) => {
  const btn = e.target.closest('[data-action="toggle-pin"]');
  if (!btn) return;

  const qId = btn.getAttribute("data-qid");
  if (!qId) return;

  const nextState = !getWeakStateById(qId).pin;
  setPinned(qId, nextState);
  updateWeakInfo();
  renderWeakManagement();
  renderAskedSummary();
  renderWrongSummary();
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
  const s = loadSettings();
  autoReadEl.checked = !!s.autoRead;

  renderBlockSelect();
  updatePoolInfo();
  updateWeakInfo();
  renderWeakManagement();
  renderGoimonVisibility();
  renderEvolutionNotice();
  showSetup();

  if (typeof window.renderSentenceGoimonMini === "function") {
    window.renderSentenceGoimonMini();
  }
}

init();

document.addEventListener("keydown", (e) => {
  const activeTag = document.activeElement ? document.activeElement.tagName : "";

  // 入力欄・セレクト操作中はショートカットを無効にする
  if (["INPUT", "SELECT", "TEXTAREA"].includes(activeTag)) return;

  // 大問9の演習中だけ有効
  if (!current) return;
  if (!playBox || playBox.style.display === "none") return;

  const key = e.key;

  // 未解答時：1〜4で選択肢を選ぶ
  if (!answeredThis && /^[1-4]$/.test(key)) {
    const btns = choicesEl.querySelectorAll("button");
    const btn = btns[Number(key) - 1];

    if (btn && !btn.disabled) {
      e.preventDefault();
      btn.click();
    }

    return;
  }

  // 解答後：Enter / Space / → / ↓ で次へ
  const isNextKey =
    key === "Enter" ||
    key === " " ||
    key === "Spacebar" ||
    key === "ArrowRight" ||
    key === "ArrowDown";

  if (isNextKey && answeredThis && !nextBtn.disabled) {
    e.preventDefault();
    nextBtn.click();
    return;
  }

  // Vで読み上げ
  if (key.toLowerCase() === "v") {
    e.preventDefault();
    readBtn.click();
  }
});

});
