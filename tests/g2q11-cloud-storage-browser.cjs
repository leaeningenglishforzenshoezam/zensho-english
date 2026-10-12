'use strict';
const {chromium}=require('playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const p=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!p.startsWith(root+path.sep)){res.writeHead(403).end();return}
 fs.readFile(p,(err,buf)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':'text/html');res.end(buf)});
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const url='http://127.0.0.1:'+server.address().port+'/g2q11.html';
 try {
  const context=await browser.newContext();
  const seed=async(account)=>{const page=await context.newPage();await page.goto(url);await page.evaluate((id)=>{
    localStorage.setItem('goimon_cloud_v2:active',id);
    localStorage.setItem('goimon_cloud_v2:profile:'+id,JSON.stringify({data:{zensho_level_v1:'2'},base:{},revision:0}));
  },account);await page.close()};
  await seed('q11-test-A');
  const a=await context.newPage();await a.goto(url);
  await a.waitForFunction(()=>window.GOIMONProfiles?.isWriter());
  await a.locator('#openQuestions').click();
  await a.locator('#catalogBody .bookmark').first().click();
  const key='zensho_q11_grammar_weak_v1_lv2';
  const value=await a.evaluate(k=>JSON.parse(window.GOIMONStorage.getItem(k)||'{}'),key);
  assert.equal(value.G2_Q11_001?.manual,true,'A manual weak stored');
  const aProfile=await a.evaluate(()=>JSON.parse(localStorage.getItem('goimon_cloud_v2:profile:q11-test-A')));
  assert.equal(JSON.parse(aProfile.data[key]).G2_Q11_001.manual,true);
  await a.close();
  // B is a different simulated account on the same origin, with no copied A data.
  await seed('q11-test-B');
  const b=await context.newPage();await b.goto(url);
  await b.waitForFunction(()=>window.GOIMONProfiles?.isWriter());
  assert.equal(await b.evaluate(k=>window.GOIMONStorage.getItem(k),key),null,'B must not inherit A');
  await b.close();
  // Restore A, verify persisted state after page reload.
  await seed('q11-test-A');
  const again=await context.newPage();await again.goto(url);
  await again.waitForFunction(()=>window.GOIMONProfiles?.isWriter());
  assert.equal(await again.evaluate(k=>JSON.parse(window.GOIMONStorage.getItem(k)||'{}').G2_Q11_001?.manual,key),true);
  // Two tabs: second tab must not write while the first one holds the lock.
  const blocked=await context.newPage();await blocked.goto(url);
  await blocked.waitForTimeout(250);
  assert.equal(await blocked.evaluate(()=>window.GOIMONProfiles.isWriter()),false,'second tab must not own lock');
  let threw=false;
  try{await blocked.evaluate(k=>window.GOIMONStorage.setItem(k,'{}'),key)}catch(e){threw=true}
  assert.equal(threw,true,'blocked tab must not commit');
  assert.equal(await again.evaluate(k=>JSON.parse(window.GOIMONStorage.getItem(k)||'{}').G2_Q11_001?.manual,key),true,'A data retained');
  await blocked.close();await again.close();
  console.log('PASS: account A/B isolation, reload persistence, second-tab write protection');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
