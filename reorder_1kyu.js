window.REORDER_1KYU = [
  {
    id: "R1_PASTLIKE_001",
    stemBefore: "My aunt quickly",
    stemAfter: "in Kyoto.",
    chunks: [
      { id: "c1", text: "got" },
      { id: "c2", text: "used" },
      { id: "c3", text: "to" },
      { id: "c4", text: "living" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "My aunt quickly got used to living in Kyoto.",
    ja: "私のおばはすぐに京都で暮らすことに慣れました。",
    grammarTags: ["used_to"],
    grammarFocus: [
     "まず got / used / to は、並べ替えでよくまとまりになる形です。最初に got used to を作れるか考えます。",
    "次に、残る living を to の後ろに置きます。ここでは to は前置詞なので、後ろには動詞の原形ではなく -ing 形が来ます。",
    "used to do だと『以前は〜したものだ』ですが、この問題は got used to living なので『暮らすことに慣れた』という意味になります。"
    ],
    note: "get used to ～ing で『〜することに慣れる』を表します。used to do（以前は〜したものだ）との違いに注意します。"
  },
  {
    id: "R1_PASTLIKE_002",
    stemBefore: "He makes it",
    stemAfter: "English every day.",
    chunks: [
      { id: "c1", text: "a" },
      { id: "c2", text: "rule" },
      { id: "c3", text: "to" },
      { id: "c4", text: "practice" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "He makes it a rule to practice English every day.",
    ja: "彼は毎日英語を練習することにしています。",
    grammarTags: ["formal_object_it"],//形式目的語
    grammarFocus: [
      "make O C は『OをCの状態にする』という形です。この問題では、O が it、C が a rule です。",
     "ここでの it は形式目的語で、本当の内容は後ろの to practice English every day です。",
     "つまり make it a rule to V は、『to V することを自分の決まりにする』→『〜することにしている』という意味になります。"
    ],
    note: "make it a rule to do で『〜することにしている』を表します。"
  },
  {
    id: "R1_PASTLIKE_003",
    stemBefore: "She had",
    stemAfter: "before the race.",
    chunks: [
      { id: "c1", text: "her bike" },
      { id: "c2", text: "repaired" },
      { id: "c3", text: "by" },
      { id: "c4", text: "her father" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "She had her bike repaired by her father before the race.",
    ja: "彼女はレースの前に父親に自転車を修理してもらいました。",
    grammarTags: ["causative_verb"],//使役動詞
    grammarFocus: [
     "have は使役動詞として使うことがあり、have O C の形で『OをCの状態にする』という発展形を作れます。この問題では、O が her bike、C が repaired です。",
    "repaired は過去分詞なので、『自転車が修理された状態になる』という意味になります。つまり、彼女自身が修理したのではなく、だれかに修理してもらったことを表しています。",
    "have O V なら『Oに〜させる』ですが、have O 過去分詞 になると『Oを〜してもらう』『Oが〜される』という意味になります。この問題では by her father があるので、『父親に修理してもらった』と判断できます。"
  ],
  note: "have + O + 過去分詞 は、使役動詞 have の発展形で、『Oを〜してもらう』『Oが〜される』を表します。have + O + 動詞の原形 との違いに注意します。"
},
  {
    id: "R1_PASTLIKE_004",
    stemBefore: "You should take your umbrella with you",
    stemAfter: "hard tonight.",
    chunks: [
      { id: "c1", text: "in" },
      { id: "c2", text: "case" },
      { id: "c3", text: "it" },
      { id: "c4", text: "rains" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "You should take your umbrella with you in case it rains hard tonight.",
    ja: "今夜激しく雨が降る場合に備えて、傘を持っていった方がよいです。",
    grammarTags: ["in_case"],
    grammarFocus: [
      "in case は接続詞のはたらきをするまとまりで、『〜の場合に備えて』という意味を表します。まず in case をひとかたまりで見抜けるかがポイントです。",
    "そのあとには節が続くので、it を置いて主語を作ります。ここでは in case it rains ... という形になります。",
    "hard は rains を説明する副詞なので最後に置きます。"
  ],
  note: "in case S V は『SがVする場合に備えて』を表す接続表現です。"
  },
  {
    id: "R1_PASTLIKE_005",
    stemBefore: "",
    stemAfter: "water, these animals can survive.",
    chunks: [
      { id: "c1", text: "As" },
      { id: "c2", text: "long" },
      { id: "c3", text: "as" },
      { id: "c4", text: "there is" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "As long as there is water, these animals can survive.",
    ja: "水がある限り、これらの動物は生き残ることができます。",
    grammarTags: ["as_long_as"],
    grammarFocus: [
     "as long as は接続詞のまとまりで、『〜である限り』という意味を表します。まず As / long / as の3語をひとかたまりで見ます。",
    "そのあと there is を続けると、後ろの water につながって there is water という存在の文が完成します。",
    "つまり、[as long as] で条件を作り、その中に [there is water] を入れる構造です。条件節全体で『水がある限り』という意味になります。"
    ],
    note: "as long as で『〜である限り』を表します。"
  },
  {
    id: "R1_PASTLIKE_006",
    stemBefore: "People should live",
    stemAfter: "another.",
    chunks: [
      { id: "c1", text: "in" },
      { id: "c2", text: "harmony" },
      { id: "c3", text: "with" },
      { id: "c4", text: "one" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "People should live in harmony with one another.",
    ja: "人々は互いに調和して生きるべきです。",
    grammarTags: ["idiom"],
    grammarFocus: [
    "まず in harmony with は『〜と調和して』という熟語なので、in / harmony / with をひとかたまりで見ます。",
    "空所の後ろに another が見えているので、その前には one を置いて one another という形を作る必要があります。",
    "つまり、[in harmony with] + [one another] で『互いに調和して』という意味になります。"
  ],
  note: "in harmony with ... で『〜と調和して』、one another で『お互いに』を表します。"
  },
  {
    id: "R1_PASTLIKE_007",
    stemBefore: "My father was reading the newspaper",
    stemAfter: ".",
    chunks: [
      { id: "c1", text: "with" },
      { id: "c2", text: "his" },
      { id: "c3", text: "glasses" },
      { id: "c4", text: "on" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "My father was reading the newspaper with his glasses on.",
    ja: "父は眼鏡をかけて新聞を読んでいました。",
    grammarTags: ["with_object_complement"],
    grammarFocus: [
     "with はここでは『付帯状況』を表しています。with + O + 補語 の形で、『Oが〜の状態で』という意味を作ります。",
    "この問題では、O が his glasses、補語が on です。つまり with his glasses on で『眼鏡をかけた状態で』という意味になります。",
    "したがって、まず with を置き、そのあと目的語の his glasses を作り、最後に状態を表す on を置くと自然です。"
  ],
  note: "with + O + 補語 は付帯状況を表し、『Oが〜の状態で』という意味になります。with his glasses on は『眼鏡をかけたままで』という意味です。"
  },
  {
    id: "R1_PASTLIKE_008",
    stemBefore: "Never",
    stemAfter: "a difficult question before.",
    chunks: [
      { id: "c1", text: "have" },
      { id: "c2", text: "I" },
      { id: "c3", text: "answered" },
      { id: "c4", text: "such" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Never have I answered such a difficult question before.",
    ja: "私はこれほど難しい質問にそれまで答えたことがありません。",
   grammarTags: ["negative_inversion"],
  grammarFocus: [
    "普通の語順なら I have never answered ... です。この問題では Never という否定語が文頭に出ているので、倒置が起こります。",
    "否定語句が前に出る倒置では、その後ろの語順は疑問文の形をとります。したがって、Never の直後は have、そのあとに I が来ます。",
    "残る answered such を続けると、Never have I answered such ... という形が完成します。"
  ],
  note: "否定語句が文頭に出ると倒置が起こります。この文では Never が前に出ているので、have が主語 I の前に出ています。"
  },
  {
    id: "R1_PASTLIKE_009",
    stemBefore: "No",
    stemAfter: "tried, he could not solve it.",
    chunks: [
      { id: "c1", text: "matter" },
      { id: "c2", text: "how" },
      { id: "c3", text: "hard" },
      { id: "c4", text: "he" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "No matter how hard he tried, he could not solve it.",
    ja: "彼がどんなに一生懸命やっても、それを解くことはできませんでした。",
    grammarTags: ["no_matter_how"],//no matter howとhoweverを共通
    grammarFocus: [
      "no matter how ~ で「どれほど〜でも」という譲歩の意味になる。",
    "how の部分がwhatやwhenなど他の疑問詞で置き換わってそれぞれの意味になることもある。",
    "否定の倒置が起こるのは「否定の副詞」が文頭に出てきた時のみ。今回は、noが文頭に出てきているのではなく、もともとno matter ~ でひとまとまりの表現なので、倒置は起こらない。"
  ],
  note: "no matter how ... で『どんなに〜でも』を表します。倒置ではなく、譲歩を表すまとまりとして覚えると整理しやすいです。"
  },
  {
    id: "R1_PASTLIKE_010",
    stemBefore: "You",
    stemAfter: "your voice in the library.",
    chunks: [
      { id: "c1", text: "had" },
      { id: "c2", text: "better" },
      { id: "c3", text: "not" },
      { id: "c4", text: "raise" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "You had better not raise your voice in the library.",
    ja: "図書館では声を上げない方がいいです。",
    grammarTags: ["had_better_not_do"],//助動詞
    grammarFocus: [
      "had betterで一つの助動詞として見なす。「〜した方が良い」",
      "had betterを否定する場合は、had better notとなる。",
      "had betterは助動詞として考えれば良いので、後ろにくる動詞は原形を置く。"
    ],
    note: "had better not do で『〜しない方がよい』を表します。"
  },

  {
    id: "R1_PASTLIKE_011",
    stemBefore: "The population of Brazil is",
    stemAfter: "India.",
    chunks: [
      { id: "c1", text: "smaller" },
      { id: "c2", text: "than" },
      { id: "c3", text: "that" },
      { id: "c4", text: "of" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The population of Brazil is smaller than that of India.",
    ja: "ブラジルの人口はインドの人口より少ないです。",
    grammarTags: ["that_of_comparison"],//代名詞
    grammarFocus: [
      "空所の前に is があるので、SVCの形を考える。S=「  」の中に入るものがC。今回はsmallerが入る。",
      "smaller than が比較の骨組みになります。",
      "残る that of Indiaと続くと、このthatは既出の population を受ける形になり、「インドの人口」という意味を作れる。"
    ],
    note: "that of は、前に出た名詞を受けて『〜のそれ』を表します。"
  },
  {
    id: "R1_PASTLIKE_012",
    stemBefore: "She reads",
    stemAfter: "as her brother does.",
    chunks: [
      { id: "c1", text: "twice" },
      { id: "c2", text: "as" },
      { id: "c3", text: "many" },
      { id: "c4", text: "books" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "She reads twice as many books as her brother does.",
    ja: "彼女は兄の2倍の本を読みます。",
    grammarTags: ["x_times_as_a_as"],//倍数表現のタグ共有
    grammarFocus: [
      "A as 原級 as B「AはBと同じくらい原級だ」という比較表現。",
      "今回、booksはmany booksで「多くの本」という一つの意味のまとまりなので、as 原級 asの中にbooksも入れ込む。",
      "as-as表現の応用で、A 倍数 + as-as Bで「AはBの○倍、原級だ」という倍数表現ができる。半分「half」2倍「twice」3倍「three times」4倍「four times」"
    ],
    note: "twice as many + 名詞 + as ... で『…の2倍の数の〜』を表します。"
  },
  {
    id: "R1_PASTLIKE_013",
    stemBefore: "Our teacher made it",
    stemAfter: "the test would start at once.",
    chunks: [
      { id: "c1", text: "clear" },
      { id: "c2", text: "to" },
      { id: "c3", text: "us" },
      { id: "c4", text: "that" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Our teacher made it clear to us that the test would start at once.",
    ja: "先生は、テストがすぐ始まることを私たちにはっきり伝えました。",
    grammarTags: ["formal_object_it"],//形式目的語
    grammarFocus: [
      "make O C は『OをCの状態にする』という形です。この問題では、O が it、C が clear です。",
      "目的語itが指す内容は後ろに置かれる（=形式目的語）。to V か that S'V'でitの内容をとることができるが、今回は文の後半にS'V'があるので、that S'V'でitを受けると考える。",
      "=空所の後にthe test(S')とwould start(V')があるので、文を一つのまとまりにすることができるthatを前に置く。that S' V'~「S'がV'すること」。",
      "残っている語を繋げると、to us「私たちに」とするのが自然。このtoは不定詞toではなく、前置詞のtoだと分かる。",
      "make it clear to us that S'V'で「私たちにS'がV'するということを明確にする」という意味を作れる。"
    ],
    note: "make it clear to A that ... で『Aに…を明確に伝える』を表します。"
  },
  {
    id: "R1_PASTLIKE_014",
    stemBefore: "We must help",
    stemAfter: "in the flood.",
    chunks: [
      { id: "c1", text: "those" },
      { id: "c2", text: "who" },
      { id: "c3", text: "lost" },
      { id: "c4", text: "their homes" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "We must help those who lost their homes in the flood.",
    ja: "私たちは洪水で家を失った人たちを助けなければなりません。",
    grammarTags: ["relative_pronoun"],//関係代名詞
    grammarFocus: [
      "空所の前に help があるので、その後ろには人を表すまとまりが来ると考えます。",
      "those who V' で 「V'する人々」という意味。those にはpeopleのような意味がある。",
      "残る lost their homes を続けると、『家を失った人たち』という意味になります。"
    ],
    note: "those who ... で『…する人たち』を表します。"
  },
  {
    id: "R1_PASTLIKE_015",
    stemBefore: "She got",
    stemAfter: "after dinner.",
    chunks: [
      { id: "c1", text: "her brother" },
      { id: "c2", text: "to" },
      { id: "c3", text: "do" },
      { id: "c4", text: "the dishes" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "She got her brother to do the dishes after dinner.",
    ja: "彼女は夕食後に兄に皿を洗ってもらいました。",
    grammarTags: ["causative_verb","verb_object_to_do"],//使役動詞
    grammarFocus: [
      "空所の前に got、選択肢に「to、動詞の原形」があるので、使役の意味のgetの用法を頭に思い浮かべたい。[get A to V]で「AにVしてもらう」。",
      "他の使役動詞のmake,have,letは後ろに[使役動詞 A V]というようにtoは入らないので注意。",
      "do the dishesは「皿を洗う」という意味。"
    ],
    note: "get A to do で『Aに〜してもらう』を表します。"
  },
  {
    id: "R1_PASTLIKE_016",
    stemBefore: "I am sorry to have",
    stemAfter: "so long.",
    chunks: [
      { id: "c1", text: "kept" },
      { id: "c2", text: "you" },
      { id: "c3", text: "waiting" },
      { id: "c4", text: "here" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "I am sorry to have kept you waiting here so long.",
    ja: "ここで長い間お待たせしてすみません。",
    grammarTags: ["verb_object_ving"],//keep Vingとto have Vpp
    grammarFocus: [
      "空所の前に to have があるので、その後ろには過去分詞 kept が来ると考えます(不定詞に過去の意味をつけるときはto have Vppで「Vppしたこと」）。",
      "keep A Vingで「AをVingした状態に保つ」という直訳。今回はkept you waitingで「あなたをずっと待たせた」となる。",
      "最後に here を置くと、どこで待たせたかが自然につながります。"
    ],
    note: "keep A waiting で『Aを待たせる』を表します。"
  },
  {
    id: "R1_PASTLIKE_017",
    stemBefore: "Had",
    stemAfter: "your support, I could not have finished it.",
    chunks: [
      { id: "c1", text: "it" },
      { id: "c2", text: "not" },
      { id: "c3", text: "been" },
      { id: "c4", text: "for" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Had it not been for your support, I could not have finished it.",
    ja: "あなたの支えがなかったら、私はそれを終えられなかったでしょう。",
    grammarTags: ["if_it_were_not_for"],//仮定法過去、倒置
    grammarFocus: [
      "まず、if it were not for Aで「もしAがなければ」という定型表現を覚える。",
      "仮定法のif節中に過去の意味をつけるときはhad+VPPの形にする。今回はif it had not been for A「もしAがなかったら」となる。",
      "仮定法のifは省略することができ、その場合、倒置が起こる（疑問文の形にする）。今回はifが抜けて、hadが前に出てくる。"
    ],
    note: "Had it not been for ... は『もし〜がなかったら』を表す仮定法です。if it were not for Aの倒置の形の「were it not for A」という形も出てくる。"
  },
  {
    id: "R1_PASTLIKE_018",
    stemBefore: "Good health depends",
    stemAfter: "every day.",
    chunks: [
      { id: "c1", text: "on" },
      { id: "c2", text: "what" },
      { id: "c3", text: "we" },
      { id: "c4", text: "eat" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Good health depends on what we eat every day.",
    ja: "健康は、私たちが毎日何を食べるかにかかっています。",
    grammarTags: ["noun_clause"],//what節
    grammarFocus: [
      "空所の前に depends があるので、その後ろには on が来ると考えます。depend on A で「Aによって決まる」",
      "what S'V' で「S'がV'するもの」となる。今回はwhat we eat で「私たちが食べるもの」",
    ],
    note: "what 節は『…すること』のように、内容を1つにまとめて表します。"
  },
  {
    id: "R1_PASTLIKE_019",
    stemBefore: "Some long-distance buses have",
    stemAfter: "for travelers.",
    chunks: [
      { id: "c1", text: "what" },
      { id: "c2", text: "is" },
      { id: "c3", text: "called" },
      { id: "c4", text: "luxury seating" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Some long-distance buses have what is called luxury seating for travelers.",
    ja: "長距離バスの中には、いわゆる高級座席を備えているものがあります。",
    grammarTags: ["idiom"],//イディオム
    grammarFocus: [
      "空所の前に have があるので、その後ろには目的語として名詞のまとまりが来ると考えます。",
      "what is called がまず決まった形として見えます。what is calldで「いわゆる」。",
      "最後に luxury seating を置くと、『いわゆる高級座席』という意味になります。"
    ],
    note: "what is called ... で『いわゆる〜』を表します。"
  },
  {
    id: "R1_PASTLIKE_020",
    stemBefore: "Mary turned out to be",
    stemAfter: "the other players.",
    chunks: [
      { id: "c1", text: "far" },
      { id: "c2", text: "better" },
      { id: "c3", text: "than" },
      { id: "c4", text: "all" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Mary turned out to be far better than all the other players.",
    ja: "メアリーは他の選手たちよりずっと上手だとわかりました。",
    grammarTags: ["comparative_emphasis","infinitive_expression"],//比較
    grammarFocus: [
      "turn out to be~で「〜であることが明らかになる」という意味。空所の前に be があるので、その後ろには比較級を含む補語が来ると考えます。",
      "far+比較級で「よりずっと比較級だ」という比較の強調表現になる。他にmuch+比較級でも同じような強調表現になる。",
      "最後に than を使って比較相手につなげる."
    ],
    note: "far/much + 比較級 で『ずっと〜』と比較を強調できます。"
  }

  ,
  {
    id: "R1_PASTLIKE_021",
    stemBefore: "Brian is",
    stemAfter: "history.",
    chunks: [
      { id: "c1", text: "second" },
      { id: "c2", text: "to" },
      { id: "c3", text: "none" },
      { id: "c4", text: "in" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Brian is second to none in history.",
    ja: "ブライアンは歴史の知識では誰にも負けません。",
    grammarTags: ["idiom"],//イディオム
    grammarFocus: [
      "空所の前に is があるので、その後ろには補語が来ると考えます。",
      "second to none は強いまとまりなので、まずそこを先に作ります。",
      "最後に in を置くと、後ろの history につながります。"
    ],
    note: "second to none in Aで『Aにおいて誰にも劣らない』を表します。(これを覚える）"
  },
  {
    id: "R1_PASTLIKE_022",
    stemBefore: "He is not",
    stemAfter: "a doctor.",
    chunks: [
      { id: "c1", text: "so" },
      { id: "c2", text: "much" },
      { id: "c3", text: "a teacher" },
      { id: "c4", text: "as" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "He is not so much a teacher as a doctor.",
    ja: "彼は教師というよりむしろ医者です。",
    grammarTags: ["idiom"],//イディオム
    grammarFocus: [
      "so much A as B の形を見抜けるかがポイントです。",
      "a teacher を A に置き、最後に as を置くと後ろの a doctor につながります。"
    ],
    note: "not so much A as B で『AというよりむしろB』を表します。"
  },
  {
    id: "R1_PASTLIKE_023",
    stemBefore: "The old bridge was",
    stemAfter: "stone.",
    chunks: [
      { id: "c1", text: "filled" },
      { id: "c2", text: "with" },
      { id: "c3", text: "large" },
      { id: "c4", text: "pieces of" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The old bridge was filled with large pieces of stone.",
    ja: "その古い橋は大きな石片で満たされていました。",
    grammarTags: ["passive_in_form"],//能動的な意味を持つ受動態
    grammarFocus: [
      "空所の前に was があるので、その後ろにはVppを置き、受け身の形を作る。",
      "be filled with Aで「Aで満ちている」",
      "残る large pieces of を続けると、後ろの stone に自然につながります。"
    ],
    note: "be filled with ... で『〜で満たされている』を表します。"
  },
  {
    id: "R1_PASTLIKE_024",
    stemBefore: "The old camera is one",
    stemAfter: "items in this museum.",
    chunks: [
      { id: "c1", text: "of" },
      { id: "c2", text: "the" },
      { id: "c3", text: "most" },
      { id: "c4", text: "valuable" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The old camera is one of the most valuable items in this museum.",
    ja: "その古いカメラはこの博物館で最も価値のある品の一つです。",
    grammarTags: ["one_of_the_superlative"],//最上級
    grammarFocus: [
      "空所の前に one があるので、[one of 複数名詞]の形を考えたい。「複数名詞のうちの一つ」という意味。",
      "the most valuable が最上級のまとまりです。",
      "one of the most valuable ... の流れを作れるかがポイントです。"
    ],
    note: "one of the + 最上級 + 複数名詞 で『最も〜な…の一つ』を表します。"
  },
  {
    id: "R1_PASTLIKE_025",
    stemBefore: "It will cost a lot to",
    stemAfter: "before winter.",
    chunks: [
      { id: "c1", text: "have" },
      { id: "c2", text: "this roof" },
      { id: "c3", text: "repaired" },
      { id: "c4", text: "properly" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "It will cost a lot to have this roof repaired properly before winter.",
    ja: "冬の前にこの屋根をきちんと修理してもらうには多くのお金がかかるでしょう。",
    grammarTags: ["causative_verb"],//使役動詞
    grammarFocus: [
      "it cost to Vで「Vするのに費用がかかる」という意味。今回はto以下の部分が問われているため、まず動詞の原形haveをおく。",
      "willがあるので、これからの話をしている文脈。ここで[to have repaired this roof]としてしまうと、過去の意味を持つ不定詞(「この屋根を修理したこと」)になってしまい、時制がずれる。",
      "このhaveを使役動詞のhaveとして見なすと、have O Vppで「OをVppしてもらう」という意味を作れて、文脈にも合う。",
      "proeprlyは「きちんと」という副詞、文末におく。"
    ],
    note: "have + O + 過去分詞 は『Oを〜してもらう』の形です。"
  },
  {
    id: "R1_PASTLIKE_026",
    stemBefore: "Little",
    stemAfter: " he would win the prize.",
    chunks: [
      { id: "c1", text: "did" },
      { id: "c2", text: "we" },
      { id: "c3", text: "expect" },
      { id: "c4", text: "that" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Little did we expect ever he would win the prize.",
    ja: "彼がその賞を取るとは私たちはまったく予想していませんでした。",
    grammarTags: ["negative_inversion"],//否定語の倒置
  grammarFocus: [
    "Little はここでは否定語句（まったく〜ない）。これが文頭に出るので、後ろが疑問文の形になる（否定語の倒置）。",
    "疑問文の形になると、did we の順になる。",
    "残る expect that を続けると、Little did we expect that ... という形が完成します。"
  ],
  note: "否定語句が文頭に出ると、後ろが疑問文の形になります。この文では Little が前に出ているので、did we という語順になっています。"
  },
  {
    id: "R1_PASTLIKE_027",
    stemBefore: "I know",
    stemAfter: "him money again.",
    chunks: [
      { id: "c1", text: "better" },
      { id: "c2", text: "than" },
      { id: "c3", text: "to" },
      { id: "c4", text: "lend" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "I know better than to lend him money again.",
    ja: "私は彼にもう一度お金を貸すほど愚かではありません。",
    grammarTags: ["idiom"],//イディオム
    grammarFocus: [
      "know better than to V で「Vするほど愚かではない」というイディオム。覚えよう。",
      "最後に lend を置くと、後ろの him money again につながります。"
    ],
    note: "know better than to do で『〜するほど愚かではない』を表します。"
  },
  {
    id: "R1_PASTLIKE_028",
    stemBefore: "The delay was",
    stemAfter: "food at the shelter.",
    chunks: [
      { id: "c1", text: "due" },
      { id: "c2", text: "to" },
      { id: "c3", text: "lack" },
      { id: "c4", text: "of" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The delay was due to lack of food at the shelter.",
    ja: "その遅れは避難所の食料不足によるものでした。",
    grammarTags: ["idiom"],//表現
    grammarFocus: [
      "空所の前に was があるので、その後ろには補語が来ると考えます。",
      "due to A で「Aが原因で」という意味。",
      "そのあと lack of A で 「Aの不足」という意味。"
    ],
    note: "due to lack of ... で『〜不足のために』を表します。"
  },
  {
    id: "R1_PASTLIKE_029",
    stemBefore: "Don’t",
    stemAfter: "without a coat.",
    chunks: [
      { id: "c1", text: "get" },
      { id: "c2", text: "caught" },
      { id: "c3", text: "in" },
      { id: "c4", text: "the rain" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Don’t get caught in the rain without a coat.",
    ja: "コートなしで雨に降られないようにしなさい。",
    grammarTags: ["passive_in_form"],//受動態
    grammarFocus: [
      "空所の前に Don’t があるので、その後ろには動詞の原形が来ると考えます。",
      "get caught が中心の受け身的な形で、「〜に遭う」という意味。",
      "in the rain を続けると、よく使うまとまりになります。"
    ],
    note: "get caught in ... で『…に遭う』『…に巻き込まれる』を表します。"
  },
  {
    id: "R1_PASTLIKE_030",
    stemBefore: "It used to be",
    stemAfter: "the earth was flat.",
    chunks: [
      { id: "c1", text: "taken" },
      { id: "c2", text: "for" },
      { id: "c3", text: "granted" },
      { id: "c4", text: "that" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "It used to be taken for granted that the earth was flat.",
    ja: "かつては地球が平らだということは当然だと思われていました。",
    grammarTags: ["idiom"],//イディオム
    grammarFocus: [
      "まず[take it for granted that~]で「〜だということを当然だと思う」という表現を思い浮かべたい。",
      "今回はitが主語に出てきて、後ろが受け身になっている。空所の前に be があるので、その後ろには過去分詞 taken が来る。",
      "itが指すのはthat S'V'「S'がV'するということ」、to Vが来ることもある。"
    ],
    note: "take it for granted that ... は『…を当然と思う』を表します。受け身でもよく使われます。"
  }
  ,
  {
    id: "R1_PASTLIKE_031",
    stemBefore: "Seldom",
    stemAfter: "his old friends abroad.",
    chunks: [
      { id: "c1", text: "would" },
      { id: "c2", text: "he" },
      { id: "c3", text: "write" },
      { id: "c4", text: "to" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Seldom would he write to his old friends abroad.",
    ja: "彼は昔の友人たちに海外へ手紙を書くことはめったにありませんでした。",
    grammarTags: ["negative_inversion"],
  grammarFocus: [
    "Seldom は『めったに〜ない』という準否定語句です。これが文頭に出るので、後ろが疑問文の形になります。",
    "疑問文の形になると、would he の順になります。したがって、Seldom の直後には would、そのあとに he を置きます。",
    "残る write to を続けると、Seldom would he write to ... という形が完成します。",
    "write to A で『Aに手紙を書く』を表します。"
  ],
  note: "否定語句・準否定語句が文頭に出ると、後ろが疑問文の形になります。この文では Seldom が前に出ているので、would he という語順になっています。"
  },
  {
    id: "R1_PASTLIKE_032",
    stemBefore: "The girl stood there",
    stemAfter: "in the wind.",
    chunks: [
      { id: "c1", text: "with" },
      { id: "c2", text: "her" },
      { id: "c3", text: "hair" },
      { id: "c4", text: "blowing" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The girl stood there with her hair blowing in the wind.",
    ja: "その少女は髪を風になびかせながらそこに立っていました。",
    grammarTags: ["with_object_complement"],
    grammarFocus: [
       "with はここでは付帯状況を表し、with + O + 現在分詞 の形で『Oが〜している状態で』という意味を作ります。",
    "この問題では、O が her hair、現在分詞が blowing です。つまり with her hair blowing で『髪がなびいている状態で』となります。",
    "したがって、まず with を置き、そのあと目的語の her hair を作り、最後に blowing を置くと自然です。"
  ],
  note: "with + O + 現在分詞 は付帯状況を表し、『Oが〜している状態で』という意味になります。"
  },
  {
    id: "R1_PASTLIKE_033",
    stemBefore: "The old man sat quietly",
    stemAfter: ".",
    chunks: [
      { id: "c1", text: "with" },
      { id: "c2", text: "his" },
      { id: "c3", text: "arms" },
      { id: "c4", text: "folded" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The old man sat quietly with his arms folded.",
    ja: "その老人は腕を組んで静かに座っていました。",
    grammarTags: ["with_object_complement"],
    grammarFocus: [
      "with はここでは付帯状況を表し、with + O + 過去分詞 の形で『Oが〜された状態で』という意味を作ります。",
    "この問題では、O が his arms、過去分詞が folded です。つまり with his arms folded で『腕が組まれた状態で』となります。",
    "したがって、まず with を置き、そのあと目的語の his arms を作り、最後に folded を置くと自然です。"
  ],
  note: "with + O + 過去分詞 は付帯状況を表し、『Oが〜された状態で』という意味になります。"
  },
  {
    id: "R1_PASTLIKE_034",
    stemBefore: "She got",
    stemAfter: "before the guests arrived.",
    chunks: [
      { id: "c1", text: "her son" },
      { id: "c2", text: "to" },
      { id: "c3", text: "clean" },
      { id: "c4", text: "the room" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "She got her son to clean the room before the guests arrived.",
    ja: "彼女は客が来る前に息子に部屋を掃除してもらいました。",
    grammarTags: ["verb_object_to_do", "causative_verb"],//使役
    grammarFocus: [
      "空所の前に got、選択肢に「to、動詞の原形」があるので、使役の意味のgetの用法を頭に思い浮かべたい。[get A to V]で「AにVしてもらう」。",
      "他の使役動詞のmake,have,letは後ろに[使役動詞 A V]というようにtoは入らないので注意。"
    ],
    note: "get A to do で『Aに〜してもらう』を表します。"
  },
  {
    id: "R1_PASTLIKE_035",
    stemBefore: "We",
    stemAfter: "before the party.",
    chunks: [
      { id: "c1", text: "the walls" },
      { id: "c2", text: "painted" },
      { id: "c3", text: "had" },
      { id: "c4", text: "green" }
    ],
    answer: ["c3", "c1", "c2", "c4"],
    completed: "We had the walls painted green before the party.",
    ja: "私たちはパーティーの前に壁を緑色に塗ってもらいました。",
    grammarTags: ["causative_verb"],//使役動詞
    grammarFocus: [
      " had paintedと並べると、過去完了の形になってしまうが、過去完了はある過去の地点から見てそれよりも前のことを指すときに使う表現なので、今回は使えない。",
      "今回このhadは使役動詞のhadとして捉える。had O Vpp で「OをVppしてもらう」。今回は、[had the walls painted]で「壁を塗ってもらう。」となる。",
     "もともと paint the walls green で『壁を緑色に塗る』。green は『壁がどんな状態になるか』を表しているので、この文でも had the walls painted green として『壁を緑色に塗ってもらう』と考える。",
    ],
    note: "have + O + 過去分詞 で『Oを〜してもらう』を表します。"
  },
  {
    id: "R1_PASTLIKE_036",
    stemBefore: "Success depends",
    stemAfter: "every day.",
    chunks: [
      { id: "c1", text: "on" },
      { id: "c2", text: "what" },
      { id: "c3", text: "we" },
      { id: "c4", text: "do" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Success depends on what we do every day.",
    ja: "成功は私たちが毎日何をするかにかかっています。",
    grammarTags: ["noun_clause"],
    grammarFocus: [
      "depend on A で「Aによって決まる」",
      "what S'V' で「S'がV'すること」となる。今回はwhat we do で「私たちが行うこと」",
    ],
    note: "what 節は『…すること』のように、内容を1つにまとめて表します。"
  },
  {
    id: "R1_PASTLIKE_037",
    stemBefore: "She looked at me as",
    stemAfter: "a ghost.",
    chunks: [
      { id: "c1", text: "if" },
      { id: "c2", text: "she" },
      { id: "c3", text: "had" },
      { id: "c4", text: "seen" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "She looked at me as if she had seen a ghost.",
    ja: "彼女はまるで幽霊を見たかのように私を見た。",
    grammarTags: ["as_if"],
    grammarFocus: [
      "as if ~ 「まるで〜かのように」",
      "as ifの中は仮定法過去を用いる。過去の出来事について仮定法過去で言及する場合はhad+Vppの形をとる。",
      "今回はas if she had seen a ghostで「まるで彼女が幽霊を見たかのように」という意味になる。"
    ],
    note: "as if S' V'ed 「まるでS'がV'するかのように」、as if S' had V'pp「まるでS'がV'ppしたかのように」"
  },
  {
    id: "R1_PASTLIKE_038",
    stemBefore: "The door was closed,",
    stemAfter: ".",
    chunks: [
      { id: "c1", text: "and" },
      { id: "c2", text: "so" },
      { id: "c3", text: "were" },
      { id: "c4", text: "the window" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The door was closed, and so were the windows",
    ja: "ドアは閉められており、そして、もそうだ（閉められていた）。",
    grammarTags: ["so_neither"],
    grammarFocus: [
      "空所前にはコンマがあり、文が一旦終わっているので、接続詞(and)が続く。",
      "「S'もまたそうだ」という表現は and so V' S' のように疑問文の形になる（倒置）。",
      "類似表現で、「S'もまた〜でない」という否定の表現の場合はandではなくneitherやnorが接続詞として用いられる。"
    ],
    note: "文末にso+ do/does/have/has/had/助動詞+主語 で「主語もまたそうだ」という意味になる。 "
  },
  {
    id: "R1_PASTLIKE_039",
    stemBefore: "I find",
    stemAfter: "down requests from my colleagues..",
    chunks: [
      { id: "c1", text: "it" },
      { id: "c2", text: "difficult" },
      { id: "c3", text: "to" },
      { id: "c4", text: "turn" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "I find it difficult to turn down requests from my colleagues.",
    ja: "同僚からの頼み事を断ることが難しいと感じています。",
    grammarTags: ["formal_object_it"],//形式目的語
    grammarFocus: [
      "find O C で「O=Cだとわかる(今回は「感じる」と意訳している）」",
      "目的語Oを形式的にitで置いてその内容をto Vで示している。よって、「to V = C とわかる」となる。"
    ],
    note: "第五文型SVOCで「SはO＝CにVする」と訳せるが、Oの部分がitの時はSV it C to Vで「SはtoV=CにVする」とできる。"
  },
  {
    id: "R1_PASTLIKE_040",
    stemBefore: "This is",
    stemAfter: "restaurant in this town.",
    chunks: [
      { id: "c1", text: "by" },
      { id: "c2", text: "far" },
      { id: "c3", text: "the" },
      { id: "c4", text: "best" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "This is by far the best restaurant in this town.",
    ja: "これはこの町で断トツにいちばん良いレストランです。",
    grammarTags: ["superlative_emphasis"],//最上級の強調表現
    grammarFocus: [
      "by far + 最上級 で『断トツでいちばん〜』を表すことができる。",
      "他にもmuch + 最上級 や、the very + 最上級 でも同じような意味の強調表現になる。"
    ],
    note: "by far + 最上級 で『断トツでいちばん〜』を表します。"
  }
  ,
  {
    id: "R1_PASTLIKE_041",
    stemBefore: "Hardly",
    stemAfter: "when the lights went out.",
    chunks: [
      { id: "c1", text: "had" },
      { id: "c2", text: "the" },
      { id: "c3", text: "movie" },
      { id: "c4", text: "started" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Hardly had the movie started when the lights went out.",
    ja: "映画が始まったとたん、明かりが消えました。",
    grammarTags: ["negative_inversion"],
    grammarFocus: [
       "Hardly 「ほとんど〜ない」は準否定語句なので、文頭に出ると後ろが疑問文の形になります。",
    "元の文は、the movie had started when the lights went out. という形になりますが、Hardly が前に出るので、had the movie started という疑問文の語順になります。",
    "hardy A when Bの形で『AするとすぐにB』を表します。",
    "no sooner A than B も同じ意味なので併せて覚えたい表現です。"
  ],
  note: "否定語句・準否定語句が文頭に出ると、後ろが疑問文の形になります。この文では Hardly が前に出ているので、had the movie started という語順になっています。"
  },
  {
    id: "R1_PASTLIKE_042",
    stemBefore: "No sooner",
    stemAfter: "than the bell rang.",
    chunks: [
      { id: "c1", text: "had" },
      { id: "c2", text: "we" },
      { id: "c3", text: "sat" },
      { id: "c4", text: "down" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "No sooner had we sat down than the bell rang.",
    ja: "私たちが座るやいなや、ベルが鳴りました。",
    ggrammarTags: ["negative_inversion"],//否定の倒置
  grammarFocus: [
    "No sooner は準否定語句なので、文頭に出ると後ろが疑問文の形になります。",
    "元の文はwe had no sooner sat down than the bell rang. という形になりますが、No sooner が前に出るので、had we sat down という疑問文の語順になります。",
    "hardly A when Bも同じ意味なので併せて覚えたい表現です。"
  ],
  note: "no sooner A than B は『AするとすぐにB』を表します。No sooner が文頭に出るので、後ろは had we sat down のように疑問文の形になります。"
  },
  {
    id: "R1_PASTLIKE_043",
    stemBefore: "Never did I imagine the project would be this difficult, so please keep",
    stemAfter: ".",
    chunks: [
      { id: "c1", text: "me" },
      { id: "c2", text: "informed" },
      { id: "c3", text: "of" },
      { id: "c4", text: "any updates" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Never did I imagine the project would be this difficult, so please keep me informed of any updates.",
    ja: "そのプロジェクトがこれほど困難になるとは思いもしませんでしたので、進捗があれば随時知らせてください。",

    grammarTags: ["verb_object_pp"],//keep O Cの形
    grammarFocus: [
      "空所の前に keep があるので、その後ろには『目的語 → 補語』の流れを考えます。keep O Cの形で「OをCの状態に保つ」という意味。",
      "informは「知らせる」という意味で、keep me informed of ... は『私に…を知らせておく』という意味になります。",
      "前半のNever did I imagineの部分は、Never(否定の副詞)が文頭に出ているため、did I imagineのように疑問文の語順になっています。"
    ],
    note: "keep A informed of ... で『Aに…を知らせておく』を表します。"
  },
  {
    id: "R1_PASTLIKE_044",
    stemBefore: "I will have",
    stemAfter: "in ten minutes.",
    chunks: [
      { id: "c1", text: "my assistant" },
      { id: "c2", text: "call" },
      { id: "c3", text: "you" },
      { id: "c4", text: "back" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "I will have my assistant call you back in ten minutes.",
    ja: "私の秘書に、10分後にあなたに折り返し電話をさせます。",
    grammarTags: ["causative_verb"],//使役動詞
    grammarFocus: [
      "空所の前に have があり、選択肢内に動詞の原型callがあるので、このhaveは使役動詞として捉える。",
      "have A V で「AにVさせる」という意味の表現。今回はhave my assistant call で「私の秘書に電話をさせる」となります。",
      "call you back で「あなたに折り返し電話をする」という意味の表現。youやhimなどの代名詞の目的格は、call you backのように動詞の後ろに置くのが自然です。"
    ],
    note: "have A do で『Aに〜させる』、call you back で『あなたに折り返し電話をする』"
  },
  {
    id: "R1_PASTLIKE_045",
    stemBefore: "I will have my secretary ",
    stemAfter: ".",
    chunks: [
      { id: "c1", text: "remind" },
      { id: "c2", text: "you" },
      { id: "c3", text: "of" },
      { id: "c4", text: "the schedule" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "I will have my secretary remind you of the schedule.",
    ja: "私は秘書に、予定をあなたにお知らせさせます。",
    grammarTags: ["verb_a_of_b"],
    grammarFocus: [
      "remind A of B で『AにBを思い出させる』という意味の表現。",
      "空所前のhaveは使役動詞のhaveとして捉える。have A V で「AにVさせる」という意味の表現。今回はhave my secretary remind で「私の秘書にリマインドさせる」となります。",
    ],
    note: "remind A of B で『AにBを思い出させる』を表します。"
  },
  {
    id: "R1_PASTLIKE_046",
    stemBefore: "I didn’t",
    stemAfter: "by saying that.",
    chunks: [
      { id: "c1", text: "mean" },
      { id: "c2", text: "to" },
      { id: "c3", text: "hurt" },
      { id: "c4", text: "her" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "I didn’t mean to hurt her by saying that.",
    ja: "そう言って彼女を傷つけるつもりはありませんでした。",
    grammarTags: ["infinitive_expression"],
    grammarFocus: [
      "mean to do で『〜するつもりである』を表す表現。",
      "intend to do や aim to do も同じ意味の表現なので併せて覚えたい。",
    ],
    note: "mean to do で『〜するつもりである』を表します。"
  },
  {
    id: "R1_PASTLIKE_047",
    stemBefore: "",
    stemAfter: "the difficult English exam.",
    chunks: [
      { id: "c1", text: "hardly" },
      { id: "c2", text: "any" },
      { id: "c3", text: "students" },
      { id: "c4", text: "passed" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Hardly any students passed the difficult English exam.",
    ja: "その難しい英語の試験に合格した学生はほとんどいませんでした。",
    grammarTags: ["hardly_any"],
    grammarFocus: [
      "hardly any ... で『ほとんど〜ない』を表す表現。",
      "hardlyが文頭に来ているからといって無条件に後ろが疑問文の形になるわけではないので注意。倒置が起こるのは、否定の副詞が文頭に来る場合。今回はhardly any students という名詞句として主語に置かれているため、倒置は起こらない。"
    ],
    note: "hardly any ... で『ほとんど〜ない』を表します。"
  },
  {
    id: "R1_PASTLIKE_048",
    stemBefore: "The task turned",
    stemAfter: "easier than I expected.",
    chunks: [
      { id: "c1", text: "out" },
      { id: "c2", text: "to" },
      { id: "c3", text: "be" },
      { id: "c4", text: "much" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The task turned out to be much easier than I expected.",
    ja: "そのタスクは予想以上に簡単だったことがわかった。",
    grammarTags: ["infinitive_expression"],
    grammarFocus: [
      "turn out to be ... で『〜だとわかる』を表す表現。",
      "much + 比較級で「はるかに比較級だ」という意味の強調表現になります。",
      "than I expected は「私が予想したより」という表現。よく使います。"
    ],
    note: "turn out to be ... で『〜だとわかる』を表します。"
  },
  {
    id: "R1_PASTLIKE_049",
    stemBefore: "Please feel",
    stemAfter: "to one of our staff members for assistance.",
    chunks: [
      { id: "c1", text: "free" },
      { id: "c2", text: "to" },
      { id: "c3", text: "reach" },
      { id: "c4", text: "out" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Please feel free to reach out to one of our staff members for assistance.",
    ja: "助けが必要な際は、遠慮なく私たちのスタッフメンバーに声をかけてください。",
    grammarTags: ["idiom"],
    grammarFocus: [
      "feel free to do で『遠慮なく〜してください』を表す表現。",
      "reach out to A で「Aに連絡する」という意味の表現。",
      "for assistance で「助けが必要な際に」という意味の表現。assistance は「援助、支援」という意味の名詞。"
    ],
    note: "Don’t hesitate to do 「〜するのをためらわないで」や help yourself to A 「Aをご自由にどうぞ」も似た意味の表現なので併せて覚えたい。"
  },
  {
    id: "R1_PASTLIKE_050",
    stemBefore: "Despite the serious labor shortage, we managed",
    stemAfter: "time.",
    chunks: [
      { id: "c1", text: "to" },
      { id: "c2", text: "complete" },
      { id: "c3", text: "the project" },
      { id: "c4", text: "on" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Despite the serious labor shortage, we managed to complete the project on time.",
    ja: "厳しい労働不足にもかかわらず、私たちはなんとかそのプロジェクトを時間通りに完了させました。",
    grammarTags: ["infinitive_expression"],
    grammarFocus: [
      "空所の前に managed があるので、その後ろには to do の形が来ると考えます。manage to do で『なんとか〜する』を表す表現。",
      "on time で「時間通りに」という意味の表現。",
      "despite A で「Aにもかかわらず」という意味の表現。今回はdespite the serious labor shortage で「深刻な労働不足にもかかわらず」となります。"
    ],
    note: "manage to do で『なんとか〜する』を表します。"
  }
  ,
  {
    id: "R1_PASTLIKE_051",
    stemBefore: "I could hardly believe",
    stemAfter: ".",
    chunks: [
      { id: "c1", text: "what" },
      { id: "c2", text: "he" },
      { id: "c3", text: "said" },
      { id: "c4", text: "then" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "I could hardly believe what he said then.",
    ja: "私はそのとき彼の言ったことがほとんど信じられませんでした。",
    grammarTags: ["noun_clause"],//what節
    grammarFocus: [
      "空所の前に believe があるので、その後ろには内容を表す名詞のまとまりが来ると考えます。",
      "what S'V' で「S'がV'すること」という名詞句を作る。今回はwhat he saidで「彼が言ったこと」",
      "最後に then「そのとき」を置くと、文全体が自然につながります。"
    ],
    note: "what 節は『…すること』のように内容をまとめて表します。"
  },
  {
    id: "R1_PASTLIKE_052",
    stemBefore: "Never did I think that this project",
    stemAfter: ".",
    chunks: [
      { id: "c1", text: "would" },
      { id: "c2", text: "be" },
      { id: "c3", text: "worth" },
      { id: "c4", text: "continuing" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Never did I think that this project would be worth continuing.",
    ja: "このプロジェクトが続ける価値があるとは思いもしませんでした。",
    grammarTags: ["gerund_expression"],
    grammarFocus: [
      "空所の前に think があるので、その後ろには S'V'を含むthat 節が置かれている。",
      "be worth Ving で『Vする価値がある』を表す表現。",
      "that節中のS'はthis project が置かれているため、そのあとに would be worth continuing を置くと、S’V’が完成する。"
    ],
    note: "be worth Ving で『〜する価値がある』を表します。be worthy of A で『Aに値する』を表す表現も併せて覚えたい。"
  },
  {
    id: "R1_PASTLIKE_053",
    stemBefore: "Don't worry about the schedule; leave",
    stemAfter: ".",
    chunks: [
      { id: "c1", text: "it" },
      { id: "c2", text: "up" },
      { id: "c3", text: "to" },
      { id: "c4", text: "me" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Don't worry about the schedule; leave it up to me.",
    ja: "スケジュールのことは心配しないでください。それを私に任せてください。",
    grammarTags: ["idiom"],
    grammarFocus: [
      "空所の前に leave があるので、その後ろには目的語が来ると考えます。",
      "選択肢の語を見て、leave A up to B 『AをBに委ねる』を表す表現。を思い浮かべたい。",
    ],
    note: "leave A up to B で『AをBに委ねる』を表します。"
  },
  {
    id: "R1_PASTLIKE_054",
    stemBefore: "This question is not so",
    stemAfter: ".",
    chunks: [
      { id: "c1", text: "easy" },
      { id: "c2", text: "as" },
      { id: "c3", text: "it" },
      { id: "c4", text: "seems" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "This question is not so easy as it seems.",
    ja: "この問題は見た目ほど簡単ではありません。",
    grammarTags: ["conjunction_as"],
    grammarFocus: [
      "空所の前に is not so があるので、その後には補語を置く(=easy) 。",
      "asのイメージは「=(イコール)」。今回はas it seemsで「見た目ほど」となります。",
    ],
    note: "not so 〜 as ... で『…ほど〜ではない』を表します。"
  },
  {
    id: "R1_PASTLIKE_055",
    stemBefore: "You should not leave",
    stemAfter: ".",
    chunks: [
      { id: "c1", text: "this problem" },
      { id: "c2", text: "as" },
      { id: "c3", text: "it" },
      { id: "c4", text: "is" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "You should not leave this problem as it is.",
    ja: "この問題をそのままにしておくべきではありません。",
    grammarTags: ["verb_o_c", "conjunction_as"],
    grammarFocus: [
      "leave O C で『OをCの状態にしておく』を表す表現。",
      "O=this problem、C=as it is と考えると、leave this problem as it is で「この問題をそのままにしておく」となります。",
      "as it is「そのままの状態で』という慣用的な表現で覚える。"
    ],
    note: "leave A as it is で『Aをそのままにしておく』を表します。"
  },
  {
    id: "R1_PASTLIKE_056",
    stemBefore: "Harry ",
    stemAfter: "the problem as it is again.",
    chunks: [
      { id: "c1", text: "promised" },
      { id: "c2", text: "never" },
      { id: "c3", text: "to" },
      { id: "c4", text: "leave" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Harry promised never to leave the problem as it is again.",
    ja: "ハリーはその問題を二度とそのままにしておかないと約束しました。",
    grammarTags: ["negative_to_infinitive", "verb_o_c", "conjunction_as"],
    grammarFocus: [
      "主語Harryが置かれているので、その後ろは動詞(promised to V)を考えます。",
      "不定詞の否定はnot to do の形で表す。never to do も同じ。",
      "leave the problem as it is で「その問題をそのままにしておく」という意味の表現。"
    ],
    note: "never to do で『決して〜しない』という不定詞の否定を表せます。"
  },
  {
    id: "R1_PASTLIKE_057",
    stemBefore: "He complains",
    stemAfter: "after work.",
    chunks: [
      { id: "c1", text: "of" },
      { id: "c2", text: "not" },
      { id: "c3", text: "having" },
      { id: "c4", text: "time" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "He complains of not having time after work.",
    ja: "彼は仕事のあと時間がないと不満を言っています。",
    grammarTags: ["verb_of", "negative_having"],
    grammarFocus: [
      "complains of A「Aを不満に思う」を考えたい。",
      "今回はhaving time 「時間があること」がAにあたる。",
      "このhavingは動名詞。動名詞の否定はnot Vingの形で表す。not having time で「時間がないこと」となります。"
    ],
    note: "complain of ... で『〜を不満に思う』、not having で『持っていないこと』を表します。"
  },
  {
    id: "R1_PASTLIKE_058",
    stemBefore: "If you don’t know the word,",
    stemAfter: "your dictionary.",
    chunks: [
      { id: "c1", text: "look" },
      { id: "c2", text: "it" },
      { id: "c3", text: "up" },
      { id: "c4", text: "in" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "If you don’t know the word, look it up in your dictionary.",
    ja: "その語を知らなければ、辞書で調べなさい。",
    grammarTags: ["idiom"],
    grammarFocus: [
      "look up で「調べる」という意味の句動詞をまず思い浮かべたい。",
      "今回、look upの目的語はit。代名詞が句動詞の目的語の時は、look it upのように動詞の後ろに置くのが自然。",
      "in your dictionary で「あなたの辞書で」という意味の表現。look up in A で『Aで調べる』を表すことができる。"
    ],
    note: "look A up in B で『AをBで調べる』を表します。"
  },
  {
    id: "R1_PASTLIKE_059",
    stemBefore: "Ken has been",
    stemAfter: "Ted for years.",
    chunks: [
      { id: "c1", text: "on" },
      { id: "c2", text: "good" },
      { id: "c3", text: "terms" },
      { id: "c4", text: "with" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Ken has been on good terms with Ted for years.",
    ja: "ケンは何年もの間テッドと良好な関係にあります。",
    grammarTags: ["idiom"],
    grammarFocus: [
      "on good terms with A で『Aと仲がよい』を表す表現",
      "関連表現: get along with A: 「Aとうまくやっていく」",
      "be on a first-name basis with A: 「Aと親しい関係にある」"
    ],
    note: "be on good terms with ... で『〜と仲がよい』を表します。"
  },
  {
    id: "R1_PASTLIKE_060",
    stemBefore: "A heavy storm prevented",
    stemAfter: ".",
    chunks: [
      { id: "c1", text: "the plane" },
      { id: "c2", text: "from" },
      { id: "c3", text: "taking" },
      { id: "c4", text: "off" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "A heavy storm prevented the plane from taking off.",
    ja: "激しい嵐のため、その飛行機は離陸できませんでした。",
    grammarTags: ["verb_a_from_b"],
    grammarFocus: [
      "prevent A from ～ing で『Aが〜するのを防ぐ』を表す表現をまず思い浮かべたい。",
      "今回Aにあたるのがthe plane、fromの後ろには動名詞のtakingが来ると考える。",
      "take off で「離陸する」という意味の句動詞を思い浮かべたい。taking off で「離陸すること」となる。"
    ],
    note: "prevent A from ～ing で『Aが〜するのを防ぐ』を表します。"
  }
  ,
  {
    id: "R1_PASTLIKE_061",
    stemBefore: "This river is",
    stemAfter: "in summer.",
    chunks: [
      { id: "c1", text: "warm" },
      { id: "c2", text: "enough" },
      { id: "c3", text: "to" },
      { id: "c4", text: "swim" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "This river is warm enough to swim in summer.",
    ja: "この川は夏には泳げるほど十分暖かいです。",
    grammarTags: ["adj_enough_to_do"],
    grammarFocus: [
      "形容詞 enough to do で『〜するのに十分 形容詞 だ』を表す表現をまず思い浮かべたい。",
      "enough 形容詞 to do と並べてしまいがちなので、注意する。",
      "よく一緒に学ぶ表現で、too 形容詞 to do で『形容詞すぎて〜できない』もある。"
    ],
    note: "形容詞 + enough + to do で『〜するのに十分…だ』を表します。"
  },
  {
    id: "R1_PASTLIKE_062",
    stemBefore: "The number",
    stemAfter: "poverty is increasing.",
    chunks: [
      { id: "c1", text: "of" },
      { id: "c2", text: "people" },
      { id: "c3", text: "suffering" },
      { id: "c4", text: "from" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The number of people suffering from poverty is increasing.",
    ja: "貧困に苦しむ人々の数が増えています。",
    grammarTags: ["participle"],
    grammarFocus: [
      "the nuber of A 「Aの数」をまず思い浮かべたい。",
      "suffer from B で『Bに苦しむ』を表す表現。今回はsuffering from poverty で「貧困に苦しんでいる」となります。",
      "今回sufferingは現在分詞として名詞を修飾する(苦しんでいる〇〇)。現在分詞+αを置く位置は、名詞の後ろが自然。"
    ],
    note: "名詞の後ろに ～ing を置くと、その名詞を後ろから説明できます。"
  },
  {
  id: "R1_PASTLIKE_063",
  stemBefore: "Many students accepted",
  stemAfter: "by the teacher.",
  chunks: [
    { id: "c1", text: "the" },
    { id: "c2", text: "offer" },
    { id: "c3", text: "given" },
    { id: "c4", text: "yesterday" }
  ],
  answer: ["c1", "c2", "c3", "c4"],
  completed: "Many students accepted the offer given yesterday by the teacher.",
  ja: "多くの生徒が先生から昨日出された申し出を受け入れました。",
  grammarTags: ["participle"],
  grammarFocus: [
    "空所の前に accepted 「受け入れる」があるので、その後ろには目的語が来ると考えます。",
    "the offer が目的語にあたる。",
    "given yesterday by the teacherで「昨日先生から出された」という意味の過去分詞の形を作る。過去分詞+αを置く位置は、名詞の後ろが自然。"
  ],
  note: "名詞の後ろに過去分詞を置くと、その名詞を後ろから説明できます。"
},
  {
    id: "R1_PASTLIKE_064",
    stemBefore: "Diamonds of this size may no",
    stemAfter: "this mine.",
    chunks: [
      { id: "c1", text: "longer" },
      { id: "c2", text: "be" },
      { id: "c3", text: "found" },
      { id: "c4", text: "in" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Diamonds of this size may no longer be found in this mine.",
    ja: "この大きさのダイヤは、もはやこの鉱山では見つからないかもしれません。",
    grammarTags: ["no_longer"],
    grammarFocus: [
      "空所の前に no があるので、その後ろに longer が続くと考えます。 no longer で『もはや〜ない』を表す表現。no longerで塊としてnotの位置に置く。",
      "be found という受け身の形を作ると、may no longer be found で「もはや見つからないかもしれない」という意味の表現になる。",
      "in this mine で「この鉱山では」という意味。mineは「私のもの」以外にも「鉱山」という意味もある。"
    ],
    note: "no longer で『もはや〜ない』、be found で『見つけられる』を表します。"
  },
  {
    id: "R1_PASTLIKE_065",
    stemBefore: "The government is likely",
    stemAfter: "their electricity use.",
    chunks: [
      { id: "c1", text: "to" },
      { id: "c2", text: "make" },
      { id: "c3", text: "people" },
      { id: "c4", text: "reduce" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The government is likely to make people reduce their electricity use.",
    ja: "政府は人々に電力使用量を減らさせる可能性が高いです。",
    grammarTags: ["be_likely_to", "causative_verb"],
    grammarFocus: [
      "空所の前に likely があるので、be likely to do で『〜しそうだ』を表す表現をまず思い浮かべたい。",
      "make、名詞(people)、動詞の原形(reduce)が選択肢にあるので、使役動詞[make A do:「Aに〜させる」]の形を考える。",
      "electricity use で「電力使用量」という意味の表現。reduce electricity use で「電力使用量を減らす」という意味の表現になります。"
      
    ],
    note: "be likely to do で『〜しそうだ』、make A do で『Aに〜させる』を表します。"
  },
  {
    id: "R1_PASTLIKE_066",
    stemBefore: "Please keep",
    stemAfter: "will be closed for renovation next Monday.",
    chunks: [
      { id: "c1", text: "in" },
      { id: "c2", text: "mind" },
      { id: "c3", text: "that" },
      { id: "c4", text: "the office" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Please keep in mind that the office will be closed for renovation next Monday.",
    ja: "来週の月曜日は改装のためオフィスが閉まることを、念頭に置いてください。",
    grammarTags: ["idiom"],
    grammarFocus: [
      "keep in mind that S'V':「S'がV'することを念頭におく」を覚えよう。",
    ],
    note: ""
  },
  {
    id: "R1_PASTLIKE_067",
    stemBefore: "Mary turned out to be",
    stemAfter: "the others at tennis.",
    chunks: [
      { id: "c1", text: "far" },
      { id: "c2", text: "better" },
      { id: "c3", text: "than" },
      { id: "c4", text: "all" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Mary turned out to be far better than all the others at tennis.",
    ja: "メアリーはテニスでは他の全員よりずっと上手だとわかりました。",
    grammarTags: ["comparative_emphasis"],
    grammarFocus: [
      "空所の前に be があるので、その後ろには比較級を含む補語が来ると考えます。",
      "far+比較級で『ずっと〜』と比較を強調できます。今回はfar betterで「ずっと上手」となります。",
      "そのあと than all を続けると、後ろの the others につながり、than all the othersで「他の全員より」となります。"
    ],
    note: "far + 比較級 で『ずっと〜』と比較を強調できます。much + 比較級 も同じく比較を強調するので併せて覚えたい。"
  },
  {
  id: "R1_PASTLIKE_068",
  stemBefore: "She",
  stemAfter: "the lack of staff in her department.",
  chunks: [
    { id: "c1", text: "may" },
    { id: "c2", text: "well" },
    { id: "c3", text: "complain" },
    { id: "c4", text: "about" }
  ],
  answer: ["c1", "c2", "c3", "c4"],
  completed: "She may well complain about the lack of staff in her department.",
  ja: "彼女が部署のスタッフ不足について不満を言うのももっともだ。。",
  grammarTags: ["may_well_do"],
  grammarFocus: [
    "選択肢にmay、wellがあるので、may well do で『〜するのももっともだ』を表す表現をまず思い浮かべたい。",
    "complain about A で『Aについて不満を言う』を表す表現。今回はcomplain about the lack of staff in her department で「彼女の部署のスタッフ不足について不満を言う」となります。",
    "lack of A で『Aの不足』、in her department で「彼女の部署の中で」という意味の表現。"
  ],
  note: "may well do で『〜するのももっともだ』を表します。"
},
  {
    id: "R1_PASTLIKE_069",
    stemBefore: "The airline informed",
    stemAfter: "as soon as possible.",
    chunks: [
      { id: "c1", text: "the passengers" },
      { id: "c2", text: "of" },
      { id: "c3", text: "the flight" },
      { id: "c4", text: "delay" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The airline informed the passengers of the flight delay as soon as possible.",
    ja: "航空会社は、乗客にフライトの遅延をできるだけ早く知らせました。",
    grammarTags: ["verb_a_of_b"],
    grammarFocus: [
      "inform A of B 「AにBを知らせる」という用法。",
      "remind A of B で『AにBを思い出させる』と同じ構造。",
      "as soon as possible「できるだけ早く」も覚えよう。"
    ],
    note: "inform A of B 「AにBを知らせる」"
  },
  {
    id: "R1_PASTLIKE_070",
    stemBefore: "She was",
    stemAfter: "by all her friends.",
    chunks: [
      { id: "c1", text: "proud" },
      { id: "c2", text: "of" },
      { id: "c3", text: "being" },
      { id: "c4", text: "praised" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "She was proud of being praised by all her friends.",
    ja: "彼女は友人みんなに褒められたことを誇りに思っていました。",
    grammarTags: ["idiom","preposition_gerund", "being_pp"],
    grammarFocus: [
      "be proud of Aで「Aに誇りを持っている」",
      "of(前置詞)の後には名詞が来るので、being(動名詞）を置く。",
      "being praised で『褒められること』という受け身の動名詞になる。"
    ],
    note: "being + 過去分詞 で『〜されること』という受け身の動名詞を表します。"
  }
  ,
  {
    id: "R1_PASTLIKE_071",
    stemBefore: "What subject",
    stemAfter: "the most difficult?",
    chunks: [
      { id: "c1", text: "do" },
      { id: "c2", text: "you" },
      { id: "c3", text: "think" },
      { id: "c4", text: "is" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "What subject do you think is the most difficult?",
    ja: "どの科目がいちばん難しいと思いますか。",
    grammarTags: ["do_you_think_insertion"],
    grammarFocus: [
      "空所の前に What subject があるので、その後ろには疑問文の挿入表現が来ると考えます。",
      "do you think 「あなたはどう思う？」は疑問文の途中に挿入される。",
      "本来はWhat subject is the most difficult? という疑問文ですが、そこに do you think を挿入して、What subject [do you think] is the most difficult? という形になります。"
    ],
    note: "do you think は疑問文の途中に入ることがあります。"
  },
  {
  id: "R1_PASTLIKE_072",
  stemBefore: "They are talking about",
  stemAfter: "flowers are.",
  chunks: [
    { id: "c1", text: "how" },
    { id: "c2", text: "beautiful" },
    { id: "c3", text: "all" },
    { id: "c4", text: "those" }
  ],
  answer: ["c1", "c2", "c3", "c4"],
  completed: "They are talking about how beautiful all those flowers are.",
  ja: "彼らはそれらすべての花がどれほど美しいかについて話しています。",
  grammarTags: ["noun_clause"],//間接疑問文
  grammarFocus: [
    "空所の後ろに flowers are (主語＋be動詞)があるので、その前には how + 形容詞 が来て１つの名詞句を作ると考えます。",
    "all + 所有格 の順番",
    "how 形容詞 S' V'「どれほど〜か」。文中に疑問詞の塊が置かれるときは、その中の語順は肯定文の順番。"
  ],
  note: "how + 形容詞 で『どれほど〜か』を表します。"
},
  {
  id: "R1_PASTLIKE_073",
  stemBefore: "Who ",
  stemAfter: "by yesterday?",
  chunks: [
    { id: "c1", text: "that" },
    { id: "c2", text: "window" },
    { id: "c3", text: "broken" },
    { id: "c4", text: "was" }
  ],
  answer: ["c4", "c1", "c2", "c3"],
  completed: "Who was that window broken by yesterday?",
  ja: "昨日、その窓は誰によって割られたのですか。",
  grammarTags: ["passive_question"],
  grammarFocus: [
    "肯定文の形を考えると、[that window was broken by 〇〇 yesterday.]となる。",
    "疑問詞whoで〇〇の部分を尋ねている。なので、wasが前に出てきて、Who was that window broken by?となる。",
    
  ],
  note: "受け身の疑問文では、be 動詞のあとに主語、そのあと過去分詞が続きます。"
},
  {
    id: "R1_PASTLIKE_074",
    stemBefore: "She is",
    stemAfter: "such a difficult issue.",
    chunks: [
      { id: "c1", text: "of" },
      { id: "c2", text: "having" },
      { id: "c3", text: "solved" },
      { id: "c4", text: "proud" }
    ],
    answer: ["c4", "c1", "c2", "c3"],
    completed: "She is proud of having solved such a difficult issue.",
    ja: "彼女はそのような困難な課題を解決できたことを誇りに思っている。",
    grammarTags: ["idiom","preposition_gerund", "being_pp"],
    grammarFocus: [
      "be proud of Aで「Aに誇りを持っている」です。",
      "of(前置詞)の後には名詞が来るので、having(動名詞）を置く。",
      "haveing+Vppで「Vppしたこと」という完了の意味の動名詞を作れる。"
    ],
    note: "of having done で『〜したことを』のように完了動名詞を表せます。"
  },
 {
  id: "R1_PASTLIKE_075",
  stemBefore: "The delay in the project",
  stemAfter: "with the labor shortage.",
  chunks: [
    { id: "c1", text: "has" },
    { id: "c2", text: "something" },
    { id: "c3", text: "to" },
    { id: "c4", text: "do" }
  ],
  answer: ["c1", "c2", "c3", "c4"],
  completed: "The delay in the project has something to do with the labor shortage.",
  ja: "プロジェクトの遅延は労働不足と関係がある。",
  grammarTags: ["idiom"],
  grammarFocus: [
    "空所の前に主語である The delay in the project があるので、その後ろには動詞が来ると考えます。",
    "have something to do with A で『Aと関係がある』を表す表現を思い浮かべたい。",
    "「関係がない」を表す表現は have nothing to do with A なので、併せて覚えたい。"
  ],
  note: "have something to do with A で『Aと関係がある』を表します。have nothing to do with A で『Aと関係がない』を表します。"
},
  {
    id: "R1_PASTLIKE_076",
    stemBefore: "I am",
    stemAfter: "the final result.",
    chunks: [
      { id: "c1", text: "far" },
      { id: "c2", text: "from" },
      { id: "c3", text: "satisfied" },
      { id: "c4", text: "with" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "I am far from satisfied with the final result.",
    ja: "私はその最終結果にまったく満足していません。",
    grammarTags: ["idiom"],
    grammarFocus: [
      "far from A「Aから遠く離れている → Aではない」という意味。",
      "be satisfied with A で『Aに満足している』を表す表現。",
      "それぞれの要素を組み合わせると、far from satisfied with the final result で「最終結果にまったく満足していない」という意味の表現になります。"
    ],
    note: "far from ... で『決して〜ではない』『まったく〜でない』を表します。"
  },
  {
    id: "R1_PASTLIKE_077",
    stemBefore: "The speaker",
    stemAfter: "about the audience.",
    chunks: [
      { id: "c1", text: "nothing" },
      { id: "c2", text: "but" },
      { id: "c3", text: "complain" },
      { id: "c4", text: "does" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The speaker does nothing but complain loudly about the audience.",
    ja: "その話し手は聴衆について文句ばかり言っています。",
    grammarTags: ["idiom"],
    grammarFocus: [
      "選択肢を見てdo nothing but V で『〜ばかりする』を表す表現をまず思い浮かべたい。",
      "complain about A で『Aについて不満を言う』を表す表現。今回はcomplain about the audience で「聴衆について不満を言う」となります。",
      "have no choice but to do で『〜するしかない』という表現もあるので、併せて覚えたい。"
    ],
    note: "do nothing but V で『〜ばかりする』を表します。"
  },
  {
    id: "R1_PASTLIKE_078",
    stemBefore: "My father is an expert when",
    stemAfter: "Italian food.",
    chunks: [
      { id: "c1", text: "it" },
      { id: "c2", text: "comes" },
      { id: "c3", text: "to" },
      { id: "c4", text: "cooking" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "My father is an expert when it comes to cooking Italian food.",
    ja: "イタリア料理を作ることになると、父は専門家です。",
    grammarTags: ["idiom"],
    grammarFocus: [
      "空所の前に when があるので、その後ろには it comes to の形を考えます。",
      "when it comes to A で『Aのことになると』を表す表現。",
      "本文のtoは前置詞のtoなので、後ろには動名詞のcookingが来ると考える。"
    ],
    note: "when it comes to ... で『〜のことになると』を表します。"
  },
  {
  id: "R1_PASTLIKE_079",
  stemBefore: "Due to a lack of staff, we are",
  stemAfter: "immediately.",
  chunks: [
    { id: "c1", text: "unable" },
    { id: "c2", text: "to" },
    { id: "c3", text: "process" },
    { id: "c4", text: "the order" }
  ],
  answer: ["c1", "c2", "c3", "c4"],
  completed: "Due to a lack of staff, we are unable to process the order immediately.",
  ja: "スタッフ不足のために、私たちは注文をすぐに処理することができません。",
  grammarTags: ["infinitive_expression"],
  grammarFocus: [
    "be unable to do で『〜できない』という表現。be able to do で『〜できる』の反対の表現と併せて覚える。",
    "processは動詞で「処理する」という意味。the order で「その注文」という意味の表現。process the order で「注文を処理する」という意味の表現になります。",
    "immediately で「すぐに」という意味の副詞。文の最後に置くと自然。"
  ],
  note: "be unable to do で『〜できない』を表します。"
},
  {
    id: "R1_PASTLIKE_080",
    stemBefore: "He is the",
    stemAfter: "in business.",
    chunks: [
      { id: "c1", text: "last" },
      { id: "c2", text: "person" },
      { id: "c3", text: "to" },
      { id: "c4", text: "succeed" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "He is the last person to succeed in business.",
    ja: "彼は商売で成功しそうに最もない人物です。",
    grammarTags: ["idiom"],
    grammarFocus: [
      "the last person to do で『最も〜しそうにない人』を表す表現をまず思い浮かべたい。",
      "succeed in A で『Aで成功する』を表す表現。今回はsucceed in business で「商売で成功する」という意味の表現になります。",
      "th last person to do の言い換え表現:the most unlikely person to do"
    ],
    note: "the last person to do で『最も〜しそうにない人』を表します。"
  }

  ,
  {
    id: "R1_PASTLIKE_081",
    stemBefore: "The serious labor shortage",
    stemAfter: "workers.",
    chunks: [
      { id: "c1", text: "made" },
      { id: "c2", text: "the manager" },
      { id: "c3", text: "hire" },
      { id: "c4", text: "unskilled" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The serious labor shortage made the manager hire unskilled workers.",
    ja: "深刻な人手不足のため、マネージャーは未熟練の労働者を雇わざるを得ませんでした。",
    grammarTags: ["causative_verb"],
    grammarFocus: [
      "make A do で『Aに〜させる』を表す表現をまず思い浮かべたい。今回はAにあたるのがthe manager、doにあたるのがhireです。",
      "空所後に workers があるので、その前に unskilled を置くと「未熟練の労働者」という意味の表現になります。",
      "今回の主語はthe serious labor shortage「深刻な人手不足」であり、無生物主語として日本語は意訳している。直訳すると、「深刻な人手不足はマネージャーに未熟練の労働者を雇わさせた。」となる。"
    ],
    note: "make A do で『Aに〜させる』を表します。"
  },
  {
    id: "R1_PASTLIKE_082",
    stemBefore: "It never",
    stemAfter: "the labor shortage would affect our project so quickly.",
    chunks: [
      { id: "c1", text: "occurred" },
      { id: "c2", text: "to" },
      { id: "c3", text: "me" },
      { id: "c4", text: "that" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "It never occurred to me that the labor shortage would affect our project so quickly.",
    ja: "その人手不足が私たちのプロジェクトにこんなに早く影響を与えるとは、私は思いもよらなかった。",
    grammarTags: ["occur_to"],
    grammarFocus: [
      "occur to A で『Aに思い浮かぶ』を表す表現をまず思い浮かべたい。今回はAにあたるのがmeです。",
      "Itは形式主語で、that以下の内容が真の主語になります。that以下の内容は「人手不足が私たちのプロジェクトにこんなに早く影響を与えるということ」という意味の内容になります。",
      "空所の後ろにS'V'があるので、文を一つのまとまりにするthatを置くと自然な形になります。"
    ],
    note: "occur to A で『Aに思い浮かぶ』を表します。"
  },
  {
    id: "R1_PASTLIKE_083",
    stemBefore: "We should",
    stemAfter: "demand for eco-friendly products.",
    chunks: [
      { id: "c1", text: "take" },
      { id: "c2", text: "advantage" },
      { id: "c3", text: "of" },
      { id: "c4", text: "the growing" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "We should take advantage of the growing demand for eco-friendly products.",
    ja: "環境にやさしい製品に対する需要が増加していることを活かすべきです。",
    grammarTags: ["take_advantage_of"],
    grammarFocus: [
      "take advantage of A で『Aを利用する』を表す表現をまず思い浮かべたい。",
      "the growing demandで『増加している需要』を表す。",
      "demand for A で『Aに対する需要』を表す。今回はdemand for eco-friendly products で「環境にやさしい製品に対する需要」という意味の表現。"
    ],
    note: "take advantage of ... で『〜を利用する』を表します。"
  },
  {
    id: "R1_PASTLIKE_084",
    stemBefore: "I manage",
    stemAfter: "in English, even though my vocabulary was limited.",
    chunks: [
      { id: "c1", text: "to" },
      { id: "c2", text: "make" },
      { id: "c3", text: "myself" },
      { id: "c4", text: "understood" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "I usually manage to make myself understood in English, even though my vocabulary was limited.",
    ja: "語彙が限られていても、私はなんとか英語で自分の言いたいことをわかってもらうことができます。",
    grammarTags: ["infinitive_expression", "causative_verb"],
    grammarFocus: [
      "空所の前に manage があるので、その後ろには to do の形が来ると考えます。manage to do :『なんとか〜する』",
      "make oneself understood で『自分の言いたいことをわかってもらう』を表す表現",
      "even though S'V' で『S'V'だけれども』を表す表現。今回は even though my vocabulary was limited で「語彙が限られているけれども」"
    ],
    note: "manage to do で『なんとか〜する』、make oneself understood で『自分の言いたいことをわかってもらう』を表します。"
  },
  {
    id: "R1_PASTLIKE_085",
    stemBefore: "It is worth",
    stemAfter: "the final decision up to the experts.",
    chunks: [
      { id: "c1", text: "persuading" },
      { id: "c2", text: "them" },
      { id: "c3", text: "to" },
      { id: "c4", text: "leave" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "It is worth persuading them to leave the final decision up to the experts.",
    ja: "最終決定を専門家に任せるよう彼らを説得する価値はあります。",
    grammarTags: ["verb_object_to_do", "gerund_expression", "idiom"],
    grammarFocus: [
      "be worth が空所前にあるので、その後ろには -ing 形が来ると考えます。be worth doing で『〜する価値がある』",
      "persuade A to do で『Aを説得して〜させる』今回はAにあたるのがthem、to doにあたるのがto leave",
      "leave A up to B で『AをBに任せる』を表す表現。今回はleave the final decision up to the experts で「最終決定を専門家に任せる」となる。"
    ],
    note: "be worth doing で『〜する価値がある』、persuade A to do で『Aを説得して〜させる』、leave A up to B で『AをBに任せる』を表します。"
  },
  {
    id: "R1_PASTLIKE_086",
    stemBefore: "This app ",
    stemAfter: " vocabulary anywhere.",
    chunks: [
      { id: "c1", text: "enables" },
      { id: "c2", text: "students" },
      { id: "c3", text: "to" },
      { id: "c4", text: "learn" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "This app enables students to learn vocabulary anywhere.",
    ja: "このアプリは学生がどこでも語彙を学べるようにします。",
    grammarTags: ["verb_object_to_do"],
    grammarFocus: [
      "enable A to do で『Aが〜するのを可能にする』を表す表現をまず思い浮かべたい。",
      "allow A to do や make it possible for A to do も同じ意味の表現なので、併せて覚えたい。",
    ],
    note: "enable A to do で『Aが〜するのを可能にする』を表します。"
  },
  {
    id: "R1_PASTLIKE_087",
    stemBefore: "It is necessary to",
    stemAfter: "the sales department.",
    chunks: [
      { id: "c1", text: "take" },
      { id: "c2", text: "some staff" },
      { id: "c3", text: "out" },
      { id: "c4", text: "of" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "It is necessary to take some staff out of the sales department.",
    ja: "営業部から一部の社員を外す必要がある。",
    grammarTags: ["phrasal_verb","formal_subject_it"],
    grammarFocus: [
      "空所の前に It is necessary to があるので、その後ろには動詞の原形が来ると考えます。",
      "take A out of B で『AをBから出す』を表す表現。今回はtake some staff out of the sales department で「営業部から一部の社員を外す」となる。",
      "主語のItは形式主語で、実際の主語は後ろにあるto do以下。that S'V'で形式主語Itを取ることもある。"
    ],
    note: "take A out of B で『AをBから出す』を表します。"
  },
  {
    id: "R1_PASTLIKE_088",
    stemBefore: "Sharing information will",
    stemAfter: "from happening again.",
    chunks: [
      { id: "c1", text: "help" },
      { id: "c2", text: "prevent" },
      { id: "c3", text: "similar" },
      { id: "c4", text: "mistakes" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Sharing information will help prevent similar mistakes from happening again.",
    ja: "情報を共有することは、同様の間違いが再発するのを防ぐのに役立つでしょう。",
    grammarTags: ["verb_object_do"],
    grammarFocus: [
      "help V で『Vするのを助ける』を表す表現をまず思い浮かべたい。help A V「AをVするのを助ける」と使うこともできるが目的語を取らずにhelp Vというように動詞の原形を続けることもできる。",
      "prevent A from doing で『Aが〜するのを防ぐ』を表す表現。今回はprevent similar mistakes from happening again で「同様の間違いが再発するのを防ぐ」となる。",
      
    ],
    note: "help V で『Vするのを助ける』、prevent A from doing で『Aが〜するのを防ぐ』を表します。"
  },
  {
    id: "R1_PASTLIKE_089",
    stemBefore: "It was not until the labor shortage became serious",
    stemAfter: "take advantage of AI.",
    chunks: [
      { id: "c1", text: "that" },
      { id: "c2", text: "we" },
      { id: "c3", text: "decided" },
      { id: "c4", text: "to" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "It was not until the labor shortage became serious that we decided to take advantage of AI.",
    ja: "労働不足が深刻になって初めて、我々はAIの活用を決定した。",
    grammarTags: ["not_until","idiom","formal_subject_it"],
    grammarFocus: [
      "空所の前に It was not until があるので、その後ろには that が来る形を考えます。it was not until ... that 〜 で『〜になって初めて…した』を表す構文",
      "形式主語のItはthat以下の内容を指す。",
      "take advantage of A で『Aを利用する』を表す表現。"
    ],
    note: "It was not until ... that ... で『〜になって初めて…した』を表します。"
  },
  {
    id: "R1_PASTLIKE_090",
    stemBefore: "The person",
    stemAfter: "the best candidate turned out to be unable to work under pressure.",
    chunks: [
      { id: "c1", text: "who" },
      { id: "c2", text: "I" },
      { id: "c3", text: "thought" },
      { id: "c4", text: "was" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The person who I thought was the best candidate turned out to be unable to work under pressure.",
    ja: "私が最高の候補だと思っていたその人とは、実はプレッシャーの下で働くことができないことが判明した。",
    grammarTags: ["relative_pronoun", "infinitive_expression"],
    grammarFocus: [
      "the person turned out to be unable to work under pressure 『その人はプレッシャーの下で働くことができないことが判明した』という文とI thought (that) the person was the best candidate.「私は彼が最適な候補者であると思った」という文が組み合わさった文と捉える。",
      "the person [who I thought was the best candidate] turned out to be unable to work under pressure. という形で、関係代名詞で２文に共通のthe person をつなげる",
      "turn out to be で『〜だとわかる』、be unable to Vで「〜できない』を表す表現。今回はturn out to be unable to work under pressure で「プレッシャーの下で働くことができないとわかる」という意味の表現になります。"
    ],
    note: "who [I thought] was ... のように、関係代名詞のあとに I think などが挿入されることがあります。"
  }
  ,
  {
    id: "R1_PASTLIKE_091",
    stemBefore: "The manager decided",
    stemAfter: "the fact that we were unable to meet the deadline.",
    chunks: [
      { id: "c1", text: "to" },
      { id: "c2", text: "take" },
      { id: "c3", text: "into" },
      { id: "c4", text: "account" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The manager decided to take into account the fact that we were unable to meet the deadline.",
    ja: "マネージャーは、期限に間に合わないという事実を考慮することを決めました。",
    grammarTags: ["idiom"],
    grammarFocus: [
      "空所の前に The manager decided があるので、その後ろには不定詞の形が来ると考えます。",
      "take into account A :「Aを考慮に入れる」。take A into accountとも言える。今回はAに当たる部分が長いので後ろに置かれている。",
      "meet the deadline で『期限に間に合う』を表す表現。今回は unable to meet the deadline で「期限に間に合わない」"
    ],
    note: "take A into account で『Aを考慮に入れる』を表します。"
  },
  {
    id: "R1_PASTLIKE_092",
    stemBefore: "If",
    stemAfter: "new technology, it would be impossible to prevent the situation from worsening.",
    chunks: [
      { id: "c1", text: "it" },
      { id: "c2", text: "were" },
      { id: "c3", text: "not" },
      { id: "c4", text: "for" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "If it were not for new technology, it would be impossible to prevent the situation from worsening.",
    ja: "新しい技術がなければ、状況の悪化を防ぐことは不可能だろう。",
    grammarTags: ["if_it_were_not_for"],
    grammarFocus: [
      "if it were not for A で『Aがなければ』という意味の表現。But for A/ Without A も同じ意味の表現なので覚えたい。",
      "主文のitは形式主語で、to prevent the situation from worsening という内容が真の主語になります。",
      "prevent A from doing で『Aが〜するのを防ぐ』を表す表現。今回はprevent the situation from worsening で「状況が悪化するのを防ぐ」という意味の表現になります。"
    ],
    note: "if it were not for A で『Aがなければ』を表します。But for A/ Without A も同じ意味の表現です。"
  },
  {
    id: "R1_PASTLIKE_093",
    stemBefore: "We should take advantage of every",
    stemAfter: "the risk from the project.",
    chunks: [
      { id: "c1", text: "resource" },
      { id: "c2", text: "available" },
      { id: "c3", text: "to" },
      { id: "c4", text: "remove" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "We should take advantage of every resource available to remove the risk from the project.",
    ja: "プロジェクトのリスクを取り除くために、利用できるあらゆる資源を活用すべきです。",
    grammarTags: ["available_postmodifier"],
    grammarFocus: [
      "everyが空所前にあるので、その後ろには単数名詞が来ると考えます。今回はresourceが名詞になります。",
      "availableは形容詞で「利用できる」という意味。基本的には名詞の後ろに置く。",
      "remove A from B で『BからAを取り除く』を表す表現。今回はremove the risk from the project で「プロジェクトのリスクを取り除く」"
    ],
    note: "名詞の後ろに available を置くと、その名詞を後ろから説明できます。"
  },
  {
    id: "R1_PASTLIKE_094",
    stemBefore: "One of our team members",
    stemAfter: "unfairly.",
    chunks: [
      { id: "c1", text: "objected" },
      { id: "c2", text: "to" },
      { id: "c3", text: "being" },
      { id: "c4", text: "treated" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "One of our team members objected to being treated unfairly.",
    ja: "私たちのチームのメンバーの一人が不公平に扱われることに反対しました。",
    grammarTags: ["object_to_doing"],
    grammarFocus: [
      "object to doing で『〜することに反対する』。このtoは前置詞なので動詞の原形ではなく、名詞(動名詞)が続く。",
      "being Vpp で「Vppされること」という動名詞と受動態の組み合わせ。",
      "unfairly は副詞で「不公平に」という意味。treated を説明する語として置くと自然な形になります。"
    ],
    note: "object to doing で『〜することに反対する』を表します。"
  },
  {
    id: "R1_PASTLIKE_095",
    stemBefore: "The sudden system error",
    stemAfter: "all night to prevent the data from being lost..",
    chunks: [
      { id: "c1", text: "caused" },
      { id: "c2", text: "the team" },
      { id: "c3", text: "to" },
      { id: "c4", text: "work" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The sudden system error caused the team to work all night to prevent the data from being lost.",
    ja: "突然のシステムエラーが、チームにデータが失われるのを防ぐために一晩中働くことを強制しました。",
    grammarTags: ["verb_object_to_do"],
    grammarFocus: [
      "cause A to do で「Aに〜させる」という用法。",
      "prevent A from doing で『Aが〜するのを防ぐ』。今回はprevent the data from being lost で「データが失われるのを防ぐ」という意味の表現になります。",
      "無生物主語の文では、物事や出来事が主語になることがあります。今回はThe sudden system error「突然のシステムエラー」が主語になっています。"
    ],
    note: "cause A to do で『Aに〜させる』を表します。"
  },
  {
    id: "R1_PASTLIKE_096",
    stemBefore: "The package is",
    stemAfter: "in stores next week.",
    chunks: [
      { id: "c1", text: "expected" },
      { id: "c2", text: "to" },
      { id: "c3", text: "be" },
      { id: "c4", text: "available" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "The package is expected to be available in stores next week.",
    ja: "その商品は来週店頭に並ぶ予定です。",
    grammarTags: ["infinitive_expression"],
    grammarFocus: [
      "be expected to do で『〜する予定だ』『〜すると見込まれている』を表す表現。",
      "be available で『利用可能だ』という意味。",
      "expectは「予想する、期待する」という意味。"
          ],
    note: "be expected to do で『〜する予定だ』『〜すると見込まれている』を表します。"
  },
  {
    id: "R1_PASTLIKE_097",
    stemBefore: "Foreign travel will",
    stemAfter: "a broader view of the world.",
    chunks: [
      { id: "c1", text: "help" },
      { id: "c2", text: "you" },
      { id: "c3", text: "get" },
      { id: "c4", text: "a" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Foreign travel will help you get a broader view of the world.",
    ja: "海外旅行は、あなたが世界をより広く見る助けになるでしょう。",
    grammarTags: ["verb_object_do"],
    grammarFocus: [
      "help 人 Vで『人がVするのを助ける』を表す。",
      "help Vで『Vするのを助ける』を表すこともできる。",
    ],
    note: "help A do で『Aが〜するのを助ける』を表します。"
  },
  {
    id: "R1_PASTLIKE_098",
    stemBefore: "",
    stemAfter: "hope, the heart would break .",
    chunks: [
      { id: "c1", text: "were" },
      { id: "c2", text: "it" },
      { id: "c3", text: "not" },
      { id: "c4", text: "for" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Were it not for hope, the heart would break .",
    ja: "希望がなければ、心は壊れるだろう(望みなきとき、心破れる。ということわざ)。",
    grammarTags: ["if_it_were_not_for"],
    grammarFocus: [
      "コンマで２文が繋がれているが、接続詞がないので、倒置によって接続詞が省略されていると考える。",
      "仮定法過去の倒置で、ifを省略し、疑問文の語順で表現できる。元はIf it were not for Aで「Aがなければ」という表現",
      "今回は倒置の形で、Were it not for hopeで「希望がなければ」という意味"
    ],
    note: "if it were not for A で『Aがなければ』を表します。倒置の形で、Were it not for A も同じ意味の表現です。"
  },
  {
    id: "R1_PASTLIKE_099",
    stemBefore: "I need to",
    stemAfter: "the important meeting next week.",
    chunks: [
      { id: "c1", text: "have" },
      { id: "c2", text: "my hair" },
      { id: "c3", text: "cut" },
      { id: "c4", text: "before" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "I need to have my hair cut before the important meeting next week.",
    ja: "来週の重要な会議の前に髪を切ってもらう必要があります。",
    grammarTags: ["causative_verb"],
    grammarFocus: [
      "「髪を切ってもらう」はhave + hair + cutで表す。（使役動詞have O Vpp:『OをVppしてもらう』）",
      " cut hair とすると「(自分で)髪を切る」という意味になる。",
      "cutの活用はcut-cut-cutで、原形も過去形も過去分詞も同じ形になります。"
    ],
    note: "have + O + 過去分詞 で『Oを〜してもらう』を表します。"
  },
  {
    id: "R1_PASTLIKE_100",
    stemBefore: "Not until I lost my health",
    stemAfter: "values.",
    chunks: [
      { id: "c1", text: "did" },
      { id: "c2", text: "I" },
      { id: "c3", text: "realize" },
      { id: "c4", text: "its" }
    ],
    answer: ["c1", "c2", "c3", "c4"],
    completed: "Not until I lost my health did I realize its values.",
    ja: "健康を失って初めて、その価値に気づきました。",
    grammarTags: ["not_until","negative_inversion" ],
    grammarFocus: [
      "It was not until ~ that ... 「〜して初めて...した」という強調構文と同じような意味。Not until ~ + 疑問文の形で「〜して初めて...した」という意味。",
      "Not until ~ は否定の副詞句なので、文頭に出てきた形では、主節は疑問文の語順になります。",
      "疑問文の語順になるのは、主節。not until中のI lost my healthは副詞節中なので、通常の語順になります。",
      
    ],
    note: "類似表現:It was not until ~ that ... で『〜して初めて...した』も併せて覚える。Not until~が文頭に出てきた形では、主節は疑問文の語順になります。"
  }
];

  


