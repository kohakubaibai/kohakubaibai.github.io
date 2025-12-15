/*當區塊距離置頂時*/
$(document).ready(function(){

	var scrollTrigger=$(".inout");
	var className="highlight"; // 滾到區塊時, 會自動加上的 class 名稱
	var triggerOffset=700; // 數字越大, 越提早觸發改變, 指離置頂前400距離就能觸發

	$(window).scroll(function(){
		var st=$(this).scrollTop();
		scrollTrigger.each(function(){
			var obj=$(this);
			var triggerTop=obj.offset().top - triggerOffset;
			obj.toggleClass(className, st>=triggerTop);
		});
	});

});