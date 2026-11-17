/* 大問7とは独立した語句クイズ。
 * 各行は [英語, 正答, 誤答1, 誤答2, 誤答3]。
 *
 * 保存履歴に使うIDは行番号から作るため、
 * 既存行の並べ替えはせず末尾へ追加してください。
 */
(function () {
  const rows = {
    q7_set_001: [
      ["replace", "取り替える", "修理する", "借りる", "運ぶ"],
      ["belongings", "持ち物", "建物", "手順", "住民"],
      ["earned her living", "彼女は生計を立てていた", "彼女は休暇を取っていた", "彼女は引っ越していた", "彼女は資格を取っていた"],
      ["draw attention to", "〜に関心を集める", "〜に反対する", "〜から離れる", "〜を延期する"],
      ["sustainable", "持続可能な", "一時的な", "高価な", "個人的な"],
      ["step in", "手を貸す・介入する", "順番を待つ", "立ち去る", "作業を断る"],
      ["electrical appliances", "電化製品", "修理工具", "衣類", "家具"],
      ["component", "部品", "利用者", "技術", "建物"],
      ["specifications", "仕様", "費用", "予約", "苦情"],
      ["receive assistance", "支援を受ける", "支援を断る", "代金を支払う", "規則を決める"],
      ["independently", "自力で・独立して", "順番に", "すぐに", "定期的に"],
      ["a suitable part", "適切な部品", "高価な工具", "不要な材料", "壊れた製品"]
    ],

    q7_set_002: [
      ["associated with", "〜と関連づけられる", "〜から取り除かれる", "〜に反対する", "〜の代わりに使われる"],
      ["go beyond", "〜を超える", "〜に戻る", "〜を減らす", "〜を避ける"],
      ["packets", "小さな袋", "植木鉢", "苗", "道具"],
      ["species", "種・種類", "季節", "土壌", "栄養"],
      ["pollen", "花粉", "根", "肥料", "果実"],
      ["mature seeds", "成熟した種", "枯れた葉", "若い芽", "乾いた土"],
      ["recorded demonstrations", "録画された実演", "生放送の討論", "個別の面談", "書面の申請"],
      ["contribute", "提供する・貢献する", "購入する", "廃棄する", "栽培する"],
      ["require", "要求する", "許可する", "紹介する", "記録する"],
      ["permanent", "常設の・恒久的な", "移動式の", "季節限定の", "私有の"],
      ["native to the region", "その地域に自生する", "その地域へ輸入された", "その地域で販売禁止の", "その地域では育たない"],
      ["a mobile library", "移動図書館", "公共図書館の本館", "共同菜園", "植物園"]
    ],

    q7_set_003: [
      ["lends", "貸し出す", "販売する", "集める", "寄付する"],
      ["colleagues", "仲間・同僚", "読者", "親戚", "観客"],
      ["annual", "毎年の", "毎月の", "毎週の", "毎日の"],
      ["represents", "表す・代表する", "否定する", "隠す", "取り替える"],
      ["on the basis of", "〜に基づいて", "〜の代わりに", "〜にもかかわらず", "〜と無関係に"],
      ["applies", "応募する", "辞退する", "許可する", "招待する"],
      ["applicant", "応募者", "主催者", "見学者", "指導者"],
      ["respectful", "相手を尊重する", "疑い深い", "無関心な", "競争的な"],
      ["permission", "許可", "予定", "経験", "説明"],
      ["four days in a row", "4日間連続で", "4日おきに", "4日以内に", "4日前に"],
      ["outward appearance", "外見", "内面の感情", "過去の経験", "将来の目標"],
      ["references", "推薦・推薦状", "応募用紙", "参加費", "研修日程"]
    ],

    q7_set_004: [
      ["charity", "慈善団体", "営利企業", "行政機関", "職業訓練校"],
      ["make a difference", "良い変化をもたらす", "距離を測る", "予定を変更する", "違いを説明する"],
      ["independently", "それぞれ自分で・独立して", "全員一緒に", "順番に", "定期的に"],
      ["overgrown", "草木が伸びすぎた", "きれいに整えられた", "完全に乾いた", "新しく造られた"],
      ["smoke alarm", "火災報知器", "照明器具", "空気清浄機", "防犯カメラ"],
      ["procedures", "手続き", "寄付金", "訪問先", "資格"],
      ["membership fee", "会費", "交通費", "修理費", "保険金"],
      ["financially", "金銭的に", "身体的に", "精神的に", "定期的に"],
      ["undertake", "引き受ける", "延期する", "見学する", "断る"],
      ["a qualified professional", "資格を持つ専門家", "経験のない参加者", "地域の高齢者", "団体の寄付者"],
      ["a background check", "身元・経歴の確認", "活動場所の下見", "道具の点検", "健康診断"],
      ["optional", "任意の", "必須の", "禁止された", "有料の"]
    ]
  };

  window.q7VocabSets = Object.entries(rows).map(([setId, items]) => ({
    setId,
    words: items.map(([en, ja, ...wrong], i) => ({
      id: `${setId}_v${String(i + 1).padStart(3, "0")}`,
      en,
      ja,
      wrong
    }))
  }));
})();

/* 追加語句。既存の12語句の後ろに追加し、既存のIDと履歴を維持します。
 * 英語: [文脈に合う正答, 誤答1, 誤答2, 誤答3]。本文データは変更しません。
 */
