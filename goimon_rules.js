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
        hallOfFameCount: 2
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
      child: "特別ルートを選んだ状態で進化すると、MR.UNO系として進化します",
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

    if (speciesKey === "mr_uno") {
      const required = Number(route.unlock?.hallOfFameCount || 0);
      return Number(ctx?.hallOfFameCount || 0) >= required;
    }

    return false;
  }
};
