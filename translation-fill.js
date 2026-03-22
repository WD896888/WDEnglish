// ========== 翻译填空状态管理 ==========
let currentTranslationGroup = 0;
let translationAnswers = {}; // 存储用户答案
let translationChecked = false; // 当前组是否已检查

// ========== 进度管理常量 ==========
const TRANSLATION_PROGRESS_KEY = 'wdenglish_translation_progress';

// ========== 初始化翻译填空 ==========
function initTranslationFill() {
    // 隐藏翻译气泡框（如果有）
    if (typeof hideTranslationTooltip === 'function') {
        hideTranslationTooltip();
    }
    
    // 恢复进度
    const progressRestored = loadTranslationProgress();
    if (progressRestored) {
        console.log('翻译填空进度已恢复到第', currentTranslationGroup + 1, '组');
    }
    
    renderTranslationQuestion();
    bindTranslationEvents();
    updateTranslationProgress();
    
    // 初始化题号点击跳转功能
    initTranslationQuestionJump();
}

// ========== 渲染翻译填空题目 ==========
function renderTranslationQuestion() {
    const container = document.getElementById('translationContent');
    if (!container) return;

    const group = translationQuestions[currentTranslationGroup];
    let html = '';

    // 渲染每道题
    group.questions.forEach((q, index) => {
        const savedAnswer = translationAnswers[`${currentTranslationGroup}-${index}`] || '';
        
        html += `
            <p class="translation-paragraph">
                <span class="translation-sentence">
                    ${q.english.replace('（ ）', `<input type="text" class="translation-blank" data-index="${index}" value="${savedAnswer}" autocomplete="off" style="width: 80px">`)}
                    <span class="translation-hint">(${q.hint})</span>
                </span>
                <span class="translation-chinese-text">${q.chinese}</span>
            </p>
        `;
    });

    container.innerHTML = html;
    translationChecked = false;
}

// ========== 更新进度显示 ==========
function updateTranslationProgress() {
    const currentEl = document.getElementById('translationQuestionNumberInput');
    const totalEl = document.getElementById('translationTotalQuestions');
    
    if (currentEl) {
        currentEl.value = currentTranslationGroup + 1;
        adjustTranslationInputWidth(currentEl);
    }
    if (totalEl) totalEl.textContent = translationQuestions.length;
}

// 动态调整输入框宽度
function adjustTranslationInputWidth(input) {
    const value = input.value || '0';
    const digitCount = value.toString().length;
    const width = Math.max(1, digitCount * 0.6 + 0.2);
    input.style.width = width + 'em';
}

// ========== 题号点击跳转功能 ==========
function initTranslationQuestionJump() {
    // 检查是否已经初始化过
    const existingInput = document.getElementById('translationQuestionNumberInput');
    if (existingInput) return;
    
    const currentEl = document.getElementById('translationQuestionNumber');
    if (!currentEl || !currentEl.parentNode) return;
    
    // 创建可编辑的题号输入框
    const input = document.createElement('input');
    input.type = 'number';
    input.id = 'translationQuestionNumberInput';
    input.className = 'question-number-input';
    input.value = currentTranslationGroup + 1;
    input.min = 1;
    input.max = translationQuestions.length;
    
    // 替换原来的题号 span
    currentEl.replaceWith(input);
    
    // 初始调整宽度
    adjustTranslationInputWidth(input);
    
    // 输入框事件处理
    input.addEventListener('keydown', (e) => {
        // 阻止所有键盘事件冒泡，防止触发其他快捷键
        e.stopPropagation();
        if (e.key === 'Enter') {
            e.preventDefault();
            handleJump();
            input.blur();
        }
    });
    
    input.addEventListener('blur', () => {
        handleJump();
    });
    
    // 阻止输入框点击事件冒泡
    input.addEventListener('click', (e) => {
        e.stopPropagation();
        input.select();
    });
    
    // 输入时动态调整宽度
    input.addEventListener('input', () => {
        adjustTranslationInputWidth(input);
    });
    
    // 跳转处理函数
    function handleJump() {
        const targetNum = parseInt(input.value);
        if (targetNum >= 1 && targetNum <= translationQuestions.length && targetNum !== currentTranslationGroup + 1) {
            clearCurrentGroupAnswers();
            currentTranslationGroup = targetNum - 1;
            renderTranslationQuestion();
            updateTranslationProgress();
            clearTranslationResult();
            saveTranslationProgress();
        } else {
            // 恢复正确的题号
            input.value = currentTranslationGroup + 1;
            adjustTranslationInputWidth(input);
        }
    }
}

