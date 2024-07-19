$(function(){
    // 左側篩選欄固定position start
    // 僅在PC上有此操作，如要移除請將下列 4~84 行程式碼刪除或註解
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    var didScrollID = setTimer();
    var didScroll = false,
        lastScrollTop = 0,
        winHeight = $(window).height(),
        headerHeight = $('.outsourcing_header').outerHeight(true),
        sideOffsetTop = $('.filterForm--condition').offset().top,
        afterLoadOffsetTop = $(window).scrollTop();

    var a = false, b = false;

    function setTimer(){
        i = setInterval(function(){
            if (isMobile === false) {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }
            
        }, 100);
        return i;
    }

    if (isMobile === false) {
        if(afterLoadOffsetTop > headerHeight) {
            $('.filterForm--condition').css({
                'height': winHeight - headerHeight
            })
        } else {
            $('.filterForm--condition').css({
                'height': winHeight - (sideOffsetTop - afterLoadOffsetTop)
            })
        }

        $(window).on('scroll', function (event) {
            if( a == false && b == false){
                didScroll = true;
            }
        });
    } else {
        var $phaseBar = $('[data-animation-position-item="phasebar"]'),
            phaseBarHeight = $phaseBar.outerHeight(true),
            $breadcrumb = $('[data-animation-position-item="breadcrumb"]'),
            $breadcrumbHeight = $breadcrumb.outerHeight(true),
            $mainContent = $('[data-animation-position-item="content"]');
        $phaseBar.css({
            'top': headerHeight
        });
        $breadcrumb.css({
            'top': phaseBarHeight + 20
        });

        $mainContent.css({
            'padding-top': $breadcrumbHeight + 40
        })
    }

    function hasScrolled() {
        clearInterval(didScrollID);
    
        var st = $(this).scrollTop();
        var targetAfterScrollOffset = $('.filterForm--condition').offset().top;
    
        $('.filterForm--condition').css({
            'height': winHeight - sideOffsetTop - afterLoadOffsetTop + st 
        })
    
        if (st > headerHeight) {
            $('.filterForm--condition').css({
                'height': winHeight - headerHeight
            })
        } else if (st <= headerHeight) {
            $('.filterForm--condition').css({
                'height': winHeight - targetAfterScrollOffset + st 
            })
        }
        lastScrollTop = st;
        didScrollID = setTimer();
    }
    // 左側篩選欄固定position end

    $('[data-filter-button="true"]').on('click', function(){
        var target = $(this).data('filter-target');
        $('body').addClass('open'+target);
    });

    $('[data-filter-button="close"]').on('click', function () {
        $('body').removeClass('opencondition opensearch');
    });

    // 搜尋框輸入後出現清除鍵
    $('[data-form-element="filter-search"]').on('keyup', function(){
        var formItem = $(this).closest('[data-form-name="search_filter"]');
        var inputValue = $(this).val();
        if (inputValue != '') {
            formItem.find('[data-form-element="btn-clear-filter"]').show();
        } else {
            formItem.find('[data-form-element="btn-clear-filter"]').hide();
        }
    });

    // 清除搜尋框
    $('[data-form-element="btn-clear-filter"]').on('click', function(e){
        e.preventDefault();
        var formItem = $(this).closest('[data-form-name="search_filter"]');
        formItem.find('[data-form-element="filter-search"]').val('');
        formItem.find('[data-form-element="btn-clear-filter"]').hide();
    });
});