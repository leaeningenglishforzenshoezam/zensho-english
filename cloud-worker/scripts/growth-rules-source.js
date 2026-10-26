// Build-time only: extract pure existing rules, never load browser code in a Worker.
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
export async function growthRulesSource(){
 const root=new URL('../../',import.meta.url),window={};
 for(const file of ['goimon_rules.js','goimon_dex.js'])vm.runInNewContext(await readFile(new URL(file,root),'utf8'),{window});
 const source=await readFile(new URL('goimon.js',root),'utf8');
 const extra={};for(const [category,file,name]of [['idiom_quiz','idiom_quiz.js','IDIOM_GOIMON_DELTA'],['paraphrase_quiz','paraphrase_quiz.js','PARAPHRASE_GOIMON_DELTA']]){
  const text=await readFile(new URL(file,root),'utf8'),match=text.match(new RegExp('const '+name+' = (\\{[^;]+\\});'));if(!match)throw Error('missing '+name);extra[category]=vm.runInNewContext('('+match[1]+')');
 }
 const constant=name=>{const match=source.match(new RegExp('  const '+name+' = ([\\s\\S]*?\\n  \\});'));if(!match)throw Error('missing '+name);return 'const '+name+' = '+match[1]+';';};
 const fn=name=>{const match=source.match(new RegExp('  function '+name+'\\([^]*?\\n  \\}'));if(!match)throw Error('missing '+name);return match[0];};
 const images={},names={};for(const type of window.GOIMON_DEX.speciesOrder){images[type]={};names[type]={};for(const stage of ['egg','child','growth','mid','final']){images[type][stage]=window.GoimonDex.getEntry(type,stage)?.image;names[type][stage]=window.GoimonDex.getEntry(type,stage)?.name;}}
 return '// Generated from goimon.js, goimon_rules.js and goimon_dex.js. Do not edit.\n'+
  source.match(/const STAGE_ORDER = [^\n]+;/)[0]+'\n'+
  constant('POINT_RULES')+'\n'+constant('STAGE_POINT_THRESHOLDS')+'\n'+constant('STAGE_IMAGES')+'\n'+
  'const images='+JSON.stringify(images)+';\n'+
  'const names='+JSON.stringify(names)+';\n'+
  'export const MISSION_EXTRA_POINT_RULES='+JSON.stringify(extra)+';\n'+
  'const window={GOIMON_RULES:'+JSON.stringify({branches:window.GOIMON_RULES.branches})+',GOIMON_DEX:'+JSON.stringify({common:{egg:{image:window.GOIMON_DEX.common.egg.image}}})+',GoimonDex:{getEntry:(type,stage)=>({image:images[type]?.[stage]})}};\n'+
  'window.GoimonRules={'+window.GoimonRules.checkCondition.toString()+','+window.GoimonRules.decideEvolutionType.toString()+'};\n'+
  ['roundPoint','sumStats','calculateLevel','normalizeStage','getDefaultStats','getDefaultCurrent','getImageFor','getNextThresholdForStage','getNextStage','decideTypeForEvolution','determinePendingEvolution'].map(fn).join('\n')+'\n'+
  'export {POINT_RULES, STAGE_ORDER, images, names, getDefaultCurrent, roundPoint, sumStats, calculateLevel, getImageFor, determinePendingEvolution};\n';
}
