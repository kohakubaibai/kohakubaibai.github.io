// 語言切換
class LanguageSwitcher {
	constructor() {
		this.currentLang = 'zh'; // 預設語言為中文
		this.languageData = {}; // 存儲載入的語言數據
		this.isLoading = false; // 載入狀態
		this.init();
	}

	async init() {
		try {
			// 綁定按鈕事件 - 單一按鈕切換
			document.getElementById('langToggleBtn').addEventListener('click', () => this.toggleLanguage());

			// 載入默認語言
			await this.loadLanguage(this.currentLang);
			this.updateNavigation();
			this.updateIntro();
			this.updateAbout();
			this.updateButtonText();

			document.body.classList.add('lang--zh');
		} catch (error) {
			console.log('初始化失敗: ' + error.message);
		}
	}

	async loadLanguage(lang) {
		// 如果已經載入過該語言，直接返回
		if (this.languageData[lang]) {
			return this.languageData[lang];
		}

		try {
			// 實際載入JSON文件
			const response = await fetch(`./assets/js/language/${lang}.json`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			this.languageData[lang] = data;
			return data;
		} catch (error) {
			throw new Error(`載入 ${lang}.json 失敗: ${error.message}`);
		}
	}

	// 切換語言（單一按鈕模式）
	async toggleLanguage() {
		const nextLang = this.currentLang === 'zh' ? 'en' : 'zh';
		await this.switchLanguage(nextLang);
	}

	async switchLanguage(lang) {
		if (this.currentLang === lang || this.isLoading) return;

		this.isLoading = true;
		this.setButtonDisabled(true);

		// 添加載入效果
		document.querySelector('.l-nav').classList.add('loading');

		try {
			// 載入語言文件
			await this.loadLanguage(lang);

			setTimeout(() => {
				this.currentLang = lang;
				this.updateButtonText();
				this.updateNavigation();
				this.updateIntro();
				this.updateAbout();

				this.updateHtmlLang();

				// 移除載入效果
				document.querySelector('.l-nav').classList.remove('loading');
				this.setButtonDisabled(false);
				this.isLoading = false;
			}, 150);
		} catch (error) {
			console.loe(error.message);
			document.querySelector('.l-nav').classList.remove('loading');
			this.setButtonDisabled(false);
			this.isLoading = false;
		}
	}

	setButtonDisabled(disabled) {
		document.getElementById('langToggleBtn').disabled = disabled;
	}

	updateButtonText() {
		const btn = document.getElementById('langToggleBtn');
		// 網站內容是中文時，按鈕顯示 "EN"（點擊後切換到英文）
		// 網站內容是英文時，按鈕顯示 "中文"（點擊後切換到中文）
		btn.textContent = this.currentLang === 'zh' ? 'EN' : '中文';

		// 動畫效果
		btn.classList.add('active');
		setTimeout(() => {
			btn.classList.remove('active');
		}, 200);
	}

	updateNavigation() {
		const currentData = this.languageData[this.currentLang];
		if (!currentData || !currentData.nav) return;

		const navData = currentData.nav;

		// 更新所有連結文字
		document.querySelectorAll('.navbarText').forEach(anchor => {
			const jsonKey = anchor.getAttribute('data-json-key');
			if (navData[jsonKey]) {
				// 更新 span 內的文字
				const spans = anchor.querySelectorAll('span');
				if (spans) {
					spans.forEach(span => {
						span.textContent = navData[jsonKey];
					});
				}
				// 如果沒有 span，直接設置 anchor 的文字
				else {
					anchor.textContent = navData[jsonKey];
				}
			}
		});
	}

	updateIntro() {
		const currentData = this.languageData[this.currentLang];
		if (!currentData || !currentData.intro) return;

		const introData = currentData.intro;

		document.querySelectorAll('.introText').forEach(intro => {
			const jsonKey = intro.getAttribute('data-json-key');
			if (introData[jsonKey]) {
				// 更新 p 內的文字
				const p = intro;
				p.textContent = introData[jsonKey];
			}
		});
	}

	updateAbout() {
		const currentData = this.languageData[this.currentLang];
		if (!currentData || !currentData.about) return;

		const aboutData = currentData.about;

		// 更新第一個about區塊
		if (aboutData.aboutGroup1) {
			const group1 = aboutData.aboutGroup1;

			// 更新標題
			const title1 = document.querySelector('#aboutGroup1 .sectionGroup__title');
			if (title1) title1.textContent = group1.title;

			// 更新段落
			group1.texts.forEach((text, index) => {
				const paragraph = document.querySelector(`#aboutGroup1 .text-${index + 1}`);
				if (paragraph) paragraph.textContent = text;
			});
		}

		// 更新第二個about區塊
		if (aboutData.aboutGroup2) {
			const group2 = aboutData.aboutGroup2;

			// 更新標題
			const title2 = document.querySelector('#aboutGroup2 .sectionGroup__title');
			if (title2) title2.innerHTML = group2.title;

			// 更新段落
			group2.texts.forEach((text, index) => {
				const paragraph = document.querySelector(`#aboutGroup2 .text-${index + 1}`);
				if (paragraph) paragraph.textContent = text;
			});
		}
	}

	updateHtmlLang() {
		// 更新 HTML lang 屬性
		document.documentElement.lang = this.currentLang === 'zh' ? 'zh-TW' : 'en';
		this.updateBodyClass();
	}

	updateBodyClass() {
		const body = document.body;

		// 移除舊的語言 class
		body.classList.remove('lang--zh', 'lang--en');

		// 增加新的語言 class
		body.classList.remove('lang--zh', 'lang--en');
		body.classList.add(`lang--${this.currentLang}`);
	}

	showError(message) {
		const errorEl = document.getElementById('errorMessage');
		errorEl.textContent = message;
		errorEl.style.display = 'block';
	}

	hideError() {
		const errorEl = document.getElementById('errorMessage');
		errorEl.style.display = 'none';
	}

	// 取得目前語言
	getCurrentLanguage() {
		return this.currentLang;
	}

	// 取得指定key的翻譯
	getText(key, section = 'nav') {
		const currentData = this.languageData[this.currentLang];
		return currentData?.[section]?.[key] || key;
	}

	// 預先載入語言
	async preloadLanguage(lang) {
		try {
			await this.loadLanguage(lang);
		} catch (error) {
			console.warn(`預載入語言 ${lang} 失敗:`, error);
		}
	}
}

// 初始化語言切換
const langSwitcher = new LanguageSwitcher();

// 預載入另一種語言（可選）
setTimeout(() => {
	langSwitcher.preloadLanguage('en');
}, 1000);

// header滾動效果
class ScrollHeader {
	constructor() {
		this.header = document.getElementById('header');
		this.headerHeight = this.header.offsetHeight;
		this.hideThreshold = this.headerHeight;
		this.showThreshold = this.headerHeight * 2;
		this.isHeaderHidden = false;
		this.ticking = false;

		this.init();
	}

