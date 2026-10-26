// Server-only draft. No HTTP route or production grants are enabled.
import catalog from '../../battle-prototype/catalog.js';
export const RULES=Object.freeze({version:2,cost:10,normalWeights:[94,5,1],guaranteedWeights:[0,5,1],exchangeCopies:5,exchangeShards:10});
const groups={gear:catalog.gear.filter(x=>x.id!=='none'),skills:catalog.skills};
const MAX=9999;
export function emptyEconomy(){return {version:1,shards:0,owned:{gear:{},skills:{}}};}
function integer(n,max=MAX){return Number.isSafeInteger(n)&&n>=0&&n<=max;}
function exact(o,keys){return o&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).every(k=>keys.includes(k))&&keys.every(k=>Object.hasOwn(o,k));}
export function validateState(s){
 if(!exact(s,['version','shards','owned'])||s.version!==1||!integer(s.shards,1000000)||!exact(s.owned,['gear','skills']))throw Error('invalid_economy');
 for(const kind of Object.keys(groups)){const inv=s.owned[kind];if(!inv||typeof inv!=='object'||Array.isArray(inv))throw Error('invalid_inventory');
 for(const [id,count]of Object.entries(inv))if(!groups[kind].some(x=>x.id===id)||!integer(count))throw Error('invalid_inventory');}
 return s;
}
// Rejection sampling avoids modulo bias. This source is never accepted from clients.
export function secureRandom(){const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]/4294967296;}
function pick(pool,rng){const r=rng();if(!Number.isFinite(r)||r<0||r>=1)throw Error('invalid_random');return pool[Math.floor(r*pool.length)];}
export function planDraw(state,kind,count,rng=secureRandom){
 validateState(state);if(!Object.hasOwn(groups,kind)||![1,10].includes(count))throw Error('invalid_draw');
 const cost=count*RULES.cost;if(state.shards<cost)throw Error('insufficient_shards');
 const next=structuredClone(state),items=[];
 for(let i=0;i<count;i++){
  // Always reserve the last slot of a bulk ten draw for R/SR, even if earlier slots were rare.
  const weights=count===10&&i===9?RULES.guaranteedWeights:RULES.normalWeights;
  const tickets=weights.flatMap((n,j)=>Array(n).fill(['N','R','SR'][j]));
  const rarity=pick(tickets,rng),item=pick(groups[kind].filter(x=>x.rarity===rarity),rng);
  const amount=(next.owned[kind][item.id]||0)+1;if(amount>MAX)throw Error('inventory_limit');
  next.owned[kind][item.id]=amount;items.push({id:item.id,rarity});
 }
 next.shards-=cost;return {next,result:{kind,count,cost,items,rulesVersion:RULES.version}};
}
// reserved is calculated from authoritative server loadouts, never a client declaration.
// Exchanges remain blocked until that authoritative registry is connected.
export function planExchange(state,kind,itemId,reserved){
 validateState(state);if(!Object.hasOwn(groups,kind)||!groups[kind].some(x=>x.id===itemId)||!integer(reserved))throw Error('invalid_exchange');
 const owned=state.owned[kind][itemId]||0;if(reserved>owned||owned-reserved<5)throw Error('insufficient_unregistered_copies');
 const next=structuredClone(state);next.owned[kind][itemId]=owned-5;next.shards+=10;validateState(next);
 return {next,result:{kind,itemId,copies:5,shards:10,rulesVersion:1}};
}
