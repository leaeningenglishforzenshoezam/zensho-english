'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const parse=p=>JSON.parse(read(p).replace(/^\s*\/\/.*$/gm,''));
test('existing default and public wrangler configs share a D1 and must not be used as isolated staging',()=>{
 const a=parse('cloud-worker/wrangler.jsonc'),b=parse('cloud-worker/wrangler.public.jsonc');
 assert.equal(a.d1_databases[0].database_id,b.d1_databases[0].database_id);
 assert.equal(a.d1_databases[0].database_name,b.d1_databases[0].database_name);
});
test('grade 2 external staging template cannot accidentally deploy without a new D1 id',()=>{
 const q=parse('cloud-worker/wrangler.q11-staging.example.jsonc');
 const existing=parse('cloud-worker/wrangler.public.jsonc');
 assert.equal(q.d1_databases[0].database_id,'REPLACE_WITH_NEW_ISOLATED_D1_UUID');
 assert.notEqual(q.name,existing.name);
 assert.notEqual(q.d1_databases[0].database_name,existing.d1_databases[0].database_name);
 assert.notEqual(q.vars.ALLOWED_ORIGIN,existing.vars.ALLOWED_ORIGIN);
 assert.equal(q.triggers,undefined);
});
test('cloud save offers both revision backup and local recovery for destructive replacement',()=>{
 const worker=read('cloud-worker/src/index.js');
 const sync=read('cloud_sync.js');
 assert.ok(worker.includes('INSERT OR IGNORE INTO save_revisions'));
 assert.ok(worker.includes('revision_conflict'));
 assert.ok(sync.includes('P.recovery(userId,before)'));
 assert.ok(sync.includes('if(merged.conflicts.length)'));
 assert.ok(sync.includes('localUnchanged(before)'));
 assert.ok(sync.includes('account_mismatch'));
});
test('no production actions run in grade 2 CI',()=>{
 const workflow=read('.github/workflows/g2q11-checks.yml');
 assert.ok(workflow.includes('--local --config wrangler.q11-local.jsonc'));
 assert.ok(!/wrangler\s+deploy|--remote|db:remote/.test(workflow));
});
