-- Additive only. Existing saves and learning records are untouched.
CREATE TABLE IF NOT EXISTS approved_teachers (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 approved_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS learning_classes (
 id TEXT PRIMARY KEY,
 teacher_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 name TEXT NOT NULL,
 code TEXT NOT NULL UNIQUE,
 accepting INTEGER NOT NULL DEFAULT 1 CHECK(accepting IN (0,1)),
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS learning_classes_owner ON learning_classes(teacher_id);
CREATE TABLE IF NOT EXISTS learning_members (
 class_id TEXT NOT NULL REFERENCES learning_classes(id) ON DELETE CASCADE,
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 number TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved')),
 share_from TEXT NOT NULL,
 consent_at TEXT NOT NULL DEFAULT (datetime('now')),
 PRIMARY KEY(class_id,user_id)
);
CREATE INDEX IF NOT EXISTS learning_members_user ON learning_members(user_id);
