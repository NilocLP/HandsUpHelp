// @ts-ignore
function init() {
    window.addEventListener("mainManagerLessonNoLeft", handleNoLessonLeft);
    window.addEventListener("mainManagerLessonStart", (e) => handleLessonStart(e.detail.lesson));
    window.addEventListener("mainManagerLessonEnd", handleLessonEnd);
    window.addEventListener("lessonGoal", handleLessonGoalReached);
    let calender = document.getElementById("calender");
    let mainManager = MainManager.getMainManager();
    calender.assignCalender(mainManager.mainCalender);
    if (mainManager.currentLesson) {
        this.handleLessonStart(mainManager.currentLesson);
        return;
    }
    if (mainManager.timeUntilPhaseSwitch() == null) {
        this.handleNoLessonLeft();
        return;
    }
}
function handleNoLessonLeft() {
    document.getElementById("currentLessonSpan").innerText = "No lesson left for today";
    document.getElementById("quickActions").classList.add("hideActions");
}
function handleLessonStart(lesson) {
    let calender = document.getElementById("calender");
    calender.renderTimeSlots();
    document.getElementById("currentLessonSpan").innerText = `Current Lesson: ${lesson.subject.name}`;
    document.getElementById("quickActions").classList.remove("hideActions");
    document.getElementById("handsUpCount").innerText = lesson.handsUpCount;
    document.getElementById("takenCount").innerText = lesson.takenCount;
    const handsUp = () => {
        lesson.addHandsUp();
        document.getElementById("handsUpCount").innerText = lesson.handsUpCount;
        if (!lesson.isRunning) {
            document.getElementById("handsUpCount").removeEventListener("click", handsUp);
        }
    };
    const taken = () => {
        lesson.addTaken();
        handsUp();
        document.getElementById("takenCount").innerText = lesson.takenCount;
        if (!lesson.isRunning) {
            document.getElementById("takenButton").removeEventListener("click", taken);
        }
    };
    document.getElementById("handsUpButton").addEventListener("click", handsUp);
    document.getElementById("takenButton").addEventListener("click", taken);
}
function handleLessonEnd() {
    document.getElementById("quickActions").classList.add("hideActions");
    document.getElementById("currentLessonSpan").innerText = "No lesson running";
    let calender = document.getElementById("calender");
    calender.renderTimeSlots();
}
function handleLessonGoalReached() {
    let calender = document.getElementById("calender");
    calender.renderTimeSlots();
}
//# sourceMappingURL=calender.js.map