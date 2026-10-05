// goimon_rules.js

// ゴイモンの分岐条件・解放条件・図鑑ヒント管理

// 各進化段階ごとに、その時点の能力比率で毎回分岐を再判定する



window.GOIMON_RULES = {

  stageThresholds: {

    child: 100,

    growth: 300,

    mid: 600,

    final: 900

  },



  specialRoutes: {

    mr_uno: {

      secret: true,

      unlock: {

        distinctFinalTypes: 5

      }

    }

  },



  branches: [

    {

      type: "mr_uno",

      priority: 100,

      conditions: [

        { kind: "specialRouteIs", value: "mr_uno" }

      ]

    },



    {

      type: "hibiki",

      priority: 80,

      conditions: [

        { kind: "ratioGte", stat: "chie", value: 0.3 },

        { kind: "ratioGte", stat: "onkan", value: 0.3 }

      ]

    },



    {

      type: "kotonoha",

      priority: 80,

      conditions: [

        { kind: "ratioGte", stat: "kotoba", value: 0.3 },

        { kind: "ratioGte", stat: "bunmyaku", value: 0.3 }

      ]

    },



    {

      type: "nagomi",

      priority: 70,

      conditions: [

        { kind: "allRatioGte", value: 0.2 },

        { kind: "maxMinDiffLte", value: 0.15 }

      ]

    },



    {

      type: "hirameki",

      priority: 50,

      conditions: [

        { kind: "topStatIs", stat: "chie" }

      ]

    },



    {

      type: "tsumugi",

      priority: 50,

      conditions: [

        { kind: "topStatIs", stat: "kotoba" }

      ]

    },



    {

      type: "yomitoki",

      priority: 50,

      conditions: [

        { kind: "topStatIs", stat: "bunmyaku" }

      ]

    },



    {

      type: "shirabe",

      priority: 50,

      conditions: [

        { kind: "topStatIs", stat: "onkan" }

      ]

    }

  ],



  unlockHints: {

    nagomi: {

      child: "幼体への進化時点で、4能力がすべて20%以上かつ偏り差が小さいと、なごみ系になりやすい",

      growth: "成長体への進化時点でも、同じように4能力がバランス良いと、なごみ系に再判定されやすい",

      mid: "中級体への進化時点でも、その時点の能力配分がバランス型なら、なごみ系に再判定されやすい",

      final: "上級体への進化時点でも、その時点の能力配分がバランス型なら、なごみ系に再判定されやすい"

    },



    hirameki: {

      child: "幼体への進化時点で、ちえ の比率が最も高いと、ひらめき系になりやすい",

      growth: "成長体への進化時点でも、ちえ が最も高ければ、ひらめき系に再判定されやすい",

      mid: "中級体への進化時点でも、ちえ が最も高ければ、ひらめき系に再判定されやすい",

      final: "上級体への進化時点でも、ちえ が最も高ければ、ひらめき系に再判定されやすい"

    },



    tsumugi: {

      child: "幼体への進化時点で、ことば の比率が最も高いと、つむぎ系になりやすい",

      growth: "成長体への進化時点でも、ことば が最も高ければ、つむぎ系に再判定されやすい",

      mid: "中級体への進化時点でも、ことば が最も高ければ、つむぎ系に再判定されやすい",

      final: "上級体への進化時点でも、ことば が最も高ければ、つむぎ系に再判定されやすい"

    },



    yomitoki: {

      child: "幼体への進化時点で、ぶんみゃく の比率が最も高いと、よみとき系になりやすい",

      growth: "成長体への進化時点でも、ぶんみゃく が最も高ければ、よみとき系に再判定されやすい",

      mid: "中級体への進化時点でも、ぶんみゃく が最も高ければ、よみとき系に再判定されやすい",

      final: "上級体への進化時点でも、ぶんみゃく が最も高ければ、よみとき系に再判定されやすい"

    },



    shirabe: {

      child: "幼体への進化時点で、おんかん の比率が最も高いと、しらべ系になりやすい",

      growth: "成長体への進化時点でも、おんかん が最も高ければ、しらべ系に再判定されやすい",

      mid: "中級体への進化時点でも、おんかん が最も高ければ、しらべ系に再判定されやすい",

      final: "上級体への進化時点でも、おんかん が最も高ければ、しらべ系に再判定されやすい"

    },



    hibiki: {

      child: "幼体への進化時点で、ちえ と おんかん がどちらも30%以上あると、ひびき系になりやすい",

      growth: "成長体への進化時点でも、ちえ と おんかん がどちらも30%以上あると、ひびき系に再判定されやすい",

      mid: "中級体への進化時点でも、ちえ と おんかん がどちらも30%以上あると、ひびき系に再判定されやすい",

      final: "上級体への進化時点でも、ちえ と おんかん がどちらも30%以上あると、ひびき系に再判定されやすい"

    },



    kotonoha: {

      child: "幼体への進化時点で、ことば と ぶんみゃく がどちらも30%以上あると、ことのは系になりやすい",

      growth: "成長体への進化時点でも、ことば と ぶんみゃく がどちらも30%以上あると、ことのは系に再判定されやすい",

      mid: "中級体への進化時点でも、ことば と ぶんみゃく がどちらも30%以上あると、ことのは系に再判定されやすい",

      final: "上級体への進化時点でも、ことば と ぶんみゃく がどちらも30%以上あると、ことのは系に再判定されやすい"

    },



    mr_uno: {

      child: "MR.UNO以外の別種類の最終形態を5種類達成し、特別ルートを選んだ状態で進化すると、MR.UNO系として進化します",

      growth: "以後の進化でも、特別ルート中はMR.UNO系として進化します",

      mid: "以後の進化でも、特別ルート中はMR.UNO系として進化します",

      final: "以後の進化でも、特別ルート中はMR.UNO系として進化します"

    }

  }

};



