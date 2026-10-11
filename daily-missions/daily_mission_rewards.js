// Display-only projection. No wallet, storage writes, grants or exchanges.
(() => {
 'use strict';
 function preview(status, rules) {
  const rows=rules.missionSlots.map(rule=>{
   const mission=status.missions.find(m=>m.slot===rule.slot);
   const available=mission?.available===true;
   return {label:rule.title,available,maximum:available?rule.rewardStars:0,
    earned:available&&mission.completed===true?rule.rewardStars:0};
  });
  const basic=rules.missionSlots.map((r,i)=>r.group==='basic'?rows[i]:null).filter(Boolean);
  const bonusAvailable=basic.length===3&&basic.every(r=>r.available);
  rows.push({label:'基本3種類の達成ボーナス',available:bonusAvailable,
   maximum:bonusAvailable?rules.allBasicBonusStars:0,
   earned:bonusAvailable&&basic.every(r=>r.earned===r.maximum)?rules.allBasicBonusStars:0});
  return {rows,total:rows.reduce((s,r)=>s+r.earned,0),maximum:rows.reduce((s,r)=>s+r.maximum,0),issued:false};
 }
 window.GoimonDailyRewards=Object.freeze({preview});
})();
