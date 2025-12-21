$(function () {
	new WOW().init();

	$(document).scroll(function () {
		var $nav = $("#mainNavbar");
		$nav.toggleClass("is-scrolled", $(this).scrollTop() > $nav.height());
	});
	var navbarX=$(".navbarX");
	navbarX.click(function(){
		console.log('click')
		navbarX.toggleClass('active');
		$('body').toggleClass('openNav');
    });

	$(".navbar .nav-link").click(function(){
		navbarX.is(".active") && navbarX.trigger("click");
	});

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
		slidesToShow: 3,
		slidesToScroll: 1,
		draggable: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					fade: true,
					slidesToShow: 1
				}
			},
		],
	};

	function initSlick() {
		var slickArticle = $(".js-articleSlick");
		
		if (slickArticle.length === 0) {
			return;
		}
		
		if (slickArticle.hasClass('slick-initialized')) {
			slickArticle.slick('unslick');
		}
		
		slickArticle.slick($.extend({}, slickBasicSetting, slickArticleSetting));
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