window.GoimonRules = {

  getRules() {

    return window.GOIMON_RULES || null;

  },



  getStageThresholds() {

    return window.GOIMON_RULES?.stageThresholds || {

      child: 100,

      growth: 300,

      mid: 600,

      final: 900

    };

  },



  getThresholdForStage(stageKey) {

    return this.getStageThresholds()?.[stageKey] || null;

  },



  checkCondition(cond, ctx) {

    if (!cond || !ctx) return false;



    const kind = String(cond.kind || "");



    if (kind === "specialRouteIs") {

      return String(ctx.specialRoute || "") === String(cond.value || "");

    }



    if (kind === "ratioGte") {

      const stat = String(cond.stat || "");

      return Number(ctx.ratios?.[stat] || 0) >= Number(cond.value || 0);

    }



    if (kind === "ratioLte") {

      const stat = String(cond.stat || "");

      return Number(ctx.ratios?.[stat] || 0) <= Number(cond.value || 0);

    }



    if (kind === "topStatIs") {

      return String(ctx.topStat || "") === String(cond.stat || "");

    }



    if (kind === "allRatioGte") {

      const values = Object.values(ctx.ratios || {});

      if (!values.length) return false;

      return values.every(v => Number(v) >= Number(cond.value || 0));

    }



    if (kind === "maxMinDiffLte") {

      const values = Object.values(ctx.ratios || {});

      if (!values.length) return false;

      const max = Math.max(...values);

      const min = Math.min(...values);

      return (max - min) <= Number(cond.value || 0);

    }



    if (kind === "totalGte") {

      return Number(ctx.total || 0) >= Number(cond.value || 0);

    }



    if (kind === "statGte") {

      const stat = String(cond.stat || "");

      return Number(ctx.stats?.[stat] || 0) >= Number(cond.value || 0);

    }



    return false;

  },



  decideEvolutionType(ctx) {

    const rules = window.GOIMON_RULES;

    if (!rules || !Array.isArray(rules.branches)) return "nagomi";



    const branches = [...rules.branches].sort((a, b) => {

      return Number(b.priority || 0) - Number(a.priority || 0);

    });



    for (const branch of branches) {

      const conditions = Array.isArray(branch.conditions) ? branch.conditions : [];

      const ok = conditions.every(cond => this.checkCondition(cond, ctx));

      if (ok) return branch.type;

    }



    return "nagomi";

  },



  getUnlockHint(speciesKey, stageKey) {

    return (

      window.GOIMON_RULES?.unlockHints?.[speciesKey]?.[stageKey] ||

      "学習を進めると解放されます"

    );

  },



  isSecretRoute(speciesKey) {

    return !!window.GOIMON_RULES?.specialRoutes?.[speciesKey]?.secret;

  },



  isSpecialRouteUnlocked(speciesKey, ctx) {

    const route = window.GOIMON_RULES?.specialRoutes?.[speciesKey];

    if (!route) return false;



    if (route.achievementRoute) {

      return !!window.GoimonAchievements?.isUnlocked(speciesKey);

    }



    if (speciesKey === "mr_uno") {

      const required = Number(route.unlock?.distinctFinalTypes || 0);

      return Number(ctx?.distinctFinalTypes || 0) >= required;

    }



    return false;

  }

};





