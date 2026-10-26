(function(root){'use strict';
const FORMATS=['word_meaning','q1','q3','idiom','q9','q11','q12'];
function skillFormat(skills,command,side,training){
 if(side==='enemy'||command==='normal'||training)return 'word_meaning';
 const match=/^skill:([0-3])$/.exec(command||'');
 if(!match)throw Error('Invalid skill command');
 const skill=skills[Number(match[1])];
 if(!skill||!FORMATS.includes(skill.questionFormat))throw Error('Skill question format unavailable');
 return skill.questionFormat;
}
function assertAvailable(format,providers){
 if(format==='word_meaning')return true;
 if(!providers||!Array.isArray(providers[format])||providers[format].length===0)throw Error('「'+format+'」の問題データが接続されていません。別の技を選んでください。');
 return true;
}
const api={FORMATS,skillFormat,assertAvailable};
if(typeof module!=='undefined')module.exports=api;else root.GoimonSkillQuestionRouting=api;
})(typeof window!=='undefined'?window:globalThis);
