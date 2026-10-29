const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const S=require('../battle-prototype/chapter_store.js'),P=require('../battle-prototype/chapter2_progress.js'),T=require('../battle-prototype/tutorial.js');
const D1=require('../battle-prototype/chapter1_data.js'),D2=require('../battle-prototype/chapter2_data.js');
const pet={id:'p',type:'hirameki',stage:'child',stats:{chie:4}};
function first(){return {...P.fresh(D1,pet),tutorial:T.create()};}
test('only egg, child and growth can join; missing and unknown stages fail closed',()=>{
 for(const stage of ['egg','child','growth'])assert.equal(S.eligible({...pet,stage}),true);
 for(const stage of ['mid','final',undefined,'future']){assert.equal(S.eligible({...pet,stage}),false);assert.throws(()=>S.assertEligible({...pet,stage}));}
 assert.equal(S.eligible(null),false);
});
test('chapter 1 restart from story, practice gift, battle, defeat and complete preserves accomplishments and one-time gift',()=>{
 for(const mode of ['story','gift','battle','defeat','complete']){
 const old=first();Object.assign(old,{mode,revision:9,scene:6,read:[D1.scenes[0].lines[0].id],cleared:[1,'mist'],completed:true,combat:{player:{hp:0}},checkpoint:{hp:10}});
 Object.assign(old.tutorial,{practice:3,trained:true,claimed:true,shards:0,item:{id:'N_guard'},equipped:true,complete:true});
 const before=JSON.stringify(old),next=S.restart(old,D1,first());
 assert.equal(JSON.stringify(old),before);assert.equal(next.scene,0);assert.equal(next.line,0);assert.equal(next.mode,'story');assert.equal(next.revision,9);
 assert.deepEqual(next.read,old.read);assert.deepEqual(next.cleared,old.cleared);assert.equal(next.completed,true);
 for(const field of ['run','combat','checkpoint','question','feedback'])assert.equal(next[field],null);
 assert.equal(next.tutorial.practice,0);assert.equal(next.tutorial.trained,false);assert.equal(next.tutorial.claimed,true);assert.deepEqual(next.tutorial.item,old.tutorial.item);
 assert.throws(()=>T.claim(next.tutorial));assert.throws(()=>S.restart(old,D1,{...first(),pet:{...pet,stage:'mid'}}));
 }
});
test('chapter 2 restart also preserves completed unlock while clearing current battle from a loss',()=>{
 const old=P.fresh(D2,pet);old.scene=D2.scenes.findIndex(s=>s.battleId);old.line=D2.scenes[old.scene].lines.length;old.battleId=D2.scenes[old.scene].battleId;old.mode='defeat';old.combat={player:{hp:0}};old.checkpoint={hp:40};old.completed=true;old.cleared=[1];old.read=[D2.scenes[0].lines[0].id];
 const before=JSON.stringify(old),next=P.restart(old,D2,pet);assert.equal(JSON.stringify(old),before);assert.equal(next.scene,0);assert.equal(next.mode,'story');assert.equal(next.completed,true);assert.deepEqual(next.cleared,[1]);assert.equal(next.combat,null);
});
test('restart is saved with compare-before-write and leaves other learning/inventory keys untouched',()=>{
 const old=first(),key='quest',mem=new Map([[key,JSON.stringify(old)],['learning','keep'],['items','keep']]);const storage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)};
 const store=S.create(storage,key,D1),next=S.restart(store.load(),D1,first());store.save(next);assert.equal(next.revision,1);assert.equal(mem.get('learning'),'keep');assert.equal(mem.get('items'),'keep');
 mem.set(key,'external update');assert.throws(()=>store.save(S.restart(next,D1,first())),/別のタブ/);assert.equal(mem.get(key),'external update');
});
test('both chapters enforce eligibility on resume and battle start and expose restart without completion gate',()=>{
 for(const n of [1,2]){const source=fs.readFileSync(`battle-prototype/chapter${n}.js`,'utf8');assert.match(source,/filter\(GoimonChapterStore.eligible\)/);assert.match(source,/assertEligible\(state.pet\)/);assert.match(source,/eligible\(state.pet\)/);assert.match(source,/\$\('restartRun'\).onclick/);assert.match(source,/if\(restart&&!confirm/);}
 const first=fs.readFileSync('battle-prototype/chapter1.js','utf8');assert.doesNotMatch(first,/state.scene=6/);assert.doesNotMatch(first,/教習と練習装備を終えてから/);
 const second=fs.readFileSync('quest_chapter2.html','utf8');assert.match(second,/id="restartRun"/);
});
