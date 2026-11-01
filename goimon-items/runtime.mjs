import {createMissionAccountClient} from '../daily-missions/mission_account_client.mjs';
import {createCloudWallet} from './cloud-wallet.mjs';
import {createCloudDraw} from './cloud-draw.mjs';
import {createCloudLoadout} from './cloud-loadout.mjs';

// Explicit development opt-in only. Public config leaves economyServerEnabled unset.
export async function connect(root){
 const cfg=root.GOIMON_CLOUD_CONFIG,P=root.GOIMONProfiles,S=root.GoimonItemStore,C=root.GoimonBattleCatalog,storage=root.GOIMONStorage;
 if(cfg?.economyServerEnabled!==true)return;
 if(!P.account||!root.navigator.locks)throw Error('ログインしてから開き直してください。');
 if(!P.isWriter())throw Error('保存の準備ができていません。他の学習タブを閉じて開き直してください。');
 const account=P.account,activeAccount=()=>P.currentAccount(),lock=(name,fn)=>root.navigator.locks.request(name,fn);
 const client=createMissionAccountClient({apiBase:cfg.apiBase,account,activeAccount,profiles:P,schema:root.GOIMONCloudSchema,
  credential:()=>JSON.parse(root.sessionStorage.getItem('goimon_cloud_session_v1')||'null'),lock,fetch:root.fetch.bind(root)});
 await client.prepare();
 const existing=await client.request('economy');
 if(existing.revision===0&&!storage.getItem('goimon_economy_mode_v1')){
  const local=S.readShared(storage).state;
  if(!root.confirm('この端末のほしのかけら '+local.shop.stars+'個と所持品を引き継ぎます。別の端末に記録がある場合はキャンセルしてください。'))throw Error('移行は行っていません。記録のある端末から開始してください。');
 }
 const wallet=createCloudWallet({account,apiBase:cfg.apiBase,activeAccount,storage,lock,request:client.request,readLocal:()=>S.readShared(storage).state,catalog:C});
 await wallet.migrate();
 await client.request('economy/loadouts/import',{});
 const draw=createCloudDraw({account,apiBase:cfg.apiBase,activeAccount,storage,lock,request:client.request});
 let receipt=draw.pending();
 if(receipt){receipt=await draw.resume();await wallet.refresh();}
 function project(level){const legacy=S.readState(storage,level),cloud=wallet.read();return {...legacy,owned:cloud.state.owned,shop:{...legacy.shop,stars:cloud.state.shards}};}
 root.GoimonShop={read:project,
  welcome:async()=>{throw Error('初回報酬のサーバー接続は準備中です。');},
  draw:async(level,kind,count)=>{if(receipt)throw Error('前回の結果を確認してください。');receipt=await draw.draw(kind,count);await wallet.refresh();return receipt.response.result.items.map(x=>C[kind].find(i=>i.id===x.id));},
  acknowledge:async()=>{if(receipt){await draw.acknowledge(receipt.command.operationId);receipt=null;}},
  pendingResult:()=>receipt?.response?{kind:receipt.response.result.kind,items:receipt.response.result.items.map(x=>C[receipt.response.result.kind].find(i=>i.id===x.id))}:null
 };
 const level=storage.getItem('zensho_level_v1')==='2'?'2':'1';
 const local=S.create({storage,profiles:P,activeAccount,level:()=>level,locks:root.navigator.locks});
 const adapter=createCloudLoadout({account,apiBase:cfg.apiBase,activeAccount,storage,lock,request:client.request,level,localStore:local,
  validate:loadouts=>{for(const n of ['1','2'])S.validate({...S.empty(n),owned:wallet.read().state.owned,loadouts:loadouts[n]},n);}});
 await adapter.init();
 const originalRead=adapter.read;adapter.read=()=>{const ctx=originalRead();ctx.state.owned=wallet.read().state.owned;return ctx;};
 const originalSave=adapter.save;adapter.save=async(...args)=>{const ctx=await originalSave(...args);ctx.state.owned=wallet.read().state.owned;return ctx;};
 root.GoimonItemStore=Object.freeze({...S,create:()=>adapter});
 root.GoimonCloudWallet=wallet;
}
