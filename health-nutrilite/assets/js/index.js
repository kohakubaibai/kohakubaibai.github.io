window.addEventListener('load', () => {
	setTimeout(() => {
		document.querySelector('#kvText').classList.add('animate');

		document.querySelector('#reveal-rect-2').addEventListener('animationend', () => {
			const subTitle = document.querySelector('#hero .subTitle');
			subTitle.style.animationDuration = '0.5s';
			subTitle.style.visibility = 'visible';
			subTitle.classList.add('animated', 'fadeInUp');

			setTimeout(() => {
				const aiTopic = document.querySelector('#hero .heroBox__text .aiTopic');
				aiTopic.style.animationDuration = '0.5s';
				aiTopic.style.visibility = 'visible';
				aiTopic.classList.add('animated', 'fadeIn');
			}, 500);
		}, { once: true });
	}, 600);
});

// 蛋白質計算機
const GROUPS = [
  { key: 'general',  label: '一般成人',    note: '每公斤 需攝取1.1g蛋白質', coef: [1.1, 1.1] },
  { key: 'senior',   label: '銀髮族',      note: '每公斤 需攝取1.2g蛋白質', coef: [1.2, 1.2] },
  { key: 'athlete',  label: '運動/增肌族', note: '每公斤 需攝取1.3~1.6g 蛋白質', coef: [1.3, 1.6] },
  { key: 'maternal', label: '孕哺期女性',  note: '每公斤 需攝取1.1g蛋白質<br>額外增加10~15g', coef: [1.1, 1.1], extra: [10, 15] },
];

const slider      = document.getElementById('weightSlider');
const weightLabel = document.getElementById('weightLabel');
const grid        = document.getElementById('groupsGrid');
const resultVal   = document.getElementById('resultVal');
const perMeal     = document.getElementById('perMeal');

let activeKey = 'general';

GROUPS.forEach(g => {
  const card = document.createElement('div');
  card.className = 'gridWrap__item crowdCard' + (g.key === activeKey ? ' is-active' : '');
  card.dataset.key = g.key;
  card.innerHTML = `<div class="crowdCard__name">${g.label}</div><div class="crowdCard__note">${g.note}</div>`;
  card.addEventListener('click', () => {
    activeKey = g.key;
    document.querySelectorAll('.crowdCard').forEach(c => c.classList.remove('is-active'));
    card.classList.add('is-active');
    render();
  });
  grid.appendChild(card);
});

function updateSliderTrack() {
  const min = +slider.min, max = +slider.max, val = +slider.value;
  const pct = ((val - min) / (max - min) * 100).toFixed(1) + '%';
  slider.style.setProperty('--pct', pct);
}

function render() {
  const w = +slider.value;

  // label
  weightLabel.innerHTML = `${w}`;

  // find active group
  const g = GROUPS.find(x => x.key === activeKey);
  const [exLo, exHi] = g.extra || [0, 0];
  const lo = w * g.coef[0] + exLo;
  const hi = w * g.coef[1] + exHi;
  const isRange = lo !== hi;

  if (isRange) {
    resultVal.className = 'count';
    resultVal.textContent = lo.toFixed(0) + '~' + hi.toFixed(0);
    const loM = (lo / 3).toFixed(0), hiM = (hi / 3).toFixed(0);
    perMeal.innerHTML = `平均三餐，每餐約 <strong>${loM}~${hiM}g</strong>`;
  } else {
    resultVal.className = 'count';
    resultVal.textContent = lo.toFixed(0);
    perMeal.innerHTML = `平均三餐，每餐約 <strong>${(lo / 3).toFixed(0)}g</strong>`;
  }

  updateSliderTrack();
}

slider.addEventListener('input', render);
render();

// 蛋白質排行榜
(function () {
  const table = document.getElementById('protein-ranking');
  const targets = table.querySelectorAll('[data-target]');
  let animated = false;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function runCountUp() {
    if (animated) return;
    animated = true;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutQuart(progress);

      targets.forEach(el => {
        const target = parseFloat(el.dataset.target);
        const current = target * ease;
        el.textContent = (Number.isInteger(target)
          ? Math.round(current)
          : current.toFixed(1));
      });

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        targets.forEach(el => {
          const target = parseFloat(el.dataset.target);
          el.textContent = (Number.isInteger(target)
            ? target
            : target.toFixed(1));
        });
      }
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCountUp();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(table);
})();

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
		$nav.toggleClass('is-opened');
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
					centerPadding: '25px',
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

	// ==================== Equalize Strategy Tab Pane Heights ====================
	function equalizeStrategyTabPanes() {
		var $tabContent = $('.tabContent--strategy');
		if (!$tabContent.length) return;

		var $panes = $tabContent.find('.strategyBox');

		if ($(window).width() < 768) {
			$panes.css('min-height', '');
			return;
		}

		var containerWidth = $tabContent.width();

		$panes.css('min-height', '');

		var maxHeight = 0;
		$panes.each(function () {
			var $pane = $(this);
			var wasHidden = !$pane.hasClass('active');
			if (wasHidden) {
				$pane.css({ display: 'block', visibility: 'hidden', position: 'absolute', width: containerWidth + 'px' });
			}
			maxHeight = Math.max(maxHeight, $pane.outerHeight());
			if (wasHidden) {
				$pane.css({ display: '', visibility: '', position: '', width: '' });
			}
		});

		$panes.css('min-height', maxHeight + 'px');
	}

	equalizeStrategyTabPanes();

	var strategyTabResizeTimer;

	$(window).on('resize', function () {
		clearTimeout(strategyTabResizeTimer);
		strategyTabResizeTimer = setTimeout(equalizeStrategyTabPanes, 250);
	});


	//蛋白質攝取卡片翻轉
	$('.js-defectCard').on('click', function(){
		$(this).toggleClass('is-active');
	});
});