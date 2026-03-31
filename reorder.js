// reorder.js（新規作成）
// 語句整序（試作版）
// - 英文だけを見て4つの語句を並べる
// - 日本語訳は答え合わせ後に表示
// - grammarTags から共通文法カードを表示
// - 出題順：先頭から / 続きから / ランダム
// - ゴイモン：正解で ぶんみゃく +1 ＋ ボーナス先 +1
// - ボーナス先は ちえ / ことば / おんかん / ぶんみゃく
// - 進化通知は goimon.js の共通演出を利用
// - 既存の goimon.js / goimon_rules.js は変更なしで使う版

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const setupBox = $("setupBox");
  const playBox = $("playBox");
  const summaryBox = $("summaryBox");

  const problemListBox = $("problemListBox");
const openProblemListBtn = $("openProblemListBtn");
const problemListBackBtn = $("problemListBackBtn");
const problemListEl = $("problemList");
const problemListEmpty = $("problemListEmpty");

  const startBtn = $("startBtn");
  const backBtn = $("backBtn");
  const manualWeakBtn = $("manualWeakBtn");
  const continueBtn = $("continueBtn");
  const summaryBackBtn = $("summaryBackBtn");

  const countInput = $("countInput");
  const orderModeEl = $("orderMode");
  const poolInfo = $("poolInfo");

  const statsEl = $("stats");
  const hintBtn = $("hintBtn");
  const resetBtn = $("resetBtn");
  const checkBtn = $("checkBtn");
  const nextBtn = $("nextBtn");

  const questionLine = $("questionLine");
  const qMeta = $("qMeta");
  const hintArea = $("hintArea");
  const answerSlots = $("answerSlots");
  const chunkBank = $("chunkBank");
  const resultEl = $("result");
  const detailEl = $("detail");

  const summaryLine = $("summaryLine");
  const wrongEmpty = $("wrongEmpty");
  const wrongList = $("wrongList");

  const levelBadgeEl = $("levelBadge");

  const toggleGoimonBtn = $("toggleGoimon");
  const goimonCardEl = $("goimonCard");
  const evolutionNoticeBtn = $("evolutionNoticeBtn");
  const bonusButtonsWrap = $("bonusStatButtons");

  const lv = String(window.ACTIVE_LEVEL || localStorage.getItem("zensho_level_v1") || "1");

  const GOIMON_UI_KEY = `zensho_reorder_goimon_ui_v1_lv${lv}`;
  const BONUS_KEY = `zensho_reorder_bonus_stat_v1_lv${lv}`;
  const CURSOR_KEY = `zensho_reorder_order_cursor_v1_lv${lv}`;
  const SETTINGS_KEY = `zensho_reorder_settings_v1_lv${lv}`;
  const AUTO_WEAK_KEY = `zensho_reorder_auto_weak_v1_lv${lv}`;
  const MANUAL_WEAK_KEY = `zensho_reorder_manual_weak_v1_lv${lv}`;
  const LOG_KEY = `zensho_learning_log_v1_lv${lv}`;

  const grammarTagListBox = $("grammarTagListBox");
