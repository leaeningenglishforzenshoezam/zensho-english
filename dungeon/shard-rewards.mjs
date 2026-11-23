// Dungeon badges are earned on-device, but their shards use the same wallet as gacha.
// Claims are keyed by badge, not by the old cumulative `badgeProgress.shards` total:
// replaying this migration must never mint a second copy of the same reward.
export const BADGE_IDS=Object.freeze(['firstWin','perfectFight','correct20','correct100','correct500','correct1000','actBoss','collector','stage1Boss','stage1Perfect','firstClear','stage2Win','stage2Perfect','stage2Boss','secondClear','burst30','guard15','clutchWin']);
const known=new Set(BADGE_IDS);
const claimKey=id=>'dungeon:badge:'+id;
const checkpointKey='goimon_dungeon_badge_awards_v1';

function badges(earned){
 if(!Array.isArray(earned))throw Error('バッジの記録を読み取れません。');
 return [...new Set(earned.filter(id=>known.has(id)))];
}
function requireAccount(root,owner){
 if((root.GOIMONProfiles?.currentAccount()||'guest')!==owner)throw Error('アカウントが変わりました。画面を開き直してください。');
}

export async function claimLocalBadges(root,earned){
 const ids=badges(earned),P=root.GOIMONProfiles,storage=root.GOIMONStorage,owner=P?.account||'guest';
 if(!P||!storage||!root.GoimonItemStore||!root.navigator.locks)throw Error('共通ウォレットを読み込めません。');
 return root.navigator.locks.request('goimon-item-common-'+owner,()=>{
  requireAccount(root,owner);
  if(storage.getItem('goimon_economy_mode_v1'))throw Error('サーバーのウォレットを確認できません。再読み込みしてください。');
  if(owner!=='guest'&&!P.isWriter())throw Error('別の学習タブを閉じてください。');
  const S=root.GoimonItemStore,ctx=S.readShared(storage),wallet=ctx.state.shop;
  const pending=ids.filter(id=>!wallet.claims[claimKey(id)]);
  if(!pending.length)return 0;
  if(wallet.stars+pending.length*5>1000000)throw Error('ほしのかけらの所持上限です。');
  for(const id of pending)wallet.claims[claimKey(id)]=true;
  wallet.stars+=pending.length*5;
  S.commitShared(storage,ctx,ctx.state);
  root.dispatchEvent(new Event('goimon-wallet-changed'));
  return pending.length*5;
 });
}

export async function claimEarnedBadges(root,earned){
 const ids=badges(earned);
 if(!ids.length)return 0;
 const P=root.GOIMONProfiles,storage=root.GOIMONStorage,owner=P?.account||'guest';
 if(!P||!storage)throw Error('共通ウォレットを読み込めません。');
 requireAccount(root,owner);
 if(owner==='guest')return claimLocalBadges(root,ids);

 await root.GoimonReleaseReady;
 const mode=storage.getItem('goimon_economy_mode_v1');
 if(mode&&JSON.parse(mode).account!==owner)throw Error('別アカウントのウォレットは使用できません。');
 if(root.GOIMON_CLOUD_CONFIG?.economyServerEnabled!==true){
  if(mode)throw Error('サーバーに接続できません。報酬は保留されています。');
  return claimLocalBadges(root,ids);
 }
 if(!P.isWriter()){
  const {waitForWriter}=await import('../goimon-items/runtime.mjs');
  await waitForWriter(root,P);
 }
 requireAccount(root,owner);
 const {createMissionAccountClient}=await import('../daily-missions/mission_account_client.mjs');
 const cfg=root.GOIMON_CLOUD_CONFIG;
 const client=createMissionAccountClient({apiBase:cfg.apiBase,account:owner,activeAccount:()=>P.currentAccount(),profiles:P,schema:root.GOIMONCloudSchema,
  credential:()=>JSON.parse(root.sessionStorage.getItem('goimon_cloud_session_v1')||'null'),fetch:root.fetch.bind(root),lock:(name,fn)=>root.navigator.locks.request(name,fn)});
 await client.prepare();
 let current=await client.request('economy');
 // A never-migrated wallet still belongs to local storage. Gacha will import
 // these credited shards with all existing items when migration is accepted.
 if(current.revision===0){
  if(mode)throw Error('ウォレットの移行が完了していません。');
  return claimLocalBadges(root,ids);
 }
 const raw=storage.getItem(checkpointKey),done=new Set(raw?JSON.parse(raw):[]);
 if([...done].some(id=>!known.has(id)))throw Error('バッジの受取記録を確認できません。');
 let total=0;
 for(const id of ids){
  if(done.has(id))continue;
  requireAccount(root,owner);
  let result;
  for(let attempt=0;attempt<3;attempt++){
   try{result=await client.request('economy/bonus/claim',{kind:'badge',badgeId:id,expectedRevision:current.revision});break;}
   catch(error){if(error.message!=='economy_revision_conflict'||attempt===2)throw error;current=await client.request('economy');}
  }
  total+=result.replayed?0:result.result.shards;
  // Successful grants return their new revision; replayed receipts may be old.
  // Refresh only on replay to stay within the site's shared request-rate limit.
  if(result.replayed)current=await client.request('economy');
  else current={revision:result.revision};
  done.add(id);
  const saved=JSON.stringify([...done]);storage.setItem(checkpointKey,saved);
  if(storage.getItem(checkpointKey)!==saved)throw Error('バッジの受取記録を保存できません。');
 }
 await client.finish();
 root.dispatchEvent(new Event('goimon-wallet-changed'));
 return total;
}
