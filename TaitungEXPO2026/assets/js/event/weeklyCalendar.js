
class WeeklyCalendar {
    constructor(selector, options = {}) {
        this.selector = selector;
        this.element = document.querySelector(this.selector);
        if (!this.element) return;

        this.options = {
            startLimit: new Date(2026, 2, 1),
            endLimit: new Date(2026, 8, 30),
            eventDays: [],
            onDatePick: null,
            ...options
        };

        this.swiper = null;
        this.datepicker = null;
        this.currentFocusDate = new Date();
        this._initLanguages();
        this.init();
    }

    _initLanguages() {
        const isEn = document.body.classList.contains('lang--en');

        if (isEn) {
            this.weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        } else {
            this.weekDays = ["日", "一", "二", "三", "四", "五", "六"];
        }
    }

    init() {
        this._initSwiperSlides();
        this._initSwiper();
        this._initDatepicker();
        this._setupEventListeners();

        const today = new Date();
        const firstMonday = this._getMonday(this.options.startLimit);
        const timeDiff = today.getTime() - firstMonday.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        const weekIndex = Math.floor(daysDiff / 7);

        if (this.swiper) {
            this.swiper.slideTo(weekIndex, 0);
        }

        this.element.querySelectorAll('.dateBtn').forEach(el => el.classList.remove('is-selected'));
        $('[data-toggle="datepicker"]').datepicker('setDate', null);
    }

    _getMonday(d) {
        d = new Date(d);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    }

    _initSwiperSlides() {
        const wrapper = this.element.querySelector('.swiper-wrapper');
        const firstMonday = this._getMonday(this.options.startLimit);
        let currentIterateDate = new Date(firstMonday);
        let html = '';

        while (currentIterateDate <= this.options.endLimit) {
            html += '<div class="swiper-slide"><ul class="weekList">';
            for (let i = 0; i < 7; i++) {
                let d = new Date(currentIterateDate);
                d.setDate(currentIterateDate.getDate() + i);

                let w = d.getDay();
                let m = d.getMonth() + 1;
                let day = d.getDate();
                let fullStr = `${d.getFullYear()}-${m}-${day}`;

                let isDisabled = (d < this.options.startLimit || d > this.options.endLimit) ? "disabled" : "";
                let hasEventClass = this.options.eventDays.includes(fullStr) ? "is-active" : "";

                html += `
                    <li class="weekList__item ${hasEventClass}">
                        <button class="dateBtn" ${isDisabled} data-date="${fullStr}">
                            <span class="dateBtn__text dateBtn__text--weekday f-h5">${this.weekDays[w]}</span>
                            <div class="dateBtn__text dateBtn__text--day">${m}/${day}</div>
                        </button>
                    </li>`;
            }
            html += "</ul></div>";
            currentIterateDate.setDate(currentIterateDate.getDate() + 7);
        }
        wrapper.innerHTML = html;
    }

    _initSwiper() {
        this.swiper = new Swiper(this.element.querySelector('.swiper'), {
            allowTouchMove: false,
            navigation: {
                nextEl: this.element.querySelector('.swiper-button-next'),
                prevEl: this.element.querySelector('.swiper-button-prev'),
            }
        });
    }

    _initDatepicker() {
        const input = document.querySelector('[data-toggle="datepicker"]');
        if (!input) return;

        this.datepicker = $(input).datepicker({
            format: 'mm-dd-yyyy',
            startDate: this.options.startLimit,
            endDate: this.options.endLimit,
            autoHide: true
        }).on('pick.datepicker', (e) => {
            e.preventDefault();
            $(input).datepicker('hide');

            this._handleDateSelect(e.date);
        });
    }

    _setupEventListeners() {
        $(this.element).off('click', '.dateBtn:not(:disabled)').on('click', '.dateBtn:not(:disabled)', (e) => {
            e.stopPropagation();

            const btn = e.currentTarget;
            const dateStr = btn.getAttribute('data-date');

            const parts = dateStr.split('-');
            const selectedDate = new Date(parts[0], parts[1] - 1, parts[2]);

            const $input = $('[data-toggle="datepicker"]');
            $input.datepicker('setDate', selectedDate);

            this._handleDateSelect(selectedDate);
        });
    }

    syncToSwiper(targetDate) {
        const firstMonday = this._getMonday(this.options.startLimit);
        const timeDiff = targetDate.getTime() - firstMonday.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        const weekIndex = Math.floor(daysDiff / 7);

        if (this.swiper) this.swiper.slideTo(weekIndex, 500);

        const dateStr = `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`;
        this.element.querySelectorAll('.dateBtn').forEach(el => el.classList.remove('is-selected'));
        const activeBtn = this.element.querySelector(`.dateBtn[data-date="${dateStr}"]`);
        if (activeBtn) activeBtn.classList.add('is-selected');
    }

    _handleDateSelect(date) {
        const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const activeBtn = this.element.querySelector(`.dateBtn[data-date="${dateStr}"]`);

        if (activeBtn && activeBtn.classList.contains('is-selected')) return;

        this.syncToSwiper(date);

        if (typeof this.options.onDatePick === 'function') {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${y}-${m}-${d}`;

            this.options.onDatePick(date, formattedDate);
        }
    }
}