// Run: NODE_PATH=<playwright modules> node tests/cloud-browser.cjs. Starts its own localhost server.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const {spawn}=require('node:child_process');
 const server=spawn(process.execPath,[require('node:path').join(__dirname,'..','preview-server.cjs')],{env:{...process.env,GOIMON_PREVIEW_PORT:'8879'}});
 await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',c=>reject(Error('preview exited '+c)));});
 let browser;
 try{
 const options={headless:true};
 if(process.env.GOIMON_CHROMIUM_PATH){options.executablePath=process.env.GOIMON_CHROMIUM_PATH;options.args=['--no-sandbox','--disable-gpu'];}
 browser=await chromium.launch(options);
 const context=await browser.newContext();await context.route('**/*',r=>new URL(r.request().url()).hostname==='localhost'?r.continue():r.abort());
 const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
 await p.goto('http://localhost:8879/index.html');await p.evaluate(()=>localStorage.setItem('q7SetHistory_v1','{"guest":{"attempts":2}}'));
 const pages=fs.readdirSync(require('node:path').join(__dirname,'..')).filter(f=>f.endsWith('.html')&&!f.startsWith('google'));
 for(const account of [null,'smoke-user']){await p.evaluate(id=>id?GOIMONProfiles.activate(id):GOIMONProfiles.logout(),account);for(const name of pages){await p.goto('http://localhost:8879/'+name);await p.waitForTimeout(80);}}
 assert.deepEqual(errors,[],'page JS errors');
 let cloud={},offline=false,apiStatus=0,dropAfterWrite=false,concurrentWrite=false,postCount=0;
 await context.route('**/cloud_config.js',r=>r.fulfill({contentType:'text/javascript',body:'window.GOIMON_CLOUD_CONFIG={googleClientId:"test",apiBase:"https://api.test"}'}));
 const sessions=new Map();let serial=0;
 await context.route('https://api.test/**',async r=>{
   if(offline)return r.abort();if(apiStatus)return r.fulfill({status:apiStatus,json:{error:'injected_failure'}});
   const credential=r.request().headers().authorization.split(' ')[1],method=r.request().method();
   if(new URL(r.request().url()).pathname.endsWith('/session')){
     if(method==='POST'){const token='gs1_'+String(++serial).padStart(64,'0'),x={token,userId:credential,expiresAt:Math.floor(Date.now()/1000)+86400};sessions.set(token,x);return r.fulfill({json:x});}
     if(method==='DELETE'){sessions.delete(credential);return r.fulfill({json:{ok:true}});}
     const x=sessions.get(credential);return r.fulfill({status:x?200:401,json:x||{error:'unauthorized'}});
   }
   const id=sessions.get(credential)?.userId;if(!id)return r.fulfill({status:401,json:{error:'unauthorized'}});
   const s=cloud[id]||{revision:0,snapshot:null};
   if(method==='POST'){postCount++;if(concurrentWrite){concurrentWrite=false;cloud[id]={...s,revision:s.revision+1};return r.fulfill({status:409,json:{error:'revision_conflict'}});}const b=r.request().postDataJSON();if(b.expectedRevision!==s.revision)return r.fulfill({status:409,json:{error:'revision_conflict'}});cloud[id]={revision:s.revision+1,snapshot:b.snapshot};if(dropAfterWrite){dropAfterWrite=false;return r.abort();}return r.fulfill({json:{revision:cloud[id].revision}});}
   return r.fulfill({json:{userId:id,...s}});
 });
 await p.goto('http://localhost:8879/cloud.html');await p.evaluate(()=>goimonGoogleLogin('A'));
 await p.click('#import-guest');await p.waitForFunction(()=>!document.querySelector('#sync').disabled);await p.click('#sync');await p.waitForFunction(()=>!document.querySelector('#sync').disabled);assert.equal(cloud.A.revision,1);assert(cloud.A.snapshot.data.q7SetHistory_v1);
 await p.evaluate(()=>{const p=GOIMONProfiles.read('A');p.data.q7SetHistory_v1='{"local":{"attempts":4}}';GOIMONProfiles.write('A',p)});
 cloud.A={revision:2,snapshot:{schemaVersion:1,data:{q7SetHistory_v1:'{"remote":{"attempts":5}}'}}};
 await p.click('#sync');await p.waitForSelector('#conflict:visible');assert.equal(cloud.A.revision,2);await p.click('#use-local');await p.waitForFunction(()=>!document.querySelector('#sync').disabled);assert.equal(cloud.A.revision,3);assert(cloud.A.snapshot.data.q7SetHistory_v1.includes('local'));
 offline=true;await p.click('#sync');await p.waitForFunction(()=>!document.querySelector('#sync').disabled);assert.equal(await p.evaluate(()=>GOIMONProfiles.read('A').data.q7SetHistory_v1),cloud.A.snapshot.data.q7SetHistory_v1);offline=false;
 await p.evaluate(()=>goimonGoogleLogin('B'));await p.click('#sync');await p.waitForFunction(()=>!document.querySelector('#sync').disabled);assert.equal(await p.evaluate(()=>Object.keys(GOIMONProfiles.read('B').data).length),0);
 assert.equal(await p.evaluate(()=>localStorage.getItem('q7SetHistory_v1')),'{"guest":{"attempts":2}}');

 console.log('PASS: 19 pages in guest/account mode and basic browser sync');
 const go=async page=>{await page.goto('http://localhost:8879/cloud.html');await page.waitForFunction(()=>!document.querySelector('#logout').disabled)};
 const login=(page,id)=>page.evaluate(id=>goimonGoogleLogin(id),id);
 const sync=page=>page.evaluate(()=>document.getElementById('sync').onclick());
 const profile=()=>p.evaluate(()=>GOIMONProfiles.read('A'));
 await login(p,'A');
 await p.goto('http://localhost:8879/quiz.html');
 await p.locator('#limitCount').fill('3');await p.locator('#startTest').click();
 await p.locator('#choices button').first().waitFor({state:'visible'});
 const beforeOffline=await profile();
 await context.setOffline(true);
 for(let i=0;i<3;i++){await p.locator('#choices button').first().click();if(i<2)await p.locator('#nextQTop').click();}
 const learnedOffline=await profile();assert.notDeepEqual(learnedOffline.data,beforeOffline.data);
 assert(learnedOffline.data.zensho_learning_log_v1_lv1);
 await context.setOffline(false);const loginCount=serial;await go(p);assert.equal(serial,loginCount);assert.match(await p.locator('#account').textContent(),/Googleログイン済み/);await sync(p);
 assert.equal(cloud.A.snapshot.data.zensho_learning_log_v1_lv1,learnedOffline.data.zensho_learning_log_v1_lv1);
 console.log('PASS: real quiz answers while browser offline; records upload after reconnect');
 for(const status of [401,429,500]){await login(p,'A');const before=await profile();apiStatus=status;await sync(p);apiStatus=0;assert.deepEqual(await profile(),before);assert(!(await p.locator('#status').textContent()).startsWith('同期しました'));}
 console.log('PASS: expired token, rate limit and server failure preserve local records');
 await p.evaluate(()=>{const p=GOIMONProfiles.read('A');p.data.q7SetHistory_v1='{"lostResponse":1}';GOIMONProfiles.write('A',p)});
 let before=await profile();dropAfterWrite=true;await sync(p);assert.deepEqual(await profile(),before);const accepted=cloud.A.revision;await sync(p);assert.equal(cloud.A.revision,accepted);assert.equal((await profile()).revision,accepted);
 console.log('PASS: accepted save with lost response retries without duplicate overwrite');
 await p.evaluate(()=>{const p=GOIMONProfiles.read('A');p.data.q7SetHistory_v1='{"race":1}';GOIMONProfiles.write('A',p)});
 before=await profile();concurrentWrite=true;await sync(p);assert.deepEqual(await profile(),before);assert.match(await p.locator('#status').textContent(),/別の端末/);await sync(p);
 console.log('PASS: server revision race stops and can retry safely');
 const learning=await context.newPage();learning.on('dialog',d=>d.accept());await learning.goto('http://localhost:8879/quiz.html');
 await learning.waitForFunction(async()=>{const q=await navigator.locks.query();return q.held.some(x=>x.name==='goimon-profile-A')});
 const requests=postCount;await sync(p);assert.match(await p.locator('#status').textContent(),/学習タブを閉じて/);assert.equal(postCount,requests);
 const blocked=await context.newPage();blocked.on('dialog',d=>d.accept());await blocked.goto('http://localhost:8879/quiz.html');
 const preserved=await profile();const result=await blocked.evaluate(()=>{try{GOIMONStorage.setItem('q7SetHistory_v1','{"blocked":1}');return false}catch{return true}});assert(result);assert.deepEqual(await profile(),preserved);
 await blocked.close();await learning.close();await sync(p);assert.match(await p.locator('#status').textContent(),/^同期しました/);
 console.log('PASS: real Web Locks stop second learning tab and concurrent sync; release on close');
 await p.goto('http://localhost:8879/quiz.html');
 before=await profile();await p.evaluate(()=>{window.originalStorageSet=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('goimon_cloud_v2:profile:'))throw new DOMException('full','QuotaExceededError');return originalStorageSet.call(this,k,v)};try{GOIMONStorage.setItem('q7SetHistory_v1','{"quota":1}')}catch{}});
 assert.deepEqual(await profile(),before);await p.locator('#goimon-storage-error').waitFor({state:'visible'});
 const saved=p.waitForEvent('download');await p.locator('#goimon-storage-error button').click();const download=await saved;
 assert.equal(JSON.parse(fs.readFileSync(await download.path(),'utf8')).profile.data.q7SetHistory_v1,'{"quota":1}');
 await p.evaluate(()=>{Storage.prototype.setItem=originalStorageSet});
 console.log('PASS: quota failure leaves saved profile intact and exports unsaved data');
 await go(p);

 await p.evaluate(()=>document.querySelector('#logout').onclick());
 const guestDownload=p.waitForEvent('download');await p.locator('#backup').click();const guestFile=await guestDownload;
 const guestBackup=JSON.parse(fs.readFileSync(await guestFile.path(),'utf8'));assert.equal(guestBackup.account,null);assert.equal(guestBackup.data.q7SetHistory_v1,'{"guest":{"attempts":2}}');
 console.log('PASS: backup after logout exports guest data, not the previous account');
 await p.reload();await p.waitForFunction(()=>!document.querySelector('#logout').disabled);assert.match(await p.locator('#account').textContent(),/ログインしていません/);
 await login(p,'A');const stored=await p.evaluate(()=>JSON.parse(sessionStorage.getItem('goimon_cloud_session_v1')));
 assert.match(stored.token,/^gs1_[a-f0-9]{64}$/);
 assert.equal(await p.evaluate(t=>Object.values(localStorage).some(v=>v.includes(t)),stored.token),false);
 await p.reload();await p.waitForFunction(()=>!document.querySelector('#sync').disabled);assert.equal(serial,Number(stored.token.slice(4)));
 before=await profile();offline=true;await go(p);assert.match(await p.locator('#account').textContent(),/ログインしていません/);assert.equal(await p.locator('#resume').isVisible(),true);assert.deepEqual(await profile(),before);
 offline=false;await p.evaluate(()=>document.querySelector('#resume').onclick());assert.match(await p.locator('#account').textContent(),/Googleログイン済み/);
 sessions.delete(stored.token);await go(p);assert.match(await p.locator('#account').textContent(),/ログインしていません/);assert.equal(await p.evaluate(()=>sessionStorage.getItem('goimon_cloud_session_v1')),null);assert.deepEqual(await profile(),before);
 await login(p,'A');await p.evaluate(()=>{const x=JSON.parse(sessionStorage.getItem('goimon_cloud_session_v1'));x.expiresAt=1;sessionStorage.setItem('goimon_cloud_session_v1',JSON.stringify(x))});await go(p);assert.match(await p.locator('#account').textContent(),/ログインしていません/);assert.deepEqual(await profile(),before);
 await login(p,'A');const other=await context.newPage();await go(other);await login(other,'B');await p.waitForFunction(()=>document.querySelector('#sync').disabled);assert.equal(await p.evaluate(()=>sessionStorage.getItem('goimon_cloud_session_v1')),null);await go(p);assert.equal(await p.evaluate(()=>localStorage.getItem('goimon_cloud_v2:active')),'B');assert.deepEqual(await profile(),before);await other.close();
 await login(p,'A');const logoutToken=await p.evaluate(()=>JSON.parse(sessionStorage.getItem('goimon_cloud_session_v1')).token);await p.evaluate(()=>document.querySelector('#logout').onclick());assert.equal(sessions.has(logoutToken),false);await go(p);assert.match(await p.locator('#account').textContent(),/ログインしていません/);
 console.log('PASS: session survives navigation/reload; offline retry, expiry, revocation, cross-tab switch and logout are safe');
 await p.screenshot({path:'/tmp/goimon-cloud-screen.png',fullPage:true});assert.deepEqual(errors,[]);console.log(`PASS: ${pages.length} pages × guest/account; import, sync, conflict resolution, offline, account switch, guest preservation`);
 }finally{await browser?.close();server.kill()}})().catch(e=>{console.error(e);process.exit(1)});
