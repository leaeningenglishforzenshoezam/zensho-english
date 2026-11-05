const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {checkSchema}=require('../scripts/release-preflight.cjs');
const sql=fs.readFileSync(path.join(__dirname,'../cloud-worker/migrations/0011_mission_persistence.sql'),'utf8');
const names=['mission_word_starts','mission_attempts','mission_reward_claims','mission_exam_sets','mission_growth_target'];
const rows=names.map(name=>({name,sql:(sql.match(new RegExp('CREATE (?:TABLE|TRIGGER) '+name+'[\\s\\S]*?(?:\\nEND;|\\n\\);)'))||[])[0]}));
test('release preflight permits only uninstalled or grade-aware mission schema and stops older/partial schema',()=>{
 assert.equal(checkSchema([]),'pending');assert(rows.every(r=>r.sql));assert.equal(checkSchema(rows),'grade2-ready');
 assert.throws(()=>checkSchema(rows.slice(1)),/partial/);
 assert.throws(()=>checkSchema(rows.map(r=>({...r,sql:r.sql.replace("level IN ('1','2')","level='1'")}))),/older_0011/);
 assert.throws(()=>checkSchema(rows.map(r=>({...r,sql:r.sql.replaceAll('||NEW.level',"||'1'")}))),/older_0011/);
});
