(function () {
  "use strict";

  // 大問7専用の保存キー
  const HISTORY_KEY = "q7SetHistory_v1";
  const SESSION_KEY = "q7Sessions_v1";

  const $ = id => document.getElementById(id);
  const mobile = window.matchMedia("(max-width: 799px)");

  const escape = value =>
    String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  const validObject = value =>
    value &&
    typeof value === "object" &&
    !Array.isArray(value);

  const validScore = value =>
    Number.isInteger(value) && value >= 0 && value <= 5;

  const validChoice = value =>
    Number.isInteger(value) && value >= 1 && value <= 4;

  const ids = ["a", "b", "c", "d", "e"];

  let current = null;
  let state = null;

  /* 保存 */

  function storageWarning() {
    $("storageNotice").textContent =
      "このブラウザでは学習履歴を保存できません。演習と採点はそのまま使えます。";

    $("storageNotice").hidden = false;
  }

  function load(key) {
    try {
      const value = JSON.parse(GOIMONStorage.getItem(key) || "{}");
      return validObject(value) ? value : {};
    } catch (_) {
      storageWarning();
      return {};
    }
  }

  function save(key, value) {
    try {
      GOIMONStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      storageWarning();
    }
  }

  const history = load(HISTORY_KEY);
  const sessions = load(SESSION_KEY);

  /* データ確認 */

  function validateSets(data) {
    if (!Array.isArray(data)) {
      throw new Error("問題データを読み込めませんでした。");
    }

    const seen = new Set();

    data.forEach(set => {
      if (
        !set.id ||
        seen.has(set.id) ||
        !set.title ||
        !set.passageTitle
      ) {
        throw new Error("SETのID・タイトルを確認してください。");
      }

      seen.add(set.id);

      ["passage", "summary", "passageJa", "summaryJa"].forEach(key => {
        if (
          !Array.isArray(set[key]) ||
          !set[key].length ||
          set[key].some(p => typeof p !== "string")
        ) {
          throw new Error(
            `SET ${set.number} の ${key} を確認してください。`
          );
        }
      });

      if (
        !Array.isArray(set.questions) ||
        set.questions.length !== 5
      ) {
        throw new Error(`SET ${set.number} は5問必要です。`);
      }

      set.questions.forEach((q, i) => {
        if (
          q.id !== ids[i] ||
          !validChoice(q.answer) ||
          !Array.isArray(q.choices) ||
          q.choices.length !== 4 ||
          !Array.isArray(q.choicesJa) ||
          q.choicesJa.length !== 4 ||
          [...q.choices, ...q.choicesJa].some(
            s => typeof s !== "string"
          )
        ) {
          throw new Error(
            `SET ${set.number} の空所 (${ids[i]}) を確認してください。`
          );
        }

        const occurrences =
          set.summary.join("\n").match(
            new RegExp(`\\(${q.id}\\)`, "g")
          ) || [];

        if (occurrences.length !== 1) {
          throw new Error(
            `SET ${set.number} の空所 (${q.id}) は要約に1か所必要です。`
          );
        }
      });
    });

    return data;
  }

  let sets;

  try {
    sets = validateSets(window.q7Sets);
  } catch (error) {
    $("setList").textContent = error.message;
    return;
  }

  /* 履歴・解答状態 */

  function getHistory(id) {
    const saved = history[id];

    if (!validObject(saved)) {
      return {
        attempts: 0,
        bestScore: null,
        lastScore: null,
        passed: false
      };
    }

    return {
      attempts:
        Number.isSafeInteger(saved.attempts) && saved.attempts >= 0
          ? saved.attempts
          : 0,

      bestScore:
        validScore(saved.bestScore) ? saved.bestScore : null,

      lastScore:
        validScore(saved.lastScore) ? saved.lastScore : null,

      passed:
        saved.passed === true ||
        (validScore(saved.bestScore) && saved.bestScore >= 4)
    };
  }

  function cleanSession(saved) {
    const clean = {
      answers: {},
      graded: false,
      active: "a",
      choicesOpen: !mobile.matches
    };

    if (!validObject(saved)) return clean;

    if (validObject(saved.answers)) {
      ids.forEach(id => {
        if (validChoice(saved.answers[id])) {
          clean.answers[id] = saved.answers[id];
        }
      });
    }

    clean.graded =
      saved.graded === true &&
      ids.every(id => validChoice(clean.answers[id]));

    clean.active = ids.includes(saved.active)
      ? saved.active
      : "a";

    clean.choicesOpen =
      typeof saved.choicesOpen === "boolean"
        ? saved.choicesOpen
        : !mobile.matches;

    return clean;
  }

  function persistSession() {
    sessions[current.id] = state;
    save(SESSION_KEY, sessions);
  }

  function score() {
    return current.questions.reduce(
      (n, q) => n + Number(state.answers[q.id] === q.answer),
      0
    );
  }

  function answered() {
    return ids.filter(id => validChoice(state.answers[id])).length;
  }

  function paragraphsHTML(paragraphs) {
    return paragraphs.map(p => `<p>${escape(p)}</p>`).join("");
  }

  /* SET一覧 */

  function renderSetList() {
    $("setList").innerHTML = sets.map(set => {
      const h = getHistory(set.id);
      const s = cleanSession(sessions[set.id]);

      const resume =
        !s.graded && Object.keys(s.answers).length > 0;

      return `
        <article class="set-card">
          <p class="eyebrow">SET ${escape(set.number)}</p>
          <h3>${escape(set.title)}</h3>

          <span class="badge ${h.passed ? "passed" : ""}">
            ${
              h.passed
                ? "合格済み"
                : h.attempts
                  ? "挑戦済み"
                  : "未挑戦"
            }
          </span>

          <p class="set-history">
            挑戦 ${h.attempts}回<br>
            最高 ${
              h.bestScore === null ? "—" : `${h.bestScore} / 5`
            }
            　直近 ${
              h.lastScore === null ? "—" : `${h.lastScore} / 5`
            }
          </p>

          <button
            type="button"
            class="primary"
            data-set="${escape(set.id)}"
          >
            ${
              s.graded
                ? "結果を確認する"
                : resume
                  ? "続きから解く"
                  : "このSETを始める"
            }
          </button>
        </article>
      `;
    }).join("");

    if (!sets.length) {
      $("setList").textContent = "現在、問題は登録されていません。";
    }
  }

  /* SET開始 */

  function begin(id) {
    current = sets.find(set => set.id === id);
    if (!current) return;

    state = cleanSession(sessions[id]);

    $("setSelection").hidden = true;
    $("exercise").hidden = false;
    $("showSets").hidden = false;

    $("setTitle").textContent =
      `SET ${current.number} · ${current.title}`;

    $("passageHeading").textContent = current.passageTitle;

    // Passage A：英語段落 → 対応する日本語訳
$("passageContent").innerHTML =
  current.passage.map((paragraph, index) => `
    <p>${escape(paragraph)}</p>

    <p
      class="paragraph-translation"
      lang="ja"
      hidden
    >${escape(current.passageJa[index] || "")}</p>
  `).join("");

// Summary B：英語段落 → 対応する日本語訳
$("summaryContent").innerHTML =
  current.summary.map((paragraph, index) => {
    const text = escape(paragraph).replace(
      /\(([a-e])\)/g,
      (_, blankId) => `
        <button
          type="button"
          class="blank-button"
          data-blank="${blankId}"
          aria-label="空所 (${blankId}) の選択肢を開く"
        >(${blankId})</button>
      `
    );

    return `
      <p>${text}</p>

      <p
        class="paragraph-translation"
        lang="ja"
        hidden
      >${escape(current.summaryJa[index] || "")}</p>
    `;
  }).join("");

    $("passageJaContent").innerHTML =
      (
        current.passageTitleJa
          ? `<h4>${escape(current.passageTitleJa)}</h4>`
          : ""
      ) + paragraphsHTML(current.passageJa);

    $("summaryJaContent").innerHTML =
      paragraphsHTML(current.summaryJa);

    $("passageTranslation").open = false;
    $("summaryTranslation").open = false;
    $("answerHint").textContent = "";

    $("passagePanel").scrollTop = 0;
    $("summaryPanel").scrollTop = 0;

    switchView("summary");
    renderQuestions();
    update();

    if (mobile.matches) {
      $("summaryTab").focus({ preventScroll: true });
    } else {
      $("summaryPanel").focus({ preventScroll: true });
    }
  }

  /* 本文・要約の切替 */

  function switchView(view) {
    $("readingLayout").dataset.mobileView = view;

    $("summaryTab").setAttribute(
      "aria-pressed",
      String(view === "summary")
    );

    $("passageTab").setAttribute(
      "aria-pressed",
      String(view === "passage")
    );

    $("summaryTab").textContent =
      view === "passage" ? "解答に戻る" : "Summary B";

    $("passageTab").textContent =
      view === "passage" ? "Passage A" : "Passage Aを見る";

    if (current) {
      $("activeLabel").textContent = state.graded
        ? `確認中：(${state.active})`
        : `解答中：(${state.active})`;
    }
  }

  function returnToSummary() {
    switchView("summary");

    $("summaryContent")
      .querySelector(`[data-blank="${state.active}"]`)
      ?.focus({ preventScroll: true });
  }

  /* 選択肢のHTML */

  function choiceHTML(q, prefix) {
    return q.choices.map((text, i) => {
      const value = i + 1;
      const selected = state.answers[q.id] === value;

      if (state.graded) {
        const correct = q.answer === value;

        return `
          <div class="
            choice-option
            review-choice
            ${
              correct
                ? "correct-choice"
                : selected
                  ? "wrong-choice"
                  : ""
            }
          ">
            <span class="choice-number">${value}</span>

            <div>
              <span lang="en" class="choice-text">
                ${escape(text)}
              </span>

              <span class="choice-ja">
                ${escape(q.choicesJa[i])}
              </span>

              <span class="review-label">
                ${correct ? "正答" : ""}
                ${correct && selected ? "・" : ""}
                ${selected ? "自分の選択" : ""}
              </span>
            </div>
          </div>
        `;
      }

      return `
        <label class="choice-option ${selected ? "selected" : ""}">
          <input
            type="radio"
            name="${prefix}_${q.id}"
            data-question="${q.id}"
            value="${value}"
            ${selected ? "checked" : ""}
          >

          <span class="choice-number">${value}</span>

          <span lang="en" class="choice-text">
            ${escape(text)}
          </span>
        </label>
      `;
    }).join("");
  }

  /* 採点後の全5問の確認 */

  function renderQuestions() {
    if (!state.graded) {
      $("questionsContent").innerHTML = "";
      renderChoices();
      return;
    }

    $("questionsContent").innerHTML =
      current.questions.map(q => `
        <section
          class="question-card"
          id="question-${q.id}"
          aria-labelledby="question-heading-${q.id}"
        >
          <h4 id="question-heading-${q.id}">
            空所 (${q.id})
            ${
              state.answers[q.id] === q.answer
                ? "　○ 正解"
                : "　× 不正解"
            }
          </h4>

          <p class="review-line">
            自分の選択：${state.answers[q.id]}
            　正答：${q.answer}
          </p>

          ${choiceHTML(q, "desktop")}

          ${
            q.explanation
              ? `<p>${escape(q.explanation)}</p>`
              : ""
          }
        </section>
      `).join("");

    renderChoices();
  }

  /* 表示更新 */

  function update() {
    const count = answered();

    $("answeredCount").textContent = `${count} / 5 回答`;

    $("actionStatus").textContent = state.graded
      ? "採点済み・やり直して再挑戦できます"
      : count === 5
        ? "5問の解答がそろいました"
        : `未回答：${
            ids.filter(id => !state.answers[id])
              .map(id => `(${id})`)
              .join(" ")
          }`;

    $("gradeButton").disabled = state.graded;
    $("gradeButton").textContent =
      state.graded ? "採点済み" : "採点する";

    $("summaryPanel").classList.toggle("graded", state.graded);

// 末尾の全文訳欄は非表示にする。
$("passageTranslation").hidden = true;
$("summaryTranslation").hidden = true;

// 各段落の直下の訳を、採点後に表示する。
document.querySelectorAll(".paragraph-translation")
  .forEach(paragraph => {
    paragraph.hidden = !state.graded;
  });
    $("resultPanel").hidden = !state.graded;
    $("choicePanel").hidden = !state.choicesOpen;

    $("blankNav").innerHTML = ids.map(id => `
      <button
        type="button"
        data-blank="${id}"
        class="${state.answers[id] ? "answered" : ""}"
        aria-current="${id === state.active}"
        aria-label="空所 (${id})、${
          state.answers[id]
            ? `選択肢${state.answers[id]}を回答済み`
            : "未回答"
        }"
      >
        (${id})${state.answers[id] ? " ✓" : ""}
      </button>
    `).join("");

    $("summaryContent")
      .querySelectorAll(".blank-button")
      .forEach(button => {
        const id = button.dataset.blank;
        const selected = state.answers[id];
        const q = current.questions.find(q => q.id === id);

        button.classList.toggle("answered", !!selected);

        button.classList.toggle(
          "correct",
          state.graded && selected === q.answer
        );

        button.classList.toggle(
          "incorrect",
          state.graded && selected !== q.answer
        );

        button.classList.toggle(
          "active-blank",
          state.choicesOpen && id === state.active
        );

        button.textContent =
          `(${id})${
            state.graded
              ? selected === q.answer ? " ○" : " ×"
              : selected ? ` ${selected}` : ""
          }`;

        button.setAttribute(
          "aria-label",
          `空所 (${id})、${
            state.graded
              ? `自分の選択${selected}、正答${q.answer}を確認する`
              : selected
                ? `選択肢${selected}を回答済み、変更する`
                : "未回答、選択肢を開く"
          }`
        );
      });

    $("summaryContent").querySelectorAll("p").forEach(p => {
      p.classList.toggle(
        "active-summary-paragraph",
        state.choicesOpen &&
        !!p.querySelector(`[data-blank="${state.active}"]`)
      );
    });

    if (state.graded) {
      const correct = score();

      $("resultPanel").classList.toggle("failed", correct < 4);

      $("resultHeading").textContent =
        correct >= 4 ? "合格！" : "採点結果：不合格";

      $("resultScore").textContent = `${correct} / 5`;

      $("resultMessage").textContent =
        `${correct * 20}％正解 · 合格ラインは4 / 5です。` +
        "正答と日本語訳を確認できます。";
    }

    switchView($("readingLayout").dataset.mobileView);
  }

  /* 空所を選び、要約の下へ4択を表示 */

  function activateBlank(id) {
    if (!ids.includes(id)) return;

    state.active = id;
    state.choicesOpen = true;

    persistSession();
    switchView("summary");
    update();
    renderChoices();

    const blank = $("summaryContent")
      .querySelector(`[data-blank="${id}"]`);

    const panel = $("summaryPanel");
    const paragraph = blank.closest("p");

    // 要約パネル内だけを動かし、該当段落を表示する。
    panel.scrollTop +=
      paragraph.getBoundingClientRect().top -
      panel.getBoundingClientRect().top -
      16;

    const bounds = blank.getBoundingClientRect();
    const panelBounds = panel.getBoundingClientRect();

    // 長い段落でも現在の空所が見えるようにする。
    if (bounds.bottom > panelBounds.bottom - 12) {
      panel.scrollTop +=
        bounds.bottom - panelBounds.bottom + 24;
    }

    $("sheetChoices").scrollTop = 0;
  }

  function renderChoices() {
    const id = state.active;
    const q = current.questions.find(q => q.id === id);

    $("sheetHeading").textContent =
      `空所 (${id})${
        state.graded
          ? state.answers[id] === q.answer
            ? "　○ 正解"
            : "　× 不正解"
          : " の選択肢"
      }`;

    $("sheetChoices").innerHTML = choiceHTML(q, "sheet");
    $("sheetNext").disabled = id === "e";
  }

  /* 選択肢を閉じ、要約を広く表示 */

  function closeSheet() {
    if (!state) return;

    state.choicesOpen = false;

    persistSession();
    update();

    if (
      !mobile.matches ||
      $("readingLayout").dataset.mobileView === "summary"
    ) {
      $("summaryContent")
        .querySelector(`[data-blank="${state.active}"]`)
        ?.focus({ preventScroll: true });
    }
  }

  /* 解答を選ぶ。選択後も4択を残す。 */

  function choose(id, value) {
    if (
      state.graded ||
      !ids.includes(id) ||
      !validChoice(value)
    ) {
      return;
    }

    state.answers[id] = value;
    state.active = id;

    $("answerHint").textContent = "";

    $("summaryContent").querySelectorAll(".missing")
      .forEach(b => b.classList.remove("missing"));

    persistSession();
    update();

    // 選択肢は作り直さず、スクロール位置とフォーカスを保つ。
    document.querySelectorAll(
      `#sheetChoices input[data-question="${id}"]`
    ).forEach(input => {
      input.checked = Number(input.value) === value;

      input.closest("label")
        .classList.toggle("selected", input.checked);
    });
  }

  /* 採点 */

  function grade() {
    if (!current || state.graded) return;

    const missing = ids.filter(id => !state.answers[id]);

    if (missing.length) {
      $("answerHint").textContent =
        `未回答の空所があります：${
          missing.map(id => `(${id})`).join(" ")
        }。全5問を選んでから採点してください。`;

      missing.forEach(id => {
        $("summaryContent")
          .querySelector(`[data-blank="${id}"]`)
          .classList.add("missing");
      });

      state.active = missing[0];
      state.choicesOpen = true;

      update();
      renderChoices();
      switchView("summary");

      const blank = $("summaryContent")
        .querySelector(`[data-blank="${missing[0]}"]`);

      blank.scrollIntoView({ block: "center" });
      blank.focus({ preventScroll: true });

      return;
    }

    state.graded = true;
    state.choicesOpen = false;

    const correct = score();
    const previous = getHistory(current.id);

    history[current.id] = {
      attempts: previous.attempts + 1,
      bestScore: Math.max(previous.bestScore || 0, correct),
      lastScore: correct,
      passed: previous.passed || correct >= 4,
      lastAttemptedAt: Date.now()
    };

    save(HISTORY_KEY, history);
    persistSession();

    renderQuestions();
    update();
    renderSetList();
    switchView("summary");

    $("resultPanel").scrollIntoView({ block: "start" });

    $("resultHeading").setAttribute("tabindex", "-1");
    $("resultHeading").focus({ preventScroll: true });
  }

  /* やり直し */

  function retry() {
    if (
      !state.graded &&
      answered() &&
      !window.confirm(
        "このSETの解答を消して、最初からやり直しますか？学習履歴は残ります。"
      )
    ) {
      return;
    }

    state = cleanSession(null);
    persistSession();

    $("answerHint").textContent = "";
    $("passageTranslation").open = false;
    $("summaryTranslation").open = false;

    $("summaryContent").querySelectorAll(".missing")
      .forEach(b => b.classList.remove("missing"));

    renderQuestions();
    update();
    switchView("summary");

    $("summaryPanel").scrollTop = 0;
    $("passagePanel").scrollTop = 0;

    $("summaryPanel").focus({ preventScroll: true });
  }

  /* イベント登録 */

  $("setList").addEventListener("click", event => {
    const button = event.target.closest("[data-set]");
    if (button) begin(button.dataset.set);
  });

  $("showSets").addEventListener("click", () => {
    $("exercise").hidden = true;
    $("setSelection").hidden = false;
    $("showSets").hidden = true;

    renderSetList();
    $("setHeading").focus();
  });

  ["blankNav", "summaryContent"].forEach(id => {
    $(id).addEventListener("click", event => {
      const button = event.target.closest("[data-blank]");

      if (button) {
        activateBlank(button.dataset.blank);
      }
    });
  });

  $("sheetChoices").addEventListener("change", event => {
    const input = event.target.closest("input[data-question]");

    if (input) {
      choose(input.dataset.question, Number(input.value));
    }
  });

  $("summaryTab").addEventListener("click", returnToSummary);

  $("passageTab").addEventListener("click", () => {
    switchView("passage");
  });

  $("returnToSummary").addEventListener(
    "click",
    returnToSummary
  );

  $("gradeButton").addEventListener("click", grade);
  $("retryButton").addEventListener("click", retry);
  $("closeSheet").addEventListener("click", closeSheet);

  $("sheetPassage").addEventListener("click", () => {
    // 選択肢の開閉状態を変えずに本文へ移る。
    switchView("passage");
    $("passagePanel").focus({ preventScroll: true });
  });

  $("sheetNext").addEventListener("click", () => {
    const index = ids.indexOf(state.active);

    if (index < 4) {
      activateBlank(ids[index + 1]);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && state?.choicesOpen) {
      closeSheet();
    }
  });

  renderSetList();
})();
