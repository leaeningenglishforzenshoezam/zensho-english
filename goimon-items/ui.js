(function(root){'use strict';function init(){const $=id=>document.getElementById(id),C=root.GoimonBattleCatalog,S=root.GoimonItemStore;if(!$('goimonLoadoutPanel')||!C||!S)return;const store=S.create({storage:root.GOIMONStorage,profiles:root.GOIMONProfiles,activeAccount:()=>root.localStorage.getItem('goimon_cloud_v2:active'),level:()=>String(root.ACTIVE_LEVEL||root.GOIMONStorage.getItem('zensho_level_v1')||'1'),locks:root.navigator.locks});let context=null,dirty=false,busy=false,tab='goimon';const skillSelects=[1,2,3,4].map(i=>$('registeredSkill'+i));
function message(text,error=false){$('loadoutStatus').textContent=text;$('loadoutStatus').classList.toggle('item-error',error);}
function option(select,value,text){const o=document.createElement('option');o.value=value;o.textContent=text;select.append(o);}
function card(item,owned){const d=document.createElement('details');d.className='item-description';const title=document.createElement('summary');title.textContent=(item.rarity?item.rarity+'｜':'')+item.name+(owned===undefined?'':'｜所持 '+owned+'個');d.append(title);function line(text,lang){const p=document.createElement('p');p.textContent=text;p.lang=lang;d.append(p);}if(item.vocab)line(item.vocab.en+'｜'+item.vocab.level+'級：'+item.vocab.ja,'ja');if(item.flavor){line('物語 / Story','ja');line(item.flavor.ja,'ja');line(item.flavor.en,'en');}if(item.questionFormat)line('問題形式：'+(C.questionFormats[item.questionFormat]?.label||item.questionFormat),'ja');line('効果 / Effect','ja');line(item.description+(item.uses?' 基本'+item.uses+'回。':''),'ja');line(item.descriptionEn+(item.uses?' Base uses: '+item.uses+'.':''),'en');return d;}
function describe(){const g=C.gear.find(g=>g.id===$('registeredGear').value);$('registeredDescriptions').replaceChildren();if(g&&g.id!=='none')$('registeredDescriptions').append(card(g));for(const select of skillSelects){const s=C.skills.find(s=>s.id===select.value);if(s)$('registeredDescriptions').append(card(s));}}
function selectTarget(){if(!context)return;const selection=context.state.loadouts[$('registeredGoimon').value]||{gearId:null,skillIds:[null,null,null,null]};for(const [kind,selects]of [['gear',[$('registeredGear')]],['skills',skillSelects]])for(const select of selects){select.replaceChildren();option(select,kind==='gear'?'none':'',kind==='gear'?'装備なし':'未設定');for(const item of C[kind].filter(x=>x.id!=='none')){const n=context.state.owned[kind][item.id]||0,isRegistered=kind==='gear'?selection.gearId===item.id:selection.skillIds.includes(item.id);if(n>0||isRegistered)option(select,item.id,item.rarity+'｜'+item.name+'（所持 '+n+'個）');}}$('registeredGear').value=selection.gearId||'none';skillSelects.forEach((s,i)=>s.value=selection.skillIds[i]||'');dirty=false;describe();message(Object.values(context.state.owned.gear).some(n=>n>0)||Object.values(context.state.owned.skills).some(n=>n>0)?'装備1つ・異なる技を最大4つ登録できます。同じ品物は所持数の範囲で各ゴイモンに登録できます。':'まだ所持品がありません。図鑑で説明を確認できます。ガチャで技・装備を集めよう。');}
function eligibility(){try{const can=store.writable();$('saveRegisteredLoadout').disabled=busy||!context||!$('registeredGoimon').value||!can;if(context&&!busy&&!can)message('別の学習タブが使用中、または保存の準備ができていません。この画面では登録できません。入力は保持しています。',true);}catch(e){$('saveRegisteredLoadout').disabled=true;message(e.message,true);}}
function refresh(){try{context=store.read();$('registeredGoimon').replaceChildren();for(const g of context.goimons){const name=g.nickname||root.GoimonDex?.getEntry(g.type,g.stage)?.name||root.GoimonUI?.getBaseDisplayName?.(g.type,g.stage)||'ゴイモン';option($('registeredGoimon'),g.id,(g.id===context.goimons[0]?.id?'現役｜':'保存箱｜')+name+'（'+(root.GoimonDex?.getStageLabel?.(g.stage)||g.stage)+'）');}if(!context.goimons.length)message('登録するゴイモンが見つかりません。',true);else selectTarget();eligibility();}catch(e){context=null;message(e.message,true);eligibility();}}
$('registeredGoimon').onchange=()=>{if(dirty){message('未保存の入力があります。「登録」を押すか、画面を開き直してから別のゴイモンを選んでください。',true);$('registeredGoimon').value=$('registeredGoimon').dataset.previous||context.goimons[0]?.id;return;}selectTarget();$('registeredGoimon').dataset.previous=$('registeredGoimon').value;};
for(const s of [$('registeredGear'),...skillSelects])s.onchange=()=>{dirty=true;describe();message('変更はまだ登録されていません。');};
$('saveRegisteredLoadout').onclick=async()=>{if(busy||!context)return;busy=true;eligibility();try{context=await store.save(context,$('registeredGoimon').value,$('registeredGear').value==='none'?null:$('registeredGear').value,skillSelects.map(s=>s.value||null));dirty=false;message('このゴイモンに登録しました。育成ポイントや所持数は変わりません。');renderItems();}catch(e){message(e.message+' 入力内容を必要なら書き出してください。',true);}finally{busy=false;eligibility();}};
$('exportRegisteredLoadout').onclick=()=>{const payload={format:'goimon-loadout-draft',account:store.account,level:context?.level||null,goimonId:$('registeredGoimon').value,gearId:$('registeredGear').value,skillIds:skillSelects.map(s=>s.value),source:context?.state||null};const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='goimon-loadout-draft.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
function renderItems(){
 if(tab==='goimon')return;
 const list=$('itemDexList'),kind=tab==='gear'?'gear':'skills';
 list.replaceChildren();
 let state=null;
 try{state=store.read().state;}
 catch(e){$('itemDexStatus').textContent=e.message+' 所持情報を確認できないため詳細は非表示です。';}
 const all=C[kind].filter(x=>x.id!=='none');
 const owned=item=>state?(state.owned[kind][item.id]||0):0;
 const ownedCount=state?all.filter(item=>owned(item)>0).length:0;
 if(state)$('itemDexStatus').textContent='全'+all.length+'種 · 入手済み'+ownedCount+'種。'+(kind==='skills'?'未入手の技は名前のみ表示します。':'装備の説明を確認できます。');
 const query=$('itemDexSearch').value.trim().toLowerCase();
 const matches=item=>{
  const seen=owned(item)>0;
  const searchable=[item.name,item.rarity,...(seen||kind==='gear'?[item.vocab?.en,item.vocab?.ja]:[])].filter(Boolean);
  return !query||searchable.join(' ').toLowerCase().includes(query);
 };
 const items=all.filter(matches);
 if($('itemDexSort').value==='owned')items.sort((a,b)=>Number(owned(b)>0)-Number(owned(a)>0));
 for(const item of items){
  const count=owned(item);
  if(count>0||kind==='gear')list.append(card(item,state?count:undefined));
  else{
   const row=document.createElement('div');row.className='item-description item-locked';
   const title=document.createElement('p');title.className='item-locked-title';
   title.textContent=(item.rarity?item.rarity+'｜':'')+item.name+'｜未入手';
   const note=document.createElement('p');note.textContent='効果・問題形式・使用回数・説明は入手後に表示されます。';
   row.append(title,note);list.append(row);
  }
 }
 if(!list.children.length){
  const p=document.createElement('p');p.textContent='該当する品物はありません。';list.append(p);
 }
}
function selectTab(next){tab=next;for(const b of $('goimonDexTabs').querySelectorAll('button')){const active=b.dataset.kind===next;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;}for(const el of [$('goimonDexTree'),$('goimonDexEntry'),document.querySelector('.goimonDexControls')])if(el)el.hidden=next!=='goimon';$('itemDexPanel').hidden=next==='goimon';$('itemDexPanel').setAttribute('aria-labelledby',next==='skills'?'dexSkillsTab':'dexGearTab');if(next!=='goimon'){const mobile=$('goimonDexMobileSheet');mobile?._closeSheet?.();$('itemDexSearch').value='';renderItems();}}
for(const b of $('goimonDexTabs').querySelectorAll('button')){b.onclick=()=>selectTab(b.dataset.kind);b.onkeydown=e=>{const buttons=[...$('goimonDexTabs').querySelectorAll('button')],i=buttons.indexOf(b);let target;if(e.key==='ArrowRight')target=(i+1)%3;else if(e.key==='ArrowLeft')target=(i+2)%3;else if(e.key==='Home')target=0;else if(e.key==='End')target=2;if(target!==undefined){e.preventDefault();buttons[target].focus();selectTab(buttons[target].dataset.kind);}};}$('itemDexSearch').oninput=renderItems;$('itemDexSort').onchange=renderItems;
new MutationObserver(()=>{if($('goimonSheet').classList.contains('show')){refresh();$('registeredGoimon').dataset.previous=$('registeredGoimon').value;}}).observe($('goimonSheet'),{attributes:true,attributeFilter:['class']});
new MutationObserver(()=>{if($('goimonDexModal').classList.contains('show'))selectTab(tab);}).observe($('goimonDexModal'),{attributes:true,attributeFilter:['class']});
for(const event of ['goimon-auth-changed','goimon-storage-ready','goimon-storage-conflict','goimon-storage-error'])root.addEventListener(event,eligibility);root.addEventListener('storage',eligibility);
for(const id of ['selectLevel1','selectLevel2'])$(id)?.addEventListener('click',()=>{context=null;eligibility();message('級を切り替えました。ゴイモン管理を開き直してください。',true);if(tab!=='goimon')renderItems();});
selectTab('goimon');}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})(window);
