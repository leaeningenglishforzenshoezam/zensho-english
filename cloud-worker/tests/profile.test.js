import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {getPlatformProxy} from 'wrangler';
import worker from '../src/index.js';import {createSession} from '../src/session.js';import {validateProfile} from '../src/profile.js';
test('Profile validation requires student fields and bounds names',()=>{
 const p={username:'  みかん  ',role:'student',grade:'2',examLevel:'1'};assert.equal(validateProfile(p).username,'みかん');
 for(const change of [{username:''},{username:'a'.repeat(25)},{username:'<script>'},{username:'a\u0000b'},{role:'admin'},{grade:null},{examLevel:'9'},{userId:'someone'}])assert.throws(()=>validateProfile({...p,...change}));
 assert.deepEqual(validateProfile({...p,role:'teacher'}),{username:'みかん',role:'teacher',grade:null,examLevel:null});
});
test('Real D1 profile API: isolation, CAS conflict and limits preserve learning saves',async()=>{
 const mf=await getPlatformProxy({configPath:new URL('../wrangler.jsonc',import.meta.url).pathname,persist:false});
 try{const DB=mf.env.DB;for(const f of ['0001_initial.sql','0002_sessions.sql','0003_user_profiles.sql'])for(const sql of (await readFile(new URL('../migrations/'+f,import.meta.url),'utf8')).split(';').map(x=>x.trim()).filter(Boolean))await DB.prepare(sql).run();
 for(const id of ['a','b'])await DB.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind(id,'sub-'+id).run();
 await DB.prepare('INSERT INTO saves(user_id,save_json) VALUES (?,?)').bind('a','{"untouched":true}').run();
 const a=await createSession(DB,'a'),b=await createSession(DB,'b'),origin='http://localhost:8765';
 const env={DB,ALLOWED_ORIGIN:origin,RATE_LIMITER:{limit:async()=>({success:true})},AUTH_RATE_LIMITER:{limit:async()=>({success:true})}};
 const req=(t,method='GET',body)=>new Request('https://test/api/v1/profile',{method,headers:{Origin:origin,Authorization:'Bearer '+t,'Content-Type':'application/json'},body:body===undefined?undefined:typeof body==='string'?body:JSON.stringify(body)});
 const fetch=(t,m,x)=>worker.fetch(req(t,m,x),env);
 assert.equal((await (await fetch(a.token)).json()).profile,null);
 const body={expectedRevision:0,profile:{username:'生徒A',role:'student',grade:'1',examLevel:'2'}};
 const writes=await Promise.all([fetch(a.token,'POST',body),fetch(a.token,'POST',body)]);assert.deepEqual(writes.map(r=>r.status).sort(),[200,409]);
 assert.equal((await (await fetch(b.token)).json()).profile,null);
 assert.equal((await fetch(b.token,'POST',{...body,profile:{...body.profile,userId:'a'}})).status,400);
 assert.equal((await fetch('gs1_'+'0'.repeat(64))).status,401);
 assert.equal((await fetch(a.token,'POST','x'.repeat(4097))).status,413);
 assert.equal((await fetch(a.token,'POST',{...body,expectedRevision:1,profile:{...body.profile,grade:null}})).status,400);
 const teacher=await fetch(a.token,'POST',{expectedRevision:1,profile:{username:'先生A',role:'teacher',grade:'3',examLevel:'1'}});assert.equal(teacher.status,200);assert.equal((await teacher.json()).profile.grade,null);
 assert.equal((await (await fetch(a.token)).json()).revision,2);
 assert.equal((await DB.prepare('SELECT save_json FROM saves WHERE user_id=?').bind('a').first()).save_json,'{"untouched":true}');
 }finally{await mf.dispose()}
});
