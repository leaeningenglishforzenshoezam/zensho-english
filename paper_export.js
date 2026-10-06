/* Paper worksheets use the original choices and matching answer numbers.
 * No learning sessions, scores or rewards are changed by exporting.
 */
(function () {
  "use strict";
  const ids = ["a", "b", "c", "d", "e"];
  const titles = { q7: "大問7 要約空所補充", q8: "大問8 会話文完成", q10: "大問10 長文空欄補充" };
  const escape = value => String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
  const blank = id => `(${id}) __________`;

  function uniqueSources(source) {
    const seen = new Set();
    return source.filter(q => {
      if (seen.has(q.id)) return false;
      seen.add(q.id);
      return true;
    });
  }

  function normalize(type, source) {
    const number = type === "q8" ? source.id : source.number;
    const base = { id: source.id, number, title: source.title, titleJa: source.titleJa, body: [], translation: [], choices: [], answers: [] };
    if (type === "q7") {
      base.body = [{ heading: `Passage A: ${source.passageTitle}`, lines: source.passage },
        { heading: "Summary B", lines: source.summary.map(p => p.replace(/\(([a-e])\)/g, (_, id) => blank(id))) }];
      base.translation = [{ heading: "Passage A 日本語訳", lines: source.passageJa },
        { heading: "Summary B 日本語訳（空所は記号のまま）", lines: source.summaryJa }];
      base.choices = source.questions.map(q => ({ id: q.id, items: q.choices }));
      base.answers = source.questions.map(q => ({ id: q.id, number: q.answer,
        text: q.choices[q.answer - 1], ja: q.choicesJa[q.answer - 1] }));
      base.choiceTranslations = source.questions.map(q => ({ id: q.id, items: q.choicesJa }));
    } else if (type === "q8") {
      base.body = [{ heading: "Conversation", lines: source.dialogue.map(line => `${line.speaker}: ${line.blank ? blank(line.blank) : line.text}`) }];
      base.choices = [{ id: null, items: source.choices.map(c => c.text) }];
      base.answers = ids.map(id => {
        const index = source.choices.findIndex(c => c.id === source.answers[id]);
        if (index < 0) throw new Error(`問題${number}の正答が見つかりません。`);
        return { id, number: index + 1, text: source.choices[index].text, ja: source.choices[index].ja };
      });
      base.translation = [{ heading: "会話文 日本語訳（正答補充済み）", lines: source.dialogue.map(line => {
        const text = line.blank ? source.choices.find(c => c.id === source.answers[line.blank]).ja : line.ja;
        return `${line.speaker}: ${line.blank ? `(${line.blank}) ` : ""}${text}`;
      }) }];
      base.choiceTranslations = [{ id: null, items: source.choices.map(c => c.ja) }];
    } else if (type === "q10") {
      base.body = [{ heading: "Passage", lines: source.paragraphs.map(p => p.sentences.map(s => s.en).join(" ")
        .replace(/\{\{([a-e])\}\}/g, (_, id) => blank(id))) }];
      base.translation = [{ heading: "本文 日本語訳（正答補充済み）", lines: source.paragraphs.map(p => p.sentences.map(s => s.ja).join("")) }];
      base.choices = source.blanks.map(b => ({ id: b.id, items: b.choices.map(c => c.text) }));
      base.answers = source.blanks.map(b => {
        const index = b.choices.findIndex(c => c.id === b.answer);
        if (index < 0) throw new Error(`問題${number}の正答が見つかりません。`);
        return { id: b.id, number: index + 1, text: b.choices[index].text, explanation: b.explanation };
      });
    } else {
      throw new Error("出力する問題形式を確認してください。");
    }
    return base;
  }

  function selection(data, start, end, order, attempts = () => 0, random = Math.random) {
    const min = Math.min(Number(start), Number(end));
    const max = Math.max(Number(start), Number(end));
    const picked = data.filter(q => q.number >= min && q.number <= max);
    if (!picked.length) throw new Error("出力する問題がありません。範囲を選び直してください。");
    picked.sort((a, b) => a.number - b.number);
    if (order === "unattempted") picked.sort((a, b) => attempts(a.id) - attempts(b.id) || a.number - b.number);
    if (order === "random") {
      for (let i = picked.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [picked[i], picked[j]] = [picked[j], picked[i]];
      }
    }
    return picked;
  }

  function problemLines(q) {
    return [`第${q.number}問 / SET ${q.number}: ${q.title}`, "",
      ...q.body.flatMap(b => [b.heading, "", ...b.lines.flatMap(p => [p, ""])]),
      "選択肢", ...q.choices.flatMap(c => [c.id ? `(${c.id})` : "",
        ...c.items.map((text, i) => `${i + 1}. ${text}`), ""]),
      "解答欄: (a) ______  (b) ______  (c) ______  (d) ______  (e) ______", ""];
  }
  function answerLines(q) {
    return [`第${q.number}問 / SET ${q.number}: ${q.title}`, "正答",
      ...q.answers.flatMap(a => [`(${a.id}) ${a.number}. ${a.text}${a.ja ? ` / ${a.ja}` : ""}`,
        ...(a.explanation ? [a.explanation] : [])]), "",
      ...q.translation.flatMap(b => [b.heading, "", ...b.lines.flatMap(p => [p, ""])]),
      ...(q.choiceTranslations ? ["選択肢の日本語訳", ...q.choiceTranslations.flatMap(c => [c.id ? `(${c.id})` : "",
        ...c.items.map((text, i) => `${i + 1}. ${text}`), ""])] : [])];
  }
  function textDocument(type, data, mode) {
    const parts = ["全商英検1級", titles[type], "選択肢は元データの番号順です。", ""];
    if (mode !== "answers") parts.push("【問題】", "組 ______ 番 ______ 氏名 ____________________", "",
      ...data.flatMap(q => [...problemLines(q), "----------------------------------------", ""]));
    if (mode !== "questions") parts.push("【解答・日本語訳】", "",
      ...data.flatMap(q => [...answerLines(q), "----------------------------------------", ""]));
    return parts.join("\n");
  }

  const css = `
    * { box-sizing: border-box; }
    body { margin: 0; color: #111; background: #eef1f5; font: 10.5pt/1.45 "Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif; }
    .toolbar { position: sticky; top: 0; padding: 14px; background: #fff; border-bottom: 1px solid #ccc; text-align: center; }
    .toolbar button { padding: 10px 20px; margin: 4px; font: inherit; cursor: pointer; }
    .toolbar p { margin: 6px 0; font-size: 10pt; }
    main { max-width: 210mm; margin: 16px auto; background: #fff; padding: 16mm; }
    h1 { font-size: 18pt; margin: 0 0 8mm; }
    h2 { font-size: 14pt; margin: 0 0 5mm; break-after: avoid; }
    h3 { font-size: 11pt; margin: 3mm 0 2mm; break-after: avoid; }
    p { margin: 0 0 2mm; orphans: 3; widows: 3; }
    .english { font-family: Georgia, "Times New Roman", serif; font-size: 11pt; line-height: 1.4; }
    body.q8 p { margin-bottom: 1mm; }
    .choices { margin: 0 0 2mm; padding: 0; list-style: none; }
    .choices li { margin-bottom: 1mm; padding-left: 6mm; text-indent: -6mm; break-inside: avoid; }
    .answer-row, .summary-block { break-inside: avoid; }
    .choice-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 5mm; }
    .choice-group { break-inside: avoid; }
    .answer-box { margin: 6mm 0; padding: 3mm; border: 1px solid #555; }
    article + article, .answer-section { break-before: page; margin-top: 10mm; }
    .meta { font-size: 10pt; margin-bottom: 6mm; }
    @page { size: A4; margin: 16mm; }
    @media print {
      body { background: #fff; }
      .toolbar { display: none; }
      main { width: auto; max-width: none; margin: 0; padding: 0; }
      article + article, .answer-section { margin-top: 0; }
    }`;

  function blockHtml(b, english) {
    return `<div${b.heading.startsWith("Summary B") ? ' class="summary-block"' : ""}><h3>${escape(b.heading)}</h3>${b.lines.map(p => `<p${english ? ' class="english" lang="en"' : ' lang="ja"'}>${escape(p)}</p>`).join("")}</div>`;
  }
  function choicesHtml(c, english) {
    return `${c.id ? `<h3>(${escape(c.id)})</h3>` : ""}<ol class="choices${english ? " english" : ""}">${c.items.map((text, i) => `<li>${i + 1}. ${escape(text)}</li>`).join("")}</ol>`;
  }
  function printDocument(type, data, mode) {
    const questionHtml = data.map(q => `<article><h2>第${q.number}問 / SET ${q.number}: ${escape(q.title)}</h2>
      <div class="answer-box">解答欄: (a) ______　(b) ______　(c) ______　(d) ______　(e) ______</div>
      ${q.body.map(b => blockHtml(b, true)).join("")}<h3>選択肢</h3><div${type === "q10" ? ' class="choice-grid"' : ""}>${q.choices.map(c => `<div class="choice-group">${choicesHtml(c, true)}</div>`).join("")}</div></article>`).join("");
    const answersHtml = data.map(q => `<article><h2>第${q.number}問 / SET ${q.number}: ${escape(q.title)}</h2><h3>正答</h3>
      ${q.answers.map(a => `<div class="answer-row"><p>(${escape(a.id)}) <strong>${a.number}</strong>. ${escape(a.text)}${a.ja ? ` / ${escape(a.ja)}` : ""}</p>${a.explanation ? `<p>${escape(a.explanation)}</p>` : ""}</div>`).join("")}
      ${q.translation.map(b => blockHtml(b, false)).join("")}${q.choiceTranslations ? `<h3>選択肢の日本語訳</h3>${q.choiceTranslations.map(c => `<div class="choice-group">${choicesHtml(c, false)}</div>`).join("")}` : ""}</article>`).join("");
    return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(titles[type])} 印刷用</title><style>${css}</style></head><body class="${escape(type)}">
      <div class="toolbar"><button type="button" id="printPaper">印刷 / PDFとして保存</button><p>印刷先で「PDFとして保存」を選んでください。用紙はA4、倍率は100%を推奨します。</p><p>選択肢は元データの番号順です。演習画面のシャッフル順とは異なります。</p></div>
      <main><h1>全商英検1級 ${escape(titles[type])}</h1>
      ${mode !== "answers" ? `<section><p class="meta">問題 ${data.length}題　組 ______ 番 ______ 氏名 ____________________</p>${questionHtml}</section>` : ""}
      ${mode !== "questions" ? `<section${mode === "both" ? ' class="answer-section"' : ""}><h1>解答・日本語訳</h1>${answersHtml}</section>` : ""}</main></body></html>`;
  }

  function download(type, data, mode) {
    const blob = new Blob(["\uFEFF", textDocument(type, data, mode)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_${data.map(q => q.number).join("-")}_${mode}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function setup() {
    const host = document.getElementById("paperExportControls");
    if (!host) return;
    const type = host.dataset.paperType;
    const source = type === "q7" ? window.q7Sets : type === "q8" ? dialogueQuestions : q10Questions;
    const data = uniqueSources(source).map(q => normalize(type, q));
    host.innerHTML = `<button type="button" id="paperExportToggle" class="paper-export-toggle" aria-expanded="false" aria-controls="paperExportPanel">問題を紙で解きたい人はこちら <span aria-hidden="true">▼</span></button>
      <div id="paperExportPanel" class="paper-export-panel" hidden><h3>紙で解く・教材を保存</h3>
      <fieldset class="paper-export-selection"><legend>ダウンロードする問題（複数選択可）</legend>
      <div class="paper-select-actions"><button type="button" id="paperSelectAll">すべて選択</button><button type="button" id="paperSelectNone">選択解除</button>${type !== "q7" ? '<button type="button" id="paperSelectRange">現在の出題範囲を選択</button>' : ""}</div>
      <div class="paper-question-list">${data.map((q, i) => `<label class="paper-question-item"><input type="checkbox" name="paperQuestion" value="${i}"><span><strong>${type === "q7" ? "SET" : "問題"} ${q.number}</strong> ${escape(q.titleJa || q.title)}</span></label>`).join("")}</div>
      <p id="paperSelectedCount" aria-live="polite"></p></fieldset>
      <label>出力内容 <select id="paperExportMode"><option value="both">問題＋解答・日本語訳</option><option value="questions">問題のみ</option><option value="answers">解答・日本語訳のみ</option></select></label>
      <div class="paper-export-actions"><button type="button" id="exportPaperPdf">PDFで出力</button><button type="button" id="exportPaperText">テキストをダウンロード</button></div>
      <p>チェックした問題を出力します。PDFは印刷画面で保存できます。選択肢は元データの番号順です。</p><p id="paperExportStatus" role="status" aria-live="polite"></p></div>`;
    const toggle = document.getElementById("paperExportToggle");
    const panel = document.getElementById("paperExportPanel");
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(expanded));
      panel.hidden = !expanded;
      toggle.querySelector("span").textContent = expanded ? "▲" : "▼";
    });
    const inputs = [...host.querySelectorAll('input[name="paperQuestion"]')];
    function updateCount() {
      const count = inputs.filter(input => input.checked).length;
      document.getElementById("paperSelectedCount").textContent = `${count}題を選択中 / 全${data.length}題`;
      document.getElementById("exportPaperPdf").disabled = count === 0;
      document.getElementById("exportPaperText").disabled = count === 0;
    }
    function selectWhere(predicate) {
      inputs.forEach((input, i) => { input.checked = predicate(data[i]); });
      updateCount();
    }
    function selectRange() {
      if (type === "q7") { selectWhere(() => true); return; }
      const start = Number(document.getElementById("questionRangeStart").value);
      const end = Number(document.getElementById("questionRangeEnd").value);
      selectWhere(q => q.number >= Math.min(start, end) && q.number <= Math.max(start, end));
    }
    inputs.forEach(input => input.addEventListener("change", updateCount));
    document.getElementById("paperSelectAll").addEventListener("click", () => selectWhere(() => true));
    document.getElementById("paperSelectNone").addEventListener("click", () => selectWhere(() => false));
    if (type !== "q7") {
      document.getElementById("paperSelectRange").addEventListener("click", selectRange);
      ["questionRangeStart", "questionRangeEnd"].forEach(id => document.getElementById(id).addEventListener("change", selectRange));
    }
    selectRange();
    function selected() {
      const picked = inputs.filter(input => input.checked).map(input => data[Number(input.value)]);
      if (!picked.length) throw new Error("ダウンロードする問題を選んでください。");
      const order = type === "q7" ? "sequential" : document.querySelector('input[name="questionOrder"]:checked')?.value;
      return selection(picked, Math.min(...picked.map(q => q.number)), Math.max(...picked.map(q => q.number)), order,
        id => typeof getQuestionAttemptCount === "function" ? getQuestionAttemptCount(id) : 0);
    }
    function handle(pdf) {
      const status = document.getElementById("paperExportStatus");
      try {
        const chosen = selected();
        const mode = document.getElementById("paperExportMode").value;
        if (pdf) {
          const popup = window.open("", "_blank");
          if (!popup) throw new Error("印刷用画面を開けませんでした。このサイトのポップアップを許可して、もう一度押してください。");
          popup.opener = null;
          popup.document.open();
          popup.document.write(printDocument(type, chosen, mode));
          popup.document.close();
          popup.document.getElementById("printPaper").addEventListener("click", () => { popup.focus(); popup.print(); });
          status.textContent = `${chosen.length}題の印刷用画面を開きました。「印刷 / PDFとして保存」を押してください。`;
        } else {
          download(type, chosen, mode);
          status.textContent = `${chosen.length}題のテキストをダウンロードしました。`;
        }
      } catch (error) {
        status.textContent = error.message || "出力できませんでした。範囲を確認してください。";
      }
    }
    document.getElementById("exportPaperPdf").addEventListener("click", () => handle(true));
    document.getElementById("exportPaperText").addEventListener("click", () => handle(false));
  }
  window.PaperExport = { normalize, uniqueSources, selection, textDocument, printDocument };
  document.addEventListener("DOMContentLoaded", setup);
})();
