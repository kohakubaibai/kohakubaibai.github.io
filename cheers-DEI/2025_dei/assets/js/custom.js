//navbar scroll
$(function () {
  $(document).scroll(function () {
    var $nav = $(".l-navbar");
    $nav.toggleClass("l-navbar--scrolled", $(this).scrollTop() > $nav.height());
  });
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
  $(".js-anchor a").on("click", function (event) {
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

    $(".l-navbar__menu ").removeClass("open");
    $(".l-navbar__toggler--activate").attr("class", "l-navbar__toggler");
  });

  // Toggle dropdown
	$('.js-selectToggler').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.js-selectOption').slideToggle(200);
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
