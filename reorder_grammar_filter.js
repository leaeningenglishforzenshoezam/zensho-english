// 大問12：文法タグ別演習と、級別に保存する文法タグの学習記録。
// DOMに依存しないため、演習画面・テストの両方から利用できます。
(function (root) {
  "use strict";

  // 学習者が選ぶ単元（約20項目）と、解説・苦手分析用の細かいタグを分離する。
  // STEPの順は「文型 → 準動詞 → 節 → 比較 → 接続 → 発展構文 → 熟語」。
  const STEPS = [
    { id: "sentence", label: "文型・動詞", units: [
      { id: "sentence_svoc", label: "第5文型・使役動詞", description: "make O do / have O 過去分詞 など", tags: [
        "causative_verb", "verb_o_c", "verb_object_do", "verb_object_to_do", "verb_object_ving", "verb_object_pp", "leave_place"
      ] },
      { id: "sentence_it", label: "形式主語・目的語と重要構文", description: "it の構文 / What の感嘆文など", tags: [
        "formal_subject_it", "formal_object_it", "exclamation"
      ] },
      { id: "sentence_participle", label: "分詞・受動態", description: "分詞の後置修飾 / with O C など", tags: [
        "passive_in_form", "passive_question", "being_pp", "available_postmodifier", "known_to", "participle", "with_object_complement"
      ] }
    ] },
    { id: "verbals", label: "不定詞・動名詞", units: [
      { id: "verbals_infinitive", label: "不定詞", description: "否定・完了不定詞 / enough to など", tags: [
        "adj_enough_to_do", "be_likely_to", "negative_to_infinitive", "perfect_inf"
      ] },
      { id: "verbals_gerund", label: "動名詞", description: "前置詞 + ～ing / 動名詞の否定 など", tags: [
        "negative_having", "object_to_doing", "preposition_gerund"
      ] },
      { id: "verbals_expressions", label: "不定詞・動名詞の重要表現", description: "to do / ～ing を使う定型表現", tags: [
        "gerund_expression", "infinitive_expression"
      ] }
    ] },
    { id: "clauses", label: "関係詞・名詞節", units: [
      { id: "clauses_noun", label: "名詞節・間接疑問文", description: "what / whether / that 節 など", tags: [
        "do_you_think_insertion", "noun_clause", "that_clause", "whether_pattern"
      ] },
      { id: "clauses_pronoun", label: "関係代名詞", description: "who / which / that など", tags: ["relative_pronoun"] },
      { id: "clauses_adverb", label: "関係副詞", description: "when / where を使う節", tags: [
        "relative_where", "relative_when", "place_clause"
      ] }
    ] },
    { id: "comparison", label: "比較・数量", units: [
      { id: "comparison_forms", label: "比較表現", description: "as ... as / 比較の強調 など", tags: [
        "comparative_emphasis", "paired_comparison", "that_of_comparison", "degree_as"
      ] },
      { id: "comparison_superlative", label: "最上級", description: "one of the 最上級 / 強調", tags: [
        "one_of_the_superlative", "superlative_emphasis"
      ] },
      { id: "comparison_quantity", label: "数量・倍数表現", description: "何倍 / 数量・範囲 など", tags: [
        "x_times_as_a_as", "quantity_form"
      ] }
    ] },
    { id: "connectors", label: "接続詞・助動詞", units: [
      { id: "connectors_conjunction", label: "接続詞・譲歩表現", description: "as / no matter how など", tags: [
        "as_if", "as_long_as", "conjunction_as", "concession_what", "no_matter_how"
      ] },
      { id: "connectors_time", label: "時・条件・目的の構文", description: "in case / so that など", tags: [
        "in_case", "purpose_clause", "time_patterns"
      ] },
      { id: "connectors_modal", label: "助動詞・推量", description: "must / may well / had better など", tags: [
        "modal_guess", "modal_perfect", "may_well_do", "had_better_not_do"
      ] }
    ] },
    { id: "negative", label: "否定・仮定法・倒置", units: [
      { id: "negative_expression", label: "否定表現", description: "hardly any / no longer など", tags: ["hardly_any", "no_longer"] },
      { id: "negative_conditional", label: "仮定法", description: "wish / if it were not for など", tags: ["if_it_were_not_for", "wish_past"] },
      { id: "negative_inversion", label: "倒置・強調構文", description: "No sooner / Not until など", tags: [
        "negative_inversion", "not_until", "so_neither"
      ] }
    ] },
    { id: "idioms", label: "熟語・語法", units: [
      { id: "idioms_phrasal", label: "重要イディオム・句動詞", description: "頻出イディオム / 句動詞 など", tags: [
        "idiom", "phrasal_verb", "take_advantage_of"
      ] },
      { id: "idioms_prepositions", label: "動詞と前置詞", description: "verb A of B / verb A from B など", tags: [
        "occur_to", "verb_of", "verb_a_of_b", "verb_a_from_b"
      ] },
      { id: "idioms_patterns", label: "慣用構文", description: "used to / 対になる表現 など", tags: ["used_to", "paired_forms"] }
    ] }
  ];
  const GROUPS = STEPS.map(step => ({ id: step.id, label: step.label, tags: step.units.flatMap(unit => unit.tags) }));
  const UNITS = STEPS.flatMap(step => step.units.map(unit => ({ ...unit, group: step.id })));
  const GROUP_BY_TAG = new Map(GROUPS.flatMap(group => group.tags.map(tag => [tag, group.id])));
  const UNIT_BY_TAG = new Map(UNITS.flatMap(unit => unit.tags.map(tag => [tag, unit.id])));

  function tagsForUnits(unitIds) {
    const ids = new Set(unitIds);
    return [...new Set(UNITS.filter(unit => ids.has(unit.id)).flatMap(unit => unit.tags))];
  }

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

  function collectUnits(questions, dictionary, autoWeak, manualWeak, grammarStats) {
    const entries = collectTags(questions, dictionary, autoWeak, manualWeak, grammarStats);
    const byTag = new Map(entries.map(entry => [entry.tag, entry]));
    return UNITS.map(unit => {
      const covered = unit.tags.map(tag => byTag.get(tag)).filter(Boolean);
      if (!covered.length) return null;
      const coveredTags = new Set(covered.map(entry => entry.tag));
      const weak = covered.filter(entry => entry.weak);
      return {
        ...unit,
        tags: covered.map(entry => entry.tag),
        questionCount: questions.filter(question => questionTags(question).some(tag => coveredTags.has(tag))).length,
        weakTags: weak.map(entry => entry.tag),
        weakLabels: weak.map(entry => entry.label),
        weak: weak.length > 0
      };
    }).filter(Boolean);
  }

  const api = { GROUPS, STEPS, UNITS, UNIT_BY_TAG, tagsForUnits, questionTags, filterIndexes, recordAttempt, collectTags, collectUnits };
  root.ReorderGrammarFilter = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
