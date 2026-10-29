# Learning records — 2026-10-22

## Delivered
- Hamburger menu → 学習の記録. Personal record uses existing level-specific daily learning logs, inclusive dates up to 366 days, weighted accuracy, daily chart, responsive category cards and CSV.
- Optional `seconds` field added to daily category slots. Legacy counters and pending reward metadata remain intact; historical unknown time displays —. No historical time is invented.
- Foreground interaction time: 5-second local sampling, batched writes after 15 seconds; hidden tabs and inactivity exceeding 2 minutes excluded. JST day boundaries split. No dedicated network timer. Normal existing autosave handles cloud snapshots.
- Q7 and real chapter battles contribute counts. Tutorial battles excluded. Story reading is not counted. Quiz/exercise pages also include settings/answer-review time while actively used; this is an approximate measure, not proctored time.
- Aggregation is by learning category, not individual word/question ID. Existing per-question weaknesses remain separate.
- CSV uses BOM and neutralizes spreadsheet formula prefixes.

## Class backend — not activated on the Site
The preview's `cloud_config.js` still has empty Google client/API settings. Its class tab explicitly reports setup pending; personal guest records work locally.

New additive migration: `cloud-worker/migrations/0006_learning_classes.sql`.
Routes in `src/learning_classes.js` reuse existing origin restrictions, bearer-session verification and rate limiting. Feature flag `LEARNING_CLASSES_ENABLED=true` is required.

Before activation in a login-enabled development environment:
1. Apply existing migrations plus 0006 to the development D1 database. Back up and verify the target environment first.
2. Approve the verified teacher's internal users.id in `approved_teachers`; never infer permission from self-declared profile role. Example parameterized SQL: `INSERT INTO approved_teachers(user_id) VALUES(?)`.
3. Configure the feature flag, deploy the Worker development branch, and configure the matching Google OAuth origin/API endpoint in the development frontend.
4. Test with two distinct teacher accounts and student accounts: create code, consent/share date, pending approval, approval, report, code rotation, leave, and account switch.

Class report reads the existing authoritative save snapshot once per student; it does not increment totals or duplicate sync events. Only the owning approved teacher may view reports. Pending members are excluded; sharing starts at the consented date. Leaving stops access and preserves the student's save. Codes are 10 random characters; stop/reissue controls are available. Cap: 20 classes per teacher, 100 members per class, 10 memberships per student.

## Validation
- `node checks/learning-records.cjs`: weighted aggregation, date limits, legacy missing time, CSV safety, JST midnight, hidden tab time, account isolation.
- `node cloud-worker/tests/learning_classes.mjs` (Node 24): in-memory SQLite migration and handler tests for teacher ownership, pending/share boundaries, repeated snapshot reads, malformed category and leaving without deleting saves.
- Existing chapter-flow and quest-presentation tests pass.
- Browser QA: real vocabulary answer appears in records; mobile layout inspected at 390px using an internal iframe harness (not shipped).

## Limits
No live Google/D1 integration test performed for this new feature. No load benchmark claimed. Existing save-size limits still apply; no historical records are purged. Existing pre-JST historical day keys are retained as stored. Server-side class retention/removal policy and teacher provisioning operations must be established before classroom rollout.
