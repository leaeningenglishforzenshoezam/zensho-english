/* 問題文・訳・選択肢・正答は提供された完成版の固定データ。
 * 新しいSETは同じ形式で配列末尾に追加してください。
 * answerは1始まりの正答番号。選択肢はシャッフルしません。
 */
(function () {
  "use strict";
  const paragraphs = text => text.trim().split(/\n\n/);
  const questions = (choices, translations, answers) => choices.map((items, i) => ({
    id: "abcde"[i], choices: items, choicesJa: translations[i], answer: answers[i]
  }));
  window.q7Sets = [
    {
      id: "q7_set_001", number: 1, title: "Repair Café", passageTitle: "Repair Cafés",
      passage: paragraphs(`When something breaks, many people simply replace it with a new one. However, there is another choice. Repair Cafés give people a place where they can try to make damaged belongings usable again instead of throwing them away.

The idea began in the Netherlands with Martine Postma. Before starting the project, she earned her living by producing articles for newspapers and magazines and by helping draw attention to projects and ideas. She was also interested in making everyday life more sustainable. In 2009, she organized the first Repair Café in Amsterdam. Local residents gathered in the foyer of the Fijnhout, a building normally used for plays and other stage performances.

A Repair Café is different from an ordinary service where people simply leave a broken object and collect it later. People who bring things are expected to do as much of the work as they can. Those with more practical experience explain the necessary steps, provide tools, and step in when needed. In this way, people can learn useful skills while trying to make their belongings work again.

A wide variety of things can be brought in, including electrical appliances, clothes, furniture, bicycles, and toys. However, not every job can be finished during a single visit. Sometimes a certain component is needed but is not available there. In such cases, a volunteer may tell the person where it can be bought and what specifications it should meet. The work may then be continued after the necessary material has been found.

Repair Cafés can become crowded, so some rules are used to keep the line moving. During busy periods, a person who has brought several broken objects can have only the first one looked at initially. To ask for help with another object, that person must return to the end of the line. This gives others a chance to receive assistance without waiting too long.

Since the first event in Amsterdam, the idea has spread to many other places. Repair Cafés encourage people to consider fixing things instead of immediately replacing them. They also give people with practical knowledge an opportunity to pass what they know on to others.`),
      summary: paragraphs(`The idea of the Repair Café began in the Netherlands in 2009. Before starting the project, Martine Postma earned her living as (a).

At a Repair Café, people bring broken belongings and meet volunteers with various repair skills. A typical repair involves (b).

The first Repair Café was held in Amsterdam in 2009. The event took place in (c).

Sometimes a repair cannot be completed during a visit. In that situation, visitors may receive (d).

There are also special rules for times when many people are waiting. One of these rules concerns (e).`),
      passageJa: paragraphs(`何かが壊れると、多くの人はそのまま新しいものに買い替えます。しかし、別の選択肢もあります。リペア・カフェは、壊れた持ち物を捨てるのではなく、再び使えるようにすることに挑戦できる場所を提供しています。

このアイデアは、オランダのマルティーヌ・ポストマによって生まれました。この取り組みを始める前、彼女は新聞や雑誌の記事を書いたり、企画やアイデアに人々の関心を集める手助けをしたりして生計を立てていました。また、日常生活をより持続可能なものにすることにも関心がありました。2009年、彼女はアムステルダムで最初のリペア・カフェを開催しました。地域の住民は、普段は演劇などの舞台公演に使われている建物「フィンハウト」のロビーに集まりました。

リペア・カフェは、壊れたものを預け、後で受け取るだけの通常の修理サービスとは異なります。ものを持ち込んだ人には、できる限り自分で修理作業を行うことが求められます。実践的な経験が豊富な人たちは、必要な手順を説明し、道具を提供し、必要に応じて手を貸します。このように、参加者は自分の持ち物を再び使えるようにしようと取り組みながら、役立つ技術を学ぶことができます。

電化製品、衣服、家具、自転車、おもちゃなど、さまざまなものを持ち込むことができます。しかし、すべての修理が一度の訪問で終わるわけではありません。特定の部品が必要でも、その場にない場合があります。そのようなときには、ボランティアが、その部品をどこで購入できるか、また、どのような仕様のものが必要かを伝えることがあります。必要なものが見つかった後で、修理作業を続けることができます。

リペア・カフェは混雑することがあるため、順番待ちの列が滞らないように、いくつかのルールが設けられています。混雑時には、壊れたものを複数持ち込んだ人でも、最初は一つだけを見てもらうことができます。別のものについても手助けを求めたい場合、その人は列の最後尾に並び直さなければなりません。これにより、ほかの人も長く待ちすぎることなく支援を受ける機会を得られます。

アムステルダムでの最初の開催以来、このアイデアは多くの場所へと広がってきました。リペア・カフェは、すぐに買い替えるのではなく、修理することを考えるよう人々に促しています。また、実践的な知識を持つ人々に、その知識をほかの人へ伝える機会も提供しています。`),
      summaryJa: paragraphs(`リペア・カフェのアイデアは、2009年にオランダで生まれました。この取り組みを始める前、マルティーヌ・ポストマは (a) として生計を立てていました。

リペア・カフェでは、人々が壊れた持ち物を持ち込み、さまざまな修理技術を持つボランティアと出会います。一般的な修理では、(b)。

最初のリペア・カフェは、2009年にアムステルダムで開催されました。この催しは (c) で行われました。

訪問中に修理を終えられないこともあります。そのような場合、訪問者は (d) を受けることがあります。

多くの人が待っているときのために、特別なルールもあります。そのうちの一つは、(e) に関するものです。`),
      questions: questions([
        ["an engineer and designer", "a teacher and researcher", "a journalist and publicist", "a shop owner and manager"],
        ["experts repairing the items while visitors assist them", "visitors watching experts repair the items step by step", "experts showing repair methods before visitors work independently", "visitors repairing their own items with expert help"],
        ["a repair shop", "a public library", "a school", "a theatre"],
        ["information about returning at another time", "advice on where to obtain a suitable part", "information about a professional repair service", "advice on completing the repair at home"],
        ["the amount of time allowed for each repair", "the handling of multiple items brought by one visitor", "the kinds of objects accepted that day", "the number of volunteers working on each item"]
      ], [
        ["技術者兼デザイナー", "教員兼研究者", "ジャーナリスト兼広報担当者", "店主兼経営者"],
        ["専門家が品物を修理し、訪問者がその手伝いをする", "訪問者が、専門家による修理を手順に沿って見学する", "専門家が修理方法を示した後、訪問者が自力で作業する", "訪問者が、専門家の助けを借りながら自分の品物を修理する"],
        ["修理店", "公共図書館", "学校", "劇場"],
        ["別の日時に再訪することについての情報", "適切な部品をどこで入手できるかについての助言", "専門の修理サービスについての情報", "自宅で修理を完成させるための助言"],
        ["それぞれの修理に認められる時間", "一人の訪問者が持ち込んだ複数の品物の取り扱い", "その日に受け付ける品物の種類", "一つの品物の修理を担当するボランティアの人数"]
      ], [3, 4, 4, 2, 2])
    },
    {
      id: "q7_set_002", number: 2, title: "Seed Library", passageTitle: "More Than a Collection of Seeds", passageTitleJa: "種のコレクションにとどまらない取り組み",
      passage: paragraphs(`Libraries are usually associated with reading and information, but some offer services that go beyond printed materials. The Springfield-Greene County Library District in Missouri has developed one such program. Residents can take small packets home, grow food or flowers from them, and learn how the next generation can be collected and shared with other people.

The collection contains many kinds that people may already know, including vegetables, herbs, and flowers. However, it also offers something different. Some of its packets come from wild species that have long grown naturally in the Ozarks. These can be useful to insects that carry pollen and can also help people create yards that fit the local environment.

Getting the packets is only one part of the program. The district also directs users to information that can help them become more successful growers. An online catalog explains how each kind can be started, while another guide gives advice about collecting mature seeds. The district's website also recommends YouTube, where recorded demonstrations walk viewers through the main steps involved in raising different kinds and gathering mature seeds from them. These resources allow even people with little experience to learn more before trying the work themselves.

Sharing is encouraged, but beginners do not have to contribute something to the collection later. When crops have finished growing, users who successfully collect new seeds are welcome to contribute them to the program. They are free not to do so, and the library does not require a certain amount from those who choose to contribute. The district explains that learning the basic skills comes first.

People can use the program in several parts of the community. Packets are kept at the Library Center, the Library Station, Midtown Carnegie, Park Central, Republic, and Schweitzer Brentwood branches. They are also carried by a vehicle that travels to different communities and provides the district's services to people there.

In this way, the program does more than simply distribute something to grow. It gives beginners access to useful information, makes participation possible in several parts of the community, and creates opportunities for locally collected seeds to move from one person to another.`),
      summary: paragraphs(`A public library in Missouri operates a Seed Library that provides both seeds and support for people who want to grow plants. In addition to vegetables, herbs, and flowers, the collection includes (a).

The library also introduces several resources for people who need help with gardening or saving seeds. One online resource provides (b).

The program has its own policy about seeds after the plants have grown. Under this policy, (c).

The program reaches people in several parts of the area. One part of this system involves (d).

Packets are also kept at a number of permanent library branches. Altogether, they are available at (e).`),
      passageJa: paragraphs(`図書館といえば、通常は読書や情報を思い浮かべますが、印刷物の提供にとどまらないサービスを行っている図書館もあります。ミズーリ州のスプリングフィールド・グリーン郡図書館区は、そうした取り組みの一つを始めました。住民は種の入った小さな袋を家に持ち帰り、その種から食用の植物や花を育て、次の世代の種を採取してほかの人と分け合う方法を学ぶことができます。

このコレクションには、野菜、ハーブ、花など、人々がすでによく知っているような種類が数多く含まれています。しかし、それとは異なるものも提供しています。一部の袋には、オザーク地方で古くから自然に生育してきた野生種の種が入っています。こうした植物は、花粉を運ぶ昆虫にとって役立つほか、地域の環境に合った庭づくりにも役立ちます。

種の袋を受け取ることは、この取り組みの一部分にすぎません。図書館区は、植物をよりうまく育てるために役立つ情報も利用者に案内しています。オンラインのカタログでは、それぞれの種類の植物をどのように育て始めればよいかを説明しており、別のガイドでは、成熟した種を採取するための助言を提供しています。また、図書館区のウェブサイトではYouTubeも紹介しています。そこでは、録画された実演動画が、さまざまな種類の植物を育て、そこから成熟した種を採取する際の主な手順を順を追って説明しています。こうした資料を利用すれば、経験の少ない人でも、自分で実際に取り組む前に知識を深めることができます。

種を分け合うことは奨励されていますが、初心者が後でこのコレクションに何かを提供する必要はありません。作物の生育が終わった後、新しい種をうまく採取できた利用者は、その種をこの取り組みに提供することができます。提供しないことも自由です。また、提供する人に対して、図書館が一定の量を求めることもありません。図書館区は、まず基本的な技術を身につけることが大切だと説明しています。

人々は地域内のいくつかの場所で、この取り組みを利用できます。種の袋は、ライブラリー・センター、ライブラリー・ステーション、ミッドタウン・カーネギー、パーク・セントラル、リパブリック、シュヴァイツァー・ブレントウッドの各分館に置かれています。また、さまざまな地域を巡回し、そこに住む人々に図書館区のサービスを提供する車両にも積まれています。

このように、この取り組みは、育てるための種を単に配るだけのものではありません。初心者が役立つ情報を得られるようにし、地域内のいくつかの場所で参加できるようにするとともに、地域で採取された種が人から人へと渡っていく機会を生み出しています。`),
      summaryJa: paragraphs(`ミズーリ州のある公共図書館は、植物を育てたい人々に種と支援の両方を提供する「種の図書館」を運営しています。野菜、ハーブ、花に加えて、このコレクションには (a) が含まれています。

図書館は、園芸や種の採取・保存について助けを必要とする人々に、いくつかの資料も紹介しています。オンラインで利用できる資料の一つは、(b) を提供しています。

この取り組みには、植物が育った後の種について独自の方針があります。その方針では、(c)。

この取り組みは、地域内のいくつかの場所に住む人々にサービスを届けています。この仕組みの一部には、(d) が関わっています。

種の袋は、常設の図書館分館にも置かれています。常設の分館では、全部で (e) で入手できます。`),
      questions: questions([
        ["plants suited mainly to shaded gardens", "crops commonly used to improve garden soil", "plants native to the region", "varieties developed for small growing spaces"],
        ["videos showing how to handle particular varieties", "live online sessions with experienced gardeners", "an online guide to choosing suitable planting times", "a tool that creates planting plans for individual gardens"],
        ["saved seeds are returned only when enough have been collected", "saved seeds must be returned before another checkout", "gardeners who return seeds must give back everything they collect", "gardeners may decide whether to return saved seeds"],
        ["a botanical center", "a mobile library", "a community garden", "a farmers' market"],
        ["five permanent branches", "seven permanent branches", "six permanent branches", "eight permanent branches"]
      ], [
        ["主に日陰の庭に適した植物", "庭の土壌を改良するためによく使われる作物", "その地域に自生する植物", "狭い栽培スペース向けに開発された品種"],
        ["特定の品種の育て方や種の採取方法を示す動画", "経験豊富な園芸家によるオンラインのライブ講座", "適切な植え付け時期を選ぶためのオンラインガイド", "個々の庭に合わせた植え付け計画を作成するツール"],
        ["採取して保存した種は、十分な量が集まった場合にのみ返却される", "次に種を借りる前に、採取して保存した種を返却しなければならない", "種を返却する栽培者は、採取した種をすべて返さなければならない", "栽培者は、採取して保存した種を返却するかどうかを自分で決められる"],
        ["植物センター", "移動図書館", "共同菜園", "農産物の直売市場"],
        ["5か所の常設分館", "7か所の常設分館", "6か所の常設分館", "8か所の常設分館"]
      ], [3, 1, 4, 2, 3])
    },
    {
      id: "q7_set_003", number: 3, title: "Human Library", passageTitle: "A Different Kind of Library",
      passage: paragraphs(`Most libraries lend books, but one project that began in Denmark lends people instead. The Human Library was created in Copenhagen in 2000 by Ronni Abergel, his brother Dany, and two of their colleagues. They developed the idea for Roskilde, one of Denmark’s biggest annual gatherings, where crowds come to hear bands and singers perform.

The idea was to give strangers a chance to meet people they might not normally approach. In the Human Library, volunteers become “Books,” while the people who meet them are called “readers.” Each Book represents a group or a topic that is often misunderstood or judged by others. Rather than answering from academic study or from information collected about other people, Books respond on the basis of things they themselves have gone through. Readers are encouraged to ask questions, including ones that may normally be difficult to ask.

Not everyone who applies can immediately become a Book. First, a person fills in a form on the Internet and explains why they are interested in meeting readers and what they could bring to the program. After that, a staff member meets the applicant and learns more about the person and the proposed topic. If both sides think the role is a good match, the applicant is invited to take part in special preparation before appearing at an event.

The Human Library also has rules intended to make these meetings safe and respectful. Readers are expected to treat Books with respect and to be curious without forgetting that they are dealing with another person. Neither side is required to continue until the planned finishing time. A reader or a Book can bring the exchange to a close at any point, without first getting permission from the other person or from a staff member.

The first Human Library attracted a large number of people. More than fifty different “titles” were available, giving visitors many different people to meet. The event ran for four days in a row, and readers could use the Human Library for eight hours on each of those days. More than a thousand people took part as readers during the event.

What began as one experiment in Copenhagen later spread far beyond Denmark. The basic idea, however, has remained the same: instead of judging someone from a label or an outward appearance, people are given an opportunity to meet, ask questions, and listen to what another person has to say.`),
      summary: paragraphs(`The Human Library began in Denmark in 2000. It was first developed as an activity for (a).

Unlike ordinary books, the “Books” in this program are real people. They answer questions from readers about a topic connected with (b).

People who want to become Books must go through several steps. After completing an online application, they (c) before they can move on to training.

There are also rules for conversations between Books and readers. One of these rules says that (d).

The first Human Library event continued for four days. Over the whole event, it was open for a total of (e).`),
      passageJa: paragraphs(`普通の図書館では本を貸し出しますが、デンマークで始まったある取り組みでは、その代わりに「人」を貸し出します。ヒューマン・ライブラリーは2000年にコペンハーゲンで、ロニー・アバーゲルとその兄弟のダニー、そして2人の仲間によって創設されました。彼らは、デンマークで毎年開かれる最大規模のイベントの一つで、多くの人々がバンドや歌手の演奏を聴くために集まるロスキレのイベントのために、このアイデアを考えました。

この取り組みの目的は、普段なら声をかけることのないような人と出会う機会を、人々に提供することでした。ヒューマン・ライブラリーでは、ボランティアが「Book（本）」となり、その人たちと会う人は「reader（読者）」と呼ばれます。それぞれのBookは、他の人から誤解されたり、決めつけられたりすることの多い集団やテーマを表しています。Bookは、学問的に学んだことや、他の人について集めた情報をもとに答えるのではありません。自分自身が実際に経験してきたことをもとに答えます。readerは、普段なら尋ねにくいようなことも含めて、質問することを勧められています。

応募した人が誰でもすぐにBookになれるわけではありません。まず、インターネット上のフォームに記入し、なぜreaderと会うことに関心があるのか、また自分がこのプログラムにどのようなものを提供できるのかを説明します。その後、スタッフが応募者と会い、その人自身や、提案されたテーマについてさらに詳しく知ります。双方がその役割に適していると判断すれば、応募者はイベントに参加する前に、特別な準備を受けることになります。

ヒューマン・ライブラリーには、このような出会いを安全で、お互いを尊重したものにするためのルールもあります。readerはBookを尊重し、相手も一人の人間であることを忘れずに関心をもって接することが求められます。どちらの側も、予定されていた終了時刻まで会話を続けなければならないわけではありません。readerでもBookでも、相手やスタッフから事前に許可を得ることなく、いつでもそのやり取りを終えることができます。

最初のヒューマン・ライブラリーには、多くの人が集まりました。50を超えるさまざまな「タイトル」が用意され、訪れた人々は多様な人たちと出会うことができました。このイベントは4日間連続で開かれ、readerはそれぞれの日に8時間、ヒューマン・ライブラリーを利用することができました。イベント期間中には、1,000人を超える人々がreaderとして参加しました。

コペンハーゲンで一つの試みとして始まったこの活動は、その後デンマークを越えて広く広がっていきました。しかし、基本的な考え方は変わっていません。人を肩書きや外見だけで判断するのではなく、実際に会い、質問し、その人自身の話に耳を傾ける機会をつくることです。`),
      summaryJa: paragraphs(`ヒューマン・ライブラリーは、2000年にデンマークで始まりました。もともとは(a)のための活動として考案されました。

普通の本とは異なり、このプログラムの「Books」は実際の人間です。彼らは、(b)に関係するテーマについてreaderからの質問に答えます。

Bookになりたい人は、いくつかの段階を経なければなりません。オンラインでの応募を終えた後、研修へ進む前に(c)。

Bookとreaderとの会話にもルールがあります。そのルールの一つでは、(d)とされています。

最初のヒューマン・ライブラリーのイベントは4日間続きました。イベント全体では、合計(e)開かれていました。`),
      questions: questions([
        ["a public education conference", "a local arts exhibition", "an international book fair", "a large music festival"],
        ["events they have personally witnessed at close range", "experiences that have directly affected their own lives", "groups or communities they have personally belonged to", "work they have personally done over many years"],
        ["speak with someone from the organization", "provide references from people who know them", "attend an event as an observer", "prepare a written plan for their topic"],
        ["either participant may end the conversation after first asking a librarian", "either participant may end the conversation only if both people agree to stop", "either participant may end the conversation whenever they choose", "either participant may end the conversation only if it becomes uncomfortable"],
        ["thirty-six hours", "twenty-four hours", "twenty-eight hours", "thirty-two hours"]
      ], [
        ["公共教育に関する会議", "地域の芸術展", "国際的なブックフェア", "大規模な音楽祭"],
        ["自分自身が間近で目撃した出来事", "自分自身の人生に直接関わった経験", "自分自身が所属してきた集団やコミュニティ", "自分自身が長年行ってきた仕事"],
        ["運営側の人と話をする", "自分を知っている人からの推薦を提出する", "見学者としてイベントに参加する", "自分のテーマについて書面で計画を作成する"],
        ["どちらの参加者も、まずスタッフに申し出た後であれば会話を終了できる", "双方が終了することに同意した場合にのみ、どちらの参加者も会話を終了できる", "どちらの参加者も、自分が望むときに会話を終了できる", "会話が不快なものになった場合にのみ、どちらの参加者も会話を終了できる"],
        ["36時間", "24時間", "28時間", "32時間"]
      ], [4, 2, 1, 3, 4])
    },
    {
      id: "q7_set_004", number: 4, title: "GoodGym", passageTitle: "Exercise That Helps Others",
      passage: paragraphs(`For many people, exercise and volunteer work are two separate activities. GoodGym, a charity in the United Kingdom, brings them together. Its members run, walk, or cycle while helping community groups and older people with practical jobs. Instead of exercising only for themselves, participants can use their physical activity to make a difference in the places where they live.

GoodGym offers several kinds of activities. One of them is called a Community Mission. Before the activity, participants are told where the work will happen and when they should arrive. Unlike some group activities, however, everyone does not have to begin the journey from the same point. People usually travel independently to the site and meet the others there. Some may run, while others may walk or cycle.

Another type of activity simply called a Mission is designed to help an older person with a practical problem. The work might involve clearing part of an overgrown garden, moving a heavy object, or changing the battery in a smoke alarm. The aim is to deal with fairly simple problems rather than jobs that should be left to trained tradespeople. Electrical work, for example, is outside the kind of help GoodGym volunteers are expected to provide. These visits are also intended to be limited in length. Even when a job is not finished, volunteers are not expected to continue for more than an hour and a half.

Because Missions may take volunteers into the homes of older people, GoodGym has procedures that must be completed before someone can take part for the first time. The organization first uses the DBS system to examine relevant official records. The volunteer must also work through a brief preparation module on the Internet covering what to expect and how to stay safe. Once these steps have been completed, the person can choose a Mission to join.

GoodGym is a registered charity, but taking part does not depend on paying a membership fee. Members who wish to support the organization financially can give money each month, and many choose to do so. However, a person who gives nothing can still join the same activities. The organization says that lack of money should not prevent someone from becoming involved.

GoodGym therefore offers more than a way to exercise. It connects physical activity with useful work, while rules about safety, preparation, and the types of jobs volunteers undertake help make the system practical for both participants and the people receiving support.`),
      summary: paragraphs(`GoodGym is a charity in the United Kingdom that connects exercise with volunteer work. People can run, walk, or cycle while taking part in activities that support local communities and older people. There are several ways to participate, and each type of activity has its own way of being organized.

One type of activity is called a Community Mission. Participants receive information beforehand about where the activity will take place. In most cases, they (a).

GoodGym also organizes Missions that provide practical help for older people. The organization has rules about the kinds of jobs volunteers can do. In general, these tasks (b). There is also a limit on how long this type of help should take: a Mission should last no more than (c).

Before taking part in a Mission for an older person, volunteers have to complete certain steps intended to prepare them for the activity. They are required to complete (d) before choosing their first Mission.

GoodGym also has a particular policy about the cost of taking part in its activities. Under this system, (e).`),
      passageJa: paragraphs(`多くの人にとって、運動とボランティア活動は別々のものです。しかし、イギリスの慈善団体GoodGymは、この二つを結びつけています。メンバーは、走ったり、歩いたり、自転車に乗ったりしながら、地域の団体や高齢者の実際的な作業を手伝います。自分自身のためだけに運動するのではなく、参加者は身体を動かすことを、自分たちの住む地域に役立てることができます。

GoodGymにはいくつかの種類の活動があります。その一つがCommunity Missionです。活動の前に、参加者には作業が行われる場所と到着すべき時刻が知らされます。しかし、一部のグループ活動とは異なり、全員が同じ場所から移動を始める必要はありません。通常、参加者はそれぞれ自分で活動場所へ向かい、そこで他の参加者と合流します。走って向かう人もいれば、歩いたり、自転車に乗ったりする人もいます。

単にMissionと呼ばれる別の活動は、高齢者が抱えている実際的な問題を手助けするためのものです。伸びすぎた庭の一部を片づけたり、重い物を移動させたり、火災報知器の電池を交換したりすることがあります。その目的は、訓練を受けた専門職の人に任せるべき仕事ではなく、比較的簡単な問題に対応することです。例えば電気工事は、GoodGymのボランティアが行うことを想定されている支援の範囲外です。また、このような訪問は長時間にならないようにされています。作業が終わっていなくても、ボランティアが1時間半を超えて続けることは求められていません。

Missionでは高齢者の自宅に入ることがあるため、GoodGymでは、初めて参加する前に完了しなければならない手続きがあります。まず、DBSという制度を利用して、関係する公的な記録を確認します。また、ボランティアは、活動で予想されることや安全を保つ方法について扱った、インターネット上の短い事前学習にも取り組まなければなりません。これらの手続きが終わると、参加するMissionを選べるようになります。

GoodGymは登録された慈善団体ですが、参加するために会費を支払う必要はありません。団体を金銭的に支援したいメンバーは毎月お金を寄付することができ、実際に多くの人がそうしています。しかし、まったくお金を出さない人でも、同じ活動に参加できます。GoodGymは、お金がないことによって誰かが参加できなくなるべきではないとしています。

このようにGoodGymは、単なる運動の機会以上のものを提供しています。身体活動と人の役に立つ仕事を結びつけると同時に、安全、事前準備、ボランティアが行う仕事の種類についてルールを設けることで、参加者にも支援を受ける人にも利用しやすい仕組みをつくっています。`),
      summaryJa: paragraphs(`GoodGymは、運動とボランティア活動を結びつけるイギリスの慈善団体です。参加者は、地域社会や高齢者を支援する活動に参加しながら、走ったり、歩いたり、自転車に乗ったりすることができます。参加方法はいくつかあり、それぞれの活動には独自の運営方法があります。

活動の一つにCommunity Missionがあります。参加者は、活動が行われる場所について事前に情報を受け取ります。ほとんどの場合、参加者は(a)。

GoodGymは、高齢者に実際的な支援を行うMissionも実施しています。ボランティアが行える仕事の種類にはルールがあります。一般的に、これらの作業は(b)。また、この種類の支援には時間の上限もあり、Missionは(c)を超えてはいけません。

高齢者を支援するMissionに参加する前に、ボランティアは活動に備えるためのいくつかの手続きを完了しなければなりません。最初のMissionを選ぶ前に、(d)を完了する必要があります。

GoodGymには、活動への参加費用についても独自の方針があります。この制度では、(e)。`),
      questions: questions([
        ["meet at a fixed starting point and travel to the task together", "make their own way to the place where the task will be done", "travel with an activity leader from the nearest GoodGym meeting point", "choose between transport arranged by GoodGym and travelling alone"],
        ["are normally completed by at least two volunteers working together", "are selected only when all necessary equipment is already at the site", "must be suitable for completion without entering a private home", "can be carried out without the services of a qualified professional"],
        ["ninety minutes", "one hundred and five minutes", "sixty minutes", "seventy-five minutes"],
        ["an online safety course and a supervised practice Mission", "an identity check and a face-to-face safety session", "a background check and a short online training course", "a background check and an interview with a local activity leader"],
        ["everyone pays a small monthly charge after joining", "people can take part for free, while financial contributions are optional", "only some types of activities can be joined without payment", "participants choose between paying monthly and paying for each activity"]
      ], [
        ["決められた集合場所に集まり、全員で活動場所へ向かう", "それぞれ自分で作業が行われる場所へ向かう", "最寄りのGoodGymの集合場所から活動リーダーと一緒に移動する", "GoodGymが用意した交通手段を利用するか、一人で移動するかを選ぶ"],
        ["通常、少なくとも2人のボランティアが一緒に作業して完了させる", "必要な道具がすべて活動場所にそろっている場合にのみ選ばれる", "個人の住宅に入らずに完了できる仕事でなければならない", "資格を持つ専門家の力を借りなくても行うことができる"],
        ["90分", "105分", "60分", "75分"],
        ["オンラインの安全講習と、監督を受けながら行う練習Mission", "本人確認と対面での安全講習", "身元・経歴の確認と短いオンライン研修", "身元・経歴の確認と地域の活動リーダーとの面談"],
        ["参加後、全員が少額の月会費を支払う", "無料で活動に参加でき、金銭的な支援は任意である", "一部の種類の活動だけ無料で参加できる", "月ごとに支払うか、活動ごとに支払うかを参加者が選ぶ"]
      ], [2, 4, 1, 3, 2])
    }
  ];
})();
