/* Chapter 2 durability tuning; boss offense increased; speed unchanged. */
(function(root){'use strict';
const durability={1:[120,20],2:[130,22],3:[140,24],4:[145,20],5:[210,32],6:[155,22],7:[185,28],8:[175,24],9:[320,36]};
function enemy(catalog,id,stage){const scale=Math.max(1,Number(stage)||1),base=catalog.enemies[id===9?'boss':id===5||id===7?'tank':'normal'];const e={...base,id:'ch2-enemy-'+id,attr:id===1||id>=8?'mirage':'metal',reference:9*scale,shield:{hits:0,factor:1}};for(const stat of ['hp','attack','defense','speed'])e[stat]=Math.max(1,Math.round(base[stat]*scale*(stat==='hp'?.65:stat==='attack'?.45:1)));e.hp=Math.round(durability[id][0]*scale);e.defense=Math.round(durability[id][1]*scale);if(id===5||id===9)e.attack=Math.round((id===9?10:8)*scale);e.maxHp=e.hp;return e;}
const api={enemy};if(typeof module!=='undefined')module.exports=api;else root.GoimonChapter2Battle=api;
})(typeof window!=='undefined'?window:globalThis);
