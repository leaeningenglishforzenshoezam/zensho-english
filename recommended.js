// recommended.js
// ゴイモン v1.1 今日のおすすめ
//
// ① 合格に向けたおすすめ
//    ・正答率
//    ・未挑戦
//    ・最近の学習状況
//    ・Block進捗
//
// ② ゴイモン育成おすすめ
//    ・現在の4能力の育ち方
//    ・まだあまり育てていない能力につながる学習カテゴリ
//
// ※ ゴイモンの保存データは変更しない
// ※ 学習ログ・Block進捗も削除・初期化しない

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const LEVEL_KEY = "zensho_level_v1";
  // 正答率を「判断材料あり」とみなす最低問題数
const MIN_JUDGED_ATTEMPTS = 20;

  const BLOCK_CATEGORY_KEYS = new Set([
    "study",
    "quiz_enja",
    "quiz_jaen",
    "audio_quiz",
    "accent",
    "sentence"
  ]);

  const BEGINNER_FLOW = [
  "study",
  "quiz_enja",
  "quiz_jaen",
  "audio_quiz",
  "accent",
  "sentence"
];

const BEGINNER_THRESHOLDS = {
  study: 25,
  quiz_enja: 25,
  quiz_jaen: 25,
  audio_quiz: 25,
  accent: 25,
  sentence: 25
};

  const badge =
    document.getElementById("levelBadge");

  const passLineEl =
    document.getElementById("passLine");

  const rerollBtn =
    document.getElementById("reroll");

  const pickInfo =
    document.getElementById("pickInfo");

  const pickDetail =
    document.getElementById("pickDetail");

  const startPrimaryBtn =
    document.getElementById("startEnja");

  const altBtn1 =
    document.getElementById("startJaEn") ||
    document.getElementById("startJaen");

  const altBtn2 =
    document.getElementById("goStudy");

  const goProgressBtn =
    document.getElementById("goProgress");

  const growInfo =
    document.getElementById("growInfo");

  const growDetail =
    document.getElementById("growDetail");

  const startGrowBtn =
    document.getElementById("startGrow");

  let currentPrimaryPlan = null;
  let currentGrowPlan = null;
  let rerollIndex = 0;


  // ============================================================
  // 基本
  // ============================================================

  function getLevel() {
    return String(
      localStorage.getItem(LEVEL_KEY) ||
      "1"
    );
  }


  function getActiveDataset() {
    const lv = getLevel();

    window.ACTIVE_LEVEL = lv;

    if (lv === "2") {
      window.WORDS =
        window.WORDS_2KYU || [];

      window.BLOCKS =
        window.BLOCKS_2KYU || [];
    } else {
      window.WORDS =
        window.WORDS_1KYU || [];

      window.BLOCKS =
        window.BLOCKS_1KYU || [];
    }

    return {
      lv,
      words: window.WORDS || [],
      blocks: window.BLOCKS || []
    };
  }


  function safeParse(key) {
    const raw =
      localStorage.getItem(key);

    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }


  function pct(correct, attempted) {
    if (!attempted || attempted <= 0) {
      return null;
    }

    return Math.round(
      (correct / attempted) * 100
    );
  }


  function globalKey(lv) {
    return `zensho_block_global_lv${lv}_v1`;
  }


  function loadGlobal(lv) {
    const obj =
      safeParse(globalKey(lv));

    if (
      obj &&
      typeof obj === "object" &&
      obj.byBlock &&
      typeof obj.byBlock === "object"
    ) {
      return obj;
    }

    return {
      byBlock: {}
    };
  }


  // ============================================================
  // カテゴリ
  // ============================================================

  function getCategories(level) {
    if (
      !window.LearningCategories ||
      typeof window.LearningCategories
        .getRecommendationCategories !== "function"
    ) {
      return [];
    }

    return window.LearningCategories
      .getRecommendationCategories(level);
  }


  function getCategory(key) {
    if (
      window.LearningCategories &&
      typeof window.LearningCategories
        .getCategory === "function"
    ) {
      return window.LearningCategories
        .getCategory(key);
    }

    return null;
  }


  function categoryLabel(key) {
    const category =
      getCategory(key);

    return (
      category?.label ||
      category?.shortLabel ||
      key
    );
  }


  // ============================================================
  // learning_log
  // ============================================================

  function getRecentSummary(
    level,
    days = 30
  ) {
    if (
      !window.ZenshoLearningLog ||
      typeof window.ZenshoLearningLog
        .getSummary !== "function"
    ) {
      return {
        byCategory: {}
      };
    }

    return window.ZenshoLearningLog
      .getSummary(days, level);
  }


  function getDaysSinceLastStudy(
    category,
    level
  ) {
    if (
      !window.ZenshoLearningLog ||
      typeof window.ZenshoLearningLog
        .getDaysSinceLastStudy !== "function"
    ) {
      return null;
    }

    return window.ZenshoLearningLog
      .getDaysSinceLastStudy(
        category,
        level
      );
  }


  // ============================================================
  // Block記録
  // ============================================================

  function getBlockRecord(
    rec,
    category
  ) {
    const map = {
      study: {
        attempted:
          Number(rec.studyDone || 0),

        correct: 0,

        accuracy: null
      },

      quiz_enja: {
        attempted:
          Number(rec.quizAttempted || 0),

        correct:
          Number(rec.quizCorrect || 0),

        accuracy:
          pct(
            Number(rec.quizCorrect || 0),
            Number(rec.quizAttempted || 0)
          )
      },

      quiz_jaen: {
        attempted:
          Number(
            rec.quizAttemptedJaEn || 0
          ),

        correct:
          Number(
            rec.quizCorrectJaEn || 0
          ),

        accuracy:
          pct(
            Number(
              rec.quizCorrectJaEn || 0
            ),
            Number(
              rec.quizAttemptedJaEn || 0
            )
          )
      },

      accent: {
        attempted:
          Number(
            rec.accentAttempted || 0
          ),

        correct:
          Number(
            rec.accentCorrect || 0
          ),

        accuracy:
          pct(
            Number(
              rec.accentCorrect || 0
            ),
            Number(
              rec.accentAttempted || 0
            )
          )
      },

      sentence: {
        attempted:
          Number(
            rec.sentenceAttempted || 0
          ),

        correct:
          Number(
            rec.sentenceCorrect || 0
          ),

        accuracy:
          pct(
            Number(
              rec.sentenceCorrect || 0
            ),
            Number(
              rec.sentenceAttempted || 0
            )
          )
      },

      audio_quiz: {
        attempted:
          Number(
            rec.audioAttempted || 0
          ),

        correct:
          Number(
            rec.audioCorrect || 0
          ),

        accuracy:
          pct(
            Number(
              rec.audioCorrect || 0
            ),
            Number(
              rec.audioAttempted || 0
            )
          )
      }
    };

    return (
      map[category] || {
        attempted: 0,
        correct: 0,
        accuracy: null
      }
    );
  }


  // ============================================================
  // 合格向け優先度
  // ============================================================

 function performancePriority(
  attempted,
  accuracy,
  passLine,
  daysSince,
  judgedAttempts = attempted
) {
  const totalAttempted =
    Number(attempted || 0);

  const judged =
    Number(judgedAttempts || 0);

  let priority = 0;

  // --------------------------------
  // ① 未挑戦
  // --------------------------------

  if (totalAttempted <= 0) {
    priority = 120;
  }

  // --------------------------------
  // ② 正誤判定が20問未満
  // --------------------------------

  else if (
    judged <
    MIN_JUDGED_ATTEMPTS
  ) {
    /*
     * 判断材料がまだ少ない。
     * 少ないほど優先度を少し高くする。
     */
    priority =
      100 +
      (
        MIN_JUDGED_ATTEMPTS -
        judged
      );
  }

  // --------------------------------
  // ③ 20問以上・目安未満
  // --------------------------------

  else if (
    accuracy !== null &&
    accuracy < passLine
  ) {
    priority =
      80 +
      Math.min(
        40,
        passLine - accuracy
      );
  }

  // --------------------------------
  // ④ 20問以上・目安クリア
  // --------------------------------

  else {
    priority = 25;
  }

  // 最近取り組んでいないものを少し上げる
  if (daysSince === null) {
    priority += 8;
  } else {
    priority += Math.min(
      20,
      daysSince
    );
  }

  return priority;
}


  function buildBlockCandidate(
    category,
    blocks,
    globalData,
    passLine,
    level
  ) {
    let best = null;

    const daysSince =
      getDaysSinceLastStudy(
        category.key,
        level
      );

    blocks.forEach(block => {
      const rec =
        globalData.byBlock[
          String(block.id)
        ] || {};

      const info =
        getBlockRecord(
          rec,
          category.key
        );

      let priority;

      if (category.key === "study") {
        priority =
          info.attempted <= 0
            ? 98
            : Math.max(
                20,
                65 -
                Math.min(
                  info.attempted,
                  30
                )
              );

        if (daysSince !== null) {
          priority += Math.min(
            daysSince,
            15
          );
        }
      } else {
        priority =
          performancePriority(
            info.attempted,
            info.accuracy,
            passLine,
            daysSince
          );
      }

      if (
        !best ||
        priority > best.priority
      ) {
        best = {
          category,
          block,
          start:
            Number(block.start),

          end:
            Number(block.end),

          attempted:
            info.attempted,

          accuracy:
            info.accuracy,

          priority
        };
      }
    });

    return best;
  }


  function buildGeneralCandidate(
    category,
    recentSummary,
    passLine,
    level
  ) {
    const slot =
      recentSummary
        .byCategory?.[
          category.key
        ] || {
          attempt: 0,
          correct: 0,
          wrong: 0,
          accuracy: null
        };

    const daysSince =
      getDaysSinceLastStudy(
        category.key,
        level
      );

    const judgedAttempts =
  Number(slot.correct || 0) +
  Number(slot.wrong || 0);

const priority =
  performancePriority(
    Number(slot.attempt || 0),
    slot.accuracy,
    passLine,
    daysSince,
    judgedAttempts
  );

    return {
  category,
  block: null,
  start: null,
  end: null,

  attempted:
    Number(slot.attempt || 0),

  judgedAttempts,

  accuracy:
    slot.accuracy,

  daysSince,
  priority
};
  }

