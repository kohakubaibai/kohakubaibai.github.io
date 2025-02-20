$(document).ready(function() {


	$('body').addClass('js');
	var $menu = $('#menu'),
	$menulink = $('.menu-link');

	$menulink.on('click', function() {
		$menulink.toggleClass('active');
		$menu.toggleClass('active');
		$('body').toggleClass('openMenu');
		return false;
	});

	new WOW().init();

	$('.column-list').owlCarousel({
	    loop: true,
	    margin: 15,
		nav: false,
		navContainer: '#column-navs',
		navText: ['', ''],
	    items: 1,
		dotsContainer: '#column-dots',
	    autoHeight: false,
		smartSpeed: 200,
		mouseDrag: false,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: false
	});

	$('.brand-list').owlCarousel({
	    loop: true,
	    margin: 0,
	    nav: true,
		navText: ['', ''],
	    center: false,
		smartSpeed: 200,
		mouseDrag: false,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: false,
	    responsive: {
	        0: {
	            items: 1,
	        },
	        600: {
	            items: 2
	        },
	        1000: {
	            items: 3,
				margin: 22
	        }
	    }
	});

	$("a[href^='#']").on('click', function(event) {

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
			}, 800, function(){

			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
			});
		} // End if
	});

	var prev = 0;
	var $window = $(window);
	var nav = $('.hd');

	$window.on('scroll', function(){
		var scrollTop = $window.scrollTop();
		nav.toggleClass('hideUp', scrollTop > prev);
		prev = scrollTop;
	});
});