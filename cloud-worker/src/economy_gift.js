// Account-scoped, once-only First Aid gift. No shards or random draws.
import {readEconomy} from './economy_repository.js';
import {validateState,secureRandom} from './economy.js';
import catalog from '../../battle-prototype/catalog.js';
import {readLegacyClaims} from './economy_legacy_claims.js';

const OPERATION='gift_first_aid_20261112_once_v1';
const SKILL='N_first_aid_gift';
const receipt=(db,userId)=>db.prepare('SELECT expected_revision,result_json FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,OPERATION).first();

export async function readGiftStatus(db,userId){
 const current=await readEconomy(db,userId);
 return {claimed:!!(current.state.owned.skills[SKILL]||await receipt(db,userId))};
}

export async function claimFirstAidGift(db,userId,p){
 if(!p||Object.keys(p).length!==1||!Number.isSafeInteger(p.expectedRevision)||p.expectedRevision<0)throw Error('invalid_gift');
 const old=await receipt(db,userId);
 const replay=r=>({replayed:true,revision:r.expected_revision+1,result:JSON.parse(r.result_json)});
 if(old)return replay(old);
 const imported=await db.prepare('SELECT operation_id FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,'legacy_import_once_v1').first();
 if(!imported)throw Error('wallet_migration_required');
 const current=await readEconomy(db,userId);
 if(current.revision!==p.expectedRevision)throw Error('economy_revision_conflict');
 const alreadyOwned=(current.state.owned.skills[SKILL]||0)>0,next=structuredClone(current.state);
 if(!alreadyOwned)next.owned.skills[SKILL]=1;
 validateState(next);
 const result={skillId:SKILL,received:!alreadyOwned};
 try{
  await db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)')
   .bind(userId,OPERATION,JSON.stringify({type:'gift',skillId:SKILL}),p.expectedRevision,JSON.stringify(next),JSON.stringify(result)).run();
 }catch(error){
  const saved=await receipt(db,userId);if(saved)return replay(saved);
  if((await readEconomy(db,userId)).revision!==p.expectedRevision)throw Error('economy_revision_conflict');
  throw error;
 }
 return {replayed:false,revision:p.expectedRevision+1,result};
}

// Separate fixed receipt: one free equipment present per account, with server-side selection.
export async function claimTutorialGearGift(db,userId,p,rng=secureRandom){
 if(!p||Object.keys(p).length!==1||!Number.isSafeInteger(p.expectedRevision)||p.expectedRevision<0)throw Error('invalid_gift');
 const operation='gift_tutorial_gear_once_v1';
 const read=()=>db.prepare('SELECT expected_revision,result_json FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,operation).first();
 const replay=r=>({replayed:true,revision:r.expected_revision+1,result:JSON.parse(r.result_json)});
 const old=await read();if(old)return replay(old);
 if(!await db.prepare('SELECT operation_id FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,'legacy_import_once_v1').first())throw Error('wallet_migration_required');
 const current=await readEconomy(db,userId);if(current.revision!==p.expectedRevision)throw Error('economy_revision_conflict');
 const pool=catalog.gear.filter(g=>g.id!=='none'&&g.rarity==='N'&&!g.giftOnly),roll=rng();
 if(!Number.isFinite(roll)||roll<0||roll>=1||!pool.length)throw Error('invalid_gift');
 let item=pool[Math.floor(roll*pool.length)],received=true;
 const legacy=await readLegacyClaims(db,userId);
 if(legacy['gift:tutorial-gear:v1']){
  const row=await db.prepare('SELECT payload_json FROM economy_legacy_imports WHERE user_id=?').bind(userId).first();
  const gearId=JSON.parse(JSON.parse(row.payload_json).backup).shop?.tutorialGearId;
  item=pool.find(g=>g.id===gearId);if(!item)throw Error('legacy_claims_invalid');received=false;
 }
 const next=structuredClone(current.state);
 if(received)next.owned.gear[item.id]=(next.owned.gear[item.id]||0)+1;validateState(next);
 const result={gearId:item.id,received};
 try{await db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)')
  .bind(userId,operation,JSON.stringify({type:'tutorial-gear-gift'}),p.expectedRevision,JSON.stringify(next),JSON.stringify(result)).run();
 }catch(error){const saved=await read();if(saved)return replay(saved);if((await readEconomy(db,userId)).revision!==p.expectedRevision)throw Error('economy_revision_conflict');throw error;}
 return {replayed:false,revision:p.expectedRevision+1,result};
}
