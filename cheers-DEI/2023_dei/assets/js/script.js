$(document).on('ready', function() { 
      $("#variable").slick({
        // dots: true,
        // speed: 300,
        // autoplay: false,
        // autoplaySpeed: 1000, 
        // infinite: true,
        slidesToShow: 1,

        // 中間模式使兩邊露出
        centerMode: true,
        centerPadding: '260px',

        // 指向箭頭
        prevArrow: '<div> <span class="material-icons" style="cursor:pointer; position: absolute; top: 40%; left: 10%; transform: translateX(-50%) translateY(-50%); z-index:50; font-size: 3rem;">chevron_left</span> </div>',
        nextArrow: '<div> <span class="material-icons" style="cursor:pointer; position: absolute; top: 40%; right: 10%; transform: translateX(-50%) translateY(-50%); z-index:50; font-size: 3rem;">chevron_right</span> </div>',

        responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
      });
      
    });