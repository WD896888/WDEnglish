# WDEnglish - 英语练习题项目文档

## 1. 项目概述

WDEnglish 是一个基于 Web 的英语学习练习平台，专注于"连词成句"类型的英语语法练习。项目采用现代化的 UI 设计，提供交互式的单词拖拽排序功能，帮助学生通过实际操作掌握英语句子结构和语法规则。

### 1.1 项目特点

- **交互式学习**：通过拖拽单词卡片来组织句子，增强学习体验
- **即时反馈**：提交答案后立即显示正确与否，并提供详细的语法解析
- **进度保存**：使用本地存储自动保存学习进度，方便用户随时继续
- **响应式设计**：适配桌面端和移动端设备
- **丰富的题库**：包含 100 道精心设计的连词成句题目，涵盖多种语法点
- **视觉反馈**：通过动画和颜色变化提供直观的操作反馈

### 1.2 核心功能

- 连词成句练习（已实现）
- 语法填空（待开发）
- 英文翻译（待开发）
- 英语短文（待开发）
- 英语作文（待开发）

## 2. 文件结构说明

```
WDEnglish-main/
├── index.html          # 主页面 HTML 文件
├── style.css           # 样式表文件
├── script.js           # JavaScript 逻辑文件
└── README.md           # 项目文档（本文件）
```

## 3. 各文件功能详解

### 3.1 index.html - 页面结构

