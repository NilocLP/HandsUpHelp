class DateUtils {
    static getWeekNumber(date) {
        let startOfYear = new Date(date.getFullYear(), 0, 1);
        let dayInMilis = 86400000;
        let daysOnlyDate = (date.getTime() - startOfYear.getTime());
        let daysSinceYearStart = Math.floor(daysOnlyDate / dayInMilis);
        return Math.ceil(daysSinceYearStart / 7);
    }
    /**
     * Get the difference between two dates ignoring the current day, month and year
     * @param dateOne - The first timestamp
     * @param dateTwo - The second timestamp
     * @return number - timestamp as number
     */
    static getTimeDifferenceHours(dateOne, dateTwo) {
        let newDateOne = new Date(0, 0, 0, dateOne.getHours(), dateOne.getMinutes(), dateOne.getSeconds(), dateOne.getMilliseconds());
        let newDateTwo = new Date(0, 0, 0, dateTwo.getHours(), dateTwo.getMinutes(), dateTwo.getSeconds(), dateTwo.getMilliseconds());
        return (newDateOne.getTime() - newDateTwo.getTime());
    }
    /**
     * Get the difference between the current date and the start of the next day
     * @return number - timestamp as number
     */
    static timeUntilNextDay() {
        let currentDate = new Date();
        let nextDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        return (nextDay.getTime() - currentDate.getTime());
    }
}
//# sourceMappingURL=DateUtils.js.map