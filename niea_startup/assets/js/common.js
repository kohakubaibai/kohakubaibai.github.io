$(function () {
    //文字大小選單開關
	$('.dropdown-toggle').dropdown();

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

    $('.mmBtn').click(function (e) {
        console.log(e)
        $(".mmContent").hide();
        $(".mmBtn").removeClass("is-active");
        $(this).toggleClass("is-active");
        var id = $(this).attr("data-id");
        $("#mmContent" + id).toggle();
        $('[data-service-id="0"]').addClass('default');
        $('#console').text('click'+ id)
    });

    $('.mmBtn').mouseover(function (e) {
        console.log(e)
        $(".mmContent").hide();
        $(".mmBtn").removeClass("is-active");
        $(this).toggleClass("is-active");
        var id = $(this).attr("data-id");
        $("#mmContent" + id).toggle();
        $('[data-service-id="0"]').addClass('default');
        $('#console').text('mouseover'+ id)
    });
    
    $('.megamenu__item').mouseleave(function () {
        console.log('mouseleave')
        $(".mmContent").hide();
        $(".mmBtn").removeClass("is-active");
        $('[data-service-id="0"]').addClass('default');
    });

    //主選單列表點空白處收起來
    $('body').on('click', function (event) {
        if (!$(event.target).is('.mmBtn')) {
            $(".mmBtn").removeClass("is-active");
            $(".mmContent").hide();
        }
    });

    //分眾服務hover顯示&隱藏內容
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (!isMobile){
        $('[data-side-link="true"]').on('focus mouseover', function () {
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

    //搜尋框輸入後按鈕顯示
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

    //清除搜尋框
    $('[data-form-element="btn-clear"]').on('click', function(e){
        e.preventDefault();
        var formItem = $(this).closest('[data-form-name="search"]');
        formItem.find('[data-form-element="input-search"]').val('');
        formItem.find('[data-form-element="btn-clear"]').hide();
        formItem.find('[data-form-element="btn-submit"]').removeClass('is-available');
    });
});
