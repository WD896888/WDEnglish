// 题库数据
const wordOrderQuestions = [
    { 
        words: ["the", "source", "of", "water", "is", "life"], 
        answer: "Water is the source of life." 
    },
    { 
        words: ["my", "family", "enjoy", "reading", "books"], 
        answer: "My family enjoy reading books." 
    },
    { 
        words: ["the", "beauty", "around", "you", "to", "discover", "It", "is", "a", "joy"], 
        answer: "It is a joy to discover the beauty around you." 
    },
    { 
        words: ["try", "our", "best", "should", "to", "realize", "our", "dreams", "we"], 
        answer: "We should try our best to realize our dreams." 
    },
    { 
        words: ["was", "translated", "into", "his", "book", "last", "year", "French"], 
        answer: "His book was translated into French last year." 
    },
    { 
        words: ["has", "attracted", "more", "and", "more", "people", "life", "in", "the", "countryside"], 
        answer: "Life in the countryside has attracted more and more people." 
    },
    { 
        words: ["is", "to", "health", "exercise", "regular", "important"], 
        answer: "Regular exercise is important to health." 
    },
    { 
        words: ["in", "many", "books", "there", "are", "the", "library"], 
        answer: "There are many books in the library." 
    },
    { 
        words: ["run", "trains", "faster", "than", "cars"], 
        answer: "Trains run faster than cars." 
    },
    { 
        words: ["will", "be", "built", "a", "new", "bridge", "across", "the", "river", "next", "year"], 
        answer: "A new bridge will be built across the river next year." 
    },
    { 
        words: ["kind", "It", "is", "of", "you", "to", "help", "me", "so"], 
        answer: "It is so kind of you to help me." 
    },
    { 
        words: ["has", "already", "finished", "the", "task", "tom"], 
        answer: "Tom has already finished the task." 
    },
    { 
        words: ["go", "to", "Let’s", "the", "cinema", "tonight", "together"], 
        answer: "Let's go to the cinema together tonight." 
    },
    { 
        words: ["are", "most", "of", "the", "products", "high", "quality", "made", "in", "China"], 
        answer: "Most of the products made in China are high quality." 
    },
    { 
        words: ["enjoys", "my", "brother", "in", "the", "playground", "playing", "basketball"], 
        answer: "My brother enjoys playing basketball in the playground." 
    },
    { 
        words: ["do", "how", "you", "spell", "your", "name"], 
        answer: "How do you spell your name?" 
    },
    { 
        words: ["when", "I", "left", "home", "it", "was", "raining"], 
        answer: "It was raining when I left home." 
    },
    { 
        words: ["protect", "we", "should", "our", "environment", "actively"], 
        answer: "We should actively protect our environment." 
    },
    { 
        words: ["is", "changing", "artificial", "intelligence", "the", "way", "we", "live", "rapidly"], 
        answer: "Artificial intelligence is rapidly changing the way we live." 
    },
    { 
        words: ["it", "is", "our", "duty", "to", "protect", "traditional", "culture", "like", "paper-cutting"], 
        answer: "It is our duty to protect traditional culture like paper-cutting." 
    },
    { 
        words: ["should", "take", "online", "courses", "to", "improve", "digital", "literacy", "students"], 
        answer: "Students should take online courses to improve digital literacy." 
    },
    { 
        words: ["was", "cleaned", "up", "the", "Yangtze", "River", "last", "year", "through", "joint", "efforts"], 
        answer: "The Yangtze River was cleaned up through joint efforts last year." 
    },
    { 
        words: ["are", "moving", "to", "more", "and", "more", "young", "people", "county", "towns", "for", "better", "opportunities"], 
        answer: "More and more young people are moving to county towns for better opportunities." 
    },
    { 
        words: ["can", "you", "share", "your", "experience", "in", "learning", "English", "with", "us"], 
        answer: "Can you share your experience in learning English with us?" 
    },
    { 
        words: ["aim", "to", "achieve", "Dual", "Carbon", "goals", "carbon", "neutrality", "by", "2060"], 
        answer: "Dual Carbon goals aim to achieve carbon neutrality by 2060." 
    },
    { 
        words: ["let", "me", "show", "how", "this", "app", "helps", "with", "daily", "study"], 
        answer: "Let me show how this app helps with daily study." 
    },
    { 
        words: ["has", "been", "visited", "the", "Forbidden", "City", "by", "millions", "every", "year"], 
        answer: "The Forbidden City has been visited by millions every year." 
    },
    { 
        words: ["to", "protect", "the", "environment", "is", "everyone’s", "duty", "it"], 
        answer: "It is everyone's duty to protect the environment." 
    },
    { 
        words: ["will", "be", "built", "a", "new", "library", "in", "our", "city", "next", "year"], 
        answer: "A new library will be built in our city next year." 
    },
    { 
        words: ["she", "whether", "is", "considering", "to", "study", "abroad", "hasn’t", "decided"], 
        answer: "She hasn't decided whether she is considering to study abroad." 
    },
    { 
        words: ["made", "great", "progress", "has", "in", "English", "the", "student", "since", "last", "term"], 
        answer: "The student has made great progress in English since last term." 
    },
    { 
        words: ["the", "movie", "so", "touching", "that", "many", "people", "cried", "was"], 
        answer: "The movie was so touching that many people cried." 
    },
    { 
        words: ["if", "you", "practice", "every", "day", "you", "improve", "will", "your", "speaking", "skills"], 
        answer: "You will improve your speaking skills if you practice every day." 
    },
    { 
        words: ["more", "and", "more", "popular", "working", "from", "home", "is", "becoming", "nowadays"], 
        answer: "Working from home is becoming more and more popular nowadays." 
    },
    { 
        words: ["he", "the", "question", "was", "asked", "by", "the", "teacher", "in", "class"], 
        answer: "He was asked the question by the teacher in class." 
    },
    { 
        words: ["to", "finish", "the", "project", "we", "need", "more", "time", "and", "resources"], 
        answer: "We need more time and resources to finish the project." 
    },
    { 
        words: ["there", "a", "big", "park", "near", "my", "school", "is", "and", "a", "supermarket"], 
        answer: "There is a big park and a supermarket near my school." 
    },
    { 
        words: ["the", "importance", "of", "reading", "emphasized", "was", "in", "his", "speech"], 
        answer: "The importance of reading was emphasized in his speech." 
    },
    { 
        words: ["can", "students", "learn", "more", "efficiently", "by", "using", "AI", "tools"], 
        answer: "Students can learn more efficiently by using AI tools." 
    },
    { 
        words: ["is", "success", "a", "key", "and", "to", "happy", "life"], 
        answer: "Success is a key to a happy life." 
    },
    { 
        words: ["study", "in", "the", "library", "quietly", "the", "students"], 
        answer: "The students study quietly in the library." 
    },
    { 
        words: ["me", "my", "father", "a", "new", "dictionary", "bought", "yesterday"], 
        answer: "My father bought me a new dictionary yesterday." 
    },
    { 
        words: ["is", "to", "learn", "a", "second", "foreign", "language", "necessary", "for", "us"], 
        answer: "It is necessary for us to learn a second foreign language." 
    },
    { 
        words: ["the", "2026", "Asian", "Games", "was", "held", "in", "Japan", "last", "year"], 
        answer: "The 2026 Asian Games was held in Japan last year." 
    },
    { 
        words: ["taken", "place", "great", "changes", "in", "my", "hometown", "have"], 
        answer: "Great changes have taken place in my hometown." 
    },
    { 
        words: ["not", "only", "broadens", "our", "horizons", "reading", "but", "also", "enriches", "our", "minds"], 
        answer: "Reading not only broadens our horizons but also enriches our minds." 
    },
    { 
        words: ["you", "can", "help", "me", "with", "my", "English"], 
        answer: "Can you help me with my English?" 
    },
    { 
        words: ["be", "don't", "late", "next", "time"], 
        answer: "Don't be late next time." 
    },
    { 
        words: ["is", "a", "symbol", "of", "Wuhan", "the", "Yellow", "Crane", "Tower"], 
        answer: "The Yellow Crane Tower is a symbol of Wuhan." 
    },
    { 
        words: ["is", "my", "belief", "that", "never", "give", "up", "we", "should", "when", "facing", "difficulties"], 
        answer: "It is my belief that we should never give up when facing difficulties." 
    },
    { 
        words: ["is", "climate", "change", "a", "serious", "challenge", "for", "our", "planet"], 
        answer: "Climate change is a serious challenge for our planet." 
    },
    { 
        words: ["should", "young", "people", "embrace", "the", "spirit", "of", "innovation"], 
        answer: "Young people should embrace the spirit of innovation." 
    },
    { 
        words: ["has", "dramatically", "changed", "many", "industries", "Artificial", "Intelligence"], 
        answer: "Artificial Intelligence has dramatically changed many industries." 
    },
    { 
        words: ["is", "to", "learn", "new", "skills", "from", "online", "courses", "a", "good", "way"], 
        answer: "Learning new skills from online courses is a good way." 
    },
    { 
        words: ["can", "significantly", "improve", "physical", "health", "regular", "exercise"], 
        answer: "Regular exercise can significantly improve physical health." 
    },
    { 
        words: ["please", "focus", "on", "to", "improve", "our", "study", "efficiency", "in", "class"], 
        answer: "Please focus on our study efficiency to improve in class." 
    },
    { 
        words: ["can", "we", "visit", "the", "library", "on", "weekends"], 
        answer: "We can visit the library on weekends." 
    },
    { 
        words: ["are", "what", "skills", "most", "important", "for", "your", "future"], 
        answer: "What skills are most important for your future?" 
    },
    { 
        words: ["have", "changed", "how", "in", "recent", "years", "the", "rural", "areas"], 
        answer: "How have the rural areas changed in recent years?" 
    },
    { 
        words: ["has", "won", "low-carbon", "lifestyle", "global", "support"], 
        answer: "Low-carbon lifestyle has won global support." 
    },
    { 
        words: ["are", "developing", "renewable", "energy", "sources", "rapidly"], 
        answer: "Renewable energy sources are developing rapidly." 
    },
    { 
        words: ["expands", "access", "to", "education", "online", "learning"], 
        answer: "Online learning expands access to education." 
    },
    { 
        words: ["produces", "skilled", "workers", "vocational", "education"], 
        answer: "Vocational education produces skilled workers." 
    },
    { 
        words: ["should", "inherit", "traditional", "culture", "young", "generation"], 
        answer: "Young generation should inherit traditional culture." 
    },
    { 
        words: ["revives", "ancient", "Chinese", "aesthetics", "Hanfu", "movement"], 
        answer: "Hanfu movement revives ancient Chinese aesthetics." 
    },
    { 
        words: ["is", "it", "meaningful", "to", "preserve", "dialects"], 
        answer: "It is meaningful to preserve dialects." 
    },
    { 
        words: ["let", "protect", "intangible", "cultural", "heritage", "us"], 
        answer: "Let us protect intangible cultural heritage." 
    },
    { 
        words: ["will", "be", "introduced", "the", "new", "policy", "next", "month"], 
        answer: "The new policy will be introduced next month." 
    },
    { 
        words: ["has", "traveled", "many", "countries", "she", "so", "far"], 
        answer: "She has traveled many countries so far." 
    },
    { 
        words: ["have", "you", "already", "finished", "your", "project"], 
        answer: "Have you already finished your project?" 
    },
    { 
        words: ["is", "the", "book", "popular", "written", "by", "Mo", "Yan"], 
        answer: "The book written by Mo Yan is popular." 
    },
    { 
        words: ["how", "is", "the", "scenery", "beautiful"], 
        answer: "How beautiful the scenery is!" 
    },
    { 
        words: ["although", "was", "tired", "he", "continued", "working"], 
        answer: "Although he was tired, he continued working." 
    },
    { 
        words: ["It", "is", "important", "to", "learn", "a", "foreign", "language", "for", "us"], 
        answer: "It is important for us to learn a foreign language." 
    },
    { 
        words: ["was", "held", "by", "the", "manager", "the", "meeting", "last", "week"], 
        answer: "The meeting was held by the manager last week." 
    },
    { 
        words: ["I", "am", "looking", "forward", "to", "hearing", "from", "you"], 
        answer: "I am looking forward to hearing from you." 
    },
    { 
        words: ["are", "a", "lot", "of", "books", "There", "in", "the", "library"], 
        answer: "There are a lot of books in the library." 
    },
    { 
        words: ["was", "so", "tired", "that", "he", "he", "went", "to", "bed", "early"], 
        answer: "He was so tired that he went to bed early." 
    },
    { 
        words: ["has", "changed", "Artificial", "Intelligence", "our", "lives", "greatly"], 
        answer: "Artificial Intelligence has greatly changed our lives." 
    },
    { 
        words: ["should", "take", "measures", "to", "protect", "the", "environment", "we"], 
        answer: "We should take measures to protect the environment." 
    },
    { 
        words: ["is", "becoming", "popular", "Chinese", "food", "all", "over", "the", "world"], 
        answer: "Chinese food is becoming popular all over the world." 
    },
    { 
        words: ["helps", "us", "solve", "problems", "efficiently", "critical", "thinking"], 
        answer: "Critical thinking helps us solve problems efficiently." 
    },
    { 
        words: ["provides", "easy", "access", "to", "information", "the", "Internet"], 
        answer: "The Internet provides easy access to information." 
    },
    { 
        words: ["can", "not", "only", "speak", "English", "she", "but", "also", "French"], 
        answer: "She can speak not only English but also French." 
    },
    { 
        words: ["is", "the", "man", "standing", "there", "who", "my", "teacher"], 
        answer: "The man standing there is my teacher." 
    },
    { 
        words: ["makes", "feel", "me", "relaxed", "reading"], 
        answer: "Reading makes me feel relaxed." 
    },
    { 
        words: ["spends", "much", "time", "reading", "books", "she", "every", "day"], 
        answer: "She spends much time reading books every day." 
    },
    { 
        words: ["is", "one", "of", "the", "most", "beautiful", "cities", "Wuhan", "in", "China"], 
        answer: "Wuhan is one of the most beautiful cities in China." 
    },
    { 
        words: ["is", "physical", "exercise", "important", "for", "health"], 
        answer: "Physical exercise is important for health." 
    },
    { 
        words: ["should", "we", "protect", "the", "environment", "actively"], 
        answer: "We should actively protect the environment." 
    },
    { 
        words: ["has", "become", "very", "popular", "online", "shopping", "in", "recent", "years"], 
        answer: "Online shopping has become very popular in recent years." 
    },
    { 
        words: ["it", "is", "a", "good", "habit", "to", "learn", "English", "every", "day"], 
        answer: "It is a good habit to learn English every day." 
    },
    { 
        words: ["was", "held", "successfully", "the", "conference", "last", "month"], 
        answer: "The conference was held successfully last month." 
    },
    { 
        words: ["let", "us", "work", "together", "to", "build", "a", "better", "future"], 
        answer: "Let us work together to build a better future." 
    },
    { 
        words: ["can", "you", "show", "me", "how", "to", "use", "this", "app"], 
        answer: "Can you show me how to use this app?" 
    },
    { 
        words: ["are", "proud", "of", "my", "progress", "my", "parents"], 
        answer: "My parents are proud of my progress." 
    },
    { 
        words: ["helps", "broaden", "our", "horizons", "reading", "more", "books", "greatly"], 
        answer: "Reading more books greatly helps broaden our horizons." 
    },
    { 
        words: ["we", "must", "work", "hard", "to", "achieve", "our", "goals"], 
        answer: "We must work hard to achieve our goals." 
    },
    { 
        words: ["is", "the", "sun", "the", "source", "of", "energy"], 
        answer: "The sun is the source of energy." 
    },
    { 
        words: ["enjoys", "my", "sister", "playing", "the", "piano"], 
        answer: "My sister enjoys playing the piano." 
    },
    { 
        words: ["is", "it", "important", "to", "be", "honest"], 
        answer: "It is important to be honest." 
    },
    { 
        words: ["should", "try", "our", "best", "we", "to", "protect", "the", "environment"], 
        answer: "We should try our best to protect the environment." 
    },
    { 
        words: ["was", "his", "novel", "translated", "into", "Chinese", "last", "year"], 
        answer: "His novel was translated into Chinese last year." 
    },
    { 
        words: ["has", "attracted", "the", "city's", "nightlife", "more", "and", "more", "people"], 
        answer: "The city's nightlife has attracted more and more people." 
    },
    { 
        words: ["has", "she", "finished", "her", "homework"], 
        answer: "She has finished her homework." 
    },
    { 
        words: ["can", "tell", "me", "you", "your", "plan"], 
        answer: "Can you tell me your plan?" 
    },
    { 
        words: ["let", "explain", "me", "how", "this", "works"], 
        answer: "Let me explain how this works." 
    },
    { 
        words: ["went", "my", "friends", "and", "I", "to", "the", "same", "lecture"], 
        answer: "My friends and I went to the same lecture." 
    },
    { 
        words: ["say", "scientists", "the", "cause", "of", "climate", "change", "is", "human", "activities"], 
        answer: "Scientists say the cause of climate change is human activities." 
    },
    { 
        words: ["not", "only", "she", "is", "a", "teacher", "but", "also", "a", "writer"], 
        answer: "She is not only a teacher but also a writer." 
    },
    { 
        words: ["was", "adapted", "into", "a", "film", "last", "year", "the", "famous", "novel"], 
        answer: "The famous novel was adapted into a film last year." 
    },
    { 
        words: ["was", "cancelled", "the", "match", "because", "of", "the", "heavy", "rain"], 
        answer: "The match was cancelled because of the heavy rain." 
    },
    { 
        words: ["finished", "with", "the", "help", "of", "the", "team", "we", "the", "project"], 
        answer: "We finished the project with the help of the team." 
    },
    { 
        words: ["the", "more", "you", "practice", "the", "better", "you", "become"], 
        answer: "The more you practice, the better you become." 
    },
    { 
        words: ["did", "she", "forgive", "him", "only", "after", "he", "apologized"], 
        answer: "She forgave him only after he apologized." 
    },
    { 
        words: ["will", "succeed", "whoever", "works", "hard"], 
        answer: "Whoever works hard will succeed." 
    },
    { 
        words: ["could", "you", "tell", "me", "where", "the", "library", "is"], 
        answer: "Could you tell me where the library is?" 
    },
    { 
        words: ["would", "have", "come", "if", "they", "had", "known", "earlier"], 
        answer: "They would have come if they had known earlier." 
    },
    { 
        words: ["had", "already", "started", "the", "show", "by", "the", "time", "we", "arrived"], 
        answer: "The show had already started by the time we arrived." 
    },
    { 
        words: ["is", "why", "learning", "English", "important"], 
        answer: "Why is learning English important?" 
    },
    { 
        words: ["must", "each", "student", "submit", "his", "or", "her", "essay", "before", "the", "deadline"], 
        answer: "Each student must submit his or her essay before the deadline." 
    }
];

