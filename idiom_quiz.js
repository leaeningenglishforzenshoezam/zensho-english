(function () {
  "use strict";

  const DATA_LEVEL = 1;
  const UI_LEVEL = window.ACTIVE_LEVEL || "1";
  const URL_PARAMS = new URLSearchParams(window.location.search);

    const STORAGE_KEYS = {
    weakMeaning: `zensho_idiom_quiz_weak_meaning_v1_lv${DATA_LEVEL}`,
    weakSynonym: `zensho_idiom_quiz_weak_synonym_v1_lv${DATA_LEVEL}`,
    weakExpressionFromMeaning: `zensho_idiom_quiz_weak_expression_from_meaning_v1_lv${DATA_LEVEL}`,
    manualWeak: `zensho_idiom_quiz_manual_weak_v1_lv${DATA_LEVEL}`,
    cursorMeaning: `zensho_idiom_quiz_cursor_meaning_v1_lv${DATA_LEVEL}`,
    cursorSynonym: `zensho_idiom_quiz_cursor_synonym_v1_lv${DATA_LEVEL}`,
    cursorExpressionFromMeaning: `zensho_idiom_quiz_cursor_expression_from_meaning_v1_lv${DATA_LEVEL}`,
    settings: `zensho_idiom_quiz_settings_v3_lv${DATA_LEVEL}`,
    listUi: `zensho_idiom_quiz_list_ui_v1_lv${DATA_LEVEL}`
  };

const DEFAULT_SETTINGS = {
  questionMode: "meaning",
  questionCount: "10",
  quizMode: "order",
  autoRead: false,
  rangeStart: "1",
  rangeEnd: "200"
};

  const RAW_DATA = Array.isArray(window.IDIOM_DATA_1KYU) ? window.IDIOM_DATA_1KYU.slice() : [];
  const DATA = RAW_DATA.map(function (item, index) {
    return {
      ...item,
      displayNo: Number(item.displayNo) || (index + 1)
    };
  });

  const el = {
    levelBadge: document.getElementById("levelBadge"),

    setupBox: document.getElementById("setupBox"),
    focusIdiomBox: document.getElementById("focusIdiomBox"),
    focusIdiomLine: document.getElementById("focusIdiomLine"),
    focusIdiomExpression: document.getElementById("focusIdiomExpression"),
    focusIdiomJa: document.getElementById("focusIdiomJa"),
    focusIdiomSynonym: document.getElementById("focusIdiomSynonym"),
    focusIdiomAntonym: document.getElementById("focusIdiomAntonym"),
    focusIdiomLinks: document.getElementById("focusIdiomLinks"),
    focusIdiomNote: document.getElementById("focusIdiomNote"),
    focusMeaningBtn: document.getElementById("focusMeaningBtn"),
    focusSynonymBtn: document.getElementById("focusSynonymBtn"),
    focusIdiomClearBtn: document.getElementById("focusIdiomClearBtn"),

    problemListBox: document.getElementById("problemListBox"),
    weakListBox: document.getElementById("weakListBox"),
    playBox: document.getElementById("playBox"),
    summaryBox: document.getElementById("summaryBox"),

    questionMode: document.getElementById("questionMode"),
    questionCount: document.getElementById("questionCount"),
    quizMode: document.getElementById("quizMode"),
    autoRead: document.getElementById("autoRead"),
    rangeStart: document.getElementById("rangeStart"),
rangeEnd: document.getElementById("rangeEnd"),
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

    problemMaskMeaningBtn: document.getElementById("problemMaskMeaningBtn"),
    problemMaskSynonymBtn: document.getElementById("problemMaskSynonymBtn"),
    weakMaskMeaningBtn: document.getElementById("weakMaskMeaningBtn"),
    weakMaskSynonymBtn: document.getElementById("weakMaskSynonymBtn"),

    stats: document.getElementById("stats"),
    questionNoLine: document.getElementById("questionNoLine"),
    expressionText: document.getElementById("expressionText"),
    questionModeBadge: document.getElementById("questionModeBadge"),
    choicesBox: document.getElementById("choicesBox"),
    feedbackBox: document.getElementById("feedbackBox"),
    feedbackQuick: document.getElementById("feedbackQuick"),
    originSearchBtn: document.getElementById("originSearchBtn"),
    readBtn: document.getElementById("readBtn"),
    jumpParaphraseBtn: document.getElementById("jumpParaphraseBtn"),
    nextBtn: document.getElementById("nextBtn"),
    nextBtnBottom: document.getElementById("nextBtnBottom"),
    backBtn: document.getElementById("backBtn"),

    summaryLine: document.getElementById("summaryLine"),
    resultScore: document.getElementById("resultScore"),
    wrongList: document.getElementById("wrongList"),
    wrongEmpty: document.getElementById("wrongEmpty"),
    askedList: document.getElementById("askedList"),

    retrySetBtnTop: document.getElementById("retrySetBtnTop"),
    continueBtn: document.getElementById("continueBtn"),
    summaryBackBtn: document.getElementById("summaryBackBtn"),

    toggleGoimon: document.getElementById("toggleGoimon"),
    goimonCard: document.getElementById("goimonCard"),
    evolutionNoticeBtn: document.getElementById("evolutionNoticeBtn")
  };

  const state = {
    questionMode: "meaning",
    mode: "order",
    sessionItems: [],
    currentIndex: 0,
    score: 0,
    answered: false,
    results: [],
    lastSessionItems: [],
    focusIdFromQuery: URL_PARAMS.get("focusId") || "",
focusNoteIdsFromQuery: (URL_PARAMS.get("noteIds") || URL_PARAMS.get("noteId") || "")
  .split(",")
  .map(function (v) { return String(v || "").trim().toUpperCase(); })
  .filter(Boolean)
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

  function modeLabel(mode) {
    if (mode === "order") return "順番";
    if (mode === "order_continue") return "続きから";
    if (mode === "random") return "ランダム";
    if (mode === "weak") return "ニガテ順";
    if (mode === "linked") return "関連問題";
    return mode;
  }

    function questionModeLabel(questionMode) {
    if (questionMode === "meaning") return "意味を選ぶ";
    if (questionMode === "synonym") return "同義表現を選ぶ";
    if (questionMode === "expression_from_meaning") return "英語表現を選ぶ";
    return questionMode;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
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

  function getNoteIdList(item) {
    if (!item) return [];
    if (Array.isArray(item.noteIds)) return normalizeStringArray(item.noteIds);
    if (Array.isArray(item.noteId)) return normalizeStringArray(item.noteId);
    return normalizeStringArray(item.noteId);
  }

  function getSynonymList(item) {
    if (!item) return [];
    return normalizeStringArray(item.paraphraseTo);
  }

  function getAntonymList(item) {
    if (!item) return [];
    return normalizeStringArray(item.antonyms);
  }

  function getNoteText(item) {
    return String((item && item.note) || "").trim();
  }

  function formatTextList(list, emptyText) {
    const arr = normalizeStringArray(list);
    return arr.length ? arr.join(" / ") : (emptyText || "なし");
  }

  function formatSynonyms(item) {
    return formatTextList(getSynonymList(item), "なし");
  }

  function formatAntonyms(item) {
    return formatTextList(getAntonymList(item), "なし");
  }

  function formatNoteIds(item) {
    return formatTextList(getNoteIdList(item), "なし");
  }

  function getIdiomExample(item) {
  if (!item || !item.id) return {};

  const exampleMap = window.IDIOM_EXAMPLES_1KYU || {};
  const extra = exampleMap[item.id] || {};

  return {
    exampleEn: String(extra.exampleEn || item.exampleEn || "").trim(),
    exampleJa: String(extra.exampleJa || item.exampleJa || "").trim(),
    usage: String(extra.usage || extra.note || "").trim()
  };
}

function findItemsByMeaningText(meaningText, excludeId) {
  const key = normalizeCompareText(meaningText);
  if (!key) return [];

  return DATA.filter(function (item) {
    if (!item) return false;
    if (excludeId && item.id === excludeId) return false;
    return normalizeCompareText(item.ja) === key;
  });
}

function findItemsByExpressionText(expressionText, excludeId) {
  const key = normalizeCompareText(expressionText);
  if (!key) return [];

  return DATA.filter(function (item) {
    if (!item) return false;
    if (excludeId && item.id === excludeId) return false;
    return normalizeCompareText(item.expression) === key;
  });
}

function formatItemExpressionHints(items) {
  if (!Array.isArray(items) || !items.length) return "";

  return items.map(function (item) {
    const noteIds = getNoteIdList(item);
    const noteLabel = noteIds.length ? `（${noteIds.join(", ")}）` : "";
    return `${item.expression}${noteLabel}`;
  }).join(" / ");
}

function getWrongAnswerExpressionHint(question, selectedText) {
  if (!question || !selectedText) return "";

  if (state.questionMode === "meaning") {
    return formatItemExpressionHints(findItemsByMeaningText(selectedText, question.id));
  }

  if (state.questionMode === "synonym") {
    return formatExpressionHintsFromSynonym(selectedText, question.id);
  }

  if (state.questionMode === "expression_from_meaning") {
    return formatItemExpressionHints(findItemsByExpressionText(selectedText, question.id));
  }

  return "";
}

    function normalizeCompareText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function buildGoogleSearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function openGoogleSearch(query) {
  const url = buildGoogleSearchUrl(query);
  window.open(url, "_blank", "noopener,noreferrer");
}

  function findItemsUsingSynonymText(text, excludeId) {
    const key = normalizeCompareText(text);
    if (!key) return [];

    return DATA.filter(function (item) {
      if (excludeId && item.id === excludeId) return false;

      return getSynonymList(item).some(function (syn) {
        return normalizeCompareText(syn) === key;
      });
    });
  }

  function formatExpressionHintsFromSynonym(text, excludeId) {
    const items = findItemsUsingSynonymText(text, excludeId);
    if (!items.length) return "";

    return items.map(function (item) {
      const noteIds = getNoteIdList(item);
      const noteLabel = noteIds.length ? `（${noteIds.join(", ")}）` : "";
      return `${item.expression}${noteLabel}`;
    }).join(" / ");
  }

  function getItemById(itemId) {
    return DATA.find(function (item) {
      return item.id === itemId;
    }) || null;
  }

  function getItemsByNoteIds(noteIds) {
  const targets = Array.isArray(noteIds) ? noteIds : [];
  if (!targets.length) return [];

  return DATA.filter(function (item) {
    const ids = normalizeStringArray(item.noteIds || item.noteId)
      .map(function (v) { return String(v || "").trim().toUpperCase(); });

    return ids.some(function (id) {
      return targets.indexOf(id) !== -1;
    });
  });
}

    function getWeakKey(questionMode) {
    if (questionMode === "synonym") return STORAGE_KEYS.weakSynonym;
    if (questionMode === "expression_from_meaning") return STORAGE_KEYS.weakExpressionFromMeaning;
    return STORAGE_KEYS.weakMeaning;
  }

    function getCursorKey(questionMode) {
    if (questionMode === "synonym") return STORAGE_KEYS.cursorSynonym;
    if (questionMode === "expression_from_meaning") return STORAGE_KEYS.cursorExpressionFromMeaning;
    return STORAGE_KEYS.cursorMeaning;
  }

  function getWeakMap(questionMode) {
    const raw = readJSON(getWeakKey(questionMode), {});
    if (!raw || typeof raw !== "object") return {};
    return raw;
  }

  function saveWeakMap(questionMode, map) {
    writeJSON(getWeakKey(questionMode), map);
  }

  function incrementWeak(questionMode, id) {
    const weakMap = getWeakMap(questionMode);
    weakMap[id] = (weakMap[id] || 0) + 1;
    saveWeakMap(questionMode, weakMap);
  }

  function getManualWeakMap() {
    const raw = readJSON(STORAGE_KEYS.manualWeak, {});
    if (!raw || typeof raw !== "object") return {};
    return raw;
  }

  function saveManualWeakMap(map) {
    writeJSON(STORAGE_KEYS.manualWeak, map);
  }

  function isManualWeak(id) {
    const map = getManualWeakMap();
    return !!map[id];
  }

  function toggleManualWeak(id) {
    const map = getManualWeakMap();
    if (map[id]) {
      delete map[id];
    } else {
      map[id] = true;
    }
    saveManualWeakMap(map);
  }

  function getListUiMap() {
    const raw = readJSON(STORAGE_KEYS.listUi, {});
    if (!raw || typeof raw !== "object") return {};
    return raw;
  }

  function saveListUiMap(map) {
    writeJSON(STORAGE_KEYS.listUi, map);
  }

  function isMeaningMasked(id) {
    const map = getListUiMap();
    return !!(map[id] && map[id].meaningMasked);
  }

  function isSynonymMasked(id) {
    const map = getListUiMap();
    return !!(map[id] && map[id].synonymMasked);
  }

  function setMeaningMasked(id, value) {
    const map = getListUiMap();
    map[id] = map[id] || {};
    map[id].meaningMasked = !!value;
    saveListUiMap(map);
  }

  function setSynonymMasked(id, value) {
    const map = getListUiMap();
    map[id] = map[id] || {};
    map[id].synonymMasked = !!value;
    saveListUiMap(map);
  }

  function getProblemListTargetIds() {
  return filterByNoRange(DATA).map(function (item) {
    return item.id;
  });
}

  function getWeakListTargetIds() {
    const questionMode = el.questionMode.value;
    const weakMap = getWeakMap(questionMode);
    const manualWeakMap = getManualWeakMap();

    return getAvailableDataForMode(questionMode)
      .filter(function (item) {
        return (weakMap[item.id] || 0) > 0 || !!manualWeakMap[item.id];
      })
      .map(function (item) {
        return item.id;
      });
  }

  function areAllMeaningMasked(ids) {
    if (!ids.length) return false;
    return ids.every(function (id) {
      return isMeaningMasked(id);
    });
  }

  function areAllSynonymMasked(ids) {
    if (!ids.length) return false;
    return ids.every(function (id) {
      return isSynonymMasked(id);
    });
  }

  function setMeaningMaskedForIds(ids, value) {
    const map = getListUiMap();
    ids.forEach(function (id) {
      map[id] = map[id] || {};
      map[id].meaningMasked = !!value;
    });
    saveListUiMap(map);
  }

  function setSynonymMaskedForIds(ids, value) {
    const map = getListUiMap();
    ids.forEach(function (id) {
      map[id] = map[id] || {};
      map[id].synonymMasked = !!value;
    });
    saveListUiMap(map);
  }

  function updateBulkMaskButtonLabels() {
    const problemIds = getProblemListTargetIds();
    const weakIds = getWeakListTargetIds();

    if (el.problemMaskMeaningBtn) {
      el.problemMaskMeaningBtn.textContent = areAllMeaningMasked(problemIds)
        ? "意味を一括表示"
        : "意味を一括で隠す";
    }

    if (el.problemMaskSynonymBtn) {
      el.problemMaskSynonymBtn.textContent = areAllSynonymMasked(problemIds)
        ? "同義表現を一括表示"
        : "同義表現を一括で隠す";
    }

    if (el.weakMaskMeaningBtn) {
      el.weakMaskMeaningBtn.textContent = areAllMeaningMasked(weakIds)
        ? "意味を一括表示"
        : "意味を一括で隠す";
    }

    if (el.weakMaskSynonymBtn) {
      el.weakMaskSynonymBtn.textContent = areAllSynonymMasked(weakIds)
        ? "同義表現を一括表示"
        : "同義表現を一括で隠す";
    }
  }

  function toggleBulkMeaning(ids) {
    if (!ids.length) return;
    const nextValue = !areAllMeaningMasked(ids);
    setMeaningMaskedForIds(ids, nextValue);
    refreshVisibleLists();
  }

  function toggleBulkSynonym(ids) {
    if (!ids.length) return;
    const nextValue = !areAllSynonymMasked(ids);
    setSynonymMaskedForIds(ids, nextValue);
    refreshVisibleLists();
  }

  function getCursor(questionMode) {
  const storageKey = getCursorKey(questionMode);
  const raw = localStorage.getItem(storageKey);
  const rangeKey = getCursorRangeKey();

  if (!raw) return 0;

  try {
    const obj = JSON.parse(raw);

    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      const v = Number(obj[rangeKey]);
      if (Number.isFinite(v) && v >= 0) return Math.floor(v);
      return 0;
    }

    const legacy = Number(obj);
    if (Number.isFinite(legacy) && legacy >= 0) return Math.floor(legacy);
  } catch {
    const legacy = Number(raw);
    if (Number.isFinite(legacy) && legacy >= 0) return Math.floor(legacy);
  }

  return 0;
}

function setCursor(questionMode, value) {
  const storageKey = getCursorKey(questionMode);
  const rangeKey = getCursorRangeKey();

  let obj = {};

  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : {};
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      obj = parsed;
    }
  } catch {}

  const n = Number(value);
  obj[rangeKey] = Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;

  localStorage.setItem(storageKey, JSON.stringify(obj));
}

function getSavedSettings() {
  const maxNo = getMaxDisplayNo();
  const saved = readJSON(STORAGE_KEYS.settings, DEFAULT_SETTINGS);

  return {
    questionMode: saved.questionMode || DEFAULT_SETTINGS.questionMode,
    questionCount: saved.questionCount || DEFAULT_SETTINGS.questionCount,
    quizMode: saved.quizMode || DEFAULT_SETTINGS.quizMode,
    autoRead: !!saved.autoRead,
    rangeStart: saved.rangeStart || "1",
    rangeEnd: saved.rangeEnd || String(maxNo)
  };
}

function saveCurrentSettings() {
  const range = getNoRange();

  const settings = {
    questionMode: el.questionMode.value,
    questionCount: el.questionCount.value,
    quizMode: el.quizMode.value,
    autoRead: el.autoRead.checked,
    rangeStart: String(range.startNo),
    rangeEnd: String(range.endNo)
  };

  writeJSON(STORAGE_KEYS.settings, settings);
}

  function countToNumber(value, maxCount) {
    if (value === "all") return maxCount;
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) return Math.min(10, maxCount);
    return Math.min(num, maxCount);
  }

  function getMaxDisplayNo() {
  const nums = DATA
    .map(function (item) {
      return Number(item.displayNo);
    })
    .filter(function (n) {
      return Number.isFinite(n) && n >= 1;
    });

  return nums.length ? Math.max.apply(null, nums) : DATA.length;
}

