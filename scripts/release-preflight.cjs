// Read-only preflight. Never migrate, deploy, log in or modify data.
const {spawnSync}=require('node:child_process'),path=require('node:path');
const root=path.resolve(__dirname,'..'),worker=path.join(root,'cloud-worker');
const names=['mission_word_starts','mission_attempts','mission_reward_claims','mission_exam_sets','mission_growth_target'];
function checkSchema(rows){
 if(!Array.isArray(rows))throw Error('schema_response_invalid');
 if(!rows.length)return 'pending';
 if(names.some(name=>!rows.some(r=>r.name===name)))throw Error('partial_mission_schema');
 for(const name of names.slice(0,4)){
  const sql=rows.find(r=>r.name===name).sql||'';
  if(!/CHECK\s*\(level\s+IN\s*\('1','2'\)\)/i.test(sql))throw Error('older_0011_already_applied');
 }
 if(!rows.find(r=>r.name==='mission_growth_target').sql.includes('||NEW.level'))throw Error('older_0011_already_applied');
 return 'grade2-ready';
}
function run(args,cwd=root){const r=spawnSync(process.execPath,args,{cwd,stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)throw Error('check_failed');}
function main(){
 if(process.argv.includes('--remote-schema')){
  const sql="SELECT name,sql FROM sqlite_master WHERE name IN ("+names.map(n=>"'"+n+"'").join(',')+")";
  const r=spawnSync(process.execPath,['node_modules/wrangler/bin/wrangler.js','d1','execute','goimon-cloud','--remote','--config','wrangler.public.jsonc','--json','--command',sql],{cwd:worker,encoding:'utf8'});
  if(r.status!==0)throw Error('remote_schema_check_failed: Cloudflareのログインと接続を確認してください');
  let parsed;try{parsed=JSON.parse(r.stdout);}catch{throw Error('schema_response_invalid');}
  if(!Array.isArray(parsed)||!parsed.length||parsed.some(x=>x.success!==true||!Array.isArray(x.results)))throw Error('schema_response_invalid');
  const state=checkSchema(parsed.flatMap(x=>x.results));
  console.log(state==='pending'?'PASS: ミッション用テーブルは未適用です。バックアップ後に候補の適用準備ができます。':'PASS: 2級対応のミッション用テーブルを確認しました。');
  console.log('読み取りのみ。DB・Worker・GitHub Pagesは変更していません。');return;
 }
 const fs=require('node:fs');
 run(['--test',...fs.readdirSync(path.join(root,'tests')).filter(n=>n.endsWith('.test.cjs')).map(n=>'tests/'+n)]);
 run(['--test'],worker);
 console.log('PASS: ローカル検証完了。これは公開完了・実ログイン確認を意味しません。');
}
module.exports={checkSchema};
if(require.main===module)try{main();}catch(e){console.error('STOP: '+e.message+'\n既存テーブルの削除・再作成は行わないでください。');process.exitCode=1;}
