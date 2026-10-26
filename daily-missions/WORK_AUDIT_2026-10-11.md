# Daily missions Work audit — 2026-10-11

Status: local development tests passed; NOT ready for production release.

## Verified starting point

- Remote feature head: `217a35a54fc03b0c4867be732f7589b332dc08bf`.
- Main inspected: `11d2294a017cdb8c6a9f65283fc7c9d3a364a7a3`.
- GitHub comparison: feature 179 commits ahead / 21 behind the common ancestor. Much of this includes merged historical changes; it is not 179 mission changes.
- Historical chat confirms definition/session prototypes, pure autosave projection and mock merge tests, not live Worker integration.
- Current main was merged INTO feature locally (`e03a725`). Main was never checked out, edited or pushed.
- The existing API URL contains “staging”, but it is used by the live app and was treated as protected production. No requests, migrations, account login or deployment to it were performed.

## Findings corrected

1. Mission dates used device-local time. Date generation now uses JST independently of browser timezone.
2. Word quiz exports referenced undefined `dailyMissionStartAccount`; idiom/Q7 exports referenced undefined `GOIMON_DAILY_RESULT_ORIGIN`; Q9 exports/history referenced out-of-scope `LV`. These caused exceptions or silently missing results.
3. Manual result recording bypassed account checks. All six recorder entry points now require the pinned account and, for accounts, the writer lock.
4. Word results could be imported twice. Timestamp identity now makes a repeated latest result idempotent.
5. Result persistence required returning to the test screen. All 11 quiz scripts now preserve a temporary result and attempt immediate account-scoped mission recording at quiz completion. A return link is shown for daily routes.
6. Reorder and listening-format histories were absent from the compact-state allowlist.
7. A 120-key ceiling could not hold 45 days of assignment/completion/three reading selection keys. It is now 250; 45 full days plus those four history keys use 229 keys. Cloud pruning never deletes source or guest keys.
8. Packed cloud state had no nested validation. Browser and Worker now share a strict version/level/internal-key/value/completion validator with 250KB per-level and existing global 900KB limits.
9. The pure projection did not tolerate source changes after acknowledgement. It now reconciles against the acknowledged packed base and preserves independent existing raising data.
10. A brand-new device could generate assignments before cloud restoration. The isolated sync test screen waits for the first sync outcome before generation.
11. Unavailable level-2 slots could compare `undefined === undefined` and then dereference a missing completion. Status matching now requires an available mission and a real record. Level 2 exposes only implemented word/Q9-or-Q11 candidates.

## Integration behavior

- Runtime bridge activation requires BOTH `dailyMissionSync: true` in test config and page/API hosts limited to localhost, 127.0.0.1 or the mocked API host `api.test`.
- The checked-in production `cloud_config.js` is unchanged. Production mission autosave is disabled even if someone sets the flag on a public host.
- The existing account/session/Web Locks/autosave transaction is reused; no new account system or spendable reward ledger exists.
- Compact states merge via three-way reconciliation. Independent completion slots are combined. Divergent same-slot/assignment/cursor records stop for explicit review; they are not guessed or silently overwritten.
- Local and remote profiles are backed up before automatic reconciliation. Original unsaved results are retained when a recorder cannot persist.
- Active learning pages still stop remote replacement after interaction; safe reconciliation is deferred to a reload/save screen.
- Normal cloud errors/backoff/CAS/user isolation behavior is retained. Projection failures stop saving and retain the original profile.
- The menu entry is visible only in the isolated runtime. The test page remains directly accessible in a feature checkout.
- Stars remain display-only, with 19 as the maximum estimate. No reward writes were introduced.

## Tests actually executed

| Kind | Evidence | Result |
| --- | --- | --- |
| Syntax | `node --check` on 76 root/daily JS files | Passed |
| Node/VM and mocked transport | `node --test tests/*.test.cjs` — 41 tests | Passed |
| Real Chromium + mocked HTTP | `tests/cloud-browser.cjs` — ordinary guest/account learning, login UI, offline, storage quota, lock contention, rescue, save races | Passed |
| Real Chromium + mocked HTTP | `tests/cloud-autosave-browser.cjs` — navigation, budgets, network failure, token expiry and conflicts | Passed |
| Real Chromium DOM + mocked HTTP | `tests/daily-missions-browser.cjs` — six sessions played to completion; 11 routes initialized; JST in Los Angeles; level 2; immediate/duplicate imports; second-context restoration; concurrent/offline merge | Passed |
| Real Chromium layout/navigation | `tests/navigation-browser.cjs` — mobile/desktop, keyboard focus, existing dialogs | Passed |
| Real isolated local D1 emulator | `cd cloud-worker && npm test` — 12 tests including mission round-trip, CAS race, recovery revision and invalid payload rejection | Passed |
| Live deployed Worker / remote D1 / real Google OAuth | Not executed | Outstanding |
| Physical PC + smartphone / actual audio listening | Not executed | Outstanding |

The six DOM sessions used actual answer controls with varying scores. Threshold/identity/range cases are tested independently in VM tests. A browser context is a simulated separate device, not a physical smartphone. Local D1 uses `persist:false`; no deployed D1 was touched. Browser HTTP was intercepted and external production connections were blocked.

## Release gate and remaining work

1. Review and provision a separately named test Worker, separately owned test D1 and test-only Google account. Never reuse either checked-in production Wrangler configuration.
2. Extend the local-only gate only after that environment is approved; add an exact test-origin allowlist rather than a general host bypass.
3. Run real Google login, GET/POST/GET, two physical devices, lost-response/offline/re-login/guest-transfer/restore tests against the isolated service.
4. Play all alternate word modes, both idiom modes, Q8/Q10 and listening formats 3/5 to completion on real devices; verify audio timing and accessibility. Eleven initialization checks do not replace those tests.
5. Verify active-page concurrent edits stop safely and recovery contains both states; retain manual review for divergent assignments/cursors.
6. Inspect deployed Worker compatibility and the final feature-versus-main diff. Prepare a reviewed release/rollback plan. Obtain explicit user approval before any production Worker change, deployment or main merge.

No production-ready claim is made. The next blocking operation is isolated service setup/live authentication, not a main merge.
