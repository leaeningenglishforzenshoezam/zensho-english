"use strict";

/* =========================================================
   Reading Completion Page
   全商英検1級・大問10
========================================================= */

const BLANK_IDS = ["a", "b", "c", "d", "e"];
const BLANK_LABELS = { a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ" };

const STORAGE_KEY =
  "q10ReadingCompletionState_v1";

const WEAK_STORAGE_KEY =
  "q10WeakExpressions_v1";

const HISTORY_STORAGE_KEY =
  "q10QuestionHistory_v1";

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

/*
 * 問題ごとの累計学習履歴
 *
 * {
 *   "q10_original_001": {
 *     attempts: 3,
 *     bestScore: 5,
 *     lastScore: 4,
 *     totalScore: 12,
 *     lastAttemptedAt: 123456789
 *   }
 * }
 */
let questionHistory = {};

let weakExpressions = {};

let weakMeaningsVisible = true;
let weakExamplesVisible = true;

let individuallyRevealedMeanings =
  new Set();

let individuallyRevealedExamples =
  new Set();

let timerIntervalId = null;
let timerStartedAt = null;
let sessionStarted = false;
let goimonSetLimit = 0;

let currentSettings = {
  order: "sequential",
  startNumber: 1,
  endNumber: 5
};

/* =========================================================
   DOM取得
========================================================= */

const questionCategory =
  document.getElementById("questionCategory");

const questionTitle =
  document.getElementById("questionTitle");

const questionTitleJa =
  document.getElementById("questionTitleJa");

const currentQuestionNumber =
  document.getElementById("currentQuestionNumber");

const totalQuestionNumber =
  document.getElementById("totalQuestionNumber");

const progressBar =
  document.getElementById("progressBar");

const questionTimer =
  document.getElementById("questionTimer");

const passageContainer =
  document.getElementById("passageContainer");

const answersContainer =
  document.getElementById("answersContainer");

const answeredCountLabel =
  document.getElementById("answeredCountLabel");

const resultPanel =
  document.getElementById("resultPanel");

const resultTitle =
  document.getElementById("resultTitle");

const resultScore =
  document.getElementById("resultScore");

const resultMessage =
  document.getElementById("resultMessage");

const explanationsPanel =
  document.getElementById("explanationsPanel");

const explanationsContainer =
  document.getElementById("explanationsContainer");

const translationPanel =
  document.getElementById("translationPanel");

const toggleTranslationButton =
  document.getElementById("toggleTranslationButton");

const translationToggleIcon =
  document.getElementById("translationToggleIcon");

const translationContainer =
  document.getElementById("translationContainer");

const sentenceReviewPanel =
  document.getElementById("sentenceReviewPanel");

const sentenceReviewContainer =
  document.getElementById("sentenceReviewContainer");

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

  const questionHistorySummary =
  document.getElementById(
    "questionHistorySummary"
  );

const questionAttemptList =
  document.getElementById(
    "questionAttemptList"
  );

const mobileSheetOverlay =
  document.getElementById("mobileSheetOverlay");

const mobileAnswersSheet =
  document.getElementById("mobileAnswersSheet");

const mobileActiveBlankLabel =
  document.getElementById("mobileActiveBlankLabel");

const mobileAnswersContainer =
  document.getElementById("mobileAnswersContainer");

const closeMobileSheetButton =
  document.getElementById("closeMobileSheetButton");

const sentenceSheetOverlay =
  document.getElementById("sentenceSheetOverlay");

const sentenceReviewSheet =
  document.getElementById("sentenceReviewSheet");

const sentenceReviewSheetHeading =
  document.getElementById("sentenceReviewSheetHeading");

const sentenceReviewSheetContent =
  document.getElementById("sentenceReviewSheetContent");

const closeSentenceSheetButton =
  document.getElementById("closeSentenceSheetButton");

const openWeakListButton =
  document.getElementById("openWeakListButton");

const weakListOverlay =
  document.getElementById("weakListOverlay");

const weakListModal =
  document.getElementById("weakListModal");

const closeWeakListButton =
  document.getElementById("closeWeakListButton");

const toggleWeakMeaningsButton =
  document.getElementById("toggleWeakMeaningsButton");

const toggleWeakExamplesButton =
  document.getElementById("toggleWeakExamplesButton");

const weakListContainer =
  document.getElementById("weakListContainer");


/* =========================================================
   初期化
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeQ10Page
);

function applyGoimonLearningQuery() {
  const p = new URLSearchParams(location.search);
  const ability = p.get("goimonAbility");
  const count = Number(p.get("goimonCount"));

  if (ability !== "bunmyaku" || !Number.isFinite(count) || count < 1) return false;

  const numbers = q10Questions.map(q => Number(q.number)).filter(Number.isFinite);
  goimonSetLimit = Math.min(3, Math.max(1, Math.floor(count)));

  currentSettings = {
    order:"random",
    startNumber:Math.min(...numbers),
    endNumber:Math.max(...numbers)
  };

  currentQuestionIndex = 0;
  choiceOrders = {};
  createQuestionSet();
  sessionStarted = true;

  settingsModalOverlay.hidden = true;
  settingsModal.hidden = true;
  document.body.classList.remove("setup-mode");
  restoreBodyScroll();

  saveState();
  renderCurrentQuestion();
  return true;
}

function initializeQ10Page() {
  validateQuestionData();

  setDefaultSettings();

  loadSavedState();

  /*
   * 累計の挑戦回数は、
   * 今回の解答状態とは別に読み込む。
   */
  loadQuestionHistory();

  /*
   * ページを開き直したときは、
   * 前回の解答を残さず新しい挑戦にする。
   *
   * 出題範囲や順番の設定は残す。
   */
  resetAttemptDataOnPageOpen();

  loadWeakExpressions();

  setupRangeSelects();

  setupEventListeners();

  document.body.classList.add(
  "setup-mode"
);

createSettingsGuideModal();

if (!applyGoimonLearningQuery()) {
  openSettingsModal();
}
}

/* =========================================================
   ページを開き直したときの解答リセット
========================================================= */

function resetAttemptDataOnPageOpen() {
  /*
   * 前回の解答・採点結果・時間を削除する。
   *
   * currentSettingsは残すため、
   * 前回選んだ出題範囲や出題順は維持される。
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
   * 満点報酬の二重取得を防ぐ記録は残す。
   * 同じ問題を解き直して満点を取っても、
   * ゴイポイントは重複加算されない。
   */

  createQuestionSet();

  saveState();
}

/* =========================================================
   問題データ確認
========================================================= */

