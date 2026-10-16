// Shared local-only runtime. Never reads the real Worker/D1 configuration.
import {fileURLToPath} from 'node:url';
process.env.CLOUDFLARE_CF_FETCH_ENABLED='false';
process.env.WRANGLER_SEND_METRICS='false';
export async function createLocalPlatform(){
 const {getPlatformProxy}=await import('wrangler');
 return getPlatformProxy({configPath:fileURLToPath(new URL('./wrangler.jsonc',import.meta.url)),persist:false,remoteBindings:false});
}
