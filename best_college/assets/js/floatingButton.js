// 當網頁載入完
$(window).ready(function () {
    var $win = $(window),
        $ad = $('#abgne_float_ad').css('opacity', 0).show(), // 讓廣告區塊變透明且顯示出來
        _width = $ad.width(),
        _height = $ad.height(),
        _diffY = 50,
        _diffX = 50, // 距離右及下方邊距
        _moveSpeed = 800; // 移動的速度

    // 先把 #abgne_float_ad 移動到定點
    $ad.css({
        top: $(document).height(),
        left: $win.width() - _width - _diffX,
        opacity: 1
    });

    // 幫網頁加上 scroll 及 resize 事件
    $win.bind('scroll resize', function () {
        var $this = $(this);

        // 控制 #abgne_float_ad 的移動
        $ad.stop().animate({
            top: $this.scrollTop() + $this.height() - _height - _diffY,
            left: $this.scrollLeft() + $this.width() - _width - _diffX
        }, _moveSpeed);
    }).scroll(); // 觸發一次 scroll()
});