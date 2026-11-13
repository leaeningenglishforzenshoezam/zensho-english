// UI and receipt adapter for the two free, permanent tutorial presents.
(function(root){'use strict';
function skill(catalog){const item=catalog.skills.find(s=>s.id==='N_first_aid_gift');if(!item)throw Error('First Aidを確認できません。');return item;}
async function receive(kind,catalog){
 if(root.GoimonDeveloper?.active){if(kind==='skills')return skill(catalog);const pool=catalog.gear.filter(g=>g.id!=='none'&&g.rarity==='N');return pool[Math.floor(Math.random()*pool.length)];}
 if(kind==='gear')return root.GoimonShop.claimTutorialGear();
 await root.GoimonShop.claimFirstAid();return skill(catalog);
}
function equipRecovery(state,catalog){
 if(!state.tutorial.skillReceived)throw Error('SKILLガチャでFirst Aidを受け取ってください。');
 const item=skill(catalog),p=state.combat.player;
 p.skills=[{...item,left:item.uses,maxUses:item.uses}];
 p.hp=Math.max(1,Math.floor(p.maxHp*.35));
 state.combat.ended=false;state.combat.winner=null;state.combat.index=state.combat.order.indexOf('player');
 state.tutorial.skillEquipped=true;
}
function card(parent,item,kind){
 const article=root.document.createElement('article');article.className='tutorial-item-card';
 const badge=root.document.createElement('p');badge.className='tutorial-item-kind';badge.textContent=kind==='gear'?'EQUIPMENT · プレゼント':'SKILL · プレゼント';
 const title=root.document.createElement('h2');title.textContent=item.name;
 const body=root.document.createElement('p');body.textContent=item.description;
 article.append(badge,title,body);parent.append(article);return article;
}
function guide(onContinue){
 let dialog=root.document.getElementById('tutorial-rewards-guide');
 if(dialog?.open)return;
 if(!dialog){
  dialog=root.document.createElement('dialog');dialog.id='tutorial-rewards-guide';dialog.className='tutorial-rewards-guide';dialog.setAttribute('aria-labelledby','tutorial-guide-title');
  const title=root.document.createElement('h2');title.id='tutorial-guide-title';title.textContent='学ぶと、次の力が手に入る';dialog.append(title);
  for(const [number,heading,copy]of [
   ['1','デイリーミッションに挑戦','デイリーミッションをクリアすると「ほしのかけら」がもらえます。'],
   ['2','ほしのかけらでガチャ','SKILLとEQUIPMENTは、「ほしのかけら」を消費してガチャから入手できます。'],
   ['3','手に入れた力を装着','ゴイモンの管理画面で装着できます。今回のプレゼントも、これからずっと使えます。']
  ]){const box=root.document.createElement('section');box.className='tutorial-guide-card';const h=root.document.createElement('h3');h.textContent=number+'　'+heading;const p=root.document.createElement('p');p.textContent=copy;box.append(h,p);dialog.append(box);}
  const button=root.document.createElement('button');button.id='tutorial-guide-continue';button.className='primary';button.textContent='冒険へ進む';dialog.append(button);
  dialog.addEventListener('cancel',e=>e.preventDefault());root.document.body.append(dialog);
 }
 root.document.getElementById('tutorial-guide-continue').onclick=()=>{onContinue();dialog.close();};
 dialog.showModal();root.document.getElementById('tutorial-guide-continue').focus();
}
const api={receive,equipRecovery,card,guide};if(typeof module!=='undefined')module.exports=api;else root.GoimonTutorialGifts=api;
})(typeof window!=='undefined'?window:globalThis);
