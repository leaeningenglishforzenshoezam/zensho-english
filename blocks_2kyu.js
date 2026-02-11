// blocks_2kyu.js
// 全商英検2級 ブロック定義（自動生成）
// 50語ごとにBlock化（最後は端数）
(function () {
  const words = window.WORDS_2KYU || [];
  const size = 50;

  const blocks = [];
  const total = words.length;

  if (total === 0) {
    window.BLOCKS_2KYU = [];
    return;
  }

  const blockCount = Math.ceil(total / size);

  for (let i = 0; i < blockCount; i++) {
    const start = i * size + 1; // 1-based
    const end = Math.min((i + 1) * size, total);
    blocks.push({
      id: i + 1,
      name: `Block ${i + 1}（${start}〜${end}）`,
      start,
      end
    });
  }

  window.BLOCKS_2KYU = blocks;
})();
