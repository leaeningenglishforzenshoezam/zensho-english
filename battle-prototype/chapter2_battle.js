/* Provisional Chapter 2 balance, isolated from Chapter 1. */
(function(root){'use strict';
function enemy(catalog,id,stage){const scale=Math.max(1,Number(stage)||1),base=catalog.enemies[id===9?'boss':id===5||id===7?'tank':'normal'];const e={...base,id:'ch2-enemy-'+id,attr:id===1||id>=8?'mirage':'metal',reference:9*scale,shield:{hits:0,factor:1}};for(const stat of ['hp','attack','defense','speed'])e[stat]=Math.max(1,Math.round(base[stat]*scale*(stat==='hp'?.65:stat==='attack'?.45:1)));e.maxHp=e.hp;return e;}
const api={enemy};if(typeof module!=='undefined')module.exports=api;else root.GoimonChapter2Battle=api;
})(typeof window!=='undefined'?window:globalThis);
