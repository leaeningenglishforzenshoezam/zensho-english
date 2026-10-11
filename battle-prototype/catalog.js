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
          "description": "やわらかな光をまとった羊の幼体。そばにいるだけで心が落ち着き、ことばへの不安をやさしく和らげてくれる。",
          "image": "images/goimon/nagomi_child.png"
        },
        "growth": {
          "name": "ラミナス",
          "description": "軽やかに駆けながら光をまき散らす成長体。学びの中で揺れる気持ちを整え、前へ進む力をそっと与えてくれる。",
          "image": "images/goimon/nagomi_growth.png"
        },
        "mid": {
          "name": "ラムノエル",
          "description": "神聖な輪と力を宿した中間体。乱れた思考や不安を静め、ことばと心を正しい流れへ導く存在。",
          "image": "images/goimon/nagomi_mid.png"
        },
        "final": {
          "name": "セラフィラムノア",
          "description": "神獣として覚醒した上級体。周囲の心と言葉の調和を保ち、学びの場そのものを穏やかに安定させる守護者。",
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
          "description": "大きな耳と澄んだ瞳を持つフェネックの幼体。わずかな違和感や新しい語彙に敏感で、小さなひらめきを胸に灯す。",
          "image": "images/goimon/hirameki_child.png"
        },
        "growth": {
          "name": "フェネークト",
          "description": "思考の結晶が体に現れ始めた成長体。集めた語彙をもとに、瞬時に意味を組み立てる直感的な判断力を身につける。",
          "image": "images/goimon/hirameki_growth.png"
        },
        "mid": {
          "name": "フェネクスヴィア",
          "description": "内側で思考を深く巡らせる中間体。膨大な語彙と情報を静かに整理し、核心に近い答えへとたどり着く洞察力を持つ。",
          "image": "images/goimon/hirameki_mid.png"
        },
        "final": {
          "name": "ディスフェネヴィクトン",
          "description": "思考そのものが暴走し進化した存在。あらゆる語彙と概念を瞬時に再構築し、常識を超えた答えを導き出す閃光の知性体。",
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
          "name": "クラージェ",
          "description": "透き通る体を持つクラゲの幼体。触れたことばや感情をそのまま体内に取り込み、小さな光として蓄えていく。",
          "image": "images/goimon/tsumugi_child.png"
        },
        "growth": {
          "name": "ジェリアンヌ",
          "description": "体内に蓄えた語彙がゆらめき始めた成長体。ことば同士をゆるやかにつなぎ、意味の流れを生み出す力を持つ。",
          "image": "images/goimon/tsumugi_growth.png"
        },
        "mid": {
          "name": "ネクロジェリアルノ",
          "description": "無数の言葉を編み上げる中間体。取り込んだ語彙と感情を組み合わせ、新たな表現として外へと紡ぎ出す。",
          "image": "images/goimon/tsumugi_mid.png"
        },
        "final": {
          "name": "バイオネクロクラゲンゲン",
          "description": "巨大な言語生命体へと進化した存在。無限に増殖する語彙と感情を編み込み、世界そのものを表現で満たす。",
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
          "name": "レムー",
          "description": "大きな瞳と長い尾を持つキツネザルの幼体。光る模様の尾でことばの気配を感じ取り、文の中にひそむ小さな違和感を見つけるのが得意。",
          "image": "images/goimon/yomitoki_child.png"
        },
        "growth": {
          "name": "レムールノ",
          "description": "帽子と地図道具を身につけた探検家になったキツネザル。語彙の手がかりを集めながら文脈の森を進み、意味のつながりを少しずつ読み解いていく。",
          "image": "images/goimon/yomitoki_growth.png"
        },
        "mid": {
          "name": "レムールギアス",
          "description": "蒸気仕掛けの装備で空を駆けるキツネザル。複数のレンズで情報を見極め、学んだ語彙と文脈を高速で照合して答えへの道筋を切り開く。",
          "image": "images/goimon/yomitoki_mid.png"
        },
        "final": {
          "name": "クロノレムールヴァイス",
          "description": "超高機動の解析装備をまとった上級体。無数の視点から文脈を同時に読み、膨大な語彙を瞬時に統合して真の意味へ到達する、天空の解読王。",
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
          "name": "プラティ",
          "description": "水や空気の揺らぎに敏感なカモノハシの幼体。音やアクセントの違いを直感的に感じ取り、小さな変化を見逃さない。",
          "image": "images/goimon/shirabe_child.png"
        },
        "growth": {
          "name": "プラティ・クゥ",
          "description": "音の流れを扱い始めた成長体。拾い上げた振動や発音の違いを組み合わせ、語の特徴をより正確にとらえる。",
          "image": "images/goimon/shirabe_growth.png"
        },
        "mid": {
          "name": "プラティ・ボルグ",
          "description": "重厚な機構を備えた中間体。音や信号を分解・分析し、隠れたパターンや規則を見抜く探査能力を持つ。",
          "image": "images/goimon/shirabe_mid.png"
        },
        "final": {
          "name": "ギガ・プラティ・ボルグヌス",
          "description": "巨大な解析装置と一体化した上級体。あらゆる音と情報を同時に処理し、未知の語彙や構造を発見・制御する探査王。",
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
          "name": "フローア",
          "description": "水のゆらぎや音の波に心を弾ませるカエルの幼体。ことばの響きに敏感で、小さな音の違いにも楽しそうに反応する。",
          "image": "images/goimon/hibiki_child.png"
        },
        "growth": {
          "name": "フロリアーラ",
          "description": "太陽の光と自然の力に共鳴し始めた成長体。音と意味をやさしく結びつけ、学んだことばを明るいエネルギーへ変えていく。",
          "image": "images/goimon/hibiki_growth.png"
        },
        "mid": {
          "name": "ソーラーフログリア",
          "description": "光・水・響きを一つに束ねる中間体。取り込んだ知識と音の流れを増幅し、周囲へ力強く放つことで場そのものを活性化させる。",
          "image": "images/goimon/hibiki_mid.png"
        },
        "final": {
          "name": "キングソーラーフログリア",
          "description": "共鳴する都市の中心に君臨する上級体。太陽の力、音の波、学びの知恵を循環させ、世界を明るい調和で満たす発光王。",
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
          "name": "オルカン",
          "description": "きらめく水と星をまとったシャチの幼体。ことばを発することを楽しみ、小さな表現が周囲にやさしい変化を生み出す。",
          "image": "images/goimon/kotonoha_child.png"
        },
        "growth": {
          "name": "オルカシア",
          "description": "意思を持ったことばを扱い始めた成長体。語りかける力が強まり、ことばによって状況を動かし始める。",
          "image": "images/goimon/kotonoha_growth.png"
        },
        "mid": {
          "name": "オルカシッサ",
          "description": "星々の軌道をまといし中間体。発したことばが現実に影響を与え、空間や流れそのものを変化させる力を持つ。",
          "image": "images/goimon/kotonoha_mid.png"
        },
        "final": {
          "name": "アストラオルカシオン",
          "description": "宇宙を統べることばの王。語るだけで世界の構造を書き換え、物語そのものを創り出す絶対的存在。",
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
      "power": 1.5,
      "description": "威力1.5の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "風船を割る勢いで叫ぶ。風船は持っていないので、空気が気まずくなる。",
        "en": "Burst into a shout loud enough to pop a balloon. There is no balloon. The air feels awkward."
      },
      "descriptionEn": "Attack with power 1.5. One use is consumed whether your answer is correct or wrong."
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
      "uses": 4,
      "power": 1.4,
      "description": "威力1.4の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "森じゅうに悲鳴が響く。本人は「発声練習です」と言い張っている。",
        "en": "Scream across the forest. Insist that it is just voice practice."
      },
      "descriptionEn": "Attack with power 1.4. One use is consumed whether your answer is correct or wrong."
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
      "healFraction": 0.25,
      "description": "最大HPの25％回復。不正解は半分。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "「君ならできる！」と応援する。自分に言っていることは秘密。",
        "en": "Encourage yourself with a mighty cheer. Pretend it was meant for someone else."
      },
      "descriptionEn": "Restore 25% of maximum HP; a wrong answer restores half as much. One use is consumed whether your answer is correct or wrong."
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
      "nextPower": 1.75,
      "power": 1.05,
      "description": "威力1.05の攻撃。正解で次の攻撃を1.75倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "一点に集中する。鼻先のちょうちょも集中してこちらを見ている。",
        "en": "Concentrate on one point. A butterfly on your nose is concentrating on you."
      },
      "descriptionEn": "Attack with power 1.05. A correct answer makes your next attack 1.75 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.1,
      "description": "威力1.1の攻撃。正解で次の敵の攻撃を65％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手の肩の力を抜かせる。戦闘中の出張リラックスサービス。",
        "en": "Relieve the tension with a relaxing voice. A tiny spa, right in the middle of battle."
      },
      "descriptionEn": "Attack with power 1.1. A correct answer reduces the enemy's next attack damage to 65%. One use is consumed whether your answer is correct or wrong."
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
        "ja": "忘れていた技を思い出させる。思い出したのは昨日の夕飯ではない。",
        "en": "Remind a skill that it still has a job to do. Yesterday's dinner can wait."
      },
      "descriptionEn": "Attack with power 1. A correct answer restores up to 1 use(s) to another skill with the most uses missing. Ties follow slot order. Never exceed its limit or restore a use-restoring skill. One use is consumed whether your answer is correct or wrong."
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
      "healFraction": 0.2,
      "description": "最大HPの20％回復。不正解は半分。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "救急箱を開く。ばんそうこう全部に自分の似顔絵が描いてある。",
        "en": "Offer aid from a first-aid box. Every bandage has your face on it."
      },
      "descriptionEn": "Restore 20% of maximum HP; a wrong answer restores half as much. One use is consumed whether your answer is correct or wrong."
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
      "nextPower": 1.65,
      "power": 0.95,
      "description": "威力0.95の攻撃。正解で次の攻撃を1.65倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "自分をほめて勢いをつける。拍手担当も自分。",
        "en": "Praise yourself before the next hit. You are also in charge of the applause."
      },
      "descriptionEn": "Attack with power 0.95. A correct answer makes your next attack 1.65 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong."
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
      "uses": 4,
      "power": 1.4,
      "description": "威力1.4の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "一語一語をはっきり発音する。相手の耳まで姿勢がよくなる。",
        "en": "Pronounce every word clearly. Even the enemy's ears sit up straight."
      },
      "descriptionEn": "Attack with power 1.4. One use is consumed whether your answer is correct or wrong."
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
      "nextPower": 1.6,
      "power": 1.15,
      "description": "威力1.15の攻撃。正解で次の攻撃を1.6倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "リズムを刻んで次の一撃へ。足だけ先に盛り上がっている。",
        "en": "Find your rhythm for the next hit. Your feet start the party early."
      },
      "descriptionEn": "Attack with power 1.15. A correct answer makes your next attack 1.6 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong."
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
      "healFraction": 0.2,
      "description": "最大HPの20％回復。不正解は半分。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "ふわふわの毛布で自分を慰める。森に持ってきたのは正解だった。",
        "en": "Comfort yourself with a fluffy blanket. Bringing it to the forest was a good idea."
      },
      "descriptionEn": "Restore 20% of maximum HP; a wrong answer restores half as much. One use is consumed whether your answer is correct or wrong."
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
      "uses": 4,
      "power": 1.4,
      "description": "威力1.4の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "小声でとんでもないことをささやく。「靴下、左右ちがうよ」。",
        "en": "Whisper something shocking: Your socks do not match."
      },
      "descriptionEn": "Attack with power 1.4. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.5,
      "description": "威力1.5の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "小さな影を投げかける。本人より影のほうがポーズに自信がある。",
        "en": "Cast a little shadow. It is much more confident about its pose than you are."
      },
      "descriptionEn": "Attack with power 1.5. One use is consumed whether your answer is correct or wrong."
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
      "uses": 4,
      "power": 1.4,
      "description": "威力1.4の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手を追いかける。気持ちは勇者、足音は買い物帰り。",
        "en": "Chase the enemy like a hero. Your footsteps sound like a trip home from the shops."
      },
      "descriptionEn": "Attack with power 1.4. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.65,
      "description": "威力1.65の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "まぶしく光る。記念写真を撮る予定はなかった。",
        "en": "Flash like a camera. Nobody asked for a group photo."
      },
      "descriptionEn": "Attack with power 1.65. One use is consumed whether your answer is correct or wrong."
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
      "nextPower": 1.75,
      "power": 1.05,
      "description": "威力1.05の攻撃。正解で次の攻撃を1.75倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "次の一撃に備える。おやつの準備まで済んでいる。",
        "en": "Prepare for the next hit. The snacks are ready too."
      },
      "descriptionEn": "Attack with power 1.05. A correct answer makes your next attack 1.75 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.1,
      "description": "威力1.1の攻撃。正解で次の敵の攻撃を65％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "右を指して左を見る。本人もちょっと混乱している。",
        "en": "Confuse the enemy by pointing right and looking left. Confuse yourself a little too."
      },
      "descriptionEn": "Attack with power 1.1. A correct answer reduces the enemy's next attack damage to 65%. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.1,
      "description": "威力1.1の攻撃＋次の敵攻撃1回を正解で65％、不正解で85％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "影たちと息を合わせる。ひとつだけ音程が迷子。",
        "en": "Bring your shadows into harmony. One of them is still searching for the right note."
      },
      "descriptionEn": "Attack with power 1.1. Reduce damage from the next 1 enemy attack(s) to 65% with a correct answer, or 85% with a wrong answer. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.5,
      "description": "威力1.5の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "絶妙な角度から攻める。三角定規に見守られている気がする。",
        "en": "Attack from the perfect angle. Somewhere, a triangle ruler feels proud."
      },
      "descriptionEn": "Attack with power 1.5. One use is consumed whether your answer is correct or wrong."
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
      "nextPower": 1.65,
      "power": 0.95,
      "description": "威力0.95の攻撃。正解で次の攻撃を1.65倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "ちらっと相手を見て作戦を立てる。見ていないふりが下手。",
        "en": "Glance at the enemy and plan the next hit. Fail to look casual about it."
      },
      "descriptionEn": "Attack with power 0.95. A correct answer makes your next attack 1.65 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong."
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
        "ja": "日陰に身を寄せて攻める。木には家賃を払っていない。",
        "en": "Attack from the shade. You have not paid the tree any rent."
      },
      "descriptionEn": "Attack with power 0.95. Reduce damage from the next 1 enemy attack(s) to 75% with a correct answer, or 90% with a wrong answer. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.5,
      "description": "威力1.5の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "謎めいた一撃を放つ。説明を求められても首をかしげる。",
        "en": "Deliver a mysterious hit. Tilt your head when anyone asks how it works."
      },
      "descriptionEn": "Attack with power 1.5. One use is consumed whether your answer is correct or wrong."
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
      "nextPower": 1.6,
      "power": 1.15,
      "description": "威力1.15の攻撃。正解で次の攻撃を1.6倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "強そうな自分を思い描く。想像の中ではマントが異様に長い。",
        "en": "Build an image of your mighty next hit. In your mind, your cape is far too long."
      },
      "descriptionEn": "Attack with power 1.15. A correct answer makes your next attack 1.6 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong."
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
      "nextPower": 2,
      "power": 0.9,
      "description": "威力0.9の攻撃。正解で次の攻撃を2倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "じっくり相手を観察する。まつ毛の本数は作戦に関係ない。",
        "en": "Observe the enemy carefully. Counting eyelashes is not part of the plan."
      },
      "descriptionEn": "Attack with power 0.9. A correct answer makes your next attack 2 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.5,
      "description": "威力1.5の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "豪快にぶつかる。音だけ聞くと台所で鍋が落ちたみたい。",
        "en": "Crash into the enemy. It sounds like someone dropped a pot in the kitchen."
      },
      "descriptionEn": "Attack with power 1.5. One use is consumed whether your answer is correct or wrong."
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
      "uses": 4,
      "power": 1.4,
      "description": "威力1.4の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "ぐいっと押す。「押す」と書いたボタンを見ると押したくなる。",
        "en": "Press forward with a solid hit. A button marked PRESS would be very tempting."
      },
      "descriptionEn": "Attack with power 1.4. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.65,
      "description": "威力1.65の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "すぱっと切り込む。心の中では大きなケーキを切っている。",
        "en": "Slice through with a sharp hit. In your mind, it is a very large cake."
      },
      "descriptionEn": "Attack with power 1.65. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.1,
      "description": "威力1.1の攻撃＋次の敵攻撃1回を正解で65％、不正解で85％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻めながら身を守る。ふた付きの鍋を見てひらめいたらしい。",
        "en": "Defend yourself while attacking. A pot with a lid gave you the idea."
      },
      "descriptionEn": "Attack with power 1.1. Reduce damage from the next 1 enemy attack(s) to 65% with a correct answer, or 85% with a wrong answer. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.1,
      "description": "威力1.1の攻撃。正解で次の敵の攻撃を65％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手の勢いを減らす。元気の音量つまみを少し回す感じ。",
        "en": "Reduce the enemy's force. Imagine turning down the volume of its energy."
      },
      "descriptionEn": "Attack with power 1.1. A correct answer reduces the enemy's next attack damage to 65%. One use is consumed whether your answer is correct or wrong."
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
      "healFraction": 0.25,
      "description": "最大HPの25％回復。不正解は半分。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "傷を手当てする。工具箱からなぜかかわいいシールが出てくる。",
        "en": "Repair the damage. Somehow, the toolbox is full of cute stickers."
      },
      "descriptionEn": "Restore 25% of maximum HP; a wrong answer restores half as much. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.2,
      "description": "威力1.2の攻撃。正解で次の敵の攻撃を70％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手の勢いを結ぶ。リボン結びにしたくて少しうずうずする。",
        "en": "Bind the enemy's force. Try to resist adding a pretty bow."
      },
      "descriptionEn": "Attack with power 1.2. A correct answer reduces the enemy's next attack damage to 70%. One use is consumed whether your answer is correct or wrong."
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
        "ja": "相手の勢いを小さくする。サイズ変更のお願いは丁寧に。",
        "en": "Decrease the enemy's force. Ask politely for a smaller size."
      },
      "descriptionEn": "Attack with power 0.95. A correct answer reduces the enemy's next attack damage to 70%. One use is consumed whether your answer is correct or wrong."
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
        "ja": "攻めつつ被害に備える。注意書きは「ぶつかる前によく読んで」。",
        "en": "Prevent some damage while attacking. The warning says: Read before bumping into things."
      },
      "descriptionEn": "Attack with power 0.95. Reduce damage from the next 1 enemy attack(s) to 75% with a correct answer, or 90% with a wrong answer. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.1,
      "description": "威力1.1の攻撃。正解で次の敵の攻撃を70％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手の勢いにブレーキをかける。急停車するのは自転車だけではない。",
        "en": "Brake the enemy's momentum. Bicycles are not the only things that need to slow down."
      },
      "descriptionEn": "Attack with power 1.1. A correct answer reduces the enemy's next attack damage to 70%. One use is consumed whether your answer is correct or wrong."
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
      "power": 1.25,
      "description": "威力1.25の攻撃＋次の敵攻撃1回を正解で70％、不正解で90％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻めながら守りを固める。鍵をかけたあと、三回確かめる。",
        "en": "Lock your guard into place while attacking. Check the lock three times, just in case."
      },
      "descriptionEn": "Attack with power 1.25. Reduce damage from the next 1 enemy attack(s) to 70% with a correct answer, or 90% with a wrong answer. One use is consumed whether your answer is correct or wrong."
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
      "nextPower": 1.6,
      "power": 1.15,
      "description": "威力1.15の攻撃。正解で次の攻撃を1.6倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "伸びをして次の一撃に備える。気分は大きい、身長はそのまま。",
        "en": "Stretch before the next hit. Feel taller. Remain exactly the same height."
      },
      "descriptionEn": "Attack with power 1.15. A correct answer makes your next attack 1.6 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong."
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
      "uses": 2,
      "power": 1.9,
      "description": "威力1.9の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "びっくりする音で攻める。自分も少しびっくりしたことは内緒。",
        "en": "Shock the enemy with a sudden sound. Keep quiet about startling yourself too."
      },
      "descriptionEn": "Attack with power 1.9. One use is consumed whether your answer is correct or wrong."
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
      "uses": 2,
      "healFraction": 0.35,
      "description": "最大HPの35％回復。不正解は半分。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "手当てをする。苦い薬のあとにごほうびの顔だけしておく。",
        "en": "Offer a cure with careful care. Make a reward face after the bitter medicine."
      },
      "descriptionEn": "Restore 35% of maximum HP; a wrong answer restores half as much. One use is consumed whether your answer is correct or wrong."
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
      "uses": 2,
      "nextPower": 2,
      "power": 1.3,
      "description": "威力1.3の攻撃。正解で次の攻撃を2倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "次の一撃へ号令をかける。部下は自分ひとり、返事は大きい。",
        "en": "Command the next attack. You are the only soldier, but your reply is very loud."
      },
      "descriptionEn": "Attack with power 1.3. A correct answer makes your next attack 2 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong."
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
      "uses": 2,
      "power": 1.9,
      "description": "威力1.9の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "影で相手を取り囲む。ひとつだけ集合写真のつもりで並んでいる。",
        "en": "Surround the enemy with shadows. One of them thinks this is a group photo."
      },
      "descriptionEn": "Attack with power 1.9. One use is consumed whether your answer is correct or wrong."
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
      "uses": 2,
      "weakFactor": 0.5,
      "power": 1.35,
      "description": "威力1.35の攻撃。正解で次の敵の攻撃を50％にする。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "相手の集中を乱す。大事な場面でお腹が鳴った、という設定。",
        "en": "Disturb the enemy's focus. Pretend your stomach picked this moment to rumble."
      },
      "descriptionEn": "Attack with power 1.35. A correct answer reduces the enemy's next attack damage to 50%. One use is consumed whether your answer is correct or wrong."
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
      "uses": 2,
      "nextPower": 2,
      "power": 1.3,
      "description": "威力1.3の攻撃。正解で次の攻撃を2倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "強そうなふりで次の一撃に備える。演技に自分まで乗せられる。",
        "en": "Pretend to be mighty before the next hit. Your own acting starts to convince you."
      },
      "descriptionEn": "Attack with power 1.3. A correct answer makes your next attack 2 times as strong. This replaces any existing next-attack boost; it does not stack. One use is consumed whether your answer is correct or wrong."
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
      "uses": 2,
      "power": 1.9,
      "description": "威力1.9の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "好機をがっちりつかむ。ついでにおやつもつかみたい。",
        "en": "Seize the moment with a firm hit. Wish you could seize a snack as well."
      },
      "descriptionEn": "Attack with power 1.9. One use is consumed whether your answer is correct or wrong."
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
      "uses": 2,
      "shieldHits": 2,
      "shieldFactor": 0.6,
      "wrongShieldFactor": 0.8,
      "power": 1.3,
      "description": "威力1.3の攻撃＋次の敵攻撃2回を正解で60％、不正解で80％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "攻めつつ守りを張る。自分専用の「取扱注意」を掲げる。",
        "en": "Protect yourself while attacking. Put up a sign that says: Handle with care."
      },
      "descriptionEn": "Attack with power 1.3. Reduce damage from the next 2 enemy attack(s) to 60% with a correct answer, or 80% with a wrong answer. One use is consumed whether your answer is correct or wrong."
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
      "description": "威力1.2の攻撃＋正解で、使用回数が最も減っている別の技を最大2回復。同数なら枠順。上限を超えず、回数回復技には使えない。 使用回数は正誤にかかわらず消費。",
      "power": 1.2,
      "restoreUses": 2,
      "flavor": {
        "ja": "別の技にもうひと頑張りしてもらう。延長申請書は葉っぱに書いた。",
        "en": "Extend another skill's time on duty. Write the request on a leaf."
      },
      "descriptionEn": "Attack with power 1.2. A correct answer restores up to 2 use(s) to another skill with the most uses missing. Ties follow slot order. Never exceed its limit or restore a use-restoring skill. One use is consumed whether your answer is correct or wrong."
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
      "uses": 1,
      "power": 2.8,
      "description": "威力2.8の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "雷のような音を放つ。森の天気予報はこれを聞いて書き直された。",
        "en": "Roar like thunder. The forest weather report has to be rewritten."
      },
      "descriptionEn": "Attack with power 2.8. One use is consumed whether your answer is correct or wrong."
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
      "uses": 2,
      "power": 2.3,
      "description": "威力2.3の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "大迫力の声を放送する。番組名は「ただいま戦闘中」。",
        "en": "Broadcast a mighty voice. Today's program is called Battle in Progress."
      },
      "descriptionEn": "Attack with power 2.3. One use is consumed whether your answer is correct or wrong."
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
      "uses": 1,
      "power": 2.8,
      "description": "威力2.8の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "ふっと姿を消すような勢いで攻める。消えたはずのしっぽが目立つ。",
        "en": "Attack as if you could disappear. Your tail ruins the dramatic effect."
      },
      "descriptionEn": "Attack with power 2.8. One use is consumed whether your answer is correct or wrong."
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
      "uses": 1,
      "power": 3,
      "description": "威力3の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "とびきりの空想を一撃に乗せる。頭の中では巨大プリンが勇者。",
        "en": "Turn a grand fancy into a mighty hit. In your mind, a giant pudding is the hero."
      },
      "descriptionEn": "Attack with power 3. One use is consumed whether your answer is correct or wrong."
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
      "uses": 1,
      "power": 2.8,
      "description": "威力2.8の攻撃。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "打ち倒すつもりの大きな一撃。勝利ポーズは事前に練習済み。",
        "en": "Strike hard, hoping to defeat the enemy. You practiced the victory pose first."
      },
      "descriptionEn": "Attack with power 2.8. One use is consumed whether your answer is correct or wrong."
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
      "uses": 1,
      "shieldHits": 2,
      "shieldFactor": 0.5,
      "wrongShieldFactor": 0.75,
      "power": 1.6,
      "description": "威力1.6の攻撃＋次の敵攻撃2回を正解で50％、不正解で75％に軽減。 使用回数は正誤にかかわらず消費。",
      "flavor": {
        "ja": "絶対の守りを目指して攻める。「目指す」が大事、と盾に小さく書いてある。",
        "en": "Attack while aiming for absolute protection. The shield says, in small letters: Aiming is the key word."
      },
      "descriptionEn": "Attack with power 1.6. Reduce damage from the next 2 enemy attack(s) to 50% with a correct answer, or 75% with a wrong answer. One use is consumed whether your answer is correct or wrong."
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
        "ja": "小さなつぼみのお守り。まだ咲かないのは、本人が寝坊しているかららしい。",
        "en": "A tiny bud charm. It has not bloomed yet. Apparently, it overslept."
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
        "ja": "成長を願う小さな鉢。毎朝ほめると、土まで照れる。",
        "en": "A little pot for growth. Praise it every morning. Even the soil blushes."
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
        "ja": "花咲くブローチ。開花祝いを毎日要求してくる。",
        "en": "A bloom brooch. It asks for a blooming party every single day."
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
        "ja": "力を込めた腕輪。瓶のふたを開ける仕事の依頼が絶えない。",
        "en": "A bracelet of force. Requests to open tight jar lids never stop."
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
        "ja": "力強そうなベルト。穴がひとつ増えるたびに自慢してくる。",
        "en": "A powerful-looking belt. It brags every time it gets another hole."
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
        "ja": "鋭い目つきのバッジ。寝ている持ち主にも熱い視線を送る。",
        "en": "A keen-eyed badge. It keeps staring fiercely even while its owner sleeps."
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
        "ja": "貝殻の盾。海を知らないのに波の音のものまねが得意。",
        "en": "A shell shield. It has never seen the sea, but its wave impression is excellent."
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
        "ja": "革のジャケット。鏡の前だけ、持ち主の歩き方が変わる。",
        "en": "A leather jacket. Its owner walks differently whenever a mirror is nearby."
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
        "ja": "銅の留め具。ぴかぴかの日は自分から日なたへ行きたがる。",
        "en": "A copper clasp. On shiny days, it insists on sitting in the sun."
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
        "ja": "羽のお守り。落とすと追いかけるのがいちばん大変。",
        "en": "A feather charm. Dropping it starts a surprisingly long chase."
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
        "ja": "すばしっこそうな靴。玄関で待つのがどうにも苦手。",
        "en": "Rapid little shoes. They are very bad at waiting by the door."
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
        "ja": "動きたがりの足輪。椅子に座ると退屈そうな音がする。",
        "en": "An anklet of motion. It makes bored little noises when you sit down."
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
        "ja": "自信満々のメダル。裏には小さく「練習したからね」と書いてある。",
        "en": "A medal of confidence. On the back, tiny letters say: I practiced for this."
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
        "ja": "待つのが得意な時計。お湯が沸くのを応援するのが趣味。",
        "en": "A clock of patience. Its hobby is cheering for water as it comes to a boil."
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
        "ja": "勇気のスカーフ。結び目だけはちょっと震えている。",
        "en": "A scarf of courage. Only the knot is trembling a little."
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
        "ja": "予備のポケット。予備のポケット用の予備までは入っていない。",
        "en": "A spare pocket. It does not contain a spare for the spare pocket."
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
        "ja": "調和の鈴。お腹の音まで合唱に入れようとする。",
        "en": "A bell of harmony. It tries to invite your stomach rumble into the choir."
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
        "ja": "安定感のある靴底。バナナの皮とは長年のライバル。",
        "en": "Steady soles. Banana peels are their lifelong rivals."
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
        "ja": "ビタミン色のペンダント。食べ物ではないと毎回説明されている。",
        "en": "A vitamin-colored pendant. Someone has to explain, every time, that it is not food."
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
        "ja": "強さを誇るこて。握手だけはやさしくするよう、持ち主に言われている。",
        "en": "A gauntlet of strength. Its owner keeps reminding it to shake hands gently."
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
        "ja": "鋼の胸当て。雨の日は自分のことよりさびを心配する。",
        "en": "A steel chest plate. On rainy days, it worries mostly about rust."
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
        "ja": "飛行機模様の靴。離陸の予定はないが、気分は搭乗済み。",
        "en": "Shoes with a flight pattern. No takeoff is planned, but your mood is already on board."
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
        "ja": "生き残る意志の首飾り。非常食の場所だけは絶対に忘れない。",
        "en": "A necklace with the will to survive. It never forgets where the emergency snacks are."
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
        "ja": "優れた力の王冠。自慢話が長いので、戦闘前にかぶせるのは危険。",
        "en": "A crown of superior strength. Its stories are so long that putting it on before battle is risky."
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
        "ja": "頼れる盾。雨の日には傘の相談まで持ち込まれる。",
        "en": "A reliable shield. On rainy days, people even ask it for umbrella advice."
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
        "ja": "前進するマント。後ろ向きに着ると不満そうになびく。",
        "en": "A cape that loves to advance. Wear it backward and it flaps in protest."
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
  }
};if(typeof module!=="undefined")module.exports=data;else root.GoimonBattleCatalog=data;
})(typeof window!=="undefined"?window:globalThis);
