/**
 * 专升本报录比图表模块
 * 提供初始化函数供主项目调用
 */

(function() {
    'use strict';

    // ============================================================
    // 【数据填写区域】
    // plan: 招生计划人数
    // actual1: 第一阶段实际报名人数
    // actual2: 第二阶段新增人数
    // actual3: 第三阶段新增人数
    // ============================================================
    const rawData = [
        { school: '湖北师范大学', major: '计算机科学与技术', plan: 128, actual1: 293, actual2: 0, actual3: 0 },
        { school: '湖北理工学院', major: '计算机科学与技术', plan: 40, actual1: 85, actual2: 0, actual3: 0 },
        { school: '湖北理工学院', major: '网络工程', plan: 35, actual1: 47, actual2: 0, actual3: 0 },
        { school: '湖北工程学院', major: '软件工程', plan: 50, actual1: 127, actual2: 0, actual3: 0 },
        { school: '汉江师范学院', major: '软件工程', plan: 40, actual1: 19, actual2: 0, actual3: 0 },
        { school: '武汉商学院', major: '软件工程', plan: 30, actual1: 47, actual2: 0, actual3: 0 },
        { school: '武汉商学院', major: '物联网工程', plan: 30, actual1: 33, actual2: 0, actual3: 0 },
        { school: '黄冈师范学院', major: '网络工程', plan: 90, actual1: 47, actual2: 0, actual3: 0 }
    ];
    // ============================================================

    // 处理数据
    const chartData = rawData.map(item => {
        const totalActual = item.actual1 + item.actual2 + item.actual3;
        return { ...item, totalActual, rate: ((item.plan / totalActual) * 100).toFixed(1) };
    }).sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate)); // 按录取率从低到高排序

    // 常量配置
    const PADDING = { top: 40, right: 20, bottom: 100, left: 50 };
    const COLORS = {
        text: '#4a6fa5',
        textLight: '#7aa8d6',
        textHover: '#4a6fa5',
        textFade: 'rgba(74, 111, 165, 0.6)',
        gridLine: 'rgba(74, 111, 165, 0.1)',
        plan: ['#ffffff', '#9bdfff'],
        actual: ['#ff8899', '#ffffff'],
        separator: 'rgba(255, 255, 255, 0.5)'
    };

    // DOM元素引用（初始化时设置）
    let canvas = null;
    let ctx = null;
    let tooltip = null;
    let tooltipEls = null;

    // 状态
    let animProgress = 0;
    let hoverIdx = -1;
    let positions = [];
    let canvasSize = { w: 0, h: 0 };
    let animationFrameId = null;
    let resizeHandler = null;
    let mouseMoveHandler = null;
    let mouseLeaveHandler = null;

    // 初始化Canvas
    function initCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvasSize = { w: rect.width, h: rect.height };
        return canvasSize;
    }

    // 绘制圆角柱子
    function drawRoundedBar(x, y, w, h, gradient) {
        if (h < 1) return;
        const r = Math.min(6, w / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    // 主绘图函数
    function drawChart() {
        const { w, h } = initCanvas();
        ctx.clearRect(0, 0, w, h);

        const chartW = w - PADDING.left - PADDING.right;
        const chartH = h - PADDING.top - PADDING.bottom;
        const maxVal = Math.max(...chartData.map(d => Math.max(d.plan, d.totalActual))) * 1.15;
        const groupW = chartW / chartData.length;
        const barW = Math.min(35, groupW * 0.25);
        const gap = 8;

        positions = [];

        // Y轴参考线
        ctx.strokeStyle = COLORS.gridLine;
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = PADDING.top + (chartH / 5) * i;
            ctx.beginPath();
            ctx.moveTo(PADDING.left, y);
            ctx.lineTo(w - PADDING.right, y);
            ctx.stroke();
            ctx.fillStyle = COLORS.textLight;
            ctx.font = '12px "Nunito", sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(Math.round(maxVal - (maxVal / 5) * i), PADDING.left - 10, y + 4);
        }

        // 绘制柱子
        chartData.forEach((item, i) => {
            const centerX = PADDING.left + groupW * i + groupW / 2;
            const xPlan = centerX - barW - gap / 2;
            const xActual = centerX + gap / 2;
            const isHover = hoverIdx === i;

            // 计算高度
            const hPlan = (item.plan / maxVal) * chartH * animProgress;
            const hActual1 = (item.actual1 / maxVal) * chartH * animProgress;
            const hActual2 = (item.actual2 / maxVal) * chartH * animProgress;
            const hActual3 = (item.actual3 / maxVal) * chartH * animProgress;
            const hActualTotal = hActual1 + hActual2 + hActual3;

            const yPlan = PADDING.top + chartH - hPlan;
            const yActual1 = PADDING.top + chartH - hActual1;
            const yActual2 = yActual1 - hActual2;
            const yActual3 = yActual2 - hActual3;

            // 招生计划柱
            if (hPlan > 0) {
                const grad = ctx.createLinearGradient(xPlan, yPlan, xPlan, yPlan + hPlan);
                grad.addColorStop(0, COLORS.plan[0]);
                grad.addColorStop(1, COLORS.plan[1]);
                if (isHover) {
                    ctx.shadowColor = '#7ab8d8';
                    ctx.shadowBlur = 15;
                    ctx.shadowOffsetY = 5;
                }
                drawRoundedBar(xPlan, yPlan, barW, hPlan, grad);
                ctx.shadowBlur = ctx.shadowOffsetY = 0;
            }

            // 实际报名柱
            if (hActualTotal > 0) {
                const grad = ctx.createLinearGradient(xActual, yActual3, xActual, yActual3 + hActualTotal);
                grad.addColorStop(0, COLORS.actual[0]);
                grad.addColorStop(1, COLORS.actual[1]);
                if (isHover) {
                    ctx.shadowColor = '#cc6677';
                    ctx.shadowBlur = 15;
                    ctx.shadowOffsetY = 5;
                }
                drawRoundedBar(xActual, yActual3, barW, hActualTotal, grad);
                ctx.shadowBlur = ctx.shadowOffsetY = 0;

                // 分隔线
                ctx.strokeStyle = COLORS.separator;
                ctx.lineWidth = 1;
                if (hActual1 > 0 && (hActual2 > 0 || hActual3 > 0)) {
                    ctx.beginPath();
                    ctx.moveTo(xActual + 4, yActual1);
                    ctx.lineTo(xActual + barW - 4, yActual1);
                    ctx.stroke();
                }
                if (hActual2 > 0 && hActual3 > 0) {
                    ctx.beginPath();
                    ctx.moveTo(xActual + 4, yActual2);
                    ctx.lineTo(xActual + barW - 4, yActual2);
                    ctx.stroke();
                }
            }

            // 柱顶数字
            ctx.textAlign = 'center';
            ctx.font = '700 13px "Nunito", sans-serif';
            if (hPlan > 0) {
                ctx.fillStyle = isHover ? '#9bdfff' : COLORS.plan[1];
                ctx.fillText(item.plan, xPlan + barW / 2, yPlan - 8);
            }
            if (hActualTotal > 0) {
                ctx.fillStyle = isHover ? '#ff6677' : COLORS.actual[0];
                ctx.fillText(item.totalActual, xActual + barW / 2, yActual3 - 8);
            }

            // 存储位置
            positions.push({
                x: xPlan, w: barW * 2 + gap,
                y: Math.min(yPlan, yActual3),
                h: Math.max(hPlan, hActualTotal),
                data: item
            });

            // 底部文字
            const textY = PADDING.top + chartH + 25;
            ctx.textAlign = 'center';
            ctx.font = '600 12px "Nunito", "PingFang SC", sans-serif';
            ctx.fillStyle = isHover ? COLORS.textHover : COLORS.text;
            ctx.fillText(item.school, centerX, textY);
            ctx.fillStyle = isHover ? COLORS.textLight : COLORS.textFade;
            ctx.fillText(item.major, centerX, textY + 18);
            ctx.font = '700 16px "Nunito", sans-serif';
            ctx.fillStyle = isHover ? COLORS.textHover : COLORS.text;
            ctx.fillText(item.rate + '%', centerX, textY + 45);
        });
    }

    // 更新浮窗内容
    function updateTooltipContent(item) {
        if (!tooltipEls) return;
        tooltipEls.title.textContent = item.school;
        tooltipEls.subtitle.textContent = item.major;
        tooltipEls.plan.textContent = item.plan + '人';
        tooltipEls.actual.textContent = item.totalActual + '人';
        tooltipEls.rate.textContent = item.rate + '%';
    }

    // 动画
    function animate() {
        const start = performance.now();
        const duration = 800;
        function step(t) {
            animProgress = Math.min(1, (t - start) / duration);
            animProgress = 1 - Math.pow(1 - animProgress, 3); // easeOutCubic
            drawChart();
            if (animProgress < 1) {
                animationFrameId = requestAnimationFrame(step);
            }
        }
        animationFrameId = requestAnimationFrame(step);
    }

    // 事件处理：鼠标移动
    function handleMouseMove(e) {
        if (!canvas || !tooltip) return;
        
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // 查找hover的柱子
        let newIdx = -1;
        for (let i = 0; i < positions.length; i++) {
            const pos = positions[i];
            if (mx >= pos.x && mx <= pos.x + pos.w && my >= pos.y && my <= pos.y + pos.h + 100) {
                newIdx = i;
                break;
            }
        }

        // 更新浮窗
        if (newIdx !== -1) {
            let left = e.clientX - rect.left + 15;
            let top = e.clientY - rect.top - 10;
            if (left + 160 > rect.width) left = e.clientX - rect.left - 170;
            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
            if (newIdx !== hoverIdx) updateTooltipContent(positions[newIdx].data);
            tooltip.classList.add('active');
        } else {
            tooltip.classList.remove('active');
        }

        // 仅状态改变时重绘
        if (newIdx !== hoverIdx) {
            hoverIdx = newIdx;
            drawChart();
        }
    }

    // 事件处理：鼠标离开
    function handleMouseLeave() {
        if (!tooltip) return;
        hoverIdx = -1;
        tooltip.classList.remove('active');
        drawChart();
    }

    // 触发页面入场动画
    function triggerPageEnterAnimation(contentEl) {
        contentEl.classList.add('zsb-page-preparing');
        contentEl.classList.remove('zsb-page-entering');
        
        // 触发重绘
        void contentEl.offsetWidth;
        
        // 移除准备状态，添加动画状态
        contentEl.classList.remove('zsb-page-preparing');
        contentEl.classList.add('zsb-page-entering');
        
        // 动画结束后移除动画类
        setTimeout(() => {
            contentEl.classList.remove('zsb-page-entering');
            contentEl.classList.remove('zsb-page-preparing');
        }, 1200);
    }

    // 清理函数
    function cleanup() {
        // 取消动画帧
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        
        // 移除事件监听
        if (canvas && resizeHandler) {
            window.removeEventListener('resize', resizeHandler);
        }
        if (canvas && mouseMoveHandler) {
            canvas.removeEventListener('mousemove', mouseMoveHandler);
        }
        if (canvas && mouseLeaveHandler) {
            canvas.removeEventListener('mouseleave', mouseLeaveHandler);
        }
        
        // 重置状态
        animProgress = 0;
        hoverIdx = -1;
        positions = [];
        canvas = null;
        ctx = null;
        tooltip = null;
        tooltipEls = null;
    }

    /**
     * 初始化专升本报录比图表
     * @param {string} canvasId - Canvas 元素的 ID
     * @param {string} tooltipId - Tooltip 元素的 ID
     */
    function initZhuanShengBen(canvasId, tooltipId) {
        // 清理之前的实例
        cleanup();
        
        // 获取DOM元素
        canvas = document.getElementById(canvasId);
        tooltip = document.getElementById(tooltipId);
        
        if (!canvas || !tooltip) {
            console.error('专升本报录比图表初始化失败：找不到Canvas或Tooltip元素');
            return;
        }
        
        ctx = canvas.getContext('2d');
        
        // 获取tooltip子元素
        tooltipEls = {
            title: tooltip.querySelector('.zsb-tooltip-title'),
            subtitle: tooltip.querySelector('.zsb-tooltip-subtitle'),
            plan: tooltip.querySelector('#zsbTooltipPlan'),
            actual: tooltip.querySelector('#zsbTooltipActual'),
            rate: tooltip.querySelector('#zsbTooltipRate')
        };
        
        // 绑定事件
        mouseMoveHandler = handleMouseMove;
        mouseLeaveHandler = handleMouseLeave;
        
        canvas.addEventListener('mousemove', mouseMoveHandler);
        canvas.addEventListener('mouseleave', mouseLeaveHandler);
        
        // 窗口缩放时重绘
        resizeHandler = () => {
            if (canvas) drawChart();
        };
        window.addEventListener('resize', resizeHandler);
        
        // 触发入场动画
        const contentEl = document.querySelector('.zsb-page-content');
        if (contentEl) {
            triggerPageEnterAnimation(contentEl);
        }
        
        // 开始图表动画
        animate();
    }

    /**
     * 销毁图表实例
     */
    function destroyZhuanShengBen() {
        cleanup();
    }

    // 导出函数到全局
    window.ZhuanShengBenChart = {
        init: initZhuanShengBen,
        destroy: destroyZhuanShengBen
    };

})();
