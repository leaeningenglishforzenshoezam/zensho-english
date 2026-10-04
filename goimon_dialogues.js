// goimon_dialogues.js
// ゴイモン v2.0 学習コーチング
// ------------------------------------------------------------
// ・キャラクター別の抽象的セリフを廃止
// ・学習状態に応じた具体的アドバイスを表示
// ・学習科学 / SLA / 検索練習 / 分散学習 / 弱点集中を反映
// ・英語の豆知識60個
// ・既存 getLine / getReaction 等との互換性を維持
// ------------------------------------------------------------

window.GoimonDialogues = (function () {
  "use strict";

  const HISTORY_KEY = "goimon_dialogue_history_v2";

  // ============================================================
  // 系統情報
  // セリフ内容は共通化するが、既存UIとの互換のため残す
  // ============================================================

  const TYPE_DATA = {
    nagomi: {
      label: "なごみ系",
      personality: "やさしく穏やか。",
      tone: "ゆったり、やわらかい"
    },

    hirameki: {
      label: "ひらめき系",
      personality: "発想が自由で明るい。",
      tone: "テンポがよく元気"
    },

    tsumugi: {
      label: "つむぎ系",
      personality: "感情豊かで繊細。",
      tone: "詩的でやわらかい"
    },

    yomitoki: {
      label: "よみとき系",
      personality: "冷静で観察力が高い。",
      tone: "落ち着いた分析口調"
    },

    shirabe: {
      label: "しらべ系",
      personality: "探究心が強い。",
      tone: "探索者っぽい"
    },

    hibiki: {
      label: "ひびき系",
      personality: "音やリズムに敏感。",
      tone: "勢いがありノリがよい"
    },

    kotonoha: {
      label: "ことのは系",
      personality: "言葉を操るのが得意。",
      tone: "上品で表現豊か"
    },

    mr_uno: {
      label: "MR.UNO系",
      personality: "知識が豊富で教師らしい。",
      tone: "少し知的で親しみやすい"
    }
  };

  // ============================================================
  // 判定基準
  // ============================================================

  const THRESHOLDS = {
    // 正答率
    LOW_ACCURACY: 70,
    HIGH_ACCURACY: 90,

    // 通常カテゴリで正答率を判定する最低問題数
    MIN_ACCURACY_ATTEMPTS: 15,

    // 英→日 / 日→英比較
    BALANCE_MIN_ATTEMPTS: 15,
    ENJA_STABLE: 85,
    JAEN_WEAK: 70,
    BOTH_ENJA_STABLE: 90,
    BOTH_JAEN_STABLE: 85,

    // 7日間の学習量
    LOW_WEEKLY_ATTEMPTS: 50,

    // 偏り
    CATEGORY_BIAS_MIN_ATTEMPTS: 50,
    CATEGORY_BIAS_RATIO: 0.65,
    GROUP_BIAS_RATIO: 0.70,

    // 学習間隔
    SOUND_GAP_DAYS: 3,
    CONTEXT_GAP_DAYS: 5,

    // 継続
    GOOD_STUDY_DAYS: 4,
    HIGH_STUDY_DAYS: 6,

    // 豆知識
    TRIVIA_RATE: 0.20,

    // 履歴
    RECENT_ADVICE_LIMIT: 5,
    RECENT_TRIVIA_LIMIT: 5,
    RECENT_CONDITION_LIMIT: 3
  };

  // ============================================================
  // 推奨学習量
  // ============================================================

  const SESSION_SIZE = {
    study: 25,
    quiz_enja: 25,
    quiz_jaen: 20,
    audio_quiz: 20,
    idiom_quiz: 20,
    listening: 5,
    accent: 15,
    dialogue8: 3,
    sentence: 15,
    q10: 3,
    paraphrase_quiz: 20,
    reorder: 15
  };

  // ============================================================
  // ①〜⑧ 学習アドバイス
  // ============================================================

  const ADVICE_DATA = {
    // ----------------------------------------------------------
    // ① 今日まだ学習していない
    // ----------------------------------------------------------

    start: {
      id: "A01",
      label: "学習開始",

      variants: {
        default: [
          {
            id: "A01_01",
            text:
              "今日はまず20〜25問やって、「すぐ分かる」「迷う」「分からない」に仕分けてみよう。全部を同じ回数やる必要はないよ。分からなかったものが見つかったら、そこが今日いちばん勉強する価値のあるところ！",
            action: {
              category: "quiz_enja",
              label: "英→日で仕分ける"
            }
          },

          {
            id: "A01_02",
            text:
              "今日もまず、答えを見る前に思い出す時間を作ろう。暗記で大切なのは、何回見たかより「何だったっけ？」と記憶から取り出そうとする経験を重ねること。まず20問くらいから始めてみよう。",
            action: {
              category: "quiz_enja",
              label: "英→日を始める"
            }
          },

          {
            id: "A01_05",
            text:
              "何からやるか迷ったら、まず問題を解いて仕分けよう。分からないものは【ニガテ順】で繰り返す。分かるものは日→英や音声に形式を変えてもう一度確認。この流れなら、できる問題に時間を使いすぎないよ。",
            action: {
              category: "quiz_enja",
              label: "まず仕分ける"
            }
          }
        ],

        weak: [
          {
            id: "A01_03",
            text:
              "前に間違えた問題が残っているなら、今日は【ニガテ順】から始めてみよう。もう答えられる問題より、まだ取り出せない問題に「何だったっけ？」と考える時間を使う方が、弱点を効率よく減らせるよ。",
            action: {
              category: null,
              mode: "weak",
              label: "ニガテ順でやる"
            }
          }
        ],

        recall: [
          {
            id: "A01_04",
            text:
              "4択でできる単語が増えてきたら、今日は単語一覧でも試してみよう。意味や英語を隠して、選択肢なしでも答えられるかな？ そこで出てこなかった単語が、本当に復習するべき単語だよ。",
            action: {
              category: "study",
              practice: "hide_answer",
              label: "単語一覧で確認する"
            }
          }
        ]
      }
    },

    // ----------------------------------------------------------
    // ② 最近の学習量が少ない
    // ----------------------------------------------------------

    low_volume: {
      id: "A02",
      label: "学習量",

      variants: {
        default: [
          {
            id: "A02_01",
            text:
              "最近の学習量が少し少なめだね。まず20〜25問くらいやって、自分が「何を覚えていて、何がまだ弱いか」を確認しよう。弱点が分からなければ、どこに時間を使えばいいかも決められないからね。",
            action: {
              category: "quiz_enja",
              label: "25問仕分ける"
            }
          },

          {
            id: "A02_02",
            text:
              "まずまとまった数を解いて、できる問題とできない問題を分けよう。全部を何度も繰り返す必要はないよ。まだ答えを取り出せない問題に練習回数を集中させた方が、同じ時間でも弱点を多く減らせるよ。",
            action: {
              category: "quiz_enja",
              label: "仕分けを始める"
            }
          },

          {
            id: "A02_03",
            text:
              "一通り問題を解いたら、2周目は【ニガテ順】がおすすめ。1周目は弱点を見つけるため、2周目からは弱点を減らすため。まだ思い出せない問題を優先して、「何だったっけ？」と考える回数を増やそう。",
            action: {
              category: null,
              mode: "weak",
              label: "ニガテ順で復習する"
            }
          },

          {
            id: "A02_04",
            text:
              "最近単語に触れる量が少なめなら、今日はまず25問くらい仕分けよう。すぐ分かる単語は次の形式へ、迷った単語は【ニガテ順】へ。最初に仕分けると、その後の勉強をかなり効率よくできるよ。",
            action: {
              category: "quiz_enja",
              label: "25問仕分ける"
            }
          }
        ],

        long_text: [
          {
            id: "A02_05",
            text:
              "大問8・10は長文だから、数を増やす必要はないよ。3問をじっくり解いて、間違えた理由や however、therefore など文の方向を示す語まで確認しよう。長文は「何問やったか」より「何をつかんだか」が大切だよ。",
            action: {
              category: "q10",
              label: "大問10を3問やる"
            }
          }
        ]
      }
    },

    // ----------------------------------------------------------
    // ③ 同じカテゴリに偏っている
    // ----------------------------------------------------------

    category_bias: {
      id: "A03",
      label: "学習形式の偏り",

      variants: {
        enja: [
          {
            id: "A03_01",
            text:
              "最近は英→日が多いね。英語を見て意味が分かる単語は、次は日→英で仕分けてみよう。そこで英語が出てこなかったら、「意味は知っているけど自分から取り出せない」単語だと分かるよ。",
            action: {
              category: "quiz_jaen",
              label: "日→英で再仕分けする"
            }
          }
        ],

        text_based: [
          {
            id: "A03_02",
            text:
              "最近は文字での学習が中心だね。英→日や日→英でできる単語を、今度は音声→意味でも試してみよう。文字では分かるのに音では分からない単語が見つかれば、そこが次に伸ばすところだよ。",
            action: {
              category: "audio_quiz",
              label: "音声→意味で試す"
            }
          }
        ],

        vocabulary: [
          {
            id: "A03_03",
            text:
              "単語学習がかなり進んでいるね。次は大問9で、その単語を文の中でも使えるか試してみよう。日本語訳を知っていても、前後の意味や語法から「ここで使える」と判断できなければ本番では使いにくいよ。",
            action: {
              category: "sentence",
              label: "大問9で試す"
            }
          }
        ],

        idiom: [
          {
            id: "A03_04",
            text:
              "イディオムを覚えてきたら、大問11でも試してみよう。同じ意味を別の表現でも言えると分かれば、覚えたイディオムが単独の知識ではなく、言い換えのネットワークにつながっていくよ。",
            action: {
              category: "paraphrase_quiz",
              label: "大問11で試す"
            }
          }
        ],

        listening: [
          {
            id: "A03_05",
            text:
              "リスニング問題を解くだけになっていないかな？ 間違えた英文はディクテーションで「どこが聞こえないか」を見つけて、オーバーラッピングやシャドーイングまでやってみよう。問題を解いた後からが、本当の聞き取り練習になるよ。",
            action: {
              category: "listening",
              practice: "dictation",
              label: "ディクテーションをやる"
            }
          }
        ]
      }
    },

    // ----------------------------------------------------------
    // ④ 英→日 / 日→英
    // ----------------------------------------------------------

    enja_jaen_balance: {
      id: "A04",
      label: "英→日・日→英",

      variants: {
        enja_unstable: [
          {
            id: "A04_01",
            text:
              "英→日は、正解するだけでなく意味がすぐ浮かぶところまで持っていこう。英文を読むたびに一語ずつ意味を考え込んでいると、文全体を追いにくい。英語を見た瞬間に意味へアクセスできる単語が増えるほど、内容を考えることに頭を使えるようになるよ。",
            action: {
              category: "quiz_enja",
              mode: "weak",
              label: "英→日を復習する"
            }
          }
        ],

        jaen_weak: [
          {
            id: "A04_02",
            text:
              "英→日で意味が分かっても、それだけでは穴埋め問題には足りないよ。空欄では前後から「こんな意味の語が必要だ」と考えて、それに合う英語を探す。日→英は、まさにその英語を記憶から取り出す練習なんだ。",
            action: {
              category: "quiz_jaen",
              label: "日→英をやる"
            }
          },

          {
            id: "A04_03",
            text:
              "例えば空欄に「拒否する」という意味が必要だと分かっても、refuse が浮かばなければ正解候補を探しにくいよね。日→英では、「この意味ならこの英語」とすばやく候補を出せる状態を目指そう。",
            action: {
              category: "quiz_jaen",
              label: "日→英をやる"
            }
          },

          {
            id: "A04_04",
            text:
              "大問11では、元の文と同じ意味になる別の表現を探すよね。意味から英語表現をいくつか思い浮かべられるほど、言い換えにも気づきやすくなる。日→英はその土台になるよ。",
            action: {
              category: "quiz_jaen",
              label: "日→英をやる"
            }
          }
        ],

        both_stable: [
          {
            id: "A04_05",
            text:
              "英→日も日→英もできる単語は、次は音声→意味へ。文字・意味・音のそれぞれから同じ単語に触れることで、その単語について知っていることが増え、思い出すための手がかりも増えていくよ。",
            action: {
              category: "audio_quiz",
              label: "音声→意味で試す"
            }
          }
        ]
      }
    },

    // ----------------------------------------------------------
    // ⑤ 音声系
    // ----------------------------------------------------------

    sound_gap: {
      id: "A05",
      label: "音声学習",

      variants: {
        vocabulary_sound: [
          {
            id: "A05_01",
            text:
              "単語は日本語訳だけで覚えて終わりじゃないよ。綴り・意味・発音・アクセントなど、いろいろな面から同じ単語に触れるほど、その単語について知っていることが増える。音声→意味でも確認してみよう。",
            action: {
              category: "audio_quiz",
              label: "音声→意味をやる"
            }
          },

          {
            id: "A05_02",
            text:
              "「スクリプトなら簡単なのに、聞くと分からない」はよくあること。文字で知っている英語と、実際に聞こえる音が結びついていない可能性があるよ。音声学習で、そのズレを一つずつ埋めていこう。",
            action: {
              category: "audio_quiz",
              label: "音声→意味をやる"
            }
          },

          {
            id: "A05_06",
            text:
              "発音を知って声に出せる単語が増えると、英文を一語ずつ文字だけで追うのではなく、音のまとまりとして読めるようになる助けになるよ。音声学習はリスニングだけでなく、音読や速く読むための土台にもなるんだ。",
            action: {
              category: "audio_quiz",
              label: "音声学習をする"
            }
          }
        ],

        listening_review: [
          {
            id: "A05_03",
            text:
              "聞き取れなかったら【ディクテーション】を使ってみよう。実際に書こうとすると、「知らない単語」「知っているけど音で分からない」「単語の切れ目が分からない」のどこで止まったのかが見えてくる。まず原因を特定しよう。",
            action: {
              category: "listening",
              practice: "dictation",
              label: "ディクテーションをやる"
            }
          },

          {
            id: "A05_04",
            text:
              "【オーバーラッピング】は、スクリプトを見ながら音声と同時に読む練習。発音だけでなく、強く読むところ、弱くなるところ、リズムや音のつながりまで実際の音声に合わせて自分の口で確認できるよ。",
            action: {
              category: "listening",
              practice: "overlapping",
              label: "オーバーラッピングをやる"
            }
          },

          {
            id: "A05_05",
            text:
              "オーバーラッピングができたら【シャドーイング】にも挑戦。聞こえた英語を少し遅れて追いかけるから、分からない語で止まらず、流れてくる英語についていく練習になるよ。",
            action: {
              category: "listening",
              practice: "shadowing",
              label: "シャドーイングをやる"
            }
          }
        ]
      }
    },

    // ----------------------------------------------------------
    // ⑥ 文脈系
    // ----------------------------------------------------------

    context_gap: {
      id: "A06",
      label: "文脈学習",

      variants: {
        sentence: [
          {
            id: "A06_01",
            text:
              "単語の日本語訳を知っていても、文の中で使えるとは限らないよ。大問9では、前後の意味・品詞・語法を見ながら「この語がここで使えるか」を判断する。覚えた語彙を実戦で使う練習をしてみよう。",
            action: {
              category: "sentence",
              label: "大問9をやる"
            }
          },

          {
            id: "A06_02",
            text:
              "大問9では空欄だけを見ず、前後の2〜3語にも注目してみよう。単語は一緒に使われる前置詞や語の組み合わせまで覚えると、選択肢を意味だけでなく語法からも判断できるようになるよ。",
            action: {
              category: "sentence",
              label: "大問9をやる"
            }
          }
        ],

        paraphrase: [
          {
            id: "A06_03",
            text:
              "大問11では「同じ意味を別の英語でどう言うか」に注目しよう。immediately と at once のように表現をセットで覚えると、一つの意味から複数の英語へつながっていくよ。",
            action: {
              category: "paraphrase_quiz",
              label: "大問11をやる"
            }
          }
        ],

        grammar: [
          {
            id: "A06_04",
            text:
              "大問12で間違えたら、正しい順番だけ覚えて終わらないようにしよう。「なぜこの語順？」が分からなければ【文法タグ一覧】の解説を読んでみよう。ルールが分かれば、別の英文にも同じ考え方を使えるよ。",
            action: {
              category: "reorder",
              practice: "grammar_tags",
              label: "文法タグ一覧を見る"
            }
          },

          {
            id: "A06_05",
            text:
              "文法タグ一覧を読んでも分からなかった？ それは成長のチャンス！ 「ここまでは分かるけど、ここが分からない」と学校の先生に聞いてみよう。自分の疑問を具体的にできたら、そこから理解を一段深められるよ。",
            action: {
              category: "reorder",
              practice: "grammar_tags",
              label: "文法タグを確認する"
            }
          }
        ],

        discourse: [
          {
            id: "A06_06",
            text:
              "大問8・10では、however、therefore、for example のような言葉を探してみよう。「ここから反対」「ここから結果」「ここから具体例」と、文章が次にどちらへ進むかを教えてくれる。こうした副詞や接続詞そのものも覚えておこう。",
            action: {
              category: "q10",
              label: "大問10を3問やる"
            }
          }
        ]
      }
    },

    // ----------------------------------------------------------
    // ⑦ 正答率
    // ----------------------------------------------------------

    accuracy: {
      id: "A07",
      label: "正答率",

      variants: {
        low: [
          {
            id: "A07_01",
            text:
              "正答率が低いときは、新しい問題を増やすより「なぜ間違えた？」を確認しよう。知らなかったのか、思い出せなかったのか、意味を取り違えたのか。原因が分かれば、次にやる練習も決められるよ。",
            action: {
              category: null,
              mode: "weak",
              label: "ニガテを確認する"
            }
          },

          {
            id: "A07_02",
            text:
              "間違いがたまってきたら、問題順を【ニガテ順】にしてみよう。すでにできる問題より、まだ答えを取り出せない問題に「何だったっけ？」と考える回数を集中させよう。",
            action: {
              category: null,
              mode: "weak",
              label: "ニガテ順でやる"
            }
          }
        ],

        middle: [
          {
            id: "A07_03",
            text:
              "今くらいの正答率なら、まだ少し考える問題が残っているね。全部簡単な問題より、迷う問題がある方が思い出す練習を作れる。間違えたものだけ復習しながら、今の範囲を続けてみよう。",
            action: {
              category: null,
              label: "今の学習を続ける"
            }
          }
        ],

        high: [
          {
            id: "A07_04",
            text:
              "9割以上できるなら、同じ形式を何度も繰り返すより次の形へ進もう。4択なら単語一覧、英→日なら日→英、日→英なら音声。条件を変えて、もう一度「できる／できない」を仕分けよう。",
            action: {
              category: null,
              label: "次の形式へ進む"
            }
          }
        ],

        exam: [
          {
            id: "A07_05",
            text:
              "大問で正解したら、「正解した」で終わらず理由も確認しよう。大問12なら文法タグ、大問8・10ならディスコースマーカーなど、何を手がかりに解けたか説明できれば、別の問題にもその考え方を使えるよ。",
            action: {
              category: null,
              label: "解説も確認する"
            }
          }
        ]
      }
    },

    // ----------------------------------------------------------
    // ⑧ 継続
    // ----------------------------------------------------------

    continuity: {
      id: "A08",
      label: "継続",

      variants: {
        normal: [
          {
            id: "A08_01",
            text:
              "今週はよく続けられているね。続ける価値は「毎日やった」という記録だけじゃないよ。前に覚えたものを何度も思い出す機会を作れることが大きいんだ。",
            action: null
          },

          {
            id: "A08_02",
            text:
              "少し忘れてから「何だったっけ？」ともう一度思い出す。この経験を何度も作れるのが、学習を続ける強みだよ。今週のペースを使って、前に間違えたニガテも混ぜてみよう。",
            action: {
              category: null,
              mode: "weak",
              label: "ニガテを復習する"
            }
          }
        ],

        high: [
          {
            id: "A08_03",
            text:
              "今週はしっかり学習できているね。ここからは「何問やったか」だけでなく「どんな方法でやったか」にも注目しよう。英→日だけなら日→英、4択だけなら単語一覧、と一段深い学習へ進んでみよう。",
            action: null
          },

          {
            id: "A08_04",
            text:
              "続ける力はかなりついてきたね。次は学習の中身も見てみよう。文字だけ、語彙だけになっていないかな？ 音声や文脈も混ぜれば、同じ英語を別の角度から確認できるよ。",
            action: null
          }
        ],

        return: [
          {
            id: "A08_05",
            text:
              "1日できなかったからといって、それまでの学習がなくなるわけじゃないよ。大切なのは、また戻って思い出すこと。途切れないことより、何度でも学習に戻ってこられる習慣を作ろう。",
            action: null
          }
        ]
      }
    }
  };

  // ============================================================
  // ⑨ 英語の豆知識
  // ============================================================

  const TRIVIA_CATEGORIES = {
    polysemy: "多義語",
    etymology: "語源",
    prefix: "接頭辞",
    suffix: "接尾辞",
    word_family: "語族",
    accent: "アクセント",
    collocation: "コロケーション",
    loanword: "外来語・和製英語",
    katakana: "カタカナ語",
    idiom: "イディオム",
    quote: "有名な英語の言葉",
    nuance: "似た単語の違い"
  };

  const TRIVIA_DATA = [
    // 多義語
    {
      id: "TRIVIA_001",
      category: "polysemy",
      text:
        "【英語の豆知識】run は「走る」だけじゃないよ。run a company なら「会社を経営する」、The machine is running. なら「機械が動いている」。よく使う基本語ほど、実はいろいろな意味を持っているんだ。"
    },
    {
      id: "TRIVIA_002",
      category: "polysemy",
      text:
        "【英語の豆知識】hold は「持つ」だけじゃないよ。hold a meeting なら「会議を開く」、This hall holds 500 people. なら「このホールは500人を収容できる」。日本語訳を1つだけ覚えると見えない意味があるんだ。"
    },
    {
      id: "TRIVIA_003",
      category: "polysemy",
      text:
        "【英語の豆知識】take は「取る」だけじゃない。take a bus は「バスに乗る」、take medicine は「薬を飲む」、It takes ten minutes. は「10分かかる」。基本語ほど文の中で意味を確かめることが大切だよ。"
    },
    {
      id: "TRIVIA_004",
      category: "polysemy",
      text:
        "【英語の豆知識】issue は名詞なら「問題・論点」という意味でよく使うけど、動詞なら「発行する」にもなるよ。an environmental issue は「環境問題」、issue a passport は「パスポートを発行する」。"
    },
    {
      id: "TRIVIA_005",
      category: "polysemy",
      text:
        "【英語の豆知識】address は「住所」だけじゃないよ。address a problem なら「問題に取り組む・対処する」。知っている単語が長文で変な意味に見えたら、まず品詞と前後を確認してみよう。"
    },

    // 語源
    {
      id: "TRIVIA_006",
      category: "etymology",
      text:
        "【英語の豆知識】spect は「見る」に関係する語源だよ。inspect、respect、spectator など、一見意味が違う単語の中に同じパーツが隠れている。単語を分解すると、知らなかった単語同士がつながって見えることがあるよ。"
    },
    {
      id: "TRIVIA_007",
      category: "etymology",
      text:
        "【英語の豆知識】dict は「言う」に関係する語源。predict は「前もって言う」から「予測する」、dictate は「言葉を言って書き取らせる」。長い単語もパーツを見ると意味が見えてくることがあるんだ。"
    },
    {
      id: "TRIVIA_008",
      category: "etymology",
      text:
        "【英語の豆知識】port は「運ぶ」に関係する語源だよ。transport は「運ぶ」、import は「中へ運ぶ」→「輸入する」、export は「外へ運ぶ」→「輸出する」。3語が一気につながるね。"
    },
    {
      id: "TRIVIA_009",
      category: "etymology",
      text:
        "【英語の豆知識】ject は「投げる」に関係する語源。reject は「投げ返す」イメージから「拒否する」、project も同じ語源につながっているよ。見た目の一部が同じ単語には、意外な親戚関係があるんだ。"
    },
    {
      id: "TRIVIA_010",
      category: "etymology",
      text:
        "【英語の豆知識】vis や vid は「見る」に関係する語源だよ。visible は「見える」、vision は「視覚・未来像」、video も同じ仲間。普段使っている video にも語源が隠れているんだ。"
    },

    // 接頭辞
    {
      id: "TRIVIA_011",
      category: "prefix",
      text:
        "【英語の豆知識】pre- は「前に」。preview は「前もって見る」→「予告・下見」、predict は「前もって言う」→「予測する」。初めて見る単語でも、pre- があれば意味の方向を予想できるかも。"
    },
    {
      id: "TRIVIA_012",
      category: "prefix",
      text:
        "【英語の豆知識】inter- は「〜の間に・相互に」に関係するよ。international は「国と国の間」→「国際的な」、interact は「互いに作用する」→「交流する」。単語の最初にも意味のヒントがあるんだ。"
    },
    {
      id: "TRIVIA_013",
      category: "prefix",
      text:
        "【英語の豆知識】sub- は「下に」に関係することが多いよ。subway は「道の下」→「地下鉄」、submarine は「海の下」→「潜水艦」。知っているカタカナ語も分解すると面白いね。"
    },
    {
      id: "TRIVIA_014",
      category: "prefix",
      text:
        "【英語の豆知識】de- には「下へ・離す・取り除く」といったイメージがあるよ。decrease は「減少する」、defrost は「霜を取り除く」→「解凍する」。知らない語の意味を予想するヒントになることがあるよ。"
    },
    {
      id: "TRIVIA_015",
      category: "prefix",
      text:
        "【英語の豆知識】com-、con-、col-、cor- は見た目が違うけど、「一緒に」という同じ起源につながる仲間なんだ。combine、connect、collaborate など、後ろの音に合わせて形が変わっているものがあるよ。"
    },

    // 接尾辞
    {
      id: "TRIVIA_016",
      category: "suffix",
      text:
        "【英語の豆知識】develop → development、improve → improvement、achieve → achievement。-ment がつくと名詞になる語が多いよ。動詞を1語覚えたら、仲間の名詞も探してみよう。"
    },
    {
      id: "TRIVIA_017",
      category: "suffix",
      text:
        "【英語の豆知識】possible → possibility、equal → equality のように、-ity は性質や状態を表す名詞によく使われるよ。語尾が変わると、つづりまで変化することがあるのもポイント。"
    },
    {
      id: "TRIVIA_018",
      category: "suffix",
      text:
        "【英語の豆知識】-ize は「〜にする・〜化する」という動詞を作ることがあるよ。modernize は「近代化する」、organize は「組織化する」。知らない単語でも語尾から「動詞かな？」と予想できることがあるんだ。"
    },
    {
      id: "TRIVIA_019",
      category: "suffix",
      text:
        "【英語の豆知識】-ful は「〜に満ちた」、-less は「〜がない」という意味を作ることがあるよ。careful は「注意深い」、careless は「不注意な」。同じ語から反対方向の単語が作れるんだ。"
    },
    {
      id: "TRIVIA_020",
      category: "suffix",
      text:
        "【英語の豆知識】-er は teacher のような「〜する人」だけじゃないよ。printer なら「印刷する機械」、container なら「入れておくもの」。人だけでなく、その働きをする物にも使われるんだ。"
    },

    // 語族
    {
      id: "TRIVIA_021",
      category: "word_family",
      text:
        "【英語の豆知識】decide「決める」を覚えたら、decision「決定」、decisive「決定的な」までつなげてみよう。単語を1個ずつではなく、家族みたいに覚えると一気に広げられるよ。"
    },
    {
      id: "TRIVIA_022",
      category: "word_family",
      text:
        "【英語の豆知識】receive「受け取る」、reception「受付・歓迎」、recipient「受取人」は、見た目がかなり違うけれど同じ語源につながる語族なんだ。意味の中心を見ると親戚だと気づけるよ。"
    },
    {
      id: "TRIVIA_023",
      category: "word_family",
      text:
        "【英語の豆知識】succeed「成功する」、success「成功」、successful「成功した」、successfully「うまく」。1つの語族から動詞・名詞・形容詞・副詞をまとめて増やせるよ。"
    },
    {
      id: "TRIVIA_024",
      category: "word_family",
      text:
        "【英語の豆知識】produce「生産する」、product「製品」、production「生産」、productive「生産的な」は同じ仲間。形が少し変わっても、意味の中心をつかむと覚えやすくなるよ。"
    },
    {
      id: "TRIVIA_025",
      category: "word_family",
      text:
        "【英語の豆知識】apply から application「申請・応用」、applicant「応募者」、applicable「適用できる」まで広がるよ。語族を知ると、初めて見る関連語の意味や品詞も予想しやすくなるんだ。"
    },

    // アクセント
    {
      id: "TRIVIA_026",
      category: "accent",
      text:
        "【英語の豆知識】record は名詞なら REcord、動詞なら reCORD のように、2音節語には「名詞は前、動詞は後ろ」にアクセントが来るものがあるよ。present や increase にも見られるパターンなんだ。"
    },
    {
      id: "TRIVIA_027",
      category: "accent",
      text:
        "【英語の豆知識】education、information、decision のように、-tion や -sion で終わる語は、その直前の音節が強くなることが多いよ。長い単語でも語尾がアクセントのヒントになるんだ。"
    },
    {
      id: "TRIVIA_028",
      category: "accent",
      text:
        "【英語の豆知識】economic、scientific、historic など、-ic で終わる語は -ic の直前が強くなることが多いよ。初めて見る語でもアクセントを予想できることがあるんだ。"
    },
    {
      id: "TRIVIA_029",
      category: "accent",
      text:
        "【英語の豆知識】employee、engineer、volunteer のように、-ee や -eer で終わる語は後ろが強くなることが多いよ。「長い単語なら前を強く読む」とは限らないんだ。"
    },
    {
      id: "TRIVIA_030",
      category: "accent",
      text:
        "【英語の豆知識】PHOtograph → phoTOGraphy → photoGRAPHic。同じ語族なのに、語尾が変わるとアクセントまで移動するよ。関連語は意味だけでなく発音も一緒に確認すると強いね。"
    },

    // コロケーション
    {
      id: "TRIVIA_031",
      category: "collocation",
      text:
        "【英語の豆知識】日本語では「強い雨」と言うけれど、英語では普通 strong rain ではなく heavy rain。英語では「意味が合うか」だけでなく、「どの単語同士がよく一緒に使われるか」も大切なんだ。"
    },
    {
      id: "TRIVIA_032",
      category: "collocation",
      text:
        "【英語の豆知識】「決定する」は do a decision ではなく make a decision。日本語の「する」は便利だけど、英語では名詞によって一緒に使われやすい動詞が違うよ。"
    },
    {
      id: "TRIVIA_033",
      category: "collocation",
      text:
        "【英語の豆知識】「注意を払う」は pay attention。pay は「お金を払う」だけじゃないんだ。単語を1語ずつではなく pay attention to ... のようなまとまりで覚えると使いやすいよ。"
    },
    {
      id: "TRIVIA_034",
      category: "collocation",
      text:
        "【英語の豆知識】「風邪をひく」は英語では catch a cold。英語では風邪を「つかまえる」んだね。日本語と使う動詞が違う表現は、セットで覚えるのがおすすめ。"
    },
    {
      id: "TRIVIA_035",
      category: "collocation",
      text:
        "【英語の豆知識】very recommended より highly recommended「強くおすすめされる」の方が自然だよ。highly likely「可能性が非常に高い」、highly successful「非常に成功している」のように、副詞にも相性のいい相手があるんだ。"
    },

    // 外来語・和製英語
    {
      id: "TRIVIA_036",
      category: "loanword",
      text:
        "【英語の豆知識】日本語の「マンション」と英語の mansion はかなり違うよ。英語の mansion は「大豪邸」。日本でいうマンションなら apartment や condominium に近いんだ。"
    },
    {
      id: "TRIVIA_037",
      category: "loanword",
      text:
        "【英語の豆知識】日本語の「クレーム」は「苦情」だけど、英語の claim は「主張する・要求する」が中心。苦情なら complaint。カタカナになる途中で意味が変わった語もあるんだ。"
    },
    {
      id: "TRIVIA_038",
      category: "loanword",
      text:
        "【英語の豆知識】日本語で「スマート」は「細身でかっこいい」という意味でも使うけど、英語の smart は「頭がいい・賢い」という意味でよく使うよ。「細身の」なら slim などが近いんだ。"
    },
    {
      id: "TRIVIA_039",
      category: "loanword",
      text:
        "【英語の豆知識】日本語の「コンセント」は英語の consent じゃないよ。consent は「同意」。電源を差すコンセントなら、英語では outlet や socket と言うよ。同じ音でも意味はまったく別なんだ。"
    },
    {
      id: "TRIVIA_040",
      category: "loanword",
      text:
        "【英語の豆知識】ホテルで朝に起こしてもらう「モーニングコール」は、英語では普通 wake-up call。英語っぽく見える日本語でも、そのままでは通じにくい表現があるんだ。"
    },

    // カタカナ語
    {
      id: "TRIVIA_041",
      category: "katakana",
      text:
        "【英語の豆知識】日本語の「テンションが高い！」と英語の tension はかなり違うよ。tension は「緊張・張りつめた状態」。気分が高まっているなら excited などの方が近いんだ。"
    },
    {
      id: "TRIVIA_042",
      category: "katakana",
      text:
        "【英語の豆知識】日本語では「サービスします！」＝「無料にします」ということもあるけど、英語の service は主に「サービス・業務」。無料なら free や complimentary と表すことがあるよ。"
    },
    {
      id: "TRIVIA_043",
      category: "katakana",
      text:
        "【英語の豆知識】日本語では「イメージする」と言うけれど、「頭の中に思い描く」なら英語では imagine がよく使われるよ。image は「画像・像・印象」という名詞として特によく使われるんだ。"
    },
    {
      id: "TRIVIA_044",
      category: "katakana",
      text:
        "【英語の豆知識】日本語の「マイペース」は、そのまま my pace とは言いにくいよ。「自分のペースで」なら at my own pace。カタカナをそのまま英語に戻せるとは限らないんだ。"
    },
    {
      id: "TRIVIA_045",
      category: "katakana",
      text:
        "【英語の豆知識】日本語の「ハイタッチ」は英語では普通 high five。Give me a high five! なら「ハイタッチしよう！」。実は high touch じゃないんだ。"
    },

    // イディオム
    {
      id: "TRIVIA_046",
      category: "idiom",
      text:
        "【英語の豆知識】break the ice は直訳すると「氷を割る」だけど、「緊張をほぐす・打ち解けるきっかけを作る」という意味でも使うよ。直訳では分からないのがイディオムの面白さだね。"
    },
    {
      id: "TRIVIA_047",
      category: "idiom",
      text:
        "【英語の豆知識】a piece of cake は「一切れのケーキ」だけど、「とても簡単なこと」という意味でも使うよ。The test was a piece of cake. なら「そのテストは楽勝だった」。"
    },
    {
      id: "TRIVIA_048",
      category: "idiom",
      text:
        "【英語の豆知識】hit the books は「本をたたく」じゃなくて「しっかり勉強する」。I have to hit the books tonight. なら「今夜は勉強しないと」。イディオムはまとまりで意味を覚えよう。"
    },
    {
      id: "TRIVIA_049",
      category: "idiom",
      text:
        "【英語の豆知識】under the weather は直訳すると「天気の下」だけど、「体調がよくない」という意味。I'm feeling under the weather. なら「ちょっと体調が悪いんだ」。"
    },
    {
      id: "TRIVIA_050",
      category: "idiom",
      text:
        "【英語の豆知識】cost an arm and a leg は「ものすごく高い」という意味。That car costs an arm and a leg. なら「その車、めちゃくちゃ高い」。英語にもかなり大げさな表現があるんだ。"
    },

    // 有名な英語の言葉
    {
      id: "TRIVIA_051",
      category: "quote",
      text:
        "【英語の豆知識】“Stay hungry. Stay foolish.” 「ハングリーであれ。愚かであれ。」スティーブ・ジョブズが2005年のスタンフォード大学卒業式で紹介した有名な言葉。実はジョブズ自身のオリジナルではないんだ。"
    },
    {
      id: "TRIVIA_052",
      category: "quote",
      text:
        "【英語の豆知識】ネルソン・マンデラの有名な言葉に “Education is the most powerful weapon which you can use to change the world.” があるよ。「教育は世界を変えるために使える最も強力な武器」。weapon「武器」を比喩的に使っているんだ。"
    },
    {
      id: "TRIVIA_053",
      category: "quote",
      text:
        "【英語の豆知識】ケネディ大統領の有名な言葉。“Ask not what your country can do for you—ask what you can do for your country.” 「国が自分に何をしてくれるかではなく、自分が国のために何ができるかを問おう。」"
    },
    {
      id: "TRIVIA_054",
      category: "quote",
      text:
        "【英語の豆知識】ルーズベルト大統領の “The only thing we have to fear is fear itself.” は「私たちが恐れなければならない唯一のものは、恐怖そのもの」。fear が動詞と名詞の両方で使われているのも面白いね。"
    },
    {
      id: "TRIVIA_055",
      category: "quote",
      text:
        "【英語の豆知識】“To be or not to be—that is the question.” 「生きるべきか、死ぬべきか。それが問題だ。」シェイクスピアの『ハムレット』の有名な一文。ほとんど基本語だけなのに、400年以上残り続けている表現なんだ。"
    },

    // 似た単語
    {
      id: "TRIVIA_056",
      category: "nuance",
      text:
        "【英語の豆知識】say / tell / speak / talk は全部「言う・話す」と訳せるけど使い方が違うよ。say something、tell someone something、speak English のように、一緒に使う語まで見ると違いが分かりやすいよ。"
    },
    {
      id: "TRIVIA_057",
      category: "nuance",
      text:
        "【英語の豆知識】look / see / watch は全部「見る」だけど、look は意識して目を向ける、see は目に入る、watch は動くものなどをしばらく見るイメージ。だからテレビは watch TV なんだ。"
    },
    {
      id: "TRIVIA_058",
      category: "nuance",
      text:
        "【英語の豆知識】hear と listen はどちらも「聞く」。でも hear は自然に耳に入る、listen は意識して耳を傾けるイメージだよ。だから Listen to me. には to が必要なんだ。"
    },
    {
      id: "TRIVIA_059",
      category: "nuance",
      text:
        "【英語の豆知識】big / large / great はどれも「大きい」と訳せるけど同じではないよ。big は日常的な「大きい」、large は大きさや量を客観的に表すことが多く、great は「偉大な・すばらしい」という評価にも使えるんだ。"
    },
    {
      id: "TRIVIA_060",
      category: "nuance",
      text:
        "【英語の豆知識】job と work はどちらも「仕事」だけど、job は具体的な職や仕事で数えられる。work は仕事・労働そのものを表すことが多く、普通は数えないよ。だから a job はOKでも、普通 a work とは言わないんだ。"
    }
  ];

  // ============================================================
  // 共通関数
  // ============================================================

  function getTypeData(typeKey) {
    return TYPE_DATA[typeKey] || TYPE_DATA.nagomi;
  }

  function randomItem(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)] || null;
  }

  function safeNumber(value) {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
  }

  function safeParse(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function safeSave(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 保存できなくても学習画面は壊さない
    }
  }

  function getHistory() {
    const raw = safeParse(HISTORY_KEY, {});

    return {
      advice: Array.isArray(raw.advice) ? raw.advice : [],
      trivia: Array.isArray(raw.trivia) ? raw.trivia : [],
      conditions: Array.isArray(raw.conditions) ? raw.conditions : []
    };
  }

  function pushLimited(arr, value, limit) {
    const next = Array.isArray(arr) ? arr.filter(v => v !== value) : [];
    next.push(value);

    while (next.length > limit) {
      next.shift();
    }

    return next;
  }

  function rememberAdvice(id, condition) {
    if (!id) return;

    const history = getHistory();

    history.advice = pushLimited(
      history.advice,
      id,
      THRESHOLDS.RECENT_ADVICE_LIMIT
    );

    if (condition) {
      history.conditions = pushLimited(
        history.conditions,
        condition,
        THRESHOLDS.RECENT_CONDITION_LIMIT
      );
    }

    safeSave(HISTORY_KEY, history);
  }

  function rememberTrivia(id) {
    if (!id) return;

    const history = getHistory();

    history.trivia = pushLimited(
      history.trivia,
      id,
      THRESHOLDS.RECENT_TRIVIA_LIMIT
    );

    safeSave(HISTORY_KEY, history);
  }

  function pickAvoidRecent(items, recentIds) {
    if (!Array.isArray(items) || items.length === 0) return null;

    const recent = new Set(
      Array.isArray(recentIds) ? recentIds : []
    );

    const fresh = items.filter(item => {
      return item && !recent.has(item.id);
    });

    return randomItem(fresh.length ? fresh : items);
  }

  // ============================================================
  // LearningLog から状態を取得
  // ============================================================

  function getLearningLogApi() {
    return window.ZenshoLearningLog || null;
  }

  function getLearningCategoriesApi() {
    return window.LearningCategories || null;
  }

  function normalizeSlot(slot) {
    const value =
      slot &&
      typeof slot === "object" &&
      !Array.isArray(slot)
        ? slot
        : {};

    const attempt = Math.max(0, safeNumber(value.attempt));
    const correct = Math.max(0, safeNumber(value.correct));
    const wrong = Math.max(0, safeNumber(value.wrong));

    const judged = correct + wrong;

    return {
      attempt,
      correct,
      wrong,
      accuracy:
        judged > 0
          ? Math.round((correct / judged) * 100)
          : null
    };
  }

  function getTodayTotal(today) {
    return Object.values(today || {}).reduce((sum, slot) => {
      return sum + normalizeSlot(slot).attempt;
    }, 0);
  }

  function countStudyDays(days, level) {
    const api = getLearningLogApi();
    if (!api || typeof api.getDay !== "function") return 0;
    if (typeof api.dateKeyByOffset !== "function") return 0;

    let count = 0;

    for (let i = 0; i < days; i++) {
      const dayKey = api.dateKeyByOffset(i);
      const day = api.getDay(dayKey, level);

      const hasStudy = Object.values(day || {}).some(slot => {
        return normalizeSlot(slot).attempt > 0;
      });

      if (hasStudy) count += 1;
    }

    return count;
  }

  function getGroupCategories(group, level) {
    const api = getLearningCategoriesApi();

    if (
      api &&
      typeof api.getCategoriesByGroup === "function"
    ) {
      return api
        .getCategoriesByGroup(group, level)
        .map(category => category.key);
    }

    const fallback = {
      vocabulary: [
        "study",
        "quiz_enja",
        "quiz_jaen",
        "idiom_quiz"
      ],

      sound: [
        "audio_quiz",
        "listening",
        "accent"
      ],

      exam: [
        "dialogue8",
        "sentence",
        "q10",
        "paraphrase_quiz",
        "reorder"
      ]
    };

    return fallback[group] || [];
  }

  function sumCategories(summary, keys) {
    return (keys || []).reduce((result, key) => {
      const slot = normalizeSlot(
        summary?.byCategory?.[key]
      );

      result.attempt += slot.attempt;
      result.correct += slot.correct;
      result.wrong += slot.wrong;

      return result;
    }, {
      attempt: 0,
      correct: 0,
      wrong: 0
    });
  }

  function getGroupLastStudyDays(group, level) {
    const api = getLearningLogApi();
    if (!api) return null;

    const categories = getGroupCategories(group, level);

    const days = categories
      .map(key => {
        if (
          typeof api.getDaysSinceLastStudy !== "function"
        ) {
          return null;
        }

        return api.getDaysSinceLastStudy(key, level);
      })
      .filter(value => value != null);

    if (!days.length) return null;

    return Math.min(...days);
  }

  // ============================================================
  // 学習状態分析
  // ============================================================

  function analyzeLearningState(options) {
    const opts = options || {};
    const api = getLearningLogApi();

    const level = String(
      opts.level ||
      api?.getLevel?.() ||
      localStorage.getItem("zensho_level_v1") ||
      "1"
    );

    if (!api) {
      return {
        level,
        available: false,
        todayAttempt: 0,
        weekAttempt: 0,
        weekAccuracy: null,
        studyDays7: 0,
        byCategory: {},
        groupStats: {},
        daysSinceAnyStudy: null
      };
    }

    const today =
      typeof api.getToday === "function"
        ? api.getToday(level)
        : {};

    const week =
      typeof api.getSummary === "function"
        ? api.getSummary(7, level)
        : {
            totalAttempt: 0,
            accuracy: null,
            byCategory: {}
          };

    const byCategory = {};

    Object.entries(week.byCategory || {}).forEach(
      ([key, slot]) => {
        byCategory[key] = normalizeSlot(slot);
      }
    );

    const vocabularyKeys =
      getGroupCategories("vocabulary", level);

    const soundKeys =
      getGroupCategories("sound", level);

    const examKeys =
      getGroupCategories("exam", level);

    const vocabularyStats =
      sumCategories(week, vocabularyKeys);

    const soundStats =
      sumCategories(week, soundKeys);

    const examStats =
      sumCategories(week, examKeys);

    const totalAttempt =
      safeNumber(week.totalAttempt);

    function ratio(count) {
      return totalAttempt > 0
        ? count / totalAttempt
        : 0;
    }

    const daysSinceAnyStudy =
      typeof api.getDaysSinceLastStudy === "function"
        ? api.getDaysSinceLastStudy(null, level)
        : null;

    return {
      level,
      available: true,

      today,
      todayAttempt: getTodayTotal(today),

      weekAttempt: totalAttempt,
      weekAccuracy:
        week.accuracy == null
          ? null
          : safeNumber(week.accuracy),

      studyDays7: countStudyDays(7, level),

      byCategory,

      enja: normalizeSlot(
        week.byCategory?.quiz_enja
      ),

      jaen: normalizeSlot(
        week.byCategory?.quiz_jaen
      ),

      audio: normalizeSlot(
        week.byCategory?.audio_quiz
      ),

      listening: normalizeSlot(
        week.byCategory?.listening
      ),

      idiom: normalizeSlot(
        week.byCategory?.idiom_quiz
      ),

      sentence: normalizeSlot(
        week.byCategory?.sentence
      ),

      paraphrase: normalizeSlot(
        week.byCategory?.paraphrase_quiz
      ),

      reorder: normalizeSlot(
        week.byCategory?.reorder
      ),

      dialogue8: normalizeSlot(
        week.byCategory?.dialogue8
      ),

      q10: normalizeSlot(
        week.byCategory?.q10
      ),

      groupStats: {
        vocabulary: {
          ...vocabularyStats,
          ratio: ratio(vocabularyStats.attempt),
          daysSince:
            getGroupLastStudyDays(
              "vocabulary",
              level
            )
        },

        sound: {
          ...soundStats,
          ratio: ratio(soundStats.attempt),
          daysSince:
            getGroupLastStudyDays(
              "sound",
              level
            )
        },

        exam: {
          ...examStats,
          ratio: ratio(examStats.attempt),
          daysSince:
            getGroupLastStudyDays(
              "exam",
              level
            )
        }
      },

      daysSinceAnyStudy
    };
  }

  // ============================================================
  // 条件候補生成
  // ============================================================

  function buildConditionCandidates(state, options) {
    const opts = options || {};
    const candidates = [];

    const currentCategory =
      opts.currentCategory || null;

    const currentGroup =
      currentCategory &&
      window.LearningCategories?.getCategory
        ? window.LearningCategories
            .getCategory(currentCategory)
            ?.group
        : null;

    // ----------------------------------------------------------
    // ① 今日まだ学習していない
    // ----------------------------------------------------------

    if (state.todayAttempt === 0) {
      let variant = "default";

      const hasRecentWrong = Object.values(
        state.byCategory || {}
      ).some(slot => {
        return slot.wrong > 0;
      });

      if (hasRecentWrong) {
        variant = "weak";
      } else if (
        state.enja.attempt >=
          THRESHOLDS.MIN_ACCURACY_ATTEMPTS &&
        state.enja.accuracy != null &&
        state.enja.accuracy >=
          THRESHOLDS.HIGH_ACCURACY
      ) {
        variant = "recall";
      }

      candidates.push({
        condition: "start",
        variant,
        score: 100
      });
    }

    // ----------------------------------------------------------
    // ⑦ 正答率
    // ----------------------------------------------------------

    const accuracyTargets = Object.entries(
      state.byCategory || {}
    )
      .filter(([key, slot]) => {
        if (
          key === "dialogue8" ||
          key === "q10"
        ) {
          return false;
        }

        return (
          slot.attempt >=
            THRESHOLDS.MIN_ACCURACY_ATTEMPTS &&
          slot.accuracy != null
        );
      })
      .sort((a, b) => {
        return (
          safeNumber(a[1].accuracy) -
          safeNumber(b[1].accuracy)
        );
      });

    const weakest = accuracyTargets[0];

    if (
      weakest &&
      weakest[1].accuracy <
        THRESHOLDS.LOW_ACCURACY
    ) {
      candidates.push({
        condition: "accuracy",
        variant: "low",
        category: weakest[0],
        score: 95
      });
    } else {
      const highTarget = accuracyTargets
        .slice()
        .sort((a, b) => {
          return (
            safeNumber(b[1].accuracy) -
            safeNumber(a[1].accuracy)
          );
        })[0];

      if (
        highTarget &&
        highTarget[1].accuracy >=
          THRESHOLDS.HIGH_ACCURACY
      ) {
        candidates.push({
          condition: "accuracy",
          variant:
            currentGroup === "exam"
              ? "exam"
              : "high",
          category: highTarget[0],
          score: 65
        });
      } else if (weakest) {
        candidates.push({
          condition: "accuracy",
          variant: "middle",
          category: weakest[0],
          score: 45
        });
      }
    }

    // ----------------------------------------------------------
    // ④ 英→日 / 日→英
    // ----------------------------------------------------------

    if (
      state.enja.attempt >=
        THRESHOLDS.BALANCE_MIN_ATTEMPTS &&
      state.enja.accuracy != null
    ) {
      if (
        state.enja.accuracy <
        THRESHOLDS.LOW_ACCURACY
      ) {
        candidates.push({
          condition: "enja_jaen_balance",
          variant: "enja_unstable",
          category: "quiz_enja",
          score: 90
        });
      } else if (
        state.enja.attempt >=
          THRESHOLDS.BALANCE_MIN_ATTEMPTS &&
        state.jaen.attempt >=
          THRESHOLDS.BALANCE_MIN_ATTEMPTS &&
        state.enja.accuracy >=
          THRESHOLDS.ENJA_STABLE &&
        state.jaen.accuracy != null &&
        state.jaen.accuracy <
          THRESHOLDS.JAEN_WEAK
      ) {
        candidates.push({
          condition: "enja_jaen_balance",
          variant: "jaen_weak",
          category: "quiz_jaen",
          score: 90
        });
      } else if (
        state.enja.attempt >=
          THRESHOLDS.BALANCE_MIN_ATTEMPTS &&
        state.jaen.attempt >=
          THRESHOLDS.BALANCE_MIN_ATTEMPTS &&
        state.enja.accuracy >=
          THRESHOLDS.BOTH_ENJA_STABLE &&
        state.jaen.accuracy != null &&
        state.jaen.accuracy >=
          THRESHOLDS.BOTH_JAEN_STABLE
      ) {
        candidates.push({
          condition: "enja_jaen_balance",
          variant: "both_stable",
          category: "audio_quiz",
          score: 80
        });
      }
    }

    // 英→日だけ大量、日→英がかなり少ない
    if (
      state.enja.attempt >= 20 &&
      state.jaen.attempt <
        state.enja.attempt * 0.30 &&
      state.enja.accuracy != null &&
      state.enja.accuracy >=
        THRESHOLDS.ENJA_STABLE
    ) {
      candidates.push({
        condition: "enja_jaen_balance",
        variant: "jaen_weak",
        category: "quiz_jaen",
        score: 88
      });
    }

    // ----------------------------------------------------------
    // ② 最近の学習量が少ない
    // ----------------------------------------------------------

    if (
      state.weekAttempt <
      THRESHOLDS.LOW_WEEKLY_ATTEMPTS
    ) {
      candidates.push({
        condition: "low_volume",
        variant:
          currentCategory === "dialogue8" ||
          currentCategory === "q10"
            ? "long_text"
            : "default",
        category: currentCategory,
        score: 70
      });
    }

    // ----------------------------------------------------------
    // ③ カテゴリ偏り
    // ----------------------------------------------------------

    if (
      state.weekAttempt >=
      THRESHOLDS.CATEGORY_BIAS_MIN_ATTEMPTS
    ) {
      const categoryEntries = Object.entries(
        state.byCategory || {}
      ).sort((a, b) => {
        return b[1].attempt - a[1].attempt;
      });

      const top = categoryEntries[0];

      if (top) {
        const topKey = top[0];
        const topSlot = top[1];
        const share =
          topSlot.attempt / state.weekAttempt;

        // 正答率が低いなら形式変更せず⑦を優先
        const canMove =
          topSlot.accuracy == null ||
          topSlot.accuracy >=
            THRESHOLDS.LOW_ACCURACY;

        if (
          share >=
            THRESHOLDS.CATEGORY_BIAS_RATIO &&
          canMove
        ) {
          let variant = null;

          if (topKey === "quiz_enja") {
            variant = "enja";
          } else if (
            topKey === "quiz_jaen" ||
            topKey === "study"
          ) {
            variant = "text_based";
          } else if (
            topKey === "idiom_quiz"
          ) {
            variant = "idiom";
          } else if (
            topKey === "listening"
          ) {
            variant = "listening";
          } else if (
            getGroupCategories(
              "vocabulary",
              state.level
            ).includes(topKey)
          ) {
            variant = "vocabulary";
          }

          if (variant) {
            candidates.push({
              condition: "category_bias",
              variant,
              category: topKey,
              score: 60
            });
          }
        }
      }
    }

    // グループ偏り
    if (
      state.weekAttempt >=
      THRESHOLDS.CATEGORY_BIAS_MIN_ATTEMPTS
    ) {
      if (
        state.groupStats.vocabulary.ratio >=
        THRESHOLDS.GROUP_BIAS_RATIO
      ) {
        candidates.push({
          condition: "category_bias",
          variant: "text_based",
          score: 58
        });
      }
    }

    // ----------------------------------------------------------
    // ⑤ 音声不足
    // ----------------------------------------------------------

    const soundDays =
      state.groupStats.sound.daysSince;

    if (
      soundDays == null ||
      soundDays >= THRESHOLDS.SOUND_GAP_DAYS
    ) {
      candidates.push({
        condition: "sound_gap",
        variant:
          currentCategory === "listening"
            ? "listening_review"
            : "vocabulary_sound",
        score: 55
      });
    }

    // リスニングの正答率が低いならディクテーション等
    if (
      state.listening.attempt >= 5 &&
      state.listening.accuracy != null &&
      state.listening.accuracy <
        THRESHOLDS.LOW_ACCURACY
    ) {
      candidates.push({
        condition: "sound_gap",
        variant: "listening_review",
        category: "listening",
        score: 82
      });
    }

    // ----------------------------------------------------------
    // ⑥ 文脈不足
    // ----------------------------------------------------------

    const contextDays =
      state.groupStats.exam.daysSince;

    if (
      state.level === "1" &&
      (
        contextDays == null ||
        contextDays >=
          THRESHOLDS.CONTEXT_GAP_DAYS
      )
    ) {
      let variant = "sentence";

      if (
        state.idiom.attempt >
        state.sentence.attempt
      ) {
        variant = "paraphrase";
      }

      candidates.push({
        condition: "context_gap",
        variant,
        score: 55
      });
    }

    if (
      currentCategory === "reorder"
    ) {
      candidates.push({
        condition: "context_gap",
        variant: "grammar",
        category: "reorder",
        score: 72
      });
    }

    if (
      currentCategory === "dialogue8" ||
      currentCategory === "q10"
    ) {
      candidates.push({
        condition: "context_gap",
        variant: "discourse",
        category: currentCategory,
        score: 72
      });
    }

    // ----------------------------------------------------------
    // ⑧ 継続
    // ----------------------------------------------------------

    if (
      state.studyDays7 >=
      THRESHOLDS.HIGH_STUDY_DAYS
    ) {
      candidates.push({
        condition: "continuity",
        variant: "high",
        score: 30
      });
    } else if (
      state.studyDays7 >=
      THRESHOLDS.GOOD_STUDY_DAYS
    ) {
      candidates.push({
        condition: "continuity",
        variant: "normal",
        score: 28
      });
    }

    if (
      state.daysSinceAnyStudy === 1 &&
      state.todayAttempt > 0
    ) {
      candidates.push({
        condition: "continuity",
        variant: "return",
        score: 32
      });
    }

    return candidates;
  }

  // ============================================================
  // 条件選択
  // ============================================================

  function chooseCondition(candidates) {
    if (
      !Array.isArray(candidates) ||
      candidates.length === 0
    ) {
      return null;
    }

    const history = getHistory();

    const scored = candidates.map(candidate => {
      let score = safeNumber(candidate.score);

      // 直近に同じ条件を出していたら少し減点
      if (
        history.conditions.includes(
          candidate.condition
        )
      ) {
        score -= 15;
      }

      return {
        ...candidate,
        finalScore: score
      };
    });

    scored.sort((a, b) => {
      return b.finalScore - a.finalScore;
    });

    const topScore =
      scored[0]?.finalScore ?? 0;

    // 同程度の候補から少しランダム性を持たせる
    const nearTop = scored.filter(item => {
      return item.finalScore >= topScore - 5;
    });

    return randomItem(nearTop) || scored[0];
  }

  // ============================================================
  // action のカテゴリ補完
  // ============================================================

  function resolveAction(action, candidate) {
    if (!action) return null;

    const resolved = {
      ...action
    };

    if (!resolved.category) {
      resolved.category =
        candidate?.category || null;
    }

    if (
      resolved.category &&
      window.LearningCategories?.getCategory
    ) {
      const category =
        window.LearningCategories.getCategory(
          resolved.category
        );

      if (category?.page) {
        resolved.page = category.page;
      }
    }

    return resolved;
  }

  // ============================================================
  // アドバイス取得
  // ============================================================

  function getAdvice(options) {
    const opts = options || {};
    const state =
      opts.state ||
      analyzeLearningState(opts);

    const candidates =
      buildConditionCandidates(
        state,
        opts
      );

    const selected =
      chooseCondition(candidates);

    if (!selected) return null;

    const conditionData =
      ADVICE_DATA[selected.condition];

    if (!conditionData) return null;

    const lines =
      conditionData.variants?.[
        selected.variant
      ] || [];

    if (!lines.length) return null;

    const history = getHistory();

    const line =
      pickAvoidRecent(
        lines,
        history.advice
      );

    if (!line) return null;

    rememberAdvice(
      line.id,
      selected.condition
    );

    return {
      type: "advice",
      id: line.id,
      condition: selected.condition,
      conditionLabel:
        conditionData.label || "",
      variant: selected.variant,
      text: line.text || "",
      score: selected.finalScore,
      action: resolveAction(
        line.action,
        selected
      ),
      state
    };
  }

  // ============================================================
  // 豆知識のカテゴリ重み付け
  // ============================================================

  function getPreferredTriviaCategories(options) {
    const opts = options || {};
    const currentCategory =
      opts.currentCategory || null;

    if (!currentCategory) return [];

    if (currentCategory === "accent") {
      return [
        "accent",
        "word_family",
        "suffix"
      ];
    }

    if (currentCategory === "idiom_quiz") {
      return [
        "idiom",
        "collocation",
        "etymology"
      ];
    }

    if (
      currentCategory === "study" ||
      currentCategory === "quiz_enja" ||
      currentCategory === "quiz_jaen"
    ) {
      return [
        "polysemy",
        "etymology",
        "prefix",
        "suffix",
        "word_family",
        "collocation",
        "nuance"
      ];
    }

    if (
      currentCategory === "audio_quiz" ||
      currentCategory === "listening"
    ) {
      return [
        "accent",
        "katakana",
        "nuance"
      ];
    }

    if (
      currentCategory === "dialogue8" ||
      currentCategory === "sentence" ||
      currentCategory === "q10" ||
      currentCategory === "paraphrase_quiz" ||
      currentCategory === "reorder"
    ) {
      return [
        "collocation",
        "nuance",
        "polysemy",
        "idiom"
      ];
    }

    return [];
  }

  // ============================================================
  // 豆知識取得
  // ============================================================

  function getTrivia(options) {
    const opts = options || {};
    const history = getHistory();

    const preferred =
      getPreferredTriviaCategories(opts);

    let pool = TRIVIA_DATA;

    if (
      preferred.length &&
      Math.random() < 0.70
    ) {
      const preferredPool =
        TRIVIA_DATA.filter(item => {
          return preferred.includes(
            item.category
          );
        });

      if (preferredPool.length) {
        pool = preferredPool;
      }
    }

    const item =
      pickAvoidRecent(
        pool,
        history.trivia
      );

    if (!item) return null;

    rememberTrivia(item.id);

    return {
      type: "trivia",
      id: item.id,
      triviaCategory: item.category,
      triviaCategoryLabel:
        TRIVIA_CATEGORIES[item.category] ||
        "",
      text: item.text || "",
      action: null
    };
  }

  // ============================================================
  // 最終メッセージ
  // ============================================================

  function getCoachingMessage(options) {
    const opts = options || {};
    const state =
      analyzeLearningState(opts);

    const candidates =
      buildConditionCandidates(
        state,
        opts
      );

    const strongestScore =
      candidates.length
        ? Math.max(
            ...candidates.map(item =>
              safeNumber(item.score)
            )
          )
        : 0;

    const allowTrivia =
      opts.allowTrivia !== false;

    const forceTrivia =
      opts.forceTrivia === true;

    const forceAdvice =
      opts.forceAdvice === true;

    // 明確な弱点・未学習・学習不足がある場合は
    // 豆知識より学習アドバイスを優先
    const hasStrongAdvice =
      strongestScore >= 70;

    if (
      forceTrivia ||
      (
        allowTrivia &&
        !forceAdvice &&
        !hasStrongAdvice &&
        Math.random() <
          THRESHOLDS.TRIVIA_RATE
      )
    ) {
      const trivia =
        getTrivia(opts);

      if (trivia) return trivia;
    }

    const advice =
      getAdvice({
        ...opts,
        state
      });

    if (advice) return advice;

    const trivia =
      getTrivia(opts);

    if (trivia) return trivia;

    return {
      type: "fallback",
      id: "FALLBACK_01",
      text:
        "まず問題を解いて、できるものとまだ迷うものを仕分けてみよう。分からないものはニガテ順で繰り返し、できたものは別の形式で試す。この流れを続けると、勉強する場所がはっきりしてくるよ。",
      action: {
        category: "quiz_enja",
        label: "英→日で仕分ける",
        page: "quiz.html"
      }
    };
  }

  // ============================================================
  // 条件を指定してセリフを取得
  // デバッグ・将来の管理画面用
  // ============================================================

  function getAdviceByCondition(
    conditionKey,
    variantKey
  ) {
    const data =
      ADVICE_DATA[conditionKey];

    if (!data) return null;

    const variants =
      data.variants || {};

    const key =
      variantKey &&
      variants[variantKey]
        ? variantKey
        : Object.keys(variants)[0];

    const lines =
      variants[key] || [];

    const line =
      randomItem(lines);

    if (!line) return null;

    return {
      type: "advice",
      id: line.id,
      condition: conditionKey,
      conditionLabel:
        data.label || "",
      variant: key,
      text: line.text || "",
      action: line.action || null
    };
  }

  // ============================================================
  // 履歴リセット
  // ============================================================

  function clearDialogueHistory() {
    try {
      localStorage.removeItem(
        HISTORY_KEY
      );
    } catch {
      // noop
    }
  }

  // ============================================================
  // 旧API互換
  // ============================================================

  function legacyGetLine(
    typeKey,
    category
  ) {
    const message =
      getCoachingMessage({
        typeKey,
        legacyCategory: category
      });

    return message?.text || "";
  }

  function legacyGetReaction(
    typeKey,
    statKey
  ) {
    const message =
      getCoachingMessage({
        typeKey,
        statKey,
        allowTrivia: false,
        forceAdvice: true
      });

    return message?.text || "";
  }

  // ============================================================
  // 公開API
  // ============================================================

  return {
    TYPE_DATA,
    ADVICE_DATA,
    TRIVIA_DATA,
    TRIVIA_CATEGORIES,
    THRESHOLDS,
    SESSION_SIZE,

    analyzeLearningState,
    getCoachingMessage,
    getAdvice,
    getTrivia,
    getAdviceByCondition,
    clearDialogueHistory,

    // 旧API
    getLine(typeKey, category = "idle") {
      return legacyGetLine(
        typeKey,
        category
      );
    },

    getReaction(typeKey, statKey) {
      return legacyGetReaction(
        typeKey,
        statKey
      );
    },

    getPersonality(typeKey) {
      return (
        getTypeData(typeKey)
          .personality || ""
      );
    },

    getTone(typeKey) {
      return (
        getTypeData(typeKey).tone ||
        ""
      );
    },

    getLabel(typeKey) {
      return (
        getTypeData(typeKey).label ||
        ""
      );
    }
  };
})();
