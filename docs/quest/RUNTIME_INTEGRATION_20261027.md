# Runtime integration checkpoint — not a release candidate

Source: Site 70d3b5011c5e34e39eb4c2c624b9e98e7ffe496b (version 36).
Target: integration/release-safety-20261027, parent 343895d4f4c5d381a65ee753a5c04c9cb4d03dbe.

## Actual runtime integration
48 Site runtime files integrated at application paths, including chapter 1/2, shared completion controls, home/record/dex/loadout/gacha views, question audio, victory staging, battle balance, and current dex descriptions. Existing learning pages, production login configuration, and the production storage implementation were not replaced with preview copies.

Quest stores now use GOIMONQuestStorage when opened with native storage. Only the currently pinned account's exact old chapter key is mapped to a canonical account-scoped key. Read-only legacy fallback does not write or delete anything; the first successful save adopts the progress. Original legacy records remain for recovery. Developer session storage bypasses this adapter. Canonical malformed data must fail rather than fall back to stale legacy progress.

Added shared cloud allowlist/validation for goimon_quest_chapter1_v1_lv1 and goimon_quest_chapter2_v1_lv1. The Worker must be updated before this client is published. No production API calls, login attempts, or main changes in this checkpoint.

## Verification
- Save/autosave/rescue/quest migration targeted run: 20 passed.
- Replay/hub/DOM transitions/victory targeted run: 14 passed. All 23 scenes and nine battle-to-story transitions covered with synthetic fixtures.
- Updated audio question test fixtures for implemented Q1/Q3, post-battle recovery expectation to 1/3, and asset expectations for 38 assets including WebP. Gameplay was not weakened to satisfy old tests.
- Full root suite last run: 151 tests, 140 passed, 11 failed. One damage assertion is nondeterministic due to introduced RNG; other unresolved assertions include historical balance expectations, the unequipped child-party final boss simulation, and explicit raw-storage audit of newly integrated profile/quest modules. Do not suppress these checks to claim readiness.
- Real Google login / browser UI / production API restore remain unverified.

## Remaining gates
- 23 chapter-1 PNGs, three gacha PNGs and five BGM files exist in the Site source but are absent at these GitHub application paths. Persist and verify these assets, plus the traveler SVG, before release. Do not replace missing art with guessed assets.
- Home/navigation/missions/learning-records/teacher backend integration is not completed. Root index/navigation still use existing production versions. Some new pages link to those pending integrations.
- Item wallet/loadout cloud validation and formal reward semantics remain separate release gates; do not present local preview rewards as verified server rewards.
- Remove private-development navigation and preview notices only after release gates pass. Keep developer storage isolated.
- Shared schema API deployment, then real test-account login/save/logout/restore checks, then main publication.

The previous Site remains unchanged by this GitHub integration checkpoint.
