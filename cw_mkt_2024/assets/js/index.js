newFunction();

function newFunction() {
    "use strict";
    // $((function () { $(".hamburger").on("click", (function (e) { e.preventDefault(), $(this).toggleClass("is-active"), $(".mb_menu").toggleClass("visible"); })), $(".mb_menu li a").on("click", (function () { $(".mb_menu").toggleClass("visible"), $(".hamburger").toggleClass("is-active"); })), $(window).scroll((function () { var scroll; $(window).scrollTop() > 0 ? $(".menubar .bg").addClass("bg_show") : $(".menubar .bg").removeClass("bg_show"); })), 
    // setTimeout((function () { $("#preloader").fadeOut(3000); }), 4000), $('.menu li a[href^="#"], .smScroll').on("click", (function (event) { var target = $(this.getAttribute("href")); target.length && (event.preventDefault(), $("html, body").stop().animate({ scrollTop: target.offset().top - 59 }, 500)); })); }));
    $((function () {
        $(".hamburger").on("click", (function (e) {
            e.preventDefault(),
            $(this).toggleClass("is-active"),
            $(".mb_menu").toggleClass("visible"); })),
            $(".mb_menu li a").on("click", (function () {
                $(".mb_menu").toggleClass("visible"),
                $(".hamburger").toggleClass("is-active");
        })),
        $(window).scroll((function () {
            var scroll;
            $(window).scrollTop() > 0 ? $(".menubar .bg").addClass("bg_show") : $(".menubar .bg").removeClass("bg_show");
        })), 
        $('.menu li a[href^="#"], .smScroll').on("click", (function (event) {
            var target = $(this.getAttribute("href")); target.length && (event.preventDefault(), $("html, body").stop().animate({ scrollTop: target.offset().top - 59 }, 500)); }
        ));
    }));
}
// popup
$(".open_popup--2022").click(function () {
    $("#popup--2022").css("display","block");
});
$(".open_popup--2019").click(function () {
    $("#popup--2019").css("display","block");
});
$(".open_popup--2018").click(function () {
    $("#popup--2018").css("display","block");
});
$(".open_popup--2017").click(function () {
    $("#popup--2017").css("display","block");
});
$(".open_popup--2016").click(function () {
    $("#popup--2016").css("display","block");
});
$(".open_popup--2015").click(function () {
    $("#popup--2015").css("display","block");
});
$(".open_popup--2014").click(function () {
    $("#popup--2014").css("display","block");
});
$(".open_popup--2013").click(function () {
    $("#popup--2013").css("display","block");
});
$(".open_popup--2012").click(function () {
    $("#popup--2012").css("display","block");
});

$(".popup .close").click(function () {
    $(".popup").fadeOut();
});

