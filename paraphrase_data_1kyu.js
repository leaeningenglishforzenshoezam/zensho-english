// paraphrase_data_1kyu.js
// 全商英検1級 大問11風データ（198問版）
// noteIdベース連携用

(function () {
  "use strict";

  const RAW = [
    ["P1_001",1,"N001","I’m looking forward to seeing you again.","I’m ( ) to see you again.",["eager","worried","absent","ready"],"eager"],
    ["P1_002",2,"N002","She is responsible for managing the sales team.","She is ( ) managing the sales team.",["in charge of","absent from","eager to","far from"],"in charge of"],
    ["P1_107",3,"N107","Mr. Brown is in charge of the sales department.","Mr. Brown is ( ) for the sales department.",["responsible","suitable","eager","late"],"responsible"],
    ["P1_123",4,"N123","Tom is in charge of planning the school event.","Tom is ( ) for planning the school event.",["responsible","late","eager","famous"],"responsible"],
    ["P1_073",5,"N073","Parents have to protect their children.","Parents have the ( ) of protecting their children.",["responsibility","difficulty","possibility","experience"],"responsibility"],
    ["P1_003",6,"N003","The manager turned down my proposal.","The manager ( ) my proposal.",["accepted","refused","explained","prepared"],"refused"],
    ["P1_065",7,"N065","He never accepted my advice.","He ( ) to accept my advice.",["refused","offered","agreed","managed"],"refused"],
    ["P1_005",8,"N005","We should make a decision as soon as possible.","We should decide ( ).",["as soon as possible","by chance","at first sight","in charge of"],"as soon as possible"],
    ["P1_014",9,"N014","The new product became popular immediately.","The new product became popular ( ).",["at once","on purpose","by chance","in detail"],"at once"],
    ["P1_022",10,"N022","The event was canceled due to the storm.","The storm ( ) the cancellation of the event.",["led to","looked for","depended on","took after"],"led to"],
    ["P1_034",11,"N034","Heavy traffic caused the delay of the bus.","The delay of the bus was ( ) heavy traffic.",["due to","different from","proud of","full of"],"due to"],
    ["P1_037",12,"N037","The school trip was canceled because there were not enough participants.","The school trip was canceled due to a ( ) of participants.",["lack","group","pair","crowd"],"lack"],
    ["P1_068",13,"N068","We had to call off the picnic because of the rain.","The rain forced us to ( ) the picnic.",["cancel","extend","complete","attend"],"cancel"],
    ["P1_094",14,"N094","If it were not for the sun, plants could not grow.","( ) the sun, plants could not grow.",["Without","Under","Since","Through"],"Without"],
    ["P1_105",15,"N105","If it had not been for his advice, I would have failed.","( ) his advice, I would have failed.",["Without","With","For","Under"],"Without"],
    ["P1_118",16,"N118","The flight was late because of thick fog.","The flight was ( ) by thick fog.",["delayed","destroyed","broken","stuck"],"delayed"],
    ["P1_011",17,"N011","She was able to finish the work by herself.","She ( ) in finishing the work by herself.",["succeeded","failed","practiced","avoided"],"succeeded"],
    ["P1_013",18,"N013","I don’t know how to solve this problem.","I have no ( ) how to solve this problem.",["idea","answer","reason","result"],"idea"],
    ["P1_047",19,"N047","She chose the difficult task on purpose.","She ( ) chose the difficult task.",["intentionally","accidentally","suddenly","luckily"],"intentionally"],
    ["P1_017",20,"N017","I happened to meet my old friend at the station.","I met my old friend at the station ( ).",["by chance","on purpose","at once","in detail"],"by chance"],
    ["P1_103",21,"N103","I happened to see my old classmate on the train.","I saw my old classmate on the train ( ).",["by chance","on purpose","at once","in detail"],"by chance"],
    ["P1_076",22,"N076","I came across my former teacher at the station.","I ( ) to see my former teacher at the station.",["happened","decided","wanted","promised"],"happened"],
    ["P1_019",23,"N019","You should not speak loudly in the library.","You are not ( ) to speak loudly in the library.",["allowed","invited","ordered","helped"],"allowed"],
    ["P1_021",24,"N021","I prefer tea to coffee.","I like tea ( ) than coffee.",["better","worse","less","fewer"],"better"],
    ["P1_023",25,"N023","He apologized to me for being late.","He said he was ( ) for being late.",["sorry","angry","ready","famous"],"sorry"],
    ["P1_025",26,"N025","My sister takes care of our dog every morning.","My sister ( ) our dog every morning.",["looks after","turns down","looks into","takes after"],"looks after"],
    ["P1_026",27,"N026","They finally reached an agreement after long discussions.","They finally ( ) after long discussions.",["agreed","argued","failed","remained"],"agreed"],
    ["P1_028",28,"N028","The teacher encouraged us to study abroad.","The teacher ( ) us to study abroad.",["urged","prevented","refused","avoided"],"urged"],
    ["P1_029",29,"N029","I could not remember his name.","His name did not ( ).",["come to mind","take place","break out","turn down"],"come to mind"],
    ["P1_031",30,"N031","If you don’t submit the form today, you cannot join the event.","( ) you submit the form today, you cannot join the event.",["Unless","Although","Because","Since"],"Unless"],
    ["P1_110",31,"N110","If the weather is not bad, the sports day will be held tomorrow.","The sports day will be held tomorrow ( ) the weather is bad.",["unless","since","although","as"],"unless"],
    ["P1_035",32,"N035","We should try to stop accidents from happening.","We should make efforts to prevent the ( ) of accidents.",["occurrence","translation","decoration","explanation"],"occurrence"],
    ["P1_077",33,"N077","The team worked hard to win the final game.","The team made great ( ) to win the final game.",["efforts","progress","money","damage"],"efforts"],
    ["P1_039",34,"N039","They tried hard to solve the problem of food waste.","They worked hard to ( ) the problem of food waste.",["overcome","invite","borrow","repeat"],"overcome"],
    ["P1_041",35,"N041","He is not close to becoming the best player on the team.","He is ( ) becoming the best player on the team.",["far from","good at","ready for","similar to"],"far from"],
    ["P1_051",36,"N051","My grandfather goes fishing from time to time.","My grandfather ( ) goes fishing.",["sometimes","never","always","hardly ever"],"sometimes"],
    ["P1_053",37,"N053","The principal does not support the new school rule.","The principal is ( ) the new school rule.",["against","for","near","under"],"against"],
    ["P1_083",38,"N083","Ken is against the new school rule.","Ken ( ) with the new school rule.",["disagrees","agrees","deals","compares"],"disagrees"],
    ["P1_057",39,"N057","As soon as Ken saw the new bicycle, he wanted to buy it.","Ken wanted to buy the new bicycle at ( ).",["first sight","the end","any price","last"],"first sight"],
    ["P1_058",40,"N058","To be honest, I was not satisfied with his answer.","( ) speaking, I was not satisfied with his answer.",["Frankly","Usually","Suddenly","Lightly"],"Frankly"],
    ["P1_059",41,"N059","The teacher looked into the cause of the trouble.","The teacher ( ) the cause of the trouble.",["investigated","celebrated","introduced","translated"],"investigated"],
    ["P1_128",42,"N128","There is no denying that she is talented.","It is ( ) to deny that she is talented.",["impossible","natural","normal","doubtful"],"impossible"],
    ["P1_060",43,"N060","There is no solving this problem without teamwork.","It is ( ) to solve this problem without teamwork.",["impossible","careless","useful","natural"],"impossible"],
    ["P1_061",44,"N061","This new cleaner can get rid of bad smells.","This new cleaner can ( ) bad smells.",["remove","increase","accept","borrow"],"remove"],
    ["P1_062",45,"N062","She has improved her writing skills this year.","She has made ( ) her writing skills this year.",["progress in","a mistake with","a promise about","room for"],"progress in"],
    ["P1_067",46,"N067","Mike does not depend on his family for money.","Mike is ( ) of his family’s financial help.",["independent","fond","full","afraid"],"independent"],
    ["P1_134",47,"N134","You shouldn’t count on his promise.","You shouldn’t ( ) his promise.",["trust","disturb","forgive","visit"],"trust"],
    ["P1_072",48,"N072","She made believe she didn't hear his comment to avoid an argument.","She ( ) not to hear his comment to avoid an argument.",["pretended","happened","decided","refused"],"pretended"],
    ["P1_081",49,"N081","I answered the question as clearly as I could.","To the best of my ( ), I answered the question clearly.",["ability","memory","opinion","promise"],"ability"],
    ["P1_082",50,"N082","I couldn’t understand how to use this machine.","I couldn’t ( ) out how to use this machine.",["figure","carry","put","turn"],"figure"],
    ["P1_108",51,"N108","I couldn’t understand the meaning of the message.","I couldn’t ( ) out the meaning of the message.",["figure","carry","spread","get"],"figure"],
    ["P1_086",52,"N086","The captain is looked up to by all the players.","The captain is ( ) by all the players.",["respected","suspected","ignored","repaired"],"respected"],
    ["P1_087",53,"N087","Emi made up her mind to study abroad.","Emi made a ( ) to study abroad.",["decision","mistake","difference","rule"],"decision"],
    ["P1_088",54,"N088","The train arrived as planned.","The train arrived ( ).",["on schedule","on purpose","on board","on sale"],"on schedule"],
    ["P1_132",55,"N132","The ceremony began as planned.","The ceremony began ( ).",["on schedule","behind schedule","at last","on air"],"on schedule"],
    ["P1_089",56,"N089","I am happy to answer your questions.","I am ( ) to answer your questions.",["willing","likely","unable","supposed"],"willing"],
    ["P1_090",57,"N090","You don’t have to pay for dinner today. I invited you.","Dinner is ( ) today.",["on me","by chance","at once","on schedule"],"on me"],
    ["P1_091",58,"N091","My teacher talked me into entering the speech contest.","My teacher ( ) me to enter the speech contest.",["persuaded","refused","allowed","forced"],"persuaded"],
    ["P1_092",59,"N092","It goes without saying that health is more important than money.","( ) to say, health is more important than money.",["Needless","Strange","Lucky","Careful"],"Needless"],
    ["P1_093",60,"N093","Please take off your hat inside the building.","Please ( ) your hat inside the building.",["remove","wear","brush","carry"],"remove"],
    ["P1_124",61,"N124","If her advice had not helped me, I would have made a serious mistake.","( ) her advice, I could not avoid making a serious mistake.",["But for","With","Against","Under"],"But for"],
    ["P1_095",62,"N095","We don’t have any seats available for tonight’s show.","All the seats are ( ) for tonight’s show.",["booked","empty","broken","cleaned"],"booked"],
    ["P1_096",63,"N096","The Olympic Games are held every four years.","The Olympic Games ( ) every four years.",["take place","look into","get over","come across"],"take place"],
    ["P1_130",64,"N130","Significant changes take place during the evolution process.","Significant changes ( ) during the evolution process.",["occur","remain","disappear","repeat"],"occur"],
    ["P1_097",65,"N097","There are only ten students in the classroom.","There are no ( ) than ten students in the classroom.",["more","less","better","larger"],"more"],
    ["P1_098",66,"N098","My father never fails to read the newspaper in the morning.","My father ( ) reads the newspaper in the morning.",["always","sometimes","seldom","never"],"always"],
    ["P1_099",67,"N099","We have many problems to deal with before the event.","We have many problems to ( ) before the event.",["handle","avoid","damage","compare"],"handle"],
    ["P1_033",68,"N033","Building trust with customers requires careful communication.","Building trust with customers ( ) careful communication.",["calls for","gets over","turns down","looks after"],"calls for"],
    ["P1_055",69,"N055","Good health requires regular exercise and enough sleep.","Good health ( ) regular exercise and enough sleep.",["calls for","takes off","breaks out","turns down"],"calls for"],
    ["P1_100",70,"N100","This job calls for careful planning.","This job ( ) careful planning.",["requires","feeds","serves","adds"],"requires"],
    ["P1_102",71,"N102","You should make use of your free time.","You should ( ) your free time.",["take advantage of","make fun of","look forward to","keep in touch with"],"take advantage of"],
    ["P1_045",72,"N045","The children could understand the story easily.","The story ( ) sense to the children.",["made","gave","took","had"],"made"],
    ["P1_104",73,"N104","I don’t understand what this sentence means.","This sentence doesn’t ( ) to me.",["make sense","take place","come across","put off"],"make sense"],
    ["P1_106",74,"N106","Every time I hear this song, I remember my childhood.","This song always ( ) me of my childhood.",["reminds","remembers","resembles","removes"],"reminds"],
    ["P1_109",75,"N109","Many children are in trouble because they do not have enough food.","Many children are ( ) from hunger.",["suffering","retiring","celebrating","separating"],"suffering"],
    ["P1_112",76,"N112","I can’t put up with his rude behavior anymore.","I can’t ( ) his rude behavior anymore.",["stand","enjoy","remember","expect"],"stand"],
    ["P1_113",77,"N113","Ken looks like his grandfather.","Ken ( ) his grandfather.",["resembles","respects","recommends","recognizes"],"resembles"],
    ["P1_114",78,"N114","My brother often forgets important things.","My brother has a ( ) of forgetting important things.",["habit","handicap","harmony","honesty"],"habit"],
    ["P1_133",79,"N133","My sister often leaves the lights on.","My sister has a ( ) of leaving the lights on.",["habit","hobby","policy","theory"],"habit"],
    ["P1_115",80,"N115","You need to fill in this application form.","You need to ( ) this application form.",["complete","collect","bring","offer"],"complete"],
    ["P1_121",81,"N121","He got over the sadness after his dog died.","He ( ) from the sadness after his dog died.",["recovered","suffered","learned","heard"],"recovered"],
    ["P1_122",82,"N122","The students learned the speech by heart.","The students ( ) the speech.",["memorized","created","copied","reviewed"],"memorized"],
    ["P1_125",83,"N125","I couldn't catch the early bus.","I ( ) the early bus.",["missed","lost","took","saw"],"missed"],
    ["P1_126",84,"N126","Until Emma was six, she was brought up by her aunt.","Until Emma was six, she was ( ) by her aunt.",["raised","praised","scolded","spoiled"],"raised"],
    ["P1_127",85,"N127","The letters UN stand for “United Nations.”","The letters UN ( ) the “United Nations.”",["represent","offer","adopt","suspect"],"represent"],
    ["P1_136",86,"N136","It is no use trying to finish the work in five minutes.","It is ( ) to try to finish the work in five minutes.",["useless","careless","priceless","timeless"],"useless"],
    ["P1_137",87,"N137","She is concerned about her son’s health.","She is ( ) about her son’s health.",["anxious","excited","pleased","satisfied"],"anxious"],
    ["P1_050",88,"N050","I felt nervous before giving a speech.","I was ( ) about giving a speech.",["anxious","comfortable","satisfied","relaxed"],"anxious"],
    ["P1_138",89,"N138","You should know better than to make fun of others.","You should be ( ) enough not to make fun of others.",["wise","brave","calm","kind"],"wise"],
    ["P1_139",90,"N139","I’ll drop you a line when I arrive in New York.","I’ll ( ) when I arrive in New York.",["write to","take after","look into","put off"],"write to"],
    ["P1_140",91,"N140","We had to put off the concert because of the storm.","The storm ( ) us to put off the concert.",["forced","wanted","expected","ordered"],"forced"],
    ["P1_141",92,"N141","Ken can’t play the piano, and he certainly can’t play the violin.","Ken can’t play the piano, much ( ) the violin.",["less","more","better","worse"],"less"],
    ["P1_016",93,"N016","The city is famous for its old temples.","The city is well ( ) for its old temples.",["known","built","made","used"],"known"],
    ["P1_048",94,"N048","Ken is not likely to forget his promise.","Ken is the ( ) person to forget his promise.",["least likely","most careful","most likely","best"],"least likely"],
    ["P1_131",95,"N131","You will probably not pass the test without studying.","It is ( ) that you will pass the test without studying.",["unlikely","likely","natural","clear"],"unlikely"],
    ["P1_007",96,"N007","He didn’t attend the meeting yesterday.","He was ( ) from the meeting yesterday.",["absent","present","different","free"],"absent"],
    ["P1_009",97,"N009","The number of foreign tourists has increased.","The number of foreign tourists has been ( ) recently.",["on the rise","on time","at risk","in return"],"on the rise"],
    ["P1_018",98,"N018","The company will introduce a new system next month.","The company will ( ) a new system next month.",["bring in","take off","look after","make up"],"bring in"],
    ["P1_052",99,"N052","You must explain the reason for your absence.","You must ( ) for your absence.",["account","stand","take","go"],"account"],
    ["P1_054",100,"N054","Planting more trees can help make the town cooler in summer.","Planting more trees can ( ) making the town cooler in summer.",["contribute to","take after","give up","put off"],"contribute to"],
    ["P1_063",101,"N063","It was not long before the bus arrived.","The bus arrived ( ).",["soon","lately","finally","once"],"soon"],
    ["P1_069",102,"N069","Your essay is excellent.","There is ( ) room for improvement in your essay.",["little","many","several","enough"],"little"],
    ["P1_084",103,"N084","This computer is superior to my old one.","This computer is ( ) than my old one.",["better","worse","slower","smaller"],"better"],
    ["P1_117",104,"N117","This article will help you understand Japanese culture.","This article will help you ( ) Japanese culture.",["make sense of","look down on","get away with","run out of"],"make sense of"],
    ["P1_135",105,"N135","This article is beyond my understanding.","I can’t ( ) this article at all.",["follow","buy","guess","find"],"follow"],
    ["P1_142",106,"N142","Many students take part in volunteer activities after school.","Many students ( ) volunteer activities after school.",["participate in","depend on","look into","put off"],"participate in"],
    ["P1_143",107,"N143","Rina is involved in planning the school festival.","Rina takes ( ) in planning the school festival.",["part","care","charge","place"],"part"],
        ["P1_144",108,"N144","Local shops help support the town's economy.","Local shops ( ) the town's economy.",["contribute to","depend on","deal with","look after"],"contribute to"],
    ["P1_145",109,"N145","Although the road was crowded, the bus arrived on time.","( ) the crowded road, the bus arrived on time.",["Despite","Because of","According to","Instead of"],"Despite"],
    ["P1_146",110,"N146","No matter how carefully you check it, you may still find mistakes.","( ) carefully you check it, you may still find mistakes.",["However","Whenever","Wherever","Whatever"],"However"],
    ["P1_147",111,"N147","No matter what happens, we should follow the plan.","( ) happens, we should follow the plan.",["Whatever","Whenever","Wherever","However"],"Whatever"],
    ["P1_148",112,"N148","Please send the documents beforehand.","Please send the documents ( ).",["in advance","in contrast","in fact","in return"],"in advance"],
    ["P1_149",113,"N149","In addition to selling books, the shop holds small events.","The shop holds small events ( ) selling books.",["as well as","because of","instead of","far from"],"as well as"],
    ["P1_150",114,"N150","In contrast to his older brother, Ken is quiet and careful.","( ) his older brother, Ken is quiet and careful.",["Unlike","According to","Thanks to","In spite of"],"Unlike"],
    ["P1_151",115,"N151","According to the survey, more students use digital textbooks.","( ) the survey, more students use digital textbooks.",["Based on","Apart from","Because of","Instead of"],"Based on"],
    ["P1_152",116,"N152","The picnic was canceled as a result of the heavy rain.","The picnic was canceled ( ) the heavy rain.",["due to","far from","similar to","aware of"],"due to"],
    ["P1_153",117,"N153","A fire broke out in the factory last night.","A fire ( ) in the factory last night.",["occurred","remained","decreased","improved"],"occurred"],
    ["P1_154",118,"N154","Residents asked the city for safer roads.","Residents ( ) safer roads from the city.",["requested","suggested","prevented","refused"],"requested"],
    ["P1_155",119,"N155","Since you have finished the report, you can go home.","( ) you have finished the report, you can go home.",["Now that","As long as","No matter","In case"],"Now that"],
    ["P1_156",120,"N156","You may use this room if you clean it after using it.","You may use this room ( ) you clean it after using it.",["as long as","as soon as","no matter how","even though"],"as long as"],
    ["P1_157",121,"N157","Some students could not follow the fast lesson.","Some students could not ( ) the fast lesson.",["keep up with","look up to","get rid of","take care of"],"keep up with"],
    ["P1_158",122,"N158","You should examine your report again before submitting it.","You should ( ) your report again before submitting it.",["look over","look after","look into","look up to"],"look over"],
    ["P1_159",123,"N159","Let's review today's lesson before the test.","Let's ( ) today's lesson before the test.",["go over","take over","turn over","get over"],"go over"],
    ["P1_160",124,"N160","Betty felt uncomfortable during the interview.","Betty was ( ) during the interview.",["ill at ease","on purpose","in charge","at first sight"],"ill at ease"],
    ["P1_161",125,"N161","The kind staff made the visitors feel comfortable.","The kind staff made the visitors feel ( ).",["at ease","in advance","on account","under way"],"at ease"],
    ["P1_162",126,"N162","She accepted the responsibility of leading the team.","She ( ) the responsibility of leading the team.",["took on","turned down","put off","gave up"],"took on"],
    ["P1_163",127,"N163","After the president retired, Ms. Sato became responsible for the company.","After the president retired, Ms. Sato ( ) the company.",["took over","took after","took off","took part in"],"took over"],
    ["P1_164",128,"N164","The students expressed ideas for improving the cafeteria.","The students ( ) for improving the cafeteria.",["made suggestions","made excuses","made efforts","made mistakes"],"made suggestions"],
    ["P1_165",129,"N165","The committee proposed a new safety plan.","The committee ( ) a new safety plan.",["put forward","put off","put up with","put out"],"put forward"],
    ["P1_166",130,"N166","Online meetings may replace some business trips.","Online meetings may ( ) some business trips.",["take the place of","take care of","take notice of","take pride in"],"take the place of"],
    ["P1_167",131,"N167","This book is worth reading.","It is ( ) to read this book.",["worthwhile","hopeless","careless","familiar"],"worthwhile"],
    ["P1_168",132,"N168","Good communication is crucial to successful teamwork.","Good communication is ( ) to successful teamwork.",["essential","similar","independent","unrelated"],"essential"],
    ["P1_169",133,"N169","Are you familiar with this accounting software?","Do you know this accounting software ( )?",["well","carefully","suddenly","rarely"],"well"],
    ["P1_170",134,"N170","I still keep in touch with my host family.","I still stay ( ) my host family.",["in contact with","in contrast to","in charge of","in spite of"],"in contact with"],
    ["P1_171",135,"N171","Please get in touch with the hotel before you leave.","Please ( ) the hotel before you leave.",["contact","compare","resemble","represent"],"contact"],
    ["P1_172",136,"N172","The customers were disappointed with the new service.","The customers were not ( ) with the new service.",["satisfied","familiar","aware","connected"],"satisfied"],
    ["P1_173",137,"N173","The students were satisfied with the result of the event.","The students were ( ) with the result of the event.",["pleased","ashamed","related","short"],"pleased"],
    ["P1_174",138,"N174","The instructions were too complicated for beginners to follow.","The instructions were so complicated that beginners ( ) follow them.",["could not","should not","must not","did not"],"could not"],
    ["P1_175",139,"N175","Many students have difficulty expressing their opinions in English.","Many students find it ( ) to express their opinions in English.",["difficult","necessary","suitable","possible"],"difficult"],
    ["P1_176",140,"N176","She had trouble finding the office.","She ( ) to find the office.",["struggled","managed","offered","decided"],"struggled"],
    ["P1_177",141,"N177","The students became aware of the danger of sharing personal information online.","The students ( ) the danger of sharing personal information online.",["realized","reduced","replaced","recommended"],"realized"],
    ["P1_178",142,"N178","He has a good command of English.","He is ( ) in English.",["fluent","familiar","satisfied","aware"],"fluent"],
    ["P1_179",143,"N179","As the deadline drew near, everyone became busier.","As the deadline ( ), everyone became busier.",["approached","remained","occurred","decreased"],"approached"],
    ["P1_180",144,"N180","We should take the cost into account.","We should ( ) the cost.",["consider","ignore","reject","remove"],"consider"],
    ["P1_181",145,"N181","Some students made fun of his accent.","Some students ( ) his accent.",["laughed at","looked after","dealt with","depended on"],"laughed at"],
    ["P1_182",146,"N182","This problem is related to the local economy.","This problem is ( ) with the local economy.",["connected","satisfied","familiar","filled"],"connected"],
    ["P1_183",147,"N183","The accident had nothing to do with the new system.","The accident was ( ) to the new system.",["unrelated","similar","suitable","important"],"unrelated"],
    ["P1_184",148,"N184","This training course is suitable for beginners.","This training course is ( ) for beginners.",["appropriate","responsible","famous","anxious"],"appropriate"],
    ["P1_185",149,"N185","We ran out of time during the test.","We ( ) all our time during the test.",["used up","put off","looked into","took over"],"used up"],
    ["P1_186",150,"N186","We must take measures to prevent accidents.","We must take ( ) to prevent accidents.",["action","notice","pride","part"],"action"],
    ["P1_187",151,"N187","She made up for her mistake by working overtime.","She ( ) for her mistake by working overtime.",["compensated","apologized","requested","examined"],"compensated"],
    ["P1_188",152,"N188","Ken is proud of his hometown.","Ken takes ( ) in his hometown.",["pride","part","place","care"],"pride"],
    ["P1_189",153,"N189","Mika is interested in international business.","Mika takes an ( ) in international business.",["interest","account","advantage","effect"],"interest"],
    ["P1_190",154,"N190","Please pay attention to changes in the schedule.","Please take ( ) of changes in the schedule.",["notice","pride","part","place"],"notice"],
    ["P1_191",155,"N191","Take care not to forget your ticket.","Be ( ) not to forget your ticket.",["careful","afraid","familiar","fluent"],"careful"],
    ["P1_192",156,"N192","We are supposed to submit the report by Friday.","We are ( ) to submit the report by Friday.",["expected","forced","allowed","willing"],"expected"],
    ["P1_193",157,"N193","My grandmother is accustomed to living alone.","My grandmother is ( ) to living alone.",["used","ready","supposed","likely"],"used"],
    ["P1_194",158,"N194","She studied hard in order to pass the exam.","She studied hard ( ) pass the exam.",["so as to","in case of","as far as","no matter"],"so as to"],
    ["P1_195",159,"N195","Use this button if there is an emergency.","Use this button ( ) an emergency.",["in case of","according to","in spite of","as a result of"],"in case of"],
    ["P1_196",160,"N196","Take an umbrella because it may rain.","Take an umbrella ( ) it rains.",["in case","as long as","now that","no matter what"],"in case"],
    ["P1_197",161,"N197","To my knowledge, the store is closed today.","( ), the store is closed today.",["As far as I know","In contrast to","For the purpose of","In addition to"],"As far as I know"],
    ["P1_198",162,"N198","In my opinion, the first plan is better.","( ), the first plan is better.",["As far as I am concerned","In case of an accident","As a result of","No matter what"],"As far as I am concerned"],
    ["P1_004",163,"N004","I have never seen such a beautiful view before.","This is the most beautiful view I have ( ) seen.",["ever","already","yet","still"],"ever"],
    ["P1_006",164,"N006","The train was delayed because of heavy snow.","Heavy snow ( ) the delay of the train.",["caused","received","protected","included"],"caused"],
    ["P1_008",165,"N008","This machine is easy to operate.","It is easy ( ) this machine.",["operating","operated","to operate","operation"],"to operate"],
    ["P1_010",166,"N010","Could you tell me the reason for your decision?","Could you tell me ( ) you made that decision?",["how","why","when","where"],"why"],
    ["P1_012",167,"N012","We must protect the environment for future generations.","It is ( ) for us to protect the environment for future generations.",["necessary","immediate","convenient","intentional"],"necessary"],
    ["P1_015",168,"N015","His explanation was too difficult for me to understand.","His explanation was so difficult that I couldn’t ( ) it.",["understand","repeat","describe","introduce"],"understand"],
    ["P1_020",169,"N020","The problem is too serious to ignore.","The problem is so serious that we cannot ( ) it.",["ignore","solve","notice","explain"],"ignore"],
    ["P1_024",170,"N024","This medicine will reduce your pain.","This medicine will make your pain ( ).",["less","more","worse","full"],"less"],
    ["P1_027",171,"N027","It is difficult to predict the result of the election.","The result of the election is difficult ( ).",["to predict","predicting","predicted","prediction"],"to predict"],
    ["P1_030",172,"N030","The population of the town is decreasing every year.","The population of the town is getting ( ) every year.",["smaller","larger","higher","wider"],"smaller"],
    ["P1_032",173,"N032","We can protect the ocean by using less plastic.","The ocean can be ( ) by using less plastic.",["protected","polluted","wasted","avoided"],"protected"],
    ["P1_036",174,"N036","As English is used in many countries, it has become an international language.","Since English is used ( ), it functions as a common language worldwide.",["globally","frequently","simultaneously","locally"],"globally"],
    ["P1_038",175,"N038","The team achieved its greatest success last year.","The team was ( ) last year.",["at its best","in charge","by chance","under way"],"at its best"],
    ["P1_040",176,"N040","Snow covered the mountains all night.","There was snow ( ) the mountains all night.",["covering","choosing","losing","building"],"covering"],
    ["P1_042",177,"N042","The new highway helped the local economy grow.","The new highway ( ) the growth of the local economy.",["promoted","refused","destroyed","corrected"],"promoted"],
    ["P1_043",178,"N043","Many citizens asked the city for better public services.","Many citizens ( ) better public services from the city.",["requested","doubted","avoided","borrowed"],"requested"],
    ["P1_044",179,"N044","Because you have finished your homework, you can watch TV.","( ) you have finished your homework, you can watch TV.",["Since","Unless","Though","Before"],"Since"],
    ["P1_046",180,"N046","Your answer seems correct, but you should examine it again.","Your answer seems correct, but you should ( ) it again.",["check","draw","cancel","print"],"check"],
    ["P1_049",181,"N049","Students should use every chance to practice speaking English.","Students should ( ) every chance to practice speaking English.",["use","lose","miss","hide"],"use"],
    ["P1_056",182,"N056","The new factory created many jobs in the town.","The new factory brought an increase in employment ( ).",["opportunities","mistakes","illnesses","temperatures"],"opportunities"],
    ["P1_064",183,"N064","The results of the survey will be published next week.","The results of the survey will be ( ) next week.",["released","hidden","repaired","refused"],"released"],
    ["P1_066",184,"N066","She spoke English with a slight Japanese accent.","She spoke English with a ( ) Japanese accent.",["mild","heavy","strong","serious"],"mild"],
    ["P1_070",185,"N070","The company will employ ten new workers this spring.","Ten new workers will be ( ) by the company this spring.",["hired","fired","blamed","trained"],"hired"],
    ["P1_071",186,"N071","The students expressed ideas for a better school festival.","The students made ( ) for a better school festival.",["suggestions","mistakes","excuses","prices"],"suggestions"],
    ["P1_074",187,"N074","My phone is too old, so I should change it for a new one.","My phone is too old, so I should ( ) it.",["replace","reduce","repair","respect"],"replace"],
    ["P1_075",188,"N075","This rule is crucial for every student in the school.","This rule is ( ) for every student in the school.",["important","mysterious","foreign","private"],"important"],
    ["P1_078",189,"N078","The price of rice has become higher recently.","The price of rice has ( ) recently.",["risen","fallen","dropped","disappeared"],"risen"],
    ["P1_079",190,"N079","I’m sorry about the result of the exam.","I’m ( ) about the result of the exam.",["disappointed","excited","pleased","relaxed"],"disappointed"],
    ["P1_080",191,"N080","The science question was too difficult for me.","I couldn’t ( ) the science question.",["understand","hear","believe","touch"],"understand"],
    ["P1_085",192,"N085","It is understandable that she is upset about the result.","It is ( ) for her to be upset about the result.",["natural","impossible","unnecessary","careless"],"natural"],
    ["P1_101",193,"N101","My brother has twice as many CDs as I have.","My brother has twice the ( ) of CDs I have.",["number","size","height","weight"],"number"],
    ["P1_111",194,"N111","Who can believe such an unbelievable story?","( ) can believe such an unbelievable story.",["Nobody","Anybody","Everybody","Somebody"],"Nobody"],
    ["P1_116",195,"N116","The car almost hit the old man.","The car ( ) hit the old man.",["nearly","hardly","completely","seldom"],"nearly"],
    ["P1_119",196,"N119","Yumi is a good speaker of French.","Yumi speaks French ( ).",["fluently","poorly","quietly","loudly"],"fluently"],
    ["P1_120",197,"N120","A typhoon is coming toward the island.","A typhoon is ( ) the island.",["approaching","leaving","breaking","crossing"],"approaching"],
    ["P1_129",198,"N129","The movie was so touching that many people cried.","Many people were ( ) by the movie.",["moved","disappointed","frightened","bothered"],"moved"]
  ];

  const EXTRA = {
        "P1_001": { ja: "私はまたあなたに会えるのを楽しみにしています。", answerJa: "熱望して、ぜひ～したい" },
    "P1_002": { ja: "彼女は営業チームの管理を担当している。", answerJa: "～を担当している" },
    "P1_003": { ja: "部長は私の提案を断った。", answerJa: "断った、拒否した" },
    "P1_004": { ja: "こんなに美しい景色は今まで見たことがない。", answerJa: "今までに" },
    "P1_005": { ja: "私たちはできるだけ早く決定すべきだ。", answerJa: "できるだけ早く" },
    "P1_006": { ja: "列車は大雪のため遅れた。", answerJa: "引き起こした" },
    "P1_007": { ja: "彼は昨日その会議に出席しなかった。", answerJa: "欠席して" },
    "P1_008": { ja: "この機械は操作するのが簡単だ。", answerJa: "操作すること" },
    "P1_009": { ja: "外国人観光客の数は最近増えている。", answerJa: "増加して、上昇して" },
    "P1_010": { ja: "その決定をした理由を教えていただけますか。", answerJa: "なぜ" },
    "P1_011": { ja: "彼女は一人でその仕事を終えることができた。", answerJa: "成功した" },
    "P1_012": { ja: "私たちは将来の世代のために環境を守らなければならない。", answerJa: "必要な" },
    "P1_013": { ja: "私はこの問題の解き方がわからない。", answerJa: "考え、見当" },
    "P1_014": { ja: "その新製品はすぐに人気になった。", answerJa: "すぐに" },
    "P1_015": { ja: "彼の説明は難しすぎて私には理解できなかった。", answerJa: "理解する" },
    "P1_016": { ja: "その都市は古い寺で有名だ。", answerJa: "知られている" },
    "P1_017": { ja: "私は駅で昔の友人に偶然会った。", answerJa: "偶然に" },
    "P1_018": { ja: "その会社は来月新しいシステムを導入する予定だ。", answerJa: "導入する、持ち込む" },
    "P1_019": { ja: "図書館では大声で話してはいけない。", answerJa: "許されている" },
    "P1_020": { ja: "その問題は深刻すぎて無視できない。", answerJa: "無視する" },
    "P1_021": { ja: "私はコーヒーより紅茶のほうが好きだ。", answerJa: "よりよく、もっと" },
    "P1_022": { ja: "その行事は嵐のため中止になった。", answerJa: "～につながった、引き起こした" },
    "P1_023": { ja: "彼は遅刻したことを私に謝った。", answerJa: "すまなく思って" },
    "P1_024": { ja: "この薬はあなたの痛みを和らげるだろう。", answerJa: "より少なく、より弱く" },
    "P1_025": { ja: "姉は毎朝私たちの犬の世話をしている。", answerJa: "～の世話をする" },
    "P1_026": { ja: "彼らは長い議論の末、ついに合意に達した。", answerJa: "同意した" },
    "P1_027": { ja: "選挙の結果を予測するのは難しい。", answerJa: "予測すること" },
    "P1_028": { ja: "先生は私たちに留学するよう勧めた。", answerJa: "強く勧めた、促した" },
    "P1_029": { ja: "私は彼の名前を思い出せなかった。", answerJa: "心に浮かぶ" },
    "P1_030": { ja: "その町の人口は毎年減っている。", answerJa: "より小さく" },
    "P1_031": { ja: "今日その用紙を提出しなければ、その行事に参加できない。", answerJa: "もし～でなければ" },
    "P1_032": { ja: "私たちはプラスチックの使用を減らすことで海を守ることができる。", answerJa: "守られた" },
    "P1_033": { ja: "顧客との信頼関係を築くには丁寧なコミュニケーションが必要だ。", answerJa: "必要とする" },
    "P1_034": { ja: "激しい交通渋滞がバスの遅れを引き起こした。", answerJa: "～のために" },
    "P1_035": { ja: "私たちは事故が起こるのを防ぐ努力をすべきだ。", answerJa: "発生" },
    "P1_036": { ja: "英語は多くの国で使われているので、国際語になっている。", answerJa: "世界的に" },
    "P1_037": { ja: "参加者が足りなかったため、修学旅行は中止になった。", answerJa: "不足" },
    "P1_038": { ja: "そのチームは昨年最大の成功を収めた。", answerJa: "最高の状態で" },
    "P1_039": { ja: "彼らは食品ロスの問題を解決しようと一生懸命努力した。", answerJa: "克服する" },
    "P1_040": { ja: "雪が一晩中山々を覆っていた。", answerJa: "覆っている" },
    "P1_041": { ja: "彼はチームで最高の選手になるにはほど遠い。", answerJa: "～にはほど遠い" },
    "P1_042": { ja: "その新しい高速道路は地域経済の成長を助けた。", answerJa: "促進した" },
    "P1_043": { ja: "多くの市民が市によりよい公共サービスを求めた。", answerJa: "要求した" },
    "P1_044": { ja: "宿題を終えたので、テレビを見てもよい。", answerJa: "～なので" },
    "P1_045": { ja: "子どもたちはその話を簡単に理解できた。", answerJa: "作った、なした" },
    "P1_046": { ja: "あなたの答えは正しそうだが、もう一度確かめるべきだ。", answerJa: "確認する" },
    "P1_047": { ja: "彼女はわざと難しい課題を選んだ。", answerJa: "意図的に" },
    "P1_048": { ja: "ケンは約束を忘れそうにない。", answerJa: "最も～しそうにない" },
    "P1_049": { ja: "生徒は英語を話す練習のためにあらゆる機会を使うべきだ。", answerJa: "使う" },
    "P1_050": { ja: "私はスピーチをする前に緊張していた。", answerJa: "不安な、心配して" },
    "P1_051": { ja: "祖父は時々釣りに行く。", answerJa: "時々" },
    "P1_052": { ja: "欠席した理由を説明しなければならない。", answerJa: "説明する" },
    "P1_053": { ja: "校長はその新しい校則を支持していない。", answerJa: "反対して" },
    "P1_054": { ja: "もっと木を植えることは、夏に町をより涼しくするのに役立つ。", answerJa: "～に貢献する" },
    "P1_055": { ja: "健康には定期的な運動と十分な睡眠が必要だ。", answerJa: "必要とする" },
    "P1_056": { ja: "その新しい工場は町に多くの仕事を生み出した。", answerJa: "機会" },
    "P1_057": { ja: "ケンはその新しい自転車を一目見て買いたくなった。", answerJa: "一目" },
    "P1_058": { ja: "正直に言うと、私は彼の答えに満足していなかった。", answerJa: "率直に言えば" },
    "P1_059": { ja: "先生はそのトラブルの原因を調べた。", answerJa: "調査した" },
    "P1_060": { ja: "チームワークなしでこの問題を解くのは不可能だ。", answerJa: "不可能な" },
    "P1_061": { ja: "この新しいクリーナーは嫌なにおいを取り除くことができる。", answerJa: "取り除く" },
    "P1_062": { ja: "彼女は今年、作文の力を伸ばした。", answerJa: "～における進歩" },
    "P1_063": { ja: "バスはまもなく到着した。", answerJa: "すぐに" },
    "P1_064": { ja: "その調査結果は来週公表される予定だ。", answerJa: "公開された、発表された" },
    "P1_065": { ja: "彼は決して私の助言を受け入れなかった。", answerJa: "拒否した" },
    "P1_066": { ja: "彼女は少し日本語なまりのある英語を話した。", answerJa: "軽い、わずかな" },
    "P1_067": { ja: "マイクはお金のことで家族に頼っていない。", answerJa: "独立して" },
    "P1_068": { ja: "私たちは雨のためピクニックを中止しなければならなかった。", answerJa: "中止する" },
    "P1_069": { ja: "あなたの作文はすばらしい。", answerJa: "ほとんどない" },
    "P1_070": { ja: "その会社はこの春、新しく10人の労働者を雇う予定だ。", answerJa: "雇われた" },
    "P1_071": { ja: "生徒たちはよりよい文化祭のための案を出した。", answerJa: "提案" },
    "P1_072": { ja: "彼女は口論を避けるため、彼の発言が聞こえなかったふりをした。", answerJa: "～のふりをした" },
    "P1_073": { ja: "親は子どもを守らなければならない。", answerJa: "責任" },
    "P1_074": { ja: "私の携帯は古すぎるので、新しいものに替えるべきだ。", answerJa: "取り替える" },
    "P1_075": { ja: "この規則は学校のすべての生徒にとって重要だ。", answerJa: "重要な" },
    "P1_076": { ja: "私は駅で以前の先生に偶然会った。", answerJa: "たまたま～した" },
    "P1_077": { ja: "そのチームは決勝戦に勝つために一生懸命努力した。", answerJa: "努力" },
    "P1_078": { ja: "米の値段は最近高くなっている。", answerJa: "上がった" },
    "P1_079": { ja: "私は試験の結果を残念に思っている。", answerJa: "失望した" },
    "P1_080": { ja: "その理科の問題は私には難しすぎた。", answerJa: "理解する" },
    "P1_081": { ja: "私はできるだけはっきりその問いに答えた。", answerJa: "能力" },
    "P1_082": { ja: "私はこの機械の使い方が理解できなかった。", answerJa: "理解する" },
    "P1_083": { ja: "ケンはその新しい校則に反対している。", answerJa: "反対する" },
    "P1_084": { ja: "このコンピュータは私の古いものより優れている。", answerJa: "よりよい" },
    "P1_085": { ja: "彼女がその結果に腹を立てるのはもっともだ。", answerJa: "当然の、自然な" },
    "P1_086": { ja: "その主将はすべての選手に尊敬されている。", answerJa: "尊敬されて" },
    "P1_087": { ja: "エミは留学する決心をした。", answerJa: "決定" },
    "P1_088": { ja: "列車は予定通り到着した。", answerJa: "予定通りに" },
    "P1_089": { ja: "私は喜んであなたの質問に答えます。", answerJa: "進んで～する" },
    "P1_090": { ja: "今日は夕食代を払わなくてよい。私が招待したのだから。", answerJa: "私のおごり" },
    "P1_091": { ja: "先生は私を説得してスピーチコンテストに出場させた。", answerJa: "説得した" },
    "P1_092": { ja: "健康がお金より大切なのは言うまでもない。", answerJa: "言うまでもなく" },
    "P1_093": { ja: "建物の中では帽子を取ってください。", answerJa: "取り外す、脱ぐ" },
    "P1_094": { ja: "太陽がなければ、植物は育たないだろう。", answerJa: "～がなければ" },
    "P1_095": { ja: "今夜のショーには空いている席がない。", answerJa: "予約済みの" },
    "P1_096": { ja: "オリンピックは4年ごとに行われる。", answerJa: "行われる、起こる" },
    "P1_097": { ja: "教室にはたった10人の生徒しかいない。", answerJa: "より多く" },
    "P1_098": { ja: "父は朝、必ず新聞を読む。", answerJa: "いつも" },
    "P1_099": { ja: "私たちは行事の前に対処すべき問題を多く抱えている。", answerJa: "対処する" },
    "P1_100": { ja: "この仕事には慎重な計画が必要だ。", answerJa: "必要とする" },
    "P1_101": { ja: "兄は私の2倍のCDを持っている。", answerJa: "数" },
    "P1_102": { ja: "自由時間を活用すべきだ。", answerJa: "利用する" },
    "P1_103": { ja: "私は電車の中で昔のクラスメートを偶然見かけた。", answerJa: "偶然に" },
    "P1_104": { ja: "この文の意味がわからない。", answerJa: "意味をなす" },
    "P1_105": { ja: "彼の助言がなかったら、私は失敗していただろう。", answerJa: "～がなければ" },
    "P1_106": { ja: "この歌を聞くたびに、私は子どものころを思い出す。", answerJa: "思い出させる" },
    "P1_107": { ja: "ブラウン氏は営業部を担当している。", answerJa: "責任がある、担当している" },
    "P1_108": { ja: "私はそのメッセージの意味を理解できなかった。", answerJa: "理解する" },
    "P1_109": { ja: "多くの子どもたちは十分な食べ物がなく困っている。", answerJa: "苦しんで" },
    "P1_110": { ja: "天気が悪くなければ、運動会は明日行われる。", answerJa: "もし～でなければ" },
    "P1_111": { ja: "そんな信じられない話をいったい誰が信じられるだろうか。", answerJa: "誰も～ない" },
    "P1_112": { ja: "私はもう彼の失礼なふるまいには我慢できない。", answerJa: "我慢する" },
    "P1_113": { ja: "ケンは祖父に似ている。", answerJa: "似ている" },
    "P1_114": { ja: "兄はよく大事なことを忘れる。", answerJa: "習慣、癖" },
    "P1_115": { ja: "この申込書に記入する必要がある。", answerJa: "完成させる、記入する" },
    "P1_116": { ja: "その車は危うくその老人にぶつかるところだった。", answerJa: "ほとんど、危うく" },
    "P1_117": { ja: "この記事は日本文化を理解するのに役立つだろう。", answerJa: "理解する" },
    "P1_118": { ja: "その便は濃い霧のため遅れた。", answerJa: "遅らされた" },
    "P1_119": { ja: "ユミはフランス語を上手に話す。", answerJa: "流ちょうに" },
    "P1_120": { ja: "台風がその島に向かって来ている。", answerJa: "近づいている" },
    "P1_121": { ja: "彼は犬が死んだ後、その悲しみを乗り越えた。", answerJa: "回復した" },
    "P1_122": { ja: "生徒たちはそのスピーチを暗記した。", answerJa: "暗記した" },
    "P1_123": { ja: "トムは学校行事の計画を担当している。", answerJa: "責任がある、担当している" },
    "P1_124": { ja: "彼女の助言がなかったなら、私は大きな間違いをしていただろう。", answerJa: "～がなければ" },
    "P1_125": { ja: "私は早いバスに間に合わなかった。", answerJa: "乗り遅れた" },
    "P1_126": { ja: "エマは6歳まで叔母に育てられた。", answerJa: "育てられた" },
    "P1_127": { ja: "UN という文字は『国際連合』を表す。", answerJa: "表す" },
    "P1_128": { ja: "彼女に才能があることは否定できない。", answerJa: "不可能な" },
    "P1_129": { ja: "その映画はとても感動的で、多くの人が泣いた。", answerJa: "感動した、心を動かされた" },
    "P1_130": { ja: "進化の過程で、重要な変化が起こる。", answerJa: "起こる、発生する" },
    "P1_131": { ja: "勉強しなければ、その試験に受からないだろう。", answerJa: "ありそうにない" },
    "P1_132": { ja: "その式典は予定通り始まった。", answerJa: "予定通りに" },
    "P1_133": { ja: "妹はよく電気をつけっぱなしにする。", answerJa: "習慣、癖" },
    "P1_134": { ja: "彼の約束を当てにしてはいけない。", answerJa: "信頼する、当てにする" },
    "P1_135": { ja: "この記事は私には理解を超えている。", answerJa: "理解する、ついていく" },
    "P1_136": { ja: "5分でその仕事を終えようとしても無駄だ。", answerJa: "無駄な、役に立たない" },
    "P1_137": { ja: "彼女は息子の健康を心配している。", answerJa: "不安な、心配して" },
    "P1_138": { ja: "人をからかうほど愚かではないはずだ。", answerJa: "賢い" },
    "P1_139": { ja: "ニューヨークに着いたら手紙を書くよ。", answerJa: "～に手紙を書く、連絡する" },
    "P1_140": { ja: "私たちは嵐のためコンサートを延期しなければならなかった。", answerJa: "強いて～させた" },
    "P1_141": { ja: "ケンはピアノが弾けないし、ましてバイオリンなど弾けない。", answerJa: "まして～ない" },
        "P1_142": { ja: "多くの生徒が放課後にボランティア活動に参加します。", answerJa: "～に参加する" },
    "P1_143": { ja: "リナは文化祭の企画に関わっています。", answerJa: "参加、関与" },
    "P1_144": { ja: "地元の店は町の経済を支えるのに役立っています。", answerJa: "～に貢献する" },
    "P1_145": { ja: "道路が混んでいたにもかかわらず、バスは時間通りに到着しました。", answerJa: "～にもかかわらず" },
    "P1_146": { ja: "どれだけ注意深く確認しても、まだ間違いが見つかるかもしれません。", answerJa: "どれだけ～しても" },
    "P1_147": { ja: "何が起こっても、私たちは計画に従うべきです。", answerJa: "何が～しても" },
    "P1_148": { ja: "前もって書類を送ってください。", answerJa: "前もって" },
    "P1_149": { ja: "その店は本を売ることに加えて、小さなイベントも開催しています。", answerJa: "～に加えて、～だけでなく" },
    "P1_150": { ja: "兄とは対照的に、ケンは静かで注意深いです。", answerJa: "～と違って" },
    "P1_151": { ja: "その調査によると、より多くの生徒がデジタル教科書を使っています。", answerJa: "～に基づいて、～によると" },
    "P1_152": { ja: "そのピクニックは大雨のため中止されました。", answerJa: "～のために、～が原因で" },
    "P1_153": { ja: "昨夜、その工場で火事が発生しました。", answerJa: "起こった、発生した" },
    "P1_154": { ja: "住民は市により安全な道路を求めました。", answerJa: "要求した、要請した" },
    "P1_155": { ja: "レポートを終えたので、あなたは帰ってもよいです。", answerJa: "今や～なので、～だから" },
    "P1_156": { ja: "使ったあとに掃除する限り、この部屋を使ってもよいです。", answerJa: "～する限り" },
    "P1_157": { ja: "何人かの生徒はその速い授業についていけませんでした。", answerJa: "～についていく" },
    "P1_158": { ja: "提出する前にレポートをもう一度確認すべきです。", answerJa: "～をざっと確認する" },
    "P1_159": { ja: "テストの前に今日の授業を復習しましょう。", answerJa: "～を復習する、確認する" },
    "P1_160": { ja: "ベティは面接中、落ち着きませんでした。", answerJa: "落ち着かない、不安である" },
    "P1_161": { ja: "親切なスタッフのおかげで訪問者は安心しました。", answerJa: "安心して、くつろいで" },
    "P1_162": { ja: "彼女はチームを率いる責任を引き受けました。", answerJa: "～を引き受ける" },
    "P1_163": { ja: "社長が退職した後、佐藤さんがその会社を引き継ぎました。", answerJa: "～を引き継ぐ" },
    "P1_164": { ja: "生徒たちは食堂を改善するための案を出しました。", answerJa: "提案する" },
    "P1_165": { ja: "委員会は新しい安全計画を提案しました。", answerJa: "提案する、提示する" },
    "P1_166": { ja: "オンライン会議はいくつかの出張に取って代わるかもしれません。", answerJa: "～に取って代わる" },
    "P1_167": { ja: "この本は読む価値があります。", answerJa: "価値がある" },
    "P1_168": { ja: "よいコミュニケーションはチームワークの成功に不可欠です。", answerJa: "不可欠な、とても重要な" },
    "P1_169": { ja: "あなたはこの会計ソフトをよく知っていますか。", answerJa: "よく、十分に" },
    "P1_170": { ja: "私は今でもホストファミリーと連絡を取り合っています。", answerJa: "連絡を取り合って" },
    "P1_171": { ja: "出発する前にホテルに連絡してください。", answerJa: "連絡する" },
    "P1_172": { ja: "顧客はその新しいサービスにがっかりしました。", answerJa: "満足している" },
    "P1_173": { ja: "生徒たちはその行事の結果に満足していました。", answerJa: "満足して、喜んで" },
    "P1_174": { ja: "その説明は初心者が理解するには複雑すぎました。", answerJa: "できなかった" },
    "P1_175": { ja: "多くの生徒は英語で意見を表現するのに苦労しています。", answerJa: "難しい" },
    "P1_176": { ja: "彼女はその事務所を見つけるのに苦労しました。", answerJa: "苦労した" },
    "P1_177": { ja: "生徒たちはオンラインで個人情報を共有する危険性に気づきました。", answerJa: "気づいた、認識した" },
    "P1_178": { ja: "彼は英語を自在に使えます。", answerJa: "流ちょうな、堪能な" },
    "P1_179": { ja: "締め切りが近づくにつれて、みんなはより忙しくなりました。", answerJa: "近づいた" },
    "P1_180": { ja: "私たちは費用を考慮に入れるべきです。", answerJa: "考慮する" },
    "P1_181": { ja: "何人かの生徒は彼のアクセントをからかいました。", answerJa: "～をからかった、笑った" },
    "P1_182": { ja: "この問題は地域経済と関係しています。", answerJa: "関係している" },
    "P1_183": { ja: "その事故は新しいシステムとは関係がありませんでした。", answerJa: "関係がない" },
    "P1_184": { ja: "この研修講座は初心者に適しています。", answerJa: "適切な、ふさわしい" },
    "P1_185": { ja: "私たちはテスト中に時間を使い果たしました。", answerJa: "使い果たした" },
    "P1_186": { ja: "私たちは事故を防ぐために対策を取らなければなりません。", answerJa: "行動、対策" },
    "P1_187": { ja: "彼女は残業することで自分のミスを埋め合わせました。", answerJa: "埋め合わせた、補償した" },
    "P1_188": { ja: "ケンは自分の故郷を誇りに思っています。", answerJa: "誇り" },
    "P1_189": { ja: "ミカは国際ビジネスに興味があります。", answerJa: "興味" },
    "P1_190": { ja: "予定の変更に注意を払ってください。", answerJa: "注意、気づき" },
    "P1_191": { ja: "チケットを忘れないように気をつけなさい。", answerJa: "注意深い、気をつけて" },
    "P1_192": { ja: "私たちは金曜日までにレポートを提出することになっています。", answerJa: "～することになっている、期待されている" },
    "P1_193": { ja: "祖母は一人暮らしに慣れています。", answerJa: "慣れている" },
    "P1_194": { ja: "彼女は試験に合格するために一生懸命勉強しました。", answerJa: "～するために" },
    "P1_195": { ja: "緊急事態の場合にはこのボタンを使ってください。", answerJa: "～の場合には" },
    "P1_196": { ja: "雨が降るといけないので傘を持っていきなさい。", answerJa: "～の場合に備えて" },
    "P1_197": { ja: "私の知る限りでは、その店は今日閉まっています。", answerJa: "私の知る限りでは" },
    "P1_198": { ja: "私の意見では、最初の計画の方がよいです。", answerJa: "私の意見では、私に関する限り" }
  };

  const CHOICE_JA = {

  "P1_001": [
    "熱望して、ぜひ～したい",
    "心配して",
    "欠席して",
    "準備ができて"
  ],

  "P1_002": [
    "～を担当して",
    "～を欠席して",
    "ぜひ～したい",
    "～にはほど遠い"
  ],

  "P1_003": [
    "受け入れた",
    "断った、拒否した",
    "説明した",
    "準備した"
  ],

  "P1_004": [
    "今までに",
    "すでに",
    "まだ、もう",
    "まだ、依然として"
  ],

  "P1_005": [
    "できるだけ早く",
    "偶然に",
    "一目見て",
    "～を担当して"
  ],

  "P1_006": [
    "引き起こした",
    "受け取った",
    "守った",
    "含んだ"
  ],

  "P1_007": [
    "欠席して",
    "出席して",
    "異なって",
    "自由な"
  ],

  "P1_008": [
    "操作すること（動名詞）",
    "操作された",
    "操作すること（不定詞）",
    "操作"
  ],

  "P1_009": [
    "増加して、上昇して",
    "時間通りに",
    "危険にさらされて",
    "お返しに"
  ],

  "P1_010": [
    "どのように",
    "なぜ",
    "いつ",
    "どこで"
  ],

  "P1_011": [
    "成功した",
    "失敗した",
    "練習した",
    "避けた"
  ],

  "P1_012": [
    "必要な",
    "即座の",
    "便利な",
    "意図的な"
  ],

  "P1_013": [
    "考え、見当",
    "答え",
    "理由",
    "結果"
  ],

  "P1_014": [
    "すぐに",
    "わざと",
    "偶然に",
    "詳しく"
  ],

  "P1_015": [
    "理解する",
    "繰り返す",
    "説明する、描写する",
    "紹介する"
  ],

  "P1_016": [
    "知られている",
    "建てられた",
    "作られた",
    "使われた"
  ],

  "P1_017": [
    "偶然に",
    "わざと",
    "すぐに",
    "詳しく"
  ],

  "P1_018": [
    "導入する、持ち込む",
    "脱ぐ、離陸する",
    "～の世話をする",
    "作り上げる、埋め合わせる"
  ],

  "P1_019": [
    "許されて",
    "招待されて",
    "命じられて",
    "助けられて"
  ],

  "P1_020": [
    "無視する",
    "解決する",
    "気づく",
    "説明する"
  ],

  "P1_021": [
    "よりよく、もっと",
    "より悪く",
    "より少なく",
    "より少数の"
  ],

  "P1_022": [
    "～につながった",
    "～を探した",
    "～に頼った",
    "～に似ていた"
  ],

  "P1_023": [
    "すまなく思って",
    "怒って",
    "準備ができて",
    "有名で"
  ],

  "P1_024": [
    "より少なく",
    "より多く",
    "より悪く",
    "いっぱいの"
  ],

  "P1_025": [
    "～の世話をする",
    "～を断る",
    "～を調査する",
    "～に似ている"
  ],

  "P1_026": [
    "同意した",
    "議論した",
    "失敗した",
    "残った"
  ],

  "P1_027": [
    "予測すること",
    "予測すること（動名詞）",
    "予測された",
    "予測"
  ],

  "P1_028": [
    "強く勧めた、促した",
    "妨げた",
    "拒否した",
    "避けた"
  ],

  "P1_029": [
    "心に浮かぶ",
    "起こる、行われる",
    "発生する、勃発する",
    "断る"
  ],

  "P1_030": [
    "より小さく",
    "より大きく",
    "より高く",
    "より広く"
  ],

  "P1_031": [
    "もし～でなければ",
    "～だけれども",
    "～なので",
    "～なので"
  ],

  "P1_032": [
    "守られた",
    "汚染された",
    "無駄にされた",
    "避けられた"
  ],

  "P1_033": [
    "～を必要とする",
    "～を乗り越える",
    "～を断る",
    "～の世話をする"
  ],

  "P1_034": [
    "～のために、～が原因で",
    "～と異なって",
    "～を誇りに思って",
    "～でいっぱいで"
  ],

  "P1_035": [
    "発生",
    "翻訳",
    "装飾",
    "説明"
  ],

  "P1_036": [
    "世界的に",
    "頻繁に",
    "同時に",
    "地域的に"
  ],

  "P1_037": [
    "不足",
    "集団",
    "一組",
    "群衆"
  ],

  "P1_038": [
    "最高の状態で",
    "～を担当して",
    "偶然に",
    "進行中で"
  ],

  "P1_039": [
    "克服する",
    "招待する",
    "借りる",
    "繰り返す"
  ],

  "P1_040": [
    "覆っている",
    "選んでいる",
    "失っている",
    "建てている"
  ],

  "P1_041": [
    "～にはほど遠い",
    "～が得意で",
    "～の準備ができて",
    "～に似て"
  ],

  "P1_042": [
    "促進した",
    "拒否した",
    "破壊した",
    "訂正した"
  ],

  "P1_043": [
    "要求した、要請した",
    "疑った",
    "避けた",
    "借りた"
  ],

  "P1_044": [
    "～なので",
    "もし～でなければ",
    "～だけれども",
    "～する前に"
  ],

  "P1_045": [
    "作った、なした",
    "与えた",
    "取った",
    "持っていた"
  ],

  "P1_046": [
    "確認する",
    "描く",
    "中止する",
    "印刷する"
  ],

  "P1_047": [
    "意図的に、わざと",
    "偶然に",
    "突然",
    "幸運にも"
  ],

  "P1_048": [
    "最も～しそうにない",
    "最も注意深い",
    "最も～しそうな",
    "最もよい"
  ],

  "P1_049": [
    "使う",
    "失う",
    "逃す",
    "隠す"
  ],

  "P1_050": [
    "不安な、心配して",
    "快適な",
    "満足して",
    "くつろいで"
  ],

    "P1_051": [
    "時々",
    "決して～ない",
    "いつも",
    "ほとんど～ない"
  ],

  "P1_052": [
    "説明する",
    "立つ、耐える",
    "取る",
    "行く"
  ],

  "P1_053": [
    "～に反対して",
    "～に賛成して",
    "～の近くに",
    "～の下に"
  ],

  "P1_054": [
    "～に貢献する",
    "～に似ている",
    "あきらめる",
    "延期する"
  ],

  "P1_055": [
    "～を必要とする",
    "脱ぐ、離陸する",
    "発生する",
    "断る"
  ],

  "P1_056": [
    "機会",
    "間違い",
    "病気",
    "温度"
  ],

  "P1_057": [
    "一目",
    "終わり",
    "どんな代価を払っても",
    "最後"
  ],

  "P1_058": [
    "率直に言えば",
    "たいてい",
    "突然",
    "軽く"
  ],

  "P1_059": [
    "調査した",
    "祝った",
    "紹介した",
    "翻訳した"
  ],

  "P1_060": [
    "不可能な",
    "不注意な",
    "役に立つ",
    "自然な"
  ],

  "P1_061": [
    "取り除く",
    "増やす",
    "受け入れる",
    "借りる"
  ],

  "P1_062": [
    "～における進歩",
    "～についての間違い",
    "～についての約束",
    "～の余地"
  ],

  "P1_063": [
    "すぐに、まもなく",
    "最近",
    "ついに",
    "一度"
  ],

  "P1_064": [
    "公開された、発表された",
    "隠された",
    "修理された",
    "拒否された"
  ],

  "P1_065": [
    "拒否した",
    "申し出た",
    "同意した",
    "なんとか～した"
  ],

  "P1_066": [
    "軽い、わずかな",
    "重い",
    "強い",
    "深刻な"
  ],

  "P1_067": [
    "独立して",
    "～が好きで",
    "～でいっぱいで",
    "～を恐れて"
  ],

  "P1_068": [
    "中止する",
    "延長する",
    "完成する",
    "出席する"
  ],

  "P1_069": [
    "ほとんどない",
    "多くの",
    "いくつかの",
    "十分な"
  ],

  "P1_070": [
    "雇われた",
    "解雇された",
    "責められた",
    "訓練された"
  ],

  "P1_071": [
    "提案",
    "間違い",
    "言い訳",
    "価格"
  ],

  "P1_072": [
    "～のふりをした",
    "たまたま～した",
    "決めた",
    "拒否した"
  ],

  "P1_073": [
    "責任",
    "困難",
    "可能性",
    "経験"
  ],

  "P1_074": [
    "取り替える",
    "減らす",
    "修理する",
    "尊敬する"
  ],

  "P1_075": [
    "重要な",
    "不可解な",
    "外国の",
    "私的な"
  ],

  "P1_076": [
    "たまたま～した",
    "決めた",
    "望んだ",
    "約束した"
  ],

  "P1_077": [
    "努力",
    "進歩",
    "お金",
    "損害"
  ],

  "P1_078": [
    "上がった",
    "下がった",
    "下落した",
    "消えた"
  ],

  "P1_079": [
    "失望した",
    "興奮した",
    "満足した、喜んだ",
    "くつろいだ"
  ],

  "P1_080": [
    "理解する",
    "聞く",
    "信じる",
    "触る"
  ],

  "P1_081": [
    "能力",
    "記憶",
    "意見",
    "約束"
  ],

  "P1_082": [
    "理解する、解明する",
    "運ぶ",
    "置く",
    "回す"
  ],

  "P1_083": [
    "意見が合わない、反対する",
    "同意する",
    "対処する",
    "比較する"
  ],

  "P1_084": [
    "よりよい",
    "より悪い",
    "より遅い",
    "より小さい"
  ],

  "P1_085": [
    "当然の、自然な",
    "不可能な",
    "不必要な",
    "不注意な"
  ],

  "P1_086": [
    "尊敬された",
    "疑われた",
    "無視された",
    "修理された"
  ],

  "P1_087": [
    "決定",
    "間違い",
    "違い",
    "規則"
  ],

  "P1_088": [
    "予定通りに",
    "わざと",
    "乗車・搭乗して",
    "販売中で"
  ],

  "P1_089": [
    "進んで～する",
    "～しそうな",
    "～できない",
    "～することになっている"
  ],

  "P1_090": [
    "私のおごりで",
    "偶然に",
    "すぐに",
    "予定通りに"
  ],

  "P1_091": [
    "説得した",
    "拒否した",
    "許可した",
    "強制した"
  ],

  "P1_092": [
    "言うまでもなく",
    "奇妙な",
    "幸運な",
    "注意深い"
  ],

  "P1_093": [
    "取り除く、脱ぐ",
    "身につける",
    "磨く",
    "運ぶ"
  ],

  "P1_094": [
    "～がなければ",
    "～の下で",
    "～なので",
    "～を通して"
  ],

  "P1_095": [
    "予約済みの",
    "空いている",
    "壊れた",
    "掃除された"
  ],

  "P1_096": [
    "行われる、起こる",
    "調査する",
    "乗り越える",
    "偶然出会う"
  ],

  "P1_097": [
    "より多く",
    "より少なく",
    "よりよく",
    "より大きく"
  ],

  "P1_098": [
    "いつも",
    "時々",
    "めったに～ない",
    "決して～ない"
  ],

  "P1_099": [
    "対処する",
    "避ける",
    "損なう",
    "比較する"
  ],

  "P1_100": [
    "必要とする",
    "食べ物を与える",
    "仕える、提供する",
    "加える"
  ],

    "P1_101": [
    "数",
    "大きさ",
    "高さ",
    "重さ"
  ],

  "P1_102": [
    "～を活用する",
    "～をからかう",
    "～を楽しみにする",
    "～と連絡を取り合う"
  ],

  "P1_103": [
    "偶然に",
    "わざと",
    "すぐに",
    "詳しく"
  ],

  "P1_104": [
    "意味をなす",
    "起こる",
    "偶然出会う",
    "延期する"
  ],

  "P1_105": [
    "～がなければ",
    "～とともに",
    "～に反対して",
    "～の下で"
  ],

  "P1_106": [
    "思い出させる",
    "覚えている",
    "似ている",
    "取り除く"
  ],

  "P1_107": [
    "責任がある、担当している",
    "適している",
    "ぜひ～したい",
    "遅れて"
  ],

  "P1_108": [
    "理解する、解明する",
    "運ぶ",
    "広げる",
    "得る"
  ],

  "P1_109": [
    "苦しんで",
    "退職して",
    "祝って",
    "分離して"
  ],

  "P1_110": [
    "もし～でなければ",
    "～なので",
    "～だけれども",
    "～なので、～として"
  ],

  "P1_111": [
    "誰も～ない",
    "誰でも",
    "みんな",
    "誰か"
  ],

  "P1_112": [
    "我慢する",
    "楽しむ",
    "覚えている",
    "予期する"
  ],

  "P1_113": [
    "～に似ている",
    "～を尊敬する",
    "～を推薦する",
    "～だと分かる、認識する"
  ],

  "P1_114": [
    "習慣、癖",
    "障害",
    "調和",
    "正直さ"
  ],

  "P1_115": [
    "完成させる、記入する",
    "集める",
    "持ってくる",
    "申し出る"
  ],

  "P1_116": [
    "ほとんど、危うく",
    "ほとんど～ない",
    "完全に",
    "めったに～ない"
  ],

  "P1_117": [
    "～を理解する",
    "～を見下す",
    "～を罰を受けずに切り抜ける",
    "～を使い果たす"
  ],

  "P1_118": [
    "遅らされた",
    "破壊された",
    "壊れた",
    "動けなくなった"
  ],

  "P1_119": [
    "流ちょうに",
    "下手に",
    "静かに",
    "大声で"
  ],

  "P1_120": [
    "近づいている",
    "離れている",
    "壊している",
    "横切っている"
  ],

  "P1_121": [
    "回復した",
    "苦しんだ",
    "学んだ",
    "聞いた"
  ],

  "P1_122": [
    "暗記した",
    "作り出した",
    "写した",
    "復習した"
  ],

  "P1_123": [
    "責任がある、担当している",
    "遅れて",
    "ぜひ～したい",
    "有名で"
  ],

  "P1_124": [
    "～がなければ",
    "～とともに",
    "～に反対して",
    "～の下で"
  ],

  "P1_125": [
    "乗り遅れた",
    "失った",
    "乗った",
    "見た"
  ],

  "P1_126": [
    "育てられた",
    "ほめられた",
    "叱られた",
    "甘やかされた"
  ],

  "P1_127": [
    "表す",
    "申し出る",
    "採用する",
    "疑う"
  ],

  "P1_128": [
    "不可能な",
    "自然な",
    "普通の",
    "疑わしい"
  ],

  "P1_129": [
    "感動した、心を動かされた",
    "失望した",
    "おびえた",
    "悩まされた"
  ],

  "P1_130": [
    "起こる、発生する",
    "残る",
    "消える",
    "繰り返す"
  ],

  "P1_131": [
    "ありそうにない",
    "ありそうな",
    "自然な",
    "明らかな"
  ],

  "P1_132": [
    "予定通りに",
    "予定より遅れて",
    "ついに",
    "放送中で"
  ],

  "P1_133": [
    "習慣、癖",
    "趣味",
    "方針",
    "理論"
  ],

  "P1_134": [
    "信頼する、当てにする",
    "邪魔する",
    "許す",
    "訪れる"
  ],

  "P1_135": [
    "理解する、ついていく",
    "買う",
    "推測する",
    "見つける"
  ],

  "P1_136": [
    "無駄な、役に立たない",
    "不注意な",
    "非常に貴重な",
    "時代を超えた"
  ],

  "P1_137": [
    "不安な、心配して",
    "興奮して",
    "喜んで",
    "満足して"
  ],

  "P1_138": [
    "賢い",
    "勇敢な",
    "落ち着いた",
    "親切な"
  ],

  "P1_139": [
    "～に手紙を書く",
    "～に似ている",
    "～を調査する",
    "延期する"
  ],

  "P1_140": [
    "強いて～させた",
    "望んだ",
    "予期した",
    "命じた"
  ],

  "P1_141": [
    "まして～ない",
    "もっと",
    "よりよく",
    "より悪く"
  ],

  "P1_142": [
    "～に参加する",
    "～に頼る",
    "～を調査する",
    "延期する"
  ],

  "P1_143": [
    "参加、役割",
    "世話",
    "責任、担当",
    "場所"
  ],

  "P1_144": [
    "～に貢献する",
    "～に頼る",
    "～に対処する",
    "～の世話をする"
  ],

  "P1_145": [
    "～にもかかわらず",
    "～のために",
    "～によると",
    "～の代わりに"
  ],

  "P1_146": [
    "どれだけ～しても",
    "いつ～しても",
    "どこで～しても",
    "何が～しても"
  ],

  "P1_147": [
    "何が～しても",
    "いつ～しても",
    "どこで～しても",
    "どれだけ～しても"
  ],

  "P1_148": [
    "前もって",
    "～とは対照的に",
    "実際に",
    "お返しに"
  ],

  "P1_149": [
    "～に加えて",
    "～のために",
    "～の代わりに",
    "～にはほど遠い"
  ],

  "P1_150": [
    "～とは違って",
    "～によると",
    "～のおかげで",
    "～にもかかわらず"
  ],

    "P1_151": [
    "～に基づいて",
    "～は別として",
    "～のために",
    "～の代わりに"
  ],

  "P1_152": [
    "～のために、～が原因で",
    "～にはほど遠い",
    "～に似て",
    "～に気づいて"
  ],

  "P1_153": [
    "起こった、発生した",
    "残った",
    "減少した",
    "改善した"
  ],

  "P1_154": [
    "要求した、要請した",
    "提案した",
    "妨げた",
    "拒否した"
  ],

  "P1_155": [
    "今や～なので",
    "～する限り",
    "たとえ～でも",
    "～の場合に備えて"
  ],

  "P1_156": [
    "～する限り",
    "～するとすぐに",
    "どれだけ～しても",
    "～だけれども"
  ],

  "P1_157": [
    "～についていく",
    "～を尊敬する",
    "～を取り除く",
    "～の世話をする"
  ],

  "P1_158": [
    "～をざっと確認する",
    "～の世話をする",
    "～を調査する",
    "～を尊敬する"
  ],

  "P1_159": [
    "～を復習する、確認する",
    "～を引き継ぐ",
    "～をひっくり返す",
    "～を乗り越える"
  ],

  "P1_160": [
    "落ち着かない、不安で",
    "わざと",
    "担当して",
    "一目見て"
  ],

  "P1_161": [
    "安心して、くつろいで",
    "前もって",
    "～の理由で",
    "進行中で"
  ],

  "P1_162": [
    "～を引き受けた",
    "～を断った",
    "～を延期した",
    "～をあきらめた"
  ],

  "P1_163": [
    "～を引き継いだ",
    "～に似ていた",
    "離陸した、脱いだ",
    "～に参加した"
  ],

  "P1_164": [
    "提案をした",
    "言い訳をした",
    "努力をした",
    "間違いをした"
  ],

  "P1_165": [
    "～を提案した、提示した",
    "～を延期した",
    "～を我慢した",
    "～を消した"
  ],

  "P1_166": [
    "～に取って代わる",
    "～の世話をする",
    "～に注意を向ける",
    "～を誇りに思う"
  ],

  "P1_167": [
    "価値がある",
    "望みがない",
    "不注意な",
    "よく知っている"
  ],

  "P1_168": [
    "不可欠な、極めて重要な",
    "似ている",
    "独立している",
    "関係がない"
  ],

  "P1_169": [
    "よく、十分に",
    "注意深く",
    "突然",
    "めったに～ない"
  ],

  "P1_170": [
    "～と連絡を取り合って",
    "～とは対照的に",
    "～を担当して",
    "～にもかかわらず"
  ],

  "P1_171": [
    "連絡する",
    "比較する",
    "似ている",
    "表す"
  ],

  "P1_172": [
    "満足して",
    "よく知って、慣れて",
    "気づいて",
    "関係して"
  ],

  "P1_173": [
    "満足して、喜んで",
    "恥じて",
    "関係して",
    "不足して"
  ],

  "P1_174": [
    "できなかった",
    "すべきではなかった",
    "してはいけなかった",
    "しなかった"
  ],

  "P1_175": [
    "難しい",
    "必要な",
    "適している",
    "可能な"
  ],

  "P1_176": [
    "苦労した",
    "なんとか～した",
    "申し出た",
    "決めた"
  ],

  "P1_177": [
    "気づいた、認識した",
    "減らした",
    "取り替えた",
    "勧めた"
  ],

  "P1_178": [
    "流ちょうな、堪能な",
    "よく知っている",
    "満足している",
    "気づいている"
  ],

  "P1_179": [
    "近づいた",
    "残った",
    "起こった",
    "減少した"
  ],

  "P1_180": [
    "考慮する",
    "無視する",
    "拒否する",
    "取り除く"
  ],

  "P1_181": [
    "～を笑った、からかった",
    "～の世話をした",
    "～に対処した",
    "～に頼った"
  ],

  "P1_182": [
    "関係している",
    "満足している",
    "よく知っている",
    "満たされている"
  ],

  "P1_183": [
    "関係がない",
    "似ている",
    "適している",
    "重要な"
  ],

  "P1_184": [
    "適切な、ふさわしい",
    "責任がある",
    "有名な",
    "不安な"
  ],

  "P1_185": [
    "使い果たした",
    "延期した",
    "調査した",
    "引き継いだ"
  ],

  "P1_186": [
    "行動、対策",
    "注意、気づき",
    "誇り",
    "役割、参加"
  ],

  "P1_187": [
    "埋め合わせた、補償した",
    "謝った",
    "要求した",
    "調べた"
  ],

  "P1_188": [
    "誇り",
    "参加、役割",
    "場所",
    "世話"
  ],

  "P1_189": [
    "興味",
    "考慮",
    "利点",
    "影響、効果"
  ],

  "P1_190": [
    "注意、気づき",
    "誇り",
    "参加、役割",
    "場所"
  ],

  "P1_191": [
    "注意深い、気をつけて",
    "恐れて",
    "よく知って、慣れて",
    "流ちょうな"
  ],

  "P1_192": [
    "～することになっている、期待されている",
    "強制されている",
    "許可されている",
    "進んで～する"
  ],

  "P1_193": [
    "慣れている",
    "準備ができている",
    "～することになっている",
    "～しそうな"
  ],

  "P1_194": [
    "～するために",
    "～の場合には",
    "～する限り",
    "たとえ～でも"
  ],

  "P1_195": [
    "～の場合には",
    "～によると",
    "～にもかかわらず",
    "～の結果として"
  ],

  "P1_196": [
    "～の場合に備えて",
    "～する限り",
    "今や～なので",
    "何があっても"
  ],

  "P1_197": [
    "私の知る限りでは",
    "～とは対照的に",
    "～する目的で",
    "～に加えて"
  ],

  "P1_198": [
    "私の意見では、私に関する限り",
    "事故の場合には",
    "～の結果として",
    "何があっても"
  ]

};


  const POINTS = {

   "P1_001": {
    pointA: "look forward to seeing",
    pointB: "be eager to see",
    pointNote: "look forward to ～ing は「～するのを楽しみにする」。be eager to do は「ぜひ～したい」という強い期待・希望を表す。"
  },

  "P1_002": {
    pointA: "be responsible for",
    pointB: "be in charge of",
    pointNote: "どちらも「～を担当している／～に責任がある」という意味で使われる。"
  },

  "P1_003": {
    pointA: "turn down",
    pointB: "refuse",
    pointNote: "turn down は提案・依頼・申し出などを「断る」。refuse と言い換えられる。"
  },

  "P1_004": {
    pointA: "have never seen such a beautiful view before",
    pointB: "the most beautiful view I have ever seen",
    pointNote: "「今までこんなに～なものを見たことがない」は、最上級＋ever を使って言い換えられる。"
  },

  "P1_005": {
    pointA: "make a decision",
    pointB: "decide",
    pointNote: "make a decision は「決定する」。動詞 decide と言い換えられる。"
  },

  "P1_006": {
    pointA: "was delayed because of heavy snow",
    pointB: "Heavy snow caused the delay",
    pointNote: "because of A で原因を表す文は、A caused B「AがBを引き起こした」と言い換えられる。"
  },

  "P1_007": {
    pointA: "didn’t attend",
    pointB: "was absent from",
    pointNote: "not attend「出席しない」は be absent from「～を欠席している」と言い換えられる。"
  },

  "P1_008": {
    pointA: "This machine is easy to operate",
    pointB: "It is easy to operate this machine",
    pointNote: "「物＋be easy to do」は、形式主語 it を使った It is easy to do ... に言い換えられる。"
  },

  "P1_009": {
    pointA: "has increased",
    pointB: "has been on the rise",
    pointNote: "increase「増加する」は be on the rise「増加傾向にある」と言い換えられる。"
  },

  "P1_010": {
    pointA: "the reason for your decision",
    pointB: "why you made that decision",
    pointNote: "the reason for ... は why＋文を使って「なぜ～したのか」と言い換えられる。"
  },

  "P1_011": {
    pointA: "was able to finish",
    pointB: "succeeded in finishing",
    pointNote: "実際に「～することができた」は succeed in ～ing「～することに成功した」と言い換えられる。"
  },

  "P1_012": {
    pointA: "We must protect",
    pointB: "It is necessary for us to protect",
    pointNote: "must do「～しなければならない」は It is necessary for A to do「Aが～することが必要だ」と言い換えられる。"
  },

  "P1_013": {
    pointA: "I don’t know",
    pointB: "I have no idea",
    pointNote: "have no idea は「分からない、見当がつかない」という意味。don’t know と近い意味になる。"
  },

  "P1_014": {
    pointA: "immediately",
    pointB: "at once",
    pointNote: "immediately と at once はどちらも「すぐに」。"
  },

  "P1_015": {
    pointA: "too difficult for me to understand",
    pointB: "so difficult that I couldn’t understand",
    pointNote: "too ... to do「…すぎて～できない」は so ... that S cannot/could not do と言い換えられる。"
  },

  "P1_016": {
    pointA: "be famous for",
    pointB: "be well known for",
    pointNote: "be famous for と be well known for はどちらも「～で有名である」。"
  },

  "P1_017": {
    pointA: "happened to meet",
    pointB: "met ... by chance",
    pointNote: "happen to do は「たまたま～する」。by chance「偶然に」を使って言い換えられる。"
  },

  "P1_018": {
    pointA: "introduce a new system",
    pointB: "bring in a new system",
    pointNote: "bring in は制度・方法などを「導入する」という意味で introduce と言い換えられる。"
  },

  "P1_019": {
    pointA: "should not speak",
    pointB: "are not allowed to speak",
    pointNote: "禁止を表す should not do は、文脈によって be not allowed to do「～することを許されていない」と言い換えられる。"
  },

  "P1_020": {
    pointA: "too serious to ignore",
    pointB: "so serious that we cannot ignore",
    pointNote: "too ... to do と so ... that S cannot do の重要な構文言い換え。"
  },

  "P1_021": {
    pointA: "prefer tea to coffee",
    pointB: "like tea better than coffee",
    pointNote: "prefer A to B「BよりAを好む」は like A better than B と言い換えられる。"
  },

  "P1_022": {
    pointA: "was canceled due to the storm",
    pointB: "The storm led to the cancellation",
    pointNote: "due to A で表した原因を、A lead to B「AがBにつながる」を使って言い換えている。"
  },

  "P1_023": {
    pointA: "apologized ... for being late",
    pointB: "said he was sorry for being late",
    pointNote: "apologize for ... は「～について謝る」。be sorry for ... を使って言い換えられる。"
  },

  "P1_024": {
    pointA: "reduce your pain",
    pointB: "make your pain less",
    pointNote: "reduce A「Aを減らす」は make A less「Aをより少なくする」と言い換えられる。"
  },

  "P1_025": {
    pointA: "take care of",
    pointB: "look after",
    pointNote: "take care of と look after はどちらも「～の世話をする」。"
  },

  "P1_026": {
    pointA: "reached an agreement",
    pointB: "agreed",
    pointNote: "reach an agreement「合意に達する」は動詞 agree「同意する」と言い換えられる。"
  },

  "P1_027": {
    pointA: "It is difficult to predict the result",
    pointB: "The result is difficult to predict",
    pointNote: "It is difficult to do A は、A is difficult to do の形に言い換えられる。"
  },

  "P1_028": {
    pointA: "encouraged us to study",
    pointB: "urged us to study",
    pointNote: "encourage A to do と urge A to do はどちらも「Aに～するよう促す」。urge の方が強く勧めるニュアンスがある。"
  },

  "P1_029": {
    pointA: "could not remember his name",
    pointB: "His name did not come to mind",
    pointNote: "come to mind は「心に浮かぶ、思い出される」。not remember を別の視点から表している。"
  },

  "P1_030": {
    pointA: "is decreasing",
    pointB: "is getting smaller",
    pointNote: "decrease「減少する」は get smaller「より小さくなる」と言い換えられる。"
  },

  "P1_031": {
    pointA: "If you don’t submit",
    pointB: "Unless you submit",
    pointNote: "if ... not は unless「もし～でなければ」を使って言い換えられる。"
  },

  "P1_032": {
    pointA: "We can protect the ocean by using less plastic",
    pointB: "The ocean can be protected by using less plastic",
    pointNote: "能動態 We can protect ... を受動態 ... can be protected に言い換えている。"
  },

  "P1_033": {
    pointA: "requires",
    pointB: "calls for",
    pointNote: "call for は「～を必要とする」。require と言い換えられる。"
  },

  "P1_034": {
    pointA: "Heavy traffic caused the delay",
    pointB: "The delay was due to heavy traffic",
    pointNote: "A caused B「AがBを引き起こした」は B was due to A「BはAが原因だった」と言い換えられる。"
  },

  "P1_035": {
    pointA: "stop accidents from happening",
    pointB: "prevent the occurrence of accidents",
    pointNote: "prevent A from ～ing「Aが～するのを防ぐ」を、prevent＋名詞 occurrence「発生」を使って言い換えている。"
  },

  "P1_036": {
    pointA: "used in many countries",
    pointB: "used globally",
    pointNote: "in many countries という内容を globally「世界的に」で簡潔に表している。"
  },

  "P1_037": {
    pointA: "because there were not enough participants",
    pointB: "due to a lack of participants",
    pointNote: "not enough A「Aが十分でない」は a lack of A「Aの不足」を使って言い換えられる。"
  },

  "P1_038": {
    pointA: "achieved its greatest success",
    pointB: "was at its best",
    pointNote: "at one’s best は「最高の状態で」。greatest success を表す文脈で使われている。"
  },

  "P1_039": {
    pointA: "tried hard to solve",
    pointB: "worked hard to overcome",
    pointNote: "try/work hard は「一生懸命取り組む」。solve a problem は overcome a problem と近い意味で使える。"
  },

  "P1_040": {
    pointA: "Snow covered the mountains",
    pointB: "There was snow covering the mountains",
    pointNote: "S＋V の文を There was A＋～ing の形に変え、covering が snow を後ろから説明している。"
  },

  "P1_041": {
    pointA: "not close to becoming",
    pointB: "far from becoming",
    pointNote: "far from ～ing は「～にはほど遠い」。not close to と近い意味になる。"
  },

  "P1_042": {
    pointA: "helped the local economy grow",
    pointB: "promoted the growth of the local economy",
    pointNote: "help A grow「Aの成長を助ける」を promote the growth of A「Aの成長を促進する」と言い換えている。"
  },

  "P1_043": {
    pointA: "asked the city for better public services",
    pointB: "requested better public services from the city",
    pointNote: "ask A for B「AにBを求める」は request B from A と言い換えられる。"
  },

  "P1_044": {
    pointA: "Because",
    pointB: "Since",
    pointNote: "because と since はどちらも理由を表して「～なので」となる。"
  },

  "P1_045": {
    pointA: "could understand the story",
    pointB: "The story made sense",
    pointNote: "make sense は「意味が分かる、理解できる内容である」。understand を別の形で表している。"
  },

  "P1_046": {
    pointA: "examine it again",
    pointB: "check it again",
    pointNote: "examine と check はどちらも「調べる、確認する」。この文ではほぼ同じ意味で使われている。"
  },

  "P1_047": {
    pointA: "on purpose",
    pointB: "intentionally",
    pointNote: "on purpose と intentionally はどちらも「わざと、意図的に」。"
  },

  "P1_048": {
    pointA: "not likely to forget",
    pointB: "the least likely person to forget",
    pointNote: "not likely を least likely「最も～しそうにない」を使って言い換えている。"
  },

  "P1_049": {
    pointA: "use every chance",
    pointB: "use every chance",
    pointNote: "every chance は「すべての機会」。この問題では use＋opportunity/chance の自然な結びつきを確認する。"
  },

  "P1_050": {
    pointA: "felt nervous about",
    pointB: "was anxious about",
    pointNote: "nervous と anxious はどちらも「不安な、緊張した」という意味を表せる。"
  },

    "P1_101": {
    pointA: "twice as many CDs as I have",
    pointB: "twice the number of CDs I have",
    pointNote: "倍数＋as many A as ... は、倍数＋the number of A と言い換えられる。"
  },

  "P1_102": {
    pointA: "make use of",
    pointB: "take advantage of",
    pointNote: "make use of と take advantage of は、この文ではどちらも「～を活用する」。"
  },

  "P1_103": {
    pointA: "happened to see",
    pointB: "saw ... by chance",
    pointNote: "happen to do は「たまたま～する」。by chance「偶然に」と言い換えられる。"
  },

  "P1_104": {
    pointA: "I don’t understand what this sentence means",
    pointB: "This sentence doesn’t make sense to me",
    pointNote: "make sense to A は「Aにとって意味が分かる」。not understand と近い内容を表す。"
  },

  "P1_105": {
    pointA: "If it had not been for his advice",
    pointB: "Without his advice",
    pointNote: "If it had not been for A「もしAがなかったなら」は Without A と言い換えられる。"
  },

  "P1_106": {
    pointA: "I remember my childhood",
    pointB: "reminds me of my childhood",
    pointNote: "remind A of B は「AにBを思い出させる」。主語を変えて remember の内容を表している。"
  },

  "P1_107": {
    pointA: "be in charge of",
    pointB: "be responsible for",
    pointNote: "be in charge of と be responsible for は担当・責任を表す重要な言い換え。"
  },

  "P1_108": {
    pointA: "couldn’t understand",
    pointB: "couldn’t figure out",
    pointNote: "figure out は「理解する、意味をつかむ」。understand と近い意味で使われている。"
  },

  "P1_109": {
    pointA: "are in trouble because they do not have enough food",
    pointB: "are suffering from hunger",
    pointNote: "suffer from A は「Aに苦しむ」。食料不足による困窮を hunger「飢え」で表している。"
  },

  "P1_110": {
    pointA: "If the weather is not bad",
    pointB: "unless the weather is bad",
    pointNote: "if ... not と unless はどちらも「もし～でなければ」という条件を表せる。"
  },

  "P1_111": {
    pointA: "Who can believe ...?",
    pointB: "Nobody can believe ...",
    pointNote: "修辞疑問 Who can ...? は文脈上「誰も～できない」という強い否定を表す。"
  },

  "P1_112": {
    pointA: "put up with",
    pointB: "stand",
    pointNote: "put up with A は「Aを我慢する」。stand A と言い換えられる。"
  },

  "P1_113": {
    pointA: "looks like",
    pointB: "resembles",
    pointNote: "look like A と resemble A はどちらも「Aに似ている」。resemble の後ろに to は付けない。"
  },

  "P1_114": {
    pointA: "often forgets",
    pointB: "has a habit of forgetting",
    pointNote: "繰り返し行うことを have a habit of ～ing「～する習慣がある」で表している。"
  },

  "P1_115": {
    pointA: "fill in this application form",
    pointB: "complete this application form",
    pointNote: "申込書などを fill in「記入する」ことは complete「必要事項を記入して完成させる」と言い換えられる。"
  },

  "P1_116": {
    pointA: "almost",
    pointB: "nearly",
    pointNote: "almost と nearly はどちらも「ほとんど、危うく」。"
  },

  "P1_117": {
    pointA: "understand Japanese culture",
    pointB: "make sense of Japanese culture",
    pointNote: "make sense of A は「Aを理解する、意味をつかむ」。understand と言い換えられる。"
  },

  "P1_118": {
    pointA: "was late because of thick fog",
    pointB: "was delayed by thick fog",
    pointNote: "「霧のため遅れた」を delay A「Aを遅らせる」の受動態 be delayed by A で表している。"
  },

  "P1_119": {
    pointA: "is a good speaker of French",
    pointB: "speaks French fluently",
    pointNote: "a good speaker of a language は speak the language fluently「その言語を流ちょうに話す」と言い換えられる。"
  },

  "P1_120": {
    pointA: "is coming toward",
    pointB: "is approaching",
    pointNote: "come toward A「Aに向かって来る」は approach A「Aに近づく」と言い換えられる。"
  },

  "P1_121": {
    pointA: "got over the sadness",
    pointB: "recovered from the sadness",
    pointNote: "get over A は「Aを乗り越える、Aから回復する」。recover from A と言い換えられる。"
  },

  "P1_122": {
    pointA: "learned the speech by heart",
    pointB: "memorized the speech",
    pointNote: "learn A by heart は「Aを暗記する」。memorize A と言い換えられる。"
  },

  "P1_123": {
    pointA: "be in charge of",
    pointB: "be responsible for",
    pointNote: "be in charge of と be responsible for は「～を担当している」という内容を表せる。"
  },

  "P1_124": {
    pointA: "If her advice had not helped me",
    pointB: "But for her advice",
    pointNote: "But for A は「もしAがなければ」。仮定法の If it had not been for A と近い働きをする。"
  },

  "P1_125": {
    pointA: "couldn't catch the early bus",
    pointB: "missed the early bus",
    pointNote: "not catch a bus/train は miss a bus/train「乗り遅れる」と言い換えられる。"
  },

  "P1_126": {
    pointA: "was brought up",
    pointB: "was raised",
    pointNote: "bring up A と raise A はどちらも「Aを育てる」。"
  },

  "P1_127": {
    pointA: "stand for",
    pointB: "represent",
    pointNote: "stand for は略語などが「～を表す」という意味。represent と言い換えられる。"
  },

  "P1_128": {
    pointA: "There is no denying",
    pointB: "It is impossible to deny",
    pointNote: "There is no ～ing は「～することはできない」。It is impossible to do と言い換えられる。"
  },

  "P1_129": {
    pointA: "The movie was so touching",
    pointB: "Many people were moved by the movie",
    pointNote: "touching は「感動させるような」、be moved は「感動する」。物と人で視点を変えている。"
  },

  "P1_130": {
    pointA: "take place",
    pointB: "occur",
    pointNote: "take place と occur はどちらも「起こる、発生する」。"
  },

  "P1_131": {
    pointA: "will probably not pass",
    pointB: "It is unlikely that ... will pass",
    pointNote: "probably not ... は It is unlikely that ...「～する可能性が低い」と言い換えられる。"
  },

  "P1_132": {
    pointA: "as planned",
    pointB: "on schedule",
    pointNote: "as planned「予定どおり」は、時間・予定について on schedule と言い換えられる。"
  },

  "P1_133": {
    pointA: "often leaves the lights on",
    pointB: "has a habit of leaving the lights on",
    pointNote: "繰り返す行動を have a habit of ～ing「～する癖がある」で表している。"
  },

  "P1_134": {
    pointA: "count on",
    pointB: "trust",
    pointNote: "count on A は「Aを頼りにする、当てにする」。この文では trust A と近い意味になる。"
  },

  "P1_135": {
    pointA: "is beyond my understanding",
    pointB: "I can’t follow",
    pointNote: "beyond one’s understanding は「理解を超えている」。follow は話・文章などを「理解する」という意味でも使う。"
  },

  "P1_136": {
    pointA: "It is no use trying",
    pointB: "It is useless to try",
    pointNote: "It is no use ～ing は「～しても無駄だ」。It is useless to do と言い換えられる。"
  },

  "P1_137": {
    pointA: "is concerned about",
    pointB: "is anxious about",
    pointNote: "be concerned about と be anxious about はどちらも「～を心配している」という意味を表せる。"
  },

  "P1_138": {
    pointA: "know better than to make fun of others",
    pointB: "be wise enough not to make fun of others",
    pointNote: "know better than to do は「～するほど愚かではない」。wise enough not to do と言い換えられる。"
  },

  "P1_139": {
    pointA: "drop you a line",
    pointB: "write to you",
    pointNote: "drop A a line は「Aに短い手紙・メッセージを書く」。write to A と言い換えられる。"
  },

  "P1_140": {
    pointA: "had to put off the concert because of the storm",
    pointB: "The storm forced us to put off the concert",
    pointNote: "have to do となった原因を、force A to do「Aに～することを強いる」で表している。"
  },

  "P1_141": {
    pointA: "certainly can’t play the violin",
    pointB: "much less the violin",
    pointNote: "much less は否定文の後で「まして～ない」。let alone / still less と近い表現。"
  },

  "P1_142": {
    pointA: "take part in",
    pointB: "participate in",
    pointNote: "take part in と participate in はどちらも「～に参加する」。participate in の方がややかたい。"
  },

  "P1_143": {
    pointA: "be involved in",
    pointB: "take part in",
    pointNote: "be involved in は「～に関わっている」。活動への関与を take part in「～に参加する」で表している。"
  },

  "P1_144": {
    pointA: "help support",
    pointB: "contribute to",
    pointNote: "contribute to A は「Aに貢献する」。help support A と近い内容を表す。"
  },

  "P1_145": {
    pointA: "Although the road was crowded",
    pointB: "Despite the crowded road",
    pointNote: "although の後ろには文、despite の後ろには名詞句を置いて「～にもかかわらず」を表す。"
  },

  "P1_146": {
    pointA: "No matter how carefully",
    pointB: "However carefully",
    pointNote: "no matter how＋形容詞・副詞 と however＋形容詞・副詞 は「どれだけ～しても」と言い換えられる。"
  },

  "P1_147": {
    pointA: "No matter what happens",
    pointB: "Whatever happens",
    pointNote: "no matter what と whatever は「何が～しても」と言い換えられる。"
  },

  "P1_148": {
    pointA: "beforehand",
    pointB: "in advance",
    pointNote: "beforehand と in advance はどちらも「前もって」。"
  },

  "P1_149": {
    pointA: "In addition to selling books",
    pointB: "as well as selling books",
    pointNote: "in addition to A と as well as A は「Aに加えて」という追加を表せる。"
  },

  "P1_150": {
    pointA: "In contrast to his older brother",
    pointB: "Unlike his older brother",
    pointNote: "in contrast to は「～とは対照的に」。この文では unlike「～とは違って」で対比を表している。"
  },

    "P1_151": {
    pointA: "According to the survey",
    pointB: "Based on the survey",
    pointNote: "according to は「～によると」、based on は「～に基づいて」。この文では調査を情報の根拠として示している。"
  },

  "P1_152": {
    pointA: "as a result of the heavy rain",
    pointB: "due to the heavy rain",
    pointNote: "as a result of A と due to A は、どちらも原因を表して「Aのために」となる。"
  },

  "P1_153": {
    pointA: "broke out",
    pointB: "occurred",
    pointNote: "break out は火事・戦争・病気などが「突然発生する」。occur「起こる」と言い換えられる。"
  },

  "P1_154": {
    pointA: "asked the city for safer roads",
    pointB: "requested safer roads from the city",
    pointNote: "ask A for B は request B from A「AにBを求める」と言い換えられる。"
  },

  "P1_155": {
    pointA: "Since you have finished",
    pointB: "Now that you have finished",
    pointNote: "now that は「今や～なので」。状況が変化したことを理由として示すときに使う。"
  },

  "P1_156": {
    pointA: "if you clean it",
    pointB: "as long as you clean it",
    pointNote: "as long as は「～する限り」。この文では if と同じように条件を表している。"
  },

  "P1_157": {
    pointA: "follow the fast lesson",
    pointB: "keep up with the fast lesson",
    pointNote: "keep up with A は「Aについていく」。授業・変化・進歩などについていく場合に使える。"
  },

  "P1_158": {
    pointA: "examine your report again",
    pointB: "look over your report again",
    pointNote: "look over A は「Aをざっと確認する」。書類・答案・レポートなどによく使う。"
  },

  "P1_159": {
    pointA: "review today's lesson",
    pointB: "go over today's lesson",
    pointNote: "go over A は「Aを復習する、見直す」。review A と言い換えられる。"
  },

  "P1_160": {
    pointA: "felt uncomfortable",
    pointB: "was ill at ease",
    pointNote: "be ill at ease は「落ち着かない、不安である」。feel uncomfortable と近い意味。"
  },

  "P1_161": {
    pointA: "feel comfortable",
    pointB: "feel at ease",
    pointNote: "feel at ease は「安心する、くつろぐ」。feel comfortable と言い換えられる。"
  },

  "P1_162": {
    pointA: "accepted the responsibility",
    pointB: "took on the responsibility",
    pointNote: "take on A は仕事・役割・責任などを「引き受ける」。accept A と近い意味で使われる。"
  },

  "P1_163": {
    pointA: "became responsible for the company",
    pointB: "took over the company",
    pointNote: "take over A は会社・仕事・役割などを「引き継ぐ」。"
  },

  "P1_164": {
    pointA: "expressed ideas",
    pointB: "made suggestions",
    pointNote: "改善のための ideas を suggestions「提案」として表し、make suggestions で「提案する」となる。"
  },

  "P1_165": {
    pointA: "proposed a new safety plan",
    pointB: "put forward a new safety plan",
    pointNote: "put forward A は意見・案・提案などを「提示する」。propose A と言い換えられる。"
  },

  "P1_166": {
    pointA: "replace",
    pointB: "take the place of",
    pointNote: "take the place of A は「Aに取って代わる」。replace A と言い換えられる。"
  },

  "P1_167": {
    pointA: "This book is worth reading",
    pointB: "It is worthwhile to read this book",
    pointNote: "be worth ～ing「～する価値がある」は It is worthwhile to do と言い換えられる。"
  },

  "P1_168": {
    pointA: "crucial to",
    pointB: "essential to",
    pointNote: "crucial と essential はどちらも「極めて重要な、不可欠な」という強い重要性を表す。"
  },

  "P1_169": {
    pointA: "be familiar with",
    pointB: "know ... well",
    pointNote: "be familiar with A は「Aをよく知っている、Aに慣れている」。know A well と言い換えられる。"
  },

  "P1_170": {
    pointA: "keep in touch with",
    pointB: "stay in contact with",
    pointNote: "keep in touch with A と stay in contact with A はどちらも「Aと連絡を取り合う」。"
  },

  "P1_171": {
    pointA: "get in touch with",
    pointB: "contact",
    pointNote: "get in touch with A は「Aと連絡を取る」。動詞 contact A と言い換えられる。"
  },

  "P1_172": {
    pointA: "were disappointed with",
    pointB: "were not satisfied with",
    pointNote: "be disappointed with A は「Aにがっかりする」。この文では be not satisfied with A「Aに満足していない」と言い換えている。"
  },

  "P1_173": {
    pointA: "were satisfied with",
    pointB: "were pleased with",
    pointNote: "be satisfied with A と be pleased with A はどちらも「Aに満足している」。"
  },

  "P1_174": {
    pointA: "too complicated for beginners to follow",
    pointB: "so complicated that beginners could not follow",
    pointNote: "too ... for A to do は so ... that A cannot/could not do と言い換えられる。"
  },

  "P1_175": {
    pointA: "have difficulty expressing",
    pointB: "find it difficult to express",
    pointNote: "have difficulty ～ing「～するのに苦労する」は find it difficult to do と言い換えられる。"
  },

  "P1_176": {
    pointA: "had trouble finding",
    pointB: "struggled to find",
    pointNote: "have trouble ～ing は「～するのに苦労する」。struggle to do と近い意味を表す。"
  },

  "P1_177": {
    pointA: "became aware of the danger",
    pointB: "realized the danger",
    pointNote: "become aware of A は「Aに気づく」。realize A と言い換えられる。"
  },

  "P1_178": {
    pointA: "has a good command of English",
    pointB: "is fluent in English",
    pointNote: "have a good command of a language は「その言語を自在に使える」。be fluent in と言い換えられる。"
  },

  "P1_179": {
    pointA: "drew near",
    pointB: "approached",
    pointNote: "draw near は「近づく」。approach と言い換えられる。"
  },

  "P1_180": {
    pointA: "take the cost into account",
    pointB: "consider the cost",
    pointNote: "take A into account は「Aを考慮に入れる」。consider A と言い換えられる。"
  },

  "P1_181": {
    pointA: "made fun of",
    pointB: "laughed at",
    pointNote: "make fun of A は「Aをからかう」。laugh at A は文脈によって「Aを笑う、ばかにする」となる。"
  },

  "P1_182": {
    pointA: "is related to",
    pointB: "is connected with",
    pointNote: "be related to A と be connected with A はどちらも「Aと関係がある」。"
  },

  "P1_183": {
    pointA: "had nothing to do with",
    pointB: "was unrelated to",
    pointNote: "have nothing to do with A は「Aとは関係がない」。be unrelated to A と言い換えられる。"
  },

  "P1_184": {
    pointA: "is suitable for",
    pointB: "is appropriate for",
    pointNote: "be suitable for A と be appropriate for A はどちらも「Aに適している、ふさわしい」。"
  },

  "P1_185": {
    pointA: "ran out of time",
    pointB: "used up all our time",
    pointNote: "run out of A は「Aを使い果たしてなくなる」。use up A と言い換えられる。"
  },

  "P1_186": {
    pointA: "take measures to",
    pointB: "take action to",
    pointNote: "take measures to do と take action to do はどちらも「～するための対策・行動を取る」。"
  },

  "P1_187": {
    pointA: "made up for her mistake",
    pointB: "compensated for her mistake",
    pointNote: "make up for A は「Aを埋め合わせる」。compensate for A と言い換えられる。"
  },

  "P1_188": {
    pointA: "is proud of",
    pointB: "takes pride in",
    pointNote: "be proud of A と take pride in A はどちらも「Aを誇りに思う」。"
  },

  "P1_189": {
    pointA: "is interested in",
    pointB: "takes an interest in",
    pointNote: "be interested in A と take an interest in A はどちらも「Aに興味がある」。"
  },

  "P1_190": {
    pointA: "pay attention to",
    pointB: "take notice of",
    pointNote: "pay attention to A と take notice of A はどちらも「Aに注意を向ける」。"
  },

  "P1_191": {
    pointA: "Take care not to forget",
    pointB: "Be careful not to forget",
    pointNote: "take care not to do と be careful not to do はどちらも「～しないように気をつける」。"
  },

  "P1_192": {
    pointA: "are supposed to submit",
    pointB: "are expected to submit",
    pointNote: "be supposed to do は「～することになっている」。この文では be expected to do と近い内容を表す。"
  },

  "P1_193": {
    pointA: "is accustomed to living",
    pointB: "is used to living",
    pointNote: "be accustomed to ～ing と be used to ～ing はどちらも「～することに慣れている」。to は前置詞。"
  },

  "P1_194": {
    pointA: "in order to pass",
    pointB: "so as to pass",
    pointNote: "in order to do と so as to do はどちらも目的を表して「～するために」。"
  },

  "P1_195": {
    pointA: "if there is an emergency",
    pointB: "in case of an emergency",
    pointNote: "if there is A は in case of A「Aの場合には」を使って言い換えられる。in case of の後ろは名詞。"
  },

  "P1_196": {
    pointA: "because it may rain",
    pointB: "in case it rains",
    pointNote: "in case S V は「～するといけないので、～に備えて」。起こる可能性に備えることを表す。"
  },

  "P1_197": {
    pointA: "To my knowledge",
    pointB: "As far as I know",
    pointNote: "To my knowledge と As far as I know はどちらも「私の知る限りでは」。"
  },

  "P1_198": {
    pointA: "In my opinion",
    pointB: "As far as I am concerned",
    pointNote: "As far as I am concerned は「私に関する限り／私の意見では」。この文では In my opinion と近い意味。"
  }
};

  window.PARAPHRASE_DATA_1KYU = RAW.map(function (row) {
  const noteId = String(row[2] || "").trim().toUpperCase();
const extra = EXTRA[row[0]] || {};
const point = POINTS[row[0]] || {};
const choiceJa = CHOICE_JA[row[0]] || [];

  return {
    id: row[0],
    displayNo: row[1],
    noteId: noteId,
    noteIds: noteId ? [noteId] : [],

    a: row[3],
    b: row[4],

choices: row[5],
answer: row[6],

choiceJa: Array.isArray(choiceJa)
  ? choiceJa.slice()
  : [],

ja: extra.ja || "",
answerJa: extra.answerJa || "",

pointA: point.pointA || "",
pointB: point.pointB || "",
pointNote: point.pointNote || "",

    note: "",
    tags: ["大問11", "言い換え"]
  };
});

})();
