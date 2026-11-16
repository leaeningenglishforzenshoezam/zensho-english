const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const pages=['study.html','quiz.html','quiz_jaen.html','audio_quiz.html','accent.html','listening.html','idiom_quiz.html','sentence.html','paraphrase_quiz.html','reorder.html','q7.html','q7_vocab.html','dialogue.html','q10.html','g2q11.html'];
test('all learning home pages keep a compact reward badge visible on mobile',()=>{
 for(const page of pages){const html=read(page);assert.match(html,/goimon-reward-badge\.css/,page);assert.match(html,/class="[^"]*goimonRewardBadge/,page);}
 const css=read('goimon-reward-badge.css');assert.match(css,/display:inline-flex!important/);assert.match(css,/@media\(max-width:600px\)/);
});
test('Q7 learning pages load growth runtime before exercise JS',()=>{
 for(const [page,script] of [['q7.html','q7_page.js'],['q7_vocab.html','q7_vocab.js']]){
  const h=read(page);assert(h.indexOf('src="goimon.js"')>0);assert(h.indexOf('src="goimon.js"')<h.indexOf('src="'+script+'"'));
 }
});
test('Q7 rewards are exactly 2 context per correct, zero extra perfect bonus',()=>{
 const js=read('goimon.js');
 const body=js.match(/function addQ7ReadingResult\(claimId, correct\)\s*\{([\s\S]*?)\n  \}/);
 assert(body);
 const fn=new Function('addLearningPointsOnce', 'return function(claimId, correct){'+body[1]+'}');
 const awards=[];const award=fn((id,delta)=>{awards.push([id,delta]);return true});
 for(let i=0;i<=5;i++){award('SET-A:'+i,i);assert.equal(awards[i][1].bunmyaku,i*2);}
 assert.equal(award('bad',6),false);
});
test('Q7 receipts are saved before award, no accidental rewrite of old attempts',()=>{
 const readJs=read('q7_page.js'),vocab=read('q7_vocab.js');
 assert.match(readJs,/pendingGoimonRewards/);assert.match(vocab,/pendingGoimonRewards/);
 assert(readJs.indexOf('const recorded=save(HISTORY_KEY, history)')<readJs.indexOf('if(recorded)deliverQ7Reward(current.id)'));
 assert(vocab.indexOf('const recorded=save(KEY, history)')<vocab.indexOf('if(correct&&recorded)deliverVocabReward(w.id)'));
 assert.match(readJs,/addQ7ReadingResult\(pending\.id,pending\.correct\)/);
 assert.match(vocab,/addQ7VocabCorrect\(receipt\)/);
});
