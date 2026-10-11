// Run explicitly when words_1kyu.js changes; parity is checked by tests.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'words_1kyu.js'),'utf8'),context);
const words=context.window.WORDS_1KYU.map(({en,ja})=>({en,ja}));
if(words.length<20||words.some(w=>typeof w.en!=='string'||typeof w.ja!=='string'))throw Error('Invalid source words');
fs.writeFileSync(path.join(root,'cloud-worker/src/data/mission-words.json'),JSON.stringify(words,null,2)+'\n');
console.log('Updated server word bank:',words.length);
