// 当前题目索引
let currentQuestionIndex = 0;
let currentWords = [];
let dragSrcElement = null;
let lastSwapTarget = null; // 跟踪上一次交换的目标元素

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
let touchLastSwapTarget = null; // 跟踪移动端上一次交换的目标元素
const DRAG_THRESHOLD = 15;

// 进度保存相关的常量
const PROGRESS_STORAGE_KEY = 'wdenglish_sentence_progress';

// 翻译缓存
const translationCache = {};
let autoTranslateTimer = null;
let cachedQuestionIndices = new Set(); // 记录已缓存的题目索引
const MAX_CACHED_QUESTIONS = 5; // 最多缓存5道题

// DOM元素
const wordsContainer = document.getElementById('wordsContainer');
const checkBtn = document.getElementById('checkBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resultDiv = document.getElementById('result');
const explanationDiv = document.getElementById('explanation');
const questionNumberEl = document.getElementById('questionNumber');
const totalQuestionsEl = document.getElementById('totalQuestions');

// ========== 菜单切换功能 ==========
function initMenuSwitch() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sentenceCard = document.querySelector('.exercise-card:not(.grammar-card):not(.translation-card):not(.reading-card)');
    const grammarCard = document.querySelector('.grammar-card');
    const translationCard = document.querySelector('.translation-card');
    const readingCard = document.querySelector('.reading-card');

    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // 跳过 disabled 菜单项
            if (item.classList.contains('disabled')) {
                return;
            }

            // 切换 active 状态
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');

            // 切换卡片显示
            switchCard(index, sentenceCard, grammarCard, translationCard, readingCard);
        });
    });
}

