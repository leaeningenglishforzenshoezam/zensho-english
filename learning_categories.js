// learning_categories.js
// ゴイモン v1.1 共通学習カテゴリ定義
// 学習ログ・進捗・今日のおすすめ・ゴイモン連携で共通利用する

(function () {
  "use strict";

  const CATEGORIES = {
    study: {
      key: "study",
      label: "単語を覚える",
      shortLabel: "暗記",
      group: "vocabulary",
      page: "study.html",
      levels: ["1", "2"],

      abilities: {
        chie: 0.1
      },

      hasCorrectWrong: false,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: false
    },

    quiz_enja: {
      key: "quiz_enja",
      label: "英語→日本語",
      shortLabel: "英→日",
      group: "vocabulary",
      page: "quiz.html",
      levels: ["1", "2"],

      abilities: {
        chie: 1
      },

      hasCorrectWrong: true,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: true
    },

    quiz_jaen: {
      key: "quiz_jaen",
      label: "日本語→英語",
      shortLabel: "日→英",
      group: "vocabulary",
      page: "quiz_jaen.html",
      levels: ["1", "2"],

      abilities: {
        kotoba: 1
      },

      hasCorrectWrong: true,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: true
    },

    audio_quiz: {
      key: "audio_quiz",
      label: "音声→意味",
      shortLabel: "音声→意味",
      group: "sound",
      page: "audio_quiz.html",
      levels: ["1", "2"],

      abilities: {
        chie: 0.5,
        onkan: 0.5
      },

      hasCorrectWrong: true,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: true
    },

    idiom_quiz: {
      key: "idiom_quiz",
      label: "イディオム",
      shortLabel: "イディオム",
      group: "vocabulary",
      page: "idiom_quiz.html",
      levels: ["1"],

      abilities: {
        chie: 0.5,
        kotoba: 0.5
      },

      hasCorrectWrong: true,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: true
    },

    listening: {
      key: "listening",
      label: "リスニング",
      shortLabel: "リスニング",
      group: "sound",
      page: "listening.html",
      levels: ["1"],

      abilities: {
        onkan: 1
      },

      hasCorrectWrong: true,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: true
    },

    accent: {
      key: "accent",
      label: "大問1 アクセント",
      shortLabel: "大問1",
      group: "sound",
      page: "accent.html",
      levels: ["1", "2"],

      abilities: {
        onkan: 1
      },

      hasCorrectWrong: true,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: true
    },

    dialogue8: {
      key: "dialogue8",
      label: "大問8 会話文空欄補充",
      shortLabel: "大問8",
      group: "exam",
      page: "dialogue.html",
      levels: ["1"],

      abilities: {
        bunmyaku: 1
      },

      pointAwardMode: "perfect_set",

      hasCorrectWrong: true,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: false
    },

    sentence: {
      key: "sentence",
      label: "大問9 短文空欄補充",
      shortLabel: "大問9",
      group: "exam",
      page: "sentence.html",
      levels: ["1", "2"],

      abilities: {
        bunmyaku: 1
      },

      hasCorrectWrong: true,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: true
    },

    q10: {
      key: "q10",
      label: "大問10 長文空欄補充",
      shortLabel: "大問10",
      group: "exam",
      page: "q10.html",
      levels: ["1"],

      abilities: {
        bunmyaku: 1
      },

      pointAwardMode: "perfect_set",

      hasCorrectWrong: true,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: true
    },

    paraphrase_quiz: {
      key: "paraphrase_quiz",
      label: "大問11 言い換え",
      shortLabel: "大問11",
      group: "exam",
      page: "paraphrase_quiz.html",
      levels: ["1"],

      abilities: {
        kotoba: 0.5,
        bunmyaku: 0.5
      },

      hasCorrectWrong: true,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: true
    },

    reorder: {
      key: "reorder",
      label: "大問12 語句整序",
      shortLabel: "大問12",
      group: "exam",
      page: "reorder.html",
      levels: ["1"],

      abilities: {
        bunmyaku: 0.5
      },

      bonusAbilitySelectable: true,
      bonusAbilityPoint: 1.5,

      hasCorrectWrong: true,
      useLearningLog: true,
      useProgress: true,
      useRecommendation: true,
      useWeakness: true
    }
  };

  const GROUPS = {
    vocabulary: {
      key: "vocabulary",
      label: "単語・語彙"
    },

    sound: {
      key: "sound",
      label: "リスニング・音声"
    },

    exam: {
      key: "exam",
      label: "大問別演習"
    }
  };

  const ABILITIES = {
  chie: {
    key: "chie",
    label: "ちえ",
    description:
      "単語や表現の意味を確認する学習によって育つ能力。"
  },

  kotoba: {
    key: "kotoba",
    label: "ことば",
    description:
      "英語の語句や表現を思い出す学習によって育つ能力。"
  },

  onkan: {
    key: "onkan",
    label: "おんかん",
    description:
      "英語の音・アクセント・リスニングに取り組むことで育つ能力。"
  },

  bunmyaku: {
    key: "bunmyaku",
    label: "ぶんみゃく",
    description:
      "文・会話・文章の流れを考える学習によって育つ能力。"
  }
};

  function getCategory(key) {
    return CATEGORIES[key] || null;
  }

  function getAllCategories() {
    return Object.values(CATEGORIES);
  }

  function getCategoriesForLevel(level) {
    const lv = String(level || "1");

    return getAllCategories().filter(category => {
      return Array.isArray(category.levels) && category.levels.includes(lv);
    });
  }

  function isAvailableForLevel(key, level) {
    const category = getCategory(key);
    if (!category) return false;

    const lv = String(level || "1");
    return Array.isArray(category.levels) && category.levels.includes(lv);
  }

  function getCategoriesByGroup(groupKey, level) {
    return getCategoriesForLevel(level).filter(category => {
      return category.group === groupKey;
    });
  }

  function getProgressCategories(level) {
    return getCategoriesForLevel(level).filter(category => {
      return category.useProgress;
    });
  }

  function getRecommendationCategories(level) {
    return getCategoriesForLevel(level).filter(category => {
      return category.useRecommendation;
    });
  }

  function getLearningLogCategories(level) {
    return getCategoriesForLevel(level).filter(category => {
      return category.useLearningLog;
    });
  }

  function getWeaknessCategories(level) {
    return getCategoriesForLevel(level).filter(category => {
      return category.useWeakness;
    });
  }

  function getCategoryLabel(key) {
    return getCategory(key)?.label || key;
  }

  function getCategoryShortLabel(key) {
    return getCategory(key)?.shortLabel || getCategoryLabel(key);
  }

  function getGroup(key) {
    return GROUPS[key] || null;
  }

  function getAbility(key) {
    return ABILITIES[key] || null;
  }

  window.LEARNING_CATEGORIES = CATEGORIES;
  window.LEARNING_CATEGORY_GROUPS = GROUPS;
  window.GOIMON_ABILITIES = ABILITIES;

  window.LearningCategories = {
    getCategory,
    getAllCategories,
    getCategoriesForLevel,
    isAvailableForLevel,
    getCategoriesByGroup,
    getProgressCategories,
    getRecommendationCategories,
    getLearningLogCategories,
    getWeaknessCategories,
    getCategoryLabel,
    getCategoryShortLabel,
    getGroup,
    getAbility
  };
})();
