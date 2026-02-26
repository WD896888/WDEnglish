// ========== 阅读填空模块 ==========

// ========== 状态管理 ==========
let currentReadingIndex = 0;
let readingUserAnswers = {};
const READING_PROGRESS_KEY = 'wdenglish_reading_progress';

// ========== DOM 元素 ==========
let readingContent, readingQuestionNumber, readingTotalQuestions;
let readingPrevBtn, readingCheckBtn, readingNextBtn;
let readingResult, readingExplanation;
let readingCard;

// ========== 初始化函数 ==========
function initReadingFill() {
    // 获取 DOM 元素
    readingContent = document.getElementById('readingContent');
    readingQuestionNumber = document.getElementById('readingQuestionNumber');
    readingTotalQuestions = document.getElementById('readingTotalQuestions');
    readingPrevBtn = document.getElementById('readingPrevBtn');
    readingCheckBtn = document.getElementById('readingCheckBtn');
    readingNextBtn = document.getElementById('readingNextBtn');
    readingResult = document.getElementById('readingResult');
    readingExplanation = document.getElementById('readingExplanation');
    readingCard = document.querySelector('.reading-card');
    
    // 检查元素是否存在
    if (!readingContent || !readingQuestionNumber || !readingTotalQuestions ||
        !readingPrevBtn || !readingCheckBtn || !readingNextBtn ||
        !readingResult || !readingExplanation || !readingCard) {
        console.error('阅读填空模块：缺少必要的 DOM 元素');
        return;
    }
    
    // 检查题库是否加载
    if (typeof readingQuestions === 'undefined' || !readingQuestions.length) {
        console.error('阅读填空模块：题库未加载或为空');
        return;
    }
    
    // 更新总题数
    readingTotalQuestions.textContent = readingQuestions.length;
    
    // 恢复进度
    loadReadingProgress();
    
    // 渲染当前题目
    renderReadingQuestion();
    
    // 绑定事件
    bindReadingEvents();
}

// ========== 渲染函数 ==========
function renderReadingQuestion() {
    const question = readingQuestions[currentReadingIndex];
    
    console.log('渲染阅读填空题目:', question);
    
    // 更新题号
    readingQuestionNumber.textContent = currentReadingIndex + 1;
    
    // 清空内容
    readingContent.innerHTML = '';
    readingResult.innerHTML = '';
    readingResult.className = 'result';
    readingExplanation.innerHTML = '';
    readingExplanation.className = 'explanation';
    
    // 重置用户答案
    readingUserAnswers = {};
    
    // 渲染文章段落（直接在背景上显示）
    const articleParagraphs = question.article.split(/\n\s*\n/).filter(p => p.trim());
    articleParagraphs.forEach(paragraph => {
        const paragraphEl = document.createElement('div');
        paragraphEl.className = 'reading-paragraph';
        paragraphEl.textContent = paragraph.trim();
        readingContent.appendChild(paragraphEl);
    });
    
    // 渲染摘要填空区标题（显示文章标题）
    const summaryTitle = document.createElement('div');
    summaryTitle.className = 'reading-summary-title';
    summaryTitle.textContent = question.title;
    readingContent.appendChild(summaryTitle);
    
    // 渲染问题
    question.questions.forEach((q) => {
        // 创建问题条目
        const questionItem = document.createElement('div');
        questionItem.className = 'reading-question-item';
        
        // 问题标签
        const labelEl = document.createElement('span');
        labelEl.className = 'reading-question-label';
        labelEl.textContent = q.label + ':';
        questionItem.appendChild(labelEl);
        
        // 问题文本容器
        const textContainer = document.createElement('span');
        textContainer.className = 'reading-question-text';
        
        // 解析填空（传入 blanks 数组）
        const parsedParts = parseReadingBlanks(q.text, q.blanks);
        
        parsedParts.forEach(part => {
            if (part.type === 'text') {
                const textEl = document.createElement('span');
                textEl.className = 'reading-text';
                textEl.textContent = part.content;
                textContainer.appendChild(textEl);
            } else if (part.type === 'blank') {
                const blankEl = createReadingBlankElement(part.blank);
                textContainer.appendChild(blankEl);
            }
        });
        
        questionItem.appendChild(textContainer);
        readingContent.appendChild(questionItem);
    });
    
    // 更新按钮状态
    updateReadingButtonStates();
    
    // 检查渲染的输入框数量
    const renderedInputs = readingContent.querySelectorAll('.reading-blank');
    console.log('渲染的输入框数量:', renderedInputs.length);
}

