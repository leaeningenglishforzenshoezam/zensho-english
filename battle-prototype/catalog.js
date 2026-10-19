// Isolated trial catalog. Vocabulary is verified against GOIMON word lists.
(function(root){"use strict";const data={
  "species": [
    {
      "id": "nagomi",
      "name": "なごみ",
      "attr": "echo",
      "hp": 100,
      "attack": 14,
      "defense": 26,
      "speed": 15,
      "entries": {
        "label": "なごみ系",
        "child": {
          "name": "ラミア",
          "description": "ふわふわの毛に触れると、不思議と心が落ち着く。眠っている仲間を見つけると、そっと寄り添って一緒に眠る。",
          "image": "images/goimon/nagomi_child.png"
        },
        "growth": {
          "name": "ラミナス",
          "description": "体の中で温かな光を生み出す。暗い道を歩く仲間のそばでは毛がほのかに輝き、足元を優しく照らす。",
          "image": "images/goimon/nagomi_growth.png"
        },
        "mid": {
          "name": "ラムノエル",
          "description": "光を集めて仲間を守る力を持つ。頭上の輪が回り始めると、周囲にいる生き物の傷みが少しずつ和らぐという。",
          "image": "images/goimon/nagomi_mid.png"
        },
        "final": {
          "name": "セラフィラムノア",
          "description": "巨大な光輪と五つの神聖な器官を持つ守護獣。大きな災いが迫ると姿を現し、その光で多くの命を守ると伝えられる。",
          "image": "images/goimon/nagomi_final.png"
        }
      }
    },
    {
      "id": "hirameki",
      "name": "ひらめき",
      "attr": "mirage",
      "hp": 80,
      "attack": 26,
      "defense": 14,
      "speed": 20,
      "entries": {
        "label": "ひらめき系",
        "child": {
          "name": "フェネ",
          "description": "大きな耳で遠くの物音を聞き分ける。驚くと足元の影が一瞬だけ飛び跳ねるが、本人はまだ気づいていない。",
          "image": "images/goimon/hirameki_child.png"
        },
        "growth": {
          "name": "フェネロ",
          "description": "夕暮れになると影の中に身を隠す。姿が見えなくなっても、大きな耳だけは影の外に出ていることがある。",
          "image": "images/goimon/hirameki_growth.png"
        },
        "mid": {
          "name": "フェネグラ",
          "description": "自分の影を自在に伸ばし、遠くの物を動かす。月明かりの下では、影だけが先に歩き出すこともあるという。",
          "image": "images/goimon/hirameki_mid.png"
        },
        "final": {
          "name": "フェネノクス",
          "description": "巨大な影を従える幻の獣。戦いでは本体がほとんど動かず、影だけが敵を追い詰める。影の本当の姿を見た者は少ない。",
          "image": "images/goimon/hirameki_final.png"
        }
      }
    },
    {
      "id": "tsumugi",
      "name": "つむぎ",
      "attr": "mirage",
      "hp": 120,
      "attack": 18,
      "defense": 18,
      "speed": 14,
      "entries": {
        "label": "つむぎ系",
        "child": {
          "name": "ミコラ",
          "description": "目には見えない気配を感じ取る小さなクラゲ。人が眠っている間に近くを漂い、悪い夢をそっと追い払うという。",
          "image": "images/goimon/tsumugi_child.png"
        },
        "growth": {
          "name": "クラージュ",
          "description": "触手の先から小さな呪符を生み出す。いたずら好きな霊を見つけると、札で囲んで動けなくすることがある。",
          "image": "images/goimon/tsumugi_growth.png"
        },
        "mid": {
          "name": "オンミョーゲ",
          "description": "触手を動かして結界を張り、式神を操る。夜の森で白い紙の鳥が飛んでいたら、近くにいるしるしだという。",
          "image": "images/goimon/tsumugi_mid.png"
        },
        "final": {
          "name": "セイメイラ",
          "description": "巨大な結界を広げる陰陽の霊獣。従える式神は遠く離れた場所にも現れ、結界の内側にあるものを守り続ける。",
          "image": "images/goimon/tsumugi_final.png"
        }
      }
    },
    {
      "id": "yomitoki",
      "name": "よみとき",
      "attr": "metal",
      "hp": 80,
      "attack": 18,
      "defense": 16,
      "speed": 26,
      "entries": {
        "label": "よみとき系",
        "child": {
          "name": "レムパス",
          "description": "生まれつき方角を知る不思議な力を持つ。初めて訪れた森でも道に迷わず、古い遺跡の方角をじっと見つめることがある。",
          "image": "images/goimon/yomitoki_child.png"
        },
        "growth": {
          "name": "レムオルド",
          "description": "古い石や土の下に眠る遺物を見つけるのが得意。気になるものを見つけると、何日もかけて周囲を調べ続ける。",
          "image": "images/goimon/yomitoki_growth.png"
        },
        "mid": {
          "name": "レムトラス",
          "description": "古代の記号を読み解く知恵を持つ。誰にも解読できなかった石板を見つめ、突然うれしそうに鳴き出すことがある。",
          "image": "images/goimon/yomitoki_mid.png"
        },
        "final": {
          "name": "レムインカ",
          "description": "古代神殿と一体になった巨大な獣。背中の石組みには失われた文明の記憶が眠り、満月の夜だけ古い文字が浮かび上がるという。",
          "image": "images/goimon/yomitoki_final.png"
        }
      }
    },
    {
      "id": "shirabe",
      "name": "しらべ",
      "attr": "echo",
      "hp": 88,
      "attack": 18,
      "defense": 28,
      "speed": 12,
      "entries": {
        "label": "しらべ系",
        "child": {
          "name": "プラチル",
          "description": "くちばしで水中のわずかな振動を感じ取る。見慣れないものを発見すると、確かめるまで何度も周囲を泳ぎ回る。",
          "image": "images/goimon/shirabe_child.png"
        },
        "growth": {
          "name": "プラネモ",
          "description": "海の底に隠されたものを探すのが好き。深い場所から持ち帰った不思議な石を、宝物のように大切にする。",
          "image": "images/goimon/shirabe_growth.png"
        },
        "mid": {
          "name": "プラチラス",
          "description": "身体に備わった探知器官で暗い海底を進む。光の届かない深さでも、岩の形や遠くの生き物の位置を正確に知る。",
          "image": "images/goimon/shirabe_mid.png"
        },
        "final": {
          "name": "ノーティプス",
          "description": "深海を航行する巨大潜水艦獣。その身体には誰も知らない海底の記録が蓄えられており、ときおり謎の信号を発する。",
          "image": "images/goimon/shirabe_final.png"
        }
      }
    },
    {
      "id": "hibiki",
      "name": "ひびき",
      "attr": "echo",
      "hp": 96,
      "attack": 22,
      "defense": 22,
      "speed": 20,
      "entries": {
        "label": "ひびき系",
        "child": {
          "name": "ケロル",
          "description": "鳴き声に合わせて小さな火花を散らす。雨の日は特に元気で、夢中で鳴き続けると頭の上に小さな雷雲ができる。",
          "image": "images/goimon/hibiki_child.png"
        },
        "growth": {
          "name": "ゴロッグ",
          "description": "背中の発電器官を震わせて雷のような音を出す。機嫌がよいと遠くまで鳴き声を響かせ、雨雲を集めてしまう。",
          "image": "images/goimon/hibiki_growth.png"
        },
        "mid": {
          "name": "ライゲロ",
          "description": "雷をまとった強い後脚で、岩山をひと跳びする。着地した場所には稲妻の跡が残り、しばらく地面が熱を帯びる。",
          "image": "images/goimon/hibiki_mid.png"
        },
        "final": {
          "name": "トルゲロス",
          "description": "雷雲の奥に住むといわれる轟雷神獣。ひとたび大きく鳴くと空が震え、その声は遠く離れた山々にも響き渡る。",
          "image": "images/goimon/hibiki_final.png"
        }
      }
    },
    {
      "id": "kotonoha",
      "name": "ことのは",
      "attr": "echo",
      "hp": 80,
      "attack": 30,
      "defense": 16,
      "speed": 14,
      "entries": {
        "label": "ことのは系",
        "child": {
          "name": "カメロン",
          "description": "周囲の色に合わせて姿を隠すのが得意。光るものを見るとつい手を伸ばし、見つかると慌てて色を変える。",
          "image": "images/goimon/kotonoha_child.png"
        },
        "growth": {
          "name": "トリレオン",
          "description": "長い舌としっぽを使い、離れた場所のものを器用に取る。いたずらをしても、姿を消して逃げるためなかなか捕まらない。",
          "image": "images/goimon/kotonoha_growth.png"
        },
        "mid": {
          "name": "シルクレオ",
          "description": "身体の色を瞬時に変えて幻影を生み出す。目の前に立っていたはずなのに、気づけば背後にいることも珍しくない。",
          "image": "images/goimon/kotonoha_mid.png"
        },
        "final": {
          "name": "ファントレオ",
          "description": "姿も気配も自在に消す伝説の怪盗獣。厳重に守られた宝物さえ音もなく持ち去り、代わりに小さな幻影を残していく。",
          "image": "images/goimon/kotonoha_final.png"
        }
      }
    },
    {
      "id": "mr_uno",
      "name": "MR.UNO",
      "attr": "mirage",
      "hp": 88,
      "attack": 30,
      "defense": 18,
      "speed": 18,
      "entries": {
        "label": "MR.UNO系",
        "child": {
          "name": "魔法見習いUNO",
          "description": "特別な条件でのみ現れるレアゴイモン。このアプリの開発者であるとも噂されており、一人前の魔法使いになるために日々修行をしている。",
          "image": "images/goimon/mr_uno_child.png"
        },
        "growth": {
          "name": "デスイーターUNO",
          "description": "闇の力に魅了され、闇堕ちしてしまった魔法使い。歯向かうものには禁じられた呪文を簡単に使う短気さが特徴。",
          "image": "images/goimon/mr_uno_growth.png"
        },
        "mid": {
          "name": "フィジカル覚醒UNO",
          "description": "力とは魔力ではなく筋力であると悟った魔法使い。「力こそパワー」を座右の銘にし、筋力を求める求道者になった。",
          "image": "images/goimon/mr_uno_mid.png"
        },
        "final": {
          "name": "理の境地MR.UNO",
          "description": "全ての理を悟り、山に籠った伝説の元魔法使い。英単語力を十分に身につけた者のみが出会えると言われている。",
          "image": "images/goimon/mr_uno_final.png"
        }
      }
    },
    {
      "id": "q7_special",
      "name": "七人の小人",
      "attr": "metal",
      "hp": 120,
      "attack": 18,
      "defense": 30,
      "speed": 10,
      "entries": {
        "label": "大問7 特別ルート",
        "child": {
          "name": "夢見る七人の小人",
          "description": "工具や部品をおもちゃにして遊ぶ七人の小さな仲間。得意なことはそれぞれ違うが、「いつか、みんなで大きなものを作りたい」という夢は同じ。今日も小さな発見を持ち寄っている。",
          "image": "images/goimon/q7_inventors_child.png"
        },
        "growth": {
          "name": "ひらめく七人の小人",
          "description": "初めての大きな発明に向けて、作業台を囲む七人。意見がぶつかることもあるが、仲間の話に耳を傾けるたび、ばらばらだったアイデアが一枚の設計図につながっていく。",
          "image": "images/goimon/q7_inventors_growth.png"
        },
        "mid": {
          "name": "機巧の七人の小人",
          "description": "設計、鍛造、動力、機構、観測、修理を分担し、巨大メカを組み立てる七人。何度失敗しても、誰かが次の手がかりを見つける。一人では届かない夢が、少しずつ形になり始めた。",
          "image": "images/goimon/q7_inventors_mid.png"
        },
        "final": {
          "name": "創世の七人の小人",
          "description": "完成した巨大メカに乗り込み、七人の知恵と技を合わせて未知の世界へ踏み出す。「作って終わりではない。誰かの役に立ってこそ発明だ」と、今日も新しい未来を切り開いている。",
          "image": "images/goimon/q7_inventors_final.png"
        }
      }
    },
    {
      "id": "q8_special",
      "name": "オーディン",
      "attr": "metal",
      "hp": 88,
      "attack": 28,
      "defense": 14,
      "speed": 24,
      "entries": {
        "label": "大問8 特別ルート",
        "child": {
          "name": "暁のオーディンとスレイプニル",
          "description": "幼いオーディンと、八本脚の子馬スレイプニル。まだ槍も旅の目的も持たない二人だが、隣で過ごすうちに、言葉にしなくても気持ちが通じる相棒になっていく。",
          "image": "images/goimon/q8_odin_sleipnir_child.png"
        },
        "growth": {
          "name": "旅立ちのオーディンとスレイプニル",
          "description": "小さな槍を手にした少年オーディンが、成長したスレイプニルと旅に出る。知らない土地や初めての困難に戸惑いながらも、互いを信じて進むことで、少しずつ勇気を身につけていく。",
          "image": "images/goimon/q8_odin_sleipnir_growth.png"
        },
        "mid": {
          "name": "疾駆のオーディンとスレイプニル",
          "description": "若き戦神となったオーディンを乗せ、スレイプニルが戦場を駆け抜ける。グングニルを振るう力と、八本の脚が生む速さ。その二つを結ぶのは、旅の中で育てた揺るぎない信頼だ。",
          "image": "images/goimon/q8_odin_sleipnir_mid.png"
        },
        "final": {
          "name": "覇天のオーディンとスレイプニル",
          "description": "仲間を導く総大将となったオーディンと、天空を駆ける巨大な神馬。かつて二人だけで始めた旅は、多くの者を守る使命へと変わった。掲げたグングニルは、進むべき道を指し示す。",
          "image": "images/goimon/q8_odin_sleipnir_final.png"
        }
      }
    },
    {
      "id": "q10_special",
      "name": "クラーケン",
      "attr": "mirage",
      "hp": 120,
      "attack": 30,
      "defense": 16,
      "speed": 12,
      "entries": {
        "label": "大問10 特別ルート",
        "child": {
          "name": "わんぱく船長クラーケン",
          "description": "大きすぎる三角帽子と赤いスカーフが自慢の赤ちゃんクラーケン。流木を船に見立てて、今日も船長ごっこに夢中。水平線の向こうには、まだ知らない宝物があると信じている。",
          "image": "images/goimon/q10_kraken_child.png"
        },
        "growth": {
          "name": "霧航の船長クラーケン",
          "description": "小さなサーベルを手に、本当の航海へ乗り出した若い船長。霧の海で出会った青白いゴーストシップを相棒に迎え、怖さよりも好奇心を頼りに、未知の海路を進んでいく。",
          "image": "images/goimon/q10_kraken_growth.png"
        },
        "mid": {
          "name": "幽霊船長クラーケン",
          "description": "サーベル、舵輪、大砲を巧みに操り、成長したゴーストシップを率いる海賊船長。幾度もの嵐を越え、宝を見つける喜びだけでなく、船と仲間を無事に帰す責任も知るようになった。",
          "image": "images/goimon/q10_kraken_mid.png"
        },
        "final": {
          "name": "深淵の大船長クラーケン",
          "description": "巨大なゴーストシップとともに、光の届かない深海まで航路を広げた大海賊船長。八本の腕と二本の長い触腕で船を操り、迷える者を導く。幼い日に夢見た水平線は、今も冒険の始まりだ。",
          "image": "images/goimon/q10_kraken_final.png"
        }
      }
    }
  ],
  "skills": [
    {
      "id": "N_echo",
      "name": "Burst／バースト",
      "vocab": {
        "en": "burst",
        "ja": "破裂する",
        "level": 1
      },
      "attr": "echo",
      "rarity": "N",
      "type": "attack",
      "uses": 3,
      "power": 1.3,
      "description": "威力1.3の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "胸いっぱいに空気をため、一気に音を破裂させる。毎回、本人のほっぺがいちばん驚いている。",
        "en": "Fill your cheeks with air, then burst out with a loud blast. Your cheeks look the most surprised."
      },
      "descriptionEn": "Attack with power 1.3. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "word_meaning"
    },
    {
      "id": "N_scream",
      "name": "Scream／スクリーム",
      "vocab": {
        "en": "scream",
        "ja": "叫ぶ",
        "level": 1
      },
      "attr": "echo",
      "rarity": "N",
      "type": "attack",
      "uses": 3,
      "power": 1.2,
      "description": "威力1.2の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "おばけを見たつもりで大声を出し、相手を攻める。声がよく出るように、本人は毎朝うがいしている。",
        "en": "Scream as if you had seen a ghost and attack with the sound. You gargle every morning to keep your voice ready."
      },
      "descriptionEn": "Attack with power 1.2. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "q1"
    },
    {
      "id": "N_encourage",
      "name": "Encourage／エンカレッジ",
      "vocab": {
        "en": "encourage",
        "ja": "励ます",
        "level": 1
      },
      "attr": "echo",
      "rarity": "N",
      "type": "heal",
      "uses": 3,
      "healFraction": 0.5,
      "description": "最大HPの50％回復。不正解は半分。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "「まだいける！」と自分を励まし、元気を取り戻す。応援団は自分ひとりだが、声の大きさは三人分。",
        "en": "Encourage yourself with a loud cheer and recover your energy. Your one-member cheer squad sounds like three."
      },
      "descriptionEn": "Restore 50% of maximum HP; a wrong answer restores half as much. One use is consumed whether your answer is correct or wrong.",
      "tactic": "heal",
      "questionFormat": "word_meaning"
    },
    {
      "id": "N_concentrate",
      "name": "Concentrate／コンセントレイト",
      "vocab": {
        "en": "concentrate",
        "ja": "集中する",
        "level": 1
      },
      "attr": "echo",
      "rarity": "N",
      "type": "prepare",
      "uses": 3,
      "nextPower": 1.4,
      "power": 1,
      "description": "威力1の攻撃。正解で次の攻撃を1.4倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手の動きに集中し、次の一撃を狙う。集中しすぎて、鼻にとまったちょうちょに気づかない。",
        "en": "Concentrate on the enemy and plan your next hit. You do not notice the butterfly sitting on your nose."
      },
      "descriptionEn": "Attack with power 1. A correct answer makes your next attack 1.4 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong.",
      "tactic": "chain",
      "questionFormat": "idiom"
    },
    {
      "id": "N_relieve",
      "name": "Relieve／リリーブ",
      "vocab": {
        "en": "relieve",
        "ja": "和らげる",
        "level": 1
      },
      "attr": "echo",
      "rarity": "N",
      "type": "weaken",
      "uses": 3,
      "weakFactor": 0.65,
      "power": 1,
      "description": "威力1の攻撃。正解で次の敵の攻撃を65％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻撃のあと、落ち着いた声で相手の緊張をやわらげる。「戦闘中に眠くなる声」と評判。",
        "en": "Attack, then relieve the enemy's tension with a calm voice. It is famous for making a battle sound like bedtime."
      },
      "descriptionEn": "Attack with power 1. A correct answer reduces the enemy's next attack damage to 65%. One use is consumed whether your answer is correct or wrong.",
      "tactic": "disrupt",
      "questionFormat": "idiom"
    },
    {
      "id": "N_remind",
      "name": "Remind／リマインド",
      "vocab": {
        "en": "remind",
        "ja": "思い出させる",
        "level": 2
      },
      "attr": "echo",
      "rarity": "N",
      "type": "replenish",
      "uses": 1,
      "description": "威力1の攻撃＋正解で、使用回数が最も減っている別の技を最大1回復。同数なら枠順。上限を超えず、回数回復技には使えない。 使用回数は正誤にかかわらず消費。",
      "power": 1,
      "restoreUses": 1,
      "flavor": {
        "ja": "軽く攻めながら、使った技のコツを思い出す。コツを書いたメモは、おやつの包み紙の裏にある。",
        "en": "Attack lightly and remind yourself how to use another skill. Your notes are on the back of a snack wrapper."
      },
      "descriptionEn": "Attack with power 1. A correct answer restores up to 1 use(s) to another skill with the most uses missing. Ties follow slot order. Never exceed its limit or restore a use-restoring skill. One use is consumed whether your answer is correct or wrong.",
      "tactic": "long",
      "questionFormat": "word_meaning"
    },
    {
      "id": "N_aid",
      "name": "Aid／エイド",
      "vocab": {
        "en": "aid",
        "ja": "援助",
        "level": 1
      },
      "attr": "echo",
      "rarity": "N",
      "type": "heal",
      "uses": 4,
      "healFraction": 0.5,
      "description": "最大HPの50％回復。不正解は半分。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "救急箱で自分の傷を手当てする。ばんそうこうには自分の顔が描いてあり、貼るほど顔が増える。",
        "en": "Give yourself first aid from a little box. Every bandage has your face on it, so each one adds another face."
      },
      "descriptionEn": "Restore 50% of maximum HP; a wrong answer restores half as much. One use is consumed whether your answer is correct or wrong.",
      "tactic": "heal",
      "questionFormat": "word_meaning"
    },
    {
      "id": "N_praise",
      "name": "Praise／プレイズ",
      "vocab": {
        "en": "praise",
        "ja": "ほめる",
        "level": 1
      },
      "attr": "echo",
      "rarity": "N",
      "type": "prepare",
      "uses": 4,
      "nextPower": 1.35,
      "power": 0.95,
      "description": "威力0.95の攻撃。正解で次の攻撃を1.35倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "軽く攻めてから自分をほめ、次の一撃へ気合を入れる。拍手まで自分でやるので少し忙しい。",
        "en": "Attack lightly, then praise yourself to prepare the next hit. Doing your own applause keeps you busy."
      },
      "descriptionEn": "Attack with power 0.95. A correct answer makes your next attack 1.35 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong.",
      "tactic": "chain",
      "questionFormat": "idiom"
    },
    {
      "id": "N_pronounce",
      "name": "Pronounce／プロナウンス",
      "vocab": {
        "en": "pronounce",
        "ja": "発音する",
        "level": 1
      },
      "attr": "echo",
      "rarity": "N",
      "type": "attack",
      "uses": 3,
      "power": 1.2,
      "description": "威力1.2の攻撃。 正解で次の攻撃を1.12倍に強化。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "大きな声ではっきり発音し、音で相手を攻める。戦いながら口の形のお手本まで見せてくれる。",
        "en": "Pronounce words clearly and attack with your voice. Even in battle, you show everyone how to move their lips."
      },
      "descriptionEn": "Attack with power 1.2. A correct answer boosts the next attack to 1.12 times its usual damage. One use is consumed whether your answer is correct or wrong.",
      "tactic": "chain",
      "questionFormat": "q1",
      "onCorrect": {
        "nextPower": 1.12
      }
    },
    {
      "id": "N_rhythm",
      "name": "Rhythm／リズム",
      "vocab": {
        "en": "rhythm",
        "ja": "リズム",
        "level": 2
      },
      "attr": "echo",
      "rarity": "N",
      "type": "prepare",
      "uses": 3,
      "nextPower": 1.35,
      "power": 1,
      "description": "威力1の攻撃。正解で次の攻撃を1.35倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "リズムに合わせて攻め、次の一撃へ勢いをつける。足だけ先に踊り始めている。",
        "en": "Attack to a rhythm and build momentum for the next hit. Your feet start dancing before the rest of you."
      },
      "descriptionEn": "Attack with power 1. A correct answer makes your next attack 1.35 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong.",
      "tactic": "long",
      "questionFormat": "q1"
    },
    {
      "id": "N_comfort",
      "name": "Comfort／コンフォート",
      "vocab": {
        "en": "comfort",
        "ja": "快適さ、慰める",
        "level": 2
      },
      "attr": "echo",
      "rarity": "N",
      "type": "heal",
      "uses": 4,
      "healFraction": 0.5,
      "description": "最大HPの50％回復。不正解は半分。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "ふわふわの毛布で自分を包み、元気を取り戻す。森に毛布を持ってきた理由が、ようやく伝わる。",
        "en": "Comfort yourself with a fluffy blanket and recover your energy. Now everyone understands why you packed a blanket."
      },
      "descriptionEn": "Restore 50% of maximum HP; a wrong answer restores half as much. One use is consumed whether your answer is correct or wrong.",
      "tactic": "long",
      "questionFormat": "word_meaning"
    },
    {
      "id": "N_whisper",
      "name": "Whisper／ウィスパー",
      "vocab": {
        "en": "whisper",
        "ja": "ささやく",
        "level": 2
      },
      "attr": "echo",
      "rarity": "N",
      "type": "attack",
      "uses": 3,
      "power": 1.2,
      "description": "威力1.2の攻撃。 正解で敵の次の攻撃ダメージを90％に弱める。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手のすぐ近くで低い声をささやき、音で攻める。「後ろに先生がいるよ」と言うのが得意。",
        "en": "Whisper close to the enemy and attack with the sound. Your favorite line is: The teacher is behind you."
      },
      "descriptionEn": "Attack with power 1.2. A correct answer reduces the next enemy attack to 90% damage. One use is consumed whether your answer is correct or wrong.",
      "tactic": "disrupt",
      "questionFormat": "word_meaning",
      "onCorrect": {
        "weakFactor": 0.9
      }
    },
    {
      "id": "N_mirage",
      "name": "Cast／キャスト",
      "vocab": {
        "en": "cast",
        "ja": "投げる",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "attack",
      "uses": 3,
      "power": 1.3,
      "description": "威力1.3の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "小さな影を相手へ投げかけて攻める。影は出番のたびに、かっこいいポーズを変えてくる。",
        "en": "Cast a small shadow at the enemy to attack. The shadow brings a different heroic pose to every battle."
      },
      "descriptionEn": "Attack with power 1.3. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "q3"
    },
    {
      "id": "N_chase",
      "name": "Chase／チェイス",
      "vocab": {
        "en": "chase",
        "ja": "追いかける",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "attack",
      "uses": 3,
      "power": 1.2,
      "description": "威力1.2の攻撃。 正解で次の攻撃を1.15倍に強化。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手を追いかけ、勢いをつけてぶつかる。本人は勇者のつもりだが、走り方は遅刻した生徒。",
        "en": "Chase the enemy and rush into it. You feel like a hero, but run like a student late for school."
      },
      "descriptionEn": "Attack with power 1.2. A correct answer boosts the next attack to 1.15 times its usual damage. One use is consumed whether your answer is correct or wrong.",
      "tactic": "chain",
      "questionFormat": "q3",
      "onCorrect": {
        "nextPower": 1.15
      }
    },
    {
      "id": "N_flash",
      "name": "Flash／フラッシュ",
      "vocab": {
        "en": "flash",
        "ja": "閃光",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "attack",
      "uses": 2,
      "power": 1.4,
      "description": "威力1.4の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "まぶしい光を放って相手を攻める。本人だけは、記念写真のつもりで笑顔を作っている。",
        "en": "Flash a bright light at the enemy. You smile as if someone were taking your picture."
      },
      "descriptionEn": "Attack with power 1.4. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "q1"
    },
    {
      "id": "N_prepare",
      "name": "Prepare／プリペア",
      "vocab": {
        "en": "prepare",
        "ja": "準備する",
        "level": 2
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "prepare",
      "uses": 3,
      "nextPower": 1.4,
      "power": 1,
      "description": "威力1の攻撃。正解で次の攻撃を1.4倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻めながら次の一撃の準備をする。戦いの準備は完璧で、おやつもすぐ取り出せる。",
        "en": "Prepare your next hit while attacking. Your battle plan is ready, and so are your snacks."
      },
      "descriptionEn": "Attack with power 1. A correct answer makes your next attack 1.4 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong.",
      "tactic": "chain",
      "questionFormat": "idiom"
    },
    {
      "id": "N_confuse",
      "name": "Confuse／コンフューズ",
      "vocab": {
        "en": "confuse",
        "ja": "混乱させる",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "weaken",
      "uses": 3,
      "weakFactor": 0.65,
      "power": 1,
      "description": "威力1の攻撃。正解で次の敵の攻撃を65％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻めながら右を指して左へ動き、相手を混乱させる。たまに自分まで進む方向を間違える。",
        "en": "Confuse the enemy by pointing right and moving left as you attack. Sometimes you forget which way to go too."
      },
      "descriptionEn": "Attack with power 1. A correct answer reduces the enemy's next attack damage to 65%. One use is consumed whether your answer is correct or wrong.",
      "tactic": "disrupt",
      "questionFormat": "idiom"
    },
    {
      "id": "N_harmony",
      "name": "Harmony／ハーモニー",
      "vocab": {
        "en": "harmony",
        "ja": "調和",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "ward",
      "uses": 3,
      "shieldHits": 1,
      "shieldFactor": 0.65,
      "wrongShieldFactor": 0.85,
      "power": 1,
      "description": "威力1の攻撃＋次の敵攻撃1回を正解で65％、不正解で85％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "影たちと息を合わせて攻め、守りも整える。一体だけ、合唱の練習だと思って歌っている。",
        "en": "Attack in harmony with your shadows and build your guard. One shadow thinks this is choir practice."
      },
      "descriptionEn": "Attack with power 1. Reduce damage from the next 1 enemy attack(s) to 65% with a correct answer, or 85% with a wrong answer. One use is consumed whether your answer is correct or wrong.",
      "tactic": "long",
      "questionFormat": "q3"
    },
    {
      "id": "N_angle",
      "name": "Angle／アングル",
      "vocab": {
        "en": "angle",
        "ja": "角度",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "attack",
      "uses": 3,
      "power": 1.3,
      "description": "威力1.3の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手をよく見て、狙った角度から攻める。本人は角度にこだわりすぎて、三角定規を持参している。",
        "en": "Choose an angle and attack from it. You care so much about angles that you brought a triangle ruler."
      },
      "descriptionEn": "Attack with power 1.3. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "q1"
    },
    {
      "id": "N_glance",
      "name": "Glance／グランス",
      "vocab": {
        "en": "glance",
        "ja": "ちらりと見る",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "prepare",
      "uses": 4,
      "nextPower": 1.35,
      "power": 0.95,
      "description": "威力0.95の攻撃。正解で次の攻撃を1.35倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "ちらっと相手を見ながら軽く攻め、次の一撃を考える。何度も見るので「ちらっと」のつもりが丸わかり。",
        "en": "Glance at the enemy as you attack and plan the next hit. You glance so often that everyone notices."
      },
      "descriptionEn": "Attack with power 0.95. A correct answer makes your next attack 1.35 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong.",
      "tactic": "chain",
      "questionFormat": "q3"
    },
    {
      "id": "N_shade",
      "name": "Shade／シェイド",
      "vocab": {
        "en": "shade",
        "ja": "日陰",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "ward",
      "uses": 4,
      "shieldHits": 1,
      "shieldFactor": 0.75,
      "wrongShieldFactor": 0.9,
      "power": 0.95,
      "description": "威力0.95の攻撃＋次の敵攻撃1回を正解で75％、不正解で90％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "木陰から攻め、影を使って身を守る。木には「ちょっと借ります」と毎回あいさつする。",
        "en": "Attack from the shade and use shadows to guard yourself. Always thank the tree for lending you a spot."
      },
      "descriptionEn": "Attack with power 0.95. Reduce damage from the next 1 enemy attack(s) to 75% with a correct answer, or 90% with a wrong answer. One use is consumed whether your answer is correct or wrong.",
      "tactic": "guard",
      "questionFormat": "q1"
    },
    {
      "id": "N_mysterious",
      "name": "Mysterious／ミステリアス",
      "vocab": {
        "en": "mysterious",
        "ja": "不思議な",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "attack",
      "uses": 3,
      "power": 1.3,
      "description": "威力1.3の攻撃。 正解で敵の次の攻撃ダメージを85％に弱める。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "不思議な動きで相手を攻める。技の仕組みを聞かれても、本人は「なんかできた」としか答えない。",
        "en": "Attack with a mysterious move. When asked how it works, you can only say: It just happened."
      },
      "descriptionEn": "Attack with power 1.3. A correct answer reduces the next enemy attack to 85% damage. One use is consumed whether your answer is correct or wrong.",
      "tactic": "disrupt",
      "questionFormat": "q3",
      "onCorrect": {
        "weakFactor": 0.85
      }
    },
    {
      "id": "N_image",
      "name": "Image／イメージ",
      "vocab": {
        "en": "image",
        "ja": "イメージ",
        "level": 2
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "prepare",
      "uses": 3,
      "nextPower": 1.35,
      "power": 1,
      "description": "威力1の攻撃。正解で次の攻撃を1.35倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "理想の一撃を思い描きながら攻め、次に備える。頭の中の自分は、風がなくてもマントがなびく。",
        "en": "Attack while building an image of your next hit. In your mind, your cape flies even without wind."
      },
      "descriptionEn": "Attack with power 1. A correct answer makes your next attack 1.35 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong.",
      "tactic": "chain",
      "questionFormat": "q3"
    },
    {
      "id": "N_observe",
      "name": "Observe／オブザーブ",
      "vocab": {
        "en": "observe",
        "ja": "観察する",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "N",
      "type": "prepare",
      "uses": 2,
      "nextPower": 1.55,
      "power": 0.9,
      "description": "威力0.9の攻撃。正解で次の攻撃を1.55倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "軽く攻めつつ相手の動きを観察し、次の一撃の狙いを定める。観察メモにはまつ毛の本数まで書いてある。",
        "en": "Observe the enemy while attacking lightly and aim your next hit. Your notes even include an eyelash count."
      },
      "descriptionEn": "Attack with power 0.9. A correct answer makes your next attack 1.55 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong.",
      "tactic": "long",
      "questionFormat": "q3"
    },
    {
      "id": "N_metal",
      "name": "Crash／クラッシュ",
      "vocab": {
        "en": "crash",
        "ja": "衝突する",
        "level": 1
      },
      "attr": "metal",
      "rarity": "N",
      "type": "attack",
      "uses": 3,
      "power": 1.3,
      "description": "威力1.3の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "勢いよく体当たりし、金属のような音を響かせる。近くの人には、台所で鍋を落としたと思われる。",
        "en": "Crash into the enemy with a loud metallic sound. People nearby think someone dropped a cooking pot."
      },
      "descriptionEn": "Attack with power 1.3. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "idiom"
    },
    {
      "id": "N_press",
      "name": "Press／プレス",
      "vocab": {
        "en": "press",
        "ja": "押す、報道",
        "level": 2
      },
      "attr": "metal",
      "rarity": "N",
      "type": "attack",
      "uses": 3,
      "power": 1.2,
      "description": "威力1.2の攻撃。 正解で次の攻撃を1.10倍に強化。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "ぐいっと押し込むように攻める。エレベーターのボタンを押すときだけは、力を抜く練習中。",
        "en": "Press forward with a firm attack. You are still learning to press elevator buttons gently."
      },
      "descriptionEn": "Attack with power 1.2. A correct answer boosts the next attack to 1.10 times its usual damage. One use is consumed whether your answer is correct or wrong.",
      "tactic": "chain",
      "questionFormat": "word_meaning",
      "onCorrect": {
        "nextPower": 1.1
      }
    },
    {
      "id": "N_slice",
      "name": "Slice／スライス",
      "vocab": {
        "en": "slice",
        "ja": "薄切り",
        "level": 2
      },
      "attr": "metal",
      "rarity": "N",
      "type": "attack",
      "uses": 2,
      "power": 1.4,
      "description": "威力1.4の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "すぱっと切り込むような一撃を放つ。大きなケーキを切り分ける場面を想像して練習した。",
        "en": "Slice forward with a sharp hit. You practiced by imagining a very large cake to cut."
      },
      "descriptionEn": "Attack with power 1.4. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "q1"
    },
    {
      "id": "N_defend",
      "name": "Defend／ディフェンド",
      "vocab": {
        "en": "defend",
        "ja": "守る",
        "level": 1
      },
      "attr": "metal",
      "rarity": "N",
      "type": "ward",
      "uses": 3,
      "shieldHits": 1,
      "shieldFactor": 0.65,
      "wrongShieldFactor": 0.85,
      "power": 1,
      "description": "威力1の攻撃＋次の敵攻撃1回を正解で65％、不正解で85％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "盾を前に出して攻め、身を守る。鍋のふたを見て思いついたので、構えが少し料理人っぽい。",
        "en": "Defend yourself with a shield as you attack. A pot lid gave you the idea, so you look a little like a cook."
      },
      "descriptionEn": "Attack with power 1. Reduce damage from the next 1 enemy attack(s) to 65% with a correct answer, or 85% with a wrong answer. One use is consumed whether your answer is correct or wrong.",
      "tactic": "guard",
      "questionFormat": "q3"
    },
    {
      "id": "N_reduce",
      "name": "Reduce／リデュース",
      "vocab": {
        "en": "reduce",
        "ja": "減らす",
        "level": 1
      },
      "attr": "metal",
      "rarity": "N",
      "type": "weaken",
      "uses": 3,
      "weakFactor": 0.65,
      "power": 1,
      "description": "威力1の攻撃。正解で次の敵の攻撃を65％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻撃を当てて相手の勢いを減らす。「元気の音量を下げる」つもりで、空中のつまみを回す。",
        "en": "Attack and reduce the enemy's force. Turn an imaginary knob as if lowering the volume of its energy."
      },
      "descriptionEn": "Attack with power 1. A correct answer reduces the enemy's next attack damage to 65%. One use is consumed whether your answer is correct or wrong.",
      "tactic": "disrupt",
      "questionFormat": "q3"
    },
    {
      "id": "N_repair",
      "name": "Repair／リペア",
      "vocab": {
        "en": "repair",
        "ja": "修理する",
        "level": 2
      },
      "attr": "metal",
      "rarity": "N",
      "type": "heal",
      "uses": 3,
      "healFraction": 0.5,
      "description": "最大HPの50％回復。不正解は半分。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "工具箱を開き、自分の傷を手当てする。使うのは工具ではなく、中に詰めたばんそうこう。",
        "en": "Open your toolbox to repair the damage. It holds bandages instead of tools."
      },
      "descriptionEn": "Restore 50% of maximum HP; a wrong answer restores half as much. One use is consumed whether your answer is correct or wrong.",
      "tactic": "long",
      "questionFormat": "word_meaning"
    },
    {
      "id": "N_bind",
      "name": "Bind／バインド",
      "vocab": {
        "en": "bind",
        "ja": "縛る",
        "level": 1
      },
      "attr": "metal",
      "rarity": "N",
      "type": "weaken",
      "uses": 3,
      "weakFactor": 0.7,
      "power": 1,
      "description": "威力1の攻撃。正解で次の敵の攻撃を70％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻撃とともに影のひもを飛ばし、相手の勢いを抑える。結び目をかわいいリボンにするのがこだわり。",
        "en": "Bind the enemy's force with shadowy cords as you attack. You insist on tying them into pretty bows."
      },
      "descriptionEn": "Attack with power 1. A correct answer reduces the enemy's next attack damage to 70%. One use is consumed whether your answer is correct or wrong.",
      "tactic": "disrupt",
      "questionFormat": "idiom"
    },
    {
      "id": "N_decrease",
      "name": "Decrease／ディクリース",
      "vocab": {
        "en": "decrease",
        "ja": "減少する",
        "level": 1
      },
      "attr": "metal",
      "rarity": "N",
      "type": "weaken",
      "uses": 4,
      "weakFactor": 0.7,
      "power": 0.95,
      "description": "威力0.95の攻撃。正解で次の敵の攻撃を70％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "軽い一撃で相手の勢いを小さくする。攻撃後に「もう少しおとなしくお願いします」とお辞儀する。",
        "en": "Attack lightly to decrease the enemy's force. Finish with a bow and a polite request to calm down."
      },
      "descriptionEn": "Attack with power 0.95. A correct answer reduces the enemy's next attack damage to 70%. One use is consumed whether your answer is correct or wrong.",
      "tactic": "long",
      "questionFormat": "idiom"
    },
    {
      "id": "N_prevent",
      "name": "Prevent／プリベント",
      "vocab": {
        "en": "prevent",
        "ja": "防ぐ",
        "level": 2
      },
      "attr": "metal",
      "rarity": "N",
      "type": "ward",
      "uses": 4,
      "shieldHits": 1,
      "shieldFactor": 0.75,
      "wrongShieldFactor": 0.9,
      "power": 0.95,
      "description": "威力0.95の攻撃＋次の敵攻撃1回を正解で75％、不正解で90％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻める前に盾を構え、次の攻撃に備える。盾の注意書きは「ぶつかる前によく読んで」。",
        "en": "Prevent some damage by raising your shield as you attack. Its warning says: Read before bumping into things."
      },
      "descriptionEn": "Attack with power 0.95. Reduce damage from the next 1 enemy attack(s) to 75% with a correct answer, or 90% with a wrong answer. One use is consumed whether your answer is correct or wrong.",
      "tactic": "guard",
      "questionFormat": "idiom"
    },
    {
      "id": "N_brake",
      "name": "Brake／ブレイク",
      "vocab": {
        "en": "brake",
        "ja": "ブレーキ",
        "level": 1
      },
      "attr": "metal",
      "rarity": "N",
      "type": "weaken",
      "uses": 3,
      "weakFactor": 0.7,
      "power": 1,
      "description": "威力1の攻撃。正解で次の敵の攻撃を70％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻撃で相手の勢いにブレーキをかける。自転車の教習で覚えた「止まるときは落ち着いて」が合言葉。",
        "en": "Attack to brake the enemy's momentum. Your bicycle lesson taught you to stay calm when stopping."
      },
      "descriptionEn": "Attack with power 1. A correct answer reduces the enemy's next attack damage to 70%. One use is consumed whether your answer is correct or wrong.",
      "tactic": "disrupt",
      "questionFormat": "q3"
    },
    {
      "id": "N_lock",
      "name": "Lock／ロック",
      "vocab": {
        "en": "lock",
        "ja": "錠、鍵をかける",
        "level": 2
      },
      "attr": "metal",
      "rarity": "N",
      "type": "ward",
      "uses": 2,
      "shieldHits": 1,
      "shieldFactor": 0.7,
      "wrongShieldFactor": 0.9,
      "power": 1,
      "description": "威力1の攻撃＋次の敵攻撃1回を正解で70％、不正解で90％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻めながら盾の留め具をしっかり閉め、守りを固める。心配性なので、閉めたあと三回確かめる。",
        "en": "Lock the shield's straps into place as you attack. Check them three times because you worry a little."
      },
      "descriptionEn": "Attack with power 1. Reduce damage from the next 1 enemy attack(s) to 70% with a correct answer, or 90% with a wrong answer. One use is consumed whether your answer is correct or wrong.",
      "tactic": "guard",
      "questionFormat": "q1"
    },
    {
      "id": "N_stretch",
      "name": "Stretch／ストレッチ",
      "vocab": {
        "en": "stretch",
        "ja": "伸ばす",
        "level": 1
      },
      "attr": "metal",
      "rarity": "N",
      "type": "prepare",
      "uses": 3,
      "nextPower": 1.35,
      "power": 1,
      "description": "威力1の攻撃。正解で次の攻撃を1.35倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "伸びをしながら攻め、次の一撃に備える。毎回「背が伸びたかも」と思うが、身長はそのまま。",
        "en": "Stretch as you attack and prepare your next hit. Feel taller every time. Stay exactly the same height."
      },
      "descriptionEn": "Attack with power 1. A correct answer makes your next attack 1.35 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong.",
      "tactic": "long",
      "questionFormat": "idiom"
    },
    {
      "id": "R_echo",
      "name": "Shock／ショック",
      "vocab": {
        "en": "shock",
        "ja": "衝撃",
        "level": 2
      },
      "attr": "echo",
      "rarity": "R",
      "type": "attack",
      "uses": 3,
      "power": 1.55,
      "description": "威力1.55の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "突然の大きな音で相手を攻める。本人も驚くので、使う前に耳をふさぎたくなる。",
        "en": "Shock the enemy with a sudden loud sound. You want to cover your own ears before using it."
      },
      "descriptionEn": "Attack with power 1.55. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "q9"
    },
    {
      "id": "heal",
      "name": "Cure／キュア",
      "vocab": {
        "en": "cure",
        "ja": "治す",
        "level": 1
      },
      "attr": "echo",
      "rarity": "R",
      "type": "heal",
      "uses": 3,
      "healFraction": 0.5,
      "description": "最大HPの50％回復。不正解は半分。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "丁寧な手当てで元気を取り戻す。苦い薬を飲んだあと、誰も見ていなくても「平気です」の顔をする。",
        "en": "Recover with careful treatment and a cure. After the bitter medicine, make a brave face even if nobody is watching."
      },
      "descriptionEn": "Restore 50% of maximum HP; a wrong answer restores half as much. One use is consumed whether your answer is correct or wrong.",
      "tactic": "heal",
      "questionFormat": "q11"
    },
    {
      "id": "R_praise",
      "name": "Command／コマンド",
      "vocab": {
        "en": "command",
        "ja": "命令する",
        "level": 1
      },
      "attr": "echo",
      "rarity": "R",
      "type": "prepare",
      "uses": 3,
      "nextPower": 1.65,
      "power": 1.1,
      "description": "威力1.1の攻撃。正解で次の攻撃を1.65倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻めながら自分へ号令をかけ、次の一撃へ気合を入れる。隊長も隊員も自分なので、返事だけやたら大きい。",
        "en": "Command yourself as you attack and prepare the next hit. You are both captain and soldier, so the reply is very loud."
      },
      "descriptionEn": "Attack with power 1.1. A correct answer makes your next attack 1.65 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong.",
      "tactic": "chain",
      "questionFormat": "q9"
    },
    {
      "id": "R_mirage",
      "name": "Surround／サラウンド",
      "vocab": {
        "en": "surround",
        "ja": "囲む",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "R",
      "type": "attack",
      "uses": 3,
      "power": 1.55,
      "description": "威力1.55の攻撃。 正解で敵の次の攻撃ダメージを80％に弱める。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "たくさんの影で相手を囲んで攻める。一体だけ集合写真のつもりで、こっちに笑顔を向けている。",
        "en": "Surround the enemy with attacking shadows. One thinks this is a group photo and smiles at you."
      },
      "descriptionEn": "Attack with power 1.55. A correct answer reduces the next enemy attack to 80% damage. One use is consumed whether your answer is correct or wrong.",
      "tactic": "disrupt",
      "questionFormat": "q9",
      "onCorrect": {
        "weakFactor": 0.8
      }
    },
    {
      "id": "R_disturb",
      "name": "Disturb／ディスターブ",
      "vocab": {
        "en": "disturb",
        "ja": "妨げる",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "R",
      "type": "weaken",
      "uses": 3,
      "weakFactor": 0.5,
      "power": 1.15,
      "description": "威力1.15の攻撃。正解で次の敵の攻撃を50％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻めながら変な音を出し、相手の集中を乱す。お腹の音か技の音か、聞き分けるのは難しい。",
        "en": "Disturb the enemy's focus with a strange sound as you attack. It is hard to tell the skill from a stomach rumble."
      },
      "descriptionEn": "Attack with power 1.15. A correct answer reduces the enemy's next attack damage to 50%. One use is consumed whether your answer is correct or wrong.",
      "tactic": "disrupt",
      "questionFormat": "q9"
    },
    {
      "id": "R_pretend",
      "name": "Pretend／プリテンド",
      "vocab": {
        "en": "pretend",
        "ja": "ふりをする",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "R",
      "type": "prepare",
      "uses": 3,
      "nextPower": 1.65,
      "power": 1.1,
      "description": "威力1.1の攻撃。正解で次の攻撃を1.65倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "大物のふりをして攻め、次の一撃へ自信をつける。演技がうまくて、自分までその気になっている。",
        "en": "Pretend to be mighty as you attack and build confidence for the next hit. Your acting convinces even you."
      },
      "descriptionEn": "Attack with power 1.1. A correct answer makes your next attack 1.65 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong.",
      "tactic": "chain",
      "questionFormat": "q11"
    },
    {
      "id": "R_metal",
      "name": "Seize／シーズ",
      "vocab": {
        "en": "seize",
        "ja": "つかむ、押収する",
        "level": 1
      },
      "attr": "metal",
      "rarity": "R",
      "type": "attack",
      "uses": 3,
      "power": 1.55,
      "description": "威力1.55の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手の隙をつかみ、強い一撃を放つ。おやつの最後の一個をつかむときも、同じ集中力を使う。",
        "en": "Seize an opening and strike hard. You use the same focus to grab the last snack."
      },
      "descriptionEn": "Attack with power 1.55. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "idiom"
    },
    {
      "id": "ward",
      "name": "Protect／プロテクト",
      "vocab": {
        "en": "protect",
        "ja": "守る",
        "level": 2
      },
      "attr": "metal",
      "rarity": "R",
      "type": "ward",
      "uses": 3,
      "shieldHits": 2,
      "shieldFactor": 0.6,
      "wrongShieldFactor": 0.8,
      "power": 1.15,
      "description": "威力1.15の攻撃＋次の敵攻撃2回を正解で60％、不正解で80％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "盾で身を守りながら、力強く攻める。盾には「取扱注意」とあるが、持ち主はなかなか豪快。",
        "en": "Protect yourself with a shield while attacking strongly. The shield says Handle with care. You do not look very careful."
      },
      "descriptionEn": "Attack with power 1.15. Reduce damage from the next 2 enemy attack(s) to 60% with a correct answer, or 80% with a wrong answer. One use is consumed whether your answer is correct or wrong.",
      "tactic": "guard",
      "questionFormat": "q11"
    },
    {
      "id": "R_extend",
      "name": "Extend／エクステンド",
      "vocab": {
        "en": "extend",
        "ja": "延ばす",
        "level": 1
      },
      "attr": "metal",
      "rarity": "R",
      "type": "replenish",
      "uses": 2,
      "description": "威力1.15の攻撃＋正解で、使用回数が最も減っている別の技を最大2回復。同数なら枠順。上限を超えず、回数回復技には使えない。 使用回数は正誤にかかわらず消費。",
      "power": 1.15,
      "restoreUses": 2,
      "flavor": {
        "ja": "攻めながら別の技のコツを確かめ、もう少し使えるようにする。葉っぱのメモには「延長お願いします」と書いてある。",
        "en": "Attack and review another skill to extend its use. Your leaf-shaped note says: More time, please."
      },
      "descriptionEn": "Attack with power 1.15. A correct answer restores up to 2 use(s) to another skill with the most uses missing. Ties follow slot order. Never exceed its limit or restore a use-restoring skill. One use is consumed whether your answer is correct or wrong.",
      "tactic": "long",
      "questionFormat": "q11"
    },
    {
      "id": "SR_echo",
      "name": "Thunder／サンダー",
      "vocab": {
        "en": "thunder",
        "ja": "雷",
        "level": 2
      },
      "attr": "echo",
      "rarity": "SR",
      "type": "attack",
      "uses": 2,
      "power": 2,
      "description": "威力2の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "雷のような大音響で相手を攻める。近所の鳥たちは、技を聞くたびに天気予報を疑う。",
        "en": "Attack with a sound like thunder. The local birds question the weather report every time they hear it."
      },
      "descriptionEn": "Attack with power 2. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "q12"
    },
    {
      "id": "SR_broadcast",
      "name": "Broadcast／ブロードキャスト",
      "vocab": {
        "en": "broadcast",
        "ja": "放送する",
        "level": 1
      },
      "attr": "echo",
      "rarity": "SR",
      "type": "attack",
      "uses": 3,
      "power": 1.85,
      "description": "威力1.85の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "大迫力の声を森じゅうへ放送し、相手を攻める。番組名は「ただいま戦闘中」、司会は自分。",
        "en": "Broadcast a mighty voice through the forest to attack. You host a program called Battle in Progress."
      },
      "descriptionEn": "Attack with power 1.85. One use is consumed whether your answer is correct or wrong.",
      "tactic": "long",
      "questionFormat": "q9"
    },
    {
      "id": "SR_mirage",
      "name": "Disappear／ディサピア",
      "vocab": {
        "en": "disappear",
        "ja": "消える",
        "level": 2
      },
      "attr": "mirage",
      "rarity": "SR",
      "type": "attack",
      "uses": 2,
      "power": 2,
      "description": "威力2の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "姿が消えたように見える速い動きで、大きな一撃を放つ。しっぽだけは隠し忘れている。",
        "en": "Move as if you could disappear, then strike hard. Forget to hide your tail."
      },
      "descriptionEn": "Attack with power 2. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "q11"
    },
    {
      "id": "SR_fancy",
      "name": "Fancy／ファンシー",
      "vocab": {
        "en": "fancy",
        "ja": "空想",
        "level": 1
      },
      "attr": "mirage",
      "rarity": "SR",
      "type": "attack",
      "uses": 2,
      "power": 2.15,
      "description": "威力2.15の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "頭の中の空想を、大きな一撃の勢いに変える。想像する勇者は、なぜか巨大なプリン。",
        "en": "Turn a grand fancy into a mighty hit. For some reason, the hero you imagine is a giant pudding."
      },
      "descriptionEn": "Attack with power 2.15. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "q12"
    },
    {
      "id": "SR_metal",
      "name": "Defeat／ディフィート",
      "vocab": {
        "en": "defeat",
        "ja": "打ち負かす",
        "level": 1
      },
      "attr": "metal",
      "rarity": "SR",
      "type": "attack",
      "uses": 2,
      "power": 2,
      "description": "威力2の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手を打ち倒すつもりで、渾身の一撃を放つ。勝利ポーズは練習済みだが、勝てるかはこれから。",
        "en": "Strike with all your strength to defeat the enemy. You practiced the victory pose, but victory still comes later."
      },
      "descriptionEn": "Attack with power 2. One use is consumed whether your answer is correct or wrong.",
      "tactic": "burst",
      "questionFormat": "q12"
    },
    {
      "id": "SR_absolute",
      "name": "Absolute／アブソリュート",
      "vocab": {
        "en": "absolute",
        "ja": "絶対的な",
        "level": 1
      },
      "attr": "metal",
      "rarity": "SR",
      "type": "ward",
      "uses": 3,
      "shieldHits": 2,
      "shieldFactor": 0.5,
      "wrongShieldFactor": 0.75,
      "power": 1.25,
      "description": "威力1.25の攻撃＋次の敵攻撃2回を正解で50％、不正解で75％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "強く攻めつつ、絶対の守りを目指して盾を構える。盾には小さく「無敵とは言ってません」と書いてある。",
        "en": "Attack strongly and aim for absolute protection with your shield. Small letters say: Not a promise of invincibility."
      },
      "descriptionEn": "Attack with power 1.25. Reduce damage from the next 2 enemy attack(s) to 50% with a correct answer, or 75% with a wrong answer. One use is consumed whether your answer is correct or wrong.",
      "tactic": "guard",
      "questionFormat": "q11"
    }
  ],
  "gear": [
    {
      "id": "none",
      "name": "装備なし",
      "bonus": 0,
      "description": "能力補正なし",
      "descriptionEn": "No stat bonuses."
    },
    {
      "id": "N_hp",
      "name": "Bud／バド",
      "vocab": {
        "en": "bud",
        "ja": "つぼみ",
        "level": 1
      },
      "rarity": "N",
      "stat": "hp",
      "bonus": 0.08,
      "description": "たいりょく＋8％",
      "flavor": {
        "ja": "小さなつぼみの形をしたお守り。大きくなりたい持ち主に人気だが、本人はまだ咲く気がない。",
        "en": "A charm shaped like a tiny bud. Owners who want to grow love it, but the bud is not ready to bloom."
      },
      "descriptionEn": "Maximum HP +8%"
    },
    {
      "id": "N_growth",
      "name": "Growth／グロース",
      "vocab": {
        "en": "growth",
        "ja": "成長",
        "level": 2
      },
      "rarity": "N",
      "bonuses": {
        "hp": 0.05,
        "defense": 0.03
      },
      "description": "たいりょく＋5％・ぼうぎょ＋3％",
      "flavor": {
        "ja": "成長を願って土を入れた小さな鉢。持ち主が毎朝ほめるので、芽より先に自信が育つ。",
        "en": "A little pot filled with soil for growth. Its owner praises it daily, so confidence grows before the seed does."
      },
      "descriptionEn": "Maximum HP +5%; Defense +3%"
    },
    {
      "id": "N_bloom",
      "name": "Bloom／ブルーム",
      "vocab": {
        "en": "bloom",
        "ja": "咲く",
        "level": 2
      },
      "rarity": "N",
      "bonuses": {
        "hp": 0.05,
        "speed": 0.03
      },
      "description": "たいりょく＋5％・すばやさ＋3％",
      "flavor": {
        "ja": "花が咲いた形のブローチ。毎日つけると、毎日「開花祝い」をしたくなる。",
        "en": "A brooch shaped like a flower in bloom. Wearing it makes you want a blooming party every day."
      },
      "descriptionEn": "Maximum HP +5%; Speed +3%"
    },
    {
      "id": "N_attack",
      "name": "Force／フォース",
      "vocab": {
        "en": "force",
        "ja": "力、強制する",
        "level": 2
      },
      "rarity": "N",
      "stat": "attack",
      "bonus": 0.08,
      "description": "こうげき＋8％",
      "flavor": {
        "ja": "力自慢のゴイモンが愛用する腕輪。戦闘以外では、開かない瓶のふた係になることが多い。",
        "en": "A bracelet of force loved by strong Goimon. Outside battle, its owner often opens tight jar lids."
      },
      "descriptionEn": "Attack +8%"
    },
    {
      "id": "N_powerful",
      "name": "Powerful／パワフル",
      "vocab": {
        "en": "powerful",
        "ja": "強力な",
        "level": 2
      },
      "rarity": "N",
      "bonuses": {
        "attack": 0.05,
        "hp": 0.03
      },
      "description": "こうげき＋5％・たいりょく＋3％",
      "flavor": {
        "ja": "力強く見える太いベルト。つけた持ち主は鏡の前で毎回、腕を曲げてポーズを決める。",
        "en": "A thick belt with a powerful look. Its owner flexes in front of the mirror every time."
      },
      "descriptionEn": "Attack +5%; Maximum HP +3%"
    },
    {
      "id": "N_keen",
      "name": "Keen／キーン",
      "vocab": {
        "en": "keen",
        "ja": "鋭い、熱心な",
        "level": 1
      },
      "rarity": "N",
      "bonuses": {
        "attack": 0.05,
        "speed": 0.03
      },
      "description": "こうげき＋5％・すばやさ＋3％",
      "flavor": {
        "ja": "鋭い目つきが描かれたバッジ。持ち主が寝ていても、バッジの顔だけはやる気満々。",
        "en": "A badge with a keen-eyed face. Even while its owner sleeps, the badge looks ready for action."
      },
      "descriptionEn": "Attack +5%; Speed +3%"
    },
    {
      "id": "N_defense",
      "name": "Shell／シェル",
      "vocab": {
        "en": "shell",
        "ja": "殻",
        "level": 2
      },
      "rarity": "N",
      "stat": "defense",
      "bonus": 0.08,
      "description": "ぼうぎょ＋8％",
      "flavor": {
        "ja": "貝殻でできた小さな盾。耳を近づけると波の音がするので、持ち主は戦闘前に海を思い出す。",
        "en": "A small shell shield. Hold it to your ear to hear waves and think of the sea before battle."
      },
      "descriptionEn": "Defense +8%"
    },
    {
      "id": "N_leather",
      "name": "Leather／レザー",
      "vocab": {
        "en": "leather",
        "ja": "革",
        "level": 1
      },
      "rarity": "N",
      "bonuses": {
        "defense": 0.05,
        "speed": 0.03
      },
      "description": "ぼうぎょ＋5％・すばやさ＋3％",
      "flavor": {
        "ja": "動きやすい革のジャケット。つけると強そうに歩きたくなるが、鏡のない場所では普通に戻る。",
        "en": "A leather jacket made for movement. Its owner walks proudly near mirrors, then returns to a normal walk."
      },
      "descriptionEn": "Defense +5%; Speed +3%"
    },
    {
      "id": "N_copper",
      "name": "Copper／カッパー",
      "vocab": {
        "en": "copper",
        "ja": "銅",
        "level": 1
      },
      "rarity": "N",
      "bonuses": {
        "defense": 0.05,
        "hp": 0.03
      },
      "description": "ぼうぎょ＋5％・たいりょく＋3％",
      "flavor": {
        "ja": "装備を留める銅の金具。毎朝磨く持ち主は、戦闘より先に自分の顔を映して楽しむ。",
        "en": "A copper clasp for your gear. Its owner polishes it daily and checks their reflection before battle."
      },
      "descriptionEn": "Defense +5%; Maximum HP +3%"
    },
    {
      "id": "N_speed",
      "name": "Feather／フェザー",
      "vocab": {
        "en": "feather",
        "ja": "羽",
        "level": 2
      },
      "rarity": "N",
      "stat": "speed",
      "bonus": 0.08,
      "description": "すばやさ＋8％",
      "flavor": {
        "ja": "羽を結びつけた軽いお守り。風の日に落とすと、持ち主が本気で走る理由になる。",
        "en": "A light feather charm. Drop it on a windy day and its owner has a reason to run fast."
      },
      "descriptionEn": "Speed +8%"
    },
    {
      "id": "N_rapid",
      "name": "Rapid／ラピッド",
      "vocab": {
        "en": "rapid",
        "ja": "急速な",
        "level": 1
      },
      "rarity": "N",
      "bonuses": {
        "speed": 0.05,
        "attack": 0.03
      },
      "description": "すばやさ＋5％・こうげき＋3％",
      "flavor": {
        "ja": "走りやすい小さな靴。持ち主は速く走れる気がして、買い物の帰りまで競走にしてしまう。",
        "en": "Little shoes for rapid steps. Their owner turns even the walk home from shopping into a race."
      },
      "descriptionEn": "Speed +5%; Attack +3%"
    },
    {
      "id": "N_motion",
      "name": "Motion／モーション",
      "vocab": {
        "en": "motion",
        "ja": "動き",
        "level": 1
      },
      "rarity": "N",
      "bonuses": {
        "speed": 0.05,
        "defense": 0.03
      },
      "description": "すばやさ＋5％・ぼうぎょ＋3％",
      "flavor": {
        "ja": "歩くたびに小さな音がする足輪。動くのが楽しくて、持ち主は用もなく部屋を一周する。",
        "en": "An anklet that makes a sound with every motion. Its owner walks around the room just to hear it."
      },
      "descriptionEn": "Speed +5%; Defense +3%"
    },
    {
      "id": "N_confidence",
      "name": "Confidence／コンフィデンス",
      "vocab": {
        "en": "confidence",
        "ja": "自信",
        "level": 1
      },
      "rarity": "N",
      "effect": "streak",
      "description": "攻撃を伴う行動に2回連続正解すると、次の攻撃が1.15倍。強化を使うと連続数をリセット。不正解でもリセット。",
      "flavor": {
        "ja": "練習を頑張った証としてもらえるメダル。裏には「自信のもとは練習」と小さく刻まれている。",
        "en": "A medal earned through practice. On the back, tiny letters say: Confidence comes from practice."
      },
      "descriptionEn": "After two consecutive correct answers on actions that attack, your next attack deals 1.15 times as much damage. Using the boost resets the streak. A wrong answer also resets it."
    },
    {
      "id": "N_patience",
      "name": "Patience／ペイシェンス",
      "vocab": {
        "en": "patience",
        "ja": "忍耐",
        "level": 2
      },
      "rarity": "N",
      "effect": "patient",
      "description": "相手より素早さが低いと、敵の攻撃から受けるダメージを10％軽減。",
      "flavor": {
        "ja": "待つのが得意な持ち主に似合う時計。お湯が沸くまで眺めていても、なぜか退屈しない。",
        "en": "A clock for an owner with patience. Watching it while water boils somehow never gets boring."
      },
      "descriptionEn": "When you are slower than the enemy, take 10% less damage from enemy attacks."
    },
    {
      "id": "N_courage",
      "name": "Courage／カリッジ",
      "vocab": {
        "en": "courage",
        "ja": "勇気",
        "level": 2
      },
      "rarity": "N",
      "effect": "courage",
      "description": "HPが最大HPの半分以下のとき、攻撃のダメージを12％強化。",
      "flavor": {
        "ja": "勇気を出したいときに結ぶスカーフ。持ち主は怖くなると、結び目をきゅっと握り直す。",
        "en": "A scarf tied on for courage. When its owner feels afraid, they hold the knot a little tighter."
      },
      "descriptionEn": "When HP is at or below half of maximum HP, deal 12% more attack damage."
    },
    {
      "id": "N_spare",
      "name": "Spare／スペア",
      "vocab": {
        "en": "spare",
        "ja": "予備の",
        "level": 2
      },
      "rarity": "N",
      "effect": "spare",
      "description": "攻撃・回復・防護などの技を最初に使い切ったとき、1回だけ使用回数を1回復。回数回復技には発動しない。",
      "flavor": {
        "ja": "予備の道具を入れておく小さなポケット。持ち主は安心するが、中身を確かめる回数は増える。",
        "en": "A little pocket for spare supplies. Its owner feels safer, but checks inside more often."
      },
      "descriptionEn": "The first time a skill runs out of uses, restore one use, once per battle. Does not activate for use-restoring skills."
    },
    {
      "id": "N_harmony",
      "name": "Harmony／ハーモニー",
      "vocab": {
        "en": "harmony",
        "ja": "調和",
        "level": 1
      },
      "rarity": "N",
      "effect": "harmony",
      "description": "防御問題に正解して生き残ると、最大HPの3％を回復。",
      "flavor": {
        "ja": "澄んだ音が鳴る小さな鈴。持ち主が深呼吸すると、鈴の音とお腹の音がたまに重なる。",
        "en": "A little bell with a clear sound. Its owner breathes calmly, and a stomach rumble sometimes joins the harmony."
      },
      "descriptionEn": "After a correct defense answer, restore 3% of maximum HP if you survived the attack."
    },
    {
      "id": "N_steady",
      "name": "Steady／ステディ",
      "vocab": {
        "en": "steady",
        "ja": "安定した",
        "level": 1
      },
      "rarity": "N",
      "effect": "steady",
      "description": "戦闘中、最初の防御不正解だけ、被ダメージ増加を120％から100％に抑える。",
      "flavor": {
        "ja": "滑りにくさを意識した靴底。持ち主は歩き方が安定した気がして、バナナの皮にもお辞儀する。",
        "en": "Soles designed for steady steps. Their owner feels so confident that they politely greet banana peels."
      },
      "descriptionEn": "Once per battle, your first wrong defense answer takes 100% damage instead of 120%."
    },
    {
      "id": "R_hp",
      "name": "Vitamin／ビタミン",
      "vocab": {
        "en": "vitamin",
        "ja": "ビタミン",
        "level": 2
      },
      "rarity": "R",
      "stat": "hp",
      "bonus": 0.12,
      "description": "たいりょく＋12％",
      "flavor": {
        "ja": "ビタミンを思わせる明るい色のペンダント。お菓子に似ているが、食べようとするたびに止められる。",
        "en": "A bright, vitamin-colored pendant. It looks like candy, but someone always stops you from tasting it."
      },
      "descriptionEn": "Maximum HP +12%"
    },
    {
      "id": "R_attack",
      "name": "Strength／ストレングス",
      "vocab": {
        "en": "strength",
        "ja": "強さ",
        "level": 2
      },
      "rarity": "R",
      "stat": "attack",
      "bonus": 0.12,
      "description": "こうげき＋12％",
      "flavor": {
        "ja": "力を込めやすい頑丈なこて。持ち主は握手のときだけ、やさしく握ることを思い出す。",
        "en": "A sturdy gauntlet for strength. Its owner remembers to be gentle only when shaking hands."
      },
      "descriptionEn": "Attack +12%"
    },
    {
      "id": "R_defense",
      "name": "Steel／スティール",
      "vocab": {
        "en": "steel",
        "ja": "鋼鉄",
        "level": 2
      },
      "rarity": "R",
      "stat": "defense",
      "bonus": 0.12,
      "description": "ぼうぎょ＋12％",
      "flavor": {
        "ja": "しっかりした鋼の胸当て。雨の日の持ち主は、濡れることより手入れの手間を心配する。",
        "en": "A solid steel chest plate. On rainy days, its owner worries more about cleaning it than getting wet."
      },
      "descriptionEn": "Defense +12%"
    },
    {
      "id": "R_speed",
      "name": "Flight／フライト",
      "vocab": {
        "en": "flight",
        "ja": "飛行",
        "level": 2
      },
      "rarity": "R",
      "stat": "speed",
      "bonus": 0.12,
      "description": "すばやさ＋12％",
      "flavor": {
        "ja": "飛行機の模様がついた靴。飛べるわけではないが、持ち主は走る前に「離陸します」と言う。",
        "en": "Shoes with a flight pattern. They cannot fly, but their owner announces takeoff before running."
      },
      "descriptionEn": "Speed +12%"
    },
    {
      "id": "SR_hp",
      "name": "Survive／サバイブ",
      "vocab": {
        "en": "survive",
        "ja": "生き残る",
        "level": 1
      },
      "rarity": "SR",
      "stat": "hp",
      "bonus": 0.16,
      "description": "たいりょく＋16％",
      "flavor": {
        "ja": "生き残る決意を込めた首飾り。持ち主は非常食の場所を覚えているが、つまみ食いとの戦いも続く。",
        "en": "A necklace for the will to survive. Its owner remembers the emergency snacks and struggles not to eat them early."
      },
      "descriptionEn": "Maximum HP +16%"
    },
    {
      "id": "SR_attack",
      "name": "Superior／スーペリア",
      "vocab": {
        "en": "superior",
        "ja": "優れた",
        "level": 1
      },
      "rarity": "SR",
      "stat": "attack",
      "bonus": 0.16,
      "description": "こうげき＋16％",
      "flavor": {
        "ja": "優れた力を示す王冠。持ち主はかぶると武勇伝を語りたくなり、仲間は話の長さを警戒する。",
        "en": "A crown of superior strength. Wearing it starts a heroic story, and friends worry about how long it will last."
      },
      "descriptionEn": "Attack +16%"
    },
    {
      "id": "SR_defense",
      "name": "Reliable／リライアブル",
      "vocab": {
        "en": "reliable",
        "ja": "信頼できる",
        "level": 1
      },
      "rarity": "SR",
      "stat": "defense",
      "bonus": 0.16,
      "description": "ぼうぎょ＋16％",
      "flavor": {
        "ja": "仲間からも頼りにされる大きな盾。雨の日には傘代わりにも使われ、戦闘以外でも忙しい。",
        "en": "A large, reliable shield. Friends borrow it as an umbrella, so it stays busy outside battle too."
      },
      "descriptionEn": "Defense +16%"
    },
    {
      "id": "SR_speed",
      "name": "Advance／アドバンス",
      "vocab": {
        "en": "advance",
        "ja": "前進する／前進",
        "level": 1
      },
      "rarity": "SR",
      "stat": "speed",
      "bonus": 0.16,
      "description": "すばやさ＋16％",
      "flavor": {
        "ja": "前へ進む冒険者のためのマント。持ち主は格好よく出発したいのに、たまに裏返しで着ている。",
        "en": "A cape for adventurers ready to advance. Its owner wants a grand departure, but sometimes wears it inside out."
      },
      "descriptionEn": "Speed +16%"
    }
  ],
  "questions": [
    {
      "kind": "単語",
      "en": "absence",
      "ja": "欠席"
    },
    {
      "kind": "単語",
      "en": "account",
      "ja": "勘定、説明"
    },
    {
      "kind": "単語",
      "en": "acid",
      "ja": "酸"
    },
    {
      "kind": "単語",
      "en": "advertisement",
      "ja": "広告"
    },
    {
      "kind": "単語",
      "en": "adopt",
      "ja": "採用する、養子にする"
    },
    {
      "kind": "単語",
      "en": "afford",
      "ja": "～する余裕がある"
    },
    {
      "kind": "単語",
      "en": "agriculture",
      "ja": "農業"
    },
    {
      "kind": "単語",
      "en": "appointment",
      "ja": "予約、任命"
    },
    {
      "kind": "単語",
      "en": "author",
      "ja": "著者"
    },
    {
      "kind": "熟語",
      "en": "look forward to",
      "ja": "～を楽しみに待つ"
    },
    {
      "kind": "熟語",
      "en": "be reluctant to",
      "ja": "～するのに気が進まない"
    },
    {
      "kind": "熟語",
      "en": "be in charge of",
      "ja": "～を担当している"
    },
    {
      "kind": "熟語",
      "en": "turn down",
      "ja": "～を断る"
    },
    {
      "kind": "熟語",
      "en": "as soon as possible",
      "ja": "できるだけ早く"
    },
    {
      "kind": "熟語",
      "en": "because of",
      "ja": "～のために、～が原因で"
    }
  ],
  "attributes": {
    "echo": "エコー",
    "mirage": "ミラージュ",
    "metal": "メタル"
  },
  "stages": {
    "child": 1,
    "growth": 1.3,
    "mid": 1.6,
    "final": 2
  },
  "enemies": {
    "intro": {
      "name": "入門の番人",
      "hp": 80,
      "attack": 14,
      "defense": 14,
      "speed": 12,
      "skillTurns": 0,
      "skillPower": 1
    },
    "normal": {
      "name": "遺跡の番人",
      "hp": 100,
      "attack": 18,
      "defense": 18,
      "speed": 18,
      "skillTurns": 2,
      "skillPower": 1.2
    },
    "boss": {
      "name": "遺跡の守護者",
      "hp": 140,
      "attack": 14,
      "defense": 16,
      "speed": 16,
      "skillTurns": 2,
      "skillPower": 1.2
    },
    "swift": {
      "name": "疾走の番人",
      "hp": 100,
      "attack": 16,
      "defense": 16,
      "speed": 22,
      "skillTurns": 2,
      "skillPower": 1.2
    },
    "tank": {
      "name": "装甲の番人",
      "hp": 120,
      "attack": 14,
      "defense": 22,
      "speed": 10,
      "skillTurns": 2,
      "skillPower": 1.2
    }
  },
  "tactics": {
    "burst": {
      "name": "火力",
      "nameEn": "Burst",
      "description": "強力な一撃で早期突破を狙う",
      "descriptionEn": "Focus on decisive damage."
    },
    "heal": {
      "name": "回復",
      "nameEn": "Recovery",
      "description": "HPを回復して戦い続ける",
      "descriptionEn": "Restore HP and sustain your team."
    },
    "guard": {
      "name": "防御",
      "nameEn": "Guard",
      "description": "被ダメージを抑えて正解を積み重ねる",
      "descriptionEn": "Reduce incoming damage and survive."
    },
    "disrupt": {
      "name": "妨害",
      "nameEn": "Disruption",
      "description": "相手の攻撃を弱めて主導権を握る",
      "descriptionEn": "Weaken incoming attacks."
    },
    "chain": {
      "name": "連携",
      "nameEn": "Combo",
      "description": "次の行動につなげて威力を引き出す",
      "descriptionEn": "Set up the next action."
    },
    "long": {
      "name": "長期戦",
      "nameEn": "Endurance",
      "description": "回復・補助・技回数管理で粘り強く戦う",
      "descriptionEn": "Outlast foes through sustain and resource management."
    }
  },
  "questionFormats": {
    "word_meaning": {
      "label": "単語の意味",
      "rank": 0
    },
    "q1": {
      "label": "大問1",
      "rank": 1
    },
    "q3": {
      "label": "大問3",
      "rank": 2
    },
    "idiom": {
      "label": "イディオム",
      "rank": 3
    },
    "q9": {
      "label": "大問9",
      "rank": 4
    },
    "q11": {
      "label": "大問11",
      "rank": 5
    },
    "q12": {
      "label": "大問12",
      "rank": 6
    }
  },
  "questionDifficultyOrder": [
    "word_meaning",
    "q1",
    "q3",
    "idiom",
    "q9",
    "q11",
    "q12"
  ]
};if(typeof module!=="undefined")module.exports=data;else root.GoimonBattleCatalog=data;
})(typeof window!=="undefined"?window:globalThis);
