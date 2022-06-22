$(function () {
	var $commentSlider = $('[data-slick-slider="comments"]');
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
		prevArrow: '<button class="slick-prev slides__arrow slides__arrow--comments prev" aria-label="Previous" type="button"></button>',
		nextArrow: '<button class="slick-next slides__arrow slides__arrow--comments next" aria-label="Next" type="button"></button>',
		dotsClass: 'slides__dots slides__dots--comments',
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

	var $teacherSlider = $('[data-slick-slider="teacher"]');
	$teacherSlider.on('init', function(event, slick){
		$(this).closest('.carousel').css({'visibility':'visible'});
	}).slick({
		infinite: true,
		rows: 0,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: false,
		dots: true,
		prevArrow: '<button class="slick-prev slides__arrow slides__arrow--teacher prev" aria-label="Previous" type="button"></button>',
		nextArrow: '<button class="slick-next slides__arrow slides__arrow--teacher next" aria-label="Next" type="button"></button>',
		dotsClass: 'slides__dots slides__dots--teacher'
	});
});
