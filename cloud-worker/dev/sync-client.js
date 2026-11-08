// Local-only integration client. Storage and authentication scope are injected.
// Production cloud_autosave.js remains untouched.
const copy=x=>structuredClone(x),equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export class MissionSyncClient {
 constructor({request,read,write,scope,validate}){Object.assign(this,{request,read,write,scope,validate});this.owner=scope();this.busy=false;}
 guard(){if(this.scope()!==this.owner)throw Error('account_changed');}
 state(){this.guard();const state=this.read();if(state&&state.owner!==this.owner)throw Error('account_changed');return state;}
 store(state){this.guard();this.write(copy(state));}
 async locked(fn){this.guard();if(this.busy)throw Error('request_pending');this.busy=true;try{return await fn();}finally{this.busy=false;}}
 async load(){return this.locked(async()=>{const old=this.state();if(old&&(old.pending||old.conflict||!equal(old.local,old.base)))throw Error('unsaved_changes');
  const r=await this.request('missions/learning');this.guard();this.validate(r.snapshot);if(!Number.isSafeInteger(r.revision)||r.revision<0)throw Error('invalid_response');
  if(!equal(this.state(),old))throw Error('local_changed_during_load');
  this.store({owner:this.owner,revision:r.revision,base:r.snapshot,local:r.snapshot,pending:null,conflict:null});return this.state();});}
 edit(snapshot){this.guard();this.validate(snapshot);const s=this.state();if(!s)throw Error('load_required');this.store({...s,local:snapshot});}
 async save(){return this.locked(async()=>{
  let s=this.state();if(!s)throw Error('load_required');if(s.conflict)throw Error('sync_conflict');
  if(!s.pending){
   const r=await this.request('missions/learning');this.guard();s=this.state();
   // Persist immutable request BEFORE sending. Quota failure means no network write.
   this.store({...s,pending:{operationId:crypto.randomUUID(),baseRevision:s.revision,expectedRevision:r.revision,snapshot:copy(s.local)}});
  }
  s=this.state();const sent=copy(s.pending);let response;
  try{response=await this.request('missions/learning/sync',sent);}catch(error){
   this.guard();if(error.status===409){const current=this.state();this.store({...current,conflict:{reason:error.message,paths:error.data?.paths||[],request:sent}});}throw error;
  }
  this.guard();this.validate(response.snapshot);if(response.conflict||response.revision!==sent.expectedRevision+1)throw Error('invalid_response');
  const current=this.state(),data={...response.snapshot.data},conflicts=[];
  // Edits made during a request survive. Ambiguous same-key edits are never guessed.
  for(const key of new Set([...Object.keys(sent.snapshot.data),...Object.keys(current.local.data)])){
   const before=sent.snapshot.data[key],local=current.local.data[key];if(before===local)continue;
   if(response.snapshot.data[key]!==before){conflicts.push([key]);continue;}
   if(local===undefined)delete data[key];else data[key]=local;
  }
  if(conflicts.length){this.store({...current,pending:null,conflict:{reason:'edits_during_sync',paths:conflicts,accepted:response}});throw Error('sync_conflict');}
  const local={schemaVersion:1,data};this.validate(local);this.store({owner:this.owner,revision:response.revision,base:response.snapshot,local,pending:null,conflict:null});return response;
 });}
}
