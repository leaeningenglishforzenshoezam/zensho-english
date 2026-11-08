const test=require('node:test');
const assert=require('node:assert/strict');
const rules=require('../daily-missions/daily_mission_rules.js');
const helpers=()=>import('../daily-missions/mission_presentation.mjs');
test('late review success AND rejection cannot touch a subsequent attempt',async()=>{
 const {createReviewGate}=await helpers();let attempt='a';const gate=createReviewGate(()=>attempt);
 let resolve;const delayed=new Promise(r=>resolve=r);const valid=gate.begin('a');let updates=0;
 const finished=delayed.then(()=>{if(valid())updates++;});
 gate.invalidate();attempt='b';resolve();await finished;assert.equal(updates,0);
 const oldFailure=gate.begin('b');gate.invalidate();assert.equal(oldFailure(),false);
});
test('only latest review request for the same attempt may update UI',async()=>{
 const {createReviewGate}=await helpers();const gate=createReviewGate(()=>'a');
 const first=gate.begin('a'),retry=gate.begin('a');assert.equal(first(),false);assert.equal(retry(),true);
});
test('changed current attempt invalidates reviews even without explicit cancel',async()=>{
 const {createReviewGate}=await helpers();let a='a';const current=createReviewGate(()=>a).begin(a);a='b';assert.equal(current(),false);
});
test('dashboard respects grade, shared reward slots and unknown status',async()=>{
 const {dashboardRows}=await helpers();const {missionOptions}=await import('../daily-missions/mission_options.mjs');
 const unknown=dashboardRows(rules,missionOptions('1'),null);assert.equal(unknown.length,6);assert(unknown.every(r=>r.state==='unknown'));
 assert.equal(unknown.find(r=>r.slot==='words').options.length,3);
 const two=dashboardRows(rules,missionOptions('2'),{missions:[{slot:'words',completed:true},{slot:'exam',completed:false}]});
 assert.deepEqual(two.map(r=>[r.slot,r.state]),[['words','completed'],['exam','open']]);
});
test('review displays server choices and randomized chunk IDs without changing answers',async()=>{
 const {answerText}=await helpers();const q={chunks:[{id:'uuid-b',text:'used to'},{id:'uuid-a',text:'got'}]};
 assert.equal(answerText(q,['uuid-a','uuid-b']),'got used to');assert.equal(answerText({choices:['a','b']},1),'b');
});
test('reuse explanations only for the exact issued question, with no filler',async()=>{
 const {explanationFor}=await import('../daily-missions/mission_explanations.mjs');
 const bank=[{id:'a',en:'Text',ja:'訳',note:'理由'}];
 assert.deepEqual(explanationFor(bank,{id:'a',prompt:'Text'}),{translation:'訳',notes:['理由']});
 assert.equal(explanationFor(bank,{id:'a',prompt:'Changed'}),null);
 assert.equal(explanationFor(bank,{id:'missing',prompt:'Text'}),null);
});
