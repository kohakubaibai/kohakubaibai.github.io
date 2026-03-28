$(function () {
	const eventDays = ["2026-3-5", "2026-3-12", "2026-3-19", "2026-3-28", "2026-7-23", "2026-7-26", "2026-7-31", "2026-8-15"];

	const startLimit = new Date(2026, 2, 1);
	const endLimit = new Date(2026, 8, 30);

	function getMonday(d) {
		d = new Date(d);
		const day = d.getDay();
		const diff = d.getDate() - day + (day === 0 ? -6 : 1);
		return new Date(d.setDate(diff));
	}

	const firstMonday = getMonday(startLimit);

	function initSwiperSlides() {
		let html = "";
		let currentIterateDate = new Date(firstMonday);
		const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

		while (currentIterateDate <= endLimit) {
			html += '<div class="swiper-slide"><ul class="weekList">';
			for (let i = 0; i < 7; i++) {
				let d = new Date(currentIterateDate);
				d.setDate(currentIterateDate.getDate() + i);

				let w = d.getDay();
        		let weekName = weekDays[w];
				let m = d.getMonth() + 1;
				let day = d.getDate();
				let fullStr = `${d.getFullYear()}-${m}-${day}`;

				let isDisabled = d < startLimit || d > endLimit ? "disabled" : "";
				let hasEventClass = eventDays.includes(fullStr) ? "is-active" : "";

				html += `
					<li class="weekList__item ${hasEventClass}">
						<button class="dateBtn ${hasEventClass}" ${isDisabled} data-date="${fullStr}">
							<div class="dateBtn__text dateBtn__text--weekday f-p">${weekName}</div>
							<div class="dateBtn__text dateBtn__text--day">${m}/${day}</div>
						</button>
					</li>`;
			}
			html += "</ul></div>";
			currentIterateDate.setDate(currentIterateDate.getDate() + 7);
		}
		$(".js-calendarSwiper .swiper-wrapper").html(html);
	}

	initSwiperSlides();

	const calendarSwiper = new Swiper(".js-calendarSwiper", {
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	const $datepicker = $('[data-toggle="datepicker"]');
	$datepicker
		.datepicker({
			format: "mm-dd-yyyy",
			startDate: startLimit,
			endDate: endLimit,
			autoHide: true,
		})
		.on("pick.datepicker", function (e) {
			syncToSwiper(e.date);
		});

	function syncToSwiper(targetDate) {
		const timeDiff = targetDate.getTime() - firstMonday.getTime();
		const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
		const weekIndex = Math.floor(daysDiff / 7);

		calendarSwiper.slideTo(weekIndex, 500);

		// 高亮選中按鈕
		const dateStr = `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`;
		$(".calendarItem button").removeClass("active");
		$(`.calendarItem button[data-date="${dateStr}"]`).addClass("active");
	}

	$(document).on("click", ".calendarItem button:not(:disabled)", function () {
		const dateStr = $(this).data("date");
		const selectedDate = new Date(dateStr);

		$datepicker.datepicker("setDate", selectedDate);
		$(".calendarItem button").removeClass("active");
		$(this).addClass("active");
	});

	syncToSwiper(new Date() < startLimit ? startLimit : new Date());
});
