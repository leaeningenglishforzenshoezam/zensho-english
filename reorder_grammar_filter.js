// 大問12：文法タグ別演習と、級別に保存する文法タグの学習記録。
// DOMに依存しないため、演習画面・テストの両方から利用できます。
(function (root) {
  "use strict";

  function questionTags(question) {
    return [...new Set((Array.isArray(question?.grammarTags) ? question.grammarTags : [])
      .filter(tag => typeof tag === "string" && tag.trim()))];
  }

  function filterIndexes(questions, indexes, selectedTags) {
    const selected = new Set(Array.isArray(selectedTags) ? selectedTags : []);
    if (!selected.size) return [...indexes];
    // 複数選択は OR。複数のタグを持つ問題も1回だけ出題する。
    return indexes.filter(index => questionTags(questions[index]).some(tag => selected.has(tag)));
  }

  function recordAttempt(previous, tags, isCorrect) {
    const next = { ...(previous && typeof previous === "object" ? previous : {}) };
    for (const tag of new Set(Array.isArray(tags) ? tags : [])) {
      if (typeof tag !== "string" || !tag.trim()) continue;
      const old = next[tag] || {};
      const attempts = Math.max(0, Number(old.attempts) || 0);
      const correct = Math.max(0, Number(old.correct) || 0);
      next[tag] = {
        attempts: attempts + 1,
        correct: correct + (isCorrect ? 1 : 0)
      };
    }
    return next;
  }

  function collectTags(questions, dictionary, autoWeak, manualWeak, grammarStats) {
    const byTag = new Map();
    for (const q of questions) {
      for (const tag of questionTags(q)) {
        if (!byTag.has(tag)) {
          byTag.set(tag, {
            tag,
            label: dictionary?.[tag]?.label || tag,
            questionCount: 0,
            weakQuestionCount: 0
          });
        }
        const entry = byTag.get(tag);
        entry.questionCount++;
        if ((Number(autoWeak?.[q.id]) || 0) > 0 || !!manualWeak?.[q.id]) {
          entry.weakQuestionCount++;
        }
      }
    }

    return [...byTag.values()].map(entry => {
      const stats = grammarStats?.[entry.tag] || {};
      const attempts = Math.max(0, Number(stats.attempts) || 0);
      const correct = Math.min(attempts, Math.max(0, Number(stats.correct) || 0));
      const accuracy = attempts ? Math.round(100 * correct / attempts) : null;
      return {
        ...entry,
        attempts,
        correct,
        accuracy,
        // 少数回のミスだけで正答率から「苦手」と断定しない。
        weak: entry.weakQuestionCount > 0 || (attempts >= 3 && accuracy < 70)
      };
    }).sort((a, b) => a.label.localeCompare(b.label, "ja"));
  }

  const api = { questionTags, filterIndexes, recordAttempt, collectTags };
  root.ReorderGrammarFilter = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
