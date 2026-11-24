/* Browser smoke test: real dungeon battle DOM, with only the private encounter seeded. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {spawn}=require('node:child_process');
const {chromium}=require('playwright');

(async()=>{
  const root=path.resolve(__dirname,'../..');
  const server=spawn(process.execPath,['preview-server.cjs'],{cwd:root,env:{...process.env,GOIMON_PREVIEW_PORT:'8898'}});
  let browser;
  try{
    await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);});
    const localChromium=fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined;
    browser=await chromium.launch({headless:true,...(process.env.GOIMON_CHROMIUM_PATH||localChromium?{executablePath:process.env.GOIMON_CHROMIUM_PATH||localChromium}:{}),args:['--no-sandbox']});
    const page=await browser.newPage({viewport:{width:1280,height:800}});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.addInitScript(()=>{
      localStorage.setItem('goimon_dungeon_records_v1',JSON.stringify({1:{clears:2}}));
      localStorage.setItem('goimon_dungeon_departure_v1',JSON.stringify({dungeon:2}));
    });
    await page.route('**/dungeon/owned-companions.js',route=>route.fulfill({status:200,contentType:'application/javascript',body:"window.readDungeonCompanions=()=>[{id:'test',name:'テスト相棒',type:'nagomi',form:'成長体',image:'images/goimon/nagomi_growth.png',sigil:'✧'}];"}));
    await page.route('**/dungeon/rogue_dungeon1.js',async route=>{
      const source=fs.readFileSync(path.join(root,'dungeon/rogue_dungeon1.js'),'utf8');
      const instrumented=source.replace('  function startBattle(retry=false)',
        '  window.__d2test={state,stationMonsters,stationElites,stationBossMonsters,startBattle,baseIntent,intent};\n  function startBattle(retry=false)');
      await route.fulfill({status:200,contentType:'application/javascript',body:instrumented});
    });
    await page.goto('http://localhost:8898/dungeon/index.html');
    await page.waitForFunction(()=>Boolean(window.__d2test));
    for(const kind of ['stationMonsters','stationElites']){
      const names=await page.evaluate(kind=>{
        const t=window.__d2test;
        const roster=t[kind];
        t.state.dungeon=2;
        t.state.currentEncounter={nodeType:'battle',wordRange:[0,30],enemies:[roster[0]]};
        t.state.act=1;t.state.stage=2;t.state.actFight=0;
        t.startBattle();
        return [...document.querySelectorAll('.enemy-title')].map(e=>e.textContent);
      },kind);
      assert.deepEqual(names,[kind==='stationMonsters'?'改札ノッペラ':'泥酔サラリーマン']);
      assert.equal(await page.locator('#battle').isVisible(),true);
      assert.ok((await page.locator('#battleDungeonName').textContent()).includes('帰らずの終着駅'));
      assert.ok((await page.locator('.enemy-values').first().textContent()).includes(kind==='stationMonsters'?'50 / 50':'110 / 110'));
      assert.equal(await page.locator('.enemy-intent .intent-action').count(),1);
      const companion=page.locator('#battleCompanionImage');
      await companion.evaluate(img=>img.decode());
      assert.equal(await companion.isVisible(),true,'GOIMON companion appears alongside the enemy');
      const portrait=page.locator('.enemy-art-image');
      assert.equal(await portrait.count(),1,'dedicated Dungeon 2 image is displayed');
      await portrait.evaluate(img=>img.decode());
      assert.equal(await portrait.evaluate(img=>img.complete&&img.naturalWidth===1254),true,'sprite loads at 1254px');
      await page.locator('#battleFx.show').waitFor({state:'hidden'});
      const screenDir=process.env.GOIMON_D2_SCREENSHOT_DIR;
      if(screenDir){fs.mkdirSync(screenDir,{recursive:true});await page.screenshot({path:path.join(screenDir,kind==='stationMonsters'?'normal-battle.png':'elite-battle.png'),fullPage:true});}
      await page.click('#endTurnBtn');
      const state=await page.evaluate(()=>({hp:window.__d2test.state.hp,shield:window.__d2test.state.enemies[0].shield}));
      if(kind==='stationMonsters')assert.equal(state.shield,8,'改札ノッペラ blocks on the first turn');
      else assert.equal(state.hp,80,'泥酔サラリーマン opens with two 5-damage hits');
    }
    // Each station ACT must render its own boss, distinct portrait, dialogue and intent.
    const bossNames=['LOST & FOUND NAKAJIMA','冷酷検札官REI','忘却車掌YOSHI'];
    for(const act of [1,2,3]){
      const name=await page.evaluate(act=>{
        const t=window.__d2test;
        t.state.dungeon=2;
        t.state.act=act;
        t.state.stage=8;
        t.state.currentEncounter={nodeType:'boss',wordRange:[0,30],enemies:[t.stationBossMonsters[act]]};
        t.startBattle();
        return document.querySelector('.enemy-title')?.textContent;
      },act);
      assert.equal(name,bossNames[act-1]);
      assert.equal(await page.locator('#battle').isVisible(),true);
      assert.equal(await page.locator('#bossSpeech').isVisible(),true,'boss opening line is visible');
      assert.equal(await page.locator('.enemy-portrait svg.enemy-sprite').count(),1,'boss has a distinct temporary portrait');
      assert.equal(await page.locator('.enemy-intent .intent-action').count(),1);
      await page.locator('#battleFx.show').waitFor({state:'hidden'});
      const screenDir=process.env.GOIMON_D2_SCREENSHOT_DIR;
      if(screenDir){fs.mkdirSync(screenDir,{recursive:true});await page.screenshot({path:path.join(screenDir,`boss-act${act}.png`),fullPage:true});}
      await page.click('#endTurnBtn');
      const turn=await page.evaluate(()=>window.__d2test.state.turn);
      assert.equal(turn,2,`${bossNames[act-1]} executes its opening action`);
    }
    assert.deepEqual(errors,[]);
    console.log('Dungeon 2 browser battle: 14 enemies and all 3 ACT bosses rendered without errors');
  }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
