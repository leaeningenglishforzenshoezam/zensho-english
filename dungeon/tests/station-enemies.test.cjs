const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const source=fs.readFileSync(path.join(__dirname,'../rogue_dungeon1.js'),'utf8');
const segment=(start,end)=>source.slice(source.indexOf(start),source.indexOf(end,source.indexOf(start)));
const setup=segment('  const normalMonsters=[','  const state =');
const context={};
vm.runInNewContext(`${setup}\nthis.d1Normals=normalMonsters;this.d1Elites=eliteMonsters;this.d2Normals=stationMonsters;this.d2Elites=stationElites;this.forbidden=stationForbiddenPairs;`,context);

assert.equal(context.d1Normals.length,11,'Dungeon 1 normal roster is unchanged');
assert.equal(context.d1Elites.length,6,'Dungeon 1 elite roster is unchanged');
assert.equal(context.d2Normals.length,8);
assert.equal(context.d2Elites.length,6);
assert.deepEqual(Array.from(context.d2Normals,e=>e.hp),[50,48,36,52,52,60,42,56]);
assert.deepEqual(Array.from(context.d2Elites,e=>e.hp),[110,116,126,108,122,118]);
assert.equal(new Set([...context.d2Normals,...context.d2Elites].map(e=>e.name)).size,14);
assert.ok(context.forbidden.has('忘れ物競売師|納品バコ'));
const art=fs.readFileSync(path.join(__dirname,'../enemy-art.js'),'utf8');
const assetRoot=path.resolve(__dirname,'../images/enemies');
for(const monster of [...context.d2Normals,...context.d2Elites]){
  const escaped=monster.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const match=art.match(new RegExp(`'${escaped}':'images/enemies/([^']+)'`));
  assert.ok(match,`${monster.name} has an image mapping`);
  const png=fs.readFileSync(path.join(assetRoot,match[1]));
  assert.equal(png.toString('ascii',1,4),'PNG',`${monster.name} is PNG`);
  assert.equal(png.readUInt32BE(16),1254,`${monster.name} has correct width`);
  assert.equal(png.readUInt32BE(20),1254,`${monster.name} has correct height`);
  assert.equal(png[25],6,`${monster.name} has an RGBA transparency channel`);
}

const route=segment('  function chooseRoute(lane)','  function startAct()');
assert.match(route,/if\(state\.dungeon===2\)/);
assert.match(route,/stationMonsters\.filter/);
assert.match(route,/elite\.kind==='d2_auction'/);
assert.match(route,/state\.act===1\?\.45:state\.act===2\?\.60:\.70/);
assert.match(route,/state\.act===2\?\.25:\.40/);
assert.ok(route.indexOf('startBattle();\n      return;')<route.indexOf('// Teach single-target tactics'));
assert.match(route,/const returnVisit=state\.dungeon===1/);

const ai=segment('  function baseIntent(e,turn=state.turn)','  function alive()');
for(const monster of [...context.d2Normals,...context.d2Elites]){
  assert.ok(ai.includes(`e.kind==='${monster.kind}'`),`${monster.name} has a dedicated move set`);
}
assert.match(source,/if\(it\.multiHit\)/);
assert.match(source,/if\(it\.interest\)/);
assert.match(source,/if\(it\.thorns\)/);
assert.match(source,/if\(it\.allyBoost\)/);
assert.match(source,/if\(e\.hp>0&&e\.thorns\)/);
const aiContext={state:{turn:1,turnUsedNames:[],block:0,enemies:[]},random:choices=>choices[0]};
vm.runInNewContext(`${ai}\nthis.move=baseIntent;`,aiContext);
const enemy=(kind,attack,hp=90)=>({kind,attack,hp,maxHp:hp,id:0});
const move=(e,turn)=>{aiContext.state.turn=turn;aiContext.state.enemies=[e];return aiContext.move(e,turn);};
assert.equal(move(enemy('d2_gate',7),1).shield,8);
assert.equal(move(enemy('d2_gate',7),3).attack,8);
assert.equal(move(enemy('d2_slip',5),1).multiHit.length,2);
assert.equal(move(enemy('d2_clock',8),3).attack,18);
const interest=enemy('d2_interest',8);interest.interest=3;
assert.equal(move(interest,2).attack,14);
const guillotine=enemy('d2_guillotine',10);
assert.equal(move(guillotine,3).pierceBlock,5);
const auction=enemy('d2_auction',8);
assert.equal(move(auction,1).allyBoost,2);
assert.equal(move(enemy('d2_bump',10),1).thorns,2);
const drunk=enemy('d2_drunk',9);
assert.equal(move(drunk,1).multiHit.length,2);
const telegraphed=move(drunk,2);
assert.deepEqual(move(drunk,2),telegraphed,'random move stays stable throughout a turn');
console.log('Dungeon 2 station monsters, elite formations and AI hooks: OK');
