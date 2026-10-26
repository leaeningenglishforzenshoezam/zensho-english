const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),c=vm.createContext({window:{}});
for(const f of ['listening_type2_1kyu.js','listening_type3_1kyu.js','listening_type5_1kyu.js','q7_data.js','q10_data.js','dialogue_data.js','reorder_1kyu.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c);
const q=(id,prompt,choices,answer)=>{if(!Number.isInteger(answer)||answer<0||answer>=choices.length||new Set(choices).size!==choices.length)throw Error('Invalid answer '+id);return {id,prompt,choices,answer};};
function audio(file){if(!/^audio\/listening\/1kyu\/type[235]\/[A-Za-z0-9_]+\.mp3$/.test(file)||!fs.existsSync(path.join(root,file)))throw Error('Missing audio '+file);return file;}
const listening={};for(const n of [2,3])listening[n]=c.window['LISTENING_TYPE'+n+'_1KYU'].map(x=>({...q(x.id,n===2?'音声を聞いて適切な発話を選んでください。':'音声を聞いて適切な応答を選んでください。',x.choices.map(c=>c.text),x.choices.findIndex(c=>c.id===x.answerId)),audioFile:audio(x.audioFile)}));
listening[5]=c.window.LISTENING_TYPE5_1KYU.map(s=>({id:s.id,title:s.title,audioFile:audio(s.audioFile),questions:s.questions.map(x=>q(x.id,x.stem,x.choices.map(c=>c.text),x.choices.findIndex(c=>c.id===x.answerId)))}));
const reading={
 q7:c.window.q7Sets.map(s=>({id:s.id,title:s.passageTitle,passage:s.passage,summary:s.summary,questions:s.questions.map(x=>q(x.id,'空欄('+x.id+')',x.choices,x.answer-1))})),
 dialogue8:vm.runInContext('dialogueQuestions',c).map(s=>({id:String(s.id),title:s.title,dialogue:s.dialogue.map(({speaker,text,blank})=>({speaker,...(blank?{blank}:{text})})),questions:Object.entries(s.answers).map(([id,answer])=>q(id,'空欄('+id+')',s.choices.map(x=>x.text),s.choices.findIndex(x=>x.id===answer)))})),
 q10:c.window.q10Questions.map(s=>({id:s.id,title:s.title,passage:s.paragraphs.map(p=>p.sentences.map(x=>x.en).join(' ')),questions:s.blanks.map(x=>q(x.id,'空欄('+x.id+')',x.choices.map(c=>c.text),x.choices.findIndex(c=>c.id===x.answer)))}))
};
if(reading.dialogue8.some(s=>new Set(s.questions.map(q=>q.answer)).size!==5))throw Error('Repeated dialogue choice in correct answers');
const reorder=c.window.REORDER_1KYU.map(({id,stemBefore,stemAfter,chunks,answer})=>({id,stemBefore,stemAfter,chunks,answer}));
for(const pool of [...Object.values(reading),listening[5]])if(pool.some(s=>s.questions.length!==5))throw Error('Set must have five questions');
for(const x of reorder)if(x.chunks.length!==x.answer.length||new Set(x.answer).size!==x.answer.length||x.answer.some(id=>!x.chunks.some(c=>c.id===id)))throw Error('Invalid ordering '+x.id);
for(const [name,data]of Object.entries({listening,reading,reorder})){fs.writeFileSync(path.join(root,'cloud-worker/src/data/mission-'+name+'.json'),JSON.stringify(data)+'\n');console.log(name,Array.isArray(data)?data.length:Object.fromEntries(Object.entries(data).map(([k,v])=>[k,v.length])));}
