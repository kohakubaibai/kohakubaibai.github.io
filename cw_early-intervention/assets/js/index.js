$(function () {
	// ==================== WOW ====================
	new WOW().init();

	// ==================== Navbar Scroll Effect ====================
	const $nav = $("#mainNavbar");

	function checkScroll() {
		$nav.toggleClass("is-scrolled", $(window).scrollTop() > $nav.height());
	}

	checkScroll();

	$(window).on("scroll", checkScroll);

	// ==================== Mobile Navbar Toggle ====================
	var navbarX = $(".navbarX");
	navbarX.click(function () {
		navbarX.toggleClass('active');
		$('body').toggleClass('openNav');
	});

	$(".navbar .nav-link").click(function () {
		navbarX.is(".active") && navbarX.trigger("click");
	});

	// ==================== Collapse Accordion (RWD) ====================
	var COLLAPSE_BREAKPOINT = 991.98;

	function isCollapseEnabled() {
		return $(window).width() < COLLAPSE_BREAKPOINT;
	}

	function initCollapse() {
		var $collapseGroups = $('[data-collapse="group"]');

		if (isCollapseEnabled()) {
			$('[data-collapse="switch"]').off('click.collapse').on('click.collapse', function () {
				var $group = $(this).closest('[data-collapse="group"]');
				$group.toggleClass('is-active');
				$group.find('[data-collapse="content"]').fadeToggle();
			});
		} else {
			$('[data-collapse="switch"]').off('click.collapse');
			$collapseGroups.removeClass('is-active');
			$collapseGroups.find('[data-collapse="content"]').show();
		}
	}

	initCollapse();

	var collapseResizeTimer;
	$(window).on('resize', function () {
		clearTimeout(collapseResizeTimer);
		collapseResizeTimer = setTimeout(function () {
			initCollapse();
		}, 250);
	});

	// ==================== ScrollMagic Navigation ====================
	var hash = location.hash;
	var navLink = $(".navbar .nav-link");
	var controller = new ScrollMagic.Controller();
	var scrollArea = $(".scrollArea");
	var scrollAreaIdArr = [];
	var scrollAreaActive;

	function updateNav(href, andPush) {
		if (andPush) {
			history.pushState({ href: href }, "", href);
		} else {
			history.replaceState({ href: href }, "", href);
		}
		scrollAreaActive = href.slice(1);

		navLink.removeClass("is-active");
		navLink.filter("[href='" + href + "']").addClass("is-active");
	}

	scrollArea.each(function (i) {
		var area = $(this);
		var id = area.attr("id");
		scrollAreaIdArr.push(id);

		var scene = new ScrollMagic.Scene({
			triggerElement: area.get(0),
		})
			.on("enter", function (e) {
				updateNav("#" + id, false);
			})
			.on("leave", function (e) {
				if (e.scrollDirection == "REVERSE") {
					if (i > 0) {
						updateNav(
							"#" + scrollAreaIdArr[scrollAreaIdArr.findIndex((el) => el == scrollAreaActive) - 1],
							false
						);
					} else {
						navLink.removeClass("is-active");
						history.replaceState({ href: "" }, "", window.location.pathname);
						scrollAreaActive = "";
					}
				}
			})
			.addTo(controller);
	});

	setTimeout(function () {
		hash && navLink.filter("[href$='" + hash + "']").trigger("click");
	}, 100);

	// ==================== Article Slick Carousel ====================

	var slickBasicSetting = {
		dots: false,
		arrows: false,
		infinite: true,
	};

	var slickArticleSetting = {
		centerMode: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerPadding: '70px',
		draggable: false,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 800,
		cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					centerPadding: '1rem',
					slidesToShow: 1
				}
			},
		],
	};

	var currentSlideIndex = 0;
	var isTransitioning = false;

	function applyDownState(slideIndex) {
		$('.js-articleSlick .slickList__item').each(function () {
			var slickIndex = parseInt($(this).attr('data-slick-index'));
			
			if (isNaN(slickIndex)) return;
			
			var shouldHaveDown = (slideIndex % 2 === 0) ? (slickIndex % 2 === 0) : (slickIndex % 2 !== 0);
			
			$(this).toggleClass('is-down', shouldHaveDown);
		});
	}

	function initSlick() {
		var slickArticle = $(".js-articleSlick");

		if (slickArticle.length === 0) {
			return;
		}

		if (slickArticle.hasClass('slick-initialized')) {
			slickArticle.slick('unslick');
		}

		$('.js-articleSlick .slickList__item').removeClass('is-down');

		currentSlideIndex = 0;

		slickArticle.slick($.extend({}, slickBasicSetting, slickArticleSetting));

		applyDownState(0);

		slickArticle.off('beforeChange.customToggle').on('beforeChange.customToggle', function (event, slick, currentSlide, nextSlide) {
			isTransitioning = true;
			currentSlideIndex = nextSlide;
			
			applyDownState(nextSlide);
			
			var checkInterval = setInterval(function() {
				if (isTransitioning) {
					applyDownState(currentSlideIndex);
				} else {
					clearInterval(checkInterval);
				}
			}, 10);
		});

		slickArticle.off('afterChange.customToggle').on('afterChange.customToggle', function (event, slick, currentSlide) {
			isTransitioning = false;
			currentSlideIndex = currentSlide;
			
			applyDownState(currentSlide);
		});
		
		slickArticle.off('setPosition.customToggle').on('setPosition.customToggle', function(event, slick) {
			applyDownState(currentSlideIndex);
		});
	}

	initSlick();

	var slickResizeTimer;
	$(window).on('resize', function () {
		clearTimeout(slickResizeTimer);
		slickResizeTimer = setTimeout(function () {
			initSlick();
		}, 250);
	});
});