// 当前题目索引
let currentQuestionIndex = 0;
let currentWords = [];
let dragSrcElement = null;

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    
    // 检查答案按钮事件
    document.getElementById('checkAnswerBtn').addEventListener('click', checkAnswer);
    
    // 下一题按钮事件
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
});

// 加载当前题目
function loadQuestion() {
    const question = wordOrderQuestions[currentQuestionIndex];
    currentWords = [...question.words]; // 创建副本以避免修改原始数据
    
    // 随机打乱单词顺序
    shuffleArray(currentWords);
    
    // 渲染单词卡片
    renderWordCards();
    
    // 清除结果消息
    document.getElementById('resultMessage').innerHTML = '';
}

// 渲染单词卡片
function renderWordCards() {
    const container = document.getElementById('wordsContainer');
    container.innerHTML = '';
    
    currentWords.forEach((word, index) => {
        const wordCard = document.createElement('div');
        wordCard.className = 'word-card';
        wordCard.textContent = word;
        wordCard.setAttribute('draggable', 'true');
        wordCard.dataset.index = index;
        
        // 添加拖拽事件监听器
        wordCard.addEventListener('dragstart', handleDragStart);
        wordCard.addEventListener('dragend', handleDragEnd);
        wordCard.addEventListener('dragover', handleDragOver);
        wordCard.addEventListener('dragenter', handleDragEnter);
        wordCard.addEventListener('dragleave', handleDragLeave);
        wordCard.addEventListener('drop', handleDrop);
        
        container.appendChild(wordCard);
    });
}

