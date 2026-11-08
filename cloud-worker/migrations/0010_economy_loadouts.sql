CREATE TABLE economy_loadouts (
 user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 revision INTEGER NOT NULL DEFAULT 0 CHECK(revision>=0),
 state_json TEXT NOT NULL CHECK(json_valid(state_json))
);
CREATE TABLE economy_loadout_receipts (
 user_id TEXT NOT NULL REFERENCES economy_loadouts(user_id) ON DELETE CASCADE,
 operation_id TEXT NOT NULL,
 request_json TEXT NOT NULL,
 expected_revision INTEGER NOT NULL,
 economy_revision INTEGER NOT NULL,
 learning_revision INTEGER NOT NULL,
 next_json TEXT NOT NULL CHECK(json_valid(next_json)),
 PRIMARY KEY(user_id,operation_id),
 UNIQUE(user_id,expected_revision)
);
CREATE TRIGGER economy_loadout_guard BEFORE INSERT ON economy_loadout_receipts
BEGIN
 SELECT CASE WHEN NOT EXISTS(SELECT 1 FROM economy_loadouts WHERE user_id=NEW.user_id AND revision=NEW.expected_revision)
 THEN RAISE(ABORT,'loadout_revision_conflict') END;
 SELECT CASE WHEN COALESCE((SELECT revision FROM economy_accounts WHERE user_id=NEW.user_id),0)!=NEW.economy_revision
 THEN RAISE(ABORT,'economy_revision_conflict') END;
 SELECT CASE WHEN COALESCE((SELECT revision FROM saves WHERE user_id=NEW.user_id),0)!=NEW.learning_revision
 THEN RAISE(ABORT,'learning_revision_conflict') END;
 SELECT CASE WHEN (SELECT COUNT(*) FROM economy_loadout_receipts WHERE user_id=NEW.user_id)>=10000
 THEN RAISE(ABORT,'loadout_storage_limit') END;
END;
CREATE TRIGGER economy_loadout_apply AFTER INSERT ON economy_loadout_receipts
BEGIN
 UPDATE economy_loadouts SET state_json=NEW.next_json,revision=revision+1 WHERE user_id=NEW.user_id;
END;
