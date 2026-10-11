# Daily missions: Worker schema release gate (development branch only)

The browser allowlist permits `goimon_daily_cloud_state_v1_lv1` and `goimon_daily_cloud_state_v1_lv2`, but the **deployed Cloudflare Worker schema has NOT been independently inspected (the repository Worker source has now been inspected and tested against an isolated local D1)**. Browser acceptance does not imply server acceptance. Do not enable automatic uploads, amend production D1, or merge into main at this stage.

## Required server-side contract

1. Confirm the Worker validates `schemaVersion: 1`, `snapshot.data` key/value records, and per-account ownership.
2. Add only the two exact `goimon_daily_cloud_state_v1_lv[12]` keys to the Worker allowlist. Never permit arbitrary localStorage keys or cross-account payloads.
3. Validate the nested daily payload version, level, date range (JST), allowed internal keys, bounded size, and completed slot structure. Keep existing snapshot size/entry limits.
4. Require `expectedRevision` on writes. On 409 read latest revision and perform a conflict-aware three-way merge; do not overwrite unrelated learning data.
5. Verify that the account profile's `data` and `base` can be reconciled without resetting the student's other GOIMON histories.
6. Run isolated test-account GET/POST/GET, offline resume and two-device race tests; back up both profiles before any migration.
7. Server-verified rewards are separate from client-submitted mission completion state; this plan does not award any shards.

## Current integration boundary

- `daily_mission_core.js` saves per-account mission source keys through `GOIMONStorage`.
- `daily_mission_cloud_adapter.js` packs those keys into the cloud-allowlisted compact key but does not auto-stage them.
- `cloud_autosave.js` syncs only allowlisted keys already present in the account profile. Merely changing the allowlist cannot include unpacked mission keys.
- `stageToProfile` is intentionally confirmation-gated; activating it in production prior to Worker compatibility tests risks triggering a rejected autosave.
- `prepareCloudUpdate` and `GoimonDailyCloudSync.syncOnce` are opt-in development helpers; they are not plugged into production autosave. The newer autosave bridge has a hard local-only runtime gate and is tested with real Chromium/mocked HTTP.

## Next implementation checkpoint

After Worker source and deployment access are verified, implement a feature-only, revision-aware pack-and-sync bridge that integrates with the cloud autosave transaction. Ensure a rejected Worker request leaves the original account/guest data intact and emits a recovery path. Do not auto-deploy.


See `WORK_AUDIT_2026-10-11.md` for the updated local test evidence. Remote service gates remain outstanding.

## Item registration boundary (2026-10-11)

`goimon_item_state_v1_lv1` and `goimon_item_state_v1_lv2` are deliberately **device-only, not cloud-allowlisted**. The management/dex UI registers existing owned copies without granting or consuming items; test fixtures never enter production. Before any cloud integration, establish a server-authoritative inventory/receipt contract, validate ownership/copy allocation, define revision-aware reconciliation and guest adoption, and test recovery with isolated accounts. Do not treat client-side shape validation or catalog visibility as ownership proof. Do not enable autosave by adding these keys alone. See `ITEM_MANAGEMENT_2026-10-11.md`.

## Server reward drafts (2026-10-12)

The feature branch has isolated server-issued/scored attempts for level-1 word EN→JA and idiom meaning/synonym modes. Reward receipts and economy CAS are exercised against persist:false local D1. Idiom grading atomically advances independent mode cursors only after all 15 answers; both modes share a single daily reward slot. The request adapter uses existing application sessions but is NOT wired into the normal Worker. Draft SQL stays outside migrations/. Other formats, the basic bonus, production verification, storage bounds and protected progress adoption remain release gates. No live rewards or client completion imports are enabled. See `MISSION_REWARDS_2026-10-12.md` and `IDIOM_REWARDS_2026-10-12.md`.

## Basic exam and bonus draft checkpoint

Level-1 exam 9 (A/B/mix) and exam 11 now use frozen server-issued daily sets and 10-answer server grading. Basic bonus eligibility requires all three basic slots with matching user/level/JST day/rules version, and SQL guards protect both ordinary and bonus claims within the economy transaction. The feature-only request adapter remains disconnected from index.js; draft SQL is not a production migration. Challenge slots, alternate word modes, browser/server wiring, weak-item selection, bounded history and protected adoption remain outstanding. See `EXAM_BONUS_REWARDS_2026-10-12.md` for the 1198-question answer parity audit and isolated test evidence.
