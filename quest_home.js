(() => {'use strict';
const $=id=>document.getElementById(id),L=GoimonQuestLibrary;const selectionKey=()=>'goimon_quest_selected_chapter:'+(GOIMONProfiles.account||'guest');let previous=null;try{previous=sessionStorage.getItem(selectionKey());}catch{}let chapter=L.get(new URLSearchParams(location.search).get('chapter')||previous);
L.picker($('quest-chapter'),chapter.id,id=>{chapter=L.get(id);history.replaceState(null,'','quest_home.html?chapter='+id);render();});
function render(){
 try{sessionStorage.setItem(selectionKey(),chapter.id);}catch{}
 $('qh-map-open').textContent=chapter.map?'マップ':'冒険の道のり';
 let state=null,pet=null;const unlocked=L.unlocked(chapter);
 for(const option of $('quest-chapter').options){const c=L.get(option.value);option.textContent='第'+c.number+'章 · '+c.name+(L.unlocked(c)?'':'（未解放）');}
 $('qh-unlock-status').textContent=unlocked?'':'第1章のエンディングまで進むと解放';
 try{
 const account=GOIMONProfiles.account||'guest';
 state=L.load(chapter,localStorage,account);
 const current=JSON.parse(GOIMONStorage.getItem('zensho_goimon_current_v4_lv'+chapter.level)||'null');
 const archive=JSON.parse(GOIMONStorage.getItem('zensho_goimon_archive_v4_lv'+chapter.level)||'[]');
 pet=state?([current,...(Array.isArray(archive)?archive:[])].find(p=>p?.id===state.partnerId)||state.pet):current;
 $('qh-progress').textContent=state?(state.mode==='complete'?'第'+chapter.number+'章クリア · 物語を振り返ろう':`冒険の続き · ${chapter.data.scenes[state.scene].title||'ことばの森'}`):(chapter.intro||'相棒と出会った、不思議な声の物語。');
 $('qh-continue').textContent=state?(state.mode==='complete'?'クリア記録を見る':'冒険のつづき'):'冒険をはじめる';
 }catch(e){$('qh-progress').textContent='記録を読み込めませんでした。冒険画面で確認してください。';}
 $('qh-pet').textContent=pet?GoimonStoryNames.partnerName(pet,GoimonDex):'学習ホームで相棒を育てよう';
 $('qh-pet-image').src=GoimonDex.getEntry(pet?.type,pet?.stage)?.image||'images/goimon/goimon_egg.png';
 $('qh-chapter-label').textContent='CHAPTER '+String(chapter.number).padStart(2,'0')+' · '+chapter.level+'級';$('qh-chapter-title').textContent=chapter.name;$('qh-map-title').textContent=chapter.name;$('qh-map-image').hidden=!chapter.map;if(chapter.map){$('qh-map-image').src=chapter.map;$('qh-map-image').alt=chapter.name+'のエリアマップ';}else $('qh-map-image').removeAttribute('src');$('qh-hero').style.backgroundImage='url('+chapter.cover+')';$('qh-continue').href=chapter.url;$('qh-map-link').href=chapter.url;$('qh-configure').href=chapter.configure;
 const people=L.characters(chapter,state),scenes=L.scenes(chapter,state);$('qh-dex-count').textContent=people.filter(c=>c.unlocked).length+' / '+people.length+' 出会い';$('qh-story-count').textContent=scenes.filter(s=>s.lines.length).length+' / '+scenes.length+' 場面';$('qh-dex').href='quest_records.html?view=dex&chapter='+chapter.id;$('qh-story').href='quest_records.html?view=story&chapter='+chapter.id;
 $('qh-party-note').textContent=chapter.id==='chapter2'?'第2章は出発時の編成で進みます。HP・技の残り回数を引き継ぎます。':'編成変更後は森の入口から。出発するまで今の冒険は残ります。';
 $('qh-configure').hidden=chapter.id==='chapter2';
 if(!unlocked){$('qh-progress').textContent='第1章「ことばの森」をクリアして、次の冒険へ。';$('qh-continue').textContent='第1章の冒険へ';$('qh-continue').href='quest_chapter1.html';$('qh-map-link').href='quest_chapter1.html';$('qh-map-link').textContent='第1章の冒険へ';}else $('qh-map-link').textContent='冒険へ';
 $('qh-stages').classList.toggle('qh-route',!chapter.map);
 if(!chapter.map){renderRoute(state,unlocked);return;}
 const cleared=state?.cleared||[],next=chapter.stages.find(n=>!cleared.includes(n));
 $('qh-stages').replaceChildren();
 for(const n of chapter.stages){const li=document.createElement('li'),isNext=n===next;li.textContent=`STAGE ${n} · ${cleared.includes(n)?'クリア':isNext?(state?'次のステージ':'これから'):'未到達'}`;if(isNext){li.className='current';const marker=document.createElement('img');marker.src=window.GoimonAdventureProfile?.image()||'images/avatars/traveler.svg';marker.alt='現在地';marker.style.cssText='display:block;width:38px;height:38px;margin:auto';li.prepend(marker);li.setAttribute('aria-current','step');} $('qh-stages').append(li);}
}
function renderRoute(state,unlocked){const list=$('qh-stages');list.replaceChildren();$('qh-map-title').textContent=chapter.name+' · 冒険の道のり';
 if(!unlocked){const li=document.createElement('li');li.textContent='第1章クリア後に、現在地と訪れた場所が表示されます。';list.append(li);return;}
 const read=new Set(state?.read||[]);chapter.data.scenes.forEach((s,i)=>{const visited=!!state&&(s.lines.some(l=>read.has(l.id))||state.scene===i),current=!!state&&!state.completed&&state.scene===i;const li=document.createElement('li');if(current){li.className='current';li.setAttribute('aria-current','step');const marker=document.createElement('img');marker.src=window.GoimonAdventureProfile?.image()||'images/avatars/traveler.svg';marker.alt='現在地';marker.className='route-marker';li.append(marker);}else if(visited){const img=document.createElement('img');img.src=GoimonChapter2Assets.path('backgrounds',s.background);img.alt='';img.loading='lazy';li.append(img);}const body=document.createElement('div'),title=document.createElement('strong'),status=document.createElement('span');title.textContent=String(i+1).padStart(2,'0')+' · '+(visited?s.title:'？？？');status.textContent=current?'現在地':visited?(s.battleId&&!state.cleared.includes(s.battleId)?'戦闘前':s.lines.every(l=>read.has(l.id))?'通過済み':'訪問済み'):'未到達';body.append(title,status);li.append(body);list.append(li);});
}
render();window.addEventListener('pageshow',render);window.addEventListener('storage',render);window.addEventListener('goimon-auth-changed',render);
})();
