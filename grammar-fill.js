// ========== 题库数据 ==========
const grammarQuestions = [
    {
        content: `Chinese scientist Prof. Wang Lin won the 2026 Global Environmental Award on January 15th. This is the 1. ________(greatest) recognition in sustainability science. She is the first woman from Asia 2. ______ receive this honor.

Wang was born in Wuhan and has devoted 3.______ over 25 years to clean energy research. In 2018, she 4. ______(develop) a low-cost water purification system. Her innovations include solar-powered filters, portable desalination devices, 5. _____ community recycling programs.

Wang's philosophy is practical. She uses recycled materials to build 6. ________(durable) infrastructure. After the 2025 Yangtze River floods, her team installed thousands of units—a lifeline for disaster-stricken areas.

Wang also 7. ______(focus) on youth education. Her project, Green Future Lab, 8. ______(establish) in 2024, teaches students about eco-friendly technology. Children learn through experiments, field trips, 9. ______ (observe), and teamwork.

"Protecting our planet requires 10. _____ collective effort. Every individual's action contributes to a healthier Earth," Wang stated.`,
        blanks: [
            { index: 1, answer: "greatest" },
            { index: 2, answer: "to" },
            { index: 3, answer: "for" },
            { index: 4, answer: "developed" },
            { index: 5, answer: "and" },
            { index: 6, answer: "durable" },
            { index: 7, answer: "focuses" },
            { index: 8, answer: "established" },
            { index: 9, answer: "observing" },
            { index: 10, answer: "a" }
        ],
        explanation: `题目解析：

第一句
原文： This is the 1. ________(greatest) recognition in sustainability science.
翻译： 这是可持续发展科学领域最伟大的认可。

分析：
看前面的 the。在英语中，the 后面经常跟"最高级"，表示"最…"。
看后面的范围 in sustainability science（在这个领域里），说明是在一个范围内进行比较，这也暗示了要用最高级。
给出的词 great 是形容词（伟大的）。
规则： 形容词变最高级，通常加 est。因为 great 是短单词，直接加 est。
答案： greatest

第二句
原文： She is the first woman from Asia 2. ______ receive this honor.
翻译： 她是第一位获得此项荣誉的亚洲女性。

分析：
看关键词 the first（第一）。
规则： 当我们看到"the first / the second / the last … + 名词"后面跟动作时，这个动作必须用动词不定式（to + 动词原形）的形式，作后置定语。
这里的动作是 receive（接受），所以前面要加 to。
答案： to

第三句
原文： Wang was born in Wuhan and has devoted 3.______ over 25 years to clean energy research.
翻译： 王出生于武汉，已经将超过25年的时间奉献给了清洁能源研究。

分析：
固定搭配： devote ... to ... 意思是"把…奉献给…"、"致力于…"。
在这个句型中，devote 后面需要接一个"宾语"（也就是被奉献的对象）。
这里句子主语是 Wang（她），她把自己奉献给了事业。
规则： 当主语把动作反射到自己身上时，要用反身代词（-self结尾的词）。她是女性（she），所以反身代词是 herself。
*注意：* 虽然 over 25 years 也是时间，但这里的核心考点是 devote oneself to 这个结构。意思是"她致力于…"。
答案： for

第四句
原文： In 2018, she 4. ______(develop) a low-cost water purification system.
翻译： 2018年，她开发了一套低成本的水净化系统。

分析：
看时间状语 In 2018（在2018年）。这是一个明确的过去时间点。
规则： 只要是过去发生的动作，且没有强调"正在发生"或"对现在有影响"，通常都用一般过去时。
动词 develop 变过去时，直接加 ed。
答案： developed

第五句
原文： Her innovations include solar-powered filters, portable desalination devices, 5. _____ community recycling programs.
翻译： 她的创新包括太阳能过滤器、便携式海水淡化装置以及社区回收项目。

分析：
这是一个并列结构。我们在 A, B, and C 中看到了逗号。
这里有三个事物：
solar-powered filters
portable desalination devices
community recycling programs
规则： 英语中列举三个或以上事物时，最后两样之间要用连词 and 连接。
答案： and

第六句
原文： She uses recycled materials to build 6. ________(durable) infrastructure.
翻译： 她使用回收材料来建造更持久的基础设施。

分析：
这个空后面跟着的是名词 infrastructure（基础设施）。
规则： 修饰名词，需要用形容词。
给出的词 durable 本身就是形容词（持久的、耐用的）。虽然有时候题目会考比较级，但这里没有 than 这样的比较词，所以直接用原级。
答案： durable

第七句
原文： Wang also 7. ______(focus) on youth education.
翻译： 王也专注于青少年教育。

分析：
这篇文章整体是在介绍王教授的事迹，属于叙述性文体。
这句话没有明确的时间状语（如"yesterday"或"in 2020"），描述的是她的一贯状态或事实。
主语是 Wang（第三人称单数，她）。
规则： 描述现在的状态、习惯或事实，用一般现在时。第三人称单数做主语，动词要加 s 或 es。
答案： focuses

第八句
原文： Her project, Green Future Lab, 8. ______(establish) in 2024, teaches students about eco-friendly technology.
翻译： 她的项目"绿色未来实验室"于2024年成立，教学生有关生态友好技术的知识。

分析：
看时间 in 2024，说明是过去。
看主语 Her project（她的项目）。项目能自己"成立"自己吗？不能，它是被人成立的。
规则： 表示"被动"且发生在过去，要用一般过去时的被动语态。
结构：be + 过去分词。这里时态是过去，所以 be 动词用 was 或 were。主语是单数项目，所以用 was。establish 的过去分词是 established。
答案： established

第九句
原文： Children learn through experiments, field trips, 9. ______ (observe), and teamwork.
翻译： 孩子们通过实验、实地考察、观察和团队合作来学习。

分析：
这里又是列举：experiments (实验), field trips (实地考察), ______, teamwork (团队合作)。
我们发现这些词都是名词。
给出的词 observe 是动词（观察）。
规则： 名词并列，所以要把它变成名词形式。observe 变成名词要去 e 加 vation，即 observation。
答案： observing

第十句
原文： "Protecting our planet requires 10. _____ collective effort."
翻译： "保护我们的 planet 需要集体的努力。"

分析：
collective effort 是一个名词短语（集体的努力）。
effort 这里是可数名词单数，意思是"一份努力"或"一种努力"，前面缺少限定词。
规则： 泛指一个可数名词单数，前面要用不定冠词 a 或 an。
看单词 collective 的发音，它以辅音音素 /k/ 开头，所以要用 a。
答案： a

总结
通过这篇文章，我们复习了以下几个重点语法，建议记在笔记本上：

最高级： the + est (greatest)
固定搭配： the first to do; devote ... to
时态： 过去时间用过去式；描述事实用现在时（注意三单）。
语态： 动作是由别人做的，用被动语态。
词性转换： 修饰名词用形容词；名词并列要用名词形式。
连词： A, B, and C。

所有的熟练，都是从生涩的填空开始的
此处留白，非为缺憾，乃邀君共书`
    },
    {
        content: `Directions: Read the following passage. Fill in the blanks with appropriate words or the correct forms of the given words.
        
In recent years, traditional Chinese culture has seen a great revival among the youth. Hanfu, the 1. ________ (tradition) clothing of the Han people, is now frequently seen on the streets and in universities. Many young people regard it 2. ________ a symbol of cultural identity.

Zhang Li, a college student in Wuhan, 3. ________ (fall) in love with Hanfu three years ago. She believes that wearing these beautiful clothes connects her 4. ________ the history of China. "It makes me feel 5. ________ (confidence) and proud of my roots," she said.

To promote this culture, various clubs 6. ________ (set) up in many schools. These clubs organize activities where members can learn about ancient etiquette and make handicrafts. Through these activities, students' 7. ________ (understand) of Chinese heritage has deepened.

Experts say that this trend is not just about fashion, 8. ________ a reflection of cultural confidence. With the rapid 9. ________ (develop) of society, more young people are beginning to value their own traditions. It is believed that this passion will continue 10. ________ (grow) in the future.`,
        blanks: [
            { index: 1, answer: "traditional" },
            { index: 2, answer: "as" },
            { index: 3, answer: "fell" },
            { index: 4, answer: "with" },
            { index: 5, answer: "confident" },
            { index: 6, answer: "have been set" },
            { index: 7, answer: "understanding" },
            { index: 8, answer: "but" },
            { index: 9, answer: "development" },
            { index: 10,answer: "to grow" }
        ],
        explanation: `
        第一句
原文：Hanfu, the 1. ________ (tradition) clothing of the Han people, is now frequently seen on the streets and in universities.
翻译：汉服，汉族人的传统服饰，现在在街头和大学里经常能见到。

分析：
我们要看空格后面的词，这里是 clothing（衣服）。
“衣服”是一个名词，它前面通常需要有一个形容词来修饰它，告诉我们是什么样的衣服。
括号里给的是 tradition（传统），这是个名词。我们需要把它变成形容词形式。
规则：
名词变形容词：有些词加上后缀 -al 就变成了形容词。比如 tradition（名词，传统）→ traditional（形容词，传统的）。
答案：traditional

第二句
原文：Many young people regard it 2. ________ a symbol of cultural identity.
翻译：许多年轻人把它视为文化认同的一种象征。

分析：
这句话里有一个非常关键的动词 regard（看待，把……当作）。
在英语里， regard 这个词特别喜欢和一个“小伙伴”一起出现，结构是固定的：regard A as B（把A看作B）。
规则：
固定搭配：有些动词和介词是锁死的，必须连着用。就像我们说“把……当作……”一样，英语里就是 regard ... as ...。
答案：as

第三句
原文：Zhang Li, a college student in Wuhan, 3. ________ (fall) in love with Hanfu three years ago.
翻译：张丽，武汉的一名大学生，三年前爱上了汉服。

分析：
请看句子的尾巴，有一个非常明显的时间词：three years ago（三年前）。
看到“ago”这种表示过去的词，整个句子的动作肯定就发生在过去，不能再是现在了。
括号里给的是 fall（落下，变成）。这是动词原形。
规则：
一般过去时：只要事情发生在过去（比如昨天、last year、three years ago），动词就要变身。fall 的过去式比较特殊，是不规则变化，要背下来：fall → fell。
答案：fell

第四句
原文：She believes that wearing these beautiful clothes connects her 4. ________ the history of China.
翻译：她相信，穿着这些美丽的衣服将她与中国的历史连接起来。

分析：
找句子的谓语动词 connect（连接）。
想一想，“把A和B连接起来”，英语里通常怎么说？是不是需要一个介词在中间搭桥？
这里常用的是 connect A with B 或者 connect A to B。在这篇文章的语境下，用 with 表示“和……有联系”非常合适。
规则：
动词短语搭配：connect ... with ... 意思是“把……和……联系起来/连接”。
答案：with

第五句
原文："It makes me feel 5. ________ (confidence) and proud of my roots," she said.
翻译：“这让我感到自信，并为我的根源感到自豪，”她说。

分析：
看空格前面的词 feel（感觉）。 feel 在这里是一个系动词，后面需要跟一个形容词来描述感觉怎么样。
再看后面的词 and（和），它连接两个并列的部分。后面是 proud（自豪的），这也是个形容词。所以前面的空也必须是形容词。
括号给的是 confidence（名词，自信），我们要把它变成形容词。
规则：
名词变形容词：名词后缀 -ence 对应的形容词通常是 -ent。比如 confidence → confident（自信的）。
答案：confident

第六句
原文：To promote this culture, various clubs 6. ________ (set) up in many schools.
翻译：为了推广这种文化，许多学校里成立了各种各样的社团。

分析：
这句话的主语是 clubs（社团），动作是 set up（建立，设立）。
想一想，社团自己是“建立”自己吗？不是，是被人建立的。
这种“主语是动作的承受者”的情况，我们就要用被动语态。
再看整篇文章主要讲的是最近几年的事，而且是已经成立的现状，所以结合“被动”和“现在的状态”，我们要用现在完成时的被动。
规则：
被动语态：简单说就是“动作被做”，结构是 be + 动词的过去分词。
现在完成时被动语态：表示动作已经发生并对现在有影响，结构是 have/has been + 动词的过去分词。因为主语 clubs 是复数，所以用 have。
set 的过去分词还是 set。
答案：have been set

第七句
原文：Through these activities, students' 7. ________ (understand) of Chinese heritage has deepened.
翻译：通过这些活动，学生对中国遗产的理解加深了。

分析：
看空格前面的词 students'（学生们的）。这是一个所有格形式，就像“小明的……”。
在“某某人的”后面，通常要跟一个名词，表示这是属于他们的什么东西。
括号给的是 understand（理解，动词），我们需要把它变成名词。
规则：
动词变名词：有些动词加上后缀 -ing 可以变成名词。比如 understand（动词，理解）→ understanding（名词，理解/领悟）。
答案：understanding

第八句
原文：Experts say that this trend is not just about fashion, 8. ________ a reflection of cultural confidence.
翻译：专家表示，这一趋势不仅仅关乎时尚，更是文化自信的一种反映。

分析：
看到前面的 not just（不仅仅是），你的脑子里是不是应该马上蹦出一个词来和它配对？
“不是A，而是B”。这是非常固定的句型。
规则：
并列连词：not just ... but ...（不仅仅……而且/而是……）。这里的 but 是连词，连接两个并列的成分。
答案：but

第九句
原文：With the rapid 9. ________ (develop) of society, more young people are beginning to value their own traditions.
翻译：随着社会的快速发展，更多的年轻人开始重视他们自己的传统。

分析：
看空格前面的词 the（定冠词），中间有个 rapid（快速的，形容词）。
结构是：The + 形容词 + 空格 + of + 名词。
在介词 of 之前，需要一个名词来作为“of”这个动作的发出者或归属者。也就是“社会的发展”。
括号给的是 develop（动词，发展），我们要把它变成名词。
规则：
动词变名词：动词后面加后缀 -ment 通常变成名词。比如 develop（动词）→ development（名词）。
答案：development

第十句
原文：It is believed that this passion will continue 10. ________ (grow) in the future.
翻译：人们相信，这种热情在未来将会继续增长。

分析：
看关键词 continue（继续）。
continue 这个词后面可以接两种形式：一种是接动名词，一种是接不定式。在这类语法考试中，接不定式表示“继续去做某事（这件事还没做完或者接下来要做）”的情况非常常见。
规则：
不定式：就是 to + 动词原形 的形式。这里 continue 后面填 to grow，表示将继续去增长。
答案：to grow

🌟 整体总结 🌟
好了，我们刚才把这篇短文所有的“地雷”都排除了。下面我们来复盘一下这几个核心的语法点，这都是以后考试里的常客：
词性转换：看到空格前后是名词，就要想到把括号里的词变成形容词（如 traditional, confident）；看到空格在冠词或介词后，就要变成名词（如 understanding, development）。常用的后缀有 -al, -ent, -ment, -ing。
固定搭配（固定短语）：这是死功夫，必须记下来。比如 regard... as...（把……当作），connect... with...（把……和……连接），not just... but...（不仅……而且）。
动词的时态和语态：
看到时间状语（ago）→ 一般过去时。
看到主语不能自己发出动作（clubs被建立）→ 被动语态。
非谓语动词：continue 后面接 to do（不定式）表示继续做某事。

所有的熟练，都是从生涩的填空开始的
此处留白，非为缺憾，乃邀君共书
`
    },
    {
        content: `Chinese traditional culture is experiencing a revival among young people. A recent report shows that more and more Gen Z (Z世代) are falling in love with Hanfu, the traditional clothing of the Han ethnic group. This trend is not just about fashion; it is a 1. _______ (culture) phenomenon that shows young people's confidence in their heritage.

In Wuhan, a 25-year-old designer named Zhang Lin opened a Hanfu experience studio last year. "I used to 2. _______ (confuse) about my career," Zhang said. "But after visiting museums and studying history, I found my passion." Her studio offers 3. _______ (vary) services, including costume rental, makeup, and photography.

Unlike traditional shops, Zhang's studio uses modern technology. Customers can use an app 4. _______ (design) their own patterns before ordering. The clothes 5. _______ (make) by hand by local artisans (工匠) so far, ensuring high quality.

"Wearing Hanfu makes me feel 6. _______ I have traveled back in time," said a customer. "It's not just a piece of cloth; it carries the 7. _______ (wise) of our ancestors."

The government has also supported this trend. Several cultural festivals 8. _______ (hold) in Hubei Province since 2023 to promote traditional art. These activities provide a platform for young artists 9. _______ (show) their talents.

The revival of Hanfu proves that traditional culture can be modern and cool. It is 10. _______ (true) a bridge connecting the past and the future.`,
        blanks: [
            { index: 1, answer: "cultural" },
            { index: 2, answer: "be confused" },
            { index: 3, answer: "various" },
            { index: 4, answer: "to design" },
            { index: 5, answer: "have been made" },
            { index: 6, answer: "as if" },
            { index: 7, answer: "wisdom" },
            { index: 8, answer: "have been held" },
            { index: 9, answer: "to show" },
            { index: 10,answer: "truly" }
        ],
        explanation: `
第一句
原文：This trend is not just about fashion; it is a 1. _______ (culture) phenomenon that shows young people's confidence in their heritage.

翻译：这种趋势不仅仅是关于时尚，它是一种文化现象，展示了年轻人对自身文化遗产的自信。

分析：同学们，看这道题，我们首先找到线索词。空前是冠词"a"，空后是名词"phenomenon"（现象）。在英语中，冠词后面通常需要接形容词来修饰后面的名词。所以这里显然需要一个形容词来修饰"phenomenon"。

再看括号里给的是"culture"（文化），这是一个名词。我们需要把它变成形容词形式。英语中有一个常见的构词法：在名词后面加后缀"-al"，就可以把它变成形容词。比如"nature"（自然）→"natural"（自然的），"education"（教育）→"educational"（教育的）。同样，"culture"加上"-al"就变成了"cultural"，意思是"文化的"。

规则：这里要记住一个小规律——当一个空前面有冠词（a/an/the）或形容词，后面紧跟着一个名词时，这个空很可能需要填一个形容词来修饰名词。另外，名词作定语时用原形，但如果有明显的形容词特征（如要说明"什么样的现象"），则需要加相应的形容词后缀。

答案：cultural

第二句
原文："I used to 2. _______ (confuse) about my career," Zhang said.

翻译："我曾经对我的职业生涯感到困惑，"张林说。

分析：这句话是张林在回忆自己过去的感受。我们来找线索词。首先是"used to"，这是一个非常重要的信号！短语"used to + 动词原形"表示"过去常常做某事（但现在不做了）"。

再看空后面是"about my career"，这里我们需要说"对什么感到困惑"。在英语中，"对……感到困惑"应该说"be confused about sth"。这里的"confuse"需要用过去分词形式"confused"，构成被动结构，表示"感到困惑的"状态。

为什么这里要用过去分词呢？因为"confused"在这里不是表示"混淆"这个动作，而是表示"感到困惑"的一种状态。英语中"be + 过去分词"常用来表示主语所处的状态。

规则："used to do sth"是一个固定搭配，表示"过去常常做某事"。这里的"to"是不定式符号，后面必须接动词原形。另外，"confuse"作为动词是"使困惑"的意思，而"be confused about"则表示"对……感到困惑"。过去分词在这里有"被动"和"完成"的含义，引申为"处于某种状态"。

答案：be confused

第三句
原文：Her studio offers 3. _______ (vary) services, including costume rental, makeup, and photography.

翻译：她的工作室提供各种各样的服务，包括服装租赁、化妆和摄影。

分析：这道题相对简单。线索词在哪里呢？空后是名词"services"（服务）。和第一题一样，当空后面紧跟名词时，前面很可能需要填一个形容词来修饰它。

括号里给的是"vary"，这是一个动词，意思是"变化"。我们要找的是能够修饰"services"的形容词。在英语中，"various"是"vary"的形容词形式，意思是"各种各样的"。你可以通过加后缀"-ious"或改变拼写来记住它。

规则：动词和形容词之间是可以相互转换的。很多动词加上相应的后缀就变成了形容词。比如"vary"→"various"，"wonder"→"wonderful"（精彩的），"help"→"helpful"（有帮助的）。记住这个规律，以后遇到类似的题就不怕了。

答案：various

第四句
原文：Customers can use an app 4. _______ (design) their own patterns before ordering.

翻译：顾客可以在订购前使用一个应用程序来设计自己的图案。

分析：这道题的线索词是"use an app"（使用应用程序）。当我们说"使用某个工具来做某事"时，在英语中通常用"use sth to do sth"这个结构。"to do"在这里表示目的，意思是"用这个应用程序来设计图案"。

看括号里给的是"design"（设计），我们需要把它变成不定式形式"to design"。这个结构非常常见，比如"use a knife to cut"（用刀来切），"use a pen to write"（用笔来写）。

规则：记住这个万能公式——"use sth to do sth"（使用某物来做某事）。这里的"to"是不定式符号，后面接动词原形，表示做这件事的目的。注意不要把不定式和动名词搞混了，不定式是"to + 动词原形"，动名词是"动词+ing"。

答案：to design

第五句
原文：The clothes 5. _______ (make) by hand by local artisans so far, ensuring high quality.

翻译：到目前为止，这些衣服都是由当地工匠手工制作的，确保了高质量。

分析：这道题有两个线索词，大家一定要擦亮眼睛！第一个是"by hand"（手工），这提示我们是被动语态（衣服是被制作的）。第二个是"so far"（到目前为止），这是表示时间的状语，提示我们应该用现在完成时。

现在完成时的结构是"have/has + 过去分词"。因为主语是"the clothes"（复数），所以用"have"。被动语态的结构是"be + 过去分词"，所以这里需要"have been made"。

整合起来就是：The clothes have been made by hand by local artisans so far. 意思是"迄今为止，这些衣服都是由当地工匠手工制作的"。

规则：现在完成时有一个很重要的标志词——时间状语"so far"（到目前为止）、"already"（已经）、"yet"（还/已经）、"since + 过去时间"（自从……）等。当看到这些词时，就要考虑用现在完成时。另外，"by + 人"通常表示被动语态，说明动作是"被谁"做的。在被动语态中，"by"后面的人或物是动作的执行者（施动者）。

答案：have been made

第六句
原文："Wearing Hanfu makes me feel 6. _______ I have traveled back in time," said a customer.

翻译：一位顾客说："穿汉服让我感觉自己仿佛穿越回了过去。"

分析：这句话有点长，我们先找主干。"Wearing Hanfu makes me feel..."（穿汉服让我感觉……）。空后面是完整的句子"I have traveled back in time"（我穿越回了过去）。

仔细看，空前面是"feel"（感觉），空后面是一个完整的句子。根据意思，"我感觉自己好像穿越回了过去"。在英语中，表示"感觉好像/似乎"用"as if"或"as though"来引导后面的内容。这里的"as if"相当于一个连词，连接"feel"和后面的内容。

规则：当句子中出现"feel/look/sound/seem + as if/though"结构时，表示"感觉/看起来/听起来/似乎好像……"。这个结构用来表达一种比喻或想象的情况。记住这个常用搭配，考试时看到"feel"后面跟一个句子，就可以考虑填"as if"或"as though"。

答案：as if（或"as though"也可以）

第七句
原文："It's not just a piece of cloth; it carries the 7. _______ (wise) of our ancestors."

翻译："它不仅仅是一块布，它承载着我们祖先的智慧。"

分析：线索词非常明显！空前是定冠词"the"，空后是介词短语"of our ancestors"（我们祖先的）。在英语中，"the + ______ + of"是一个常见结构，中间通常填一个名词，表示"……的……"。

括号里给的是"wise"，这是一个形容词，意思是"聪明的/智慧的"。我们要把它变成名词形式。在英语中，形容词加后缀"-dom"可以变成名词吗？不对，正确的变化是"wise"的名词形式是"wisdom"（智慧），这是一个不规则变化，需要单独记忆。类似的例子还有"strong"（强壮的）→"strength"（力量），"long"（长的）→"length"（长度）。

规则：有些名词是由形容词直接变化而来的，但不是加后缀，而是变成了完全不同的形式，这种变化需要特别记忆。比如"wise"→"wisdom"（智慧），"true"→"truth"（真理），"young"→"youth"（青春）。当看到"the + ______ + of"结构时，首先要考虑填名词。

答案：wisdom

第八句
原文：Several cultural festivals 8. _______ (hold) in Hubei Province since 2023 to promote traditional art.

翻译：自2023年以来，湖北省举办了多个文化节以推广传统艺术。

分析：这道题和第5题很相似！线索词在哪里呢？一个是"since 2023"（自2023年以来），另一个是"in Hubei Province"（在湖北省）。时间状语"since 2023"again提示我们用现在完成时。

被动语态的线索是"festivals"（节日）和"hold"（举办）的关系——节日不能自己举办自己，所以要用被动语态，"festivals are held"（节日被举办）。

现在完成时的被动语态结构是"have/has been + 过去分词"。主语是"several cultural festivals"（复数），所以用"have been held"。

完整句子：Several cultural festivals have been held in Hubei Province since 2023... 意思是"自2023年以来，湖北省已经举办了多个文化节……"。

规则：复习一下现在完成时的要点。标志词包括：since + 过去时间（自从……），for + 一段时间（持续了……），so far（到目前为止），already（已经），yet（还/已经）等。现在完成时表示动作从过去开始，持续到现在，或者对现在有影响。另外，被动语态的标志是"by + 施动者"或根据语境判断主语和动词之间的被动关系。

答案：have been held

第九句
原文：These activities provide a platform for young artists 9. _______ (show) their talents.

翻译：这些活动为年轻艺术家提供了一个展示才华的平台。

分析：这句话的结构是"provide sth for sb + to do sth"。我们来分析一下：空前是介词"for"，空后是"their talents"（他们的才华）。根据意思，这里需要一个动词来表示"展示才华"。

当表示"为某人提供做某事的机会/平台"时，英语中常用"provide sth for sb to do"这个结构。"to do"在这里是动词不定式，作目的状语，解释提供这个平台是为了什么。

规则：这个结构要记住——"provide sth for sb to do"（为某人提供某物来做某事）。不定式"to + 动词原形"在这里表示目的。类似的结构还有"give sb sth to do"（给某人某物去做），"buy sb sth to use"（给某人买某物去用）等。

答案：to show

第十句
原文：It is 10. _______ (true) a bridge connecting the past and the future.

翻译：它真的是一座连接过去与未来的桥梁。

分析：这道题很容易，但也很容易出错。线索词在哪里呢？空后是动词"is"，空后是名词"a bridge"。我们要填的这个词是用来修饰整个句子的，意思是"真的是/真正地是"。

在英语中，修饰动词、形容词或整个句子的词叫副词。括号里给的是"true"（真实的/正确的），这是形容词，它的副词形式是"truly"（真正地）。副词通常用来修饰动词、形容词或其他副词，而形容词通常修饰名词。

规则：形容词修饰名词，副词修饰动词、形容词或整个句子。区分两者的方法是：如果你要修饰的是动词（像这里的"is"，虽然是系动词，但也属于动词范畴）或者要强调整个句子表达的程度，就要用副词。常见的变化是：形容词 + ly = 副词。比如"true"→"truly"，"real"→"really"，"quick"→"quickly"，"happy"→"happily"。

答案：truly

整体总结
核心语法点回顾
同学们，恭喜你们完成了这道语法填空！现在我们来回顾一下这篇文章涉及的几个核心语法点：

1. 形容词与名词的转换

名词作定语时用原形（如"culture phenomenon"中"culture"作定语）
但要表达"什么样的"时，需要用形容词形式（如"cultural phenomenon"用形容词"cultural"修饰"phenomenon"）
常见后缀：-al, -ous, -ful, -able等
2. 过去分词的作用

过去分词可以构成被动语态（be + 过去分词）
过去分词可以表示状态（be confused感到困惑）
"used to be confused"表示"过去常常感到困惑"
3. 动词不定式（to + 动词原形）

表示目的："use an app to design"（用应用程序来设计）
在某些结构中："provide a platform to show"（提供平台来展示）
4. 现在完成时的被动语态

结构：have/has been + 过去分词
标志词：since...（自从），so far（到目前为止）
被动语态标志：by + 施动者，或根据主语与动词的被动关系判断
5. 形容词与副词的区别

形容词修饰名词：various services（各种服务）
副词修饰动词/句子：truly a bridge（真的是一座桥）
变化规则：形容词 + ly = 副词
6. 连词as if/though

用于"feel/look/sound + as if"结构
表示"感觉/看起来/听起来好像……"

所有的熟练，都是从生涩的填空开始的
此处留白，非为缺憾，乃邀君共书
`
    }
];