// ========== 绑定事件 ==========
function bindTranslationEvents() {
    // 检查答案按钮 - 只需要绑定一次，使用once选项避免重复绑定
    const checkBtn = document.getElementById('translationCheckBtn');
    if (checkBtn && !checkBtn._eventBound) {
        checkBtn._eventBound = true;
        checkBtn.addEventListener('click', () => checkTranslationAnswers(true));
    }
    
    // 输入框事件委托 - 每次渲染后需要重新绑定
    const container = document.getElementById('translationContent');
    if (container) {
        // 移除旧的事件监听器（如果存在）
        container.removeEventListener('input', handleTranslationInput);
        container.removeEventListener('keydown', handleTranslationKeydown);
        
        // 添加新的事件监听器
        container.addEventListener('input', handleTranslationInput);
        container.addEventListener('keydown', handleTranslationKeydown);
    }
}

// 输入框输入事件处理
function handleTranslationInput(e) {
    if (e.target.classList.contains('translation-blank')) {
        const index = e.target.dataset.index;
        translationAnswers[`${currentTranslationGroup}-${index}`] = e.target.value;
        
        // 如果已经检查过，清除样式
        if (translationChecked) {
            e.target.classList.remove('correct', 'incorrect');
        }
        
        // 动态调整输入框宽度（自适应伸缩功能）
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
        }
    }
}

// 输入框键盘事件处理
function handleTranslationKeydown(e) {
    if (e.target.classList.contains('translation-blank') && e.key === 'Enter') {
        const container = document.getElementById('translationContent');
        if (!container) return;
        const inputs = container.querySelectorAll('.translation-blank');
        const currentIndex = Array.from(inputs).indexOf(e.target);
        if (currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        }
    }
}

// ========== 检查答案 ==========
function checkTranslationAnswers(showFeedback = true) {
    const group = translationQuestions[currentTranslationGroup];
    const inputs = document.querySelectorAll('.translation-blank');
    let correct = 0;
    let total = group.questions.length;

    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim().toLowerCase();
        // 支持多答案：用 / 分隔，用户填入任意一个都算正确
        const correctAnswers = group.questions[index].answer.split('/').map(ans => ans.trim().toLowerCase());
        
        if (correctAnswers.includes(userAnswer)) {
            correct++;
            input.classList.add('correct');
            input.classList.remove('incorrect');
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });

    translationChecked = true;
    translationAnswers.checked = true;

    if (showFeedback) {
        showTranslationResult(correct, total);
        showTranslationAnswers(group);
    }
}

// ========== 显示结果 ==========
function showTranslationResult(correct, total) {
    const resultEl = document.getElementById('translationResult');
    if (!resultEl) return;

    const percentage = Math.round((correct / total) * 100);
    let message = '';
    let emoji = '';
    let resultClass = '';

    if (percentage === 100) {
        message = '太棒了！全对！';
        emoji = '🎉';
        resultClass = 'correct';
    } else if (percentage >= 80) {
        message = '做得很好！';
        emoji = '👍';
        resultClass = 'incorrect';
    } else if (percentage >= 60) {
        message = '继续加油！';
        emoji = '💪';
        resultClass = 'incorrect';
    } else {
        message = '再接再厉！';
        emoji = '📚';
        resultClass = 'incorrect';
    }

    resultEl.innerHTML = `
        <span class="result-emoji">${emoji}</span>
        <span class="result-text">${message} 答对 ${correct}/${total} 题 (${percentage}%)</span>
    `;
    resultEl.className = `result show ${resultClass}`;
}

// ========== 格式化解析内容 ==========
function formatTranslationExplanation(explanation) {
    // 将换行符转换为 <br> 标签
    // 连续两个换行符转换为 <br><br>（段落分隔）
    return explanation
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
}

// ========== 格式化答案列表 ==========
function formatTranslationAnswers(questions) {
    let html = '<div class="answers-list">';
    
    questions.forEach((q, index) => {
        html += `<span class="answer-item">${index + 1}. ${q.answer}</span>`;
    });
    
    html += '</div>';
    return html;
}

