import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFile,readdir} from 'node:fs/promises';

test('production migration path preserves existing saves and enforces atomic economy receipts',async()=>{
 const db=new DatabaseSync(':memory:');db.exec('PRAGMA foreign_keys=ON');
 try{
  const dir=new URL('../migrations/',import.meta.url);
  for(const name of (await readdir(dir)).filter(n=>/^000[1-7]_.*\.sql$/.test(n)).sort())db.exec(await readFile(new URL(name,dir),'utf8'));
  db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').run('student','subject');
  const original=JSON.stringify({schemaVersion:1,data:{learning:'retained',goimon:'retained'}});
  db.prepare('INSERT INTO saves(user_id,save_json) VALUES (?,?)').run('student',original);
  db.exec(await readFile(new URL('0008_economy_accounts.sql',dir),'utf8'));
  assert.equal(db.prepare('SELECT save_json FROM saves WHERE user_id=?').get('student').save_json,original);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM economy_accounts').get().n,0);
  const state=JSON.stringify({version:1,shards:10,owned:{gear:{},skills:{}}});
  db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?)').run('student',state);
  const insert=db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)');
  db.exec('BEGIN');insert.run('student','operation_test_01','{}',0,state,'{}');db.exec('ROLLBACK');
  assert.equal(db.prepare('SELECT revision FROM economy_accounts').get().revision,0);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM economy_receipts').get().n,0);
  insert.run('student','operation_test_01','{}',0,state,'{}');
  assert.equal(db.prepare('SELECT revision FROM economy_accounts').get().revision,1);
  assert.throws(()=>insert.run('student','operation_test_02','{}',0,state,'{}'),/economy_revision_conflict/);
  assert.equal(db.prepare('SELECT save_json FROM saves WHERE user_id=?').get('student').save_json,original);
 }finally{db.close();}
});
