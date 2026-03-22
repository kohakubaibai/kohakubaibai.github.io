import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

class CardSwiper {
    constructor(selector, options = {}) {
        this.selector = selector;
        this.swiper = null;
        this.options = options;
        this.debug = options.debug || false;
        
        this.element = document.querySelector(this.selector);
        
        if (!this.element) {
            return;
        }

        this.checkBreakpoint();
        this.setupResizeListener();
    }

    log(...args) {
        if (this.debug) console.log(...args);
    }

    _debounce(func, wait = 200) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    setupResizeListener() {
        const debouncedCheck = this._debounce(() => {
            this.checkBreakpoint();
        }, 250);

        window.addEventListener('resize', debouncedCheck);
    }

    checkBreakpoint() {
        const windowWidth = window.innerWidth;
        const shouldBeActive = windowWidth >= 768;

        if (shouldBeActive && !this.swiper) {
            this.init();
        } else if (!shouldBeActive && this.swiper) {
            this.destroy();
        }
    }

    init() {
        if (this.swiper) return;

        const element = this.element;
        const cardCount = element.querySelectorAll('.swiper-slide').length

        let nextBtn = element.querySelector('.swiper-button-next');
        let prevBtn = element.querySelector('.swiper-button-prev');
        
        if (!nextBtn && element.parentElement) {
            nextBtn = Array.from(element.parentElement.children).find(el => el.classList.contains('swiper-button-next'));
        }
        if (!prevBtn && element.parentElement) {
            prevBtn = Array.from(element.parentElement.children).find(el => el.classList.contains('swiper-button-prev'));
        }

        const defaultOptions = {
            modules: [Navigation, Autoplay],
            slidesPerView: 3,
            spaceBetween: 20,
            loop: cardCount>3,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            breakpoints: {
                1024: { slidesPerView: 3 }
            },
        };

        try {
            this.swiper = new Swiper(this.element, { ...defaultOptions, ...this.options });
        } catch (error) {
            console.error(`Swiper 初始化失敗:`, error);
        }
    }

    destroy() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
            this.swiper = null; 
            this.log(`Swiper 銷毀 [${this.selector}]`);
        }
    }

    static initAll(selector = '.js-cardSwiper', options = {}) {
        const elements = document.querySelectorAll(selector);
        return Array.from(elements).map((el, index) => {
            const uniqueClass = `js-swiper-inst-${index}`;
            el.classList.add(uniqueClass);
            return new CardSwiper(`.${uniqueClass}`, options);
        });
    }
}

export default CardSwiper;