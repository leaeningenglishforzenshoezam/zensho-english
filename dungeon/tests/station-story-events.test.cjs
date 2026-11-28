const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const root=path.join(__dirname,'..');
const script=fs.readFileSync(path.join(root,'rogue_dungeon1.js'),'utf8');
const assetScript=fs.readFileSync(path.join(root,'dungeon2-assets.js'),'utf8');
const assets={window:{}};
vm.runInNewContext(assetScript,assets);
const images=assets.window.GOIMON_D2_ASSETS;
function section(from,to){const begin=script.indexOf(from),end=script.indexOf(to,begin);assert(begin>=0&&end>begin,from);return script.slice(begin,end);}
const context=vm.createContext({STATION_ART:images.backgrounds,STATION_EVENTS:images.events,STATION_BOSSES:images.bosses,JOURNAL:[]});
vm.runInContext(section('  const STATION_JOURNAL=[','  function journalUnlocked()'),context);
vm.runInContext(section('  const stationEvents={','  function drawMapEvent()'),context);
const run=code=>vm.runInContext(code,context);

test('five records continue 01–04 and reveal the conductor only after ACT 3',()=>{
  assert.deepEqual(Array.from(run('STATION_JOURNAL.map(x=>x.number)')),['05','06','07','08','09']);
  assert.equal(run('STATION_JOURNAL[1].title'),'最後の日の記念写真');
  assert.match(run('STATION_JOURNAL[1].lines.join("。")'),/満面の笑顔の老車掌/);
  assert.doesNotMatch(run('JSON.stringify(STATION_JOURNAL[1])'),/YOSHI/);
  const steps=[
    [{},0],[{attempts:1},1],[{attempts:1,act1Bosses:1},2],
    [{attempts:1,act1Bosses:1,act2Bosses:1},3],
    [{attempts:1,act1Bosses:1,act2Bosses:1,act3Bosses:1},4],
    [{attempts:1,act1Bosses:1,act2Bosses:1,act3Bosses:1,clears:1},5]
  ];
  for(const [stats,count] of steps){context.progress=stats;assert.equal(run('STATION_JOURNAL.filter(x=>x.unlocked(progress)).length'),count);}
  assert.match(script,/showStationDawnSequence\(\)/);
  assert.match(script,/showStationBossOmen\(\)/);
});

test('all eight ? events have a real image, two choices, and the agreed exclusive reward',()=>{
  const pairs={umbrella:'TomorrowClaimSlip',song:'LastVerse',postcard:'UndeliveredReply',childTicket:'SafePassage',
    timetable:'AllClear',punch:'ClosingTicketHole',seat:'Homebound',meal:'PerfectRecipe'};
  assert.deepEqual(Array.from(run('Object.keys(stationEvents)')),Object.keys(pairs));
  for(const [id,reward] of Object.entries(pairs)){
    const event=run(`stationEvents.${id}`);
    assert.equal(event.choices.length,2,id);
    const picture=path.join(root,event.image);
    assert(fs.statSync(picture).size>10_000,`${id} image missing`);
    const options=Array.from(event.choices);
    assert.equal(options.filter(o=>o.skill===reward||o.artifact===reward).length,1,id);
  }
  assert.equal(run('stationEvents.meal.choices[1].skill'),'PerfectRecipe');
  assert.match(run('stationEvents.meal.scene'),/夕暮れ/);
  assert.match(run('stationEvents.seat.scene'),/帰宅/);
  assert.match(run('stationEvents.song.scene'),/楽譜/);
});

test('five event-only skills, three event-only artifacts, and D1-safe reward handling',()=>{
  const skillChunk=section('  const skills = {','  const COMMON_SKILLS=');
  const ctx=vm.createContext({});vm.runInContext(skillChunk,ctx);
  for(const key of ['LastVerse','SafePassage','AllClear','Homebound','PerfectRecipe']){
    assert.equal(vm.runInContext(`skills.${key}.eventOnly`,ctx),true,key);
    assert.equal(vm.runInContext(`skills.${key}.ap`,ctx),1,key);
  }
  const artifactChunk=section('  const artifacts = {','  const enemySets = [');
  const artCtx=vm.createContext({Math});vm.runInContext(artifactChunk,artCtx);
  for(const key of ['TomorrowClaimSlip','UndeliveredReply','ClosingTicketHole']){
    assert.equal(vm.runInContext(`artifacts.${key}.eventOnly`,artCtx),true,key);
  }
  assert.match(script,/if\(state\.dungeon===2&&stationEvents\[event\]\)/);
  assert.match(script,/if\(state\.dungeon===2\)recordRun\('boss'\+state\.act\)/);
  assert.match(script,/if\(hasArtifact\('UndeliveredReply'\)/);
  assert.match(script,/if\(state\.turn===2&&hasArtifact\('TomorrowClaimSlip'\)\)/);
  assert.match(script,/hasArtifact\('ClosingTicketHole'\)/);
});

console.log('Dungeon 2 story, events, and exclusive rewards: OK');
