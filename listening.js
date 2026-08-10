// listening.js
// 第1段階：大問3形式・4択リスニング対応版
// - 設定保存
// - 先頭 / 続き / ランダム / ニガテ
// - 問題数指定
// - MP3再生、停止、速度変更、自動再生
// - 選択肢シャッフル
// - 正誤判定、スクリプト、日本語訳、解説
// - 自動ニガテ + 手動ニガテ
// - 問題一覧
// - ゴイモン「おんかん」+1
// - 結果画面
//
// ※ ディクテーション、オーバーラッピング、シャドーイングは
//    次の段階で本実装します。

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const LEVEL_KEY = "zensho_level_v1";
  const lv = String(
    window.ACTIVE_LEVEL ||
    localStorage.getItem(LEVEL_KEY) ||
    "1"
  );

  const SETTINGS_KEY =
    `zensho_listening_settings_v1_lv${lv}`;

  const WEAK_KEY =
    `zensho_listening_weak_v1_lv${lv}`;

  const CURSOR_KEY =
    `zensho_listening_cursor_v1_lv${lv}`;

    const ATTEMPT_KEY =
  `zensho_listening_attempts_v1_lv${lv}`;

  const METHOD_LABELS = {
    quiz: "リスニング問題",
    dictation: "ディクテーション",
    overlapping: "オーバーラッピング",
    shadowing: "シャドーイング"
  };

  // ============================================================
  // DOM
  // ============================================================

  const levelBadge =
    document.getElementById("levelBadge");

  const setupBox =
    document.getElementById("setupBox");

  const problemListBox =
    document.getElementById("problemListBox");

  const playBox =
    document.getElementById("playBox");

  const summaryBox =
    document.getElementById("summaryBox");

  const formatSelect =
    document.getElementById("formatSelect");

  const orderMode =
    document.getElementById("orderMode");

  const questionCount =
    document.getElementById("questionCount");

  const customCountWrap =
    document.getElementById("customCountWrap");

  const customCountInput =
    document.getElementById("customCountInput");

  const methodCards =
    document.getElementById("methodCards");

  const dictationSettings =
    document.getElementById("dictationSettings");

  const dictationType =
    document.getElementById("dictationType");

  const dictationPassCount =
    document.getElementById("dictationPassCount");
  
  const dictationSentenceSpeed =
    document.getElementById(
      "dictationSentenceSpeed"
    );

  const playbackRate =
    document.getElementById("playbackRate");

  const autoPlayCount =
    document.getElementById("autoPlayCount");

  const shuffleChoices =
    document.getElementById("shuffleChoices");

  const poolInfo =
    document.getElementById("poolInfo");

  const weakInfo =
    document.getElementById("weakInfo");

  const startBtn =
    document.getElementById("startBtn");

  const startWeakBtn =
    document.getElementById("startWeakBtn");

  const openProblemListBtn =
    document.getElementById("openProblemListBtn");

  const problemListBackBtn =
    document.getElementById("problemListBackBtn");

  const problemListFormatSelect =
    document.getElementById("problemListFormatSelect");

  const toggleProblemListAnswersBtn =
    document.getElementById(
      "toggleProblemListAnswersBtn"
    );

  const shuffleProblemListBtn =
    document.getElementById("shuffleProblemListBtn");

  const problemListSummary =
    document.getElementById("problemListSummary");

  const problemListEmpty =
    document.getElementById("problemListEmpty");

  const problemListBody =
    document.getElementById("problemListBody");

  let problemListAudio = null;
let problemListPlayingButton = null;

  const questionProgress =
    document.getElementById("questionProgress");

  const questionMeta =
    document.getElementById("questionMeta");

  const manualWeakBtn =
    document.getElementById("manualWeakBtn");

  const backBtn =
    document.getElementById("backBtn");

  const questionAudio =
    document.getElementById("questionAudio");

  const audioMessage =
    document.getElementById("audioMessage");

  const playAudioBtn =
    document.getElementById("playAudioBtn");

    const rewind3Btn =
    document.getElementById(
      "rewind3Btn"
    );

  const stopAudioBtn =
    document.getElementById("stopAudioBtn");

  const playSpeedSelect =
    document.getElementById("playSpeedSelect");

  const currentPlayCount =
    document.getElementById("currentPlayCount");

  const quizModePanel =
    document.getElementById("quizModePanel");

  const dictationModePanel =
    document.getElementById("dictationModePanel");

  const overlappingModePanel =
    document.getElementById("overlappingModePanel");

  const shadowingModePanel =
    document.getElementById("shadowingModePanel");

  const choicesEl =
    document.getElementById("choices");
  
    /*
    大問5専用
  */
  const type5ModePanel =
    document.getElementById(
      "type5ModePanel"
    );

  const type5QuestionList =
    document.getElementById(
      "type5QuestionList"
    );

  const type5CheckBtn =
    document.getElementById(
      "type5CheckBtn"
    );

  const type5Result =
    document.getElementById(
      "type5Result"
    );  
    const type5ScriptAction =
    document.getElementById(
      "type5ScriptAction"
    );

  const type5ScriptOpenBtn =
    document.getElementById(
      "type5ScriptOpenBtn"
    );

  const type5ScriptSheetOverlay =
    document.getElementById(
      "type5ScriptSheetOverlay"
    );

  const type5ScriptSheet =
    document.getElementById(
      "type5ScriptSheet"
    );

  const type5ScriptCloseBtn =
    document.getElementById(
      "type5ScriptCloseBtn"
    );

  const type5ScriptPlayBtn =
    document.getElementById(
      "type5ScriptPlayBtn"
    );

  const type5ScriptStopBtn =
    document.getElementById(
      "type5ScriptStopBtn"
    );

  const type5FullScriptEn =
    document.getElementById(
      "type5FullScriptEn"
    );

  const type5FullScriptJa =
    document.getElementById(
      "type5FullScriptJa"
    );
  
    const type5FixedFooter =
    document.getElementById(
      "type5FixedFooter"
    );

  const type5NextBtn =
    document.getElementById(
      "type5NextBtn"
    );

  const type5ReviewCard =
    document.getElementById(
      "type5ReviewCard"
    );

  const type5ReviewDictationBtn =
    document.getElementById(
      "type5ReviewDictationBtn"
    );

  const type5ReviewOverlappingBtn =
    document.getElementById(
      "type5ReviewOverlappingBtn"
    );

  const type5ReviewShadowingBtn =
    document.getElementById(
      "type5ReviewShadowingBtn"
    );

    const type5FooterDictationBtn =
    document.getElementById(
      "type5FooterDictationBtn"
    );

  const type5FooterOverlappingBtn =
    document.getElementById(
      "type5FooterOverlappingBtn"
    );

  const type5FooterShadowingBtn =
    document.getElementById(
      "type5FooterShadowingBtn"
    );
  
    const reorderDictationPanel =
    document.getElementById("reorderDictationPanel");

  const fullDictationPanel =
    document.getElementById("fullDictationPanel");

  const dictationAnswerArea =
    document.getElementById("dictationAnswerArea");

  const wordBank =
    document.getElementById("wordBank");

  const undoWordBtn =
    document.getElementById("undoWordBtn");

  const resetWordsBtn =
    document.getElementById("resetWordsBtn");

  const checkReorderBtn =
    document.getElementById("checkReorderBtn");

      const fullDictationInput =
    document.getElementById(
      "fullDictationInput"
    );

  const fullDictationGuide =
    document.getElementById(
      "fullDictationGuide"
    );

  const clearFullDictationBtn =
    document.getElementById(
      "clearFullDictationBtn"
    );

  const checkFullDictationBtn =
    document.getElementById(
      "checkFullDictationBtn"
    );

      const overlappingScript =
    document.getElementById(
      "overlappingScript"
    );

  const overlappingJa =
    document.getElementById(
      "overlappingJa"
    );

  const completeOverlappingBtn =
    document.getElementById(
      "completeOverlappingBtn"
    );

  const repeatOverlappingBtn =
    document.getElementById(
      "repeatOverlappingBtn"
    );

      const toggleShadowingScriptBtn =
    document.getElementById(
      "toggleShadowingScriptBtn"
    );

  const shadowingScriptBox =
    document.getElementById(
      "shadowingScriptBox"
    );

  const shadowingScript =
    document.getElementById(
      "shadowingScript"
    );

  const shadowingJa =
    document.getElementById(
      "shadowingJa"
    );

  const completeShadowingBtn =
    document.getElementById(
      "completeShadowingBtn"
    );

  const repeatShadowingBtn =
    document.getElementById(
      "repeatShadowingBtn"
    );

  const answerResult =
    document.getElementById("answerResult");

  const scriptAnswerBox =
    document.getElementById("scriptAnswerBox");

  const scriptAnswerEn =
    document.getElementById("scriptAnswerEn");

  const scriptAnswerJa =
    document.getElementById("scriptAnswerJa");

  const playScriptAudioBtn =
    document.getElementById("playScriptAudioBtn");

  const explanationBox =
    document.getElementById("explanationBox");

  const explanationText =
    document.getElementById("explanationText");

  const afterAnswerActions =
    document.getElementById("afterAnswerActions");

  const reviewDictationBtn =
    document.getElementById("reviewDictationBtn");

  const reviewOverlappingBtn =
    document.getElementById("reviewOverlappingBtn");

  const reviewShadowingBtn =
    document.getElementById("reviewShadowingBtn");

  const nextQuestionBtn =
    document.getElementById("nextQuestionBtn");

  const summaryLine =
    document.getElementById("summaryLine");

  const summaryScoreMain =
    document.getElementById("summaryScoreMain");

  const summaryScoreSub =
    document.getElementById("summaryScoreSub");

  const summaryAttempted =
    document.getElementById("summaryAttempted");

  const summaryCorrect =
    document.getElementById("summaryCorrect");

  const summaryOnkan =
    document.getElementById("summaryOnkan");

  const retrySameBtn =
    document.getElementById("retrySameBtn");

  const continueBtn =
    document.getElementById("continueBtn");

  const retryWeakBtn =
    document.getElementById("retryWeakBtn");

  const summaryBackBtn =
    document.getElementById("summaryBackBtn");

  const summaryEmpty =
    document.getElementById("summaryEmpty");

  const summaryResultList =
    document.getElementById("summaryResultList");

  const toggleGoimonBtn =
    document.getElementById("toggleGoimon");

  const goimonCard =
    document.getElementById("goimonCard");

  const evolutionNoticeBtn =
    document.getElementById("evolutionNoticeBtn");

  const goimonMiniImage =
    document.getElementById("goimonMiniImage");

  const goimonMiniName =
    document.getElementById("goimonMiniName");

  const goimonMiniMeta =
    document.getElementById("goimonMiniMeta");

  const goimonMiniDesc =
    document.getElementById("goimonMiniDesc");

  const goimonMiniStage =
    document.getElementById("goimonMiniStage");

  // ============================================================
  // 必須DOM確認
  // ============================================================

  function must(el, id) {
    if (!el) {
      throw new Error(
        `listening.html に #${id} が見つかりません`
      );
    }
  }

  [
    [setupBox, "setupBox"],
    [problemListBox, "problemListBox"],
    [playBox, "playBox"],
    [summaryBox, "summaryBox"],
    [formatSelect, "formatSelect"],
    [orderMode, "orderMode"],
    [questionCount, "questionCount"],
    [customCountWrap, "customCountWrap"],
    [customCountInput, "customCountInput"],
    [methodCards, "methodCards"],
    [dictationSettings, "dictationSettings"],
    [dictationSentenceSpeed, "dictationSentenceSpeed"],
    [playbackRate, "playbackRate"],
    [autoPlayCount, "autoPlayCount"],
    [shuffleChoices, "shuffleChoices"],
    [startBtn, "startBtn"],
    [startWeakBtn, "startWeakBtn"],
    [openProblemListBtn, "openProblemListBtn"],
    [questionAudio, "questionAudio"],
    [playAudioBtn, "playAudioBtn"],
    [rewind3Btn, "rewind3Btn"],
    [stopAudioBtn, "stopAudioBtn"],
    [playSpeedSelect, "playSpeedSelect"],
    [choicesEl, "choices"],
    [type5ModePanel, "type5ModePanel"],
    [type5QuestionList, "type5QuestionList"],
    [type5CheckBtn, "type5CheckBtn"],
    [type5Result, "type5Result"],
    [type5ScriptAction, "type5ScriptAction"],
    [type5ScriptOpenBtn, "type5ScriptOpenBtn"],
    [type5ScriptSheetOverlay, "type5ScriptSheetOverlay"],
    [type5ScriptSheet, "type5ScriptSheet"],
    [type5ScriptCloseBtn, "type5ScriptCloseBtn"],
    [type5ScriptPlayBtn, "type5ScriptPlayBtn"],
    [type5ScriptStopBtn, "type5ScriptStopBtn"],
    [type5FullScriptEn, "type5FullScriptEn"],
    [type5FullScriptJa, "type5FullScriptJa"],
    [type5FixedFooter, "type5FixedFooter"],
    [type5NextBtn, "type5NextBtn"],
    [type5ReviewCard, "type5ReviewCard"],
    [type5ReviewDictationBtn, "type5ReviewDictationBtn"],
    [type5ReviewOverlappingBtn, "type5ReviewOverlappingBtn"],
    [type5ReviewShadowingBtn, "type5ReviewShadowingBtn"],
    [type5FooterDictationBtn, "type5FooterDictationBtn"],
    [type5FooterOverlappingBtn, "type5FooterOverlappingBtn"],
    [type5FooterShadowingBtn, "type5FooterShadowingBtn"],
    [playScriptAudioBtn, "playScriptAudioBtn"],
    [reorderDictationPanel, "reorderDictationPanel"],
    [fullDictationPanel, "fullDictationPanel"],
    [dictationAnswerArea, "dictationAnswerArea"],
    [wordBank, "wordBank"],
    [undoWordBtn, "undoWordBtn"],
    [resetWordsBtn, "resetWordsBtn"],
    [checkReorderBtn, "checkReorderBtn"],
    [fullDictationInput, "fullDictationInput"],
    [fullDictationGuide, "fullDictationGuide"],
    [clearFullDictationBtn, "clearFullDictationBtn"],
    [checkFullDictationBtn, "checkFullDictationBtn"],
    [overlappingScript, "overlappingScript"],
    [overlappingJa, "overlappingJa"],
    [completeOverlappingBtn, "completeOverlappingBtn"],
    [repeatOverlappingBtn, "repeatOverlappingBtn"],
    [toggleShadowingScriptBtn, "toggleShadowingScriptBtn"],
    [shadowingScriptBox, "shadowingScriptBox"],
    [shadowingScript, "shadowingScript"],
    [shadowingJa, "shadowingJa"],
    [completeShadowingBtn, "completeShadowingBtn"],
    [repeatShadowingBtn, "repeatShadowingBtn"],
    [nextQuestionBtn, "nextQuestionBtn"]
  ].forEach(([el, id]) => {
    must(el, id);
  });

  // ============================================================
  // 問題データ
  // ============================================================

    function getRawQuestions() {
    const sources = [];

    // ==========================================================
    // 大問2形式
    // ==========================================================

    if (
      Array.isArray(
        window.LISTENING_TYPE2_1KYU
      )
    ) {
      sources.push(
        ...window.LISTENING_TYPE2_1KYU
      );
    } else {
      try {
        if (
          typeof LISTENING_TYPE2_1KYU !==
            "undefined" &&
          Array.isArray(
            LISTENING_TYPE2_1KYU
          )
        ) {
          sources.push(
            ...LISTENING_TYPE2_1KYU
          );
        }
      } catch (error) {
        console.warn(
          "LISTENING_TYPE2_1KYUの取得に失敗しました。",
          error
        );
      }
    }

    // ==========================================================
    // 大問3形式
    // ==========================================================

    if (
      Array.isArray(
        window.LISTENING_TYPE3_1KYU
      )
    ) {
      sources.push(
        ...window.LISTENING_TYPE3_1KYU
      );
    } else {
      try {
        if (
          typeof listeningType3_1kyu !==
            "undefined" &&
          Array.isArray(
            listeningType3_1kyu
          )
        ) {
          sources.push(
            ...listeningType3_1kyu
          );
        }
      } catch (error) {
        console.warn(
          "listeningType3_1kyuの取得に失敗しました。",
          error
        );
      }
    }

    // ==========================================================
    // 大問5形式
    // ==========================================================

    if (
      Array.isArray(
        window.LISTENING_TYPE5_1KYU
      )
    ) {
      sources.push(
        ...window.LISTENING_TYPE5_1KYU
      );
    } else {
      try {
        if (
          typeof LISTENING_TYPE5_1KYU !==
            "undefined" &&
          Array.isArray(
            LISTENING_TYPE5_1KYU
          )
        ) {
          sources.push(
            ...LISTENING_TYPE5_1KYU
          );
        }
      } catch (error) {
        console.warn(
          "LISTENING_TYPE5_1KYUの取得に失敗しました。",
          error
        );
      }
    }

    return sources;
  }

  function normalizeQuestions(raw) {
    return (raw || [])
      .map(q => {

        const format =
          Number(q?.format || 3);

        /*
          大問5の子設問を整形
        */
        const subQuestions =
          Array.isArray(q?.questions)
            ? q.questions.map(sub => {
                return {
                  id: String(
                    sub?.id || ""
                  ).trim(),

                  questionType: String(
                    sub?.questionType || ""
                  ).trim(),

                  stem: String(
                    sub?.stem || ""
                  ).trim(),

                  stemJa: String(
                    sub?.stemJa || ""
                  ).trim(),

                  choices:
                    Array.isArray(
                      sub?.choices
                    )
                      ? sub.choices.map(c => {
                          return {
                            id: String(
                              c?.id || ""
                            ).trim(),

                            text: String(
                              c?.text || ""
                            ).trim(),

                            ja: String(
                              c?.ja || ""
                            ).trim()
                          };
                        })
                      : [],

                  answerId: String(
                    sub?.answerId || ""
                  ).trim(),

                  evidence: String(
  sub?.evidence || ""
).trim(),

evidenceJa: String(
  sub?.evidenceJa || ""
).trim()
                };
              })
            : [];

        return {
          id: String(
            q?.id || ""
          ).trim(),

          level: Number(
            q?.level || 1
          ),

          part: String(
            q?.part || "listening"
          ),

          format,

          type: String(
            q?.type || ""
          ),

          title: String(
            q?.title || ""
          ).trim(),

          sourceType: String(
            q?.sourceType || ""
          ).trim(),

          audioFile: String(
            q?.audioFile || ""
          ).trim(),

          script: String(
            q?.script || ""
          ).trim(),

          scriptJa: String(
            q?.scriptJa || ""
          ).trim(),

          /*
            大問2・3用
          */
          choices:
            Array.isArray(q?.choices)
              ? q.choices.map(c => {
                  return {
                    id: String(
                      c?.id || ""
                    ).trim(),

                    text: String(
                      c?.text || ""
                    ).trim(),

                    ja: String(
                      c?.ja || ""
                    ).trim()
                  };
                })
              : [],

          answerId: String(
            q?.answerId || ""
          ).trim(),

          explanation: String(
            q?.explanation || ""
          ).trim(),

          function: String(
            q?.function || ""
          ).trim(),

          /*
            大問5用
          */
          questions:
            subQuestions
        };
      })
      .filter(q => {

        /*
          大問5
          1長文＋5つの子設問
        */
        if (q.format === 5) {
          return (
            q.id &&
            q.audioFile &&
            q.script &&
            q.questions.length === 5 &&
            q.questions.every(sub => {
              return (
                sub.id &&
                sub.stem &&
                sub.choices.length === 4 &&
                sub.answerId
              );
            })
          );
        }

        /*
          大問2・3
        */
        return (
          q.id &&
          q.audioFile &&
          q.script &&
          q.choices.length === 4 &&
          q.answerId
        );
      });
  }

  const allQuestions =
    normalizeQuestions(getRawQuestions());

  const questionById =
    new Map(
      allQuestions.map(q => [
        q.id,
        q
      ])
    );

    function getSelectedFormat() {
  return Number(
    formatSelect?.value || 3
  );
}