function validateQuestionData() {
  if (
    typeof q10Questions === "undefined" ||
    !Array.isArray(q10Questions)
  ) {
    throw new Error(
      "q10_data.jsのq10Questionsが読み込まれていません。"
    );
  }

  if (q10Questions.length === 0) {
    throw new Error(
      "q10Questionsに問題データがありません。"
    );
  }

  q10Questions.forEach((question, index) => {
    if (
      !question.id ||
      !Number.isInteger(question.number)
    ) {
      throw new Error(
        `問題${index + 1}のidまたはnumberが不正です。`
      );
    }

    if (
      !Array.isArray(question.paragraphs) ||
      question.paragraphs.length === 0
    ) {
      throw new Error(
        `問題${question.number}にparagraphsがありません。`
      );
    }

    if (
      !Array.isArray(question.blanks) ||
      question.blanks.length !== 5
    ) {
      throw new Error(
        `問題${question.number}の空欄数は5つにしてください。`
      );
    }

    BLANK_IDS.forEach((blankId) => {
      const blank =
        getBlankById(question, blankId);

      if (!blank) {
        throw new Error(
          `問題${question.number}に空欄${blankId}がありません。`
        );
      }

      if (
        !Array.isArray(blank.choices) ||
        blank.choices.length !== 4
      ) {
        throw new Error(
          `問題${question.number}の空欄${blankId}は4択にしてください。`
        );
      }

      const answerExists =
        blank.choices.some((choice) => {
          return choice.id === blank.answer;
        });

      if (!answerExists) {
        throw new Error(
          `問題${question.number}の空欄${blankId}の正答IDが不正です。`
        );
      }
    });
  });
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
    closeMobileAnswersSheet
  );

  mobileSheetOverlay.addEventListener(
    "click",
    closeMobileAnswersSheet
  );

  closeSentenceSheetButton.addEventListener(
    "click",
    closeSentenceReviewSheet
  );

  sentenceSheetOverlay.addEventListener(
    "click",
    closeSentenceReviewSheet
  );

  openWeakListButton.addEventListener(
    "click",
    openWeakListModal
  );

  closeWeakListButton.addEventListener(
    "click",
    closeWeakListModal
  );

  weakListOverlay.addEventListener(
    "click",
    closeWeakListModal
  );

  toggleWeakMeaningsButton.addEventListener(
    "click",
    toggleWeakMeanings
  );

  toggleWeakExamplesButton.addEventListener(
    "click",
    toggleWeakExamples
  );

  toggleTranslationButton.addEventListener(
    "click",
    toggleTranslation
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
   出題順の値を確認
========================================================= */

function normalizeQuestionOrder(
  order
) {
  if (
    order === "random" ||
    order === "unattempted"
  ) {
    return order;
  }

  return "sequential";
}


/* =========================================================
   出題セット作成
========================================================= */



function createQuestionSet() {
  const minNumber = Math.min(
    currentSettings.startNumber,
    currentSettings.endNumber
  );

  const maxNumber = Math.max(
    currentSettings.startNumber,
    currentSettings.endNumber
  );

  questionSet = q10Questions.filter(
    (question) => {
      return (
        question.number >= minNumber &&
        question.number <= maxNumber
      );
    }
  );

  if (
    currentSettings.order ===
    "random"
  ) {
    questionSet =
      shuffleArray(questionSet);
  } else if (
    currentSettings.order ===
    "unattempted"
  ) {
    /*
     * 挑戦回数が少ない問題を先頭にする。
     *
     * 0回 → 1回 → 2回……の順。
     * 同じ回数なら問題番号順。
     */
    questionSet.sort(
      (questionA, questionB) => {
        const attemptsA =
          getQuestionAttemptCount(
            questionA.id
          );

        const attemptsB =
          getQuestionAttemptCount(
            questionB.id
          );

        if (
          attemptsA !== attemptsB
        ) {
          return (
            attemptsA - attemptsB
          );
        }

        return (
          questionA.number -
          questionB.number
        );
      }
    );
  } else {
    questionSet.sort(
      (questionA, questionB) => {
        return (
          questionA.number -
          questionB.number
        );
      }
    );
  }

  if (
    questionSet.length === 0
  ) {
    questionSet = [
      ...q10Questions
    ].sort((a, b) => {
      return a.number - b.number;
    });
  }

  if (goimonSetLimit > 0) {
  questionSet = questionSet.slice(0, goimonSetLimit);
}

  if (
    currentQuestionIndex >=
    questionSet.length
  ) {
    currentQuestionIndex = 0;
  }

  ensureChoiceOrders();
}


/* =========================================================
   選択肢の順番
========================================================= */

function ensureChoiceOrders() {
  questionSet.forEach((question) => {
    const questionKey =
      getQuestionKey(question.id);

    if (
      !choiceOrders[questionKey] ||
      typeof choiceOrders[questionKey] !== "object"
    ) {
      choiceOrders[questionKey] = {};
    }

    question.blanks.forEach((blank) => {
      const savedOrder =
        choiceOrders[questionKey][blank.id];

      const choiceIds =
        blank.choices.map((choice) => choice.id);

      const isValid =
        Array.isArray(savedOrder) &&
        savedOrder.length === choiceIds.length &&
        savedOrder.every((choiceId) => {
          return choiceIds.includes(choiceId);
        });

      if (!isValid) {
        choiceOrders[questionKey][blank.id] =
          shuffleArray(choiceIds);
      }
    });
  });

  saveState();
}

function createNewChoiceOrder(question) {
  const questionKey =
    getQuestionKey(question.id);

  choiceOrders[questionKey] = {};

  question.blanks.forEach((blank) => {
    const choiceIds =
      blank.choices.map((choice) => {
        return choice.id;
      });

    choiceOrders[questionKey][blank.id] =
      shuffleArray(choiceIds);
  });
}


/* =========================================================
   問題全体の描画
========================================================= */

function renderCurrentQuestion() {
  const question =
    getCurrentQuestion();

  if (!question) {
    renderNoQuestionMessage();
    return;
  }

  ensureQuestionState(question.id);

  activeBlankId =
    getInitialActiveBlank(question.id);

  renderQuestionHeader(question);

  renderPassage(question);

  renderAnswers(question);

  renderResult(question);

  renderExplanations(question);

  renderTranslation(question);

  renderSentenceReview(question);

  updateAnsweredState(question);

  updateNavigationButtons();

  startQuestionTimer(question);

  saveState();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   問題タイトル・進捗
========================================================= */

function renderQuestionHeader(question) {
  questionCategory.textContent =
    "Original Reading";

  questionTitle.textContent =
    question.title ||
    `Question ${question.number}`;

  questionTitleJa.textContent =
    question.titleJa || "";

  currentQuestionNumber.textContent =
    String(currentQuestionIndex + 1);

  totalQuestionNumber.textContent =
    String(questionSet.length);

  const progress =
    (
      (currentQuestionIndex + 1) /
      questionSet.length
    ) * 100;

  progressBar.style.width =
    `${progress}%`;
}


/* =========================================================
   本文表示
========================================================= */

function renderPassage(question) {
  passageContainer.innerHTML = "";

  const questionKey =
    getQuestionKey(question.id);

  const isChecked =
    Boolean(checkedQuestions[questionKey]);

  const fragment =
    document.createDocumentFragment();

  question.paragraphs.forEach((paragraph) => {
    const paragraphElement =
      document.createElement("p");

    paragraphElement.className =
      "passage-paragraph";

    paragraph.sentences.forEach(
      (sentence, sentenceIndex) => {
        const sentenceElement =
          document.createElement("span");

        sentenceElement.className =
          "passage-sentence";

        sentenceElement.dataset.sentenceId =
          sentence.id;

        if (isChecked) {
          sentenceElement.classList.add(
            "review-enabled"
          );

          sentenceElement.tabIndex = 0;

          sentenceElement.setAttribute(
            "role",
            "button"
          );

          sentenceElement.setAttribute(
            "aria-label",
            "この文の日本語訳と重要語句を確認する"
          );

          const openReview = () => {
            openSentenceReview(
              question,
              sentence
            );
          };

          sentenceElement.addEventListener(
            "click",
            openReview
          );

          sentenceElement.addEventListener(
            "keydown",
            (event) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                openReview();
              }
            }
          );
        }

        appendSentenceContent(
          sentenceElement,
          question,
          sentence,
          isChecked
        );

        paragraphElement.appendChild(
          sentenceElement
        );

        if (
          sentenceIndex <
          paragraph.sentences.length - 1
        ) {
          paragraphElement.appendChild(
            document.createTextNode(" ")
          );
        }
      }
    );

    fragment.appendChild(
      paragraphElement
    );
  });

  passageContainer.appendChild(fragment);
}

function appendSentenceContent(
  container,
  question,
  sentence,
  isChecked
) {
  const tokenRegex =
    /\{\{([a-e])\}\}/g;

  let lastIndex = 0;
  let match;

  while (
    (
      match =
        tokenRegex.exec(sentence.en)
    ) !== null
  ) {
    const beforeText =
      sentence.en.slice(
        lastIndex,
        match.index
      );

    container.appendChild(
      document.createTextNode(beforeText)
    );

    container.appendChild(
      createInlineBlank(
        question,
        match[1],
        isChecked
      )
    );

    lastIndex =
      tokenRegex.lastIndex;
  }

  const remainingText =
    sentence.en.slice(lastIndex);

  container.appendChild(
    document.createTextNode(
      remainingText
    )
  );
}

function createInlineBlank(
  question,
  blankId,
  isChecked
) {
  const button =
    document.createElement("button");

  const questionKey =
    getQuestionKey(question.id);

  const selectedChoiceId =
    userAnswers[questionKey]?.[blankId] ||
    null;

  const blank =
    getBlankById(question, blankId);

  const selectedChoice =
    selectedChoiceId
      ? blank.choices.find((choice) => {
          return choice.id ===
            selectedChoiceId;
        })
      : null;

  const answerChoice =
    getAnswerChoice(blank);

  button.type = "button";

  button.className =
    "inline-blank";

  button.dataset.blankId =
    blankId;

  if (blankId === activeBlankId) {
    button.classList.add("active");
  }

  if (selectedChoice) {
    button.classList.add("answered");
  }

  if (isChecked) {
    const isCorrect =
      selectedChoiceId ===
      blank.answer;

    button.classList.add(
      isCorrect
        ? "correct"
        : "incorrect"
    );
  }

  const label =
    document.createElement("span");

  label.className =
    "inline-blank-label";

  label.textContent =
    BLANK_LABELS[blankId];

  const text =
    document.createElement("span");

  text.className =
    "inline-blank-text";

  if (isChecked) {
    text.textContent =
      answerChoice?.text || "";
  } else if (selectedChoice) {
    text.textContent =
      selectedChoice.text;
  } else {
    text.textContent = "選択";
  }

  button.append(
    label,
    text
  );

  button.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      if (isChecked) {
        scrollToExplanation(blankId);
        return;
      }

      selectBlank(blankId);

      if (isMobileLayout()) {
        openMobileAnswersSheet(
          blankId
        );
      } else {
        scrollAnswerCardIntoView(
          blankId
        );
      }
    }
  );

  return button;
}


/* =========================================================
   右側の解答欄
========================================================= */

function renderAnswers(question) {
  answersContainer.innerHTML = "";

  const questionKey =
    getQuestionKey(question.id);

  const isChecked =
    Boolean(checkedQuestions[questionKey]);

  const fragment =
    document.createDocumentFragment();

  question.blanks.forEach((blank) => {
    const card =
      createAnswerCard(
        question,
        blank,
        isChecked
      );

    fragment.appendChild(card);
  });

  answersContainer.appendChild(
    fragment
  );
}

function createAnswerCard(
  question,
  blank,
  isChecked
) {
  const questionKey =
    getQuestionKey(question.id);

  const selectedChoiceId =
    userAnswers[questionKey]?.[blank.id] ||
    null;

  const isCorrect =
    selectedChoiceId === blank.answer;

  const card =
    document.createElement("section");

  card.className =
    "answer-card";

  card.dataset.blankId =
    blank.id;

  if (blank.id === activeBlankId) {
    card.classList.add("active");
  }

  if (isChecked) {
    card.classList.add(
      isCorrect
        ? "correct"
        : "incorrect"
    );
  }

  const header =
    document.createElement("div");

  header.className =
    "answer-card-header";

  const label =
    document.createElement("span");

  label.className =
    "answer-blank-label";

  label.textContent =
    BLANK_LABELS[blank.id];

  const status =
    document.createElement("span");

  status.className =
    "answer-status";

  if (isChecked) {
    status.textContent =
      isCorrect
        ? "正解"
        : "不正解";
  } else if (selectedChoiceId) {
    status.textContent =
      "回答済み";
  } else {
    status.textContent =
      "未回答";
  }

  header.append(
    label,
    status
  );

  const choiceList =
    document.createElement("div");

  choiceList.className =
    "answer-choice-list";

  const orderedChoices =
    getOrderedChoices(
      question,
      blank
    );

  orderedChoices.forEach(
    (choice, index) => {
      const choiceButton =
        createChoiceButton(
          question,
          blank,
          choice,
          index + 1,
          isChecked
        );

      choiceList.appendChild(
        choiceButton
      );
    }
  );

  card.append(
    header,
    choiceList
  );

  card.addEventListener(
    "click",
    () => {
      if (!isChecked) {
        selectBlank(blank.id);
      }
    }
  );

  return card;
}

function createChoiceButton(
  question,
  blank,
  choice,
  displayNumber,
  isChecked
) {
  const questionKey =
    getQuestionKey(question.id);

  const selectedChoiceId =
    userAnswers[questionKey]?.[blank.id] ||
    null;

  const button =
    document.createElement("button");

  button.type = "button";

  button.className =
    "answer-choice-button";

  const isSelected =
    selectedChoiceId === choice.id;

  const isAnswer =
    blank.answer === choice.id;

  if (isSelected) {
    button.classList.add("selected");
  }

  if (
    isChecked &&
    isAnswer
  ) {
    button.classList.add(
      "correct-choice"
    );
  }

  if (
    isChecked &&
    isSelected &&
    !isAnswer
  ) {
    button.classList.add(
      "wrong-choice"
    );
  }

  button.disabled =
    isChecked;

  const number =
    document.createElement("span");

  number.className =
    "choice-number";

  number.textContent =
    String(displayNumber);

  const text =
    document.createElement("span");

  text.className =
    "choice-text";

  text.textContent =
    choice.text;

  const icon =
    document.createElement("span");

  icon.className =
    "choice-result-icon";

  if (
    isChecked &&
    isAnswer
  ) {
    icon.textContent = "✓";
  } else if (
    isChecked &&
    isSelected &&
    !isAnswer
  ) {
    icon.textContent = "×";
  } else {
    icon.textContent = "";
  }

  button.append(
    number,
    text,
    icon
  );

  button.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      if (!isChecked) {
        selectChoice(
          blank.id,
          choice.id
        );
      }
    }
  );

  return button;
}


