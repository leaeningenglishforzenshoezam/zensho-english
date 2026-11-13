// Actual chapter runtime: free draw -> equip -> visible recovery -> permanent equipment -> guide.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process');
const P=require('../battle-prototype/chapter2_progress.js'),D=require('../battle-prototype/chapter1_data.js'),T=require('../battle-prototype/tutorial.js');
(async()=>{const server=spawn(process.execPath,['preview-server.cjs'],{env:{...process.env,GOIMON_PREVIEW_PORT:'8898'}});let browser;
try{await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({headless:true,...(process.env.GOIMON_CHROMIUM_PATH?{executablePath:process.env.GOIMON_CHROMIUM_PATH}:{}),args:['--no-sandbox']});
for(const width of [390,1280]){
 const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await ctx.route('**/*',route=>{const u=new URL(route.request().url());if(u.hostname!=='localhost')return route.abort();if(u.pathname.endsWith('.mjs'))return route.fulfill({contentType:'text/javascript',body:fs.readFileSync(path.join(__dirname,'..',u.pathname),'utf8')});return route.continue();});
 const pet={id:'tutorial-test',type:'hirameki',stage:'child',stats:{chie:20,kotoba:20,onkan:20,bunmyaku:20},totalPoints:80},s={...P.fresh(D,pet,[],'none'),tutorial:T.create(),scene:5,line:5};
 await ctx.addInitScript(({s,pet})=>{if(localStorage.getItem('tutorial-test-seeded'))return;localStorage.setItem('tutorial-test-seeded','yes');localStorage.setItem('zensho_goimon_current_v4_lv1',JSON.stringify(pet));localStorage.setItem('goimon_chapter1_v1:guest:lv1',JSON.stringify(s));},{s,pet});
 await p.goto('http://localhost:8898/quest_chapter1.html');await p.getByRole('button',{name:'準備できた・戦闘へ',exact:true}).click();
 async function answer(){const q=await p.evaluate(()=>GoimonChapter1.snapshot().question);assert(q);await p.locator('#choices').getByRole('button',{name:q.answer,exact:true}).click();}
 await p.getByRole('button',{name:'通常攻撃',exact:true}).click();await answer();await p.getByRole('button',{name:'次へ',exact:true}).click();
 await p.getByRole('button',{name:'防御の問題へ',exact:true}).click();await answer();await p.getByRole('button',{name:'次へ',exact:true}).click();
 async function reveal(){await p.locator('#reveal-dialog').waitFor({state:'visible'});await p.locator('#skip-effect').click();await p.locator('#reveal-dialog').waitFor({state:'hidden'});}
 await p.getByRole('button',{name:'SKILLガチャをひく（プレゼント）',exact:true}).click();await reveal();await p.reload();await p.getByRole('button',{name:'First AidをSKILLにセット',exact:true}).click();
 let state=await p.evaluate(()=>GoimonChapter1.snapshot());const hp=state.combat.player.hp;assert(hp<state.combat.player.maxHp);
 await p.getByRole('button',{name:/First Aid.*残り/}).click();assert.equal((await p.evaluate(()=>GoimonChapter1.snapshot().question.format)),'audio_word_meaning');await answer();
 state=await p.evaluate(()=>GoimonChapter1.snapshot());assert(state.combat.player.hp>hp);assert(await p.locator('.tutorial-recovery-hp').isVisible());await p.getByRole('button',{name:'次へ',exact:true}).click();
 await p.getByRole('button',{name:'5秒の時間切れを体験',exact:true}).click();await p.getByRole('button',{name:'次へ',exact:true}).waitFor();await p.getByRole('button',{name:'次へ',exact:true}).click();
 await p.getByRole('button',{name:'防御の失敗を体験',exact:true}).click();await p.getByRole('button',{name:'練習：間違えた場合を体験',exact:true}).click();await p.getByRole('button',{name:'次へ',exact:true}).click();
 for(let i=0;i<5&&!await p.getByRole('button',{name:'装備の練習へ',exact:true}).isVisible();i++)await p.locator('#next').click();
 await p.getByRole('button',{name:'装備の練習へ',exact:true}).click();await p.getByRole('button',{name:'装備ガチャをひく（プレゼント）',exact:true}).click();await reveal();
 state=await p.evaluate(()=>GoimonChapter1.snapshot());const id=state.tutorial.item.id;assert.equal(state.tutorial.item.rarity,'N');assert(!(await p.locator('body').innerText()).includes('N限定'));
 await p.reload();await p.getByRole('button',{name:'この装備を相棒に装着',exact:true}).click();await p.locator('#tutorial-rewards-guide').waitFor({state:'visible'});
 assert((await p.locator('#tutorial-rewards-guide').innerText()).includes('デイリーミッションをクリア'));assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 const inventory=await p.evaluate(()=>GoimonItemStore.readState(GOIMONStorage,'1'));assert.equal(inventory.owned.gear[id],1);assert.equal(inventory.owned.skills.N_first_aid_gift,1);
 assert.equal((await p.evaluate(()=>GoimonChapter1.snapshot())).gear,id);await p.getByRole('button',{name:'冒険へ進む',exact:true}).click();await p.reload();assert.equal((await p.evaluate(()=>GoimonChapter1.snapshot())).tutorial.guideSeen,true);
 assert.deepEqual(errors,[]);console.log('PASS '+width+'px: draw/equip/recovery/reload/equipment persistence/guide');await ctx.close();
}
}finally{await browser?.close();server.kill();}})().catch(e=>{console.error(e);process.exitCode=1;});
