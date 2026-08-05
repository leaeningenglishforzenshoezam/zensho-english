"use strict";

/* =========================================================
   Dialogue Completion Page
   全商英検1級・大問8
========================================================= */


/* =========================================================
   基本定数
========================================================= */

const BLANK_IDS = ["a", "b", "c", "d", "e"];

const STORAGE_KEY = "dialogueCompletionState_v1";


/* =========================================================
   状態管理
========================================================= */

let questionSet = [];

let currentQuestionIndex = 0;

let activeBlankId = "a";

let userAnswers = {};

let choiceOrders = {};

let checkedQuestions = {};

let questionResults = {};

let rewardedQuestions = {};

let questionTimes = {};

let timerIntervalId = null;

let timerStartedAt = null;

let sessionStarted = false;

let currentSettings = {
  order: "sequential",
  startId: 1,
  endId: 30
};


/* =========================================================
   DOM取得
========================================================= */

const questionCategory =
  document.getElementById("questionCategory");

const questionTitle =
  document.getElementById("questionTitle");

const currentQuestionNumber =
  document.getElementById("currentQuestionNumber");

const totalQuestionNumber =
  document.getElementById("totalQuestionNumber");

const progressBar =
  document.getElementById("progressBar");

  const questionTimer =
  document.getElementById("questionTimer");

const dialogueContainer =
  document.getElementById("dialogueContainer");

const choicesContainer =
  document.getElementById("choicesContainer");

const mobileChoicesContainer =
  document.getElementById("mobileChoicesContainer");

const activeBlankLabel =
  document.getElementById("activeBlankLabel");

const mobileActiveBlankLabel =
  document.getElementById("mobileActiveBlankLabel");

const resultPanel =
  document.getElementById("resultPanel");

const resultTitle =
  document.getElementById("resultTitle");

const resultScore =
  document.getElementById("resultScore");

const resultMessage =
  document.getElementById("resultMessage");

const previousQuestionButton =
  document.getElementById("previousQuestionButton");

const checkAnswerButton =
  document.getElementById("checkAnswerButton");

const nextQuestionButton =
  document.getElementById("nextQuestionButton");

const resetAnswersButton =
  document.getElementById("resetAnswersButton");

const openSettingsButton =
  document.getElementById("openSettingsButton");

const mobileSheetOverlay =
  document.getElementById("mobileSheetOverlay");

const mobileChoicesSheet =
  document.getElementById("mobileChoicesSheet");

const closeMobileSheetButton =
  document.getElementById("closeMobileSheetButton");

const settingsModalOverlay =
  document.getElementById("settingsModalOverlay");

const settingsModal =
  document.getElementById("settingsModal");

const closeSettingsButton =
  document.getElementById("closeSettingsButton");

const cancelSettingsButton =
  document.getElementById("cancelSettingsButton");

const applySettingsButton =
  document.getElementById("applySettingsButton");

const questionRangeStart =
  document.getElementById("questionRangeStart");

const questionRangeEnd =
  document.getElementById("questionRangeEnd");


/* =========================================================
   初期化
========================================================= */

document.addEventListener("DOMContentLoaded", initializeDialoguePage);

function initializeDialoguePage() {
  validateQuestionData();

  loadSavedState();

  /*
   * ページを開き直したときは、
   * 前回の回答・採点結果・解答時間を消して
   * 新しい挑戦として開始する。
   */
  resetDialogueAttemptOnPageOpen();

  setupRangeSelects();

  setupEventListeners();

  document.body.classList.add(
    "setup-mode"
  );

  openSettingsModal();
}

/* =========================================================
   ページを開き直したときの解答リセット
========================================================= */

function resetDialogueAttemptOnPageOpen() {
  /*
   * 今回の解答に関するデータだけを初期化する。
   *
   * 出題範囲・順番などの設定と、
   * ゴイポイントの取得記録は残す。
   */

  userAnswers = {};

  choiceOrders = {};

  checkedQuestions = {};

  questionResults = {};

  questionTimes = {};

  activeBlankId = "a";

  currentQuestionIndex = 0;

  sessionStarted = false;

  /*
   * rewardedQuestionsは消さない。
   * 同じ問題を解き直した際の
   * ゴイポイント二重取得を防ぐため。
   */

  createQuestionSet();

  saveState();
}

/* =========================================================
   問題データ確認
========================================================= */

