(function () {
  "use strict";

  const DATA_LEVEL = 1;
  const UI_LEVEL = window.ACTIVE_LEVEL || "1";
  const URL_PARAMS = new URLSearchParams(window.location.search);

  const STORAGE_KEYS = {
    weakAuto: `zensho_paraphrase_quiz_weak_v1_lv${DATA_LEVEL}`,
    manualWeak: `zensho_paraphrase_quiz_manual_weak_v1_lv${DATA_LEVEL}`,
    cursor: `zensho_paraphrase_quiz_cursor_v1_lv${DATA_LEVEL}`,
    settings: `zensho_paraphrase_quiz_settings_v2_lv${DATA_LEVEL}`,
    idiomWeakMeaning: `zensho_idiom_quiz_weak_meaning_v1_lv${DATA_LEVEL}`,
    idiomWeakSynonym: `zensho_idiom_quiz_weak_synonym_v1_lv${DATA_LEVEL}`
  };

  const DEFAULT_SETTINGS = {
  rangeStart: "1",
  rangeEnd: "",
  questionCount: "10",
  quizMode: "order_continue",
  autoRead: true
};

  function normalizeNoteId(value) {
    const s = String(value || "").trim().toUpperCase();
    if (!s) return "";
    if (/^N\d+$/.test(s)) return s;
    if (/^\d+$/.test(s)) return "N" + s.padStart(3, "0");
    return s;
  }

  function normalizeStringArray(value) {
    if (Array.isArray(value)) {
      return Array.from(new Set(
        value
          .map(function (v) { return String(v || "").trim(); })
          .filter(Boolean)
      ));
    }
    if (value == null) return [];
    const s = String(value).trim();
    return s ? [s] : [];
  }

  const RAW_DATA = Array.isArray(window.PARAPHRASE_DATA_1KYU)
    ? window.PARAPHRASE_DATA_1KYU.slice()
    : [];

  const IDIOM_DATA = Array.isArray(window.IDIOM_DATA_1KYU)
    ? window.IDIOM_DATA_1KYU.slice()
    : [];

  const DATA = RAW_DATA.map(function (item, index) {
    const ids = normalizeStringArray(item.noteIds || item.noteId)
      .map(normalizeNoteId)
      .filter(Boolean);

    return {
      ...item,
      displayNo: Number(item.displayNo) || (index + 1),
      noteId: ids[0] || "",
      noteIds: ids
    };
  });

  function getQueryNoteIds() {
    const raw = URL_PARAMS.get("noteIds") || URL_PARAMS.get("noteId") || "";
    return raw
      .split(",")
      .map(normalizeNoteId)
      .filter(Boolean);
  }

  const el = {
    levelBadge: document.getElementById("levelBadge"),

    setupBox: document.getElementById("setupBox"),
    relatedParaphraseBox: document.getElementById("relatedParaphraseBox"),
    relatedParaphraseLine: document.getElementById("relatedParaphraseLine"),
    startRelatedParaphraseBtn: document.getElementById("startRelatedParaphraseBtn"),
    relatedParaphraseToIdiomBtn: document.getElementById("relatedParaphraseToIdiomBtn"),
    clearRelatedParaphraseBtn: document.getElementById("clearRelatedParaphraseBtn"),

    problemListBox: document.getElementById("problemListBox"),
    weakListBox: document.getElementById("weakListBox"),
    playBox: document.getElementById("playBox"),
    summaryBox: document.getElementById("summaryBox"),
    actionBar: document.getElementById("actionBar"),

rangeStart: document.getElementById("rangeStart"),
rangeEnd: document.getElementById("rangeEnd"),
questionCount: document.getElementById("questionCount"),
quizMode: document.getElementById("quizMode"),
autoRead: document.getElementById("autoRead"),
poolInfo: document.getElementById("poolInfo"),

    startBtn: document.getElementById("startBtn"),
    openProblemListBtn: document.getElementById("openProblemListBtn"),
    openWeakListBtn: document.getElementById("openWeakListBtn"),

    problemListBackBtn: document.getElementById("problemListBackBtn"),
    weakListBackBtn: document.getElementById("weakListBackBtn"),

    problemList: document.getElementById("problemList"),
    problemListEmpty: document.getElementById("problemListEmpty"),

    weakList: document.getElementById("weakList"),
    weakListEmpty: document.getElementById("weakListEmpty"),

    stats: document.getElementById("stats"),
    questionNo: document.getElementById("questionNo"),
    sentenceA: document.getElementById("sentenceA"),
    sentenceB: document.getElementById("sentenceB"),
    choicesBox: document.getElementById("choicesBox"),
    feedbackBox: document.getElementById("feedbackBox"),

    readBtn: document.getElementById("readBtn"),
    jumpIdiomBtn: document.getElementById("jumpIdiomBtn"),
    manualWeakBtn: document.getElementById("manualWeakBtn"),
    backBtn: document.getElementById("backBtn"),

    checkBtn: document.getElementById("checkBtn"),
    nextBtn: document.getElementById("nextBtn"),

    summaryLine: document.getElementById("summaryLine"),
    summarySub: document.getElementById("summarySub"),
    wrongList: document.getElementById("wrongList"),
    wrongEmpty: document.getElementById("wrongEmpty"),
    askedList: document.getElementById("askedList"),

    retryBtn: document.getElementById("retryBtn"),
    continueBtn: document.getElementById("continueBtn"),
    backToSetupBtn: document.getElementById("backToSetupBtn")
  };

  const state = {
    sessionItems: [],
    lastSessionItems: [],
    currentIndex: 0,
    selectedChoice: "",
    answered: false,
    score: 0,
    results: [],
    mode: "order_continue",
    relatedNoteIds: getQueryNoteIds()
  };

  function readJSON(key, fallbackValue) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallbackValue;
      return JSON.parse(raw);
    } catch (err) {
      return fallbackValue;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  function supportsSpeech() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }

  function speak(text) {
    if (!supportsSpeech()) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(String(text || ""));
      utterance.lang = "en-US";
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    } catch (err) {}
  }

  function countToNumber(value, maxCount) {
  const max = Math.max(0, Number(maxCount) || 0);
  if (value === "all") return max;

  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return Math.min(10, max);

  return Math.min(num, max);
}

