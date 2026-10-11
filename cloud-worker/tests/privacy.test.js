import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {getPlatformProxy} from 'wrangler';
import worker from '../src/index.js';
import {createSession,hashToken} from '../src/session.js';
import {issueDeletionRequest,cleanupPrivacy,deletionSQL} from '../src/privacy.js';

test('Real D1 privacy: receipt rotation, retention boundaries, scoped cascades, expired and revoked sessions',async()=>{
 const mf=await getPlatformProxy({configPath:new URL('../wrangler.jsonc',import.meta.url).pathname,persist:false});
 try {
 const DB=mf.env.DB,now=Math.floor(Date.now()/1000),origin='http://localhost:8765';
 for(const f of ['0001_initial.sql','0002_sessions.sql','0003_user_profiles.sql','0004_privacy_operations.sql','0005_profile_avatar.sql'])for(const sql of (await readFile(new URL('../migrations/'+f,import.meta.url),'utf8')).split(';').map(x=>x.trim()).filter(Boolean))await DB.prepare(sql).run();
 const env={DB,ALLOWED_ORIGIN:origin,RATE_LIMITER:{limit:async()=>({success:true})},AUTH_RATE_LIMITER:{limit:async()=>({success:true})}};
 for(const id of ['a','b']){
  await DB.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind(id,'sub-'+id).run();
  await DB.prepare("INSERT INTO user_profiles(user_id,revision,username,role) VALUES (?,1,?,'teacher')").bind(id,id).run();
  await DB.prepare("INSERT INTO saves(user_id,save_json,updated_at) VALUES (?,'{}','2020-01-01 00:00:00')").bind(id).run();
  for(const [rev,age] of [[1,31*86400],[2,30*86400],[3,10]])await DB.prepare("INSERT INTO save_revisions(user_id,revision,schema_version,save_json,saved_at) VALUES (?,?,1,?,datetime(?,'unixepoch'))").bind(id,rev,'{}',now-age).run();
 }
 const a=await createSession(DB,'a'),b=await createSession(DB,'b');
 const request=(token,endpoint='deletion-request',method='POST',extra={})=>new Request('https://test/api/v1/'+endpoint,{method,headers:{Origin:origin,...(token?{Authorization:'Bearer '+token}:{}),...extra}});
 assert.equal((await worker.fetch(request(null),env)).status,401);
 assert.equal((await worker.fetch(request(a.token,'deletion-request','POST',{Origin:'https://evil.test'}),env)).status,403);
 assert.equal((await worker.fetch(request(a.token),{...env,RATE_LIMITER:{limit:async()=>({success:false})}})).status,429);
 const receipt=await (await worker.fetch(request(a.token),env)).json();assert.match(receipt.code,/^del_[a-f0-9]{32}$/);
 const stored=await DB.prepare("SELECT * FROM deletion_requests WHERE user_id='a'").first();assert.equal(stored.code_hash,await hashToken(receipt.code));assert(!JSON.stringify(stored).includes(receipt.code));
 const fresh=await issueDeletionRequest(DB,'a',now);const staleSQL=await deletionSQL(receipt.code,'a');assert.equal((await DB.prepare(staleSQL.inspect).all()).results.length,0);
 const wrong=await deletionSQL(fresh.code,'b');assert.equal((await DB.prepare(wrong.remove.split(';')[0]).run()).meta.changes,0);
 await assert.rejects(()=>deletionSQL(fresh.code,"a' OR 1=1--"));
 const expired=await issueDeletionRequest(DB,'b',now-31*86400);
 const expiredSQL=await deletionSQL(expired.code,'b');assert.equal((await DB.prepare(expiredSQL.remove.split(';')[0]).run()).meta.changes,0);
 await DB.prepare('UPDATE sessions SET expires_at=? WHERE user_id=?').bind(now,'b').run();
 assert.deepEqual(await cleanupPrivacy(DB,now),[2,1,1]);
 assert.equal((await DB.prepare('SELECT count(*) AS n FROM saves').first()).n,2);
 assert.equal((await DB.prepare('SELECT count(*) AS n FROM user_profiles').first()).n,2);
 assert.equal((await DB.prepare('SELECT count(*) AS n FROM save_revisions').first()).n,4);
 assert.equal((await worker.fetch(request(b.token,'session','GET'),env)).status,401);
 const sql=await deletionSQL(fresh.code,'a');assert.equal((await DB.prepare(sql.inspect).all()).results.length,1);
 assert((await DB.prepare(sql.remove.split(';')[0]).run()).meta.changes>0);
 assert.equal((await DB.prepare(sql.remove.split(';')[1]).first()).remaining_users,0);
 for(const table of ['saves','save_revisions','user_profiles','sessions','deletion_requests'])assert.equal((await DB.prepare(`SELECT count(*) AS n FROM ${table} WHERE user_id='a'`).first()).n,0);
 assert.equal((await DB.prepare("SELECT count(*) AS n FROM users WHERE id='b'").first()).n,1);
 assert.equal((await DB.prepare("SELECT count(*) AS n FROM saves WHERE user_id='b'").first()).n,1);
 for(const endpoint of ['save','profile','session'])assert.equal((await worker.fetch(request(a.token,endpoint,'GET'),env)).status,401);
 assert.equal((await worker.fetch(request('old.google.jwt','save','GET'),env)).status,401);
 assert.equal((await DB.prepare("SELECT count(*) AS n FROM users WHERE id='a'").first()).n,0);
 assert.equal((await DB.prepare(sql.remove.split(';')[0]).run()).meta.changes,0);
 await worker.scheduled({},env);
 } finally {await mf.dispose();}
});