	init() {
		window.addEventListener('scroll', () => {
			if (!this.ticking) {
				requestAnimationFrame(() => {
					this.handleScroll();
					this.ticking = false;
				});
				this.ticking = true;
			}
		});

		this.handleScroll();
	}

	handleScroll() {
		const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (currentScrollTop > this.showThreshold) {
			this.showHeader();
		} else if (currentScrollTop > this.hideThreshold) {
			this.hideHeader();
		} else {
			this.showHeader();
		}
	}

	showHeader() {
		if (this.isHeaderHidden) {
			this.header.classList.remove('hide');
			this.isHeaderHidden = false;
		}
	}

	hideHeader() {
		if (!this.isHeaderHidden) {
			this.header.classList.add('hide');
			this.isHeaderHidden = true;
		}
	}
}

// 增強版滾動效果 - 根據滾動方向控制
class EnhancedScrollHeader {
	constructor() {
        this.header = document.getElementById('header');
        this.headerHeight = this.header.offsetHeight;
        this.isHeaderHidden = false;
        this.ticking = false;

        this.updateThresholds();
        this.init();
    }

	updateThresholds() {
        this.headerHeight = this.header.offsetHeight;
        this.hideThreshold = this.headerHeight;
        this.showThreshold = this.headerHeight * 2;
    }

	init() {
		window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });

        // 當螢幕尺寸改變（如RWD切換）時更新高度
        window.addEventListener('resize', () => this.updateThresholds());

        this.handleScroll(); // 初始化檢查
	}

	handleScroll() {
		const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > this.showThreshold) {
            this.showHeader();
        } else if (currentScrollTop > this.hideThreshold) {
            this.hideHeader();
        } else {
            this.showHeader();
        }
	}

	showHeader() {
		if (this.isHeaderHidden) {
            this.header.classList.remove('hide');
            this.isHeaderHidden = false;
        }
	}

	hideHeader() {
		if (!this.isHeaderHidden) {
			this.header.classList.add('hide');
			this.isHeaderHidden = true;
		}
	}
}

// 初始化滾動效果
// 使用基本版本
// new ScrollHeader();

// 如果要使用增強版本，請註釋掉上面一行，並取消註釋下面一行
// new EnhancedScrollHeader();


$(document).ready(function () {
	$(document).scroll(function () {
		var $nav = $(".l-header .sticky-wrapper");
		$nav.toggleClass("header-sticky", $(this).scrollTop() > (($nav.height())*2));
	});

	$(".js-navOpen").on('click', function () {
		console.log(123)
		$(".js-navigation").addClass("is-open");
		$('body').addClass('openNav');
	});

	$(".js-navClose").on('click', function () {
		$(".js-navigation").removeClass("is-open");
		$('body').removeClass('openNav');
	});

	new WOW().init();

	$(".js-anchor").on('click', function (event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () {
				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});

			$(".js-navbar").removeClass("is-open");
			$(".js-menuToggler").removeClass('is-active');
			$('body').removeClass('openNav');
		} // End if
	});

});