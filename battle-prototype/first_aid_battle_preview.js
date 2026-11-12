(()=>{'use strict';
const $=id=>document.getElementById(id),C=window.GoimonBattleCatalog,E=window.GoimonBattlePrototype,Q=window.GoimonChapterQuestions,B=window.GoimonQuestQuestionBank;
const heal=C.skills.find(s=>s.id==='N_first_aid_gift'),selected=C.species.find(s=>s.id==='nagomi'),none=C.gear.find(g=>g.id==='none');
let fight=null,q=null,previous='',answered=false;
function set(id,value){$(id).textContent=value;}
function percent(current,total){return Math.max(0,Math.min(100,100*current/total))+'%';}
function draw(){
 const p=fight.player,e=fight.enemy;
 set('playerhp',p.hp+' / '+p.maxHp);set('enemyhp',e.hp+' / '+e.maxHp);
 $('playerbar').style.width=percent(p.hp,p.maxHp);$('enemybar').style.width=percent(e.hp,e.maxHp);
 set('turninfo','TURN '+fight.turn+' · '+(fight.ended?'戦闘終了':E.current(fight)==='player'?'ゴイモンの行動':'敵の行動'));
 set('skillsinfo','First Aid 残り '+p.skills[0].left+' / '+p.skills[0].maxUses+'回');
 $('aid').disabled=fight.ended||!!q||p.skills[0].left<=0;$('attack').disabled=fight.ended||!!q;
}
function say(message){set('battlelog',message);}
function reset(){
 window.GoimonQuestQuestionAudio?.stop();q=null;answered=false;previous='';
 const player=E.actor(selected,1,{chie:40,kotoba:80,onkan:20,bunmyaku:40},none,[heal]);
 const enemy={id:'demo-guardian',name:'森の小番人',attr:'metal',hp:115,maxHp:115,attack:11,defense:14,speed:1,reference:15,skillTurns:0,skillPower:1};
 fight=E.create(player,enemy,()=>.5);player.hp=Math.max(1,Math.round(player.maxHp*.35));
 $('stage').disabled=false;$('question').hidden=true;$('feedback').hidden=true;
 say('HPが減っています。First Aidを使って回復してみよう！');
 draw();
}
function range(){
 const stage=$('stage').value;if(stage==='all')return null;
 return Number(stage);
}
function choose(command){
 if(fight.ended||q)return;
 try{
  const format=window.GoimonSkillQuestionRouting.skillFormat(fight.player.skills,command,'player',false);
  q=Q.select(format,range(),{words:window.WORDS_1KYU,idioms:[]},B,Math.random,previous);
  previous=q.id;q.command=command;answered=false;
  $('stage').disabled=true;$('question').hidden=false;$('feedback').hidden=true;
  set('questiontitle',format==='audio_word_meaning'?'音声を聞いて、日本語の意味を選ぼう':'英単語の意味を選ぼう');
  set('questionbody',q.prompt);
  $('audioarea').replaceChildren();if(q.speech)window.GoimonQuestQuestionAudio?.mount($('audioarea'),q);
  $('choices').replaceChildren();
  for(const choice of q.choices){const b=document.createElement('button');b.type='button';b.textContent=choice;b.onclick=()=>answer(choice);$('choices').append(b);}
  draw();
 }catch(e){q=null;say('問題を表示できませんでした：'+e.message);draw();}
}
function answer(value){
 if(!q||answered)return;answered=true;
 window.GoimonQuestQuestionAudio?.stop();const correct=Q.correct(q,value);
 try{
  const playerAction=E.resolve(fight,q.command,correct,{elapsedMs:10000,rng:()=>.5});
  let log=(correct?'正解！':'不正解。')+' '+q.speech+' = '+q.answer+'。'+playerAction.text;
  if(!fight.ended && E.current(fight)==='enemy'){
   const enemyAction=E.resolve(fight,'normal',true,{elapsedMs:10000,rng:()=>.5});
   log+=' 敵の行動：'+enemyAction.text;
  }
  set('feedback',log);$('feedback').hidden=false;
  say(fight.ended?(fight.winner==='player'?'勝利！ 戦闘をやり直して再挑戦できます。':'敗北。戦闘をやり直して再挑戦できます。'):'残りHPと技回数を確認して次の行動を選ぼう。');
 }catch(e){say('戦闘計算に失敗：'+e.message);}
 $('question').hidden=true;q=null;$('stage').disabled=false;draw();
}
$('attack').onclick=()=>choose('normal');$('aid').onclick=()=>choose('skill:0');$('restart').onclick=reset;
if(!Array.isArray(window.WORDS_1KYU)||!window.WORDS_1KYU.length||!heal){say('学習データを読み込めませんでした。ページを再読み込みしてください。');$('attack').disabled=true;$('aid').disabled=true;return;}
reset();
})();