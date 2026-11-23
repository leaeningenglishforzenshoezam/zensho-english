const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm');
const fs=require('node:fs'),path=require('node:path');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');

function browser(account=null){
 const data=new Map(),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};
 const catalog={gear:[{id:'none'}],skills:[{id:'none'},{id:'skillA',name:'Test',rarity:'N'}]};
 let events=0;
 const root={GOIMONStorage:storage,GoimonBattleCatalog:catalog,GOIMONProfiles:{account,currentAccount:()=>account,isWriter:()=>!!account},
  navigator:{locks:{request:async(_key,fn)=>fn({})}},dispatchEvent:()=>events++};
 const predictableMath=Object.create(Math);predictableMath.random=()=>0.4;
 const context=vm.createContext({window:root,GoimonBattleCatalog:catalog,GOIMONProfiles:root.GOIMONProfiles,GOIMONStorage:storage,navigator:root.navigator,localStorage:storage,Math:predictableMath});
 vm.runInContext(read('goimon-items/store.js'),context);
 context.GoimonItemStore=root.GoimonItemStore;
 vm.runInContext(read('goimon-items/shop.js'),context);
 return {root,storage,events:()=>events};
}

test('older dungeon badge shards join the daily mission and gacha wallet exactly once',async()=>{
 const {root,events}=browser(),{claimEarnedBadges,BADGE_IDS}=await import('../dungeon/shard-rewards.mjs');
 assert.equal(BADGE_IDS.length,18);
 assert.equal(await claimEarnedBadges(root,['firstWin','correct20','firstWin','forged']),10);
 assert.equal(root.GoimonShop.read('1').shop.stars,10);
 assert.equal(root.GoimonShop.read('2').shop.stars,10);
 assert.equal(await claimEarnedBadges(root,['firstWin','correct20']),0);
 assert.equal(await claimEarnedBadges(root,['firstWin','correct20','perfectFight']),5);
 assert.equal(root.GoimonShop.read('1').shop.stars,15);
 assert.equal((await root.GoimonShop.draw('1','skills',1))[0].id,'skillA');
 assert.equal(root.GoimonShop.read('2').shop.stars,5);
 assert.equal(events(),2);
});

test('migration in progress does not silently award to the wrong wallet',async()=>{
 const {root,storage}=browser(),{claimEarnedBadges}=await import('../dungeon/shard-rewards.mjs');
 storage.setItem('goimon_economy_mode_v1',JSON.stringify({status:'server',account:'other'}));
 await assert.rejects(claimEarnedBadges(root,['firstWin']),/サーバーのウォレット/);
 assert.equal(root.GoimonItemStore.readShared(storage).state.shop.stars,0);
});

test('logged-in accounts credit the server wallet and cache successful badge receipts',async()=>{
 const account='member1',{root,storage}=browser(account),{claimEarnedBadges}=await import('../dungeon/shard-rewards.mjs');
 let revision=1,shards=30,claims=0,profile={revision:0,data:{},base:{}};
 root.GoimonReleaseReady=Promise.resolve(true);
 root.GOIMON_CLOUD_CONFIG={economyServerEnabled:true,apiBase:'https://api.test'};
 root.GOIMONCloudSchema={validate:()=>{}};
 root.GOIMONProfiles={...root.GOIMONProfiles,read:()=>profile,write:(_owner,next)=>{profile=next;},cloudData:()=>({})};
 root.sessionStorage={getItem:()=>JSON.stringify({userId:account,apiBase:'https://api.test',expiresAt:Math.floor(Date.now()/1000)+3600,token:'gs1_'+''.padStart(64,'a')})};
 root.fetch=async(url,options)=>{
  const action=new URL(url).pathname,body=options.body?JSON.parse(options.body):null;
  let result,status=200;
  if(action==='/api/v1/save')result={userId:account,revision:0};
  else if(action==='/api/v1/economy')result={revision,state:{version:1,shards,owned:{gear:{},skills:{}}}};
  else if(action==='/api/v1/economy/bonus/claim'){
   if(body.expectedRevision!==revision){status=409;result={error:'economy_revision_conflict'};}
   else{revision++;shards+=5;claims++;result={replayed:false,revision,result:{shards:5}};}
  }else throw Error('unexpected route '+action);
  return new Response(JSON.stringify(result),{status,headers:{'Content-Type':'application/json'}});
 };
 assert.equal(await claimEarnedBadges(root,['firstWin','correct20']),10);
 assert.equal(shards,40);
 assert.equal(claims,2);
 assert.equal(root.GoimonItemStore.readShared(storage).state.shop.stars,0);
 assert.equal(await claimEarnedBadges(root,['firstWin','correct20']),0);
 assert.equal(claims,2);
 assert.deepEqual(JSON.parse(storage.getItem('goimon_dungeon_badge_awards_v1')),['firstWin','correct20']);
});