**文件路径**: [index.html](file:///d:/浏览器/WDEnglish-main/index.html)

#### 3.1.1 文件结构概览

index.html 是项目的入口文件，采用语义化的 HTML5 结构，包含以下主要部分：

1. **背景装饰层**（第 11-17 行）
   - 包含 5 个浮动气泡元素，通过 CSS 动画实现动态效果
   - 使用 `pointer-events: none` 确保不干扰用户交互

2. **主容器**（第 19-89 行）
   - 包含头部、菜单、练习卡片等核心内容
   - 使用相对定位和 z-index 确保内容层级正确

3. **头部区域**（第 20-26 行）
   - 标题：包含图标和主标题
   - 副标题：提供项目口号

4. **功能菜单**（第 28-53 行）
   - 5 个菜单项，目前只有"连词成句"功能可用
   - 其他功能标记为 disabled 状态，显示"更多功能敬请期待"

5. **练习卡片**（第 55-88 行）
   - 卡片头部：显示当前功能名称和进度指示器
   - 单词容器：动态加载单词卡片
   - 操作按钮：上一题、检查答案、下一题
   - 结果显示区域：显示答案正确与否
   - 解析区域：显示语法解析

#### 3.1.2 关键 HTML 元素

| 元素 ID | 用途 | 交互方式 |
|---------|------|----------|
| `wordsContainer` | 单词卡片容器 | 拖拽排序 |
| `checkBtn` | 检查答案按钮 | 点击事件 |
| `prevBtn` | 上一题按钮 | 点击事件 |
| `nextBtn` | 下一题按钮 | 点击事件 |
| `result` | 结果显示区域 | 动态更新 |
| `explanation` | 解析显示区域 | 动态更新 |
| `questionNumber` | 当前题号 | 动态更新 |
| `totalQuestions` | 总题数 | 初始化时设置 |

### 3.2 style.css - 样式设计

**文件路径**: [style.css](file:///d:/浏览器/WDEnglish-main/style.css)

#### 3.2.1 设计理念

项目采用 **Neumorphism（新拟态）** 设计风格，结合柔和的渐变色和阴影效果，创造出现代、友好的视觉体验。

#### 3.2.2 核心样式模块

##### 1. 全局样式（第 1-15 行）

```css
body {
    background: linear-gradient(135deg, #e3edf7 0%, #d4e6f9 50%, #e8f0f8 100%);
    color: #4a6fa5;
    font-family: 'Nunito', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
```

- 使用蓝紫色系渐变背景，营造学习氛围
- 字体优先使用 Nunito（英文），回退到中文字体
- 设置最小高度和 overflow 属性确保页面布局稳定

##### 2. 背景装饰气泡（第 17-94 行）

- 5 个不同大小和位置的气泡元素
- 使用 `@keyframes float` 实现浮动动画
- 通过 `animation-delay` 实现错落有致的动画效果
- 使用 `radial-gradient` 创建立体感

##### 3. 菜单样式（第 148-217 行）

```css
.menu-item {
    background: linear-gradient(135deg, #e3edf7, #d4e6f9);
    box-shadow: 6px 6px 12px #b8bec8, -6px -6px 12px #ffffff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

- 使用双阴影实现新拟态效果
- 悬停时向上移动并增强阴影
- active 状态使用渐变背景突出显示
- disabled 状态使用内阴影表示不可点击

##### 4. 单词卡片样式（第 312-358 行）

```css
.word-item {
    cursor: move;
    user-select: none;
    box-shadow: 5px 5px 10px #b8bec8, -5px -5px 10px #ffffff;
}

.word-item.dragging {
    transform: translateY(-5px) scale(1.1) rotate(2deg);
    z-index: 100;
}

.word-item.drag-over {
    background: linear-gradient(135deg, #7aa8d6, #5d8ab8);
    color: #ffffff;
}
```

- 拖拽时放大、旋转并提升层级
- 拖拽悬停时改变背景色提示可放置
- 使用 `cubic-bezier` 实现平滑过渡

##### 5. 结果显示样式（第 439-476 行）

```css
.result.correct {
    background: linear-gradient(135deg, #d4edda, #c3e6cb);
    color: #155724;
    animation: successPulse 0.5s ease-out;
}

.result.incorrect {
    background: linear-gradient(135deg, #f8d7da, #f5c6cb);
    color: #721c24;
    animation: shake 0.5s ease-out;
}
```

- 正确答案使用绿色系，带有脉冲动画
- 错误答案使用红色系，带有抖动动画
- 通过动画增强用户反馈

##### 6. 响应式设计（第 522-621 行）

```css
@media (max-width: 768px) {
    .menu {
        flex-direction: column;
        align-items: center;
    }
    
    .actions {
        flex-direction: column;
        align-items: center;
    }
}
```

- 平板端（≤768px）：菜单和按钮垂直排列
- 手机端（≤480px）：进一步缩小字体和间距
- 小屏幕隐藏背景气泡以提升性能

#### 3.2.3 动画效果

| 动画名称 | 用途 | 持续时间 |
|---------|------|----------|
| `float` | 气泡浮动 | 20s |
| `bounce` | 标题图标跳动 | 2s |
| `fadeInDown` | 头部淡入 | 0.8s |
| `fadeInUp` | 菜单淡入 | 0.8s |
| `scaleIn` | 卡片缩放进入 | 0.6s |
| `pulse` | 说明图标脉冲 | 2s |
| `successPulse` | 正确答案脉冲 | 0.5s |
| `shake` | 错误答案抖动 | 0.5s |

### 3.3 script.js - 核心逻辑

**文件路径**: [script.js](file:///d:/浏览器/WDEnglish-main/script.js)

#### 3.3.1 数据结构

##### 1. 题库数据（第 2-124 行）

```javascript
const questions = [
    {
        words: ["the source of", "is", "water","life"],
        answer: "Water is the source of life.",
        explanation: "老师点拨：考查名词性表语和介词短语作定语..."
    },
    // ... 共 100 道题目
];
```

每道题目包含：
- `words`: 打乱顺序的单词数组
- `answer`: 正确的完整句子
- `explanation`: 语法解析和知识点讲解

##### 2. 状态变量（第 127-130 行）

```javascript
let currentQuestionIndex = 0;  // 当前题目索引
let currentWords = [];          // 当前单词数组
let dragSrcElement = null;      // 当前拖拽元素
```

##### 3. DOM 元素引用（第 135-143 行）

```javascript
const wordsContainer = document.getElementById('wordsContainer');
const checkBtn = document.getElementById('checkBtn');
// ... 其他元素引用
```

#### 3.3.2 核心功能模块

##### 1. 初始化流程（第 145-162 行）

```javascript
document.addEventListener('DOMContentLoaded', () => {
    totalQuestionsEl.textContent = questions.length;
    const progressRestored = loadProgress();
    if (progressRestored) {
        console.log('进度已恢复到第', currentQuestionIndex + 1, '题');
    }
    loadQuestion();
    checkBtn.addEventListener('click', checkAnswer);
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);
});
```

**执行流程**：
1. 设置总题数
2. 尝试从本地存储恢复进度
3. 加载当前题目
4. 绑定按钮事件监听器

##### 2. 题目加载（第 164-185 行）

```javascript
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    currentWords = [...question.words];  // 深拷贝避免修改原数据
    shuffleArray(currentWords);          // 随机打乱顺序
    renderWords();                        // 渲染单词卡片
    resultDiv.textContent = '';
    resultDiv.className = 'result';
    explanationDiv.textContent = '';
    explanationDiv.className = 'explanation';
    questionNumberEl.textContent = currentQuestionIndex + 1;
}
```

**关键点**：
- 使用扩展运算符 `[...question.words]` 进行数组深拷贝
- 每次加载题目时清空结果和解析显示
- 更新当前题号显示

##### 3. 单词渲染（第 187-213 行）

```javascript
function renderWords() {
    wordsContainer.innerHTML = '';
    currentWords.forEach((word, index) => {
        if (word.trim() !== '') {
            const wordElement = document.createElement('div');
            wordElement.className = 'word-item';
            wordElement.textContent = word;
            wordElement.setAttribute('draggable', 'true');
            wordElement.setAttribute('data-index', index);
            
            wordElement.addEventListener('dragstart', handleDragStart);
            wordElement.addEventListener('dragend', handleDragEnd);
            wordElement.addEventListener('dragover', handleDragOver);
            wordElement.addEventListener('dragenter', handleDragEnter);
            wordElement.addEventListener('dragleave', handleDragLeave);
            wordElement.addEventListener('drop', handleDrop);
            
            wordsContainer.appendChild(wordElement);
        }
    });
}
```

**实现思路**：
- 清空容器后重新创建所有单词元素
- 为每个单词元素绑定完整的拖拽事件
- 使用 `data-index` 属性存储原始索引
- 跳过空字符串避免渲染空白元素

##### 4. 洗牌算法（第 215-221 行）

```javascript
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
```

**算法说明**：
- 使用 Fisher-Yates 洗牌算法
- 时间复杂度：O(n)
- 空间复杂度：O(1)（原地交换）
- 保证每个排列出现的概率相等

##### 5. 拖拽实现（第 223-309 行）

**拖拽事件处理流程**：

```javascript
// 拖拽开始
function handleDragStart(e) {
    dragSrcElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    this.classList.add('dragging');
    playSound('drag');
}

// 拖拽结束
function handleDragEnd() {
    this.classList.remove('dragging');
    dragSrcElement = null;
    // 清理所有 drag-over 状态
}

// 拖拽悬停
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();  // 必须调用以允许放置
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

// 进入目标区域
function handleDragEnter() {
    if (!this.classList.contains('drag-over')) {
        this.classList.add('drag-over');
    }
}

// 离开目标区域
function handleDragLeave() {
    this.classList.remove('drag-over');
}

// 放置处理
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (dragSrcElement !== this && dragSrcElement) {
        const wordElements = Array.from(wordsContainer.children);
        const fromIndex = wordElements.indexOf(dragSrcElement);
        const toIndex = wordElements.indexOf(this);
        
        // 交换数组中的元素
        [currentWords[fromIndex], currentWords[toIndex]] = [currentWords[toIndex], currentWords[fromIndex]];
        
        // 在 DOM 中交换元素位置
        const nextSibling = this.nextSibling;
        const parent = this.parentNode;
        
        if (fromIndex < toIndex) {
            parent.insertBefore(dragSrcElement, nextSibling);
        } else {
            parent.insertBefore(dragSrcElement, this);
        }
        
        playSound('drop');
    }
    
    this.classList.remove('drag-over');
    return false;
}
```

**技术要点**：
- 使用 HTML5 Drag and Drop API
- 通过 `preventDefault()` 允许放置操作
- 同时更新数据数组和 DOM 结构
- 使用 `insertBefore` 实现高效的 DOM 操作
- 避免重复添加 `drag-over` 类

##### 6. 答案检查（第 311-346 行）

```javascript
function checkAnswer() {
    const userAnswer = getCurrentOrder().join(' ').trim();
    const correctAnswer = questions[currentQuestionIndex].answer;
    
    // 移除标点符号进行比较
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
        saveProgress();  // 答对时保存进度
    } else {
        resultDiv.textContent = `❌ 答案错误。正确答案是：${correctAnswer}`;
        resultDiv.classList.add('incorrect');
        
        const explanation = questions[currentQuestionIndex].explanation;
        if (explanation && explanation.trim() !== '') {
            explanationDiv.textContent = explanation;
            explanationDiv.classList.add('visible');
        }
        
        playSound('wrong');
    }
}
```

**检查逻辑**：
1. 获取当前单词顺序并拼接成句子
2. 移除标点符号进行比较（更宽松的匹配）
3. 使用 `toLowerCase()` 实现不区分大小写的比较
4. 正确时播放成功动画并保存进度
5. 错误时显示正确答案和语法解析

##### 7. 获取当前顺序（第 348-352 行）

```javascript
function getCurrentOrder() {
    const wordElements = wordsContainer.querySelectorAll('.word-item');
    return Array.from(wordElements).map(el => el.textContent.trim());
}
```

**实现思路**：
- 从 DOM 中获取所有单词元素
- 按照当前显示顺序提取文本内容
- 返回单词数组用于答案比较

##### 8. 题目导航（第 354-368 行）

```javascript
function prevQuestion() {
    currentQuestionIndex = (currentQuestionIndex - 1 + questions.length) % questions.length;
    loadQuestion();
    saveProgress();
    playSound('prev');
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    loadQuestion();
    saveProgress();
    playSound('next');
}
```

**循环导航**：
- 使用模运算实现循环浏览
- 到达最后一题后回到第一题
- 每次切换题目都保存进度

##### 9. 成功庆祝动画（第 377-393 行）

```javascript
function celebrateSuccess() {
    const correctWords = document.querySelectorAll('.word-item');
    correctWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.transform = 'scale(1.1)';
            word.style.background = 'linear-gradient(135deg, #7aa8d6, #5d8ab8)';
            word.style.color = '#ffffff';
            
            setTimeout(() => {
                word.style.transform = '';
                word.style.background = '';
                word.style.color = '';
            }, 300);
        }, index * 100);
    });
}
```

**动画效果**：
- 依次放大每个单词卡片
- 改变背景色和文字颜色
- 使用 `setTimeout` 创建波浪效果
- 300ms 后恢复原状

##### 10. 键盘快捷键（第 395-404 行）

```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    } else if (e.key === 'ArrowLeft') {
        prevQuestion();
    } else if (e.key === 'ArrowRight') {
        nextQuestion();
    }
});
```

**快捷键映射**：
- `Enter`: 检查答案
- `ArrowLeft`: 上一题
- `ArrowRight`: 下一题

##### 11. 进度管理（第 406-443 行）

```javascript
// 保存进度
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

