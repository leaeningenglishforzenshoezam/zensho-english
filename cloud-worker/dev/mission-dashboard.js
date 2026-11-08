const $=id=>document.getElementById(id);
const panel=$('cards').parentElement,title=document.querySelector('h1');
document.body.replaceChildren(title,panel);
$('accountStatus').textContent='隔離環境 / テストアカウント（実ログインなし）。通常データ・実報酬は変更しません。';
$('level').value='1';$('level').disabled=true;
const note=document.createElement('p');note.textContent='各形式から挑戦できます。採点後に学習記録・育成をそれぞれ反映し、ここへ戻って保存状況を確認してください。終了するとテストデータは消えます。';panel.before(note);
const links={
 words:[['英→日','/quiz.html'],['日→英','/quiz_jaen.html'],['音声','/audio_quiz.html']],
 idioms:[['意味','/?mission=idioms:meaning'],['同義表現','/?mission=idioms:synonym']],
 exam:[['大問9','/?mission=exam:mix'],['大問11','/?mission=exam:standard']],
 listening:[['5問に挑戦','/?mission=listening']],reading:[['指定セットに挑戦','/?mission=reading']],reorder:[['5問に挑戦','/?mission=reorder']]
};
async function refresh(){
 $('refresh').disabled=true;
 try{
  const response=await fetch('/api/v1/missions/status');if(!response.ok)throw Error('状態を取得できませんでした');
  const state=await response.json();$('cards').replaceChildren();
  const done=state.missions.filter(m=>m.completed).length;
  $('meta').textContent=`${state.date}（日本時間）/ 達成 ${done} / 6。保存件数は本日の採点済み試行数に対する件数です。`;
  $('dailyProgress').setAttribute('aria-valuenow',String(done));$('dailyProgressFill').style.width=(done/6*100)+'%';
  for(const m of state.missions){
   const card=document.createElement('section');card.className='mission'+(m.completed?' done':'');
   const name=document.createElement('strong');name.textContent=m.title;
   const goal=document.createElement('p');goal.textContent=m.goal;
   const status=document.createElement('p');status.textContent=`${m.completed?'達成済み':'未達成'} / 採点 ${m.submitted}件 / 学習保存 ${m.learningSaved}件 / 育成反映 ${m.growthSaved}件`;
   card.append(name,goal,status);
   for(const [label,url] of links[m.slot]){const a=document.createElement('a');a.textContent=label;a.href=url;card.append(a);}
   $('cards').append(card);
  }
 }catch(error){$('meta').textContent=error.message+'。「最新状態を更新」で再取得してください。';}
 finally{$('refresh').disabled=false;}
}
$('refresh').onclick=refresh;
window.addEventListener('pageshow',refresh);
