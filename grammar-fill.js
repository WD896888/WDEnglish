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
},
{
    content: `Chinese AI company DeepSeek shocked the world in January 2026. It released 1. ____ new AI model called DeepSeek-V4, 2. ________ had performance as good as GPT-5 but cost much 3. ________ (little) to train. This achievement proved that China could lead 4. ______ the field of artificial intelligence.

DeepSeek was founded in 2023 by Liang Wenfeng. The team worked in a very simple office building, 5. ________ they created something amazing. They used 6. ________ (innovative) training methods to save money while improving 7. ________ (accurate). Many foreign experts said this was 8. ________ (possible) because it broke the belief that only big tech companies with huge budgets could develop top AI models.

"This success belongs to every Chinese researcher 9. ________ (work) hard in AI," said Liang. The story of DeepSeek shows that 10. ________ (determine) and creativity matter more than money.`,
        blanks: [
            { index: 1, answer: "a" },
            { index: 2, answer: "which" },
            { index: 3, answer: "less" },
            { index: 4, answer: "in" },
            { index: 5, answer: "where/but" },
            { index: 6, answer: "innovative" },
            { index: 7, answer: "accuracy" },
            { index: 8, answer: "impossible" },
            { index: 9, answer: "working" },
            { index: 10, answer: "determination" }
        ],
        explanation: `题目解析：
第 1 题
第一句
原文： It released 1. ____ new AI model called DeepSeek-V4...
翻译： 它发布了一个新的 AI 模型，叫做 DeepSeek-V4……

分析：
我们要看空后面跟着什么。空后面是 new AI model（新的 AI 模型）。这是第一次提到这个模型，不是特指某一个大家都知道的模型，所以我们要用不定冠词。因为 new 的发音是以辅音音素（类似于 n）开头的，所以要用 a。
规则：
不定冠词：当你第一次提到某个人或物，或者表示“一个”时，用 a 或 an。
答案： a

第 2 题
第一句
原文： It released a new AI model called DeepSeek-V4, 2. ________ had performance as good as GPT-5...
翻译： 它发布了一个名为 DeepSeek-V4 的新 AI 模型，该模型的性能与 GPT-5 一样好……

分析：
看这个句子，逗号后面跟了一个句子，缺了一个主语。这句话是在补充说明前面的 DeepSeek-V4。在英语中，逗号后面不能直接加 that 来引导从句（这是考试的一个重要考点！），指代前面的事物通常用 which。
规则：
非限制性定语从句：这句话有点绕，你只需要记住：当逗号后面需要填一个词来指代前面那个东西（这里是模型），而且那个东西不是人，我们就用 which。千万不要用 that 哦！
答案： which

第 3 题
第一句
原文： ...but cost much 3. ________ (little) to train.
翻译： ……但训练成本要低得多。

分析：
这里有一个非常明显的关键词 much（……得多）。在英语里，much 后面通常跟形容词或副词的比较级。我们要表达的是“成本更少”，也就是 little 的比较级。
规则：
比较级：用来表示“更……”的意思。
little（少/小的）的比较级是不规则变化，要变成 less。
答案： less

第 4 题
第二句
原文： This achievement proved that China could lead 4. ______ the field of artificial intelligence.
翻译： 这一成就证明了中国可以引领人工智能领域。

分析：
这里考的是一个固定的搭配。lead 是动词，后面通常不会直接加名词，需要一个小词来连接。
规则：
介词固定搭配：在某个领域处于领先地位，我们要说 lead in the field of...。就像我们在大海里游泳用 in the sea 一样，在这个领域里，也用 in。
答案： in

第 5 题
第四句
原文： The team worked in a very simple office building, 5. ________ they created something amazing.
翻译： 团队在一个非常简陋的办公楼里工作，在那里他们创造了一些惊人的东西。

分析：
这里又出现了逗号，后面跟了一个完整的句子。我们要填的词是指代前面的地点 office building（办公楼）。
规则：
定语从句的关系副词：如果空前面的词表示地点（比如 building, room, city），而且后面句子是完整的（不缺主语也不缺宾语），我们就用 where。意思就是“在这个地方”。
答案： where

第 6 题
第五句
原文： They used 6. ________ (innovative) training methods to save money...
翻译： 他们使用创新的训练方法来省钱……

分析：
空后面是名词 training methods（训练方法）。名词前面通常需要形容词来修饰它，告诉我们这是什么样的方法。
规则：
词性转换：我们要把括号里的词变成形容词。
innovate（动词，创新） -> innovative（形容词，创新的）。
答案： innovative

第 7 题
第五句
原文： ...while improving 7. ________ (accurate).
翻译： ……同时提高准确性。

分析：
improving 是“提高、改善”的意思，它是一个动作，后面通常要接一个名词作为宾语，也就是“提高什么？”。所以我们需要把括号里的词变成名词形式。
规则：
词性转换：accurate 是形容词（准确的），我们要把它变成名词。
通常在形容词后面加 ness 变成名词。accurate -> accuracy（准确性）。
答案： accuracy

第 8 题
第六句
原文： Many foreign experts said this was 8. ________ (possible) because it broke the belief...
翻译： 许多外国专家说这是可能的，因为它打破了……

分析：
空前面是 was（是），这是系动词，系动词后面要接形容词作表语。而且句子后半部分说“打破了只有大公司才能做”的信念，说明大家以前觉得不行，现在发现是行的。
规则：
系表结构：be 动词 + 形容词。
括号里给的 possible 本身就是形容词，意思是“可能的”。虽然语境上可能暗示以前觉得“不可能”，但这里填 possible 在语法和逻辑上是通顺的（专家承认这是可能的）。
答案： possible

第 9 题
第七句
原文： "This success belongs to every Chinese researcher 9. ________ (work) hard in AI," said Liang.
翻译： “这个成功属于每一位在 AI 领域努力工作的中国研究人员，”梁文锋说。

分析：
这里空后面跟着一个动词 work。我们要修饰前面的名词 researcher（研究人员）。因为研究人员是“主动”去工作的，所以我们用现在分词。
规则：
现在分词作后置定语：这个词有点长，意思就是“放在名词后面修饰它”。
主动关系用 ing。就像“正在看书的学生”是 student reading。
work 变成 working。
答案： working

第 10 题
第八句
原文： The story of DeepSeek shows that 10. ________ (determine) and creativity matter more than money.
翻译： DeepSeek 的故事表明，决心和创造力比金钱更重要。

分析：
空后面是 and creativity。注意这个 and，它连接两个并列的词。creativity（创造力）是名词，所以前面的词也必须是名词，才能手拉手站在一起。
规则：
词性转换：动词变名词。
determine（动词，决心/决定） -> 去掉结尾的 e，加上 ation，变成 determination（名词，决心）。
答案： determination

📝 整体总结
好啦，我们已经把所有题目都做完了！这里有几个这篇文章里经常考的核心语法点，你要记一下小笔记：
定语从句（逗号后的连接词）： 只要看到逗号后面缺词，指物通常用 which，指地点通常用 where。
词性转换（动词变名词/形容词）： 看空前后的词，如果是名词前，就变形容词；如果动词后或 and 连接名词，就变名词。
比较级： 看到 much，就要想到要把后面的形容词变成“更……”的形式。

所有的熟练，都是从生涩的填空开始的
此处留白，非为缺憾，乃邀君共书
`
},
{
    content: `On December 4, 2024, Spring Festival was 1. ________ (official) added to the UNESCO Intangible Cultural Heritage list. This is 2. ________ great recognition of Chinese culture and brings honor to millions of 3. ________ (family) celebrating this important festival.

Spring Festival, also called Chinese New Year, has a history of over 3,000 years. It is a time 4. ______ family members get together, enjoy big meals, and wish each other good luck. The festival includes many traditions, 5. ________ (range) from pasting red couplets to giving red envelopes 6. ________ (contain) lucky money to children.

The UNESCO decision highlights the importance 7. ________ protecting cultural diversity in a globalized world. "This is 8. ________ (definite) the best news I've heard this year," said a netizen on Weibo. Many hope this will inspire young people 9. ________ (learn) more about their own cultural roots and pass down traditions 10. ________ the next generation.`,
        blanks: [
            { index: 1, answer: "officially" },
            { index: 2, answer: "a" },
            { index: 3, answer: "families" },
            { index: 4, answer: "when" },
            { index: 5, answer: "ranging" },
            { index: 6, answer: "containing" },
            { index: 7, answer: "of" },
            { index: 8, answer: "definitely" },
            { index: 9, answer: "to learn" },
            { index: 10, answer: "to" }
        ],
        explanation: `题目解析：
第一题
原文： On December 4, 2024, Spring Festival was 1. ________ (official) added to the UNESCO Intangible Cultural Heritage list.
翻译： 2024年12月4日，春节被正式列入联合国教科文组织非物质文化遗产名录。

分析：
线索词： 动词 added（被添加）。
推导： 这里有一个动词 "added"，我们需要看看是用什么来修饰它。在英语里，如果你想说明这个动作是“怎么样”发生的（比如是“正式地”还是“突然地”），我们需要用到副词。
逻辑： 括号给的是 "official"（形容词，官方的），形容词不能直接修饰动词，我们要把它变成副词形式，就像在后面加个“ly”小尾巴一样。
规则： 形容词变副词。形容词修饰名词（如 official document），副词修饰动词、形容词或整个句子（如 officially added）。副词就像是动作的“化妆师”，描述动作的状态。
答案： officially

第二题
原文： This is 2.  great recognition of Chinese culture and brings honor to millions of 3.  (family) celebrating this important festival.
翻译： 这是对中国文化的高度认可，并给庆祝这一重要节日数百万个家庭带来了荣耀。

分析：
线索词： 名词词组 great recognition。
推导： "recognition" 是一个单数可数名词，意思是你想表达“这是一个巨大的认可”。英语中单数名词通常不能“光着头”出现，前面需要戴一顶“帽子”，也就是冠词。
逻辑： 后面的单词 "great" 是以辅音音素（g）开头的，所以我们要用不定冠词 "a"。
规则： 不定冠词 a/an 的用法。表示“一个”或者“一种”。如果后面单词首字母发音是元音（如 a, e, i, o, u）用 an，如果是辅音用 a。
答案： a

第三题
原文： ...brings honor to millions of 3. ________ (family) celebrating this important festival.
翻译： ...给庆祝这一重要节日数百万个家庭带来了荣耀。

分析：
线索词： millions of（数百万的...）。
推导： "millions of" 后面肯定要跟复数名词，因为它表示非常多。括号里的 "family" 是单数家庭，这里肯定不止一个家庭。
逻辑： 把 "family" 变成复数形式。
规则： 可数名词复数。英语里表示超过一个的人或事物，要在词尾加 -s 或 -es。
答案： families

第四题
原文： Spring Festival, also called Chinese New Year, has a history of over 3,000 years. It is a time 4. ______ family members get together, enjoy big meals, and wish each other good luck.
翻译： 春节，也叫中国新年，有3000多年的历史。这是一个家人团聚、享受大餐、互祝好运的时刻。

分析：
线索词： time（时刻/时候），后面跟着一个完整的句子 "family members get together..."。
推导： 这里 "time" 后面跟的是一个句子，用来修饰说明是什么样的时候。这是一个定语从句（专门用来修饰名词的从句）。
逻辑： 当先行词（被修饰的词）是表示时间的时候，而且这个时间在后面的句子里充当状语（在...时候），我们要用关系副词 when。
规则： 定语从句的关系副词 when。用来修饰表示时间的词（如 time, day, year），相当于 "at which"。
答案： when

第五题
原文： The festival includes many traditions, 5.  (range) from pasting red couplets to giving red envelopes 6.  (contain) lucky money to children.
翻译： 这个节日包含许多传统，从贴春联到给装着压岁钱的红包给孩子。

分析：
线索词： 逗号 , + 动词 range，主语是 traditions。
推导： 句子里已经有了谓语动词 "includes"，所以 "range" 这里不能做谓语，它需要变成非谓语动词（不做谓语的动词）。
逻辑： "traditions"（传统）和 "range"（包括）之间是什么关系呢？是传统“主动去包括”各种活动，所以用主动形式。看到逗号后面跟动词，通常用 doing（现在分词）表示伴随或主动。
规则： 非谓语动词：现在分词。当动词不做谓语，且与修饰的名词是主动关系时，用 -ing 形式。
答案： ranging

第六题
原文： ...giving red envelopes 6. ________ (contain) lucky money to children.
翻译： ...给装着压岁钱的红包给孩子。

分析：
线索词： 名词 red envelopes，后面跟动词 contain。
推导： 这里是在修饰 "red envelopes"，告诉我们是什么样的红包（里面装着钱的）。这也是非谓语动词做后置定语。
逻辑： 是红包“主动包含”着钱吗？是的，红包里装有钱，是主动关系，所以依然用 -ing 形式。注意这里不是被动，不是“被包含在红包里”。
规则： 现在分词做定语。名词后面跟动词，如果表示名词“发出”这个动作或“具有”这个特征，用 -ing。
答案： containing

第七题
原文： The UNESCO decision highlights the importance 7. ________ protecting cultural diversity in a globalized world.
翻译： 联合国教科文组织的这一决定凸显了在全球化世界中保护文化多样性的重要性。

分析：
线索词： 名词 importance，后面跟动名词短语 protecting...。
推导： 我们要找的是连接“重要性”和“保护”这个词。这是一个固定搭配。
逻辑： “做某事的重要性”，英语里习惯用介词 of 来连接。
规则： 固定搭配：the importance of doing sth.（做某事的重要性）。这里的 protecting 是动名词（把动词变成名词性质的词）。
答案： of

第八题
原文： "This is 8. ________ (definite) the best news I've heard this year," said a netizen on Weibo.
翻译： “这绝对是我今年听到的最好的消息，”一位微博网友说。

分析：
线索词： 系动词 is，后面跟着形容词短语 the best news。
推导： 我们要修饰的是后面的形容词 "best" 或者整个句子。括号里的 "definite" 是形容词（确定的）。
逻辑： 形容词不能修饰形容词，我们要把它变成副词来修饰整个句子，表达“绝对是...”。
规则： 形容词变副词（definite -> definitely）。用来加强语气，相当于“certainly”。
答案： definitely

第九题
原文： Many hope this will inspire young people 9.  (learn) more about their own cultural roots and pass down traditions 10.  the next generation.
翻译： 许多人希望这将激励年轻人更多地了解自己的文化根源，并将传统传承给下一代。

分析：
线索词： inspire（激励/启发），后面跟了对象 young people。
推导： 激励年轻人去做什么呢？去“学习”。
逻辑： "inspire sb. to do sth." 是一个非常常见的固定句型，表示“激励某人做某事”。所以这里用不定式符号 to 加上动词原形。
规则： 不定式做宾语补足语：inspire sb to do sth。类似的用法还有 want sb to do sth。
答案： to learn

第十题
原文： ...and pass down traditions 10. ________ the next generation.
翻译： ...并将传统传承给下一代。

分析：
线索词： 动词短语 pass down（传承/传递），后面跟了名词 the next generation（下一代）。
推导： 东西传给谁呢？这里缺一个介词，表示动作的方向。
逻辑： 把东西传递给某人，用介词 to。pass sth. to sb.。
规则： 介词搭配：pass ... to ...（把...传给...）。
答案： to

🌟 整体总结
同学，你看，刚才我们完成了所有的题目！这篇短文虽然有一些生词，但考的语法点其实非常有规律。我们来回顾一下今天用到的“通关秘籍”：
词性转换：看到动词想修饰它，要把形容词变副词（加 -ly）。
冠词：单数可数名词前面，记得戴帽子（a/an）。
名词复数：看到表示“很多”的词，名词记得变复数（加 -s）。
定语从句：修饰时间，后面句子不缺主语宾语时，填 when。
非谓语动词：逗号后或名词后跟动词，如果是主动关系，用 -ing。
固定搭配：要多积累，比如 importance of, inspire sb to do, pass to。
你已经做得非常棒了！做语法填空最重要的是找线索，不要瞎猜。把你找到的线索圈出来，答案就在那里。继续保持这种思考的节奏，你的英语一定会越来越好的！加油！

所有的熟练，都是从生涩的填空开始的
此处留白，非为缺憾，乃邀君共书
`
    },
    {
content: `The 9th Asian Winter Games opened in Harbin on February 7, 2025. This was the 1. ________ (three) time China hosted the event, following Changchun 2007. The opening ceremony, 2. ________ theme was "Dream of Winter, Love among Asia," amazed the 3. ________ (audience) with beautiful ice sculptures.

Harbin, 4. ________ as the "Ice City," is famous for its winter culture. Athletes from 34 countries competed in 11 sports. China topped the medal table, winning 32 gold medals, 5. ________ set a new record for the 6. ________ (host) country.

The success of the Games showed China's 7. ________ (able) to organize international events. More importantly, it promoted winter sports in Asia. "Sports can break down barriers and build 8. ________ (friend). The Asian Winter Games proved this 9. ________ (complete)," said the president of the Olympic Council of Asia.

The closing ceremony promised that the 10. ________ (spirit) of the Games would continue to inspire young athletes across the continent.`,
        blanks: [
            { index: 1, answer: "third" },
            { index: 2, answer: "whose" },
            { index: 3, answer: "audience" },
            { index: 4, answer: "known" },
            { index: 5, answer: "ranging" },
            { index: 6, answer: "host" },
            { index: 7, answer: "ability" },
            { index: 8, answer: "friendship" },
            { index: 9, answer: "completely" },
            { index: 10, answer: "spirit" }
        ],
        explanation: `题目解析：
第一句
原文： The 9th Asian Winter Games opened in Harbin on February 7, 2025. This was the 1. ________ (three) time China hosted the event, following Changchun 2007.

翻译： 第九届亚冬会于2025年2月7日在哈尔滨开幕。继2007年长春之后，这是中国第三次举办这一盛会。

分析：
首先，我们要看空前有一个定冠词 the。然后我们看括号里给的是基数词 three（三）。在英语里，当“the”和表示顺序的词连用，且后面跟着“time”的时候，意思是“第……次”。
规则：
这里考的是序数词。
通俗地说，基数词（one, two, three）是用来数数的（1, 2, 3），而序数词（first, second, third）是用来排队的（第1, 第2, 第3）。口诀怎么背呢？一二三，特殊记（first, second, third），从四开始加th。
答案： third

第二句
原文： The opening ceremony, 2. ________ theme was "Dream of Winter, Love among Asia," amazed the 3. ________ (audience) with beautiful ice sculptures.

翻译： 主题为“冰雪同梦，亚洲同心”的开幕式，用美丽的冰雕让观众惊叹不已。

分析（第2空）：
这里有两个逗号，把中间这部分隔开了。这在语法上叫“非限制性定语从句”。我们需要一个词来连接前面的“ceremony”（开幕式）和后面的“theme”（主题）。你会发现，“主题”是属于“开幕式”的，是一种所属关系。
规则：
这里考的是关系代词 whose。
当你要表达“……的……”时候，而且要指代前面那个东西，就要用 whose。它的意思等于 "the theme of which"。
答案（第2空）： whose

分析（第3空）：
看空的前面有 the，空在句尾作为宾语。括号里给的是 audience。这是一个名词。
规则：
这里考的是名词的单复数。
Audience 这个词很特殊，它是一个集合名词，通常指“观众群体”或者“听众整体”。在这里，它指的是在场的所有观众，作为一个整体来看待，所以直接用原形即可。
答案（第3空）： audience

第三句
原文： Harbin, 4. ________ as the "Ice City," is famous for its winter culture.

翻译： 哈尔滨，被称为“冰城”，以其冰雪文化而闻名。

分析：
你看，哈尔滨和被称为冰城中间用逗号隔开了。这里其实是把 "Harbin is known as..." 这个句子简化了。因为前面已经有主语 Harbin 和后面的动词 is，中间这个动作我们就用“分词”形式。
规则：
这里考的是过去分词作非谓语动词。
“过去分词”听起来很专业，其实就是表示被动或者完成的意思。哈尔滨是被人们称为冰城的，所以要用 know 的过去分词形式 known。固定搭配是 be known as（作为……而闻名），把 be 动词去掉，剩下的就是 known。
答案： known

第四句
原文： China topped the medal table, winning 32 gold medals, 5. ________ set a new record for the 6. ________ (host) country.

翻译： 中国占据奖牌榜首位，赢得32枚金牌，这为主办国创造了一项新纪录。

分析（第5空）：
这里有一个逗号，后面跟着一个动词 set。我们需要填一个词来充当主语。你想，是什么创造纪录？是“赢得32枚金牌”这件事。在英语里，逗号后面不能直接加一个完整的句子，需要一个连词或者代词来指代前面整件事。
规则：
这里考的是非限制性定语从句。
用 which 来指代前面那一整句话（赢得32枚金牌这件事）。这是一个非常经典的用法。
答案（第5空）： which

分析（第6空）：
空后面是名词 country，前面的 the 提示这里需要一个修饰词。括号里给的是 host（做动词是“主办”，做名词是“主人”）。
规则：
这里考的是动词的-ing形式作形容词。
虽然 host 本身也可以做定语，但在语法填空里，我们通常需要把它变成形容词性质来修饰名词。hosting 意思是“正在主办的”或“主办方的”。所以 the hosting country 就是“主办国”。
答案（第6空）： hosting

第五句
原文： The success of the Games showed China's 7. ________ (able) to organize international events.

翻译： 运动会的成功展示了中国组织国际赛事的能力。

分析：
空前有所有格符号 's，这就像一个招牌，写着“后面必须是名词”。括号里给的是形容词 able（有能力的）。
规则：
这里考的是形容词变名词。
形容词变成名词，通常在后面加后缀。able 变成名词，要去掉 le，加上 ility。这是很固定的变法。
答案： ability

第六句
原文： "Sports can break down barriers and build 8.  (friend). The Asian Winter Games proved this 9.  (complete)," said the president of the Olympic Council of Asia.

翻译： “体育可以打破隔阂，建立友谊。”亚奥理事会主席说，“亚冬会完全证明了这一点。”

分析（第8空）：
空前面有动词 build（建立），你总得建立点什么“东西”吧？所以这里需要填一个名词。括号里是 friend（朋友）。
规则：
这里考的是名词后缀。
“朋友”是具体的一个人，但“友谊”是一种抽象的感觉。英语里通常在 friend 后面加 ship 来表示某种关系或状态。比如 leader（领导）变 leadership（领导力），这里就是 friendship（友谊）。
答案（第8空）： friendship

分析（第9空）：
这里空后面是动词 proved（证明）。谁来修饰这个动词呢？当然是副词。括号里是 complete（形容词，完全的）。
规则：
这里考的是形容词变副词。
形容词变副词，绝大多数情况就是直接加 ly。complete 加上 ly 就是 completely，意思是“完全地”。
答案（第9空）： completely

第七句
原文： The closing ceremony promised that the 10. ________ (spirit) of the Games would continue to inspire young athletes across the continent.

翻译： 闭幕式承诺，亚冬会的精神将继续激励全亚洲的年轻运动员。

分析：
空前有 the，空后有 of，这是一个典型的名词位置（the + 名词 + of）。括号里给的 spirit 本身就是名词。
规则：
这里考查的是词性判断。
有时候题目会给你陷阱，让你拼命想变形，但其实这个词本来就是需要的词性。这里直接用原形名词即可。
答案： spirit

整体总结
这篇练习里，我们主要复习了以下几个核心语法点，你要把它们记在小本本上哦：
序数词：the + 序数词（third），表示“第几”。
定语从句：用 whose 表示“……的”，用 which 指代前面整件事。
非谓语动词：过去分词 known 表示被动（被称为）。
词性转换（重点）：
形容词变名词：able -> ability
名词变名词（后缀）：friend -> friendship
形容词变副词：complete -> completely

所有的熟练，都是从生涩的填空开始的
此处留白，非为缺憾，乃邀君共书
`
    },
    {
content: `The Sichuan-Tibet Railway, 1. ________ is being built with world-leading technology, will be one of the 2. ________ (difficult) railway projects in human history. It starts in Chengdu and ends in Lhasa, 3. ________ (cover) a distance of 1,838 kilometers.

What makes this project challenging is that workers must build tracks through mountains and over rivers 4. ________ (dig) dozens of tunnels and bridges. The railway climbs from 500 meters 5. ________ sea level to over 4,000 meters, requiring engineers 6. ________ (solve) complex geological problems.

7. ________ (complete), the railway will shorten the travel time between Tibet and inland China from 48 hours to just 13 hours. This will greatly boost local economic 8. ________ (grow) and improve the lives of people in Tibet.

"Every tunnel we dig and every bridge 9. ________ (build) represents a promise to 10. ________ (connect) the mainland with our Tibetan brothers and sisters," said a chief engineer.`,
        blanks: [
            { index: 1, answer: "which" },
            { index: 2, answer: "most difficult" },
            { index: 3, answer: "covering" },
            { index: 4, answer: "digging" },
            { index: 5, answer: "above" },
            { index: 6, answer: "to solve" },
            { index: 7, answer: "Completed" },
            { index: 8, answer: "growth" },
            { index: 9, answer: "built / we build" },
            { index: 10, answer: "connect" }
        ],
        explanation: `题目解析：

第一题
原文： The Sichuan-Tibet Railway, 1.  is being built with world-leading technology, will be one of the most difficult railway projects in human history.
翻译： 川藏铁路正在以世界领先的技术建设，将是人类历史上最困难的铁路项目之一。

分析：
你看，句子中间有两个逗号，把一部分话隔开了：“1.  is being built...”。这部分是在补充说明前面的“川藏铁路”。
这里的线索词是逗号。在英语里，如果两个句子中间只用逗号隔开，通常会出问题，除非有一个连词或者引导词。
这个空缺处缺的是主语，指代前面的“铁路”。铁路是物体，不是人。
我们需要一个能指代物体、又能放在句首的词。

规则： 这里考的是 非限制性定语从句。
专业术语解释：“定语从句”就是一个像小尾巴一样的句子，用来修饰前面的名词。
大白话规则：逗号后面如果要接一个完整的句子来补充前面的事物，而且前面是“物”，我们就用 which。如果是人，才用 who。
答案： which

第二题
原文： ...will be one of the 2. ________ (difficult) railway projects in human history.
翻译： ...将是人类历史上最困难的铁路项目之一。

分析：
线索词是前面的 one of（...之一）和后面的 in human history（在人类历史上）。
既然是“人类历史上”的“之一”，说明是在和全世界的所有铁路项目做比较。
这时候我们就不能只用普通的形容词了，要用“最...”的那种感觉。

规则： 这里考的是 形容词的最高级。
大白话规则：当你要表达“最...”的意思时，如果是长单词（比如 difficult），就在前面加 most；如果是短单词，通常加 -est。这里肯定是形容“最困难”的。
答案： most difficult

第三题
原文： It starts in Chengdu and ends in Lhasa, 3. ________ (cover) a distance of 1,838 kilometers.
翻译： 它起于成都止于拉萨，全程1838公里。

分析：
前半句说“起于成都止于拉萨”，后半句说“覆盖1838公里”。
你看，逗号后面的动作是“铁路”发出的。铁路“覆盖”距离，是它自然而然的一个结果。
注意看，前面已经有动词 starts 和 ends 了，中间用的是 and 连接。现在逗号后面不能再来一个谓语动词，否则就乱套了。我们要把它变成一种“陪衬”的形式。

规则： 这里考的是 非谓语动词中的现在分词（-ing形式）做状语。
专业术语解释：“非谓语动词”就是虽然它长着动词的样子，但不是句子里的大佬（谓语）。
大白话规则：当主语（铁路）主动发出某个动作，并且这个动作是顺便发生的或自然的结果，就把动词后面加 -ing。
答案： covering

第四题
原文： What makes this project challenging is that workers must build tracks through mountains and over rivers 4. ________ (dig) dozens of tunnels and bridges.
翻译： 这个项目之所以具有挑战性，是因为工人们必须穿过山脉、越过河流修建轨道，（同时）挖掘几十条隧道和桥梁。

分析：
工人们要“修建轨道”，还要“挖掘隧道”。这两个动作是工人们同时在做。
这里的 dig 不是主句的主要动作，它是用来解释怎么 build tracks 的，是一种方式或伴随的情况。

规则： 这里考的是 非谓语动词做方式状语或伴随状语。
大白话规则：做一件事的同时，顺便做另一件事，或者说通过做这件事来达到目的，通常就在动词后面加 -ing。你可以理解为前面省略了一个“by”（通过...）。
答案： digging

第五题
原文： The railway climbs from 500 meters 5. ________ sea level to over 4,000 meters...
翻译： 铁路从海拔500米攀升到4000米以上...

分析：
这里讲的是高度，是关于“海平面”的。
这是一个固定的搭配，就像我们说“在...之上”。
规则： 这里考的是 介词短语固定搭配。
大白话规则：提到“海拔...”或者“海平面之上”，英语里习惯用 above sea level。记下来这个短语就好。
答案： above

第六题
原文： ...requiring engineers 6. ________ (solve) complex geological problems.
翻译： ...这就要求工程师们解决复杂的地质问题。

分析：
线索词是 requiring（要求）。
我们常说“要求某人做某事”。工程师是“被要求”去解决问题的。
当表示“要求去做...”这个目的时，我们需要用一个特定的符号来连接。

规则： 这里考的是 不定式做宾语补足语。
专业术语解释：“不定式”就是 to + 动词原形。
大白话规则：在 require（要求）、tell（告诉）、want（想要）这些词后面，要让某人去干活，一定要加 to。
答案： to solve

第七题
原文： 7. ________ (complete), the railway will shorten the travel time between Tibet and inland China from 48 hours to just 13 hours.
翻译： （铁路）完工后，将缩短西藏和中国内陆之间的旅行时间...

分析：
这个空的词是 complete（完成）。
你想，是铁路自己完成吗？不是，是铁路“被”工程师完成。所以是被动的意思。
而且，只有先“完成了”，后面才能“缩短旅行时间”。这是个时间先后顺序。

规则： 这里考的是 过去分词做状语。
专业术语解释：“过去分词”通常表示 被动 或 完成。
大白话规则：既然这件事（完成）是主语（铁路）接受的动作，而且已经做完了，我们就把 complete 变成 Completed。这就像说“Once it is completed”（一旦它完工了）的简化版。
答案： Completed

第八题
原文： This will greatly boost local economic 8. ________ (grow)...
翻译： 这将极大地促进当地的经济发展...

分析：
线索词是前面的 economic（经济的）。你看，它是个形容词。
形容词后面通常要跟一个名词，这样才能组成一个名词短语（比如：经济增长）。
grow 是动词“生长”，我们要把它变成名词形式。

规则： 这里考的是 词性转换（动词变名词）。
大白话规则：英语里很多动词后面加 -th 就可以变成名词。比如 wide（宽）-> width（宽度），long（长）-> length（长度），grow（生长）-> growth（增长）。
答案： growth

第九题
原文： "Every tunnel we dig and every bridge 9. ________ (build) represents a promise to connect the mainland with our Tibetan brothers and sisters," said a chief engineer.
翻译： “我们挖掘的每一条隧道和建造的每一座桥，都代表着将大陆与我们的藏族兄弟姐妹连接起来的承诺，”一位总工程师说道。

分析：
前半句说 "Every tunnel we dig"（我们挖的每一条隧道）。这里其实省略了 "that"：Every tunnel (that) we dig。
后半句是 "every bridge 9. ________"。你看，它是和前面的 "we dig" 对应的。
为了保持对称，这里也应该是“（我们）建造”。

规则： 这里考的是 定语从句的主谓一致。
大白话规则：前面怎么写，后面就怎么模仿。前面是 "we dig"（我们挖），后面就是 "we build"（我们建）。为了通顺，最好把主语 we 也写上，或者只填 build 也可以（省略了主语），但在这种强调“我们建造”的语境下，we build 更完整有力。答案给的是两者皆可，我们填 we build 最容易理解。
答案： we build (或者 build)

第十题
原文： ...represents a promise to 10. ________ (connect) the mainland with our Tibetan brothers and sisters...
翻译： ...代表着将大陆与我们的藏族兄弟姐妹连接起来的承诺...

分析：
线索词是前面的 promise（承诺）。
通常是“承诺去做某事”。这个“去做某事”就是承诺的内容。
表示将来、目的或者承诺的内容时，我们要用一种固定的形式。

规则： 这里考的是 不定式做后置定语。
大白话规则：在 promise（承诺）、plan（计划）、ability（能力）这些词后面，如果要接动作，一定要用 to + 动词原形。
答案： connect

整体总结
好啦，我们一道一道地把难关都闯过来了！这篇文章里其实主要考察了这几个核心语法点，你要记一下：
从句引导词：看到逗号隔开句子修饰物体，用 which。
最高级：看到“one of the + 范围”，用 most + 形容词。
非谓语动词：
主动、顺便发生的动作，加 -ing。
被动、完成的动作，加 -ed。
固定搭配：
要求某人做某事：require to do。
海平面以上：above sea level。
承诺做某事：a promise to do。
词性转换：动词变名词通常加后缀，比如 grow 变 growth。

所有的熟练，都是从生涩的填空开始的
此处留白，非为缺憾，乃邀君共书
`
    },
    {
content: `Black Myth: Wukong, a Chinese action adventure game released in August 2024, became a global 1. ________ (succeed) within weeks. Based on the classic Chinese novel Journey to the West, it allows players 2. ________ (experience) the story of the Monkey King in 3. ________ visually stunning way.

The game sold over 28 million copies worldwide, earning 4. ________ (multiple) awards at international game ceremonies. What surprised Western gamers 5. ________ (be) not just the excellent graphics, but the deep cultural 6. ________ (root) of Chinese mythology.

"This game serves 7. ________ a bridge between Eastern and Western cultures," said a reviewer from IGN. It proves that Chinese developers can create world-class games 8. ________ telling our own stories. The success has inspired many Chinese game companies 9. ________ (invest) more in quality rather than quick profits.

As the game continues 10. ________ (attract) new players, it represents a new era of Chinese cultural products going global.`,
        blanks: [
            { index: 1, answer: "success" },
            { index: 2, answer: "to experience" },
            { index: 3, answer: "a" },
            { index: 4, answer: "multiple" },
            { index: 5, answer: "was" },
            { index: 6, answer: "roots" },
            { index: 7, answer: "as" },
            { index: 8, answer: "by" },
            { index: 9, answer: "to invest" },
            { index: 10, answer: "to attract" }
        ],
        explanation: `题目解析：
第1题
原文：Black Myth: Wukong... became a global 1. ________ (succeed) within weeks.

翻译：《黑神话：悟空》……在几周内成为了一个全球性的成功。

分析：
首先看空前面的词 a。在英语里，a 是“不定冠词”，就像个导游，后面通常要跟着一个名词。
再看括号里的 succeed，这是一个动词，意思是“成功”。但是，这里不能放动词，因为 a 后面不能直接跟动词。所以，我们要把这个动词变成名词形式。
规则：
词性转换：动词 变成名词。常用的规则是把动词结尾的 -ed 去掉，加上 -cess（注意拼写不是 succes，而是双写 c）。
答案：success

第2题
原文：...it allows players 2. ________ (experience) the story of the Monkey King...

翻译：……它允许玩家体验美猴王的故事……

分析：
我们要看空前面的词 allows。它的意思是“允许”。
在英语里，有一个非常固定的句式：allow sb. to do sth.（允许某人做某事）。
这里的 sb. 就是 players（玩家），那么后面的空就应该填“去做某事”的格式。
规则：
固定搭配：allow 后面如果要接动词，必须用 to + 动词原形。这个 to 就像是一个小钩子，把动作钩过来。
答案：to experience

第3题
原文：...in 3. ________ visually stunning way.

翻译：……以一种视觉上令人惊叹的方式。

分析：
这里要注意，原文里已经有了 visually（视觉上地）这个副词。空格后面紧跟着的是形容词 stunning（令人惊叹的）和名词 way（方式）。
我们要找的是一个能搭配“ visually stunning way”的词。这是一个单数的名词短语，前面通常需要一个“冠词”来限定它。表示“一种……的方式”，我们要用 a。
规则：
冠词用法：a 用于辅音音素开头的单数可数名词前，表示“一个”或“一种”。这里就是“一种方式”。
答案：a

第4题
原文：The game... earning 4. ________ (multiple) awards at international game ceremonies.

翻译：这款游戏……在国际游戏颁奖典礼上赢得了多个奖项。

分析：
空后面的词是 awards（奖项），这是一个名词。名词前面通常需要谁来修饰它呢？需要一个形容词。
括号里的 multiple 本身就是一个形容词，意思是“多个的、多样的”。
规则：
词类识别：有时候题目给的词不需要变形。我们要判断它在句子里作什么成分。这里修饰名词，直接用形容词原形即可。
答案：multiple

第5题
原文：What surprised Western gamers 5. ________ (be) not just the excellent graphics...

翻译：让西方玩家感到惊讶的不仅仅是优秀的画面……

分析：
这句话的主语比较特殊，是 What surprised Western gamers（让西方玩家感到惊讶的事/东西）。这是一个“主语从句”，你可以把它看作是一个单数的“它”。
再看整篇文章的时态，第一句用了 became，说明文章主要讲过去的事情，所以这里要用过去时。
既然主语看作“它”（单数），又是过去时，be 动词就要变成 was。
规则：
主谓一致与时态：be动词在过去时里有两种形式：was（单数）和 were（复数）。因为主语是一件事（单数），所以用 was。
答案：was

第6题
原文：...but the deep cultural 6. ________ (root) of Chinese mythology.

翻译：……而且是中国神话深厚的文化根基。

分析：
空前面是 cultural（文化的），这是一个形容词。形容词后面通常要接一个名词。
括号里的 root 意思是“根”。我们要考虑单复数。文化的根基通常不止一个，而且这里表达的是一种深层的底蕴，常用复数形式。
规则：
名词复数：当一个名词表达抽象概念且包含多方面内容时，常加 s 变成复数。比如 roots（根基）。
答案：roots

第7题
原文："This game serves 7. ________ a bridge between Eastern and Western cultures..."

翻译：“这款游戏充当了东方和西方文化之间的一座桥梁……”

分析：
看关键词 serves。在这里它的意思是“充当”或“起作用”。
英语里有个短语叫 serve as，意思就是“作为；充当”。
规则：
固定搭配：serve as（作为）。这是一个很常用的固定用法，记住它就行，不需要变词形。
答案：as

第8题
原文：It proves that Chinese developers can create world-class games 8. ________ telling our own stories.

翻译：它证明了中国开发者可以通过讲述我们自己的故事来创造世界级的游戏。

分析：
这句话的后半部分是在说“通过什么方式”创造游戏。
表示“通过某种方式/手段”，英语里常用介词 by。而且 by 后面如果跟动作，动作要加上 -ing（也就是我们常说的动名词）。
规则：
介词 by 的用法：by + doing，意思是“通过做某事”。这里的 telling 已经在原文里了（注意：原文这里括号外写了 telling，说明第8题是填介词 by）。
答案：by

第9题
原文：The success has inspired many Chinese game companies 9. ________ (invest) more in quality...

翻译：这一成功激励了许多中国游戏公司在质量上投入更多……

分析：
看关键词 inspired（激励/鼓舞）。
这里有一个结构：inspire sb. to do sth.（激励某人去做某事）。这和第2题的 allow 用法很像。
空后面是 invest（投资），所以前面要加一个 to。
规则：
固定搭配：inspire sb. to do sth.。注意这里的 to 是不定式符号，后面必须接动词原形。
答案：to invest

第10题
原文：As the game continues 10. ________ (attract) new players...

翻译：随着这款游戏继续吸引新玩家……

分析：
看关键词 continues（继续）。
在英语里，continue 后面既可以接 to do（继续去做某事，侧重于接下来要做），也可以接 doing（继续做某事，侧重于不停歇）。在考试中，如果不强调动作的停顿，这两个通常都可以，但 to attract 是最标准、最常用的搭配。
规则：
非谓语动词：continue to do sth. 或 continue doing sth.。这里我们填 to attract，表示“继续去吸引”。
答案：to attract

整体总结
这篇语法填空其实主要考察了以下几个核心语法点，我们要把它们记在小本本上：
词性转换：主要是动词变名词，比如 succeed -> success。
固定搭配（非常重要）：比如 allow sb. to do，inspire sb. to do，serve as，by doing。
冠词的使用：比如 a +名词。
时态和主谓一致：特别是看到 What 引导的句子做主语时，谓语动词要用单数 was。

所有的熟练，都是从生涩的填空开始的
此处留白，非为缺憾，乃邀君共书

`
    },
    {
content: `The Yangtze River, 1. ________ (flow) through Hubei like a green ribbon, has witnessed remarkable changes in recent years. In 2023, a group of college students from Wuhan University 2. ________ (launch) the "Clear Water Project" to protect wetlands. They collected over 500 kg of waste along the riverbank, making the area 3. ________ (beautiful) than before.

Since the project began, local authorities 4. ________ (take) strict measures. Factories near the river 5. ________ (require) to install advanced filtration systems. As a result, water quality 6. ________ (improve) by 40% according to last month’s report.

What moves people most is that these students persist despite challenges. "Small actions create big impacts," said team leader Zhang Lei. "We hope more people will join us 7. ________ (build) a greener Hubei." Their efforts have inspired communities across the province. Many citizens now volunteer on weekends, believing that protecting the river is protecting 8. ________ (they).

Experts emphasize that environmental education should start early. Schools in Huangshi 9. ________ (recent) added ecology courses to their curriculum. Children learn to identify native plants and understand why biodiversity matters. As the old saying goes: "A journey of a thousand miles begins with a single step." Every drop of effort counts toward 10. ________ brighter future for our homeland.`,
        blanks: [
            { index: 1, answer: "flowing" },
            { index: 2, answer: "launched" },
            { index: 3, answer: "more beautiful" },
            { index: 4, answer: "have taken" },
            { index: 5, answer: "have been required" },
            { index: 6, answer: "has improved" },
            { index: 7, answer: "to build" },
            { index: 8, answer: "themselves" },
            { index: 9, answer: "recently" },
            { index: 10, answer: "a" }
        ],
        explanation: `题目解析：
第一题
原文： The Yangtze River, 1. ________ (flow) through Hubei like a green ribbon, has witnessed remarkable changes in recent years.

翻译： 长江像一条绿色的丝带流经湖北，近年来见证了巨大的变化。

分析：
你看，这里的主语是“The Yangtze River”（长江）。中间这部分 ______ through Hubei... 是用两个逗号隔开的，它是用来补充说明长江的样子的。
我们要找线索词：后面有一个主要动词 has witnessed（已经见证）。一个简单句不能有两个谓语动词打架，除非是连词连接。这里没有连词，说明横线处必须是“非谓语”。
再想一下：是长江“流过”湖北，还是别人“让”长江流过？当然是长江自己流，是主动的，而且是正在进行的动作。
规则：
当动词不作谓语，且和主语是主动关系时，我们要用现在分词（也就是加 -ing 的形式）。你可以把它理解成一种伴随状态，一边流着，一边见证。
答案： flowing

第二题
原文： In 2023, a group of college students from Wuhan University 2. ________ (launch) the "Clear Water Project" to protect wetlands.

翻译： 2023年，来自武汉大学的一群大学生启动了“清水工程”以保护湿地。

分析：
这道题非常简单，一定要拿分哦！我们要找线索词：句首的 "In 2023"（在2023年）。
这是一个明确的过去时间点。动作“启动”发生在2023年，这是过去发生且结束的事情。
规则：
只要看到明确的过去时间状语（如 yesterday, last year, In 2023），句子就要用一般过去时。也就是动词的过去式，通常加 -ed。
答案： launched

第三题
原文： They collected over 500 kg of waste along the riverbank, making the area 3. ________ (beautiful) than before.

翻译： 他们在河岸收集了超过500公斤的垃圾，使得这个区域比以前更美了。

分析：
我们要找线索词：句子后面的 "than"（比）。
只要有“比”，就说明是在进行比较。
规则：
英语里，如果要表示“更……”，就要用形容词的比较级。
单音节词（短的词）通常直接在后面加 -er；
多音节词（长的词）前面加 more。
beautiful 是个长单词，所以要在前面加 more。
答案： more beautiful

第四题
原文： Since the project began, local authorities 4. ________ (take) strict measures.

翻译： 自从项目开始以来，当地政府已经采取了严厉的措施。

分析：
我们要找线索词：句首的 "Since"（自从）。
"Since" 后面跟了一个过去的时间点（began），意思是“动作从过去一直持续到现在，或者对现在有影响”。
规则：
这是最经典的现在完成时标志。结构是 have/has + 动词过去分词。
注意主语是 "local authorities"（当局，复数），所以助动词要用 have，而不是 has。take 的过去分词是 taken。
答案： have taken

第五题
原文： Factories near the river 5. ________ (require) to install advanced filtration systems.

翻译： 河边的工厂被要求安装先进的过滤系统。

分析：
我们要找逻辑关系：是工厂“要求”别人，还是工厂“被要求”做某事？
显然，工厂是被动接受命令的。再看线索词，这紧接在上一句“Since...”的时间背景下，动作一直影响到现在。
规则：
这里要用两个知识点结合：
被动语态（Passive Voice）：意思是不是自己做的，是别人让自己做的。结构是 be + 过去分词。
现在完成时：因为事情从过去持续到现在。
合起来就是 have/has been + 过去分词。主语 Factories 是复数，所以用 have。
答案： have been required

第六题
原文： As a result, water quality 6. ________ (improve) by 40% according to last month’s report.

翻译： 结果，根据上个月的报告，水质改善了40%。

分析：
我们要看上下文逻辑。前面说了工厂被要求安装系统，所以这里肯定是结果。
线索词：虽然句尾有 "last month's report"，但“水质改善”是从过去采取措施开始，一直到现在呈现出的一个结果。
规则：
这里也是考查现在完成时，表示过去的动作对现在造成的结果。
结构：have/has + 过去分词。主语 "water quality" 是单数（水质），所以助动词要用 has。improve 的过去分词是 improved。
答案： has improved

第七题
原文： "We hope more people will join us 7. ________ (build) a greener Hubei."

翻译： “我们希望更多的人加入我们来建设一个更绿色的湖北。”

分析：
我们要找动作的目的。人们加入我们是为了做什么？为了建设。
规则：
这里考查不定式表目的。当我们想说“去做某事”或者“为了做某事”时，英语里最常用的符号就是 to + 动词原形。
短语 "join sb. to do sth." 是非常固定的搭配。
答案： to build

第八题
原文： Many citizens now volunteer on weekends, believing that protecting the river is protecting 8. ________ (they).

翻译： 许多市民现在在周末做志愿者，他们相信保护河流就是保护他们自己。

分析：
我们要找线索词：句子前半部分的主语是 "Many citizens"（市民）。
后面的意思是：保护河流 = 保护谁？当然是保护“他们自己”。
规则：
这里考查反身代词。当动作的对象和主语是同一个人（或同一群人）时，就要用反身代词。
I -> myself
You -> yourself
They -> themselves
答案： themselves

第九题
原文： Schools in Huangshi 9. ________ (recent) added ecology courses to their curriculum.

翻译： 黄石的学校最近在课程中加入了生态学课程。

分析：
我们要看这个词在句子里的位置：它放在了动词 "added"（增加）的前面。
线索词："added" 是一个动词。动词能不能被形容词修饰？不能。我们说“走得快”，不说“快走”（在动词前做状语时）。
规则：
形容词修饰名词，副词修饰动词。要变成副词，通常在形容词后面加 -ly。
recent 是形容词（最近的），recently 就是副词（最近）。
答案： recently

第十题
原文： Every drop of effort counts toward 10. ________ brighter future for our homeland.

翻译： 每一滴努力都算数，都是为了我们祖国更光明的未来。

分析：
我们要看横线后面的词："brighter"（更明明的），后面跟着名词 "future"（未来）。
这里缺一个限定词。
规则：
这里考查冠词的用法。"future" 是可数名词单数。在英语中，单数可数名词不能“裸奔”，前面通常要有冠词。
因为 brighter 的发音是以辅音音素 /b/ 开头的，所以要用不定冠词 a。
答案： a

🌟 整体总结
好啦，我们已经把所有题目都解决完了！是不是觉得没那么难了？这篇文章其实主要考了这几个核心语法点：
非谓语动词：做事情的人是主语本身，用 -ing（如第1题）。
时态：
看到过去的时间，用一般过去时（如第2题）。
看到 "Since" 或强调对现在的影响，用现在完成时（如第4、6题）。
被动语态：主语是动作的承受者，用 be done（如第5题）。
比较级：看到 than，记得变成“更……”（如第3题）。
词性转换：动词前面要用副词，记得加 -ly（如第9题）。

所有的熟练，都是从生涩的填空开始的
此处留白，非为缺憾，乃邀君共书
`
    },
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
        
        // 将答案字符串按斜杠"/"分隔成多个可能的答案
        const correctAnswers = blank.answer.split('/').map(ans => ans.trim().toLowerCase());
        const userAnswerLower = userAnswer.toLowerCase();
        
        // 检查用户答案是否匹配任意一个正确答案
        if (correctAnswers.some(correctAnswer => userAnswerLower === correctAnswer)) {
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