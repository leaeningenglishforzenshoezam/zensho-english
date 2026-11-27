const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root=path.join(__dirname,'..');
const manifest=fs.readFileSync(path.join(root,'dungeon2-assets.js'),'utf8');
const context={window:{}};
vm.runInNewContext(manifest,context);
const {backgrounds,bosses,events}=context.window.GOIMON_D2_ASSETS;
assert.equal(Object.keys(backgrounds).length,8);
assert.equal(Object.keys(bosses).length,3);
assert.equal(Object.keys(events).length,10);
for(const asset of [
  ...Object.values(backgrounds),
  ...Object.values(bosses).flatMap(b=>[b.battle,b.human]),
  ...Object.values(events)
]){
  const file=path.join(root,asset);
  assert.ok(fs.existsSync(file),`Missing D2 illustration: ${asset}`);
  assert.ok(fs.statSync(file).size>5_000,`Empty D2 illustration: ${asset}`);
}
const game=fs.readFileSync(path.join(root,'rogue_dungeon1.js'),'utf8');
const enemies=fs.readFileSync(path.join(root,'enemy-art.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.match(html,/src="dungeon2-assets\.js"/);
assert.ok(html.indexOf('dungeon2-assets.js')<html.indexOf('enemy-art.js'));
assert.match(game,/battleArt:\[STATION_ART\.act1,STATION_ART\.act2,STATION_ART\.act3\]/);
assert.match(game,/departureArt:STATION_ART\.concourse/);
for(const boss of ['nakajima.png','rei.png','yoshi-angry.png']){
  assert.ok(enemies.includes('images/bosses/'+boss),`Battle mapping missing ${boss}`);
}
console.log('Dungeon 2: 8 backgrounds, 6 transparent bosses and 10 event scenes OK');
