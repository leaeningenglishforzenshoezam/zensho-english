const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const source=fs.readFileSync(path.join(__dirname,'../rogue_dungeon1.js'),'utf8');
const from=source.indexOf('  function heroStatuses(){');
const to=source.indexOf('  function statusButtons(',from);
assert(from>=0&&to>from,'battle status helpers must exist');

const state={block:5,buff:2,nextPlus:7,shieldPierce:3,guardPriceCut:2,growUses:0,enemies:[]};
const context=vm.createContext({state});
vm.runInContext(source.slice(from,to)+'this.heroIcons=heroStatuses;this.enemyIcons=enemyStatuses;',context);
const icons=statuses=>Array.from(statuses,x=>x.icon);

assert.deepEqual(icons(context.heroIcons()),['🛡️5','🗡️×2','🗡️+7','🎯3','🛡️−2']);
const bump={id:0,kind:'d2_bump',hp:50,shield:10,thorns:2,weak:3,canceled:true,interest:2};
state.enemies=[bump];
assert.deepEqual(icons(context.enemyIcons(bump)),['🛡️10','💥2','🗡️−3','🚫','⏳2']);

const speaker={id:1,kind:'d2_speaker',hp:42,shield:0,thorns:0,weak:0,interest:0};
state.enemies=[bump,speaker];
assert.equal(context.enemyIcons(bump).some(x=>x.icon==='🗡️+3'),true,'speaker aura appears on allies');
assert.equal(context.enemyIcons(speaker).some(x=>x.icon==='📣+3'),true,'speaker aura appears on caster');
speaker.hp=0;
assert.equal(context.enemyIcons(bump).some(x=>x.icon==='🗡️+3'),false,'aura disappears when speaker is defeated');

console.log('Battle status icons correspond to active effects and tap labels: OK');
