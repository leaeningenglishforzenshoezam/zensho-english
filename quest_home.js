(() => {'use strict';
const $=id=>document.getElementById(id);
function render(){
 let state=null,pet=null;
 try{
 const account=GOIMONProfiles.account||'guest';
 state=GoimonChapterStore.create(localStorage,'goimon_chapter1_v1:'+account+':lv1',GoimonChapter1Data).load();
 const current=JSON.parse(GOIMONStorage.getItem('zensho_goimon_current_v4_lv1')||'null');
 const archive=JSON.parse(GOIMONStorage.getItem('zensho_goimon_archive_v4_lv1')||'[]');
 pet=state?([current,...(Array.isArray(archive)?archive:[])].find(p=>p?.id===state.partnerId)||state.pet):current;
 $('qh-progress').textContent=state?(state.mode==='complete'?'第1章クリア · 物語を振り返ろう':`冒険の続き · ${GoimonChapter1Data.scenes[state.scene].title||'ことばの森'}`):'相棒と出会った、不思議な声の物語。';
 $('qh-continue').textContent=state?(state.mode==='complete'?'クリア記録を見る':'冒険のつづき'):'冒険をはじめる';
 }catch(e){$('qh-progress').textContent='記録を読み込めませんでした。冒険画面で確認してください。';}
 $('qh-pet').textContent=pet?GoimonStoryNames.partnerName(pet,GoimonDex):'学習ホームで相棒を育てよう';
 $('qh-pet-image').src=GoimonDex.getEntry(pet?.type,pet?.stage)?.image||'images/goimon/goimon_egg.png';
 const cleared=state?.cleared||[],next=[1,2,3,4,5].find(n=>!cleared.includes(n));
 $('qh-stages').replaceChildren();
 for(let n=1;n<=5;n++){const li=document.createElement('li'),isNext=n===next;li.textContent=`STAGE ${n} · ${cleared.includes(n)?'クリア':isNext?(state?'次のステージ':'これから'):'未到達'}`;if(isNext){li.className='current';li.setAttribute('aria-current','step');} $('qh-stages').append(li);}
}
render();window.addEventListener('pageshow',render);window.addEventListener('storage',render);
})();