// 切换卡片显示
function switchCard(menuIndex, sentenceCard, grammarCard, translationCard, readingCard) {
    // 0: 连词成句, 1: 语法填空, 2: 翻译填空, 3: 阅读填空
    const subtitle = document.getElementById('subtitle');
    
    // 先隐藏所有卡片
    if (sentenceCard) sentenceCard.classList.add('hidden');
    if (grammarCard) grammarCard.classList.add('hidden');
    if (translationCard) translationCard.classList.add('hidden');
    if (readingCard) readingCard.classList.add('hidden');
    
    if (menuIndex === 0) {
        // 连词成句
        if (sentenceCard) sentenceCard.classList.remove('hidden');
        if (subtitle) subtitle.textContent = '拾起散落的语言碎片，拼凑属于自己的表达';
    } else if (menuIndex === 1) {
        // 语法填空
        if (grammarCard) grammarCard.classList.remove('hidden');
        if (subtitle) subtitle.textContent = '不是所有空白都代表缺失，有些，是词语间未说完的余韵';
    } else if (menuIndex === 2) {
        // 翻译填空
        if (translationCard) translationCard.classList.remove('hidden');
        if (subtitle) subtitle.textContent = '填补语言间的桥接处，让意义在彼岸完整';
        // 初始化翻译填空
        if (typeof initTranslationFill === 'function') {
            initTranslationFill();
        }
    } else if (menuIndex === 3) {
        // 阅读填空
        if (readingCard) readingCard.classList.remove('hidden');
        if (subtitle) subtitle.textContent = '在文字的森林中穿行，拾取意义的碎片';
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 初始化菜单切换
    initMenuSwitch();

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

    // 初始化AI聊天窗口滚动控制
    initChatScrollControl();

    // 禁用右键菜单
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
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
    
    // 清除之前的自动翻译定时器
    if (autoTranslateTimer) {
        clearTimeout(autoTranslateTimer);
        autoTranslateTimer = null;
    }
    
    // 启动自动翻译定时器，1秒后开始翻译所有单词
    autoTranslateTimer = setTimeout(() => {
        autoTranslateAllWords();
    }, 1000);
}

// 渲染单词到容器中
function renderWords() {
    wordsContainer.innerHTML = '';
    
    currentWords.forEach((word, index) => {
        if (word.trim() !== '') { // 跳过空字符串
            const wordCard = document.createElement('div');
            wordCard.className = 'word-card';
            wordCard.setAttribute('data-index', index);
            
            const wordCardInner = document.createElement('div');
            wordCardInner.className = 'word-card-inner';
            
            const wordCardFront = document.createElement('div');
            wordCardFront.className = 'word-card-front';
            wordCardFront.textContent = word;
            
            const wordCardBack = document.createElement('div');
            wordCardBack.className = 'word-card-back';
            wordCardBack.textContent = word;
            
            wordCardInner.appendChild(wordCardFront);
            wordCardInner.appendChild(wordCardBack);
            wordCard.appendChild(wordCardInner);
            
            // 将拖动事件绑定到整个卡片容器上
            wordCard.setAttribute('draggable', 'true');
            wordCardInner.setAttribute('draggable', 'true');
            wordCardFront.setAttribute('draggable', 'true');
            wordCardBack.setAttribute('draggable', 'true');
            
            // 拖拽事件 - 绑定到所有相关元素上
            wordCard.addEventListener('dragstart', handleDragStart);
            wordCard.addEventListener('dragend', handleDragEnd);
            wordCard.addEventListener('dragover', handleDragOver);
            wordCard.addEventListener('dragenter', handleDragEnter);
            wordCard.addEventListener('dragleave', handleDragLeave);
            wordCard.addEventListener('drop', handleDrop);
            
            wordCardInner.addEventListener('dragstart', handleDragStart);
            wordCardInner.addEventListener('dragend', handleDragEnd);
            wordCardInner.addEventListener('dragover', handleDragOver);
            wordCardInner.addEventListener('dragenter', handleDragEnter);
            wordCardInner.addEventListener('dragleave', handleDragLeave);
            wordCardInner.addEventListener('drop', handleDrop);
            
            wordCardFront.addEventListener('dragstart', handleDragStart);
            wordCardFront.addEventListener('dragend', handleDragEnd);
            wordCardFront.addEventListener('dragover', handleDragOver);
            wordCardFront.addEventListener('dragenter', handleDragEnter);
            wordCardFront.addEventListener('dragleave', handleDragLeave);
            wordCardFront.addEventListener('drop', handleDrop);
            
            wordCardBack.addEventListener('dragstart', handleDragStart);
            wordCardBack.addEventListener('dragend', handleDragEnd);
            wordCardBack.addEventListener('dragover', handleDragOver);
            wordCardBack.addEventListener('dragenter', handleDragEnter);
            wordCardBack.addEventListener('dragleave', handleDragLeave);
            wordCardBack.addEventListener('drop', handleDrop);
            
            // 触摸事件（移动端支持）
            wordCard.addEventListener('touchstart', handleTouchStart);
            wordCard.addEventListener('touchmove', handleTouchMove, { passive: false });
            wordCard.addEventListener('touchend', handleTouchEnd);
            wordCard.addEventListener('touchcancel', handleTouchEnd);
            
            // 点击翻转事件 - 使用 mousedown 和 mouseup 来区分点击和拖拽
            let mouseDownTime = 0;
            let mouseDownX = 0;
            let mouseDownY = 0;
            
            wordCard.addEventListener('mousedown', (e) => {
                mouseDownTime = Date.now();
                mouseDownX = e.clientX;
                mouseDownY = e.clientY;
            });
            
            wordCard.addEventListener('click', (e) => {
                const mouseUpTime = Date.now();
                const deltaX = Math.abs(e.clientX - mouseDownX);
                const deltaY = Math.abs(e.clientY - mouseDownY);
                const deltaTime = mouseUpTime - mouseDownTime;
                
                // 如果鼠标移动距离小于10px且时间小于300ms，则认为是点击
                if (deltaX < 10 && deltaY < 10 && deltaTime < 300) {
                    handleCardClick.call(wordCard, e);
                }
            });
            
            // 添加 flipping class 以显示可点击状态
            wordCard.classList.add('flipping');
            
            wordsContainer.appendChild(wordCard);
        }
    });
}

// 卡片点击翻转处理函数
function handleCardClick(e) {
    const card = e.currentTarget;
    
    // 如果正在拖拽中，不触发翻转
    if (card.classList.contains('dragging')) {
        return;
    }
    
    // 如果正在进行触摸拖拽，不触发翻转
    if (isDragging && isTouchDragStarted) {
        return;
    }
    
    // 获取卡片的正面文本和背面元素
    const frontElement = card.querySelector('.word-card-front');
    const backElement = card.querySelector('.word-card-back');
    
    if (!frontElement || !backElement) {
        return;
    }
    
    const originalText = frontElement.textContent.trim();
    const isCurrentlyFlipped = card.classList.contains('flipped');
    
    // 播放轻微的翻转音效（可选）
    playSound('flip');
    
    // 如果卡片当前是正面（未翻转），点击后要翻转到背面
    if (!isCurrentlyFlipped) {
        // 先检查是否已经翻译过
        if (card.classList.contains('translated')) {
            // 已经翻译过，直接翻转
            card.classList.add('flipped');
        } else if (card.classList.contains('cached')) {
            // 已经缓存翻译结果，直接翻转
            card.classList.add('flipped');
            card.classList.add('translated');
            card.classList.remove('cached');
        } else if (originalText) {
            // 检查缓存中是否有翻译结果
            if (translationCache[originalText]) {
                // 使用缓存的翻译结果
                backElement.innerHTML = `<span class="translation-result">${translationCache[originalText]}</span>`;
                card.classList.add('flipped');
                card.classList.add('translated');
                console.log('使用缓存翻译:', originalText);
            } else {
                // 没有翻译过，先显示加载状态，然后开始翻译
                backElement.innerHTML = '<span class="translation-loading">翻译中...</span>';
                card.classList.add('translating');
                
                // 立即翻转显示加载状态
                card.classList.add('flipped');
                
                console.log('开始翻译:', originalText);
                
                // 调用百度翻译API
                if (window.baiduTranslateService) {
                    window.baiduTranslateService.translate(originalText, 'auto', 'zh')
                        .then(translatedText => {
                            console.log('翻译成功:', translatedText);
                            // 缓存翻译结果
                            cacheTranslation(originalText, translatedText);
                            // 更新卡片背面内容
                            backElement.innerHTML = `<span class="translation-result">${translatedText}</span>`;
                            card.classList.add('translated');
                            card.classList.remove('translating');
                        })
                        .catch(error => {
                            console.error('翻译失败:', error);
                            // 显示错误信息
                            backElement.innerHTML = `<span class="translation-error">翻译失败</span>`;
                            card.classList.remove('translating');
                            
                            // 如果是MD5库未加载，显示更详细的错误
                            if (error.message && error.message.includes('MD5')) {
                                console.error('请检查MD5库是否正确引入');
                            }
                        });
                } else {
                    console.error('百度翻译服务未加载');
                    // 如果翻译服务未加载，显示提示
                    backElement.innerHTML = '<span class="translation-error">翻译服务未加载</span>';
                    card.classList.remove('translating');
                }
            }
        }
    } else {
        // 卡片当前是背面（已翻转），点击后翻回正面
        card.classList.remove('flipped');
    }
}

// 洗牌算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 自动翻译所有单词
function autoTranslateAllWords() {
    if (!window.baiduTranslateService) {
        console.log('百度翻译服务未加载，跳过自动翻译');
        return;
    }
    
    // 标记当前题目为已缓存
    cachedQuestionIndices.add(currentQuestionIndex);
    
    const wordCards = document.querySelectorAll('.word-card');
    const wordsToTranslate = [];
    
    // 收集需要翻译的单词
    wordCards.forEach(card => {
        if (!card.classList.contains('translated')) {
            const frontElement = card.querySelector('.word-card-front');
            if (frontElement) {
                const originalText = frontElement.textContent.trim();
                if (originalText && !translationCache[originalText]) {
                    wordsToTranslate.push({
                        text: originalText,
                        card: card
                    });
                }
            }
        }
    });
    
    if (wordsToTranslate.length === 0) {
        console.log('没有需要翻译的单词');
        // 即使没有需要翻译的单词，也继续翻译下一道题
        autoTranslateNextQuestion();
        return;
    }
    
    console.log(`开始自动翻译 ${wordsToTranslate.length} 个单词`);
    
    // 创建所有翻译Promise
    const translatePromises = wordsToTranslate.map(item => {
        return window.baiduTranslateService.translate(item.text, 'auto', 'zh')
            .then(translatedText => {
                console.log(`自动翻译成功: ${item.text} -> ${translatedText}`);
                // 缓存翻译结果
                translationCache[item.text] = translatedText;
                
                // 更新卡片背面内容（但不标记为已翻译，保持卡片正面显示）
                const backElement = item.card.querySelector('.word-card-back');
                if (backElement) {
                    backElement.innerHTML = `<span class="translation-result">${translatedText}</span>`;
                    // 添加缓存标记，但不添加translated class
                    item.card.classList.add('cached');
                }
            })
            .catch(error => {
                console.error(`自动翻译失败: ${item.text}`, error);
            });
    });
    
    // 等待所有翻译完成后，自动翻译下一道题
    Promise.all(translatePromises).then(() => {
        console.log('当前题目翻译完成');
        autoTranslateNextQuestion();
    });
}

// 自动翻译下一道题
function autoTranslateNextQuestion() {
    // 计算下一道题的索引
    const nextIndex = (currentQuestionIndex + 1) % questions.length;
    
    // 检查是否已经缓存过
    if (cachedQuestionIndices.has(nextIndex)) {
        console.log(`第 ${nextIndex + 1} 题已缓存，跳过`);
        return;
    }
    
    // 检查是否超过最大缓存数量
    if (cachedQuestionIndices.size >= MAX_CACHED_QUESTIONS) {
        console.log('已达到最大缓存数量，停止自动翻译');
        return;
    }
    
    console.log(`开始自动翻译下一道题: 第 ${nextIndex + 1} 题`);
    
    // 获取下一道题的单词
    const nextQuestion = questions[nextIndex];
    const wordsToTranslate = [];
    
    // 收集需要翻译的单词
    nextQuestion.words.forEach(word => {
        if (word.trim() !== '' && !translationCache[word]) {
            wordsToTranslate.push(word);
        }
    });
    
    if (wordsToTranslate.length === 0) {
        console.log('下一道题没有需要翻译的单词');
        cachedQuestionIndices.add(nextIndex);
        // 继续翻译再下一道题
        const nextNextIndex = (nextIndex + 1) % questions.length;
        if (!cachedQuestionIndices.has(nextNextIndex) && cachedQuestionIndices.size < MAX_CACHED_QUESTIONS) {
            setTimeout(() => {
                autoTranslateNextQuestionWithIndex(nextNextIndex);
            }, 500);
        }
        return;
    }
    
    // 逐个翻译单词
    const translatePromises = wordsToTranslate.map(word => {
        return window.baiduTranslateService.translate(word, 'auto', 'zh')
            .then(translatedText => {
                console.log(`自动翻译成功（下一道题）: ${word} -> ${translatedText}`);
                // 缓存翻译结果
                translationCache[word] = translatedText;
            })
            .catch(error => {
                console.error(`自动翻译失败（下一道题）: ${word}`, error);
            });
    });
    
    // 等待所有翻译完成后，标记为已缓存
    Promise.all(translatePromises).then(() => {
        console.log(`第 ${nextIndex + 1} 题翻译完成`);
        cachedQuestionIndices.add(nextIndex);
        
        // 继续翻译再下一道题
        const nextNextIndex = (nextIndex + 1) % questions.length;
        if (!cachedQuestionIndices.has(nextNextIndex) && cachedQuestionIndices.size < MAX_CACHED_QUESTIONS) {
            setTimeout(() => {
                autoTranslateNextQuestionWithIndex(nextNextIndex);
            }, 500);
        }
    });
}

// 自动翻译指定索引的题目
function autoTranslateNextQuestionWithIndex(questionIndex) {
    // 检查是否已经缓存过
    if (cachedQuestionIndices.has(questionIndex)) {
        console.log(`第 ${questionIndex + 1} 题已缓存，跳过`);
        return;
    }
    
    // 检查是否超过最大缓存数量
    if (cachedQuestionIndices.size >= MAX_CACHED_QUESTIONS) {
        console.log('已达到最大缓存数量，停止自动翻译');
        return;
    }
    
    console.log(`开始自动翻译第 ${questionIndex + 1} 题`);
    
    // 获取指定题目的单词
    const question = questions[questionIndex];
    const wordsToTranslate = [];
    
    // 收集需要翻译的单词
    question.words.forEach(word => {
        if (word.trim() !== '' && !translationCache[word]) {
            wordsToTranslate.push(word);
        }
    });
    
    if (wordsToTranslate.length === 0) {
        console.log(`第 ${questionIndex + 1} 题没有需要翻译的单词`);
        cachedQuestionIndices.add(questionIndex);
        // 继续翻译下一道题
        const nextIndex = (questionIndex + 1) % questions.length;
        if (!cachedQuestionIndices.has(nextIndex) && cachedQuestionIndices.size < MAX_CACHED_QUESTIONS) {
            setTimeout(() => {
                autoTranslateNextQuestionWithIndex(nextIndex);
            }, 500);
        }
        return;
    }
    
    // 逐个翻译单词
    const translatePromises = wordsToTranslate.map(word => {
        return window.baiduTranslateService.translate(word, 'auto', 'zh')
            .then(translatedText => {
                console.log(`自动翻译成功: ${word} -> ${translatedText}`);
                // 缓存翻译结果
                translationCache[word] = translatedText;
            })
            .catch(error => {
                console.error(`自动翻译失败: ${word}`, error);
            });
    });
    
    // 等待所有翻译完成后，标记为已缓存
    Promise.all(translatePromises).then(() => {
        console.log(`第 ${questionIndex + 1} 题翻译完成`);
        cachedQuestionIndices.add(questionIndex);
        
        // 继续翻译下一道题
        const nextIndex = (questionIndex + 1) % questions.length;
        if (!cachedQuestionIndices.has(nextIndex) && cachedQuestionIndices.size < MAX_CACHED_QUESTIONS) {
            setTimeout(() => {
                autoTranslateNextQuestionWithIndex(nextIndex);
            }, 500);
        }
    });
}

// 缓存翻译结果
function cacheTranslation(originalText, translatedText) {
    translationCache[originalText] = translatedText;
}

// 拖拽相关函数
function handleDragStart(e) {
    const cardElement = this.closest('.word-card');
    dragSrcElement = cardElement;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', cardElement.innerHTML);
    cardElement.classList.add('dragging');
    
    // 播放音效（可选）
    playSound('drag');
    
    // 隐藏浏览器默认的拖动虚影，使用自定义实体克隆元素
    const emptyImg = new Image();
    emptyImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(emptyImg, 0, 0);
    
    // 创建自定义实体拖动克隆元素
    const rect = cardElement.getBoundingClientRect();
    const dragClone = cardElement.cloneNode(true);
    // 保留原始卡片的类名，只添加 word-card-touch-clone 类
    dragClone.classList.add('word-card-touch-clone');
    dragClone.style.width = rect.width + 'px';
    dragClone.style.height = rect.height + 'px';
    dragClone.style.left = rect.left + 'px';
    dragClone.style.top = rect.top + 'px';
    dragClone.style.transform = 'translateZ(0) scale(1)';
    
    // 添加到 body 并保存引用
    document.body.appendChild(dragClone);
    cardElement.dataset.dragClone = 'true';
    
    // 监听 drag 事件来更新克隆元素位置
    const updateClonePosition = (e) => {
        if (dragClone && dragClone.parentNode) {
            const x = e.clientX - rect.width / 2;
            const y = e.clientY - rect.height / 2;
            dragClone.style.left = x + 'px';
            dragClone.style.top = y + 'px';
        }
    };
    
    cardElement.addEventListener('drag', updateClonePosition);
    cardElement._updateClonePosition = updateClonePosition;
}

function handleDragEnd() {
    const cardElement = this.closest('.word-card');
    cardElement.classList.remove('dragging');
    
    // 清理自定义拖动克隆元素
    if (cardElement.dataset.dragClone === 'true') {
        const clones = document.querySelectorAll('.word-card-touch-clone');
        clones.forEach(clone => {
            if (clone.parentNode) {
                clone.parentNode.removeChild(clone);
            }
        });
        cardElement.dataset.dragClone = 'false';
        
        // 移除 drag 事件监听
        if (cardElement._updateClonePosition) {
            cardElement.removeEventListener('drag', cardElement._updateClonePosition);
            delete cardElement._updateClonePosition;
        }
    }
    dragSrcElement = null;
    lastSwapTarget = null;
    
    // 移除所有 drag-over 状态，添加平滑过渡
    const allWordCards = document.querySelectorAll('.word-card');
    allWordCards.forEach(card => {
        if (card.classList.contains('drag-over')) {
            card.classList.remove('drag-over');
        }
    });
}

// 直接交换两个DOM元素的位置
function swapElements(elem1, elem2) {
    // 创建临时占位符
    const temp = document.createElement('div');
    elem1.parentNode.insertBefore(temp, elem1);
    elem2.parentNode.insertBefore(elem1, elem2);
    temp.parentNode.insertBefore(elem2, temp);
    temp.parentNode.removeChild(temp);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter() {
    const cardElement = this.closest('.word-card');
    
    // 确保找到了有效的卡片元素
    if (!cardElement) {
        return;
    }
    
    // 确保有拖动源且不是同一个元素
    if (!dragSrcElement || cardElement === dragSrcElement) {
        return;
    }
    
    // 如果上次交换的就是这个元素，跳过（防止重复交换）
    if (lastSwapTarget === cardElement) {
        return;
    }
    
    // 获取所有单词卡片元素
    const cardElements = Array.from(wordsContainer.children);
    const fromIndex = cardElements.indexOf(dragSrcElement);
    const toIndex = cardElements.indexOf(cardElement);
    
    // 交换位置
    if (fromIndex !== -1 && toIndex !== -1) {
        // 更新currentWords数组
        [currentWords[fromIndex], currentWords[toIndex]] = [currentWords[toIndex], currentWords[fromIndex]];
        
        // 直接交换两个DOM元素的位置
        swapElements(dragSrcElement, cardElement);
        
        // 更新上一次交换的目标元素
        lastSwapTarget = cardElement;
        
        // 播放交换音效
        playSound('drop');
    }
}

function handleDragLeave() {
    const cardElement = this.closest('.word-card');
    cardElement.classList.remove('drag-over');
    // 重置上一次交换的目标元素
    if (lastSwapTarget === cardElement) {
        lastSwapTarget = null;
    }
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    const cardElement = this.closest('.word-card');
    cardElement.classList.remove('drag-over');
    
    // 确保所有单词卡片都移除drag-over状态，避免视觉残留
    const allWordCards = document.querySelectorAll('.word-card');
    allWordCards.forEach(card => {
        if (card.classList.contains('drag-over')) {
            card.classList.remove('drag-over');
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
        // 答案错误时清除自动翻译定时器，避免卡顿
        if (autoTranslateTimer) {
            clearTimeout(autoTranslateTimer);
            autoTranslateTimer = null;
            console.log('已清除自动翻译定时器');
        }
        
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
    const cardElements = wordsContainer.querySelectorAll('.word-card');
    return Array.from(cardElements).map(card => {
        const frontElement = card.querySelector('.word-card-front');
        return frontElement ? frontElement.textContent.trim() : '';
    });
}

// 上一题
function prevQuestion() {
    currentQuestionIndex = (currentQuestionIndex - 1 + questions.length) % questions.length;
    
    // 清理旧的缓存索引，保留当前题目和相邻的题目
    cleanupOldCache();
    
    loadQuestion();
    saveProgress();
    playSound('prev');
}

// 下一题
function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    
    // 清理旧的缓存索引，保留当前题目和相邻的题目
    cleanupOldCache();
    
    loadQuestion();
    saveProgress();
    playSound('next');
}

// 清理旧的缓存索引
function cleanupOldCache() {
    // 保留当前题目和相邻的题目（前后各2题）
    const indicesToKeep = new Set();
    for (let i = -2; i <= 2; i++) {
        const index = (currentQuestionIndex + i + questions.length) % questions.length;
        indicesToKeep.add(index);
    }
    
    // 删除不在保留范围内的缓存索引
    for (const index of cachedQuestionIndices) {
        if (!indicesToKeep.has(index)) {
            cachedQuestionIndices.delete(index);
        }
    }
    
    console.log('清理后的缓存题目:', Array.from(cachedQuestionIndices).map(i => i + 1));
}

// 简单音效函数（可选）
function playSound(type) {
    // 这里可以添加音效，目前只是占位符
    // 实际使用时可以使用 Web Audio API 或 HTML5 Audio
    console.log(`Playing ${type} sound`);
}

// 成功庆祝动画
function celebrateSuccess() {
    const correctCards = document.querySelectorAll('.word-card');
    correctCards.forEach((card, index) => {
        setTimeout(() => {
            const frontElement = card.querySelector('.word-card-front');
            if (frontElement) {
                frontElement.style.transform = 'scale(1.1)';
                frontElement.style.background = 'linear-gradient(135deg, #7aa8d6, #5d8ab8)';
                frontElement.style.color = '#ffffff';
                
                setTimeout(() => {
                    frontElement.style.transform = '';
                    frontElement.style.background = '';
                    frontElement.style.color = '';
                }, 300);
            }
        }, index * 100);
    });
}

// 键盘快捷键支持
let isAvatarModalOpen = false;

document.addEventListener('keydown', (e) => {
    // 如果头像模态窗口打开，阻止所有键盘快捷键
    if (isAvatarModalOpen) {
        e.preventDefault();
        e.stopPropagation();
        return;
    }
    
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
    touchLastSwapTarget = null;
    
    // 立即创建拖拽克隆元素，但保持隐藏状态
    touchDragClone = this.cloneNode(true);
    // 保留原始卡片的类名，只添加 word-card-touch-clone 类
    touchDragClone.classList.add('word-card-touch-clone');
    touchDragClone.style.position = 'fixed';
    touchDragClone.style.zIndex = '10000';
    touchDragClone.style.pointerEvents = 'none';
    touchDragClone.style.opacity = '0';
    touchDragClone.style.width = rect.width + 'px';
    touchDragClone.style.height = rect.height + 'px';
    touchDragClone.style.left = '0';
    touchDragClone.style.top = '0';
    touchDragClone.style.willChange = 'transform';
    touchDragClone.style.transform = `translate3d(${touch.clientX - touchOffsetX}px, ${touch.clientY - touchOffsetY}px, 0) scale(1)`;
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
    touchDragClone.style.transform = `translate3d(${currentX - touchOffsetX}px, ${currentY - touchOffsetY}px, 0) scale(1)`;
    
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
    
    // 如果拖拽已启动，阻止点击事件触发
    if (isTouchDragStarted) {
        e.preventDefault();
    }
    
    // 清理
    cleanupTouchDrag();
}

function findElementUnderTouch(x, y) {
    const elements = document.elementsFromPoint(x, y);
    for (const element of elements) {
        // 检查元素本身是否是 word-card
        if (element.classList.contains('word-card') && element !== touchDragClone && element !== touchDragSrcElement) {
            return element;
        }
        // 检查元素的父元素是否是 word-card（处理翻转后的卡片）
        const parentCard = element.closest('.word-card');
        if (parentCard && parentCard !== touchDragClone && parentCard !== touchDragSrcElement) {
            return parentCard;
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
        
        // 自动交换位置
        if (touchDragSrcElement && targetElement !== touchDragSrcElement) {
            // 如果上次交换的就是这个元素，跳过（防止重复交换）
            if (touchLastSwapTarget === targetElement) {
                return;
            }
            
            const cardElements = Array.from(wordsContainer.children);
            const fromIndex = cardElements.indexOf(touchDragSrcElement);
            const toIndex = cardElements.indexOf(targetElement);
            
            if (fromIndex !== -1 && toIndex !== -1) {
                // 更新currentWords数组
                [currentWords[fromIndex], currentWords[toIndex]] = [currentWords[toIndex], currentWords[fromIndex]];
                
                // 在DOM中直接交换两个元素的位置
                const parent = targetElement.parentNode;
                const temp = document.createElement('div');
                
                // 使用临时占位符来交换两个元素
                parent.insertBefore(temp, targetElement);
                parent.insertBefore(targetElement, touchDragSrcElement);
                parent.insertBefore(touchDragSrcElement, temp);
                parent.removeChild(temp);
                
                // 更新上一次交换的目标元素
                touchLastSwapTarget = targetElement;
                
                // 播放交换音效
                playSound('drop');
            }
        }
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
    
    // 重置上一次交换的目标元素
    touchLastSwapTarget = null;
    isTouchDragStarted = false;
}

// 防止移动端滚动干扰
document.addEventListener('touchmove', function(e) {
    if (isDragging) {
        e.preventDefault();
    }
}, { passive: false });

// ========== AI对话功能 ==========

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const newChatBtn = document.getElementById('newChatBtn');

const aiService = new QwenAIService();
aiService.setApiKey('sk-a5be507e9e5543b9ab3d83e7982f44a5');

// 将aiService暴露到window对象，以便其他函数访问
window.aiService = aiService;

let conversationHistory = [];
let isProcessing = false;
let heightAdjustmentPending = false;
let heightAdjustmentTimeout = null;
let resizeAnimationFrame = null;

function initAIChat() {
    if (!chatInput || !sendBtn) return;

    sendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleSendMessage();
        }
    });

    if (newChatBtn) {
        newChatBtn.addEventListener('click', handleNewChat);
    }

    initChatAutoSize();
}

function initChatAutoSize() {
    if (!chatMessages) return;

    updateWindowHeight();

    window.addEventListener('resize', debounce(() => {
        updateWindowHeight();
    }, 150));
    
    // 初始化自动滚动观察器
    initAutoScrollObservers();
    
    // 确保初始滚动到底部
    setTimeout(() => {
        scrollToBottom();
    }, 100);
}

// ========== 向上拉伸布局 - 简化的滚动管理 ==========

let chatMutationObserver = null;
let messagesWrapper = null;

/**
 * 初始化向上拉伸布局
 * column-reverse 布局中，scrollTop=0 表示在底部（最新消息）
 */
function initAutoScrollObservers() {
    if (!chatMessages) return;
    
    // 获取消息包装器
    messagesWrapper = chatMessages.querySelector('.chat-messages-wrapper');
    if (!messagesWrapper) {
        // 如果没有包装器，创建一个
        messagesWrapper = document.createElement('div');
        messagesWrapper.className = 'chat-messages-wrapper';
        while (chatMessages.firstChild) {
            messagesWrapper.appendChild(chatMessages.firstChild);
        }
        chatMessages.appendChild(messagesWrapper);
    }
    
    // column-reverse 布局中，初始化时已经在底部，无需额外滚动
    // 新消息添加时会自动向上拉伸，保持底部可见
}

// 向上拉伸布局不需要手动调整高度
function adjustChatHeight() {
    // column-reverse 布局自动处理
}

// 保存最终响应内容用于无缝过渡
let finalResponseContent = '';

function handleNewChat() {
    if (isProcessing) return;

    // 清除对话历史
    conversationHistory = [];

    // 清除聊天消息
    const wrapper = chatMessages.querySelector('.chat-messages-wrapper');
    if (wrapper) {
        wrapper.innerHTML = '';
    }

    // 重新添加默认欢迎消息
    addAIMessage('你好！我是你的AI英语学习助手。你可以问我任何关于英语语法、词汇、翻译的问题，我会尽力帮助你！');

    // 重置wrapper的paddingTop
    if (wrapper) {
        wrapper.style.paddingTop = '38px';
    }

    // 重置输入状态
    resetInputState();
}

function handleSendMessage() {
    const message = chatInput.value.trim();
    if (!message || isProcessing) return;

    addUserMessage(message);
    
    // 发送消息后移除默认消息的下移偏移
    const wrapper = chatMessages.querySelector('.chat-messages-wrapper');
    if (wrapper) {
        wrapper.style.paddingTop = '18px';
    }
    
    chatInput.value = '';
    chatInput.disabled = true;
    sendBtn.disabled = true;
    isProcessing = true;
    finalResponseContent = '';

    conversationHistory.push({
        role: 'user',
        content: message
    });

    showLoadingMessage();

    try {
        aiService.sendConversationMessage(conversationHistory, {
            stream: true,
            temperature: 0.7,
            maxTokens: 2000,
            onStreamChunk: (chunk, fullContent) => {
                updateStreamingMessage(fullContent);
            }
        }).then(response => {
            finalResponseContent = response;
            finalizeStreamingMessage(response);
            resetInputState();
        }).catch(error => {
            removeLoadingMessage();
            addErrorMessage(error.message);
            resetInputState();
        });
    } catch (error) {
        removeLoadingMessage();
        addErrorMessage(error.message);
        resetInputState();
    }
}

// 统一的消息添加函数 - 向上拉伸版
function addMessageWithSmoothTransition(messageDiv) {
    // 获取或创建消息包装器
    let wrapper = chatMessages.querySelector('.chat-messages-wrapper');
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.className = 'chat-messages-wrapper';
        chatMessages.appendChild(wrapper);
    }
    
    // 将消息添加到包装器末尾
    wrapper.appendChild(messageDiv);
    
    // 使用双重 RAF 确保 DOM 已更新
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // 播放消息淡入动画
            messageDiv.style.transition = 'opacity 0.35s ease-out, transform 0.35s ease-out';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
            // column-reverse 布局会自动保持底部可见，无需手动滚动
        });
    });
}

