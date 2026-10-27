// Chapter-specific metadata for the shared quest menu and record views.
(function(root){'use strict';const D=root.GoimonChapter2Data,A=root.GoimonChapter2Assets;
function frame(scene,line){const n=scene+1,people=['morii'];if((n===3&&line>=13)||(n>=4&&!(n>=7&&n<=9)&&!(n===10&&line<3)&&!(n===23&&line>=8)))people.push('saya');if((n===2&&line>=2)||(n>=3&&!(n>=7&&n<=9)&&!(n===10&&line<3)&&!(n===23&&line>=8)))people.push('toyoyo');const cues={2:[7,1],5:[0,2],8:[1,3],9:[4,4],11:[0,5],15:[2,6],16:[0,7],18:[4,8],19:[5,9]};return {people,enemy:cues[n]&&line>=cues[n][0]?cues[n][1]:null};}
const descriptions=['街道で少女たちを追っていた黒霧。','小さな水場に居座るゴイモン。','地下水路の水面から飛び出したゴイモン。','泡の池の奥から迫る大きなゴイモン。','古い石扉の脇で動き出した石像。','急流の通路で襲いかかる水辺のゴイモン。','深い池を縄張りとして守る野生のゴイモン。','操作室で細かく分かれ、足元に迫る黒霧。','黒い装甲を持つ四足の魔獣。サーヤとトヨヨを背後の霧に捕らえた。'];
const chapter={id:'chapter2',number:2,level:'1',name:D.title,url:'quest_chapter2.html',configure:'quest_chapter2.html',cover:A.path('backgrounds','hills'),map:null,stages:D.battles.map(b=>b.id),data:D,key:account=>'goimon_chapter2_v1:'+account+':lv1',store:root.GoimonChapter2Progress,unlocked:(storage,account)=>root.GoimonChapter2Access.unlocked(storage,account,root.GoimonChapter1Data,root.GoimonChapterStore),intro:'もうひと組の相棒と、水の消えた街へ。',frame,characters:[
{id:'morii',name:'モリィ',kind:'仲間',image:'images/quest/chapter1/morii_normal.png',description:'ことばの森から旅を続ける、明るく親切な案内役。',seen:f=>f.people.includes('morii')},
{id:'saya',name:'サーヤ',kind:'仲間',image:A.path('characters','saya_normal'),description:'トヨヨと言葉を交わす少女。水不足に悩む街のために行動する。',seen:f=>f.people.includes('saya')},
{id:'toyoyo',name:'トヨヨ',kind:'仲間',image:A.path('characters','toyoyo_normal'),description:'サーヤの相棒。サーヤと互いの言葉を理解できるゴイモン。',seen:f=>f.people.includes('toyoyo')},
...D.battles.map((b,i)=>({id:'ch2-enemy-'+b.id,name:b.name,kind:b.id===9?'最終ボス':'出会った敵',image:A.path('enemies',b.id),battle:b.id,description:descriptions[i],seen:f=>f.enemy===b.id}))]};
root.GoimonAdditionalQuestChapters=[...(root.GoimonAdditionalQuestChapters||[]),chapter];
})(typeof window!=='undefined'?window:globalThis);