/* 大問別の特別解放設定。確定画像と各段階の説明を管理する。 */

window.GOIMON_SPECIAL_CONFIG = {

  q7: {

    route: "q7_special", label: "大問7 特別ルート",

    setIds: Array.from({ length: 10 }, (_, i) => `q7_set_${String(i + 1).padStart(3, "0")}`),

    vocabIdsBySet: {"q7_set_001": ["q7_set_001_v001", "q7_set_001_v002", "q7_set_001_v003", "q7_set_001_v004", "q7_set_001_v005", "q7_set_001_v006", "q7_set_001_v007", "q7_set_001_v008", "q7_set_001_v009", "q7_set_001_v010", "q7_set_001_v011", "q7_set_001_v012", "q7_set_001_v013", "q7_set_001_v014", "q7_set_001_v015", "q7_set_001_v016", "q7_set_001_v017", "q7_set_001_v018", "q7_set_001_v019", "q7_set_001_v020", "q7_set_001_v021", "q7_set_001_v022", "q7_set_001_v023", "q7_set_001_v024", "q7_set_001_v025", "q7_set_001_v026", "q7_set_001_v027", "q7_set_001_v028", "q7_set_001_v029", "q7_set_001_v030", "q7_set_001_v031", "q7_set_001_v032", "q7_set_001_v033", "q7_set_001_v034", "q7_set_001_v035", "q7_set_001_v036", "q7_set_001_v037", "q7_set_001_v038", "q7_set_001_v039", "q7_set_001_v040", "q7_set_001_v041", "q7_set_001_v042", "q7_set_001_v043", "q7_set_001_v044", "q7_set_001_v045", "q7_set_001_v046", "q7_set_001_v047", "q7_set_001_v048", "q7_set_001_v049", "q7_set_001_v050", "q7_set_001_v051", "q7_set_001_v052", "q7_set_001_v053", "q7_set_001_v054"], "q7_set_002": ["q7_set_002_v001", "q7_set_002_v002", "q7_set_002_v003", "q7_set_002_v004", "q7_set_002_v005", "q7_set_002_v006", "q7_set_002_v007", "q7_set_002_v008", "q7_set_002_v009", "q7_set_002_v010", "q7_set_002_v011", "q7_set_002_v012", "q7_set_002_v013", "q7_set_002_v014", "q7_set_002_v015", "q7_set_002_v016", "q7_set_002_v017", "q7_set_002_v018", "q7_set_002_v019", "q7_set_002_v020", "q7_set_002_v021", "q7_set_002_v022", "q7_set_002_v023", "q7_set_002_v024", "q7_set_002_v025", "q7_set_002_v026", "q7_set_002_v027", "q7_set_002_v028", "q7_set_002_v029", "q7_set_002_v030", "q7_set_002_v031", "q7_set_002_v032", "q7_set_002_v033", "q7_set_002_v034", "q7_set_002_v035", "q7_set_002_v036", "q7_set_002_v037", "q7_set_002_v038", "q7_set_002_v039", "q7_set_002_v040", "q7_set_002_v041", "q7_set_002_v042", "q7_set_002_v043", "q7_set_002_v044", "q7_set_002_v045", "q7_set_002_v046", "q7_set_002_v047", "q7_set_002_v048", "q7_set_002_v049", "q7_set_002_v050", "q7_set_002_v051", "q7_set_002_v052", "q7_set_002_v053"], "q7_set_003": ["q7_set_003_v001", "q7_set_003_v002", "q7_set_003_v003", "q7_set_003_v004", "q7_set_003_v005", "q7_set_003_v006", "q7_set_003_v007", "q7_set_003_v008", "q7_set_003_v009", "q7_set_003_v010", "q7_set_003_v011", "q7_set_003_v012", "q7_set_003_v013", "q7_set_003_v014", "q7_set_003_v015", "q7_set_003_v016", "q7_set_003_v017", "q7_set_003_v018", "q7_set_003_v019", "q7_set_003_v020", "q7_set_003_v021", "q7_set_003_v022", "q7_set_003_v023", "q7_set_003_v024", "q7_set_003_v025", "q7_set_003_v026", "q7_set_003_v027", "q7_set_003_v028", "q7_set_003_v029", "q7_set_003_v030", "q7_set_003_v031", "q7_set_003_v032", "q7_set_003_v033", "q7_set_003_v034", "q7_set_003_v035", "q7_set_003_v036", "q7_set_003_v037", "q7_set_003_v038", "q7_set_003_v039", "q7_set_003_v040", "q7_set_003_v041", "q7_set_003_v042", "q7_set_003_v043", "q7_set_003_v044", "q7_set_003_v045", "q7_set_003_v046", "q7_set_003_v047", "q7_set_003_v048", "q7_set_003_v049", "q7_set_003_v050", "q7_set_003_v051", "q7_set_003_v052", "q7_set_003_v053", "q7_set_003_v054", "q7_set_003_v055", "q7_set_003_v056", "q7_set_003_v057", "q7_set_003_v058", "q7_set_003_v059", "q7_set_003_v060"], "q7_set_004": ["q7_set_004_v001", "q7_set_004_v002", "q7_set_004_v003", "q7_set_004_v004", "q7_set_004_v005", "q7_set_004_v006", "q7_set_004_v007", "q7_set_004_v008", "q7_set_004_v009", "q7_set_004_v010", "q7_set_004_v011", "q7_set_004_v012", "q7_set_004_v013", "q7_set_004_v014", "q7_set_004_v015", "q7_set_004_v016", "q7_set_004_v017", "q7_set_004_v018", "q7_set_004_v019", "q7_set_004_v020", "q7_set_004_v021", "q7_set_004_v022", "q7_set_004_v023", "q7_set_004_v024", "q7_set_004_v025", "q7_set_004_v026", "q7_set_004_v027", "q7_set_004_v028", "q7_set_004_v029", "q7_set_004_v030", "q7_set_004_v031", "q7_set_004_v032", "q7_set_004_v033", "q7_set_004_v034", "q7_set_004_v035", "q7_set_004_v036", "q7_set_004_v037", "q7_set_004_v038", "q7_set_004_v039", "q7_set_004_v040", "q7_set_004_v041", "q7_set_004_v042", "q7_set_004_v043", "q7_set_004_v044", "q7_set_004_v045", "q7_set_004_v046", "q7_set_004_v047", "q7_set_004_v048", "q7_set_004_v049", "q7_set_004_v050", "q7_set_004_v051", "q7_set_004_v052", "q7_set_004_v053", "q7_set_004_v054"]},

    fallbackSpecies: "yomitoki", names: {}, images: {
  "child": "images/goimon/q7_inventors_child.png",
  "growth": "images/goimon/q7_inventors_growth.png",
  "mid": "images/goimon/q7_inventors_mid.png",
  "final": "images/goimon/q7_inventors_final.png"
},
    descriptions: {
  "child": "発明が好きな7人の幼い仲間。工具や部品を持ち、無邪気に遊んでいる。",
  "growth": "7人が作業台を囲み、それぞれの専門分野から意見を出して設計図をまとめる。",
  "mid": "設計・鍛造・動力・機構・観測・修理を分担し、7人で大型メカを組み立てる。",
  "final": "7人全員が完成した巨大発明メカに搭乗し、専門装置を分担して共同操縦する。"
}

  },

  q8: {

    route: "q8_special", label: "大問8 特別ルート",

    requiredPerfect: 10,

    fallbackSpecies: "kotonoha", names: {}, images: {
  "child": "images/goimon/q8_odin_sleipnir_child.png",
  "growth": "images/goimon/q8_odin_sleipnir_growth.png",
  "mid": "images/goimon/q8_odin_sleipnir_mid.png",
  "final": "images/goimon/q8_odin_sleipnir_final.png"
},
    descriptions: {
  "child": "幼いオーディンと八本脚の子馬スレイプニル。隣で触れ合い、相棒としての絆を育む。",
  "growth": "少年オーディンが小さな槍を手に、成長したスレイプニルの横を一緒に走る。",
  "mid": "若き戦神オーディンがスレイプニルに騎乗し、手綱とグングニルを構えて疾走する。",
  "final": "猛々しい戦神オーディンと巨大な八本脚の神馬が一体となり、グングニルを掲げて駆け抜ける。"
}

  },

  q10: {

    route: "q10_special", label: "大問10 特別ルート",

    requiredPerfect: 10,

    fallbackSpecies: "yomitoki", names: {}, images: {
  "child": "images/goimon/q10_kraken_child.png",
  "growth": "images/goimon/q10_kraken_growth.png",
  "mid": "images/goimon/q10_kraken_mid.png",
  "final": "images/goimon/q10_kraken_final.png"
},
    descriptions: {
  "child": "大きすぎる三角帽子と赤いスカーフを着けた赤ちゃんクラーケン。船長ごっこを楽しむ。",
  "growth": "小さなサーベルを手に動き始めた若い船長。小さな青白いゴーストシップを従える。",
  "mid": "サーベルや舵輪、大砲を操る海賊船長。背後には成長したゴーストシップが姿を現す。",
  "final": "巨大なゴーストシップを従え、八本の腕と二本の長い触腕で武器や船具を操る深海の大海賊船長。"
}

  }

};



