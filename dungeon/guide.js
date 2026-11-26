const lessons = [
 ['挑戦するたびに変わる','相棒と地図を進み、英語の問題を解いて敵を倒し、奥にいるボスを目指します。戦いで使うカードを道中で少しずつ集めるのが、このダンジョンの遊び方です。',['その挑戦で使うカード全体がDECK（デッキ）。そこから引いて、今使えるカードがHAND（手札）です。','新しく挑戦すると、道中の出来事や報酬の候補も変わります。報酬例 A・B で、選べるカードを見比べよう。'],[['1a','報酬例 A'],['1b','報酬例 B']]],
 ['級と相棒を選ぶ','まず、練習したい級を選ぼう。選んだ1級・2級に合わせて、ダンジョンで出る英語の問題が変わります。',['自分のゴイモンから、一緒に戦う相棒を選びます。','持っているスキルのうち、ダンジョンに対応するものを最大3種類選べます。持ち込んだスキルはカードとして戦闘で引けます。'],[['2','級・相棒・持ち込みスキル']]],
 ['地図で行き先を決める','現在地から線でつながったマスのうち、次に進みたいものをタップします。',['戦闘マスでは敵が登場。勝つとカードを手に入れるチャンスです。','「？」は何が起きるか入ってから分かるマス。分かれ道では、戦ってカードを増やすか、イベントに進むかを選ぼう。'],[['3','分かれ道の例']]],
 ['敵の次の行動を見る','カードを使う前に、敵の「NEXT」を見よう。次の攻撃が分かれば、攻めるか守るかを決められます。',['APは、そのターンにカードを使うためのポイント。最初は3あり、左上に「1」とあるカードを使うと残りは2です。','例えば「10 DMG」なら、GUARD（通常防御）で防御を5得ると、受けるダメージを5減らせます。'],[['4','敵の予告・手札・残りAP']]],
 ['英語に答えて攻撃する','手札のSTRIKE（通常攻撃）をタップすると、英語の問題が開きます。正解すると攻撃が発動します。',['HPは残りの体力です。この例では正解すると敵のHPが10減ります。敵のHPを0にすれば勝利です。','使えるカードがあれば続けて選べます。END TURN（ターン終了）を押すと敵が行動し、次の手札を引きます。'],[['5a','問題を解く'],['5b','攻撃した後']]],
 ['報酬でデッキを育てる','勝ったら報酬の候補を見よう。カードをタップすると、決定する前に効果を読めます。',['決め手は、さっきの戦いで困ったこと。敵を倒すのに時間がかかったなら攻撃、HPを大きく削られたなら防御や回復が役立ちます。','選んだ1枚はデッキに加わります。次の戦闘から、ほかのカードと一緒に山札から引けるようになります。'],[['6','報酬カードを選んだところ']]]
];
const by=id=>document.getElementById(id);
let page=0,selected=0;
function showScene(box,key,label){
 const image=new Image();
 image.alt=label;
 image.src='scenes/scene-'+key+'.jpg';
 box.replaceChildren(image);
}
function pick(index){
 selected=index;const scenes=lessons[page][3];const [key,label]=scenes[index];
 for(const [i,b] of Array.from(by('switches').children).entries())b.setAttribute('aria-pressed',String(i===index));
 by('label').textContent=label;by('zoom').setAttribute('aria-label',label+'を拡大');showScene(by('thumb'),key,label)
}
function render(){
 const n=Number(location.hash.slice(1));page=Number.isInteger(n)&&n>=1&&n<=lessons.length?n-1:0;
 const [title,intro,tips,scenes]=lessons[page];by('pages').selectedIndex=page;by('number').textContent=(page+1)+' / '+lessons.length;by('title').textContent=title;by('intro').textContent=intro;
 by('tips').replaceChildren(...tips.map(t=>{const li=document.createElement('li');li.textContent=t;return li}));
 by('switches').replaceChildren();if(scenes.length>1)scenes.forEach(([,name],i)=>{const b=document.createElement('button');b.textContent=name;b.onclick=()=>pick(i);by('switches').append(b)});
 by('prev').disabled=page===0;by('next').textContent=page===5?'読み終える':'次へ';pick(0);document.querySelector('.content').scrollTop=0
}
lessons.forEach(([name],i)=>by('pages').add(new Option((i+1)+'　'+name,i)));
by('pages').onchange=e=>location.hash=Number(e.target.value)+1;
by('prev').onclick=()=>location.hash=page;function backToMenu(){
 if(parent!==window)parent.postMessage('guide-menu',location.origin);
 else location.assign('index.html');
}
by('next').onclick=()=>{if(page===5)backToMenu();else location.hash=page+2};
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!document.querySelector('dialog[open]'))backToMenu()});
by('zoom').onclick=()=>{const [key,label]=lessons[page][3][selected];by('largeLabel').textContent=label;by('dialog').showModal();showScene(by('large'),key,label)};
by('close').onclick=()=>by('dialog').close();by('dialog').onclose=()=>by('large').replaceChildren();
onhashchange=render;render();
