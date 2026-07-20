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
    [playbackRate, "playbackRate"],
    [autoPlayCount, "autoPlayCount"],
    [shuffleChoices, "shuffleChoices"],
    [startBtn, "startBtn"],
    [startWeakBtn, "startWeakBtn"],
    [openProblemListBtn, "openProblemListBtn"],
    [questionAudio, "questionAudio"],
    [playAudioBtn, "playAudioBtn"],
    [stopAudioBtn, "stopAudioBtn"],
    [playSpeedSelect, "playSpeedSelect"],
    [choicesEl, "choices"],
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
    if (
      Array.isArray(
        window.LISTENING_TYPE3_1KYU
      )
    ) {
      return window.LISTENING_TYPE3_1KYU;
    }

    /*
      listening_type3_1kyu.js の先頭が

      const listeningType3_1kyu = [...]

      となっている場合にも対応します。
    */
    try {
      if (
        typeof listeningType3_1kyu !==
          "undefined" &&
        Array.isArray(listeningType3_1kyu)
      ) {
        return listeningType3_1kyu;
      }
    } catch (error) {
      console.warn(
        "listeningType3_1kyuの取得に失敗しました。",
        error
      );
    }

    return [];
  }

  function normalizeQuestions(raw) {
    return (raw || [])
      .map(q => {
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

          format: Number(
            q?.format || 3
          ),

          type: String(
            q?.type || ""
          ),

          audioFile: String(
            q?.audioFile || ""
          ).trim(),

          script: String(
            q?.script || ""
          ).trim(),

          scriptJa: String(
            q?.scriptJa || ""
          ).trim(),

          choices: Array.isArray(q?.choices)
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
          ).trim()
        };
      })
      .filter(q => {
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

  // ============================================================
  // 状態
  // ============================================================

  let sessionQuestions = [];
  let currentIndex = 0;
  let currentQuestion = null;
  let currentChoices = [];

  let dictationTokens = [];
  let dictationSelectedIndexes = [];
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

    try {
      questionAudio.pause();
      questionAudio.currentTime = 0;
    } catch (error) {
      console.warn(
        "音声停止に失敗しました。",
        error
      );
    }
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

    return allQuestions.filter(q => {
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

    const n =
      Number(
        obj?.format3 || 0
      );

    return (
      Number.isFinite(n) &&
      n >= 0
    )
      ? n
      : 0;
  }

  function saveCursor(cursor) {
    localStorage.setItem(
      CURSOR_KEY,
      JSON.stringify({
        format3:
          Math.max(
            0,
            Number(cursor || 0)
          )
      })
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
      ...allQuestions
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

  function getSelectedDictationTokens() {
    return dictationSelectedIndexes
      .map(index => dictationTokens[index])
      .filter(token => typeof token === "string");
  }

  function getSelectedDictationText() {
    return getSelectedDictationTokens().join(" ");
  }

  function isReorderDictationCorrect() {
    if (!currentQuestion) {
      return false;
    }

    return (
      normalizeDictationText(
        getSelectedDictationText()
      ) ===
      normalizeDictationText(
        currentQuestion.script
      )
    );
  }

    function prepareReorderDictation() {
    if (!currentQuestion) {
      return;
    }

    const originalTokens =
      splitDictationTokens(
        currentQuestion.script
      );

    /*
      同じ単語が複数ある可能性があるため、
      単語そのものではなく配列番号で管理します。
    */
    dictationTokens =
      shuffleArray(originalTokens);

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

  function renderReorderDictation() {
    const selectedTokens =
      getSelectedDictationTokens();

    if (selectedTokens.length) {
      dictationAnswerArea.innerHTML =
        selectedTokens
          .map((token, selectedPosition) => {
            return `
              <button
                type="button"
                class="wordChip"
                data-selected-position="${selectedPosition}"
                title="クリックするとこの語以降を戻します"
              >
                ${escapeHtml(token)}
              </button>
            `;
          })
          .join("");
    } else {
      dictationAnswerArea.innerHTML = `
        <span class="muted">
          下の単語を、聞こえた順番に選んでください。
        </span>
      `;
    }

    wordBank.innerHTML = "";

    dictationTokens.forEach((token, index) => {
      const isUsed =
        dictationSelectedIndexes.includes(index);

      const btn =
        document.createElement("button");

      btn.type = "button";
      btn.className = "wordChip";

      if (isUsed) {
        btn.classList.add("used");
        btn.disabled = true;
      }

      btn.textContent = token;

      btn.addEventListener("click", () => {
        if (
          dictationSelectedIndexes.includes(index)
        ) {
          return;
        }

        dictationSelectedIndexes.push(index);
        renderReorderDictation();
      });

      wordBank.appendChild(btn);
    });

    dictationAnswerArea
      .querySelectorAll("[data-selected-position]")
      .forEach(btn => {
        btn.addEventListener("click", () => {
          const selectedPosition =
            Number(
              btn.dataset.selectedPosition
            );

          if (
            !Number.isFinite(selectedPosition)
          ) {
            return;
          }

          /*
            押した語と、それより後ろの語を
            単語バンクへ戻します。
          */
          dictationSelectedIndexes =
            dictationSelectedIndexes.slice(
              0,
              selectedPosition
            );

          renderReorderDictation();
        });
      });

    checkReorderBtn.disabled =
      dictationSelectedIndexes.length !==
      dictationTokens.length;
  }

    function checkReorderDictation() {
    if (
      !currentQuestion ||
      answered
    ) {
      return;
    }

    if (
      dictationSelectedIndexes.length !==
      dictationTokens.length
    ) {
      answerResult.className =
        "answerResult ng";

      answerResult.textContent =
        "まだ使っていない単語があります。";

      return;
    }

    dictationAttempts += 1;

    const isCorrect =
      isReorderDictationCorrect();

    answerResult
      .classList
      .remove("hidden");

    if (!isCorrect) {
      answerResult.className =
        "answerResult ng";

      answerResult.textContent =
        `順番が違います。もう一度並べ替えてください。` +
        `（解答回数：${dictationAttempts}回）`;

      addAutoWeak(
        currentQuestion.id
      );

      updateWeakInfo();

      return;
    }

    answered = true;
    stopAudio();

    answerResult.className =
      "answerResult ok";

    answerResult.textContent =
      `正解です。` +
      `再生${playCount}回・解答${dictationAttempts}回で完成しました。`;

    scriptAnswerEn.textContent =
      currentQuestion.script;

    scriptAnswerJa.textContent =
      currentQuestion.scriptJa;

    scriptAnswerBox
      .classList
      .remove("hidden");

    explanationText.textContent =
      currentQuestion.explanation ||
      "解説はありません。";

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

      playCount:
        playCount,

      dictationAttempts:
        dictationAttempts,

      dictationPassed:
        playCount <= passLimit,

      pointAdded:
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
      currentQuestion.explanation ||
      "解説はありません。";

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
      ディクテーションの状態も初期化
    */
    dictationTokens = [];
    dictationSelectedIndexes = [];
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
        String(
          dictationType?.value ||
          "reorder"
        );

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
              ${escapeHtml(choice.text)}
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
      currentQuestion.explanation ||
      "解説はありません。";

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
      const nextCursor =
        (
          loadCursor() +
          sessionQuestions.length
        ) %
        Math.max(
          1,
          allQuestions.length
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

    summaryLine.textContent =
      `大問3形式・リスニング問題・${attempted}問`;

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
    renderProblemList(
      allQuestions
    );

    showOnly(
      "problemList"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function renderProblemList(
    source
  ) {
    const list =
      source || [];

    problemListSummary.textContent =
      `大問3形式・全${list.length}問。` +
      "問題文、選択肢、正答、日本語訳を確認できます。";

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
              const isAnswer =
                problemListAnswersVisible &&
                choice.id ===
                  q.answerId;

              return `
                <div
                  style="
                    margin-top:6px;
                    padding:8px 10px;
                    border-radius:10px;
                    border:1px solid ${
                      isAnswer
                        ? "#bfe7ca"
                        : "#eee"
                    };
                    background:${
                      isAnswer
                        ? "#eefaf1"
                        : "#fafafa"
                    };
                  "
                >
                  <strong>
                    ${escapeHtml(
                      choice.id
                    )}.
                  </strong>

                  ${escapeHtml(
                    choice.text
                  )}

                  ${
                    problemListAnswersVisible
                      ? `
                        <div class="muted">
                          ${escapeHtml(
                            choice.ja
                          )}
                        </div>
                      `
                      : ""
                  }
                </div>
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

          ${
            problemListAnswersVisible
              ? `
                <div
                  style="
                    margin-top:10px;
                    line-height:1.7;
                  "
                >
                  <strong>
                    問題文：
                  </strong>

                  ${escapeHtml(
                    q.script
                  )}
                </div>

                <div class="muted">
                  ${escapeHtml(
                    q.scriptJa
                  )}
                </div>
              `
              : `
                <div
                  style="
                    margin-top:10px;
                    padding:12px;
                    text-align:center;
                    color:#777;
                    background:#fafafa;
                    border:1px dashed #d8d8d8;
                    border-radius:12px;
                  "
                >
                  問題文と正答を隠しています
                </div>
              `
          }

          <div style="margin-top:10px;">
            ${choicesHtml}
          </div>

          ${
            problemListAnswersVisible
              ? `
                <div
                  style="
                    margin-top:10px;
                    line-height:1.7;
                  "
                >
                  <strong>
                    正答：
                  </strong>

                  ${escapeHtml(
                    q.answerId
                  )}.

                  ${escapeHtml(
                    correct?.text ||
                    ""
                  )}
                </div>

                <div
                  class="muted"
                  style="margin-top:6px;"
                >
                  ${escapeHtml(
                    q.explanation
                  )}
                </div>
              `
              : ""
          }
        `;

        problemListBody
          .appendChild(item);
      }
    );

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
                btn.dataset
                  .questionId ||
                ""
              );

            const next =
              !getWeakState(
                id
              ).pin;

            setPinned(
              id,
              next
            );

            updateWeakInfo();

            renderProblemList(
              list
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
      saveSettings
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
          renderProblemList(
            allQuestions
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

        renderProblemList(
          allQuestions
        );
      }
    );

  shuffleProblemListBtn
    .addEventListener(
      "click",
      () => {
        renderProblemList(
          shuffleArray(
            allQuestions
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
        !dictationSelectedIndexes.length ||
        answered
      ) {
        return;
      }

      dictationSelectedIndexes.pop();

      renderReorderDictation();

      answerResult.className =
        "answerResult hidden";

      answerResult.textContent =
        "";
    }
  );

  resetWordsBtn.addEventListener(
    "click",
    () => {
      if (answered) {
        return;
      }

      dictationSelectedIndexes = [];

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
        設定されているディクテーション方式を確認
      */
      const selectedDictationType =
        String(
          dictationType?.value ||
          "reorder"
        );

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

    poolInfo.textContent =
      `大問3形式：全${allQuestions.length}問`;

    if (
      !allQuestions.length
    ) {
      poolInfo.textContent =
        "問題データを読み込めませんでした。" +
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

});
