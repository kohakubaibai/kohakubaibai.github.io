$(function () {
	var width = $(window).width(),
		height = $(window).height();

	$('.slider-center').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		pauseOnFocus: false,
		pauseOnHover: false,
		centerMode: true,
		centerPadding: '0',
		prevArrow: '<button type="button" class="slick-prev"><i class="icon icon-chevron-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="icon icon-chevron-right"></i></button>',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	
	
	var agendaJSON;
	var speakerJSON;
	var keywordJSON;
	var agenda_url = "https://opensheet.elk.sh/1AnOqes8HCuCMg5QU7qe_qRGJGHsknDox-vIR9xDf6aA/agenda";
	var speaker_url = "https://opensheet.elk.sh/1AnOqes8HCuCMg5QU7qe_qRGJGHsknDox-vIR9xDf6aA/speaker";
	var keyword_url = "https://opensheet.elk.sh/1AnOqes8HCuCMg5QU7qe_qRGJGHsknDox-vIR9xDf6aA/keyword";
	
	$.getJSON(agenda_url, {
		format: 'json'
	}, function(json) {
		agendaJSON = json;
		$.getJSON(speaker_url, {
			format: 'json'
		}, function(json) {
			speakerJSON = json;
			for(let i in agendaJSON) {
				if (agendaJSON[i]["speakers"] == '') continue
				var arrSpeaker = agendaJSON[i]["speakers"].split(',');
				var returnVal = speakerJSON.filter(function (n){
					return arrSpeaker.includes(n.speakerID);
				});
				agendaJSON[i]["speakers"] = returnVal;
			}
			setAgenda(agendaJSON)
		});
	});

	$.getJSON(keyword_url, {
		format: 'json'
	}, function(json) {
		keywordJSON = json;
		$.getJSON(speaker_url, {
			format: 'json'
		}, function(json) {
			speakerJSON = json;
			for(let i in keywordJSON) {
				if (keywordJSON[i]["speakers"] == '') continue
				var arrSpeaker = keywordJSON[i]["speakers"].split(',');
				var returnVal = speakerJSON.filter(function (n){
					return arrSpeaker.includes(n.speakerID);
				});
				keywordJSON[i]["speakers"] = returnVal;
			}
			setKeyword(keywordJSON)
		});
	});
	
	function setAgenda(json) {
		var agendaItem = '';
		for(let f = 0; f < json.length; f++) {
			switch(f) {
				//單圖文：主題演講、議題一、議題四
				case 1:
				case 2:
				case 5:
					agendaItem += '<div class="agenda-item agenda-item--center"><div class="container agenda-head"><div class="row"><div class="col-12"><div class="row"><div class="col-md-9 col-sm-10"><div class="agenda-text"><div class="agenda-sequence"><span>'+ json[f]["sequence"] +'</span></div><div class="agenda-title h3 font-weight-500 my-0 text-center">' + json[f]["title"] + '</div><div class="agenda-intro text-md-center">' + json[f]["intro"] + '</div>';
					// if (json[f]["speakers"].length > 0) {
					// 	agendaItem += '<button class="btn btn--standard btn--agenda mx-auto"> 查看講者 <i class="icon icon-chevron-down"></i></button>';
					// }
					agendaItem += '</div><div class="agenda-img agenda-img-main mt-20"><img src="assets/images/agenda/' + json[f]["img-1"] + '" alt="' + json[f]["topic_alt"] + '"></div></div></div></div></div></div>';
					
					if (json[f]["speakers"].length > 0) {
						agendaItem += '<div class="agenda-body"><div class="container"><div class="row">';
						for (let g = 0; g < json[f]["speakers"].length; g++) {
							agendaItem += '<div class="speaker-item display-md-block display-flex col-md-3"><img src="assets/images/speaker/' + json[f]["speakers"][g]["img"] + '" alt="' + json[f]["speakers"][g]["nameZh"] + '" class="speaker-img mx-auto"><div class="speaker-text text-md-center"><div class="h3 mt-md-5 my-0 serif font-weight-700 display-md-block display-inline-block">' + json[f]["speakers"][g]["nameZh"] + '</div><div class="h3 my-0 pl-md-0 pl-10 serif font-weight-700 display-md-block display-inline-block">' + json[f]["speakers"][g]["nameEn"] + '</div><p class="mt-md-10 mt-5 mb-md-20 mb-10">' + json[f]["speakers"][g]["titleZh"] + '</p><button class="speaker-more btn btn--standard btn--outlined mx-md-auto serif font-weight-700" data-name="' + json[f]["speakers"][g]["nameZh"] + '">MORE</button></div></div>';
						}
						agendaItem += '</div></div></div>';
						agendaItem += '</div>';
					}
					
					agendaItem += '</div></div>';
					break;
				// 右大左小文字在左：議題二
				case 3:
					agendaItem += '<div class="agenda-item agenda-item--side"><div class="container agenda-head"><div class="row"><div class="col-md-9 col-sm-10"><div class="row"><div class="col-agenda-4"><div class="agenda-text"><div class="agenda-sequence"><span>'+ json[f]["sequence"] +'</span></div><div class="agenda-title h3 font-weight-500 my-0 text-xs-center text-md-left">' + json[f]["title"] + '</div><div class="agenda-intro">' + json[f]["intro"] + '</div>';
					// if (json[f]["speakers"].length > 0) {
					// 	agendaItem += '<button class="btn btn--standard btn--agenda mx-xs-auto mx-md-0"> 查看講者 <i class="icon icon-chevron-down"></i></button>';
					// }
					agendaItem += '</div><div class="agenda-img agenda-img-landscape mt-60"><img src="assets/images/agenda/' + json[f]["img-1"] + '" alt="' + json[f]["topic_alt"] + '"></div></div><div class="col-agenda-6"><div class="agenda-img agenda-img-vertical"><img src="assets/images/agenda/' + json[f]["img-2"] + '" alt="' + json[f]["title"] + '"></div></div></div></div></div></div>';
					if ( json[f]["speakers"].length > 0 ) {
						agendaItem += '<div class="agenda-body"><div class="container"><div class="row">';
						for (let g = 0; g < json[f]["speakers"].length; g++) {
							agendaItem += '<div class="speaker-item display-md-block display-flex col-md-3"><img src="assets/images/speaker/' + json[f]["speakers"][g]["img"] + '" alt="' + json[f]["speakers"][g]["nameZh"] + '" class="speaker-img mx-auto"><div class="speaker-text text-md-center"><div class="h3 mt-md-5 my-0 serif font-weight-700 display-md-block display-inline-block">' + json[f]["speakers"][g]["nameZh"] + '</div><div class="h3 my-0 pl-md-0 pl-10 serif font-weight-700 display-md-block display-inline-block">' + json[f]["speakers"][g]["nameEn"] + '</div><p class="mt-md-10 mt-5 mb-md-20 mb-10">' + json[f]["speakers"][g]["titleZh"] + '</p><button class="speaker-more btn btn--standard btn--outlined mx-md-auto serif font-weight-700" data-name="' + json[f]["speakers"][g]["nameZh"] + '">MORE</button></div></div>';
						}
						agendaItem += '</div></div></div>';
						agendaItem += '</div>';
					}
					agendaItem += '</div></div>';
					break;
				// 左大右小文字在右：議題三
				case 4:
					agendaItem += '<div class="agenda-item agenda-item--side"><div class="container agenda-head"><div class="row"><div class="col-md-9 col-sm-10"><div class="row row-reverse"><div class="col-agenda-4"><div class="agenda-text"><div class="agenda-sequence"><span>'+ json[f]["sequence"] +'</span></div><div class="agenda-title h3 font-weight-500 my-0 text-xs-center text-md-left">' + json[f]["title"] + '</div><div class="agenda-intro">' + json[f]["intro"] + '</div>';
					// if (json[f]["speakers"].length > 0) {
					// 	agendaItem += '<button class="btn btn--standard btn--agenda mx-xs-auto mx-md-0"> 查看講者 <i class="icon icon-chevron-down"></i></button>';
					// }
					agendaItem += '</div><div class="agenda-img agenda-img-landscape mt-60"><img src="assets/images/agenda/' + json[f]["img-1"] + '" alt="' + json[f]["topic_alt"] + '"></div></div><div class="col-agenda-6"><div class="agenda-img agenda-img-vertical"><img src="assets/images/agenda/' + json[f]["img-2"] + '" alt="' + json[f]["title"] + '"></div></div></div></div></div></div>';
					if ( json[f]["speakers"].length > 0 ) {
						agendaItem += '<div class="agenda-body"><div class="container"><div class="row">';
						for (let g = 0; g < json[f]["speakers"].length; g++) {
							agendaItem += '<div class="speaker-item display-md-block display-flex col-md-3"><img src="assets/images/speaker/' + json[f]["speakers"][g]["img"] + '" alt="' + json[f]["speakers"][g]["nameZh"] + '" class="speaker-img mx-auto"><div class="speaker-text text-md-center"><div class="h3 mt-md-5 my-0 serif font-weight-700 display-md-block display-inline-block">' + json[f]["speakers"][g]["nameZh"] + '</div><div class="h3 my-0 pl-md-0 pl-10 serif font-weight-700 display-md-block display-inline-block">' + json[f]["speakers"][g]["nameEn"] + '</div><p class="mt-md-10 mt-5 mb-md-20 mb-10">' + json[f]["speakers"][g]["titleZh"] + '</p><button class="speaker-more btn btn--standard btn--outlined mx-md-auto serif font-weight-700" data-name="' + json[f]["speakers"][g]["nameZh"] + '">MORE</button></div></div>';
						}
						agendaItem += '</div></div></div>';
						agendaItem += '</div>';
					}
					agendaItem += '</div>';
					agendaItem += '</div></div>';
					break;
				default:
			}
		}
		$('#agenda').html(agendaItem);
		$('.agenda-img-landscape').each(function(){
			let textHeight = $(this).siblings('.agenda-text').outerHeight(),
				columnImg = $(this).parent('.col-agenda-4').siblings('.col-agenda-6').children('.agenda-img-vertical').outerHeight();
				$(this).css('height', (columnImg-textHeight-60));
			$(this).css('width', (columnImg-textHeight-60)*1.33333333);
		});
	}

	function setKeyword(json) {
		var keywordItem = '';
		for(let f = 0; f < json.length; f++) {
			switch(f) {
				case 0:
				case 1:
					keywordItem += '<div class="keyword__item active"><div class="card"><div class="card__front"><div class="media"><img src="assets/images/keyword/'+json[f]["img-1"]+'" alt="'+json[f]["key_alt"]+'"></div>';
					keywordItem += '<div class="txt"><div class="number">'+json[f]["no"]+'</div><div class="heading">'+json[f]["heading"]+'</div></div></div>';
					keywordItem += '<div class="card__back"><div class="wrap"><div class="depiction">'+json[f]["intro"]+'</div>';
					if (json[f]["speakers"].length > 0) {
						for (let g = 0; g < json[f]["speakers"].length; g++) {
							keywordItem += '<div class="presenter"><button type="button" class="speakerBtn speaker-more" data-name="' + json[f]["speakers"][g]["nameZh"] + '"><div class="speakerBtn__pic"><img src="assets/images/speaker/'+ json[f]["speakers"][g]["img"] +'" alt="' + json[f]["speakers"][g]["nameZh"] + '" class="speaker-img mx-auto"></div><div class="speakerBtn__txt"><div class="name">主講人／<span>' + json[f]["speakers"][g]["nameZh"] + '</span></div><span class="title">' + json[f]["speakers"][g]["titleZh"] + '</span></div></button>'
						}
					}
					keywordItem += '</div></div></div></div></div>';
					break;
			}
			
			
		}
		$('#keyword').html(keywordItem);
	}

	$(document).on('click','.agenda-text button', function(){
		let agendaHeadTop =  $(this).parent().parent().parent().parent().parent().parent('.agenda-head').offset().top,
		agendaHeadHeight =  $(this).parent().parent().parent().parent().parent().parent('.agenda-head').outerHeight();
		$(this).toggleClass('active');
		$(this).parent().parent().parent().parent().parent().parent('.agenda-head').siblings('.agenda-body').slideToggle();
		$('html,body').animate({
			scrollTop: (agendaHeadTop+agendaHeadHeight) - (height / 4)
		}, 1000);
	});
	$(document).on('click','.speaker-more',function() {
		var speakerName = $(this).data('name'),
			speaker = "";
		$.getJSON(speaker_url, {
			format: 'json'
		}, function(json) {
			speakerDATA = json;
			for (var i = 0; i < speakerDATA.length; i++) {
				if (speakerName == speakerDATA[i]["nameZh"]) {
					speaker += '<img class="message-img" src="assets/images/speaker/' + speakerDATA[i]["img"];
					speaker += '" alt="' + speakerDATA[i]["nameZh"];
					speaker += '"><div class="message-name serif font-weight-700 text-center">' + speakerDATA[i]["nameZh"];
					speaker += '</div><div class="message-name serif font-weight-700 text-center">' + speakerDATA[i]["nameEn"];
					speaker += '</div><div class="message-title text-center">' + speakerDATA[i]["titleZh"];
					speaker += '</div><div class="message-title text-center">' + speakerDATA[i]["titleEn"];
					speaker += '</div><div class="message-essay">' + speakerDATA[i]["intro"];
					speaker += '</div>'
				}
			}
			$('.message-content').html(speaker);
			$('.message').fadeIn();
			return false;
		});
	});
	$(document).on('click','.card__front',function(){
		var active = $(this).closest('.keyword__item').hasClass('active');
		if (active) {
			return false
		} else {
			$(this).closest('.keyword__item').addClass('active').siblings('.keyword__item').removeClass('active');
		}
	});
	
    $('.message-content').click(function(e) {
        e.stopPropagation();
    });
    $('.message').click(function() {
        $('.message').fadeOut();;
    });
});
function loadingFunction() {
  	var url = "assets/images/title_animated.svg?r=" + Math.random();
 	$("#anime-logo").attr("src", url);
}
loadingFunction();

function makeTimer() {
	var endTime = new Date("24 June 2022 23:59:59 GMT+08:00");
		endTime = (Date.parse(endTime) / 1000);
	var now = new Date();
		now = (Date.parse(now) / 1000);
	var timeLeft = endTime - now;
	var days = Math.floor(timeLeft / 86400); 
	var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
	var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
	var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
	if (hours < "10") { hours = "0" + hours; }
	if (minutes < "10") { minutes = "0" + minutes; }
	if (seconds < "10") { seconds = "0" + seconds; }
	$('[data-countdown-item-id="days"]').html('<span class=\"number font-weight-500 mr-md-5\">' + days + '</span><span class=\"units\">日</span>');
	$('[data-countdown-item-id="hours"]').html('<span class=\"number font-weight-500 mr-md-5\">' + hours + '</span><span class=\"units\">時</span>');
	$('[data-countdown-item-id="minutes"]').html('<span class=\"number font-weight-500 mr-md-5\">' + minutes + '</span><span class=\"units\">分</span>');
	$('[data-countdown-item-id="seconds"]').html('<span class=\"number font-weight-500 mr-md-5\">' + seconds + '</span><span class=\"units\">秒</span>');
}
setInterval(function() { makeTimer();}, 1000);
