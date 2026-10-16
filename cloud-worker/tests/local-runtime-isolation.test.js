import test from 'node:test';import assert from 'node:assert/strict';import diagnostics from 'node:diagnostics_channel';import {readFile} from 'node:fs/promises';
import {createLocalPlatform} from '../dev/local-platform.js';
test('Local runtime configuration and observed Undici requests never select an external service',async()=>{
 const config=JSON.parse(await readFile(new URL('../dev/wrangler.jsonc',import.meta.url),'utf8'));
 assert.equal(config.send_metrics,false);assert.equal(config.d1_databases[0].database_id,'00000000-0000-0000-0000-000000000000');
 assert.equal(process.env.CLOUDFLARE_CF_FETCH_ENABLED,'false');assert.equal(process.env.WRANGLER_SEND_METRICS,'false');
 const origins=[];const channel=diagnostics.channel('undici:request:create'),listener=({request})=>origins.push(new URL(request.origin).hostname);
 channel.subscribe(listener);let platform;
 try{platform=await createLocalPlatform();await platform.env.DB.prepare('SELECT 1 AS n').first();}finally{await platform?.dispose();channel.unsubscribe(listener);}
 assert.deepEqual(origins.filter(host=>!['localhost','127.0.0.1','[::1]'].includes(host)),[]);
});
