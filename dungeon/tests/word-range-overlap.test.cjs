const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const source=fs.readFileSync(path.join(__dirname,'../rogue_dungeon1.js'),'utf8');
const segment=(start,end)=>{
  const from=source.indexOf(start),to=source.indexOf(end,from);
  assert(from>=0&&to>from,`${start} must exist`);
  return source.slice(from,to);
};

const ranges=segment('  function actWordRange(act){','  function saveCheckpoint(){');
const wordState={act:1};
const wordContext=vm.createContext({state:wordState,questionBank:()=>({words:Array(550)})});
vm.runInContext(`${ranges}\nthis.range=wordRangeForFight;`,wordContext);

for(const [count,expected] of [
  [550,[[1,45],[16,75],[46,105],[76,135],[106,165],[136,180]]],
  [500,[[1,41],[14,68],[41,95],[68,122],[95,149],[122,164]]]
]){
  wordContext.questionBank=()=>({words:Array(count)});
  const bounds=Array.from(wordContext.range(1,0,false));
  assert.equal(bounds[0],0,`${count}-word bank must start at No.1`);
  for(let act=1;act<=3;act++){
    const actRanges=Array.from({length:6},(_,i)=>Array.from(wordContext.range(act,i,i===5)));
    const previousActEnd=act===1?0:Math.round(count*(act===2?180:360)/550);
    const currentActEnd=act===3?count:Math.round(count*(act===1?180:360)/550);
    assert.equal(actRanges[0][0],previousActEnd,`ACT ${act} begins at its own boundary`);
    assert.equal(actRanges[5][1],currentActEnd,`ACT ${act} boss ends at its own boundary`);
    for(let i=0;i<6;i++){
      const [from,to]=actRanges[i];
      assert(from>=previousActEnd&&to<=currentActEnd,`ACT ${act} fight ${i+1} stays in range`);
      assert(to>from,`ACT ${act} fight ${i+1} has a nonempty pool`);
      if(i)assert(to>actRanges[i-1][1]&&from<actRanges[i-1][1],`ACT ${act} adjacent fights overlap but advance`);
    }
    if(act===1){
      const actual=actRanges.map(([from,to])=>[from+1,to]);
      assert.deepEqual(actual,expected,`${count}-word ACT 1 uses the planned overlapping windows`);
    }
    const optionalSixth=Array.from(wordContext.range(act,5,false));
    assert.equal(optionalSixth[0],previousActEnd,'optional sixth fight continues to review previous ranges');
  }
}

const draw=segment('  function drawEncounterWord(words,wordNumber){','  function makeQuestion(format,excludeStems=[]){');
const words=Array.from({length:6},(_,i)=>({en:`word${i}`,ja:`意味${i}`}));
const wordNumber=new Map(words.map((w,i)=>[w.en,i+1]));
const state={encounterWordRange:[0,6],seenWords:[0,1,2],wordQueue:[]};
let randomValues=[];
const controlledMath=Object.create(Math);
controlledMath.random=()=>randomValues.shift()??0;
const context=vm.createContext({state,Math:controlledMath,shuffled:pool=>pool.slice(),random:pool=>pool[0]});
vm.runInContext(`${draw}\nthis.draw=drawEncounterWord;`,context);
const take=(categoryRandom)=>{
  randomValues=[categoryRandom,0];
  return context.draw(words,wordNumber).en;
};

assert.equal(take(.69),'word3','70% branch prefers a never-asked word');
assert.equal(take(.70),'word0','30% branch prefers a previously asked word');
assert.equal(state.wordQueue.length,4,'chosen words are consumed without replacement');
assert.equal(take(.1),'word4','unseen words are still preferred when available');
assert.equal(take(.8),'word1','review words remain available');
assert.equal(take(.1),'word5');
assert.equal(take(.1),'word2','when unseen words run out, review pool is the fallback');
assert.equal(state.wordQueue.length,0);
assert.equal(take(.95),'word0','an emptied pool is replenished for a long fight');

state.wordQueue=words.slice(3);
assert.equal(take(.95),'word3','when review words are absent, the unseen pool is the fallback');

console.log('Overlapping ACT vocabulary windows and 70/30 seen-word selection: OK');
