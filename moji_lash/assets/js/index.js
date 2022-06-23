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

	var formulaGroup = '';
	for(let i = 0; i < formula.length; i++) {
		var formulaItem = '';
		formulaItem += '<div class="category"><div class="category__main"><div class="category__head"><div class="category__name"><span class="en didot">' + formula[i]["formula_en"] +'</span><span class="ch">' + formula[i]["formula_ch"] +'</span></div><div class="category__intro"><p class="paragraph">' + formula[i]["intro"] +'</p><ul class="feature">';
		var featureItem = '';
		for (let k = 0; k < formula[i].feature.length; k++) {
			featureItem += '<li><span class="label">顏色:</span><span class="label">' + formula[i].feature[k]["color"] +'</span></li>';
			featureItem += '<li><span class="label">Size:</span><span class="label">' + formula[i].feature[k]["size"] +'</span></li>';
			featureItem += '<li><span class="label">Skill:</span><span class="label">' + formula[i].feature[k]["skill"] +'</li></span>';
		}	
		formulaItem += featureItem;
		formulaItem += '</ul></div></div><div class="category__body"><table class="category__table"><thead><tr><th>雙眼根數</th><th>定價</th><th>體驗價</th><th class="narrative">妝感說明</th></tr></thead><tbody>';
		var priceGroup = '';
		for (let l = 0; l < formula[i].price.length; l++) {
			if(formula[i].price[l]["best"]== true) {
				priceGroup += '<tr class="best"><td>' + formula[i].price[l]["amount"] +'</td><td><span class="cv didot">NT.</span><span class="value">' + formula[i].price[l]["fixed_price"] +'</span></td><td><span class="cv didot">NT.</span><span class="value">' + formula[i].price[l]["exp_price"] +'</span></td><td class="narrative">' + formula[i].price[l]["narrative"] +'</td></tr>';
			} else {
				priceGroup += '<tr><td>' + formula[i].price[l]["amount"] +'</td><td><span class="cv didot">NT.</span><span class="value">' + formula[i].price[l]["fixed_price"] +'</span></td><td><span class="cv didot">NT.</span><span class="value">' + formula[i].price[l]["exp_price"] +'</span></td><td class="narrative">' + formula[i].price[l]["narrative"] +'</td></tr>';
			}
		}
		formulaItem += priceGroup;
		formulaItem += '</tbody></table><div class="category__image"><img src="' + formula[i]["image"] + '" alt="' + formula[i]["alt"] + '"></div></div></div>';
		formulaItem += '<div class="category__foot"><div class="enName didot">' + formula[i]["en"] + '</div><div class="chName"><div class="line"></div><div class="characteristic"><span>' + formula[i]["characteristic"] + '</span></div></div></div></div>';

		formulaGroup += formulaItem;
	}
	$('#category').html(formulaGroup);
});
