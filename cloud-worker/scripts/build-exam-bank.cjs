const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),c={window:{}};
for(const f of ['sentence_fixed_1kyu.js','sentence_fixed_1kyu_b.js','paraphrase_data_1kyu.js'])vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),c);
const overrides=JSON.parse(fs.readFileSync(path.join(root,'cloud-worker/src/data/sentence-choice-overrides.json'),'utf8')),norm=x=>x.trim().toLowerCase();
function sentence(q){const found=q.choices.find(c=>norm(c)===norm(q.answer)),override=overrides[q.id];if(!found&&(!override||override.lemma!==q.answer||!q.choices.includes(override.answer)))throw Error('Unreviewed answer: '+q.id);return {id:q.id,en:q.en,ja:q.ja,choices:q.choices,answer:found||override.answer,lemma:q.answer};}
const groups={sentenceA:c.window.SENTENCE_FIXED_1KYU.map(sentence),sentenceB:c.window.SENTENCE_FIXED_1KYU_B.map(sentence),paraphrase:c.window.PARAPHRASE_DATA_1KYU.map(({id,a,b,choices,answer})=>({id,a,b,choices,answer}))};
for(const [name,items]of Object.entries(groups)){
 if(items.length<10||new Set(items.map(x=>x.id)).size!==items.length||items.some(x=>x.choices.length!==4||new Set(x.choices).size!==4||x.choices.filter(c=>c===x.answer).length!==1))throw Error('Invalid exam bank: '+name);
 fs.writeFileSync(path.join(root,'cloud-worker/src/data/mission-'+name+'.json'),JSON.stringify(items)+'\n');console.log(name,items.length);
}
