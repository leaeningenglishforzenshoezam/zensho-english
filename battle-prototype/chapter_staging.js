(function(root){'use strict';
function frame(scene,line,complete=false){
 const backgrounds=['forest_entrance','rockfall_before','rockfall_after','forest_entrance','stele_sealed','forest_battle','forest_battle','forest_battle','forest_battle','forest_battle','forest_battle','forest_battle','stone_gate','stone_gate','stele_sealed','altar','stele_awakened','altar','altar','forest_exit'];
 let background=backgrounds[scene]||'forest_exit';const people=['partner'];let enemy=null,mist=false,departing=false;
 if(scene===1&&line>=6)background='rockfall_falling';
 if(scene>=3&&(scene!==3||line>=1))people.push('morii');
 const encounters={6:[1,0],7:[1,0],8:[2,2],9:[2,0],10:[3,4],11:[3,0],12:[4,4],13:[4,0],14:[5,3],15:[5,0],16:[5,0],17:[5,4],18:[5,0]};
 if(encounters[scene]&&line>=encounters[scene][1])enemy=encounters[scene][0];
 if(scene===15){background=line>=11?'ancient_memory':line>=7?'stele_awakened':'altar';}
 if(scene===16&&line<12)people.push('unknown');
 if(scene===17&&line>=1)mist=true;
 if(scene===19&&!complete&&line>=5&&line<=7){mist=true;departing=line===7;}
 return {background,people,enemy,mist,departing,memory:background==='ancient_memory'};
}
const api={frame};if(typeof module!=='undefined')module.exports=api;else root.GoimonChapterStaging=api;
})(typeof window!=='undefined'?window:globalThis);