(function () {
  "use strict";
  const meanings = {
    "article": ["記事", "広告", "契約", "道具"],
    "available": ["利用できる・入手できる", "危険な", "不要な", "高価な"],
    "concern": ["〜に関する", "〜を購入する", "〜を修理する", "〜を延期する"],
    "encourage": ["〜するよう促す", "〜することを禁じる", "〜を忘れる", "〜を取り替える"],
    "expert": ["専門家", "初心者", "顧客", "見学者"],
    "include": ["含む", "取り除く", "延期する", "拒否する"],
    "involve": ["〜を伴う・含む", "〜を禁止する", "〜を忘れる", "〜を壊す"],
    "item": ["品物・品目", "料金", "手順", "場所"],
    "local": ["地元の", "一時的な", "高価な", "個人的な"],
    "method": ["方法", "料金", "材料", "場所"],
    "opportunity": ["機会", "義務", "道具", "費用"],
    "organize": ["企画する・開催する", "中止する", "購入する", "修理する"],
    "performance": ["公演", "予約", "講義", "契約"],
    "project": ["取り組み・計画", "料金", "建物", "部品"],
    "provide": ["提供する", "購入する", "捨てる", "断る"],
    "situation": ["状況", "道具", "住民", "料金"],
    "skill": ["技術・技能", "費用", "材料", "規則"],
    "suitable": ["適した", "壊れた", "高価な", "不要な"],
    "typical": ["典型的な・一般的な", "例外的な", "個人的な", "一時的な"],
    "variety": ["種類の豊富さ・多様性", "料金の高さ", "作業の速さ", "道具の重さ"],
    "accept": ["受け入れる", "拒否する", "比較する", "運ぶ"],
    "amount": ["量", "種類", "場所", "手順"],
    "choice": ["選択・選択肢", "義務", "費用", "建物"],
    "complete": ["完了する・完成させる", "開始する", "延期する", "中断する"],
    "consider": ["考える・検討する", "買い替える", "捨てる", "運ぶ"],
    "event": ["催し・イベント", "道具", "料金", "資格"],
    "experience": ["経験", "予定", "許可", "道具"],
    "handle": ["扱う", "購入する", "断る", "借りる"],
    "however": ["しかし", "そのため", "例えば", "同様に"],
    "instead": ["代わりに", "同時に", "特に", "すでに"],
    "journalist": ["記者・ジャーナリスト", "技術者", "研究者", "店主"],
    "knowledge": ["知識", "道具", "費用", "規則"],
    "material": ["材料・資料", "訪問者", "料金", "仕様"],
    "object": ["物・物体", "手順", "料金", "知識"],
    "ordinary": ["普通の", "特別な", "高価な", "複雑な"],
    "owner": ["所有者", "従業員", "訪問者", "設計者"],
    "practical": ["実際に役立つ・実用的な", "理論だけの", "架空の", "一時的な"],
    "produce": ["制作する・書く", "購入する", "廃棄する", "翻訳する"],
    "professional": ["専門の・専門職の", "経験のない", "一時的な", "個人的な"],
    "public": ["公共の", "個人所有の", "一時的な", "有料の"],
    "repair": ["修理する", "買い替える", "捨てる", "借りる"],
    "spread": ["広がる・広める", "減少する", "中止する", "取り除く"],
    "various": ["さまざまな", "同一の", "わずかな", "特定の"],
    "addition": ["追加", "削除", "返却", "交換"],
    "catalog": ["カタログ・目録", "申請書", "領収書", "推薦状"],
    "environment": ["環境", "世代", "収穫", "品種"],
    "generation": ["世代", "地区", "品種", "土壌"],
    "improve": ["改善する", "悪化させる", "中止する", "隠す"],
    "individual": ["個々の", "全体共通の", "公共の", "移動式の"],
    "policy": ["方針", "品種", "道具", "収穫"],
    "recommend": ["勧める・紹介する", "禁止する", "返却する", "栽培する"],
    "soil": ["土・土壌", "花粉", "肥料", "根"],
    "altogether": ["全部で・合計で", "それぞれ別々に", "たまに", "少なくとも"],
    "collection": ["集められたもの・コレクション", "参加者", "栽培方法", "配達車両"],
    "contain": ["含む", "取り除く", "栽培する", "購入する"],
    "create": ["作り出す", "取り壊す", "返品する", "借りる"],
    "crop": ["作物", "肥料", "道具", "昆虫"],
    "develop": ["開発する・生み出す", "中止する", "借りる", "捨てる"],
    "district": ["地区", "品種", "世代", "収穫"],
    "fit": ["合う・適合する", "壊れる", "減少する", "移動する"],
    "operate": ["運営する", "閉鎖する", "改築する", "見学する"],
    "particular": ["特定の", "すべての", "不明な", "無関係な"],
    "save": ["保存する", "廃棄する", "購入する", "配達する"],
    "share": ["分け合う・共有する", "独占する", "購入する", "廃棄する"],
    "successful": ["成功した", "失敗した", "未経験の", "強制的な"],
    "suit": ["適する", "壊れる", "中止する", "減少する"],
    "support": ["支援・支える", "拒否・拒否する", "破壊・破壊する", "購入・購入する"],
    "system": ["仕組み・制度", "品種", "建物", "費用"],
    "activity": ["活動", "費用", "資格", "道具"],
    "affect": ["影響を与える", "無視する", "取り替える", "購入する"],
    "application": ["応募・申請", "採用通知", "推薦状", "参加費"],
    "attract": ["引きつける", "追い払う", "制限する", "取り替える"],
    "connect": ["結びつける", "切り離す", "禁止する", "購入する"],
    "exhibition": ["展覧会", "会議", "面接", "研修"],
    "human": ["人間の", "動物の", "機械の", "植物の"],
    "librarian": ["司書", "著者", "読者", "書店員"],
    "organization": ["組織・団体", "申請書", "会話", "肩書き"],
    "preparation": ["準備", "許可", "結果", "費用"],
    "role": ["役割", "外見", "料金", "場所"],
    "staff": ["職員・スタッフ", "読者", "応募者", "観客"],
    "approach": ["近づく・声をかける", "離れる", "無視する", "拒否する"],
    "band": ["楽団・バンド", "出版社", "劇場", "展示会"],
    "curious": ["好奇心を持った", "無関心な", "不快な", "不正直な"],
    "deal": ["対応する・接する", "拒否する", "延期する", "取り替える"],
    "education": ["教育", "娯楽", "商業", "交通"],
    "exchange": ["やり取り", "応募", "許可", "研修"],
    "experiment": ["実験・試み", "規則", "推薦", "会費"],
    "festival": ["祭り・祭典", "面接", "会議", "図書館"],
    "label": ["肩書き・ラベル", "経験", "質問", "許可"],
    "perform": ["演奏する・演じる", "見学する", "執筆する", "応募する"],
    "prepare": ["準備する", "中止する", "断る", "忘れる"],
    "propose": ["提案する", "却下する", "購入する", "取り替える"],
    "remain": ["変わらずにいる・残る", "消える", "中止する", "借りる"],
    "require": ["要求する・必要とする", "禁止する", "断る", "隠す"],
    "respect": ["尊重・敬意", "偏見", "疑い", "無関心"],
    "title": ["題名・タイトル", "会費", "時間割", "申請書"],
    "total": ["合計の", "一日ごとの", "最小の", "平均の"],
    "treat": ["扱う・接する", "避ける", "無視する", "購入する"],
    "whenever": ["いつでも・〜するときはいつも", "どこでも", "誰でも", "どんな方法でも"],
    "brief": ["短い・簡潔な", "長時間の", "複雑な", "高価な"],
    "charge": ["料金", "寄付", "割引", "払い戻し"],
    "monthly": ["毎月の", "毎週の", "毎年の", "毎日の"],
    "payment": ["支払い", "寄付", "割引", "収入"],
    "select": ["選ぶ", "断る", "借りる", "延期する"],
    "task": ["作業・仕事", "会費", "移動手段", "資格"],
    "aim": ["目的・目標", "道具", "費用", "規則"],
    "arrange": ["手配する", "取り消す", "修理する", "借りる"],
    "examine": ["調べる・確認する", "廃棄する", "借りる", "変更する"],
    "general": ["一般的な", "例外的な", "個人専用の", "不明な"],
    "interview": ["面談・面接", "講習", "健康診断", "作業実演"],
    "lack": ["不足・欠如", "余剰", "増加", "充実"],
    "length": ["長さ", "重さ", "高さ", "温度"],
    "limit": ["上限・制限", "目標", "報酬", "予約"],
    "official": ["公的な・公式の", "私的な", "非公式の", "架空の"],
    "physical": ["身体の", "精神の", "金銭の", "法律の"],
    "prevent": ["防ぐ・妨げる", "促進する", "紹介する", "支援する"],
    "private": ["個人の・私的な", "公共の", "団体共通の", "公式の"],
    "safety": ["安全", "危険", "収益", "速度"],
    "separate": ["別々の", "一体となった", "同時の", "同一の"],
    "therefore": ["それゆえ・したがって", "しかし", "例えば", "一方で"],
  };
  // [登録語, 出現箇所, 級]。A/Bは段落番号、a〜eは選択肢番号。
  const additions = {
    q7_set_001: [
      ["article", "A2", 1], ["available", "A4", 1], ["concern", "B5", 1],
      ["encourage", "A6", 1], ["expert", "b4", 1], ["include", "A4", 1],
      ["involve", "B2", 1], ["item", "e4", 1], ["local", "A2", 1],
      ["method", "b3", 1], ["opportunity", "A6", 1], ["organize", "A2", 1],
      ["performance", "A2", 1], ["project", "A2", 1], ["provide", "A3", 1],
      ["situation", "B4", 1], ["skill", "A3", 1], ["typical", "B2", 1],
      ["variety", "A4", 1], ["accept", "e3", 2], ["amount", "e1", 2],
      ["choice", "A1", 2], ["complete", "d4", 2], ["consider", "A6", 2],
      ["event", "A6", 2], ["experience", "A3", 2], ["handle", "e2", 2],
      ["however", "A1", 2], ["instead", "A1", 2], ["journalist", "a3", 2],
      ["knowledge", "A6", 2], ["material", "A4", 2], ["object", "A3", 2],
      ["ordinary", "A3", 2], ["owner", "a4", 2], ["practical", "A3", 2],
      ["produce", "A2", 2], ["professional", "d3", 2], ["public", "c2", 2],
      ["repair", "A1", 2], ["spread", "A6", 2], ["various", "B2", 2],
    ],
    q7_set_002: [
      ["addition", "B1", 1], ["available", "B5", 1], ["catalog", "A3", 1],
      ["encourage", "A4", 1], ["environment", "A2", 1], ["generation", "A1", 1],
      ["improve", "a2", 1], ["include", "B1", 1], ["individual", "b4", 1],
      ["involve", "B4", 1], ["local", "A2", 1], ["opportunity", "A6", 1],
      ["policy", "B3", 1], ["provide", "A5", 1], ["recommend", "A3", 1],
      ["skill", "A4", 1], ["soil", "a2", 1], ["suitable", "b3", 1],
      ["variety", "a4", 1], ["altogether", "B5", 2], ["amount", "A4", 2],
      ["collection", "A2", 2], ["contain", "A2", 2], ["create", "A2", 2],
      ["crop", "A4", 2], ["develop", "A1", 2], ["district", "A1", 2],
      ["experience", "A3", 2], ["fit", "A2", 2], ["handle", "b1", 2],
      ["however", "A2", 2], ["material", "A1", 2], ["operate", "B1", 2],
      ["particular", "b1", 2], ["public", "B1", 2], ["save", "B2", 2],
      ["share", "A4", 2], ["successful", "A3", 2], ["suit", "a1", 2],
      ["support", "B1", 2], ["system", "B4", 2],
    ],
    q7_set_003: [
      ["activity", "B1", 1], ["affect", "b2", 1], ["application", "B3", 1],
      ["attract", "A5", 1], ["available", "A5", 1], ["connect", "B2", 1],
      ["encourage", "A2", 1], ["exhibition", "a2", 1], ["human", "A1", 1],
      ["include", "A2", 1], ["librarian", "d1", 1], ["local", "a2", 1],
      ["opportunity", "A6", 1], ["organization", "c1", 1], ["preparation", "A3", 1],
      ["project", "A1", 1], ["provide", "c2", 1], ["role", "A3", 1],
      ["staff", "A3", 1], ["approach", "A2", 2], ["band", "A1", 2],
      ["complete", "B3", 2], ["create", "A1", 2], ["curious", "A4", 2],
      ["deal", "A4", 2], ["develop", "A1", 2], ["education", "a1", 2],
      ["event", "A3", 2], ["exchange", "A4", 2], ["experience", "b2", 2],
      ["experiment", "A6", 2], ["festival", "a4", 2], ["however", "A6", 2],
      ["instead", "A1", 2], ["label", "A6", 2], ["ordinary", "B2", 2],
      ["perform", "A1", 2], ["prepare", "c4", 2], ["propose", "A3", 2],
      ["public", "a1", 2], ["remain", "A6", 2], ["require", "A4", 2],
      ["respect", "A4", 2], ["spread", "A6", 2], ["title", "A5", 2],
      ["total", "B5", 2], ["treat", "A4", 2], ["whenever", "d3", 2],
    ],
    q7_set_004: [
      ["activity", "A1", 1], ["brief", "A4", 1], ["charge", "e1", 1],
      ["connect", "A6", 1], ["involve", "A3", 1], ["local", "B1", 1],
      ["monthly", "e1", 1], ["organization", "A4", 1], ["organize", "B3", 1],
      ["payment", "e3", 1], ["policy", "B5", 1], ["preparation", "A4", 1],
      ["provide", "A3", 1], ["select", "b2", 1], ["suitable", "b3", 1],
      ["task", "a1", 1], ["aim", "A3", 2], ["arrange", "a4", 2],
      ["complete", "B4", 2], ["deal", "A3", 2], ["examine", "A4", 2],
      ["general", "B3", 2], ["however", "A2", 2], ["instead", "A1", 2],
      ["interview", "d4", 2], ["lack", "A5", 2], ["length", "A3", 2],
      ["limit", "B3", 2], ["object", "A3", 2], ["official", "A4", 2],
      ["particular", "B5", 2], ["physical", "A1", 2], ["practical", "A1", 2],
      ["prepare", "B4", 2], ["prevent", "A5", 2], ["private", "b3", 2],
      ["require", "B4", 2], ["safety", "A6", 2], ["separate", "A1", 2],
      ["support", "A5", 2], ["system", "A4", 2], ["therefore", "A6", 2],
    ],
  };
  for (const set of window.q7VocabSets || []) {
    for (const [en, location, level] of additions[set.setId] || []) {
      const [ja, ...wrong] = meanings[en];
      const number = set.words.length + 1;
      set.words.push({
        id: `${set.setId}_v${String(number).padStart(3, "0")}`,
        en, ja: set.setId === "q7_set_002" && en === "variety" ? "品種・種類" : ja,
        wrong, location, level
      });
    }
    set.words.forEach((w, i) => { w.number = i + 1; });
  }
})();


