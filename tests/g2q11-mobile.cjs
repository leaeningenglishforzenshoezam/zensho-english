'use strict';
const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const p=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
 if(!p.startsWith(root+path.sep)){res.writeHead(403).end();return}
 fs.readFile(p,(e,b)=>{if(e){res.writeHead(404).end();return}res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':'text/html');res.end(b)});
});
(async()=>{
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
 for(const width of [375,390,768]){
  const page=await browser.newPage({viewport:{width,height:812},isMobile:true,hasTouch:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>localStorage.setItem('zensho_level_v1','2'));
  await page.goto('http://127.0.0.1:'+server.address().port+'/g2q11.html');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);
  assert.equal(overflow,false,'horizontal overflow at width '+width);
  await page.locator('#openGrammar').click();
  assert.ok(await page.locator('#catalog').isVisible());
  await page.locator('#catalogBack').click();
  await page.locator('#openQuestions').click();
  await page.locator('#catalogBody .bookmark').first().click();
  assert.match(await page.locator('#catalogBody .bookmark').first().innerText(),/手動解除/);
  await page.locator('#catalogBack').click();
  await page.locator('#start').click();
  assert.equal(await page.locator('#choices button').count(),3);
  await page.locator('#choices button').first().click();
  await page.locator('#check').click();
  assert.ok(await page.locator('#feedback').isVisible());
  assert.equal(errors.length,0,'uncaught browser error '+width+': '+errors.join(', '));
  await page.close();
  console.log('PASS mobile viewport '+width);
 }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
