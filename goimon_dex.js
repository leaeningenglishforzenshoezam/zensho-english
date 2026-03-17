// goimon_dex.js
// ゴイモン図鑑データ
// 役割：正式名、図鑑説明、図鑑表示用情報

window.GOIMON_DEX = {
  stageLabels: {
    egg: "たまご",
    child: "幼体",
    growth: "成長体",
    mid: "中間体",
    final: "上級体"
  },

  common: {
    egg: {
      name: "ふしぎなたまご",
      description: "すべてのゴイモンの始まりとなる共通のたまご。学習を重ねることで幼体へとかえり、その先で系統が分かれていく。",
      image: "images/goimon/goimon_egg.png",
      typeLabel: "共通"
    }
  },

  speciesOrder: [
    "nagomi",
    "hirameki",
    "tsumugi",
    "yomitoki",
    "shirabe",
    "hibiki",
    "kotonoha",
    "mr_uno"
  ],

  species: {
    nagomi: {
  label: "なごみ系",
  child: {
    name: "ラミア",
    description: "やわらかな光をまとった羊の幼体。そばにいるだけで心が落ち着き、ことばへの不安をやさしく和らげてくれる。",
    image: "images/goimon/nagomi_child.png"
  },
  growth: {
    name: "ラミナス",
    description: "軽やかに駆けながら光をまき散らす成長体。学びの中で揺れる気持ちを整え、前へ進む力をそっと与えてくれる。",
    image: "images/goimon/nagomi_growth.png"
  },
  mid: {
    name: "ラムノエル",
    description: "神聖な輪と力を宿した中間体。乱れた思考や不安を静め、ことばと心を正しい流れへ導く存在。",
    image: "images/goimon/nagomi_mid.png"
  },
  final: {
    name: "セラフィラムノア",
    description: "神獣として覚醒した上級体。周囲の心と言葉の調和を保ち、学びの場そのものを穏やかに安定させる守護者。",
    image: "images/goimon/nagomi_final.png"
  }
},

    hirameki: {
  label: "ひらめき系",
  child: {
    name: "フェネ",
    description: "大きな耳と澄んだ瞳を持つフェネックの幼体。わずかな違和感や新しい語彙に敏感で、小さなひらめきを胸に灯す。",
    image: "images/goimon/hirameki_child.png"
  },
  growth: {
    name: "フェネークト",
    description: "思考の結晶が体に現れ始めた成長体。集めた語彙をもとに、瞬時に意味を組み立てる直感的な判断力を身につける。",
    image: "images/goimon/hirameki_growth.png"
  },
  mid: {
    name: "フェネクスヴィア",
    description: "内側で思考を深く巡らせる中間体。膨大な語彙と情報を静かに整理し、核心に近い答えへとたどり着く洞察力を持つ。",
    image: "images/goimon/hirameki_mid.png"
  },
  final: {
    name: "ディスフェネヴィクトン",
    description: "思考そのものが暴走し進化した存在。あらゆる語彙と概念を瞬時に再構築し、常識を超えた答えを導き出す閃光の知性体。",
    image: "images/goimon/hirameki_final.png"
  }
},

    tsumugi: {
  label: "つむぎ系",
  child: {
    name: "クラージェ",
    description: "透き通る体を持つクラゲの幼体。触れたことばや感情をそのまま体内に取り込み、小さな光として蓄えていく。",
    image: "images/goimon/tsumugi_child.png"
  },
  growth: {
    name: "ジェリアンヌ",
    description: "体内に蓄えた語彙がゆらめき始めた成長体。ことば同士をゆるやかにつなぎ、意味の流れを生み出す力を持つ。",
    image: "images/goimon/tsumugi_growth.png"
  },
  mid: {
    name: "ネクロジェリアルノ",
    description: "無数の言葉を編み上げる中間体。取り込んだ語彙と感情を組み合わせ、新たな表現として外へと紡ぎ出す。",
    image: "images/goimon/tsumugi_mid.png"
  },
  final: {
    name: "バイオネクロクラゲンゲン",
    description: "巨大な言語生命体へと進化した存在。無限に増殖する語彙と感情を編み込み、世界そのものを表現で満たす。",
    image: "images/goimon/tsumugi_final.png"
  }
},

    yomitoki: {
      label: "よみとき系",
      child: {
        name: "レムー",
        description: "大きな瞳と長い尾を持つキツネザルの幼体。光る模様の尾でことばの気配を感じ取り、文の中にひそむ小さな違和感を見つけるのが得意。",
        image: "images/goimon/yomitoki_child.png"
      },
      growth: {
        name: "レムールノ",
        description: "帽子と地図道具を身につけた探検家になったキツネザル。語彙の手がかりを集めながら文脈の森を進み、意味のつながりを少しずつ読み解いていく。",
        image: "images/goimon/yomitoki_growth.png"
      },
      mid: {
        name: "レムールギアス",
        description: "蒸気仕掛けの装備で空を駆けるキツネザル。複数のレンズで情報を見極め、学んだ語彙と文脈を高速で照合して答えへの道筋を切り開く。",
        image: "images/goimon/yomitoki_mid.png"
      },
      final: {
        name: "クロノレムールヴァイス",
        description: "超高機動の解析装備をまとった上級体。無数の視点から文脈を同時に読み、膨大な語彙を瞬時に統合して真の意味へ到達する、天空の解読王。",
        image: "images/goimon/yomitoki_final.png"
      }
    },

shirabe: {
  label: "しらべ系",
  child: {
    name: "プラティ",
    description: "水や空気の揺らぎに敏感なカモノハシの幼体。音やアクセントの違いを直感的に感じ取り、小さな変化を見逃さない。",
    image: "images/goimon/shirabe_child.png"
  },
  growth: {
    name: "プラティ・クゥ",
    description: "音の流れを扱い始めた成長体。拾い上げた振動や発音の違いを組み合わせ、語の特徴をより正確にとらえる。",
    image: "images/goimon/shirabe_growth.png"
  },
  mid: {
    name: "プラティ・ボルグ",
    description: "重厚な機構を備えた中間体。音や信号を分解・分析し、隠れたパターンや規則を見抜く探査能力を持つ。",
    image: "images/goimon/shirabe_mid.png"
  },
  final: {
    name: "ギガ・プラティ・ボルグヌス",
    description: "巨大な解析装置と一体化した上級体。あらゆる音と情報を同時に処理し、未知の語彙や構造を発見・制御する探査王。",
    image: "images/goimon/shirabe_final.png"
  }
},

    hibiki: {
  label: "ひびき系",
  child: {
    name: "フローア",
    description: "水のゆらぎや音の波に心を弾ませるカエルの幼体。ことばの響きに敏感で、小さな音の違いにも楽しそうに反応する。",
    image: "images/goimon/hibiki_child.png"
  },
  growth: {
    name: "フロリアーラ",
    description: "太陽の光と自然の力に共鳴し始めた成長体。音と意味をやさしく結びつけ、学んだことばを明るいエネルギーへ変えていく。",
    image: "images/goimon/hibiki_growth.png"
  },
  mid: {
    name: "ソーラーフログリア",
    description: "光・水・響きを一つに束ねる中間体。取り込んだ知識と音の流れを増幅し、周囲へ力強く放つことで場そのものを活性化させる。",
    image: "images/goimon/hibiki_mid.png"
  },
  final: {
    name: "キングソーラーフログリア",
    description: "共鳴する都市の中心に君臨する上級体。太陽の力、音の波、学びの知恵を循環させ、世界を明るい調和で満たす発光王。",
    image: "images/goimon/hibiki_final.png"
  }
},

   kotonoha: {
  label: "ことのは系",
  child: {
    name: "オルカン",
    description: "きらめく水と星をまとったシャチの幼体。ことばを発することを楽しみ、小さな表現が周囲にやさしい変化を生み出す。",
    image: "images/goimon/kotonoha_child.png"
  },
  growth: {
    name: "オルカシア",
    description: "意思を持ったことばを扱い始めた成長体。語りかける力が強まり、ことばによって状況を動かし始める。",
    image: "images/goimon/kotonoha_growth.png"
  },
  mid: {
    name: "オルカシッサ",
    description: "星々の軌道をまといし中間体。発したことばが現実に影響を与え、空間や流れそのものを変化させる力を持つ。",
    image: "images/goimon/kotonoha_mid.png"
  },
  final: {
    name: "アストラオルカシオン",
    description: "宇宙を統べることばの王。語るだけで世界の構造を書き換え、物語そのものを創り出す絶対的存在。",
    image: "images/goimon/kotonoha_final.png"
  }
},

    mr_uno: {
      label: "MR.UNO系",
      child: {
        name: "魔導UNO",
        description: "特別な条件でのみ現れるレア幼体。まるメガネの奥で、じっと相手を観察している。",
        image: "images/goimon/mr_uno_child.png"
      },
      growth: {
        name: "デスイーターUNO",
        description: "教師らしさと冒険心が育った成長体。知識と行動力のバランスが取れている。",
        image: "images/goimon/mr_uno_growth.png"
      },
      mid: {
        name: "フィジカル覚醒UNO",
        description: "学びと魔法の両方を操る中間体。仲間に知恵を授ける特別な存在。",
        image: "images/goimon/mr_uno_mid.png"
      },
      final: {
        name: "理の境地MR.UNO",
        description: "知識、ことば、音、文脈のすべてを高次元で扱う伝説級の上級体。",
        image: "images/goimon/mr_uno_final.png"
      }
    }
  }
};

window.GoimonDex = {
  getStageLabel(stageKey) {
    return window.GOIMON_DEX?.stageLabels?.[stageKey] || stageKey;
  },
  getSpeciesOrder() {
    return window.GOIMON_DEX?.speciesOrder || [];
  },
  getSpecies(speciesKey) {
    return window.GOIMON_DEX?.species?.[speciesKey] || null;
  },
  getEntry(speciesKey, stageKey) {
    if (stageKey === "egg") return window.GOIMON_DEX?.common?.egg || null;
    return window.GOIMON_DEX?.species?.[speciesKey]?.[stageKey] || null;
  }
};
