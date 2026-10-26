const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const Bank=require('../battle-prototype/question_bank.js');
function load(file,globalKey){
  const context={window:{}};vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context,{filename:file});
  return context.window[globalKey];
}
const words=load('words_1kyu.js','WORDS_1KYU');
const idioms=load('idiom_data_1kyu.js','IDIOM_DATA_1KYU');
test('real source data loads and stage ranges stay inside 1–500',()=>{
 assert.equal(words.length,500);
 assert.ok(idioms.length>10);
 for(let i=1;i<=5;i++){
   const p=Bank.pool('単語',i,words,idioms);
   assert.equal(p.length,Bank.ranges[i-1][1]-Bank.ranges[i-1][0]+1);
   assert.equal(p[0].no,Bank.ranges[i-1][0]);
   assert.equal(p.at(-1).no,Bank.ranges[i-1][1]);
 }
});
test('all real stage questions provide four unique Japanese choices with exactly one answer',()=>{
 for(let i=1;i<=5;i++){
  for(const q of Bank.pool('単語',i,words,idioms)){
   const opts=Bank.options(q,i,words,idioms,()=>0.37);
   assert.equal(opts.length,4,q.en);
   assert.equal(new Set(opts).size,4,q.en);
   assert.equal(opts.filter(x=>x===q.ja).length,1,q.en);
  }
 }
});
test('idioms come from actual quiz dataset and never use duplicate meanings as distractors',()=>{
 const pool=Bank.pool('熟語',1,words,idioms);
 for(const q of pool){const opts=Bank.options(q,1,words,idioms,()=>0.2);assert.equal(opts.length,4,q.en);assert.equal(new Set(opts).size,4,q.en);assert.ok(opts.includes(q.ja));}
});
test('selected question cannot immediately repeat when alternatives exist',()=>{
 for(const kind of ['単語','熟語']){
  const first=Bank.select(kind,2,words,idioms,()=>0);
  const next=Bank.select(kind,2,words,idioms,()=>0,first.id);
  assert.notEqual(first.id,next.id);
 }
});
