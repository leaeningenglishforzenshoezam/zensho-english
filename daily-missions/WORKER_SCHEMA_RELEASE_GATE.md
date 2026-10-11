# Daily missions: Worker schema release gate (development branch only)

The browser allowlist permits `goimon_daily_cloud_state_v1_lv1` and `goimon_daily_cloud_state_v1_lv2`, but the **deployed Cloudflare Worker schema has NOT been independently inspected**. Browser acceptance does not imply server acceptance. Do not enable automatic uploads, amend production D1, or merge into main at this stage.

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
- `prepareCloudUpdate` and `GoimonDailyCloudSync.syncOnce` are opt-in development helpers; they are not plugged into production autosave.

## Next implementation checkpoint

After Worker source and deployment access are verified, implement a feature-only, revision-aware pack-and-sync bridge that integrates with the cloud autosave transaction. Ensure a rejected Worker request leaves the original account/guest data intact and emits a recovery path. Do not auto-deploy.
