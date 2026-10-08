// Run: node tests/progress.test.cjs (Node built-ins only)
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),source=f=>fs.readFileSync(path.join(root,f),'utf8');
const data={},storage={getItem:k=>data[k]??null,setItem:(k,v)=>data[k]=v,removeItem:k=>delete data[k]};
const c={localStorage:storage,console,Date,URLSearchParams};c.GOIMONStorage=storage;c.window=c;vm.createContext(c);
for(const f of ['words_1kyu.js','words_2kyu.js','blocks_1kyu.js','blocks_2kyu.js','q7_data.js','listening_type2_1kyu.js','listening_type3_1kyu.js','listening_type5_1kyu.js','learning_categories.js','listening_progress.js','progress_data.js'])vm.runInContext(source(f),c);
const D=c.ProgressData,put=(k,v)=>storage.setItem(k,JSON.stringify(v));
assert.equal(D.status(0,0,80),'untouched');assert.equal(D.status(19,19,80),'learning');assert.equal(D.status(20,16,80),'clear');assert.equal(D.status(20,15,80),'needs_review');assert.equal(D.status(200,159,80),'needs_review');
assert(D.blocks('1',80).every(x=>x.state==='untouched'));assert(D.blocks('2',80).every(x=>x.state==='untouched'));
const rec={studyDone:1};for(const [a,b] of D.modes){rec[a]=20;rec[b]=16;}
put('zensho_block_global_lv1_v1',{byBlock:{1:rec}});assert.equal(D.blocks('1',80)[0].state,'clear');
rec.quizCorrect=10;put('zensho_block_global_lv1_v1',{byBlock:{1:rec}});let b=D.blocks('1',80)[0];assert.equal(b.state,'needs_review');assert.equal(b.action.page,'quiz.html');assert.equal(D.blocks('2',80)[0].state,'untouched');
rec.studyDone=0;rec.audioAttempted=0;put('zensho_block_global_lv1_v1',{byBlock:{1:rec}});assert.equal(D.blocks('1',80)[0].action.page,'quiz.html');
// Q7: only actual SET IDs; never reconstruct a fictitious cumulative accuracy.
const id=c.q7Sets[0].id;put('q7SetHistory_v1',{[id]:{attempts:3,bestScore:5,lastScore:2,passed:true},removed:{attempts:99,bestScore:5}});
assert.equal(D.q7().passed,1);assert.equal(D.q7().attempts,3);assert.equal(D.q7().sets[0].last,2);
// Legacy listening counts and method counts must not be added twice.
put('zensho_listening_attempts_v1_lv1',{L2_001:3,L3_001:2});put('zensho_listening_method_attempts_v1_lv1',{L2_001:{quiz:3,shadowing:2}});
let l=D.listening('1',80);assert.equal(l[0].quiz,3);assert.equal(l[0].practice,2);assert.equal(l[0].touched,1);assert.equal(l[0].rate,null);assert.equal(l[1].quiz,2);assert.equal(l[2].state,'pending');assert.equal(l[4].state,'pending');
for(let i=0;i<20;i++)c.ListeningProgress.record('1',2,i<16);
l=D.listening('1',80);assert.equal(l[0].rate,80);assert.equal(l[0].state,'clear');assert.equal(l[1].judged,0);assert.equal(data.zensho_learning_log_v1_lv1,undefined);
c.ListeningProgress.record('1',5,true);c.ListeningProgress.record('1',5,false);assert.equal(D.listening('1',80)[3].judged,2);
c.ListeningProgress.record('2',2,true);assert.equal(data.zensho_listening_progress_v1_lv2,undefined);
put('zensho_learning_log_v1_lv1',{'2026-10-07':{q10:{attempt:21,correct:16,wrong:4},listening:{attempt:999,correct:999,wrong:0}}});
assert.equal(D.exams('1',80).find(x=>x.key==='q10').rate,80);assert(!D.exams('1',80).some(x=>x.key==='listening'));
// Exercise the real range functions extracted from each destination page.
for(const [file,bs,start,end] of [['accent.js','blocks','rangeStartEl','rangeEndEl'],['sentence.js','blocks','rangeStartInput','rangeEndInput'],['audio_quiz.js','BLOCKS','rangeStart','rangeEnd']]){
 const fn=source(file).match(/function applyProgressRangeQuery\(\) \{[\s\S]*?\n  \}/)[0];const checks=[1,2,3].map(value=>({value:String(value),checked:true}));
 const env={URLSearchParams,location:{search:'?start=51&end=100'},blockSelect:{querySelectorAll:()=>checks},[bs]:[{id:1,start:1,end:50},{id:2,start:51,end:100},{id:3,start:101,end:150}],[start]:{},[end]:{}};
 vm.createContext(env);vm.runInContext(fn+';applyProgressRangeQuery()',env);assert.equal(env[start].value,'51');assert.equal(env[end].value,'100');assert.deepEqual(checks.map(x=>x.checked),[false,true,false]);
}
// Actual listening recording hook updates the new breakdown and calls the old log once.
const hook=source('listening.js').slice(source('listening.js').indexOf('  function addLearningLog(')).split('  // ============================================================')[0];
let oldCalls=0;c.currentQuestion={format:3};c.lv='1';c.zenshoLogAdd=()=>oldCalls++;vm.runInContext(hook+';addLearningLog(true)',c);assert.equal(oldCalls,1);assert.equal(c.ListeningProgress.read('1')[3].correct,1);
// Stub DOM exercises rendering, all filters/views, level switch, reset cancellation and scope.
const nodes={},viewButtons=['blocks','exams','listening'].map(view=>({dataset:{view}})),filterButtons=['all','needs_review','learning','untouched','clear'].map(filter=>({dataset:{filter}}));
function element(e={}){return Object.assign(e,{value:'80',textContent:'',innerHTML:'',events:{},setAttribute(k,v){this[k]=v},addEventListener(k,f){this.events[k]=f}})}
viewButtons.forEach(element);filterButtons.forEach(element);
const ids=[...source('progress.html').matchAll(/id="([^"]+)"/g)].map(x=>x[1]);ids.forEach(id=>nodes[id]=element());
c.document={getElementById:id=>nodes[id],querySelectorAll:s=>s==='[data-view]'?viewButtons:filterButtons,addEventListener:(e,f)=>{if(e==='DOMContentLoaded')c.boot=f}};c.addEventListener=()=>{};c.confirm=()=>false;
vm.runInContext(source('progress.js'),c);c.boot();assert(nodes.cards.innerHTML.includes('Block 1'));
for(const view of viewButtons){view.events.click();for(const f of filterButtons)f.events.click();}
viewButtons[1].events.click();assert(nodes.cards.innerHTML.includes('大問7'));assert(nodes.cards.innerHTML.includes('要復習'));
viewButtons[2].events.click();assert(nodes.cards.innerHTML.includes('大問2'));assert.equal((nodes.cards.innerHTML.match(/準備中です/g)||[]).length,2);
nodes.lv2.events.click();assert(!nodes.cards.innerHTML.includes('大問2'));assert.equal(storage.getItem('zensho_level_v1'),'2');
nodes.lv1.events.click();const before=data.zensho_block_global_lv1_v1;nodes.resetGlobal.events.click();assert.equal(data.zensho_block_global_lv1_v1,before);
const keep={...data};c.confirm=()=>true;nodes.resetGlobal.events.click();assert.equal(data.zensho_block_global_lv1_v1,undefined);for(const k of Object.keys(keep).filter(k=>k!=='zensho_block_global_lv1_v1'))assert.equal(data[k],keep[k]);
nodes.passLine.value='150';nodes.passLine.events.change();assert.equal(nodes.passLine.value,'100');nodes.passLine.value='';nodes.passLine.events.change();assert.equal(nodes.passLine.value,'80');
console.log('PASS: boundaries, per-level storage, review priority, Q7 legacy history, listening legacy counts/new grading, destination ranges, UI filters/tabs, reset scope, input validation.');
// Shared block recorder feeds the dashboard correctly for both levels.
vm.runInContext(source('global_stats.js'),c);
for(const lv of ['1','2']) {
  storage.setItem('zensho_level_v1',lv);
  const key=`zensho_block_global_lv${lv}_v1`;storage.removeItem(key);
  c.GlobalStats.addStudy(2);
  for(const name of ['addQuizEnJa','addQuizJaEn','addAccent','addSentence','addAudio']) {
    c.GlobalStats[name](2,true);c.GlobalStats[name](2,false);
  }
  const block=D.blocks(lv,80)[1];assert.equal(block.study,1);
  for(const item of block.items){assert.equal(item.attempt,2);assert.equal(item.correct,1);assert.equal(item.rate,50);assert.equal(item.state,'learning');}
}
// Real answer handlers guard repeated grading before the logging hook.
const listen=source('listening.js');
assert.match(listen,/function checkType5Answers\(\) \{\s*if \(\s*answered \|\|/);
assert.match(listen,/function answerQuiz\(\s*selectedId\s*\) \{\s*if \(\s*!currentQuestion \|\|\s*answered/);
const qsource=source('q7_page.js');assert.match(qsource,/function grade\(\) \{\s*if \(!current \|\| state.graded\) return;/);
// The deep link overrides the previous listening format after saved settings.
const route=listen.match(/const requestedFormat = new URLSearchParams[\s\S]*?\n  updatePoolInfo\(\);/)[0];
for(const format of ['2','3','5']){let updated=0;const env={URLSearchParams,location:{search:'?format='+format},formatSelect:{value:'3'},setSelectedMethod:m=>assert.equal(m,'quiz'),updatePoolInfo:()=>updated++};vm.createContext(env);vm.runInContext(route,env);assert.equal(env.formatSelect.value,format);assert.equal(updated,1);}
// Every script used by the rewritten page is available and loads in declared order.
const fresh={crypto:require("node:crypto").webcrypto,addEventListener(){},window:null,console,Date,URLSearchParams,localStorage:storage,document:{addEventListener:()=>{}}};fresh.window=fresh;vm.createContext(fresh);
for(const [,file] of source('progress.html').matchAll(/<script src="([^"]+)"/g))vm.runInContext(source(file),fresh);
assert(fresh.BLOCKS_2KYU.length>0);assert(fresh.q7Sets.length>0);
console.log('PASS: shared recorders, repeat-grading guards, listening format routing, complete page script loading.');
