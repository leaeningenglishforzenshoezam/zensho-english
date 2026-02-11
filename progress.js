// progress.js（丸ごと置き換え）
// 横断ブロック進捗（暗記/英→日/日→英/例文穴埋め）を一覧表示

document.addEventListener("DOMContentLoaded", () => {
  const LEVEL_KEY = "zensho_level_v1";

  const badge = document.getElementById("levelBadge");
  const tbody = document.getElementById("tbody");
  const summaryEl = document.getElementById("summary");

  const btnLv1 = document.getElementById("lv1");
  const btnLv2 = document.getElementById("lv2");
  const btnRefresh = document.getElementById("refresh");
  const btnResetGlobal = document.getElementById("resetGlobal");
  const passLineEl = document.getElementById("passLine");

  function getLevel() {
    return localStorage.getItem(LEVEL_KEY) || "1";
  }
  function setLevel(lv) {
    localStorage.setItem(LEVEL_KEY, String(lv));
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

  function loadGlobal(lv) {
    const raw = localStorage.getItem(globalKey(lv));
    if (!raw) return { byBlock: {} };
    try {
      const obj = JSON.parse(raw);
      if (obj && typeof obj === "object") {
        if (!obj.byBlock || typeof obj.byBlock !== "object") obj.byBlock = {};
        return obj;
      }
    } catch {}
    return { byBlock: {} };
  }

  function pct(correct, attempted) {
    if (!attempted || attempted <= 0) return null;
    return Math.round((correct / attempted) * 100);
  }
  function cellQuizText(correct, attempted) {
    if (!attempted || attempted <= 0) return "未";
    const p = pct(correct, attempted);
    return `${p}%（${correct}/${attempted}）`;
  }

  function ensureRec(rec) {
    // 旧データにも耐える
    if (typeof rec.studyDone !== "number") rec.studyDone = 0;
    if (typeof rec.quizAttempted !== "number") rec.quizAttempted = 0;
    if (typeof rec.quizCorrect !== "number") rec.quizCorrect = 0;
    if (typeof rec.quizAttemptedJaEn !== "number") rec.quizAttemptedJaEn = 0;
    if (typeof rec.quizCorrectJaEn !== "number") rec.quizCorrectJaEn = 0;
    if (typeof rec.sentenceAttempted !== "number") rec.sentenceAttempted = 0;
    if (typeof rec.sentenceCorrect !== "number") rec.sentenceCorrect = 0;
    return rec;
  }

  function render() {
    const { lv, words, blocks } = getActiveDataset();
    const g = loadGlobal(lv);
    const passLine = Number(passLineEl.value) || 80;

    badge.textContent = `現在：全商英検 ${lv}級`;

    // ボタンの見た目（最低限）
    btnLv1.classList.toggle("primary", lv === "1");
    btnLv2.classList.toggle("primary", lv === "2");

    // 集計
    let totalStudy = 0;

    let totalEnjaAttempted = 0;
    let totalEnjaCorrect = 0;

    let totalJaenAttempted = 0;
    let totalJaenCorrect = 0;

    let totalSentAttempted = 0;
    let totalSentCorrect = 0;

    tbody.innerHTML = "";

    if (!blocks.length) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 7;
      td.textContent = "BLOCKS が見つかりません（blocks_1kyu.js / blocks_2kyu.js の読み込みを確認してください）";
      tr.appendChild(td);
      tbody.appendChild(tr);
      summaryEl.textContent = "";
      return;
    }

    for (const b of blocks) {
      const id = String(b.id);
      const rec = ensureRec(g.byBlock[id] || {});

      totalStudy += rec.studyDone;

      totalEnjaAttempted += rec.quizAttempted;
      totalEnjaCorrect += rec.quizCorrect;

      totalJaenAttempted += rec.quizAttemptedJaEn;
      totalJaenCorrect += rec.quizCorrectJaEn;

      totalSentAttempted += rec.sentenceAttempted;
      totalSentCorrect += rec.sentenceCorrect;

      const enjaPct = pct(rec.quizCorrect, rec.quizAttempted);
      const jaenPct = pct(rec.quizCorrectJaEn, rec.quizAttemptedJaEn);
      const sentPct = pct(rec.sentenceCorrect, rec.sentenceAttempted);

      const ok =
        (enjaPct !== null && enjaPct >= passLine) ||
        (jaenPct !== null && jaenPct >= passLine) ||
        (sentPct !== null && sentPct >= passLine);

      const tr = document.createElement("tr");

      const tdBlock = document.createElement("td");
      tdBlock.textContent = `Block ${b.id}`;
      tr.appendChild(tdBlock);

      const tdRange = document.createElement("td");
      tdRange.textContent = `${b.start}〜${b.end}`;
      tr.appendChild(tdRange);

      const tdStudy = document.createElement("td");
      tdStudy.textContent = `${rec.studyDone}回`;
      tr.appendChild(tdStudy);

      const tdEnja = document.createElement("td");
      tdEnja.textContent = cellQuizText(rec.quizCorrect, rec.quizAttempted);
      tr.appendChild(tdEnja);

      const tdJaen = document.createElement("td");
      tdJaen.textContent = cellQuizText(rec.quizCorrectJaEn, rec.quizAttemptedJaEn);
      tr.appendChild(tdJaen);

      const tdSent = document.createElement("td");
      tdSent.textContent = cellQuizText(rec.sentenceCorrect, rec.sentenceAttempted);
      tr.appendChild(tdSent);

      const tdJudge = document.createElement("td");
      tdJudge.textContent = ok ? "OK" : "要復習";
      tr.appendChild(tdJudge);

      tbody.appendChild(tr);
    }

    const enjaAllPct = pct(totalEnjaCorrect, totalEnjaAttempted);
    const jaenAllPct = pct(totalJaenCorrect, totalJaenAttempted);
    const sentAllPct = pct(totalSentCorrect, totalSentAttempted);

    const enjaText = (enjaAllPct === null) ? "未" : `${enjaAllPct}%（${totalEnjaCorrect}/${totalEnjaAttempted}）`;
    const jaenText = (jaenAllPct === null) ? "未" : `${jaenAllPct}%（${totalJaenCorrect}/${totalJaenAttempted}）`;
    const sentText = (sentAllPct === null) ? "未" : `${sentAllPct}%（${totalSentCorrect}/${totalSentAttempted}）`;

    summaryEl.textContent =
      `累計：暗記完了 ${totalStudy}回｜英→日 ${enjaText}｜日→英 ${jaenText}｜例文穴埋め ${sentText}｜Block数 ${blocks.length}（単語数 ${words.length}）`;
  }

  // イベント
  btnLv1.addEventListener("click", () => { setLevel("1"); render(); });
  btnLv2.addEventListener("click", () => { setLevel("2"); render(); });
  btnRefresh.addEventListener("click", () => render());
  passLineEl.addEventListener("change", () => render());

  btnResetGlobal.addEventListener("click", () => {
    const lv = getLevel();
    if (!confirm(`全商英検 ${lv}級の「横断記録」をすべて削除しますか？（暗記/クイズ/例文の合算記録）`)) return;
    localStorage.removeItem(globalKey(lv));
    alert("横断記録を削除しました。");
    render();
  });

  render();
});
