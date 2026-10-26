-- DRAFT ONLY: apply after economy-v1.sql in isolated tests. Never auto-migrate.
CREATE TABLE mission_companion_receipts (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 operation_id TEXT NOT NULL,
 request_hash TEXT NOT NULL CHECK(length(request_hash)=64),
 applied_revision INTEGER NOT NULL CHECK(applied_revision>=1),
 PRIMARY KEY(user_id,operation_id)
);
CREATE TRIGGER mission_companion_guard BEFORE INSERT ON mission_companion_receipts
BEGIN
 SELECT CASE WHEN COALESCE((SELECT revision FROM saves WHERE user_id=NEW.user_id),0)!=NEW.applied_revision-1
 THEN RAISE(ABORT,'learning_revision_conflict') END;
 SELECT CASE WHEN (SELECT COUNT(*) FROM mission_companion_receipts WHERE user_id=NEW.user_id)>=10000
 THEN RAISE(ABORT,'mission_storage_limit') END;
END;
CREATE TABLE mission_sync_receipts (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 operation_id TEXT NOT NULL,
 request_hash TEXT NOT NULL CHECK(length(request_hash)=64),
 applied_revision INTEGER NOT NULL CHECK(applied_revision>=1),
 PRIMARY KEY(user_id,operation_id)
);
CREATE TRIGGER mission_sync_guard BEFORE INSERT ON mission_sync_receipts
BEGIN
 SELECT CASE WHEN COALESCE((SELECT revision FROM saves WHERE user_id=NEW.user_id),0)!=NEW.applied_revision-1
 THEN RAISE(ABORT,'learning_revision_conflict') END;
 SELECT CASE WHEN (SELECT COUNT(*) FROM mission_sync_receipts WHERE user_id=NEW.user_id)>=10000
 THEN RAISE(ABORT,'mission_storage_limit') END;
END;
CREATE TABLE mission_learning_receipts (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 attempt_id TEXT NOT NULL,
 applied_revision INTEGER NOT NULL CHECK(applied_revision>=1),
 PRIMARY KEY(user_id,attempt_id),
 FOREIGN KEY(user_id,attempt_id) REFERENCES mission_attempts(user_id,attempt_id)
);
CREATE TRIGGER mission_learning_guard BEFORE INSERT ON mission_learning_receipts
BEGIN
 SELECT CASE WHEN COALESCE((SELECT revision FROM saves WHERE user_id=NEW.user_id),0)!=NEW.applied_revision-1
 THEN RAISE(ABORT,'learning_revision_conflict') END;
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM mission_attempts WHERE user_id=NEW.user_id AND attempt_id=NEW.attempt_id AND submission_json IS NOT NULL)
 THEN RAISE(ABORT,'attempt_not_submitted') END;
