class singleSlider {
    constructor(selector, options = {}) {
        this.selector = selector;
        this.options = options;
        this.init();
    }

    init() {
        this.initSwiper();
    }

    initSwiper() {
        const defaultOptions = {
            autoplay: true,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        };

        const swiperOptions = { ...defaultOptions, ...this.options };
        this.swiper = new Swiper(this.selector, swiperOptions);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const carousel = new singleSlider('.js-singleImgSwiper');
});
