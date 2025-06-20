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
            document.getElementById('langToggleBtn').addEventListener('click', () => this.toggleLanguage());
            await this.loadLanguage(this.currentLang);
            document.body.classList.add('lang--zh');
            console.log('語言切換系統初始化完成');
        } catch (error) {
            console.error('初始化失敗:', error.message);
        }
    }

	async loadLanguage(lang) {
		// 如果已經載入過該語言，直接返回
		if (this.languageData[lang]) {
			return this.languageData[lang];
		}

		try {
			const response = await fetch(`./assets/js/language/${lang}.json`);

			const data = await response.json();

			this.languageData[lang] = data;
			return data;
		} catch (error) {
			throw new Error(`載入 ${lang}.json 失敗: ${error.message}`);
		}
	}

	// 切換語言
	async toggleLanguage() {
        const nextLang = this.currentLang === 'zh' ? 'en' : 'zh';
        await this.switchLanguage(nextLang);
    }

	async switchLanguage(lang) {
        if (this.currentLang === lang || this.isLoading) return;

        this.isLoading = true;
        this.setButtonDisabled(true);

        try {
            await this.loadLanguage(lang);

            setTimeout(() => {
                this.currentLang = lang;
                this.updateButtonText();
                this.updateNavigation();
                this.updateOpeningSection();
                this.updateAboutSection();
                this.updateContactSection();
                this.updateHtmlLang();

                this.setButtonDisabled(false);
                this.isLoading = false;
            }, 150);
        } catch (error) {
            console.error(error.message);
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
    }

	// 更新 nav 文字
	updateNavigation() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.nav) return;

        const navData = currentData.nav;

        document.querySelectorAll('.navbarText').forEach(anchor => {
            const jsonKey = anchor.getAttribute('data-json-key');
            if (navData[jsonKey]) {
                const spans = anchor.querySelectorAll('span');
                if (spans.length > 0) {
                    spans.forEach(span => {
                        span.textContent = navData[jsonKey];
                    });
                } else {
                    anchor.textContent = navData[jsonKey];
                }
            }
        });
    }

	// 更新 intro 文字
	updateOpeningSection() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.opening) return;

        const introTexts = currentData.opening.introTexts;
        if (!introTexts) return;

        const introElements = document.querySelectorAll('.intro__text');
        introElements.forEach((element, index) => {
            if (introTexts[index]) {
                element.innerHTML = introTexts[index];
            }
        });
    }

	// 更新 about 文字
	updateAboutSection() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.about) return;

        // 更新 aboutGroup1
        this.updateAboutGroup('aboutGroup1', currentData.about.aboutGroup1);
        // 更新 aboutGroup2
        this.updateAboutGroup('aboutGroup2', currentData.about.aboutGroup2);
    }

    updateAboutGroup(groupId, groupData) {
        if (!groupData) return;

        const groupElement = document.getElementById(groupId);
        if (!groupElement) return;

        // 更新標題
        const titleElement = groupElement.querySelector('.sectionGroup__title');
        if (titleElement && groupData.title) {
            titleElement.innerHTML = groupData.title;
        }

        // 更新文字段落 - 使用陣列結構
        const textElements = groupElement.querySelectorAll('.f-section-p');
        if (groupData.texts && Array.isArray(groupData.texts)) {
            textElements.forEach((element, index) => {
                if (groupData.texts[index]) {
                    element.innerHTML = groupData.texts[index];
                }
            });
        }
    }

	// 更新 contact 文字
	updateContactSection() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.contact) return;

        const contactData = currentData.contact;

        // 更新部門名稱
        const departmentElement = document.querySelector('.department');
        if (departmentElement && contactData.department) {
            departmentElement.innerHTML = contactData.department;
        }

        // 更新聯絡資訊
        if (contactData.info && Array.isArray(contactData.info)) {
            const infoList = document.querySelector('.info');
            if (infoList) {
                // 清空現有內容
                infoList.innerHTML = '';

                // 添加新的聯絡資訊
                contactData.info.forEach(infoText => {
                    const li = document.createElement('li');
                    li.innerHTML = infoText;
                    infoList.appendChild(li);
                });
            }
        }

        // 更新單位資訊
        if (contactData.sectors && Array.isArray(contactData.sectors)) {
            const sectorsList = document.querySelector('.sectors');
            if (sectorsList) {
                // 清空現有內容
                sectorsList.innerHTML = '';

                // 添加新的單位資訊
                contactData.sectors.forEach(sectorText => {
                    const li = document.createElement('li');
                    li.innerHTML = sectorText;
                    sectorsList.appendChild(li);
                });
            }
        }
    }

	// 更新 HTML lang 屬性
	updateHtmlLang() {
        document.documentElement.lang = this.currentLang === 'zh' ? 'zh-TW' : 'en';

        const body = document.body;
        body.classList.remove('lang--zh', 'lang--en');
        body.classList.add(`lang--${this.currentLang}`);
    }

	// 取得目前語言
	getCurrentLanguage() {
        return this.currentLang;
    }

	// 取得指定key的翻譯
	getText(section, key) {
        const currentData = this.languageData[this.currentLang];
        return currentData?.[section]?.[key] || '';
    }

	// 預先載入語言
	async preloadLanguage(lang) {
        try {
            await this.loadLanguage(lang);
            console.log(`語言 ${lang} 預載入完成`);
        } catch (error) {
            console.warn(`預載入語言 ${lang} 失敗:`, error);
        }
    }
}

// 初始化語言切換
const langSwitcher = new LanguageSwitcher();

// 預載入另一種語言
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