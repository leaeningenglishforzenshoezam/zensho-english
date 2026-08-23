// progress.js
// ゴイモン v1.1 進捗ページ
//
// ① Block別進捗
//    暗記 / 英→日 / 日→英 / アクセント / 大問9 / 音声→意味
//
// ② 大問別・演習進捗
//    learning_log.js の共通ログから表示
//
// ※ ゴイモン本体の保存データには触れない
// ※ 既存Block保存キーも変更しない

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const LEVEL_KEY = "zensho_level_v1";

  // 「目安クリア」と判定するために必要な
// 最低の正誤判定問題数
const MIN_JUDGED_ATTEMPTS = 20;

  const badge =
    document.getElementById("levelBadge");

  const blockGrid =
    document.getElementById("blockGrid");

  const emptyState =
    document.getElementById("emptyState");

  const examGrid =
    document.getElementById("examGrid");

  const examEmpty =
    document.getElementById("examEmpty");

  const btnLv1 =
    document.getElementById("lv1");

  const btnLv2 =
    document.getElementById("lv2");

  const btnRefresh =
    document.getElementById("refresh");

  const btnResetGlobal =
    document.getElementById("resetGlobal");

  const passLineEl =
    document.getElementById("passLine");

  const statusFilterEl =
    document.getElementById("statusFilter");

  const summaryMain =
    document.getElementById("summaryMain");

  const summarySub =
    document.getElementById("summarySub");

  const summaryRecommend =
    document.getElementById("summaryRecommend");

  const summaryRecommendSub =
    document.getElementById("summaryRecommendSub");

  const summaryMemo =
    document.getElementById("summaryMemo");

  const summaryMemoSub =
    document.getElementById("summaryMemoSub");

  const progressGoimonImage =
    document.getElementById("progressGoimonImage");

  const progressGoimonName =
    document.getElementById("progressGoimonName");

  const progressGoimonMeta =
    document.getElementById("progressGoimonMeta");

  const progressGoimonComment =
    document.getElementById("progressGoimonComment");


  // ============================================================
  // 基本
  // ============================================================

  function getLevel() {
    return (
      localStorage.getItem(LEVEL_KEY) ||
      "1"
    );
  }


  function setLevel(lv) {
    localStorage.setItem(
      LEVEL_KEY,
      String(lv)
    );

    window.ACTIVE_LEVEL =
      String(lv);
  }


  function getActiveDataset() {
    const lv = getLevel();

    window.ACTIVE_LEVEL = lv;

    if (lv === "2") {
      window.WORDS =
        window.WORDS_2KYU ||
        [];

      window.BLOCKS =
        window.BLOCKS_2KYU ||
        [];
    } else {
      window.WORDS =
        window.WORDS_1KYU ||
        [];

      window.BLOCKS =
        window.BLOCKS_1KYU ||
        [];
    }

    return {
      lv,
      words:
        window.WORDS || [],
      blocks:
        window.BLOCKS || []
    };
  }


  // ============================================================
  // Block進捗
  // ============================================================

  function globalKey(lv) {
    return (
      `zensho_block_global_lv${lv}_v1`
    );
  }


  function loadGlobal(lv) {
    const raw =
      localStorage.getItem(
        globalKey(lv)
      );

    if (!raw) {
      return {
        byBlock: {}
      };
    }

    try {
      const obj =
        JSON.parse(raw);

      if (
        obj &&
        typeof obj === "object"
      ) {
        if (
          !obj.byBlock ||
          typeof obj.byBlock !== "object"
        ) {
          obj.byBlock = {};
        }

        return obj;
      }
    } catch {}

    return {
      byBlock: {}
    };
  }


  function ensureRec(rec) {
    const r =
      rec &&
      typeof rec === "object"
        ? rec
        : {};

    if (
      typeof r.studyDone !== "number"
    ) {
      r.studyDone = 0;
    }

    if (
      typeof r.quizAttempted !== "number"
    ) {
      r.quizAttempted = 0;
    }

    if (
      typeof r.quizCorrect !== "number"
    ) {
      r.quizCorrect = 0;
    }

    if (
      typeof r.quizAttemptedJaEn !==
      "number"
    ) {
      r.quizAttemptedJaEn = 0;
    }

    if (
      typeof r.quizCorrectJaEn !==
      "number"
    ) {
      r.quizCorrectJaEn = 0;
    }

    if (
      typeof r.accentAttempted !==
      "number"
    ) {
      r.accentAttempted = 0;
    }

    if (
      typeof r.accentCorrect !==
      "number"
    ) {
      r.accentCorrect = 0;
    }

    if (
      typeof r.sentenceAttempted !==
      "number"
    ) {
      r.sentenceAttempted = 0;
    }

    if (
      typeof r.sentenceCorrect !==
      "number"
    ) {
      r.sentenceCorrect = 0;
    }

    if (
      typeof r.audioAttempted !==
      "number"
    ) {
      r.audioAttempted = 0;
    }

    if (
      typeof r.audioCorrect !==
      "number"
    ) {
      r.audioCorrect = 0;
    }

    return r;
  }


  function pct(
    correct,
    attempted
  ) {
    if (
      !attempted ||
      attempted <= 0
    ) {
      return null;
    }

    return Math.round(
      (correct / attempted) *
      100
    );
  }


  // ============================================================
  // ステータス
  // ============================================================

  function makeStatus(
  accuracy,
  attempted,
  passLine,
  judgedAttempts = attempted
) {
  if (
    !attempted ||
    attempted <= 0
  ) {
    return {
      text: "未挑戦",
      cls: "ng",
      key: "untouched"
    };
  }

  if (
    accuracy === null
  ) {
    return {
      text: "学習中",
      cls: "mid",
      key: "learning"
    };
  }

  // 正誤判定された問題数がまだ少ない
  if (
    Number(judgedAttempts || 0) <
    MIN_JUDGED_ATTEMPTS
  ) {
    return {
      text: "学習中",
      cls: "mid",
      key: "learning"
    };
  }

  if (
    accuracy < passLine
  ) {
    return {
      text: "要復習",
      cls: "mid",
      key: "needs_review"
    };
  }

  return {
    text: "目安クリア",
    cls: "ok",
    key: "clear"
  };
}


  function overallBlockJudge(
    rec,
    passLine
  ) {
    const scored = [
      {
        attempted:
          rec.quizAttempted,
        accuracy:
          pct(
            rec.quizCorrect,
            rec.quizAttempted
          )
      },
      {
        attempted:
          rec.quizAttemptedJaEn,
        accuracy:
          pct(
            rec.quizCorrectJaEn,
            rec.quizAttemptedJaEn
          )
      },
      {
        attempted:
          rec.accentAttempted,
        accuracy:
          pct(
            rec.accentCorrect,
            rec.accentAttempted
          )
      },
      {
        attempted:
          rec.sentenceAttempted,
        accuracy:
          pct(
            rec.sentenceCorrect,
            rec.sentenceAttempted
          )
      },
      {
        attempted:
          rec.audioAttempted,
        accuracy:
          pct(
            rec.audioCorrect,
            rec.audioAttempted
          )
      }
    ];


    const touched =
      rec.studyDone > 0 ||
      scored.some(
        item =>
          item.attempted > 0
      );


    if (!touched) {
      return {
        text: "未挑戦",
        cls: "ng",
        key: "untouched"
      };
    }


    const hasLow =
  scored.some(
    item =>
      item.attempted >=
        MIN_JUDGED_ATTEMPTS &&
      item.accuracy !== null &&
      item.accuracy < passLine
  );


    if (hasLow) {
      return {
        text: "要復習",
        cls: "mid",
        key: "needs_review"
      };
    }


    const allScoredEnough =
  scored.every(
    item =>
      item.attempted >=
      MIN_JUDGED_ATTEMPTS
  );


    if (
      rec.studyDone > 0 &&
      allScoredEnough
    ) {
      return {
        text: "目安クリア",
        cls: "ok",
        key: "clear"
      };
    }


    return {
      text: "学習中",
      cls: "mid",
      key: "learning"
    };
  }


  function filterMatch(
    judgeKey,
    filterValue
  ) {
    if (
      filterValue === "all"
    ) {
      return true;
    }

    return (
      judgeKey === filterValue
    );
  }


  // ============================================================
  // Block内おすすめ
  // ============================================================

  function categoryPriorityScore(
  rec,
  category,
  passLine
) {
  /*
   * 数字が小さいほど
   * 「次におすすめする優先度が高い」
   */

  // --------------------------------
  // 暗記
  // --------------------------------

  if (
    category === "study"
  ) {
    // まだ一度も意味確認をしていない
    if (
      rec.studyDone <= 0
    ) {
      return -1200;
    }

    // 一度取り組んでいれば、
    // 問題演習を優先する
    return 1500;
  }

  // --------------------------------
  // 正誤のあるBlock学習
  // --------------------------------

  const config = {
    quiz_enja: {
      correct:
        rec.quizCorrect,
      attempted:
        rec.quizAttempted
    },

    quiz_jaen: {
      correct:
        rec.quizCorrectJaEn,
      attempted:
        rec.quizAttemptedJaEn
    },

    accent: {
      correct:
        rec.accentCorrect,
      attempted:
        rec.accentAttempted
    },

    sentence: {
      correct:
        rec.sentenceCorrect,
      attempted:
        rec.sentenceAttempted
    },

    audio_quiz: {
      correct:
        rec.audioCorrect,
      attempted:
        rec.audioAttempted
    }
  };

  const target =
    config[category];

  if (!target) {
    return 9999;
  }

  const attempted =
    Number(
      target.attempted || 0
    );

  const correct =
    Number(
      target.correct || 0
    );

  // --------------------------------
  // ① 未挑戦
  // --------------------------------

  if (
    attempted <= 0
  ) {
    return -1000;
  }

  // --------------------------------
  // ② 20問未満
  // --------------------------------

  if (
    attempted <
    MIN_JUDGED_ATTEMPTS
  ) {
    /*
     * 取り組み数が少ないものほど
     * 優先する。
     *
     * 1問 → -899
     * 10問 → -890
     * 19問 → -881
     */
    return (
      -900 +
      attempted
    );
  }

  const accuracy =
    pct(
      correct,
      attempted
    );

  // 念のため
  if (
    accuracy === null
  ) {
    return -800;
  }

  // --------------------------------
  // ③ 20問以上・目安未満
  // --------------------------------

  if (
    accuracy < passLine
  ) {
    /*
     * 正答率が低いほど
     * 優先度を高くする。
     *
     * 40% → 40
     * 70% → 70
     */
    return accuracy;
  }

  // --------------------------------
  // ④ 目安クリア
  // --------------------------------

  return (
    1000 +
    accuracy
  );
}


  function getBestAction(
    rec,
    passLine
  ) {
    const candidates = [
      {
        key: "quiz_enja",
        label: "英→日",
        page: "quiz.html",
        extra: "autostart=1"
      },
      {
        key: "quiz_jaen",
        label: "日→英",
        page:
          "quiz_jaen.html",
        extra: "autostart=1"
      },
      {
        key: "accent",
        label: "アクセント",
        page: "accent.html",
        extra: ""
      },
      {
        key: "sentence",
        label: "大問9",
        page: "sentence.html",
        extra: ""
      },
      {
        key: "audio_quiz",
        label: "音声→意味",
        page:
          "audio_quiz.html",
        extra: "autostart=1"
      },
      {
        key: "study",
        label: "暗記",
        page: "study.html",
        extra: ""
      }
    ];


    return candidates
      .map(c => ({
        ...c,
       score:
  categoryPriorityScore(
    rec,
    c.key,
    passLine
  )
      }))
      .sort(
        (a, b) =>
          a.score - b.score
      )[0];
  }


  function buildUrl(
    page,
    start,
    end,
    extra = ""
  ) {
    const base =
      `${page}?start=${start}` +
      `&end=${end}`;

    return extra
      ? `${base}&${extra}`
      : base;
  }


  function makeStatusBox(
  label,
  correct,
  attempted,
  passLine
) {
  const accuracy =
    pct(
      correct,
      attempted
    );

  const status =
    makeStatus(
      accuracy,
      attempted,
      passLine,
      attempted
    );

  const resultText =
    accuracy === null
      ? "未挑戦"
      : `${correct}/${attempted}`;

  const remaining =
    Math.max(
      0,
      MIN_JUDGED_ATTEMPTS -
        Number(attempted || 0)
    );

  const progressText =
    remaining > 0
      ? `目安判定まで あと${remaining}問`
      : status.text;

  return `
    <div class="statusBox">
      <div class="statusLabel">
        ${label}
      </div>

      <div class="statusValue">
        <span class="pill ${status.cls}">
          ${
            accuracy === null
              ? status.text
              : `${accuracy}%`
          }
        </span>
      </div>

      <div
        class="statusLabel"
        style="margin-top:6px;"
      >
        ${resultText}
      </div>

      <div
        class="statusLabel"
        style="margin-top:4px;"
      >
        ${progressText}
      </div>
    </div>
  `;
}


  // ============================================================
  // learning_log 全期間集計
  // ============================================================

  function getAllTimeLearningSummary(
    level
  ) {
    if (
      !window.ZenshoLearningLog ||
      typeof window.ZenshoLearningLog.readLog !==
      "function"
    ) {
      return {};
    }


    const log =
      window.ZenshoLearningLog.readLog(
        level
      ) || {};


    const result = {};


    Object.values(log)
      .forEach(day => {
        if (
          !day ||
          typeof day !== "object"
        ) {
          return;
        }


        Object.entries(day)
          .forEach(
            ([category, raw]) => {

              const slot =
                raw &&
                typeof raw === "object"
                  ? raw
                  : {};


              if (!result[category]) {
                result[category] = {
                  attempt: 0,
                  correct: 0,
                  wrong: 0
                };
              }


              result[
                category
              ].attempt +=
                Number(
                  slot.attempt || 0
                );

              result[
                category
              ].correct +=
                Number(
                  slot.correct || 0
                );

              result[
                category
              ].wrong +=
                Number(
                  slot.wrong || 0
                );
            }
          );
      });


    Object.values(result)
      .forEach(slot => {
        const judged =
          slot.correct +
          slot.wrong;

        slot.accuracy =
          judged > 0
            ? Math.round(
                (
                  slot.correct /
                  judged
                ) * 100
              )
            : null;
      });


    return result;
  }


  // ============================================================
  // 大問別カテゴリ
  // ============================================================

  const BLOCK_CATEGORY_KEYS =
    new Set([
      "study",
      "quiz_enja",
      "quiz_jaen",
      "audio_quiz",
      "accent",
      "sentence"
    ]);


  function getExamCategories(
    level
  ) {
    if (
      !window.LearningCategories ||
      typeof window
        .LearningCategories
        .getProgressCategories !==
        "function"
    ) {
      return [];
    }


    return window
      .LearningCategories
      .getProgressCategories(level)
      .filter(category => {
        return !BLOCK_CATEGORY_KEYS.has(
          category.key
        );
      });
  }


  function getLastStudyText(
    categoryKey,
    level
  ) {
    if (
      !window.ZenshoLearningLog ||
      typeof window
        .ZenshoLearningLog
        .getLastStudyDate !==
        "function"
    ) {
      return "";
    }


    const date =
      window.ZenshoLearningLog
        .getLastStudyDate(
          categoryKey,
          level
        );


    if (!date) {
      return "まだ記録なし";
    }


    return `最終学習：${date}`;
  }


  function renderExamProgress(
    level,
    passLine,
    filterValue
  ) {
    if (
      !examGrid ||
      !examEmpty
    ) {
      return;
    }


    const categories =
      getExamCategories(level);

    const summary =
      getAllTimeLearningSummary(
        level
      );


    const html = [];


    categories.forEach(category => {
      const slot =
        summary[category.key] || {
          attempt: 0,
          correct: 0,
          wrong: 0,
          accuracy: null
        };


      const judgedAttempts =
  Number(slot.correct || 0) +
  Number(slot.wrong || 0);

const status =
  makeStatus(
    slot.accuracy,
    slot.attempt,
    passLine,
    judgedAttempts
  );


      if (
        !filterMatch(
          status.key,
          filterValue
        )
      ) {
        return;
      }


      const accuracyText =
        slot.accuracy === null
          ? "—"
          : `${slot.accuracy}%`;


      const resultText =
        slot.correct +
          slot.wrong >
        0
          ? `${slot.correct}/${slot.correct + slot.wrong}`
          : `${slot.attempt}回`;


      const lastText =
        getLastStudyText(
          category.key,
          level
        );


      html.push(`
        <div class="blockCard">

          <div class="blockHead">
            <div>
              <div class="blockTitle">
                ${category.label}
              </div>

              <div class="blockRange">
                ${lastText}
              </div>
            </div>

            <div>
              <span
                class="pill ${status.cls}"
              >
                ${status.text}
              </span>
            </div>
          </div>


          <div class="statusGrid">

            <div class="statusBox">
              <div class="statusLabel">
                正答率
              </div>

              <div class="statusValue">
                ${accuracyText}
              </div>

              <div
                class="statusLabel"
                style="margin-top:6px;"
              >
                ${resultText}
              </div>
            </div>


            <div class="statusBox">
              <div class="statusLabel">
                取り組み回数
              </div>

              <div class="statusValue">
                ${slot.attempt}
              </div>

              <div
                class="statusLabel"
                style="margin-top:6px;"
              >
                共通学習ログ
              </div>
            </div>

          </div>


          <div class="actionArea">
            <div class="actionTitle">
              この学習へ進む
            </div>

            <div class="actionButtons">
              <button
                class="miniBtn recommend"
                data-url="${category.page}"
              >
                ${category.shortLabel || category.label}を学習
              </button>
            </div>
          </div>

        </div>
      `);
    });


    examGrid.innerHTML =
      html.join("");


    examEmpty.style.display =
      html.length
        ? "none"
        : "block";


    examGrid
      .querySelectorAll(
        "button[data-url]"
      )
      .forEach(btn => {
        btn.addEventListener(
          "click",
          () => {
            const url =
              btn.getAttribute(
                "data-url"
              );

            if (url) {
              location.href = url;
            }
          }
        );
      });
  }


  // ============================================================
  // ゴイモン
  // ============================================================

  function getGoimonComment(
  goimon,
  recommendBlock,
  recommendAction
) {
  const type =
    String(
      goimon?.type ||
      "nagomi"
    );

  const stage =
    String(
      goimon?.stage ||
      "egg"
    );

  const stats =
    goimon?.stats || {
      chie: 0,
      kotoba: 0,
      onkan: 0,
      bunmyaku: 0
    };

  const abilityLabels = {
    chie: "ちえ",
    kotoba: "ことば",
    onkan: "おんかん",
    bunmyaku: "ぶんみゃく"
  };

  /*
   * 能力値は英語力の診断ではなく、
   * どんな学習をしてきたかによって育つ値。
   *
   * そのため「弱い能力」とは表現しない。
   */
  const sortedStats =
    Object.entries(stats)
      .map(([key, value]) => {
        return [
          key,
          Number(value || 0)
        ];
      })
      .sort(
        (a, b) =>
          b[1] - a[1]
      );

  const highestAbility =
    sortedStats[0]?.[0] ||
    "chie";

  const highestLabel =
    abilityLabels[
      highestAbility
    ] || highestAbility;

  const values =
    sortedStats.map(
      item => item[1]
    );

  const maxValue =
    Math.max(
      ...values,
      0
    );

  const minValue =
    Math.min(
      ...values,
      0
    );

  const spread =
    maxValue - minValue;

  const typeLeadMap = {
    nagomi:
      "いろいろな学習に取り組みながら、バランスよく育っているゴイモンだよ。",

    hirameki:
      "単語や意味を確認する学習を重ねてきた育ち方が表れているね。",

    tsumugi:
      "ことばを思い出したり表現したりする学習を重ねてきた育ち方だね。",

    yomitoki:
      "文や文章の流れを考える学習を重ねてきた育ち方が表れているよ。",

    shirabe:
      "英語の音やアクセントに触れる学習を重ねてきた育ち方だね。",

    hibiki:
      "音と意味を結びつける学習を重ねてきた育ち方が表れているよ。",

    kotonoha:
      "ことばと文脈を行き来する学習を重ねてきた育ち方だね。",

    mr_uno:
      "いろいろな学び方を経験してきたゴイモンだね。これまでの学習の積み重ねが表れているよ。"
  };

  /*
   * 能力差は「弱点」ではなく、
   * 育て方の特徴として説明する。
   */
  let balanceText = "";

  if (spread <= 5) {
    balanceText =
      "4つの能力が比較的バランスよく育っているね。";
  } else {
    balanceText =
      `今は「${highestLabel}」が特によく育っているよ。` +
      "これまで取り組んできた学習の特徴が表れているね。";
  }

  /*
   * 学習成績から計算したおすすめは、
   * ゴイモンの能力値とは分けて表示する。
   */
  const recommendText =
    recommendBlock &&
    recommendAction
      ? (
          `学習記録を見ると、` +
          `次は Block ${recommendBlock.id} の` +
          `「${recommendAction.label}」がおすすめだよ。`
        )
      : (
          "学習記録を見ながら、今日取り組む学習を一つ選んでみよう。"
        );

  const stageText =
    stage === "egg"
      ? "まだ育成は始まったばかり。いろいろな学習を試してみよう。"
      : stage === "child"
      ? "少しずつ、これまでの学び方が姿に表れてきたね。"
      : stage === "growth"
      ? "学習を重ねて、育て方の特徴がだんだん見えてきたね。"
      : stage === "mid"
      ? "かなり育ってきたね。これからどんな育て方をするかでも姿は変わっていくよ。"
      : "ここまでの学習の積み重ねが、今の姿にしっかり表れているね。";

  return (
    `${typeLeadMap[type] || typeLeadMap.nagomi} ` +
    `${balanceText} ` +
    `${recommendText} ` +
    `${stageText}`
  );
}


  function renderGoimonPanel(
    recommendBlock,
    recommendAction
  ) {
    if (
      !window.GoimonUI ||
      typeof window
        .GoimonUI
        .loadCurrent !==
        "function"
    ) {
      progressGoimonComment
        .textContent =
        "ゴイモン情報を読み込めませんでした。";

      return;
    }


    const g =
      window.GoimonUI
        .loadCurrent();


    if (!g) {
      return;
    }


    const name =
      typeof window
        .GoimonUI
        .getGoimonPrimaryName ===
        "function"
        ? window.GoimonUI
            .getGoimonPrimaryName(g)
        : "ゴイモン";


    const stage =
      typeof window
        .GoimonUI
        .getStageLabel ===
        "function"
        ? window.GoimonUI
            .getStageLabel(g.stage)
        : String(
            g.stage || ""
          );


    const pointText =
      typeof window
        .GoimonUI
        .formatPoint ===
        "function"
        ? window.GoimonUI
            .formatPoint(
              g.totalPoints || 0
            )
        : String(
            g.totalPoints || 0
          );


    progressGoimonImage.src =
      g.imageKey ||
      "images/goimon/goimon_egg.png";

    progressGoimonImage.alt =
      name;

    progressGoimonName.textContent =
      name;

    progressGoimonMeta.textContent =
      `Lv ${g.level} / ` +
      `${pointText} pt / ` +
      `${stage}`;

    progressGoimonComment.textContent =
      getGoimonComment(
        g,
        recommendBlock,
        recommendAction
      );
  }


  // ============================================================
  // メイン描画
  // ============================================================

  function render() {
    const {
      lv,
      words,
      blocks
    } =
      getActiveDataset();


    const global =
      loadGlobal(lv);


    const passLine =
      Number(
        passLineEl.value
      ) || 80;


    const filterValue =
      statusFilterEl.value ||
      "all";


    badge.textContent =
      `現在：全商英検 ${lv}級`;


    btnLv1.classList.toggle(
      "primary",
      lv === "1"
    );

    btnLv2.classList.toggle(
      "primary",
      lv === "2"
    );


    let needsReviewCount = 0;
    let learningCount = 0;
    let clearCount = 0;
    let untouchedCount = 0;


    let totalStudy = 0;


    let recommendBlock = null;
    let recommendAction = null;
    let recommendScore = 999999;


    const cardHtmlList = [];


    blocks.forEach(b => {
      const id =
        String(b.id);

      const rec =
        ensureRec(
          global.byBlock[id] ||
          {}
        );


      totalStudy +=
        rec.studyDone;


      const judge =
        overallBlockJudge(
          rec,
          passLine
        );


      if (
        judge.key ===
        "needs_review"
      ) {
        needsReviewCount++;
      }

      if (
        judge.key ===
        "learning"
      ) {
        learningCount++;
      }

      if (
        judge.key ===
        "clear"
      ) {
        clearCount++;
      }

      if (
        judge.key ===
        "untouched"
      ) {
        untouchedCount++;
      }


      const bestAction =
        getBestAction(
          rec,
          passLine
        );


      if (
        bestAction &&
        bestAction.score <
          recommendScore
      ) {
        recommendScore =
          bestAction.score;

        recommendBlock = b;

        recommendAction =
          bestAction;
      }


      if (
        !filterMatch(
          judge.key,
          filterValue
        )
      ) {
        return;
      }


      const start =
        Number(b.start);

      const end =
        Number(b.end);


      const studyLabel =
        rec.studyDone > 0
          ? `${rec.studyDone}回`
          : "未";


      const bestUrl =
        buildUrl(
          bestAction.page,
          start,
          end,
          bestAction.extra
        );


      cardHtmlList.push(`
        <div class="blockCard">

          <div class="blockHead">
            <div>
              <div class="blockTitle">
                Block ${b.id}
              </div>

              <div class="blockRange">
                ${b.start}〜${b.end}
              </div>
            </div>

            <div>
              <span class="pill ${judge.cls}">
                ${judge.text}
              </span>
            </div>
          </div>


          <div class="statusGrid">

            <div class="statusBox">
              <div class="statusLabel">
                暗記
              </div>

              <div class="statusValue">
                ${studyLabel}
              </div>

              <div
                class="statusLabel"
                style="margin-top:6px;"
              >
                意味を確認して進めた回数
              </div>
            </div>


            ${makeStatusBox(
              "英→日",
              rec.quizCorrect,
              rec.quizAttempted,
              passLine
            )}


            ${makeStatusBox(
              "日→英",
              rec.quizCorrectJaEn,
              rec.quizAttemptedJaEn,
              passLine
            )}


            ${makeStatusBox(
              "アクセント",
              rec.accentCorrect,
              rec.accentAttempted,
              passLine
            )}


            ${makeStatusBox(
              "大問9",
              rec.sentenceCorrect,
              rec.sentenceAttempted,
              passLine
            )}


            ${makeStatusBox(
              "音声→意味",
              rec.audioCorrect,
              rec.audioAttempted,
              passLine
            )}

          </div>


          <div class="actionArea">
            <div class="actionTitle">
              このBlockから始める
            </div>

            <div class="actionButtons">

              <button
                class="miniBtn recommend"
                data-url="${bestUrl}"
              >
                おすすめ：${bestAction.label}
              </button>

              <button
                class="miniBtn"
                data-url="${buildUrl(
                  "study.html",
                  start,
                  end
                )}"
              >
                暗記
              </button>

              <button
                class="miniBtn"
                data-url="${buildUrl(
                  "quiz.html",
                  start,
                  end,
                  "autostart=1"
                )}"
              >
                英→日
              </button>

              <button
                class="miniBtn"
                data-url="${buildUrl(
                  "quiz_jaen.html",
                  start,
                  end,
                  "autostart=1"
                )}"
              >
                日→英
              </button>

              <button
                class="miniBtn"
                data-url="${buildUrl(
                  "accent.html",
                  start,
                  end
                )}"
              >
                アクセント
              </button>

              <button
                class="miniBtn"
                data-url="${buildUrl(
                  "sentence.html",
                  start,
                  end
                )}"
              >
                大問9
              </button>

              <button
                class="miniBtn"
                data-url="${buildUrl(
                  "audio_quiz.html",
                  start,
                  end,
                  "autostart=1"
                )}"
              >
                音声→意味
              </button>

            </div>
          </div>

        </div>
      `);
    });


    blockGrid.innerHTML =
      cardHtmlList.join("");


    emptyState.style.display =
      cardHtmlList.length
        ? "none"
        : "block";


    summaryMain.textContent =
      `${blocks.length} Block / ` +
      `${words.length}語`;


    summarySub.textContent =
      `要復習 ${needsReviewCount} / ` +
      `学習中 ${learningCount} / ` +
      `目安クリア ${clearCount} / ` +
      `未挑戦 ${untouchedCount}`;


    if (
      recommendBlock &&
      recommendAction
    ) {
      summaryRecommend.textContent =
        `Block ${recommendBlock.id} の ` +
        `${recommendAction.label}`;

      summaryRecommendSub.textContent =
        "Block学習の中から、今取り組みやすい候補を表示しています。";
    } else {
      summaryRecommend.textContent =
        "候補なし";

      summaryRecommendSub.textContent =
        "まだおすすめを計算できません。";
    }


    const learningSummary =
      getAllTimeLearningSummary(
        lv
      );


    const totalAttempts =
      Object.values(
        learningSummary
      ).reduce(
        (
          sum,
          slot
        ) =>
          sum +
          Number(
            slot.attempt || 0
          ),
        0
      );


    summaryMemo.textContent =
      `${totalAttempts}問・回`;


    summaryMemoSub.textContent =
      `共通学習ログの累計 / ` +
      `暗記完了 ${totalStudy}回`;


    renderExamProgress(
      lv,
      passLine,
      filterValue
    );


    renderGoimonPanel(
      recommendBlock,
      recommendAction
    );


    blockGrid
      .querySelectorAll(
        "button[data-url]"
      )
      .forEach(btn => {
        btn.addEventListener(
          "click",
          () => {
            const url =
              btn.getAttribute(
                "data-url"
              );

            if (url) {
              location.href = url;
            }
          }
        );
      });
  }


  // ============================================================
  // イベント
  // ============================================================

  btnLv1.addEventListener(
    "click",
    () => {
      setLevel("1");
      render();
    }
  );


  btnLv2.addEventListener(
    "click",
    () => {
      setLevel("2");
      render();
    }
  );


  btnRefresh.addEventListener(
    "click",
    render
  );


  passLineEl.addEventListener(
    "change",
    render
  );


  statusFilterEl.addEventListener(
    "change",
    render
  );


  btnResetGlobal.addEventListener(
    "click",
    () => {
      const lv =
        getLevel();


      const ok =
        confirm(
          `全商英検 ${lv}級の` +
          `Block進捗だけを削除しますか？\n\n` +
          `ゴイモン・学習ログ・苦手記録は削除されません。`
        );


      if (!ok) {
        return;
      }


      localStorage.removeItem(
        globalKey(lv)
      );


      alert(
        "Block進捗を削除しました。\n" +
        "ゴイモンと学習ログはそのままです。"
      );


      render();
    }
  );


  render();
});
