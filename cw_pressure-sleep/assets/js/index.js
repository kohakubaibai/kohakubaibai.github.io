$(function () {
	var navbarX=$(".navbarX");
	navbarX.click(function(){
		console.log('click')
		navbarX.toggleClass('active');
		$('body').toggleClass('openNav');
    });

	$(".navbar .nav-link").click(function(){
		navbarX.is(".active") && navbarX.trigger("click");
	});

	var $mainKvBox = $('.mainKvBox');
    var mainKvBoxTop = $mainKvBox.offset().top;
    var mainKvBoxHeight = $mainKvBox.outerHeight();
    var mainKvBoxBottom = mainKvBoxTop + mainKvBoxHeight;

	$(window).on('scroll', function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > (mainKvBoxBottom / 2)) {
			$('.btn-more').addClass('is-active');
		} else {
			$('.btn-more').removeClass('is-active');
		}
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
				if (i > 0 && e.scrollDirection == "REVERSE") {
					updateNav(
						"#" +
						scrollAreaIdArr[
						scrollAreaIdArr.findIndex((el) => el == scrollAreaActive) - 1
						],
						false
					);
				}
			})
			.addTo(controller);
	});

	setTimeout(function () {
		hash && navLink.filter("[href$='" + hash + "']").trigger("click");
	}, 100);
	/************************** ScrollMagic end ******************************/

	/************************** game start ******************************/
	let currentQuestion = 1;
	const totalQuestions = 10;

	function initializeTest() {
		$(".quizBox").each(function (index) {
			const $this = $(this);
			const questionNum = index + 1;

			if (questionNum === 1) {
				$this.show().addClass("active");
			} else {
				$this.hide().removeClass("active");
			}
		});

		$(".stressForm__result").hide();

		bindEvents();
	}

	function bindEvents() {
		$(".stressForm__questions").on(
			"change",
			'input[type="radio"]',
			function () {
				const $this = $(this);
				const questionName = $this.attr("name");
				const questionNum = parseInt(questionName.replace("q", ""));

				handleAnswer(questionNum);
			}
		);
	}

	function handleAnswer(questionNumber) {
		setTimeout(() => {
			if (questionNumber < totalQuestions) {
				showNextQuestion(questionNumber);
			} else {
				calculateAndShowResult();
			}
		}, 300);
	}

	function showNextQuestion(currentQ) {
		const $currentQuestionBox = $(`[data-question="${currentQ}"]`);
		const $nextQuestionBox = $(`[data-question="${currentQ + 1}"]`);

		if ($currentQuestionBox.length && $nextQuestionBox.length) {
			$currentQuestionBox.fadeOut(300, function () {
				$(this).removeClass("active");

				$nextQuestionBox.addClass("active").fadeIn(300);
			});

			currentQuestion = currentQ + 1;
		}
	}

	function calculateAndShowResult() {
		let totalScore = 0;
		let answeredQuestions = 0;

		for (let i = 1; i <= totalQuestions; i++) {
			const $selectedRadio = $(`input[name="q${i}"]:checked`);
			if ($selectedRadio.length) {
				totalScore += parseInt($selectedRadio.data("score"));
				answeredQuestions++;
			}
		}

		if (answeredQuestions < totalQuestions) {
			console.log("測試出現錯誤，請重新開始！");
			return;
		}

		const $lastQuestionBox = $(`[data-question="${totalQuestions}"]`);
		$lastQuestionBox.fadeOut(300, function () {
			$(this).removeClass("active");
			$('.stressForm__questions').hide();
			showResult(totalScore);
		});
	}

	function showResult(totalScore) {
		const $resultSection = $(".stressForm__result");
		const $quizIntro = $("#quizIntro");
		const $resultDiv = $("#resultBox");
		const $resultTitle = $("#resultTitle");
		const $scoreRange = $("#scoreRange");
		const $resultDescription = $("#resultDescription");

		$resultDiv.removeClass().addClass("resultBox");

		const resultData = getResultData(totalScore);

		$resultDiv.addClass(resultData.class);
		$resultTitle.text(resultData.title);
		$scoreRange.text(resultData.range);
		$resultDescription.html(resultData.description);

		$resultSection.fadeIn(500);
		$quizIntro.fadeOut()
	}

	function getResultData(totalScore) {
		if (totalScore <= 13) {
			return {
				class: "low",
				title: "輕微壓力型",
				range: "0~13分",
				description:
					"<p>你的壓力還在可以接受的範圍，善於調適壓力的你，對高壓環境適應度很高！</p><p>建議可以先嘗試看看每週2次以上的運動緩解壓力，多曬曬太陽也能幫助睡眠。</p>",
			};
		} else if (totalScore >= 14 && totalScore <= 26) {
			return {
				class: "medium",
				title: "中度壓力型",
				range: "14~26分",
				description:
					"<p>你成功將生活壓力調適在可控範圍內，是個勤奮的生活家！</p><p>但別忘了與家人、朋友聊聊，或多關注壓力管理、學習紓壓來調適壓力，不然長久累積下來，可能會常睡不好，導致睡眠債會越積越多。</p><p>想拒絕壓力型失眠，體驗深度熟睡，繼續往下看就對了！</p>",
			};
		} else if (totalScore >= 27 && totalScore <= 37) {
			return {
				class: "high",
				title: "高度壓力型",
				range: "27~37分",
				description:
					"<p>生活的高壓讓你有點喘不過氣。你已經很努力了，卻還是感到很辛苦嗎？</p><p>其實你不孤單，現代快節奏的社會，許多人會藉由找尋合格的心理衛生專業人員來紓解內心壓力，或是補充好眠保健食品來對抗壓力型失眠。</p><p>畢竟睡得好才能補充明天所需的精神，勇敢為自己的健康做出嘗試吧！</p>",
			};
		} else {
			return {
				class: "over",
				title: "過度壓力型",
				range: "38分以上",
				description:
					"<p>你一定很辛苦吧？</p><p>嚴重的壓力已經讓你提不起力氣面對未來，你可以尋求專業心理衛生人員、精神專科醫師的幫助。</p><p>除了透過醫師專用處方用藥、心理治療，也可以試試看添加天然草本類型的輔眠保健品，睡飽、吃好，趕快讓生活回歸健康軌道！</p>",
			};
		}
	}

	function restartTest() {
        currentQuestion = 1;
        
        $('input[type="radio"]').prop('checked', false);
        $('.quizBox').hide().removeClass('active');
        $('.stressForm__result').fadeOut(300, function() {
            $('[data-question="1"]').addClass('active').fadeIn(300);
			$("#quizIntro").show();
			$('.stressForm__questions').show();
        });
    }

	initializeTest();

	window.restartTest = function(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        restartTest();
        return false;
    };

	$(document).on('click', '#restartBtn', function(e) {
        e.preventDefault();
        restartTest();
        return false;
    });
	/************************** game end ******************************/

	/************************** collapse start ******************************/
	const collapseGroups = document.querySelectorAll('.collapseGroup');

	function syncVisibleHeights() {
		if (window.innerWidth < 768) return;
		const visibleCategories = ['cause', 'sleep-onset', 'sleep-state'];

		visibleCategories.forEach(category => {
			const items = document.querySelectorAll(`[data-category="${category}"]`);
			if (items.length === 2) {
				items.forEach(item => item.style.minHeight = 'auto');

				let maxHeight = 0;
				items.forEach(item => {
					maxHeight = Math.max(maxHeight, item.offsetHeight);
				});

				items.forEach(item => {
					item.style.minHeight = maxHeight + 'px';
				});
			}
		});
	}

	function clearHeightSync() {
		const allItems = document.querySelectorAll('[data-category]');
		allItems.forEach(item => {
			item.style.minHeight = 'auto';
		});
	}

	function expandHiddenItems(group) {
		const switcher = group.querySelector('.collapseGroup__switcher');
		const hiddenItems = group.querySelectorAll('[data-category="early-wake"], [data-category="drowsiness"], [data-category="physical"]');

		if (switcher.classList.contains('expanded')) return;

		hiddenItems.forEach((item, index) => {
			setTimeout(() => {
				item.style.height = 'auto';
				const height = item.scrollHeight;
				item.style.height = '0px';

				item.offsetHeight;

				item.style.height = height + 'px';
				item.classList.add('expanded');

				setTimeout(() => {
					item.style.height = 'auto';
				}, 500);
			}, index * 200);
		});

		switcher.style.display = 'none';
		group.classList.add('active');
	}

	collapseGroups.forEach(group => {
		const switcher = group.querySelector('.collapseGroup__switcher');

		switcher.addEventListener('click', function() {
			expandHiddenItems(group);
		});
	});

	setTimeout(syncVisibleHeights, 100);

	window.addEventListener('resize', function() {
		setTimeout(() => {
			if (window.innerWidth < 768) {
				// 小螢幕：清除高度同步，讓內容自然撐開
				clearHeightSync();
			} else {
				// 大螢幕：重新同步高度
				syncVisibleHeights();
			}
		}, 100);
	});
	/************************** collapse end ******************************/

	/************************** merit slick start ******************************/
	let slickInitialized = false;

	// 初始化 Slick（延遲執行以確保 DOM 完全載入）
	function initMeritSlick() {
		if (!slickInitialized) {
			$('.js-meritsSlick').slick({
				fade: true,
				dots: true,
				arrows: false,
				infinite: false,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: false,
				pauseOnHover: true,
				variableWidth: false,
				centerMode: false,
				adaptiveHeight: false,
				draggable: false,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							fade: true,
							slidesToShow: 1,
							slidesToScroll: 1,
							arrows: false,
							dots: true,
							adaptiveHeight: false,
							variableWidth: false,
							centerMode: false,
						}
					}
				]
			});
			slickInitialized = true;
		}
	}
	$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
		const targetTab = $(e.target).attr('data-bs-target');

		if (targetTab === '#meritTab5') {
			setTimeout(function() {
				initMeritSlick();
			}, 100);
		}
	});

	setTimeout(function() {
		if (!slickInitialized && !$('#meritTab5').hasClass('active')) {
			const $tab5 = $('#meritTab5');
			const wasActive = $tab5.hasClass('show active');

			if (!wasActive) {
				$tab5.addClass('show active').css('opacity', '0');
				setTimeout(function() {
					initSlick();
					$tab5.removeClass('show active').css('opacity', '');
				}, 50);
			}
		}
	}, 2000);

	$(window).on('resize', function() {
		if (slickInitialized) {
			setTimeout(function() {
				$('.js-meritsSlick').slick('setPosition');
			}, 100);
		}
	});
	/************************** merit slick end ******************************/

	/************************** article slick start ******************************/
	var slickBasicSetting = {
		dots: false,
		//autoplay: true,
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
		responsive: [
			{
				breakpoint: 767,
				settings: "unslick"
			},
		],
	};

	function initSlick() {
		var slickArticle = $(".js-articleSlick");

		if ($(window).width() >= 768) {
			if (!slickArticle.hasClass('slick-initialized')) {
				slickArticle.slick($.extend({}, slickBasicSetting, slickArticleSetting));
			}
		} else {
			if (slickArticle.hasClass('slick-initialized')) {
				slickArticle.slick('unslick');
			}
		}
	}

	initSlick();

	$(window).resize(function() {
		initSlick();
	});

	/************************** slick end ******************************/

	new WOW().init();
});

/************************** share start ******************************/
	

	function shareToFacebook(url, title) {
		const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
		window.open(shareUrl, 'facebook-share', 'width=580,height=296');
	}
	
	function shareToLine(url, title) {
		const text = `${title} ${url}`;
		const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
		window.open(shareUrl, 'line-share', 'width=500,height=500');
	}

	document.addEventListener('DOMContentLoaded', function() {
		// Facebook share
		document.querySelectorAll('.fb-share').forEach(link => {
			link.addEventListener('click', function(e) {
				e.preventDefault();			
				const url = window.location.href;
				const title = document.title;	
				shareToFacebook(url, title);
			});
		});
		
		// LINE share
		document.querySelectorAll('.line-share').forEach(link => {
			link.addEventListener('click', function(e) {
				e.preventDefault();
				const url = window.location.href;
				const title = document.title;
				shareToLine(url, title);
			});
		});
	});
	/************************** share end ******************************/
