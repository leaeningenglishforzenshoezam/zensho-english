(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.GoimonQuestTutorial=api;})(typeof window==='object'?window:globalThis,()=>{'use strict';
const lessons=[
 {title:'ステージ0｜冒険のはじめかた',text:'学習問題に答えてゴイモンと戦う冒険です。まず戦い方を練習し、体験用の装備を手に入れましょう。間違えても何度でも挑戦できます。'},
 {title:'4つの能力',text:'たいりょく（HP）は戦える力、こうげきは与えるダメージ、ぼうぎょは受けるダメージを抑える力、すばやさは行動する順番です。ことば・ちえ・ぶんみゃく・おんかんが、それぞれの能力を伸ばします。'},
 {title:'属性の相性',text:'エコー → メタル → ミラージュ → エコーの順で有利です。有利ならダメージ1.2倍、不利なら0.8倍、同じ属性なら1倍。通常攻撃はゴイモンの属性、技は技自身の属性を使います。',question:'エコーの攻撃が有利な相手は？',choices:['メタル','ミラージュ','エコー'],answer:'メタル'},
 {title:'通常攻撃',text:'自分の番に通常攻撃か技を選び、学習問題に答えます。通常攻撃は何度でも使えます。正解なら通常の威力、不正解なら威力が半分になります。',question:'protect の意味は？',choices:['守る','走る','忘れる'],answer:'守る'},
 {title:'防御は毎回行う',text:'敵が攻撃するときは、必ず防御問題に答えます。正解なら被ダメージが通常の70％に、不正解なら120％になります。正答を確認して、次の防御につなげましょう。',question:'take care of の意味は？',choices:['世話をする','あきらめる','出発する'],answer:'世話をする'},
 {title:'技と使用回数',text:'技は2つセットできます。強い攻撃や回復など、それぞれに使用回数があります。不正解でも1回消費し、次の戦闘で回復します。バランス型は各技を1回多く使えます。'},
 {title:'素早さと得意な戦い方',text:'素早いほうが先に行動します。同じ速さなら順番はランダム。速さ型は先手の攻撃が強く、防御型は防御問題の正解で反撃します。回復型は回復技が得意です。問題に答える速さは能力に影響しません。'}
];
const stages=[{name:'ことばの入口',enemy:'intro',attr:'echo',before:'遺跡の門が開いた。番人と一緒に、言葉の力を試そう。',after:'最初の一歩を踏み出した。奥から小さな声が聞こえる。'}, {name:'響きの回廊',enemy:'normal',attr:'metal',before:'響きが重なる回廊。属性を見て、使う技を選ぼう。',after:'響きが道しるべになった。風の吹く道へ進もう。'}, {name:'風の小径',enemy:'swift',attr:'mirage',before:'素早い番人が現れた。先手を取られても、防御で切り抜けよう。',after:'風を追い越した先に、重い扉が見えてきた。'}, {name:'守りの扉',enemy:'tank',attr:'metal',before:'頑丈な番人が扉を守っている。技の残り回数を考えて戦おう。',after:'扉が開き、遺跡の中心に光が差した。'}, {name:'ことばの守護者',enemy:'boss',attr:'echo',before:'最後の守護者と向き合う。これまで学んだ攻撃・防御・技を使おう。',after:'守護者はうなずいた。「学び続ける君に、次の道を託そう。」'}];
function create(){return {lesson:0,checked:false,claimed:false,shards:0,item:null,equipped:false,complete:false,cleared:0};}
function check(s,answer){const l=lessons[s.lesson];if(!l||!l.question)throw Error('確認問題はありません。');s.checked=answer===l.answer;return s.checked;}
function next(s){const l=lessons[s.lesson];if(!l||l.question&&!s.checked)throw Error('正答を確認してから進んでください。');s.lesson++;s.checked=false;}
function claim(s){if(s.lesson!==lessons.length||s.claimed)throw Error('このプレゼントは受け取り済み、またはまだ受け取れません。');s.claimed=true;s.shards=10;}
function draw(s,gear,rng=Math.random){if(!s.claimed||s.item||s.shards<10)throw Error('体験ガチャはプレゼントの10個で1回だけ引けます。');const r=rng();if(!Number.isFinite(r)||r<0||r>=1)throw Error('抽選値が不正です。');const rarity=r<.75?'N':r<.95?'R':'SR',pool=gear.filter(g=>g.stat&&g.rarity===rarity);if(!pool.length)throw Error('装備候補がありません。');const v=rng();if(!Number.isFinite(v)||v<0||v>=1)throw Error('抽選値が不正です。');const item=pool[Math.floor(v*pool.length)];s.shards-=10;s.item={...item};return s.item;}
function equip(s){if(!s.item||s.equipped)throw Error('装備を引いてからセットしてください。');s.equipped=true;s.complete=true;}
function clear(s,n,won){if(!s.complete||!Number.isInteger(n)||n<1||n>stages.length||n>s.cleared+1)throw Error('まだ挑戦できないステージです。');if(won&&n===s.cleared+1)s.cleared=n;}
return {lessons,stages,create,check,next,claim,draw,equip,clear};
});