const openGrammarTagListBtn = $("openGrammarTagListBtn");
const grammarTagListBackBtn = $("grammarTagListBackBtn");
const grammarTagListEl = $("grammarTagList");
const grammarTagListEmpty = $("grammarTagListEmpty");

  const BONUS_LABELS = {
    chie: "ちえ",
    kotoba: "ことば",
    onkan: "おんかん",
    bunmyaku: "ぶんみゃく"
  };

  const QUESTIONS = (() => {
    if (lv === "2") {
      return Array.isArray(window.REORDER_2KYU) ? window.REORDER_2KYU : [];
    }
    return Array.isArray(window.REORDER_1KYU) ? window.REORDER_1KYU : [];
  })();

  const GRAMMAR_DICT = (window.GRAMMAR_CARD_DICT && typeof window.GRAMMAR_CARD_DICT === "object")
    ? window.GRAMMAR_CARD_DICT
    : {};

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

  function pad2(n) {
  return String(n).padStart(2, "0");
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function loadLearningLog() {
  const obj = safeParse(LOG_KEY);
  return (obj && typeof obj === "object") ? obj : {};
}

function saveLearningLog(obj) {
  saveJson(LOG_KEY, obj || {});
}

function addLearningLogResult(categoryKey, isCorrect) {
  const log = loadLearningLog();
  const dayKey = todayKey();

  if (!log[dayKey] || typeof log[dayKey] !== "object") {
    log[dayKey] = {};
  }

  if (!log[dayKey][categoryKey] || typeof log[dayKey][categoryKey] !== "object") {
    log[dayKey][categoryKey] = { attempt: 0, correct: 0, wrong: 0 };
  }

  log[dayKey][categoryKey].attempt += 1;
  if (isCorrect) {
    log[dayKey][categoryKey].correct += 1;
  } else {
    log[dayKey][categoryKey].wrong += 1;
  }

  saveLearningLog(log);
}

  function escapeHtml(s) {
    return String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function arraysEqual(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function loadSettings() {
    const s = safeParse(SETTINGS_KEY);
    return {
      count: Number.isFinite(Number(s?.count)) ? Number(s.count) : 10,
      orderMode: String(s?.orderMode || "continue")
    };
  }

  function saveSettings(obj) {
    saveJson(SETTINGS_KEY, {
      count: Number(obj.count || 10),
      orderMode: String(obj.orderMode || "continue")
    });
  }

  function loadBonusStat() {
    const v = localStorage.getItem(BONUS_KEY);
    if (v === "chie" || v === "kotoba" || v === "onkan" || v === "bunmyaku") return v;
    return "bunmyaku";
  }

  function saveBonusStat(stat) {
    localStorage.setItem(BONUS_KEY, stat);
  }

  function loadCursor() {
    const n = Number(localStorage.getItem(CURSOR_KEY) || "0");
    return Number.isFinite(n) ? n : 0;
  }

  function saveCursor(cursor) {
    localStorage.setItem(CURSOR_KEY, String(cursor));
  }

  function loadGoimonUiState() {
    return safeParse(GOIMON_UI_KEY) || { open: false };
  }

  function saveGoimonUiState(obj) {
    saveJson(GOIMON_UI_KEY, obj || { open: false });
  }

  function loadAutoWeakMap() {
  return safeParse(AUTO_WEAK_KEY) || {};
}

function saveAutoWeakMap(obj) {
  saveJson(AUTO_WEAK_KEY, obj || {});
}

function loadManualWeakMap() {
  return safeParse(MANUAL_WEAK_KEY) || {};
}

function saveManualWeakMap(obj) {
  saveJson(MANUAL_WEAK_KEY, obj || {});
}

function getAutoWeakCountById(id) {
  const map = loadAutoWeakMap();
  const n = Number(map[id] || 0);
  return Number.isFinite(n) ? n : 0;
}

function incrementAutoWeak(id) {
  const map = loadAutoWeakMap();
  const now = Number(map[id] || 0);
  map[id] = (Number.isFinite(now) ? now : 0) + 1;
  saveAutoWeakMap(map);
}

function decrementAutoWeak(id) {
  const map = loadAutoWeakMap();
  const now = Number(map[id] || 0);
  const next = Math.max(0, (Number.isFinite(now) ? now : 0) - 1);

  if (next <= 0) {
    delete map[id];
  } else {
    map[id] = next;
  }

  saveAutoWeakMap(map);
}

function isManualWeakId(id) {
  const map = loadManualWeakMap();
  return !!map[id];
}

function toggleManualWeakById(id) {
  const map = loadManualWeakMap();
  if (map[id]) {
    delete map[id];
  } else {
    map[id] = true;
  }
  saveManualWeakMap(map);
}

function buildWeakOrder() {
  const list = QUESTIONS.map((q, index) => ({
    index,
    id: q.id,
    manual: isManualWeakId(q.id),
    auto: getAutoWeakCountById(q.id)
  }))
    .filter(x => x.manual || x.auto > 0);

  list.sort((a, b) => {
    if (Number(b.manual) !== Number(a.manual)) {
      return Number(b.manual) - Number(a.manual);
    }
    if (b.auto !== a.auto) {
      return b.auto - a.auto;
    }
    return a.index - b.index;
  });

  return list.map(x => x.index);
}

function getOrderModeLabel(mode) {
  if (mode === "start") return "先頭";
  if (mode === "continue") return "続き";
  if (mode === "random") return "ランダム";
  if (mode === "weak") return "苦手順";
  if (mode === "retry") return "再挑戦";
  return "続き";
}

function renderManualWeakButton() {
  if (!manualWeakBtn) return;

  if (!current) {
    manualWeakBtn.disabled = true;
    manualWeakBtn.textContent = "苦手に追加";
    manualWeakBtn.classList.remove("weakBtnActive");
    return;
  }

  const manual = isManualWeakId(current.id);
  const autoCount = getAutoWeakCountById(current.id);

  manualWeakBtn.disabled = false;
  manualWeakBtn.classList.toggle("weakBtnActive", manual);
  manualWeakBtn.textContent = manual
    ? `苦手を解除（自動 ${autoCount}）`
    : `苦手に追加（自動 ${autoCount}）`;
}

  let goimonUi = loadGoimonUiState();

  let session = {
    orderMode: "continue",
    order: [],
    cursor: 0,
    limit: 10,
    answered: 0,
    correct: 0
  };

  let current = null;
  let selectedIds = [];
  let shownChunkIds = [];
  let checked = false;
  let hintStep = 0;
  let wrongLogs = [];
  let activeGrammarTag = "";

 function showSetup() {
  setupBox.style.display = "block";
  playBox.style.display = "none";
  summaryBox.style.display = "none";
  if (problemListBox) problemListBox.style.display = "none";
  if (grammarTagListBox) grammarTagListBox.style.display = "none";
}

function showPlay() {
  setupBox.style.display = "none";
  playBox.style.display = "block";
  summaryBox.style.display = "none";
  if (problemListBox) problemListBox.style.display = "none";
  if (grammarTagListBox) grammarTagListBox.style.display = "none";
}

function showSummary() {
  setupBox.style.display = "none";
  playBox.style.display = "none";
  summaryBox.style.display = "block";
  if (problemListBox) problemListBox.style.display = "none";
  if (grammarTagListBox) grammarTagListBox.style.display = "none";
}

function showProblemList() {
  setupBox.style.display = "none";
  playBox.style.display = "none";
  summaryBox.style.display = "none";
  if (problemListBox) problemListBox.style.display = "block";
  if (grammarTagListBox) grammarTagListBox.style.display = "none";
}

function showGrammarTagList() {
  setupBox.style.display = "none";
  playBox.style.display = "none";
  summaryBox.style.display = "none";
  if (problemListBox) problemListBox.style.display = "none";
  if (grammarTagListBox) grammarTagListBox.style.display = "block";
}

  function getChunkMap(q) {
    const map = new Map();
    for (const ch of (q?.chunks || [])) {
      map.set(ch.id, ch.text);
    }
    return map;
  }

  function getSelectedTextList() {
    if (!current) return [];
    const map = getChunkMap(current);
    return selectedIds.map(id => map.get(id) || "");
  }

  function getQuestionLineText() {
    if (!current) return "";
    const selectedText = getSelectedTextList().join(" ");
    const blankText = selectedText || "（　）";
    return `${current.stemBefore} ${blankText} ${current.stemAfter}`.replace(/\s+/g, " ").trim();
  }

  function getMaskedQuestionText(q) {
  if (!q) return "";
  return `${q.stemBefore || ""} （　） ${q.stemAfter || ""}`.replace(/\s+/g, " ").trim();
}

function renderProblemList() {
  if (!problemListEl || !problemListEmpty) return;

  problemListEl.innerHTML = "";

  if (!QUESTIONS.length) {
    problemListEmpty.style.display = "block";
    return;
  }

  problemListEmpty.style.display = "none";

  QUESTIONS.forEach((q) => {
    const item = document.createElement("div");
    item.className = "problemListItem";

    const problemNo = getDisplayQuestionNo(q);
    const masked = getMaskedQuestionText(q);
    const tags = Array.isArray(q.grammarTags) ? q.grammarTags : [];
    const chunkTexts = Array.isArray(q.chunks) ? q.chunks.map(ch => ch.text) : [];

    let html = `
      <div class="problemListNo">問題${escapeHtml(problemNo)}</div>
      <div class="problemListQuestion">${escapeHtml(masked)}</div>
      <div class="problemListJa">${escapeHtml(q.ja || "")}</div>

      <div class="detailBlock" style="margin-top:8px;">
        <div class="detailLabel">並べ替えカード</div>
        <div class="grammarTagWrap">
          ${chunkTexts.map(text => `<span class="grammarTagBtn" style="cursor:default;">${escapeHtml(text)}</span>`).join("")}
        </div>
      </div>

      <div class="detailBlock" style="margin-top:8px;">
        <div class="detailLabel">苦手状態</div>
        <div class="problemListWeakMeta muted" style="font-size:14px; line-height:1.7;"></div>
      </div>

      <div class="problemListBtnRow"></div>
      <div class="problemListDetail"></div>
    `;

    item.innerHTML = html;
    problemListEl.appendChild(item);

    const btnRow = item.querySelector(".problemListBtnRow");
    const detail = item.querySelector(".problemListDetail");
    const weakMeta = item.querySelector(".problemListWeakMeta");

    function updateWeakMeta() {
      const manual = isManualWeakId(q.id);
      const autoCount = getAutoWeakCountById(q.id);

      const manualText = manual ? "手動苦手：あり" : "手動苦手：なし";
      const autoText = `自動苦手回数：${autoCount}`;

      weakMeta.textContent = `${manualText} / ${autoText}`;
      weakBtn.textContent = manual ? "苦手を解除" : "苦手に追加";
      weakBtn.className = manual ? "grammarTagBtn active" : "grammarTagBtn";
    }

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.textContent = "正解と解説を見る";

    let opened = false;

    toggleBtn.addEventListener("click", () => {
      opened = !opened;

      if (!opened) {
        toggleBtn.textContent = "正解と解説を見る";
        detail.classList.remove("open");
        detail.innerHTML = "";
        return;
      }

      toggleBtn.textContent = "閉じる";

      let detailHtml = `
        <div class="detailBlock">
          <div class="detailLabel">完成英文</div>
          <div class="detailText">${escapeHtml(q.completed || "")}</div>
        </div>
      `;

      if (Array.isArray(q.grammarFocus) && q.grammarFocus.length) {
        detailHtml += `
          <div class="detailBlock">
            <div class="detailLabel">この問題でのポイント</div>
            <div class="detailText">${escapeHtml(q.grammarFocus.map(x => `・${x}`).join("\n"))}</div>
          </div>
        `;
      }

      if (q.note) {
        detailHtml += `
          <div class="detailBlock">
            <div class="detailLabel">補足</div>
            <div class="detailText">${escapeHtml(q.note)}</div>
          </div>
        `;
      }

      if (tags.length) {
        detailHtml += `<div class="grammarTagWrap">`;
        detailHtml += tags.map(tag => {
          const card = GRAMMAR_DICT[tag];
          const label = (card && card.label) ? card.label : tag;
          return `<span class="grammarTagBtn" style="cursor:default;">${escapeHtml(label)}</span>`;
        }).join("");
        detailHtml += `</div>`;
      }

      detail.innerHTML = detailHtml;
      detail.classList.add("open");
    });

    btnRow.appendChild(toggleBtn);

    const solveBtn = document.createElement("button");
    solveBtn.type = "button";
    solveBtn.className = "primary";
    solveBtn.textContent = "この問題を解く";

    solveBtn.addEventListener("click", () => {
      startRetrySessionById(q.id);
    });

    btnRow.appendChild(solveBtn);

    const weakBtn = document.createElement("button");
    weakBtn.type = "button";

    weakBtn.addEventListener("click", () => {
      toggleManualWeakById(q.id);
      updateWeakMeta();
    });

    btnRow.appendChild(weakBtn);

    updateWeakMeta();
  });
}

function getQuestionIdsByTag(tag) {
  return QUESTIONS
    .filter(q => Array.isArray(q.grammarTags) && q.grammarTags.includes(tag))
    .map(q => q.id);
}

function renderGrammarTagList() {
  if (!grammarTagListEl || !grammarTagListEmpty) return;

  grammarTagListEl.innerHTML = "";

  const entries = Object.entries(GRAMMAR_DICT || {});
  if (!entries.length) {
    grammarTagListEmpty.style.display = "block";
    return;
  }

  grammarTagListEmpty.style.display = "none";

  entries.forEach(([tag, card]) => {
    const label = (card && card.label) ? card.label : tag;
    const summary = (card && card.summary) ? card.summary : "";
    const questionIds = getQuestionIdsByTag(tag);

    const item = document.createElement("div");
    item.className = "tagListItem";

    item.innerHTML = `
      <div class="tagListName">${escapeHtml(label)}</div>
      <div class="tagListMeta">
        ${escapeHtml(summary || "概要なし")} / 該当問題 ${questionIds.length}問
      </div>
      <div class="tagListBtnRow"></div>
      <div class="tagListDetail"></div>
    `;

    grammarTagListEl.appendChild(item);

    const btnRow = item.querySelector(".tagListBtnRow");
    const detail = item.querySelector(".tagListDetail");

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.textContent = "説明を見る";

    let opened = false;

    toggleBtn.addEventListener("click", () => {
      opened = !opened;

      if (!opened) {
        toggleBtn.textContent = "説明を見る";
        detail.classList.remove("open");
        detail.innerHTML = "";
        return;
      }

      toggleBtn.textContent = "閉じる";

      let html = buildGrammarCardHtml(tag);

      html += `<div class="detailBlock tagQuestionList">`;
      html += `<div class="detailLabel">このタグが付いた問題</div>`;

      if (!questionIds.length) {
        html += `<div class="detailText">まだこのタグが付いた問題はありません。</div>`;
      } else {
        questionIds.forEach(id => {
          const q = QUESTIONS.find(x => x.id === id);
          const no = getDisplayQuestionNo(id);
          const masked = q
            ? `${q.stemBefore || ""} （　） ${q.stemAfter || ""}`.replace(/\s+/g, " ").trim()
            : "";

          html += `
            <div class="tagQuestionItem">
              <div style="font-weight:700; margin-bottom:4px;">問題${escapeHtml(no)}</div>
              <div style="font-size:15px; line-height:1.7; margin-bottom:6px;">${escapeHtml(masked)}</div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" class="grammarTagBtn" data-solve-id="${escapeHtml(id)}">この問題を解く</button>
              </div>
            </div>
          `;
        });
      }

      html += `</div>`;

      detail.innerHTML = html;
      detail.classList.add("open");

      detail.querySelectorAll("[data-solve-id]").forEach(btn => {
        btn.addEventListener("click", () => {
          startRetrySessionById(btn.dataset.solveId);
        });
      });
    });

    btnRow.appendChild(toggleBtn);
  });
}

  function renderLevelBadge() {
    if (!levelBadgeEl) return;
    if (lv === "2" && QUESTIONS.length === 0) {
      levelBadgeEl.textContent = "現在：全商英検 2級（語句整序はまだ未実装です）";
      return;
    }
    levelBadgeEl.textContent = `現在：全商英検 ${lv}級（語句整序演習）`;
  }

  function renderPoolInfo() {
    if (!poolInfo) return;
    if (QUESTIONS.length === 0) {
      poolInfo.textContent = "現在の級では、まだ語句整序データがありません。";
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
    poolInfo.textContent = `この級で出題可能：${QUESTIONS.length}問`;
  }

  function renderStats() {
    statsEl.textContent = `今回：${session.answered}/${session.limit}（正解 ${session.correct}）`;
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

  function renderBonusButtons() {
    const bonus = loadBonusStat();
    const buttons = bonusButtonsWrap.querySelectorAll("[data-stat]");
    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.stat === bonus);
    });
  }

  function renderReorderGoimonMini() {
    if (!window.GoimonUI || typeof window.GoimonUI.loadCurrent !== "function") return;

    const g = window.GoimonUI.loadCurrent();
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

    const setText = (id, value) => {
      const el = $(id);
      if (el) el.textContent = value;
    };

    const displayName = (typeof window.GoimonUI.getGoimonPrimaryName === "function")
      ? window.GoimonUI.getGoimonPrimaryName(g)
      : (g.nickname || "ゴイモン");

    const desc = g.stage === "egg" && g.specialRoute === "mr_uno"
      ? "隠し分岐を選択中です。次の進化から MR.UNO として育ちます。"
      : (descMap[g.type] || "学習に応じて成長し、進化していきます。");

    const pt = Number(g.totalPoints || 0);
    const ptText = Number.isInteger(pt) ? String(pt) : pt.toFixed(1);

    const stageLabel = stageMap[g.stage] || "たまご期";
    const bonus = loadBonusStat();

    setText("reorderGoimonStage", stageLabel);
    setText("reorderGoimonName", displayName);
    setText("reorderGoimonMeta", `Lv ${g.level} / ${ptText} pt`);
    setText("reorderGoimonDesc", desc);
    setText("reorderPointGuide", `正解：ぶんみゃく +0.5 ＋ ${BONUS_LABELS[bonus]} +1.5`);

    const img = $("reorderGoimonImage");
    if (img) {
      img.src = g.imageKey;
      img.alt = displayName;
    }
  }

  window.renderReorderGoimonMini = renderReorderGoimonMini;

  function renderEvolutionNotice() {
    try {
      if (window.GoimonUI && typeof window.GoimonUI.renderEvolutionNoticeButton === "function") {
        window.GoimonUI.renderEvolutionNoticeButton("evolutionNoticeBtn");
        return;
      }
    } catch {}
  }

  function getBonusDelta() {
  const bonus = loadBonusStat();
  const delta = { chie: 0, kotoba: 0, onkan: 0, bunmyaku: 0.5 };

  if (bonus === "chie") delta.chie += 1.5;
  else if (bonus === "kotoba") delta.kotoba += 1.5;
  else if (bonus === "onkan") delta.onkan += 1.5;
  else delta.bunmyaku += 1.5;

  return delta;
}

  function addReorderGoimonProgress() {
    try {
      if (!window.GoimonUI || typeof window.GoimonUI.addPoints !== "function") return;
      window.GoimonUI.addPoints(getBonusDelta(), "sentence");
      renderReorderGoimonMini();
      renderEvolutionNotice();
    } catch (e) {
      console.warn("addReorderGoimonProgress failed:", e);
    }
  }

  function renderAnswerSlots() {
    answerSlots.innerHTML = "";

    if (!current) return;

    const map = getChunkMap(current);

    for (let i = 0; i < current.answer.length; i++) {
      const id = selectedIds[i];
      const slot = document.createElement("div");
      slot.className = "slotCard";

      if (id) {
        slot.classList.add("filled");
        slot.textContent = map.get(id) || "";
        if (!checked) {
          slot.addEventListener("click", () => {
            selectedIds.splice(i, 1);
            questionLine.textContent = getQuestionLineText();
            renderAnswerSlots();
            renderChunkBank();
          });
        }
      } else {
        slot.textContent = "　";
      }

      answerSlots.appendChild(slot);
    }
  }

  function renderChunkBank() {
    chunkBank.innerHTML = "";

    if (!current) return;

    const map = getChunkMap(current);

    for (const id of shownChunkIds) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chunkBtn";
      btn.textContent = map.get(id) || "";

      const used = selectedIds.includes(id);
      if (used) btn.classList.add("used");
      if (checked || used) btn.disabled = true;

      if (!checked && !used) {
        btn.addEventListener("click", () => {
          if (selectedIds.length >= current.answer.length) return;
          selectedIds.push(id);
          questionLine.textContent = getQuestionLineText();
          renderAnswerSlots();
          renderChunkBank();
        });
      }

      chunkBank.appendChild(btn);
    }
  }

  function clearDetail() {
    resultEl.innerHTML = "";
    detailEl.innerHTML = "";
    hintArea.textContent = "";
    hintArea.classList.add("hidden");
    activeGrammarTag = "";
    nextBtn.disabled = true;
  }

  function resetQuestionUi() {
    checked = false;
    hintStep = 0;
    selectedIds = [];
    clearDetail();
    hintBtn.disabled = false;
    checkBtn.disabled = false;
    resetBtn.disabled = false;
    questionLine.textContent = getQuestionLineText();
    renderAnswerSlots();
    renderChunkBank();
  }

  function buildGrammarCardHtml(tag) {
  const card = GRAMMAR_DICT[tag];

  if (!card) {
    return `
      <div class="grammarCard">
        <div class="grammarCardTitle">${escapeHtml(tag)}</div>
        <div class="grammarCardText">このタグの共通解説はまだ登録されていません。</div>
      </div>
    `;
  }

  const title = card.label || tag;
  const summary = card.summary || "";
  const sections = Array.isArray(card.sections) ? card.sections : [];

  const linesToText = (lines) => {
    if (!Array.isArray(lines) || !lines.length) return "";
    return lines
      .filter(x => x !== null && x !== undefined && String(x).trim() !== "")
      .map(x => `・${x}`)
      .join("\n");
  };

  let html = `<div class="grammarCard">`;
  html += `<div class="grammarCardTitle">${escapeHtml(title)}</div>`;

  if (summary) {
    html += `
      <div class="grammarCardSection">
        <div class="grammarCardLabel">概要</div>
        <div class="grammarCardText">${escapeHtml(summary)}</div>
      </div>
    `;
  }

  sections.forEach((section, index) => {
    const heading = section?.heading || `項目 ${index + 1}`;
    const text = linesToText(section?.lines || []);

    if (!text) return;

    html += `
      <div class="grammarCardSection">
        <div class="grammarCardLabel">${escapeHtml(heading)}</div>
        <div class="grammarCardText">${escapeHtml(text)}</div>
      </div>
    `;
  });

  if (!summary && sections.length === 0) {
    html += `<div class="grammarCardText">このタグの共通解説はまだ登録されていません。</div>`;
  }

  html += `</div>`;
  return html;
}

  function renderDetail(isCorrect) {
  if (!current) return;

  let html = "";

  html += `
    <div class="detailBlock">
      <div class="detailLabel">完成英文</div>
      <div class="detailText">${escapeHtml(current.completed || "")}</div>
    </div>
  `;

  html += `
    <div class="detailBlock">
      <div class="detailLabel">日本語訳</div>
      <div class="detailText">${escapeHtml(current.ja || "")}</div>
    </div>
  `;

  if (Array.isArray(current.grammarFocus) && current.grammarFocus.length) {
    html += `
      <div class="detailBlock">
        <div class="detailLabel">この問題でのポイント</div>
        <div class="detailText">${escapeHtml(current.grammarFocus.map(x => `・${x}`).join("\n"))}</div>
      </div>
    `;
  }

  if (current.note) {
    html += `
      <div class="detailBlock">
        <div class="detailLabel">補足</div>
        <div class="detailText">${escapeHtml(current.note)}</div>
      </div>
    `;
  }

  if (Array.isArray(current.grammarTags) && current.grammarTags.length) {
    html += `<div class="grammarTagWrap" id="grammarTagWrap"></div>`;
    html += `<div id="grammarCardArea"></div>`;
  }

  detailEl.innerHTML = html;

  if (Array.isArray(current.grammarTags) && current.grammarTags.length) {
    const wrap = $("grammarTagWrap");
    const cardArea = $("grammarCardArea");

    current.grammarTags.forEach((tag, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "grammarTagBtn";

      const card = GRAMMAR_DICT[tag];
      btn.textContent = (card && card.label) ? card.label : tag;

      if (idx === 0) {
        btn.classList.add("active");
        activeGrammarTag = tag;
      }

      btn.addEventListener("click", () => {
        activeGrammarTag = tag;
        wrap.querySelectorAll(".grammarTagBtn").forEach(x => x.classList.remove("active"));
        btn.classList.add("active");
        cardArea.innerHTML = buildGrammarCardHtml(tag);
      });

      wrap.appendChild(btn);
    });

    cardArea.innerHTML = buildGrammarCardHtml(current.grammarTags[0]);
  }
}

 function getDisplayQuestionNo(target) {
  const id = typeof target === "string" ? target : String(target?.id || "");
  const m = id.match(/_(\d+)$/);
  if (m) return m[1];
  return id || "-";
}

  function renderQuestionMeta() {
  const orderLabel = getOrderModeLabel(session.orderMode);
  const problemNo = (typeof getDisplayQuestionNo === "function")
    ? getDisplayQuestionNo(current)
    : String(current?.id || "-");

  qMeta.textContent =
    `問題${problemNo}（${session.answered + 1}/${session.limit}）・ ${orderLabel} ・ カード${current?.chunks?.length || 0}枚`;
}
  function renderQuestion() {
  if (session.answered >= session.limit) {
    finishSession();
    return;
  }

  if (!session.order.length) {
    questionLine.textContent = "出題できる問題がありません。";
    qMeta.textContent = "";
    answerSlots.innerHTML = "";
    chunkBank.innerHTML = "";
    hintBtn.disabled = true;
    resetBtn.disabled = true;
    checkBtn.disabled = true;
    nextBtn.disabled = true;
    renderManualWeakButton();
    return;
  }

  const qIndex = session.order[session.cursor % session.order.length];
  session.cursor += 1;

  if (session.orderMode === "continue") {
    saveCursor(session.cursor % session.order.length);
  }

  current = QUESTIONS[qIndex];
  shownChunkIds = shuffle((current.chunks || []).map(x => x.id));

  renderStats();
  renderQuestionMeta();
  resetQuestionUi();
  renderManualWeakButton();
  renderEvolutionNotice();
}

  function showHint() {
    if (!current || checked) return;

    const map = getChunkMap(current);
    const answer = current.answer || [];

    if (hintStep >= answer.length) return;

    hintStep += 1;

    const lines = [];
    for (let i = 0; i < hintStep; i++) {
      const id = answer[i];
      lines.push(`${i + 1}語目：${map.get(id) || ""}`);
    }

    hintArea.textContent = lines.join("\n");
    hintArea.classList.remove("hidden");

    if (hintStep >= answer.length) {
      hintBtn.disabled = true;
    }
  }

 function checkAnswer() {
  if (!current || checked) return;

  if (selectedIds.length !== current.answer.length) {
    resultEl.innerHTML = `<span class="ng">まだ並び終わっていません。</span>`;
    return;
  }

  checked = true;
  session.answered += 1;

  const isCorrect = arraysEqual(selectedIds, current.answer);

  addLearningLogResult("reorder", isCorrect);

  if (isCorrect) {
    session.correct += 1;
    decrementAutoWeak(current.id);
    resultEl.innerHTML = `<span class="ok">⭕️ 正解！</span>`;
    addReorderGoimonProgress();
  } else {
    incrementAutoWeak(current.id);

    const map = getChunkMap(current);
    const yourText = selectedIds.map(id => map.get(id) || "").join(" ");
    const correctText = current.answer.map(id => map.get(id) || "").join(" ");
    resultEl.innerHTML =
      `<span class="ng">❌ 不正解。</span><br>` +
      `あなたの並び：${escapeHtml(yourText)}<br>` +
      `正しい並び：${escapeHtml(correctText)}`;
  }

  wrongLogs.push({
    id: current.id,
    isCorrect,
    completed: current.completed || "",
    ja: current.ja || "",
    grammarTags: Array.isArray(current.grammarTags) ? [...current.grammarTags] : []
  });

  hintBtn.disabled = true;
  checkBtn.disabled = true;
  resetBtn.disabled = true;
  nextBtn.disabled = false;

  questionLine.textContent = current.completed || getQuestionLineText();
  renderAnswerSlots();
  renderChunkBank();
  renderDetail(isCorrect);
  renderStats();
  renderManualWeakButton();
  renderEvolutionNotice();
}

function findQuestionIndexById(id) {
  return QUESTIONS.findIndex(q => q && q.id === id);
}

function startRetrySessionById(id) {
  const qIndex = findQuestionIndexById(id);
  if (qIndex < 0) {
    alert("この問題が見つかりませんでした。");
    return;
  }

  session.limit = 1;
  session.answered = 0;
  session.correct = 0;
  session.orderMode = "retry";
  session.order = [qIndex];
  session.cursor = 0;

  wrongLogs = [];
  showPlay();
  renderQuestion();
}



function renderSummary() {
  const wrongs = wrongLogs.filter(x => !x.isCorrect);
  const orderLabel = getOrderModeLabel(session.orderMode);
  const rate = session.limit > 0 ? Math.round((session.correct / session.limit) * 100) : 0;

  summaryLine.textContent =
    `結果：${session.correct} / ${session.limit}（正答率 ${rate}%）｜ ${orderLabel}`;

  wrongList.innerHTML = "";

  if (wrongs.length === 0) {
    wrongEmpty.style.display = "block";
    return;
  }

  wrongEmpty.style.display = "none";

  wrongs.forEach((w, idx) => {
    const problemNo = getDisplayQuestionNo(w.id);
    const tags = Array.isArray(w.grammarTags) ? w.grammarTags : [];
    const manual = isManualWeakId(w.id);
    const autoCount = getAutoWeakCountById(w.id);

    const item = document.createElement("div");
    item.className = "summaryWrongItem";

    let html = `
      <div style="font-weight:800; margin-bottom:6px;">問題${escapeHtml(problemNo)}（今回の${idx + 1}件目のミス）</div>
      <div class="mono" style="font-size:15px; line-height:1.7; margin-bottom:6px;">${escapeHtml(w.completed)}</div>
      <div class="muted" style="font-size:14px; margin-bottom:10px;">${escapeHtml(w.ja)}</div>
      <div class="summaryWeakRow" style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:10px;"></div>
    `;

    if (tags.length) {
      html += `<div class="grammarTagWrap" style="margin-top:10px;"></div>`;
      html += `<div class="summaryGrammarCardArea"></div>`;
    }

    item.innerHTML = html;
    wrongList.appendChild(item);

    const weakRow = item.querySelector(".summaryWeakRow");
    if (weakRow) {
      const weakBtn = document.createElement("button");
      weakBtn.type = "button";
      weakBtn.className = manual ? "grammarTagBtn active" : "grammarTagBtn";
      weakBtn.textContent = manual
        ? `苦手を解除（自動 ${autoCount}）`
        : `苦手に追加（自動 ${autoCount}）`;

      weakBtn.addEventListener("click", () => {
        toggleManualWeakById(w.id);
        renderSummary();
      });

      weakRow.appendChild(weakBtn);

      const retryBtn = document.createElement("button");
      retryBtn.type = "button";
      retryBtn.className = "grammarTagBtn";
      retryBtn.textContent = "もう一度解く";

      retryBtn.addEventListener("click", () => {
        startRetrySessionById(w.id);
      });

      weakRow.appendChild(retryBtn);
    }

    if (tags.length) {
      const wrap = item.querySelector(".grammarTagWrap");
      const cardArea = item.querySelector(".summaryGrammarCardArea");

      let openTag = "";

      tags.forEach((tag) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "grammarTagBtn";

        const card = GRAMMAR_DICT[tag];
        btn.textContent = (card && card.label) ? card.label : tag;

        btn.addEventListener("click", () => {
          if (openTag === tag) {
            openTag = "";
            btn.classList.remove("active");
            cardArea.innerHTML = "";
            return;
          }

          openTag = tag;
          wrap.querySelectorAll(".grammarTagBtn").forEach(x => x.classList.remove("active"));
          btn.classList.add("active");
          cardArea.innerHTML = buildGrammarCardHtml(tag);
        });

        wrap.appendChild(btn);
      });

      cardArea.innerHTML = "";
    }
  });
}


  function finishSession() {
    showSummary();
    renderSummary();
  }

  function startSession() {
  if (!QUESTIONS.length) {
    alert("この級の語句整序データはまだありません。");
    return;
  }

  let requestedLimit = Number(countInput.value);
  if (!Number.isFinite(requestedLimit) || requestedLimit < 1) requestedLimit = 10;

  const orderMode = String(orderModeEl.value || "continue");
  const baseOrder = QUESTIONS.map((_, i) => i);

  let order = [];
  let cursor = 0;

  if (orderMode === "random") {
    order = shuffle(baseOrder);
    cursor = 0;
  } else if (orderMode === "start") {
    order = baseOrder;
    cursor = 0;
    saveCursor(0);
  } else if (orderMode === "weak") {
    order = buildWeakOrder();
    if (!order.length) {
      alert("まだ苦手問題がありません。まずは通常の学習で記録をためてください。");
      return;
    }
    cursor = 0;
  } else {
    order = baseOrder;
    cursor = loadCursor();
  }

  const limit = Math.min(requestedLimit, order.length);

  session.limit = limit;
  session.answered = 0;
  session.correct = 0;
  session.orderMode = orderMode;
  session.order = order;
  session.cursor = cursor;

  wrongLogs = [];
  saveSettings({
    count: limit,
    orderMode: session.orderMode
  });

  showPlay();
  renderQuestion();
}

  function bindBonusButtons() {
    bonusButtonsWrap.querySelectorAll("[data-stat]").forEach(btn => {
      btn.addEventListener("click", () => {
        const stat = btn.dataset.stat;
        if (!stat) return;
        saveBonusStat(stat);
        renderBonusButtons();
        renderReorderGoimonMini();
      });
    });
  }

  function initGoimonBindings() {
    renderGoimonVisibility();
    renderBonusButtons();
    renderReorderGoimonMini();
    renderEvolutionNotice();

    if (window.GoimonUI && typeof window.GoimonUI.bindEvolutionNoticeButton === "function") {
      window.GoimonUI.bindEvolutionNoticeButton("evolutionNoticeBtn", {
        onComplete: () => {
          renderReorderGoimonMini();
          renderEvolutionNotice();
        }
      });
    }
  }

  function init() {
    const settings = loadSettings();
    countInput.value = String(settings.count || 10);
    orderModeEl.value = settings.orderMode || "continue";

    renderLevelBadge();
    renderPoolInfo();
    bindBonusButtons();
    initGoimonBindings();
    showSetup();

    toggleGoimonBtn.addEventListener("click", () => {
      goimonUi.open = !goimonUi.open;
      saveGoimonUiState(goimonUi);
      renderGoimonVisibility();
    });

    startBtn.addEventListener("click", startSession);

    backBtn.addEventListener("click", () => {
      showSetup();
      renderPoolInfo();
    });

    continueBtn.addEventListener("click", startSession);

    summaryBackBtn.addEventListener("click", () => {
      showSetup();
      renderPoolInfo();
    });

    hintBtn.addEventListener("click", showHint);

    resetBtn.addEventListener("click", () => {
      if (checked) return;
      selectedIds = [];
      questionLine.textContent = getQuestionLineText();
      renderAnswerSlots();
      renderChunkBank();
    });

    checkBtn.addEventListener("click", checkAnswer);

    nextBtn.addEventListener("click", () => {
      if (!checked) return;
      renderQuestion();
    });
  }

  init();
  if (manualWeakBtn) {
  manualWeakBtn.addEventListener("click", () => {
    if (!current) return;
    toggleManualWeakById(current.id);
    renderManualWeakButton();
  });
}
if (openProblemListBtn) {
  openProblemListBtn.addEventListener("click", () => {
    renderProblemList();
    showProblemList();
  });
}

if (problemListBackBtn) {
  problemListBackBtn.addEventListener("click", () => {
    showSetup();
    renderPoolInfo();
  });
}

if (openGrammarTagListBtn) {
  openGrammarTagListBtn.addEventListener("click", () => {
    renderGrammarTagList();
    showGrammarTagList();
  });
}

if (grammarTagListBackBtn) {
  grammarTagListBackBtn.addEventListener("click", () => {
    showSetup();
    renderPoolInfo();
  });
}

});
