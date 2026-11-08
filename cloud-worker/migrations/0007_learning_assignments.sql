-- Format-level goals only; no question IDs or answer event records.
CREATE TABLE IF NOT EXISTS learning_assignments (
 id TEXT PRIMARY KEY,
 class_id TEXT NOT NULL REFERENCES learning_classes(id) ON DELETE CASCADE,
 title TEXT NOT NULL,
 category TEXT NOT NULL,
 level TEXT NOT NULL CHECK(level IN ('1','2')),
 target INTEGER NOT NULL CHECK(target BETWEEN 1 AND 10000),
 start_day TEXT NOT NULL,
 end_day TEXT NOT NULL,
 closed INTEGER NOT NULL DEFAULT 0 CHECK(closed IN (0,1)),
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS learning_assignments_class ON learning_assignments(class_id,end_day);