// ========== 状态管理 ==========
let currentGrammarIndex = 0;
let userAnswers = {};
const GRAMMAR_PROGRESS_KEY = 'wdenglish_grammar_progress';

// ========== DOM 元素 ==========
let grammarContent, grammarQuestionNumber, grammarTotalQuestions;
let grammarPrevBtn, grammarCheckBtn, grammarNextBtn;
let grammarResult, grammarExplanation;
let grammarCard;

// ========== 初始化函数 ==========
function initGrammarFill() {
    // 获取 DOM 元素
    grammarContent = document.getElementById('grammarContent');
    grammarQuestionNumber = document.getElementById('grammarQuestionNumber');
    grammarTotalQuestions = document.getElementById('grammarTotalQuestions');
    grammarPrevBtn = document.getElementById('grammarPrevBtn');
    grammarCheckBtn = document.getElementById('grammarCheckBtn');
    grammarNextBtn = document.getElementById('grammarNextBtn');
    grammarResult = document.getElementById('grammarResult');
    grammarExplanation = document.getElementById('grammarExplanation');
    grammarCard = document.querySelector('.grammar-card');
    
    // 检查元素是否存在
    if (!grammarContent || !grammarQuestionNumber || !grammarTotalQuestions ||
        !grammarPrevBtn || !grammarCheckBtn || !grammarNextBtn ||
        !grammarResult || !grammarExplanation || !grammarCard) {
        console.error('语法填空模块：缺少必要的 DOM 元素');
        return;
    }
    
    // 更新总题数
    grammarTotalQuestions.textContent = grammarQuestions.length;
    
    // 恢复进度
    loadGrammarProgress();
    
    // 渲染当前题目
    renderGrammarQuestion();
    
    // 绑定事件
    bindGrammarEvents();
}