// ========== 解析函数 ==========
function parseReadingBlanks(text, blanks) {
    const parts = [];
    let lastIndex = 0;
    
    // 创建填空索引映射
    const blankMap = new Map();
    blanks.forEach(b => {
        blankMap.set(b.index, b.answer);
    });
    
    // 查找填空标记
    const blankPattern = /(\d+)\.\s*_{3,}/g;
    let match;
    
    while ((match = blankPattern.exec(text)) !== null) {
        const index = parseInt(match[1]);
        
        // 添加填空前的文本
        if (match.index > lastIndex) {
            parts.push({
                type: 'text',
                content: text.substring(lastIndex, match.index)
            });
        }
        
        // 添加填空（从 blankMap 中查找答案）
        parts.push({
            type: 'blank',
            blank: {
                index: index,
                answer: blankMap.get(index) || ''
            }
        });
        
        lastIndex = match.index + match[0].length;
    }
    
    // 添加剩余文本
    if (lastIndex < text.length) {
        parts.push({
            type: 'text',
            content: text.substring(lastIndex)
        });
    }
    
    return parts;
}

function createReadingBlankElement(blank) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'reading-blank';
    input.dataset.blankIndex = blank.index;
    input.dataset.answer = blank.answer;
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.disabled = false;
    input.readOnly = false;
    
    // 设置初始宽度
    input.style.width = '80px';
    
    // 输入事件
    input.addEventListener('input', (e) => {
        readingUserAnswers[blank.index] = e.target.value.trim();
        
        // 动态调整输入框宽度
        const value = e.target.value;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (context) {
            context.font = getComputedStyle(e.target).font;
            const textWidth = context.measureText(value).width;
            const newWidth = Math.max(80, Math.min(200, textWidth + 30));
            e.target.style.width = newWidth + 'px';
        }
    });
    
    // 回车键跳到下一个填空
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const allBlanks = Array.from(readingContent.querySelectorAll('.reading-blank'));
            const currentIndex = allBlanks.indexOf(input);
            if (currentIndex < allBlanks.length - 1) {
                allBlanks[currentIndex + 1].focus();
            }
        }
    });
    
    return input;
}

// ========== 事件处理 ==========
function bindReadingEvents() {
    readingPrevBtn.addEventListener('click', prevReadingQuestion);
    readingNextBtn.addEventListener('click', nextReadingQuestion);
    readingCheckBtn.addEventListener('click', checkReadingAnswer);
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        // 只在阅读填空卡片显示时响应
        if (!readingCard || readingCard.classList.contains('hidden')) return;
        
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            checkReadingAnswer();
        }
    });
    
    // mouseup 时处理划词翻译（拖动选择后触发）
    document.addEventListener('mouseup', (e) => {
        // 只在阅读填空卡片显示时响应
        if (!readingCard || readingCard.classList.contains('hidden')) return;
        
        const readingContentEl = document.getElementById('readingContent');
        if (!readingContentEl) return;
        
        // 检查点击位置是否在阅读填空区域内
        if (readingContentEl.contains(e.target)) {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            
            // 如果有选中文本，阻止迷你菜单并显示翻译
            if (selectedText) {
                e.preventDefault();
                
                // 获取选区位置并显示翻译
                try {
                    if (selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        const rect = range.getBoundingClientRect();
                        
                        if (rect.width > 0 && rect.height > 0) {
                            // 使用共享的翻译气泡框功能（来自 grammar-fill.js）
                            if (typeof showTranslationTooltip === 'function') {
                                showTranslationTooltip(rect, selectedText);
                            }
                        }
                    }
                } catch (err) {
                    console.error('获取选区失败:', err);
                }
            }
        }
    });
    
    // mousedown 时隐藏气泡框和清除选择
    document.addEventListener('mousedown', (e) => {
        const tooltip = document.getElementById('translationTooltip');
        
        // 如果点击在气泡框内，不关闭窗口也不清除选择
        if (tooltip && tooltip.contains(e.target)) {
            return;
        }
        
        // 如果点击的是拖拽条，不隐藏气泡框（让拖拽逻辑处理）
        if (e.target.classList && e.target.classList.contains('tooltip-drag-handle')) {
            return;
        }
        
        // 隐藏翻译气泡框
        hideTranslationTooltip();
        
        // 清除文本选择
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
        }
    });
    
    // 屏蔽阅读填空区域的右键菜单
    const readingContentEl = document.getElementById('readingContent');
    if (readingContentEl) {
        readingContentEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    }
}

function prevReadingQuestion() {
    if (currentReadingIndex > 0) {
        currentReadingIndex--;
        renderReadingQuestion();
        saveReadingProgress();
    }
}

function nextReadingQuestion() {
    if (currentReadingIndex < readingQuestions.length - 1) {
        currentReadingIndex++;
        renderReadingQuestion();
        saveReadingProgress();
    }
}