function getQuestionsByFormat(
  format = getSelectedFormat()
) {
  return allQuestions.filter(q => {
    return q.format === Number(format);
  });
}

function updatePoolInfo() {
  const format =
    getSelectedFormat();

  const count =
    getQuestionsByFormat(format).length;

  poolInfo.textContent =
    `大問${format}形式：全${count}問`;

  startBtn.disabled =
    count === 0;
}

// ============================================================
// リスニング問題ごとの取り組み回数
// ============================================================

function loadAttemptCounts() {
  try {
    const raw =
      localStorage.getItem(
        ATTEMPT_KEY
      );

    if (!raw) {
      return {};
    }

    const parsed =
      JSON.parse(raw);

    return (
      parsed &&
      typeof parsed === "object"
        ? parsed
        : {}
    );
  } catch (error) {
    console.warn(
      "リスニング問題の取り組み回数を読み込めませんでした。",
      error
    );

    return {};
  }
}

function saveAttemptCounts(
  counts
) {
  try {
    localStorage.setItem(
      ATTEMPT_KEY,
      JSON.stringify(
        counts || {}
      )
    );
  } catch (error) {
    console.warn(
      "リスニング問題の取り組み回数を保存できませんでした。",
      error
    );
  }
}

function getAttemptCount(
  questionId
) {
  const counts =
    loadAttemptCounts();

  return Math.max(
    0,
    Number(
      counts[
        String(questionId)
      ] || 0
    )
  );
}

function incrementAttemptCount(
  questionId
) {
  const id =
    String(
      questionId || ""
    );

  if (!id) {
    return;
  }

  const counts =
    loadAttemptCounts();

  counts[id] =
    Math.max(
      0,
      Number(
        counts[id] || 0
      )
    ) + 1;

  saveAttemptCounts(
    counts
  );
}

  // ============================================================
  // 状態
  // ============================================================

  let sessionQuestions = [];
  let currentIndex = 0;
  let currentQuestion = null;
  let currentChoices = [];
  let type5SelectedAnswers = {};

  let dictationTokens = [];
  let dictationSelectedIndexes = [];

  /*
    大問2の並べ替えディクテーションを、
    1文ずつ管理するための配列です。

    各要素は次の形式になります。

    {
      sentence: "英文",
      tokens: ["並べ替え用", "の", "単語"],
      selectedIndexes: [2, 0, 1]
    }
  */
  let dictationSentenceStates = [];

  /*
    「1語戻す」を押した際に、
    どの文から戻すかを記録します。
  */
  let activeDictationSentenceIndex = 0;

  let dictationAttempts = 0;
  let fullDictationAttempts = 0;

  let answered = false;
  let playCount = 0;
  let onkanEarned = 0;

  let sessionResults = [];

  /*
    同じ問題・同じ学習方法で、
    セッション中に重複してポイントを加算しないための記録
  */
  let sessionAwardKeys =
    new Set();

  let lastSessionQuestionIds = [];

  let problemListAnswersVisible =
    true;

  let lastStartConfig = null;

  /*
    自動再生を途中で中止するときに使う識別番号
  */
  let autoPlayToken = 0;

  // ============================================================
  // 共通処理
  // ============================================================

  function safeParse(raw, fallback) {
    if (!raw) {
      return fallback;
    }

    try {
      const parsed =
        JSON.parse(raw);

      return parsed == null
        ? fallback
        : parsed;
    } catch (error) {
      return fallback;
    }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function shuffleArray(list) {
    const out = [...list];

    for (
      let i = out.length - 1;
      i > 0;
      i--
    ) {
      const j =
        Math.floor(
          Math.random() * (i + 1)
        );

      [
        out[i],
        out[j]
      ] = [
        out[j],
        out[i]
      ];
    }

    return out;
  }

  function clampInt(
    value,
    min,
    max,
    fallback
  ) {
    const n =
      Number.parseInt(value, 10);

    if (!Number.isFinite(n)) {
      return fallback;
    }

    return Math.min(
      max,
      Math.max(min, n)
    );
  }

  function getSelectedMethod() {
    const checked =
      document.querySelector(
        'input[name="learningMethod"]:checked'
      );

    return String(
      checked?.value || "quiz"
    );
  }

  function setSelectedMethod(method) {
    const safeMethod =
      METHOD_LABELS[method]
        ? method
        : "quiz";

    document
      .querySelectorAll(".methodCard")
      .forEach(card => {
        const isSelected =
          card.dataset.method ===
          safeMethod;

        card.classList.toggle(
          "selected",
          isSelected
        );

        const radio =
          card.querySelector(
            'input[type="radio"]'
          );

        if (radio) {
          radio.checked =
            isSelected;
        }
      });

    dictationSettings.classList.toggle(
      "hidden",
      safeMethod !== "dictation"
    );
  }

  function showOnly(target) {
    setupBox.classList.toggle(
      "hidden",
      target !== "setup"
    );

    problemListBox.classList.toggle(
      "hidden",
      target !== "problemList"
    );

    playBox.classList.toggle(
      "hidden",
      target !== "play"
    );

    summaryBox.classList.toggle(
      "hidden",
      target !== "summary"
    );
  }

  function stopAudio() {
    autoPlayToken += 1;

    /*
      MP3音声を停止します。
    */
    try {
      questionAudio.pause();
      questionAudio.currentTime = 0;
    } catch (error) {
      console.warn(
        "音声停止に失敗しました。",
        error
      );
    }

    /*
      文ごとのブラウザ読み上げも停止します。
    */
    stopDictationSentenceAudio();
  }

  function setAudioRate(rate) {
    const n =
      Number(rate || 1);

    const safeRate =
      [0.75, 1, 1.25, 1.5]
        .includes(n)
        ? n
        : 1;

    questionAudio.playbackRate =
      safeRate;

    playbackRate.value =
      String(safeRate);

    playSpeedSelect.value =
      String(safeRate);
  }

  function updatePlayCount() {
    currentPlayCount.textContent =
      `再生回数：${playCount}回`;
  }

  function updateLevelBadge() {
    if (!levelBadge) {
      return;
    }

    levelBadge.textContent =
      `現在：全商英検 ${lv}級（リスニング演習）`;
  }

  // ============================================================
  // 設定
  // ============================================================

  function defaultSettings() {
    return {
      format: "3",
      orderMode: "order",
      questionCount: "10",
      customCount: 10,
      method: "quiz",
      dictationType: "reorder",
      dictationPassCount: "3",
      playbackRate: "1",
      autoPlayCount: "1",
      shuffleChoices: true,
      goimonOpen: true
    };
  }

  function loadSettings() {
    const saved =
      safeParse(
        localStorage.getItem(
          SETTINGS_KEY
        ),
        {}
      );

    return {
      ...defaultSettings(),
      ...(
        saved &&
        typeof saved === "object"
          ? saved
          : {}
      )
    };
  }

  function collectSettings() {
    return {
      format: String(
        formatSelect.value || "3"
      ),

      orderMode: String(
        orderMode.value || "order"
      ),

      questionCount: String(
        questionCount.value || "10"
      ),

      customCount: clampInt(
        customCountInput.value,
        1,
        Math.max(
          1,
          allQuestions.length || 200
        ),
        10
      ),

      method:
        getSelectedMethod(),

      dictationType: String(
        dictationType?.value ||
        "reorder"
      ),

      dictationPassCount: String(
        dictationPassCount?.value ||
        "3"
      ),

      playbackRate: String(
        playbackRate.value || "1"
      ),

      autoPlayCount: String(
        autoPlayCount.value || "1"
      ),

      shuffleChoices:
        !!shuffleChoices.checked,

      goimonOpen:
        !goimonCard.classList.contains(
          "hidden"
        )
    };
  }

  function saveSettings() {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(
        collectSettings()
      )
    );
  }

  function applySettings(settings) {
    formatSelect.value =
      String(
        settings.format || "3"
      );

    orderMode.value =
      String(
        settings.orderMode || "order"
      );

    questionCount.value =
      String(
        settings.questionCount || "10"
      );

    customCountInput.value =
      String(
        settings.customCount || 10
      );

    setSelectedMethod(
      settings.method || "quiz"
    );

    if (dictationType) {
      dictationType.value =
        String(
          settings.dictationType ||
          "reorder"
        );
    }

    if (dictationPassCount) {
      dictationPassCount.value =
        String(
          settings.dictationPassCount ||
          "3"
        );
    }

    playbackRate.value =
      String(
        settings.playbackRate || "1"
      );

    autoPlayCount.value =
      String(
        settings.autoPlayCount || "1"
      );

    shuffleChoices.checked =
      settings.shuffleChoices !== false;

    customCountWrap.classList.toggle(
      "hidden",
      questionCount.value !== "custom"
    );

    goimonCard.classList.toggle(
      "hidden",
      settings.goimonOpen === false
    );

    if (toggleGoimonBtn) {
      toggleGoimonBtn.textContent =
        settings.goimonOpen === false
          ? "ゴイモンを開く"
          : "ゴイモンを閉じる";

      toggleGoimonBtn.setAttribute(
        "aria-expanded",
        settings.goimonOpen === false
          ? "false"
          : "true"
      );
    }

    setAudioRate(
      settings.playbackRate || "1"
    );
  }

  // ============================================================
  // ニガテ管理
  // ============================================================

  function loadWeakMap() {
    const obj =
      safeParse(
        localStorage.getItem(
          WEAK_KEY
        ),
        {}
      );

    if (
      !obj ||
      typeof obj !== "object"
    ) {
      return {};
    }

    const out = {};

    Object
      .keys(obj)
      .forEach(id => {
        const value =
          obj[id];

        if (
          value &&
          typeof value === "object"
        ) {
          out[id] = {
            auto:
              !!value.auto,

            pin:
              !!value.pin
          };
        } else if (value) {
          out[id] = {
            auto: true,
            pin: false
          };
        }
      });

    return out;
  }

  function saveWeakMap(map) {
    localStorage.setItem(
      WEAK_KEY,
      JSON.stringify(map || {})
    );
  }

  function getWeakState(id) {
    const map =
      loadWeakMap();

    const state =
      map[String(id)] || {
        auto: false,
        pin: false
      };

    return {
      auto:
        !!state.auto,

      pin:
        !!state.pin
    };
  }

  function addAutoWeak(id) {
    const map =
      loadWeakMap();

    const key =
      String(id);

    if (!map[key]) {
      map[key] = {
        auto: false,
        pin: false
      };
    }

    map[key].auto = true;

    saveWeakMap(map);
  }

  function removeAutoWeak(id) {
    const map =
      loadWeakMap();

    const key =
      String(id);

    if (!map[key]) {
      return;
    }

    map[key].auto = false;

    if (
      !map[key].auto &&
      !map[key].pin
    ) {
      delete map[key];
    }

    saveWeakMap(map);
  }

  function setPinned(
    id,
    isPinned
  ) {
    const map =
      loadWeakMap();

    const key =
      String(id);

    if (!map[key]) {
      map[key] = {
        auto: false,
        pin: false
      };
    }

    map[key].pin =
      !!isPinned;

    if (
      !map[key].auto &&
      !map[key].pin
    ) {
      delete map[key];
    }

    saveWeakMap(map);
  }

  function getWeakQuestions() {
    const map =
      loadWeakMap();

    return getQuestionsByFormat().filter(q => {
      const state =
        map[q.id];

      return !!(
        state &&
        (
          state.auto ||
          state.pin
        )
      );
    });
  }

  function updateWeakInfo() {
    const weakQuestions =
      getWeakQuestions();

    weakInfo.textContent =
      `ニガテ問題：${weakQuestions.length}問`;

    startWeakBtn.disabled =
      weakQuestions.length === 0;

    retryWeakBtn.disabled =
      weakQuestions.length === 0;
  }

  function renderManualWeakButton() {
    if (
      !currentQuestion ||
      !manualWeakBtn
    ) {
      return;
    }

    const state =
      getWeakState(
        currentQuestion.id
      );

    manualWeakBtn.textContent =
      state.pin
        ? "手動ニガテを解除"
        : "手動ニガテに追加";

    manualWeakBtn.classList.toggle(
      "danger",
      state.pin
    );
  }
    // ============================================================
  // 続きからの出題位置
  // ============================================================

  function loadCursor() {
  const obj =
    safeParse(
      localStorage.getItem(
        CURSOR_KEY
      ),
      {}
    );

  const format =
    getSelectedFormat();

  const key =
    `format${format}`;

  const n =
    Number(
      obj?.[key] || 0
    );

  return (
    Number.isFinite(n) &&
    n >= 0
  )
    ? n
    : 0;
}

