import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createOfflineDb} from './offline-db.js';
import {autoImportLegacy} from '../src/economy_import.js';
import {claimDungeonBadge} from '../src/economy_bonus.js';
import {readEconomy} from '../src/economy_repository.js';
import {BADGE_IDS} from '../../dungeon/shard-rewards.mjs';

async function setup(claims={}){
 const h=await createOfflineDb();
 const sql=await readFile(new URL('../migrations/0009_economy_legacy_imports.sql',import.meta.url),'utf8');
 for(const s of sql.match(/CREATE TABLE[\s\S]*?;/g))await h.db.prepare(s).run();
 await autoImportLegacy(h.db,'local-test',{
  version:1,assets:{version:1,shards:10,owned:{gear:{},skills:{}}},
  backup:JSON.stringify({schemaVersion:2,shop:{claims}})
 });
 return h;
}

test('every public dungeon badge can grant just five shards, never more',async()=>{
 const h=await setup();try{
  assert.equal(BADGE_IDS.length,18);
  let revision=1;
  for(const badgeId of BADGE_IDS){
   const response=await claimDungeonBadge(h.db,'local-test',{kind:'badge',badgeId,expectedRevision:revision++});
   assert.equal(response.result.shards,5);
  }
  assert.equal((await readEconomy(h.db,'local-test')).state.shards,100);
  for(const badgeId of BADGE_IDS){
   const response=await claimDungeonBadge(h.db,'local-test',{kind:'badge',badgeId,expectedRevision:1});
   assert.equal(response.replayed,true);
  }
  assert.equal((await readEconomy(h.db,'local-test')).state.shards,100);
  await assert.rejects(claimDungeonBadge(h.db,'local-test',{kind:'badge',badgeId:'forged',expectedRevision:19}),/invalid_bonus/);
  await assert.rejects(claimDungeonBadge(h.db,'local-test',{kind:'badge',badgeId:'firstWin',expectedRevision:19,amount:999}),/invalid_bonus/);
 }finally{h.close();}
});

test('concurrent claims and imported local receipts cannot grant duplicate shards',async()=>{
 const h=await setup({'dungeon:badge:firstWin':true});try{
  const p={kind:'badge',badgeId:'firstWin',expectedRevision:1};
  const first=await Promise.all([claimDungeonBadge(h.db,'local-test',p),claimDungeonBadge(h.db,'local-test',p)]);
  assert.equal(first.filter(r=>!r.replayed).length,1);
  assert.equal(first[0].result.shards,0);
  assert.equal((await readEconomy(h.db,'local-test')).state.shards,10);
  const second=await claimDungeonBadge(h.db,'local-test',{kind:'badge',badgeId:'perfectFight',expectedRevision:2});
  assert.equal(second.result.shards,5);
  assert.equal((await readEconomy(h.db,'local-test')).state.shards,15);
 }finally{h.close();}
});
