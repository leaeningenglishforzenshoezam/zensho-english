// 大問12：文法タグ別演習と、級別に保存する文法タグの学習記録。
// DOMに依存しないため、演習画面・テストの両方から利用できます。
(function (root) {
  "use strict";

  const GROUPS = [
    { id: "sentence", label: "文型・動詞", tags: [
      "formal_subject_it", "formal_object_it", "causative_verb", "verb_o_c",
      "verb_object_do", "verb_object_to_do", "verb_object_ving", "verb_object_pp",
      "passive_in_form", "passive_question", "being_pp", "available_postmodifier",
      "leave_place", "known_to", "participle", "exclamation", "with_object_complement"
    ] },
    { id: "verbals", label: "不定詞・動名詞", tags: [
      "adj_enough_to_do", "be_likely_to", "gerund_expression", "infinitive_expression",
      "negative_having", "negative_to_infinitive", "object_to_doing", "preposition_gerund", "perfect_inf"
    ] },
    { id: "clauses", label: "関係詞・名詞節", tags: [
      "do_you_think_insertion", "noun_clause", "relative_pronoun", "relative_where",
      "relative_when", "that_clause", "whether_pattern", "place_clause"
    ] },
    { id: "comparison", label: "比較・数量", tags: [
      "comparative_emphasis", "paired_comparison", "one_of_the_superlative",
      "superlative_emphasis", "that_of_comparison", "x_times_as_a_as", "quantity_form", "degree_as"
    ] },
    { id: "negative", label: "否定・仮定法", tags: [
      "negative_inversion", "if_it_were_not_for", "wish_past", "hardly_any",
      "no_longer", "not_until", "so_neither"
    ] },
    { id: "connectors", label: "接続・助動詞", tags: [
      "as_if", "as_long_as", "conjunction_as", "concession_what", "no_matter_how",
      "in_case", "purpose_clause", "time_patterns", "modal_guess", "modal_perfect",
      "may_well_do", "had_better_not_do"
    ] },
    { id: "idioms", label: "熟語・語法", tags: [
      "idiom", "phrasal_verb", "take_advantage_of", "occur_to", "verb_of",
      "verb_a_of_b", "verb_a_from_b", "used_to", "paired_forms"
    ] }
  ];
  const GROUP_BY_TAG = new Map(GROUPS.flatMap(group => group.tags.map(tag => [tag, group.id])));

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
            group: GROUP_BY_TAG.get(tag) || "other",
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

  const api = { GROUPS, questionTags, filterIndexes, recordAttempt, collectTags };
  root.ReorderGrammarFilter = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
