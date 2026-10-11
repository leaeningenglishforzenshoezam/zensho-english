// daily_mission_rules.js
// 今日のミッション用の純粋な定義。既存の経験値・進化処理は変更しない。
(function () {
  "use strict";
  const RULES = {
    version: 1,
    timezone: "Asia/Tokyo",
    missionSlots: [
      {
        slot: "review",
        candidates: [
          {category:"quiz_enja", metric:"attempt", target:10},
          {category:"quiz_jaen", metric:"attempt", target:10},
          {category:"audio_quiz", metric:"attempt", target:10}
        ],
        rewardStars:3
      },
      {
        slot: "basic",
        candidates: [
          {category:"idiom_quiz", metric:"correct", target:5},
          {category:"accent", metric:"correct", target:5},
          {category:"quiz_jaen", metric:"correct", target:5},
          {category:"quiz_enja", metric:"correct", target:5}
        ],
        rewardStars:2
      },
      {
        slot: "exam",
        candidates: [
          {category:"sentence", metric:"attempt", target:10},
          {category:"paraphrase_quiz", metric:"attempt", target:10},
          {category:"reorder", metric:"attempt", target:5}
        ],
        rewardStars:3
      }
    ],
    allClearBonusStars:2
  };
  window.GOIMON_DAILY_MISSION_RULES = Object.freeze(RULES);
})();
