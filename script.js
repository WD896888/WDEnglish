// 题库数据
const questions = [
    { words: ["the source of", "is", "water","life"], answer: "Water is the source of life.", explanation: "老师点拨：考查名词性表语和介词短语作定语。the source of life（生命之源）是一个整体，作表语。water（水）是主语。结构：主语 + 系动词 + 表语。" },
    { words: ["my family", "reading books", "enjoy"], answer: "My family enjoy reading books.", explanation: "老师点拨：考查主谓一致及动词搭配。主语 my family 在此视为整体（家庭），动词用第三人称单数 enjoys。enjoy doing sth 喜欢做某事。注意：若强调家庭成员，动词可用复数。" },
    { words: ["the beauty around you", "to discover", "It is a joy"], answer: "It is a joy to discover the beauty around you.", explanation: "老师点拨：考查 It 作形式主语。It is a joy to do sth（做某事是一种乐趣）。to discover the beauty around you（发现身边的美）是真正主语。" },
    { words: ["try our best", "should", "to realize our dreams", "we"], answer: "We should try our best to realize our dreams.", explanation: "老师点拨：考查情态动词 should 与动词不定式作目的状语。We 是主语，should try our best（应该尽力），to realize our dreams（去实现梦想）表示目的。" },
    { words: ["was translated into", "his book", "last year", "French"], answer: "His book was translated into French last year.", explanation: "老师点拨：考查一般过去时的被动语态。was translated into（被翻译成）。主语 his book，into French（译成法语），last year 时间状语。" },
    { words: ["has attracted", "more and more people", "life in the countryside"], answer: "Life in the countryside has attracted more and more people.", explanation: "老师点拨：考查现在完成时及主语识别。life in the countryside（乡村生活）是主语，has attracted（吸引了）是谓语，more and more people（越来越多人）是宾语。" },
    { words: ["is", "to health", "exercise", "regular important"], answer: "Regular exercise is important to health.", explanation: "老师点拨：考查形容词+名词作主语及主系表结构。Regular exercise（规律锻炼）是主语，is important to health（对健康重要）是系表结构。" },
    { words: ["in", "many books", "there are", "the library"], answer: "There are many books in the library.", explanation: "老师点拨：考查 There be 句型。There are 后接复数主语 many books，地点 in the library 放句尾。" },
    { words: ["run", "trains", "faster than cars"], answer: "Trains run faster than cars.", explanation: "老师点拨：考查比较级。Cars run faster than trains. 结构：A + 动词 + 比较级 + than + B。" },
    { words: ["will be built", "a new bridge", "across the river", "next year"], answer: "A new bridge will be built across the river next year.", explanation: "老师点拨：考查一般将来时的被动语态。A new bridge 是主语，will be built across the river（将被建在河上），next year 是将来时间状语。" },
    { words: ["kind", "It is", "of you", "to help me", "so"], answer: "It is so kind of you to help me.", explanation: "老师点拨：考查 It 作形式主语的句型：It is + adj. + of sb. + to do sth.（某人做某事真是……）。kind of you 形容人的品质。" },
    { words: ["has", "the task", "tom", "already finished"], answer: "Tom has already finished the task.", explanation: "老师点拨：考查现在完成时。主语 Tom（注意首字母大写），has already finished（已经完成），the task（任务）是宾语。" },
    { words: ["go to", "Let's", "the cinema", "tonight", "together"], answer: "Let's go to the cinema together tonight.", explanation: "老师点拨：考查祈使句/建议句型。Let's go to...（让我们去……），tonight 和 together 作为状语放句尾。" },
    { words: ["are", "most of the products", "high quality", "made in China"], answer: "Most of the products made in China are high quality.", explanation: "老师点拨：考查主系表结构及后置定语。主语 Most of the products，made in China（中国制造的）修饰主语，are high quality（是高品质的）是系表结构。" },
    { words: ["enjoys", "my brother", "in the playground", "playing basketball"], answer: "My brother enjoys playing basketball in the playground.", explanation: "老师点拨：考查主谓一致 (enjoys) 和动词搭配 (enjoy doing)。地点状语 in the playground 放句尾。" },
    { words: ["do", "how", "you", "spell", "your name"], answer: "How do you spell your name?", explanation: "老师点拨：考查特殊疑问句结构：How do you spell...?（你怎么拼写……？）" },
    { words: ["when", "I left home", "it", "was raining"], answer: "It was raining when I left home.", explanation: "老师点拨：考查过去进行时+when 从句。It was raining when I left home.（当我离开家时，天正在下雨。）" },
    { words: ["protect", "we should", "our environment", "actively"], answer: "We should actively protect our environment.", explanation: "老师点拨：考查情态动词 should。We should protect our environment actively.（我们应该积极保护环境。）" },
    { words: ["is changing", "artificial intelligence", "the way we live", "rapidly"], answer: "Artificial intelligence is rapidly changing the way we live.", explanation: "老师点拨：考查现在进行时及宾语从句/定语。主语 Artificial Intelligence（人工智能），is rapidly changing（正在迅速改变），the way we live（我们生活方式）是宾语。" },
    { words: ["it is our duty", "to protect", "traditional culture", "like paper-cutting"], answer: "It is our duty to protect traditional culture like paper-cutting.", explanation: "老师点拨：考查 It 作形式主语。It is our duty to do sth.（做某事是我们的责任）。to protect traditional culture like paper-cutting（保护如剪纸这样的传统文化）是真正主语。" },
    { words: ["should take", "online courses", "students", "to improve digital literacy"], answer: "Students should take online courses to improve digital literacy.", explanation: "老师点拨：考查情态动词 should 与动词不定式作目的状语。Students 是主语，should take online courses（应该参加在线课程），to improve digital literacy（以提高数字素养）是目的。" },
    { words: ["was cleaned up", "the Yangtze River", "last year", "through joint efforts"], answer: "The Yangtze River was cleaned up through joint efforts last year.", explanation: "老师点拨：考查一般过去时的被动语态及方式状语。The Yangtze River（长江）是主语，was cleaned up（被清理），through joint efforts（通过共同努力）是方式，last year 是时间。" },
    { words: ["are moving to", "more and more young people", "county towns", "for better opportunities"], answer: "More and more young people are moving to county towns for better opportunities.", explanation: "老师点拨：考查现在进行时及目的状语。主语 More and more young people，are moving to county towns（正搬往县城），for better opportunities（为了更好的机会）表目的。" },
    { words: ["can you share", "your experience", "in learning English", "with us"], answer: "Can you share your experience in learning English with us?", explanation: "老师点拨：考查情态动词 can 引导的一般疑问句及介词短语。Can you share your experience with us?（你能和我们分享你的经验吗？），in learning English（在学英语方面）修饰 experience。" },
    { words: ["aim to achieve", "Dual Carbon goals", "carbon neutrality", "by 2060"], answer: "Dual Carbon goals aim to achieve carbon neutrality by 2060.", explanation: "老师点拨：考查动词短语及同位语/目标。'Dual Carbon' goals（“双碳”目标），aim to achieve carbon neutrality（旨在实现碳中和），by 2060（到 2060 年）是时间目标。" },
    { words: ["let me show", "how this app", "helps with", "daily study"], answer: "Let me show how this app helps with daily study.", explanation: "老师点拨：考查祈使句及宾语从句。Let me show...（让我展示……），后面接 how 引导的宾语从句 how this app helps with daily study（这个应用如何帮助日常学习）。" },
    { words: ["has been visited", "the Forbidden City", "by millions", "every year"], answer: "The Forbidden City has been visited by millions every year.", explanation: "老师点拨：考查现在完成时的被动语态（强调过去动作对现在的影响或习惯）。The Forbidden City（故宫）是主语，has been visited by millions every year（每年被数百万人参观）。" },
    { words: ["to protect the environment", "is", "everyone's duty", "it"], answer: "It is everyone's duty to protect the environment.", explanation: "老师点拨：考查 It 作形式主语。It is everyone's duty to protect the environment.（保护环境是每个人的责任。）" },
    { words: ["will be built", "in our city", "a new library", "next year"], answer: "A new library will be built in our city next year.", explanation: "老师点拨：考查一般将来时的被动语态。A new library 是主语，will be built in our city（将在我们城市被建造），next year 是时间。" },
    { words: ["she", "whether", "is considering", "to study abroad", "hasn't decided"], answer: "She hasn't decided whether she is considering to study abroad.", explanation: "老师点拨：考查宾语从句及现在完成时。主句 She hasn't decided（她还没决定），whether to study abroad（是否出国留学）是宾语（不定式复合结构）。" },
    { words: ["made great progress", "has", "in English", "the student", "since last term"], answer: "The student has made great progress in English since last term.", explanation: "老师点拨：考查现在完成时及时间状语。主语 The student，has made great progress in English（在英语上取得了巨大进步），since last term（自从上学期）是完成时标志。" },
    { words: ["the movie", "so touching that", "many people cried", "was"], answer: "The movie was so touching that many people cried.", explanation: "老师点拨：考查 so... that... 结果状语从句。The movie was so touching that many people cried.（电影如此感人，以至于许多人都哭了。）" },
    { words: ["if you practice every day", "you", "improve", "will", "your speaking skills"], answer: "You will improve your speaking skills if you practice every day.", explanation: "老师点拨：考查 if 引导的条件状语从句，主句用一般将来时。If you practice every day, you will improve your speaking skills.（如果你每天练习，你的口语将会提高。）" },
    { words: ["more and more popular", "working from home", "is becoming", "nowadays"], answer: "Working from home is becoming more and more popular nowadays.", explanation: "老师点拨：考查现在进行时表趋势。主语 Working from home（居家办公），is becoming more and more popular（正变得越来越流行），nowadays（如今）是时间状语。" },
    { words: ["he", "the question", "was asked", "by the teacher", "in class"], answer: "He was asked the question by the teacher in class.", explanation: "老师点拨：考查一般过去时的被动语态。He 是主语，was asked the question by the teacher in class（在课上被老师问了这个问题）。" },
    { words: ["to finish the project", "we", "need", "more time and resources"], answer: "We need more time and resources to finish the project.", explanation: "老师点拨：考查动词不定式作目的状语及并列宾语。We need more time and resources（我们需要更多时间和资源），to finish the project（为了完成项目）是目的。" },
    { words: ["there", "a big park", "near my school", "is", "and a supermarket"], answer: "There is a big park and a supermarket near my school.", explanation: "老师点拨：考查 There be 句型的并列主语。There is a big park and a supermarket near my school.（我学校附近有一个大公园和一家超市。）" },
    { words: ["the importance of reading", "emphasized", "was", "in his speech"], answer: "The importance of reading was emphasized in his speech.", explanation: "老师点拨：考查一般过去时的被动语态。The importance of reading（阅读的重要性）是主语，was emphasized in his speech（在他的演讲中被强调）。" },
    { words: ["can", "students", "learn more efficiently", "by using AI tools"], answer: "Students can learn more efficiently by using AI tools.", explanation: "老师点拨：考查情态动词 can 及方式状语。Students can learn more efficiently（学生可以更高效地学习），by using AI tools（通过使用 AI 工具）是方式。" },
    { words: ["is", "success", "a key", "and", "to", "happy life"], answer: "Success is a key to a happy life.", explanation: "老师点拨：考查名词作表语及介词短语。Success is a key to a happy life.（成功是幸福生活的关键。）注意 a key to...（……的关键）。" },
    { words: ["study", "in the library", "quietly", "the students"], answer: "The students study quietly in the library.", explanation: "老师点拨：考查主谓结构及地点、方式状语的位置。The students study quietly in the library.（学生们在图书馆安静地学习。）" },
    { words: ["me", "my father", "a new dictionary", "bought", "yesterday"], answer: "My father bought me a new dictionary yesterday.", explanation: "老师点拨：考查双宾语结构。My father bought me a new dictionary yesterday.（我爸爸昨天给我买了一本新字典。）me 是间接宾语，a new dictionary 是直接宾语。" },
    { words: ["is", "to learn a second foreign language", "necessary", "for us"], answer: "It is necessary for us to learn a second foreign language.", explanation: "老师点拨：考查动词不定式作主语及形容词作表语。To learn a second foreign language is necessary for us.（对我们来说，学习第二外语是必要的。）也可用 It is necessary for us to learn...。" },
    { words: ["the 2026 Asian Games", "was held", "in Japan", "last year"], answer: "The 2026 Asian Games was held in Japan last year.", explanation: "老师点拨：考查一般过去时的被动语态。The 2026 Asian Games（2026 年亚运会）是主语，was held in Japan last year（去年在日本举行）。" },
    { words: ["taken place", "great changes", "in my hometown", "have"], answer: "Great changes have taken place in my hometown.", explanation: "老师点拨：考查现在完成时及固定短语。Great changes have taken place in my hometown.（我的家乡发生了巨大变化。）take place（发生）不及物，无被动。" },
    { words: ["not only", "broadens our horizons", "reading", "but also", "enriches our minds"], answer: "Reading not only broadens our horizons but also enriches our minds.", explanation: "老师点拨：考查 not only... but also... 连接两个并列谓语。主语 Reading，谓语 not only broadens our horizons but also enriches our minds（不仅开阔视野，而且丰富思想）。" },
    { words: ["you", "can", "help", "me", "with my English"], answer: "Can you help me with my English?", explanation: "老师点拨：考查情态动词 can 及介词短语。Can you help me with my English?（你能在英语方面帮助我吗？）help sb. with sth. 是固定搭配。" },
    { words: ["be", "don't", "late", "next time"], answer: "Don't be late next time.", explanation: "老师点拨：考查否定祈使句。Don't be late next time.（下次别迟到。）Don't + 动词原形开头。" },
    { words: ["is", "a symbol of", "Wuhan", "the Yellow Crane Tower"], answer: "The Yellow Crane Tower is a symbol of Wuhan.", explanation: "老师点拨：考查主系表结构及 of 短语。The Yellow Crane Tower is a symbol of Wuhan.（黄鹤楼是武汉的象征。）" },
    { words: ["is", "my belief", "that", "never give up", "we should", "when facing difficulties"], answer: "It is my belief that we should never give up when facing difficulties.", explanation: "老师点拨：考查表语从句及主句结构。My belief is that...（我的信念是……），that 引导表语从句 we should never give up when facing difficulties（面对困难时我们决不应放弃）。" },
    { words: ["is", "climate change", "a serious challenge", "for", "our planet"], answer: "Climate change is a serious challenge for our planet.", explanation: "老师点拨：考查主系表结构。Climate change is a serious challenge for our planet.（气候变化对我们星球是个严峻挑战。）" },
    { words: ["should", "young people", "embrace", "the spirit of", "innovation"], answer: "Young people should embrace the spirit of innovation.", explanation: "老师点拨：考查情态动词 should。Young people should embrace the spirit of innovation.（年轻人应拥抱创新精神。）" },
    { words: ["has changed", "many industries", "Artificial Intelligence", "dramatically"], answer: "Artificial Intelligence has dramatically changed many industries.", explanation: "老师点拨：考查现在完成时及副词位置。Artificial Intelligence has dramatically changed many industries.（人工智能已经极大地改变了许多行业。）" },
    { words: ["is", "to learn new skills", "from online courses", "a good way"], answer: "Learning new skills from online courses is a good way.", explanation: "老师点拨：考查动词不定式作主语。To learn new skills from online courses is a good way.（从在线课程学习新技能是个好方法。）" },
    { words: ["can improve", "physical health", "regular exercise", "significantly"], answer: "Regular exercise can significantly improve physical health.", explanation: "老师点拨：考查情态动词 can 及主谓搭配。Regular exercise can significantly improve physical health.（规律锻炼能显著改善身体健康。）" },
    { words: ["please", "focus on", "to improve", "our study efficiency", "in class"], answer: "Please focus on improving our study efficiency in class.", explanation: "老师点拨：考查祈使句及动词短语。Please focus on improving our study efficiency in class.（请在课堂上专注于提高我们的学习效率。）focus on doing。" },
    { words: ["can", "we", "visit", "the library", "on weekends"], answer: "We can visit the library on weekends.", explanation: "老师点拨：考查情态动词 can 的一般疑问句或陈述句。陈述句：We can visit the library on weekends.（我们可以在周末参观图书馆。）" },
    { words: ["are", "what skills", "most important", "for your future"], answer: "What skills are most important for your future?", explanation: "老师点拨：考查特殊疑问句（疑问词作主语）。What skills are most important for your future?（什么技能对你的未来最重要？）" },
    { words: ["have changed", "how", "in recent years", "the rural areas"], answer: "How have the rural areas changed in recent years?", explanation: "老师点拨：考查现在完成时及特殊疑问句（疑问副词）。How have the rural areas changed in recent years?（近年来农村地区发生了怎样的变化？）" },
    { words: ["has won", "low-carbon lifestyle", "global support"], answer: "Low-carbon lifestyle has won global support.", explanation: "老师点拨：考查现在完成时。Low-carbon lifestyle has won global support.（低碳生活方式已赢得全球支持。）" },
    { words: ["are developing", "renewable energy sources", "rapidly"], answer: "Renewable energy sources are developing rapidly.", explanation: "老师点拨：考查现在进行时。Renewable energy sources are developing rapidly.（可再生能源正在快速发展。）" },
    { words: ["expands", "access to education", "online learning"], answer: "Online learning expands access to education.", explanation: "老师点拨：考查主谓宾结构。Online learning expands access to education.（在线学习扩大了获得教育的途径。）" },
    { words: ["produces", "skilled workers", "vocational education"], answer: "Vocational education produces skilled workers.", explanation: "老师点拨：考查主谓宾结构。Vocational education produces skilled workers.（职业教育培养熟练工人。）" },
    { words: ["should", "inherit", "traditional culture", "young generation"], answer: "Young generation should inherit traditional culture.", explanation: "老师点拨：考查情态动词 should。Young generation should inherit traditional culture.（年轻一代应传承传统文化。）" },
    { words: ["revives", "ancient Chinese aesthetics", "Hanfu movement"], answer: "Hanfu movement revives ancient Chinese aesthetics.", explanation: "老师点拨：考查主谓宾结构。Hanfu movement revives ancient Chinese aesthetics.（汉服运动复兴了中国古代美学。）" },
    { words: ["is", "it", "meaningful", "to preserve", "dialects"], answer: "It is meaningful to preserve dialects.", explanation: "老师点拨：考查 It 作形式主语。It is meaningful to preserve dialects.（保护方言是有意义的。）" },
    { words: ["let", "protect", "intangible cultural heritage", "us"], answer: "Let us protect intangible cultural heritage.", explanation: "老师点拨：考查祈使句。Let us protect intangible cultural heritage.（让我们保护非物质文化遗产。）" },
    { words: ["will", "be introduced", "the new policy", "next month"], answer: "The new policy will be introduced next month.", explanation: "老师点拨：考查一般将来时的被动语态。The new policy will be introduced next month.（新政策将于下月出台。）" },
    { words: ["has", "traveled", "many countries", "she", "so far"], answer: "She has traveled many countries so far.", explanation: "老师点拨：考查现在完成时。She has traveled many countries so far.（至今她已经旅行过许多国家。）" },
    { words: ["have", "you", "already", "finished", "your project"], answer: "Have you already finished your project?", explanation: "老师点拨：考查现在完成时的一般疑问句或陈述句。Have you already finished your project?（你已经完成你的项目了吗？）" },
    { words: ["is", "the book", "popular", "written by Mo Yan"], answer: "The book written by Mo Yan is popular.", explanation: "老师点拨：考查过去分词作后置定语。The book written by Mo Yan is popular.（莫言写的那本书很受欢迎。）" },
    { words: ["how", "is", "the scenery", "beautiful"], answer: "How beautiful the scenery is!", explanation: "老师点拨：考查感叹句。How beautiful the scenery is!（这景色多美啊！）" },
    { words: ["although", "was", "tired", "he", "continued", "working"], answer: "Although he was tired, he continued working.", explanation: "老师点拨：考查 although 引导的让步状语从句。Although he was tired, he continued working.（尽管他很累，他仍继续工作。）" },
    { words: ["It is", "important", "to learn", "a foreign language", "for us"], answer: "It is important for us to learn a foreign language.", explanation: "老师点拨：考查 It 作形式主语。It is important for us to learn a foreign language.（对我们来说，学习一门外语是重要的。）" },
    { words: ["was", "held", "by the manager", "the meeting", "last week"], answer: "The meeting was held by the manager last week.", explanation: "老师点拨：考查一般过去时的被动语态。The meeting was held by the manager last week.（会议上周由经理主持。）" },
    { words: ["I am", "looking forward to", "hearing from you"], answer: "I am looking forward to hearing from you.", explanation: "老师点拨：考查固定短语。I am looking forward to hearing from you.（我期待收到你的来信。）look forward to doing。" },
    { words: ["are", "a lot of books", "There", "in the library"], answer: "There are a lot of books in the library.", explanation: "老师点拨：考查 There be 句型。There are a lot of books in the library.（图书馆里有很多书。）" },
    { words: ["was", "so tired", "that", "he", "he went to bed early"], answer: "He was so tired that he went to bed early.", explanation: "老师点拨：考查 so... that... 结果状语从句。He was so tired that he went to bed early.（他如此累以至于早早就睡了。）" },
    { words: ["has changed", "Artificial Intelligence", "our lives", "greatly"], answer: "Artificial Intelligence has greatly changed our lives.", explanation: "老师点拨：考查现在完成时。Artificial Intelligence has greatly changed our lives.（人工智能极大地改变了我们的生活。）" },
    { words: ["should", "take measures to", "protect the environment", "we"], answer: "We should take measures to protect the environment.", explanation: "老师点拨：考查情态动词 should。We should take measures to protect the environment.（我们应该采取措施保护环境。）" },
    { words: ["is becoming", "popular", "Chinese food", "all over the world"], answer: "Chinese food is becoming popular all over the world.", explanation: "老师点拨：考查现在进行时表趋势。Chinese food is becoming popular all over the world.（中国食物在全世界正变得流行。）" },
    { words: ["helps us", "solve problems", "efficiently", "critical thinking"], answer: "Critical thinking helps us solve problems efficiently.", explanation: "老师点拨：考查动词搭配 (help sb. do) 及主语识别。Critical thinking helps us solve problems efficiently.（批判性思维帮助我们高效解决问题。）" },
    { words: ["provides", "easy access to information", "the Internet"], answer: "The Internet provides easy access to information.", explanation: "老师点拨：考查主谓宾结构。The Internet provides easy access to information.（互联网提供了获取信息的便捷途径。）" },
    { words: ["can", "not only", "she", "speak English", "but also", "French"], answer: "She can speak not only English but also French.", explanation: "老师点拨：考查 not only... but also... 连接并列谓语。She can speak not only English but also French.（她不仅会说英语，还会说法语。）" },
    { words: ["is", "the man", "standing there", "who", "my teacher"], answer: "The man standing there is my teacher.", explanation: "老师点拨：考查定语从句/分词作定语及主系表结构。The man standing there is my teacher. 或 The man who is standing there is my teacher.（站在那里的那个人是我的老师。）" },
    { words: ["makes", "feel", "me", "relaxed", "reading"], answer: "Reading makes me feel relaxed.", explanation: "老师点拨：考查动词复合宾语 (make sb. feel adj.)。Reading makes me feel relaxed.（阅读让我感到放松。）" },
    { words: ["spends", "much time", "reading books", "she", "every day"], answer: "She spends much time reading books every day.", explanation: "老师点拨：考查动词搭配 (spend time doing)。She spends much time reading books every day.（她每天花很多时间读书。）" },
    { words: ["is", "one of", "the most beautiful cities", "Wuhan", "in China"], answer: "Wuhan is one of the most beautiful cities in China.", explanation: "老师点拨：考查 one of + 最高级 + 复数名词结构。Wuhan is one of the most beautiful cities in China.（武汉是中国最美的城市之一。）" },
    { words: ["is", "physical exercise", "important", "for health"], answer: "Physical exercise is important for health.", explanation: "老师点拨：考查主系表结构。Physical exercise is important for health.（体育锻炼对健康很重要。）" },
    { words: ["should", "we", "protect the environment", "actively"], answer: "We should actively protect the environment.", explanation: "老师点拨：考查情态动词 should。We should actively protect the environment.（我们应该积极保护环境。）" },
    { words: ["has become", "very popular", "online shopping", "in recent years"], answer: "Online shopping has become very popular in recent years.", explanation: "老师点拨：考查现在完成时。Online shopping has become very popular in recent years.（网络购物近年来变得非常流行。）" },
    { words: ["it is", "a good habit", "to learn", "English", "every day"], answer: "It is a good habit to learn English every day.", explanation: "老师点拨：考查 It 作形式主语。It is a good habit to learn English every day.（每天学英语是个好习惯。）" },
    { words: ["was held", "successfully", "the conference", "last month"], answer: "The conference was held successfully last month.", explanation: "老师点拨：考查一般过去时的被动语态。The conference was held successfully last month.（会议于上月成功举行。）" },
    { words: ["let us", "work", "together", "to build a better future"], answer: "Let us work together to build a better future.", explanation: "老师点拨：考查祈使句及目的状语。Let us work together to build a better future.（让我们一起努力建设更美好的未来。）" },
    { words: ["can you", "show me", "how to use", "this app"], answer: "Can you show me how to use this app?", explanation: "老师点拨：考查情态动词 can 及“疑问词+不定式”作宾语。Can you show me how to use this app?（你能教我如何使用这个应用吗？）" },
    { words: ["are", "proud of", "my progress", "my parents"], answer: "My parents are proud of my progress.", explanation: "老师点拨：考查形容词短语作表语 (be proud of)。My parents are proud of my progress.（我的父母为我的进步感到骄傲。）" },
    { words: ["helps", "broaden our horizons", "reading more books", "greatly"], answer: "Reading more books greatly helps broaden our horizons.", explanation: "老师点拨：考查动词搭配 (help do) 及动名词短语作主语。Reading more books greatly helps broaden our horizons.（多读书极大地有助于开阔我们的视野。）" },
    { words: ["we must", "work hard", "to achieve", "our goals"], answer: "We must work hard to achieve our goals.", explanation: "老师点拨：考查情态动词 must 及目的状语。We must work hard to achieve our goals.（我们必须努力工作以实现目标。）" },
    { words: ["is", "the sun", "the source", "of energy"], answer: "The sun is the source of energy.", explanation: "老师点拨：考查主系表结构及 of 短语。The sun is the source of energy.（太阳是能量的来源。）" },
    { words: ["enjoys", "my sister", "playing", "the piano"], answer: "My sister enjoys playing the piano.", explanation: "老师点拨：考查主谓一致及动词搭配 (enjoy doing)。My sister enjoys playing the piano.（我妹妹喜欢弹钢琴。）" },
    { words: ["is", "it", "important", "to be honest"], answer: "It is important to be honest.", explanation: "老师点拨：考查 It 作形式主语。It is important to be honest.（诚实很重要。）" },
    { words: ["should", "try our best", "we", "to protect", "the environment"], answer: "We should try our best to protect the environment.", explanation: "老师点拨：考查情态动词 should 及动词短语。We should try our best to protect the environment.（我们应该尽力保护环境。）" },
    { words: ["was", "his novel", "translated into Chinese", "last year"], answer: "His novel was translated into Chinese last year.", explanation: "老师点拨：考查一般过去时的被动语态。His novel was translated into Chinese last year.（他的小说去年被翻译成了中文。）" },
    { words: ["has attracted", "the city's nightlife", "more and more people"], answer: "The city's nightlife has attracted more and more people.", explanation: "老师点拨：考查现在完成时。The city's nightlife has attracted more and more people.（这座城市的夜生活吸引了越来越多的人。）" },
    { words: ["has", "she", "finished", "her homework"], answer: "She has finished her homework.", explanation: "老师点拨：考查现在完成时。Has she finished her homework? 或 She has finished her homework." },
    { words: ["can", "tell me", "you", "your plan"], answer: "Can you tell me your plan?", explanation: "老师点拨：考查情态动词 can 及双宾语。Can you tell me your plan?（你能告诉我你的计划吗？）" },
    { words: ["let", "explain", "me", "how", "this works"], answer: "Let me explain how this works.", explanation: "老师点拨：考查祈使句及宾语从句。Let me explain how this works.（让我解释一下这个如何运作。）" },
    { words: ["went", "my friends and I", "to the same lecture"], answer: "My friends and I went to the same lecture.", explanation: "老师点拨：考查一般过去时及并列主语。My friends and I went to the same lecture.（我和我的朋友们去听了同一个讲座。）" },
    { words: ["say", "scientists", "the cause", "of climate change", "is human activities"], answer: "Scientists say the cause of climate change is human activities.", explanation: "老师点拨：考查宾语从句。Scientists say (that) the cause of climate change is human activities.（科学家说气候变化的原因是人类活动。）" },
    { words: ["not only", "she", "is a teacher", "but also a writer"], answer: "She is not only a teacher but also a writer.", explanation: "老师点拨：考查 not only... but also... 连接两个并列表语。She is not only a teacher but also a writer.（她不仅是老师，还是作家。）" },
    { words: ["was adapted into a film", "last year", "the famous novel"], answer: "The famous novel was adapted into a film last year.", explanation: "老师点拨：考查一般过去时的被动语态。The famous novel was adapted into a film last year.（这部著名小说去年被改编成了电影。）" },
    { words: ["was cancelled", "the match", "because of the heavy rain"], answer: "The match was cancelled because of the heavy rain.", explanation: "老师点拨：考查一般过去时的被动语态及原因状语。The match was cancelled because of the heavy rain.（比赛因大雨被取消。）" },
    { words: ["finished", "with the help of the team", "we", "the project"], answer: "We finished the project with the help of the team.", explanation: "老师点拨：考查一般过去时及方式状语。We finished the project with the help of the team.（我们在团队的帮助下完成了项目。）" },
    { words: ["the more", "you practice", "the better", "you become"], answer: "The more you practice, the better you become.", explanation: "老师点拨：考查“the+比较级..., the+比较级...”结构。The more you practice, the better you become.（你练习得越多，就变得越好。）" },
    { words: ["did", "she forgive him", "only after he apologized"], answer: "She forgave him only after he apologized.", explanation: "老师点拨：考查倒装句（“only+状语”放句首，主句部分倒装）。Only after he apologized did she forgive him.（只有在他道歉之后，她才原谅了他。）" },
    { words: ["will succeed", "whoever", "works hard"], answer: "Whoever works hard will succeed.", explanation: "老师点拨：考查主语从句 (whoever 引导)。Whoever works hard will succeed.（无论谁努力工作，都会成功。）" },
    { words: ["could", "you", "tell me", "where", "the library is"], answer: "Could you tell me where the library is?", explanation: "老师点拨：考查宾语从句（疑问词引导，用陈述语序）。Could you tell me where the library is?（你能告诉我图书馆在哪里吗？）" },
    { words: ["would have come", "if", "they", "had known earlier"], answer: "They would have come if they had known earlier.", explanation: "老师点拨：考查与过去事实相反的虚拟语气。They would have come if they had known earlier.（如果他们早知道，他们就会来了。）" },
    { words: ["had already started", "the show", "by the time", "we arrived"], answer: "The show had already started by the time we arrived.", explanation: "老师点拨：考查过去完成时 (by the time 引导时间状语从句)。The show had already started by the time we arrived.（我们到达时，演出已经开始了。）" },
    { words: ["is", "why", "learning English", "important"], answer: "Why is learning English important?", explanation: "老师点拨：考查表语从句 (why 引导)。Why learning English is important is... 或更常见 The reason why learning English is important is...。此题更可能是问句：Why is learning English important?（为什么学英语重要？）" },
    { words: ["must", "each student", "submit", "his or her essay", "before the deadline"], answer: "Each student must submit his or her essay before the deadline.", explanation: "老师点拨：考查情态动词 must 及时间状语。Each student must submit his or her essay before the deadline.（每个学生必须在截止日期前提交他或她的论文。）" }
];