// 恢复进度
function loadProgress() {
    try {
        const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (savedProgress) {
            const progressData = JSON.parse(savedProgress);
            if (progressData.currentQuestionIndex !== undefined &&
                progressData.currentQuestionIndex >= 0 &&
                progressData.currentQuestionIndex < questions.length) {
                currentQuestionIndex = progressData.currentQuestionIndex;
                return true;
            }
        }
    } catch (error) {
        console.error('恢复进度失败:', error);
    }
    return false;
}

// 清除进度
function clearProgress() {
    try {
        localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch (error) {
        console.error('清除进度失败:', error);
    }
}
```

**存储策略**：
- 使用 `localStorage` 保存进度
- 存储当前题目索引和时间戳
- 添加边界检查确保索引有效
- 使用 try-catch 处理存储异常

##### 12. 音效播放（第 370-375 行）

```javascript
function playSound(type) {
    console.log(`Playing ${type} sound`);
}
```

**当前状态**：
- 目前仅为占位符函数
- 可扩展为使用 Web Audio API 或 HTML5 Audio
- 支持的音效类型：drag, drop, correct, wrong, prev, next

#### 3.3.3 代码架构总结

```
script.js
├── 数据层
│   ├── questions (题库数据)
│   └── 状态变量 (currentQuestionIndex, currentWords, dragSrcElement)
├── DOM 层
│   └── 元素引用 (wordsContainer, buttons, result divs)
├── 初始化层
│   └── DOMContentLoaded 事件处理
├── 核心功能层
│   ├── loadQuestion() - 加载题目
│   ├── renderWords() - 渲染单词
│   ├── shuffleArray() - 洗牌算法
│   ├── checkAnswer() - 检查答案
│   └── getCurrentOrder() - 获取顺序
├── 交互层
│   ├── 拖拽事件处理 (6 个函数)
│   ├── 按钮事件处理 (3 个函数)
│   └── 键盘事件处理
├── 辅助层
│   ├── celebrateSuccess() - 庆祝动画
│   ├── playSound() - 音效播放
│   └── 进度管理 (3 个函数)
```

## 4. 技术栈说明

### 4.1 前端技术

| 技术 | 版本 | 用途 |
|------|------|------|
| HTML5 | - | 页面结构和语义化标签 |
| CSS3 | - | 样式设计和动画效果 |
| JavaScript (ES6+) | - | 交互逻辑和数据处理 |
| Web Fonts | - | Google Fonts (Nunito) |

### 4.2 核心技术特性

#### 4.2.1 HTML5 Drag and Drop API

项目使用 HTML5 原生拖拽 API 实现单词排序功能：

- `dragstart`: 开始拖拽
- `dragend`: 结束拖拽
- `dragover`: 拖拽悬停
- `dragenter`: 进入目标区域
- `dragleave`: 离开目标区域
- `drop`: 放置元素

#### 4.2.2 LocalStorage API

使用浏览器本地存储保存学习进度：

```javascript
localStorage.setItem(key, value);
localStorage.getItem(key);
localStorage.removeItem(key);
```

#### 4.2.3 CSS3 高级特性

- **渐变背景**: `linear-gradient()`
- **动画**: `@keyframes` 和 `animation`
- **过渡**: `transition` 和 `cubic-bezier`
- **阴影**: `box-shadow` 实现新拟态效果
- **媒体查询**: `@media` 实现响应式设计

#### 4.2.4 JavaScript ES6+ 特性

- **箭头函数**: 简化函数定义
- **模板字符串**: 便于字符串拼接
- **解构赋值**: 简化数组/对象操作
- **扩展运算符**: 数组拷贝和合并
- **Array 方法**: `forEach`, `map`, `filter`, `indexOf`
- **DOM API**: `querySelector`, `addEventListener`

### 4.3 浏览器兼容性

- **推荐浏览器**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **最低要求**: 支持 ES6+ 和 HTML5 Drag and Drop API 的现代浏览器

## 5. 使用方法

### 5.1 快速开始

#### 5.1.1 直接打开

1. 下载项目文件到本地目录
2. 使用浏览器打开 `index.html` 文件
3. 开始练习

#### 5.1.2 本地服务器（推荐）

```bash
# 使用 Python 启动简单服务器
python -m http.server 8000

# 或使用 Node.js http-server
npx http-server -p 8000
```

然后在浏览器访问 `http://localhost:8000`

### 5.2 操作指南

#### 5.2.1 连词成句练习

1. **查看题目**: 页面加载后自动显示第一题
2. **拖拽排序**: 使用鼠标拖拽单词卡片调整顺序
3. **检查答案**: 点击"检查答案"按钮或按 `Enter` 键
4. **查看解析**: 答错时会显示正确答案和语法解析
5. **切换题目**: 点击"上一题"/"下一题"按钮或使用方向键

#### 5.2.2 键盘快捷键

| 按键 | 功能 |
|------|------|
| `Enter` | 检查答案 |
| `←` (左箭头) | 上一题 |
| `→` (右箭头) | 下一题 |

#### 5.2.3 进度管理

- **自动保存**: 每次切换题目或答对时自动保存进度
- **自动恢复**: 刷新页面后自动恢复到上次练习的题目
- **清除进度**: 在浏览器控制台执行 `clearProgress()` 函数

### 5.3 自定义题库

#### 5.3.1 添加新题目

在 `script.js` 的 `questions` 数组中添加新题目：

```javascript
{
    words: ["word1", "word2", "word3"],
    answer: "Word1 word2 word3.",
    explanation: "老师点拨：语法解析内容..."
}
```

#### 5.3.2 题目格式规范

- `words`: 字符串数组，包含所有单词和短语
- `answer`: 完整的正确句子（包含标点符号）
- `explanation`: 详细的语法解析（可选）

### 5.4 样式自定义

#### 5.4.1 修改主题颜色

在 `style.css` 中修改颜色变量：

```css
/* 主色调 */
--primary-color: #5d8ab8;
--secondary-color: #7aa8d6;

/* 背景色 */
--bg-gradient: linear-gradient(135deg, #e3edf7 0%, #d4e6f9 50%, #e8f0f8 100%);
```

#### 5.4.2 调整动画效果

修改 `@keyframes` 动画参数：

```css
@keyframes float {
    0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
    }
    /* ... 调整关键帧 */
}
```

## 6. 注意事项

### 6.1 开发注意事项

#### 6.1.1 代码规范

- 使用一致的缩进（4 空格）
- 遵循 ES6+ 语法规范
- 添加必要的注释说明复杂逻辑
- 使用有意义的变量和函数名

#### 6.1.2 性能优化

- 避免频繁的 DOM 操作
- 使用事件委托减少事件监听器数量
- 图片和资源使用懒加载（如适用）
- CSS 动画使用 `transform` 和 `opacity` 属性

#### 6.1.3 浏览器兼容性

- 测试主流浏览器的兼容性
- 为旧浏览器提供降级方案
- 使用 CSS 前缀确保样式兼容
- 避免使用实验性 API

### 6.2 使用注意事项

#### 6.2.1 数据安全

- 进度数据存储在浏览器本地，清除浏览器数据会丢失进度
- 不涉及服务器通信，数据不上传到云端
- 建议定期备份重要的自定义题库

#### 6.2.2 已知问题

1. **拖拽体验**: 在某些触摸屏设备上拖拽体验可能不够流畅
2. **音效功能**: 当前音效功能未实现，仅为占位符
3. **题目数量**: 总题数显示为 100，但实际题目数量可能需要调整

#### 6.2.3 最佳实践

- 建议在桌面端使用以获得最佳拖拽体验
- 使用现代浏览器以获得最佳性能
- 定期清理浏览器缓存以避免存储问题

### 6.3 部署注意事项

#### 6.3.1 静态部署

项目为纯静态页面，可部署到任何静态托管服务：

- GitHub Pages
- Netlify
- Vercel
- 阿里云 OSS
- 腾讯云 COS

#### 6.3.2 HTTPS 要求

如果使用 LocalStorage，建议使用 HTTPS 协议：
- 某些浏览器在非 HTTPS 环境下可能限制 LocalStorage
- HTTPS 提供更好的安全性

## 7. 优化方向

### 7.1 功能优化

#### 7.1.1 短期优化（1-2 周）

1. **实现音效功能**
   - 使用 Web Audio API 或 HTML5 Audio
   - 添加拖拽、放置、正确、错误等音效
   - 提供音效开关选项

2. **添加题目分类**
   - 按语法点分类（时态、语态、从句等）
   - 按难度分级（初级、中级、高级）
   - 添加筛选和搜索功能

3. **优化拖拽体验**
   - 支持触摸屏设备的拖拽操作
   - 添加拖拽时的视觉引导线
   - 优化拖拽动画流畅度

#### 7.1.2 中期优化（1-2 月）

4. **添加学习统计**
   - 记录答题正确率
   - 统计学习时长
   - 生成学习报告图表

5. **实现错题本**
   - 自动记录错题
   - 支持错题重练
   - 提供错题分析

6. **添加提示功能**
   - 提供单词提示（显示首字母）
   - 提供语法提示（显示句子结构）
   - 限制提示次数

#### 7.1.3 长期优化（3-6 月）

7. **开发其他练习模式**
   - 语法填空
   - 英文翻译
   - 英语短文阅读
   - 英语作文练习

8. **添加用户系统**
   - 用户注册和登录
   - 学习进度云端同步
   - 学习成就和排行榜

9. **智能推荐**
   - 根据学习情况推荐题目
   - 个性化学习路径
   - AI 辅助解析

### 7.2 性能优化

#### 7.2.1 前端性能

1. **资源优化**
   - 压缩 CSS 和 JavaScript 文件
   - 使用 CDN 加载 Google Fonts
   - 图片懒加载和压缩

2. **渲染优化**
   - 使用虚拟 DOM 减少重绘
   - 优化动画性能（使用 `requestAnimationFrame`）
   - 减少布局抖动

3. **缓存策略**
   - 使用 Service Worker 离线缓存
   - 设置合理的 HTTP 缓存头
   - 实现资源预加载

#### 7.2.2 代码优化

4. **模块化重构**
   - 使用 ES6 模块化
   - 分离数据、逻辑和视图
   - 提高代码可维护性

5. **类型安全**
   - 引入 TypeScript
   - 添加类型定义
   - 提高代码健壮性

6. **测试覆盖**
   - 添加单元测试
   - 添加集成测试
   - 使用 E2E 测试框架

### 7.3 用户体验优化

#### 7.3.1 界面优化

1. **深色模式**
   - 添加深色主题切换
   - 适配系统主题设置
   - 保存用户偏好

2. **多语言支持**
   - 添加英文界面
   - 支持国际化（i18n）
   - 动态语言切换

3. **无障碍访问**
   - 添加 ARIA 标签
   - 支持屏幕阅读器
   - 键盘导航优化

#### 7.3.2 交互优化

4. **手势支持**
   - 支持滑动切换题目
   - 双指缩放调整字体
   - 长按显示菜单

5. **动画优化**
   - 添加页面切换动画
   - 优化加载动画
   - 添加微交互动画

6. **反馈优化**
   - 添加触觉反馈（移动端）
   - 优化错误提示样式
   - 添加成功庆祝效果

### 7.4 技术架构优化

#### 7.4.1 前端框架

7. **引入现代框架**
   - 考虑使用 Vue.js 或 React
   - 实现组件化开发
   - 提高开发效率

8. **状态管理**
   - 使用 Vuex 或 Redux
   - 统一管理应用状态
   - 简化数据流

#### 7.4.2 后端集成

9. **添加后端服务**
   - 使用 Node.js 或 Python
   - 实现用户认证
   - 数据持久化存储

10. **数据库设计**
    - 设计题库数据库
    - 用户数据表设计
    - 学习记录表设计

### 7.5 安全优化

#### 7.5.1 数据安全

11. **数据加密**
    - 敏感数据加密存储
    - 使用 HTTPS 传输
    - 防止 XSS 攻击

12. **输入验证**
    - 验证用户输入
    - 防止 SQL 注入
    - 防止 CSRF 攻击

## 8. 常见问题（FAQ）

### Q1: 如何重置学习进度？

A: 在浏览器控制台执行以下代码：

```javascript
clearProgress()
```

然后刷新页面。

### Q2: 可以在手机上使用吗？

A: 可以，但拖拽体验可能不如桌面端流畅。建议在平板或桌面设备上使用。

### Q3: 如何添加自己的题目？

A: 编辑 `script.js` 文件中的 `questions` 数组，按照现有格式添加新题目。

### Q4: 为什么音效没有声音？

A: 当前音效功能仅为占位符，尚未实现。可以自行添加音频文件并修改 `playSound()` 函数。

### Q5: 如何导出学习进度？

A: 当前版本不支持导出功能。如需此功能，需要在代码中添加导出逻辑。

### Q6: 浏览器兼容性要求是什么？

A: 需要支持 ES6+ 和 HTML5 Drag and Drop API 的现代浏览器。推荐使用 Chrome 90+、Firefox 88+、Safari 14+ 或 Edge 90+。

### Q7: 如何修改主题颜色？

A: 编辑 `style.css` 文件，修改颜色变量和渐变色值。建议使用 CSS 变量统一管理颜色。

### Q8: 项目可以商用吗？

A: 请查看项目的许可证文件。如果没有明确说明，建议联系原作者获取使用授权。

## 9. 贡献指南

### 9.1 如何贡献

欢迎通过以下方式贡献项目：

1. **报告 Bug**: 在 Issues 中提交问题报告
2. **提出建议**: 在 Issues 中提出功能建议
3. **提交代码**: Fork 项目后提交 Pull Request
4. **完善文档**: 改进文档内容和结构

### 9.2 代码规范

- 遵循现有的代码风格
- 添加必要的注释
- 确保代码通过测试
- 更新相关文档

### 9.3 提交规范

提交信息格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

类型（type）：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具相关

## 10. 许可证

请查看项目根目录下的 LICENSE 文件了解许可证信息。

## 11. 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 加入讨论群

---

**文档版本**: 1.0.0
**最后更新**: 2026-01-19
**维护者**: WDEnglish Team
