$(function () {
	var $commentSlider = $('[data-slick-slider="comment"]');
		$commentSlider.on('init', function(event, slick){
			$(this).closest('.carousel').css({'visibility':'visible'});
		}).slick({
			infinite: true,
			rows: 0,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: true,
			fade: false,
			dots: true,
			prevArrow: '<button class="slick-prev slides__arrow slides__arrow--prev" aria-label="Previous" type="button"></button>',
			nextArrow: '<button class="slick-next slides__arrow slides__arrow--next" aria-label="Next" type="button"></button>',
			dotsClass: 'slides__dots',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
});
