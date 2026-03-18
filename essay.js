// ========== 英语作文模块 ==========

// ========== 作文评分模型配置 ==========
const ESSAY_MODEL_CONFIG = {
    'GLM': {
        service: 'qwen',
        model: 'glm-4.7'
    },
    'DeepSeek': {
        service: 'qwen',
        model: 'deepseek-v3.1'
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
    }
};

// 作文评分默认模型列表
const ESSAY_DEFAULT_MODELS = ['GLM', 'DeepSeek', 'Kimi', 'Qwen', 'MiniMax'];

// 作文评分系统提示词
const ESSAY_GRADING_PROMPT = `你是湖北省专升本英语考试试卷的阅卷老师，现在请根据提供的作文题目和考生作文，对考生的作文进行评分。

评分标准（满分10分）：按照湖北省专升本英语考试的评判标准来进行评分。

评分规则：
- 分数为0-10分
- 分数必须为整数或者为带0.5的小数，分数不允许出现出“.5”以外的小数
- 按照湖北省专升本英语考试的标准来进行评分，不宜用太专业的标准来评判。

返回JSON格式：{"score": 分数, "comment": "简要评语，指出优点和不足"}`;

// ========== 状态管理 ==========
let currentEssayIndex = 0;
let essayUserAnswer = '';
let essayAIScores = null;  // 存储AI评分结果
let essayIsGrading = false;  // 评分进行中标志
const ESSAY_PROGRESS_KEY = 'wdenglish_essay_progress';

// ========== DOM 元素 ==========
let essayContent, essayQuestionNumber, essayTotalQuestions;
let essayPrevBtn, essayCheckBtn, essayNextBtn;
let essayResult, essayExplanation;
let essayCard;

// ========== 初始化函数 ==========
function initEssay() {
    // 获取 DOM 元素
    essayContent = document.getElementById('essayContent');
    essayQuestionNumber = document.getElementById('essayQuestionNumber');
    essayTotalQuestions = document.getElementById('essayTotalQuestions');
    essayPrevBtn = document.getElementById('essayPrevBtn');
    essayCheckBtn = document.getElementById('essayCheckBtn');
    essayNextBtn = document.getElementById('essayNextBtn');
    essayResult = document.getElementById('essayResult');
    essayExplanation = document.getElementById('essayExplanation');
    essayCard = document.querySelector('.essay-card');
    
    // 检查元素是否存在
    if (!essayContent || !essayQuestionNumber || !essayTotalQuestions ||
        !essayPrevBtn || !essayCheckBtn || !essayNextBtn ||
        !essayResult || !essayExplanation || !essayCard) {
        console.error('英语作文模块：缺少必要的 DOM 元素');
        return;
    }
    
    // 检查题库是否加载
    if (typeof essayQuestions === 'undefined' || !essayQuestions.length) {
        console.error('英语作文模块：题库未加载或为空');
        return;
    }
    
    // 更新总题数
    essayTotalQuestions.textContent = essayQuestions.length;
    
    // 恢复进度
    loadEssayProgress();
    
    // 渲染当前题目
    renderEssayQuestion();
    
    // 绑定事件
    bindEssayEvents();
}

// ========== 渲染函数 ==========
function renderEssayQuestion() {
    const question = essayQuestions[currentEssayIndex];
    
    console.log('渲染作文题目:', question);
    
    // 更新题号
    essayQuestionNumber.textContent = currentEssayIndex + 1;
    
    // 清空内容
    essayContent.innerHTML = '';
    essayResult.innerHTML = '';
    essayResult.className = 'result';
    essayExplanation.innerHTML = '';
    essayExplanation.className = 'explanation';
    
    // 重置用户答案
    essayUserAnswer = '';
    
    // 渲染题目内容
    const questionText = document.createElement('div');
    questionText.className = 'essay-question-text';
    questionText.textContent = question.content;
    essayContent.appendChild(questionText);
    
    // 创建答案输入区域
    const answerContainer = document.createElement('div');
    answerContainer.className = 'essay-answer-container';
    
    // 添加标签
    const answerLabel = document.createElement('label');
    answerLabel.className = 'essay-answer-label';
    answerLabel.textContent = '请在下方撰写你的作文：';
    answerContainer.appendChild(answerLabel);
    
    // 创建多行文本输入框
    const textarea = document.createElement('textarea');
    textarea.className = 'essay-textarea';
    textarea.id = 'essayTextarea';
    textarea.rows = 8;
    textarea.autocomplete = 'off';
    textarea.spellcheck = false;
    
    // 自动调整高度函数
    const autoResize = (element) => {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    };
    
    // 计算词数的函数
    const updateWordCount = (text) => {
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        document.getElementById('essayWordCount').textContent = words.length;
    };
    
    // 输入事件
    textarea.addEventListener('input', (e) => {
        essayUserAnswer = e.target.value.trim();
        autoResize(e.target);
        updateWordCount(e.target.value);
        saveEssayProgress();
    });
    
    answerContainer.appendChild(textarea);
    
    // 创建词数显示区域（放在textarea之后，显示在右下角）
    const wordCountDiv = document.createElement('div');
    wordCountDiv.className = 'essay-word-count';
    wordCountDiv.innerHTML = '<span class="essay-word-count-label">词数：</span><span class="essay-word-count-value" id="essayWordCount">0</span>';
    answerContainer.appendChild(wordCountDiv);
    
    essayContent.appendChild(answerContainer);
    
    // 初始化高度
    autoResize(textarea);
    
    // 更新按钮状态
    updateEssayButtonStates();
}

