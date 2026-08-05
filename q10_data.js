"use strict";

const q10Questions = [

  // =========================================================
  // Question 1
  // =========================================================
  {
    id: "q10_original_001",
    number: 1,
    sourceType: "original",
    title: "Food-sharing Apps and Food Waste",
    titleJa: "食品シェアアプリと食品ロス",

    paragraphs: [
      {
        id: "p1",
        sentences: [
          {
            id: "s1",
            en: "Food waste is a serious problem in many parts of the world.",
            ja: "食品ロスは、世界の多くの地域で深刻な問題となっています。",
            notes: [
              { id: "q10_original_001_note_001", expression: "food waste", meaning: "食品ロス、食品廃棄", weakEligible: true },
              { id: "q10_original_001_note_002", expression: "a serious problem", meaning: "深刻な問題", weakEligible: false }
            ]
          },
          {
            id: "s2",
            en: "When food is thrown away, the water, land, and energy used to produce and transport it are wasted as well.",
            ja: "食品が捨てられると、それを生産し、運ぶために使われた水、土地、エネルギーも無駄になります。",
            notes: [
              { id: "q10_original_001_note_003", expression: "throw away", meaning: "～を捨てる", weakEligible: true },
              { id: "q10_original_001_note_004", expression: "be used to do", meaning: "～するために使われる", weakEligible: true },
              { id: "q10_original_001_note_005", expression: "as well", meaning: "～もまた", weakEligible: true }
            ]
          },
          {
            id: "s3",
            en: "Restaurants, bakeries, and food stores sometimes prepare more food than they can sell.",
            ja: "レストランやパン屋、食料品店では、販売できる量より多くの食品を用意することがあります。",
            notes: [
              { id: "q10_original_001_note_006", expression: "bakery", meaning: "パン屋", weakEligible: false },
              { id: "q10_original_001_note_007", expression: "more A than ...", meaning: "…より多くのA", weakEligible: true }
            ]
          },
          {
            id: "s4",
            en: "If no one buys it before closing time, the store may have no choice but to {{a}} it.",
            ja: "閉店時間までに誰もそれを買わなければ、店はそれを廃棄するしかない場合があります。",
            notes: [
              { id: "q10_original_001_note_008", expression: "closing time", meaning: "閉店時間", weakEligible: false },
              { id: "q10_original_001_note_009", expression: "have no choice but to do", meaning: "～するしかない", weakEligible: true },
              { id: "q10_original_001_note_010", expression: "discard", meaning: "～を廃棄する", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p2",
        sentences: [
          {
            id: "s5",
            en: "Food-sharing apps offer one way to deal with this problem.",
            ja: "食品シェアアプリは、この問題に対処する一つの方法を提供しています。",
            notes: [
              { id: "q10_original_001_note_011", expression: "deal with", meaning: "～に対処する", weakEligible: true },
              { id: "q10_original_001_note_012", expression: "offer one way to do", meaning: "～する一つの方法を提供する", weakEligible: true }
            ]
          },
          {
            id: "s6",
            en: "These apps {{b}} stores that have surplus food with people who want to buy it.",
            ja: "これらのアプリは、余った食品を持つ店と、それを買いたい人々とを結び付けます。",
            notes: [
              { id: "q10_original_001_note_013", expression: "connect A with B", meaning: "AとBを結び付ける", weakEligible: true },
              { id: "q10_original_001_note_014", expression: "surplus food", meaning: "余った食品、余剰食品", weakEligible: true }
            ]
          },
          {
            id: "s7",
            en: "A store posts information about the available food and offers it at a {{c}} price.",
            ja: "店は、購入できる食品についての情報を掲載し、それをより安い価格で提供します。",
            notes: [
              { id: "q10_original_001_note_015", expression: "post information", meaning: "情報を掲載する", weakEligible: false },
              { id: "q10_original_001_note_016", expression: "available", meaning: "購入・利用できる", weakEligible: true },
              { id: "q10_original_001_note_017", expression: "at a lower price", meaning: "より安い価格で", weakEligible: true }
            ]
          },
          {
            id: "s8",
            en: "Customers reserve the food through the app and pick it up during a time period chosen by the store.",
            ja: "利用者はアプリを通じて食品を予約し、店が指定した時間帯に受け取ります。",
            notes: [
              { id: "q10_original_001_note_018", expression: "reserve", meaning: "～を予約する", weakEligible: true },
              { id: "q10_original_001_note_019", expression: "pick up", meaning: "～を受け取る", weakEligible: true },
              { id: "q10_original_001_note_020", expression: "a time period", meaning: "時間帯", weakEligible: false }
            ]
          }
        ]
      },

      {
        id: "p3",
        sentences: [
          {
            id: "s9",
            en: "This system can benefit both sides.",
            ja: "この仕組みは、双方に利益をもたらす可能性があります。",
            notes: [
              { id: "q10_original_001_note_021", expression: "benefit", meaning: "～に利益をもたらす", weakEligible: true },
              { id: "q10_original_001_note_022", expression: "both sides", meaning: "双方", weakEligible: false }
            ]
          },
          {
            id: "s10",
            en: "Stores can earn some money from food that might otherwise become waste, while customers can buy meals or groceries more cheaply.",
            ja: "店は、そうでなければ廃棄物になるかもしれない食品からいくらか収入を得られる一方、利用者は食事や食料品をより安く購入できます。",
            notes: [
              { id: "q10_original_001_note_023", expression: "earn money from", meaning: "～から収入を得る", weakEligible: true },
              { id: "q10_original_001_note_024", expression: "otherwise", meaning: "そうでなければ", weakEligible: true },
              { id: "q10_original_001_note_025", expression: "groceries", meaning: "食料品", weakEligible: true }
            ]
          },
          {
            id: "s11",
            en: "A smaller amount of edible food may also enter the waste stream.",
            ja: "まだ食べられる食品が廃棄物として処理される量も減らせる可能性があります。",
            notes: [
              { id: "q10_original_001_note_026", expression: "edible", meaning: "食べられる", weakEligible: true },
              { id: "q10_original_001_note_027", expression: "waste stream", meaning: "廃棄物の流れ、廃棄処理の過程", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p4",
        sentences: [
          {
            id: "s12",
            en: "{{d}}, food-sharing apps have limits.",
            ja: "しかし、食品シェアアプリには限界があります。",
            notes: [
              { id: "q10_original_001_note_028", expression: "have limits", meaning: "限界がある", weakEligible: true }
            ]
          },
          {
            id: "s13",
            en: "The amount and type of food available can change each day, so users cannot always choose exactly what they want.",
            ja: "利用できる食品の量や種類は毎日変わるため、利用者は必ずしも自分が欲しいものを選べるとは限りません。",
            notes: [
              { id: "q10_original_001_note_029", expression: "the amount and type of", meaning: "～の量と種類", weakEligible: false },
              { id: "q10_original_001_note_030", expression: "cannot always do", meaning: "必ずしも～できるとは限らない", weakEligible: true }
            ]
          },
          {
            id: "s14",
            en: "The service may also be unavailable in areas with few participating stores.",
            ja: "参加店舗が少ない地域では、サービスを利用できない場合もあります。",
            notes: [
              { id: "q10_original_001_note_031", expression: "be unavailable", meaning: "利用できない", weakEligible: true },
              { id: "q10_original_001_note_032", expression: "participating store", meaning: "参加店舗", weakEligible: true }
            ]
          },
          {
            id: "s15",
            en: "Food-sharing apps can reduce waste, but they are not a {{e}} solution.",
            ja: "食品シェアアプリは廃棄を減らせますが、完全な解決策ではありません。",
            notes: [
              { id: "q10_original_001_note_033", expression: "reduce waste", meaning: "廃棄を減らす", weakEligible: true },
              { id: "q10_original_001_note_034", expression: "a complete solution", meaning: "完全な解決策", weakEligible: true }
            ]
          },
          {
            id: "s16",
            en: "Preventing unnecessary food from being prepared remains important.",
            ja: "不要な食品が作られること自体を防ぐ取り組みも、引き続き重要です。",
            notes: [
              { id: "q10_original_001_note_035", expression: "prevent A from doing", meaning: "Aが～するのを防ぐ", weakEligible: true },
              { id: "q10_original_001_note_036", expression: "remain important", meaning: "引き続き重要である", weakEligible: true }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",
        choices: [
          { id: "a1", text: "advertise" }, { id: "a2", text: "discard" },
          { id: "a3", text: "display" }, { id: "a4", text: "reserve" }
        ],
        answer: "a2",
        explanation: "売れ残った食品を店が廃棄するという文脈なので、discardが適切です。",
        wrongChoiceReasons: {
          a1: "食品を宣伝するという意味になり、閉店後の処理を表しません。",
          a3: "食品を陳列するという意味です。",
          a4: "店が食品を予約するという意味になりません。"
        }
      },
      {
        id: "b",
        choices: [
          { id: "b1", text: "compare" }, { id: "b2", text: "connect" },
          { id: "b3", text: "protect" }, { id: "b4", text: "separate" }
        ],
        answer: "b2",
        explanation: "connect A with Bで「AとBを結び付ける」という意味です。",
        wrongChoiceReasons: {
          b1: "店と購入者を比較するという意味になります。",
          b3: "店を購入者から守るという意味になります。",
          b4: "店と購入者を分けるという、本文と反対の意味です。"
        }
      },
      {
        id: "c",
        choices: [
          { id: "c1", text: "lower" }, { id: "c2", text: "private" },
          { id: "c3", text: "regular" }, { id: "c4", text: "similar" }
        ],
        answer: "c1",
        explanation: "at a lower priceで「より安い価格で」という意味になります。",
        wrongChoiceReasons: {
          c2: "private priceという表現は、この文脈では不自然です。",
          c3: "通常価格では、売れ残りを減らす仕組みの説明として合いません。",
          c4: "何と似た価格なのかが示されていません。"
        }
      },
      {
        id: "d",
        choices: [
          { id: "d1", text: "For example" }, { id: "d2", text: "However" },
          { id: "d3", text: "Moreover" }, { id: "d4", text: "Therefore" }
        ],
        answer: "d2",
        explanation: "前段落では利点を説明し、この段落では限界へ話題を転換しているため、Howeverが適切です。",
        wrongChoiceReasons: {
          d1: "後文は前段落の具体例ではありません。",
          d3: "同じ方向の利点を追加する関係ではありません。",
          d4: "前段落の利点の結果として限界が生じるわけではありません。"
        }
      },
      {
        id: "e",
        choices: [
          { id: "e1", text: "complete" }, { id: "e2", text: "temporary" },
          { id: "e3", text: "personal" }, { id: "e4", text: "separate" }
        ],
        answer: "e1",
        explanation: "アプリだけですべての食品ロスを解決できるわけではないため、completeが適切です。",
        wrongChoiceReasons: {
          e2: "一時的な解決策であることを述べているのではありません。",
          e3: "個人的な解決策という意味は本文に合いません。",
          e4: "独立した解決策かどうかを論じているのではありません。"
        }
      }
    ],

    verified: true
  },

  // =========================================================
  // Question 2
  // =========================================================
  {
    id: "q10_original_002",
    number: 2,
    sourceType: "original",
    title: "Cool Roofs and Hot Cities",
    titleJa: "暑い都市と熱を反射する屋根",

    paragraphs: [
      {
        id: "p1",
        sentences: [
          {
            id: "s1",
            en: "Cities are often warmer than nearby rural areas.",
            ja: "都市は、近くの農村地域よりも気温が高くなることがよくあります。",
            notes: [
              { id: "q10_original_002_note_001", expression: "rural area", meaning: "農村地域", weakEligible: true },
              { id: "q10_original_002_note_002", expression: "nearby", meaning: "近くの", weakEligible: false }
            ]
          },
          {
            id: "s2",
            en: "Buildings, roads, and parking lots absorb heat from the sun during the day and release it slowly after sunset.",
            ja: "建物、道路、駐車場は、日中に太陽からの熱を吸収し、日没後にそれをゆっくり放出します。",
            notes: [
              { id: "q10_original_002_note_003", expression: "absorb heat", meaning: "熱を吸収する", weakEligible: true },
              { id: "q10_original_002_note_004", expression: "release heat", meaning: "熱を放出する", weakEligible: true },
              { id: "q10_original_002_note_005", expression: "after sunset", meaning: "日没後に", weakEligible: true }
            ]
          },
          {
            id: "s3",
            en: "Cities also tend to have fewer trees and green spaces that can provide shade and cooling.",
            ja: "都市では、日陰や涼しさをもたらす木や緑地が少ない傾向もあります。",
            notes: [
              { id: "q10_original_002_note_006", expression: "tend to do", meaning: "～する傾向がある", weakEligible: true },
              { id: "q10_original_002_note_007", expression: "green space", meaning: "緑地", weakEligible: true },
              { id: "q10_original_002_note_008", expression: "provide shade", meaning: "日陰を作る", weakEligible: true }
            ]
          },
          {
            id: "s4",
            en: "This difference in temperature is commonly called the urban heat island effect.",
            ja: "この温度差は、一般に都市のヒートアイランド現象と呼ばれています。",
            notes: [
              { id: "q10_original_002_note_009", expression: "difference in temperature", meaning: "温度差", weakEligible: false },
              { id: "q10_original_002_note_010", expression: "urban heat island effect", meaning: "都市のヒートアイランド現象", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p2",
        sentences: [
          {
            id: "s5",
            en: "One possible way to reduce this effect is to use cool roofs.",
            ja: "この現象を弱める方法の一つが、クールルーフを使うことです。",
            notes: [
              { id: "q10_original_002_note_011", expression: "one way to do", meaning: "～する一つの方法", weakEligible: true },
              { id: "q10_original_002_note_012", expression: "reduce an effect", meaning: "影響を弱める", weakEligible: true }
            ]
          },
          {
            id: "s6",
            en: "Unlike many dark roofs, cool roofs are designed to {{a}} more sunlight and absorb less heat.",
            ja: "多くの濃い色の屋根とは異なり、クールルーフはより多くの日光を反射し、吸収する熱を少なくするように設計されています。",
            notes: [
              { id: "q10_original_002_note_013", expression: "unlike", meaning: "～とは異なり", weakEligible: true },
              { id: "q10_original_002_note_014", expression: "be designed to do", meaning: "～するように設計されている", weakEligible: true },
              { id: "q10_original_002_note_015", expression: "reflect sunlight", meaning: "日光を反射する", weakEligible: true }
            ]
          },
          {
            id: "s7",
            en: "As a result, less heat passes from the roof into the building.",
            ja: "その結果、屋根から建物の中へ移動する熱が少なくなります。",
            notes: [
              { id: "q10_original_002_note_016", expression: "as a result", meaning: "その結果", weakEligible: true },
              { id: "q10_original_002_note_017", expression: "pass into", meaning: "～の中へ移動する", weakEligible: false }
            ]
          },
          {
            id: "s8",
            en: "This can make indoor spaces more {{b}} and reduce the need for air conditioning during hot weather.",
            ja: "これにより、室内をより快適にし、暑い時期に冷房を使う必要性を減らせる可能性があります。",
            notes: [
              { id: "q10_original_002_note_018", expression: "indoor space", meaning: "室内空間", weakEligible: false },
              { id: "q10_original_002_note_019", expression: "reduce the need for", meaning: "～の必要性を減らす", weakEligible: true },
              { id: "q10_original_002_note_020", expression: "air conditioning", meaning: "冷房、空調", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p3",
        sentences: [
          {
            id: "s9",
            en: "Cool roofs may also benefit the area around a building.",
            ja: "クールルーフは、建物の周辺にも利益をもたらす可能性があります。",
            notes: [
              { id: "q10_original_002_note_021", expression: "benefit", meaning: "～に利益をもたらす", weakEligible: true }
            ]
          },
          {
            id: "s10",
            en: "If many buildings use them, less heat may be transferred to the surrounding air.",
            ja: "多くの建物が使用すれば、周囲の空気に移動する熱を減らせるかもしれません。",
            notes: [
              { id: "q10_original_002_note_022", expression: "be transferred to", meaning: "～へ移動させられる", weakEligible: true },
              { id: "q10_original_002_note_023", expression: "surrounding air", meaning: "周囲の空気", weakEligible: false }
            ]
          },
          {
            id: "s11",
            en: "The effect is likely to be greater in places where roofs receive strong sunlight for long periods.",
            ja: "屋根が長時間強い日光を受ける場所では、その効果がより大きくなる可能性があります。",
            notes: [
              { id: "q10_original_002_note_024", expression: "be likely to do", meaning: "～する可能性が高い", weakEligible: true },
              { id: "q10_original_002_note_025", expression: "for long periods", meaning: "長時間にわたって", weakEligible: true }
            ]
          },
          {
            id: "s12",
            en: "{{c}}, cool roofs can be especially useful in sunny and warm climates.",
            ja: "このため、日差しが強く温暖な気候では、クールルーフが特に役立つ可能性があります。",
            notes: [
              { id: "q10_original_002_note_026", expression: "for this reason", meaning: "このため", weakEligible: true },
              { id: "q10_original_002_note_027", expression: "especially useful", meaning: "特に役立つ", weakEligible: true },
              { id: "q10_original_002_note_028", expression: "climate", meaning: "気候", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p4",
        sentences: [
          {
            id: "s13",
            en: "However, cool roofs are not equally effective everywhere.",
            ja: "しかし、クールルーフはどこでも同じように効果を発揮するわけではありません。",
            notes: [
              { id: "q10_original_002_note_029", expression: "equally effective", meaning: "同じ程度に効果的な", weakEligible: true }
            ]
          },
          {
            id: "s14",
            en: "Their performance depends on factors such as the local climate, the type of building, and the condition of the roof.",
            ja: "その効果は、地域の気候、建物の種類、屋根の状態などによって異なります。",
            notes: [
              { id: "q10_original_002_note_030", expression: "depend on", meaning: "～によって決まる", weakEligible: true },
              { id: "q10_original_002_note_031", expression: "factor", meaning: "要因", weakEligible: true },
              { id: "q10_original_002_note_032", expression: "such as", meaning: "～など", weakEligible: true }
            ]
          },
          {
            id: "s15",
            en: "In colder areas, reducing heat from the sun may sometimes {{d}} the amount of energy needed for heating in winter.",
            ja: "寒い地域では、太陽からの熱を減らすことで、冬の暖房に必要なエネルギー量が増える場合もあります。",
            notes: [
              { id: "q10_original_002_note_033", expression: "the amount of", meaning: "～の量", weakEligible: false },
              { id: "q10_original_002_note_034", expression: "be needed for", meaning: "～に必要とされる", weakEligible: true },
              { id: "q10_original_002_note_035", expression: "heating", meaning: "暖房", weakEligible: true }
            ]
          },
          {
            id: "s16",
            en: "Cool roofs should therefore be treated as one part of a wider urban cooling {{e}}.",
            ja: "したがって、クールルーフは、より広い都市冷却戦略の一部として扱う必要があります。",
            notes: [
              { id: "q10_original_002_note_036", expression: "be treated as", meaning: "～として扱われる", weakEligible: true },
              { id: "q10_original_002_note_037", expression: "strategy", meaning: "戦略、対策", weakEligible: true }
            ]
          },
          {
            id: "s17",
            en: "Trees, green spaces, and suitable building designs can be used together with them.",
            ja: "木、緑地、適切な建築設計などと組み合わせて使用できます。",
            notes: [
              { id: "q10_original_002_note_038", expression: "suitable", meaning: "適切な", weakEligible: true },
              { id: "q10_original_002_note_039", expression: "together with", meaning: "～と一緒に", weakEligible: true }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",
        choices: [
          { id: "a1", text: "collect" }, { id: "a2", text: "reflect" },
          { id: "a3", text: "produce" }, { id: "a4", text: "spread" }
        ],
        answer: "a2",
        explanation: "reflect sunlightで「日光を反射する」という意味です。",
        wrongChoiceReasons: {
          a1: "日光を集めるという意味になり、熱を吸収しにくくする働きと合いません。",
          a3: "屋根が日光を作り出すことはありません。",
          a4: "日光を広げるという意味では、クールルーフの働きを正確に表せません。"
        }
      },
      {
        id: "b",
        choices: [
          { id: "b1", text: "comfortable" }, { id: "b2", text: "crowded" },
          { id: "b3", text: "formal" }, { id: "b4", text: "private" }
        ],
        answer: "b1",
        explanation: "室内へ入る熱が減るため、室内をより快適にできます。",
        wrongChoiceReasons: {
          b2: "混雑と屋根の熱対策は関係がありません。",
          b3: "室内が正式になるという意味は不自然です。",
          b4: "プライバシーとは関係がありません。"
        }
      },
      {
        id: "c",
        choices: [
          { id: "c1", text: "For this reason" }, { id: "c2", text: "In contrast" },
          { id: "c3", text: "For example" }, { id: "c4", text: "Nevertheless" }
        ],
        answer: "c1",
        explanation: "強い日光を長時間受ける場所ほど効果が大きいという前文を受けた結果なので、For this reasonが適切です。",
        wrongChoiceReasons: {
          c2: "前後は対照的な内容ではありません。",
          c3: "後文は具体例ではなく、前文から導かれる結論です。",
          c4: "前文に反する内容を述べているのではありません。"
        }
      },
      {
        id: "d",
        choices: [
          { id: "d1", text: "increase" }, { id: "d2", text: "measure" },
          { id: "d3", text: "prevent" }, { id: "d4", text: "replace" }
        ],
        answer: "d1",
        explanation: "寒い地域では太陽から得られる熱を減らすと、暖房に必要なエネルギーが増える場合があります。",
        wrongChoiceReasons: {
          d2: "屋根がエネルギー量を測るという意味になりません。",
          d3: "prevent the amountという語法は成立しません。",
          d4: "エネルギー量に取って代わるという意味になりません。"
        }
      },
      {
        id: "e",
        choices: [
          { id: "e1", text: "material" }, { id: "e2", text: "result" },
          { id: "e3", text: "strategy" }, { id: "e4", text: "temperature" }
        ],
        answer: "e3",
        explanation: "木や緑地などと組み合わせる、より広い都市冷却戦略の一部という意味です。",
        wrongChoiceReasons: {
          e1: "屋根を材料の一部として扱う文ではありません。",
          e2: "結果の一部という意味は不自然です。",
          e4: "温度の一部という意味になりません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 3
  // =========================================================
  {
    id: "q10_original_003",
    number: 3,
    sourceType: "original",
    title: "Reusing School Uniforms",
    titleJa: "学生服のリユース",

    paragraphs: [
      {
        id: "p1",
        sentences: [
          {
            id: "s1",
            en: "School uniforms can be expensive, especially when students need several items or quickly grow out of them.",
            ja: "学校の制服は、特に生徒が複数の品物を必要としたり、すぐにサイズが合わなくなったりする場合、高額になることがあります。",
            notes: [
              { id: "q10_original_003_note_001", expression: "especially when", meaning: "特に～するとき", weakEligible: false },
              { id: "q10_original_003_note_002", expression: "grow out of", meaning: "成長して～が着られなくなる", weakEligible: true }
            ]
          },
          {
            id: "s2",
            en: "At the same time, many uniforms are still in good condition when their owners no longer need them.",
            ja: "同時に、多くの制服は、持ち主が必要としなくなった時点でも、まだ良い状態にあります。",
            notes: [
              { id: "q10_original_003_note_003", expression: "be in good condition", meaning: "良い状態である", weakEligible: true },
              { id: "q10_original_003_note_004", expression: "no longer", meaning: "もはや～ない", weakEligible: true }
            ]
          },
          {
            id: "s3",
            en: "If these clothes are simply thrown away, the materials and energy used to make them are also {{a}}.",
            ja: "これらの衣服が単に捨てられると、それを作るために使われた材料やエネルギーも無駄になります。",
            notes: [
              { id: "q10_original_003_note_005", expression: "throw away", meaning: "～を捨てる", weakEligible: true },
              { id: "q10_original_003_note_006", expression: "be wasted", meaning: "無駄にされる", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p2",
        sentences: [
          {
            id: "s4",
            en: "To deal with this problem, some schools and community groups organize uniform reuse programs.",
            ja: "この問題に対処するため、制服のリユース活動を行う学校や地域団体があります。",
            notes: [
              { id: "q10_original_003_note_007", expression: "deal with", meaning: "～に対処する", weakEligible: true },
              { id: "q10_original_003_note_008", expression: "organize a program", meaning: "活動を企画・運営する", weakEligible: true }
            ]
          },
          {
            id: "s5",
            en: "Families donate uniforms that have become too small or are no longer needed.",
            ja: "家庭は、小さくなったり、必要でなくなったりした制服を寄付します。",
            notes: [
              { id: "q10_original_003_note_009", expression: "donate", meaning: "～を寄付する", weakEligible: true },
              { id: "q10_original_003_note_010", expression: "be no longer needed", meaning: "必要とされなくなる", weakEligible: false }
            ]
          },
          {
            id: "s6",
            en: "The clothes are then checked, cleaned, and {{b}} by type and size.",
            ja: "その後、衣服は点検・洗浄され、種類やサイズごとに分類されます。",
            notes: [
              { id: "q10_original_003_note_011", expression: "be sorted by", meaning: "～によって分類される", weakEligible: true }
            ]
          },
          {
            id: "s7",
            en: "Other families can receive or buy them at a low price.",
            ja: "ほかの家庭は、それらを受け取ったり、安い価格で購入したりできます。",
            notes: [
              { id: "q10_original_003_note_012", expression: "at a low price", meaning: "安い価格で", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p3",
        sentences: [
          {
            id: "s8",
            en: "These programs have several advantages.",
            ja: "これらの活動にはいくつかの利点があります。",
            notes: []
          },
          {
            id: "s9",
            en: "Reusing uniforms can reduce the cost of school clothing.",
            ja: "制服を再利用することで、学校用衣類の費用を減らせます。",
            notes: [
              { id: "q10_original_003_note_013", expression: "reuse", meaning: "～を再利用する", weakEligible: true },
              { id: "q10_original_003_note_014", expression: "reduce the cost of", meaning: "～の費用を減らす", weakEligible: true }
            ]
          },
          {
            id: "s10",
            en: "It can also extend the life of clothes and decrease the amount of textile waste.",
            ja: "また、衣服の使用期間を延ばし、繊維廃棄物の量を減らすこともできます。",
            notes: [
              { id: "q10_original_003_note_015", expression: "extend the life of", meaning: "～の使用期間を延ばす", weakEligible: true },
              { id: "q10_original_003_note_016", expression: "textile waste", meaning: "繊維廃棄物", weakEligible: true }
            ]
          },
          {
            id: "s11",
            en: "{{c}}, reuse may reduce the need to produce and transport as many new items.",
            ja: "さらに、新しい品物をそれほど多く生産し、運ぶ必要性を減らせる可能性があります。",
            notes: [
              { id: "q10_original_003_note_017", expression: "reduce the need to do", meaning: "～する必要性を減らす", weakEligible: true },
              { id: "q10_original_003_note_018", expression: "as many", meaning: "同じほど多くの", weakEligible: false }
            ]
          }
        ]
      },

      {
        id: "p4",
        sentences: [
          {
            id: "s12",
            en: "However, a successful program requires careful management.",
            ja: "しかし、活動を成功させるには、注意深い管理が必要です。",
            notes: [
              { id: "q10_original_003_note_019", expression: "require careful management", meaning: "注意深い管理を必要とする", weakEligible: true }
            ]
          },
          {
            id: "s13",
            en: "Uniforms that are badly damaged should not be offered to another student.",
            ja: "ひどく傷んだ制服は、別の生徒に提供すべきではありません。",
            notes: [
              { id: "q10_original_003_note_020", expression: "be badly damaged", meaning: "ひどく傷んでいる", weakEligible: true },
              { id: "q10_original_003_note_021", expression: "be offered to", meaning: "～に提供される", weakEligible: false }
            ]
          },
          {
            id: "s14",
            en: "Schools also need enough storage space and people to manage collections.",
            ja: "学校には、回収品を管理するための十分な保管場所と人員も必要です。",
            notes: [
              { id: "q10_original_003_note_022", expression: "storage space", meaning: "保管場所", weakEligible: true },
              { id: "q10_original_003_note_023", expression: "manage collections", meaning: "回収品を管理する", weakEligible: false }
            ]
          },
          {
            id: "s15",
            en: "Another difficulty is that the number and size of donated items may not always {{d}} what families need.",
            ja: "もう一つの難点は、寄付された品物の数やサイズが、家庭の必要と必ず一致するとは限らないことです。",
            notes: [
              { id: "q10_original_003_note_024", expression: "another difficulty is that", meaning: "もう一つの難点は～である", weakEligible: true },
              { id: "q10_original_003_note_025", expression: "donated item", meaning: "寄付された品物", weakEligible: false },
              { id: "q10_original_003_note_026", expression: "match", meaning: "～と一致する", weakEligible: true }
            ]
          },
          {
            id: "s16",
            en: "Clear information about quality and collection methods can make the program easier to trust.",
            ja: "品質や回収方法について明確な情報を示すことで、活動を信頼しやすくできます。",
            notes: [
              { id: "q10_original_003_note_027", expression: "collection method", meaning: "回収方法", weakEligible: false },
              { id: "q10_original_003_note_028", expression: "make A easier to do", meaning: "Aをより～しやすくする", weakEligible: true }
            ]
          },
          {
            id: "s17",
            en: "Uniform reuse cannot eliminate all the costs of school clothing, but it can still provide a useful {{e}} for many families.",
            ja: "制服のリユースによって学校用衣類のすべての費用をなくすことはできませんが、多くの家庭に役立つ別の選択肢を提供できます。",
            notes: [
              { id: "q10_original_003_note_029", expression: "eliminate", meaning: "～をなくす", weakEligible: true },
              { id: "q10_original_003_note_030", expression: "alternative", meaning: "代わりとなるもの、別の選択肢", weakEligible: true }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",
        choices: [
          { id: "a1", text: "borrowed" }, { id: "a2", text: "protected" },
          { id: "a3", text: "returned" }, { id: "a4", text: "wasted" }
        ],
        answer: "a4",
        explanation: "制服を捨てると、その製造に使った材料やエネルギーも無駄になるため、wastedが適切です。",
        wrongChoiceReasons: {
          a1: "材料やエネルギーが借りられるという意味になりません。",
          a2: "制服を捨てることで材料やエネルギーが守られるわけではありません。",
          a3: "材料やエネルギーが返却されるという文脈ではありません。"
        }
      },
      {
        id: "b",
        choices: [
          { id: "b1", text: "hidden" }, { id: "b2", text: "mixed" },
          { id: "b3", text: "sorted" }, { id: "b4", text: "stored" }
        ],
        answer: "b3",
        explanation: "制服を種類やサイズごとに分類するため、sortedが適切です。",
        wrongChoiceReasons: {
          b1: "制服を種類やサイズごとに隠すという意味になりません。",
          b2: "種類やサイズごとに分けることと反対です。",
          b4: "保管すること自体はあり得ますが、by type and sizeと結び付いて分類を表すのはsortedです。"
        }
      },
      {
        id: "c",
        choices: [
          { id: "c1", text: "As a result" }, { id: "c2", text: "In addition" },
          { id: "c3", text: "Instead" }, { id: "c4", text: "On the other hand" }
        ],
        answer: "c2",
        explanation: "前文までの利点に、新しい製品の生産や輸送を減らす利点を追加しているため、In additionが適切です。",
        wrongChoiceReasons: {
          c1: "直前の利点の直接的な結果というより、別の利点の追加です。",
          c3: "何かの代わりを表す関係ではありません。",
          c4: "反対側の見方を示しているのではありません。"
        }
      },
      {
        id: "d",
        choices: [
          { id: "d1", text: "change" }, { id: "d2", text: "match" },
          { id: "d3", text: "produce" }, { id: "d4", text: "replace" }
        ],
        answer: "d2",
        explanation: "寄付品の数やサイズが家庭の必要と一致しない場合があるため、matchが適切です。",
        wrongChoiceReasons: {
          d1: "品物の数やサイズが、家庭の必要を変えるという意味になります。",
          d3: "数やサイズが、家庭の必要を生産することはありません。",
          d4: "数やサイズが、家庭の必要に取って代わるという意味は不自然です。"
        }
      },
      {
        id: "e",
        choices: [
          { id: "e1", text: "alternative" }, { id: "e2", text: "expense" },
          { id: "e3", text: "requirement" }, { id: "e4", text: "shortage" }
        ],
        answer: "e1",
        explanation: "新品を購入することに対する別の選択肢を表すalternativeが適切です。",
        wrongChoiceReasons: {
          e2: "費用を提供するという意味になりません。",
          e3: "必要条件を提供するという文脈ではありません。",
          e4: "不足を提供するという意味は不自然です。"
        }
      }
    ],

    verified: true
  },

  // =========================================================
  // Question 4
  // =========================================================
  {
    id: "q10_original_004",
    number: 4,
    sourceType: "original",
    title: "Media Literacy and False Information",
    titleJa: "メディア・リテラシーと誤情報",

    paragraphs: [
      {
        id: "p1",
        sentences: [
          {
            id: "s1",
            en: "People can now receive news and advice from websites, videos, and social media within seconds.",
            ja: "現在、人々はウェブサイト、動画、ソーシャルメディアから、数秒のうちにニュースや助言を受け取れます。",
            notes: [
              { id: "q10_original_004_note_001", expression: "advice", meaning: "助言", weakEligible: false },
              { id: "q10_original_004_note_002", expression: "within seconds", meaning: "数秒以内に", weakEligible: true }
            ]
          },
          {
            id: "s2",
            en: "This makes information easier to access, but it also allows false or misleading claims to spread quickly.",
            ja: "これによって情報にアクセスしやすくなりましたが、誤った主張や誤解を招く主張も急速に広がりやすくなりました。",
            notes: [
              { id: "q10_original_004_note_003", expression: "make A easier to do", meaning: "Aをより～しやすくする", weakEligible: true },
              { id: "q10_original_004_note_004", expression: "misleading claim", meaning: "誤解を招く主張", weakEligible: true },
              { id: "q10_original_004_note_005", expression: "allow A to do", meaning: "Aが～するのを可能にする", weakEligible: true }
            ]
          },
          {
            id: "s3",
            en: "Sometimes people share incorrect information without trying to cause harm.",
            ja: "人々は、害を与えようとせずに、間違った情報を共有してしまうこともあります。",
            notes: [
              { id: "q10_original_004_note_006", expression: "incorrect information", meaning: "間違った情報", weakEligible: false },
              { id: "q10_original_004_note_007", expression: "cause harm", meaning: "害を与える", weakEligible: true }
            ]
          },
          {
            id: "s4",
            en: "Once a surprising story has been widely shared, however, the false impression it creates can be difficult to {{a}}.",
            ja: "驚くような話が一度広く共有されると、それによって生じた誤った印象を訂正することが難しくなる場合があります。",
            notes: [
              { id: "q10_original_004_note_008", expression: "once", meaning: "いったん～すると", weakEligible: true },
              { id: "q10_original_004_note_009", expression: "be widely shared", meaning: "広く共有される", weakEligible: true },
              { id: "q10_original_004_note_010", expression: "false impression", meaning: "誤った印象", weakEligible: true },
              { id: "q10_original_004_note_011", expression: "correct", meaning: "～を訂正する", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p2",
        sentences: [
          {
            id: "s5",
            en: "Media literacy is the ability to find, understand, and carefully evaluate information.",
            ja: "メディア・リテラシーとは、情報を見つけ、理解し、注意深く評価する能力です。",
            notes: [
              { id: "q10_original_004_note_012", expression: "the ability to do", meaning: "～する能力", weakEligible: true },
              { id: "q10_original_004_note_013", expression: "evaluate", meaning: "～を評価する", weakEligible: true }
            ]
          },
          {
            id: "s6",
            en: "One useful step is to identify who created a message.",
            ja: "役立つ手順の一つは、誰がそのメッセージを作成したのかを確認することです。",
            notes: [
              { id: "q10_original_004_note_014", expression: "identify", meaning: "～を特定する、確認する", weakEligible: true }
            ]
          },
          {
            id: "s7",
            en: "A post from an unknown account should not be treated in the same way as information from an organization with expertise in the subject.",
            ja: "発信者が分からないアカウントの投稿を、その題材に関する専門知識を持つ組織の情報と同じように扱うべきではありません。",
            notes: [
              { id: "q10_original_004_note_015", expression: "unknown account", meaning: "発信者の分からないアカウント", weakEligible: false },
              { id: "q10_original_004_note_016", expression: "be treated in the same way as", meaning: "～と同じように扱われる", weakEligible: true },
              { id: "q10_original_004_note_017", expression: "expertise in", meaning: "～に関する専門知識", weakEligible: true }
            ]
          },
          {
            id: "s8",
            en: "Readers should also check the date because an old report may no longer be {{b}}.",
            ja: "古い報告は現在では正確でない可能性があるため、日付も確認する必要があります。",
            notes: [
              { id: "q10_original_004_note_018", expression: "check the date", meaning: "日付を確認する", weakEligible: true },
              { id: "q10_original_004_note_019", expression: "no longer accurate", meaning: "もはや正確ではない", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p3",
        sentences: [
          {
            id: "s9",
            en: "Another important step is to look for supporting evidence.",
            ja: "もう一つの重要な手順は、主張を裏付ける証拠を探すことです。",
            notes: [
              { id: "q10_original_004_note_020", expression: "look for", meaning: "～を探す", weakEligible: false },
              { id: "q10_original_004_note_021", expression: "supporting evidence", meaning: "裏付けとなる証拠", weakEligible: true }
            ]
          },
          {
            id: "s10",
            en: "A message may use a striking photograph or an emotional personal story, but these do not necessarily prove that its main claim is true.",
            ja: "メッセージには、強い印象を与える写真や感情的な個人の体験談が使われる場合がありますが、それだけで中心となる主張が正しいと証明されるわけではありません。",
            notes: [
              { id: "q10_original_004_note_022", expression: "striking", meaning: "強い印象を与える", weakEligible: true },
              { id: "q10_original_004_note_023", expression: "not necessarily", meaning: "必ずしも～ではない", weakEligible: true },
              { id: "q10_original_004_note_024", expression: "prove that", meaning: "～であることを証明する", weakEligible: true }
            ]
          },
          {
            id: "s11",
            en: "{{c}} accepting the claim, readers can search for the same information in other reliable sources.",
            ja: "その主張を受け入れる代わりに、ほかの信頼できる情報源で同じ情報を検索できます。",
            notes: [
              { id: "q10_original_004_note_025", expression: "instead of doing", meaning: "～する代わりに", weakEligible: true },
              { id: "q10_original_004_note_026", expression: "reliable source", meaning: "信頼できる情報源", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p4",
        sentences: [
          {
            id: "s12",
            en: "People should also notice how a message makes them feel.",
            ja: "また、人々は、メッセージによって自分がどのような感情になったかにも気付く必要があります。",
            notes: [
              { id: "q10_original_004_note_027", expression: "notice", meaning: "～に気付く", weakEligible: false },
              { id: "q10_original_004_note_028", expression: "make A feel", meaning: "Aを～という気持ちにさせる", weakEligible: true }
            ]
          },
          {
            id: "s13",
            en: "Content that causes anger or fear may encourage people to share it immediately.",
            ja: "怒りや恐怖を引き起こす内容は、人々にそれをすぐ共有させる可能性があります。",
            notes: [
              { id: "q10_original_004_note_029", expression: "cause anger or fear", meaning: "怒りや恐怖を引き起こす", weakEligible: true },
              { id: "q10_original_004_note_030", expression: "encourage A to do", meaning: "Aに～するよう促す", weakEligible: true }
            ]
          },
          {
            id: "s14",
            en: "{{d}}, feeling a strong emotion can be a sign that people should slow down rather than react more quickly.",
            ja: "このため、強い感情を抱いたことは、より速く反応するのではなく、立ち止まるべき合図になる場合があります。",
            notes: [
              { id: "q10_original_004_note_031", expression: "be a sign that", meaning: "～である合図になる", weakEligible: true },
              { id: "q10_original_004_note_032", expression: "slow down", meaning: "立ち止まって考える", weakEligible: true },
              { id: "q10_original_004_note_033", expression: "rather than", meaning: "～ではなく", weakEligible: true }
            ]
          },
          {
            id: "s15",
            en: "Media literacy does not mean distrusting everything online.",
            ja: "メディア・リテラシーとは、インターネット上のすべてを疑うことではありません。",
            notes: [
              { id: "q10_original_004_note_034", expression: "distrust", meaning: "～を信用しない、疑う", weakEligible: true }
            ]
          },
          {
            id: "s16",
            en: "It means making a careful {{e}} after checking the source, evidence, date, and purpose of a message.",
            ja: "それは、メッセージの情報源、証拠、日付、目的を確認した後で、慎重な判断をすることです。",
            notes: [
              { id: "q10_original_004_note_035", expression: "make a decision", meaning: "判断する", weakEligible: true },
              { id: "q10_original_004_note_036", expression: "source", meaning: "情報源", weakEligible: false },
              { id: "q10_original_004_note_037", expression: "purpose", meaning: "目的", weakEligible: false }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",
        choices: [
          { id: "a1", text: "correct" }, { id: "a2", text: "create" },
          { id: "a3", text: "publish" }, { id: "a4", text: "repeat" }
        ],
        answer: "a1",
        explanation: "広く共有された話によって生じた誤った印象を訂正するという意味なので、correctが適切です。",
        wrongChoiceReasons: {
          a2: "すでに生じた印象を新しく作るという意味になりません。",
          a3: "印象を公表するという意味は不自然です。",
          a4: "誤った印象を繰り返すという意味ではありません。"
        }
      },
      {
        id: "b",
        choices: [
          { id: "b1", text: "accurate" }, { id: "b2", text: "available" },
          { id: "b3", text: "familiar" }, { id: "b4", text: "private" }
        ],
        answer: "b1",
        explanation: "古い報告は現在の状況を正確に表していない可能性があるため、accurateが適切です。",
        wrongChoiceReasons: {
          b2: "古い報告でも閲覧できる場合があり、日付を確認する理由にはなりません。",
          b3: "なじみがあるかどうかを述べているのではありません。",
          b4: "公開・非公開について述べていません。"
        }
      },
      {
        id: "c",
        choices: [
          { id: "c1", text: "Because of" }, { id: "c2", text: "Instead of" },
          { id: "c3", text: "In addition to" }, { id: "c4", text: "Thanks to" }
        ],
        answer: "c2",
        explanation: "主張をすぐに受け入れる代わりに、ほかの情報源を確認するという意味です。",
        wrongChoiceReasons: {
          c1: "主張を受け入れることが原因で、という意味になります。",
          c3: "主張を受け入れることに加えて、という意味になります。",
          c4: "主張を受け入れることのおかげで、という不自然な意味です。"
        }
      },
      {
        id: "d",
        choices: [
          { id: "d1", text: "For example" }, { id: "d2", text: "For this reason" },
          { id: "d3", text: "In contrast" }, { id: "d4", text: "Similarly" }
        ],
        answer: "d2",
        explanation: "怒りや恐怖が即座の共有を促すことを受けて、強い感情を抱いたときこそ立ち止まるべきだと述べています。",
        wrongChoiceReasons: {
          d1: "後文は具体例ではありません。",
          d3: "前後は対照的な内容ではありません。",
          d4: "同様の別の事例を示しているのではありません。"
        }
      },
      {
        id: "e",
        choices: [
          { id: "e1", text: "decision" }, { id: "e2", text: "mistake" },
          { id: "e3", text: "promise" }, { id: "e4", text: "request" }
        ],
        answer: "e1",
        explanation: "make a decisionで「判断する」という意味になるため、decisionが適切です。",
        wrongChoiceReasons: {
          e2: "慎重に確認した後で、わざと誤りをするという意味にはなりません。",
          e3: "約束をする内容ではありません。",
          e4: "誰かに依頼する内容ではありません。"
        }
      }
    ],

    verified: true
  },
    // =========================================================
  // Question 5
  // =========================================================
  {
    id: "q10_original_005",
    number: 5,
    sourceType: "original",
    title: "Reducing Plastic Use at School",
    titleJa: "学校でのプラスチック使用削減",

    paragraphs: [
      {
        id: "p1",
        sentences: [
          {
            id: "s1",
            en: "Schools use many plastic products every day.",
            ja: "学校では、毎日多くのプラスチック製品が使われています。",
            notes: [
              { id: "q10_original_005_note_001", expression: "plastic product", meaning: "プラスチック製品", weakEligible: false },
              { id: "q10_original_005_note_002", expression: "every day", meaning: "毎日", weakEligible: false }
            ]
          },
          {
            id: "s2",
            en: "Students may buy drinks in plastic bottles, receive food in plastic containers, or use disposable pens and folders.",
            ja: "生徒は、ペットボトル入りの飲み物を買ったり、プラスチック容器に入った食品を受け取ったり、使い捨てのペンやファイルを使ったりすることがあります。",
            notes: [
              { id: "q10_original_005_note_003", expression: "plastic container", meaning: "プラスチック容器", weakEligible: true },
              { id: "q10_original_005_note_004", expression: "disposable", meaning: "使い捨ての", weakEligible: true }
            ]
          },
          {
            id: "s3",
            en: "These items are convenient, but many of them are used only briefly before they are thrown away.",
            ja: "これらの品物は便利ですが、その多くは短時間しか使われず、その後捨てられます。",
            notes: [
              { id: "q10_original_005_note_005", expression: "briefly", meaning: "短時間だけ", weakEligible: true },
              { id: "q10_original_005_note_006", expression: "throw away", meaning: "～を捨てる", weakEligible: true }
            ]
          },
          {
            id: "s4",
            en: "As a result, even a single school can produce a large amount of plastic {{a}}.",
            ja: "その結果、一つの学校だけでも大量のプラスチックごみを出す可能性があります。",
            notes: [
              { id: "q10_original_005_note_007", expression: "as a result", meaning: "その結果", weakEligible: true },
              { id: "q10_original_005_note_008", expression: "a large amount of", meaning: "大量の～", weakEligible: true },
              { id: "q10_original_005_note_009", expression: "plastic waste", meaning: "プラスチックごみ", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p2",
        sentences: [
          {
            id: "s5",
            en: "Before introducing new rules, a school should first examine what kinds of plastic waste it produces.",
            ja: "新しい規則を導入する前に、学校はまず、どのような種類のプラスチックごみを出しているのかを調べる必要があります。",
            notes: [
              { id: "q10_original_005_note_010", expression: "introduce a rule", meaning: "規則を導入する", weakEligible: true },
              { id: "q10_original_005_note_011", expression: "examine", meaning: "～を詳しく調べる", weakEligible: true }
            ]
          },
          {
            id: "s6",
            en: "Students and teachers can collect and record the plastic items found in classrooms, offices, and eating areas.",
            ja: "生徒と教員は、教室、職員室、飲食場所で見つかったプラスチック製品を集めて記録できます。",
            notes: [
              { id: "q10_original_005_note_012", expression: "collect and record", meaning: "集めて記録する", weakEligible: true },
              { id: "q10_original_005_note_013", expression: "eating area", meaning: "飲食場所", weakEligible: false }
            ]
          },
          {
            id: "s7",
            en: "The results may reveal which products appear most {{b}} in the waste.",
            ja: "その結果から、ごみの中にどの製品が最も頻繁に含まれているかが分かる場合があります。",
            notes: [
              { id: "q10_original_005_note_014", expression: "reveal", meaning: "～を明らかにする", weakEligible: true },
              { id: "q10_original_005_note_015", expression: "appear frequently", meaning: "頻繁に現れる", weakEligible: true }
            ]
          },
          {
            id: "s8",
            en: "This information helps the school decide where its efforts are likely to have the greatest effect.",
            ja: "この情報は、どこに取り組めば最も大きな効果が見込めるかを学校が判断するのに役立ちます。",
            notes: [
              { id: "q10_original_005_note_016", expression: "help A do", meaning: "Aが～するのに役立つ", weakEligible: true },
              { id: "q10_original_005_note_017", expression: "be likely to do", meaning: "～する可能性が高い", weakEligible: true },
              { id: "q10_original_005_note_018", expression: "have an effect", meaning: "効果をもたらす", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p3",
        sentences: [
          {
            id: "s9",
            en: "One possible step is to replace certain disposable products with reusable ones.",
            ja: "考えられる取り組みの一つは、特定の使い捨て製品を再利用できる製品に置き換えることです。",
            notes: [
              { id: "q10_original_005_note_019", expression: "replace A with B", meaning: "AをBに置き換える", weakEligible: true },
              { id: "q10_original_005_note_020", expression: "reusable", meaning: "再利用できる", weakEligible: true }
            ]
          },
          {
            id: "s10",
            en: "For example, students may be encouraged to bring refillable water bottles instead of buying bottled drinks.",
            ja: "例えば、生徒にペットボトル飲料を買う代わりに、詰め替えて使える水筒を持参するよう促すことができます。",
            notes: [
              { id: "q10_original_005_note_021", expression: "be encouraged to do", meaning: "～するよう促される", weakEligible: true },
              { id: "q10_original_005_note_022", expression: "refillable", meaning: "詰め替えて使える", weakEligible: true },
              { id: "q10_original_005_note_023", expression: "instead of doing", meaning: "～する代わりに", weakEligible: true }
            ]
          },
          {
            id: "s11",
            en: "The cafeteria might also offer reusable dishes and reduce the number of individually wrapped items.",
            ja: "食堂でも、再利用できる食器を提供し、個別包装された品物の数を減らせるかもしれません。",
            notes: [
              { id: "q10_original_005_note_024", expression: "cafeteria", meaning: "食堂", weakEligible: true },
              { id: "q10_original_005_note_025", expression: "individually wrapped", meaning: "個別包装された", weakEligible: true }
            ]
          },
          {
            id: "s12",
            en: "{{c}}, these changes will work only if the reusable alternatives are practical and easy to access.",
            ja: "ただし、これらの変更が機能するのは、再利用できる代替品が実用的で利用しやすい場合に限られます。",
            notes: [
              { id: "q10_original_005_note_026", expression: "work", meaning: "うまく機能する", weakEligible: false },
              { id: "q10_original_005_note_027", expression: "only if", meaning: "～の場合に限り", weakEligible: true },
              { id: "q10_original_005_note_028", expression: "easy to access", meaning: "利用しやすい", weakEligible: true }
            ]
          }
        ]
      },

      {
        id: "p4",
        sentences: [
          {
            id: "s13",
            en: "Simply telling students to avoid plastic may not be enough.",
            ja: "単に生徒にプラスチックを避けるよう伝えるだけでは、十分でない場合があります。",
            notes: [
              { id: "q10_original_005_note_029", expression: "avoid", meaning: "～を避ける", weakEligible: true },
              { id: "q10_original_005_note_030", expression: "may not be enough", meaning: "十分でない場合がある", weakEligible: true }
            ]
          },
          {
            id: "s14",
            en: "If water refill stations are difficult to find, students may continue buying bottled drinks.",
            ja: "給水設備が見つけにくければ、生徒はペットボトル飲料を買い続ける可能性があります。",
            notes: [
              { id: "q10_original_005_note_031", expression: "refill station", meaning: "給水設備", weakEligible: true },
              { id: "q10_original_005_note_032", expression: "continue doing", meaning: "～し続ける", weakEligible: true }
            ]
          },
          {
            id: "s15",
            en: "If reusable dishes are not cleaned properly, they may create health {{d}}.",
            ja: "再利用できる食器が適切に洗浄されなければ、衛生上の問題を引き起こす可能性があります。",
            notes: [
              { id: "q10_original_005_note_033", expression: "properly", meaning: "適切に", weakEligible: true },
              { id: "q10_original_005_note_034", expression: "health risk", meaning: "健康上・衛生上の危険", weakEligible: true }
            ]
          },
          {
            id: "s16",
            en: "The school must make environmentally responsible choices convenient for everyone.",
            ja: "学校は、環境に配慮した選択肢を、誰にとっても利用しやすいものにする必要があります。",
            notes: [
              { id: "q10_original_005_note_035", expression: "environmentally responsible", meaning: "環境に配慮した", weakEligible: true },
              { id: "q10_original_005_note_036", expression: "make A convenient", meaning: "Aを利用しやすくする", weakEligible: true }
            ]
          },
          {
            id: "s17",
            en: "Reducing plastic use requires both changes in individual behavior and {{e}} support from the school.",
            ja: "プラスチック使用を減らすには、個人の行動の変化と、学校による継続的な支援の両方が必要です。",
            notes: [
              { id: "q10_original_005_note_037", expression: "require", meaning: "～を必要とする", weakEligible: true },
              { id: "q10_original_005_note_038", expression: "individual behavior", meaning: "個人の行動", weakEligible: true },
              { id: "q10_original_005_note_039", expression: "ongoing support", meaning: "継続的な支援", weakEligible: true }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",
        choices: [
          { id: "a1", text: "energy" },
          { id: "a2", text: "equipment" },
          { id: "a3", text: "waste" },
          { id: "a4", text: "water" }
        ],
        answer: "a3",
        explanation: "使い捨てられたプラスチック製品によって、学校が大量のプラスチックごみを出すという意味なので、wasteが適切です。",
        wrongChoiceReasons: {
          a1: "plastic energyという表現にはなりません。",
          a2: "学校がプラスチック製の設備を大量に生産するという文脈ではありません。",
          a4: "plastic waterという表現は成立しません。"
        }
      },
      {
        id: "b",
        choices: [
          { id: "b1", text: "carefully" },
          { id: "b2", text: "frequently" },
          { id: "b3", text: "quietly" },
          { id: "b4", text: "safely" }
        ],
        answer: "b2",
        explanation: "ごみの中に、どの製品が最も頻繁に含まれているかを調べるという意味なので、frequentlyが適切です。",
        wrongChoiceReasons: {
          b1: "製品が注意深く現れるという意味は不自然です。",
          b3: "製品が静かに現れるという意味は、調査内容と関係がありません。",
          b4: "製品が安全に現れるという意味は不自然です。"
        }
      },
      {
        id: "c",
        choices: [
          { id: "c1", text: "For instance" },
          { id: "c2", text: "However" },
          { id: "c3", text: "Similarly" },
          { id: "c4", text: "Therefore" }
        ],
        answer: "c2",
        explanation: "前文までは再利用品を導入する方法を説明し、後文では、それが機能するための条件を示しているため、Howeverが適切です。",
        wrongChoiceReasons: {
          c1: "後文は具体例ではなく、実施上の条件を示しています。",
          c3: "前文と似た別の取り組みを追加しているのではありません。",
          c4: "前文の結果として、後文の条件が生じるわけではありません。"
        }
      },
      {
        id: "d",
        choices: [
          { id: "d1", text: "decisions" },
          { id: "d2", text: "materials" },
          { id: "d3", text: "risks" },
          { id: "d4", text: "services" }
        ],
        answer: "d3",
        explanation: "食器が適切に洗浄されない場合に生じるのは、衛生上・健康上の危険なので、risksが適切です。",
        wrongChoiceReasons: {
          d1: "健康上の決定を作り出すという意味は不自然です。",
          d2: "食器が健康上の材料を作り出すという意味になりません。",
          d4: "健康上のサービスを作り出すという文脈ではありません。"
        }
      },
      {
        id: "e",
        choices: [
          { id: "e1", text: "ancient" },
          { id: "e2", text: "limited" },
          { id: "e3", text: "ongoing" },
          { id: "e4", text: "private" }
        ],
        answer: "e3",
        explanation: "プラスチック削減を一時的な活動で終わらせず、学校が継続して支援する必要があるため、ongoingが適切です。",
        wrongChoiceReasons: {
          e1: "古代からの支援という意味は本文に合いません。",
          e2: "限られた支援が必要だと述べているのではありません。",
          e4: "個人的な支援ではなく、学校全体による支援を表しています。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 6
  // Using Empty Houses in Local Communities
  // =========================================================
  {
    id: "q10_original_006",
    number: 6,
    sourceType: "original",

    title: "Using Empty Houses in Local Communities",
    titleJa: "地域の空き家活用",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Many communities have houses that remain empty for long periods.",

            ja:
              "多くの地域には、長期間使われないままになっている住宅があります。",

            notes: [
              {
                id:
                  "q10_original_006_note_001",

                expression:
                  "remain empty",

                meaning:
                  "空いたままである",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_002",

                expression:
                  "for long periods",

                meaning:
                  "長期間にわたって",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Some owners have moved away, while others have inherited property that they do not plan to use.",

            ja:
              "所有者が別の場所へ引っ越した場合もあれば、使用する予定のない不動産を相続した場合もあります。",

            notes: [
              {
                id:
                  "q10_original_006_note_003",

                expression:
                  "move away",

                meaning:
                  "別の場所へ引っ越す",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_004",

                expression:
                  "inherit property",

                meaning:
                  "不動産を相続する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "If an empty house is not properly maintained, its condition may gradually become {{a}}.",

            ja:
              "空き家が適切に管理されなければ、その状態は次第に悪くなる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_006_note_005",

                expression:
                  "be properly maintained",

                meaning:
                  "適切に管理される",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_006",

                expression:
                  "gradually",

                meaning:
                  "徐々に、次第に",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_007",

                expression:
                  "become worse",

                meaning:
                  "悪化する、より悪くなる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Broken roofs, damaged walls, and overgrown plants can create safety problems for nearby residents.",

            ja:
              "壊れた屋根、傷んだ壁、伸びすぎた植物などは、近隣住民に安全上の問題をもたらす可能性があります。",

            notes: [
              {
                id:
                  "q10_original_006_note_008",

                expression:
                  "overgrown",

                meaning:
                  "伸びすぎた、生い茂った",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_009",

                expression:
                  "nearby resident",

                meaning:
                  "近隣住民",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_010",

                expression:
                  "create a safety problem",

                meaning:
                  "安全上の問題をもたらす",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Instead of leaving these buildings unused, some communities try to give them new purposes.",

            ja:
              "これらの建物を使わないままにする代わりに、新しい役割を持たせようとする地域もあります。",

            notes: [
              {
                id:
                  "q10_original_006_note_011",

                expression:
                  "instead of doing",

                meaning:
                  "～する代わりに",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_012",

                expression:
                  "give A a new purpose",

                meaning:
                  "Aに新しい役割を持たせる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "An empty house may be {{b}} into a small shop, a shared office, a guesthouse, or a community center.",

            ja:
              "空き家は、小さな店舗、共同オフィス、宿泊施設、地域交流施設などに改修される場合があります。",

            notes: [
              {
                id:
                  "q10_original_006_note_013",

                expression:
                  "be converted into",

                meaning:
                  "～に改修される、～に転用される",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_014",

                expression:
                  "shared office",

                meaning:
                  "共同オフィス",

                weakEligible: false
              },

              {
                id:
                  "q10_original_006_note_015",

                expression:
                  "community center",

                meaning:
                  "地域交流施設",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "In some areas, renovated houses are offered to people who want to move from large cities to smaller communities.",

            ja:
              "地域によっては、改修された住宅が、大都市からより小さな地域へ移住したい人に提供されています。",

            notes: [
              {
                id:
                  "q10_original_006_note_016",

                expression:
                  "renovated house",

                meaning:
                  "改修された住宅",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_017",

                expression:
                  "be offered to",

                meaning:
                  "～に提供される",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Such projects can bring new residents, visitors, and business activity into the area.",

            ja:
              "そのような事業は、新しい住民や訪問者、事業活動を地域にもたらす可能性があります。",

            notes: [
              {
                id:
                  "q10_original_006_note_018",

                expression:
                  "such a project",

                meaning:
                  "そのような事業",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_019",

                expression:
                  "business activity",

                meaning:
                  "事業活動、経済活動",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s9",

            en:
              "Reusing empty houses can have several advantages.",

            ja:
              "空き家の再利用には、いくつかの利点があります。",

            notes: [
              {
                id:
                  "q10_original_006_note_020",

                expression:
                  "reuse",

                meaning:
                  "～を再利用する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s10",

            en:
              "It can make use of existing buildings rather than requiring entirely new construction.",

            ja:
              "新しい建物を一から建設するのではなく、既存の建物を活用できます。",

            notes: [
              {
                id:
                  "q10_original_006_note_021",

                expression:
                  "make use of",

                meaning:
                  "～を活用する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_022",

                expression:
                  "rather than",

                meaning:
                  "～ではなく、～するよりも",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_023",

                expression:
                  "new construction",

                meaning:
                  "新しい建物の建設",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "It may also help preserve the appearance and history of a neighborhood.",

            ja:
              "また、地域の景観や歴史を残すことにも役立つ可能性があります。",

            notes: [
              {
                id:
                  "q10_original_006_note_024",

                expression:
                  "preserve",

                meaning:
                  "～を保存する、維持する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_025",

                expression:
                  "the appearance of",

                meaning:
                  "～の外観、景観",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "{{c}}, a renovated building can become a place where local people meet and take part in activities.",

            ja:
              "さらに、改修された建物は、地域の人々が集まり、活動に参加する場所にもなり得ます。",

            notes: [
              {
                id:
                  "q10_original_006_note_026",

                expression:
                  "take part in",

                meaning:
                  "～に参加する",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s13",

            en:
              "However, turning an empty house into a useful space is not always simple.",

            ja:
              "しかし、空き家を役立つ場所へ変えることは、必ずしも簡単ではありません。",

            notes: [
              {
                id:
                  "q10_original_006_note_027",

                expression:
                  "turn A into B",

                meaning:
                  "AをBに変える",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_028",

                expression:
                  "not always",

                meaning:
                  "必ずしも～とは限らない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "Before renovation begins, experts may need to inspect the building and confirm that it is structurally {{d}}.",

            ja:
              "改修を始める前に、専門家が建物を点検し、構造上安全であることを確認する必要がある場合があります。",

            notes: [
              {
                id:
                  "q10_original_006_note_029",

                expression:
                  "renovation",

                meaning:
                  "改修",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_030",

                expression:
                  "inspect",

                meaning:
                  "～を点検する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_031",

                expression:
                  "structurally sound",

                meaning:
                  "構造上安全な、構造がしっかりした",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "Repairs may cost more than expected, especially if the building has been empty for many years.",

            ja:
              "特に建物が長年空いたままであった場合、修理費が予想以上にかかる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_006_note_032",

                expression:
                  "cost more than expected",

                meaning:
                  "予想以上に費用がかかる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_033",

                expression:
                  "especially if",

                meaning:
                  "特に～の場合",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "The owner, local government, residents, and project operators may also need to agree on how the property will be used and managed.",

            ja:
              "また、所有者、自治体、住民、事業運営者が、その不動産をどのように利用し、管理するかについて合意する必要がある場合もあります。",

            notes: [
              {
                id:
                  "q10_original_006_note_034",

                expression:
                  "agree on",

                meaning:
                  "～について合意する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_035",

                expression:
                  "property",

                meaning:
                  "不動産、所有物",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_036",

                expression:
                  "project operator",

                meaning:
                  "事業運営者",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Without a clear management plan, a renovated building may become empty {{e}}.",

            ja:
              "明確な管理計画がなければ、改修された建物が再び空き家になる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_006_note_037",

                expression:
                  "management plan",

                meaning:
                  "管理計画",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_038",

                expression:
                  "once again",

                meaning:
                  "再び、もう一度",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Successful reuse therefore requires not only a good idea but also long-term cooperation and responsibility.",

            ja:
              "したがって、空き家の活用を成功させるには、良いアイデアだけでなく、長期的な協力と責任も必要です。",

            notes: [
              {
                id:
                  "q10_original_006_note_039",

                expression:
                  "not only A but also B",

                meaning:
                  "AだけでなくBも",

                weakEligible: true
              },

              {
                id:
                  "q10_original_006_note_040",

                expression:
                  "long-term cooperation",

                meaning:
                  "長期的な協力",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "better"
          },

          {
            id: "a2",
            text: "larger"
          },

          {
            id: "a3",
            text: "safer"
          },

          {
            id: "a4",
            text: "worse"
          }
        ],

        answer: "a4",

        explanation:
          "空き家が適切に管理されなければ、その状態が次第に悪くなるという内容なので、worseが適切です。become worseで「悪化する」という意味になります。",

        wrongChoiceReasons: {
          a1:
            "管理されていない建物の状態が良くなるという、本文と反対の意味です。",

          a2:
            "建物の状態が大きくなるという意味は不自然です。",

          a3:
            "管理されていない建物がより安全になるという、本文と反対の意味です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "converted"
          },

          {
            id: "b2",
            text: "delivered"
          },

          {
            id: "b3",
            text: "divided"
          },

          {
            id: "b4",
            text: "removed"
          }
        ],

        answer: "b1",

        explanation:
          "be converted into Aで「Aに改修される・転用される」という意味になるため、convertedが適切です。",

        wrongChoiceReasons: {
          b2:
            "空き家が店舗などへ配送されるという意味になり、文脈に合いません。",

          b3:
            "be divided intoなら「～に分けられる」という意味ですが、ここでは建物の用途を変える内容です。",

          b4:
            "空き家が店舗などへ取り除かれるという意味は成立しません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For example"
          },

          {
            id: "c2",
            text: "In addition"
          },

          {
            id: "c3",
            text: "In contrast"
          },

          {
            id: "c4",
            text: "Nevertheless"
          }
        ],

        answer: "c2",

        explanation:
          "既存の建物を活用できることや地域の景観を残せることに加えて、地域交流の場にもなるという別の利点を追加しています。そのため、In additionが適切です。",

        wrongChoiceReasons: {
          c1:
            "後ろの文は、直前の内容の具体例ではなく、別の利点を追加しています。",

          c3:
            "前後の内容は対照的ではなく、どちらも空き家活用の利点です。",

          c4:
            "直前の内容に反する事柄を述べているわけではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "available"
          },

          {
            id: "d2",
            text: "familiar"
          },

          {
            id: "d3",
            text: "sound"
          },

          {
            id: "d4",
            text: "valuable"
          }
        ],

        answer: "d3",

        explanation:
          "structurally soundで「構造上安全な」「構造がしっかりした」という意味になるため、soundが適切です。",

        wrongChoiceReasons: {
          d1:
            "availableは「利用できる」という意味ですが、structurally availableという表現にはなりません。",

          d2:
            "familiarは「よく知られた、なじみのある」という意味で、建物の構造上の安全性を表しません。",

          d4:
            "valuableは「価値のある」という意味ですが、ここでは建物の価値ではなく、構造上安全かどうかを確認しています。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "at least"
          },

          {
            id: "e2",
            text: "by accident"
          },

          {
            id: "e3",
            text: "in advance"
          },

          {
            id: "e4",
            text: "once again"
          }
        ],

        answer: "e4",

        explanation:
          "改修して活用を始めても、明確な管理計画がなければ再び空き家になる可能性があるという意味なので、once againが適切です。",

        wrongChoiceReasons: {
          e1:
            "at leastは「少なくとも」という意味で、become empty at leastという語順・意味は不自然です。",

          e2:
            "by accidentは「偶然に」という意味ですが、ここでは管理不足によって再び空き家になる可能性を述べています。",

          e3:
            "in advanceは「前もって」という意味で、空き家になる時期を表す文脈には合いません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 7
  // AI Translation and Human Communication
  // =========================================================
  {
    id: "q10_original_007",
    number: 7,
    sourceType: "original",

    title: "AI Translation and Human Communication",
    titleJa: "AI翻訳と人間同士のコミュニケーション",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "AI translation tools are now used by many people in their daily lives.",

            ja:
              "現在、AI翻訳ツールは多くの人々の日常生活で使われています。",

            notes: [
              {
                id:
                  "q10_original_007_note_001",

                expression:
                  "translation tool",

                meaning:
                  "翻訳ツール",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_002",

                expression:
                  "daily life",

                meaning:
                  "日常生活",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "A smartphone can translate written messages, signs, and even spoken conversations within a short time.",

            ja:
              "スマートフォンは、文章、標識、さらには会話まで短時間で翻訳できます。",

            notes: [
              {
                id:
                  "q10_original_007_note_003",

                expression:
                  "written message",

                meaning:
                  "書かれたメッセージ、文章",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_004",

                expression:
                  "spoken conversation",

                meaning:
                  "話し言葉による会話",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_005",

                expression:
                  "within a short time",

                meaning:
                  "短時間のうちに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "These tools can make it {{a}} for people who speak different languages to understand one another.",

            ja:
              "これらのツールは、異なる言語を話す人々がお互いを理解することを、より簡単にしてくれます。",

            notes: [
              {
                id:
                  "q10_original_007_note_006",

                expression:
                  "make it easier for A to do",

                meaning:
                  "Aが～することを、より簡単にする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_007",

                expression:
                  "one another",

                meaning:
                  "お互いに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "As a result, language differences may become less serious barriers to travel, study, and work.",

            ja:
              "その結果、言語の違いは、旅行、学習、仕事に対する以前ほど大きな障壁ではなくなる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_007_note_008",

                expression:
                  "as a result",

                meaning:
                  "その結果",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_009",

                expression:
                  "language difference",

                meaning:
                  "言語の違い",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_010",

                expression:
                  "a barrier to",

                meaning:
                  "～に対する障害",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "AI translation is especially useful when people need simple information quickly.",

            ja:
              "AI翻訳は、人々が簡単な情報をすぐに必要とするときに特に役立ちます。",

            notes: [
              {
                id:
                  "q10_original_007_note_011",

                expression:
                  "be especially useful",

                meaning:
                  "特に役に立つ",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_012",

                expression:
                  "simple information",

                meaning:
                  "簡単な情報、基本的な情報",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Travelers can use it to {{b}} information about directions, transportation, or local rules.",

            ja:
              "旅行者は、道順、交通手段、地域の規則などに関する情報をやり取りするために、それを利用できます。",

            notes: [
              {
                id:
                  "q10_original_007_note_013",

                expression:
                  "exchange information",

                meaning:
                  "情報を交換する、情報をやり取りする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_014",

                expression:
                  "direction",

                meaning:
                  "方向、道順",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_015",

                expression:
                  "local rule",

                meaning:
                  "地域の規則",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Students can also use translation tools to get a general understanding of foreign-language materials.",

            ja:
              "生徒はまた、外国語の資料について大まかな理解を得るために翻訳ツールを使うことができます。",

            notes: [
              {
                id:
                  "q10_original_007_note_016",

                expression:
                  "a general understanding of",

                meaning:
                  "～についての大まかな理解",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_017",

                expression:
                  "foreign-language material",

                meaning:
                  "外国語の資料",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "In workplaces, the technology may help international teams share basic messages more efficiently.",

            ja:
              "職場では、この技術が国際的なチームによる基本的なメッセージの共有を、より効率的にする可能性があります。",

            notes: [
              {
                id:
                  "q10_original_007_note_018",

                expression:
                  "international team",

                meaning:
                  "国際的なチーム",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_019",

                expression:
                  "efficiently",

                meaning:
                  "効率的に",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s9",

            en:
              "{{c}}, translating words is not always the same as communicating a complete message.",

            ja:
              "しかし、言葉を翻訳することは、必ずしもメッセージ全体を伝えることと同じではありません。",

            notes: [
              {
                id:
                  "q10_original_007_note_020",

                expression:
                  "not always the same as",

                meaning:
                  "必ずしも～と同じではない",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_021",

                expression:
                  "communicate a message",

                meaning:
                  "メッセージを伝える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s10",

            en:
              "The same expression may have different meanings depending on the situation, the speaker, and the relationship between the people involved.",

            ja:
              "同じ表現でも、状況、話し手、関係する人々の間柄によって、異なる意味を持つ場合があります。",

            notes: [
              {
                id:
                  "q10_original_007_note_022",

                expression:
                  "depending on",

                meaning:
                  "～によって、～次第で",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_023",

                expression:
                  "the people involved",

                meaning:
                  "関係している人々",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_024",

                expression:
                  "relationship between A and B",

                meaning:
                  "AとBの関係",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Jokes, polite expressions, and indirect answers can be particularly difficult for a machine to translate.",

            ja:
              "冗談、丁寧な表現、遠回しな返答などは、機械にとって特に翻訳が難しい場合があります。",

            notes: [
              {
                id:
                  "q10_original_007_note_025",

                expression:
                  "polite expression",

                meaning:
                  "丁寧な表現",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_026",

                expression:
                  "indirect answer",

                meaning:
                  "間接的な返答、遠回しな返答",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_027",

                expression:
                  "particularly difficult",

                meaning:
                  "特に難しい",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "A direct translation may therefore sound strange or even rude to a person from another culture.",

            ja:
              "そのため、直訳は別の文化の人にとって、不自然に聞こえたり、失礼にさえ聞こえたりすることがあります。",

            notes: [
              {
                id:
                  "q10_original_007_note_028",

                expression:
                  "direct translation",

                meaning:
                  "直訳",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_029",

                expression:
                  "sound strange",

                meaning:
                  "不自然に聞こえる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_030",

                expression:
                  "another culture",

                meaning:
                  "別の文化、異文化",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "The intended {{d}} may be understood only when the cultural background and tone of the speaker are considered.",

            ja:
              "意図された意味は、文化的背景や話し手の口調を考慮して初めて理解できる場合があります。",

            notes: [
              {
                id:
                  "q10_original_007_note_031",

                expression:
                  "intended meaning",

                meaning:
                  "意図された意味",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_032",

                expression:
                  "cultural background",

                meaning:
                  "文化的背景",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_033",

                expression:
                  "be considered",

                meaning:
                  "考慮される",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s14",

            en:
              "Translation errors may be a minor problem in an ordinary conversation.",

            ja:
              "翻訳の誤りは、日常的な会話では小さな問題にすぎない場合があります。",

            notes: [
              {
                id:
                  "q10_original_007_note_034",

                expression:
                  "translation error",

                meaning:
                  "翻訳の誤り",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_035",

                expression:
                  "a minor problem",

                meaning:
                  "小さな問題",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_036",

                expression:
                  "ordinary conversation",

                meaning:
                  "日常的な会話",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "In medical, legal, or business situations, however, a small mistake can have serious results.",

            ja:
              "しかし、医療、法律、ビジネスの場面では、小さな間違いが重大な結果をもたらすことがあります。",

            notes: [
              {
                id:
                  "q10_original_007_note_037",

                expression:
                  "legal situation",

                meaning:
                  "法律に関わる状況",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_038",

                expression:
                  "have serious results",

                meaning:
                  "重大な結果をもたらす",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "People should not assume that every translation produced by AI is completely correct.",

            ja:
              "人々は、AIが作ったすべての翻訳が完全に正しいと思い込むべきではありません。",

            notes: [
              {
                id:
                  "q10_original_007_note_039",

                expression:
                  "assume that",

                meaning:
                  "～だと思い込む、～だと仮定する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_040",

                expression:
                  "be produced by",

                meaning:
                  "～によって作られる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_041",

                expression:
                  "completely correct",

                meaning:
                  "完全に正しい",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "They should check important translations {{e}} and ask a skilled person for help when necessary.",

            ja:
              "重要な翻訳は注意深く確認し、必要な場合には、技能を持つ人に助けを求めるべきです。",

            notes: [
              {
                id:
                  "q10_original_007_note_042",

                expression:
                  "check carefully",

                meaning:
                  "注意深く確認する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_043",

                expression:
                  "ask A for help",

                meaning:
                  "Aに助けを求める",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_044",

                expression:
                  "when necessary",

                meaning:
                  "必要な場合には",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "AI translation is most useful when it supports human communication rather than replacing human judgment.",

            ja:
              "AI翻訳は、人間の判断に取って代わるのではなく、人間同士のコミュニケーションを支えるときに、最も役立ちます。",

            notes: [
              {
                id:
                  "q10_original_007_note_045",

                expression:
                  "support human communication",

                meaning:
                  "人間同士のコミュニケーションを支える",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_046",

                expression:
                  "rather than doing",

                meaning:
                  "～するのではなく",

                weakEligible: true
              },

              {
                id:
                  "q10_original_007_note_047",

                expression:
                  "replace human judgment",

                meaning:
                  "人間の判断に取って代わる",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "easier"
          },

          {
            id: "a2",
            text: "longer"
          },

          {
            id: "a3",
            text: "narrower"
          },

          {
            id: "a4",
            text: "quieter"
          }
        ],

        answer: "a1",

        explanation:
          "AI翻訳によって、異なる言語を話す人同士がお互いを理解しやすくなるという内容です。make it easier for A to doで「Aが～することを、より簡単にする」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "人々がお互いを理解することを「より長くする」という意味は成立しません。",

          a3:
            "narrowerは「より狭い」という意味で、人が理解することの難しさを表す文脈には合いません。",

          a4:
            "quieterは「より静かな」という意味で、理解しやすさを表していません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "avoid"
          },

          {
            id: "b2",
            text: "exchange"
          },

          {
            id: "b3",
            text: "hide"
          },

          {
            id: "b4",
            text: "lose"
          }
        ],

        answer: "b2",

        explanation:
          "旅行者が道順や交通手段などについて情報をやり取りするという内容です。exchange informationで「情報を交換する」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "avoid informationでは「情報を避ける」という意味になり、旅行中に情報を得るという文脈に合いません。",

          b3:
            "hide informationでは「情報を隠す」という意味になり、AI翻訳の利用目的とは反対です。",

          b4:
            "lose informationでは「情報を失う」という意味になり、本文の内容に合いません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For example"
          },

          {
            id: "c2",
            text: "However"
          },

          {
            id: "c3",
            text: "Similarly"
          },

          {
            id: "c4",
            text: "Therefore"
          }
        ],

        answer: "c2",

        explanation:
          "前の段落ではAI翻訳の利点が述べられていますが、ここからは、単語を翻訳するだけでは完全なメッセージを伝えられない場合があるという限界を述べています。内容が対比されているため、Howeverが適切です。",

        wrongChoiceReasons: {
          c1:
            "後ろの文は、前の段落で述べた利点の具体例ではありません。",

          c3:
            "前後は同じ内容ではなく、利点から問題点へ話題が変わっています。",

          c4:
            "後ろの文は前の内容から導かれる結果ではなく、反対側の問題点を述べています。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "area"
          },

          {
            id: "d2",
            text: "meaning"
          },

          {
            id: "d3",
            text: "method"
          },

          {
            id: "d4",
            text: "speed"
          }
        ],

        answer: "d2",

        explanation:
          "文化的背景や話し手の口調を考えることで、表現が本来伝えようとしている意味を理解できるという内容です。intended meaningで「意図された意味」という表現になります。",

        wrongChoiceReasons: {
          d1:
            "intended areaは文法上あり得ますが、文化的背景や話し手の口調から場所を理解するという内容ではありません。",

          d3:
            "話し手が意図した方法を理解するという内容ではありません。",

          d4:
            "文化的背景や口調によって、意図された速度が理解されるという意味は不自然です。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "carefully"
          },

          {
            id: "e2",
            text: "cheaply"
          },

          {
            id: "e3",
            text: "equally"
          },

          {
            id: "e4",
            text: "suddenly"
          }
        ],

        answer: "e1",

        explanation:
          "医療、法律、ビジネスなどでは小さな翻訳ミスが重大な結果につながるため、重要な翻訳を注意深く確認する必要があります。check carefullyで「注意深く確認する」という意味になります。",

        wrongChoiceReasons: {
          e2:
            "翻訳を安く確認するという内容ではなく、正確さを確かめることが重要です。",

          e3:
            "すべての翻訳を等しく確認するという意味ではなく、重要な翻訳を慎重に確認するという内容です。",

          e4:
            "翻訳を突然確認するという意味は、本文の内容に合いません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 8
  // Delivery Robots in Cities
  // =========================================================
  {
    id: "q10_original_008",
    number: 8,
    sourceType: "original",

    title: "Delivery Robots in Cities",
    titleJa: "街中の配達ロボット",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "In some cities, small delivery robots have begun to travel along sidewalks.",

            ja:
              "一部の都市では、小型の配達ロボットが歩道を走るようになっています。",

            notes: [
              {
                id:
                  "q10_original_008_note_001",

                expression:
                  "delivery robot",

                meaning:
                  "配達ロボット",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_002",

                expression:
                  "travel along",

                meaning:
                  "～に沿って進む",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_003",

                expression:
                  "sidewalk",

                meaning:
                  "歩道",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "These machines carry food, medicine, and other small goods to customers.",

            ja:
              "これらの機械は、食べ物、薬、その他の小さな商品を顧客へ運びます。",

            notes: [
              {
                id:
                  "q10_original_008_note_004",

                expression:
                  "carry A to B",

                meaning:
                  "AをBへ運ぶ",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_005",

                expression:
                  "small goods",

                meaning:
                  "小型の商品、小さな荷物",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "They usually move at a low speed and use cameras and sensors to avoid people and objects.",

            ja:
              "通常、それらは低速で移動し、カメラやセンサーを使って人や物を避けます。",

            notes: [
              {
                id:
                  "q10_original_008_note_006",

                expression:
                  "at a low speed",

                meaning:
                  "低速で",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_007",

                expression:
                  "avoid people and objects",

                meaning:
                  "人や物を避ける",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Companies hope that these robots will help {{a}} the amount of work done by human delivery workers.",

            ja:
              "企業は、これらのロボットが人間の配達員の仕事量を減らす助けになることを期待しています。",

            notes: [
              {
                id:
                  "q10_original_008_note_008",

                expression:
                  "hope that",

                meaning:
                  "～であることを期待する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_009",

                expression:
                  "reduce the amount of",

                meaning:
                  "～の量を減らす",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_010",

                expression:
                  "delivery worker",

                meaning:
                  "配達員",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Delivery robots may offer several advantages.",

            ja:
              "配達ロボットには、いくつかの利点があるかもしれません。",

            notes: [
              {
                id:
                  "q10_original_008_note_011",

                expression:
                  "offer an advantage",

                meaning:
                  "利点をもたらす",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "First, they can operate during times when fewer workers are available.",

            ja:
              "まず、働ける人が少ない時間帯にも運行できます。",

            notes: [
              {
                id:
                  "q10_original_008_note_012",

                expression:
                  "operate",

                meaning:
                  "運行する、作動する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_013",

                expression:
                  "be available",

                meaning:
                  "利用できる、手が空いている",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "They may also {{b}} delivery workers to spend more time handling larger or more difficult orders.",

            ja:
              "また、配達員がより大きな注文や難しい注文への対応に、より多くの時間を使えるようにする可能性があります。",

            notes: [
              {
                id:
                  "q10_original_008_note_014",

                expression:
                  "allow A to do",

                meaning:
                  "Aが～することを可能にする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_015",

                expression:
                  "spend time doing",

                meaning:
                  "～することに時間を使う",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_016",

                expression:
                  "handle an order",

                meaning:
                  "注文に対応する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Because the robots are electric, they may produce less noise and air pollution than some delivery vehicles.",

            ja:
              "ロボットは電気で動くため、一部の配達車両よりも騒音や大気汚染を少なくできる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_008_note_017",

                expression:
                  "be electric",

                meaning:
                  "電気で動く",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_018",

                expression:
                  "air pollution",

                meaning:
                  "大気汚染",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_019",

                expression:
                  "less A than B",

                meaning:
                  "Bよりも少ないA",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "They can also complete short-distance deliveries without requiring a driver for every trip.",

            ja:
              "さらに、毎回運転手を必要とせずに、近距離の配達を完了できます。",

            notes: [
              {
                id:
                  "q10_original_008_note_020",

                expression:
                  "short-distance delivery",

                meaning:
                  "近距離の配達",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_021",

                expression:
                  "without doing",

                meaning:
                  "～せずに",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_022",

                expression:
                  "require a driver",

                meaning:
                  "運転手を必要とする",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "However, sidewalks are shared by many different users.",

            ja:
              "しかし、歩道はさまざまな利用者によって共有されています。",

            notes: [
              {
                id:
                  "q10_original_008_note_023",

                expression:
                  "be shared by",

                meaning:
                  "～によって共有される",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Pedestrians, wheelchair users, parents with baby carriages, and cyclists may all use the same space.",

            ja:
              "歩行者、車いす利用者、ベビーカーを押す保護者、自転車利用者が、同じ場所を使うことがあります。",

            notes: [
              {
                id:
                  "q10_original_008_note_024",

                expression:
                  "wheelchair user",

                meaning:
                  "車いす利用者",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_025",

                expression:
                  "baby carriage",

                meaning:
                  "ベビーカー",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "A robot that suddenly stops or changes direction may block the way or surprise someone nearby.",

            ja:
              "突然止まったり方向を変えたりするロボットは、道をふさいだり、近くの人を驚かせたりする可能性があります。",

            notes: [
              {
                id:
                  "q10_original_008_note_026",

                expression:
                  "change direction",

                meaning:
                  "方向を変える",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_027",

                expression:
                  "block the way",

                meaning:
                  "道をふさぐ",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_028",

                expression:
                  "someone nearby",

                meaning:
                  "近くにいる人",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "Poor weather can also make it difficult for cameras and sensors to recognize road conditions correctly.",

            ja:
              "悪天候によって、カメラやセンサーが道路状況を正しく認識することが難しくなる場合もあります。",

            notes: [
              {
                id:
                  "q10_original_008_note_029",

                expression:
                  "make it difficult for A to do",

                meaning:
                  "Aが～することを難しくする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_030",

                expression:
                  "recognize road conditions",

                meaning:
                  "道路状況を認識する",

                weakEligible: true
              }
            ]
          },

          {
  id: "s14",

  en:
    "{{c}}, cities need clear rules about where delivery robots may travel and how fast they may move.",

  ja:
    "したがって、都市には、配達ロボットがどこを走行でき、どれほどの速さで移動できるかについて、明確な規則が必要です。",

  notes: [
    {
      id:
        "q10_original_008_note_031",

      expression:
        "therefore",

      meaning:
        "したがって、それゆえに",

      weakEligible: true
    },

    {
      id:
        "q10_original_008_note_032",

      expression:
        "clear rules about",

      meaning:
        "～についての明確な規則",

      weakEligible: true
    }
  ]
}
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s15",

            en:
              "Delivery robots may not work equally well in every area.",

            ja:
              "配達ロボットは、すべての地域で同じようにうまく機能するとは限りません。",

            notes: [
              {
                id:
                  "q10_original_008_note_033",

                expression:
                  "not equally well",

                meaning:
                  "同じようにうまくは～ない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "They are more {{d}} to operate successfully in places with wide, smooth sidewalks and short delivery routes.",

            ja:
              "幅が広く平らな歩道と短い配達経路がある場所では、うまく運行できる可能性がより高くなります。",

            notes: [
              {
                id:
                  "q10_original_008_note_034",

                expression:
                  "be likely to do",

                meaning:
                  "～する可能性が高い",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_035",

                expression:
                  "smooth sidewalk",

                meaning:
                  "平らで滑らかな歩道",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_036",

                expression:
                  "delivery route",

                meaning:
                  "配達経路",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "In crowded areas or places with many hills and steps, using robots may be more difficult.",

            ja:
              "混雑した地域や、坂道や階段が多い場所では、ロボットの利用がより難しい場合があります。",

            notes: [
              {
                id:
                  "q10_original_008_note_037",

                expression:
                  "crowded area",

                meaning:
                  "混雑した地域",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_038",

                expression:
                  "places with many hills",

                meaning:
                  "坂道が多い場所",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "The robots will not be widely accepted {{e}} companies and local governments can show that they are safe and useful.",

            ja:
              "企業や自治体が、配達ロボットが安全で役立つことを示せなければ、それらは広く受け入れられないでしょう。",

            notes: [
              {
                id:
                  "q10_original_008_note_039",

                expression:
                  "be widely accepted",

                meaning:
                  "広く受け入れられる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_040",

                expression:
                  "unless",

                meaning:
                  "～でない限り、～しなければ",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_041",

                expression:
                  "local government",

                meaning:
                  "自治体、地方政府",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Delivery robots may become useful city tools, but their success will depend on careful design, suitable roads, and public trust.",

            ja:
              "配達ロボットは都市で役立つ道具になる可能性がありますが、その成功は、慎重な設計、適切な道路環境、人々からの信頼に左右されるでしょう。",

            notes: [
              {
                id:
                  "q10_original_008_note_042",

                expression:
                  "depend on",

                meaning:
                  "～に左右される、～次第である",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_043",

                expression:
                  "careful design",

                meaning:
                  "慎重な設計",

                weakEligible: true
              },

              {
                id:
                  "q10_original_008_note_044",

                expression:
                  "public trust",

                meaning:
                  "人々からの信頼、社会的な信頼",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "increase"
          },

          {
            id: "a2",
            text: "reduce"
          },

          {
            id: "a3",
            text: "repeat"
          },

          {
            id: "a4",
            text: "separate"
          }
        ],

        answer: "a2",

        explanation:
          "配達ロボットが人間の配達員の仕事量を減らす助けになるという内容です。reduce the amount of Aで「Aの量を減らす」という意味になります。",

        wrongChoiceReasons: {
          a1:
            "企業は配達員の仕事量を増やすことではなく、負担を減らすことを期待しています。",

          a3:
            "仕事量を繰り返すという意味は成立しません。",

          a4:
            "separateは「分ける」という意味で、仕事量そのものを減らす内容には合いません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "allow"
          },

          {
            id: "b2",
            text: "avoid"
          },

          {
            id: "b3",
            text: "finish"
          },

          {
            id: "b4",
            text: "refuse"
          }
        ],

        answer: "b1",

        explanation:
          "ロボットの利用によって、配達員がより難しい注文に多くの時間を使えるようになるという内容です。allow A to doで「Aが～することを可能にする」という構文になります。",

        wrongChoiceReasons: {
          b2:
            "avoidの後ろには通常、名詞または動名詞が続きます。avoid delivery workers to spendとはできません。",

          b3:
            "finishの後ろにもto不定詞は続かず、意味も「配達員を終える」となって不自然です。",

          b4:
            "refuseは通常、人を目的語に取ってrefuse A to doとはしません。また、配達員が時間を使うことを拒否する内容でもありません。"
        }
      },

     {
  id: "c",

  choices: [
    {
      id: "c1",
      text: "For example"
    },

    {
      id: "c2",
      text: "Instead"
    },

    {
      id: "c3",
      text: "Therefore"
    },

    {
      id: "c4",
      text: "Meanwhile"
    }
  ],

  answer: "c3",

  explanation:
    "前の文では、配達ロボットが道をふさいだり、悪天候によって周囲を正しく認識できなかったりする問題が述べられています。その問題を受けて、走行場所や速度について明確な規則が必要だと結論づけているため、Thereforeが適切です。",

  wrongChoiceReasons: {
    c1:
      "後ろの文は、前に述べた問題の具体例ではなく、それを受けた結論です。",

    c2:
      "Insteadは「その代わりに」という意味ですが、別の行動へ置き換える内容ではありません。",

    c4:
      "Meanwhileは「その一方で」「その間に」という意味ですが、二つの出来事を並行して述べているわけではありません。"
  }
},

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "afraid"
          },

          {
            id: "d2",
            text: "likely"
          },

          {
            id: "d3",
            text: "ready"
          },

          {
            id: "d4",
            text: "sorry"
          }
        ],

        answer: "d2",

        explanation:
          "幅が広く平らな歩道など、条件のよい場所では、ロボットがうまく運行できる可能性が高いという内容です。be likely to doで「～する可能性が高い」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "be afraid to doは「～することを恐れる」という意味で、ロボットの運行可能性を表しません。",

          d3:
            "be ready to doは「～する準備ができている」という意味で、場所の条件による成功の可能性を表す文脈には合いません。",

          d4:
            "be sorry to doは「～して残念に思う」という意味で、機械の運行については不自然です。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "although"
          },

          {
            id: "e2",
            text: "because"
          },

          {
            id: "e3",
            text: "unless"
          },

          {
            id: "e4",
            text: "while"
          }
        ],

        answer: "e3",

        explanation:
          "企業や自治体が安全性と有用性を示さなければ、ロボットは広く受け入れられないという条件を表しています。unlessは「～でない限り」「～しなければ」という意味です。",

        wrongChoiceReasons: {
          e1:
            "althoughでは「安全性を示すけれども受け入れられない」という逆接になり、本文の意味と異なります。",

          e2:
            "becauseでは、安全性を示すことが受け入れられない理由になってしまい、因果関係が逆になります。",

          e4:
            "whileは「～する間」または「一方で」という意味ですが、ここで必要なのは否定条件です。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 9
  // Smartphones for Emergency Information
  // =========================================================
  {
    id: "q10_original_009",
    number: 9,
    sourceType: "original",

    title: "Smartphones for Emergency Information",
    titleJa: "災害情報におけるスマートフォンの活用",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Smartphones have become important tools during natural disasters.",

            ja:
              "スマートフォンは、自然災害の際に重要な道具となっています。",

            notes: [
              {
                id:
                  "q10_original_009_note_001",

                expression:
                  "natural disaster",

                meaning:
                  "自然災害",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_002",

                expression:
                  "important tool",

                meaning:
                  "重要な道具",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "People can use them to get weather warnings, evacuation information, and news about damaged roads.",

            ja:
              "人々はスマートフォンを使って、気象警報、避難情報、被害を受けた道路に関する情報を得ることができます。",

            notes: [
              {
                id:
                  "q10_original_009_note_003",

                expression:
                  "weather warning",

                meaning:
                  "気象警報",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_004",

                expression:
                  "evacuation information",

                meaning:
                  "避難情報",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_005",

                expression:
                  "damaged road",

                meaning:
                  "被害を受けた道路",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Local governments can send messages directly to residents so that they can act quickly.",

            ja:
              "自治体は、住民がすぐに行動できるように、直接メッセージを送ることができます。",

            notes: [
              {
                id:
                  "q10_original_009_note_006",

                expression:
                  "send A directly to B",

                meaning:
                  "AをBへ直接送る",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_007",

                expression:
                  "so that A can do",

                meaning:
                  "Aが～できるように",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_008",

                expression:
                  "act quickly",

                meaning:
                  "すぐに行動する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "A person may {{a}} an alert even when no television or radio is nearby.",

            ja:
              "近くにテレビやラジオがなくても、警報を受け取れる場合があります。",

            notes: [
              {
                id:
                  "q10_original_009_note_009",

                expression:
                  "receive an alert",

                meaning:
                  "警報を受け取る",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_010",

                expression:
                  "even when",

                meaning:
                  "～の場合でさえ",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Smartphones can also help people communicate with family members and friends.",

            ja:
              "スマートフォンは、家族や友人との連絡にも役立ちます。",

            notes: [
              {
                id:
                  "q10_original_009_note_011",

                expression:
                  "communicate with",

                meaning:
                  "～と連絡を取る、意思疎通する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Messaging services may {{b}} users to report that they are safe without making a long phone call.",

            ja:
              "メッセージサービスによって、利用者は長い電話をかけずに、自分が無事であることを知らせられる場合があります。",

            notes: [
              {
                id:
                  "q10_original_009_note_012",

                expression:
                  "enable A to do",

                meaning:
                  "Aが～することを可能にする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_013",

                expression:
                  "report that",

                meaning:
                  "～であると知らせる、報告する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_014",

                expression:
                  "make a phone call",

                meaning:
                  "電話をかける",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Online maps may show evacuation centers, hospitals, and routes that are still open.",

            ja:
              "オンライン地図には、避難所、病院、まだ通行できる経路が表示される場合があります。",

            notes: [
              {
                id:
                  "q10_original_009_note_015",

                expression:
                  "evacuation center",

                meaning:
                  "避難所",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_016",

                expression:
                  "route",

                meaning:
                  "経路、道筋",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_017",

                expression:
                  "remain open",

                meaning:
                  "利用できる状態のままである",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Photographs and location information can help emergency workers understand where assistance is needed.",

            ja:
              "写真や位置情報は、救助活動を行う人々が、どこで支援が必要なのかを把握する助けになります。",

            notes: [
              {
                id:
                  "q10_original_009_note_018",

                expression:
                  "location information",

                meaning:
                  "位置情報",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_019",

                expression:
                  "emergency worker",

                meaning:
                  "救助・緊急対応を行う人",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_020",

                expression:
                  "assistance is needed",

                meaning:
                  "支援が必要である",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s9",

            en:
              "Smartphones, however, cannot always be depended on during an emergency.",

            ja:
              "しかし、緊急時にスマートフォンを常に頼りにできるとは限りません。",

            notes: [
              {
                id:
                  "q10_original_009_note_021",

                expression:
                  "depend on",

                meaning:
                  "～を頼りにする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_022",

                expression:
                  "during an emergency",

                meaning:
                  "緊急時に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s10",

            en:
              "A power failure may prevent people from charging their devices.",

            ja:
              "停電によって、端末を充電できなくなる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_009_note_023",

                expression:
                  "power failure",

                meaning:
                  "停電",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_024",

                expression:
                  "prevent A from doing",

                meaning:
                  "Aが～するのを妨げる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_025",

                expression:
                  "charge a device",

                meaning:
                  "端末を充電する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Communication networks may become crowded or stop working after a major disaster.",

            ja:
              "大きな災害の後には、通信網が混雑したり、機能しなくなったりする場合があります。",

            notes: [
              {
                id:
                  "q10_original_009_note_026",

                expression:
                  "communication network",

                meaning:
                  "通信網",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_027",

                expression:
                  "become crowded",

                meaning:
                  "混雑する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_028",

                expression:
                  "major disaster",

                meaning:
                  "大規模な災害",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Some people may also have difficulty using emergency applications, especially if they are unfamiliar with smartphones.",

            ja:
              "特にスマートフォンの操作に慣れていない人は、災害用アプリの利用が難しい場合もあります。",

            notes: [
              {
                id:
                  "q10_original_009_note_029",

                expression:
                  "have difficulty doing",

                meaning:
                  "～するのが難しい",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_030",

                expression:
                  "be unfamiliar with",

                meaning:
                  "～に慣れていない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "{{c}}, people should prepare other ways to receive information and contact others.",

            ja:
              "それでも、人々は情報を得たり、他の人と連絡を取ったりする別の方法を準備しておくべきです。",

            notes: [
              {
                id:
                  "q10_original_009_note_031",

                expression:
                  "even so",

                meaning:
                  "それでも、それにもかかわらず",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_032",

                expression:
                  "prepare another way to do",

                meaning:
                  "～する別の方法を準備する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_033",

                expression:
                  "contact others",

                meaning:
                  "他の人と連絡を取る",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s14",

            en:
              "Another problem is that false information can spread quickly online.",

            ja:
              "もう一つの問題は、誤った情報がインターネット上で急速に広がる可能性があることです。",

            notes: [
              {
                id:
                  "q10_original_009_note_034",

                expression:
                  "false information",

                meaning:
                  "誤った情報",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_035",

                expression:
                  "spread quickly",

                meaning:
                  "急速に広がる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "An old photograph or message may be shared as if it described the current situation.",

            ja:
              "古い写真やメッセージが、現在の状況を示しているかのように共有される場合があります。",

            notes: [
              {
                id:
                  "q10_original_009_note_036",

                expression:
                  "as if",

                meaning:
                  "まるで～であるかのように",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_037",

                expression:
                  "current situation",

                meaning:
                  "現在の状況",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "Before sharing emergency information, users should check the date and the organization that produced it.",

            ja:
              "災害情報を共有する前に、利用者は日付と、その情報を発信した組織を確認するべきです。",

            notes: [
              {
                id:
                  "q10_original_009_note_038",

                expression:
                  "before doing",

                meaning:
                  "～する前に",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_039",

                expression:
                  "produce information",

                meaning:
                  "情報を作成・発信する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "They should also compare the message with information from an official {{e}}.",

            ja:
              "また、そのメッセージを公的な情報源からの情報と比較するべきです。",

            notes: [
              {
                id:
                  "q10_original_009_note_040",

                expression:
                  "compare A with B",

                meaning:
                  "AをBと比較する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_041",

                expression:
                  "official source",

                meaning:
                  "公的な情報源、公式情報源",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "People should keep a portable battery, a radio, and a written list of important phone numbers {{d}} their smartphone cannot be used.",

            ja:
              "スマートフォンが使えない場合に備えて、携帯用バッテリー、ラジオ、重要な電話番号を書いた一覧を用意しておくべきです。",

            notes: [
              {
                id:
                  "q10_original_009_note_042",

                expression:
                  "portable battery",

                meaning:
                  "携帯用バッテリー",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_043",

                expression:
                  "a written list of",

                meaning:
                  "～を書いた一覧",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_044",

                expression:
                  "in case",

                meaning:
                  "～の場合に備えて",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Smartphones are valuable during disasters, but they are most effective when they are used as one part of a wider emergency plan.",

            ja:
              "スマートフォンは災害時に役立ちますが、より広い防災計画の一部として使われるときに、最も効果を発揮します。",

            notes: [
              {
                id:
                  "q10_original_009_note_045",

                expression:
                  "be valuable during",

                meaning:
                  "～の際に役立つ、価値がある",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_046",

                expression:
                  "be effective",

                meaning:
                  "効果的である",

                weakEligible: true
              },

              {
                id:
                  "q10_original_009_note_047",

                expression:
                  "a wider emergency plan",

                meaning:
                  "より広い防災計画",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "cancel"
          },

          {
            id: "a2",
            text: "receive"
          },

          {
            id: "a3",
            text: "repair"
          },

          {
            id: "a4",
            text: "return"
          }
        ],

        answer: "a2",

        explanation:
          "テレビやラジオが近くになくても、スマートフォンで警報を受け取れるという内容です。receive an alertで「警報を受け取る」という意味になります。",

        wrongChoiceReasons: {
          a1:
            "cancel an alertでは「警報を取り消す」という意味になり、利用者が情報を得るという内容に合いません。",

          a3:
            "repair an alertでは「警報を修理する」という不自然な意味になります。",

          a4:
            "return an alertでは「警報を返す」という意味になり、文脈に合いません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "enable"
          },

          {
            id: "b2",
            text: "expect"
          },

          {
            id: "b3",
            text: "finish"
          },

          {
            id: "b4",
            text: "suggest"
          }
        ],

        answer: "b1",

        explanation:
          "メッセージサービスによって、利用者が自分の安全を知らせられるようになるという内容です。enable A to doで「Aが～することを可能にする」という構文になります。",

        wrongChoiceReasons: {
          b2:
            "expect A to doは「Aが～すると期待する」という意味ですが、サービスが利用者に期待する内容ではありません。",

          b3:
            "finishの後ろに、人＋to不定詞を続けることはできません。",

          b4:
            "suggestはsuggest A to doの形では通常使いません。また、安全を知らせるよう提案する内容でもありません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "Even so"
          },

          {
            id: "c2",
            text: "For example"
          },

          {
            id: "c3",
            text: "In addition"
          },

          {
            id: "c4",
            text: "Similarly"
          }
        ],

        answer: "c1",

        explanation:
          "前では、停電や通信障害などによりスマートフォンを使えない場合があると述べています。それでも、別の情報取得手段を準備すべきだと話を続けているため、Even soが適切です。",

        wrongChoiceReasons: {
          c2:
            "後ろの文は、停電や通信障害の具体例ではなく、それらを受けた対応策です。",

          c3:
            "単純に別の問題点を追加しているのではなく、問題があっても準備が必要だと述べています。",

          c4:
            "前後で似た内容を並べているのではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "as soon as"
          },

          {
            id: "d2",
            text: "even though"
          },

          {
            id: "d3",
            text: "in case"
          },

          {
            id: "d4",
            text: "so that"
          }
        ],

        answer: "d3",

        explanation:
          "スマートフォンが使えない場合に備えて、携帯用バッテリーやラジオなどを準備するという内容です。in caseは「～の場合に備えて」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "as soon asでは「スマートフォンが使えなくなるとすぐに」という意味になり、事前に準備する内容に合いません。",

          d2:
            "even thoughでは「スマートフォンが使えないにもかかわらず」という逆接になり、備えの目的を表せません。",

          d4:
            "so thatの後ろには通常、目的を表す文が続きますが、ここでは使えない場合への備えを表しています。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "cause"
          },

          {
            id: "e2",
            text: "method"
          },

          {
            id: "e3",
            text: "result"
          },

          {
            id: "e4",
            text: "source"
          }
        ],

        answer: "e4",

        explanation:
          "災害情報が正しいかを確かめるため、公的な情報源からの情報と比較するという内容です。official sourceで「公的な情報源、公式情報源」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "official causeでは「公的な原因」という不自然な意味になり、情報を発信した場所を表せません。",

          e2:
            "official methodでは「公式の方法」という意味になりますが、ここでは情報の出所について述べています。",

          e3:
            "official resultでは「公式の結果」という意味になり、情報を比較する対象として不自然です。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 10
  // Digital Tickets and Paper Tickets
  // =========================================================
  {
    id: "q10_original_010",
    number: 10,
    sourceType: "original",

    title: "Digital Tickets and Paper Tickets",
    titleJa: "電子チケットと紙のチケット",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Digital tickets are becoming common on trains, at concerts, and in many other places.",

            ja:
              "電子チケットは、電車、コンサート、その他の多くの場所で一般的になっています。",

            notes: [
              {
                id:
                  "q10_original_010_note_001",

                expression:
                  "digital ticket",

                meaning:
                  "電子チケット",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_002",

                expression:
                  "become common",

                meaning:
                  "一般的になる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Instead of receiving a printed ticket, a customer may receive a code on a smartphone.",

            ja:
              "印刷されたチケットを受け取る代わりに、利用者がスマートフォン上でコードを受け取る場合があります。",

            notes: [
              {
                id:
                  "q10_original_010_note_003",

                expression:
                  "instead of doing",

                meaning:
                  "～する代わりに",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_004",

                expression:
                  "printed ticket",

                meaning:
                  "印刷されたチケット",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_005",

                expression:
                  "receive a code",

                meaning:
                  "コードを受け取る",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "The code is checked at an entrance or ticket gate before the customer is allowed to enter.",

            ja:
              "利用者が入場を許可される前に、そのコードが入口や改札口で確認されます。",

            notes: [
              {
                id:
                  "q10_original_010_note_006",

                expression:
                  "ticket gate",

                meaning:
                  "改札口",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_007",

                expression:
                  "be allowed to do",

                meaning:
                  "～することを許可される",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "People can {{a}} several tickets on one device without carrying separate pieces of paper.",

            ja:
              "人々は、別々の紙を持ち歩かなくても、一つの端末に複数のチケットを保存できます。",

            notes: [
              {
                id:
                  "q10_original_010_note_008",

                expression:
                  "store A on B",

                meaning:
                  "AをBに保存する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_009",

                expression:
                  "several tickets",

                meaning:
                  "複数のチケット",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_010",

                expression:
                  "a separate piece of paper",

                meaning:
                  "別々の一枚の紙",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Digital tickets can offer convenience to both customers and businesses.",

            ja:
              "電子チケットは、利用者と事業者の両方に利便性をもたらします。",

            notes: [
              {
                id:
                  "q10_original_010_note_011",

                expression:
                  "offer convenience to",

                meaning:
                  "～に利便性をもたらす",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_012",

                expression:
                  "both A and B",

                meaning:
                  "AとBの両方",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Customers can often buy tickets at any time without visiting a ticket office.",

            ja:
              "利用者は、チケット売り場へ行かずに、いつでもチケットを購入できる場合が多くあります。",

            notes: [
              {
                id:
                  "q10_original_010_note_013",

                expression:
                  "at any time",

                meaning:
                  "いつでも",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_014",

                expression:
                  "ticket office",

                meaning:
                  "チケット売り場",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "If their plans change, some services allow them to change or cancel a booking online.",

            ja:
              "予定が変わった場合、オンラインで予約を変更したり取り消したりできるサービスもあります。",

            notes: [
              {
                id:
                  "q10_original_010_note_015",

                expression:
                  "change one's plans",

                meaning:
                  "予定を変更する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_016",

                expression:
                  "cancel a booking",

                meaning:
                  "予約を取り消す",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Businesses may also save money because they do not need to print and deliver as many paper tickets.",

            ja:
              "また、事業者は多くの紙のチケットを印刷して配送する必要がないため、費用を節約できる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_010_note_017",

                expression:
                  "save money",

                meaning:
                  "費用を節約する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_018",

                expression:
                  "as many A",

                meaning:
                  "同じほど多くのA",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "For these reasons, many customers may {{b}} digital tickets to paper ones.",

            ja:
              "こうした理由から、多くの利用者は紙のチケットより電子チケットを好むかもしれません。",

            notes: [
              {
                id:
                  "q10_original_010_note_019",

                expression:
                  "prefer A to B",

                meaning:
                  "BよりAを好む",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_020",

                expression:
                  "for these reasons",

                meaning:
                  "こうした理由から",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "{{c}}, paper tickets do not depend on a working electronic device.",

            ja:
              "これに対して、紙のチケットは、正常に動く電子機器を必要としません。",

            notes: [
              {
                id:
                  "q10_original_010_note_021",

                expression:
                  "by contrast",

                meaning:
                  "これに対して、対照的に",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_022",

                expression:
                  "depend on",

                meaning:
                  "～に頼る、～を必要とする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_023",

                expression:
                  "a working device",

                meaning:
                  "正常に動く機器",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "A smartphone battery may run out just before a traveler reaches a station or an event site.",

            ja:
              "旅行者が駅やイベント会場に到着する直前に、スマートフォンの電池が切れる場合があります。",

            notes: [
              {
                id:
                  "q10_original_010_note_024",

                expression:
                  "run out",

                meaning:
                  "なくなる、切れる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_025",

                expression:
                  "just before",

                meaning:
                  "～する直前に",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_026",

                expression:
                  "event site",

                meaning:
                  "イベント会場",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "A damaged screen or a poor Internet connection may prevent a digital ticket from being displayed.",

            ja:
              "画面の故障や不安定なインターネット接続によって、電子チケットを表示できなくなる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_010_note_027",

                expression:
                  "damaged screen",

                meaning:
                  "故障した画面",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_028",

                expression:
                  "prevent A from doing",

                meaning:
                  "Aが～するのを妨げる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_029",

                expression:
                  "be displayed",

                meaning:
                  "表示される",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "In such cases, a person may be {{d}} to prove that a ticket has already been purchased.",

            ja:
              "そのような場合、すでにチケットを購入したことを証明できない場合があります。",

            notes: [
              {
                id:
                  "q10_original_010_note_030",

                expression:
                  "in such cases",

                meaning:
                  "そのような場合には",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_031",

                expression:
                  "be unable to do",

                meaning:
                  "～することができない",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_032",

                expression:
                  "prove that",

                meaning:
                  "～であることを証明する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_033",

                expression:
                  "purchase a ticket",

                meaning:
                  "チケットを購入する",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s14",

            en:
              "Digital tickets may also be difficult for people who are not comfortable using smartphones.",

            ja:
              "電子チケットは、スマートフォンの利用に慣れていない人にとって難しい場合もあります。",

            notes: [
              {
                id:
                  "q10_original_010_note_034",

                expression:
                  "be comfortable doing",

                meaning:
                  "～することに抵抗がない、慣れている",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "Some users may not own a smartphone, while others may need help downloading an application or finding a ticket on the screen.",

            ja:
              "スマートフォンを所有していない利用者もいれば、アプリをダウンロードしたり、画面上でチケットを見つけたりするのに助けが必要な利用者もいます。",

            notes: [
              {
                id:
                  "q10_original_010_note_035",

                expression:
                  "some A, while others B",

                meaning:
                  "Aする人もいれば、一方でBする人もいる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_036",

                expression:
                  "need help doing",

                meaning:
                  "～するのに助けが必要である",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_037",

                expression:
                  "download an application",

                meaning:
                  "アプリをダウンロードする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "Ticket providers should therefore give clear instructions and offer support when problems occur.",

            ja:
              "したがって、チケットの提供者は、明確な説明を示し、問題が起きたときには支援を提供するべきです。",

            notes: [
              {
                id:
                  "q10_original_010_note_038",

                expression:
                  "ticket provider",

                meaning:
                  "チケットの提供者、発行事業者",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_039",

                expression:
                  "give clear instructions",

                meaning:
                  "明確な説明を示す",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_040",

                expression:
                  "offer support",

                meaning:
                  "支援を提供する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "They may also need to keep paper tickets or another method available for customers who cannot use a digital system.",

            ja:
              "また、電子システムを利用できない客のために、紙のチケットや別の方法を利用できる状態にしておく必要もあります。",

            notes: [
              {
                id:
                  "q10_original_010_note_041",

                expression:
                  "keep A available",

                meaning:
                  "Aを利用できる状態にしておく",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_042",

                expression:
                  "digital system",

                meaning:
                  "電子システム",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "The most useful ticket system may be one that works well for customers {{e}} they choose a digital ticket or a paper one.",

            ja:
              "最も役立つチケット制度は、利用者が電子チケットと紙のチケットのどちらを選んでも、うまく利用できる制度なのかもしれません。",

            notes: [
              {
                id:
                  "q10_original_010_note_043",

                expression:
                  "whether A or B",

                meaning:
                  "AであろうとBであろうと、AかBかにかかわらず",

                weakEligible: true
              },

              {
                id:
                  "q10_original_010_note_044",

                expression:
                  "work well for",

                meaning:
                  "～にとってうまく機能する",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "borrow"
          },

          {
            id: "a2",
            text: "hide"
          },

          {
            id: "a3",
            text: "store"
          },

          {
            id: "a4",
            text: "throw"
          }
        ],

        answer: "a3",

        explanation:
          "複数の電子チケットを一つの端末内に保存できるという内容です。store A on Bで「AをBに保存する」という意味になります。",

        wrongChoiceReasons: {
          a1:
            "チケットを端末上で借りるという内容ではありません。",

          a2:
            "チケットを隠すのではなく、必要なときに表示できるよう保存するという内容です。",

          a4:
            "throwは「投げる、捨てる」という意味で、端末上のチケットには使えません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "compare"
          },

          {
            id: "b2",
            text: "prefer"
          },

          {
            id: "b3",
            text: "protect"
          },

          {
            id: "b4",
            text: "replace"
          }
        ],

        answer: "b2",

        explanation:
          "購入や変更の便利さから、利用者が紙のチケットより電子チケットを好むという内容です。prefer A to Bで「BよりAを好む」という構文になります。",

        wrongChoiceReasons: {
          b1:
            "compare A to Bなら「AをBにたとえる」または比較するという意味ですが、利用者の好みを述べる文ではありません。",

          b3:
            "protect A from Bなどの形で使われます。protect digital tickets to paper onesとはできません。",

          b4:
            "replace A with Bが一般的な形です。replace A to Bとはできず、ここでは置き換えではなく好みを述べています。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "By contrast"
          },

          {
            id: "c2",
            text: "For example"
          },

          {
            id: "c3",
            text: "In addition"
          },

          {
            id: "c4",
            text: "Therefore"
          }
        ],

        answer: "c1",

        explanation:
          "前の段落では電子チケットの利便性が述べられています。ここでは、それとは対照的に、紙のチケットは電子機器に頼らなくてよいという特徴を述べているため、By contrastが適切です。",

        wrongChoiceReasons: {
          c2:
            "紙のチケットは、電子チケットの利便性を示す具体例ではありません。",

          c3:
            "電子チケットの利点を追加しているのではなく、紙のチケットとの違いを示しています。",

          c4:
            "紙のチケットが電子機器を必要としないことは、前の内容から導かれる結果ではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "unable"
          },

          {
            id: "d2",
            text: "unfair"
          },

          {
            id: "d3",
            text: "unusual"
          },

          {
            id: "d4",
            text: "unwilling"
          }
        ],

        answer: "d1",

        explanation:
          "画面の故障や通信の問題によって、チケットを購入したことを証明できない場合があるという内容です。be unable to doで「～することができない」という意味になります。",

        wrongChoiceReasons: {
          d2:
            "unfairは「不公平な」という意味で、to不定詞を伴って能力を表すことはできません。",

          d3:
            "be unusual to doでは「～することは珍しい」という意味になり、利用者が証明できないという内容にはなりません。",

          d4:
            "be unwilling to doは「～する気がない」という意味です。証明したくないのではなく、機器の問題で証明できないという内容です。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "because"
          },

          {
            id: "e2",
            text: "until"
          },

          {
            id: "e3",
            text: "whether"
          },

          {
            id: "e4",
            text: "while"
          }
        ],

        answer: "e3",

        explanation:
          "利用者が電子チケットを選ぶ場合でも、紙のチケットを選ぶ場合でも、うまく利用できる制度が望ましいという内容です。whether A or Bで「AであろうとBであろうと」「AかBかにかかわらず」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "becauseでは、チケットを選ぶことが制度が機能する理由になってしまいます。",

          e2:
            "untilでは「電子チケットか紙のチケットを選ぶまで」という意味になり、文脈に合いません。",

          e4:
            "whileには「～する間」や「一方で」という意味がありますが、二つの選択肢のどちらでもよいという意味は表せません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 11
  // Online Maps and the Ability to Find One’s Way
  // =========================================================
  {
    id: "q10_original_011",
    number: 11,
    sourceType: "original",

    title: "Online Maps and the Ability to Find One’s Way",
    titleJa: "オンライン地図と道を覚える力",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Online maps have changed the way people travel through unfamiliar places.",

            ja:
              "オンライン地図は、人々が不慣れな場所を移動する方法を変えました。",

            notes: [
              {
                id:
                  "q10_original_011_note_001",

                expression:
                  "online map",

                meaning:
                  "オンライン地図",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_002",

                expression:
                  "the way A does",

                meaning:
                  "Aが～する方法",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_003",

                expression:
                  "unfamiliar place",

                meaning:
                  "不慣れな場所",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "A smartphone can show a user's present location and suggest a route to a destination.",

            ja:
              "スマートフォンは、利用者の現在地を表示し、目的地までの経路を提案できます。",

            notes: [
              {
                id:
                  "q10_original_011_note_004",

                expression:
                  "present location",

                meaning:
                  "現在地",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_005",

                expression:
                  "suggest a route",

                meaning:
                  "経路を提案する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_006",

                expression:
                  "destination",

                meaning:
                  "目的地",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "The application may also provide information about traffic, train delays, and nearby buildings.",

            ja:
              "そのアプリは、交通状況、電車の遅延、近くの建物に関する情報も提供する場合があります。",

            notes: [
              {
                id:
                  "q10_original_011_note_007",

                expression:
                  "provide information about",

                meaning:
                  "～についての情報を提供する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_008",

                expression:
                  "train delay",

                meaning:
                  "電車の遅延",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_009",

                expression:
                  "nearby building",

                meaning:
                  "近くの建物",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "By listening to spoken instructions, users can {{a}} directions without repeatedly looking at the screen.",

            ja:
              "音声による指示を聞くことで、利用者は何度も画面を見なくても道案内に従うことができます。",

            notes: [
              {
                id:
                  "q10_original_011_note_010",

                expression:
                  "spoken instruction",

                meaning:
                  "音声による指示",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_011",

                expression:
                  "follow directions",

                meaning:
                  "道案内や指示に従う",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_012",

                expression:
                  "repeatedly",

                meaning:
                  "繰り返し、何度も",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "These services are useful for travelers and people visiting a place for the first time.",

            ja:
              "こうしたサービスは、旅行者や初めてその場所を訪れる人にとって役立ちます。",

            notes: [
              {
                id:
                  "q10_original_011_note_013",

                expression:
                  "for the first time",

                meaning:
                  "初めて",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "They can {{b}} users reach a destination more quickly and with less stress.",

            ja:
              "オンライン地図は、利用者がより速く、より少ない不安で目的地に到着するのを助けることができます。",

            notes: [
              {
                id:
                  "q10_original_011_note_014",

                expression:
                  "help A do",

                meaning:
                  "Aが～するのを助ける",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_015",

                expression:
                  "reach a destination",

                meaning:
                  "目的地に到着する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_016",

                expression:
                  "with less stress",

                meaning:
                  "より少ない不安や負担で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "A map can quickly offer another route when a road is closed or a train service is stopped.",

            ja:
              "道路が通行止めになったり、電車の運行が止まったりしたとき、地図は別の経路をすぐに示すことができます。",

            notes: [
              {
                id:
                  "q10_original_011_note_017",

                expression:
                  "offer another route",

                meaning:
                  "別の経路を示す",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_018",

                expression:
                  "a road is closed",

                meaning:
                  "道路が通行止めになっている",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_019",

                expression:
                  "train service",

                meaning:
                  "電車の運行",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Location sharing can also make it easier for friends or family members to meet one another.",

            ja:
              "位置情報の共有によって、友人や家族がお互いに会いやすくなる場合もあります。",

            notes: [
              {
                id:
                  "q10_original_011_note_020",

                expression:
                  "location sharing",

                meaning:
                  "位置情報の共有",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_021",

                expression:
                  "make it easier for A to do",

                meaning:
                  "Aが～することを容易にする",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s9",

            en:
              "However, following automatic directions does not always require users to understand the area around them.",

            ja:
              "しかし、自動案内に従うとき、利用者が周辺地域を理解する必要があるとは限りません。",

            notes: [
              {
                id:
                  "q10_original_011_note_022",

                expression:
                  "automatic directions",

                meaning:
                  "自動の道案内",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_023",

                expression:
                  "the area around A",

                meaning:
                  "Aの周辺地域",

                weakEligible: true
              }
            ]
          },

          {
            id: "s10",

            en:
              "A person may concentrate only on the next instruction, such as turning left at a particular street.",

            ja:
              "人は、特定の通りで左に曲がるといった、次の指示だけに集中することがあります。",

            notes: [
              {
                id:
                  "q10_original_011_note_024",

                expression:
                  "concentrate on",

                meaning:
                  "～に集中する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_025",

                expression:
                  "turn left",

                meaning:
                  "左に曲がる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_026",

                expression:
                  "a particular street",

                meaning:
                  "特定の通り",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "The person may pay little attention to landmarks, street names, or the general direction of travel.",

            ja:
              "その人は、目印、通りの名前、移動している大まかな方向に、ほとんど注意を払わないかもしれません。",

            notes: [
              {
                id:
                  "q10_original_011_note_027",

                expression:
                  "pay little attention to",

                meaning:
                  "～にほとんど注意を払わない",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_028",

                expression:
                  "landmark",

                meaning:
                  "目印となる建物や場所",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_029",

                expression:
                  "general direction",

                meaning:
                  "大まかな方向",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "{{c}}, the route may be difficult to remember after the journey is over.",

            ja:
              "その結果、移動が終わった後、その経路を思い出すことが難しくなる場合があります。",

            notes: [
              {
                id:
                  "q10_original_011_note_030",

                expression:
                  "as a result",

                meaning:
                  "その結果",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_031",

                expression:
                  "be difficult to remember",

                meaning:
                  "覚えることが難しい",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_032",

                expression:
                  "after the journey is over",

                meaning:
                  "移動が終わった後に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "If the phone later loses power, the user may not know how to return without assistance.",

            ja:
              "その後スマートフォンの電池が切れると、利用者は助けなしでは戻り方が分からないかもしれません。",

            notes: [
              {
                id:
                  "q10_original_011_note_033",

                expression:
                  "lose power",

                meaning:
                  "電池が切れる、電力を失う",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_034",

                expression:
                  "without assistance",

                meaning:
                  "助けなしで",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s14",

            en:
              "This does not mean that people should stop using online maps.",

            ja:
              "これは、人々がオンライン地図の利用をやめるべきだという意味ではありません。",

            notes: [
              {
                id:
                  "q10_original_011_note_035",

                expression:
                  "This does not mean that",

                meaning:
                  "これは～という意味ではない",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_036",

                expression:
                  "stop doing",

                meaning:
                  "～することをやめる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "Instead, users can combine digital guidance with careful observation of their surroundings.",

            ja:
              "その代わりに、利用者は電子的な案内と周囲の注意深い観察を組み合わせることができます。",

            notes: [
              {
                id:
                  "q10_original_011_note_037",

                expression:
                  "combine A with B",

                meaning:
                  "AとBを組み合わせる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_038",

                expression:
                  "careful observation",

                meaning:
                  "注意深い観察",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_039",

                expression:
                  "surroundings",

                meaning:
                  "周囲の環境",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "They can notice major landmarks, check street names, and think about the direction in which they are moving.",

            ja:
              "主な目印を確認し、通りの名前を見て、自分が進んでいる方向について考えることができます。",

            notes: [
              {
                id:
                  "q10_original_011_note_040",

                expression:
                  "major landmark",

                meaning:
                  "主な目印",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_041",

                expression:
                  "the direction in which",

                meaning:
                  "～する方向",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "People who actively observe the area are more {{d}} to recognize the same place later.",

            ja:
              "積極的に周辺を観察する人は、後で同じ場所に気づく可能性がより高くなります。",

            notes: [
              {
                id:
                  "q10_original_011_note_042",

                expression:
                  "actively observe",

                meaning:
                  "積極的に観察する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_043",

                expression:
                  "be likely to do",

                meaning:
                  "～する可能性が高い",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_044",

                expression:
                  "recognize the same place",

                meaning:
                  "同じ場所だと気づく",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "The more people depend only on automatic guidance, the {{e}} attention they may pay to the area itself.",

            ja:
              "自動案内だけに頼れば頼るほど、周辺そのものに払う注意は少なくなる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_011_note_045",

                expression:
                  "the more A, the less B",

                meaning:
                  "Aすればするほど、Bは少なくなる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_046",

                expression:
                  "depend only on",

                meaning:
                  "～だけに頼る",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_047",

                expression:
                  "the area itself",

                meaning:
                  "その地域そのもの",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Online maps are most helpful when they support people's sense of direction rather than completely replacing it.",

            ja:
              "オンライン地図は、人々の方向感覚に完全に取って代わるのではなく、それを支えるときに最も役立ちます。",

            notes: [
              {
                id:
                  "q10_original_011_note_048",

                expression:
                  "sense of direction",

                meaning:
                  "方向感覚",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_049",

                expression:
                  "rather than doing",

                meaning:
                  "～するのではなく",

                weakEligible: true
              },

              {
                id:
                  "q10_original_011_note_050",

                expression:
                  "completely replace",

                meaning:
                  "完全に取って代わる",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "follow"
          },

          {
            id: "a2",
            text: "hide"
          },

          {
            id: "a3",
            text: "measure"
          },

          {
            id: "a4",
            text: "refuse"
          }
        ],

        answer: "a1",

        explanation:
          "音声による道案内を聞き、その指示どおりに進むという内容です。follow directionsで「道案内や指示に従う」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "hide directionsでは「道案内を隠す」という意味になり、利用者の行動を表しません。",

          a3:
            "measure directionsでは「方向を測る」という不自然な意味になります。",

          a4:
            "refuse directionsでは「道案内を拒否する」という意味になり、案内を利用する文脈と反対です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "help"
          },

          {
            id: "b2",
            text: "keep"
          },

          {
            id: "b3",
            text: "order"
          },

          {
            id: "b4",
            text: "prevent"
          }
        ],

        answer: "b1",

        explanation:
          "オンライン地図によって、利用者が目的地へより速く到着できるという内容です。help A doで「Aが～するのを助ける」という構文になります。",

        wrongChoiceReasons: {
          b2:
            "keep A doingなら「Aに～させ続ける」という形ですが、keep users reachとはできません。",

          b3:
            "order A to doなら「Aに～するよう命令する」という意味ですが、toが必要です。また、地図が利用者に命令する内容でもありません。",

          b4:
            "prevent A from doingの形が必要です。prevent users reachとはできず、意味も目的地への到着を妨げることになります。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "As a result"
          },

          {
            id: "c2",
            text: "By contrast"
          },

          {
            id: "c3",
            text: "For example"
          },

          {
            id: "c4",
            text: "In addition"
          }
        ],

        answer: "c1",

        explanation:
          "目印や通りの名前、移動方向にほとんど注意を払わない結果として、後で経路を思い出しにくくなると述べています。そのため、As a resultが適切です。",

        wrongChoiceReasons: {
          c2:
            "前後の二つの内容を対比しているのではなく、原因と結果を示しています。",

          c3:
            "後ろの文は、注意を払わないことの具体例ではなく、その結果です。",

          c4:
            "別の情報を追加しているのではなく、前の内容から生じる結果を述べています。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "afraid"
          },

          {
            id: "d2",
            text: "likely"
          },

          {
            id: "d3",
            text: "ready"
          },

          {
            id: "d4",
            text: "sorry"
          }
        ],

        answer: "d2",

        explanation:
          "周辺を積極的に観察した人は、後で同じ場所だと気づく可能性が高いという内容です。be likely to doで「～する可能性が高い」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "be afraid to doは「～することを恐れる」という意味で、場所に気づく可能性を表しません。",

          d3:
            "be ready to doは「～する準備ができている」という意味で、観察による認識の可能性を表しません。",

          d4:
            "be sorry to doは「～して残念に思う」という意味で、この文脈には合いません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "equal"
          },

          {
            id: "e2",
            text: "full"
          },

          {
            id: "e3",
            text: "less"
          },

          {
            id: "e4",
            text: "more"
          }
        ],

        answer: "e3",

        explanation:
          "自動案内だけに頼る程度が大きくなるほど、周囲に向ける注意が少なくなるという反比例の関係です。the more A, the less Bで「Aすればするほど、Bは少なくなる」という構文になります。",

        wrongChoiceReasons: {
          e1:
            "equal attentionでは「同じ量の注意」となりますが、the moreとの相関比較を作れません。",

          e2:
            "full attentionは「十分な注意」という表現ですが、the more A, the full Bという構文にはなりません。",

          e4:
            "the more A, the more Bという構文自体は成立しますが、自動案内だけに頼るほど周囲への注意が増えるという、本文と反対の意味になります。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 12
  // Technology for Helping Older People
  // =========================================================
  {
    id: "q10_original_012",
    number: 12,
    sourceType: "original",

    title: "Technology for Helping Older People",
    titleJa: "高齢者を支援する技術",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "As populations grow older, many communities are looking for ways to support older people in their daily lives.",

            ja:
              "人口の高齢化が進む中、多くの地域が高齢者の日常生活を支援する方法を探しています。",

            notes: [
              {
                id:
                  "q10_original_012_note_001",

                expression:
                  "population grows older",

                meaning:
                  "人口の高齢化が進む",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_002",

                expression:
                  "look for ways to do",

                meaning:
                  "～する方法を探す",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_003",

                expression:
                  "in one's daily life",

                meaning:
                  "日常生活の中で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Some older adults want to continue living in their own homes rather than move to care facilities.",

            ja:
              "高齢者の中には、介護施設へ移るのではなく、自宅で暮らし続けたいと考える人もいます。",

            notes: [
              {
                id:
                  "q10_original_012_note_004",

                expression:
                  "continue doing",

                meaning:
                  "～し続ける",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_005",

                expression:
                  "one's own home",

                meaning:
                  "自分自身の家、自宅",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_006",

                expression:
                  "care facility",

                meaning:
                  "介護施設",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "However, they may need help with medicine, communication, shopping, or household safety.",

            ja:
              "しかし、服薬、連絡、買い物、家庭内の安全などについて、支援が必要になる場合があります。",

            notes: [
              {
                id:
                  "q10_original_012_note_007",

                expression:
                  "need help with",

                meaning:
                  "～について助けを必要とする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_008",

                expression:
                  "household safety",

                meaning:
                  "家庭内の安全",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "New devices are being developed to provide assistance while allowing users to remain independent.",

            ja:
              "利用者が自立した生活を続けながら支援を受けられるように、新しい機器が開発されています。",

            notes: [
              {
                id:
                  "q10_original_012_note_009",

                expression:
                  "be developed to do",

                meaning:
                  "～するために開発される",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_010",

                expression:
                  "provide assistance",

                meaning:
                  "支援を提供する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_011",

                expression:
                  "remain independent",

                meaning:
                  "自立した状態を保つ",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Technology can support older people in several practical ways.",

            ja:
              "技術は、いくつかの実用的な方法で高齢者を支援できます。",

            notes: [
              {
                id:
                  "q10_original_012_note_012",

                expression:
                  "in a practical way",

                meaning:
                  "実用的な方法で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "A medicine application can {{a}} a user to take the correct medicine at the right time.",

            ja:
              "服薬アプリは、利用者に正しい薬を適切な時刻に飲むよう知らせることができます。",

            notes: [
              {
                id:
                  "q10_original_012_note_013",

                expression:
                  "remind A to do",

                meaning:
                  "Aに～するよう思い出させる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_014",

                expression:
                  "take medicine",

                meaning:
                  "薬を飲む",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_015",

                expression:
                  "at the right time",

                meaning:
                  "適切な時刻に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Voice-controlled devices let people turn on lights, make calls, or check the weather without using small buttons.",

            ja:
              "音声操作機器を使えば、小さなボタンを使わずに、照明をつけたり、電話をかけたり、天気を確認したりできます。",

            notes: [
              {
                id:
                  "q10_original_012_note_016",

                expression:
                  "voice-controlled device",

                meaning:
                  "音声操作機器",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_017",

                expression:
                  "let A do",

                meaning:
                  "Aに～させる、Aが～できるようにする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_018",

                expression:
                  "turn on",

                meaning:
                  "～の電源を入れる、～をつける",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Some homes have sensors that notice unusual movement or a lack of activity.",

            ja:
              "家庭によっては、普段と異なる動きや、活動がない状態を感知するセンサーがあります。",

            notes: [
              {
                id:
                  "q10_original_012_note_019",

                expression:
                  "unusual movement",

                meaning:
                  "普段と異なる動き",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_020",

                expression:
                  "a lack of activity",

                meaning:
                  "活動がないこと",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "The system may send a message to a family member or care worker {{b}} someone can check whether help is needed.",

            ja:
              "そのシステムは、支援が必要かどうかを誰かが確認できるように、家族や介護職員へメッセージを送る場合があります。",

            notes: [
              {
                id:
                  "q10_original_012_note_021",

                expression:
                  "so that A can do",

                meaning:
                  "Aが～できるように",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_022",

                expression:
                  "care worker",

                meaning:
                  "介護職員",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_023",

                expression:
                  "whether help is needed",

                meaning:
                  "支援が必要かどうか",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Such technology may increase both safety and independence.",

            ja:
              "このような技術は、安全性と自立性の両方を高める可能性があります。",

            notes: [
              {
                id:
                  "q10_original_012_note_024",

                expression:
                  "increase both A and B",

                meaning:
                  "AとBの両方を高める",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "It can also make some daily tasks less tiring for people with physical difficulties.",

            ja:
              "また、身体的な困難がある人にとって、日常の作業をそれほど疲れないものにできる場合があります。",

            notes: [
              {
                id:
                  "q10_original_012_note_025",

                expression:
                  "daily task",

                meaning:
                  "日常の作業",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_026",

                expression:
                  "physical difficulty",

                meaning:
                  "身体的な困難",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_027",

                expression:
                  "less tiring",

                meaning:
                  "それほど疲れない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "{{c}}, a person who has difficulty walking may order food or speak to a doctor from home.",

            ja:
              "例えば、歩くことが難しい人が、自宅から食べ物を注文したり、医師と話したりできる場合があります。",

            notes: [
              {
                id:
                  "q10_original_012_note_028",

                expression:
                  "for instance",

                meaning:
                  "例えば",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_029",

                expression:
                  "have difficulty doing",

                meaning:
                  "～することが難しい",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_030",

                expression:
                  "speak to a doctor",

                meaning:
                  "医師と話す、医師に相談する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "Regular online contact may also reduce feelings of loneliness among people who live by themselves.",

            ja:
              "定期的なオンラインでの交流は、一人暮らしの人が感じる孤独を軽減する可能性もあります。",

            notes: [
              {
                id:
                  "q10_original_012_note_031",

                expression:
                  "regular contact",

                meaning:
                  "定期的な交流、連絡",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_032",

                expression:
                  "reduce feelings of loneliness",

                meaning:
                  "孤独感を軽減する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_033",

                expression:
                  "live by oneself",

                meaning:
                  "一人で暮らす",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s14",

            en:
              "Despite these advantages, technology does not solve every problem.",

            ja:
              "こうした利点があるにもかかわらず、技術がすべての問題を解決するわけではありません。",

            notes: [
              {
                id:
                  "q10_original_012_note_034",

                expression:
                  "despite",

                meaning:
                  "～にもかかわらず",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_035",

                expression:
                  "solve every problem",

                meaning:
                  "すべての問題を解決する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "Some devices are expensive, and their use may require a reliable Internet connection.",

            ja:
              "機器によっては高価であり、使用するために安定したインターネット接続が必要になる場合があります。",

            notes: [
              {
                id:
                  "q10_original_012_note_036",

                expression:
                  "require a reliable connection",

                meaning:
                  "安定した接続を必要とする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "A useful device must be simple enough for its user to operate without confusion.",

            ja:
              "役立つ機器は、利用者が混乱せずに操作できるほど簡単でなければなりません。",

            notes: [
              {
                id:
                  "q10_original_012_note_037",

                expression:
                  "形容詞＋enough for A to do",

                meaning:
                  "Aが～できるほど…である",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_038",

                expression:
                  "operate a device",

                meaning:
                  "機器を操作する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_039",

                expression:
                  "without confusion",

                meaning:
                  "混乱せずに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Users should also understand what information is collected and who is able to see it.",

            ja:
              "また、利用者は、どのような情報が収集され、誰がそれを見ることができるのかを理解するべきです。",

            notes: [
              {
                id:
                  "q10_original_012_note_040",

                expression:
                  "collect information",

                meaning:
                  "情報を収集する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_041",

                expression:
                  "who is able to see it",

                meaning:
                  "誰がそれを見ることができるか",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Modern systems are often {{d}} of recording movement, voices, and personal health information.",

            ja:
              "現代のシステムは、動き、音声、個人の健康情報を記録できる場合が多くあります。",

            notes: [
              {
                id:
                  "q10_original_012_note_042",

                expression:
                  "be capable of doing",

                meaning:
                  "～する能力がある、～することができる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_043",

                expression:
                  "personal health information",

                meaning:
                  "個人の健康情報",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "This information could threaten a person's privacy if it were used carelessly.",

            ja:
              "この情報が不注意に利用されれば、個人のプライバシーを脅かす可能性があります。",

            notes: [
              {
                id:
                  "q10_original_012_note_044",

                expression:
                  "threaten one's privacy",

                meaning:
                  "人のプライバシーを脅かす",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_045",

                expression:
                  "be used carelessly",

                meaning:
                  "不注意に利用される",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Technology can help older people remain independent, {{e}} it is affordable, easy to use, and respectful of their privacy.",

            ja:
              "技術は、手頃な価格で、使いやすく、利用者のプライバシーを尊重するものであるならば、高齢者が自立した生活を続ける助けになります。",

            notes: [
              {
                id:
                  "q10_original_012_note_046",

                expression:
                  "provided that",

                meaning:
                  "～という条件で、～であるならば",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_047",

                expression:
                  "be affordable",

                meaning:
                  "手頃な価格である",

                weakEligible: true
              },

              {
                id:
                  "q10_original_012_note_048",

                expression:
                  "be respectful of",

                meaning:
                  "～を尊重する、～に配慮する",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "invite"
          },

          {
            id: "a2",
            text: "remind"
          },

          {
            id: "a3",
            text: "require"
          },

          {
            id: "a4",
            text: "warn"
          }
        ],

        answer: "a2",

        explanation:
          "服薬アプリが、利用者に決められた時刻に薬を飲むよう知らせるという内容です。remind A to doで「Aに～するよう思い出させる」という意味になります。",

        wrongChoiceReasons: {
          a1:
            "invite A to doは「Aを～するよう招く」という意味で、服薬を知らせる機能には合いません。",

          a3:
            "require A to doは「Aに～するよう要求する」という意味ですが、アプリが利用者に命令することが中心ではありません。",

          a4:
            "warn A to doは文脈によって使用できますが、危険について警告するのではなく、予定された服薬を思い出させる内容です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "as if"
          },

          {
            id: "b2",
            text: "even though"
          },

          {
            id: "b3",
            text: "so that"
          },

          {
            id: "b4",
            text: "unless"
          }
        ],

        answer: "b3",

        explanation:
          "家族や介護職員が支援の必要性を確認できるように、システムがメッセージを送るという目的を表しています。so that A can doで「Aが～できるように」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "as ifは「まるで～であるかのように」という意味で、メッセージを送る目的を表せません。",

          b2:
            "even thoughは「～にもかかわらず」という逆接で、前後の意味関係に合いません。",

          b4:
            "unlessは「～でない限り」という条件を表しますが、ここでは確認できるようにする目的が必要です。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For instance"
          },

          {
            id: "c2",
            text: "In contrast"
          },

          {
            id: "c3",
            text: "Nevertheless"
          },

          {
            id: "c4",
            text: "Otherwise"
          }
        ],

        answer: "c1",

        explanation:
          "技術が日常作業を助けるという内容に続いて、歩行が難しい人が食事を注文したり医師と話したりする具体例を示しています。そのため、For instanceが適切です。",

        wrongChoiceReasons: {
          c2:
            "後ろの文は前の内容と対照的ではなく、その具体例です。",

          c3:
            "前の内容に反することを述べているわけではありません。",

          c4:
            "Otherwiseは「そうでなければ」という意味ですが、条件に反した場合の結果を示していません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "capable"
          },

          {
            id: "d2",
            text: "certain"
          },

          {
            id: "d3",
            text: "familiar"
          },

          {
            id: "d4",
            text: "pleased"
          }
        ],

        answer: "d1",

        explanation:
          "現代のシステムには、動きや音声、健康情報を記録する能力があるという内容です。be capable of doingで「～する能力がある」「～することができる」という意味になります。",

        wrongChoiceReasons: {
          d2:
            "be certain of doingは「～することを確信している」という意味になり、機械の機能を表しません。",

          d3:
            "be familiar withが一般的な形です。be familiar of recordingとはできません。",

          d4:
            "be pleased withやbe pleased to doの形で使われます。be pleased of recordingとはできません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "as soon as"
          },

          {
            id: "e2",
            text: "provided that"
          },

          {
            id: "e3",
            text: "rather than"
          },

          {
            id: "e4",
            text: "so far"
          }
        ],

        answer: "e2",

        explanation:
          "技術が高齢者の自立を支援するためには、価格、使いやすさ、プライバシーへの配慮という条件が必要だと述べています。provided thatは「～という条件で」「～であるならば」という意味です。",

        wrongChoiceReasons: {
          e1:
            "as soon asは「～するとすぐに」という時間関係を表しますが、ここでは利用条件を述べています。",

          e3:
            "rather thanは「～ではなく」という比較・選択を表しますが、後ろには完全な条件節が続いています。",

          e4:
            "so farは「これまでのところ」という意味で、条件を導くことはできません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 13
  // Digital Notes or Paper Notes
  // =========================================================
  {
    id: "q10_original_013",
    number: 13,
    sourceType: "original",

    title: "Digital Notes or Paper Notes",
    titleJa: "デジタルノートと紙のノート",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Students now have several choices when they take notes in class.",

            ja:
              "現在、生徒には授業中にノートを取る際、いくつかの選択肢があります。",

            notes: [
              {
                id:
                  "q10_original_013_note_001",

                expression:
                  "have several choices",

                meaning:
                  "いくつかの選択肢がある",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_002",

                expression:
                  "take notes",

                meaning:
                  "ノートを取る",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Some use notebooks and pens, while others type on tablets or laptop computers.",

            ja:
              "ノートとペンを使う生徒もいれば、タブレットやノートパソコンに入力する生徒もいます。",

            notes: [
              {
                id:
                  "q10_original_013_note_003",

                expression:
                  "some A, while others B",

                meaning:
                  "Aする人もいれば、一方でBする人もいる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_004",

                expression:
                  "type on a tablet",

                meaning:
                  "タブレットに文字を入力する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Both methods can help learners record important information and review it later.",

            ja:
              "どちらの方法も、学習者が重要な情報を記録し、後で復習する助けになります。",

            notes: [
              {
                id:
                  "q10_original_013_note_005",

                expression:
                  "both methods",

                meaning:
                  "両方の方法",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_006",

                expression:
                  "record information",

                meaning:
                  "情報を記録する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_007",

                expression:
                  "review it later",

                meaning:
                  "後でそれを復習する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "However, the two methods offer different advantages and require different study habits.",

            ja:
              "しかし、二つの方法には異なる利点があり、必要となる学習習慣も異なります。",

            notes: [
              {
                id:
                  "q10_original_013_note_008",

                expression:
                  "offer different advantages",

                meaning:
                  "異なる利点をもたらす",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_009",

                expression:
                  "study habit",

                meaning:
                  "学習習慣",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Digital notes are easy to store, copy, and search.",

            ja:
              "デジタルノートは、保存、複製、検索が簡単です。",

            notes: [
              {
                id:
                  "q10_original_013_note_010",

                expression:
                  "be easy to do",

                meaning:
                  "～しやすい",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Students can {{a}} their files by subject, date, or topic.",

            ja:
              "生徒は、教科、日付、話題ごとにファイルを整理できます。",

            notes: [
              {
                id:
                  "q10_original_013_note_011",

                expression:
                  "organize files",

                meaning:
                  "ファイルを整理する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_012",

                expression:
                  "by subject",

                meaning:
                  "教科ごとに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "A search function allows them to find a particular word without reading every page again.",

            ja:
              "検索機能を使えば、すべてのページを読み直さなくても、特定の単語を見つけられます。",

            notes: [
              {
                id:
                  "q10_original_013_note_013",

                expression:
                  "search function",

                meaning:
                  "検索機能",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_014",

                expression:
                  "a particular word",

                meaning:
                  "特定の単語",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_015",

                expression:
                  "without doing",

                meaning:
                  "～せずに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Digital notes are also {{b}} group projects because several students can edit and share the same document.",

            ja:
              "また、複数の生徒が同じ文書を編集して共有できるため、デジタルノートはグループ活動に適しています。",

            notes: [
              {
                id:
                  "q10_original_013_note_016",

                expression:
                  "be suitable for",

                meaning:
                  "～に適している",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_017",

                expression:
                  "group project",

                meaning:
                  "グループ活動、共同課題",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_018",

                expression:
                  "edit and share",

                meaning:
                  "編集して共有する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "Photographs, charts, links, and sound recordings can be added to the notes when necessary.",

            ja:
              "必要に応じて、写真、図表、リンク、音声記録をノートに追加できます。",

            notes: [
              {
                id:
                  "q10_original_013_note_019",

                expression:
                  "sound recording",

                meaning:
                  "音声記録",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_020",

                expression:
                  "be added to",

                meaning:
                  "～に追加される",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_021",

                expression:
                  "when necessary",

                meaning:
                  "必要な場合には",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "{{c}}, paper notes may encourage students to process information more carefully.",

            ja:
              "その一方で、紙のノートは、生徒が情報をより注意深く処理することを促す場合があります。",

            notes: [
              {
                id:
                  "q10_original_013_note_022",

                expression:
                  "on the other hand",

                meaning:
                  "その一方で",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_023",

                expression:
                  "encourage A to do",

                meaning:
                  "Aに～するよう促す",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_024",

                expression:
                  "process information",

                meaning:
                  "情報を処理する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Because handwriting is usually slower than typing, learners cannot record every word that they hear.",

            ja:
              "手書きは通常、入力より遅いため、学習者は聞いた言葉をすべて記録することはできません。",

            notes: [
              {
                id:
                  "q10_original_013_note_025",

                expression:
                  "handwriting",

                meaning:
                  "手書き",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_026",

                expression:
                  "be slower than",

                meaning:
                  "～より遅い",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "They must decide which ideas are important and express those ideas in a shorter form.",

            ja:
              "どの考えが重要かを判断し、それらをより短い形で表さなければなりません。",

            notes: [
              {
                id:
                  "q10_original_013_note_027",

                expression:
                  "decide which",

                meaning:
                  "どれが～かを判断する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_028",

                expression:
                  "express an idea",

                meaning:
                  "考えを表現する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_029",

                expression:
                  "in a shorter form",

                meaning:
                  "より短い形で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "Students who summarize information in their own words {{d}} to think more actively about its meaning.",

            ja:
              "情報を自分の言葉で要約する生徒は、その意味についてより積極的に考える傾向があります。",

            notes: [
              {
                id:
                  "q10_original_013_note_030",

                expression:
                  "summarize information",

                meaning:
                  "情報を要約する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_031",

                expression:
                  "in one's own words",

                meaning:
                  "自分自身の言葉で",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_032",

                expression:
                  "tend to do",

                meaning:
                  "～する傾向がある",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "Paper also makes it easy to draw arrows, connect ideas, or add small notes anywhere on the page.",

            ja:
              "紙では、矢印を描いたり、考え同士を結びつけたり、ページ上の好きな場所に短いメモを加えたりすることも簡単です。",

            notes: [
              {
                id:
                  "q10_original_013_note_033",

                expression:
                  "draw an arrow",

                meaning:
                  "矢印を描く",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_034",

                expression:
                  "connect ideas",

                meaning:
                  "考え同士を結びつける",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_035",

                expression:
                  "anywhere on the page",

                meaning:
                  "ページ上のどこにでも",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s15",

            en:
              "Neither method is perfect for every learner or every task.",

            ja:
              "どちらの方法も、すべての学習者やすべての課題に完全に適しているわけではありません。",

            notes: [
              {
                id:
                  "q10_original_013_note_036",

                expression:
                  "neither method",

                meaning:
                  "どちらの方法も～ない",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_037",

                expression:
                  "every task",

                meaning:
                  "すべての課題",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "Digital devices can cause problems when batteries run out, applications fail, or notifications interrupt study.",

            ja:
              "電池が切れたり、アプリが動かなくなったり、通知が学習を中断したりすると、デジタル機器が問題を引き起こす場合があります。",

            notes: [
              {
                id:
                  "q10_original_013_note_038",

                expression:
                  "application fails",

                meaning:
                  "アプリが動かなくなる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_039",

                expression:
                  "interrupt study",

                meaning:
                  "学習を中断させる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Paper notebooks can be heavy, difficult to search, and easily damaged or lost.",

            ja:
              "紙のノートは重く、検索が難しく、傷ついたり紛失したりしやすい場合があります。",

            notes: [
              {
                id:
                  "q10_original_013_note_040",

                expression:
                  "be easily damaged",

                meaning:
                  "簡単に傷つく",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_041",

                expression:
                  "be lost",

                meaning:
                  "紛失する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "A student may choose different methods {{e}} the subject, the type of activity, and the purpose of the notes.",

            ja:
              "生徒は、教科、活動の種類、ノートを取る目的に応じて、異なる方法を選ぶことができます。",

            notes: [
              {
                id:
                  "q10_original_013_note_042",

                expression:
                  "depending on",

                meaning:
                  "～に応じて、～次第で",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_043",

                expression:
                  "the type of activity",

                meaning:
                  "活動の種類",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_044",

                expression:
                  "the purpose of",

                meaning:
                  "～の目的",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "For example, a digital device may be useful for collecting sources, while paper may be better for planning an essay by hand.",

            ja:
              "例えば、資料を集める際にはデジタル機器が役立ち、手書きで作文の構成を考える際には紙のほうが適している場合があります。",

            notes: [
              {
                id:
                  "q10_original_013_note_045",

                expression:
                  "collect sources",

                meaning:
                  "資料を集める",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_046",

                expression:
                  "plan an essay",

                meaning:
                  "作文の構成を考える",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_047",

                expression:
                  "by hand",

                meaning:
                  "手で、手書きで",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "The best method is not necessarily digital or paper, but the one that helps the learner understand and remember information effectively.",

            ja:
              "最もよい方法は、必ずしもデジタルか紙かではなく、学習者が情報を効果的に理解し、記憶する助けになる方法です。",

            notes: [
              {
                id:
                  "q10_original_013_note_048",

                expression:
                  "not necessarily",

                meaning:
                  "必ずしも～ではない",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_049",

                expression:
                  "remember information",

                meaning:
                  "情報を記憶する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_013_note_050",

                expression:
                  "effectively",

                meaning:
                  "効果的に",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "cancel"
          },

          {
            id: "a2",
            text: "organize"
          },

          {
            id: "a3",
            text: "prevent"
          },

          {
            id: "a4",
            text: "translate"
          }
        ],

        answer: "a2",

        explanation:
          "デジタルファイルを、教科、日付、話題ごとに整理できるという内容です。organize filesで「ファイルを整理する」という意味になります。",

        wrongChoiceReasons: {
          a1:
            "ファイルを教科や日付ごとに取り消すという意味は成立しません。",

          a3:
            "preventは「妨げる」という意味で、ファイルを分類する内容には合いません。",

          a4:
            "ファイルを教科や日付ごとに翻訳するという意味ではありません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "afraid of"
          },

          {
            id: "b2",
            text: "different from"
          },

          {
            id: "b3",
            text: "famous for"
          },

          {
            id: "b4",
            text: "suitable for"
          }
        ],

        answer: "b4",

        explanation:
          "複数の生徒が同じ文書を編集して共有できるため、デジタルノートはグループ活動に適しているという内容です。be suitable forで「～に適している」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "デジタルノートがグループ活動を恐れているという意味は成立しません。",

          b2:
            "be different fromの後ろには比較対象が続きますが、ここでは用途への適合性を述べています。",

          b3:
            "be famous forは「～で有名である」という意味で、学習方法の用途を表す文脈には合いません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "In other words"
          },

          {
            id: "c2",
            text: "On the other hand"
          },

          {
            id: "c3",
            text: "As a result"
          },

          {
            id: "c4",
            text: "For this purpose"
          }
        ],

        answer: "c2",

        explanation:
          "前の段落ではデジタルノートの利点を述べていますが、ここからは紙のノートの異なる利点を示しています。二つの方法を対比しているため、On the other handが適切です。",

        wrongChoiceReasons: {
          c1:
            "後ろの文は、デジタルノートの利点を別の言葉で言い換えたものではありません。",

          c3:
            "紙のノートの特徴は、デジタルノートの利点から生じた結果ではありません。",

          c4:
            "後ろの文は、前の段落で述べた目的を達成するための方法ではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "agree"
          },

          {
            id: "d2",
            text: "fail"
          },

          {
            id: "d3",
            text: "tend"
          },

          {
            id: "d4",
            text: "wish"
          }
        ],

        answer: "d3",

        explanation:
          "自分の言葉で情報を要約する生徒には、その意味をより積極的に考える傾向があるという内容です。tend to doで「～する傾向がある」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "agree to doは「～することに同意する」という意味で、学習者の一般的な傾向を表しません。",

          d2:
            "fail to doは「～できない」という意味になり、本文とは反対です。",

          d4:
            "wish to doは「～したいと願う」という意味で、実際の傾向を述べる表現ではありません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "according to"
          },

          {
            id: "e2",
            text: "because of"
          },

          {
            id: "e3",
            text: "depending on"
          },

          {
            id: "e4",
            text: "in spite of"
          }
        ],

        answer: "e3",

        explanation:
          "教科、活動の種類、ノートの目的に応じて、適した方法が変わるという内容です。depending onは「～に応じて」「～次第で」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "according toは「～によれば」「～に従って」という意味です。教科などの条件によって選択が変わるという意味には、depending onがより適切です。",

          e2:
            "because ofでは、教科や目的が方法を選ぶ直接的な原因だという表現になり、条件に応じた選択という意味を十分に表せません。",

          e4:
            "in spite ofは「～にもかかわらず」という意味で、教科や目的を無視して方法を選ぶことになってしまいます。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 14
  // Financial Literacy for Teenagers
  // =========================================================
  {
    id: "q10_original_014",
    number: 14,
    sourceType: "original",

    title: "Financial Literacy for Teenagers",
    titleJa: "高校生のための金融リテラシー",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Teenagers make more financial decisions than many people realize.",

            ja:
              "高校生は、多くの人が考えている以上に、お金に関する多くの判断をしています。",

            notes: [
              {
                id:
                  "q10_original_014_note_001",

                expression:
                  "financial decision",

                meaning:
                  "お金に関する判断、金銭上の判断",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_002",

                expression:
                  "more than A realizes",

                meaning:
                  "Aが考えている以上に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "They may receive an allowance, earn money from part-time work, or use electronic payment services.",

            ja:
              "小遣いを受け取ったり、アルバイトでお金を稼いだり、電子決済サービスを利用したりする場合があります。",

            notes: [
              {
                id:
                  "q10_original_014_note_003",

                expression:
                  "receive an allowance",

                meaning:
                  "小遣いを受け取る",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_004",

                expression:
                  "part-time work",

                meaning:
                  "アルバイト",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_005",

                expression:
                  "electronic payment service",

                meaning:
                  "電子決済サービス",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "They also buy products online, subscribe to digital services, and sometimes agree to contracts.",

            ja:
              "また、オンラインで商品を購入したり、デジタルサービスを定期契約したり、契約に同意したりすることもあります。",

            notes: [
              {
                id:
                  "q10_original_014_note_006",

                expression:
                  "subscribe to",

                meaning:
                  "～を定期契約する、～を購読する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_007",

                expression:
                  "agree to a contract",

                meaning:
                  "契約に同意する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "For this reason, young people need basic knowledge about saving, spending, and borrowing.",

            ja:
              "このため、若者には、貯蓄、支出、借入れについての基本的な知識が必要です。",

            notes: [
              {
                id:
                  "q10_original_014_note_008",

                expression:
                  "basic knowledge about",

                meaning:
                  "～についての基本的な知識",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_009",

                expression:
                  "saving, spending, and borrowing",

                meaning:
                  "貯蓄、支出、借入れ",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "One useful skill is making a simple budget.",

            ja:
              "役立つ技能の一つは、簡単な予算を立てることです。",

            notes: [
              {
                id:
                  "q10_original_014_note_010",

                expression:
                  "make a budget",

                meaning:
                  "予算を立てる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "A budget shows how much money comes in and how much is spent.",

            ja:
              "予算表は、どれほどのお金が入り、どれほど使われるかを示します。",

            notes: [
              {
                id:
                  "q10_original_014_note_011",

                expression:
                  "money comes in",

                meaning:
                  "お金が入ってくる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_012",

                expression:
                  "money is spent",

                meaning:
                  "お金が使われる",

                weakEligible: true
              }
            ]
          },

          {
  id: "s7",

  en:
    "By recording purchases, a student can understand what he or she is {{a}} money on each month.",

  ja:
    "購入したものを記録することで、生徒は毎月何にお金を使っているのかを理解できます。",

  notes: [
    {
      id:
        "q10_original_014_note_013",

      expression:
        "record a purchase",

      meaning:
        "購入したものを記録する",

      weakEligible: true
    },

    {
      id:
        "q10_original_014_note_014",

      expression:
        "spend money on",

      meaning:
        "～にお金を使う",

      weakEligible: true
    }
  ]
},

          {
            id: "s8",

            en:
              "However, this sentence would be more natural if it focused on spending rather than responsibility.",

            ja:
              "ただし、この文は責任よりも支出に焦点を当てるほうが自然です。",

            notes: [
              {
                id:
                  "q10_original_014_note_015",

                expression:
                  "focus on",

                meaning:
                  "～に焦点を当てる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "A budget can also help students set aside money for future needs or unexpected costs.",

            ja:
              "予算を立てることは、将来必要になるものや予想外の出費のために、お金を取り分けておく助けにもなります。",

            notes: [
              {
                id:
                  "q10_original_014_note_016",

                expression:
                  "set aside money",

                meaning:
                  "お金を取り分けておく",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_017",

                expression:
                  "unexpected cost",

                meaning:
                  "予想外の出費",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Cashless payments can make shopping fast and convenient.",

            ja:
              "キャッシュレス決済は、買い物を速く便利にします。",

            notes: [
              {
                id:
                  "q10_original_014_note_018",

                expression:
                  "cashless payment",

                meaning:
                  "キャッシュレス決済",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_019",

                expression:
                  "fast and convenient",

                meaning:
                  "速くて便利な",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "A person can pay with a card or smartphone without counting coins or bills.",

            ja:
              "硬貨や紙幣を数えなくても、カードやスマートフォンで支払うことができます。",

            notes: [
              {
                id:
                  "q10_original_014_note_020",

                expression:
                  "pay with",

                meaning:
                  "～で支払う",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_021",

                expression:
                  "coin or bill",

                meaning:
                  "硬貨または紙幣",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "The process may be {{b}} quick that users do not always notice how much they have spent.",

            ja:
              "支払いの過程があまりに速いため、利用者が自分の支出額に気づかないことがあります。",

            notes: [
              {
                id:
                  "q10_original_014_note_022",

                expression:
                  "so ... that",

                meaning:
                  "とても…なので～である",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_023",

                expression:
                  "notice how much",

                meaning:
                  "どれほど～かに気づく",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "{{c}}, the convenience of cashless payment can make spending feel less real.",

            ja:
              "言い換えれば、キャッシュレス決済の便利さによって、お金を使っている実感が弱くなる場合があります。",

            notes: [
              {
                id:
                  "q10_original_014_note_024",

                expression:
                  "in other words",

                meaning:
                  "言い換えれば",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_025",

                expression:
                  "make A feel less real",

                meaning:
                  "Aをあまり現実的に感じさせなくする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "Checking payment records regularly can help users notice small purchases that have added up.",

            ja:
              "支払記録を定期的に確認することで、積み重なった少額の購入に気づくことができます。",

            notes: [
              {
                id:
                  "q10_original_014_note_026",

                expression:
                  "payment record",

                meaning:
                  "支払記録",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_027",

                expression:
                  "add up",

                meaning:
                  "積み重なる、合計になる",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s15",

            en:
              "Teenagers also need to read contract conditions carefully.",

            ja:
              "高校生は、契約条件を注意深く読む必要もあります。",

            notes: [
              {
                id:
                  "q10_original_014_note_028",

                expression:
                  "contract condition",

                meaning:
                  "契約条件",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_029",

                expression:
                  "carefully",

                meaning:
                  "注意深く",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "A service may appear inexpensive because its monthly charge is small.",

            ja:
              "月々の料金が少額であるため、あるサービスが安く見える場合があります。",

            notes: [
              {
                id:
                  "q10_original_014_note_030",

                expression:
                  "appear inexpensive",

                meaning:
                  "安く見える",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_031",

                expression:
                  "monthly charge",

                meaning:
                  "月額料金",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "However, the customer may continue paying for many months or face a fee for ending the contract early.",

            ja:
              "しかし、利用者が何か月も支払いを続けたり、契約を早期に終了するための料金を請求されたりする場合があります。",

            notes: [
              {
                id:
                  "q10_original_014_note_032",

                expression:
                  "continue paying",

                meaning:
                  "支払い続ける",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_033",

                expression:
                  "end a contract early",

                meaning:
                  "契約を早期に終了する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Before agreeing, people should compare the total cost {{d}} judge a service only by its monthly price.",

            ja:
              "契約に同意する前に、月額だけでサービスを判断するのではなく、総費用を比較するべきです。",

            notes: [
              {
                id:
                  "q10_original_014_note_034",

                expression:
                  "total cost",

                meaning:
                  "総費用",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_035",

                expression:
                  "rather than do",

                meaning:
                  "～するのではなく",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_036",

                expression:
                  "judge A by B",

                meaning:
                  "BによってAを判断する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "They should also be {{e}} any cancellation rules, additional charges, and automatic renewals.",

            ja:
              "また、解約の規則、追加料金、自動更新について認識しておくべきです。",

            notes: [
              {
                id:
                  "q10_original_014_note_037",

                expression:
                  "be aware of",

                meaning:
                  "～を認識している、～に気づいている",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_038",

                expression:
                  "additional charge",

                meaning:
                  "追加料金",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_039",

                expression:
                  "automatic renewal",

                meaning:
                  "自動更新",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Financial literacy does not mean avoiding every purchase, but making choices after considering their costs and effects.",

            ja:
              "金融リテラシーとは、すべての買い物を避けることではなく、その費用と影響を考えた上で選択することです。",

            notes: [
              {
                id:
                  "q10_original_014_note_040",

                expression:
                  "financial literacy",

                meaning:
                  "金融リテラシー、お金に関する知識と判断力",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_041",

                expression:
                  "after doing",

                meaning:
                  "～した後で、～した上で",

                weakEligible: true
              },

              {
                id:
                  "q10_original_014_note_042",

                expression:
                  "consider costs and effects",

                meaning:
                  "費用と影響を考慮する",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
  id: "a",

  choices: [
    {
      id: "a1",
      text: "borrowing"
    },

    {
      id: "a2",
      text: "collecting"
    },

    {
      id: "a3",
      text: "spending"
    },

    {
      id: "a4",
      text: "receiving"
    }
  ],

  answer: "a3",

  explanation:
    "購入記録を見ることで、毎月何にお金を使っているかを理解できるという内容です。spend money on Aで「Aにお金を使う」という意味になります。",

  wrongChoiceReasons: {
    a1:
      "borrow money from Aなどの形で使われます。borrow money on Aとは通常言いません。",

    a2:
      "collect money for Aなどの形はありますが、買い物への支出を表していません。",

    a4:
      "receive money from Aなどの形で使われます。何にお金を使うかという文脈には合いません。"
  }
},

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "enough"
          },

          {
            id: "b2",
            text: "such"
          },

          {
            id: "b3",
            text: "so"
          },

          {
            id: "b4",
            text: "too"
          }
        ],

        answer: "b3",

        explanation:
          "支払いが非常に速いため、利用者が支出額に気づかないという結果を表しています。so＋形容詞＋that S Vで「とても…なので～」という構文になります。",

        wrongChoiceReasons: {
          b1:
            "enoughは通常、形容詞の後ろに置きます。enough quickとはできません。",

          b2:
            "suchの後ろには基本的に名詞が必要です。such quickとはできません。",

          b4:
            "too quick thatという形は使いません。too ... to doなどの形が一般的です。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "In other words"
          },

          {
            id: "c2",
            text: "Meanwhile"
          },

          {
            id: "c3",
            text: "Nevertheless"
          },

          {
            id: "c4",
            text: "Similarly"
          }
        ],

        answer: "c1",

        explanation:
          "直前の「支払いが速いため支出額に気づきにくい」という内容を、キャッシュレス決済では支出の実感が弱くなると言い換えています。そのため、In other wordsが適切です。",

        wrongChoiceReasons: {
          c2:
            "二つの出来事が同時に進んでいることを示す文ではありません。",

          c3:
            "直前の内容に反することを述べているのではありません。",

          c4:
            "似た別の事例を追加するのではなく、直前の内容を言い換えています。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "because of"
          },

          {
            id: "d2",
            text: "instead of"
          },

          {
            id: "d3",
            text: "rather than"
          },

          {
            id: "d4",
            text: "such as"
          }
        ],

        answer: "d3",

        explanation:
          "月額だけで判断するのではなく、総費用を比較するべきだという対比です。rather than＋動詞の原形で「～するのではなく」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "because ofの後ろには名詞や動名詞が続き、動詞の原形judgeをそのまま置くことはできません。",

          d2:
            "instead ofの後ろには名詞または動名詞が必要で、judgeではなくjudgingとなります。",

          d4:
            "such asは例を挙げる表現で、二つの行動を対比することはできません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "aware of"
          },

          {
            id: "e2",
            text: "different from"
          },

          {
            id: "e3",
            text: "interested in"
          },

          {
            id: "e4",
            text: "proud of"
          }
        ],

        answer: "e1",

        explanation:
          "契約前には、解約条件や追加料金、自動更新があることを認識しておく必要があります。be aware ofで「～を認識している」「～に気づいている」という意味になります。",

        wrongChoiceReasons: {
          e2:
            "解約条件などと異なっているという意味になり、文脈に合いません。",

          e3:
            "解約条件に興味を持つことではなく、その存在や内容を理解しておくことが必要です。",

          e4:
            "解約条件などを誇りに思うという意味は不自然です。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 15
  // Starting School Later in the Morning
  // =========================================================
  {
    id: "q10_original_015",
    number: 15,
    sourceType: "original",

    title: "Starting School Later in the Morning",
    titleJa: "学校の始業時間を遅らせること",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Many teenagers find it difficult to get enough sleep on school nights.",

            ja:
              "多くの10代の若者は、学校がある日の夜に十分な睡眠を取ることが難しいと感じています。",

            notes: [
              {
                id:
                  "q10_original_015_note_001",

                expression:
                  "find it difficult to do",

                meaning:
                  "～することを難しいと感じる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_002",

                expression:
                  "get enough sleep",

                meaning:
                  "十分な睡眠を取る",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_003",

                expression:
                  "on school nights",

                meaning:
                  "学校がある日の夜に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "They may stay up late to study, take part in club activities, or use digital devices.",

            ja:
              "勉強をしたり、部活動に参加したり、電子機器を使ったりして、夜更かしする場合があります。",

            notes: [
              {
                id:
                  "q10_original_015_note_004",

                expression:
                  "stay up late",

                meaning:
                  "夜更かしする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_005",

                expression:
                  "take part in",

                meaning:
                  "～に参加する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Changes in the body during adolescence can also cause young people to {{a}} awake later at night.",

            ja:
              "思春期に起こる身体の変化によって、若者は夜遅くまで起きた状態が続くこともあります。",

            notes: [
              {
                id:
                  "q10_original_015_note_006",

                expression:
                  "during adolescence",

                meaning:
                  "思春期に",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_007",

                expression:
                  "cause A to do",

                meaning:
                  "Aに～させる、Aが～する原因となる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_008",

                expression:
                  "remain awake",

                meaning:
                  "目が覚めた状態でいる、起きている",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "When school begins early, students must still wake up at a fixed time even if they went to bed late.",

            ja:
              "学校が早く始まる場合、遅く寝たとしても、生徒は決まった時刻に起きなければなりません。",

            notes: [
              {
                id:
                  "q10_original_015_note_009",

                expression:
                  "at a fixed time",

                meaning:
                  "決まった時刻に",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_010",

                expression:
                  "even if",

                meaning:
                  "たとえ～でも",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "A lack of sleep can affect several parts of school life.",

            ja:
              "睡眠不足は、学校生活のさまざまな面に影響を与える可能性があります。",

            notes: [
              {
                id:
                  "q10_original_015_note_011",

                expression:
                  "a lack of sleep",

                meaning:
                  "睡眠不足",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_012",

                expression:
                  "affect",

                meaning:
                  "～に影響を与える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Tired students may have difficulty paying attention, remembering information, or controlling their emotions.",

            ja:
              "疲れた生徒は、注意を向けたり、情報を記憶したり、感情を制御したりすることが難しくなる場合があります。",

            notes: [
              {
                id:
                  "q10_original_015_note_013",

                expression:
                  "have difficulty doing",

                meaning:
                  "～することが難しい",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_014",

                expression:
                  "pay attention",

                meaning:
                  "注意を向ける",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_015",

                expression:
                  "control one's emotions",

                meaning:
                  "感情を制御する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Regularly sleeping for too few hours may {{b}} lower energy and reduced interest in learning.",

            ja:
              "日常的に睡眠時間が短すぎると、活力の低下や学習への関心の減少につながる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_015_note_016",

                expression:
                  "too few hours",

                meaning:
                  "少なすぎる時間",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_017",

                expression:
                  "result in",

                meaning:
                  "～という結果になる、～につながる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_018",

                expression:
                  "reduced interest in",

                meaning:
                  "～への関心の低下",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Some students try to solve the problem by sleeping much longer on weekends.",

            ja:
              "週末に大幅に長く眠ることで、この問題を解決しようとする生徒もいます。",

            notes: [
              {
                id:
                  "q10_original_015_note_019",

                expression:
                  "solve a problem by doing",

                meaning:
                  "～することで問題を解決する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_020",

                expression:
                  "on weekends",

                meaning:
                  "週末に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "However, large differences between weekday and weekend sleep times may make a regular sleep schedule harder to maintain.",

            ja:
              "しかし、平日と週末の睡眠時刻に大きな違いがあると、規則的な睡眠習慣を維持することが難しくなる場合があります。",

            notes: [
              {
                id:
                  "q10_original_015_note_021",

                expression:
                  "weekday and weekend",

                meaning:
                  "平日と週末",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_022",

                expression:
                  "sleep schedule",

                meaning:
                  "睡眠の時間帯、睡眠習慣",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_023",

                expression:
                  "be hard to maintain",

                meaning:
                  "維持することが難しい",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "One possible response is to begin the school day later in the morning.",

            ja:
              "考えられる対応の一つは、学校の一日を朝のより遅い時間に始めることです。",

            notes: [
              {
                id:
                  "q10_original_015_note_024",

                expression:
                  "one possible response",

                meaning:
                  "考えられる対応の一つ",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_025",

                expression:
                  "begin the school day",

                meaning:
                  "学校の一日を始める",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "A later starting time may give students a greater chance to sleep for the number of hours they need.",

            ja:
              "始業時刻を遅らせることで、生徒が必要な時間だけ眠れる可能性が高まるかもしれません。",

            notes: [
              {
                id:
                  "q10_original_015_note_026",

                expression:
                  "starting time",

                meaning:
                  "開始時刻、始業時刻",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_027",

                expression:
                  "give A a chance to do",

                meaning:
                  "Aに～する機会を与える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Students who arrive at school feeling more rested may be better prepared to learn.",

            ja:
              "より休息を取れた状態で登校した生徒は、学習への準備がより整っている可能性があります。",

            notes: [
              {
                id:
                  "q10_original_015_note_028",

                expression:
                  "feel rested",

                meaning:
                  "十分に休めたと感じる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_029",

                expression:
                  "be prepared to do",

                meaning:
                  "～する準備ができている",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "{{c}} younger children often become sleepy earlier, many teenagers do not feel ready to sleep until later at night.",

            ja:
              "年少の子どもは早い時間に眠くなることが多い一方で、多くの10代の若者は夜遅くまで眠る準備が整ったと感じません。",

            notes: [
              {
                id:
                  "q10_original_015_note_030",

                expression:
                  "whereas",

                meaning:
                  "～である一方で",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_031",

                expression:
                  "become sleepy",

                meaning:
                  "眠くなる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_032",

                expression:
                  "feel ready to sleep",

                meaning:
                  "眠る準備が整ったと感じる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "A school schedule that recognizes this difference may fit teenage sleep patterns more closely.",

            ja:
              "この違いを考慮した学校の予定は、10代の睡眠パターンにより適している可能性があります。",

            notes: [
              {
                id:
                  "q10_original_015_note_033",

                expression:
                  "recognize a difference",

                meaning:
                  "違いを認識する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_034",

                expression:
                  "fit A closely",

                meaning:
                  "Aによく合う",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_035",

                expression:
                  "sleep pattern",

                meaning:
                  "睡眠パターン",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s15",

            en:
              "Changing the starting time, however, can affect many other parts of the day.",

            ja:
              "しかし、始業時刻を変更すると、一日のほかの多くの部分にも影響が及ぶ可能性があります。",

            notes: [
              {
                id:
                  "q10_original_015_note_036",

                expression:
                  "affect other parts of",

                meaning:
                  "～のほかの部分に影響を与える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "If classes begin later, they may also end later, leaving less time for sports, club activities, or part-time work.",

            ja:
              "授業が遅く始まれば、終わる時刻も遅くなり、スポーツ、部活動、アルバイトに使える時間が少なくなる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_015_note_037",

                expression:
                  "leave less time for",

                meaning:
                  "～に使える時間を少なくする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Bus and train schedules may need to be changed, and parents' working hours may create additional difficulties.",

            ja:
              "バスや電車の時刻表を変更する必要が生じたり、保護者の勤務時間によって別の問題が生じたりすることもあります。",

            notes: [
              {
                id:
                  "q10_original_015_note_038",

                expression:
                  "transportation schedule",

                meaning:
                  "交通機関の時刻表",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_039",

                expression:
                  "working hours",

                meaning:
                  "勤務時間",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_040",

                expression:
                  "additional difficulty",

                meaning:
                  "別の問題、追加の困難",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "It is often not {{d}} a change is introduced that its effects on families and transportation become clear.",

            ja:
              "変更が導入されて初めて、家庭や交通への影響が明らかになることも少なくありません。",

            notes: [
              {
                id:
                  "q10_original_015_note_041",

                expression:
                  "It is not until A that B",

                meaning:
                  "Aして初めてBする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_042",

                expression:
                  "introduce a change",

                meaning:
                  "変更を導入する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_043",

                expression:
                  "become clear",

                meaning:
                  "明らかになる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Schools must therefore take local transportation, family schedules, and after-school activities into {{e}}.",

            ja:
              "したがって学校は、地域の交通事情、家庭の予定、放課後の活動を考慮しなければなりません。",

            notes: [
              {
                id:
                  "q10_original_015_note_044",

                expression:
                  "take A into account",

                meaning:
                  "Aを考慮に入れる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_045",

                expression:
                  "after-school activity",

                meaning:
                  "放課後の活動",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Starting school later may support student health, but it works best when the whole school community plans the change carefully.",

            ja:
              "始業時刻を遅らせることは生徒の健康を支える可能性がありますが、学校全体で慎重に変更を計画するときに最も効果的です。",

            notes: [
              {
                id:
                  "q10_original_015_note_046",

                expression:
                  "support student health",

                meaning:
                  "生徒の健康を支える",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_047",

                expression:
                  "the whole school community",

                meaning:
                  "学校に関わる人々全体",

                weakEligible: true
              },

              {
                id:
                  "q10_original_015_note_048",

                expression:
                  "plan a change carefully",

                meaning:
                  "変更を慎重に計画する",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "appear"
          },

          {
            id: "a2",
            text: "remain"
          },

          {
            id: "a3",
            text: "return"
          },

          {
            id: "a4",
            text: "seem"
          }
        ],

        answer: "a2",

        explanation:
          "思春期の身体の変化によって、若者が夜遅くまで起きた状態でいるという内容です。remain awakeで「起きている」「目が覚めた状態でいる」という意味になります。",

        wrongChoiceReasons: {
          a1:
            "appear awakeは「起きているように見える」という意味になり、実際に眠れず起きている状態を表す本文とは異なります。",

          a3:
            "return awakeという語の組合せは、この意味では使いません。",

          a4:
            "seem awakeは「起きているように思われる」という意味で、身体の変化による睡眠時刻の変化を直接表しません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "depend on"
          },

          {
            id: "b2",
            text: "result in"
          },

          {
            id: "b3",
            text: "search for"
          },

          {
            id: "b4",
            text: "stand for"
          }
        ],

        answer: "b2",

        explanation:
          "睡眠時間が短すぎることが、活力や学習意欲の低下につながるという因果関係です。result in Aで「Aという結果になる」「Aにつながる」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "depend onでは、短い睡眠が活力の低下に依存するという不自然な因果関係になります。",

          b3:
            "search forは「～を探す」という意味で、睡眠不足の結果を表しません。",

          b4:
            "stand forは「～を表す、～の略である」という意味で、この文脈には合いません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "In other words"
          },

          {
            id: "c2",
            text: "Unless"
          },

          {
            id: "c3",
            text: "Whereas"
          },

          {
            id: "c4",
            text: "Therefore"
          }
        ],

        answer: "c3",

        explanation:
          "年少の子どもは早く眠くなる一方、10代の若者は遅い時刻まで眠くならないという対照を示しています。Whereasは「～である一方で」という意味です。",

        wrongChoiceReasons: {
          c1:
            "後ろの内容は前文の言い換えではなく、年齢による違いを比較しています。",

          c2:
            "Unlessは「～でない限り」という条件を表しますが、ここでは条件ではなく対比が必要です。",

          c4:
            "10代が遅くまで眠くならないことは、年少の子どもが早く眠くなることの結果ではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "after"
          },

          {
            id: "d2",
            text: "before"
          },

          {
            id: "d3",
            text: "during"
          },

          {
            id: "d4",
            text: "until"
          }
        ],

        answer: "d4",

        explanation:
          "It is not until A that Bで「Aして初めてBする」という強調構文になります。変更を実際に導入して初めて、その影響が明らかになるという内容です。",

        wrongChoiceReasons: {
          d1:
            "It is not after A that Bという形では、本文が意図する「Aして初めて」の意味になりません。",

          d2:
            "not beforeでは「～より前ではない」という意味になり、定型的な強調構文を作れません。",

          d3:
            "not duringでは、変更中ではないという意味になり、影響が判明する時点を表せません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "account"
          },

          {
            id: "e2",
            text: "control"
          },

          {
            id: "e3",
            text: "order"
          },

          {
            id: "e4",
            text: "place"
          }
        ],

        answer: "e1",

        explanation:
          "始業時刻を変更する際には、交通事情や家庭の予定なども考慮する必要があります。take A into accountで「Aを考慮に入れる」という意味になります。",

        wrongChoiceReasons: {
          e2:
            "take A into controlという表現は通常使いません。",

          e3:
            "take A into orderという表現では、考慮するという意味になりません。",

          e4:
            "take placeは「行われる、起こる」という意味ですが、take A into placeという形にはなりません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 16
  // Learning Through School Clubs
  // =========================================================
  {
    id: "q10_original_016",
    number: 16,
    sourceType: "original",

    title: "Learning Through School Clubs",
    titleJa: "部活動を通して身につく力",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "School clubs are an important part of student life in many countries.",

            ja:
              "多くの国で、部活動は生徒の学校生活の重要な一部です。",

            notes: [
              {
                id:
                  "q10_original_016_note_001",

                expression:
                  "an important part of",

                meaning:
                  "～の重要な一部",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_002",

                expression:
                  "student life",

                meaning:
                  "生徒の学校生活",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Students may join sports teams, music groups, science clubs, or volunteer organizations.",

            ja:
              "生徒は、運動部、音楽の団体、科学部、ボランティア団体などに参加することがあります。",

            notes: [
              {
                id:
                  "q10_original_016_note_003",

                expression:
                  "join a team",

                meaning:
                  "チームに参加する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_004",

                expression:
                  "volunteer organization",

                meaning:
                  "ボランティア団体",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Although the activities differ, most clubs ask members to work toward a shared goal.",

            ja:
              "活動内容は異なりますが、ほとんどの部活動では、部員が共通の目標に向かって取り組みます。",

            notes: [
              {
                id:
                  "q10_original_016_note_005",

                expression:
                  "work toward",

                meaning:
                  "～に向かって取り組む",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_006",

                expression:
                  "a shared goal",

                meaning:
                  "共通の目標",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Regular participation can {{a}} the development of skills that are useful beyond school.",

            ja:
              "定期的に参加することは、学校外でも役立つ能力の発達に貢献する可能性があります。",

            notes: [
              {
                id:
                  "q10_original_016_note_007",

                expression:
                  "regular participation",

                meaning:
                  "定期的な参加",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_008",

                expression:
                  "contribute to",

                meaning:
                  "～に貢献する、～につながる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_009",

                expression:
                  "beyond school",

                meaning:
                  "学校の外でも、卒業後にも",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "One skill students can learn is cooperation.",

            ja:
              "生徒が身につけられる能力の一つは、協力する力です。",

            notes: [
              {
                id:
                  "q10_original_016_note_010",

                expression:
                  "cooperation",

                meaning:
                  "協力、協働",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Club members must communicate, divide tasks, and support one another.",

            ja:
              "部員は、意思疎通を図り、仕事を分担し、お互いを支えなければなりません。",

            notes: [
              {
                id:
                  "q10_original_016_note_011",

                expression:
                  "divide tasks",

                meaning:
                  "仕事や役割を分担する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_012",

                expression:
                  "support one another",

                meaning:
                  "お互いを支える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "A successful performance or competition usually depends on the efforts of the whole group rather than one person.",

            ja:
              "発表や大会で成功するかどうかは、通常、一人ではなくグループ全体の努力に左右されます。",

            notes: [
              {
                id:
                  "q10_original_016_note_013",

                expression:
                  "depend on the efforts of",

                meaning:
                  "～の努力に左右される",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_014",

                expression:
                  "the whole group",

                meaning:
                  "グループ全体",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Students learn {{b}} how to express their own ideas but also how to listen to others.",

            ja:
              "生徒は、自分の考えを表現する方法だけでなく、他の人の話を聞く方法も学びます。",

            notes: [
              {
                id:
                  "q10_original_016_note_015",

                expression:
                  "not only A but also B",

                meaning:
                  "AだけでなくBも",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_016",

                expression:
                  "express one's ideas",

                meaning:
                  "自分の考えを表現する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_017",

                expression:
                  "listen to others",

                meaning:
                  "他の人の話を聞く",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "When disagreements occur, members must find a solution that the group can accept.",

            ja:
              "意見の不一致が起きたとき、部員はグループが受け入れられる解決策を見つけなければなりません。",

            notes: [
              {
                id:
                  "q10_original_016_note_018",

                expression:
                  "a disagreement occurs",

                meaning:
                  "意見の不一致が起こる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_019",

                expression:
                  "find a solution",

                meaning:
                  "解決策を見つける",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Club activities can also teach responsibility and time management.",

            ja:
              "部活動は、責任感や時間管理について学ぶ機会にもなります。",

            notes: [
              {
                id:
                  "q10_original_016_note_020",

                expression:
                  "time management",

                meaning:
                  "時間管理",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Members are expected to attend practices regularly and complete the duties they have accepted.",

            ja:
              "部員には、練習に定期的に参加し、引き受けた役割を果たすことが求められます。",

            notes: [
              {
                id:
                  "q10_original_016_note_021",

                expression:
                  "be expected to do",

                meaning:
                  "～することを期待される、求められる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_022",

                expression:
                  "complete a duty",

                meaning:
                  "役割や務めを果たす",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Older students may guide younger members, prepare equipment, or organize events.",

            ja:
              "上級生は、下級生を指導したり、用具を準備したり、行事を運営したりする場合があります。",

            notes: [
              {
                id:
                  "q10_original_016_note_023",

                expression:
                  "guide younger members",

                meaning:
                  "年下の部員を指導する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_024",

                expression:
                  "prepare equipment",

                meaning:
                  "用具を準備する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_025",

                expression:
                  "organize an event",

                meaning:
                  "行事を企画・運営する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "Some club leaders may be {{d}} to make schedules, contact teachers, and manage a small budget.",

            ja:
              "部長などは、予定を作り、教師に連絡し、少額の予算を管理することを求められる場合があります。",

            notes: [
              {
                id:
                  "q10_original_016_note_026",

                expression:
                  "be required to do",

                meaning:
                  "～することを求められる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_027",

                expression:
                  "make a schedule",

                meaning:
                  "予定表を作る",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_028",

                expression:
                  "manage a budget",

                meaning:
                  "予算を管理する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "These experiences can help students understand that other people depend on them.",

            ja:
              "こうした経験によって、生徒は他の人が自分を頼りにしていることを理解できます。",

            notes: [
              {
                id:
                  "q10_original_016_note_029",

                expression:
                  "depend on a person",

                meaning:
                  "人を頼りにする",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s15",

            en:
              "{{c}}, club activities can become a burden when they require too much time or energy.",

            ja:
              "その一方で、部活動は、時間や体力をあまりに多く必要とすると、負担になる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_016_note_030",

                expression:
                  "at the same time",

                meaning:
                  "その一方で、同時に",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_031",

                expression:
                  "become a burden",

                meaning:
                  "負担になる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_032",

                expression:
                  "require too much time",

                meaning:
                  "あまりに多くの時間を必要とする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "Long practices may leave students with little time for homework, sleep, or family life.",

            ja:
              "長時間の練習によって、生徒には宿題、睡眠、家庭生活のための時間がほとんど残らない場合があります。",

            notes: [
              {
                id:
                  "q10_original_016_note_033",

                expression:
                  "leave A with little time for B",

                meaning:
                  "AにBのための時間をほとんど残さない",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_034",

                expression:
                  "family life",

                meaning:
                  "家庭生活",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Students may also feel pressure to continue even when they are tired, injured, or no longer interested.",

            ja:
              "また、疲れていたり、けがをしていたり、興味を失っていたりしても、続けなければならないという圧力を感じる場合があります。",

            notes: [
              {
                id:
                  "q10_original_016_note_035",

                expression:
                  "feel pressure to do",

                meaning:
                  "～しなければならないという圧力を感じる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_036",

                expression:
                  "no longer interested",

                meaning:
                  "もはや興味がない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Teachers and coaches should pay attention to signs of stress and allow students to rest when necessary.",

            ja:
              "教師や指導者は、ストレスの兆候に注意し、必要な場合には生徒を休ませるべきです。",

            notes: [
              {
                id:
                  "q10_original_016_note_037",

                expression:
                  "pay attention to",

                meaning:
                  "～に注意を払う",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_038",

                expression:
                  "a sign of stress",

                meaning:
                  "ストレスの兆候",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Club activities can remain valuable {{e}} students have enough time for study, sleep, and other important parts of life.",

            ja:
              "生徒が勉強、睡眠、その他の大切な生活のための時間を十分に確保できる限り、部活動は価値のある活動であり続けます。",

            notes: [
              {
                id:
                  "q10_original_016_note_039",

                expression:
                  "as long as",

                meaning:
                  "～する限り、～という条件で",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_040",

                expression:
                  "remain valuable",

                meaning:
                  "価値のあるものであり続ける",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_041",

                expression:
                  "have enough time for",

                meaning:
                  "～のための十分な時間がある",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "The purpose of a school club should be to support students' growth, not to damage their health or education.",

            ja:
              "部活動の目的は、生徒の健康や学習を損なうことではなく、成長を支えることであるべきです。",

            notes: [
              {
                id:
                  "q10_original_016_note_042",

                expression:
                  "the purpose of A",

                meaning:
                  "Aの目的",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_043",

                expression:
                  "support one's growth",

                meaning:
                  "人の成長を支える",

                weakEligible: true
              },

              {
                id:
                  "q10_original_016_note_044",

                expression:
                  "damage one's health",

                meaning:
                  "人の健康を損なう",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "contribute to"
          },

          {
            id: "a2",
            text: "depend on"
          },

          {
            id: "a3",
            text: "prevent from"
          },

          {
            id: "a4",
            text: "suffer from"
          }
        ],

        answer: "a1",

        explanation:
          "部活動への定期的な参加が、学校外でも役立つ能力の発達につながるという内容です。contribute to Aで「Aに貢献する」「Aにつながる」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "depend onでは、参加が能力の発達に依存するという意味になり、因果関係が不自然です。",

          a3:
            "prevent A from Bのように目的語が必要です。また、能力の発達を妨げる内容ではありません。",

          a4:
            "suffer fromは「～に苦しむ」という意味で、能力の発達との組合せは不自然です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "as well as"
          },

          {
            id: "b2",
            text: "instead of"
          },

          {
            id: "b3",
            text: "not only"
          },

          {
            id: "b4",
            text: "rather than"
          }
        ],

        answer: "b3",

        explanation:
          "後ろにbut alsoがあるため、not only A but also Bの相関表現になります。「自分の意見を表現する方法だけでなく、他者の話を聞く方法も学ぶ」という意味です。",

        wrongChoiceReasons: {
          b1:
            "as well asは「～だけでなく」という意味を持ちますが、後ろのbut alsoとは組み合わせません。",

          b2:
            "instead ofでは「～の代わりに」という意味になり、二つの技能を両方学ぶ内容に合いません。",

          b4:
            "rather thanでは「～ではなく」という選択になり、but alsoと組み合わせることはできません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "At the same time"
          },

          {
            id: "c2",
            text: "For example"
          },

          {
            id: "c3",
            text: "In other words"
          },

          {
            id: "c4",
            text: "As a result"
          }
        ],

        answer: "c1",

        explanation:
          "前の段落までは部活動の利点を述べていますが、ここからは時間や体力の負担という別の側面を示しています。At the same timeには「その一方で」という意味があり、この流れに適切です。",

        wrongChoiceReasons: {
          c2:
            "後ろの文は、責任感や時間管理を学ぶことの具体例ではなく、部活動の問題点を示しています。",

          c3:
            "後ろの内容は、前の利点を言い換えたものではありません。",

          c4:
            "部活動が負担になることは、責任感を学ぶことから直接生じる結果ではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "allowed"
          },

          {
            id: "d2",
            text: "required"
          },

          {
            id: "d3",
            text: "satisfied"
          },

          {
            id: "d4",
            text: "used"
          }
        ],

        answer: "d2",

        explanation:
          "部長などが予定作成や教師への連絡、予算管理を担当するよう求められるという内容です。be required to doで「～することを求められる」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "be allowed to doは「～することを許可される」という意味です。責任として求められる内容を十分に表しません。",

          d3:
            "be satisfied to doという形は一般的ではなく、「満足している」という意味も文脈に合いません。",

          d4:
            "be used to doingなら「～することに慣れている」という意味ですが、to makeという不定詞とは形が異なります。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "as long as"
          },

          {
            id: "e2",
            text: "even though"
          },

          {
            id: "e3",
            text: "now that"
          },

          {
            id: "e4",
            text: "so that"
          }
        ],

        answer: "e1",

        explanation:
          "勉強や睡眠などの時間を十分に確保できるという条件のもとで、部活動は価値のある活動であり続けるという内容です。as long asは「～する限り」「～という条件で」という意味です。",

        wrongChoiceReasons: {
          e2:
            "even thoughでは「十分な時間があるにもかかわらず」という逆接になり、条件を表せません。",

          e3:
            "now thatは「今や～なので」という理由を表しますが、継続的な条件を示す文脈には合いません。",

          e4:
            "so thatは目的を表すため、「十分な時間を持てるように価値がある」という不自然な意味になります。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 17
  // Students Teaching Other Students
  // =========================================================
  {
    id: "q10_original_017",
    number: 17,
    sourceType: "original",

    title: "Students Teaching Other Students",
    titleJa: "生徒同士で教え合う学習",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Learning in a classroom does not always have to involve a teacher explaining everything.",

            ja:
              "教室での学習は、必ずしも教師がすべてを説明する形である必要はありません。",

            notes: [
              {
                id:
                  "q10_original_017_note_001",

                expression:
                  "involve A doing",

                meaning:
                  "Aが～することを含む",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_002",

                expression:
                  "not always have to do",

                meaning:
                  "必ずしも～する必要はない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Students can sometimes learn effectively by explaining ideas to one another.",

            ja:
              "生徒は、互いに考えを説明することで、効果的に学べる場合があります。",

            notes: [
              {
                id:
                  "q10_original_017_note_003",

                expression:
                  "explain A to B",

                meaning:
                  "AをBに説明する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_004",

                expression:
                  "one another",

                meaning:
                  "お互いに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "This approach is often called peer teaching or peer learning.",

            ja:
              "この方法は、ピア・ティーチングまたはピア・ラーニングと呼ばれることがよくあります。",

            notes: [
              {
                id:
                  "q10_original_017_note_005",

                expression:
                  "be called",

                meaning:
                  "～と呼ばれる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_006",

                expression:
                  "peer teaching",

                meaning:
                  "生徒同士で教え合う学習",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "It may involve pairs, small groups, or older students supporting younger ones.",

            ja:
              "二人組、小グループ、上級生が下級生を支援する活動などが含まれる場合があります。",

            notes: [
              {
                id:
                  "q10_original_017_note_007",

                expression:
                  "small group",

                meaning:
                  "小グループ",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_008",

                expression:
                  "support younger students",

                meaning:
                  "年下の生徒を支援する",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "One advantage of peer teaching is that it requires students to organize their knowledge.",

            ja:
              "教え合う学習の利点の一つは、生徒が自分の知識を整理する必要があることです。",

            notes: [
              {
                id:
                  "q10_original_017_note_009",

                expression:
                  "one advantage of",

                meaning:
                  "～の利点の一つ",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_010",

                expression:
                  "organize one's knowledge",

                meaning:
                  "自分の知識を整理する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "A clear explanation must be {{a}} accurate information and a logical order.",

            ja:
              "分かりやすい説明は、正確な情報と論理的な順序に基づいていなければなりません。",

            notes: [
              {
                id:
                  "q10_original_017_note_011",

                expression:
                  "be based on",

                meaning:
                  "～に基づいている",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_012",

                expression:
                  "accurate information",

                meaning:
                  "正確な情報",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_013",

                expression:
                  "logical order",

                meaning:
                  "論理的な順序",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "While preparing to teach, students may notice gaps in their own understanding.",

            ja:
              "教える準備をする中で、生徒は自分の理解が不十分な部分に気づくことがあります。",

            notes: [
              {
                id:
                  "q10_original_017_note_014",

                expression:
                  "prepare to do",

                meaning:
                  "～する準備をする",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_015",

                expression:
                  "a gap in one's understanding",

                meaning:
                  "理解が不十分な部分",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "They may realize that they remember a rule but cannot explain why it works.",

            ja:
              "規則は覚えていても、なぜそれが成り立つのか説明できないことに気づく場合があります。",

            notes: [
              {
                id:
                  "q10_original_017_note_016",

                expression:
                  "realize that",

                meaning:
                  "～であることに気づく",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_017",

                expression:
                  "why it works",

                meaning:
                  "なぜそれが成り立つのか",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "The need to answer questions can therefore lead them to review the topic more carefully.",

            ja:
              "そのため、質問に答える必要があることで、生徒はその内容をより注意深く復習するようになる場合があります。",

            notes: [
              {
                id:
                  "q10_original_017_note_018",

                expression:
                  "the need to do",

                meaning:
                  "～する必要性",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_019",

                expression:
                  "lead A to do",

                meaning:
                  "Aが～することにつながる",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Peer teaching can also make it easier for some students to ask questions.",

            ja:
              "教え合う学習によって、生徒によっては質問しやすくなる場合もあります。",

            notes: [
              {
                id:
                  "q10_original_017_note_020",

                expression:
                  "ask a question",

                meaning:
                  "質問する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "A learner may feel less nervous speaking to a classmate than speaking in front of the whole class.",

            ja:
              "学級全体の前で話すよりも、同級生に話すほうが緊張しにくい学習者もいます。",

            notes: [
              {
                id:
                  "q10_original_017_note_021",

                expression:
                  "feel less nervous",

                meaning:
                  "あまり緊張しない",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_022",

                expression:
                  "in front of the whole class",

                meaning:
                  "学級全体の前で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Teachers can {{b}} one student explain a difficult point in words that classmates understand easily.",

            ja:
              "教師は、一人の生徒に、同級生が理解しやすい言葉で難しい点を説明してもらうことができます。",

            notes: [
              {
                id:
                  "q10_original_017_note_023",

                expression:
                  "have A do",

                meaning:
                  "Aに～してもらう、Aに～させる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_024",

                expression:
                  "a difficult point",

                meaning:
                  "難しい点",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_025",

                expression:
                  "in words that A understands",

                meaning:
                  "Aが理解できる言葉で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "Students of a similar age may use examples that are closely connected to one another's experiences.",

            ja:
              "年齢の近い生徒は、互いの経験と密接に関係した例を使う場合があります。",

            notes: [
              {
                id:
                  "q10_original_017_note_026",

                expression:
                  "of a similar age",

                meaning:
                  "同じくらいの年齢の",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_027",

                expression:
                  "be connected to",

                meaning:
                  "～と関係している",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "{{c}}, an explanation from another student may sometimes be easier to understand than the original explanation.",

            ja:
              "その結果、別の生徒による説明のほうが、最初の説明より理解しやすい場合があります。",

            notes: [
              {
                id:
                  "q10_original_017_note_028",

                expression:
                  "consequently",

                meaning:
                  "その結果、したがって",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_029",

                expression:
                  "the original explanation",

                meaning:
                  "最初の説明、元の説明",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s15",

            en:
              "Peer teaching, however, does not work automatically in every situation.",

            ja:
              "しかし、教え合う学習がすべての状況で自動的にうまくいくわけではありません。",

            notes: [
              {
                id:
                  "q10_original_017_note_030",

                expression:
                  "not work automatically",

                meaning:
                  "自動的にはうまくいかない",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_031",

                expression:
                  "in every situation",

                meaning:
                  "すべての状況で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "A student may accidentally give incorrect information or explain a topic in a confusing way.",

            ja:
              "生徒が誤った情報を与えたり、分かりにくい方法で内容を説明したりする可能性があります。",

            notes: [
              {
                id:
                  "q10_original_017_note_032",

                expression:
                  "accidentally",

                meaning:
                  "誤って、偶然に",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_033",

                expression:
                  "incorrect information",

                meaning:
                  "誤った情報",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_034",

                expression:
                  "in a confusing way",

                meaning:
                  "分かりにくい方法で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Some learners may also depend too heavily on stronger classmates instead of attempting problems themselves.",

            ja:
              "また、自分で問題に取り組む代わりに、理解の進んでいる同級生に頼りすぎる学習者もいるかもしれません。",

            notes: [
              {
                id:
                  "q10_original_017_note_035",

                expression:
                  "depend too heavily on",

                meaning:
                  "～に頼りすぎる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_036",

                expression:
                  "attempt a problem",

                meaning:
                  "問題に取り組む",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_037",

                expression:
                  "instead of doing",

                meaning:
                  "～する代わりに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "For the activity to succeed, students must be {{d}} to listen, ask questions, and correct their mistakes.",

            ja:
              "活動を成功させるためには、生徒が進んで話を聞き、質問し、自分の間違いを直そうとする必要があります。",

            notes: [
              {
                id:
                  "q10_original_017_note_038",

                expression:
                  "for A to do",

                meaning:
                  "Aが～するためには",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_039",

                expression:
                  "be willing to do",

                meaning:
                  "進んで～する、～する意思がある",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_040",

                expression:
                  "correct one's mistakes",

                meaning:
                  "自分の間違いを直す",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Teachers should check students' explanations {{e}} misunderstandings do not remain uncorrected.",

            ja:
              "誤解が訂正されないまま残らないように、教師は生徒の説明を確認するべきです。",

            notes: [
              {
                id:
                  "q10_original_017_note_041",

                expression:
                  "in order that",

                meaning:
                  "～するために、～するように",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_042",

                expression:
                  "misunderstanding",

                meaning:
                  "誤解",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_043",

                expression:
                  "remain uncorrected",

                meaning:
                  "訂正されないまま残る",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "When it is carefully planned, peer teaching can strengthen both the student who explains and the student who listens.",

            ja:
              "教え合う学習は、慎重に計画されれば、説明する生徒と聞く生徒の両方の力を伸ばすことができます。",

            notes: [
              {
                id:
                  "q10_original_017_note_044",

                expression:
                  "be carefully planned",

                meaning:
                  "慎重に計画される",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_045",

                expression:
                  "strengthen",

                meaning:
                  "～を強くする、～の力を伸ばす",

                weakEligible: true
              },

              {
                id:
                  "q10_original_017_note_046",

                expression:
                  "both A and B",

                meaning:
                  "AとBの両方",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "based on"
          },

          {
            id: "a2",
            text: "different from"
          },

          {
            id: "a3",
            text: "known for"
          },

          {
            id: "a4",
            text: "satisfied with"
          }
        ],

        answer: "a1",

        explanation:
          "分かりやすい説明には、正確な情報と論理的な順序が土台として必要だという内容です。be based on Aで「Aに基づいている」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "正確な情報や論理的な順序と異なっていなければならない、という不自然な意味になります。",

          a3:
            "be known forは「～で知られている」という意味で、説明の根拠を表しません。",

          a4:
            "説明が正確な情報に満足しているという意味になり、不自然です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "have"
          },

          {
            id: "b2",
            text: "keep"
          },

          {
            id: "b3",
            text: "prevent"
          },

          {
            id: "b4",
            text: "suggest"
          }
        ],

        answer: "b1",

        explanation:
          "教師が一人の生徒に難しい点を説明してもらうという内容です。have A doで「Aに～してもらう」「Aに～させる」という使役構文になります。",

        wrongChoiceReasons: {
          b2:
            "keep A doingなら「Aに～させ続ける」という形ですが、keep A explainとはできません。",

          b3:
            "prevent A from doingの形が必要です。また、生徒が説明するのを妨げる内容ではありません。",

          b4:
            "suggestはsuggest that A doなどの形で用います。suggest A explainという形にはできません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "Consequently"
          },

          {
            id: "c2",
            text: "For instance"
          },

          {
            id: "c3",
            text: "In contrast"
          },

          {
            id: "c4",
            text: "Meanwhile"
          }
        ],

        answer: "c1",

        explanation:
          "同年代の生徒が互いの経験に近い例を使う結果として、別の生徒による説明のほうが理解しやすくなる場合があると述べています。Consequentlyは「その結果」「したがって」という意味です。",

        wrongChoiceReasons: {
          c2:
            "後ろの文は、前の内容の具体例ではなく、そこから生じる結果です。",

          c3:
            "前後を対比しているのではなく、原因と結果の関係を示しています。",

          c4:
            "二つの出来事が同時に進行していることを表す文ではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "able"
          },

          {
            id: "d2",
            text: "likely"
          },

          {
            id: "d3",
            text: "ready"
          },

          {
            id: "d4",
            text: "willing"
          }
        ],

        answer: "d4",

        explanation:
          "活動を成功させるには、生徒が自ら進んで聞いたり質問したりする姿勢が必要だという内容です。be willing to doで「進んで～する」「～する意思がある」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "be able to doは能力を表しますが、ここで重視されているのは、できるかどうかではなく、進んで取り組む意思です。",

          d2:
            "be likely to doは「～する可能性が高い」という意味で、必要な姿勢を表しません。",

          d3:
            "be ready to doは「～する準備ができている」という意味ですが、継続的に協力しようとする意思を表すwillingのほうが適切です。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "as though"
          },

          {
            id: "e2",
            text: "even if"
          },

          {
            id: "e3",
            text: "in order that"
          },

          {
            id: "e4",
            text: "now that"
          }
        ],

        answer: "e3",

        explanation:
          "誤解が訂正されないまま残ることを防ぐ目的で、教師が説明を確認するという内容です。in order that S Vで「Sが～するように」「～するために」という目的を表します。",

        wrongChoiceReasons: {
          e1:
            "as thoughは「まるで～であるかのように」という意味で、確認する目的を表せません。",

          e2:
            "even ifでは「たとえ誤解が残らなくても」という譲歩になり、文脈に合いません。",

          e4:
            "now thatは「今や～なので」という理由を表しますが、ここでは確認する目的が必要です。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 18
  // Using Smartphones in the Classroom
  // =========================================================
  {
    id: "q10_original_018",
    number: 18,
    sourceType: "original",

    title: "Using Smartphones in the Classroom",
    titleJa: "授業中のスマートフォン利用",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Smartphones are now part of everyday life for many students.",

            ja:
              "スマートフォンは現在、多くの生徒にとって日常生活の一部となっています。",

            notes: [
              {
                id:
                  "q10_original_018_note_001",

                expression:
                  "be part of everyday life",

                meaning:
                  "日常生活の一部である",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "They are used for communication, entertainment, shopping, and finding information.",

            ja:
              "スマートフォンは、連絡、娯楽、買い物、情報検索などに使われています。",

            notes: [
              {
                id:
                  "q10_original_018_note_002",

                expression:
                  "be used for",

                meaning:
                  "～のために使われる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_003",

                expression:
                  "find information",

                meaning:
                  "情報を探す",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Because students already carry these devices, some schools allow them to be used during lessons.",

            ja:
              "生徒がすでにこれらの機器を持ち歩いているため、授業中の利用を認めている学校もあります。",

            notes: [
              {
                id:
                  "q10_original_018_note_004",

                expression:
                  "carry a device",

                meaning:
                  "機器を持ち歩く",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_005",

                expression:
                  "during a lesson",

                meaning:
                  "授業中に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Supporters argue that smartphones can become useful learning tools when they are used for a clear purpose.",

            ja:
              "賛成する人々は、明確な目的のために使われれば、スマートフォンは役立つ学習道具になり得ると主張しています。",

            notes: [
              {
                id:
                  "q10_original_018_note_006",

                expression:
                  "supporter",

                meaning:
                  "賛成する人、支持者",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_007",

                expression:
                  "for a clear purpose",

                meaning:
                  "明確な目的のために",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "One advantage is that students can quickly {{a}} information related to a lesson.",

            ja:
              "利点の一つは、生徒が授業に関係する情報へすぐにアクセスできることです。",

            notes: [
              {
                id:
                  "q10_original_018_note_008",

                expression:
                  "access information",

                meaning:
                  "情報にアクセスする、情報を利用する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_009",

                expression:
                  "be related to",

                meaning:
                  "～に関係している",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "They may look up an unfamiliar word, check a historical date, or search for an image that supports an explanation.",

            ja:
              "分からない単語を調べたり、歴史上の日付を確認したり、説明を補う画像を探したりできます。",

            notes: [
              {
                id:
                  "q10_original_018_note_010",

                expression:
                  "look up a word",

                meaning:
                  "単語を調べる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_011",

                expression:
                  "historical date",

                meaning:
                  "歴史上の日付",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_012",

                expression:
                  "support an explanation",

                meaning:
                  "説明を補う、裏づける",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Teachers can also ask students to answer online questions and view the class results immediately.",

            ja:
              "教師は生徒にオンライン上の質問へ回答させ、学級全体の結果をすぐに確認することもできます。",

            notes: [
              {
                id:
                  "q10_original_018_note_013",

                expression:
                  "answer an online question",

                meaning:
                  "オンライン上の質問に答える",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_014",

                expression:
                  "view the results",

                meaning:
                  "結果を確認する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_015",

                expression:
                  "immediately",

                meaning:
                  "すぐに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Language learners may {{b}} recording functions to practice speaking and listen to their own pronunciation.",

            ja:
              "語学学習者は、録音機能を活用して、話す練習をしたり、自分の発音を聞いたりできます。",

            notes: [
              {
                id:
                  "q10_original_018_note_016",

                expression:
                  "make use of",

                meaning:
                  "～を活用する",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_017",

                expression:
                  "recording function",

                meaning:
                  "録音機能",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_018",

                expression:
                  "one's own pronunciation",

                meaning:
                  "自分自身の発音",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "These activities can give students immediate information about their understanding and performance.",

            ja:
              "こうした活動によって、生徒は自分の理解度や出来具合について、すぐに情報を得られます。",

            notes: [
              {
                id:
                  "q10_original_018_note_019",

                expression:
                  "give A information about B",

                meaning:
                  "AにBについての情報を与える",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_020",

                expression:
                  "performance",

                meaning:
                  "出来具合、成果",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Smartphones can also create serious distractions.",

            ja:
              "一方で、スマートフォンは学習の妨げになることもあります。",

            notes: [
              {
                id:
                  "q10_original_018_note_021",

                expression:
                  "create a distraction",

                meaning:
                  "注意をそらす原因を生み出す",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Messages, games, videos, and social media can draw attention away from the lesson.",

            ja:
              "メッセージ、ゲーム、動画、SNSなどによって、授業から注意がそれる可能性があります。",

            notes: [
              {
                id:
                  "q10_original_018_note_022",

                expression:
                  "draw attention away from",

                meaning:
                  "～から注意をそらす",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_023",

                expression:
                  "social media",

                meaning:
                  "SNS、ソーシャルメディア",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Even a short notification may interrupt a student's concentration.",

            ja:
              "短い通知であっても、生徒の集中を途切れさせる場合があります。",

            notes: [
              {
                id:
                  "q10_original_018_note_024",

                expression:
                  "notification",

                meaning:
                  "通知",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_025",

                expression:
                  "interrupt one's concentration",

                meaning:
                  "人の集中を途切れさせる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "After checking one message, a learner may continue using the phone for something unrelated to schoolwork.",

            ja:
              "一つのメッセージを確認した後、学習とは関係のない目的でスマートフォンを使い続けることもあります。",

            notes: [
              {
                id:
                  "q10_original_018_note_026",

                expression:
                  "continue doing",

                meaning:
                  "～し続ける",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_027",

                expression:
                  "be unrelated to",

                meaning:
                  "～と関係がない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "Students therefore need clear instructions about when and how their phones may be used.",

            ja:
              "そのため、生徒には、いつ、どのようにスマートフォンを使ってよいかについて明確な指示が必要です。",

            notes: [
              {
                id:
                  "q10_original_018_note_028",

                expression:
                  "clear instructions about",

                meaning:
                  "～についての明確な指示",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "{{c}}, a learning activity can easily turn into personal phone use.",

            ja:
              "そうでなければ、学習活動が簡単に個人的なスマートフォン利用へ変わってしまう可能性があります。",

            notes: [
              {
                id:
                  "q10_original_018_note_029",

                expression:
                  "otherwise",

                meaning:
                  "そうでなければ",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_030",

                expression:
                  "turn into",

                meaning:
                  "～に変わる",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_031",

                expression:
                  "personal phone use",

                meaning:
                  "個人的なスマートフォン利用",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "Fairness is another issue schools must consider.",

            ja:
              "公平性も、学校が考慮しなければならない問題です。",

            notes: [
              {
                id:
                  "q10_original_018_note_032",

                expression:
                  "fairness",

                meaning:
                  "公平性",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_033",

                expression:
                  "an issue to consider",

                meaning:
                  "考慮すべき問題",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Some students own new devices with fast connections, while others have older phones or limited data.",

            ja:
              "高速通信ができる新しい端末を持つ生徒もいれば、古いスマートフォンや限られた通信量しかない生徒もいます。",

            notes: [
              {
                id:
                  "q10_original_018_note_034",

                expression:
                  "fast connection",

                meaning:
                  "高速な通信接続",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_035",

                expression:
                  "limited data",

                meaning:
                  "限られた通信量",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Other students may own {{d}} a smartphone nor another device that can connect to the Internet.",

            ja:
              "スマートフォンも、インターネットに接続できる別の端末も持っていない生徒もいるかもしれません。",

            notes: [
              {
                id:
                  "q10_original_018_note_036",

                expression:
                  "neither A nor B",

                meaning:
                  "AもBもどちらも～ない",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_037",

                expression:
                  "connect to the Internet",

                meaning:
                  "インターネットに接続する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "A lesson should not depend on students bringing expensive equipment from home.",

            ja:
              "授業は、生徒が家庭から高価な機器を持ってくることを前提にするべきではありません。",

            notes: [
              {
                id:
                  "q10_original_018_note_038",

                expression:
                  "depend on A doing",

                meaning:
                  "Aが～することに頼る",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_039",

                expression:
                  "expensive equipment",

                meaning:
                  "高価な機器",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "If smartphones are necessary for an activity, classrooms should be {{e}} devices that every student can use.",

            ja:
              "活動にスマートフォンが必要であるならば、教室にはすべての生徒が使える端末を備えるべきです。",

            notes: [
              {
                id:
                  "q10_original_018_note_040",

                expression:
                  "be equipped with",

                meaning:
                  "～を備えている",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_041",

                expression:
                  "be necessary for",

                meaning:
                  "～に必要である",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Schools may also offer printed materials or other choices for students who cannot use a phone.",

            ja:
              "また、スマートフォンを使えない生徒のために、印刷物や別の選択肢を用意することもできます。",

            notes: [
              {
                id:
                  "q10_original_018_note_042",

                expression:
                  "printed material",

                meaning:
                  "印刷された教材、印刷物",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_043",

                expression:
                  "offer another choice",

                meaning:
                  "別の選択肢を提供する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "Smartphones can support learning, but their value depends on clear rules, equal access, and thoughtful lesson design.",

            ja:
              "スマートフォンは学習を支援できますが、その価値は、明確な規則、公平な利用環境、慎重な授業設計に左右されます。",

            notes: [
              {
                id:
                  "q10_original_018_note_044",

                expression:
                  "equal access",

                meaning:
                  "公平な利用環境、平等なアクセス",

                weakEligible: true
              },

              {
                id:
                  "q10_original_018_note_045",

                expression:
                  "thoughtful lesson design",

                meaning:
                  "十分に考えられた授業設計",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "access"
          },

          {
            id: "a2",
            text: "deliver"
          },

          {
            id: "a3",
            text: "prevent"
          },

          {
            id: "a4",
            text: "refuse"
          }
        ],

        answer: "a1",

        explanation:
          "スマートフォンを使って、授業に関係する情報をすぐに利用できるという内容です。access informationで「情報にアクセスする」「情報を利用する」という意味になります。accessは他動詞なので、直後にinformationを置きます。",

        wrongChoiceReasons: {
          a2:
            "deliver informationは「情報を届ける」という意味ですが、ここでは生徒が情報を受け取って利用することを述べています。",

          a3:
            "prevent informationでは「情報を妨げる」という不自然な意味になります。",

          a4:
            "refuse informationでは「情報を拒否する」という意味になり、授業で情報を調べる文脈と反対です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "catch up with"
          },

          {
            id: "b2",
            text: "get rid of"
          },

          {
            id: "b3",
            text: "make use of"
          },

          {
            id: "b4",
            text: "run out of"
          }
        ],

        answer: "b3",

        explanation:
          "語学学習者がスマートフォンの録音機能を活用するという内容です。make use of Aで「Aを活用する」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "catch up withは「～に追いつく」という意味で、録音機能を利用することを表せません。",

          b2:
            "get rid ofは「～を取り除く」という意味で、録音機能をなくすことになってしまいます。",

          b4:
            "run out ofは「～を使い果たす」という意味で、機能を学習に利用する文脈には合いません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "Besides"
          },

          {
            id: "c2",
            text: "Otherwise"
          },

          {
            id: "c3",
            text: "Similarly"
          },

          {
            id: "c4",
            text: "Specifically"
          }
        ],

        answer: "c2",

        explanation:
          "直前では、スマートフォンを使う時期や方法について明確な指示が必要だと述べています。そのような指示がなければ、学習活動が個人的な利用に変わる可能性があるため、Otherwiseが適切です。",

        wrongChoiceReasons: {
          c1:
            "Besidesは「その上」という追加を表しますが、ここでは指示がない場合の悪い結果を示しています。",

          c3:
            "前後に似た事例を並べているのではありません。",

          c4:
            "Specificallyは「具体的には」という意味ですが、後ろの文は明確な指示の具体的内容ではなく、指示がない場合の結果です。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "both"
          },

          {
            id: "d2",
            text: "either"
          },

          {
            id: "d3",
            text: "neither"
          },

          {
            id: "d4",
            text: "whether"
          }
        ],

        answer: "d3",

        explanation:
          "後ろにnorがあるため、neither A nor Bで「AもBもどちらも～ない」という相関表現になります。スマートフォンも別の端末も所有していない生徒がいるという内容です。",

        wrongChoiceReasons: {
          d1:
            "bothはboth A and Bの形で使います。both A nor Bとはできません。",

          d2:
            "eitherはeither A or Bの形で使います。either A nor Bとはできません。",

          d4:
            "whetherはwhether A or Bの形で「AかBか」を表します。norとは組み合わせません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "connected to"
          },

          {
            id: "e2",
            text: "equipped with"
          },

          {
            id: "e3",
            text: "known for"
          },

          {
            id: "e4",
            text: "responsible for"
          }
        ],

        answer: "e2",

        explanation:
          "活動に端末が必要ならば、教室側がすべての生徒が使える端末を備えるべきだという内容です。be equipped with Aで「Aを備えている」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "be connected to devicesでは「端末に接続されている」という意味になり、教室内に端末を用意することを表しません。",

          e3:
            "be known for devicesでは「端末で知られている」という意味になり、必要な設備を表しません。",

          e4:
            "be responsible for devicesでは「端末に責任を負う」という意味になり、教室が端末を備えていることを表せません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 19
  // Sleep and Learning Performance
  // =========================================================
  {
    id: "q10_original_019",
    number: 19,
    sourceType: "original",

    title: "Sleep and Learning Performance",
    titleJa: "睡眠と学習成果",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Sleep is often treated as time when the body and brain are doing very little.",

            ja:
              "睡眠は、身体や脳がほとんど何もしていない時間だと考えられがちです。",

            notes: [
              {
                id: "q10_original_019_note_001",

                expression:
                  "be treated as",

                meaning:
                  "～として扱われる、～と考えられる",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_002",

                expression:
                  "do very little",

                meaning:
                  "ほとんど何もしない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "In reality, important mental and physical processes continue while a person is asleep.",

            ja:
              "実際には、人が眠っている間にも、重要な精神的・身体的働きは続いています。",

            notes: [
              {
                id: "q10_original_019_note_003",

                expression:
                  "in reality",

                meaning:
                  "実際には",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_004",

                expression:
                  "mental and physical processes",

                meaning:
                  "精神的・身体的な働き",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "The brain continues to organize information, while the body repairs itself and prepares for the next day.",

            ja:
              "脳は情報を整理し続け、身体は自らを修復して翌日に備えます。",

            notes: [
              {
                id: "q10_original_019_note_005",

                expression:
                  "organize information",

                meaning:
                  "情報を整理する",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_006",

                expression:
                  "repair itself",

                meaning:
                  "自らを修復する",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_007",

                expression:
                  "prepare for",

                meaning:
                  "～に備える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "For students, getting enough sleep can influence both health and learning performance.",

            ja:
              "生徒にとって、十分な睡眠を取ることは、健康と学習成果の両方に影響を与えます。",

            notes: [
              {
                id: "q10_original_019_note_008",

                expression:
                  "influence",

                meaning:
                  "～に影響を与える",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_009",

                expression:
                  "learning performance",

                meaning:
                  "学習成果、学習の出来具合",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Adequate sleep can help students remain active and alert during lessons.",

            ja:
              "十分な睡眠は、生徒が授業中に活発で注意力のある状態を保つ助けになります。",

            notes: [
              {
                id: "q10_original_019_note_010",

                expression:
                  "adequate sleep",

                meaning:
                  "十分な睡眠",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_011",

                expression:
                  "remain active and alert",

                meaning:
                  "活発で注意力のある状態を保つ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "A well-rested learner is better able to {{a}} an explanation or a difficult task.",

            ja:
              "十分に休息を取った学習者は、説明や難しい課題により集中できます。",

            notes: [
              {
                id: "q10_original_019_note_012",

                expression:
                  "well-rested",

                meaning:
                  "十分に休息を取った",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_013",

                expression:
                  "concentrate on",

                meaning:
                  "～に集中する",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_014",

                expression:
                  "be better able to do",

                meaning:
                  "よりうまく～することができる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Such students may also respond more quickly to questions and make fewer careless mistakes.",

            ja:
              "そのような生徒は、質問により速く反応し、不注意による間違いも少なくなる可能性があります。",

            notes: [
              {
                id: "q10_original_019_note_015",

                expression:
                  "respond to a question",

                meaning:
                  "質問に反応する、答える",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_016",

                expression:
                  "make a careless mistake",

                meaning:
                  "不注意による間違いをする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Sleep also appears to {{b}} remembering information learned during the day.",

            ja:
              "また睡眠は、日中に学んだ情報を記憶することに役割を果たすと考えられています。",

            notes: [
              {
                id: "q10_original_019_note_017",

                expression:
                  "appear to do",

                meaning:
                  "～するように見える、～すると考えられる",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_018",

                expression:
                  "play a role in doing",

                meaning:
                  "～することに役割を果たす",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_019",

                expression:
                  "information learned during the day",

                meaning:
                  "日中に学んだ情報",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "While a person sleeps, new information may become connected with knowledge already stored in the brain.",

            ja:
              "人が眠っている間に、新しい情報が、すでに脳に蓄えられている知識と結びつく場合があります。",

            notes: [
              {
                id: "q10_original_019_note_020",

                expression:
                  "become connected with",

                meaning:
                  "～と結びつく",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_021",

                expression:
                  "be stored in the brain",

                meaning:
                  "脳に蓄えられている",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "A shortage of sleep can have the opposite effect.",

            ja:
              "睡眠不足は、反対の影響をもたらす可能性があります。",

            notes: [
              {
                id: "q10_original_019_note_022",

                expression:
                  "a shortage of",

                meaning:
                  "～の不足",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_023",

                expression:
                  "have the opposite effect",

                meaning:
                  "反対の影響を与える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Tired learners may read the same sentence several times without understanding it clearly.",

            ja:
              "疲れた学習者は、同じ文を何度も読んでも、はっきり理解できないことがあります。",

            notes: [
              {
                id: "q10_original_019_note_024",

                expression:
                  "several times",

                meaning:
                  "数回、何度も",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_025",

                expression:
                  "without doing",

                meaning:
                  "～せずに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "They may forget instructions, lose interest quickly, or react emotionally to small problems.",

            ja:
              "指示を忘れたり、すぐに興味を失ったり、小さな問題に感情的に反応したりする場合もあります。",

            notes: [
              {
                id: "q10_original_019_note_026",

                expression:
                  "forget instructions",

                meaning:
                  "指示を忘れる",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_027",

                expression:
                  "lose interest",

                meaning:
                  "興味を失う",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_028",

                expression:
                  "react emotionally to",

                meaning:
                  "～に感情的に反応する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "{{c}}, staying awake for extra study time may reduce the value of the study itself.",

            ja:
              "実際、勉強時間を増やすために起き続けることで、その勉強自体の効果が低下する場合があります。",

            notes: [
              {
                id: "q10_original_019_note_029",

                expression:
                  "in fact",

                meaning:
                  "実際、実のところ",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_030",

                expression:
                  "stay awake",

                meaning:
                  "起きた状態でいる",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_031",

                expression:
                  "reduce the value of",

                meaning:
                  "～の価値や効果を低下させる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "The additional hour may seem useful, but a tired student may learn less during that time.",

            ja:
              "追加の一時間は役立つように思えますが、疲れた生徒はその時間に学べる量が少なくなるかもしれません。",

            notes: [
              {
                id: "q10_original_019_note_032",

                expression:
                  "additional hour",

                meaning:
                  "追加の一時間",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_033",

                expression:
                  "learn less",

                meaning:
                  "学べる量が少ない",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s15",

            en:
              "Good sleep habits require more than simply going to bed early once or twice.",

            ja:
              "よい睡眠習慣を身につけるには、単に一度か二度早く寝るだけでは不十分です。",

            notes: [
              {
                id: "q10_original_019_note_034",

                expression:
                  "sleep habit",

                meaning:
                  "睡眠習慣",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_035",

                expression:
                  "more than simply doing",

                meaning:
                  "単に～する以上のこと",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "Students should try to keep similar sleeping and waking times throughout the week.",

            ja:
              "生徒は一週間を通して、就寝時刻と起床時刻をできるだけ一定に保つべきです。",

            notes: [
              {
                id: "q10_original_019_note_036",

                expression:
                  "sleeping and waking times",

                meaning:
                  "就寝時刻と起床時刻",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_037",

                expression:
                  "throughout the week",

                meaning:
                  "一週間を通して",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "They may also sleep better if they avoid bright screens, heavy meals, and drinks containing caffeine shortly before bedtime.",

            ja:
              "また、就寝直前に明るい画面、量の多い食事、カフェインを含む飲み物を避ければ、よりよく眠れる可能性があります。",

            notes: [
              {
                id: "q10_original_019_note_038",

                expression:
                  "contain caffeine",

                meaning:
                  "カフェインを含む",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_039",

                expression:
                  "shortly before bedtime",

                meaning:
                  "就寝時刻の少し前に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Sleeping much longer on weekends cannot always {{e}} several nights of insufficient sleep.",

            ja:
              "週末に大幅に長く眠っても、数日間の睡眠不足を必ず埋め合わせられるとは限りません。",

            notes: [
              {
                id: "q10_original_019_note_040",

                expression:
                  "make up for",

                meaning:
                  "～を埋め合わせる、～を補う",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_041",

                expression:
                  "insufficient sleep",

                meaning:
                  "不十分な睡眠、睡眠不足",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "{{d}} carefully students plan their study, they cannot perform at their best without adequate rest.",

            ja:
              "生徒がどれほど注意深く学習計画を立てても、十分な休息がなければ最高の力を発揮することはできません。",

            notes: [
              {
                id: "q10_original_019_note_042",

                expression:
                  "no matter how＋形容詞・副詞",

                meaning:
                  "どれほど～であっても",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_043",

                expression:
                  "plan one's study",

                meaning:
                  "学習計画を立てる",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_044",

                expression:
                  "perform at one's best",

                meaning:
                  "最高の力を発揮する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Sleep should therefore be regarded as part of effective learning rather than time taken away from it.",

            ja:
              "したがって睡眠は、学習時間を奪うものではなく、効果的な学習の一部と考えるべきです。",

            notes: [
              {
                id: "q10_original_019_note_045",

                expression:
                  "be regarded as",

                meaning:
                  "～とみなされる",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_046",

                expression:
                  "effective learning",

                meaning:
                  "効果的な学習",

                weakEligible: true
              },

              {
                id: "q10_original_019_note_047",

                expression:
                  "time taken away from",

                meaning:
                  "～から奪われた時間",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "concentrate on"
          },

          {
            id: "a2",
            text: "depend on"
          },

          {
            id: "a3",
            text: "give up"
          },

          {
            id: "a4",
            text: "prepare for"
          }
        ],

        answer: "a1",

        explanation:
          "十分に休息を取った学習者は、説明や難しい課題に集中しやすいという内容です。concentrate on Aで「Aに集中する」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "depend onは「～に頼る、～次第である」という意味で、説明や課題へ注意を向けることを表しません。",

          a3:
            "give upは「～を諦める」という意味で、十分に休んだ場合の学習行動とは反対です。",

          a4:
            "prepare forは「～に備える」という意味です。説明を聞いている最中の集中を表す文脈には合いません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "come from"
          },

          {
            id: "b2",
            text: "interfere with"
          },

          {
            id: "b3",
            text: "play a role in"
          },

          {
            id: "b4",
            text: "take the place of"
          }
        ],

        answer: "b3",

        explanation:
          "睡眠が、日中に学んだ内容を記憶する過程で重要な働きをするという内容です。play a role in doingで「～することに役割を果たす」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "come fromは「～から生じる」という意味です。睡眠が記憶から生じるという関係にはなりません。",

          b2:
            "interfere withは「～を妨げる」という意味で、本文が述べる睡眠のよい働きとは反対です。",

          b4:
            "take the place ofは「～に取って代わる」という意味です。睡眠が記憶そのものに取って代わるわけではありません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For instance"
          },

          {
            id: "c2",
            text: "In fact"
          },

          {
            id: "c3",
            text: "Meanwhile"
          },

          {
            id: "c4",
            text: "On the contrary"
          }
        ],

        answer: "c2",

        explanation:
          "前では睡眠不足によって理解や集中が低下すると述べています。続く文では、勉強時間を増やすための夜更かしが、実際には勉強の効果を下げることを強調しているため、In factが適切です。",

        wrongChoiceReasons: {
          c1:
            "後ろの内容を睡眠不足の具体例と見ることもできますが、ここでは『勉強時間を増やす行動が逆に学習効果を下げる』という意外な事実を強調しています。",

          c3:
            "二つの出来事が同時に進んでいることを示しているわけではありません。",

          c4:
            "On the contraryは直前の内容を否定して正反対の内容を示す表現です。後ろの文は直前の内容を否定せず、さらに強めています。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "Even if"
          },

          {
            id: "d2",
            text: "No matter how"
          },

          {
            id: "d3",
            text: "Now that"
          },

          {
            id: "d4",
            text: "So long as"
          }
        ],

        answer: "d2",

        explanation:
          "『どれほど注意深く学習計画を立てても』という譲歩を表しています。no matter how＋形容詞・副詞＋S＋Vで「どれほど～であっても」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "Even ifの後ろには主語と動詞が続きます。Even if carefully students planという語順にはできません。",

          d3:
            "Now thatは「今や～なので」という理由を表し、十分な休息が必要だという譲歩の意味を作れません。",

          d4:
            "So long asは「～する限り」という条件を表します。後ろのcarefullyを導くこともできず、本文の意味にも合いません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "catch up with"
          },

          {
            id: "e2",
            text: "look forward to"
          },

          {
            id: "e3",
            text: "make up for"
          },

          {
            id: "e4",
            text: "put up with"
          }
        ],

        answer: "e3",

        explanation:
          "週末に長く眠ることによって、それまでの睡眠不足を補えるかどうかを述べています。make up for Aで「Aを埋め合わせる」「Aを補う」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "catch up withは、人や進度に「追いつく」という意味です。睡眠不足を埋め合わせるという意味にはなりません。",

          e2:
            "look forward toは「～を楽しみにする」という意味で、睡眠不足との組合せは不自然です。",

          e4:
            "put up withは「～を我慢する」という意味です。睡眠不足を補うこととは異なります。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 20
  // Walking for Short Trips
  // =========================================================
  {
    id: "q10_original_020",
    number: 20,
    sourceType: "original",

    title: "Walking for Short Trips",
    titleJa: "近距離の移動に歩くこと",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Many people use cars, buses, or trains even when their destination is not very far away.",

            ja:
              "多くの人は、目的地がそれほど遠くなくても、自動車、バス、電車を利用します。",

            notes: [
              {
                id: "q10_original_020_note_001",

                expression:
                  "even when",

                meaning:
                  "～の場合でさえ、～のときでも",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_002",

                expression:
                  "destination",

                meaning:
                  "目的地",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "These forms of transportation may seem faster and more comfortable than walking.",

            ja:
              "こうした交通手段は、歩くよりも速く快適に思える場合があります。",

            notes: [
              {
                id: "q10_original_020_note_003",

                expression:
                  "form of transportation",

                meaning:
                  "交通手段",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_004",

                expression:
                  "seem＋形容詞",

                meaning:
                  "～のように思える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "However, waiting for a bus, finding a parking space, or walking from a station can also take time.",

            ja:
              "しかし、バスを待ったり、駐車場所を探したり、駅から歩いたりすることにも時間がかかります。",

            notes: [
              {
                id: "q10_original_020_note_005",

                expression:
                  "find a parking space",

                meaning:
                  "駐車場所を見つける",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_006",

                expression:
                  "take time",

                meaning:
                  "時間がかかる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "For a place that is {{a}} walking distance, traveling on foot may be a practical choice.",

            ja:
              "歩いて行ける距離にある場所なら、徒歩で移動することが実用的な選択になる場合があります。",

            notes: [
              {
                id: "q10_original_020_note_007",

                expression:
                  "within walking distance",

                meaning:
                  "歩いて行ける距離に",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_008",

                expression:
                  "travel on foot",

                meaning:
                  "徒歩で移動する",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_009",

                expression:
                  "a practical choice",

                meaning:
                  "実用的な選択",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Walking regularly can support physical health in several ways.",

            ja:
              "定期的に歩くことは、いくつかの面で身体の健康を支えることができます。",

            notes: [
              {
                id: "q10_original_020_note_010",

                expression:
                  "support physical health",

                meaning:
                  "身体の健康を支える",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_011",

                expression:
                  "in several ways",

                meaning:
                  "いくつかの方法で、いくつかの面で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Even a short walk requires the body to use muscles and energy.",

            ja:
              "短い距離を歩くだけでも、身体は筋肉とエネルギーを使います。",

            notes: [
              {
                id: "q10_original_020_note_012",

                expression:
                  "require A to do",

                meaning:
                  "Aが～することを必要とする",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_013",

                expression:
                  "use muscles and energy",

                meaning:
                  "筋肉とエネルギーを使う",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "People who walk as part of their daily routine may {{b}} improved strength and better blood flow.",

            ja:
              "日常生活の一部として歩く人は、筋力の向上や血流の改善から恩恵を受ける可能性があります。",

            notes: [
              {
                id: "q10_original_020_note_014",

                expression:
                  "as part of",

                meaning:
                  "～の一部として",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_015",

                expression:
                  "benefit from",

                meaning:
                  "～から恩恵を受ける",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_016",

                expression:
                  "blood flow",

                meaning:
                  "血流",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Walking can also provide a short break from sitting at a desk or looking at a screen.",

            ja:
              "歩くことは、机に座ったり画面を見たりする状態から、短時間離れる機会にもなります。",

            notes: [
              {
                id: "q10_original_020_note_017",

                expression:
                  "provide a break from",

                meaning:
                  "～から離れて休む機会を与える",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_018",

                expression:
                  "sit at a desk",

                meaning:
                  "机に座る",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "Some people find that a walk helps them relax, organize their thoughts, or improve their mood.",

            ja:
              "歩くことで気持ちが落ち着いたり、考えが整理されたり、気分がよくなったりすると感じる人もいます。",

            notes: [
              {
                id: "q10_original_020_note_019",

                expression:
                  "organize one's thoughts",

                meaning:
                  "考えを整理する",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_020",

                expression:
                  "improve one's mood",

                meaning:
                  "気分をよくする",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Choosing to walk can also affect the local environment.",

            ja:
              "歩くことを選ぶことは、地域の環境にも影響を与えます。",

            notes: [
              {
                id: "q10_original_020_note_021",

                expression:
                  "choose to do",

                meaning:
                  "～することを選ぶ",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_022",

                expression:
                  "local environment",

                meaning:
                  "地域の環境",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "A person who walks does not burn fuel or produce exhaust during the trip.",

            ja:
              "徒歩で移動する人は、移動中に燃料を燃やしたり、排気ガスを出したりしません。",

            notes: [
              {
                id: "q10_original_020_note_023",

                expression:
                  "burn fuel",

                meaning:
                  "燃料を燃やす",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_024",

                expression:
                  "produce exhaust",

                meaning:
                  "排気ガスを出す",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "One short car journey may produce only a small amount of pollution.",

            ja:
              "一回の短い自動車移動が生み出す汚染は、わずかな量かもしれません。",

            notes: [
              {
                id: "q10_original_020_note_025",

                expression:
                  "car journey",

                meaning:
                  "自動車での移動",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_026",

                expression:
                  "a small amount of",

                meaning:
                  "少量の～",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "When thousands of people make similar trips every day, however, the total effect can become much larger.",

            ja:
              "しかし、何千人もの人が毎日同じような移動をすると、その影響の合計ははるかに大きくなる可能性があります。",

            notes: [
              {
                id: "q10_original_020_note_027",

                expression:
                  "thousands of",

                meaning:
                  "何千もの～",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_028",

                expression:
                  "the total effect",

                meaning:
                  "影響の合計、全体的な影響",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "{{c}}, fewer short car trips can reduce traffic around schools, shops, and residential areas.",

            ja:
              "さらに重要なことに、短距離の自動車移動が減れば、学校、店、住宅地の周辺における交通量を減らせます。",

            notes: [
              {
                id: "q10_original_020_note_029",

                expression:
                  "more importantly",

                meaning:
                  "さらに重要なことに",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_030",

                expression:
                  "reduce traffic",

                meaning:
                  "交通量や混雑を減らす",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_031",

                expression:
                  "residential area",

                meaning:
                  "住宅地",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "Less traffic may make streets quieter and safer for pedestrians and cyclists.",

            ja:
              "交通量が減ることで、歩行者や自転車利用者にとって、道路がより静かで安全になる可能性があります。",

            notes: [
              {
                id: "q10_original_020_note_032",

                expression:
                  "make A quieter and safer",

                meaning:
                  "Aをより静かで安全にする",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_033",

                expression:
                  "pedestrian",

                meaning:
                  "歩行者",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "Walking is not equally easy or safe for everyone.",

            ja:
              "歩くことが、すべての人にとって同じように簡単で安全であるわけではありません。",

            notes: [
              {
                id: "q10_original_020_note_034",

                expression:
                  "not equally",

                meaning:
                  "同じようには～ない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Older people, small children, and people with physical disabilities may face particular difficulties.",

            ja:
              "高齢者、小さな子ども、身体に障害のある人は、それぞれ特有の困難に直面する場合があります。",

            notes: [
              {
                id: "q10_original_020_note_035",

                expression:
                  "physical disability",

                meaning:
                  "身体障害",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_036",

                expression:
                  "face a difficulty",

                meaning:
                  "困難に直面する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Poorly maintained sidewalks, dangerous crossings, steep hills, and bad weather can all discourage walking.",

            ja:
              "整備状態の悪い歩道、危険な横断場所、急な坂、悪天候は、いずれも徒歩での移動をためらわせる原因になります。",

            notes: [
              {
                id: "q10_original_020_note_037",

                expression:
                  "poorly maintained",

                meaning:
                  "整備状態の悪い",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_038",

                expression:
                  "dangerous crossing",

                meaning:
                  "危険な横断場所",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_039",

                expression:
                  "discourage walking",

                meaning:
                  "歩くことをためらわせる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "People are more likely to walk when routes are direct, well lit, and separated from fast-moving traffic.",

            ja:
              "経路が分かりやすく、明るく照らされ、高速で走る車両から分離されている場合、人々は歩く可能性が高くなります。",

            notes: [
              {
                id: "q10_original_020_note_040",

                expression:
                  "direct route",

                meaning:
                  "分かりやすく直接的な経路",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_041",

                expression:
                  "well lit",

                meaning:
                  "十分に照明がある",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_042",

                expression:
                  "be separated from",

                meaning:
                  "～から分離されている",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Local governments may be {{d}} improve sidewalks, add safe crossings, and provide benches along common routes.",

            ja:
              "自治体には、歩道を改善し、安全な横断場所や一般的な経路沿いのベンチを設置することが求められる場合があります。",

            notes: [
              {
                id: "q10_original_020_note_043",

                expression:
                  "be encouraged to do",

                meaning:
                  "～するよう勧められる、促される",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_044",

                expression:
                  "add a safe crossing",

                meaning:
                  "安全な横断場所を設ける",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_045",

                expression:
                  "provide benches",

                meaning:
                  "ベンチを設置する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Individuals can choose to walk for short trips {{e}}, while still using other forms of transportation when necessary.",

            ja:
              "個人は、可能な場合には近距離の移動で歩くことを選び、必要な場合には別の交通手段を使うことができます。",

            notes: [
              {
                id: "q10_original_020_note_046",

                expression:
                  "whenever possible",

                meaning:
                  "可能なときはいつでも、可能な限り",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_047",

                expression:
                  "when necessary",

                meaning:
                  "必要な場合には",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "Walking does not need to replace every journey to become a useful part of a healthier and more sustainable lifestyle.",

            ja:
              "歩くことは、より健康的で持続可能な生活の役立つ一部となるために、すべての移動に取って代わる必要はありません。",

            notes: [
              {
                id: "q10_original_020_note_048",

                expression:
                  "replace every journey",

                meaning:
                  "すべての移動に取って代わる",

                weakEligible: true
              },

              {
                id: "q10_original_020_note_049",

                expression:
                  "sustainable lifestyle",

                meaning:
                  "持続可能な生活様式",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "against"
          },

          {
            id: "a2",
            text: "beyond"
          },

          {
            id: "a3",
            text: "within"
          },

          {
            id: "a4",
            text: "without"
          }
        ],

        answer: "a3",

        explanation:
          "目的地が歩いて行ける距離にある場合について述べています。within walking distanceで「歩いて行ける距離に」という意味になります。",

        wrongChoiceReasons: {
          a1:
            "against walking distanceという表現はありません。",

          a2:
            "beyond walking distanceは「歩いて行ける距離を越えて」という意味になり、徒歩が実用的だという後半と合いません。",

          a4:
            "without walking distanceという語の組合せは成立しません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "benefit from"
          },

          {
            id: "b2",
            text: "deal with"
          },

          {
            id: "b3",
            text: "object to"
          },

          {
            id: "b4",
            text: "recover from"
          }
        ],

        answer: "b1",

        explanation:
          "日常的に歩く人が、筋力や血流の改善というよい影響を受けるという内容です。benefit from Aで「Aから恩恵を受ける」という意味になります。",

        wrongChoiceReasons: {
          b2:
            "deal withは「～に対処する」という意味です。筋力の向上に対処するという内容にはなりません。",

          b3:
            "object toは「～に反対する」という意味で、健康上のよい効果を表しません。",

          b4:
            "recover fromは「病気や困難から回復する」という意味です。improved strengthを回復の対象とするのは不自然です。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "More importantly"
          },

          {
            id: "c2",
            text: "On the contrary"
          },

          {
            id: "c3",
            text: "Previously"
          },

          {
            id: "c4",
            text: "Similarly"
          }
        ],

        answer: "c1",

        explanation:
          "直前では自動車移動による汚染の積み重なりを述べ、続く文では交通量の減少という、さらに広い地域への効果を強調しています。そのため、More importantlyが適切です。",

        wrongChoiceReasons: {
          c2:
            "On the contraryは直前の内容を否定して反対の内容を示しますが、後ろの文は環境上の利点をさらに追加しています。",

          c3:
            "Previouslyは「以前は」という時間関係を表しますが、過去と現在を比較していません。",

          c4:
            "似た別の事例を並べるというより、より重要な効果を追加して強調しています。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "encouraged to"
          },

          {
            id: "d2",
            text: "familiar with"
          },

          {
            id: "d3",
            text: "interested in"
          },

          {
            id: "d4",
            text: "prevented from"
          }
        ],

        answer: "d1",

        explanation:
          "歩きやすい環境を作るため、自治体が歩道の改善などを行うよう促されるという内容です。be encouraged to doで「～するよう勧められる」「～するよう促される」という意味になります。",

        wrongChoiceReasons: {
          d2:
            "be familiar withの後ろには名詞が続きます。familiar with improveとはできません。",

          d3:
            "be interested inの後ろには名詞または動名詞が必要です。interested in improveとはできません。",

          d4:
            "be prevented fromの後ろには動名詞が続きます。また、自治体が改善を妨げられるという内容ではありません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "as soon as"
          },

          {
            id: "e2",
            text: "even though"
          },

          {
            id: "e3",
            text: "whenever possible"
          },

          {
            id: "e4",
            text: "without delay"
          }
        ],

        answer: "e3",

        explanation:
          "常に歩くのではなく、歩くことが可能な場合には近距離を徒歩で移動するという内容です。whenever possibleで「可能なときはいつでも」「可能な限り」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "as soon asは「～するとすぐに」という意味ですが、後ろに節がなく、可能な場合という条件も表せません。",

          e2:
            "even thoughは「～にもかかわらず」という接続詞であり、後ろに主語と動詞が必要です。",

          e4:
            "without delayは「遅れることなく」という意味で、歩くことが可能な状況を表しません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 21
  // Eating Breakfast Before School
  // =========================================================
  {
    id: "q10_original_021",
    number: 21,
    sourceType: "original",

    title: "Eating Breakfast Before School",
    titleJa: "登校前に朝食を食べること",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Many students begin their school day without eating breakfast.",

            ja:
              "多くの生徒が、朝食を食べずに学校生活を始めています。",

            notes: [
              {
                id: "q10_original_021_note_001",

                expression:
                  "begin one's school day",

                meaning:
                  "学校での一日を始める",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_002",

                expression:
                  "without doing",

                meaning:
                  "～せずに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Some are not hungry in the morning, while others do not have enough time to prepare a meal.",

            ja:
              "朝は空腹を感じない生徒もいれば、食事を準備する十分な時間がない生徒もいます。",

            notes: [
              {
                id: "q10_original_021_note_003",

                expression:
                  "be hungry",

                meaning:
                  "空腹である",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_004",

                expression:
                  "have enough time to do",

                meaning:
                  "～する十分な時間がある",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_005",

                expression:
                  "prepare a meal",

                meaning:
                  "食事を準備する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "A student may also skip breakfast because food is not easily available at home.",

            ja:
              "家庭ですぐに食べられる物がないため、朝食を抜く生徒もいるかもしれません。",

            notes: [
              {
                id: "q10_original_021_note_006",

                expression:
                  "skip breakfast",

                meaning:
                  "朝食を抜く",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_007",

                expression:
                  "be easily available",

                meaning:
                  "簡単に利用できる、すぐ手に入る",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "A balanced breakfast usually {{a}} foods from more than one food group.",

            ja:
              "バランスのよい朝食は、通常、複数の食品群の食べ物から成り立っています。",

            notes: [
              {
                id: "q10_original_021_note_008",

                expression:
                  "balanced breakfast",

                meaning:
                  "バランスのよい朝食",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_009",

                expression:
                  "consist of",

                meaning:
                  "～から成る",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_010",

                expression:
                  "food group",

                meaning:
                  "食品群",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Eating in the morning can help replace energy used during the night.",

            ja:
              "朝に食事を取ることで、夜の間に使われたエネルギーを補うことができます。",

            notes: [
              {
                id: "q10_original_021_note_011",

                expression:
                  "replace energy",

                meaning:
                  "エネルギーを補う",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_012",

                expression:
                  "during the night",

                meaning:
                  "夜の間に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "After several hours without food, the body needs new energy for movement and mental activity.",

            ja:
              "何時間も食べていない状態の後では、身体は運動や頭を使う活動のための新たなエネルギーを必要とします。",

            notes: [
              {
                id: "q10_original_021_note_013",

                expression:
                  "mental activity",

                meaning:
                  "頭を使う活動、精神活動",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Foods such as rice, bread, fruit, eggs, and dairy products contain different nutrients.",

            ja:
              "米、パン、果物、卵、乳製品などの食べ物には、さまざまな栄養素が含まれています。",

            notes: [
              {
                id: "q10_original_021_note_014",

                expression:
                  "dairy product",

                meaning:
                  "乳製品",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_015",

                expression:
                  "contain nutrients",

                meaning:
                  "栄養素を含む",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Together, these foods can {{b}} students with energy and materials needed for growth.",

            ja:
              "これらの食べ物を組み合わせることで、生徒にエネルギーと成長に必要な栄養を与えることができます。",

            notes: [
              {
                id: "q10_original_021_note_016",

                expression:
                  "provide A with B",

                meaning:
                  "AにBを与える、提供する",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_017",

                expression:
                  "be needed for growth",

                meaning:
                  "成長に必要である",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "Students who eat breakfast may find it easier to remain active until lunchtime.",

            ja:
              "朝食を食べる生徒は、昼食時まで活発な状態を保ちやすい場合があります。",

            notes: [
              {
                id: "q10_original_021_note_018",

                expression:
                  "remain active",

                meaning:
                  "活発な状態を保つ",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_019",

                expression:
                  "until lunchtime",

                meaning:
                  "昼食時まで",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Breakfast may also influence how students feel and behave in class.",

            ja:
              "朝食は、生徒が授業中にどのように感じ、行動するかにも影響を与える可能性があります。",

            notes: [
              {
                id: "q10_original_021_note_020",

                expression:
                  "influence how A does",

                meaning:
                  "Aがどのように～するかに影響する",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_021",

                expression:
                  "behave in class",

                meaning:
                  "授業中に行動する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Hunger can make it difficult to pay attention to a teacher or complete a task carefully.",

            ja:
              "空腹によって、教師の話に注意を向けたり、課題を注意深く終えたりすることが難しくなる場合があります。",

            notes: [
              {
                id: "q10_original_021_note_022",

                expression:
                  "hunger",

                meaning:
                  "空腹",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_023",

                expression:
                  "complete a task",

                meaning:
                  "課題を終える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "A hungry student may become tired, impatient, or more easily distracted.",

            ja:
              "空腹の生徒は、疲れたり、我慢できなくなったり、注意がそれやすくなったりする場合があります。",

            notes: [
              {
                id: "q10_original_021_note_024",

                expression:
                  "impatient",

                meaning:
                  "我慢できない、いらいらした",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_025",

                expression:
                  "be easily distracted",

                meaning:
                  "注意がそれやすい",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "{{c}}, students who have physical education or club practice in the morning may need enough energy to move safely.",

            ja:
              "特に、午前中に体育や部活動の練習がある生徒は、安全に体を動かすための十分なエネルギーが必要になる場合があります。",

            notes: [
              {
                id: "q10_original_021_note_026",

                expression:
                  "in particular",

                meaning:
                  "特に、とりわけ",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_027",

                expression:
                  "physical education",

                meaning:
                  "体育",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_028",

                expression:
                  "move safely",

                meaning:
                  "安全に体を動かす",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "However, simply eating something does not always mean that the meal is well balanced.",

            ja:
              "しかし、何かを食べさえすれば、その食事の栄養バランスがよいというわけではありません。",

            notes: [
              {
                id: "q10_original_021_note_029",

                expression:
                  "simply doing",

                meaning:
                  "単に～すること",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_030",

                expression:
                  "well balanced",

                meaning:
                  "栄養バランスのよい",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "A sweet drink or snack may provide quick energy but may not keep a student satisfied for very long.",

            ja:
              "甘い飲み物や軽食は、すぐにエネルギーを与えるかもしれませんが、長時間満腹感を保てない場合があります。",

            notes: [
              {
                id: "q10_original_021_note_031",

                expression:
                  "quick energy",

                meaning:
                  "すぐに得られるエネルギー",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_032",

                expression:
                  "keep A satisfied",

                meaning:
                  "Aの満腹感を保つ",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_033",

                expression:
                  "for very long",

                meaning:
                  "長時間",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "Telling students to eat breakfast is not enough if they face practical difficulties at home.",

            ja:
              "家庭で実際的な問題を抱えている場合、生徒に朝食を食べるよう伝えるだけでは十分ではありません。",

            notes: [
              {
                id: "q10_original_021_note_034",

                expression:
                  "practical difficulty",

                meaning:
                  "現実的・実際的な問題",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Some families may have limited time, money, cooking equipment, or access to fresh food.",

            ja:
              "家庭によっては、時間、お金、調理器具、新鮮な食品を手に入れる機会が限られている場合があります。",

            notes: [
              {
                id: "q10_original_021_note_035",

                expression:
                  "cooking equipment",

                meaning:
                  "調理器具",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_036",

                expression:
                  "access to",

                meaning:
                  "～を利用・入手する機会",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Schools are not necessarily {{d}} provide breakfast, but they can consider ways to support students who need help.",

            ja:
              "学校は必ずしも朝食を提供することになっているわけではありませんが、支援を必要とする生徒を助ける方法を検討できます。",

            notes: [
              {
                id: "q10_original_021_note_037",

                expression:
                  "be supposed to do",

                meaning:
                  "～することになっている、～するものとされている",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_038",

                expression:
                  "consider ways to do",

                meaning:
                  "～する方法を検討する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "For example, a school might offer a simple morning meal, provide information about inexpensive foods, or allow time for students to eat before class.",

            ja:
              "例えば、学校が簡単な朝食を用意したり、安価な食品についての情報を提供したり、授業前に食べる時間を設けたりすることが考えられます。",

            notes: [
              {
                id: "q10_original_021_note_039",

                expression:
                  "offer a meal",

                meaning:
                  "食事を提供する",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_040",

                expression:
                  "inexpensive food",

                meaning:
                  "安価な食品",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_041",

                expression:
                  "allow time for A to do",

                meaning:
                  "Aが～するための時間を設ける",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Students should have a realistic chance to eat a healthy breakfast {{e}} their family income is high or low.",

            ja:
              "家庭の収入が高いか低いかにかかわらず、生徒には健康的な朝食を食べる現実的な機会があるべきです。",

            notes: [
              {
                id: "q10_original_021_note_042",

                expression:
                  "regardless of whether",

                meaning:
                  "～かどうかにかかわらず",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_043",

                expression:
                  "family income",

                meaning:
                  "家庭の収入",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_044",

                expression:
                  "a realistic chance to do",

                meaning:
                  "実際に～できる機会",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "A useful breakfast does not need to be large or expensive, but it should provide enough energy and nutrition for the morning.",

            ja:
              "役立つ朝食は、量が多かったり高価だったりする必要はありませんが、午前中に必要なエネルギーと栄養を与えるものであるべきです。",

            notes: [
              {
                id: "q10_original_021_note_045",

                expression:
                  "need to be",

                meaning:
                  "～である必要がある",

                weakEligible: true
              },

              {
                id: "q10_original_021_note_046",

                expression:
                  "energy and nutrition",

                meaning:
                  "エネルギーと栄養",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "consists of"
          },

          {
            id: "a2",
            text: "deals with"
          },

          {
            id: "a3",
            text: "depends on"
          },

          {
            id: "a4",
            text: "suffers from"
          }
        ],

        answer: "a1",

        explanation:
          "バランスのよい朝食が、複数の食品群の食べ物によって構成されているという内容です。consist of Aで「Aから成る」という意味になります。主語がA balanced breakfastなので、consistsとなります。",

        wrongChoiceReasons: {
          a2:
            "deal withは「～を扱う、～に対処する」という意味です。朝食が食品群を扱うという意味にはなりません。",

          a3:
            "depend onは「～に依存する」という意味です。食品群の食べ物から構成されるという内容を直接表しません。",

          a4:
            "suffer fromは「病気や問題に苦しむ」という意味で、食品との組合せは不自然です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "compare"
          },

          {
            id: "b2",
            text: "prevent"
          },

          {
            id: "b3",
            text: "provide"
          },

          {
            id: "b4",
            text: "replace"
          }
        ],

        answer: "b3",

        explanation:
          "複数の食品が、生徒にエネルギーや成長に必要な栄養を与えるという内容です。provide A with Bで「AにBを与える、提供する」という構文になります。",

        wrongChoiceReasons: {
          b1:
            "compare A with Bなら「AをBと比較する」という意味ですが、食べ物が生徒をエネルギーと比較する内容ではありません。",

          b2:
            "prevent A from doingの形が一般的です。prevent A with Bとはできません。",

          b4:
            "replace A with Bなら「AをBと取り替える」という意味ですが、生徒をエネルギーと取り替えるという不自然な内容になります。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "In particular"
          },

          {
            id: "c2",
            text: "Instead"
          },

          {
            id: "c3",
            text: "Nevertheless"
          },

          {
            id: "c4",
            text: "Previously"
          }
        ],

        answer: "c1",

        explanation:
          "朝食が授業中の状態に影響するという一般的な説明に続いて、午前中に運動する生徒を特に取り上げています。そのため、In particularが適切です。",

        wrongChoiceReasons: {
          c2:
            "Insteadは「その代わりに」という意味ですが、別の内容へ置き換えているわけではありません。",

          c3:
            "Neverthelessは「それにもかかわらず」という逆接ですが、後ろの文は前の内容に反していません。",

          c4:
            "Previouslyは「以前は」という意味で、過去と現在の比較をしている文ではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "able to"
          },

          {
            id: "d2",
            text: "eager to"
          },

          {
            id: "d3",
            text: "supposed to"
          },

          {
            id: "d4",
            text: "used to"
          }
        ],

        answer: "d3",

        explanation:
          "学校が必ず朝食を提供する役割を負っているとは限らない、という内容です。be supposed to doで「～することになっている」「～するものとされている」という意味になります。not necessarilyと組み合わせて、必ずしもそうではないことを表しています。",

        wrongChoiceReasons: {
          d1:
            "be able to doは「～することができる」という能力を表します。学校に提供能力がないという内容ではありません。",

          d2:
            "be eager to doは「熱心に～したがる」という意味で、学校の役割や義務について述べる文には合いません。",

          d4:
            "be used to doingなら「～することに慣れている」という意味です。used to provideの場合は「以前は提供していた」となり、本文の意味とは異なります。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "because of"
          },

          {
            id: "e2",
            text: "in case"
          },

          {
            id: "e3",
            text: "regardless of whether"
          },

          {
            id: "e4",
            text: "so that"
          }
        ],

        answer: "e3",

        explanation:
          "家庭の収入が高い場合でも低い場合でも、生徒には健康的な朝食を食べる機会が必要だという内容です。regardless of whether A or Bで「AかBかにかかわらず」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "because ofの後ろには名詞が必要です。また、収入が朝食の機会を持つ理由だという意味になってしまいます。",

          e2:
            "in caseは「～の場合に備えて」という意味で、収入の高低に関係なくという意味を表せません。",

          e4:
            "so thatは目的を表します。家庭の収入が高い、または低くなるように朝食の機会を持つという不自然な意味になります。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 22
  // Taking Short Breaks at Work and School
  // =========================================================
  {
    id: "q10_original_022",
    number: 22,
    sourceType: "original",

    title: "Taking Short Breaks at Work and School",
    titleJa: "仕事や学校で短い休憩を取ること",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Students and workers often spend long periods concentrating on a single task.",

            ja:
              "生徒や働く人は、一つの作業に集中して長い時間を過ごすことがよくあります。",

            notes: [
              {
                id: "q10_original_022_note_001",

                expression:
                  "spend time doing",

                meaning:
                  "～して時間を過ごす",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_002",

                expression:
                  "concentrate on",

                meaning:
                  "～に集中する",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_003",

                expression:
                  "a single task",

                meaning:
                  "一つの作業",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "They may read, write, solve problems, enter information, or attend an online meeting.",

            ja:
              "読んだり、書いたり、問題を解いたり、情報を入力したり、オンライン会議に参加したりします。",

            notes: [
              {
                id: "q10_original_022_note_004",

                expression:
                  "enter information",

                meaning:
                  "情報を入力する",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_005",

                expression:
                  "attend an online meeting",

                meaning:
                  "オンライン会議に参加する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "As time passes, however, it may become harder to remain focused and work accurately.",

            ja:
              "しかし、時間がたつにつれて、集中した状態を保ち、正確に作業することが難しくなる場合があります。",

            notes: [
              {
                id: "q10_original_022_note_006",

                expression:
                  "as time passes",

                meaning:
                  "時間がたつにつれて",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_007",

                expression:
                  "remain focused",

                meaning:
                  "集中した状態を保つ",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_008",

                expression:
                  "work accurately",

                meaning:
                  "正確に作業する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Taking short breaks may help people {{a}} their attention over a longer period.",

            ja:
              "短い休憩を取ることは、より長い時間にわたって注意力を維持する助けになる可能性があります。",

            notes: [
              {
                id: "q10_original_022_note_009",

                expression:
                  "take a short break",

                meaning:
                  "短い休憩を取る",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_010",

                expression:
                  "maintain one's attention",

                meaning:
                  "注意力を維持する",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_011",

                expression:
                  "over a longer period",

                meaning:
                  "より長い期間にわたって",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "A useful break does not need to last very long.",

            ja:
              "効果的な休憩は、それほど長く続く必要はありません。",

            notes: [
              {
                id: "q10_original_022_note_012",

                expression:
                  "last long",

                meaning:
                  "長く続く",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Standing up, stretching, walking around, or looking away from a screen may be enough.",

            ja:
              "立ち上がったり、体を伸ばしたり、歩き回ったり、画面から目を離したりするだけでも十分な場合があります。",

            notes: [
              {
                id: "q10_original_022_note_013",

                expression:
                  "stretch",

                meaning:
                  "体を伸ばす、ストレッチをする",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_014",

                expression:
                  "walk around",

                meaning:
                  "歩き回る",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_015",

                expression:
                  "look away from",

                meaning:
                  "～から目を離す",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "A brief change in activity can give tired muscles and eyes a chance to rest.",

            ja:
              "活動を短時間変えることで、疲れた筋肉や目を休ませることができます。",

            notes: [
              {
                id: "q10_original_022_note_016",

                expression:
                  "a brief change in activity",

                meaning:
                  "活動の短時間の変化",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_017",

                expression:
                  "give A a chance to do",

                meaning:
                  "Aに～する機会を与える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "People can {{b}} a short break by drinking water, moving their bodies, or getting some fresh air.",

            ja:
              "水を飲んだり、体を動かしたり、新鮮な空気に触れたりすることで、短い休憩を有効に活用できます。",

            notes: [
              {
                id: "q10_original_022_note_018",

                expression:
                  "take advantage of",

                meaning:
                  "～を有効に活用する",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_019",

                expression:
                  "get some fresh air",

                meaning:
                  "新鮮な空気に触れる、外の空気を吸う",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "Such actions may help them return to work feeling more comfortable and alert.",

            ja:
              "こうした行動によって、より快適で注意力のある状態で作業に戻れる場合があります。",

            notes: [
              {
                id: "q10_original_022_note_020",

                expression:
                  "return to work",

                meaning:
                  "作業に戻る",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_021",

                expression:
                  "feel alert",

                meaning:
                  "頭がさえていると感じる",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Short breaks may also improve the quality of thinking.",

            ja:
              "短い休憩は、思考の質を高める可能性もあります。",

            notes: [
              {
                id: "q10_original_022_note_022",

                expression:
                  "the quality of thinking",

                meaning:
                  "思考の質",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "When people work on a difficult problem for too long, they may continue using an unsuccessful method.",

            ja:
              "難しい問題に長時間取り組むと、うまくいかない方法を使い続けてしまう場合があります。",

            notes: [
              {
                id: "q10_original_022_note_023",

                expression:
                  "work on a problem",

                meaning:
                  "問題に取り組む",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_024",

                expression:
                  "an unsuccessful method",

                meaning:
                  "うまくいかない方法",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Temporarily leaving the task may allow them to return with a different point of view.",

            ja:
              "一時的にその作業から離れることで、異なる視点を持って戻れる可能性があります。",

            notes: [
              {
                id: "q10_original_022_note_025",

                expression:
                  "temporarily",

                meaning:
                  "一時的に",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_026",

                expression:
                  "a different point of view",

                meaning:
                  "異なる視点",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "{{c}}, a student who cannot find an error in an essay may notice it more easily after a short walk.",

            ja:
              "具体的には、作文の誤りを見つけられない生徒が、少し歩いた後にはそれに気づきやすくなる場合があります。",

            notes: [
              {
                id: "q10_original_022_note_027",

                expression:
                  "specifically",

                meaning:
                  "具体的には、特に",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_028",

                expression:
                  "find an error",

                meaning:
                  "誤りを見つける",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_029",

                expression:
                  "notice A more easily",

                meaning:
                  "Aにより簡単に気づく",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "A worker may also think of a new solution after briefly discussing another topic with a colleague.",

            ja:
              "働く人も、同僚と別の話題について少し話した後、新しい解決策を思いつくことがあります。",

            notes: [
              {
                id: "q10_original_022_note_030",

                expression:
                  "think of a solution",

                meaning:
                  "解決策を思いつく",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_031",

                expression:
                  "discuss a topic with",

                meaning:
                  "～と話題について話し合う",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_032",

                expression:
                  "colleague",

                meaning:
                  "同僚",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s15",

            en:
              "Not every activity performed during a break provides real rest.",

            ja:
              "休憩中に行うすべての活動が、本当の休息をもたらすわけではありません。",

            notes: [
              {
                id: "q10_original_022_note_033",

                expression:
                  "provide real rest",

                meaning:
                  "本当の休息をもたらす",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "Checking messages or watching short videos may continue to require attention from the same tired eyes and brain.",

            ja:
              "メッセージを確認したり短い動画を見たりすると、疲れた目や脳が引き続き注意を使うことになります。",

            notes: [
              {
                id: "q10_original_022_note_034",

                expression:
                  "continue to do",

                meaning:
                  "～し続ける",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_035",

                expression:
                  "require attention from",

                meaning:
                  "～の注意力を必要とする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "A break can also become too long and make it difficult to return to the original task.",

            ja:
              "また、休憩が長くなりすぎると、元の作業に戻ることが難しくなる場合があります。",

            notes: [
              {
                id: "q10_original_022_note_036",

                expression:
                  "become too long",

                meaning:
                  "長くなりすぎる",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_037",

                expression:
                  "the original task",

                meaning:
                  "元の作業",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Short breaks are {{d}} support productive activity, not replace it completely.",

            ja:
              "短い休憩は、生産的な活動を完全に置き換えるためではなく、それを支えるためのものです。",

            notes: [
              {
                id: "q10_original_022_note_038",

                expression:
                  "be meant to do",

                meaning:
                  "～するためのものである、～することを意図されている",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_039",

                expression:
                  "productive activity",

                meaning:
                  "生産的な活動",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_040",

                expression:
                  "replace A completely",

                meaning:
                  "Aを完全に置き換える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "A useful break involves a genuine change of activity, as {{e}} continuing the same kind of mental work on another screen.",

            ja:
              "効果的な休憩には、別の画面で同じ種類の頭を使う作業を続けるのではなく、実際に活動を変えることが必要です。",

            notes: [
              {
                id: "q10_original_022_note_041",

                expression:
                  "a genuine change",

                meaning:
                  "実際の変化、本当の変化",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_042",

                expression:
                  "as opposed to",

                meaning:
                  "～とは対照的に、～ではなく",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_043",

                expression:
                  "mental work",

                meaning:
                  "頭を使う作業",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Schools and workplaces can make breaks more effective by creating clear schedules and suitable spaces for rest.",

            ja:
              "学校や職場は、明確な予定と休息に適した場所を設けることで、休憩をより効果的なものにできます。",

            notes: [
              {
                id: "q10_original_022_note_044",

                expression:
                  "create a clear schedule",

                meaning:
                  "明確な予定を作る",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_045",

                expression:
                  "a suitable space for",

                meaning:
                  "～に適した場所",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "When used carefully, short breaks can help people work and study with greater comfort, accuracy, and concentration.",

            ja:
              "短い休憩を適切に取り入れることで、人々はより快適に、正確に、集中して仕事や学習に取り組めます。",

            notes: [
              {
                id: "q10_original_022_note_046",

                expression:
                  "when used carefully",

                meaning:
                  "慎重に、適切に用いられれば",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_047",

                expression:
                  "with greater comfort",

                meaning:
                  "より快適に",

                weakEligible: true
              },

              {
                id: "q10_original_022_note_048",

                expression:
                  "accuracy and concentration",

                meaning:
                  "正確さと集中力",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "avoid"
          },

          {
            id: "a2",
            text: "maintain"
          },

          {
            id: "a3",
            text: "remove"
          },

          {
            id: "a4",
            text: "separate"
          }
        ],

        answer: "a2",

        explanation:
          "短い休憩を取ることで、より長い時間にわたり注意力を保てるという内容です。maintain one's attentionで「注意力を維持する」という意味になります。",

        wrongChoiceReasons: {
          a1:
            "avoid attentionでは「注意を避ける」という意味になり、集中力を保つ内容と反対です。",

          a3:
            "remove attentionでは「注意を取り除く」という不自然な意味になります。",

          a4:
            "separate attentionでは「注意を分離する」という意味になり、長時間集中することを表せません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "catch up with"
          },

          {
            id: "b2",
            text: "get away from"
          },

          {
            id: "b3",
            text: "take advantage of"
          },

          {
            id: "b4",
            text: "take care of"
          }
        ],

        answer: "b3",

        explanation:
          "水を飲んだり体を動かしたりして、短い休憩を有効に使うという内容です。take advantage of Aで「Aを有効に活用する」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "catch up withは「～に追いつく」という意味で、休憩を活用することを表しません。",

          b2:
            "get away from a breakでは「休憩から離れる」という意味になり、休憩中の行動について述べる文脈に合いません。",

          b4:
            "take care ofは「～の世話をする、～を処理する」という意味で、休憩を有効利用することとは異なります。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "After all"
          },

          {
            id: "c2",
            text: "By contrast"
          },

          {
            id: "c3",
            text: "Specifically"
          },

          {
            id: "c4",
            text: "Therefore"
          }
        ],

        answer: "c3",

        explanation:
          "直前では、作業から一時的に離れると異なる視点を持てるという一般的な説明をしています。後ろでは、作文の誤りに気づくという具体的な例を示しているため、Specificallyが適切です。",

        wrongChoiceReasons: {
          c1:
            "After allは「結局のところ」「そもそも」という意味で、具体例を導く表現ではありません。",

          c2:
            "後ろの文は直前の内容と対照的ではなく、その具体例です。",

          c4:
            "後ろの文は一般的な説明から導かれる結論ではなく、具体的な場面を示しています。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "able to"
          },

          {
            id: "d2",
            text: "eager to"
          },

          {
            id: "d3",
            text: "meant to"
          },

          {
            id: "d4",
            text: "ready to"
          }
        ],

        answer: "d3",

        explanation:
          "短い休憩は、生産的な活動を支えるためのものであり、完全に置き換えるものではないという目的を述べています。be meant to doで「～するためのものである」「～することを意図されている」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "be able to doは能力を表しますが、ここでは休憩の目的を説明しています。",

          d2:
            "be eager to doは「熱心に～したがる」という意味で、休憩を人のように扱う不自然な表現になります。",

          d4:
            "be ready to doは「～する準備ができている」という意味で、休憩の本来の目的を表しません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "different from"
          },

          {
            id: "e2",
            text: "opposed to"
          },

          {
            id: "e3",
            text: "related to"
          },

          {
            id: "e4",
            text: "suitable for"
          }
        ],

        answer: "e2",

        explanation:
          "本当に活動を変えることと、別の画面で同じ頭脳作業を続けることを対比しています。as opposed to Aで「Aとは対照的に」「Aではなく」という意味になります。空欄の前にasがあるため、opposed toを入れます。",

        wrongChoiceReasons: {
          e1:
            "as different fromという形は、この文の位置では自然な対比表現になりません。",

          e3:
            "as related toは「～に関連して」という意味になり、本当の休憩と同じ作業の継続を対比できません。",

          e4:
            "as suitable forでは「～に適しているものとして」という不自然な意味になります。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 23
  // Spending Time in Nature
  // =========================================================
  {
    id: "q10_original_023",
    number: 23,
    sourceType: "original",

    title: "Spending Time in Nature",
    titleJa: "自然の中で過ごすこと",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Many people spend most of their day inside buildings.",

            ja:
              "多くの人は、一日の大部分を建物の中で過ごしています。",

            notes: [
              {
                id: "q10_original_023_note_001",

                expression:
                  "most of one's day",

                meaning:
                  "一日の大部分",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_002",

                expression:
                  "inside a building",

                meaning:
                  "建物の中で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Students attend classes, workers sit in offices, and many forms of entertainment involve screens.",

            ja:
              "生徒は授業を受け、働く人は事務所に座り、多くの娯楽には画面が使われています。",

            notes: [
              {
                id: "q10_original_023_note_003",

                expression:
                  "attend a class",

                meaning:
                  "授業に出席する",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_004",

                expression:
                  "form of entertainment",

                meaning:
                  "娯楽の形、娯楽の種類",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_005",

                expression:
                  "involve",

                meaning:
                  "～を含む、伴う",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "As a result, some people have few opportunities to spend time in parks, forests, or other natural areas.",

            ja:
              "その結果、公園、森林、その他の自然のある場所で過ごす機会がほとんどない人もいます。",

            notes: [
              {
                id: "q10_original_023_note_006",

                expression:
                  "have few opportunities to do",

                meaning:
                  "～する機会がほとんどない",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_007",

                expression:
                  "natural area",

                meaning:
                  "自然のある地域、自然環境",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Even a short visit to a green space, however, may offer a useful change from daily routines.",

            ja:
              "しかし、緑のある場所を短時間訪れるだけでも、日常の決まった生活から離れるよい機会になる場合があります。",

            notes: [
              {
                id: "q10_original_023_note_008",

                expression:
                  "green space",

                meaning:
                  "緑地、緑のある場所",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_009",

                expression:
                  "a change from",

                meaning:
                  "～からの変化、～とは異なる経験",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_010",

                expression:
                  "daily routine",

                meaning:
                  "日常の決まった生活",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Time outdoors may support both physical and mental health.",

            ja:
              "屋外で過ごす時間は、身体と心の両方の健康を支える可能性があります。",

            notes: [
              {
                id: "q10_original_023_note_011",

                expression:
                  "time outdoors",

                meaning:
                  "屋外で過ごす時間",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_012",

                expression:
                  "physical and mental health",

                meaning:
                  "身体と心の健康",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "People who go outside are often {{a}} natural light and changes in temperature.",

            ja:
              "外へ出る人は、自然光や気温の変化に触れることが多くあります。",

            notes: [
              {
                id: "q10_original_023_note_013",

                expression:
                  "be exposed to",

                meaning:
                  "～にさらされる、～に触れる",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_014",

                expression:
                  "natural light",

                meaning:
                  "自然光",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_015",

                expression:
                  "change in temperature",

                meaning:
                  "気温の変化",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Walking through a park or along a river also provides gentle physical activity.",

            ja:
              "公園の中や川沿いを歩くことは、軽い運動にもなります。",

            notes: [
              {
                id: "q10_original_023_note_016",

                expression:
                  "walk along a river",

                meaning:
                  "川沿いを歩く",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_017",

                expression:
                  "gentle physical activity",

                meaning:
                  "軽い運動",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Such activity may improve blood flow without requiring special equipment or intense exercise.",

            ja:
              "そのような活動は、特別な用具や激しい運動を必要とせずに、血流を改善する可能性があります。",

            notes: [
              {
                id: "q10_original_023_note_018",

                expression:
                  "improve blood flow",

                meaning:
                  "血流を改善する",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_019",

                expression:
                  "special equipment",

                meaning:
                  "特別な用具",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_020",

                expression:
                  "intense exercise",

                meaning:
                  "激しい運動",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "Regular contact with natural environments may also {{b}} a person's mood and level of stress.",

            ja:
              "自然環境と定期的に触れ合うことは、人の気分やストレスの程度によい影響を与える可能性もあります。",

            notes: [
              {
                id: "q10_original_023_note_021",

                expression:
                  "regular contact with",

                meaning:
                  "～との定期的な触れ合い",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_022",

                expression:
                  "have a positive effect on",

                meaning:
                  "～によい影響を与える",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_023",

                expression:
                  "level of stress",

                meaning:
                  "ストレスの程度",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Natural places may help people direct their attention away from everyday pressure.",

            ja:
              "自然のある場所は、日常の負担から注意をそらす助けになる場合があります。",

            notes: [
              {
                id: "q10_original_023_note_024",

                expression:
                  "direct one's attention away from",

                meaning:
                  "～から注意をそらす",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_025",

                expression:
                  "everyday pressure",

                meaning:
                  "日常の負担やプレッシャー",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "The movement of leaves, the sound of water, or the sight of an open sky can hold attention without demanding a great deal of effort.",

            ja:
              "葉の動き、水の音、開けた空の景色は、大きな努力を必要とせずに人の注意を引きつけます。",

            notes: [
              {
                id: "q10_original_023_note_026",

                expression:
                  "the sight of",

                meaning:
                  "～の景色、～を見ること",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_027",

                expression:
                  "hold one's attention",

                meaning:
                  "人の注意を引きつけておく",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_028",

                expression:
                  "a great deal of",

                meaning:
                  "多くの～",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "{{c}}, nature provides a temporary break from messages, traffic, deadlines, and other demands.",

            ja:
              "一つには、自然は、メッセージ、交通、締切、その他の要求から一時的に離れる機会を与えてくれます。",

            notes: [
              {
                id: "q10_original_023_note_029",

                expression:
                  "for one thing",

                meaning:
                  "一つには、まず第一に",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_030",

                expression:
                  "a temporary break from",

                meaning:
                  "～から一時的に離れること",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_031",

                expression:
                  "deadline",

                meaning:
                  "締切",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "A person may return from a walk feeling calmer and better able to deal with a problem.",

            ja:
              "人は散歩から戻ったとき、より落ち着き、問題によりうまく対処できる状態になっていることがあります。",

            notes: [
              {
                id: "q10_original_023_note_032",

                expression:
                  "return from a walk",

                meaning:
                  "散歩から戻る",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_033",

                expression:
                  "deal with a problem",

                meaning:
                  "問題に対処する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "Spending time outside with friends or family may also create opportunities for conversation and shared experiences.",

            ja:
              "友人や家族と屋外で過ごすことは、会話や共通の経験の機会を生み出す場合もあります。",

            notes: [
              {
                id: "q10_original_023_note_034",

                expression:
                  "create an opportunity for",

                meaning:
                  "～の機会を生み出す",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_035",

                expression:
                  "shared experience",

                meaning:
                  "共通の経験",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s15",

            en:
              "Access to nature is not equal in every community.",

            ja:
              "自然に触れられる環境は、すべての地域で平等に整っているわけではありません。",

            notes: [
              {
                id: "q10_original_023_note_036",

                expression:
                  "access to nature",

                meaning:
                  "自然に触れられる環境や機会",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_037",

                expression:
                  "not equal",

                meaning:
                  "平等ではない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "Some neighborhoods have large parks and tree-lined streets, while others have few safe outdoor spaces.",

            ja:
              "広い公園や街路樹のある通りを持つ地域もあれば、安全な屋外空間がほとんどない地域もあります。",

            notes: [
              {
                id: "q10_original_023_note_038",

                expression:
                  "tree-lined street",

                meaning:
                  "街路樹のある通り",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_039",

                expression:
                  "outdoor space",

                meaning:
                  "屋外空間",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "People may also be unable to travel far because of age, disability, work, or family responsibilities.",

            ja:
              "年齢、障害、仕事、家庭での責任などのために、遠くまで移動できない人もいます。",

            notes: [
              {
                id: "q10_original_023_note_040",

                expression:
                  "be unable to do",

                meaning:
                  "～することができない",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_041",

                expression:
                  "family responsibility",

                meaning:
                  "家庭での責任",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Cities can {{d}} nature by planting trees, protecting small parks, and adding gardens to schools and public buildings.",

            ja:
              "都市は、木を植え、小さな公園を守り、学校や公共施設に庭を設けることで、自然のための場所を作ることができます。",

            notes: [
              {
                id: "q10_original_023_note_042",

                expression:
                  "make room for",

                meaning:
                  "～のための場所や余地を作る",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_043",

                expression:
                  "protect a park",

                meaning:
                  "公園を保護する",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_044",

                expression:
                  "public building",

                meaning:
                  "公共施設、公共の建物",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "People can also notice nearby forms of nature, such as small gardens, rivers, birds, and changes in the seasons.",

            ja:
              "人々は、小さな庭、川、鳥、季節の変化など、身近にある自然にも目を向けることができます。",

            notes: [
              {
                id: "q10_original_023_note_045",

                expression:
                  "nearby forms of nature",

                meaning:
                  "身近にあるさまざまな自然",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_046",

                expression:
                  "changes in the seasons",

                meaning:
                  "季節の変化",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "A person may benefit from nature {{e}} there is no large forest or national park nearby.",

            ja:
              "近くに大きな森林や国立公園がない場合でも、人は自然から恩恵を受けることができます。",

            notes: [
              {
                id: "q10_original_023_note_047",

                expression:
                  "even when",

                meaning:
                  "～の場合でも",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_048",

                expression:
                  "national park",

                meaning:
                  "国立公園",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Regular contact with ordinary green spaces can become a simple but valuable part of daily life.",

            ja:
              "身近な緑地と定期的に触れ合うことは、日常生活の中の簡単で価値ある習慣となり得ます。",

            notes: [
              {
                id: "q10_original_023_note_049",

                expression:
                  "ordinary green space",

                meaning:
                  "身近な一般的な緑地",

                weakEligible: true
              },

              {
                id: "q10_original_023_note_050",

                expression:
                  "a valuable part of",

                meaning:
                  "～の価値ある一部",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "connected with"
          },

          {
            id: "a2",
            text: "exposed to"
          },

          {
            id: "a3",
            text: "protected from"
          },

          {
            id: "a4",
            text: "responsible for"
          }
        ],

        answer: "a2",

        explanation:
          "屋外へ出ることで、自然光や気温の変化に触れるという内容です。be exposed to Aで「Aにさらされる」「Aに触れる」という意味になります。",

        wrongChoiceReasons: {
          a1:
            "be connected withは「～と関係している」という意味ですが、自然光を実際に受けることを表すには不十分です。",

          a3:
            "be protected fromでは「自然光や気温の変化から守られる」という意味になり、屋外へ出る内容と反対です。",

          a4:
            "be responsible forは「～に責任がある」という意味で、人が自然光に責任を負うという不自然な内容になります。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "have a positive effect on"
          },

          {
            id: "b2",
            text: "keep in touch with"
          },

          {
            id: "b3",
            text: "lose interest in"
          },

          {
            id: "b4",
            text: "take the place of"
          }
        ],

        answer: "b1",

        explanation:
          "自然環境と触れ合うことが、気分やストレスの程度によい影響を与えるという内容です。have a positive effect on Aで「Aによい影響を与える」という意味になります。",

        wrongChoiceReasons: {
          b2:
            "keep in touch withは「～と連絡を取り続ける」という意味で、気分やストレスへの影響を表しません。",

          b3:
            "lose interest inは「～への関心を失う」という意味で、自然との触れ合いによる効果とは異なります。",

          b4:
            "take the place ofは「～に取って代わる」という意味で、自然が気分やストレスそのものに置き換わるわけではありません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For one thing"
          },

          {
            id: "c2",
            text: "In comparison"
          },

          {
            id: "c3",
            text: "Nevertheless"
          },

          {
            id: "c4",
            text: "On the contrary"
          }
        ],

        answer: "c1",

        explanation:
          "自然が心に与える効果について、まず一つ目の理由として、日常の要求から一時的に離れられることを挙げています。For one thingは「一つには」「まず第一に」という意味です。",

        wrongChoiceReasons: {
          c2:
            "二つの対象を比較しているのではなく、自然の利点の一つを挙げています。",

          c3:
            "後ろの内容は前の説明に反するものではありません。",

          c4:
            "直前の内容を否定して正反対のことを述べているわけではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "get rid of"
          },

          {
            id: "d2",
            text: "make room for"
          },

          {
            id: "d3",
            text: "run out of"
          },

          {
            id: "d4",
            text: "take care of"
          }
        ],

        answer: "d2",

        explanation:
          "木を植えたり、公園を守ったり、庭を設けたりすることで、都市の中に自然のための場所を確保するという内容です。make room for Aで「Aのための場所や余地を作る」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "get rid ofは「～を取り除く」という意味で、自然を増やす内容と反対です。",

          d3:
            "run out ofは「～を使い果たす」という意味で、自然環境を整備することを表しません。",

          d4:
            "take care ofは「～の世話をする」という意味ですが、後ろに挙げられた活動は自然の世話だけでなく、都市内に自然の場所を作ることを示しています。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "as soon as"
          },

          {
            id: "e2",
            text: "even when"
          },

          {
            id: "e3",
            text: "now that"
          },

          {
            id: "e4",
            text: "so that"
          }
        ],

        answer: "e2",

        explanation:
          "近くに大規模な森林や国立公園がない場合であっても、身近な自然から恩恵を受けられるという譲歩を表しています。even whenは「～の場合であっても」という意味です。",

        wrongChoiceReasons: {
          e1:
            "as soon asでは「大きな森林がなくなるとすぐに」という時間関係になり、本文の意味に合いません。",

          e3:
            "now thatは「今や～なので」という理由を表しますが、自然がないことを理由としているわけではありません。",

          e4:
            "so thatは目的を表すため、「森林がなくなるように自然から恩恵を受ける」という不自然な意味になります。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 24
  // The Influence of Music on Concentration
  // =========================================================
  {
    id: "q10_original_024",
    number: 24,
    sourceType: "original",

    title: "The Influence of Music on Concentration",
    titleJa: "音楽が集中力に与える影響",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Many students listen to music while studying, reading, or completing homework.",

            ja:
              "多くの生徒は、勉強、読書、宿題をしている間に音楽を聴きます。",

            notes: [
              {
                id: "q10_original_024_note_001",

                expression:
                  "while doing",

                meaning:
                  "～している間に",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_002",

                expression:
                  "complete homework",

                meaning:
                  "宿題を終える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Some say that music helps them concentrate, while others find it difficult to work with any sound in the background.",

            ja:
              "音楽が集中の助けになるという人もいれば、背景に音があると作業が難しいと感じる人もいます。",

            notes: [
              {
                id: "q10_original_024_note_003",

                expression:
                  "help A concentrate",

                meaning:
                  "Aが集中するのを助ける",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_004",

                expression:
                  "in the background",

                meaning:
                  "背景で、背後で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "The effect of music is not the same for every person or every kind of task.",

            ja:
              "音楽の効果は、すべての人やすべての種類の課題において同じではありません。",

            notes: [
              {
                id: "q10_original_024_note_005",

                expression:
                  "the effect of A",

                meaning:
                  "Aの効果、影響",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_006",

                expression:
                  "every kind of task",

                meaning:
                  "あらゆる種類の課題",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "To understand its influence, it is necessary to consider the listener, the music, and the activity.",

            ja:
              "音楽の影響を理解するには、聴く人、音楽、活動内容について考える必要があります。",

            notes: [
              {
                id: "q10_original_024_note_007",

                expression:
                  "to understand",

                meaning:
                  "～を理解するためには",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_008",

                expression:
                  "consider",

                meaning:
                  "～を考慮する",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Music may help concentration by creating a more comfortable study environment.",

            ja:
              "音楽は、より快適な学習環境を作ることで、集中を助ける場合があります。",

            notes: [
              {
                id: "q10_original_024_note_009",

                expression:
                  "study environment",

                meaning:
                  "学習環境",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_010",

                expression:
                  "by doing",

                meaning:
                  "～することによって",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "In a noisy home, library, or shared room, headphones may help {{a}} conversations and other unwanted sounds.",

            ja:
              "騒がしい家庭、図書館、共同の部屋では、ヘッドホンが会話やその他の不要な音を遮る助けになる場合があります。",

            notes: [
              {
                id: "q10_original_024_note_011",

                expression:
                  "block out",

                meaning:
                  "音や光などを遮る、聞こえなくする",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_012",

                expression:
                  "unwanted sound",

                meaning:
                  "不要な音",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_013",

                expression:
                  "shared room",

                meaning:
                  "共同で使う部屋",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Familiar music may also make a study session feel less stressful or lonely.",

            ja:
              "聞き慣れた音楽によって、勉強時間のストレスや孤独感が弱まる場合もあります。",

            notes: [
              {
                id: "q10_original_024_note_014",

                expression:
                  "familiar music",

                meaning:
                  "聞き慣れた音楽",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_015",

                expression:
                  "study session",

                meaning:
                  "勉強する時間、学習時間",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_016",

                expression:
                  "feel less stressful",

                meaning:
                  "それほどストレスを感じさせない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "A positive mood is often {{b}} greater motivation to begin and continue a task.",

            ja:
              "前向きな気分は、課題を始めて続けようとする意欲の高さと関連することがよくあります。",

            notes: [
              {
                id: "q10_original_024_note_017",

                expression:
                  "be associated with",

                meaning:
                  "～と関連している",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_018",

                expression:
                  "positive mood",

                meaning:
                  "前向きな気分",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_019",

                expression:
                  "motivation to do",

                meaning:
                  "～する意欲",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "A steady rhythm may also help some people continue repetitive work at a regular speed.",

            ja:
              "一定のリズムは、反復的な作業を一定の速さで続ける助けになる場合もあります。",

            notes: [
              {
                id: "q10_original_024_note_020",

                expression:
                  "steady rhythm",

                meaning:
                  "一定のリズム",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_021",

                expression:
                  "repetitive work",

                meaning:
                  "反復的な作業",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_022",

                expression:
                  "at a regular speed",

                meaning:
                  "一定の速さで",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Music can also compete with a task for the listener's attention.",

            ja:
              "一方で、音楽と課題が、聴く人の注意力を奪い合うこともあります。",

            notes: [
              {
                id: "q10_original_024_note_023",

                expression:
                  "compete with A for B",

                meaning:
                  "Bを求めてAと競い合う",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_024",

                expression:
                  "the listener's attention",

                meaning:
                  "聴く人の注意力",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "This is especially likely when the music contains lyrics and the task requires language.",

            ja:
              "これは特に、音楽に歌詞があり、課題で言語を使う必要がある場合に起こりやすくなります。",

            notes: [
              {
                id: "q10_original_024_note_025",

                expression:
                  "contain lyrics",

                meaning:
                  "歌詞を含む",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_026",

                expression:
                  "require language",

                meaning:
                  "言語の使用を必要とする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "For example, a student reading a difficult passage may begin paying attention to the words of a song.",

            ja:
              "例えば、難しい文章を読んでいる生徒が、歌の言葉に注意を向け始める場合があります。",

            notes: [
              {
                id: "q10_original_024_note_027",

                expression:
                  "a difficult passage",

                meaning:
                  "難しい文章",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_028",

                expression:
                  "pay attention to",

                meaning:
                  "～に注意を向ける",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "The brain must then process two sets of words at the same time.",

            ja:
              "その場合、脳は二組の言葉を同時に処理しなければなりません。",

            notes: [
              {
                id: "q10_original_024_note_029",

                expression:
                  "process information",

                meaning:
                  "情報を処理する",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_030",

                expression:
                  "at the same time",

                meaning:
                  "同時に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "{{c}}, instrumental music may cause less difficulty because it does not contain language that must be understood.",

            ja:
              "ある程度は、歌詞のない音楽は理解すべき言葉を含まないため、問題を引き起こしにくい場合があります。",

            notes: [
              {
                id: "q10_original_024_note_031",

                expression:
                  "to some extent",

                meaning:
                  "ある程度は",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_032",

                expression:
                  "instrumental music",

                meaning:
                  "歌詞のない器楽曲",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_033",

                expression:
                  "cause less difficulty",

                meaning:
                  "それほど問題を引き起こさない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "However, very loud, fast, or unfamiliar music may still interrupt concentration.",

            ja:
              "しかし、非常に大きな音、速い音楽、聞き慣れない音楽は、それでも集中を妨げる場合があります。",

            notes: [
              {
                id: "q10_original_024_note_034",

                expression:
                  "unfamiliar music",

                meaning:
                  "聞き慣れない音楽",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_035",

                expression:
                  "interrupt concentration",

                meaning:
                  "集中を妨げる",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "Personal preference also influences how a person reacts to music.",

            ja:
              "個人の好みも、人が音楽にどのように反応するかに影響します。",

            notes: [
              {
                id: "q10_original_024_note_036",

                expression:
                  "personal preference",

                meaning:
                  "個人の好み",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_037",

                expression:
                  "react to",

                meaning:
                  "～に反応する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "A song that one student finds relaxing may be annoying or exciting to another.",

            ja:
              "ある生徒が心を落ち着かせると感じる曲を、別の生徒は不快または刺激的だと感じる場合があります。",

            notes: [
              {
                id: "q10_original_024_note_038",

                expression:
                  "find A＋形容詞",

                meaning:
                  "Aを～だと感じる",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_039",

                expression:
                  "annoying",

                meaning:
                  "いらいらさせる、不快な",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Some listeners may be easily {{d}} music, while others can leave it in the background.",

            ja:
              "音楽によって簡単に注意をそらされる人もいれば、音楽を背景の音として流しておける人もいます。",

            notes: [
              {
                id: "q10_original_024_note_040",

                expression:
                  "be distracted by",

                meaning:
                  "～によって注意をそらされる",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_041",

                expression:
                  "leave A in the background",

                meaning:
                  "Aを背景の状態にしておく",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "The effect may also {{e}} the difficulty of the task and how familiar the learner is with it.",

            ja:
              "その効果は、課題の難しさや、学習者がその課題にどれほど慣れているかによっても異なる場合があります。",

            notes: [
              {
                id: "q10_original_024_note_042",

                expression:
                  "vary according to",

                meaning:
                  "～に応じて異なる",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_043",

                expression:
                  "the difficulty of a task",

                meaning:
                  "課題の難しさ",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_044",

                expression:
                  "be familiar with",

                meaning:
                  "～に慣れている、～をよく知っている",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Simple or repetitive work may be easier to complete with music than a task involving careful reading or complex reasoning.",

            ja:
              "単純または反復的な作業は、注意深い読解や複雑な思考を必要とする課題よりも、音楽を聴きながら行いやすい場合があります。",

            notes: [
              {
                id: "q10_original_024_note_045",

                expression:
                  "complex reasoning",

                meaning:
                  "複雑な思考、推論",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_046",

                expression:
                  "a task involving A",

                meaning:
                  "Aを含む課題",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Students can test different types of music and compare the quality and speed of their work.",

            ja:
              "生徒は、異なる種類の音楽を試し、作業の質と速さを比較できます。",

            notes: [
              {
                id: "q10_original_024_note_047",

                expression:
                  "test different types of",

                meaning:
                  "異なる種類の～を試す",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_048",

                expression:
                  "the quality and speed of",

                meaning:
                  "～の質と速さ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "Music is most useful for studying when it supports attention instead of becoming the main object of attention.",

            ja:
              "音楽は、注意の中心になるのではなく、集中を支えるときに、学習に最も役立ちます。",

            notes: [
              {
                id: "q10_original_024_note_049",

                expression:
                  "support attention",

                meaning:
                  "集中や注意を支える",

                weakEligible: true
              },

              {
                id: "q10_original_024_note_050",

                expression:
                  "the main object of attention",

                meaning:
                  "注意の中心となるもの",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "block out"
          },

          {
            id: "a2",
            text: "bring about"
          },

          {
            id: "a3",
            text: "look after"
          },

          {
            id: "a4",
            text: "pick up"
          }
        ],

        answer: "a1",

        explanation:
          "ヘッドホンによって、周囲の会話や不要な音を聞こえにくくするという内容です。block out Aで「Aを遮る」「Aを聞こえなくする」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "bring aboutは「～を引き起こす」という意味で、不要な音を発生させることになってしまいます。",

          a3:
            "look afterは「～の世話をする」という意味で、音を遮る内容には合いません。",

          a4:
            "pick upには「音を拾う」という意味がありますが、ヘッドホンが周囲の会話を拾うのではなく、遮るという文脈です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "associated with"
          },

          {
            id: "b2",
            text: "based on"
          },

          {
            id: "b3",
            text: "divided into"
          },

          {
            id: "b4",
            text: "protected from"
          }
        ],

        answer: "b1",

        explanation:
          "前向きな気分と、課題を始めて継続する高い意欲との間に関連があるという内容です。be associated with Aで「Aと関連している」という意味になります。",

        wrongChoiceReasons: {
          b2:
            "be based onでは、前向きな気分が意欲を土台として成り立つという意味になり、本文の関係と異なります。",

          b3:
            "be divided intoは「～に分けられる」という意味で、気分と意欲の関係を表せません。",

          b4:
            "be protected fromは「～から守られる」という意味で、意欲との関連を表しません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "At first"
          },

          {
            id: "c2",
            text: "On the contrary"
          },

          {
            id: "c3",
            text: "To some extent"
          },

          {
            id: "c4",
            text: "What is more"
          }
        ],

        answer: "c3",

        explanation:
          "歌詞のない音楽は言語処理を必要としないため、歌詞のある音楽より集中を妨げにくい可能性があるものの、後続文では音量や速さによっては妨げになると述べています。限定を加えるTo some extentが適切です。",

        wrongChoiceReasons: {
          c1:
            "At firstは「最初は」という時間的な順序を表しますが、時間の変化について述べていません。",

          c2:
            "直前の内容を完全に否定して、正反対のことを述べているわけではありません。",

          c4:
            "What is moreは「さらに」という追加を表しますが、ここでは歌詞のない音楽の効果を限定的に認めています。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "confused about"
          },

          {
            id: "d2",
            text: "distracted by"
          },

          {
            id: "d3",
            text: "pleased with"
          },

          {
            id: "d4",
            text: "prepared for"
          }
        ],

        answer: "d2",

        explanation:
          "音楽に注意を奪われやすい人と、音楽を背景として流せる人を対比しています。be distracted by Aで「Aによって注意をそらされる」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "be confused aboutは「～について混乱する」という意味で、音楽に注意を奪われることとは異なります。",

          d3:
            "be pleased withは「～に満足する」という意味で、集中への悪影響を表しません。",

          d4:
            "be prepared forは「～に備えている」という意味で、音楽への反応を表す文脈には合いません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "agree with"
          },

          {
            id: "e2",
            text: "belong to"
          },

          {
            id: "e3",
            text: "result from"
          },

          {
            id: "e4",
            text: "vary according to"
          }
        ],

        answer: "e4",

        explanation:
          "音楽の効果が、課題の難しさや学習者の慣れによって異なるという内容です。vary according to Aで「Aに応じて異なる」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "agree withは「～に賛成する」「～と一致する」という意味で、効果の違いを表しません。",

          e2:
            "belong toは「～に属する」という意味で、音楽の効果と課題の難しさの関係には使えません。",

          e3:
            "result fromは「～から生じる」という意味です。課題の難しさが影響の一因にはなりますが、複数の条件に応じて効果が変化するという本文にはvary according toが最も適切です。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 25
  // Libraries as Community Spaces
  // =========================================================
  {
    id: "q10_original_025",
    number: 25,
    sourceType: "original",

    title: "Libraries as Community Spaces",
    titleJa: "地域の交流拠点としての図書館",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Public libraries have traditionally been places where people borrow books and search for information.",

            ja:
              "公共図書館は従来、本を借りたり情報を探したりする場所でした。",

            notes: [
              {
                id: "q10_original_025_note_001",

                expression:
                  "public library",

                meaning:
                  "公共図書館",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_002",

                expression:
                  "traditionally",

                meaning:
                  "従来、伝統的に",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_003",

                expression:
                  "search for information",

                meaning:
                  "情報を探す",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Today, many libraries provide a wider range of services and activities.",

            ja:
              "現在、多くの図書館が、より幅広いサービスや活動を提供しています。",

            notes: [
              {
                id: "q10_original_025_note_004",

                expression:
                  "a wide range of",

                meaning:
                  "幅広い～",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_005",

                expression:
                  "provide a service",

                meaning:
                  "サービスを提供する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Visitors may use computers, attend events, study with friends, or ask staff members for assistance.",

            ja:
              "利用者は、コンピューターを使ったり、行事に参加したり、友人と勉強したり、職員に助けを求めたりできます。",

            notes: [
              {
                id: "q10_original_025_note_006",

                expression:
                  "attend an event",

                meaning:
                  "行事に参加する",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_007",

                expression:
                  "ask A for assistance",

                meaning:
                  "Aに助けを求める",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "As their roles expand, libraries can {{a}} important meeting places for local residents.",

            ja:
              "役割が広がるにつれて、図書館は地域住民にとって重要な交流の場として機能することができます。",

            notes: [
              {
                id: "q10_original_025_note_008",

                expression:
                  "as one's role expands",

                meaning:
                  "役割が広がるにつれて",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_009",

                expression:
                  "serve as",

                meaning:
                  "～として機能する、～の役割を果たす",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_010",

                expression:
                  "local resident",

                meaning:
                  "地域住民",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "One valuable feature of a public library is that many different people can use it.",

            ja:
              "公共図書館の価値ある特徴の一つは、さまざまな人が利用できることです。",

            notes: [
              {
                id: "q10_original_025_note_011",

                expression:
                  "valuable feature",

                meaning:
                  "価値ある特徴",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Children may visit after school, older people may read newspapers, and job seekers may search for employment information.",

            ja:
              "子どもは放課後に訪れ、高齢者は新聞を読み、仕事を探している人は求人情報を調べることができます。",

            notes: [
              {
                id: "q10_original_025_note_012",

                expression:
                  "job seeker",

                meaning:
                  "仕事を探している人、求職者",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_013",

                expression:
                  "employment information",

                meaning:
                  "求人・雇用情報",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "People who do not own a computer may {{b}} devices and an Internet connection at the library.",

            ja:
              "コンピューターを所有していない人でも、図書館で端末やインターネット接続を利用できる場合があります。",

            notes: [
              {
                id: "q10_original_025_note_014",

                expression:
                  "have access to",

                meaning:
                  "～を利用できる、～に接する機会がある",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_015",

                expression:
                  "Internet connection",

                meaning:
                  "インターネット接続",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Students may also find a quiet place to work when their homes are crowded or noisy.",

            ja:
              "家庭が混雑していたり騒がしかったりする場合、生徒は静かに勉強できる場所を見つけることもできます。",

            notes: [
              {
                id: "q10_original_025_note_016",

                expression:
                  "a quiet place to work",

                meaning:
                  "静かに勉強や作業ができる場所",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_017",

                expression:
                  "crowded or noisy",

                meaning:
                  "混雑している、または騒がしい",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "By offering shared resources, libraries can reduce differences in people's opportunities to learn.",

            ja:
              "共有できる資料や設備を提供することで、図書館は人々の学習機会の差を小さくできます。",

            notes: [
              {
                id: "q10_original_025_note_018",

                expression:
                  "shared resource",

                meaning:
                  "共有して使える資料や設備",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_019",

                expression:
                  "reduce differences in",

                meaning:
                  "～の差を小さくする",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_020",

                expression:
                  "an opportunity to learn",

                meaning:
                  "学ぶ機会",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Libraries can also bring community members together through events.",

            ja:
              "図書館は、行事を通して地域の人々を結びつけることもできます。",

            notes: [
              {
                id: "q10_original_025_note_021",

                expression:
                  "bring people together",

                meaning:
                  "人々を結びつける、集める",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_022",

                expression:
                  "community member",

                meaning:
                  "地域の一員、地域住民",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "They may hold reading activities for children, computer lessons for adults, or talks by local experts.",

            ja:
              "子ども向けの読書活動、大人向けのコンピューター講座、地域の専門家による講演などを開くことがあります。",

            notes: [
              {
                id: "q10_original_025_note_023",

                expression:
                  "hold an activity",

                meaning:
                  "活動や行事を開催する",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_024",

                expression:
                  "local expert",

                meaning:
                  "地域の専門家",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Language exchange meetings can give newcomers a chance to practice the local language and meet other residents.",

            ja:
              "言語交流会は、新しく地域に来た人に、現地の言語を練習し、ほかの住民と出会う機会を与えます。",

            notes: [
              {
                id: "q10_original_025_note_025",

                expression:
                  "language exchange meeting",

                meaning:
                  "言語交流会",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_026",

                expression:
                  "newcomer",

                meaning:
                  "新しく来た人、新住民",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_027",

                expression:
                  "give A a chance to do",

                meaning:
                  "Aに～する機会を与える",

                weakEligible: true
              }
            ]
          },

          {
  id: "s13",

  en:
    "{{c}}, such programs allow people of different ages and backgrounds to share the same public space.",

  ja:
    "また、そのような活動によって、年齢や背景の異なる人々が同じ公共空間を共有できます。",

  notes: [
    {
      id: "q10_original_025_note_028",

      expression:
        "also",

      meaning:
        "また、さらに",

      weakEligible: true
    },

    {
      id: "q10_original_025_note_029",

      expression:
        "people of different ages and backgrounds",

      meaning:
        "年齢や背景の異なる人々",

      weakEligible: true
    },

    {
      id: "q10_original_025_note_030",

      expression:
        "public space",

      meaning:
        "公共空間",

      weakEligible: true
    }
  ]
},

          {
            id: "s14",

            en:
              "People who would not normally meet one another may begin conversations or discover common interests.",

            ja:
              "普段なら出会わない人同士が、会話を始めたり、共通の関心を見つけたりすることがあります。",

            notes: [
              {
                id: "q10_original_025_note_031",

                expression:
                  "would not normally do",

                meaning:
                  "普段なら～しないだろう",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_032",

                expression:
                  "discover a common interest",

                meaning:
                  "共通の関心を見つける",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s15",

            en:
              "Turning a library into an active community space can also create challenges.",

            ja:
              "図書館を活発な地域交流の場にすることは、問題を生み出す場合もあります。",

            notes: [
              {
                id: "q10_original_025_note_033",

                expression:
                  "turn A into B",

                meaning:
                  "AをBに変える",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_034",

                expression:
                  "create a challenge",

                meaning:
                  "課題を生み出す",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "Visitors who need silence may be disturbed by conversations, children's activities, or public events.",

            ja:
              "静けさを必要とする利用者は、会話、子どもの活動、一般向け行事などに妨げられることがあります。",

            notes: [
              {
                id: "q10_original_025_note_035",

                expression:
                  "be disturbed by",

                meaning:
                  "～によって妨げられる",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_036",

                expression:
                  "need silence",

                meaning:
                  "静けさを必要とする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Libraries may therefore need separate areas for quiet study, group work, and events.",

            ja:
              "そのため図書館には、静かな学習、グループ活動、行事のための別々の場所が必要になる場合があります。",

            notes: [
              {
                id: "q10_original_025_note_037",

                expression:
                  "separate area for",

                meaning:
                  "～のための別の場所",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_038",

                expression:
                  "group work",

                meaning:
                  "グループ活動",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Library staff must also decide which services should be {{d}} all visitors and which require advance registration.",

            ja:
              "図書館職員は、どのサービスをすべての利用者に開放し、どのサービスに事前登録を必要とするかも決めなければなりません。",

            notes: [
              {
                id: "q10_original_025_note_039",

                expression:
                  "be open to",

                meaning:
                  "～に開放されている、～が利用できる",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_040",

                expression:
                  "advance registration",

                meaning:
                  "事前登録",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Basic services should remain available {{e}} so that people are not excluded because they cannot afford to pay.",

            ja:
              "支払う余裕がないことを理由に人々が排除されないよう、基本的なサービスは無料で利用できる状態を保つべきです。",

            notes: [
              {
                id: "q10_original_025_note_041",

                expression:
                  "free of charge",

                meaning:
                  "無料で",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_042",

                expression:
                  "be excluded",

                meaning:
                  "排除される、利用から締め出される",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_043",

                expression:
                  "cannot afford to do",

                meaning:
                  "～する金銭的余裕がない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Local governments must provide enough funding, equipment, and trained staff to maintain these services.",

            ja:
              "自治体は、こうしたサービスを維持するため、十分な資金、設備、訓練を受けた職員を用意しなければなりません。",

            notes: [
              {
                id: "q10_original_025_note_044",

                expression:
                  "provide enough funding",

                meaning:
                  "十分な資金を提供する",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_045",

                expression:
                  "trained staff",

                meaning:
                  "訓練を受けた職員",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_046",

                expression:
                  "maintain a service",

                meaning:
                  "サービスを維持する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "A successful community library balances the need for quiet learning with opportunities for communication and shared activity.",

            ja:
              "地域の図書館を有効に機能させるには、静かに学ぶ必要性と、交流や共同活動の機会とのバランスを取ることが大切です。",

            notes: [
              {
                id: "q10_original_025_note_047",

                expression:
                  "balance A with B",

                meaning:
                  "AとBのバランスを取る",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_048",

                expression:
                  "shared activity",

                meaning:
                  "共同活動",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "When these needs are carefully managed, a library can become a place where knowledge, support, and relationships are shared.",

            ja:
              "こうした必要性が適切に調整されれば、図書館は知識、支援、人とのつながりが共有される場所になり得ます。",

            notes: [
              {
                id: "q10_original_025_note_049",

                expression:
                  "be carefully managed",

                meaning:
                  "慎重に、適切に管理される",

                weakEligible: true
              },

              {
                id: "q10_original_025_note_050",

                expression:
                  "share knowledge and support",

                meaning:
                  "知識や支援を共有する",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "depend on"
          },

          {
            id: "a2",
            text: "serve as"
          },

          {
            id: "a3",
            text: "suffer from"
          },

          {
            id: "a4",
            text: "take after"
          }
        ],

        answer: "a2",

        explanation:
          "図書館が本を借りる場所にとどまらず、地域住民が集まる重要な場所として機能するという内容です。serve as Aで「Aとして機能する」「Aの役割を果たす」という意味になります。",

        wrongChoiceReasons: {
          a1:
            "depend onは「～に頼る、～次第である」という意味で、図書館の役割を表せません。",

          a3:
            "suffer fromは「～に苦しむ」という意味で、meeting placesとの組合せは不自然です。",

          a4:
            "take afterは「人に似ている」という意味で、施設の機能を表せません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "have access to"
          },

          {
            id: "b2",
            text: "keep away from"
          },

          {
            id: "b3",
            text: "look down on"
          },

          {
            id: "b4",
            text: "run short of"
          }
        ],

        answer: "b1",

        explanation:
          "自宅にコンピューターがない人でも、図書館の端末やインターネットを利用できるという内容です。have access to Aで「Aを利用できる」「Aに接する機会がある」という意味になります。",

        wrongChoiceReasons: {
          b2:
            "keep away fromは「～に近づかない」という意味で、端末を利用する内容と反対です。",

          b3:
            "look down onは「～を見下す」という意味で、設備の利用を表しません。",

          b4:
            "run short ofは「～が不足する」という意味です。人々が端末を不足するという不自然な意味になります。"
        }
      },

      {
  id: "c",

  choices: [
    {
      id: "c1",
      text: "Also"
    },

    {
      id: "c2",
      text: "For example"
    },

    {
      id: "c3",
      text: "However"
    },

    {
      id: "c4",
      text: "Instead"
    }
  ],

  answer: "c1",

  explanation:
    "直前では、図書館が読書活動、講座、言語交流会などを開くことについて述べています。続く文では、そのような活動には、異なる年齢や背景を持つ人々が同じ場所を共有できるという利点もあることを追加しています。そのため、Alsoが適切です。",

  wrongChoiceReasons: {
    c2:
      "後ろの文は、図書館で行われる活動の具体例ではなく、それらの活動が持つ別の利点です。",

    c3:
      "後ろの内容は、直前の内容と反対ではなく、別の利点を追加しています。",

    c4:
      "Insteadは「その代わりに」という意味ですが、前の活動を別のものに置き換えているわけではありません。"
  }
},

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "afraid of"
          },

          {
            id: "d2",
            text: "different from"
          },

          {
            id: "d3",
            text: "open to"
          },

          {
            id: "d4",
            text: "proud of"
          }
        ],

        answer: "d3",

        explanation:
          "どのサービスをすべての利用者が利用できるようにし、どのサービスに登録を必要とするかを決めるという内容です。be open to Aで「Aに開放されている」「Aが利用できる」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "サービスが利用者を恐れているという不自然な意味になります。",

          d2:
            "サービスが利用者と異なっているという意味になり、利用条件を表せません。",

          d4:
            "サービスが利用者を誇りに思うという不自然な意味になります。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "at first"
          },

          {
            id: "e2",
            text: "by accident"
          },

          {
            id: "e3",
            text: "free of charge"
          },

          {
            id: "e4",
            text: "in advance"
          }
        ],

        answer: "e3",

        explanation:
          "お金を払う余裕がない人も基本的なサービスから排除されないよう、無料で提供するべきだという内容です。free of chargeで「無料で」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "at firstは「最初は」という意味で、サービスの料金について述べられません。",

          e2:
            "by accidentは「偶然に」という意味で、利用者への公平な提供方法を表しません。",

          e4:
            "in advanceは「前もって」という意味です。サービスが無料であることを表せません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 26
  // Local Festivals and Young People
  // =========================================================
  {
    id: "q10_original_026",
    number: 26,
    sourceType: "original",

    title: "Local Festivals and Young People",
    titleJa: "地域の祭りと若者",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Local festivals are held in many communities throughout the year.",

            ja:
              "一年を通して、多くの地域で祭りが開かれています。",

            notes: [
              {
                id: "q10_original_026_note_001",

                expression:
                  "local festival",

                meaning:
                  "地域の祭り",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_002",

                expression:
                  "throughout the year",

                meaning:
                  "一年を通して",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Some celebrate a religious event, a season, a local product, or an important part of regional history.",

            ja:
              "宗教行事、季節、地域の特産品、地域の歴史上重要な出来事などを祝う祭りがあります。",

            notes: [
              {
                id: "q10_original_026_note_003",

                expression:
                  "celebrate an event",

                meaning:
                  "行事を祝う",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_004",

                expression:
                  "local product",

                meaning:
                  "地域の特産品",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_005",

                expression:
                  "regional history",

                meaning:
                  "地域の歴史",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Residents may carry traditional objects, perform music and dances, or prepare special food.",

            ja:
              "住民は、伝統的な道具を運んだり、音楽や踊りを披露したり、特別な食べ物を用意したりします。",

            notes: [
              {
                id: "q10_original_026_note_006",

                expression:
                  "traditional object",

                meaning:
                  "伝統的な道具や物",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_007",

                expression:
                  "perform music and dances",

                meaning:
                  "音楽や踊りを披露する",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_008",

                expression:
                  "prepare special food",

                meaning:
                  "特別な食べ物を用意する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "A successful festival may {{a}} visitors from outside the community as well as local residents.",

            ja:
              "成功した祭りは、地域住民だけでなく、地域外からの訪問者も引きつけることがあります。",

            notes: [
              {
                id: "q10_original_026_note_009",

                expression:
                  "attract visitors",

                meaning:
                  "訪問者を引きつける",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_010",

                expression:
                  "outside the community",

                meaning:
                  "地域の外から",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_011",

                expression:
                  "A as well as B",

                meaning:
                  "BだけでなくAも",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Festivals can help a community preserve its culture and history.",

            ja:
              "祭りは、地域が文化や歴史を守る助けになります。",

            notes: [
              {
                id: "q10_original_026_note_012",

                expression:
                  "preserve culture",

                meaning:
                  "文化を守る、保存する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Traditional songs, movements, clothing, and methods of preparation are often learned through participation.",

            ja:
              "伝統的な歌、動き、衣装、準備方法などは、参加を通して学ばれることがよくあります。",

            notes: [
              {
                id: "q10_original_026_note_013",

                expression:
                  "method of preparation",

                meaning:
                  "準備の方法",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_014",

                expression:
                  "through participation",

                meaning:
                  "参加を通して",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Such knowledge may not be fully explained in books or written instructions.",

            ja:
              "そのような知識は、本や書かれた説明だけでは十分に伝えられないことがあります。",

            notes: [
              {
                id: "q10_original_026_note_015",

                expression:
                  "written instruction",

                meaning:
                  "書かれた説明、指示",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_016",

                expression:
                  "not be fully explained",

                meaning:
                  "十分には説明されない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Instead, skills and customs are often {{b}} from older residents to younger members of the community.",

            ja:
              "その代わりに、技能や習慣は、年長の住民から地域の若い世代へ受け継がれることがよくあります。",

            notes: [
              {
                id: "q10_original_026_note_017",

                expression:
                  "be handed down from A to B",

                meaning:
                  "AからBへ受け継がれる",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_018",

                expression:
                  "custom",

                meaning:
                  "習慣、慣習",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_019",

                expression:
                  "older residents",

                meaning:
                  "年長の住民",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "Working together for a festival may also strengthen relationships among neighbors.",

            ja:
              "祭りのために協力することで、近所の人同士の関係が強まる場合もあります。",

            notes: [
              {
                id: "q10_original_026_note_020",

                expression:
                  "work together for",

                meaning:
                  "～のために協力する",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_021",

                expression:
                  "strengthen relationships",

                meaning:
                  "人間関係を強める",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_022",

                expression:
                  "among neighbors",

                meaning:
                  "近所の人々の間で",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Young people can play several important roles in local festivals.",

            ja:
              "若者は、地域の祭りでいくつかの重要な役割を果たすことができます。",

            notes: [
              {
                id: "q10_original_026_note_023",

                expression:
                  "play an important role in",

                meaning:
                  "～で重要な役割を果たす",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "They may help prepare decorations, carry equipment, guide visitors, or clean the area after the event.",

            ja:
              "飾りを準備したり、用具を運んだり、訪問者を案内したり、行事後に会場を清掃したりすることがあります。",

            notes: [
              {
                id: "q10_original_026_note_024",

                expression:
                  "prepare decorations",

                meaning:
                  "飾りを準備する",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_025",

                expression:
                  "guide visitors",

                meaning:
                  "訪問者を案内する",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_026",

                expression:
                  "after the event",

                meaning:
                  "行事の後に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "{{c}}, students can use social media to introduce the festival and provide information about its schedule.",

            ja:
              "例えば、生徒はSNSを使って祭りを紹介し、開催予定についての情報を提供できます。",

            notes: [
              {
                id: "q10_original_026_note_027",

                expression:
                  "for example",

                meaning:
                  "例えば",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_028",

                expression:
                  "introduce a festival",

                meaning:
                  "祭りを紹介する",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_029",

                expression:
                  "provide information about",

                meaning:
                  "～についての情報を提供する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "They may be able to communicate with people who would not learn about the event through traditional advertising.",

            ja:
              "従来の広告では行事を知ることのない人々にも、情報を伝えられる可能性があります。",

            notes: [
              {
                id: "q10_original_026_note_030",

                expression:
                  "communicate with",

                meaning:
                  "～と意思疎通する、～に情報を伝える",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_031",

                expression:
                  "traditional advertising",

                meaning:
                  "従来型の広告",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "When young people are {{d}} planning and operating a festival, they can offer new ideas while learning from older participants.",

            ja:
              "若者が祭りの計画や運営に関わると、年長の参加者から学びながら、新しい考えを提案できます。",

            notes: [
              {
                id: "q10_original_026_note_032",

                expression:
                  "be involved in",

                meaning:
                  "～に関わっている、参加している",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_033",

                expression:
                  "operate a festival",

                meaning:
                  "祭りを運営する",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_034",

                expression:
                  "offer a new idea",

                meaning:
                  "新しい考えを提案する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "This cooperation can connect different generations and give younger residents a stronger sense of belonging.",

            ja:
              "この協力によって、異なる世代が結びつき、若い住民が地域へのより強い帰属意識を持てる場合があります。",

            notes: [
              {
                id: "q10_original_026_note_035",

                expression:
                  "connect different generations",

                meaning:
                  "異なる世代を結びつける",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_036",

                expression:
                  "a sense of belonging",

                meaning:
                  "帰属意識、自分の居場所だという感覚",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "Many local festivals, however, face difficulties in finding enough participants.",

            ja:
              "しかし、多くの地域の祭りは、十分な参加者を集めることに苦労しています。",

            notes: [
              {
                id: "q10_original_026_note_037",

                expression:
                  "face difficulty in doing",

                meaning:
                  "～することに困難を抱える",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_038",

                expression:
                  "find enough participants",

                meaning:
                  "十分な参加者を集める",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Some communities have fewer children and young adults than they did in the past.",

            ja:
              "地域によっては、子どもや若い成人の数が以前より少なくなっています。",

            notes: [
              {
                id: "q10_original_026_note_039",

                expression:
                  "fewer A than before",

                meaning:
                  "以前より少ないA",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_040",

                expression:
                  "young adult",

                meaning:
                  "若い成人",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Young residents may also move away for education or work and return only occasionally.",

            ja:
              "若い住民が進学や仕事のために地域を離れ、たまにしか戻らない場合もあります。",

            notes: [
              {
                id: "q10_original_026_note_041",

                expression:
                  "move away for",

                meaning:
                  "～のために別の土地へ移る",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_042",

                expression:
                  "occasionally",

                meaning:
                  "時折、たまに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Others may be interested in the festival but unable to join because of school, work, or family duties.",

            ja:
              "祭りに関心があっても、学校、仕事、家庭での役割のために参加できない人もいます。",

            notes: [
              {
                id: "q10_original_026_note_043",

                expression:
                  "be interested in",

                meaning:
                  "～に関心がある",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_044",

                expression:
                  "family duty",

                meaning:
                  "家庭での役割や務め",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "A tradition may gradually disappear {{e}} younger generations have opportunities to learn and practice it.",

            ja:
              "若い世代にその伝統を学び、実践する機会がなければ、伝統は少しずつ失われる可能性があります。",

            notes: [
              {
                id: "q10_original_026_note_045",

                expression:
                  "unless",

                meaning:
                  "～でない限り、もし～でなければ",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_046",

                expression:
                  "gradually disappear",

                meaning:
                  "少しずつ失われる、消えていく",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_047",

                expression:
                  "have an opportunity to do",

                meaning:
                  "～する機会がある",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Festival organizers should therefore make participation easier by sharing duties and offering flexible schedules.",

            ja:
              "そのため、祭りの運営者は、役割を分担し、柔軟な予定を用意することで、参加しやすくするべきです。",

            notes: [
              {
                id: "q10_original_026_note_048",

                expression:
                  "festival organizer",

                meaning:
                  "祭りの運営者",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_049",

                expression:
                  "share duties",

                meaning:
                  "役割を分担する",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_050",

                expression:
                  "flexible schedule",

                meaning:
                  "柔軟な予定",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "Local festivals are more likely to continue when young people are treated not only as helpers but also as active members of the community.",

            ja:
              "若者が単なる手伝い役ではなく、地域の積極的な一員として扱われるとき、地域の祭りは継続しやすくなります。",

            notes: [
              {
                id: "q10_original_026_note_051",

                expression:
                  "be treated as",

                meaning:
                  "～として扱われる",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_052",

                expression:
                  "not only A but also B",

                meaning:
                  "AだけでなくBも",

                weakEligible: true
              },

              {
                id: "q10_original_026_note_053",

                expression:
                  "active member of the community",

                meaning:
                  "地域の積極的な一員",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "attract"
          },

          {
            id: "a2",
            text: "avoid"
          },

          {
            id: "a3",
            text: "prevent"
          },

          {
            id: "a4",
            text: "refuse"
          }
        ],

        answer: "a1",

        explanation:
          "祭りが地域の外からも訪問者を呼び込むという内容です。attract visitorsで「訪問者を引きつける」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "avoid visitorsでは「訪問者を避ける」という意味になり、祭りが人を集める内容と反対です。",

          a3:
            "prevent visitorsだけでは「訪問者を妨げる」という不完全で不自然な意味になります。prevent A from doingの形が一般的です。",

          a4:
            "refuse visitorsでは「訪問者を拒む」という意味になり、祭りの成功を表す文脈に合いません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "broken down"
          },

          {
            id: "b2",
            text: "handed down"
          },

          {
            id: "b3",
            text: "turned down"
          },

          {
            id: "b4",
            text: "written down"
          }
        ],

        answer: "b2",

        explanation:
          "技能や習慣が、年長の住民から若い世代へ受け継がれるという内容です。be handed down from A to Bで「AからBへ受け継がれる」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "be broken downは「故障する」「分解される」という意味で、伝統の継承を表しません。",

          b3:
            "be turned downは「断られる」「音量などを下げられる」という意味で、技能や習慣には合いません。",

          b4:
            "be written downは「書き留められる」という意味です。直前では、本や説明だけでなく、実際の参加を通して伝えられると述べています。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For example"
          },

          {
            id: "c2",
            text: "However"
          },

          {
            id: "c3",
            text: "Instead"
          },

          {
            id: "c4",
            text: "Therefore"
          }
        ],

        answer: "c1",

        explanation:
          "若者が祭りで果たせる役割について述べた後、SNSを使って祭りを紹介するという具体的な例を挙げています。そのため、For exampleが適切です。",

        wrongChoiceReasons: {
          c2:
            "後ろの内容は、若者が祭りで役割を果たすという前の内容と反対ではありません。",

          c3:
            "前の活動の代わりとなる別の行動を示しているのではなく、役割の具体例を示しています。",

          c4:
            "SNSで紹介することは、直前の内容から導かれる結果ではなく、若者ができることの一例です。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "afraid of"
          },

          {
            id: "d2",
            text: "involved in"
          },

          {
            id: "d3",
            text: "known for"
          },

          {
            id: "d4",
            text: "satisfied with"
          }
        ],

        answer: "d2",

        explanation:
          "若者が祭りの計画や運営に実際に関わっているという内容です。be involved in Aで「Aに関わっている」「Aに参加している」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "祭りの計画や運営を恐れているという意味になり、若者が新しい考えを出すという後半に合いません。",

          d3:
            "be known forは「～で知られている」という意味で、活動への参加を表せません。",

          d4:
            "be satisfied withは「～に満足している」という意味で、計画や運営に参加することを表しません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "because"
          },

          {
            id: "e2",
            text: "even if"
          },

          {
            id: "e3",
            text: "unless"
          },

          {
            id: "e4",
            text: "while"
          }
        ],

        answer: "e3",

        explanation:
          "若い世代が伝統を学び、実践する機会を持たなければ、その伝統が失われる可能性があるという条件を表しています。unlessは「～でない限り」「もし～でなければ」という意味です。",

        wrongChoiceReasons: {
          e1:
            "becauseでは、若い世代に学ぶ機会があることが、伝統が消える理由になってしまい、意味が反対になります。",

          e2:
            "even ifでは「若い世代に学ぶ機会があったとしても、伝統が消える」という意味になり、本文の主張に合いません。",

          e4:
            "whileでは「若い世代に機会がある間に、伝統が消える」という意味になり、不自然です。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 27
  // Volunteering in Local Communities
  // =========================================================
  {
    id: "q10_original_027",
    number: 27,
    sourceType: "original",

    title: "Volunteering in Local Communities",
    titleJa: "地域社会でのボランティア活動",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Local communities depend on many services and activities that are not provided by businesses or governments alone.",

            ja:
              "地域社会は、企業や行政だけでは提供できない多くのサービスや活動によって支えられています。",

            notes: [
              {
                id: "q10_original_027_note_001",

                expression:
                  "depend on",

                meaning:
                  "～に頼る、～によって成り立つ",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_002",

                expression:
                  "be provided by",

                meaning:
                  "～によって提供される",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_003",

                expression:
                  "A alone",

                meaning:
                  "Aだけで",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Residents often help organize events, care for public spaces, or support people who face difficulties.",

            ja:
              "住民は、行事の運営を手伝ったり、公共の場所を管理したり、困難を抱える人を支援したりすることがあります。",

            notes: [
              {
                id: "q10_original_027_note_004",

                expression:
                  "organize an event",

                meaning:
                  "行事を企画・運営する",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_005",

                expression:
                  "care for",

                meaning:
                  "～を世話する、管理する",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_006",

                expression:
                  "face difficulties",

                meaning:
                  "困難に直面する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Some people volunteer through schools, companies, neighborhood groups, or nonprofit organizations.",

            ja:
              "学校、企業、地域団体、非営利団体などを通してボランティアをする人もいます。",

            notes: [
              {
                id: "q10_original_027_note_007",

                expression:
                  "neighborhood group",

                meaning:
                  "地域団体、近隣住民の団体",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_008",

                expression:
                  "nonprofit organization",

                meaning:
                  "非営利団体",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Others independently find opportunities to {{a}} activities that match their interests or skills.",

            ja:
              "自分の関心や技能に合う活動へ参加する機会を、自分で見つける人もいます。",

            notes: [
              {
                id: "q10_original_027_note_009",

                expression:
                  "independently",

                meaning:
                  "自分で、独立して",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_010",

                expression:
                  "participate in",

                meaning:
                  "～に参加する",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_011",

                expression:
                  "match one's interests",

                meaning:
                  "人の関心に合う",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Volunteering can provide practical support to people and organizations in need.",

            ja:
              "ボランティア活動は、支援を必要とする人や団体に実際的な助けを提供できます。",

            notes: [
              {
                id: "q10_original_027_note_012",

                expression:
                  "practical support",

                meaning:
                  "実際的な支援",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_013",

                expression:
                  "in need",

                meaning:
                  "困っている、支援を必要としている",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "For example, volunteers may deliver meals to older residents or help children with their schoolwork.",

            ja:
              "例えば、ボランティアが高齢の住民に食事を届けたり、子どもの学習を手伝ったりすることがあります。",

            notes: [
              {
                id: "q10_original_027_note_014",

                expression:
                  "deliver a meal to",

                meaning:
                  "～に食事を届ける",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_015",

                expression:
                  "help A with B",

                meaning:
                  "AのBを手伝う",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Others may collect donated goods, clean parks, or provide information at community events.",

            ja:
              "寄付された品物を集めたり、公園を清掃したり、地域行事で案内をしたりする人もいます。",

            notes: [
              {
                id: "q10_original_027_note_016",

                expression:
                  "donated goods",

                meaning:
                  "寄付された品物",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_017",

                expression:
                  "provide information",

                meaning:
                  "情報や案内を提供する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Even a small amount of help can {{b}} the daily lives of people who receive it.",

            ja:
              "わずかな支援であっても、それを受ける人の日常生活を変えることがあります。",

            notes: [
              {
                id: "q10_original_027_note_018",

                expression:
                  "a small amount of",

                meaning:
                  "少量の～、わずかな～",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_019",

                expression:
                  "make a difference to",

                meaning:
                  "～に変化や影響をもたらす",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_020",

                expression:
                  "daily life",

                meaning:
                  "日常生活",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "A few hours of assistance may allow a local organization to continue a service that it could not operate alone.",

            ja:
              "数時間の支援によって、地域団体が単独では運営できないサービスを継続できる場合があります。",

            notes: [
              {
                id: "q10_original_027_note_021",

                expression:
                  "a few hours of assistance",

                meaning:
                  "数時間の支援",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_022",

                expression:
                  "operate a service",

                meaning:
                  "サービスを運営する",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Volunteers themselves can also gain valuable experience.",

            ja:
              "ボランティアをする人自身も、価値ある経験を得ることができます。",

            notes: [
              {
                id: "q10_original_027_note_023",

                expression:
                  "gain valuable experience",

                meaning:
                  "価値ある経験を得る",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "They may learn how to communicate with people of different ages, needs, and backgrounds.",

            ja:
              "年齢、必要としていること、背景の異なる人との接し方を学ぶことがあります。",

            notes: [
              {
                id: "q10_original_027_note_024",

                expression:
                  "learn how to do",

                meaning:
                  "～する方法を学ぶ",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_025",

                expression:
                  "people of different backgrounds",

                meaning:
                  "異なる背景を持つ人々",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Working as part of a team can develop cooperation, planning, and problem-solving skills.",

            ja:
              "チームの一員として活動することで、協調性、計画力、問題解決力を伸ばせます。",

            notes: [
              {
                id: "q10_original_027_note_026",

                expression:
                  "as part of a team",

                meaning:
                  "チームの一員として",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_027",

                expression:
                  "problem-solving skill",

                meaning:
                  "問題解決力",

                weakEligible: true
              }
            ]
          },

         {
  id: "s13",

  en:
    "{{c}}, volunteers may discover local problems that they had not previously noticed.",

  ja:
    "さらに、ボランティアをする人は、それまで気づかなかった地域の問題を発見する場合があります。",

  notes: [
    {
      id: "q10_original_027_note_028",

      expression:
        "furthermore",

      meaning:
        "さらに、その上",

      weakEligible: true
    },

    {
      id: "q10_original_027_note_029",

      expression:
        "discover a local problem",

      meaning:
        "地域の問題を発見する",

      weakEligible: true
    },

    {
      id: "q10_original_027_note_030",

      expression:
        "previously",

      meaning:
        "以前に、それまでに",

      weakEligible: true
    }
  ]
},

          {
            id: "s14",

            en:
              "A student helping at a food center, for instance, may learn why some families have difficulty obtaining enough food.",

            ja:
              "例えば、食料支援施設で手伝う生徒は、十分な食料を得ることが難しい家庭がある理由を学ぶかもしれません。",

            notes: [
              {
                id: "q10_original_027_note_031",

                expression:
                  "food center",

                meaning:
                  "食料支援施設",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_032",

                expression:
                  "have difficulty doing",

                meaning:
                  "～することが難しい",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_033",

                expression:
                  "obtain enough food",

                meaning:
                  "十分な食料を得る",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "Such experiences can encourage people to think more seriously about their community and their own role within it.",

            ja:
              "そのような経験によって、人々は地域社会やその中での自分の役割について、より真剣に考えるようになることがあります。",

            notes: [
              {
                id: "q10_original_027_note_034",

                expression:
                  "encourage A to do",

                meaning:
                  "Aが～するよう促す",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_035",

                expression:
                  "one's role within",

                meaning:
                  "～の中での自分の役割",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "Volunteer programs must be planned carefully to protect both volunteers and the people they support.",

            ja:
              "ボランティア活動は、ボランティアと支援を受ける人の両方を守るため、慎重に計画されなければなりません。",

            notes: [
              {
                id: "q10_original_027_note_036",

                expression:
                  "be planned carefully",

                meaning:
                  "慎重に計画される",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_037",

                expression:
                  "both A and B",

                meaning:
                  "AとBの両方",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Volunteers may handle private information, work with children, or assist people with health problems.",

            ja:
              "ボランティアが、個人情報を扱ったり、子どもと活動したり、健康上の問題を抱える人を支援したりする場合があります。",

            notes: [
              {
                id: "q10_original_027_note_038",

                expression:
                  "handle private information",

                meaning:
                  "個人情報を扱う",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_039",

                expression:
                  "assist people with",

                meaning:
                  "～を抱える人を支援する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Organizations are {{d}} giving clear instructions, suitable training, and necessary supervision.",

            ja:
              "団体には、明確な指示、適切な研修、必要な監督を行う責任があります。",

            notes: [
              {
                id: "q10_original_027_note_040",

                expression:
                  "be responsible for doing",

                meaning:
                  "～する責任がある",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_041",

                expression:
                  "suitable training",

                meaning:
                  "適切な研修",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_042",

                expression:
                  "necessary supervision",

                meaning:
                  "必要な監督",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "They should not give inexperienced volunteers tasks that require professional knowledge or qualifications.",

            ja:
              "経験のないボランティアに、専門知識や資格を必要とする仕事を任せるべきではありません。",

            notes: [
              {
                id: "q10_original_027_note_043",

                expression:
                  "inexperienced volunteer",

                meaning:
                  "経験のないボランティア",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_044",

                expression:
                  "professional knowledge",

                meaning:
                  "専門知識",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_045",

                expression:
                  "qualification",

                meaning:
                  "資格",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "At the same time, volunteers should understand what is expected of them before accepting a role.",

            ja:
              "同時に、ボランティアも役割を引き受ける前に、自分に何が求められているかを理解するべきです。",

            notes: [
              {
                id: "q10_original_027_note_046",

                expression:
                  "be expected of",

                meaning:
                  "～に求められている",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_047",

                expression:
                  "accept a role",

                meaning:
                  "役割を引き受ける",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Community services often become more reliable when volunteers can participate {{e}} rather than only once.",

            ja:
              "ボランティアが一度だけではなく定期的に参加できると、地域のサービスはより安定したものになることが多くあります。",

            notes: [
              {
                id: "q10_original_027_note_048",

                expression:
                  "on a regular basis",

                meaning:
                  "定期的に、継続的に",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_049",

                expression:
                  "reliable",

                meaning:
                  "安定した、信頼できる",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_050",

                expression:
                  "rather than",

                meaning:
                  "～ではなく",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "Well-organized volunteering can connect residents, strengthen local services, and help individuals understand the needs of their community.",

            ja:
              "適切に運営されたボランティア活動は、住民を結びつけ、地域のサービスを強化し、一人ひとりが地域の必要性を理解する助けになります。",

            notes: [
              {
                id: "q10_original_027_note_051",

                expression:
                  "well-organized",

                meaning:
                  "適切に運営された、よく組織された",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_052",

                expression:
                  "strengthen local services",

                meaning:
                  "地域のサービスを強化する",

                weakEligible: true
              },

              {
                id: "q10_original_027_note_053",

                expression:
                  "the needs of a community",

                meaning:
                  "地域社会が必要としていること",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "participate in"
          },

          {
            id: "a2",
            text: "recover from"
          },

          {
            id: "a3",
            text: "remove from"
          },

          {
            id: "a4",
            text: "suffer from"
          }
        ],

        answer: "a1",

        explanation:
          "自分の関心や技能に合うボランティア活動へ参加するという内容です。participate in Aで「Aに参加する」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "recover fromは「～から回復する」という意味で、活動への参加を表しません。",

          a3:
            "remove A from Bなら「AをBから取り除く」という意味になります。remove from activitiesでは、活動から離れる意味になってしまいます。",

          a4:
            "suffer fromは「病気や問題に苦しむ」という意味で、活動との組合せは不自然です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "catch sight of"
          },

          {
            id: "b2",
            text: "keep in touch with"
          },

          {
            id: "b3",
            text: "make a difference to"
          },

          {
            id: "b4",
            text: "take the place of"
          }
        ],

        answer: "b3",

        explanation:
          "わずかな支援でも、支援を受ける人の日常生活によい変化をもたらすことがあるという内容です。make a difference to Aで「Aに変化や影響をもたらす」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "catch sight ofは「～を見かける」という意味で、生活への影響を表しません。",

          b2:
            "keep in touch withは「～と連絡を取り続ける」という意味です。支援が日常生活と連絡を取るという不自然な内容になります。",

          b4:
            "take the place ofは「～に取って代わる」という意味で、支援が人の日常生活そのものに置き換わることになってしまいます。"
        }
      },

      {
  id: "c",

  choices: [
    {
      id: "c1",
      text: "For example"
    },

    {
      id: "c2",
      text: "Furthermore"
    },

    {
      id: "c3",
      text: "However"
    },

    {
      id: "c4",
      text: "Instead"
    }
  ],

  answer: "c2",

  explanation:
    "直前では、ボランティアによってコミュニケーション力や協調性などを伸ばせると述べています。続く文では、地域の問題を知ることができるという別の利点を追加しているため、Furthermoreが適切です。",

  wrongChoiceReasons: {
    c1:
      "後ろの文は、チーム活動によって能力が伸びることの具体例ではなく、別の利点を追加しています。",

    c3:
      "後ろの内容は、直前に述べられたボランティアの利点と反対ではありません。",

    c4:
      "前の利点に代わるものを示しているのではなく、さらに別の利点を加えています。"
  }
},

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "famous for"
          },

          {
            id: "d2",
            text: "interested in"
          },

          {
            id: "d3",
            text: "responsible for"
          },

          {
            id: "d4",
            text: "satisfied with"
          }
        ],

        answer: "d3",

        explanation:
          "ボランティアを受け入れる団体には、明確な指示や研修、監督を行う責任があるという内容です。be responsible for doingで「～する責任がある」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "団体が指示や研修を行うことで有名だという意味になり、必要な義務や責任を表しません。",

          d2:
            "be interested in doingは「～することに関心がある」という意味ですが、安全な活動のために団体が果たすべき責任を表せません。",

          d4:
            "be satisfied with doingは「～することに満足している」という意味で、団体の責任について述べる文脈に合いません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "at once"
          },

          {
            id: "e2",
            text: "by accident"
          },

          {
            id: "e3",
            text: "in public"
          },

          {
            id: "e4",
            text: "on a regular basis"
          }
        ],

        answer: "e4",

        explanation:
          "地域のサービスを安定して継続するためには、ボランティアが一度だけでなく定期的に参加することが望ましいという内容です。on a regular basisで「定期的に」「継続的に」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "at onceは「すぐに」という意味で、一度だけではなく継続して参加するという対比に合いません。",

          e2:
            "by accidentは「偶然に」という意味で、計画的なボランティア活動を表しません。",

          e3:
            "in publicは「人前で、公の場で」という意味で、参加する頻度を表しません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 28
  // Sharing Meals with Family Members
  // =========================================================
  {
    id: "q10_original_028",
    number: 28,
    sourceType: "original",

    title: "Sharing Meals with Family Members",
    titleJa: "家族と一緒に食事をすること",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "In many families, it has become difficult for everyone to eat together.",

            ja:
              "多くの家庭で、家族全員が一緒に食事をすることが難しくなっています。",

            notes: [
              {
                id: "q10_original_028_note_001",

                expression:
                  "it becomes difficult for A to do",

                meaning:
                  "Aが～することが難しくなる",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_002",

                expression:
                  "eat together",

                meaning:
                  "一緒に食事をする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Parents may work late, while children attend club activities, lessons, or part-time jobs.",

            ja:
              "保護者が遅くまで働く一方で、子どもは部活動、習い事、アルバイトなどに参加することがあります。",

            notes: [
              {
                id: "q10_original_028_note_003",

                expression:
                  "work late",

                meaning:
                  "遅くまで働く",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_004",

                expression:
                  "attend a club activity",

                meaning:
                  "部活動に参加する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_005",

                expression:
                  "part-time job",

                meaning:
                  "アルバイト",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Some family members may eat at different times or prepare separate meals for themselves.",

            ja:
              "家族が異なる時間に食べたり、自分の分だけ別に食事を用意したりする場合もあります。",

            notes: [
              {
                id: "q10_original_028_note_006",

                expression:
                  "at different times",

                meaning:
                  "異なる時間に",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_007",

                expression:
                  "prepare a separate meal",

                meaning:
                  "別の食事を用意する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Although eating together is not always possible, shared meals can {{a}} family members and create time for communication.",

            ja:
              "一緒に食べることが常に可能とは限りませんが、家族での食事は家族を結びつけ、会話の時間を生み出します。",

            notes: [
              {
                id: "q10_original_028_note_008",

                expression:
                  "bring A together",

                meaning:
                  "Aを結びつける、Aを集める",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_009",

                expression:
                  "shared meal",

                meaning:
                  "一緒に取る食事",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_010",

                expression:
                  "create time for",

                meaning:
                  "～のための時間を生み出す",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "A family meal provides an opportunity to talk about daily experiences.",

            ja:
              "家族での食事は、日々の出来事について話す機会を与えます。",

            notes: [
              {
                id: "q10_original_028_note_011",

                expression:
                  "provide an opportunity to do",

                meaning:
                  "～する機会を与える",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_012",

                expression:
                  "daily experience",

                meaning:
                  "日々の経験、出来事",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Children may describe something that happened at school, while adults may share news from work or the neighborhood.",

            ja:
              "子どもは学校で起きたことを話し、大人は仕事や地域の出来事を共有することがあります。",

            notes: [
              {
                id: "q10_original_028_note_013",

                expression:
                  "describe something that happened",

                meaning:
                  "起きたことについて説明する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_014",

                expression:
                  "share news from",

                meaning:
                  "～での出来事を共有する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "These conversations can help family members understand one another's feelings and concerns.",

            ja:
              "こうした会話によって、家族は互いの気持ちや悩みを理解しやすくなります。",

            notes: [
              {
                id: "q10_original_028_note_015",

                expression:
                  "understand one another",

                meaning:
                  "互いを理解する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_016",

                expression:
                  "feeling and concern",

                meaning:
                  "気持ちや心配事",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Regular conversation may {{b}} parents to notice changes in a child's mood or behavior.",

            ja:
              "定期的に会話をすることで、保護者が子どもの気分や行動の変化に気づけるようになる場合があります。",

            notes: [
              {
                id: "q10_original_028_note_017",

                expression:
                  "make it possible for A to do",

                meaning:
                  "Aが～することを可能にする",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_018",

                expression:
                  "notice a change in",

                meaning:
                  "～の変化に気づく",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_019",

                expression:
                  "mood or behavior",

                meaning:
                  "気分や行動",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "A young person may also find it easier to ask for advice in a relaxed setting.",

            ja:
              "若者も、落ち着いた状況では助言を求めやすいと感じることがあります。",

            notes: [
              {
                id: "q10_original_028_note_020",

                expression:
                  "ask for advice",

                meaning:
                  "助言を求める",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_021",

                expression:
                  "in a relaxed setting",

                meaning:
                  "落ち着いた状況で",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Shared meals may also influence eating habits.",

            ja:
              "家族での食事は、食習慣にも影響を与える場合があります。",

            notes: [
              {
                id: "q10_original_028_note_022",

                expression:
                  "influence eating habits",

                meaning:
                  "食習慣に影響を与える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "When meals are prepared for several people, they may include a wider variety of foods.",

            ja:
              "複数の人のために食事を用意すると、よりさまざまな食品が含まれる場合があります。",

            notes: [
              {
                id: "q10_original_028_note_023",

                expression:
                  "a variety of foods",

                meaning:
                  "さまざまな食品",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_024",

                expression:
                  "be prepared for",

                meaning:
                  "～のために用意される",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Children can observe how adults choose food, serve suitable amounts, and behave at the table.",

            ja:
              "子どもは、大人がどのように食べ物を選び、適切な量を取り分け、食卓で振る舞うかを見ることができます。",

            notes: [
              {
                id: "q10_original_028_note_025",

                expression:
                  "observe how A does",

                meaning:
                  "Aがどのように～するかを観察する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_026",

                expression:
                  "serve a suitable amount",

                meaning:
                  "適切な量を取り分ける",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_027",

                expression:
                  "behave at the table",

                meaning:
                  "食卓で行儀よく振る舞う",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "They may gradually learn eating customs and basic cooking skills by helping prepare and serve food.",

            ja:
              "食事の準備や配膳を手伝うことで、食事の習慣や基本的な調理技術を少しずつ学ぶこともあります。",

            notes: [
              {
                id: "q10_original_028_note_028",

                expression:
                  "eating custom",

                meaning:
                  "食事に関する習慣",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_029",

                expression:
                  "basic cooking skill",

                meaning:
                  "基本的な調理技術",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_030",

                expression:
                  "prepare and serve food",

                meaning:
                  "食事を準備し、配膳する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "{{c}}, eating together does not automatically guarantee healthy food or pleasant conversation.",

            ja:
              "しかし、一緒に食事をするだけで、健康的な食事や楽しい会話が自動的に保証されるわけではありません。",

            notes: [
              {
                id: "q10_original_028_note_031",

                expression:
                  "however",

                meaning:
                  "しかしながら",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_032",

                expression:
                  "automatically guarantee",

                meaning:
                  "自動的に保証する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_033",

                expression:
                  "pleasant conversation",

                meaning:
                  "楽しい会話",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "Family meals may become stressful if people argue, criticize one another, or force children to eat.",

            ja:
              "言い争ったり、互いを批判したり、子どもに無理に食べさせたりすると、家族での食事がストレスの多いものになる場合があります。",

            notes: [
              {
                id: "q10_original_028_note_034",

                expression:
                  "become stressful",

                meaning:
                  "ストレスの多いものになる",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_035",

                expression:
                  "criticize one another",

                meaning:
                  "互いを批判する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_036",

                expression:
                  "force A to do",

                meaning:
                  "Aに無理に～させる",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "Families may face practical difficulties when trying to eat together.",

            ja:
              "家族が一緒に食事をしようとするとき、現実的な問題に直面することがあります。",

            notes: [
              {
                id: "q10_original_028_note_037",

                expression:
                  "face a practical difficulty",

                meaning:
                  "現実的な問題に直面する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_038",

                expression:
                  "when trying to do",

                meaning:
                  "～しようとするとき",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Different work and school schedules may make a fixed mealtime impossible.",

            ja:
              "仕事や学校の予定が異なることで、食事時間を固定することができない場合があります。",

            notes: [
              {
                id: "q10_original_028_note_039",

                expression:
                  "fixed mealtime",

                meaning:
                  "決まった食事時間",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_040",

                expression:
                  "make A impossible",

                meaning:
                  "Aを不可能にする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Some people may also be {{d}} the cost and time required to prepare food for everyone.",

            ja:
              "家族全員の食事を準備するために必要な費用や時間を心配する人もいます。",

            notes: [
              {
                id: "q10_original_028_note_041",

                expression:
                  "be concerned about",

                meaning:
                  "～を心配している、～を気にかけている",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_042",

                expression:
                  "the cost and time required to do",

                meaning:
                  "～するために必要な費用と時間",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "A shared meal does not have to be large, expensive, or completely homemade.",

            ja:
              "家族で一緒に食べる食事は、量が多かったり、高価だったり、すべて手作りだったりする必要はありません。",

            notes: [
              {
                id: "q10_original_028_note_043",

                expression:
                  "homemade",

                meaning:
                  "家庭で作られた、手作りの",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_044",

                expression:
                  "does not have to be",

                meaning:
                  "～である必要はない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Families can use simple food, prepare part of the meal in advance, or ask each person to help with one task.",

            ja:
              "簡単な食品を使ったり、食事の一部を前もって準備したり、一人ひとりに一つの作業を手伝ってもらったりできます。",

            notes: [
              {
                id: "q10_original_028_note_045",

                expression:
                  "in advance",

                meaning:
                  "前もって",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_046",

                expression:
                  "help with a task",

                meaning:
                  "作業を手伝う",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Even when eating together every day is unrealistic, family members may share a meal {{e}} once or twice a week.",

            ja:
              "毎日一緒に食べることが現実的でなくても、少なくとも週に一、二回は家族で食事をすることができます。",

            notes: [
              {
                id: "q10_original_028_note_047",

                expression:
                  "at least",

                meaning:
                  "少なくとも",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_048",

                expression:
                  "once or twice a week",

                meaning:
                  "週に一、二回",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_049",

                expression:
                  "be unrealistic",

                meaning:
                  "現実的ではない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "The value of a family meal lies less in the food itself than in the time people spend listening and talking to one another.",

            ja:
              "家族での食事の価値は、食べ物そのものよりも、互いの話を聞き、語り合う時間にあります。",

            notes: [
              {
                id: "q10_original_028_note_050",

                expression:
                  "lie in",

                meaning:
                  "～にある",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_051",

                expression:
                  "less in A than in B",

                meaning:
                  "AというよりもBにある",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_052",

                expression:
                  "talk to one another",

                meaning:
                  "互いに話す",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "bring together"
          },

          {
            id: "a2",
            text: "keep away"
          },

          {
            id: "a3",
            text: "take apart"
          },

          {
            id: "a4",
            text: "turn down"
          }
        ],

        answer: "a1",

        explanation:
          "家族で一緒に食事をすることによって、家族同士が結びつくという内容です。bring A togetherで「Aを結びつける」「Aを集める」という意味になります。空欄の後ろにfamily membersが続くため、bring togetherを入れます。",

        wrongChoiceReasons: {
          a2:
            "keep A awayは「Aを近づけない」という意味で、家族を結びつける内容と反対です。",

          a3:
            "take A apartは「Aを分解する、ばらばらにする」という意味で、家族の交流を表しません。",

          a4:
            "turn A downは「Aを断る」「音量などを下げる」という意味で、family membersとの組合せは不自然です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "make it difficult for"
          },

          {
            id: "b2",
            text: "make it possible for"
          },

          {
            id: "b3",
            text: "prevent"
          },

          {
            id: "b4",
            text: "require"
          }
        ],

        answer: "b2",

        explanation:
          "定期的な会話によって、保護者が子どもの変化に気づくことが可能になるという内容です。make it possible for A to doで「Aが～することを可能にする」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "子どもの変化に気づくことを難しくするという意味になり、定期的な会話の利点と反対です。",

          b3:
            "prevent A from doingの形が必要です。また、保護者が変化に気づくことを妨げる内容ではありません。",

          b4:
            "require A to doでは「Aに～することを要求する」という意味になり、会話によって気づけるようになるという意味を表せません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For example"
          },

          {
            id: "c2",
            text: "Furthermore"
          },

          {
            id: "c3",
            text: "However"
          },

          {
            id: "c4",
            text: "Therefore"
          }
        ],

        answer: "c3",

        explanation:
          "直前では、家族での食事によって食習慣や調理技術を学べるという利点を述べています。続く文では、一緒に食べるだけで必ず健康的で楽しい食事になるわけではないという注意点を示しているため、Howeverが適切です。",

        wrongChoiceReasons: {
          c1:
            "後ろの文は、食習慣を学ぶことの具体例ではなく、家族での食事の限界を示しています。",

          c2:
            "後ろの内容は利点を追加するものではなく、それまでの肯定的な説明に対する注意点です。",

          c4:
            "後ろの内容は、直前の利点から導かれる結果ではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "concerned about"
          },

          {
            id: "d2",
            text: "familiar with"
          },

          {
            id: "d3",
            text: "pleased with"
          },

          {
            id: "d4",
            text: "proud of"
          }
        ],

        answer: "d1",

        explanation:
          "家族全員の食事を準備するための費用や時間を心配しているという内容です。be concerned about Aで「Aを心配している」「Aを気にかけている」という意味になります。",

        wrongChoiceReasons: {
          d2:
            "be familiar withは「～をよく知っている、～に慣れている」という意味で、費用や時間についての不安を表しません。",

          d3:
            "be pleased withは「～に満足している」という意味で、食事準備の負担を心配する文脈に合いません。",

          d4:
            "be proud ofは「～を誇りに思う」という意味で、費用や時間との組合せは不自然です。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "at last"
          },

          {
            id: "e2",
            text: "at least"
          },

          {
            id: "e3",
            text: "at once"
          },

          {
            id: "e4",
            text: "at present"
          }
        ],

        answer: "e2",

        explanation:
          "毎日一緒に食べることが難しくても、最低限、週に一、二回は食事を共有できるという内容です。at leastで「少なくとも」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "at lastは「ついに」という意味で、回数の最低限を表しません。",

          e3:
            "at onceは「すぐに」または「同時に」という意味で、週に何回食べるかを表せません。",

          e4:
            "at presentは「現在は」という意味で、最低限の頻度を示す文脈に合いません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 28
  // Sharing Meals with Family Members
  // =========================================================
  {
    id: "q10_original_028",
    number: 28,
    sourceType: "original",

    title: "Sharing Meals with Family Members",
    titleJa: "家族と一緒に食事をすること",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "In many families, it has become difficult for everyone to eat together.",

            ja:
              "多くの家庭で、家族全員が一緒に食事をすることが難しくなっています。",

            notes: [
              {
                id: "q10_original_028_note_001",

                expression:
                  "it becomes difficult for A to do",

                meaning:
                  "Aが～することが難しくなる",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_002",

                expression:
                  "eat together",

                meaning:
                  "一緒に食事をする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Parents may work late, while children attend club activities, lessons, or part-time jobs.",

            ja:
              "保護者が遅くまで働く一方で、子どもは部活動、習い事、アルバイトなどに参加することがあります。",

            notes: [
              {
                id: "q10_original_028_note_003",

                expression:
                  "work late",

                meaning:
                  "遅くまで働く",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_004",

                expression:
                  "attend a club activity",

                meaning:
                  "部活動に参加する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_005",

                expression:
                  "part-time job",

                meaning:
                  "アルバイト",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Some family members may eat at different times or prepare separate meals for themselves.",

            ja:
              "家族が異なる時間に食べたり、自分の分だけ別に食事を用意したりする場合もあります。",

            notes: [
              {
                id: "q10_original_028_note_006",

                expression:
                  "at different times",

                meaning:
                  "異なる時間に",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_007",

                expression:
                  "prepare a separate meal",

                meaning:
                  "別の食事を用意する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Although eating together is not always possible, shared meals can {{a}} family members and create time for communication.",

            ja:
              "一緒に食べることが常に可能とは限りませんが、家族での食事は家族を結びつけ、会話の時間を生み出します。",

            notes: [
              {
                id: "q10_original_028_note_008",

                expression:
                  "bring A together",

                meaning:
                  "Aを結びつける、Aを集める",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_009",

                expression:
                  "shared meal",

                meaning:
                  "一緒に取る食事",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_010",

                expression:
                  "create time for",

                meaning:
                  "～のための時間を生み出す",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "A family meal provides an opportunity to talk about daily experiences.",

            ja:
              "家族での食事は、日々の出来事について話す機会を与えます。",

            notes: [
              {
                id: "q10_original_028_note_011",

                expression:
                  "provide an opportunity to do",

                meaning:
                  "～する機会を与える",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_012",

                expression:
                  "daily experience",

                meaning:
                  "日々の経験、出来事",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Children may describe something that happened at school, while adults may share news from work or the neighborhood.",

            ja:
              "子どもは学校で起きたことを話し、大人は仕事や地域の出来事を共有することがあります。",

            notes: [
              {
                id: "q10_original_028_note_013",

                expression:
                  "describe something that happened",

                meaning:
                  "起きたことについて説明する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_014",

                expression:
                  "share news from",

                meaning:
                  "～での出来事を共有する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "These conversations can help family members understand one another's feelings and concerns.",

            ja:
              "こうした会話によって、家族は互いの気持ちや悩みを理解しやすくなります。",

            notes: [
              {
                id: "q10_original_028_note_015",

                expression:
                  "understand one another",

                meaning:
                  "互いを理解する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_016",

                expression:
                  "feeling and concern",

                meaning:
                  "気持ちや心配事",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Regular conversation may {{b}} parents to notice changes in a child's mood or behavior.",

            ja:
              "定期的に会話をすることで、保護者が子どもの気分や行動の変化に気づけるようになる場合があります。",

            notes: [
              {
                id: "q10_original_028_note_017",

                expression:
                  "make it possible for A to do",

                meaning:
                  "Aが～することを可能にする",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_018",

                expression:
                  "notice a change in",

                meaning:
                  "～の変化に気づく",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_019",

                expression:
                  "mood or behavior",

                meaning:
                  "気分や行動",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "A young person may also find it easier to ask for advice in a relaxed setting.",

            ja:
              "若者も、落ち着いた状況では助言を求めやすいと感じることがあります。",

            notes: [
              {
                id: "q10_original_028_note_020",

                expression:
                  "ask for advice",

                meaning:
                  "助言を求める",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_021",

                expression:
                  "in a relaxed setting",

                meaning:
                  "落ち着いた状況で",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Shared meals may also influence eating habits.",

            ja:
              "家族での食事は、食習慣にも影響を与える場合があります。",

            notes: [
              {
                id: "q10_original_028_note_022",

                expression:
                  "influence eating habits",

                meaning:
                  "食習慣に影響を与える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "When meals are prepared for several people, they may include a wider variety of foods.",

            ja:
              "複数の人のために食事を用意すると、よりさまざまな食品が含まれる場合があります。",

            notes: [
              {
                id: "q10_original_028_note_023",

                expression:
                  "a variety of foods",

                meaning:
                  "さまざまな食品",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_024",

                expression:
                  "be prepared for",

                meaning:
                  "～のために用意される",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Children can observe how adults choose food, serve suitable amounts, and behave at the table.",

            ja:
              "子どもは、大人がどのように食べ物を選び、適切な量を取り分け、食卓で振る舞うかを見ることができます。",

            notes: [
              {
                id: "q10_original_028_note_025",

                expression:
                  "observe how A does",

                meaning:
                  "Aがどのように～するかを観察する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_026",

                expression:
                  "serve a suitable amount",

                meaning:
                  "適切な量を取り分ける",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_027",

                expression:
                  "behave at the table",

                meaning:
                  "食卓で行儀よく振る舞う",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "They may gradually learn eating customs and basic cooking skills by helping prepare and serve food.",

            ja:
              "食事の準備や配膳を手伝うことで、食事の習慣や基本的な調理技術を少しずつ学ぶこともあります。",

            notes: [
              {
                id: "q10_original_028_note_028",

                expression:
                  "eating custom",

                meaning:
                  "食事に関する習慣",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_029",

                expression:
                  "basic cooking skill",

                meaning:
                  "基本的な調理技術",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_030",

                expression:
                  "prepare and serve food",

                meaning:
                  "食事を準備し、配膳する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "{{c}}, eating together does not automatically guarantee healthy food or pleasant conversation.",

            ja:
              "しかし、一緒に食事をするだけで、健康的な食事や楽しい会話が自動的に保証されるわけではありません。",

            notes: [
              {
                id: "q10_original_028_note_031",

                expression:
                  "however",

                meaning:
                  "しかしながら",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_032",

                expression:
                  "automatically guarantee",

                meaning:
                  "自動的に保証する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_033",

                expression:
                  "pleasant conversation",

                meaning:
                  "楽しい会話",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "Family meals may become stressful if people argue, criticize one another, or force children to eat.",

            ja:
              "言い争ったり、互いを批判したり、子どもに無理に食べさせたりすると、家族での食事がストレスの多いものになる場合があります。",

            notes: [
              {
                id: "q10_original_028_note_034",

                expression:
                  "become stressful",

                meaning:
                  "ストレスの多いものになる",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_035",

                expression:
                  "criticize one another",

                meaning:
                  "互いを批判する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_036",

                expression:
                  "force A to do",

                meaning:
                  "Aに無理に～させる",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "Families may face practical difficulties when trying to eat together.",

            ja:
              "家族が一緒に食事をしようとするとき、現実的な問題に直面することがあります。",

            notes: [
              {
                id: "q10_original_028_note_037",

                expression:
                  "face a practical difficulty",

                meaning:
                  "現実的な問題に直面する",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_038",

                expression:
                  "when trying to do",

                meaning:
                  "～しようとするとき",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Different work and school schedules may make a fixed mealtime impossible.",

            ja:
              "仕事や学校の予定が異なることで、食事時間を固定することができない場合があります。",

            notes: [
              {
                id: "q10_original_028_note_039",

                expression:
                  "fixed mealtime",

                meaning:
                  "決まった食事時間",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_040",

                expression:
                  "make A impossible",

                meaning:
                  "Aを不可能にする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Some people may also be {{d}} the cost and time required to prepare food for everyone.",

            ja:
              "家族全員の食事を準備するために必要な費用や時間を心配する人もいます。",

            notes: [
              {
                id: "q10_original_028_note_041",

                expression:
                  "be concerned about",

                meaning:
                  "～を心配している、～を気にかけている",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_042",

                expression:
                  "the cost and time required to do",

                meaning:
                  "～するために必要な費用と時間",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "A shared meal does not have to be large, expensive, or completely homemade.",

            ja:
              "家族で一緒に食べる食事は、量が多かったり、高価だったり、すべて手作りだったりする必要はありません。",

            notes: [
              {
                id: "q10_original_028_note_043",

                expression:
                  "homemade",

                meaning:
                  "家庭で作られた、手作りの",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_044",

                expression:
                  "does not have to be",

                meaning:
                  "～である必要はない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Families can use simple food, prepare part of the meal in advance, or ask each person to help with one task.",

            ja:
              "簡単な食品を使ったり、食事の一部を前もって準備したり、一人ひとりに一つの作業を手伝ってもらったりできます。",

            notes: [
              {
                id: "q10_original_028_note_045",

                expression:
                  "in advance",

                meaning:
                  "前もって",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_046",

                expression:
                  "help with a task",

                meaning:
                  "作業を手伝う",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Even when eating together every day is unrealistic, family members may share a meal {{e}} once or twice a week.",

            ja:
              "毎日一緒に食べることが現実的でなくても、少なくとも週に一、二回は家族で食事をすることができます。",

            notes: [
              {
                id: "q10_original_028_note_047",

                expression:
                  "at least",

                meaning:
                  "少なくとも",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_048",

                expression:
                  "once or twice a week",

                meaning:
                  "週に一、二回",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_049",

                expression:
                  "be unrealistic",

                meaning:
                  "現実的ではない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "The value of a family meal lies less in the food itself than in the time people spend listening and talking to one another.",

            ja:
              "家族での食事の価値は、食べ物そのものよりも、互いの話を聞き、語り合う時間にあります。",

            notes: [
              {
                id: "q10_original_028_note_050",

                expression:
                  "lie in",

                meaning:
                  "～にある",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_051",

                expression:
                  "less in A than in B",

                meaning:
                  "AというよりもBにある",

                weakEligible: true
              },

              {
                id: "q10_original_028_note_052",

                expression:
                  "talk to one another",

                meaning:
                  "互いに話す",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "bring together"
          },

          {
            id: "a2",
            text: "keep away"
          },

          {
            id: "a3",
            text: "take apart"
          },

          {
            id: "a4",
            text: "turn down"
          }
        ],

        answer: "a1",

        explanation:
          "家族で一緒に食事をすることによって、家族同士が結びつくという内容です。bring A togetherで「Aを結びつける」「Aを集める」という意味になります。空欄の後ろにfamily membersが続くため、bring togetherを入れます。",

        wrongChoiceReasons: {
          a2:
            "keep A awayは「Aを近づけない」という意味で、家族を結びつける内容と反対です。",

          a3:
            "take A apartは「Aを分解する、ばらばらにする」という意味で、家族の交流を表しません。",

          a4:
            "turn A downは「Aを断る」「音量などを下げる」という意味で、family membersとの組合せは不自然です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "make it difficult for"
          },

          {
            id: "b2",
            text: "make it possible for"
          },

          {
            id: "b3",
            text: "prevent"
          },

          {
            id: "b4",
            text: "require"
          }
        ],

        answer: "b2",

        explanation:
          "定期的な会話によって、保護者が子どもの変化に気づくことが可能になるという内容です。make it possible for A to doで「Aが～することを可能にする」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "子どもの変化に気づくことを難しくするという意味になり、定期的な会話の利点と反対です。",

          b3:
            "prevent A from doingの形が必要です。また、保護者が変化に気づくことを妨げる内容ではありません。",

          b4:
            "require A to doでは「Aに～することを要求する」という意味になり、会話によって気づけるようになるという意味を表せません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For example"
          },

          {
            id: "c2",
            text: "Furthermore"
          },

          {
            id: "c3",
            text: "However"
          },

          {
            id: "c4",
            text: "Therefore"
          }
        ],

        answer: "c3",

        explanation:
          "直前では、家族での食事によって食習慣や調理技術を学べるという利点を述べています。続く文では、一緒に食べるだけで必ず健康的で楽しい食事になるわけではないという注意点を示しているため、Howeverが適切です。",

        wrongChoiceReasons: {
          c1:
            "後ろの文は、食習慣を学ぶことの具体例ではなく、家族での食事の限界を示しています。",

          c2:
            "後ろの内容は利点を追加するものではなく、それまでの肯定的な説明に対する注意点です。",

          c4:
            "後ろの内容は、直前の利点から導かれる結果ではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "concerned about"
          },

          {
            id: "d2",
            text: "familiar with"
          },

          {
            id: "d3",
            text: "pleased with"
          },

          {
            id: "d4",
            text: "proud of"
          }
        ],

        answer: "d1",

        explanation:
          "家族全員の食事を準備するための費用や時間を心配しているという内容です。be concerned about Aで「Aを心配している」「Aを気にかけている」という意味になります。",

        wrongChoiceReasons: {
          d2:
            "be familiar withは「～をよく知っている、～に慣れている」という意味で、費用や時間についての不安を表しません。",

          d3:
            "be pleased withは「～に満足している」という意味で、食事準備の負担を心配する文脈に合いません。",

          d4:
            "be proud ofは「～を誇りに思う」という意味で、費用や時間との組合せは不自然です。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "at last"
          },

          {
            id: "e2",
            text: "at least"
          },

          {
            id: "e3",
            text: "at once"
          },

          {
            id: "e4",
            text: "at present"
          }
        ],

        answer: "e2",

        explanation:
          "毎日一緒に食べることが難しくても、最低限、週に一、二回は食事を共有できるという内容です。at leastで「少なくとも」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "at lastは「ついに」という意味で、回数の最低限を表しません。",

          e3:
            "at onceは「すぐに」または「同時に」という意味で、週に何回食べるかを表せません。",

          e4:
            "at presentは「現在は」という意味で、最低限の頻度を示す文脈に合いません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 29
  // Local Products and Tourism
  // =========================================================
  {
    id: "q10_original_029",
    number: 29,
    sourceType: "original",

    title: "Local Products and Tourism",
    titleJa: "地域の特産品と観光",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Many regions are known for foods, crafts, and other products that are closely connected to the local area.",

            ja:
              "多くの地域には、その土地と深く結びついた食品、工芸品、その他の特産品があります。",

            notes: [
              {
                id: "q10_original_029_note_001",

                expression:
                  "be known for",

                meaning:
                  "～で知られている",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_002",

                expression:
                  "be closely connected to",

                meaning:
                  "～と深く結びついている",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "These products may reflect the area's climate, natural resources, history, or traditional skills.",

            ja:
              "こうした製品には、その地域の気候、天然資源、歴史、伝統的な技術などが表れている場合があります。",

            notes: [
              {
                id: "q10_original_029_note_003",

                expression:
                  "reflect",

                meaning:
                  "～を反映する、～を表す",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_004",

                expression:
                  "natural resource",

                meaning:
                  "天然資源",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_005",

                expression:
                  "traditional skill",

                meaning:
                  "伝統的な技術",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "For example, a town may produce fruit, pottery, cloth, or sweets that cannot easily be found elsewhere.",

            ja:
              "例えば、ほかの場所では簡単に手に入らない果物、陶器、布製品、菓子などを生産する町があります。",

            notes: [
              {
                id: "q10_original_029_note_006",

                expression:
                  "pottery",

                meaning:
                  "陶器、陶芸品",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_007",

                expression:
                  "elsewhere",

                meaning:
                  "ほかの場所で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Some local foods are {{a}} ingredients grown or collected in the surrounding area.",

            ja:
              "地域の食品の中には、周辺地域で育てられたり採取されたりした材料から作られているものがあります。",

            notes: [
              {
                id: "q10_original_029_note_008",

                expression:
                  "be made from",

                meaning:
                  "～を原料として作られる",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_009",

                expression:
                  "ingredient",

                meaning:
                  "材料、食材",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_010",

                expression:
                  "surrounding area",

                meaning:
                  "周辺地域",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Local products can give visitors a stronger sense of the place they are visiting.",

            ja:
              "地域の特産品は、訪問者に、その土地をより強く感じさせることができます。",

            notes: [
              {
                id: "q10_original_029_note_011",

                expression:
                  "give A a sense of B",

                meaning:
                  "AにBを感じさせる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "A traveler may remember a region through the taste of a meal or the design of a handmade object.",

            ja:
              "旅行者は、食事の味や手作り品のデザインを通して、その地域を思い出すことがあります。",

            notes: [
              {
                id: "q10_original_029_note_012",

                expression:
                  "handmade object",

                meaning:
                  "手作りの品物",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_013",

                expression:
                  "remember A through B",

                meaning:
                  "Bを通してAを思い出す",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Buying a local product can also create a direct connection between visitors and the people who made it.",

            ja:
              "地域の特産品を買うことで、訪問者とその品物を作った人との間に直接的なつながりが生まれる場合もあります。",

            notes: [
              {
                id: "q10_original_029_note_014",

                expression:
                  "create a direct connection between A and B",

                meaning:
                  "AとBの間に直接的なつながりを生み出す",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Local residents may {{b}} products that represent the history and character of their community.",

            ja:
              "地域住民は、地域の歴史や特色を表す特産品を誇りに思うことがあります。",

            notes: [
              {
                id: "q10_original_029_note_015",

                expression:
                  "take pride in",

                meaning:
                  "～を誇りに思う",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_016",

                expression:
                  "represent",

                meaning:
                  "～を表す、代表する",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_017",

                expression:
                  "the character of a community",

                meaning:
                  "地域の特色",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "Explaining how a product is made can therefore help residents share their culture with visitors.",

            ja:
              "そのため、製品の作り方を説明することは、住民が訪問者に文化を伝える助けになります。",

            notes: [
              {
                id: "q10_original_029_note_018",

                expression:
                  "explain how A is made",

                meaning:
                  "Aがどのように作られるかを説明する",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_019",

                expression:
                  "share one's culture with",

                meaning:
                  "～に自分たちの文化を伝える",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Tourism based on local products can also support the regional economy.",

            ja:
              "特産品を活用した観光は、地域経済を支えることもできます。",

            notes: [
              {
                id: "q10_original_029_note_020",

                expression:
                  "be based on",

                meaning:
                  "～に基づいている",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_021",

                expression:
                  "regional economy",

                meaning:
                  "地域経済",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "When tourists purchase food or crafts, money may go directly to farmers, producers, and small shops.",

            ja:
              "観光客が食品や工芸品を購入すると、そのお金が農家、生産者、小規模な店へ直接渡る場合があります。",

            notes: [
              {
                id: "q10_original_029_note_022",

                expression:
                  "purchase",

                meaning:
                  "～を購入する",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_023",

                expression:
                  "go directly to",

                meaning:
                  "～へ直接渡る",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Visitors may also pay for factory tours, craft workshops, farm experiences, or cooking lessons.",

            ja:
              "また、工場見学、工芸体験、農業体験、料理教室などに料金を支払う観光客もいます。",

            notes: [
              {
                id: "q10_original_029_note_024",

                expression:
                  "factory tour",

                meaning:
                  "工場見学",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_025",

                expression:
                  "craft workshop",

                meaning:
                  "工芸体験、工芸講座",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_026",

                expression:
                  "farm experience",

                meaning:
                  "農業体験",

                weakEligible: true
              }
            ]
          },

          {
  id: "s13",

  en:
    "{{c}}, a single local product can create income for several different businesses.",

  ja:
    "その結果、一つの地域産品が、複数の異なる事業者の収入を生み出すことがあります。",

  notes: [
    {
      id: "q10_original_029_note_027",

      expression:
        "as a result",

      meaning:
        "その結果",

      weakEligible: true
    },

    {
      id: "q10_original_029_note_028",

      expression:
        "create income for",

      meaning:
        "～の収入を生み出す",

      weakEligible: true
    },

    {
      id: "q10_original_029_note_029",

      expression:
        "several different businesses",

      meaning:
        "複数の異なる事業者",

      weakEligible: true
    }
  ]
},

          {
            id: "s14",

            en:
              "Increased sales may allow producers to employ more workers or continue traditional methods that are expensive and time-consuming.",

            ja:
              "売上が増えることで、生産者がより多くの人を雇ったり、費用と時間のかかる伝統的な製法を続けたりできる場合があります。",

            notes: [
              {
                id: "q10_original_029_note_030",

                expression:
                  "increased sales",

                meaning:
                  "増加した売上",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_031",

                expression:
                  "employ more workers",

                meaning:
                  "より多くの人を雇う",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_032",

                expression:
                  "time-consuming",

                meaning:
                  "時間のかかる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "A popular product may even encourage travelers to visit a place that was previously little known.",

            ja:
              "人気の特産品によって、それまであまり知られていなかった場所を旅行者が訪れるようになることもあります。",

            notes: [
              {
                id: "q10_original_029_note_033",

                expression:
                  "encourage A to do",

                meaning:
                  "Aが～するよう促す",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_034",

                expression:
                  "previously little known",

                meaning:
                  "それまであまり知られていなかった",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "However, increased tourism does not always benefit local producers equally.",

            ja:
              "しかし、観光客の増加が、すべての地域生産者に同じような利益をもたらすとは限りません。",

            notes: [
              {
                id: "q10_original_029_note_035",

                expression:
                  "benefit A equally",

                meaning:
                  "Aに同じような利益を与える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Large companies may copy a traditional design or sell products that only appear to be local.",

            ja:
              "大企業が伝統的なデザインをまねたり、地域産品のように見えるだけの商品を販売したりする場合があります。",

            notes: [
              {
                id: "q10_original_029_note_036",

                expression:
                  "copy a traditional design",

                meaning:
                  "伝統的なデザインをまねる",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_037",

                expression:
                  "appear to be",

                meaning:
                  "～であるように見える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "If a product becomes highly {{d}}, producers may feel pressure to make larger quantities more quickly.",

            ja:
              "ある商品への需要が非常に高くなると、生産者はより多くの量を短時間で作るよう求められる場合があります。",

            notes: [
              {
                id: "q10_original_029_note_038",

                expression:
                  "be in demand",

                meaning:
                  "需要がある、求められている",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_039",

                expression:
                  "feel pressure to do",

                meaning:
                  "～するよう圧力を感じる",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_040",

                expression:
                  "in larger quantities",

                meaning:
                  "より多くの量で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Quality may fall if traditional processes are shortened or less suitable materials are used.",

            ja:
              "伝統的な工程が短縮されたり、適切でない材料が使われたりすると、品質が低下する可能性があります。",

            notes: [
              {
                id: "q10_original_029_note_041",

                expression:
                  "traditional process",

                meaning:
                  "伝統的な製造工程",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_042",

                expression:
                  "quality falls",

                meaning:
                  "品質が低下する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Tourism organizations should develop advertisements and events {{e}} local producers rather than making decisions without them.",

            ja:
              "観光団体は、生産者を抜きにして決定するのではなく、地域の生産者と協力して広告や行事を企画するべきです。",

            notes: [
              {
                id: "q10_original_029_note_043",

                expression:
                  "in cooperation with",

                meaning:
                  "～と協力して",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_044",

                expression:
                  "develop an advertisement",

                meaning:
                  "広告を作成する",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_045",

                expression:
                  "make a decision without",

                meaning:
                  "～を抜きにして決定する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Clear labels can also help visitors understand where a product was made and who produced it.",

            ja:
              "分かりやすい表示によって、訪問者が、その商品がどこで作られ、誰が生産したのかを理解しやすくなります。",

            notes: [
              {
                id: "q10_original_029_note_046",

                expression:
                  "clear label",

                meaning:
                  "分かりやすい表示",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_047",

                expression:
                  "who produced it",

                meaning:
                  "誰がそれを生産したのか",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "Local products support tourism most effectively when economic success is balanced with quality, fairness, and respect for local culture.",

            ja:
              "地域産品が観光に最も効果的に役立つのは、経済的な成功と、品質、公平性、地域文化への敬意とのバランスが取れているときです。",

            notes: [
              {
                id: "q10_original_029_note_048",

                expression:
                  "economic success",

                meaning:
                  "経済的な成功",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_049",

                expression:
                  "be balanced with",

                meaning:
                  "～とのバランスが取れている",

                weakEligible: true
              },

              {
                id: "q10_original_029_note_050",

                expression:
                  "respect for local culture",

                meaning:
                  "地域文化への敬意",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "made from"
          },

          {
            id: "a2",
            text: "prepared for"
          },

          {
            id: "a3",
            text: "protected from"
          },

          {
            id: "a4",
            text: "separated from"
          }
        ],

        answer: "a1",

        explanation:
          "地域の食品が、周辺で育てられたり採取されたりした食材を原料として作られているという内容です。be made from Aで「Aを原料として作られる」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "be prepared forは「～に備えている」「～のために用意される」という意味で、食品の原料を表しません。",

          a3:
            "be protected fromでは「食材から守られている」という不自然な意味になります。",

          a4:
            "be separated fromでは「食材から分離されている」という意味になり、食品の材料についての説明と反対です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "catch up with"
          },

          {
            id: "b2",
            text: "look down on"
          },

          {
            id: "b3",
            text: "take part in"
          },

          {
            id: "b4",
            text: "take pride in"
          }
        ],

        answer: "b4",

        explanation:
          "地域の歴史や特色を表す特産品を、住民が誇りに感じるという内容です。take pride in Aで「Aを誇りに思う」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "catch up withは「～に追いつく」という意味で、特産品への感情を表しません。",

          b2:
            "look down onは「～を見下す」という意味で、地域の産品に対する肯定的な感情と反対です。",

          b3:
            "take part inは「～に参加する」という意味です。productsは参加する活動ではありません。"
        }
      },

      {
  id: "c",

  choices: [
    {
      id: "c1",
      text: "As a result"
    },

    {
      id: "c2",
      text: "For example"
    },

    {
      id: "c3",
      text: "However"
    },

    {
      id: "c4",
      text: "In other words"
    }
  ],

  answer: "c1",

  explanation:
    "直前では、観光客が地域の商品を購入したり、工場見学や体験活動に料金を支払ったりすることを述べています。その結果、一つの特産品が複数の事業者の収入を生み出すため、As a resultが適切です。",

  wrongChoiceReasons: {
    c2:
      "後ろの文は具体例ではなく、直前に述べられた観光消費から生じる結果です。",

    c3:
      "後ろの内容は直前の内容と反対ではなく、そこから生じる経済的な効果です。",

    c4:
      "後ろの文は直前の内容を別の言葉で言い換えているのではなく、その結果を述べています。"
  }
},

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "at risk"
          },

          {
            id: "d2",
            text: "in advance"
          },

          {
            id: "d3",
            text: "in demand"
          },

          {
            id: "d4",
            text: "on purpose"
          }
        ],

        answer: "d3",

        explanation:
          "商品を求める人が増えることで、生産者が大量生産を求められるという内容です。be in demandで「需要がある」「多くの人に求められている」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "be at riskは「危険にさらされている」という意味で、商品の人気や需要を表しません。",

          d2:
            "in advanceは「前もって」という意味で、商品が求められている状態を表せません。",

          d4:
            "on purposeは「わざと」という意味で、商品の需要について述べる文脈には合いません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "in comparison with"
          },

          {
            id: "e2",
            text: "in cooperation with"
          },

          {
            id: "e3",
            text: "in exchange for"
          },

          {
            id: "e4",
            text: "in place of"
          }
        ],

        answer: "e2",

        explanation:
          "観光団体が地域の生産者と協力して、広告や行事を企画するという内容です。in cooperation with Aで「Aと協力して」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "in comparison withは「～と比較して」という意味で、共同で企画することを表しません。",

          e3:
            "in exchange forは「～と引き換えに」という意味ですが、観光団体と生産者が何かを交換する内容ではありません。",

          e4:
            "in place ofは「～の代わりに」という意味で、生産者を除外する内容になり、後半のrather than making decisions without themと合いません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 30
  // Buying Used Products
  // =========================================================
  {
    id: "q10_original_030",
    number: 30,
    sourceType: "original",

    title: "Buying Used Products",
    titleJa: "中古品を購入すること",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Many people buy used books, clothes, furniture, electronic devices, and other products.",

            ja:
              "多くの人が、中古の本、衣服、家具、電子機器、その他の商品を購入しています。",

            notes: [
              {
                id: "q10_original_030_note_001",

                expression:
                  "used product",

                meaning:
                  "中古品",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_002",

                expression:
                  "electronic device",

                meaning:
                  "電子機器",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Such goods are sold in secondhand shops, at markets, and through online services.",

            ja:
              "そのような商品は、中古品店、市場、オンラインサービスなどで販売されています。",

            notes: [
              {
                id: "q10_original_030_note_003",

                expression:
                  "secondhand shop",

                meaning:
                  "中古品店",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_004",

                expression:
                  "through an online service",

                meaning:
                  "オンラインサービスを通して",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Some items are sold by businesses, while others are offered directly by their previous owners.",

            ja:
              "企業によって販売される品物もあれば、以前の所有者が直接出品する品物もあります。",

            notes: [
              {
                id: "q10_original_030_note_005",

                expression:
                  "previous owner",

                meaning:
                  "以前の所有者",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_006",

                expression:
                  "be offered directly by",

                meaning:
                  "～によって直接提供・出品される",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Used products are often {{a}} lower prices than new ones.",

            ja:
              "中古品は、新品よりも安い価格で購入できることがよくあります。",

            notes: [
              {
                id: "q10_original_030_note_007",

                expression:
                  "be available at",

                meaning:
                  "～の価格で入手できる",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_008",

                expression:
                  "at a lower price",

                meaning:
                  "より安い価格で",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Lower prices are one reason why people choose used products.",

            ja:
              "価格の安さは、人々が中古品を選ぶ理由の一つです。",

            notes: [
              {
                id: "q10_original_030_note_009",

                expression:
                  "one reason why",

                meaning:
                  "～である理由の一つ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "A student may be able to buy several used books for the price of one new book.",

            ja:
              "生徒は、新品の本一冊分の価格で、中古の本を数冊買える場合があります。",

            notes: [
              {
                id: "q10_original_030_note_010",

                expression:
                  "for the price of",

                meaning:
                  "～の価格で",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_011",

                expression:
                  "several used books",

                meaning:
                  "数冊の中古本",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "A family may find affordable furniture or children's clothing that will only be used for a limited period.",

            ja:
              "家庭では、限られた期間しか使わない家具や子ども服を、手頃な価格で見つけられることがあります。",

            notes: [
              {
                id: "q10_original_030_note_012",

                expression:
                  "affordable",

                meaning:
                  "手頃な価格の",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_013",

                expression:
                  "for a limited period",

                meaning:
                  "限られた期間だけ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Buying used goods can also help people avoid borrowing money for products they do not urgently need.",

            ja:
              "中古品を購入することで、緊急には必要でない商品のためにお金を借りることを避けられる場合もあります。",

            notes: [
              {
                id: "q10_original_030_note_014",

                expression:
                  "avoid doing",

                meaning:
                  "～することを避ける",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_015",

                expression:
                  "borrow money for",

                meaning:
                  "～のためにお金を借りる",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_016",

                expression:
                  "urgently need",

                meaning:
                  "緊急に必要とする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "For people with limited incomes, secondhand goods can make useful products easier to obtain.",

            ja:
              "収入が限られている人にとって、中古品は必要な商品を入手しやすくすることがあります。",

            notes: [
              {
                id: "q10_original_030_note_017",

                expression:
                  "limited income",

                meaning:
                  "限られた収入",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_018",

                expression:
                  "make A easier to do",

                meaning:
                  "Aをより～しやすくする",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_019",

                expression:
                  "obtain",

                meaning:
                  "～を入手する",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Reusing products may also reduce their effect on the environment.",

            ja:
              "商品を再利用することは、環境への影響を減らす場合もあります。",

            notes: [
              {
                id: "q10_original_030_note_020",

                expression:
                  "reuse a product",

                meaning:
                  "商品を再利用する",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_021",

                expression:
                  "an effect on the environment",

                meaning:
                  "環境への影響",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "When an item is used by another person, it is less likely to be thrown away immediately.",

            ja:
              "品物が別の人に使われれば、すぐに捨てられる可能性が低くなります。",

            notes: [
              {
                id: "q10_original_030_note_022",

                expression:
                  "throw away",

                meaning:
                  "～を捨てる",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_023",

                expression:
                  "immediately",

                meaning:
                  "すぐに",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Extending the life of furniture, clothing, and electronic devices can {{b}} waste produced by households.",

            ja:
              "家具、衣服、電子機器の使用期間を延ばすことで、家庭から出るごみの量を減らせます。",

            notes: [
              {
                id: "q10_original_030_note_024",

                expression:
                  "extend the life of",

                meaning:
                  "～の使用期間を延ばす",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_025",

                expression:
                  "reduce the amount of",

                meaning:
                  "～の量を減らす",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_026",

                expression:
                  "household waste",

                meaning:
                  "家庭ごみ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "Reusing products may also reduce the need to produce new goods and use additional materials.",

            ja:
              "商品の再利用によって、新しい商品を生産し、さらに材料を使う必要性が減る場合もあります。",

            notes: [
              {
                id: "q10_original_030_note_027",

                expression:
                  "reduce the need to do",

                meaning:
                  "～する必要性を減らす",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_028",

                expression:
                  "additional material",

                meaning:
                  "追加の材料",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "Repairing and reselling products can also create work for local shops and skilled workers.",

            ja:
              "商品を修理して再販売することは、地域の店や技術を持つ人の仕事を生み出すことにもつながります。",

            notes: [
              {
                id: "q10_original_030_note_029",

                expression:
                  "repair and resell",

                meaning:
                  "修理して再販売する",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_030",

                expression:
                  "skilled worker",

                meaning:
                  "技能を持つ労働者",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s15",

            en:
              "{{c}}, buying used products can involve risks and inconvenience.",

            ja:
              "一方で、中古品の購入には危険や不便が伴うことがあります。",

            notes: [
              {
                id: "q10_original_030_note_031",

                expression:
                  "on the other hand",

                meaning:
                  "一方で",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_032",

                expression:
                  "involve a risk",

                meaning:
                  "危険を伴う",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_033",

                expression:
                  "inconvenience",

                meaning:
                  "不便、不都合",

                weakEligible: true
              }
            ]
          },

          {
            id: "s16",

            en:
              "A buyer may not know how carefully an item was used or whether it has hidden damage.",

            ja:
              "購入者には、その品物がどれほど丁寧に使われていたかや、見えない損傷があるかどうかが分からない場合があります。",

            notes: [
              {
                id: "q10_original_030_note_034",

                expression:
                  "hidden damage",

                meaning:
                  "外から見えない損傷",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_035",

                expression:
                  "whether A or not",

                meaning:
                  "Aかどうか",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Electronic devices may have weak batteries, missing parts, or software that is no longer supported.",

            ja:
              "電子機器には、劣化した電池、不足している部品、すでに対応されていないソフトウェアなどの問題がある場合があります。",

            notes: [
              {
                id: "q10_original_030_note_036",

                expression:
                  "weak battery",

                meaning:
                  "劣化した電池",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_037",

                expression:
                  "missing part",

                meaning:
                  "不足している部品",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_038",

                expression:
                  "no longer supported",

                meaning:
                  "もはや対応されていない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "People may not be {{d}} an item if its actual condition differs from the seller's description.",

            ja:
              "商品の実際の状態が販売者の説明と異なる場合、購入者はその商品に満足できないかもしれません。",

            notes: [
              {
                id: "q10_original_030_note_039",

                expression:
                  "be satisfied with",

                meaning:
                  "～に満足している",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_040",

                expression:
                  "actual condition",

                meaning:
                  "実際の状態",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_041",

                expression:
                  "differ from",

                meaning:
                  "～と異なる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Returns and repairs may also be more difficult when a product is bought from an individual seller.",

            ja:
              "個人の販売者から商品を購入した場合、返品や修理がより難しいこともあります。",

            notes: [
              {
                id: "q10_original_030_note_042",

                expression:
                  "individual seller",

                meaning:
                  "個人の販売者",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_043",

                expression:
                  "return and repair",

                meaning:
                  "返品と修理",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Before buying, consumers should examine photographs, read descriptions carefully, and ask questions about any damage.",

            ja:
              "購入する前に、消費者は写真を確認し、説明を注意深く読み、損傷について質問するべきです。",

            notes: [
              {
                id: "q10_original_030_note_044",

                expression:
                  "examine a photograph",

                meaning:
                  "写真を詳しく確認する",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_045",

                expression:
                  "ask a question about",

                meaning:
                  "～について質問する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Items such as furniture and electronic devices should be tested whenever possible to make sure that they are {{e}}.",

            ja:
              "家具や電子機器などは、良好な状態であることを確認するため、可能な限り試してみるべきです。",

            notes: [
              {
                id: "q10_original_030_note_046",

                expression:
                  "whenever possible",

                meaning:
                  "可能な限り、できるときはいつでも",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_047",

                expression:
                  "make sure that",

                meaning:
                  "～であることを確認する",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_048",

                expression:
                  "in good condition",

                meaning:
                  "良好な状態で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "Buying used products can save money and reduce waste when consumers choose carefully and understand the possible risks.",

            ja:
              "消費者が慎重に商品を選び、考えられる危険を理解していれば、中古品の購入は節約とごみの削減につながります。",

            notes: [
              {
                id: "q10_original_030_note_049",

                expression:
                  "save money",

                meaning:
                  "お金を節約する",

                weakEligible: true
              },

              {
                id: "q10_original_030_note_050",

                expression:
                  "possible risk",

                meaning:
                  "考えられる危険",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "available at"
          },

          {
            id: "a2",
            text: "different from"
          },

          {
            id: "a3",
            text: "famous for"
          },

          {
            id: "a4",
            text: "responsible for"
          }
        ],

        answer: "a1",

        explanation:
          "中古品は新品より安い価格で入手できるという内容です。be available at a priceで「ある価格で入手できる」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "be different fromは「～と異なる」という意味ですが、後ろにはlower pricesがあり、価格で入手できることを表す表現が必要です。",

          a3:
            "be famous forは「～で有名である」という意味で、商品の販売価格を表せません。",

          a4:
            "be responsible forは「～に責任がある」という意味で、商品と価格の関係を表しません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "increase the number of"
          },

          {
            id: "b2",
            text: "make use of"
          },

          {
            id: "b3",
            text: "reduce the amount of"
          },

          {
            id: "b4",
            text: "take care of"
          }
        ],

        answer: "b3",

        explanation:
          "商品を長く使うことで、家庭から出るごみの量を減らすという内容です。reduce the amount of Aで「Aの量を減らす」という意味になります。wasteは不可算名詞なので、the number ofではなくthe amount ofを使います。",

        wrongChoiceReasons: {
          b1:
            "ごみの数を増やすという意味になり、再利用によってごみを減らす内容と反対です。また、wasteはここでは不可算名詞です。",

          b2:
            "make use ofは「～を利用する」という意味で、ごみの量が減ることを表しません。",

          b4:
            "take care ofは「～を世話する、処理する」という意味ですが、家庭ごみの量が減ることを直接表せません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For example"
          },

          {
            id: "c2",
            text: "In addition"
          },

          {
            id: "c3",
            text: "On the other hand"
          },

          {
            id: "c4",
            text: "Therefore"
          }
        ],

        answer: "c3",

        explanation:
          "直前までは、中古品の価格面や環境面での利点について述べています。続く段落では、中古品の購入に伴う危険や不便を説明しているため、対照を表すOn the other handが適切です。",

        wrongChoiceReasons: {
          c1:
            "後ろの文は中古品の利点の具体例ではなく、反対側の問題点を示しています。",

          c2:
            "後ろの内容は利点を追加するものではなく、それまでの肯定的な内容と対照的な問題点です。",

          c4:
            "危険や不便は、直前に述べられた環境上の利点から導かれる結果ではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "afraid of"
          },

          {
            id: "d2",
            text: "interested in"
          },

          {
            id: "d3",
            text: "satisfied with"
          },

          {
            id: "d4",
            text: "surprised at"
          }
        ],

        answer: "d3",

        explanation:
          "商品の状態が販売者の説明と異なると、購入者が商品に満足できないという内容です。be satisfied with Aで「Aに満足している」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "商品を恐れているという意味になり、商品の状態への評価を表しません。",

          d2:
            "商品に関心があるという意味ですが、説明と実物が異なることによる不満を表せません。",

          d4:
            "商品の状態に驚く可能性はありますが、本文では購入者が商品に満足できるかどうかを述べています。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "at a loss"
          },

          {
            id: "e2",
            text: "in advance"
          },

          {
            id: "e3",
            text: "in good condition"
          },

          {
            id: "e4",
            text: "on purpose"
          }
        ],

        answer: "e3",

        explanation:
          "家具や電子機器を試して、正常に使える良好な状態であることを確認するという内容です。in good conditionで「良好な状態で」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "at a lossは「途方に暮れて」という意味で、物の状態を表しません。",

          e2:
            "in advanceは「前もって」という意味で、商品の品質や状態を説明できません。",

          e4:
            "on purposeは「わざと」という意味で、商品の状態を表す補語にはなりません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 31
  // Cashless Payments in Small Shops
  // =========================================================
  {
    id: "q10_original_031",
    number: 31,
    sourceType: "original",

    title: "Cashless Payments in Small Shops",
    titleJa: "小規模な店におけるキャッシュレス決済",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Cashless payments have become common in many countries.",

            ja:
              "多くの国で、キャッシュレス決済が一般的になっています。",

            notes: [
              {
                id: "q10_original_031_note_001",

                expression:
                  "cashless payment",

                meaning:
                  "キャッシュレス決済",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_002",

                expression:
                  "become common",

                meaning:
                  "一般的になる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Customers can pay with credit cards, mobile phones, electronic money, or codes displayed on a screen.",

            ja:
              "客は、クレジットカード、携帯電話、電子マネー、画面に表示されたコードなどを使って支払えます。",

            notes: [
              {
                id: "q10_original_031_note_003",

                expression:
                  "pay with",

                meaning:
                  "～を使って支払う",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_004",

                expression:
                  "electronic money",

                meaning:
                  "電子マネー",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_005",

                expression:
                  "be displayed on a screen",

                meaning:
                  "画面に表示される",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Large stores usually offer several payment methods, but smaller shops may have fewer choices.",

            ja:
              "大型店では通常、複数の支払い方法が用意されていますが、小規模な店では選択肢が少ない場合があります。",

            notes: [
              {
                id: "q10_original_031_note_006",

                expression:
                  "payment method",

                meaning:
                  "支払い方法",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_007",

                expression:
                  "offer several choices",

                meaning:
                  "複数の選択肢を提供する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Many small businesses are now deciding whether to {{a}} cashless payments in addition to cash.",

            ja:
              "現在、多くの小規模事業者が、現金に加えてキャッシュレス決済を受け付けるかどうかを検討しています。",

            notes: [
              {
                id: "q10_original_031_note_008",

                expression:
                  "accept a payment",

                meaning:
                  "支払いを受け付ける",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_009",

                expression:
                  "in addition to",

                meaning:
                  "～に加えて",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_010",

                expression:
                  "decide whether to do",

                meaning:
                  "～するかどうかを決める",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Cashless payment can make shopping faster and easier for customers.",

            ja:
              "キャッシュレス決済によって、客はより速く簡単に買い物ができる場合があります。",

            notes: [
              {
                id: "q10_original_031_note_011",

                expression:
                  "make shopping easier",

                meaning:
                  "買い物をしやすくする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "They do not need to count coins, prepare the exact amount, or wait for change.",

            ja:
              "客は、硬貨を数えたり、ちょうどの金額を用意したり、お釣りを待ったりする必要がありません。",

            notes: [
              {
                id: "q10_original_031_note_012",

                expression:
                  "the exact amount",

                meaning:
                  "ちょうどの金額",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_013",

                expression:
                  "wait for change",

                meaning:
                  "お釣りを待つ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "This can be especially useful when a shop is crowded or customers are in a hurry.",

            ja:
              "これは、店が混雑しているときや、客が急いでいるときに特に役立ちます。",

            notes: [
              {
                id: "q10_original_031_note_014",

                expression:
                  "be in a hurry",

                meaning:
                  "急いでいる",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_015",

                expression:
                  "be especially useful",

                meaning:
                  "特に役立つ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Cashless systems may also be {{b}} travelers who do not have enough local currency.",

            ja:
              "キャッシュレス決済は、現地通貨を十分に持っていない旅行者にとって便利な場合もあります。",

            notes: [
              {
                id: "q10_original_031_note_016",

                expression:
                  "be convenient for",

                meaning:
                  "～にとって便利である",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_017",

                expression:
                  "local currency",

                meaning:
                  "現地通貨",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "If a shop accepts a payment method that customers prefer, they may be more willing to make a purchase.",

            ja:
              "店が客の好む支払い方法に対応していれば、客は商品を購入しやすくなる場合があります。",

            notes: [
              {
                id: "q10_original_031_note_018",

                expression:
                  "a payment method that A prefers",

                meaning:
                  "Aが好む支払い方法",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_019",

                expression:
                  "make a purchase",

                meaning:
                  "商品を購入する",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Cashless payments can also provide advantages for shop owners.",

            ja:
              "キャッシュレス決済は、店主にとっても利点をもたらします。",

            notes: [
              {
                id: "q10_original_031_note_020",

                expression:
                  "provide an advantage for",

                meaning:
                  "～に利点をもたらす",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_021",

                expression:
                  "shop owner",

                meaning:
                  "店主",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Digital records can show how much money was received and when each payment was made.",

            ja:
              "電子記録によって、いくら受け取ったか、各支払いがいつ行われたかを確認できます。",

            notes: [
              {
                id: "q10_original_031_note_022",

                expression:
                  "digital record",

                meaning:
                  "電子記録",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_023",

                expression:
                  "receive money",

                meaning:
                  "お金を受け取る",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Such information may make it easier to check sales, prepare accounts, and find mistakes.",

            ja:
              "そのような情報によって、売上の確認、会計処理、誤りの発見がしやすくなる場合があります。",

            notes: [
              {
                id: "q10_original_031_note_024",

                expression:
                  "check sales",

                meaning:
                  "売上を確認する",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_025",

                expression:
                  "prepare accounts",

                meaning:
                  "会計記録を作成する",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_026",

                expression:
                  "find a mistake",

                meaning:
                  "誤りを見つける",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "Keeping less cash in a store may also {{d}} theft or the loss of money.",

            ja:
              "店内に置く現金を少なくすることで、盗難や現金紛失の危険を減らせる場合もあります。",

            notes: [
              {
                id: "q10_original_031_note_027",

                expression:
                  "reduce the risk of",

                meaning:
                  "～の危険を減らす",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_028",

                expression:
                  "theft",

                meaning:
                  "盗難",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_029",

                expression:
                  "the loss of money",

                meaning:
                  "現金の紛失",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "Shop workers do not need to carry large amounts of cash to a bank as frequently.",

            ja:
              "店員が多額の現金を銀行へ頻繁に運ぶ必要も少なくなります。",

            notes: [
              {
                id: "q10_original_031_note_030",

                expression:
                  "a large amount of cash",

                meaning:
                  "多額の現金",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_031",

                expression:
                  "as frequently",

                meaning:
                  "それほど頻繁に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "These benefits can be important for small shops with only a few employees.",

            ja:
              "こうした利点は、従業員が数人しかいない小規模な店にとって重要です。",

            notes: [
              {
                id: "q10_original_031_note_032",

                expression:
                  "only a few employees",

                meaning:
                  "わずかな人数の従業員",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "{{c}}, introducing cashless payment systems can create new costs and problems.",

            ja:
              "しかし、キャッシュレス決済の導入によって、新たな費用や問題が生じる場合があります。",

            notes: [
              {
                id: "q10_original_031_note_033",

                expression:
                  "however",

                meaning:
                  "しかしながら",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_034",

                expression:
                  "introduce a payment system",

                meaning:
                  "決済システムを導入する",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_035",

                expression:
                  "create a new cost",

                meaning:
                  "新たな費用を生じさせる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Businesses may need to buy equipment, pay service fees, or wait several days to receive their money.",

            ja:
              "事業者は、機器を購入したり、サービス手数料を支払ったり、代金を受け取るまで数日待ったりする必要がある場合があります。",

            notes: [
              {
                id: "q10_original_031_note_036",

                expression:
                  "service fee",

                meaning:
                  "サービス手数料",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_037",

                expression:
                  "wait several days to do",

                meaning:
                  "～するまで数日待つ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "A small fee on every transaction may have a noticeable effect on shops that sell low-priced products.",

            ja:
              "取引ごとにかかる少額の手数料でも、低価格の商品を販売する店には大きな影響を与える場合があります。",

            notes: [
              {
                id: "q10_original_031_note_038",

                expression:
                  "transaction",

                meaning:
                  "取引、決済",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_039",

                expression:
                  "have a noticeable effect on",

                meaning:
                  "～にはっきり分かる影響を与える",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_040",

                expression:
                  "low-priced product",

                meaning:
                  "低価格の商品",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Payment systems may also stop working because of a weak Internet connection, equipment failure, or a power cut.",

            ja:
              "インターネット接続の不調、機器の故障、停電などによって、決済システムが使えなくなることもあります。",

            notes: [
              {
                id: "q10_original_031_note_041",

                expression:
                  "equipment failure",

                meaning:
                  "機器の故障",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_042",

                expression:
                  "power cut",

                meaning:
                  "停電",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Older customers and people without suitable devices may {{e}} using some payment methods.",

            ja:
              "高齢の客や適切な端末を持たない人は、一部の支払い方法を利用することが難しい場合があります。",

            notes: [
              {
                id: "q10_original_031_note_043",

                expression:
                  "have difficulty doing",

                meaning:
                  "～することが難しい",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_044",

                expression:
                  "suitable device",

                meaning:
                  "適切な端末",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "For this reason, completely refusing cash may cause inconvenience or exclude some customers.",

            ja:
              "このため、現金を完全に受け付けなくすると、一部の客に不便を与えたり、利用から排除したりする可能性があります。",

            notes: [
              {
                id: "q10_original_031_note_045",

                expression:
                  "refuse cash",

                meaning:
                  "現金を受け付けない",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_046",

                expression:
                  "cause inconvenience",

                meaning:
                  "不便をもたらす",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_047",

                expression:
                  "exclude a customer",

                meaning:
                  "客を利用から排除する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "Small shops should choose payment methods by considering customer needs, operating costs, and the reliability of the available technology.",

            ja:
              "小規模な店は、客の必要性、運営費用、利用できる技術の信頼性を考慮して、支払い方法を選ぶべきです。",

            notes: [
              {
                id: "q10_original_031_note_048",

                expression:
                  "operating cost",

                meaning:
                  "運営費用",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_049",

                expression:
                  "the reliability of",

                meaning:
                  "～の信頼性",

                weakEligible: true
              },

              {
                id: "q10_original_031_note_050",

                expression:
                  "available technology",

                meaning:
                  "利用可能な技術",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "accept"
          },

          {
            id: "a2",
            text: "collect"
          },

          {
            id: "a3",
            text: "deliver"
          },

          {
            id: "a4",
            text: "lend"
          }
        ],

        answer: "a1",

        explanation:
          "小規模な店が、現金に加えてキャッシュレス決済を支払い方法として受け付けるかどうかを検討しているという内容です。accept a paymentで「支払いを受け付ける」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "collect paymentsなら「代金を回収する」という意味では使えますが、ここでは特定の支払い方法に対応するかどうかを述べているため、acceptが適切です。",

          a3:
            "deliverは「～を届ける」という意味で、決済方法を受け付けることを表しません。",

          a4:
            "lendは「～を貸す」という意味で、paymentsとの組合せは不自然です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "convenient for"
          },

          {
            id: "b2",
            text: "different from"
          },

          {
            id: "b3",
            text: "famous among"
          },

          {
            id: "b4",
            text: "responsible for"
          }
        ],

        answer: "b1",

        explanation:
          "現地通貨を十分に持たない旅行者にとって、キャッシュレス決済が便利だという内容です。be convenient for Aで「Aにとって便利である」という意味になります。",

        wrongChoiceReasons: {
          b2:
            "be different fromは「～と異なる」という意味で、旅行者にとっての利便性を表しません。",

          b3:
            "famous among travelersなら文法的には可能ですが、「旅行者の間で有名である」という意味になり、現地通貨を持たないこととのつながりが弱くなります。",

          b4:
            "決済システムが旅行者に対して責任を負っているという不自然な意味になります。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For example"
          },

          {
            id: "c2",
            text: "Furthermore"
          },

          {
            id: "c3",
            text: "However"
          },

          {
            id: "c4",
            text: "Therefore"
          }
        ],

        answer: "c3",

        explanation:
          "直前までは、キャッシュレス決済が客や店主にもたらす利点について述べています。続く段落では、導入費用や機器の問題などの欠点に話題が移るため、対照を表すHoweverが適切です。",

        wrongChoiceReasons: {
          c1:
            "後ろの文は、キャッシュレス決済の利点の具体例ではなく、反対側の問題点を示しています。",

          c2:
            "後ろの内容は利点をさらに追加するものではなく、導入に伴う欠点です。",

          c4:
            "新たな費用や問題は、直前の利点から直接導かれる結果ではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "increase the amount of"
          },

          {
            id: "d2",
            text: "make use of"
          },

          {
            id: "d3",
            text: "reduce the risk of"
          },

          {
            id: "d4",
            text: "take responsibility for"
          }
        ],

        answer: "d3",

        explanation:
          "店内に置く現金を減らすことで、盗難や現金紛失の危険が小さくなるという内容です。reduce the risk of Aで「Aの危険を減らす」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "現金を少なく保管することで盗難の量を増やすという意味になり、本文の内容と反対です。",

          d2:
            "make use ofは「～を利用する」という意味で、盗難や紛失の危険を減らすことを表しません。",

          d4:
            "take responsibility forは「～に責任を負う」という意味で、危険性を小さくすることとは異なります。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "have difficulty"
          },

          {
            id: "e2",
            text: "look forward to"
          },

          {
            id: "e3",
            text: "make a point of"
          },

          {
            id: "e4",
            text: "take pride in"
          }
        ],

        answer: "e1",

        explanation:
          "高齢者や適切な端末を持たない人にとって、一部の支払い方法を使うことが難しいという内容です。have difficulty doingで「～することが難しい」という意味になります。空欄の後ろにusingが続いています。",

        wrongChoiceReasons: {
          e2:
            "look forward to doingは「～することを楽しみにする」という意味で、利用上の困難を表しません。",

          e3:
            "make a point of doingは「必ず～するようにする」という意味で、端末を持たない人が支払い方法を使えないことと合いません。",

          e4:
            "take pride in doingは「～することを誇りに思う」という意味で、利用の難しさを表しません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 32
  // Online Reviews and Small Businesses
  // =========================================================
  {
    id: "q10_original_032",
    number: 32,
    sourceType: "original",

    title: "Online Reviews and Small Businesses",
    titleJa: "オンラインレビューと小規模事業者",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Before visiting a restaurant, hotel, shop, or service provider, many people check online reviews.",

            ja:
              "レストラン、ホテル、店、サービス業者を利用する前に、多くの人がオンラインレビューを確認します。",

            notes: [
              {
                id: "q10_original_032_note_001",

                expression:
                  "service provider",

                meaning:
                  "サービス提供者、サービス業者",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_002",

                expression:
                  "check an online review",

                meaning:
                  "オンラインレビューを確認する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "These reviews usually include a score and comments written by previous customers.",

            ja:
              "こうしたレビューには通常、以前の利用者が書いた評価点やコメントが含まれています。",

            notes: [
              {
                id: "q10_original_032_note_003",

                expression:
                  "previous customer",

                meaning:
                  "以前の利用者、購入者",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_004",

                expression:
                  "include a score and comments",

                meaning:
                  "評価点とコメントを含む",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "People may compare several businesses before deciding where to spend their money.",

            ja:
              "人々は、どこでお金を使うか決める前に、複数の事業者を比較することがあります。",

            notes: [
              {
                id: "q10_original_032_note_005",

                expression:
                  "compare several businesses",

                meaning:
                  "複数の事業者を比較する",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_006",

                expression:
                  "decide where to do",

                meaning:
                  "どこで～するかを決める",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Customers may {{a}} reviews when they have little other information about a small business.",

            ja:
              "小規模事業者についてほかの情報をほとんど持っていない場合、客はレビューを頼りにすることがあります。",

            notes: [
              {
                id: "q10_original_032_note_007",

                expression:
                  "rely on",

                meaning:
                  "～を頼りにする、～に依存する",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_008",

                expression:
                  "have little information about",

                meaning:
                  "～についてほとんど情報を持っていない",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Positive reviews can help an unfamiliar business attract new customers.",

            ja:
              "好意的なレビューは、まだよく知られていない事業者が新しい客を引きつける助けになります。",

            notes: [
              {
                id: "q10_original_032_note_009",

                expression:
                  "positive review",

                meaning:
                  "好意的なレビュー、高評価の口コミ",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_010",

                expression:
                  "unfamiliar business",

                meaning:
                  "まだよく知られていない事業者",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "A small shop may not have enough money for television advertisements, printed materials, or large online campaigns.",

            ja:
              "小規模な店には、テレビ広告、印刷物、大規模なオンライン広告に使う十分な資金がない場合があります。",

            notes: [
              {
                id: "q10_original_032_note_011",

                expression:
                  "printed material",

                meaning:
                  "印刷物",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_012",

                expression:
                  "online campaign",

                meaning:
                  "オンライン上の宣伝活動",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Comments from satisfied customers can introduce the business to people who would not otherwise hear about it.",

            ja:
              "満足した客からのコメントは、そうでなければその事業者を知ることのない人々に店を紹介できます。",

            notes: [
              {
                id: "q10_original_032_note_013",

                expression:
                  "satisfied customer",

                meaning:
                  "満足した利用者",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_014",

                expression:
                  "would not otherwise do",

                meaning:
                  "そうでなければ～しないだろう",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "A high average score may {{b}} whether a person decides to visit the business.",

            ja:
              "平均評価の高さは、人がその店を利用するかどうかに影響を与える場合があります。",

            notes: [
              {
                id: "q10_original_032_note_015",

                expression:
                  "have an influence on",

                meaning:
                  "～に影響を与える",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_016",

                expression:
                  "average score",

                meaning:
                  "平均評価、平均点",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_017",

                expression:
                  "decide whether to do",

                meaning:
                  "～するかどうかを決める",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "Reviews may therefore allow small businesses to reach customers beyond their immediate neighborhood.",

            ja:
              "そのためレビューによって、小規模事業者が近隣地域を越えて客に情報を届けられる場合があります。",

            notes: [
              {
                id: "q10_original_032_note_018",

                expression:
                  "reach customers",

                meaning:
                  "客に情報を届ける、客に接触する",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_019",

                expression:
                  "immediate neighborhood",

                meaning:
                  "すぐ近くの地域、近隣地域",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Reviews can also provide useful information to business owners.",

            ja:
              "レビューは、事業者に役立つ情報を与えることもあります。",

            notes: [
              {
                id: "q10_original_032_note_020",

                expression:
                  "provide useful information to",

                meaning:
                  "～に役立つ情報を提供する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Repeated comments may show which products or services customers value and which areas need improvement.",

            ja:
              "繰り返し寄せられるコメントによって、客がどの商品やサービスを評価し、どの部分に改善が必要かが分かる場合があります。",

            notes: [
              {
                id: "q10_original_032_note_021",

                expression:
                  "repeated comment",

                meaning:
                  "繰り返し寄せられるコメント",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_022",

                expression:
                  "need improvement",

                meaning:
                  "改善を必要とする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "{{c}}, several customers may mention that service is friendly but too slow during busy periods.",

            ja:
              "例えば、接客は親切だが、混雑時には遅すぎると複数の客が書く場合があります。",

            notes: [
              {
                id: "q10_original_032_note_023",

                expression:
                  "for example",

                meaning:
                  "例えば",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_024",

                expression:
                  "friendly service",

                meaning:
                  "親切な接客",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_025",

                expression:
                  "during a busy period",

                meaning:
                  "混雑する時間帯に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "The owner can use this information to change staff schedules or improve the ordering process.",

            ja:
              "店主は、この情報を使って勤務予定を変更したり、注文の流れを改善したりできます。",

            notes: [
              {
                id: "q10_original_032_note_026",

                expression:
                  "staff schedule",

                meaning:
                  "従業員の勤務予定",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_027",

                expression:
                  "ordering process",

                meaning:
                  "注文の手順、流れ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "Business owners can also {{d}} complaints by explaining a problem, apologizing, or offering a solution.",

            ja:
              "事業者は、問題を説明したり、謝罪したり、解決策を提示したりすることで、苦情に対応することもできます。",

            notes: [
              {
                id: "q10_original_032_note_028",

                expression:
                  "respond to",

                meaning:
                  "～に対応する、～に返答する",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_029",

                expression:
                  "offer a solution",

                meaning:
                  "解決策を提示する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "A calm and respectful reply may show other readers that the business takes customer concerns seriously.",

            ja:
              "落ち着いた丁寧な返答によって、その事業者が客の心配や苦情を真剣に受け止めていることを、ほかの閲覧者に示せます。",

            notes: [
              {
                id: "q10_original_032_note_030",

                expression:
                  "respectful reply",

                meaning:
                  "丁寧で礼儀正しい返答",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_031",

                expression:
                  "take A seriously",

                meaning:
                  "Aを真剣に受け止める",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "Online reviews, however, are not always accurate or fair.",

            ja:
              "しかし、オンラインレビューが常に正確で公平とは限りません。",

            notes: [
              {
                id: "q10_original_032_note_032",

                expression:
                  "accurate or fair",

                meaning:
                  "正確または公平な",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "A customer may write an angry comment after a single disappointing experience.",

            ja:
              "客が一度期待外れの経験をしただけで、怒りに任せたコメントを書くことがあります。",

            notes: [
              {
                id: "q10_original_032_note_033",

                expression:
                  "disappointing experience",

                meaning:
                  "期待外れの経験",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_034",

                expression:
                  "write an angry comment",

                meaning:
                  "怒った内容のコメントを書く",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Some reviews may contain incorrect information, exaggerated claims, or personal attacks.",

            ja:
              "レビューの中には、誤った情報、誇張された主張、個人攻撃を含むものもあります。",

            notes: [
              {
                id: "q10_original_032_note_035",

                expression:
                  "incorrect information",

                meaning:
                  "誤った情報",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_036",

                expression:
                  "exaggerated claim",

                meaning:
                  "誇張された主張",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_037",

                expression:
                  "personal attack",

                meaning:
                  "個人攻撃",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Businesses or their competitors may even post false reviews in order to improve or damage a company's reputation.",

            ja:
              "事業者やその競争相手が、会社の評判を高めたり傷つけたりするため、偽のレビューを投稿することさえあります。",

            notes: [
              {
                id: "q10_original_032_note_038",

                expression:
                  "competitor",

                meaning:
                  "競争相手、同業他社",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_039",

                expression:
                  "damage a reputation",

                meaning:
                  "評判を傷つける",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_040",

                expression:
                  "post a false review",

                meaning:
                  "偽のレビューを投稿する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Readers must therefore learn to {{e}} reliable reviews from doubtful ones.",

            ja:
              "そのため、読者は信頼できるレビューと疑わしいレビューを区別することを学ばなければなりません。",

            notes: [
              {
                id: "q10_original_032_note_041",

                expression:
                  "distinguish A from B",

                meaning:
                  "AとBを区別する",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_042",

                expression:
                  "reliable review",

                meaning:
                  "信頼できるレビュー",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_043",

                expression:
                  "doubtful",

                meaning:
                  "疑わしい、信頼できない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "It is useful to examine the number of reviews, the details provided, and whether different customers describe similar experiences.",

            ja:
              "レビューの数、書かれている具体的な内容、異なる客が似た経験を説明しているかどうかを確認することが役立ちます。",

            notes: [
              {
                id: "q10_original_032_note_044",

                expression:
                  "examine the number of",

                meaning:
                  "～の数を確認する",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_045",

                expression:
                  "describe a similar experience",

                meaning:
                  "似た経験について説明する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "Online reviews are most valuable when customers write honestly, businesses reply responsibly, and readers consider more than a single opinion.",

            ja:
              "オンラインレビューが最も役立つのは、客が正直に書き、事業者が責任を持って返答し、読者が一つだけでなく複数の意見を検討するときです。",

            notes: [
              {
                id: "q10_original_032_note_046",

                expression:
                  "write honestly",

                meaning:
                  "正直に書く",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_047",

                expression:
                  "reply responsibly",

                meaning:
                  "責任を持って返答する",

                weakEligible: true
              },

              {
                id: "q10_original_032_note_048",

                expression:
                  "consider more than",

                meaning:
                  "～だけでなく、それ以上を検討する",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
  id: "a",

  choices: [
    {
      id: "a1",
      text: "get over"
    },

    {
      id: "a2",
      text: "rely on"
    },

    {
      id: "a3",
      text: "turn down"
    },

    {
      id: "a4",
      text: "write down"
    }
  ],

  answer: "a2",

  explanation:
    "小規模事業者についてほかの情報を持たない場合、客がレビューを判断材料として頼りにするという内容です。rely on Aで「Aを頼りにする」という意味になります。",

  wrongChoiceReasons: {
    a1:
      "get overは「病気や困難を乗り越える」という意味で、レビューを参考にすることを表しません。",

    a3:
      "turn downは「～を断る」という意味で、レビューを情報源として利用する内容と合いません。",

    a4:
      "write downは「～を書き留める」という意味で、客がレビューを頼りにすることを表しません。"
  }
},

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "have an influence on"
          },

          {
            id: "b2",
            text: "keep in touch with"
          },

          {
            id: "b3",
            text: "lose interest in"
          },

          {
            id: "b4",
            text: "take the place of"
          }
        ],

        answer: "b1",

        explanation:
          "平均評価の高さが、客がその事業者を利用するかどうかの判断に影響するという内容です。have an influence on Aで「Aに影響を与える」という意味になります。",

        wrongChoiceReasons: {
          b2:
            "keep in touch withは「～と連絡を取り続ける」という意味で、客の判断への影響を表しません。",

          b3:
            "lose interest inは「～への関心を失う」という意味です。平均評価そのものが判断への影響を持つという文脈に合いません。",

          b4:
            "take the place ofは「～に取って代わる」という意味で、評価点が客の判断そのものに置き換わるわけではありません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For example"
          },

          {
            id: "c2",
            text: "Furthermore"
          },

          {
            id: "c3",
            text: "However"
          },

          {
            id: "c4",
            text: "Therefore"
          }
        ],

        answer: "c1",

        explanation:
          "直前では、繰り返し寄せられるコメントから改善点を知ることができると述べています。後ろでは、接客はよいが混雑時には遅いという具体例を示しているため、For exampleが適切です。",

        wrongChoiceReasons: {
          c2:
            "後ろの文は別の利点を追加しているのではなく、直前の説明の具体例です。",

          c3:
            "後ろの内容は直前の内容と反対ではありません。",

          c4:
            "後ろの文は直前の説明から生じる結果ではなく、具体的なレビュー内容の例です。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "agree with"
          },

          {
            id: "d2",
            text: "depend on"
          },

          {
            id: "d3",
            text: "respond to"
          },

          {
            id: "d4",
            text: "suffer from"
          }
        ],

        answer: "d3",

        explanation:
          "事業者が、説明、謝罪、解決策の提示などを通して客の苦情に対応するという内容です。respond to Aで「Aに対応する」「Aに返答する」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "agree with complaintsでは「苦情に同意する」という意味になり、問題を解決するための対応を表しません。",

          d2:
            "depend on complaintsでは「苦情に依存する」という不自然な意味になります。",

          d4:
            "suffer from complaintsでは「苦情に苦しむ」という意味になり、事業者が行う対応を表しません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "compare"
          },

          {
            id: "e2",
            text: "distinguish"
          },

          {
            id: "e3",
            text: "prevent"
          },

          {
            id: "e4",
            text: "protect"
          }
        ],

        answer: "e2",

        explanation:
          "信頼できるレビューと疑わしいレビューを見分ける必要があるという内容です。distinguish A from Bで「AとBを区別する」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "compare A with Bまたはcompare A and Bの形が一般的です。空欄の後ろがA from Bとなっているため、compareは使えません。",

          e3:
            "prevent A from doingなら「Aが～するのを防ぐ」という意味になりますが、レビューを区別する内容にはなりません。",

          e4:
            "protect A from Bは「AをBから守る」という意味で、信頼できるレビューと疑わしいレビューを見分けることを表しません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 33
  // Flexible Working Hours
  // =========================================================
  {
    id: "q10_original_033",
    number: 33,
    sourceType: "original",

    title: "Flexible Working Hours",
    titleJa: "柔軟な勤務時間",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "In many workplaces, employees are expected to begin and finish work at fixed times.",

            ja:
              "多くの職場では、従業員は決められた時刻に仕事を始め、終えることを求められています。",

            notes: [
              {
                id: "q10_original_033_note_001",

                expression:
                  "be expected to do",

                meaning:
                  "～することを求められている",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_002",

                expression:
                  "fixed time",

                meaning:
                  "決められた時刻",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "A common schedule may make communication and cooperation easier because workers are present at the same time.",

            ja:
              "共通の勤務予定があれば、従業員が同じ時間に職場にいるため、意思疎通や協力がしやすくなります。",

            notes: [
              {
                id: "q10_original_033_note_003",

                expression:
                  "common schedule",

                meaning:
                  "共通の勤務予定",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_004",

                expression:
                  "be present",

                meaning:
                  "その場にいる、出勤している",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "However, the same schedule may not suit every employee's personal situation.",

            ja:
              "しかし、同じ勤務予定が、すべての従業員の個人的な事情に合うとは限りません。",

            notes: [
              {
                id: "q10_original_033_note_005",

                expression:
                  "suit one's situation",

                meaning:
                  "人の事情に合う",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_006",

                expression:
                  "personal situation",

                meaning:
                  "個人的な事情",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Flexible working arrangements allow some employees to {{a}} their working hours to their needs.",

            ja:
              "柔軟な勤務制度によって、一部の従業員は自分の必要に合わせて勤務時間を調整できます。",

            notes: [
              {
                id: "q10_original_033_note_007",

                expression:
                  "flexible working arrangement",

                meaning:
                  "柔軟な勤務制度",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_008",

                expression:
                  "adjust A to B",

                meaning:
                  "AをBに合わせて調整する",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Flexible working hours can take several different forms.",

            ja:
              "柔軟な勤務時間には、いくつかの異なる形があります。",

            notes: [
              {
                id: "q10_original_033_note_009",

                expression:
                  "take several forms",

                meaning:
                  "いくつかの形を取る",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "In some workplaces, all employees must work during a central part of the day but may choose their starting and finishing times.",

            ja:
              "職場によっては、すべての従業員が一日の中心となる時間帯には働く必要がありますが、始業時刻と終業時刻を選べます。",

            notes: [
              {
                id: "q10_original_033_note_010",

                expression:
                  "a central part of the day",

                meaning:
                  "一日の中心となる時間帯",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_011",

                expression:
                  "starting and finishing times",

                meaning:
                  "始業時刻と終業時刻",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "One worker might begin at seven in the morning, while another starts at ten.",

            ja:
              "ある従業員は午前7時に仕事を始め、別の従業員は10時に始めることがあります。",

            notes: [
              {
                id: "q10_original_033_note_012",

                expression:
                  "while another does",

                meaning:
                  "一方で別の人は～する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Employees may also be {{b}} work longer hours on some days and leave earlier on others.",

            ja:
              "従業員は、ある日に長く働き、別の日には早く帰ることを許可される場合もあります。",

            notes: [
              {
                id: "q10_original_033_note_013",

                expression:
                  "be permitted to do",

                meaning:
                  "～することを許可される",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_014",

                expression:
                  "work longer hours",

                meaning:
                  "より長い時間働く",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_015",

                expression:
                  "leave earlier",

                meaning:
                  "より早く退勤する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "Other arrangements allow people to complete part of their work from home.",

            ja:
              "仕事の一部を自宅で行える制度もあります。",

            notes: [
              {
                id: "q10_original_033_note_016",

                expression:
                  "complete work from home",

                meaning:
                  "自宅で仕事を行う",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Flexible hours can help employees balance work with responsibilities outside the workplace.",

            ja:
              "柔軟な勤務時間は、従業員が仕事と職場外での責任とのバランスを取る助けになります。",

            notes: [
              {
                id: "q10_original_033_note_017",

                expression:
                  "balance A with B",

                meaning:
                  "AとBのバランスを取る",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_018",

                expression:
                  "responsibility outside the workplace",

                meaning:
                  "職場外での責任",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Parents may need to take children to school, while other workers care for older family members.",

            ja:
              "保護者は子どもを学校へ送る必要があり、別の従業員は高齢の家族を世話している場合があります。",

            notes: [
              {
                id: "q10_original_033_note_019",

                expression:
                  "take A to school",

                meaning:
                  "Aを学校へ連れていく",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_020",

                expression:
                  "care for an older family member",

                meaning:
                  "高齢の家族を世話する",

                weakEligible: true
              }
            ]
          },

          {
  id: "s12",

  en:
    "{{c}}, an employee may start work early so that he or she can attend an important family appointment in the afternoon.",

  ja:
    "例えば、従業員が午後の重要な家族の予定に参加できるよう、早く仕事を始める場合があります。",

  notes: [
    {
      id: "q10_original_033_note_021",

      expression:
        "for instance",

      meaning:
        "例えば",

      weakEligible: true
    },

    {
      id: "q10_original_033_note_022",

      expression:
        "family appointment",

      meaning:
        "家族に関する予定",

      weakEligible: true
    }
  ]
},

          {
            id: "s13",

            en:
              "Workers may also avoid traveling during the busiest hours of the morning and evening.",

            ja:
              "従業員は、朝夕の最も混雑する時間帯に移動することを避けられる場合もあります。",

            notes: [
              {
                id: "q10_original_033_note_023",

                expression:
                  "avoid doing",

                meaning:
                  "～することを避ける",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_024",

                expression:
                  "the busiest hours",

                meaning:
                  "最も混雑する時間帯",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "A less crowded journey may reduce stress and allow employees to begin work feeling more relaxed.",

            ja:
              "混雑の少ない通勤によってストレスが減り、従業員がより落ち着いた状態で仕事を始められる場合があります。",

            notes: [
              {
                id: "q10_original_033_note_025",

                expression:
                  "a less crowded journey",

                meaning:
                  "混雑の少ない移動、通勤",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_026",

                expression:
                  "begin work feeling relaxed",

                meaning:
                  "落ち着いた状態で仕事を始める",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "When employees have some control over their schedules, they may feel more trusted and satisfied with their jobs.",

            ja:
              "従業員が自分の勤務予定をある程度管理できれば、より信頼されていると感じ、仕事への満足度が高まる場合があります。",

            notes: [
              {
                id: "q10_original_033_note_027",

                expression:
                  "have control over",

                meaning:
                  "～を管理できる、～を自分で決められる",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_028",

                expression:
                  "be satisfied with one's job",

                meaning:
                  "自分の仕事に満足している",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "Flexible working hours can also create difficulties for businesses.",

            ja:
              "柔軟な勤務時間は、企業に問題をもたらす場合もあります。",

            notes: [
              {
                id: "q10_original_033_note_029",

                expression:
                  "create a difficulty for",

                meaning:
                  "～に問題をもたらす",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Managers must make sure that enough employees are available when customers need assistance.",

            ja:
              "管理者は、客が支援を必要とする時間に、十分な従業員が勤務していることを確認しなければなりません。",

            notes: [
              {
                id: "q10_original_033_note_030",

                expression:
                  "make sure that",

                meaning:
                  "～であることを確認する",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_031",

                expression:
                  "be available",

                meaning:
                  "対応できる、勤務している",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Team members may have fewer opportunities to discuss problems if their working hours rarely overlap.",

            ja:
              "勤務時間がほとんど重ならない場合、チームのメンバーが問題について話し合う機会が少なくなることがあります。",

            notes: [
              {
                id: "q10_original_033_note_032",

                expression:
                  "working hours overlap",

                meaning:
                  "勤務時間が重なる",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_033",

                expression:
                  "have fewer opportunities to do",

                meaning:
                  "～する機会が少ない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Businesses also need reliable systems to {{d}} when employees work and which tasks they complete.",

            ja:
              "企業には、従業員がいつ働き、どの仕事を終えたかを把握するための信頼できる仕組みも必要です。",

            notes: [
              {
                id: "q10_original_033_note_034",

                expression:
                  "keep track of",

                meaning:
                  "～を把握する、記録して追跡する",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_035",

                expression:
                  "reliable system",

                meaning:
                  "信頼できる仕組み",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_036",

                expression:
                  "complete a task",

                meaning:
                  "仕事を終える",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Without clear rules, some workers may feel that duties are not shared fairly.",

            ja:
              "明確な規則がなければ、仕事が公平に分担されていないと感じる従業員もいるかもしれません。",

            notes: [
              {
                id: "q10_original_033_note_037",

                expression:
                  "share duties fairly",

                meaning:
                  "仕事を公平に分担する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Employees who receive greater freedom may be expected to communicate clearly and complete their work {{e}} that flexibility.",

            ja:
              "より大きな自由を与えられた従業員は、その柔軟性と引き換えに、明確に連絡を取り、仕事を終えることを求められる場合があります。",

            notes: [
              {
                id: "q10_original_033_note_038",

                expression:
                  "in return for",

                meaning:
                  "～と引き換えに、～の見返りとして",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_039",

                expression:
                  "receive greater freedom",

                meaning:
                  "より大きな自由を与えられる",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_040",

                expression:
                  "communicate clearly",

                meaning:
                  "明確に連絡を取る",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "Flexible working hours are most effective when employee needs are balanced with teamwork, customer service, and clear responsibility.",

            ja:
              "柔軟な勤務時間が最も効果的なのは、従業員の必要性と、チームワーク、顧客対応、明確な責任とのバランスが取れているときです。",

            notes: [
              {
                id: "q10_original_033_note_041",

                expression:
                  "be balanced with",

                meaning:
                  "～とのバランスが取れている",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_042",

                expression:
                  "customer service",

                meaning:
                  "顧客対応",

                weakEligible: true
              },

              {
                id: "q10_original_033_note_043",

                expression:
                  "clear responsibility",

                meaning:
                  "明確な責任",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "adjust"
          },

          {
            id: "a2",
            text: "damage"
          },

          {
            id: "a3",
            text: "remove"
          },

          {
            id: "a4",
            text: "replace"
          }
        ],

        answer: "a1",

        explanation:
          "柔軟な勤務制度によって、従業員が自分の必要に合わせて勤務時間を変更できるという内容です。adjust A to Bで「AをBに合わせて調整する」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "damage working hoursでは「勤務時間を傷つける」という不自然な意味になります。",

          a3:
            "remove working hoursでは「勤務時間を取り除く」という意味になり、勤務時間を柔軟に変更することを表しません。",

          a4:
            "replace A with Bなら「AをBに置き換える」という意味ですが、後ろがto their needsなので語法が合いません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "encouraged to"
          },

          {
            id: "b2",
            text: "permitted to"
          },

          {
            id: "b3",
            text: "prevented from"
          },

          {
            id: "b4",
            text: "required for"
          }
        ],

        answer: "b2",

        explanation:
          "ある日に長く働き、別の日には早く帰ることを認められるという内容です。be permitted to doで「～することを許可される」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "be encouraged to doは「～するよう勧められる」という意味ですが、ここでは勤務制度として許可されていることを述べています。",

          b3:
            "be prevented fromの後ろには動名詞が必要です。また、長く働くことを妨げられるという意味になり、文脈と反対です。",

          b4:
            "be required forの後ろには名詞が続くため、workという動詞の原形にはつながりません。"
        }
      },

      {
  id: "c",

  choices: [
    {
      id: "c1",
      text: "For instance"
    },

    {
      id: "c2",
      text: "However"
    },

    {
      id: "c3",
      text: "In other words"
    },

    {
      id: "c4",
      text: "Therefore"
    }
  ],

  answer: "c1",

  explanation:
    "直前では、柔軟な勤務時間が家庭での責任との両立に役立つと述べています。後ろでは、家族の予定に合わせて早く仕事を始めるという具体例を示しているため、For instanceが適切です。",

  wrongChoiceReasons: {
    c2:
      "後ろの内容は、柔軟な勤務時間の利点と反対ではなく、その具体例です。",

    c3:
      "後ろの文は直前の内容を別の言葉で言い換えたものではなく、具体的な場面を示しています。",

    c4:
      "後ろの文は直前の内容から必然的に生じる結果ではなく、一つの例です。"
  }
},

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "catch up with"
          },

          {
            id: "d2",
            text: "keep track of"
          },

          {
            id: "d3",
            text: "look down on"
          },

          {
            id: "d4",
            text: "run out of"
          }
        ],

        answer: "d2",

        explanation:
          "企業が、従業員の勤務時間や完了した仕事を記録し、把握する必要があるという内容です。keep track of Aで「Aを把握する」「Aを記録して追跡する」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "catch up withは「～に追いつく」という意味で、勤務時間を記録することを表しません。",

          d3:
            "look down onは「～を見下す」という意味で、従業員の勤務状況を管理することとは関係ありません。",

          d4:
            "run out ofは「～を使い果たす」という意味で、勤務時間や仕事の状況を把握することを表しません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "as a result of"
          },

          {
            id: "e2",
            text: "in addition to"
          },

          {
            id: "e3",
            text: "in return for"
          },

          {
            id: "e4",
            text: "in spite of"
          }
        ],

        answer: "e3",

        explanation:
          "従業員が柔軟な勤務という自由を得る一方で、明確な連絡や仕事の完了を求められるという交換関係を表しています。in return for Aで「Aと引き換えに」「Aの見返りとして」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "as a result ofは「～の結果として」という意味ですが、ここでは自由を与えられた結果というより、自由と責任の交換関係を表しています。",

          e2:
            "in addition toは「～に加えて」という意味です。仕事を終えることに柔軟性を追加するという意味になり、文脈に合いません。",

          e4:
            "in spite ofは「～にもかかわらず」という意味ですが、柔軟性と責任が反対の関係にあるのではなく、見返りの関係にあります。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 34
  // Subscription Services
  // =========================================================
  {
    id: "q10_original_034",
    number: 34,
    sourceType: "original",

    title: "Subscription Services",
    titleJa: "定額制サービス",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Subscription services have become a common part of daily life.",

            ja:
              "定額制サービスは、日常生活の中で一般的なものになっています。",

            notes: [
              {
                id: "q10_original_034_note_001",

                expression:
                  "subscription service",

                meaning:
                  "定額制サービス、継続契約型サービス",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_002",

                expression:
                  "a common part of daily life",

                meaning:
                  "日常生活の一般的な一部",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Customers regularly pay a fixed amount of money to continue using a product or service.",

            ja:
              "利用者は、商品やサービスを継続して利用するため、定期的に一定額を支払います。",

            notes: [
              {
                id: "q10_original_034_note_003",

                expression:
                  "a fixed amount of money",

                meaning:
                  "一定額のお金",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_004",

                expression:
                  "continue doing",

                meaning:
                  "～し続ける",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "Examples include video and music services, online newspapers, software, fitness programs, and food delivery plans.",

            ja:
              "その例には、動画・音楽サービス、オンライン新聞、ソフトウェア、運動プログラム、食品配送プランなどがあります。",

            notes: [
              {
                id: "q10_original_034_note_005",

                expression:
                  "include",

                meaning:
                  "～を含む",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_006",

                expression:
                  "food delivery plan",

                meaning:
                  "食品の定期配送プラン",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "As long as customers continue paying, they usually {{a}} all or part of the service.",

            ja:
              "利用者が支払いを続けている限り、通常はサービスの全部または一部を利用できます。",

            notes: [
              {
                id: "q10_original_034_note_007",

                expression:
                  "as long as",

                meaning:
                  "～する限り",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_008",

                expression:
                  "have access to",

                meaning:
                  "～を利用できる、～に接することができる",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "Subscription services can offer convenience and a wide range of choices.",

            ja:
              "定額制サービスは、利便性と幅広い選択肢を提供できます。",

            notes: [
              {
                id: "q10_original_034_note_009",

                expression:
                  "offer convenience",

                meaning:
                  "利便性を提供する",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_010",

                expression:
                  "a wide range of",

                meaning:
                  "幅広い～",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Users do not need to buy each film, song, article, or computer program separately.",

            ja:
              "利用者は、映画、楽曲、記事、コンピュータープログラムを一つずつ別々に購入する必要がありません。",

            notes: [
              {
                id: "q10_original_034_note_011",

                expression:
                  "separately",

                meaning:
                  "別々に、個別に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "Instead, one regular payment may provide a large collection of content.",

            ja:
              "その代わり、一度の定期的な支払いで、多くのコンテンツを利用できる場合があります。",

            notes: [
              {
                id: "q10_original_034_note_012",

                expression:
                  "regular payment",

                meaning:
                  "定期的な支払い",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_013",

                expression:
                  "a collection of content",

                meaning:
                  "一まとまりのコンテンツ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "Customers are usually {{b}} the same amount each month, so their spending may be easier to predict.",

            ja:
              "通常、利用者には毎月同じ金額が請求されるため、支出を予測しやすくなる場合があります。",

            notes: [
              {
                id: "q10_original_034_note_014",

                expression:
                  "be charged for",

                meaning:
                  "～の料金を請求される",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_015",

                expression:
                  "predict one's spending",

                meaning:
                  "支出を予測する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "Some services also recommend new content based on a user's previous choices.",

            ja:
              "利用者が以前に選んだものに基づいて、新しいコンテンツを勧めるサービスもあります。",

            notes: [
              {
                id: "q10_original_034_note_016",

                expression:
                  "recommend A based on B",

                meaning:
                  "Bに基づいてAを勧める",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_017",

                expression:
                  "previous choice",

                meaning:
                  "以前の選択",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "Subscription systems can also benefit businesses.",

            ja:
              "定額制の仕組みは、企業にも利益をもたらすことがあります。",

            notes: [
              {
                id: "q10_original_034_note_018",

                expression:
                  "benefit a business",

                meaning:
                  "企業に利益をもたらす",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Regular payments provide a more predictable source of income than individual purchases.",

            ja:
              "定期的な支払いは、個別の購入よりも予測しやすい収入源になります。",

            notes: [
              {
                id: "q10_original_034_note_019",

                expression:
                  "a predictable source of income",

                meaning:
                  "予測しやすい収入源",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_020",

                expression:
                  "individual purchase",

                meaning:
                  "個別の購入",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Companies may use this information to plan future services, manage costs, and invest in new products.",

            ja:
              "企業は、この情報を使って、将来のサービスを計画し、費用を管理し、新しい商品に投資できます。",

            notes: [
              {
                id: "q10_original_034_note_021",

                expression:
                  "manage costs",

                meaning:
                  "費用を管理する",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_022",

                expression:
                  "invest in",

                meaning:
                  "～に投資する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "Businesses can also study which parts of a service are used most often.",

            ja:
              "企業は、サービスのどの部分が最もよく利用されているかを調べることもできます。",

            notes: [
              {
                id: "q10_original_034_note_023",

                expression:
                  "study which",

                meaning:
                  "どれが～かを調べる",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_024",

                expression:
                  "most often",

                meaning:
                  "最も頻繁に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "This may help them improve popular features and remove those that few customers use.",

            ja:
              "これにより、人気のある機能を改善し、ほとんどの利用者が使わない機能を取り除くことができます。",

            notes: [
              {
                id: "q10_original_034_note_025",

                expression:
                  "popular feature",

                meaning:
                  "人気のある機能",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_026",

                expression:
                  "remove",

                meaning:
                  "～を取り除く",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "A continuing relationship with customers may also make it easier to introduce additional products.",

            ja:
              "利用者との継続的な関係によって、追加の商品を紹介しやすくなる場合もあります。",

            notes: [
              {
                id: "q10_original_034_note_027",

                expression:
                  "a continuing relationship with",

                meaning:
                  "～との継続的な関係",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_028",

                expression:
                  "introduce an additional product",

                meaning:
                  "追加の商品を紹介する",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "{{c}}, individual purchases require customers to make a separate decision each time they spend money.",

            ja:
              "これに対して、個別購入では、利用者はお金を使うたびに別々に判断しなければなりません。",

            notes: [
              {
                id: "q10_original_034_note_029",

                expression:
                  "in contrast",

                meaning:
                  "これに対して、対照的に",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_030",

                expression:
                  "make a separate decision",

                meaning:
                  "個別に判断する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "With subscriptions, payments may continue automatically even when customers are no longer using the service regularly.",

            ja:
              "定額制サービスでは、利用者がそのサービスを定期的に使わなくなっても、支払いが自動的に続く場合があります。",

            notes: [
              {
                id: "q10_original_034_note_031",

                expression:
                  "continue automatically",

                meaning:
                  "自動的に続く",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_032",

                expression:
                  "no longer",

                meaning:
                  "もはや～ない",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "People may forget how many services they have joined or how much they are paying in total.",

            ja:
              "利用者は、いくつのサービスに加入しているかや、合計でいくら支払っているかを忘れてしまうことがあります。",

            notes: [
              {
                id: "q10_original_034_note_033",

                expression:
                  "join a service",

                meaning:
                  "サービスに加入する",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_034",

                expression:
                  "in total",

                meaning:
                  "合計で",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Some companies make it easy to begin a subscription but difficult to {{d}} it.",

            ja:
              "企業によっては、定額制サービスを始めるのは簡単でも、解約するのが難しい場合があります。",

            notes: [
              {
                id: "q10_original_034_note_035",

                expression:
                  "cancel a subscription",

                meaning:
                  "定額制サービスを解約する",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_036",

                expression:
                  "make it difficult to do",

                meaning:
                  "～することを難しくする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Customers may need to search through several pages, make a telephone call, or wait until the end of a contract period.",

            ja:
              "利用者は、複数のページを探したり、電話をかけたり、契約期間の終了まで待ったりしなければならない場合があります。",

            notes: [
              {
                id: "q10_original_034_note_037",

                expression:
                  "search through",

                meaning:
                  "～の中をくまなく探す",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_038",

                expression:
                  "contract period",

                meaning:
                  "契約期間",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "Before joining, consumers should check the total cost, cancellation rules, and whether prices may rise later.",

            ja:
              "加入する前に、消費者は総費用、解約の規則、料金が後から上がる可能性があるかを確認するべきです。",

            notes: [
              {
                id: "q10_original_034_note_039",

                expression:
                  "total cost",

                meaning:
                  "総費用",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_040",

                expression:
                  "cancellation rule",

                meaning:
                  "解約に関する規則",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "A subscription offers good value only when customers {{e}} the service and regularly review whether they still need it.",

            ja:
              "定額制サービスが十分な価値を持つのは、利用者がそのサービスを十分に活用し、今も必要かどうかを定期的に見直す場合だけです。",

            notes: [
              {
                id: "q10_original_034_note_041",

                expression:
                  "make full use of",

                meaning:
                  "～を十分に活用する",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_042",

                expression:
                  "offer good value",

                meaning:
                  "価格に見合う十分な価値を提供する",

                weakEligible: true
              },

              {
                id: "q10_original_034_note_043",

                expression:
                  "review whether",

                meaning:
                  "～かどうかを見直す",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "have access to"
          },

          {
            id: "a2",
            text: "keep away from"
          },

          {
            id: "a3",
            text: "run out of"
          },

          {
            id: "a4",
            text: "take care of"
          }
        ],

        answer: "a1",

        explanation:
          "料金を支払い続けている間、利用者がサービスを利用できるという内容です。have access to Aで「Aを利用できる」「Aに接することができる」という意味になります。",

        wrongChoiceReasons: {
          a2:
            "keep away fromは「～に近づかない」という意味で、サービスを利用する内容と反対です。",

          a3:
            "run out ofは「～を使い果たす」という意味で、サービスを利用できることを表しません。",

          a4:
            "take care ofは「～の世話をする」「～を処理する」という意味で、サービスの利用権を表しません。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "charged for"
          },

          {
            id: "b2",
            text: "compared with"
          },

          {
            id: "b3",
            text: "protected from"
          },

          {
            id: "b4",
            text: "satisfied with"
          }
        ],

        answer: "b1",

        explanation:
          "利用者に毎月同じ金額が請求されるという内容です。be charged for Aで「Aの料金を請求される」という意味になります。ここではAに当たるものがthe same amountです。",

        wrongChoiceReasons: {
          b2:
            "be compared withは「～と比較される」という意味で、毎月の請求を表しません。",

          b3:
            "be protected fromでは「同じ金額から守られる」という不自然な意味になります。",

          b4:
            "be satisfied withは「～に満足している」という意味ですが、利用者が金額を請求されることを表せません。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "For instance"
          },

          {
            id: "c2",
            text: "In contrast"
          },

          {
            id: "c3",
            text: "In addition"
          },

          {
            id: "c4",
            text: "Therefore"
          }
        ],

        answer: "c2",

        explanation:
          "直前までは、定額制サービスが企業にもたらす利点を述べています。後ろでは、定額制とは異なり、個別購入では支払いのたびに判断が必要だと対比しているため、In contrastが適切です。",

        wrongChoiceReasons: {
          c1:
            "後ろの文は、定額制サービスの利点の具体例ではなく、個別購入との違いを示しています。",

          c3:
            "後ろの内容は利点を追加するものではなく、定額制サービスと個別購入を対比しています。",

          c4:
            "個別購入の特徴は、直前に述べた企業側の利点から生じる結果ではありません。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "cancel"
          },

          {
            id: "d2",
            text: "deliver"
          },

          {
            id: "d3",
            text: "exchange"
          },

          {
            id: "d4",
            text: "produce"
          }
        ],

        answer: "d1",

        explanation:
          "サービスへの加入は簡単でも、契約を終了することが難しい場合があるという内容です。cancel a subscriptionで「定額制サービスを解約する」という意味になります。",

        wrongChoiceReasons: {
          d2:
            "deliverは「～を届ける」という意味で、契約を終了することを表しません。",

          d3:
            "exchangeは「～を交換する」という意味で、subscriptionとの組合せでは解約を表せません。",

          d4:
            "produceは「～を生産する」という意味で、サービス契約との組合せは不自然です。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "catch sight of"
          },

          {
            id: "e2",
            text: "get rid of"
          },

          {
            id: "e3",
            text: "make full use of"
          },

          {
            id: "e4",
            text: "take the place of"
          }
        ],

        answer: "e3",

        explanation:
          "定額制サービスを十分に利用している場合に、支払う料金に見合う価値が得られるという内容です。make full use of Aで「Aを十分に活用する」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "catch sight ofは「～を見かける」という意味で、サービスを十分に利用することを表しません。",

          e2:
            "get rid ofは「～を処分する、取り除く」という意味で、サービスを活用する内容と反対です。",

          e4:
            "take the place ofは「～に取って代わる」という意味で、利用者がサービスを活用することを表しません。"
        }
      }
    ],

    verified: true
  },

    // =========================================================
  // Question 35
  // Package-free Shops
  // =========================================================
  {
    id: "q10_original_035",
    number: 35,
    sourceType: "original",

    title: "Package-free Shops",
    titleJa: "量り売り・包装を減らした店",

    paragraphs: [
      {
        id: "p1",

        sentences: [
          {
            id: "s1",

            en:
              "Most products in supermarkets are sold in bags, boxes, bottles, or other forms of packaging.",

            ja:
              "スーパーマーケットにある商品の多くは、袋、箱、ボトルなどの包装に入れて販売されています。",

            notes: [
              {
                id: "q10_original_035_note_001",

                expression:
                  "be sold in",

                meaning:
                  "～に入れて販売される",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_002",

                expression:
                  "packaging",

                meaning:
                  "包装、包装材",

                weakEligible: true
              }
            ]
          },

          {
            id: "s2",

            en:
              "Packaging protects goods during transportation, provides information, and makes products easier to store.",

            ja:
              "包装には、輸送中に商品を守り、情報を示し、商品を保管しやすくする役割があります。",

            notes: [
              {
                id: "q10_original_035_note_003",

                expression:
                  "during transportation",

                meaning:
                  "輸送中に",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_004",

                expression:
                  "make A easier to do",

                meaning:
                  "Aをより～しやすくする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s3",

            en:
              "However, much of this material is thrown away soon after a product is purchased.",

            ja:
              "しかし、こうした包装材の多くは、商品が購入された直後に捨てられます。",

            notes: [
              {
                id: "q10_original_035_note_005",

                expression:
                  "be thrown away",

                meaning:
                  "捨てられる",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_006",

                expression:
                  "soon after",

                meaning:
                  "～のすぐ後に",

                weakEligible: true
              }
            ]
          },

          {
            id: "s4",

            en:
              "Package-free shops try to reduce this waste by asking customers to {{a}} containers.",

            ja:
              "包装を減らした店では、客に自分の容器を持参してもらうことで、こうしたごみを減らそうとしています。",

            notes: [
              {
                id: "q10_original_035_note_007",

                expression:
                  "package-free shop",

                meaning:
                  "包装を使わない、または減らした店",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_008",

                expression:
                  "bring one's own",

                meaning:
                  "自分の～を持参する",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_009",

                expression:
                  "ask A to do",

                meaning:
                  "Aに～するよう求める",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p2",

        sentences: [
          {
            id: "s5",

            en:
              "In these shops, products such as rice, pasta, nuts, soap, and cleaning liquids are stored in large containers.",

            ja:
              "こうした店では、米、パスタ、ナッツ、せっけん、洗剤などが大型の容器に保管されています。",

            notes: [
              {
                id: "q10_original_035_note_010",

                expression:
                  "cleaning liquid",

                meaning:
                  "液体洗剤",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_011",

                expression:
                  "be stored in",

                meaning:
                  "～に保管される",

                weakEligible: true
              }
            ]
          },

          {
            id: "s6",

            en:
              "Customers first weigh an empty jar, bottle, or bag before putting a product into it.",

            ja:
              "客は、商品を入れる前に、空の瓶、ボトル、袋などの重さを量ります。",

            notes: [
              {
                id: "q10_original_035_note_012",

                expression:
                  "weigh an empty container",

                meaning:
                  "空の容器の重さを量る",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_013",

                expression:
                  "put A into B",

                meaning:
                  "AをBに入れる",

                weakEligible: true
              }
            ]
          },

          {
            id: "s7",

            en:
              "The container is then {{b}} the amount that the customer wishes to buy.",

            ja:
              "その後、容器には、客が購入したい量の商品が入れられます。",

            notes: [
              {
                id: "q10_original_035_note_014",

                expression:
                  "be filled with",

                meaning:
                  "～で満たされる、～が入れられる",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_015",

                expression:
                  "the amount that A wishes to buy",

                meaning:
                  "Aが購入したい量",

                weakEligible: true
              }
            ]
          },

          {
            id: "s8",

            en:
              "At the checkout, the weight of the empty container is subtracted from the total weight.",

            ja:
              "会計時には、全体の重さから空の容器の重さが差し引かれます。",

            notes: [
              {
                id: "q10_original_035_note_016",

                expression:
                  "at the checkout",

                meaning:
                  "会計時に",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_017",

                expression:
                  "subtract A from B",

                meaning:
                  "BからAを差し引く",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_018",

                expression:
                  "total weight",

                meaning:
                  "全体の重さ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s9",

            en:
              "The customer pays only for the product itself rather than for the container.",

            ja:
              "客は容器ではなく、商品そのものに対してだけ料金を支払います。",

            notes: [
              {
                id: "q10_original_035_note_019",

                expression:
                  "pay for",

                meaning:
                  "～の代金を支払う",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_020",

                expression:
                  "rather than",

                meaning:
                  "～ではなく",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p3",

        sentences: [
          {
            id: "s10",

            en:
              "This system can offer environmental and practical advantages.",

            ja:
              "この仕組みには、環境面と実用面での利点があります。",

            notes: [
              {
                id: "q10_original_035_note_021",

                expression:
                  "practical advantage",

                meaning:
                  "実用面での利点",

                weakEligible: true
              }
            ]
          },

          {
            id: "s11",

            en:
              "Containers can be washed and reused many times instead of being immediately discarded.",

            ja:
              "容器はすぐに捨てられるのではなく、洗って何度も再利用できます。",

            notes: [
              {
                id: "q10_original_035_note_022",

                expression:
                  "instead of doing",

                meaning:
                  "～する代わりに、～せずに",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_023",

                expression:
                  "discard",

                meaning:
                  "～を捨てる、処分する",

                weakEligible: true
              }
            ]
          },

          {
            id: "s12",

            en:
              "Customers can also choose the exact quantity that they need.",

            ja:
              "客は、自分が必要とする正確な量を選ぶこともできます。",

            notes: [
              {
                id: "q10_original_035_note_024",

                expression:
                  "exact quantity",

                meaning:
                  "正確な量、必要な分量",

                weakEligible: true
              }
            ]
          },

          {
            id: "s13",

            en:
              "Someone who needs only a small amount of an ingredient does not have to purchase an entire package.",

            ja:
              "ある食材を少量だけ必要とする人は、一袋すべてを購入する必要がありません。",

            notes: [
              {
                id: "q10_original_035_note_025",

                expression:
                  "a small amount of",

                meaning:
                  "少量の～",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_026",

                expression:
                  "an entire package",

                meaning:
                  "一包装分すべて",

                weakEligible: true
              }
            ]
          },

          {
            id: "s14",

            en:
              "{{c}}, buying only the necessary amount may reduce both packaging waste and unused food.",

            ja:
              "その結果、必要な量だけを購入することで、包装ごみと使われずに残る食品の両方を減らせる場合があります。",

            notes: [
              {
                id: "q10_original_035_note_027",

                expression:
                  "consequently",

                meaning:
                  "その結果、したがって",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_028",

                expression:
                  "the necessary amount",

                meaning:
                  "必要な量",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_029",

                expression:
                  "unused food",

                meaning:
                  "使われずに残った食品",

                weakEligible: true
              }
            ]
          },

          {
            id: "s15",

            en:
              "People may also try unfamiliar products without having to buy a large quantity.",

            ja:
              "人々は、大量に購入することなく、知らない商品を試すこともできます。",

            notes: [
              {
                id: "q10_original_035_note_030",

                expression:
                  "unfamiliar product",

                meaning:
                  "なじみのない商品",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_031",

                expression:
                  "without having to do",

                meaning:
                  "～する必要なしに",

                weakEligible: true
              }
            ]
          }
        ]
      },

      {
        id: "p4",

        sentences: [
          {
            id: "s16",

            en:
              "Despite these advantages, package-free shopping can require additional effort.",

            ja:
              "こうした利点がある一方で、包装を減らした買い物には、さらに手間がかかる場合があります。",

            notes: [
              {
                id: "q10_original_035_note_032",

                expression:
                  "despite",

                meaning:
                  "～にもかかわらず",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_033",

                expression:
                  "additional effort",

                meaning:
                  "追加の手間、努力",

                weakEligible: true
              }
            ]
          },

          {
            id: "s17",

            en:
              "Customers must remember to carry suitable containers and keep them clean.",

            ja:
              "客は、適切な容器を持っていくことを忘れず、清潔に保たなければなりません。",

            notes: [
              {
                id: "q10_original_035_note_034",

                expression:
                  "remember to do",

                meaning:
                  "忘れずに～する",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_035",

                expression:
                  "keep A clean",

                meaning:
                  "Aを清潔に保つ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s18",

            en:
              "Filling, weighing, and labeling each container may take longer than choosing an already packaged product.",

            ja:
              "それぞれの容器に商品を入れ、重さを量り、表示を付けることは、包装済みの商品を選ぶより時間がかかる場合があります。",

            notes: [
              {
                id: "q10_original_035_note_036",

                expression:
                  "label a container",

                meaning:
                  "容器に表示を付ける",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_037",

                expression:
                  "already packaged",

                meaning:
                  "すでに包装された",

                weakEligible: true
              }
            ]
          },

          {
            id: "s19",

            en:
              "Shops must also follow strict rules to prevent food from becoming dirty or unsafe.",

            ja:
              "店は、食品が汚れたり安全でなくなったりするのを防ぐため、厳しい規則に従う必要もあります。",

            notes: [
              {
                id: "q10_original_035_note_038",

                expression:
                  "follow a strict rule",

                meaning:
                  "厳しい規則に従う",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_039",

                expression:
                  "prevent A from doing",

                meaning:
                  "Aが～するのを防ぐ",

                weakEligible: true
              }
            ]
          },

          {
            id: "s20",

            en:
              "Package-free shops may have difficulty offering products that require special protection during transportation or storage.",

            ja:
              "包装を減らした店では、輸送中や保管中に特別な保護を必要とする商品を扱うことが難しい場合があります。",

            notes: [
              {
                id: "q10_original_035_note_040",

                expression:
                  "have difficulty doing",

                meaning:
                  "～することが難しい",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_041",

                expression:
                  "require special protection",

                meaning:
                  "特別な保護を必要とする",

                weakEligible: true
              }
            ]
          },

          {
            id: "s21",

            en:
              "To {{d}} unnecessary packaging, both businesses and customers must change some of their usual habits.",

            ja:
              "不要な包装を減らすためには、企業と客の両方が普段の習慣の一部を変えなければなりません。",

            notes: [
              {
                id: "q10_original_035_note_042",

                expression:
                  "cut down on",

                meaning:
                  "～を減らす",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_043",

                expression:
                  "unnecessary packaging",

                meaning:
                  "不要な包装",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_044",

                expression:
                  "usual habit",

                meaning:
                  "普段の習慣",

                weakEligible: true
              }
            ]
          },

          {
            id: "s22",

            en:
              "The system is likely to succeed when shops provide clear instructions and customers are {{e}} spend a little more time preparing for their purchases.",

            ja:
              "店が分かりやすい説明を行い、客が買い物の準備に少し多くの時間を使う意思があるとき、この仕組みは成功しやすくなります。",

            notes: [
              {
                id: "q10_original_035_note_045",

                expression:
                  "be likely to do",

                meaning:
                  "～する可能性が高い",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_046",

                expression:
                  "be willing to do",

                meaning:
                  "進んで～する、～する意思がある",

                weakEligible: true
              },

              {
                id: "q10_original_035_note_047",

                expression:
                  "prepare for a purchase",

                meaning:
                  "買い物の準備をする",

                weakEligible: true
              }
            ]
          }
        ]
      }
    ],

    blanks: [
      {
        id: "a",

        choices: [
          {
            id: "a1",
            text: "bring their own"
          },

          {
            id: "a2",
            text: "give up their"
          },

          {
            id: "a3",
            text: "look after their"
          },

          {
            id: "a4",
            text: "throw away their"
          }
        ],

        answer: "a1",

        explanation:
          "包装ごみを減らすため、客が自分の容器を店へ持ってくるという内容です。bring one's own Aで「自分のAを持参する」という意味になります。主語がcustomersなので、theirを使います。",

        wrongChoiceReasons: {
          a2:
            "give upは「～を諦める、手放す」という意味で、容器を店に持参することを表しません。",

          a3:
            "look afterは「～の世話をする」という意味です。容器を管理することは表せますが、店へ持参するという内容にはなりません。",

          a4:
            "throw awayは「～を捨てる」という意味で、容器を再利用する目的と反対です。"
        }
      },

      {
        id: "b",

        choices: [
          {
            id: "b1",
            text: "covered with"
          },

          {
            id: "b2",
            text: "filled with"
          },

          {
            id: "b3",
            text: "protected from"
          },

          {
            id: "b4",
            text: "separated from"
          }
        ],

        answer: "b2",

        explanation:
          "空の容器の中に、客が購入したい量の商品を入れるという内容です。be filled with Aで「Aで満たされる」「Aが入れられる」という意味になります。",

        wrongChoiceReasons: {
          b1:
            "be covered withは「～で覆われている」という意味で、容器の中に商品を入れることを表しません。",

          b3:
            "be protected fromは「～から守られる」という意味で、商品を容器へ入れる内容と合いません。",

          b4:
            "be separated fromは「～から分離されている」という意味で、容器と商品を離すことになってしまいます。"
        }
      },

      {
        id: "c",

        choices: [
          {
            id: "c1",
            text: "Consequently"
          },

          {
            id: "c2",
            text: "For instance"
          },

          {
            id: "c3",
            text: "Nevertheless"
          },

          {
            id: "c4",
            text: "Similarly"
          }
        ],

        answer: "c1",

        explanation:
          "直前では、必要な量だけ購入でき、一包装分すべてを買う必要がないと述べています。その結果、包装ごみと余る食品を減らせるため、Consequentlyが適切です。",

        wrongChoiceReasons: {
          c2:
            "後ろの文は、必要な量だけ買えることの具体例ではなく、その結果を述べています。",

          c3:
            "Neverthelessは「それにもかかわらず」という逆接を表しますが、後ろの内容は直前と反対ではありません。",

          c4:
            "Similarlyは「同様に」という意味ですが、ここでは二つの同じような事柄を比較しているのではなく、結果を示しています。"
        }
      },

      {
        id: "d",

        choices: [
          {
            id: "d1",
            text: "catch up with"
          },

          {
            id: "d2",
            text: "cut down on"
          },

          {
            id: "d3",
            text: "look forward to"
          },

          {
            id: "d4",
            text: "put up with"
          }
        ],

        answer: "d2",

        explanation:
          "企業と客が習慣を変える目的は、不要な包装の量を減らすことです。cut down on Aで「Aを減らす」という意味になります。",

        wrongChoiceReasons: {
          d1:
            "catch up withは「～に追いつく」という意味で、包装の量を減らすことを表しません。",

          d3:
            "look forward toは「～を楽しみにする」という意味で、不要な包装を削減する内容にはなりません。",

          d4:
            "put up withは「～を我慢する」という意味で、包装を減らすことを表しません。"
        }
      },

      {
        id: "e",

        choices: [
          {
            id: "e1",
            text: "able to"
          },

          {
            id: "e2",
            text: "afraid to"
          },

          {
            id: "e3",
            text: "required to"
          },

          {
            id: "e4",
            text: "willing to"
          }
        ],

        answer: "e4",

        explanation:
          "量り売りの仕組みが成功するには、客が買い物の準備に少し手間をかける意思を持つ必要があるという内容です。be willing to doで「進んで～する」「～する意思がある」という意味になります。",

        wrongChoiceReasons: {
          e1:
            "be able to doは「～することができる」という能力や可能性を表しますが、ここでは時間をかける意思があることが重要です。",

          e2:
            "be afraid to doは「～するのを恐れる」という意味で、制度に協力する態度と合いません。",

          e3:
            "be required to doは「～することを要求される」という意味です。本文では、客が自発的に少し手間をかける意思について述べています。"
        }
      }
    ],

    verified: true
  },

   
];

window.q10Questions = q10Questions;