// 当前题目索引
let currentQuestionIndex = 0;
let currentWords = [];
let dragSrcElement = null;

// 触摸拖拽相关变量
let touchDragSrcElement = null;
let touchDragClone = null;
let touchStartX = 0;
let touchStartY = 0;
let touchOffsetX = 0;
let touchOffsetY = 0;
let isDragging = false;
let touchAnimationFrame = null;
let lastHighlightTime = 0;
let lastHighlightElement = null;
let isTouchDragStarted = false;
const DRAG_THRESHOLD = 10;

// 进度保存相关的常量
const PROGRESS_STORAGE_KEY = 'wdenglish_sentence_progress';

// DOM元素
const wordsContainer = document.getElementById('wordsContainer');
const checkBtn = document.getElementById('checkBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resultDiv = document.getElementById('result');
const explanationDiv = document.getElementById('explanation');
const questionNumberEl = document.getElementById('questionNumber');
const totalQuestionsEl = document.getElementById('totalQuestions');

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 更新总题数
    totalQuestionsEl.textContent = questions.length;
    
    // 尝试恢复进度
    const progressRestored = loadProgress();
    if (progressRestored) {
        console.log('进度已恢复到第', currentQuestionIndex + 1, '题');
    }
    
    loadQuestion();
    
    // 绑定事件
    checkBtn.addEventListener('click', checkAnswer);
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);
});