// 使用Fisher-Yates算法随机打乱数组
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 拖拽开始处理
function handleDragStart(e) {
    dragSrcElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.textContent);
    this.classList.add('dragging');
}

// 拖拽结束处理
function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.word').forEach(card => {
        card.classList.remove('drag-over');
    });
    dragSrcElement = null;
}

// 拖拽经过元素时的处理
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

// 拖拽进入元素时的处理
function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

// 拖拽离开元素时的处理
function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

// 拖拽释放时的处理
function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (dragSrcElement !== this && dragSrcElement) {
        // 获取源和目标元素的文本内容
        const srcText = dragSrcElement.textContent;
        const destText = this.textContent;
        
        // 交换文本内容
        dragSrcElement.textContent = destText;
        this.textContent = srcText;
        
        // 交换data-index属性
        const srcIndex = dragSrcElement.dataset.index;
        const destIndex = this.dataset.index;
        dragSrcElement.dataset.index = destIndex;
        this.dataset.index = srcIndex;
        
        // 更新currentWords数组中对应位置的内容
        const srcIndexNum = parseInt(srcIndex);
        const destIndexNum = parseInt(destIndex);
        [currentWords[srcIndexNum], currentWords[destIndexNum]] = [currentWords[destIndexNum], currentWords[srcIndexNum]];
    }
}

