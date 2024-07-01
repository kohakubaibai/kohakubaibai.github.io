$(function () {
	//主圖輪播設定
    var kvSwiper = new Swiper("#kvSwiper", {
        loop: true,
        spaceBetween: 40,
        slidesPerView: "auto",
        centeredSlides: true,
        autoResize: false,
        navigation: {
            nextEl: "#kv-swiper-navigation_next",
            prevEl: "#kv-swiper-navigation_prev"
        },
        speed: 800,
        autoplay: {
            delay: 8000
        },
        mousewheel: true,
        pagination: {
            el: "#kv-swiper-pagination",
            clickable: true,
            dynamicBullets: false
        },
    });

    //新創分眾服務tab設定
    $('#serviceTabList button').on('click', function (event) {
        event.preventDefault();
        $(this).tab('show');
    });

    //最新動態tab設定
    $('#newsTabList button').on('click', function (event) {
        event.preventDefault();
        $(this).tab('show');
    });

    //最新動態在手機模式下以下拉選單切換tab
    $('[data-nav-select="true"]').on('change', function(){
        var selectCate = $(this).find(':selected').val();
        $('.outsourcingTab--news').find('.tab-pane').removeClass('active show');
        $('#'+ selectCate).addClass('show active');
    });

    //主題策展輪播設定
    var curationSwiper = new Swiper("#curationSwiper", {
        autoResize: false,
        mousewheel: true,
        spaceBetween: 5,
        speed: 800,
        autoplay: {
            delay: 8000
        },
        navigation: {
            nextEl: "#curation-swiper-navigation_next",
            prevEl: "#curation-swiper-navigation_prev"
        },
        pagination: {
            el: "#curation-swiper-pagination",
            clickable: true
        },
        breakpoints: {
            1199: {
                loop: true,
                slidesPerView: 1,
                pagination: {
                    dynamicBullets: false
                }
            }
            ,
            1920: {
                loop: false,
                slidesPerView: 4,
                watchOverflow: false,
                pagination: {
                    dynamicBullets: true,
                    dynamicMainBullets: 1
                }
            }
        },
    });

    //推動成果數據數字動畫
    var elementTop = $('.section--feature').offset().top;
    var elementBottom = elementTop + $('.section--feature').height();
    $(window).on('scroll', function(){
        var pageTop = $(this).scrollTop();
        var pageBottom = pageTop + $(window).height();

        if ((elementTop <= pageBottom) && (elementBottom >= pageTop)) {
            $('[data-js-count="true"]').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).data('count')
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        }
    });

    //快速連結展開
    $('[data-collapse-item="trigger"]').on('click', function(){
        var target = $(this).data('collapse-target'),
            isActive = $(this).hasClass('is-active'),
            totalLength = $('[data-collapse-item="target"]').children('li').length;
        if(isActive) {
            $(this).removeClass('is-active').children('[data-collapse-item="title"]').text('展開');
            $('[data-collapse-name="' + target + '"]').children('li').slice(8,totalLength).fadeOut(200);
        } else {
            $(this).addClass('is-active').children('[data-collapse-item="title"]').text('收合');
            $('[data-collapse-name="' + target + '"]').children('li').slice(8,totalLength).fadeIn(200);
        }
    });
});
