(()=>{'use strict';
const data=window.GoimonChapter2Data,assets=window.GoimonChapter2Assets,el=id=>document.getElementById(id);
if(!data||!assets){el('line').textContent='必要なデータを読み込めませんでした。';return;}
let sceneIndex=0,lineIndex=0;
const defaultName='あなた',partnerName='相棒';
const battles=Object.fromEntries(data.battles.map(b=>[b.id,b]));
for(const [i,s] of data.scenes.entries()){const o=document.createElement('option');o.value=i;o.textContent=s.id+' '+s.title;el('sceneSelect').append(o);}
const substitute=s=>String(s||'').replaceAll('{{playerName}}',defaultName).replaceAll('{{partnerName}}',partnerName);
function src(img,url){if(!url){img.removeAttribute('src');img.hidden=true;return;}img.hidden=false;img.src=url;img.onerror=()=>{img.hidden=true;};}
function choosePortrait(speaker){
 const value=String(speaker||'');
 if(value.includes('サーヤ'))return 'saya_normal';
 if(value.includes('トヨヨ'))return 'toyoyo_normal';
 return '';
}
function render(){
 const s=data.scenes[sceneIndex],line=s.lines[lineIndex];
 el('sceneSelect').value=String(sceneIndex);el('caption').textContent=s.id+'｜'+s.title;
 el('speaker').textContent=substitute(line.speaker)||'物語';
 el('line').textContent=substitute(line.text);
 src(el('bg'),assets.path('backgrounds',s.background));
 const portrait=choosePortrait(line.speaker);
 src(el('character'),portrait?assets.path('characters',portrait):null);
 el('character').alt=portrait.startsWith('saya')?'サーヤ':portrait.startsWith('toyoyo')?'トヨヨ':'';
 el('progress').textContent='シーン '+(sceneIndex+1)+' / '+data.scenes.length+' ・ セリフ '+(lineIndex+1)+' / '+s.lines.length;
 const battle=battles[s.battleId];
 const end=lineIndex===s.lines.length-1;
 el('encounter').classList.toggle('active',!!battle&&end);
 el('encounter').textContent=battle&&end?'ここで戦闘 '+s.battleId+'「'+battle.name+'」が発生します。現在は戦闘未接続のため、次の場面へ進みます。':'';
 el('prev').disabled=sceneIndex===0&&lineIndex===0;
 el('next').disabled=sceneIndex===data.scenes.length-1&&end;
}
el('sceneSelect').onchange=()=>{sceneIndex=Number(el('sceneSelect').value);lineIndex=0;render();};
el('next').onclick=()=>{const s=data.scenes[sceneIndex];if(lineIndex<s.lines.length-1)lineIndex++;else if(sceneIndex<data.scenes.length-1){sceneIndex++;lineIndex=0;}render();};
el('prev').onclick=()=>{if(lineIndex)lineIndex--;else if(sceneIndex){sceneIndex--;lineIndex=data.scenes[sceneIndex].lines.length-1;}render();};
render();
})();