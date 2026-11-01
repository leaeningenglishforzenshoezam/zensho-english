-- A submitted device snapshot is evidence, not permission to mint assets.
-- Approval is operator-only. No browser API can set approved_hash.
CREATE TABLE economy_legacy_imports (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 payload_hash TEXT NOT NULL CHECK(length(payload_hash)=64),
 payload_json TEXT NOT NULL CHECK(json_valid(payload_json)),
 approved_hash TEXT CHECK(approved_hash IS NULL OR approved_hash=payload_hash),
 created_at TEXT NOT NULL DEFAULT(datetime('now'))
);
