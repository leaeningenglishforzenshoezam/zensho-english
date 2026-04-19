document.addEventListener("DOMContentLoaded", () => {
  const LEVEL_KEY = "zensho_level_v1";

  const badge = document.getElementById("levelBadge");
  const passLineEl = document.getElementById("passLine");
  const rerollBtn = document.getElementById("reroll");

  const pickInfo = document.getElementById("pickInfo");
  const pickDetail = document.getElementById("pickDetail");

  const startPrimaryBtn = document.getElementById("startEnja");
  const altBtn1 = document.getElementById("startJaEn") || document.getElementById("startJaen");
  const altBtn2 = document.getElementById("goStudy");
  const goProgressBtn = document.getElementById("goProgress");

  let currentPlan = null;
  let rerollIndex = 0;

  function getLevel() {
    return localStorage.getItem(LEVEL_KEY) || "1";
  }

  function getActiveDataset() {
    const lv = getLevel();
    window.ACTIVE_LEVEL = lv;

    if (lv === "2") {
      window.WORDS = window.WORDS_2KYU || window.WORDS || [];
      window.BLOCKS = window.BLOCKS_2KYU || window.BLOCKS || [];
    } else {
      window.WORDS = window.WORDS_1KYU || window.WORDS || [];
      window.BLOCKS = window.BLOCKS_1KYU || window.BLOCKS || [];
    }

    return {
      lv,
      words: window.WORDS || [],
      blocks: window.BLOCKS || []
    };
  }

  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function keyFor(base) {
    return `${base}_lv${getLevel()}`;
  }

  function globalKey(lv) {
    return `zensho_block_global_lv${lv}_v1`;
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function dateKeyByOffset(offset) {
    const d = new Date();
    d.setDate(d.getDate() - offset);
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  }

  function pct(correct, attempted) {
    if (!attempted || attempted <= 0) return null;
    return Math.round((correct / attempted) * 100);
  }

  function categoryLabel(category) {
    switch (category) {
      case "study": return "覚える（暗記）";
      case "quiz_enja": return "クイズで確認（英→日）";
      case "quiz_jaen": return "クイズで確認（日→英）";
      case "accent": return "大問1演習（アクセント）";
      case "sentence": return "大問9演習（例文穴埋め）";
      case "audio_quiz": return "音声→意味クイズ";
      default: return "学習";
    }
  }

  function themeLabel(themeKey) {
    switch (themeKey) {
      case "balance": return "バランスよく育てよう";
      case "chie_focus": return "ちえを伸ばそう";
      case "kotoba_focus": return "ことばを伸ばそう";
      case "onkan_focus": return "おんかんを伸ばそう";
      case "bunmyaku_focus": return "ぶんみゃくを伸ばそう";
      default: return "今日のおすすめ";
    }
  }

  function loadGlobal(lv) {
    const obj = safeParse(globalKey(lv));
    if (obj && typeof obj === "object" && obj.byBlock && typeof obj.byBlock === "object") {
      return obj;
    }
    return { byBlock: {} };
  }

  function readLog() {
    const obj = safeParse(keyFor("zensho_learning_log_v1"));
    return (obj && typeof obj === "object") ? obj : {};
  }

  function getLearningHistorySummary(days = 7) {
    const logObj = readLog();
    const summary = {
      study: 0,
      quiz_enja: 0,
      quiz_jaen: 0,
      accent: 0,
      sentence: 0,
      audio_quiz: 0
    };

    for (let i = 0; i < days; i++) {
      const key = dateKeyByOffset(i);
      const day = logObj[key];
      if (!day || typeof day !== "object") continue;

      summary.study += Number(day.study?.attempt || 0);
      summary.quiz_enja += Number(day.quiz_enja?.attempt || 0);
      summary.quiz_jaen += Number(day.quiz_jaen?.attempt || 0);
      summary.accent += Number(day.accent?.attempt || 0);
      summary.sentence += Number(day.sentence?.attempt || 0);
      summary.audio_quiz += Number(day.audio_quiz?.attempt || 0);
    }

    return summary;
  }

  function getGoimonSummary() {
    const fallback = {
      totalPoints: 0,
      stage: "egg",
      type: "nagomi",
      name: "なごみ系のたまご",
      stats: { chie: 0, kotoba: 0, onkan: 0, bunmyaku: 0 },
      remainToNextEvolution: 100
    };

    if (!window.GoimonUI || typeof window.GoimonUI.ensureCurrent !== "function") {
      return fallback;
    }

    const g = window.GoimonUI.ensureCurrent();
    if (!g) return fallback;

    const thresholds = {
      egg: 100,
      child: 300,
      growth: 600,
      mid: 900
    };

    let remain = 0;
    if (g.stage === "final") {
      remain = 0;
    } else {
      const target = thresholds[g.stage] || 100;
      remain = Math.max(0, Number(target) - Number(g.totalPoints || 0));
    }

    return {
      totalPoints: Number(g.totalPoints || 0),
      stage: String(g.stage || "egg"),
      type: String(g.type || "nagomi"),
      name: typeof window.GoimonUI.getGoimonPrimaryName === "function"
        ? window.GoimonUI.getGoimonPrimaryName(g)
        : "ゴイモン",
      stats: {
        chie: Number(g.stats?.chie || 0),
        kotoba: Number(g.stats?.kotoba || 0),
        onkan: Number(g.stats?.onkan || 0),
        bunmyaku: Number(g.stats?.bunmyaku || 0)
      },
      remainToNextEvolution: remain
    };
  }

  function minStatKey(stats) {
    return Object.entries(stats).sort((a, b) => a[1] - b[1])[0][0];
  }

  function maxStatKey(stats) {
    return Object.entries(stats).sort((a, b) => b[1] - a[1])[0][0];
  }

  function statToTheme(statKey) {
    if (statKey === "chie") return "chie_focus";
    if (statKey === "kotoba") return "kotoba_focus";
    if (statKey === "onkan") return "onkan_focus";
    if (statKey === "bunmyaku") return "bunmyaku_focus";
    return "balance";
  }

  function decideRecommendationTheme(goimonSummary) {
    const stats = goimonSummary.stats;
    const values = Object.values(stats);
    const totalPoints = Number(goimonSummary.totalPoints || 0);
    const remain = Number(goimonSummary.remainToNextEvolution || 999);

    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;

    if (totalPoints < 40) {
      return {
        themeKey: "balance",
        themeLabel: themeLabel("balance"),
        reason: "序盤は広く触れて、土台を作るのがおすすめです。"
      };
    }

    if ((maxVal - minVal) <= 5) {
      return {
        themeKey: "balance",
        themeLabel: themeLabel("balance"),
        reason: "今は能力の偏りが小さいので、バランスよく進める流れです。"
      };
    }

    const lowestKey = minStatKey(stats);
    if (minVal <= (avg - 6)) {
      const key = statToTheme(lowestKey);
      return {
        themeKey: key,
        themeLabel: themeLabel(key),
        reason: "今は少し弱い力を補うと、全体が安定して伸びやすいです。"
      };
    }

    if (remain <= 10) {
      const highestKey = maxStatKey(stats);
      const key = statToTheme(highestKey);
      return {
        themeKey: key,
        themeLabel: themeLabel(key),
        reason: "進化が近いので、今の得意分野を押し伸ばすのがおすすめです。"
      };
    }

    const highestKey = maxStatKey(stats);
    const key = statToTheme(highestKey);
    return {
      themeKey: key,
      themeLabel: themeLabel(key),
      reason: "今の育ち方に合う学習を続けると、自然な流れで伸ばせます。"
    };
  }

  function sortCategoriesByHistory(history) {
    return Object.entries(history)
      .sort((a, b) => a[1] - b[1])
      .map(([key]) => key);
  }

  function getCategoryCandidates(themeKey, historySummary) {
    if (themeKey === "balance") {
      const sorted = sortCategoriesByHistory(historySummary);
      return {
        primaryCategory: sorted[0] || "study",
        fallbackCategories: sorted.slice(1)
      };
    }

    if (themeKey === "chie_focus") {
      return {
        primaryCategory: "quiz_enja",
        fallbackCategories: ["study", "audio_quiz"]
      };
    }

    if (themeKey === "kotoba_focus") {
      return {
        primaryCategory: "quiz_jaen",
        fallbackCategories: ["study", "quiz_enja"]
      };
    }

    if (themeKey === "onkan_focus") {
      return {
        primaryCategory: "audio_quiz",
        fallbackCategories: ["accent", "study"]
      };
    }

    if (themeKey === "bunmyaku_focus") {
      return {
        primaryCategory: "sentence",
        fallbackCategories: ["quiz_enja", "study"]
      };
    }

    return {
      primaryCategory: "study",
      fallbackCategories: ["quiz_enja", "quiz_jaen", "audio_quiz", "accent", "sentence"]
    };
  }

  function getBlockRecordByCategory(rec, category) {
    const studyDone = Number(rec.studyDone || 0);

    const map = {
      study: {
        attempted: studyDone,
        correct: studyDone,
        pct: studyDone > 0 ? 100 : null
      },
      quiz_enja: {
        attempted: Number(rec.quizAttempted || 0),
        correct: Number(rec.quizCorrect || 0),
        pct: pct(Number(rec.quizCorrect || 0), Number(rec.quizAttempted || 0))
      },
      quiz_jaen: {
        attempted: Number(rec.quizAttemptedJaEn || 0),
        correct: Number(rec.quizCorrectJaEn || 0),
        pct: pct(Number(rec.quizCorrectJaEn || 0), Number(rec.quizAttemptedJaEn || 0))
      },
      accent: {
        attempted: Number(rec.accentAttempted || 0),
        correct: Number(rec.accentCorrect || 0),
        pct: pct(Number(rec.accentCorrect || 0), Number(rec.accentAttempted || 0))
      },
      sentence: {
        attempted: Number(rec.sentenceAttempted || 0),
        correct: Number(rec.sentenceCorrect || 0),
        pct: pct(Number(rec.sentenceCorrect || 0), Number(rec.sentenceAttempted || 0))
      },
      audio_quiz: {
        attempted: Number(rec.audioAttempted || 0),
        correct: Number(rec.audioCorrect || 0),
        pct: pct(Number(rec.audioCorrect || 0), Number(rec.audioAttempted || 0))
      }
    };

    return map[category] || { attempted: 0, correct: 0, pct: null };
  }

  function makeCategoryDetail(rec) {
    const enjaPct = pct(Number(rec.quizCorrect || 0), Number(rec.quizAttempted || 0));
    const jaenPct = pct(Number(rec.quizCorrectJaEn || 0), Number(rec.quizAttemptedJaEn || 0));
    const accentPct = pct(Number(rec.accentCorrect || 0), Number(rec.accentAttempted || 0));
    const sentencePct = pct(Number(rec.sentenceCorrect || 0), Number(rec.sentenceAttempted || 0));
    const audioPct = pct(Number(rec.audioCorrect || 0), Number(rec.audioAttempted || 0));

    return [
      `暗記 ${Number(rec.studyDone || 0)}回`,
      `英→日 ${enjaPct === null ? "未挑戦" : `${enjaPct}%`}`,
      `日→英 ${jaenPct === null ? "未挑戦" : `${jaenPct}%`}`,
      `アクセント ${accentPct === null ? "未挑戦" : `${accentPct}%`}`,
      `大問9 ${sentencePct === null ? "未挑戦" : `${sentencePct}%`}`,
      `音声→意味 ${audioPct === null ? "未挑戦" : `${audioPct}%`}`
    ].join(" / ");
  }

  function pickBestBlockForCategory(category, blocks, globalData, passLine) {
    if (!Array.isArray(blocks) || !blocks.length) return null;

    let best = null;

    for (const b of blocks) {
      const id = String(b.id);
      const rec = globalData.byBlock[id] || {};
      const info = getBlockRecordByCategory(rec, category);

      let score = 0;
      let reason = "";

      if (!info.attempted) {
        score = -2000;
        reason = `${categoryLabel(category)} が未挑戦です。`;
      } else {
        const p = (info.pct === null ? 999 : info.pct);
        score = p;
        reason = `${categoryLabel(category)} の記録が弱めです。`;
      }

      if (info.pct !== null && info.pct >= passLine) {
        score += 5000;
      }

      const detail =
        `Block ${b.id}（${b.start}〜${b.end}）\n` +
        `記録：${makeCategoryDetail(rec)}\n` +
        `今回のおすすめ学習：${categoryLabel(category)}`;

      if (!best || score < best.score) {
        best = {
          score,
          block: b,
          reason,
          detail,
          category
        };
      }
    }

    if (!best) return null;

    return {
      category,
      block: best.block,
      start: Number(best.block.start),
      end: Number(best.block.end),
      reasonText: best.reason,
      detailText: best.detail
    };
  }

  function buildActionUrl(category, start, end) {
    const s = Number(start);
    const e = Number(end);

    if (category === "study") return `study.html?start=${s}&end=${e}`;
    if (category === "quiz_enja") return `quiz.html?start=${s}&end=${e}&mode=weak&weak=1&autostart=1`;
    if (category === "quiz_jaen") return `quiz_jaen.html?start=${s}&end=${e}&mode=weak&weak=1&autostart=1`;
    if (category === "accent") return `accent.html?start=${s}&end=${e}`;
    if (category === "sentence") return `sentence.html?start=${s}&end=${e}`;
    if (category === "audio_quiz") return `audio_quiz.html?start=${s}&end=${e}&mode=weak&weak=1&autostart=1`;
    return `study.html?start=${s}&end=${e}`;
  }

  function getAltActions(plan) {
    const s = Number(plan.start);
    const e = Number(plan.end);

    if (plan.category === "quiz_enja") {
      return [
        {
          label: "別候補：日→英で始める",
          url: `quiz_jaen.html?start=${s}&end=${e}&mode=weak&weak=1&autostart=1`
        },
        {
          label: "別候補：暗記から始める",
          url: `study.html?start=${s}&end=${e}`
        }
      ];
    }

    if (plan.category === "quiz_jaen") {
      return [
        {
          label: "別候補：英→日で始める",
          url: `quiz.html?start=${s}&end=${e}&mode=weak&weak=1&autostart=1`
        },
        {
          label: "別候補：暗記から始める",
          url: `study.html?start=${s}&end=${e}`
        }
      ];
    }

    if (plan.category === "audio_quiz") {
      return [
        {
          label: "別候補：アクセントで始める",
          url: `accent.html?start=${s}&end=${e}`
        },
        {
          label: "別候補：暗記から始める",
          url: `study.html?start=${s}&end=${e}`
        }
      ];
    }

    if (plan.category === "accent") {
      return [
        {
          label: "別候補：音声→意味で始める",
          url: `audio_quiz.html?start=${s}&end=${e}&mode=weak&weak=1&autostart=1`
        },
        {
          label: "別候補：暗記から始める",
          url: `study.html?start=${s}&end=${e}`
        }
      ];
    }

    if (plan.category === "sentence") {
      return [
        {
          label: "別候補：英→日で始める",
          url: `quiz.html?start=${s}&end=${e}&mode=weak&weak=1&autostart=1`
        },
        {
          label: "別候補：大問11風を開く",
          url: `paraphrase_quiz.html`
        }
      ];
    }

    return [
      {
        label: "別候補：英→日で始める",
        url: `quiz.html?start=${s}&end=${e}&mode=weak&weak=1&autostart=1`
      },
      {
        label: "別候補：日→英で始める",
        url: `quiz_jaen.html?start=${s}&end=${e}&mode=weak&weak=1&autostart=1`
      }
    ];
  }

  function buildRecommendedPlan() {
    const { lv, words, blocks } = getActiveDataset();
    const globalData = loadGlobal(lv);
    const passLine = Number(passLineEl?.value || 80);
    const goimonSummary = getGoimonSummary();
    const historySummary = getLearningHistorySummary(7);

    if (!blocks.length) {
      return { error: "BLOCKS が見つかりません。読み込みを確認してください。" };
    }

    const theme = decideRecommendationTheme(goimonSummary);
    const categoryCandidates = getCategoryCandidates(theme.themeKey, historySummary);

    const tryCategories = [
      categoryCandidates.primaryCategory,
      ...(categoryCandidates.fallbackCategories || [])
    ].filter(Boolean);

    const candidatePlans = tryCategories
      .map(category => pickBestBlockForCategory(category, blocks, globalData, passLine))
      .filter(Boolean);

    if (!candidatePlans.length) {
      return { error: "おすすめ候補を選べませんでした。" };
    }

    const picked = candidatePlans[rerollIndex % candidatePlans.length];
    const altActions = getAltActions(picked);

    return {
      lv,
      wordsCount: words.length,
      blockCount: blocks.length,
      goimonName: goimonSummary.name,
      themeKey: theme.themeKey,
      themeLabel: theme.themeLabel,
      themeReason: theme.reason,
      category: picked.category,
      categoryLabel: categoryLabel(picked.category),
      block: picked.block,
      start: picked.start,
      end: picked.end,
      pickReason: picked.reasonText,
      pickDetail: picked.detailText,
      actionUrl: buildActionUrl(picked.category, picked.start, picked.end),
      altActions
    };
  }

  function renderPlan(plan) {
    if (!badge || !pickInfo || !pickDetail) return;

    if (plan.error) {
      badge.textContent = "おすすめを表示できませんでした";
      pickInfo.textContent = plan.error;
      pickDetail.textContent = "";
      if (startPrimaryBtn) startPrimaryBtn.disabled = true;
      if (altBtn1) altBtn1.disabled = true;
      if (altBtn2) altBtn2.disabled = true;
      return;
    }

    badge.textContent = `現在：全商英検 ${plan.lv}級`;

    pickInfo.textContent = `今日は「${plan.categoryLabel}」から始めよう`;

    pickDetail.textContent = [
      `ゴイモン：${plan.goimonName}`,
      `今日のテーマ：${plan.themeLabel}`,
      `おすすめ範囲：Block ${plan.block.id}（${plan.start}〜${plan.end}）`,
      `おすすめ理由：${plan.themeReason}`,
      `このBlockを選んだ理由：${plan.pickReason}`,
      ``,
      `${plan.pickDetail}`
    ].join("\n");

    if (startPrimaryBtn) {
      startPrimaryBtn.disabled = false;
      startPrimaryBtn.textContent = `このおすすめで始める（${plan.categoryLabel}）`;
    }

    if (altBtn1) {
      altBtn1.disabled = false;
      altBtn1.textContent = plan.altActions[0]?.label || "別候補";
    }

    if (altBtn2) {
      altBtn2.disabled = false;
      altBtn2.textContent = plan.altActions[1]?.label || "別候補";
    }
  }

  function openPrimaryRecommendation() {
    if (!currentPlan) return;
    location.href = currentPlan.actionUrl;
  }

  function openAlternative1() {
    if (!currentPlan || !currentPlan.altActions?.[0]) return;
    location.href = currentPlan.altActions[0].url;
  }

  function openAlternative2() {
    if (!currentPlan || !currentPlan.altActions?.[1]) return;
    location.href = currentPlan.altActions[1].url;
  }

  function rerender(resetIndex = false) {
    if (resetIndex) {
      rerollIndex = 0;
    }
    currentPlan = buildRecommendedPlan();
    renderPlan(currentPlan);
  }

  if (startPrimaryBtn) {
    startPrimaryBtn.addEventListener("click", openPrimaryRecommendation);
  }

  if (altBtn1) {
    altBtn1.addEventListener("click", openAlternative1);
  }

  if (altBtn2) {
    altBtn2.addEventListener("click", openAlternative2);
  }

  if (goProgressBtn) {
    goProgressBtn.addEventListener("click", () => {
      location.href = "progress.html";
    });
  }

  if (rerollBtn) {
    rerollBtn.addEventListener("click", () => {
      rerollIndex += 1;
      rerender(false);
    });
  }

  if (passLineEl) {
    passLineEl.addEventListener("change", () => {
      rerender(true);
    });
  }

  rerender(true);
});
