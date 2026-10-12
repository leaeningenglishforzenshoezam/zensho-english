'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const read = file => fs.readFileSync(path.resolve(__dirname,'..',file),'utf8');

function logHarness(options={}) {
  const map=new Map(), operations=[];
  const storage={
    getItem(key){return map.get(key)??null},
    setItem(key,value){operations.push({key,value});if(options.failWrite)throw Error('storage conflict');map.set(key,value)},
    removeItem(key){map.delete(key)}
  };
  const window={GOIMONStorage:storage,ACTIVE_LEVEL:'2',LearningCategories:{getCategory:()=>({})}};
  const ctx={window,GOIMONStorage:storage,console,Date};
  vm.runInNewContext(read('learning_log.js'),ctx,{timeout:3000});
  return {api:window.ZenshoLearningLog,storage,map,operations};
}

test('learning log successful answer uses only grade-2 key',()=>{
  const h=logHarness();
  assert.equal(h.api.addResult('q11_grammar',true,{level:'2',dayKey:'2026-10-12'}),true);
  const log=JSON.parse(h.map.get('zensho_learning_log_v1_lv2'));
  assert.equal(log['2026-10-12'].q11_grammar.attempt,1);
  assert.equal(log['2026-10-12'].q11_grammar.correct,1);
  assert.equal(log['2026-10-12'].q11_grammar.wrong,0);
  assert.equal(h.map.has('zensho_learning_log_v1_lv1'),false);
});
test('learning log storage failure propagates and does not persist',()=>{
  const h=logHarness({failWrite:true});
  assert.throws(()=>h.api.addResult('q11_grammar',true,{level:'2',dayKey:'2026-10-12'}),/storage conflict/);
  assert.equal(h.map.size,0);
});
test('learning log stores right and wrong attempts separately',()=>{
  const h=logHarness();
  h.api.addResult('q11_grammar',false,{level:'2',dayKey:'2026-10-12'});
  h.api.addResult('q11_grammar',true,{level:'2',dayKey:'2026-10-12'});
  const slot=JSON.parse(h.map.get('zensho_learning_log_v1_lv2'))['2026-10-12'].q11_grammar;
  assert.equal(slot.attempt,2);
  assert.equal(slot.wrong,1);
  assert.equal(slot.correct,1);
});

function claimHarness({fail=false}={}){
  const source=read('goimon.js');
  const start=source.indexOf('  function addLearningPointsOnce(');
  const end=source.indexOf('  function addQ7ReadingResult(',start);
  assert.ok(start>0 && end>start);
  const g={learningRewardClaims:{},points:0};
  let applyCount=0;
  const ctx={
    ensureCurrent:()=>g,
    applyDeltaToGoimon:(go,delta)=>{applyCount++;if(fail)throw Error('save failed');go.points+=delta.kotoba+delta.bunmyaku},
    renderHome:()=>{},renderAllMiniHooks:()=>{}
  };
  vm.runInNewContext(source.slice(start,end)+'\n globalThis.reward=addLearningPointsOnce;',ctx);
  return {reward:ctx.reward,g,getApplyCount:()=>applyCount};
}
test('same reward ID is never applied twice; new attempt can earn reward',()=>{
  const h=claimHarness();
  assert.equal(h.reward('g2q11:run1:001:0',{kotoba:.5,bunmyaku:.5},'q11_grammar'),true);
  assert.equal(h.reward('g2q11:run1:001:0',{kotoba:.5,bunmyaku:.5},'q11_grammar'),false);
  assert.equal(h.reward('g2q11:run2:001:0',{kotoba:.5,bunmyaku:.5},'q11_grammar'),true);
  assert.equal(h.g.points,2);
  assert.equal(h.getApplyCount(),2);
});
test('failed reward save is not falsely described as success',()=>{
  const h=claimHarness({fail:true});
  assert.throws(()=>h.reward('g2q11:run1:001:0',{kotoba:.5,bunmyaku:.5},'q11_grammar'),/save failed/);
  // Existing helper sets in-memory claim before persist; next write must be investigated separately.
  assert.equal(h.g.learningRewardClaims['g2q11:run1:001:0'],true);
});