/* =========================================================
   回答操作
========================================================= */

function selectBlank(blankId) {
  activeBlankId = blankId;

  document
    .querySelectorAll(".inline-blank")
    .forEach((element) => {
      const isActive =
        element.dataset.blankId ===
        blankId;

      element.classList.toggle(
        "active",
        isActive
      );
    });

  document
    .querySelectorAll(".answer-card")
    .forEach((element) => {
      const isActive =
        element.dataset.blankId ===
        blankId;

      element.classList.toggle(
        "active",
        isActive
      );
    });
}

function selectChoice(
  blankId,
  choiceId
) {
  const question =
    getCurrentQuestion();

  if (!question) {
    return;
  }

  const questionKey =
    getQuestionKey(question.id);

  if (checkedQuestions[questionKey]) {
    return;
  }

  ensureQuestionState(
    question.id
  );

  userAnswers[questionKey][blankId] =
    choiceId;

  activeBlankId =
    blankId;

  saveState();

  renderPassage(question);

  renderAnswers(question);

  updateAnsweredState(question);

  if (isMobileLayout()) {
    closeMobileAnswersSheet();
  }
}

function updateAnsweredState(question) {
  const questionKey =
    getQuestionKey(question.id);

  const answers =
    userAnswers[questionKey] || {};

  const answeredCount =
    BLANK_IDS.filter((blankId) => {
      return Boolean(
        answers[blankId]
      );
    }).length;

  const isChecked =
    Boolean(
      checkedQuestions[questionKey]
    );

  answeredCountLabel.textContent =
    `${answeredCount} / ${BLANK_IDS.length} 回答`;

  if (isChecked) {
    checkAnswerButton.disabled = true;

    checkAnswerButton.textContent =
      "採点済み";

    return;
  }

  if (
    answeredCount ===
    BLANK_IDS.length
  ) {
    checkAnswerButton.disabled = false;

    checkAnswerButton.textContent =
      "答え合わせ";
  } else {
    checkAnswerButton.disabled = true;

    checkAnswerButton.textContent =
      `あと${BLANK_IDS.length - answeredCount}問`;
  }
}

/* =========================================================
   採点
========================================================= */

function checkCurrentAnswers() {
  const question =
    getCurrentQuestion();

  if (!question) {
    return;
  }

  const questionKey =
    getQuestionKey(question.id);

  /*
   * 同じ挑戦で複数回採点されるのを防ぐ。
   */
  if (
    checkedQuestions[questionKey]
  ) {
    return;
  }

  const answers =
    userAnswers[questionKey] || {};

  const allAnswered =
    BLANK_IDS.every((blankId) => {
      return Boolean(
        answers[blankId]
      );
    });

  if (!allAnswered) {
    return;
  }

  pauseQuestionTimer();

  let score = 0;

  const details = {};

  question.blanks.forEach((blank) => {
    const selectedChoiceId =
      answers[blank.id];

    const isCorrect =
      selectedChoiceId ===
      blank.answer;

    if (isCorrect) {
      score += 1;
    }

    details[blank.id] = {
      selectedChoiceId,
      answerChoiceId:
        blank.answer,
      isCorrect
    };
  });

  checkedQuestions[questionKey] =
    true;

  questionResults[questionKey] = {
    score,
    total: BLANK_IDS.length,
    details,
    checkedAt: Date.now()
  };

  // ★ v1.1 共通学習ログ
if (typeof window.zenshoLogAdd === "function") {
  BLANK_IDS.forEach((blankId) => {
    window.zenshoLogAdd(
      "q10",
      !!details[blankId]?.isCorrect
    );
  });
}

  recordQuestionAttempt(
  question,
  score
);

  if (
    score === BLANK_IDS.length &&
    !rewardedQuestions[questionKey]
  ) {
    rewardQ10Perfect(
      questionKey
    );
  }

  saveState();

  renderCurrentQuestion();

  resultPanel.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* =========================================================
   ゴイポイント加算
========================================================= */

function rewardQ10Perfect(
  questionKey
) {
  /*
   * 同じ長文問題からの
   * 重複取得を防ぐ
   */
  if (
    rewardedQuestions[questionKey]
  ) {
    return;
  }

  if (
    !window.GoimonUI ||
    typeof window.GoimonUI
      .addReading10Perfect !==
      "function"
  ) {
    console.warn(
      "大問10のゴイモン加算機能を読み込めませんでした。"
    );

    return;
  }

  /*
   * 表：ぶんみゃく +1
   * 裏：q10 +1
   */
  window.GoimonUI
    .addReading10Perfect();

  rewardedQuestions[questionKey] =
    true;

  saveState();
}


/* =========================================================
   採点結果表示
========================================================= */

function renderResult(question) {
  const questionKey =
    getQuestionKey(question.id);

  const result =
    questionResults[questionKey];

  const elapsedTime =
    questionTimes[questionKey] || 0;

  if (
    !checkedQuestions[questionKey] ||
    !result
  ) {
    resultPanel.hidden = true;
    return;
  }

  resultPanel.hidden = false;

  resultScore.textContent =
    `${result.score} / ${result.total}`;

  if (
    result.score ===
    result.total
  ) {
    resultTitle.textContent =
      "全問正解";
  } else {
    resultTitle.textContent =
      "採点結果";
  }

  const timeText =
    formatElapsedTime(
      elapsedTime
    );

  if (
    result.score ===
    result.total
  ) {
    resultMessage.textContent =
      `5問すべて正解です。` +
      `解答時間は${timeText}でした。` +
      `文ごとの復習で重要語句も確認しましょう。`;

    return;
  }

  if (result.score >= 3) {
    resultMessage.textContent =
      `${result.score}問正解です。` +
      `解答時間は${timeText}でした。` +
      `誤答の理由まで確認すると、` +
      `次の問題で判断しやすくなります。`;

    return;
  }

  resultMessage.textContent =
    `${result.score}問正解です。` +
    `解答時間は${timeText}でした。` +
    `正答だけでなく、` +
    `ほかの選択肢が入らない理由も確認しましょう。`;
}


/* =========================================================
   空欄ごとの解説表示
========================================================= */

function renderExplanations(question) {
  const questionKey =
    getQuestionKey(question.id);

  const result =
    questionResults[questionKey];

  explanationsContainer.innerHTML =
    "";

  if (
    !checkedQuestions[questionKey] ||
    !result
  ) {
    explanationsPanel.hidden = true;
    return;
  }

  explanationsPanel.hidden = false;

  const fragment =
    document.createDocumentFragment();

  question.blanks.forEach((blank) => {
    const card =
      createExplanationCard(
        question,
        blank,
        result
      );

    fragment.appendChild(card);
  });

  explanationsContainer.appendChild(
    fragment
  );
}

function createExplanationCard(
  question,
  blank,
  result
) {
  const detail =
    result.details[blank.id];

  const selectedChoice =
    blank.choices.find((choice) => {
      return (
        choice.id ===
        detail.selectedChoiceId
      );
    });

  const answerChoice =
    getAnswerChoice(blank);

  const card =
    document.createElement("article");

  card.className =
    `explanation-card ${
      detail.isCorrect
        ? "correct"
        : "incorrect"
    }`;

  card.dataset.blankId =
    blank.id;

  const heading =
    document.createElement("div");

  heading.className =
    "explanation-heading";

  const title =
    document.createElement("h3");

  title.className =
    "explanation-title";

  const badge =
    document.createElement("span");

  badge.className =
    "explanation-blank-badge";

  badge.textContent =
    BLANK_LABELS[blank.id];

  const titleText =
    document.createElement("span");

  titleText.textContent =
    `空所 ${BLANK_LABELS[blank.id]}`;

  title.append(
    badge,
    titleText
  );

  const resultLabel =
    document.createElement("span");

  resultLabel.className =
    "explanation-result-label";

  resultLabel.textContent =
    detail.isCorrect
      ? "正解"
      : "不正解";

  heading.append(
    title,
    resultLabel
  );

  const comparison =
    document.createElement("div");

  comparison.className =
    "answer-comparison";

  const userAnswerBox =
    createComparisonBox(
      "あなたの解答",
      selectedChoice?.text ||
        "未回答",
      detail.isCorrect
        ? "correct-answer"
        : "user-wrong"
    );

  const correctAnswerBox =
    createComparisonBox(
      "正答",
      answerChoice?.text || "",
      "correct-answer"
    );

  comparison.append(
    userAnswerBox,
    correctAnswerBox
  );

  const explanation =
    document.createElement("p");

  explanation.className =
    "explanation-main";

  explanation.textContent =
    blank.explanation || "";

  const wrongReasons =
    document.createElement("div");

  wrongReasons.className =
    "wrong-reasons";

  const wrongTitle =
    document.createElement("p");

  wrongTitle.className =
    "wrong-reasons-title";

  wrongTitle.textContent =
    "ほかの選択肢が入らない理由";

  const wrongList =
    document.createElement("ul");

  wrongList.className =
    "wrong-reason-list";

  const orderedChoices =
    getOrderedChoices(
      question,
      blank
    );

  orderedChoices
    .filter((choice) => {
      return (
        choice.id !==
        blank.answer
      );
    })
    .forEach((choice) => {
      const item =
        document.createElement("li");

      item.className =
        "wrong-reason-item";

      const label =
        document.createElement("span");

      label.className =
        "wrong-choice-label";

      label.textContent =
        choice.text;

      const reason =
        document.createElement("span");

      reason.textContent =
        blank
          .wrongChoiceReasons?.[
            choice.id
          ] ||
        "この文脈には合いません。";

      item.append(
        label,
        reason
      );

      wrongList.appendChild(
        item
      );
    });

  wrongReasons.append(
    wrongTitle,
    wrongList
  );

  card.append(
    heading,
    comparison,
    explanation,
    wrongReasons
  );

  return card;
}

function createComparisonBox(
  labelText,
  valueText,
  className
) {
  const box =
    document.createElement("div");

  box.className =
    `answer-comparison-box ${
      className || ""
    }`.trim();

  const label =
    document.createElement("span");

  label.className =
    "answer-comparison-label";

  label.textContent =
    labelText;

  const value =
    document.createElement("span");

  value.className =
    "answer-comparison-value";

  value.textContent =
    valueText;

  box.append(
    label,
    value
  );

  return box;
}


/* =========================================================
   全文日本語訳
========================================================= */

function renderTranslation(question) {
  const questionKey =
    getQuestionKey(question.id);

  translationContainer.innerHTML =
    "";

  if (
    !checkedQuestions[questionKey]
  ) {
    translationPanel.hidden = true;
    return;
  }

  translationPanel.hidden = false;

  question.paragraphs.forEach(
    (paragraph) => {
      const paragraphElement =
        document.createElement("p");

      paragraphElement.className =
        "translation-paragraph";

      paragraphElement.textContent =
        paragraph.sentences
          .map((sentence) => {
            return sentence.ja;
          })
          .join("");

      translationContainer.appendChild(
        paragraphElement
      );
    }
  );

  translationContainer.hidden =
    true;

  toggleTranslationButton.setAttribute(
    "aria-expanded",
    "false"
  );

  translationToggleIcon.textContent =
    "＋";
}

function toggleTranslation() {
  const willOpen =
    translationContainer.hidden;

  translationContainer.hidden =
    !willOpen;

  toggleTranslationButton.setAttribute(
    "aria-expanded",
    String(willOpen)
  );

  translationToggleIcon.textContent =
    willOpen
      ? "−"
      : "＋";
}

/* =========================================================
   文ごとの復習
========================================================= */

function renderSentenceReview(question) {
  const questionKey =
    getQuestionKey(question.id);

  sentenceReviewContainer.innerHTML =
    "";

  if (
    !checkedQuestions[questionKey]
  ) {
    sentenceReviewPanel.hidden = true;
    return;
  }

  sentenceReviewPanel.hidden = false;

  let sentenceNumber = 0;

  question.paragraphs.forEach(
    (paragraph) => {
      paragraph.sentences.forEach(
        (sentence) => {
          sentenceNumber += 1;

          const item =
            createSentenceReviewItem(
              question,
              sentence,
              sentenceNumber
            );

          sentenceReviewContainer.appendChild(
            item
          );
        }
      );
    }
  );
}

function createSentenceReviewItem(
  question,
  sentence,
  sentenceNumber
) {
  const item =
    document.createElement("article");

  item.className =
    "sentence-review-item";

  const button =
    document.createElement("button");

  button.type = "button";

  button.className =
    "sentence-review-button";

  button.setAttribute(
    "aria-expanded",
    "false"
  );

  const number =
    document.createElement("span");

  number.className =
    "sentence-number";

  number.textContent =
    String(sentenceNumber);

  const english =
    document.createElement("span");

  english.className =
    "sentence-review-en";

  english.textContent =
    getCompletedSentenceText(
      question,
      sentence
    );

  const icon =
    document.createElement("span");

  icon.className =
    "sentence-toggle-icon";

  icon.textContent = "＋";

  button.append(
    number,
    english,
    icon
  );

  const content =
    document.createElement("div");

  content.className =
    "sentence-review-content";

  content.hidden = true;

  const reviewContent =
    createSentenceReviewContent(
      question,
      sentence
    );

  content.appendChild(
    reviewContent
  );

  button.addEventListener(
    "click",
    () => {
      const willOpen =
        content.hidden;

      content.hidden =
        !willOpen;

      item.classList.toggle(
        "open",
        willOpen
      );

      button.setAttribute(
        "aria-expanded",
        String(willOpen)
      );

      icon.textContent =
        willOpen
          ? "−"
          : "＋";
    }
  );

  item.append(
    button,
    content
  );

  return item;
}

function createSentenceReviewContent(
  question,
  sentence
) {
  const wrapper =
    document.createElement("div");

  const japanese =
    document.createElement("p");

  japanese.className =
    "sentence-review-ja";

  japanese.textContent =
    sentence.ja;

  wrapper.appendChild(
    japanese
  );

  const notes =
    Array.isArray(sentence.notes)
      ? sentence.notes
      : [];

  if (notes.length > 0) {
    const list =
      document.createElement("div");

    list.className =
      "expression-list";

    notes.forEach((note) => {
      const item =
        createExpressionItem(
          question,
          sentence,
          note
        );

      list.appendChild(item);
    });

    wrapper.appendChild(list);
  }

  return wrapper;
}

function createExpressionItem(
  question,
  sentence,
  note
) {
  const item =
    document.createElement("div");

  item.className =
    "expression-item";

  if (!note.weakEligible) {
    item.classList.add(
      "no-register"
    );
  }

  const english =
    document.createElement("span");

  english.className =
    "expression-en";

  english.textContent =
    note.expression;

  const meaningButton =
    document.createElement("button");

  meaningButton.type =
    "button";

  meaningButton.className =
    "expression-meaning-button masked";

  meaningButton.dataset.meaning =
    note.meaning;

  meaningButton.textContent =
    "タップして意味を表示";

  meaningButton.setAttribute(
    "aria-label",
    `${note.expression}の意味を表示`
  );

  meaningButton.setAttribute(
    "aria-pressed",
    "false"
  );

  meaningButton.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      const isRevealed =
        meaningButton.classList.contains(
          "revealed"
        );

      if (isRevealed) {
        meaningButton.classList.remove(
          "revealed"
        );

        meaningButton.classList.add(
          "masked"
        );

        meaningButton.textContent =
          "タップして意味を表示";

        meaningButton.setAttribute(
          "aria-pressed",
          "false"
        );
      } else {
        meaningButton.classList.remove(
          "masked"
        );

        meaningButton.classList.add(
          "revealed"
        );

        meaningButton.textContent =
          note.meaning;

        meaningButton.setAttribute(
          "aria-pressed",
          "true"
        );
      }
    }
  );

  item.append(
    english,
    meaningButton
  );

  if (note.weakEligible) {
    const button =
      document.createElement("button");

    button.type =
      "button";

    button.className =
      "add-weak-button";

    button.dataset.noteId =
      note.id;

    const isRegistered =
      Boolean(
        weakExpressions[note.id]
      );

    button.classList.toggle(
      "registered",
      isRegistered
    );

    button.textContent =
      isRegistered
        ? "登録済み"
        : "苦手に入れる";

    button.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();

        if (
          weakExpressions[note.id]
        ) {
          removeWeakExpression(
            note.id
          );
        } else {
          addWeakExpression(
            question,
            sentence,
            note
          );
        }

        refreshWeakRegistrationButtons(
          note.id
        );
      }
    );

    item.appendChild(
      button
    );
  }

  return item;
}

