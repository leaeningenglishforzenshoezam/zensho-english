import test from 'node:test';import assert from 'node:assert/strict';import worker from '../src/mission_release.js';import old from '../src/index.js';
const env={ALLOWED_ORIGIN:'https://example.test',...Object.fromEntries(['MISSION_RELEASE_ENABLED','ECONOMY_DRAW_ENABLED','ECONOMY_IMPORT_ENABLED','ECONOMY_AUTO_IMPORT_ENABLED','ECONOMY_LOADOUTS_ENABLED','ECONOMY_BONUS_ENABLED'].map(k=>[k,'true']))};
const req=()=>new Request('https://api.test/health',{headers:{Origin:env.ALLOWED_ORIGIN}});
test('only connected candidate advertises economy; incomplete flags and legacy entry remain disabled',async()=>{
 assert.equal((await (await worker.fetch(req(),env)).json()).capabilities.authoritativeEconomy,true);
 assert.equal((await (await old.fetch(req(),env)).json()).capabilities.authoritativeEconomy,false);
 for(const key of Object.keys(env).filter(k=>k.endsWith('_ENABLED'))){const result=await (await worker.fetch(req(),{...env,[key]:'false'})).json();assert.equal(result.capabilities.authoritativeEconomy,false,key);}
 assert.equal((await worker.fetch(new Request('https://api.test/health'),env)).status,403);
});
