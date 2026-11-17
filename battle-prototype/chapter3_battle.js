// Chapter 3 battle specifications. The common battle engine stays unchanged.
(function(root){'use strict';
const durability={
 ambush:{hp:9999,attack:7,defense:28,kind:'tank',attr:'metal',requiredQuestions:4},
 demo:{hp:110,attack:5,defense:18,kind:'normal',attr:'echo'},
 bado:{hp:9999,attack:9,defense:35,kind:'tank',attr:'metal',requiredQuestions:6},
 hiro_ally:{hp:170,attack:10,defense:23,kind:'boss',attr:'metal'},
 hiro_duel:{hp:170,attack:10,defense:23,kind:'boss',attr:'metal'}
};
function enemy(catalog,id,stage){
 const cfg=durability[id];if(!cfg)throw Error('未知の第3章の戦闘です: '+id);
 const scale=Math.max(.65,Number(stage)||1),base=catalog.enemies[cfg.kind]||catalog.enemies.normal;
 const enemy={...base,id:'ch3-'+id,attr:cfg.attr,reference:9*scale,shield:{hits:0,factor:1}};
 enemy.hp=Math.round(cfg.hp*scale);enemy.maxHp=enemy.hp;
 enemy.attack=Math.round(cfg.attack*scale);enemy.defense=Math.round(cfg.defense*scale);
 enemy.speed=Math.max(1,Math.round(base.speed*scale));
 // Bud restrains Hirotoshi's axe. Keep the same boss HP and base power on both routes.
 // Model Bud's protection as lower effective incoming offense; no shared engine changes.
 if(id==='hiro_ally')enemy.attack=Math.max(1,Math.round(enemy.attack*.78));
 return enemy;
}
function scriptedEnd(id,combat){
 const cfg=durability[id];
 if(!cfg?.requiredQuestions||!combat)return false;
 return !!combat.ended||combat.questions>=cfg.requiredQuestions;
}
const api=Object.freeze({enemy,scriptedEnd,durability});
if(typeof module==='object'&&module.exports)module.exports=api;else root.GoimonChapter3Battle=api;
})(typeof window!=='undefined'?window:globalThis);
