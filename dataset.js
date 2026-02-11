// dataset.js（丸ごと置き換え）
// 目的：LEVEL（1/2）に合わせて WORDS/BLOCKS/SENTENCES を確定させる

(function () {
  const LEVEL_KEY = "zensho_level_v1";
  const lv = localStorage.getItem(LEVEL_KEY) || "1";
  window.ACTIVE_LEVEL = lv;

  // WORDS / BLOCKS を確定
  if (lv === "2") {
    window.WORDS = window.WORDS_2KYU || window.WORDS || [];
    window.BLOCKS = window.BLOCKS_2KYU || window.BLOCKS || [];
    window.SENTENCES = window.SENTENCES_2KYU || window.SENTENCES || [];
  } else {
    window.WORDS = window.WORDS_1KYU || window.WORDS || [];
    window.BLOCKS = window.BLOCKS_1KYU || window.BLOCKS || [];
    window.SENTENCES = window.SENTENCES_1KYU || window.SENTENCES || [];
  }
})();
