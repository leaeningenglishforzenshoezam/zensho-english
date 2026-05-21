// idiom_data_1kyu.js
// 全商英検1級 イディオムクイズ用データ（強化版・noteId整合済み）
// - 複数同義表現 paraphraseTo に対応
// - 複数対応番号 noteId / noteIds に対応
// - antonyms / note を保持
// - paraphrase_data_1kyu.js の N001〜N141 との対応を整理

(function () {
  "use strict";

  function n() {
    return Array.prototype.slice.call(arguments)
      .flat()
      .map(function (v) {
        const s = String(v || "").trim();
        if (!s) return "";
        if (/^N\d+$/i.test(s)) return s.toUpperCase();
        if (/^\d+$/.test(s)) return "N" + s.padStart(3, "0");
        return s;
      })
      .filter(Boolean);
  }

  function make(id, expression, ja, noteIds, paraphraseTo, antonyms, note, type, rank) {
    const ids = Array.isArray(noteIds) ? noteIds.slice() : [];
    const syns = Array.isArray(paraphraseTo) ? paraphraseTo.slice() : [];
    const ants = Array.isArray(antonyms) ? antonyms.slice() : [];

    return {
      id: id,
      expression: expression,
      ja: ja,
      noteId: ids,
      noteIds: ids,
      paraphraseTo: syns,
      antonyms: ants,
      rank: rank || "A",
      type: type || "熟語⇄同義表現",
      exampleEn: "",
      exampleJa: "",
      note: note || "",
      tags: [rank || "A", type || "熟語⇄同義表現"],
      variants: []
    };
  }

  const RAW = [
    make(
      "IM001",
      "look forward to",
      "～を楽しみに待つ",
      n(1),
      ["be keen to", "be eager to"],
      ["be reluctant to"],
      "look forward to は「楽しみに待つ」。be keen to / be eager to は『ぜひ～したい』。",
      "熟語⇄同義表現"
    ),
    make(
      "IM002",
      "be keen to",
      "ぜひ～したい",
      n(1),
      ["look forward to", "be eager to"],
      ["be not interested in"],
      "be keen to は『ぜひ～したい』。",
      "句⇄同義表現"
    ),
    make(
      "IM003",
      "be eager to",
      "ぜひ～したい",
      n(1),
      ["look forward to", "be keen to"],
      ["be reluctant to"],
      "be eager to は積極性が強い。",
      "句⇄同義表現"
    ),
    make(
      "IM004",
      "be reluctant to",
      "～するのに気が進まない",
      n(),
      ["be unwilling to", "hesitate to"],
      ["look forward to", "be eager to"],
      "be reluctant to は気が進まない感じ。",
      "句⇄反意表現"
    ),

    make(
      "IM005",
      "be in charge of",
      "～を担当している",
      n(2),
      ["be responsible for", "take charge of"],
      [],
      "be in charge of は担当している状態。",
      "熟語⇄同義表現"
    ),
    make(
      "IM006",
      "be responsible for",
      "～に責任がある",
      n(2, 107, 123),
      ["be in charge of", "have responsibility for"],
      [],
      "be responsible for は責任の意味がやや強い。",
      "句⇄同義表現"
    ),
    make(
      "IM007",
      "take charge of",
      "～を引き受けて管理する",
      n(2),
      ["be in charge of"],
      [],
      "take charge of は引き受ける動きが入る。",
      "熟語⇄同義表現"
    ),
    make(
      "IM008",
      "have responsibility for",
      "～に責任がある",
      n(73, 107, 123),
      ["be responsible for"],
      [],
      "名詞 responsibility を使った言い換え。",
      "句⇄同義表現"
    ),

    make(
      "IM009",
      "turn down",
      "～を断る",
      n(3),
      ["refuse", "reject"],
      ["accept", "agree to"],
      "turn down は提案や依頼を断る口語寄りの表現。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM010",
      "refuse",
      "断る、拒否する",
      n(3, 65),
      ["turn down", "reject"],
      ["accept", "agree to"],
      "refuse は一般的な『拒否する』。",
      "1語⇄同義表現"
    ),
    make(
      "IM011",
      "reject",
      "却下する、拒絶する",
      n(3),
      ["turn down", "refuse"],
      ["accept"],
      "reject はやや正式な『却下する』。",
      "1語⇄同義表現"
    ),

    make(
      "IM012",
      "as soon as possible",
      "できるだけ早く",
      n(5),
      ["as quickly as possible", "at once", "right away"],
      ["later", "after a while"],
      "as soon as possible は『可能な限り早く』。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM013",
      "at once",
      "すぐに",
      n(14),
      ["immediately", "right away", "as soon as possible"],
      [],
      "at once は『すぐに』。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM014",
      "right away",
      "すぐに",
      n(),
      ["at once", "immediately"],
      [],
      "right away はやや会話的。",
      "定型表現⇄同義表現"
    ),

    make(
      "IM015",
      "because of",
      "～のために、～が原因で",
      n(22, 34, 37, 68, 94, 105, 118),
      ["due to", "owing to", "on account of"],
      [],
      "because of は最も一般的。後ろは名詞。",
      "前置詞表現⇄同義表現"
    ),
    make(
      "IM016",
      "due to",
      "～のために、～が原因で",
      n(22, 34, 37),
      ["because of", "owing to"],
      [],
      "due to は because of より少しかたい。",
      "前置詞表現⇄同義表現"
    ),
    make(
      "IM017",
      "owing to",
      "～のために",
      n(),
      ["because of", "due to"],
      [],
      "owing to はややかたい表現。",
      "前置詞表現⇄同義表現"
    ),
    make(
      "IM018",
      "on account of",
      "～のために",
      n(),
      ["because of", "due to"],
      [],
      "on account of も少しかたい原因表現。",
      "前置詞表現⇄同義表現"
    ),

    make(
      "IM019",
      "succeed in",
      "～することに成功する",
      n(11),
      ["manage to", "be able to"],
      ["fail to", "be unable to"],
      "succeed in は成功した結果を強調する。",
      "熟語⇄同義表現"
    ),
    make(
      "IM020",
      "manage to",
      "なんとか～する",
      n(),
      ["succeed in", "be able to"],
      ["fail to"],
      "manage to は苦労してなんとかできた感じ。",
      "熟語⇄同義表現"
    ),

    make(
      "IM021",
      "have no idea",
      "全く分からない",
      n(13),
      ["have no clue", "don't know at all"],
      ["know well", "understand clearly"],
      "have no idea は『全く分からない』。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM022",
      "have no clue",
      "見当もつかない",
      n(),
      ["have no idea"],
      ["know well"],
      "have no clue はやや口語的。",
      "定型表現⇄同義表現"
    ),

    make(
      "IM023",
      "on purpose",
      "わざと",
      n(47),
      ["intentionally", "deliberately"],
      ["by chance", "accidentally"],
      "on purpose は会話でもよく使う『わざと』。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM024",
      "by chance",
      "偶然に",
      n(17, 103),
      ["accidentally", "happen to"],
      ["on purpose", "intentionally"],
      "by chance は『偶然に』。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM025",
      "happen to",
      "たまたま～する",
      n(17, 76, 103),
      ["by chance", "come across"],
      ["on purpose"],
      "happen to V は『たまたまVする』。",
      "熟語⇄同義表現"
    ),
    make(
      "IM026",
      "come across",
      "偶然出会う、偶然見つける",
      n(17, 76),
      ["happen to meet", "meet by chance"],
      [],
      "come across は偶然見つける・出会う。",
      "句動詞⇄同義表現"
    ),

    make(
      "IM027",
      "be allowed to",
      "～することを許されている",
      n(19),
      ["be permitted to", "can"],
      ["be forbidden to", "must not"],
      "be allowed to は一般的な許可表現。",
      "句⇄同義表現"
    ),
    make(
      "IM028",
      "be permitted to",
      "～することを許されている",
      n(),
      ["be allowed to"],
      ["be forbidden to"],
      "be permitted to はやや正式。",
      "句⇄同義表現"
    ),
    make(
      "IM029",
      "be forbidden to",
      "～することを禁じられている",
      n(),
      ["must not"],
      ["be allowed to", "be permitted to"],
      "許可の反対側として覚えたい表現。",
      "句⇄反意表現"
    ),

    make(
      "IM030",
      "prefer A to B",
      "BよりAを好む",
      n(21),
      ["like A better than B"],
      [],
      "prefer A to B はややかため。to を使う。",
      "比較表現"
    ),
    make(
      "IM031",
      "like A better than B",
      "BよりAの方が好きだ",
      n(21),
      ["prefer A to B"],
      [],
      "会話で使いやすい表現。",
      "比較表現"
    ),

    make(
      "IM032",
      "lead to",
      "～につながる、～を引き起こす",
      n(22),
      ["cause", "bring about", "result in"],
      ["prevent", "stop"],
      "lead to は結果としてつながる感じ。",
      "熟語⇄同義表現"
    ),
    make(
      "IM033",
      "bring about",
      "～を引き起こす",
      n(),
      ["lead to", "cause", "result in"],
      [],
      "bring about は変化などを引き起こす。",
      "熟語⇄同義表現"
    ),
    make(
      "IM034",
      "result in",
      "結果として～になる、～をもたらす",
      n(),
      ["lead to", "cause"],
      [],
      "result in は結果を強調する。",
      "熟語⇄同義表現"
    ),

    make(
      "IM035",
      "apologize to A for B",
      "BのことでAに謝る",
      n(23),
      ["say sorry to A for B"],
      ["blame A for B", "accuse A of B"],
      "apologize は少しかしこまった謝罪表現。",
      "熟語⇄同義表現"
    ),
    make(
      "IM036",
      "say sorry to",
      "～に謝る",
      n(23),
      ["apologize to"],
      [],
      "say sorry は会話的な表現。",
      "熟語⇄同義表現"
    ),

    make(
      "IM037",
      "take care of",
      "～の世話をする",
      n(25),
      ["look after", "care for"],
      ["neglect", "ignore"],
      "take care of は広く使える。",
      "熟語⇄同義表現"
    ),
    make(
      "IM038",
      "look after",
      "～の世話をする",
      n(25),
      ["take care of", "care for"],
      [],
      "look after は人・動物の世話に自然。",
      "熟語⇄同義表現"
    ),
    make(
      "IM039",
      "care for",
      "～の世話をする",
      n(),
      ["take care of", "look after"],
      [],
      "care for には『好む』の意味もあるので文脈注意。",
      "熟語⇄同義表現"
    ),

    make(
      "IM040",
      "reach an agreement",
      "合意に達する",
      n(26),
      ["come to an agreement", "agree"],
      ["disagree"],
      "reach an agreement は話し合いの末に合意する感じ。",
      "熟語⇄同義表現"
    ),
    make(
      "IM041",
      "come to an agreement",
      "合意に達する",
      n(26),
      ["reach an agreement", "agree"],
      ["disagree"],
      "come to an agreement もよく使う定型。",
      "熟語⇄同義表現"
    ),

    make(
      "IM042",
      "encourage A to",
      "Aに～するよう励ます",
      n(28),
      ["advise A to", "urge A to"],
      ["discourage A from"],
      "encourage は励まして促す。",
      "構文⇄同義表現"
    ),
    make(
      "IM043",
      "urge A to",
      "Aに強く～するよう促す",
      n(28),
      ["encourage A to", "advise A to"],
      ["discourage A from"],
      "urge は強く促す感じ。",
      "構文⇄同義表現"
    ),
    make(
      "IM044",
      "advise A to",
      "Aに～するよう助言する",
      n(28),
      ["encourage A to", "urge A to"],
      [],
      "advise は助言のニュアンス。",
      "構文⇄同義表現"
    ),

    make(
      "IM045",
      "come to mind",
      "心に浮かぶ",
      n(29),
      ["occur to", "remember"],
      ["slip one's mind", "forget"],
      "come to mind は自然に思い浮かぶ感じ。",
      "熟語⇄同義表現"
    ),
    make(
      "IM046",
      "occur to",
      "ふと思いつく",
      n(),
      ["come to mind"],
      [],
      "occur to 人 は考えがふっと浮かぶ。",
      "熟語⇄同義表現"
    ),

    make(
      "IM047",
      "unless",
      "もし～でなければ",
      n(31, 110),
      ["if ... not"],
      [],
      "unless は if not の言い換えとして重要。",
      "接続表現"
    ),

    make(
      "IM048",
      "make an effort to",
      "～しようと努力する",
      n(35, 77),
      ["make efforts to", "try hard to", "work hard to"],
      ["give up"],
      "make an effort to は1回の努力にも使える。",
      "熟語⇄同義表現"
    ),
    make(
      "IM049",
      "make efforts to",
      "～しようと努力する",
      n(35, 77),
      ["make an effort to", "try hard to", "work hard to"],
      ["give up"],
      "make efforts to はややかたい。",
      "熟語⇄同義表現"
    ),
    make(
      "IM050",
      "try hard to",
      "一生懸命～しようとする",
      n(39, 77),
      ["make an effort to", "work hard to"],
      ["give up"],
      "try hard to は最も使いやすい。",
      "熟語⇄同義表現"
    ),
    make(
      "IM051",
      "work hard to",
      "懸命に～する",
      n(39, 77),
      ["try hard to", "make efforts to"],
      [],
      "work hard to は継続的努力の感じ。",
      "熟語⇄同義表現"
    ),

    make(
      "IM052",
      "prevent A from doing",
      "Aが～するのを防ぐ",
      n(35),
      ["stop A from doing", "keep A from doing"],
      ["allow A to do", "enable A to do"],
      "prevent はかため。from を忘れやすい。",
      "構文⇄同義表現"
    ),
    make(
      "IM053",
      "stop A from doing",
      "Aが～するのを止める",
      n(),
      ["prevent A from doing", "keep A from doing"],
      ["allow A to do"],
      "stop は一般的。",
      "構文⇄同義表現"
    ),
    make(
      "IM054",
      "keep A from doing",
      "Aが～するのを妨げる",
      n(),
      ["prevent A from doing", "stop A from doing"],
      [],
      "keep はそうならない状態を保つ感じ。",
      "構文⇄同義表現"
    ),

    make(
      "IM055",
      "a lack of",
      "～の不足",
      n(37),
      ["shortage of", "not enough"],
      ["plenty of", "enough"],
      "lack は不足という状態。",
      "名詞表現⇄同義表現"
    ),
    make(
      "IM056",
      "shortage of",
      "～の不足",
      n(),
      ["a lack of", "not enough"],
      ["plenty of"],
      "shortage は物資・人員不足に使いやすい。",
      "名詞表現⇄同義表現"
    ),

    make(
      "IM057",
      "be far from",
      "決して～ではない、～にはほど遠い",
      n(41),
      ["not at all", "nowhere near"],
      ["be close to", "be almost"],
      "be far from は強い否定に近い。",
      "句⇄同義表現"
    ),
    make(
      "IM058",
      "nowhere near",
      "全然～ではない",
      n(),
      ["be far from", "not at all"],
      [],
      "nowhere near は口語的で強調が強い。",
      "句⇄同義表現"
    ),

    make(
      "IM059",
      "from time to time",
      "時々",
      n(51),
      ["sometimes", "once in a while", "occasionally"],
      ["always", "never"],
      "from time to time は『時々』。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM060",
      "once in a while",
      "時々",
      n(),
      ["from time to time", "sometimes"],
      [],
      "once in a while も時々の意味で便利。",
      "定型表現⇄同義表現"
    ),

    make(
      "IM061",
      "be against",
      "～に反対している",
      n(53, 83),
      ["disagree with", "oppose"],
      ["be for", "agree with", "support"],
      "be against は状態としての反対。",
      "句⇄同義表現"
    ),
    make(
      "IM062",
      "disagree with",
      "～に反対する、意見が合わない",
      n(83),
      ["be against", "oppose"],
      ["agree with"],
      "disagree with は意見が合わないことを表す。",
      "熟語⇄同義表現"
    ),

    make(
      "IM063",
      "at first sight",
      "一目見て",
      n(57),
      ["as soon as one sees"],
      [],
      "at first sight は一目見ての定型表現。",
      "定型表現"
    ),

    make(
      "IM064",
      "to be honest",
      "正直に言うと",
      n(58),
      ["frankly speaking", "to tell the truth"],
      [],
      "to be honest は会話的。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM065",
      "frankly speaking",
      "率直に言うと",
      n(58),
      ["to be honest", "to tell the truth"],
      [],
      "frankly speaking は少しかため。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM066",
      "to tell the truth",
      "実を言うと",
      n(),
      ["to be honest", "frankly speaking"],
      [],
      "会話でも書き言葉でも使いやすい。",
      "定型表現⇄同義表現"
    ),

    make(
      "IM067",
      "look into",
      "～を調べる",
      n(59),
      ["investigate", "examine"],
      ["ignore", "overlook"],
      "look into は原因や事情を調べるときに自然。",
      "熟語⇄同義表現"
    ),

    make(
      "IM068",
      "there is no denying that",
      "～は否定できない",
      n(128),
      ["it is impossible to deny that"],
      [],
      "『～は明らかだ』に近い強い表現。",
      "構文言い換え"
    ),
    make(
      "IM069",
      "there is no ~ing",
      "～することはできない、～しても無理だ",
      n(60),
      ["it is impossible to"],
      [],
      "there is no solving のように使う。",
      "構文言い換え"
    ),

    make(
      "IM070",
      "get rid of",
      "～を取り除く",
      n(61),
      ["remove", "eliminate"],
      ["keep", "leave"],
      "get rid of は不要なものを除く感じ。",
      "熟語⇄同義表現"
    ),

    make(
      "IM071",
      "make progress in",
      "～で進歩する",
      n(62),
      ["improve", "make improvement in"],
      ["make no progress", "get worse"],
      "make progress in は進歩を表す定番表現。",
      "熟語⇄同義表現"
    ),

    make(
      "IM072",
      "depend on",
      "～に頼る",
      n(67, 134),
      ["rely on", "count on"],
      ["be independent of"],
      "depend on は最も基本的。",
      "熟語⇄同義表現"
    ),
    make(
      "IM073",
      "rely on",
      "～に頼る",
      n(),
      ["depend on", "count on"],
      ["be independent of"],
      "rely on は depend on とほぼ同じ。",
      "熟語⇄同義表現"
    ),
    make(
      "IM074",
      "count on",
      "～を当てにする、頼りにする",
      n(134),
      ["depend on", "rely on"],
      [],
      "count on は会話でもよく使う。",
      "熟語⇄同義表現"
    ),
    make(
      "IM075",
      "be independent of",
      "～に頼らない、～から独立している",
      n(67),
      ["not depend on", "not rely on"],
      ["depend on", "rely on"],
      "independent は依存していない意味。",
      "句⇄反意表現"
    ),

    make(
      "IM076",
      "call off",
      "～を中止する",
      n(68),
      ["cancel"],
      ["hold", "carry out"],
      "call off は予定されていたものを中止する。",
      "句動詞⇄同義表現"
    ),

    make(
      "IM077",
      "make believe",
      "ふりをする",
      n(72),
      ["pretend", "pretend that"],
      ["tell the truth", "be honest"],
      "make believe はやや特殊だが知っていると強い。",
      "熟語⇄同義表現"
    ),

    make(
      "IM078",
      "to the best of one's ability",
      "できる限り、精一杯",
      n(81),
      ["as well as one can", "as ... as one can"],
      [],
      "ややかための定型表現。",
      "定型表現"
    ),

    make(
      "IM079",
      "figure out",
      "理解する、解決する",
      n(82, 108),
      ["understand", "find out", "work out"],
      ["fail to understand"],
      "figure out は考えて理解する感じ。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM080",
      "find out",
      "調べて分かる",
      n(),
      ["figure out", "learn"],
      [],
      "find out は調べて知る感じ。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM081",
      "work out",
      "解決する、理解する",
      n(),
      ["figure out"],
      [],
      "問題・計画などを解く感じで使う。",
      "句動詞⇄同義表現"
    ),

    make(
      "IM082",
      "look up to",
      "～を尊敬する",
      n(86),
      ["respect", "admire"],
      ["look down on"],
      "look up to は人への尊敬。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM083",
      "look down on",
      "～を見下す",
      n(),
      ["despise"],
      ["look up to", "respect"],
      "尊敬の反対側としてセットで覚えたい。",
      "句動詞⇄反意表現"
    ),

    make(
      "IM084",
      "make up one's mind",
      "決心する",
      n(87),
      ["decide", "make a decision"],
      ["hesitate", "be undecided"],
      "make up one's mind は『心を決める』。",
      "熟語⇄同義表現"
    ),
    make(
      "IM085",
      "make a decision",
      "決定する",
      n(87),
      ["decide", "make up one's mind"],
      [],
      "名詞 decision を使う言い換え。",
      "定型表現⇄同義表現"
    ),

    make(
      "IM086",
      "as planned",
      "予定通りに",
      n(88, 132),
      ["on schedule", "as scheduled"],
      ["behind schedule", "late"],
      "as planned は計画通り。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM087",
      "on schedule",
      "予定通りに",
      n(88, 132),
      ["as planned", "as scheduled"],
      ["behind schedule"],
      "on schedule は時間・予定表通り。",
      "定型表現⇄同義表現"
    ),

    make(
      "IM088",
      "be willing to",
      "進んで～するつもりがある",
      n(89),
      ["be happy to", "be ready to"],
      ["be unwilling to", "be reluctant to"],
      "willing は自発的な気持ち。",
      "句⇄同義表現"
    ),

    make(
      "IM089",
      "it's on me",
      "私のおごりです",
      n(90),
      ["I'll pay", "I'll treat you"],
      ["it's on you"],
      "会話で非常によく使う。",
      "会話表現"
    ),
    make(
      "IM090",
      "I'll treat you",
      "私がおごります",
      n(),
      ["it's on me", "I'll pay"],
      [],
      "treat は『おごる』。",
      "会話表現"
    ),

    make(
      "IM091",
      "talk A into doing",
      "Aを説得して～させる",
      n(91),
      ["persuade A to"],
      ["talk A out of doing"],
      "talk 人 into は会話的でよく出る。",
      "構文⇄同義表現"
    ),
    make(
      "IM092",
      "talk A out of doing",
      "Aを説得して～しないようにさせる",
      n(),
      ["discourage A from doing"],
      ["talk A into doing"],
      "into / out of の対比で覚えると強い。",
      "構文⇄反意表現"
    ),

    make(
      "IM093",
      "it goes without saying that",
      "～は言うまでもない",
      n(92),
      ["needless to say"],
      [],
      "文全体を導く定型表現。",
      "定型表現"
    ),
    make(
      "IM094",
      "needless to say",
      "言うまでもなく",
      n(92),
      ["it goes without saying that"],
      [],
      "文頭に置きやすい。",
      "定型表現"
    ),

    make(
      "IM095",
      "take off",
      "～を脱ぐ、取り除く",
      n(93),
      ["remove"],
      ["put on", "wear"],
      "服・帽子・靴などでよく使う。",
      "句動詞⇄同義表現"
    ),

    make(
      "IM096",
      "if it were not for",
      "もし～がなければ",
      n(94),
      ["without", "but for"],
      [],
      "現在・未来の仮定。",
      "仮定表現"
    ),
    make(
      "IM097",
      "if it had not been for",
      "もし～がなかったなら",
      n(105, 124),
      ["without", "but for"],
      [],
      "過去の仮定。",
      "仮定表現"
    ),
    make(
      "IM098",
      "but for",
      "もし～がなければ",
      n(124),
      ["without", "if it were not for", "if it had not been for"],
      [],
      "発展的だが頻出。",
      "仮定表現"
    ),

    make(
      "IM099",
      "be available",
      "利用可能である、空いている",
      n(95),
      ["be free", "be open"],
      ["be unavailable", "be occupied", "be fully booked"],
      "available は席・部屋・時間などに使える。",
      "状態表現"
    ),
    make(
      "IM100",
      "be fully booked",
      "満席・満室である",
      n(95),
      ["have no rooms available", "be occupied"],
      ["be available", "be vacant"],
      "予約がいっぱいの意味。",
      "状態表現"
    ),

    make(
      "IM101",
      "take place",
      "行われる、起こる",
      n(96, 130),
      ["be held", "occur", "happen"],
      ["be canceled", "be called off"],
      "行事にも出来事にも使える重要表現。",
      "熟語⇄同義表現"
    ),

    make(
      "IM102",
      "no more than",
      "たった～、～しかない",
      n(97),
      ["only"],
      ["more than", "at least"],
      "少なさを強調する表現。",
      "定型表現"
    ),

    make(
      "IM103",
      "never fail to",
      "必ず～する",
      n(98),
      ["always"],
      ["fail to", "never"],
      "直訳と逆に感じやすいので注意。",
      "定型表現"
    ),

    make(
      "IM104",
      "deal with",
      "～に対処する",
      n(99),
      ["handle", "cope with"],
      ["avoid", "ignore"],
      "deal with は最も幅広く使える。",
      "熟語⇄同義表現"
    ),
    make(
      "IM105",
      "cope with",
      "～に対処する",
      n(),
      ["deal with", "handle"],
      [],
      "cope with は困難への対処に向く。",
      "熟語⇄同義表現"
    ),

    make(
      "IM106",
      "call for",
      "～を必要とする",
      n(33, 55, 100),
      ["require", "need"],
      ["do without", "not require"],
      "call for は少しかたいが頻出。",
      "熟語⇄同義表現"
    ),

    make(
      "IM107",
      "make use of",
      "～を利用する、活用する",
      n(102),
      ["take advantage of", "use"],
      ["waste", "miss"],
      "make use of は『活用する』の感じ。",
      "熟語⇄同義表現"
    ),
    make(
      "IM108",
      "take advantage of",
      "～を利用する",
      n(102),
      ["make use of", "use"],
      [],
      "良い意味でも悪い意味でも使うので文脈注意。",
      "熟語⇄同義表現"
    ),

    make(
      "IM109",
      "make sense",
      "意味をなす、筋が通る",
      n(45, 104),
      ["be understandable", "be clear"],
      ["make no sense", "be unclear"],
      "make sense は超重要表現。",
      "熟語⇄同義表現"
    ),
    make(
      "IM110",
      "make no sense",
      "意味をなさない",
      n(),
      ["be unclear"],
      ["make sense"],
      "否定形もセットで覚えたい。",
      "熟語⇄反意表現"
    ),

    make(
      "IM111",
      "remind A of B",
      "AにBを思い出させる",
      n(106),
      ["make A remember B"],
      [],
      "remember との主語関係に注意。",
      "構文⇄同義表現"
    ),

    make(
      "IM112",
      "suffer from",
      "～に苦しむ",
      n(109),
      ["have trouble with", "be troubled by"],
      ["recover from", "get over"],
      "病気・問題・貧困など幅広く使える。",
      "熟語⇄同義表現"
    ),

    make(
      "IM113",
      "put up with",
      "～を我慢する",
      n(112),
      ["stand", "bear", "endure"],
      ["refuse to accept"],
      "put up with は日常的によく使う。",
      "熟語⇄同義表現"
    ),

    make(
      "IM114",
      "look like",
      "～に似ている",
      n(113),
      ["resemble", "be similar to"],
      ["be different from"],
      "look like は見た目の類似。",
      "熟語⇄同義表現"
    ),

    make(
      "IM115",
      "have a habit of",
      "～する癖がある",
      n(114, 133),
      ["be in the habit of", "often"],
      ["seldom", "rarely"],
      "habit は単なる頻度より癖・習慣を表す。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM116",
      "be in the habit of",
      "～する習慣がある",
      n(),
      ["have a habit of"],
      [],
      "少しかための言い方。",
      "定型表現⇄同義表現"
    ),

    make(
      "IM117",
      "fill in",
      "～に記入する",
      n(115),
      ["fill out", "complete"],
      ["leave blank", "leave incomplete"],
      "form と相性がよい。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM118",
      "fill out",
      "～に記入する",
      n(),
      ["fill in", "complete"],
      [],
      "AmE では fill out もよく使う。",
      "句動詞⇄同義表現"
    ),

    make(
      "IM119",
      "be delayed by",
      "～によって遅れる",
      n(118),
      ["be late because of"],
      ["arrive on time", "be on schedule"],
      "交通・予定の遅れで重要。",
      "受け身表現"
    ),

    make(
      "IM120",
      "get over",
      "～を乗り越える、～から立ち直る",
      n(121),
      ["recover from", "overcome"],
      ["suffer from", "be troubled by"],
      "get over は病気・悲しみ・困難に使える。",
      "句動詞⇄同義表現"
    ),

    make(
      "IM121",
      "learn by heart",
      "暗記する",
      n(122),
      ["memorize"],
      ["forget"],
      "learn by heart は丸ごと覚える感じ。",
      "熟語⇄同義表現"
    ),

    make(
      "IM122",
      "catch the bus",
      "バスに間に合う",
      n(125),
      ["take the bus", "make it to the bus"],
      ["miss the bus", "not make it to the bus"],
      "catch は『間に合う』の意味で重要。",
      "定型表現"
    ),
    make(
      "IM123",
      "miss the bus",
      "バスに乗り遅れる",
      n(125),
      ["not make it to the bus"],
      ["take the bus", "catch the bus"],
      "catch the bus の反対側。",
      "定型表現"
    ),

    make(
      "IM124",
      "bring up",
      "～を育てる",
      n(126),
      ["raise"],
      ["neglect"],
      "bring up は育てる過程を感じさせる。",
      "句動詞⇄同義表現"
    ),

    make(
      "IM125",
      "stand for",
      "～を表す、～の略である",
      n(127),
      ["represent"],
      [],
      "略語説明でとても重要。",
      "熟語⇄同義表現"
    ),

    make(
      "IM126",
      "it is no use doing",
      "～しても無駄だ",
      n(136),
      ["it is useless to", "it is hopeless to"],
      ["it is useful to", "it is worth doing"],
      "no use は会話でもよく出る。",
      "構文言い換え"
    ),

    make(
      "IM127",
      "be concerned about",
      "～を心配している",
      n(137),
      ["be anxious about", "be worried about"],
      ["be unconcerned about"],
      "concerned はやや落ち着いた心配。",
      "句⇄同義表現"
    ),
    make(
      "IM128",
      "be anxious about",
      "～を不安に思っている",
      n(50, 137),
      ["be worried about", "be concerned about"],
      [],
      "anxious は不安がやや強い。",
      "句⇄同義表現"
    ),

    make(
      "IM129",
      "know better than to",
      "～するほど愚かではない",
      n(138),
      ["be wise enough not to"],
      ["be foolish enough to"],
      "非常に大事な定型構文。",
      "構文言い換え"
    ),

    make(
      "IM130",
      "drop A a line",
      "Aにひとこと連絡する",
      n(139),
      ["write to A"],
      [],
      "手紙・メールを短く送る感じの会話表現。",
      "会話表現"
    ),

    make(
      "IM131",
      "put off",
      "～を延期する",
      n(140),
      ["postpone", "delay"],
      ["carry out", "hold as planned"],
      "put off は『延期する』で重要。",
      "句動詞⇄同義表現"
    ),

    make(
      "IM132",
      "much less",
      "まして～ない",
      n(141),
      ["still less", "let alone"],
      [],
      "否定文の後ろに置く定型。",
      "定型表現"
    ),
    make(
      "IM133",
      "still less",
      "まして～ない",
      n(),
      ["much less", "let alone"],
      [],
      "much less よりややかたい。",
      "定型表現"
    ),
    make(
      "IM134",
      "let alone",
      "まして～ない、～は言うまでもなく",
      n(),
      ["much less", "still less", "not to mention"],
      [],
      "let alone も非常に覚えたい。",
      "定型表現"
    ),

    make(
      "IM135",
      "be known for",
      "～で知られている",
      n(16),
      ["be famous for"],
      [],
      "famous for とほぼ同義で頻出。",
      "句⇄同義表現"
    ),
    make(
      "IM136",
      "be famous for",
      "～で有名である",
      n(16),
      ["be known for"],
      [],
      "known for とセットで整理したい。",
      "句⇄同義表現"
    ),

    make(
      "IM137",
      "be likely to",
      "～しそうだ",
      n(48),
      ["will probably", "be expected to"],
      ["be unlikely to"],
      "likely は可能性が高い。",
      "構文⇄同義表現"
    ),
    make(
      "IM138",
      "be unlikely to",
      "～しそうにない",
      n(131),
      ["will probably not"],
      ["be likely to"],
      "unlikely は low probability。",
      "構文⇄反意表現"
    ),
    make(
      "IM139",
      "the last person to",
      "最も～しそうにない人",
      n(48),
      ["be least likely to"],
      ["be most likely to"],
      "the last person to V は定型で強い。",
      "定型表現"
    ),

    make(
      "IM140",
      "be willing to",
      "喜んで～する",
      n(89),
      ["be happy to", "be ready to"],
      ["be reluctant to"],
      "再重要表現として本体収録。",
      "句⇄同義表現"
    ),

    // ===== ここから追加分（paraphrase側との対応補強） =====

    make(
      "IM141",
      "be absent from",
      "～を欠席する",
      n(7),
      ["miss"],
      ["attend", "be present at"],
      "be absent from は『～を欠席する』。",
      "句⇄同義表現"
    ),

    make(
      "IM142",
      "on the rise",
      "増加して、上昇して",
      n(9),
      ["increasing", "going up"],
      ["declining", "decreasing"],
      "on the rise は『増加傾向にある』。",
      "定型表現"
    ),

    make(
      "IM143",
      "bring in",
      "～を導入する",
      n(18),
      ["introduce"],
      ["remove", "take away"],
      "bring in は制度・新商品・新システムなどの導入に使う。",
      "句動詞⇄同義表現"
    ),

    make(
      "IM144",
      "account for",
      "～を説明する",
      n(52),
      ["explain"],
      [],
      "account for は『理由を説明する』で重要。",
      "熟語⇄同義表現"
    ),

    make(
      "IM145",
      "contribute to",
      "～の一因となる、～に貢献する",
      n(54),
      ["help cause", "lead to"],
      ["prevent", "hinder"],
      "contribute to は文脈によって『貢献する』『一因となる』の両方で使う。",
      "熟語⇄同義表現"
    ),

    make(
      "IM146",
      "it was not long before",
      "まもなく～した",
      n(63),
      ["soon", "before long"],
      [],
      "it was not long before ～ は『ほどなくして～した』。",
      "構文言い換え"
    ),

    make(
      "IM147",
      "room for improvement",
      "改善の余地",
      n(69),
      ["possibility of improvement"],
      ["no room for improvement"],
      "little room for improvement の形でもよく使う。",
      "名詞表現"
    ),

    make(
      "IM148",
      "be superior to",
      "～より優れている",
      n(84),
      ["be better than"],
      ["be inferior to"],
      "superior は than ではなく to を使う。",
      "比較表現"
    ),

    make(
      "IM149",
      "make sense of",
      "～を理解する",
      n(117),
      ["understand", "figure out"],
      ["fail to understand"],
      "make sense of は『意味を理解する』。",
      "熟語⇄同義表現"
    ),

    make(
      "IM150",
      "be beyond one's understanding",
      "理解を超えている、理解できない",
      n(135),
      ["can't follow", "can't understand"],
      ["understand", "follow"],
      "be beyond one's understanding は『理解の範囲を超えている』。",
      "句⇄同義表現"
    ),
 
    // ===== IM151〜IM250 追加分 =====

    make(
      "IM151",
      "take part in",
      "～に参加する",
      n(),
      ["participate in", "join"],
      [],
      "take part in は活動・行事・イベントなどに参加する意味。",
      "熟語⇄同義表現"
    ),
    make(
      "IM152",
      "participate in",
      "～に参加する",
      n(),
      ["take part in", "join"],
      [],
      "participate in は take part in より少しかしこまった表現。",
      "熟語⇄同義表現"
    ),
    make(
      "IM153",
      "be involved in",
      "～に関わっている",
      n(),
      ["take part in", "be connected with"],
      [],
      "活動・計画・事件などに関係していることを表す。",
      "句⇄同義表現"
    ),
    make(
      "IM154",
      "play an important role in",
      "～で重要な役割を果たす",
      n(),
      ["be important in", "contribute to"],
      [],
      "社会・教育・環境などの説明文で使いやすい表現。",
      "熟語⇄同義表現"
    ),
    make(
      "IM155",
      "in spite of",
      "～にもかかわらず",
      n(),
      ["despite", "although"],
      [],
      "後ろには名詞・動名詞が来る。although は後ろに文が来る。",
      "逆接表現"
    ),
    make(
      "IM156",
      "despite",
      "～にもかかわらず",
      n(),
      ["in spite of", "although"],
      [],
      "in spite of とほぼ同じ意味。やや書き言葉寄り。",
      "逆接表現"
    ),
    make(
      "IM157",
      "no matter how",
      "どれだけ～しても",
      n(),
      ["however"],
      [],
      "no matter how hard you try のように使う譲歩表現。",
      "譲歩表現"
    ),
    make(
      "IM158",
      "no matter what",
      "何があっても、何を～しても",
      n(),
      ["whatever"],
      [],
      "no matter what happens で『何が起こっても』。",
      "譲歩表現"
    ),
    make(
      "IM159",
      "in fact",
      "実際に、実を言うと",
      n(),
      ["actually", "to tell the truth"],
      [],
      "事実を強調するときに使う表現。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM160",
      "in advance",
      "前もって",
      n(),
      ["beforehand"],
      ["at the last minute"],
      "予約・準備・連絡などでよく使う。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM161",
      "in addition to",
      "～に加えて",
      n(),
      ["besides", "as well as"],
      [],
      "追加情報を述べるときの前置詞表現。",
      "前置詞表現⇄同義表現"
    ),
    make(
      "IM162",
      "in contrast to",
      "～とは対照的に",
      n(),
      ["unlike", "compared with"],
      [],
      "比較・対比を表す表現。",
      "前置詞表現⇄同義表現"
    ),
    make(
      "IM163",
      "according to",
      "～によると",
      n(),
      ["based on"],
      [],
      "情報源・資料・調査結果を示すときに使う。",
      "前置詞表現"
    ),
    make(
      "IM164",
      "as a result of",
      "～の結果として",
      n(),
      ["because of", "due to"],
      [],
      "原因・結果の関係を表す。後ろは名詞句。",
      "前置詞表現⇄同義表現"
    ),
    make(
      "IM165",
      "break out",
      "発生する、勃発する",
      n(),
      ["start suddenly", "occur"],
      [],
      "戦争・火事・病気など、よくない出来事が突然起こるときに使う。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM166",
      "come into existence",
      "生まれる、出現する",
      n(),
      ["begin to exist", "appear"],
      [],
      "制度・考え・文化などが存在するようになることを表す。",
      "熟語⇄同義表現"
    ),
    make(
      "IM167",
      "spread all over the world",
      "世界中に広がる",
      n(),
      ["become global", "spread worldwide"],
      [],
      "文化・技術・インターネットなどが世界中に広がる文脈で使う。",
      "熟語⇄同義表現"
    ),
    make(
      "IM168",
      "all over the world",
      "世界中で",
      n(),
      ["around the world", "throughout the world"],
      [],
      "世界中で、世界各地でという意味の定型表現。",
      "定型表現⇄同義表現"
    ),
    make(
      "IM169",
      "at one's best",
      "最高の状態で",
      n(),
      ["in the best condition"],
      ["at one's worst"],
      "be at its best で『最もよい状態で』。",
      "定型表現"
    ),
    make(
      "IM170",
      "ask A for B",
      "AにBを求める",
      n(),
      ["request B from A"],
      [],
      "ask the city for better services のように使う。",
      "構文⇄同義表現"
    ),
    make(
      "IM171",
      "make a request for",
      "～を要請する",
      n(),
      ["ask for", "request"],
      [],
      "request を名詞で使った表現。ややかたい。",
      "名詞表現⇄同義表現"
    ),
    make(
      "IM172",
      "now that",
      "今や～なので、～だから",
      n(),
      ["since", "because"],
      [],
      "状況が変わったことを理由として述べる表現。",
      "接続表現"
    ),
    make(
      "IM173",
      "as long as",
      "～する限り",
      n(),
      ["if", "provided that"],
      [],
      "条件を表す。as long as S V の形で使う。",
      "条件表現"
    ),
    make(
      "IM174",
      "keep up with",
      "～についていく",
      n(),
      ["follow", "stay level with"],
      [],
      "授業・変化・時代・情報などについていく意味。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM175",
      "look over",
      "～をざっと確認する",
      n(),
      ["check", "examine briefly"],
      [],
      "書類・答案・レポートなどをざっと確認する。look into とは違う。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM176",
      "go over",
      "～を確認する、復習する",
      n(),
      ["review", "check"],
      [],
      "内容・計画・答案などを見直すときに使う。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM177",
      "be ill at ease",
      "落ち着かない、不安である",
      n(),
      ["feel uncomfortable", "feel nervous"],
      ["feel at ease"],
      "試験・面接・慣れない場所などで落ち着かない感じ。",
      "句⇄同義表現"
    ),
    make(
      "IM178",
      "feel at ease",
      "安心する、くつろぐ",
      n(),
      ["feel comfortable", "relax"],
      ["be ill at ease"],
      "安心している、落ち着いている状態を表す。",
      "句⇄同義表現"
    ),
    make(
      "IM179",
      "take on",
      "～を引き受ける、雇う",
      n(),
      ["accept", "employ"],
      [],
      "仕事・責任を引き受ける意味でも、人を雇う意味でも使う。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM180",
      "take over",
      "～を引き継ぐ",
      n(),
      ["succeed to", "assume control of"],
      [],
      "仕事・会社・役割などを引き継ぐときに使う。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM181",
      "make suggestions",
      "提案する",
      n(),
      ["suggest", "express ideas"],
      [],
      "ideas を出す、提案するという意味。",
      "名詞表現⇄同義表現"
    ),
    make(
      "IM182",
      "put forward a proposal",
      "提案を出す",
      n(),
      ["make a proposal", "suggest"],
      [],
      "会議・ビジネス・社会問題の文脈で使いやすい。",
      "熟語⇄同義表現"
    ),
    make(
      "IM183",
      "take the place of",
      "～に取って代わる",
      n(),
      ["replace"],
      [],
      "人・物・制度などに取って代わるという意味。",
      "熟語⇄同義表現"
    ),
    make(
      "IM184",
      "be worth doing",
      "～する価値がある",
      n(),
      ["be worthwhile to do"],
      ["be useless to do"],
      "worth の後ろは動名詞。This book is worth reading. の形で使う。",
      "構文表現"
    ),
    make(
      "IM185",
      "be crucial to",
      "～にとって極めて重要である",
      n(),
      ["be very important to", "be essential to"],
      [],
      "important より強く、不可欠に近い重要性を表す。",
      "句⇄同義表現"
    ),
    make(
      "IM186",
      "be familiar with",
      "～をよく知っている、～に慣れている",
      n(),
      ["know well", "be used to"],
      [],
      "人・場所・方法・機械などによく慣れていることを表す。",
      "句⇄同義表現"
    ),
    make(
      "IM187",
      "keep in touch with",
      "～と連絡を取り合う",
      n(),
      ["stay in contact with"],
      [],
      "連絡を取り合い続けるという意味。",
      "熟語⇄同義表現"
    ),
    make(
      "IM188",
      "get in touch with",
      "～と連絡を取る",
      n(),
      ["contact"],
      [],
      "連絡を取るという一回の動作。keep in touch with との違いに注意。",
      "熟語⇄同義表現"
    ),
    make(
      "IM189",
      "be disappointed with",
      "～にがっかりしている",
      n(),
      ["be not satisfied with"],
      ["be satisfied with"],
      "結果・答え・サービスなどに失望していることを表す。",
      "句⇄反意表現"
    ),
    make(
      "IM190",
      "be satisfied with",
      "～に満足している",
      n(),
      ["be pleased with"],
      ["be disappointed with"],
      "結果・答え・サービスなどに満足していることを表す。",
      "句⇄反意表現"
    ),
    make(
      "IM191",
      "too ... to do",
      "あまりに…なので～できない",
      n(),
      ["so ... that S cannot"],
      [],
      "too difficult to understand などの形で使う。",
      "構文言い換え"
    ),
    make(
      "IM192",
      "so ... that S cannot",
      "とても…なのでSは～できない",
      n(),
      ["too ... to do"],
      [],
      "too ... to do と言い換えられる重要構文。",
      "構文言い換え"
    ),
    make(
      "IM193",
      "have difficulty doing",
      "～するのに苦労する",
      n(),
      ["have trouble doing", "find it difficult to do"],
      [],
      "後ろは動名詞。difficulty の後に doing が来る点に注意。",
      "構文表現"
    ),
    make(
      "IM194",
      "have trouble doing",
      "～するのに苦労する",
      n(),
      ["have difficulty doing"],
      [],
      "have difficulty doing とほぼ同じ。やや会話的。",
      "構文表現"
    ),
    make(
      "IM195",
      "be aware of",
      "～に気づいている、～を認識している",
      n(),
      ["know", "realize"],
      ["be unaware of"],
      "危険・問題・重要性などを認識していることを表す。",
      "句⇄同義表現"
    ),
    make(
      "IM196",
      "be fluent in",
      "～に堪能である",
      n(),
      ["speak ... fluently"],
      [],
      "言語を流ちょうに話せることを表す。",
      "句⇄同義表現"
    ),
    make(
      "IM197",
      "have a good command of",
      "～を自在に使える、～に堪能である",
      n(),
      ["be fluent in", "be good at"],
      [],
      "言語・技能を高いレベルで使えることを表す。ややかたい。",
      "熟語⇄同義表現"
    ),
    make(
      "IM198",
      "draw near",
      "近づく",
      n(),
      ["approach", "come near"],
      [],
      "期限・季節・台風などが近づくときに使える。",
      "熟語⇄同義表現"
    ),
    make(
      "IM199",
      "take A into account",
      "Aを考慮に入れる",
      n(),
      ["consider A"],
      ["ignore A"],
      "意見・状況・費用などを判断材料に入れる意味。",
      "熟語⇄同義表現"
    ),
    make(
      "IM200",
      "make fun of",
      "～をからかう",
      n(),
      ["laugh at", "tease"],
      ["respect"],
      "人をばかにしてからかう表現。",
      "熟語⇄同義表現"
    ),

    make(
      "IM201",
      "be related to",
      "～に関係している",
      n(),
      ["be connected with", "have something to do with"],
      ["be unrelated to"],
      "人・物事・問題などが関係していることを表す。",
      "句⇄同義表現"
    ),
    make(
      "IM202",
      "be connected with",
      "～と関係がある",
      n(),
      ["be related to", "have something to do with"],
      [],
      "be related to より少しかしこまった表現。",
      "句⇄同義表現"
    ),
    make(
      "IM203",
      "have something to do with",
      "～と関係がある",
      n(),
      ["be related to", "be connected with"],
      ["have nothing to do with"],
      "直訳は『～と何か関係がある』。",
      "熟語⇄同義表現"
    ),
    make(
      "IM204",
      "have nothing to do with",
      "～とは関係がない",
      n(),
      ["be unrelated to"],
      ["have something to do with"],
      "～とは全く関係がないことを表す。",
      "熟語⇄反意表現"
    ),
    make(
      "IM205",
      "be different from",
      "～と異なる",
      n(),
      ["differ from"],
      ["be similar to"],
      "比較・対比で使う基本表現。",
      "句⇄反意表現"
    ),
    make(
      "IM206",
      "be similar to",
      "～に似ている",
      n(),
      ["resemble", "be like"],
      ["be different from"],
      "見た目だけでなく、性質・内容が似ている場合にも使える。",
      "句⇄同義表現"
    ),
    make(
      "IM207",
      "be suitable for",
      "～に適している",
      n(),
      ["be appropriate for", "be fit for"],
      ["be unsuitable for"],
      "目的・人・場所などに合っていることを表す。",
      "句⇄同義表現"
    ),
    make(
      "IM208",
      "be appropriate for",
      "～にふさわしい",
      n(),
      ["be suitable for"],
      ["be inappropriate for"],
      "suitable より少しかしこまった表現。",
      "句⇄同義表現"
    ),
    make(
      "IM209",
      "be full of",
      "～でいっぱいである",
      n(),
      ["be filled with"],
      ["be empty of"],
      "物だけでなく、感情などにも使える。",
      "句⇄同義表現"
    ),
    make(
      "IM210",
      "be filled with",
      "～で満たされている",
      n(),
      ["be full of"],
      ["be empty of"],
      "be full of とほぼ同じ。受け身の形で使う。",
      "句⇄同義表現"
    ),
    make(
      "IM211",
      "be short of",
      "～が不足している",
      n(),
      ["lack", "do not have enough"],
      ["have enough"],
      "お金・時間・人手などが不足している状態を表す。",
      "句⇄同義表現"
    ),
    make(
      "IM212",
      "run short of",
      "～が不足する",
      n(),
      ["begin to lack", "almost run out of"],
      [],
      "不足し始める、足りなくなるという動きを表す。",
      "熟語⇄同義表現"
    ),
    make(
      "IM213",
      "run out of",
      "～を使い果たす",
      n(),
      ["use up"],
      [],
      "時間・お金・食料などがなくなることを表す。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM214",
      "be out of order",
      "故障している",
      n(),
      ["be broken", "not work"],
      ["be in order"],
      "機械・設備などが故障していることを表す。",
      "句⇄同義表現"
    ),
    make(
      "IM215",
      "be in order",
      "整っている、正常である",
      n(),
      ["be working", "be correct"],
      ["be out of order"],
      "機械が正常、または物事が整っていることを表す。",
      "句⇄反意表現"
    ),
    make(
      "IM216",
      "take measures to",
      "～するための対策を取る",
      n(),
      ["take action to"],
      [],
      "環境・安全・健康問題などで使いやすい表現。",
      "熟語⇄同義表現"
    ),
    make(
      "IM217",
      "take action to",
      "～するために行動を起こす",
      n(),
      ["take measures to"],
      [],
      "問題解決のために具体的な行動を取ることを表す。",
      "熟語⇄同義表現"
    ),
    make(
      "IM218",
      "make up for",
      "～を埋め合わせる",
      n(),
      ["compensate for"],
      [],
      "失った時間・不足・失敗などを補う意味。",
      "句動詞⇄同義表現"
    ),
    make(
      "IM219",
      "compensate for",
      "～を補償する、埋め合わせる",
      n(),
      ["make up for"],
      [],
      "make up for よりかたい。損失や不足を補う表現。",
      "熟語⇄同義表現"
    ),
    make(
      "IM220",
      "be proud of",
      "～を誇りに思う",
      n(),
      ["take pride in"],
      [],
      "人・成果・学校・国などを誇りに思うときに使う。",
      "句⇄同義表現"
    ),
    make(
      "IM221",
      "take pride in",
      "～を誇りに思う",
      n(),
      ["be proud of"],
      [],
      "pride を名詞で使った表現。ややかたい。",
      "熟語⇄同義表現"
    ),
    make(
      "IM222",
      "be afraid of",
      "～を恐れている",
      n(),
      ["fear", "be scared of"],
      [],
      "名詞・動名詞を後ろに取る。be afraid to do との違いに注意。",
      "句⇄同義表現"
    ),
    make(
      "IM223",
      "be afraid to do",
      "～するのを恐れる",
      n(),
      ["be scared to do"],
      [],
      "実際に行動することを怖がるときに使う。",
      "句⇄同義表現"
    ),
    make(
      "IM224",
      "be ashamed of",
      "～を恥じている",
      n(),
      ["feel ashamed of"],
      ["be proud of"],
      "自分の行動・失敗などを恥じる表現。",
      "句⇄反意表現"
    ),
    make(
      "IM225",
      "be interested in",
      "～に興味がある",
      n(),
      ["take an interest in"],
      ["be not interested in"],
      "人・物・活動などに興味があることを表す。",
      "句⇄同義表現"
    ),
    make(
      "IM226",
      "take an interest in",
      "～に興味を持つ",
      n(),
      ["be interested in"],
      [],
      "interest を名詞で使った表現。",
      "熟語⇄同義表現"
    ),
    make(
      "IM227",
      "pay attention to",
      "～に注意を払う",
      n(),
      ["take notice of", "focus on"],
      ["ignore"],
      "授業・説明・安全などに注意を向ける表現。",
      "熟語⇄同義表現"
    ),
    make(
      "IM228",
      "take notice of",
      "～に気づく、注意を払う",
      n(),
      ["pay attention to", "notice"],
      ["ignore"],
      "人・物事に気づく、注意を向ける意味。",
      "熟語⇄同義表現"
    ),
    make(
      "IM229",
      "take care not to",
      "～しないように気をつける",
      n(),
      ["be careful not to"],
      [],
      "失敗や危険を避けるために注意する表現。",
      "構文表現"
    ),
    make(
      "IM230",
      "be careful not to",
      "～しないように注意する",
      n(),
      ["take care not to"],
      [],
      "not to の位置に注意。be careful not to forget など。",
      "構文表現"
    ),
    make(
      "IM231",
      "make sure that",
      "必ず～する、～を確かめる",
      n(),
      ["confirm that", "be sure that"],
      [],
      "確認する、確実に～するという意味。",
      "構文表現"
    ),
    make(
      "IM232",
      "be sure to",
      "必ず～する",
      n(),
      ["make sure to", "never fail to"],
      [],
      "Be sure to lock the door. のように命令文でよく使う。",
      "構文表現"
    ),
    make(
      "IM233",
      "be supposed to",
      "～することになっている",
      n(),
      ["be expected to"],
      [],
      "予定・規則・義務を表す表現。",
      "句⇄同義表現"
    ),
    make(
      "IM234",
      "be expected to",
      "～することが期待されている、～する見込みである",
      n(),
      ["be supposed to", "be likely to"],
      [],
      "期待・予定・見込みを表す表現。",
      "句⇄同義表現"
    ),
    make(
      "IM235",
      "be forced to",
      "～せざるを得ない",
      n(),
      ["have to", "be made to"],
      [],
      "外からの力・状況によって仕方なくする感じ。",
      "句⇄同義表現"
    ),
    make(
      "IM236",
      "be obliged to",
      "～する義務がある",
      n(),
      ["be required to", "have to"],
      [],
      "義務を表すややかたい表現。",
      "句⇄同義表現"
    ),
    make(
      "IM237",
      "be accustomed to",
      "～に慣れている",
      n(),
      ["be used to", "be familiar with"],
      [],
      "後ろは名詞・動名詞。be accustomed to living など。",
      "句⇄同義表現"
    ),
    make(
      "IM238",
      "be ready to",
      "～する準備ができている",
      n(),
      ["be prepared to"],
      [],
      "準備ができている状態を表す。",
      "句⇄同義表現"
    ),
    make(
      "IM239",
      "be prepared to",
      "～する準備ができている、覚悟がある",
      n(),
      ["be ready to"],
      [],
      "be ready to より少しかしこまった表現。",
      "句⇄同義表現"
    ),
    make(
      "IM240",
      "it is likely that",
      "～である可能性が高い",
      n(),
      ["probably", "be likely to"],
      ["it is unlikely that"],
      "可能性が高いことを表す構文。",
      "構文表現"
    ),
    make(
      "IM241",
      "be certain that",
      "～を確信している、～は確かである",
      n(),
      ["be sure that"],
      [],
      "確信していることを表す。ややかたい。",
      "句⇄同義表現"
    ),
    make(
      "IM242",
      "be sure that",
      "～を確信している",
      n(),
      ["be certain that"],
      [],
      "be certain that より会話的。",
      "句⇄同義表現"
    ),
    make(
      "IM243",
      "for the purpose of",
      "～する目的で",
      n(),
      ["in order to", "so as to"],
      [],
      "目的を表すややかたい表現。後ろは名詞・動名詞。",
      "目的表現"
    ),
    make(
      "IM244",
      "in order to",
      "～するために",
      n(),
      ["so as to", "for the purpose of"],
      [],
      "目的を表す基本表現。",
      "目的表現"
    ),
    make(
      "IM245",
      "so as to",
      "～するために",
      n(),
      ["in order to"],
      [],
      "in order to と近い。ややかたい。",
      "目的表現"
    ),
    make(
      "IM246",
      "for fear of",
      "～を恐れて、～しないように",
      n(),
      ["because of fear of"],
      [],
      "悪いことが起こるのを恐れて、という意味。",
      "前置詞表現"
    ),
    make(
      "IM247",
      "in case of",
      "～の場合には",
      n(),
      ["if there is"],
      [],
      "後ろは名詞。in case S V との違いに注意。",
      "条件表現"
    ),
    make(
      "IM248",
      "in case",
      "～の場合に備えて、～するといけないので",
      n(),
      ["if", "because something may happen"],
      [],
      "in case S V の形で、何かに備える意味を表す。",
      "条件表現"
    ),
    make(
      "IM249",
      "as far as I know",
      "私の知る限りでは",
      n(),
      ["to my knowledge"],
      [],
      "自分の知識の範囲を示す表現。",
      "定型表現"
    ),
    make(
      "IM250",
      "as far as I am concerned",
      "私に関する限り、私の意見では",
      n(),
      ["in my opinion"],
      [],
      "自分の立場・意見を述べるときに使う。",
      "定型表現"
    )
  ];

  window.IDIOM_DATA_1KYU = RAW;
})();
