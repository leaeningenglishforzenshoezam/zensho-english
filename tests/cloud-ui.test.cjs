const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path');
const root=path.join(__dirname,'..');
function setup(){
 const data=new Map(),nodes=new Map();const localStorage={get length(){return data.size},key:i=>[...data.keys()][i],getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};
 const node=id=>{if(!nodes.has(id))nodes.set(id,{disabled:false,hidden:true,textContent:'',click(){return this.onclick?.()}});return nodes.get(id)};
 const cloud={};let offline=false,hook=null;
 const c={console,crypto:crypto.webcrypto,Event,TextEncoder,AbortController,setTimeout,clearTimeout,localStorage,confirm:()=>true,alert(){},addEventListener(){},dispatchEvent(){},navigator:{locks:{request:async(k,opts,fn)=>(fn||opts)({})}},document:{getElementById:node,createElement:()=>({}),head:{appendChild(){}}},GOIMON_CLOUD_CONFIG:{apiBase:'https://api.test',googleClientId:'test'},fetch:async(url,o)=>{
   if(offline)throw Error('offline');const id=o.headers.Authorization.split(' ')[1],s=cloud[id]||{revision:0,snapshot:null};
   if(hook){const fn=hook;hook=null;fn();}
   if(o.method==='GET')return {ok:true,json:async()=>({userId:id,...s})};const b=JSON.parse(o.body);
   if(b.expectedRevision!==s.revision)return {ok:false,status:409,json:async()=>({})};cloud[id]={revision:s.revision+1,snapshot:b.snapshot};return {ok:true,json:async()=>({revision:cloud[id].revision})};
 }};c.window=c;vm.createContext(c);for(const f of ['cloud_schema.js','cloud_storage.js','cloud_sync.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c);
 return {c,node,cloud,offline(v){offline=v},hook(fn){hook=fn}};
}
test('Login, explicit guest adoption, upload, remote conflict, resolution, offline and account separation',async()=>{
 const {c,node,cloud,offline}=setup();c.localStorage.setItem('q7SetHistory_v1','{"guest":1}');await c.goimonGoogleLogin('A');await node('import-guest').click();await node('sync').click();assert.equal(cloud.A.revision,1);
 let p=c.GOIMONProfiles.read('A');p.data.q7SetHistory_v1='{"local":2}';c.GOIMONProfiles.write('A',p);cloud.A={revision:2,snapshot:{schemaVersion:1,data:{q7SetHistory_v1:'{"remote":3}'}}};await node('sync').click();assert.equal(node('conflict').hidden,false);assert.equal(cloud.A.revision,2);
 await node('use-local').click();assert.equal(cloud.A.revision,3);assert.equal(cloud.A.snapshot.data.q7SetHistory_v1,'{"local":2}');
 offline(true);await node('sync').click();assert.equal(c.GOIMONProfiles.read('A').data.q7SetHistory_v1,'{"local":2}');offline(false);
 await c.goimonGoogleLogin('B');await node('sync').click();assert.equal(Object.keys(c.GOIMONProfiles.read('B').data).length,0);assert.equal(c.localStorage.getItem('q7SetHistory_v1'),'{"guest":1}');node('logout').click();assert.equal(c.localStorage.getItem('goimon_cloud_v2:active'),null);
});
test('Changes during network request are never overwritten',async()=>{
 const {c,node,cloud,hook}=setup();await c.goimonGoogleLogin('A');c.GOIMONProfiles.write('A',{data:{q7SetHistory_v1:'{}'},base:{},revision:0});
 cloud.A={revision:1,snapshot:{schemaVersion:1,data:{q7SetHistory_v1:'{"cloud":1}'}}};hook(()=>c.GOIMONProfiles.write('A',{data:{q7SetHistory_v1:'{"inflight":1}'},base:{},revision:0}));await node('sync').click();assert.equal(c.GOIMONProfiles.read('A').data.q7SetHistory_v1,'{"inflight":1}');assert.match(node('status').textContent,/別のタブ/);
});
