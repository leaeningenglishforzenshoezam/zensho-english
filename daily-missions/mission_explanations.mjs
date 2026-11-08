// Load the existing learning text only after grading. No generated explanations.
const loaded=new Map();
function script(file,key){
 if(window[key])return Promise.resolve(window[key]);
 if(!loaded.has(file))loaded.set(file,new Promise((resolve,reject)=>{
  const node=document.createElement('script');node.src=file;
  const timer=setTimeout(()=>{node.remove();loaded.delete(file);reject(Error('explanation_timeout'));},15000);
  node.onload=()=>{clearTimeout(timer);resolve(window[key]||[]);};
  node.onerror=()=>{clearTimeout(timer);node.remove();loaded.delete(file);reject(Error('explanation_unavailable'));};
  document.head.append(node);
 }));
 return loaded.get(file);
}
export async function explanationBank(attempt){
 if(attempt.slot==='reorder')return script('reorder_1kyu.js','REORDER_1KYU');
 if(attempt.category==='paraphrase_quiz')return script('paraphrase_data_1kyu.js','PARAPHRASE_DATA_1KYU');
 if(attempt.category==='sentence'){
  if(attempt.level==='2')return script('sentence_fixed_2kyu.js','SENTENCE_FIXED_2KYU');
  const banks=await Promise.all([script('sentence_fixed_1kyu.js','SENTENCE_FIXED_1KYU'),script('sentence_fixed_1kyu_b.js','SENTENCE_FIXED_1KYU_B')]);
  return banks.flat();
 }
 return [];
}
export function explanationFor(bank,question){
 const item=bank.find(q=>String(q.id)===String(question.id));
 if(!item)return null;
 // An ID alone is insufficient if a question was edited after issuance.
 const prompt=item.a&&item.b?item.a+'\n'+item.b:item.en||item.stemBefore;
 if(prompt!==question.prompt)return null;
 const notes=[...(Array.isArray(item.grammarFocus)?item.grammarFocus:[]),item.pointNote,item.note,item.explanation].filter(x=>typeof x==='string'&&x.trim());
 return {translation:item.ja||'',notes:[...new Set(notes)]};
}
