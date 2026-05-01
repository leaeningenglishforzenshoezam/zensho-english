// accent_rules.js
// アクセント原則学習用データ
// 例語・例外は、できるだけ accent_1kyu.js / accent_2kyu.js の語彙に合わせて整理

window.ACCENT_RULES = [
  {
    id: "noun_first_verb_later",
    title: "名前動後",
    description: "名詞は前、動詞は後にアクセントが来ることが多い。同じ単語でも名詞と動詞の２通りの意味がある単語は、使われる品詞によってアクセントの位置が変わる。",
    examples: [
      { label: "名詞", en: "contrast", ja: "対照", sylRaw: "ˈcon-trast" },
      { label: "動詞", en: "contrast", ja: "対比する", sylRaw: "con-ˈtrast" },
      { label: "名詞", en: "project", ja: "計画", sylRaw: "ˈproj-ect" },
      { label: "動詞", en: "project", ja: "投影する", sylRaw: "pro-ˈject" },
      { label: "名詞", en: "import", ja: "輸入", sylRaw: "ˈim-port" },
      { label: "動詞", en: "import", ja: "輸入する", sylRaw: "im-ˈport" }
    ],
    exceptions: [
      { en: "purchase", ja: "購入する", sylRaw: "ˈpur-chase" },
      { en: "control", ja: "管理する／管理", sylRaw: "con-ˈtrol" },
      { en: "approach", ja: "近づく／取り組み", sylRaw: "ap-ˈproach" }
    ],
    quizItems: [
      {
        id: "noun_first_verb_later_q1",
        stem: "同じ単語が名詞と動詞の２通りで使われるとき、アクセントは名詞では「　」、動詞では「　」に来ることが多い。",
        choices: ["前・後", "後・前", "前・前", "後・後"],
        answer: "前・後",
        explanation: "「名前動後」は、名詞は前、動詞は後と覚える原則です。"
      }
    ]
  },

  {
    id: "compound_nouns",
    title: "二語の合成名詞は、前の語にアクセントが来ることが多い",
    description: "二語を合わせて一語になった合成名詞では、前の語にアクセントが来ることが多い。",
    examples: [
      { en: "background", ja: "背景", sylRaw: "ˈback-ground" },
      { en: "eyesight", ja: "視力", sylRaw: "ˈeye-sight" },
      { en: "moonlight", ja: "月光", sylRaw: "ˈmoon-light" },
      { en: "sunrise", ja: "日の出", sylRaw: "ˈsun-rise" },
      { en: "chairman", ja: "議長", sylRaw: "ˈchair-man" },
      { en: "fireplace", ja: "暖炉", sylRaw: "ˈfire-place" }
    ],
    exceptions: [],
    quizItems: [
      {
        id: "compound_nouns_q1",
        stem: "二語の合成名詞のアクセントは、ふつう「　」に来ることが多い。",
        choices: ["前の語", "後ろの語", "真ん中", "どこでもよい"],
        answer: "前の語",
        explanation: "合成名詞では、前の語にアクセントが来ることが多いです。"
      }
    ]
  },

 

  {
    id: "ial_ual",
    title: "-ial / -ual は直前",
    description: "-ial, -ual が語尾にある語では、アクセントはその語尾の直前に来ることが多い。",
    examples: [
      { en: "artificial", ja: "人工の", sylRaw: "ar-ti-ˈfi-cial" },
      { en: "essential", ja: "必不可欠な", sylRaw: "es-ˈsen-tial" },
      { en: "initial", ja: "初期の", sylRaw: "i-ˈni-tial" },
      { en: "actual", ja: "実際の", sylRaw: "ˈac-tu-al" },
      { en: "mutual", ja: "相互の", sylRaw: "ˈmu-tu-al" },
      { en: "casual", ja: "くだけた", sylRaw: "ˈcas-u-al" },
      { en: "gradual", ja: "徐々の", sylRaw: "ˈgrad-u-al" },
      { en: "individual", ja: "個人", sylRaw: "in-di-ˈvid-u-al" },
      { en: "unusual", ja: "普通でない", sylRaw: "un-ˈu-su-al" }
    ],
    exceptions: [],
    quizItems: [
      {
        id: "ial_ual_q_ial",
        stem: "-ial が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "直前",
        explanation: "-ial の前の音節にアクセントが来ることが多いです。"
      },
      {
        id: "ial_ual_q_ual",
        stem: "-ual が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "直前",
        explanation: "-ual の前の音節にアクセントが来ることが多いです。"
      }
    ]
  },

  {
    id: "ic_ics_ical_ity_ety",
    title: "-ic / -ics / -ical / -ity / -ety は直前",
    description: "-ic, -ics, -ical, -ity, -ety が語尾にある語では、アクセントはその語尾の直前に来ることが多い。",
    examples: [
      { en: "atomic", ja: "原子の", sylRaw: "a-ˈtom-ic" },
      { en: "economic", ja: "経済の", sylRaw: "e-co-ˈno-mic" },
      { en: "historical", ja: "歴史的な", sylRaw: "his-ˈtor-i-cal" },
      { en: "political", ja: "政治の", sylRaw: "po-ˈlit-i-cal" },
      { en: "activity", ja: "活動", sylRaw: "ac-ˈtiv-i-ty" },
      { en: "majority", ja: "大多数", sylRaw: "ma-ˈjor-i-ty" },
      { en: "society", ja: "社会", sylRaw: "so-ˈci-e-ty" },
      { en: "variety", ja: "多様性", sylRaw: "va-ˈri-ety" },
      { en: "possibility", ja: "可能性", sylRaw: "pos-si-ˈbil-i-ty" },
      { en: "responsibility", ja: "責任", sylRaw: "re-spon-si-ˈbil-i-ty" }
    ],
    exceptions: [
      { en: "politics", ja: "政治", sylRaw: "ˈpol-i-tics" },
      { en: "technical", ja: "技術的な", sylRaw: "ˈtech-ni-cal" },
      { en: "quality", ja: "質", sylRaw: "ˈqual-i-ty" },
      { en: "quantity", ja: "量", sylRaw: "ˈquan-ti-ty" }
    ],
    quizItems: [
      {
        id: "ic_group_q_ic",
        stem: "-ic が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "直前",
        explanation: "-ic の前の音節にアクセントが来ることが多いです。"
      },
      {
        id: "ic_group_q_ics",
        stem: "-ics が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "直前",
        explanation: "-ics の前の音節にアクセントが来ることが多いですが、例外もあります。"
      },
      {
        id: "ic_group_q_ical",
        stem: "-ical が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "直前",
        explanation: "-ical の前の音節にアクセントが来ることが多いです。"
      },
      {
        id: "ic_group_q_ity",
        stem: "-ity が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "直前",
        explanation: "-ity の前の音節にアクセントが来ることが多いです。"
      },
      {
        id: "ic_group_q_ety",
        stem: "-ety が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "直前",
        explanation: "-ety の前の音節にアクセントが来ることが多いです。"
      }
    ]
  },

  {
    id: "cian_tion_sion",
    title: "-cian / -tion / -sion は直前",
    description: "-cian, -tion, -sion が語尾にある語では、アクセントはその語尾の直前に来ることが多い。",
    examples: [
      { en: "application", ja: "応募、申請", sylRaw: "ap-pli-ˈca-tion" },
      { en: "decision", ja: "決定", sylRaw: "de-ˈci-sion" },
      { en: "discussion", ja: "議論", sylRaw: "dis-ˈcus-sion" },
      { en: "direction", ja: "方向", sylRaw: "di-ˈrec-tion" },
      { en: "solution", ja: "解決策", sylRaw: "so-ˈlu-tion" },
      { en: "tradition", ja: "伝統", sylRaw: "tra-ˈdi-tion" },
      { en: "politician", ja: "政治家", sylRaw: "pol-i-ˈti-cian" }
    ],
    exceptions: [
      { en: "action", ja: "行動", sylRaw: "ˈac-tion" },
      { en: "section", ja: "部分", sylRaw: "ˈsec-tion" },
      { en: "mention", ja: "言及する", sylRaw: "ˈmen-tion" },
      { en: "motion", ja: "動き", sylRaw: "ˈmo-tion" }
    ],
    quizItems: [
      {
        id: "cian_tion_sion_q_cian",
        stem: "-cian が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "直前",
        explanation: "-cian の前の音節にアクセントが来ることが多いです。"
      },
      {
        id: "cian_tion_sion_q_tion",
        stem: "-tion が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "直前",
        explanation: "-tion の前の音節にアクセントが来ることが多いです。"
      },
      {
        id: "cian_tion_sion_q_sion",
        stem: "-sion が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "直前",
        explanation: "-sion の前の音節にアクセントが来ることが多いです。"
      }
    ]
  },

  {
    id: "ate_ous",
    title: "-ate / -ous は二つ前",
    description: "-ate, -ous が語尾にある語では、アクセントはその語尾の二つ前に来ることが多い。",
    examples: [
      { en: "celebrate", ja: "祝う", sylRaw: "ˈcel-e-brate" },
      { en: "concentrate", ja: "集中する", sylRaw: "ˈcon-cen-trate" },
      { en: "delicate", ja: "繊細な", sylRaw: "ˈdel-i-cate" },
      { en: "generous", ja: "寛大な", sylRaw: "ˈgen-er-ous" },
      { en: "mysterious", ja: "不思議な", sylRaw: "mys-ˈte-ri-ous" },
      { en: "nervous", ja: "緊張した", sylRaw: "ˈner-vous" },
      { en: "curious", ja: "好奇心が強い", sylRaw: "ˈcur-i-ous" },
      { en: "fortunate", ja: "幸運な", sylRaw: "ˈfor-tu-nate" }
    ],
    exceptions: [
      { en: "create", ja: "作り出す", sylRaw: "cre-ˈate" },
      { en: "translate", ja: "翻訳する", sylRaw: "trans-ˈlate" }
    ],
    quizItems: [
      {
        id: "ate_ous_q_ate",
        stem: "-ate が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "二つ前",
        explanation: "-ate では二つ前にアクセントが来ることが多いですが、例外もあります。"
      },
      {
        id: "ate_ous_q_ous",
        stem: "-ous が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "二つ前",
        explanation: "-ous では二つ前にアクセントが来ることが多いです。"
      }
    ]
  },

  {
    id: "final_stress_suffixes",
    title: "語尾にアクセントが来やすい語尾（-ee / -eer / -ese / -ique / -oon）",
    description: "-ee, -eer, -ese, -ique, -oon では、語尾にアクセントが来ることが多い。",
    examples: [
      { en: "employee", ja: "従業員", sylRaw: "em-ploy-ˈee" },
      { en: "career", ja: "職業", sylRaw: "ca-ˈreer" },
      { en: "technique", ja: "技術", sylRaw: "tech-ˈnique" }
    ],
    exceptions: [
      { en: "committee", ja: "委員会", sylRaw: "com-ˈmit-tee" }
    ],
    quizItems: [
      {
        id: "final_stress_q_ee",
        stem: "-ee が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["語尾", "直前", "二つ前", "先頭"],
        answer: "語尾",
        explanation: "-ee では語尾にアクセントが来ることが多いです。"
      },
      {
        id: "final_stress_q_eer",
        stem: "-eer が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["語尾", "直前", "二つ前", "先頭"],
        answer: "語尾",
        explanation: "-eer では語尾にアクセントが来ることが多いです。"
      },
      {
        id: "final_stress_q_ese",
        stem: "-ese が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["語尾", "直前", "二つ前", "先頭"],
        answer: "語尾",
        explanation: "-ese では語尾にアクセントが来ることが多いです。"
      },
      {
        id: "final_stress_q_ique",
        stem: "-ique が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["語尾", "直前", "二つ前", "先頭"],
        answer: "語尾",
        explanation: "-ique では語尾にアクセントが来ることが多いです。"
      },
      {
        id: "final_stress_q_oon",
        stem: "-oon が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["語尾", "直前", "二つ前", "先頭"],
        answer: "語尾",
        explanation: "-oon では語尾にアクセントが来ることが多いです。"
      }
    ]
  },

  {
    id: "cy_gy_phy",
    title: "-cy / -gy / -phy は二つ前",
    description: "-cy, -gy, -phy が語尾にある語では、アクセントはその語尾の二つ前に来ることが多い。",
    examples: [
      { en: "democracy", ja: "民主主義", sylRaw: "de-ˈmoc-ra-cy" },
      { en: "geography", ja: "地理", sylRaw: "ge-ˈog-ra-phy" },
      { en: "philosophy", ja: "哲学", sylRaw: "phi-ˈlos-o-phy" },
      { en: "technology", ja: "技術", sylRaw: "tech-ˈnol-o-gy" },
      { en: "sympathy", ja: "同情", sylRaw: "ˈsym-pa-thy" },
      { en: "policy", ja: "政策", sylRaw: "ˈpol-i-cy" }
    ],
    exceptions: [],
    quizItems: [
      {
        id: "cy_gy_phy_q_cy",
        stem: "-cy が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "二つ前",
        explanation: "-cy では二つ前にアクセントが来ることが多いです。"
      },
      {
        id: "cy_gy_phy_q_gy",
        stem: "-gy が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "二つ前",
        explanation: "-gy では二つ前にアクセントが来ることが多いです。"
      },
      {
        id: "cy_gy_phy_q_phy",
        stem: "-phy が語尾にある単語のアクセントは、その語尾の「　」に来ることが多い。",
        choices: ["直前", "二つ前", "語尾そのもの", "先頭"],
        answer: "二つ前",
        explanation: "-phy では二つ前にアクセントが来ることが多いです。"
      }
    ]
  }
];
