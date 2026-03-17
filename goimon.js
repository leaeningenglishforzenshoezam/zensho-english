// goimon.js
// 現行ホーム(index.html)対応版
// - 旧保存データの移行つき
// - goimon_dialogues.js からランダムにセリフ取得
// - goimon_dex.js を基準に名前・説明・画像を参照
// - goimon_rules.js を基準に分岐条件・解放条件を参照
// - 各学習ページの GoimonUI API に対応
// - ホームの詳細シート / 保存箱 / 殿堂入り / 分岐 / 進化演出 / 図鑑 に対応
// - ポイント加算 / レベル計算 / 進化判定をこのファイルに集約

window.GoimonUI = (function () {
  "use strict";

  const LEVEL_KEY = "zensho_level_v1";

  const CURRENT_KEY_BASE = "zensho_goimon_current_v4";
  const ARCHIVE_KEY_BASE = "zensho_goimon_archive_v4";
  const HOME_UI_KEY_BASE = "zensho_goimon_home_ui_v4";
  const DEX_DISCOVERY_KEY_BASE = "zensho_goimon_dex_discovery_v2";
  const HALL_COUNT_KEY_BASE = "zensho_goimon_hall_count_v2";
  const LAST_EVENT_KEY_BASE = "zensho_goimon_last_event_v2";

  const ARCHIVE_LIMIT = 15;

  const STAGE_ORDER = ["egg", "child", "growth", "mid", "final"];
  const STAGE_LABELS = {
    egg: "たまご期",
    child: "幼体",
    growth: "成長体",
    mid: "中級体",
    final: "上級体"
  };

  const TYPE_LABELS = {
    nagomi: "なごみ系",
    hirameki: "ひらめき系",
    tsumugi: "つむぎ系",
    yomitoki: "よみとき系",
    shirabe: "しらべ系",
    hibiki: "ひびき系",
    kotonoha: "ことのは系",
    mr_uno: "MR.UNO"
  };

  // 学習モードごとの標準加算値
  // ここだけ直せば、各ページの加算ルールを変えられる
  const POINT_RULES = {
    study: { chie: 0.1 },
    quiz_enja: { chie: 1 },
    quiz_jaen: { kotoba: 1 },
    accent: { onkan: 1 },
    sentence: { bunmyaku: 1 },
    audio_quiz: { chie: 0.5, onkan: 0.5 }
  };

  // レベルは totalPoints 20pt ごとに +1
  // Lv1〜5: egg / Lv6〜15: child / Lv16〜30: growth / Lv31〜45: mid / Lv46〜: final
  const STAGE_POINT_THRESHOLDS = {
    egg: 100,     // Lv6
    child: 300,   // Lv16
    growth: 600,  // Lv31
    mid: 900      // Lv46
  };

  const STAGE_IMAGES = {
    egg: "images/goimon/goimon_egg.png"
  };

  function getLevel() {
    return String(window.ACTIVE_LEVEL || localStorage.getItem(LEVEL_KEY) || "1");
  }

  function keyOf(base) {
    return `${base}_lv${getLevel()}`;
  }

  function safeParse(raw) {
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function loadJson(key, fallback) {
    const obj = safeParse(localStorage.getItem(key));
    return obj == null ? fallback : obj;
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function roundPoint(v) {
    return Math.round((Number(v || 0) + Number.EPSILON) * 10) / 10;
  }

  function formatPoint(v) {
    const n = roundPoint(v);
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
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

  function getStageFromLevel(level) {
    const lv = Number(level || 1);
    if (lv >= 46) return "final";
    if (lv >= 31) return "mid";
    if (lv >= 16) return "growth";
    if (lv >= 6) return "child";
    return "egg";
  }

  function getStageLabel(stage) {
    return STAGE_LABELS[stage] || "たまご期";
  }

  function getTypeLabel(type) {
    return TYPE_LABELS[type] || "なごみ系";
  }

  function normalizeStage(stage) {
    return STAGE_ORDER.includes(stage) ? stage : "egg";
  }

  function normalizeType(type) {
    return TYPE_LABELS[type] ? type : "nagomi";
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
      totalPoints: 0,
      imageKey: STAGE_IMAGES.egg,
      pendingEvolution: false,
      pendingStage: "",
      pendingType: "",
      pendingImageKey: "",
      discoveredForms: ["egg"],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      hallOfFame: false
    };
  }

  function getLegacyCandidates(base) {
    const lv = getLevel();
    const names = [
      `${base}_lv${lv}`,
      `${base.replace("_v4", "_v3")}_lv${lv}`,
      `${base.replace("_v4", "_v2")}_lv${lv}`,
      `${base.replace("_v4", "_v1")}_lv${lv}`,
      `${base.replace("_v2", "_v1")}_lv${lv}`,
      base,
      base.replace("_v4", "_v3"),
      base.replace("_v4", "_v2"),
      base.replace("_v4", "_v1"),
      base.replace("_v2", "_v1")
    ];
    return Array.from(new Set(names));
  }

  function tryMigrateOne(currentKey, legacyCandidates) {
    const existing = localStorage.getItem(currentKey);
    if (existing) return true;

    for (const legacyKey of legacyCandidates) {
      if (!legacyKey || legacyKey === currentKey) continue;
      const raw = localStorage.getItem(legacyKey);
      const obj = safeParse(raw);
      if (obj != null) {
        localStorage.setItem(currentKey, raw);
        return true;
      }
    }
    return false;
  }

  function migrateLegacyDataIfNeeded() {
    tryMigrateOne(keyOf(CURRENT_KEY_BASE), getLegacyCandidates(CURRENT_KEY_BASE));
    tryMigrateOne(keyOf(ARCHIVE_KEY_BASE), getLegacyCandidates(ARCHIVE_KEY_BASE));
    tryMigrateOne(keyOf(HOME_UI_KEY_BASE), getLegacyCandidates(HOME_UI_KEY_BASE));
    tryMigrateOne(keyOf(DEX_DISCOVERY_KEY_BASE), getLegacyCandidates(DEX_DISCOVERY_KEY_BASE));
    tryMigrateOne(keyOf(HALL_COUNT_KEY_BASE), getLegacyCandidates(HALL_COUNT_KEY_BASE));
    tryMigrateOne(keyOf(LAST_EVENT_KEY_BASE), getLegacyCandidates(LAST_EVENT_KEY_BASE));
  }

  function getCurrentKey() {
    return keyOf(CURRENT_KEY_BASE);
  }

  function getArchiveKey() {
    return keyOf(ARCHIVE_KEY_BASE);
  }

  function getHomeUiKey() {
    return keyOf(HOME_UI_KEY_BASE);
  }

  function getDexDiscoveryKey() {
    return keyOf(DEX_DISCOVERY_KEY_BASE);
  }

  function getHallCountKey() {
    return keyOf(HALL_COUNT_KEY_BASE);
  }

  function getLastEventKey() {
    return keyOf(LAST_EVENT_KEY_BASE);
  }

  function getDexData() {
    if (window.GOIMON_DEX && typeof window.GOIMON_DEX === "object") {
      return window.GOIMON_DEX;
    }
    return null;
  }

  function getDexEntry(type, stage) {
    if (window.GoimonDex && typeof window.GoimonDex.getEntry === "function") {
      const entry = window.GoimonDex.getEntry(type, stage);
      if (entry) return entry;
    }

    const dex = getDexData();

    if (stage === "egg") {
      return {
        name: dex?.common?.egg?.name || "ふしぎなたまご",
        description: dex?.common?.egg?.description || "すべての系統の始まりとなる共通のたまご。語彙学習の力を受けて進化していく。",
        image: dex?.common?.egg?.image || "images/goimon/goimon_egg.png",
        typeLabel: dex?.common?.egg?.typeLabel || "共通"
      };
    }

    return dex?.species?.[type]?.[stage] || null;
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

  function getBaseDisplayName(type, stage) {
    if (window.GoimonDex && typeof window.GoimonDex.getEntry === "function") {
      const entry = window.GoimonDex.getEntry(type, stage);
      if (entry?.name) return entry.name;
    }

    if (stage === "egg") {
      return window.GOIMON_DEX?.common?.egg?.name || "ふしぎなたまご";
    }

    return `${getTypeLabel(type)}${getStageLabel(stage)}`;
  }

  function getDisplayDescription(g) {
    const dex = getDexEntry(g?.type, g?.stage);
    return dex?.description || getTypeDescription(g?.type);
  }

  function getGoimonPrimaryName(g) {
    const baseName = getBaseDisplayName(g.type, g.stage);
    return g.nickname ? `${g.nickname}（${baseName}）` : baseName;
  }

  function getTypeDescription(type) {
    const map = {
      nagomi: "バランスよく育つ、やさしい守護神獣タイプ。",
      hirameki: "知性とひらめきが伸びる、啓示神獣タイプ。",
      tsumugi: "ことばと感情があふれる、表現神獣タイプ。",
      yomitoki: "読む・見抜く力が育つ、解読神獣タイプ。",
      shirabe: "音・痕跡・探索力が育つ、調査神獣タイプ。",
      hibiki: "知性と音感が響き合う、共鳴神獣タイプ。",
      kotonoha: "ことばと文脈を束ねる、言霊神獣タイプ。",
      mr_uno: "特別に解放された、学びを導く隠しルート。"
    };
    return map[type] || "学習に応じて成長し、進化していきます。";
  }

  function sanitizeGoimon(g) {
    const base = getDefaultCurrent();
    const out = Object.assign({}, base, g || {});
    out.stage = normalizeStage(out.stage);
    out.type = normalizeType(out.type || "nagomi");
    out.specialRoute = String(out.specialRoute || "");
    out.level = Number.isFinite(Number(out.level)) ? Number(out.level) : 1;
    out.generation = Number.isFinite(Number(out.generation)) ? Number(out.generation) : 1;
    out.nickname = String(out.nickname || "");
    out.stats = Object.assign(getDefaultStats(), out.stats || {});
    out.stats.chie = roundPoint(out.stats.chie);
    out.stats.kotoba = roundPoint(out.stats.kotoba);
    out.stats.onkan = roundPoint(out.stats.onkan);
    out.stats.bunmyaku = roundPoint(out.stats.bunmyaku);
    out.totalPoints = roundPoint(
      Number.isFinite(Number(out.totalPoints)) ? Number(out.totalPoints) : sumStats(out.stats)
    );
    out.level = calculateLevel(out.totalPoints);
    out.stage = getStageFromLevel(out.level);
    out.imageKey = String(out.imageKey || getImageFor(out.type, out.stage));
    out.pendingEvolution = !!out.pendingEvolution;
    out.pendingStage = out.pendingEvolution ? normalizeStage(out.pendingStage) : "";
    out.pendingType = out.pendingEvolution ? normalizeType(out.pendingType || out.type) : "";
    out.pendingImageKey = out.pendingEvolution
      ? String(out.pendingImageKey || getImageFor(out.pendingType, out.pendingStage))
      : "";
    out.discoveredForms = Array.isArray(out.discoveredForms) ? out.discoveredForms.slice() : ["egg"];
    out.hallOfFame = !!out.hallOfFame;
    out.createdAt = Number.isFinite(Number(out.createdAt)) ? Number(out.createdAt) : Date.now();
    out.updatedAt = Number.isFinite(Number(out.updatedAt)) ? Number(out.updatedAt) : Date.now();
    return out;
  }

  function loadCurrent() {
    migrateLegacyDataIfNeeded();
    const key = getCurrentKey();
    const current = loadJson(key, null);
    if (!current) {
      const fresh = sanitizeGoimon(getDefaultCurrent());
      saveJson(key, fresh);
      return fresh;
    }
    const fixed = sanitizeGoimon(current);
    saveJson(key, fixed);
    return fixed;
  }

  function saveCurrent(g) {
    const fixed = sanitizeGoimon(g);
    fixed.updatedAt = Date.now();
    saveJson(getCurrentKey(), fixed);
    return fixed;
  }

  function ensureCurrent() {
    return loadCurrent();
  }

  function loadArchive() {
    migrateLegacyDataIfNeeded();
    const arr = loadJson(getArchiveKey(), []);
    return Array.isArray(arr) ? arr.map(sanitizeGoimon) : [];
  }

  function saveArchive(arr) {
    saveJson(getArchiveKey(), Array.isArray(arr) ? arr.map(sanitizeGoimon) : []);
  }

  function loadHomeUiState() {
    migrateLegacyDataIfNeeded();
    return loadJson(getHomeUiKey(), {
      archiveOpen: false,
      nicknameEditorOpen: false,
      dexOpen: false
    });
  }

  function saveHomeUiState(ui) {
    saveJson(getHomeUiKey(), Object.assign({
      archiveOpen: false,
      nicknameEditorOpen: false,
      dexOpen: false
    }, ui || {}));
  }

  function getLastEventState() {
    return loadJson(getLastEventKey(), {
      eventKey: "",
      speech: ""
    });
  }

  function setLastEventState(obj) {
    saveJson(getLastEventKey(), Object.assign({
      eventKey: "",
      speech: ""
    }, obj || {}));
  }

  function loadDexDiscovery() {
    const obj = loadJson(getDexDiscoveryKey(), {});
    return (obj && typeof obj === "object") ? obj : {};
  }

  function saveDexDiscovery(obj) {
    saveJson(getDexDiscoveryKey(), obj && typeof obj === "object" ? obj : {});
  }

  function markDiscovered(type, stage) {
    const discovery = loadDexDiscovery();
    discovery[`${type}:${stage}`] = true;
    saveDexDiscovery(discovery);
  }

  function isDiscovered(type, stage) {
    const discovery = loadDexDiscovery();
    return !!discovery[`${type}:${stage}`];
  }

  function getHallCount() {
    const n = loadJson(getHallCountKey(), 0);
    return Number.isFinite(Number(n)) ? Number(n) : 0;
  }

  function setHallCount(n) {
    saveJson(getHallCountKey(), Math.max(0, Number(n) || 0));
  }

  function incrementHallCount() {
    const n = getHallCount() + 1;
    setHallCount(n);
    return n;
  }

  function getRandomHomeSpeech(type) {
    if (window.GoimonDialogues && typeof window.GoimonDialogues.getLine === "function") {
      return window.GoimonDialogues.getLine(type, "idle") || "今日もいっしょに進もう。";
    }
    return "今日もいっしょに進もう。";
  }

  function getReactionSpeech(type, eventKey) {
    if (window.GoimonDialogues && typeof window.GoimonDialogues.getReaction === "function") {
      if (eventKey === "study") return window.GoimonDialogues.getReaction(type, "chie") || getRandomHomeSpeech(type);
      if (eventKey === "quiz_enja") return window.GoimonDialogues.getReaction(type, "chie") || getRandomHomeSpeech(type);
      if (eventKey === "quiz_jaen") return window.GoimonDialogues.getReaction(type, "kotoba") || getRandomHomeSpeech(type);
      if (eventKey === "accent") return window.GoimonDialogues.getReaction(type, "onkan") || getRandomHomeSpeech(type);
      if (eventKey === "sentence") return window.GoimonDialogues.getReaction(type, "bunmyaku") || getRandomHomeSpeech(type);
      if (eventKey === "audio_quiz") {
        return window.GoimonDialogues.getReaction(type, "onkan")
          || window.GoimonDialogues.getReaction(type, "chie")
          || getRandomHomeSpeech(type);
      }
    }
    return getRandomHomeSpeech(type);
  }

  function updateSpeechForEvent(eventKey) {
    const g = ensureCurrent();
    const speech = getReactionSpeech(g.type, eventKey);
    setLastEventState({ eventKey, speech });
    return speech;
  }

  function maybeSeedSpeech() {
    const last = getLastEventState();
    if (!last.speech) {
      const g = ensureCurrent();
      const speech = getRandomHomeSpeech(g.type);
      setLastEventState({ eventKey: "", speech });
    }
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
      topStat
    };

    if (window.GoimonRules && typeof window.GoimonRules.decideEvolutionType === "function") {
      return window.GoimonRules.decideEvolutionType(ctx);
    }

    return "nagomi";
  }

function determinePendingEvolution(g) {
  const currentStage = getStageFromLevel(g.level);
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

  function normalizePointDelta(deltaObj) {
    const base = getDefaultStats();
    const src = (deltaObj && typeof deltaObj === "object") ? deltaObj : {};
    for (const key of Object.keys(base)) {
      base[key] = roundPoint(Number(src[key] || 0));
    }
    return base;
  }

  function applyDeltaToGoimon(g, deltaObj, eventKey) {
    const delta = normalizePointDelta(deltaObj);

    g.stats.chie = roundPoint(Number(g.stats.chie || 0) + delta.chie);
    g.stats.kotoba = roundPoint(Number(g.stats.kotoba || 0) + delta.kotoba);
    g.stats.onkan = roundPoint(Number(g.stats.onkan || 0) + delta.onkan);
    g.stats.bunmyaku = roundPoint(Number(g.stats.bunmyaku || 0) + delta.bunmyaku);

    g.totalPoints = sumStats(g.stats);
    g.level = calculateLevel(g.totalPoints);
    g = determinePendingEvolution(g);
    g.stage = getStageFromLevel(g.level);
    if (!g.pendingEvolution) {
      g.imageKey = getImageFor(g.type, g.stage);
    }

    markDiscovered(g.type, g.stage);
    saveCurrent(g);

    if (eventKey) updateSpeechForEvent(eventKey);

    return g;
  }

  // 今後の新規モードはこれを直接使えばよい
  function addPoints(deltaObj, eventKey) {
    let g = ensureCurrent();
    return applyDeltaToGoimon(g, deltaObj, eventKey || "custom");
  }

  function addPointsByRuleKey(ruleKey) {
    const rule = POINT_RULES[ruleKey];
    if (!rule) return ensureCurrent();
    return addPoints(rule, ruleKey);
  }

  function confirmEvolution() {
    let g = ensureCurrent();
    if (!g.pendingEvolution) return g;

    g.stage = g.pendingStage || g.stage;
    g.type = g.pendingType || g.type;
    g.imageKey = g.pendingImageKey || getImageFor(g.type, g.stage);
    g.pendingEvolution = false;
    g.pendingStage = "";
    g.pendingType = "";
    g.pendingImageKey = "";
    g.level = calculateLevel(g.totalPoints);

    if (!Array.isArray(g.discoveredForms)) g.discoveredForms = [];
    if (!g.discoveredForms.includes(g.stage)) g.discoveredForms.push(g.stage);

    markDiscovered(g.type, g.stage);

    const dex = getDexEntry(g.type, g.stage);
    const speech = dex?.description || `${getBaseDisplayName(g.type, g.stage)} に進化した！`;
    setLastEventState({ eventKey: "evolution", speech });

    saveCurrent(g);
    renderHome();
    if (window.GoimonDexUI && typeof window.GoimonDexUI.renderTree === "function") {
      window.GoimonDexUI.renderTree();
    }

    return g;
  }

  function getEvolutionTheme(type) {
    switch (type) {
      case "hirameki":
        return {
          title: "あれ、鋭い光があふれている…！？",
          sub: "知性とひらめきが高まり、ゴイモンが新たな啓示を受けようとしています。",
          result: "知の光が新しい姿を形づくった！"
        };
      case "yomitoki":
        return {
          title: "あれ、ことばの紋が輝いている…！？",
          sub: "読む力と見抜く力が満ち、静かな進化の儀が始まろうとしています。",
          result: "解読の力が、新たな姿を呼び起こした！"
        };
      case "shirabe":
        return {
          title: "あれ、澄んだ響きが満ちている…！？",
          sub: "音と共鳴の力が高まり、神秘的な調べが鳴り始めています。",
          result: "澄んだ響きが、新しい姿へと導いた！"
        };
      case "tsumugi":
        return {
          title: "あれ、ことばの流れが舞っている…！？",
          sub: "ことばと感情の力が満ち、豊かな表現の姿へと近づいています。",
          result: "紡がれたことばが、新たな姿を描き出した！"
        };
      case "hibiki":
        return {
          title: "あれ、知と響きが共鳴している…！？",
          sub: "知性と音感が重なり、新しい共鳴の姿へ近づいています。",
          result: "共鳴する力が、新たな姿を呼び起こした！"
        };
      case "kotonoha":
        return {
          title: "あれ、ことばの葉が舞っている…！？",
          sub: "ことばと文脈の力が満ち、美しい言霊の姿へ近づいています。",
          result: "ことばの流れが、新たな姿を形づくった！"
        };
      case "mr_uno":
        return {
          title: "あれ、特別な気配がただよっている…！？",
          sub: "学びを導く特別ルートが開かれようとしています。",
          result: "特別な導きの力が、その身に宿った！"
        };
      case "nagomi":
      default:
        return {
          title: "あれ、やさしい光に包まれている…！？",
          sub: "学びの力がやわらかく満ち、ゴイモンが静かに進化の時を迎えています。",
          result: "やわらかな光が、新しい姿へと変えていく！"
        };
    }
  }

  function renderEvolutionNoticeButton(buttonId) {
    const btn = typeof buttonId === "string" ? document.getElementById(buttonId) : buttonId;
    if (!btn) return;
    const g = ensureCurrent();
    if (g.pendingEvolution) btn.classList.remove("hidden");
    else btn.classList.add("hidden");
  }

  function openEvolutionOverlay(opts) {
    const overlay = document.getElementById("evoOverlay");
    const beforeImg = document.getElementById("evoGoimonBefore");
    const afterImg = document.getElementById("evoGoimonAfter");
    const text1 = document.getElementById("evoText1");
    const text2 = document.getElementById("evoText2");
    const shock = document.getElementById("evoShock");
    const skipBtn = document.getElementById("evoSkipBtn");

    const g = ensureCurrent();
    if (!overlay || !beforeImg || !afterImg || !text1 || !text2 || !shock || !skipBtn || !g.pendingEvolution) {
      const after = confirmEvolution();
      if (opts && typeof opts.onComplete === "function") opts.onComplete(after);
      return;
    }

    const theme = getEvolutionTheme(g.pendingType || g.type);
    const finish = () => {
      const after = confirmEvolution();
      beforeImg.classList.add("evoHidden");
      afterImg.classList.remove("evoHidden");
      afterImg.src = after.imageKey;
      text1.classList.remove("evoHidden");
      text2.classList.remove("evoHidden");
      text2.textContent = `${getBaseDisplayName(after.type, after.stage)} に進化した！`;
      if (opts && typeof opts.onComplete === "function") opts.onComplete(after);
    };

    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));

    beforeImg.src = g.imageKey;
    beforeImg.classList.remove("evoHidden");
    afterImg.classList.add("evoHidden");
    afterImg.src = g.pendingImageKey || getImageFor(g.pendingType, g.pendingStage);
    text1.classList.add("evoHidden");
    text2.classList.add("evoHidden");
    text1.textContent = "✨進化！✨";
    text2.textContent = theme.result;

    shock.classList.remove("active");
    requestAnimationFrame(() => shock.classList.add("active"));

    let done = false;
    const closeOverlay = () => {
      overlay.classList.remove("show");
      setTimeout(() => overlay.classList.add("hidden"), 350);
      skipBtn.removeEventListener("click", onSkip);
    };
    const onSkip = () => {
      if (done) return;
      done = true;
      finish();
      closeOverlay();
    };

    skipBtn.addEventListener("click", onSkip);

    setTimeout(() => {
      if (done) return;
      done = true;
      finish();
      closeOverlay();
    }, 2200);
  }

  function bindEvolutionNoticeButton(buttonId, opts) {
    const btn = typeof buttonId === "string" ? document.getElementById(buttonId) : buttonId;
    if (!btn || btn.dataset.goimonBound === "1") return;
    btn.dataset.goimonBound = "1";
    btn.addEventListener("click", () => {
      openEvolutionOverlay(opts || {});
    });
  }

  function canNickname(g) {
    return g.stage !== "egg";
  }

  function getGenerationText(g) {
    return `第${Number(g.generation || 1)}世代`;
  }

  function getNextEvolutionProgress(g) {
    const stage = getStageFromLevel(g.level);
    const threshold = getNextThresholdForStage(stage);

    if (!threshold) {
      return {
        current: g.totalPoints,
        target: g.totalPoints,
        ratio: 1,
        text: "この姿が完成形です"
      };
    }

    const prevThreshold =
      stage === "egg" ? 0 :
      stage === "child" ? STAGE_POINT_THRESHOLDS.egg :
      stage === "growth" ? STAGE_POINT_THRESHOLDS.child :
      stage === "mid" ? STAGE_POINT_THRESHOLDS.growth : 0;

    const currentInStage = Math.max(0, Number(g.totalPoints) - prevThreshold);
    const targetInStage = Math.max(1, Number(threshold) - prevThreshold);
    const ratio = Math.max(0, Math.min(1, currentInStage / targetInStage));
    const remain = Math.max(0, threshold - Number(g.totalPoints));

    return {
      current: currentInStage,
      target: targetInStage,
      ratio,
      text: remain > 0 ? `次の進化まであと ${formatPoint(remain)} pt` : "進化できます！"
    };
  }

  function renderQuickCard(g) {
    const stageValue = document.getElementById("goimonStageValue");
    const miniImg = document.getElementById("goimonMiniImage");
    const typeName = document.getElementById("goimonTypeName");
    const levelText = document.getElementById("goimonLevelText");
    const subText = document.getElementById("goimonMiniSubText");
    const speech = document.getElementById("goimonSpeechText");

    if (stageValue) stageValue.textContent = getStageLabel(g.stage);
    if (miniImg) {
      miniImg.src = g.imageKey;
      miniImg.alt = getGoimonPrimaryName(g);
    }
    if (typeName) typeName.textContent = getGoimonPrimaryName(g);
    if (levelText) levelText.textContent = `Lv ${g.level} / ${formatPoint(g.totalPoints)} pt`;
    if (subText) {
      const dex = getDexEntry(g.type, g.stage);
      subText.textContent = dex?.description || getTypeDescription(g.type);
    }

    maybeSeedSpeech();
    const last = getLastEventState();
    if (speech) speech.textContent = last.speech || "今日もいっしょに進もう。";
  }

  function renderNicknamePromptCard(g) {
    const card = document.getElementById("goimonNicknamePromptCard");
    const input = document.getElementById("goimonNicknamePromptInput");
    if (!card || !input) return;

    const shouldShow = canNickname(g) && !g.nickname && g.stage === "child";
    card.classList.toggle("hidden", !shouldShow);
    input.value = "";
  }

  function renderHallBanner(g) {
    const card = document.getElementById("goimonHallBanner");
    const text = document.getElementById("goimonHallBannerText");
    if (!card || !text) return;

    const canHall = g.stage === "final";
    card.classList.toggle("hidden", !canHall);
    if (canHall) {
      text.textContent = "このゴイモンを殿堂入りさせると、保存して次の世代のたまごを育て始められます。";
    }
  }

  function isMrUnoUnlocked() {
    if (window.GoimonRules && typeof window.GoimonRules.isSpecialRouteUnlocked === "function") {
      return window.GoimonRules.isSpecialRouteUnlocked("mr_uno", {
        hallOfFameCount: getHallCount()
      });
    }
    return getHallCount() >= 2;
  }

  function renderSpecialRouteBanner(g) {
    const card = document.getElementById("goimonSpecialRouteBanner");
    const title = card?.querySelector(".goimonBannerTitle");
    const text = document.getElementById("goimonSpecialRouteText");
    const selectBtn = document.getElementById("goimonSelectMrUnoBtn");
    const clearBtn = document.getElementById("goimonClearSpecialRouteBtn");

    if (!card || !title || !text || !selectBtn || !clearBtn) return;

    const unlocked = isMrUnoUnlocked() && g.stage === "egg";
    card.classList.toggle("hidden", !unlocked);
    if (!unlocked) return;

    title.textContent = "？？？";
    selectBtn.textContent = "特別な道を選ぶ";
    clearBtn.textContent = "元に戻す";

    if (g.specialRoute === "mr_uno") {
      text.textContent = "何か特別な気配を選択中です。次の進化から反映されます。";
    } else {
      text.textContent = "何か特別な気配を感じる……。このたまごは、いつもと違う道を選べるようです。";
    }
  }

  function renderDetailSheet(g) {
    const detailName = document.getElementById("goimonDetailName");
    const detailDesc = document.getElementById("goimonDetailDesc");
    const growthText = document.getElementById("goimonGrowthText");
    const growthFill = document.getElementById("goimonGrowthBarFill");
    const growthSub = document.getElementById("goimonGrowthSub");
    const detailImage = document.getElementById("goimonDetailImage");
    const detailStage = document.getElementById("goimonDetailStage");
    const detailType = document.getElementById("goimonDetailType");
    const detailLevel = document.getElementById("goimonDetailLevel");
    const detailPoints = document.getElementById("goimonDetailPoints");
    const detailGeneration = document.getElementById("goimonDetailGeneration");
    const detailNickname = document.getElementById("goimonDetailNickname");

    const statChie = document.getElementById("goimonStatChie");
    const statKotoba = document.getElementById("goimonStatKotoba");
    const statOnkan = document.getElementById("goimonStatOnkan");
    const statBunmyaku = document.getElementById("goimonStatBunmyaku");

    const dex = getDexEntry(g.type, g.stage);
    const progress = getNextEvolutionProgress(g);

    if (detailName) detailName.textContent = getGoimonPrimaryName(g);
    if (detailDesc) detailDesc.textContent = dex?.description || getTypeDescription(g.type);
    if (growthText) growthText.textContent = progress.text;
    if (growthFill) growthFill.style.width = `${Math.round(progress.ratio * 100)}%`;
    if (growthSub) growthSub.textContent = `${formatPoint(progress.current)} / ${formatPoint(progress.target)} pt`;

    if (detailImage) {
      detailImage.src = g.imageKey;
      detailImage.alt = getGoimonPrimaryName(g);
    }
    if (detailStage) detailStage.textContent = getStageLabel(g.stage);
    if (detailType) detailType.textContent = getTypeLabel(g.type);
    if (detailLevel) detailLevel.textContent = String(g.level);
    if (detailPoints) detailPoints.textContent = `${formatPoint(g.totalPoints)} pt`;
    if (detailGeneration) detailGeneration.textContent = getGenerationText(g);
    if (detailNickname) detailNickname.textContent = g.nickname || "未設定";

    if (statChie) statChie.textContent = formatPoint(g.stats.chie);
    if (statKotoba) statKotoba.textContent = formatPoint(g.stats.kotoba);
    if (statOnkan) statOnkan.textContent = formatPoint(g.stats.onkan);
    if (statBunmyaku) statBunmyaku.textContent = formatPoint(g.stats.bunmyaku);
  }

  function renderNicknameEditor(g) {
    const wrap = document.getElementById("goimonNicknameEditorWrap");
    const guide = document.getElementById("goimonNicknameEditorGuide");
    const input = document.getElementById("goimonNicknameEditInput");

    if (!wrap || !guide || !input) return;

    const ui = loadHomeUiState();

    if (!canNickname(g)) {
      wrap.classList.add("hidden");
      return;
    }

    wrap.classList.toggle("hidden", !ui.nicknameEditorOpen);
    guide.textContent = "幼体以上になれば、いつでも名前をつけたり変えたりできます。";
    input.value = g.nickname || "";
  }

  function saveNicknameFromInput(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const value = String(input.value || "").trim().slice(0, 20);
    const g = ensureCurrent();
    if (!canNickname(g)) return;

    g.nickname = value;
    saveCurrent(g);
    renderHome();
  }

  function clearNickname() {
    const g = ensureCurrent();
    g.nickname = "";
    saveCurrent(g);
    renderHome();
  }

  function addToArchive(snapshot) {
    const archive = loadArchive();
    if (archive.length >= ARCHIVE_LIMIT) return false;
    archive.unshift(sanitizeGoimon(snapshot));
    saveArchive(archive);
    return true;
  }

  function buildEggForNextGeneration(prevGeneration) {
    const egg = getDefaultCurrent();
    egg.generation = Number(prevGeneration || 1) + 1;
    egg.id = `goimon_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    egg.createdAt = Date.now();
    egg.updatedAt = Date.now();
    return egg;
  }

  function saveAndStartNewEgg(options) {
    const g = ensureCurrent();
    const archive = loadArchive();
    if (archive.length >= ARCHIVE_LIMIT) {
      alert("保存箱が満杯です。先に保存箱の個体を削除してください。");
      return false;
    }

    const snapshot = deepClone(g);
    snapshot.hallOfFame = !!options?.hallOfFame;
    if (snapshot.hallOfFame) incrementHallCount();

    addToArchive(snapshot);

    const nextEgg = buildEggForNextGeneration(g.generation);
    saveCurrent(nextEgg);
    setLastEventState({ eventKey: "", speech: "新しいたまごとの学びが始まるよ。" });
    renderHome();
    if (window.GoimonDexUI && typeof window.GoimonDexUI.renderTree === "function") {
      window.GoimonDexUI.renderTree();
    }
    return true;
  }

  function cloneBranchCurrent() {
    const g = ensureCurrent();
    const archive = loadArchive();
    if (archive.length >= ARCHIVE_LIMIT) {
      alert("保存箱が満杯です。先に保存箱の個体を削除してください。");
      return false;
    }

    const clone = deepClone(g);
    clone.id = `goimon_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    clone.hallOfFame = false;
    clone.nickname = clone.nickname ? `${clone.nickname}の写し` : "";
    addToArchive(clone);
    renderHome();
    if (window.GoimonDexUI && typeof window.GoimonDexUI.renderTree === "function") {
      window.GoimonDexUI.renderTree();
    }
    return true;
  }

  function restoreArchiveItem(index) {
    const archive = loadArchive();
    if (!archive[index]) return;
    const current = ensureCurrent();
    const target = deepClone(archive[index]);
    target.hallOfFame = false;
    saveCurrent(target);
    archive.splice(index, 1);
    archive.unshift(current);
    saveArchive(archive);
    renderHome();
    if (window.GoimonDexUI && typeof window.GoimonDexUI.renderTree === "function") {
      window.GoimonDexUI.renderTree();
    }
  }

  function deleteArchiveItem(index) {
    const archive = loadArchive();
    if (!archive[index]) return;
    archive.splice(index, 1);
    saveArchive(archive);
    renderHome();
    if (window.GoimonDexUI && typeof window.GoimonDexUI.renderTree === "function") {
      window.GoimonDexUI.renderTree();
    }
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function renderArchive() {
    const archive = loadArchive();
    const summary = document.getElementById("goimonArchiveSummary");
    const list = document.getElementById("goimonArchiveList");
    const boxSummary = document.getElementById("goimonBoxSummary");
    const ui = loadHomeUiState();

    if (summary) {
      const hallCount = archive.filter(x => x.hallOfFame).length;
      summary.textContent = `保存箱：${archive.length}体 / 殿堂入り経験：${hallCount}体`;
    }

    if (boxSummary) {
      boxSummary.textContent = `現役1体 / 保存箱 ${archive.length}体 / 上限${ARCHIVE_LIMIT}体`;
    }

    if (!list) return;
    list.innerHTML = "";
    list.classList.toggle("hidden", !ui.archiveOpen);

    if (!ui.archiveOpen) return;

    if (archive.length === 0) {
      const empty = document.createElement("div");
      empty.className = "mutedSmall";
      empty.textContent = "保存箱は空です。";
      list.appendChild(empty);
      return;
    }

    archive.forEach((g, idx) => {
      const card = document.createElement("div");
      card.className = "archiveCard";

      const hallBadge = g.hallOfFame ? " / 殿堂入り" : "";
      card.innerHTML = `
        <div class="archiveImageWrap">
          <img src="${escapeHtml(g.imageKey)}" alt="${escapeHtml(getGoimonPrimaryName(g))}">
        </div>
        <div>
          <div class="archiveName">${escapeHtml(getGoimonPrimaryName(g))}</div>
          <div class="archiveMeta">
            ${escapeHtml(getTypeLabel(g.type))} / ${escapeHtml(getStageLabel(g.stage))} / Lv ${escapeHtml(String(g.level))}${escapeHtml(hallBadge)}<br>
            ${escapeHtml(getGenerationText(g))} / ${escapeHtml(formatPoint(g.totalPoints))} pt
          </div>
          <div class="archiveButtons">
            <button class="miniBtn blue" data-restore="${idx}">現役と入れ替える</button>
            <button class="miniBtn red" data-delete="${idx}">削除</button>
          </div>
        </div>
      `;
      list.appendChild(card);
    });

    list.querySelectorAll("[data-restore]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-restore"));
        restoreArchiveItem(idx);
      });
    });

    list.querySelectorAll("[data-delete]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-delete"));
        if (confirm("この個体を保存箱から削除しますか？")) {
          deleteArchiveItem(idx);
        }
      });
    });
  }

  function renderHome() {
    const g = ensureCurrent();
    markDiscovered(g.type, g.stage);

    renderQuickCard(g);
    renderNicknamePromptCard(g);
    renderHallBanner(g);
    renderSpecialRouteBanner(g);
    renderDetailSheet(g);
    renderNicknameEditor(g);
    renderArchive();
    renderEvolutionNoticeButton("evolutionNoticeBtn");
  }

  function bindHomeOnce() {
    if (document.body.dataset.goimonHomeBound === "1") return;
    document.body.dataset.goimonHomeBound = "1";

    const nicknamePromptSave = document.getElementById("saveGoimonNicknamePromptBtn");
    const nicknamePromptSkip = document.getElementById("skipGoimonNicknamePromptBtn");
    const hallBtn = document.getElementById("goimonHallOfFameBtn");
    const selectMrUnoBtn = document.getElementById("goimonSelectMrUnoBtn");
    const clearSpecialBtn = document.getElementById("goimonClearSpecialRouteBtn");
    const saveNewEggBtn = document.getElementById("goimonSaveAndNewEggBtn");
    const cloneBtn = document.getElementById("goimonCloneBranchBtn");
    const archiveToggleBtn = document.getElementById("openGoimonArchiveBtn");
    const saveNicknameEditBtn = document.getElementById("saveGoimonNicknameEditBtn");
    const clearNicknameEditBtn = document.getElementById("clearGoimonNicknameEditBtn");
    const toggleNicknameEditorBtn = document.getElementById("toggleGoimonNicknameEditorBtn");

    const openSheetBtn = document.getElementById("openGoimonSheetBtn");
    const closeSheetBtn = document.getElementById("closeGoimonSheet");
    const sheetBackdrop = document.getElementById("sheetBackdrop");
    const goimonSheet = document.getElementById("goimonSheet");

    const goimonImageBox = document.getElementById("goimonDetailImageBox");
    const zoomBackdrop = document.getElementById("goimonImageZoomBackdrop");
    const zoomModal = document.getElementById("goimonImageZoomModal");
    const zoomCloseBtn = document.getElementById("closeGoimonImageZoom");
    const zoomImg = document.getElementById("goimonImageZoomImg");
    const zoomTitle = document.getElementById("goimonImageZoomTitle");

    if (nicknamePromptSave) {
      nicknamePromptSave.addEventListener("click", () => {
        saveNicknameFromInput("goimonNicknamePromptInput");
      });
    }

    if (nicknamePromptSkip) {
      nicknamePromptSkip.addEventListener("click", () => {
        const g = ensureCurrent();
        setLastEventState({
          eventKey: "",
          speech: `${getBaseDisplayName(g.type, g.stage)} はうれしそうにこちらを見ている。`
        });
        renderHome();
      });
    }

    if (hallBtn) {
      hallBtn.addEventListener("click", () => {
        saveAndStartNewEgg({ hallOfFame: true });
      });
    }

    if (selectMrUnoBtn) {
      selectMrUnoBtn.addEventListener("click", () => {
        if (!isMrUnoUnlocked()) return;
        const g = ensureCurrent();
        if (g.stage !== "egg") return;
        g.specialRoute = "mr_uno";
        saveCurrent(g);
        setLastEventState({ eventKey: "", speech: "何か特別な気配が、このたまごに宿っている……。" });
        renderHome();
      });
    }

    if (clearSpecialBtn) {
      clearSpecialBtn.addEventListener("click", () => {
        const g = ensureCurrent();
        g.specialRoute = "";
        saveCurrent(g);
        renderHome();
      });
    }

    if (saveNewEggBtn) {
      saveNewEggBtn.addEventListener("click", () => {
        saveAndStartNewEgg({ hallOfFame: false });
      });
    }

    if (cloneBtn) {
      cloneBtn.addEventListener("click", () => {
        cloneBranchCurrent();
      });
    }

    if (archiveToggleBtn) {
      archiveToggleBtn.addEventListener("click", () => {
        const ui = loadHomeUiState();
        ui.archiveOpen = !ui.archiveOpen;
        saveHomeUiState(ui);
        renderArchive();
      });
    }

    if (toggleNicknameEditorBtn) {
      toggleNicknameEditorBtn.addEventListener("click", () => {
        const g = ensureCurrent();
        if (!canNickname(g)) {
          alert("ニックネームは幼体以上になってから付けられます。");
          return;
        }
        const ui = loadHomeUiState();
        ui.nicknameEditorOpen = !ui.nicknameEditorOpen;
        saveHomeUiState(ui);
        renderNicknameEditor(g);
      });
    }

    if (saveNicknameEditBtn) {
      saveNicknameEditBtn.addEventListener("click", () => {
        saveNicknameFromInput("goimonNicknameEditInput");
      });
    }

    if (clearNicknameEditBtn) {
      clearNicknameEditBtn.addEventListener("click", () => {
        clearNickname();
      });
    }

    function openSheet() {
      if (!sheetBackdrop || !goimonSheet) return;
      sheetBackdrop.classList.add("show");
      goimonSheet.classList.add("show");
      goimonSheet.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeSheet() {
      if (!sheetBackdrop || !goimonSheet) return;
      closeZoom();
      sheetBackdrop.classList.remove("show");
      goimonSheet.classList.remove("show");
      goimonSheet.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    function openZoom() {
      const detailImg = document.getElementById("goimonDetailImage");
      const detailName = document.getElementById("goimonDetailName");
      if (!zoomBackdrop || !zoomModal || !zoomImg || !detailImg) return;
      zoomImg.src = detailImg.src;
      zoomImg.alt = detailImg.alt || "ゴイモン拡大画像";
      if (zoomTitle) zoomTitle.textContent = `${detailName?.textContent || "ゴイモン"} を拡大表示`;
      zoomBackdrop.classList.add("show");
      zoomModal.classList.add("show");
      zoomModal.setAttribute("aria-hidden", "false");
    }

    function closeZoom() {
      if (!zoomBackdrop || !zoomModal) return;
      zoomBackdrop.classList.remove("show");
      zoomModal.classList.remove("show");
      zoomModal.setAttribute("aria-hidden", "true");
    }

    if (openSheetBtn) openSheetBtn.addEventListener("click", openSheet);
    if (closeSheetBtn) closeSheetBtn.addEventListener("click", closeSheet);
    if (sheetBackdrop) sheetBackdrop.addEventListener("click", closeSheet);

    if (goimonImageBox) {
      goimonImageBox.addEventListener("click", openZoom);
      goimonImageBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openZoom();
        }
      });
    }

    if (zoomCloseBtn) zoomCloseBtn.addEventListener("click", closeZoom);
    if (zoomBackdrop) zoomBackdrop.addEventListener("click", closeZoom);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeZoom();
      }
    });
  }

  function initHomeActions() {
    bindHomeOnce();
  }

  // 既存ページ互換API
  function addStudyProgress() {
    return addPointsByRuleKey("study");
  }

  function addQuizEnJaCorrect() {
    return addPointsByRuleKey("quiz_enja");
  }

  function addQuizJaEnCorrect() {
    return addPointsByRuleKey("quiz_jaen");
  }

  function addSentenceCorrect() {
    return addPointsByRuleKey("sentence");
  }

  function addAccentCorrect() {
    return addPointsByRuleKey("accent");
  }

  function addAudioMeaningCorrect() {
    return addPointsByRuleKey("audio_quiz");
  }

  function renderAllMiniHooks() {
    try { if (typeof window.renderQuizGoimonMini === "function") window.renderQuizGoimonMini(); } catch {}
    try { if (typeof window.renderSentenceGoimonMini === "function") window.renderSentenceGoimonMini(); } catch {}
    try { if (typeof window.renderAccentGoimonMini === "function") window.renderAccentGoimonMini(); } catch {}
    try { if (typeof window.renderAudioGoimonMini === "function") window.renderAudioGoimonMini(); } catch {}
    try { if (typeof window.renderAudioQuizGoimonMini === "function") window.renderAudioQuizGoimonMini(); } catch {}
  }

  function rerenderEverywhere() {
    renderHome();
    renderAllMiniHooks();
    renderEvolutionNoticeButton("evolutionNoticeBtn");
    if (window.GoimonDexUI && typeof window.GoimonDexUI.renderTree === "function") {
      window.GoimonDexUI.renderTree();
    }
  }

  migrateLegacyDataIfNeeded();
  maybeSeedSpeech();
  ensureCurrent();
  markDiscovered("nagomi", "egg");

  return {
    ensureCurrent,
    loadCurrent,
    saveCurrent,
    loadArchive,
    saveArchive,

    formatPoint,
    getStageLabel,
    getTypeLabel,
    getBaseDisplayName,
    getDisplayName: getBaseDisplayName,
    getDisplayDescription,
    getGoimonPrimaryName,
    getImageFor,

    // 新しい集約API
    addPoints,
    addPointsByRuleKey,

    // 既存互換API
    addStudyProgress,
    addQuizEnJaCorrect,
    addQuizJaEnCorrect,
    addSentenceCorrect,
    addAccentCorrect,
    addAudioMeaningCorrect,

    confirmEvolution,
    openEvolutionOverlay,
    bindEvolutionNoticeButton,
    renderEvolutionNoticeButton,

    renderHome,
    initHomeActions,
    rerenderEverywhere,

    updateSpeechForEvent,

    getHallCount,
    isDiscovered,
    getDexEntry
  };
})();

