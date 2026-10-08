// Shared by the browser and Worker. Only learning/raising data may cross devices.
(function(root){
  'use strict';
  const patterns = [
    /^zensho_goimon_(current_v4|archive_v4|dex_discovery_v2|hall_count_v2|mr_uno_unlocked_v1|learning_achievements_v1)_lv[12]$/,
    /^zensho_learning_log_v1_lv[12]$/,
    /^zensho_block_global_lv[12]_v1$/,
    /^zensho_block_stats_(enja_v1|jaen_v2)_lv[12]$/,
    /^zensho_listening_(progress|weak|attempts|method_attempts)_v1_lv[12]$/,
    /^zensho_quiz_(weak_points_enja_v2|weak_points_jaen_v3|manual_weak_enja_v1)_lv[12]$/,
    /^zensho_(accent_(weak|manual_weak)_v1|audio_quiz_weak_v1|sentence_fixed_weak_v2)_lv[12]$/,
    /^zensho_idiom_quiz_(weak_meaning|weak_synonym|weak_expression_from_meaning|manual_weak)_v1_lv[12]$/,
    /^zensho_paraphrase_quiz_(weak|manual_weak)_v1_lv[12]$/,
    /^zensho_reorder_(bonus_stat|auto_weak|manual_weak)_v1_lv[12]$/,
    /^q7(SetHistory|VocabHistory)_v1$/,
    /^q10(ReadingCompletionState|WeakExpressions|QuestionHistory)_v1$/,
    /^dialogue(CompletionState|QuestionHistory)_v1$/,
    /^goimon_dialogue_history_v2$/
  ];
  const allowed = k => typeof k==='string' && patterns.some(p=>p.test(k));
  function safeTree(v, depth=0) {
    if(depth>40) throw Error('data_too_deep');
    if(v && typeof v==='object') for(const [k,x] of Object.entries(v)) {
      if(['__proto__','constructor','prototype'].includes(k)) throw Error('unsafe_property');
      safeTree(x,depth+1);
    }
  }
  function validate(input){
    if(!input || input.schemaVersion!==1 || !input.data || typeof input.data!=='object' || Array.isArray(input.data)) throw Error('invalid_snapshot');
    if(Object.keys(input.data).length>250) throw Error('too_many_keys');
    for(const [k,v] of Object.entries(input.data)) {
      if(!allowed(k)||typeof v!=='string') throw Error('invalid_save_key_or_value');
      if(/reorder_bonus_stat/.test(k)){if(!['wisdom','word','sound','context','chie','kotoba','onkan','bunmyaku'].includes(v)) throw Error('invalid_bonus_stat');}
      else {let parsed; try{parsed=JSON.parse(v);}catch{throw Error('invalid_json_value');} safeTree(parsed);
        if(k.includes('mr_uno_unlocked')){if(typeof parsed!=='boolean')throw Error('invalid_boolean');}
        else if(k.includes('hall_count')){if(!Number.isSafeInteger(parsed)||parsed<0)throw Error('invalid_count');}
        else if(k.includes('archive_v4')){if(!Array.isArray(parsed))throw Error('invalid_archive');}
        else if(!parsed || typeof parsed!=='object' || Array.isArray(parsed))throw Error('invalid_record');}
    }
    const s=JSON.stringify({schemaVersion:1,data:input.data});
    if(new TextEncoder().encode(s).length>900000) throw Error('save_too_large');
    return s;
  }
  function merge(base,local,remote){
    const data={},conflicts=[];
    for(const k of new Set([...Object.keys(base),...Object.keys(local),...Object.keys(remote)])) {
      const b=base[k],l=local[k],r=remote[k];
      if(l!==b && r!==b && l!==r){conflicts.push(k);continue;}
      const v=l===b?r:l;if(v!==undefined)data[k]=v;
    }
    return {data,conflicts};
  }
  root.GOIMONCloudSchema=Object.freeze({allowed,validate,merge});
})(globalThis);
