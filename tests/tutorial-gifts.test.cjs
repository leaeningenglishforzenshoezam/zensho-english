const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const C=require('../battle-prototype/catalog.js'),E=require('../battle-prototype/core.js');
function fixture(){
 const m=new Map(),storage={getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)},profile={account:'guest',isWriter:()=>true};
 let active=null,tail=Promise.resolve();const locks={request:(name,options,fn)=>{const f=typeof options==='function'?options:()=>fn({});const next=tail.then(f);tail=next.catch(()=>{});return next;}};
 const c={GOIMONStorage:storage,GOIMONProfiles:profile,GoimonBattleCatalog:C,localStorage:{getItem:()=>active},navigator:{locks},console};c.window=c;vm.createContext(c);
 for(const f of ['goimon-items/store.js','goimon-items/shop.js','battle-prototype/tutorial-gifts.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
 return {c,m,storage,switch:()=>active='other'};
}
test('the free equipment draw persists one N present, never spends shards, and replays after reload',async()=>{
 const f=fixture();await f.c.GoimonShop.welcome('1');const before=f.c.GoimonShop.read().shop.stars;
 const [a,b]=await Promise.all([f.c.GoimonTutorialGifts.receive('gear',C),f.c.GoimonTutorialGifts.receive('gear',C)]);
 assert.equal(a.rarity,'N');assert.equal(b.id,a.id);assert.equal(f.c.GoimonShop.read().owned.gear[a.id],1);assert.equal(f.c.GoimonShop.read().shop.stars,before);
 vm.runInContext(fs.readFileSync('goimon-items/shop.js','utf8'),f.c);assert.equal((await f.c.GoimonShop.claimTutorialGear()).id,a.id);assert.equal(f.c.GoimonShop.read().owned.gear[a.id],1);
});
test('First Aid is a real retained skill and a pre-owned First Aid is never duplicated',async()=>{
 const f=fixture();for(let i=0;i<3;i++){const s=await f.c.GoimonTutorialGifts.receive('skills',C);assert.equal(s.id,'N_first_aid_gift');}
 assert.equal(f.c.GoimonShop.read().owned.skills.N_first_aid_gift,1);assert.equal(f.c.GoimonShop.read().shop.stars,0);
});
test('failed inventory save does not keep a receipt, and another account cannot claim',async()=>{
 const f=fixture(),write=f.storage.setItem;f.storage.setItem=()=>{throw Error('quota')};await assert.rejects(f.c.GoimonShop.claimTutorialGear(),/quota/);assert.equal(f.m.size,0);f.storage.setItem=write;await f.c.GoimonShop.claimTutorialGear();const saved=JSON.stringify([...f.m]);f.switch();await assert.rejects(f.c.GoimonShop.claimTutorialGear(),/アカウント/);assert.equal(JSON.stringify([...f.m]),saved);
});
test('preview gifts do not change real inventory; legacy lesson recovery creates visible HP gain on either result',async()=>{
 const f=fixture();f.c.GoimonDeveloper={active:true};const before=JSON.stringify([...f.m]);await f.c.GoimonTutorialGifts.receive('gear',C);await f.c.GoimonTutorialGifts.receive('skills',C);assert.equal(JSON.stringify([...f.m]),before);
 for(const ok of [true,false]){const player=E.actor(C.species[0],1,{chie:0,kotoba:0,onkan:0,bunmyaku:0},null,[]),enemy={...player,hp:999,maxHp:999,speed:0},state={tutorial:{skillReceived:true},combat:E.create(player,enemy)};
 f.c.GoimonTutorialGifts.equipRecovery(state,C);assert(player.hp<player.maxHp);assert.equal(player.skills[0].id,'N_first_aid_gift');const reduced=player.hp;E.resolve(state.combat,'skill:0',ok);assert(player.hp>reduced);assert.equal(player.skills[0].left,1);}
});
test('new tutorials are enabled for device saves, and server wallets wait for the advertised API capability',()=>{
 const source=fs.readFileSync('battle-prototype/chapter1.js','utf8'),fn=source.match(/function permanentTutorialGifts\(\)\{[^\n]+\}/)[0];
 for(const [server,capability,expected]of [[false,false,true],[true,false,false],[true,true,true]]){const c={GOIMONStorage:{getItem:()=>server?'server':null},GOIMON_CLOUD_CONFIG:{tutorialGiftsEnabled:capability}};c.window=c;vm.createContext(c);vm.runInContext(fn,c);assert.equal(c.permanentTutorialGifts(),expected);}
});