END;
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
 slot TEXT NOT NULL CHECK(slot IN ('words','idioms','exam','listening','reading','reorder')),
 category TEXT NOT NULL CHECK(category IN ('quiz_enja','quiz_jaen','audio_quiz','idiom_quiz','sentence','paraphrase_quiz','listening','q7','dialogue8','q10','reorder')),
 private_json TEXT NOT NULL CHECK(json_valid(private_json)),
 expires_at INTEGER NOT NULL,
 submission_json TEXT,
 growth_target_id TEXT,
 growth_bonus_stat TEXT CHECK(growth_bonus_stat IN ('chie','kotoba','onkan','bunmyaku')),
 score INTEGER CHECK(score IS NULL OR (typeof(score)='integer' AND score BETWEEN 0 AND CASE WHEN slot='words' THEN 20 WHEN slot='idioms' THEN 15 WHEN slot='exam' THEN 10 ELSE 5 END)),
 completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0,1)),
 PRIMARY KEY(user_id,attempt_id),
 CHECK((slot='words' AND category IN ('quiz_enja','quiz_jaen','audio_quiz')) OR (slot='idioms' AND category='idiom_quiz') OR (slot='exam' AND category IN ('sentence','paraphrase_quiz')) OR (slot='listening' AND category='listening') OR (slot='reading' AND category IN ('q7','dialogue8','q10')) OR (slot='reorder' AND category='reorder')),
 CHECK(slot!='idioms' OR (json_extract(private_json,'$.mode') IS NOT NULL AND json_extract(private_json,'$.mode') IN ('meaning','synonym'))),
 CHECK((submission_json IS NULL AND score IS NULL AND completed=0) OR
 (submission_json IS NOT NULL AND json_valid(submission_json) AND json_type(submission_json)='array'
 AND json_array_length(submission_json)=CASE WHEN slot='words' THEN 20 WHEN slot='idioms' THEN 15 WHEN slot='exam' THEN 10 ELSE 5 END AND score IS NOT NULL
 AND completed=CASE WHEN (slot='words' AND score=20) OR (slot='idioms' AND score>=12) OR (slot='exam' AND score>=8) OR (slot IN ('listening','reading','reorder') AND score>=4) THEN 1 ELSE 0 END))
);
-- Pin the companion in the same transaction that issues the attempt. Old attempts
-- without a target cannot be awarded to whichever companion happens to be active.
CREATE TRIGGER mission_growth_target AFTER INSERT ON mission_attempts
BEGIN
 UPDATE mission_attempts SET growth_bonus_stat=COALESCE((
  SELECT CASE WHEN json_extract(save_json,'$.data.zensho_reorder_bonus_stat_v1_lv1') IN ('chie','kotoba','onkan','bunmyaku')
   THEN json_extract(save_json,'$.data.zensho_reorder_bonus_stat_v1_lv1') END FROM saves WHERE user_id=NEW.user_id),'bunmyaku'),growth_target_id=(
  SELECT CASE WHEN json_valid(json_extract(save_json,'$.data.zensho_goimon_current_v4_lv1'))
   THEN CASE WHEN json_type(json_extract(save_json,'$.data.zensho_goimon_current_v4_lv1'),'$.id')='text'
    THEN json_extract(json_extract(save_json,'$.data.zensho_goimon_current_v4_lv1'),'$.id') END END
  FROM saves WHERE user_id=NEW.user_id)
 WHERE user_id=NEW.user_id AND attempt_id=NEW.attempt_id;
END;
CREATE TABLE mission_growth_receipts (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 attempt_id TEXT NOT NULL,
 target_id TEXT NOT NULL,
 awarded_points REAL NOT NULL DEFAULT 0 CHECK(awarded_points>=0),
 applied_revision INTEGER NOT NULL CHECK(applied_revision>=1),
 PRIMARY KEY(user_id,attempt_id),
 FOREIGN KEY(user_id,attempt_id) REFERENCES mission_attempts(user_id,attempt_id)
);
CREATE TRIGGER mission_growth_guard BEFORE INSERT ON mission_growth_receipts
BEGIN
 SELECT CASE WHEN COALESCE((SELECT revision FROM saves WHERE user_id=NEW.user_id),0)!=NEW.applied_revision-1
 THEN RAISE(ABORT,'learning_revision_conflict') END;
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM mission_attempts WHERE user_id=NEW.user_id AND attempt_id=NEW.attempt_id
  AND slot IN ('words','idioms','exam','listening','reading','reorder') AND submission_json IS NOT NULL AND growth_target_id=NEW.target_id)
 THEN RAISE(ABORT,'growth_target_mismatch') END;
END;
-- Reading 8/10 reward is per set/account, not per attempt or companion.
CREATE TABLE mission_reading_growth_claims (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 level TEXT NOT NULL CHECK(level='1'),
 category TEXT NOT NULL CHECK(category IN ('dialogue8','q10')),
 set_id TEXT NOT NULL,
 attempt_id TEXT NOT NULL,
 PRIMARY KEY(user_id,level,category,set_id),
 FOREIGN KEY(user_id,attempt_id) REFERENCES mission_growth_receipts(user_id,attempt_id)
);
CREATE TABLE mission_reward_claims (
 user_id TEXT NOT NULL,
 level TEXT NOT NULL CHECK(level='1'),
 mission_day TEXT NOT NULL,
 slot TEXT NOT NULL CHECK(slot IN ('words','idioms','exam','listening','reading','reorder','basic_bonus')),
 operation_id TEXT NOT NULL,
 attempt_id TEXT,
 CHECK((slot='basic_bonus' AND attempt_id IS NULL) OR (slot!='basic_bonus' AND attempt_id IS NOT NULL)),
 PRIMARY KEY(user_id,level,mission_day,slot),
 FOREIGN KEY(user_id,operation_id) REFERENCES economy_receipts(user_id,operation_id) ON DELETE CASCADE,
 FOREIGN KEY(user_id,attempt_id) REFERENCES mission_attempts(user_id,attempt_id) ON DELETE CASCADE
);

