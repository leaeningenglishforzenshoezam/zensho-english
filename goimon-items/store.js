// Item ownership is read-only here. Registration never awards, consumes, or trades items.
(function(root){'use strict';
const C=root.GoimonBattleCatalog,version=1,keyFor=level=>'goimon_item_state_v1_lv'+level,unsafe=new Set(['__proto__','prototype','constructor']);
function record(v){return !!v&&typeof v==='object'&&!Array.isArray(v);}
function id(v){return typeof v==='string'&&/^[a-zA-Z0-9_-]{1,96}$/.test(v)&&!unsafe.has(v);}
function fail(message){throw Error(message);}
function empty(level){return {schemaVersion:version,level,owned:{gear:{},skills:{}},loadouts:{}};}
function validate(s,level){if(!record(s)||s.schemaVersion!==version||s.level!==level||!record(s.owned)||!record(s.owned.gear)||!record(s.owned.skills)||!record(s.loadouts))fail('所持品データの形式を確認できません。元データは変更していません。');function tree(v,depth=0){if(depth>12)fail('所持品データが複雑すぎます。');if(v&&typeof v==='object')for(const [k,x]of Object.entries(v)){if(unsafe.has(k))fail('安全でないデータです。');tree(x,depth+1);}}tree(s);for(const kind of ['gear','skills']){const known=new Set(C[kind].filter(x=>x.id!=='none').map(x=>x.id));for(const [k,n]of Object.entries(s.owned[kind]))if(!known.has(k)||!Number.isSafeInteger(n)||n<0||n>9999)fail('所持数を確認できません。元データは変更していません。');}if(Object.keys(s.loadouts).length>128)fail('登録データの件数が上限を超えています。');for(const [goimonId,v]of Object.entries(s.loadouts)){if(!id(goimonId)||!record(v)||!(v.gearId===null||C.gear.some(g=>g.id!=='none'&&g.id===v.gearId))||!Array.isArray(v.skillIds)||v.skillIds.length!==4||v.skillIds.some(x=>x!==null&&!C.skills.some(s=>s.id===x))||new Set(v.skillIds.filter(Boolean)).size!==v.skillIds.filter(Boolean).length||!Number.isSafeInteger(v.updatedAt)||v.updatedAt<0)fail('登録内容の形式を確認できません。元データは変更していません。');}if(JSON.stringify(s).length>100000)fail('登録データが大きすぎます。');return s;}
function parse(raw,level){if(raw===null)return empty(level);let v;try{v=JSON.parse(raw);}catch{fail('所持品データが読み取れません。元データは変更していません。');}return validate(v,level);}
const sharedKey='goimon_item_shared_v2';
function wallet(s){s.shop ||= {stars:0,claims:{},history:[]};if(!Number.isSafeInteger(s.shop.stars)||s.shop.stars<0||s.shop.stars>1000000||!record(s.shop.claims)||!Array.isArray(s.shop.history))fail('報酬データを確認できません。元データは変更していません。');return s.shop;}
function project(common,level){if(!['1','2'].includes(level))fail('級を確認できません。');return {schemaVersion:1,level,owned:common.owned,loadouts:common.loadouts[level],shop:common.shop};}
function validateCommon(s){
 if(!record(s)||s.schemaVersion!==2||!record(s.loadouts)||!record(s.legacy)||!['1','2'].every(n=>Object.hasOwn(s.legacy,n)&&(s.legacy[n]===null||typeof s.legacy[n]==='string')))fail('共通所持品データを確認できません。元データは変更していません。');
 for(const n of ['1','2'])validate(project(s,n),n);wallet(s);return s;
}
function readShared(storage){
 const raw=storage.getItem(sharedKey),legacy=Object.fromEntries(['1','2'].map(n=>[n,storage.getItem(keyFor(n))]));let state;
 if(raw!==null){try{state=JSON.parse(raw);}catch{fail('共通所持品データが読み取れません。');}validateCommon(state);
  if(['1','2'].some(n=>state.legacy[n]!==legacy[n]))fail('旧画面で所持品が更新されています。自動で上書きせず、記録の確認が必要です。');
 }else{
  state={schemaVersion:2,owned:{gear:{},skills:{}},loadouts:{'1':{},'2':{}},shop:{stars:0,claims:{},history:[]},legacy};
  for(const n of ['1','2']){const old=parse(legacy[n],n),w=wallet(old);state.shop.stars+=w.stars;state.loadouts[n]=old.loadouts;
   for(const kind of ['gear','skills'])for(const [id,count]of Object.entries(old.owned[kind]))state.owned[kind][id]=(state.owned[kind][id]||0)+count;
   for(const [id,claimed]of Object.entries(w.claims)){if(!claimed)continue;const k=id==='welcome'||id.startsWith('login:')?id:'lv'+n+':'+id;state.shop.claims[k]=true;}
   state.shop.history.push(...w.history.map(x=>({...x,level:n})));
  }
  state.shop.history.sort((a,b)=>(b.at||0)-(a.at||0));validateCommon(state);
 }
 return {raw,legacy,state};
}
function commitShared(storage,ctx,state){
 validateCommon(state);
 if(storage.getItem(sharedKey)!==ctx.raw||['1','2'].some(n=>storage.getItem(keyFor(n))!==ctx.legacy[n]))fail('別の画面で所持品が更新されました。画面を開き直してください。');
 // The exact old strings and the common wallet commit together. Never delete old keys.
 storage.setItem(sharedKey,JSON.stringify(state));
}
function readState(storage,level){
 const modeRaw=storage.getItem('goimon_economy_mode_v1');
 if(!modeRaw)return project(readShared(storage).state,level);
 const mode=JSON.parse(modeRaw),account=root.GOIMONProfiles?.currentAccount();
 if(mode.status!=='server'||mode.account!==account||mode.apiBase!==root.GOIMON_CLOUD_CONFIG?.apiBase)fail('サーバーの所持品を確認できません。ガチャ・装着画面を開き直してください。');
 const suffix=encodeURIComponent(mode.apiBase)+':'+encodeURIComponent(account);
 const wallet=JSON.parse(storage.getItem('goimon_wallet_migration_v1:'+suffix+':cache')||'null');
 const loadout=JSON.parse(storage.getItem('goimon_loadout_cache_v1:'+suffix)||'null');
 if(!wallet||!loadout||![wallet.revision,loadout.revision].every(n=>Number.isSafeInteger(n)&&n>=0)||!Number.isSafeInteger(wallet.state?.shards)||wallet.state.shards<0||wallet.state.shards>1000000||!loadout.loadouts?.[level])fail('サーバーの所持品を読み込み中です。装着画面で確認してください。');
 const state={...empty(level),owned:wallet.state.owned,loadouts:Object.fromEntries(Object.entries(loadout.loadouts[level]).map(([id,v])=>[id,{...v,updatedAt:v.updatedAt??0}])),shop:{stars:wallet.state.shards,claims:{},history:[]}};
 return validate(state,level);
}
function create(options){const {storage,profiles,activeAccount,level,locks}=options,account=profiles?.account||'guest';
function scope(){if((activeAccount()||'guest')!==account)fail('アカウントが切り替わりました。入力は保存せず、このページを開き直してください。');const n=level();if(n!=='1'&&n!=='2')fail('級を確認できません。');return n;}
function writable(){scope();if(storage.getItem('goimon_economy_mode_v1'))return false;return account==='guest'?!!locks?.request:!!profiles?.isWriter?.();}
function owners(n){let current,archive;try{current=JSON.parse(storage.getItem('zensho_goimon_current_v4_lv'+n)||'null');archive=JSON.parse(storage.getItem('zensho_goimon_archive_v4_lv'+n)||'[]');}catch{fail('ゴイモンの記録が読み取れません。育成記録は変更していません。');}if(!Array.isArray(archive))fail('保存箱の形式を確認できません。');const rows=[current,...archive].filter(Boolean);if(rows.some(g=>!record(g)||!id(g.id))||new Set(rows.map(g=>g.id)).size!==rows.length)fail('ゴイモンのIDを確認できません。育成記録は変更していません。');return rows;}
function read(){const n=scope(),shared=readShared(storage);return {account,level:n,raw:JSON.stringify(project(shared.state,n)),shared,state:project(shared.state,n),goimons:owners(n)};}
function prepare(ctx,goimonId,gearId,skillIds){
 const n=scope();if(ctx.account!==account||ctx.level!==n)fail('アカウントまたは級が変わりました。保存せず、画面を開き直してください。');
 if(!writable())fail('別のタブで使用中、または保存の準備ができていません。入力は保持しています。');
 const fresh=readShared(storage);
 if(fresh.raw!==ctx.shared.raw||JSON.stringify(fresh.legacy)!==JSON.stringify(ctx.shared.legacy))fail('別の画面で登録・所持品が更新されました。入力は保持しています。');
 if(!owners(n).some(g=>g.id===goimonId))fail('このゴイモンは現役・保存箱に見つかりません。入力は保存していません。');
 const next=JSON.parse(JSON.stringify(fresh.state));next.loadouts[n][goimonId]={gearId,skillIds:[...skillIds],updatedAt:Date.now()};validateCommon(next);
 const allocated={gear:{},skills:{}};
 for(const grade of ['1','2']){
  const liveIds=new Set(owners(grade).map(g=>g.id));
  for(const [id,v]of Object.entries(next.loadouts[grade])){if(!liveIds.has(id))continue;
   for(const [kind,list]of [['gear',[v.gearId]],['skills',v.skillIds]])for(const item of list.filter(Boolean))allocated[kind][item]=(allocated[kind][item]||0)+1;
  }
 }
 for(const kind of ['gear','skills'])for(const [id,amount]of Object.entries(allocated[kind]))if(amount>(next.owned[kind][id]||0))fail('未所持、または所持数より多い登録です。別の級のゴイモンへの登録も確認してください。');
 return next;
}
async function save(ctx,goimonId,gearId,skillIds){
 if(!locks?.request)fail('複数タブを保護する保存機能が利用できません。入力は保持しています。');
 return locks.request('goimon-item-common-'+account,{ifAvailable:true},lock=>{if(!lock)fail('別のタブで登録中です。入力は保持しています。');const next=prepare(ctx,goimonId,gearId,skillIds);commitShared(storage,ctx.shared,next);return read();});
}
return Object.freeze({read,save,writable,account});}
root.GoimonItemStore=Object.freeze({create,validate,parse,empty,keyFor,sharedKey,readShared,commitShared,readState,project});
})(typeof window!=='undefined'?window:globalThis);
