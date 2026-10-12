'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function config(name){return JSON.parse(fs.readFileSync(path.join(root,'cloud-worker',name),'utf8').replace(/^\s*\/\/.*$/gm,''));}
test('Q11 local D1 configuration never reuses a staging/production database ID',()=>{
 const local=config('wrangler.q11-local.jsonc');
 const existing=['wrangler.jsonc','wrangler.public.jsonc'].map(config);
 const db=local.d1_databases[0];
 assert.equal(db.binding,'DB');
 assert.equal(db.database_name,'goimon-grade2-q11-local-test');
 assert.equal(db.database_id,'00000000-0000-4000-8000-000000000011');
 for(const e of existing){
  assert.notEqual(db.database_id,e.d1_databases[0].database_id);
  assert.notEqual(db.database_name,e.d1_databases[0].database_name);
  assert.notEqual(local.name,e.name);
 }
 assert.equal(local.vars.ALLOWED_ORIGIN,'http://localhost:8765');
 assert.equal(local.triggers,undefined);
 assert.equal(local.routes,undefined);
});