window.GoimonDexUI = (function () {
  "use strict";

  function normalizeStage(stage) {
    const s = String(stage || "egg").toLowerCase();
    if (s === "egg") return "egg";
    if (s === "child" || s === "baby" || s === "young") return "child";
    if (s === "growth" || s === "grown" || s === "stage2") return "growth";
    if (s === "mid" || s === "middle" || s === "stage3") return "mid";
    if (s === "final" || s === "last" || s === "stage4" || s === "ultimate") return "final";
    return s;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function getCurrentGoimon() {
    if (window.GoimonUI && typeof window.GoimonUI.ensureCurrent === "function") {
      return window.GoimonUI.ensureCurrent();
    }
    return null;
  }

  function getCurrentSpecies() {
    const g = getCurrentGoimon();
    if (!g) return "";
    return g.type || g.species || "";
  }

  function getCurrentStage() {
    const g = getCurrentGoimon();
    if (!g) return "egg";
    return normalizeStage(g.stage || "egg");
  }

  function isUnlocked(speciesKey, stageKey) {
    if (stageKey === "egg") return true;
    if (!window.GoimonUI || typeof window.GoimonUI.isDiscovered !== "function") return false;
    return !!window.GoimonUI.isDiscovered(speciesKey, stageKey);
  }

  function getUnlockHint(speciesKey, stageKey) {
    if (window.GoimonRules && typeof window.GoimonRules.getUnlockHint === "function") {
      return window.GoimonRules.getUnlockHint(speciesKey, stageKey);
    }
    return "学習を進めると解放されます";
  }

  function setDexEntryEmpty() {
    const empty = document.getElementById("goimonDexEntryEmpty");
    const body = document.getElementById("goimonDexEntryBody");
    if (empty) empty.classList.remove("hidden");
    if (body) body.classList.add("hidden");
  }

  function renderDexEntry(speciesKey, stageKey, unlocked) {
    const empty = document.getElementById("goimonDexEntryEmpty");
    const body = document.getElementById("goimonDexEntryBody");
    const stageEl = document.getElementById("goimonDexEntryStage");
    const nameEl = document.getElementById("goimonDexEntryName");
    const typeEl = document.getElementById("goimonDexEntryType");
    const textEl = document.getElementById("goimonDexEntryText");
    const unlockEl = document.getElementById("goimonDexEntryUnlock");
    const imgEl = document.getElementById("goimonDexEntryImage");

    if (!empty || !body || !stageEl || !nameEl || !typeEl || !textEl || !unlockEl || !imgEl) return;

    empty.classList.add("hidden");
    body.classList.remove("hidden");

    if (stageKey === "egg") {
      const egg = window.GOIMON_DEX?.common?.egg || {};
      stageEl.textContent = window.GoimonDex?.getStageLabel("egg") || "たまご";
      nameEl.textContent = egg.name || "ふしぎなたまご";
      typeEl.textContent = egg.typeLabel || "共通";
      textEl.textContent = egg.description || "";
      unlockEl.textContent = "解放済み";
      imgEl.src = egg.image || "images/goimon/goimon_egg.png";
      imgEl.alt = egg.name || "ふしぎなたまご";
      return;
    }

    const speciesData = window.GoimonDex?.getSpecies(speciesKey);
    const entry = window.GoimonDex?.getEntry(speciesKey, stageKey);
    const stageLabel = window.GoimonDex?.getStageLabel(stageKey) || stageKey;

    stageEl.textContent = stageLabel;
    typeEl.textContent = speciesData?.label || "？？？系";

    if (!unlocked) {
      const hint = getUnlockHint(speciesKey, stageKey);
      nameEl.textContent = "？？？";
      textEl.textContent = `まだ未解放の個体です。解放条件：${hint}`;
      unlockEl.textContent = `未解放（条件：${hint}）`;
      imgEl.src = "images/goimon/goimon_egg.png";
      imgEl.alt = "未解放";
      return;
    }

    nameEl.textContent = entry?.name || "名称未設定";
    textEl.textContent = entry?.description || "";
    unlockEl.textContent = "解放済み";
    imgEl.src = entry?.image || "images/goimon/goimon_egg.png";
    imgEl.alt = entry?.name || "図鑑画像";
  }

  function buildEggNodeHtml(currentSpecies, currentStage) {
    const egg = window.GOIMON_DEX?.common?.egg || {};
    const isActive = !currentSpecies || currentStage === "egg";

    return `
      <div class="goimonDexBranch">
        <div class="goimonDexBranchTitle">共通</div>
        <div class="goimonDexStages">
          <div class="goimonDexStageRow">
            <div class="goimonDexNode clickable ${isActive ? "active" : ""}" data-species="" data-stage="egg" data-unlocked="1">
              <div class="goimonDexNodeImgWrap">
                <img src="${escapeHtml(egg.image || 'images/goimon/goimon_egg.png')}" alt="${escapeHtml(egg.name || 'たまご')}">
              </div>
              <div class="goimonDexNodeStage">たまご</div>
              <div class="goimonDexNodeName">${escapeHtml(egg.name || "ふしぎなたまご")}</div>
              <div class="goimonDexNodeType">共通</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function buildSpeciesBranchHtml(speciesKey, currentSpecies, currentStage) {
    const speciesData = window.GoimonDex?.getSpecies(speciesKey);
    if (!speciesData) return "";

    const stages = ["child", "growth", "mid", "final"];
    let rowHtml = "";

    for (const stageKey of stages) {
      const unlocked = isUnlocked(speciesKey, stageKey);
      const current = currentSpecies === speciesKey && currentStage === stageKey;
      const entry = window.GoimonDex?.getEntry(speciesKey, stageKey);

      const name = unlocked ? (entry?.name || "名称未設定") : "？？？";
      const typeLabel = speciesData?.label || "？？？系";
      const stageLabel = window.GoimonDex?.getStageLabel(stageKey) || stageKey;

      const imageHtml = unlocked
        ? `<img src="${escapeHtml(entry?.image || "images/goimon/goimon_egg.png")}" alt="${escapeHtml(name)}">`
        : `<div style="font-size:28px;font-weight:800;color:#888;line-height:1;">？</div>`;

      rowHtml += `
        <div class="goimonDexNode clickable ${unlocked ? "" : "locked"} ${current ? "active" : ""}"
             data-species="${escapeHtml(speciesKey)}"
             data-stage="${escapeHtml(stageKey)}"
             data-unlocked="${unlocked ? "1" : "0"}">
          <div class="goimonDexNodeImgWrap">
            ${imageHtml}
          </div>
          <div class="goimonDexNodeStage">${escapeHtml(stageLabel)}</div>
          <div class="goimonDexNodeName">${escapeHtml(name)}</div>
          <div class="goimonDexNodeType">${escapeHtml(typeLabel)}</div>
        </div>
      `;
    }

    return `
      <div class="goimonDexBranch">
        <div class="goimonDexBranchTitle">${escapeHtml(speciesData?.label || speciesKey)}</div>
        <div class="goimonDexStages">
          <div class="goimonDexStageRow">
            ${rowHtml}
          </div>
        </div>
      </div>
    `;
  }

  function bindDexNodeEvents() {
    const nodes = document.querySelectorAll(".goimonDexNode.clickable");
    nodes.forEach(node => {
      node.addEventListener("click", () => {
        document.querySelectorAll(".goimonDexNode.active").forEach(el => {
          el.classList.remove("active");
        });
        node.classList.add("active");

        const species = node.dataset.species || "";
        const stage = node.dataset.stage || "egg";
        const unlocked = node.dataset.unlocked === "1";
        renderDexEntry(species, stage, unlocked);
      });
    });
  }

  function renderTree() {
    const tree = document.getElementById("goimonDexTree");
    if (!tree || !window.GoimonDex || !window.GOIMON_DEX) return;

    const currentSpecies = getCurrentSpecies();
    const currentStage = getCurrentStage();

    let order = window.GoimonDex.getSpeciesOrder();

    const mrUnoDiscovered =
      isUnlocked("mr_uno", "child") ||
      isUnlocked("mr_uno", "growth") ||
      isUnlocked("mr_uno", "mid") ||
      isUnlocked("mr_uno", "final");

    if (!mrUnoDiscovered && currentSpecies !== "mr_uno") {
      order = order.filter(speciesKey => speciesKey !== "mr_uno");
    }

    let html = "";
    html += buildEggNodeHtml(currentSpecies, currentStage);

    for (const speciesKey of order) {
      html += buildSpeciesBranchHtml(speciesKey, currentSpecies, currentStage);
    }

    tree.innerHTML = html;
    bindDexNodeEvents();

    if (currentSpecies && currentStage !== "egg" && isUnlocked(currentSpecies, currentStage)) {
      renderDexEntry(currentSpecies, currentStage, true);
    } else {
      setDexEntryEmpty();
    }
  }

  return {
    init() {
      renderTree();
    },
    renderTree
  };
})();