function getNoRange() {
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

function filterByNoRange(list) {
  const range = getNoRange();

  return list.filter(function (item) {
    const no = Number(item.displayNo);
    return Number.isFinite(no) && no >= range.startNo && no <= range.endNo;
  });
}

function getCursorRangeKey() {
  const range = getNoRange();
  return `${range.startNo}-${range.endNo}`;
}

  function hasUsableSynonym(item) {
    return getSynonymList(item).length > 0;
  }

function getAvailableDataForMode(questionMode, options) {
  let base = DATA.slice();

  if (questionMode === "synonym") {
    base = base.filter(hasUsableSynonym);
  }

  const applyRange = !(options && options.applyRange === false);

  if (applyRange) {
    base = filterByNoRange(base);
  }

  return base;
}

  function getSessionItems(questionMode, mode, count) {
    const base = getAvailableDataForMode(questionMode).map(function (item, index) {
      return {
        ...item,
        _index: index
      };
    });

    if (mode === "random") {
      return shuffle(base).slice(0, count);
    }

    if (mode === "weak") {
      const weakMap = getWeakMap(questionMode);
      const manualWeakMap = getManualWeakMap();

      return base
        .slice()
        .sort(function (a, b) {
          const manualA = manualWeakMap[a.id] ? 1 : 0;
          const manualB = manualWeakMap[b.id] ? 1 : 0;
          if (manualA !== manualB) return manualB - manualA;

          const weakA = weakMap[a.id] || 0;
          const weakB = weakMap[b.id] || 0;
          if (weakA !== weakB) return weakB - weakA;

          return a._index - b._index;
        })
        .slice(0, count);
    }

    if (mode === "order_continue") {
      const cursor = base.length ? (getCursor(questionMode) % base.length) : 0;
      const ordered = base.slice(cursor).concat(base.slice(0, cursor));
      return ordered.slice(0, count);
    }

    return base.slice(0, count);
  }

    function getCorrectAnswerText(question, questionMode) {
    if (questionMode === "synonym") {
      if (question._currentCorrectText) return question._currentCorrectText;
      const syns = getSynonymList(question);
      return syns[0] || "";
    }

    if (questionMode === "expression_from_meaning") {
      question._currentCorrectText = question.expression || "";
      return question.expression || "";
    }

    return question.ja || "";
  }

   function getChoicesForQuestion(question, questionMode) {
    if (questionMode === "synonym") {
      const correctCandidates = getSynonymList(question);
      const correct = shuffle(correctCandidates)[0] || "";
      question._currentCorrectText = correct;

      const wrongPool = Array.from(new Set(
        getAvailableDataForMode(questionMode)
          .filter(function (item) { return item.id !== question.id; })
          .flatMap(function (item) { return getSynonymList(item); })
          .map(function (text) { return String(text || "").trim(); })
          .filter(function (text) { return text && text !== correct; })
      ));

      const selectedWrong = shuffle(wrongPool).slice(0, 3);
      return shuffle([correct].concat(selectedWrong));
    }

    if (questionMode === "expression_from_meaning") {
      const correct = String(question.expression || "").trim();
      question._currentCorrectText = correct;

      const wrongPool = Array.from(new Set(
        DATA
          .filter(function (item) { return item.id !== question.id; })
          .map(function (item) { return String(item.expression || "").trim(); })
          .filter(function (text) { return text && text !== correct; })
      ));

      const selectedWrong = shuffle(wrongPool).slice(0, 3);
      return shuffle([correct].concat(selectedWrong));
    }

    question._currentCorrectText = question.ja || "";
    const correct = question.ja || "";

    const wrongPool = Array.from(new Set(
      DATA
        .filter(function (item) { return item.id !== question.id; })
        .map(function (item) { return String(item.ja || "").trim(); })
        .filter(function (text) { return text && text !== correct; })
    ));

    const selectedWrong = shuffle(wrongPool).slice(0, 3);
    return shuffle([correct].concat(selectedWrong));
  }

  function hideAllMainBoxes() {
    el.setupBox.classList.add("hidden");
    el.problemListBox.classList.add("hidden");
    el.weakListBox.classList.add("hidden");
    el.playBox.classList.add("hidden");
    el.summaryBox.classList.add("hidden");
    if (el.focusIdiomBox) {
      el.focusIdiomBox.classList.add("hidden");
    }
  }

  function refreshFocusIdiomBox() {
  if (!el.focusIdiomBox) return;

  if (el.setupBox.classList.contains("hidden")) {
    el.focusIdiomBox.classList.add("hidden");
    return;
  }

  let item = null;
  let lineText = "";

  if (state.focusIdFromQuery) {
    item = getItemById(state.focusIdFromQuery);
    lineText = "大問11風ページから関連表現として開きました。";
  } else if (state.focusNoteIdsFromQuery && state.focusNoteIdsFromQuery.length) {
    const relatedItems = getItemsByNoteIds(state.focusNoteIdsFromQuery);
    item = relatedItems[0] || null;

    if (relatedItems.length >= 2) {
      lineText =
        `大問11番号 ${state.focusNoteIdsFromQuery.join(", ")} に対応するイディオム ${relatedItems.length} 件のうち、先頭の1件を表示しています。`;
    } else {
      lineText =
        `大問11番号 ${state.focusNoteIdsFromQuery.join(", ")} に対応するイディオムです。`;
    }
  }

  if (!item) {
    el.focusIdiomBox.classList.add("hidden");
    return;
  }

  el.focusIdiomLine.textContent = lineText;
  el.focusIdiomExpression.textContent = `No.${item.displayNo}　${item.expression}`;
  el.focusIdiomJa.textContent = `意味：${item.ja}`;
  el.focusIdiomSynonym.textContent = `同義表現：${formatSynonyms(item)}`;
  el.focusIdiomAntonym.textContent = `対義表現：${formatAntonyms(item)}`;
  el.focusIdiomLinks.textContent = `対応番号：${formatNoteIds(item)}`;
  el.focusIdiomNote.textContent = `メモ：${getNoteText(item) || "なし"}`;
  el.focusIdiomBox.classList.remove("hidden");

  if (el.focusSynonymBtn) {
    el.focusSynonymBtn.disabled = !hasUsableSynonym(item);
  }

  state.focusIdFromQuery = item.id;
}

  function showBox(name) {
    hideAllMainBoxes();

    if (name === "setup") {
      el.setupBox.classList.remove("hidden");
      refreshFocusIdiomBox();
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
      return;
    }
    if (name === "summary") {
      el.summaryBox.classList.remove("hidden");
    }
  }

  function updateLevelBadge() {
    if (UI_LEVEL === "1") {
      el.levelBadge.textContent = "現在のレベル設定：1級";
    } else {
      el.levelBadge.textContent = "現在のレベル設定は2級ですが、このページは今は1級データで動作します。";
    }
  }

 function updatePoolInfo() {
  const questionMode = el.questionMode.value;
  const available = getAvailableDataForMode(questionMode);
  const weakMap = getWeakMap(questionMode);
  const manualWeakMap = getManualWeakMap();
  const range = getNoRange();

  const autoWeakItems = Object.keys(weakMap).filter(function (id) {
    return (weakMap[id] || 0) > 0;
  }).length;

  const autoWeakTotal = Object.values(weakMap).reduce(function (sum, value) {
    return sum + Number(value || 0);
  }, 0);

  const manualWeakItems = Object.keys(manualWeakMap).length;
  const cursor = getCursor(questionMode);

  el.poolInfo.textContent =
    `問題No.${range.startNo}〜${range.endNo} / ` +
    `問題モード：${questionModeLabel(questionMode)} / ` +
    `この範囲の出題可能数：${available.length}件 / ` +
    `続きからの次回開始位置：${available.length ? Math.min(cursor + 1, available.length) : 0}番目 / ` +
    `自動ニガテ：${autoWeakItems}件（累計ミス ${autoWeakTotal}回） / ` +
    `手動ニガテ：${manualWeakItems}件`;
}

  function createInfoValueHtml(text, masked, kind, itemId) {
    if (masked) {
      return `<div class="compactValue masked" data-reveal-kind="${kind}" data-item-id="${itemId}">（タップで表示）</div>`;
    }
    return `<div class="compactValue">${escapeHtml(text)}</div>`;
  }

  function createListItemHtml(item, autoWeakCount) {
    const meaningMasked = isMeaningMasked(item.id);
    const synonymMasked = isSynonymMasked(item.id);
    const manualWeak = isManualWeak(item.id);

    const badges = [];
    if (manualWeak) {
      badges.push(`<span class="badge badgeWeak">手動苦手</span>`);
    }
    if (autoWeakCount > 0) {
      badges.push(`<span class="badge badgeAuto">自動ミス ${autoWeakCount}回</span>`);
    }

    return `
      <div class="compactItem" data-item-id="${item.id}">
        <div class="compactHead">
          <div class="compactNo">No.${item.displayNo}</div>
          <div class="compactExpression">${escapeHtml(item.expression)}</div>
        </div>

        ${badges.length ? `<div class="listBadgeRow">${badges.join("")}</div>` : ""}

        <div class="compactMain">
          <div class="compactField">
            <div class="compactLabel">意味</div>
            ${createInfoValueHtml(item.ja, meaningMasked, "meaning", item.id)}
          </div>

          <div class="compactField">
            <div class="compactLabel">同義表現</div>
            ${createInfoValueHtml(formatSynonyms(item), synonymMasked, "synonym", item.id)}
          </div>
        </div>

        <div class="compactBtnRow">
          <button type="button" data-action="toggle-detail" data-item-id="${item.id}">詳しく見る</button>
          <button type="button" data-action="toggle-meaning" data-item-id="${item.id}">
            ${meaningMasked ? "意味を表示" : "意味を隠す"}
          </button>
          <button type="button" data-action="toggle-synonym" data-item-id="${item.id}">
            ${synonymMasked ? "同義表現を表示" : "同義表現を隠す"}
          </button>
          <button type="button" data-action="toggle-manual-weak" data-item-id="${item.id}" class="${manualWeak ? "weakBtnActive" : ""}">
            ${manualWeak ? "苦手解除" : "苦手に追加"}
          </button>
          <button type="button" data-action="go-paraphrase" data-item-id="${item.id}">
            言い換え問題へ
          </button>
        </div>

        <div class="compactDetail hidden" data-detail-for="${item.id}">
          <div class="compactField">
            <div class="compactLabel">対義表現</div>
            <div class="compactValue">${escapeHtml(formatAntonyms(item))}</div>
          </div>
          <div class="compactField">
            <div class="compactLabel">対応番号</div>
            <div class="compactValue">${escapeHtml(formatNoteIds(item))}</div>
          </div>
          <div class="compactField">
            <div class="compactLabel">メモ</div>
            <div class="compactValue">${escapeHtml(getNoteText(item) || "なし")}</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderProblemList() {
    el.problemList.innerHTML = "";

    if (!DATA.length) {
      el.problemListEmpty.classList.remove("hidden");
      return;
    }

    el.problemListEmpty.classList.add("hidden");

    const weakMap = getWeakMap(el.questionMode.value);

 filterByNoRange(DATA).forEach(function (item) {
  const div = document.createElement("div");
  div.innerHTML = createListItemHtml(item, weakMap[item.id] || 0);
  el.problemList.appendChild(div.firstElementChild);
});

    updateBulkMaskButtonLabels();
  }

  function renderWeakList() {
    el.weakList.innerHTML = "";

    const questionMode = el.questionMode.value;
    const weakMap = getWeakMap(questionMode);
    const manualWeakMap = getManualWeakMap();

    const list = getAvailableDataForMode(questionMode)
      .map(function (item, index) {
        return {
          ...item,
          _index: index,
          autoWeakCount: weakMap[item.id] || 0,
          manualWeak: !!manualWeakMap[item.id]
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

    if (!list.length) {
      el.weakListEmpty.classList.remove("hidden");
      updateBulkMaskButtonLabels();
      return;
    }

    el.weakListEmpty.classList.add("hidden");

    list.forEach(function (item) {
      const div = document.createElement("div");
      div.innerHTML = createListItemHtml(item, item.autoWeakCount);
      el.weakList.appendChild(div.firstElementChild);
    });

    updateBulkMaskButtonLabels();
  }

  function refreshVisibleLists() {
    if (!el.problemListBox.classList.contains("hidden")) {
      renderProblemList();
    }
    if (!el.weakListBox.classList.contains("hidden")) {
      renderWeakList();
    }
    updateBulkMaskButtonLabels();
  }

function clearAnswerCard() {
  el.feedbackBox.classList.add("hidden");
  el.feedbackBox.classList.remove("ok", "ng");
  el.feedbackQuick.innerHTML = "";

  if (el.originSearchBtn) {
    el.originSearchBtn.disabled = true;
  }

  el.nextBtn.disabled = true;
  el.nextBtnBottom.disabled = true;
  el.nextBtn.textContent = "次へ";
  el.nextBtnBottom.textContent = "次へ";
  el.choicesBox.classList.remove("hidden");
}

  function openParaphraseForIdiom(itemId) {
  const item = getItemById(itemId);
  if (!item) return;

  const noteIds = getNoteIdList(item)
    .map(function (v) { return String(v || "").trim().toUpperCase(); })
    .filter(Boolean);

  if (!noteIds.length) {
    alert("このイディオムに対応する大問11番号がありません。");
    return;
  }

  if (noteIds.length === 1) {
    window.location.href = `paraphrase_quiz.html?noteId=${encodeURIComponent(noteIds[0])}`;
    return;
  }

  window.location.href = `paraphrase_quiz.html?noteIds=${encodeURIComponent(noteIds.join(","))}`;
}

  function updateJumpParaphraseButton(question) {
    if (!el.jumpParaphraseBtn) return;
    el.jumpParaphraseBtn.disabled = !question || getNoteIdList(question).length === 0;
  }

  function renderQuestion() {
    const question = state.sessionItems[state.currentIndex];
    if (!question) {
      finishQuiz();
      return;
    }

    state.answered = false;

    el.stats.textContent =
      `第${state.currentIndex + 1}問 / ${state.sessionItems.length}問 ・ 正解 ${state.score}問 ・ 出題順：${modeLabel(state.mode)}`;

        el.questionNoLine.textContent = `問題番号 No.${question.displayNo}`;

    if (state.questionMode === "expression_from_meaning") {
      el.expressionText.textContent = question.ja;
    } else {
      el.expressionText.textContent = question.expression;
    }

    el.questionModeBadge.textContent = `問題モード：${questionModeLabel(state.questionMode)}`;
    el.choicesBox.innerHTML = "";
    clearAnswerCard();
    updateJumpParaphraseButton(question);

    const choices = getChoicesForQuestion(question, state.questionMode);

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
        answerQuestion(choiceText, btn);
      });
      el.choicesBox.appendChild(btn);
    });

    if (el.autoRead.checked && state.questionMode !== "expression_from_meaning") {
  speak(question.expression);
}
  }

   function buildQuickAnswerHtml(question, selectedText, correctText, isCorrect) {
  const synonymText = formatSynonyms(question);
  const example = getIdiomExample(question);
  const wrongHint = isCorrect ? "" : getWrongAnswerExpressionHint(question, selectedText);

  const exampleHtml = example.exampleEn
    ? `
      <div class="answerField">
        <div class="answerLabel">例文</div>
        <div class="answerValue">
          <div>${escapeHtml(example.exampleEn)}</div>
          ${example.exampleJa ? `<div class="muted" style="margin-top:4px;">${escapeHtml(example.exampleJa)}</div>` : ""}
        </div>
      </div>
    `
    : "";

  const usageHtml = example.usage
    ? `
      <div class="answerField">
        <div class="answerLabel">使い方メモ</div>
        <div class="answerValue">${escapeHtml(example.usage)}</div>
      </div>
    `
    : "";

  const wrongHintHtml = (!isCorrect && wrongHint)
    ? `
      <div class="answerField">
        <div class="answerLabel">あなたの解答に対応する英語表現</div>
        <div class="answerValue">${escapeHtml(wrongHint)}</div>
      </div>
    `
    : "";

  if (state.questionMode === "expression_from_meaning") {
    return `
      <div class="feedbackStatus ${isCorrect ? "ok" : "ng"}">${isCorrect ? "⭕️ 正解！" : "❌ 不正解"}</div>

      <div class="answerGrid">
        <div class="answerField">
          <div class="answerLabel">今回の意味</div>
          <div class="answerValue">${escapeHtml(question.ja || "なし")}</div>
        </div>

        <div class="answerField">
          <div class="answerLabel">正解の英語表現</div>
          <div class="answerValue" style="font-weight:800;">${escapeHtml(correctText)}</div>
        </div>

        ${
          isCorrect
            ? ""
            : `
              <div class="answerField">
                <div class="answerLabel">あなたの解答</div>
                <div class="answerValue">${escapeHtml(selectedText)}</div>
              </div>
            `
        }

        ${wrongHintHtml}
        ${exampleHtml}
        ${usageHtml}
      </div>
    `;
  }

  if (state.questionMode === "synonym") {
    return `
      <div class="feedbackStatus ${isCorrect ? "ok" : "ng"}">${isCorrect ? "⭕️ 正解！" : "❌ 不正解"}</div>

      <div class="answerGrid">
        <div class="answerField">
          <div class="answerLabel">今回の表現</div>
          <div class="answerValue" style="font-weight:800;">${escapeHtml(question.expression || "なし")}</div>
        </div>

        <div class="answerField">
          <div class="answerLabel">意味</div>
          <div class="answerValue">${escapeHtml(question.ja || "なし")}</div>
        </div>

        <div class="answerField">
          <div class="answerLabel">正解の同義表現</div>
          <div class="answerValue">${escapeHtml(correctText)}</div>
        </div>

        ${
          isCorrect
            ? ""
            : `
              <div class="answerField">
                <div class="answerLabel">あなたの解答</div>
                <div class="answerValue">${escapeHtml(selectedText)}</div>
              </div>
            `
        }

        ${wrongHintHtml}
        ${exampleHtml}
        ${usageHtml}
      </div>
    `;
  }

  return `
    <div class="feedbackStatus ${isCorrect ? "ok" : "ng"}">${isCorrect ? "⭕️ 正解！" : "❌ 不正解"}</div>

    <div class="answerGrid">
      <div class="answerField">
        <div class="answerLabel">今回の表現</div>
        <div class="answerValue" style="font-weight:800;">${escapeHtml(question.expression || "なし")}</div>
      </div>

      <div class="answerField">
        <div class="answerLabel">正解の意味</div>
        <div class="answerValue">${escapeHtml(correctText)}</div>
      </div>

      ${
        isCorrect
          ? ""
          : `
            <div class="answerField">
              <div class="answerLabel">あなたの解答</div>
              <div class="answerValue">${escapeHtml(selectedText)}</div>
            </div>
          `
      }

      ${wrongHintHtml}
      ${exampleHtml}
      ${usageHtml}
    </div>
  `;
}



  function answerQuestion(selectedText, clickedButton) {
    if (state.answered) return;

    const question = state.sessionItems[state.currentIndex];
    if (!question) return;

    state.answered = true;

    const correctText = getCorrectAnswerText(question, state.questionMode);
    const isCorrect = selectedText === correctText;

    if (isCorrect) {
      state.score += 1;
      awardIdiomGoimonCorrect();
    } else {
      incrementWeak(state.questionMode, question.id);
    }

    const buttons = Array.from(el.choicesBox.querySelectorAll("button"));
    buttons.forEach(function (btn) {
      btn.disabled = true;

      if (btn.dataset.choiceText === correctText) {
        btn.classList.add("correct");
      }

      if (!isCorrect && btn === clickedButton) {
        btn.classList.add("wrong");
      }
    });

    el.choicesBox.classList.add("hidden");
    el.feedbackBox.classList.remove("hidden");
    el.feedbackBox.classList.remove("ok", "ng");
    el.feedbackBox.classList.add(isCorrect ? "ok" : "ng");

    el.feedbackQuick.innerHTML = buildQuickAnswerHtml(question, selectedText, correctText, isCorrect);

if (el.originSearchBtn) {
  el.originSearchBtn.disabled = false;
}

    state.results.push({
      id: question.id,
      displayNo: question.displayNo,
      expression: question.expression,
      ja: question.ja,
      correct: isCorrect,
      selectedText: selectedText,
      correctText: correctText,
      synonymText: formatSynonyms(question),
      antonymText: formatAntonyms(question),
      noteIdsText: formatNoteIds(question),
      noteText: getNoteText(question) || "なし",
      questionMode: state.questionMode
    });

    if (state.mode === "order" || state.mode === "order_continue") {
      const total = getAvailableDataForMode(state.questionMode).length;
      if (total > 0) {
        const nextCursor = (question._index + 1) % total;
        setCursor(state.questionMode, nextCursor);
      }
    }

       const isLast = state.currentIndex === state.sessionItems.length - 1;
    el.nextBtn.textContent = isLast ? "結果を見る" : "次へ";
    el.nextBtnBottom.textContent = isLast ? "結果を見る" : "次へ";
    el.nextBtn.disabled = false;
    el.nextBtnBottom.disabled = false;

    if (el.autoRead.checked && state.questionMode === "expression_from_meaning") {
      setTimeout(function () {
        speak(correctText);
      }, 150);
    }

    updatePoolInfo();
  }

  function createSummaryCardHtml(item) {
    const manualWeak = isManualWeak(item.id);

    return `
      <div class="summaryCard">
        <div class="summaryHead">
          <div class="summaryTitleWrap">
            <div class="summaryNo">No.${item.displayNo}</div>
            <div class="summaryTitle">${escapeHtml(item.expression)}</div>
          </div>
          <div>
            <span class="badge ${item.correct ? "badgeOk" : "badgeNg"}">${item.correct ? "○ 正解" : "× 不正解"}</span>
          </div>
        </div>

        <div class="summaryMiniGrid">
          <div class="summaryMiniField">
            <div class="summaryMiniLabel">意味</div>
            <div class="summaryMiniValue">${escapeHtml(item.ja || "なし")}</div>
          </div>

          <div class="summaryMiniField">
            <div class="summaryMiniLabel">同義表現</div>
            <div class="summaryMiniValue">${escapeHtml(item.synonymText)}</div>
          </div>

          ${item.correct ? "" : `
            <div class="summaryMiniField">
              <div class="summaryMiniLabel">あなたの解答</div>
              <div class="summaryMiniValue">${escapeHtml(item.selectedText)}</div>
            </div>

            <div class="summaryMiniField">
              <div class="summaryMiniLabel">正解</div>
              <div class="summaryMiniValue">${escapeHtml(item.correctText)}</div>
            </div>
          `}
        </div>

        <div class="summaryBtnRow">
          <button type="button" data-action="toggle-summary-weak" data-item-id="${item.id}" class="${manualWeak ? "weakBtnActive" : ""}">
            ${manualWeak ? "苦手解除" : "苦手に追加"}
          </button>
          <button type="button" data-action="go-paraphrase" data-item-id="${item.id}">
            言い換え問題へ
          </button>
        </div>

        <details class="summaryDetails">
          <summary>詳しく見る</summary>
          <div class="summaryDetailsInner">
            <div class="summaryMiniField">
              <div class="summaryMiniLabel">対義表現</div>
              <div class="summaryMiniValue">${escapeHtml(item.antonymText)}</div>
            </div>

            <div class="summaryMiniField">
              <div class="summaryMiniLabel">対応番号</div>
              <div class="summaryMiniValue">${escapeHtml(item.noteIdsText)}</div>
            </div>

            <div class="summaryMiniField">
              <div class="summaryMiniLabel">メモ</div>
              <div class="summaryMiniValue">${escapeHtml(item.noteText)}</div>
            </div>
          </div>
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

    el.summaryLine.textContent =
      `問題モード：${questionModeLabel(state.questionMode)} / 出題順：${modeLabel(state.mode)} / 正答率：${rate}%`;

    el.resultScore.textContent = `${state.score} / ${total} 問正解`;

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

  function startQuiz(useLastSession) {
    const questionMode = el.questionMode.value;
    const available = getAvailableDataForMode(questionMode);

    if (available.length < 4) {
      alert("4択問題を作るには、そのモードで最低4件のデータが必要です。");
      return;
    }

    saveCurrentSettings();

    const count = countToNumber(el.questionCount.value, available.length);
    const mode = el.quizMode.value;

    state.questionMode = questionMode;
    state.mode = mode;
    state.currentIndex = 0;
    state.score = 0;
    state.answered = false;
    state.results = [];

    if (useLastSession && state.lastSessionItems.length) {
      state.sessionItems = state.lastSessionItems.map(function (item) {
        return { ...item };
      });
    } else {
      state.sessionItems = getSessionItems(questionMode, mode, count);
      state.lastSessionItems = state.sessionItems.map(function (item) {
        return { ...item };
      });
    }

    showBox("play");
    renderQuestion();
  }

  function startTargetedIdiomQuiz(itemId, questionMode) {
    const item = getItemById(itemId);
    if (!item) return;

    el.questionMode.value = questionMode;
    state.questionMode = questionMode;
    state.mode = "linked";
    state.currentIndex = 0;
    state.score = 0;
    state.answered = false;
    state.results = [];

    const pool = getAvailableDataForMode(questionMode, { applyRange: false });
    const originalIndex = pool.findIndex(function (candidate) {
      return candidate.id === item.id;
    });

    if (originalIndex === -1) {
      alert("この問題モードでは解けない表現です。");
      return;
    }

    state.sessionItems = [{
      ...item,
      _index: originalIndex
    }];
    state.lastSessionItems = state.sessionItems.map(function (entry) {
      return { ...entry };
    });

    showBox("play");
    renderQuestion();
  }

  function goNext() {
    if (!state.answered) return;
    state.currentIndex += 1;
    renderQuestion();
  }

  function restoreSettingsToForm() {
  const settings = getSavedSettings();
  const maxNo = getMaxDisplayNo();

  el.questionMode.value = settings.questionMode;
  el.questionCount.value = settings.questionCount;
  el.quizMode.value = settings.quizMode;
  el.autoRead.checked = settings.autoRead;

  if (el.rangeStart) {
    el.rangeStart.value = settings.rangeStart || "1";
  }

  if (el.rangeEnd) {
    el.rangeEnd.value = settings.rangeEnd || String(maxNo);
  }

  const range = getNoRange();

  if (el.rangeStart) el.rangeStart.value = String(range.startNo);
  if (el.rangeEnd) el.rangeEnd.value = String(range.endNo);
}

  function toggleCompactDetail(container, itemId, btn) {
    if (!container || !itemId || !btn) return;
    const detail = container.querySelector(`[data-detail-for="${itemId}"]`);
    if (!detail) return;

    const willOpen = detail.classList.contains("hidden");
    detail.classList.toggle("hidden", !willOpen);
    btn.textContent = willOpen ? "詳細を閉じる" : "詳しく見る";
  }

  function handleListAreaClick(event) {
    const actionBtn = event.target.closest("[data-action]");
    if (actionBtn) {
      const action = actionBtn.getAttribute("data-action");
      const itemId = actionBtn.getAttribute("data-item-id");
      if (!itemId) return;

      if (action === "toggle-detail") {
        const container = actionBtn.closest(".compactItem");
        toggleCompactDetail(container, itemId, actionBtn);
        return;
      }

      if (action === "toggle-meaning") {
        setMeaningMasked(itemId, !isMeaningMasked(itemId));
        refreshVisibleLists();
        return;
      }

      if (action === "toggle-synonym") {
        setSynonymMasked(itemId, !isSynonymMasked(itemId));
        refreshVisibleLists();
        return;
      }

      if (action === "toggle-manual-weak") {
        toggleManualWeak(itemId);
        updatePoolInfo();
        renderWeakList();
        renderProblemList();
        return;
      }

      if (action === "go-paraphrase") {
        openParaphraseForIdiom(itemId);
        return;
      }
    }

    const revealTarget = event.target.closest("[data-reveal-kind]");
    if (revealTarget) {
      const kind = revealTarget.getAttribute("data-reveal-kind");
      const itemId = revealTarget.getAttribute("data-item-id");
      if (!itemId) return;

      if (kind === "meaning") {
        setMeaningMasked(itemId, false);
        refreshVisibleLists();
        return;
      }

      if (kind === "synonym") {
        setSynonymMasked(itemId, false);
        refreshVisibleLists();
      }
    }
  }

  function handleSummaryAreaClick(event) {
    const actionBtn = event.target.closest("[data-action]");
    if (!actionBtn) return;

    const action = actionBtn.getAttribute("data-action");
    const itemId = actionBtn.getAttribute("data-item-id");
    if (!itemId) return;

    if (action === "toggle-summary-weak") {
      toggleManualWeak(itemId);
      updatePoolInfo();
      renderProblemList();
      renderWeakList();
      renderSummary();
      return;
    }

    if (action === "go-paraphrase") {
      openParaphraseForIdiom(itemId);
    }
  }

  function clearFocusQuery() {
  state.focusIdFromQuery = "";
  state.focusNoteIdsFromQuery = [];

  const url = new URL(window.location.href);
  url.searchParams.delete("focusId");
  url.searchParams.delete("noteId");
  url.searchParams.delete("noteIds");
  window.history.replaceState({}, "", url.toString());

  refreshFocusIdiomBox();
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

      if (key === "v" || key === "V") {
        event.preventDefault();
        if (!el.readBtn.disabled) el.readBtn.click();
      }
      return;
    }

    if (key === "Enter" || key === " " || key === "Spacebar" || key === "ArrowRight") {
      event.preventDefault();
      if (!el.nextBtn.disabled) goNext();
      return;
    }

    if (key === "v" || key === "V") {
      event.preventDefault();
      if (!el.readBtn.disabled) el.readBtn.click();
    }
  }

  const IDIOM_GOIMON_DELTA = { chie: 0.5, kotoba: 0.5 };

  function renderIdiomGoimonMini() {
    if (!window.GoimonUI) return;

    const g = window.GoimonUI.ensureCurrent();

    const stageEl = document.getElementById("idiomGoimonStage");
    const imageEl = document.getElementById("idiomGoimonImage");
    const nameEl = document.getElementById("idiomGoimonName");
    const metaEl = document.getElementById("idiomGoimonMeta");
    const descEl = document.getElementById("idiomGoimonDesc");
    const guideEl = document.getElementById("idiomPointGuide");

    if (!stageEl || !imageEl || !nameEl || !metaEl || !descEl || !guideEl) return;

    stageEl.textContent = window.GoimonUI.getStageLabel(g.stage);
    imageEl.src = g.imageKey || window.GoimonUI.getImageFor(g.type, g.stage);
    imageEl.alt = window.GoimonUI.getGoimonPrimaryName(g);
    nameEl.textContent = window.GoimonUI.getGoimonPrimaryName(g);
    metaEl.textContent = `Lv ${g.level} / ${window.GoimonUI.formatPoint(g.totalPoints)} pt`;
    descEl.textContent = window.GoimonUI.getDisplayDescription(g);
    guideEl.textContent = "正解：ちえ +0.5 ＋ ことば +0.5";

    window.GoimonUI.renderEvolutionNoticeButton("evolutionNoticeBtn");
  }

  function initIdiomGoimonMini() {
    if (!window.GoimonUI) return;

    if (el.toggleGoimon && el.goimonCard && el.toggleGoimon.dataset.bound !== "1") {
      el.toggleGoimon.dataset.bound = "1";
      el.toggleGoimon.addEventListener("click", function () {
        const willOpen = el.goimonCard.classList.contains("hidden");
        el.goimonCard.classList.toggle("hidden");
        el.toggleGoimon.textContent = willOpen ? "ゴイモンを閉じる" : "ゴイモンの様子を見る";
      });
    }

    window.GoimonUI.bindEvolutionNoticeButton("evolutionNoticeBtn", {
      onComplete: function () {
        renderIdiomGoimonMini();
      }
    });

    renderIdiomGoimonMini();
  }

  function awardIdiomGoimonCorrect() {
    if (!window.GoimonUI) return;
    window.GoimonUI.addPoints(IDIOM_GOIMON_DELTA, "idiom_quiz");
    renderIdiomGoimonMini();
  }

  function init() {
    if (!Array.isArray(DATA) || DATA.length === 0) {
      alert("idiom_data_1kyu.js のデータが読み込めていません。");
      return;
    }

    restoreSettingsToForm();
    updateLevelBadge();
    updatePoolInfo();
    renderProblemList();
    renderWeakList();
    updateBulkMaskButtonLabels();
    showBox("setup");

    if (!supportsSpeech()) {
      el.readBtn.disabled = true;
      el.readBtn.textContent = "読み上げ非対応";
    }

    if (el.jumpParaphraseBtn) {
      el.jumpParaphraseBtn.disabled = true;
    }

    el.startBtn.addEventListener("click", function () {
      startQuiz(false);
    });

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

    if (el.problemMaskMeaningBtn) {
      el.problemMaskMeaningBtn.addEventListener("click", function () {
        toggleBulkMeaning(getProblemListTargetIds());
      });
    }

    if (el.problemMaskSynonymBtn) {
      el.problemMaskSynonymBtn.addEventListener("click", function () {
        toggleBulkSynonym(getProblemListTargetIds());
      });
    }

    if (el.weakMaskMeaningBtn) {
      el.weakMaskMeaningBtn.addEventListener("click", function () {
        toggleBulkMeaning(getWeakListTargetIds());
      });
    }

    if (el.weakMaskSynonymBtn) {
      el.weakMaskSynonymBtn.addEventListener("click", function () {
        toggleBulkSynonym(getWeakListTargetIds());
      });
    }

    el.problemList.addEventListener("click", handleListAreaClick);
    el.weakList.addEventListener("click", handleListAreaClick);
    el.wrongList.addEventListener("click", handleSummaryAreaClick);
    el.askedList.addEventListener("click", handleSummaryAreaClick);

    el.readBtn.addEventListener("click", function () {
  const question = state.sessionItems[state.currentIndex];
  if (!question) return;

  if (state.questionMode === "expression_from_meaning" && !state.answered) {
    return;
  }

  if (state.questionMode === "expression_from_meaning") {
    speak(getCorrectAnswerText(question, state.questionMode));
    return;
  }

  speak(question.expression);
});

if (el.originSearchBtn) {
  el.originSearchBtn.addEventListener("click", function () {
    const question = state.sessionItems[state.currentIndex];
    if (!question) return;

    const expression = String(question.expression || "").trim();
    if (!expression) return;

    openGoogleSearch(`${expression} 語源 由来 意味`);
  });
}

    if (el.jumpParaphraseBtn) {
      el.jumpParaphraseBtn.addEventListener("click", function () {
        const question = state.sessionItems[state.currentIndex];
        if (!question) return;
        openParaphraseForIdiom(question.id);
      });
    }

    if (el.focusMeaningBtn) {
      el.focusMeaningBtn.addEventListener("click", function () {
        startTargetedIdiomQuiz(state.focusIdFromQuery, "meaning");
      });
    }

    if (el.focusSynonymBtn) {
      el.focusSynonymBtn.addEventListener("click", function () {
        startTargetedIdiomQuiz(state.focusIdFromQuery, "synonym");
      });
    }

    if (el.focusIdiomClearBtn) {
      el.focusIdiomClearBtn.addEventListener("click", clearFocusQuery);
    }

  

    el.nextBtn.addEventListener("click", goNext);
    el.nextBtnBottom.addEventListener("click", goNext);

    el.backBtn.addEventListener("click", function () {
      showBox("setup");
      updatePoolInfo();
      renderWeakList();
    });

    el.retrySetBtnTop.addEventListener("click", function () {
      startQuiz(true);
    });

    el.continueBtn.addEventListener("click", function () {
      startQuiz(false);
    });

    el.summaryBackBtn.addEventListener("click", function () {
      updatePoolInfo();
      renderWeakList();
      showBox("setup");
    });

    

    el.questionMode.addEventListener("change", function () {
      updatePoolInfo();
      renderProblemList();
      renderWeakList();
      updateBulkMaskButtonLabels();
      saveCurrentSettings();
    });

    el.questionCount.addEventListener("change", function () {
      updatePoolInfo();
      saveCurrentSettings();
    });

    el.quizMode.addEventListener("change", function () {
      updatePoolInfo();
      saveCurrentSettings();
    });

    el.autoRead.addEventListener("change", function () {
      saveCurrentSettings();
    });

    if (el.rangeStart) {
  el.rangeStart.addEventListener("input", function () {
    updatePoolInfo();
    saveCurrentSettings();
  });
}

if (el.rangeEnd) {
  el.rangeEnd.addEventListener("input", function () {
    updatePoolInfo();
    saveCurrentSettings();
  });
}

    document.addEventListener("keydown", handleKeyboardShortcut);
  }

  init();
  initIdiomGoimonMini();
})();
