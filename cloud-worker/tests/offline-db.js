// Local SQLite only; deliberately does not import Wrangler or access the network.
import {DatabaseSync} from 'node:sqlite';
import {readFile} from 'node:fs/promises';
export async function createOfflineDb(){
 const sqlite=new DatabaseSync(':memory:');sqlite.exec('PRAGMA foreign_keys=ON');
 const wrap=(sql,args=[])=>({bind(...values){return wrap(sql,values);},async first(){return sqlite.prepare(sql).get(...args)||null;},async run(){const r=sqlite.prepare(sql).run(...args);return {meta:{changes:Number(r.changes)}};},async all(){return {results:sqlite.prepare(sql).all(...args)};},sql,args});
 const db={prepare:wrap,async batch(stmts){sqlite.exec('BEGIN');try{const results=stmts.map(s=>{const r=sqlite.prepare(s.sql).run(...s.args);return {meta:{changes:Number(r.changes)}};});sqlite.exec('COMMIT');return results;}catch(e){sqlite.exec('ROLLBACK');throw e;}}};
 for(const file of ['migrations/0001_initial.sql','migrations/0002_sessions.sql','schema-drafts/economy-v1.sql','schema-drafts/mission-rewards-v1.sql'])sqlite.exec(await readFile(new URL('../'+file,import.meta.url),'utf8'));
 await db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind('local-test','local-test-sub').run();
 return {db,close:()=>sqlite.close()};
}
