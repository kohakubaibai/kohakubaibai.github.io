function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if (element_class != '.top-con') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if ($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({
			scrollTop: scroll_to
		}, 1000);
	}
}


jQuery(document).ready(function () {

	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function (e) {
		e.preventDefault();
		scroll_to($(this), $('nav').outerHeight());
	});
	// toggle "navbar-no-bg" class
	$('.top-con .text').waypoint(function () {
		$('nav').toggleClass('navbar-no-bg');
	});

	/*
	    Background slideshow
	*/
	$('.top-content').backstretch("assets/img/backgrounds/1.jpg");
	$('.how-it-works-container').backstretch("assets/img/backgrounds/1.jpg");
	//	$('.call-to-action-container').backstretch("assets/img/backgrounds/1.jpg");

	$('#top-navbar-1').on('shown.bs.collapse', function () {
		$('.top-content').backstretch("resize");
	});
	$('#top-navbar-1').on('hidden.bs.collapse', function () {
		$('.top-content').backstretch("resize");
	});

	/*
	    Wow
	*/
	new WOW().init();


	//Scroll fix
	// top bar
	$('.top-bar').scrollFix({
		side: 'top'
	});
	// middle bar
	$('.middle-bar').scrollFix({
		side: 'both',
		topPosition: 50, // after the top bar
		bottomPosition: 50 // before the bottom bar
	});
	// bottom bar
	$('.bottom-bar').scrollFix({
		side: 'bottom'
	});

});

jQuery(document).ready(function () {

	'use strict';

	var c, currentScrollTop = 0,
		navbar = $('.bottom-b');

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


	//fixed footer on on scrolling
	$(window).scroll(function(){
		last=$("body").height()-$(window).height()-300
		if($(window).scrollTop()>=last){
			$("#call").fadeOut(350);
		} else{
			$("#call").fadeIn(350);
		}

	});
