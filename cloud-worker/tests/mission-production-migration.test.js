import test from 'node:test';import assert from 'node:assert/strict';import {DatabaseSync} from 'node:sqlite';import {readFile,readdir} from 'node:fs/promises';
test('production migrations through 0011 match tested mission schema and preserve existing accounts, learning and inventory',async()=>{
 const db=new DatabaseSync(':memory:');db.exec('PRAGMA foreign_keys=ON');
 try{
  const dir=new URL('../migrations/',import.meta.url),names=(await readdir(dir)).filter(n=>/^\d{4}_.*\.sql$/.test(n)).sort();
  for(const name of names.filter(n=>Number(n.slice(0,4))<=7))db.exec(await readFile(new URL(name,dir),'utf8'));
  const saved=JSON.stringify({schemaVersion:1,data:{zensho_goimon_current_v4_lv1:'{"id":"pet"}',zensho_learning_log_v1_lv1:'[]'}});
  db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').run('student','subject');db.prepare('INSERT INTO saves(user_id,save_json) VALUES (?,?)').run('student',saved);
  for(const name of names.filter(n=>Number(n.slice(0,4))>7&&Number(n.slice(0,4))<=11))db.exec(await readFile(new URL(name,dir),'utf8'));
  assert.equal(db.prepare('SELECT save_json FROM saves WHERE user_id=?').get('student').save_json,saved);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM users').get().n,1);
  for(const table of ['economy_accounts','economy_receipts','economy_loadouts','mission_attempts','mission_reward_claims','mission_learning_receipts','mission_growth_receipts'])assert.equal(db.prepare('SELECT COUNT(*) n FROM '+table).get().n,0);
  const clean=s=>s.replace(/^--.*$/gm,'').trim();
  assert.equal(clean(await readFile(new URL('0011_mission_persistence.sql',dir),'utf8')),clean(await readFile(new URL('../schema-drafts/mission-rewards-v1.sql',import.meta.url),'utf8')));
  assert.throws(()=>db.prepare('INSERT INTO mission_word_starts(user_id,level,first_day) VALUES (?,?,?)').run('missing','1','2026-11-01'),/FOREIGN KEY/);
  db.prepare('INSERT INTO mission_word_starts(user_id,level,first_day) VALUES (?,?,?)').run('student','1','2026-11-01');
  assert.throws(()=>db.prepare('INSERT INTO mission_word_starts(user_id,level,first_day) VALUES (?,?,?)').run('student','1','2026-11-02'),/UNIQUE/);
  assert.equal(db.prepare('SELECT save_json FROM saves WHERE user_id=?').get('student').save_json,saved);
 }finally{db.close();}
});
