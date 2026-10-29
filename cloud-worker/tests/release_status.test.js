import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';
import {releaseStatus,RELEASE_ID} from '../src/release_status.js';
test('release metadata states only connected capabilities and never exposes environment values',()=>{
 const value=releaseStatus({LEARNING_CLASSES_ENABLED:'true',TOKEN:'do-not-expose'});
 assert.equal(value.release,RELEASE_ID);assert.equal(value.capabilities.questSave,1);assert.equal(value.capabilities.adventureProfile,2);
 assert.equal(value.capabilities.learningClasses,true);assert.equal(value.capabilities.authoritativeEconomy,false);
 assert.equal(releaseStatus().capabilities.learningClasses,false);assert.ok(!JSON.stringify(value).includes('do-not-expose'));
});
test('health is read-only, CORS protected and identifies the deployed save validator',async()=>{
 const origin='https://leaeningenglishforzenshoezam.github.io',env={ALLOWED_ORIGIN:origin};
 assert.equal((await worker.fetch(new Request('https://example.test/health'),env)).status,403);
 const response=await worker.fetch(new Request('https://example.test/health',{headers:{Origin:origin}}),env);
 assert.equal(response.status,200);assert.equal(response.headers.get('access-control-allow-origin'),origin);assert.deepEqual(await response.json(),releaseStatus(env));
});
