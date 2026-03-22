/**
 * 模拟考试测验模块
 * 提供模拟考试功能，从题库随机抽取题目生成试卷
 */

window.ExamModule = (function() {
    // 进度存储键名
    const PROGRESS_KEYS = {
        sentence: 'wdenglish_sentence_progress',
        grammar: 'wdenglish_grammar_progress',
        translation: 'wdenglish_translation_progress',
        reading: 'wdenglish_reading_progress',
        rc: 'wdenglish_rc_progress',
        essay: 'wdenglish_essay_progress'
    };

    // 主题配置
    const THEME_KEY = 'wdenglish_exam_theme';
    const THEMES = ['default', 'neumorphism']; // 支持多主题扩展
    let currentTheme = 'default';

    // 考试时长（秒）- 120分钟
    const EXAM_DURATION = 120 * 60;
    
    // 计时器相关
    let examTimer = null;
    let remainingTime = EXAM_DURATION;

    // 当前试卷数据
    let currentPaper = {
        grammar: null,      // 语法填空
        sentences: [],      // 连词成句 (6道)
        reading: [],       // 阅读填空 (2道)
        rc: [],            // 阅读理解 (2道)
        translation: null,  // 翻译填空 (一组)
        essay: null         // 英语作文
    };

    // 用户答案
    let userAnswers = {
        grammar: {},
        sentences: [],      // 每道题的答案数组
        reading: [],        // 阅读填空答案数组 (2道)
        rc: [],             // 阅读理解答案数组 (2道)
        translation: {},
        essay: ''
    };

    // 本次会话中已使用的题目索引（离开试卷界面时清空）
    let usedInSession = {
        grammar: new Set(),
        sentences: new Set(),
        reading: new Set(),
        rc: new Set(),
        translation: new Set(),
        essay: new Set()
    };

    // DOM 元素
    let elements = {};

    /**
     * 初始化模块
     */
    function init() {
        cacheElements();
        bindEvents();
        initTheme();
    }

    /**
     * 缓存 DOM 元素
     */
    function cacheElements() {
        elements = {
            overlay: document.getElementById('examOverlay'),
            closeBtn: document.getElementById('examCloseBtn'),
            themeToggleBtn: document.getElementById('examThemeToggleBtn'),
            paperContainer: document.getElementById('examPaperContainer'),
            leftColumn: document.getElementById('examLeftColumn'),
            rightColumn: document.getElementById('examRightColumn'),
            submitBtn: document.getElementById('examSubmitBtn'),
            regenerateBtn: document.getElementById('examRegenerateBtn'),
            resultArea: document.getElementById('examResultArea'),
            scoreTotal: document.getElementById('examScoreTotal'),
            scoreDetails: document.getElementById('examScoreDetails'),
            explanationContent: document.getElementById('examExplanationContent'),
            clockTime: document.getElementById('examClockTime'),
            clockHour: document.getElementById('examClockHour'),
            clockMinute: document.getElementById('examClockMinute')
        };
    }

    /**
     * 绑定事件
     */
    function bindEvents() {
        if (elements.closeBtn) {
            elements.closeBtn.addEventListener('click', closeExam);
        }
        if (elements.submitBtn) {
            elements.submitBtn.addEventListener('click', submitExam);
        }
        if (elements.regenerateBtn) {
            elements.regenerateBtn.addEventListener('click', regeneratePaper);
        }
        if (elements.themeToggleBtn) {
            elements.themeToggleBtn.addEventListener('click', toggleTheme);
        }
    }

    /**
     * 初始化主题 - 从localStorage恢复保存的主题
     */
    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY) || 'default';
        setTheme(savedTheme);
    }

    /**
     * 设置主题
     * @param {string} theme - 主题名称 ('default' 或 'neumorphism')
     */
    function setTheme(theme) {
        currentTheme = theme;
        const overlay = elements.overlay;
        
        if (overlay) {
            // 移除所有主题类
            THEMES.forEach(t => {
                if (t !== 'default') {
                    overlay.classList.remove(`exam-theme-${t}`);
                }
            });
            
            // 添加新主题类（default不需要添加类）
            if (theme !== 'default') {
                overlay.classList.add(`exam-theme-${theme}`);
            }
        }
        
        // 更新已存在的翻译气泡框主题类名
        if (examTooltip) {
            if (theme === 'neumorphism') {
                examTooltip.classList.add('exam-tooltip-neumorphism');
            } else {
                examTooltip.classList.remove('exam-tooltip-neumorphism');
            }
        }
        
        // 保存到localStorage
        localStorage.setItem(THEME_KEY, theme);
        
        // 更新按钮图标提示
        updateThemeButtonIcon();
    }

    /**
     * 切换主题 - 循环切换所有可用主题
     */
    function toggleTheme() {
        const currentIndex = THEMES.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % THEMES.length;
        const nextTheme = THEMES[nextIndex];
        setTheme(nextTheme);
    }

    /**
     * 更新主题切换按钮图标
     */
    function updateThemeButtonIcon() {
        if (elements.themeToggleBtn) {
            const sunIcon = elements.themeToggleBtn.querySelector('.sun-icon');
            const moonIcon = elements.themeToggleBtn.querySelector('.moon-icon');
            
            // 根据当前主题切换图标显示
            if (currentTheme === 'neumorphism') {
                // 新拟态主题：显示月亮图标（点击切换到默认主题）
                if (sunIcon) sunIcon.style.display = 'none';
                if (moonIcon) moonIcon.style.display = 'flex';
            } else {
                // 默认主题：显示太阳图标（点击切换到新拟态主题）
                if (sunIcon) sunIcon.style.display = 'flex';
                if (moonIcon) moonIcon.style.display = 'none';
            }
        }
    }

    /**
     * 打开考试
     */
    function openExam() {
        if (elements.overlay) {
            // 先添加准备状态
            elements.overlay.classList.add('exam-preparing');
            elements.overlay.classList.remove('exam-entering');
            
            // 显示覆盖层
            elements.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // 在准备状态下滚动到顶部（用户看不到滚动过程）
            elements.overlay.scrollTop = 0;
            
            // 生成试卷
            generatePaper();
            
            // 启动计时器
            startTimer();
            
            // 触发重绘后播放入场动画
            requestAnimationFrame(() => {
                elements.overlay.classList.remove('exam-preparing');
                elements.overlay.classList.add('exam-entering');
                
                // 动画结束后移除动画类（0.8s动画 + 0.2s延迟 + 0.1s缓冲）
                setTimeout(() => {
                    elements.overlay.classList.remove('exam-entering');
                }, 1100);
            });
        }
    }

    /**
     * 关闭考试
     */
    function closeExam() {
        // 停止计时器
        stopTimer();
        
        // 移除翻译气泡框
        if (examTooltip) {
            examTooltip.remove();
            examTooltip = null;
        }
        isTranslating = false;
        
        if (elements.overlay) {
            elements.overlay.classList.remove('active');
            elements.overlay.classList.remove('exam-selectable');
            elements.overlay.classList.remove('exam-preparing');
            elements.overlay.classList.remove('exam-entering');
            document.body.style.overflow = '';
        }
        
        // 清空本次会话已使用的题目记录
        usedInSession = {
            grammar: new Set(),
            sentences: new Set(),
            reading: new Set(),
            rc: new Set(),
            translation: new Set(),
            essay: new Set()
        };
        
        // 触发首页入场动画
        if (typeof triggerPageEnterAnimation === 'function') {
            triggerPageEnterAnimation();
        }
    }

    /**
     * 启动计时器
     */
    function startTimer() {
        remainingTime = EXAM_DURATION;
        updateTimerDisplay();
        
        examTimer = setInterval(function() {
            remainingTime--;
            updateTimerDisplay();
            
            // 时间到
            if (remainingTime <= 0) {
                stopTimer();
                autoSubmit();
            }
        }, 1000);
    }

    /**
     * 停止计时器
     */
    function stopTimer() {
        if (examTimer) {
            clearInterval(examTimer);
            examTimer = null;
        }
    }

    /**
     * 更新倒计时显示
     */
    function updateTimerDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        
        const timeText = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
        
        // 更新时钟数字显示
        if (elements.clockTime) {
            elements.clockTime.textContent = timeText;
        }
        
        // 更新时钟指针（顺时针旋转）
        // 已用时间比例
        const elapsedRatio = (EXAM_DURATION - remainingTime) / EXAM_DURATION;
        
        // 分针：顺时针旋转，从12点位置开始
        const minuteRotation = elapsedRatio * 360;
        
        // 时针：同样顺时针旋转
        const hourRotation = elapsedRatio * 360;
        
        if (elements.clockMinute) {
            elements.clockMinute.style.transform = `rotate(${minuteRotation}deg)`;
        }
        if (elements.clockHour) {
            elements.clockHour.style.transform = `rotate(${hourRotation}deg)`;
        }
    }

    /**
     * 自动交卷
     */
    function autoSubmit() {
        alert('考试时间到，系统正在自动提交试卷...');
        submitExam();
    }

    /**
     * 获取题目的当前进度索引
     */
    function getProgressIndex(key) {
        try {
            const saved = localStorage.getItem(key);
            if (saved) {
                const data = JSON.parse(saved);
                return data.currentQuestionIndex || 
                       data.currentGrammarIndex || 
                       data.currentTranslationGroup ||
                       data.currentReadingIndex ||
                       data.currentRCIndex ||
                       data.currentEssayIndex || 0;
            }
        } catch (e) {
            console.error('获取进度失败:', e);
        }
        return 0;
    }

    /**
     * 从数组中随机选取指定数量的元素
     * 优先选取"未做过且未在本会话使用"的题目
     * 如果没有了，就从全部题库中随机选取
     * @param {Array} questionArray 题库数组
     * @param {string} progressKey 进度存储键
     * @param {number} count 需要选取的数量
     * @param {Set} usedSet 本次会话已使用的题目索引集合
     * @returns {Array} 选中的题目数组
     */
    function selectRandomQuestions(questionArray, progressKey, count, usedSet) {
        if (!questionArray || questionArray.length === 0) return [];
        
        const progressIndex = getProgressIndex(progressKey);
        const preferredIndices = [];  // 未做过且未在本会话使用
        
        for (let i = 0; i < questionArray.length; i++) {
            // 跳过本次会话已使用的题目
            if (usedSet && usedSet.has(i)) continue;
            // 未做过的题目
            if (i >= progressIndex) {
                preferredIndices.push(i);
            }
        }
        
        if (count === 1) {
            // 单个题目
            if (preferredIndices.length > 0) {
                // 有符合条件的题目，从中选取
                const randomIndex = preferredIndices[Math.floor(Math.random() * preferredIndices.length)];
                return [{ index: randomIndex, data: questionArray[randomIndex] }];
            } else {
                // 没有符合条件的题目，从全部题库中随机选取
                const randomIndex = Math.floor(Math.random() * questionArray.length);
                return [{ index: randomIndex, data: questionArray[randomIndex] }];
            }
        } else {
            // 多个题目
            const selected = [];
            
            // 打乱顺序
            shuffleArray(preferredIndices);
            
            // 优先从符合条件的题目中选取
            for (let i = 0; i < Math.min(count, preferredIndices.length); i++) {
                const idx = preferredIndices[i];
                selected.push({ index: idx, data: questionArray[idx] });
            }
            
            // 如果还不够，从已做过但未在本会话使用的题目中补充
            if (selected.length < count) {
                const seenButUnused = [];
                for (let i = 0; i < questionArray.length; i++) {
                    // 排除已选的和本会话已使用的
                    if (!selected.some(s => s.index === i) && !(usedSet && usedSet.has(i))) {
                        seenButUnused.push(i);
                    }
                }
                shuffleArray(seenButUnused);
                for (let i = 0; i < Math.min(count - selected.length, seenButUnused.length); i++) {
                    const idx = seenButUnused[i];
                    selected.push({ index: idx, data: questionArray[idx] });
                }
            }
            
            // 如果还不够（所有题目都在本会话用过了），从全部题目中补充
            if (selected.length < count) {
                const allIndices = [];
                for (let i = 0; i < questionArray.length; i++) {
                    if (!selected.some(s => s.index === i)) {
                        allIndices.push(i);
                    }
                }
                shuffleArray(allIndices);
                for (let i = 0; i < Math.min(count - selected.length, allIndices.length); i++) {
                    const idx = allIndices[i];
                    selected.push({ index: idx, data: questionArray[idx] });
                }
            }
            
            return selected;
        }
    }

    /**
     * 打乱数组
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * 生成试卷
     */
    function generatePaper() {
        // 重置答案
        userAnswers = {
            grammar: {},
            sentences: [],
            reading: [],        // 阅读填空答案数组
            rc: [],             // 阅读理解答案数组
            translation: {},
            essay: ''
        };

        // 选择题目
        // 语法填空 - 1道（只选择填空数量等于10道的题目）
        if (typeof grammarQuestions !== 'undefined') {
            // 过滤出填空数量恰好为10道的题目
            const filteredGrammarQuestions = grammarQuestions.filter(q => q.blanks && q.blanks.length === 10);
            const selected = selectRandomQuestions(filteredGrammarQuestions, PROGRESS_KEYS.grammar, 1, usedInSession.grammar);
            currentPaper.grammar = selected[0] || null;
            // 记录本次使用的题目（使用原数组索引）
            if (currentPaper.grammar) {
                const originalIndex = grammarQuestions.indexOf(currentPaper.grammar.data);
                if (originalIndex !== -1) {
                    currentPaper.grammar.index = originalIndex;
                    usedInSession.grammar.add(originalIndex);
                }
            }
        }

        // 连词成句 - 6道
        if (typeof questions !== 'undefined') {
            const selected = selectRandomQuestions(questions, PROGRESS_KEYS.sentence, 6, usedInSession.sentences);
            currentPaper.sentences = selected;
            // 记录本次使用的题目
            selected.forEach(item => {
                usedInSession.sentences.add(item.index);
                userAnswers.sentences.push('');
            });
        }

        // 阅读填空 - 2道
        if (typeof readingQuestions !== 'undefined') {
            const selected = selectRandomQuestions(readingQuestions, PROGRESS_KEYS.reading, 2, usedInSession.reading);
            currentPaper.reading = selected;
            // 记录本次使用的题目
            selected.forEach(item => {
                usedInSession.reading.add(item.index);
                userAnswers.reading.push({});
            });
        }

        // 阅读理解 - 2道
        if (typeof readingComprehensionQuestions !== 'undefined') {
            const selected = selectRandomQuestions(readingComprehensionQuestions, PROGRESS_KEYS.rc, 2, usedInSession.rc);
            currentPaper.rc = selected;
            // 记录本次使用的题目
            selected.forEach(item => {
                usedInSession.rc.add(item.index);
                userAnswers.rc.push({});
            });
        }

        // 翻译填空 - 1组
        if (typeof translationQuestions !== 'undefined') {
            const selected = selectRandomQuestions(translationQuestions, PROGRESS_KEYS.translation, 1, usedInSession.translation);
            currentPaper.translation = selected[0] || null;
            // 记录本次使用的题目
            if (currentPaper.translation) {
                usedInSession.translation.add(currentPaper.translation.index);
            }
        }

        // 英语作文 - 1道
        if (typeof essayQuestions !== 'undefined') {
            const selected = selectRandomQuestions(essayQuestions, PROGRESS_KEYS.essay, 1, usedInSession.essay);
            currentPaper.essay = selected[0] || null;
            // 记录本次使用的题目
            if (currentPaper.essay) {
                usedInSession.essay.add(currentPaper.essay.index);
            }
        }

        // 渲染试卷
        renderPaper();

        // 隐藏结果区域
        if (elements.resultArea) {
            elements.resultArea.classList.remove('active');
        }
        if (elements.submitBtn) {
            elements.submitBtn.disabled = false;
            elements.submitBtn.textContent = '提交试卷';
        }
    }

    /**
     * 重新生成试卷
     */
    function regeneratePaper() {
        // 重置计时器
        stopTimer();
        startTimer();
        
        // 隐藏翻译气泡框
        hideExamTooltip();
        
        // 移除选中权限（需要重新提交才能选中）
        if (elements.overlay) {
            elements.overlay.classList.remove('exam-selectable');
        }
        
        // 先添加准备状态（内容不可见）
        if (elements.overlay) {
            elements.overlay.classList.add('exam-preparing');
            elements.overlay.classList.remove('exam-entering');
            
            // 在准备状态下滚动到顶部（用户看不到滚动过程）
            elements.overlay.scrollTop = 0;
        }
        
        // 重新生成试卷
        generatePaper();
        
        // 触发重绘后播放入场动画
        requestAnimationFrame(() => {
            if (elements.overlay) {
                elements.overlay.classList.remove('exam-preparing');
                elements.overlay.classList.add('exam-entering');
                
                // 动画结束后移除动画类（0.8s动画 + 0.2s延迟 + 0.1s缓冲）
                setTimeout(() => {
                    elements.overlay.classList.remove('exam-entering');
                }, 1100);
            }
        });
    }

    /**
     * 渲染试卷
     */
    function renderPaper() {
        let leftHtml = '';
        let rightHtml = '';

        // 一、语法填空
        leftHtml += renderGrammarSection();

        // 二、连词成句
        leftHtml += renderSentenceSection();

        // 三、阅读填空
        leftHtml += renderReadingSection();

        // 四、阅读理解
        rightHtml += renderRCSection();

        // 五、翻译填空
        rightHtml += renderTranslationSection();

        // 六、写作
        rightHtml += renderEssaySection();

        // 更新 DOM
        if (elements.leftColumn) {
            elements.leftColumn.innerHTML = leftHtml;
        }
        if (elements.rightColumn) {
            elements.rightColumn.innerHTML = rightHtml;
        }
        
        // 绑定输入框自动伸缩事件
        bindInputEvents();
    }

    /**
     * 渲染语法填空部分
     */
    function renderGrammarSection() {
        if (!currentPaper.grammar) return '';
        const q = currentPaper.grammar.data;
        
        let html = `
            <div class="exam-section">
                <div class="exam-section-title">一、语法填空（每题 2 分，共 20 分）</div>
                <div class="exam-content">
                    <div class="exam-article">
        `;

        // 解析内容，处理填空，所有段落作为一个整体
        const content = q.content;
        const paragraphs = content.split(/\n\s*\n/);
        
        paragraphs.forEach((para, index) => {
            if (para.trim()) {
                html += '<p>';
                html += parseBlanks(para, q.blanks, 'grammar');
                html += '</p>';
            }
        });

        html += `
                    </div>
                </div>
            </div>
        `;

        return html;
    }

    /**
     * 解析填空标记，生成输入框
     */
    function parseBlanks(text, blanks, prefix) {
        // 匹配格式: 1. ______(hint) 或 1. ______
        const regex = /(\d+)\.\s*_{2,}(?:\(([^)]+)\))?/g;
        let result = text;
        let match;
        
        while ((match = regex.exec(text)) !== null) {
            const fullMatch = match[0];
            const blankIndex = parseInt(match[1]);
            const hint = match[2] || '';
            
            const inputHtml = `<span class="exam-number">${blankIndex}.</span><input type="text" class="exam-blank" data-type="${prefix}" data-index="${blankIndex}">${hint ? `<span class="exam-hint">(${hint})</span>` : ''}`;
            result = result.replace(fullMatch, inputHtml);
        }
        
        return result;
    }

    /**
     * 渲染连词成句部分
     */
    function renderSentenceSection() {
        if (!currentPaper.sentences || currentPaper.sentences.length === 0) return '';
        
        let html = `
            <div class="exam-section">
                <div class="exam-section-title">二、连词成句（将所给词正确排列顺序连成一个句子），每题 2 分，共 12 分</div>
                <div class="exam-content">
        `;

        currentPaper.sentences.forEach((item, idx) => {
            // 获取单词并打乱顺序
            const wordsCopy = [...item.data.words];
            shuffleArray(wordsCopy);
            
            html += `
                <div class="exam-sentence-item">
                    <p class="no-indent"><span class="exam-number">${idx + 1}.</span> <span class="exam-sentence-words">${wordsCopy.map(w => `<span>${w}</span>`).join('<span class="exam-sentence-separator">/</span>')}</span></p>
                    <input type="text" class="exam-sentence-input" data-type="sentence" data-index="${idx}">
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * 绑定输入框自动伸缩事件
     */
    function bindInputEvents() {
        // 作文 textarea 自动伸缩
        const essayTextarea = document.querySelector('.exam-essay-textarea');
        if (essayTextarea) {
            const autoResize = (element) => {
                element.style.height = 'auto';
                element.style.height = element.scrollHeight + 'px';
            };
            
            // 初始化高度
            autoResize(essayTextarea);
            
            // 输入事件
            essayTextarea.addEventListener('input', function(e) {
                autoResize(e.target);
                userAnswers.essay = e.target.value.trim();
                
                // 更新词数
                const words = e.target.value.trim().split(/\s+/).filter(word => word.length > 0);
                const wordCountEl = document.getElementById('examWordCount');
                if (wordCountEl) {
                    wordCountEl.textContent = words.length;
                }
            });
        }
        
        // 填空输入框自动伸缩
        document.querySelectorAll('.exam-blank').forEach(input => {
            input.addEventListener('input', function(e) {
                const value = e.target.value;
                
                // 使用 Canvas 测量文字宽度
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                
                if (context) {
                    context.font = getComputedStyle(e.target).font;
                    const textWidth = context.measureText(value).width;
                    
                    // 阅读理解输入框使用独立宽度范围
                    if (e.target.classList.contains('exam-blank-rc')) {
                        const newWidth = Math.max(400, Math.min(650, textWidth + 20));
                        e.target.style.width = newWidth + 'px';
                    } else {
                        // 其他输入框：最小90px，最大250px
                        const newWidth = Math.max(90, Math.min(250, textWidth + 20));
                        e.target.style.width = newWidth + 'px';
                    }
                }
            });
        });
        
        // 连词成句输入框自动伸缩（只有超过默认长度500px才延伸）
        document.querySelectorAll('.exam-sentence-input').forEach(input => {
            input.addEventListener('input', function(e) {
                const value = e.target.value;
                const idx = parseInt(e.target.dataset.index);
                if (!isNaN(idx)) {
                    userAnswers.sentences[idx] = value;
                }
                
                // 使用 Canvas 测量文字宽度
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                
                if (context) {
                    context.font = getComputedStyle(e.target).font;
                    const textWidth = context.measureText(value).width;
                    // 最小宽度500px（与默认宽度一致），只有超过才延伸
                    const newWidth = Math.max(500, Math.min(600, textWidth + 30));
                    e.target.style.width = newWidth + 'px';
                }
            });
        });
    }

    /**
     * 渲染阅读填空部分
     */
    function renderReadingSection() {
        if (!currentPaper.reading || currentPaper.reading.length === 0) return '';
        
        let html = `
            <div class="exam-section">
                <div class="exam-section-title">三、阅读填空（根据文章内容完成填空，每空填1个词），共2篇10题，每题2分</div>
                <div class="exam-content">
        `;

        currentPaper.reading.forEach((paperItem, paperIdx) => {
            // 确保数据存在
            if (!paperItem || !paperItem.data) {
                console.warn('阅读填空题目数据缺失，索引:', paperIdx);
                return;
            }
            
            const q = paperItem.data;
            
            // 文章标题
            html += `<h3 class="exam-passage-title">Passage ${paperIdx + 1}</h3>`;
            
            // 渲染文章
            if (q.article) {
                html += '<div class="exam-article">';
                const paragraphs = q.article.split(/\n\s*\n/);
                paragraphs.forEach(para => {
                    if (para.trim()) {
                        html += `<p>${para}</p>`;
                    }
                });
                html += '</div>';
            }

            // 摘要填空标题（文章标题）
            if (q.title) {
                html += `<div class="exam-summary-title">${q.title}</div>`;
            }

            // 渲染摘要填空
            if (q.questions && q.questions.length > 0) {
                html += '<div class="exam-summary">';
                q.questions.forEach((sq, idx) => {
                    html += `<p class="no-indent"><span class="exam-number">${sq.label || (idx + 1)}.</span>`;
                    html += parseBlanksForReading(sq.text, sq.blanks, paperIdx);
                    html += '</p>';
                });
                html += '</div>';
            }
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * 为阅读填空解析填空标记（包含文章索引）
     */
    function parseBlanksForReading(text, blanks, paperIdx) {
        const regex = /(\d+)\.\s*_{2,}(?:\(([^)]+)\))?/g;
        let result = text;
        let match;
        
        while ((match = regex.exec(text)) !== null) {
            const fullMatch = match[0];
            const blankIndex = parseInt(match[1]);
            const hint = match[2] || '';
            
            const inputHtml = `<span class="exam-number">${blankIndex}.</span><input type="text" class="exam-blank" data-type="reading" data-paper="${paperIdx}" data-index="${blankIndex}">${hint ? `<span class="exam-hint">(${hint})</span>` : ''}`;
            result = result.replace(fullMatch, inputHtml);
        }
        
        return result;
    }

    /**
     * 渲染阅读理解部分
     */
    function renderRCSection() {
        if (!currentPaper.rc || currentPaper.rc.length === 0) return '';
        
        let html = `
            <div class="exam-section">
                <div class="exam-section-title">四、阅读理解（根据文章内容完成问答），共2篇10题，每题2分</div>
                <div class="exam-content">
        `;

        currentPaper.rc.forEach((paperItem, paperIdx) => {
            // 确保数据存在
            if (!paperItem || !paperItem.data) {
                console.warn('阅读理解题目数据缺失，索引:', paperIdx);
                return;
            }
            
            const q = paperItem.data;
            
            // 文章标题
            html += `<h3 class="exam-passage-title">Passage ${paperIdx + 3}</h3>`;
            
            // 渲染文章
            if (q.article) {
                html += '<div class="exam-article">';
                const paragraphs = q.article.split(/\n\s*\n/);
                paragraphs.forEach(para => {
                    if (para.trim()) {
                        html += `<p>${para}</p>`;
                    }
                });
                html += '</div>';
            }

            // 渲染问题
            if (q.questions && q.questions.length > 0) {
                q.questions.forEach((sq, idx) => {
                    const isTranslation = sq.reference !== undefined;
                    html += `
                        <p class="no-indent">
                            <span class="exam-number">${idx + 1}.</span>
                            ${sq.text}
                        </p>
                        <p class="no-indent">
                            <input type="text" class="exam-blank exam-blank-rc" data-type="rc" data-paper="${paperIdx}" data-index="${idx}" data-is-translation="${isTranslation}">
                        </p>
                    `;
                });
            }
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * 渲染翻译填空部分
     */
    function renderTranslationSection() {
        if (!currentPaper.translation) return '';
        const q = currentPaper.translation.data;
        
        let html = `
            <div class="exam-section">
                <div class="exam-section-title">五、翻译填空（使用括号单词根据汉语提示完成句子），共6题，每题3分</div>
                <div class="exam-content">
        `;

        if (q.questions && q.questions.length > 0) {
            q.questions.forEach((sq, idx) => {
                // 替换（ ）为输入框
                let english = sq.english.replace('（ ）', 
                    `<input type="text" class="exam-blank" data-type="translation" data-index="${idx}">`);
                
                html += `
                    <p class="no-indent">
                        <span class="exam-number">${idx + 1}.</span>
                        ${english}
                        <span class="exam-hint">(${sq.hint})</span>
                    </p>
                    <p class="exam-chinese">${sq.chinese}</p>
                `;
            });
        }

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * 渲染作文部分
     */
    function renderEssaySection() {
        if (!currentPaper.essay) return '';
        const q = currentPaper.essay.data;
        
        let html = `
            <div class="exam-section">
                <div class="exam-section-title">六、写作，共10分</div>
                <div class="exam-content">
                    <div class="exam-essay-question">
                        <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${q.content}</pre>
                    </div>
                    <textarea class="exam-essay-textarea" data-type="essay"></textarea>
                    <div class="exam-word-count">词数：<span id="examWordCount">0</span></div>
                </div>
            </div>
        `;

        return html;
    }

    /**
     * 收集用户答案
     */
    function collectAnswers() {
        // 语法填空
        document.querySelectorAll('.exam-blank[data-type="grammar"]').forEach(input => {
            userAnswers.grammar[input.dataset.index] = input.value.trim();
        });

        // 阅读填空
        document.querySelectorAll('.exam-blank[data-type="reading"]').forEach(input => {
            const paperIdx = parseInt(input.dataset.paper) || 0;
            if (!userAnswers.reading[paperIdx]) {
                userAnswers.reading[paperIdx] = {};
            }
            userAnswers.reading[paperIdx][input.dataset.index] = input.value.trim();
        });

        // 阅读理解
        document.querySelectorAll('.exam-blank[data-type="rc"]').forEach(input => {
            const paperIdx = parseInt(input.dataset.paper) || 0;
            if (!userAnswers.rc[paperIdx]) {
                userAnswers.rc[paperIdx] = {};
            }
            userAnswers.rc[paperIdx][input.dataset.index] = {
                value: input.value.trim(),
                isTranslation: input.dataset.isTranslation === 'true'
            };
        });

        // 翻译填空
        document.querySelectorAll('.exam-blank[data-type="translation"]').forEach(input => {
            userAnswers.translation[input.dataset.index] = input.value.trim();
        });

        // 作文
        const essayTextarea = document.querySelector('.exam-essay-textarea');
        if (essayTextarea) {
            userAnswers.essay = essayTextarea.value.trim();
        }
    }

    /**
     * 提交试卷
     */
    async function submitExam() {
        // 停止计时器
        stopTimer();
        
        if (elements.submitBtn) {
            elements.submitBtn.disabled = true;
            elements.submitBtn.textContent = '评分中...';
        }

        collectAnswers();

        // 第一步：先进行非AI判题的题目评分（语法填空、连词成句、阅读填空、翻译填空）
        // 这些题目立即更新样式状态
        const grammarResult = await checkGrammarAnswers();
        const sentenceResult = checkSentenceAnswers();
        const readingResult = checkReadingAnswers();
        const translationResult = checkTranslationAnswers();

        // 第二步：进行AI判题（阅读理解和作文）
        // 这些题目的样式状态在AI评分完成后才更新
        const { rcResult, essayResult } = await checkRCAndEssayTogether();

        // 计算各部分得分
        const scores = {
            grammar: grammarResult,
            sentence: sentenceResult,
            reading: readingResult,
            rc: rcResult,
            translation: translationResult,
            essay: essayResult
        };

        // 显示结果
        showResults(scores);
    }

    /**
     * 检查语法填空答案
     */
    async function checkGrammarAnswers() {
        if (!currentPaper.grammar) return { score: 0, total: 0, details: [] };
        
        const q = currentPaper.grammar.data;
        let correct = 0;
        let total = q.blanks ? q.blanks.length * 2 : 0;  // 每题2分
        const details = [];

        if (q.blanks) {
            q.blanks.forEach(blank => {
                const userAnswer = userAnswers.grammar[blank.index] || '';
                const isCorrect = checkAnswer(userAnswer, blank.answer);
                if (isCorrect) correct += 2;  // 每题2分
                details.push({
                    index: blank.index,
                    userAnswer: userAnswer,
                    correctAnswer: blank.answer,
                    isCorrect: isCorrect
                });

                // 更新输入框样式
                const input = document.querySelector(`.exam-blank[data-type="grammar"][data-index="${blank.index}"]`);
                if (input) {
                    input.classList.add(isCorrect ? 'correct' : 'incorrect');
                    if (!isCorrect) {
                        input.insertAdjacentHTML('afterend', 
                            `<span class="exam-correct-answer">正确答案: ${blank.answer}</span>`);
                    }
                }
            });
        }

        return { score: correct, total: total, details: details };
    }

    /**
     * 检查连词成句答案
     */
    function checkSentenceAnswers() {
        let totalScore = 0;
        const total = currentPaper.sentences.length * 2;
        const details = [];

        currentPaper.sentences.forEach((item, idx) => {
            const userSentence = userAnswers.sentences[idx] || '';
            const correctAnswer = item.data.answer;
            
            // 标准化比较
            const normalizedUser = normalizeSentence(userSentence);
            const normalizedCorrect = normalizeSentence(correctAnswer);
            
            const isCorrect = normalizedUser === normalizedCorrect;
            if (isCorrect) totalScore += 2;
            
            details.push({
                index: idx + 1,
                userAnswer: userSentence,
                correctAnswer: correctAnswer,
                isCorrect: isCorrect,
                score: isCorrect ? 2 : 0
            });

            // 标记输入框状态
            const input = document.querySelector(`.exam-sentence-input[data-index="${idx}"]`);
            if (input) {
                input.classList.add(isCorrect ? 'correct' : 'incorrect');
            }

            // 显示正确答案
            if (!isCorrect) {
                const container = input ? input.parentElement : null;
                if (container) {
                    container.insertAdjacentHTML('beforeend', 
                        `<p class="exam-correct-answer">正确答案: ${correctAnswer}</p>`);
                }
            }
        });

        return { score: totalScore, total: total, details: details };
    }

    /**
     * 标准化句子（用于比较）
     */
    function normalizeSentence(sentence) {
        return sentence
            .toLowerCase()
            .replace(/[.,!?;:'"]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    /**
     * 检查阅读填空答案
     */
    function checkReadingAnswers() {
        if (!currentPaper.reading || currentPaper.reading.length === 0) return { score: 0, total: 0, details: [] };
        
        let correct = 0;
        let total = 0;
        const details = [];

        currentPaper.reading.forEach((paperItem, paperIdx) => {
            const q = paperItem.data;
            
            if (q.questions) {
                q.questions.forEach(sq => {
                    if (sq.blanks) {
                        sq.blanks.forEach(blank => {
                            total += 2;  // 每题2分
                            const paperAnswers = userAnswers.reading[paperIdx] || {};
                            const userAnswer = paperAnswers[blank.index] || '';
                            const isCorrect = checkAnswer(userAnswer, blank.answer);
                            if (isCorrect) correct += 2;  // 每题2分
                            details.push({
                                paper: paperIdx + 1,
                                index: blank.index,
                                userAnswer: userAnswer,
                                correctAnswer: blank.answer,
                                isCorrect: isCorrect
                            });

                            // 更新输入框样式
                            const input = document.querySelector(`.exam-blank[data-type="reading"][data-paper="${paperIdx}"][data-index="${blank.index}"]`);
                            if (input) {
                                input.classList.add(isCorrect ? 'correct' : 'incorrect');
                                if (!isCorrect) {
                                    input.insertAdjacentHTML('afterend', 
                                        `<span class="exam-correct-answer">正确答案: ${blank.answer}</span>`);
                                }
                            }
                        });
                    }
                });
            }
        });

        return { score: correct, total: total, details: details };
    }

    /**
     * 检查翻译填空答案
     */
    function checkTranslationAnswers() {
        if (!currentPaper.translation) return { score: 0, total: 0, details: [] };
        
        const q = currentPaper.translation.data;
        let totalScore = 0;
        const total = q.questions ? q.questions.length * 3 : 0;  // 每题3分
        const details = [];

        if (q.questions) {
            q.questions.forEach((sq, idx) => {
                const userAnswer = userAnswers.translation[idx] || '';
                const isCorrect = checkAnswer(userAnswer, sq.answer);
                const score = isCorrect ? 3 : 0;  // 每题3分
                totalScore += score;
                
                details.push({
                    index: idx + 1,
                    userAnswer: userAnswer,
                    correctAnswer: sq.answer,
                    isCorrect: isCorrect,
                    score: score
                });

                // 更新输入框样式
                const input = document.querySelector(`.exam-blank[data-type="translation"][data-index="${idx}"]`);
                if (input) {
                    input.classList.add(isCorrect ? 'correct' : 'incorrect');
                    if (!isCorrect) {
                        input.insertAdjacentHTML('afterend', 
                            `<span class="exam-correct-answer">正确答案: ${sq.answer}</span>`);
                    }
                }
            });
        }

        return { score: totalScore, total: total, details: details };
    }

    /**
     * 融合判题：同时处理阅读理解和作文的AI判题
     * 将两次串行判题合并为一次批量判题，提高效率
     */
    async function checkRCAndEssayTogether() {
        // 存储阅读理解的精确匹配结果和需要AI判题的题目
        let rcTotalScore = 0;
        let rcTotal = 0;
        const rcDetails = [];
        const rcItemsNeedAI = []; // 需要AI判题的阅读理解题目

        // 阶段1：处理阅读理解 - 精确匹配检查
        if (currentPaper.rc && currentPaper.rc.length > 0) {
            for (let paperIdx = 0; paperIdx < currentPaper.rc.length; paperIdx++) {
                const paperItem = currentPaper.rc[paperIdx];
                const q = paperItem.data;
                
                if (q.questions) {
                    rcTotal += q.questions.length * 2;
                    
                    for (let i = 0; i < q.questions.length; i++) {
                        const sq = q.questions[i];
                        const paperAnswers = userAnswers.rc[paperIdx] || {};
                        const userAnswer = paperAnswers[i] ? paperAnswers[i].value : '';
                        const isTranslation = paperAnswers[i] ? paperAnswers[i].isTranslation : false;
                        
                        let score = 0;
                        
                        // 精确匹配检查
                        if (sq.answer && checkAnswer(userAnswer, sq.answer)) {
                            score = 2;
                        } else if (isTranslation && sq.reference) {
                            if (checkAnswer(userAnswer, sq.reference)) {
                                score = 2;
                            }
                        }
                        
                        if (score === 2) {
                            // 精确匹配成功，只更新样式，不显示参考答案（做对不显示答案）
                            rcTotalScore += score;
                            rcDetails.push({
                                paper: paperIdx + 1,
                                index: i + 1,
                                userAnswer: userAnswer,
                                correctAnswer: sq.answer || sq.reference,
                                isCorrect: true,
                                score: score,
                                isTranslation: isTranslation
                            });
                            
                            // 更新显示样式
                            const input = document.querySelector(`.exam-blank[data-type="rc"][data-paper="${paperIdx}"][data-index="${i}"]`);
                            if (input) {
                                input.classList.add('score-full');
                            }
                            // 做对不显示参考答案
                        } else if (userAnswer.length > 0) {
                            // 需要AI判题，暂不显示样式和参考答案
                            rcItemsNeedAI.push({
                                paperIdx: paperIdx,
                                questionIdx: i,
                                article: q.article,
                                question: sq.text,
                                userAnswer: userAnswer,
                                correctAnswer: sq.answer || sq.reference,
                                isTranslation: isTranslation
                            });
                        } else {
                            // 空答案，0分，更新样式并显示参考答案
                            rcDetails.push({
                                paper: paperIdx + 1,
                                index: i + 1,
                                userAnswer: userAnswer,
                                correctAnswer: sq.answer || sq.reference,
                                isCorrect: false,
                                score: 0,
                                isTranslation: isTranslation
                            });
                            
                            // 更新显示样式（空答案变红）
                            const input = document.querySelector(`.exam-blank[data-type="rc"][data-paper="${paperIdx}"][data-index="${i}"]`);
                            if (input) {
                                input.classList.add('score-zero');
                            }
                            
                            // 显示参考答案
                            const inputP = input ? input.parentElement : null;
                            if (inputP && (sq.answer || sq.reference)) {
                                inputP.insertAdjacentHTML('afterend', 
                                    `<p class="exam-correct-answer">参考答案: ${sq.answer || sq.reference}</p>`);
                            }
                        }
                    }
                }
            }
        }

        // 阶段2：检查作文是否需要AI判题
        let essayScore = 0;
        let essayTotal = 10;
        let essayDetails = {};
        let needEssayGrading = false;
        let essayContent = '';
        let essayQuestion = '';

        if (currentPaper.essay) {
            essayContent = userAnswers.essay;
            essayQuestion = currentPaper.essay.data.content;
            
            if (essayContent.length < 10) {
                essayDetails = { comment: '字数不足' };
            } else {
                needEssayGrading = true;
            }
        }

        // 阶段3：构建批量提示词并调用AI
        if (rcItemsNeedAI.length > 0 || needEssayGrading) {
            try {
                const batchPrompt = buildBatchGradingPrompt(rcItemsNeedAI, essayQuestion, essayContent, needEssayGrading);
                const aiResults = await callBatchAIService(batchPrompt, rcItemsNeedAI.length, needEssayGrading);
                
                // 处理阅读理解AI判题结果
                if (aiResults.rcScores && aiResults.rcScores.length > 0) {
                    rcItemsNeedAI.forEach((item, idx) => {
                        const aiScore = aiResults.rcScores[idx] || 0;
                        rcTotalScore += aiScore;
                        rcDetails.push({
                            paper: item.paperIdx + 1,
                            index: item.questionIdx + 1,
                            userAnswer: item.userAnswer,
                            correctAnswer: item.correctAnswer,
                            isCorrect: aiScore === 2,
                            score: aiScore,
                            isTranslation: item.isTranslation
                        });
                        
                        // AI判题完成后更新显示样式
                        const input = document.querySelector(`.exam-blank[data-type="rc"][data-paper="${item.paperIdx}"][data-index="${item.questionIdx}"]`);
                        if (input) {
                            if (aiScore === 0) {
                                input.classList.add('score-zero');
                            } else if (aiScore === 2) {
                                input.classList.add('score-full');
                            }
                            // aiScore === 1 保持默认样式
                        }
                        
                        // 只有做错（得分<2）才显示参考答案
                        if (aiScore < 2) {
                            const inputP = input ? input.parentElement : null;
                            if (inputP && item.correctAnswer) {
                                inputP.insertAdjacentHTML('afterend', 
                                    `<p class="exam-correct-answer">参考答案: ${item.correctAnswer}</p>`);
                            }
                        }
                    });
                }
                
                // 处理作文AI判题结果
                if (needEssayGrading && aiResults.essayScore !== undefined) {
                    essayScore = aiResults.essayScore;
                    essayDetails = {
                        score: essayScore,
                        sampleAnswer: currentPaper.essay.data.sampleAnswer
                    };
                }
            } catch (e) {
                console.error('批量AI判题失败:', e);
            }
        }

        // 显示作文参考范文
        if (currentPaper.essay && currentPaper.essay.data.sampleAnswer) {
            const essaySection = document.querySelector('.exam-section:last-child .exam-content');
            if (essaySection) {
                essaySection.insertAdjacentHTML('beforeend', `
                    <div class="essay-sample-answer">
                        <p class="essay-sample-title">参考范文：</p>
                        <pre class="essay-sample-content">${currentPaper.essay.data.sampleAnswer}</pre>
                    </div>
                `);
            }
        }

        return {
            rcResult: { score: rcTotalScore, total: rcTotal, details: rcDetails },
            essayResult: { score: essayScore, total: essayTotal, details: essayDetails }
        };
    }

    /**
     * 构建批量判题提示词（只包含题目内容）
     */
    function buildBatchGradingPrompt(rcItems, essayQuestion, essayContent, needEssayGrading) {
        let prompt = '';
        
        // 添加阅读理解题目
        if (rcItems.length > 0) {
            // 按试卷索引(paperIdx)分组，确保同一篇文章的题目在一起
            const paperGroups = {};
            rcItems.forEach((item) => {
                const paperKey = `paper_${item.paperIdx}`;
                if (!paperGroups[paperKey]) {
                    paperGroups[paperKey] = {
                        paperIdx: item.paperIdx,
                        article: item.article,
                        questions: []
                    };
                }
                paperGroups[paperKey].questions.push({
                    question: item.question,
                    correctAnswer: item.correctAnswer,
                    userAnswer: item.userAnswer,
                    isTranslation: item.isTranslation
                });
            });
            
            // 输出每篇阅读理解
            const groupCount = Object.keys(paperGroups).length;
            let globalQuestionIdx = 0;
            
            Object.values(paperGroups).forEach((group, groupIdx) => {
                // 添加分隔标记
                prompt += `═══════════════════════════════════════\n`;
                prompt += `【阅读理解 第${groupIdx + 1}篇】（共${groupCount}篇）\n`;
                prompt += `═══════════════════════════════════════\n\n`;
                
                // 添加文章内容
                if (group.article) {
                    prompt += `【文章内容】\n${group.article}\n\n`;
                }
                
                // 添加该文章的题目
                prompt += `【题目】\n`;
                group.questions.forEach((q, qIdx) => {
                    globalQuestionIdx++;
                    prompt += `\n第${globalQuestionIdx}题${q.isTranslation ? '（翻译题）' : ''}：\n`;
                    prompt += `问题：${q.question}\n`;
                    prompt += `参考答案：${q.correctAnswer}\n`;
                    prompt += `学生答案：${q.userAnswer}\n`;
                });
                
                prompt += `\n`;
            });
        }
        
        // 添加作文
        if (needEssayGrading) {
            prompt += `═══════════════════════════════════════\n`;
            prompt += `【作文题】\n`;
            prompt += `═══════════════════════════════════════\n\n`;
            prompt += `题目要求：${essayQuestion}\n\n`;
            prompt += `学生作文：\n${essayContent}\n`;
        }
        
        return prompt;
    }

    /**
     * 获取系统提示词（包含人设和评分标准）
     * 修改人设和评分标准请在此函数中修改
     */
    function getGradingSystemPrompt(rcCount, needEssayGrading) {
        let systemPrompt = `你是湖北省专升本英语考试的阅卷老师，请按照湖北省专升本英语考试的标准对学生答案进行评分。

`;
        
        // 阅读理解评分标准
        if (rcCount > 0) {
            systemPrompt += `【阅读理解评分标准】（每题满分2分）
- 2分：答案完全正确，语义准确，关键信息完整
- 1分：答案部分正确，理解方向对但表达不完整或有小的语法错误
- 0分：答案错误、不相关或完全偏离题意

【重要说明】
试卷可能包含多篇阅读理解文章，每篇文章后紧跟该文章的题目。
请仔细阅读每篇文章，根据对应文章内容评判该文章下的题目答案。

`;
        }
        
        // 作文评分标准
        if (needEssayGrading) {
            systemPrompt += `【作文评分标准】（满分10分）
- 按照湖北省专升本英语考试的标准来进行评分，不宜用太专业的标准来评判。
- 作文分数只能为整数或者小数为0.5的小数。

`;
        }
        
        // 返回格式要求
        systemPrompt += `【返回格式】
请严格按照以下JSON格式返回评分结果，只返回JSON，不要其他内容：
{
`;
        if (rcCount > 0) {
            systemPrompt += `  "rcScores": [分数1, 分数2, ...],  // 所有阅读理解题目的分数，按题目顺序排列(0-2)
`;
        }
        if (needEssayGrading) {
            systemPrompt += `  "essayScore": 分数  // 作文分数(0-10)
`;
        }
        systemPrompt += `}`;
        
        return systemPrompt;
    }

    /**
     * 调用批量AI服务（多模型并行）
     */
    async function callBatchAIService(prompt, rcCount, needEssayGrading) {
        // 模型配置
        const models = [
            { name: 'GLM', model: 'glm-4.7' },
            { name: 'DeepSeek', model: 'deepseek-v3.1' },
            { name: 'Kimi', model: 'kimi-k2-thinking' },
            { name: 'MiniMax', model: 'MiniMax-M2.1' },
            { name: 'Qwen', model: 'qwen3-max' }
        ];
        
        // 获取系统提示词（包含人设和评分标准）
        const systemPrompt = getGradingSystemPrompt(rcCount, needEssayGrading);
        
        // 并行调用多个模型
        const promises = models.map(async (modelConfig) => {
            try {
                const service = new QwenAIService();
                service.setModel(modelConfig.model);
                const response = await service.sendMessage(prompt, {
                    temperature: 0.3,
                    maxTokens: 500,
                    customSystemPrompt: systemPrompt
                });
                return { model: modelConfig.name, response };
            } catch (e) {
                console.error(`${modelConfig.name} 判题失败:`, e);
                return null;
            }
        });
        
        const results = await Promise.all(promises);
        const validResults = results.filter(r => r !== null);
        
        if (validResults.length === 0) {
            return { rcScores: [], essayScore: 0 };
        }
        
        // 解析各模型结果
        const parsedResults = validResults.map(r => {
            try {
                // 提取JSON
                const jsonMatch = r.response.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0]);
                    return { model: r.model, ...parsed };
                }
            } catch (e) {
                console.error(`解析 ${r.model} 结果失败:`, e);
            }
            return null;
        }).filter(r => r !== null);
        
        if (parsedResults.length === 0) {
            return { rcScores: [], essayScore: 0 };
        }
        
        // 汇总阅读理解分数
        const rcScores = [];
        for (let i = 0; i < rcCount; i++) {
            const scores = parsedResults
                .map(r => r.rcScores && r.rcScores[i])
                .filter(s => s !== undefined && !isNaN(s));
            
            if (scores.length > 0) {
                // 少数服从多数，否则取平均
                const scoreCounts = {};
                scores.forEach(s => {
                    scoreCounts[s] = (scoreCounts[s] || 0) + 1;
                });
                
                let majorityScore = null;
                for (const [score, count] of Object.entries(scoreCounts)) {
                    if (count >= 2) {
                        majorityScore = parseInt(score);
                        break;
                    }
                }
                
                rcScores.push(majorityScore !== null ? majorityScore : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length));
            } else {
                rcScores.push(0);
            }
        }
        
        // 汇总作文分数
        let essayScore = 0;
        if (needEssayGrading) {
            const essayScores = parsedResults
                .map(r => r.essayScore)
                .filter(s => s !== undefined && !isNaN(s));
            
            if (essayScores.length > 0) {
                essayScore = Math.round(essayScores.reduce((a, b) => a + b, 0) / essayScores.length);
                essayScore = Math.min(10, Math.max(0, essayScore));
            }
        }
        
        return { rcScores, essayScore };
    }

    /**
     * 检查答案是否正确（支持多答案用/分隔）
     */
    function checkAnswer(userAnswer, correctAnswer) {
        if (!correctAnswer) return false;
        
        const user = userAnswer.toLowerCase().trim();
        const correctOptions = correctAnswer.toLowerCase().split('/').map(s => s.trim());
        
        return correctOptions.some(option => user === option);
    }

    /**
     * 显示结果
     */
    function showResults(scores) {
        // 计算总分
        const totalScore = scores.grammar.score + scores.sentence.score + 
                          scores.reading.score + scores.rc.score + 
                          scores.translation.score + scores.essay.score;
        const maxScore = scores.grammar.total + scores.sentence.total + 
                        scores.reading.total + scores.rc.total + 
                        scores.translation.total + scores.essay.total;

        // 更新总分显示
        if (elements.scoreTotal) {
            elements.scoreTotal.textContent = `${totalScore}`;
        }

        // 更新分项得分
        if (elements.scoreDetails) {
            elements.scoreDetails.innerHTML = `
                <div class="exam-score-item">
                    <div class="exam-score-item-title">一、语法填空</div>
                    <div class="exam-score-item-value">${scores.grammar.score}/${scores.grammar.total}</div>
                </div>
                <div class="exam-score-item">
                    <div class="exam-score-item-title">二、连词成句</div>
                    <div class="exam-score-item-value">${scores.sentence.score}/${scores.sentence.total}</div>
                </div>
                                    <div class="exam-score-item">
                                    <div class="exam-score-item-title">三、阅读填空</div>                    <div class="exam-score-item-value">${scores.reading.score}/${scores.reading.total}</div>
                </div>
                <div class="exam-score-item">
                    <div class="exam-score-item-title">四、阅读理解</div>
                    <div class="exam-score-item-value">${scores.rc.score}/${scores.rc.total}</div>
                </div>
                <div class="exam-score-item">
                    <div class="exam-score-item-title">五、翻译填空</div>
                    <div class="exam-score-item-value">${scores.translation.score}/${scores.translation.total}</div>
                </div>
                <div class="exam-score-item">
                    <div class="exam-score-item-title">六、写作</div>
                    <div class="exam-score-item-value">${scores.essay.score}/${scores.essay.total}</div>
                </div>
            `;
        }

        // 收集各题型解析内容
        const explanations = {
            grammar: '',
            sentence: '',
            reading1: '',
            reading2: '',
            rc1: '',
            rc2: '',
            translation: '',
            essay: ''
        };
        
        // 语法填空解析
        if (currentPaper.grammar && currentPaper.grammar.data.explanation) {
            explanations.grammar = `<pre>${currentPaper.grammar.data.explanation}</pre>`;
        }
        
        // 连词成句解析
        if (currentPaper.sentences && currentPaper.sentences.length > 0) {
            let sentenceHtml = '';
            currentPaper.sentences.forEach((item, idx) => {
                if (item.data.explanation) {
                    sentenceHtml += `<p><strong>第${idx + 1}题：</strong>${item.data.explanation}</p>`;
                }
            });
            explanations.sentence = sentenceHtml;
        }
        
        // 阅读填空解析 - 分开显示
        if (currentPaper.reading && currentPaper.reading.length > 0) {
            if (currentPaper.reading[0] && currentPaper.reading[0].data.explanation) {
                explanations.reading1 = `<pre>${currentPaper.reading[0].data.explanation}</pre>`;
            }
            if (currentPaper.reading[1] && currentPaper.reading[1].data.explanation) {
                explanations.reading2 = `<pre>${currentPaper.reading[1].data.explanation}</pre>`;
            }
        }
        
        // 阅读理解解析 - 分开显示
        if (currentPaper.rc && currentPaper.rc.length > 0) {
            if (currentPaper.rc[0] && currentPaper.rc[0].data.explanation) {
                explanations.rc1 = `<pre>${currentPaper.rc[0].data.explanation}</pre>`;
            }
            if (currentPaper.rc[1] && currentPaper.rc[1].data.explanation) {
                explanations.rc2 = `<pre>${currentPaper.rc[1].data.explanation}</pre>`;
            }
        }
        
        // 翻译填空解析
        if (currentPaper.translation && currentPaper.translation.data.explanation) {
            explanations.translation = `<pre>${currentPaper.translation.data.explanation}</pre>`;
        }
        
        // 写作解析
        if (currentPaper.essay && currentPaper.essay.data.explanation) {
            explanations.essay = `<pre>${currentPaper.essay.data.explanation}</pre>`;
        }

        // 存储解析内容到全局变量
        window.examExplanations = explanations;
        
        // 显示第一个有内容的解析
        showExplanationTab('grammar');

        // 绑定标签切换事件
        bindExplanationTabs();

        // 显示结果区域
        if (elements.resultArea) {
            elements.resultArea.classList.add('active');
        }

        // 更新按钮状态
        if (elements.submitBtn) {
            elements.submitBtn.textContent = '已提交';
        }

        // 启用文字选中功能
        enableTextSelection();
        
        // 滚动到结果区域
        if (elements.resultArea) {
            elements.resultArea.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * 显示指定题型的解析内容
     */
    function showExplanationTab(tabName) {
        const content = document.getElementById('examExplanationContent');
        const tabs = document.querySelectorAll('.exam-tab-btn');
        
        if (!content || !window.examExplanations) return;
        
        // 更新标签激活状态
        tabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // 显示对应内容
        let html = window.examExplanations[tabName] || '';
        if (!html) {
            html = '<div class="no-content">该题型暂无解析内容</div>';
        }
        content.innerHTML = html;
    }

    /**
     * 绑定解析标签切换事件
     */
    function bindExplanationTabs() {
        const tabs = document.querySelectorAll('.exam-tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                showExplanationTab(this.dataset.tab);
            });
        });
        
        // 绑定查看答案解析按钮事件
        const viewBtn = document.getElementById('examViewExplanationBtn');
        const body = document.getElementById('examExplanationBody');
        if (viewBtn && body) {
            viewBtn.addEventListener('click', function() {
                const isActive = body.classList.toggle('active');
                this.classList.toggle('active', isActive);
                
                // 更新按钮文本和图标
                const iconEl = this.querySelector('.btn-icon');
                const textEl = this.querySelector('.btn-text');
                if (iconEl) {
                    iconEl.textContent = isActive ? '▲' : '▼';
                }
                if (textEl) {
                    textEl.textContent = isActive ? '收起答案解析' : '查看答案解析';
                }
                
                // 如果展开，滚动到解析区域
                if (isActive) {
                    setTimeout(() => {
                        body.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            });
        }
    }

    // 翻译相关变量
    let isTranslating = false;
    let examTooltip = null;

    /**
     * 启用文字选中功能并绑定翻译事件
     */
    function enableTextSelection() {
        // 为试卷覆盖层添加选中允许类
        if (elements.overlay) {
            elements.overlay.classList.add('exam-selectable');
        }
        
        // 为试卷内容区域添加选中样式
        const contentAreas = document.querySelectorAll('.exam-content, .exam-article, .exam-summary, .exam-section');
        contentAreas.forEach(area => {
            area.style.cursor = 'text';
        });
        
        // 绑定选中翻译事件（使用事件捕获，确保能捕获到）
        if (elements.overlay) {
            elements.overlay.addEventListener('mouseup', handleExamMouseUp);
            elements.overlay.addEventListener('click', handleOverlayClick);
            // 屏蔽右键菜单
            elements.overlay.addEventListener('contextmenu', handleContextMenu);
        }
    }

    /**
     * 处理鼠标抬起事件
     */
    function handleExamMouseUp(e) {
        // 如果点击的是气泡框或拖拽条，不处理
        if (examTooltip && examTooltip.contains(e.target)) {
            return;
        }
        if (e.target.classList && e.target.classList.contains('exam-tooltip-drag-handle')) {
            return;
        }

        // 检查是否在试卷内容区域内
        const contentArea = e.target.closest('.exam-content, .exam-article, .exam-summary, .exam-section');
        if (contentArea) {
            const selection = window.getSelection();
            // 只有当有选中文本时才阻止默认行为，防止迷你菜单弹出
            if (selection.toString().trim()) {
                e.preventDefault();
                // 显示翻译气泡
                showTooltipForSelection(selection);
            }
        }
    }

    /**
     * 为选中文本显示翻译气泡
     */
    function showTooltipForSelection(selection) {
        let selectedText = '';
        try {
            selectedText = selection.toString().trim();
        } catch (err) {
            return;
        }

        if (!selectedText || selectedText.length < 1) {
            hideExamTooltip();
            return;
        }

        // 检查选区是否在试卷区域内
        let range;
        try {
            if (selection.rangeCount === 0) return;
            range = selection.getRangeAt(0);
        } catch (err) {
            return;
        }

        if (!range.commonAncestorContainer || !elements.overlay.contains(range.commonAncestorContainer)) {
            hideExamTooltip();
            return;
        }

        // 获取选中文本位置
        const rect = getSelectionBoundingRect(range);
        if (!rect) return;

        // 显示翻译气泡
        if (!isTranslating) {
            showExamTooltip(rect, selectedText);
        }
    }

    /**
     * 处理右键菜单事件
     */
    function handleContextMenu(e) {
        // 检查是否在试卷内容区域内
        const contentArea = e.target.closest('.exam-content, .exam-article, .exam-summary, .exam-section');
        if (contentArea) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    /**
     * 处理点击事件（用于隐藏气泡框）
     */
    function handleOverlayClick(e) {
        // 如果点击的是气泡框或拖拽条，不处理
        if (examTooltip && examTooltip.contains(e.target)) {
            return;
        }
        if (e.target.classList && e.target.classList.contains('exam-tooltip-drag-handle')) {
            return;
        }
        
        // 检查是否有选中文本
        const selection = window.getSelection();
        if (selection && selection.toString().trim()) {
            return; // 有选中文本，不隐藏气泡框
        }
        
        // 没有选中文本，隐藏气泡框
        hideExamTooltip();
    }

    /**
     * 获取选区的边界矩形
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

    /**
     * 显示翻译气泡框
     */
    async function showExamTooltip(rect, text) {
        if (isTranslating) return;
        isTranslating = true;
        
        let translationHTML = '';
        
        try {
            const translation = await translateExamText(text);
            const translatedParagraphs = translation.split('\n').filter(p => p.trim());
            translationHTML = translatedParagraphs.map(p => 
                `<div class="exam-tooltip-para">${escapeHtml(p)}</div>`
            ).join('');
        } catch (error) {
            console.error('翻译失败:', error);
            translationHTML = `<div class="exam-tooltip-error">翻译失败: ${escapeHtml(error.message || '请稍后重试')}</div>`;
        }
        
        // 创建或获取气泡框
        if (!examTooltip) {
            examTooltip = createExamTooltip();
            document.body.appendChild(examTooltip);
        }

        // 清除之前拖拽留下的样式
        examTooltip.style.minWidth = '';
        examTooltip.style.transform = '';
        examTooltip.style.willChange = 'auto';

        // 查找或创建内容容器
        let contentContainer = examTooltip.querySelector('.exam-tooltip-content-container');
        if (!contentContainer) {
            contentContainer = document.createElement('div');
            contentContainer.className = 'exam-tooltip-content-container';
            examTooltip.appendChild(contentContainer);
            
            // 阻止在气泡内滚动时影响外部页面
            contentContainer.addEventListener('wheel', (e) => {
                e.stopPropagation();
                
                const { scrollTop, scrollHeight, clientHeight } = contentContainer;
                const atTop = scrollTop <= 0;
                const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
                
                // 滚动到边界时阻止默认行为
                if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            // 初始设置cursor为grab
            contentContainer.style.cursor = 'grab';
            
            // 添加手动拖动滑动功能
            let isDraggingScroll = false;
            let startY = 0;
            let scrollTop = 0;
            
            contentContainer.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return;
                
                isDraggingScroll = true;
                startY = e.clientY;
                scrollTop = contentContainer.scrollTop;
                contentContainer.style.cursor = 'grabbing';
                e.preventDefault();
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isDraggingScroll) return;
                
                const deltaY = e.clientY - startY;
                contentContainer.scrollTop = scrollTop - deltaY;
            });
            
            document.addEventListener('mouseup', () => {
                if (isDraggingScroll) {
                    isDraggingScroll = false;
                    contentContainer.style.cursor = 'grab';
                }
            });
        }

        // 生成原文区域
        const originalParagraphs = text.split('\n').filter(p => p.trim());
        const originalHTML = originalParagraphs.map(p => 
            `<div class="exam-tooltip-para">${escapeHtml(p)}</div>`
        ).join('');
        
        // 显示原文和译文
        contentContainer.innerHTML = `
            <div class="exam-tooltip-content">
                <div class="exam-tooltip-original-section">${originalHTML}</div>
                <div class="exam-tooltip-translation-section">${translationHTML}</div>
            </div>
        `;
        
        // 显示气泡框以获取实际尺寸
        examTooltip.style.display = 'block';
        examTooltip.style.left = '0';
        examTooltip.style.top = '0';

        // 等待DOM更新后获取实际尺寸
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        // 获取气泡框实际尺寸
        const tooltipRect = examTooltip.getBoundingClientRect();
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;
        
        // 在气泡位置设置完成后，滚动到底部让用户看到译文（用户无感知）
        contentContainer.scrollTop = contentContainer.scrollHeight;
        
        // 计算位置（使用实际尺寸）
        const arrowSize = 10;
        const offsetTop = 15;
        const padding = 10;

        // 计算水平位置（居中显示）
        let left = rect.left + rect.width / 2 - tooltipWidth / 2;
        
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
        }

        examTooltip.style.left = left + 'px';
        examTooltip.style.top = top + 'px';
        
        isTranslating = false;
    }

    /**
     * 隐藏翻译气泡框
     */
    function hideExamTooltip() {
        if (examTooltip) {
            examTooltip.style.display = 'none';
            const contentContainer = examTooltip.querySelector('.exam-tooltip-content-container');
            if (contentContainer) {
                contentContainer.innerHTML = '';
            }
        }
    }

    /**
     * 创建翻译气泡框元素
     */
    function createExamTooltip() {
        const tooltip = document.createElement('div');
        tooltip.id = 'examTranslationTooltip';
        
        // 根据当前主题添加对应的类名
        let tooltipClass = 'exam-translation-tooltip';
        if (currentTheme === 'neumorphism') {
            tooltipClass += ' exam-tooltip-neumorphism';
        }
        tooltip.className = tooltipClass;
        
        // 创建拖拽条
        const dragHandle = document.createElement('div');
        dragHandle.className = 'exam-tooltip-drag-handle';
        tooltip.appendChild(dragHandle);
        
        // 创建内容容器
        const contentContainer = document.createElement('div');
        contentContainer.className = 'exam-tooltip-content-container';
        tooltip.appendChild(contentContainer);
        
        // 阻止在气泡内滚动时影响外部页面
        contentContainer.addEventListener('wheel', (e) => {
            e.stopPropagation();
            
            const { scrollTop, scrollHeight, clientHeight } = contentContainer;
            const atTop = scrollTop <= 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
            
            // 滚动到边界时阻止默认行为
            if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // 同时在tooltip上也添加wheel事件作为后备
        tooltip.addEventListener('wheel', (e) => {
            e.stopPropagation();
            e.preventDefault();
        }, { passive: false });
        
        // 初始设置cursor为grab
        contentContainer.style.cursor = 'grab';
        
        // 添加手动拖动滑动功能（类似手机触控滑动）
        let isDraggingScroll = false;
        let startY = 0;
        let scrollTop = 0;
        
        contentContainer.addEventListener('mousedown', (e) => {
            // 只响应左键
            if (e.button !== 0) return;
            
            isDraggingScroll = true;
            startY = e.clientY;
            scrollTop = contentContainer.scrollTop;
            contentContainer.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDraggingScroll) return;
            
            const deltaY = e.clientY - startY;
            contentContainer.scrollTop = scrollTop - deltaY;
        });
        
        document.addEventListener('mouseup', () => {
            if (isDraggingScroll) {
                isDraggingScroll = false;
                contentContainer.style.cursor = 'grab';
            }
        });
        
        // 添加拖拽功能
        setupExamTooltipDrag(tooltip, dragHandle);
        
        return tooltip;
    }

    /**
     * 设置气泡框拖拽功能
     */
    function setupExamTooltipDrag(tooltip, dragHandle) {
        let isDragging = false;
        let startX, startY;
        let initialLeft, initialTop;
        let tooltipWidth = 0;
        let tooltipHeight = 0;
        let lastValidLeft = 0;
        let lastValidTop = 0;
        
        const startDrag = (e) => {
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            startX = clientX;
            startY = clientY;
            
            const computedStyle = window.getComputedStyle(tooltip);
            initialLeft = parseInt(computedStyle.left) || tooltip.offsetLeft;
            initialTop = parseInt(computedStyle.top) || tooltip.offsetTop;
            
            lastValidLeft = initialLeft;
            lastValidTop = initialTop;
            
            const rect = tooltip.getBoundingClientRect();
            tooltipWidth = rect.width;
            tooltipHeight = rect.height;
            
            tooltip.style.minWidth = tooltipWidth + 'px';
            tooltip.style.willChange = 'transform';
            
            isDragging = true;
            tooltip.classList.add('tooltip-dragging');
            
            e.preventDefault();
            e.stopPropagation();
        };
        
        const doDrag = (e) => {
            if (!isDragging) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            const maxLeft = window.innerWidth - tooltipWidth;
            const maxTop = window.innerHeight - tooltipHeight;
            
            const newLeft = Math.max(10, Math.min(initialLeft + (clientX - startX), maxLeft - 10));
            const newTop = Math.max(10, Math.min(initialTop + (clientY - startY), maxTop - 10));
            
            lastValidLeft = newLeft;
            lastValidTop = newTop;
            
            tooltip.style.transform = `translate(${newLeft - initialLeft}px, ${newTop - initialTop}px)`;
        };
        
        const endDrag = (e) => {
            if (!isDragging) return;
            
            isDragging = false;
            tooltip.classList.remove('tooltip-dragging');
            tooltip.classList.add('tooltip-dragged');
            
            tooltip.style.willChange = 'auto';
            tooltip.style.left = lastValidLeft + 'px';
            tooltip.style.top = lastValidTop + 'px';
            tooltip.style.transform = '';
            tooltip.style.minWidth = '';
        };
        
        dragHandle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', endDrag);
        
        dragHandle.addEventListener('touchstart', startDrag, { passive: false });
        document.addEventListener('touchmove', doDrag, { passive: false });
        document.addEventListener('touchend', endDrag);
    }

    /**
     * 翻译文本
     */
    async function translateExamText(text) {
        if (window.baiduTranslateService) {
            return await window.baiduTranslateService.translate(text, 'auto', 'zh');
        }
        throw new Error('翻译服务未加载');
    }

    /**
     * HTML转义
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 初始化作文词数统计
    function initWordCount() {
        const textarea = document.querySelector('.exam-essay-textarea');
        const wordCountEl = document.getElementById('examWordCount');
        
        if (textarea && wordCountEl) {
            textarea.addEventListener('input', function() {
                const text = this.value.trim();
                const words = text ? text.split(/\s+/).length : 0;
                wordCountEl.textContent = words;
            });
        }
    }

    // 公开方法
    return {
        init: init,
        openExam: openExam,
        closeExam: closeExam,
        generatePaper: generatePaper
    };
})();

// 在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化，确保其他模块先加载
    setTimeout(() => {
        ExamModule.init();
    }, 100);
});