function refreshWeakRegistrationButtons(
  noteId
) {
  const isRegistered =
    Boolean(
      weakExpressions[noteId]
    );

  const buttons =
    document.querySelectorAll(
      `.add-weak-button[data-note-id="${noteId}"]`
    );

  buttons.forEach((button) => {
    button.classList.toggle(
      "registered",
      isRegistered
    );

    button.textContent =
      isRegistered
        ? "登録済み"
        : "苦手に入れる";
  });
}


/* =========================================================
   本文中の文クリック
========================================================= */

function openSentenceReview(
  question,
  sentence
) {
  const questionKey =
    getQuestionKey(question.id);

  if (
    !checkedQuestions[questionKey]
  ) {
    return;
  }

  if (isMobileLayout()) {
    openSentenceReviewSheet(
      question,
      sentence
    );

    return;
  }

  const completedText =
    getCompletedSentenceText(
      question,
      sentence
    );

  const buttons = [
    ...sentenceReviewContainer
      .querySelectorAll(
        ".sentence-review-button"
      )
  ];

  const targetButton =
    buttons.find((button) => {
      const english =
        button.querySelector(
          ".sentence-review-en"
        );

      return (
        english?.textContent ===
        completedText
      );
    });

  if (!targetButton) {
    return;
  }

  const item =
    targetButton.closest(
      ".sentence-review-item"
    );

  const content =
    item?.querySelector(
      ".sentence-review-content"
    );

  const icon =
    item?.querySelector(
      ".sentence-toggle-icon"
    );

  if (
    content &&
    content.hidden
  ) {
    content.hidden = false;

    item.classList.add("open");

    targetButton.setAttribute(
      "aria-expanded",
      "true"
    );

    if (icon) {
      icon.textContent = "−";
    }
  }

  item?.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


/* =========================================================
   スマホ用・文の復習シート
========================================================= */

function openSentenceReviewSheet(
  question,
  sentence
) {
  sentenceReviewSheetHeading.textContent =
    "文の復習";

  sentenceReviewSheetContent.innerHTML =
    "";

  const english =
    document.createElement("p");

  english.className =
    "sheet-sentence-en";

  english.textContent =
    getCompletedSentenceText(
      question,
      sentence
    );

  const japanese =
    document.createElement("p");

  japanese.className =
    "sheet-sentence-ja";

  japanese.textContent =
    sentence.ja;

  sentenceReviewSheetContent.append(
    english,
    japanese
  );

  const notes =
    Array.isArray(sentence.notes)
      ? sentence.notes
      : [];

  if (notes.length > 0) {
    const list =
      document.createElement("div");

    list.className =
      "expression-list";

    notes.forEach((note) => {
      const item =
        createExpressionItem(
          question,
          sentence,
          note
        );

      list.appendChild(item);
    });

    sentenceReviewSheetContent.appendChild(
      list
    );
  }

  sentenceSheetOverlay.hidden =
    false;

  sentenceReviewSheet.hidden =
    false;

  document.body.style.overflow =
    "hidden";
}

function closeSentenceReviewSheet() {
  sentenceSheetOverlay.hidden =
    true;

  sentenceReviewSheet.hidden =
    true;

  restoreBodyScroll();
}


/* =========================================================
   苦手語句登録
========================================================= */

function addWeakExpression(
  question,
  sentence,
  note
) {
  weakExpressions[note.id] = {
    id: note.id,

    expression:
      note.expression,

    meaning:
      note.meaning,

    questionId:
      question.id,

    questionNumber:
      question.number,

    questionTitle:
      question.title,

    sentenceId:
      sentence.id,

    sentenceEn:
      getCompletedSentenceText(
        question,
        sentence
      ),

    sentenceJa:
      sentence.ja,

    learned: false,

    addedAt:
      Date.now()
  };

  saveWeakExpressions();
}

function removeWeakExpression(
  noteId
) {
  delete weakExpressions[noteId];

  saveWeakExpressions();
}

function toggleLearnedWeakExpression(
  noteId
) {
  if (
    !weakExpressions[noteId]
  ) {
    return;
  }

  weakExpressions[noteId].learned =
    !weakExpressions[noteId].learned;

  saveWeakExpressions();

  renderWeakList();
}


/* =========================================================
   苦手語句一覧モーダル
========================================================= */

function openWeakListModal() {
  renderWeakList();

  weakListOverlay.hidden =
    false;

  weakListModal.hidden =
    false;

  document.body.style.overflow =
    "hidden";
}

function closeWeakListModal() {
  weakListOverlay.hidden =
    true;

  weakListModal.hidden =
    true;

  restoreBodyScroll();
}

function renderWeakList() {
  weakListContainer.innerHTML =
    "";

  const items =
    Object.values(
      weakExpressions
    ).sort((a, b) => {
      if (
        a.learned !== b.learned
      ) {
        return (
          Number(a.learned) -
          Number(b.learned)
        );
      }

      return (
        b.addedAt -
        a.addedAt
      );
    });

  toggleWeakMeaningsButton.textContent =
    weakMeaningsVisible
      ? "日本語を隠す"
      : "日本語を表示";

  toggleWeakExamplesButton.textContent =
    weakExamplesVisible
      ? "例文訳を隠す"
      : "例文訳を表示";

  if (items.length === 0) {
    const empty =
      document.createElement("p");

    empty.className =
      "weak-empty-message";

    empty.textContent =
      "まだ苦手語句は登録されていません。" +
      "採点後の文ごとの復習から追加できます。";

    weakListContainer.appendChild(
      empty
    );

    return;
  }

  items.forEach((item) => {
    const card =
      createWeakExpressionCard(
        item
      );

    weakListContainer.appendChild(
      card
    );
  });
}

function createWeakExpressionCard(
  item
) {
  const card =
    document.createElement("article");

  card.className =
    "weak-expression-card";

  if (item.learned) {
    card.classList.add(
      "learned"
    );
  }

  const head =
    document.createElement("div");

  head.className =
    "weak-expression-head";

  const titleArea =
    document.createElement("div");

  const title =
    document.createElement("h3");

  title.className =
    "weak-expression-title";

  title.textContent =
    item.expression;

  const meaningIsRevealed =
    weakMeaningsVisible ||
    individuallyRevealedMeanings.has(
      item.id
    );

  const meaningButton =
    document.createElement("button");

  meaningButton.type =
    "button";

  meaningButton.className =
    "weak-mask-button";

  meaningButton.classList.toggle(
    "revealed",
    meaningIsRevealed
  );

  meaningButton.classList.toggle(
    "masked",
    !meaningIsRevealed
  );

  meaningButton.textContent =
    meaningIsRevealed
      ? item.meaning
      : "意味を表示";

  meaningButton.setAttribute(
    "aria-pressed",
    String(meaningIsRevealed)
  );

  meaningButton.addEventListener(
    "click",
    () => {
      if (weakMeaningsVisible) {
        weakMeaningsVisible =
          false;

        individuallyRevealedMeanings =
          new Set([item.id]);
      } else if (
        individuallyRevealedMeanings.has(
          item.id
        )
      ) {
        individuallyRevealedMeanings.delete(
          item.id
        );
      } else {
        individuallyRevealedMeanings.add(
          item.id
        );
      }

      renderWeakList();
    }
  );

  const source =
    document.createElement("p");

  source.className =
    "weak-expression-source";

  source.textContent =
    `Question ${item.questionNumber}：` +
    `${item.questionTitle}`;

  titleArea.append(
    title,
    meaningButton,
    source
  );

  head.appendChild(
    titleArea
  );

  const example =
    document.createElement("div");

  example.className =
    "weak-example";

  const exampleEn =
    document.createElement("p");

  exampleEn.className =
    "weak-example-en";

  exampleEn.textContent =
    item.sentenceEn;

  const exampleIsRevealed =
    weakExamplesVisible ||
    individuallyRevealedExamples.has(
      item.id
    );

  const exampleJaButton =
    document.createElement("button");

  exampleJaButton.type =
    "button";

  exampleJaButton.className =
    "weak-mask-button example-mask";

  exampleJaButton.classList.toggle(
    "revealed",
    exampleIsRevealed
  );

  exampleJaButton.classList.toggle(
    "masked",
    !exampleIsRevealed
  );

  exampleJaButton.textContent =
    exampleIsRevealed
      ? item.sentenceJa
      : "例文の日本語訳を表示";

  exampleJaButton.setAttribute(
    "aria-pressed",
    String(exampleIsRevealed)
  );

  exampleJaButton.addEventListener(
    "click",
    () => {
      if (weakExamplesVisible) {
        weakExamplesVisible =
          false;

        individuallyRevealedExamples =
          new Set([item.id]);
      } else if (
        individuallyRevealedExamples.has(
          item.id
        )
      ) {
        individuallyRevealedExamples.delete(
          item.id
        );
      } else {
        individuallyRevealedExamples.add(
          item.id
        );
      }

      renderWeakList();
    }
  );

  example.append(
    exampleEn,
    exampleJaButton
  );

  const actions =
    document.createElement("div");

  actions.className =
    "weak-card-actions";

  const learnedButton =
    document.createElement("button");

  learnedButton.type =
    "button";

  learnedButton.className =
    "weak-action-button " +
    "learned-button";

  learnedButton.textContent =
    item.learned
      ? "まだ苦手に戻す"
      : "覚えた";

  learnedButton.addEventListener(
    "click",
    () => {
      toggleLearnedWeakExpression(
        item.id
      );
    }
  );

  const removeButton =
    document.createElement("button");

  removeButton.type =
    "button";

  removeButton.className =
    "weak-action-button " +
    "remove-button";

  removeButton.textContent =
    "削除";

  removeButton.addEventListener(
    "click",
    () => {
      removeWeakExpression(
        item.id
      );

      individuallyRevealedMeanings.delete(
        item.id
      );

      individuallyRevealedExamples.delete(
        item.id
      );

      renderWeakList();

      refreshWeakRegistrationButtons(
        item.id
      );
    }
  );

  actions.append(
    learnedButton,
    removeButton
  );

  card.append(
    head,
    example,
    actions
  );

  return card;
}


/* =========================================================
   苦手語句の日本語表示切替
========================================================= */

function toggleWeakMeanings() {
  weakMeaningsVisible =
    !weakMeaningsVisible;

  individuallyRevealedMeanings.clear();

  renderWeakList();
}

function toggleWeakExamples() {
  weakExamplesVisible =
    !weakExamplesVisible;

  individuallyRevealedExamples.clear();

  renderWeakList();
}

/* =========================================================
   苦手語句の保存
========================================================= */

function saveWeakExpressions() {
  try {
    localStorage.setItem(
      WEAK_STORAGE_KEY,
      JSON.stringify(
        weakExpressions
      )
    );
  } catch (error) {
    console.warn(
      "苦手語句を保存できませんでした。",
      error
    );
  }
}

function loadWeakExpressions() {
  try {
    const savedText =
      localStorage.getItem(
        WEAK_STORAGE_KEY
      );

    if (!savedText) {
      weakExpressions = {};
      return;
    }

    const saved =
      JSON.parse(savedText);

    if (
      saved &&
      typeof saved === "object" &&
      !Array.isArray(saved)
    ) {
      weakExpressions =
        saved;
    } else {
      weakExpressions = {};
    }
  } catch (error) {
    console.warn(
      "苦手語句を読み込めませんでした。",
      error
    );

    weakExpressions = {};
  }
}

/* =========================================================
   スマホ用・選択肢シート
========================================================= */

function openMobileAnswersSheet(
  blankId
) {
  const question =
    getCurrentQuestion();

  if (!question) {
    return;
  }

  activeBlankId =
    blankId;

  mobileActiveBlankLabel.textContent =
    `空所 ${BLANK_LABELS[blankId]}`;

  renderMobileAnswers(
    question,
    blankId
  );

  mobileSheetOverlay.hidden =
    false;

  mobileAnswersSheet.hidden =
    false;

  document.body.style.overflow =
    "hidden";
}

function renderMobileAnswers(
  question,
  blankId
) {
  mobileAnswersContainer.innerHTML =
    "";

  const questionKey =
    getQuestionKey(question.id);

  const blank =
    getBlankById(
      question,
      blankId
    );

  if (!blank) {
    return;
  }

  const isChecked =
    Boolean(
      checkedQuestions[questionKey]
    );

  const orderedChoices =
    getOrderedChoices(
      question,
      blank
    );

  orderedChoices.forEach(
    (choice, index) => {
      const button =
        createChoiceButton(
          question,
          blank,
          choice,
          index + 1,
          isChecked
        );

      mobileAnswersContainer.appendChild(
        button
      );
    }
  );
}

function closeMobileAnswersSheet() {
  mobileSheetOverlay.hidden =
    true;

  mobileAnswersSheet.hidden =
    true;

  restoreBodyScroll();
}


/* =========================================================
   出題範囲の選択肢
========================================================= */

function setupRangeSelects() {
  const sortedQuestions = [
    ...q10Questions
  ].sort((a, b) => {
    return a.number - b.number;
  });

  questionRangeStart.innerHTML =
    "";

  questionRangeEnd.innerHTML =
    "";

  sortedQuestions.forEach(
    (question) => {
      const startOption =
        document.createElement(
          "option"
        );

      startOption.value =
        String(question.number);

      startOption.textContent =
        `Question ${question.number}`;

      const endOption =
        startOption.cloneNode(true);

      questionRangeStart.appendChild(
        startOption
      );

      questionRangeEnd.appendChild(
        endOption
      );
    }
  );

  questionRangeStart.value =
    String(
      currentSettings.startNumber
    );

  questionRangeEnd.value =
    String(
      currentSettings.endNumber
    );
}


/* =========================================================
   出題設定モーダル
========================================================= */

function openSettingsModal() {
  pauseQuestionTimer();

  const orderInput =
    document.querySelector(
      `input[name="questionOrder"]` +
      `[value="${currentSettings.order}"]`
    );

  if (orderInput) {
    orderInput.checked = true;
  }

  questionRangeStart.value =
    String(
      currentSettings.startNumber
    );

  questionRangeEnd.value =
    String(
      currentSettings.endNumber
    );

  /*
   * 問題ごとの挑戦回数を更新
   */
  renderQuestionHistory();

  settingsModalOverlay.hidden =
    false;

  settingsModal.hidden =
    false;

  document.body.style.overflow =
    "hidden";
}

function closeSettingsModal() {

  /*
   * 初回設定中
   */
  if (!sessionStarted) {

    settingsModalOverlay.hidden =
      true;

    settingsModal.hidden =
      true;

    showSettingsGuide();

    return;
  }


  /*
   * 問題開始後
   */
  settingsModalOverlay.hidden =
    true;

  settingsModal.hidden =
    true;

  document.body.classList.remove(
    "setup-mode"
  );

  restoreBodyScroll();


  const question =
    getCurrentQuestion();

  if (question) {
    startQuestionTimer(
      question
    );
  }
}

/* =========================================================
   初回設定ガイド
========================================================= */

let settingsGuideOverlay = null;
let settingsGuideModal = null;


function createSettingsGuideModal() {

  if (document.getElementById("settingsGuideOverlay")) {

    settingsGuideOverlay =
      document.getElementById(
        "settingsGuideOverlay"
      );

    settingsGuideModal =
      document.getElementById(
        "settingsGuideModal"
      );

    return;
  }


  const style =
    document.createElement("style");

  style.textContent = `
    .settings-guide-overlay {
      position: fixed;
      inset: 0;
      z-index: 9998;
      background: rgba(0, 0, 0, 0.46);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px;
      box-sizing: border-box;
    }

    .settings-guide-overlay[hidden] {
      display: none !important;
    }

    .settings-guide-modal {
      position: relative;
      z-index: 9999;
      width: min(620px, 100%);
      max-height: calc(100vh - 36px);
      overflow-y: auto;
      background: #fff;
      border-radius: 20px;
      padding: 24px;
      box-sizing: border-box;
      box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.2);
    }

    .settings-guide-close {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 42px;
      height: 42px;
      border: 0;
      border-radius: 50%;
      background: #f1f3f5;
      font-size: 24px;
      cursor: pointer;
    }

    .settings-guide-heading {
      margin: 0;
      padding-right: 50px;
      font-size: 24px;
      font-weight: 800;
    }

    .settings-guide-lead {
      margin: 8px 0 18px;
      color: #555;
      line-height: 1.7;
    }

    .settings-guide-visual {
      display: flex;
      justify-content: center;
      margin: 4px 0 20px;
    }

    .settings-guide-image {
      width: min(220px, 62%);
      height: auto;
      display: block;
    }

    .settings-guide-options {
      display: grid;
      gap: 12px;
    }

    .settings-guide-option {
      border: 1px solid #dfe3e8;
      border-radius: 16px;
      padding: 16px;
      background: #fff;
    }

    .settings-guide-option-title {
      margin: 0 0 5px;
      font-size: 17px;
      font-weight: 800;
    }

    .settings-guide-option-setting {
      margin: 0 0 5px;
      font-weight: 700;
    }

    .settings-guide-option-note {
      margin: 0 0 12px;
      color: #666;
      font-size: 14px;
      line-height: 1.55;
    }

    .settings-guide-use {
      width: 100%;
      min-height: 44px;
      border: 0;
      border-radius: 12px;
      background: #2673e8;
      color: #fff;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
    }

    .settings-guide-footer {
      display: grid;
      gap: 10px;
      margin-top: 20px;
    }

    .settings-guide-back {
      min-height: 48px;
      border: 1px solid #cfd5dc;
      border-radius: 12px;
      background: #fff;
      font-weight: 800;
      cursor: pointer;
    }

    .settings-guide-home {
      min-height: 46px;
      border: 0;
      background: transparent;
      color: #555;
      text-decoration: underline;
      font-weight: 700;
      cursor: pointer;
    }

    @media (max-width: 520px) {
      .settings-guide-modal {
        padding: 20px 16px;
      }

      .settings-guide-heading {
        font-size: 21px;
      }
    }
  `;

  document.head.appendChild(style);


  settingsGuideOverlay =
    document.createElement("div");

  settingsGuideOverlay.id =
    "settingsGuideOverlay";

  settingsGuideOverlay.className =
    "settings-guide-overlay";

  settingsGuideOverlay.hidden =
    true;


  settingsGuideModal =
    document.createElement("div");

  settingsGuideModal.id =
    "settingsGuideModal";

  settingsGuideModal.className =
    "settings-guide-modal";


  const guideImage = `
    <svg
      viewBox="0 0 260 160"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="48"
        y="90"
        width="164"
        height="48"
        rx="12"
        fill="#eef4ff"
      />

      <circle
        cx="130"
        cy="57"
        r="36"
        fill="#ffe7a8"
      />

      <circle cx="118" cy="52" r="4" fill="#333"/>
      <circle cx="142" cy="52" r="4" fill="#333"/>

      <path
        d="M119 68 Q130 77 141 68"
        fill="none"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="round"
      />

      <rect
        x="78"
        y="101"
        width="48"
        height="28"
        rx="4"
        fill="#fff"
        stroke="#4776d0"
        stroke-width="3"
      />

      <rect
        x="134"
        y="101"
        width="48"
        height="28"
        rx="4"
        fill="#fff"
        stroke="#4776d0"
        stroke-width="3"
      />

      <path
        d="M130 103 L130 133"
        stroke="#4776d0"
        stroke-width="3"
      />

      <circle
        cx="191"
        cy="38"
        r="19"
        fill="#fff3c4"
      />

      <text
        x="191"
        y="45"
        text-anchor="middle"
        font-size="25"
      >?</text>
    </svg>
  `;

  const imageSrc =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(guideImage);


  const maxQuestionNumber =
    q10Questions.reduce(
      function (max, question) {
        return Math.max(
          max,
          Number(question.number) || 0
        );
      },
      1
    );


  settingsGuideModal.innerHTML = `
    <button
      type="button"
      class="settings-guide-close"
      id="closeSettingsGuideButton"
      aria-label="おすすめ設定を閉じる"
    >
      ×
    </button>

    <h2 class="settings-guide-heading">
      どの設定で始めればいい？
    </h2>

    <p class="settings-guide-lead">
      大問10は1問に読む量が多いので、
      最初は少ない問題数から取り組むのがおすすめです。
    </p>

    <div class="settings-guide-visual">
      <img
        class="settings-guide-image"
        src="${imageSrc}"
        alt="学習設定について考えているイラスト"
      >
    </div>


    <div class="settings-guide-options">

      <section class="settings-guide-option">

        <h3 class="settings-guide-option-title">
          🌱 はじめて取り組む
        </h3>

        <p class="settings-guide-option-setting">
          No.1〜2 ／ 番号順
        </p>

        <p class="settings-guide-option-note">
          まずは2問程度で、本文の読み方と5つの空欄の解き方に慣れよう。
        </p>

        <button
          type="button"
          class="settings-guide-use"
          data-guide-order="sequential"
          data-guide-start="1"
          data-guide-end="2"
        >
          この設定にする
        </button>

      </section>


      <section class="settings-guide-option">

        <h3 class="settings-guide-option-title">
          🔀 復習したい
        </h3>

        <p class="settings-guide-option-setting">
          No.1〜5 ／ ランダム
        </p>

        <p class="settings-guide-option-note">
          一度取り組んだ範囲を、順番に頼らず解けるか確認しよう。
        </p>

        <button
          type="button"
          class="settings-guide-use"
          data-guide-order="random"
          data-guide-start="1"
          data-guide-end="5"
        >
          この設定にする
        </button>

      </section>


      <section class="settings-guide-option">

        <h3 class="settings-guide-option-title">
          🎯 未挑戦を進めたい
        </h3>

        <p class="settings-guide-option-setting">
          全範囲 ／ 挑戦回数が少ない順
        </p>

        <p class="settings-guide-option-note">
          まだ解いていない長文から優先して取り組もう。
        </p>

        <button
          type="button"
          class="settings-guide-use"
          data-guide-order="unattempted"
          data-guide-start="1"
          data-guide-end="${maxQuestionNumber}"
        >
          この設定にする
        </button>

      </section>

    </div>


    <div class="settings-guide-footer">

      <button
        type="button"
        class="settings-guide-back"
        id="backToSettingsButton"
      >
        出題設定に戻る
      </button>

      <button
        type="button"
        class="settings-guide-home"
        id="settingsGuideHomeButton"
      >
        ホームに戻る
      </button>

    </div>
  `;


  settingsGuideOverlay.appendChild(
    settingsGuideModal
  );

  document.body.appendChild(
    settingsGuideOverlay
  );


  document
    .getElementById(
      "closeSettingsGuideButton"
    )
    .addEventListener(
      "click",
      hideGuideAndReturnToSettings
    );


  document
    .getElementById(
      "backToSettingsButton"
    )
    .addEventListener(
      "click",
      hideGuideAndReturnToSettings
    );


  document
    .getElementById(
      "settingsGuideHomeButton"
    )
    .addEventListener(
      "click",
      function () {
        window.location.href =
          "index.html";
      }
    );


  settingsGuideOverlay.addEventListener(
    "click",
    function (event) {

      if (
        event.target ===
        settingsGuideOverlay
      ) {
        hideGuideAndReturnToSettings();
      }
    }
  );


  settingsGuideModal
    .querySelectorAll(
      "[data-guide-order]"
    )
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          applyRecommendedSettingsToForm(
            button.dataset.guideOrder,
            Number(
              button.dataset.guideStart
            ),
            Number(
              button.dataset.guideEnd
            )
          );
        }
      );
    });
}


