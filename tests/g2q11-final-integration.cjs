'use strict';
const {chromium}=require('playwright');
const {createServer}=require('node:http');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const srv=createServer((req,res)=>{
 const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
 fs.readFile(file,(e,b)=>{if(e){res.writeHead(404).end();return}res.setHeader('content-type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(b)});
});
(async()=>{
 await new Promise(resolve=>srv.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  const url='http://127.0.0.1:'+srv.address().port+'/g2q11.html';
  const page=await browser.newPage();
  await page.addInitScript(()=>localStorage.setItem('zensho_level_v1','2'));
  await page.goto(url);
  await page.locator('#start').click();
  const answer=await page.evaluate(()=>window.GOIMON_G2_Q11_SET1[0].answer);
  const options=page.locator('#choices button');
  const labels=await options.allTextContents();
  const wrong=labels.findIndex(label=>!label.includes(answer));
  assert.ok(wrong>=0,'one distractor must exist');
  await options.nth(wrong).click();await page.locator('#check').click();
  assert.match(await page.locator('#result').innerText(),/不正解/);
  const read=()=>page.evaluate(()=>({
   weak:JSON.parse(localStorage.getItem('zensho_q11_grammar_weak_v1_lv2')||'{}'),
   log:JSON.parse(localStorage.getItem('zensho_learning_log_v1_lv2')||'{}'),
   grade1:localStorage.getItem('zensho_learning_log_v1_lv1')
  }));
  const result=await read();
  assert.equal(result.weak.G2_Q11_001.wrong,1);
  assert.equal(result.weak.G2_Q11_001.auto,true);
  assert.ok(Object.values(result.log).some(day=>day?.q11_grammar?.wrong===1),'wrong answer logged');
  assert.equal(result.grade1,null,'grade1 log unaffected');
  await page.reload();
  assert.match(await page.locator('#poolInfo').innerText(),/苦手 1問/);
  await page.close();
  // A level-1 selection must not launch grade-2 questions directly.
  const one=await browser.newPage();
  await one.addInitScript(()=>localStorage.setItem('zensho_level_v1','1'));
  await one.goto(url);
  one.on('dialog',dialog=>dialog.accept());
  await one.locator('#start').click();
  assert.equal(await one.locator('#play').isVisible(),false);
  await one.close();
  console.log('PASS: wrong-answer weak/log persistence and strict 1/2 separation');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>srv.close());
