'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const root='https://leaeningenglishforzenshoezam.github.io/zensho-english/';
const api='https://goimon-cloud-api-staging.one-consistent.workers.dev';
async function get(url,opts={}){const response=await fetch(url,{signal:AbortSignal.timeout(14000),...opts});return response;}
(async()=>{
 let browser;
 try{
  for(const file of ['index.html','quest_chapter1.html','quest_chapter2.html','first_aid_battle_preview.html','announcements.json']){
   const response=await get(root+file);
   assert.equal(response.status,200,'GitHub Pages '+file+' should exist');
   console.log('PUBLIC OK:',file,response.status);
   if(file==='announcements.json'){
    const notices=await response.json();
    assert.ok(!notices.some(x=>x.id==='first-aid-gift-20261112'),'gift announcement must stay unpublished before release');
   }
  }
  const healthResponse=await get(api+'/health',{headers:{Origin:'https://leaeningenglishforzenshoezam.github.io'}});
  assert.equal(healthResponse.status,200,'Worker health');
  const health=await healthResponse.json();
  assert.equal(health.ok,true,'Worker must return healthy status');
  console.log('PUBLIC API CAPABILITIES',JSON.stringify(health.capabilities));
  const giftStatus=await get(api+'/api/v1/economy/gift',{headers:{Origin:'https://leaeningenglishforzenshoezam.github.io'}});
  console.log('GIFT API WITHOUT SESSION: HTTP',giftStatus.status,'(401 means enabled, 404 means still disabled)');
  assert.ok([401,404].includes(giftStatus.status),'gift endpoint should reject a request without a session');
  browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-gpu']});
  const page=await browser.newPage({viewport:{width:390,height:844}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(root+'first_aid_battle_preview.html',{waitUntil:'domcontentloaded',timeout:25000});
  assert.equal(response.status(),200);
  await page.waitForFunction(()=>document.getElementById('playerhp').textContent.includes('/'),{timeout:15000});
  assert.equal(await page.locator('#aid').isEnabled(),true);
  const hpBefore=await page.locator('#playerhp').textContent();
  const initialLeft=await page.locator('#skillsinfo').textContent();
  assert.match(initialLeft,/2 \/ 2/);
  await page.evaluate(()=>{
    const Q=window.GoimonChapterQuestions,base=Q.select;
    Q.select=function(...args){const q=base(...args);window.__testQuestion=q;return q;};
  });
  await page.locator('#aid').click();
  assert.equal(await page.locator('#choices button').count(),4);
  assert.equal(await page.locator('#audioarea button').count(),1);
  assert.equal(await page.locator('#questionbody').textContent(),'音声を聞き、意味を選ぼう。');
  const q=await page.evaluate(()=>({en:window.__testQuestion.speech,answer:window.__testQuestion.answer,no:window.__testQuestion.no}));
  assert.ok(q.en);
  assert.ok(q.no>=1&&q.no<=50,'stage 1 word range');
  await page.locator('#audioarea button').click();
  await page.locator('#choices button').filter({hasText:q.answer}).click();
  await page.waitForFunction(()=>document.getElementById('skillsinfo').textContent.includes('1 / 2'));
  assert.match(await page.locator('#feedback').textContent(),/正解/);
  assert.notEqual(await page.locator('#playerhp').textContent(),hpBefore);
  await page.locator('#aid').click();
  assert.equal(await page.locator('#choices button').count(),4);
  const second=await page.evaluate(()=>window.__testQuestion.answer);
  const wrong=await page.locator('#choices button').allTextContents();
  const pick=wrong.find(x=>x!==second);
  await page.locator('#choices button').filter({hasText:pick}).first().click();
  await page.waitForFunction(()=>document.getElementById('skillsinfo').textContent.includes('0 / 2'));
  assert.match(await page.locator('#feedback').textContent(),/不正解/);
  assert.equal(await page.locator('#aid').isDisabled(),true);
  const local=await page.evaluate(()=>localStorage.length);
  assert.equal(local,0,'no save or account data should be written by the standalone preview');
  assert.deepEqual(errors,[],'no uncaught JavaScript errors');
  console.log('PASS: public Pages + scoped audio 4-choice + correct/wrong recovery + 2 uses + no saved state');
 }finally{await browser?.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
