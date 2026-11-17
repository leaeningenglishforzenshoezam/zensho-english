// GOIMON QUEST Chapter 3 story. Dialogue lines and branch nodes have stable IDs.
(function(root){'use strict';
const data={
  "version": 1,
  "scriptVersion": "chapter3-ja-v2-20261117",
  "title": "山道の罠",
  "nextDestination": "トシャカ",
  "notes": "19 scenes / 8 choices / 24 outcomes. Route gate: 10/13 plus two flags. Scene nodes support optional route and battle ids.",
  "battles": [
    {
      "id": "ambush",
      "name": "山道の盗賊ゴイモン",
      "objective": "survive",
      "music": "battle",
      "scriptedRescue": true
    },
    {
      "id": "demo",
      "name": "バドとの模擬戦",
      "objective": "win",
      "music": "battle"
    },
    {
      "id": "bado",
      "name": "バド",
      "objective": "survive",
      "music": "boss",
      "route": "duel",
      "nonlethal": true
    },
    {
      "id": "hiro_ally",
      "name": "斧使いヒロトシ",
      "objective": "win",
      "music": "boss",
      "route": "ally"
    },
    {
      "id": "hiro_duel",
      "name": "斧使いヒロトシ",
      "objective": "win",
      "music": "boss",
      "route": "duel"
    }
  ],
  "scenes": [
    {
      "id": "s01",
      "title": "山道の襲撃",
      "background": "mountain_trail",
      "nodes": [
        {
          "id": "ch3.s01.001",
          "type": "narration",
          "text": "夕方の山道は、思っていたよりずっと静かだった。木々の向こうにトシャカへ続く尾根が見える。"
        },
        {
          "id": "ch3.s01.002",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "ねえ、まだ歩くの？"
        },
        {
          "id": "ch3.s01.003",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "もう少しのはずなんだけど。"
        },
        {
          "id": "ch3.s01.004",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "さっきもそう言ってなかった？"
        },
        {
          "id": "ch3.s01.005",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……言ったかも。"
        },
        {
          "id": "ch3.s01.006",
          "type": "narration",
          "text": "茂みから一体のゴイモンが現れる。別の一体が背後へ回り、主人公の荷物を狙った。"
        },
        {
          "id": "ch3.s01.007",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……戦うしかないか！"
        },
        {
          "id": "ch3.s01.008",
          "type": "battle",
          "battleId": "ambush"
        },
        {
          "id": "ch3.s01.009",
          "type": "narration",
          "text": "応戦しても、群れの頭領には歯が立たない。相棒が足を滑らせる。"
        },
        {
          "id": "ch3.s01.010",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "危ない！"
        },
        {
          "id": "ch3.s01.011",
          "type": "narration",
          "text": "鋭い金属音。振り下ろされた一撃を、若い男の斧が受け止めていた。"
        },
        {
          "id": "ch3.s01.012",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "間に合った。けがは？"
        },
        {
          "id": "ch3.s01.013",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……足を少し。"
        },
        {
          "id": "ch3.s01.014",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "そっか。じゃあ、下がってて。バド！"
        },
        {
          "id": "ch3.s01.015",
          "type": "narration",
          "text": "大きなゴイモンが木立から飛び出し、男とともに盗賊たちを追い払った。"
        },
        {
          "id": "ch3.s01.016",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "俺はヒロトシ。こいつはバド。頼りになるんだ。"
        },
        {
          "id": "ch3.s01.017",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "ありがとう。本当に助かった。"
        },
        {
          "id": "ch3.s01.018",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "礼ならバドにも言ってやって。頑張ったのはこいつだから。"
        },
        {
          "id": "ch3.s01.019",
          "type": "choice",
          "choiceId": "c01"
        },
        {
          "id": "ch3.s01.020",
          "type": "narration",
          "text": "歩きだした相棒が片足をかばう。ヒロトシがすぐに気づいた。"
        },
        {
          "id": "ch3.s01.021",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……あれ、足を痛めてる？"
        },
        {
          "id": "ch3.s01.022",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "ちょっとだけ。"
        },
        {
          "id": "ch3.s01.023",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "それじゃ暗くなる前に山を越えるのは厳しいな。"
        }
      ]
    },
    {
      "id": "s02",
      "title": "寄り道",
      "background": "mountain_trail",
      "nodes": [
        {
          "id": "ch3.s02.001",
          "type": "narration",
          "text": "ヒロトシは先の斜面を指さした。"
        },
        {
          "id": "ch3.s02.002",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "この先に俺の家があるんだ。休んでいかない？"
        },
        {
          "id": "ch3.s02.003",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "でも、そこまで世話になるのは……。"
        },
        {
          "id": "ch3.s02.004",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "気にしないで。明るくなってから歩いた方がいいよ。"
        },
        {
          "id": "ch3.s02.005",
          "type": "narration",
          "text": "主人公は相棒の足を見る。無理に歩かせることはできそうになかった。"
        },
        {
          "id": "ch3.s02.006",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……じゃあ、お願いするよ。"
        },
        {
          "id": "ch3.s02.007",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "よし、決まり。"
        },
        {
          "id": "ch3.s02.008",
          "type": "narration",
          "text": "並んで歩くうち、主人公と相棒の会話を聞いていたヒロトシが振り返る。"
        },
        {
          "id": "ch3.s02.009",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "君たち、普通に話せるんだね。"
        },
        {
          "id": "ch3.s02.010",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "うん。"
        },
        {
          "id": "ch3.s02.011",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "俺もバドと話せたらなあ。長い付き合いだけど、そこまではできなくて。"
        },
        {
          "id": "ch3.s02.012",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "でも、さっきは息が合ってたよ。"
        },
        {
          "id": "ch3.s02.013",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "こいつは俺の言うことをよく聞いてくれるからね。"
        },
        {
          "id": "ch3.s02.014",
          "type": "narration",
          "text": "バドは一歩先を歩いていた。ヒロトシが呼ぶと、慣れた足取りで隣へ戻ってくる。"
        }
      ]
    },
    {
      "id": "s03",
      "title": "暖炉のそば",
      "background": "cottage_dining",
      "nodes": [
        {
          "id": "ch3.s03.001",
          "type": "narration",
          "text": "斜面に小さな山小屋があった。裏庭の囲いでは数体のゴイモンが暮らし、そのうち一体が片足を引きずっている。"
        },
        {
          "id": "ch3.s03.002",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "あの子、けがしてるの？"
        },
        {
          "id": "ch3.s03.003",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "うん。なかなかよくならなくて。"
        },
        {
          "id": "ch3.s03.004",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "大丈夫かな。"
        },
        {
          "id": "ch3.s03.005",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "そろそろ楽にしてやらないとね。"
        },
        {
          "id": "ch3.s03.006",
          "type": "narration",
          "text": "家の中は暖かく、道具や食器が整然と並んでいた。ヒロトシは相棒の足を手当てし、夕食を用意する。"
        },
        {
          "id": "ch3.s03.007",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "いい匂い！"
        },
        {
          "id": "ch3.s03.008",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "たくさんあるから、遠慮しないで。"
        },
        {
          "id": "ch3.s03.009",
          "type": "narration",
          "text": "食事が進むと、ヒロトシは二人の旅に興味を示した。"
        },
        {
          "id": "ch3.s03.010",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "旅してて、一番大変だったのは？"
        },
        {
          "id": "ch3.s03.011",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "あの雨の日じゃない？"
        },
        {
          "id": "ch3.s03.012",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……あれは大変だったね。"
        },
        {
          "id": "ch3.s03.013",
          "type": "choice",
          "choiceId": "c02"
        },
        {
          "id": "ch3.s03.014",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "二人といると楽しいな。バドと俺も長いけど、こんなふうには話せないから。"
        },
        {
          "id": "ch3.s03.015",
          "type": "narration",
          "text": "暖炉のそばでバドが顔を上げる。ヒロトシはその頭をなでた。"
        },
        {
          "id": "ch3.s03.016",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "でも、今のままでも最高の相棒だよ。"
        },
        {
          "id": "ch3.s03.017",
          "type": "narration",
          "text": "夜、主人公たちは客間へ案内された。外は静かで、食器を片づける音だけが廊下に響いている。"
        },
        {
          "id": "ch3.s03.018",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "ヒロトシ、親切だったね。"
        },
        {
          "id": "ch3.s03.019",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "うん。明日には出発できるといいな。"
        },
        {
          "id": "ch3.s03.020",
          "type": "narration",
          "text": "二人は眠りについた。"
        }
      ]
    },
    {
      "id": "s04",
      "title": "鍵の音",
      "background": "storage_room",
      "nodes": [
        {
          "id": "ch3.s04.001",
          "type": "narration",
          "text": "目覚めた部屋には、昨夜の暖炉がなかった。石の壁、高い小窓、外側から鍵をかけられた厚い扉。"
        },
        {
          "id": "ch3.s04.002",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……相棒、起きて。"
        },
        {
          "id": "ch3.s04.003",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……ここ、どこ？"
        },
        {
          "id": "ch3.s04.004",
          "type": "narration",
          "text": "主人公は扉を押す。びくともしない。"
        },
        {
          "id": "ch3.s04.005",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "誰か！ 開けて！"
        },
        {
          "id": "ch3.s04.006",
          "type": "narration",
          "text": "足音が近づき、鍵が回る。ヒロトシは昨日と変わらない笑顔だった。"
        },
        {
          "id": "ch3.s04.007",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "おはよう。よく眠れた？"
        },
        {
          "id": "ch3.s04.008",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "どうして鍵をかけたの？"
        },
        {
          "id": "ch3.s04.009",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "帰っちゃうだろ？"
        },
        {
          "id": "ch3.s04.010",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……帰るに決まってる。"
        },
        {
          "id": "ch3.s04.011",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "うん。だから。"
        },
        {
          "id": "ch3.s04.012",
          "type": "narration",
          "text": "ヒロトシは朝食を置く。主人公が近づいても、一歩も道を空けなかった。"
        },
        {
          "id": "ch3.s04.013",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "食べておいてね。"
        },
        {
          "id": "ch3.s04.014",
          "type": "narration",
          "text": "扉が閉まる。冷たい鍵の音が残る。"
        },
        {
          "id": "ch3.s04.015",
          "type": "narration",
          "text": "主人公たちは部屋を調べた。内側に鍵穴はなく、窓の外は石の多い急斜面になっている。"
        }
      ]
    },
    {
      "id": "s05",
      "title": "二つの皿",
      "background": "storage_room",
      "nodes": [
        {
          "id": "ch3.s05.001",
          "type": "narration",
          "text": "翌日の昼、ヒロトシは二皿の肉料理を持ってきた。バドは開いた扉の外に座っている。"
        },
        {
          "id": "ch3.s05.002",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "今日は見てもらいたいものがあるんだ。"
        },
        {
          "id": "ch3.s05.003",
          "type": "narration",
          "text": "ヒロトシは入口の椅子に腰を下ろし、一方の皿を味わう。続いてもう一方の皿へ手を伸ばした。"
        },
        {
          "id": "ch3.s05.004",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……やっぱり二つ一緒がいいな。"
        },
        {
          "id": "ch3.s05.005",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……何の肉？"
        },
        {
          "id": "ch3.s05.006",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "前にね、君たちみたいに二人で旅をしてる人が来たんだ。"
        },
        {
          "id": "ch3.s05.007",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "人間と、その相棒のゴイモン。とっても仲がよくて。"
        },
        {
          "id": "ch3.s05.008",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……その二人は？"
        },
        {
          "id": "ch3.s05.009",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "これ。"
        },
        {
          "id": "ch3.s05.010",
          "type": "narration",
          "text": "ヒロトシは皿を軽く持ち上げた。主人公が動けずにいると、もう一方の皿を示す。"
        },
        {
          "id": "ch3.s05.011",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "こっちがゴイモン。"
        },
        {
          "id": "ch3.s05.012",
          "type": "narration",
          "text": "主人公は相棒を引き寄せる。ヒロトシの視線が、その手の動きを追った。"
        },
        {
          "id": "ch3.s05.013",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……ああ。そうやって守るんだね。"
        },
        {
          "id": "ch3.s05.014",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……僕たちにも同じことをするつもり？"
        },
        {
          "id": "ch3.s05.015",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "うん。でも、まだだよ。"
        },
        {
          "id": "ch3.s05.016",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "君たちのこと、もっと知りたいから。"
        },
        {
          "id": "ch3.s05.017",
          "type": "narration",
          "text": "主人公は拳を握りしめた。ヒロトシは二人の反応を確かめながら、最後まで食事を続ける。"
        },
        {
          "id": "ch3.s05.018",
          "type": "narration",
          "text": "食器の音が遠ざかり、再び鍵がかかった。"
        }
      ]
    },
    {
      "id": "s06",
      "title": "逃げる約束",
      "background": "storage_room",
      "nodes": [
        {
          "id": "ch3.s06.001",
          "type": "narration",
          "text": "相棒は壁際で膝を抱えていた。主人公も、何を言えばいいかわからない。"
        },
        {
          "id": "ch3.s06.002",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……本当なのかな。"
        },
        {
          "id": "ch3.s06.003",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……。"
        },
        {
          "id": "ch3.s06.004",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "怖いよ。"
        },
        {
          "id": "ch3.s06.005",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……うん。"
        },
        {
          "id": "ch3.s06.006",
          "type": "narration",
          "text": "主人公は相棒の隣に座る。しばらくして、相棒が小さな声で聞いた。"
        },
        {
          "id": "ch3.s06.007",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "どうしよう。"
        },
        {
          "id": "ch3.s06.008",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……逃げよう。"
        },
        {
          "id": "ch3.s06.009",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "どうやって？"
        },
        {
          "id": "ch3.s06.010",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "まだわからない。でも、探そう。"
        },
        {
          "id": "ch3.s06.011",
          "type": "narration",
          "text": "相棒は主人公の手を握る。"
        },
        {
          "id": "ch3.s06.012",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……一緒にね。"
        },
        {
          "id": "ch3.s06.013",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "うん。"
        }
      ]
    },
    {
      "id": "s07",
      "title": "命令",
      "background": "storage_room",
      "nodes": [
        {
          "id": "ch3.s07.001",
          "type": "narration",
          "text": "夕方、バドが食事を運んできた。主人公は扉へ向かう背中を呼び止める。"
        },
        {
          "id": "ch3.s07.002",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……バド。ヒロトシが何をしてるか、知ってるの？"
        },
        {
          "id": "ch3.s07.003",
          "type": "narration",
          "text": "バドは短くうなずいた。相棒がその意味を主人公に伝える。"
        },
        {
          "id": "ch3.s07.004",
          "type": "choice",
          "choiceId": "c03"
        },
        {
          "id": "ch3.s07.005",
          "type": "narration",
          "text": "バドは食事を置き、扉の外へ出る。すぐに鍵がかかった。"
        },
        {
          "id": "ch3.s07.006",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……バドも、ぼくたちを助けてくれないんだね。"
        },
        {
          "id": "ch3.s07.007",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……うん。ヒロトシから離れるつもりは、ないみたいだ。"
        }
      ]
    },
    {
      "id": "s08",
      "title": "小さな窓",
      "background": "storage_room",
      "nodes": [
        {
          "id": "ch3.s08.001",
          "type": "narration",
          "text": "翌朝、主人公は小窓を見上げる。相棒なら、体を横にすれば通れるかもしれない。"
        },
        {
          "id": "ch3.s08.002",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……お前だけなら、あそこから出られるかな。"
        },
        {
          "id": "ch3.s08.003",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "一人で？ 外は山の斜面だよ。足も、まだ痛いし。"
        },
        {
          "id": "ch3.s08.004",
          "type": "narration",
          "text": "主人公は返事に迷う。そこへバドが水を運んできた。"
        },
        {
          "id": "ch3.s08.005",
          "type": "choice",
          "choiceId": "c04"
        },
        {
          "id": "ch3.s08.006",
          "type": "narration",
          "text": "どの方法も簡単ではない。主人公は寝具を戻す。"
        },
        {
          "id": "ch3.s08.007",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……外に出られる機会があればいいんだけど。"
        },
        {
          "id": "ch3.s08.008",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "それまでは、周りをよく見ておこう。"
        },
        {
          "id": "ch3.s08.009",
          "type": "narration",
          "text": "主人公は庭が見える窓へ、もう一度目を向けた。"
        }
      ]
    },
    {
      "id": "s09",
      "title": "楽にしてやる",
      "background": "storage_room",
      "nodes": [
        {
          "id": "ch3.s09.001",
          "type": "narration",
          "text": "昼、窓の外にヒロトシとバドが見えた。そばには初日に見た、足の悪いゴイモンがいる。"
        },
        {
          "id": "ch3.s09.002",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "もう無理しなくていいよ。"
        },
        {
          "id": "ch3.s09.003",
          "type": "narration",
          "text": "ヒロトシが斧を持ち上げた。主人公の胸に、初日の言葉がよみがえる。"
        },
        {
          "id": "ch3.s09.004",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "ヒロトシ！ その子をどうするの？"
        },
        {
          "id": "ch3.s09.005",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "そろそろ食べようと思って。"
        },
        {
          "id": "ch3.s09.006",
          "type": "narration",
          "text": "主人公は窓枠を強くつかむ。"
        },
        {
          "id": "ch3.s09.007",
          "type": "choice",
          "choiceId": "c05"
        },
        {
          "id": "ch3.s09.008",
          "type": "narration",
          "text": "ヒロトシは主人公とバドをしばらく見比べる。自分の料理より、二人の反応の方が気になり始めている。"
        },
        {
          "id": "ch3.s09.009",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……今日はやめておこうか。"
        },
        {
          "id": "ch3.s09.010",
          "type": "narration",
          "text": "ヒロトシは斧を下ろす。"
        },
        {
          "id": "ch3.s09.011",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "バド。その子、囲いに戻して。"
        },
        {
          "id": "ch3.s09.012",
          "type": "narration",
          "text": "バドは負傷ゴイモンが立ち上がるのを待ち、歩幅を合わせて囲いへ向かった。"
        },
        {
          "id": "ch3.s09.013",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "君たちを見てると、退屈しないな。"
        },
        {
          "id": "ch3.s09.014",
          "type": "narration",
          "text": "ヒロトシは家に戻っていく。主人公は囲いが見えなくなるまで窓から離れなかった。"
        },
        {
          "id": "ch3.s09.015",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……助かったね。"
        },
        {
          "id": "ch3.s09.016",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……うん。"
        }
      ]
    },
    {
      "id": "s10",
      "title": "冬の記憶",
      "background": "storage_room",
      "nodes": [
        {
          "id": "ch3.s10.001",
          "type": "narration",
          "text": "夕方、またバドが食事を運んできた。"
        },
        {
          "id": "ch3.s10.002",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……あの子は？"
        },
        {
          "id": "ch3.s10.003",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "囲いに戻ったって。"
        },
        {
          "id": "ch3.s10.004",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……よかった。"
        },
        {
          "id": "ch3.s10.005",
          "type": "narration",
          "text": "バドは主人公を見つめる。"
        },
        {
          "id": "ch3.s10.006",
          "type": "line",
          "speaker": "バド",
          "text": "お前の相棒でもないのに。"
        },
        {
          "id": "ch3.s10.007",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……怖がってたからだよ。"
        },
        {
          "id": "ch3.s10.008",
          "type": "narration",
          "text": "相棒を通してその言葉が伝わる。バドはまだ納得していないようだった。"
        },
        {
          "id": "ch3.s10.009",
          "type": "choice",
          "choiceId": "c06"
        },
        {
          "id": "ch3.s10.010",
          "type": "narration",
          "text": "廊下の奥からヒロトシの声がする。"
        },
        {
          "id": "ch3.s10.011",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "バドー！ ちょっと手伝って！"
        },
        {
          "id": "ch3.s10.012",
          "type": "narration",
          "text": "バドは顔を上げ、いつものように扉へ向かった。出る前に一度だけ主人公と相棒を見る。"
        },
        {
          "id": "ch3.s10.013",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……バドは、ヒロトシのことが本当に好きなんだね。"
        },
        {
          "id": "ch3.s10.014",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……うん。だから、難しいんだろうな。"
        }
      ]
    },
    {
      "id": "s11",
      "title": "庭へ",
      "background": "storage_room",
      "nodes": [
        {
          "id": "ch3.s11.001",
          "type": "narration",
          "text": "翌朝、ヒロトシはいつになく機嫌よく現れた。"
        },
        {
          "id": "ch3.s11.002",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "ねえ、君たちって戦ってるときも話せるんだよね？"
        },
        {
          "id": "ch3.s11.003",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……うん。"
        },
        {
          "id": "ch3.s11.004",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "一回、見せてくれない？ 庭でさ。"
        },
        {
          "id": "ch3.s11.005",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……外に出してくれるの？"
        },
        {
          "id": "ch3.s11.006",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "俺もバドもいるしね。逃げてもすぐ捕まえられるよ。"
        },
        {
          "id": "ch3.s11.007",
          "type": "narration",
          "text": "主人公は昨日まで窓から見ていた庭と、その外の山道を思い浮かべる。"
        },
        {
          "id": "ch3.s11.008",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……わかった。"
        },
        {
          "id": "ch3.s11.009",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "ほんと？ じゃあ準備してくる！"
        },
        {
          "id": "ch3.s11.010",
          "type": "narration",
          "text": "扉が閉まる。相棒は主人公を見る。"
        },
        {
          "id": "ch3.s11.011",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……外に出られるね。"
        },
        {
          "id": "ch3.s11.012",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "うん。庭の様子をよく見よう。"
        },
        {
          "id": "ch3.s11.013",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "走れるかな。"
        },
        {
          "id": "ch3.s11.014",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "無理はしないで。"
        },
        {
          "id": "ch3.s11.015",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "そっちもね。"
        }
      ]
    },
    {
      "id": "s12",
      "title": "二人の戦い方",
      "background": "courtyard",
      "nodes": [
        {
          "id": "ch3.s12.001",
          "type": "narration",
          "text": "庭には木箱や薪の山があった。囲いのゴイモンたちが遠巻きに見ている。庭の先にはトシャカ方面の山道が続く。ヒロトシがバドを呼ぶと、大きな体が庭の中央へ進み出た。"
        },
        {
          "id": "ch3.s12.002",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "バド、二人の相手をしてやって。手加減して、けがはさせないでね。"
        },
        {
          "id": "ch3.s12.003",
          "type": "battle",
          "battleId": "demo"
        },
        {
          "id": "ch3.s12.004",
          "type": "narration",
          "text": "模擬戦の終盤、主人公が右へ避けるよう叫ぶ。だが相棒は左へ回り込んだ。"
        },
        {
          "id": "ch3.s12.005",
          "type": "narration",
          "text": "主人公が戸惑ったのも一瞬だった。相棒の動きに合わせ、二人でバドの背後を取る。バドは追撃せず、二人を見比べた。"
        },
        {
          "id": "ch3.s12.006",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "今の、すごかった！ 右って言ったのに左へ行ったよね。"
        },
        {
          "id": "ch3.s12.007",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "右だと間に合わないと思ったんだ。"
        },
        {
          "id": "ch3.s12.008",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……うん。"
        },
        {
          "id": "ch3.s12.009",
          "type": "choice",
          "choiceId": "c07"
        },
        {
          "id": "ch3.s12.010",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "もう一回見せてよ。今度はあの障害物まで使って。"
        },
        {
          "id": "ch3.s12.011",
          "type": "narration",
          "text": "ヒロトシが指さした木箱の向こうには山道がある。主人公は相棒と目を合わせた。"
        },
        {
          "id": "ch3.s12.012",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……わかった。"
        }
      ]
    },
    {
      "id": "s13",
      "title": "逃げろ",
      "background": "courtyard",
      "nodes": [
        {
          "id": "ch3.s13.001",
          "type": "narration",
          "text": "二人は木箱を回り、薪の山を越える。実演を見守るヒロトシの視線から、ほんの一瞬だけ外れた。"
        },
        {
          "id": "ch3.s13.002",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……あそこ。"
        },
        {
          "id": "ch3.s13.003",
          "type": "narration",
          "text": "主人公はうなずく。"
        },
        {
          "id": "ch3.s13.004",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……行こう！"
        },
        {
          "id": "ch3.s13.005",
          "type": "narration",
          "text": "二人は庭を飛び出し、山道へ駆け下りた。背後でヒロトシが呼ぶ。"
        },
        {
          "id": "ch3.s13.006",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……あれ？ そっちは違うよ！"
        },
        {
          "id": "ch3.s13.007",
          "type": "narration",
          "text": "斧を手に取る音がする。"
        },
        {
          "id": "ch3.s13.008",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "バド、追いかけよう。"
        },
        {
          "id": "ch3.s13.009",
          "type": "narration",
          "text": "道は曲がりくねり、相棒の足もまだ痛む。主人公は何度も振り返りながら走った。"
        },
        {
          "id": "ch3.s13.010",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "大丈夫？"
        },
        {
          "id": "ch3.s13.011",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "うん……走れる。"
        },
        {
          "id": "ch3.s13.012",
          "type": "narration",
          "text": "山小屋の裏手に近い分かれ道へ出た。脇には薪小屋から運ばれた丸太と木箱が積まれている。そこにヒロトシが立っていた。斜面を横切る近道で先回りしたのだ。"
        },
        {
          "id": "ch3.s13.013",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "危ないよ、そんなに走ったら。"
        },
        {
          "id": "ch3.s13.014",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……通して。"
        },
        {
          "id": "ch3.s13.015",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "それは困るなあ。"
        },
        {
          "id": "ch3.s13.016",
          "type": "narration",
          "text": "背後からバドの足音が近づく。逃げ道がふさがれた。"
        }
      ]
    },
    {
      "id": "s14",
      "title": "相棒の選択",
      "background": "trail_exit",
      "nodes": [
        {
          "id": "ch3.s14.001",
          "type": "narration",
          "text": "ヒロトシは斧を手にしたまま、バドに目を向ける。"
        },
        {
          "id": "ch3.s14.002",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "バド。二人を捕まえて。"
        },
        {
          "id": "ch3.s14.003",
          "type": "narration",
          "text": "バドが一歩進む。しかし、すぐには飛びかからなかった。"
        },
        {
          "id": "ch3.s14.004",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……バド？"
        },
        {
          "id": "ch3.s14.005",
          "type": "choice",
          "choiceId": "c08"
        },
        {
          "id": "ch3.s14.006",
          "type": "narration",
          "text": "バドはゆっくりヒロトシの方へ体を向け、主人公たちを守る位置に立った。",
          "route": "ally"
        },
        {
          "id": "ch3.s14.007",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……冗談だろ。",
          "route": "ally"
        },
        {
          "id": "ch3.s14.008",
          "type": "narration",
          "text": "ヒロトシが呼んでも、バドは首を横に振る。斧を握る手に力がこもった。",
          "route": "ally"
        },
        {
          "id": "ch3.s14.009",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……俺を困らせないでくれよ。",
          "route": "ally"
        },
        {
          "id": "ch3.s14.010",
          "type": "narration",
          "text": "ヒロトシの斧は重い。バドはその動きを知っていて、傷つけずに止めようとする。",
          "route": "ally"
        },
        {
          "id": "ch3.s14.011",
          "type": "battle",
          "battleId": "hiro_ally",
          "route": "ally"
        },
        {
          "id": "ch3.s14.012",
          "type": "narration",
          "text": "バドが斧の振り下ろしへ体を入れ、柄を押し返した瞬間、主人公と相棒が左右から踏み込む。斧が手を離れ、石の上を滑った。",
          "route": "ally"
        },
        {
          "id": "ch3.s14.013",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……うそだろ。",
          "route": "ally"
        },
        {
          "id": "ch3.s14.014",
          "type": "narration",
          "text": "ヒロトシは膝をつく。再び立とうとする前に、バドが静かに立ちはだかった。",
          "route": "ally"
        },
        {
          "id": "ch3.s14.015",
          "type": "narration",
          "text": "バドはヒロトシを見る。しばらく目を伏せた後、主人公たちへ向き直った。",
          "route": "duel"
        },
        {
          "id": "ch3.s14.016",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……来るよ。",
          "route": "duel"
        },
        {
          "id": "ch3.s14.017",
          "type": "narration",
          "text": "主人公たちは道脇の木箱の間へ下がり、正面からバドの攻撃を受けないようにする。",
          "route": "duel"
        },
        {
          "id": "ch3.s14.018",
          "type": "battle",
          "battleId": "bado",
          "route": "duel"
        },
        {
          "id": "ch3.s14.019",
          "type": "narration",
          "text": "狭い通路を回り込んでバドをかわす。二人は反撃せず、その脇を抜けた。",
          "route": "duel"
        },
        {
          "id": "ch3.s14.020",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……もういい。俺がやる。",
          "route": "duel"
        },
        {
          "id": "ch3.s14.021",
          "type": "narration",
          "text": "ヒロトシが斧を振り上げる。主人公たちは道端の丸太と木箱を利用し、斧が自由に振れない場所へ誘導した。",
          "route": "duel"
        },
        {
          "id": "ch3.s14.022",
          "type": "battle",
          "battleId": "hiro_duel",
          "route": "duel"
        },
        {
          "id": "ch3.s14.023",
          "type": "narration",
          "text": "ヒロトシの斧が丸太へ食い込む。相棒が背後へ回り込み、振り返ろうとしたヒロトシの体勢が崩れる。その隙に主人公が柄を奪い、斧を遠くへ投げた。",
          "route": "duel"
        },
        {
          "id": "ch3.s14.024",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……くそっ！",
          "route": "duel"
        },
        {
          "id": "ch3.s14.025",
          "type": "narration",
          "text": "ヒロトシがバドを呼ぶ。だがバドは主人公たちに飛びかからず、立ったまま動かなかった。",
          "route": "duel"
        },
        {
          "id": "ch3.s14.026",
          "type": "narration",
          "text": "斧を失ったヒロトシは、傷と疲労で立ち上がれない。主人公たちも息を整えるのが精いっぱいだった。"
        }
      ]
    },
    {
      "id": "s15",
      "title": "戦いのあと",
      "background": "cottage_yard",
      "nodes": [
        {
          "id": "ch3.s15.001",
          "type": "narration",
          "text": "少し離れたところで斧が横たわっている。主人公はまずそれを拾い、ヒロトシから遠ざけた。"
        },
        {
          "id": "ch3.s15.002",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……終わった？"
        },
        {
          "id": "ch3.s15.003",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……まだ油断できない。"
        },
        {
          "id": "ch3.s15.004",
          "type": "narration",
          "text": "二人はヒロトシを山小屋に連れ戻し、丈夫な縄で拘束する。ヒロトシは戦いで消耗し、抵抗する力が残っていない。"
        },
        {
          "id": "ch3.s15.005",
          "type": "narration",
          "text": "バドはそばで見張り、ヒロトシの命令にも動かない。",
          "route": "ally"
        },
        {
          "id": "ch3.s15.006",
          "type": "narration",
          "text": "バドは少し離れて二人を見ている。主人公が近づいても、ヒロトシを逃がそうとはしなかった。",
          "route": "duel"
        },
        {
          "id": "ch3.s15.007",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……帰るの？"
        },
        {
          "id": "ch3.s15.008",
          "type": "narration",
          "text": "主人公は答えず、家の奥へ目を向ける。"
        },
        {
          "id": "ch3.s15.009",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "ほかにも誰かいるかもしれない。調べよう。"
        }
      ]
    },
    {
      "id": "s16",
      "title": "残された荷物",
      "background": "cottage_storage",
      "nodes": [
        {
          "id": "ch3.s16.001",
          "type": "narration",
          "text": "山小屋の物置には、古い鞄がいくつも積まれていた。使い込まれた地図、水筒、小さな装飾品。どれも旅の途中で持ち歩くものばかりだった。"
        },
        {
          "id": "ch3.s16.002",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……これ、全部ヒロトシの？"
        },
        {
          "id": "ch3.s16.003",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……違うと思う。"
        },
        {
          "id": "ch3.s16.004",
          "type": "narration",
          "text": "棚の奥に記録帳が見つかる。人間とゴイモンの名前が一組ずつ記され、食材の保管・調理の記録と結びついていた。"
        },
        {
          "id": "ch3.s16.005",
          "type": "narration",
          "text": "主人公はページを閉じる。もう十分だった。"
        },
        {
          "id": "ch3.s16.006",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……これを持っていこう。"
        },
        {
          "id": "ch3.s16.007",
          "type": "narration",
          "text": "裏庭に戻る。囲いの扉を開けても、ゴイモンたちはすぐには出てこない。"
        },
        {
          "id": "ch3.s16.008",
          "type": "narration",
          "text": "やがて一体が外へ出る。別の一体が続き、足の悪いゴイモンは隣のゴイモンに支えられながら歩き始めた。"
        },
        {
          "id": "ch3.s16.009",
          "type": "narration",
          "text": "バドは、彼らが森へ向かうのを静かに見ていた。"
        },
        {
          "id": "ch3.s16.010",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……みんな、行ったね。"
        },
        {
          "id": "ch3.s16.011",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "うん。"
        }
      ]
    },
    {
      "id": "s17",
      "title": "トシャカの衛兵",
      "background": "toshaka_guard",
      "nodes": [
        {
          "id": "ch3.s17.001",
          "type": "narration",
          "text": "主人公たちは拘束したヒロトシを連れて山道を下る。斧は取り上げられ、消耗したヒロトシは歩くだけで精いっぱいだった。"
        },
        {
          "id": "ch3.s17.002",
          "type": "narration",
          "text": "主人公たちは警戒を解かない。バドも少し離れて歩いた。"
        },
        {
          "id": "ch3.s17.003",
          "type": "narration",
          "text": "街の衛兵詰所で、主人公は監禁の経緯と、山小屋で見つけた荷物と記録を差し出す。"
        },
        {
          "id": "ch3.s17.004",
          "type": "line",
          "speaker": "衛兵",
          "text": "……これは詳しく調べる必要がある。"
        },
        {
          "id": "ch3.s17.005",
          "type": "narration",
          "text": "衛兵たちはヒロトシの身柄と証拠を引き受け、山小屋へ向かう調査の準備を始めた。"
        },
        {
          "id": "ch3.s17.006",
          "type": "line",
          "speaker": "衛兵",
          "text": "よく知らせてくれた。あとは我々で調べる。"
        },
        {
          "id": "ch3.s17.007",
          "type": "narration",
          "text": "主人公はようやく息をつく。"
        }
      ]
    },
    {
      "id": "s18",
      "title": "手",
      "background": "toshaka_guard",
      "nodes": [
        {
          "id": "ch3.s18.001",
          "type": "narration",
          "text": "衛兵がヒロトシを連れていこうとする。バドは少し離れた場所に立っていた。"
        },
        {
          "id": "ch3.s18.002",
          "type": "line",
          "speaker": "ヒロトシ",
          "text": "……バド。"
        },
        {
          "id": "ch3.s18.003",
          "type": "narration",
          "text": "ヒロトシは何かを言いかけ、結局黙った。バドがゆっくり近づく。"
        },
        {
          "id": "ch3.s18.004",
          "type": "narration",
          "text": "バドはヒロトシの前で立ち止まり、その手にそっと頭を寄せた。"
        },
        {
          "id": "ch3.s18.005",
          "type": "narration",
          "text": "驚いたヒロトシは、しばらく動かなかった。やがて手を伸ばし、バドの頭に触れる。"
        },
        {
          "id": "ch3.s18.006",
          "type": "narration",
          "text": "山道で出会ったときと同じ仕草だった。ただ、今度はバドの方から近づいた。"
        },
        {
          "id": "ch3.s18.007",
          "type": "line",
          "speaker": "衛兵",
          "text": "……行くぞ。"
        },
        {
          "id": "ch3.s18.008",
          "type": "narration",
          "text": "ヒロトシは手を離す。歩き始めてから一度だけ振り返る。バドはその場に立ち、何も言わずに見送った。"
        }
      ]
    },
    {
      "id": "s19",
      "title": "街の入口",
      "background": "toshaka_gate",
      "nodes": [
        {
          "id": "ch3.s19.001",
          "type": "narration",
          "text": "トシャカの入口には夕暮れの光が差していた。主人公と相棒はようやく足を止める。"
        },
        {
          "id": "ch3.s19.002",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……着いたね。"
        },
        {
          "id": "ch3.s19.003",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "うん。長かった。"
        },
        {
          "id": "ch3.s19.004",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "……バド。これから、どうする？",
          "route": "ally"
        },
        {
          "id": "ch3.s19.005",
          "type": "line",
          "speaker": "バド",
          "text": "……まだ、わからない。",
          "route": "ally"
        },
        {
          "id": "ch3.s19.006",
          "type": "narration",
          "text": "バドは衛兵詰所を振り返り、それから主人公たちへ静かにうなずく。",
          "route": "ally"
        },
        {
          "id": "ch3.s19.007",
          "type": "line",
          "speaker": "バド",
          "text": "……ありがとう。",
          "route": "ally"
        },
        {
          "id": "ch3.s19.008",
          "type": "narration",
          "text": "バドは遠くから二人を見ていた。目が合うと一度だけ立ち止まり、それから別の道へ歩いていく。",
          "route": "duel"
        },
        {
          "id": "ch3.s19.009",
          "type": "line",
          "speaker": "{{partnerName}}",
          "text": "……行こうか。"
        },
        {
          "id": "ch3.s19.010",
          "type": "line",
          "speaker": "{{playerName}}",
          "text": "うん。"
        },
        {
          "id": "ch3.s19.011",
          "type": "narration",
          "text": "トシャカの街で夕暮れの鐘が鳴っていた。"
        }
      ]
    }
  ]
};
if(typeof module==='object'&&module.exports)module.exports=data;else root.GoimonChapter3Data=data;
})(typeof window!=='undefined'?window:globalThis);