function getBeginnerFlowCandidate(
  level,
  blocks,
  globalData,
  passLine
) {
  /*
   * 初期導線は、
   * 「最近勉強したか」ではなく
   * 「各基本学習を一度体験したか」
   * で判定する。
   *
   * Block進捗は累計保存なので、
   * 久しぶりに戻ってきても
   * 初心者導線へ戻らない。
   */

  for (
    const categoryKey of
    BEGINNER_FLOW
  ) {
    const category =
      getCategory(
        categoryKey
      );

    if (!category) {
      continue;
    }

    // 現在の級で使えないカテゴリは飛ばす
    if (
      Array.isArray(
        category.levels
      ) &&
      !category.levels.includes(
        String(level)
      )
    ) {
      continue;
    }

    const threshold =
      Number(
        BEGINNER_THRESHOLDS[
          categoryKey
        ] || 0
      );

    let totalAttempted = 0;

    /*
     * 全Blockの累計を合計する。
     *
     * 例：
     * Block1で3問
     * Block2で2問
     * → 英→日を5問経験済み
     */
    blocks.forEach(block => {
      const rec =
        globalData.byBlock[
          String(block.id)
        ] || {};

      const info =
        getBlockRecord(
          rec,
          categoryKey
        );

      totalAttempted +=
        Number(
          info.attempted || 0
        );
    });

    // 必要な初回体験数を満たしていれば次へ
    if (
      totalAttempted >=
      threshold
    ) {
      continue;
    }

    /*
     * このカテゴリをまだ十分に
     * 体験していないのでおすすめする。
     */
    const candidate =
      buildBlockCandidate(
        category,
        blocks,
        globalData,
        passLine,
        level
      );

    if (!candidate) {
      continue;
    }

    return {
      ...candidate,

      beginnerFlow: true,

      beginnerCurrent:
        totalAttempted,

      beginnerTarget:
        threshold
    };
  }

  /*
   * すべての基本学習を
   * 一度体験していれば初期導線終了。
   */
  return null;
}


  function buildPrimaryCandidates() {
    const {
      lv,
      blocks
    } =
      getActiveDataset();

    const passLine =
      Number(
        passLineEl?.value || 80
      );

    const categories =
      getCategories(lv);

    const globalData =
      loadGlobal(lv);

    const recentSummary =
      getRecentSummary(
        lv,
        30
      );

    const result = [];

    categories.forEach(category => {
      if (
        BLOCK_CATEGORY_KEYS.has(
          category.key
        )
      ) {
        const candidate =
          buildBlockCandidate(
            category,
            blocks,
            globalData,
            passLine,
            lv
          );

        if (candidate) {
          result.push(candidate);
        }
      } else {
        result.push(
          buildGeneralCandidate(
            category,
            recentSummary,
            passLine,
            lv
          )
        );
      }
    });

    return result.sort(
      (a, b) =>
        b.priority -
        a.priority
    );
  }


  // ============================================================
  // URL
  // ============================================================

  function buildActionUrl(
    candidate
  ) {
    const category =
      candidate.category;

    if (!category) {
      return "index.html";
    }

    const page =
      category.page ||
      "index.html";

    if (
      candidate.start == null ||
      candidate.end == null
    ) {
      return page;
    }

    const s =
      Number(candidate.start);

    const e =
      Number(candidate.end);

    if (
      category.key ===
      "quiz_enja"
    ) {
      return (
        `${page}?start=${s}&end=${e}` +
        `&mode=weak&weak=1&autostart=1`
      );
    }

    if (
      category.key ===
      "quiz_jaen"
    ) {
      return (
        `${page}?start=${s}&end=${e}` +
        `&mode=weak&weak=1&autostart=1`
      );
    }

    if (
      category.key ===
      "audio_quiz"
    ) {
      return (
        `${page}?start=${s}&end=${e}` +
        `&mode=weak&weak=1&autostart=1`
      );
    }

    return (
      `${page}?start=${s}&end=${e}`
    );
  }


  // ============================================================
  // 合格向け表示
  // ============================================================

  function candidateReason(
  candidate,
  passLine
) {
  if (!candidate) {
    return "";
  }

  // ============================================================
  // 初期導線用
  // ============================================================

  const beginnerRemaining =
    Math.max(
      0,
      Number(
        candidate.beginnerTarget || 0
      ) -
      Number(
        candidate.beginnerCurrent || 0
      )
    );

  const beginnerProgressText =
    beginnerRemaining > 0
      ? ` あと${beginnerRemaining}問ほど取り組めば、次の学習へ進みます。`
      : "";

  if (candidate.beginnerFlow) {

    if (
      candidate.category.key ===
      "study"
    ) {
      return (
        "学習を始めたばかりなので、まず単語の意味を確認して土台を作る段階です。" +
        beginnerProgressText
      );
    }

    if (
      candidate.category.key ===
      "quiz_enja"
    ) {
      return (
        "単語の意味を見たあとに、英語を見て意味を思い出せるか確認する段階です。" +
        beginnerProgressText
      );
    }

    if (
      candidate.category.key ===
      "quiz_jaen"
    ) {
      return (
        "意味を理解できるようになってきたので、日本語から英語を思い出す練習へ進みます。" +
        beginnerProgressText
      );
    }

    if (
      candidate.category.key ===
      "audio_quiz"
    ) {
      return (
        "意味と単語の対応に慣れてきたので、今度は音を聞いて意味につなげる練習です。" +
        beginnerProgressText
      );
    }

    if (
      candidate.category.key ===
      "accent"
    ) {
      return (
        "単語の意味と音に触れてきたので、アクセントにも学習を広げる段階です。" +
        beginnerProgressText
      );
    }

    if (
      candidate.category.key ===
      "sentence"
    ) {
      return (
        "単語単体の練習から、文の中で意味や使い方を判断する練習へ進みます。" +
        beginnerProgressText
      );
    }
  }

  // ============================================================
  // 通常おすすめ
  // ============================================================

  if (
    candidate.category.key ===
    "study"
  ) {
    if (
      candidate.attempted <= 0
    ) {
      return (
        "まだこの範囲の暗記記録がないため、" +
        "まず意味を確認する候補にしました。"
      );
    }

    return (
      "単語の土台をもう一度確認してから、" +
      "問題演習につなげる候補です。"
    );
  }

  if (
    candidate.attempted <= 0
  ) {
    return (
      "まだ十分な学習記録がないため、" +
      "一度取り組んで現在の状態を確認する候補です。"
    );
  }

  const judgedAttempts =
    candidate.judgedAttempts ??
    candidate.attempted;

  if (
    Number(judgedAttempts || 0) <
    MIN_JUDGED_ATTEMPTS
  ) {
    const remaining =
      Math.max(
        0,
        MIN_JUDGED_ATTEMPTS -
          Number(
            judgedAttempts || 0
          )
      );

    return (
      `まだ正誤を判断できる問題が${judgedAttempts}問分のため、` +
      `まずはあと${remaining}問ほど取り組んで学習記録を増やす候補です。`
    );
  }

  if (
    candidate.accuracy !== null &&
    candidate.accuracy <
      passLine
  ) {
    return (
      `最近の正答率が ${candidate.accuracy}% で、` +
      `設定した目安 ${passLine}% を下回っています。`
    );
  }

  return (
    "目安には達していますが、" +
    "最近の学習状況を踏まえて復習候補にしています。"
  );
}

  function buildPrimaryPlan() {
  const {
    lv,
    blocks
  } =
    getActiveDataset();

  const passLine =
    Number(
      passLineEl?.value || 80
    );

  // 通常おすすめ候補を先に作る
  const candidates =
    buildPrimaryCandidates();

  if (!candidates.length) {
    return {
      error:
        "おすすめ候補を作れませんでした。"
    };
  }

  const globalData =
    loadGlobal(lv);

  const recentSummary =
    getRecentSummary(
      lv,
      30
    );

  // ============================================================
  // 初期学習者向け導線
  // ============================================================

  const beginnerCandidate =
  getBeginnerFlowCandidate(
    lv,
    blocks,
    globalData,
    passLine
  );

  if (beginnerCandidate) {
    const alternatives =
      candidates
        .filter(
          item =>
            item.category.key !==
            beginnerCandidate.category.key
        )
        .slice(0, 2);

    return {
      lv,
      picked:
        beginnerCandidate,
      alternatives,
      passLine,
      beginnerFlow: true
    };
  }

  // ============================================================
  // 通常おすすめ
  // ============================================================

  const index =
    rerollIndex %
    candidates.length;

  const picked =
    candidates[index];

  const alternatives =
    candidates
      .filter(
        item =>
          item !== picked
      )
      .slice(0, 2);

  return {
    lv,
    picked,
    alternatives,
    passLine,
    beginnerFlow: false
  };
}


  function renderPrimaryPlan(plan) {
    if (!plan || plan.error) {
      pickInfo.textContent =
        plan?.error ||
        "おすすめを表示できませんでした。";

      pickDetail.textContent = "";

      return;
    }

    const c =
      plan.picked;

    const label =
      c.category.label;

    badge.textContent =
      `現在：全商英検 ${plan.lv}級`;

   pickInfo.textContent =
  plan.beginnerFlow
    ? `まずは「${label}」から始めよう`
    : `今日は「${label}」から始めよう`;

    const place =
      c.block
        ? `Block ${c.block.id}（${c.start}〜${c.end}）`
        : "級全体";

    const result =
      c.accuracy === null
        ? (
            c.attempted > 0
              ? `${c.attempted}回取り組み`
              : "まだ記録なし"
          )
        : `${c.accuracy}%`;

    pickDetail.textContent =
      [
        `おすすめ範囲：${place}`,
        `現在の記録：${result}`,
        "",
        candidateReason(
          c,
          plan.passLine
        ),
        "",
        "※「目安クリア」は合格や定着を保証するものではなく、学習を進めるための目安です。"
      ].join("\n");

    currentPrimaryPlan =
      c;

    if (startPrimaryBtn) {
      startPrimaryBtn.disabled =
        false;

      startPrimaryBtn.textContent =
        `このおすすめで始める（${c.category.shortLabel || label}）`;
    }

    const alt1 =
      plan.alternatives[0];

    const alt2 =
      plan.alternatives[1];

    if (altBtn1) {
      altBtn1.disabled =
        !alt1;

      altBtn1.textContent =
        alt1
          ? `別候補：${alt1.category.shortLabel || alt1.category.label}`
          : "別候補なし";

      altBtn1.dataset.url =
        alt1
          ? buildActionUrl(alt1)
          : "";
    }

    if (altBtn2) {
      altBtn2.disabled =
        !alt2;

      altBtn2.textContent =
        alt2
          ? `別候補：${alt2.category.shortLabel || alt2.category.label}`
          : "別候補なし";

      altBtn2.dataset.url =
        alt2
          ? buildActionUrl(alt2)
          : "";
    }
  }


  // ============================================================
  // ゴイモン育成おすすめ
  // ============================================================

  function getGoimon() {
    if (
      !window.GoimonUI ||
      typeof window.GoimonUI
        .loadCurrent !== "function"
    ) {
      return null;
    }

    try {
      return window.GoimonUI
        .loadCurrent();
    } catch {
      return null;
    }
  }


  function getLowestAbility(goimon) {
    const stats =
      goimon?.stats;

    if (!stats) {
      return null;
    }

    const entries = [
      ["chie", Number(stats.chie || 0)],
      ["kotoba", Number(stats.kotoba || 0)],
      ["onkan", Number(stats.onkan || 0)],
      ["bunmyaku", Number(stats.bunmyaku || 0)]
    ];

    entries.sort(
      (a, b) =>
        a[1] - b[1]
    );

    return entries[0]?.[0] ||
      null;
  }


  function abilityLabel(key) {
    if (
      window.LearningCategories &&
      typeof window.LearningCategories
        .getAbility === "function"
    ) {
      return (
        window.LearningCategories
          .getAbility(key)?.label ||
        key
      );
    }

    return key;
  }


  function buildGrowthPlan() {
    const {
      lv,
      blocks
    } =
      getActiveDataset();

    const goimon =
      getGoimon();

    if (!goimon) {
      return {
        error:
          "ゴイモン情報を読み込めませんでした。"
      };
    }

    const ability =
      getLowestAbility(goimon);

    if (!ability) {
      return {
        error:
          "育成おすすめを作れませんでした。"
      };
    }

    const categories =
      getCategories(lv)
        .filter(category => {
          return (
            Number(
              category.abilities?.[
                ability
              ] || 0
            ) > 0
          );
        })
        .sort((a, b) => {
          return (
            Number(
              b.abilities?.[
                ability
              ] || 0
            ) -
            Number(
              a.abilities?.[
                ability
              ] || 0
            )
          );
        });

    if (!categories.length) {
      return {
        error:
          "この能力に対応する学習がありません。"
      };
    }

    const category =
      categories[0];

    let candidate = {
      category,
      block: null,
      start: null,
      end: null
    };

    if (
      BLOCK_CATEGORY_KEYS.has(
        category.key
      ) &&
      blocks.length
    ) {
      const globalData =
        loadGlobal(lv);

      const blockCandidate =
        buildBlockCandidate(
          category,
          blocks,
          globalData,
          80,
          lv
        );

      if (blockCandidate) {
        candidate =
          blockCandidate;
      }
    }

    return {
      ability,
      abilityLabel:
        abilityLabel(ability),

      category,
      candidate
    };
  }


  function renderGrowthPlan(plan) {
    if (
      !growInfo ||
      !growDetail
    ) {
      return;
    }

    if (
      !plan ||
      plan.error
    ) {
      growInfo.textContent =
        plan?.error ||
        "育成おすすめを表示できませんでした。";

      growDetail.textContent =
        "";

      if (startGrowBtn) {
        startGrowBtn.disabled =
          true;
      }

      return;
    }

    const label =
      plan.category.label;

    growInfo.textContent =
  `育て方を広げるなら「${label}」`;

    const place =
      plan.candidate.block
        ? `Block ${plan.candidate.block.id}（${plan.candidate.start}〜${plan.candidate.end}）`
        : "級全体";

   growDetail.textContent =
  [
    `次に育てる候補：${plan.abilityLabel}`,
    `おすすめ学習：${label}`,
    `おすすめ範囲：${place}`,
    "",
    "これは英語力の弱点判定ではなく、現在のゴイモンの育ち方とは違う方向も試すための育成候補です。"
  ].join("\n");

    currentGrowPlan =
      plan.candidate;

    if (startGrowBtn) {
      startGrowBtn.disabled =
        false;

      startGrowBtn.textContent =
  `「${plan.category.shortLabel || label}」で育て方を広げる`;
    }
  }


  // ============================================================
  // 描画
  // ============================================================

  function renderAll(
    resetIndex = false
  ) {
    if (resetIndex) {
      rerollIndex = 0;
    }

    renderPrimaryPlan(
      buildPrimaryPlan()
    );

    renderGrowthPlan(
      buildGrowthPlan()
    );
  }


  // ============================================================
  // イベント
  // ============================================================

  if (startPrimaryBtn) {
    startPrimaryBtn
      .addEventListener(
        "click",
        () => {
          if (
            !currentPrimaryPlan
          ) {
            return;
          }

          location.href =
            buildActionUrl(
              currentPrimaryPlan
            );
        }
      );
  }


  if (altBtn1) {
    altBtn1.addEventListener(
      "click",
      () => {
        const url =
          altBtn1.dataset.url;

        if (url) {
          location.href = url;
        }
      }
    );
  }


  if (altBtn2) {
    altBtn2.addEventListener(
      "click",
      () => {
        const url =
          altBtn2.dataset.url;

        if (url) {
          location.href = url;
        }
      }
    );
  }


  if (startGrowBtn) {
    startGrowBtn
      .addEventListener(
        "click",
        () => {
          if (!currentGrowPlan) {
            return;
          }

          location.href =
            buildActionUrl(
              currentGrowPlan
            );
        }
      );
  }


  if (goProgressBtn) {
    goProgressBtn
      .addEventListener(
        "click",
        () => {
          location.href =
            "progress.html";
        }
      );
  }


  if (rerollBtn) {
    rerollBtn
      .addEventListener(
        "click",
        () => {
          rerollIndex += 1;
          renderAll(false);
        }
      );
  }


  if (passLineEl) {
    passLineEl
      .addEventListener(
        "change",
        () => {
          renderAll(true);
        }
      );
  }


  renderAll(true);
});
