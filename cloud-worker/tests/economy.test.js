import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {createLocalPlatform} from '../dev/local-platform.js';
import {emptyEconomy,planDraw,planExchange,validateState} from '../src/economy.js';import {executeDraw,readEconomy} from '../src/economy_repository.js';
const funded=shards=>({...emptyEconomy(),shards});
test('Ten costs 100, guarantees R+, singles have no cumulative pity, input is immutable',()=>{
 const s=funded(200),p=planDraw(s,'skills',10,()=>0);assert.equal(s.shards,200);assert.equal(p.next.shards,100);assert.deepEqual(p.result.items.map(x=>x.rarity),[...Array(9).fill('N'),'R']);
 let single=funded(100);for(let i=0;i<10;i++){const x=planDraw(single,'gear',1,()=>0);assert.equal(x.result.items[0].rarity,'N');single=x.next;}assert.equal(single.shards,0);
 for(const [r,want]of [[0,'N'],[.9399,'N'],[.94,'R'],[.9899,'R'],[.99,'SR'],[.9999,'SR']])assert.equal(planDraw(funded(10),'gear',1,()=>r).result.items[0].rarity,want);
 for(const [r,want]of [[5/6-0.0001,'R'],[5/6,'SR']])assert.equal(planDraw(funded(100),'skills',10,()=>r).result.items[9].rarity,want);
 for(const [kind,count]of [['gear',0],['gear',2],['bad',10],['__proto__',1]])assert.throws(()=>planDraw(s,kind,count));
 assert.throws(()=>planDraw(funded(9),'gear',1),/insufficient_shards/);for(const r of [-1,1,NaN])assert.throws(()=>planDraw(s,'skills',1,()=>r));
});
test('Exchange protects registered copies, inventory bounds and malformed states',()=>{
 const s=funded(0);s.owned.gear.N_hp=7;assert.throws(()=>planExchange(s,'gear','N_hp',3));const p=planExchange(s,'gear','N_hp',2);assert.equal(p.next.shards,10);assert.equal(p.next.owned.gear.N_hp,2);assert.equal(s.owned.gear.N_hp,7);
 assert.throws(()=>planExchange(s,'gear','N_hp',undefined));assert.throws(()=>validateState({...s,shards:-1}));assert.throws(()=>validateState({...s,owned:{gear:JSON.parse('{"__proto__":1}'),skills:{}}}));
});
test('Local D1 transaction: identical replay, competing devices, rollback, separate accounts, learning preserved',async()=>{
 const mf=await createLocalPlatform();try{const db=mf.env.DB;
 for(const sql of (await readFile(new URL('../migrations/0001_initial.sql',import.meta.url),'utf8')).split(';').filter(x=>x.trim()))await db.prepare(sql).run();
 const draft=await readFile(new URL('../schema-drafts/economy-v1.sql',import.meta.url),'utf8');for(const sql of draft.match(/CREATE TABLE[\s\S]*?;|CREATE TRIGGER[\s\S]*?\nEND;/g))await db.prepare(sql).run();
 for(const id of ['a','b']){await db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind(id,'sub-'+id).run();await db.prepare('INSERT INTO economy_accounts(user_id,state_json) VALUES (?,?)').bind(id,JSON.stringify(funded(200))).run();}
 await db.prepare('INSERT INTO saves(user_id,save_json) VALUES (?,?)').bind('a','{"learning":"preserved"}').run();
 const cmd={type:'draw',kind:'gear',count:10},op='operation_00000001';const both=await Promise.all([executeDraw(db,'a',op,0,cmd,()=>0),executeDraw(db,'a',op,0,cmd,()=>.99)]);assert.deepEqual(both[0].result,both[1].result);assert.equal(both.filter(x=>x.replayed).length,1);
 assert.equal((await readEconomy(db,'a')).state.shards,100);assert.equal((await readEconomy(db,'a')).revision,1);
 const replay=await executeDraw(db,'a',op,0,cmd,()=>{throw Error('must not reroll');});assert.deepEqual(replay.result,both[0].result);
 await assert.rejects(executeDraw(db,'a',op,1,{...cmd,kind:'skills'}),/operation_id_reused/);
 const races=await Promise.allSettled(['operation_00000002','operation_00000003'].map(id=>executeDraw(db,'a',id,1,{...cmd,count:1},()=>0)));assert.equal(races.filter(x=>x.status==='fulfilled').length,1);assert.equal(races.find(x=>x.status==='rejected').reason.message,'economy_revision_conflict');
 assert.equal((await readEconomy(db,'a')).state.shards,90);assert.equal((await readEconomy(db,'b')).state.shards,200);await executeDraw(db,'b',op,0,{...cmd,count:1},()=>0);assert.equal((await readEconomy(db,'b')).state.shards,190);
 const before=await readEconomy(db,'a');await assert.rejects(db.batch([db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)').bind('a','rollback_00000001','{}',2,JSON.stringify(funded(0)),'{}'),db.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind('a','duplicate')]));assert.deepEqual(await readEconomy(db,'a'),before);assert.equal(await db.prepare('SELECT * FROM economy_receipts WHERE operation_id=?').bind('rollback_00000001').first(),null);
 assert.equal((await db.prepare('SELECT save_json FROM saves WHERE user_id=?').bind('a').first()).save_json,'{"learning":"preserved"}');await assert.rejects(executeDraw(db,'a','invalidcmd_0000001',2,{...cmd,shards:999}));
 }finally{await mf.dispose();}
});
