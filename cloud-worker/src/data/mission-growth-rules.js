// Generated from goimon.js, goimon_rules.js and goimon_dex.js. Do not edit.
const STAGE_ORDER = ["egg", "child", "growth", "mid", "final"];
const POINT_RULES = {
    study: { chie: 0.1 },
    quiz_enja: { chie: 1 },
    quiz_jaen: { kotoba: 1 },
    accent: { onkan: 1 },
    sentence: { bunmyaku: 1 },
    audio_quiz: { chie: 0.5, onkan: 0.5 },
    listening: { onkan: 1 }
  };
const STAGE_POINT_THRESHOLDS = {
    egg: 100,     // egg -> child
    child: 300,   // child -> growth
    growth: 600,  // growth -> mid
    mid: 900      // mid -> final
  };
const STAGE_IMAGES = {
    egg: "images/goimon/goimon_egg.png"
  };
const images={"nagomi":{"egg":"images/goimon/goimon_egg.png","child":"images/goimon/nagomi_child.png","growth":"images/goimon/nagomi_growth.png","mid":"images/goimon/nagomi_mid.png","final":"images/goimon/nagomi_final.png"},"hirameki":{"egg":"images/goimon/goimon_egg.png","child":"images/goimon/hirameki_child.png","growth":"images/goimon/hirameki_growth.png","mid":"images/goimon/hirameki_mid.png","final":"images/goimon/hirameki_final.png"},"tsumugi":{"egg":"images/goimon/goimon_egg.png","child":"images/goimon/tsumugi_child.png","growth":"images/goimon/tsumugi_growth.png","mid":"images/goimon/tsumugi_mid.png","final":"images/goimon/tsumugi_final.png"},"yomitoki":{"egg":"images/goimon/goimon_egg.png","child":"images/goimon/yomitoki_child.png","growth":"images/goimon/yomitoki_growth.png","mid":"images/goimon/yomitoki_mid.png","final":"images/goimon/yomitoki_final.png"},"shirabe":{"egg":"images/goimon/goimon_egg.png","child":"images/goimon/shirabe_child.png","growth":"images/goimon/shirabe_growth.png","mid":"images/goimon/shirabe_mid.png","final":"images/goimon/shirabe_final.png"},"hibiki":{"egg":"images/goimon/goimon_egg.png","child":"images/goimon/hibiki_child.png","growth":"images/goimon/hibiki_growth.png","mid":"images/goimon/hibiki_mid.png","final":"images/goimon/hibiki_final.png"},"kotonoha":{"egg":"images/goimon/goimon_egg.png","child":"images/goimon/kotonoha_child.png","growth":"images/goimon/kotonoha_growth.png","mid":"images/goimon/kotonoha_mid.png","final":"images/goimon/kotonoha_final.png"},"mr_uno":{"egg":"images/goimon/goimon_egg.png","child":"images/goimon/mr_uno_child.png","growth":"images/goimon/mr_uno_growth.png","mid":"images/goimon/mr_uno_mid.png","final":"images/goimon/mr_uno_final.png"},"q7_special":{"egg":"images/goimon/goimon_egg.png","child":"images/goimon/q7_inventors_child.png","growth":"images/goimon/q7_inventors_growth.png","mid":"images/goimon/q7_inventors_mid.png","final":"images/goimon/q7_inventors_final.png"},"q8_special":{"egg":"images/goimon/goimon_egg.png","child":"images/goimon/q8_odin_sleipnir_child.png","growth":"images/goimon/q8_odin_sleipnir_growth.png","mid":"images/goimon/q8_odin_sleipnir_mid.png","final":"images/goimon/q8_odin_sleipnir_final.png"},"q10_special":{"egg":"images/goimon/goimon_egg.png","child":"images/goimon/q10_kraken_child.png","growth":"images/goimon/q10_kraken_growth.png","mid":"images/goimon/q10_kraken_mid.png","final":"images/goimon/q10_kraken_final.png"}};
const names={"nagomi":{"egg":"ふしぎなたまご","child":"ラミア","growth":"ラミナス","mid":"ラムノエル","final":"セラフィラムノア"},"hirameki":{"egg":"ふしぎなたまご","child":"フェネ","growth":"フェネークト","mid":"フェネクスヴィア","final":"ディスフェネヴィクトン"},"tsumugi":{"egg":"ふしぎなたまご","child":"クラージェ","growth":"ジェリアンヌ","mid":"ネクロジェリアルノ","final":"バイオネクロクラゲンゲン"},"yomitoki":{"egg":"ふしぎなたまご","child":"レムー","growth":"レムールノ","mid":"レムールギアス","final":"クロノレムールヴァイス"},"shirabe":{"egg":"ふしぎなたまご","child":"プラティ","growth":"プラティ・クゥ","mid":"プラティ・ボルグ","final":"ギガ・プラティ・ボルグヌス"},"hibiki":{"egg":"ふしぎなたまご","child":"フローア","growth":"フロリアーラ","mid":"ソーラーフログリア","final":"キングソーラーフログリア"},"kotonoha":{"egg":"ふしぎなたまご","child":"オルカン","growth":"オルカシア","mid":"オルカシッサ","final":"アストラオルカシオン"},"mr_uno":{"egg":"ふしぎなたまご","child":"魔法見習いUNO","growth":"デスイーターUNO","mid":"フィジカル覚醒UNO","final":"理の境地MR.UNO"},"q7_special":{"egg":"ふしぎなたまご","child":"夢見る七人の小人","growth":"ひらめく七人の小人","mid":"機巧の七人の小人","final":"創世の七人の小人"},"q8_special":{"egg":"ふしぎなたまご","child":"暁のオーディンとスレイプニル","growth":"旅立ちのオーディンとスレイプニル","mid":"疾駆のオーディンとスレイプニル","final":"覇天のオーディンとスレイプニル"},"q10_special":{"egg":"ふしぎなたまご","child":"わんぱく船長クラーケン","growth":"霧航の船長クラーケン","mid":"幽霊船長クラーケン","final":"深淵の大船長クラーケン"}};
export const MISSION_EXTRA_POINT_RULES={"idiom_quiz":{"chie":0.5,"kotoba":0.5},"paraphrase_quiz":{"kotoba":0.5,"bunmyaku":0.5}};
const window={GOIMON_RULES:{"branches":[{"type":"q10_special","priority":100,"conditions":[{"kind":"specialRouteIs","value":"q10_special"}]},{"type":"q8_special","priority":100,"conditions":[{"kind":"specialRouteIs","value":"q8_special"}]},{"type":"q7_special","priority":100,"conditions":[{"kind":"specialRouteIs","value":"q7_special"}]},{"type":"mr_uno","priority":100,"conditions":[{"kind":"specialRouteIs","value":"mr_uno"}]},{"type":"hibiki","priority":80,"conditions":[{"kind":"ratioGte","stat":"chie","value":0.3},{"kind":"ratioGte","stat":"onkan","value":0.3}]},{"type":"kotonoha","priority":80,"conditions":[{"kind":"ratioGte","stat":"kotoba","value":0.3},{"kind":"ratioGte","stat":"bunmyaku","value":0.3}]},{"type":"nagomi","priority":70,"conditions":[{"kind":"allRatioGte","value":0.2},{"kind":"maxMinDiffLte","value":0.15}]},{"type":"hirameki","priority":50,"conditions":[{"kind":"topStatIs","stat":"chie"}]},{"type":"tsumugi","priority":50,"conditions":[{"kind":"topStatIs","stat":"kotoba"}]},{"type":"yomitoki","priority":50,"conditions":[{"kind":"topStatIs","stat":"bunmyaku"}]},{"type":"shirabe","priority":50,"conditions":[{"kind":"topStatIs","stat":"onkan"}]}]},GOIMON_DEX:{"common":{"egg":{"image":"images/goimon/goimon_egg.png"}}},GoimonDex:{getEntry:(type,stage)=>({image:images[type]?.[stage]})}};
window.GoimonRules={checkCondition(cond, ctx) {

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

  },decideEvolutionType(ctx) {

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

  }};
  function roundPoint(v) {
    return Math.round((Number(v || 0) + Number.EPSILON) * 10) / 10;
  }
  function sumStats(stats) {
    if (!stats || typeof stats !== "object") return 0;
    return roundPoint(
      Number(stats.chie || 0) +
      Number(stats.kotoba || 0) +
      Number(stats.onkan || 0) +
      Number(stats.bunmyaku || 0)
    );
  }
  function calculateLevel(totalPoints) {
    return Math.max(1, Math.floor(Number(totalPoints || 0) / 20) + 1);
  }
  function normalizeStage(stage) {
    return STAGE_ORDER.includes(stage) ? stage : "egg";
  }
  function getDefaultStats() {
    return {
      chie: 0,
      kotoba: 0,
      onkan: 0,
      bunmyaku: 0
    };
  }
  function getDefaultCurrent() {
    return {
      id: `goimon_${Date.now()}`,
      generation: 1,
      stage: "egg",
      type: "nagomi",
      specialRoute: "",
      level: 1,
      nickname: "",
      stats: getDefaultStats(),

hiddenPoints: {
  dialogue8: 0,
  q10: 0
},

totalPoints: 0,
imageKey: STAGE_IMAGES.egg,
      pendingEvolution: false,
      pendingStage: "",
      pendingType: "",
      pendingImageKey: "",
      discoveredForms: ["egg"],
      evolutionHistory: [
        {
          stage: "egg",
          type: "nagomi",
          imageKey: STAGE_IMAGES.egg,
          label: "ふしぎなたまご"
        }
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      hallOfFame: false
    };
  }
  function getImageFor(type, stage) {
    if (stage === "egg") {
      return window.GOIMON_DEX?.common?.egg?.image || STAGE_IMAGES.egg;
    }

    const dexEntry = window.GoimonDex?.getEntry?.(type, stage);
    if (dexEntry?.image) return dexEntry.image;

    if (type === "mr_uno") {
      return `images/goimon/mr_uno_${stage}.png`;
    }
    return `images/goimon/${type}_${stage}.png`;
  }
  function getNextThresholdForStage(stage) {
    return STAGE_POINT_THRESHOLDS[stage] || null;
  }
  function getNextStage(stage) {
    if (stage === "egg") return "child";
    if (stage === "child") return "growth";
    if (stage === "growth") return "mid";
    if (stage === "mid") return "final";
    return "";
  }
  function decideTypeForEvolution(g) {
    const s = g.stats || getDefaultStats();
    const total = Math.max(1, sumStats(s));

    const ratios = {
      chie: Number(s.chie || 0) / total,
      kotoba: Number(s.kotoba || 0) / total,
      onkan: Number(s.onkan || 0) / total,
      bunmyaku: Number(s.bunmyaku || 0) / total
    };

    const topStat = Object.entries(ratios)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || "chie";

    const ctx = {
      specialRoute: g.specialRoute || "",
      stats: s,
      total,
      ratios,
      topStat,
      currentStage: g.stage,
      nextStage: getNextStage(g.stage)
    };

    if (window.GoimonRules && typeof window.GoimonRules.decideEvolutionType === "function") {
      return window.GoimonRules.decideEvolutionType(ctx);
    }

    return "nagomi";
  }
  function determinePendingEvolution(g) {
    const currentStage = normalizeStage(g.stage);
    const nextStage = getNextStage(currentStage);

    if (!nextStage) {
      g.pendingEvolution = false;
      g.pendingStage = "";
      g.pendingType = "";
      g.pendingImageKey = "";
      return g;
    }

    const threshold = getNextThresholdForStage(currentStage);
    if (!threshold) {
      g.pendingEvolution = false;
      g.pendingStage = "";
      g.pendingType = "";
      g.pendingImageKey = "";
      return g;
    }

    if (Number(g.totalPoints || 0) < threshold) {
      g.pendingEvolution = false;
      g.pendingStage = "";
      g.pendingType = "";
      g.pendingImageKey = "";
      return g;
    }

    const nextType = decideTypeForEvolution(g);

    g.pendingEvolution = true;
    g.pendingStage = nextStage;
    g.pendingType = nextType;
    g.pendingImageKey = getImageFor(nextType, nextStage);

    return g;
  }
export {POINT_RULES, STAGE_ORDER, images, names, getDefaultCurrent, roundPoint, sumStats, calculateLevel, getImageFor, determinePendingEvolution};
