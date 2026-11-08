export function missionOptions(level){
 if(!['1','2'].includes(level))throw Error('mission_not_supported');
 const words=[['words:enja','単語 英→日'],['words:jaen','単語 日→英'],['words:audio','単語 音声']];
 return level==='2'?[...words,['exam:sentence2','短文空所埋め']]:[...words,['idioms:meaning','熟語 意味'],['idioms:synonym','熟語 同義表現'],['exam:mix','大問9'],['exam:standard','大問11'],['listening','リスニング'],['reading','読解・会話'],['reorder','語句整序']];
}
export function missionSettings(level,value){
 if(!missionOptions(level).some(([id])=>id===value))throw Error('mission_not_supported');
 const [slot,mode]=value.split(':'),body={level};
 if(['words','idioms'].includes(slot))body.mode=mode;
 if(slot==='exam'){body.category=mode==='standard'?'paraphrase_quiz':'sentence';body.variant=mode==='sentence2'?'standard':mode;}
 return {slot,body};
}