// ========== 事件处理 ==========
function bindEssayEvents() {
    essayPrevBtn.addEventListener('click', prevEssayQuestion);
    essayNextBtn.addEventListener('click', nextEssayQuestion);
    essayCheckBtn.addEventListener('click', checkEssayAnswer);
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        // 只在作文卡片显示时响应
        if (!essayCard || essayCard.classList.contains('hidden')) return;
        
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            checkEssayAnswer();
        }
    });
}

function prevEssayQuestion() {
    if (currentEssayIndex > 0) {
        currentEssayIndex--;
        renderEssayQuestion();
        saveEssayProgress();
    }
}

function nextEssayQuestion() {
    if (currentEssayIndex < essayQuestions.length - 1) {
        currentEssayIndex++;
        renderEssayQuestion();
        saveEssayProgress();
    }
}

// ========== 答案检查 ==========
async function checkEssayAnswer() {
    const question = essayQuestions[currentEssayIndex];
    
    // 检查用户是否作答
    if (!essayUserAnswer || essayUserAnswer.trim().length < 10) {
        // 用户未输入内容，直接判为0分，不调用AI
        essayAIScores = {
            results: ESSAY_DEFAULT_MODELS.map(model => ({
                model: model,
                score: 0,
                comment: '未作答，得0分'
            })),
            finalScore: 0,
            hasMajority: true,
            majorityScore: 0,
            failedCount: 0
        };
        
        // 显示结果
        displayEssayResults(question, essayAIScores);
        return;
    }
    
    // 防止重复点击
    if (essayIsGrading) return;
    essayIsGrading = true;
    
    // 禁用按钮，显示加载状态
    essayCheckBtn.disabled = true;
    essayCheckBtn.textContent = '评分中';
    
    try {
        // 构建评分提示词
        const prompt = buildEssayGradingPrompt(
            question.content,
            essayUserAnswer
        );
        
        // 显示加载指示器
        showEssayGradingIndicator();
        
        // 并行调用所有AI模型
        const aiResults = await gradeEssayWithAllModels(prompt);
        
        // 隐藏加载指示器
        hideEssayGradingIndicator();
        
        // 检查是否有足够的结果
        if (aiResults.length < 3) {
            essayResult.textContent = `AI评分失败：仅有${aiResults.length}个模型响应成功，请检查网络后重试`;
            essayResult.className = 'result incorrect';
            console.error('AI评分失败，成功响应的模型数量不足:', aiResults.length);
            return;
        }
        
        // 计算最终分数
        const { finalScore, hasMajority, majorityScore, failedCount } = calculateFinalEssayScore(aiResults);
        
        // 存储详细结果
        essayAIScores = {
            results: aiResults,
            finalScore,
            hasMajority,
            majorityScore,
            failedCount
        };
        
        // 显示结果
        displayEssayResults(question, essayAIScores);
        
    } catch (error) {
        console.error('AI评分失败:', error);
        hideEssayGradingIndicator();
        essayResult.textContent = 'AI评分失败，请检查网络后重试';
        essayResult.className = 'result incorrect';
    } finally {
        essayIsGrading = false;
        essayCheckBtn.disabled = false;
        essayCheckBtn.textContent = '检查答案';
        saveEssayProgress();
    }
}

// ========== AI评分UI展示函数 ==========

/**
 * 显示评分加载指示器
 */
function showEssayGradingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'essayGradingIndicator';
    indicator.className = 'essay-grading-indicator';
    indicator.innerHTML = `
        <div class="essay-grading-spinner"></div>
        <div class="essay-grading-text">正在调用5个AI模型进行评分...</div>
        <div class="essay-grading-models">GLM · DeepSeek · Kimi · Qwen · MiniMax</div>
    `;
    essayContent.appendChild(indicator);
}

