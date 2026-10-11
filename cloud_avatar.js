(() => {
 'use strict';
 const A=GOIMONAvatars;let chosen='egg';
 function paint(el,id){if(!el)return;const e=A.get(id)||A.get('egg');const img=document.createElement('img');img.src=e.image;img.alt=e.name;img.loading='lazy';img.className=e.id.includes(':')?'ga-portrait':'';img.onerror=()=>{img.onerror=null;img.src=A.get('egg').image;img.className='';};el.replaceChildren(img);}
 function picker(id,data){
  chosen=A.get(id)?id:'egg';const box=document.getElementById('avatar-choices');if(!box)return;
  box.replaceChildren();const available=A.entries.filter(e=>A.unlocked(e.id,data)||e.id===chosen);
  for(const e of available){const b=document.createElement('button');b.type='button';b.className='ga-option';b.setAttribute('aria-label',e.name);b.dataset.avatar=e.id;const face=document.createElement('span');face.className='ga-face';paint(face,e.id);const label=document.createElement('span');label.textContent=e.name;b.append(face,label);b.onclick=()=>{chosen=e.id;selection();};box.append(b);}
  document.getElementById('avatar-hint').textContent='解放済みのゴイモン：'+available.filter(e=>e.id.includes(':')).length+'体。学習を進めると選べるアイコンが増えます。';selection();
 }
 function selection(){document.querySelectorAll('.ga-option').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.avatar===chosen)));paint(document.getElementById('avatar-preview'),chosen);}
 function refresh(){let id='egg';try{const s=JSON.parse(sessionStorage.getItem('goimon_cloud_session_v1')||'null');if(s?.userId===localStorage.getItem('goimon_cloud_v2:active')&&s.apiBase===GOIMON_CLOUD_CONFIG.apiBase&&s.expiresAt*1000>Date.now())id=s.avatar||'egg';}catch{}const el=document.querySelector('.gn-avatar');if(el){el.classList.add('ga-face');paint(el,id);}}
 window.GOIMONAvatarUI={picker,paint,selected:()=>chosen,refresh};
 addEventListener('goimon-auth-changed',refresh);addEventListener('storage',refresh);document.addEventListener('click',e=>{if(e.target.closest('#goimon-menu-toggle'))refresh();});refresh();
})();
