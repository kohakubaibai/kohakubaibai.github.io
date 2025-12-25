/************************** timeline start ******************************/
const timeline = document.getElementById('timeline');
const infoCards = document.querySelectorAll('.info-card');
const stageImages = document.querySelectorAll('.stage-image');
const progressMarkers = document.querySelectorAll('.progress-marker');
const progressMarkersContainer = document.querySelector('.progress-markers');

// 定義每個階段的觸發點（百分比）
const processTriggers = [
    { process: 1, start: 0, end: 12 },
    { process: 2, start: 12, end: 23 },
    { process: 3, start: 23, end: 34 },
    { process: 4, start: 34, end: 45 },
    { process: 5, start: 45, end: 56 },
    { process: 6, start: 56, end: 67 },
    { process: 7, start: 67, end: 78 },
    { process: 8, start: 78, end: 89 },
    { process: 9, start: 89, end: 100 }
];

function updateTimeline() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - windowHeight)));
    const percentage = scrollProgress * 100;

    // 找出當前活躍的階段
    let activeIndex = 0;
    processTriggers.forEach((trigger, index) => {
        if (percentage >= trigger.start && percentage <= trigger.end) {
            activeIndex = index;
        }
    });

    // 更新所有元素
    infoCards.forEach((card, index) => {
        if (index === activeIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    stageImages.forEach((image, index) => {
        if (index === activeIndex) {
            image.classList.add('active');
        } else {
            image.classList.remove('active');
        }
    });

    // 更新進度標記
    progressMarkers.forEach((marker, index) => {
        const label = marker.querySelector('.marker-label');
        const dot = marker.querySelector('.marker-dot');
        
        if (index === activeIndex) {
            label.classList.add('active');
            dot.classList.add('active');
        } else {
            label.classList.remove('active');
            dot.classList.remove('active');
        }
    });
}

// 滾動事件監聽
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateTimeline();
            ticking = false;
        });
        ticking = true;
    }
});

// 初始化
updateTimeline();

// 平滑滾動效果
document.addEventListener('DOMContentLoaded', () => {
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});