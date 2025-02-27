var host = window.location.hostname;
var url = 'https://' + host + '/event/2019fwf/check';
var redirect_url = 'https://' + host + '/event/fwf/vip-list.html';
var token_url = 'https://' + host + '/trending-taiwan/get/token';
var token = '';

var Submit = function () {
    var email = $('#InputText').val();
    var pwd = $('#InputPassword').val();
    if (email != 'fwf2020' || pwd != 'fwfvip2020') {
        alert('請輸入正確的帳號或密碼aa');
        return;
    } else {
        $.cookie('info', '2020fwf', {expires : 1});
        window.location.href = redirect_url;
        window.event.returnValue = false;
    }

    return false;
};