// ========== 显示正确答案 ==========
function showTranslationAnswers(group) {
    const explanationEl = document.getElementById('translationExplanation');
    if (!explanationEl) return;

    // 格式化答案列表
    const answersHtml = formatTranslationAnswers(group.questions);
    
    // 优先使用组级别的 explanation（统一存放的解析）
    let fullExplanation = group.explanation || '';
    
    // 如果没有组级别的 explanation，则合并每道题的解析（兼容旧数据）
    if (!fullExplanation) {
        group.questions.forEach((q, index) => {
            if (q.explanation) {
                if (index > 0) fullExplanation += '\n\n';
                fullExplanation += q.explanation;
            }
        });
    }
    
    // 添加整体总结
    if (group.summary) {
        fullExplanation += '\n\n' + group.summary;
    }
    
    // 格式化解析内容
    const formattedExplanation = formatTranslationExplanation(fullExplanation);
    
    // 合并显示答案和解析（和语法填空一样的样式）
    explanationEl.innerHTML = answersHtml + '<br>' + formattedExplanation;
    explanationEl.className = 'explanation visible';
}

// ========== 清除结果 ==========
function clearTranslationResult() {
    const resultEl = document.getElementById('translationResult');
    const explanationEl = document.getElementById('translationExplanation');
    
    if (resultEl) {
        resultEl.innerHTML = '';
        resultEl.className = 'result';
    }
    
    if (explanationEl) {
        explanationEl.innerHTML = '';
        explanationEl.className = 'explanation';
    }
    
    // 清除所有输入框的样式
    const inputs = document.querySelectorAll('.translation-blank');
    inputs.forEach(input => {
        input.classList.remove('correct', 'incorrect');
    });
    
    // 重置检查状态
    translationChecked = false;
}

// ========== 清空当前组的答案 ==========
function clearCurrentGroupAnswers() {
    const group = translationQuestions[currentTranslationGroup];
    if (group) {
        group.questions.forEach((_, index) => {
            delete translationAnswers[`${currentTranslationGroup}-${index}`];
        });
    }
}

// ========== 菜单切换时初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
    // 监听菜单切换
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // 翻译填空是第2个菜单（索引2），在语法填空之后
            if (index === 2) {
                initTranslationFill();
            }
        });
    });

    // ===== 上一题/下一题按钮事件绑定（只绑定一次）=====
    const prevBtn = document.getElementById('translationPrevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearCurrentGroupAnswers();
            currentTranslationGroup = (currentTranslationGroup - 1 + translationQuestions.length) % translationQuestions.length;
            renderTranslationQuestion();
            updateTranslationProgress();
            clearTranslationResult();
            saveTranslationProgress();
        });
    }

    const nextBtn = document.getElementById('translationNextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearCurrentGroupAnswers();
            currentTranslationGroup = (currentTranslationGroup + 1) % translationQuestions.length;
            renderTranslationQuestion();
            updateTranslationProgress();
            clearTranslationResult();
            saveTranslationProgress();
        });
    }

    // ===== 划词翻译事件绑定（只绑定一次）=====
    if (typeof handleTextSelection === 'function') {
        document.addEventListener('click', handleTextSelectionForTranslation);
    }

    // mousedown 时立即隐藏气泡框和清除选择
    document.addEventListener('mousedown', handleTranslationMouseDown);

    // 阻止翻译填空区域内的选中文本弹出迷你菜单
    document.addEventListener('mouseup', handleTranslationMouseUp);

    // 屏蔽翻译填空区域的右键菜单
    const translationContentEl = document.getElementById('translationContent');
    if (translationContentEl) {
        translationContentEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    }
});

