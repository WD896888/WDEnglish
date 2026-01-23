/**
 * 百度翻译API服务模块
 * 提供文本翻译功能，支持自动语言检测
 */

class BaiduTranslateService {
    constructor() {
        // 百度翻译API配置
        this.APP_ID = '20240411002021476';
        this.SECRET_KEY = 'IvWjlQDf6WsQTmapB9lA';
        this.API_URL = 'https://fanyi-api.baidu.com/api/trans/vip/translate';
        
        // 翻译缓存，避免重复翻译相同内容
        this.translationCache = new Map();
        
        // 正在进行的翻译请求
        this.pendingRequests = new Map();
        
        // 初始化检查
        this.checkInitialization();
    }

    /**
     * 检查初始化状态
     */
    checkInitialization() {
        if (typeof window.md5 !== 'function') {
            console.error('百度翻译服务初始化失败：MD5库未加载');
            console.error('请确保在HTML中正确引入blueimp-md5库：');
            console.error('<script src="https://cdn.jsdelivr.net/npm/blueimp-md5@2.19.0/js/md5.min.js"></script>');
        } else {
            console.log('百度翻译服务初始化成功');
        }
    }

    /**
     * 生成MD5签名
     * @param {string} str - 待签名的字符串
     * @returns {string} MD5哈希值
     */
    generateMD5(str) {
        // 使用window.md5（需要引入blueimp-md5库）
        if (typeof window.md5 === 'function') {
            return window.md5(str);
        }
        
        // 如果没有引入md5库，抛出错误
        throw new Error('MD5库未加载，请检查blueimp-md5库是否正确引入');
    }

