-- DRAFT ONLY: apply after economy-v1.sql in isolated tests. Never auto-migrate.
CREATE TABLE mission_word_starts (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 level TEXT NOT NULL CHECK(level='1'),
 first_day TEXT NOT NULL,
 PRIMARY KEY(user_id,level)
);
CREATE TABLE mission_attempts (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 attempt_id TEXT NOT NULL,
 level TEXT NOT NULL CHECK(level='1'),
 mission_day TEXT NOT NULL,
 slot TEXT NOT NULL CHECK(slot='words'),
 category TEXT NOT NULL CHECK(category='quiz_enja'),
 private_json TEXT NOT NULL CHECK(json_valid(private_json)),
 expires_at INTEGER NOT NULL,
 submission_json TEXT,
 score INTEGER CHECK(score IS NULL OR (typeof(score)='integer' AND score BETWEEN 0 AND 20)),
 completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0,1)),
 PRIMARY KEY(user_id,attempt_id),
 CHECK((submission_json IS NULL AND score IS NULL AND completed=0) OR
 (submission_json IS NOT NULL AND json_valid(submission_json) AND score IS NOT NULL
 AND completed=CASE WHEN score=20 THEN 1 ELSE 0 END))
);
CREATE TABLE mission_reward_claims (
 user_id TEXT NOT NULL,
 level TEXT NOT NULL CHECK(level='1'),
 mission_day TEXT NOT NULL,
 slot TEXT NOT NULL CHECK(slot='words'),
 operation_id TEXT NOT NULL,
 attempt_id TEXT NOT NULL,
 PRIMARY KEY(user_id,level,mission_day,slot),
 FOREIGN KEY(user_id,operation_id) REFERENCES economy_receipts(user_id,operation_id) ON DELETE CASCADE,
 FOREIGN KEY(user_id,attempt_id) REFERENCES mission_attempts(user_id,attempt_id) ON DELETE CASCADE
);