// column-reverse 布局中，scrollTop=0 表示在底部
// 保留简化版本以便其他地方调用

function scrollToBottomSmooth() {
    if (!chatMessages) return;
    // column-reverse 布局中，滚动到底部就是 scrollTop = 0
    chatMessages.scrollTop = 0;
}

function scrollToBottom() {
    if (!chatMessages) return;
    chatMessages.scrollTop = 0;
}

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user-message';
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(15px)';

    // 检查是否有保存的头像
    const savedAvatar = localStorage.getItem(AVATAR_STORAGE_KEY);
    let avatarContent = '<div class="message-avatar">👤</div>';
    
    if (savedAvatar) {
        avatarContent = `
            <div class="message-avatar has-image clickable">
                <img src="${savedAvatar}" alt="用户头像">
            </div>
        `;
    }

    messageDiv.innerHTML = `
        ${avatarContent}
        <div class="message-content">
            <div class="message-text">${escapeHtml(text)}</div>
        </div>
    `;

    addMessageWithSmoothTransition(messageDiv);
}

function addAIMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ai-message';
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(15px)';

    // 检查是否有保存的AI头像
    const savedAIAvatar = localStorage.getItem(AI_AVATAR_STORAGE_KEY);
    let avatarContent = `
        <div class="message-avatar has-image clickable">
            <img src="史迪仔.png" alt="AI头像">
        </div>
    `;
    
    if (savedAIAvatar) {
        avatarContent = `
            <div class="message-avatar has-image clickable">
                <img src="${savedAIAvatar}" alt="AI头像">
            </div>
        `;
    }

    messageDiv.innerHTML = `
        ${avatarContent}
        <div class="message-content">
            <div class="message-text">${formatAIResponse(text)}</div>
        </div>
    `;

    addMessageWithSmoothTransition(messageDiv);
}

function showLoadingMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ai-message loading';
    messageDiv.id = 'loadingMessage';
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(15px)';

    // 检查是否有保存的AI头像
    const savedAIAvatar = localStorage.getItem(AI_AVATAR_STORAGE_KEY);
    let avatarContent = `
        <div class="message-avatar has-image clickable">
            <img src="史迪仔.png" alt="AI头像">
        </div>
    `;
    
    if (savedAIAvatar) {
        avatarContent = `
            <div class="message-avatar has-image clickable">
                <img src="${savedAIAvatar}" alt="AI头像">
            </div>
        `;
    }

    messageDiv.innerHTML = `
        ${avatarContent}
        <div class="message-content">
            <div class="message-text streaming-text">正在思考...</div>
        </div>
    `;

    addMessageWithSmoothTransition(messageDiv);
}

// ========== 流式消息格式化处理器 ==========

/**
 * StreamMessageFormatter - AI实时消息格式处理器
 * 用于实时处理流式消息，移除多余符号并优化排版
 */
class StreamMessageFormatter {
    constructor() {
        // 格式化状态追踪
        this.resetState();
    }

    /**
     * 重置格式化状态
     */
    resetState() {
        this.lastFormattedLength = 0;
        this.pendingMarkers = {
            bold: 0,      // ** 标记计数
            italic: 0,    // * 标记计数
            code: 0       // ` 标记计数
        };
    }