function getMaxDisplayNo() {
  const nums = DATA
    .map(function (item, index) {
      return Number(item.displayNo || index + 1);
    })
    .filter(function (n) {
      return Number.isFinite(n) && n >= 1;
    });

  return nums.length ? Math.max.apply(null, nums) : DATA.length;
}

function getQuestionDisplayNo(item, index) {
  return Number(item.displayNo || index + 1);
}

function getRangeValues() {
  const maxNo = getMaxDisplayNo();

  let startNo = Number(el.rangeStart ? el.rangeStart.value : 1);
  let endNo = Number(el.rangeEnd ? el.rangeEnd.value : maxNo);

  if (!Number.isFinite(startNo) || startNo < 1) startNo = 1;
  if (!Number.isFinite(endNo) || endNo < 1) endNo = maxNo;

  startNo = Math.floor(startNo);
  endNo = Math.floor(endNo);

  if (startNo > endNo) {
    const temp = startNo;
    startNo = endNo;
    endNo = temp;
  }

  startNo = Math.max(1, Math.min(startNo, maxNo));
  endNo = Math.max(1, Math.min(endNo, maxNo));

  return { startNo, endNo, maxNo };
}

function getRangedData() {
  const range = getRangeValues();

  return DATA
    .map(function (item, index) {
      return {
        ...item,
        _originalIndex: index,
        _rangeIndex: -1
      };
    })
    .filter(function (item, index) {
      const no = getQuestionDisplayNo(item, index);
      return Number.isFinite(no) && no >= range.startNo && no <= range.endNo;
    })
    .map(function (item, index) {
      return {
        ...item,
        _rangeIndex: index,
        _index: index
      };
    });
}

function getCursorRangeKey() {
  const range = getRangeValues();
  return `${range.startNo}-${range.endNo}`;
}

  function readWeakAutoMap() {
    const raw = readJSON(STORAGE_KEYS.weakAuto, {});
    return raw && typeof raw === "object" ? raw : {};
  }

  function saveWeakAutoMap(map) {
    writeJSON(STORAGE_KEYS.weakAuto, map);
  }

  function readManualWeakMap() {
    const raw = readJSON(STORAGE_KEYS.manualWeak, {});
    return raw && typeof raw === "object" ? raw : {};
  }

  function saveManualWeakMap(map) {
    writeJSON(STORAGE_KEYS.manualWeak, map);
  }

  function isManualWeak(id) {
    return !!readManualWeakMap()[id];
  }

  function toggleManualWeak(id) {
    const map = readManualWeakMap();
    if (map[id]) {
      delete map[id];
    } else {
      map[id] = true;
    }
    saveManualWeakMap(map);
  }

  function incrementParaphraseWeak(id) {
    const map = readWeakAutoMap();
    map[id] = (map[id] || 0) + 1;
    saveWeakAutoMap(map);
  }

  function getQuestionNoteIds(item) {
    return normalizeStringArray(item.noteIds || item.noteId)
      .map(normalizeNoteId)
      .filter(Boolean);
  }

  function getIdiomIdsByNoteIds(noteIds) {
    const targets = Array.isArray(noteIds) ? noteIds : [];
    if (!targets.length || !IDIOM_DATA.length) return [];

    const found = IDIOM_DATA.filter(function (item) {
      const ids = normalizeStringArray(item.noteIds || item.noteId)
        .map(normalizeNoteId)
        .filter(Boolean);

      return ids.some(function (id) {
        return targets.indexOf(id) !== -1;
      });
    }).map(function (item) {
      return item.id;
    });

    return Array.from(new Set(found));
  }

  function incrementIdiomWeakLinks(noteIds) {
    const idiomIds = getIdiomIdsByNoteIds(noteIds);
    if (!idiomIds.length) return;

    const meaningMap = readJSON(STORAGE_KEYS.idiomWeakMeaning, {}) || {};
    const synonymMap = readJSON(STORAGE_KEYS.idiomWeakSynonym, {}) || {};

    idiomIds.forEach(function (id) {
      meaningMap[id] = (meaningMap[id] || 0) + 1;
      synonymMap[id] = (synonymMap[id] || 0) + 1;
    });

    writeJSON(STORAGE_KEYS.idiomWeakMeaning, meaningMap);
    writeJSON(STORAGE_KEYS.idiomWeakSynonym, synonymMap);
  }

  function getCursor() {
  const key = getCursorRangeKey();
  const raw = localStorage.getItem(STORAGE_KEYS.cursor);

  if (!raw) return 0;

  try {
    const obj = JSON.parse(raw);

    if (obj && typeof obj === "object") {
      const v = Number(obj[key]);
      if (Number.isFinite(v) && v >= 0) return Math.floor(v);
      return 0;
    }
  } catch {}

  const legacy = Number(raw);
  if (Number.isFinite(legacy) && legacy >= 0) return Math.floor(legacy);

  return 0;
}

