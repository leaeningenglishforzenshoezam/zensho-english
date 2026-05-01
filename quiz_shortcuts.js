// quiz_shortcuts.js
// 4択系クイズ向け 共通キーボードショートカット
// 想定操作
// 1〜4 : 解答
// Enter / Space : 次へ
// V : 音声
// Escape : 戻る（必要なページだけ）
//
// 各ページでは window.QuizShortcuts.register({...}) で登録して使う

(function () {
  "use strict";

  if (window.QuizShortcuts) return;

  const noop = () => {};

  let currentConfig = null;

  function isFunction(fn) {
    return typeof fn === "function";
  }

  function safeCall(fn, fallback) {
    try {
      return isFunction(fn) ? fn() : fallback;
    } catch (e) {
      console.warn("QuizShortcuts safeCall failed:", e);
      return fallback;
    }
  }

  function isEditableTarget(target) {
    if (!target) return false;
    if (target.isContentEditable) return true;

    const tag = String(target.tagName || "").toLowerCase();
    if (tag === "textarea" || tag === "select") return true;
    if (tag === "input") return true;

    return false;
  }

  function hasModifierKey(e) {
    return !!(e.ctrlKey || e.metaKey || e.altKey);
  }

  function normalizeKey(e) {
    return String(e.key || "").toLowerCase();
  }

  function isRegistered() {
    return !!currentConfig;
  }

  function isActive() {
    if (!currentConfig) return false;
    return !!safeCall(currentConfig.isActive, false);
  }

  function canAnswer() {
    if (!currentConfig) return false;
    return !!safeCall(currentConfig.canAnswer, false);
  }

  function canNext() {
    if (!currentConfig) return false;
    return !!safeCall(currentConfig.canNext, false);
  }

  function canSpeak() {
    if (!currentConfig) return false;
    return !!safeCall(currentConfig.canSpeak, false);
  }

  function canBack() {
    if (!currentConfig) return false;
    return !!safeCall(currentConfig.canBack, false);
  }

  function answer(index) {
    if (!currentConfig || !isFunction(currentConfig.onAnswer)) return;
    try {
      currentConfig.onAnswer(index);
    } catch (e) {
      console.warn("QuizShortcuts onAnswer failed:", e);
    }
  }

  function next() {
    if (!currentConfig || !isFunction(currentConfig.onNext)) return;
    try {
      currentConfig.onNext();
    } catch (e) {
      console.warn("QuizShortcuts onNext failed:", e);
    }
  }

  function speak() {
    if (!currentConfig || !isFunction(currentConfig.onSpeak)) return;
    try {
      currentConfig.onSpeak();
    } catch (e) {
      console.warn("QuizShortcuts onSpeak failed:", e);
    }
  }

  function back() {
    if (!currentConfig || !isFunction(currentConfig.onBack)) return;
    try {
      currentConfig.onBack();
    } catch (e) {
      console.warn("QuizShortcuts onBack failed:", e);
    }
  }

  function register(config) {
    currentConfig = {
      isActive: isFunction(config?.isActive) ? config.isActive : () => false,
      canAnswer: isFunction(config?.canAnswer) ? config.canAnswer : () => false,
      canNext: isFunction(config?.canNext) ? config.canNext : () => false,
      canSpeak: isFunction(config?.canSpeak) ? config.canSpeak : () => false,
      canBack: isFunction(config?.canBack) ? config.canBack : () => false,
      onAnswer: isFunction(config?.onAnswer) ? config.onAnswer : noop,
      onNext: isFunction(config?.onNext) ? config.onNext : noop,
      onSpeak: isFunction(config?.onSpeak) ? config.onSpeak : noop,
      onBack: isFunction(config?.onBack) ? config.onBack : noop
    };
  }

  function clear() {
    currentConfig = null;
  }

  function getState() {
    return {
      registered: isRegistered(),
      active: isActive(),
      canAnswer: canAnswer(),
      canNext: canNext(),
      canSpeak: canSpeak(),
      canBack: canBack()
    };
  }

  document.addEventListener("keydown", (e) => {
    if (!currentConfig) return;
    if (!isActive()) return;
    if (e.defaultPrevented) return;
    if (e.isComposing) return;
    if (hasModifierKey(e)) return;
    if (isEditableTarget(e.target)) return;

    const key = normalizeKey(e);

    // 1〜4で解答
    if (key === "1" || key === "2" || key === "3" || key === "4") {
      if (!canAnswer()) return;
      e.preventDefault();
      answer(Number(key));
      return;
    }

    // Enter / Space で次へ
    if (key === "enter" || key === " ") {
      if (!canNext()) return;
      e.preventDefault();
      next();
      return;
    }

    // Vで音声
    if (key === "v") {
      if (!canSpeak()) return;
      e.preventDefault();
      speak();
      return;
    }

    // Escapeで戻る
    if (key === "escape") {
      if (!canBack()) return;
      e.preventDefault();
      back();
    }
  });

  window.QuizShortcuts = {
    register,
    clear,
    getState
  };
})();