function showSettingsGuide() {

  createSettingsGuideModal();

  settingsGuideOverlay.hidden =
    false;

  document.body.style.overflow =
    "hidden";
}


function hideSettingsGuide() {

  if (!settingsGuideOverlay) {
    return;
  }

  settingsGuideOverlay.hidden =
    true;
}


function hideGuideAndReturnToSettings() {

  hideSettingsGuide();

  openSettingsModal();
}


function applyRecommendedSettingsToForm(
  order,
  startNumber,
  endNumber
) {

  const maxNumber =
    q10Questions.reduce(
      function (max, question) {
        return Math.max(
          max,
          Number(question.number) || 0
        );
      },
      1
    );


  const safeStart =
    Math.max(
      1,
      Math.min(
        Number(startNumber) || 1,
        maxNumber
      )
    );


  const safeEnd =
    Math.max(
      safeStart,
      Math.min(
        Number(endNumber) || maxNumber,
        maxNumber
      )
    );


  const orderInput =
    document.querySelector(
      `input[name="questionOrder"][value="${order}"]`
    );


  if (orderInput) {
    orderInput.checked =
      true;
  }


  questionRangeStart.value =
    String(safeStart);

  questionRangeEnd.value =
    String(safeEnd);


  hideSettingsGuide();


  settingsModalOverlay.hidden =
    false;

  settingsModal.hidden =
    false;

  document.body.style.overflow =
    "hidden";
}

