(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.GoimonQuestTutorial=api;})(typeof window==='object'?window:globalThis,()=>{'use strict';
const stages=[{name:'ことばの入口',enemy:'intro',attr:'echo',before:'遺跡の門が開いた。番人と一緒に、言葉の力を試そう。',after:'最初の一歩を踏み出した。奥から小さな声が聞こえる。'}, {name:'響きの回廊',enemy:'normal',attr:'metal',before:'響きが重なる回廊。属性を見て、使う技を選ぼう。',after:'響きが道しるべになった。風の吹く道へ進もう。'}, {name:'風の小径',enemy:'swift',attr:'mirage',before:'素早い番人が現れた。先手を取られても、防御で切り抜けよう。',after:'風を追い越した先に、重い扉が見えてきた。'}, {name:'守りの扉',enemy:'tank',attr:'metal',before:'頑丈な番人が扉を守っている。技の残り回数を考えて戦おう。',after:'扉が開き、遺跡の中心に光が差した。'}, {name:'ことばの守護者',enemy:'boss',attr:'echo',before:'最後の守護者と向き合う。これまで学んだ攻撃・防御・技を使おう。',after:'守護者はうなずいた。「学び続ける君に、次の道を託そう。」'}];
function create(){return {practice:0,trained:false,claimed:false,shards:0,item:null,equipped:false,complete:false,cleared:0};}
function practice(s,action){const expected=['normal','defense','skill'][s.practice];if(!expected||action!==expected||s.trained)throw Error('練習は通常攻撃・防御・技の順に進めてください。');s.practice++;if(s.practice===3)s.trained=true;}
function restart(s){if(!s.trained)s.practice=0;}
function claim(s){if(!s.trained||s.claimed)throw Error('このプレゼントは受け取り済み、またはまだ受け取れません。');s.claimed=true;s.shards=10;}
function draw(s,gear,rng=Math.random){if(!s.claimed||s.item||s.shards<10)throw Error('体験ガチャはプレゼントの10個で1回だけ引けます。');const r=rng();if(!Number.isFinite(r)||r<0||r>=1)throw Error('抽選値が不正です。');const rarity=r<.75?'N':r<.95?'R':'SR',pool=gear.filter(g=>g.stat&&g.rarity===rarity);if(!pool.length)throw Error('装備候補がありません。');const v=rng();if(!Number.isFinite(v)||v<0||v>=1)throw Error('抽選値が不正です。');const item=pool[Math.floor(v*pool.length)];s.shards-=10;s.item={...item};return s.item;}
function equip(s){if(!s.item||s.equipped)throw Error('装備を引いてからセットしてください。');s.equipped=true;s.complete=true;}
function clear(s,n,won){if(!s.complete||!Number.isInteger(n)||n<1||n>stages.length||n>s.cleared+1)throw Error('まだ挑戦できないステージです。');if(won&&n===s.cleared+1)s.cleared=n;}
return {stages,create,practice,restart,claim,draw,equip,clear};
});
