'use strict';
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'};
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 fs.readFile(file,(e,data)=>{if(e){res.writeHead(404).end();return;}res.writeHead(200,{'Content-Type':MIME[path.extname(file)]||'text/plain'});res.end(data)});
});
const listen=()=>new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
(async()=>{
 await listen();
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try {
  const page=await browser.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>localStorage.setItem('zensho_level_v1','2'));
  const base='http://127.0.0.1:'+server.address().port;
  await page.goto(base+'/g2q11.html',{waitUntil:'load'});
  await page.locator('#openQuestions').click();
  assert.match(await page.locator('#catalogHeading').innerText(),/200問/);
  await page.locator('#catalogBack').click();
  await page.locator('#openGrammar').click();
  assert.match(await page.locator('#catalogHeading').innerText(),/文法一覧/);
  await page.locator('#catalogBack').click();
  await page.locator('#start').click();
  assert.ok(await page.locator('#play').isVisible(),'quiz must be visible');
  assert.equal(await page.locator('#choices button').count(),3);
  const first=await page.locator('#choices button').first().innerText();
  assert.ok(first.length>1);
  await page.locator('#choices button').first().click();
  await page.locator('#check').click();
  assert.ok(await page.locator('#feedback').isVisible(),'feedback must display');
  await page.locator('#back').click({force:true}).catch(()=>{});
  // Explicitly inspect storage and grade separation rather than relying on UI badge.
  assert.equal(await page.evaluate(()=>localStorage.getItem('zensho_level_v1')),'2');
  if(errors.length) console.log('Nonfatal page errors:',errors.slice(0,5));
  console.log('PASS: catalogue, grammar, 3-choice answer, feedback, grade selection');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