function applyQuestionSettings() {
  const orderInput =
    document.querySelector(
      'input[name="questionOrder"]:checked'
    );

  const selectedOrder =
  normalizeQuestionOrder(
    orderInput?.value
  );

  const startNumber =
    Number(
      questionRangeStart.value
    );

  const endNumber =
    Number(
      questionRangeEnd.value
    );

  currentSettings = {
    order:
      selectedOrder,

    startNumber:
      Number.isFinite(startNumber)
        ? startNumber
        : 1,

    endNumber:
      Number.isFinite(endNumber)
        ? endNumber
        : q10Questions.length
  };

  currentQuestionIndex =
    0;

  createQuestionSet();

  sessionStarted =
    true;

  settingsModalOverlay.hidden =
    true;

  settingsModal.hidden =
    true;

  document.body.classList.remove(
    "setup-mode"
  );

  restoreBodyScroll();

  renderCurrentQuestion();
}

/* =========================================================
   指定した問題から番号順で開始
========================================================= */

function startSelectedQuestion(
  questionId
) {
  const selectedQuestion =
    q10Questions.find(
      (question) => {
        return (
          question.id === questionId
        );
      }
    );

  if (!selectedQuestion) {
    console.warn(
      "指定された問題が見つかりません。",
      questionId
    );

    return;
  }

  pauseQuestionTimer();

  closeAllSheets();

  /*
   * 全問題を問題番号順に並べる。
   *
   * 選択した問題だけではなく、
   * その前後の問題にも移動できるようにする。
   */
  questionSet = [
    ...q10Questions
  ].sort((questionA, questionB) => {
    return (
      questionA.number -
      questionB.number
    );
  });

  /*
   * 選択した問題が、
   * questionSetの何番目にあるかを調べる。
   */
  const selectedIndex =
    questionSet.findIndex(
      (question) => {
        return (
          question.id === questionId
        );
      }
    );

  if (selectedIndex < 0) {
    console.warn(
      "出題セット内に問題が見つかりません。",
      questionId
    );

    return;
  }

  /*
   * 選択した問題の位置から開始する。
   */
  currentQuestionIndex =
    selectedIndex;

  /*
   * 選択した問題だけを
   * 新しい挑戦として初期化する。
   *
   * 累計の挑戦回数は消さない。
   */
  resetQuestionForNewAttempt(
    selectedQuestion
  );

  /*
   * 全問題について
   * 選択肢の並びを準備する。
   */
  ensureChoiceOrders();

  sessionStarted = true;

  settingsModalOverlay.hidden =
    true;

  settingsModal.hidden =
    true;

  document.body.classList.remove(
    "setup-mode"
  );

  restoreBodyScroll();

  saveState();

  renderCurrentQuestion();
}

