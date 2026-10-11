// Daily missions cloud bridge: pure, opt-in migration helpers. No network writes or rewards.
(function(root){
 'use strict';
 const VERSION=1, MAX_DAYS=45, MAX_KEYS=120, MAX_BYTES=250000;
 const patterns=[
  /^goimon_daily_missions_v2_lv([12])_(\d{4}-\d{2}-\d{2})$/,
  /^goimon_daily_mission_completions_v1_lv([12])_(\d{4}-\d{2}-\d{2})$/,
  /^goimon_daily_first_day_v1_lv([12])$/,
  /^goimon_daily_idiom_cursor_v1_lv([12])_(meaning|synonym)$/,
  /^goimon_daily_(reading|listening)_rotation_v1_lv([12])$/,
  /^goimon_daily_exam_history_v1_lv([12])_(sentence|paraphrase_quiz)$/,
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
 function merge(base,local,remote){
  for(const x of [base,local,remote])if(!x||x.version!==VERSION||!['1','2'].includes(x.level)||!x.data||typeof x.data!=='object')throw Error('invalid_state');
  if(base.level!==local.level||local.level!==remote.level)throw Error('level_mismatch');
  const data={},conflicts=[];
  for(const k of new Set([...Object.keys(base.data),...Object.keys(local.data),...Object.keys(remote.data)])){
   const b=base.data[k],l=local.data[k],r=remote.data[k];
   if(l!==b&&r!==b&&l!==r){conflicts.push(k);continue;}
   const value=l===b?r:l;if(value!==undefined)data[k]=value;
  }
  return {data,conflicts}; // Never silently choose a side on conflict.
 }
 root.GoimonDailyCloudState=Object.freeze({pack,merge,isAllowed});
})(typeof window!=='undefined'?window:globalThis);