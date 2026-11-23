import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {createOfflineDb} from './offline-db.js';import {autoImportLegacy} from '../src/economy_import.js';import {claimBonus,readBonusStatus} from '../src/economy_bonus.js';import {readEconomy} from '../src/economy_repository.js';
const now=Date.parse('2026-11-01T23:59:59+09:00');
async function setup(claims={}){const h=await createOfflineDb();const sql=await readFile(new URL('../migrations/0009_economy_legacy_imports.sql',import.meta.url),'utf8');for(const s of sql.match(/CREATE TABLE[\s\S]*?;/g))await h.db.prepare(s).run();await autoImportLegacy(h.db,'local-test',{version:1,assets:{version:1,shards:30,owned:{gear:{},skills:{}}},backup:JSON.stringify({schemaVersion:2,shop:{claims}})});return h;}
test('dungeon reward requires a defeat after a victory and pays two shards once per day',async()=>{
 const h=await setup();try{
  const report={kind:'dungeon',date:'2026-11-01',expectedRevision:1,wins:1,outcome:'defeat'};
  for(const invalid of [{wins:0},{outcome:'clear'},{outcome:'abandon'}]){
   await assert.rejects(claimBonus(h.db,'local-test',{...report,...invalid},now),/invalid_bonus/);
  }
  const results=await Promise.all([1,2].map(()=>claimBonus(h.db,'local-test',report,now)));
  assert.equal(results.filter(r=>!r.replayed).length,1);
  assert.equal((await readEconomy(h.db,'local-test')).state.shards,32);
 }finally{h.close();}
});

import vm from 'node:vm';
test('only a defeat with wins from the active account records daily completion',async()=>{
 const data=new Map(),window={GOIMONProfiles:{currentAccount:()=>'student'}};
 const localStorage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};
 vm.runInNewContext(await readFile(new URL('../../daily-missions/dungeon_mission.js',import.meta.url),'utf8'),{window,localStorage});
 const mission=window.GoimonDungeonMission;
 const run={missionOwner:'student',hp:0,fight:0};
 mission.recordDefeat(run);assert.equal(mission.result(),null);
 run.fight=1;run.hp=5;mission.recordDefeat(run);assert.equal(mission.result(),null);
 run.hp=0;mission.recordDefeat({...run,missionOwner:'other'});assert.equal(mission.result(),null);
 mission.recordDefeat(run);assert.equal(mission.result().wins,1);assert.equal(run.missionRecorded,true);
 data.clear();mission.recordDefeat(run);assert.equal(mission.result(),null);
});
