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

			this.initializeContent();
            this.setupResizeListener();
			this.initializePopup();

        } catch (error) {
            console.error('初始化失敗:', error.message);
        }
    }

	setupResizeListener() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

	// 初始化內容
    initializeContent() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData) return;

        // 初始化所有區塊內容
        this.updateNavigation();
        this.updateOpeningSection();
        this.updateAboutSection();
        this.updatePreviewSection();
        this.updateViSection();
        this.updateParticipationSection();
        this.updateAuthorizationSection();
        this.updateStyleSection();
        this.updateNewsSection();
        this.updateEventSection();
        this.updateContactSection();
        this.updatePopupSection();
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
                this.updateEventSection();
                this.updateNewsSection();
				this.updatePreviewSection();
                this.updateViSection();
                this.updateParticipationSection();
                this.updateAuthorizationSection();
                this.updateStyleSection();
                this.updateContactSection();
				this.updatePopupSection();
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

	// 更新 news 文字
	updateNewsSection() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.news) return;

        const newsData = currentData.news;

        // 更新標題
        const title = document.querySelector('#news .section__title .f-section-title');
        if (title && newsData.title) {
            title.innerHTML = newsData.title;
        }

        this.generateNewsItems(newsData);
    }

	// 生成 news slider
	generateNewsItems(newsData) {
        const container = document.querySelector('.cardsSwiper--news .swiper-wrapper');
        if (!container || !newsData.newsData) return;

        // 清空現有內容
        container.innerHTML = '';

        newsData.newsData.forEach((item) => {
            const newItem = document.createElement("div");
            newItem.classList.add("swiper-slide");
            newItem.innerHTML = `
                <div class="cardItem cardItem--news">
                    <div class="cardItem__image">
                        <img src="${item.imgSrc}" alt="${item.imgAlt}">
                    </div>
                    <div class="cardItem__text">
                        <div class="date">${item.date}</div>
                        <div class="title f-section-h4">${item.title}</div>
                        <div class="desc f-section-h5">${item.desc}</div>
                        <div class="more">
                            <a href="${item.url}" class="btn btn--more" target="_blank"><span class="btn__text">MORE</span></a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(newItem);
        });

		this.reinitializeSwiper('.cardsSwiper--news', { loop: true });
	}

	// 更新 event 文字
    updateEventSection() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.event) return;

        const eventData = currentData.event;

        // 更新標題
        const title = document.querySelector('#event .section__title .f-section-title');
        if (title && eventData.title) {
            title.innerHTML = eventData.title;
        }

        // 清空並重新生成event items
        this.generateEventItems(eventData);
    }

	// 生成 event slider
	generateEventItems(eventData) {
        const container = document.querySelector('.cardsSwiper--event .swiper-wrapper');
        if (!container || !eventData.eventData) return;

        // 清空現有內容
        container.innerHTML = '';

        eventData.eventData.forEach((item) => {
            const newItem = document.createElement("div");
            newItem.classList.add("swiper-slide");
            newItem.innerHTML = `
                <div class="cardItem cardItem--event">
                    <div class="cardItem__date">${item.date}</div>
                    <div class="cardItem__image">
                        <img src="${item.imgSrc}" alt="${item.imgAlt}">
                    </div>
                    <div class="cardItem__text">
                        <div class="title f-section-h4">${item.title}</div>
                        <div class="desc f-section-h5">${item.desc}</div>
                        <div class="location"><span>${item.location}</span></div>
                        <div class="more">
                            <a href="${item.url}" class="btn btn--more" target="_blank"><span class="btn__text">MORE</span></a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(newItem);
        });

        this.reinitializeSwiper('.cardsSwiper--event', { loop: false });
    }

	// 重新初始化 Swiper
    reinitializeSwiper(selector, options = {}) {
        if (!window.Swiper) return;

        const swiperElement = document.querySelector(selector);
        if (!swiperElement) return;

        // 檢查螢幕寬度，小於560px時停用swiper
        if (window.innerWidth < 560) {
            if (swiperElement.swiper) {
                swiperElement.swiper.destroy(true, true);
                console.log(`Swiper ${selector} 在小螢幕下已停用`);
            }
            return;
        }

        // 如果已經有 swiper 實例，先銷毀
        if (swiperElement.swiper) {
            swiperElement.swiper.destroy(true, true);
        }

        // 根據不同的 swiper 類型設定不同的配置
        let swiperConfig = {
            slidesPerView: 'auto',
            spaceBetween: 20,
            breakpoints: {
                560: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        };

        // 根據傳入的 options 覆蓋預設配置
        if (selector.includes('--news')) {
            // News swiper 特殊設定
            swiperConfig.loop = options.loop !== undefined ? options.loop : true;
            swiperConfig.autoplay = {
                delay: 3000,
                disableOnInteraction: false,
            };
			swiperConfig.navigation= {
                nextEl: '.section--news .swiper-button-next',
                prevEl: '.section--news .swiper-button-prev',
            };
        } else if (selector.includes('--event')) {
            // Event swiper 特殊設定
            swiperConfig.loop = options.loop !== undefined ? options.loop : false;
            // event 不需要 autoplay
			swiperConfig.navigation= {
                nextEl: '.section--event .swiper-button-next',
                prevEl: '.section--event .swiper-button-prev',
            };
        }

        // 建立新的 Swiper 實例
        try {
            new Swiper(swiperElement, swiperConfig);
            console.log(`Swiper ${selector} 初始化完成`);
        } catch (error) {
            console.error(`Swiper ${selector} 初始化失敗:`, error);
        }
    }

	// 處理螢幕尺寸變化
    handleResize() {
        // 重新檢查所有swiper
        this.reinitializeSwiper('.cardsSwiper--news', { loop: true });
        this.reinitializeSwiper('.cardsSwiper--event', { loop: false });
    }

	// 更新 preview 文字
	updatePreviewSection() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.preview) return;

        const previewData = currentData.preview;

        // 更新策展標題
        const curatingTitles = document.querySelectorAll('.previewGroup--curating .previewGroup__title .f-section-title');
        if (curatingTitles[0] && previewData.curatingTitle1) {
            curatingTitles[0].innerHTML = previewData.curatingTitle1;
        }
        if (curatingTitles[1] && previewData.curatingTitle2) {
            curatingTitles[1].innerHTML = previewData.curatingTitle2;
        }

        // 更新策展介紹
        const curatingIntro = document.querySelector('.previewGroup--curating .intro .f-section-p');
        if (curatingIntro && previewData.curatingIntro) {
            curatingIntro.innerHTML = previewData.curatingIntro;
        }

        // 更新提示文字
        const curatingHint = document.querySelector('.hint__text');
        if (curatingHint && previewData.curatingHint) {
            curatingHint.innerHTML = previewData.curatingHint;
        }

        // 更新特色活動標題
        const featuresTitle = document.querySelector('.previewGroup--features .previewGroup__title .f-section-title');
        if (featuresTitle && previewData.featuresTitle) {
            featuresTitle.innerHTML = previewData.featuresTitle;
        }

        // 更新特色活動項目文字
		if (previewData.features) {
            // 更新所有有data-json-key的元素
            document.querySelectorAll('.featuresList [data-json-key]').forEach(element => {
                const jsonKey = element.getAttribute('data-json-key');
                const featureData = previewData.features[jsonKey];

                if (!featureData) return;

                // 如果是圖片元素，更新alt屬性
                if (typeof featureData === 'object' && featureData.alt) {
					element.alt = featureData.alt;
				}
                // 如果是文字元素
                if (element.classList.contains('featureText') || element.tagName === 'A' || element.tagName === 'DIV') {
                    // 處理有text屬性的複雜對象
                    if (typeof featureData === 'object' && featureData.text) {
                        element.innerHTML = featureData.text;
                    }
                    // 處理簡單字符串（如back項目）
                    if (typeof featureData === 'string') {
                        element.innerHTML = featureData;
                    }
                }
            });
        }
    }

	// 更新 vi 文字
	updateViSection() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.vi) return;

        const viData = currentData.vi;

		// 更新主標題（mb）
        const sectionTitle = document.querySelector('.section--vi .section__title .topic');
        if (sectionTitle && viData.title) {
            sectionTitle.innerHTML = viData.title;
        }

        // 更新副標題（mb）
        const sectionSub = document.querySelector('.section--vi .section__title .sub');
        if (sectionSub && viData.subtitle) {
            sectionSub.innerHTML = viData.subtitle;
        }

        // 更新主標題（pc）
        const mainTitle = document.querySelector('.viGroup--intro .topic');
        if (mainTitle && viData.title) {
            mainTitle.innerHTML = viData.title;
        }

        // 更新副標題（pc）
        const subtitle = document.querySelector('.viGroup--intro .sub');
        if (subtitle && viData.subtitle) {
            subtitle.innerHTML = viData.subtitle;
        }

		// 更新Logo圖片的alt
        const logoImg = document.querySelector('.viGroup--intro .coverImg img');
        if (logoImg && viData.logoAlt) {
            logoImg.alt = viData.logoAlt;
        }

        // 更新介紹段落
        const introParagraphs = document.querySelectorAll('.viGroup--intro .introText__paragraph .f-section-p');
        if (viData.introTexts && Array.isArray(viData.introTexts)) {
            introParagraphs.forEach((element, index) => {
                if (viData.introTexts[index]) {
                    element.innerHTML = viData.introTexts[index];
                }
            });
        }

        // 更新圖形意象標題
        const imageryTitle = document.querySelector('.viGroup--imagery .viGroup__title .f-section-title');
        if (imageryTitle && viData.imageryTitle) {
            imageryTitle.innerHTML = viData.imageryTitle;
        }

        // 更新圖形意象項目
        const imageryItems = document.querySelectorAll('.imageryGroup__title .f-section-h4');
        if (viData.imageryItems && Array.isArray(viData.imageryItems)) {
            imageryItems.forEach((element, index) => {
                if (viData.imageryItems[index]) {
                    element.innerHTML = viData.imageryItems[index];
                }
            });
        }

		this.updateViElementImages(viData);
		this.updateViImageryImages(viData);
    }

	updateViElementImages(viData) {
        const suffix = this.currentLang === 'zh' ? 'zh' : 'en';

        // 更新PC版本圖片
        const pcImg = document.querySelector('.viGroup__image .display--pc');
        if (pcImg) {
            pcImg.src = `assets/images/vi/img_element-pc-${suffix}.svg`;
        }

        // 更新手機版本圖片
        const mbImg = document.querySelector('.viGroup__image .display--mb');
        if (mbImg) {
            mbImg.src = `assets/images/vi/img_element-mb-${suffix}.svg`;
        }
    }

	updateViImageryImages(viData) {
        const suffix = this.currentLang === 'zh' ? 'zh' : 'en';
        const imageryGroups = document.querySelectorAll('.imageryGroup');
        const imageNames = ['nature', 'culture', 'amazing'];

        imageryGroups.forEach((group, index) => {
            const imageName = imageNames[index];
            if (!imageName) return;

            // 更新PC版本圖片
            const pcImg = group.querySelector('.imageryGroup__image .display--pc');
            if (pcImg) {
                pcImg.src = `assets/images/vi/img_${imageName}-pc-${suffix}.svg`;
                if (viData.imageryItems && viData.imageryItems[index]) {
                    pcImg.alt = viData.imageryItems[index];
                }
            }

            // 更新手機版本圖片
            const mbImg = group.querySelector('.imageryGroup__image .display--mb');
            if (mbImg) {
                mbImg.src = `assets/images/vi/img_${imageName}-mb-${suffix}.svg`;
                if (viData.imageryItems && viData.imageryItems[index]) {
                    mbImg.alt = viData.imageryItems[index];
                }
            }
        });
    }

	// 更新 participation 文字
	updateParticipationSection() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.participation) return;

        const participationData = currentData.participation;

        // 更新標題
        const title = document.querySelector('#participation .section__title .f-section-title');
        if (title && participationData.title) {
            title.innerHTML = participationData.title;
        }

        // 更新介紹
        const intro = document.querySelector('#participation .intro p');
        if (intro && participationData.intro) {
            intro.innerHTML = participationData.intro;
        }

        // 更新亮點預告
        const highlightTitle = document.querySelectorAll('#participation .rule__title')[0];
        if (highlightTitle && participationData.highlightTitle) {
            highlightTitle.innerHTML = participationData.highlightTitle;
        }

        const highlightItems = document.querySelectorAll('#participation .rule')[0]?.querySelectorAll('.f-section-h5');
        if (highlightItems && participationData.highlightItems) {
            highlightItems.forEach((element, index) => {
                if (participationData.highlightItems[index]) {
                    element.innerHTML = participationData.highlightItems[index];
                }
            });
        }

        // 更新說明會資訊
        const infoTitle = document.querySelectorAll('#participation .rule__title')[1];
        if (infoTitle && participationData.infoTitle) {
            infoTitle.innerHTML = participationData.infoTitle;
        }

        const infoItems = document.querySelectorAll('#participation .rule')[1]?.querySelectorAll('.f-section-h5');
        if (infoItems && participationData.infoItems) {
            infoItems.forEach((element, index) => {
                if (participationData.infoItems[index]) {
                    element.innerHTML = participationData.infoItems[index];
                }
            });
        }

        // 更新行動按鈕
        const actionItems = document.querySelectorAll('#participation .action .btn__text');
        if (actionItems && participationData.actionItems) {
            actionItems.forEach((element, index) => {
                if (participationData.actionItems[index]) {
                    element.innerHTML = participationData.actionItems[index];
                }
            });
        }
    }

	// 更新 authorization 文字
	updateAuthorizationSection() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.authorization) return;

        const authorizationData = currentData.authorization;

        // 更新標題
        const title = document.querySelector('#authorization .section__title .f-section-title');
        if (title && authorizationData.title) {
            title.innerHTML = authorizationData.title;
        }

        // 更新介紹段落
        const introParagraphs = document.querySelectorAll('#authorization .intro p');
        if (authorizationData.introTexts && Array.isArray(authorizationData.introTexts)) {
            introParagraphs.forEach((element, index) => {
                if (authorizationData.introTexts[index]) {
                    element.innerHTML = authorizationData.introTexts[index];
                }
            });
        }

        // 更新申請資訊標題
        const applicationTitle = document.querySelector('#authorization .rule__title');
        if (applicationTitle && authorizationData.applicationTitle) {
            applicationTitle.innerHTML = authorizationData.applicationTitle;
        }

        // 更新申請資訊項目
        const applicationItems = document.querySelectorAll('#authorization .rule__list .f-section-h5');
        if (applicationItems && authorizationData.applicationItems) {
            applicationItems.forEach((element, index) => {
                if (authorizationData.applicationItems[index]) {
                    element.innerHTML = authorizationData.applicationItems[index];
                }
            });
        }

        // 更新連結按鈕文字
        const actionItems = document.querySelectorAll('#authorization .action .btn__text');
        if (actionItems && authorizationData.actionItems) {
            actionItems.forEach((element, index) => {
                if (authorizationData.actionItems[index]) {
                    element.innerHTML = authorizationData.actionItems[index];
                }
            });
        }
    }

	// 更新 style 文字
    updateStyleSection() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.style) return;

        const styleData = currentData.style;

        // 更新標題
        const title = document.querySelector('#style .section__title .f-section-title');
        if (title && styleData.title) {
            title.innerHTML = styleData.title;
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

	updatePopupSection() {
        const currentData = this.languageData[this.currentLang];
        if (!currentData || !currentData.popup) return;

        const popupData = currentData.popup;

        // 更新所有popup內容
        Object.keys(popupData).forEach(popupId => {
            const popup = popupData[popupId];
            const popupElement = document.querySelector(`[data-popup-id="${popupId}"]`);

            if (!popupElement || !popup) return;

            // 更新標題
            const titleElement = popupElement.querySelector('.text__title');
            if (titleElement && popup.title) {
                titleElement.innerHTML = popup.title;
            }

            // 更新描述
            const descElement = popupElement.querySelector('.text__desc');
            if (descElement && popup.desc) {
                descElement.innerHTML = popup.desc;
            }

            // 更新標籤標題
            const tagsTitle = popupElement.querySelector('.text__tags dt');
            if (tagsTitle && popup.tagsTitle) {
                tagsTitle.innerHTML = popup.tagsTitle;
            }

            // 更新標籤內容
            const tagsContent = popupElement.querySelector('.text__tags dd');
            if (tagsContent && popup.tags) {
                tagsContent.innerHTML = popup.tags;
            }

            // 更新預告標題
            const previewTitle = popupElement.querySelector('.previewTitle');
            if (previewTitle && popup.previewTitle) {
                previewTitle.innerHTML = popup.previewTitle;
            }

            // 更新預告內容
            const previewContentElement = popupElement.querySelector('.previewContent');
            if (previewContentElement && popup.previewContent && Array.isArray(popup.previewContent)) {
                previewContentElement.innerHTML = '';
                popup.previewContent.forEach(content => {
                    const p = document.createElement('p');
                    p.innerHTML = content;
                    previewContentElement.appendChild(p);
                });
            }
        });
    }

	// 初始化popup功能
    initializePopup() {
        const sectionNames = {
            '1': '空氣',
            '2': '水',
            '3': '自然力量',
            '4': '聲音',
            '5': '香氣',
            '6': '生活',
            '7': '慢經濟',
            '8': '台東品牌',
            'center': '種子',
            '9': '永續台東'
        };

        // popup映射對應關係
        const popupMapping = {
            'center': 0,
            '1': 1,
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
            '6': 6,
            '7': 7,
            '8': 8,
            '9': 9
        };

        // 視覺識別系統圖片點擊事件
        document.querySelectorAll('.wheel-section, .center-circle, .bottom-circle').forEach(element => {
            element.addEventListener('click', (e) => {
                const sectionNum = element.getAttribute('data-section');
                const sectionName = sectionNames[sectionNum] || element.getAttribute('data-name');

                // 顯示對應的popup
                const popupId = popupMapping[sectionNum];
                if (popupId !== undefined) {
                    this.showPopup(popupId);
                }

                console.log(`點擊了區域 ${sectionNum}: ${sectionName}, 顯示popup ${popupId}`);
            });

            // 手機觸控動畫
            element.addEventListener('touchstart', function() {
                this.style.fill = 'rgba(255, 255, 255, 0.05)';
            });

            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.fill = 'transparent';
                }, 100);
            });
        });

        // popup關閉按鈕事件
        const closeButton = document.querySelector('.btn--closePopup');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.hidePopup();
            });
        }

        // 點擊overlay關閉popup
        const overlay = document.querySelector('.popup__overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.hidePopup();
            });
        }

        // ESC鍵關閉popup
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hidePopup();
            }
        });
    }

    // 顯示popup
    showPopup(popupId) {
		const body = document.body;
        const popup = document.getElementById('popup');
        const allPopupContents = document.querySelectorAll('.popupBox__content');
        const targetPopup = document.querySelector(`[data-popup-id="${popupId}"]`);

        if (!popup || !targetPopup) return;

        // 隱藏所有popup內容
        allPopupContents.forEach(content => {
            content.style.display = 'none';
        });

        // 顯示目標popup內容
        targetPopup.style.display = 'block';

        // 顯示popup容器
        popup.classList.add('active');
        body.classList.add('openPopup');
    }

    // 隱藏popup
    hidePopup() {
		const body = document.body;
        const popup = document.getElementById('popup');
        if (!popup) return;

        popup.classList.remove('active');
        body.classList.remove('openPopup');
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

    var headerH = $('.l-header').outerHeight(true);
	$(".js-anchor").on('click', function (e) {

		if (this.hash !== "") {
			e.preventDefault();

			var hash = this.hash;

			$('html, body').animate({
				scrollTop: ($(hash).offset().top) - (headerH + 50)
			}, 800);

			$(".js-navbar").removeClass("is-open");
			$(".js-menuToggler").removeClass('is-active');
			$('body').removeClass('openNav');
		} // End if
	});

});