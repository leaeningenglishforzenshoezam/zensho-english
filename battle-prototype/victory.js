(function(root){'use strict';
const stories={
1:{1:'小さな番人の動きが止まり、森の音が戻ってきた。相棒は道の先へ耳を向ける。',2:'甲虫の硬い脚が地面を踏みしめ、攻撃の手が止まった。あなたたちは息を整える。',3:'山猫の素早い動きが止まり、枝葉の揺れる音だけが残った。相棒はあなたのそばへ戻ってくる。',4:'巨像の重い腕が下がり、石門の前に静けさが戻った。あなたたちは顔を見合わせる。',5:'守護者の大きな足が止まり、祭壇に静けさが戻った。相棒は息を整え、あなたを振り返る。',mist:'黒い霧の圧力がほどけ、視界が少しずつ晴れていく。あなたたちは守護者の姿を確かめた。'},
2:{1:'追跡体の輪郭が崩れ、街道に張りつめていた空気が緩んだ。あなたたちは少女と小さなゴイモンへ向き直る。',2:'ハスガメの動きが静まり、水面の波紋がゆっくりと広がった。相棒は慎重に足を進める。',3:'水面を切る動きが止まり、地下水路に水音が戻った。あなたたちは周囲を確かめる。',4:'激しく弾けていた泡が落ち着き、池の向こうが見えてきた。相棒は小さく息をつく。',5:'石の守護者の動きが止まり、重い響きが水路へ消えていった。あなたたちは慎重に様子をうかがう。',6:'水しぶきが落ち着き、急流の音が再び耳に届く。あなたたちは足場を確かめた。',7:'オオヌシの攻撃が止まった。あなたたちは距離を保ち、相手の様子を見守る。',8:'分裂体の影がほどけ、操作盤の前にわずかな空間が戻った。相棒はまだ警戒を解かない。',9:'巨大な共鳴獣の動きが止まった。あなたたちの視線は、その背後に囚われた二人へ向かう。'}
};
function show({chapter,id,stage,panel,onContinue,guard=fn=>fn}){stage.classList.add('victory-fade');const title=document.createElement('h2');title.textContent='勝利！';panel.append(title);const p=document.createElement('p');p.className='story-text narration-text';p.textContent=stories[chapter]?.[id]||'戦いが終わり、あたりに静けさが戻った。';panel.append(p);const b=document.createElement('button');b.className='primary';b.textContent='物語の続きへ';let continued=false;b.onclick=guard(()=>{if(continued)return;continued=true;b.disabled=true;onContinue();});panel.append(b);}
const api={stories,show};if(typeof module!=='undefined')module.exports=api;else root.GoimonVictory=api;
})(typeof window!=='undefined'?window:globalThis);
