'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
function schema(){const ctx={TextEncoder};ctx.globalThis=ctx;vm.runInNewContext(read('cloud_schema.js'),ctx,{timeout:3000});return ctx.GOIMONCloudSchema;}
const weakKey='zensho_q11_grammar_weak_v1_lv2',logKey='zensho_learning_log_v1_lv2',goimonKey='zensho_goimon_current_v4_lv2';
const values={
 [weakKey]:JSON.stringify({G2_Q11_001:{manual:true,wrong:2,auto:true}}),
 [logKey]:JSON.stringify({'2026-10-12':{q11_grammar:{attempt:2,correct:1,wrong:1}},_q11PendingRewards:['g2q11:run1:G2_Q11_001:0']}),
 [goimonKey]:JSON.stringify({type:'nagomi',stats:{kotoba:10.5,bunmyaku:12.5},learningRewardClaims:{'g2q11:run0:G2_Q11_001:0':true}})
};
function snapshot(data){return {schemaVersion:1,data};}
test('grade-2 weak/log/raising data validate together in a cloud snapshot',()=>{
 const s=schema();const json=s.validate(snapshot(values));const decoded=JSON.parse(json);
 assert.equal(JSON.parse(decoded.data[weakKey]).G2_Q11_001.wrong,2);
 assert.equal(JSON.parse(decoded.data[logKey])._q11PendingRewards.length,1);
});
test('grade-1 record remains distinct from grade-2 record',()=>{
 const s=schema();
 assert.equal(s.allowed(weakKey),true);
 assert.equal(s.allowed('zensho_q11_grammar_weak_v1_lv1'),false);
 const g1='zensho_learning_log_v1_lv1';
 const v={...values,[g1]:JSON.stringify({'2026-10-12':{study:{attempt:3,correct:3,wrong:0}}})};
 const parsed=JSON.parse(s.validate(snapshot(v)));
 assert.ok(parsed.data[g1]);assert.ok(parsed.data[logKey]);assert.notEqual(parsed.data[g1],parsed.data[logKey]);
});
test('three-way cloud merge keeps nonconflicting remote and local Q11 updates',()=>{
 const s=schema();const base={...values};
 const local={...base,[weakKey]:JSON.stringify({G2_Q11_001:{manual:false,wrong:2,auto:true}})};
 const remote={...base,[logKey]:JSON.stringify({'2026-10-12':{q11_grammar:{attempt:3,correct:2,wrong:1}}})};
 const merged=s.merge(base,local,remote);
 assert.equal(merged.conflicts.length,0);
 assert.equal(merged.data[weakKey],local[weakKey]);
 assert.equal(merged.data[logKey],remote[logKey]);
});
test('same-key simultaneous cloud edits report conflict rather than silently overwriting',()=>{
 const s=schema();const base={...values};
 const local={...base,[weakKey]:JSON.stringify({G2_Q11_001:{manual:false,wrong:2,auto:true}})};
 const remote={...base,[weakKey]:JSON.stringify({G2_Q11_001:{manual:true,wrong:3,auto:true}})};
 const merged=s.merge(base,local,remote);
 assert.deepEqual(Array.from(merged.conflicts),[weakKey]);
 assert.equal(Object.prototype.hasOwnProperty.call(merged.data,weakKey),false);
});
test('invalid additional cloud key is rejected without needing Workers or D1',()=>{
 const s=schema();
 assert.throws(()=>s.validate(snapshot({...values,'unexpected_private_key':'{}'})),/invalid_save_key_or_value/);
});
test('Worker references the same shared schema module as the client',()=>{
 const worker=read('cloud-worker/src/validation.js');
 assert.ok(worker.includes("import '../../cloud_schema.js'"));
 assert.ok(worker.includes('GOIMONCloudSchema.validate'));
});
