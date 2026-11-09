# Quest review improvements (2026-11-09)

Base: main 0735604b0e1e8e2bc9811c1cebdc03fe75b00b06. No Worker, D1, reward or growth rules changed.

## Changes
- Shared chapter review links normalize idiom IDs to display numbers and return to the originating chapter. Chapter 2 now uses the same weak-list registration UI.
- Both chapters show per-battle correct/answered counts after victory presentation and on defeat. Counts come from the existing combat log, including repeated questions.
- Up to five distinct missed question snapshots are stored inside the existing combat save. Optional untimed practice supports all seven connected formats, including ordered chunks and audio replay. Practice does not change combat, growth, currency, or aggregate learning records. It is explicitly labeled as practice. Refreshing restarts optional practice, not the saved battle.
- Legacy battle saves without snapshots retain results/review links but cannot reconstruct short practice. No migration or reset is performed.
- Eligibility is unchanged: egg/child/growth only. Setup, quest home and loadout clarify that evolution to mid blocks participation, while records remain. Choosing another eligible partner restarts the chapter only after confirmation.
- High-contrast cream/green result cards, 46px minimum buttons, single-column mobile actions, collapsed explanations, hidden answer choices after grading, and focused headings. Results replace the battle artwork area to reduce scrolling.

## Verification
- 20 tests: quest-learning, quest-restart-policy, quest-save-integration, chapter1.
- 6 chapter2 runtime tests: nine battles, real question banks, 23-scene resume, loss boundary, stale/corrupt saves.
- Asset signature test excluded: this focused checkout does not contain binary assets (unchanged by this patch).
- Isolated browser fixture: desktop and 375px iframe, result → retry → grading → result; ordered answers; mobile horizontal width 375/375.
- Syntax checked for changed scripts. No real-account/cloud restoration, full rendered chapter playthrough, or physical-phone test in this change.

## Release caution
Merge/deploy only after integrated chapter UI verification. The isolated fixture is not a full public-site preview. No server migration is needed.