/**
 * 隐藏评分加载指示器
 */
function hideEssayGradingIndicator() {
    const indicator = document.getElementById('essayGradingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

/**
 * 显示作文评分结果
 * @param {Object} question - 题目对象
 * @param {Object} aiScores - AI评分结果
 */
function displayEssayResults(question, aiScores) {
    const { results, finalScore, hasMajority, failedCount } = aiScores;
    
    // 显示总分
    let resultText = `作文评分：${finalScore}分`;
    
    essayResult.textContent = resultText;
    essayResult.className = finalScore >= 6 ? 'result correct' : 'result incorrect';
    
    // 构建详细结果HTML
    let explanationHTML = '';
    
    // AI评分详情（放在第一位）
    if (results.length > 0) {
        explanationHTML += buildEssayScoreDetailHTML(results, finalScore, hasMajority, failedCount);
    }
    
    // 参考范文
    if (question.sampleAnswer && question.sampleAnswer.trim()) {
        explanationHTML += `
            <div class="essay-sample-answer">
                <div class="essay-sample-title">参考范文：</div>
                <div class="essay-sample-content">${question.sampleAnswer}</div>
            </div>
        `;
    }
    
    // 答案解析（和其他题目一样的格式）
    if (question.explanation && question.explanation.trim()) {
        const formattedExplanation = formatEssayExplanation(question.explanation);
        explanationHTML += formattedExplanation;
    }
    
    essayExplanation.innerHTML = explanationHTML;
    essayExplanation.classList.add('visible');
}

/**
 * 格式化解析内容
 * @param {string} explanation - 解析文本
 * @returns {string} 格式化后的HTML
 */
function formatEssayExplanation(explanation) {
    return explanation
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
}

/**
 * 构建AI评分详情HTML
 * @param {Array} results - 各模型评分结果
 * @param {number} finalScore - 最终分数
 * @param {boolean} hasMajority - 是否有3个模型一致
 * @param {number} failedCount - 失败模型数量
 * @returns {string} HTML字符串
 */
function buildEssayScoreDetailHTML(results, finalScore, hasMajority, failedCount) {
    let html = '<div class="essay-ai-scores">';
    html += '<div class="essay-ai-scores-title">AI评分详情</div>';
    
    // 各模型评分
    html += '<div class="essay-ai-scores-grid">';
    results.forEach(result => {
        const scoreClass = result.score >= 7 ? 'score-high' : 
                          result.score >= 5 ? 'score-medium' : 'score-low';
        html += `
            <div class="essay-ai-score-item">
                <span class="essay-ai-model-name">${result.model}</span>
                <span class="essay-ai-model-score ${scoreClass}">${result.score}分</span>
            </div>
        `;
    });
    html += '</div>';
    
    // 最终分数说明
    html += '<div class="essay-ai-final-score">';
    html += `<span class="essay-final-label">作文分数</span>`;
    html += `<span class="essay-final-value">${finalScore}分</span>`;
    html += '</div>';
    
    // 失败模型提示
    if (failedCount > 0) {
        html += `<div class="essay-ai-warning">有${failedCount}个模型响应失败，已用${results.length}个模型的结果计算</div>`;
    }
    
    // 综合评语（取第一个成功的评语）
    const firstComment = results.find(r => r.comment)?.comment;
    if (firstComment) {
        html += `<div class="essay-ai-comment"><strong>综合评语：</strong>${firstComment}</div>`;
    }
    
    html += '</div>';
    return html;
}

function updateEssayButtonStates() {
    essayPrevBtn.disabled = currentEssayIndex === 0;
    essayNextBtn.disabled = currentEssayIndex === essayQuestions.length - 1;
    
    if (essayPrevBtn.disabled) {
        essayPrevBtn.classList.add('disabled');
    } else {
        essayPrevBtn.classList.remove('disabled');
    }
    
    if (essayNextBtn.disabled) {
        essayNextBtn.classList.add('disabled');
    } else {
        essayNextBtn.classList.remove('disabled');
    }
}

// ========== 进度管理 ==========
function saveEssayProgress() {
    try {
        const progressData = {
            currentEssayIndex: currentEssayIndex,
            userAnswer: essayUserAnswer,
            timestamp: Date.now()
        };
        localStorage.setItem(ESSAY_PROGRESS_KEY, JSON.stringify(progressData));
    } catch (error) {
        console.error('保存作文进度失败:', error);
    }
}

function loadEssayProgress() {
    try {
        const savedProgress = localStorage.getItem(ESSAY_PROGRESS_KEY);
        if (savedProgress) {
            const progressData = JSON.parse(savedProgress);
            if (progressData.currentEssayIndex !== undefined && 
                progressData.currentEssayIndex >= 0 && 
                progressData.currentEssayIndex < essayQuestions.length) {
                currentEssayIndex = progressData.currentEssayIndex;
                essayUserAnswer = progressData.userAnswer || '';
                return true;
            }
        }
    } catch (error) {
        console.error('恢复作文进度失败:', error);
    }
    return false;
}

// ========== AI评分核心函数 ==========

/**
 * 将分数四舍五入到整数或x.5
 * @param {number} score - 原始分数
 * @returns {number} 处理后的分数
 */
function roundToHalfPoint(score) {
    return Math.round(score * 2) / 2;
}

/**
 * 构建AI评分提示词
 * @param {string} questionContent - 题目内容
 * @param {string} userAnswer - 用户作文
 * @returns {string} 完整的提示词
 */
function buildEssayGradingPrompt(questionContent, userAnswer) {
    return `${ESSAY_GRADING_PROMPT}

【作文要求】
${questionContent}

【考生作文】
${userAnswer}

请对学生作文进行评分，返回JSON格式。`;
}

/**
 * 解析AI返回的分数
 * @param {string} response - AI响应文本
 * @param {string} modelKey - 模型名称
 * @returns {Object|null} {model, score, comment}
 */
function parseEssayAIScore(response, modelKey) {
    try {
        // 尝试提取JSON
        const jsonMatch = response.match(/\{[\s\S]*?"score"[\s\S]*?\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            let score = parseFloat(parsed.score);
            
            // 确保分数在0-10范围内
            score = Math.max(0, Math.min(10, score));
            
            // 四舍五入到整数或x.5
            score = roundToHalfPoint(score);
            
            return {
                model: modelKey,
                score: score,
                comment: parsed.comment || '无评语'
            };
        }
        
        console.error('无法解析AI响应:', response);
        return null;
    } catch (error) {
        console.error('解析AI分数失败:', error);
        return null;
    }
}

/**
 * 调用单个AI模型进行评分
 * @param {string} modelKey - 模型名称
 * @param {string} prompt - 评分提示词
 * @returns {Promise<Object|null>} 评分结果 {model, score, comment}
 */
async function callEssayAIService(modelKey, prompt) {
    const config = ESSAY_MODEL_CONFIG[modelKey];
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
                customSystemPrompt: ESSAY_GRADING_PROMPT
            });
        } else {
            const service = new QwenAIService();
            service.setModel(config.model);
            response = await service.sendMessage(prompt, {
                temperature: 0.3,
                maxTokens: 500,
                customSystemPrompt: ESSAY_GRADING_PROMPT
            });
        }
        
        // 解析响应
        return parseEssayAIScore(response, modelKey);
    } catch (error) {
        console.error(`调用 ${modelKey} 失败:`, error);
        return null;
    }
}

