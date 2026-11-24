const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),c={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'sentence_fixed_2kyu.js'),'utf8'),c);
const items=new Map();
for(const q of c.window.SENTENCE_FIXED_2KYU){
 const answer=q.choices.find(x=>x.trim().toLowerCase()===q.answer.trim().toLowerCase());
 if(!answer||q.choices.filter(x=>x===answer).length!==1||new Set(q.choices).size!==4)throw Error('Unreviewed answer: '+q.id);
 const row={id:q.id,en:q.en,ja:q.ja,choices:q.choices,answer,lemma:q.lemma||q.answer};
 if(items.has(q.id)&&JSON.stringify(items.get(q.id))!==JSON.stringify(row))throw Error('Conflicting duplicate: '+q.id);
 items.set(q.id,row);
}
fs.writeFileSync(path.join(root,'cloud-worker/src/data/mission-sentence2.json'),JSON.stringify([...items.values()])+'\n');
console.log('Grade 2 unique sentences:',items.size);