    /**
     * 实时格式化流式文本
     * @param {string} text - 当前完整的流式文本
     * @returns {string} - 格式化后的HTML
     */
    formatStreamText(text) {
        try {
            if (!text || typeof text !== 'string') {
                return '';
            }

            // 第一步：清理多余的星号
            let cleaned = this.cleanExcessiveMarkers(text);
            
            // 第二步：转换为HTML格式
            let formatted = this.convertToHtml(cleaned);
            
            return formatted;
        } catch (error) {
            console.warn('流式消息格式化出错:', error);
            // 异常时返回安全的纯文本
            return this.escapeHtml(text);
        }
    }

    /**
     * 清理多余的Markdown标记符号
     * @param {string} text - 原始文本
     * @returns {string} - 清理后的文本
     */
    cleanExcessiveMarkers(text) {
        try {
            let result = text;

            // 移除连续3个及以上的星号（保留1-2个有意义的）
            result = result.replace(/\*{3,}/g, '**');

            // 移除行首/行尾的孤立星号（非Markdown格式用途）
            result = result.replace(/^\s*\*(?!\*)\s*/gm, '');
            result = result.replace(/\s*(?<!\*)\*\s*$/gm, '');

            // 清理不成对的加粗标记 - 在流式传输中暂时保留末尾的
            result = this.balanceMarkers(result, '**');

            // 清理空的格式标记
            result = result.replace(/\*\*\s*\*\*/g, '');
            result = result.replace(/\*\s*\*/g, '');
            result = result.replace(/`\s*`/g, '');

            return result;
        } catch (error) {
            console.warn('清理标记符号出错:', error);
            return text;
        }
    }

    /**
     * 平衡Markdown标记（处理不成对的标记）
     * @param {string} text - 文本
     * @param {string} marker - 标记符号
     * @returns {string} - 处理后的文本
     */
    balanceMarkers(text, marker) {
        try {
            const escapedMarker = marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedMarker, 'g');
            const matches = text.match(regex);
            
            if (!matches) return text;
            
            const count = matches.length;
            
            // 如果标记数量是奇数，说明有一个不成对
            // 在流式传输中，保留末尾的不完整标记（可能还在传输中）
            if (count % 2 === 1) {
                // 检查最后一个标记是否在文本末尾附近（10个字符内）
                const lastIndex = text.lastIndexOf(marker);
                if (text.length - lastIndex > 10) {
                    // 不在末尾，移除这个孤立的标记
                    const parts = text.split(marker);
                    // 找到孤立标记的位置并移除
                    let result = '';
                    let markerCount = 0;
                    for (let i = 0; i < parts.length; i++) {
                        result += parts[i];
                        if (i < parts.length - 1) {
                            markerCount++;
                            // 只有在是成对的情况下才添加标记
                            if (markerCount % 2 === 1 || markerCount < count) {
                                result += marker;
                            }
                        }
                    }
                    return result;
                }
            }
            
            return text;
        } catch (error) {
            return text;
        }
    }

    /**
     * 将清理后的文本转换为HTML
     * @param {string} text - 清理后的文本
     * @returns {string} - HTML格式文本
     */
    convertToHtml(text) {
        try {
            // 首先转义HTML特殊字符
            let html = this.escapeHtml(text);

            // 处理加粗 **text**
            html = html.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');

            // 处理斜体 *text* (避免与加粗冲突)
            html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');

            // 处理行内代码 `code`
            html = html.replace(/`([^`]+?)`/g, '<code class="inline-code">$1</code>');

            // 处理段落和换行
            html = this.formatParagraphs(html);

            return html;
        } catch (error) {
            console.warn('HTML转换出错:', error);
            return this.escapeHtml(text);
        }
    }

    /**
     * 格式化段落和换行
     * @param {string} html - HTML文本
     * @returns {string} - 格式化后的HTML
     */
    formatParagraphs(html) {
        try {
            // 双换行转为段落分隔
            html = html.replace(/\n\n+/g, '</p><p class="ai-paragraph">');
            
            // 单换行转为<br>
            html = html.replace(/\n/g, '<br>');

            // 包装在段落标签中
            if (!html.startsWith('<p')) {
                html = '<p class="ai-paragraph">' + html;
            }
            if (!html.endsWith('</p>')) {
                html = html + '</p>';
            }

            // 清理空段落
            html = html.replace(/<p class="ai-paragraph">\s*<\/p>/g, '');

            return html;
        } catch (error) {
            return html;
        }
    }

    /**
     * HTML特殊字符转义
     * @param {string} text - 原始文本
     * @returns {string} - 转义后的文本
     */
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * 获取安全的显示文本（完全移除所有Markdown标记）
     * @param {string} text - 原始文本
     * @returns {string} - 纯文本
     */
    getPlainText(text) {
        try {
            let plain = text;
            plain = plain.replace(/\*+/g, '');
            plain = plain.replace(/`/g, '');
            plain = plain.replace(/_+/g, '');
            return plain.trim();
        } catch (error) {
            return text;
        }
    }
}

// 创建全局格式化器实例
const streamFormatter = new StreamMessageFormatter();

// 流式消息状态缓存
let lastStreamContent = '';

/**
 * 更新流式消息显示 - 使用稳定格式化避免闪烁
 * @param {string} text - 当前完整的流式文本
 */
function updateStreamingMessage(text) {
    try {
        const loadingMessage = document.getElementById('loadingMessage');
        if (!loadingMessage) return;
        
        const messageText = loadingMessage.querySelector('.message-text');
        if (!messageText) return;

        // 性能优化：只在内容变化时更新
        if (text === lastStreamContent) return;
        lastStreamContent = text;

        // 使用稳定格式化 - 流式和完成状态使用相同格式
        const formattedHtml = formatStreamingContent(text);
        
        // 更新内容
        messageText.innerHTML = formattedHtml;
        
        // 添加流式消息样式类
        if (!messageText.classList.contains('streaming')) {
            messageText.classList.add('streaming');
        }
        
        // 移除loading状态
        if (loadingMessage.classList.contains('loading')) {
            loadingMessage.classList.remove('loading');
        }
        
        // 滚动由 MutationObserver 自动处理，此处无需额外操作
    } catch (error) {
        console.error('流式消息更新出错:', error);
        try {
            const loadingMessage = document.getElementById('loadingMessage');
            if (loadingMessage) {
                const messageText = loadingMessage.querySelector('.message-text');
                if (messageText) {
                    messageText.textContent = text;
                }
            }
        } catch (e) {
            console.error('异常恢复失败:', e);
        }
    }
}

/**
 * 格式化流式内容 - 智能处理不完整标记
 * @param {string} text - 原始文本
 * @returns {string} - 格式化后的HTML
 */
