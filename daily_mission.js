// daily_mission.js
// 読み取り専用のミッション試作エンジン。
// 学習ログ・ゴイモン能力・D1・星残高は一切書き換えない。
(function () {
  "use strict";
  const PREFIX = "goimon_daily_missions_v1";
  const rules = window.GOIMON_DAILY_MISSION_RULES;
  if (!rules) return;

  function tokyoDateKey(date) {
    // Existing learning_log.js uses device-local calendar dates. Match it until synchronization is unified.
    const d = date || new Date();
    const pad = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }

  function activeLevel() {
    return localStorage.getItem("zensho_level_v1") === "2" ? "2" : "1";
  }
  function key(level, dateKey) {
    return [PREFIX, "lv" + level, dateKey].join("_");
  }
  function allowed(category, level) {
    return !!window.LearningCategories?.isAvailableForLevel(category, level);
  }
  function previousCount(category, level) {
    const total = window.ZenshoLearningLog?.getCategorySummary?.(category, 7, level);
    if (total && typeof total === "object") return Number(total.attempt || 0);
    return 0;
  }
  function selectMissions(level) {
    const used = new Set();
    return rules.missionSlots.map((slot) => {
      const possible = slot.candidates.filter(c => allowed(c.category, level) && !used.has(c.category));
      if (!possible.length) return null;
      // 直近の実施状況で安定して候補を選ぶ。無記録なら定義順。
      const ranked = possible.map((c,i) => ({c,i,n:previousCount(c.category,level)}))
        .sort((a,b) => a.n-b.n || a.i-b.i);
      const picked = ranked[0].c;
      used.add(picked.category);
      return {
        id:slot.slot + ":" + picked.category,
        slot:slot.slot, category:picked.category,
        metric:picked.metric, target:picked.target,
        rewardStars:slot.rewardStars
      };
    }).filter(Boolean);
  }
  function getOrCreate(level = activeLevel(), dateKey = tokyoDateKey()) {
    const storageKey = key(level, dateKey);
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved?.version === rules.version && saved.date === dateKey && saved.level === level && Array.isArray(saved.missions) && saved.missions.length === rules.missionSlots.length) return saved;
    } catch (_) {}
    const fresh = { version:rules.version, date:dateKey, level,
      missions:selectMissions(level), createdAt:new Date().toISOString() };
    try { localStorage.setItem(storageKey, JSON.stringify(fresh)); } catch (_) {}
    return fresh;
  }
  function getStatus(level = activeLevel(), dateKey = tokyoDateKey()) {
    const daily = getOrCreate(level,dateKey);
    const day = window.ZenshoLearningLog?.getDay?.(dateKey, level) || {};
    const missions = daily.missions.map(m => {
      const count = Math.max(0, Number(day[m.category]?.[m.metric] || 0));
      return { ...m, progress:Math.min(m.target,count), completed:count >= m.target,
        label:window.LearningCategories?.getCategoryLabel(m.category) || m.category };
    });
    return { date:dateKey, level, missions,
      completedCount:missions.filter(m=>m.completed).length,
      totalCount:missions.length,
      // 報酬は見積表示のみ。正式な星付与はクラウド同期完成後。
      pendingStarEstimate:missions.filter(m=>m.completed).reduce((s,m)=>s+m.rewardStars,0)
        + (missions.length===3 && missions.every(m=>m.completed) ? rules.allClearBonusStars:0)
    };
  }
  window.GoimonDailyMissions = Object.freeze({
    tokyoDateKey, selectMissions, getOrCreate, getStatus
  });
})();
