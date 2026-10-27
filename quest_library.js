// Read-only chapter registry. Add future chapters here without changing hub/record layouts.
(function(root){'use strict';
const asset='images/quest/chapter1/';
const chapters=[{id:'chapter1',number:1,level:'1',name:'ことばの森',url:'quest_chapter1.html',configure:'quest_chapter1.html?configure=1',cover:asset+'forest_entrance.png',map:asset+'chapter1_map.png',stages:[1,2,3,4,5],data:root.GoimonChapter1Data,key:account=>'goimon_chapter1_v1:'+account+':lv1',characters:[
{id:'morii',name:'モリィ',kind:'仲間',image:asset+'morii_normal.png',description:'ことばの森で出会った、明るく親切な案内役。',seen:f=>f.people.includes('morii')},
...['森の入口の小番人','装甲甲虫','霧の山猫','遺跡門の番人','ことばの祭壇の守護者'].map((name,i)=>({id:'guardian'+(i+1),name,kind:'番人',image:asset+'enemy_0'+(i+1)+'.png',battle:i+1,description:['森の入口で行く手を阻む小さな番人。','森の奥へ進む途中で出会う甲虫。','霧の中で出会う山猫。','古い石門を守る番人。','ことばの祭壇で待つ守護者。'][i],seen:f=>f.enemy===i+1})),
{id:'unknown',name:'？？？',kind:'出会い',image:asset+'unknown_presence.png',description:'石碑の記憶の先で現れた、謎の人物。',seen:f=>f.people.includes('unknown')},
{id:'mist',name:'黒い霧',kind:'出会い',image:asset+'black_mist.png',battle:'mist',description:'ことばの森に現れた黒い霧。',seen:f=>f.mist||f.enemy==='mist'}],frame:(s,l)=>root.GoimonChapterStaging.frame(s,l)}];
chapters.push(...(root.GoimonAdditionalQuestChapters||[]));
function unlocked(chapter,storage=localStorage,account=root.GOIMONProfiles?.account||'guest'){return !chapter.unlocked||chapter.unlocked(storage,account);}
function get(id){return chapters.find(c=>c.id===id)||chapters[0];}
function load(chapter,storage,account){if(!unlocked(chapter,storage,account))return null;return (chapter.store||root.GoimonChapterStore).create(storage,chapter.key(account||'guest'),chapter.data).load();}
function scenes(chapter,state){const read=new Set(state?.read||[]);return chapter.data.scenes.map((s,index)=>({...s,index,lines:s.lines.filter(l=>!l.event&&read.has(l.id)),total:s.lines.filter(l=>!l.event).length}));}
function characters(chapter,state){const read=new Set(state?.read||[]),frames=[];chapter.data.scenes.forEach((s,i)=>s.lines.forEach((l,j)=>{if(read.has(l.id)||(state?.mode==='story'&&state.scene===i&&state.line===j))frames.push(chapter.frame(i,j));}));return chapter.characters.map(c=>({...c,unlocked:!!state&&(frames.some(c.seen)||(c.battle!=null&&(state.cleared.includes(c.battle)||(['battle','defeat'].includes(state.mode)&&state.battleId===c.battle))))}));}
function picker(el,id,onChange){el.replaceChildren();for(const c of chapters){const o=document.createElement('option');o.value=c.id;o.textContent='第'+c.number+'章 · '+c.name+(unlocked(c)?'':'（未解放）');el.append(o);}el.value=get(id).id;el.onchange=()=>onChange(el.value);}
root.GoimonQuestLibrary=Object.freeze({chapters,get,load,scenes,characters,picker,unlocked});
})(typeof window!=='undefined'?window:globalThis);