function resetQuestionForNewAttempt(
  question
) {
  if (!question) {
    return;
  }

  const questionKey =
    getQuestionKey(question.id);

  /*
   * 累計履歴questionHistoryは
   * 削除しない。
   */
  userAnswers[questionKey] = {};

  delete checkedQuestions[
    questionKey
  ];

  delete questionResults[
    questionKey
  ];

  questionTimes[questionKey] = 0;

  activeBlankId = "a";

  /*
   * 選択肢の順番も新しくする。
   */
  createNewChoiceOrder(
    question
  );
}

/* =========================================================
   前後の問題へ移動
========================================================= */

function goToPreviousQuestion() {
  if (
    currentQuestionIndex <= 0
  ) {
    return;
  }

  pauseQuestionTimer();

  closeAllSheets();

  currentQuestionIndex -= 1;

  const previousQuestion =
    getCurrentQuestion();

  if (previousQuestion) {
    resetQuestionForNewAttempt(
      previousQuestion
    );
  }

  saveState();

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

  closeAllSheets();

  currentQuestionIndex += 1;

  const nextQuestion =
    getCurrentQuestion();

  if (nextQuestion) {
    resetQuestionForNewAttempt(
      nextQuestion
    );
  }

  saveState();

  renderCurrentQuestion();
}

function updateNavigationButtons() {
  previousQuestionButton.disabled =
    currentQuestionIndex <= 0;

  nextQuestionButton.disabled =
    currentQuestionIndex >=
    questionSet.length - 1;
}


/* =========================================================
   この問題をやり直す
========================================================= */

function resetCurrentAnswers() {
  const question =
    getCurrentQuestion();

  if (!question) {
    return;
  }

  const questionKey =
    getQuestionKey(question.id);

  userAnswers[questionKey] =
    {};

  delete checkedQuestions[
    questionKey
  ];

  delete questionResults[
    questionKey
  ];

  questionTimes[questionKey] =
    0;

  activeBlankId =
    "a";

  createNewChoiceOrder(
    question
  );

  closeAllSheets();

  saveState();

  renderCurrentQuestion();
}


/* =========================================================
   キーボード操作
========================================================= */

function handleKeyboardOperation(
  event
) {
  const modalIsOpen =
    !settingsModal.hidden ||
    !weakListModal.hidden ||
    !mobileAnswersSheet.hidden ||
    !sentenceReviewSheet.hidden;

  if (modalIsOpen) {
    if (event.key === "Escape") {
      closeMobileAnswersSheet();

      closeSentenceReviewSheet();

      closeWeakListModal();

      if (sessionStarted) {
        closeSettingsModal();
      }
    }

    return;
  }

  const question =
    getCurrentQuestion();

  if (!question) {
    return;
  }

  const questionKey =
    getQuestionKey(question.id);

  const isChecked =
    Boolean(
      checkedQuestions[questionKey]
    );

  if (
    !isChecked &&
    ["1", "2", "3", "4"]
      .includes(event.key)
  ) {
    const blank =
      getBlankById(
        question,
        activeBlankId
      );

    if (!blank) {
      return;
    }

    const orderedChoices =
      getOrderedChoices(
        question,
        blank
      );

    const choice =
      orderedChoices[
        Number(event.key) - 1
      ];

    if (choice) {
      selectChoice(
        activeBlankId,
        choice.id
      );
    }

    return;
  }

  if (
    event.key ===
    "ArrowLeft"
  ) {
    goToPreviousQuestion();
  }

  if (
    event.key ===
    "ArrowRight"
  ) {
    goToNextQuestion();
  }
}


/* =========================================================
   問題タイマー
========================================================= */

function startQuestionTimer(
  question
) {
  stopTimerIntervalOnly();

  const questionKey =
    getQuestionKey(question.id);

  if (
    typeof questionTimes[
      questionKey
    ] !== "number"
  ) {
    questionTimes[questionKey] =
      0;
  }

  updateQuestionTimerDisplay(
    question.id
  );

  if (
    checkedQuestions[questionKey]
  ) {
    return;
  }

  timerStartedAt =
    Date.now();

  timerIntervalId =
    window.setInterval(
      () => {
        updateQuestionTimerDisplay(
          question.id
        );
      },
      1000
    );
}

function pauseQuestionTimer() {
  const question =
    getCurrentQuestion();

  if (
    question &&
    timerStartedAt !== null
  ) {
    const questionKey =
      getQuestionKey(
        question.id
      );

    const additionalSeconds =
      Math.floor(
        (
          Date.now() -
          timerStartedAt
        ) / 1000
      );

    questionTimes[questionKey] =
      (
        questionTimes[
          questionKey
        ] || 0
      ) +
      additionalSeconds;
  }

  stopTimerIntervalOnly();

  if (question) {
    updateQuestionTimerDisplay(
      question.id
    );
  }
}

function stopTimerIntervalOnly() {
  if (
    timerIntervalId !== null
  ) {
    window.clearInterval(
      timerIntervalId
    );

    timerIntervalId =
      null;
  }

  timerStartedAt =
    null;
}

function getCurrentElapsedSeconds(
  questionId
) {
  const questionKey =
    getQuestionKey(questionId);

  const savedSeconds =
    questionTimes[questionKey] ||
    0;

  if (
    timerStartedAt === null
  ) {
    return savedSeconds;
  }

  const currentQuestion =
    getCurrentQuestion();

  if (
    !currentQuestion ||
    currentQuestion.id !==
      questionId
  ) {
    return savedSeconds;
  }

  const currentAdditional =
    Math.floor(
      (
        Date.now() -
        timerStartedAt
      ) / 1000
    );

  return (
    savedSeconds +
    currentAdditional
  );
}

function updateQuestionTimerDisplay(
  questionId
) {
  const seconds =
    getCurrentElapsedSeconds(
      questionId
    );

  questionTimer.textContent =
    formatElapsedTime(
      seconds
    );
}