    /**
     * 简单的哈希函数（后备方案，不推荐用于生产环境）
     * @param {string} str - 待哈希的字符串
     * @returns {string} 哈希值
     */
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16).padStart(32, '0');
    }

    /**
     * 翻译文本
     * @param {string} text - 待翻译的文本
     * @param {string} from - 源语言，默认为'auto'（自动检测）
     * @param {string} to - 目标语言，默认为'zh'（中文）
     * @returns {Promise<string>} 翻译结果
     */
    async translate(text, from = 'auto', to = 'zh') {
        // 参数验证
        if (!text || typeof text !== 'string' || text.trim() === '') {
            return '';
        }

        // 检查缓存
        const cacheKey = `${from}:${to}:${text}`;
        if (this.translationCache.has(cacheKey)) {
            return this.translationCache.get(cacheKey);
        }

        // 检查是否已有相同请求正在进行
        if (this.pendingRequests.has(cacheKey)) {
            return this.pendingRequests.get(cacheKey);
        }

        // 创建翻译请求Promise
        const translatePromise = this.performTranslation(text, from, to);
        this.pendingRequests.set(cacheKey, translatePromise);

        try {
            const result = await translatePromise;
            
            // 缓存结果
            this.translationCache.set(cacheKey, result);
            
            return result;
        } catch (error) {
            console.error('翻译失败:', error);
            throw error;
        } finally {
            // 移除进行中的请求
            this.pendingRequests.delete(cacheKey);
        }
    }

    /**
     * 执行翻译API调用（使用JSONP方式解决跨域问题）
     * @param {string} text - 待翻译的文本
     * @param {string} from - 源语言
     * @param {string} to - 目标语言
     * @returns {Promise<string>} 翻译结果
     */
    async performTranslation(text, from, to) {
        // 生成随机盐值
        const salt = Date.now().toString();
        
        // 生成签名：appid + q + salt + secretKey的MD5值
        const sign = this.generateMD5(this.APP_ID + text + salt + this.SECRET_KEY);
        
        // 构建请求参数
        const params = new URLSearchParams({
            q: text,
            from: from,
            to: to,
            appid: this.APP_ID,
            salt: salt,
            sign: sign
        });

        // 使用JSONP方式调用API
        return new Promise((resolve, reject) => {
            // 创建回调函数名称
            const callbackName = 'baiduTranslateCallback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            
            // 构建完整的URL
            const url = `${this.API_URL}?${params.toString()}&callback=${callbackName}`;
            
            // 创建script标签
            const script = document.createElement('script');
            script.src = url;
            script.charset = 'UTF-8';
            
            // 设置回调函数
            window[callbackName] = (data) => {
                // 清理
                delete window[callbackName];
                document.body.removeChild(script);
                
                // 检查API返回的错误码
                if (data.error_code) {
                    const errorMsg = this.getErrorMessage(data.error_code);
                    reject(new Error(errorMsg));
                    return;
                }
                
                // 提取翻译结果
                if (data.trans_result && data.trans_result.length > 0) {
                    // 合并所有翻译结果
                    resolve(data.trans_result.map(item => item.dst).join('\n'));
                } else {
                    reject(new Error('翻译结果为空'));
                }
            };
            
            // 处理错误
            script.onerror = () => {
                // 清理
                delete window[callbackName];
                if (script.parentNode) {
                    document.body.removeChild(script);
                }
                reject(new Error('网络连接失败，请检查网络设置'));
            };
            
            // 添加到页面并执行
            document.body.appendChild(script);
        });
    }

    /**
     * 获取错误信息
     * @param {number} errorCode - 错误码
     * @returns {string} 错误信息
     */
    getErrorMessage(errorCode) {
        const errorMessages = {
            '52000': '成功',
            '52001': '请求超时',
            '52002': '系统错误',
            '52003': '未授权用户',
            '54000': '必填参数为空',
            '54001': '签名错误',
            '54003': '访问频率受限',
            '54004': '账户余额不足',
            '54005': '长查询过于频繁',
            '58000': '客户端IP非法',
            '58001': '语言不支持',
            '58002': '服务当前已关闭',
            '90107': '认证未通过或未生效'
        };

        return errorMessages[errorCode] || `未知错误（错误码：${errorCode}）`;
    }

    /**
     * 批量翻译
     * @param {string[]} texts - 待翻译的文本数组
     * @param {string} from - 源语言
     * @param {string} to - 目标语言
     * @returns {Promise<string[]>} 翻译结果数组
     */
    async translateBatch(texts, from = 'auto', to = 'zh') {
        if (!Array.isArray(texts) || texts.length === 0) {
            return [];
        }

        // 并发翻译所有文本
        const promises = texts.map(text => this.translate(text, from, to));
        
        try {
            return await Promise.all(promises);
        } catch (error) {
            console.error('批量翻译失败:', error);
            // 返回部分成功的结果
            const results = await Promise.allSettled(promises);
            return results.map(result => 
                result.status === 'fulfilled' ? result.value : ''
            );
        }
    }

    /**
     * 清除翻译缓存
     */
    clearCache() {
        this.translationCache.clear();
    }

    /**
     * 获取缓存大小
     * @returns {number} 缓存条目数
     */
    getCacheSize() {
        return this.translationCache.size;
    }

    /**
     * 测试翻译服务
     * @returns {Promise<boolean>} 测试是否成功
     */
    async test() {
        console.log('=== 百度翻译服务测试 ===');
        
        // 检查MD5库
        if (typeof window.md5 !== 'function') {
            console.error('❌ MD5库未加载');
            return false;
        }
        console.log('✓ MD5库已加载');
        
        // 测试MD5签名
        const testStr = 'test';
        const sign = this.generateMD5(testStr);
        console.log('✓ MD5签名测试:', sign);
        
        // 测试翻译
        try {
            const result = await this.translate('hello', 'en', 'zh');
            console.log('✓ 翻译测试成功:', result);
            return true;
        } catch (error) {
            console.error('❌ 翻译测试失败:', error);
            return false;
        }
    }
}

// 创建全局实例
const baiduTranslateService = new BaiduTranslateService();

// 将服务暴露到window对象，方便其他模块使用
window.BaiduTranslateService = BaiduTranslateService;
window.baiduTranslateService = baiduTranslateService;

// 在页面加载完成后测试翻译服务
window.addEventListener('load', () => {
    console.log('页面加载完成，开始测试百度翻译服务...');
    baiduTranslateService.test().then(success => {
        if (success) {
            console.log('百度翻译服务测试通过，可以使用翻译功能');
        } else {
            console.error('百度翻译服务测试失败，请检查配置');
        }
    });
});