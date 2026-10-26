(function(root){'use strict';
const clone=x=>JSON.parse(JSON.stringify(x));
function fresh(data,pet,skills=[],gear='none'){return {version:1,scriptVersion:data.scriptVersion,revision:0,scene:0,line:0,mode:'story',pet:clone(pet),partnerId:pet.id,skills,gear,read:[],cleared:[],run:null,checkpoint:null,combat:null,question:null,feedback:null,misses:[],completed:false};}
function validate(s,d){
 if(!s||s.version!==1||s.scriptVersion!==d.scriptVersion||!Number.isSafeInteger(s.revision)||s.revision<0||!Number.isInteger(s.scene)||!d.scenes[s.scene]||!Number.isInteger(s.line)||s.line<0||s.line>d.scenes[s.scene].lines.length||!['story','battle','defeat','complete'].includes(s.mode)||!s.pet||typeof s.partnerId!=='string'||!Array.isArray(s.skills)||!Array.isArray(s.read)||!Array.isArray(s.cleared)||!Array.isArray(s.misses))throw Error('第2章の保存形式を確認できません。元の記録は保持しています。');
 const lines=new Set(d.scenes.flatMap(x=>x.lines.map(l=>l.id))),battles=new Set(d.battles.map(b=>b.id));
 if(s.read.some(id=>!lines.has(id))||s.cleared.some(id=>!battles.has(id)))throw Error('第2章の進行記録が一致しません。');
 if(['battle','defeat'].includes(s.mode)&&(!s.combat||!s.checkpoint||s.battleId!==d.scenes[s.scene].battleId||s.line!==d.scenes[s.scene].lines.length))throw Error('戦闘の再開位置を確認できません。');
 if(s.mode==='complete'&&(s.scene!==d.scenes.length-1||d.battles.some(b=>!s.cleared.includes(b.id))||!s.completed))throw Error('第2章のクリア記録が不足しています。');
 return s;
}
function nextScene(s,d){if(s.scene===d.scenes.length-1){s.mode='complete';s.completed=true;}else{s.scene++;s.line=0;s.mode='story';}}
function advance(s,d){if(s.mode!=='story')return;const scene=d.scenes[s.scene],line=scene.lines[s.line];if(line){if(!s.read.includes(line.id))s.read.push(line.id);s.line++;}if(s.line===scene.lines.length&&!scene.battleId)nextScene(s,d);}
function finish(s,d){if(!s.combat?.ended)throw Error('戦闘はまだ終了していません。');if(s.combat.winner!=='player'){s.mode='defeat';return;}if(!s.cleared.includes(s.battleId))s.cleared.push(s.battleId);s.run=clone(s.combat.player);s.run.hp=Math.min(s.run.maxHp,s.run.hp+Math.ceil((s.run.maxHp-s.run.hp)/4));s.combat=null;s.question=null;s.feedback=null;nextScene(s,d);}
function create(storage,key,d){let last=storage.getItem(key);return {load:()=>last?validate(JSON.parse(last),d):null,save(s){if(storage.getItem(key)!==last)throw Error('別のタブで第2章が更新されました。再読み込みしてください。');validate(s,d);const value=JSON.stringify({...s,revision:s.revision+1});storage.setItem(key,value);last=value;s.revision++;},raw:()=>last};}
const api={fresh,validate,advance,finish,create};if(typeof module!=='undefined')module.exports=api;else root.GoimonChapter2Progress=api;
})(typeof window!=='undefined'?window:globalThis);
