/* Local account inventory and wallet are committed together in one storage write. */
(()=>{'use strict';const account=GOIMONProfiles.account||'guest';
function scope(readOnly=false){if((localStorage.getItem('goimon_cloud_v2:active')||'guest')!==account)throw Error('アカウントが変わりました。再読み込みしてください。');if(!readOnly&&GOIMONStorage.getItem('goimon_economy_mode_v1'))throw Error('サーバー保存への移行中、または移行済みです。端末内のガチャは実行しません。');if(!readOnly&&account!=='guest'&&!GOIMONProfiles.isWriter())throw Error('保存の準備ができていません。他の学習タブを閉じてください。');}
function read(level='1'){scope(true);return GoimonItemStore.readState(GOIMONStorage,level);}
async function transaction(level,fn){scope();if(!navigator.locks)throw Error('このブラウザでは安全な保存ができません。別のブラウザで開いてください。');return navigator.locks.request('goimon-item-common-'+account,()=>{scope();const ctx=GoimonItemStore.readShared(GOIMONStorage),s=GoimonItemStore.project(ctx.state,level),result=fn(s);GoimonItemStore.commitShared(GOIMONStorage,ctx,ctx.state);return result;});}
function grant(s,id,amount){if(s.shop.claims[id])return 0;s.shop.claims[id]=true;s.shop.stars+=amount;return amount;}
function claimFirstAid(){return transaction('1',s=>{const claimId='gift:first-aid:20261112';if(s.shop.claims[claimId])return false;if((s.owned.skills.N_first_aid_gift||0)>0){s.shop.claims[claimId]=true;return false;}s.owned.skills.N_first_aid_gift=1;s.shop.claims[claimId]=true;return true;});}
function firstAidClaimed(){return !!read('1').shop.claims['gift:first-aid:20261112']||(read('1').owned.skills.N_first_aid_gift||0)>0;}
function claimTutorialGear(){return transaction('1',s=>{
 const claimId='gift:tutorial-gear:v1';
 if(s.shop.claims[claimId]){
  const previous=GoimonBattleCatalog.gear.find(g=>g.id===s.shop.tutorialGearId&&g.rarity==='N');
  if(!previous)throw Error('プレゼントの受取記録を確認できません。');return previous;
 }
 const pool=GoimonBattleCatalog.gear.filter(g=>g.id!=='none'&&g.rarity==='N'&&!g.giftOnly);
 const item=pool[Math.floor(Math.random()*pool.length)];
 if(!item||(s.owned.gear[item.id]||0)>=9999)throw Error('装備の受取を確認できません。');
 s.owned.gear[item.id]=(s.owned.gear[item.id]||0)+1;
 s.shop.claims[claimId]=true;s.shop.tutorialGearId=item.id;
 return item;
});}
function welcome(level){return transaction(level,s=>grant(s,'welcome',10));}
function claimMissions(level){return transaction(level,s=>{const status=GoimonDailyMissions.getStatus(level);let total=0;for(const m of status.missions)if(m.available&&m.completed&&Number.isSafeInteger(m.rewardStars)&&m.rewardStars>0)total+=grant(s,'lv'+level+':mission:'+status.date+':'+m.slot,m.rewardStars);return total;});}
function loginDay(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
function loginStatus(){const date=loginDay(),id='login:'+date;return {date,loggedIn:account!=='guest',claimed:['1','2'].some(level=>!!read(level).shop.claims[id])};}
function claimLogin(level){return import('./daily-bonus.mjs').then(module=>module.claim(window));}
function draw(level,kind,count){if(!['skills','gear'].includes(kind)||(!Number.isInteger(count)||count<1||count>10))return Promise.reject(Error('ガチャの種類を確認してください。'));return transaction(level,s=>{if(s.shop.stars<count*10)throw Error('ほしのかけらが足りません。ミッションを達成しよう。');const pool=GoimonBattleCatalog[kind].filter(x=>x.id!=='none'&&!x.giftOnly),items=[];for(let i=0;i<count;i++){let roll=Math.random(),rarity=roll<.01?'SR':roll<.06?'R':'N';if(count===10&&i===9&&!items.some(x=>x.rarity!=='N'))rarity=roll<.01?'SR':'R';const candidates=pool.filter(x=>x.rarity===rarity);if(!candidates.length)throw Error('抽選データが不足しています。');const item=candidates[Math.floor(Math.random()*candidates.length)];if((s.owned[kind][item.id]||0)>=9999)throw Error('所持数の上限です。');s.owned[kind][item.id]=(s.owned[kind][item.id]||0)+1;items.push(item);}s.shop.stars-=count*10;s.shop.history.unshift({at:Date.now(),kind,ids:items.map(x=>x.id)});s.shop.history=s.shop.history.slice(0,30);return items;});}
window.GoimonShop=Object.freeze({read,welcome,claimFirstAid,firstAidClaimed,claimTutorialGear,claimMissions,draw,loginStatus,claimLogin});})();
