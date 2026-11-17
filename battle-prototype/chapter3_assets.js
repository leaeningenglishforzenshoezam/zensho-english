// GOIMON QUEST Chapter 3 image manifest.
// The game gracefully shows placeholder gradients until the planned files are uploaded.
// All paths are rooted at the site root; never overwrite Chapter 1/2 artwork.
(function(root){'use strict';
const dir='images/chapter3/';
const files=Object.freeze({
 backgrounds:Object.freeze({
  mountain_trail:'backgrounds/ch3_mountain_trail.png',
  cottage_exterior:'backgrounds/ch3_cottage_exterior.png',
  cottage_dining:'backgrounds/ch3_cottage_dining.png',
  locked_room:'backgrounds/ch3_locked_room.png',
  locked_window:'backgrounds/ch3_locked_window.png',
  yard_window:'backgrounds/ch3_yard_window.png',
  courtyard:'backgrounds/ch3_courtyard.png',
  woodpile_path:'backgrounds/ch3_woodpile_path.png',
  cottage_storage:'backgrounds/ch3_cottage_storage.png',
  toshaka_guard:'backgrounds/ch3_toshaka_guard.png',
  toshaka_gate:'backgrounds/ch3_toshaka_gate.png'
 }),
 characters:Object.freeze({
  hiro_normal:'characters/ch3_hirotoshi_normal.png',
  hiro_axe:'characters/ch3_hirotoshi_axe.png',
  hiro_surprised:'characters/ch3_hirotoshi_surprised.png',
  hiro_defeated:'characters/ch3_hirotoshi_defeated.png',
  bado_normal:'characters/ch3_bado_normal.png',
  bado_alert:'characters/ch3_bado_alert.png',
  bado_conflicted:'characters/ch3_bado_conflicted.png',
  bado_defensive:'characters/ch3_bado_defensive.png',
  bado_ally:'characters/ch3_bado_ally.png',
  injured:'characters/ch3_injured_goimon.png',
  guard:'characters/ch3_guard.png'
 }),
 enemies:Object.freeze({robbers:'enemies/ch3_robber_group.png'}),
 events:Object.freeze({
  two_plates:'events/ch3_two_plates.png',
  injured_decision:'events/ch3_injured_goimon_decision.png',
  evidence:'events/ch3_traveler_belongings.png',
  farewell:'events/ch3_bado_farewell.png'
 })
});
function path(category,key){const value=files[category]?.[key];return value?dir+value:null;}
function frame(sceneId,line=0,route=null,battleId=null){
 const point=Number(line)||0;
 let background=({
  s01:'mountain_trail',s02:'mountain_trail',s03:point<5?'cottage_exterior':'cottage_dining',
  s04:'locked_room',s05:'locked_room',s06:'locked_room',s07:'locked_room',
  s08:'locked_window',s09:'yard_window',s10:'locked_room',s11:'locked_room',
  s12:'courtyard',s13:point<4?'courtyard':'woodpile_path',s14:'woodpile_path',
  s15:'courtyard',s16:point<6?'cottage_storage':'courtyard',
  s17:'toshaka_guard',s18:'toshaka_guard',s19:'toshaka_gate'
 })[sceneId]||'mountain_trail';
 let event=null;
 if(sceneId==='s05'&&point>=8&&point<=15)event='two_plates';
 if(sceneId==='s09'&&point>=2&&point<=6)event='injured_decision';
 if(sceneId==='s16'&&point>=3&&point<=5)event='evidence';
 if(sceneId==='s18'&&point>=3&&point<=5)event='farewell';
 const people=[];
 if(sceneId==='s01'&&point<7)people.push({key:'robbers',kind:'enemies'});
 else if(['s01','s02','s03','s05','s09','s11','s12','s13','s14','s15','s17','s18'].includes(sceneId)){
  const hiro=sceneId==='s15'||sceneId==='s17'||sceneId==='s18'?'hiro_defeated':sceneId==='s14'?'hiro_axe':'hiro_normal';
  people.push({key:hiro,kind:'characters'});
 }
 if(sceneId==='s04'&&point>=8)people.push({key:'hiro_normal',kind:'characters'});
 if(['s01','s02','s03','s05','s07','s08','s09','s10','s12','s13','s14','s15','s16','s17','s18','s19'].includes(sceneId)){
  let b='bado_normal';
  if(sceneId==='s08'||sceneId==='s09'||sceneId==='s10'||sceneId==='s14')b='bado_conflicted';
  if(sceneId==='s12')b='bado_alert';
  if(sceneId==='s14'&&route==='ally')b='bado_ally';
  if(sceneId==='s14'&&route==='duel')b='bado_defensive';
  if(sceneId==='s13')b='bado_alert';
  if(sceneId==='s01'&&point<7){}else if(sceneId==='s08'&&point<4){}else people.push({key:b,kind:'characters'});
 }
 if(sceneId==='s09')people.push({key:'injured',kind:'characters'});
 if(sceneId==='s17'&&point>=3||sceneId==='s18'&&point>=0)people.push({key:'guard',kind:'characters'});
 if(battleId==='bado'){const i=people.findIndex(x=>x.key.startsWith('bado_'));if(i>=0)people[i].key='bado_defensive';}
 if(battleId==='hiro_ally'||battleId==='hiro_duel'){const i=people.findIndex(x=>x.key.startsWith('hiro_'));if(i>=0)people[i].key='hiro_axe';}
 return {background,event,people};
}
const api=Object.freeze({files,path,frame});
if(typeof module==='object'&&module.exports)module.exports=api;else root.GoimonChapter3Assets=api;
})(typeof window!=='undefined'?window:globalThis);
