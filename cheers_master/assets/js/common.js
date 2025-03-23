$(document).ready(function () {
	$(document).scroll(function () {
		var $nav = $(".l-header");
		$nav.toggleClass("is-scrolled", $(this).scrollTop() > $nav.height());
	});

	$(".js-menuToggler").on('click', function () {
		$(".js-navbar").toggleClass("is-open");
		$(this).toggleClass("is-active");
	});

	new WOW().init();

	$(".js-anchor").on('click', function (event) {

		// Make sure this.hash has a value before overriding default behavior
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
			
			$(".js-navbar").removeClass("is-open");
			$(".js-menuToggler").removeClass('is-active');
		} // End if
	});

	// Toggle dropdown
	$('.js-selectToggler').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active')
		$('.js-selectOption').slideToggle(200);
	});

});