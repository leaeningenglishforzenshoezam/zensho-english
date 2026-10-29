// Fix only variance for formula tests; production keeps its random damage.
const core=require('../battle-prototype/core.js');
module.exports={...core,resolve(b,command,correct,options={}){
  return core.resolve(b,command,correct,{rng:()=>.5,...options});
}};
