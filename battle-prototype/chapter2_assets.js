// Chapter 2 fixed image catalog; kept separate from chapter scripts.
// All paths resolve from repository root. No player partner images duplicated.
(function(root){'use strict';
const rootDir='images/chapter2/';
const map=Object.freeze({
 backgrounds:Object.freeze({
 hills:'backgrounds/ch2_hills.png',road:'backgrounds/ch2_hills.png',
 town:'backgrounds/ch2_town.png',dry_canal:'backgrounds/ch2_dry_canal.png',
 water_office:'backgrounds/ch2_water_office.png',underground:'backgrounds/ch2_underground.png',
 foam_pool:'backgrounds/ch2_foam_pool.png',reservoir:'backgrounds/ch2_reservoir.png',
 stone_gate:'backgrounds/ch2_stone_gate.png',deep_pool:'backgrounds/ch2_deep_pool.png',
 control_room:'backgrounds/ch2_control_room.png',restored_canal:'backgrounds/ch2_restored_canal.png'
 }),
 details:Object.freeze({founders_relief:'details/ch2_founders_relief.png',work_log:'details/ch2_work_log.png'}),
 characters:Object.freeze({
 saya_full:'characters/ch2_saya_full.png',saya_normal:'characters/ch2_saya_normal.png',
 saya_happy:'characters/ch2_saya_happy.png',saya_worried:'characters/ch2_saya_worried.png',
 saya_surprised:'characters/ch2_saya_surprised.png',saya_determined:'characters/ch2_saya_determined.png',
 saya_looking_away:'characters/ch2_saya_looking_away.png',
 toyoyo_normal:'characters/ch2_toyoyo_normal.png',toyoyo_happy:'characters/ch2_toyoyo_happy.png',
 toyoyo_worried:'characters/ch2_toyoyo_worried.png',toyoyo_surprised:'characters/ch2_toyoyo_surprised.png',
 toyoyo_determined:'characters/ch2_toyoyo_determined.png'
 }),
 enemies:Object.freeze({
 1:'enemies/ch2_enemy_blackfog_chaser.png',2:'enemies/ch2_enemy_hasugame.png',
 3:'enemies/ch2_enemy_gengoron.png',4:'enemies/ch2_enemy_awaebi.png',
 5:'enemies/ch2_enemy_gate_guardian.png',6:'enemies/ch2_enemy_suiryu_unagi.png',
 7:'enemies/ch2_enemy_oonushi.png',8:'enemies/ch2_enemy_blackfog_split.png',
 9:'enemies/ch2_boss_beast.png'
 }),
 events:Object.freeze({captives:'events/ch2_boss_captured_saya_toyoyo.png'})
});
function path(group,id){const file=map[group]?.[id];return file?rootDir+file:null;}
root.GoimonChapter2Assets=Object.freeze({rootDir,map,path});
})(typeof window!=='undefined'?window:globalThis);
