const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
class Element{
 constructor(tag){this.tagName=tag;this.dataset={};this.children=[];this.attributes={};this.textContent='';this.disabled=false;}
 append(...nodes){this.children.push(...nodes);}replaceChildren(...nodes){this.children=[...nodes];}setAttribute(k,v){this.attributes[k]=v;}focus(){}scrollIntoView(){}
}
function dom(){const c={TextEncoder,document:{createElement:t=>new Element(t)},location:{href:'https://example.test/quest_chapter2.html',pathname:'/quest_chapter2.html'},URL,console,GoimonChapterQuestions:require('../battle-prototype/chapter_questions.js')};c.window=c;vm.createContext(c);for(const path of ['quest-review.js','quest-learning.js'])vm.runInContext(fs.readFileSync('battle-prototype/'+path,'utf8'),c);return c;}
function all(n){return [n,...n.children.flatMap(all)];}function button(n,text){const b=all(n).find(x=>x.tagName==='button'&&x.textContent===text);assert(b,text);return b;}function press(n,text){const b=button(n,text);assert(!b.disabled);b.onclick();}
const question={id:'word_1kyu_001',format:'word_meaning',prompt:'income',answer:'収入',choices:['支出','収入','利益','価格'],review:'quiz.html',reviewId:1};
test('chapter 2 idioms use display numbers and return to chapter 2; chapter 1 is preserved',()=>{const c=dom();c.IDIOM_DATA_1KYU=[{id:'IM001'},{id:'IM042',displayNo:42}];let u=new URL(c.GoimonQuestReview.studyUrl('idiom_quiz.html',['IM001','IM042']),'https://example.test');assert.equal(u.searchParams.get('reviewIds'),'1,42');assert.equal(u.searchParams.get('returnTo'),'quest_chapter2.html');assert.equal(u.searchParams.get('idiomMode'),'synonym');c.location.pathname='/quest_chapter1.html';u=new URL(c.GoimonQuestReview.studyUrl('quiz.html',[1]),'https://example.test');assert.equal(u.searchParams.get('returnTo'),'quest_chapter1.html');assert.throws(()=>c.GoimonQuestReview.studyUrl('https://other.test',[]));});
test('records all unique missed questions without changing combat HP, skills or original question',()=>{const c=dom(),b={player:{hp:9,skills:[{left:1}]},log:[]},original=JSON.stringify(question);for(let i=0;i<20;i++){const q={...question,id:'word'+i,reviewId:i};c.GoimonQuestLearning.record(b,q,false,false,null);c.GoimonQuestLearning.record(b,q,false,false,null);}assert.equal(b.learning.questions.length,20);assert.equal(b.learning.misses.length,20);assert.equal(b.player.hp,9);assert.equal(b.player.skills[0].left,1);assert.equal(JSON.stringify(question),original);const restored=JSON.parse(JSON.stringify(b));assert.equal(restored.learning.questions[0].choices.length,4);});
test('summary counts answers, not unique missed questions, and supports legacy saves',()=>{const c=dom();const s=c.GoimonQuestLearning.summary({log:[{correct:false},{correct:false},{correct:true}]});assert.equal(s.total,3);assert.equal(s.correct,1);assert.equal(s.questions.length,0);});
test('short practice grades once, can exit, and never mutates combat or grants rewards',()=>{const c=dom(),b={log:[{correct:false}],player:{hp:7}},parent=new Element('div');c.GoimonQuestLearning.record(b,question,false,false,{completed:'income',translation:'収入',notes:['例文を確認']});const before=JSON.stringify(b);let continued=0;c.GoimonQuestLearning.result(parent,b,{onContinue:()=>continued++});press(parent,'単語 · 1問');const answer=button(parent,'収入');answer.onclick();answer.onclick();press(parent,'復習の結果へ');assert(all(parent).some(n=>n.textContent==='1 / 1問 正解'));press(parent,'戦闘結果へ戻る');assert.equal(JSON.stringify(b),before);const next=button(parent,'物語の続きへ');next.onclick();next.onclick();assert.equal(continued,1);});
test('reorder controls precede choices; grading removes choices and shows explanation',()=>{const c=dom(),box=new Element('div'),q={format:'q12',prompt:'彼は（　）。',answer:['a','b'],chunks:[{id:'a',text:'is'},{id:'b',text:'kind'}],explanation:{completed:'He is kind.',translation:'彼は親切です。',notes:[]}};c.GoimonQuestLearning.practice(box,[q],{onExit(){}});assert(button(box,'答え合わせ').disabled);press(box,'kind');press(box,'並びをリセット');press(box,'is');press(box,'kind');press(box,'答え合わせ');assert(!all(box).some(n=>n.tagName==='button'&&n.textContent==='kind'));assert(all(box).some(n=>n.textContent==='正答：is kind'));assert(all(box).some(n=>n.textContent==='訳・解説を見る'));});
test('new saved learning payload remains accepted without changing schema or unrelated records',()=>{const c=dom();vm.runInContext(fs.readFileSync('cloud_schema.js','utf8'),c);const b={log:[{correct:false}]};c.GoimonQuestLearning.record(b,question,false,true,null);const s={version:1,scriptVersion:'test',revision:1,scene:0,line:0,partnerId:'p',read:[],cleared:[],mode:'battle',combat:b};assert.doesNotThrow(()=>c.GOIMONCloudSchema.validate({schemaVersion:1,data:{goimon_quest_chapter2_v1_lv1:JSON.stringify(s)}}));});
test('practice reports each graded answer once and keeps the learning callback after returning to results',()=>{const c=dom(),parent=new Element('div'),b={log:[]},results=[];c.GoimonQuestLearning.record(b,question,false,false,null);c.GoimonQuestLearning.result(parent,b,{onContinue(){},onAnswer:(q,correct)=>results.push([q.id,correct])});for(let i=0;i<2;i++){press(parent,i?'単語 · 1問（復習済み）':'単語 · 1問');const answer=button(parent,'収入');answer.onclick();answer.onclick();press(parent,'復習の結果へ');press(parent,'戦闘結果へ戻る');}assert.deepEqual(results,[[question.id,true],[question.id,true]]);});