function validateQuestionData() {
  if (
    typeof dialogueQuestions === "undefined" ||
    !Array.isArray(dialogueQuestions)
  ) {
    throw new Error(
      "dialogue_data.jsのdialogueQuestionsが読み込まれていません。"
    );
  }

  if (dialogueQuestions.length === 0) {
    throw new Error(
      "dialogueQuestionsに問題データがありません。"
    );
  }
}


/* =========================================================
   イベント設定
========================================================= */

function setupEventListeners() {
  previousQuestionButton.addEventListener(
    "click",
    goToPreviousQuestion
  );

  nextQuestionButton.addEventListener(
    "click",
    goToNextQuestion
  );

  checkAnswerButton.addEventListener(
    "click",
    checkCurrentAnswers
  );

  resetAnswersButton.addEventListener(
    "click",
    resetCurrentAnswers
  );

  openSettingsButton.addEventListener(
    "click",
    openSettingsModal
  );

 closeSettingsButton.addEventListener(
    "click",
    () => closeSettingsModal()
  );

  cancelSettingsButton.addEventListener(
    "click",
    () => closeSettingsModal()
  );

  applySettingsButton.addEventListener(
    "click",
    applyQuestionSettings
  );

    settingsModalOverlay.addEventListener(
    "click",
    () => closeSettingsModal()
  );

  closeMobileSheetButton.addEventListener(
    "click",
    closeMobileChoicesSheet
  );

  mobileSheetOverlay.addEventListener(
    "click",
    closeMobileChoicesSheet
  );

  document.addEventListener(
    "keydown",
    handleKeyboardOperation
  );

    window.addEventListener(
    "beforeunload",
    () => {
      pauseQuestionTimer();
      saveState();
    }
  );
}


/* =========================================================
   問題セット作成
========================================================= */

function createQuestionSet() {
  const minimumId = Math.min(
    currentSettings.startId,
    currentSettings.endId
  );

  const maximumId = Math.max(
    currentSettings.startId,
    currentSettings.endId
  );

  questionSet = dialogueQuestions.filter((question) => {
    return (
      question.id >= minimumId &&
      question.id <= maximumId
    );
  });

  if (currentSettings.order === "random") {
    questionSet = shuffleArray(questionSet);
  } else {
    questionSet.sort((a, b) => a.id - b.id);
  }

  if (questionSet.length === 0) {
    questionSet = [...dialogueQuestions].sort(
      (a, b) => a.id - b.id
    );
  }

  if (currentQuestionIndex >= questionSet.length) {
    currentQuestionIndex = 0;
  }

  ensureChoiceOrders();
}


/* =========================================================
   選択肢シャッフル
========================================================= */

function ensureChoiceOrders() {
  questionSet.forEach((question) => {
    const questionKey = getQuestionKey(question.id);

    const savedOrder = choiceOrders[questionKey];

    const savedOrderIsValid =
      Array.isArray(savedOrder) &&
      savedOrder.length === question.choices.length &&
      savedOrder.every((choiceId) =>
        question.choices.some(
          (choice) => choice.id === choiceId
        )
      );

    if (!savedOrderIsValid) {
      choiceOrders[questionKey] = shuffleArray(
        question.choices.map((choice) => choice.id)
      );
    }
  });

  saveState();
}


function createNewChoiceOrder(question) {
  const questionKey = getQuestionKey(question.id);

  choiceOrders[questionKey] = shuffleArray(
    question.choices.map((choice) => choice.id)
  );
}


/* =========================================================
   描画
========================================================= */

