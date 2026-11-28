// Chapter 3 decision data. The visible text never exposes points or route prerequisites.
(function(root){'use strict';
const events=[
  {
    "id": "c01",
    "title": "助けられた直後",
    "scene": "s01",
    "options": [
      {
        "key": "a",
        "en": "Thank Bud",
        "ja": "バドに礼を言う",
        "score": 1,
        "lines": [
          {
            "speaker": "主人公",
            "text": "バドも、ありがとう。"
          },
          {
            "speaker": "",
            "text": "バドは主人公を見る。礼を言われるとは思っていなかったらしい。"
          },
          {
            "speaker": "ヒロトシ",
            "text": "はは、バドに直接礼を言う人は珍しいな。"
          }
        ]
      },
      {
        "key": "b",
        "en": "Check your partner",
        "ja": "相棒の様子を見る",
        "score": 1,
        "lines": [
          {
            "speaker": "",
            "text": "主人公は相棒のそばにしゃがむ。"
          },
          {
            "speaker": "主人公",
            "text": "足、どう？"
          },
          {
            "speaker": "相棒",
            "text": "ちょっとひねっただけ。"
          },
          {
            "speaker": "",
            "text": "バドが二人のやり取りを見ている。"
          }
        ]
      },
      {
        "key": "c",
        "en": "Ask about the attackers",
        "ja": "襲撃者について尋ねる",
        "score": 0,
        "lines": [
          {
            "speaker": "主人公",
            "text": "あいつら、よく出るの？"
          },
          {
            "speaker": "ヒロトシ",
            "text": "ときどきね。旅人の荷物を狙ってるんだ。"
          },
          {
            "speaker": "",
            "text": "バドはまだ森の奥へ目を向けている。"
          }
        ]
      }
    ]
  },
  {
    "id": "c02",
    "title": "山小屋の食卓",
    "scene": "s03",
    "options": [
      {
        "key": "a",
        "en": "Let your partner tell it",
        "ja": "相棒に話してもらう",
        "score": 1,
        "lines": [
          {
            "speaker": "主人公",
            "text": "じゃあ、話してよ。"
          },
          {
            "speaker": "相棒",
            "text": "あの日は雨がすごくてね。橋を渡るのはやめようって言ったのに。"
          },
          {
            "speaker": "主人公",
            "text": "渡れると思ったんだよ。"
          },
          {
            "speaker": "相棒",
            "text": "結局、引き返したでしょ。"
          },
          {
            "speaker": "",
            "text": "ヒロトシが声を上げて笑う。暖炉のそばのバドも顔を上げた。"
          }
        ]
      },
      {
        "key": "b",
        "en": "Tell your side",
        "ja": "自分の視点から話す",
        "score": 0,
        "lines": [
          {
            "speaker": "主人公",
            "text": "雨で道が見えなくなって、木の下で休んだんだ。"
          },
          {
            "speaker": "相棒",
            "text": "あの木、全然雨を防げなかったね。"
          },
          {
            "speaker": "主人公",
            "text": "二人ともびしょ濡れだった。"
          },
          {
            "speaker": "",
            "text": "ヒロトシは楽しそうに聞いていた。バドは暖炉の前で休んでいる。"
          }
        ]
      },
      {
        "key": "c",
        "en": "Ask about Bud",
        "ja": "バドとの思い出を尋ねる",
        "score": 1,
        "lines": [
          {
            "speaker": "主人公",
            "text": "ヒロトシとバドは？ 昔から一緒なの？"
          },
          {
            "speaker": "ヒロトシ",
            "text": "うん。まだ俺の膝くらいしかなかったころから。寒い夜は、いつも俺にくっついて寝てたな。"
          },
          {
            "speaker": "",
            "text": "ヒロトシがバドの頭をなでる。バドは目を細めた。"
          }
        ]
      }
    ]
  },
  {
    "id": "c03",
    "title": "バドとの初対話",
    "scene": "s07",
    "options": [
      {
        "key": "a",
        "en": "Ask Bud why",
        "ja": "バドに理由を尋ねる",
        "score": 2,
        "lines": [
          {
            "speaker": "主人公",
            "text": "……それでも、ヒロトシのそばにいるの？"
          },
          {
            "speaker": "バド",
            "text": "……あいつが、おれを育ててくれたから。"
          },
          {
            "speaker": "バド",
            "text": "寒いときは一緒に寝た。食べ物も分けてくれた。"
          },
          {
            "speaker": "",
            "text": "相棒がその言葉を主人公に伝える。主人公はすぐには返事ができなかった。"
          }
        ]
      },
      {
        "key": "b",
        "en": "Confront Bud",
        "ja": "バドに抗議する",
        "score": 1,
        "lines": [
          {
            "speaker": "主人公",
            "text": "知ってて手伝ってるのかよ！"
          },
          {
            "speaker": "",
            "text": "バドの表情が険しくなる。"
          },
          {
            "speaker": "バド",
            "text": "……ヒロトシを悪く言うな。"
          },
          {
            "speaker": "主人公",
            "text": "だって、あいつは……！"
          },
          {
            "speaker": "",
            "text": "相棒が主人公の腕に触れる。主人公は言葉をのみ込んだ。"
          }
        ]
      },
      {
        "key": "c",
        "en": "Ask Bud for help",
        "ja": "バドに助けを求める",
        "score": 0,
        "lines": [
          {
            "speaker": "主人公",
            "text": "だったら、ここから出してくれない？"
          },
          {
            "speaker": "",
            "text": "バドは扉を見る。"
          },
          {
            "speaker": "バド",
            "text": "……それは、できない。"
          },
          {
            "speaker": "バド",
            "text": "ヒロトシに、開けるなと言われている。"
          },
          {
            "speaker": "",
            "text": "バドは主人公から目をそらした。"
          }
        ]
      }
    ]
  },
  {
    "id": "c04",
    "title": "窓からの脱出相談",
    "scene": "s08",
    "options": [
      {
        "key": "a",
        "en": "Rethink the plan together",
        "ja": "相棒と一緒に考え直す",
        "score": 2,
        "lines": [
          {
            "speaker": "主人公",
            "text": "……そうだな。無理に出たら危ないよね。"
          },
          {
            "speaker": "相棒",
            "text": "うん。"
          },
          {
            "speaker": "主人公",
            "text": "ほかに何かないかな。"
          },
          {
            "speaker": "相棒",
            "text": "……扉が開くときなら、外の様子がわかるかも。"
          },
          {
            "speaker": "",
            "text": "バドは水を置く手を止めた。主人公が相棒の反対を受け入れるのが意外だったようだ。"
          }
        ]
      },
      {
        "key": "b",
        "en": "Check the window",
        "ja": "窓を詳しく調べる",
        "score": 1,
        "lines": [
          {
            "speaker": "主人公",
            "text": "まず、本当に通れるか確かめよう。"
          },
          {
            "speaker": "",
            "text": "主人公は寝具を重ね、窓から下をのぞく。"
          },
          {
            "speaker": "主人公",
            "text": "……石だらけの急斜面だ。危ないな。"
          },
          {
            "speaker": "相棒",
            "text": "じゃあ、やめよう。"
          },
          {
            "speaker": "",
            "text": "バドは二人が窓から離れるのを見ていた。"
          }
        ]
      },
      {
        "key": "c",
        "en": "Plan how to get help",
        "ja": "助けを呼ぶ方法を考える",
        "score": 1,
        "lines": [
          {
            "speaker": "主人公",
            "text": "外に出なくても、誰かに気づいてもらえないかな。"
          },
          {
            "speaker": "相棒",
            "text": "ここに人が通る？ 見つかったらヒロトシも来るよ。"
          },
          {
            "speaker": "主人公",
            "text": "……そうか。すぐには難しいな。"
          },
          {
            "speaker": "",
            "text": "バドは黙って水を置いた。"
          }
        ]
      }
    ]
  },
  {
    "id": "c05",
    "title": "負傷ゴイモンの危機",
    "scene": "s09",
    "options": [
      {
        "key": "a",
        "en": "Call out to Bud",
        "ja": "バドに呼びかける",
        "score": 3,
        "lines": [
          {
            "speaker": "主人公",
            "text": "バド！ あの子を見て！"
          },
          {
            "speaker": "",
            "text": "負傷したゴイモンは、バドを見上げたまま身を縮めている。"
          },
          {
            "speaker": "ヒロトシ",
            "text": "バド、奥へ運んで。"
          },
          {
            "speaker": "",
            "text": "バドは近づきかけて止まる。目の前のゴイモンから目を離せない。"
          },
          {
            "speaker": "主人公",
            "text": "……お願いだ。連れていかないで。"
          },
          {
            "speaker": "",
            "text": "バドはヒロトシを見る。命令を待つように動いてきたその足が、初めて止まった。"
          }
        ]
      },
      {
        "key": "b",
        "en": "Confront Hirotoshi",
        "ja": "ヒロトシに抗議する",
        "score": 2,
        "lines": [
          {
            "speaker": "主人公",
            "text": "やめろ！ その子はまだ生きてるんだぞ！"
          },
          {
            "speaker": "ヒロトシ",
            "text": "うん。だから、なるべく苦しまないようにするよ。"
          },
          {
            "speaker": "主人公",
            "text": "そうじゃない！ 手当てしてやれよ！"
          },
          {
            "speaker": "",
            "text": "ヒロトシは不思議そうに窓を見上げる。バドも主人公の声へ顔を向けた。"
          }
        ]
      },
      {
        "key": "c",
        "en": "Distract Hirotoshi",
        "ja": "ヒロトシの注意をそらす",
        "score": 1,
        "lines": [
          {
            "speaker": "主人公",
            "text": "ヒロトシ！ ちょっと話を聞いて！"
          },
          {
            "speaker": "ヒロトシ",
            "text": "……今？"
          },
          {
            "speaker": "主人公",
            "text": "旅のこと、もっと聞きたがってたよね。まだ話してないことがある。"
          },
          {
            "speaker": "",
            "text": "ヒロトシは斧を持ったまま、主人公と負傷ゴイモンを見比べた。"
          },
          {
            "speaker": "ヒロトシ",
            "text": "……そうだったね。"
          },
          {
            "speaker": "",
            "text": "バドは二人のやり取りを見ている。"
          }
        ]
      }
    ]
  },
  {
    "id": "c06",
    "title": "バドの恩義",
    "scene": "s10",
    "options": [
      {
        "key": "a",
        "en": "Ask about his past",
        "ja": "バドの過去を尋ねる",
        "score": 2,
        "lines": [
          {
            "speaker": "主人公",
            "text": "……バドはずっとここにいるの？"
          },
          {
            "speaker": "バド",
            "text": "……小さいころから。"
          },
          {
            "speaker": "バド",
            "text": "冬は寒かった。ヒロトシのそばは暖かかった。"
          },
          {
            "speaker": "",
            "text": "バドは床に視線を落とす。"
          },
          {
            "speaker": "バド",
            "text": "……今も覚えてる。"
          },
          {
            "speaker": "",
            "text": "主人公は静かにうなずいた。"
          }
        ]
      },
      {
        "key": "b",
        "en": "Explain your actions",
        "ja": "助けようとした理由を話す",
        "score": 2,
        "lines": [
          {
            "speaker": "主人公",
            "text": "あの子、逃げようとしてたんだ。バドが近づいたときも。"
          },
          {
            "speaker": "",
            "text": "バドは少し視線を落とす。"
          },
          {
            "speaker": "主人公",
            "text": "怖かったんだと思う。"
          },
          {
            "speaker": "",
            "text": "バドは何も言わない。けれど、扉へ向かう前にもう一度主人公を見た。"
          }
        ]
      },
      {
        "key": "c",
        "en": "Question Hirotoshi's actions",
        "ja": "ヒロトシの行動について尋ねる",
        "score": 0,
        "lines": [
          {
            "speaker": "主人公",
            "text": "かわいそうだって言いながら、食べようとした。それって変だと思わない？"
          },
          {
            "speaker": "バド",
            "text": "……ヒロトシは、あの子を大事にしてた。"
          },
          {
            "speaker": "主人公",
            "text": "……うん。"
          },
          {
            "speaker": "バド",
            "text": "だから、おれにはわからない。"
          },
          {
            "speaker": "",
            "text": "主人公はそれ以上尋ねなかった。"
          }
        ]
      }
    ]
  },
  {
    "id": "c07",
    "title": "共鳴の実演",
    "scene": "s12",
    "options": [
      {
        "key": "a",
        "en": "Follow your partner's lead",
        "ja": "次は相棒に合わせる",
        "score": 2,
        "lines": [
          {
            "speaker": "主人公",
            "text": "あの動き、よかったよ。次も任せていい？"
          },
          {
            "speaker": "相棒",
            "text": "もちろん！"
          },
          {
            "speaker": "",
            "text": "主人公は相棒の肩に触れた。バドはそのやり取りを見つめている。"
          }
        ]
      },
      {
        "key": "b",
        "en": "Thank your partner",
        "ja": "相棒に感謝する",
        "score": 1,
        "lines": [
          {
            "speaker": "主人公",
            "text": "助かったよ。ありがとう。"
          },
          {
            "speaker": "相棒",
            "text": "危なかったね。"
          },
          {
            "speaker": "主人公",
            "text": "うん。よく見えてたね。"
          },
          {
            "speaker": "",
            "text": "ヒロトシは笑っている。バドは二人の顔を見比べた。"
          }
        ]
      },
      {
        "key": "c",
        "en": "Review the strategy",
        "ja": "作戦を振り返る",
        "score": 1,
        "lines": [
          {
            "speaker": "主人公",
            "text": "いつ左へ行こうと思ったの？"
          },
          {
            "speaker": "相棒",
            "text": "相手が踏み出したとき。こっちを見てなかったから。"
          },
          {
            "speaker": "主人公",
            "text": "なるほど。次はそこも見てみる。"
          },
          {
            "speaker": "",
            "text": "ヒロトシは感心した様子で聞いている。バドも顔を上げた。"
          }
        ]
      }
    ]
  },
  {
    "id": "c08",
    "title": "最後の対峙",
    "scene": "s14",
    "options": [
      {
        "key": "a",
        "en": "Call out to Bud",
        "ja": "バドに呼びかける",
        "score": 0,
        "lines": [
          {
            "speaker": "主人公",
            "text": "……バド！"
          },
          {
            "speaker": "",
            "text": "バドが顔を上げる。"
          },
          {
            "speaker": "主人公",
            "text": "……頼む。"
          },
          {
            "speaker": "",
            "text": "バドは、主人公から目をそらさなかった。"
          }
        ]
      },
      {
        "key": "b",
        "en": "Protect your partner",
        "ja": "相棒をかばう",
        "score": 0,
        "lines": [
          {
            "speaker": "",
            "text": "主人公は相棒の前に出る。"
          },
          {
            "speaker": "相棒",
            "text": "大丈夫。ぼくも戦えるよ。"
          },
          {
            "speaker": "主人公",
            "text": "……うん。"
          },
          {
            "speaker": "",
            "text": "二人は並んでバドに向き直った。"
          }
        ]
      },
      {
        "key": "c",
        "en": "Prepare to fight",
        "ja": "戦闘に備える",
        "score": 0,
        "lines": [
          {
            "speaker": "主人公",
            "text": "……行ける？"
          },
          {
            "speaker": "相棒",
            "text": "うん。"
          },
          {
            "speaker": "",
            "text": "二人は身構える。バドはその様子を見ていた。"
          }
        ]
      }
    ]
  }
];
const byId=Object.fromEntries(events.map(x=>[x.id,x]));
const REQUIRED_SCORE=10;
function option(choiceId,key){const choice=byId[choiceId],found=choice?.options.find(x=>x.key===key);if(!found)throw Error('Unknown chapter3 choice: '+choiceId+'/'+key);return found;}
function evaluate(selections={}){
 let score=0;const chosen={};for(const event of events){const key=selections[event.id];if(key===undefined)continue;const o=option(event.id,key);chosen[event.id]=key;score+=o.score;}
 const respectedPartner=chosen.c04==='a'||chosen.c07==='a';
 const gaveBudChoice=chosen.c05==='a';
 return {score,maxScore:13,respectedPartner,gaveBudChoice,ready:events.every(e=>chosen[e.id]!==undefined),ally:score>=REQUIRED_SCORE&&respectedPartner&&gaveBudChoice,route:score>=REQUIRED_SCORE&&respectedPartner&&gaveBudChoice?'ally':'duel'};
}
const api=Object.freeze({events,byId,option,evaluate,REQUIRED_SCORE});
if(typeof module==='object'&&module.exports)module.exports=api;else root.GoimonChapter3Choices=api;
})(typeof window!=='undefined'?window:globalThis);
