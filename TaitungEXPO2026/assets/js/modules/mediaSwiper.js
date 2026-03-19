import Swiper from 'swiper';
import { Autoplay, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

class CarouselSlider {
    constructor(selector, options = {}) {
        this.selector = selector;
        this.swiper = null;
        this.autoplayTimeout = null;
        this.youtubePlayers = {};
        this.youtubePlayersReady = {};
        this.isYouTubeAPIReady = false;
        this.options = options;
        this.currentPlayingVideoId = null;
        
        // Debug 模式開關（可在初始化時傳入）
        this.debug = options.debug || false;
        
        this.init();
    }

    // Debug 日誌方法
    log(...args) {
        if (this.debug) console.log(...args);
    }

    warn(...args) {
        if (this.debug) console.warn(...args);
    }

    error(...args) {
        // error 建議保留，即使在 production 也應該看到
        console.error(...args);
    }

    init() {
        const hasYouTube = document.querySelector(`${this.selector} [data-youtube="true"] iframe`);
        
        if (hasYouTube) {
            this.loadYouTubeAPI();
        } else {
            this.initSwiper();
        }
    }

    loadYouTubeAPI() {
        this.log('🔍 檢查 YouTube API 狀態...');
        
        if (window.YT && window.YT.Player) {
            this.log('✅ YouTube API 已存在，直接初始化');
            this.isYouTubeAPIReady = true;
            setTimeout(() => {
                this.initializeYouTubePlayers();
            }, 100);
            return;
        }

        this.log('📥 載入 YouTube IFrame API...');
        
        if (!document.getElementById('youtube-iframe-api')) {
            const tag = document.createElement('script');
            tag.id = 'youtube-iframe-api';
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        const self = this;
        const originalCallback = window.onYouTubeIframeAPIReady;
        
        window.onYouTubeIframeAPIReady = function() {
            self.log('🎉 YouTube API 載入完成 (callback)');
            self.isYouTubeAPIReady = true;
            self.initializeYouTubePlayers();
            
            if (originalCallback && typeof originalCallback === 'function') {
                originalCallback();
            }
        };
        
        let checkCount = 0;
        const checkInterval = setInterval(() => {
            checkCount++;
            
            if (window.YT && window.YT.Player && !this.isYouTubeAPIReady) {
                self.log('✅ YouTube API 已就緒 (輪詢偵測)');
                clearInterval(checkInterval);
                this.isYouTubeAPIReady = true;
                this.initializeYouTubePlayers();
            } else if (checkCount > 40) {
                self.error('❌ YouTube API 載入超時');
                clearInterval(checkInterval);
                this.initSwiper();
            }
        }, 250);
    }

    initializeYouTubePlayers() {
        const youtubeSlides = document.querySelectorAll(`${this.selector} [data-youtube="true"]`);
        
        if (youtubeSlides.length === 0) {
            this.log('沒有 YouTube slides，直接初始化 Swiper');
            this.initSwiper();
            return;
        }
        
        this.youtubePlayers = {};
        this.youtubePlayersReady = {};
        
        let totalPlayers = 0;
        let readyPlayers = 0;
        let hasInitializedSwiper = false;
        
        const checkAllReady = (playerId) => {
            if (hasInitializedSwiper) return;
            
            readyPlayers++;
            this.log(`✅ YouTube Players ready: ${readyPlayers}/${totalPlayers} (${playerId})`);
            
            if (readyPlayers >= totalPlayers) {
                hasInitializedSwiper = true;
                this.log('🎉 所有 YouTube Players 已準備完成');
                
                setTimeout(() => {
                    this.log('🚀 開始初始化 Swiper');
                    this.initSwiper();
                }, 300);
            }
        };
        
        youtubeSlides.forEach((slide, index) => {
            const iframe = slide.querySelector('iframe');
            if (!iframe) {
                this.warn('⚠️ YouTube slide 沒有 iframe');
                return;
            }
            
            const playerId = `youtube-player-${Date.now()}-${index}`;
            
            const src = iframe.src;
            const videoIdMatch = src.match(/embed\/([^?]+)/);
            const videoId = videoIdMatch ? videoIdMatch[1] : null;
            
            if (!videoId) {
                this.warn('⚠️ 無法提取 video ID:', src);
                return;
            }
            
            totalPlayers++;
            this.log(`🎬 初始化 Player [${totalPlayers}]: ${playerId} | Video: ${videoId}`);
            
            const playerContainer = document.createElement('div');
            playerContainer.id = playerId;
            playerContainer.style.width = '100%';
            playerContainer.style.height = '100%';
            
            iframe.parentNode.replaceChild(playerContainer, iframe);
            
            try {
                setTimeout(() => {
                    this.youtubePlayers[playerId] = new YT.Player(playerId, {
                        height: '100%',
                        width: '100%',
                        videoId: videoId,
                        playerVars: {
                            'autoplay': 0,
                            'controls': 1,
                            'rel': 0,
                            'enablejsapi': 1,
                            'mute': 1,
                            'playsinline': 1,
                            'modestbranding': 1
                        },
                        events: {
                            'onReady': (event) => {
                                this.log(`  ✓ ${playerId} Ready`);
                                this.youtubePlayersReady[playerId] = true;
                                checkAllReady(playerId);
                            },
                            'onStateChange': (event) => {
                                this.onPlayerStateChange(event, videoId, playerId);
                            },
                            'onError': (event) => {
                                const errorCode = event.data;
                                const errorMessages = {
                                    2: '無效的參數',
                                    5: 'HTML5 播放器錯誤',
                                    100: '影片不存在或已被刪除',
                                    101: '影片擁有者不允許嵌入播放',
                                    150: '影片擁有者不允許嵌入播放'
                                };
                                
                                this.error(`❌ ${playerId} 錯誤 ${errorCode}: ${errorMessages[errorCode] || '未知錯誤'}`);
                                
                                // 如果是嵌入錯誤（101, 150），直接跳過這個影片
                                if (errorCode === 101 || errorCode === 150) {
                                    this.warn(`  ⚠️ 跳過此影片，繼續輪播`);
                                    
                                    // 如果這個影片正在播放，立即切換到下一個
                                    if (this.currentPlayingVideoId === videoId) {
                                        this.currentPlayingVideoId = null;
                                        if (this.autoplayTimeout) {
                                            clearTimeout(this.autoplayTimeout);
                                            this.autoplayTimeout = null;
                                        }
                                        setTimeout(() => {
                                            this.swiper.slideNext();
                                        }, 1000);
                                    }
                                }
                                
                                // 標記為 ready，避免卡住初始化
                                if (!this.youtubePlayersReady[playerId]) {
                                    this.youtubePlayersReady[playerId] = true;
                                    checkAllReady(playerId);
                                }
                            }
                        }
                    });
                }, 50 * index);
            } catch (error) {
                this.error(`❌ 初始化 ${playerId} 失敗:`, error);
                checkAllReady(playerId);
            }
        });
        
        if (totalPlayers === 0) {
            this.log('沒有有效的 YouTube Players，直接初始化 Swiper');
            this.initSwiper();
        } else {
            this.log(`📊 總共 ${totalPlayers} 個 YouTube Players 待初始化`);
            
            setTimeout(() => {
                if (!hasInitializedSwiper) {
                    this.warn(`⏰ 超時！${readyPlayers}/${totalPlayers} ready，強制初始化`);
                    hasInitializedSwiper = true;
                    this.initSwiper();
                }
            }, 15000);
        }
    }

    onPlayerReady(event, videoId) {
        try {
            const playerId = event.target.getIframe().id;
            this.youtubePlayersReady[playerId] = true;
            this.log(`✅ Player Ready: ${playerId} (Video: ${videoId})`);
        } catch (error) {
            this.error('❌ onPlayerReady 錯誤:', error);
        }
    }

    onPlayerStateChange(event, videoId, playerId) {
        try {
            const stateNames = {
                '-1': 'UNSTARTED',
                '0': 'ENDED',
                '1': 'PLAYING',
                '2': 'PAUSED',
                '3': 'BUFFERING',
                '5': 'CUED'
            };
            
            const state = event.data;
            
            this.log(`🎬 [${playerId}] ${stateNames[state]} (Video: ${videoId})`);
            
            if (this.currentPlayingVideoId === videoId) {
                this.log(`  ✓ 當前播放影片`);
                
                if (state === YT.PlayerState.ENDED || state === 0) {
                    this.log('🎉 影片播放完畢');
                    
                    this.currentPlayingVideoId = null;
                    if (this.autoplayTimeout) {
                        clearTimeout(this.autoplayTimeout);
                        this.autoplayTimeout = null;
                    }
                    
                    setTimeout(() => {
                        this.log('➡️ 切換到下一個 slide');
                        this.swiper.slideNext();
                    }, 500);
                }
            } else {
                this.log(`  ⊗ 非當前播放 (當前: ${this.currentPlayingVideoId})`);
            }
        } catch (error) {
            // 忽略來自第三方的錯誤
        }
    }

    initSwiper() {
        const defaultOptions = {
            modules: [Navigation, Autoplay],
            autoplay: false,
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                slideChange: () => {
                    this.handleSlideChange();
                },
                afterInit: () => {
                    setTimeout(() => {
                        this.log('🚀 Swiper 初始化完成，開始第一個 slide');
                        this.handleSlideChange();
                    }, 100);
                    
                    if (this.options.showOnInit) {
                        $(this.selector).css({ visibility: "visible" });
                    }
                }
            }
        };

        const swiperOptions = { ...defaultOptions, ...this.options };
        this.swiper = new Swiper(this.selector, swiperOptions);
        this.bindManualControls();
    }

    handleSlideChange() {
        this.log('🔄 handleSlideChange 被調用');
        
        if (!this.swiper || !this.swiper.slides || this.swiper.slides.length === 0) {
            this.warn('⚠️ Swiper 尚未初始化或沒有 slides');
            return;
        }

        this.log('🧹 清除之前的狀態');
        if (this.autoplayTimeout) {
            clearTimeout(this.autoplayTimeout);
            this.autoplayTimeout = null;
        }
        const previousVideoId = this.currentPlayingVideoId;
        this.currentPlayingVideoId = null;
        if (previousVideoId && this.debug) {
            this.log(`  清除 currentPlayingVideoId: ${previousVideoId} → null`);
        }

        this.stopAllVideos();
        this.pauseAllYouTubeVideos();

        const activeSlide = this.swiper.slides[this.swiper.activeIndex];
        if (!activeSlide) {
            this.error('❌ 無法取得當前 slide');
            return;
        }

        this.log(`\n📍 Slide ${this.swiper.activeIndex} (real: ${this.swiper.realIndex})`);

        const youtubeIframe = activeSlide.querySelector('iframe');
        const video = activeSlide.querySelector('video');
        const hasYouTubeAttr = activeSlide.hasAttribute('data-youtube');

        if (hasYouTubeAttr && youtubeIframe) {
            this.log('▶️ 類型: YouTube 影片');
            this.handleYouTubeSlide(youtubeIframe);
        } else if (video) {
            this.log('▶️ 類型: 一般影片');
            this.handleVideoSlide(video);
        } else {
            this.log('🖼️ 類型: 圖片 (5秒後切換)');
            if (hasYouTubeAttr && !youtubeIframe) {
                this.warn('⚠️ 有 data-youtube 但沒有 iframe!');
            }
            this.autoplayTimeout = setTimeout(() => {
                this.log('⏰ 圖片時間到，切換 slide');
                this.swiper.slideNext();
            }, 5000);
        }
    }

    handleYouTubeSlide(iframe) {
        const playerId = iframe.id;
        const src = iframe.src;
        const videoIdMatch = src.match(/embed\/([^?]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        
        if (!videoId) {
            this.error('❌ 無法取得 video ID');
            this.autoplayTimeout = setTimeout(() => this.swiper.slideNext(), 5000);
            return;
        }

        this.log(`🎯 準備播放: ${playerId} (Video: ${videoId})`);

        let player = this.youtubePlayers[playerId];
        if (!player) {
            const originalId = playerId.replace(/-duplicate.*$/, '');
            player = this.youtubePlayers[originalId];
            this.log(`使用原始 ID: ${originalId}`);
        }

        const actualPlayerId = player ? player.getIframe().id : playerId;
        if (!this.youtubePlayersReady[actualPlayerId]) {
            this.log('⏳ Player 尚未 ready，等待中...');
            
            let attempts = 0;
            const waitForReady = setInterval(() => {
                attempts++;
                if (this.youtubePlayersReady[actualPlayerId]) {
                    this.log('✅ Player 已 ready');
                    clearInterval(waitForReady);
                    this.playYouTubeVideo(player, videoId);
                } else if (attempts > 20) {
                    this.error('❌ Player 等待超時');
                    clearInterval(waitForReady);
                    this.autoplayTimeout = setTimeout(() => this.swiper.slideNext(), 3000);
                }
            }, 500);
            return;
        }

        this.playYouTubeVideo(player, videoId);
    }

    playYouTubeVideo(player, videoId) {
        if (!player || typeof player.playVideo !== 'function') {
            this.error('❌ Player 無效');
            this.autoplayTimeout = setTimeout(() => this.swiper.slideNext(), 5000);
            return;
        }

        try {
            this.currentPlayingVideoId = videoId;
            this.log(`✅ 設定 currentPlayingVideoId = ${videoId}`);

            if (typeof player.mute === 'function') player.mute();
            if (typeof player.seekTo === 'function') player.seekTo(0);

            setTimeout(() => {
                player.playVideo();
                this.log('▶️ 開始播放');

                setTimeout(() => {
                    try {
                        const state = player.getPlayerState();
                        const stateNames = {1: 'PLAYING', 3: 'BUFFERING', 2: 'PAUSED', 0: 'ENDED', '-1': 'UNSTARTED'};
                        this.log(`狀態檢查: ${stateNames[state] || state}`);
                        
                        if (state !== 1 && state !== 3) {
                            this.warn('⚠️ 未播放，重試');
                            player.playVideo();
                        }
                    } catch (e) {
                        this.error('狀態檢查失敗:', e);
                    }
                }, 1000);
            }, 300);

            this.autoplayTimeout = setTimeout(() => {
                this.log('⏰ 安全網觸發');
                if (this.currentPlayingVideoId === videoId) {
                    this.currentPlayingVideoId = null;
                    if (typeof player.stopVideo === 'function') player.stopVideo();
                    this.swiper.slideNext();
                }
            }, 1800000);

        } catch (error) {
            this.error('❌ 播放錯誤:', error);
            this.currentPlayingVideoId = null;
            this.autoplayTimeout = setTimeout(() => this.swiper.slideNext(), 10000);
        }
    }

    handleVideoSlide(video) {
        this.log(`📹 一般影片 readyState: ${video.readyState}`);
        video.currentTime = 0;
        
        video.onended = null;
        
        let hasSwitchLogic = false;
        
        video.onended = () => {
            this.log('🎉 影片播放完成 (ended 事件)');
            if (!hasSwitchLogic) {
                hasSwitchLogic = true;
                this.swiper.slideNext();
            }
        };
        
        const setupSafetyTimeout = () => {
            const duration = video.duration;
            if (duration && !isNaN(duration) && isFinite(duration)) {
                const safetyDelay = (duration + 10) * 1000;
                this.log(`⏱️ 設定安全網: ${duration + 10} 秒`);
                
                this.autoplayTimeout = setTimeout(() => {
                    if (!hasSwitchLogic) {
                        this.warn('⚠️ 安全網觸發（影片可能卡住）');
                        hasSwitchLogic = true;
                        this.swiper.slideNext();
                    }
                }, safetyDelay);
            }
        };
        
        if (video.readyState >= 1) {
            setupSafetyTimeout();
        } else {
            video.addEventListener('loadedmetadata', setupSafetyTimeout, { once: true });
        }
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.log('✅ 影片開始播放');
            }).catch(error => {
                if (error.name === 'AbortError') {
                    // 靜默處理，不顯示任何訊息
                    return;
                }
                
                this.error('❌ 播放失敗:', error.name, error.message);
                
                if (!hasSwitchLogic) {
                    this.log('⏰ 播放失敗，5秒後切換');
                    hasSwitchLogic = true;
                    
                    this.autoplayTimeout = setTimeout(() => {
                        this.swiper.slideNext();
                    }, 5000);
                }
            });
        }
    }

    stopAllVideos() {
        const allVideos = document.querySelectorAll(`${this.selector} video`);
        allVideos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }

    pauseAllYouTubeVideos() {
        Object.values(this.youtubePlayers).forEach(player => {
            try {
                if (player && player.pauseVideo) player.pauseVideo();
            } catch (error) {
                // 忽略錯誤
            }
        });
    }

    bindManualControls() {
        const nextBtn = document.querySelector(`${this.selector} .swiper-button-next`);
        const prevBtn = document.querySelector(`${this.selector} .swiper-button-prev`);

        if (nextBtn) nextBtn.addEventListener('click', () => this.handleSlideChange());
        if (prevBtn) prevBtn.addEventListener('click', () => this.handleSlideChange());
    }

    destroy() {
        if (this.autoplayTimeout) clearTimeout(this.autoplayTimeout);
        this.stopAllVideos();
        this.pauseAllYouTubeVideos();
        if (this.swiper) this.swiper.destroy(true, true);
    }
}

export default CarouselSlider;