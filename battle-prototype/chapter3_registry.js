// Chapter 3 metadata for quest home and story records.
(function(root){'use strict';
const D=root.GoimonChapter3Data,C=root.GoimonChapter3Choices;
const scenes=D.scenes.map(scene=>{
 const lines=[];
 for(const n of scene.nodes){
  if(n.type==='line'||n.type==='narration')lines.push({id:n.id,speaker:n.speaker||'',text:n.text});
  if(n.type==='choice'){
   const event=C.byId[n.choiceId];
   for(const option of event.options)option.lines.forEach((l,i)=>lines.push({id:'ch3.'+event.id+'.'+option.key+'.'+i,
    speaker:l.speaker==='主人公'?'{{playerName}}':l.speaker==='相棒'?'{{partnerName}}':l.speaker,text:l.text}));
  }
 }
 return {...scene,lines};
});
const viewData={...D,scenes};
function frame(scene,line){
 const id=scenes[scene]?.id,people=[];
 if(['s01','s02','s03','s04','s05','s09','s11','s12','s13','s14','s15','s17','s18'].includes(id))people.push('hiro');
 if(['s01','s02','s03','s07','s08','s09','s10','s12','s13','s14','s15','s16','s17','s18','s19'].includes(id))people.push('bado');
 return {people,enemy:null};
}
const chapter={id:'chapter3',number:3,level:'1',name:D.title,url:'quest_chapter3.html',configure:'quest_chapter3.html?configure=1',
 cover:'images/chapter2/backgrounds/ch2_hills.png',map:null,backgroundPreview:()=>null,stages:D.battles.map(b=>b.id),
 visibleLines:(scene,state)=>scene.lines.filter(l=>{const m=/^ch3[.](c0[1-8])[.]([abc])[.]/.exec(l.id);return !m||state?.choices?.[m[1]]===m[2];}),
 data:viewData,store:root.GoimonChapter3Progress,key:account=>'goimon_chapter3_v1:'+account+':lv1',
 unlocked:(storage,account)=>root.GoimonChapter3Access.unlocked(storage,account,root.GoimonChapter2Data,root.GoimonChapter2Progress),
 intro:'トシャカへ続く山道。親切な斧使いと、言葉の届かない相棒。',
 frame,
 // Silhouettes are intentionally temporary until the chapter 3 art pack is ready.
 characters:[
  {id:'hiro',name:'ヒロトシ',kind:'出会い',image:'images/quest/chapter1/unknown_presence.png',description:'山道で出会った、斧を使う若者。',seen:f=>f.people.includes('hiro')},
  {id:'bado',name:'バド',kind:'出会い',image:'images/quest/chapter1/unknown_presence.png',description:'ヒロトシと長く暮らしてきた力の強いゴイモン。',seen:f=>f.people.includes('bado')}
 ]};
root.GoimonAdditionalQuestChapters=[...(root.GoimonAdditionalQuestChapters||[]),chapter];
})(typeof window!=='undefined'?window:globalThis);
