// learning_log.js
// ゴイモン v1.1 共通学習ログ
// - 級ごとに保存
// - 日付ごと・カテゴリごとに attempt / correct / wrong を記録
// - 正誤なしの学習にも対応
// - ホーム / 進捗 / 今日のおすすめ から共通利用可能

(function () {
  "use strict";

  const LEVEL_KEY = "zensho_level_v1";
  const LOG_BASE_KEY = "zensho_learning_log_v1";

  function getLevel() {
    return String(localStorage.getItem(LEVEL_KEY) || "1");
  }

  function keyFor(base, level) {
    const lv = String(level || getLevel());
    return `${base}_lv${lv}`;
  }

  function logKey(level) {
    return keyFor(LOG_BASE_KEY, level);
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function formatDateKey(date) {
    const d = date instanceof Date ? date : new Date(date);

    return (
      `${d.getFullYear()}-` +
      `${pad2(d.getMonth() + 1)}-` +
      `${pad2(d.getDate())}`
    );
  }

  function todayKey() {
    return formatDateKey(new Date());
  }

  function dateKeyByOffset(offset) {
    const d = new Date();
    d.setDate(d.getDate() - Number(offset || 0));
    return formatDateKey(d);
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

  function safeSave(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  function normalizeLogRoot(value) {
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : {};
  }

  function normalizeSlot(value) {
    const slot =
      value && typeof value === "object" && !Array.isArray(value)
        ? value
        : {};

    return {
      attempt: Math.max(0, Number(slot.attempt || 0)),
      correct: Math.max(0, Number(slot.correct || 0)),
      wrong: Math.max(0, Number(slot.wrong || 0))
    };
  }

  function readLog(level) {
    return normalizeLogRoot(
      safeParse(logKey(level))
    );
  }

  function saveLog(log, level) {
    safeSave(
      logKey(level),
      normalizeLogRoot(log)
    );
  }

  function ensureDay(log, dayKey) {
    if (!log[dayKey] || typeof log[dayKey] !== "object") {
      log[dayKey] = {};
    }

    return log[dayKey];
  }

  function ensureSlot(log, dayKey, category) {
    const day = ensureDay(log, dayKey);

    day[category] = normalizeSlot(day[category]);

    return day[category];
  }

  function isKnownCategory(category) {
    if (!category) return false;

    if (
      window.LearningCategories &&
      typeof window.LearningCategories.getCategory === "function"
    ) {
      return !!window.LearningCategories.getCategory(category);
    }

    // learning_categories.js が未読み込みでも、
    // 既存ページを壊さないため category があれば許可する
    return true;
  }

  // --------------------------------
  // 正誤あり学習
  // --------------------------------

  function addResult(category, isCorrect, options) {
    if (!category) return false;

    if (!isKnownCategory(category)) {
      console.warn(
        `[LearningLog] 未登録カテゴリです: ${category}`
      );
    }

    const opts = options || {};
    const level = String(opts.level || getLevel());
    const dayKey = String(opts.dayKey || todayKey());

    const log = readLog(level);
    const slot = ensureSlot(log, dayKey, category);

    slot.attempt += 1;

    if (isCorrect === true) {
      slot.correct += 1;
    } else if (isCorrect === false) {
      slot.wrong += 1;
    }

    saveLog(log, level);
    return true;
  }

  // --------------------------------
  // 正誤なし学習
  // --------------------------------

  function addAttempt(category, amount, options) {
    if (!category) return false;

    if (!isKnownCategory(category)) {
      console.warn(
        `[LearningLog] 未登録カテゴリです: ${category}`
      );
    }

    const opts = options || {};
    const level = String(opts.level || getLevel());
    const dayKey = String(opts.dayKey || todayKey());

    const addCount = Math.max(
      0,
      Number(amount == null ? 1 : amount)
    );

    if (addCount <= 0) return false;

    const log = readLog(level);
    const slot = ensureSlot(log, dayKey, category);

    slot.attempt += addCount;

    saveLog(log, level);
    return true;
  }

  // --------------------------------
  // 任意の件数をまとめて加算
  // --------------------------------

  function addCounts(category, counts, options) {
    if (!category) return false;

    const opts = options || {};
    const level = String(opts.level || getLevel());
    const dayKey = String(opts.dayKey || todayKey());

    const attempt = Math.max(0, Number(counts?.attempt || 0));
    const correct = Math.max(0, Number(counts?.correct || 0));
    const wrong = Math.max(0, Number(counts?.wrong || 0));

    if (attempt === 0 && correct === 0 && wrong === 0) {
      return false;
    }

    const log = readLog(level);
    const slot = ensureSlot(log, dayKey, category);

    slot.attempt += attempt;
    slot.correct += correct;
    slot.wrong += wrong;

    saveLog(log, level);
    return true;
  }

  // --------------------------------
  // 1日のカテゴリ別記録
  // --------------------------------

  function getDay(dayKey, level) {
    const log = readLog(level);
    const day = log[dayKey];

    if (!day || typeof day !== "object") {
      return {};
    }

    const result = {};

    Object.entries(day).forEach(([category, slot]) => {
      result[category] = normalizeSlot(slot);
    });

    return result;
  }

  function getToday(level) {
    return getDay(todayKey(), level);
  }

  // --------------------------------
  // 期間集計
  // --------------------------------

  function getSummary(days, level) {
    const lv = String(level || getLevel());
    const countDays = Math.max(
      1,
      Math.floor(Number(days || 7))
    );

    const log = readLog(lv);
    const byCategory = {};

    let totalAttempt = 0;
    let totalCorrect = 0;
    let totalWrong = 0;

    for (let i = 0; i < countDays; i++) {
      const dayKey = dateKeyByOffset(i);
      const day = log[dayKey];

      if (!day || typeof day !== "object") continue;

      Object.entries(day).forEach(([category, rawSlot]) => {
        const slot = normalizeSlot(rawSlot);

        if (!byCategory[category]) {
          byCategory[category] = {
            attempt: 0,
            correct: 0,
            wrong: 0
          };
        }

        byCategory[category].attempt += slot.attempt;
        byCategory[category].correct += slot.correct;
        byCategory[category].wrong += slot.wrong;

        totalAttempt += slot.attempt;
        totalCorrect += slot.correct;
        totalWrong += slot.wrong;
      });
    }

    const accuracy =
      totalCorrect + totalWrong > 0
        ? Math.round(
            (totalCorrect / (totalCorrect + totalWrong)) * 100
          )
        : null;

    Object.keys(byCategory).forEach(category => {
      const slot = byCategory[category];
      const judged = slot.correct + slot.wrong;

      slot.accuracy =
        judged > 0
          ? Math.round((slot.correct / judged) * 100)
          : null;
    });

    return {
      level: lv,
      days: countDays,
      totalAttempt,
      totalCorrect,
      totalWrong,
      accuracy,
      byCategory
    };
  }

  // --------------------------------
  // カテゴリ単位の期間集計
  // --------------------------------

  function getCategorySummary(category, days, level) {
    const summary = getSummary(days, level);

    return {
      category,
      ...(summary.byCategory[category] || {
        attempt: 0,
        correct: 0,
        wrong: 0,
        accuracy: null
      })
    };
  }

  // --------------------------------
  // 最近取り組んだ日
  // --------------------------------

  function getLastStudyDate(category, level) {
    const log = readLog(level);
    const keys = Object.keys(log)
      .filter(key => /^\d{4}-\d{2}-\d{2}$/.test(key))
      .sort()
      .reverse();

    for (const dayKey of keys) {
      const day = log[dayKey];

      if (!day || typeof day !== "object") continue;

      if (category) {
        const slot = normalizeSlot(day[category]);

        if (slot.attempt > 0) {
          return dayKey;
        }
      } else {
        const hasAttempt = Object.values(day).some(rawSlot => {
          return normalizeSlot(rawSlot).attempt > 0;
        });

        if (hasAttempt) {
          return dayKey;
        }
      }
    }

    return null;
  }

  // --------------------------------
  // カテゴリ別「最近何日やっていないか」
  // --------------------------------

  function getDaysSinceLastStudy(category, level) {
    const last = getLastStudyDate(category, level);

    if (!last) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastDate = new Date(`${last}T00:00:00`);

    const diff = today.getTime() - lastDate.getTime();

    return Math.max(
      0,
      Math.floor(diff / (1000 * 60 * 60 * 24))
    );
  }

  // --------------------------------
  // 指定カテゴリを削除
  // --------------------------------

  function clearCategory(category, level) {
    const lv = String(level || getLevel());
    const log = readLog(lv);

    let changed = false;

    Object.keys(log).forEach(dayKey => {
      const day = log[dayKey];

      if (
        day &&
        typeof day === "object" &&
        Object.prototype.hasOwnProperty.call(day, category)
      ) {
        delete day[category];
        changed = true;
      }

      if (
        day &&
        typeof day === "object" &&
        Object.keys(day).length === 0
      ) {
        delete log[dayKey];
      }
    });

    if (changed) {
      saveLog(log, lv);
    }

    return changed;
  }

  // --------------------------------
  // 級ごとの学習ログ全削除
  // --------------------------------

  function clearAll(level) {
    localStorage.removeItem(
      logKey(level)
    );
  }

  // --------------------------------
  // 旧API互換
  // --------------------------------

  function zenshoLogAdd(category, correctBool) {
    return addResult(category, correctBool);
  }

  // 正誤なし学習用
  function zenshoLogAttempt(category, amount) {
    return addAttempt(category, amount);
  }

  // --------------------------------
  // 公開API
  // --------------------------------

  window.zenshoLogAdd = zenshoLogAdd;
  window.zenshoLogAttempt = zenshoLogAttempt;

  window.ZenshoLearningLog = {
    getLevel,
    todayKey,
    dateKeyByOffset,

    readLog,
    getDay,
    getToday,

    addResult,
    addAttempt,
    addCounts,

    getSummary,
    getCategorySummary,
    getLastStudyDate,
    getDaysSinceLastStudy,

    clearCategory,
    clearAll
  };
})();
