// progress.js（丸ごと置き換え）
// Blockごとの横断進捗をカード表示し、そのまま各ページへ飛べる版
// 対応項目：暗記 / 英→日 / 日→英 / アクセント / 大問9 / 音声→意味
// 追加：ゴイモン画像 + ゴイモン視点コメント

document.addEventListener("DOMContentLoaded", () => {
  const LEVEL_KEY = "zensho_level_v1";

  const badge = document.getElementById("levelBadge");
  const blockGrid = document.getElementById("blockGrid");
  const emptyState = document.getElementById("emptyState");

  const btnLv1 = document.getElementById("lv1");
  const btnLv2 = document.getElementById("lv2");
  const btnRefresh = document.getElementById("refresh");
  const btnResetGlobal = document.getElementById("resetGlobal");
  const passLineEl = document.getElementById("passLine");
  const statusFilterEl = document.getElementById("statusFilter");

  const summaryMain = document.getElementById("summaryMain");
  const summarySub = document.getElementById("summarySub");
  const summaryRecommend = document.getElementById("summaryRecommend");
  const summaryRecommendSub = document.getElementById("summaryRecommendSub");
  const summaryMemo = document.getElementById("summaryMemo");
  const summaryMemoSub = document.getElementById("summaryMemoSub");

  const progressGoimonImage = document.getElementById("progressGoimonImage");
  const progressGoimonName = document.getElementById("progressGoimonName");
  const progressGoimonMeta = document.getElementById("progressGoimonMeta");
  const progressGoimonComment = document.getElementById("progressGoimonComment");

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

  function ensureRec(rec) {
    const r = rec && typeof rec === "object" ? rec : {};
    if (typeof r.studyDone !== "number") r.studyDone = 0;

    if (typeof r.quizAttempted !== "number") r.quizAttempted = 0;
    if (typeof r.quizCorrect !== "number") r.quizCorrect = 0;

    if (typeof r.quizAttemptedJaEn !== "number") r.quizAttemptedJaEn = 0;
    if (typeof r.quizCorrectJaEn !== "number") r.quizCorrectJaEn = 0;

    if (typeof r.accentAttempted !== "number") r.accentAttempted = 0;
    if (typeof r.accentCorrect !== "number") r.accentCorrect = 0;

    if (typeof r.sentenceAttempted !== "number") r.sentenceAttempted = 0;
    if (typeof r.sentenceCorrect !== "number") r.sentenceCorrect = 0;

    if (typeof r.audioAttempted !== "number") r.audioAttempted = 0;
    if (typeof r.audioCorrect !== "number") r.audioCorrect = 0;

    return r;
  }

  function statusLabel(correct, attempted, passLine) {
    if (!attempted || attempted <= 0) {
      return { text: "未挑戦", cls: "ng" };
    }
    const p = pct(correct, attempted);
    if (p >= passLine) {
      return { text: `${p}%`, cls: "ok" };
    }
    return { text: `${p}%`, cls: "mid" };
  }

  function overallJudge(rec, passLine) {
    const items = [
      pct(rec.quizCorrect, rec.quizAttempted),
      pct(rec.quizCorrectJaEn, rec.quizAttemptedJaEn),
      pct(rec.accentCorrect, rec.accentAttempted),
      pct(rec.sentenceCorrect, rec.sentenceAttempted),
      pct(rec.audioCorrect, rec.audioAttempted)
    ];

    const touched =
      rec.studyDone > 0 ||
      rec.quizAttempted > 0 ||
      rec.quizAttemptedJaEn > 0 ||
      rec.accentAttempted > 0 ||
      rec.sentenceAttempted > 0 ||
      rec.audioAttempted > 0;

    if (!touched) return { text: "未挑戦", cls: "ng", key: "untouched" };

    const hasGood = items.some(v => v !== null && v >= passLine);
    if (hasGood) return { text: "良好", cls: "ok", key: "ok" };

    return { text: "要復習", cls: "mid", key: "needs_review" };
  }

  function buildUrl(page, start, end, extra = "") {
    const base = `${page}?start=${start}&end=${end}`;
    return extra ? `${base}&${extra}` : base;
  }

  function categoryWeaknessScore(rec, category, passLine) {
    if (category === "study") {
      return rec.studyDone > 0 ? 1000 : -1000;
    }

    if (category === "quiz_enja") {
      const p = pct(rec.quizCorrect, rec.quizAttempted);
      return p === null ? -900 : (p >= passLine ? 1000 + p : p);
    }

    if (category === "quiz_jaen") {
      const p = pct(rec.quizCorrectJaEn, rec.quizAttemptedJaEn);
      return p === null ? -900 : (p >= passLine ? 1000 + p : p);
    }

    if (category === "accent") {
      const p = pct(rec.accentCorrect, rec.accentAttempted);
      return p === null ? -900 : (p >= passLine ? 1000 + p : p);
    }

    if (category === "sentence") {
      const p = pct(rec.sentenceCorrect, rec.sentenceAttempted);
      return p === null ? -900 : (p >= passLine ? 1000 + p : p);
    }

    if (category === "audio_quiz") {
      const p = pct(rec.audioCorrect, rec.audioAttempted);
      return p === null ? -900 : (p >= passLine ? 1000 + p : p);
    }

    return 9999;
  }

  function getBestAction(rec, passLine) {
    const candidates = [
      { key: "quiz_enja", label: "英→日", page: "quiz.html", extra: "autostart=1" },
      { key: "quiz_jaen", label: "日→英", page: "quiz_jaen.html", extra: "autostart=1" },
      { key: "accent", label: "アクセント", page: "accent.html", extra: "" },
      { key: "sentence", label: "大問9", page: "sentence.html", extra: "" },
      { key: "audio_quiz", label: "音声→意味", page: "audio_quiz.html", extra: "autostart=1" },
      { key: "study", label: "暗記", page: "study.html", extra: "" }
    ];

    return candidates
      .map(c => ({ ...c, score: categoryWeaknessScore(rec, c.key, passLine) }))
      .sort((a, b) => a.score - b.score)[0];
  }

  function makeStatusBox(label, correct, attempted, passLine, extraText = "") {
    const st = statusLabel(correct, attempted, passLine);
    return `
      <div class="statusBox">
        <div class="statusLabel">${label}</div>
        <div class="statusValue">
          <span class="pill ${st.cls}">${st.text}</span>
        </div>
        <div class="statusLabel" style="margin-top:6px;">${extraText}</div>
      </div>
    `;
  }

  function filterMatch(judgeKey, filterValue) {
    if (filterValue === "all") return true;
    return judgeKey === filterValue;
  }

  function getGoimonComment(goimon, recommendBlock, recommendAction) {
    const type = String(goimon?.type || "nagomi");
    const stage = String(goimon?.stage || "egg");
    const stats = goimon?.stats || { chie: 0, kotoba: 0, onkan: 0, bunmyaku: 0 };

    const weakest = Object.entries(stats).sort((a, b) => a[1] - b[1])[0][0];

    const typeLeadMap = {
      nagomi: "今日は全体を見ながら進めると、いい流れになりそうだよ。",
      hirameki: "理解を深める学習をすると、もっと冴えてきそうだね。",
      tsumugi: "ことばを自分で出す練習をすると、伸びが出やすいよ。",
      shirabe: "音やリズムに耳を向けると、今の育ち方に合っているよ。",
      yomitoki: "文の流れを追う学習を重ねると、力がつながっていきそうだね。"
    };

    const weakestMap = {
      chie: "ちえが少し低めだから、英→日や音声→意味で土台を整えたいね。",
      kotoba: "ことばが少し低めだから、日→英で思い出す練習が効きそうだよ。",
      onkan: "おんかんが少し低めだから、アクセントや音声→意味が合いそうだね。",
      bunmyaku: "ぶんみゃくが少し低めだから、大問9で前後の流れを見たいところだよ。"
    };

    const recommendText = (recommendBlock && recommendAction)
      ? `今なら Block ${recommendBlock.id} の「${recommendAction.label}」から入るのがおすすめだよ。`
      : "今日のおすすめから始めてみよう。";

    const stageText =
      stage === "egg" ? "まだ序盤だから、まずは気楽に1つ進めよう。" :
      stage === "child" ? "少しずつ形ができてきたね。" :
      stage === "growth" ? "だいぶ育ってきたから、復習の精度も意識したいね。" :
      stage === "mid" ? "かなり力がついてきたね。弱いところを埋めるとさらに安定しそう。" :
      "ここまで育っているから、仕上げの一歩を丁寧に重ねたいね。";

    return `${typeLeadMap[type] || typeLeadMap.nagomi} ${weakestMap[weakest] || ""} ${recommendText} ${stageText}`;
  }

  function renderGoimonPanel(recommendBlock, recommendAction) {
    if (!window.GoimonUI || typeof window.GoimonUI.loadCurrent !== "function") {
      progressGoimonComment.textContent = "ゴイモン情報を読み込めませんでした。";
      return;
    }

    const g = window.GoimonUI.loadCurrent();
    if (!g) {
      progressGoimonComment.textContent = "ゴイモン情報を読み込めませんでした。";
      return;
    }

    const name = (typeof window.GoimonUI.getGoimonPrimaryName === "function")
      ? window.GoimonUI.getGoimonPrimaryName(g)
      : "ゴイモン";

    const stage = (typeof window.GoimonUI.getStageLabel === "function")
      ? window.GoimonUI.getStageLabel(g.stage)
      : String(g.stage || "");

    const pointText = (typeof window.GoimonUI.formatPoint === "function")
      ? window.GoimonUI.formatPoint(g.totalPoints || 0)
      : String(g.totalPoints || 0);

    progressGoimonImage.src = g.imageKey || "images/goimon/goimon_egg.png";
    progressGoimonImage.alt = name;
    progressGoimonName.textContent = name;
    progressGoimonMeta.textContent = `Lv ${g.level} / ${pointText} pt / ${stage}`;
    progressGoimonComment.textContent = getGoimonComment(g, recommendBlock, recommendAction);
  }

  function render() {
    const { lv, words, blocks } = getActiveDataset();
    const g = loadGlobal(lv);
    const passLine = Number(passLineEl.value) || 80;
    const filterValue = statusFilterEl.value || "all";

    badge.textContent = `現在：全商英検 ${lv}級`;
    btnLv1.classList.toggle("primary", lv === "1");
    btnLv2.classList.toggle("primary", lv === "2");

    if (!blocks.length) {
      blockGrid.innerHTML = "";
      emptyState.style.display = "block";
      emptyState.textContent = "BLOCKS が見つかりません。";
      summaryMain.textContent = "—";
      summarySub.textContent = "—";
      summaryRecommend.textContent = "—";
      summaryRecommendSub.textContent = "—";
      summaryMemo.textContent = "—";
      summaryMemoSub.textContent = "—";
      renderGoimonPanel(null, null);
      return;
    }

    let totalStudy = 0;
    let totalEnjaAttempted = 0;
    let totalEnjaCorrect = 0;
    let totalJaenAttempted = 0;
    let totalJaenCorrect = 0;
    let totalAccentAttempted = 0;
    let totalAccentCorrect = 0;
    let totalSentenceAttempted = 0;
    let totalSentenceCorrect = 0;
    let totalAudioAttempted = 0;
    let totalAudioCorrect = 0;

    let needsReviewCount = 0;
    let okCount = 0;
    let untouchedCount = 0;

    let recommendBlock = null;
    let recommendAction = null;
    let recommendScore = 999999;

    const cardHtmlList = [];

    for (const b of blocks) {
      const id = String(b.id);
      const rec = ensureRec(g.byBlock[id] || {});

      totalStudy += rec.studyDone;

      totalEnjaAttempted += rec.quizAttempted;
      totalEnjaCorrect += rec.quizCorrect;

      totalJaenAttempted += rec.quizAttemptedJaEn;
      totalJaenCorrect += rec.quizCorrectJaEn;

      totalAccentAttempted += rec.accentAttempted;
      totalAccentCorrect += rec.accentCorrect;

      totalSentenceAttempted += rec.sentenceAttempted;
      totalSentenceCorrect += rec.sentenceCorrect;

      totalAudioAttempted += rec.audioAttempted;
      totalAudioCorrect += rec.audioCorrect;

      const judge = overallJudge(rec, passLine);
      if (judge.key === "needs_review") needsReviewCount++;
      if (judge.key === "ok") okCount++;
      if (judge.key === "untouched") untouchedCount++;

      const bestAction = getBestAction(rec, passLine);
      if (bestAction.score < recommendScore) {
        recommendScore = bestAction.score;
        recommendBlock = b;
        recommendAction = bestAction;
      }

      if (!filterMatch(judge.key, filterValue)) continue;

      const enjaPct = pct(rec.quizCorrect, rec.quizAttempted);
      const jaenPct = pct(rec.quizCorrectJaEn, rec.quizAttemptedJaEn);
      const accentPct = pct(rec.accentCorrect, rec.accentAttempted);
      const sentencePct = pct(rec.sentenceCorrect, rec.sentenceAttempted);
      const audioPct = pct(rec.audioCorrect, rec.audioAttempted);

      const start = Number(b.start);
      const end = Number(b.end);

      const studyLabel = rec.studyDone > 0 ? `${rec.studyDone}回` : "未";
      const bestUrl = buildUrl(bestAction.page, start, end, bestAction.extra);

      const html = `
        <div class="blockCard">
          <div class="blockHead">
            <div>
              <div class="blockTitle">Block ${b.id}</div>
              <div class="blockRange">${b.start}〜${b.end}</div>
            </div>
            <div><span class="pill ${judge.cls}">${judge.text}</span></div>
          </div>

          <div class="statusGrid">
            <div class="statusBox">
              <div class="statusLabel">暗記</div>
              <div class="statusValue">${studyLabel}</div>
              <div class="statusLabel" style="margin-top:6px;">意味を確認して進めた回数</div>
            </div>

            ${makeStatusBox("英→日", rec.quizCorrect, rec.quizAttempted, passLine, enjaPct === null ? "未挑戦" : `${rec.quizCorrect}/${rec.quizAttempted}`)}
            ${makeStatusBox("日→英", rec.quizCorrectJaEn, rec.quizAttemptedJaEn, passLine, jaenPct === null ? "未挑戦" : `${rec.quizCorrectJaEn}/${rec.quizAttemptedJaEn}`)}
            ${makeStatusBox("アクセント", rec.accentCorrect, rec.accentAttempted, passLine, accentPct === null ? "未挑戦" : `${rec.accentCorrect}/${rec.accentAttempted}`)}
            ${makeStatusBox("大問9", rec.sentenceCorrect, rec.sentenceAttempted, passLine, sentencePct === null ? "未挑戦" : `${rec.sentenceCorrect}/${rec.sentenceAttempted}`)}
            ${makeStatusBox("音声→意味", rec.audioCorrect, rec.audioAttempted, passLine, audioPct === null ? "未挑戦" : `${rec.audioCorrect}/${rec.audioAttempted}`)}
          </div>

          <div class="actionArea">
            <div class="actionTitle">このBlockから始める</div>
            <div class="actionButtons">
              <button class="miniBtn recommend" data-url="${bestUrl}">おすすめ：${bestAction.label}</button>
              <button class="miniBtn" data-url="${buildUrl("study.html", start, end)}">暗記</button>
              <button class="miniBtn" data-url="${buildUrl("quiz.html", start, end, "autostart=1")}">英→日</button>
              <button class="miniBtn" data-url="${buildUrl("quiz_jaen.html", start, end, "autostart=1")}">日→英</button>
              <button class="miniBtn" data-url="${buildUrl("accent.html", start, end)}">アクセント</button>
              <button class="miniBtn" data-url="${buildUrl("sentence.html", start, end)}">大問9</button>
              <button class="miniBtn" data-url="${buildUrl("audio_quiz.html", start, end, "autostart=1")}">音声→意味</button>
            </div>
          </div>
        </div>
      `;
      cardHtmlList.push(html);
    }

    blockGrid.innerHTML = cardHtmlList.join("");
    emptyState.style.display = cardHtmlList.length ? "none" : "block";

    const enjaAllPct = pct(totalEnjaCorrect, totalEnjaAttempted);
    const jaenAllPct = pct(totalJaenCorrect, totalJaenAttempted);
    const accentAllPct = pct(totalAccentCorrect, totalAccentAttempted);
    const sentenceAllPct = pct(totalSentenceCorrect, totalSentenceAttempted);
    const audioAllPct = pct(totalAudioCorrect, totalAudioAttempted);

    summaryMain.textContent = `${blocks.length} Block / ${words.length}語`;
    summarySub.textContent =
      `要復習 ${needsReviewCount} / 良好 ${okCount} / 未挑戦 ${untouchedCount}`;

    if (recommendBlock && recommendAction) {
      summaryRecommend.textContent = `Block ${recommendBlock.id} の ${recommendAction.label}`;
      summaryRecommendSub.textContent = `今いちばん始めやすい候補です。`;
    } else {
      summaryRecommend.textContent = "候補なし";
      summaryRecommendSub.textContent = "表示条件に合うBlockがありません。";
    }

    summaryMemo.textContent = `暗記 ${totalStudy}回`;
    summaryMemoSub.textContent =
      `英→日 ${enjaAllPct === null ? "未" : `${enjaAllPct}%`} / ` +
      `日→英 ${jaenAllPct === null ? "未" : `${jaenAllPct}%`} / ` +
      `アクセント ${accentAllPct === null ? "未" : `${accentAllPct}%`} / ` +
      `大問9 ${sentenceAllPct === null ? "未" : `${sentenceAllPct}%`} / ` +
      `音声→意味 ${audioAllPct === null ? "未" : `${audioAllPct}%`}`;

    renderGoimonPanel(recommendBlock, recommendAction);

    blockGrid.querySelectorAll("button[data-url]").forEach(btn => {
      btn.addEventListener("click", () => {
        const url = btn.getAttribute("data-url");
        if (url) location.href = url;
      });
    });
  }

  btnLv1.addEventListener("click", () => {
    setLevel("1");
    render();
  });

  btnLv2.addEventListener("click", () => {
    setLevel("2");
    render();
  });

  btnRefresh.addEventListener("click", () => render());
  passLineEl.addEventListener("change", () => render());
  statusFilterEl.addEventListener("change", () => render());

  btnResetGlobal.addEventListener("click", () => {
    const lv = getLevel();
    if (!confirm(`全商英検 ${lv}級の横断記録をすべて削除しますか？`)) return;
    localStorage.removeItem(globalKey(lv));
    alert("横断記録を削除しました。");
    render();
  });

  render();
});
