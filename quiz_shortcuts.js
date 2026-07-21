// quiz_shortcuts.js
// 4択・5択系クイズ向け 共通キーボードショートカット
//
// 想定操作
// 1〜5 : 解答
// Enter / Space / → : 次へ
// ← : 前の問題
// V : 音声
// Escape : 設定などへ戻る
//
// 各ページでは
// window.QuizShortcuts.register({...})
// で登録して使う

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
      return isFunction(fn)
        ? fn()
        : fallback;
    } catch (e) {
      console.warn(
        "QuizShortcuts safeCall failed:",
        e
      );

      return fallback;
    }
  }

  function isEditableTarget(target) {
    if (!target) return false;
    if (target.isContentEditable) return true;

    const tag =
      String(
        target.tagName || ""
      ).toLowerCase();

    return (
      tag === "textarea" ||
      tag === "select" ||
      tag === "input"
    );
  }

  function hasModifierKey(e) {
    return !!(
      e.ctrlKey ||
      e.metaKey ||
      e.altKey
    );
  }

  function normalizeKey(e) {
    return String(
      e.key || ""
    ).toLowerCase();
  }

  function isRegistered() {
    return !!currentConfig;
  }

  function isActive() {
    if (!currentConfig) return false;

    return !!safeCall(
      currentConfig.isActive,
      false
    );
  }

  function canAnswer() {
    if (!currentConfig) return false;

    return !!safeCall(
      currentConfig.canAnswer,
      false
    );
  }

  function canNext() {
    if (!currentConfig) return false;

    return !!safeCall(
      currentConfig.canNext,
      false
    );
  }

  function canPrevious() {
    if (!currentConfig) return false;

    return !!safeCall(
      currentConfig.canPrevious,
      false
    );
  }

  function canSpeak() {
    if (!currentConfig) return false;

    return !!safeCall(
      currentConfig.canSpeak,
      false
    );
  }

  function canBack() {
    if (!currentConfig) return false;

    return !!safeCall(
      currentConfig.canBack,
      false
    );
  }

  function answer(index) {
    if (
      !currentConfig ||
      !isFunction(
        currentConfig.onAnswer
      )
    ) {
      return;
    }

    try {
      currentConfig.onAnswer(index);
    } catch (e) {
      console.warn(
        "QuizShortcuts onAnswer failed:",
        e
      );
    }
  }

  function next() {
    if (
      !currentConfig ||
      !isFunction(
        currentConfig.onNext
      )
    ) {
      return;
    }

    try {
      currentConfig.onNext();
    } catch (e) {
      console.warn(
        "QuizShortcuts onNext failed:",
        e
      );
    }
  }

  function previous() {
    if (
      !currentConfig ||
      !isFunction(
        currentConfig.onPrevious
      )
    ) {
      return;
    }

    try {
      currentConfig.onPrevious();
    } catch (e) {
      console.warn(
        "QuizShortcuts onPrevious failed:",
        e
      );
    }
  }

  function speak() {
    if (
      !currentConfig ||
      !isFunction(
        currentConfig.onSpeak
      )
    ) {
      return;
    }

    try {
      currentConfig.onSpeak();
    } catch (e) {
      console.warn(
        "QuizShortcuts onSpeak failed:",
        e
      );
    }
  }

  function back() {
    if (
      !currentConfig ||
      !isFunction(
        currentConfig.onBack
      )
    ) {
      return;
    }

    try {
      currentConfig.onBack();
    } catch (e) {
      console.warn(
        "QuizShortcuts onBack failed:",
        e
      );
    }
  }

  function register(config) {
    currentConfig = {
      isActive:
        isFunction(config?.isActive)
          ? config.isActive
          : () => false,

      canAnswer:
        isFunction(config?.canAnswer)
          ? config.canAnswer
          : () => false,

      canNext:
        isFunction(config?.canNext)
          ? config.canNext
          : () => false,

      canPrevious:
        isFunction(config?.canPrevious)
          ? config.canPrevious
          : () => false,

      canSpeak:
        isFunction(config?.canSpeak)
          ? config.canSpeak
          : () => false,

      canBack:
        isFunction(config?.canBack)
          ? config.canBack
          : () => false,

      onAnswer:
        isFunction(config?.onAnswer)
          ? config.onAnswer
          : noop,

      onNext:
        isFunction(config?.onNext)
          ? config.onNext
          : noop,

      onPrevious:
        isFunction(config?.onPrevious)
          ? config.onPrevious
          : noop,

      onSpeak:
        isFunction(config?.onSpeak)
          ? config.onSpeak
          : noop,

      onBack:
        isFunction(config?.onBack)
          ? config.onBack
          : noop
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
      canPrevious: canPrevious(),
      canSpeak: canSpeak(),
      canBack: canBack()
    };
  }

  document.addEventListener(
    "keydown",
    e => {
      if (!currentConfig) return;
      if (!isActive()) return;
      if (e.defaultPrevented) return;
      if (e.isComposing) return;
      if (hasModifierKey(e)) return;
      if (isEditableTarget(e.target)) {
        return;
      }

      const key = normalizeKey(e);

      // 1〜5で解答
      if (/^[1-5]$/.test(key)) {
        if (!canAnswer()) return;

        e.preventDefault();
        answer(Number(key));
        return;
      }

      // ←で前の問題
      if (key === "arrowleft") {
        if (!canPrevious()) return;

        e.preventDefault();
        previous();
        return;
      }

      // → / Enter / Spaceで次へ
      if (
        key === "arrowright" ||
        key === "enter" ||
        key === " "
      ) {
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
    }
  );

  window.QuizShortcuts = {
    register,
    clear,
    getState
  };
})();