test('retry remains available if its callback throws and a chapter guard reports the error',()=>{
 const c=dom(),parent=new Element('div'),combat={log:[{correct:false}]};let calls=0;
 const swallow=fn=>()=>{try{fn();}catch(e){assert.match(e.message,/temporary/);}};
 c.GoimonQuestLearning.result(parent,combat,{guard:swallow,continueLabel:'戦闘直前から再挑戦',onContinue:()=>{calls++;if(calls===1)throw Error('temporary');}});
 const retry=button(parent,'戦闘直前から再挑戦');retry.onclick();
 assert.equal(retry.disabled,false,'transient failure must not lock the retry button');
 retry.onclick();assert.equal(calls,2);assert.equal(retry.disabled,true);
});

test('chapter 1 audio-to-meaning missed answer renders results without disabling the retry',()=>{
 const c=dom(),parent=new Element('div'),b={log:[{correct:false}]};
 c.location.pathname='/quest_chapter1.html';
 c.GoimonQuestLearning.record(b,{...question,format:'audio_word_meaning',review:'audio_quiz.html',prompt:'音声を聞いて意味を選ぼう。'},false,false,null);
 let continued=0;
 assert.doesNotThrow(()=>c.GoimonQuestLearning.result(parent,b,{onContinue:()=>continued++,continueLabel:'戦闘直前から再挑戦'}));
 const retry=button(parent,'戦闘直前から再挑戦');assert.equal(retry.disabled,false);
 assert(all(parent).some(n=>n.tagName==='button'&&n.textContent==='音声→意味 · 1問'));
 retry.onclick();assert.equal(continued,1);
});
test('unsupported legacy review destinations never lock the chapter 1 result screen',()=>{
 const c=dom(),parent=new Element('div'),b={log:[{correct:false}],learning:{questions:[],misses:[{prompt:'old question',answer:'answer',review:'missing_legacy.html',reviewId:99}]}};
 let continued=0;assert.doesNotThrow(()=>c.GoimonQuestLearning.result(parent,b,{onContinue:()=>continued++,continueLabel:'戦闘直前から再挑戦'}));
 press(parent,'戦闘直前から再挑戦');assert.equal(continued,1);
});

