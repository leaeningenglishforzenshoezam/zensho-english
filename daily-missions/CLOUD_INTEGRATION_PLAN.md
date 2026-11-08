# GOIMON daily mission cloud integration plan

Status: DRAFT — do not merge into main or deploy.

## Current state
- Production main contains cloud_schema.js, cloud_storage.js, cloud_sync.js, cloud_autosave.js and cloud_auto.js.
- feature/daily-missions contains the current main cloud files and Worker source after the Work audit integration.
- Source mission keys are packed into two exact allowlisted keys. The tested runtime bridge is enabled only for isolated localhost/mocked HTTP, never for the current production configuration.

## State requiring migration
- Daily assignments: goimon_daily_missions_v2_lv{level}_{YYYY-MM-DD}.
- Completion records: goimon_daily_mission_completions_v1_lv{level}_{YYYY-MM-DD}.
- Independent word-day, idiom-mode cursor, reading/listening rotation and practice history keys in daily_mission_core.js.
- Do not sync temporary sessionStorage quiz results.

## Safety requirements
1. Never blindly sync all localStorage. Keep existing schema allowlist, validation and size limits.
2. Prefer a bounded, versioned per-account daily state with retention, rather than unlimited per-day snapshot keys.
3. Keep local provisional achievements separate from server-verified rewards; do not grant stars from editable client data.
4. Future server reward transaction IDs must be unique per user, JST date, slot and reward version, including all-basic bonus.
5. Preserve guest and signed-in data separately, take recovery backups, and reconcile concurrent devices with revision checks.
6. Test offline edits, retries, midnight JST, two devices, migrations, guest import, account switches and recovery.

## Release gates
1. Verify cloud upload/reload/recovery on two test devices; runtime verification still outstanding.
2. Inventory mission payload size and define compact schema and safe merge semantics.
3. Implement and test migration/serialization on feature/daily-missions ONLY.
4. Carefully integrate latest main changes into the feature branch WITHOUT changing main.
5. Test full mission UI and signed-in/guest/offline states; retain disabled server reward grants until secure D1 mechanism passes tests.
6. Only after user approval and all tests, merge into main to expose to students.

## Work checkpoint
See `WORK_AUDIT_2026-10-11.md` for the verified implementation, test distinctions and remaining live-service release gates.
