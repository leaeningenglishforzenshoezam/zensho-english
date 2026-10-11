/* Rescue never merges learning records. All mutations use the existing account lock and CAS. */
(function(root){
 'use strict';
 const prefix='goimon_cloud_v2:rescue:';
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function engine(io){
  const S=root.GOIMONCloudSchema,P=root.GOIMONProfiles;
  const checked=data=>{S.validate({schemaVersion:1,data});return JSON.parse(JSON.stringify(data));};
  const active=id=>{io.assertAccount();if(io.account()!==id)throw Error('アカウントが変わりました。もう一度記録を探してください。');};
  function remote(r,id){if(r.userId!==id||!Number.isSafeInteger(r.revision)||r.revision<0||(!r.snapshot&&r.revision!==0))throw Error('クラウド記録を確認できませんでした。');return checked(r.snapshot?.data||{});}
  function store(bundle){const key=prefix+bundle.account+':'+root.crypto.randomUUID(),raw=JSON.stringify(bundle);root.localStorage.setItem(key,raw);if(root.localStorage.getItem(key)!==raw)throw Error('バックアップを保存できませんでした。');return key;}
  function read(key,id){if(!key.startsWith(prefix+id+':'))throw Error('別アカウントの記録は復元できません。');const b=JSON.parse(root.localStorage.getItem(key));if(b?.format!=='goimon-rescue-v1'||b.account!==id)throw Error('バックアップが無効です。');for(const data of Object.values(b.records))checked(data);return b;}
  return {
   list(){const id=io.account();if(!id)return [];active(id);const rows=[];for(let i=0;i<root.localStorage.length;i++){const key=root.localStorage.key(i);if(key.startsWith(prefix+id+':')){try{const b=read(key,id);rows.push({key,createdAt:b.createdAt});}catch{}}}return rows.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));},
   async prepare(source){const id=io.account();active(id);const before=P.read(id),r=await io.request('GET');active(id);if(!same(before,P.read(id)))throw Error('端末の記録が更新されました。もう一度確認してください。');
    const records={guest:checked(P.cloudData(P.collect())),device:checked(P.cloudData(before.data)),cloud:remote(r,id)};
    if(source){const b=read(source.key,id);if(!['guest','device','cloud','restored'].includes(source.kind)||!b.records[source.kind])throw Error('復元対象がありません。');records.restored=checked(b.records[source.kind]);}
    const bundle={format:'goimon-rescue-v1',account:id,createdAt:new Date().toISOString(),origin:root.location.origin,revision:r.revision,records};
    const key=store(bundle);return {id,before,revision:r.revision,key,bundle};
   },
   async commit(plan,kind){active(plan.id);if(!['guest','device','cloud','restored'].includes(kind)||!plan.bundle.records[kind])throw Error('使う記録を選んでください。');
    if(!same(plan.before,P.read(plan.id)))throw Error('比較後に端末の記録が変わりました。もう一度記録を探してください。');
    const b=read(plan.key,plan.id);if(!same(b,plan.bundle))throw Error('バックアップが変更されています。もう一度確認してください。');
    const r=await io.request('GET');active(plan.id);const current=remote(r,plan.id);
    if(r.revision!==plan.revision||!same(current,b.records.cloud)||!same(plan.before,P.read(plan.id)))throw Error('比較後に記録が更新されました。上書きを止めました。もう一度記録を探してください。');
    if(!same(checked(P.cloudData(P.collect())),b.records.guest))throw Error('以前の記録が変わりました。もう一度記録を探してください。');
    const data=checked(b.records[kind]);if(!Object.keys(data).length)throw Error('空の記録は採用できません。');
    // Verify backup is still durable immediately before the conditional write.
    if(!same(read(plan.key,plan.id),b))throw Error('バックアップを確認できませんでした。');
    const result=await io.request('POST',{expectedRevision:plan.revision,snapshot:{schemaVersion:1,data}});
    active(plan.id);io.apply(plan.before,data,result.revision);return result;
   }
  };
 }
 function summary(data){const lines=[];for(const lv of [1,2]){const raw=data['zensho_goimon_current_v4_lv'+lv];if(raw){try{const g=JSON.parse(raw);lines.push(lv+'級：'+(g.nickname||g.type||g.stage||'ゴイモン')+' ／ Lv.'+(g.level??'不明'));}catch{}}
 const dex=data['zensho_goimon_dex_discovery_v2_lv'+lv];if(dex){try{lines.push(lv+'級の図鑑：'+Object.values(JSON.parse(dex)).filter(v=>v===true).length+'件');}catch{}}}lines.push('保存項目：'+Object.keys(data).length+'件（学習回数ではありません）');return lines.join('\n');}
 function attach(io){
  const box=document.getElementById('rescue-panel');if(!box)return null;
  const $=id=>document.getElementById(id),e=engine(io);let plan=null,account=null,downloaded=false;
  const labels={guest:'この端末に残っていた記録',device:'ログイン後の端末記録',cloud:'現在のクラウド記録',restored:'バックアップから戻す記録'};
  function clear(){plan=null;downloaded=false;$('rescue-review').hidden=true;$('rescue-confirm').checked=false;$('rescue-choices').replaceChildren();}
  function history(){const select=$('rescue-history');select.replaceChildren();for(const row of e.list()){for(const kind of ['guest','device','cloud']){const opt=document.createElement('option');opt.value=JSON.stringify({key:row.key,kind});opt.textContent=new Date(row.createdAt).toLocaleString('ja-JP')+' ／ '+labels[kind];select.appendChild(opt);}}$('rescue-restore').disabled=!select.options.length;}
  async function prepare(source){clear();plan=await e.prepare(source);for(const [kind,data] of Object.entries(plan.bundle.records)){const label=document.createElement('label'),radio=document.createElement('input'),title=document.createElement('strong'),text=document.createElement('p');radio.type='radio';radio.name='rescue-choice';radio.value=kind;radio.disabled=!Object.keys(data).length;title.textContent=labels[kind];text.textContent=summary(data);text.style.whiteSpace='pre-line';label.append(radio,title,text);$('rescue-choices').appendChild(label);} $('rescue-review').hidden=false;history();io.message('両方の記録を端末にバックアップしました。ファイルも保存してから、使う記録を選んでください。');}
  $('rescue-scan').onclick=()=>io.run(()=>prepare());
  $('rescue-restore').onclick=()=>io.run(()=>{const source=JSON.parse($('rescue-history').value);return prepare(source);});
  $('rescue-download').onclick=()=>{if(!plan)return;io.assertAccount();if(io.account()!==plan.id)return;io.download(plan.bundle,'goimon-rescue-'+Date.now());downloaded=true;};
  $('rescue-cancel').onclick=()=>{clear();io.message('記録は変更していません。バックアップは残しています。');};
  $('rescue-apply').onclick=()=>io.run(async()=>{if(!plan||!downloaded||!$('rescue-confirm').checked)throw Error('先にバックアップファイルを保存し、確認欄にチェックしてください。');const kind=box.querySelector('input[name="rescue-choice"]:checked')?.value;if(!kind)throw Error('使う記録を選んでください。');if(!confirm(labels[kind]+'をアカウントの学習記録として採用します。選ばなかった記録はバックアップに残ります。よろしいですか？'))return;
   const saved=plan;clear();try{await e.commit(saved,kind);io.refresh();io.message('選んだ記録を保存しました。以前のゲスト記録と変更前のバックアップも残っています。');}catch(err){io.message('処理を完了できませんでした。バックアップは残っています。再度「記録を探す」でクラウドの状態を確認してください。');throw err;}finally{history();}});
  return {render(busy){const id=io.account();if(account!==id){clear();account=id;if(id)history();}box.hidden=!id;for(const name of ['rescue-scan','rescue-download','rescue-apply','rescue-cancel','rescue-restore'])$(name).disabled=busy||!id||(name==='rescue-restore'&&!$('rescue-history').options.length);}};
 }
 root.GOIMONRescue={engine,attach,summary};
})(globalThis);
