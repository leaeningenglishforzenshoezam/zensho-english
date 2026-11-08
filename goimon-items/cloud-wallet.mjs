// Opt-in migration coordinator. Does not run until a page explicitly creates it.
export function createCloudWallet({account,apiBase,activeAccount,storage,lock,request,readLocal,catalog}){
 if(!account||account==='guest'||!apiBase||typeof lock!=='function')throw Error('wallet_configuration');
 const key='goimon_wallet_migration_v1:'+encodeURIComponent(apiBase)+':'+encodeURIComponent(account);
 const cacheKey=key+':cache',modeKey='goimon_economy_mode_v1';
 function scope(){if(activeAccount()!==account)throw Error('wallet_account_changed');}
 function save(k,value){scope();const raw=JSON.stringify(value);storage.setItem(k,raw);if(storage.getItem(k)!==raw)throw Error('wallet_storage_failed');}
 function read(){scope();const raw=storage.getItem(key);if(raw===null)return null;let p;try{p=JSON.parse(raw);}catch{throw Error('wallet_checkpoint_invalid');}
  if(p?.version!==1||p.account!==account||p.apiBase!==apiBase||!p.payload||typeof p.payload.backup!=='string')throw Error('wallet_checkpoint_invalid');return p;}
 function validate(s){
  if(!s||s.version!==1||!Number.isSafeInteger(s.shards)||s.shards<0||s.shards>1000000||!s.owned)throw Error('wallet_response_invalid');
  for(const kind of ['gear','skills']){const inv=s.owned[kind];if(!inv||typeof inv!=='object'||Array.isArray(inv))throw Error('wallet_response_invalid');
   for(const [id,n]of Object.entries(inv))if(!catalog[kind].some(x=>x.id===id&&id!=='none')||!Number.isSafeInteger(n)||n<0||n>9999)throw Error('wallet_response_invalid');}
  return s;
 }
 async function cache(response){scope();if(!Number.isSafeInteger(response?.revision)||response.revision<0)throw Error('wallet_response_invalid');validate(response.state);
  const old=storage.getItem(cacheKey);if(old&&JSON.parse(old).revision>response.revision)throw Error('wallet_stale_response');
  const value={revision:response.revision,state:response.state};save(cacheKey,value);return value;
 }
 return Object.freeze({
  migrate:()=>lock('goimon-item-common-'+account,async()=>{
   scope();let p=read();
   const mode=storage.getItem(modeKey);if(mode&&JSON.parse(mode).apiBase!==apiBase)throw Error('wallet_api_changed');
   save(modeKey,{account,apiBase,status:'migrating'});
   if(!p){
    const local=readLocal(),assets={version:1,shards:local.shop.stars,owned:local.owned};validate(assets);
    p={version:1,account,apiBase,payload:{version:1,assets,backup:JSON.stringify(local)}};
    if(p.payload.backup.length>250000)throw Error('wallet_backup_too_large');save(key,p);
   }
   save(modeKey,{account,apiBase,status:'migrating'});
   // Snapshot is already durable. Repeated POSTs are safe and never reread local assets.
   const response=await request('economy/import/auto',p.payload);scope();
   const value=await cache(response);save(key,{...p,complete:true});save(modeKey,{account,apiBase,status:'server'});return value;
  }),
  refresh:()=>lock('goimon-item-common-'+account,async()=>{scope();if(!read()?.complete)throw Error('wallet_migration_required');return cache(await request('economy'));}),
  read:()=>{scope();if(!read()?.complete)return null;const raw=storage.getItem(cacheKey);if(raw===null)return null;const value=JSON.parse(raw);validate(value.state);return value;},
  checkpoint:read
 });
}