/* SET 5〜11の語句。ID・番号は履歴に使うため、追加は各SETの末尾に行います。
 * locationは本文・要約・選択肢の出現箇所。本文データの並び順に対応します。
 */
(function () {
  "use strict";
  const additions = [
  {
    "setId": "q7_set_005",
    "words": [
      {
        "id": "q7_set_005_v001",
        "number": 1,
        "en": "clothing donation",
        "ja": "衣類の寄付",
        "wrong": [
          "衣類の修理",
          "衣類の輸出",
          "衣類の試着"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_005_v002",
        "number": 2,
        "en": "temporary",
        "ja": "一時的な",
        "wrong": [
          "恒久的な",
          "個人的な",
          "伝統的な"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_005_v003",
        "number": 3,
        "en": "displayed items",
        "ja": "展示された品物",
        "wrong": [
          "予約された品物",
          "返品された品物",
          "配達された品物"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_005_v004",
        "number": 4,
        "en": "select",
        "ja": "選ぶ",
        "wrong": [
          "並べる",
          "数える",
          "届ける"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_005_v005",
        "number": 5,
        "en": "suits",
        "ja": "〜に合う",
        "wrong": [
          "〜を隠す",
          "〜を壊す",
          "〜を借りる"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_005_v006",
        "number": 6,
        "en": "particular importance",
        "ja": "特別な重要性",
        "wrong": [
          "共通の欠点",
          "一定の費用",
          "具体的な手順"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_005_v007",
        "number": 7,
        "en": "consumers",
        "ja": "消費者",
        "wrong": [
          "生産者",
          "投資家",
          "主催者"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_005_v008",
        "number": 8,
        "en": "communication",
        "ja": "情報の伝達・意思疎通",
        "wrong": [
          "商品の保管",
          "料金の支払い",
          "衣類の加工"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_005_v009",
        "number": 9,
        "en": "creative experience",
        "ja": "創造的な経験",
        "wrong": [
          "専門的な資格",
          "経済的な支援",
          "定期的な点検"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_005_v010",
        "number": 10,
        "en": "communities",
        "ja": "地域社会",
        "wrong": [
          "広告媒体",
          "衣料品店",
          "国際会議"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_005_v011",
        "number": 11,
        "en": "make a pledge",
        "ja": "意思表示・誓約を行う",
        "wrong": [
          "料金を払い戻す",
          "開催場所を変更する",
          "参加資格を確認する"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_005_v012",
        "number": 12,
        "en": "gain access to",
        "ja": "〜を利用できるようになる",
        "wrong": [
          "〜への関心を失う",
          "〜の費用を負担する",
          "〜からの支援を断る"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_005_v013",
        "number": 13,
        "en": "instructions",
        "ja": "指示・手順の説明",
        "wrong": [
          "広告費",
          "参加者名簿",
          "開催実績"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_005_v014",
        "number": 14,
        "en": "commit",
        "ja": "義務を負わせる",
        "wrong": [
          "不安を取り除く",
          "意見を求める",
          "利益を分配する"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_005_v015",
        "number": 15,
        "en": "go ahead",
        "ja": "実行に移す",
        "wrong": [
          "最初に戻る",
          "開催を延期する",
          "相手に譲る"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_005_v016",
        "number": 16,
        "en": "considerable freedom",
        "ja": "かなりの自由",
        "wrong": [
          "わずかな負担",
          "共通の責任",
          "厳しい制限"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_005_v017",
        "number": 17,
        "en": "adapt",
        "ja": "状況に合わせて変える",
        "wrong": [
          "予定どおり繰り返す",
          "完全に取り除く",
          "代わりの物を購入する"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_005_v018",
        "number": 18,
        "en": "for the benefit of",
        "ja": "〜のために・〜の利益となるように",
        "wrong": [
          "〜の代わりに",
          "〜の反対を受けて",
          "〜の許可なしに"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_005_v019",
        "number": 19,
        "en": "responsible for",
        "ja": "〜に責任がある",
        "wrong": [
          "〜に無関心である",
          "〜に似ている",
          "〜に反対している"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_005_v020",
        "number": 20,
        "en": "principle",
        "ja": "原則",
        "wrong": [
          "利益",
          "設備",
          "資格"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_005_v021",
        "number": 21,
        "en": "condition",
        "ja": "状態",
        "wrong": [
          "値段",
          "所有者",
          "数量"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_005_v022",
        "number": 22,
        "en": "torn",
        "ja": "破れた",
        "wrong": [
          "折り畳まれた",
          "洗濯された",
          "予約された"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_005_v023",
        "number": 23,
        "en": "unsuitable",
        "ja": "適していない",
        "wrong": [
          "使いやすい",
          "目立たない",
          "手に入りやすい"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_005_v024",
        "number": 24,
        "en": "mending",
        "ja": "修繕",
        "wrong": [
          "仕分け",
          "包装",
          "展示"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_005_v025",
        "number": 25,
        "en": "professional cleaner's",
        "ja": "専門のクリーニング店",
        "wrong": [
          "衣料品の製造工場",
          "地域のリサイクル施設",
          "衣服の小売店"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_005_v026",
        "number": 26,
        "en": "as a pair",
        "ja": "一組として",
        "wrong": [
          "一つずつ",
          "無料で",
          "順番に"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_005_v027",
        "number": 27,
        "en": "step-by-step guide",
        "ja": "手順を順に示したガイド",
        "wrong": [
          "参加者の体験談",
          "年間の活動報告",
          "商品の価格一覧"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_005_v028",
        "number": 28,
        "en": "preparation tasks",
        "ja": "準備作業",
        "wrong": [
          "事後の感想",
          "当日の売上",
          "参加条件"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_005_v029",
        "number": 29,
        "en": "planning checklist",
        "ja": "準備のためのチェックリスト",
        "wrong": [
          "来場者の予約表",
          "寄付品の領収書",
          "収支の報告書"
        ],
        "location": "e3"
      },
      {
        "id": "q7_set_005_v030",
        "number": 30,
        "en": "respectful",
        "ja": "相手を尊重した",
        "wrong": [
          "競争的な",
          "形式だけの",
          "無関心な"
        ],
        "location": "A7"
      }
    ]
  },
  {
    "setId": "q7_set_006",
    "words": [
      {
        "id": "q7_set_006_v001",
        "number": 1,
        "en": "low-vision",
        "ja": "視力が低い・ロービジョンの",
        "wrong": [
          "記憶力が低い",
          "聴力が低い",
          "運動能力が低い"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_006_v002",
        "number": 2,
        "en": "identify",
        "ja": "特定する・識別する",
        "wrong": [
          "移動する",
          "修理する",
          "購入する"
        ],
        "location": "a2"
      },
      {
        "id": "q7_set_006_v003",
        "number": 3,
        "en": "locate",
        "ja": "位置を見つける",
        "wrong": [
          "色を変える",
          "音を消す",
          "値段を調べる"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_006_v004",
        "number": 4,
        "en": "visually impaired",
        "ja": "視覚に障害のある",
        "wrong": [
          "聴覚に障害のある",
          "言語の異なる",
          "専門資格を持つ"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_006_v005",
        "number": 5,
        "en": "organization",
        "ja": "組織・団体",
        "wrong": [
          "申請書",
          "通信機器",
          "視覚情報"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_006_v006",
        "number": 6,
        "en": "solved",
        "ja": "解決した",
        "wrong": [
          "延期した",
          "報告した",
          "無視した"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_006_v007",
        "number": 7,
        "en": "visual problems",
        "ja": "視覚に関する問題",
        "wrong": [
          "言葉遣いの問題",
          "通信料金の問題",
          "家族関係の問題"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_006_v008",
        "number": 8,
        "en": "video call",
        "ja": "ビデオ通話",
        "wrong": [
          "録画映像",
          "音声メッセージ",
          "電子メール"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_006_v009",
        "number": 9,
        "en": "network",
        "ja": "つながり・ネットワーク",
        "wrong": [
          "利用料金",
          "申請手続き",
          "個人の予定"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_006_v010",
        "number": 10,
        "en": "willing to help",
        "ja": "進んで助けようとする",
        "wrong": [
          "助けを求められない",
          "支援に費用を請求する",
          "支援を受ける必要がある"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_006_v011",
        "number": 11,
        "en": "depend only on",
        "ja": "〜だけに頼る",
        "wrong": [
          "〜だけを避ける",
          "〜だけを招待する",
          "〜だけを比較する"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_006_v012",
        "number": 12,
        "en": "communicate",
        "ja": "意思疎通する",
        "wrong": [
          "身元を確認する",
          "料金を請求する",
          "資格を取得する"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_006_v013",
        "number": 13,
        "en": "considers",
        "ja": "考慮する",
        "wrong": [
          "取り消す",
          "拒否する",
          "隠す"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_006_v014",
        "number": 14,
        "en": "local clock",
        "ja": "現地の時刻",
        "wrong": [
          "利用者の年齢",
          "地域の天気",
          "通話の長さ"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_006_v015",
        "number": 15,
        "en": "located",
        "ja": "位置している",
        "wrong": [
          "予約されている",
          "修理されている",
          "翻訳されている"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_006_v016",
        "number": 16,
        "en": "request",
        "ja": "依頼",
        "wrong": [
          "許可",
          "料金",
          "結果"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_006_v017",
        "number": 17,
        "en": "alert",
        "ja": "通知",
        "wrong": [
          "予約",
          "資格",
          "報酬"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_006_v018",
        "number": 18,
        "en": "suitable volunteers",
        "ja": "条件に合うボランティア",
        "wrong": [
          "研修中のボランティア",
          "近所の利用者",
          "専門の販売員"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_006_v019",
        "number": 19,
        "en": "simultaneously",
        "ja": "同時に",
        "wrong": [
          "交互に",
          "個別に",
          "徐々に"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_006_v020",
        "number": 20,
        "en": "accepts",
        "ja": "受け入れる・応答する",
        "wrong": [
          "延期する",
          "送信する",
          "拒否する"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_006_v021",
        "number": 21,
        "en": "ignore",
        "ja": "無視する",
        "wrong": [
          "承認する",
          "記録する",
          "共有する"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_006_v022",
        "number": 22,
        "en": "continuously",
        "ja": "継続して",
        "wrong": [
          "一度だけ",
          "交互に",
          "時々"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_006_v023",
        "number": 23,
        "en": "pointing toward",
        "ja": "〜の方向を向いている",
        "wrong": [
          "〜から遠ざかっている",
          "〜の後ろに隠れている",
          "〜の下に置かれている"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_006_v024",
        "number": 24,
        "en": "describe",
        "ja": "説明する・描写する",
        "wrong": [
          "取り替える",
          "持ち帰る",
          "印刷する"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_006_v025",
        "number": 25,
        "en": "printed information",
        "ja": "印刷された情報",
        "wrong": [
          "録音された情報",
          "入力途中の情報",
          "削除された情報"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_006_v026",
        "number": 26,
        "en": "slightly",
        "ja": "少し",
        "wrong": [
          "急に",
          "完全に",
          "繰り返し"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_006_v027",
        "number": 27,
        "en": "particular products",
        "ja": "特定の商品",
        "wrong": [
          "すべての商品",
          "返品された商品",
          "無料の商品"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_006_v028",
        "number": 28,
        "en": "partner businesses",
        "ja": "提携企業",
        "wrong": [
          "競合企業",
          "個人の利用者",
          "行政の担当部署"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_006_v029",
        "number": 29,
        "en": "specialized information",
        "ja": "専門的な情報",
        "wrong": [
          "個人的なうわさ",
          "一般的な広告",
          "古い記録"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_006_v030",
        "number": 30,
        "en": "principle",
        "ja": "原則・基本的な考え方",
        "wrong": [
          "利益",
          "資格",
          "設備"
        ],
        "location": "A7"
      }
    ]
  },
  {
    "setId": "q7_set_007",
    "words": [
      {
        "id": "q7_set_007_v001",
        "number": 1,
        "en": "estimate",
        "ja": "見積もる・予測する",
        "wrong": [
          "予約する",
          "廃棄する",
          "比較する"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_007_v002",
        "number": 2,
        "en": "remain unsold",
        "ja": "売れ残る",
        "wrong": [
          "売り切れる",
          "配達される",
          "値上げされる"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_007_v003",
        "number": 3,
        "en": "in advance",
        "ja": "事前に",
        "wrong": [
          "直後に",
          "偶然に",
          "順番に"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_007_v004",
        "number": 4,
        "en": "left over",
        "ja": "余った",
        "wrong": [
          "値下げされた",
          "注文された",
          "調理中の"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_007_v005",
        "number": 5,
        "en": "cancel reservations",
        "ja": "予約を取り消す",
        "wrong": [
          "予約を確定する",
          "代金を支払う",
          "商品を配送する"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_007_v006",
        "number": 6,
        "en": "collection period",
        "ja": "受取時間帯",
        "wrong": [
          "食品の保存期間",
          "予約の申込期間",
          "代金の支払期限"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_007_v007",
        "number": 7,
        "en": "ordinary circumstances",
        "ja": "通常の状況",
        "wrong": [
          "例外的な状況",
          "緊急の依頼",
          "予想外の結果"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_007_v008",
        "number": 8,
        "en": "operation",
        "ja": "業務・運営",
        "wrong": [
          "予約者",
          "販売価格",
          "商品名"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_007_v009",
        "number": 9,
        "en": "exceptional situations",
        "ja": "例外的な状況",
        "wrong": [
          "日常的な習慣",
          "共通の目的",
          "厳密な条件"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_007_v010",
        "number": 10,
        "en": "specified",
        "ja": "指定された",
        "wrong": [
          "延期された",
          "変更可能な",
          "不明な"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_007_v011",
        "number": 11,
        "en": "confirmation",
        "ja": "確認",
        "wrong": [
          "取消し",
          "返品",
          "値引き"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_007_v012",
        "number": 12,
        "en": "demonstrates",
        "ja": "示す",
        "wrong": [
          "妨げる",
          "忘れる",
          "隠す"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_007_v013",
        "number": 13,
        "en": "hand over",
        "ja": "手渡す",
        "wrong": [
          "持ち去る",
          "返却を求める",
          "代金を請求する"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_007_v014",
        "number": 14,
        "en": "in place of",
        "ja": "〜の代わりに",
        "wrong": [
          "〜の手前で",
          "〜に加えて",
          "〜のためではなく"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_007_v015",
        "number": 15,
        "en": "responsibilities",
        "ja": "責任",
        "wrong": [
          "割引",
          "余り物",
          "評価"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_007_v016",
        "number": 16,
        "en": "list",
        "ja": "掲載する",
        "wrong": [
          "回収する",
          "値下げする",
          "取り消す"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_007_v017",
        "number": 17,
        "en": "combination",
        "ja": "組み合わせ",
        "wrong": [
          "保管場所",
          "受取期限",
          "販売方法"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_007_v018",
        "number": 18,
        "en": "vary",
        "ja": "変わる",
        "wrong": [
          "一致する",
          "不足する",
          "確定する"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_007_v019",
        "number": 19,
        "en": "precisely",
        "ja": "正確に",
        "wrong": [
          "偶然に",
          "簡単に",
          "定期的に"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_007_v020",
        "number": 20,
        "en": "normal selling prices",
        "ja": "通常の販売価格",
        "wrong": [
          "商品の仕入れ価格",
          "最終的な割引価格",
          "配送にかかる費用"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_007_v021",
        "number": 21,
        "en": "fall below",
        "ja": "〜を下回る",
        "wrong": [
          "〜と等しくなる",
          "〜を上回る",
          "〜に比例する"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_007_v022",
        "number": 22,
        "en": "ensure",
        "ja": "確実にする",
        "wrong": [
          "疑う",
          "取り消す",
          "比較する"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_007_v023",
        "number": 23,
        "en": "distinction",
        "ja": "区別",
        "wrong": [
          "一致",
          "依存",
          "対立"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_007_v024",
        "number": 24,
        "en": "completed purchase",
        "ja": "完了した購入",
        "wrong": [
          "取り消された予約",
          "未払いの請求",
          "変更された注文"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_007_v025",
        "number": 25,
        "en": "transaction",
        "ja": "取引",
        "wrong": [
          "食品",
          "店舗",
          "割引券"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_007_v026",
        "number": 26,
        "en": "accepted",
        "ja": "受け入れられた",
        "wrong": [
          "返品された",
          "廃棄された",
          "延期された"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_007_v027",
        "number": 27,
        "en": "predictable",
        "ja": "予測しやすい",
        "wrong": [
          "変更できない",
          "避けられない",
          "利用できない"
        ],
        "location": "A7"
      },
      {
        "id": "q7_set_007_v028",
        "number": 28,
        "en": "on their behalf",
        "ja": "その人の代わりに",
        "wrong": [
          "その人に知らせずに",
          "その人と一緒に",
          "その人の反対を受けて"
        ],
        "location": "c1"
      },
      {
        "id": "q7_set_007_v029",
        "number": 29,
        "en": "retail value",
        "ja": "小売価値",
        "wrong": [
          "生産費用",
          "配送料金",
          "廃棄費用"
        ],
        "location": "B4"
      },
      {
        "id": "q7_set_007_v030",
        "number": 30,
        "en": "minimum value",
        "ja": "最低価値",
        "wrong": [
          "平均価格",
          "最高利益",
          "追加料金"
        ],
        "location": "d3"
      }
    ]
  },
  {
    "setId": "q7_set_008",
    "words": [
      {
        "id": "q7_set_008_v001",
        "number": 1,
        "en": "examine",
        "ja": "詳しく調べる",
        "wrong": [
          "配布する",
          "隠す",
          "取り替える"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_008_v002",
        "number": 2,
        "en": "on its own",
        "ja": "それだけで・独力で",
        "wrong": [
          "予定どおりに",
          "順番を待って",
          "一定の間隔で"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_008_v003",
        "number": 3,
        "en": "distant",
        "ja": "遠く離れた",
        "wrong": [
          "最近の",
          "身近な",
          "人工的な"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_008_v004",
        "number": 4,
        "en": "identifying",
        "ja": "特定すること",
        "wrong": [
          "作り直すこと",
          "配布すること",
          "保存すること"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_008_v005",
        "number": 5,
        "en": "a great deal of",
        "ja": "非常に多くの",
        "wrong": [
          "ごくわずかな",
          "ほぼ同じ量の",
          "予想より少ない"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_008_v006",
        "number": 6,
        "en": "platform",
        "ja": "活動のためのオンライン基盤",
        "wrong": [
          "研究用の観測装置",
          "研究者の資格",
          "古文書の保管庫"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_008_v007",
        "number": 7,
        "en": "qualifications",
        "ja": "資格",
        "wrong": [
          "報酬",
          "予定",
          "意見"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_008_v008",
        "number": 8,
        "en": "entirely up to",
        "ja": "完全に〜に任されている",
        "wrong": [
          "完全に〜に反対している",
          "必ず〜と一致している",
          "すでに〜を終えている"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_008_v009",
        "number": 9,
        "en": "contribution",
        "ja": "貢献",
        "wrong": [
          "観察対象",
          "研究費用",
          "申請条件"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_008_v010",
        "number": 10,
        "en": "independently",
        "ja": "独立して",
        "wrong": [
          "交互に",
          "強制的に",
          "同じ場所で"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_008_v011",
        "number": 11,
        "en": "observations",
        "ja": "観察結果",
        "wrong": [
          "研究機材",
          "参加申込書",
          "操作説明書"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_008_v012",
        "number": 12,
        "en": "assessments",
        "ja": "評価",
        "wrong": [
          "許可",
          "指示",
          "予測"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_008_v013",
        "number": 13,
        "en": "combines",
        "ja": "組み合わせる",
        "wrong": [
          "切り離す",
          "取り消す",
          "交換する"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_008_v014",
        "number": 14,
        "en": "worth examining",
        "ja": "調べる価値がある",
        "wrong": [
          "調べることが禁じられた",
          "調査が完了した",
          "調査を必要としない"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_008_v015",
        "number": 15,
        "en": "reconsider",
        "ja": "考え直す",
        "wrong": [
          "書き写す",
          "放置する",
          "取り除く"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_008_v016",
        "number": 16,
        "en": "adjustments",
        "ja": "修正・調整",
        "wrong": [
          "資格・免許",
          "支払い・請求",
          "出会い・交流"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_008_v017",
        "number": 17,
        "en": "submission",
        "ja": "提出・送信",
        "wrong": [
          "保存場所",
          "調査対象",
          "参加資格"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_008_v018",
        "number": 18,
        "en": "permanent record",
        "ja": "恒久的な記録",
        "wrong": [
          "一時的なメモ",
          "未完成の資料",
          "修正前の見本"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_008_v019",
        "number": 19,
        "en": "alter",
        "ja": "変更する",
        "wrong": [
          "承認する",
          "比較する",
          "再生する"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_008_v020",
        "number": 20,
        "en": "accidental mistake",
        "ja": "偶然の間違い",
        "wrong": [
          "意図的な虚偽",
          "確実な証拠",
          "正式な申請"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_008_v021",
        "number": 21,
        "en": "not necessarily",
        "ja": "必ずしも〜とは限らない",
        "wrong": [
          "定期的に",
          "事前に",
          "同時に"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_008_v022",
        "number": 22,
        "en": "conclusion",
        "ja": "結論",
        "wrong": [
          "目的",
          "準備",
          "仮説"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_008_v023",
        "number": 23,
        "en": "beta testers",
        "ja": "一般公開前に試す人々",
        "wrong": [
          "正式公開後の購入者",
          "研究費を提供する人々",
          "研究を審査する専門家"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_008_v024",
        "number": 24,
        "en": "reactions",
        "ja": "反応・感想",
        "wrong": [
          "資格・免許",
          "費用・料金",
          "記録・資料"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_008_v025",
        "number": 25,
        "en": "brief",
        "ja": "短い",
        "wrong": [
          "複雑な",
          "詳しい",
          "長期の"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_008_v026",
        "number": 26,
        "en": "questionnaire",
        "ja": "アンケート",
        "wrong": [
          "掲示板",
          "許可証",
          "研究論文"
        ],
        "location": "d2"
      },
      {
        "id": "q7_set_008_v027",
        "number": 27,
        "en": "official launch",
        "ja": "正式公開",
        "wrong": [
          "試験運用",
          "個人登録",
          "活動停止"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_008_v028",
        "number": 28,
        "en": "technical setup",
        "ja": "技術的な設定",
        "wrong": [
          "研究の結論",
          "費用の見積もり",
          "観察対象の選定"
        ],
        "location": "B6"
      },
      {
        "id": "q7_set_008_v029",
        "number": 29,
        "en": "Visibility section",
        "ja": "公開範囲を管理する欄",
        "wrong": [
          "支払方法を選ぶ欄",
          "回答履歴を調べる欄",
          "研究結果を発表する欄"
        ],
        "location": "e4"
      },
      {
        "id": "q7_set_008_v030",
        "number": 30,
        "en": "academic projects",
        "ja": "学術的なプロジェクト",
        "wrong": [
          "商品の販売企画",
          "日常の買い物",
          "個人の旅行計画"
        ],
        "location": "B1"
      }
    ]
  },
  {
    "setId": "q7_set_009",
    "words": [
      {
        "id": "q7_set_009_v001",
        "number": 1,
        "en": "eventually",
        "ja": "最終的に",
        "wrong": [
          "直ちに",
          "一時的に",
          "偶然に"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_009_v002",
        "number": 2,
        "en": "reduce",
        "ja": "減らす",
        "wrong": [
          "増やす",
          "維持する",
          "比較する"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_009_v003",
        "number": 3,
        "en": "pollution",
        "ja": "汚染",
        "wrong": [
          "資源",
          "流速",
          "容量"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_009_v004",
        "number": 4,
        "en": "natural movement",
        "ja": "自然な動き",
        "wrong": [
          "人工的な振動",
          "定期的な点検",
          "機械の停止"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_009_v005",
        "number": 5,
        "en": "floating barrier",
        "ja": "水面に浮かぶ障壁",
        "wrong": [
          "川底に沈む容器",
          "川岸に立つ標識",
          "橋に固定された照明"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_009_v006",
        "number": 6,
        "en": "current",
        "ja": "水流",
        "wrong": [
          "現在時刻",
          "電池残量",
          "大気の温度"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_009_v007",
        "number": 7,
        "en": "transferred",
        "ja": "移された",
        "wrong": [
          "捨てられた",
          "修理された",
          "分解された"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_009_v008",
        "number": 8,
        "en": "considerable amount",
        "ja": "かなりの量",
        "wrong": [
          "わずかな費用",
          "一定の時間",
          "共通の種類"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_009_v009",
        "number": 9,
        "en": "available",
        "ja": "利用できる・空いている",
        "wrong": [
          "故障している",
          "禁止されている",
          "購入済みの"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_009_v010",
        "number": 10,
        "en": "plenty of space",
        "ja": "十分な空き容量",
        "wrong": [
          "一定の処理時間",
          "少量の電力",
          "限られた作業員"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_009_v011",
        "number": 11,
        "en": "measure",
        "ja": "測定する",
        "wrong": [
          "仕分ける",
          "運搬する",
          "修理する"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_009_v012",
        "number": 12,
        "en": "mechanism",
        "ja": "仕組み・機構",
        "wrong": [
          "廃棄物",
          "作業員",
          "流域"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_009_v013",
        "number": 13,
        "en": "incoming waste",
        "ja": "流れ込んでくるごみ",
        "wrong": [
          "処理済みのごみ",
          "回収できないごみ",
          "分別後のごみ"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_009_v014",
        "number": 14,
        "en": "adjusting",
        "ja": "調整すること",
        "wrong": [
          "中止すること",
          "予測すること",
          "記録すること"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_009_v015",
        "number": 15,
        "en": "destination",
        "ja": "送り先",
        "wrong": [
          "発生源",
          "残り時間",
          "最大重量"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_009_v016",
        "number": 16,
        "en": "prevents",
        "ja": "防ぐ",
        "wrong": [
          "許可する",
          "勧める",
          "確認する"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_009_v017",
        "number": 17,
        "en": "reaching their limits",
        "ja": "容量の限界に達すること",
        "wrong": [
          "川岸に到着すること",
          "流れを変えること",
          "回収を終えること"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_009_v018",
        "number": 18,
        "en": "powered by",
        "ja": "〜を動力として動く",
        "wrong": [
          "〜を材料として作られる",
          "〜に固定される",
          "〜から切り離される"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_009_v019",
        "number": 19,
        "en": "regularly",
        "ja": "定期的に",
        "wrong": [
          "偶然に",
          "一度だけ",
          "急に"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_009_v020",
        "number": 20,
        "en": "keeps track of",
        "ja": "〜を継続的に把握する",
        "wrong": [
          "〜を取り替える",
          "〜の許可を得る",
          "〜を廃棄する"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_009_v021",
        "number": 21,
        "en": "automatically",
        "ja": "自動的に",
        "wrong": [
          "手作業で",
          "一時的に",
          "個別に"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_009_v022",
        "number": 22,
        "en": "in person",
        "ja": "直接その場で",
        "wrong": [
          "電話を通して",
          "電子メールで",
          "代理人を通して"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_009_v023",
        "number": 23,
        "en": "permanently",
        "ja": "永久に",
        "wrong": [
          "一時的に",
          "交互に",
          "毎月"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_009_v024",
        "number": 24,
        "en": "detached",
        "ja": "取り外された",
        "wrong": [
          "固定された",
          "満たされた",
          "測定された"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_009_v025",
        "number": 25,
        "en": "riverbank",
        "ja": "川岸",
        "wrong": [
          "河口",
          "川底",
          "水面"
        ],
        "location": "d1"
      },
      {
        "id": "q7_set_009_v026",
        "number": 26,
        "en": "unloaded",
        "ja": "荷降ろしされた",
        "wrong": [
          "積み込まれた",
          "取り付けられた",
          "測定された"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_009_v027",
        "number": 27,
        "en": "waste-management facility",
        "ja": "廃棄物処理施設",
        "wrong": [
          "水力発電施設",
          "気象観測施設",
          "河川の案内所"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_009_v028",
        "number": 28,
        "en": "storage capacity",
        "ja": "保管容量",
        "wrong": [
          "運転速度",
          "処理費用",
          "機械の重さ"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_009_v029",
        "number": 29,
        "en": "equivalent volume",
        "ja": "同じ体積",
        "wrong": [
          "異なる形状",
          "一定の重さ",
          "余分な面積"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_009_v030",
        "number": 30,
        "en": "dimensions",
        "ja": "寸法",
        "wrong": [
          "材質",
          "用途",
          "値段"
        ],
        "location": "A6"
      }
    ]
  },
  {
    "setId": "q7_set_010",
    "words": [
      {
        "id": "q7_set_010_v001",
        "number": 1,
        "en": "treasure hunts",
        "ja": "宝探し",
        "wrong": [
          "自然観察",
          "施設見学",
          "集団研修"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_010_v002",
        "number": 2,
        "en": "participants",
        "ja": "参加者",
        "wrong": [
          "所有者",
          "審査員",
          "販売員"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_010_v003",
        "number": 3,
        "en": "containers",
        "ja": "容器",
        "wrong": [
          "記録",
          "座標",
          "端末"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_010_v004",
        "number": 4,
        "en": "exchange",
        "ja": "交換する",
        "wrong": [
          "保管する",
          "返却する",
          "購入する"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_010_v005",
        "number": 5,
        "en": "property",
        "ja": "所有物",
        "wrong": [
          "目的地",
          "参加資格",
          "使用記録"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_010_v006",
        "number": 6,
        "en": "intended to",
        "ja": "〜することを目的としている",
        "wrong": [
          "〜することを禁じられている",
          "〜することを忘れている",
          "〜することを疑っている"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_010_v007",
        "number": 7,
        "en": "destinations",
        "ja": "目的地",
        "wrong": [
          "出発時刻",
          "所有者",
          "参加費"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_010_v008",
        "number": 8,
        "en": "roughly",
        "ja": "およそ",
        "wrong": [
          "正確に",
          "最低でも",
          "最大でも"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_010_v009",
        "number": 9,
        "en": "particular",
        "ja": "特定の",
        "wrong": [
          "すべての",
          "不明な",
          "無関係な"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_010_v010",
        "number": 10,
        "en": "permission",
        "ja": "許可",
        "wrong": [
          "指示",
          "記録",
          "報酬"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_010_v011",
        "number": 11,
        "en": "responsible for",
        "ja": "〜を管理する責任がある",
        "wrong": [
          "〜について知らない",
          "〜と関係がない",
          "〜を探している"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_010_v012",
        "number": 12,
        "en": "physical parts",
        "ja": "実際に設置された物",
        "wrong": [
          "オンライン上の記録",
          "参加者の個人情報",
          "所有者の連絡先"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_010_v013",
        "number": 13,
        "en": "separate geocaches",
        "ja": "別々のジオキャッシュ",
        "wrong": [
          "同じジオキャッシュの各段階",
          "移動中のトラッカブル",
          "未登録の参加者"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_010_v014",
        "number": 14,
        "en": "conversion",
        "ja": "換算",
        "wrong": [
          "予約",
          "設置",
          "交換"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_010_v015",
        "number": 15,
        "en": "restriction",
        "ja": "制限",
        "wrong": [
          "推薦",
          "報酬",
          "許可"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_010_v016",
        "number": 16,
        "en": "apply to",
        "ja": "〜に適用される",
        "wrong": [
          "〜を探しに行く",
          "〜の所有者になる",
          "〜から遠ざかる"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_010_v017",
        "number": 17,
        "en": "sense of smell",
        "ja": "嗅覚",
        "wrong": [
          "視覚",
          "聴覚",
          "触覚"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_010_v018",
        "number": 18,
        "en": "air fresheners",
        "ja": "芳香剤",
        "wrong": [
          "保存容器",
          "携帯用充電器",
          "防虫網"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_010_v019",
        "number": 19,
        "en": "damage",
        "ja": "損傷を与える",
        "wrong": [
          "修理する",
          "取り替える",
          "移動させる"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_010_v020",
        "number": 20,
        "en": "unsuitable",
        "ja": "適さない",
        "wrong": [
          "見つけやすい",
          "十分な",
          "無害な"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_010_v021",
        "number": 21,
        "en": "identification codes",
        "ja": "識別コード",
        "wrong": [
          "暗証番号の変更履歴",
          "商品の価格表",
          "緊急連絡先"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_010_v022",
        "number": 22,
        "en": "visible",
        "ja": "見える",
        "wrong": [
          "利用できない",
          "取り外せる",
          "変更できない"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_010_v023",
        "number": 23,
        "en": "reference number",
        "ja": "参照番号",
        "wrong": [
          "受取番号",
          "電話番号",
          "郵便番号"
        ],
        "location": "B5"
      },
      {
        "id": "q7_set_010_v024",
        "number": 24,
        "en": "limited purpose",
        "ja": "限られた用途",
        "wrong": [
          "共通の目標",
          "一定の距離",
          "複雑な仕組み"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_010_v025",
        "number": 25,
        "en": "encountered",
        "ja": "実際に出会った・接した",
        "wrong": [
          "予約した",
          "修理した",
          "購入した"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_010_v026",
        "number": 26,
        "en": "geological features",
        "ja": "地質学的な特徴",
        "wrong": [
          "地域の交通事情",
          "季節ごとの行事",
          "施設の利用規則"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_010_v027",
        "number": 27,
        "en": "rock formations",
        "ja": "岩の形・岩の構造",
        "wrong": [
          "動物の足跡",
          "木々の種類",
          "天候の変化"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_010_v028",
        "number": 28,
        "en": "privately",
        "ja": "非公開で",
        "wrong": [
          "大勢の前で",
          "自動的に",
          "定期的に"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_010_v029",
        "number": 29,
        "en": "requirements",
        "ja": "求められる条件",
        "wrong": [
          "支払い済みの費用",
          "集められた記録",
          "予想された結果"
        ],
        "location": "A6"
      },
      {
        "id": "q7_set_010_v030",
        "number": 30,
        "en": "reliable",
        "ja": "信頼できる",
        "wrong": [
          "使い捨ての",
          "非公開の",
          "一時的な"
        ],
        "location": "A7"
      }
    ]
  },
  {
    "setId": "q7_set_011",
    "words": [
      {
        "id": "q7_set_011_v001",
        "number": 1,
        "en": "neighborhood",
        "ja": "近所・地域",
        "wrong": [
          "図書館の館内",
          "利用者の年齢層",
          "本の分類"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_011_v002",
        "number": 2,
        "en": "membership cards",
        "ja": "会員カード",
        "wrong": [
          "貸出記録",
          "購入証明書",
          "利用案内"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_011_v003",
        "number": 3,
        "en": "borrowing records",
        "ja": "貸出記録",
        "wrong": [
          "購入費用",
          "書籍の目録",
          "設置許可証"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_011_v004",
        "number": 4,
        "en": "contribute",
        "ja": "提供する・寄付する",
        "wrong": [
          "購入する",
          "返却を求める",
          "修理する"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_011_v005",
        "number": 5,
        "en": "willingness",
        "ja": "進んで〜する気持ち",
        "wrong": [
          "〜する義務",
          "〜する能力",
          "〜する許可"
        ],
        "location": "A1"
      },
      {
        "id": "q7_set_011_v006",
        "number": 6,
        "en": "finished box",
        "ja": "完成した箱",
        "wrong": [
          "使い古した箱",
          "壊れた箱",
          "持ち主のいない箱"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_011_v007",
        "number": 7,
        "en": "automatically",
        "ja": "自動的に",
        "wrong": [
          "手作業で",
          "例外的に",
          "一時的に"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_011_v008",
        "number": 8,
        "en": "official network",
        "ja": "公式ネットワーク",
        "wrong": [
          "個人の蔵書",
          "貸出履歴",
          "地域の販売店"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_011_v009",
        "number": 9,
        "en": "registered",
        "ja": "登録された",
        "wrong": [
          "貸し出された",
          "返却された",
          "廃棄された"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_011_v010",
        "number": 10,
        "en": "plate",
        "ja": "プレート・板",
        "wrong": [
          "扉の取っ手",
          "屋根の支柱",
          "本の表紙"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_011_v011",
        "number": 11,
        "en": "identification number",
        "ja": "識別番号",
        "wrong": [
          "電話番号",
          "価格表示",
          "貸出期限"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_011_v012",
        "number": 12,
        "en": "recognize",
        "ja": "識別する",
        "wrong": [
          "修繕する",
          "提供する",
          "保管する"
        ],
        "location": "A2"
      },
      {
        "id": "q7_set_011_v013",
        "number": 13,
        "en": "steward",
        "ja": "管理者",
        "wrong": [
          "著者",
          "読者",
          "購入希望者"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_011_v014",
        "number": 14,
        "en": "condition",
        "ja": "状態",
        "wrong": [
          "設置日",
          "所有権",
          "貸出期限"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_011_v015",
        "number": 15,
        "en": "available",
        "ja": "利用できる",
        "wrong": [
          "予約が必要な",
          "返却済みの",
          "販売禁止の"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_011_v016",
        "number": 16,
        "en": "business days",
        "ja": "営業日",
        "wrong": [
          "祝日",
          "休業日",
          "申込日"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_011_v017",
        "number": 17,
        "en": "individual",
        "ja": "個人・人",
        "wrong": [
          "団体・組織",
          "地域・地区",
          "設備・施設"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_011_v018",
        "number": 18,
        "en": "responsibility",
        "ja": "責任",
        "wrong": [
          "費用",
          "利益",
          "希望"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_011_v019",
        "number": 19,
        "en": "transferred",
        "ja": "移された",
        "wrong": [
          "破棄された",
          "禁止された",
          "記録された"
        ],
        "location": "A3"
      },
      {
        "id": "q7_set_011_v020",
        "number": 20,
        "en": "maintains",
        "ja": "維持・管理する",
        "wrong": [
          "取り消す",
          "購入する",
          "見学する"
        ],
        "location": "B5"
      },
      {
        "id": "q7_set_011_v021",
        "number": 21,
        "en": "immediately",
        "ja": "すぐに",
        "wrong": [
          "定期的に",
          "徐々に",
          "偶然に"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_011_v022",
        "number": 22,
        "en": "location information",
        "ja": "位置情報",
        "wrong": [
          "貸出情報",
          "価格情報",
          "利用者情報"
        ],
        "location": "B5"
      },
      {
        "id": "q7_set_011_v023",
        "number": 23,
        "en": "public map",
        "ja": "一般公開の地図",
        "wrong": [
          "私有地の一覧",
          "非公開の設計図",
          "店内の案内表示"
        ],
        "location": "A4"
      },
      {
        "id": "q7_set_011_v024",
        "number": 24,
        "en": "protect",
        "ja": "守る",
        "wrong": [
          "取り替える",
          "比較する",
          "移動する"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_011_v025",
        "number": 25,
        "en": "extending beyond",
        "ja": "〜より外側に張り出す",
        "wrong": [
          "〜より内側に収まる",
          "〜の下に隠れる",
          "〜の上に重なる"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_011_v026",
        "number": 26,
        "en": "overhang",
        "ja": "張り出し部分",
        "wrong": [
          "扉の留め具",
          "床のすき間",
          "棚の仕切り"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_011_v027",
        "number": 27,
        "en": "no less than",
        "ja": "〜以上",
        "wrong": [
          "〜未満",
          "〜と同じ",
          "〜より少し少ない"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_011_v028",
        "number": 28,
        "en": "no more than",
        "ja": "〜以下",
        "wrong": [
          "〜を超える",
          "〜とほぼ同じ",
          "〜より少し多い"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_011_v029",
        "number": 29,
        "en": "practical details",
        "ja": "実用上の細かな工夫",
        "wrong": [
          "理論上の問題点",
          "見た目だけの飾り",
          "個人的な感想"
        ],
        "location": "A5"
      },
      {
        "id": "q7_set_011_v030",
        "number": 30,
        "en": "approximately",
        "ja": "およそ",
        "wrong": [
          "正確に",
          "最低でも",
          "最大でも"
        ],
        "location": "B6"
      }
    ]
  }
];
  window.q7VocabSets.push(...additions);
})();
