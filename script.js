// 创建水墨效果
function createInkStroke(x, y) {
    const stroke = document.createElement('div');
    stroke.className = 'ink-stroke';
    stroke.style.left = x + 'px';
    stroke.style.top = y + 'px';
    document.body.appendChild(stroke);

    // 动画结束后移除元素
    setTimeout(() => {
        stroke.remove();
    }, 2000);
}

// 监听鼠标移动
document.addEventListener('mousemove', (e) => {
    // 随机决定是否创建新的笔触
    if (Math.random() < 0.1) {
        createInkStroke(e.clientX, e.clientY);
    }
});

// 监听点击事件
document.addEventListener('click', (e) => {
    createInkStroke(e.clientX, e.clientY);
});

document.addEventListener('DOMContentLoaded', () => {
    // 创建水墨画背景
    const inkBg = document.createElement('div');
    inkBg.className = 'ink-bg';
    document.body.insertBefore(inkBg, document.body.firstChild);

    let lastX = 0;
    let lastY = 0;
    let strokes = [];
    let isFirstMove = true;
    let lastMoveTime = 0;
    let stationaryTime = 0;

    // 鼠标移动时绘制
    document.addEventListener('mousemove', (e) => {
        const currentX = e.clientX;
        const currentY = e.clientY;
        const currentTime = Date.now();
        
        if (isFirstMove) {
            lastX = currentX;
            lastY = currentY;
            lastMoveTime = currentTime;
            isFirstMove = false;
            return;
        }

        // 检测鼠标是否静止
        if (Math.abs(currentX - lastX) < 2 && Math.abs(currentY - lastY) < 2) {
            stationaryTime += currentTime - lastMoveTime;
            if (stationaryTime > 50) { // 如果静止超过50ms，创建晕染效果
                createDiffusionEffect(currentX, currentY);
            }
        } else {
            stationaryTime = 0;
        }
        
        // 创建新的墨迹
        createStroke(currentX, currentY);
        
        // 在两点之间创建过渡墨迹
        const dx = currentX - lastX;
        const dy = currentY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.floor(distance / 1.5); // 减小间距，增加墨迹密度
        
        for (let i = 1; i < steps; i++) {
            const x = lastX + (dx * i) / steps;
            const y = lastY + (dy * i) / steps;
            createStroke(x, y);
        }
        
        lastX = currentX;
        lastY = currentY;
        lastMoveTime = currentTime;
    });

    // 创建墨迹
    function createStroke(x, y) {
        const stroke = document.createElement('div');
        stroke.className = 'ink-stroke';
        
        // 随机大小和透明度
        const size = Math.random() * 20 + 15; // 减小墨迹尺寸
        const opacity = Math.random() * 0.3 + 0.2; // 降低不透明度
        
        stroke.style.width = `${size}px`;
        stroke.style.height = `${size}px`;
        stroke.style.left = `${x}px`;
        stroke.style.top = `${y}px`;
        stroke.style.opacity = opacity;
        
        // 随机旋转角度
        const rotation = Math.random() * 360;
        stroke.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        document.body.appendChild(stroke);
        strokes.push(stroke);
        
        // 限制墨迹数量，防止内存占用过大
        if (strokes.length > 300) { // 减少最大墨迹数量
            const oldStroke = strokes.shift();
            oldStroke.remove();
        }
        
        // 墨迹淡出效果
        setTimeout(() => {
            stroke.style.opacity = '0';
            setTimeout(() => {
                stroke.remove();
                strokes = strokes.filter(s => s !== stroke);
            }, 2000); // 减少淡出时间
        }, 3000); // 减少显示时间
    }

    // 创建晕染效果
    function createDiffusionEffect(x, y) {
        const numStrokes = 3; // 减少每次晕染创建的墨迹数量
        for (let i = 0; i < numStrokes; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 20 + 5; // 减小晕染范围
            const newX = x + Math.cos(angle) * distance;
            const newY = y + Math.sin(angle) * distance;
            
            const stroke = document.createElement('div');
            stroke.className = 'ink-stroke';
            
            const size = Math.random() * 30 + 20; // 减小晕染墨迹大小
            const opacity = Math.random() * 0.2 + 0.1; // 降低晕染不透明度
            
            stroke.style.width = `${size}px`;
            stroke.style.height = `${size}px`;
            stroke.style.left = `${newX}px`;
            stroke.style.top = `${newY}px`;
            stroke.style.opacity = opacity;
            
            const rotation = Math.random() * 360;
            stroke.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
            
            document.body.appendChild(stroke);
            strokes.push(stroke);
            
            // 限制墨迹数量
            if (strokes.length > 300) {
                const oldStroke = strokes.shift();
                oldStroke.remove();
            }
            
            // 晕染墨迹淡出效果
            setTimeout(() => {
                stroke.style.opacity = '0';
                setTimeout(() => {
                    stroke.remove();
                    strokes = strokes.filter(s => s !== stroke);
                }, 2000);
            }, 3000);
        }
    }

    // 鼠标离开窗口时重置
    document.addEventListener('mouseleave', () => {
        isFirstMove = true;
        stationaryTime = 0;
    });
});

// 项目详情页功能
function showProjectDetail(projectId) {
    const detail = document.getElementById('projectDetail');
    detail.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 防止背景滚动
    
    // 显示对应的项目详情
    const projects = document.querySelectorAll('.project-info');
    projects.forEach(project => {
        project.style.display = project.id === projectId ? 'block' : 'none';
    });
}

function closeProjectDetail() {
    const detail = document.getElementById('projectDetail');
    detail.style.display = 'none';
    document.body.style.overflow = ''; // 恢复背景滚动
}

// 点击详情页外部区域关闭
document.getElementById('projectDetail').addEventListener('click', function(e) {
    if (e.target === this) {
        closeProjectDetail();
    }
});

// 缩略图点击切换主图
document.querySelectorAll('.gallery-thumbs img').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const mainImg = this.closest('.project-gallery').querySelector('img');
        mainImg.src = this.src;
        mainImg.alt = this.alt;
    });
}); 