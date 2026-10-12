'use strict';
const {chromium}=require('playwright'),http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return}res.setHeader('content-type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(data)});
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}});
  await context.addInitScript(()=>localStorage.setItem('zensho_level_v1','2'));
  const page=await context.newPage();
  const errors=[];page.on('pageerror',error=>errors.push(String(error)));
  await page.goto('http://127.0.0.1:'+server.address().port+'/g2q11.html');
  await page.locator('#openQuestions').click();
  const exercise=page.locator('#catalogBody .catalog-exercise').first();
  await exercise.locator('summary').click();
  const answer=await page.evaluate(()=>window.GOIMON_G2_Q11_SET1[0].answer);
  const buttons=exercise.locator('.catalog-choices button');
  const texts=await buttons.allTextContents();
  const correct=texts.findIndex(x=>x.includes(answer));assert.ok(correct>=0);
  await buttons.nth(correct).click();
  await exercise.locator('button.primary').click();
  assert.match(await exercise.locator('.feedback').innerText(),/日本語訳/);
  assert.match(await exercise.locator('.feedback').innerText(),/文法解説/);
  const cursor=await page.evaluate(()=>window.GOIMONStorage.getItem('goimon_g2q11_last_answered_v1'));
  assert.equal(cursor,'1');
  const log=await page.evaluate(()=>JSON.parse(window.GOIMONStorage.getItem('zensho_learning_log_v1_lv2')));
  assert.ok(Object.values(log).some(day=>day?.q11_grammar?.correct===1));
  await page.locator('#catalogBack').click();
  await page.locator('#numberStart').fill('1');
  await page.locator('#numberEnd').fill('10');
  await page.locator('#order').selectOption('continue');
  await page.locator('#start').click();
  assert.match(await page.locator('#stem').innerText(),/\S/);
  assert.equal(await page.locator('#tag').count(),1);
  const firstNumber=await page.evaluate(()=>document.querySelector('#stem').textContent);
  const second=await page.evaluate(()=>window.GOIMON_G2_Q11_SET1[1].stem);
  assert.equal(firstNumber,second,'continue should start at question 002');
  await page.reload();
  assert.equal(await page.evaluate(()=>window.GOIMONStorage.getItem('goimon_g2q11_last_answered_v1')),'1');
  assert.deepEqual(errors,[]);
  await context.close();
  console.log('PASS catalog inline quiz + feedback, logging, range and continuation');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
