// quiz_ui_common.js
// クイズ系ページの共通UI補助
// 今回はまず「問題番号表示」を共通化する
//
// 使い方例
// window.QuizUICommon.renderQuestionProgress("questionProgress", 3, 10);
// => 第3問 / 10問

(function () {
  "use strict";

  if (window.QuizUICommon) return;

  function getEl(targetOrId) {
    if (!targetOrId) return null;
    if (typeof targetOrId === "string") {
      return document.getElementById(targetOrId);
    }
    return targetOrId;
  }

  function clampInt(n, min) {
    const x = Number(n);
    if (!Number.isFinite(x)) return min;
    return Math.max(min, Math.floor(x));
  }

  function setText(targetOrId, text) {
    const el = getEl(targetOrId);
    if (!el) return;
    el.textContent = String(text ?? "");
  }

  function clearText(targetOrId) {
    const el = getEl(targetOrId);
    if (!el) return;
    el.textContent = "";
  }

  function show(targetOrId) {
    const el = getEl(targetOrId);
    if (!el) return;
    el.style.display = "";
  }

  function hide(targetOrId) {
    const el = getEl(targetOrId);
    if (!el) return;
    el.style.display = "none";
  }

  function renderQuestionProgress(targetOrId, current, total, options = {}) {
    const el = getEl(targetOrId);
    if (!el) return;

    const cur = clampInt(current, 0);
    const tot = clampInt(total, 0);

    if (tot <= 0 || cur <= 0) {
      el.textContent = "";
      return;
    }

    const prefix = typeof options.prefix === "string" ? options.prefix : "第";
    const unit = typeof options.unit === "string" ? options.unit : "問";
    const separator = typeof options.separator === "string" ? options.separator : " / ";

    el.textContent = `${prefix}${cur}${unit}${separator}${tot}${unit}`;
  }

  function renderPlainCounter(targetOrId, current, total, options = {}) {
    const el = getEl(targetOrId);
    if (!el) return;

    const cur = clampInt(current, 0);
    const tot = clampInt(total, 0);

    if (tot <= 0 || cur <= 0) {
      el.textContent = "";
      return;
    }

    const leftLabel = typeof options.leftLabel === "string" ? options.leftLabel : "";
    const rightLabel = typeof options.rightLabel === "string" ? options.rightLabel : "";
    const separator = typeof options.separator === "string" ? options.separator : " / ";

    el.textContent = `${leftLabel}${cur}${separator}${tot}${rightLabel}`;
  }

  window.QuizUICommon = {
    setText,
    clearText,
    show,
    hide,
    renderQuestionProgress,
    renderPlainCounter
  };
})();
