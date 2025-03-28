$(document).ready(function () {
	$(document).scroll(function () {
		var $nav = $(".l-header");
		$nav.toggleClass("is-scrolled", $(this).scrollTop() > $nav.height());
	});

	$(".js-menuToggler").on('click', function () {
		$(".js-navbar").toggleClass("is-open");
		$(this).toggleClass("is-active");
		$('body').toggleClass('openNav');
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
			$('body').removeClass('openNav');
		} // End if
	});

	// Toggle dropdown
	$('.js-selectToggler').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active')
		$('.js-selectOption').slideToggle(200);
	});

	$(document).on('click', function(e){
		if (!$(e.target).closest('.js-selectToggler').length) {
			$('.js-selectToggler').removeClass('active');
			$('.js-selectOption').slideUp(200);
		}
	});

	const swiper = new Swiper('.swiper', {
		// Optional parameters
		loop: true,
		slidesPerView: 4,

		// Navigation arrows
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},

		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 16
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 32
			},
		  },
	});

	var $slides = $('.swiper-slide');
	var $iframes = $slides.find('iframe');
	var currentIndex = 0;


	// Function to stop all videos
	function stopAllVideos() {
		$iframes.each(function() {
			// Add stop parameter to video URL
			var stopUrl = $(this).attr('src').split('?')[0] + '?enablejsapi=1&autoplay=0';
			$(this).attr('src', stopUrl);
		});
	}

	// Click event to play/stop videos
	$slides.on('click', function() {
		var $clickedSlide = $(this);
		var $clickedIframe = $clickedSlide.find('iframe');

		// Stop all videos first
		stopAllVideos();

		// Add autoplay to clicked video
		var playUrl = $clickedIframe.attr('src').split('?')[0] + '?enablejsapi=1&autoplay=1';
		$clickedIframe.attr('src', playUrl);

		// Update current index
		currentIndex = $slides.index($clickedSlide);

		// Update active slide
		$slides.removeClass('active');
		$clickedSlide.addClass('active');
	});
});