function formatStreamingContent(text) {
    try {
        if (!text) return '';
        
        let content = text;
        
        // 清理多余的星号
        content = content.replace(/\*{3,}/g, '**');
        
        // 智能截断末尾不完整的标记
        const lastBoldIndex = content.lastIndexOf('**');
        const boldCount = (content.match(/\*\*/g) || []).length;
        
        if (boldCount % 2 === 1 && content.length - lastBoldIndex < 30) {
            content = content.substring(0, lastBoldIndex) + content.substring(lastBoldIndex + 2);
        }
        
        // 处理单个星号的斜体标记
        const singleStarMatches = content.match(/(?<!\*)\*(?!\*)/g) || [];
        if (singleStarMatches.length % 2 === 1) {
            const lastItalicIndex = content.lastIndexOf('*');
            if (content.length - lastItalicIndex < 20) {
                content = content.substring(0, lastItalicIndex) + content.substring(lastItalicIndex + 1);
            }
        }
        
        // 处理代码标记
        const codeCount = (content.match(/`/g) || []).length;
        if (codeCount % 2 === 1) {
            const lastCodeIndex = content.lastIndexOf('`');
            if (content.length - lastCodeIndex < 20) {
                content = content.substring(0, lastCodeIndex) + content.substring(lastCodeIndex + 1);
            }
        }
        
        // 处理标题标记 # ## ### 等（转换为加粗文本）
        // 行首的 # 标记转为加粗
        content = content.replace(/^#{1,6}\s+(.+)$/gm, '**$1**');
        
        // HTML转义
        let html = escapeHtml(content);
        
        // 应用格式化
        html = html.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
        html = html.replace(/`([^`]+?)`/g, '<code class="inline-code">$1</code>');
        
        // 处理换行
        html = html.replace(/\n/g, '<br>');
        
        return html;
    } catch (error) {
        return escapeHtml(text);
    }
}

/**
 * 无缝完成流式消息 - 完全无感知过渡
 * @param {string} text - 最终完整的消息内容
 */
function finalizeStreamingMessage(text) {
    try {
        const loadingMessage = document.getElementById('loadingMessage');
        if (!loadingMessage) {
            addAIMessage(text);
            return;
        }
        
        const messageText = loadingMessage.querySelector('.message-text');
        if (!messageText) {
            addAIMessage(text);
            return;
        }

        // 立即移除流式样式（停止光标闪烁）
        messageText.classList.remove('streaming');
        
        // 使用相同的格式化函数，确保内容一致
        const formattedHtml = formatStreamingContent(text);
        
        // 直接更新内容（已经是相同格式，不会有视觉变化）
        messageText.innerHTML = formattedHtml;
        
        // 移除loadingMessage的ID
        loadingMessage.removeAttribute('id');
        loadingMessage.classList.remove('loading');
        
        // 重置状态
        streamFormatter.resetState();
        lastStreamContent = '';
        // column-reverse 布局自动保持底部可见
        
    } catch (error) {
        console.error('完成流式消息出错:', error);
        removeLoadingMessage();
        addAIMessage(text);
    }
}

function addErrorMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ai-message';
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(15px)';

    messageDiv.innerHTML = `
        <div class="message-avatar">⚠️</div>
        <div class="message-content">
            <div class="message-text" style="color: #dc2626;">${escapeHtml(text)}</div>
        </div>
    `;

    addMessageWithSmoothTransition(messageDiv);
}

function removeLoadingMessage() {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        // 移除流式样式类
        const messageText = loadingMessage.querySelector('.message-text');
        if (messageText) {
            messageText.classList.remove('streaming');
        }
        
        loadingMessage.style.opacity = '0';
        loadingMessage.style.transform = 'translateY(-20px)';
        loadingMessage.style.transition = 'all 0.3s ease-out';

        setTimeout(() => {
            if (loadingMessage.parentNode) {
                loadingMessage.parentNode.removeChild(loadingMessage);
            }
            // 重置格式化器状态和缓存
            streamFormatter.resetState();
            lastStreamContent = '';
        }, 300);
    }
}

function resetInputState() {
    chatInput.disabled = false;
    sendBtn.disabled = false;
    chatInput.focus();
    isProcessing = false;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 格式化AI响应（用于最终完成的消息）
 * @param {string} text - 原始文本
 * @returns {string} - 格式化后的HTML
 */
function formatAIResponse(text) {
    try {
        // 使用流式格式化器进行最终格式化
        // 确保清理任何残留的不完整标记
        let cleaned = text;
        
        // 移除连续多余的星号
        cleaned = cleaned.replace(/\*{3,}/g, '**');
        
        // 清理不成对的标记
        cleaned = cleanUnpairedMarkers(cleaned, '**');
        cleaned = cleanUnpairedMarkers(cleaned, '*');
        cleaned = cleanUnpairedMarkers(cleaned, '`');
        
        let formatted = escapeHtml(cleaned);

        // 处理加粗
        formatted = formatted.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
        
        // 处理斜体（避免与加粗冲突）
        formatted = formatted.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
        
        // 处理行内代码
        formatted = formatted.replace(/`([^`]+?)`/g, '<code class="inline-code">$1</code>');

        // 处理换行
        formatted = formatted.replace(/\n/g, '<br>');

        // 处理段落：按双换行分割，过滤空段落，每个段落包装在<p>标签中
        const paragraphs = formatted.split(/<br><br>+/).filter(p => p.trim() !== '');
        formatted = paragraphs.map(p => `<p class="ai-paragraph">${p}</p>`).join('');

        return formatted;
    } catch (error) {
        console.warn('格式化AI响应出错:', error);
        return escapeHtml(text);
    }
}

/**
 * 清理不成对的Markdown标记
 * @param {string} text - 文本
 * @param {string} marker - 标记符号
 * @returns {string} - 清理后的文本
 */
function cleanUnpairedMarkers(text, marker) {
    try {
        const escapedMarker = marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedMarker, 'g');
        const matches = text.match(regex);
        
        if (!matches || matches.length % 2 === 0) return text;
        
        // 找到并移除最后一个孤立的标记
        const lastIndex = text.lastIndexOf(marker);
        return text.substring(0, lastIndex) + text.substring(lastIndex + marker.length);
    } catch (error) {
        return text;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initAIChat();
});

// ========== 工具函数 ==========

function updateWindowHeight() {
    if (!chatMessages) return;
    
    const root = document.documentElement;
    const windowHeight = window.innerHeight;
    const isMobile = window.innerWidth <= 768;
    
    root.style.setProperty('--window-height', windowHeight + 'px');
    root.style.setProperty('--is-mobile', isMobile.toString());
    
    const maxHeightRatio = parseFloat(getComputedStyle(chatMessages).getPropertyValue('--chat-max-height-ratio')) || 0.7;
    const maxHeight = windowHeight * maxHeightRatio;
    
    chatMessages.style.maxHeight = maxHeight + 'px';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== AI聊天窗口滚动控制 ==========

/**
 * 初始化AI聊天窗口的滚动控制
 * 下滑（向下滚动）：优先滚动页面，页面到底部后再滚动聊天区域
 * 上滑（向上滚动）：优先滚动聊天区域消息查看历史，聊天到顶部后再滚动页面
 */
function initChatScrollControl() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    // 状态管理
    let isPageScrolling = false;
    let restoreTimeout = null;

    // 恢复聊天区域滚动
    function restoreChatScroll() {
        if (restoreTimeout) {
            clearTimeout(restoreTimeout);
            restoreTimeout = null;
        }
        chatMessages.style.overflowY = 'auto';
        isPageScrolling = false;
    }

    // 设置页面滚动模式
    function setPageScrollMode() {
        if (!isPageScrolling) {
            isPageScrolling = true;
            chatMessages.style.overflowY = 'hidden';
        }
        // 清除之前的恢复定时器
        if (restoreTimeout) {
            clearTimeout(restoreTimeout);
        }
        // 延迟恢复，给用户足够时间完成滚动
        restoreTimeout = setTimeout(restoreChatScroll, 150);
    }

    // 监听滚轮事件
    chatMessages.addEventListener('wheel', (e) => {
        const scrollHeight = chatMessages.scrollHeight;
        const clientHeight = chatMessages.clientHeight;
        const isScrollable = scrollHeight > clientHeight;

        // 如果聊天消息不够无法滚动，直接允许页面滚动
        if (!isScrollable) {
            return;
        }

        // 检查页面滚动状态
        const pageScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const pageScrollHeight = document.documentElement.scrollHeight;
        const pageClientHeight = window.innerHeight;
        const isPageAtBottom = (pageScrollTop + pageClientHeight) >= pageScrollHeight - 1;
        const isPageAtTop = pageScrollTop <= 1;

        // 检查聊天区域滚动状态
        const isChatAtTop = chatMessages.scrollTop <= 1;
        const isChatAtBottom = (chatMessages.scrollTop + clientHeight) >= scrollHeight - 1;

        // 向下滚动（下滑）
        if (e.deltaY > 0) {
            if (!isPageAtBottom) {
                // 页面未到底部，优先滚动页面
                setPageScrollMode();
            } else {
                // 页面已到底部，允许聊天区域滚动
                if (isPageScrolling) {
                    restoreChatScroll();
                }
            }
        }
        // 向上滚动（上滑）
        else {
            if (!isChatAtTop) {
                // 聊天区域未到顶部，优先滚动聊天区域查看历史消息
                if (isPageScrolling) {
                    restoreChatScroll();
                }
            } else {
                // 聊天区域已到顶部，滚动页面
                setPageScrollMode();
            }
        }
    }, { passive: false });
}


// ========== 头像更换功能 ==========

// 头像存储键名
const AVATAR_STORAGE_KEY = 'wdenglish_user_avatar';
const AI_AVATAR_STORAGE_KEY = 'wdenglish_ai_avatar';

// 高级功能存储键名和默认值
const AI_NAME_STORAGE_KEY = 'wdenglish_ai_name';
const AI_MODEL_STORAGE_KEY = 'wdenglish_ai_model';
const AI_SYSTEM_PROMPT_STORAGE_KEY = 'wdenglish_ai_system_prompt';

const DEFAULT_AI_NAME = 'AI英语助手';
const DEFAULT_AI_MODEL = 'deepseek-v3.2';
const DEFAULT_SYSTEM_PROMPT = '你是一个专业的英语学习助手，擅长解答英语语法、词汇、翻译等问题，帮助学生提高英语水平。';

// 当前正在编辑的头像类型（'user' 或 'ai'）
let currentEditingAvatarType = null;

// 模态窗口元素
const avatarModal = document.getElementById('avatarModal');
const avatarPreviewImg = document.getElementById('avatarPreviewImg');
const avatarUpload = document.getElementById('avatarUpload');
const closeAvatarModalBtn = document.getElementById('closeAvatarModal');
const cancelAvatarBtn = document.getElementById('cancelAvatarBtn');
const confirmAvatarBtn = document.getElementById('confirmAvatarBtn');
const resetAvatarBtn = document.getElementById('resetAvatarBtn');
const avatarPreview = document.querySelector('.avatar-preview');

// 临时存储上传的头像数据
let tempAvatarData = null;

// 初始化头像功能
function initAvatarFeature() {
    // 加载保存的头像
    loadAvatars();
    
    // 为用户头像和AI头像添加点击事件
    setupAvatarClickEvents();
    
    // 设置模态窗口事件
    setupModalEvents();
    
    // 初始化高级功能
    initAdvancedFeatures();
    
    // 应用高级功能设置
    applyAdvancedSettings();
}

// 设置头像点击事件
function setupAvatarClickEvents() {
    // 使用事件委托，为动态添加的头像添加点击事件
    const chatMessages = document.getElementById('chatMessages');
    
    chatMessages.addEventListener('click', function(e) {
        const userAvatar = e.target.closest('.user-message .message-avatar');
        const aiAvatar = e.target.closest('.ai-message .message-avatar');
        
        if (userAvatar) {
            openAvatarModal('user', userAvatar);
        } else if (aiAvatar) {
            openAvatarModal('ai', aiAvatar);
        }
    });
}

// 打开头像模态窗口
function openAvatarModal(type, avatarElement) {
    currentEditingAvatarType = type;
    tempAvatarData = null;
    
    // 根据类型显示或隐藏预设头像区域
    const presetsSection = document.querySelector('.avatar-presets-section');
    const resetAvatarBtn = document.getElementById('resetAvatarBtn');
    const advancedSection = document.querySelector('.avatar-advanced-section');
    
    if (type === 'user') {
        presetsSection.style.display = 'block';
        resetAvatarBtn.style.display = 'none';
        advancedSection.style.display = 'none';
    } else if (type === 'ai') {
        presetsSection.style.display = 'none';
        resetAvatarBtn.style.display = 'inline-flex';
        advancedSection.style.display = 'block';
    }
    
    // 根据类型设置默认显示
    const avatarPreviewDefault = document.getElementById('avatarPreviewDefault');
    if (type === 'user') {
        avatarPreviewDefault.textContent = '👤';
        avatarPreviewDefault.style.display = 'block';
        avatarPreviewImg.style.display = 'none';
    } else if (type === 'ai') {
        avatarPreviewDefault.style.display = 'none';
        avatarPreviewImg.src = '史迪仔.png';
        avatarPreviewImg.style.display = 'block';
        avatarPreview.classList.add('has-image');
    }
    
    // 获取当前头像数据
    const currentImg = avatarElement.querySelector('img');
    if (currentImg && currentImg.src && currentImg.src !== window.location.href) {
        avatarPreviewImg.src = currentImg.src;
        avatarPreview.classList.add('has-image');
        avatarPreviewDefault.style.display = 'none';
        avatarPreviewImg.style.display = 'block';
    }
    
    // 显示模态窗口
    avatarModal.classList.add('active');
    
    // 如果是AI头像，确认按钮始终启用（因为可以只修改高级功能设置）
    // 如果是用户头像，需要选择头像后才能启用
    if (type === 'ai') {
        confirmAvatarBtn.disabled = false;
    } else {
        confirmAvatarBtn.disabled = true;
    }
    
    // 如果是AI头像，重新加载高级功能设置
    if (type === 'ai') {
        loadAdvancedSettings();
    }
    
    // 阻止模态窗口内的键盘事件冒泡到外层
    const modalContent = document.querySelector('.avatar-modal-content');
    const blockKeyboardEvents = (e) => {
        e.stopPropagation();
    };
    modalContent.addEventListener('keydown', blockKeyboardEvents, true);
    modalContent.addEventListener('keyup', blockKeyboardEvents, true);
    modalContent.addEventListener('keypress', blockKeyboardEvents, true);
    
    // 保存事件监听器引用，以便后续移除
    modalContent._keyboardBlockers = blockKeyboardEvents;
    
    // 设置标志变量，阻止document级别的键盘事件
    isAvatarModalOpen = true;
    
    // 禁用body滚动
    document.body.style.overflow = 'hidden';
}

// 关闭头像模态窗口
function closeAvatarModal() {
    avatarModal.classList.remove('active');
    currentEditingAvatarType = null;
    tempAvatarData = null;
    
    // 重置标志变量
    isAvatarModalOpen = false;
    
    // 恢复body滚动
    document.body.style.overflow = '';
    
    // 移除键盘事件监听器
    const modalContent = document.querySelector('.avatar-modal-content');
    if (modalContent && modalContent._keyboardBlockers) {
        modalContent.removeEventListener('keydown', modalContent._keyboardBlockers, true);
        modalContent.removeEventListener('keyup', modalContent._keyboardBlockers, true);
        modalContent.removeEventListener('keypress', modalContent._keyboardBlockers, true);
        delete modalContent._keyboardBlockers;
    }
    
    // 重置预览状态
    avatarPreviewImg.src = '';
    avatarPreview.classList.remove('has-image');
    
    // 重置文件输入
    avatarUpload.value = '';
    
    // 重置预设头像的选中状态
    const avatarPresets = document.querySelectorAll('.avatar-preset');
    avatarPresets.forEach(p => p.classList.remove('selected'));
    
    // 收起高级功能区域
    const advancedToggle = document.getElementById('advancedToggle');
    const advancedContent = document.getElementById('advancedContent');
    if (advancedToggle) {
        advancedToggle.classList.remove('active');
    }
    if (advancedContent) {
        advancedContent.classList.remove('active');
    }
}

// 设置模态窗口事件
function setupModalEvents() {
    // 关闭按钮
    closeAvatarModalBtn.addEventListener('click', closeAvatarModal);
    cancelAvatarBtn.addEventListener('click', closeAvatarModal);
    
    // 点击遮罩层关闭
    const overlay = document.querySelector('.avatar-modal-overlay');
    overlay.addEventListener('click', closeAvatarModal);
    
    // 预设头像点击事件
    const avatarPresets = document.querySelectorAll('.avatar-preset');
    avatarPresets.forEach(preset => {
        preset.addEventListener('click', function() {
            // 移除其他预设的选中状态
            avatarPresets.forEach(p => p.classList.remove('selected'));
            // 添加当前预设的选中状态
            this.classList.add('selected');
            
            // 获取预设头像路径
            const avatarPath = this.getAttribute('data-avatar');
            
            // 显示预览
            avatarPreviewImg.src = avatarPath;
            avatarPreview.classList.add('has-image');
            
            // 临时存储预设头像数据
            tempAvatarData = avatarPath;
            
            // 启用确认按钮
            confirmAvatarBtn.disabled = false;
        });
    });
    
    // 文件上传
    avatarUpload.addEventListener('change', handleAvatarUpload);
    
    // 重置按钮
    const resetAvatarBtn = document.getElementById('resetAvatarBtn');
    resetAvatarBtn.addEventListener('click', function() {
        // 恢复成默认头像
        tempAvatarData = '史迪仔.png';
        avatarPreviewImg.src = '史迪仔.png';
        avatarPreview.classList.add('has-image');
        
        // 移除预设头像的选中状态
        const avatarPresets = document.querySelectorAll('.avatar-preset');
        avatarPresets.forEach(p => p.classList.remove('selected'));
        
        // 重置高级功能设置
        resetAdvancedSettings();
        
        // 启用确认按钮
        confirmAvatarBtn.disabled = false;
    });
    
    // 确认更换
    confirmAvatarBtn.addEventListener('click', confirmAvatarChange);
    
    // 高级功能折叠/展开
    const advancedToggle = document.getElementById('advancedToggle');
    const advancedContent = document.getElementById('advancedContent');
    advancedToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        advancedContent.classList.toggle('active');
    });
}

// 处理头像上传
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        alert('请选择 JPG、PNG、GIF 或 WebP 格式的图片');
        return;
    }
    
    // 验证文件大小（最大2MB）
    if (file.size > 2 * 1024 * 1024) {
        alert('图片大小不能超过 2MB');
        return;
    }
    
    // 移除预设头像的选中状态
    const avatarPresets = document.querySelectorAll('.avatar-preset');
    avatarPresets.forEach(p => p.classList.remove('selected'));
    
    // 读取图片文件
    const reader = new FileReader();
    reader.onload = function(event) {
        tempAvatarData = event.target.result;
        
        // 显示预览
        avatarPreviewImg.src = tempAvatarData;
        avatarPreview.classList.add('has-image');
        
        // 启用确认按钮
        confirmAvatarBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

// 确认更换头像
function confirmAvatarChange() {
    let avatarChanged = false;
    
    // 如果是AI头像，即使没有改变头像，也要保存高级功能设置
    if (currentEditingAvatarType === 'ai') {
        // 如果有头像数据，保存头像
        if (tempAvatarData) {
            avatarChanged = true;
            if (tempAvatarData === '史迪仔.png') {
                localStorage.removeItem(AI_AVATAR_STORAGE_KEY);
            } else {
                localStorage.setItem(AI_AVATAR_STORAGE_KEY, tempAvatarData);
            }
            updateAIAvatar(tempAvatarData);
        }
        
        // 保存高级功能设置（模型和系统提示词）
        saveAdvancedSettings();
        
        // 应用高级功能设置
        applyAdvancedSettings();
    } else if (currentEditingAvatarType === 'user' && tempAvatarData) {
        // 用户头像必须有头像数据才能保存
        avatarChanged = true;
        localStorage.setItem(AVATAR_STORAGE_KEY, tempAvatarData);
        updateUserAvatar(tempAvatarData);
    }
    
    // 关闭模态窗口
    closeAvatarModal();
    
    // 只有当头像真正改变时才显示成功提示
    if (avatarChanged) {
        showAvatarSuccessTip();
    }
}

// 更新所有用户头像
function updateUserAvatar(avatarData) {
    const userAvatars = document.querySelectorAll('.user-message .message-avatar');
    userAvatars.forEach(avatar => {
        // 清除原有的 emoji 文本
        avatar.textContent = '';
        
        let img = avatar.querySelector('img');
        if (!img) {
            img = document.createElement('img');
            img.alt = '用户头像';
            avatar.appendChild(img);
        }
        img.src = avatarData;
        avatar.classList.add('has-image');
        avatar.classList.add('clickable');
    });
}

// 更新所有AI头像
function updateAIAvatar(avatarData) {
    const aiAvatars = document.querySelectorAll('.ai-message .message-avatar');
    aiAvatars.forEach(avatar => {
        // 清除原有的 emoji 文本
        avatar.textContent = '';
        
        let img = avatar.querySelector('img');
        if (!img) {
            img = document.createElement('img');
            img.alt = 'AI头像';
            avatar.appendChild(img);
        }
        img.src = avatarData;
        avatar.classList.add('has-image');
        avatar.classList.add('clickable');
    });
}

// 加载保存的用户头像和AI头像
function loadAvatars() {
    const savedUserAvatar = localStorage.getItem(AVATAR_STORAGE_KEY);
    const savedAIAvatar = localStorage.getItem(AI_AVATAR_STORAGE_KEY);
    
    // 使用多次重试机制，确保在页面加载时正确应用保存的头像
    const applyAvatars = (retryCount = 0) => {
        if (retryCount > 5) return; // 最多重试5次
        
        const userAvatars = document.querySelectorAll('.user-message .message-avatar');
        const aiAvatars = document.querySelectorAll('.ai-message .message-avatar');
        
        if (userAvatars.length > 0 || aiAvatars.length > 0) {
            // 应用用户头像
            if (savedUserAvatar) {
                updateUserAvatar(savedUserAvatar);
            } else {
                userAvatars.forEach(avatar => {
                    avatar.classList.add('clickable');
                });
            }
            
            // 应用AI头像
            if (savedAIAvatar) {
                updateAIAvatar(savedAIAvatar);
            } else {
                aiAvatars.forEach(avatar => {
                    avatar.classList.add('clickable');
                    // 确保AI头像有默认图片
                    let img = avatar.querySelector('img');
                    if (!img) {
                        img = document.createElement('img');
                        img.alt = 'AI头像';
                        avatar.appendChild(img);
                    }
                    img.src = '史迪仔.png';
                    avatar.classList.add('has-image');
                });
            }
        } else {
            // 如果还没有消息，延迟重试
            setTimeout(() => applyAvatars(retryCount + 1), 200);
        }
    };
    
    // 开始应用头像
    setTimeout(() => applyAvatars(), 100);
}

// 显示头像更换成功提示
function showAvatarSuccessTip() {
    const tip = document.createElement('div');
    tip.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-30px);
        opacity: 0;
        background: linear-gradient(135deg, #d4edda, #c3e6cb);
        color: #155724;
        padding: 12px 24px;
        border-radius: 20px;
        box-shadow: 6px 6px 12px #b8bec8, -6px -6px 12px #ffffff;
        font-weight: 600;
        z-index: 10001;
        transition: all 0.3s ease-out;
    `;
    tip.textContent = '✓ 头像更换成功！';
    
    document.body.appendChild(tip);
    
    // 使用requestAnimationFrame确保元素已经添加到DOM
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            tip.style.transform = 'translateX(-50%) translateY(0)';
            tip.style.opacity = '1';
        });
    });
    
    // 2秒后移除提示
    setTimeout(() => {
        tip.style.transform = 'translateX(-50%) translateY(-30px)';
        tip.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(tip);
        }, 300);
    }, 2000);
}

