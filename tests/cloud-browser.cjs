// Run a local server at :8765, then NODE_PATH=<playwright modules> node tests/cloud-browser.cjs
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{const browser=await chromium.launch({headless:true});try{
 const context=await browser.newContext();await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
 const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
 await p.goto('http://127.0.0.1:8765/index.html');await p.evaluate(()=>localStorage.setItem('q7SetHistory_v1','{"guest":{"attempts":2}}'));
 const pages=fs.readdirSync(require('node:path').join(__dirname,'..')).filter(f=>f.endsWith('.html')&&!f.startsWith('google'));
 for(const account of [null,'smoke-user']){await p.evaluate(id=>id?GOIMONProfiles.activate(id):GOIMONProfiles.logout(),account);for(const name of pages){await p.goto('http://127.0.0.1:8765/'+name);await p.waitForTimeout(80);}}
 assert.deepEqual(errors,[],'page JS errors');
 let cloud={},offline=false;
 await context.route('**/cloud_config.js',r=>r.fulfill({contentType:'text/javascript',body:'window.GOIMON_CLOUD_CONFIG={googleClientId:"test",apiBase:"https://api.test"}'}));
 await context.route('https://api.test/**',async r=>{if(offline)return r.abort();const id=r.request().headers().authorization.split(' ')[1],s=cloud[id]||{revision:0,snapshot:null};if(r.request().method()==='POST'){const b=r.request().postDataJSON();if(b.expectedRevision!==s.revision)return r.fulfill({status:409,json:{error:'revision_conflict'}});cloud[id]={revision:s.revision+1,snapshot:b.snapshot};return r.fulfill({json:{revision:cloud[id].revision}});}return r.fulfill({json:{userId:id,...s}});});
 await p.goto('http://127.0.0.1:8765/cloud.html');await p.evaluate(()=>goimonGoogleLogin('A'));
 await p.click('#import-guest');await p.waitForFunction(()=>!document.querySelector('#sync').disabled);await p.click('#sync');await p.waitForFunction(()=>!document.querySelector('#sync').disabled);assert.equal(cloud.A.revision,1);assert(cloud.A.snapshot.data.q7SetHistory_v1);
 await p.evaluate(()=>{const p=GOIMONProfiles.read('A');p.data.q7SetHistory_v1='{"local":{"attempts":4}}';GOIMONProfiles.write('A',p)});
 cloud.A={revision:2,snapshot:{schemaVersion:1,data:{q7SetHistory_v1:'{"remote":{"attempts":5}}'}}};
 await p.click('#sync');await p.waitForSelector('#conflict:visible');assert.equal(cloud.A.revision,2);await p.click('#use-local');await p.waitForFunction(()=>!document.querySelector('#sync').disabled);assert.equal(cloud.A.revision,3);assert(cloud.A.snapshot.data.q7SetHistory_v1.includes('local'));
 offline=true;await p.click('#sync');await p.waitForFunction(()=>!document.querySelector('#sync').disabled);assert.equal(await p.evaluate(()=>GOIMONProfiles.read('A').data.q7SetHistory_v1),cloud.A.snapshot.data.q7SetHistory_v1);offline=false;
 await p.evaluate(()=>goimonGoogleLogin('B'));await p.click('#sync');await p.waitForFunction(()=>!document.querySelector('#sync').disabled);assert.equal(await p.evaluate(()=>Object.keys(GOIMONProfiles.read('B').data).length),0);
 assert.equal(await p.evaluate(()=>localStorage.getItem('q7SetHistory_v1')),'{"guest":{"attempts":2}}');
 await p.screenshot({path:'/tmp/goimon-cloud-screen.png',fullPage:true});assert.deepEqual(errors,[]);console.log(`PASS: ${pages.length} pages × guest/account; import, sync, conflict resolution, offline, account switch, guest preservation`);
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