// ========== 渲染函数 ==========
function renderGrammarQuestion() {
    const question = grammarQuestions[currentGrammarIndex];

    console.log('渲染题目:', question);

    // 更新题号
    grammarQuestionNumber.textContent = currentGrammarIndex + 1;

    // 清空内容
    grammarContent.innerHTML = '';
    grammarResult.innerHTML = '';
    grammarResult.className = 'result';
    grammarExplanation.innerHTML = '';
    grammarExplanation.className = 'explanation';

    // 重置用户答案
    userAnswers = {};

    // 解析段落
    const paragraphs = parseParagraphs(question.content);

    // 渲染段落
    paragraphs.forEach(paragraph => {
        const paragraphEl = document.createElement('div');
        paragraphEl.className = 'grammar-paragraph';

        // 解析句子
        const sentences = parseSentences(paragraph);

        sentences.forEach(sentence => {
            const sentenceEl = document.createElement('span');
            sentenceEl.className = 'grammar-sentence';

            // 解析填空
            const parsedParts = parseBlanks(sentence, question.blanks);

            parsedParts.forEach(part => {
                if (part.type === 'text') {
                    const textEl = document.createElement('span');
                    textEl.className = 'grammar-text';
                    textEl.textContent = part.content;
                    sentenceEl.appendChild(textEl);
                } else if (part.type === 'number') {
                    const numberEl = document.createElement('span');
                    numberEl.className = 'grammar-number';
                    numberEl.textContent = part.content;
                    sentenceEl.appendChild(numberEl);
                } else if (part.type === 'blank') {
                    const blankEl = createBlankElement(part.blank);
                    sentenceEl.appendChild(blankEl);
                } else if (part.type === 'hint') {
                    const hintEl = document.createElement('span');
                    hintEl.className = 'grammar-hint';
                    hintEl.textContent = part.content;
                    sentenceEl.appendChild(hintEl);
                }
            });

            paragraphEl.appendChild(sentenceEl);
        });

        grammarContent.appendChild(paragraphEl);
    });

    // 更新按钮状态
    updateButtonStates();

    // 检查渲染的输入框数量
    const renderedBlanks = grammarContent.querySelectorAll('.grammar-blank');
    console.log('渲染的输入框数量:', renderedBlanks.length);
    console.log('预期的输入框数量:', question.blanks.length);
}