test('skill recovery restores exactly one spent use, persists a claim, and prevents duplicate rewards',()=>{
 const c=dom(),state={battleId:2,mode:'defeat',combat:{ended:true,winner:'enemy',player:{skills:[]}},checkpoint:{skills:[{id:'N_first_aid_gift',name:'First Aid',left:0,maxUses:2},{id:'N_echo',name:'Echo',left:2,maxUses:2}]}};
 let saved=0;
 assert.equal(c.GoimonQuestLearning.recoverySkills(state).length,1);
 c.GoimonQuestLearning.restoreSkill(state,'N_first_aid_gift',()=>saved++);
 assert.equal(saved,1);assert.equal(state.checkpoint.skills[0].left,1);
 assert.equal(c.GoimonQuestLearning.recoveryClaimed(state),true);
 assert.throws(()=>c.GoimonQuestLearning.restoreSkill(state,'N_first_aid_gift',()=>saved++));
 assert.equal(saved,1);
});
test('skill recovery rolls back the spent use and claim if saving fails',()=>{
 const c=dom(),state={battleId:'mist',mode:'defeat',combat:{ended:true,winner:'enemy'},checkpoint:{skills:[{id:'x',left:0,maxUses:1}]}};
 assert.throws(()=>c.GoimonQuestLearning.restoreSkill(state,'x',()=>{throw Error('write failed')}));
 assert.equal(state.checkpoint.skills[0].left,0);assert.equal(c.GoimonQuestLearning.recoveryClaimed(state),false);
});
test('victory reward updates battle actor and can be carried into the next battle',()=>{
 const c=dom(),state={battleId:1,mode:'battle',combat:{ended:true,winner:'player',player:{skills:[{id:'attack',left:1,maxUses:3}]}}};
 c.GoimonQuestLearning.restoreSkill(state,'attack',()=>{});
 assert.equal(state.combat.player.skills[0].left,2);
});
test('short review earns the recovery after enough correct answers',()=>{
 const c=dom(),parent=new Element('div'),b={log:[{correct:false}]},state={battleId:1,combat:{ended:true,winner:'enemy'},checkpoint:{skills:[{id:'aid',name:'Aid',left:0,maxUses:2}]}};
 c.GoimonQuestLearning.record(b,question,false,false,null);
 const restore=id=>c.GoimonQuestLearning.restoreSkill(state,id,()=>{});
 c.GoimonQuestLearning.result(parent,b,{onContinue(){},recoveryState:state,onSkillRestore:restore});
 assert(!all(parent).some(x=>x.tagName==='button'&&x.textContent.startsWith('Aid（')));
 press(parent,'単語 · 1問');press(parent,'収入');press(parent,'復習の結果へ');press(parent,'戦闘結果へ戻る');
 press(parent,'Aid（0/2回 → 1/2回）');assert.equal(state.checkpoint.skills[0].left,1);
 assert(all(parent).some(x=>x.textContent==='この戦闘のSKILL回復は受け取り済みです。'));
});
test('all-correct combat earns recovery without questions',()=>{
 const c=dom(),parent=new Element('div'),b={log:[{correct:true}]},state={battleId:3,combat:{ended:true,winner:'player',player:{skills:[{id:'a',name:'Aid',left:1,maxUses:2}]}}};
 c.GoimonQuestLearning.result(parent,b,{onContinue(){},recoveryState:state,onSkillRestore:id=>c.GoimonQuestLearning.restoreSkill(state,id,()=>{})});
 press(parent,'Aid（1/2回 → 2/2回）');assert.equal(state.combat.player.skills[0].left,2);
});

