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
    },
    {
      "id": "q7_set_005",
      "number": 5,
      "title": "The Street Store",
      "passageTitle": "A Store Where Choice Matters",
      "passage": [
        "Giving clothes to people in need is not a new idea. However, The Street Store approaches clothing donation in a different way. Instead of simply handing people whatever clothes are available, it creates a temporary shopping space where visitors can look through displayed items and select what suits them. The idea began in Cape Town, South Africa, in 2014 and places particular importance on allowing each visitor to make their own choices.",
        "The idea was developed by people working at M&C Saatchi Abel. Their everyday business was quite different from running a clothing project. They normally helped companies and well-known brands decide how to present themselves to the public and reach consumers through television, print, digital media, and other forms of communication. They used this creative experience to develop a new way of bringing donated clothing and people who needed it together.",
        "The Street Store was designed so that the idea could be repeated in other communities. A person who is interested in organizing one can make a pledge online and gain access to a set of instructions and other useful materials. Importantly, receiving these materials does not commit that person to going ahead. Someone can first read through the information, consider the amount of work involved, and then choose whether to continue with the project.",
        "People who do go ahead have considerable freedom to adapt the event to local conditions, but there are limits on how The Street Store name and materials can be used. The project asks hosts to use them for the benefit of people and communities rather than as a way of earning money for themselves. Hosts are responsible for respecting this principle while organizing their local store.",
        "The condition of donated clothing is also important. The aim is to give visitors real choices among items that are in good condition. Clothes that are badly torn, dirty, or damaged are unsuitable. The same is true of items that would need mending or treatment at a professional cleaner's before another person could wear them. Shoes should also be usable as a pair rather than being donated one at a time.",
        "Organizers do not have to work out every part of the event by themselves. A free Host Kit provides posters, a step-by-step guide, advice for volunteers, and tools for sharing information about the event. It also contains a sheet listing important preparation tasks so that organizers can mark each one as it is completed. These resources are intended to make the project possible even for people who have never organized such an event before.",
        "The Street Store has since been repeated in many communities. Although donated clothing is central to the project, its purpose goes beyond simply giving things away. By arranging clothes like goods in a shop and allowing visitors to choose for themselves, the project tries to make receiving help a more respectful and personal experience."
      ],
      "passageJa": [
        "困っている人に衣類を提供すること自体は、新しい考えではありません。しかし、The Street Storeは、衣類の寄付にこれまでとは異なる方法で取り組んでいます。利用できる服を一方的に渡すのではなく、展示された品物を訪れた人が見て回り、自分に合ったものを選べる一時的な買い物空間をつくります。この取り組みは2014年に南アフリカのケープタウンで始まり、一人ひとりが自分自身で選択できることを特に大切にしています。",
        "このアイデアを生み出したのは、M&C Saatchi Abelで働く人々でした。彼らが普段行っていた仕事は、衣類を扱うプロジェクトの運営とはかなり異なるものでした。通常は、企業や有名なブランドが自分たちをどのように世間に見せ、テレビ、印刷物、デジタルメディアなどを通して消費者にどのように情報を届けるかを考える手助けをしていました。彼らはこうした創造的な経験を生かし、寄付された衣類と、それを必要とする人々とを結びつける新しい方法を考え出しました。",
        "The Street Storeは、このアイデアを他の地域でも繰り返し実施できるように設計されています。開催に興味がある人は、オンラインで意思表示を行うことで、開催方法を説明した資料やその他の役立つ情報を入手できます。重要なのは、これらの資料を受け取ったからといって、必ず開催しなければならないわけではないということです。まず情報に目を通し、必要となる作業量を考えたうえで、そのプロジェクトを続けるかどうかを決めることができます。",
        "実際に開催する人には、地域の状況に合わせてイベントを工夫するかなりの自由があります。しかし、The Street Storeの名称や資料の使い方には制限があります。このプロジェクトでは、それらを主催者自身がお金を稼ぐための手段としてではなく、人々や地域社会のために使うことを求めています。主催者は、地域でStreet Storeを運営する際、この原則を守る責任があります。",
        "寄付される衣類の状態も重要です。目的は、状態のよい品物の中から、訪れた人が実際に選べるようにすることです。ひどく破れていたり、汚れていたり、傷んでいたりする衣類は適していません。また、別の人が着る前に修理したり、専門のクリーニング店で処置してもらったりする必要がある品物も同様です。靴についても、片方だけではなく、左右そろって使用できる状態でなければなりません。",
        "主催者は、イベントのすべてを自分たちだけで考える必要はありません。無料のHost Kitには、ポスター、手順を示したガイド、ボランティア向けの助言、イベント情報を広めるためのツールなどが含まれています。また、準備に必要な重要な作業を一覧にした用紙もあり、終わったものに一つずつ印を付けられるようになっています。こうした資料によって、これまでこのようなイベントを企画した経験がない人でも開催しやすくなっています。",
        "The Street Storeはその後、多くの地域で実施されるようになりました。寄付された衣類はこの取り組みの中心ですが、目的は単に物を配ることだけではありません。服を店の商品と同じように並べ、訪れた人自身が選べるようにすることで、支援を受けることを、より尊重され、自分らしさを保てる経験にしようとしているのです。"
      ],
      "summary": [
        "The Street Store began in Cape Town, South Africa, in 2014. The idea was developed by M&C Saatchi Abel, a company whose usual work mainly involved (a).",
        "The project later made it possible for people in many different places to organize their own Street Stores. Someone interested in becoming a host can first make a pledge and receive materials explaining how to prepare an event. After getting access to these materials, the person (b).",
        "Although local hosts are given considerable freedom, they must follow certain rules when using The Street Store name and materials. One important rule is that an event (c).",
        "The project also gives donors guidelines about the condition of clothing they bring. According to these guidelines, (d).",
        "People who want to organize an event are given a free Host Kit containing several resources to help with preparation. One of the materials provided is (e)."
      ],
      "summaryJa": [
        "The Street Storeは、2014年に南アフリカのケープタウンで始まりました。このアイデアを考案したのはM&C Saatchi Abelで、この会社が普段主に行っていた仕事は(a)でした。",
        "その後、このプロジェクトによって、さまざまな地域の人々が自分たちでStreet Storeを開催できるようになりました。主催者になることに興味がある人は、まず意思表示を行い、イベント準備の方法を説明した資料を受け取ることができます。これらの資料を利用できるようになった後、その人は(b)。",
        "地域の主催者にはかなりの自由が認められていますが、The Street Storeの名称や資料を使用する際には一定のルールを守らなければなりません。その重要なルールの一つとして、イベントは(c)。",
        "このプロジェクトでは、寄付する衣類の状態についてもガイドラインを示しています。そのガイドラインによると、(d)。",
        "イベントを開催したい人には、準備に役立つさまざまな資料が入った無料のHost Kitが提供されます。その中に含まれている資料の一つが(e)です。"
      ],
      "questions": [
        {
          "id": "a",
          "choices": [
            "designing temporary shops for retailers",
            "providing training for nonprofit organizations",
            "creating advertising campaigns for clients",
            "organizing public festivals and exhibitions"
          ],
          "choicesJa": [
            "小売業者のために一時的な店舗を設計すること",
            "非営利団体に研修を提供すること",
            "顧客のために広告キャンペーンを作ること",
            "一般向けの祭りや展示会を企画・運営すること"
          ],
          "answer": 3
        },
        {
          "id": "b",
          "choices": [
            "may review them before deciding whether to hold an event",
            "automatically becomes an official local partner",
            "must hold a Street Store within six months",
            "must choose an exact event date before continuing"
          ],
          "choicesJa": [
            "イベントを開催するかどうか決める前に、その資料を確認することができる",
            "自動的に正式な地域パートナーになる",
            "6か月以内にStreet Storeを開催しなければならない",
            "次へ進む前に具体的な開催日を決めなければならない"
          ],
          "answer": 1
        },
        {
          "id": "c",
          "choices": [
            "may charge an entrance fee if the money is used to cover event costs",
            "must refuse financial support from commercial businesses",
            "must be managed together with a registered nonprofit organization",
            "must not be used to create personal income for the organizer"
          ],
          "choicesJa": [
            "イベント費用をまかなうためであれば入場料を取ってもよい",
            "企業からの金銭的支援を断らなければならない",
            "登録された非営利団体と共同で運営しなければならない",
            "主催者個人の収入を生み出すために利用してはならない"
          ],
          "answer": 4
        },
        {
          "id": "d",
          "choices": [
            "minor repairs are acceptable if the item is otherwise clean",
            "items should be ready to use without repair or special cleaning",
            "damaged items may be included if they are clearly marked for repair",
            "items needing cleaning may be accepted if the host can arrange it"
          ],
          "choicesJa": [
            "それ以外の状態がきれいであれば、軽い修理が必要な品物でも受け入れられる",
            "品物は修理や特別なクリーニングをしなくても使用できる状態であるべきである",
            "修理が必要であることを明確に表示すれば、傷んだ品物も含めることができる",
            "主催者がクリーニングを手配できるのであれば、洗浄が必要な品物も受け入れられる"
          ],
          "answer": 2
        },
        {
          "id": "e",
          "choices": [
            "a timetable for assigning volunteers to different shifts",
            "a form for recording individual clothing donations",
            "a planning checklist for preparing the event",
            "a sample budget for expected event costs"
          ],
          "choicesJa": [
            "ボランティアを各時間帯に割り当てるための予定表",
            "個々の衣類の寄付を記録するための用紙",
            "イベント準備のためのチェックリスト",
            "予想されるイベント費用の予算例"
          ],
          "answer": 3
        }
      ]
    },
    {
      "id": "q7_set_006",
      "number": 6,
      "title": "Be My Eyes",
      "passageTitle": "Help Through a Smartphone",
      "passageTitleJa": "スマートフォンを通した支援",
      "passage": [
        "For a blind or low-vision person, a small everyday task can sometimes require information that is difficult to obtain without sight. A food package may need to be identified, the color of a shirt may be unclear, or an object that has fallen to the floor may be hard to locate. Be My Eyes was created to make it easier to get help with situations like these by connecting people through technology.",
        "The idea came from Hans Jørgen Wiberg, a Danish man who is visually impaired himself. While working with an organization for blind people, he learned about the different ways people solved everyday visual problems. One person told him that when he needed someone to look at something for him, he sometimes contacted members of his family on a video call and showed them what was in front of his phone. Wiberg began to wonder whether the same idea could work with a much larger network of people who were willing to help, rather than requiring users to depend only on people they already knew.",
        "The Be My Eyes app later made that idea possible. When a blind or low-vision user asks for help, the system first needs to find volunteers who are likely to be able to communicate with that person. The language selected by the user is important. The system also considers the local clock of the volunteers. A person is normally contacted only between eight in the morning and nine in the evening where that person is located. In this way, a request made at night in one country can still reach people in another part of the world who are more likely to be awake.",
        "The app is also designed to avoid making a user wait while a single volunteer decides whether to answer. Instead, an alert goes out to a group of suitable volunteers almost simultaneously. They do not all join the call. Whichever person opens and accepts the alert before the others is connected to the user. Those who are busy can simply ignore it, because another member of the group may respond.",
        "After the connection is made, the two people do not use their cameras in exactly the same way as people usually do in an ordinary face-to-face video chat. The volunteer's screen continuously shows whatever the blind or low-vision user's phone camera is pointing toward. The user, however, does not need to watch an image of the volunteer. Both people can talk and listen throughout the call. The volunteer can therefore describe an object, read printed information, or ask the user to move the phone slightly in order to get a clearer view.",
        "Be My Eyes also offers another form of assistance for problems involving particular products or services. The app includes a list of partner businesses and organizations. A user can choose one of these partners and make a call from inside the app. In this case, the person who answers is not a member of the general volunteer community. Instead, the call reaches someone working for the chosen partner who has knowledge of its products or services. This can be useful when a user needs more specialized information than an ordinary volunteer could reasonably be expected to provide.",
        "Technology used by Be My Eyes has continued to develop, but the original principle remains simple. A person who needs visual information does not always have to rely on someone nearby. By finding people who can communicate at the right time and by connecting them quickly, the service turns smartphones into a way for people in different places to help one another."
      ],
      "passageJa": [
        "視覚障害やロービジョンのある人にとって、日常のちょっとした作業でも、視覚がなければ得ることが難しい情報が必要になる場合があります。食品のパッケージが何の商品なのか確認したいこともあれば、シャツの色が分からないことや、床に落とした物を見つけるのが難しいこともあります。Be My Eyesは、テクノロジーを通して人と人とをつなぎ、このような状況でより簡単に助けを得られるようにするためにつくられました。",
        "このアイデアを考えたのは、自身も視覚障害のあるデンマーク人、Hans Jørgen Wibergです。視覚障害者のための団体で働いていたとき、彼は人々が日常生活での視覚的な問題をどのような方法で解決しているのかを知りました。ある人は、何かを見てもらう必要があるとき、家族にビデオ通話をかけ、スマートフォンの前にあるものを映して見てもらうことがあると話しました。Wibergは、利用者が知り合いだけに頼るのではなく、助けたいと思っているもっと大勢の人々とつながることができれば、同じ方法が使えるのではないかと考えるようになりました。",
        "その後、Be My Eyesのアプリによって、このアイデアが実現しました。視覚障害やロービジョンのある利用者が助けを求めると、システムはまず、その人とコミュニケーションを取ることができそうなボランティアを探す必要があります。利用者が選択した言語が重要な条件の一つです。また、システムはボランティアがいる場所の現地時刻も考慮します。通常、その人がいる場所で午前8時から午後9時までの間だけ連絡が届くようになっています。そのため、ある国では夜に出された依頼でも、世界の別の地域にいる、起きている可能性の高い人へ届けることができます。",
        "また、このアプリは、一人のボランティアが応答するかどうかを決める間、利用者を待たせることがないように設計されています。その代わり、条件に合った複数のボランティアに、ほぼ同時に通知が送られます。全員が通話に参加するわけではありません。他の人より先に通知を開いて応答した人が、利用者とつながります。忙しい人はその通知を無視しても構いません。グループの別の人が応答する可能性があるからです。",
        "接続された後も、二人は一般的な対面型のビデオ通話とまったく同じようにカメラを使うわけではありません。ボランティアの画面には、視覚障害やロービジョンのある利用者のスマートフォンのカメラが向いているものが、継続して映し出されます。一方、利用者はボランティアの映像を見る必要はありません。通話中は二人とも話したり聞いたりすることができます。そのため、ボランティアは物について説明したり、印刷された情報を読み上げたり、より見やすくするためにスマートフォンを少し動かすよう利用者に頼んだりできます。",
        "Be My Eyesには、特定の商品やサービスに関する問題について、別の方法で支援を受けられる仕組みもあります。アプリには、提携している企業や団体の一覧があります。利用者はその中から一つを選び、アプリ内から電話をかけることができます。この場合、応答する人は一般のボランティアではありません。選択した企業や団体で働き、その商品やサービスについて知識を持つ人につながります。一般のボランティアに期待するには専門的すぎる情報が必要な場合、この仕組みが役立ちます。",
        "Be My Eyesで使われる技術はその後も発展を続けていますが、基本となる考え方は変わっていません。視覚的な情報を必要とする人が、必ずしも近くにいる誰かに頼る必要はないということです。適切な時間にコミュニケーションを取れる人を見つけ、すばやくつなぐことで、このサービスはスマートフォンを、異なる場所にいる人同士が助け合うための手段にしています。"
      ],
      "summary": [
        "Be My Eyes was created to make it easier for blind and low-vision people to receive visual assistance through technology. One experience that helped inspire the original idea involved (a).",
        "Today, when a user asks to speak with a volunteer, the app uses certain information to decide who should receive the request. Volunteers are matched partly according to (b).",
        "The app also has a particular system for dealing with each new request. Normally, (c).",
        "Once a volunteer and a user are connected, the app has a particular arrangement for how information is exchanged during the call. In a standard call, (d).",
        "Be My Eyes also works with companies and organizations to provide another type of assistance. Through this service, a user can (e)."
      ],
      "summaryJa": [
        "Be My Eyesは、視覚障害やロービジョンのある人が、テクノロジーを通して視覚的な支援をより簡単に受けられるようにするためにつくられました。最初のアイデアが生まれるきっかけとなった経験の一つは、(a)ことでした。",
        "現在、利用者がボランティアとの通話を求めると、アプリは誰にその依頼を送るかを決めるために、いくつかの情報を利用します。ボランティアとのマッチングでは、(b)などが考慮されます。",
        "また、アプリには、新しい依頼を処理するための独自の仕組みがあります。通常、(c)。",
        "ボランティアと利用者が接続されると、通話中の情報のやり取りについても特定の仕組みがあります。通常の通話では、(d)。",
        "Be My Eyesは企業や団体とも協力し、別の種類の支援を提供しています。このサービスを利用すると、利用者は(e)ことができます。"
      ],
      "questions": [
        {
          "id": "a",
          "choices": [
            "a person using video calls with family members to get visual help",
            "a support group exchanging photographs to identify everyday objects",
            "a blind person using a navigation app to find unfamiliar places",
            "volunteers answering questions from blind people through email"
          ],
          "choicesJa": [
            "ある人が家族とのビデオ通話を利用して、視覚的な助けを得ること",
            "支援グループが日用品を特定するために写真を交換すること",
            "視覚障害のある人がナビゲーションアプリを使って知らない場所を探すこと",
            "ボランティアが電子メールを通して視覚障害のある人からの質問に答えること"
          ],
          "answer": 1
        },
        {
          "id": "b",
          "choices": [
            "the user's language and the volunteer's physical distance from the user",
            "the user's language and how long the volunteer has used the app",
            "the user's language and what time of day it is for the volunteer",
            "the user's language and the type of smartphone the volunteer uses"
          ],
          "choicesJa": [
            "利用者の言語と、利用者からボランティアまでの物理的な距離",
            "利用者の言語と、ボランティアがそのアプリを利用してきた期間",
            "利用者の言語と、ボランティアにとって現在どの時間帯であるか",
            "利用者の言語と、ボランティアが使用しているスマートフォンの種類"
          ],
          "answer": 3
        },
        {
          "id": "c",
          "choices": [
            "a request is sent to one suitable volunteer first, and another person is contacted if there is no answer",
            "a request is sent to several volunteers at once, and the first available person to answer is connected",
            "a request is sent to several volunteers, and the user chooses among those who respond",
            "a request is sent to several volunteers, and the app waits for multiple responses before selecting one"
          ],
          "choicesJa": [
            "まず条件に合う一人のボランティアに依頼が送られ、応答がなければ別の人に連絡される",
            "複数のボランティアに同時に依頼が送られ、最初に応答できた人が接続される",
            "複数のボランティアに依頼が送られ、応答した人の中から利用者が相手を選ぶ",
            "複数のボランティアに依頼が送られ、アプリが複数の応答を待ってから一人を選ぶ"
          ],
          "answer": 2
        },
        {
          "id": "d",
          "choices": [
            "the volunteer receives a live view from the user's camera while the user receives replies as written messages",
            "the volunteer receives images taken from the user's camera one at a time while both people communicate by voice",
            "the volunteer and the user receive live video of each other while both people communicate by voice",
            "the volunteer receives a live view from the user's camera while both people communicate by voice"
          ],
          "choicesJa": [
            "ボランティアは利用者のカメラからのリアルタイム映像を受け取り、利用者は文字で返答を受け取る",
            "ボランティアは利用者のカメラで撮影された画像を一枚ずつ受け取り、二人は音声でやり取りする",
            "ボランティアと利用者がお互いのリアルタイム映像を見ながら、音声でやり取りする",
            "ボランティアは利用者のカメラからのリアルタイム映像を見ながら、二人は音声でやり取りする"
          ],
          "answer": 4
        },
        {
          "id": "e",
          "choices": [
            "connect directly with support staff from a selected company or organization",
            "connect with volunteers who have been approved by a selected company",
            "send a question to a selected organization and receive a reply later",
            "join a call in which representatives from several organizations provide support together"
          ],
          "choicesJa": [
            "選択した企業や団体のサポート担当者と直接つながる",
            "選択した企業から認定されたボランティアとつながる",
            "選択した団体に質問を送り、後から回答を受け取る",
            "複数の団体の担当者が一緒に支援を行う通話に参加する"
          ],
          "answer": 1
        }
      ]
    },
    {
      "id": "q7_set_007",
      "number": 7,
      "title": "Too Good To Go",
      "passageTitle": "Saving Food Through Surprise Bags",
      "passageTitleJa": "サプライズバッグで食品を救う",
      "passage": [
        "Every day, stores and restaurants have to estimate how much food their customers will buy. These estimates are not always exact, and perfectly good food may remain unsold. Too Good To Go uses an app to connect businesses that have such food with people who are willing to collect it. Participating stores offer Surprise Bags whose exact contents may not be known to the customer in advance.",
        "Because the amount of food left over can change from day to day, stores sometimes need to cancel reservations. However, customers may arrange their schedules around the stated collection period, so businesses are expected to avoid cancelling too close to that time. In ordinary circumstances, once fewer than 120 minutes remain before the collection period begins, a store should no longer cancel simply as a normal part of its operation. Later cancellations may still happen in exceptional situations, but they should not become common.",
        "When a Surprise Bag is ready, the customer goes to the store during the period shown in the app. The collection process does not normally require the customer to photograph a store code or type in a number provided by an employee. Instead, the customer opens the reservation on the phone and shows it to the staff. The customer then moves the confirmation control across the screen while at the store. This demonstrates that the reservation is being used, and the staff can hand over the bag.",
        "Plans can change after a reservation has been made. A customer may become busy, have trouble reaching the store, or simply find that another person is in a better position to go. Too Good To Go therefore provides a feature that lets the original customer send the necessary collection details to someone else. That person can then go to the store and pick up the reserved Surprise Bag in place of the customer who made the reservation.",
        "Stores also have responsibilities when they list Surprise Bags. One rule concerns the value promised to customers. Since the exact combination of items may vary, a business does not have to know in advance precisely which products will go into every bag. However, when the normal selling prices of the items inside are added together, the total cannot fall below the value the store has promised in its listing. This helps ensure that the changing contents of a Surprise Bag do not reduce the value that customers were told to expect.",
        "The app is used not only to reserve a bag but also to handle payment. Even so, the service's rules make a distinction between making a reservation and completing the actual sale. A reservation gives the customer the right to come to the specified place and collect the bag, but it is not itself treated as the completed purchase. The transaction reaches its final stage when the customer arrives, the reservation is confirmed, the contents are accepted, and the Surprise Bag is taken away.",
        "Too Good To Go therefore has to manage more than simply matching unsold food with customers. Its rules cover what happens before collection, what customers do at the store, what happens when plans change, and what businesses must provide. Together, these systems allow food that might otherwise be wasted to reach people in a way that is predictable for both stores and customers."
      ],
      "passageJa": [
        "毎日、店舗やレストランは、客がどれくらいの食品を購入するかを予測しなければなりません。しかし、その予測がいつも正確であるとは限らず、まだ十分に食べられる食品が売れ残ることがあります。Too Good To Goはアプリを利用して、そのような食品を持つ店と、それを受け取りたい人とをつないでいます。参加店舗はSurprise Bagを提供しますが、その中に実際に何が入るのかを、客が事前に正確に知ることができない場合もあります。",
        "売れ残る食品の量は日によって変わるため、店舗が予約をキャンセルしなければならない場合もあります。しかし、客は示された受取時間に合わせて予定を組むことがあるため、店舗には、その時間の直前になってキャンセルすることを避けることが求められています。通常の場合、受取時間の開始まで120分を切ったら、店舗は通常の業務の一部として予約をキャンセルするべきではありません。例外的な事情があれば、それより後にキャンセルされることもありますが、それが日常的に行われるべきではありません。",
        "Surprise Bagの準備ができると、客はアプリに表示された時間帯に店舗へ行きます。受取時には通常、店舗に表示されたコードをスマートフォンで撮影したり、店員から伝えられた番号を入力したりする必要はありません。その代わり、客はスマートフォンで予約画面を開いて店員に見せます。そして店舗にいる間に、画面上の確認部分を横に動かします。これによって、その予約が実際に使用されたことが確認され、店員はバッグを渡すことができます。",
        "予約をした後に予定が変わることもあります。客が忙しくなったり、店舗へ行くのが難しくなったり、別の人の方が受け取りに行きやすくなったりすることがあります。そのためToo Good To Goには、予約した本人が必要な受取情報を別の人に送ることのできる機能があります。その人は予約者本人の代わりに店舗へ行き、予約されたSurprise Bagを受け取ることができます。",
        "店舗側にも、Surprise Bagを掲載する際に守るべきルールがあります。その一つが、客に示す価値に関するものです。バッグに入る商品の組み合わせは変わる可能性があるため、店舗は各バッグに具体的にどの商品を入れるのかを事前に正確に決めておく必要はありません。しかし、中に入っている商品の通常販売価格を合計した金額は、店舗が掲載時に約束した価値を下回ってはいけません。これにより、Surprise Bagの内容が変化しても、客に示された価値が損なわれないようになっています。",
        "アプリはバッグを予約するためだけでなく、支払いにも利用されます。それでも、このサービスのルールでは、予約することと実際の売買が完了することは区別されています。予約によって、客は指定された場所へ行き、バッグを受け取る権利を得ますが、予約そのものが購入の完了とみなされるわけではありません。客が店舗へ行き、予約が確認され、中身を受け入れ、Surprise Bagを受け取って持ち帰ることで、取引は最終段階に達します。",
        "したがってToo Good To Goは、単に売れ残った食品と客を結びつけるだけではありません。そのルールは、受取前に起こること、店舗で客が行うこと、予定が変わった場合の対応、そして店舗が提供しなければならないものまで扱っています。こうした仕組みによって、本来なら廃棄されるかもしれない食品を、店舗と客の双方にとって予測しやすい形で人々に届けることができるのです。"
      ],
      "summary": [
        "Too Good To Go is a service designed to reduce food waste by connecting people with stores that offer Surprise Bags through its app. Participating stores can cancel reservations in the app, but they are normally asked to avoid doing so once the collection period is less than (a) away.",
        "When a Surprise Bag is available, users must collect it from the store during the specified time period. At the store, one step used to confirm the reservation is that the user (b).",
        "The app also provides an option for situations in which the person who made the reservation cannot follow the original collection plan. Using this feature, the user can (c).",
        "Participating businesses must follow certain rules when offering Surprise Bags through the Marketplace. One of these rules concerns the original retail value of the food placed in each bag. According to this rule, (d).",
        "The service also makes a distinction between reserving a Surprise Bag and actually purchasing it. Under the rules of the service, the purchase is completed (e)."
      ],
      "summaryJa": [
        "Too Good To Goは、アプリを通してSurprise Bagを提供する店舗と人々をつなぎ、食品ロスを減らすことを目的としたサービスです。参加店舗はアプリ上で予約をキャンセルすることができますが、通常、受取時間まで(a)を切った後はキャンセルを避けるよう求められています。",
        "Surprise Bagが用意されると、利用者は指定された時間帯に店舗で受け取らなければなりません。店舗では、予約を確認するための手順の一つとして、利用者は(b)。",
        "また、予約した本人が当初の受取予定どおりに行動できなくなった場合に利用できる機能もあります。この機能を使うと、利用者は(c)ことができます。",
        "参加店舗は、Marketplaceを通してSurprise Bagを提供する際に、一定のルールを守らなければなりません。その一つは、それぞれのバッグに入っている食品の本来の小売価値に関するものです。このルールによると、(d)。",
        "また、このサービスでは、Surprise Bagを予約することと、実際に購入することを区別しています。サービスのルールでは、購入が完了するのは(e)。"
      ],
      "questions": [
        {
          "id": "a",
          "choices": [
            "one hour",
            "two hours",
            "fifteen minutes",
            "thirty minutes"
          ],
          "choicesJa": [
            "1時間",
            "2時間",
            "15分",
            "30分"
          ],
          "answer": 2
        },
        {
          "id": "b",
          "choices": [
            "scans a code displayed by the store using the phone's camera",
            "sends a collection request to the store through the app",
            "enters a collection number given by a member of staff",
            "shows the reservation in the app and swipes the confirmation on the screen"
          ],
          "choicesJa": [
            "店舗に表示されたコードをスマートフォンのカメラで読み取る",
            "アプリを通して店舗に受取依頼を送る",
            "店員から伝えられた受取番号を入力する",
            "アプリ上の予約を見せ、画面上の確認部分をスワイプする"
          ],
          "answer": 4
        },
        {
          "id": "c",
          "choices": [
            "ask another person to collect the Surprise Bag on their behalf",
            "move the reservation to another nearby participating store",
            "change the collection to a later date without making a new reservation",
            "convert the reservation into a home delivery"
          ],
          "choicesJa": [
            "別の人に自分の代わりにSurprise Bagを受け取ってもらう",
            "予約を近くの別の参加店舗へ移す",
            "新しく予約を取り直さずに受取日を後日に変更する",
            "予約を自宅への配送に変更する"
          ],
          "answer": 1
        },
        {
          "id": "d",
          "choices": [
            "the exact retail value of the contents must be known before the bag is listed",
            "the original retail value must be the same for every bag offered by the store that day",
            "the original retail value of the contents must reach at least the minimum value shown for the bag",
            "the retail value must be based on the lowest price at which the items were sold that day"
          ],
          "choicesJa": [
            "バッグを掲載する前に、中身の正確な小売価値が分かっていなければならない",
            "その日に店舗が提供するすべてのバッグの本来の小売価値は同じでなければならない",
            "中身の本来の小売価値は、バッグに示された最低価値以上でなければならない",
            "小売価値は、その日に各商品が販売された最も安い価格を基準にしなければならない"
          ],
          "answer": 3
        },
        {
          "id": "e",
          "choices": [
            "when the reservation confirmation first appears in the app",
            "when the store finishes preparing the food for collection",
            "when the store accepts the reservation through its system",
            "when the user completes the collection of the Surprise Bag at the store"
          ],
          "choicesJa": [
            "予約確認が初めてアプリ上に表示されたとき",
            "店舗が受取用の食品の準備を終えたとき",
            "店舗がシステム上で予約を受け付けたとき",
            "利用者が店舗でSurprise Bagの受取を完了したとき"
          ],
          "answer": 4
        }
      ]
    },
    {
      "id": "q7_set_008",
      "number": 8,
      "title": "Zooniverse",
      "passageTitle": "Research Powered by Volunteers",
      "passageTitleJa": "ボランティアの力で進める研究",
      "passage": [
        "Scientific research often produces more information than a small team can examine on its own. Photographs of distant planets, images of animals in the wild, and records written many years ago may all contain useful information. However, identifying important details in these materials can require a great deal of time. Zooniverse is an online platform that allows people around the world to help researchers with this work.",
        "People who want to participate can choose from projects in many different fields. Some volunteers identify animals in photographs, while others examine patterns in scientific data or help researchers read old documents. Participants do not need special qualifications, and the amount of work they do is entirely up to them. Someone may examine just one picture during a short break, while another person may spend several hours working on a project. Neither is expected to reach a particular amount of working time before their contribution is accepted.",
        "Although volunteers may work independently, researchers often arrange for the same material to be examined by several people. One example is Planet Four: Terrains, a project involving photographs of the southern polar region of Mars. Participants look for unusual features in the planet's surface, some of which are connected with changes in ice during the Martian spring. For each photograph, the project collects observations from ten people and then obtains the same number of additional independent assessments. The research team combines these observations to identify areas that may be worth examining more closely.",
        "Zooniverse also has a particular system for handling answers once they have been sent. While examining an item, a volunteer may reconsider a choice and make adjustments before finishing. However, pressing the final submission button sends the information into the platform's database. At that point, the response becomes a permanent record of what the volunteer reported. Even if the person notices an error immediately afterward, the system does not provide a way to reopen that completed response and alter it. Because many projects use observations from several people, one accidental mistake does not necessarily prevent researchers from reaching a useful conclusion.",
        "Volunteers can also help improve projects that are still being prepared. Some people become beta testers and examine activities before those activities are opened to the wider public. They try the instructions, complete examples of the work, and consider whether anything is confusing or difficult to use. Rather than discussing every problem in a live meeting or writing separate messages to the project leader, they record their reactions by answering a brief series of questions in an online form. The research team can then use this information to improve the project before its official launch.",
        "Researchers who want to create their own projects can use Zooniverse's Project Builder, which provides tools for uploading information and designing activities for volunteers. However, building a working project is not the same as having it included in Zooniverse's official collection. Researchers must first ask the platform to examine their project.",
        "This request is made inside the Project Builder itself. After preparing the necessary materials, researchers open the section used to control who can see their project. In that area, they can open a request form, enter the necessary information, and send the project to the Zooniverse team for examination. The team checks the project, and it may then be tested by volunteers before being accepted for an official public launch.",
        "Zooniverse therefore provides more than a collection of online tasks. It creates a way for ordinary people to contribute to real research, while systems for collecting observations, handling submitted answers, and examining new projects help researchers make use of that contribution."
      ],
      "passageJa": [
        "科学研究では、少人数の研究チームだけでは調べきれないほど大量の情報が生み出されることがよくあります。遠く離れた惑星の写真、野生動物の画像、何年も前に書かれた記録などには、いずれも役立つ情報が含まれている可能性があります。しかし、こうした資料の中から重要な特徴を見つけ出すには、非常に多くの時間が必要になる場合があります。Zooniverseは、世界中の人々が研究者によるこのような作業を手伝うことができるオンラインプラットフォームです。",
        "参加したい人は、さまざまな分野のプロジェクトから好きなものを選べます。写真に写っている動物を特定するボランティアもいれば、科学データのパターンを調べたり、古い文書を読む研究者を手伝ったりする人もいます。参加者に特別な資格は必要なく、どれだけ作業するかも完全に本人に任されています。短い休憩時間に写真を1枚だけ調べる人もいれば、数時間を費やしてプロジェクトに取り組む人もいます。どちらの場合も、その貢献が受け入れられるために、一定の作業時間に達することを求められるわけではありません。",
        "ボランティアはそれぞれ独立して作業することがありますが、研究者は同じ資料を複数の人が調べるようにすることもよくあります。その一例が、火星の南極地域の写真を扱う「Planet Four: Terrains」というプロジェクトです。参加者は火星の地表に見られる珍しい特徴を探します。その中には、火星の春に起こる氷の変化と関係しているものもあります。このプロジェクトでは、写真1枚についてまず10人から観察結果を集め、さらにそれと同じ数の人による独立した評価を集めます。研究チームはこれらの観察結果を組み合わせ、さらに詳しく調べる価値がありそうな場所を特定します。",
        "Zooniverseには、いったん送信された回答を扱うための独自の仕組みもあります。ある項目を調べている途中であれば、ボランティアは自分の選択を考え直し、作業を終える前に修正できます。しかし、最終的な送信ボタンを押すと、その情報はプラットフォームのデータベースへ送られます。その時点で、回答はボランティアが報告した内容の恒久的な記録になります。直後に間違いに気づいたとしても、完了した回答を再び開いて変更する方法は用意されていません。多くのプロジェクトでは複数の人の観察結果を利用するため、一度の偶然の間違いによって、研究者が有用な結論を得られなくなるとは限りません。",
        "ボランティアは、まだ準備段階にあるプロジェクトの改善にも協力できます。beta testerになる人々は、活動が一般公開される前にその内容を試します。説明を確認し、実際の作業例に取り組み、分かりにくい点や使いにくい点がないかを考えます。すべての問題点についてオンライン会議で話し合ったり、プロジェクト責任者に個別のメッセージを書いたりするのではなく、オンラインフォームに用意された短い一連の質問に答えることで、感じたことを記録します。研究チームはその情報を使って、正式公開前にプロジェクトを改善できます。",
        "自分たちのプロジェクトを作成したい研究者は、ZooniverseのProject Builderを利用できます。これは、情報をアップロードしたり、ボランティア向けの活動を設計したりするためのツールです。しかし、動作するプロジェクトを作り終えることと、それがZooniverseの公式プロジェクト一覧に掲載されることは同じではありません。研究者はまず、プラットフォーム側にプロジェクトの審査を依頼しなければなりません。",
        "この申請はProject Builderの内部で行います。必要な資料を準備した後、研究者は誰が自分たちのプロジェクトを閲覧できるかを管理する項目を開きます。そこから申請フォームを開き、必要な情報を入力して、審査を受けるためにプロジェクトをZooniverseのチームへ送ることができます。チームがプロジェクトを確認し、その後、正式な一般公開が認められる前にボランティアによるテストが行われることもあります。",
        "このようにZooniverseは、単にオンライン上の作業を集めたものではありません。一般の人々が実際の研究に貢献できる仕組みをつくるとともに、観察結果の収集、提出された回答の管理、新しいプロジェクトの審査などの仕組みを通じて、研究者がその貢献を活用できるようにしています。"
      ],
      "summary": [
        "Zooniverse is an online platform where volunteers help researchers examine information collected for scientific and other academic projects. Participants may be asked to identify objects in photographs, examine graphs, or work with historical records.",
        "People who are interested in volunteering can choose from a variety of projects. The platform has a particular policy about how much time participants must spend on these activities. Under this policy, (a).",
        "For many research projects, a single image, video, or graph is examined by more than one volunteer. In one project involving photographs of the surface of Mars, each image is examined by (b) before the research team uses the volunteers' observations.",
        "The platform also has rules about what happens after a volunteer submits an answer for a particular item. If the volunteer later notices a mistake, (c).",
        "In addition to ordinary volunteers, Zooniverse has people called beta testers. These volunteers take part in a special process involving projects that have not yet been made available to the general public. After trying the activities in these projects, beta testers (d).",
        "Researchers who develop new projects can use Zooniverse's online tools to prepare them. However, completing the technical setup does not automatically mean that a project will appear on the platform's public Projects page. To begin the process of being considered for official listing, researchers (e)."
      ],
      "summaryJa": [
        "Zooniverseは、科学やその他の学術プロジェクトのために集められた情報を研究者が調べる際、ボランティアが協力できるオンラインプラットフォームです。参加者は、写真の中の物体を特定したり、グラフを調べたり、歴史的な記録を扱ったりすることがあります。",
        "ボランティア活動に興味がある人は、さまざまなプロジェクトから選ぶことができます。このプラットフォームには、参加者が活動にどれだけの時間を費やさなければならないかについて、独自の方針があります。その方針では、(a)。",
        "多くの研究プロジェクトでは、1枚の画像、動画、グラフなどを複数のボランティアが調べます。火星の表面の写真を扱うあるプロジェクトでは、研究チームがボランティアの観察結果を利用する前に、それぞれの画像を(b)が調べます。",
        "また、このプラットフォームには、ボランティアが特定の項目について回答を提出した後の扱いに関するルールもあります。提出後に間違いに気づいた場合、(c)。",
        "通常のボランティアに加えて、Zooniverseにはbeta testerと呼ばれる人々もいます。彼らは、まだ一般公開されていないプロジェクトに関する特別な過程に参加します。そうしたプロジェクトの活動を試した後、beta testerは(d)。",
        "新しいプロジェクトを開発する研究者は、Zooniverseのオンラインツールを使って準備を進めることができます。しかし、技術的な設定を完了しただけで、プロジェクトがプラットフォームの一般公開用Projectsページに自動的に掲載されるわけではありません。公式掲載に向けた審査過程を始めるために、研究者は(e)。"
      ],
      "questions": [
        {
          "id": "a",
          "choices": [
            "volunteers must spend at least ten minutes on each visit to a project",
            "volunteers must complete two hours of work before leaving a project",
            "volunteers must work for at least thirty minutes during each week of participation",
            "volunteers are not required to contribute a minimum amount of time"
          ],
          "choicesJa": [
            "ボランティアはプロジェクトを訪れるたびに、最低10分間活動しなければならない",
            "ボランティアはプロジェクトを離れる前に、2時間の活動を終えなければならない",
            "ボランティアは参加している各週に、最低30分間活動しなければならない",
            "ボランティアには最低活動時間が求められていない"
          ],
          "answer": 4
        },
        {
          "id": "b",
          "choices": [
            "twenty volunteers",
            "thirty volunteers",
            "ten volunteers",
            "fifteen volunteers"
          ],
          "choicesJa": [
            "20人のボランティア",
            "30人のボランティア",
            "10人のボランティア",
            "15人のボランティア"
          ],
          "answer": 1
        },
        {
          "id": "c",
          "choices": [
            "the volunteer can submit a corrected answer if the item has not yet been fully reviewed",
            "the volunteer can replace the original answer within twenty-four hours",
            "the volunteer cannot return to change the answer that was already submitted",
            "the volunteer can change the answer after receiving approval from the research team"
          ],
          "choicesJa": [
            "その項目の確認がまだ完全に終わっていなければ、修正した回答を提出できる",
            "24時間以内であれば、最初の回答を別の回答に変更できる",
            "すでに提出した回答に戻って変更することはできない",
            "研究チームの承認を得た後であれば、回答を変更できる"
          ],
          "answer": 3
        },
        {
          "id": "d",
          "choices": [
            "send their comments directly to the project leader by email",
            "send their comments through a short questionnaire",
            "post their comments on the project's public discussion board",
            "explain their comments in an online meeting with the research team"
          ],
          "choicesJa": [
            "プロジェクト責任者に電子メールで直接意見を送る",
            "短いアンケートを通して意見を送る",
            "プロジェクトの公開ディスカッション掲示板に意見を投稿する",
            "研究チームとのオンライン会議で意見を説明する"
          ],
          "answer": 2
        },
        {
          "id": "e",
          "choices": [
            "post a request on the project's Talk discussion board",
            "submit a written request to the Zooniverse team by email",
            "ask registered volunteers to recommend the project for official listing",
            "send a request to the platform through a form in the Project Builder's Visibility section"
          ],
          "choicesJa": [
            "プロジェクトのTalkディスカッション掲示板に申請を投稿する",
            "Zooniverseのチームに電子メールで申請書を送る",
            "登録ボランティアに、プロジェクトを公式掲載するよう推薦してもらう",
            "Project BuilderのVisibility欄にあるフォームを通して、プラットフォームに申請を送る"
          ],
          "answer": 4
        }
      ]
    },
    {
      "id": "q7_set_009",
      "number": 9,
      "title": "The Ocean Cleanup",
      "passageTitle": "Stopping Plastic Before It Reaches the Ocean",
      "passageTitleJa": "プラスチックが海に到達する前に食い止める",
      "passage": [
        "Plastic waste in rivers is a serious problem because much of it eventually reaches the sea. Removing plastic after it has spread across the ocean can be difficult and expensive. The Ocean Cleanup, an organization working to reduce plastic pollution, has therefore developed machines that collect waste while it is still moving through rivers. One of these machines is called the Interceptor Original.",
        "The Interceptor Original is designed to work with the natural movement of river water. A floating barrier guides plastic and other waste toward an opening in the machine. The current then carries the material onto a moving belt, which lifts it out of the water. From there, the collected waste is transferred to a separate section where it can be stored. This section holds three pairs of large containers, arranged so that the machine can collect a considerable amount of material before workers need to remove it.",
        "Simply placing the waste into the nearest available container would create problems. Some containers might fill quickly while others still had plenty of space. To avoid this, the Interceptor Original uses information from electronic devices that measure how much material has collected in different parts of the storage area. A moving mechanism then changes where the incoming waste is delivered. By adjusting the destination of the material as the containers fill, the system prevents some containers from reaching their limits much sooner than others.",
        "The machine is powered by energy collected from sunlight, allowing much of the process to continue without workers being present throughout the day. However, the collected waste still needs to be removed regularly. Electronic equipment keeps track of how much space remains in the storage area. When the containers are approaching their limit, the machine automatically sends a short message through the mobile phone network to the people who manage waste collection in the area. The message appears on their phones, allowing them to arrange a visit without checking the machine in person.",
        "Removing the waste involves a particular part of the machine. The containers are not fixed permanently to the main structure. Instead, they sit on a separate floating platform that can be detached. When it is time to empty them, local workers release this platform and guide it toward the side of the river. There, the collected material can be unloaded and sent to a nearby waste-management facility. Once the containers have been emptied, the floating platform is returned to its position inside the Interceptor Original.",
        "The machine also has a large storage capacity. This is important because river conditions can change quickly, and a considerable amount of plastic may arrive during a short period. To understand the maximum volume the machine can hold, imagine an empty rectangular space five meters long and five meters wide, with a height of two meters. The Interceptor Original can store an equivalent volume of collected material before its containers need to be emptied. These measurements are only a comparison to illustrate the amount of space available; they do not describe the actual shape or dimensions of the machine's containers.",
        "The Interceptor Original demonstrates how technology can reduce the amount of plastic entering the ocean. Its use of river currents, automatic equipment, and cooperation with local workers allows waste to be collected before it travels farther downstream. Although conditions differ from one river to another, the basic aim remains the same: to stop plastic from reaching the sea in the first place."
      ],
      "passageJa": [
        "川を流れるプラスチックごみは、その多くが最終的に海へ到達するため、深刻な問題となっています。プラスチックが海全体に広がってしまってから回収することは、困難で費用もかかります。そのため、プラスチック汚染の削減に取り組む団体The Ocean Cleanupは、ごみがまだ川を流れている段階で回収する機械を開発しました。その一つがInterceptor Originalです。",
        "Interceptor Originalは、川の自然な水の流れを利用するように設計されています。水面に浮かぶ障壁が、プラスチックやその他のごみを機械の入口へと誘導します。その後、川の流れによってごみが動くベルトへと運ばれ、ベルトによって水中から引き上げられます。回収されたごみは、そこから保管用の別の部分へ移されます。この部分には、大きな容器が2個ずつ3組設置されており、作業員がごみを取り除くまでに、かなりの量を集めることができます。",
        "ごみを単に最も近くにある使用可能な容器へ入れるだけでは、問題が生じます。ある容器はすぐにいっぱいになる一方、別の容器にはまだ十分な空きが残るかもしれません。これを防ぐため、Interceptor Originalは、保管部分の各場所にどれだけのごみがたまっているかを測定する電子機器からの情報を利用します。そして、動く仕組みによって、新しく入ってくるごみの送り先を変更します。容器が満たされていく状況に応じてごみの送り先を調整することで、一部の容器だけが他の容器よりずっと早く限界に達することを防ぎます。",
        "この機械は太陽光から得られたエネルギーで動くため、作業員が一日中その場にいなくても、作業の大部分を続けることができます。しかし、回収したごみは定期的に取り除かなければなりません。電子機器が保管部分にどれだけの空きが残っているかを監視しています。容器が容量の限界に近づくと、機械はその地域でごみの回収を担当する人々に、携帯電話の通信網を通じて短いメッセージを自動的に送信します。メッセージは担当者の携帯電話に表示されるため、担当者は機械を直接確認しなくても回収作業を手配できます。",
        "ごみを取り除く作業には、機械の特定の部分が関わります。容器は機械の本体に永久に固定されているわけではありません。代わりに、取り外すことのできる、水面に浮かぶ別の台の上に置かれています。容器を空にするとき、現地の作業員はこの台を本体から外し、川岸へと移動させます。そこで回収されたごみを降ろし、近くの廃棄物処理施設へ送ることができます。容器を空にした後、浮かぶ台はInterceptor Originalの元の位置へ戻されます。",
        "この機械には、大きな保管容量もあります。川の状況は急速に変化することがあり、短時間に大量のプラスチックが流れ込む可能性があるため、これは重要です。機械が保管できる最大の体積を理解するために、長さ5メートル、幅5メートル、高さ2メートルの空の直方体の空間を想像してください。Interceptor Originalは、容器を空にする必要が生じるまでに、それと同じ体積の回収物を保管できます。これらの寸法は保管できる空間の大きさを説明するための比較にすぎず、実際の容器の形状や寸法を示しているわけではありません。",
        "Interceptor Originalは、技術によって海へ流れ込むプラスチックの量を減らせることを示しています。川の流れ、自動化された機器、そして現地の作業員との協力を利用することで、ごみがさらに下流へ流れていく前に回収できます。川によって条件は異なりますが、基本的な目的は変わりません。それは、プラスチックがそもそも海に到達しないようにすることです。"
      ],
      "summary": [
        "The Ocean Cleanup is an organization working to reduce plastic pollution in the world's oceans. One of its approaches is to prevent waste carried by rivers from reaching the sea. For this purpose, it has developed a machine called the Interceptor Original.",
        "The Interceptor Original uses the movement of river water to guide floating waste into the machine. The waste is then lifted out of the water and placed in containers. Each Interceptor Original has (a) for storing the collected material.",
        "The machine also has an automatic system for controlling how waste is placed in these containers. Sensors provide information that helps the system (b).",
        "Although the Interceptor Original can operate without workers constantly being present, local operators still have an important role. When the machine is nearly full, its automatic system (c).",
        "The collected waste must eventually be removed from the machine. The Interceptor Original has a particular method for allowing local operators to do this. As part of the process, the operators (d).",
        "The amount of waste that can be stored is also important because it affects how frequently local operators need to remove the collected material. According to the machine's specifications, an Interceptor Original can hold up to (e) before it needs to be emptied."
      ],
      "summaryJa": [
        "The Ocean Cleanupは、世界の海におけるプラスチック汚染の削減に取り組む団体です。その取り組みの一つは、川によって運ばれるごみが海へ到達するのを防ぐことです。この目的のために、Interceptor Originalという機械を開発しました。",
        "Interceptor Originalは、川の水の流れを利用して、水面に浮かぶごみを機械の中へ誘導します。その後、ごみは水中から引き上げられ、容器に入れられます。各Interceptor Originalには、回収された物を保管するための(a)があります。",
        "また、この機械には、ごみを各容器へどのように入れるかを制御する自動システムがあります。センサーが情報を提供し、その情報によってシステムは(b)ことができます。",
        "Interceptor Originalは、作業員が常にその場にいなくても稼働できますが、現地の担当者にも重要な役割があります。機械がほぼ満杯になると、自動システムが(c)。",
        "回収されたごみは、最終的に機械から取り除く必要があります。Interceptor Originalには、現地の担当者がそれを行うための独自の方法があります。その作業の一環として、担当者は(d)。",
        "保管できるごみの量も重要です。これは、現地の担当者が回収物をどれくらいの頻度で取り除かなければならないかに影響するためです。機械の仕様によると、Interceptor Originalは空にする必要が生じるまでに、最大(e)を保管できます。"
      ],
      "questions": [
        {
          "id": "a",
          "choices": [
            "eight containers",
            "ten containers",
            "six containers",
            "four containers"
          ],
          "choicesJa": [
            "8個の容器",
            "10個の容器",
            "6個の容器",
            "4個の容器"
          ],
          "answer": 3
        },
        {
          "id": "b",
          "choices": [
            "identify which kinds of waste should be sent to different containers",
            "decide which containers should receive waste so that they fill at similar rates",
            "calculate how much waste each container is expected to collect during the following day",
            "determine when a container should be emptied before its available space is used up"
          ],
          "choicesJa": [
            "ごみの種類を判別し、それぞれどの容器へ送るべきかを決める",
            "各容器がほぼ同じペースで満たされるように、ごみを送る容器を決める",
            "翌日に各容器が回収すると予想されるごみの量を計算する",
            "容器の空き容量がなくなる前に、いつ空にするべきかを判断する"
          ],
          "answer": 2
        },
        {
          "id": "c",
          "choices": [
            "displays a warning on a screen regularly checked by local operators",
            "places an automated telephone call to local operators with a collection request",
            "sends an email to local operators asking them to arrange collection",
            "sends a text message directly to local operators responsible for waste collection"
          ],
          "choicesJa": [
            "現地の担当者が定期的に確認する画面上に警告を表示する",
            "回収を依頼するため、現地の担当者へ自動音声通話をかける",
            "現地の担当者に、回収の手配を求める電子メールを送る",
            "ごみの回収を担当する現地の担当者へ、直接テキストメッセージを送る"
          ],
          "answer": 4
        },
        {
          "id": "d",
          "choices": [
            "separate the floating section holding the containers and bring it to the riverbank",
            "replace the full containers with empty ones without moving the section that holds them",
            "move the entire Interceptor Original to the riverbank before unloading the waste",
            "transfer the waste directly from the containers to a truck while the machine remains in place"
          ],
          "choicesJa": [
            "容器を載せた水面に浮かぶ部分を本体から切り離し、川岸へ移動させる",
            "容器を載せている部分は動かさず、満杯の容器だけを空の容器と交換する",
            "ごみを降ろす前に、Interceptor Original全体を川岸へ移動させる",
            "機械をその場に固定したまま、容器からトラックへ直接ごみを移す"
          ],
          "answer": 1
        },
        {
          "id": "e",
          "choices": [
            "40 cubic meters",
            "60 cubic meters",
            "50 cubic meters",
            "30 cubic meters"
          ],
          "choicesJa": [
            "40立方メートル",
            "60立方メートル",
            "50立方メートル",
            "30立方メートル"
          ],
          "answer": 3
        }
      ]
    },
    {
      "id": "q7_set_010",
      "number": 10,
      "title": "Geocaching",
      "passageTitle": "Geocaching: A Treasure Hunt with Rules",
      "passageTitleJa": "ジオキャッシング：ルールのある宝探し",
      "passage": [
        "A walk through a park or a forest can become an adventure when there is something hidden to find. Geocaching is an outdoor activity that uses GPS technology to turn ordinary places into locations for treasure hunts. Participants use smartphones or GPS devices to search for hidden containers, known as geocaches. After finding one, they usually write their names in a small record book inside and put the container back where they found it.",
        "Some geocaches contain small objects that visitors can exchange. There is also a different kind of object called a Trackable. Unlike an ordinary toy or other exchange item, a Trackable is not meant to become the property of the person who finds it. Instead, it is intended to move from one geocache to another. Some have particular destinations or goals chosen by their owners. Participants who carry these objects are expected to help them continue their journeys. For this reason, Geocaching advises people not to take one unless they expect to be geocaching again within roughly fourteen to twenty-one days. Someone who will not be able to visit another location for a long time should leave the object for another participant.",
        "People can enjoy Geocaching not only by finding containers but also by creating new ones. However, hiding a geocache requires careful planning. The location must be suitable, and permission may be necessary from the person or organization responsible for the land. There is also a rule intended to prevent different geocaches from being placed too close together. The required distance between physical parts belonging to separate geocaches is one-tenth of a mile. In the United States, this is also expressed as 528 feet. Using the standard conversion between miles and kilometers, the distance is approximately 0.161 kilometers. This restriction generally does not apply to different stages belonging to the same geocache.",
        "Another important consideration is what people leave inside the containers. Participants may enjoy discovering small toys or other interesting objects, but not everything is suitable for an outdoor hiding place. Wild animals have a much stronger sense of smell than humans. They may be attracted to things such as sweets, chewing gum, or even candles and air fresheners. An animal might then damage a container while trying to reach what is inside. It could also become ill after eating something unsuitable. Geocaching therefore asks participants to keep such things out of the containers, even if they seem harmless to people.",
        "Trackables have an additional feature that makes their journeys possible to follow. Each one has two different identification codes. One is visible on its online information page, while the other is marked on the actual object. The code on the object is needed when someone records actions such as picking it up, leaving it in another geocache, or discovering it in person. The number shown on the information page serves a more limited purpose. It allows someone to add a written comment to the object's online history without recording a physical movement or discovery. This distinction helps keep the travel records connected to people who have actually encountered the object.",
        "Not every form of Geocaching involves finding a container. In an activity called EarthCache, participants visit places with interesting geological features. They might study unusual rock formations or observe how natural forces have changed a landscape. To claim a successful visit, they normally answer questions about what they have observed and send their responses privately to the person responsible for the EarthCache. Once the responses have been submitted, the participant is allowed to record the visit online. There is no requirement to wait until that person reads the answers or sends a response. However, the answers must still meet the requirements of the activity.",
        "Geocaching combines exploration, technology, and responsibility. Its rules help protect the environment, maintain reliable online records, and allow participants to enjoy an activity shared by people in many different places. What begins as a search for a small hidden object can also become an opportunity to learn about the natural world and the importance of following shared rules."
      ],
      "passageJa": [
        "公園や森の中を歩くことも、何か隠された物を探すとなれば冒険に変わります。ジオキャッシングは、GPS技術を利用して、普段の場所を宝探しの舞台に変える屋外活動です。参加者はスマートフォンやGPS機器を使い、ジオキャッシュと呼ばれる隠された容器を探します。容器を見つけたら、通常は中にある小さな記録帳に名前を書き、見つけた場所に容器を戻します。",
        "ジオキャッシュの中には、訪問者が交換できる小物が入っているものもあります。また、Trackable（トラッカブル）と呼ばれる別の種類の物もあります。普通のおもちゃや交換用の小物とは異なり、Trackableは見つけた人の所有物になることを目的としていません。代わりに、あるジオキャッシュから別のジオキャッシュへ移動することを目的としています。中には、所有者によって特定の目的地や目標が設定されているものもあります。こうした物を持ち運ぶ参加者には、その旅が続くよう手助けすることが期待されています。そのため、Geocachingでは、およそ14〜21日以内に再びジオキャッシングを行う予定がない限り、Trackableを持ち出さないよう勧めています。長期間ほかの場所を訪れることができない人は、別の参加者のためにその物を残しておくべきです。",
        "ジオキャッシングは、容器を見つけるだけでなく、自分で新しい容器を設置することでも楽しめます。しかし、ジオキャッシュを隠すには慎重な計画が必要です。場所が適切でなければならず、その土地を管理する人や団体の許可が必要になる場合もあります。また、異なるジオキャッシュが近すぎる場所に設置されないようにするルールもあります。別々のジオキャッシュに属する物理的な設置物同士には、10分の1マイルの距離が必要です。アメリカでは、これは528フィートとも表されます。マイルとキロメートルの標準的な換算を用いると、その距離は約0.161キロメートルです。この制限は、一般に同じジオキャッシュに属する異なる段階には適用されません。",
        "もう一つ重要なのは、参加者が容器の中に何を残すかということです。小さなおもちゃや興味深い物を見つけるのは楽しいかもしれませんが、すべての物が屋外の隠し場所に適しているわけではありません。野生動物は人間よりもはるかに鋭い嗅覚を持っています。動物は、キャンディーやチューインガム、さらにはろうそくや芳香剤などに引き寄せられる可能性があります。その結果、中にある物を取ろうとして容器を壊すかもしれません。また、適さない物を食べて体調を崩す可能性もあります。そのためGeocachingでは、人間には無害に思える物であっても、そのような物を容器に入れないよう求めています。",
        "Trackableには、その旅を追跡できるようにするもう一つの特徴があります。それぞれに2種類の識別コードがあります。一つはオンラインの情報ページに表示され、もう一つは実物に記されています。実物に記されたコードは、その物を持ち出した、別のジオキャッシュに置いた、あるいは実際に見つけた、といった行動を記録するときに必要です。一方、情報ページに表示される番号には、より限定された用途があります。その番号を使えば、物理的な移動や発見を記録することなく、その物のオンライン上の履歴に文章によるコメントを追加できます。この区別によって、実際にその物に接した人々の行動に基づく移動記録が保たれます。",
        "ジオキャッシングのすべてが容器を探す活動というわけではありません。EarthCache（アースキャッシュ）と呼ばれる活動では、参加者は興味深い地質学的特徴を持つ場所を訪れます。珍しい岩の形を調べたり、自然の力によって地形がどのように変わったかを観察したりします。訪問の成功を申告するには、通常、観察した内容についての質問に答え、その回答をEarthCacheの管理者に非公開で送ります。回答を提出した後であれば、参加者は訪問をオンラインで記録できます。管理者が回答を読んだり、返信を送ったりするまで待つ必要はありません。ただし、回答はその活動で求められる条件を満たしていなければなりません。",
        "ジオキャッシングは、探検、技術、そして責任を組み合わせた活動です。そのルールは環境を守り、信頼できるオンライン記録を維持し、さまざまな場所の人々が同じ活動を楽しめるようにするために役立っています。小さな隠された物を探すことから始まる活動が、自然界について学び、共通のルールを守ることの大切さを知る機会にもなるのです。"
      ],
      "summary": [
        "Geocaching is an outdoor activity in which people use GPS devices or smartphones to search for containers hidden in different locations. After finding a container, participants usually sign a record inside it and return the container to its original position. Some containers also hold small objects that participants can exchange.",
        "Certain objects, called Trackables, are different from ordinary items for exchange. They are intended to travel between locations, and participants who take them are expected to help them continue their journeys. Geocaching recommends taking a Trackable only if the participant (a).",
        "People can also create and hide new geocaches for others to discover. However, there are guidelines about where containers may be placed. In general, the physical parts of geocaches belonging to different listings must be separated by at least (b).",
        "The guidelines also restrict the kinds of objects that may be left inside containers. Certain items are discouraged because they may cause problems at the hiding location. In particular, participants should avoid leaving (c).",
        "Trackables can be followed online, allowing owners and other participants to see where they have traveled. Each Trackable has two identifying codes, and these codes are used for different online actions. One of the codes, known as the reference number, can be used to (d).",
        "Geocaching also offers an activity called EarthCache, which differs from searching for an ordinary hidden container. Participants visit a particular location and complete tasks connected with the site. There are rules about how a successful visit can be recorded online. After completing the required tasks, participants (e)."
      ],
      "summaryJa": [
        "ジオキャッシングは、GPS機器やスマートフォンを使って、さまざまな場所に隠された容器を探す屋外活動です。容器を見つけた参加者は、通常、その中にある記録用紙に署名し、容器を元の位置に戻します。容器の中には、参加者が交換できる小物が入っているものもあります。",
        "Trackableと呼ばれる特別な物は、通常の交換用アイテムとは異なります。それらは場所から場所へと移動することを目的としており、持ち出した参加者には、その旅が続くように手助けすることが期待されます。Geocachingでは、参加者が(a)場合にのみ、Trackableを持ち出すことを勧めています。",
        "参加者は、ほかの人が見つけられるように新しいジオキャッシュを作り、隠すこともできます。しかし、容器を設置できる場所にはガイドラインがあります。一般に、異なる登録情報に属するジオキャッシュの物理的な設置物は、少なくとも(b)離れていなければなりません。",
        "ガイドラインでは、容器の中に入れてよい物の種類にも制限があります。隠し場所で問題を引き起こす可能性があるため、避けるべき物があります。特に、参加者は(c)ことを避けるべきです。",
        "Trackableはオンラインで追跡でき、所有者やほかの参加者が、その物がどこを移動してきたかを確認できます。それぞれのTrackableには2種類の識別コードがあり、オンライン上で異なる操作に使用されます。そのうちの一つである参照番号は、(d)ために使用できます。",
        "ジオキャッシングには、通常の隠された容器を探す活動とは異なるEarthCacheという活動もあります。参加者は特定の場所を訪れ、その場所に関連する課題を完了します。訪問の成功をオンラインで記録する方法にはルールがあります。必要な課題を終えた後、参加者は(e)。"
      ],
      "questions": [
        {
          "id": "a",
          "choices": [
            "expects to visit another geocache within the next two or three days",
            "expects to move the object to a different country within the next two months",
            "intends to return the object to its original location within one month",
            "plans to take part in another geocaching activity within the next two or three weeks"
          ],
          "choicesJa": [
            "今後2〜3日以内に別のジオキャッシュを訪れる予定がある",
            "今後2か月以内にその物を別の国へ移動させる予定がある",
            "1か月以内にその物を元の場所へ戻すつもりである",
            "今後2〜3週間以内に再びジオキャッシングの活動に参加する予定がある"
          ],
          "answer": 4
        },
        {
          "id": "b",
          "choices": [
            "161 meters",
            "196 meters",
            "143 meters",
            "178 meters"
          ],
          "choicesJa": [
            "161メートル",
            "196メートル",
            "143メートル",
            "178メートル"
          ],
          "answer": 1
        },
        {
          "id": "c",
          "choices": [
            "metal objects with sharp edges or pointed parts",
            "food products and objects that give off strong smells",
            "electronic objects that contain replaceable batteries",
            "small glass objects that could break during handling"
          ],
          "choicesJa": [
            "鋭い縁や先のとがった部分がある金属製品",
            "食品や強いにおいを発する物",
            "交換可能な電池が入っている電子製品",
            "取り扱い中に割れる可能性がある小さなガラス製品"
          ],
          "answer": 2
        },
        {
          "id": "d",
          "choices": [
            "report that the participant has left the object inside a cache",
            "record that the participant has seen the object in person",
            "post a written note on the object's online record",
            "report that the participant has taken the object from a cache"
          ],
          "choicesJa": [
            "参加者がその物をジオキャッシュの中に置いたことを報告する",
            "参加者がその物を実際に見たことを記録する",
            "その物のオンライン上の記録に文章によるメモを投稿する",
            "参加者がその物をジオキャッシュから持ち出したことを報告する"
          ],
          "answer": 3
        },
        {
          "id": "e",
          "choices": [
            "may record the find once their answers have been sent, even if the owner has not replied",
            "must first have their answers checked by a community reviewer rather than the owner",
            "must wait until the owner has examined their answers and sent a reply",
            "may record the find immediately after visiting, provided that their answers are submitted within a week"
          ],
          "choicesJa": [
            "所有者から返信がなくても、回答を送信した時点で発見を記録できる",
            "所有者ではなく、コミュニティの審査担当者に回答を確認してもらわなければならない",
            "所有者が回答を確認して返信するまで待たなければならない",
            "1週間以内に回答を提出すれば、訪問直後に発見を記録できる"
          ],
          "answer": 1
        }
      ]
    },
    {
      "id": "q7_set_011",
      "number": 11,
      "title": "Little Free Library",
      "passageTitle": "Little Free Library: Sharing Books with Neighbors",
      "passageTitleJa": "リトル・フリー・ライブラリー：地域の人々と本を分かち合う",
      "passage": [
        "Imagine walking through your neighborhood and finding a small wooden box filled with books. You can open its door, choose a book, and take it home. This is the idea behind Little Free Library, a project that encourages people to share books. Unlike ordinary public libraries, these boxes do not require membership cards or borrowing records. Visitors are welcome to take books, even when they have nothing to contribute at that moment. Others may leave books without taking any. The system depends on people's willingness to share.",
        "Anyone interested in starting a Little Free Library can buy a finished box or build one using their own design. However, making a box does not automatically make it part of the official network. A homemade library becomes registered when its owner buys a special plate from the organization. Each plate displays a different identification number, allowing the organization to recognize that particular library.",
        "A person who looks after one of these libraries is called a steward. Stewards check the condition of their boxes and make sure books are available. They can also manage information about their libraries online. Within a few business days of registration, the organization sends an account-setup email to the individual who paid for the library or its official identification plate. If someone else will manage the library, responsibility can later be transferred to that person.",
        "Little Free Library provides an online map showing the locations of registered boxes. However, newly registered libraries are not displayed immediately. Stewards who use their online accounts can add the address or GPS information for their libraries. They must then select an option that allows the location to appear on the public map and store the changes they have made. Once these steps are completed, visitors can find the library on the map.",
        "Many Little Free Libraries are outdoors, so their design must protect books from rain. One useful feature is a roof extending beyond the box's walls. The organization's building advice recommends an overhang of no less than one inch but no more than three inches. This helps prevent rainwater from running down the sides and entering the box. Such practical details allow these small libraries to serve their communities for years."
      ],
      "passageJa": [
        "近所を歩いていると、本が詰まった小さな木製の箱を見つけたと想像してみてください。その扉を開け、好きな本を選び、家に持ち帰ることができます。これが、人々が本を分かち合うことを促すプロジェクト、Little Free Libraryの基本的な考え方です。一般的な公共図書館とは異なり、このような箱を利用するのに会員カードや貸出記録は必要ありません。その場で提供できる本がなくても、訪問者は自由に本を持ち帰ることができます。また、本を持ち帰らずに置いていく人もいます。この仕組みは、本を分かち合おうとする人々の気持ちによって成り立っています。",
        "Little Free Libraryを始めたい人は、完成した箱を購入することも、自分で設計して作ることもできます。しかし、箱を作っただけで自動的に公式ネットワークに加わるわけではありません。自作の本棚は、所有者が団体から特別なプレートを購入することで正式に登録されます。それぞれのプレートには異なる識別番号が表示されており、団体はその番号によって個々の本棚を識別できます。",
        "このような本棚の世話をする人は、steward（管理者）と呼ばれます。管理者は箱の状態を確認し、利用できる本があるようにします。また、オンラインで自分の本棚に関する情報を管理することもできます。登録から数営業日以内に、団体は本棚または公式識別プレートの代金を支払った人へ、アカウント設定用のメールを送信します。別の人が実際に本棚を管理する場合は、後からその人に管理権限を移すことができます。",
        "Little Free Libraryは、登録された本棚の場所を示すオンライン地図を提供しています。しかし、新しく登録された本棚がすぐに地図に表示されるわけではありません。オンラインアカウントを使用する管理者は、自分の本棚の住所やGPS情報を追加できます。その後、一般公開の地図に場所が表示されるようにする設定を選び、変更内容を保存する必要があります。これらの手続きが完了すると、訪問者は地図上でその本棚を見つけられるようになります。",
        "多くのLittle Free Libraryは屋外に設置されているため、本が雨にぬれないような設計が必要です。役立つ工夫の一つは、箱の壁よりも外側に張り出した屋根を付けることです。団体の製作ガイドでは、屋根の張り出し部分を1インチ以上、3インチ以下にすることが推奨されています。これにより、雨水が側面を伝って箱の中に入り込むのを防ぎやすくなります。このような実用的な工夫によって、小さな本棚は長年にわたり地域の人々の役に立つことができます。"
      ],
      "summary": [
        "Little Free Library is a project that encourages people to share books in their communities. Small book-sharing boxes are placed in locations where people can easily visit them. Visitors can take books or leave books for others to enjoy.",
        "Unlike ordinary public libraries, these book-sharing boxes do not require a borrowing card. They operate according to a simple system of trust. When taking a book, visitors (a).",
        "People who want to establish a Little Free Library can either purchase a ready-made box or construct one themselves. However, a homemade box needs to be officially registered before it can join the organization's network. To complete this registration, its owner must (b).",
        "Each registered library has a person responsible for looking after it, known as a steward. The organization provides an online account through which stewards can manage their libraries. After registration, an email containing instructions for setting up this account is sent to (c).",
        "The organization also maintains an online map to help people find book-sharing boxes. Registering a library does not automatically make it visible on the map. A steward who uses the online account can enter the library's location information. After doing this, the steward must (d).",
        "Because many of these libraries stand outdoors, protecting books from rain is important. One recommended feature is a roof that extends beyond the walls of the box. According to the organization's building advice, the roof should extend approximately (e) beyond the sides."
      ],
      "summaryJa": [
        "Little Free Libraryは、地域の人々が本を分かち合うことを促すプロジェクトです。小さな本の共有ボックスが、人々の訪れやすい場所に設置されています。訪問者は本を持ち帰ったり、ほかの人が楽しめるように本を置いたりできます。",
        "一般的な公共図書館とは異なり、これらの本の共有ボックスを利用するのに貸出カードは必要ありません。人々の信頼に基づく簡単な仕組みで運営されています。本を持ち帰るとき、訪問者は(a)。",
        "Little Free Libraryを設置したい人は、完成した箱を購入することも、自分で作ることもできます。ただし、自作の箱を団体のネットワークに加えるには、公式登録が必要です。この登録を完了するために、所有者は(b)必要があります。",
        "登録された本棚には、それを管理する責任を持つstewardと呼ばれる人がいます。団体は、管理者が本棚の情報を管理できるオンラインアカウントを提供しています。登録後、このアカウントの設定方法を記したメールが(c)に送られます。",
        "団体は、人々が本の共有ボックスを見つけられるように、オンライン地図も提供しています。本棚を登録しても、自動的に地図に表示されるわけではありません。オンラインアカウントを利用する管理者は、本棚の位置情報を入力できます。その後、管理者は(d)必要があります。",
        "これらの本棚の多くは屋外に設置されているため、本を雨から守ることが重要です。推奨される工夫の一つは、箱の壁より外側に張り出した屋根を付けることです。団体の製作ガイドによると、屋根は側面から約(e)張り出すようにするべきです。"
      ],
      "questions": [
        {
          "id": "a",
          "choices": [
            "must leave a different book before taking one home",
            "may take a book without leaving another one at that time",
            "must return any book they take within an agreed period",
            "may take a book only after entering their name in a record"
          ],
          "choicesJa": [
            "家に本を持ち帰る前に、別の本を置かなければならない",
            "その時に別の本を置かなくても、本を持ち帰ることができる",
            "持ち帰った本は、決められた期間内に返却しなければならない",
            "記録用紙に名前を記入した後でのみ、本を持ち帰ることができる"
          ],
          "answer": 2
        },
        {
          "id": "b",
          "choices": [
            "send photographs of the completed box to receive an official registration code",
            "apply for a registration number through a local library or community organization",
            "complete an online registration form and receive a digital certificate",
            "purchase a special sign that carries a number identifying the library"
          ],
          "choicesJa": [
            "完成した箱の写真を送り、公式の登録コードを受け取る",
            "地域の図書館や地域団体を通じて登録番号を申請する",
            "オンライン登録フォームに入力し、電子証明書を受け取る",
            "本棚を識別する番号が記された特別な看板を購入する"
          ],
          "answer": 4
        },
        {
          "id": "c",
          "choices": [
            "the person who purchased the library or its registration sign",
            "the person who agrees to supply books for the library",
            "the person who first adds the library to the online map",
            "the person whose address is listed as the library's location"
          ],
          "choicesJa": [
            "本棚または登録用の看板を購入した人",
            "本棚に本を提供することに同意した人",
            "最初にその本棚をオンライン地図へ追加した人",
            "本棚の設置場所として住所が登録されている人"
          ],
          "answer": 1
        },
        {
          "id": "d",
          "choices": [
            "ask another steward to confirm the location through their account",
            "send the location information again through a separate online form",
            "change the library's map setting and save the new information",
            "request another registration number before adding the location"
          ],
          "choicesJa": [
            "別の管理者に、その人のアカウントを通じて設置場所を確認してもらう",
            "別のオンラインフォームから位置情報を再度送信する",
            "本棚の地図表示設定を変更し、新しい情報を保存する",
            "設置場所を追加する前に、別の登録番号を申請する"
          ],
          "answer": 3
        },
        {
          "id": "e",
          "choices": [
            "three to five inches",
            "one to three inches",
            "four to six inches",
            "two to four inches"
          ],
          "choicesJa": [
            "3〜5インチ",
            "1〜3インチ",
            "4〜6インチ",
            "2〜4インチ"
          ],
          "answer": 2
        }
      ]
    }
  ];
})();