function setCursor(value) {
  const key = getCursorRangeKey();
  const raw = localStorage.getItem(STORAGE_KEYS.cursor);

  let obj = {};

  try {
    const parsed = JSON.parse(raw || "{}");
    if (parsed && typeof parsed === "object") obj = parsed;
  } catch {
    obj = {};
  }

  obj[key] = Math.max(0, Math.floor(Number(value) || 0));
  localStorage.setItem(STORAGE_KEYS.cursor, JSON.stringify(obj));
}

  function getSavedSettings() {
  const saved = readJSON(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
  return {
    rangeStart: saved.rangeStart || DEFAULT_SETTINGS.rangeStart,
    rangeEnd: saved.rangeEnd || DEFAULT_SETTINGS.rangeEnd,
    questionCount: saved.questionCount || DEFAULT_SETTINGS.questionCount,
    quizMode: saved.quizMode || DEFAULT_SETTINGS.quizMode,
    autoRead: typeof saved.autoRead === "boolean" ? saved.autoRead : DEFAULT_SETTINGS.autoRead
  };
}

  function saveCurrentSettings() {
  const settings = {
    rangeStart: el.rangeStart ? el.rangeStart.value : "1",
    rangeEnd: el.rangeEnd ? el.rangeEnd.value : String(getMaxDisplayNo()),
    questionCount: el.questionCount.value,
    quizMode: el.quizMode.value,
    autoRead: el.autoRead.checked
  };
  writeJSON(STORAGE_KEYS.settings, settings);
}

  function modeLabel(mode) {
    if (mode === "order") return "順番";
    if (mode === "order_continue") return "続きから";
    if (mode === "random") return "ランダム";
    if (mode === "weak") return "ニガテ順";
    if (mode === "linked") return "関連問題";
    return mode;
  }

  function updateLevelBadge() {
    if (UI_LEVEL === "1") {
      el.levelBadge.textContent = "現在のレベル設定：1級";
    } else {
      el.levelBadge.textContent =
        "現在のレベル設定は2級ですが、このページは今は1級データで動作します。";
    }
  }

  function getRelatedItemsByNoteIds(noteIds) {
    const targets = Array.isArray(noteIds) ? noteIds : [];
    if (!targets.length) return [];

    return DATA
      .map(function (item, index) {
        return { ...item, _index: index };
      })
      .filter(function (item) {
        const ids = getQuestionNoteIds(item);
        return ids.some(function (id) {
          return targets.indexOf(id) !== -1;
        });
      });
  }

  function refreshRelatedParaphraseBox() {
    if (!el.relatedParaphraseBox) return;

    if (!state.relatedNoteIds.length || el.setupBox.classList.contains("hidden")) {
      el.relatedParaphraseBox.classList.add("hidden");
      return;
    }

    const relatedItems = getRelatedItemsByNoteIds(state.relatedNoteIds);

    if (!relatedItems.length) {
      el.relatedParaphraseLine.textContent =
        `対応する言い換え問題が見つかりませんでした。（${state.relatedNoteIds.join(", ")}）`;
      el.startRelatedParaphraseBtn.disabled = true;
      el.relatedParaphraseToIdiomBtn.disabled = false;
      el.relatedParaphraseBox.classList.remove("hidden");
      return;
    }

    el.relatedParaphraseLine.textContent =
      `${state.relatedNoteIds.join(", ")} に対応する言い換え問題が ${relatedItems.length} 件あります。`;
    el.startRelatedParaphraseBtn.disabled = false;
    el.relatedParaphraseToIdiomBtn.disabled = false;
    el.relatedParaphraseBox.classList.remove("hidden");
  }

  function hideAllBoxes() {
    el.setupBox.classList.add("hidden");
    if (el.relatedParaphraseBox) {
      el.relatedParaphraseBox.classList.add("hidden");
    }
    el.problemListBox.classList.add("hidden");
    el.weakListBox.classList.add("hidden");
    el.playBox.classList.add("hidden");
    el.summaryBox.classList.add("hidden");
    el.actionBar.classList.add("hidden");
  }

  function showBox(name) {
    hideAllBoxes();

    if (name === "setup") {
      el.setupBox.classList.remove("hidden");
      refreshRelatedParaphraseBox();
      return;
    }

    if (name === "problemList") {
      el.problemListBox.classList.remove("hidden");
      return;
    }

    if (name === "weakList") {
      el.weakListBox.classList.remove("hidden");
      return;
    }

    if (name === "play") {
      el.playBox.classList.remove("hidden");
      el.actionBar.classList.remove("hidden");
      return;
    }

    if (name === "summary") {
      el.summaryBox.classList.remove("hidden");
    }
  }

  function updatePoolInfo() {
  const weakMap = readWeakAutoMap();
  const manualMap = readManualWeakMap();
  const rangedData = getRangedData();
  const range = getRangeValues();

  const autoWeakItems = Object.keys(weakMap).filter(function (id) {
    return (weakMap[id] || 0) > 0;
  }).length;

  const autoWeakTotal = Object.values(weakMap).reduce(function (sum, value) {
    return sum + Number(value || 0);
  }, 0);

  const manualWeakItems = Object.keys(manualMap).length;
  const cursor = rangedData.length ? (getCursor() % rangedData.length) : 0;

  el.poolInfo.textContent =
    `出題範囲：No.${range.startNo}〜${range.endNo} / ` +
    `この範囲の問題数：${rangedData.length}件 / ` +
    `続きからの次回開始位置：${rangedData.length ? cursor + 1 : 0}番目 / ` +
    `自動ニガテ：${autoWeakItems}件（累計ミス ${autoWeakTotal}回） / ` +
    `手動ニガテ：${manualWeakItems}件`;
}

  function getWeakListItems() {
    const weakMap = readWeakAutoMap();
    const manualMap = readManualWeakMap();

    return DATA.map(function (item, index) {
      return {
        ...item,
        _index: index,
        autoWeakCount: weakMap[item.id] || 0,
        manualWeak: !!manualMap[item.id]
      };
    })
      .filter(function (item) {
        return item.autoWeakCount > 0 || item.manualWeak;
      })
      .sort(function (a, b) {
        const manualA = a.manualWeak ? 1 : 0;
        const manualB = b.manualWeak ? 1 : 0;
        if (manualA !== manualB) return manualB - manualA;
        if (a.autoWeakCount !== b.autoWeakCount) return b.autoWeakCount - a.autoWeakCount;
        return a._index - b._index;
      });
  }

  function getSessionItems(count, mode) {
  const base = getRangedData();

  if (mode === "random") {
    return shuffle(base).slice(0, count);
  }

  if (mode === "weak") {
    const weakMap = readWeakAutoMap();
    const manualMap = readManualWeakMap();

    return base
      .slice()
      .sort(function (a, b) {
        const manualA = manualMap[a.id] ? 1 : 0;
        const manualB = manualMap[b.id] ? 1 : 0;
        if (manualA !== manualB) return manualB - manualA;

        const weakA = weakMap[a.id] || 0;
        const weakB = weakMap[b.id] || 0;
        if (weakA !== weakB) return weakB - weakA;

        return a._index - b._index;
      })
      .slice(0, count);
  }

  if (mode === "order_continue") {
    if (!base.length) return [];
    const cursor = getCursor() % base.length;
    const ordered = base.slice(cursor).concat(base.slice(0, cursor));
    return ordered.slice(0, count);
  }

  return base.slice(0, count);
}

  function getChoices(question) {
    const correct = question.answer;
    const wrongPool = Array.isArray(question.choices)
      ? question.choices.filter(function (choice) {
          return choice !== correct;
        })
      : [];

    const selectedWrong = shuffle(wrongPool).slice(0, 3);
    return shuffle([correct, ...selectedWrong]);
  }

  function updateManualWeakButton(questionId) {
    const active = isManualWeak(questionId);
    el.manualWeakBtn.textContent = active ? "苦手解除" : "苦手に追加";
    el.manualWeakBtn.classList.toggle("weakBtnActive", active);
  }

  function resetActionButtons() {
    el.checkBtn.disabled = true;
    el.nextBtn.disabled = true;
    el.nextBtn.textContent =
      state.currentIndex === state.sessionItems.length - 1 ? "結果を見る" : "次へ";
  }

  function clearFeedback() {
    el.feedbackBox.className = "feedbackBox hidden";
    el.feedbackBox.innerHTML = "";
  }

  function openIdiomForNoteIds(noteIds) {
    const ids = Array.isArray(noteIds) ? noteIds : [];
    if (!ids.length) return;

    if (ids.length === 1) {
      window.location.href = `idiom_quiz.html?noteId=${encodeURIComponent(ids[0])}`;
      return;
    }

    window.location.href = `idiom_quiz.html?noteIds=${encodeURIComponent(ids.join(","))}`;
  }

  function updateJumpIdiomButton(question) {
    if (!el.jumpIdiomBtn) return;
    el.jumpIdiomBtn.disabled = !question || getQuestionNoteIds(question).length === 0;
  }

  function renderQuestion() {
    const question = state.sessionItems[state.currentIndex];
    if (!question) {
      finishQuiz();
      return;
    }

    state.selectedChoice = "";
    state.answered = false;

    el.stats.textContent =
      `第${state.currentIndex + 1}問 / ${state.sessionItems.length}問 ・ 正解 ${state.score}問 ・ 出題順：${modeLabel(state.mode)}`;

    el.questionNo.textContent = `第${state.currentIndex + 1}問 / ${state.sessionItems.length}問`;
    el.sentenceA.textContent = question.a;
    el.sentenceB.textContent = question.b;
    el.choicesBox.innerHTML = "";
    clearFeedback();
    resetActionButtons();
    updateManualWeakButton(question.id);
    updateJumpIdiomButton(question);

    const choices = getChoices(question);

    choices.forEach(function (choiceText, index) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "choiceBtn";
  btn.dataset.choiceText = choiceText;
  btn.innerHTML = `
    <span class="choiceIndex">${index + 1}</span>
    <span class="choiceText">${escapeHtml(choiceText)}</span>
  `;

  btn.addEventListener("click", function () {
    if (state.answered) return;

    state.selectedChoice = choiceText;
    el.checkBtn.disabled = false;

    Array.from(el.choicesBox.querySelectorAll("button")).forEach(function (otherBtn) {
      otherBtn.classList.remove("selected");
    });

    btn.classList.add("selected");
  });

  el.choicesBox.appendChild(btn);
});

    if (el.autoRead.checked) {
      speak(question.a);
    }
  }

  function buildFeedbackHtml(question, isCorrect) {
  const completedB = question.b.replace("( )", question.answer);

  return `
    <div class="feedbackStatus">${isCorrect ? "正解" : "不正解"}</div>

    ${!isCorrect ? `
      <div class="feedbackLabel">正解</div>
      <div class="feedbackText">${escapeHtml(question.answer)}</div>
    ` : ""}

    <div class="feedbackLabel">下の文（完成形）</div>
    <div class="feedbackText">${escapeHtml(completedB)}</div>

    <div class="feedbackLabel">日本語訳</div>
    <div class="feedbackText">${escapeHtml(question.ja || "")}</div>

    <div class="feedbackLabel">正解語の意味</div>
    <div class="feedbackText">${escapeHtml(question.answerJa || "")}</div>

    <div class="feedbackLabel">解説</div>
    <div class="feedbackText">${escapeHtml(question.note || "")}</div>
  `;
}

  function checkAnswer() {
    if (state.answered) return;
    if (!state.selectedChoice) return;

    const question = state.sessionItems[state.currentIndex];
    const isCorrect = state.selectedChoice === question.answer;
    const noteIds = getQuestionNoteIds(question);

    state.answered = true;
    if (isCorrect) {
      state.score += 1;
      awardParaphraseGoimonCorrect();
    } else {
      incrementParaphraseWeak(question.id);
      incrementIdiomWeakLinks(noteIds);
    }

    const buttons = Array.from(el.choicesBox.querySelectorAll("button"));
    buttons.forEach(function (btn) {
      btn.disabled = true;
      btn.classList.remove("selected");

      if (btn.textContent === question.answer) {
        btn.classList.add("correct");
      }

      if (!isCorrect && btn.textContent === state.selectedChoice) {
        btn.classList.add("wrong");
      }
    });

    el.feedbackBox.classList.remove("hidden");
    el.feedbackBox.classList.add(isCorrect ? "ok" : "ng");
    el.feedbackBox.innerHTML = buildFeedbackHtml(question, isCorrect);

   state.results.push({
  id: question.id,
  displayNo: question.displayNo,
  sourceId: question.sourceId || "",
  a: question.a,
  b: question.b,
  answer: question.answer,
  answerJa: question.answerJa || "",
  ja: question.ja || "",
  note: question.note || "",
  selectedChoice: state.selectedChoice,
  correct: isCorrect
});

   if (state.mode === "order" || state.mode === "order_continue") {
  const rangedData = getRangedData();
  const total = rangedData.length || 1;
  const nextCursor = (Number(question._index) + 1) % total;
  setCursor(nextCursor);
}

    el.checkBtn.disabled = true;
    el.nextBtn.disabled = false;
    el.nextBtn.textContent =
      state.currentIndex === state.sessionItems.length - 1 ? "結果を見る" : "次へ";

    updatePoolInfo();
  }

  function renderProblemList() {
    el.problemList.innerHTML = "";

    if (!DATA.length) {
      el.problemListEmpty.classList.remove("hidden");
      return;
    }

    el.problemListEmpty.classList.add("hidden");

    const weakMap = readWeakAutoMap();
    const manualMap = readManualWeakMap();

    DATA.forEach(function (item, index) {
      const autoWeakCount = weakMap[item.id] || 0;
      const manualWeak = !!manualMap[item.id];
      const noteIds = getQuestionNoteIds(item);

      const badges = [];
      if (manualWeak) badges.push(`<span class="badge badgeWeak">手動苦手</span>`);
      if (autoWeakCount > 0) badges.push(`<span class="badge badgeAuto">自動ミス ${autoWeakCount}回</span>`);

      const div = document.createElement("div");
      div.className = "listItem";
      div.innerHTML = `
        <div class="listTitle">第${index + 1}問</div>
        ${badges.length ? `<div>${badges.join("")}</div>` : ""}
        <div class="listMeta">対応番号：${escapeHtml(noteIds.join(", ") || "なし")}</div>
        <div class="listMeta">上の文：${escapeHtml(item.a)}</div>
        <div class="listMeta">下の文：${escapeHtml(item.b)}</div>
        <div class="listMeta">正解：${escapeHtml(item.answer)}</div>
        <div class="listMeta">正解語の意味：${escapeHtml(item.answerJa || "")}</div>
        <div class="listMeta">日本語：${escapeHtml(item.ja || "")}</div>
        <div class="listMeta">解説：${escapeHtml(item.note || "")}</div>
        <div class="listBtnRow">
          <button type="button" data-action="toggle-manual-weak" data-item-id="${item.id}" class="${manualWeak ? "weakBtnActive" : ""}">
            ${manualWeak ? "苦手解除" : "苦手に追加"}
          </button>
          <button type="button" data-action="go-idiom" data-note-ids="${escapeHtml(noteIds.join(","))}">
            イディオム問題へ
          </button>
        </div>
      `;
      el.problemList.appendChild(div);
    });
  }

  function renderWeakList() {
    el.weakList.innerHTML = "";

    const list = getWeakListItems();

    if (!list.length) {
      el.weakListEmpty.classList.remove("hidden");
      return;
    }

    el.weakListEmpty.classList.add("hidden");

    list.forEach(function (item, index) {
      const badges = [];
      if (item.manualWeak) badges.push(`<span class="badge badgeWeak">手動苦手</span>`);
      if (item.autoWeakCount > 0) badges.push(`<span class="badge badgeAuto">自動ミス ${item.autoWeakCount}回</span>`);

      const noteIds = getQuestionNoteIds(item);

      const div = document.createElement("div");
      div.className = "listItem";
      div.innerHTML = `
        <div class="listTitle">苦手 ${index + 1}</div>
        <div>${badges.join("")}</div>
        <div class="listMeta">対応番号：${escapeHtml(noteIds.join(", ") || "なし")}</div>
        <div class="listMeta">上の文：${escapeHtml(item.a)}</div>
        <div class="listMeta">下の文：${escapeHtml(item.b)}</div>
        <div class="listMeta">正解：${escapeHtml(item.answer)}</div>
        <div class="listMeta">正解語の意味：${escapeHtml(item.answerJa || "")}</div>
        <div class="listMeta">日本語：${escapeHtml(item.ja || "")}</div>
        <div class="listMeta">解説：${escapeHtml(item.note || "")}</div>
        <div class="listBtnRow">
          <button type="button" data-action="toggle-manual-weak" data-item-id="${item.id}" class="${item.manualWeak ? "weakBtnActive" : ""}">
            ${item.manualWeak ? "苦手解除" : "苦手に追加"}
          </button>
          <button type="button" data-action="go-idiom" data-note-ids="${escapeHtml(noteIds.join(","))}">
            イディオム問題へ
          </button>
        </div>
      `;
      el.weakList.appendChild(div);
    });
  }


  function createSummaryCardHtml(item) {
  const completedB = item.b.replace("( )", item.answer);

  return `
    <div class="paraSummaryCard">
      <div class="paraSummaryHead">
        <div class="paraSummaryTitleWrap">
          <div class="paraSummaryNo">第${item.displayNo}問</div>
          <div class="paraSummaryStatus ${item.correct ? "ok" : "ng"}">
            ${item.correct ? "○ 正解" : "× 不正解"}
          </div>
        </div>
      </div>

      <div class="paraSummaryGrid">
        <div class="paraSummaryField">
          <div class="paraSummaryLabel">上の文</div>
          <div class="paraSummaryValue">${escapeHtml(item.a)}</div>
        </div>

        <div class="paraSummaryField">
          <div class="paraSummaryLabel">下の文（完成形）</div>
          <div class="paraSummaryValue">${escapeHtml(completedB)}</div>
        </div>

        ${!item.correct ? `
          <div class="paraSummaryField">
            <div class="paraSummaryLabel">あなたの解答</div>
            <div class="paraSummaryValue">${escapeHtml(item.selectedChoice)}</div>
          </div>
        ` : ""}

        <div class="paraSummaryField">
          <div class="paraSummaryLabel">正解</div>
          <div class="paraSummaryValue">${escapeHtml(item.answer)}</div>
        </div>

        <div class="paraSummaryField">
          <div class="paraSummaryLabel">正解語の意味</div>
          <div class="paraSummaryValue">${escapeHtml(item.answerJa || "")}</div>
        </div>

        <div class="paraSummaryField">
          <div class="paraSummaryLabel">日本語訳</div>
          <div class="paraSummaryValue">${escapeHtml(item.ja || "")}</div>
        </div>
      </div>

      <details class="paraSummaryDetails">
        <summary>解説を見る</summary>
        <div class="paraSummaryDetailsBody">${escapeHtml(item.note || "")}</div>
      </details>
    </div>
  `;
}

  function renderSummary() {
  const total = state.sessionItems.length;
  const wrongItems = state.results.filter(function (item) {
    return !item.correct;
  });
  const rate = total ? Math.round((state.score / total) * 100) : 0;

  el.summaryLine.textContent = `${state.score} / ${total} 問正解`;
  el.summarySub.textContent = `出題順：${modeLabel(state.mode)} / 正答率：${rate}%`;

  el.wrongList.innerHTML = "";
  el.askedList.innerHTML = "";

  if (!wrongItems.length) {
    el.wrongEmpty.classList.remove("hidden");
  } else {
    el.wrongEmpty.classList.add("hidden");
    wrongItems.forEach(function (item) {
      el.wrongList.insertAdjacentHTML("beforeend", createSummaryCardHtml(item));
    });
  }

  state.results.forEach(function (item) {
    el.askedList.insertAdjacentHTML("beforeend", createSummaryCardHtml(item));
  });
}

  function finishQuiz() {
    renderSummary();
    showBox("summary");
  }

  function resetSessionState() {
    state.currentIndex = 0;
    state.selectedChoice = "";
    state.answered = false;
    state.score = 0;
    state.results = [];
  }

  function startQuiz(useLastSession) {
  if (!DATA.length) {
    alert("paraphrase_data_1kyu.js のデータが読み込めていません。");
    return;
  }

  const rangedData = getRangedData();

  if (!rangedData.length) {
    const range = getRangeValues();
    alert(`No.${range.startNo}〜${range.endNo} の範囲に出題できる問題がありません。`);
    updatePoolInfo();
    return;
  }

  saveCurrentSettings();

  const count = countToNumber(el.questionCount.value, rangedData.length);
  const mode = el.quizMode.value;

  state.mode = mode;
  resetSessionState();

  if (useLastSession && state.lastSessionItems.length) {
    state.sessionItems = state.lastSessionItems.map(function (item) {
      return { ...item };
    });
  } else {
    state.sessionItems = getSessionItems(count, mode);
    state.lastSessionItems = state.sessionItems.map(function (item) {
      return { ...item };
    });
  }

  showBox("play");
  renderQuestion();
}

  function startRelatedParaphraseQuiz(noteIds) {
    const relatedItems = getRelatedItemsByNoteIds(noteIds);
    if (!relatedItems.length) {
      alert("この番号に対応する言い換え問題が見つかりません。");
      return;
    }

    state.mode = "linked";
    resetSessionState();
    state.sessionItems = relatedItems.map(function (item) {
      return { ...item };
    });
    state.lastSessionItems = state.sessionItems.map(function (item) {
      return { ...item };
    });

    showBox("play");
    renderQuestion();
  }

  function goNext() {
    if (!state.answered) return;

    state.currentIndex += 1;
    if (state.currentIndex >= state.sessionItems.length) {
      finishQuiz();
      return;
    }

    renderQuestion();
  }

  function isTypingTarget(target) {
  if (!target) return false;
  const tag = String(target.tagName || "").toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || target.isContentEditable;
}