-- Provisional bounded storage: stop issuing instead of deleting learning evidence.
-- Limits are draft-only and need sizing review before any release.
CREATE TRIGGER mission_attempt_limit BEFORE INSERT ON mission_attempts
BEGIN
 SELECT CASE WHEN (SELECT COUNT(*) FROM mission_attempts WHERE user_id=NEW.user_id AND mission_day=NEW.mission_day)>=200
 THEN RAISE(ABORT,'mission_daily_limit') END;
 SELECT CASE WHEN (SELECT COUNT(*) FROM mission_attempts WHERE user_id=NEW.user_id)>=5000
 THEN RAISE(ABORT,'mission_storage_limit') END;
END;

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

CREATE TABLE mission_exam_sets (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 level TEXT NOT NULL CHECK(level='1'),
 mission_day TEXT NOT NULL,
 category TEXT NOT NULL CHECK(category IN ('sentence','paraphrase_quiz')),
 variant TEXT NOT NULL CHECK(variant IN ('a','b','mix','standard')),
 private_json TEXT NOT NULL CHECK(json_valid(private_json)),
 PRIMARY KEY(user_id,level,mission_day,category,variant)
);
CREATE TRIGGER mission_bonus_guard BEFORE INSERT ON mission_reward_claims
WHEN NEW.slot='basic_bonus'
BEGIN
 SELECT CASE WHEN (SELECT COUNT(DISTINCT slot) FROM mission_attempts
 WHERE user_id=NEW.user_id AND level=NEW.level AND mission_day=NEW.mission_day
 AND completed=1 AND slot IN ('words','idioms','exam') AND json_extract(private_json,'$.rulesVersion')=2)!=3
 THEN RAISE(ABORT,'basic_missions_not_completed') END;
END;
CREATE TRIGGER mission_claim_guard BEFORE INSERT ON mission_reward_claims
WHEN NEW.slot!='basic_bonus'
BEGIN
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM mission_attempts
 WHERE user_id=NEW.user_id AND attempt_id=NEW.attempt_id AND level=NEW.level
 AND mission_day=NEW.mission_day AND slot=NEW.slot AND completed=1
 AND submission_json IS NOT NULL AND json_extract(private_json,'$.rulesVersion')=2)
 THEN RAISE(ABORT,'mission_not_completed') END;
END;

CREATE TABLE mission_challenge_rotations (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 level TEXT NOT NULL CHECK(level='1'),
 slot TEXT NOT NULL CHECK(slot IN ('listening','reading','reorder')),
 last_day TEXT NOT NULL,
 last_variant TEXT NOT NULL,
 PRIMARY KEY(user_id,level,slot)
);
CREATE TABLE mission_challenge_days (
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 level TEXT NOT NULL CHECK(level='1'),
 slot TEXT NOT NULL CHECK(slot IN ('listening','reading','reorder')),
 mission_day TEXT NOT NULL,
 private_json TEXT NOT NULL CHECK(json_valid(private_json)),
 PRIMARY KEY(user_id,level,slot,mission_day)
);
CREATE TRIGGER mission_challenge_day_guard BEFORE INSERT ON mission_challenge_days
BEGIN
 SELECT CASE WHEN EXISTS(SELECT 1 FROM mission_challenge_rotations WHERE user_id=NEW.user_id
 AND level=NEW.level AND slot=NEW.slot AND last_day>NEW.mission_day)
 THEN RAISE(ABORT,'mission_day_conflict') END;
END;
