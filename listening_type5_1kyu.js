// listening_type5_1kyu.js
// 全商英検1級 リスニング 大問5形式
// オリジナル問題

window.LISTENING_TYPE5_1KYU = [
{
  id: "L5_001",
  level: 1,
  part: "listening",
  format: 5,
  type: "long_passage",

  title: "Fog Nets",

  sourceType: "original",

  audioFile:
    "audio/listening/1kyu/type5/L5_001.mp3",

  script:
    `A small coastal town has found an unusual way to collect water from the air. The town receives very little rain, but thick fog often covers the nearby hills in the early morning. To make use of this fog, engineers installed large vertical nets on the hills several years ago. When fog passes through the nets, tiny drops of water collect on the mesh. The water then runs through pipes into storage tanks.

At first, the town used ten nets as an experiment. On a foggy day, they collected about 300 liters of water. Later, the system was expanded to twenty-five nets, and the amount sometimes reached 800 liters. The collected water is not usually used for drinking because it must be treated first. Instead, residents mainly use it to water young trees and clean public areas.

The nets cannot supply all the water the town needs. During the foggiest months, however, they reduce the need for water-truck deliveries, which lowers some of the town's water costs.`,

  scriptJa:
    `ある小さな海沿いの町では、空気から水を集めるという珍しい方法が使われています。その町では雨がほとんど降りませんが、早朝には近くの丘が濃い霧に覆われることがよくあります。この霧を利用するために、技術者たちは数年前、丘に大きな縦型のネットを設置しました。霧がネットを通り抜けると、小さな水滴が網目に集まります。その水はパイプを通って貯水タンクへ流れます。

最初、町は実験として10枚のネットを使用しました。霧の濃い日には、約300リットルの水を集めました。その後、システムは25枚のネットに拡大され、水の量は800リットルに達することもありました。集められた水は、まず処理する必要があるため、通常は飲み水として使われません。その代わり、住民は主に若い木への水やりや公共の場所の清掃に利用しています。

このネットだけで町に必要なすべての水を供給することはできません。しかし、霧が最も多い時期には、給水車による水の配送の必要性を減らし、町の水にかかる費用の一部を抑えることができます。`,

  questions: [

    {
      id: "L5_001_Q1",

      questionType:
        "sentence_completion_reason",

      stem:
        "The engineers chose the hills for the nets because",

      stemJa:
        "技術者たちがネットを丘に設置したのは、",

      choices: [
        {
          id: "A",
          text:
            "the hills received most of the town's rainfall.",
          ja:
            "町に降る雨のほとんどが丘に降ったから。"
        },
        {
          id: "B",
          text:
            "thick fog often covered the hills in the morning.",
          ja:
            "朝、丘が濃い霧に覆われることが多かったから。"
        },
        {
          id: "C",
          text:
            "the storage tanks were already located on the hills.",
          ja:
            "貯水タンクがすでに丘に設置されていたから。"
        },
        {
          id: "D",
          text:
            "water trucks could reach the hills more easily than the town.",
          ja:
            "給水車が町より丘へ行きやすかったから。"
        }
      ],

      answerId:
        "B",

      evidence:
        "The town receives very little rain, but thick fog often covers the nearby hills in the early morning. To make use of this fog, engineers installed large vertical nets on the hills several years ago.",

      evidenceJa:
        "その町では雨がほとんど降りませんが、早朝には近くの丘が濃い霧に覆われることがよくあります。この霧を利用するために、技術者たちは数年前、丘に大きな縦型のネットを設置しました。"
    },


    {
      id: "L5_001_Q2",

      questionType:
        "sentence_completion_process",

      stem:
        "After fog water collects on the mesh, it",

      stemJa:
        "霧の水滴が網目に集まった後、その水は、",

      choices: [
        {
          id: "A",
          text:
            "stays on the nets until the tanks are emptied.",
          ja:
            "貯水タンクが空になるまでネット上に残る。"
        },
        {
          id: "B",
          text:
            "flows through pipes into storage tanks.",
          ja:
            "パイプを通って貯水タンクへ流れる。"
        },
        {
          id: "C",
          text:
            "is carried to the tanks by water trucks.",
          ja:
            "給水車によって貯水タンクまで運ばれる。"
        },
        {
          id: "D",
          text:
            "is treated before it leaves the nets.",
          ja:
            "ネットから流れ出る前に処理される。"
        }
      ],

      answerId:
        "B",

      evidence:
        "When fog passes through the nets, tiny drops of water collect on the mesh. The water then runs through pipes into storage tanks.",

      evidenceJa:
        "霧がネットを通り抜けると、小さな水滴が網目に集まります。その水はパイプを通って貯水タンクへ流れます。"
    },


    {
      id: "L5_001_Q3",

      questionType:
        "sentence_completion_number",

      stem:
        "When the number of nets increased from ten to twenty-five,",

      stemJa:
        "ネットの数が10枚から25枚に増えたとき、",

      choices: [
        {
          id: "A",
          text:
            "the amount collected sometimes rose from about 300 to 800 liters.",
          ja:
            "集められる水の量が約300リットルから800リットルに増えることがあった。"
        },
        {
          id: "B",
          text:
            "each net began collecting about 800 liters on a foggy day.",
          ja:
            "各ネットが霧の濃い日に約800リットル集めるようになった。"
        },
        {
          id: "C",
          text:
            "the town always collected exactly 800 liters of water.",
          ja:
            "町は常に正確に800リットルの水を集めるようになった。"
        },
        {
          id: "D",
          text:
            "the first ten nets stopped collecting about 300 liters.",
          ja:
            "最初の10枚のネットでは約300リットル集められなくなった。"
        }
      ],

      answerId:
        "A",

      evidence:
        "At first, the town used ten nets as an experiment. On a foggy day, they collected about 300 liters of water. Later, the system was expanded to twenty-five nets, and the amount sometimes reached 800 liters.",

      evidenceJa:
        "最初、町は実験として10枚のネットを使用しました。霧の濃い日には、約300リットルの水を集めました。その後、システムは25枚のネットに拡大され、水の量は800リットルに達することもありました。"
    },


    {
      id: "L5_001_Q4",

      questionType:
        "sentence_completion_use",

      stem:
        "Because the collected water is not normally used for drinking, residents mainly",

      stemJa:
        "集められた水は通常飲み水として使われないため、住民は主に、",

      choices: [
        {
          id: "A",
          text:
            "use it for young trees and cleaning public areas.",
          ja:
            "若い木への水やりや公共の場所の清掃に使う。"
        },
        {
          id: "B",
          text:
            "send it to treatment plants before using it at home.",
          ja:
            "家庭で使う前に処理施設へ送る。"
        },
        {
          id: "C",
          text:
            "store it until enough has been collected for drinking.",
          ja:
            "飲み水に十分な量が集まるまで保管する。"
        },
        {
          id: "D",
          text:
            "put it into the trucks that deliver drinking water.",
          ja:
            "飲み水を配送する給水車に入れる。"
        }
      ],

      answerId:
        "A",

      evidence:
        "The collected water is not usually used for drinking because it must be treated first. Instead, residents mainly use it to water young trees and clean public areas.",

      evidenceJa:
        "集められた水は、まず処理する必要があるため、通常は飲み水として使われません。その代わり、住民は主に若い木への水やりや公共の場所の清掃に利用しています。"
    },


    {
      id: "L5_001_Q5",

      questionType:
        "sentence_completion_result",

      stem:
        "During the foggiest months, the fog nets help the town by",

      stemJa:
        "霧が最も多い時期には、霧を集めるネットは町に対して、",

      choices: [
        {
          id: "A",
          text:
            "providing enough drinking water for all residents.",
          ja:
            "すべての住民に十分な飲み水を供給することで役立つ。"
        },
        {
          id: "B",
          text:
            "reducing water-truck deliveries and some water costs.",
          ja:
            "給水車の配送回数と水にかかる費用の一部を減らすことで役立つ。"
        },
        {
          id: "C",
          text:
            "increasing the amount of rain that reaches the hills.",
          ja:
            "丘に降る雨の量を増やすことで役立つ。"
        },
        {
          id: "D",
          text:
            "replacing the town's other water sources completely.",
          ja:
            "町のほかの水源を完全に置き換えることで役立つ。"
        }
      ],

      answerId:
        "B",

      evidence:
        "During the foggiest months, however, they reduce the need for water-truck deliveries, which lowers some of the town's water costs.",

      evidenceJa:
        "しかし、霧が最も多い時期には、給水車による水の配送の必要性を減らし、町の水にかかる費用の一部を抑えることができます。"
    }

  ]
},

{
  id: "L5_002",
  level: 1,
  part: "listening",
  format: 5,
  type: "long_passage",

  title: "Reducing Food Waste with Apps",

  sourceType: "original",

  audioFile:
    "audio/listening/1kyu/type5/L5_002.mp3",

  script:
    `Every day, restaurants and bakeries throw away food that is still safe to eat. One reason is that they often prepare more food than customers actually buy. In recent years, some cities have begun using smartphone apps to reduce this waste. Through these apps, stores can offer unsold meals, bread, and other food at lower prices near the end of the day.

Customers pay through the app and then visit the store to pick up what they ordered. Stores can earn some money from food that would otherwise be discarded, while customers can buy meals for less. The system can also reduce the amount of waste sent to landfills.

There are some limits, however. Customers usually cannot choose exactly what they will receive because the available food changes from day to day. The service also works better in areas where many stores and users are located close together. In such places, the apps can connect unsold food with customers before it has to be thrown away.`,

  scriptJa:
    `毎日、レストランやパン屋では、まだ安全に食べられる食品が捨てられています。その理由の一つは、実際に客が買う量よりも多くの食品を用意することがよくあるからです。近年、一部の都市では、この廃棄を減らすためにスマートフォンのアプリが使われるようになっています。こうしたアプリを通して、店は一日の終わりごろに、売れ残った食事やパンなどの食品を安い価格で提供できます。

客はアプリで支払いをしてから、注文したものを受け取るために店を訪れます。店は、本来なら捨てられてしまう食品からいくらか収入を得ることができ、一方で客は食事を安く買うことができます。また、この仕組みによって、埋立地へ送られるごみの量を減らすこともできます。

しかし、いくつかの制約もあります。利用できる食品は日によって変わるため、客は通常、受け取るものを正確に選ぶことができません。また、このサービスは、多くの店と利用者が互いに近い場所にいる地域で、より効果的に機能します。そうした地域では、捨てられる前の売れ残った食品と客をアプリで結びつけることができます。`,

  questions: [

    {
      id: "L5_002_Q1",

      questionType:
        "sentence_completion_reason",

      stem:
        "Restaurants and bakeries may have food left over because they",

      stemJa:
        "レストランやパン屋で食品が売れ残ることがあるのは、",

      choices: [
        {
          id: "A",
          text:
            "sometimes prepare more food than customers buy.",
          ja:
            "客が買う量より多くの食品を用意することがあるから。"
        },
        {
          id: "B",
          text:
            "must stop selling all food near the end of the day.",
          ja:
            "一日の終わりごろにはすべての食品の販売をやめなければならないから。"
        },
        {
          id: "C",
          text:
            "prepare most of their food only after customers order it.",
          ja:
            "ほとんどの食品を客が注文してから用意するから。"
        },
        {
          id: "D",
          text:
            "usually receive more orders through apps than they can prepare.",
          ja:
            "通常、用意できる量を超える注文をアプリで受けるから。"
        }
      ],

      answerId:
        "A",

      evidence:
        "One reason is that they often prepare more food than customers actually buy.",

      evidenceJa:
        "その理由の一つは、実際に客が買う量よりも多くの食品を用意することがよくあるからです。"
    },


    {
      id: "L5_002_Q2",

      questionType:
        "sentence_completion_process",

      stem:
        "After buying food through the app, customers",

      stemJa:
        "客はアプリで食品を購入した後、",

      choices: [
        {
          id: "A",
          text:
            "wait for the store to deliver it to their homes.",
          ja:
            "店が自宅まで食品を配達するのを待つ。"
        },
        {
          id: "B",
          text:
            "go to the store and collect what they ordered.",
          ja:
            "店へ行き、注文したものを受け取る。"
        },
        {
          id: "C",
          text:
            "return to the app and choose a pickup time for the next day.",
          ja:
            "アプリに戻り、翌日の受取時間を選ぶ。"
        },
        {
          id: "D",
          text:
            "ask the store to prepare a new meal at the lower price.",
          ja:
            "安い価格で新しい食事を用意するよう店に頼む。"
        }
      ],

      answerId:
        "B",

      evidence:
        "Customers pay through the app and then visit the store to pick up what they ordered.",

      evidenceJa:
        "客はアプリで支払いをしてから、注文したものを受け取るために店を訪れます。"
    },


    {
      id: "L5_002_Q3",

      questionType:
        "sentence_completion_benefit",

      stem:
        "Selling unsold food through the apps allows stores to",

      stemJa:
        "売れ残った食品をアプリで販売することで、店は、",

      choices: [
        {
          id: "A",
          text:
            "earn some money from food that might otherwise be thrown away.",
          ja:
            "本来なら捨てられるかもしれない食品から、いくらか収入を得ることができる。"
        },
        {
          id: "B",
          text:
            "charge more for food that customers order late in the day.",
          ja:
            "一日の遅い時間に客が注文した食品を、より高い価格で販売できる。"
        },
        {
          id: "C",
          text:
            "avoid preparing more food than customers are likely to buy.",
          ja:
            "客が買いそうな量を超えて食品を用意することを避けられる。"
        },
        {
          id: "D",
          text:
            "send less popular food directly to landfills.",
          ja:
            "人気のない食品を直接埋立地へ送ることができる。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Stores can earn some money from food that would otherwise be discarded, while customers can buy meals for less.",

      evidenceJa:
        "店は、本来なら捨てられてしまう食品からいくらか収入を得ることができ、一方で客は食事を安く買うことができます。"
    },


    {
      id: "L5_002_Q4",

      questionType:
        "sentence_completion_limit",

      stem:
        "Customers cannot always choose exactly what food they will get since",

      stemJa:
        "客が受け取る食品をいつも正確に選べるわけではないのは、",

      choices: [
        {
          id: "A",
          text:
            "stores lower the prices only near the end of the day.",
          ja:
            "店が一日の終わりごろにだけ価格を下げるから。"
        },
        {
          id: "B",
          text:
            "the food available for sale changes each day.",
          ja:
            "販売できる食品が日によって変わるから。"
        },
        {
          id: "C",
          text:
            "customers must collect their food from the store.",
          ja:
            "客が食品を店まで受け取りに行かなければならないから。"
        },
        {
          id: "D",
          text:
            "restaurants prepare different amounts of food for each customer.",
          ja:
            "レストランが客ごとに異なる量の食品を用意するから。"
        }
      ],

      answerId:
        "B",

      evidence:
        "Customers usually cannot choose exactly what they will receive because the available food changes from day to day.",

      evidenceJa:
        "利用できる食品は日によって変わるため、客は通常、受け取るものを正確に選ぶことができません。"
    },


    {
      id: "L5_002_Q5",

      questionType:
        "sentence_completion_condition",

      stem:
        "The food waste app service tends to work better when",

      stemJa:
        "食品ロスを減らすアプリのサービスがより効果的に機能するのは、",

      choices: [
        {
          id: "A",
          text:
            "stores and customers are located close to one another.",
          ja:
            "店と客が互いに近い場所にいるとき。"
        },
        {
          id: "B",
          text:
            "stores have large amounts of food left every day.",
          ja:
            "店に毎日大量の食品が売れ残るとき。"
        },
        {
          id: "C",
          text:
            "customers can choose exactly which food they will receive.",
          ja:
            "客が受け取る食品を正確に選べるとき。"
        },
        {
          id: "D",
          text:
            "food is delivered from stores instead of being picked up.",
          ja:
            "食品を店で受け取るのではなく、店から配達してもらうとき。"
        }
      ],

      answerId:
        "A",

      evidence:
        "The service also works better in areas where many stores and users are located close together.",

      evidenceJa:
        "また、このサービスは、多くの店と利用者が互いに近い場所にいる地域で、より効果的に機能します。"
    }

  ]
},

{
  id: "L5_003",
  level: 1,
  part: "listening",
  format: 5,
  type: "long_passage",

  title: "Rooftop Farming in Cities",

  sourceType: "original",

  audioFile:
    "audio/listening/1kyu/type5/L5_003.mp3",

  script:
    `In many large cities, open land for farming is difficult to find. Because of this, some people have started growing vegetables and herbs on the roofs of buildings. These rooftop farms can provide fresh food close to where people live and work. As a result, the food does not have to travel as far by truck before reaching customers.

Rooftop farms can offer other benefits as well. Plants absorb some of the heat from the sun, so they can help buildings stay cooler in summer. Some rooftop farms are also used as places where local residents can learn about farming and food production.

There are challenges, however. Buildings must be strong enough to support the weight of soil, water, and equipment. Farmers also need safe ways to carry supplies up to the roof and harvested food back down. Because of these limits, rooftop farms are suitable only for certain buildings, but where they can be used, they make productive use of space that might otherwise remain empty.`,

  scriptJa:
    `多くの大都市では、農業に使える空き地を見つけることが難しくなっています。そのため、建物の屋上で野菜やハーブを育て始める人々もいます。こうした屋上農園では、人々が暮らしたり働いたりする場所の近くで新鮮な食品を生産できます。その結果、食品が消費者のもとへ届くまでに、トラックでそれほど長い距離を運ぶ必要がありません。

屋上農園には、ほかにも利点があります。植物は太陽からの熱の一部を吸収するため、夏に建物を涼しく保つ助けになります。また、一部の屋上農園は、地域住民が農業や食料生産について学ぶ場所としても利用されています。

しかし、課題もあります。建物は、土や水、設備の重さを支えられるほど十分に頑丈でなければなりません。また、農家は資材を安全に屋上へ運び、収穫した食品を下へ運ぶ方法も必要です。こうした制約があるため、屋上農園に適しているのは一部の建物だけですが、利用できる場所では、本来使われないままになっていたかもしれない空間を有効活用することができます。`,

  questions: [

    {
      id: "L5_003_Q1",

      questionType:
        "sentence_completion_reason",

      stem:
        "Some people have started farming on rooftops because",

      stemJa:
        "屋上で農業を始める人々がいるのは、",

      choices: [
        {
          id: "A",
          text:
            "open land for farming is difficult to find in large cities.",
          ja:
            "大都市では農業に使える空き地を見つけることが難しいから。"
        },
        {
          id: "B",
          text:
            "food grown on rooftops does not need to be harvested.",
          ja:
            "屋上で育てた食品は収穫する必要がないから。"
        },
        {
          id: "C",
          text:
            "buildings are usually cooler than farms outside cities.",
          ja:
            "建物は通常、都市の外の農地より涼しいから。"
        },
        {
          id: "D",
          text:
            "farmers can use more land on rooftops than on the ground.",
          ja:
            "地上より屋上の方が多くの土地を使えるから。"
        }
      ],

      answerId:
        "A",

      evidence:
        "In many large cities, open land for farming is difficult to find. Because of this, some people have started growing vegetables and herbs on the roofs of buildings.",

      evidenceJa:
        "多くの大都市では、農業に使える空き地を見つけることが難しくなっています。そのため、建物の屋上で野菜やハーブを育て始める人々もいます。"
    },


    {
      id: "L5_003_Q2",

      questionType:
        "sentence_completion_transport",

      stem:
        "Because rooftop farms produce food near where people live and work, the food",

      stemJa:
        "屋上農園では人々が暮らしたり働いたりする場所の近くで食品を生産するため、その食品は、",

      choices: [
        {
          id: "A",
          text:
            "does not need to travel as far by truck.",
          ja:
            "トラックでそれほど長い距離を運ぶ必要がない。"
        },
        {
          id: "B",
          text:
            "can be carried directly from the roof to other cities.",
          ja:
            "屋上からほかの都市へ直接運ぶことができる。"
        },
        {
          id: "C",
          text:
            "must be delivered by smaller trucks.",
          ja:
            "より小さなトラックで配送しなければならない。"
        },
        {
          id: "D",
          text:
            "usually reaches customers later than farm products.",
          ja:
            "通常、農地で作られた食品より遅く消費者に届く。"
        }
      ],

      answerId:
        "A",

      evidence:
        "These rooftop farms can provide fresh food close to where people live and work. As a result, the food does not have to travel as far by truck before reaching customers.",

      evidenceJa:
        "こうした屋上農園では、人々が暮らしたり働いたりする場所の近くで新鮮な食品を生産できます。その結果、食品が消費者のもとへ届くまでに、トラックでそれほど長い距離を運ぶ必要がありません。"
    },


    {
      id: "L5_003_Q3",

      questionType:
        "sentence_completion_benefit",

      stem:
        "By absorbing some of the sun's heat, rooftop plants can",

      stemJa:
        "太陽の熱の一部を吸収することで、屋上の植物は、",

      choices: [
        {
          id: "A",
          text:
            "help buildings stay cooler in summer.",
          ja:
            "夏に建物を涼しく保つ助けになる。"
        },
        {
          id: "B",
          text:
            "prevent all heat from entering the building.",
          ja:
            "すべての熱が建物に入るのを防ぐ。"
        },
        {
          id: "C",
          text:
            "make it easier to carry equipment to the roof.",
          ja:
            "設備を屋上へ運びやすくする。"
        },
        {
          id: "D",
          text:
            "reduce the weight of soil and water.",
          ja:
            "土や水の重さを減らす。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Plants absorb some of the heat from the sun, so they can help buildings stay cooler in summer.",

      evidenceJa:
        "植物は太陽からの熱の一部を吸収するため、夏に建物を涼しく保つ助けになります。"
    },


    {
      id: "L5_003_Q4",

      questionType:
        "sentence_completion_challenge",

      stem:
        "For a building to be suitable for rooftop farming, it must",

      stemJa:
        "建物が屋上農園に適しているためには、",

      choices: [
        {
          id: "A",
          text:
            "be able to support the weight of soil, water, and equipment.",
          ja:
            "土や水、設備の重さを支えることができなければならない。"
        },
        {
          id: "B",
          text:
            "have enough space for trucks to reach the roof.",
          ja:
            "トラックが屋上まで行ける十分なスペースがなければならない。"
        },
        {
          id: "C",
          text:
            "be used mainly as a place for local residents to study.",
          ja:
            "主に地域住民が学ぶ場所として使われなければならない。"
        },
        {
          id: "D",
          text:
            "remain cool without the help of rooftop plants.",
          ja:
            "屋上の植物の助けがなくても涼しく保たれなければならない。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Buildings must be strong enough to support the weight of soil, water, and equipment.",

      evidenceJa:
        "建物は、土や水、設備の重さを支えられるほど十分に頑丈でなければなりません。"
    },


    {
  id: "L5_003_Q5",

  questionType:
    "sentence_completion_educational_use",

  stem:
    "Besides producing fresh food, some rooftop farms are used to",

  stemJa:
    "新鮮な食品を生産することに加えて、一部の屋上農園は、",

  choices: [
    {
      id: "A",
      text:
        "teach local residents about farming and food production.",
      ja:
        "地域住民に農業や食料生産について教えるためにも使われている。"
    },
    {
      id: "B",
      text:
        "teach farmers how to carry equipment safely to the roof.",
      ja:
        "農家に設備を安全に屋上へ運ぶ方法を教えるためにも使われている。"
    },
    {
      id: "C",
      text:
        "show residents how to make buildings strong enough for farming.",
      ja:
        "住民に農業ができるほど建物を頑丈にする方法を示すためにも使われている。"
    },
    {
      id: "D",
      text:
        "teach customers how to transport food without using trucks.",
      ja:
        "客にトラックを使わずに食品を運ぶ方法を教えるためにも使われている。"
    }
  ],

  answerId:
    "A",

  evidence:
    "Some rooftop farms are also used as places where local residents can learn about farming and food production.",

  evidenceJa:
    "また、一部の屋上農園は、地域住民が農業や食料生産について学ぶ場所としても利用されています。"
}

  ]
},

{
  id: "L5_004",
  level: 1,
  part: "listening",
  format: 5,
  type: "long_passage",

  title: "A Library of Things",

  sourceType: "original",

  audioFile:
    "audio/listening/1kyu/type5/L5_004.mp3",

  script:
    `Most people think of libraries as places where they can borrow books. However, some libraries have started offering a different kind of service. In addition to books, they lend useful items such as tools, cooking equipment, games, and even small machines. This type of service is sometimes called a “Library of Things.”

Many people need certain items only once or twice a year. Buying something for such limited use can be expensive, and the item may spend most of its time sitting unused at home. Borrowing lets several people make use of the same product. This can save money and may also reduce the number of products that are eventually thrown away.

Running the service requires careful planning. Libraries need to check returned items for damage and make sure they are safe before lending them again. Some equipment also requires regular maintenance, and larger objects need enough storage space. When these issues are managed well, a Library of Things can help a community share useful resources instead of requiring every household to own them.`,

  scriptJa:
    `多くの人は、図書館というと本を借りる場所だと考えます。しかし、一部の図書館では、これとは異なる種類のサービスを提供し始めています。本に加えて、工具、調理器具、ゲーム、さらには小型の機械などの役立つ物も貸し出しています。このようなサービスは、「Library of Things」と呼ばれることがあります。

多くの人は、ある特定の物を年に1回か2回しか必要としません。そのように使用回数が少ない物を購入すると高くつくことがあり、しかもその物はほとんどの時間、家庭で使われないまま置かれることになります。借りる仕組みであれば、同じ製品を複数の人が利用できます。これによってお金を節約できるだけでなく、最終的に捨てられる製品の数を減らせる可能性もあります。

このサービスを運営するには慎重な計画が必要です。図書館は返却された物に破損がないかを確認し、再び貸し出す前に安全に使えることを確かめる必要があります。また、一部の機器には定期的な整備が必要で、大きな物には十分な保管場所も必要です。こうした問題を適切に管理できれば、Library of Thingsは、すべての家庭がそれぞれ物を所有するのではなく、地域で役立つ物を共有する助けになります。`,

  questions: [

    {
      id: "L5_004_Q1",

      questionType:
        "sentence_completion_service",

      stem:
        "Unlike a traditional library service, a Library of Things may allow people to",

      stemJa:
        "従来の図書館サービスとは異なり、Library of Thingsでは人々が、",

      choices: [
        {
          id: "A",
          text:
            "borrow tools and other useful objects as well as books.",
          ja:
            "本だけでなく、工具などの役立つ物も借りることができる。"
        },
        {
          id: "B",
          text:
            "buy cooking equipment that other people have returned.",
          ja:
            "ほかの人が返却した調理器具を購入することができる。"
        },
        {
          id: "C",
          text:
            "exchange old books for small machines.",
          ja:
            "古い本を小型の機械と交換することができる。"
        },
        {
          id: "D",
          text:
            "store household items at the library when they are not needed.",
          ja:
            "使わない家庭用品を図書館に保管してもらうことができる。"
        }
      ],

      answerId:
        "A",

      evidence:
        "In addition to books, they lend useful items such as tools, cooking equipment, games, and even small machines.",

      evidenceJa:
        "本に加えて、工具、調理器具、ゲーム、さらには小型の機械などの役立つ物も貸し出しています。"
    },


    {
      id: "L5_004_Q2",

      questionType:
        "sentence_completion_reason",

      stem:
        "Borrowing an item may be a better choice than buying it when people",

      stemJa:
        "物を購入するより借りる方がよい選択になり得るのは、人々が、",

      choices: [
        {
          id: "A",
          text:
            "need it only once or twice a year.",
          ja:
            "それを年に1回か2回しか必要としない場合。"
        },
        {
          id: "B",
          text:
            "want to keep it unused at home for most of the year.",
          ja:
            "一年のほとんどの間、それを家庭で使わずに置いておきたい場合。"
        },
        {
          id: "C",
          text:
            "need the same product more often than other people do.",
          ja:
            "ほかの人より頻繁に同じ製品を必要とする場合。"
        },
        {
          id: "D",
          text:
            "want to avoid returning the product after using it.",
          ja:
            "使用後に製品を返却することを避けたい場合。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Many people need certain items only once or twice a year. Buying something for such limited use can be expensive, and the item may spend most of its time sitting unused at home.",

      evidenceJa:
        "多くの人は、ある特定の物を年に1回か2回しか必要としません。そのように使用回数が少ない物を購入すると高くつくことがあり、しかもその物はほとんどの時間、家庭で使われないまま置かれることになります。"
    },


    {
      id: "L5_004_Q3",

      questionType:
        "sentence_completion_environment",

      stem:
        "When several people borrow and use the same product, this may",

      stemJa:
        "複数の人が同じ製品を借りて使うことで、",

      choices: [
        {
          id: "A",
          text:
            "reduce the number of products that are eventually thrown away.",
          ja:
            "最終的に捨てられる製品の数を減らせる可能性がある。"
        },
        {
          id: "B",
          text:
            "make each household buy the product after borrowing it.",
          ja:
            "各家庭が借りた後にその製品を購入するようになる可能性がある。"
        },
        {
          id: "C",
          text:
            "increase the amount of time products remain unused at home.",
          ja:
            "製品が家庭で使われないままになる時間を増やす可能性がある。"
        },
        {
          id: "D",
          text:
            "cause libraries to throw away returned products more quickly.",
          ja:
            "図書館が返却された製品をより早く捨てることになる可能性がある。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Borrowing lets several people make use of the same product. This can save money and may also reduce the number of products that are eventually thrown away.",

      evidenceJa:
        "借りる仕組みであれば、同じ製品を複数の人が利用できます。これによってお金を節約できるだけでなく、最終的に捨てられる製品の数を減らせる可能性もあります。"
    },


    {
      id: "L5_004_Q4",

      questionType:
        "sentence_completion_management",

      stem:
        "Before a returned item is lent to another person, a library needs to",

      stemJa:
        "返却された物を別の人に再び貸し出す前に、図書館は、",

      choices: [
        {
          id: "A",
          text:
            "check it for damage and make sure it is safe to use.",
          ja:
            "破損がないかを確認し、安全に使えることを確かめる必要がある。"
        },
        {
          id: "B",
          text:
            "replace it with a newer model whenever possible.",
          ja:
            "可能な限り新しい型の製品と交換する必要がある。"
        },
        {
          id: "C",
          text:
            "keep it in storage until another item is returned.",
          ja:
            "別の物が返却されるまで保管しておく必要がある。"
        },
        {
          id: "D",
          text:
            "ask the previous user to perform regular maintenance.",
          ja:
            "前の利用者に定期的な整備をしてもらう必要がある。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Libraries need to check returned items for damage and make sure they are safe before lending them again.",

      evidenceJa:
        "図書館は返却された物に破損がないかを確認し、再び貸し出す前に安全に使えることを確かめる必要があります。"
    },


    {
      id: "L5_004_Q5",

      questionType:
        "sentence_completion_resource_sharing",

      stem:
        "If a Library of Things is managed successfully, a community can",

      stemJa:
        "Library of Thingsが適切に運営されれば、地域では、",

      choices: [
        {
          id: "A",
          text:
            "share useful items instead of every household owning the same kind of product.",
          ja:
            "各家庭が同じ種類の製品を所有する代わりに、役立つ物を共有できる。"
        },
        {
          id: "B",
          text:
            "avoid providing storage space for larger objects.",
          ja:
            "大きな物のための保管場所を用意する必要がなくなる。"
        },
        {
          id: "C",
          text:
            "lend equipment without checking its condition.",
          ja:
            "機器の状態を確認せずに貸し出すことができる。"
        },
        {
          id: "D",
          text:
            "make sure that every borrowed item is used every day.",
          ja:
            "借りられたすべての物が毎日使われるようにできる。"
        }
      ],

      answerId:
        "A",

      evidence:
        "When these issues are managed well, a Library of Things can help a community share useful resources instead of requiring every household to own them.",

      evidenceJa:
        "こうした問題を適切に管理できれば、Library of Thingsは、すべての家庭がそれぞれ物を所有するのではなく、地域で役立つ物を共有する助けになります。"
    }

  ]
},

{
  id: "L5_005",
  level: 1,
  part: "listening",
  format: 5,
  type: "long_passage",

title: "Assistance Dogs",

  sourceType: "original",

  audioFile:
    "audio/listening/1kyu/type5/L5_005.mp3",

  script:
    `Many people know that guide dogs help people who cannot see well. However, assistance dogs can support people in many other ways. Some are trained to notice certain sounds and alert people who have difficulty hearing. Others can bring objects, open doors, or help someone keep their balance while walking.

Assistance dogs can also support people with serious medical conditions. In some cases, a dog may notice changes in a person's body before the person realizes something is wrong. The dog may then warn its owner or bring medicine. This can make it safer for some people to spend time at home or outside by themselves.

Training an assistance dog takes a long time. Before working with a person, a dog must learn many commands and practice in different environments. Not every dog can do this work successfully. Dogs need to remain calm, follow instructions, and behave safely around other people. With the right training and abilities, an assistance dog can make everyday activities safer and give its owner greater independence.`,

  scriptJa:
    `多くの人は、盲導犬が目の見えにくい人を助けることを知っています。しかし、補助犬はほかにもさまざまな方法で人を支えることができます。ある犬は特定の音に気づき、耳の聞こえにくい人に知らせるよう訓練されています。また別の犬は、物を持ってきたり、ドアを開けたり、歩くときに人がバランスを保つのを助けたりすることができます。

補助犬は、深刻な持病のある人を支えることもできます。場合によっては、本人が異変に気づく前に、犬が体の変化に気づくことがあります。その後、犬が飼い主に知らせたり、薬を持ってきたりすることがあります。これによって、人によっては自宅や屋外で一人で過ごすことがより安全になります。

補助犬を訓練するには長い時間がかかります。人と一緒に働き始める前に、犬は多くの指示を覚え、さまざまな環境で練習しなければなりません。すべての犬がこの仕事をうまくできるわけではありません。犬には、落ち着いて行動し、指示に従い、ほかの人の近くでも安全に振る舞うことが求められます。適切な訓練と能力があれば、補助犬は日常生活をより安全にし、飼い主の自立を高めることができます。`,

  questions: [

    {
      id: "L5_005_Q1",

      questionType:
        "sentence_completion_hearing",

      stem:
        "Some assistance dogs help people who have difficulty hearing by",

      stemJa:
        "一部の補助犬は、耳の聞こえにくい人を、",

      choices: [
        {
          id: "A",
          text:
            "noticing certain sounds and alerting them.",
          ja:
            "特定の音に気づいて知らせることで助ける。"
        },
        {
          id: "B",
          text:
            "bringing them objects whenever they hear a sound.",
          ja:
            "音を聞くたびに物を持ってくることで助ける。"
        },
        {
          id: "C",
          text:
            "opening doors so that sounds are easier to hear.",
          ja:
            "音を聞きやすくするためにドアを開けることで助ける。"
        },
        {
          id: "D",
          text:
            "teaching them to notice sounds by themselves.",
          ja:
            "自分で音に気づく方法を教えることで助ける。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Some are trained to notice certain sounds and alert people who have difficulty hearing.",

      evidenceJa:
        "ある犬は特定の音に気づき、耳の聞こえにくい人に知らせるよう訓練されています。"
    },


    {
      id: "L5_005_Q2",

      questionType:
        "sentence_completion_mobility",

      stem:
        "While a person is walking, an assistance dog may help by",

      stemJa:
        "人が歩いているとき、補助犬は、",

      choices: [
        {
          id: "A",
          text:
            "helping the person keep their balance.",
          ja:
            "その人がバランスを保つのを助ける。"
        },
        {
          id: "B",
          text:
            "bringing medicine whenever the person loses balance.",
          ja:
            "その人がバランスを崩すたびに薬を持ってくる。"
        },
        {
          id: "C",
          text:
            "opening every door before the person reaches it.",
          ja:
            "その人が到着する前にすべてのドアを開ける。"
        },
        {
          id: "D",
          text:
            "warning other people not to walk nearby.",
          ja:
            "ほかの人に近くを歩かないよう警告する。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Others can bring objects, open doors, or help someone keep their balance while walking.",

      evidenceJa:
        "また別の犬は、物を持ってきたり、ドアを開けたり、歩くときに人がバランスを保つのを助けたりすることができます。"
    },


    {
      id: "L5_005_Q3",

      questionType:
        "sentence_completion_medical",

      stem:
        "A dog that notices a change in its owner's body may",

      stemJa:
        "飼い主の体の変化に気づいた犬は、",

      choices: [
        {
          id: "A",
          text:
            "warn the owner before the owner notices the problem.",
          ja:
            "飼い主自身が異変に気づく前に知らせることがある。"
        },
        {
          id: "B",
          text:
            "decide which medicine the owner should take.",
          ja:
            "飼い主がどの薬を飲むべきか判断することがある。"
        },
        {
          id: "C",
          text:
            "wait until the owner asks for help.",
          ja:
            "飼い主が助けを求めるまで待つことがある。"
        },
        {
          id: "D",
          text:
            "prevent the change in the owner's body from happening.",
          ja:
            "飼い主の体に変化が起こること自体を防ぐことがある。"
        }
      ],

      answerId:
        "A",

      evidence:
        "In some cases, a dog may notice changes in a person's body before the person realizes something is wrong. The dog may then warn its owner or bring medicine.",

      evidenceJa:
        "場合によっては、本人が異変に気づく前に、犬が体の変化に気づくことがあります。その後、犬が飼い主に知らせたり、薬を持ってきたりすることがあります。"
    },


    {
      id: "L5_005_Q4",

      questionType:
        "sentence_completion_training",

      stem:
        "Before an assistance dog starts working with a person, it has to",

      stemJa:
        "補助犬が人と一緒に働き始める前に、その犬は、",

      choices: [
        {
          id: "A",
          text:
            "learn commands and practice in different environments.",
          ja:
            "指示を覚え、さまざまな環境で練習しなければならない。"
        },
        {
          id: "B",
          text:
            "learn how to help every type of medical condition.",
          ja:
            "あらゆる種類の持病を助ける方法を学ばなければならない。"
        },
        {
          id: "C",
          text:
            "practice only inside the home where it will work.",
          ja:
            "働くことになる家の中だけで練習しなければならない。"
        },
        {
          id: "D",
          text:
            "begin helping people before learning many commands.",
          ja:
            "多くの指示を覚える前に、人を助け始めなければならない。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Before working with a person, a dog must learn many commands and practice in different environments.",

      evidenceJa:
        "人と一緒に働き始める前に、犬は多くの指示を覚え、さまざまな環境で練習しなければなりません。"
    },


    {
      id: "L5_005_Q5",

      questionType:
        "sentence_completion_suitability",

      stem:
        "For an assistance dog to work safely with people, it needs to",

      stemJa:
        "補助犬が人と安全に働くためには、",

      choices: [
        {
          id: "A",
          text:
            "remain calm and follow instructions.",
          ja:
            "落ち着いて行動し、指示に従う必要がある。"
        },
        {
          id: "B",
          text:
            "notice every change in a person's body.",
          ja:
            "人の体のあらゆる変化に気づく必要がある。"
        },
        {
          id: "C",
          text:
            "be able to perform all kinds of assistance work.",
          ja:
            "あらゆる種類の補助作業を行える必要がある。"
        },
        {
          id: "D",
          text:
            "work without practicing around other people.",
          ja:
            "ほかの人の近くで練習せずに働ける必要がある。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Dogs need to remain calm, follow instructions, and behave safely around other people.",

      evidenceJa:
        "犬には、落ち着いて行動し、指示に従い、ほかの人の近くでも安全に振る舞うことが求められます。"
    }

  ]
},

{
  id: "L5_006",
  level: 1,
  part: "listening",
  format: 5,
  type: "long_passage",

  title: "Repair Cafés",

  sourceType: "original",

  audioFile:
    "audio/listening/1kyu/type5/L5_006.mp3",

  script:
    `Many people throw away household items when they stop working, even if the problem is small. To reduce this waste, some communities have started holding events called repair cafés. Instead of immediately replacing broken items, people bring them to these events and try to repair them with the help of volunteers.

At a repair café, visitors may bring lamps, small kitchen appliances, clothes, bicycles, or other everyday objects. Volunteers with repair skills examine the items and explain what might be wrong. Rather than doing all the work themselves, they often show the owners how to fix the problem.

Repair cafés can help people save money and learn useful skills at the same time. They also give neighbors a chance to meet and work together. However, not every item can be repaired. Some are too badly damaged, while others require special parts that may not be available. Even when a repair is not possible, the owner may learn more about why the item stopped working.`,

  scriptJa:
    `多くの人は、家庭用品が動かなくなると、たとえ問題が小さくても捨ててしまいます。このような廃棄を減らすため、一部の地域では「リペアカフェ」と呼ばれるイベントが開かれるようになっています。壊れた物をすぐに新しい物へ買い替えるのではなく、人々はそれらをイベントに持ち込み、ボランティアの助けを借りながら修理を試みます。

リペアカフェでは、利用者がランプ、小型の調理家電、衣服、自転車などの日用品を持ち込むことがあります。修理の技術を持つボランティアが品物を調べ、何が故障の原因かを説明します。すべての作業を自分たちで行うのではなく、持ち主に修理方法を教えることもよくあります。

リペアカフェでは、お金を節約しながら役立つ技術を学ぶことができます。また、地域の人々が出会い、一緒に作業する機会にもなります。しかし、すべての物が修理できるわけではありません。ひどく壊れている物もあれば、手に入らない特別な部品が必要な物もあります。修理できなかった場合でも、持ち主はなぜその物が動かなくなったのかについて理解を深めることができます。`,

  questions: [

    {
      id: "L5_006_Q1",

      questionType:
        "sentence_completion_purpose",

      stem:
        "Instead of throwing away a broken household item, people at a repair café",

      stemJa:
        "壊れた家庭用品を捨てる代わりに、リペアカフェでは人々が、",

      choices: [
        {
          id: "A",
          text:
            "try to fix it with help from volunteers.",
          ja:
            "ボランティアの助けを借りながら修理を試みる。"
        },
        {
          id: "B",
          text:
            "exchange it for a new item provided by volunteers.",
          ja:
            "ボランティアが用意した新しい物と交換する。"
        },
        {
          id: "C",
          text:
            "leave it there so that volunteers can sell it later.",
          ja:
            "ボランティアが後で販売できるよう、その場に置いていく。"
        },
        {
          id: "D",
          text:
            "send it to a recycling center without checking the problem.",
          ja:
            "故障の原因を確認せずにリサイクル施設へ送る。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Instead of immediately replacing broken items, people bring them to these events and try to repair them with the help of volunteers.",

      evidenceJa:
        "壊れた物をすぐに新しい物へ買い替えるのではなく、人々はそれらをイベントに持ち込み、ボランティアの助けを借りながら修理を試みます。"
    },


    {
      id: "L5_006_Q2",

      questionType:
        "sentence_completion_example",

      stem:
        "Visitors to a repair café may bring",

      stemJa:
        "リペアカフェの利用者は、",

      choices: [
        {
          id: "A",
          text:
            "everyday objects such as lamps, clothes, and bicycles.",
          ja:
            "ランプ、衣服、自転車などの日用品を持ち込むことがある。"
        },
        {
          id: "B",
          text:
            "only electrical products that are still under warranty.",
          ja:
            "まだ保証期間中の電化製品だけを持ち込むことがある。"
        },
        {
          id: "C",
          text:
            "special parts that volunteers use for every repair.",
          ja:
            "ボランティアがすべての修理に使う特別な部品を持ち込むことがある。"
        },
        {
          id: "D",
          text:
            "new products they want volunteers to examine before buying.",
          ja:
            "購入前にボランティアに確認してもらいたい新品を持ち込むことがある。"
        }
      ],

      answerId:
        "A",

      evidence:
        "At a repair café, visitors may bring lamps, small kitchen appliances, clothes, bicycles, or other everyday objects.",

      evidenceJa:
        "リペアカフェでは、利用者がランプ、小型の調理家電、衣服、自転車などの日用品を持ち込むことがあります。"
    },


    {
      id: "L5_006_Q3",

      questionType:
        "sentence_completion_volunteer_role",

      stem:
        "Rather than completing every repair themselves, volunteers often",

      stemJa:
        "すべての修理を自分たちだけで行うのではなく、ボランティアはよく、",

      choices: [
        {
          id: "A",
          text:
            "show owners how to fix the problem.",
          ja:
            "持ち主に問題の直し方を教える。"
        },
        {
          id: "B",
          text:
            "ask owners to buy a replacement immediately.",
          ja:
            "持ち主にすぐ新しい物を買うよう求める。"
        },
        {
          id: "C",
          text:
            "take broken items home and repair them later.",
          ja:
            "壊れた物を家に持ち帰り、後で修理する。"
        },
        {
          id: "D",
          text:
            "explain the problem but do not allow owners to take part.",
          ja:
            "問題は説明するが、持ち主には作業に参加させない。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Rather than doing all the work themselves, they often show the owners how to fix the problem.",

      evidenceJa:
        "すべての作業を自分たちで行うのではなく、持ち主に修理方法を教えることもよくあります。"
    },


    {
      id: "L5_006_Q4",

      questionType:
        "sentence_completion_benefit",

      stem:
        "People who attend repair cafés may benefit because they can",

      stemJa:
        "リペアカフェに参加する人々は、",

      choices: [
        {
          id: "A",
          text:
            "save money while learning useful repair skills.",
          ja:
            "お金を節約しながら役立つ修理技術を学ぶことができる。"
        },
        {
          id: "B",
          text:
            "receive new replacement products without paying.",
          ja:
            "お金を払わずに新品の代替品を受け取ることができる。"
        },
        {
          id: "C",
          text:
            "have volunteers repair every item they bring.",
          ja:
            "持ち込んだすべての物をボランティアに修理してもらえる。"
        },
        {
          id: "D",
          text:
            "buy special repair parts at lower prices.",
          ja:
            "特別な修理部品を安い価格で購入できる。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Repair cafés can help people save money and learn useful skills at the same time.",

      evidenceJa:
        "リペアカフェでは、お金を節約しながら役立つ技術を学ぶことができます。"
    },


    {
      id: "L5_006_Q5",

      questionType:
        "sentence_completion_limitation",

      stem:
        "A broken item may not be repaired at a repair café if",

      stemJa:
        "壊れた物がリペアカフェで修理できない場合があるのは、",

      choices: [
        {
          id: "A",
          text:
            "it is badly damaged or needs a part that is unavailable.",
          ja:
            "ひどく壊れていたり、手に入らない部品が必要だったりする場合。"
        },
        {
          id: "B",
          text:
            "the owner wants to learn what caused the problem.",
          ja:
            "持ち主が故障の原因を知りたい場合。"
        },
        {
          id: "C",
          text:
            "a volunteer explains how the item stopped working.",
          ja:
            "ボランティアがその物が動かなくなった理由を説明する場合。"
        },
        {
          id: "D",
          text:
            "the item is an everyday object such as a bicycle or lamp.",
          ja:
            "その物が自転車やランプのような日用品である場合。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Some are too badly damaged, while others require special parts that may not be available.",

      evidenceJa:
        "ひどく壊れている物もあれば、手に入らない特別な部品が必要な物もあります。"
    }

  ]
},

{
  id: "L5_007",
  level: 1,
  part: "listening",
  format: 5,
  type: "long_passage",

  title: "Later School Start Times",

  sourceType: "original",

  audioFile:
    "audio/listening/1kyu/type5/L5_007.mp3",

  script:
    `Teenagers often stay up late and have difficulty getting enough sleep. Researchers say this is partly because teenagers’ body clocks naturally shift, making it harder for them to fall asleep early. However, many schools still begin classes early in the morning.

Because of this, some schools have moved their starting time to a later hour. By giving students more time to sleep, schools hope to improve both their health and their ability to learn. In several studies, students at schools with later start times reported getting more sleep. Some schools also found that fewer students arrived late and that students were more alert during morning classes.

Changing the schedule, however, can affect other parts of the school day. Bus schedules may need to be changed, and sports or part-time jobs may finish later. Schools therefore have to consider not only sleep, but also transportation, after-school activities, and the needs of families when deciding whether to start classes later.`,

  scriptJa:
    `10代の若者は夜更かしをすることが多く、十分な睡眠を取ることが難しい場合があります。研究者によると、その理由の一つは、10代になると体内時計が自然にずれ、早い時間に眠りにつくことが難しくなることです。しかし、多くの学校では今でも朝早くから授業が始まります。

そのため、一部の学校では授業の開始時刻を遅らせています。生徒がより長く眠れる時間を確保することで、学校は健康と学習能力の両方を改善することを期待しています。いくつかの研究では、開始時間が遅い学校の生徒は、より長く睡眠を取るようになったと報告しています。また、遅刻する生徒が減り、朝の授業でより集中している生徒が増えた学校もあります。

しかし、時間割を変更すると、学校生活のほかの部分にも影響が出ることがあります。バスの運行時間を変更する必要がある場合があり、スポーツ活動やアルバイトが終わる時間も遅くなる可能性があります。そのため、学校は授業開始時間を遅らせるかどうかを決める際に、睡眠だけでなく、交通手段、放課後の活動、家庭の事情についても考える必要があります。`,

  questions: [

    {
      id: "L5_007_Q1",

      questionType:
        "sentence_completion_reason",

      stem:
        "Researchers say teenagers may find it difficult to fall asleep early because",

      stemJa:
        "研究者によると、10代の若者が早く眠りにつくことが難しい場合があるのは、",

      choices: [
        {
          id: "A",
          text:
            "their body clocks naturally shift during their teenage years.",
          ja:
            "10代になると体内時計が自然にずれるから。"
        },
        {
          id: "B",
          text:
            "their schools usually finish too late in the evening.",
          ja:
            "学校が通常、夕方遅くまで続くから。"
        },
        {
          id: "C",
          text:
            "they become more alert when they go to bed.",
          ja:
            "寝る時間になると、より集中できるようになるから。"
        },
        {
          id: "D",
          text:
            "they need less sleep as they grow older.",
          ja:
            "成長するにつれて必要な睡眠時間が短くなるから。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Researchers say this is partly because teenagers’ body clocks naturally shift, making it harder for them to fall asleep early.",

      evidenceJa:
        "研究者によると、その理由の一つは、10代になると体内時計が自然にずれ、早い時間に眠りにつくことが難しくなることです。"
    },


    {
      id: "L5_007_Q2",

      questionType:
        "sentence_completion_purpose",

      stem:
        "By moving the school starting time later, schools hope students will",

      stemJa:
        "学校の開始時刻を遅らせることで、学校は生徒が、",

      choices: [
        {
          id: "A",
          text:
            "get more sleep and be better able to learn.",
          ja:
            "より長く睡眠を取り、より学習しやすくなることを期待している。"
        },
        {
          id: "B",
          text:
            "have more time for part-time jobs before school.",
          ja:
            "登校前にアルバイトをする時間が増えることを期待している。"
        },
        {
          id: "C",
          text:
            "need fewer morning classes during the school week.",
          ja:
            "平日の午前中の授業が少なくて済むことを期待している。"
        },
        {
          id: "D",
          text:
            "change their body clocks more quickly.",
          ja:
            "体内時計をより早く変えられることを期待している。"
        }
      ],

      answerId:
        "A",

      evidence:
        "By giving students more time to sleep, schools hope to improve both their health and their ability to learn.",

      evidenceJa:
        "生徒がより長く眠れる時間を確保することで、学校は健康と学習能力の両方を改善することを期待しています。"
    },


    {
      id: "L5_007_Q3",

      questionType:
        "sentence_completion_result",

      stem:
        "At some schools that started classes later,",

      stemJa:
        "授業の開始時間を遅らせた一部の学校では、",

      choices: [
        {
          id: "A",
          text:
            "fewer students arrived late and students were more alert in the morning.",
          ja:
            "遅刻する生徒が減り、朝により集中している生徒が増えた。"
        },
        {
          id: "B",
          text:
            "more students arrived late because morning classes started later.",
          ja:
            "朝の授業開始が遅くなったため、遅刻する生徒が増えた。"
        },
        {
          id: "C",
          text:
            "students got less sleep but became more alert in class.",
          ja:
            "生徒の睡眠時間は減ったが、授業ではより集中するようになった。"
        },
        {
          id: "D",
          text:
            "students slept longer but had greater difficulty learning.",
          ja:
            "生徒の睡眠時間は増えたが、学習することがより難しくなった。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Some schools also found that fewer students arrived late and that students were more alert during morning classes.",

      evidenceJa:
        "また、遅刻する生徒が減り、朝の授業でより集中している生徒が増えた学校もあります。"
    },


    {
      id: "L5_007_Q4",

      questionType:
        "sentence_completion_schedule_effect",

      stem:
        "If a school begins classes later, one possible result is that",

      stemJa:
        "学校が授業の開始時間を遅らせると、起こり得ることの一つは、",

      choices: [
        {
          id: "A",
          text:
            "sports or part-time jobs may end later in the day.",
          ja:
            "スポーツ活動やアルバイトが終わる時間も遅くなること。"
        },
        {
          id: "B",
          text:
            "students may no longer need transportation to school.",
          ja:
            "生徒が通学のための交通手段を必要としなくなること。"
        },
        {
          id: "C",
          text:
            "morning classes may become shorter than afternoon classes.",
          ja:
            "午前中の授業が午後の授業より短くなること。"
        },
        {
          id: "D",
          text:
            "families may need to make students go to bed earlier.",
          ja:
            "家庭が生徒をより早く寝かせる必要が出てくること。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Bus schedules may need to be changed, and sports or part-time jobs may finish later.",

      evidenceJa:
        "バスの運行時間を変更する必要がある場合があり、スポーツ活動やアルバイトが終わる時間も遅くなる可能性があります。"
    },


    {
      id: "L5_007_Q5",

      questionType:
        "sentence_completion_decision",

      stem:
        "Before deciding to start school later, schools need to consider",

      stemJa:
        "学校が授業開始時間を遅らせることを決める前に、",

      choices: [
        {
          id: "A",
          text:
            "transportation, after-school activities, and family needs.",
          ja:
            "交通手段、放課後の活動、家庭の事情を考える必要がある。"
        },
        {
          id: "B",
          text:
            "whether students can learn without morning classes.",
          ja:
            "生徒が午前中の授業なしでも学べるかどうかを考える必要がある。"
        },
        {
          id: "C",
          text:
            "how to prevent students from having part-time jobs.",
          ja:
            "生徒がアルバイトをするのをどう防ぐかを考える必要がある。"
        },
        {
          id: "D",
          text:
            "whether teenagers can change their natural body clocks.",
          ja:
            "10代の若者が自然な体内時計を変えられるかどうかを考える必要がある。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Schools therefore have to consider not only sleep, but also transportation, after-school activities, and the needs of families when deciding whether to start classes later.",

      evidenceJa:
        "そのため、学校は授業開始時間を遅らせるかどうかを決める際に、睡眠だけでなく、交通手段、放課後の活動、家庭の事情についても考える必要があります。"
    }

  ]
},


{
  id: "L5_008",
  level: 1,
  part: "listening",
  format: 5,
  type: "long_passage",

  title: "AI and Wildlife Monitoring",

  sourceType: "original",

  audioFile:
    "audio/listening/1kyu/type5/L5_008.mp3",

  script:
    `Studying wild animals can be difficult because many species live in large forests or come out only at night. In the past, researchers often had to spend many hours watching animals directly or checking thousands of photographs taken by cameras placed in the wild.

Today, artificial intelligence can help with this work. Special computer programs can examine photographs and identify animals much faster than people can. They can also count how many animals appear and record where and when they were seen. This allows researchers to collect useful information while spending less time checking every image themselves.

AI, however, does not always identify animals correctly. A program may make mistakes when an animal is partly hidden or when two similar species live in the same area. Researchers therefore still need to check some results themselves. By combining faster computer analysis with human judgment, scientists can follow changes in wildlife populations more efficiently and may notice problems earlier.`,

  scriptJa:
    `野生動物の調査は難しいことがあります。多くの種類の動物が広い森林に生息していたり、夜にしか活動しなかったりするからです。以前は、研究者が動物を直接観察したり、野外に設置されたカメラで撮影された何千枚もの写真を確認したりするために、多くの時間を費やすことがよくありました。

現在では、人工知能がこうした作業を助けることができます。専用のコンピュータープログラムは写真を調べ、人間よりもはるかに速く動物を識別することができます。また、写っている動物の数を数え、いつどこで確認されたかを記録することもできます。これによって、研究者はすべての画像を自分で確認するために使う時間を減らしながら、役立つ情報を集めることができます。

しかし、AIがいつも動物を正しく識別できるわけではありません。動物の一部が隠れている場合や、よく似た2種類の動物が同じ地域に生息している場合には、プログラムが間違えることがあります。そのため、研究者は今でも一部の結果を自分たちで確認する必要があります。コンピューターによる速い分析と人間の判断を組み合わせることで、科学者は野生動物の個体数の変化をより効率的に追跡し、問題により早く気づける可能性があります。`,

  questions: [

    {
      id: "L5_008_Q1",

      questionType:
        "sentence_completion_past_method",

      stem:
        "Before AI was used for wildlife monitoring, researchers often had to",

      stemJa:
        "AIが野生動物調査に使われる以前、研究者はよく、",

      choices: [
        {
          id: "A",
          text:
            "spend many hours watching animals or checking photographs.",
          ja:
            "動物を観察したり写真を確認したりするために多くの時間を使わなければならなかった。"
        },
        {
          id: "B",
          text:
            "wait until wild animals came out during the daytime.",
          ja:
            "野生動物が昼間に出てくるまで待たなければならなかった。"
        },
        {
          id: "C",
          text:
            "move animals closer to cameras before photographing them.",
          ja:
            "撮影する前に動物をカメラの近くへ移動させなければならなかった。"
        },
        {
          id: "D",
          text:
            "identify every animal without using photographs.",
          ja:
            "写真を使わずにすべての動物を識別しなければならなかった。"
        }
      ],

      answerId:
        "A",

      evidence:
        "In the past, researchers often had to spend many hours watching animals directly or checking thousands of photographs taken by cameras placed in the wild.",

      evidenceJa:
        "以前は、研究者が動物を直接観察したり、野外に設置されたカメラで撮影された何千枚もの写真を確認したりするために、多くの時間を費やすことがよくありました。"
    },


    {
      id: "L5_008_Q2",

      questionType:
        "sentence_completion_ai_function",

      stem:
        "Compared with people, AI programs can identify animals in photographs",

      stemJa:
        "人間と比べて、AIプログラムは写真の中の動物を、",

      choices: [
        {
          id: "A",
          text:
            "much more quickly.",
          ja:
            "はるかに速く識別できる。"
        },
        {
          id: "B",
          text:
            "only when the animals are active at night.",
          ja:
            "動物が夜に活動している場合にだけ識別できる。"
        },
        {
          id: "C",
          text:
            "without ever making identification mistakes.",
          ja:
            "識別を一度も間違えることなく識別できる。"
        },
        {
          id: "D",
          text:
            "only after researchers have counted them.",
          ja:
            "研究者が数を数えた後にだけ識別できる。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Special computer programs can examine photographs and identify animals much faster than people can.",

      evidenceJa:
        "専用のコンピュータープログラムは写真を調べ、人間よりもはるかに速く動物を識別することができます。"
    },


    {
      id: "L5_008_Q3",

      questionType:
        "sentence_completion_information",

      stem:
        "In addition to identifying animals, AI programs can",

      stemJa:
        "動物を識別することに加えて、AIプログラムは、",

      choices: [
        {
          id: "A",
          text:
            "count them and record where and when they were seen.",
          ja:
            "動物の数を数え、いつどこで確認されたかを記録できる。"
        },
        {
          id: "B",
          text:
            "count them but cannot record where they appeared.",
          ja:
            "動物の数は数えられるが、どこに現れたかは記録できない。"
        },
        {
          id: "C",
          text:
            "record where they appeared without counting how many were seen.",
          ja:
            "どこに現れたかは記録できるが、何匹確認されたかは数えられない。"
        },
        {
          id: "D",
          text:
            "explain exactly why their populations have changed.",
          ja:
            "なぜ個体数が変化したのかを正確に説明できる。"
        }
      ],

      answerId:
        "A",

      evidence:
        "They can also count how many animals appear and record where and when they were seen.",

      evidenceJa:
        "また、写っている動物の数を数え、いつどこで確認されたかを記録することもできます。"
    },


    {
      id: "L5_008_Q4",

      questionType:
        "sentence_completion_limitation",

      stem:
        "An AI program is more likely to make a mistake when",

      stemJa:
        "AIプログラムが間違えやすくなるのは、",

      choices: [
        {
          id: "A",
          text:
            "an animal is partly hidden or looks similar to another species.",
          ja:
            "動物の一部が隠れていたり、別の種とよく似ていたりするとき。"
        },
        {
          id: "B",
          text:
            "several cameras take photographs in the same forest.",
          ja:
            "同じ森林で複数のカメラが写真を撮影するとき。"
        },
        {
          id: "C",
          text:
            "researchers record where and when an animal was seen.",
          ja:
            "研究者が動物をいつどこで確認したか記録するとき。"
        },
        {
          id: "D",
          text:
            "an animal appears clearly in a photograph.",
          ja:
            "写真に動物がはっきり写っているとき。"
        }
      ],

      answerId:
        "A",

      evidence:
        "A program may make mistakes when an animal is partly hidden or when two similar species live in the same area.",

      evidenceJa:
        "動物の一部が隠れている場合や、よく似た2種類の動物が同じ地域に生息している場合には、プログラムが間違えることがあります。"
    },


    {
      id: "L5_008_Q5",

      questionType:
        "sentence_completion_human_role",

      stem:
        "Researchers still need to examine some AI results because",

      stemJa:
        "研究者が今でもAIの結果の一部を確認する必要があるのは、",

      choices: [
        {
          id: "A",
          text:
            "the programs sometimes identify animals incorrectly.",
          ja:
            "プログラムが動物を誤って識別することがあるから。"
        },
        {
          id: "B",
          text:
            "AI programs cannot examine photographs taken in forests.",
          ja:
            "AIプログラムは森林で撮影された写真を調べられないから。"
        },
        {
          id: "C",
          text:
            "the programs can count animals but cannot identify them.",
          ja:
            "プログラムは動物の数は数えられるが、識別はできないから。"
        },
        {
          id: "D",
          text:
            "researchers must check every photograph after AI finishes.",
          ja:
            "AIの処理後、研究者がすべての写真を確認しなければならないから。"
        }
      ],

      answerId:
        "A",

      evidence:
        "AI, however, does not always identify animals correctly. A program may make mistakes when an animal is partly hidden or when two similar species live in the same area. Researchers therefore still need to check some results themselves.",

      evidenceJa:
        "しかし、AIがいつも動物を正しく識別できるわけではありません。動物の一部が隠れている場合や、よく似た2種類の動物が同じ地域に生息している場合には、プログラムが間違えることがあります。そのため、研究者は今でも一部の結果を自分たちで確認する必要があります。"
    }

  ]
},

{
  id: "L5_009",
  level: 1,
  part: "listening",
  format: 5,
  type: "long_passage",

  title: "Managing Overtourism",

  sourceType: "original",

  audioFile:
    "audio/listening/1kyu/type5/L5_009.mp3",

  script:
    `Popular tourist destinations can bring important economic benefits to local communities. However, when too many visitors gather in the same place at the same time, problems can occur. Streets may become crowded, public transportation can become overloaded, and local residents may find it harder to go about their daily lives.

To reduce this pressure, some cities are trying to spread visitors across different places and times. They may promote less famous neighborhoods, recommend traveling during quieter seasons, or encourage tourists to visit attractions outside the city center. This can reduce crowding in the busiest areas while bringing more customers to businesses elsewhere.

Moving visitors to other areas, however, must be done carefully. If too many tourists begin visiting a new neighborhood in a short period of time, that area may develop similar problems. Local governments therefore need to watch how visitor numbers affect different communities and adjust their plans when necessary.`,

  scriptJa:
    `人気の観光地は、地域社会に重要な経済的利益をもたらすことがあります。しかし、あまりにも多くの観光客が同じ場所に同じ時間帯に集まると、問題が起こることがあります。道路が混雑したり、公共交通機関が過度に混み合ったり、地域住民が日常生活を送りにくくなったりする場合があります。

こうした負担を減らすため、一部の都市では、観光客を異なる場所や時間帯へ分散させようとしています。あまり有名でない地域を紹介したり、比較的すいている季節に旅行することを勧めたり、市の中心部以外の観光地を訪れるよう促したりする場合があります。これによって、最も混雑している地域の混雑を減らしながら、ほかの地域の店により多くの客を呼び込むことができます。

しかし、観光客をほかの地域へ移す取り組みは慎重に行わなければなりません。短い期間にあまりにも多くの観光客が新しい地域を訪れ始めると、その地域でも同じような問題が起こる可能性があります。そのため、地方自治体は観光客の数がそれぞれの地域にどのような影響を与えているかを確認し、必要に応じて計画を調整しなければなりません。`,

  questions: [

    {
      id: "L5_009_Q1",

      questionType:
        "sentence_completion_problem",

      stem:
        "When too many tourists gather in the same area, local residents may",

      stemJa:
        "あまりにも多くの観光客が同じ地域に集まると、地域住民は、",

      choices: [
        {
          id: "A",
          text:
            "find it more difficult to carry out their daily activities.",
          ja:
            "日常生活を送ることがより難しくなる場合がある。"
        },
        {
          id: "B",
          text:
            "find public transportation less crowded than before.",
          ja:
            "公共交通機関が以前よりすいていると感じる場合がある。"
        },
        {
          id: "C",
          text:
            "need to visit less famous neighborhoods themselves.",
          ja:
            "自分たちもあまり有名でない地域を訪れる必要が出てくる。"
        },
        {
          id: "D",
          text:
            "receive fewer visitors at local businesses.",
          ja:
            "地域の店を訪れる客が少なくなる場合がある。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Streets may become crowded, public transportation can become overloaded, and local residents may find it harder to go about their daily lives.",

      evidenceJa:
        "道路が混雑したり、公共交通機関が過度に混み合ったり、地域住民が日常生活を送りにくくなったりする場合があります。"
    },


    {
      id: "L5_009_Q2",

      questionType:
        "sentence_completion_solution",

      stem:
        "To reduce pressure on the busiest tourist areas, some cities",

      stemJa:
        "最も混雑している観光地への負担を減らすため、一部の都市は、",

      choices: [
        {
          id: "A",
          text:
            "encourage visitors to explore less famous places.",
          ja:
            "観光客にあまり有名でない場所も訪れるよう促している。"
        },
        {
          id: "B",
          text:
            "encourage more visitors to remain in the city center.",
          ja:
            "より多くの観光客に市の中心部にとどまるよう促している。"
        },
        {
          id: "C",
          text:
            "recommend traveling only during the busiest seasons.",
          ja:
            "最も混雑する季節だけに旅行するよう勧めている。"
        },
        {
          id: "D",
          text:
            "limit public transportation to local residents.",
          ja:
            "公共交通機関の利用を地域住民だけに制限している。"
        }
      ],

      answerId:
        "A",

      evidence:
        "They may promote less famous neighborhoods, recommend traveling during quieter seasons, or encourage tourists to visit attractions outside the city center.",

      evidenceJa:
        "あまり有名でない地域を紹介したり、比較的すいている季節に旅行することを勧めたり、市の中心部以外の観光地を訪れるよう促したりする場合があります。"
    },


    {
      id: "L5_009_Q3",

      questionType:
        "sentence_completion_effect",

      stem:
        "By spreading tourists across different areas, a city may",

      stemJa:
        "観光客を異なる地域へ分散させることで、都市は、",

      choices: [
        {
          id: "A",
          text:
            "reduce crowding while bringing customers to businesses elsewhere.",
          ja:
            "混雑を減らしながら、ほかの地域の店にも客を呼び込める。"
        },
        {
          id: "B",
          text:
            "reduce crowding while decreasing business outside the city center.",
          ja:
            "混雑を減らしながら、市の中心部以外の商売を減らす。"
        },
        {
          id: "C",
          text:
            "increase business mainly in places that are already crowded.",
          ja:
            "主にすでに混雑している場所で商売を増やす。"
        },
        {
          id: "D",
          text:
            "make all tourist areas equally crowded.",
          ja:
            "すべての観光地を同じ程度に混雑させる。"
        }
      ],

      answerId:
        "A",

      evidence:
        "This can reduce crowding in the busiest areas while bringing more customers to businesses elsewhere.",

      evidenceJa:
        "これによって、最も混雑している地域の混雑を減らしながら、ほかの地域の店により多くの客を呼び込むことができます。"
    },


    {
      id: "L5_009_Q4",

      questionType:
        "sentence_completion_risk",

      stem:
        "If too many tourists begin visiting a new neighborhood in a short time,",

      stemJa:
        "短い期間にあまりにも多くの観光客が新しい地域を訪れ始めると、",

      choices: [
        {
          id: "A",
          text:
            "the new area may begin to experience similar problems.",
          ja:
            "その新しい地域でも同じような問題が起こり始める可能性がある。"
        },
        {
          id: "B",
          text:
            "the original tourist area may become more crowded.",
          ja:
            "元の観光地がさらに混雑する可能性がある。"
        },
        {
          id: "C",
          text:
            "businesses in the new area may immediately lose customers.",
          ja:
            "新しい地域の店がすぐに客を失う可能性がある。"
        },
        {
          id: "D",
          text:
            "the city may no longer need to manage visitor numbers.",
          ja:
            "都市が観光客数を管理する必要がなくなる可能性がある。"
        }
      ],

      answerId:
        "A",

      evidence:
        "If too many tourists begin visiting a new neighborhood in a short period of time, that area may develop similar problems.",

      evidenceJa:
        "短い期間にあまりにも多くの観光客が新しい地域を訪れ始めると、その地域でも同じような問題が起こる可能性があります。"
    },


    {
      id: "L5_009_Q5",

      questionType:
        "sentence_completion_management",

      stem:
        "When managing tourism, local governments need to",

      stemJa:
        "観光を管理する際、地方自治体は、",

      choices: [
        {
          id: "A",
          text:
            "watch how visitor numbers affect communities and adjust their plans.",
          ja:
            "観光客数が地域に与える影響を確認し、計画を調整する必要がある。"
        },
        {
          id: "B",
          text:
            "continue moving visitors even when new areas become crowded.",
          ja:
            "新しい地域が混雑しても観光客を移し続ける必要がある。"
        },
        {
          id: "C",
          text:
            "check visitor numbers only in the city center.",
          ja:
            "市の中心部の観光客数だけを確認する必要がある。"
        },
        {
          id: "D",
          text:
            "make every community receive the same number of tourists.",
          ja:
            "すべての地域が同じ数の観光客を受け入れるようにする必要がある。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Local governments therefore need to watch how visitor numbers affect different communities and adjust their plans when necessary.",

      evidenceJa:
        "そのため、地方自治体は観光客の数がそれぞれの地域にどのような影響を与えているかを確認し、必要に応じて計画を調整しなければなりません。"
    }

  ]
},

{
  id: "L5_010",
  level: 1,
  part: "listening",
  format: 5,
  type: "long_passage",

  title: "Adaptive Reuse of Buildings",

  sourceType: "original",

  audioFile:
    "audio/listening/1kyu/type5/L5_010.mp3",

  script:
    `When an old building is no longer used for its original purpose, one choice is to tear it down and build something new. However, some communities choose another option called adaptive reuse. This means changing an existing building so that it can serve a new purpose.

For example, an old factory might become apartments, offices, or a community center. Reusing a building can reduce construction waste and may require fewer new materials. It can also preserve part of a town's history and help older neighborhoods keep their unique character.

Adaptive reuse can be difficult, however. Old buildings may need major repairs, and they must meet modern safety standards before people can use them in new ways. In some cases, the cost of changing a building may be higher than expected. Communities therefore need to consider the condition, cost, and historical value of a building before deciding whether reuse is a better choice than demolition.`,

  scriptJa:
    `古い建物が本来の目的で使われなくなったとき、一つの選択肢は、その建物を取り壊して新しいものを建てることです。しかし、一部の地域では、「adaptive reuse」と呼ばれる別の方法を選んでいます。これは、既存の建物を新しい目的で使えるように変更することを意味します。

たとえば、古い工場がアパートやオフィス、地域の交流施設などに変えられることがあります。建物を再利用することで、建設廃棄物を減らし、新しい建築材料の使用量も少なくできる場合があります。また、町の歴史の一部を残し、古い地域が独自の特徴を保つ助けにもなります。

しかし、adaptive reuseは難しい場合もあります。古い建物には大規模な修理が必要になることがあり、人々が新しい用途で使用する前に、現代の安全基準を満たさなければなりません。場合によっては、建物を改修する費用が予想以上に高くなることもあります。そのため地域は、再利用が取り壊しよりよい選択かどうかを決める前に、建物の状態、費用、歴史的価値を考える必要があります。`,

  questions: [

    {
      id: "L5_010_Q1",

      questionType:
        "sentence_completion_definition",

      stem:
        "Adaptive reuse means taking an existing building and",

      stemJa:
        "adaptive reuseとは、既存の建物を、",

      choices: [
        {
          id: "A",
          text:
            "changing it so that it can be used for a new purpose.",
          ja:
            "新しい目的で使えるように変更すること。"
        },
        {
          id: "B",
          text:
            "returning it to exactly the same use it had before.",
          ja:
            "以前とまったく同じ用途に戻すこと。"
        },
        {
          id: "C",
          text:
            "moving it to another part of the community.",
          ja:
            "地域の別の場所へ移動させること。"
        },
        {
          id: "D",
          text:
            "tearing it down before constructing a similar building.",
          ja:
            "似た建物を建てる前に取り壊すこと。"
        }
      ],

      answerId:
        "A",

      evidence:
        "This means changing an existing building so that it can serve a new purpose.",

      evidenceJa:
        "これは、既存の建物を新しい目的で使えるように変更することを意味します。"
    },


    {
      id: "L5_010_Q2",

      questionType:
        "sentence_completion_example",

      stem:
        "Through adaptive reuse, an old factory could become",

      stemJa:
        "adaptive reuseによって、古い工場は、",

      choices: [
        {
          id: "A",
          text:
            "apartments, offices, or a community center.",
          ja:
            "アパートやオフィス、地域の交流施設などになることがある。"
        },
        {
          id: "B",
          text:
            "a place used only to store construction waste.",
          ja:
            "建設廃棄物だけを保管する場所になることがある。"
        },
        {
          id: "C",
          text:
            "a factory producing materials for new buildings.",
          ja:
            "新しい建物の材料を生産する工場になることがある。"
        },
        {
          id: "D",
          text:
            "a building moved to a newer neighborhood.",
          ja:
            "より新しい地域へ移された建物になることがある。"
        }
      ],

      answerId:
        "A",

      evidence:
        "For example, an old factory might become apartments, offices, or a community center.",

      evidenceJa:
        "たとえば、古い工場がアパートやオフィス、地域の交流施設などに変えられることがあります。"
    },


    {
      id: "L5_010_Q3",

      questionType:
        "sentence_completion_benefit",

      stem:
        "Reusing an old building can help a community by",

      stemJa:
        "古い建物を再利用することで、地域は、",

      choices: [
        {
          id: "A",
          text:
            "reducing waste while preserving part of its history.",
          ja:
            "廃棄物を減らしながら、その地域の歴史の一部を残すことができる。"
        },
        {
          id: "B",
          text:
            "reducing waste but removing the building's historical character.",
          ja:
            "廃棄物を減らす一方で、建物の歴史的な特徴をなくすことができる。"
        },
        {
          id: "C",
          text:
            "using more new materials while keeping the old design.",
          ja:
            "古いデザインを残しながら、より多くの新しい材料を使うことができる。"
        },
        {
          id: "D",
          text:
            "avoiding both repairs and the use of new materials.",
          ja:
            "修理と新しい材料の使用の両方を避けることができる。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Reusing a building can reduce construction waste and may require fewer new materials. It can also preserve part of a town's history and help older neighborhoods keep their unique character.",

      evidenceJa:
        "建物を再利用することで、建設廃棄物を減らし、新しい建築材料の使用量も少なくできる場合があります。また、町の歴史の一部を残し、古い地域が独自の特徴を保つ助けにもなります。"
    },


    {
      id: "L5_010_Q4",

      questionType:
        "sentence_completion_challenge",

      stem:
        "Before an old building can be used for a new purpose, it may need to",

      stemJa:
        "古い建物を新しい目的で使う前に、その建物は、",

      choices: [
        {
          id: "A",
          text:
            "receive major repairs and meet modern safety standards.",
          ja:
            "大規模な修理を受け、現代の安全基準を満たす必要がある場合がある。"
        },
        {
          id: "B",
          text:
            "be rebuilt completely with only new materials.",
          ja:
            "新しい材料だけを使って完全に建て直す必要がある場合がある。"
        },
        {
          id: "C",
          text:
            "keep every part exactly as it was originally.",
          ja:
            "すべての部分を元の状態のまま残す必要がある場合がある。"
        },
        {
          id: "D",
          text:
            "be moved away from older neighborhoods.",
          ja:
            "古い地域から別の場所へ移される必要がある場合がある。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Old buildings may need major repairs, and they must meet modern safety standards before people can use them in new ways.",

      evidenceJa:
        "古い建物には大規模な修理が必要になることがあり、人々が新しい用途で使用する前に、現代の安全基準を満たさなければなりません。"
    },


    {
      id: "L5_010_Q5",

      questionType:
        "sentence_completion_decision",

      stem:
        "Before choosing adaptive reuse instead of demolition, a community should consider",

      stemJa:
        "取り壊しではなくadaptive reuseを選ぶ前に、地域は、",

      choices: [
        {
          id: "A",
          text:
            "the building's condition, cost, and historical value.",
          ja:
            "建物の状態、費用、歴史的価値を考えるべきである。"
        },
        {
          id: "B",
          text:
            "only whether the building has historical value.",
          ja:
            "建物に歴史的価値があるかどうかだけを考えるべきである。"
        },
        {
          id: "C",
          text:
            "whether new construction materials are cheaper than repairs.",
          ja:
            "新しい建築材料が修理より安いかどうかだけを考えるべきである。"
        },
        {
          id: "D",
          text:
            "how quickly the building can be torn down.",
          ja:
            "どれだけ早く建物を取り壊せるかを考えるべきである。"
        }
      ],

      answerId:
        "A",

      evidence:
        "Communities therefore need to consider the condition, cost, and historical value of a building before deciding whether reuse is a better choice than demolition.",

      evidenceJa:
        "そのため地域は、再利用が取り壊しよりよい選択かどうかを決める前に、建物の状態、費用、歴史的価値を考える必要があります。"
    }

  ]
}

  

];
