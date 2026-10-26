# Compact study UI

Apply study-focus.patch after mobile-ui-tutorial-reveal.patch to Site source (dist/ and checks/). Preserved integration patch only; application root and main remain unchanged.

Eight pages: quiz, quiz_jaen, audio_quiz, accent, sentence, reorder, idiom_quiz, paraphrase_quiz.

Shared presentation helper moves existing DOM nodes (preserving listeners), condenses counters, places detailed metadata and secondary actions behind Details, prioritizes feedback above choices, and folds Q12 used cards after answering. Q12 removes duplicate answer text (completed sentence and selected cards remain accessible). No scoring, answer data, storage, or rewards changes.

Validation: 4 new Node tests (counters, feedback order/restoration, incomplete vs completed Q12, eight-page integration). Existing mobile/chapter/shop checks pass. Browser: Q12 correct/incorrect, next-question restoration, accent feedback/details, Japanese-to-English quiz at 390px. Not a full iOS Safari or all-question regression pass.
