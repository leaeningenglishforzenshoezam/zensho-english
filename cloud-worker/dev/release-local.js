// LOCAL RECOVERY PREVIEW ONLY. No Wrangler, remote D1, or production writes.
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createOfflineDb} from '../tests/offline-db.js';
import {createSession} from '../src/session.js';
import {readEconomy,executeDraw} from '../src/economy_repository.js';
import release from '../src/mission_release.js';
import {calculateLevel} from '../src/data/mission-growth-rules.js';
const root=path.resolve(fileURLToPath(new URL('../../',import.meta.url)));
export async function startLocalRelease(port=8878){
 const h=await createOfflineDb(),session=await createSession(h.db,'local-test'),runId=crypto.randomUUID();
 const pet={id:'local-partner',nickname:'ラミア',type:'nagomi',stage:'child',stats:{chie:100,kotoba:100,onkan:100,bunmyaku:100},totalPoints:400,level:calculateLevel(400),pendingEvolution:false};
 const data={zensho_goimon_current_v4_lv1:JSON.stringify(pet),zensho_level_v1:'1'};
 await h.db.prepare('INSERT INTO saves(user_id,revision,schema_version,save_json) VALUES (?,1,1,?)').bind('local-test',JSON.stringify({schemaVersion:1,data})).run();
 await h.db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?)').bind('local-test',JSON.stringify({version:1,shards:120,owned:{gear:{},skills:{}}})).run();
 let loadouts={},cleared=[],rewardReceipts=new Set();
 const limiter={limit:async()=>({success:true})};let origin;
 const server=http.createServer(async(req,res)=>{
 const send=(status,body,type='application/json')=>{res.writeHead(status,{'Content-Type':type+'; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-src 'none'; media-src 'self' blob:"});res.end(typeof body==='string'||Buffer.isBuffer(body)?body:JSON.stringify(body));};
 try{
 if(req.headers.host!==new URL(origin).host||(req.headers.origin&&req.headers.origin!==origin)||req.headers['sec-fetch-site']==='cross-site')return send(403,{error:'local_only'});
 const url=new URL(req.url,origin);let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>1048576)return send(413,{error:'too_large'});}
 if(url.pathname.startsWith('/local-api/')){
  if(req.headers.authorization!=='Bearer '+session.token)return send(401,{error:'unauthorized'});
  const p=body?JSON.parse(body):{};
  if(url.pathname==='/local-api/state'&&req.method==='GET'){const row=await h.db.prepare('SELECT save_json FROM saves WHERE user_id=?').bind('local-test').first();const saved=JSON.parse(row.save_json).data,current=JSON.parse(saved.zensho_goimon_current_v4_lv1),archive=JSON.parse(saved.zensho_goimon_archive_v4_lv1||'[]');return send(200,{...(await readEconomy(h.db,'local-test')),loadout:loadouts[current.id]||{gearId:null,skillIds:[]},loadouts,companions:[current,...archive],cleared,pet:current});}
  if(url.pathname==='/local-api/draw'&&req.method==='POST')return send(200,await executeDraw(h.db,'local-test',p.operationId,p.expectedRevision,{type:'draw',kind:p.kind,count:p.count}));
  if(url.pathname==='/local-api/loadout'&&req.method==='POST'){
   const {state}=await readEconomy(h.db,'local-test');
   if(!Array.isArray(p.skillIds)||p.skillIds.length>4||new Set(p.skillIds).size!==p.skillIds.length||p.skillIds.some(id=>!(state.owned.skills[id]>0))||(p.gearId!==null&&!(state.owned.gear[p.gearId]>0)))return send(400,{error:'未所持または重複した登録です'});
   const row=await h.db.prepare('SELECT save_json FROM saves WHERE user_id=?').bind('local-test').first(),saved=JSON.parse(row.save_json).data,current=JSON.parse(saved.zensho_goimon_current_v4_lv1),archive=JSON.parse(saved.zensho_goimon_archive_v4_lv1||'[]'),petId=p.petId||current.id;if(![current,...archive].some(x=>x.id===petId))return send(400,{error:'相棒が見つかりません'});const loadout={gearId:p.gearId,skillIds:p.skillIds};loadouts[petId]=loadout;return send(200,{loadout});
  }
  // Demo-only claim. Not a production quest verification API.
  if(url.pathname==='/local-api/clear'&&req.method==='POST'){
   if(!Number.isInteger(p.stage)||p.stage<1||p.stage>5||p.stage>cleared.length+1)return send(400,{error:'locked_stage'});
   if(!rewardReceipts.has(p.stage)){
    const current=await readEconomy(h.db,'local-test');current.state.shards+=p.stage===5?5:2;
    await h.db.prepare('UPDATE economy_accounts SET state_json=?,revision=revision+1 WHERE user_id=?').bind(JSON.stringify(current.state),'local-test').run();
    rewardReceipts.add(p.stage);cleared.push(p.stage);
   }return send(200,{cleared,...await readEconomy(h.db,'local-test')});
  }return send(404,{error:'not_found'});
 }
 if(url.pathname.startsWith('/api/')){
  const headers={...req.headers,origin};const response=await release.fetch(new Request(url,{method:req.method,headers,...(['GET','HEAD'].includes(req.method)?{}:{body})}),{DB:h.db,ALLOWED_ORIGIN:origin,MISSION_RELEASE_ENABLED:'true',RATE_LIMITER:limiter,AUTH_RATE_LIMITER:limiter});
  return send(response.status,await response.text());
 }
 if(url.pathname==='/cloud_config.js')return send(200,'window.GOIMON_CLOUD_CONFIG='+JSON.stringify({apiBase:origin,googleClientId:'',missionsEnabled:true,dailyMissionSync:true})+';','text/javascript');
 if(url.pathname==='/local-bootstrap.js'){
  const profile={data,base:data,revision:1};
  return send(200,`(()=>{const run=${JSON.stringify(runId)};if(localStorage.getItem('goimon-recovery-run')!==run){for(const k of Object.keys(localStorage))if(k.startsWith('goimon-recovery-')||k.startsWith('goimon_cloud_v2:')||k.startsWith('goimon_mission_'))localStorage.removeItem(k);localStorage.setItem('goimon_cloud_v2:profile:local-test',${JSON.stringify(JSON.stringify(profile))});localStorage.setItem('goimon-recovery-run',run);}localStorage.setItem('goimon_cloud_v2:active','local-test');sessionStorage.setItem('goimon_cloud_session_v1',${JSON.stringify(JSON.stringify({...session,apiBase:origin}))});})();`,'text/javascript');
 }
 let relative=decodeURIComponent(url.pathname).replace(/^\/+/, '')||'local-preview/index.html';
 if(relative==='index.html')relative='local-preview/index.html';
 if(relative==='learning-home.html'){res.writeHead(302,{Location:'/index.html#learn'});return res.end();}
 if(relative.split('/').some(p=>p.startsWith('.')||p==='node_modules')||relative.startsWith('cloud-worker/'))return send(404,'Not found','text/plain');
 const file=path.resolve(root,relative);if(!file.startsWith(root+path.sep))return send(404,'Not found','text/plain');
 const ext=path.extname(file),types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp3':'audio/mpeg','.woff2':'font/woff2'};
 if(!types[ext])return send(404,'Not found','text/plain');let content=await readFile(file);
 if(ext==='.html')content=content.toString().replace('<head>','<head><script src="/local-bootstrap.js"></script>');
 if(relative==='mission_play.html')content=content.replace('</body>',`<script>const slot=new URLSearchParams(location.search).get('slot');const sel=document.getElementById('kind');const choice=[...sel.options].find(o=>o.value.split(':')[0]===slot);if(choice)sel.value=choice.value;</script></body>`);
 return send(200,content,types[ext]);
 }catch(e){return send(e.code==='ENOENT'?404:400,{error:e.message});}
 });
 await new Promise(resolve=>server.listen(port,'127.0.0.1',resolve));origin='http://127.0.0.1:'+server.address().port;
 return {origin,close:async()=>{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));h.close();}};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){const app=await startLocalRelease(Number(process.env.GOIMON_LOCAL_PORT)||8878);console.log('GOIMON 復元プレビュー: '+app.origin+'\nローカル専用・停止するとテストデータは初期化されます');process.on('SIGINT',async()=>{await app.close();process.exit();});}
