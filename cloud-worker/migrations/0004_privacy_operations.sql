CREATE TABLE IF NOT EXISTS deletion_requests (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 code_hash TEXT NOT NULL UNIQUE,
 created_at INTEGER NOT NULL,
 expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_deletion_expiry ON deletion_requests(expires_at);
CREATE INDEX IF NOT EXISTS idx_revision_retention ON save_revisions(saved_at);
