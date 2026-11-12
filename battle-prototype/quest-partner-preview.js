// Shared, read-only companion preview for Chapter 1/2 setup screens.
(function(root){'use strict';
const stageLabels=Object.freeze({egg:'たまご',child:'幼体',growth:'成長体',mid:'中級体',final:'上級体'});
function mount(container,select,goimons,dex,names){
 const panel=document.createElement('div');panel.className='quest-partner-preview';panel.setAttribute('role','group');panel.setAttribute('aria-label','選択中のゴイモン');
 const img=document.createElement('img');img.className='quest-partner-image';img.alt='';img.loading='eager';img.decoding='async';
 const body=document.createElement('div');body.className='quest-partner-meta';
 const name=document.createElement('p');name.className='quest-partner-name';
 const stage=document.createElement('p');stage.className='quest-partner-stage';
 body.append(name,stage);panel.append(img,body);container.append(panel);
 function refresh(){
  const selected=goimons.find(g=>g.id===select.value);
  const entry=selected?dex?.getEntry?.(selected.type,selected.stage):null;
  const label=selected?(names?.partnerName?.(selected,dex)||entry?.name||'ゴイモン'):'ゴイモンを選んでください';
  name.textContent=label;
  stage.textContent=selected?(stageLabels[selected.stage]||selected.stage||''):'';
  img.src=entry?.image||'images/goimon/goimon_egg.png';
  img.alt=selected?label+'の姿':'ゴイモンの姿';
 }
 img.addEventListener('error',()=>{if(!img.src.endsWith('/images/goimon/goimon_egg.png'))img.src='images/goimon/goimon_egg.png';});
 refresh();
 return Object.freeze({refresh,panel});
}
const api=Object.freeze({mount});
if(typeof module==='object'&&module.exports)module.exports=api;
else root.GoimonQuestPartnerPreview=api;
})(typeof window!=='undefined'?window:globalThis);
