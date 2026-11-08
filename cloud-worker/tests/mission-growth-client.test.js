import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {startHarness} from '../dev/server.js';
import {WordSession} from '../dev/word-session.js';
const key='zensho_goimon_current_v4_lv1';
async function answer(db,s){
 const row=await db.prepare('SELECT private_json FROM mission_attempts WHERE attempt_id=?').bind(s.attempt.attemptId).first();
 for(const [i,q]of JSON.parse(row.private_json).questions.entries()){s.choose(q.answer);if(i<19)s.next();}await s.submit();
}
test('Word growth client over isolated HTTP: three modes, lost write/read replies, immutable retry and no real rewards',async()=>{
 const h=await startHarness(0,{seedGrowth:true});try{
  let loseWrite=false,loseRead=false,failNextRead=false,posts=[];
  const request=async(path,body)=>{
   if(path==='missions/learning'&&failNextRead){failNextRead=false;throw Error('lost_read');}
   const r=await fetch(h.origin+'/api/v1/'+path,{method:body?'POST':'GET',headers:{Origin:h.origin,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})}),data=await r.json();
   if(!r.ok)throw Object.assign(Error(data.error),{status:r.status});
   if(path==='missions/growth/apply'){posts.push(structuredClone(body));if(loseWrite){loseWrite=false;throw Error('lost_write');}if(loseRead){loseRead=false;failNextRead=true;}}
   return data;
  };
  let expected=90;
  for(const mode of ['enja','jaen','audio']){
   const s=new WordSession(request,mode);await assert.rejects(s.saveGrowth(),/attempt_not_submitted/);
   await s.start();await answer(h.db,s);await s.saveLearning();
   if(mode==='enja'){
    loseWrite=true;await assert.rejects(s.saveGrowth(),/lost_write/);const pinned=structuredClone(s.growthPending);
    await assert.rejects(s.start(),/growth_retry_required/);await s.saveLearning(); // interleaved independent request
    const result=await s.saveGrowth();assert.equal(result.result.replayed,true);assert.deepEqual(posts.slice(-2),[pinned,pinned]);
   }else if(mode==='jaen'){
    loseRead=true;await assert.rejects(s.saveGrowth(),/lost_read/);assert.equal(s.growthPending,null);assert.equal(s.growthResult.growthApplied,true);
    const count=posts.length;await s.saveGrowth();assert.equal(posts.length,count);
   }else await s.saveGrowth();
   expected+=20;const state=await s.readGrowth(),g=JSON.parse(state.snapshot.data[key]);assert.equal(g.totalPoints,expected);assert.equal(g.stage,'egg');assert.equal(g.pendingEvolution,true);
   const count=posts.length;await s.saveGrowth();assert.equal(posts.length,count);
  }
  assert.equal((await request('economy')).state.shards,0);
  assert.equal((await h.db.prepare('SELECT COUNT(*) AS n FROM mission_growth_receipts').first()).n,3);
 }finally{await h.close();}
});
test('Definite revision rejection clears pending growth; ambiguous errors and concurrent operations preserve it',async()=>{
 let revision=1,posts=0,release;
 const s=new WordSession(async(path,body)=>{
  if(path==='missions/learning')return {revision};
  posts++;if(posts===1){revision=2;throw Object.assign(Error('learning_revision_conflict'),{status:409});}
  assert.equal(body.expectedRevision,2);await new Promise(resolve=>release=resolve);return {growthApplied:true,revision:3};
 },'enja');
 s.attempt={attemptId:'test_attempt_123456'};s.result={correct:20};
 await assert.rejects(s.saveGrowth(),/learning_revision_conflict/);assert.equal(s.growthPending,null);
 const pending=s.saveGrowth();await new Promise(resolve=>setImmediate(resolve));await assert.rejects(s.saveGrowth(),/request_pending/);await assert.rejects(s.start(),/request_pending/);release();await pending;assert.equal(posts,2);
});
// Lightweight DOM contract, not a browser or visual/layout/audio verification.
function fakeDOM(html){
 const nodes=[];class Node{
  constructor(){this.children=[];this.style={};this.classList={toggle(){}};this.attrs={};nodes.push(this);}
  setAttribute(k,v){this.attrs[k]=v;}before(){}after(){}
  append(...children){this.children.push(...children);}replaceChildren(...children){this.children=children;}
  querySelectorAll(){return this.children;}
 }
 const ids=Object.fromEntries([...html.matchAll(/id="([^"]+)"/g)].map(m=>[m[1],new Node()]));
 return {nodes,ids,document:{getElementById:id=>ids[id]||null,createElement:()=>new Node()}};
}
test('Actual word-page handlers expose growth only after grading and render confirmed state in all three pages',async()=>{
 const h=await startHarness(0,{seedGrowth:true});try{
  const source=(await readFile(new URL('../dev/word-page.js',import.meta.url),'utf8')).replace("import {WordSession} from './word-session.js';",'');
  for(const page of ['quiz.html','quiz_jaen.html','audio_quiz.html']){
   const html=await (await fetch(h.origin+'/'+page)).text(),dom=fakeDOM(html);
   const context={WordSession,document:dom.document,location:{pathname:'/'+page},window:{},fetch:(path,options)=>fetch(h.origin+path,{...options,headers:{...options.headers,Origin:h.origin}})};
   vm.runInNewContext(source,context);
   const byText=text=>dom.nodes.find(n=>n.textContent===text),growth=byText('育成へ反映（テスト）'),refresh=byText('テスト個体の状態を確認');
   assert.equal(growth.hidden,true);await refresh.onclick();assert.ok(dom.nodes.some(n=>n.textContent?.includes('育成テスト用たまご')));
   await (dom.ids.startTest||dom.ids.startBtn).onclick();
   const row=await h.db.prepare('SELECT private_json FROM mission_attempts ORDER BY rowid DESC LIMIT 1').first();
   for(const q of JSON.parse(row.private_json).questions){dom.ids.choices.children[q.answer].onclick();await (dom.ids.nextQ||dom.ids.nextBtn).onclick();}
   assert.equal(growth.hidden,false);assert.equal(growth.disabled,false);await growth.onclick();assert.equal(growth.hidden,true);
   assert.ok(dom.nodes.some(n=>n.textContent?.includes('進化可能（未確定）')));
   assert.ok(dom.nodes.some(n=>n.textContent?.includes('進化は自動確定しません')));
   if(page==='audio_quiz.html'){
    const evolve=byText('進化を確定（テスト）'),generation=byText('保存して次世代へ（テスト）');assert.equal(evolve.hidden,false);await evolve.onclick();assert.equal(evolve.hidden,true);
    assert.ok(dom.nodes.some(n=>n.textContent?.includes('進化を1段階確定')));
    const before=(await h.db.prepare('SELECT revision FROM saves').first()).revision;
    context.window.confirm=()=>false;await generation.onclick();assert.equal((await h.db.prepare('SELECT revision FROM saves').first()).revision,before);
    context.window.confirm=()=>true;await generation.onclick();assert.ok(dom.nodes.some(n=>n.textContent?.includes('次世代のたまごを作りました')));
    const snapshot=JSON.parse((await h.db.prepare('SELECT save_json FROM saves').first()).save_json);assert.equal(JSON.parse(snapshot.data[key]).generation,2);assert.equal(JSON.parse(snapshot.data.zensho_goimon_archive_v4_lv1)[0].stage,'child');
   }
  }
 }finally{await h.close();}
});
test('Companion client retries the original action after lost replies, never advancing twice or duplicating eggs',async()=>{
 const h=await startHarness(0,{seedGrowth:true});try{
  let lose=false;const sent=[];
  const request=async(path,body)=>{
   const r=await fetch(h.origin+'/api/v1/'+path,{method:body?'POST':'GET',headers:{Origin:h.origin,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})}),data=await r.json();
   if(!r.ok)throw Object.assign(Error(data.error),{status:r.status});
   if(path==='missions/companion/action'){sent.push(structuredClone(body));if(lose){lose=false;throw Error('lost_response');}}
   return data;
  };
  const s=new WordSession(request,'enja');await s.start();await answer(h.db,s);await s.saveGrowth();
  for(const action of ['evolve','new-generation']){
   const shown=await s.readGrowth();lose=true;await assert.rejects(s.companionAction(action,shown),/lost_response/);const original=structuredClone(s.companionPending);
   await assert.rejects(s.start(),/companion_retry_required/);await assert.rejects(s.saveGrowth(),/companion_retry_required/);
   await assert.rejects(s.companionAction(action==='evolve'?'new-generation':'evolve',shown),/companion_retry_required/);
   // Even a refreshed screen must not alter the pending target/revision/operation.
   const latest=await s.readGrowth(),result=await s.companionAction(action,latest);assert.equal(result.replayed,true);assert.deepEqual(sent.slice(-2),[original,original]);
  }
  const final=await s.readGrowth();assert.equal(JSON.parse(final.snapshot.data[key]).generation,2);const archived=JSON.parse(final.snapshot.data.zensho_goimon_archive_v4_lv1);assert.equal(archived.length,1);assert.equal(archived[0].stage,'child');assert.equal(archived[0].totalPoints,110);
 }finally{await h.close();}
});
