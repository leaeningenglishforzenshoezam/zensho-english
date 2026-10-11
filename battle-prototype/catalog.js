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
      "power": 1.2,
      "description": "威力1.2の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.1,
      "description": "威力1.1の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "healFraction": 0.15,
      "description": "最大HPの15％回復。不正解は半分。 使用回数は正誤にかかわらず消費。"
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
      "nextPower": 1.25,
      "power": 0.6,
      "description": "威力0.6の攻撃。正解で次の攻撃を1.25倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。"
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
      "weakFactor": 0.8,
      "power": 0.7,
      "description": "威力0.7の攻撃。正解で次の敵の攻撃を80％にする。 使用回数は正誤にかかわらず消費。"
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
      "description": "正解で、使用回数が最も減っている別の技を1回回復。同数なら枠順。回数回復技には使えない。 使用回数は正誤にかかわらず消費。"
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
      "healFraction": 0.1,
      "description": "最大HPの10％回復。不正解は半分。 使用回数は正誤にかかわらず消費。"
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
      "nextPower": 1.2,
      "power": 0.5,
      "description": "威力0.5の攻撃。正解で次の攻撃を1.2倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.05,
      "description": "威力1.05の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "nextPower": 1.15,
      "power": 0.8,
      "description": "威力0.8の攻撃。正解で次の攻撃を1.15倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。"
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
      "healFraction": 0.1,
      "description": "最大HPの10％回復。不正解は半分。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.05,
      "description": "威力1.05の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.2,
      "description": "威力1.2の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.1,
      "description": "威力1.1の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.25,
      "description": "威力1.25の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "nextPower": 1.25,
      "power": 0.6,
      "description": "威力0.6の攻撃。正解で次の攻撃を1.25倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。"
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
      "weakFactor": 0.8,
      "power": 0.7,
      "description": "威力0.7の攻撃。正解で次の敵の攻撃を80％にする。 使用回数は正誤にかかわらず消費。"
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
      "shieldFactor": 0.8,
      "wrongShieldFactor": 0.9,
      "power": 0.7,
      "description": "威力0.7の攻撃＋次の敵攻撃1回を正解で80％、不正解で90％に軽減。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.15,
      "description": "威力1.15の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "nextPower": 1.2,
      "power": 0.5,
      "description": "威力0.5の攻撃。正解で次の攻撃を1.2倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。"
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
      "shieldFactor": 0.85,
      "wrongShieldFactor": 0.95,
      "power": 0.6,
      "description": "威力0.6の攻撃＋次の敵攻撃1回を正解で85％、不正解で95％に軽減。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.15,
      "description": "威力1.15の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "nextPower": 1.15,
      "power": 0.8,
      "description": "威力0.8の攻撃。正解で次の攻撃を1.15倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。"
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
      "nextPower": 1.35,
      "power": 0.4,
      "description": "威力0.4の攻撃。正解で次の攻撃を1.35倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.2,
      "description": "威力1.2の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.1,
      "description": "威力1.1の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.25,
      "description": "威力1.25の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "shieldFactor": 0.8,
      "wrongShieldFactor": 0.9,
      "power": 0.7,
      "description": "威力0.7の攻撃＋次の敵攻撃1回を正解で80％、不正解で90％に軽減。 使用回数は正誤にかかわらず消費。"
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
      "weakFactor": 0.8,
      "power": 0.7,
      "description": "威力0.7の攻撃。正解で次の敵の攻撃を80％にする。 使用回数は正誤にかかわらず消費。"
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
      "healFraction": 0.15,
      "description": "最大HPの15％回復。不正解は半分。 使用回数は正誤にかかわらず消費。"
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
      "weakFactor": 0.85,
      "power": 0.8,
      "description": "威力0.8の攻撃。正解で次の敵の攻撃を85％にする。 使用回数は正誤にかかわらず消費。"
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
      "weakFactor": 0.85,
      "power": 0.5,
      "description": "威力0.5の攻撃。正解で次の敵の攻撃を85％にする。 使用回数は正誤にかかわらず消費。"
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
      "shieldFactor": 0.85,
      "wrongShieldFactor": 0.95,
      "power": 0.6,
      "description": "威力0.6の攻撃＋次の敵攻撃1回を正解で85％、不正解で95％に軽減。 使用回数は正誤にかかわらず消費。"
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
      "weakFactor": 0.85,
      "power": 0.6,
      "description": "威力0.6の攻撃。正解で次の敵の攻撃を85％にする。 使用回数は正誤にかかわらず消費。"
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
      "shieldFactor": 0.85,
      "wrongShieldFactor": 0.95,
      "power": 0.85,
      "description": "威力0.85の攻撃＋次の敵攻撃1回を正解で85％、不正解で95％に軽減。 使用回数は正誤にかかわらず消費。"
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
      "nextPower": 1.15,
      "power": 0.8,
      "description": "威力0.8の攻撃。正解で次の攻撃を1.15倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.4,
      "description": "威力1.4の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "healFraction": 0.25,
      "description": "最大HPの25％回復。不正解は半分。 使用回数は正誤にかかわらず消費。"
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
      "nextPower": 1.4,
      "power": 0.8,
      "description": "威力0.8の攻撃。正解で次の攻撃を1.4倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.4,
      "description": "威力1.4の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "weakFactor": 0.65,
      "power": 0.85,
      "description": "威力0.85の攻撃。正解で次の敵の攻撃を65％にする。 使用回数は正誤にかかわらず消費。"
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
      "nextPower": 1.4,
      "power": 0.8,
      "description": "威力0.8の攻撃。正解で次の攻撃を1.4倍（重複せず置き換え）。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.4,
      "description": "威力1.4の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "shieldFactor": 0.7,
      "wrongShieldFactor": 0.85,
      "power": 0.8,
      "description": "威力0.8の攻撃＋次の敵攻撃2回を正解で70％、不正解で85％に軽減。 使用回数は正誤にかかわらず消費。"
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
      "description": "正解で、使用回数が最も減っている別の技を1回回復。同数なら枠順。回数回復技には使えない。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.6,
      "description": "威力1.6の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.5,
      "description": "威力1.5の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.6,
      "description": "威力1.6の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.7,
      "description": "威力1.7の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "power": 1.6,
      "description": "威力1.6の攻撃。 使用回数は正誤にかかわらず消費。"
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
      "shieldFactor": 0.65,
      "wrongShieldFactor": 0.8,
      "power": 1.1,
      "description": "威力1.1の攻撃＋次の敵攻撃2回を正解で65％、不正解で80％に軽減。 使用回数は正誤にかかわらず消費。"
    }
  ],
  "gear": [
    {
      "id": "none",
      "name": "装備なし",
      "bonus": 0,
      "description": "能力補正なし"
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
      "description": "たいりょく＋8％"
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
      "description": "たいりょく＋5％・ぼうぎょ＋3％"
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
      "description": "たいりょく＋5％・すばやさ＋3％"
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
      "description": "こうげき＋8％"
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
      "description": "こうげき＋5％・たいりょく＋3％"
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
      "description": "こうげき＋5％・すばやさ＋3％"
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
      "description": "ぼうぎょ＋8％"
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
      "description": "ぼうぎょ＋5％・すばやさ＋3％"
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
      "description": "ぼうぎょ＋5％・たいりょく＋3％"
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
      "description": "すばやさ＋8％"
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
      "description": "すばやさ＋5％・こうげき＋3％"
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
      "description": "すばやさ＋5％・ぼうぎょ＋3％"
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
      "description": "攻撃を伴う行動に2回連続正解すると、次の攻撃が1.15倍。強化を使うと連続数をリセット。不正解でもリセット。"
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
      "description": "相手より素早さが低いと、敵の攻撃から受けるダメージを10％軽減。"
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
      "description": "HPが最大HPの半分以下のとき、攻撃のダメージを12％強化。"
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
      "description": "攻撃・回復・防護などの技を最初に使い切ったとき、1回だけ使用回数を1回復。回数回復技には発動しない。"
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
      "description": "防御問題に正解して生き残ると、最大HPの3％を回復。"
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
      "description": "戦闘中、最初の防御不正解だけ、被ダメージ増加を120％から100％に抑える。"
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
      "description": "たいりょく＋12％"
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
      "description": "こうげき＋12％"
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
      "description": "ぼうぎょ＋12％"
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
      "description": "すばやさ＋12％"
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
      "description": "たいりょく＋16％"
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
      "description": "こうげき＋16％"
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
      "description": "ぼうぎょ＋16％"
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
      "description": "すばやさ＋16％"
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
};if(typeof module!=="undefined")module.exports=data;else root.GoimonBattleCatalog=data;})(typeof window!=="undefined"?window:globalThis);
