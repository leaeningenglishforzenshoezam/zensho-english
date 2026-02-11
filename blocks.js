// blocks.js
// WORDS の数に応じて Block を自動生成（今は 72語区切り）
(() => {
  function buildBlocks(total, size = 72) {
    const blocks = [];
    if (!Number.isFinite(total) || total <= 0) return blocks;

    let start = 1;
    let id = 1;
    while (start <= total) {
      const end = Math.min(total, start + size - 1);
      blocks.push({ id, start, end, size: end - start + 1 });
      id++;
      start = end + 1;
    }
    return blocks;
  }

  window.BLOCKS = buildBlocks((window.WORDS || []).length, 72);

  window.getBlockByNo = function (no) {
    const blocks = window.BLOCKS || [];
    for (const b of blocks) {
      if (no >= b.start && no <= b.end) return b;
    }
    return null;
  };

  window.getBlockById = function (id) {
    const blocks = window.BLOCKS || [];
    return blocks.find(b => b.id === id) || null;
  };
})();
