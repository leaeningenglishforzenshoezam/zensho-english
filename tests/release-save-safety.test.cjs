const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const read=f=>fs.readFileSync(require('node:path').join(__dirname,'..',f),'utf8');
function storage(){const data=new Map();return {get length(){return data.size},key:i=>[...data.keys()][i]??null,getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)}}
function page(native){const c={localStorage:native,TextEncoder,Event,crypto:crypto.webcrypto,navigator:{locks:{request:(n,o,fn)=>fn({})}},addEventListener(){},dispatchEvent(){},alert(){}};c.window=c;vm.createContext(c);for(const f of ['cloud_schema.js','cloud_storage.js'])vm.runInContext(read(f),c);return c;}
const weak='zensho_q11_grammar_weak_v1_lv2',pet='zensho_goimon_current_v4_lv1',log='zensho_learning_log_v1_lv1';
test('Q11 weak data, raising and learning survive reload/account switch and cloud serialization',()=>{
 const n=storage(),guest=page(n);guest.GOIMONStorage.setItem(weak,'{"guest":{"wrong":2}}');guest.GOIMONProfiles.activate('test-A');const a=page(n);
 for(const [k,v] of [[weak,'{"Q001":{"wrong":3,"manual":true}}'],[pet,'{"nickname":"test","totalPoints":42}'],[log,'{"test":5}']])a.GOIMONStorage.setItem(k,v);
 const reloaded=page(n),saved=reloaded.GOIMONProfiles.cloudData(reloaded.GOIMONProfiles.read('test-A').data);reloaded.GOIMONCloudSchema.validate({schemaVersion:1,data:saved});assert.equal(saved[weak],a.GOIMONStorage.getItem(weak));assert.equal(saved[pet],a.GOIMONStorage.getItem(pet));assert.equal(saved[log],a.GOIMONStorage.getItem(log));
 reloaded.GOIMONProfiles.activate('test-B');assert.equal(page(n).GOIMONStorage.getItem(weak),null);page(n).GOIMONProfiles.activate('test-A');assert.equal(page(n).GOIMONStorage.getItem(weak),saved[weak]);page(n).GOIMONProfiles.logout();assert.equal(page(n).GOIMONStorage.getItem(weak),'{"guest":{"wrong":2}}');
 const other=storage(),fresh=page(other);fresh.GOIMONProfiles.write('test-A',{data:saved,base:saved,revision:1});fresh.GOIMONProfiles.activate('test-A');const restored=page(other);for(const k of [weak,pet,log])assert.equal(restored.GOIMONStorage.getItem(k),saved[k]);
});
test('new Q11 key stays narrowly scoped and malformed records are rejected',()=>{const s=page(storage()).GOIMONCloudSchema;assert(s.allowed(weak));assert(!s.allowed('zensho_q11_grammar_weak_v1_lv1'));for(const value of ['null','[]','3'])assert.throws(()=>s.validate({schemaVersion:1,data:{[weak]:value}}));});
test('Q11 never falls back to unscoped storage if adapter fails to load',()=>{assert.doesNotMatch(read('g2q11.js'),/window\.localStorage/);assert.match(read('g2q11.js'),/if\(!store\) throw/);});
