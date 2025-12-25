$(function () {
	new WOW().init();

	$(document).scroll(function () {
		var $nav = $("#mainNavbar");
		$nav.toggleClass("is-scrolled", $(this).scrollTop() > $nav.height());
	});
	var navbarX=$(".navbarX");
	navbarX.click(function(){
		navbarX.toggleClass('active');
		$('body').toggleClass('openNav');
    });

	$(".navbar .nav-link").click(function(){
		navbarX.is(".active") && navbarX.trigger("click");
	});

	/************************** collapse start ******************************/
	$('[data-collapse="switch"]').on('click', function(){
		var $group = $(this).closest('[data-collapse="group"]');
		$group.toggleClass('is-active');
		$group.find('[data-collapse="content"]').fadeToggle();
	});
	/************************** collapse end ******************************/

	/************************** ScrollMagic start ******************************/
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
							"#" +
							scrollAreaIdArr[
							scrollAreaIdArr.findIndex((el) => el == scrollAreaActive) - 1
							],
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
	/************************** ScrollMagic end ******************************/

	/************************** article slick start ******************************/
	var slickBasicSetting = {
		dots: false,
		autoplaySpeed: 5000,
		infinite: true,
		prevArrow:
			'<div class="btn-arrowL effect-moveL"></div>',
		nextArrow:
			'<div class="btn-arrowR effect-moveR"></div>',
	};

	var slickArticleSetting = {
		centerMode: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerPadding: '70px',
		draggable: false,
		autoplay: true,
		autoplaySpeed: 3000,
		infinite: true,
		speed: 800,
		cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-next"></button>',
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

	var initialDownState = [];
	
	function saveInitialState() {
		if (initialDownState.length === 0) {
			$('.js-articleSlick .slickList__item').each(function(index) {
				initialDownState.push($(this).hasClass('is-down'));
			});
		}
	}
	
	function restoreInitialState() {
		$('.js-articleSlick .slickList__item').each(function(index) {
			if (initialDownState[index]) {
				$(this).addClass('is-down');
			} else {
				$(this).removeClass('is-down');
			}
		});
	}

	function initSlick() {
		var slickArticle = $(".js-articleSlick");

		if (slickArticle.length === 0) {
			return;
		}

		saveInitialState();
		
		if (slickArticle.hasClass('slick-initialized')) {
			restoreInitialState();
			slickArticle.slick('unslick');
		}

		slickArticle.slick($.extend({}, slickBasicSetting, slickArticleSetting));

		slickArticle.off('beforeChange.customToggle').on('beforeChange.customToggle', function(event, slick, currentSlide, nextSlide) {
			$('.js-articleSlick .slickList__item').each(function() {
				$(this).toggleClass('is-down');
			});
		});
	}
	
	initSlick();
	
	var resizeTimer;
	$(window).on('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			initSlick();
		}, 250);
	});
	/************************** slick end ******************************/

});