const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..'),source=fs.readFileSync(path.join(root,'study_focus.js'),'utf8');
function fixture(reorder=false){
  class N{
    constructor(tag='div',id='',text=''){this.tagName=tag;this.id=id;this.children=[];this.dataset={};this._text=text;this.disabled=false;this.classes=new Set();this.classList={add:(x)=>this.classes.add(x),contains:(x)=>this.classes.has(x),toggle:(x,on)=>on?this.classes.add(x):this.classes.delete(x)};}
    get textContent(){return this._text+this.children.map(x=>x.textContent).join('');}set textContent(t){this._text=t;this.children=[];}
    append(...nodes){nodes.forEach(n=>{n.remove();n.parentElement=this;this.children.push(n);});}
    remove(){if(this.parentElement){const a=this.parentElement.children;a.splice(a.indexOf(this),1);}this.parentElement=null;}
    prepend(n){this.append(n);this.children.unshift(this.children.pop());}
    before(n){const p=this.parentElement;n.remove();n.parentElement=p;p.children.splice(p.children.indexOf(this),0,n);}
    after(n){const p=this.parentElement;n.remove();n.parentElement=p;p.children.splice(p.children.indexOf(this)+1,0,n);}
    querySelector(s){return this.querySelectorAll(s)[0]||null;}
    querySelectorAll(s){const all=this.children.flatMap(n=>[n,...n.querySelectorAll('*')]);return s==='*'?all:all.filter(n=>s.startsWith('#')?n.id===s.slice(1):s.split(',').some(k=>n.classes.has(k.trim().slice(1))));}
    getClientRects(){return [1];}getBoundingClientRect(){return {top:100};}scrollIntoView(){}
  }
  const box=new N('div','playBox'),el=(id,text='',parent=box)=>{const n=new N('div',id,text);parent.append(n);return n;};
  const stats=el('stats','今回：0/10（正解 0）'),meta=el('qMeta','番号1'),next=el('nextBtn');next.disabled=true;
  el('backBtn','設定へ');
  let review;
  if(reorder){const bank=el('bank');el('chunkBank','cards',bank);const slots=el('slots');el('answerSlots','chosen',slots);el('hintBtn');el('resetBtn');el('checkBtn');}else el('choices','choices');
  const result=el('result'),detail=el('detail');
  const updates=[];const context={window:{},document:{readyState:'complete',getElementById:id=>id==='playBox'?box:box.querySelector('#'+id),createElement:tag=>new N(tag),createComment:()=>new N('comment')},location:{pathname:reorder?'/reorder.html':'/accent.html'},MutationObserver:class{constructor(fn){updates.push(fn);}observe(){}},requestAnimationFrame:fn=>fn(),innerHeight:844};
  vm.runInNewContext(source,context);review=box.children.find(n=>n.className==='study-focus-review');
  return {box,stats,next,result,detail,review,update:updates[0],counter:context.window.StudyFocus.counter};
}
test('progress stays on answered question and increments only for next question',()=>{const {counter}=fixture();assert.equal(counter('今回：4/50（正解 4）','',true),'4 / 50問 · 正解 4');assert.equal(counter('今回：4/50（正解 4）','',false),'5 / 50問 · 正解 4');assert.equal(counter('今回：4/50（正解 4）','第4問 / 50問',true),'4 / 50問 · 正解 4');assert.equal(counter('第3問 / 10問 ・ 正解 2問 ・ 出題順：順番','',false),'3 / 10問 · 正解 2');});
test('feedback moves above choices and restores for next question without replacing nodes',()=>{const d=fixture(),choices=d.box.querySelector('#choices');d.result.textContent='correct';d.detail.textContent='translation';d.next.disabled=false;d.update();assert.ok(d.box.children.indexOf(d.detail)<d.box.children.indexOf(choices));d.result.textContent='';d.detail.textContent='';d.next.disabled=true;d.update();assert.ok(d.box.children.indexOf(choices)<d.box.children.indexOf(d.result));});
test('incomplete reorder is not collapsed; completed answer collapses and next restores cards',()=>{const d=fixture(true);d.result.textContent='まだ並び終わっていません';d.update();assert.equal(d.review.open,true);d.detail.textContent='explanation';d.next.disabled=false;d.update();assert.equal(d.review.open,false);assert.ok(d.box.children.indexOf(d.detail)<d.box.children.indexOf(d.review));d.next.disabled=true;d.detail.textContent='';d.result.textContent='';d.update();assert.equal(d.review.open,true);});
test('reorder actions remain above cards and feedback before and after answering',()=>{const d=fixture(true),bar=d.box.children.find(n=>n.className==='study-focus-answer-tools');assert.deepEqual(bar.children.map(n=>n.id),['hintBtn','resetBtn','checkBtn','nextBtn']);assert.ok(d.box.children.indexOf(bar)<d.box.children.indexOf(d.review));d.result.textContent='correct';d.detail.textContent='translation';d.next.disabled=false;d.update();assert.equal(d.next.parentElement,bar);assert.ok(d.box.children.indexOf(bar)<d.box.children.indexOf(d.result));assert.equal(d.review.open,false);});
test('eight quiz pages load helper after quiz code, once, and no persistence APIs are used',()=>{for(const page of ['quiz','quiz_jaen','audio_quiz','accent','sentence','reorder','idiom_quiz','paraphrase_quiz']){const html=fs.readFileSync(path.join(root,page+'.html'),'utf8');assert.equal(html.split('src="study_focus.js"').length,2);assert.ok(html.indexOf('src="study_focus.js"')>html.indexOf('src="'+page+'.js"'));assert.ok(html.includes('href="study_focus.css"'));}assert.doesNotMatch(source,/localStorage|setItem|fetch\(/);});