/**
 * 并行调用所有AI模型进行评分
 * @param {string} prompt - 评分提示词
 * @returns {Promise<Array>} 评分结果数组
 */
async function gradeEssayWithAllModels(prompt) {
    const promises = ESSAY_DEFAULT_MODELS.map(modelKey => 
        callEssayAIService(modelKey, prompt)
    );
    
    const results = await Promise.allSettled(promises);
    
    // 过滤成功的结果
    return results
        .filter(r => r.status === 'fulfilled' && r.value !== null)
        .map(r => r.value);
}

/**
 * 计算最终分数（少数服从多数或取平均）
 * @param {Array} results - 各模型评分结果数组 [{model, score, comment}, ...]
 * @returns {Object} {finalScore, hasMajority, majorityScore, failedCount}
 */
function calculateFinalEssayScore(results) {
    const totalModels = ESSAY_DEFAULT_MODELS.length;
    const successCount = results.length;
    const failedCount = totalModels - successCount;
    
    if (successCount === 0) {
        return { finalScore: 0, hasMajority: false, majorityScore: null, failedCount };
    }
    
    // 提取分数数组
    const scores = results.map(r => r.score);
    
    // 统计各分数出现次数
    const scoreCounts = {};
    scores.forEach(s => {
        const key = s.toString();
        scoreCounts[key] = (scoreCounts[key] || 0) + 1;
    });
    
    // 检查是否有3个或以上模型给出相同分数
    for (const [score, count] of Object.entries(scoreCounts)) {
        if (count >= 3) {
            return {
                finalScore: parseFloat(score),
                hasMajority: true,
                majorityScore: parseFloat(score),
                failedCount
            };
        }
    }
    
    // 无多数一致，取平均分并四舍五入到0.5
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const finalScore = roundToHalfPoint(avgScore);
    
    return { finalScore, hasMajority: false, majorityScore: null, failedCount };
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', initEssay);