// 检查答案
function checkAnswer() {
    const container = document.getElementById('wordsContainer');
    const wordCards = container.querySelectorAll('.word');
    
    // 获取当前排列的单词
    let userAnswer = '';
    wordCards.forEach((card, index) => {
        if (index === 0) {
            userAnswer += capitalizeFirstLetter(card.textContent.trim());
        } else {
            userAnswer += ' ' + card.textContent.trim();
        }
    });
    
    // 添加标点符号
    if (!/[.!?]$/.test(userAnswer)) {
        userAnswer += '.';
    }
    
    const correctAnswer = wordOrderQuestions[currentQuestionIndex].answer;
    const isCorrect = normalizeString(userAnswer) === normalizeString(correctAnswer);
    
    const resultDiv = document.getElementById('resultMessage');
    
    if (isCorrect) {
        resultDiv.className = 'result correct-result';
        resultDiv.innerHTML = '回答正确！🎉<br><span class="correct-answer">标准答案: ' + correctAnswer + '</span>';
    } else {
        resultDiv.className = 'result incorrect-result';
        resultDiv.innerHTML = '回答错误 😔<br><span class="correct-answer">您的答案: ' + userAnswer + '<br>标准答案: ' + correctAnswer + '</span>';
    }
}

// 将字符串标准化以便比较（转小写、去除多余空格）
function normalizeString(str) {
    return str.toLowerCase().replace(/\s+/g, ' ').trim();
}

// 首字母大写函数
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// 下一题
function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % wordOrderQuestions.length;
    loadQuestion();
}