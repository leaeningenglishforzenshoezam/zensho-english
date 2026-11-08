-- DRAFT ONLY: intentionally outside migrations/. Do not apply to production.
-- Separate from saves: learning snapshots cannot create balances or ownership.
CREATE TABLE economy_accounts (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 revision INTEGER NOT NULL DEFAULT 0 CHECK(revision>=0),
 state_json TEXT NOT NULL CHECK(json_valid(state_json)),
 updated_at TEXT NOT NULL DEFAULT(datetime('now'))
);
CREATE TABLE economy_receipts (
 user_id TEXT NOT NULL REFERENCES economy_accounts(user_id) ON DELETE CASCADE,
 operation_id TEXT NOT NULL,
 request_json TEXT NOT NULL CHECK(json_valid(request_json)),
 expected_revision INTEGER NOT NULL CHECK(expected_revision>=0),
 next_state_json TEXT NOT NULL CHECK(json_valid(next_state_json)),
 result_json TEXT NOT NULL CHECK(json_valid(result_json)),
 created_at TEXT NOT NULL DEFAULT(datetime('now')),
 PRIMARY KEY(user_id,operation_id),
 UNIQUE(user_id,expected_revision)
);
-- The receipt and balance/inventory advance form one SQLite transaction.
CREATE TRIGGER economy_receipt_guard BEFORE INSERT ON economy_receipts
BEGIN
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM economy_accounts
 WHERE user_id=NEW.user_id AND revision=NEW.expected_revision)
 THEN RAISE(ABORT,'economy_revision_conflict') END;
END;
CREATE TRIGGER economy_receipt_apply AFTER INSERT ON economy_receipts
BEGIN
 UPDATE economy_accounts SET state_json=NEW.next_state_json,revision=revision+1,
 updated_at=datetime('now') WHERE user_id=NEW.user_id AND revision=NEW.expected_revision;
END;
