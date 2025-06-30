function calculateScore() {
    let totalScore = 0;
    let answeredQuestions = 0;

    // 檢查是否所有問題都已回答
    for (let i = 1; i <= 10; i++) {
        const selectedRadio = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedRadio) {
            totalScore += parseInt(selectedRadio.getAttribute('data-score'));
            answeredQuestions++;
        }
    }

    if (answeredQuestions < 10) {
        alert('請回答所有問題後再計算結果！');
        return;
    }

    // 顯示結果
    const resultDiv = document.getElementById('result');
    const totalScoreSpan = document.getElementById('totalScore');
    const resultTitle = document.getElementById('resultTitle');
    const resultDescription = document.getElementById('resultDescription');

    totalScoreSpan.textContent = totalScore;

    // 根據分數給出評估結果
    resultDiv.className = 'result';
    if (totalScore <= 13) {
        resultDiv.classList.add('low');
        resultTitle.textContent = '輕微壓力型';
        resultDescription.innerHTML = '<p>你的壓力還在可以接受的範圍，善於調適壓力的你，對高壓環境適應度很高！</p><p>建議可以先嘗試看看每週2次以上的運動緩解壓力，多曬曬太陽也能幫助睡眠。</p>';
    } else if (totalScore >= 14 && totalScore <= 26 ) {
        resultDiv.classList.add('medium');
        resultTitle.textContent = '中度壓力型';
        resultDescription.innerHTML = '<p>你成功將生活壓力調適在可控範圍內，是個勤奮的生活家！</p><p>但別忘了與家人、朋友聊聊，或多關注壓力管理、學習紓壓來調適壓力，不然長久累積下來，可能會常睡不好，導致睡眠債會越積越多。</p><p>想拒絕壓力型失眠，體驗深度熟睡，繼續往下看就對了！</p>';
    } else if (totalScore >= 27 && totalScore <= 37) {
        resultDiv.classList.add('high');
        resultTitle.textContent = '高度壓力型';
        resultDescription.innerHTML = '<p>生活的高壓讓你有點喘不過氣。你已經很努力了，卻還是感到很辛苦嗎？</p><p>其實你不孤單，現代快節奏的社會，許多人會藉由找尋合格的心理衛生專業人員來紓解內心壓力，或是補充好眠保健食品來對抗壓力型失眠。</p><p>畢竟睡得好才能補充明天所需的精神，勇敢為自己的健康做出嘗試吧！</p>';
    } else {
        resultDiv.classList.add('over');
        resultTitle.textContent = '過度壓力型';
        resultDescription.innerHTML = '<p>你一定很辛苦吧？</p><p>嚴重的壓力已經讓你提不起力氣面對未來，你可以尋求專業心理衛生人員、精神專科醫師的幫助。</p><p>除了透過醫師專用處方用藥、心理治療，也可以試試看添加天然草本類型的輔眠保健品，睡飽、吃好，趕快讓生活回歸健康軌道！</p>';
    }

    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}


$(function(){
    $(document).on('scroll', function () {
		var $nav = $(".l-header .sticky-wrapper");
		$nav.toggleClass("header-sticky", $(this).scrollTop() > (($nav.height())*2));
	});

	// $(".js-navOpen").on('click', function () {
	// 	$(".js-navigation").addClass("is-open");
	// 	$('body').addClass('openNav');
	// });

	// $(".js-navClose").on('click', function () {
	// 	$(".js-navigation").removeClass("is-open");
	// 	$('body').removeClass('openNav');
	// });

	new WOW().init();

    var headerH = $('.l-header').outerHeight(true);
	$(".js-anchor").on('click', function (e) {

		if (this.hash !== "") {
			e.preventDefault();

			var hash = this.hash;

			$('html, body').animate({
				scrollTop: ($(hash).offset().top) - (headerH + 50)
			}, 800);

			$(".js-navigation").removeClass("is-open");
			$('body').removeClass('openNav');
		}
	});
});