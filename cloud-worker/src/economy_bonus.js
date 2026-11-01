import {readEconomy} from './economy_repository.js';
import {validateState} from './economy.js';
import {readLegacyClaims} from './economy_legacy_claims.js';
const day=now=>new Date(now+9*3600000).toISOString().slice(0,10);
const operation=(kind,date)=>kind==='welcome'?'bonus_welcome_once_v1':'bonus_login_'+date.replaceAll('-','')+'_v1';
async function receipt(db,userId,kind,date){return db.prepare('SELECT expected_revision,result_json FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,operation(kind,date)).first();}
export async function readBonusStatus(db,userId,now=Date.now()){
 const date=day(now),legacy=await readLegacyClaims(db,userId);
 return {date,welcome:!!legacy.welcome||!!await receipt(db,userId,'welcome',date),login:!!legacy['login:'+date]||!!await receipt(db,userId,'login',date)};
}
export async function claimBonus(db,userId,p,now=Date.now()){
 if(!p||Object.keys(p).length!==3||!['welcome','login'].includes(p.kind)||typeof p.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(p.date)||!Number.isSafeInteger(p.expectedRevision)||p.expectedRevision<0)throw Error('invalid_bonus');
 const {kind,date,expectedRevision}=p,old=await receipt(db,userId,kind,date);
 const replay=r=>({replayed:true,revision:r.expected_revision+1,result:JSON.parse(r.result_json)});
 if(old)return replay(old);
 if(date!==day(now))throw Error('bonus_day_changed');
 // Do not let a first bonus make the wallet non-empty before legacy import.
 const imported=await db.prepare('SELECT operation_id FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,'legacy_import_once_v1').first();
 if(!imported)throw Error('wallet_migration_required');
 const current=await readEconomy(db,userId);if(current.revision!==expectedRevision)throw Error('economy_revision_conflict');
 const legacy=await readLegacyClaims(db,userId),legacyClaimed=!!legacy[kind==='welcome'?'welcome':'login:'+date];
 const shards=legacyClaimed?0:kind==='welcome'?10:1,next=structuredClone(current.state);next.shards+=shards;validateState(next);
 const result={kind,date,shards,legacyClaimed};
 try{await db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)').bind(userId,operation(kind,date),JSON.stringify({type:'bonus',kind,date}),expectedRevision,JSON.stringify(next),JSON.stringify(result)).run();}
 catch(e){const saved=await receipt(db,userId,kind,date);if(saved)return replay(saved);if((await readEconomy(db,userId)).revision!==expectedRevision)throw Error('economy_revision_conflict');throw e;}
 return {replayed:false,revision:expectedRevision+1,result};
}
