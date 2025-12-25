/************************** timeline start ******************************/
const timeline = document.getElementById('timeline');
const infoCards = document.querySelectorAll('.info-card');
const stageImages = document.querySelectorAll('.stage-image');
const cardsContainer = document.querySelector('.cards-container');
const progressMarkers = document.querySelectorAll('.progress-marker');

// 計算總高度
function calculateTotalHeight() {
    let totalHeight = 0;
    infoCards.forEach(card => {
        totalHeight += card.offsetHeight;
    });
    // 添加額外的空間讓最後一個卡片也能滾動到視口中央
    // totalHeight += window.innerHeight;
    return totalHeight;
}

// 設置timeline容器高度
function setTimelineHeight() {
    const height = calculateTotalHeight();
    timeline.style.height = `${height}px`;
}

function updateTimeline() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 計算滾動進度
    const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - windowHeight)));

    // 計算cards-container應該向上移動的距離
    let totalCardHeight = 0;
    infoCards.forEach(card => {
        totalCardHeight += card.offsetHeight;
    });

    const maxScroll = totalCardHeight;
    const translateY = -scrollProgress * maxScroll;

    // 移動cards-container
    if (cardsContainer) {
        cardsContainer.style.transform = `translateY(${translateY}px)`;
    }

    // 找出當前最接近視口中央的卡片
    let closestCard = null;
    let closestDistance = Infinity;
    let closestIndex = 0;

    infoCards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
            closestIndex = index;
        }

        // 移除所有active class
        card.classList.remove('active');
    });

    // 為最接近的卡片添加active class
    if (closestCard) {
        closestCard.classList.add('active');

        // 切換對應的圖片
        stageImages.forEach((image, index) => {
            if (index === closestIndex) {
                image.classList.add('active');
            } else {
                image.classList.remove('active');
            }
        });

        // 更新進度標記
        progressMarkers.forEach((marker, index) => {
            const label = marker.querySelector('.marker-label');
            const dot = marker.querySelector('.marker-dot');

            if (index === closestIndex) {
                label.classList.add('active');
                dot.classList.add('active');
            } else {
                label.classList.remove('active');
                dot.classList.remove('active');
            }
        });
    }
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
window.addEventListener('load', () => {
    setTimelineHeight();
    updateTimeline();
});

// 視窗大小改變時重新計算
window.addEventListener('resize', () => {
    setTimelineHeight();
    updateTimeline();
});
/************************** timeline end ******************************/