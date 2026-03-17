// goimon_rules.js
// ゴイモンの分岐条件・解放条件・図鑑ヒント管理
// 半汎用化版：将来の系統追加をしやすい構造

window.GOIMON_RULES = {
  specialRoutes: {
    mr_uno: {
      secret: true,
      unlock: {
        hallOfFameCount: 2
      }
    }
  },

  // priority が大きいものから先に判定
  // 条件を満たした最初の type になる
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
      child: "4能力が全体の20%以上で、全体の偏りが小さい",
      growth: "なごみ系の幼体まで育てる",
      mid: "なごみ系の成長体まで育てる",
      final: "なごみ系の中級体まで育てる"
    },

    hirameki: {
      child: "進化時に ちえ の比率が最も高い",
      growth: "ひらめき系の幼体まで育てる",
      mid: "ひらめき系の成長体まで育てる",
      final: "ひらめき系の中級体まで育てる"
    },

    tsumugi: {
      child: "進化時に ことば の比率が最も高い",
      growth: "つむぎ系の幼体まで育てる",
      mid: "つむぎ系の成長体まで育てる",
      final: "つむぎ系の中級体まで育てる"
    },

    yomitoki: {
      child: "進化時に ぶんみゃく の比率が最も高い",
      growth: "よみとき系の幼体まで育てる",
      mid: "よみとき系の成長体まで育てる",
      final: "よみとき系の中級体まで育てる"
    },

    shirabe: {
      child: "進化時に おんかん の比率が最も高い",
      growth: "しらべ系の幼体まで育てる",
      mid: "しらべ系の成長体まで育てる",
      final: "しらべ系の中級体まで育てる"
    },

    hibiki: {
      child: "進化時に ちえ と おんかん がそれぞれ全体の30%以上",
      growth: "ひびき系の幼体まで育てる",
      mid: "ひびき系の成長体まで育てる",
      final: "ひびき系の中級体まで育てる"
    },

    kotonoha: {
      child: "進化時に ことば と ぶんみゃく がそれぞれ全体の30%以上",
      growth: "ことのは系の幼体まで育てる",
      mid: "ことのは系の成長体まで育てる",
      final: "ことのは系の中級体まで育てる"
    },

    mr_uno: {
      child: "？？？",
      growth: "？？？",
      mid: "？？？",
      final: "？？？"
    }
  }
};

window.GoimonRules = {
  getRules() {
    return window.GOIMON_RULES || null;
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
