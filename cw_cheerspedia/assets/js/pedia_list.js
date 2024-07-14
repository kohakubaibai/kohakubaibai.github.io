$(function () {
    $('[data-anchor-item="button"]').on('click', function(){
        var anchor_index = $(this).index(),
            headerHeight = $('header').outerHeight(true),
            navHeight = $('#talent-nav').outerHeight(true);
        $('html,body').animate({scrollTop: $('[data-anchor-item="target"]').eq(anchor_index).offset().top - headerHeight - navHeight - 20}, 800);
        return false;
    });

    var winH = $(window).outerHeight(true);
    $(window).on('scroll', function(){
        var scrollTop = $(this).scrollTop();

        if(scrollTop >= (winH / 4)) {
            $('#pediaGoTop').addClass('active');
        } else {
            $('#pediaGoTop').removeClass('active');
        }
    });

    $('#pediaGoTop').on('click',function(){
		$('html,body').animate({ scrollTop: 0 }, 1200);
    });

    var popupType1 = `<div class="pediaTooltip" data-pedia-popupitem="group" gtm-label=":close_gtm">
                        <div class="pediaTooltip__wrapper">
                            <div class="close" data-pedia-popupitem="close"></div>
                            <div class="title">
                                <span class="title__zh">:title_Zh</span>
                                <span class="title__en">:title_En</span>
                            </div>
                            <div class="content">:content</div>
                            <ul class="links">
                                <li><a href=":link1" target="blank">:topic1</a></li>
                                <li><a href=":link2" target="blank">:topic2</a></li>
                            </ul>
                        </div>
                    </div>`
    var popupType2 = `<div class="pediaTooltip" data-pedia-popupitem="group">
                        <div class="pediaTooltip__wrapper">
                            <div class="close" data-pedia-popupitem="close" gtm-label=":title_Zh"></div>
                            <div class="title">
                                <span class="title__zh">:title_Zh</span>
                                <span class="title__en">:title_En</span>
                            </div>
                            <div class="content">:content</div>
                            <div class="action"><a href=":more_link">瞭解更多</a></div>
                        </div>
                    </div>`
    var popupType3 = `<div class="pediaTooltip" data-pedia-popupitem="group">
                        <div class="pediaTooltip__wrapper">
                            <div class="close" data-pedia-popupitem="close"></div>
                            <div class="title">
                                <span class="title__zh">:title_Zh</span>
                                <span class="title__en">:title_En</span>
                            </div>
                            <div class="content is-maintain">
                                <span class="maintainTxt">請您稍後再試，謝謝。</span>
                                <span class="maintainTxt">百科資料正在維護中，</span>
                            </div>
                        </div>
                    </div>`

    function isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }
    
    if (!isMobile()) {
        let enterData = {
            pediaword: null,
        };

        let popupCloseTimeout = null;

        $(document).on('mouseenter', '[data-pedia-popup="true"]', function(){
            var pediaword = $(this).data('title');

            clearTimout();

            if (enterData.pediaword !== pediaword) {
                resetPopup();
            }

            enterData.pediaword = pediaword;

            setPopup($(this));
            console.log($(this))
            openPopup();
        }).on('mouseleave', '[data-pedia-popup="true"]', function(){
            popupCloseTimeout = closePopup();
        });
        // $('[data-pedia-popup="true"]').on('mouseenter', function (e) {
        //     var pediaword = $(this).data('title');

        //     clearTimout();

        //     if (enterData.pediaword !== pediaword) {
        //         resetPopup();
        //     }

        //     enterData.pediaword = pediaword;

        //     setPopup($(this));
        //     console.log($(this))
        //     openPopup();
        // }).on('mouseleave', function(){
        //     popupCloseTimeout = closePopup();
        // });

        $(document).on('mouseover','[data-pedia-popupitem="group"]', function(e){
            clearTimout();
        }).on('mouseleave','[data-pedia-popupitem="group"]', function(e){
            popupCloseTimeout = closePopup();
        });

        $(document).on('click','[data-pedia-popupitem="close"]',function(){
            resetPopup();
        });

        function setPopup(target) {
            var result = data.find(item => item.titleZh == enterData.pediaword);

            if (result != undefined) {
                if(result.status == true) {
                    if(result.relative_status == true) {
                        var clonePopup = popupType1;
                    } else {
                        var clonePopup = popupType2;
                    }
                } else {
                    var clonePopup = popupType3;
                }
            };

            var subContent = result.content.substring(0, 97) + '...';

            clonePopup = clonePopup
                        .replace(':title_Zh', result.titleZh)
                        .replace(':title_En', result.titleEn)
                        .replace(':content', subContent ?? '')
                        .replace(':link1', result.link1 ?? '')
                        .replace(':topic1', result.topic1 ?? '')
                        .replace(':link2', result.link2 ?? '')
                        .replace(':topic2', result.topic2 ?? '')
                        .replace(':more_link', result.moreLink ?? '')
                        .replace(':close_gtm', result.titleZh ?? '');
            target.closest('li').append(clonePopup);
        }

        function openPopup() {
            setTimeout(() => {
                $('[data-pedia-popupitem="group"]').addClass('is-active');
            }, 300);
        }

        function closePopup() {
            return setTimeout(() => {
                resetPopup();
            }, 300);
        }

        function resetPopup() {
            $('[data-pedia-popupitem="group"]').remove().removeClass('is-active');
            enterData = {
                pediaword: null
            };
        }

        function clearTimout() {
            clearTimeout(popupCloseTimeout);
            popupCloseTimeout = null;
        }
    }
});
