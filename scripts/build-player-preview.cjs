// Build the confirmation site from the GitHub branch, preserving production config.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.argv[2]||path.join(root,'dist'));
if(out===root)throw Error('Choose a separate output directory');
fs.mkdirSync(out,{recursive:true});
for(const e of fs.readdirSync(root,{withFileTypes:true}))if(e.isFile()&&/\.(html|css|js|json)$/.test(e.name)&&!/^package/.test(e.name))fs.copyFileSync(path.join(root,e.name),path.join(out,e.name));
for(const name of ['images','audio','battle-prototype','daily-missions','goimon-items'])fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true,filter:src=>!path.basename(src).startsWith('.')});
fs.writeFileSync(path.join(out,'cloud_config.js'),"window.GOIMON_CLOUD_CONFIG={googleClientId:'',apiBase:'',playerPreview:true};\n");
const note='<aside class="player-preview-note" style="padding:8px 16px;text-align:center;font-size:.8rem;background:#e7f0eb;color:#244d3f">確認用サイト：記録はこのブラウザに保存されます。ログイン同期・報酬の正式付与は準備中です。</aside>';
for(const name of fs.readdirSync(out).filter(n=>n.endsWith('.html'))){const file=path.join(out,name);fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace(/(<body\b[^>]*>)/i,'$1'+note));}
console.log('Built player screens from repository source: '+out);
