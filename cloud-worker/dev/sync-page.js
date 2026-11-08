import {MissionSyncClient} from './sync-client.js';
const $=id=>document.getElementById(id);let device='A',client,busy=false;
const key=()=>`goimon_local_sync_test_${device}`;
const request=async(path,body)=>{const response=await fetch('/api/v1/'+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const data=await response.json();if(!response.ok)throw Object.assign(Error(data.error||(data.conflict?'sync_conflict':'request_failed')),{status:response.status,data});return data;};
function connect(){const selected=device,k=key();client=new MissionSyncClient({request,scope:()=>`local-test:${device}`,read:()=>JSON.parse(sessionStorage.getItem(k)||'null'),write:s=>sessionStorage.setItem(k,JSON.stringify(s)),validate:GOIMONCloudSchema.validate});if(selected!==device)throw Error('device_changed');render();}
function render(refreshEditor=true){const s=client.state();if(refreshEditor)$('editor').value=s?JSON.stringify(s.local,null,2):'';$('meta').textContent=s?`基準revision ${s.revision} ／ ${s.pending?'未確認の保存要求あり':'保存要求なし'} ／ ${s.conflict?'競合あり':'競合なし'}`:'未取得';$('status').textContent=s?.conflict?JSON.stringify(s.conflict,null,2):'';}
function requireHeldEditor(){const s=client.state();if($('editor').value!==(s?JSON.stringify(s.local,null,2):''))throw Error('先に「編集を端末に保持」を押してください。');}
async function run(action){if(busy)return;busy=true;$('device').disabled=true;try{await action();render();$('status').textContent='完了しました。';}catch(e){render(false);$('status').textContent=`停止：${e.message}\n`+(client.state()?.conflict?JSON.stringify(client.state().conflict,null,2):'端末データ・編集中の文字列・保存要求は削除していません。');}finally{busy=false;$('device').disabled=false;}}
$('device').onchange=()=>{try{requireHeldEditor();device=$('device').value;connect();}catch(e){$('device').value=device;$('status').textContent=e.message;}};
$('load').onclick=()=>run(()=>{requireHeldEditor();return client.load();});
$('edit').onclick=()=>run(()=>client.edit(JSON.parse($('editor').value)));
$('save').onclick=()=>run(()=>{requireHeldEditor();return client.save();});
$('backup').onclick=()=>{const blob=new Blob([JSON.stringify({state:client.state(),editorText:$('editor').value},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`goimon-test-sync-${device}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
connect();
