const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const C=require('../battle-prototype/catalog.js');
function setup(){
 const values=new Map(),writes=[],storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>{writes.push(k);values.set(k,v);}};
 let tail=Promise.resolve();const locks={request:(name,options,fn)=>{const job=typeof options==='function'?options:()=>fn({});const p=tail.then(job);tail=p.catch(()=>{});return p;}};
 const profiles={account:'account',isWriter:()=>true};
 const root={GoimonBattleCatalog:C,GOIMONStorage:storage,GOIMONProfiles:profiles,localStorage:{getItem:()=> 'account'},navigator:{locks},GoimonDailyMissions:{getStatus:()=>({date:'2026-11-01',missions:[{slot:'words',available:true,completed:true,rewardStars:3}]})}};
 root.window=root;vm.createContext(root);for(const name of ['store','shop'])vm.runInContext(fs.readFileSync(__dirname+'/../goimon-items/'+name+'.js','utf8'),root);
 const S=root.GoimonItemStore;
 function seed(level,stars,count){const s=S.empty(level);s.owned.gear.N_hp=count;s.shop={stars,claims:{welcome:true,'mission:2026-11-01:words':true},history:[]};values.set(S.keyFor(level),JSON.stringify(s));values.set('zensho_goimon_current_v4_lv'+level,JSON.stringify({id:'pet'+level}));return values.get(S.keyFor(level));}
 return {values,writes,storage,root,S,seed,store:n=>S.create({storage,profiles,activeAccount:()=> 'account',level:()=>n,locks})};
}
test('migration sums both grades once, keeps exact originals, and shares spending',async()=>{
 const f=setup(),a=f.seed('1',30,1),b=f.seed('2',20,2),shop=f.root.GoimonShop;
 assert.equal(shop.read('1').shop.stars,50);assert.equal(shop.read('2').owned.gear.N_hp,3);assert.equal(f.writes.length,0);
 assert.equal(await shop.welcome('2'),0); // commits the common wallet, no duplicate gift
 const common=JSON.parse(f.values.get(f.S.sharedKey));assert.equal(common.legacy['1'],a);assert.equal(common.legacy['2'],b);
 assert.equal(await shop.claimMissions('1'),0);assert.equal(await shop.claimMissions('2'),0);
 await shop.draw('2','skills',3);assert.equal(shop.read('1').shop.stars,20);assert.equal(shop.read('2').shop.stars,20);
 assert.equal(Object.values(shop.read('1').owned.skills).reduce((x,y)=>x+y,0),3);
 assert.equal(f.values.get(f.S.keyFor('1')),a);assert.equal(f.values.get(f.S.keyFor('2')),b);
});
test('loadouts stay grade-specific and one shared copy cannot be equipped twice across grades',async()=>{
 const f=setup();f.seed('1',0,1);f.seed('2',0,0);const a=f.store('1'),b=f.store('2'),none=[null,null,null,null];
 await a.save(a.read(),'pet1','N_hp',none);
 await assert.rejects(b.save(b.read(),'pet2','N_hp',none),/所持数/);
 await a.save(a.read(),'pet1',null,none);await b.save(b.read(),'pet2','N_hp',none);
 assert.equal(a.read().state.loadouts.pet1.gearId,null);assert.equal(b.read().state.loadouts.pet2.gearId,'N_hp');assert.equal(a.read().state.loadouts.pet2,undefined);
});
test('concurrent grade draws share one lock and cannot overspend',async()=>{
 const f=setup();f.seed('1',10,0);f.seed('2',0,0);
 const r=await Promise.allSettled([f.root.GoimonShop.draw('1','gear',1),f.root.GoimonShop.draw('2','gear',1)]);
 assert.equal(r.filter(x=>x.status==='fulfilled').length,1);assert.equal(f.root.GoimonShop.read('1').shop.stars,0);
});
test('quota failures, overflow, corrupt data and post-migration legacy edits never reset records',async()=>{
 const f=setup(),a=f.seed('1',10,1);f.seed('2',0,0);f.storage.setItem=()=>{throw Error('quota');};
 await assert.rejects(f.root.GoimonShop.draw('1','gear',1),/quota/);assert.equal(f.values.has(f.S.sharedKey),false);assert.equal(f.values.get(f.S.keyFor('1')),a);
 const g=setup();g.seed('1',0,9999);g.seed('2',0,1);assert.throws(()=>g.S.readShared(g.storage),/所持数/);assert.equal(g.writes.length,0);
 const h=setup();h.seed('1',10,0);h.seed('2',0,0);await h.root.GoimonShop.welcome('1');const saved=h.values.get(h.S.sharedKey);
 h.values.set(h.S.keyFor('2'),'broken');assert.throws(()=>h.root.GoimonShop.read('1'),/旧画面/);assert.equal(h.values.get(h.S.sharedKey),saved);
});
