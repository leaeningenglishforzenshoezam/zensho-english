// Local ephemeral harness only. Never deploy this script or use a real DB binding.
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createLocalPlatform} from './local-platform.js';
import {createSession} from '../src/session.js';
import {handleMissionDraft} from '../src/mission_api.js';
export async function startHarness(port=0,{seedGrowth=false}={}){
 const proxy=await createLocalPlatform();
 try{
 const db=proxy.env.DB;
 for(const name of ['0001_initial.sql','0002_sessions.sql'])for(const sql of (await readFile(new URL('../migrations/'+name,import.meta.url),'utf8')).split(';').filter(x=>x.trim()))await db.prepare(sql).run();
 for(const name of ['economy-v1.sql','mission-rewards-v1.sql'])for(const sql of (await readFile(new URL('../schema-drafts/'+name,import.meta.url),'utf8')).match(/CREATE TABLE[\s\S]*?;|CREATE TRIGGER[\s\S]*?\nEND;/g))await db.prepare(sql).run();
 await db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind('local-test','local-test-sub').run();
 // Explicit opt-in demo only; never import real student data.
 if(seedGrowth){
  const pet={id:'local-growth-demo',nickname:'育成テスト用たまご',type:'nagomi',stage:'egg',specialRoute:'',stats:{chie:90,kotoba:0,onkan:0,bunmyaku:0},totalPoints:90,level:5,pendingEvolution:false,pendingStage:'',pendingType:'',pendingImageKey:'',imageKey:'images/goimon/goimon_egg.png'};
  await db.prepare('INSERT INTO saves(user_id,revision,save_json) VALUES (?,1,?)').bind('local-test',JSON.stringify({schemaVersion:1,data:{zensho_goimon_current_v4_lv1:JSON.stringify(pet)}})).run();
 }
 const session=await createSession(db,'local-test');const recoveryScope=crypto.randomUUID();let origin;
 const server=http.createServer(async(req,res)=>{
  const send=(status,body,type='text/plain; charset=utf-8')=>{res.writeHead(status,{'content-type':type,'cache-control':'no-store','x-content-type-options':'nosniff','content-security-policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'"});res.end(body);};
  try{
   if(req.headers.host!==new URL(origin).host||req.headers.origin&&req.headers.origin!==origin||req.headers['sec-fetch-site']==='cross-site')return send(403,'Forbidden');
   const url=new URL(req.url,origin);
   if(url.pathname.startsWith('/api/')){
    if(req.headers.origin!==origin&&!(req.method==='GET'&&req.headers['sec-fetch-site']==='same-origin'))return send(403,'Origin required');
    const limit=url.pathname==='/api/v1/missions/learning/sync'?920000:4096;let size=0;const parts=[];for await(const chunk of req){size+=chunk.length;if(size>limit)return send(413,'Too large');parts.push(chunk);}
    const response=await handleMissionDraft(new Request(url,{method:req.method,headers:{Origin:origin,Authorization:'Bearer '+session.token,'Content-Type':'application/json'},...(['GET','HEAD'].includes(req.method)?{}:{body:Buffer.concat(parts)})}),{DB:db,ALLOWED_ORIGIN:origin,MISSION_REWARDS_TEST_ENABLED:true,RATE_LIMITER:{limit:async()=>({success:true})},AUTH_RATE_LIMITER:{limit:async()=>({success:true})}});
    return send(response.status,await response.text(),'application/json');
   }
   if(req.method!=='GET')return send(405,'Method not allowed');
   if(url.pathname==='/mission_play.html'){
    const source=await readFile(new URL('../../mission_play.html',import.meta.url),'utf8');
    return send(200,source.replace(/<script\b(?![^>]*type="module")[^>]*>[\s\S]*?<\/script\s*>/gi,'').replace('1級のミッションです。','隔離環境・テストアカウントです。実報酬は付与しません。1級のミッションです。'),'text/html; charset=utf-8');
   }
   if(['/daily-missions/mission_play.mjs','/daily-missions/mission_flow.mjs'].includes(url.pathname))return send(200,await readFile(new URL('../../'+url.pathname.slice(1),import.meta.url)),'text/javascript; charset=utf-8');
   if(url.pathname==='/daily-missions/mission_browser_client.mjs')return send(200,`export function createBrowserMissionClient(){const request=async(path,body)=>{const r=await fetch('/api/v1/'+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const data=await r.json();if(!r.ok)throw Object.assign(Error(data.error),{status:r.status});return data;};return {request,prepare:()=>request('missions/learning'),finish:()=>request('missions/learning')};}`,'text/javascript; charset=utf-8');
   if(url.pathname==='/daily_mission_test.html'){
    const source=await readFile(new URL('../../daily_mission_test.html',import.meta.url),'utf8');
    // Reuse the real layout, but never load its normal login/storage/result import scripts.
    return send(200,source.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,'').replace('</body>','<script type="module" src="/mission-dashboard.js"></script></body>'),'text/html; charset=utf-8');
   }
   if(url.pathname==='/mission-dashboard.js')return send(200,await readFile(new URL('./mission-dashboard.js',import.meta.url)),'text/javascript; charset=utf-8');
   if(url.pathname==='/sync.html')return send(200,await readFile(new URL('./sync.html',import.meta.url)),'text/html; charset=utf-8');
   if(['/sync-client.js','/sync-page.js'].includes(url.pathname))return send(200,await readFile(new URL('.'+url.pathname,import.meta.url)),'text/javascript; charset=utf-8');
   if(url.pathname==='/sync-schema.js')return send(200,(await readFile(new URL('../../daily-missions/daily_mission_cloud_state.js',import.meta.url),'utf8'))+'\n'+(await readFile(new URL('../../cloud_schema.js',import.meta.url),'utf8')),'text/javascript; charset=utf-8');
   if(url.pathname==='/')return send(200,await readFile(new URL('./index.html',import.meta.url)),'text/html; charset=utf-8');
   if(['/quiz.html','/quiz_jaen.html','/audio_quiz.html'].includes(url.pathname)){
    const source=await readFile(new URL('../../'+url.pathname.slice(1),import.meta.url),'utf8');
    const html=source.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,'').replace('</head>',`<meta id="missionRecoveryScope" content="${recoveryScope}"></head>`).replace('</body>','<script type="module" src="/word-page.js"></script></body>');
    return send(200,html,'text/html; charset=utf-8');
   }
   if(['/word-page.js','/word-session.js'].includes(url.pathname))return send(200,await readFile(new URL('.'+url.pathname,import.meta.url)),'text/javascript; charset=utf-8');
   if(['/style.css','/cloud_auto.css','/cloud_navigation.css'].includes(url.pathname))return send(200,await readFile(new URL('../../'+url.pathname.slice(1),import.meta.url)),'text/css; charset=utf-8');
   if(url.pathname==='/images/goimon/goimon_egg.png')return send(200,await readFile(new URL('../../images/goimon/goimon_egg.png',import.meta.url)),'image/png');
   if(url.pathname==='/app.js')return send(200,await readFile(new URL('./app.js',import.meta.url)),'text/javascript; charset=utf-8');
   if(/^\/audio\/listening\/1kyu\/type[235]\/[A-Za-z0-9_]+\.mp3$/.test(url.pathname))return send(200,await readFile(new URL('../../'+url.pathname.slice(1),import.meta.url)),'audio/mpeg');
   return send(404,'Not found');
  }catch{return send(500,'Local test error');}
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve);});
 origin='http://127.0.0.1:'+server.address().port;
 return {origin,db,close:async()=>{await new Promise(resolve=>server.close(resolve));await proxy.dispose();}};
 }catch(error){await proxy.dispose();throw error;}
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const harness=await startHarness(8877,{seedGrowth:process.argv.includes('--growth-demo')});console.log('Local mission test: '+harness.origin+' (temporary test data only)');
 for(const signal of ['SIGINT','SIGTERM'])process.once(signal,async()=>{await harness.close();process.exit(0);});
}
