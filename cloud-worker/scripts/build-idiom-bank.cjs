const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'idiom_data_1kyu.js'),'utf8'),context);
const items=context.window.IDIOM_DATA_1KYU.map(({id,expression,ja,paraphraseTo,noteIds})=>({id,expression,ja,paraphraseTo,noteIds}));
if(items.length!==287||items.some((x,i)=>x.id!=='IM'+String(i+1).padStart(3,'0')||!x.paraphraseTo.length))throw Error('Invalid idiom bank');
fs.writeFileSync(path.join(root,'cloud-worker/src/data/mission-idioms.json'),JSON.stringify(items,null,2)+'\n');console.log('Updated server idiom bank:',items.length);
