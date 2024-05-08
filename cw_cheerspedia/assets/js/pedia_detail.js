$(function () {
    var popupType1 = `<div class="pediaTooltip__wrapper">
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
                    </div>`
    var popupType2 = `<div class="pediaTooltip__wrapper">
                        <div class="close" data-pedia-popupitem="close"></div>
                        <div class="title">
                            <span class="title__zh">:title_Zh</span>
                            <span class="title__en">:title_En</span>
                        </div>
                        <div class="content">:content</div>
                        <div class="action"><a href=":more_link">瞭解更多</a></div>
                    </div>`
    var popupType3 = `<div class="pediaTooltip__wrapper">
                        <div class="close" data-pedia-popupitem="close"></div>
                        <div class="title">
                            <span class="title__zh">:title_Zh</span>
                            <span class="title__en">:title_En</span>
                        </div>
                        <div class="content is-maintain">
                            <span class="maintainTxt">請您稍後再試，謝謝。</span>
                            <span class="maintainTxt">百科資料正在維護中，</span>
                        </div>
                    </div>`

    function isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }
    
    if (!isMobile()) {
        let enterData = {
            x: null,
            y: null,
            pediaword: null,
        };

        let popupCloseTimeout = null;

        $('[data-pedia-popup="true"]').on('mouseenter', function (e) {
            var pediaword = $(this).data('title');

            clearTimout();

            if (enterData.pediaword !== pediaword) {
                resetPopup();
            }

            if (enterData.x === null || enterData.y === null) {
                enterData.x = e.pageX;
                enterData.y = e.pageY;
            }

            enterData.pediaword = pediaword;

            setPopup();
            openPopup();
        }).on('mouseleave', function(){
            popupCloseTimeout = closePopup();
        });

        $(document).on('mouseover','[data-pedia-popupitem="group"]', function(e){
            clearTimout();
        }).on('mouseleave','[data-pedia-popupitem="group"]', function(e){
            popupCloseTimeout = closePopup();
        });

        $(document).on('click','[data-pedia-popupitem="close"]',function(){
            resetPopup();
        });

        function setPopup() {
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
                        .replace(':more_link', result.moreLink ?? '');
            
            $('[data-pedia-popupitem="group"]').html(clonePopup);

            var popupWidth = 350;
            var range = $('[data-pedia-range="true"]'),
                rangeL = range.offset().left,
                rangeW = range.width(),
                rangeMax = rangeL + rangeW;
        
            var fixRight = ($(window).outerWidth(true) - 1000) / 2;
            if(enterData.x + popupWidth >= rangeMax) {
                $('[data-pedia-popupitem="group"]').css({
                    right: fixRight,
                    left: 'auto',
                    top: enterData.y + 'px',
                })
            } else {
                $('[data-pedia-popupitem="group"]').css({
                    top: enterData.y + 'px',
                    left: enterData.x,
                    right: 'auto'
                });
            }
            
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
            $('[data-pedia-popupitem="group"]').removeClass('is-active');
            enterData = {
                x: null,
                y: null,
                pediaword: null
            };
        }

        function clearTimout() {
            clearTimeout(popupCloseTimeout);
            popupCloseTimeout = null;
        }
    }
});
