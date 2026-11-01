// Preserve exact legacy strings before any wallet migration. No grants or deletion.
export function backupLegacyItems({account,activeAccount,storage,now=()=>new Date().toISOString()}){
 if(!account||account==='guest'||activeAccount()!==account)throw Error('legacy_backup_account_changed');
 const key='goimon_items_legacy_backup_v1:'+encodeURIComponent(account);
 const existing=storage.getItem(key);
 if(existing!==null){
  let value;try{value=JSON.parse(existing);}catch{throw Error('legacy_backup_invalid');}
  if(value?.version!==1||value.account!==account||!value.raw||!['1','2'].every(n=>Object.hasOwn(value.raw,n)&&(value.raw[n]===null||typeof value.raw[n]==='string')))throw Error('legacy_backup_invalid');
  return value;
 }
 const raw=Object.fromEntries(['1','2'].map(n=>[n,storage.getItem('goimon_item_state_v1_lv'+n)]));
 const value={version:1,account,createdAt:now(),raw};
 if(activeAccount()!==account)throw Error('legacy_backup_account_changed');
 const serialized=JSON.stringify(value);storage.setItem(key,serialized);
 if(storage.getItem(key)!==serialized)throw Error('legacy_backup_failed');
 return value;
}