function renderCurrentQuestion() {
  const question = getCurrentQuestion();

  if (!question) {
    renderNoQuestionMessage();
    return;
  }

  ensureQuestionAnswerState(question.id);

  activeBlankId = getInitialActiveBlank(question.id);

  renderQuestionHeader(question);

  renderDialogue(question);

  renderChoices(question);

  renderResult(question);

  updateNavigationButtons();

   updateActiveBlankLabels();

  startQuestionTimer(question);

  saveState();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function renderQuestionHeader(question) {
  questionCategory.textContent =
    formatCategory(question.category);

  questionTitle.textContent =
    question.title || `Question ${question.id}`;

  currentQuestionNumber.textContent =
    String(currentQuestionIndex + 1);

  totalQuestionNumber.textContent =
    String(questionSet.length);

  const progress =
    ((currentQuestionIndex + 1) / questionSet.length) * 100;

  progressBar.style.width = `${progress}%`;
}


function renderDialogue(question) {
  dialogueContainer.innerHTML = "";

  const questionKey =
    getQuestionKey(question.id);

  const showJapanese =
    Boolean(checkedQuestions[questionKey]);

  const fragment = document.createDocumentFragment();

  question.dialogue.forEach((line) => {
    const lineElement = document.createElement("div");

    lineElement.className = "dialogue-line";

    const speakerElement = document.createElement("div");

    speakerElement.className = "dialogue-speaker";

    speakerElement.textContent =
      line.speaker || "";

    const contentElement = document.createElement("div");

    contentElement.className = "dialogue-content";

    if (line.blank) {
      const blankButton = createBlankButton(
        question,
        line.blank
      );

      contentElement.appendChild(blankButton);
    } else {
      const englishElement =
        document.createElement("p");

      englishElement.className =
        "dialogue-english";

      englishElement.textContent =
        line.text || "";

      contentElement.appendChild(englishElement);

            if (line.ja && showJapanese) {
        const japaneseElement =
          document.createElement("p");

        japaneseElement.className =
          "dialogue-japanese";

        japaneseElement.textContent =
          line.ja;

        contentElement.appendChild(japaneseElement);
      }
    }

    lineElement.appendChild(speakerElement);

    lineElement.appendChild(contentElement);

    fragment.appendChild(lineElement);
  });

  dialogueContainer.appendChild(fragment);
}


function createBlankButton(question, blankId) {
  const button = document.createElement("button");

  button.type = "button";

  button.className = "blank-button";

  button.dataset.blankId = blankId;

  const questionKey = getQuestionKey(question.id);

  const selectedChoiceId =
    userAnswers[questionKey]?.[blankId] || null;

  const selectedChoice = selectedChoiceId
    ? getChoiceById(question, selectedChoiceId)
    : null;

  if (blankId === activeBlankId) {
    button.classList.add("active");
  }

  if (selectedChoice) {
    button.classList.add("answered");
  }

  if (checkedQuestions[questionKey]) {
    const isCorrect =
      selectedChoiceId === question.answers[blankId];

    if (isCorrect) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  }

  const blankIdElement =
    document.createElement("span");

  blankIdElement.className = "blank-id";

  blankIdElement.textContent = blankId;

  const answerTextElement =
    document.createElement("span");

  answerTextElement.className =
    "blank-answer-text";

  if (selectedChoice) {
    answerTextElement.textContent =
      selectedChoice.text;
  } else {
    answerTextElement.textContent =
      "選択肢を選ぶ";

    answerTextElement.classList.add(
      "blank-placeholder"
    );
  }

  const statusIcon =
    document.createElement("span");

  statusIcon.className =
    "blank-status-icon";

  if (checkedQuestions[questionKey]) {
    const isCorrect =
      selectedChoiceId === question.answers[blankId];

    statusIcon.textContent =
      isCorrect ? "✓" : "×";
  } else {
    statusIcon.textContent = "›";
  }

  button.appendChild(blankIdElement);

  button.appendChild(answerTextElement);

  button.appendChild(statusIcon);

  button.addEventListener("click", () => {
    selectBlank(blankId);
  });

  return button;
}


function renderChoices(question) {
  choicesContainer.innerHTML = "";

  mobileChoicesContainer.innerHTML = "";

  const questionKey = getQuestionKey(question.id);

  const choiceOrder =
    choiceOrders[questionKey] || [];

  choiceOrder.forEach((choiceId, index) => {
    const choice = getChoiceById(
      question,
      choiceId
    );

    if (!choice) {
      return;
    }

    const desktopButton =
      createChoiceButton(
        question,
        choice,
        index + 1
      );

    const mobileButton =
      createChoiceButton(
        question,
        choice,
        index + 1
      );

    choicesContainer.appendChild(
      desktopButton
    );

    mobileChoicesContainer.appendChild(
      mobileButton
    );
  });
}


function createChoiceButton(
  question,
  choice,
  displayNumber
) {
  const button = document.createElement("button");

  button.type = "button";

  button.className = "choice-button";

  button.dataset.choiceId = choice.id;

  const questionKey = getQuestionKey(question.id);

  const selectedForActiveBlank =
    userAnswers[questionKey]?.[activeBlankId] ===
    choice.id;

  const usedByOtherBlank =
    isChoiceUsedByOtherBlank(
      question.id,
      choice.id,
      activeBlankId
    );

  if (selectedForActiveBlank) {
    button.classList.add("selected");
  }

  if (usedByOtherBlank) {
    button.classList.add("used");
    button.disabled = true;
  }

  if (checkedQuestions[questionKey]) {
    button.disabled = true;
  }

  const numberElement =
    document.createElement("span");

  numberElement.className =
    "choice-number";

  numberElement.textContent =
    String(displayNumber);

  const textArea =
    document.createElement("span");

  textArea.className =
    "choice-text-area";

  const englishElement =
    document.createElement("span");

  englishElement.className =
    "choice-english";

  englishElement.textContent =
    choice.text;

  textArea.appendChild(englishElement);

    if (
    choice.ja &&
    checkedQuestions[questionKey]
  ) {
    const japaneseElement =
      document.createElement("span");

    japaneseElement.className =
      "choice-japanese";

    japaneseElement.textContent =
      choice.ja;

    textArea.appendChild(japaneseElement);
  }

  button.appendChild(numberElement);

  button.appendChild(textArea);

  button.addEventListener("click", () => {
    assignChoiceToBlank(choice.id);
  });

  return button;
}


/* =========================================================
   空所選択
========================================================= */

function selectBlank(blankId) {
  const question = getCurrentQuestion();

  if (!question) {
    return;
  }

  const questionKey = getQuestionKey(question.id);

  if (checkedQuestions[questionKey]) {
    return;
  }

  activeBlankId = blankId;

  renderDialogue(question);

  renderChoices(question);

  updateActiveBlankLabels();

  if (isMobileView()) {
    openMobileChoicesSheet();
  }
}


/* =========================================================
   選択肢割り当て
========================================================= */

function assignChoiceToBlank(choiceId) {
  const question = getCurrentQuestion();

  if (!question) {
    return;
  }

  const questionKey = getQuestionKey(question.id);

  if (checkedQuestions[questionKey]) {
    return;
  }

  ensureQuestionAnswerState(question.id);

  removeChoiceFromOtherBlank(
    question.id,
    choiceId,
    activeBlankId
  );

  userAnswers[questionKey][activeBlankId] =
    choiceId;

  saveState();

  const nextBlank = findNextBlank(
    question.id,
    activeBlankId
  );

  if (isMobileView()) {
    closeMobileChoicesSheet();
  }

  if (nextBlank) {
    activeBlankId = nextBlank;
  }

  renderDialogue(question);

  renderChoices(question);

  updateActiveBlankLabels();

  if (
    isMobileView() &&
    nextBlank
  ) {
    window.setTimeout(() => {
      openMobileChoicesSheet();
    }, 180);
  }
}


/* =========================================================
   選択肢重複防止
========================================================= */

function isChoiceUsedByOtherBlank(
  questionId,
  choiceId,
  currentBlankId
) {
  const questionKey =
    getQuestionKey(questionId);

  const answers =
    userAnswers[questionKey] || {};

  return Object.entries(answers).some(
    ([blankId, selectedChoiceId]) => {
      return (
        blankId !== currentBlankId &&
        selectedChoiceId === choiceId
      );
    }
  );
}


function removeChoiceFromOtherBlank(
  questionId,
  choiceId,
  currentBlankId
) {
  const questionKey =
    getQuestionKey(questionId);

  const answers =
    userAnswers[questionKey];

  if (!answers) {
    return;
  }

  Object.keys(answers).forEach((blankId) => {
    if (
      blankId !== currentBlankId &&
      answers[blankId] === choiceId
    ) {
      delete answers[blankId];
    }
  });
}


/* =========================================================
   次の空所
========================================================= */

function findNextBlank(
  questionId,
  currentBlankId
) {
  const questionKey =
    getQuestionKey(questionId);

  const answers =
    userAnswers[questionKey] || {};

  const currentIndex =
    BLANK_IDS.indexOf(currentBlankId);

  for (
    let offset = 1;
    offset <= BLANK_IDS.length;
    offset += 1
  ) {
    const nextIndex =
      (currentIndex + offset) %
      BLANK_IDS.length;

    const blankId =
      BLANK_IDS[nextIndex];

    if (!answers[blankId]) {
      return blankId;
    }
  }

  return null;
}


function getInitialActiveBlank(questionId) {
  const questionKey =
    getQuestionKey(questionId);

  const answers =
    userAnswers[questionKey] || {};

  const firstEmptyBlank =
    BLANK_IDS.find(
      (blankId) => !answers[blankId]
    );

  return firstEmptyBlank || "a";
}


/* =========================================================
   答え合わせ
========================================================= */

function checkCurrentAnswers() {
  const question = getCurrentQuestion();

  if (!question) {
    return;
  }

  const questionKey = getQuestionKey(question.id);

  ensureQuestionAnswerState(question.id);

  const unansweredBlanks =
    BLANK_IDS.filter(
      (blankId) =>
        !userAnswers[questionKey][blankId]
    );

  if (unansweredBlanks.length > 0) {
    const blankNames =
      unansweredBlanks.join("・");

    resultPanel.hidden = false;

    resultPanel.classList.remove(
      "perfect",
      "retry"
    );

    resultPanel.classList.add("retry");

    resultTitle.textContent =
      "未解答の空所があります";

    resultScore.textContent =
      `${5 - unansweredBlanks.length} / 5`;

    resultMessage.textContent =
      `空所 ${blankNames} の答えを選んでから、もう一度答え合わせをしてください。`;

    activeBlankId = unansweredBlanks[0];

    renderDialogue(question);

    renderChoices(question);

    updateActiveBlankLabels();

    if (isMobileView()) {
      openMobileChoicesSheet();
    }

    return;
  }

      pauseQuestionTimer();

  let score = 0;

  const details = {};

  BLANK_IDS.forEach((blankId) => {
    const selectedChoiceId =
      userAnswers[questionKey][blankId];

    const correctChoiceId =
      question.answers[blankId];

    const isCorrect =
      selectedChoiceId === correctChoiceId;

    details[blankId] = isCorrect;

    if (isCorrect) {
      score += 1;
    }
  });

  checkedQuestions[questionKey] = true;

 questionResults[questionKey] = {
  score,
  total: BLANK_IDS.length,
  details,
  checkedAt: new Date().toISOString()
};

if (
  score === BLANK_IDS.length &&
  !rewardedQuestions[questionKey]
) {
  rewardDialogue8Perfect(questionKey);
}

saveState();

  renderDialogue(question);

  renderChoices(question);

  renderResult(question);

  updateNavigationButtons();
}

function rewardDialogue8Perfect(questionKey) {
  if (rewardedQuestions[questionKey]) {
    return;
  }

  if (
    !window.GoimonUI ||
    typeof window.GoimonUI.addDialogue8Perfect !==
      "function"
  ) {
    console.warn(
      "ゴイモンの大問8加算機能を読み込めませんでした。"
    );

    return;
  }

  window.GoimonUI.addDialogue8Perfect();

  rewardedQuestions[questionKey] = true;
}


/* =========================================================
   結果表示
========================================================= */

function renderResult(question) {
  const questionKey = getQuestionKey(question.id);

  const result =
    questionResults[questionKey];

const elapsedTime =
    questionTimes[questionKey] || 0;

  const formattedTime =
    formatElapsedTime(elapsedTime);

  if (!checkedQuestions[questionKey] || !result) {
    resultPanel.hidden = true;

    resultPanel.classList.remove(
      "perfect",
      "retry"
    );

    checkAnswerButton.textContent =
      "答え合わせ";

    return;
  }

  resultPanel.hidden = false;

  resultScore.textContent =
    `${result.score} / ${result.total}`;

  if (result.score === result.total) {
    resultPanel.classList.add("perfect");

    resultPanel.classList.remove("retry");

    resultTitle.textContent =
      "全問正解です";

    resultMessage.textContent =
      `解答時間は ${formattedTime} でした。目安解答時間は5分です。読んでいた内容が日本語訳と一致していたか確認して、次の問題に進みましょう。`;
  } else {
    resultPanel.classList.add("retry");

    resultPanel.classList.remove("perfect");

    const incorrectBlanks =
      BLANK_IDS.filter(
        (blankId) =>
          !result.details[blankId]
      );

    resultTitle.textContent =
      "答えを確認しましょう";

        resultMessage.textContent =
      `解答時間は ${formattedTime} でした。誤っている空所は ${incorrectBlanks.join(
        "・"
      )} です。「この問題をやり直す」で、もう一度取り組めます。`;
  }

  checkAnswerButton.textContent =
    "答え合わせ済み";
}


/* =========================================================
   解答リセット
========================================================= */

function resetCurrentAnswers() {
    pauseQuestionTimer();
  const question = getCurrentQuestion();

  if (!question) {
    return;
  }

  const questionKey =
    getQuestionKey(question.id);

  userAnswers[questionKey] = {};

  delete checkedQuestions[questionKey];

    delete questionResults[questionKey];

  questionTimes[questionKey] = 0;

  activeBlankId = "a";

  createNewChoiceOrder(question);

  closeMobileChoicesSheet();

  saveState();

  renderCurrentQuestion();
}


/* =========================================================
   問題移動
========================================================= */

function goToPreviousQuestion() {
  if (currentQuestionIndex <= 0) {
    return;
  }

  pauseQuestionTimer();

  closeMobileChoicesSheet();

  currentQuestionIndex -= 1;

  renderCurrentQuestion();
}


function goToNextQuestion() {
  if (
    currentQuestionIndex >=
    questionSet.length - 1
  ) {
    return;
  }

  pauseQuestionTimer();

  closeMobileChoicesSheet();

  currentQuestionIndex += 1;

  renderCurrentQuestion();
}


function updateNavigationButtons() {
  previousQuestionButton.disabled =
    currentQuestionIndex === 0;

  nextQuestionButton.disabled =
    currentQuestionIndex ===
    questionSet.length - 1;

  const question = getCurrentQuestion();

  if (!question) {
    checkAnswerButton.disabled = true;
    return;
  }

  const questionKey =
    getQuestionKey(question.id);

  checkAnswerButton.disabled =
    Boolean(checkedQuestions[questionKey]);
}


/* =========================================================
   スマホ用ボトムシート
========================================================= */

function openMobileChoicesSheet() {
  if (!isMobileView()) {
    return;
  }

  mobileSheetOverlay.hidden = false;

  mobileChoicesSheet.hidden = false;

  document.body.style.overflow = "hidden";
}


function closeMobileChoicesSheet() {
  mobileSheetOverlay.hidden = true;

  mobileChoicesSheet.hidden = true;

  if (settingsModal.hidden) {
    document.body.style.overflow = "";
  }
}


/* =========================================================
   出題設定
========================================================= */

function setupRangeSelects() {
  questionRangeStart.innerHTML = "";

  questionRangeEnd.innerHTML = "";

  const sortedQuestions =
    [...dialogueQuestions].sort(
      (a, b) => a.id - b.id
    );

  sortedQuestions.forEach((question) => {
    const startOption =
      document.createElement("option");

    startOption.value =
      String(question.id);

    startOption.textContent =
      `問題 ${question.id}`;

    const endOption =
      document.createElement("option");

    endOption.value =
      String(question.id);

    endOption.textContent =
      `問題 ${question.id}`;

    questionRangeStart.appendChild(
      startOption
    );

    questionRangeEnd.appendChild(
      endOption
    );
  });

  const availableIds =
    sortedQuestions.map(
      (question) => question.id
    );

  const firstId =
    availableIds[0];

  const lastId =
    availableIds[availableIds.length - 1];

  if (
    !availableIds.includes(
      currentSettings.startId
    )
  ) {
    currentSettings.startId = firstId;
  }

  if (
    !availableIds.includes(
      currentSettings.endId
    )
  ) {
    currentSettings.endId = lastId;
  }

  questionRangeStart.value =
    String(currentSettings.startId);

  questionRangeEnd.value =
    String(currentSettings.endId);
}


function openSettingsModal() {
    if (sessionStarted) {
    pauseQuestionTimer();
  }
  const orderRadio =
    document.querySelector(
      `input[name="questionOrder"][value="${currentSettings.order}"]`
    );

  if (orderRadio) {
    orderRadio.checked = true;
  }

  questionRangeStart.value =
    String(currentSettings.startId);

  questionRangeEnd.value =
    String(currentSettings.endId);

  settingsModalOverlay.hidden = false;

  settingsModal.hidden = false;

  document.body.style.overflow = "hidden";
}


function closeSettingsModal(resumeTimer = true) {
  if (!sessionStarted) {
    return;
  }
  settingsModalOverlay.hidden = true;

  settingsModal.hidden = true;

  if (mobileChoicesSheet.hidden) {
    document.body.style.overflow = "";
  }

  if (
    resumeTimer &&
    sessionStarted
  ) {
    const question = getCurrentQuestion();

    if (question) {
      startQuestionTimer(question);
    }
  }
}


function applyQuestionSettings() {
  pauseQuestionTimer();

  const selectedOrder =
    document.querySelector(
      'input[name="questionOrder"]:checked'
    );

  const startId =
    Number(questionRangeStart.value);

  const endId =
    Number(questionRangeEnd.value);

  currentSettings = {
    order:
      selectedOrder?.value ||
      "sequential",
    startId: Math.min(startId, endId),
    endId: Math.max(startId, endId)
  };

  currentQuestionIndex = 0;

  choiceOrders = {};

  createQuestionSet();

  sessionStarted = true;

  settingsModalOverlay.hidden = true;

  settingsModal.hidden = true;

  document.body.style.overflow = "";

  document.body.classList.remove(
    "setup-mode"
  );

  saveState();

  renderCurrentQuestion();
}


/* =========================================================
   ラベル更新
========================================================= */

function updateActiveBlankLabels() {
  const labelText =
    `空所 ${activeBlankId} を選択中`;

  activeBlankLabel.textContent =
    labelText;

  mobileActiveBlankLabel.textContent =
    labelText;
}


/* =========================================================
   キーボード操作
========================================================= */

function handleKeyboardOperation(event) {
  if (
    !settingsModal.hidden ||
    !mobileChoicesSheet.hidden
  ) {
    if (event.key === "Escape") {
      closeSettingsModal();
      closeMobileChoicesSheet();
    }

    return;
  }

  if (event.key === "ArrowLeft") {
    goToPreviousQuestion();
  }

  if (event.key === "ArrowRight") {
    goToNextQuestion();
  }

  const lowerKey =
    event.key.toLowerCase();

  if (BLANK_IDS.includes(lowerKey)) {
    selectBlank(lowerKey);
  }
}


/* =========================================================
   保存・読込
========================================================= */

function saveState() {
  const state = {
    currentSettings,
    currentQuestionId:
      getCurrentQuestion()?.id || null,
    userAnswers,
    choiceOrders,
    checkedQuestions,
questionResults,
rewardedQuestions,
questionTimes
  };

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch (error) {
    console.warn(
      "学習状態を保存できませんでした。",
      error
    );
  }
}


function loadSavedState() {
  try {
    const savedText =
      localStorage.getItem(STORAGE_KEY);

    if (!savedText) {
      setDefaultSettings();
      return;
    }

    const savedState =
      JSON.parse(savedText);

    if (
      savedState.currentSettings &&
      typeof savedState.currentSettings === "object"
    ) {
      currentSettings = {
        ...currentSettings,
        ...savedState.currentSettings
      };
    }

    if (
      savedState.userAnswers &&
      typeof savedState.userAnswers === "object"
    ) {
      userAnswers =
        savedState.userAnswers;
    }

    if (
      savedState.choiceOrders &&
      typeof savedState.choiceOrders === "object"
    ) {
      choiceOrders =
        savedState.choiceOrders;
    }

    if (
      savedState.checkedQuestions &&
      typeof savedState.checkedQuestions === "object"
    ) {
      checkedQuestions =
        savedState.checkedQuestions;
    }

    if (
      savedState.questionResults &&
      typeof savedState.questionResults === "object"
    ) {
      questionResults =
        savedState.questionResults;
    }

    if (
  savedState.rewardedQuestions &&
  typeof savedState.rewardedQuestions === "object"
) {
  rewardedQuestions =
    savedState.rewardedQuestions;
}

        if (
      savedState.questionTimes &&
      typeof savedState.questionTimes === "object"
    ) {
      questionTimes =
        savedState.questionTimes;
    }

    createQuestionSet();

    if (savedState.currentQuestionId) {
      const savedIndex =
        questionSet.findIndex(
          (question) =>
            question.id ===
            savedState.currentQuestionId
        );

      if (savedIndex >= 0) {
        currentQuestionIndex =
          savedIndex;
      }
    }
  } catch (error) {
    console.warn(
      "保存された学習状態を読み込めませんでした。",
      error
    );

    clearSavedState();

    setDefaultSettings();
  }
}


function clearSavedState() {
  try {
    localStorage.removeItem(
      STORAGE_KEY
    );
  } catch (error) {
    console.warn(
      "保存データを削除できませんでした。",
      error
    );
  }
}


function setDefaultSettings() {
  const sortedIds =
    dialogueQuestions
      .map((question) => question.id)
      .sort((a, b) => a - b);

  currentSettings = {
    order: "sequential",
    startId: sortedIds[0],
    endId: sortedIds[sortedIds.length - 1]
  };
}


/* =========================================================
   補助関数
========================================================= */

function getCurrentQuestion() {
  return questionSet[
    currentQuestionIndex
  ] || null;
}


function getQuestionKey(questionId) {
  return String(questionId);
}


function ensureQuestionAnswerState(
  questionId
) {
  const questionKey =
    getQuestionKey(questionId);

  if (
    !userAnswers[questionKey] ||
    typeof userAnswers[questionKey] !==
      "object"
  ) {
    userAnswers[questionKey] = {};
  }
}


function getChoiceById(
  question,
  choiceId
) {
  return question.choices.find(
    (choice) =>
      choice.id === choiceId
  );
}


function shuffleArray(sourceArray) {
  const array = [...sourceArray];

  for (
    let index = array.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex =
      Math.floor(
        Math.random() * (index + 1)
      );

    [
      array[index],
      array[randomIndex]
    ] = [
      array[randomIndex],
      array[index]
    ];
  }

  return array;
}


function formatCategory(category) {
  if (!category) {
    return "Dialogue";
  }

  return category
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}


function isMobileView() {
  return window.matchMedia(
    "(max-width: 720px)"
  ).matches;
}


function renderNoQuestionMessage() {
  questionCategory.textContent =
    "Dialogue";

  questionTitle.textContent =
    "問題がありません";

  currentQuestionNumber.textContent =
    "0";

  totalQuestionNumber.textContent =
    "0";

  progressBar.style.width = "0%";

  dialogueContainer.innerHTML = `
    <p class="instruction-text">
      指定された範囲に問題がありません。
      出題設定を確認してください。
    </p>
  `;

  choicesContainer.innerHTML = "";

  mobileChoicesContainer.innerHTML = "";

  resultPanel.hidden = true;

  previousQuestionButton.disabled = true;

  nextQuestionButton.disabled = true;

  checkAnswerButton.disabled = true;
}

/* =========================================================
   問題タイマー
========================================================= */

function startQuestionTimer(question) {
  stopTimerIntervalOnly();

  if (!question || !sessionStarted) {
    questionTimer.textContent = "00:00";
    return;
  }

  const questionKey =
    getQuestionKey(question.id);

  if (
    typeof questionTimes[questionKey] !==
    "number"
  ) {
    questionTimes[questionKey] = 0;
  }

  updateQuestionTimerDisplay(question.id);

  if (checkedQuestions[questionKey]) {
    return;
  }

  timerStartedAt = Date.now();

  timerIntervalId = window.setInterval(
    () => {
      updateQuestionTimerDisplay(
        question.id
      );
    },
    1000
  );
}


function pauseQuestionTimer() {
  const question = getCurrentQuestion();

  if (
    question &&
    timerStartedAt !== null
  ) {
    const questionKey =
      getQuestionKey(question.id);

    const additionalSeconds =
      Math.floor(
        (Date.now() - timerStartedAt) /
        1000
      );

    questionTimes[questionKey] =
      (questionTimes[questionKey] || 0) +
      additionalSeconds;
  }

  stopTimerIntervalOnly();

  if (question) {
    updateQuestionTimerDisplay(
      question.id
    );
  }

  saveState();
}


function stopTimerIntervalOnly() {
  if (timerIntervalId !== null) {
    window.clearInterval(
      timerIntervalId
    );

    timerIntervalId = null;
  }

  timerStartedAt = null;
}


function getCurrentElapsedSeconds(
  questionId
) {
  const questionKey =
    getQuestionKey(questionId);

  const savedSeconds =
    questionTimes[questionKey] || 0;

  if (timerStartedAt === null) {
    return savedSeconds;
  }

  const currentQuestion =
    getCurrentQuestion();

  if (
    !currentQuestion ||
    currentQuestion.id !== questionId
  ) {
    return savedSeconds;
  }

  const runningSeconds =
    Math.floor(
      (Date.now() - timerStartedAt) /
      1000
    );

  return savedSeconds + runningSeconds;
}


function updateQuestionTimerDisplay(
  questionId
) {
  const seconds =
    getCurrentElapsedSeconds(
      questionId
    );

  questionTimer.textContent =
    formatElapsedTime(seconds);
}


function formatElapsedTime(
  totalSeconds
) {
  const safeSeconds =
    Math.max(
      0,
      Math.floor(totalSeconds)
    );

  const minutes =
    Math.floor(safeSeconds / 60);

  const seconds =
    safeSeconds % 60;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}
