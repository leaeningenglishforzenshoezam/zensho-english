// View-only helpers: never alter answers, saves, currency or mission rules.
export function createReviewGate(currentAttempt){
 let revision=0;
 return {
  invalidate(){revision++;},
  begin(attemptId){const ticket=++revision;return ()=>ticket===revision&&currentAttempt()===attemptId;}
 };
}
export function answerText(question,answer){
 if(question.chunks)return (Array.isArray(answer)?answer:[]).map(id=>question.chunks.find(c=>c.id===id)?.text||'').join(' ');
 return question.choices?.[answer]??'未回答';
}
export function dashboardRows(rules,options,status){
 return rules.missionSlots.filter(rule=>options.some(([value])=>value.split(':')[0]===rule.slot)).map(rule=>{
  const saved=status?.missions?.find(m=>m.slot===rule.slot);
  return {...rule,options:options.filter(([value])=>value.split(':')[0]===rule.slot),state:!saved?'unknown':saved.completed?'completed':'open'};
 });
}
