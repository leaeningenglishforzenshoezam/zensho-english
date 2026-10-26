// Daily missions cloud bridge: pure, opt-in migration helpers. No network writes or rewards.
(function(root){
 'use strict';
 const VERSION=1, MAX_DAYS=45, MAX_KEYS=250, MAX_BYTES=250000;
 const patterns=[
  /^goimon_daily_missions_v2_lv([12])_(\d{4}-\d{2}-\d{2})$/,
  /^goimon_daily_mission_completions_v1_lv([12])_(\d{4}-\d{2}-\d{2})$/,
  /^goimon_daily_first_day_v1_lv([12])_(words|idioms)$/,
  /^goimon_daily_idiom_cursor_v1_lv([12])_(meaning|synonym)$/,
  /^goimon_daily_(reading|listening)_rotation_v1_lv([12])$/,
  /^goimon_daily_exam_history_v1_lv([12])_(sentence|paraphrase_quiz|reorder|listening:[235])$/,
  /^goimon_daily_set_history_v1_lv([12])_(reading:(q7|dialogue8|q10))$/,
  /^goimon_daily_set_selection_v1_lv([12])_(reading:(q7|dialogue8|q10))_(\d{4}-\d{2}-\d{2})$/
 ];
 function levelOf(k){const match=patterns.find(p=>p.test(k));if(!match)return null;const m=k.match(match);return m?.[1]==='1'||m?.[1]==='2'?m[1]:(m?.[2]==='1'||m?.[2]==='2'?m[2]:null);}
 function isAllowed(k,level){return typeof k==='string'&&levelOf(k)===String(level);}
 function daysAgo(day,today){const a=Date.parse(day+'T00:00:00Z'),b=Date.parse(today+'T00:00:00Z');return Number.isFinite(a)&&Number.isFinite(b)?Math.floor((b-a)/86400000):Infinity;}
 function pack(entries,level,today){
  if(!['1','2'].includes(String(level))||!/^\d{4}-\d{2}-\d{2}$/.test(today))throw Error('invalid_level_or_day');
  const data={};
  for(const [k,value] of Object.entries(entries||{})){
   if(!isAllowed(k,level))continue;
   const date=k.match(/\d{4}-\d{2}-\d{2}$/)?.[0];if(date&&(daysAgo(date,today)<0||daysAgo(date,today)>=MAX_DAYS))continue;
   if(typeof value!=='string')throw Error('invalid_value');
   // Legacy first-day and rotation keys are strings. Other records must be JSON.
   if(!/first_day|rotation_v1|set_selection_v1/.test(k)){try{JSON.parse(value);}catch(_){throw Error('invalid_json');}}
   data[k]=value;
  }
  if(Object.keys(data).length>MAX_KEYS)throw Error('too_many_keys');
  const result={version:VERSION,level:String(level),data};
  if(new TextEncoder().encode(JSON.stringify(result)).length>MAX_BYTES)throw Error('daily_save_too_large');
  return result;
 }
 function encodeForCloud(snapshot){
  if(!snapshot||snapshot.version!==VERSION||!['1','2'].includes(snapshot.level)||!snapshot.data||typeof snapshot.data!=='object'||Array.isArray(snapshot.data))throw Error('invalid_snapshot');
  const encoded=JSON.stringify(snapshot);
  if(new TextEncoder().encode(encoded).length>MAX_BYTES)throw Error('daily_save_too_large');
  return encoded;
 }
 function validateCloud(raw,level){
  if(typeof raw!=='string'||new TextEncoder().encode(raw).length>MAX_BYTES)throw Error('invalid_daily_size');
  let state;try{state=JSON.parse(raw);}catch{throw Error('invalid_daily_json');}
  if(state?.version!==VERSION||state.level!==String(level)||!state.data||typeof state.data!=='object'||Array.isArray(state.data)||Object.keys(state).some(k=>!['version','level','data'].includes(k)))throw Error('invalid_daily_state');
  if(Object.keys(state.data).length>MAX_KEYS)throw Error('too_many_daily_keys');
  const slots=['words','idioms','exam','listening','reading','reorder'];
  for(const [k,v] of Object.entries(state.data)){
   if(!isAllowed(k,level)||typeof v!=='string')throw Error('invalid_daily_key');
   const day=k.match(/\d{4}-\d{2}-\d{2}$/)?.[0];
   if(day&&(!Number.isFinite(Date.parse(day+'T00:00:00Z'))||new Date(day+'T00:00:00Z').toISOString().slice(0,10)!==day))throw Error('invalid_daily_day');
   if(/first_day/.test(k)){if(!/^\d{4}-\d{2}-\d{2}$/.test(v)||!Number.isFinite(Date.parse(v+'T00:00:00Z')))throw Error('invalid_daily_first_day');continue;}
   if(/rotation_v1/.test(k)){if(!(k.includes('listening')?['2','3','5']:['q7','dialogue8','q10']).includes(v))throw Error('invalid_daily_rotation');continue;}
   if(/set_selection_v1/.test(k)){if(!v||v.length>128)throw Error('invalid_daily_selection');continue;}
   let record;try{record=JSON.parse(v);}catch{throw Error('invalid_daily_record');}
   if(!record||typeof record!=='object'||Array.isArray(record))throw Error('invalid_daily_record');
   if(k.includes('mission_completions')){
    if(record.date!==day||String(record.level)!==String(level)||!record.completed||typeof record.completed!=='object'||Array.isArray(record.completed)||Object.keys(record).some(n=>!['date','level','completed'].includes(n)))throw Error('invalid_daily_completions');
    for(const [slot,x] of Object.entries(record.completed)){
     if(!slots.includes(slot)||!x||typeof x!=='object'||typeof x.completed!=='boolean'||!Number.isSafeInteger(x.attempts)||x.attempts<0||!Number.isInteger(x.bestCorrect)||x.bestCorrect<0||x.bestCorrect>({words:20,idioms:15,exam:10}[slot]||5))throw Error('invalid_daily_completion');
     if(Object.keys(x).some(n=>!['category','rangeStart','rangeEnd','bestCorrect','attempts','completed','completedAt','lastSessionId','questionMode','setId','format'].includes(n)))throw Error('invalid_daily_completion');
    }
   }
  }
  return state;
 }
 function decodeFromCloud(raw,level,today){
  if(typeof raw!=='string')throw Error('invalid_cloud_data');
  const parsed=validateCloud(raw,level);
  if(parsed?.version!==VERSION||parsed.level!==String(level)||!parsed.data||Array.isArray(parsed.data))throw Error('invalid_cloud_snapshot');
  return pack(parsed.data,level,today);
 }
 function mergeCompletionRecord(key,baseValue,localValue,remoteValue){
  const match=key.match(/^goimon_daily_mission_completions_v1_lv([12])_(\d{4}-\d{2}-\d{2})$/);
  if(!match||localValue===undefined||remoteValue===undefined)return null;
  let b,l,r;
  try{b=baseValue===undefined?{date:match[2],level:match[1],completed:{}}:JSON.parse(baseValue);l=JSON.parse(localValue);r=JSON.parse(remoteValue);}catch(_){return null;}
  const valid=x=>x&&typeof x==='object'&&!Array.isArray(x)&&x.date===match[2]&&String(x.level)===match[1]&&x.completed&&typeof x.completed==='object'&&!Array.isArray(x.completed)&&Object.keys(x).every(k=>['date','level','completed'].includes(k))&&Object.keys(x.completed).every(k=>['words','idioms','exam','listening','reading','reorder'].includes(k));
  if(![b,l,r].every(valid))return null;
  const combined={date:match[2],level:match[1],completed:{}};
  for(const slot of new Set([...Object.keys(b.completed),...Object.keys(l.completed),...Object.keys(r.completed)])){
   const before=b.completed[slot],left=l.completed[slot],right=r.completed[slot];
   const same=(a,c)=>JSON.stringify(a)===JSON.stringify(c);
   if(!same(left,before)&&!same(right,before)&&!same(left,right))return null;
   const chosen=same(left,before)?right:left;
   if(chosen!==undefined)combined.completed[slot]=chosen;
  }
  return JSON.stringify(combined);
 }
 function merge(base,local,remote){
  for(const x of [base,local,remote])if(!x||x.version!==VERSION||!['1','2'].includes(x.level)||!x.data||typeof x.data!=='object')throw Error('invalid_state');
  if(base.level!==local.level||local.level!==remote.level)throw Error('level_mismatch');
  const data={},conflicts=[];
  for(const k of new Set([...Object.keys(base.data),...Object.keys(local.data),...Object.keys(remote.data)])){
   const b=base.data[k],l=local.data[k],r=remote.data[k];
   if(l!==b&&r!==b&&l!==r){const combined=mergeCompletionRecord(k,b,l,r);if(combined!==null){data[k]=combined;continue;}conflicts.push(k);continue;}
   const value=l===b?r:l;if(value!==undefined)data[k]=value;
  }
  return {data,conflicts}; // Never silently choose a side on conflict.
 }
 root.GoimonDailyCloudState=Object.freeze({pack,merge,isAllowed,encodeForCloud,decodeFromCloud,validateCloud});
})(typeof window!=='undefined'?window:globalThis);