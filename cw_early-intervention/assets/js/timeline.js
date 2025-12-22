/************************** timeline start ******************************/
const timeline = document.getElementById('timeline');
// const progressBar = document.getElementById('progressBar');
const infoCards = document.querySelectorAll('.info-card');
const stageImages = document.querySelectorAll('.stage-image');

// 定義每個階段的觸發點（百分比）
const dayTriggers = [
    { day: 1, start: 0, end: 18 },
    { day: 3, start: 18, end: 30 },
    { day: 5, start: 30, end: 42 },
    { day: 7, start: 42, end: 54 },
    { day: 9, start: 54, end: 66 },
    { day: 11, start: 66, end: 78 },
    { day: 13, start: 78, end: 90 },
    { day: 15, start: 90, end: 100 }
];

function updateTimeline() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - windowHeight)));
    const percentage = scrollProgress * 100;

    // 更新進度條
    // progressBar.style.height = `${percentage}%`;

    // 更新資訊卡片和圖片
    let activeStage = null;
    dayTriggers.forEach((trigger, index) => {
        const card = infoCards[index];
        const image = stageImages[index];

        if (percentage >= trigger.start && percentage <= trigger.end) {
            card.classList.add('active');
            image.classList.add('active');
            activeStage = trigger.day;
        } else {
            card.classList.remove('active');
            image.classList.remove('active');
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
/************************** timeline end ******************************/