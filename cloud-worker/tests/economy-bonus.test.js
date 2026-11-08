import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {createOfflineDb} from './offline-db.js';import {autoImportLegacy} from '../src/economy_import.js';import {claimBonus,readBonusStatus} from '../src/economy_bonus.js';import {readEconomy} from '../src/economy_repository.js';
import release from '../src/mission_release.js';import {createSession} from '../src/session.js';
const now=Date.parse('2026-11-01T23:59:59+09:00');
async function setup(claims={}){const h=await createOfflineDb();const sql=await readFile(new URL('../migrations/0009_economy_legacy_imports.sql',import.meta.url),'utf8');for(const s of sql.match(/CREATE TABLE[\s\S]*?;/g))await h.db.prepare(s).run();await autoImportLegacy(h.db,'local-test',{version:1,assets:{version:1,shards:30,owned:{gear:{},skills:{}}},backup:JSON.stringify({schemaVersion:2,shop:{claims}})});return h;}
test('bonuses: welcome 10 once, login 1 per JST day, races and late retry do not duplicate',async()=>{
 const h=await setup();try{
  const p={kind:'welcome',date:'2026-11-01',expectedRevision:1};
  const rs=await Promise.all([claimBonus(h.db,'local-test',p,now),claimBonus(h.db,'local-test',p,now)]);assert.equal(rs.filter(r=>!r.replayed).length,1);assert.equal((await readEconomy(h.db,'local-test')).state.shards,40);
  const login={kind:'login',date:p.date,expectedRevision:2};await claimBonus(h.db,'local-test',login,now);
  assert.equal((await claimBonus(h.db,'local-test',login,now+2000)).replayed,true);
  assert.deepEqual(await readBonusStatus(h.db,'local-test',now),{date:p.date,welcome:true,login:true});
  assert.equal((await readBonusStatus(h.db,'local-test',now+2000)).login,false);
  await claimBonus(h.db,'local-test',{...login,date:'2026-11-02',expectedRevision:3},now+2000);
  assert.equal((await readEconomy(h.db,'local-test')).state.shards,42);
  await assert.rejects(claimBonus(h.db,'local-test',{...login,date:'2026-11-03',expectedRevision:4},now+2000),/day_changed/);
 }finally{h.close();}
});
test('legacy bonus claims suppress grants; missing migration and damaged records fail closed',async()=>{
 const h=await setup({welcome:true,'login:2026-11-01':true});try{
  for(const [kind,expectedRevision]of [['welcome',1],['login',2]])assert.equal((await claimBonus(h.db,'local-test',{kind,date:'2026-11-01',expectedRevision},now)).result.shards,0);
  assert.equal((await readEconomy(h.db,'local-test')).state.shards,30);
  await assert.rejects(claimBonus(h.db,'other',{kind:'welcome',date:'2026-11-01',expectedRevision:0},now),/migration_required/);
 }finally{h.close();}
 const broken=await setup(null);try{await assert.rejects(claimBonus(broken.db,'local-test',{kind:'welcome',date:'2026-11-01',expectedRevision:1},now),/legacy_claims_invalid/);assert.equal((await readEconomy(broken.db,'local-test')).state.shards,30);}finally{broken.close();}
});
test('bonus endpoint requires explicit gate, origin, session, and rejects client grant amounts',async()=>{
 const h=await setup();try{
  const session=await createSession(h.db,'local-test'),limiter={limit:async()=>({success:true})};
  const env={DB:h.db,ALLOWED_ORIGIN:'https://page.test',MISSION_RELEASE_ENABLED:'true',ECONOMY_BONUS_ENABLED:'true',RATE_LIMITER:limiter,AUTH_RATE_LIMITER:limiter};
  const call=(body,overrides={},headers={})=>release.fetch(new Request('https://api.test/api/v1/economy/bonus'+(body?'/claim':''),{method:body?'POST':'GET',headers:{Origin:env.ALLOWED_ORIGIN,Authorization:'Bearer '+session.token,'Content-Type':'application/json',...headers},...(body?{body:JSON.stringify(body)}:{})}),{...env,...overrides});
  assert.equal((await call(null,{ECONOMY_BONUS_ENABLED:'false'})).status,404);assert.equal((await call(null,{}, {Authorization:''})).status,401);assert.equal((await call(null,{}, {Origin:'https://bad.test'})).status,403);
  const status=await(await call()).json();assert.equal(typeof status.date,'string');
  assert.equal((await call({kind:'welcome',date:status.date,expectedRevision:1,shards:999})).status,400);
  assert.equal((await call({kind:'welcome',date:status.date,expectedRevision:1})).status,200);
 }finally{h.close();}
});
