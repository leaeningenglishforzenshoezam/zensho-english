// Matches the existing reading rewards; shared state markers prevent normal-page
// re-awards after this snapshot is synchronized. Never replace other page state.
const keys={dialogue8:'dialogueCompletionState_v1',q10:'q10ReadingCompletionState_v1'};
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
export function readingGrowthPlan(data,attempt,claimed=false){
 const p=JSON.parse(attempt.private_json),setId=String(p.setId??'');
 if(!setId||['__proto__','constructor','prototype'].includes(setId)||p.questions?.length!==5||!Number.isInteger(attempt.score)||attempt.score<0||attempt.score>5)throw Error('invalid_growth_record');
 // Existing addQ7ReadingResult rule, claim ID scoped to a scored attempt.
 if(attempt.category==='q7')return {points:attempt.score*2+(attempt.score===5?10:0)};
 const key=keys[attempt.category];if(!key)throw Error('unsupported_attempt');
 let state={};try{if(Object.hasOwn(data,key))state=JSON.parse(data[key]);}catch{throw Error('invalid_growth_record');}
 if(!object(state)||(Object.hasOwn(state,'rewardedQuestions')&&!object(state.rewardedQuestions)))throw Error('invalid_growth_record');
 const rewarded=state.rewardedQuestions||{};
 if(Object.hasOwn(rewarded,setId)&&typeof rewarded[setId]!=='boolean')throw Error('invalid_growth_record');
 const perfect=attempt.score===5,points=perfect&&!claimed&&!rewarded[setId]?1:0;
 if(perfect){rewarded[setId]=true;state.rewardedQuestions=rewarded;data[key]=JSON.stringify(state);}
 return {points,hidden:points?attempt.category:null};
}
