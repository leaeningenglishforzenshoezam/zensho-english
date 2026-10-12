import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {getPlatformProxy} from 'wrangler';
import {handleSave,publicSave} from '../src/index.js';

const weak='zensho_q11_grammar_weak_v1_lv2';
const log='zensho_learning_log_v1_lv2';
const goimon='zensho_goimon_current_v4_lv2';
const q11=(mark,correct=1)=>({schemaVersion:1,data:{
 [weak]:JSON.stringify({G2_Q11_001:{manual:mark,wrong:mark?1:0,auto:mark}}),
 [log]:JSON.stringify({'2026-10-12':{q11_grammar:{attempt:correct,correct,wrong:0}},_q11PendingRewards:[]}),
 [goimon]:JSON.stringify({type:'nagomi',stats:{kotoba:10+correct*.5,bunmyaku:10+correct*.5},learningRewardClaims:{}})
}});
const request=(revision,snapshot)=>new Request('http://localhost:8787/api/v1/save',{
 method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({expectedRevision:revision,snapshot})
});
test('Q11 local D1: save, restore, CAS conflict, isolation and historical backup',async()=>{
 const mf=await getPlatformProxy({configPath:new URL('../wrangler.q11-local.jsonc',import.meta.url).pathname,persist:false});
 try{
  const DB=mf.env.DB;
  const ddl=await readFile(new URL('../migrations/0001_initial.sql',import.meta.url),'utf8');
  for(const sql of ddl.split(';').map(x=>x.trim()).filter(Boolean))await DB.prepare(sql).run();
  await DB.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind('q11-a','mock-google-a').run();
  await DB.prepare('INSERT INTO users(id,google_sub) VALUES (?,?)').bind('q11-b','mock-google-b').run();

  const first=await handleSave(request(0,q11(true)),{DB},'q11-a');
  assert.equal(first.status,200);
  const saved=await publicSave(DB,'q11-a');
  assert.equal(saved.revision,1);
  assert.equal(JSON.parse(saved.snapshot.data[weak]).G2_Q11_001.manual,true);
  assert.equal(JSON.parse(saved.snapshot.data[log])['2026-10-12'].q11_grammar.correct,1);
  assert.equal(JSON.parse(saved.snapshot.data[goimon]).stats.kotoba,10.5);
  assert.equal((await publicSave(DB,'q11-b')).revision,0);

  const stale=await handleSave(request(0,q11(false,2)),{DB},'q11-a');
  assert.equal(stale.status,409);
  assert.equal((await publicSave(DB,'q11-a')).revision,1);

  const upgraded=await handleSave(request(1,q11(false,2)),{DB},'q11-a');
  assert.equal(upgraded.status,200);
  assert.equal((await publicSave(DB,'q11-a')).revision,2);
  assert.equal(JSON.parse((await publicSave(DB,'q11-a')).snapshot.data[log])['2026-10-12'].q11_grammar.correct,2);
  const history=await DB.prepare('SELECT save_json FROM save_revisions WHERE user_id=? AND revision=1').bind('q11-a').first();
  assert.ok(history,'previous revision must be retained');
  assert.equal(JSON.parse(JSON.parse(history.save_json).data[weak]).G2_Q11_001.manual,true);

  const separate=await handleSave(request(0,q11(true,3)),{DB},'q11-b');
  assert.equal(separate.status,200);
  assert.equal((await publicSave(DB,'q11-b')).revision,1);
  assert.equal((await publicSave(DB,'q11-a')).revision,2,'account B cannot overwrite account A');
 }finally{await mf.dispose()}
});
