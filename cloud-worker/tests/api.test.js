import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {getPlatformProxy} from 'wrangler';import {generateKeyPair,SignJWT} from 'jose';
import worker,{authenticate,handleSave,publicSave} from '../src/index.js';
const origin='https://leaeningenglishforzenshoezam.github.io';
test('Signed token verification: audience, expiry, issuer, required claims and signature',async()=>{
 const {publicKey,privateKey}=await generateKeyPair('RS256');const env={GOOGLE_CLIENT_ID:'test-client'};
 async function token(changes={}){return new SignJWT({sub:'123',aud:'test-client',iss:'https://accounts.google.com',iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+300,...changes}).setProtectedHeader({alg:'RS256'}).sign(privateKey)}
 const req=t=>new Request('https://test/api/v1/save',{headers:{Authorization:'Bearer '+t}});
 assert.equal(await authenticate(req(await token()),env,publicKey),'123');
 for(const p of [{aud:'other'},{iss:'evil'},{exp:1},{sub:null}])await assert.rejects(()=>token(p).then(t=>authenticate(req(t),env,publicKey)));
 const {publicKey:other}=await generateKeyPair('RS256');await assert.rejects(()=>token().then(t=>authenticate(req(t),env,other)));
});
test('Real local D1: concurrent create/update CAS, recovery history, user isolation and limits',async()=>{
 const mf=await getPlatformProxy({configPath:new URL('../wrangler.jsonc',import.meta.url).pathname,persist:false});
 try{const DB=mf.env.DB;const sql=await readFile(new URL('../migrations/0001_initial.sql',import.meta.url),'utf8');for(const s of sql.split(';').map(x=>x.trim()).filter(Boolean))await DB.prepare(s).run();
 await DB.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind('a','sub-a').run();await DB.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind('b','sub-b').run();
 const req=(rev,v)=>new Request('https://test/api/v1/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({expectedRevision:rev,snapshot:{schemaVersion:1,data:{q7SetHistory_v1:JSON.stringify({v})}}})});
 const first=await Promise.all([handleSave(req(0,1),{DB},'a'),handleSave(req(0,2),{DB},'a')]);assert.deepEqual(first.map(x=>x.status).sort(),[200,409]);
 const second=await Promise.all([handleSave(req(1,3),{DB},'a'),handleSave(req(1,4),{DB},'a')]);assert.deepEqual(second.map(x=>x.status).sort(),[200,409]);
 assert.equal((await publicSave(DB,'a')).revision,2);assert.equal((await publicSave(DB,'b')).revision,0);assert.equal((await DB.prepare('SELECT count(*) AS n FROM save_revisions').first()).n,1);
 const oversized=new Request('https://test',{method:'POST',headers:{'content-type':'application/json'},body:'x'.repeat(920001)});assert.equal((await handleSave(oversized,{DB},'a')).status,413);
 assert.equal((await handleSave(new Request('https://test',{method:'POST',body:'{}'}),{DB},'a')).status,415);
 }finally{await mf.dispose()}
});
test('CORS, missing token and rate limit fail closed',async()=>{
 const env={GOOGLE_CLIENT_ID:'test-client',ALLOWED_ORIGIN:origin,RATE_LIMITER:{limit:async()=>({success:true})}};
 assert.equal((await worker.fetch(new Request('https://test/api/v1/save'),env)).status,403);
 const req=()=>new Request('https://test/api/v1/save',{headers:{Origin:origin}});
 assert.equal((await worker.fetch(req(),env)).status,401);
 env.RATE_LIMITER.limit=async()=>({success:false});assert.equal((await worker.fetch(req(),env)).status,429);
});
