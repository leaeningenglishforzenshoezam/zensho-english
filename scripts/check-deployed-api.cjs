// Read-only check: no authentication, writes, migrations or deployment.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'cloud_config.js'),'utf8'),sandbox,{timeout:1000});
const base=sandbox.window.GOIMON_CLOUD_CONFIG.apiBase;
const expectedOrigin='https://leaeningenglishforzenshoezam.github.io';
async function main(){
 const url=new URL('/health',base);if(url.protocol!=='https:')throw Error('HTTPS API is required');
 const response=await fetch(url,{headers:{Origin:expectedOrigin},signal:AbortSignal.timeout(15000),redirect:'error'});
 if(!response.ok)throw Error('API health failed: HTTP '+response.status);
 if(response.headers.get('access-control-allow-origin')!==expectedOrigin)throw Error('Public origin is not enabled');
 const status=await response.json();
 if(status.ok!==true||status.capabilities?.questSave!==1||status.capabilities?.adventureProfile!==2)throw Error('新しい保存形式への対応を確認できません。先に開発ブランチの Worker を配備してください。');
 console.log('PASS: 新しいクエスト保存形式に対応した API ('+status.release+')');
 console.log('教師向け API: '+(status.capabilities.learningClasses?'有効（実接続検証は別途必要）':'無効'));
 if(!status.capabilities.authoritativeEconomy){console.error('BLOCKED: ガチャ・報酬の正式サーバー処理は未接続です。公開完了ではありません。');process.exitCode=2;}
 console.log('Google ログイン・別端末復元の実アカウント検証は、このチェックでは実施しません。');
}
main().catch(e=>{console.error('BLOCKED: '+e.message);process.exitCode=1;});