// ========== 高级功能函数 ==========

// 初始化高级功能
function initAdvancedFeatures() {
    // 加载保存的设置
    loadAdvancedSettings();
}

// 加载高级功能设置
function loadAdvancedSettings() {
    const aiNameInput = document.getElementById('aiNameInput');
    const modelSelect = document.getElementById('modelSelect');
    const systemPromptInput = document.getElementById('systemPromptInput');
    
    // 加载AI名称
    const savedName = localStorage.getItem(AI_NAME_STORAGE_KEY);
    aiNameInput.value = savedName || DEFAULT_AI_NAME;
    
    // 加载模型 - 优先使用localStorage中保存的值
    const savedModel = localStorage.getItem(AI_MODEL_STORAGE_KEY);
    if (savedModel) {
        modelSelect.value = savedModel;
    } else if (window.aiService && window.aiService.model) {
        // 如果localStorage中没有值，使用AI服务当前实际使用的模型
        modelSelect.value = window.aiService.model;
    } else {
        modelSelect.value = DEFAULT_AI_MODEL;
    }
    
    // 加载系统提示词
    const savedPrompt = localStorage.getItem(AI_SYSTEM_PROMPT_STORAGE_KEY);
    systemPromptInput.value = savedPrompt || DEFAULT_SYSTEM_PROMPT;
}

