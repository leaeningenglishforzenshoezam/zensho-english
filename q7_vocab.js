(function () {
  "use strict";

  const $ = id => document.getElementById(id);

  const escape = s => String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));

  const KEY = "q7VocabHistory_v1";
  const PREF = "q7VocabSettings_v1";

  const object = v =>
    v && typeof v === "object" && !Array.isArray(v);

  function warning() {
    $("storageNotice").hidden = false;
    $("storageNotice").textContent =
      "履歴を保存できません。この画面を開いている間は練習できます。";
  }

  function load(key) {
    try {
      const v = JSON.parse(localStorage.getItem(key) || "{}");
      return object(v) ? v : {};
    } catch (_) {
      warning();
      return {};
    }
  }

  function save(key, v) {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch (_) {
      warning();
    }
  }

  const history = load(KEY);
  const settings = load(PREF);

  if (!object(settings.starts)) {
    settings.starts = {};
  }

  const sets = (window.q7VocabSets || []).map(v => ({
    ...v,
    reading: (window.q7Sets || []).find(s => s.id === v.setId)
  }));

  const supported =
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window;

  let current;
  let queue = [];
  let index = 0;
  let options = [];
  let locked = false;
  let answers = [];
  let utterance;
  let mode = "normal";
  let batchSize = 10;

  const integer = (n, max) =>
    Number.isInteger(n) && n >= 1 && n <= max;

  // 音声
  function stopSpeech() {
    if (supported) {
      window.speechSynthesis.cancel();
    }
  }

  function speak() {
    if (!supported || !queue[index] || $("quiz").hidden) {
      return;
    }

    stopSpeech();

    utterance = new SpeechSynthesisUtterance(queue[index].en);
    utterance.lang = "en-US";
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();

    const voice =
      voices.find(v => /^en[-_]US$/i.test(v.lang)) ||
      voices.find(v => /^en\b/i.test(v.lang));

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onerror = e => {
      if (!["canceled", "interrupted"].includes(e.error)) {
        $("speechNotice").textContent =
          "発音を再生できません。「発音」ボタンを試してください。";
      }
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (_) {
      $("speechNotice").textContent =
        "この環境では発音を再生できません。";
    }
  }

  $("autoSpeak").checked =
    supported && settings.autoSpeak === true;

  $("autoSpeak").disabled = !supported;
  $("speak").disabled = !supported;

  if (!supported) {
    $("speechNotice").textContent =
      "このブラウザは音声読み上げに対応していません。";
  }

  $("autoSpeak").addEventListener("change", () => {
    settings.autoSpeak = $("autoSpeak").checked;
    save(PREF, settings);

    if (settings.autoSpeak) {
      speak();
    } else {
      stopSpeech();
    }
  });

  // 語句ごとの学習履歴
  function stat(w) {
    const v = history[w.id];

    if (!object(v)) {
      return {
        attempts: 0,
        wrong: false
      };
    }

    return {
      attempts:
        Number.isSafeInteger(v.attempts) && v.attempts >= 0
          ? v.attempts
          : 0,
      wrong: v.wrong === true
    };
  }

  function weak(s) {
    return s.words.filter(w => stat(w).wrong);
  }

  // 選択肢だけをシャッフル
  function shuffle(a) {
    const b = [...a];

    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }

    return b;
  }

  // 画面切り替え
  function view(id) {
    for (const name of ["selection", "setup", "quiz", "result"]) {
      $(name).hidden = name !== id;
    }

    $("backToSets").hidden = id === "selection";
  }

  // SET一覧
  function list() {
    $("vocabSets").innerHTML = sets.map(s => `
      <article class="set-card">
        <p class="eyebrow">SET ${escape(s.reading.number)}</p>
        <h3>${escape(s.reading.title)}</h3>

        <p>
          語句番号 1〜${s.words.length}<br>
          学習済み ${
            s.words.filter(w => stat(w).attempts > 0).length
          }語句 · 復習対象 ${weak(s).length}語句
        </p>

        <button
          class="primary"
          data-open="${escape(s.setId)}"
        >
          語句一覧・クイズ設定
        </button>
      </article>
    `).join("");
  }

  // 番号付き語句一覧
  function renderWords() {
    $("setupStats").textContent =
      `全${current.words.length}語句 · 学習済み `
      + `${current.words.filter(w => stat(w).attempts > 0).length}語句`
      + ` · 復習対象 ${weak(current).length}語句`;

    $("wordList").innerHTML = current.words.map(w => {
      const h = stat(w);

      const label = h.wrong
        ? "要復習"
        : h.attempts
          ? "直近正解"
          : "未学習";

      return `
        <tr>
          <th scope="row">${w.number}</th>

          <td>
            <span class="list-en" lang="en">
              ${escape(w.en)}
            </span>

            <span class="list-ja">
              ${escape(w.ja)}
            </span>

            ${
              w.level
                ? `<small>単語リスト：${w.level}級</small>`
                : ""
            }
          </td>

          <td>
            <span class="word-status ${h.wrong ? "needs-review" : ""}">
              ${label}
            </span>
          </td>

          <td>
            <button
              data-from="${w.number}"
              aria-label="語句番号${w.number}から開始する設定にする"
            >
              ここから
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  // 設定画面を開く
  function openSetup(id, preserve = false) {
    const s = sets.find(s => s.setId === id);

    if (!s) {
      return;
    }

    stopSpeech();
    current = s;

    $("setupTitle").textContent =
      `SET ${s.reading.number} · ${s.reading.title}`;

    $("startNumber").max = s.words.length;
    $("questionCount").max = s.words.length;

    if (!preserve) {
      $("startNumber").value =
        integer(settings.starts[id], s.words.length)
          ? settings.starts[id]
          : 1;

      $("questionCount").value =
        integer(settings.count, s.words.length)
          ? settings.count
          : Math.min(10, s.words.length);
    }

    $("setupMessage").textContent = "";

    renderWords();
    preview();
    view("setup");

    $("setupTitle").focus();
    window.scrollTo(0, 0);
  }

  // 入力内容の確認
  function config() {
    const start = $("startNumber").valueAsNumber;
    const count = $("questionCount").valueAsNumber;

    if (
      current &&
      integer(start, current.words.length) &&
      integer(count, current.words.length)
    ) {
      return { start, count };
    }

    return null;
  }

  // 出題範囲のプレビュー
  function preview() {
    const c = config();

    if (!c) {
      $("rangePreview").textContent =
        `開始番号・問題数は1〜${current.words.length}の整数で入力してください。`;

      $("startWeak").disabled = true;
      return;
    }

    const end = Math.min(
      current.words.length,
      c.start + c.count - 1
    );

    const remaining = weak(current)
      .filter(w => w.number >= c.start)
      .length;

    $("rangePreview").textContent =
      `通常：No.${c.start}〜${end}（${end - c.start + 1}問）`
      + ` · 復習：開始番号以降の${Math.min(c.count, remaining)}問`;

    $("startWeak").disabled = !remaining;
  }

  // 指定範囲から開始
  function start(onlyWeak) {
    if (!$("quizSettings").reportValidity()) {
      return;
    }

    const c = config();

    if (!c) {
      return;
    }

    const words = onlyWeak
      ? weak(current)
          .filter(w => w.number >= c.start)
          .slice(0, c.count)
      : current.words.slice(
          c.start - 1,
          c.start - 1 + c.count
        );

    if (!words.length) {
      $("setupMessage").textContent =
        "この開始番号以降に復習対象の語句はありません。";
      return;
    }

    settings.count = c.count;
    settings.starts[current.setId] = c.start;
    save(PREF, settings);

    batchSize = c.count;
    run(words, onlyWeak ? "weak" : "normal");
  }

  function run(words, kind) {
    stopSpeech();

    queue = [...words];
    mode = kind;
    index = 0;
    answers = [];

    $("quizTitle").textContent =
      `SET ${current.reading.number} · ${current.reading.title} · `
      + (
        mode === "weak"
          ? "間違えた語句の復習"
          : `No.${queue[0].number}〜${queue.at(-1).number}`
      );

    view("quiz");
    showWord();
  }

  // 元の英文と日本語訳
  function source(w) {
    const s = current.reading;

    if (w.location) {
      const type = w.location[0];
      const n = Number(w.location.slice(1)) - 1;

      if (type === "A" || type === "B") {
        const key = type === "A" ? "passage" : "summary";

        return {
          label:
            `${type === "A" ? "Passage A" : "Summary B"}`
            + ` · 第${n + 1}段落`,
          en: s[key][n],
          ja: s[key + "Ja"][n]
        };
      }

      const q = s.questions.find(q => q.id === type);

      if (q) {
        return {
          label: `Choices (${type}) · 選択肢${n + 1}`,
          en: q.choices[n],
          ja: q.choicesJa[n]
        };
      }
    }

    const needle = w.en.toLowerCase();

    for (const key of ["passage", "summary"]) {
      const i = s[key].findIndex(p =>
        p.toLowerCase().includes(needle)
      );

      if (i >= 0) {
        return {
          label:
            `${key === "passage" ? "Passage A" : "Summary B"}`
            + ` · 第${i + 1}段落`,
          en: s[key][i],
          ja: s[key + "Ja"][i]
        };
      }
    }

    for (const q of s.questions) {
      const i = q.choices.findIndex(p =>
        p.toLowerCase().includes(needle)
      );

      if (i >= 0) {
        return {
          label: `Choices (${q.id}) · 選択肢${i + 1}`,
          en: q.choices[i],
          ja: q.choicesJa[i]
        };
      }
    }

    return null;
  }

  // 1問表示
  function showWord() {
    locked = false;

    const w = queue[index];
    options = shuffle([w.ja, ...w.wrong]);

    $("word").textContent = w.en;

    $("counter").textContent =
      `${index + 1} / ${queue.length}問`;

    $("wordNumber").textContent =
      `語句番号 No.${w.number}`;

    $("options").innerHTML = options.map((s, i) => `
      <button data-option="${i}">
        ${i + 1}. ${escape(s)}
      </button>
    `).join("");

    $("feedback").hidden = true;
    $("context").hidden = true;
    $("context").open = false;
    $("next").hidden = true;

    $("word").focus({ preventScroll: true });
    window.scrollTo(0, 0);

    if ($("autoSpeak").checked) {
      speak();
    }
  }

  // 解答・採点
  function choose(i) {
    if (
      locked ||
      $("quiz").hidden ||
      !Number.isInteger(i) ||
      i < 0 ||
      i > 3
    ) {
      return;
    }

    locked = true;

    const w = queue[index];
    const correct = options[i] === w.ja;
    const old = stat(w);

    history[w.id] = {
      attempts: old.attempts + 1,
      wrong: !correct,
      lastAnsweredAt: Date.now()
    };

    save(KEY, history);

    answers.push({
      w,
      correct,
      selected: options[i]
    });

    $("options").querySelectorAll("button").forEach((b, n) => {
      b.disabled = true;

      if (options[n] === w.ja) {
        b.classList.add("right");
        b.textContent += "　○ 正答";
      } else if (n === i) {
        b.classList.add("wrong");
        b.textContent += "　× 自分の選択";
      }
    });

    $("feedback").hidden = false;

    $("feedback").textContent = correct
      ? `○ 正解：${w.ja}`
      : `× 不正解：正答は「${w.ja}」`;

    const c = source(w);
    $("context").hidden = !c;

    if (c) {
      $("contextSource").textContent = c.label;
      $("contextEn").textContent = c.en;
      $("contextJa").textContent = c.ja;
    }

    $("next").hidden = false;

    $("next").textContent =
      index + 1 === queue.length
        ? "結果を見る"
        : "次の語句 →";
  }

  // 結果画面
  function result() {
    stopSpeech();
    view("result");

    const n = answers.filter(a => a.correct).length;
    const remaining = weak(current).length;

    $("vocabScore").textContent =
      `${n} / ${queue.length}`;

    $("resultMessage").textContent =
      `復習対象は、このSETに${remaining}語句あります。`;

    $("reviewList").innerHTML = answers.map(a => `
      <div class="vocab-review">
        <p>
          ${a.correct ? "○" : "×"}
          No.${a.w.number}
          <span lang="en">${escape(a.w.en)}</span>：
          ${escape(a.w.ja)}
        </p>
        ${
          a.correct
            ? ""
            : `<p>自分の選択：${escape(a.selected)}</p>`
        }
      </div>
    `).join("");

    $("weakAgain").disabled = !remaining;

    $("nextBatch").hidden =
      mode !== "normal" ||
      queue.at(-1).number >= current.words.length;

    if (!$("nextBatch").hidden) {
      const next = queue.at(-1).number + 1;

      const end = Math.min(
        current.words.length,
        next + batchSize - 1
      );

      $("nextBatch").textContent =
        `続き：No.${next}〜${end}へ`;
    }

    $("resultTitle").focus();
    window.scrollTo(0, 0);
    list();
  }

  // SET選択
  $("vocabSets").addEventListener("click", e => {
    const b = e.target.closest("[data-open]");

    if (b) {
      openSetup(b.dataset.open);
    }
  });

  // 通常練習
  $("quizSettings").addEventListener("submit", e => {
    e.preventDefault();
    start(false);
  });

  // 開始番号以降の弱点復習
  $("startWeak").addEventListener("click", () => {
    start(true);
  });

  // 設定入力
  ["startNumber", "questionCount"].forEach(id => {
    $(id).addEventListener("input", () => {
      $("setupMessage").textContent = "";
      preview();
    });
  });

  // 一覧の「ここから」
  $("wordList").addEventListener("click", e => {
    const b = e.target.closest("[data-from]");

    if (!b) {
      return;
    }

    $("startNumber").value = b.dataset.from;
    preview();

    $("startNumber").focus();
    $("quizSettings").scrollIntoView({ block: "start" });
  });

  // 選択肢
  $("options").addEventListener("click", e => {
    const b = e.target.closest("[data-option]");

    if (b && !b.disabled) {
      choose(Number(b.dataset.option));
    }
  });

  // 次の問題
  $("next").addEventListener("click", () => {
    if (!locked || $("quiz").hidden) {
      return;
    }

    stopSpeech();

    if (++index < queue.length) {
      showWord();
    } else {
      result();
    }
  });

  // 同じ語句でもう一度
  $("again").addEventListener("click", () => {
    run(queue, mode);
  });

  // SET全体の弱点から指定数まで復習
  $("weakAgain").addEventListener("click", () => {
    const words = weak(current).slice(0, batchSize);

    if (words.length) {
      run(words, "weak");
    }
  });

  // 次の範囲
  $("nextBatch").addEventListener("click", () => {
    const next = queue.at(-1).number + 1;

    if (mode !== "normal" || next > current.words.length) {
      return;
    }

    settings.starts[current.setId] = next;
    save(PREF, settings);

    $("startNumber").value = next;

    run(
      current.words.slice(next - 1, next - 1 + batchSize),
      "normal"
    );
  });

  // 一覧・設定へ戻る
  $("toSetup").addEventListener("click", () => {
    openSetup(current.setId, true);
  });

  $("speak").addEventListener("click", speak);

  $("backToSets").addEventListener("click", () => {
    stopSpeech();
    view("selection");
    list();
    $("selectionHeading").focus();
  });

  window.addEventListener("pagehide", stopSpeech);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSpeech();
    }
  });

  // データチェック
  try {
    const ids = new Set();
    const setIds = new Set();

    for (const s of sets) {
      if (
        !s.reading ||
        !Array.isArray(s.words) ||
        !s.words.length ||
        setIds.has(s.setId)
      ) {
        throw new Error("SETとの対応を確認してください。");
      }

      setIds.add(s.setId);

      for (const [i, w] of s.words.entries()) {
        if (
          !w.id ||
          ids.has(w.id) ||
          w.number !== i + 1 ||
          typeof w.en !== "string" ||
          typeof w.ja !== "string" ||
          !Array.isArray(w.wrong) ||
          w.wrong.length !== 3 ||
          w.wrong.some(v => typeof v !== "string") ||
          new Set([w.ja, ...w.wrong]).size !== 4
        ) {
          throw new Error("語句データを確認してください。");
        }

        if (
          w.location &&
          !/^(?:[AB][1-9]\d*|[a-e][1-4])$/.test(w.location)
        ) {
          throw new Error("出現箇所を確認してください。");
        }

        ids.add(w.id);
      }
    }

    list();
  } catch (e) {
    $("vocabSets").textContent = e.message;
  }
})();