function handleKeyboardShortcut(event) {
  if (isTypingTarget(event.target)) return;
  if (el.playBox.classList.contains("hidden")) return;

  const key = event.key;

  if (!state.answered) {
    if (key === "1" || key === "2" || key === "3" || key === "4") {
      const buttons = Array.from(el.choicesBox.querySelectorAll(".choiceBtn"));
      const idx = Number(key) - 1;
      const btn = buttons[idx];
      if (btn && !btn.disabled) {
        event.preventDefault();
        btn.click();
      }
      return;
    }

    if (key === "Enter" || key === " " || key === "Spacebar" || key === "ArrowRight") {
      if (state.selectedChoice) {
        event.preventDefault();
        checkAnswer();
      }
      return;
    }

    return;
  }

  if (key === "Enter" || key === " " || key === "Spacebar" || key === "ArrowRight") {
    event.preventDefault();
    if (!el.nextBtn.disabled) {
      goNext();
    }
  }
}

  function restoreSettingsToForm() {
  const settings = getSavedSettings();
  const maxNo = getMaxDisplayNo();

  if (el.rangeStart) {
    el.rangeStart.value = settings.rangeStart || "1";
  }

  if (el.rangeEnd) {
    el.rangeEnd.value = settings.rangeEnd || String(maxNo);
  }

  el.questionCount.value = settings.questionCount;
  el.quizMode.value = settings.quizMode;
  el.autoRead.checked = settings.autoRead;
}

  function handleListAreaClick(event) {
    const btn = event.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.getAttribute("data-action");

    if (action === "toggle-manual-weak") {
      const itemId = btn.getAttribute("data-item-id");
      if (!itemId) return;

      toggleManualWeak(itemId);
      updatePoolInfo();
      renderProblemList();
      renderWeakList();

      const current = state.sessionItems[state.currentIndex];
      if (current && current.id === itemId) {
        updateManualWeakButton(itemId);
      }
      return;
    }

    if (action === "go-idiom") {
      const raw = btn.getAttribute("data-note-ids") || "";
      const noteIds = raw.split(",").map(normalizeNoteId).filter(Boolean);
      if (!noteIds.length) return;
      openIdiomForNoteIds(noteIds);
    }
  }

  function clearRelatedSourceQuery() {
    state.relatedNoteIds = [];
    const url = new URL(window.location.href);
    url.searchParams.delete("noteId");
    url.searchParams.delete("noteIds");
    window.history.replaceState({}, "", url.toString());
    refreshRelatedParaphraseBox();
  }

  function init() {
    updateLevelBadge();
    restoreSettingsToForm();
    updatePoolInfo();
    renderProblemList();
    renderWeakList();
    showBox("setup");

    if (!supportsSpeech()) {
      el.readBtn.disabled = true;
      el.readBtn.textContent = "読み上げ非対応";
      el.autoRead.checked = false;
    }

    if (el.jumpIdiomBtn) {
      el.jumpIdiomBtn.disabled = true;
    }

    el.startBtn.addEventListener("click", function () {
      startQuiz(false);
    });

    document.addEventListener("keydown", handleKeyboardShortcut);

    el.openProblemListBtn.addEventListener("click", function () {
      renderProblemList();
      showBox("problemList");
    });

    el.openWeakListBtn.addEventListener("click", function () {
      renderWeakList();
      showBox("weakList");
    });

    el.problemListBackBtn.addEventListener("click", function () {
      updatePoolInfo();
      showBox("setup");
    });

    el.weakListBackBtn.addEventListener("click", function () {
      updatePoolInfo();
      showBox("setup");
    });

    el.problemList.addEventListener("click", handleListAreaClick);
    el.weakList.addEventListener("click", handleListAreaClick);

    el.readBtn.addEventListener("click", function () {
      const question = state.sessionItems[state.currentIndex];
      if (!question) return;
      speak(question.a);
    });

    if (el.jumpIdiomBtn) {
      el.jumpIdiomBtn.addEventListener("click", function () {
        const question = state.sessionItems[state.currentIndex];
        if (!question) return;
        openIdiomForNoteIds(getQuestionNoteIds(question));
      });
    }

    if (el.startRelatedParaphraseBtn) {
      el.startRelatedParaphraseBtn.addEventListener("click", function () {
        startRelatedParaphraseQuiz(state.relatedNoteIds);
      });
    }

    if (el.relatedParaphraseToIdiomBtn) {
      el.relatedParaphraseToIdiomBtn.addEventListener("click", function () {
        if (!state.relatedNoteIds.length) return;
        openIdiomForNoteIds(state.relatedNoteIds);
      });
    }

    if (el.clearRelatedParaphraseBtn) {
      el.clearRelatedParaphraseBtn.addEventListener("click", clearRelatedSourceQuery);
    }

    el.manualWeakBtn.addEventListener("click", function () {
      const question = state.sessionItems[state.currentIndex];
      if (!question) return;

      toggleManualWeak(question.id);
      updateManualWeakButton(question.id);
      updatePoolInfo();
      renderProblemList();
      renderWeakList();
    });

    el.backBtn.addEventListener("click", function () {
      showBox("setup");
      updatePoolInfo();
      renderWeakList();
    });

    el.checkBtn.addEventListener("click", checkAnswer);
    el.nextBtn.addEventListener("click", goNext);

    el.retryBtn.addEventListener("click", function () {
      startQuiz(true);
    });

    el.continueBtn.addEventListener("click", function () {
      startQuiz(false);
    });

    el.backToSetupBtn.addEventListener("click", function () {
      updatePoolInfo();
      renderWeakList();
      showBox("setup");
    });

   if (el.rangeStart) {
  el.rangeStart.addEventListener("input", function () {
    saveCurrentSettings();
    updatePoolInfo();
  });
}

if (el.rangeEnd) {
  el.rangeEnd.addEventListener("input", function () {
    saveCurrentSettings();
    updatePoolInfo();
  });
}

el.questionCount.addEventListener("change", function () {
  saveCurrentSettings();
  updatePoolInfo();
});

el.quizMode.addEventListener("change", function () {
  saveCurrentSettings();
  updatePoolInfo();
});

el.autoRead.addEventListener("change", function () {
  saveCurrentSettings();
});
  }

  const PARAPHRASE_GOIMON_DELTA = { kotoba: 0.5, bunmyaku: 0.5 };

  function renderParaphraseGoimonMini() {
    if (!window.GoimonUI) return;

    const g = window.GoimonUI.ensureCurrent();

    const stageEl = document.getElementById("paraphraseGoimonStage");
    const imageEl = document.getElementById("paraphraseGoimonImage");
    const nameEl = document.getElementById("paraphraseGoimonName");
    const metaEl = document.getElementById("paraphraseGoimonMeta");
    const descEl = document.getElementById("paraphraseGoimonDesc");
    const guideEl = document.getElementById("paraphrasePointGuide");

    if (!stageEl || !imageEl || !nameEl || !metaEl || !descEl || !guideEl) return;

    stageEl.textContent = window.GoimonUI.getStageLabel(g.stage);
    imageEl.src = g.imageKey || window.GoimonUI.getImageFor(g.type, g.stage);
    imageEl.alt = window.GoimonUI.getGoimonPrimaryName(g);
    nameEl.textContent = window.GoimonUI.getGoimonPrimaryName(g);
    metaEl.textContent = `Lv ${g.level} / ${window.GoimonUI.formatPoint(g.totalPoints)} pt`;
    descEl.textContent = window.GoimonUI.getDisplayDescription(g);
    guideEl.textContent = "正解：ことば +0.5 ＋ ぶんみゃく +0.5";

    window.GoimonUI.renderEvolutionNoticeButton("evolutionNoticeBtn");
  }

  function initParaphraseGoimonMini() {
    if (!window.GoimonUI) return;

    const toggleBtn = document.getElementById("toggleGoimon");
    const card = document.getElementById("goimonCard");

    if (toggleBtn && card && toggleBtn.dataset.bound !== "1") {
      toggleBtn.dataset.bound = "1";
      toggleBtn.addEventListener("click", function () {
        const willOpen = card.classList.contains("hidden");
        card.classList.toggle("hidden");
        toggleBtn.textContent = willOpen ? "ゴイモンを閉じる" : "ゴイモンの様子を見る";
      });
    }

    window.GoimonUI.bindEvolutionNoticeButton("evolutionNoticeBtn", {
      onComplete: function () {
        renderParaphraseGoimonMini();
      }
    });

    renderParaphraseGoimonMini();
  }

  function awardParaphraseGoimonCorrect() {
    if (!window.GoimonUI) return;
    window.GoimonUI.addPoints(PARAPHRASE_GOIMON_DELTA, "paraphrase_quiz");
    renderParaphraseGoimonMini();
  }

  init();
  initParaphraseGoimonMini();
})();
