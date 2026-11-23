const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm');
const {readFileSync}=require('node:fs'),{join}=require('node:path');
const source=readFileSync(join(__dirname,'../cloud_sync.js'),'utf8');

test('guest account page keeps local data, hides Google login, and refuses a login callback',()=>{
 const elements=new Map(),getElementById=id=>{
  if(!elements.has(id))elements.set(id,{hidden:false,disabled:false,textContent:'',value:'',style:{}});
  return elements.get(id);
 };
 const local=new Map([['zensho_progress_v1','existing progress']]);
 const localStorage={getItem:k=>local.get(k)??null,setItem:(k,v)=>local.set(k,v),removeItem:k=>local.delete(k)};
 const sessionStorage={getItem:()=>null,removeItem:()=>{}};
 let activated=false,loadedScripts=0;
 const profiles={account:null,activate:()=>{activated=true;},logout:()=>{}};
 const cfg={loginEnabled:false,googleClientId:'example',apiBase:'https://api.test'};
 const window={GOIMON_CLOUD_CONFIG:cfg,dispatchEvent:()=>{},addEventListener:()=>{}};
 const document={getElementById,head:{appendChild:()=>loadedScripts++}};
 vm.runInNewContext(source,{window,document,GOIMONProfiles:profiles,GOIMONCloudSchema:{},GOIMON_CLOUD_CONFIG:cfg,localStorage,sessionStorage,Event:class{}});
 assert.equal(getElementById('login-available').hidden,true);
 assert.equal(getElementById('login-paused').hidden,false);
 assert.equal(getElementById('login-steps').hidden,true);
 assert.equal(getElementById('login-panel').hidden,false);
 assert.match(getElementById('status').textContent,/一時停止中/);
 assert.equal(loadedScripts,0);
 window.goimonGoogleLogin('forged-credential');
 assert.equal(activated,false);
 assert.equal(localStorage.getItem('zensho_progress_v1'),'existing progress');
});

test('previously selected account stays selected until the user explicitly logs out',()=>{
 const html=readFileSync(join(__dirname,'../cloud.html'),'utf8');
 const config=readFileSync(join(__dirname,'../cloud_config.js'),'utf8');
 assert.match(html,/id="logout"/);
 assert.match(html,/以前のアカウントとクラウド上の記録は削除していません/);
 assert.match(config,/loginEnabled:false/);
 const storageSource=readFileSync(join(__dirname,'../cloud_storage.js'),'utf8');
 assert.match(storageSource,/logout\(\)\{native\.removeItem\(ACTIVE\)/);
});
