// goimon_dex.js
// ゴイモン図鑑データ
// 役割：正式名、図鑑説明、図鑑表示用情報

window.GOIMON_DEX = {
  stageLabels: {
    egg: "たまご",
    child: "幼体",
    growth: "成長体",
    mid: "中級体",
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
    description: "ふわふわの毛に触れると、不思議と心が落ち着く。眠っている仲間を見つけると、そっと寄り添って一緒に眠る。",
    image: "images/goimon/nagomi_child.png"
  },
  growth: {
    name: "ラミナス",
    description: "体の中で温かな光を生み出す。暗い道を歩く仲間のそばでは毛がほのかに輝き、足元を優しく照らす。",
    image: "images/goimon/nagomi_growth.png"
  },
  mid: {
    name: "ラムノエル",
    description: "光を集めて仲間を守る力を持つ。頭上の輪が回り始めると、周囲にいる生き物の傷みが少しずつ和らぐという。",
    image: "images/goimon/nagomi_mid.png"
  },
  final: {
    name: "セラフィラムノア",
    description: "巨大な光輪と五つの神聖な器官を持つ守護獣。大きな災いが迫ると姿を現し、その光で多くの命を守ると伝えられる。",
    image: "images/goimon/nagomi_final.png"
  }
},

    hirameki: {
  label: "ひらめき系",
  child: {
    name: "フェネ",
    description: "大きな耳で遠くの物音を聞き分ける。驚くと足元の影が一瞬だけ飛び跳ねるが、本人はまだ気づいていない。",
    image: "images/goimon/hirameki_child.png"
  },
  growth: {
    name: "フェネロ",
    description: "夕暮れになると影の中に身を隠す。姿が見えなくなっても、大きな耳だけは影の外に出ていることがある。",
    image: "images/goimon/hirameki_growth.png"
  },
  mid: {
    name: "フェネグラ",
    description: "自分の影を自在に伸ばし、遠くの物を動かす。月明かりの下では、影だけが先に歩き出すこともあるという。",
    image: "images/goimon/hirameki_mid.png"
  },
  final: {
    name: "フェネノクス",
    description: "巨大な影を従える幻の獣。戦いでは本体がほとんど動かず、影だけが敵を追い詰める。影の本当の姿を見た者は少ない。",
    image: "images/goimon/hirameki_final.png"
  }
},

    tsumugi: {
  label: "つむぎ系",
  child: {
    name: "ミコラ",
    description: "目には見えない気配を感じ取る小さなクラゲ。人が眠っている間に近くを漂い、悪い夢をそっと追い払うという。",
    image: "images/goimon/tsumugi_child.png"
  },
  growth: {
    name: "クラージュ",
    description: "触手の先から小さな呪符を生み出す。いたずら好きな霊を見つけると、札で囲んで動けなくすることがある。",
    image: "images/goimon/tsumugi_growth.png"
  },
  mid: {
    name: "オンミョーゲ",
    description: "触手を動かして結界を張り、式神を操る。夜の森で白い紙の鳥が飛んでいたら、近くにいるしるしだという。",
    image: "images/goimon/tsumugi_mid.png"
  },
  final: {
    name: "セイメイラ",
    description: "巨大な結界を広げる陰陽の霊獣。従える式神は遠く離れた場所にも現れ、結界の内側にあるものを守り続ける。",
    image: "images/goimon/tsumugi_final.png"
  }
},

    yomitoki: {
      label: "よみとき系",
      child: {
        name: "レムパス",
        description: "生まれつき方角を知る不思議な力を持つ。初めて訪れた森でも道に迷わず、古い遺跡の方角をじっと見つめることがある。",
        image: "images/goimon/yomitoki_child.png"
      },
      growth: {
        name: "レムオルド",
        description: "古い石や土の下に眠る遺物を見つけるのが得意。気になるものを見つけると、何日もかけて周囲を調べ続ける。",
        image: "images/goimon/yomitoki_growth.png"
      },
      mid: {
        name: "レムトラス",
        description: "古代の記号を読み解く知恵を持つ。誰にも解読できなかった石板を見つめ、突然うれしそうに鳴き出すことがある。",
        image: "images/goimon/yomitoki_mid.png"
      },
      final: {
        name: "レムインカ",
        description: "古代神殿と一体になった巨大な獣。背中の石組みには失われた文明の記憶が眠り、満月の夜だけ古い文字が浮かび上がるという。",
        image: "images/goimon/yomitoki_final.png"
      }
    },

