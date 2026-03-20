// ========== 阅读理解模块 ==========

// ========== 状态管理 ==========
let currentRCIndex = 0;
let rcUserAnswers = {};
const RC_PROGRESS_KEY = 'wdenglish_rc_progress';
const RC_SETTINGS_KEY = 'wdenglish_rc_settings_v3';

// ========== AI判题配置 ==========
const DEFAULT_RC_SETTINGS = {
    models: ['GLM', 'DeepSeek', 'Kimi', 'Qwen', 'MiniMax'],
    systemPrompt: `你是湖北省专升本英语考试的专业阅卷老师，请根据提供的阅读文章和问题，对考生的答案进行评分。

【评分标准】
- 2分：答案完全正确，语义完整准确，关键信息齐全
- 1分：答案部分正确，理解方向对但表达不完整或有小错误
- 0分：答案错误、不相关或完全偏离题意

【返回格式】
请严格按照以下JSON格式返回评分结果，只返回JSON，不要其他内容：
{"scores": [分数1, 分数2, ...]}

注意：
1. scores数组的长度必须等于需要评分的题目数量
2. 按题目顺序依次给出分数
3. 每道题分数为0、1或2分`,
    debugMode: false
};

let rcSettings = { ...DEFAULT_RC_SETTINGS };

// 存储各AI的详细评分结果（用于调试模式）
let rcDebugScores = null;

// ========== DOM 元素 ==========
let rcContent, rcQuestionNumber, rcTotalQuestions;
let rcPrevBtn, rcCheckBtn, rcNextBtn;
let rcResult, rcExplanation;
let rcCard;
let rcSettingsBtn, rcSettingsModal;

// ========== AI服务配置映射 ==========
const MODEL_CONFIG = {
    'GLM': {
        service: 'qwen',
        model: 'glm-4.7'
    },
    'Kimi': {
        service: 'qwen',
        model: 'kimi-k2-thinking'
    },
    'Qwen': {
        service: 'qwen',
        model: 'qwen3-max'
    },
    'MiniMax': {
        service: 'qwen',
        model: 'MiniMax-M2.1'
    },
    'DeepSeek': {
        service: 'qwen',
        model: 'deepseek-v3.1'
    }
};

// ========== 初始化函数 ==========
function initReadingComprehension() {
    // 获取 DOM 元素
    rcContent = document.getElementById('rcContent');
    rcQuestionNumber = document.getElementById('rcQuestionNumber');
    rcTotalQuestions = document.getElementById('rcTotalQuestions');
    rcPrevBtn = document.getElementById('rcPrevBtn');
    rcCheckBtn = document.getElementById('rcCheckBtn');
    rcNextBtn = document.getElementById('rcNextBtn');
    rcResult = document.getElementById('rcResult');
    rcExplanation = document.getElementById('rcExplanation');
    rcCard = document.querySelector('.rc-card');
    rcSettingsBtn = document.getElementById('rcSettingsBtn');
    rcSettingsModal = document.getElementById('rcSettingsModal');
    
    // 检查元素是否存在
    if (!rcContent || !rcQuestionNumber || !rcTotalQuestions ||
        !rcPrevBtn || !rcCheckBtn || !rcNextBtn ||
        !rcResult || !rcExplanation || !rcCard) {
        console.error('阅读理解模块：缺少必要的 DOM 元素');
        return;
    }
    
    // 检查题库是否加载
    if (typeof readingComprehensionQuestions === 'undefined' || !readingComprehensionQuestions.length) {
        console.error('阅读理解模块：题库未加载或为空');
        return;
    }
    
    // 更新总题数
    rcTotalQuestions.textContent = readingComprehensionQuestions.length;
    
    // 加载设置
    loadRCSettings();
    
    // 恢复进度
    loadRCProgress();
    
    // 渲染当前题目
    renderRCQuestion();
    
    // 绑定事件
    bindRCEvents();
    
    // 绑定设置模态框事件
    bindRCSettingsEvents();
}

