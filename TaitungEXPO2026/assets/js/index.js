class CardSwiper {
    constructor(selector, options = {}) {
        this.selector = selector;
        this.swiper = null;
        this.options = options;

        this.debug = options.debug || false;

        this.init();
    }

    log(...args) {
        if (this.debug) console.log(...args);
    }

    init() {
        const element = document.querySelector(this.selector);

        if (!element) {
            return;
        }


        const slides = element.querySelectorAll('.swiper-slide');

        let nextBtn = element.querySelector('.swiper-button-next');
        let prevBtn = element.querySelector('.swiper-button-prev');

        if (!nextBtn && element.parentElement) {
            const parent = element.parentElement;
            nextBtn = Array.from(parent.children).find(
                el => el.classList.contains('swiper-button-next')
            );
        }
        if (!prevBtn && element.parentElement) {
            const parent = element.parentElement;
            prevBtn = Array.from(parent.children).find(
                el => el.classList.contains('swiper-button-prev')
            );
        }

        const defaultOptions = {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
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
                0: {
                    enabled: false,
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            },
            on: {
                init: (swiper) => {
                    const nextBtn = swiper.navigation.nextEl;
                    const prevBtn = swiper.navigation.prevEl;
                }
            }
        };

        const swiperOptions = { ...defaultOptions, ...this.options };

        try {
            this.swiper = new Swiper(this.selector, swiperOptions);
        } catch (error) {
            console.error(error);
        }
    }

    destroy() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
        }
    }

    static initAll(selector = '.js-cardSwiper', options = {}) {
        const elements = document.querySelectorAll(selector);
        const instances = [];

        elements.forEach((element, index) => {
            const uniqueClass = `${selector.replace('.', '')}-${index}`;
            element.classList.add(uniqueClass);

            const instance = new CardSwiper(`.${uniqueClass}`, options);
            instances.push(instance);
        });

        return instances;
    }
}

document.addEventListener('DOMContentLoaded', function() {

	const cardSwipers = CardSwiper.initAll('.js-cardSwiper', {
        debug: false
    });
});

$(document).ready(function () {
	$(document).scroll(function () {
		var $nav = $(".l-header .sticky-wrapper");
		$nav.toggleClass("header-sticky", $(this).scrollTop() > (($nav.height())*2));
	});

	$(".js-navOpen").on('click', function () {
		$(".js-navigation").addClass("is-open");
		$('body').addClass('openNav');
	});

	$(".js-navClose").on('click', function () {
		$(".js-navigation").removeClass("is-open");
		$('body').removeClass('openNav');
	});

	new WOW().init();

    var headerH = $('.l-header').outerHeight(true);
	$(".js-anchor").on('click', function (e) {

		if (this.hash !== "") {
			e.preventDefault();

			var hash = this.hash;

			$('html, body').animate({
				scrollTop: ($(hash).offset().top) - (headerH + 50)
			}, 800);

			$(".js-navigation").removeClass("is-open");
			$('body').removeClass('openNav');
		}
	});

});