// 加载题目
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    currentWords = [...question.words]; // 复制数组以避免修改原数据
    
    // 随机打乱单词顺序
    shuffleArray(currentWords);
    
    // 渲染单词
    renderWords();
    
    // 清除结果提示
    resultDiv.textContent = '';
    resultDiv.className = 'result';
    
    // 清除解析提示
    explanationDiv.textContent = '';
    explanationDiv.className = 'explanation';
    
    // 更新当前题目编号
    questionNumberEl.textContent = currentQuestionIndex + 1;
}

// 渲染单词到容器中
function renderWords() {
    wordsContainer.innerHTML = '';
    
    currentWords.forEach((word, index) => {
        if (word.trim() !== '') { // 跳过空字符串
            const wordElement = document.createElement('div');
            wordElement.className = 'word-item';
            wordElement.textContent = word;
            wordElement.setAttribute('draggable', 'true');
            wordElement.setAttribute('data-index', index);
            
            // 拖拽事件
            wordElement.addEventListener('dragstart', handleDragStart);
            wordElement.addEventListener('dragend', handleDragEnd);
            wordElement.addEventListener('dragover', handleDragOver);
            wordElement.addEventListener('dragenter', handleDragEnter);
            wordElement.addEventListener('dragleave', handleDragLeave);
            wordElement.addEventListener('drop', handleDrop);
            
            // 触摸事件（移动端支持）
            wordElement.addEventListener('touchstart', handleTouchStart);
            wordElement.addEventListener('touchmove', handleTouchMove, { passive: false });
            wordElement.addEventListener('touchend', handleTouchEnd);
            wordElement.addEventListener('touchcancel', handleTouchEnd);
            
            // 添加入场动画延迟
            // wordElement.style.animation = `scaleIn 0.4s ease-out ${index * 0.05}s both`;
            
            wordsContainer.appendChild(wordElement);
        }
    });
}