/* 学習者の累計達成記録。個体のポイント・世代とは独立して保存する。 */

window.GoimonAchievements = (function () {

  "use strict";

  const BASE = "zensho_goimon_learning_achievements_v1";

  const memory = {};

  const isObject = v => v && typeof v === "object" && !Array.isArray(v);

  const levelNow = () => String(window.ACTIVE_LEVEL || localStorage.getItem("zensho_level_v1") || "1");

  const keyOf = level => `${BASE}_lv${level}`;

  function read(key) {

    try { const v = JSON.parse(localStorage.getItem(key) || "{}"); return isObject(v) ? v : {}; }

    catch (_) { return memory[key] || {}; }

  }

  function clean(s) {

    for (const k of ["q7Passed", "q7VocabCorrect", "q7Catalog", "q8Perfect", "q10Perfect", "unlocked"]) {

      if (!isObject(s[k])) s[k] = {};

    }

    return s;

  }

  function mergeLegacy(s, level) {

    // 既存の大問7・8・10の学習履歴は1級専用。

    if (String(level) !== "1") return;

    for (const [historyKey, field] of [["dialogueQuestionHistory_v1", "q8Perfect"], ["q10QuestionHistory_v1", "q10Perfect"]]) {

      for (const [id, h] of Object.entries(read(historyKey))) {

        if (isObject(h) && Number(h.bestScore) === 5 && Number(h.attempts) > 0) s[field][id] = true;

      }

    }

    for (const [id, h] of Object.entries(read("q7SetHistory_v1"))) {

      if (isObject(h) && (h.passed === true || Number(h.bestScore) >= 4)) s.q7Passed[id] = true;

    }

    for (const [id, h] of Object.entries(read("q7VocabHistory_v1"))) {

      // 旧履歴から確認できるのは直近正解のみ。過去の正解を推測しない。

      if (isObject(h) && (h.everCorrect === true || (Number(h.attempts) > 0 && h.wrong === false))) s.q7VocabCorrect[id] = true;

    }

  }

  function checkUnlocks(s, level) {

    if (String(level) !== "1") return;

    const c = window.GOIMON_SPECIAL_CONFIG;

    const a = c.q7.setIds;

    const catalog = {...c.q7.vocabIdsBySet, ...s.q7Catalog};

    const completeCatalog = a.every(id => Array.isArray(catalog[id]) && catalog[id].length > 0);

    const b = a.flatMap(id => Array.isArray(catalog[id]) ? catalog[id] : []);

    if (a.length && completeCatalog && a.every(id => s.q7Passed[id]) && b.every(id => s.q7VocabCorrect[id])) s.unlocked[c.q7.route] = true;

    for (const mode of ["q8", "q10"]) {

      const required = c[mode].requiredPerfect;

      const count = Object.values(s[`${mode}Perfect`]).filter(v => v === true).length;

      if (Number.isInteger(required) && required > 0 && count >= required) s.unlocked[c[mode].route] = true;

    }

  }

  function update(change, level) {

    level = String(level || levelNow());

    const key = keyOf(level), s = clean(read(key)), before = JSON.stringify(s);

    mergeLegacy(s, level);

    if (change) change(s);

    checkUnlocks(s, level);

    memory[key] = s;

    if (JSON.stringify(s) !== before) {

      try { localStorage.setItem(key, JSON.stringify(s)); }

      catch (_) { return {state:s, saved:false}; }

      if (typeof window.dispatchEvent === "function" && typeof CustomEvent === "function") window.dispatchEvent(new CustomEvent("goimon-achievements-changed"));

    }

    return {state:s, saved:true};

  }

  function progress(level) {

    const s = update(null, level).state, c = window.GOIMON_SPECIAL_CONFIG;

    return {

      q7: (() => {

        const catalog = {...c.q7.vocabIdsBySet, ...s.q7Catalog};

        const words = c.q7.setIds.flatMap(id => Array.isArray(catalog[id]) ? catalog[id] : []);

        return {passed:c.q7.setIds.filter(id => s.q7Passed[id]).length, sets:c.q7.setIds.length,

          correctWords:words.filter(id => s.q7VocabCorrect[id]).length, words:words.length,

          pendingSets:c.q7.setIds.filter(id => !Array.isArray(catalog[id]) || !catalog[id].length)};

      })(),

      q8: {perfect:Object.values(s.q8Perfect).filter(v => v === true).length, required:c.q8.requiredPerfect},

      q10: {perfect:Object.values(s.q10Perfect).filter(v => v === true).length, required:c.q10.requiredPerfect},

      unlocked:{...s.unlocked}

    };

  }

  return {

    sync: level => update(null, level), getProgress: progress,

    syncQ7Catalog(vocabSets) {

      if (!Array.isArray(vocabSets)) return;

      return update(s => {

        for (const set of vocabSets) {

          if (!set.setId || !Array.isArray(set.words) || !set.words.length) continue;

          s.q7Catalog[set.setId] = [...new Set(set.words.map(w => w.id).filter(id => typeof id === "string" && id))];

        }

      }, "1");

    },

    renderQ7Progress() {

      const element = document.getElementById("q7UnlockProgress");

      if (!element) return;

      const p = progress("1"), q = p.q7;

      element.textContent = p.unlocked[window.GOIMON_SPECIAL_CONFIG.q7.route]

        ? "特別ルート解放済み！ホームのたまごで選択できます。"

        : `特別解放まで：SET合格 ${q.passed} / ${q.sets}・語句一度正解 ${q.correctWords} / ${q.words}` + (q.pendingSets.length ? `（未登録の対象SET ${q.pendingSets.length}件。全対象がそろうまで解放されません）` : "");

    },

    isUnlocked: (route, level) => update(null, level).state.unlocked[route] === true,

    recordPerfect(mode, id) {

      if (!["q8", "q10"].includes(mode) || !id) return;

      return update(s => {s[`${mode}Perfect`][String(id)] = true;}, "1");

    },

    recordQ7Set(id, score) {

      if (!id || !Number.isInteger(score) || score < 0 || score > 5) return;

      return update(s => {if (score >= 4) s.q7Passed[String(id)] = true;}, "1");

    },

    recordQ7Word(id, correct) {

      if (!id) return;

      return update(s => {if (correct === true) s.q7VocabCorrect[String(id)] = true;}, "1");

    }

  };

})();



// 既存の通常分岐・MR.UNOの条件は維持し、新しい選択式ルートを追加する。

for (const [mode, config] of Object.entries(window.GOIMON_SPECIAL_CONFIG)) {

  window.GOIMON_RULES.specialRoutes[config.route] = {secret:true, achievementRoute:true};

  window.GOIMON_RULES.branches.unshift({type:config.route, priority:100, conditions:[{kind:"specialRouteIs", value:config.route}]});

  window.GOIMON_RULES.unlockHints[config.route] = {

    child: mode === "q7" ? "対象の全SET合格＋全語句に一度以上正解し、たまごでこのルートを選択する" : `異なる問題で${config.requiredPerfect}題全問正解し、たまごでこのルートを選択する`,

    growth:"選択した特別ルートのまま進化します", mid:"選択した特別ルートのまま進化します", final:"選択した特別ルートのまま進化します"

  };

}
