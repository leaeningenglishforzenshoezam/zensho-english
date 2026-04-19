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
    questionCount: "10",
    quizMode: "order_continue",
    autoRead: true
  };

  const DATA = Array.isArray(window.PARAPHRASE_DATA_1KYU)
    ? window.PARAPHRASE_DATA_1KYU.slice()
    : [];

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
    relatedSourceId: URL_PARAMS.get("sourceId") || ""
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
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    } catch (err) {}
  }

  function countToNumber(value) {
    if (value === "all") return DATA.length;
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) return 10;
    return Math.min(num, DATA.length);
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

  function incrementIdiomWeakLinks(sourceId) {
    if (!sourceId) return;

    const meaningMap = readJSON(STORAGE_KEYS.idiomWeakMeaning, {}) || {};
    const synonymMap = readJSON(STORAGE_KEYS.idiomWeakSynonym, {}) || {};

    meaningMap[sourceId] = (meaningMap[sourceId] || 0) + 1;
    synonymMap[sourceId] = (synonymMap[sourceId] || 0) + 1;

    writeJSON(STORAGE_KEYS.idiomWeakMeaning, meaningMap);
    writeJSON(STORAGE_KEYS.idiomWeakSynonym, synonymMap);
  }

  function getCursor() {
    const raw = Number(localStorage.getItem(STORAGE_KEYS.cursor) || "0");
    if (!Number.isFinite(raw) || raw < 0) return 0;
    return Math.floor(raw);
  }

  function setCursor(value) {
    localStorage.setItem(STORAGE_KEYS.cursor, String(value));
  }

  function getSavedSettings() {
    const saved = readJSON(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
    return {
      questionCount: saved.questionCount || DEFAULT_SETTINGS.questionCount,
      quizMode: saved.quizMode || DEFAULT_SETTINGS.quizMode,
      autoRead: typeof saved.autoRead === "boolean" ? saved.autoRead : DEFAULT_SETTINGS.autoRead
    };
  }

  function saveCurrentSettings() {
    const settings = {
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

  function getRelatedItemsBySourceId(sourceId) {
    return DATA
      .map(function (item, index) {
        return { ...item, _index: index };
      })
      .filter(function (item) {
        return item.sourceId === sourceId;
      });
  }

  function refreshRelatedParaphraseBox() {
    if (!el.relatedParaphraseBox) return;

    if (!state.relatedSourceId || el.setupBox.classList.contains("hidden")) {
      el.relatedParaphraseBox.classList.add("hidden");
      return;
    }

    const relatedItems = getRelatedItemsBySourceId(state.relatedSourceId);

    if (!relatedItems.length) {
      el.relatedParaphraseLine.textContent = `関連する言い換え問題が見つかりませんでした。（sourceId: ${state.relatedSourceId}）`;
      el.startRelatedParaphraseBtn.disabled = true;
      el.relatedParaphraseToIdiomBtn.disabled = false;
      el.relatedParaphraseBox.classList.remove("hidden");
      return;
    }

    el.relatedParaphraseLine.textContent =
      `sourceId ${state.relatedSourceId} に対応する言い換え問題が ${relatedItems.length} 件あります。`;
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

    const autoWeakItems = Object.keys(weakMap).filter(function (id) {
      return (weakMap[id] || 0) > 0;
    }).length;
    const autoWeakTotal = Object.values(weakMap).reduce(function (sum, value) {
      return sum + Number(value || 0);
    }, 0);
    const manualWeakItems = Object.keys(manualMap).length;
    const cursor = getCursor();

    el.poolInfo.textContent =
      `収録数：${DATA.length}件 / 続きからの次回開始位置：${cursor + 1}番目 / 自動ニガテ：${autoWeakItems}件（累計ミス ${autoWeakTotal}回） / 手動ニガテ：${manualWeakItems}件`;
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
    const base = DATA.map(function (item, index) {
      return { ...item, _index: index };
    });

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

  function openIdiomForSource(sourceId) {
    window.location.href = `idiom_quiz.html?focusId=${encodeURIComponent(sourceId)}`;
  }

  function updateJumpIdiomButton(question) {
    if (!el.jumpIdiomBtn) return;
    el.jumpIdiomBtn.disabled = !(question && question.sourceId);
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

    choices.forEach(function (choiceText) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choiceBtn";
      btn.textContent = choiceText;

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

      <div class="feedbackLabel">日本語</div>
      <div class="feedbackText">${escapeHtml(question.ja || "")}</div>

      <div class="feedbackLabel">解説</div>
      <div class="feedbackText">${escapeHtml(question.note || "")}</div>
    `;
  }

  function checkAnswer() {
    if (state.answered) return;
    if (!state.selectedChoice) return;

    const question = state.sessionItems[state.currentIndex];
    const isCorrect = state.selectedChoice === question.answer;

    state.answered = true;
    if (isCorrect) {
      state.score += 1;
      awardParaphraseGoimonCorrect();
    } else {
      incrementParaphraseWeak(question.id);
      incrementIdiomWeakLinks(question.sourceId);
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
      sourceId: question.sourceId || "",
      a: question.a,
      b: question.b,
      answer: question.answer,
      ja: question.ja || "",
      note: question.note || "",
      selectedChoice: state.selectedChoice,
      correct: isCorrect
    });

    if (state.mode === "order" || state.mode === "order_continue") {
      const nextCursor = (question._index + 1) % DATA.length;
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

      const badges = [];
      if (manualWeak) badges.push(`<span class="badge badgeWeak">手動苦手</span>`);
      if (autoWeakCount > 0) badges.push(`<span class="badge badgeAuto">自動ミス ${autoWeakCount}回</span>`);

      const div = document.createElement("div");
      div.className = "listItem";
      div.innerHTML = `
        <div class="listTitle">第${index + 1}問</div>
        ${badges.length ? `<div>${badges.join("")}</div>` : ""}
        <div class="listMeta">上の文：${escapeHtml(item.a)}</div>
        <div class="listMeta">下の文：${escapeHtml(item.b)}</div>
        <div class="listMeta">正解：${escapeHtml(item.answer)}</div>
        <div class="listMeta">日本語：${escapeHtml(item.ja || "")}</div>
        <div class="listMeta">解説：${escapeHtml(item.note || "")}</div>
        <div class="listBtnRow">
          <button type="button" data-action="toggle-manual-weak" data-item-id="${item.id}" class="${manualWeak ? "weakBtnActive" : ""}">
            ${manualWeak ? "苦手解除" : "苦手に追加"}
          </button>
          <button type="button" data-action="go-idiom" data-source-id="${escapeHtml(item.sourceId || "")}">
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

      const div = document.createElement("div");
      div.className = "listItem";
      div.innerHTML = `
        <div class="listTitle">苦手 ${index + 1}</div>
        <div>${badges.join("")}</div>
        <div class="listMeta">上の文：${escapeHtml(item.a)}</div>
        <div class="listMeta">下の文：${escapeHtml(item.b)}</div>
        <div class="listMeta">正解：${escapeHtml(item.answer)}</div>
        <div class="listMeta">日本語：${escapeHtml(item.ja || "")}</div>
        <div class="listMeta">解説：${escapeHtml(item.note || "")}</div>
        <div class="listBtnRow">
          <button type="button" data-action="toggle-manual-weak" data-item-id="${item.id}" class="${item.manualWeak ? "weakBtnActive" : ""}">
            ${item.manualWeak ? "苦手解除" : "苦手に追加"}
          </button>
          <button type="button" data-action="go-idiom" data-source-id="${escapeHtml(item.sourceId || "")}">
            イディオム問題へ
          </button>
        </div>
      `;
      el.weakList.appendChild(div);
    });
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
        const completedB = item.b.replace("( )", item.answer);

        const div = document.createElement("div");
        div.className = "summaryItem";
        div.innerHTML = `
          <div class="summaryLabel">不正解だった問題</div>
          <div class="summaryText">${escapeHtml(item.a)}</div>
          <div class="summaryText" style="margin-top:8px;">${escapeHtml(completedB)}</div>
          <div class="summaryLabel" style="margin-top:8px;">あなたの解答</div>
          <div class="summaryText">${escapeHtml(item.selectedChoice)}</div>
          <div class="summaryLabel" style="margin-top:8px;">正解</div>
          <div class="summaryText">${escapeHtml(item.answer)}</div>
          <div class="summaryLabel" style="margin-top:8px;">日本語</div>
          <div class="summaryText">${escapeHtml(item.ja)}</div>
          <div class="summaryLabel" style="margin-top:8px;">解説</div>
          <div class="summaryText">${escapeHtml(item.note)}</div>
        `;
        el.wrongList.appendChild(div);
      });
    }

    state.results.forEach(function (item, index) {
      const completedB = item.b.replace("( )", item.answer);

      const div = document.createElement("div");
      div.className = "summaryItem";
      div.innerHTML = `
        <div class="summaryLabel">第${index + 1}問 ${item.correct ? "○ 正解" : "× 不正解"}</div>
        <div class="summaryText">${escapeHtml(item.a)}</div>
        <div class="summaryText" style="margin-top:8px;">${escapeHtml(completedB)}</div>
        <div class="summaryLabel" style="margin-top:8px;">正解</div>
        <div class="summaryText">${escapeHtml(item.answer)}</div>
        <div class="summaryLabel" style="margin-top:8px;">日本語</div>
        <div class="summaryText">${escapeHtml(item.ja)}</div>
      `;
      el.askedList.appendChild(div);
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

    saveCurrentSettings();

    const count = countToNumber(el.questionCount.value);
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

  function startRelatedParaphraseQuiz(sourceId) {
    const relatedItems = getRelatedItemsBySourceId(sourceId);
    if (!relatedItems.length) {
      alert("この表現に対応する言い換え問題が見つかりません。");
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

  function restoreSettingsToForm() {
    const settings = getSavedSettings();
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
      const sourceId = btn.getAttribute("data-source-id");
      if (!sourceId) return;
      openIdiomForSource(sourceId);
    }
  }

  function clearRelatedSourceQuery() {
    state.relatedSourceId = "";
    const url = new URL(window.location.href);
    url.searchParams.delete("sourceId");
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
        if (!question || !question.sourceId) return;
        openIdiomForSource(question.sourceId);
      });
    }

    if (el.startRelatedParaphraseBtn) {
      el.startRelatedParaphraseBtn.addEventListener("click", function () {
        startRelatedParaphraseQuiz(state.relatedSourceId);
      });
    }

    if (el.relatedParaphraseToIdiomBtn) {
      el.relatedParaphraseToIdiomBtn.addEventListener("click", function () {
        if (!state.relatedSourceId) return;
        openIdiomForSource(state.relatedSourceId);
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
