import {readEconomy} from './economy_repository.js';
import {validateState} from './economy.js';
import {readLegacyClaims} from './economy_legacy_claims.js';
const day=now=>new Date(now+9*3600000).toISOString().slice(0,10);
const operation=(kind,date)=>kind==='welcome'?'bonus_welcome_once_v1':'bonus_'+kind+'_'+date.replaceAll('-','')+'_v1';
async function receipt(db,userId,kind,date){return db.prepare('SELECT expected_revision,result_json FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,operation(kind,date)).first();}
// Client-side dungeon achievements are capped to one fixed reward per known badge.
// Never accept an amount or arbitrary receipt identifier from the browser.
const dungeonBadges=new Set(['firstWin','perfectFight','correct20','correct100','correct500','correct1000','actBoss','collector','stage1Boss','stage1Perfect','firstClear','stage2Win','stage2Perfect','stage2Boss','secondClear','burst30','guard15','clutchWin']);
export async function claimDungeonBadge(db,userId,p){
 if(!p||Object.keys(p).length!==3||p.kind!=='badge'||!dungeonBadges.has(p.badgeId)||!Number.isSafeInteger(p.expectedRevision)||p.expectedRevision<0)throw Error('invalid_bonus');
 const operationId='bonus_dungeon_badge_'+p.badgeId+'_v1';
 const lookup=()=>db.prepare('SELECT expected_revision,result_json FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,operationId).first();
 const replay=r=>({replayed:true,revision:r.expected_revision+1,result:JSON.parse(r.result_json)});
 const prior=await lookup();if(prior)return replay(prior);
 const imported=await db.prepare('SELECT operation_id FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,'legacy_import_once_v1').first();
 if(!imported)throw Error('wallet_migration_required');
 const current=await readEconomy(db,userId);if(current.revision!==p.expectedRevision)throw Error('economy_revision_conflict');
 const legacy=await readLegacyClaims(db,userId),legacyClaimed=!!legacy['dungeon:badge:'+p.badgeId];
 const shards=legacyClaimed?0:5,next=structuredClone(current.state);next.shards+=shards;validateState(next);
 const result={kind:'badge',badgeId:p.badgeId,shards,legacyClaimed};
 try{await db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)').bind(userId,operationId,JSON.stringify({type:'bonus',kind:'badge',badgeId:p.badgeId}),p.expectedRevision,JSON.stringify(next),JSON.stringify(result)).run();}
 catch(e){const saved=await lookup();if(saved)return replay(saved);if((await readEconomy(db,userId)).revision!==p.expectedRevision)throw Error('economy_revision_conflict');throw e;}
 return {replayed:false,revision:p.expectedRevision+1,result};
}
export async function readBonusStatus(db,userId,now=Date.now()){
 const date=day(now),legacy=await readLegacyClaims(db,userId);
 return {date,welcome:!!legacy.welcome||!!await receipt(db,userId,'welcome',date),login:!!legacy['login:'+date]||!!await receipt(db,userId,'login',date)};
}
export async function claimBonus(db,userId,p,now=Date.now()){
 if(!p||Object.keys(p).length!==(p.kind==='dungeon'?5:3)||!['welcome','login','dungeon'].includes(p.kind)||(p.kind==='dungeon'&&(p.outcome!=='defeat'||!Number.isSafeInteger(p.wins)||p.wins<1))||typeof p.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(p.date)||!Number.isSafeInteger(p.expectedRevision)||p.expectedRevision<0)throw Error('invalid_bonus');
 const {kind,date,expectedRevision}=p,old=await receipt(db,userId,kind,date);
 const replay=r=>({replayed:true,revision:r.expected_revision+1,result:JSON.parse(r.result_json)});
 if(old)return replay(old);
 if(date!==day(now))throw Error('bonus_day_changed');
 // Do not let a first bonus make the wallet non-empty before legacy import.
 const imported=await db.prepare('SELECT operation_id FROM economy_receipts WHERE user_id=? AND operation_id=?').bind(userId,'legacy_import_once_v1').first();
 if(!imported)throw Error('wallet_migration_required');
 const current=await readEconomy(db,userId);if(current.revision!==expectedRevision)throw Error('economy_revision_conflict');
 const legacy=await readLegacyClaims(db,userId),legacyClaimed=!!legacy[kind==='welcome'?'welcome':kind+':'+date];
 const shards=legacyClaimed?0:kind==='welcome'?10:kind==='dungeon'?2:1,next=structuredClone(current.state);next.shards+=shards;validateState(next);
 const result={kind,date,shards,legacyClaimed};
 try{await db.prepare('INSERT INTO economy_receipts(user_id,operation_id,request_json,expected_revision,next_state_json,result_json) VALUES (?,?,?,?,?,?)').bind(userId,operation(kind,date),JSON.stringify({type:'bonus',kind,date}),expectedRevision,JSON.stringify(next),JSON.stringify(result)).run();}
 catch(e){const saved=await receipt(db,userId,kind,date);if(saved)return replay(saved);if((await readEconomy(db,userId)).revision!==expectedRevision)throw Error('economy_revision_conflict');throw e;}
 return {replayed:false,revision:expectedRevision+1,result};
}
