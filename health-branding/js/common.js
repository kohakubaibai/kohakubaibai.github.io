$(document).ready(function() {


	$('.menu').hover(function(){
		var _this = $(this),
			_submenuOpen = _this.find('.submenu');
		_submenuOpen.stop(true, true).slideToggle(200);
	});


	$('body').addClass('js');
	var $menu = $('#menu'),
	$menulink = $('.menu-link');

	$menulink.click(function() {
		$menulink.toggleClass('active');
		$menu.toggleClass('active');
		return false;
	});

	new WOW().init();


	$('.brand-list').owlCarousel({
	    loop:false,
	    autoplay:true,
	    margin:0,
	    nav:true,
	    center:false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    }
	});
	$('.column-list').owlCarousel({
	    loop:false,
	    margin: 15,
	    nav:true,
	    items:1,
	    autoHeight:true
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