// ========== 解析函数 ==========
function parseParagraphs(content) {
    // 按双换行符分割段落
    return content.split(/\n\s*\n/).filter(p => p.trim());
}

function parseSentences(paragraph) {
    // 智能混合：优先保持原始结构，但过长的句子会自动换行
    const sentences = [];
    let currentSentence = '';

    for (let i = 0; i < paragraph.length; i++) {
        const char = paragraph[i];
        currentSentence += char;

        // 遇到句号、问号、感叹号
        if (char === '.' || char === '?' || char === '!') {
            // 检查是否是数字后面的句号（如 "1."），如果是则不分割
            if (char === '.' && i > 0 && /\d/.test(paragraph[i - 1])) {
                continue;
            }
            sentences.push(currentSentence.trim());
            currentSentence = '';
        }
        // 遇到逗号且当前句子过长（超过100字符）
        else if (char === ',' && currentSentence.length > 100) {
            sentences.push(currentSentence.trim());
            currentSentence = '';
        }
    }

    if (currentSentence.trim()) {
        sentences.push(currentSentence.trim());
    }

    return sentences;
}

function parseBlanks(sentence, blanks) {
    const parts = [];
    let lastIndex = 0;

    console.log('解析句子:', sentence);
    console.log('填空列表:', blanks);

    // 创建一个查找表，方便根据编号查找填空信息
    const blankMap = {};
    blanks.forEach(blank => {
        blankMap[blank.index] = blank;
    });

    // 查找所有填空标记（数字+点+下划线）
    const blankPattern = /(\d+)\.\s*_{3,}(?:\s*\([^)]+\))?/g;
    let match;
    const matches = [];

    // 找到所有匹配的填空标记
    while ((match = blankPattern.exec(sentence)) !== null) {
        const index = parseInt(match[1]);
        console.log(`找到填空标记: ${index} 在位置 ${match.index}, 匹配内容: "${match[0]}"`);

        if (blankMap[index]) {
            matches.push({
                index: index,
                match: match,
                blank: blankMap[index]
            });
        }
    }

    // 按位置排序
    matches.sort((a, b) => a.match.index - b.match.index);

    console.log('所有匹配的填空:', matches);

    // 构建结果
    matches.forEach(item => {
        const match = item.match;

        // 添加填空前的文本
        if (match.index > lastIndex) {
            parts.push({
                type: 'text',
                content: sentence.substring(lastIndex, match.index)
            });
        }

        // 添加数字编号
        const numberMatch = match[0].match(/^(\d+)\./);
        if (numberMatch) {
            parts.push({
                type: 'number',
                content: numberMatch[0] // 保留数字和点，如 "1."
            });
        }

        // 添加填空
        parts.push({
            type: 'blank',
            blank: item.blank
        });

        // 提取并添加括号里的提示内容
        const hintMatch = match[0].match(/\(([^)]+)\)/);
        if (hintMatch) {
            parts.push({
                type: 'hint',
                content: hintMatch[0] // 保留括号，如 "(greatest)"
            });
        }

        lastIndex = match.index + match[0].length;
    });

    // 添加剩余文本
    if (lastIndex < sentence.length) {
        parts.push({
            type: 'text',
            content: sentence.substring(lastIndex)
        });
    }

    console.log('解析结果:', parts);
    return parts;
}