// ========== 渲染函数 ==========
function renderRCQuestion() {
    const question = readingComprehensionQuestions[currentRCIndex];
    
    console.log('渲染阅读理解题目:', question);
    
    // 更新题号
    rcQuestionNumber.textContent = currentRCIndex + 1;
    
    // 清空内容
    rcContent.innerHTML = '';
    rcResult.innerHTML = '';
    rcResult.className = 'result';
    rcExplanation.innerHTML = '';
    rcExplanation.className = 'explanation';
    
    // 重置用户答案
    rcUserAnswers = {};
    
    // 渲染文章段落
    const articleParagraphs = question.article.split(/\n\s*\n/).filter(p => p.trim());
    articleParagraphs.forEach(paragraph => {
        const paragraphEl = document.createElement('div');
        paragraphEl.className = 'rc-paragraph';
        paragraphEl.textContent = paragraph.trim();
        rcContent.appendChild(paragraphEl);
    });
    
    // 渲染问题
    question.questions.forEach((q, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'rc-question-item';
        questionItem.dataset.questionIndex = index;
        
        // 问题编号
        const numberEl = document.createElement('span');
        numberEl.className = 'rc-question-number';
        numberEl.textContent = (index + 1) + '.';
        questionItem.appendChild(numberEl);
        
        // 问题文本
        const textEl = document.createElement('span');
        textEl.className = 'rc-question-text';
        textEl.textContent = q.text;
        questionItem.appendChild(textEl);
        
        // 答案输入容器
        const answerContainer = document.createElement('div');
        answerContainer.className = 'rc-answer-container';
        
        // 判断是否为翻译题（有 reference 字段）
        const isTranslation = q.reference !== undefined;
        
        // 创建输入框（统一使用单行输入框）
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'rc-answer-input';
        input.dataset.questionIndex = index;
        input.dataset.isTranslation = isTranslation ? 'true' : 'false';
        if (!isTranslation) {
            input.dataset.answer = q.answer;
        }
        input.placeholder = '';
        input.autocomplete = 'off';
        input.spellcheck = false;
        
        // 设置初始宽度
        input.style.width = '480px';
        
        // 输入事件：保存答案 + 动态调整宽度
        input.addEventListener('input', (e) => {
            rcUserAnswers[index] = e.target.value.trim();
            
            // 动态调整输入框宽度（只有超过默认长度时才扩展）
            const value = e.target.value;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            if (context) {
                context.font = getComputedStyle(e.target).font;
                const textWidth = context.measureText(value).width;
                // 获取父容器宽度，最大延伸到容器的85%
                const containerWidth = e.target.parentElement.offsetWidth * 0.85;
                // 保持默认宽度480px，只有超过时才扩展
                const newWidth = Math.max(480, Math.min(containerWidth, textWidth + 30));
                e.target.style.width = newWidth + 'px';
            }
        });
        
        // 回车键跳到下一个问题
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const allInputs = Array.from(rcContent.querySelectorAll('.rc-answer-input'));
                const currentIndex = allInputs.indexOf(input);
                if (currentIndex < allInputs.length - 1) {
                    allInputs[currentIndex + 1].focus();
                }
            }
        });
        
        answerContainer.appendChild(input);
        
        // 分数显示区域（初始隐藏）
        const scoreDisplay = document.createElement('span');
        scoreDisplay.className = 'rc-score-display';
        scoreDisplay.style.display = 'none';
        answerContainer.appendChild(scoreDisplay);
        
        questionItem.appendChild(answerContainer);
        rcContent.appendChild(questionItem);
    });
    
    // 更新按钮状态
    updateRCButtonStates();
}