function formatElapsedTime(
  totalSeconds
) {
  const safeSeconds =
    Math.max(
      0,
      Math.floor(
        totalSeconds || 0
      )
    );

  const minutes =
    Math.floor(
      safeSeconds / 60
    );

  const seconds =
    safeSeconds % 60;

  return (
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`
  );
}


/* =========================================================
   学習状態の保存
========================================================= */

function saveState() {
  const currentQuestion =
    getCurrentQuestion();

  const state = {
    currentSettings,

    currentQuestionId:
      currentQuestion?.id ||
      null,

    currentQuestionIndex,

    activeBlankId,

    userAnswers,

    choiceOrders,

    checkedQuestions,

    questionResults,

    rewardedQuestions,

    questionTimes,

    sessionStarted
  };

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch (error) {
    console.warn(
      "大問10の学習状態を保存できませんでした。",
      error
    );
  }
}
/* =========================================================
   問題別の累計学習履歴
========================================================= */

function getQuestionHistoryEntry(
  questionId
) {
  const questionKey =
    getQuestionKey(questionId);

  const savedEntry =
    questionHistory[questionKey];

  if (
    !savedEntry ||
    typeof savedEntry !== "object"
  ) {
    return {
      attempts: 0,
      bestScore: 0,
      lastScore: null,
      totalScore: 0,
      lastAttemptedAt: null
    };
  }

  return {
    attempts:
      Number.isFinite(
        Number(savedEntry.attempts)
      )
        ? Math.max(
            0,
            Number(savedEntry.attempts)
          )
        : 0,

    bestScore:
      Number.isFinite(
        Number(savedEntry.bestScore)
      )
        ? Math.max(
            0,
            Number(savedEntry.bestScore)
          )
        : 0,

    lastScore:
      Number.isFinite(
        Number(savedEntry.lastScore)
      )
        ? Number(
            savedEntry.lastScore
          )
        : null,

    totalScore:
      Number.isFinite(
        Number(savedEntry.totalScore)
      )
        ? Math.max(
            0,
            Number(savedEntry.totalScore)
          )
        : 0,

    lastAttemptedAt:
      Number.isFinite(
        Number(
          savedEntry.lastAttemptedAt
        )
      )
        ? Number(
            savedEntry.lastAttemptedAt
          )
        : null
  };
}


function getQuestionAttemptCount(
  questionId
) {
  return getQuestionHistoryEntry(
    questionId
  ).attempts;
}


function recordQuestionAttempt(
  question,
  score
) {
  if (!question) {
    return;
  }

  const questionKey =
    getQuestionKey(question.id);

  const previous =
    getQuestionHistoryEntry(
      question.id
    );

  questionHistory[questionKey] = {
    attempts:
      previous.attempts + 1,

    bestScore:
      Math.max(
        previous.bestScore,
        score
      ),

    lastScore:
      score,

    totalScore:
      previous.totalScore +
      score,

    lastAttemptedAt:
      Date.now()
  };

  saveQuestionHistory();
}


function saveQuestionHistory() {
  try {
    localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(
        questionHistory
      )
    );
  } catch (error) {
    console.warn(
      "大問10の学習履歴を保存できませんでした。",
      error
    );
  }
}


function loadQuestionHistory() {
  try {
    const savedText =
      localStorage.getItem(
        HISTORY_STORAGE_KEY
      );

    if (!savedText) {
      questionHistory = {};
      return;
    }

    const saved =
      JSON.parse(savedText);

    questionHistory =
      isPlainObject(saved)
        ? saved
        : {};
  } catch (error) {
    console.warn(
      "大問10の学習履歴を読み込めませんでした。",
      error
    );

    questionHistory = {};
  }
}


function renderQuestionHistory() {
  if (
    !questionHistorySummary ||
    !questionAttemptList
  ) {
    return;
  }

  const sortedQuestions = [
    ...q10Questions
  ].sort((questionA, questionB) => {
    return (
      questionA.number -
      questionB.number
    );
  });

  const studiedCount =
    sortedQuestions.filter(
      (question) => {
        return (
          getQuestionAttemptCount(
            question.id
          ) > 0
        );
      }
    ).length;

  const unattemptedCount =
    sortedQuestions.length -
    studiedCount;

  const totalAttempts =
    sortedQuestions.reduce(
      (total, question) => {
        return (
          total +
          getQuestionAttemptCount(
            question.id
          )
        );
      },
      0
    );

  questionHistorySummary.textContent =
    `挑戦済み ${studiedCount}問` +
    ` ／ 未挑戦 ${unattemptedCount}問` +
    ` ／ 合計 ${totalAttempts}回`;

  questionAttemptList.innerHTML =
    "";

  const fragment =
    document.createDocumentFragment();

  sortedQuestions.forEach(
    (question) => {
      const history =
        getQuestionHistoryEntry(
          question.id
        );

      /*
       * divではなくbuttonにする。
       */
      const item =
        document.createElement(
          "button"
        );

      item.type = "button";

      item.className =
        "question-attempt-item";

      item.dataset.questionId =
        question.id;

      item.setAttribute(
        "aria-label",
        `第${question.number}問を解く`
      );

      if (
        history.attempts === 0
      ) {
        item.classList.add(
          "unattempted"
        );
      }

      const number =
        document.createElement("span");

      number.className =
        "question-attempt-number";

      number.textContent =
        `第${question.number}問`;

      const title =
        document.createElement("span");

      title.className =
        "question-attempt-title";

      title.textContent =
        question.titleJa ||
        question.title ||
        `Question ${question.number}`;

      title.title =
        title.textContent;

      const count =
        document.createElement("span");

      count.className =
        "question-attempt-count";

      count.textContent =
        history.attempts === 0
          ? "未挑戦"
          : `${history.attempts}回`;

      const arrow =
        document.createElement("span");

      arrow.className =
        "question-attempt-arrow";

      arrow.textContent = "›";

      item.append(
        number,
        title,
        count,
        arrow
      );

      /*
       * 問題を直接開始する。
       */
      item.addEventListener(
        "click",
        () => {
          startSelectedQuestion(
            question.id
          );
        }
      );

      fragment.appendChild(item);
    }
  );

  questionAttemptList.appendChild(
    fragment
  );
}


/* =========================================================
   学習状態の読込
========================================================= */

function loadSavedState() {
  try {
    const savedText =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!savedText) {
      return;
    }

    const saved =
      JSON.parse(savedText);

    if (
      saved.currentSettings &&
      typeof saved.currentSettings ===
        "object"
    ) {
      const savedStart =
        Number(
          saved.currentSettings
            .startNumber
        );

      const savedEnd =
        Number(
          saved.currentSettings
            .endNumber
        );

      currentSettings = {
        order:
  normalizeQuestionOrder(
    saved.currentSettings.order
  ),

        startNumber:
          Number.isFinite(savedStart)
            ? savedStart
            : 1,

        endNumber:
          Number.isFinite(savedEnd)
            ? savedEnd
            : Math.max(
                ...q10Questions.map(
                  (question) => {
                    return question.number;
                  }
                )
              )
      };
    }

    userAnswers =
      isPlainObject(
        saved.userAnswers
      )
        ? saved.userAnswers
        : {};

    choiceOrders =
      isPlainObject(
        saved.choiceOrders
      )
        ? saved.choiceOrders
        : {};

    checkedQuestions =
      isPlainObject(
        saved.checkedQuestions
      )
        ? saved.checkedQuestions
        : {};

    questionResults =
      isPlainObject(
        saved.questionResults
      )
        ? saved.questionResults
        : {};

    rewardedQuestions =
      isPlainObject(
        saved.rewardedQuestions
      )
        ? saved.rewardedQuestions
        : {};

    questionTimes =
      isPlainObject(
        saved.questionTimes
      )
        ? saved.questionTimes
        : {};

    activeBlankId =
      BLANK_IDS.includes(
        saved.activeBlankId
      )
        ? saved.activeBlankId
        : "a";

    sessionStarted =
      Boolean(
        saved.sessionStarted
      );

    createQuestionSet();

    if (
      saved.currentQuestionId
    ) {
      const savedIndex =
        questionSet.findIndex(
          (question) => {
            return (
              question.id ===
              saved.currentQuestionId
            );
          }
        );

      if (savedIndex >= 0) {
        currentQuestionIndex =
          savedIndex;
      }
    } else if (
      Number.isInteger(
        saved.currentQuestionIndex
      ) &&
      saved.currentQuestionIndex >= 0 &&
      saved.currentQuestionIndex <
        questionSet.length
    ) {
      currentQuestionIndex =
        saved.currentQuestionIndex;
    }
  } catch (error) {
    console.warn(
      "大問10の保存状態を読み込めませんでした。",
      error
    );

    setDefaultSettings();
  }
}


/* =========================================================
   初期設定
========================================================= */

function setDefaultSettings() {
  const numbers =
    q10Questions.map(
      (question) => {
        return question.number;
      }
    );

  currentSettings = {
    order:
      "sequential",

    startNumber:
      Math.min(...numbers),

    endNumber:
      Math.max(...numbers)
  };
}


/* =========================================================
   ヘルパー関数
========================================================= */

function getCurrentQuestion() {
  return (
    questionSet[
      currentQuestionIndex
    ] || null
  );
}

function getQuestionKey(
  questionId
) {
  return String(questionId);
}

function getBlankById(
  question,
  blankId
) {
  if (
    !question ||
    !Array.isArray(
      question.blanks
    )
  ) {
    return null;
  }

  return (
    question.blanks.find(
      (blank) => {
        return (
          blank.id ===
          blankId
        );
      }
    ) || null
  );
}

function getAnswerChoice(
  blank
) {
  if (
    !blank ||
    !Array.isArray(
      blank.choices
    )
  ) {
    return null;
  }

  return (
    blank.choices.find(
      (choice) => {
        return (
          choice.id ===
          blank.answer
        );
      }
    ) || null
  );
}

function getOrderedChoices(
  question,
  blank
) {
  if (!question || !blank) {
    return [];
  }

  const questionKey =
    getQuestionKey(
      question.id
    );

  const order =
    choiceOrders[
      questionKey
    ]?.[blank.id] || [];

  return order
    .map((choiceId) => {
      return blank.choices.find(
        (choice) => {
          return (
            choice.id ===
            choiceId
          );
        }
      );
    })
    .filter(Boolean);
}

function ensureQuestionState(
  questionId
) {
  const questionKey =
    getQuestionKey(
      questionId
    );

  if (
    !isPlainObject(
      userAnswers[
        questionKey
      ]
    )
  ) {
    userAnswers[questionKey] =
      {};
  }

  if (
    typeof questionTimes[
      questionKey
    ] !== "number"
  ) {
    questionTimes[questionKey] =
      0;
  }
}

function getInitialActiveBlank(
  questionId
) {
  const questionKey =
    getQuestionKey(
      questionId
    );

  const answers =
    userAnswers[questionKey] ||
    {};

  const unansweredBlank =
    BLANK_IDS.find(
      (blankId) => {
        return !answers[blankId];
      }
    );

  if (unansweredBlank) {
    return unansweredBlank;
  }

  if (
    BLANK_IDS.includes(
      activeBlankId
    )
  ) {
    return activeBlankId;
  }

  return "a";
}

function getCompletedSentenceText(
  question,
  sentence
) {
  return sentence.en.replace(
    /\{\{([a-e])\}\}/g,
    (
      match,
      blankId
    ) => {
      const blank =
        getBlankById(
          question,
          blankId
        );

      const answerChoice =
        getAnswerChoice(
          blank
        );

      return (
        answerChoice?.text ||
        ""
      );
    }
  );
}

function scrollAnswerCardIntoView(
  blankId
) {
  const card =
    answersContainer.querySelector(
      `.answer-card` +
      `[data-blank-id="${blankId}"]`
    );

  card?.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

function scrollToExplanation(
  blankId
) {
  const card =
    explanationsContainer.querySelector(
      `.explanation-card` +
      `[data-blank-id="${blankId}"]`
    );

  card?.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function isMobileLayout() {
  return window
    .matchMedia(
      "(max-width: 720px)"
    )
    .matches;
}

function restoreBodyScroll() {
  const anyOpen =
    !settingsModal.hidden ||
    !weakListModal.hidden ||
    !mobileAnswersSheet.hidden ||
    !sentenceReviewSheet.hidden;

  if (!anyOpen) {
    document.body.style.overflow =
      "";
  }
}

function closeAllSheets() {
  closeMobileAnswersSheet();

  closeSentenceReviewSheet();
}

function shuffleArray(
  array
) {
  const copied =
    [...array];

  for (
    let index =
      copied.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex =
      Math.floor(
        Math.random() *
        (index + 1)
      );

    [
      copied[index],
      copied[randomIndex]
    ] = [
      copied[randomIndex],
      copied[index]
    ];
  }

  return copied;
}

function isPlainObject(
  value
) {
  return (
    Boolean(value) &&
    typeof value ===
      "object" &&
    !Array.isArray(value)
  );
}


/* =========================================================
   問題がない場合
========================================================= */

function renderNoQuestionMessage() {
  passageContainer.innerHTML =
    '<p class="weak-empty-message">' +
    "表示できる問題がありません。" +
    "</p>";

  answersContainer.innerHTML =
    "";

  resultPanel.hidden =
    true;

  explanationsPanel.hidden =
    true;

  translationPanel.hidden =
    true;

  sentenceReviewPanel.hidden =
    true;

  previousQuestionButton.disabled =
    true;

  nextQuestionButton.disabled =
    true;

  checkAnswerButton.disabled =
    true;
}
