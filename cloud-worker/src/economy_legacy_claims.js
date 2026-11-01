// Consult only the immutable backup whose assets were actually imported.
// Missing import is different from damaged evidence: the latter must fail closed.
export async function readLegacyClaims(db,userId){
 const receipt=await db.prepare('SELECT result_json FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,'legacy_import_once_v1').first();
 if(!receipt)return {};
 const row=await db.prepare('SELECT payload_hash,approved_hash,payload_json FROM economy_legacy_imports WHERE user_id=?').bind(userId).first();
 try{
  if(!row||row.payload_hash!==row.approved_hash||JSON.parse(receipt.result_json).hash!==row.payload_hash)throw Error();
  const backup=JSON.parse(JSON.parse(row.payload_json).backup),claims=backup.shop?.claims;
  if(backup.schemaVersion!==2||!claims||typeof claims!=='object'||Array.isArray(claims))throw Error();
  // The legacy grant path treats every truthy value as received; mirror that
  // conservatively rather than interpreting unexpected values as unclaimed.
  return Object.fromEntries(Object.entries(claims).filter(([,v])=>!!v).map(([k])=>[k,true]));
 }catch{throw Error('legacy_claims_invalid');}
}
export async function legacyMissionClaimed(db,userId,level,day,slot){
 const claims=await readLegacyClaims(db,userId);
 return Object.hasOwn(claims,'lv'+level+':mission:'+day+':'+slot);
}