// 保存高级功能设置
function saveAdvancedSettings() {
    const aiNameInput = document.getElementById('aiNameInput');
    const modelSelect = document.getElementById('modelSelect');
    const systemPromptInput = document.getElementById('systemPromptInput');
    
    // 保存AI名称
    localStorage.setItem(AI_NAME_STORAGE_KEY, aiNameInput.value);
    
    // 保存模型
    localStorage.setItem(AI_MODEL_STORAGE_KEY, modelSelect.value);
    
    // 保存系统提示词
    localStorage.setItem(AI_SYSTEM_PROMPT_STORAGE_KEY, systemPromptInput.value);
    
    // 不再在这里应用设置，应用逻辑移到confirmAvatarChange中
}

// 应用高级功能设置到界面
function applyAdvancedSettings() {
    const aiName = localStorage.getItem(AI_NAME_STORAGE_KEY) || DEFAULT_AI_NAME;
    const aiModel = localStorage.getItem(AI_MODEL_STORAGE_KEY) || DEFAULT_AI_MODEL;
    const systemPrompt = localStorage.getItem(AI_SYSTEM_PROMPT_STORAGE_KEY) || DEFAULT_SYSTEM_PROMPT;
    
    // 更新AI名称显示
    const aiTitle = document.querySelector('.ai-chat-card .card-header h2');
    if (aiTitle) {
        const statusIndicator = aiTitle.querySelector('.ai-status-indicator');
        aiTitle.textContent = aiName;
        if (statusIndicator) {
            aiTitle.appendChild(statusIndicator);
        }
    }
    
    // 更新AI服务模型
    if (window.aiService) {
        window.aiService.model = aiModel;
        window.aiService.defaultMessages[0].content = systemPrompt;
    }
}

// 重置高级功能设置
function resetAdvancedSettings() {
    const aiNameInput = document.getElementById('aiNameInput');
    const modelSelect = document.getElementById('modelSelect');
    const systemPromptInput = document.getElementById('systemPromptInput');
    
    // 重置为默认值（只修改输入框的显示，不修改localStorage）
    aiNameInput.value = DEFAULT_AI_NAME;
    modelSelect.value = DEFAULT_AI_MODEL;
    systemPromptInput.value = DEFAULT_SYSTEM_PROMPT;
}

// 在页面加载完成后初始化头像功能
window.addEventListener('DOMContentLoaded', initAvatarFeature);
