// ==================== resource ====================
function loadData() {
	try {
		renderOrganizations(DATA.organizations);
		renderApps(DATA.apps);
	} catch (error) {
		console.error('載入資料失敗:', error);
	}
}

function renderOrganizations(organizations) {
	const container = document.getElementById('orgList');
	container.innerHTML = '';

	organizations.forEach(org => {
		const item = createOrganizationItem(org);
		container.appendChild(item);
	});
}

function createOrganizationItem(org) {
	const div = document.createElement('div');
	div.className = 'orgList__item js-collapse-group';

	// 處理服務內容
	const servicesHTML = Array.isArray(org.services) ?
		`<ol class="course">${org.services.map(s => `<li>${s}</li>`).join('')}</ol>` :
		`<div class="empty">${org.services}</div>`;

	// 處理特色服務
	const featuresHTML = Array.isArray(org.features) ?
		`<ol class="course">${org.features.map(f => `<li>${f}</li>`).join('')}</ol>` :
		`<div class="empty">${org.features}</div>`;

	div.innerHTML = `
		<div class="title js-collapse-switch">
			<span class="title__text">${org.name}</span>
		</div>
		<div class="content js-collapse-content">
			<div class="wrap">
				<div class="content__feature content__feature--service">
					<div class="lead">服務內容</div>
					${servicesHTML}
				</div>
				<div class="content__feature content__feature--promo">
					<div class="lead">特色服務</div>
					${featuresHTML}
				</div>
				<div class="content__feature content__feature--location">
					<div class="lead">服務據點</div>
					<div class="location">${org.locations}</div>
				</div>
				<div class="content__link">
					<a href="${org.website}" class="link" target="_blank">
						<span class="link__text">官網</span>
					</a>
				</div>
			</div>
		</div>
	`;

	return div;
}

function renderApps(apps) {
	const container = document.getElementById('appList');

	container.innerHTML = '';

	apps.forEach(app => {
		const item = createAppItem(app);
		container.appendChild(item);
	});
}

function createAppItem(app) {
	const div = document.createElement('div');
	div.className = 'appList__item';

	// 處理連結
	let linksHTML = '';
	if (app.links && Array.isArray(app.links)) {
		linksHTML = app.links.map((link, index) => {
			const separator = index < app.links.length - 1 ? '、' : '';
			return `<a href="${link.url}" class="link" target="_blank"><span class="link__text">${link.text}</span></a>${separator}`;
		}).join('');
	} else if (app.website) {
		// 單一連結
		linksHTML = `<a href="${app.website}" class="link" target="_blank"><span class="link__text">${app.linkText || '網站'}</span></a>`;
	}

	// 處理語言
	let langsHTML = '';
	if (app.langs && Array.isArray(app.langs)) {
		langsHTML = app.langs.map((lang, index) => {
			const separator = index < app.langs.length - 1 ? '、' : '';
			return `<span class="lang">${lang.text}</span>${separator}`;
		}).join('');
	}

	div.innerHTML = `
		<div class="title">
			<span class="title__text">${app.name}</span>
		</div>
		<div class="content">
			${linksHTML ? `
			<div class="content__link">
				<span class="lead">工具：</span>
				${linksHTML}
			</div>
			` : ''}
			${langsHTML ? `
			<div class="content__lang">
				<span class="lead">語言：</span>
				${langsHTML}
			</div>
			` : ''}
			<div class="content__info">
				${app.description}
			</div>

		</div>
	`;

	return div;
}

$(function () {
	loadData();

	setTimeout(function() {
        $('.js-collapse-switch').first().trigger('click');
    }, 100);
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

	$(document).on('click', '.js-collapse-switch', function(){
        var $this = $(this);
		var $target = $this.next('.js-collapse-content');
		var $group = $this.closest('.orgList__item');
		
		// 關閉同層級的其他項目
		$('.orgList__item').not($group).find('.js-collapse-switch').removeClass('is-open');
		$('.orgList__item').not($group).find('.js-collapse-content').slideUp();
		
		// 切換當前項目
		$this.toggleClass('is-open');
		$target.slideToggle();
    });
});