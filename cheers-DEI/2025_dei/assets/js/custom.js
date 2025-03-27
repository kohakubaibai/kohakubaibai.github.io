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
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () {
				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});

			$(".l-navbar__menu ").removeClass("open");
			$(".l-navbar__toggler--activate").attr("class", "l-navbar__toggler");
		} // End if
	});

	// Toggle dropdown
	$('.js-selectToggler').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.js-selectOption').slideToggle(200);
	});

	$(document).on('click', function(e){
		if (!$(e.target).closest('.js-selectToggler').length) {
			$('.js-selectToggler').removeClass('active');
			$('.js-selectOption').slideUp(200);
		}
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
