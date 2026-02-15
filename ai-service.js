class ZhipuAIService {
    constructor(apiKey = '28277669b63b4bf5bd8184c4a1ea419c.4alMwcz1Bt6qmYk0') {
        this.apiKey = apiKey;
        this.baseUrl = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
        this.model = 'glm-4.7-flash';
        this.defaultMessages = [
            {
                role: 'system',
                content: '你是一个专业的英语学习助手，擅长解答英语语法、词汇、翻译等问题，帮助学生提高英语水平。'
            }
        ];
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    async sendMessage(userMessage, options = {}) {
        const {
            temperature = 0.6,
            maxTokens = 2048,
            stream = false,
            onStreamChunk = null,
            customSystemPrompt = null
        } = options;

        if (!this.apiKey) {
            throw new Error('API Key未设置，请先调用setApiKey方法设置API密钥');
        }

        const messages = [...this.defaultMessages];
        
        if (customSystemPrompt) {
            messages[0].content = customSystemPrompt;
        }
        
        messages.push({
            role: 'user',
            content: userMessage
        });

        const requestBody = {
            model: this.model,
            messages: messages,
            temperature: temperature,
            max_tokens: maxTokens,
            stream: stream,
            thinking: {
                type: 'disabled'
            }
        };

        try {
            if (stream) {
                return await this._streamRequest(requestBody, onStreamChunk);
            } else {
                return await this._normalRequest(requestBody);
            }
        } catch (error) {
            console.error('调用智普AI API失败:', error);
            throw error;
        }
    }

    async _normalRequest(requestBody) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API请求失败: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async _streamRequest(requestBody, onStreamChunk) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API请求失败: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices?.[0]?.delta?.content;
                        if (content) {
                            fullContent += content;
                            if (onStreamChunk) {
                                onStreamChunk(content, fullContent);
                            }
                        }
                    } catch (e) {
                        console.warn('解析流数据失败:', e);
                    }
                }
            }
        }

        return fullContent;
    }

    async sendConversationMessage(messages, options = {}) {
        const {
            temperature = 0.6,
            maxTokens = 2048,
            stream = false,
            onStreamChunk = null
        } = options;

        if (!this.apiKey) {
            throw new Error('API Key未设置，请先调用setApiKey方法设置API密钥');
        }

        const fullMessages = [...this.defaultMessages, ...messages];

        const requestBody = {
            model: this.model,
            messages: fullMessages,
            temperature: temperature,
            max_tokens: maxTokens,
            stream: stream,
            thinking: {
                type: 'disabled'
            }
        };

        try {
            if (stream) {
                return await this._streamRequest(requestBody, onStreamChunk);
            } else {
                return await this._normalRequest(requestBody);
            }
        } catch (error) {
            console.error('调用智普AI API失败:', error);
            throw error;
        }
    }

    async checkApiKey(apiKey) {
        try {
            const testResponse = await this.sendMessage('你好', { maxTokens: 10 });
            return testResponse !== null && testResponse !== undefined;
        } catch (error) {
            console.error('API Key验证失败:', error);
            return false;
        }
    }
}

class QwenAIService {
    constructor(apiKey = 'sk-a5be507e9e5543b9ab3d83e7982f44a5') {
        this.apiKey = apiKey;
        this.baseUrl = 'https://dashscope.aliyuncs.com/compatible-mode/v1';
        this.model = 'deepseek-v3.2';
        this.defaultMessages = [
            {
                role: 'system',
                content: '你是一个专业的英语学习助手，擅长解答英语语法、词汇、翻译等问题，帮助学生提高英语水平。'
            }
        ];
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    setModel(model) {
        this.model = model;
    }

    setDefaultSystemPrompt(prompt) {
        this.defaultMessages[0].content = prompt;
    }

    async sendMessage(userMessage, options = {}) {
        const {
            temperature = 0.7,
            maxTokens = 2000,
            topP = 0.8,
            stream = false,
            onStreamChunk = null,
            customSystemPrompt = null
        } = options;

        if (!this.apiKey) {
            throw new Error('API Key未设置，请先调用setApiKey方法设置API密钥');
        }

        const messages = [...this.defaultMessages];
        
        if (customSystemPrompt) {
            messages[0].content = customSystemPrompt;
        }
        
        messages.push({
            role: 'user',
            content: userMessage
        });

        const requestBody = {
            model: this.model,
            messages: messages,
            temperature: temperature,
            max_tokens: maxTokens,
            top_p: topP,
            stream: stream
        };

        try {
            if (stream) {
                return await this._streamRequest(requestBody, onStreamChunk);
            } else {
                return await this._normalRequest(requestBody);
            }
        } catch (error) {
            console.error('调用阿里云千问API失败:', error);
            throw error;
        }
    }

    async _normalRequest(requestBody) {
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API请求失败: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async _streamRequest(requestBody, onStreamChunk) {
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API请求失败: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices?.[0]?.delta?.content;
                        if (content) {
                            fullContent += content;
                            if (onStreamChunk) {
                                onStreamChunk(content, fullContent);
                            }
                        }
                    } catch (e) {
                        console.warn('解析流数据失败:', e);
                    }
                }
            }
        }

        return fullContent;
    }

    async sendConversationMessage(messages, options = {}) {
        const {
            temperature = 0.7,
            maxTokens = 2000,
            topP = 0.8,
            stream = false,
            onStreamChunk = null
        } = options;

        if (!this.apiKey) {
            throw new Error('API Key未设置，请先调用setApiKey方法设置API密钥');
        }

        const fullMessages = [...this.defaultMessages, ...messages];

        const requestBody = {
            model: this.model,
            messages: fullMessages,
            temperature: temperature,
            max_tokens: maxTokens,
            top_p: topP,
            stream: stream
        };

        try {
            if (stream) {
                return await this._streamRequest(requestBody, onStreamChunk);
            } else {
                return await this._normalRequest(requestBody);
            }
        } catch (error) {
            console.error('调用阿里云千问API失败:', error);
            throw error;
        }
    }

    async checkApiKey(apiKey) {
        try {
            const tempKey = this.apiKey;
            if (apiKey) {
                this.apiKey = apiKey;
            }
            const testResponse = await this.sendMessage('你好', { maxTokens: 10 });
            this.apiKey = tempKey;
            return testResponse !== null && testResponse !== undefined;
        } catch (error) {
            console.error('API Key验证失败:', error);
            return false;
        }
    }

    async getUsageInfo() {
        if (!this.apiKey) {
            throw new Error('API Key未设置，请先调用setApiKey方法设置API密钥');
        }

        try {
            const response = await fetch(`${this.baseUrl}/usage`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            if (!response.ok) {
                throw new Error(`获取使用信息失败: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('获取使用信息失败:', error);
            throw error;
        }
    }

    async listModels() {
        if (!this.apiKey) {
            throw new Error('API Key未设置，请先调用setApiKey方法设置API密钥');
        }

        try {
            const response = await fetch(`${this.baseUrl}/models`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            if (!response.ok) {
                throw new Error(`获取模型列表失败: ${response.status}`);
            }

            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('获取模型列表失败:', error);
            throw error;
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ZhipuAIService, QwenAIService };
}
