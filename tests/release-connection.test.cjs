const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('cloud_config.js','utf8');
async function probe(value,fail=false){const window={fetch:async()=>{if(fail)throw Error('offline');return {ok:true,json:async()=>value};}};vm.runInNewContext(source,{window,AbortSignal});await window.GoimonReleaseReady;return window.GOIMON_CLOUD_CONFIG;}
test('public connection requires complete API capabilities, old/offline APIs remain disabled',async()=>{
 for(const data of [{ok:true,capabilities:{authoritativeEconomy:false}},{ok:true,capabilities:{authoritativeEconomy:true}},{}])assert.equal((await probe(data)).missionsEnabled,false);
 assert.equal((await probe({},true)).economyServerEnabled,false);
 const c=await probe({ok:true,capabilities:{authoritativeEconomy:true,missionRelease:1}});assert.equal(c.missionsEnabled,true);assert.equal(c.economyServerEnabled,true);
});
test('candidate config preserves public bindings, rate limits and origin while explicitly connecting routes',()=>{
 const old=JSON.parse(fs.readFileSync('cloud-worker/wrangler.public.jsonc')),next=JSON.parse(fs.readFileSync('cloud-worker/wrangler.release.jsonc'));
 for(const key of ['name','d1_databases','ratelimits','triggers'])assert.deepEqual(next[key],old[key]);
 assert.equal(next.vars.ALLOWED_ORIGIN,old.vars.ALLOWED_ORIGIN);assert.equal(next.main,'src/mission_release.js');assert.equal(old.main,'src/index.js');
});
test('review return is relative to GitHub Pages project and keeps grade',()=>{
 const s=fs.readFileSync('daily-missions/review_banner.js','utf8');assert(!s.includes("href='/mission_play"));assert(s.includes("level:p.get('level')==='2'?'2':'1'"));
});
