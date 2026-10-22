(() => {'use strict';
const $=id=>document.getElementById(id),L=GoimonQuestLibrary;let chapter=L.get(new URLSearchParams(location.search).get('chapter'));
L.picker($('quest-chapter'),chapter.id,id=>{chapter=L.get(id);render();});
function render(){
 let state=null,pet=null;
 try{
 const account=GOIMONProfiles.account||'guest';
 state=L.load(chapter,localStorage,account);
 const current=JSON.parse(GOIMONStorage.getItem('zensho_goimon_current_v4_lv'+chapter.level)||'null');
 const archive=JSON.parse(GOIMONStorage.getItem('zensho_goimon_archive_v4_lv'+chapter.level)||'[]');
 pet=state?([current,...(Array.isArray(archive)?archive:[])].find(p=>p?.id===state.partnerId)||state.pet):current;
 $('qh-progress').textContent=state?(state.mode==='complete'?'第'+chapter.number+'章クリア · 物語を振り返ろう':`冒険の続き · ${chapter.data.scenes[state.scene].title||'ことばの森'}`):'相棒と出会った、不思議な声の物語。';
 $('qh-continue').textContent=state?(state.mode==='complete'?'クリア記録を見る':'冒険のつづき'):'冒険をはじめる';
 }catch(e){$('qh-progress').textContent='記録を読み込めませんでした。冒険画面で確認してください。';}
 $('qh-pet').textContent=pet?GoimonStoryNames.partnerName(pet,GoimonDex):'学習ホームで相棒を育てよう';
 $('qh-pet-image').src=GoimonDex.getEntry(pet?.type,pet?.stage)?.image||'images/goimon/goimon_egg.png';
 $('qh-chapter-label').textContent='CHAPTER '+String(chapter.number).padStart(2,'0')+' · '+chapter.level+'級';$('qh-chapter-title').textContent=chapter.name;$('qh-map-title').textContent=chapter.name;$('qh-map-image').src=chapter.map;$('qh-map-image').alt=chapter.name+'のエリアマップ';$('qh-hero').style.backgroundImage='url('+chapter.cover+')';$('qh-continue').href=chapter.url;$('qh-map-link').href=chapter.url;$('qh-configure').href=chapter.configure;
 const people=L.characters(chapter,state),scenes=L.scenes(chapter,state);$('qh-dex-count').textContent=people.filter(c=>c.unlocked).length+' / '+people.length+' 出会い';$('qh-story-count').textContent=scenes.filter(s=>s.lines.length).length+' / '+scenes.length+' 場面';$('qh-dex').href='quest_records.html?view=dex&chapter='+chapter.id;$('qh-story').href='quest_records.html?view=story&chapter='+chapter.id;
 const cleared=state?.cleared||[],next=chapter.stages.find(n=>!cleared.includes(n));
 $('qh-stages').replaceChildren();
 for(const n of chapter.stages){const li=document.createElement('li'),isNext=n===next;li.textContent=`STAGE ${n} · ${cleared.includes(n)?'クリア':isNext?(state?'次のステージ':'これから'):'未到達'}`;if(isNext){li.className='current';const marker=document.createElement('img');marker.src=window.GoimonAdventureProfile?.image()||'images/avatars/traveler.svg';marker.alt='現在地';marker.style.cssText='display:block;width:38px;height:38px;margin:auto';li.prepend(marker);li.setAttribute('aria-current','step');} $('qh-stages').append(li);}
}
render();window.addEventListener('pageshow',render);window.addEventListener('storage',render);window.addEventListener('goimon-auth-changed',render);
})();
