$(function () {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // 文字大小選單開關
	$('.dropdown-toggle').dropdown();

    // 頁面滾動後header加入陰影
    var header_h = $('.outsourcing_header').outerHeight(true);
    $(window).on('scroll', function(){
        var scrollTop = $(this).scrollTop();
        if (scrollTop > header_h) {
            $('.outsourcing_header').addClass('is-scroll');
        } else {
            $('.outsourcing_header').removeClass('is-scroll');
        }
    });

    // 文字大小調整
    $('[data-fontsize-item="true"]').on('click',function(){
        var scaleValue = $(this).data('font-scale');
        $('body').css({
            'font-size' : (1 * scaleValue)+'rem'
        });
    });

    // 開關開啟主選單列表
    $('#toggle-menu').on('click', function () {
        $('body').addClass('openNav');
        $('#header_nav').addClass('is-active');
        $('.mmBtn').removeClass('is-active');
        $(".mmContent").hide();
    });
    $('#close-menu').on('click', function () {
        $('body').removeClass('openNav');
        $('#header_nav').removeClass('is-active');
        $('.mmBtn').removeClass('is-active');
        $(".mmContent").hide();
    });

    $('.mmBtn').on('click mouseover', function (e) {
        if (isMobile === true && e.type === 'mouseover') return;  
        $(".mmContent").hide();
        $(".mmBtn").removeClass("is-active");
        $(this).toggleClass("is-active");
        var id = $(this).attr("data-id");
        $("#mmContent" + id).toggle();
        $('[data-service-id="0"]').addClass('default');
    })
    $('.megamenu__item').on('mouseleave', function () {
        if (isMobile === true) return;
        $(".mmContent").hide();
        $(".mmBtn").removeClass("is-active");
        $('[data-service-id="0"]').addClass('default');
    });

    // 主選單列表點空白處收起來
    $('body').on('click', function (event) {
        if (!$(event.target).is('.mmBtn')) {
            $(".mmBtn").removeClass("is-active");
            $(".mmContent").hide();
        }
    });

    // 分眾服務hover顯示&隱藏內容
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (!isMobile){
        $('[data-side-link="true"]').on('focus mouseover', function (e) {
            e.preventDefault();
            $(".sideMenu").hide();
            $('[data-side-link="true"]').removeClass("is-active default");
            $(this).toggleClass("is-active");
            var id = $(this).attr("data-service-id");
            $("#sideMenu" + id).show();
        });
        
        $('.megamenu__item').mouseleave(function () {
            $(".sideMenu").hide();
            $('[data-side-link="true"]').removeClass("is-active");
        });
    }	

    // 搜尋框輸入後按鈕顯示
    $('[data-form-element="input-search"]').on('keyup', function(){
        var formItem = $(this).closest('[data-form-name="search"]');
        var inputValue = $(this).val();
        if (inputValue != '') {
            formItem.find('[data-form-element="btn-clear"]').show();
            formItem.find('[data-form-element="btn-submit"]').addClass('is-available');
        } else {
            formItem.find('[data-form-element="btn-clear"]').hide();
            formItem.find('[data-form-element="btn-submit"]').removeClass('is-available');
        }
    });

    // 清除搜尋框
    $('[data-form-element="btn-clear"]').on('click', function(e){
        e.preventDefault();
        var formItem = $(this).closest('[data-form-name="search"]');
        formItem.find('[data-form-element="input-search"]').val('');
        formItem.find('[data-form-element="btn-clear"]').hide();
        formItem.find('[data-form-element="btn-submit"]').removeClass('is-available');
    });

    // 開啟關閉popup
    $('[data-js-id="openPopup"]').on('click', function(e){
        e.preventDefault();
        $('body').addClass('openPopup');
        var target = $(this).data('popup-target');
        $('[data-popup-name=' + target + ']').fadeIn();
    });

    $('[data-popup-close="true"]').on('click', function(){
        $('body').removeClass('openPopup');
        $(this).closest('[data-popup-id="group"]').fadeOut();
        $(this).closest('[data-popup-id="group"]').find('input[type="text"],input[type="tel"],input[type="email"], textarea').val('');
        $(this).closest('[data-popup-id="group"]').find('.formRow').removeClass('is-error');
    });

    // 送出問題回饋表
    $('[data-submit-id="report"]').on('click', function(e){
        e.preventDefault();

        //驗證表單必填欄位是否為空
        var form = $(this).closest('form');

        form.find('input[type="text"],input[type="tel"],input[type="email"], textarea').each(function(){
            if($(this).val() == '') {
                $(this).closest('.formRow').addClass('is-error');
            } else {
                //送出表單
            }
        });
    });
});
