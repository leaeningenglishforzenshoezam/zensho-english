(function () {
  "use strict";

  const DATA_LEVEL = 1;
  const UI_LEVEL = window.ACTIVE_LEVEL || "1";
  const URL_PARAMS = new URLSearchParams(window.location.search);

  const STORAGE_KEYS = {
    weakMeaning: `zensho_idiom_quiz_weak_meaning_v1_lv${DATA_LEVEL}`,
    weakSynonym: `zensho_idiom_quiz_weak_synonym_v1_lv${DATA_LEVEL}`,
    manualWeak: `zensho_idiom_quiz_manual_weak_v1_lv${DATA_LEVEL}`,
    cursorMeaning: `zensho_idiom_quiz_cursor_meaning_v1_lv${DATA_LEVEL}`,
    cursorSynonym: `zensho_idiom_quiz_cursor_synonym_v1_lv${DATA_LEVEL}`,
    settings: `zensho_idiom_quiz_settings_v3_lv${DATA_LEVEL}`,
    listUi: `zensho_idiom_quiz_list_ui_v1_lv${DATA_LEVEL}`
  };

  const DEFAULT_SETTINGS = {
    questionMode: "meaning",
    questionCount: "10",
    quizMode: "order",
    autoRead: false
  };

  const DATA = Array.isArray(window.IDIOM_DATA_1KYU) ? window.IDIOM_DATA_1KYU.slice() : [];

  const el = {
    levelBadge: document.getElementById("levelBadge"),

    setupBox: document.getElementById("setupBox"),
    focusIdiomBox: document.getElementById("focusIdiomBox"),
    focusIdiomLine: document.getElementById("focusIdiomLine"),
    focusIdiomExpression: document.getElementById("focusIdiomExpression"),
    focusIdiomJa: document.getElementById("focusIdiomJa"),
    focusIdiomSynonym: document.getElementById("focusIdiomSynonym"),
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
    expressionText: document.getElementById("expressionText"),
    questionModeBadge: document.getElementById("questionModeBadge"),
    choicesBox: document.getElementById("choicesBox"),
    feedbackBox: document.getElementById("feedbackBox"),
    readBtn: document.getElementById("readBtn"),
    jumpParaphraseBtn: document.getElementById("jumpParaphraseBtn"),
    nextBtn: document.getElementById("nextBtn"),
    backBtn: document.getElementById("backBtn"),

    summaryLine: document.getElementById("summaryLine"),
    resultScore: document.getElementById("resultScore"),
    wrongList: document.getElementById("wrongList"),
    wrongEmpty: document.getElementById("wrongEmpty"),
    askedList: document.getElementById("askedList"),

    retrySetBtnTop: document.getElementById("retrySetBtnTop"),
    continueBtn: document.getElementById("continueBtn"),
    summaryBackBtn: document.getElementById("summaryBackBtn")
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
    focusIdFromQuery: URL_PARAMS.get("focusId") || ""
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
      const utterance = new SpeechSynthesisUtterance(text);
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
    return questionMode;
  }

  function getItemById(itemId) {
    return DATA.find(function (item) {
      return item.id === itemId;
    }) || null;
  }

  function getWeakKey(questionMode) {
    return questionMode === "synonym" ? STORAGE_KEYS.weakSynonym : STORAGE_KEYS.weakMeaning;
  }

  function getCursorKey(questionMode) {
    return questionMode === "synonym" ? STORAGE_KEYS.cursorSynonym : STORAGE_KEYS.cursorMeaning;
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

  function getCursor(questionMode) {
    const raw = Number(localStorage.getItem(getCursorKey(questionMode)) || "0");
    if (!Number.isFinite(raw) || raw < 0) return 0;
    return Math.floor(raw);
  }

  function setCursor(questionMode, value) {
    localStorage.setItem(getCursorKey(questionMode), String(value));
  }

  function getSavedSettings() {
    const saved = readJSON(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
    return {
      questionMode: saved.questionMode || DEFAULT_SETTINGS.questionMode,
      questionCount: saved.questionCount || DEFAULT_SETTINGS.questionCount,
      quizMode: saved.quizMode || DEFAULT_SETTINGS.quizMode,
      autoRead: !!saved.autoRead
    };
  }

  function saveCurrentSettings() {
    const settings = {
      questionMode: el.questionMode.value,
      questionCount: el.questionCount.value,
      quizMode: el.quizMode.value,
      autoRead: el.autoRead.checked
    };
    writeJSON(STORAGE_KEYS.settings, settings);
  }

  function countToNumber(value) {
    if (value === "all") return DATA.length;
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) return 10;
    return Math.min(num, DATA.length);
  }

  function hasUsableSynonym(item) {
    return Array.isArray(item.paraphraseTo) && item.paraphraseTo.length > 0 && item.paraphraseTo[0];
  }

  function getAvailableDataForMode(questionMode) {
    if (questionMode === "synonym") {
      return DATA.filter(hasUsableSynonym);
    }
    return DATA.slice();
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
      const cursor = getCursor(questionMode) % base.length;
      const ordered = base.slice(cursor).concat(base.slice(0, cursor));
      return ordered.slice(0, count);
    }

    return base.slice(0, count);
  }

  function getCorrectAnswerText(question, questionMode) {
    if (questionMode === "synonym") {
      return (question.paraphraseTo && question.paraphraseTo[0]) ? question.paraphraseTo[0] : "";
    }
    return question.ja;
  }

  function getWrongPool(question, questionMode) {
    if (questionMode === "synonym") {
      return getAvailableDataForMode(questionMode)
        .filter(function (item) {
          return item.id !== question.id;
        })
        .map(function (item) {
          return (item.paraphraseTo && item.paraphraseTo[0]) ? item.paraphraseTo[0] : "";
        })
        .filter(Boolean);
    }

    return DATA
      .filter(function (item) {
        return item.id !== question.id;
      })
      .map(function (item) {
        return item.ja;
      })
      .filter(Boolean);
  }

  function getChoicesForQuestion(question, questionMode) {
    const correct = getCorrectAnswerText(question, questionMode);
    const wrongPool = Array.from(new Set(getWrongPool(question, questionMode).filter(function (text) {
      return text !== correct;
    })));
    const selectedWrong = shuffle(wrongPool).slice(0, 3);
    return shuffle([correct, ...selectedWrong]);
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

    if (!state.focusIdFromQuery || el.setupBox.classList.contains("hidden")) {
      el.focusIdiomBox.classList.add("hidden");
      return;
    }

    const item = getItemById(state.focusIdFromQuery);
    if (!item) {
      el.focusIdiomBox.classList.add("hidden");
      return;
    }

    el.focusIdiomLine.textContent = "大問11風ページから関連表現として開きました。";
    el.focusIdiomExpression.textContent = item.expression;
    el.focusIdiomJa.textContent = `意味：${item.ja}`;
    el.focusIdiomSynonym.textContent = `同義表現：${getSynonymText(item)}`;
    el.focusIdiomBox.classList.remove("hidden");
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

    const autoWeakItems = Object.keys(weakMap).filter(function (id) {
      return (weakMap[id] || 0) > 0;
    }).length;
    const autoWeakTotal = Object.values(weakMap).reduce(function (sum, value) {
      return sum + Number(value || 0);
    }, 0);
    const manualWeakItems = Object.keys(manualWeakMap).length;
    const cursor = getCursor(questionMode);

    el.poolInfo.textContent =
      `問題モード：${questionModeLabel(questionMode)} / 収録数：${available.length}件 / 続きからの次回開始位置：${cursor + 1}番目 / 自動ニガテ：${autoWeakItems}件（累計ミス ${autoWeakTotal}回） / 手動ニガテ：${manualWeakItems}件`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getSynonymText(item) {
    if (!Array.isArray(item.paraphraseTo) || item.paraphraseTo.length === 0) return "なし";
    return item.paraphraseTo.join(" / ");
  }

  function createInfoValueHtml(text, masked, kind, itemId) {
    if (masked) {
      return `<div class="infoValue masked" data-reveal-kind="${kind}" data-item-id="${itemId}">（タップで表示）</div>`;
    }
    return `<div class="infoValue">${escapeHtml(text)}</div>`;
  }

  function createListItemHtml(item, autoWeakCount) {
    const meaningMasked = isMeaningMasked(item.id);
    const synonymMasked = isSynonymMasked(item.id);
    const manualWeak = isManualWeak(item.id);
    const synonymText = getSynonymText(item);

    const badges = [];
    if (manualWeak) {
      badges.push(`<span class="badge badgeWeak">手動苦手</span>`);
    }
    if (autoWeakCount > 0) {
      badges.push(`<span class="badge badgeAuto">自動ミス ${autoWeakCount}回</span>`);
    }

    return `
      <div class="listTitle">${escapeHtml(item.expression)}</div>
      ${badges.length ? `<div class="listBadgeRow">${badges.join("")}</div>` : ""}
      <div class="infoGrid">
        <div class="infoBlock">
          <div class="infoLabel">意味</div>
          ${createInfoValueHtml(item.ja, meaningMasked, "meaning", item.id)}
        </div>
        <div class="infoBlock">
          <div class="infoLabel">同義表現</div>
          ${createInfoValueHtml(synonymText, synonymMasked, "synonym", item.id)}
        </div>
      </div>
      <div class="listBtnRow">
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

    DATA.forEach(function (item) {
      const div = document.createElement("div");
      div.className = "listItem";
      div.innerHTML = createListItemHtml(item, weakMap[item.id] || 0);
      el.problemList.appendChild(div);
    });
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
      return;
    }

    el.weakListEmpty.classList.add("hidden");

    list.forEach(function (item) {
      const div = document.createElement("div");
      div.className = "listItem";
      div.innerHTML = createListItemHtml(item, item.autoWeakCount);
      el.weakList.appendChild(div);
    });
  }

  function refreshVisibleLists() {
    if (!el.problemListBox.classList.contains("hidden")) {
      renderProblemList();
    }
    if (!el.weakListBox.classList.contains("hidden")) {
      renderWeakList();
    }
  }

  function clearFeedback() {
    el.feedbackBox.className = "feedbackBox hidden";
    el.feedbackBox.innerHTML = "";
  }

  function openParaphraseForIdiom(itemId) {
    window.location.href = `paraphrase_quiz.html?sourceId=${encodeURIComponent(itemId)}`;
  }

  function updateJumpParaphraseButton(question) {
    if (!el.jumpParaphraseBtn) return;
    el.jumpParaphraseBtn.disabled = !question;
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

    el.expressionText.textContent = question.expression;
    el.questionModeBadge.textContent = `問題モード：${questionModeLabel(state.questionMode)}`;
    el.choicesBox.innerHTML = "";
    clearFeedback();
    el.nextBtn.disabled = true;
    updateJumpParaphraseButton(question);

    const choices = getChoicesForQuestion(question, state.questionMode);

    choices.forEach(function (choiceText) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choiceBtn";
      btn.textContent = choiceText;
      btn.addEventListener("click", function () {
        answerQuestion(choiceText, btn);
      });
      el.choicesBox.appendChild(btn);
    });

    if (el.autoRead.checked) {
      speak(question.expression);
    }
  }

  function buildFeedbackHtml(question, selectedText, correctText, isCorrect, questionMode) {
    const synonymText = getSynonymText(question);
    const statusText = isCorrect ? "正解" : "不正解";

    if (questionMode === "meaning") {
      return `
        <div class="feedbackStatus">${statusText}</div>
        ${!isCorrect ? `
          <div class="feedbackLabel">あなたの解答</div>
          <div class="feedbackText">${escapeHtml(selectedText)}</div>
        ` : ""}
        <div class="feedbackLabel">意味</div>
        <div class="feedbackText">${escapeHtml(question.ja)}</div>
        <div class="feedbackLabel">同義表現</div>
        <div class="feedbackText">${escapeHtml(synonymText)}</div>
      `;
    }

    return `
      <div class="feedbackStatus">${statusText}</div>
      ${!isCorrect ? `
        <div class="feedbackLabel">あなたの解答</div>
        <div class="feedbackText">${escapeHtml(selectedText)}</div>
      ` : ""}
      <div class="feedbackLabel">同義表現</div>
      <div class="feedbackText">${escapeHtml(synonymText)}</div>
      <div class="feedbackLabel">意味</div>
      <div class="feedbackText">${escapeHtml(question.ja)}</div>
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
}
    else {
      incrementWeak(state.questionMode, question.id);
    }

    const buttons = Array.from(el.choicesBox.querySelectorAll("button"));
    buttons.forEach(function (btn) {
      btn.disabled = true;

      if (btn.textContent === correctText) {
        btn.classList.add("correct");
      }

      if (!isCorrect && btn === clickedButton) {
        btn.classList.add("wrong");
      }
    });

    el.feedbackBox.classList.remove("hidden");
    el.feedbackBox.classList.add(isCorrect ? "ok" : "ng");
    el.feedbackBox.innerHTML = buildFeedbackHtml(question, selectedText, correctText, isCorrect, state.questionMode);

    state.results.push({
      id: question.id,
      expression: question.expression,
      ja: question.ja,
      correct: isCorrect,
      selectedText: selectedText,
      correctText: correctText,
      synonymText: getSynonymText(question),
      questionMode: state.questionMode
    });

    if (state.mode === "order" || state.mode === "order_continue") {
      const nextCursor = (question._index + 1) % getAvailableDataForMode(state.questionMode).length;
      setCursor(state.questionMode, nextCursor);
    }

    el.nextBtn.textContent = state.currentIndex === state.sessionItems.length - 1 ? "結果を見る" : "次へ";
    el.nextBtn.disabled = false;
    updatePoolInfo();
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
        const div = document.createElement("div");
        div.className = "summaryItem";
        div.innerHTML = `
          <div style="margin-bottom:6px;">
            <span class="badge badgeNg">× 不正解</span>
          </div>
          <div class="summaryLabel">表現</div>
          <div class="summaryText">${escapeHtml(item.expression)}</div>
          <div class="summaryLabel" style="margin-top:8px;">意味</div>
          <div class="summaryText">${escapeHtml(item.ja)}</div>
          <div class="summaryLabel" style="margin-top:8px;">同義表現</div>
          <div class="summaryText">${escapeHtml(item.synonymText)}</div>
          <div class="summaryLabel" style="margin-top:8px;">あなたの解答</div>
          <div class="summaryText">${escapeHtml(item.selectedText)}</div>
        `;
        el.wrongList.appendChild(div);
      });
    }

    state.results.forEach(function (item) {
      const div = document.createElement("div");
      div.className = "summaryItem";
      div.innerHTML = `
        <div style="margin-bottom:6px;">
          <span class="badge ${item.correct ? "badgeOk" : "badgeNg"}">${item.correct ? "○ 正解" : "× 不正解"}</span>
        </div>
        <div class="summaryLabel">表現</div>
        <div class="summaryText">${escapeHtml(item.expression)}</div>
        <div class="summaryLabel" style="margin-top:8px;">意味</div>
        <div class="summaryText">${escapeHtml(item.ja)}</div>
        <div class="summaryLabel" style="margin-top:8px;">同義表現</div>
        <div class="summaryText">${escapeHtml(item.synonymText)}</div>
      `;
      el.askedList.appendChild(div);
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

    const count = Math.min(countToNumber(el.questionCount.value), available.length);
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

    const pool = getAvailableDataForMode(questionMode);
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
    el.questionMode.value = settings.questionMode;
    el.questionCount.value = settings.questionCount;
    el.quizMode.value = settings.quizMode;
    el.autoRead.checked = settings.autoRead;
  }

  function handleListAreaClick(event) {
    const actionBtn = event.target.closest("[data-action]");
    if (actionBtn) {
      const action = actionBtn.getAttribute("data-action");
      const itemId = actionBtn.getAttribute("data-item-id");
      if (!itemId) return;

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

  function clearFocusQuery() {
    state.focusIdFromQuery = "";
    const url = new URL(window.location.href);
    url.searchParams.delete("focusId");
    window.history.replaceState({}, "", url.toString());
    refreshFocusIdiomBox();
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

    el.problemList.addEventListener("click", function (event) {
      handleListAreaClick(event);
    });

    el.weakList.addEventListener("click", function (event) {
      handleListAreaClick(event);
    });

    el.readBtn.addEventListener("click", function () {
      const question = state.sessionItems[state.currentIndex];
      if (!question) return;
      speak(question.expression);
    });

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
      renderWeakList();
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

  init();

  initIdiomGoimonMini();
})();
