# Release integration checkpoint — NOT READY TO PUBLISH

## Second checkpoint (2026-10-27 JST)
- Recovered the actual latest Site checkout at commit 356c24bb8b3b5e951f61ad1938ccb813adec1cef; no Site redeployment or audience change.
- Integrated presentation-only study_focus.js/css into eight existing production learning pages without replacing their quiz, account, or saving code. Reorder hint/reset/check/next controls stay above the question; answered cards collapse and explanations move above choices.
- Imported five presentation regression tests. Together with save safety/autosave/rescue/key audits: 25/25 pass.
- Classified two read-only chapter 2 previews explicitly in the storage audit. The legacy battle demo may use only its named temporary sessionStorage return key; persistent learning storage remains forbidden. Cloud suite: 7/7 pass.
- Full root suite: 129 tests; after fixing the preview audit, eight battle balance expectations remain unresolved. Do not increase skill powers merely to satisfy historical expectations.
- Worker suite: 71 tests, 70 passed, one content/assets parity test failed; inspect before release.
- Wrangler whoami reports NOT AUTHENTICATED. Production Worker deployment needs the owner's configured Cloudflare access. Do not deploy to a temporary account or publish a frontend that depends on an undeployed validator.
- Chapter 1/2 Site progression is still stored separately from standard cloud snapshots; integration and real test-account login/restore verification remain mandatory. No main update or production save writes performed.

Parents: main d35802fe2b4bca3635d63fd9bfdd643093a04a4e and feature/chapter2-story-20261022 36227ea448f1a9b4feac70cc8e48ed63785d6372.

## Integrated in this checkpoint
- Combined GitHub branches; resolved announcements by ID, preserving main's latest Vercel closure and login guidance plus the development-only quest preview announcement.
- Q11 grade 2 requires GOIMONStorage; no silent raw-storage fallback.
- Added the exact grade-2 Q11 weakness key to the shared client/Worker save allowlist. No records renamed, removed, or reset.
- Added synthetic tests for reload, account isolation, guest preservation, cloud serialization and restore of Q11 weakness, pet and learning log.

## Validation
20 tests passed: release-save-safety, cloud-storage-keys, cloud-rescue, cloud-autosave. Uses synthetic storage only, not actual Google sign-in or production D1.
The broader cloud.test.cjs static page audit still fails on chapter2_final_boss_preview.html (no storage adapter on that preview); classify preview/runtime pages before updating that audit, do not simply suppress failures.

## Mandatory remaining gates
1. Recover latest Site source 356c24bb8b3b5e951f61ad1938ccb813adec1cef and integrate its runtime changes with this merged GitHub app. site-integration patches are still archived patches, not applied root files.
2. Update stale development quest announcement only after actual feature availability is established.
3. Verify server deployment compatibility before publishing the newly allowed save key. Old API validators can reject snapshots containing it. Deploying GitHub Pages does not deploy Cloudflare Workers.
4. Validate quest progress/rewards/loadouts against the account/cloud storage flow and run full regression tests.
5. Real test-account Google login, save, sign-out/re-login, and second-browser restore (no real student records). Verify failure/retry behavior.
6. Publish main only after these gates pass. This branch is a checkpoint, not a release candidate.
