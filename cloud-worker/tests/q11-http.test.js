import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {getPlatformProxy} from 'wrangler';
import worker from '../src/index.js';
import {createSession} from '../src/session.js';

test('Q11 HTTP loopback: two clients save, restore, conflict, revision backup and isolation',async()=>{
 const mf=await getPlatformProxy({configPath:new URL('../wrangler.q11-local.jsonc',import.meta.url).pathname,persist:false});
 let server;
 try{
  const DB=mf.env.DB;
  for(const file of ['0001_initial.sql','0002_sessions.sql']){
   const sql=await readFile(new URL('../migrations/'+file,import.meta.url),'utf8');
   for(const stmt of sql.split(';').map(s=>s.trim()).filter(Boolean))await DB.prepare(stmt).run();
  }
  for(const id of ['q11-http-a','q11-http-b'])
   await DB.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind(id,'mock-'+id).run();
  const A=await createSession(DB,'q11-http-a'),B=await createSession(DB,'q11-http-b');
  const origin='http://localhost:8765';
  const env={
   DB,ALLOWED_ORIGIN:origin,
   RATE_LIMITER:{limit:async()=>({success:true})},
   AUTH_RATE_LIMITER:{limit:async()=>({success:true})}
  };
  server=createServer(async(req,res)=>{
   try{
    const chunks=[];
    for await(const chunk of req)chunks.push(chunk);
    const url='http://127.0.0.1:'+server.address().port+req.url;
    const request=new Request(url,{method:req.method,headers:req.headers,body:['GET','HEAD'].includes(req.method)?undefined:Buffer.concat(chunks)});
    const result=await worker.fetch(request,env);
    res.writeHead(result.status,Object.fromEntries(result.headers));
    res.end(Buffer.from(await result.arrayBuffer()));
   }catch(err){res.writeHead(500).end('test_http_adapter_error');}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port;
  const request=async(token,method='GET',payload)=>{
   const res=await fetch(base+'/api/v1/save',{method,headers:{
    Origin:origin,Authorization:'Bearer '+token,
    ...(payload?{'Content-Type':'application/json'}:{})
   },body:payload?JSON.stringify(payload):undefined});
   return {status:res.status,body:await res.json()};
  };
  const snapshot=(manual,correct)=>({schemaVersion:1,data:{
   'zensho_q11_grammar_weak_v1_lv2':JSON.stringify({G2_Q11_001:{manual,wrong:0,auto:false}}),
   'zensho_learning_log_v1_lv2':JSON.stringify({'2026-10-12':{q11_grammar:{attempt:correct,correct,wrong:0}}}),
   'zensho_goimon_current_v4_lv2':JSON.stringify({type:'nagomi',stats:{kotoba:20+correct*.5,bunmyaku:10+correct*.5},learningRewardClaims:{}})
  }});
  const first=await request(A.token,'POST',{expectedRevision:0,snapshot:snapshot(true,1)});
  assert.equal(first.status,200);assert.equal(first.body.revision,1);
  const pc=await request(A.token);assert.equal(pc.status,200);
  assert.equal(JSON.parse(pc.body.snapshot.data.zensho_q11_grammar_weak_v1_lv2).G2_Q11_001.manual,true);
  const bFresh=await request(B.token);assert.equal(bFresh.body.revision,0);
  const stale=await request(A.token,'POST',{expectedRevision:0,snapshot:snapshot(false,3)});
  assert.equal(stale.status,409);
  assert.equal(stale.body.current.revision,1);
  const update=await request(A.token,'POST',{expectedRevision:1,snapshot:snapshot(false,2)});
  assert.equal(update.status,200);assert.equal(update.body.revision,2);
  const replay=await request(A.token,'POST',{expectedRevision:1,snapshot:snapshot(false,4)});
  assert.equal(replay.status,409);
  const latest=await request(A.token);assert.equal(latest.body.revision,2);
  assert.equal(JSON.parse(latest.body.snapshot.data.zensho_learning_log_v1_lv2)['2026-10-12'].q11_grammar.correct,2);
  const savedB=await request(B.token,'POST',{expectedRevision:0,snapshot:snapshot(true,5)});
  assert.equal(savedB.status,200);
  assert.equal((await request(A.token)).body.revision,2);
  assert.equal((await request(B.token)).body.revision,1);
  const revision=await DB.prepare('SELECT save_json FROM save_revisions WHERE user_id=? AND revision=1').bind('q11-http-a').first();
  assert.ok(revision);
  assert.equal(JSON.parse(JSON.parse(revision.save_json).data.zensho_q11_grammar_weak_v1_lv2).G2_Q11_001.manual,true);
  const anon=await fetch(base+'/api/v1/save',{headers:{Origin:origin}});
  assert.equal(anon.status,401);
  const otherOrigin=await fetch(base+'/api/v1/save',{headers:{Origin:'https://untrusted.example',Authorization:'Bearer '+A.token}});
  assert.equal(otherOrigin.status,403);
 }finally{
  if(server)await new Promise((resolve,reject)=>server.close(e=>e?reject(e):resolve()));
  await mf.dispose();
 }
});