function checkReadingAnswer() {
    const question = readingQuestions[currentReadingIndex];
    
    // 收集所有唯一的填空（按编号去重）
    const uniqueBlanks = new Map();
    question.questions.forEach(q => {
        q.blanks.forEach(blank => {
            if (!uniqueBlanks.has(blank.index)) {
                uniqueBlanks.set(blank.index, {
                    index: blank.index,
                    answer: blank.answer
                });
            }
        });
    });
    
    const blanks = Array.from(uniqueBlanks.values());
    let correctCount = 0;
    
    // 检查每个填空
    blanks.forEach(blank => {
        const input = readingContent.querySelector(`.reading-blank[data-blank-index="${blank.index}"]`);
        const userAnswer = readingUserAnswers[blank.index] || '';
        
        if (!userAnswer) {
            input.classList.add('incorrect');
            input.classList.remove('correct');
            return;
        }
        
        const correctAnswers = blank.answer.split('/').map(ans => ans.trim().toLowerCase());
        const userAnswerLower = userAnswer.toLowerCase();
        
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
    if (correctCount === blanks.length) {
        readingResult.textContent = `✨ 恭喜！全部正确！`;
        readingResult.className = 'result correct';
    } else {
        readingResult.textContent = `❌ 答对了 ${correctCount}/${blanks.length} 个空`;
        readingResult.className = 'result incorrect';
    }
    
    // 格式化答案列表
    const answersHtml = formatReadingAnswers(blanks);
    const formattedExplanation = formatReadingExplanation(question.explanation);
    readingExplanation.innerHTML = answersHtml + '<br>' + formattedExplanation;
    readingExplanation.classList.add('visible');
    
    saveReadingProgress();
}

// 格式化解析内容
function formatReadingExplanation(explanation) {
    return explanation
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
}

// 格式化答案列表
function formatReadingAnswers(blanks) {
    let html = '<div class="reading-answers-list">';
    
    blanks.forEach((blank) => {
        html += `<span class="reading-answer-item">${blank.index}. ${blank.answer}</span>`;
    });
    
    html += '</div>';
    return html;
}

function updateReadingButtonStates() {
    readingPrevBtn.disabled = currentReadingIndex === 0;
    readingNextBtn.disabled = currentReadingIndex === readingQuestions.length - 1;
    
    if (readingPrevBtn.disabled) {
        readingPrevBtn.classList.add('disabled');
    } else {
        readingPrevBtn.classList.remove('disabled');
    }
    
    if (readingNextBtn.disabled) {
        readingNextBtn.classList.add('disabled');
    } else {
        readingNextBtn.classList.remove('disabled');
    }
}

// ========== 进度管理 ==========
function saveReadingProgress() {
    try {
        const progressData = {
            currentReadingIndex: currentReadingIndex,
            timestamp: Date.now()
        };
        localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(progressData));
    } catch (error) {
        console.error('保存阅读填空进度失败:', error);
    }
}

function loadReadingProgress() {
    try {
        const savedProgress = localStorage.getItem(READING_PROGRESS_KEY);
        if (savedProgress) {
            const progressData = JSON.parse(savedProgress);
            if (progressData.currentReadingIndex !== undefined && 
                progressData.currentReadingIndex >= 0 && 
                progressData.currentReadingIndex < readingQuestions.length) {
                currentReadingIndex = progressData.currentReadingIndex;
                return true;
            }
        }
    } catch (error) {
        console.error('恢复阅读填空进度失败:', error);
    }
    return false;
}

// ========== 划词翻译功能 ==========
function handleReadingTextSelection(e) {
    if (!readingCard || readingCard.classList.contains('hidden')) return;
    
    const tooltip = document.getElementById('translationTooltip');
    if (tooltip && tooltip.contains(e.target)) {
        return;
    }
    if (e.target.classList && e.target.classList.contains('tooltip-drag-handle')) {
        return;
    }
    
    const selection = window.getSelection();
    let selectedText = '';
    try {
        selectedText = selection.toString().trim();
    } catch (e) {
        return;
    }
    
    if (!selectedText || selectedText.length < 1) {
        hideTranslationTooltip();
        return;
    }
    
    let range;
    try {
        if (selection.rangeCount === 0) return;
        range = selection.getRangeAt(0);
    } catch (e) {
        return;
    }
    
    const readingContentEl = document.getElementById('readingContent');
    if (!readingContentEl || !range.commonAncestorContainer) {
        hideTranslationTooltip();
        return;
    }
    
    if (!readingContentEl.contains(range.commonAncestorContainer)) {
        hideTranslationTooltip();
        return;
    }
    
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
        return;
    }
    
    // 使用共享的翻译气泡框功能（来自 grammar-fill.js）
    if (typeof showTranslationTooltip === 'function') {
        showTranslationTooltip(rect, selectedText);
    }
}

// ========== 工具函数 ==========
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', initReadingFill);