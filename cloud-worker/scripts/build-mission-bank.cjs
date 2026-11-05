// Run explicitly when either source vocabulary changes; parity is checked by tests.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
for(const level of ['1','2']){
 const context={window:{}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'words_'+level+'kyu.js'),'utf8'),context);
 const words=context.window['WORDS_'+level+'KYU'].map(({en,ja})=>({en,ja}));
 if(words.length<20||words.some(w=>typeof w.en!=='string'||!w.en.trim()||typeof w.ja!=='string'||!w.ja.trim()))throw Error('Invalid source words');
 fs.writeFileSync(path.join(root,'cloud-worker/src/data/mission-words'+(level==='1'?'':'-2kyu')+'.json'),JSON.stringify(words,null,2)+'\n');
 console.log('Updated server word bank:',level,words.length);
}