test('grouped review includes all missed questions and never creates per-question navigation',()=>{
 const c=dom(),parent=new Element('div'),b={log:[]};
 for(let i=0;i<12;i++)c.GoimonQuestLearning.record(b,{...question,id:'q'+i,reviewId:i,prompt:'word '+i},false,false,null);
 for(let i=0;i<4;i++)c.GoimonQuestLearning.record(b,{...question,format:'audio_word_meaning',review:'audio_quiz.html',reviewId:i,id:'audio'+i,prompt:'audio '+i,speech:'hello'},false,false,null);
 c.GoimonQuestLearning.result(parent,b,{onContinue(){}});
 assert.equal(c.GoimonQuestLearning.reviewGroups(b).reduce((s,g)=>s+g.questions.length,0),16);
 assert(all(parent).some(n=>n.tagName==='button'&&n.textContent==='単語 · 12問'));
 assert(all(parent).some(n=>n.tagName==='button'&&n.textContent==='音声→意味 · 4問'));
 assert.equal(all(parent).filter(n=>n.tagName==='a').length,0);
 press(parent,'単語 · 12問');
 for(let i=0;i<12;i++){press(parent,'収入');press(parent,i===11?'復習の結果へ':'次の問題へ');}
 press(parent,'戦闘結果へ戻る');
 assert(all(parent).some(n=>n.textContent==='復習対象 16問 · 確認済み 12問'));
});
test('legacy snapshots beyond five are shown as answer reveal cards',()=>{
 const c=dom(),parent=new Element('div'),b={log:[],learning:{questions:[{...question,reviewId:1}],misses:[{prompt:'income',answer:'収入',review:'quiz.html',reviewId:1},{prompt:'expense',answer:'支出',review:'quiz.html',reviewId:2}]}};
 c.GoimonQuestLearning.result(parent,b,{onContinue(){}});
 press(parent,'単語 · 2問');
 press(parent,'収入');press(parent,'次の問題へ');
 press(parent,'正答を確認する');
 assert(all(parent).some(n=>n.textContent==='正答：支出'));
});
test('grouped review skill reward requires completion of all formats',()=>{
 const c=dom(),parent=new Element('div'),b={log:[{correct:false},{correct:false}]},state={battleId:1,combat:{ended:true,winner:'enemy'},checkpoint:{skills:[{id:'aid',name:'Aid',left:0,maxUses:2}]}};
 c.GoimonQuestLearning.record(b,question,false,false,null);
 c.GoimonQuestLearning.record(b,{...question,format:'audio_word_meaning',review:'audio_quiz.html',reviewId:2,speech:'income'},false,false,null);
 const opts={onContinue(){},recoveryState:state,onSkillRestore:id=>c.GoimonQuestLearning.restoreSkill(state,id,()=>{})};
 c.GoimonQuestLearning.result(parent,b,opts);
 press(parent,'単語 · 1問');press(parent,'収入');press(parent,'復習の結果へ');press(parent,'戦闘結果へ戻る');
 assert(!all(parent).some(x=>x.tagName==='button'&&x.textContent.startsWith('Aid（')));
 press(parent,'音声→意味 · 1問');press(parent,'収入');press(parent,'復習の結果へ');press(parent,'戦闘結果へ戻る');
 press(parent,'Aid（0/2回 → 1/2回）');
 assert.equal(state.checkpoint.skills[0].left,1);
});

test('successive defeats replenish the retry checkpoint across reloads, including legacy saves',()=>{
 const learning=dom().GoimonQuestLearning,engine=require('../battle-prototype/core.js');
 let state={battleId:2,skillRecoveryClaimed:['2'],combat:{ended:true,winner:'enemy'},checkpoint:{skills:[{id:'aid',left:0,maxUses:2}]}};
 assert.equal(learning.recoveryClaimed(state),true);
 for(const expected of [1,2]){
  state.combat=engine.create(structuredClone(state.checkpoint),{});
  Object.assign(state.combat,{ended:true,winner:'enemy'});
  learning.restoreSkill(state,'aid',()=>{});
  state=JSON.parse(JSON.stringify(state));
  assert.equal(state.checkpoint.skills[0].left,expected);
  assert.throws(()=>learning.restoreSkill(state,'aid',()=>{}));
 }
 state.combat=engine.create(structuredClone(state.checkpoint),{});
 Object.assign(state.combat,{ended:true,winner:'enemy'});
 assert.equal(learning.recoverySkills(state).length,0);
});
