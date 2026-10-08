import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {getPlatformProxy} from 'wrangler';
import worker from '../src/index.js';
import {createSession,authenticateSession,hashToken} from '../src/session.js';
test('Real D1 sessions: hash-only storage, account isolation, expiry, revocation and bounded sessions',async()=>{
 const mf=await getPlatformProxy({configPath:new URL('../wrangler.jsonc',import.meta.url).pathname,persist:false});
 try{
  const DB=mf.env.DB;
  for(const file of ['0001_initial.sql','0002_sessions.sql'])for(const s of (await readFile(new URL('../migrations/'+file,import.meta.url),'utf8')).split(';').map(x=>x.trim()).filter(Boolean))await DB.prepare(s).run();
  for(const id of ['a','b'])await DB.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind(id,'sub-'+id).run();
  const a=await createSession(DB,'a'),b=await createSession(DB,'b');
  assert.match(a.token,/^gs1_[a-f0-9]{64}$/);assert.notEqual(a.token,b.token);
  const stored=await DB.prepare('SELECT * FROM sessions WHERE user_id=?').bind('a').first();assert.equal(stored.token_hash,await hashToken(a.token));assert(!JSON.stringify(stored).includes(a.token));
  const origin='http://localhost:8765',env={DB,ALLOWED_ORIGIN:origin,RATE_LIMITER:{limit:async()=>({success:true})},AUTH_RATE_LIMITER:{limit:async()=>({success:true})}};
  const req=(token,path='session',method='GET',body)=>new Request('https://test/api/v1/'+path,{method,headers:{Origin:origin,Authorization:'Bearer '+token,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});
  assert.equal((await authenticateSession(req(a.token),DB)).userId,'a');
  await assert.rejects(()=>authenticateSession(req(a.token),DB,a.expiresAt));
  assert.equal((await worker.fetch(req(a.token),env)).status,200);
  assert.equal((await worker.fetch(req(a.token,'save','POST',{expectedRevision:0,snapshot:{schemaVersion:1,data:{q7SetHistory_v1:'{"a":1}'}}}),env)).status,200);
  assert.equal((await (await worker.fetch(req(b.token,'save'),env)).json()).revision,0);
  assert.equal((await (await worker.fetch(req(a.token,'save'),env)).json()).revision,1);
  assert.equal((await worker.fetch(req(a.token,'session','DELETE'),env)).status,200);
  assert.equal((await worker.fetch(req(a.token,'save'),env)).status,401);
  assert.equal((await worker.fetch(req('gs1_'+'f'.repeat(64)),env)).status,401);
  assert.equal((await worker.fetch(req('bad'),env)).status,401);
  const now=Math.floor(Date.now()/1000);let latest;
  for(let i=0;i<12;i++)latest=await createSession(DB,'a',now+i);
  assert.equal((await DB.prepare('SELECT count(*) AS n FROM sessions WHERE user_id=?').bind('a').first()).n,10);
  assert.equal((await authenticateSession(req(b.token),DB)).userId,'b');
  assert.equal((await authenticateSession(req(latest.token),DB)).userId,'a');
  await DB.prepare('UPDATE sessions SET expires_at=0 WHERE user_id=?').bind('a').run();
  assert.equal((await worker.fetch(req(latest.token),env)).status,401);
  const denied={...env,RATE_LIMITER:{limit:async()=>({success:false})}};assert.equal((await worker.fetch(req(b.token,'save'),denied)).status,429);
 }finally{await mf.dispose()}
});
