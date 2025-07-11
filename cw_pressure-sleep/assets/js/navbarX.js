$(function() {

    var navbarX=$(".navbarX");
	navbarX.click(function(){
      navbarX.toggleClass('active');
    });

	$(".navbar .nav-link").click(function(){
		navbarX.is(".active") && navbarX.trigger("click");
	});

});