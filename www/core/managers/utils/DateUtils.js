class DateUtils {
    static getWeekNumber(date) {
        let startOfYear = new Date(date.getFullYear(), 0, 1);
        let dayInMilis = 86400000;
        let daysOnlyDate = (date.getTime() - startOfYear.getTime());
        let daysSinceYearStart = Math.floor(daysOnlyDate / dayInMilis);
        return Math.ceil(daysSinceYearStart / 7);
    }
}
//# sourceMappingURL=DateUtils.js.map