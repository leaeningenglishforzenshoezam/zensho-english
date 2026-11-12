// Persist learning on the participating pet while keeping this adventure's actor fixed.
(function(root){'use strict';
const categories={word_meaning:'quiz_enja',audio_word_meaning:'audio_quiz',q1:'accent',q3:'listening',idiom:'idiom_quiz',q9:'sentence',q11:'paraphrase_quiz',q12:'reorder'};
function delta(format,storage){
 const rules={word_meaning:{chie:1},audio_word_meaning:{chie:0.5,onkan:0.5},q1:{onkan:1},q3:{onkan:1},idiom:{chie:0.5,kotoba:0.5},q9:{bunmyaku:1},q11:{kotoba:0.5,bunmyaku:0.5}};
 if(format==='q12'){
  const selected=storage.getItem('zensho_reorder_bonus_stat_v1_lv1');
  const bonus=['chie','kotoba','onkan','bunmyaku'].includes(selected)?selected:'bunmyaku';
  const points={bunmyaku:0.5};points[bonus]=(points[bonus]||0)+1.5;return points;
 }
 if(!rules[format])throw Error('育成ポイントに対応していない問題形式です。');
 return rules[format];
}
function flush(state,save){
 if(root.GoimonDeveloper?.active||!state.growthReward)return;
 const reward=state.growthReward;
 root.GoimonUI.addQuestLearningPointsOnce(state.partnerId,state.growthRunId,reward.sequence,reward.delta,'1');
 state.growthReward=null;
 save();
}
function queue(state,q,correct){
 if(root.GoimonDeveloper?.active||!correct)return;
 if(state.growthReward)throw Error('前の育成ポイントの保存を確認してください。');
 state.growthRunId ||= root.crypto.randomUUID();
 state.growthSequence=(state.growthSequence||0)+1;
 state.growthReward={sequence:state.growthSequence,delta:delta(q.format,root.GOIMONStorage)};
}
function practice(state,q,correct,save){
 flush(state,save);
 queue(state,q,correct);
 save();flush(state,save);
 if(!root.GoimonDeveloper?.active)root.ZenshoLearningLog?.addResult(categories[q.format],correct,{level:'1'});
}
function note(parent){const p=root.document.createElement('p');p.className='ql-note';p.textContent='正解した分は相棒の育成ポイントに加算されます。今回の能力値は固定され、「最初から」で再編成すると反映されます。';parent.append(p);}
const api={delta,queue,flush,practice,note};if(typeof module!=='undefined')module.exports=api;else root.GoimonQuestGrowth=api;
})(typeof window!=='undefined'?window:globalThis);
