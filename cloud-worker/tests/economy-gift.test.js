import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createOfflineDb} from './offline-db.js';
import {autoImportLegacy} from '../src/economy_import.js';
import {readEconomy} from '../src/economy_repository.js';
import {claimFirstAidGift,readGiftStatus} from '../src/economy_gift.js';
import release from '../src/mission_release.js';
import {createSession} from '../src/session.js';

async function setup(){
 const h=await createOfflineDb();
 const sql=await readFile(new URL('../migrations/0009_economy_legacy_imports.sql',import.meta.url),'utf8');
 for(const s of sql.match(/CREATE TABLE[\s\S]*?;/g))await h.db.prepare(s).run();
 await autoImportLegacy(h.db,'local-test',{
  version:1,
  assets:{version:1,shards:42,owned:{gear:{},skills:{}}},
  backup:JSON.stringify({schemaVersion:2,shop:{claims:{}}})
 });
 return h;
}

test('gift: a migrated user receives one First Aid without losing shards; retry is idempotent',async()=>{
 const h=await setup();
 try{
  assert.deepEqual(await readGiftStatus(h.db,'local-test'),{claimed:false});
  const before=await readEconomy(h.db,'local-test');
  const payload={expectedRevision:before.revision};
  const [a,b]=await Promise.all([claimFirstAidGift(h.db,'local-test',payload),claimFirstAidGift(h.db,'local-test',payload)]);
  assert.equal([a,b].filter(x=>!x.replayed).length,1);
  assert.equal((await readEconomy(h.db,'local-test')).state.owned.skills.N_first_aid_gift,1);
  assert.equal((await readEconomy(h.db,'local-test')).state.shards,42);
  assert.deepEqual(await readGiftStatus(h.db,'local-test'),{claimed:true});
  const retry=await claimFirstAidGift(h.db,'local-test',payload);
  assert.equal(retry.replayed,true);
  assert.equal((await readEconomy(h.db,'local-test')).state.owned.skills.N_first_aid_gift,1);
 }finally{h.close();}
});

test('gift: account migration and exact payload are mandatory',async()=>{
 const h=await setup();
 try{
  await assert.rejects(claimFirstAidGift(h.db,'unmigrated',{expectedRevision:0}),/wallet_migration_required/);
  await assert.rejects(claimFirstAidGift(h.db,'local-test',{expectedRevision:1,amount:100}),/invalid_gift/);
  assert.equal((await readEconomy(h.db,'local-test')).state.owned.skills.N_first_aid_gift||0,0);
 }finally{h.close();}
});

test('gift: GET and POST require gate, correct Origin and signed session',async()=>{
 const h=await setup();
 try{
  const session=await createSession(h.db,'local-test');
  const limiter={limit:async()=>({success:true})};
  const env={DB:h.db,ALLOWED_ORIGIN:'https://leaeningenglishforzenshoezam.github.io',
   MISSION_RELEASE_ENABLED:'true',ECONOMY_GIFT_ENABLED:'true',
   RATE_LIMITER:limiter,AUTH_RATE_LIMITER:limiter};
  const request=(claim=false,headers={},payload={expectedRevision:1})=>release.fetch(
   new Request('https://api.test/api/v1/economy/gift'+(claim?'/claim':''),{
    method:claim?'POST':'GET',
    headers:{Origin:env.ALLOWED_ORIGIN,Authorization:'Bearer '+session.token,'Content-Type':'application/json',...headers},
    ...(claim?{body:JSON.stringify(payload)}:{})
   }),env);
  const off=await release.fetch(new Request('https://api.test/api/v1/economy/gift',{headers:{
   Origin:env.ALLOWED_ORIGIN,Authorization:'Bearer '+session.token
  }}),{...env,ECONOMY_GIFT_ENABLED:'false'});
  assert.equal(off.status,404);
  assert.equal((await request(false,{Origin:'https://another.example'})).status,403);
  assert.equal((await request(false,{Authorization:''})).status,401);
  assert.equal((await request()).status,200);
  assert.equal((await request(true,{}, {expectedRevision:1,skillId:'N_other'})).status,400);
  const answer=await request(true);
  assert.equal(answer.status,200);
  assert.equal((await answer.json()).result.skillId,'N_first_aid_gift');
  assert.deepEqual(await (await request()).json(),{claimed:true});
 }finally{h.close();}
});
