class DateUtils {

    public static getWeekNumber(date:Date){
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
    public static getTimeDifferenceHours(dateOne: Date, dateTwo: Date):number{
            let newDateOne = new Date(0,0,0,dateOne.getHours(),dateOne.getMinutes(),dateOne.getSeconds(),dateOne.getMilliseconds());
            let newDateTwo = new Date(0,0,0,dateTwo.getHours(),dateTwo.getMinutes(),dateTwo.getSeconds(),dateTwo.getMilliseconds());
            return (newDateOne.getTime() - newDateTwo.getTime());
    }

}