shirabe: {
  label: "しらべ系",
  child: {
    name: "プラチル",
    description: "くちばしで水中のわずかな振動を感じ取る。見慣れないものを発見すると、確かめるまで何度も周囲を泳ぎ回る。",
    image: "images/goimon/shirabe_child.png"
  },
  growth: {
    name: "プラネモ",
    description: "海の底に隠されたものを探すのが好き。深い場所から持ち帰った不思議な石を、宝物のように大切にする。",
    image: "images/goimon/shirabe_growth.png"
  },
  mid: {
    name: "プラチラス",
    description: "身体に備わった探知器官で暗い海底を進む。光の届かない深さでも、岩の形や遠くの生き物の位置を正確に知る。",
    image: "images/goimon/shirabe_mid.png"
  },
  final: {
    name: "ノーティプス",
    description: "深海を航行する巨大潜水艦獣。その身体には誰も知らない海底の記録が蓄えられており、ときおり謎の信号を発する。",
    image: "images/goimon/shirabe_final.png"
  }
},

    hibiki: {
  label: "ひびき系",
  child: {
    name: "ケロル",
    description: "鳴き声に合わせて小さな火花を散らす。雨の日は特に元気で、夢中で鳴き続けると頭の上に小さな雷雲ができる。",
    image: "images/goimon/hibiki_child.png"
  },
  growth: {
    name: "ゴロッグ",
    description: "背中の発電器官を震わせて雷のような音を出す。機嫌がよいと遠くまで鳴き声を響かせ、雨雲を集めてしまう。",
    image: "images/goimon/hibiki_growth.png"
  },
  mid: {
    name: "ライゲロ",
    description: "雷をまとった強い後脚で、岩山をひと跳びする。着地した場所には稲妻の跡が残り、しばらく地面が熱を帯びる。",
    image: "images/goimon/hibiki_mid.png"
  },
  final: {
    name: "トルゲロス",
    description: "雷雲の奥に住むといわれる轟雷神獣。ひとたび大きく鳴くと空が震え、その声は遠く離れた山々にも響き渡る。",
    image: "images/goimon/hibiki_final.png"
  }
},

   kotonoha: {
  label: "ことのは系",
  child: {
    name: "カメロン",
    description: "周囲の色に合わせて姿を隠すのが得意。光るものを見るとつい手を伸ばし、見つかると慌てて色を変える。",
    image: "images/goimon/kotonoha_child.png"
  },
  growth: {
    name: "トリレオン",
    description: "長い舌としっぽを使い、離れた場所のものを器用に取る。いたずらをしても、姿を消して逃げるためなかなか捕まらない。",
    image: "images/goimon/kotonoha_growth.png"
  },
  mid: {
    name: "シルクレオ",
    description: "身体の色を瞬時に変えて幻影を生み出す。目の前に立っていたはずなのに、気づけば背後にいることも珍しくない。",
    image: "images/goimon/kotonoha_mid.png"
  },
  final: {
    name: "ファントレオ",
    description: "姿も気配も自在に消す伝説の怪盗獣。厳重に守られた宝物さえ音もなく持ち去り、代わりに小さな幻影を残していく。",
    image: "images/goimon/kotonoha_final.png"
  }
},

    mr_uno: {
      label: "MR.UNO系",
      child: {
        name: "魔法見習いUNO",
        description: "特別な条件でのみ現れるレアゴイモン。このアプリの開発者であるとも噂されており、一人前の魔法使いになるために日々修行をしている。",
        image: "images/goimon/mr_uno_child.png"
      },
      growth: {
        name: "デスイーターUNO",
        description: "闇の力に魅了され、闇堕ちしてしまった魔法使い。歯向かうものには禁じられた呪文を簡単に使う短気さが特徴。",
        image: "images/goimon/mr_uno_growth.png"
      },
      mid: {
        name: "フィジカル覚醒UNO",
        description: "力とは魔力ではなく筋力であると悟った魔法使い。「力こそパワー」を座右の銘にし、筋力を求める求道者になった。",
        image: "images/goimon/mr_uno_mid.png"
      },
      final: {
        name: "理の境地MR.UNO",
        description: "全ての理を悟り、山に籠った伝説の元魔法使い。英単語力を十分に身につけた者のみが出会えると言われている。",
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


// 大問別の特別キャラ。goimon_rules.js の確定画像・説明を登録する。
for (const config of Object.values(window.GOIMON_SPECIAL_CONFIG || {})) {
  const stages = {child:"幼体", growth:"成長体", mid:"中級体", final:"上級体"};
  const species = {label:config.label};
  for (const [stage, label] of Object.entries(stages)) {
    species[stage] = {
      name:config.names[stage] || `${config.label}・${label}`,
      description:config.descriptions?.[stage] || "学習の累計達成で解放された特別な系統。",
      image:config.images[stage] || window.GOIMON_DEX.species[config.fallbackSpecies][stage].image
    };
  }
  window.GOIMON_DEX.species[config.route] = species;
  window.GOIMON_DEX.speciesOrder.push(config.route);
}
