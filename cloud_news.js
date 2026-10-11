// Static announcements: no cloud API calls or learning-data writes.
(() => {
 'use strict';
 const PREFIX='goimon_cloud_v2:news-',TTL=5*60*1000;
 const get=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(PREFIX+key))??fallback;}catch{return fallback;}};
 const set=(key,value)=>{try{localStorage.setItem(PREFIX+key,JSON.stringify(value));}catch{/* Storage unavailable: keep this page usable. */}};
 function validate(value){
  if(!Array.isArray(value)||value.length>200)throw Error('Invalid announcements');
  const ids=new Set();
  return value.map(x=>{
   if(!x||typeof x.id!=='string'||!/^[a-zA-Z0-9_-]{1,80}$/.test(x.id)||ids.has(x.id)||typeof x.title!=='string'||!x.title.trim()||x.title.length>160||typeof x.body!=='string'||x.body.length>20000||typeof x.publishedAt!=='string'||typeof x.updatedAt!=='string'||!Number.isFinite(Date.parse(x.publishedAt))||!Number.isFinite(Date.parse(x.updatedAt))||Date.parse(x.updatedAt)<Date.parse(x.publishedAt))throw Error('Invalid announcement');
   ids.add(x.id);return {id:x.id,title:x.title,body:x.body,publishedAt:x.publishedAt,updatedAt:x.updatedAt};
  }).sort((a,b)=>Date.parse(b.updatedAt)-Date.parse(a.updatedAt));
 }
 let read=get('read',{});if(!read||Array.isArray(read)||typeof read!=='object')read={};
 let items=[],checked=0,busy=false,available=false;
 try{const c=get('cache',null);if(c){items=validate(c.items);checked=Number(c.checked)||0;available=true;}}catch{}
 const list=document.getElementById('news-list'),status=document.getElementById('news-status'),all=document.getElementById('news-read-all'),refresh=document.getElementById('news-refresh');
 const unread=x=>read[x.id]!==x.updatedAt;
 const badge=document.createElement('span');badge.className='news-badge';document.getElementById('gn-news')?.append(badge);
 function paint(){
  const count=items.filter(unread).length;badge.hidden=!count;badge.textContent=String(count);badge.setAttribute('aria-label',`未読${count}件`);
  const toggle=document.getElementById('goimon-menu-toggle');toggle?.classList.toggle('news-unread',count>0);toggle?.setAttribute('aria-label',count?`メニューを開く（お知らせ未読${count}件）`:'メニューを開く');
  if(all)all.disabled=!count;
  if(list)for(const el of list.querySelectorAll('details')){const x=items.find(x=>x.id===el.dataset.id);el.classList.toggle('is-unread',unread(x));el.querySelector('.news-new').hidden=!unread(x);}
 }
 function mark(id){const latest=get('read',{});if(latest&&typeof latest==='object'&&!Array.isArray(latest))read={...latest,...read};for(const x of items)if(!id||x.id===id)read[x.id]=x.updatedAt;set('read',read);paint();}
 function render(){
  if(list){const open=new Set([...list.querySelectorAll('details[open]')].map(e=>e.dataset.id));list.replaceChildren();
   for(const x of items){const detail=document.createElement('details');detail.dataset.id=x.id;detail.open=open.has(x.id);const summary=document.createElement('summary'),meta=document.createElement('span'),date=document.createElement('time'),label=document.createElement('span'),title=document.createElement('strong'),body=document.createElement('p');
    meta.className='news-meta';date.dateTime=x.updatedAt;date.textContent=new Date(x.updatedAt).toLocaleDateString('ja-JP')+(x.updatedAt!==x.publishedAt?' 更新':'');label.className='news-new';label.textContent='未読';title.textContent=x.title;body.textContent=x.body;meta.append(date,label);summary.append(meta,title);detail.append(summary,body);detail.addEventListener('toggle',()=>{if(detail.open)mark(x.id);});list.append(detail);
   }
  }paint();
 }
 async function check(force=false){
  if(busy)return;if(!force&&checked<=Date.now()&&Date.now()-checked<TTL){if(status)status.textContent=items.length?'記事を開くと既読になります。':'お知らせはまだありません。';return;}
  busy=true;if(refresh)refresh.disabled=true;const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
  try{const response=await fetch('announcements.json',{cache:'no-cache',signal:controller.signal});if(!response.ok)throw Error('Fetch failed');const text=await response.text();if(text.length>1000000)throw Error('Too large');items=validate(JSON.parse(text));checked=Date.now();available=true;set('cache',{items,checked});render();if(status)status.textContent=items.length?'最新のお知らせです。記事を開くと既読になります。':'お知らせはまだありません。';}
  catch{checked=Date.now();if(status)status.textContent=available?'通信できないため、前回取得したお知らせを表示しています。':'お知らせを取得できませんでした。接続後に「最新情報を確認」を押してください。';}
  finally{clearTimeout(timer);busy=false;if(refresh)refresh.disabled=false;}
 }
 all?.addEventListener('click',()=>mark());refresh?.addEventListener('click',()=>check(true));
 document.getElementById('goimon-menu-toggle')?.addEventListener('click',()=>check());
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)check();});
 window.addEventListener('storage',e=>{if(e.key===PREFIX+'read'){const next=get('read',{});read=next&&typeof next==='object'&&!Array.isArray(next)?next:{};paint();}});
 render();check();
})();
