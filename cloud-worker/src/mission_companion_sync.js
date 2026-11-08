// Conservative draft lifecycle gate. Identity, not archive index, owns growth.
import {STAGE_ORDER,images,roundPoint,sumStats,calculateLevel} from './data/mission-growth-rules.js';
const currentKey='zensho_goimon_current_v4_lv1',archiveKey='zensho_goimon_archive_v4_lv1';
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
// JSON object property order is not a gameplay change.
const canonical=x=>Array.isArray(x)?x.map(canonical):object(x)?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
const same=(a,b)=>JSON.stringify(canonical(a))===JSON.stringify(canonical(b));
export function readCompanionCollection(snapshot){
 const current=JSON.parse(snapshot.data[currentKey]||'null'),archive=JSON.parse(snapshot.data[archiveKey]||'[]');
 if(!object(current)||!Array.isArray(archive)||archive.length>15)throw Error('invalid_companions');
 const byId=new Map();for(const pet of [current,...archive]){
  if(!object(pet)||typeof pet.id!=='string'||!pet.id||byId.has(pet.id)||!STAGE_ORDER.includes(pet.stage)||!Object.hasOwn(images,pet.type)||!object(pet.stats))throw Error('invalid_companions');
  for(const stat of ['chie','kotoba','onkan','bunmyaku']){const n=pet.stats[stat];if(typeof n!=='number'||!Number.isFinite(n)||n<0||n>1e9||roundPoint(n)!==n)throw Error('invalid_companions');}
  if(pet.totalPoints!==sumStats(pet.stats)||pet.level!==calculateLevel(pet.totalPoints))throw Error('invalid_companions');
  byId.set(pet.id,pet);
 }
 return {current,archive,byId};
}
export function companionSyncConflicts(previous,next){
 const keys=new Set([...Object.keys(previous.data),...Object.keys(next.data)]);
 const changed=[...keys].filter(k=>/^zensho_goimon_.*_lv1$/.test(k)&&!same(previous.data[k]===undefined?null:JSON.parse(previous.data[k]),next.data[k]===undefined?null:JSON.parse(next.data[k])));
 if(!changed.length)return [];
 const paths=changed.filter(k=>![currentKey,archiveKey].includes(k)).map(k=>[k]);
 try{
  const before=readCompanionCollection(previous),after=readCompanionCollection(next);
  // New generations, cloning and deletion need explicit lifecycle receipts.
  // Neither moving a pet nor changing its ID can erase or duplicate its evidence.
  if(before.byId.size!==after.byId.size||[...before.byId.keys()].some(id=>!after.byId.has(id)))return [...paths,[currentKey],[archiveKey]];
  for(const [id,old]of before.byId){
   const pet=after.byId.get(id),allowed=structuredClone(old);
   if(!same(old.updatedAt,pet.updatedAt)){
    if(!Number.isSafeInteger(pet.updatedAt)||pet.updatedAt<0||(old.updatedAt!==undefined&&(!Number.isSafeInteger(old.updatedAt)||pet.updatedAt<old.updatedAt)))paths.push([currentKey,id,'updatedAt']);
    else allowed.updatedAt=pet.updatedAt;
   }
   if(!same(old.nickname,pet.nickname)){
    // Match existing nickname eligibility and trim/20-character limit.
    if(pet.id!==after.current.id||pet.stage==='egg'||typeof pet.nickname!=='string'||pet.nickname!==pet.nickname.trim()||pet.nickname.length>20)paths.push([currentKey,id,'nickname']);
    else allowed.nickname=pet.nickname;
   }
   // Existing restoreArchiveItem clears this marker only on the reactivated pet.
   if(before.current.id!==after.current.id&&id===after.current.id&&old.hallOfFame===true&&pet.hallOfFame===false)allowed.hallOfFame=false;
   if(!same(allowed,pet))paths.push([currentKey,id]);
  }
 }catch{paths.push([currentKey],[archiveKey]);}
 return paths;
}