function createBlankElement(blank) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'grammar-blank';
    input.dataset.blankIndex = blank.index;
    input.dataset.answer = blank.answer;
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.disabled = false;
    input.readOnly = false;

    // 设置初始宽度为 80px
    input.style.width = '80px';

    // 输入事件
    input.addEventListener('input', (e) => {
        userAnswers[blank.index] = e.target.value.trim();

        // 动态调整输入框宽度
        const value = e.target.value;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
            context.font = getComputedStyle(e.target).font;
            const textWidth = context.measureText(value).width;

            // 根据文字宽度调整输入框宽度，最小80px，最大200px
            // 添加 30px 的缓冲空间，避免频繁调整
            const newWidth = Math.max(80, Math.min(200, textWidth + 30));
            e.target.style.width = newWidth + 'px';
            console.log('输入框宽度调整:', value, textWidth, newWidth);
        } else {
            console.log('Canvas context not supported');
        }
    });

    // 回车键跳到下一个填空
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const allBlanks = Array.from(grammarContent.querySelectorAll('.grammar-blank'));
            const currentIndex = allBlanks.indexOf(input);
            if (currentIndex < allBlanks.length - 1) {
                allBlanks[currentIndex + 1].focus();
            }
        }
    });

    // 点击事件（用于调试）
    input.addEventListener('click', (e) => {
        console.log('输入框被点击:', blank.index);
    });

    console.log('创建输入框:', blank.index, blank.hint);

    return input;
}

