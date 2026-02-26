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

    // 文本选择事件监听 - 直接调用，无延迟
    document.addEventListener('click', handleTextSelection);
    
    // mousedown 时立即隐藏气泡框和清除选择
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
        
        // 立即隐藏翻译窗口
        hideTranslationTooltip();
        
        // 立即清除文本选择（无论点击哪里）
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
        }
    });

    // 阻止语法填空区域内的选中文本弹出迷你菜单（通过阻止mouseup默认行为）
    document.addEventListener('mouseup', (e) => {
        // 只在语法填空卡片显示时响应
        if (!grammarCard || grammarCard.classList.contains('hidden')) return;

        const grammarContentEl = document.getElementById('grammarContent');
        if (!grammarContentEl) return;

        // 检查点击位置是否在语法填空区域内
        if (grammarContentEl.contains(e.target)) {
            const selection = window.getSelection();
            // 只有当有选中文本时才阻止默认行为，防止迷你菜单弹出
            if (selection.toString().trim()) {
                e.preventDefault();
            }
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
    
    // 检查每个填空
    blanks.forEach(blank => {
        const input = grammarContent.querySelector(`.grammar-blank[data-blank-index="${blank.index}"]`);
        const userAnswer = userAnswers[blank.index] || '';
        
        if (!userAnswer) {
            input.classList.add('incorrect');
            input.classList.remove('correct');
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
    
        if (correctCount === blanks.length) {
    
            grammarResult.textContent = `✨ 恭喜！全部正确！`;
    
            grammarResult.className = 'result correct';
    
        } else {
    
            grammarResult.textContent = `❌ 答对了 ${correctCount}/${blanks.length} 个空`;
    
            grammarResult.className = 'result incorrect';
    
        }
    
    
    
        // 格式化答案列表
    
        const answersHtml = formatAnswers(blanks);
    
        // 格式化解析内容：保留换行和段落格式
    
        const formattedExplanation = formatExplanation(question.explanation);
    
        grammarExplanation.innerHTML = answersHtml + '<br>' + formattedExplanation;
    
        grammarExplanation.classList.add('visible');
    
        saveGrammarProgress();
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
    let html = '<div class="answers-list">';

    blanks.forEach((blank, index) => {
        html += `<span class="answer-item">${blank.index}. ${blank.answer}</span>`;
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
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
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

// 翻译状态跟踪
let isTranslating = false;
let translationTimeout = null;

/**
 * 处理文本选择事件
 */
function handleTextSelection(e) {
    // 只在语法填空卡片显示时响应
    if (!grammarCard || grammarCard.classList.contains('hidden')) return;

    // 如果点击的是气泡框或拖拽条，不处理（避免干扰拖拽）
    const tooltip = document.getElementById('translationTooltip');
    if (tooltip && tooltip.contains(e.target)) {
        return;
    }
    if (e.target.classList && e.target.classList.contains('tooltip-drag-handle')) {
        return;
    }

    const selection = window.getSelection();
    
    // 安全获取选中文本
    let selectedText = '';
    try {
        selectedText = selection.toString().trim();
    } catch (e) {
        return;
    }

    // 如果没有选中文本，隐藏气泡框
    if (!selectedText) {
        hideTranslationTooltip();
        return;
    }

    // 如果选中的文本太短，不显示气泡框
    if (selectedText.length < 1) {
        hideTranslationTooltip();
        return;
    }

    // 使用完整选中文本进行翻译
    let textToTranslate = selectedText;

    // 检查选中的文本是否在语法填空内容区域内
    let range;
    try {
        if (selection.rangeCount === 0) return;
        range = selection.getRangeAt(0);
    } catch (e) {
        return;
    }
    
    const grammarContentEl = document.getElementById('grammarContent');
    if (!grammarContentEl || !range.commonAncestorContainer) {
        hideTranslationTooltip();
        return;
    }
    
    // 检查鼠标按下后是否还有有效选择（mousedown 可能已经清除）
    // 如果 mousedown 时清除了选择，这里的选择应该是空的
    if (!selectedText) {
        hideTranslationTooltip();
        return;
    }
    
    // 检查选区是否在语法填空区域内
    if (!grammarContentEl.contains(range.commonAncestorContainer)) {
        hideTranslationTooltip();
        return;
    }

    // 获取选中文本的位置
    const rect = range.getBoundingClientRect();
    
    // 如果选区没有有效尺寸，不显示
    if (rect.width === 0 && rect.height === 0) {
        return;
    }
    
    // 立即显示翻译气泡，无延迟
    if (!isTranslating) {
        showTranslationTooltip(rect, textToTranslate);
    }
}

/**
 * 显示翻译气泡框
 * @param {DOMRect} rect - 选中文本的位置信息
 * @param {string} text - 选中的文本
 */
async function showTranslationTooltip(rect, text) {
    // 如果正在翻译中，直接返回，避免重复请求
    if (isTranslating) {
        return;
    }
    
    // 设置翻译状态
    isTranslating = true;
    
    let translationHTML = '';
    
    // 等待翻译完成
    try {
        const translation = await translateText(text);
        
        // 按段落分割译文
        const translatedParagraphs = translation.split('\n').filter(p => p.trim());
        
        // 生成译文区域
        translationHTML = translatedParagraphs.map(p => 
            `<div class="tooltip-para">${escapeHtml(p)}</div>`
        ).join('');
    } catch (error) {
        console.error('翻译失败:', error);
        translationHTML = `<div class="tooltip-error">翻译失败: ${escapeHtml(error.message || '请稍后重试')}</div>`;
    }
    
    // 获取或创建气泡框
    let tooltip = document.getElementById('translationTooltip');
    if (!tooltip) {
        tooltip = createTranslationTooltip();
        document.body.appendChild(tooltip);
    }

    // 清除之前拖拽留下的样式
    tooltip.style.minWidth = '';
    tooltip.style.transform = '';
    tooltip.style.willChange = 'auto';

    // 查找或创建内容容器
    let contentContainer = tooltip.querySelector('.tooltip-content-container');
    if (!contentContainer) {
        contentContainer = document.createElement('div');
        contentContainer.className = 'tooltip-content-container';
        tooltip.appendChild(contentContainer);
    }

    // 生成原文区域
    const originalParagraphs = text.split('\n').filter(p => p.trim());
    const originalHTML = originalParagraphs.map(p => 
        `<div class="tooltip-para">${escapeHtml(p)}</div>`
    ).join('');
    
    // 显示原文和译文（翻译已完成）
    contentContainer.innerHTML = `
        <div class="tooltip-content">
            <div class="tooltip-original-section">${originalHTML}</div>
            <div class="tooltip-translation-section">${translationHTML}</div>
        </div>
    `;
    
    // 先显示气泡框以获取实际尺寸
    tooltip.style.display = 'block';
    tooltip.style.left = '0';
    tooltip.style.top = '0';

    // 等待DOM更新后获取实际尺寸
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    // 获取气泡框实际尺寸
    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;
    
    // 重新计算位置（使用实际尺寸）
    const arrowSize = 10;
    const offsetTop = 15;
    const padding = 10;

    // 计算水平位置（居中显示）
    let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    
    // 边界检查：防止超出左边界
    if (left < padding) {
        left = padding;
    }
    
    // 边界检查：防止超出右边界
    if (left + tooltipWidth > window.innerWidth - padding) {
        left = window.innerWidth - tooltipWidth - padding;
    }

    // 计算垂直位置（显示在选中内容上方）
    let top = rect.top - tooltipHeight - arrowSize - offsetTop;
    
    // 边界检查：如果上方空间不足，显示在下方
    if (top < padding) {
        top = rect.bottom + arrowSize + offsetTop;
        // 再次检查下方是否超出屏幕
        if (top + tooltipHeight > window.innerHeight - padding) {
            // 如果下方也超出，放在屏幕底部
            top = window.innerHeight - tooltipHeight - padding;
        }
        tooltip.classList.add('tooltip-bottom');
    } else {
        tooltip.classList.remove('tooltip-bottom');
    }

    // 设置位置
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    
    // 重置翻译状态
    isTranslating = false;
}

/**
 * 隐藏翻译气泡框
 */
function hideTranslationTooltip() {
    const tooltip = document.getElementById('translationTooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
        // 移除拖拽标记，下次显示时重新计算默认位置
        tooltip.classList.remove('tooltip-dragged');
    }
    
    // 重置翻译状态
    isTranslating = false;
    
    // 清除定时器
    if (translationTimeout) {
        clearTimeout(translationTimeout);
        translationTimeout = null;
    }
    
    // 清除内容容器的内容（保留拖拽条）
    if (tooltip) {
        const contentContainer = tooltip.querySelector('.tooltip-content-container');
        if (contentContainer) {
            contentContainer.innerHTML = '';
        }
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
    
    // 创建拖拽条
    const dragHandle = document.createElement('div');
    dragHandle.className = 'tooltip-drag-handle';
    dragHandle.title = '长按拖动移动位置';
    tooltip.appendChild(dragHandle);
    
    // 创建内容容器
    const contentContainer = document.createElement('div');
    contentContainer.className = 'tooltip-content-container';
    tooltip.appendChild(contentContainer);
    
    // 添加拖拽功能
    setupTooltipDrag(tooltip, dragHandle);
    
    return tooltip;
}

/**
 * 设置翻译气泡框的拖拽功能
 * @param {HTMLElement} tooltip - 气泡框元素
 * @param {HTMLElement} dragHandle - 拖拽条元素
 */
function setupTooltipDrag(tooltip, dragHandle) {
    let isDragging = false;
    let startX, startY;
    let initialLeft, initialTop;
    let tooltipWidth = 0;
    let tooltipHeight = 0;
    let rafId = null;
    let pendingX = 0;
    let pendingY = 0;
    let lastValidLeft = 0;  // 记录经过边界限制后的实际位置
    let lastValidTop = 0;
    
    // 开始拖拽（立即触发）
    const startDrag = (e) => {
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        startX = clientX;
        startY = clientY;
        
        // 获取当前位置
        const computedStyle = window.getComputedStyle(tooltip);
        initialLeft = parseInt(computedStyle.left) || tooltip.offsetLeft;
        initialTop = parseInt(computedStyle.top) || tooltip.offsetTop;
        
        // 初始化lastValid位置
        lastValidLeft = initialLeft;
        lastValidTop = initialTop;
        
        // 缓存尺寸，避免频繁重排
        const rect = tooltip.getBoundingClientRect();
        tooltipWidth = rect.width;
        tooltipHeight = rect.height;
        
        // 使用 min-width 固定宽度，防止靠近边界时文字重排
        tooltip.style.minWidth = tooltipWidth + 'px';
        
        // 启用 GPU 加速
        tooltip.style.willChange = 'transform';
        
        isDragging = true;
        tooltip.classList.add('tooltip-dragging');
        
        // 阻止默认行为和冒泡
        e.preventDefault();
        e.stopPropagation();
    };
    
    // 使用 requestAnimationFrame 更新位置
    const updatePosition = () => {
        if (!isDragging) return;
        
        // 边界检查
        const maxLeft = window.innerWidth - tooltipWidth;
        const maxTop = window.innerHeight - tooltipHeight;
        
        const newLeft = Math.max(10, Math.min(pendingX, maxLeft - 10));
        const newTop = Math.max(10, Math.min(pendingY, maxTop - 10));
        
        // 记录经过边界限制后的实际位置
        lastValidLeft = newLeft;
        lastValidTop = newTop;
        
        // 使用 transform 代替 left/top，性能更好
        tooltip.style.transform = `translate(${newLeft - initialLeft}px, ${newTop - initialTop}px)`;
    };
    
    // 移动拖拽
    const doDrag = (e) => {
        if (!isDragging) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        pendingX = initialLeft + (clientX - startX);
        pendingY = initialTop + (clientY - startY);
        
        // 使用 requestAnimationFrame 批量更新
        if (!rafId) {
            rafId = requestAnimationFrame(() => {
                updatePosition();
                rafId = null;
            });
        }
    };
    
    // 结束拖拽
    const endDrag = (e) => {
        if (!isDragging) return;
        
        isDragging = false;
        tooltip.classList.remove('tooltip-dragging');
        tooltip.classList.add('tooltip-dragged');
        
        // 取消未完成的动画帧
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        
        // 使用记录的经过边界限制后的实际位置
        const currentLeft = lastValidLeft;
        const currentTop = lastValidTop;
        
        // 恢复样式设置
        tooltip.style.willChange = 'auto';
        tooltip.style.transform = '';
        tooltip.style.left = currentLeft + 'px';
        tooltip.style.top = currentTop + 'px';
        tooltip.style.minWidth = '';
        
        // 阻止事件冒泡
        e.preventDefault();
        e.stopPropagation();
    };
    
    // 鼠标事件
    dragHandle.addEventListener('mousedown', startDrag, { passive: false });
    document.addEventListener('mousemove', doDrag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    
    // 触摸事件（移动端支持）
    dragHandle.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', doDrag, { passive: false });
    document.addEventListener('touchend', endDrag);
    
    // 防止拖拽条触发选中文本
    dragHandle.addEventListener('selectstart', (e) => e.preventDefault());
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