// @ts-ignore
function init() {
    let calender:CalenderVisual = document.getElementById("calender") as CalenderVisual;
    let mainManager = MainManager.getMainManager();
    calender.assignCalender(mainManager.mainCalender);

}




