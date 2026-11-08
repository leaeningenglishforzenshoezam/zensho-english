const test=require('node:test'),assert=require('node:assert/strict');
test('server opt-in retains an unmigrated guest path but never falls back for a migrated wallet',async()=>{
 const {connect}=await import('../goimon-items/runtime.mjs');let requests=0;
 const root={GOIMON_CLOUD_CONFIG:{economyServerEnabled:true},GOIMONProfiles:{account:null,currentAccount:()=>null},GOIMONStorage:{getItem:()=>null},fetch:()=>{requests++;}};
 await connect(root);assert.equal(requests,0);assert.equal(root.GoimonCloudWallet,undefined);
 await assert.rejects(connect({...root,GOIMONStorage:{getItem:()=>'{"status":"server"}'}}),/ログイン/);
 assert.equal(requests,0);
});