// 洗牌算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 拖拽相关函数
function handleDragStart(e) {
    dragSrcElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    this.classList.add('dragging');
    
    // 播放音效（可选）
    playSound('drag');
}

function handleDragEnd() {
    this.classList.remove('dragging');
    dragSrcElement = null;
    
    // 移除所有 drag-over 状态，添加平滑过渡
    const allWordItems = document.querySelectorAll('.word-item');
    allWordItems.forEach(item => {
        if (item.classList.contains('drag-over')) {
            item.classList.remove('drag-over');
        }
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter() {
    // 防止重复添加类
    if (!this.classList.contains('drag-over')) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave() {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (dragSrcElement !== this && dragSrcElement) {
        // 获取所有单词元素
        const wordElements = Array.from(wordsContainer.children);
        const fromIndex = wordElements.indexOf(dragSrcElement);
        const toIndex = wordElements.indexOf(this);
        
        // 交换位置
        if (fromIndex !== -1 && toIndex !== -1) {
            // 更新currentWords数组
            [currentWords[fromIndex], currentWords[toIndex]] = [currentWords[toIndex], currentWords[fromIndex]];
            
            // 直接在DOM中交换元素，而不是重新渲染
            const nextSibling = this.nextSibling;
            const parent = this.parentNode;
            
            // 如果拖拽元素在目标元素前面
            if (fromIndex < toIndex) {
                parent.insertBefore(dragSrcElement, nextSibling);
            } else {
                parent.insertBefore(dragSrcElement, this);
            }
            
            // 播放放置音效
            playSound('drop');
        }
    }
    
    this.classList.remove('drag-over');
    
    // 确保所有单词项都移除drag-over状态，避免视觉残留
    const allWordItems = document.querySelectorAll('.word-item');
    allWordItems.forEach(item => {
        if (item.classList.contains('drag-over')) {
            item.classList.remove('drag-over');
        }
    });
    
    return false;
}

// 检查答案
function checkAnswer() {
    const userAnswer = getCurrentOrder().join(' ').trim();
    const correctAnswer = questions[currentQuestionIndex].answer;
    
    const userAnswerClean = userAnswer.replace(/[.,?!]/g, '').trim();
    const correctAnswerClean = correctAnswer.replace(/[.,?!]/g, '').trim();
    
    const isCorrect = userAnswerClean.toLowerCase() === correctAnswerClean.toLowerCase();
    
    if (isCorrect) {
        resultDiv.textContent = '✨ 恭喜！答案正确！';
        resultDiv.classList.add('correct');
        explanationDiv.textContent = '';
        explanationDiv.className = 'explanation';
        playSound('correct');
        celebrateSuccess();
        
        // 答案正确时保存进度
        saveProgress();
    } else {
        resultDiv.textContent = `❌ 答案错误。正确答案是：${correctAnswer}`;
        resultDiv.classList.add('incorrect');
        
        const explanation = questions[currentQuestionIndex].explanation;
        if (explanation && explanation.trim() !== '') {
            explanationDiv.textContent = explanation;
            explanationDiv.classList.add('visible');
        } else {
            explanationDiv.textContent = '';
            explanationDiv.className = 'explanation';
        }
        
        playSound('wrong');
    }
}

// 获取当前单词排列顺序
function getCurrentOrder() {
    const wordElements = wordsContainer.querySelectorAll('.word-item');
    return Array.from(wordElements).map(el => el.textContent.trim());
}

// 上一题
function prevQuestion() {
    currentQuestionIndex = (currentQuestionIndex - 1 + questions.length) % questions.length;
    loadQuestion();
    saveProgress();
    playSound('prev');
}

// 下一题
function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    loadQuestion();
    saveProgress();
    playSound('next');
}

// 简单音效函数（可选）
function playSound(type) {
    // 这里可以添加音效，目前只是占位符
    // 实际使用时可以使用 Web Audio API 或 HTML5 Audio
    console.log(`Playing ${type} sound`);
}

// 成功庆祝动画
function celebrateSuccess() {
    const correctWords = document.querySelectorAll('.word-item');
    correctWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.transform = 'scale(1.1)';
            word.style.background = 'linear-gradient(135deg, #7aa8d6, #5d8ab8)';
            word.style.color = '#ffffff';
            
            setTimeout(() => {
                word.style.transform = '';
                word.style.background = '';
                word.style.color = '';
            }, 300);
        }, index * 100);
    });
}