// 划词翻译文本选择事件处理
function handleTextSelectionForTranslation(e) {
    // 只在翻译填空卡片显示时响应
    const translationCard = document.querySelector('.translation-card');
    if (!translationCard || translationCard.classList.contains('hidden')) return;

    // 如果点击的是气泡框或拖拽条，不处理（避免干扰拖拽）
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
    } catch (err) {
        return;
    }

    // 如果没有选中文本，隐藏气泡框
    if (!selectedText || selectedText.length < 1) {
        if (typeof hideTranslationTooltip === 'function') {
            hideTranslationTooltip();
        }
        return;
    }

    // 检查选区是否在翻译填空区域内
    let range;
    try {
        if (selection.rangeCount === 0) return;
        range = selection.getRangeAt(0);
    } catch (err) {
        return;
    }

    const translationContentEl = document.getElementById('translationContent');
    if (!translationContentEl || !range.commonAncestorContainer) {
        if (typeof hideTranslationTooltip === 'function') {
            hideTranslationTooltip();
        }
        return;
    }

    // 检查选区是否在翻译填空区域内
    if (!translationContentEl.contains(range.commonAncestorContainer)) {
        if (typeof hideTranslationTooltip === 'function') {
            hideTranslationTooltip();
        }
        return;
    }

    // 获取选中文本的位置（支持跨行选择）
    const rect = getSelectionBoundingRect(range);

    // 如果选区没有有效尺寸，不显示
    if (!rect) {
        return;
    }

    // 立即显示翻译（无延迟）
    if (typeof showTranslationTooltip === 'function') {
        if (typeof isTranslating !== 'undefined' && !isTranslating) {
            showTranslationTooltip(rect, selectedText);
        }
    }
}

/**
 * 获取选区的边界矩形（支持跨行选择）
 * @param {Range} range - 选区对象
 * @returns {Object|null} 边界矩形对象或 null
 */
function getSelectionBoundingRect(range) {
    const rects = range.getClientRects();
    
    if (rects.length === 0) {
        const boundingRect = range.getBoundingClientRect();
        if (boundingRect.width > 0 || boundingRect.height > 0) {
            return boundingRect;
        }
        return null;
    }
    
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;
    
    for (let i = 0; i < rects.length; i++) {
        const r = rects[i];
        if (r.width === 0 && r.height === 0) continue;
        
        minX = Math.min(minX, r.left);
        minY = Math.min(minY, r.top);
        maxX = Math.max(maxX, r.right);
        maxY = Math.max(maxY, r.bottom);
    }
    
    if (minX === Infinity) {
        return null;
    }
    
    return {
        left: minX,
        top: minY,
        right: maxX,
        bottom: maxY,
        width: maxX - minX,
        height: maxY - minY
    };
}

// mousedown 事件处理
function handleTranslationMouseDown(e) {
    const translationCard = document.querySelector('.translation-card');
    if (!translationCard || translationCard.classList.contains('hidden')) return;

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
    if (typeof hideTranslationTooltip === 'function') {
        hideTranslationTooltip();
    }

    // 立即清除文本选择
    const selection = window.getSelection();
    if (selection) {
        selection.removeAllRanges();
    }
}

// mouseup 事件处理
function handleTranslationMouseUp(e) {
    const translationCard = document.querySelector('.translation-card');
    if (!translationCard || translationCard.classList.contains('hidden')) return;

    const translationContentEl = document.getElementById('translationContent');
    if (!translationContentEl) return;

    // 检查点击位置是否在翻译填空区域内
    if (translationContentEl.contains(e.target)) {
        const selection = window.getSelection();
        if (selection.toString().trim()) {
            e.preventDefault();
        }
    }
}

// ========== 辅助函数 ==========
/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
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

// ========== 进度管理 ==========
/**
 * 保存翻译填空进度到本地存储
 */
function saveTranslationProgress() {
    try {
        const progressData = {
            currentTranslationGroup: currentTranslationGroup,
            timestamp: Date.now()
        };
        localStorage.setItem(TRANSLATION_PROGRESS_KEY, JSON.stringify(progressData));
    } catch (error) {
        console.error('保存翻译填空进度失败:', error);
    }
}

/**
 * 从本地存储加载翻译填空进度
 * @returns {boolean} 是否成功加载进度
 */
function loadTranslationProgress() {
    try {
        const savedProgress = localStorage.getItem(TRANSLATION_PROGRESS_KEY);
        if (savedProgress) {
            const progressData = JSON.parse(savedProgress);
            if (progressData.currentTranslationGroup !== undefined &&
                progressData.currentTranslationGroup >= 0 &&
                progressData.currentTranslationGroup < translationQuestions.length) {
                currentTranslationGroup = progressData.currentTranslationGroup;
                return true;
            }
        }
    } catch (error) {
        console.error('恢复翻译填空进度失败:', error);
    }
    return false;
}