// ========== 事件处理 ==========
function bindGrammarEvents() {
    grammarPrevBtn.addEventListener('click', prevGrammarQuestion);
    grammarNextBtn.addEventListener('click', nextGrammarQuestion);
    grammarCheckBtn.addEventListener('click', checkGrammarAnswer);
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        // 只在语法填空卡片显示时响应
        if (!grammarCard || grammarCard.classList.contains('hidden')) return;
        
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            checkGrammarAnswer();
        }
    });

    // 文本选择事件监听
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('touchend', handleTextSelection);
    
    // 点击其他地方隐藏气泡框
    document.addEventListener('mousedown', (e) => {
        const tooltip = document.getElementById('translationTooltip');
        if (tooltip && !tooltip.contains(e.target)) {
            hideTranslationTooltip();
        }
    });

    // 屏蔽语法填空区域的右键菜单
    const grammarContentEl = document.getElementById('grammarContent');
    if (grammarContentEl) {
        grammarContentEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    }

    // 屏蔽选中文本时的浏览器默认行为
    document.addEventListener('mouseup', (e) => {
        // 只在语法填空卡片显示时响应
        if (!grammarCard || grammarCard.classList.contains('hidden')) return;

        const grammarContentEl = document.getElementById('grammarContent');
        if (!grammarContentEl) return;

        // 如果选中的文本在语法填空区域内，阻止某些默认行为
        const selection = window.getSelection();
        if (selection.toString().trim() && grammarContentEl.contains(selection.anchorNode)) {
            // 阻止选中文本后的某些浏览器默认行为
            e.preventDefault();
        }
    }, true);
}

