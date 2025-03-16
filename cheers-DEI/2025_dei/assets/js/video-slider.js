$('.videoSlider__item').on({
    click:function(){
        var ytCode = $(this).attr('data-video');
        $(this).parents('.videoSlider').find('[data-id="videoPlayer"]').attr('src','https://www.youtube.com/embed/'+ytCode);
        $(this).addClass('active').siblings('.videoSlider__item').removeClass('active');
    }
})