function saveCursor(cursor) {
  const obj =
    safeParse(
      localStorage.getItem(
        CURSOR_KEY
      ),
      {}
    );

  const format =
    getSelectedFormat();

  const key =
    `format${format}`;

  obj[key] =
    Math.max(
      0,
      Number(cursor || 0)
    );

  localStorage.setItem(
    CURSOR_KEY,
    JSON.stringify(obj)
  );
}

  // ============================================================
  // ゴイモン表示
  // ============================================================

  function renderGoimonMini() {
    if (
      !window.GoimonUI ||
      typeof window.GoimonUI.loadCurrent
        !== "function"
    ) {
      if (goimonMiniDesc) {
        goimonMiniDesc.textContent =
          "ゴイモン情報を読み込めませんでした。";
      }

      return;
    }

    try {
      const g =
        window.GoimonUI.loadCurrent();

      if (!g) {
        return;
      }

      const name =
        typeof window.GoimonUI
          .getGoimonPrimaryName
          === "function"
          ? window.GoimonUI
              .getGoimonPrimaryName(g)
          : "ゴイモン";

      const stage =
        typeof window.GoimonUI
          .getStageLabel
          === "function"
          ? window.GoimonUI
              .getStageLabel(g.stage)
          : String(
              g.stage || ""
            );

      const pointText =
        typeof window.GoimonUI
          .formatPoint
          === "function"
          ? window.GoimonUI
              .formatPoint(
                g.totalPoints || 0
              )
          : String(
              g.totalPoints || 0
            );

      if (goimonMiniImage) {
        goimonMiniImage.src =
          g.imageKey ||
          "images/goimon/goimon_egg.png";

        goimonMiniImage.alt =
          name;
      }

      if (goimonMiniName) {
        goimonMiniName.textContent =
          name;
      }

      if (goimonMiniStage) {
        goimonMiniStage.textContent =
          stage;
      }

      if (goimonMiniMeta) {
        goimonMiniMeta.textContent =
          `Lv ${g.level || 1} / ${pointText} pt`;
      }

      if (goimonMiniDesc) {
        goimonMiniDesc.textContent =
          "音をよく聞いて、おんかんを育てよう。";
      }

      renderEvolutionNotice();

    } catch (error) {
      console.warn(
        "ゴイモン表示に失敗しました。",
        error
      );
    }
  }

  /*
    goimon.js側から再描画するときにも
    呼べるようにしておきます。
  */
  window.renderListeningGoimonMini =
    renderGoimonMini;

  function renderEvolutionNotice() {
    if (
      !window.GoimonUI ||
      typeof window.GoimonUI
        .renderEvolutionNoticeButton
        !== "function"
    ) {
      return;
    }

    try {
      window.GoimonUI
        .renderEvolutionNoticeButton(
          "evolutionNoticeBtn"
        );

      if (
        typeof window.GoimonUI
          .bindEvolutionNoticeButton
          === "function"
      ) {
        window.GoimonUI
          .bindEvolutionNoticeButton(
            "evolutionNoticeBtn"
          );
      }
    } catch (error) {
      console.warn(
        "進化ボタン表示に失敗しました。",
        error
      );
    }
  }

  function awardListeningPoint(
    questionId,
    method
  ) {
    const awardKey =
      `${questionId}__${method}`;

    /*
      同じ問題・同じ学習方法では、
      同じセッション中に1回だけ加算します。
    */
    if (
      sessionAwardKeys.has(
        awardKey
      )
    ) {
      return false;
    }

    sessionAwardKeys.add(
      awardKey
    );

    try {
      if (
        window.GoimonUI &&
        typeof window.GoimonUI
          .addPointsByRuleKey
          === "function"
      ) {
        window.GoimonUI
          .addPointsByRuleKey(
            "listening"
          );
      }
    } catch (error) {
      console.warn(
        "ゴイモンへのポイント加算に失敗しました。",
        error
      );
    }

    onkanEarned += 1;

    renderGoimonMini();

    return true;
  }

  // ============================================================
  // 学習ログ
  // ============================================================

  function addLearningLog(
    isCorrect
  ) {
    try {
      if (
        typeof window.zenshoLogAdd
        === "function"
      ) {
        window.zenshoLogAdd(
          "listening",
          !!isCorrect
        );
      }
    } catch (error) {
      console.warn(
        "学習ログの保存に失敗しました。",
        error
      );
    }
  }

  // ============================================================
  // 出題数
  // ============================================================

  function getRequestedCount(
    poolLength
  ) {
    if (
      questionCount.value ===
      "all"
    ) {
      return poolLength;
    }

    if (
      questionCount.value ===
      "custom"
    ) {
      return clampInt(
        customCountInput.value,
        1,
        Math.max(
          1,
          poolLength
        ),
        Math.min(
          10,
          Math.max(
            1,
            poolLength
          )
        )
      );
    }

    return Math.min(
      poolLength,
      clampInt(
        questionCount.value,
        1,
        poolLength,
        10
      )
    );
  }

  // ============================================================
  // 出題プール
  // ============================================================

  function getSessionPool(
    forceWeak = false
  ) {
    if (
      forceWeak ||
      orderMode.value === "weak"
    ) {
      return getWeakQuestions();
    }

    return [
  ...getQuestionsByFormat()
];
  }

  function buildSessionQuestions(
    forceWeak = false
  ) {
    const pool =
      getSessionPool(
        forceWeak
      );

    if (!pool.length) {
      return [];
    }

    const count =
      getRequestedCount(
        pool.length
      );

    const mode =
      forceWeak
        ? "weak"
        : String(
            orderMode.value
          );

    /*
      ランダム・ニガテ
    */
    if (
      mode === "random" ||
      mode === "weak"
    ) {
      return shuffleArray(
        pool
      ).slice(
        0,
        count
      );
    }

    /*
      続きから
    */
    if (
      mode === "continue"
    ) {
      const start =
        loadCursor() %
        pool.length;

      const out = [];

      for (
        let i = 0;
        i < count;
        i++
      ) {
        out.push(
          pool[
            (
              start + i
            ) %
            pool.length
          ]
        );
      }

      return out;
    }

    /*
      先頭から
    */
    return pool.slice(
      0,
      count
    );
  }

  function buildQuestionsFromIds(
    ids
  ) {
    return (
      ids || []
    )
      .map(id => {
        return questionById.get(
          String(id)
        );
      })
      .filter(Boolean);
  }

  function rememberStartConfig(
    forceWeak
  ) {
    lastStartConfig = {
      forceWeak:
        !!forceWeak,

      settings:
        collectSettings()
    };
  }

    // ============================================================
  // ディクテーション共通処理
  // ============================================================

  function normalizeDictationText(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[^a-z0-9']/g, "")
      .trim();
  }

  function splitDictationTokens(text) {
    return String(text || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

   /*
    大問2の長いスクリプトを1文ずつに分割します。

    通常のピリオドだけで分けると、
    a.m.、p.m.、Mr.、Ms.などでも分割されてしまいます。
    そのため、略語内のピリオドを一時的に保護しています。
  */
  function splitDictationSentences(text) {
    const source =
      String(text || "").trim();

    if (!source) {
      return [];
    }

    const protectedDot = "__DOT__";

    const protectedSource = source
      /*
        a.m. / p.m.の内部のピリオドを保護します。

        文中の例：
        at 3:00 p.m. However, ...
      */
      .replace(
        /\b([ap])\.m\.(?=\s+[a-z])/gi,
        match => {
          return match.replace(
            /\./g,
            protectedDot
          );
        }
      )

      /*
        a.m. / p.m.が文末にある場合、
        最後のピリオドは文末記号として残します。
      */
      .replace(
        /\b([ap])\.m\./gi,
        (match, letter) => {
          return `${letter}${protectedDot}m.`;
        }
      )

      /*
        人名の敬称などに含まれるピリオドを保護します。
      */
      .replace(
        /\b(Mr\.|Mrs\.|Ms\.|Dr\.|St\.)/g,
        match => {
          return match.replace(
            /\./g,
            protectedDot
          );
        }
      )

      /*
        e.g. / i.e.を保護します。
      */
      .replace(
        /\b(e\.g\.|i\.e\.)/gi,
        match => {
          return match.replace(
            /\./g,
            protectedDot
          );
        }
      );

    /*
      ピリオド、疑問符、感嘆符を文末として分割します。
    */
    const matches =
      protectedSource.match(
        /[^.!?]+[.!?]+(?:["”’']+)?|[^.!?]+$/g
      );

    return (matches || [protectedSource])
      .map(sentence => {
        return sentence
          .replaceAll(protectedDot, ".")
          .trim();
      })
      .filter(Boolean);
  }

    /*
    1文分のディクテーション状態を作ります。
  */
  function createDictationSentenceState(
    sentence
  ) {
    return {
      sentence,

      /*
        1文ごとに単語を分割してシャッフル
      */
      tokens: shuffleArray(
        splitDictationTokens(sentence)
      ),

      /*
        学習者が選んだ単語
      */
      selectedIndexes: [],

      /*
        この文だけの採点状態
      */
      isCorrect: false,

      /*
        この文を何回答え合わせしたか
      */
      attempts: 0,

      /*
        採点後に表示するメッセージ
      */
      feedback: ""
    };
  }

  /*
    指定した文で選択済みの単語を取得します。
  */
  function getSentenceSelectedTokens(
    state
  ) {
    return state.selectedIndexes
      .map(index => {
        return state.tokens[index];
      })
      .filter(token => {
        return typeof token === "string";
      });
  }

  /*
    指定した文で選択済みの単語を、
    1つの英文としてつなげます。
  */
  function getSentenceSelectedText(
    state
  ) {
    return getSentenceSelectedTokens(
      state
    ).join(" ");
  }

  /*
    すべての文が正しい順序になっているか確認します。
  */
  function isReorderDictationCorrect() {
    if (
      !currentQuestion ||
      !dictationSentenceStates.length
    ) {
      return false;
    }

    return dictationSentenceStates.every(
      state => {
        const learnerAnswer =
          normalizeDictationText(
            getSentenceSelectedText(state)
          );

        const correctAnswer =
          normalizeDictationText(
            state.sentence
          );

        return (
          learnerAnswer === correctAnswer
        );
      }
    );
  }

    // ============================================================
  // 1文ずつディクテーション採点
  // ============================================================

  function checkDictationSentence(
    sentenceIndex
  ) {
    if (
      answered ||
      !currentQuestion
    ) {
      return;
    }

    const state =
      dictationSentenceStates[
        sentenceIndex
      ];

    if (
      !state ||
      state.isCorrect
    ) {
      return;
    }

    /*
      まだ単語を全部使っていない
    */
    if (
      state.selectedIndexes.length !==
      state.tokens.length
    ) {
      state.feedback =
        "まだ使っていない単語があります。";

      renderReorderDictation();
      return;
    }

    state.attempts += 1;

    const learnerAnswer =
      normalizeDictationText(
        getSentenceSelectedText(
          state
        )
      );

    const correctAnswer =
      normalizeDictationText(
        state.sentence
      );

    const isCorrect =
      learnerAnswer ===
      correctAnswer;

    /*
      不正解
    */
    if (!isCorrect) {
      state.feedback =
        `× 順番が違います。もう一度考えてみましょう。（${state.attempts}回目）`;

      addAutoWeak(
        currentQuestion.id
      );

      updateWeakInfo();

      renderReorderDictation();
      return;
    }

    /*
      正解
    */
    state.isCorrect = true;

    state.feedback =
      `○ 正解！（${state.attempts}回目）`;

    renderReorderDictation();

    /*
      すべての文に正解したか確認
    */
    const allCorrect =
      dictationSentenceStates.every(
        item => {
          return item.isCorrect;
        }
      );

    if (!allCorrect) {
      return;
    }

    /*
      全文完成
    */
    completeReorderDictation();
  }

    // ============================================================
  // すべての文が完成したときの処理
  // ============================================================

  function completeReorderDictation() {
    if (
      answered ||
      !currentQuestion
    ) {
      return;
    }

    answered = true;

    stopAudio();

    /*
      全文で何回答え合わせしたか
    */
    dictationAttempts =
      dictationSentenceStates.reduce(
        (sum, state) => {
          return (
            sum +
            Number(
              state.attempts || 0
            )
          );
        },
        0
      );

    answerResult.className =
      "answerResult ok";

    answerResult.textContent =
      "すべての文が完成しました！";

    scriptAnswerEn.textContent =
      currentQuestion.script;

    scriptAnswerJa.textContent =
      currentQuestion.scriptJa;

    scriptAnswerBox
      .classList
      .remove("hidden");

    explanationText.textContent =
      getDisplayExplanation(
        currentQuestion.explanation
      );

    explanationBox
      .classList
      .remove("hidden");

    afterAnswerActions
      .classList
      .remove("hidden");

    nextQuestionBtn.disabled =
      false;

    removeAutoWeak(
      currentQuestion.id
    );

    renderManualWeakButton();
    updateWeakInfo();

    const pointAdded =
      awardListeningPoint(
        currentQuestion.id,
        "dictation_reorder"
      );

    addLearningLog(true);

    const passLimit =
      clampInt(
        dictationPassCount?.value,
        1,
        5,
        3
      );

    sessionResults.push({
      id:
        currentQuestion.id,

      isCorrect:
        true,

      selectedId:
        "",

      answerId:
        currentQuestion.answerId,

      playCount,

      dictationAttempts,

      dictationPassed:
        playCount <= passLimit,

      pointAdded,

      method:
        "dictation_reorder"
    });
  }

  /*
    語句整序ディクテーションを準備します。
  */
  function prepareReorderDictation() {
    if (!currentQuestion) {
      return;
    }

        /*
      大問2・大問5は
      スクリプトを1文ずつに分割します。

      大問3などは、
      スクリプト全体を1文として扱います。
    */
    const sentences =
      (
        currentQuestion.format === 2 ||
        currentQuestion.format === 5
      )
        ? splitDictationSentences(
            currentQuestion.script
          )
        : [
            currentQuestion.script
          ];

    dictationSentenceStates =
      sentences.map(
        createDictationSentenceState
      );

    activeDictationSentenceIndex = 0;

    /*
      旧方式の変数は空にします。
    */
    dictationTokens = [];
    dictationSelectedIndexes = [];

    dictationAttempts = 0;

    reorderDictationPanel
      .classList
      .remove("hidden");

    fullDictationPanel
      .classList
      .add("hidden");

    renderReorderDictation();
  }

    /*
    文ごとの音声読み上げで使用する音声です。
  */
  let currentSentenceUtterance = null;
  let currentSentencePlayButton = null;

  /*
    ブラウザに登録されている英語音声を取得します。
  */
  function getEnglishSpeechVoice() {
    if (
      !("speechSynthesis" in window)
    ) {
      return null;
    }

    const voices =
      window.speechSynthesis.getVoices();

    if (!voices.length) {
      return null;
    }

    /*
      まずアメリカ英語を探し、
      なければ他の英語音声を使用します。
    */
    return (
      voices.find(voice => {
        return /^en-US/i.test(voice.lang);
      }) ||
      voices.find(voice => {
        return /^en/i.test(voice.lang);
      }) ||
      null
    );
  }

  /*
    指定した1文だけを読み上げます。
  */
  function playDictationSentence(
    sentence,
    button
  ) {
    const text =
      String(sentence || "").trim();

    if (!text) {
      return;
    }

    if (
      !("speechSynthesis" in window)
    ) {
      answerResult.className =
        "answerResult ng";

      answerResult.textContent =
        "このブラウザでは文ごとの音声再生を利用できません。";

      return;
    }

    /*
      すでに読み上げ中の場合は停止します。
    */
    window.speechSynthesis.cancel();

    if (currentSentencePlayButton) {
      currentSentencePlayButton
        .classList
        .remove("isPlaying");

      currentSentencePlayButton.textContent =
        "▶ この文を聞く";
    }

    const utterance =
      new SpeechSynthesisUtterance(text);

    const voice =
      getEnglishSpeechVoice();

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = "en-US";
    }

    /*
      ページ上部で選択している再生速度を反映します。
      SpeechSynthesisのrateは音声によって差があるため、
      極端な値にならないよう調整します。
    */
    const selectedRate =
  Number(
    dictationSentenceSpeed?.value ||
    1
  );

    utterance.rate =
      Math.min(
        1.4,
        Math.max(
          0.7,
          selectedRate
        )
      );

    utterance.pitch = 1;
    utterance.volume = 1;

    currentSentenceUtterance =
      utterance;

    currentSentencePlayButton =
      button;

    button.classList.add(
      "isPlaying"
    );

    button.textContent =
      "■ 停止";

    utterance.onend = () => {
      button.classList.remove(
        "isPlaying"
      );

      button.textContent =
        "▶ この文を聞く";

      if (
        currentSentencePlayButton ===
        button
      ) {
        currentSentencePlayButton =
          null;

        currentSentenceUtterance =
          null;
      }
    };

    utterance.onerror = event => {
      /*
        cancelによる終了は通常の停止として扱います。
      */
      if (
        event.error !== "canceled" &&
        event.error !== "interrupted"
      ) {
        console.warn(
          "文の読み上げに失敗しました。",
          event
        );
      }

      button.classList.remove(
        "isPlaying"
      );

      button.textContent =
        "▶ この文を聞く";

      if (
        currentSentencePlayButton ===
        button
      ) {
        currentSentencePlayButton =
          null;

        currentSentenceUtterance =
          null;
      }
    };

    window.speechSynthesis.speak(
      utterance
    );
  }

  /*
    文ごとの読み上げを停止します。
  */
  function stopDictationSentenceAudio() {
    if (
      "speechSynthesis" in window
    ) {
      window.speechSynthesis.cancel();
    }

    if (currentSentencePlayButton) {
      currentSentencePlayButton
        .classList
        .remove("isPlaying");

      currentSentencePlayButton.textContent =
        "▶ この文を聞く";
    }

    currentSentencePlayButton = null;
    currentSentenceUtterance = null;
  }


  /*
    文ごとの解答欄と単語バンクを表示します。
  */
  function renderReorderDictation() {
    dictationAnswerArea.innerHTML = "";

    dictationSentenceStates.forEach(
      (state, sentenceIndex) => {
        /*
          1文分の外側のカード
        */
        const block =
          document.createElement("section");

        block.className =
          "dictationSentenceBlock";

        /*
          文番号と音声ボタンを並べる見出し
        */
        const sentenceHeader =
          document.createElement("div");

        sentenceHeader.className =
          "dictationSentenceHeader";

        /*
          「文1」「文2」などの表示
        */
        const label =
          document.createElement("div");

        label.className =
          "dictationSentenceLabel";

        label.textContent =
          dictationSentenceStates.length > 1
            ? `文 ${sentenceIndex + 1}`
            : "英文";

        sentenceHeader.appendChild(label);

        /*
          この文だけを読み上げるボタン
        */
        const sentencePlayBtn =
          document.createElement("button");

        sentencePlayBtn.type =
          "button";

        sentencePlayBtn.className =
          "dictationSentencePlayBtn";

        sentencePlayBtn.textContent =
          "▶ この文を聞く";

        sentencePlayBtn.setAttribute(
          "aria-label",
          `文${sentenceIndex + 1}を再生`
        );

        sentencePlayBtn.addEventListener(
          "click",
          () => {
            /*
              同じボタンを再度押した場合は停止します。
            */
            if (
              currentSentencePlayButton ===
              sentencePlayBtn
            ) {
              stopDictationSentenceAudio();
              return;
            }

            playDictationSentence(
              state.sentence,
              sentencePlayBtn
            );
          }
        );

        sentenceHeader.appendChild(
          sentencePlayBtn
        );

        block.appendChild(
          sentenceHeader
        );

        /*
          選択済みの単語を表示する解答欄
        */
        const answerArea =
          document.createElement("div");

        answerArea.className =
          "dictationAnswerArea";

        const selectedTokens =
          getSentenceSelectedTokens(state);

        if (selectedTokens.length) {
          selectedTokens.forEach(
            (token, selectedPosition) => {
              const chip =
                document.createElement(
                  "button"
                );

              chip.type = "button";
              chip.className = "wordChip";
              chip.textContent = token;

              chip.title =
                "クリックするとこの語以降を戻します";

              chip.addEventListener(
                "click",
                () => {
                  if (
  answered ||
  state.isCorrect
) {
  return;
}

                  activeDictationSentenceIndex =
                    sentenceIndex;

                  /*
                    押した単語と、それ以降の単語を
                    単語バンクへ戻します。
                  */
                  state.selectedIndexes =
                    state.selectedIndexes.slice(
                      0,
                      selectedPosition
                    );

                  renderReorderDictation();
                }
              );

              answerArea.appendChild(chip);
            }
          );
        } else {
          const note =
            document.createElement("span");

          note.className = "muted";

          note.textContent =
            "下の単語を、聞こえた順番に選んでください。";

          answerArea.appendChild(note);
        }

        block.appendChild(answerArea);

        /*
          この文専用の単語バンク
        */
        const bank =
          document.createElement("div");

        bank.className = "wordBank";

        state.tokens.forEach(
          (token, tokenIndex) => {
            const isUsed =
              state.selectedIndexes.includes(
                tokenIndex
              );

            const btn =
              document.createElement("button");

            btn.type = "button";
            btn.className = "wordChip";
            btn.textContent = token;

            if (isUsed) {
              btn.classList.add("used");
              btn.disabled = true;
            }

            btn.addEventListener(
              "click",
              () => {
                if (
                  answered ||
                  state.isCorrect ||
                  state.selectedIndexes.includes(
                    tokenIndex
                  )
                ) {
                  return;
                }

                activeDictationSentenceIndex =
                  sentenceIndex;

                state.selectedIndexes.push(
                  tokenIndex
                );

                renderReorderDictation();
              }
            );

            bank.appendChild(btn);
          }
        );

        block.appendChild(bank);

                /*
          この文専用の答え合わせ
        */
        const sentenceCheckArea =
          document.createElement(
            "div"
          );

        sentenceCheckArea.className =
          "dictationSentenceCheckArea";

        const sentenceCheckBtn =
          document.createElement(
            "button"
          );

        sentenceCheckBtn.type =
          "button";

        sentenceCheckBtn.className =
          "primary dictationSentenceCheckBtn";

        /*
          正解済みなら押せない
        */
        sentenceCheckBtn.disabled =
          state.isCorrect ||
          state.selectedIndexes.length !==
            state.tokens.length;

        sentenceCheckBtn.textContent =
          state.isCorrect
            ? "✓ この文は正解"
            : "この文を答え合わせ";

        sentenceCheckBtn.addEventListener(
          "click",
          () => {
            checkDictationSentence(
              sentenceIndex
            );
          }
        );

        sentenceCheckArea.appendChild(
          sentenceCheckBtn
        );

        /*
          ○×メッセージ
        */
        if (state.feedback) {
          const feedback =
            document.createElement(
              "div"
            );

          feedback.className =
            state.isCorrect
              ? "dictationSentenceFeedback correct"
              : "dictationSentenceFeedback wrong";

          feedback.textContent =
            state.feedback;

          sentenceCheckArea.appendChild(
            feedback
          );
        }

        block.appendChild(
          sentenceCheckArea
        );

        dictationAnswerArea.appendChild(
          block
        );
      }
    );

    /*
      すべての文ですべての単語を使ったときだけ、
      「解答する」を押せるようにします。
    */
    checkReorderBtn.disabled =
      !dictationSentenceStates.length ||
      dictationSentenceStates.some(
        state => {
          return (
            state.selectedIndexes.length !==
            state.tokens.length
          );
        }
      );
  }

  /*
    語句整序ディクテーションを採点します。
  */
  function checkReorderDictation() {
    if (
      !currentQuestion ||
      answered
    ) {
      return;
    }

    /*
      単語を使い切っていない文があるか確認します。
    */
    const incompleteIndex =
      dictationSentenceStates.findIndex(
        state => {
          return (
            state.selectedIndexes.length !==
            state.tokens.length
          );
        }
      );

    if (incompleteIndex >= 0) {
      answerResult.className =
        "answerResult ng";

      answerResult.textContent =
        dictationSentenceStates.length > 1
          ? `文${incompleteIndex + 1}に、まだ使っていない単語があります。`
          : "まだ使っていない単語があります。";

      return;
    }

    dictationAttempts += 1;

    const isCorrect =
      isReorderDictationCorrect();

    answerResult
      .classList
      .remove("hidden");

    if (!isCorrect) {
      /*
        間違っている文番号を取得します。
      */
      const wrongIndexes =
        dictationSentenceStates
          .map((state, index) => {
            const learnerAnswer =
              normalizeDictationText(
                getSentenceSelectedText(
                  state
                )
              );

            const correctAnswer =
              normalizeDictationText(
                state.sentence
              );

            return learnerAnswer ===
              correctAnswer
                ? -1
                : index + 1;
          })
          .filter(index => {
            return index > 0;
          });

      answerResult.className =
        "answerResult ng";

      answerResult.textContent =
        dictationSentenceStates.length > 1
          ? `文${wrongIndexes.join(
              "・"
            )}の順番が違います。もう一度並べ替えてください。（解答回数：${dictationAttempts}回）`
          : `順番が違います。もう一度並べ替えてください。（解答回数：${dictationAttempts}回）`;

      addAutoWeak(
        currentQuestion.id
      );

      updateWeakInfo();

      return;
    }

    /*
      全文正解
    */
    answered = true;

    stopAudio();

    answerResult.className =
      "answerResult ok";

    answerResult.textContent =
      `正解です。再生${playCount}回・解答${dictationAttempts}回で完成しました。`;

    scriptAnswerEn.textContent =
      currentQuestion.script;

    scriptAnswerJa.textContent =
      currentQuestion.scriptJa;

    scriptAnswerBox
      .classList
      .remove("hidden");

    /*
      解説内のA〜Dを、
      現在表示されている選択肢番号に変換します。
    */
    explanationText.textContent =
      getDisplayExplanation(
        currentQuestion.explanation
      );

    explanationBox
      .classList
      .remove("hidden");

    afterAnswerActions
      .classList
      .remove("hidden");

    nextQuestionBtn.disabled = false;

    removeAutoWeak(
      currentQuestion.id
    );

    renderManualWeakButton();
    updateWeakInfo();

    const pointAdded =
      awardListeningPoint(
        currentQuestion.id,
        "dictation_reorder"
      );

    addLearningLog(true);

    const passLimit =
      clampInt(
        dictationPassCount?.value,
        1,
        5,
        3
      );

    sessionResults.push({
      id: currentQuestion.id,
      isCorrect: true,
      selectedId: "",
      answerId:
        currentQuestion.answerId,
      playCount,
      dictationAttempts,

      dictationPassed:
        playCount <= passLimit,

      pointAdded,

      method:
        "dictation_reorder"
    });
  }

    // ============================================================
  // 全文入力ディクテーション
  // ============================================================

  function prepareFullDictation() {
    if (!currentQuestion) {
      return;
    }

    fullDictationAttempts = 0;

    reorderDictationPanel
      .classList
      .add("hidden");

    fullDictationPanel
      .classList
      .remove("hidden");

    fullDictationInput.value =
      "";

    fullDictationInput.disabled =
      false;

    clearFullDictationBtn.disabled =
      false;

    checkFullDictationBtn.disabled =
      true;

    fullDictationGuide.textContent =
      "聞こえた英文を入力してください。";

    window.setTimeout(
      () => {
        fullDictationInput.focus();
      },
      100
    );
  }

  function getFullDictationAnswer() {
    return String(
      fullDictationInput.value || ""
    ).trim();
  }

  function isFullDictationCorrect() {
    if (!currentQuestion) {
      return false;
    }

    return (
      normalizeDictationText(
        getFullDictationAnswer()
      ) ===
      normalizeDictationText(
        currentQuestion.script
      )
    );
  }

  function checkFullDictation() {
    if (
      !currentQuestion ||
      answered
    ) {
      return;
    }

    const inputText =
      getFullDictationAnswer();

    if (!inputText) {
      answerResult.className =
        "answerResult ng";

      answerResult.textContent =
        "英文を入力してください。";

      fullDictationInput.focus();

      return;
    }

    fullDictationAttempts += 1;

    const isCorrect =
      isFullDictationCorrect();

    answerResult
      .classList
      .remove("hidden");

    if (!isCorrect) {
      answerResult.className =
        "answerResult ng";

      answerResult.textContent =
        `まだ正解ではありません。` +
        `もう一度音声を聞いて修正しましょう。` +
        `（解答回数：${fullDictationAttempts}回）`;

      fullDictationGuide.textContent =
        "つづり、語順、抜けている語を確認してください。";

      addAutoWeak(
        currentQuestion.id
      );

      updateWeakInfo();

      fullDictationInput.focus();

      return;
    }

    answered = true;

    stopAudio();

    answerResult.className =
      "answerResult ok";

    answerResult.textContent =
      `正解です。` +
      `再生${playCount}回・` +
      `解答${fullDictationAttempts}回で完成しました。`;

    fullDictationInput.disabled =
      true;

    clearFullDictationBtn.disabled =
      true;

    checkFullDictationBtn.disabled =
      true;

    fullDictationGuide.textContent =
      "正しい英文を完成できました。";

    scriptAnswerEn.textContent =
      currentQuestion.script;

    scriptAnswerJa.textContent =
      currentQuestion.scriptJa;

    scriptAnswerBox
      .classList
      .remove("hidden");

    explanationText.textContent =
      getDisplayExplanation(
        currentQuestion.explanation
      );

    explanationBox
      .classList
      .remove("hidden");

    afterAnswerActions
      .classList
      .remove("hidden");

    nextQuestionBtn.disabled =
      false;

    removeAutoWeak(
      currentQuestion.id
    );

    renderManualWeakButton();
    updateWeakInfo();

    const pointAdded =
      awardListeningPoint(
        currentQuestion.id,
        "dictation_full"
      );

    addLearningLog(true);

    const passLimit =
      clampInt(
        dictationPassCount?.value,
        1,
        5,
        3
      );

    sessionResults.push({
      id:
        currentQuestion.id,

      isCorrect:
        true,

      selectedId:
        "",

      answerId:
        currentQuestion.answerId,

      playCount:
        playCount,

      dictationAttempts:
        fullDictationAttempts,

      dictationPassed:
        playCount <= passLimit,

      pointAdded:
        pointAdded,

      method:
        "dictation_full"
    });
  }

    // ============================================================
  // オーバーラッピング
  // ============================================================

  function prepareOverlapping() {
    if (!currentQuestion) {
      return;
    }

    overlappingScript.textContent =
      currentQuestion.script;

    overlappingJa.textContent =
      currentQuestion.scriptJa;

    completeOverlappingBtn.disabled =
      true;

    repeatOverlappingBtn.disabled =
      false;

    answerResult.className =
      "answerResult hidden";

    answerResult.textContent =
      "";

    scriptAnswerBox
      .classList
      .add("hidden");

    explanationBox
      .classList
      .add("hidden");

    afterAnswerActions
      .classList
      .add("hidden");

    nextQuestionBtn.disabled =
      true;
  }

  async function practiceOverlapping() {
    if (
      !currentQuestion ||
      answered
    ) {
      return;
    }

    const played =
      await playAudio({
        countAsPlay: true
      });

    if (played) {
      completeOverlappingBtn.disabled =
        false;

      audioMessage.textContent =
        "スクリプトを見ながら、音声と同時に発音してください。";
    }
  }

  function completeOverlapping() {
    if (
      !currentQuestion ||
      answered
    ) {
      return;
    }

    if (playCount < 1) {
      answerResult.className =
        "answerResult ng";

      answerResult.textContent =
        "まず音声を再生して、オーバーラッピングを行ってください。";

      return;
    }

    answered = true;

    stopAudio();

    completeOverlappingBtn.disabled =
      true;

    repeatOverlappingBtn.disabled =
      true;

    answerResult.className =
      "answerResult ok";

    answerResult.textContent =
      `オーバーラッピング完了！` +
      `音声に合わせて${playCount}回練習しました。`;

    scriptAnswerEn.textContent =
      currentQuestion.script;

    scriptAnswerJa.textContent =
      currentQuestion.scriptJa;

    scriptAnswerBox
      .classList
      .remove("hidden");

    explanationText.textContent =
      currentQuestion.explanation ||
      "音声のリズム、強弱、音のつながりを意識して練習しましょう。";

    explanationBox
      .classList
      .remove("hidden");

    afterAnswerActions
      .classList
      .remove("hidden");

    nextQuestionBtn.disabled =
      false;

    const pointAdded =
      awardListeningPoint(
        currentQuestion.id,
        "overlapping"
      );

    addLearningLog(true);

    sessionResults.push({
      id:
        currentQuestion.id,

      isCorrect:
        true,

      selectedId:
        "",

      answerId:
        currentQuestion.answerId,

      playCount:
        playCount,

      practiceCount:
        playCount,

      pointAdded:
        pointAdded,

      method:
        "overlapping"
    });

    renderManualWeakButton();
    updateWeakInfo();
  }

    // ============================================================
  // シャドーイング
  // ============================================================

  function prepareShadowing() {
    if (!currentQuestion) {
      return;
    }

    shadowingScript.textContent =
      currentQuestion.script;

    shadowingJa.textContent =
      currentQuestion.scriptJa;

    /*
      最初はスクリプトを隠す
    */
    shadowingScriptBox
      .classList
      .add("hidden");

    toggleShadowingScriptBtn.textContent =
      "スクリプトを表示";

    completeShadowingBtn.disabled =
      true;

    repeatShadowingBtn.disabled =
      false;

    answerResult.className =
      "answerResult hidden";

    answerResult.textContent =
      "";

    scriptAnswerBox
      .classList
      .add("hidden");

    explanationBox
      .classList
      .add("hidden");

    afterAnswerActions
      .classList
      .add("hidden");

    nextQuestionBtn.disabled =
      true;
  }

  function toggleShadowingScript() {
    const isHidden =
      shadowingScriptBox
        .classList
        .contains("hidden");

    shadowingScriptBox
      .classList
      .toggle(
        "hidden",
        !isHidden
      );

    toggleShadowingScriptBtn.textContent =
      isHidden
        ? "スクリプトを隠す"
        : "スクリプトを表示";
  }

  async function practiceShadowing() {
    if (
      !currentQuestion ||
      answered
    ) {
      return;
    }

    const played =
      await playAudio({
        countAsPlay: true
      });

    if (played) {
      completeShadowingBtn.disabled =
        false;

      audioMessage.textContent =
        "音声の少し後を追いながら発音してください。";
    }
  }

  function completeShadowing() {
    if (
      !currentQuestion ||
      answered
    ) {
      return;
    }

    if (playCount < 1) {
      answerResult.className =
        "answerResult ng";

      answerResult.textContent =
        "まず音声を再生して、シャドーイングを行ってください。";

      return;
    }

    answered = true;

    stopAudio();

    completeShadowingBtn.disabled =
      true;

    repeatShadowingBtn.disabled =
      true;

    toggleShadowingScriptBtn.disabled =
      false;

    answerResult.className =
      "answerResult ok";

    answerResult.textContent =
      `シャドーイング完了！` +
      `音声を追いながら${playCount}回練習しました。`;

    /*
      完了後は正しい英文を表示
    */
    shadowingScriptBox
      .classList
      .remove("hidden");

    toggleShadowingScriptBtn.textContent =
      "スクリプトを隠す";

    scriptAnswerEn.textContent =
      currentQuestion.script;

    scriptAnswerJa.textContent =
      currentQuestion.scriptJa;

    scriptAnswerBox
      .classList
      .remove("hidden");

    explanationText.textContent =
      currentQuestion.explanation ||
      "英語のリズム、強弱、音のつながりを意識して練習しましょう。";

    explanationBox
      .classList
      .remove("hidden");

    afterAnswerActions
      .classList
      .remove("hidden");

    nextQuestionBtn.disabled =
      false;

    const pointAdded =
      awardListeningPoint(
        currentQuestion.id,
        "shadowing"
      );

    addLearningLog(true);

    sessionResults.push({
      id:
        currentQuestion.id,

      isCorrect:
        true,

      selectedId:
        "",

      answerId:
        currentQuestion.answerId,

      playCount:
        playCount,

      practiceCount:
        playCount,

      pointAdded:
        pointAdded,

      method:
        "shadowing"
    });

    renderManualWeakButton();
    updateWeakInfo();
  }

  // ============================================================
  // 解答表示の初期化
  // ============================================================

    function resetAnswerDisplay() {
    answered = false;

    answerResult.className =
      "answerResult hidden";

    answerResult.textContent =
      "";

    scriptAnswerBox
      .classList
      .add("hidden");

    scriptAnswerEn.textContent =
      "";

    scriptAnswerJa.textContent =
      "";

    explanationBox
      .classList
      .add("hidden");

    explanationText.textContent =
      "";

    afterAnswerActions
      .classList
      .add("hidden");

    nextQuestionBtn.disabled =
      true;

    choicesEl.innerHTML =
      "";
    
        /*
      大問5の状態を初期化
    */
    type5SelectedAnswers = {};

    if (type5QuestionList) {
      type5QuestionList.innerHTML =
        "";
    }

    if (type5CheckBtn) {
      type5CheckBtn.disabled =
        true;
    }

    if (type5Result) {
      type5Result.className =
        "type5Result hidden";

      type5Result.textContent =
        "";
    }

    if (type5ModePanel) {
      type5ModePanel
        .classList
        .add("hidden");
    }

    if (type5ScriptAction) {
      type5ScriptAction
        .classList
        .add("hidden");
    }

    if (type5ReviewCard) {
      type5ReviewCard
        .classList
        .add("hidden");
    }

    if (type5FixedFooter) {
      type5FixedFooter
        .classList
        .add("hidden");
    }

    if (type5NextBtn) {
      type5NextBtn.disabled =
        true;
    }

    document.body.classList.remove(
      "type5FooterOpen"
    );

    /*
      通常の次へボタンは
      いったん元に戻す
    */
    nextQuestionBtn
      .classList
      .remove("hidden");

    closeType5ScriptSheet();

    /*
      ディクテーションの状態も初期化
    */
    dictationTokens = [];
    dictationSelectedIndexes = [];

    dictationSentenceStates = [];
    activeDictationSentenceIndex = 0;

    dictationAttempts = 0;

    if (dictationAnswerArea) {
      dictationAnswerArea.innerHTML =
        "";
    }

    if (wordBank) {
      wordBank.innerHTML =
        "";
    }

    if (checkReorderBtn) {
      checkReorderBtn.disabled =
        true;
    }

    if (reorderDictationPanel) {
      reorderDictationPanel
        .classList
        .add("hidden");
    }

    if (fullDictationPanel) {
      fullDictationPanel
        .classList
        .add("hidden");
    }
        fullDictationAttempts = 0;

    if (fullDictationInput) {
      fullDictationInput.value =
        "";

      fullDictationInput.disabled =
        false;
    }

    if (fullDictationGuide) {
      fullDictationGuide.textContent =
        "入力後、「解答する」を押してください。";
    }

    if (clearFullDictationBtn) {
      clearFullDictationBtn.disabled =
        false;
    }

    if (checkFullDictationBtn) {
      checkFullDictationBtn.disabled =
        true;
    }

      if (overlappingScript) {
      overlappingScript.textContent =
        "";
    }

    if (overlappingJa) {
      overlappingJa.textContent =
        "";
    }

    if (completeOverlappingBtn) {
      completeOverlappingBtn.disabled =
        true;
    }

    if (repeatOverlappingBtn) {
      repeatOverlappingBtn.disabled =
        false;
    }
    if (shadowingScriptBox) {
      shadowingScriptBox
        .classList
        .add("hidden");
    }

    if (shadowingScript) {
      shadowingScript.textContent =
        "";
    }

    if (shadowingJa) {
      shadowingJa.textContent =
        "";
    }

    if (toggleShadowingScriptBtn) {
      toggleShadowingScriptBtn.textContent =
        "スクリプトを表示";

      toggleShadowingScriptBtn.disabled =
        false;
    }

    if (completeShadowingBtn) {
      completeShadowingBtn.disabled =
        true;
    }

    if (repeatShadowingBtn) {
      repeatShadowingBtn.disabled =
        false;
    }}

  // ============================================================
  // 学習方法別パネル切替
  // ============================================================

  function showModePanel(
    method
  ) {
    quizModePanel
      .classList
      .toggle(
        "hidden",
        method !== "quiz"
      );

    dictationModePanel
      .classList
      .toggle(
        "hidden",
        method !== "dictation"
      );

    overlappingModePanel
      .classList
      .toggle(
        "hidden",
        method !== "overlapping"
      );

    shadowingModePanel
      .classList
      .toggle(
        "hidden",
        method !== "shadowing"
      );
  }

  // ============================================================
  // 問題表示
  // ============================================================

    function renderQuestion() {
    stopAudio();
    resetAnswerDisplay();

    currentQuestion =
      sessionQuestions[
        currentIndex
      ] || null;

    if (!currentQuestion) {
      showSummary();
      return;
    }

    playCount = 0;
    updatePlayCount();

    const method =
      getSelectedMethod();

    showModePanel(method);

    /*
      問題番号表示
    */
    if (
      window.QuizUICommon &&
      typeof window.QuizUICommon
        .renderQuestionProgress ===
        "function"
    ) {
      window.QuizUICommon
        .renderQuestionProgress(
          questionProgress,
          currentIndex + 1,
          sessionQuestions.length
        );
    } else {
      questionProgress.textContent =
        `第${currentIndex + 1}問 / ` +
        `${sessionQuestions.length}問`;
    }

    questionMeta.textContent =
      `大問${currentQuestion.format}形式・` +
      `${METHOD_LABELS[method] || method}・` +
      `${currentQuestion.id}`;

    questionAudio.src =
      currentQuestion.audioFile;

    questionAudio.load();

    setAudioRate(
      playbackRate.value
    );

    renderManualWeakButton();

    /*
      4択リスニング
    */
       if (
      method === "quiz"
    ) {

      /*
        大問5
      */
      if (
        Number(
          currentQuestion.format
        ) === 5
      ) {
        currentChoices = [];
      
                /*
          大問5では専用固定フッターの
          「次へ」を使う
        */
        nextQuestionBtn
          .classList
          .add("hidden");

        /*
          通常4択画面は隠す
        */
        quizModePanel
          .classList
          .add("hidden");

        /*
          大問5専用画面を表示
        */
        type5ModePanel
          .classList
          .remove("hidden");

        dictationModePanel
          .classList
          .add("hidden");

        overlappingModePanel
          .classList
          .add("hidden");

        shadowingModePanel
          .classList
          .add("hidden");

        audioMessage.textContent =
          "英文を聞いて、5つの問題に答えてください。";

        renderType5Quiz();

      /*
        大問2・3
      */
      } else {

        type5ModePanel
          .classList
          .add("hidden");

        quizModePanel
          .classList
          .remove("hidden");

        audioMessage.textContent =
          "音声を聞いて、最も適切な応答を選んでください。";

        currentChoices =
          shuffleChoices.checked
            ? shuffleArray(
                currentQuestion.choices
              )
            : [
                ...currentQuestion.choices
              ];

        renderChoices();
      }

    /*
      ディクテーション
    */
    } else if (
      method === "dictation"
    ) {
      currentChoices = [];

      quizModePanel
        .classList
        .add("hidden");

      dictationModePanel
        .classList
        .remove("hidden");

      overlappingModePanel
        .classList
        .add("hidden");

      shadowingModePanel
        .classList
        .add("hidden");

            const selectedDictationType =
        Number(
          currentQuestion.format
        ) === 5
          ? "reorder"
          : String(
              dictationType?.value ||
              "reorder"
            );

      if (
        Number(
          currentQuestion.format
        ) === 5 &&
        dictationType
      ) {
        dictationType.value =
          "reorder";
      }

      /*
        語句並べ替え
      */
            if (
        selectedDictationType ===
        "reorder"
      ) {
        audioMessage.textContent =
          "音声を聞き、単語を正しい順番に並べてください。";

        prepareReorderDictation();

      } else if (
        selectedDictationType ===
        "full"
      ) {
        audioMessage.textContent =
          "音声を聞き、英文をすべて入力してください。";

        prepareFullDictation();

      } else {
        audioMessage.textContent =
          "音声を聞き、単語を正しい順番に並べてください。";

        prepareReorderDictation();
      }

        /*
      オーバーラッピング
    */
    } else if (
      method === "overlapping"
    ) {
      currentChoices = [];

      quizModePanel
        .classList
        .add("hidden");

      dictationModePanel
        .classList
        .add("hidden");

      overlappingModePanel
        .classList
        .remove("hidden");

      shadowingModePanel
        .classList
        .add("hidden");

      audioMessage.textContent =
        "スクリプトを見ながら、音声と同時に発音してください。";

      prepareOverlapping();

       /*
      シャドーイング
    */
    } else if (
      method === "shadowing"
    ) {
      currentChoices = [];

      quizModePanel
        .classList
        .add("hidden");

      dictationModePanel
        .classList
        .add("hidden");

      overlappingModePanel
        .classList
        .add("hidden");

      shadowingModePanel
        .classList
        .remove("hidden");

      audioMessage.textContent =
        "音声の少し後を追いながら発音してください。";

      prepareShadowing();
    }

    showOnly("play");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    const autoCount =
      clampInt(
        autoPlayCount.value,
        0,
        3,
        1
      );

    if (
      autoCount > 0
    ) {
      window.setTimeout(
        () => {
          autoPlayAudio(
            autoCount
          );
        },
        300
      );
    }
  }

    /*
    元データの選択肢IDが、
    現在何番目に表示されているかを取得します。

    例：
    元データのAがシャッフル後3番目なら3を返します。
  */
  function getChoiceDisplayNumber(
    choiceId
  ) {
    const index =
      currentChoices.findIndex(
        choice => {
          return (
            String(choice.id) ===
            String(choiceId)
          );
        }
      );

    return index >= 0
      ? index + 1
      : null;
  }

  /*
    解説文に含まれるA〜Dを、
    現在の表示順に対応した
    「選択肢1〜4」へ置き換えます。

    例：
    Aがシャッフル後3番目の場合

    「Aが正解です」
        ↓
    「選択肢3が正解です」
  */
  function getDisplayExplanation(
    rawExplanation
  ) {
    const source =
      String(
        rawExplanation ||
        "解説はありません。"
      );

    if (!currentChoices.length) {
      return source;
    }

    const idToLabel = {};

    currentChoices.forEach(
      (choice, index) => {
        const choiceId =
          String(choice.id)
            .toUpperCase();

        idToLabel[choiceId] =
          `選択肢${index + 1}`;
      }
    );

    /*
      単語として独立しているA〜Dだけを変換します。

      そのため、英文内の通常の文字まで
      誤って置き換えることを防げます。
    */
    return source.replace(
      /(^|[^A-Za-z0-9_])([A-D])(?=($|[^A-Za-z0-9_]))/g,

      (
        match,
        before,
        choiceId
      ) => {
        return (
          before +
          (
            idToLabel[choiceId] ||
            choiceId
          )
        );
      }
    );
  }

    // ============================================================
  // 大問5：5問一括回答
  // ============================================================

    function renderType5Quiz() {
    if (
      !currentQuestion ||
      Number(currentQuestion.format) !== 5
    ) {
      return;
    }

    type5SelectedAnswers = {};

    type5QuestionList.innerHTML =
      "";

    type5Result.className =
      "type5Result hidden";

    type5Result.textContent =
      "";

    type5CheckBtn.disabled =
      true;

    /*
      全文スクリプトボタンは
      答え合わせ前には表示しない
    */
    type5ScriptAction
      .classList
      .add("hidden");

    closeType5ScriptSheet();

    const questions =
      Array.isArray(
        currentQuestion.questions
      )
        ? currentQuestion.questions
        : [];

    questions.forEach(
      (
        subQuestion,
        questionIndex
      ) => {

        const card =
          document.createElement(
            "div"
          );

        card.className =
          "type5QuestionCard";

        card.dataset.questionId =
          subQuestion.id;

        /*
          Q番号
        */
        const head =
          document.createElement(
            "div"
          );

        head.className =
          "type5QuestionHead";

        head.textContent =
          `Q${questionIndex + 1}`;

        /*
          問題文
        */
        const stem =
          document.createElement(
            "div"
          );

        stem.className =
          "type5Stem";

        stem.textContent =
          subQuestion.stem;

        /*
          選択肢
        */
        const choicesBox =
          document.createElement(
            "div"
          );

        choicesBox.className =
          "type5Choices";

        const displayChoices =
          shuffleChoices.checked
            ? shuffleArray(
                subQuestion.choices
              )
            : [
                ...subQuestion.choices
              ];

        displayChoices.forEach(
          (
            choice,
            choiceIndex
          ) => {

            const btn =
              document.createElement(
                "button"
              );

            btn.type =
              "button";

            btn.className =
              "type5ChoiceBtn";

            btn.dataset.questionId =
              subQuestion.id;

            btn.dataset.choiceId =
              choice.id;

            btn.innerHTML = `
              <span class="type5ChoiceNumber">
                ${choiceIndex + 1}
              </span>

              <span class="type5ChoiceText">

                <span class="type5ChoiceEn">
                  ${escapeHtml(
                    choice.text
                  )}
                </span>

                <span class="type5ChoiceJa">
                  ${escapeHtml(
                    choice.ja ||
                    "日本語訳はありません。"
                  )}
                </span>

              </span>
            `;

            btn.addEventListener(
              "click",
              () => {
                selectType5Choice(
                  subQuestion.id,
                  choice.id,
                  btn
                );
              }
            );

            choicesBox.appendChild(
              btn
            );
          }
        );

        /*
          ○×表示
        */
        const miniResult =
          document.createElement(
            "div"
          );

        miniResult.className =
          "type5MiniResult hidden";

        miniResult.dataset.resultFor =
          subQuestion.id;

        /*
          根拠表示
        */
        const reviewBox =
          document.createElement(
            "div"
          );

        reviewBox.className =
          "type5ReviewBox hidden";

        reviewBox.dataset.reviewFor =
          subQuestion.id;

        reviewBox.innerHTML = `
          <div class="type5EvidenceTitle">
            根拠
          </div>

          <div class="type5EvidenceEn">
            ${escapeHtml(
              subQuestion.evidence ||
              "根拠英文はありません。"
            )}
          </div>

          <div class="type5EvidenceJa">
            ${escapeHtml(
              subQuestion.evidenceJa ||
              "日本語訳はありません。"
            )}
          </div>
        `;

        card.appendChild(
          head
        );

        card.appendChild(
          stem
        );

        card.appendChild(
          choicesBox
        );

        card.appendChild(
          miniResult
        );

        card.appendChild(
          reviewBox
        );

        type5QuestionList.appendChild(
          card
        );
      }
    );
  }


  function selectType5Choice(
    questionId,
    choiceId,
    clickedButton
  ) {
    if (answered) {
      return;
    }

    /*
      選択内容を保存
    */
    type5SelectedAnswers[
      String(questionId)
    ] = String(choiceId);

    /*
      同じ設問のselectedをいったん解除
    */
    type5QuestionList
      .querySelectorAll(
        `.type5ChoiceBtn[data-question-id="${questionId}"]`
      )
      .forEach(btn => {
        btn.classList.remove(
          "selected"
        );
      });

    clickedButton.classList.add(
      "selected"
    );

    /*
      5問すべて回答したら
      答え合わせ可能にする
    */
    const questions =
      Array.isArray(
        currentQuestion?.questions
      )
        ? currentQuestion.questions
        : [];

    const allSelected =
      questions.length > 0 &&
      questions.every(q => {
        return !!type5SelectedAnswers[
          String(q.id)
        ];
      });

    type5CheckBtn.disabled =
      !allSelected;
  }


    function checkType5Answers() {
    if (
      answered ||
      !currentQuestion ||
      Number(currentQuestion.format) !== 5
    ) {
      return;
    }

    const questions =
      Array.isArray(
        currentQuestion.questions
      )
        ? currentQuestion.questions
        : [];

    const allSelected =
      questions.length > 0 &&
      questions.every(q => {
        return !!type5SelectedAnswers[
          String(q.id)
        ];
      });

    if (!allSelected) {
      return;
    }

    answered = true;

// この長文問題に1回取り組んだことを記録
incrementAttemptCount(
  currentQuestion.id
);

let correctCount = 0;

    questions.forEach(
      subQuestion => {

        const questionId =
          String(
            subQuestion.id
          );

        const selectedId =
          String(
            type5SelectedAnswers[
              questionId
            ] || ""
          );

        const answerId =
          String(
            subQuestion.answerId
          );

        const isCorrect =
          selectedId === answerId;

        if (isCorrect) {
          correctCount += 1;
        }

        /*
          問題カード
        */
        const card =
          type5QuestionList
            .querySelector(
              `.type5QuestionCard[data-question-id="${questionId}"]`
            );

        if (card) {
          card.classList.add(
            "answered"
          );

          card.classList.add(
            isCorrect
              ? "correct"
              : "wrong"
          );
        }

        /*
          選択肢採点
        */
        type5QuestionList
          .querySelectorAll(
            `.type5ChoiceBtn[data-question-id="${questionId}"]`
          )
          .forEach(btn => {

            btn.disabled =
              true;

            const choiceId =
              String(
                btn.dataset.choiceId ||
                ""
              );

            btn.classList.remove(
              "selected"
            );

            /*
              正解は緑
            */
            if (
              choiceId === answerId
            ) {
              btn.classList.add(
                "correct"
              );

            /*
              選んだ誤答は赤
            */
            } else if (
              choiceId === selectedId &&
              !isCorrect
            ) {
              btn.classList.add(
                "wrong"
              );
            }
          });

        /*
          ○×
        */
        const miniResult =
          type5QuestionList
            .querySelector(
              `[data-result-for="${questionId}"]`
            );

        if (miniResult) {
          miniResult.className =
            isCorrect
              ? "type5MiniResult ok"
              : "type5MiniResult ng";

          miniResult.textContent =
            isCorrect
              ? "○ 正解"
              : "× 不正解";
        }

        /*
          根拠を表示
        */
        const reviewBox =
          type5QuestionList
            .querySelector(
              `[data-review-for="${questionId}"]`
            );

        if (reviewBox) {
          reviewBox.classList.remove(
            "hidden"
          );
        }

        /*
          結果記録
        */
        sessionResults.push({
          id:
            questionId,

          parentId:
            currentQuestion.id,

          format:
            5,

          method:
            "quiz",

          isCorrect:
            isCorrect,

          selectedId:
            selectedId,

          answerId:
            answerId,

          playCount:
            playCount,

          pointAdded:
            0
        });
      }
    );

        type5Result.className =
      correctCount ===
      questions.length
        ? "type5Result ok"
        : "type5Result ng";

    type5Result.textContent =
      `${correctCount} / ` +
      `${questions.length} 正解`;
    type5CheckBtn.disabled =
      true;

        /*
      採点後：
      復習カードを表示
    */
    type5ReviewCard
      .classList
      .remove("hidden");

    /*
      固定フッターを表示
    */
    type5FixedFooter
      .classList
      .remove("hidden");

    type5ScriptAction
      .classList
      .remove("hidden");

    type5NextBtn.disabled =
      false;

    document.body.classList.add(
      "type5FooterOpen"
    );
  }


    // ============================================================
  // 大問5：全文スクリプト ボトムシート
  // ============================================================

  function openType5ScriptSheet() {
    if (
      !currentQuestion ||
      Number(currentQuestion.format) !== 5 ||
      !answered
    ) {
      return;
    }

    type5FullScriptEn.textContent =
      currentQuestion.script ||
      "英文スクリプトはありません。";

    type5FullScriptJa.textContent =
      currentQuestion.scriptJa ||
      "日本語訳はありません。";

    type5ScriptSheetOverlay
      .classList
      .remove("hidden");

    document.body.classList.add(
      "type5SheetOpen"
    );
  }


  function closeType5ScriptSheet() {
    if (!type5ScriptSheetOverlay) {
      return;
    }

    type5ScriptSheetOverlay
      .classList
      .add("hidden");

    document.body.classList.remove(
      "type5SheetOpen"
    );

    /*
      シートを閉じたら音声も停止
    */
    try {
      questionAudio.pause();
      questionAudio.currentTime = 0;
    } catch (error) {
      console.warn(
        "大問5スクリプト音声の停止に失敗しました。",
        error
      );
    }
  }


  async function playType5ScriptAudio() {
    if (
      !currentQuestion ||
      Number(currentQuestion.format) !== 5
    ) {
      return;
    }

    /*
      復習用再生なので、
      本番の再生回数には加算しない
    */
    await playAudio({
      countAsPlay: false
    });
  }
  
  // ============================================================
  // 選択肢表示
  // ============================================================

  function renderChoices() {
    choicesEl.innerHTML =
      "";

    currentChoices
      .forEach(
        (
          choice,
          index
        ) => {
          const btn =
            document.createElement(
              "button"
            );

          btn.type =
            "button";

          btn.className =
            "choiceBtn";

          btn.dataset.choiceId =
            choice.id;

          btn.innerHTML = `
            <span class="choiceIndex">
              ${index + 1}
            </span>

            <span class="choiceText">
              <span class="choiceEn">
                ${escapeHtml(choice.text)}
              </span>

              <span class="choiceJa">
                ${escapeHtml(
                  choice.ja ||
                  "日本語訳はありません。"
                )}
              </span>
            </span>
          `;

          btn.addEventListener(
            "click",
            () => {
              answerQuiz(
                choice.id
              );
            }
          );

          choicesEl.appendChild(
            btn
          );
        }
      );
  }

  // ============================================================
  // 音声再生
  // ============================================================

  async function playAudio(
    {
      countAsPlay = true
    } = {}
  ) {
    if (!currentQuestion) {
      return false;
    }

    try {
      if (countAsPlay) {
        playCount += 1;
        updatePlayCount();
      }

      questionAudio.pause();
      questionAudio.currentTime = 0;

      setAudioRate(
        playSpeedSelect.value
      );

      await questionAudio.play();

      audioMessage.textContent =
        "音声を再生しています。";

      return true;

    } catch (error) {
      console.warn(
        "音声再生に失敗しました。",
        error
      );

      audioMessage.textContent =
        "音声を再生できませんでした。" +
        "MP3の場所とファイル名を確認してください。";

      return false;
    }
  }

  function waitForAudioEnd(
    token
  ) {
    return new Promise(
      resolve => {
        const done = () => {
          questionAudio
            .removeEventListener(
              "ended",
              done
            );

          questionAudio
            .removeEventListener(
              "error",
              done
            );

          resolve(
            token ===
            autoPlayToken
          );
        };

        questionAudio
          .addEventListener(
            "ended",
            done,
            {
              once: true
            }
          );

        questionAudio
          .addEventListener(
            "error",
            done,
            {
              once: true
            }
          );
      }
    );
  }

  async function autoPlayAudio(
    times
  ) {
    const token =
      ++autoPlayToken;

    for (
      let i = 0;
      i < times;
      i++
    ) {
      if (
        token !==
          autoPlayToken ||
        !currentQuestion
      ) {
        return;
      }

      const played =
        await playAudio({
          countAsPlay: true
        });

      if (!played) {
        return;
      }

      const stillValid =
        await waitForAudioEnd(
          token
        );

      if (!stillValid) {
        return;
      }

      if (
        i < times - 1
      ) {
        await new Promise(
          resolve => {
            window.setTimeout(
              resolve,
              350
            );
          }
        );
      }
    }

        if (
      token ===
        autoPlayToken
    ) {
      const method =
        getSelectedMethod();

      if (
        !answered &&
        method === "overlapping"
      ) {
        completeOverlappingBtn.disabled =
          false;

        audioMessage.textContent =
          "スクリプトを見ながら、音声と同時に発音してください。";

      } else if (
        !answered &&
        method === "shadowing"
      ) {
        completeShadowingBtn.disabled =
          false;

        audioMessage.textContent =
          "音声の少し後を追いながら発音してください。";

      } else {
        audioMessage.textContent =
          "もう一度聞く場合は「音声を再生」を押してください。";
      }
    }
  }

  questionAudio.addEventListener(
    "ended",
    () => {
      audioMessage.textContent =
        "もう一度聞く場合は「音声を再生」を押してください。";
    }
  );

  questionAudio.addEventListener(
    "error",
    () => {
      audioMessage.textContent =
        "音声ファイルを読み込めませんでした。" +
        "MP3の保存場所を確認してください。";
    }
  );
    // ============================================================
  // 正誤判定
  // ============================================================

  function answerQuiz(
    selectedId
  ) {
    if (
      !currentQuestion ||
      answered
    ) {
      return;
    }

    answered = true;

// この問題に1回取り組んだことを記録
incrementAttemptCount(
  currentQuestion.id
);

stopAudio();

    const isCorrect =
      String(selectedId) ===
      String(
        currentQuestion.answerId
      );

    document
      .querySelectorAll(
        "#choices .choiceBtn"
      )
      .forEach(btn => {
        btn.disabled = true;

        /*
          answeredクラスが付くと、
          CSSによって日本語訳が表示されます。
        */
        btn.classList.add("answered");

        const choiceId =
          String(
            btn.dataset.choiceId ||
            ""
          );

        if (
          choiceId ===
          String(
            currentQuestion.answerId
          )
        ) {
          btn.classList.add(
            "correct"
          );
        } else if (
          choiceId ===
          String(selectedId)
        ) {
          btn.classList.add(
            "wrong"
          );
        }
      });

    answerResult
      .classList
      .remove("hidden");

    answerResult
      .classList
      .add(
        isCorrect
          ? "ok"
          : "ng"
      );

    answerResult.textContent =
      isCorrect
        ? "正解です。"
        : "不正解です。正しい応答を確認しましょう。";

    scriptAnswerEn.textContent =
      currentQuestion.script;

    scriptAnswerJa.textContent =
      currentQuestion.scriptJa;

    scriptAnswerBox
      .classList
      .remove("hidden");

    explanationText.textContent =
      getDisplayExplanation(
        currentQuestion.explanation
      );

    explanationBox
      .classList
      .remove("hidden");

    afterAnswerActions
      .classList
      .remove("hidden");

    nextQuestionBtn.disabled =
      false;

    /*
      自動ニガテ処理
    */
    if (isCorrect) {
      removeAutoWeak(
        currentQuestion.id
      );
    } else {
      addAutoWeak(
        currentQuestion.id
      );
    }

    renderManualWeakButton();
    updateWeakInfo();

    /*
      正誤に関係なく、
      1問の回答完了でおんかん＋1
    */
    const pointAdded =
      awardListeningPoint(
        currentQuestion.id,
        "quiz"
      );

    addLearningLog(
      isCorrect
    );

    sessionResults.push({
      id:
        currentQuestion.id,

      isCorrect:
        isCorrect,

      selectedId:
        String(selectedId),

      answerId:
        String(
          currentQuestion.answerId
        ),

      playCount:
        playCount,

      pointAdded:
        pointAdded
    });
  }

  // ============================================================
  // セッション開始
  // ============================================================

  function startSession({
    forceWeak = false,
    explicitQuestions = null,
    keepAwardKeys = false
  } = {}) {
    saveSettings();

    const method =
      getSelectedMethod();

       

    const built =
      explicitQuestions
        ? [
            ...explicitQuestions
          ]
        : buildSessionQuestions(
            forceWeak
          );

    if (!built.length) {
      window.alert(
        forceWeak ||
        orderMode.value === "weak"
          ? "ニガテ問題がまだありません。"
          : "出題できる問題がありません。問題データを確認してください。"
      );

      return;
    }

    rememberStartConfig(
      forceWeak
    );

    sessionQuestions =
      built;

    lastSessionQuestionIds =
      built.map(q => q.id);

    currentIndex = 0;
    currentQuestion = null;
    currentChoices = [];

    answered = false;
    playCount = 0;
    onkanEarned = 0;

    sessionResults = [];

    if (!keepAwardKeys) {
      sessionAwardKeys =
        new Set();
    }

    renderQuestion();
  }

  // ============================================================
  // 次の問題
  // ============================================================

  function goNextQuestion() {
    if (!answered) {
      return;
    }

    currentIndex += 1;

    if (
      currentIndex >=
      sessionQuestions.length
    ) {
      finishSession();
      return;
    }

    renderQuestion();
  }

  // ============================================================
  // セッション終了
  // ============================================================

  function finishSession() {
  stopAudio();

  if (
    String(
      orderMode.value
    ) === "continue"
  ) {
    const formatQuestions =
      getQuestionsByFormat();

    const nextCursor =
      (
        loadCursor() +
        sessionQuestions.length
      ) %
      Math.max(
        1,
        formatQuestions.length
      );

    saveCursor(
      nextCursor
    );
  }

  showSummary();
}

  // ============================================================
  // 結果画面
  // ============================================================

  function showSummary() {
    const attempted =
      sessionResults.length;

    const correct =
      sessionResults.filter(
        result =>
          result.isCorrect
      ).length;

    const pct =
      attempted
        ? Math.round(
            (
              correct /
              attempted
            ) *
            100
          )
        : 0;

    const format =
  getSelectedFormat();

summaryLine.textContent =
  `大問${format}形式・リスニング問題・${attempted}問`;

    summaryScoreMain.textContent =
      `${correct} / ${attempted}`;

    summaryScoreSub.textContent =
      `正答率 ${pct}%`;

    summaryAttempted.textContent =
      String(attempted);

    summaryCorrect.textContent =
      String(correct);

    summaryOnkan.textContent =
      `＋${onkanEarned}`;

    renderSummaryList();

    showOnly(
      "summary"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

      function renderSummaryList() {
    summaryResultList.innerHTML = "";

    if (!sessionResults.length) {
      summaryEmpty.classList.remove("hidden");
      return;
    }

    summaryEmpty.classList.add("hidden");

    sessionResults.forEach(result => {
      const q =
        questionById.get(result.id);

      if (!q) {
        return;
      }

      const selected =
        q.choices.find(
          choice =>
            choice.id ===
            result.selectedId
        );

      const correctChoice =
        q.choices.find(
          choice =>
            choice.id ===
            q.answerId
        );

      const isReorderDictation =
        result.method ===
        "dictation_reorder";

      const isFullDictation =
        result.method ===
        "dictation_full";

      const isDictation =
        isReorderDictation ||
        isFullDictation;

          const isOverlapping =
        result.method ===
        "overlapping";

      const isShadowing =
        result.method ===
        "shadowing";

      const isPractice =
        isOverlapping ||
        isShadowing;

      let badgeText = "";

      if (isDictation) {
        badgeText =
          result.dictationPassed
            ? "合格"
            : "練習完了";
      } else if (isPractice) {
        badgeText =
          "練習完了";
      } else {
        badgeText =
          result.isCorrect
            ? "正解"
            : "要復習";
      }

      let resultDetailHtml = "";

      /*
        ディクテーション
      */
      if (isDictation) {
        resultDetailHtml = `
          <div
            style="
              margin-top:7px;
              line-height:1.6;
            "
          >
            <strong>
              ${
                isFullDictation
                  ? "全文入力："
                  : "語句整序："
              }
            </strong>

            完成
            ／ 解答
            ${result.dictationAttempts || 1}回
          </div>

          <div
            style="
              margin-top:7px;
              line-height:1.6;
            "
          >
            <strong>
              完成文：
            </strong>

            ${escapeHtml(q.script)}
          </div>
        `;

      /*
        オーバーラッピング
      */
      } else if (isOverlapping) {
        resultDetailHtml = `
          <div
            style="
              margin-top:7px;
              line-height:1.6;
            "
          >
            <strong>
              オーバーラッピング：
            </strong>

            ${
              result.practiceCount ||
              result.playCount ||
              1
            }回練習
          </div>

          <div
            style="
              margin-top:7px;
              line-height:1.6;
            "
          >
            <strong>
              練習した英文：
            </strong>

            ${escapeHtml(q.script)}
          </div>
        `;

          /*
        シャドーイング
      */
      } else if (isShadowing) {
        resultDetailHtml = `
          <div
            style="
              margin-top:7px;
              line-height:1.6;
            "
          >
            <strong>
              シャドーイング：
            </strong>

            ${
              result.practiceCount ||
              result.playCount ||
              1
            }回練習
          </div>

          <div
            style="
              margin-top:7px;
              line-height:1.6;
            "
          >
            <strong>
              練習した英文：
            </strong>

            ${escapeHtml(q.script)}
          </div>
        `;

      /*
        4択リスニング
      */
      } else {
        resultDetailHtml = `
          <div
            style="
              margin-top:7px;
              line-height:1.6;
            "
          >
            <strong>
              選んだ応答：
            </strong>

            ${escapeHtml(
              selected?.text || "—"
            )}
          </div>

          ${
            !result.isCorrect
              ? `
                <div
                  style="
                    margin-top:5px;
                    line-height:1.6;
                  "
                >
                  <strong>
                    正しい応答：
                  </strong>

                  ${escapeHtml(
                    correctChoice?.text ||
                    "—"
                  )}
                </div>
              `
              : ""
          }
        `;
      }

      const item =
        document.createElement("div");

      item.className =
        "resultItem";

      item.innerHTML = `
        <div class="resultItemHead">
          <div class="resultItemId">
            ${escapeHtml(q.id)}
          </div>

          <span
            class="resultBadge ${
              result.isCorrect
                ? "ok"
                : "ng"
            }"
          >
            ${badgeText}
          </span>
        </div>

        <div
          class="muted"
          style="margin-top:7px;"
        >
          再生回数：
          ${result.playCount || 0}回
        </div>

        ${resultDetailHtml}
      `;

      summaryResultList
        .appendChild(item);
    });
  }

  // ============================================================
  // 問題一覧
  // ============================================================

  function showProblemList() {
  if (problemListFormatSelect) {
    problemListFormatSelect.value =
      String(
        getSelectedFormat()
      );
  }

  renderProblemList(
    getQuestionsByFormat(
      Number(
        problemListFormatSelect?.value ||
        getSelectedFormat()
      )
    )
  );

  showOnly(
    "problemList"
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function stopProblemListAudio() {
  if (problemListAudio) {
    try {
      problemListAudio.pause();
      problemListAudio.currentTime = 0;
    } catch {}
  }

  problemListAudio = null;

  if (problemListPlayingButton) {
    problemListPlayingButton.textContent =
      "▶ 音声を再生";
  }

  problemListPlayingButton = null;
}

function playProblemListAudio(
  audioFile,
  button
) {
  stopProblemListAudio();

  const src =
    String(audioFile || "").trim();

  if (!src) {
    window.alert(
      "この問題の音声ファイルが設定されていません。"
    );
    return;
  }

  problemListAudio =
    new Audio(src);

  problemListPlayingButton =
    button || null;

  if (button) {
    button.textContent =
      "⏸ 再生中";
  }

  problemListAudio.playbackRate =
    Number(
      playbackRate?.value || 1
    );

  problemListAudio.addEventListener(
    "ended",
    () => {
      if (button) {
        button.textContent =
          "▶ 音声を再生";
      }

      problemListAudio = null;
      problemListPlayingButton = null;
    },
    {
      once: true
    }
  );

  problemListAudio
    .play()
    .catch(error => {
      console.warn(
        "問題一覧の音声再生に失敗しました。",
        error
      );

      if (button) {
        button.textContent =
          "▶ 音声を再生";
      }

      problemListAudio = null;
      problemListPlayingButton = null;

      window.alert(
        "音声を再生できませんでした。音声ファイルを確認してください。"
      );
    });
}

  function renderProblemList(
    source
  ) {
    const list =
      source || [];

    const listFormat =
  Number(
    problemListFormatSelect?.value ||
    getSelectedFormat()
  );

const attemptedCount =
  list.filter(q => {
    return (
      getAttemptCount(q.id) > 0
    );
  }).length;

problemListSummary.textContent =
  `大問${listFormat}形式・全${list.length}問 ／ ` +
  `取り組み済み ${attemptedCount}問`;

    problemListBody.innerHTML =
      "";

    problemListEmpty
      .classList
      .toggle(
        "hidden",
        list.length > 0
      );

    list.forEach(
  (
    q,
    index
  ) => {
    const weak =
      getWeakState(
        q.id
      );

    const attemptCount =
      getAttemptCount(
        q.id
      );

    const attemptLabel =
      attemptCount > 0
        ? `取り組み済み・${attemptCount}回`
        : "未挑戦";

    // ============================================================
// 大問5は「1長文 = 1問」の専用一覧カード
// ============================================================

if (
  Number(q.format) === 5
) {
  const item =
    document.createElement(
      "div"
    );

  item.className =
    "resultItem listeningProblemCard";

  const statusClass =
    attemptCount > 0
      ? "attemptDone"
      : "attemptNotYet";

  item.innerHTML = `
    <div class="listeningProblemCardHead">

      <div class="listeningProblemNumber">
        No.${index + 1}
      </div>

      <div
        class="listeningAttemptBadge ${statusClass}"
      >
        ${
          escapeHtml(
            attemptLabel
          )
        }
      </div>

    </div>

    <div class="listeningProblemTitle">
      ${
        escapeHtml(
          q.title ||
          q.id
        )
      }
    </div>

    <div class="listeningProblemMeta">
      ${escapeHtml(q.id)}
    </div>

    <div class="listeningProblemAction">

      <button
        type="button"
        class="primary problemListStartBtn"
        data-question-id="${escapeHtml(q.id)}"
      >
        ▶ この問題を解く
      </button>

    </div>
  `;

  problemListBody
    .appendChild(
      item
    );

  return;
}

        const correct =
          q.choices.find(
            choice =>
              choice.id ===
              q.answerId
          );

        const item =
          document.createElement(
            "div"
          );

        item.className =
          "resultItem";

        const choicesHtml =
  q.choices
    .map(choice => {
      return `
        <button
          type="button"
          class="problemListChoiceBtn"
          data-question-id="${escapeHtml(q.id)}"
          data-choice-id="${escapeHtml(choice.id)}"
        >
          <strong>
            ${escapeHtml(choice.id)}.
          </strong>

          ${escapeHtml(choice.text)}

          ${
            problemListAnswersVisible
              ? `
                <div class="muted">
                  ${escapeHtml(choice.ja)}
                </div>
              `
              : ""
          }
        </button>
      `;
    })
    .join("");

        item.innerHTML = `
          <div class="resultItemHead">
            <div>
              <div class="resultItemId">
  ${index + 1}.
  ${escapeHtml(q.id)}
</div>

<div class="muted">
  ${escapeHtml(q.type)}
</div>

<div
  class="
    listeningAttemptBadge
    ${
      attemptCount > 0
        ? "attemptDone"
        : "attemptNotYet"
    }
  "
>
  ${escapeHtml(attemptLabel)}
</div>
            </div>

            <button
              type="button"
              class="
                problemPinBtn
                ${
                  weak.pin
                    ? "danger"
                    : ""
                }
              "
              data-question-id="${
                escapeHtml(q.id)
              }"
            >
              ${
                weak.pin
                  ? "手動ニガテ解除"
                  : "手動ニガテに追加"
              }
            </button>
          </div>

          <div
  style="
    margin-top:10px;
    padding:10px 12px;
    text-align:center;
    color:#777;
    background:#fafafa;
    border:1px dashed #d8d8d8;
    border-radius:12px;
  "
>
  音声を聞いて、選択肢を選んでください。
</div>

          <div class="problemListAudioRow">
  <button
    type="button"
    class="problemListPlayBtn"
    data-audio-file="${escapeHtml(q.audioFile)}"
  >
    ▶ 音声を再生
  </button>

  <button
    type="button"
    class="problemListStopBtn"
  >
    ■ 停止
  </button>
</div>

<div
  class="problemListChoices"
  data-question-id="${escapeHtml(q.id)}"
  data-answer-id="${escapeHtml(q.answerId)}"
>
  ${choicesHtml}
</div>

<div
  class="problemListPracticeResult"
  data-result-for="${escapeHtml(q.id)}"
></div>

<button
  type="button"
  class="problemListRetryBtn hidden"
  data-retry-question-id="${escapeHtml(q.id)}"
>
  もう一度答える
</button>


<div class="listeningProblemAction">
  <button
    type="button"
    class="primary problemListStartBtn"
    data-question-id="${escapeHtml(q.id)}"
  >
    ▶ この問題を解く
  </button>
</div>

 <div
  class="problemListAnswerBox ${
    problemListAnswersVisible
      ? ""
      : "hidden"
  }"
  style="
    margin-top:12px;
    padding:12px;
    border-radius:12px;
    background:#f7f9fc;
    border:1px solid #dde4ee;
  "
>
  <div
    style="
      line-height:1.7;
    "
  >
    <strong>
      問題文：
    </strong>

    ${escapeHtml(q.script)}
  </div>

  <div
    class="muted"
    style="
      margin-top:4px;
      line-height:1.7;
    "
  >
    ${escapeHtml(q.scriptJa)}
  </div>

  <div
    style="
      margin-top:12px;
      line-height:1.7;
    "
  >
    <strong>
      正答：
    </strong>

    ${escapeHtml(q.answerId)}.

    ${escapeHtml(
      correct?.text || ""
    )}
  </div>

  <div
    class="muted"
    style="
      margin-top:4px;
      line-height:1.7;
    "
  >
    ${escapeHtml(
      correct?.ja || ""
    )}
  </div>

  ${
    q.explanation
      ? `
        <div
          class="muted"
          style="
            margin-top:10px;
            line-height:1.7;
          "
        >
          <strong>解説：</strong>
          ${escapeHtml(q.explanation)}
        </div>
      `
      : ""
  }
</div>
        `;

        problemListBody
          .appendChild(item);
      }
    );


    // ============================================================
// 一覧から、この問題だけを解く
// ============================================================

problemListBody
  .querySelectorAll(
    ".problemListStartBtn"
  )
  .forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        const questionId =
          String(
            btn.dataset.questionId ||
            ""
          );

        const question =
          questionById.get(
            questionId
          );

        if (!question) {
          window.alert(
            "問題データを取得できませんでした。"
          );

          return;
        }

        // 一覧で再生中の音声があれば止める
        stopProblemListAudio();

        // 通常のリスニング問題モードにする
        setSelectedMethod(
          "quiz"
        );

        // 問題形式も対象問題に合わせる
        formatSelect.value =
          String(
            question.format
          );

        // 指定した1問だけで演習開始
        startSession({
          explicitQuestions: [
            question
          ]
        });
      }
    );
  });

    // ============================================================
// 問題一覧内のボタン操作
// ============================================================

// 手動ニガテボタン
problemListBody
  .querySelectorAll(
    ".problemPinBtn"
  )
  .forEach(btn => {
    btn.addEventListener(
      "click",
      () => {
        const id =
          String(
            btn.dataset.questionId ||
            ""
          );

        const next =
          !getWeakState(id).pin;

        setPinned(
          id,
          next
        );

        updateWeakInfo();

        stopProblemListAudio();

        renderProblemList(
          list
        );
      }
    );
  });

// 音声再生ボタン
problemListBody
  .querySelectorAll(
    ".problemListPlayBtn"
  )
  .forEach(btn => {
    btn.addEventListener(
      "click",
      () => {
        playProblemListAudio(
          btn.dataset.audioFile,
          btn
        );
      }
    );
  });

// 音声停止ボタン
problemListBody
  .querySelectorAll(
    ".problemListStopBtn"
  )
  .forEach(btn => {
    btn.addEventListener(
      "click",
      () => {
        stopProblemListAudio();
      }
    );
  });

// 選択肢ボタン
problemListBody
  .querySelectorAll(
    ".problemListChoiceBtn"
  )
  .forEach(btn => {
    btn.addEventListener(
      "click",
      () => {
        const questionId =
          String(
            btn.dataset.questionId ||
            ""
          );

        const selectedId =
          String(
            btn.dataset.choiceId ||
            ""
          );

        const question =
          questionById.get(
            questionId
          );

        if (!question) {
          return;
        }

        // この問題のカードを取得
        const item =
          btn.closest(
            ".resultItem"
          );

        if (!item) {
          return;
        }

        // この問題の選択肢だけを取得
        const choiceButtons = [
          ...item.querySelectorAll(
            ".problemListChoiceBtn"
          )
        ];

        const isCorrect =
          selectedId ===
          question.answerId;

        // 正解の選択肢を緑にする
        // すべての選択肢を押せなくする
        choiceButtons.forEach(
          choiceBtn => {
            const choiceId =
              String(
                choiceBtn.dataset
                  .choiceId ||
                ""
              );

            if (
              choiceId ===
              question.answerId
            ) {
              choiceBtn.classList.add(
                "correct"
              );
            }

            choiceBtn.disabled = true;
          }
        );

        // 間違えた選択肢を赤にする
        if (!isCorrect) {
          btn.classList.add(
            "wrong"
          );
        }

        // 正誤メッセージ
        const resultEl =
          item.querySelector(
            ".problemListPracticeResult"
          );

       if (resultEl) {
  resultEl.className =
    "problemListPracticeResult " +
    (
      isCorrect
        ? "correct"
        : "wrong"
    );

  resultEl.textContent =
    isCorrect
      ? "⭕ 正解！"
      : "❌ 不正解。もう一度確認しましょう。";
}
// 正解した場合だけ、この問題の正答を表示
if (isCorrect) {
  const answerBox =
    item.querySelector(
      ".problemListAnswerBox"
    );

  if (answerBox) {
    answerBox.classList.remove(
      "hidden"
    );
  }
}

        // 「もう一度答える」を表示
        const retryBtn =
          item.querySelector(
            ".problemListRetryBtn"
          );

        if (retryBtn) {
          retryBtn.classList.remove(
            "hidden"
          );
        }

        /*
          問題一覧では以下を行いません。

          ・ゴイモンへの加算
          ・学習ログへの記録
          ・自動ニガテへの追加
          ・通常演習の正答数変更
        */
      }
    );
  });

// 「もう一度答える」ボタン
problemListBody
  .querySelectorAll(
    ".problemListRetryBtn"
  )
  .forEach(btn => {
    btn.addEventListener(
      "click",
      () => {
        const item =
          btn.closest(
            ".resultItem"
          );

        if (!item) {
          return;
        }

        // 選択肢を再び押せるようにする
        item
          .querySelectorAll(
            ".problemListChoiceBtn"
          )
          .forEach(choiceBtn => {
            choiceBtn.disabled = false;

            choiceBtn.classList.remove(
              "correct",
              "wrong"
            );
          });

        // 正誤メッセージを消す
        const resultEl =
          item.querySelector(
            ".problemListPracticeResult"
          );

        if (resultEl) {
          resultEl.className =
            "problemListPracticeResult";

          resultEl.textContent = "";
        }

        // 全体の正答表示がOFFなら、正答を再び隠す
if (!problemListAnswersVisible) {
  const answerBox =
    item.querySelector(
      ".problemListAnswerBox"
    );

  if (answerBox) {
    answerBox.classList.add(
      "hidden"
    );
  }
}

        // 自分自身を再び隠す
        btn.classList.add(
          "hidden"
        );
      }
    );
  });
}

  // ============================================================
  // 設定画面イベント
  // ============================================================

  questionCount.addEventListener(
    "change",
    () => {
      customCountWrap
        .classList
        .toggle(
          "hidden",
          questionCount.value !==
            "custom"
        );

      saveSettings();
    }
  );

  customCountInput
    .addEventListener(
      "change",
      saveSettings
    );

  formatSelect
  .addEventListener(
    "change",
    () => {
      saveSettings();
      updatePoolInfo();
      updateWeakInfo();
    }
  );

  orderMode
    .addEventListener(
      "change",
      saveSettings
    );

  if (dictationType) {
    dictationType
      .addEventListener(
        "change",
        saveSettings
      );
  }

  if (dictationPassCount) {
    dictationPassCount
      .addEventListener(
        "change",
        saveSettings
      );
  }

  autoPlayCount
    .addEventListener(
      "change",
      saveSettings
    );

  shuffleChoices
    .addEventListener(
      "change",
      saveSettings
    );

  playbackRate.addEventListener(
    "change",
    () => {
      setAudioRate(
        playbackRate.value
      );

      saveSettings();
    }
  );

  playSpeedSelect
    .addEventListener(
      "change",
      () => {
        setAudioRate(
          playSpeedSelect.value
        );

        saveSettings();
      }
    );

  // ============================================================
  // 学習方法選択
  // ============================================================

  methodCards.addEventListener(
    "change",
    event => {
      const target =
        event.target;

      if (
        target &&
        target.matches(
          'input[name="learningMethod"]'
        )
      ) {
        setSelectedMethod(
          target.value
        );

        saveSettings();
      }
    }
  );

  methodCards.addEventListener(
    "click",
    event => {
      const card =
        event.target.closest(
          ".methodCard"
        );

      if (!card) {
        return;
      }

      setSelectedMethod(
        card.dataset.method ||
        "quiz"
      );

      saveSettings();
    }
  );

  // ============================================================
  // 学習開始ボタン
  // ============================================================

  startBtn.addEventListener(
    "click",
    () => {
      startSession({
        forceWeak: false
      });
    }
  );

  startWeakBtn.addEventListener(
    "click",
    () => {
      startSession({
        forceWeak: true
      });
    }
  );

  // ============================================================
  // 問題一覧ボタン
  // ============================================================

  openProblemListBtn
    .addEventListener(
      "click",
      showProblemList
    );

  problemListBackBtn
  .addEventListener(
    "click",
    () => {
      stopProblemListAudio();

      showOnly(
        "setup"
      );
    }
  );

  if (
  problemListFormatSelect
) {
  problemListFormatSelect
  .addEventListener(
    "change",
    () => {
      stopProblemListAudio();

      renderProblemList(
        getQuestionsByFormat(
          Number(
            problemListFormatSelect.value
          )
        )
      );
    }
  );
}

  toggleProblemListAnswersBtn
  .addEventListener(
    "click",
    () => {
      problemListAnswersVisible =
        !problemListAnswersVisible;

      toggleProblemListAnswersBtn
        .textContent =
          problemListAnswersVisible
            ? "正答を隠す"
            : "正答を表示";

      // 一覧を描き直す前に音声を止める
      stopProblemListAudio();

      renderProblemList(
        getQuestionsByFormat(
          Number(
            problemListFormatSelect?.value ||
            getSelectedFormat()
          )
        )
      );
    }
  );

 shuffleProblemListBtn
  .addEventListener(
    "click",
    () => {
      const selectedQuestions =
        getQuestionsByFormat(
          Number(
            problemListFormatSelect?.value ||
            getSelectedFormat()
          )
        );

      // 一覧を描き直す前に音声を止める
      stopProblemListAudio();

      renderProblemList(
        shuffleArray(
          selectedQuestions
        )
      );
    }
  );

      // ============================================================
  // 語句並べ替えディクテーション操作
  // ============================================================

  undoWordBtn.addEventListener(
    "click",
    () => {
      if (
        answered ||
        !dictationSentenceStates.length
      ) {
        return;
      }

      /*
        最後に操作した文を取得します。
      */
      let state =
        dictationSentenceStates[
          activeDictationSentenceIndex
        ];

      /*
        最後に操作した文に単語がなければ、
        後ろの文から選択済みの文を探します。
      */
      if (
        !state ||
        !state.selectedIndexes.length
      ) {
        state = [
          ...dictationSentenceStates
        ]
          .reverse()
          .find(item => {
            return (
              item.selectedIndexes.length
            );
          });
      }

      if (!state) {
        return;
      }

      activeDictationSentenceIndex =
        dictationSentenceStates.indexOf(
          state
        );

      state.selectedIndexes.pop();

      renderReorderDictation();

      answerResult.className =
        "answerResult hidden";

      answerResult.textContent = "";
    }
  );

  resetWordsBtn.addEventListener(
    "click",
    () => {
      if (answered) {
        return;
      }

      dictationSentenceStates.forEach(
        state => {
          state.selectedIndexes = [];
        }
      );

      activeDictationSentenceIndex = 0;

      renderReorderDictation();

      answerResult.className =
        "answerResult hidden";

      answerResult.textContent =
        "";
    }
  );

  checkReorderBtn.addEventListener(
    "click",
    () => {
      checkReorderDictation();
    }

    
  );

    // ============================================================
  // オーバーラッピング操作
  // ============================================================

  repeatOverlappingBtn.addEventListener(
    "click",
    () => {
      practiceOverlapping();
    }
  );

  completeOverlappingBtn.addEventListener(
    "click",
    () => {
      completeOverlapping();
    }
  );

    // ============================================================
  // シャドーイング操作
  // ============================================================

  toggleShadowingScriptBtn.addEventListener(
    "click",
    () => {
      toggleShadowingScript();
    }
  );

  repeatShadowingBtn.addEventListener(
    "click",
    () => {
      practiceShadowing();
    }
  );

  completeShadowingBtn.addEventListener(
    "click",
    () => {
      completeShadowing();
    }
  );
  // ============================================================
  // 音声操作
  // ============================================================

     playAudioBtn.addEventListener(
    "click",
    async () => {
      const played =
        await playAudio({
          countAsPlay: true
        });

      if (
        !played ||
        answered
      ) {
        return;
      }

      const method =
        getSelectedMethod();

      if (
        method === "overlapping"
      ) {
        completeOverlappingBtn.disabled =
          false;
      }

      if (
        method === "shadowing"
      ) {
        completeShadowingBtn.disabled =
          false;
      }
    }
  );
    // ============================================================
  // 3秒戻る
  // ============================================================

  rewind3Btn.addEventListener(
    "click",
    () => {
      /*
        音声ファイルがまだ読み込まれていない場合
      */
      if (
        !questionAudio.src
      ) {
        return;
      }

      /*
        現在再生中かどうかを記録
      */
      const wasPlaying =
        !questionAudio.paused &&
        !questionAudio.ended;

      /*
        現在位置から3秒戻す。
        0秒より前には行かない。
      */
      questionAudio.currentTime =
        Math.max(
          0,
          questionAudio.currentTime - 3
        );

      /*
        再生中だった場合は、
        戻した位置からそのまま再生を続ける。
      */
      if (wasPlaying) {
        questionAudio
          .play()
          .catch(error => {
            console.warn(
              "3秒戻した後の再生に失敗しました。",
              error
            );
          });
      }
    }
  );

  stopAudioBtn.addEventListener(
    "click",
    () => {
      stopAudio();

      audioMessage.textContent =
        "音声を停止しました。";
    }
  );

    fullDictationInput.addEventListener(
    "input",
    () => {
      if (answered) {
        return;
      }

      checkFullDictationBtn.disabled =
        getFullDictationAnswer().length === 0;

      if (
        !answerResult
          .classList
          .contains("hidden")
      ) {
        answerResult.className =
          "answerResult hidden";

        answerResult.textContent =
          "";
      }
    }
  );

  clearFullDictationBtn.addEventListener(
    "click",
    () => {
      if (answered) {
        return;
      }

      fullDictationInput.value =
        "";

      checkFullDictationBtn.disabled =
        true;

      answerResult.className =
        "answerResult hidden";

      answerResult.textContent =
        "";

      fullDictationGuide.textContent =
        "聞こえた英文を入力してください。";

      fullDictationInput.focus();
    }
  );

  checkFullDictationBtn.addEventListener(
    "click",
    () => {
      checkFullDictation();
    }
  );

  fullDictationInput.addEventListener(
    "keydown",
    event => {
      if (
        event.key !== "Enter" ||
        event.shiftKey ||
        event.isComposing
      ) {
        return;
      }

      event.preventDefault();

      if (
        !checkFullDictationBtn.disabled
      ) {
        checkFullDictation();
      }
    }
  );

  // ============================================================
  // 手動ニガテ
  // ============================================================

  manualWeakBtn.addEventListener(
    "click",
    () => {
      if (!currentQuestion) {
        return;
      }

      const next =
        !getWeakState(
          currentQuestion.id
        ).pin;

      setPinned(
        currentQuestion.id,
        next
      );

      renderManualWeakButton();
      updateWeakInfo();
    }
  );

  // ============================================================
  // 大問5：一括答え合わせ
  // ============================================================

  type5CheckBtn.addEventListener(
    "click",
    checkType5Answers
  );

    type5NextBtn.addEventListener(
    "click",
    () => {

      type5FixedFooter
        .classList
        .add("hidden");

      document.body.classList.remove(
        "type5FooterOpen"
      );

      goNextQuestion();
    }
  );

    // ============================================================
  // 大問5：この長文を復習
  // ============================================================

  type5ReviewDictationBtn.addEventListener(
    "click",
    () => {
      reviewDictationBtn.click();
    }
  );

  type5ReviewOverlappingBtn.addEventListener(
    "click",
    () => {
      reviewOverlappingBtn.click();
    }
  );

  type5ReviewShadowingBtn.addEventListener(
    "click",
    () => {
      reviewShadowingBtn.click();
    }
  );

    // ============================================================
  // 大問5：固定フッターから復習
  // ============================================================

  type5FooterDictationBtn.addEventListener(
    "click",
    () => {
      reviewDictationBtn.click();
    }
  );

  type5FooterOverlappingBtn.addEventListener(
    "click",
    () => {
      reviewOverlappingBtn.click();
    }
  );

  type5FooterShadowingBtn.addEventListener(
    "click",
    () => {
      reviewShadowingBtn.click();
    }
  );

    type5ScriptOpenBtn.addEventListener(
    "click",
    openType5ScriptSheet
  );

  type5ScriptCloseBtn.addEventListener(
    "click",
    closeType5ScriptSheet
  );

  type5ScriptPlayBtn.addEventListener(
    "click",
    playType5ScriptAudio
  );

  type5ScriptStopBtn.addEventListener(
    "click",
    () => {
      try {
        questionAudio.pause();
        questionAudio.currentTime = 0;
      } catch (error) {
        console.warn(
          "大問5スクリプト音声の停止に失敗しました。",
          error
        );
      }
    }
  );

  /*
    暗い背景部分を押しても閉じる
  */
  type5ScriptSheetOverlay.addEventListener(
    "click",
    event => {
      if (
        event.target ===
        type5ScriptSheetOverlay
      ) {
        closeType5ScriptSheet();
      }
    }
  );

  // ============================================================
  // 次の問題
  // ============================================================

  nextQuestionBtn
    .addEventListener(
      "click",
      goNextQuestion
    );

  // ============================================================
  // 設定へ戻る
  // ============================================================
  backBtn.addEventListener(
    "click",
    () => {
      stopAudio();

      const ok =
        window.confirm(
          "現在の学習を中断して設定画面に戻りますか。"
        );

      if (!ok) {
        return;
      }

      showOnly(
        "setup"
      );

      renderGoimonMini();
      updateWeakInfo();
    }
  );

  summaryBackBtn
    .addEventListener(
      "click",
      () => {
        showOnly(
          "setup"
        );

        renderGoimonMini();
        updateWeakInfo();
      }
    );

  // ============================================================
  // 結果画面の再挑戦
  // ============================================================

  retrySameBtn.addEventListener(
    "click",
    () => {
      const sameQuestions =
        buildQuestionsFromIds(
          lastSessionQuestionIds
        );

      startSession({
        explicitQuestions:
          sameQuestions,

        keepAwardKeys:
          false
      });
    }
  );

  continueBtn.addEventListener(
    "click",
    () => {
      startSession({
        forceWeak:
          !!lastStartConfig
            ?.forceWeak
      });
    }
  );

  retryWeakBtn.addEventListener(
    "click",
    () => {
      startSession({
        forceWeak: true
      });
    }
  );

  // ============================================================
  // ゴイモン開閉
  // ============================================================

  if (toggleGoimonBtn) {
    toggleGoimonBtn
      .addEventListener(
        "click",
        () => {
          const willOpen =
            goimonCard
              .classList
              .contains(
                "hidden"
              );

          goimonCard
            .classList
            .toggle(
              "hidden",
              !willOpen
            );

          toggleGoimonBtn
            .textContent =
              willOpen
                ? "ゴイモンを閉じる"
                : "ゴイモンを開く";

          toggleGoimonBtn
            .setAttribute(
              "aria-expanded",
              willOpen
                ? "true"
                : "false"
            );

          saveSettings();
        }
      );
  }

    // ============================================================
  // 解答後に同じ問題で別練習
  // ============================================================

  reviewOverlappingBtn.addEventListener(
    "click",
    () => {
      if (!currentQuestion) {
        return;
      }

      stopAudio();

      setSelectedMethod(
        "overlapping"
      );

      saveSettings();

      playCount = 0;
      updatePlayCount();

      resetAnswerDisplay();
      showModePanel(
        "overlapping"
      );

      quizModePanel
        .classList
        .add("hidden");

      dictationModePanel
        .classList
        .add("hidden");

      overlappingModePanel
        .classList
        .remove("hidden");

      shadowingModePanel
        .classList
        .add("hidden");

      audioMessage.textContent =
        "スクリプトを見ながら、音声と同時に発音してください。";

      prepareOverlapping();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );

    reviewDictationBtn.addEventListener(
    "click",
    () => {
      if (!currentQuestion) {
        return;
      }

      stopAudio();

      /*
        学習方法をディクテーションに変更
      */
      setSelectedMethod(
        "dictation"
      );

      saveSettings();

      /*
        この問題での再生回数をリセット
      */
      playCount = 0;
      updatePlayCount();

      /*
        前の解答結果を消す
      */
      resetAnswerDisplay();

      /*
        ディクテーション画面を表示
      */
      showModePanel(
        "dictation"
      );

      quizModePanel
        .classList
        .add("hidden");

      dictationModePanel
        .classList
        .remove("hidden");

      overlappingModePanel
        .classList
        .add("hidden");

      shadowingModePanel
        .classList
        .add("hidden");

           /*
        大問5は必ず
        1文ずつの語句整序ディクテーションにする
      */
      const selectedDictationType =
        Number(
          currentQuestion.format
        ) === 5
          ? "reorder"
          : String(
              dictationType?.value ||
              "reorder"
            );

      /*
        大問5では設定欄も
        「語句を並べ替える」に合わせておく
      */
      if (
        Number(
          currentQuestion.format
        ) === 5 &&
        dictationType
      ) {
        dictationType.value =
          "reorder";
      }

      /*
        語句整序
      */
      if (
        selectedDictationType ===
        "reorder"
      ) {
        audioMessage.textContent =
          "音声を聞き、単語を正しい順番に並べてください。";

        prepareReorderDictation();

      /*
        全文入力
      */
      } else if (
        selectedDictationType ===
        "full"
      ) {
        audioMessage.textContent =
          "音声を聞き、英文をすべて入力してください。";

        prepareFullDictation();

      /*
        想定外の場合は語句整序
      */
      } else {
        audioMessage.textContent =
          "音声を聞き、単語を正しい順番に並べてください。";

        prepareReorderDictation();
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );


    reviewShadowingBtn.addEventListener(
    "click",
    () => {
      if (!currentQuestion) {
        return;
      }

      stopAudio();

      setSelectedMethod(
        "shadowing"
      );

      saveSettings();

      playCount = 0;
      updatePlayCount();

      resetAnswerDisplay();

      showModePanel(
        "shadowing"
      );

      quizModePanel
        .classList
        .add("hidden");

      dictationModePanel
        .classList
        .add("hidden");

      overlappingModePanel
        .classList
        .add("hidden");

      shadowingModePanel
        .classList
        .remove("hidden");

      audioMessage.textContent =
        "音声の少し後を追いながら発音してください。";

      prepareShadowing();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );
  // ============================================================
// キーボードショートカット
// ============================================================

function registerQuizShortcuts() {
  if (
    !window.QuizShortcuts ||
    typeof window.QuizShortcuts.register !== "function"
  ) {
    return;
  }

  window.QuizShortcuts.register({
    /*
      問題画面を表示中のときだけ有効
    */
    isActive: () => {
      return (
        !playBox.classList.contains("hidden") &&
        !!currentQuestion
      );
    },

    /*
      まだ解答していない4択問題だけ、
      1〜4で解答可能
    */
    canAnswer: () => {
      return (
        !answered &&
        !quizModePanel.classList.contains("hidden") &&
        currentChoices.length === 4
      );
    },

    /*
      解答後のみEnterまたはSpaceで次へ
    */
    canNext: () => {
      return (
        answered &&
        !nextQuestionBtn.disabled
      );
    },

    /*
      問題画面ではVで音声再生可能
    */
    canSpeak: () => {
      return (
        !!currentQuestion &&
        !playBox.classList.contains("hidden")
      );
    },

    /*
      問題画面ではEscapeで設定へ戻れる
    */
    canBack: () => {
      return (
        !playBox.classList.contains("hidden")
      );
    },

    /*
      1〜4の番号は、画面に表示されている順番
    */
    onAnswer: index => {
      const choice =
        currentChoices[index - 1];

      if (!choice) {
        return;
      }

      answerQuiz(choice.id);
    },

    /*
      Enter / Space
    */
    onNext: () => {
      goNextQuestion();
    },

    /*
      V
    */
        onSpeak: async () => {
      const played =
        await playAudio({
          countAsPlay: true
        });

      if (
        !played ||
        answered
      ) {
        return;
      }

      const method =
        getSelectedMethod();

      if (
        method === "overlapping"
      ) {
        completeOverlappingBtn.disabled =
          false;
      }

      if (
        method === "shadowing"
      ) {
        completeShadowingBtn.disabled =
          false;
      }
    },

    /*
      Escape
    */
    onBack: () => {
      stopAudio();

      const ok =
        window.confirm(
          "現在の学習を中断して設定画面に戻りますか。"
        );

      if (!ok) {
        return;
      }

      showOnly("setup");
      renderGoimonMini();
      updateWeakInfo();
    }
  });
}

  // ============================================================
  // 初期化
  // ============================================================

  function initialize() {
    updateLevelBadge();

    const settings =
      loadSettings();

    applySettings(
      settings
    );

    updatePoolInfo();

    if (
  !allQuestions.length
) {
  poolInfo.textContent =
    "問題データを読み込めませんでした。" +
    "listening_type2_1kyu.jsと" +
    "listening_type3_1kyu.jsを確認してください。";

  startBtn.disabled =
    true;

  openProblemListBtn.disabled =
    true;
}

   updateWeakInfo();
renderGoimonMini();
renderEvolutionNotice();

registerQuizShortcuts();

showOnly(
  "setup"
);
  }

  initialize();

  /*
    答え合わせ後のスクリプト欄から、
    問題音声をもう一度再生します。

    countAsPlayをfalseにすることで、
    問題中の再生回数には加算しません。
  */
  playScriptAudioBtn.addEventListener(
    "click",
    async () => {
      if (!currentQuestion) {
        return;
      }

      await playAudio({
        countAsPlay: false
      });
    }
  );

});
