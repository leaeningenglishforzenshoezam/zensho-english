// Development-only revision-safe daily cloud sync. Caller supplies authenticated transport.
// No invocation from production pages; no reward grants.
(function(root){
'use strict';
async function syncOnce({level,baseRaw,localRaw,readRemote,writeRemote,day}){
 const adapter=root.GoimonDailyCloudAdapter;
 if(!adapter||typeof readRemote!=='function'||typeof writeRemote!=='function')throw Error('missing_dependencies');
 // Preserve local and base snapshots until a confirmed server response.
 const remote=await readRemote();
 const prepared=adapter.prepareCloudUpdate(level,baseRaw,localRaw,remote,day);
 if(!prepared.ready)return {saved:false,reason:'conflict',conflicts:prepared.conflicts};
 if(prepared.unchanged)return {saved:true,unchanged:true,revision:prepared.expectedRevision};
 try{
  const response=await writeRemote({expectedRevision:prepared.expectedRevision,snapshot:prepared.snapshot});
  if(!Number.isSafeInteger(response?.revision)||response.revision!==prepared.expectedRevision+1)
   throw Error('invalid_save_revision');
  return {saved:true,revision:response.revision,snapshot:prepared.snapshot};
 }catch(err){
  // A revision race must be retried only after a fresh fetch by the caller,
  // using the ORIGINAL base and local snapshots. Never overwrite blindly.
  if(err?.status===409||err?.code==='revision_conflict')
   return {saved:false,reason:'revision_conflict',retryable:true};
  throw err;
 }
}
root.GoimonDailyCloudSync=Object.freeze({syncOnce});
})(typeof window!=='undefined'?window:globalThis);
