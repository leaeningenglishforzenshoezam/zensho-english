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
 slot TEXT NOT NULL CHECK(slot IN ('words','idioms')),
 category TEXT NOT NULL CHECK(category IN ('quiz_enja','idiom_quiz')),
 private_json TEXT NOT NULL CHECK(json_valid(private_json)),
 expires_at INTEGER NOT NULL,
 submission_json TEXT,
 score INTEGER CHECK(score IS NULL OR (typeof(score)='integer' AND score BETWEEN 0 AND CASE WHEN slot='words' THEN 20 ELSE 15 END)),
 completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0,1)),
 PRIMARY KEY(user_id,attempt_id),
 CHECK((slot='words' AND category='quiz_enja') OR (slot='idioms' AND category='idiom_quiz')),
 CHECK(slot!='idioms' OR (json_extract(private_json,'$.mode') IS NOT NULL AND json_extract(private_json,'$.mode') IN ('meaning','synonym'))),
 CHECK((submission_json IS NULL AND score IS NULL AND completed=0) OR
 (submission_json IS NOT NULL AND json_valid(submission_json) AND json_type(submission_json)='array'
 AND json_array_length(submission_json)=CASE WHEN slot='words' THEN 20 ELSE 15 END AND score IS NOT NULL
 AND completed=CASE WHEN (slot='words' AND score=20) OR (slot='idioms' AND score>=12) THEN 1 ELSE 0 END))
);
CREATE TABLE mission_reward_claims (
 user_id TEXT NOT NULL,
 level TEXT NOT NULL CHECK(level='1'),
 mission_day TEXT NOT NULL,
 slot TEXT NOT NULL CHECK(slot IN ('words','idioms')),
 operation_id TEXT NOT NULL,
 attempt_id TEXT NOT NULL,
 PRIMARY KEY(user_id,level,mission_day,slot),
 FOREIGN KEY(user_id,operation_id) REFERENCES economy_receipts(user_id,operation_id) ON DELETE CASCADE,
 FOREIGN KEY(user_id,attempt_id) REFERENCES mission_attempts(user_id,attempt_id) ON DELETE CASCADE
);

CREATE TABLE mission_idiom_cursors (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 level TEXT NOT NULL CHECK(level='1'),
 mode TEXT NOT NULL CHECK(mode IN ('meaning','synonym')),
 mission_day TEXT NOT NULL,
 range_start INTEGER NOT NULL DEFAULT 1 CHECK(range_start BETWEEN 1 AND 273),
 next_start INTEGER NOT NULL DEFAULT 1 CHECK(next_start BETWEEN 1 AND 273),
 advanced INTEGER NOT NULL DEFAULT 0 CHECK(advanced IN (0,1)),
 PRIMARY KEY(user_id,level,mode)
);
-- Full submission advances once, regardless of success. Trigger shares grading transaction.
CREATE TRIGGER mission_idiom_advance AFTER UPDATE OF submission_json ON mission_attempts
WHEN NEW.slot='idioms' AND OLD.submission_json IS NULL AND NEW.submission_json IS NOT NULL
BEGIN
 UPDATE mission_idiom_cursors SET next_start=CASE WHEN range_start+14>=287 THEN 1 ELSE min(range_start+15,273) END,advanced=1
 WHERE user_id=NEW.user_id AND level=NEW.level AND mode=json_extract(NEW.private_json,'$.mode')
 AND mission_day=NEW.mission_day AND range_start=json_extract(NEW.private_json,'$.rangeStart') AND advanced=0;
END;
