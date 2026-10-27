const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('path');
const root=path.join(__dirname,'..');
class Node{
 constructor(tag='div'){this.tagName=tag;this.children=[];this.parentNode=null;this.dataset={};this.attributes={};this.style={};this.className='';this.textContent='';this.classList={add:(v)=>{this.className+=' '+v;}};}
 get isConnected(){return this.connected||!!this.parentNode?.isConnected;}
 append(...nodes){for(const n of nodes){n.remove();n.parentNode=this;this.children.push(n);}}
 remove(){if(this.parentNode){const p=this.parentNode;p.children.splice(p.children.indexOf(this),1);this.parentNode=null;}}
 replaceChildren(...nodes){for(const n of [...this.children])n.remove();this.append(...nodes);}
 insertBefore(n,ref){if(ref.parentNode!==this)throw Error('insertBefore: reference is not a child');n.remove();n.parentNode=this;this.children.splice(this.children.indexOf(ref),0,n);}
 setAttribute(k,v){this.attributes[k]=v;}getAttribute(k){return k==='src'?this.src:this.attributes[k];}
 querySelectorAll(q){const match=n=>q==='[data-id]'?!!n.dataset.id:q.startsWith('[data-id=')?n.dataset.id===q.slice(10,-2):q==='button'?n.tagName==='button':q.startsWith('.')?n.className.split(' ').includes(q.slice(1)):false;return this.children.flatMap(n=>[...(match(n)?[n]:[]),...n.querySelectorAll(q)]);}
 querySelector(q){return this.querySelectorAll(q)[0]||null;}
}
function harness(old=false){const nodes=new Map();const get=id=>{if(!nodes.has(id)){const n=new Node();n.connected=true;nodes.set(id,n);}return nodes.get(id);};const mem=new Map(),storage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)};
const ctx={console,URL,URLSearchParams,Date,JSON,Math,Set,localStorage:storage,sessionStorage:storage,GOIMONStorage:storage,GOIMONProfiles:{account:'guest'},GOIMON_CLOUD_CONFIG:{apiBase:''},GoimonChapter2Access:{current:()=>true},GoimonDex:{getEntry:()=>({name:'フェネ',image:'images/goimon/hirameki_child.png'})},document:{getElementById:get,createElement:t=>new Node(t)},setInterval:()=>1,clearInterval(){},addEventListener(){},getSelection:()=>({toString:()=>''})};ctx.window=ctx;vm.createContext(ctx);
for(const f of ['victory','catalog','core','story_names','question-routing','chapter_questions','chapter2_data','chapter2_assets','chapter2_portraits','chapter2_progress','chapter2_battle'])vm.runInContext(fs.readFileSync(path.join(root,'battle-prototype/'+f+'.js'),'utf8'),ctx);
let code=fs.readFileSync(path.join(root,'battle-prototype/chapter2.js'),'utf8');if(old)code=code.replace("state?.mode==='story'&&art?.parentNode===app","state?.mode==='story'&&art?.isConnected");code=code.replace('window.GoimonChapter2=Object.freeze','window.test={render,startBattle,get:()=>state,set:s=>{state=s;},finish:()=>{P.finish(state,D);render();}};window.GoimonChapter2=Object.freeze');vm.runInContext(code,ctx);return {ctx,get,old};}
const pet={id:'test',type:'hirameki',stage:'child',stats:{chie:0,kotoba:0,bunmyaku:0,onkan:0}};
function transition(h,scene){const {ctx,get}=h,s=ctx.GoimonChapter2Progress.fresh(ctx.GoimonChapter2Data,pet);s.scene=scene;s.line=ctx.GoimonChapter2Data.scenes[scene].lines.length;ctx.test.set(s);ctx.test.startBattle(false);assert.equal(get('app').querySelector('.stage').parentNode.className,'battle');s.combat.ended=true;s.combat.winner='player';ctx.test.render();const victory=get('app').querySelectorAll('button').find(n=>n.textContent==='物語の続きへ');assert.ok(victory);if(h.old)ctx.test.finish();else victory.onclick();assert.equal(get('app').querySelector('.stage').parentNode,get('app'));}
assert.throws(()=>transition(harness(true),1),/insertBefore/);console.log('PASS original nested-stage bug reproduced');
const h=harness();for(let i=0;i<h.ctx.GoimonChapter2Data.scenes.length;i++)if(h.ctx.GoimonChapter2Data.scenes[i].battleId)transition(h,i);console.log('PASS all 9 battle-to-story DOM transitions');
for(let i=0;i<h.ctx.GoimonChapter2Data.scenes.length;i++){const s=h.ctx.GoimonChapter2Progress.fresh(h.ctx.GoimonChapter2Data,pet);s.scene=i;h.ctx.test.set(s);h.ctx.test.render();const art=h.get('app').querySelector('.stage');assert.equal(!!art.querySelectorAll('[data-id]').find(n=>n.dataset.id==='morii'),h.ctx.GoimonChapter2Data.scenes[i].lines.some(l=>l.speaker==='モリィ'));h.ctx.test.render();assert.equal(h.get('app').querySelector('.stage'),art);assert.equal(!!h.get('app').querySelector('.narration-text'),!h.ctx.GoimonChapter2Data.scenes[i].lines[0].speaker);}
console.log('PASS 23 scene casts, persistent portraits and narration labels');

function at(scene,line=0){const s=h.ctx.GoimonChapter2Progress.fresh(h.ctx.GoimonChapter2Data,pet);s.scene=scene-1;s.line=line;h.ctx.test.set(s);h.ctx.test.render();return h.get('app').querySelector('.stage');}
assert.match(at(21,3).style.backgroundImage,/dry_canal/);
assert.match(at(21,4).style.backgroundImage,/restored_canal/);
for(let i=0;i<4;i++){const a=at(2,i);assert.ok(a.querySelector('[data-id="escape"]'));assert.equal(a.querySelector('[data-id="saya"]'),null);}
assert.equal(at(2,4).querySelector('[data-id="escape"]'),null);
for(const [name,scenes] of [['farmer',[4,21]],['manager',[6,12,13,21,22]]])for(const scene of scenes)assert.ok(at(scene).querySelector('[data-id="'+name+'"]'));
assert.match(at(19,5).querySelector('[data-id="morii"]').src,/surprised/);
assert.match(at(19,7).querySelector('[data-id="morii"]').src,/serious/);
assert.match(at(19,7).className,/enemy-boss/);
console.log('PASS restored-water timing, escape, NPC portraits, Morii and boss scale');
