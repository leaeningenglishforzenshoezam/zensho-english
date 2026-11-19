// GOIMON QUEST Chapter 3 state machine; isolated from chapter1/2 saves and battle core.
(function(root){'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
const modes=new Set(['story','choice','battle','defeat','complete']);
function choicesApi(){const api=root.GoimonChapter3Choices;if(!api)throw Error('第3章の選択肢データが読み込まれていません。');return api;}
function fresh(data,pet,skills=[],gear='none'){
 if(!pet||typeof pet.id!=='string')throw Error('有効な相棒を選んでください。');
 return {version:1,scriptVersion:data.scriptVersion,revision:0,scene:0,line:0,mode:'story',pet:clone(pet),partnerId:pet.id,skills:clone(skills),gear,
  read:[],cleared:[],run:null,checkpoint:null,combat:null,battleId:null,question:null,feedback:null,misses:[],
  choices:{},budTrust:0,budFlags:{respectedPartner:false,gaveBudChoice:false},budRoute:null,
  branchChoice:null,branchLine:0,completed:false};
}
function stats(selections){return choicesApi().evaluate(selections);}
function syncDecision(state){const r=stats(state.choices);state.budTrust=r.score;state.budFlags={respectedPartner:r.respectedPartner,gaveBudChoice:r.gaveBudChoice};state.budRoute=state.choices.c08===undefined?null:r.route;return r;}
function validate(s,d){
 if(!s||s.version!==1||s.scriptVersion!==d.scriptVersion||!Number.isSafeInteger(s.revision)||s.revision<0||!modes.has(s.mode)||!s.pet||typeof s.partnerId!=='string'||!Array.isArray(s.skills)||!Array.isArray(s.read)||!Array.isArray(s.cleared)||!Array.isArray(s.misses)||!s.choices||typeof s.choices!=='object')throw Error('第3章の保存形式が正しくありません。元の記録は保持されています。');
 if(!Number.isInteger(s.scene)||s.scene<0||s.scene>=d.scenes.length||!Number.isInteger(s.line)||s.line<0||s.line>d.scenes[s.scene].nodes.length)throw Error('第3章の場面位置を確認できません。');
 const r=stats(s.choices);
 if(s.budTrust!==r.score||s.budFlags?.respectedPartner!==r.respectedPartner||s.budFlags?.gaveBudChoice!==r.gaveBudChoice||s.budRoute!==(s.choices.c08===undefined?null:r.route))throw Error('第3章の選択履歴と信頼度が一致しません。');
 const knownNodes=new Set(d.scenes.flatMap(scene=>scene.nodes.map(n=>n.id)));
 const knownBattles=new Set(d.battles.map(b=>b.id));
 if(s.cleared.some(id=>!knownBattles.has(id)))throw Error('第3章の戦闘記録が一致しません。');
 if(s.read.some(id=>!knownNodes.has(id)&&!/^ch3[.]c0[1-8][.][abc][.][0-9]+$/.test(id)))throw Error('第3章の閲覧記録が一致しません。');
 const node=d.scenes[s.scene].nodes[s.line];
 if(s.mode==='choice'){
  if(!node||node.type!=='choice'||node.choiceId!==s.branchChoice||!s.choices[node.choiceId])throw Error('第3章の選択肢再開位置が不正です。');
  const lines=choicesApi().option(node.choiceId,s.choices[node.choiceId]).lines;
  if(!Number.isInteger(s.branchLine)||s.branchLine<0||s.branchLine>=lines.length)throw Error('第3章の選択後会話の位置が不正です。');
 }else if(s.branchChoice!==null||s.branchLine!==0)throw Error('第3章の選択後会話の状態が不正です。');
 if(s.mode==='battle'||s.mode==='defeat'){
  if(!node||node.type!=='battle'||s.battleId!==node.battleId||!s.combat||!s.checkpoint|| (node.route&&node.route!==s.budRoute))throw Error('第3章の戦闘再開位置が不正です。');
 }else if(s.combat!==null||s.battleId!==null)throw Error('第3章の戦闘の状態が不正です。');
 if(s.mode==='complete'&&(s.scene!==d.scenes.length-1||s.line!==d.scenes[s.scene].nodes.length||!s.completed))throw Error('第3章クリア記録が不完全です。');
 return s;
}
function normalize(s,d){
 if(s.mode!=='story')return;
 let guard=0;
 while(++guard<2000){
  const scene=d.scenes[s.scene],node=scene.nodes[s.line];
  if(!node){
   if(s.scene===d.scenes.length-1){s.mode='complete';s.completed=true;return;}
   s.scene++;s.line=0;continue;
  }
  if(node.route&&node.route!==s.budRoute){s.line++;continue;}
  return;
 }
 throw Error('第3章の進行位置を確認できません。');
}
function current(s,d){
 if(s.mode==='choice'){
  const choice=choicesApi().option(s.branchChoice,s.choices[s.branchChoice]),line=choice.lines[s.branchLine];
  return {id:'ch3.'+s.branchChoice+'.'+choice.key+'.'+s.branchLine,type:'line',speaker:line.speaker==='主人公'?'{{playerName}}':line.speaker==='相棒'?'{{partnerName}}':line.speaker,text:line.text,branch:true};
 }
 if(s.mode==='story')normalize(s,d);
 if(s.mode==='complete')return null;
 return d.scenes[s.scene].nodes[s.line]||null;
}
function advance(s,d){
 if(s.mode==='choice'){
  const line=current(s,d);if(!s.read.includes(line.id))s.read.push(line.id);
  const choice=choicesApi().option(s.branchChoice,s.choices[s.branchChoice]);
  s.branchLine++;
  if(s.branchLine===choice.lines.length){
   const node=d.scenes[s.scene].nodes[s.line];if(!s.read.includes(node.id))s.read.push(node.id);
   s.mode='story';s.branchChoice=null;s.branchLine=0;s.line++;normalize(s,d);
  }
  return;
 }
 if(s.mode!=='story')throw Error('今は物語を進められません。');
 const node=current(s,d);if(!node)return;
 if(node.type==='choice')throw Error('まず行動を選んでください。');
 if(node.type==='battle')throw Error('戦闘を開始してください。');
 if(!s.read.includes(node.id))s.read.push(node.id);s.line++;normalize(s,d);
}
function choose(s,d,choiceId,key){
 if(s.mode!=='story')throw Error('今は選択できません。');
 const node=current(s,d);
 if(!node||node.type!=='choice'||node.choiceId!==choiceId||Object.prototype.hasOwnProperty.call(s.choices,choiceId))throw Error('選択肢の進行位置が一致しません。');
 const option=choicesApi().option(choiceId,key);
 s.choices[choiceId]=key;syncDecision(s);
 if(option.lines.length){s.mode='choice';s.branchChoice=choiceId;s.branchLine=0;}
 else{if(!s.read.includes(node.id))s.read.push(node.id);s.line++;normalize(s,d);}
 return stats(s.choices);
}
function beginBattle(s,d,checkpoint,combat){
 if(s.mode!=='story')throw Error('戦闘を開始できません。');
 const node=current(s,d);if(!node||node.type!=='battle')throw Error('戦闘開始位置が一致しません。');
 if(!checkpoint||!combat)throw Error('戦闘状態がありません。');
 s.checkpoint=clone(checkpoint);s.combat=clone(combat);s.battleId=node.battleId;s.mode='battle';
}
function finishBattle(s,d){
 if(s.mode!=='battle'||!s.combat?.ended)throw Error('戦闘終了を確認できません。');
 const node=d.scenes[s.scene].nodes[s.line],spec=d.battles.find(b=>b.id===node.battleId);
 const success=s.combat.winner==='player'||s.combat.winner==='survived'||(spec?.scriptedRescue===true&&s.combat.ended);
 if(!success){s.mode='defeat';return false;}
 if(!s.cleared.includes(node.battleId))s.cleared.push(node.battleId);
 if(!s.read.includes(node.id))s.read.push(node.id);
 if(s.combat.player){s.run=clone(s.combat.player);if(Number.isFinite(s.run.hp)&&Number.isFinite(s.run.maxHp)){
  // Hirotoshi treats the injured partner before dinner; recover fully after the scripted rescue.
  s.run.hp=spec?.scriptedRescue===true?s.run.maxHp:Math.min(s.run.maxHp,Math.max(1,s.run.hp)+Math.ceil((s.run.maxHp-Math.max(1,s.run.hp))/3));
 }}
 s.combat=null;s.checkpoint=null;s.battleId=null;s.question=null;s.feedback=null;s.mode='story';s.line++;normalize(s,d);return true;
}
function restart(s,d,pet,skills=[],gear='none'){
 validate(s,d);
 const out=fresh(d,pet,skills,gear);out.revision=s.revision;out.completed=s.completed;
 // Clear every route and choice in a new run; permanent chapter awards may be retained separately.
 return validate(out,d);
}
function create(storage,key,d){
 const source=root.GOIMONQuestStorage?.forKey(storage,key)||storage;
 let last=source.getItem(key);
 return {load(){return last?validate(JSON.parse(last),d):null;},save(s){
  if(source.getItem(key)!==last)throw Error('別のタブで第3章が更新されました。進行記録は上書きしていません。');
  validate(s,d);const value=JSON.stringify({...s,revision:s.revision+1});source.setItem(key,value);last=value;s.revision++;
 },raw:()=>last};
}
const api={fresh,validate,stats,syncDecision,current,advance,choose,beginBattle,finishBattle,restart,create,normalize};
if(typeof module==='object'&&module.exports)module.exports=api;else root.GoimonChapter3Progress=api;
})(typeof window!=='undefined'?window:globalThis);
