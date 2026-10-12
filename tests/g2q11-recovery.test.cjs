'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const read=f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8');
function setup(){
 const map=new Map(),calls=[];let failReward=false;
 const storage={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};
 const claims=new Set();
 const window={GOIMONStorage:storage,ACTIVE_LEVEL:'2',LearningCategories:{getCategory:()=>({})},GoimonUI:{addLearningPointsOnce:(id)=>{calls.push(id);if(failReward)throw Error('reward write failed');if(claims.has(id))return false;claims.add(id);return true;}}};
 vm.runInNewContext(read('learning_log.js'),{window,GOIMONStorage:storage,console,Date},{timeout:3000});
 vm.runInNewContext(read('g2q11_reward_recovery.js'),{window,console},{timeout:3000});
 return {window,map,calls,claims,fail:v=>failReward=v};
}
const claim='g2q11:550e8400-e29b-41d4-a716-446655440000:G2_Q11_101:0';
test('successful answer keeps reward pending until claim delivered',()=>{
 const t=setup(),a=t.window.ZenshoLearningLog;
 assert.equal(a.addResult('q11_grammar',true,{level:'2',dayKey:'2026-10-12',rewardClaimId:claim}),true);
 assert.deepEqual(Array.from(t.window.G2Q11RewardRecovery.pending()),[claim]);
 assert.equal(t.window.G2Q11RewardRecovery.deliver(claim),true);
 assert.equal(t.window.G2Q11RewardRecovery.pending().length,0);
 assert.equal(t.claims.size,1);
});
test('failed reward is recovered exactly once on subsequent visit',()=>{
 const t=setup();
 t.window.ZenshoLearningLog.addResult('q11_grammar',true,{level:'2',rewardClaimId:claim});
 t.fail(true);assert.throws(()=>t.window.G2Q11RewardRecovery.deliver(claim),/reward write failed/);
 assert.equal(t.window.G2Q11RewardRecovery.pending().length,1);
 t.fail(false);assert.equal(t.window.G2Q11RewardRecovery.retry(),1);
 assert.equal(t.window.G2Q11RewardRecovery.retry(),0);
 assert.equal(t.claims.size,1);
});
test('already-claimed reward is safely settled after later retry',()=>{
 const t=setup();
 t.window.ZenshoLearningLog.addResult('q11_grammar',true,{level:'2',rewardClaimId:claim});
 t.claims.add(claim);
 assert.equal(t.window.G2Q11RewardRecovery.retry(),1);
 assert.equal(t.claims.size,1);
 assert.equal(t.window.G2Q11RewardRecovery.pending().length,0);
});
test('answer save failure creates neither answer nor reward',()=>{
 const t=setup();
 t.window.GOIMONStorage.setItem=()=>{throw Error('conflict')};
 assert.throws(()=>t.window.ZenshoLearningLog.addResult('q11_grammar',true,{level:'2',rewardClaimId:claim}),/conflict/);
 assert.equal(t.calls.length,0);
});