// 键盘快捷键支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    } else if (e.key === 'ArrowLeft') {
        prevQuestion();
    } else if (e.key === 'ArrowRight') {
        nextQuestion();
    }
});

// 保存进度到本地存储
function saveProgress() {
    try {
        const progressData = {
            currentQuestionIndex: currentQuestionIndex,
            timestamp: Date.now()
        };
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressData));
    } catch (error) {
        console.error('保存进度失败:', error);
    }
}

// 从本地存储恢复进度
function loadProgress() {
    try {
        const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (savedProgress) {
            const progressData = JSON.parse(savedProgress);
            if (progressData.currentQuestionIndex !== undefined && progressData.currentQuestionIndex >= 0 && progressData.currentQuestionIndex < questions.length) {
                currentQuestionIndex = progressData.currentQuestionIndex;
                return true;
            }
        }
    } catch (error) {
        console.error('恢复进度失败:', error);
    }
    return false;
}

// 清除保存的进度
function clearProgress() {
    try {
        localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch (error) {
        console.error('清除进度失败:', error);
    }
}

// ========== 触摸事件处理函数（移动端支持） ==========

function handleTouchStart(e) {
    const touch = e.touches[0];
    touchDragSrcElement = this;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    
    const rect = this.getBoundingClientRect();
    touchOffsetX = touch.clientX - rect.left;
    touchOffsetY = touch.clientY - rect.top;
    
    isTouchDragStarted = false;
    isDragging = true;
    
    // 立即创建拖拽克隆元素，但保持隐藏状态
    touchDragClone = this.cloneNode(true);
    touchDragClone.style.position = 'fixed';
    touchDragClone.style.zIndex = '10000';
    touchDragClone.style.pointerEvents = 'none';
    touchDragClone.style.opacity = '0';
    touchDragClone.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
    touchDragClone.style.width = rect.width + 'px';
    touchDragClone.style.height = rect.height + 'px';
    touchDragClone.style.left = '0';
    touchDragClone.style.top = '0';
    touchDragClone.style.willChange = 'transform';
    touchDragClone.style.transform = `translate3d(${touch.clientX - touchOffsetX}px, ${touch.clientY - touchOffsetY}px, 0) scale(1.1)`;
    touchDragClone.style.transition = 'opacity 0.15s ease';
    
    document.body.appendChild(touchDragClone);
    
    // 重置高亮状态
    lastHighlightElement = null;
}

function handleTouchMove(e) {
    if (!isDragging || !touchDragClone) return;
    
    const touch = e.touches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    
    // 计算移动距离
    const deltaX = Math.abs(currentX - touchStartX);
    const deltaY = Math.abs(currentY - touchStartY);
    
    // 如果移动距离超过阈值，启动拖拽（显示克隆元素）
    if (!isTouchDragStarted && (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD)) {
        isTouchDragStarted = true;
        
        // 显示克隆元素并隐藏原始元素
        touchDragClone.style.opacity = '0.9';
        touchDragSrcElement.style.opacity = '0.3';
        touchDragSrcElement.classList.add('dragging');
        
        playSound('drag');
    }
    
    // 如果拖拽已启动，阻止默认行为
    if (isTouchDragStarted) {
        e.preventDefault();
    }
    
    // 始终更新克隆元素位置，即使未超过阈值（这样移动超过阈值时不会有跳跃）
    touchDragClone.style.transform = `translate3d(${currentX - touchOffsetX}px, ${currentY - touchOffsetY}px, 0) scale(1.1)`;
    
    // 如果拖拽已启动，执行高亮逻辑
    if (isTouchDragStarted) {
        // 节流高亮逻辑，每50ms最多执行一次
        const now = Date.now();
        if (now - lastHighlightTime > 50) {
            lastHighlightTime = now;
            highlightElementUnderTouch(currentX, currentY);
        }
    }
}

function handleTouchEnd(e) {
    if (!isDragging) return;
    
    isDragging = false;
    
    if (touchAnimationFrame) {
        cancelAnimationFrame(touchAnimationFrame);
        touchAnimationFrame = null;
    }
    
    // 如果拖拽已启动，执行放置逻辑
    if (isTouchDragStarted) {
        const touch = e.changedTouches[0];
        const currentX = touch.clientX;
        const currentY = touch.clientY;
        
        // 查找放置位置
        const targetElement = findElementUnderTouch(currentX, currentY);
        
        if (targetElement && targetElement !== touchDragSrcElement && targetElement.classList.contains('word-item')) {
            // 交换位置
            const wordElements = Array.from(wordsContainer.children);
            const fromIndex = wordElements.indexOf(touchDragSrcElement);
            const toIndex = wordElements.indexOf(targetElement);
            
            if (fromIndex !== -1 && toIndex !== -1) {
                // 更新currentWords数组
                [currentWords[fromIndex], currentWords[toIndex]] = [currentWords[toIndex], currentWords[fromIndex]];
                
                // 在DOM中交换元素
                const nextSibling = targetElement.nextSibling;
                const parent = targetElement.parentNode;
                
                if (fromIndex < toIndex) {
                    parent.insertBefore(touchDragSrcElement, nextSibling);
                } else {
                    parent.insertBefore(touchDragSrcElement, targetElement);
                }
                
                playSound('drop');
            }
        }
    }
    
    // 清理
    cleanupTouchDrag();
}

function findElementUnderTouch(x, y) {
    const elements = document.elementsFromPoint(x, y);
    for (const element of elements) {
        if (element.classList.contains('word-item') && element !== touchDragClone && element !== touchDragSrcElement) {
            return element;
        }
    }
    return null;
}

function highlightElementUnderTouch(x, y) {
    const targetElement = findElementUnderTouch(x, y);
    
    // 如果目标元素没有变化，直接返回
    if (targetElement === lastHighlightElement) {
        return;
    }
    
    // 移除之前的高亮
    if (lastHighlightElement) {
        lastHighlightElement.classList.remove('drag-over');
    }
    
    // 添加新的高亮
    if (targetElement) {
        targetElement.classList.add('drag-over');
        lastHighlightElement = targetElement;
    } else {
        lastHighlightElement = null;
    }
}

function cleanupTouchDrag() {
    if (touchDragClone) {
        document.body.removeChild(touchDragClone);
        touchDragClone = null;
    }
    
    if (touchDragSrcElement) {
        touchDragSrcElement.style.opacity = '';
        touchDragSrcElement.classList.remove('dragging');
        touchDragSrcElement = null;
    }
    
    // 移除高亮
    if (lastHighlightElement) {
        lastHighlightElement.classList.remove('drag-over');
        lastHighlightElement = null;
    }
    
    isTouchDragStarted = false;
}

// 防止移动端滚动干扰
document.addEventListener('touchmove', function(e) {
    if (isDragging) {
        e.preventDefault();
    }
}, { passive: false });
