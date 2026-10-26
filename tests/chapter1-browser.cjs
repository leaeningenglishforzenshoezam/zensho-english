// Real browser chapter playthrough. No battle state mutation; answers are read to drive automated inputs.
const {chromium}=require('playwright-core'),chromiumArgs=require('@sparticuz/chromium'),assert=require('node:assert/strict'),{spawn}=require('node:child_process'),path=require('node:path');
(async()=>{const server=spawn(process.execPath,['preview-server.cjs'],{cwd:path.join(__dirname,'..'),env:{...process.env,GOIMON_PREVIEW_PORT:'8896'}});let browser;try{
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);});
browser=await chromium.launch({executablePath:process.env.GOIMON_CHROMIUM_PATH,args:chromiumArgs.args,headless:true});
const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://localhost:8896/quest_chapter1.html');await p.evaluate(()=>{localStorage.setItem('zensho_level_v1','1');localStorage.setItem('zensho_goimon_current_v4_lv1',JSON.stringify({id:'test-partner',nickname:'相棒テスト',type:'nagomi',stage:'child',stats:{chie:0,kotoba:0,bunmyaku:0,onkan:0}}));localStorage.setItem('zensho_learning_log_v1_lv1','{"untouched":true}');});await p.reload();await p.getByRole('button',{name:'物語をはじめる',exact:true}).click();
let reloaded=false,battles=[],steps=0,forestSave,mistSave;for(;steps<1500;steps++){
 const s=await p.evaluate(()=>GoimonChapter1.snapshot());if(s.mode==='complete')break;
 if(!reloaded&&s.scene===3){await p.reload();const again=await p.evaluate(()=>GoimonChapter1.snapshot());assert.equal(again.scene,s.scene);assert.equal(again.line,s.line);reloaded=true;}
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 if(s.mode==='story'){
  const line=await p.evaluate(()=>{const s=GoimonChapter1.snapshot();return GoimonChapter1Data.scenes[s.scene].lines[s.line];});
  if(line.event==='gift')await p.getByRole('button',{name:'装備の練習へ',exact:true}).click();
  else if(line.event)await p.getByRole('button',{name:'準備できた・戦闘へ',exact:true}).click();
  else await p.locator('#next').click();
 }else if(s.mode==='gift')await p.locator('#app button').last().click();
 else if(s.mode==='battle'){
  if(!battles.includes(s.battleId))battles.push(s.battleId);if(s.battleId===1&&!forestSave)forestSave=await p.evaluate(()=>localStorage.getItem('goimon_chapter1_v1:guest:lv1'));if(s.battleId==='mist'&&!mistSave)mistSave=await p.evaluate(()=>localStorage.getItem('goimon_chapter1_v1:guest:lv1'));
  if(s.feedback){await p.getByRole('button',{name:'次へ',exact:true}).click();continue;}
  if(s.question){const q=s.question;if(q.format==='q12'){for(const id of q.answer){const ch=q.chunks.find(c=>c.id===id);await p.locator('#question .chips').last().getByRole('button',{name:ch.text,exact:true}).click();}await p.getByRole('button',{name:'この順番で答える'}).click();}else await p.locator('#choices button').filter({hasText:q.answer}).first().click();continue;}
  if(s.combat.order[s.combat.index]==='enemy'){await p.getByRole('button',{name:'防御の問題へ'}).click();continue;}
  const pl=s.combat.player;let skill=null;if(s.battleId!==0){if(pl.hp<pl.maxHp*.7)skill=pl.skills.find(x=>x.type==='heal'&&x.left>0);if(!skill)skill=pl.skills.find(x=>x.type==='attack'&&x.left>0);}
  if(skill)await p.locator('button.skill').filter({hasText:skill.name+' ·'}).click();else await p.locator('button.skill').first().click();
 }else throw Error('Unexpected defeat '+JSON.stringify({stage:s.battleId,hp:s.combat.player.hp,steps}));
}
assert(steps<1500);assert.deepEqual(battles,[0,1,2,3,4,5,'mist']);assert(reloaded);
const done=await p.evaluate(()=>GoimonChapter1.snapshot());assert(done.completed);assert(done.cleared.includes('mist'));
await p.getByRole('button',{name:'物語を読み返す'}).click();assert((await p.locator('#logBody h3').count())===20);await p.locator('#closeLog').click();assert.equal((await p.evaluate(()=>GoimonChapter1.snapshot())).revision,done.revision);
await p.reload();assert.equal((await p.evaluate(()=>GoimonChapter1.snapshot())).mode,'complete');
assert.equal(await p.evaluate(()=>localStorage.getItem('zensho_learning_log_v1_lv1')),'{"untouched":true}');assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('zensho_goimon_current_v4_lv1')).nickname),'相棒テスト');assert.deepEqual(errors,[]);
await p.screenshot({path:'/tmp/goimon-chapter1-complete.png'});
// Restore checkpoints produced by the real playthrough, then deliberately lose using UI answers.
async function loseFrom(raw){await p.evaluate(raw=>localStorage.setItem('goimon_chapter1_v1:guest:lv1',raw),raw);await p.reload();for(let i=0;i<250;i++){const s=await p.evaluate(()=>GoimonChapter1.snapshot());if(s.mode==='defeat')return s;if(s.feedback){await p.getByRole('button',{name:'次へ',exact:true}).click();continue;}if(s.question){const bad=s.question.choices.find(x=>x!==s.question.answer);await p.locator('#choices button').filter({hasText:bad}).first().click();continue;}if(s.combat.order[s.combat.index]==='enemy')await p.getByRole('button',{name:'防御の問題へ'}).click();else await p.locator('button.skill').first().click();}throw Error('Expected defeat');}
await loseFrom(forestSave);await p.locator('#app a.button').first().click();await p.getByRole('link',{name:'← GOIMON QUESTに戻る（もう一度挑戦）'}).click();await p.waitForFunction(()=>window.GoimonChapter1);assert.equal((await p.evaluate(()=>GoimonChapter1.snapshot())).mode,'defeat');
const mistDefeat=await loseFrom(mistSave);await p.getByRole('button',{name:'霧の戦闘直前から再挑戦'}).click();const retry=await p.evaluate(()=>GoimonChapter1.snapshot());assert.equal(retry.combat.player.hp,mistDefeat.checkpoint.hp);assert.deepEqual(retry.combat.player.skills.map(s=>s.left),mistDefeat.checkpoint.skills.map(s=>s.left));
// Expired persisted deadline is graded once on reload.
await p.evaluate(raw=>localStorage.setItem('goimon_chapter1_v1:guest:lv1',raw),forestSave);await p.reload();let before=await p.evaluate(()=>GoimonChapter1.snapshot());if(before.combat.order[before.combat.index]==='enemy')await p.getByRole('button',{name:'防御の問題へ'}).click();else await p.locator('button.skill').first().click();
await p.evaluate(()=>{const k='goimon_chapter1_v1:guest:lv1',s=JSON.parse(localStorage.getItem(k));s.question.deadline=Date.now()-1;localStorage.setItem(k,JSON.stringify(s));});await p.reload();assert.equal((await p.evaluate(()=>GoimonChapter1.snapshot())).feedback.correct,false);
// A different account cannot load the guest chapter.
await p.evaluate(()=>{localStorage.setItem('goimon_cloud_v2:active','other-account');localStorage.setItem('goimon_cloud_v2:profile:other-account',JSON.stringify({data:{},base:{},revision:0}));});await p.reload();assert.equal(await p.evaluate(()=>GoimonChapter1.snapshot()),null);assert(await p.getByRole('button',{name:'物語をはじめる',exact:true}).isVisible());assert.deepEqual(errors,[]);
console.log('PASS: defeat and exact-question learning return, mist checkpoint HP/uses, expired deadline reload, account isolation');
console.log('PASS: full 20-scene chapter, tutorial and 6 battles, victory ending, reload, archive without side effects, mobile width, existing learning/companion untouched. Steps='+steps);
}finally{await browser?.close();server.kill();}})().catch(e=>{console.error(e);process.exitCode=1;});
