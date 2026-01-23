# WDEnglish 项目文档

## 项目概述

WDEnglish 是一个交互式英语学习 Web 应用,旨在帮助学生通过连词成句练习和 AI 助手对话来提高英语水平。项目口号是"拾起散落的语言碎片,拼凑属于自己的表达"。

### 主要功能

1. **连词成句练习**
   - 100多道精选英语连词成句题目
   - 拖拽交互方式,支持桌面端和移动端
   - 实时答案检查和详细语法解析
   - 进度自动保存(使用 localStorage)

2. **AI 英语助手**
   - 实时对话功能,支持流式响应
   - 可更换 AI 头像和名称
   - 支持多种 AI 模型(智谱AI GLM、阿里云千问)
   - 自定义系统提示词

3. **用户界面**
   - 现代化渐变设计,带有气泡动画背景
   - 完全响应式布局,支持手机、平板和桌面
   - 流畅的动画效果和交互反馈

## 技术栈

### 前端技术
- **HTML5**: 语义化标签结构
- **CSS3**: 渐变、动画、响应式设计
- **Vanilla JavaScript**: 原生 JavaScript,无框架依赖
- **Google Fonts**: Nunito 字体

### AI 服务集成
- **智谱AI (ZhipuAI)**: GLM-4.7-Flash 模型
- **阿里云千问 (Qwen)**: 支持多种模型(qwen-flash, qwen-turbo, qwen-plus, qwen-max等)

### 浏览器 API
- **LocalStorage**: 进度保存和用户设置
- **Fetch API**: AI 服务调用
- **Drag and Drop API**: 拖拽交互
- **Touch Events**: 移动端触摸支持

## 项目结构

```
WDEnglish-main/
├── index.html          # 主页面文件
├── script.js           # 核心逻辑和题库数据
├── style.css           # 样式文件
├── ai-service.js       # AI 服务封装
├── 史迪仔.png          # AI 默认头像
├── 用户1.png           # 预设用户头像1
├── 用户2.jpg           # 预设用户头像2
├── 用户3.jpg           # 预设用户头像3
└── AGENTS.md           # 项目文档(本文件)
```

## 关键文件说明

### index.html
- 定义应用的整体结构
- 包含连词成句练习卡片和 AI 聊天卡片
- 头像更换模态窗口
- 引入外部字体和样式文件

### script.js
- **题库数据**: 100多道连词成句题目,包含单词数组、标准答案和语法解析
- **拖拽逻辑**: 实现桌面端鼠标拖拽和移动端触摸拖拽
- **进度管理**: 使用 localStorage 保存用户练习进度
- **UI 交互**: 按钮点击、答案检查、题目切换等
- **聊天功能**: 与 AI 服务的集成和消息显示

### style.css
- **响应式设计**: 使用媒体查询适配不同屏幕尺寸
- **渐变效果**: 背景和按钮使用渐变色
- **动画**: 气泡浮动、消息淡入、按钮悬停等
- **自定义滚动条**: WebKit 和 Firefox 浏览器样式
- **移动端优化**: 触摸友好的交互设计

### ai-service.js
- **ZhipuAIService 类**: 封装智谱AI API调用
  - 支持流式和非流式响应
  - API Key 验证
  - 自定义系统提示词
- **QwenAIService 类**: 封装阿里云千问 API调用
  - 支持多种模型切换
  - 流式响应
  - 使用量查询

## 运行方式

### 本地运行
1. 直接在浏览器中打开 `index.html` 文件
2. 在浏览器中访问 `http://localhost:8000`


## API 配置

### 智谱AI API
- **默认模型**: glm-4.7-flash
- **API Key**: 在 `ai-service.js` 中配置(硬编码)
- **Base URL**: https://open.bigmodel.cn/api/paas/v4/chat/completions

### 阿里云千问 API
- **默认模型**: qwen-flash
- **API Key**: 在 `ai-service.js` 中配置(硬编码)
- **Base URL**: https://dashscope.aliyuncs.com/compatible-mode/v1


## 开发约定

### 代码风格
- 使用 2 空格缩进
- 函数和变量使用驼峰命名法(camelCase)
- 常量使用大写蛇形命名法(UPPER_SNAKE_CASE)
- 中文注释,详细说明功能逻辑

### 文件修改指南
- **添加新题目**: 在 `script.js` 的 `questions` 数组中添加新对象
- **修改样式**: 在 `style.css` 中修改 CSS 变量或样式规则
- **更换 AI 模型**: 在 `ai-service.js` 中修改 `model` 属性
- **调整响应式断点**: 在 `style.css` 的媒体查询中修改

### 浏览器兼容性
- 现代浏览器(Chrome, Firefox, Safari, Edge)
- 移动端浏览器(iOS Safari, Chrome Mobile)

## 已知功能扩展点

当前项目标记为"待开发"的功能:
1. 语法填空
2. 英文翻译
3. 英语短文
4. 英语作文

这些功能在界面中已预留位置,但尚未实现。

## 数据持久化

### LocalStorage 键值
- `wdenglish_sentence_progress`: 保存连词成句练习进度(当前题目索引)
- 用户设置(如头像、AI名称等)也可扩展存储

## 性能优化

- 使用 `will-change` 和 `transform: translateZ(0)` 优化动画性能
- 消息列表使用虚拟滚动思路(限制最大高度)
- 图片使用预设头像,减少加载时间
- CSS 动画使用 GPU 加速


## 常见问题

### Q: 如何更换 AI 模型?
A: 在 `ai-service.js` 中修改对应类的 `model` 属性,或在界面的高级设置中选择。

### Q: 如何添加新的练习题目?
A: 在 `script.js` 的 `questions` 数组中添加新对象,格式为:
```javascript
{
  words: ["word1", "word2", "word3"],
  answer: "Correct sentence.",
  explanation: "语法解析说明"
}
```

**最后更新**: 2026年1月22日