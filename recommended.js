// recommended.js：横断記録から「未OK/未挑戦」を優先してBlockを自動選定 → クイズ自動開始へ

document.addEventListener("DOMContentLoaded", () => {
  const LEVEL_KEY = "zensho_level_v1";

  const badge = document.getElementById("levelBadge");
  const passLineEl = document.getElementById("passLine");
  const rerollBtn = document.getElementById("reroll");

  const pickInfo = document.getElementById("pickInfo");
  const pickDetail = document.getElementById("pickDetail");

  const startEnjaBtn = document.getElementById("startEnja");
  const startJaenBtn = document.getElementById("startJaen");
  const goStudyBtn = document.getElementById("goStudy");
  const goProgressBtn = document.getElementById("goProgress");

  function getLevel() {
    return localStorage.getItem(LEVEL_KEY) || "1";
  }

  function getActiveDataset() {
    const lv = getLevel();
    window.ACTIVE_LEVEL = lv;

    if (lv === "2") {
      window.WORDS = window.WORDS_2KYU || window.WORDS || [];
      window.BLOCKS = window.BLOCKS_2KYU || window.BLOCKS || [];
    } else {
      window.WORDS = window.WORDS_1KYU || window.WORDS || [];
      window.BLOCKS = window.BLOCKS_1KYU || window.BLOCKS || [];
    }
    return { lv, words: window.WORDS || [], blocks: window.BLOCKS || [] };
  }

  function globalKey(lv) {
    return `zensho_block_global_lv${lv}_v1`;
  }

  function safeParse(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  function loadGlobal(lv) {
    const obj = safeParse(globalKey(lv));
    if (obj && typeof obj === "object" && obj.byBlock && typeof obj.byBlock === "object") return obj;
    return { byBlock: {} };
  }

  function pct(correct, attempted) {
    if (!attempted || attempted <= 0) return null;
    return Math.round((correct / attempted) * 100);
  }

  // 「未OK/未挑戦」を優先しつつ、スコアが低いBlockを選ぶ
  // 返り値：{block, start, end, reasonText, detailText}
  function pickBestBlock(blocks, g, passLine) {
    if (!blocks.length) return null;

    let best = null;

    for (const b of blocks) {
      const id = String(b.id);
      const rec = g.byBlock[id] || {
        studyDone: 0,
        quizAttempted: 0,
        quizCorrect: 0,
        quizAttemptedJaEn: 0,
        quizCorrectJaEn: 0
      };

      const enjaPct = pct(rec.quizCorrect, rec.quizAttempted);
      const jaenPct = pct(rec.quizCorrectJaEn, rec.quizAttemptedJaEn);

      const enjaTried = (rec.quizAttempted || 0) > 0;
      const jaenTried = (rec.quizAttemptedJaEn || 0) > 0;

      // 判定用スコア（小さいほど「優先」）
      // ①未挑戦が最優先（スコアを強く小さくする）
      // ②挑戦済なら、低い正答率を優先（最低側を採用）
      let score;
      let reason;

      if (!enjaTried && !jaenTried) {
        score = -2000; // 両方未挑戦は最優先
        reason = "英→日・日→英とも未挑戦";
      } else if (!enjaTried || !jaenTried) {
        score = -1500; // 片方未挑戦も強く優先
        reason = (!enjaTried) ? "英→日が未挑戦" : "日→英が未挑戦";
      } else {
        // 両方挑戦済：悪い方（低い方）を見る
        const worst = Math.min(enjaPct ?? 999, jaenPct ?? 999);
        score = worst; // 低いほど優先
        reason = `正答率が低い（悪い方=${worst}%）`;
      }

      // 合格ライン以上なら優先度を落とす（ただし全BlockがOKの時のため残す）
      const enjaOK = (enjaPct !== null && enjaPct >= passLine);
      const jaenOK = (jaenPct !== null && jaenPct >= passLine);
      const ok = enjaOK || jaenOK;
      if (ok) score += 5000;

      const detail =
        `Block ${b.id}（${b.start}〜${b.end}）｜` +
        `暗記:${rec.studyDone || 0}回｜` +
        `英→日:${enjaPct === null ? "未" : `${enjaPct}%`}（${rec.quizCorrect || 0}/${rec.quizAttempted || 0}）｜` +
        `日→英:${jaenPct === null ? "未" : `${jaenPct}%`}（${rec.quizCorrectJaEn || 0}/${rec.quizAttemptedJaEn || 0}）｜` +
        `判定:${ok ? "OK寄り" : "要復習"}`;

      if (!best || score < best.score) {
        best = { score, block: b, reason, detail };
      }
    }

    return {
      block: best.block,
      start: Number(best.block.start),
      end: Number(best.block.end),
      reasonText: best.reason,
      detailText: best.detail
    };
  }

  let picked = null;

  function render() {
    const { lv, words, blocks } = getActiveDataset();
    const g = loadGlobal(lv);
    const passLine = Number(passLineEl.value) || 80;

    badge.textContent = `現在：全商英検 ${lv}級（単語数 ${words.length}｜Block数 ${blocks.length}）`;

    if (!blocks.length) {
      pickInfo.textContent = "BLOCKS が見つかりません（blocks_1kyu.js / blocks_2kyu.js の読み込みを確認）";
      pickDetail.textContent = "";
      startEnjaBtn.disabled = true;
      startJaenBtn.disabled = true;
      goStudyBtn.disabled = true;
      return;
    }

    picked = pickBestBlock(blocks, g, passLine);
    if (!picked) {
      pickInfo.textContent = "おすすめBlockを選べませんでした。";
      pickDetail.textContent = "";
      return;
    }

    pickInfo.textContent =
      `おすすめ：Block ${picked.block.id}（${picked.start}〜${picked.end}）｜理由：${picked.reasonText}`;
    pickDetail.textContent = picked.detailText;

    startEnjaBtn.disabled = false;
    startJaenBtn.disabled = false;
    goStudyBtn.disabled = false;
  }

  function buildQuizUrl(kind) {
    // kind: "enja" or "jaen"
    const start = picked.start;
    const end = picked.end;

    // ここで「弱点ON＋ニガテ順＋自動開始」
    const base = (kind === "jaen") ? "quiz_jaen.html" : "quiz.html";
    return `${base}?start=${start}&end=${end}&mode=weak&weak=1&autostart=1`;
  }

  startEnjaBtn.addEventListener("click", () => {
    if (!picked) return;
    location.href = buildQuizUrl("enja");
  });

  startJaenBtn.addEventListener("click", () => {
    if (!picked) return;
    location.href = buildQuizUrl("jaen");
  });

  goStudyBtn.addEventListener("click", () => {
    if (!picked) return;
    location.href = `study.html?start=${picked.start}&end=${picked.end}`;
  });

  goProgressBtn.addEventListener("click", () => {
    location.href = "progress.html";
  });

  rerollBtn.addEventListener("click", () => render());
  passLineEl.addEventListener("change", () => render());

  render();
});
