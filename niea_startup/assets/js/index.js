$(function () {
	//輪播圖的設定
    var mySwiper = new Swiper(".swiper-container", {
        loop: true,
        spaceBetween: 40,
        slidesPerView: "auto",
        centeredSlides: true,
        autoResize: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        speed: 800,
        autoplay: {
            delay: 8000,
        },
        mousewheel: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    $('#myTab button').on('click', function (event) {
        event.preventDefault()
        $(this).tab('show')
    });
});
