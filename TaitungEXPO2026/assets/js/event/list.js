const eventDays =  ["2026-3-5", "2026-3-12", "2026-3-19", "2026-3-28", "2026-7-23", "2026-7-26", "2026-7-31", "2026-8-15"];
const calendar = new WeeklyCalendar('.calendarSwiper', {
    startLimit: new Date(2026, 2, 1),  // 2026年3月1日 (月份從0開始)
    endLimit: new Date(2026, 8, 30),    // 2026年9月30日
    eventDays: eventDays,
    onDatePick: (dateObj, dateStr) => {
        console.log('你選了物件:', dateObj);
        console.log('你選了格式化字串:', dateStr);

        // 這裡可以寫點擊後要觸發的 API 或行為

    }
});