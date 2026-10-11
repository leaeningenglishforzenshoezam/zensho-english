CREATE TABLE IF NOT EXISTS user_profiles (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 revision INTEGER NOT NULL CHECK(revision >= 1),
 username TEXT NOT NULL,
 role TEXT NOT NULL CHECK(role IN ('student','teacher')),
 grade TEXT,
 exam_level TEXT,
 updated_at TEXT NOT NULL DEFAULT (datetime('now')),
 CHECK((role='teacher' AND grade IS NULL AND exam_level IS NULL) OR
       (role='student' AND grade IS NOT NULL AND exam_level IS NOT NULL AND grade IN ('1','2','3','other') AND exam_level IN ('1','2','3','undecided')))
);