function prevGrammarQuestion() {
    if (currentGrammarIndex > 0) {
        currentGrammarIndex--;
        renderGrammarQuestion();
        saveGrammarProgress();
    }
}

function nextGrammarQuestion() {
    if (currentGrammarIndex < grammarQuestions.length - 1) {
        currentGrammarIndex++;
        renderGrammarQuestion();
        saveGrammarProgress();
    }
}

function checkGrammarAnswer() {
    const question = grammarQuestions[currentGrammarIndex];
    const blanks = question.blanks;
    let correctCount = 0;
    let allFilled = true;
    
    // 检查每个填空
    blanks.forEach(blank => {
        const input = grammarContent.querySelector(`.grammar-blank[data-blank-index="${blank.index}"]`);
        const userAnswer = userAnswers[blank.index] || '';
        
        if (!userAnswer) {
            allFilled = false;
            input.classList.remove('correct', 'incorrect');
            return;
        }
        
        // 比较答案（忽略大小写）
        if (userAnswer.toLowerCase() === blank.answer.toLowerCase()) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctCount++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
    
    // 显示结果
    if (!allFilled) {
        grammarResult.textContent = '⚠️ 请填写所有空白处后再检查答案';
        grammarResult.className = 'result incorrect';
        return;
    }
    
    if (correctCount === blanks.length) {
        grammarResult.textContent = `✨ 恭喜！全部正确！`;
        grammarResult.className = 'result correct';

        // 格式化答案列表
        const answersHtml = formatAnswers(blanks);
        // 格式化解析内容：保留换行和段落格式
        const formattedExplanation = formatExplanation(question.explanation);
        grammarExplanation.innerHTML = answersHtml + '<br>' + formattedExplanation;
        grammarExplanation.classList.add('visible');
        saveGrammarProgress();
    } else {
        grammarResult.textContent = `❌ 答对了 ${correctCount}/${blanks.length} 个空`;
        grammarResult.className = 'result incorrect';

        // 格式化答案列表
        const answersHtml = formatAnswers(blanks);
        // 格式化解析内容：保留换行和段落格式
        const formattedExplanation = formatExplanation(question.explanation);
        grammarExplanation.innerHTML = answersHtml + '<br>' + formattedExplanation;
        grammarExplanation.classList.add('visible');
    }
}

// 格式化解析内容
function formatExplanation(explanation) {
    // 将换行符转换为 <br> 标签
    // 连续两个换行符转换为 <br><br>（段落分隔）
    return explanation
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
}

// 格式化答案列表
function formatAnswers(blanks) {
    let html = '<div class="answers-list"><strong>参考答案：</strong><br>';
    
    blanks.forEach((blank, index) => {
        // 每两个答案换行
        if (index > 0 && index % 2 === 0) {
            html += '<br>';
        }
        
        html += `<span class="answer-item">${blank.index}. ${blank.answer}</span>`;
        
        // 每两个答案之间添加间距
        if (index % 2 === 0 && index < blanks.length - 1) {
            html += '<span class="answer-spacer"></span>';
        }
    });
    
    html += '</div>';
    return html;
}

function updateButtonStates() {
    grammarPrevBtn.disabled = currentGrammarIndex === 0;
    grammarNextBtn.disabled = currentGrammarIndex === grammarQuestions.length - 1;
    
    if (grammarPrevBtn.disabled) {
        grammarPrevBtn.classList.add('disabled');
    } else {
        grammarPrevBtn.classList.remove('disabled');
    }
    
    if (grammarNextBtn.disabled) {
        grammarNextBtn.classList.add('disabled');
    } else {
        grammarNextBtn.classList.remove('disabled');
    }
}

// ========== 进度管理 ==========
function saveGrammarProgress() {
    try {
        const progressData = {
            currentGrammarIndex: currentGrammarIndex,
            timestamp: Date.now()
        };
        localStorage.setItem(GRAMMAR_PROGRESS_KEY, JSON.stringify(progressData));
    } catch (error) {
        console.error('保存语法填空进度失败:', error);
    }
}

function loadGrammarProgress() {
    try {
        const savedProgress = localStorage.getItem(GRAMMAR_PROGRESS_KEY);
        if (savedProgress) {
            const progressData = JSON.parse(savedProgress);
            if (progressData.currentGrammarIndex !== undefined && 
                progressData.currentGrammarIndex >= 0 && 
                progressData.currentGrammarIndex < grammarQuestions.length) {
                currentGrammarIndex = progressData.currentGrammarIndex;
                return true;
            }
        }
    } catch (error) {
        console.error('恢复语法填空进度失败:', error);
    }
    return false;
}

// ========== 工具函数 ==========
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', initGrammarFill);

// ========== 翻译气泡框功能 ==========

/**
 * 处理文本选择事件
 */
function handleTextSelection() {
    // 只在语法填空卡片显示时响应
    if (!grammarCard || grammarCard.classList.contains('hidden')) return;

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    // 如果没有选中文本，隐藏气泡框
    if (!selectedText) {
        hideTranslationTooltip();
        return;
    }

    // 如果选中的文本太短或太长，不显示气泡框
    if (selectedText.length < 1 || selectedText.length > 100) {
        return;
    }

    // 检查选中的文本是否在语法填空内容区域内
    const range = selection.getRangeAt(0);
    const grammarContentEl = document.getElementById('grammarContent');
    if (!grammarContentEl || !grammarContentEl.contains(range.commonAncestorContainer)) {
        hideTranslationTooltip();
        return;
    }

    // 获取选中文本的位置
    const rect = range.getBoundingClientRect();
    
    // 显示气泡框并调用翻译API
    showTranslationTooltip(rect, selectedText);
}

/**
 * 显示翻译气泡框
 * @param {DOMRect} rect - 选中文本的位置信息
 * @param {string} text - 选中的文本
 */
async function showTranslationTooltip(rect, text) {
    let tooltip = document.getElementById('translationTooltip');
    
    // 如果气泡框不存在，创建它
    if (!tooltip) {
        tooltip = createTranslationTooltip();
        document.body.appendChild(tooltip);
    }

    // 设置气泡框位置
    const tooltipWidth = 200;
    const tooltipHeight = 80;
    const arrowSize = 10;
    const offsetTop = 15;

    // 计算水平位置（居中显示）
    let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    
    // 边界检查：防止超出左边界
    if (left < 10) {
        left = 10;
    }
    
    // 边界检查：防止超出右边界
    if (left + tooltipWidth > window.innerWidth - 10) {
        left = window.innerWidth - tooltipWidth - 10;
    }

    // 计算垂直位置（显示在选中内容上方）
    let top = rect.top - tooltipHeight - arrowSize - offsetTop;
    
    // 边界检查：如果上方空间不足，显示在下方
    if (top < 10) {
        top = rect.bottom + arrowSize + offsetTop;
        tooltip.classList.add('tooltip-bottom');
    } else {
        tooltip.classList.remove('tooltip-bottom');
    }

    // 设置位置
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.display = 'block';

    // 显示加载状态
    tooltip.innerHTML = '<div class="tooltip-loading">翻译中...</div>';

    // 调用百度翻译API
    try {
        const translation = await translateText(text);
        tooltip.innerHTML = `<div class="tooltip-content">
            <div class="tooltip-original">${escapeHtml(text)}</div>
            <div class="tooltip-translation">${escapeHtml(translation)}</div>
        </div>`;
    } catch (error) {
        console.error('翻译失败:', error);
        tooltip.innerHTML = `<div class="tooltip-error">翻译失败</div>`;
    }
}

/**
 * 隐藏翻译气泡框
 */
function hideTranslationTooltip() {
    const tooltip = document.getElementById('translationTooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

/**
 * 创建翻译气泡框元素
 * @returns {HTMLElement} 气泡框元素
 */
function createTranslationTooltip() {
    const tooltip = document.createElement('div');
    tooltip.id = 'translationTooltip';
    tooltip.className = 'translation-tooltip';
    return tooltip;
}

/**
 * 调用百度翻译API
 * @param {string} text - 待翻译的文本
 * @returns {Promise<string>} 翻译结果
 */
async function translateText(text) {
    // 检查百度翻译服务是否可用
    if (typeof window.baiduTranslateService === 'undefined') {
        console.error('百度翻译服务未初始化');
        return '翻译服务不可用';
    }

    try {
        // 调用百度翻译API，自动检测源语言，翻译为中文
        const result = await window.baiduTranslateService.translate(text, 'auto', 'zh');
        return result;
    } catch (error) {
        console.error('翻译API调用失败:', error);
        throw error;
    }
}