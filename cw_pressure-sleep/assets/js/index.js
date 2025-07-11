$(function() {

	var slickBasicSetting={
		dots: true,
		//autoplay: true,
		autoplaySpeed: 5000,
		infinite: true,
		prevArrow:'<div class="btn-arrowL effect-moveL"><i class="fas fa-caret-left"></i></div>',
		nextArrow:'<div class="btn-arrowR effect-moveR"><i class="fas fa-caret-right"></i></div>'
	};
	var slickArticleSetting={
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{

				breakpoint: 767, 
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};
	var slick=$(".slick");
	var slickArticle=$(".slickArticle");
	slick.slick(slickBasicSetting);
	slickArticle.slick($.extend({}, slickBasicSetting, slickArticleSetting));
	
	/************************** ScrollMagic start ******************************/
	var hash=location.hash;
	var navLink=$(".navbar .nav-link");
	var controller=new ScrollMagic.Controller();
	var scrollArea=$(".scrollArea");
	var scrollAreaIdArr=[];
	var scrollAreaActive;
	function updateNav(href, andPush){
		if(andPush){
			history.pushState({href:href}, "", href);
		}else{
			history.replaceState({href:href}, "", href);
		}
		scrollAreaActive=href.slice(1);
	}
	scrollArea.each(function(i){
		var area=$(this);
		var id=area.attr("id");
		scrollAreaIdArr.push(id);
		var scene=new ScrollMagic.Scene({
			triggerElement: area.get(0)
		}).on("enter", function(e) {
			updateNav("#"+id, false);
		}).on("leave", function(e) {
			if(i>0 && e.scrollDirection=="REVERSE"){
				updateNav("#"+scrollAreaIdArr[scrollAreaIdArr.findIndex(el => el==scrollAreaActive)-1], false);
			}
		}).addTo(controller);
	});
	/************************** ScrollMagic end ******************************/
	
	/************************** game start ******************************/
	function initGame(){
		var score;
		var nowQ;
		var gameBox=$(".gameBOX").data("correctAudio", new Audio("imgs/gameO.mp3")).data("wrongAudio", new Audio("imgs/gameX.mp3"));
		var QArr=["Y","N","Y","Y","N"];
		var Q=gameBox.find(".Q");
		var QAmount=Q.length;
		var YN=Q.find("button");
		var ABlock=gameBox.find(".ABlock");
		var RBlock=gameBox.find(".RBlock");
		var R=RBlock.find(".R");
		var resetBtn=R.find("button");
		
		function showNext(){
			var tmpNext=nowQ+1;
			nowQ=(tmpNext>QAmount? 0 : tmpNext);
			ABlock.removeClass("show correct wrong");
			if(nowQ){
				Q.eq(nowQ-1).addClass("active").siblings().removeClass("active");
			}else{
				let r=(function(){
					if(score<=2){
						return 1;
					}else if(score>=3 && score<=4){
						return 2;
					}else if(score>=5){
						return 3;
					}
				})();
				R.eq(r-1).addClass("active");
				RBlock.addClass("show");
			}
		}
		
		function reset(){
			score=0;
			nowQ=1;
			Q.eq(nowQ-1).addClass("active").siblings().removeClass("active");
			YN.removeClass("out");
			ABlock.removeClass("show correct wrong");
			RBlock.removeClass("show");
			R.removeClass("active");
		}
		reset();

		Q.each(function(i){
			var _Q=$(this);
			var answer=QArr[i];
			var btn=_Q.find("button");
			var correctBtn=btn.filter("."+answer);
			var wrongBtn=correctBtn.siblings("button");
			var cw;
			var audio;
			btn.each(function(){
				var _btn=$(this);
				var _answer=_btn.attr("class").split(" ")[0];
				_btn.click(function(){
					cw=(_answer==answer)? "correct" : "wrong";
					ABlock.addClass("show "+cw);
					wrongBtn.addClass("out");
					if(cw=="correct"){
						score++;
					}
					audio=gameBox.data(cw+"Audio");
					audio.currentTime=0;
					audio.play();
					setTimeout(function(){
						showNext();
					}, 1200); //對錯公布的停留秒數
				});
			});
		});

		resetBtn.click(function(){
			reset();
		});
	}
	initGame();
	/************************** game end ******************************/
	
	/************************** 院所內容 start ******************************/
	var navbarX=$(".navbarX");
	var hospitalCT=$(".hospitalCT");
	var liAmountMaxDefault=navbarX.is(":visible")? 6 : 9;
	hospitalCT.each(function(){
		var ct=$(this);
		var li=ct.find("li");
		var liAmount=li.length;
		var more=ct.find(".more");
		more.click(function(){
			ct.addClass("showAll");
		});
		liAmount<=liAmountMaxDefault && more.trigger("click");
	});
	/************************** 院所內容 end ******************************/
	
	setTimeout(function(){
		hash && navLink.filter("[href$='"+hash+"']").trigger("click");
	}, 100);
	
});