//navbar scroll
$(function () {
  $(document).scroll(function () {
    var $nav = $(".l-navbar");
    $nav.toggleClass("l-navbar--scrolled", $(this).scrollTop() > $nav.height());
  });
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
  $(".l-navbar__menu__items a").bind("click", function (event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1500,
        "easeInOutExpo"
      );
    event.preventDefault();
  });
});

//wow init

new WOW().init();

//overlay navbar
$(document).ready(function () {
  $(".l-navbar__toggler").click(function () {
    $(".l-navbar__menu").toggleClass("open");
    $(this)
      .toggleClass("l-navbar__toggler")
      .toggleClass("l-navbar__toggler--activate");
  });
});
$(".overlay").on("click", function () {
  $(".overlay").toggle(200);
  $(".l-navbar__toggler")
    .toggleClass("l-navbar__toggler")
    .toggleClass("l-navbar__toggler--activate");
  open = false;
});
//overlay menu clicked close
$(".l-navbar__menu__items a").click(function () {
  $(".l-navbar__menu ").removeClass("open");
  $(".l-navbar__toggler--activate").attr("class", "l-navbar__toggler");
});

//buttom bar showup
jQuery(document).ready(function () {
  "use strict";

  var c,
    currentScrollTop = 0,
    navbar = $(".m-bar");

  $(window).scroll(function () {
    var a = $(window).scrollTop();
    var b = navbar.height();

    currentScrollTop = a;

    if (c < currentScrollTop && a > b + b) {
      navbar.addClass("scrollUp");
    } else if (c > currentScrollTop && !(a <= b)) {
      navbar.removeClass("scrollUp");
    }
    c = currentScrollTop;
  });
});