// ========== 事件处理 ==========
function bindRCEvents() {
    rcPrevBtn.addEventListener('click', prevRCQuestion);
    rcNextBtn.addEventListener('click', nextRCQuestion);
    rcCheckBtn.addEventListener('click', checkRCAnswer);
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        // 只在阅读理解卡片显示时响应
        if (!rcCard || rcCard.classList.contains('hidden')) return;
        
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            checkRCAnswer();
        }
    });
    
    // mouseup 时处理划词翻译
    document.addEventListener('mouseup', (e) => {
        // 只在阅读理解卡片显示时响应
        if (!rcCard || rcCard.classList.contains('hidden')) return;
        
        const rcContentEl = document.getElementById('rcContent');
        if (!rcContentEl) return;
        
        // 检查点击位置是否在阅读理解区域内
        if (rcContentEl.contains(e.target)) {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            
            // 如果有选中文本，显示翻译
            if (selectedText) {
                e.preventDefault();
                
                try {
                    if (selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        // 使用改进的方法获取跨行选区的边界矩形
                        const rect = getSelectionBoundingRect(range);
                        
                        // 只要选中文本不为空，就显示翻译气泡
                        if (rect) {
                            // 使用共享的翻译气泡框功能
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
    
    // 辅助函数：获取选区的边界矩形（支持跨行选择）
    function getSelectionBoundingRect(range) {
        const rects = range.getClientRects();
        
        if (rects.length === 0) {
            // 如果 getClientRects 返回空，尝试使用 getBoundingClientRect
            const boundingRect = range.getBoundingClientRect();
            if (boundingRect.width > 0 || boundingRect.height > 0) {
                return boundingRect;
            }
            return null;
        }
        
        // 合并所有行的矩形，计算整体边界
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        
        for (let i = 0; i < rects.length; i++) {
            const r = rects[i];
            // 忽略零尺寸的矩形（某些浏览器可能返回）
            if (r.width === 0 && r.height === 0) continue;
            
            minX = Math.min(minX, r.left);
            minY = Math.min(minY, r.top);
            maxX = Math.max(maxX, r.right);
            maxY = Math.max(maxY, r.bottom);
        }
        
        // 如果所有矩形都是零尺寸，返回 null
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
    
    // mousedown 时隐藏气泡框
    document.addEventListener('mousedown', (e) => {
        const tooltip = document.getElementById('translationTooltip');
        
        if (tooltip && tooltip.contains(e.target)) {
            return;
        }
        
        if (e.target.classList && e.target.classList.contains('tooltip-drag-handle')) {
            return;
        }
        
        hideTranslationTooltip();
        
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
        }
    });
    
    // 屏蔽阅读理解区域的右键菜单
    const rcContentEl = document.getElementById('rcContent');
    if (rcContentEl) {
        rcContentEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    }
}

// ========== AI判题设置事件绑定 ==========
function bindRCSettingsEvents() {
    const closeBtn = document.getElementById('closeRcSettingsModal');
    const cancelBtn = document.getElementById('cancelRcSettingsBtn');
    const confirmBtn = document.getElementById('confirmRcSettingsBtn');
    const resetBtn = document.getElementById('resetRcSettingsBtn');
    const overlay = rcSettingsModal.querySelector('.rc-settings-modal-overlay');
    
    // 打开设置模态框
    rcSettingsBtn.addEventListener('click', () => {
        openRCSettingsModal();
    });
    
    // 关闭模态框
    const closeModal = () => {
        rcSettingsModal.classList.remove('active');
    };
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // 保存设置
    confirmBtn.addEventListener('click', () => {
        saveRCSettingsFromModal();
        closeModal();
    });
    
    // 重置所有设置（包括模型选择和提示词）
    resetBtn.addEventListener('click', () => {
        rcSettings = { ...DEFAULT_RC_SETTINGS };
        updateRCSettingsModalUI();
    });
}

// 打开设置模态框并填充当前值
function openRCSettingsModal() {
    updateRCSettingsModalUI();
    rcSettingsModal.classList.add('active');
}

// 更新设置模态框UI
function updateRCSettingsModalUI() {
    // 更新模型复选框
    const checkboxes = rcSettingsModal.querySelectorAll('input[name="rcModel"]');
    checkboxes.forEach(cb => {
        cb.checked = rcSettings.models.includes(cb.value);
    });
    
    // 更新系统提示词
    const promptTextarea = document.getElementById('rcSystemPrompt');
    promptTextarea.value = rcSettings.systemPrompt;
    
    // 更新调试模式开关
    const debugToggle = document.getElementById('rcDebugMode');
    debugToggle.checked = rcSettings.debugMode || false;
}

// 从模态框保存设置
function saveRCSettingsFromModal() {
    // 获取选中的模型
    const checkboxes = rcSettingsModal.querySelectorAll('input[name="rcModel"]:checked');
    rcSettings.models = Array.from(checkboxes).map(cb => cb.value);
    
    // 获取系统提示词
    const promptTextarea = document.getElementById('rcSystemPrompt');
    rcSettings.systemPrompt = promptTextarea.value.trim() || DEFAULT_RC_SETTINGS.systemPrompt;
    
    // 获取调试模式开关状态
    const debugToggle = document.getElementById('rcDebugMode');
    rcSettings.debugMode = debugToggle.checked;
    
    // 保存到localStorage
    saveRCSettings();
}

// ========== 设置持久化 ==========
function saveRCSettings() {
    try {
        localStorage.setItem(RC_SETTINGS_KEY, JSON.stringify(rcSettings));
    } catch (error) {
        console.error('保存阅读理解设置失败:', error);
    }
}

function loadRCSettings() {
    try {
        const savedSettings = localStorage.getItem(RC_SETTINGS_KEY);
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            rcSettings = { ...DEFAULT_RC_SETTINGS, ...parsed };
            
            // 过滤掉无效的模型名称，只保留MODEL_CONFIG中存在的模型
            if (rcSettings.models && Array.isArray(rcSettings.models)) {
                rcSettings.models = rcSettings.models.filter(model => MODEL_CONFIG[model]);
                // 如果过滤后没有有效模型，使用默认模型
                if (rcSettings.models.length === 0) {
                    rcSettings.models = [...DEFAULT_RC_SETTINGS.models];
                }
            }
            
            // 如果systemPrompt为空或无效，使用默认提示词
            if (!rcSettings.systemPrompt || rcSettings.systemPrompt.trim() === '') {
                rcSettings.systemPrompt = DEFAULT_RC_SETTINGS.systemPrompt;
            }
        }
    } catch (error) {
        console.error('加载阅读理解设置失败:', error);
        rcSettings = { ...DEFAULT_RC_SETTINGS };
    }
}

// ========== 答案检查核心逻辑 ==========
async function checkRCAnswer() {
    const question = readingComprehensionQuestions[currentRCIndex];
    
    // 重置调试信息
    rcDebugScores = null;
    
    // 检查是否有任何答案
    const hasAnyAnswer = Object.values(rcUserAnswers).some(answer => answer && answer.trim());
    
    // 禁用检查按钮，显示加载状态
    rcCheckBtn.disabled = true;
    rcCheckBtn.textContent = '判题中...';
    
    // 如果没有任何答案，直接给所有题目判0分
    if (!hasAnyAnswer) {
        const finalScores = {};
        question.questions.forEach((q, index) => {
            finalScores[index] = 0;
        });
        
        // 显示结果
        displayRCResults(question, finalScores, {});
        
        rcResult.textContent = '得分：0分';
        rcResult.className = 'result incorrect';
        rcCheckBtn.disabled = false;
        rcCheckBtn.textContent = '检查答案';
        saveRCProgress();
        return;
    }
    
    // 显示AI判题加载指示器
    showGradingIndicator();
    
    // 第一阶段：精确匹配检查
    const exactMatchResults = {};
    const needsAIGrading = [];
    let exactMatchCount = 0;
    let totalCount = 0;
    
    question.questions.forEach((q, index) => {
        const isTranslation = q.reference !== undefined;
        const userAnswer = (rcUserAnswers[index] || '').trim();
        
        totalCount++;
        
        if (!userAnswer) {
            // 空答案直接判0分，立即更新显示状态
            const inputEl = rcContent.querySelector(`input[data-question-index="${index}"]`);
            const scoreDisplay = inputEl.parentElement.querySelector('.rc-score-display');
            
            // 更新输入框样式为红色
            inputEl.classList.remove('correct', 'incorrect', 'score-partial', 'score-zero');
            inputEl.classList.add('score-zero');
            
            // 显示错误图标
            scoreDisplay.style.display = 'inline-flex';
            scoreDisplay.className = 'rc-score-display score-zero';
            scoreDisplay.innerHTML = '❌';
            
            // 标记为0分，不加入AI判题
            exactMatchResults[index] = 0;
            return;
        }
        
        // 获取标准答案
        const standardAnswer = isTranslation ? q.reference : q.answer;
        
        // 精确匹配检查（对理解题和翻译题都适用）
        const normalizedUserAnswer = userAnswer.toLowerCase().trim();
        const normalizedCorrectAnswer = (standardAnswer || '').toLowerCase().trim();
        
        if (normalizedUserAnswer === normalizedCorrectAnswer) {
            exactMatchResults[index] = 2; // 满分
            exactMatchCount++;
        } else {
            needsAIGrading.push(index);
        }
    });
    
    // 第二阶段：AI判题
    let aiScores = {};
    
    if (needsAIGrading.length > 0 && rcSettings.models.length > 0) {
        try {
            aiScores = await performAIGrading(question, needsAIGrading, exactMatchResults);
        } catch (error) {
            console.error('AI判题失败:', error);
            hideGradingIndicator();
            rcResult.textContent = 'AI判题失败，请检查网络连接后重试';
            rcResult.className = 'result incorrect';
            rcCheckBtn.disabled = false;
            rcCheckBtn.textContent = '检查答案';
            return;
        }
    }
    
    // 合并结果并显示
    const finalScores = {};
    question.questions.forEach((q, index) => {
        if (exactMatchResults[index] !== undefined) {
            finalScores[index] = exactMatchResults[index];
        } else if (aiScores[index] !== undefined) {
            finalScores[index] = aiScores[index];
        } else {
            finalScores[index] = 0;
        }
    });
    
    // 隐藏加载指示器
    hideGradingIndicator();
    
    // 显示结果
    displayRCResults(question, finalScores, exactMatchResults);
    
    // 恢复按钮状态
    rcCheckBtn.disabled = false;
    rcCheckBtn.textContent = '检查答案';
    
    saveRCProgress();
}

// ========== AI判题执行 ==========
async function performAIGrading(question, needsAIGradingIndices, exactMatchResults) {
    const article = question.article;
    
    // 构建需要AI评分的题目信息（只包含未精确匹配的题目）
    const questionsInfo = needsAIGradingIndices.map(index => {
        const q = question.questions[index];
        const isTranslation = q.reference !== undefined;
        const userAnswer = rcUserAnswers[index] || '(未作答)';
        const standardAnswer = isTranslation ? (q.reference || '') : (q.answer || '');
        
        return {
            index: index + 1,  // 原始题目编号
            originalIndex: index,  // 原始题目索引（0-based）
            question: q.text,
            standardAnswer: standardAnswer,
            userAnswer: userAnswer,
            isTranslation: isTranslation
        };
    });
    
    // 构建prompt
    const prompt = buildAIGradingPrompt(article, questionsInfo, needsAIGradingIndices);
    
    // 并行调用多个AI模型，同时记录模型名称
    const aiPromises = rcSettings.models.map(modelKey => {
        return callAIService(modelKey, prompt, needsAIGradingIndices).then(scores => ({
            model: modelKey,
            scores: scores
        }));
    });
    
    try {
        const results = await Promise.allSettled(aiPromises);
        
        // 收集成功的AI分数和详细信息
        const successfulResults = results
            .filter(r => r.status === 'fulfilled' && r.value !== null && r.value.scores !== null)
            .map(r => r.value);
        
        if (successfulResults.length === 0) {
            throw new Error('所有AI判题请求失败');
        }
        
        // 存储调试信息
        if (rcSettings.debugMode) {
            rcDebugScores = {
                models: successfulResults.map(r => r.model),
                scoresByModel: {},
                scoresByQuestion: {}
            };
            
            // 按模型存储分数
            successfulResults.forEach(result => {
                rcDebugScores.scoresByModel[result.model] = result.scores;
            });
        }
        
        const successfulScores = successfulResults.map(r => r.scores);
        
        // 计算最终分数（少数服从多数优先，否则取平均分）
        const finalScores = {};
        needsAIGradingIndices.forEach((originalIndex, arrayIndex) => {
            const scores = successfulScores
                .map(s => s[arrayIndex])  // AI返回的分数按数组顺序对应needsAIGradingIndices
                .filter(s => s !== undefined && !isNaN(s));
            
            if (scores.length > 0) {
                // 统计各分数出现次数
                const scoreCounts = {};
                scores.forEach(score => {
                    scoreCounts[score] = (scoreCounts[score] || 0) + 1;
                });
                
                // 检查是否有3个或以上AI给出相同分数
                let majorityScore = null;
                for (const [score, count] of Object.entries(scoreCounts)) {
                    if (count >= 3) {
                        majorityScore = parseInt(score);
                        break;
                    }
                }
                
                if (majorityScore !== null) {
                    // 少数服从多数
                    finalScores[originalIndex] = majorityScore;
                } else {
                    // 无多数一致，取平均分
                    finalScores[originalIndex] = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
                }
                
                // 存储各题目各AI的分数（用于调试显示）
                if (rcSettings.debugMode) {
                    rcDebugScores.scoresByQuestion[originalIndex] = successfulResults.map(r => ({
                        model: r.model,
                        score: r.scores[arrayIndex] !== undefined ? r.scores[arrayIndex] : 0
                    }));
                }
            } else {
                finalScores[originalIndex] = 0;
            }
        });
        
        return finalScores;
    } catch (error) {
        console.error('AI判题过程出错:', error);
        throw error;
    }
}

// 构建AI判题提示词
function buildAIGradingPrompt(article, questionsInfo, needsAIGradingIndices) {
    // 只包含需要AI评分的题目
    const questionsToGrade = questionsInfo.filter(q => needsAIGradingIndices.includes(q.index - 1));
    
    let prompt = '';
    
    // 添加阅读文章
    if (article) {
        prompt += `【阅读文章】\n${article}\n\n`;
    }
    
    // 添加题目
    const questionsText = questionsToGrade.map(q => {
        return `题目${q.index}${q.isTranslation ? '(翻译题)' : ''}:
问题: ${q.question}
标准答案: ${q.standardAnswer}
用户答案: ${q.userAnswer}`;
    }).join('\n\n');
    
    prompt += `【需要评分的题目】\n${questionsText}`;
    
    return prompt;
}

// 调用AI服务
async function callAIService(modelKey, prompt, needsAIGradingIndices) {
    const config = MODEL_CONFIG[modelKey];
    if (!config) {
        console.error(`未知的模型: ${modelKey}`);
        return null;
    }
    
    try {
        let response;
        
        if (config.service === 'zhipu') {
            const service = new ZhipuAIService();
            response = await service.sendMessage(prompt, {
                temperature: 0.3,
                maxTokens: 500,
                customSystemPrompt: rcSettings.systemPrompt
            });
        } else {
            const service = new QwenAIService();
            service.setModel(config.model);
            response = await service.sendMessage(prompt, {
                temperature: 0.3,
                maxTokens: 500,
                customSystemPrompt: rcSettings.systemPrompt
            });
        }
        
        // 解析AI响应
        return parseAIScores(response, needsAIGradingIndices);
    } catch (error) {
        console.error(`调用 ${modelKey} 失败:`, error);
        return null;
    }
}

// 解析AI返回的分数
function parseAIScores(response, needsAIGradingIndices) {
    try {
        // 尝试提取JSON
        const jsonMatch = response.match(/\{[\s\S]*"scores"[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (Array.isArray(parsed.scores)) {
                const scores = {};
                // AI返回的分数按顺序对应needsAIGradingIndices中的题目
                parsed.scores.forEach((score, arrayIndex) => {
                    if (arrayIndex < needsAIGradingIndices.length) {
                        const originalIndex = needsAIGradingIndices[arrayIndex];
                        // 确保分数在0-2范围内
                        scores[arrayIndex] = Math.max(0, Math.min(2, Math.round(score)));
                    }
                });
                return scores;
            }
        }
        
        // 尝试提取数字数组
        const arrayMatch = response.match(/\[(\s*\d+\s*,?\s*)+\]/);
        if (arrayMatch) {
            const scoresArr = JSON.parse(arrayMatch[0]);
            const result = {};
            scoresArr.forEach((score, arrayIndex) => {
                if (arrayIndex < needsAIGradingIndices.length) {
                    result[arrayIndex] = Math.max(0, Math.min(2, Math.round(score)));
                }
            });
            return result;
        }
        
        console.error('无法解析AI响应:', response);
        return null;
    } catch (error) {
        console.error('解析AI分数失败:', error);
        return null;
    }
}

// ========== 显示结果 ==========
function displayRCResults(question, finalScores, exactMatchResults) {
    const answersList = [];
    let totalScore = 0;
    let maxScore = 0;
    
    // 更新每个题目的显示
    question.questions.forEach((q, index) => {
        const inputEl = rcContent.querySelector(`input[data-question-index="${index}"]`);
        const scoreDisplay = inputEl.parentElement.querySelector('.rc-score-display');
        const score = finalScores[index] || 0;
        const isTranslation = q.reference !== undefined;
        
        maxScore += 2;
        totalScore += score;
        
        // 收集答案
        if (isTranslation) {
            answersList.push({
                index: index + 1,
                answer: q.reference || ''
            });
        } else {
            answersList.push({
                index: index + 1,
                answer: q.answer
            });
        }
        
        // 更新输入框样式 - 清除所有状态类
        inputEl.classList.remove('correct', 'incorrect', 'score-partial', 'score-zero');
        
        // 更新分数显示
        scoreDisplay.style.display = 'inline-flex';
        scoreDisplay.className = 'rc-score-display';
        
        if (score === 2) {
            // 满分：绿色横线，显示 ✨2
            scoreDisplay.classList.add('score-full');
            scoreDisplay.innerHTML = '✨2 分';
            inputEl.classList.add('correct');
        } else if (score >= 1) {
            // 部分正确：保持原色横线，显示 ➕1
            scoreDisplay.classList.add('score-partial');
            scoreDisplay.innerHTML = '➕1 分';
            inputEl.classList.add('score-partial');
        } else {
            // 错误：红色横线，显示 ❌
            scoreDisplay.classList.add('score-zero');
            scoreDisplay.innerHTML = '❌';
            inputEl.classList.add('score-zero');
        }
    });
    
    // 显示总分
    if (totalScore === maxScore) {
        rcResult.textContent = `✨ 满分！${totalScore}分`;
        rcResult.className = 'result correct';
    } else if (totalScore >= maxScore * 0.6) {
        rcResult.textContent = `得分：${totalScore}分`;
        rcResult.className = 'result correct';
    } else {
        rcResult.textContent = `得分：${totalScore}分`;
        rcResult.className = 'result incorrect';
    }
    
    // 格式化答案列表并显示在解析区域
    const answersHtml = formatRCAnswers(answersList);
    const formattedExplanation = formatRCExplanation(question.explanation);
    
    // 如果开启调试模式，显示各AI评分详情
    let debugHtml = '';
    if (rcSettings.debugMode && rcDebugScores && rcDebugScores.scoresByQuestion) {
        debugHtml = buildDebugPanel(question.questions, finalScores, rcDebugScores);
    }
    
    rcExplanation.innerHTML = answersHtml + '<br>' + formattedExplanation + debugHtml;
    rcExplanation.classList.add('visible');
}

// 构建调试面板HTML
function buildDebugPanel(questions, finalScores, debugScores) {
    let html = '<div class="rc-debug-panel">';
    html += '<div class="rc-debug-title">🔍 AI评分详情</div>';
    
    questions.forEach((q, index) => {
        const finalScore = finalScores[index] !== undefined ? finalScores[index] : 0;
        const questionDebug = debugScores.scoresByQuestion[index];
        
        html += `<div class="rc-debug-question" style="margin-bottom: 12px;">`;
        html += `<div style="font-weight: 600; color: #4a6fa5; margin-bottom: 6px;">题目 ${index + 1}</div>`;
        html += '<div class="rc-debug-scores">';
        
        if (questionDebug && questionDebug.length > 0) {
            // AI评分的题目
            questionDebug.forEach(item => {
                html += `<div class="rc-debug-score-item">`;
                html += `<span class="rc-debug-model-name">${item.model}</span>`;
                html += `<span class="rc-debug-model-scores">`;
                html += `<span class="rc-debug-score-badge score-${item.score}">${item.score}分</span>`;
                html += `</span></div>`;
            });
        } else {
            // 精确匹配或空答案的题目
            html += `<div class="rc-debug-score-item">`;
            html += `<span class="rc-debug-model-name" style="font-style: italic; color: #7aa8d6;">`;
            html += finalScore === 2 ? '精确匹配满分' : '空答案';
            html += `</span>`;
            html += `<span class="rc-debug-model-scores">`;
            html += `<span class="rc-debug-score-badge score-${finalScore}">${finalScore}分</span>`;
            html += `</span></div>`;
        }
        
        html += '</div>';
        
        // 最终分数
        html += `<div class="rc-debug-final">`;
        html += `<span class="rc-debug-final-label">最终得分</span>`;
        html += `<span class="rc-debug-final-score">${finalScore}分</span>`;
        html += '</div>';
        html += '</div>';
    });
    
    html += '</div>';
    return html;
}

// 显示加载指示器
function showGradingIndicator() {
    // 移除已有的指示器
    const existing = document.getElementById('rcGradingIndicator');
    if (existing) existing.remove();
    
    // 禁用页面滚动
    document.body.classList.add('rc-loading-lock');
    
    const indicator = document.createElement('div');
    indicator.id = 'rcGradingIndicator';
    indicator.className = 'rc-grading-indicator';
    indicator.innerHTML = `
        <div class="container">
            <div class="gooey-wrapper">
                <div class="loader">
                    <span style="--i:1"></span>
                    <span style="--i:2"></span>
                    <span style="--i:3"></span>
                    <span style="--i:4"></span>
                    <span style="--i:5"></span>
                    <span style="--i:6"></span>
                    <span style="--i:7"></span>
                </div>
                <div class="pool"></div>
            </div>
            <div class="text">评分中<div>
        </div>
        <svg>
            <filter id="rc-gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10
                " />
            </filter>
        </svg>
    `;
    
    document.body.appendChild(indicator);
}

// 隐藏加载指示器
function hideGradingIndicator() {
    const indicator = document.getElementById('rcGradingIndicator');
    if (indicator) {
        indicator.remove();
    }
    // 恢复页面滚动
    document.body.classList.remove('rc-loading-lock');
}

function prevRCQuestion() {
    if (currentRCIndex > 0) {
        currentRCIndex--;
        renderRCQuestion();
        saveRCProgress();
    }
}

function nextRCQuestion() {
    if (currentRCIndex < readingComprehensionQuestions.length - 1) {
        currentRCIndex++;
        renderRCQuestion();
        saveRCProgress();
    }
}

// 格式化解析内容
function formatRCExplanation(explanation) {
    return explanation
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
}

// 格式化答案列表
function formatRCAnswers(answersList) {
    let html = '<div class="reading-answers-list">';
    
    answersList.forEach((item) => {
        // 判断是否为长答案（超过20个字符视为长答案，需要独占一行）
        const isLongAnswer = item.answer.length > 20;
        const longClass = isLongAnswer ? ' long-answer' : '';
        html += `<span class="reading-answer-item${longClass}">${item.index}. ${item.answer}</span>`;
    });
    
    html += '</div>';
    return html;
}

function updateRCButtonStates() {
    rcPrevBtn.disabled = currentRCIndex === 0;
    rcNextBtn.disabled = currentRCIndex === readingComprehensionQuestions.length - 1;
    
    if (rcPrevBtn.disabled) {
        rcPrevBtn.classList.add('disabled');
    } else {
        rcPrevBtn.classList.remove('disabled');
    }
    
    if (rcNextBtn.disabled) {
        rcNextBtn.classList.add('disabled');
    } else {
        rcNextBtn.classList.remove('disabled');
    }
}

// ========== 进度管理 ==========
function saveRCProgress() {
    try {
        const progressData = {
            currentRCIndex: currentRCIndex,
            timestamp: Date.now()
        };
        localStorage.setItem(RC_PROGRESS_KEY, JSON.stringify(progressData));
    } catch (error) {
        console.error('保存阅读理解进度失败:', error);
    }
}

function loadRCProgress() {
    try {
        const savedProgress = localStorage.getItem(RC_PROGRESS_KEY);
        if (savedProgress) {
            const progressData = JSON.parse(savedProgress);
            if (progressData.currentRCIndex !== undefined && 
                progressData.currentRCIndex >= 0 && 
                progressData.currentRCIndex < readingComprehensionQuestions.length) {
                currentRCIndex = progressData.currentRCIndex;
                return true;
            }
        }
    } catch (error) {
        console.error('恢复阅读理解进度失败:', error);
    }
    return false;
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', initReadingComprehension);