# Format-level class assignments — 2026-10-23

User decision: category/learning format is sufficient; do not add individual question ID records.

## Behaviour
- Assignment specifies class, title, exam level, learning format, target answer count and inclusive start/end dates (Japan time).
- Progress reuses authoritative daily format counters: correct + wrong. Repeated answers count. Ordinary learning and quest answers of the same format contribute. It does not mean distinct questions or a specified range are complete.
- All eligible learning on the specified dates counts, including earlier on the publication date. No per-assignment answer streams, reward grants, polling or new sync endpoint.
- Only approved memberships contribute, limited by each student's consented sharing start date. No unsynced completion claim. No exact completion timestamp is inferred from daily counters.
- Teacher can inspect counts, status, accuracy and last sync; export CSV; end distribution. Closing hides the student launch button; it does not freeze/delete daily records. Shared period totals continue to reflect later syncs.
- Category and grade combinations are allowlisted. This version offers graded exercises only, excluding ungraded flashcards.
- Student entry: hamburger menu and home footer → 先生からの課題. Teacher entry: 学習の記録 → クラス・教師用 → 課題.
- `assignments.html?example=1`: explicitly labeled fictional read-only teacher example. No API calls, real publication, or learning-data writes. CSV marked fictional. Normal view never substitutes demo data.

## Backend activation still required
Apply additive migration `0007_learning_assignments.sql` after 0006 on the development D1 database, then deploy the development Worker with existing login/origin protections and `LEARNING_CLASSES_ENABLED=true`. Approved teachers table remains the permission source. The Site still has empty API/Google configuration, so real distribution is not live here. Public main is untouched.

## Tests
`node cloud-worker/tests/learning_classes.mjs` (Node 24) covers class and assignment ownership, pending member exclusion, consent date, duplicate snapshot reads, category/grade validation, empty saves and closing. Existing learning record tests also pass. Browser: teacher example, mobile responsive cards and unconnected notice. No real Google/D1 end-to-end distribution test claimed.

## Limits
200 assignments per class; student response currently shows latest 200 by due date across approved classes. No range enforcement, individual question history, push/email notifications or per-assignment submit button. Counters are learner-side measurements, not exam-grade anti-cheat evidence.
