class Lesson {
    constructor(isDoubleLesson, weekday, startTime, endTime, subject, uuid) {
        this._isDoubleLesson = isDoubleLesson;
        this._weekday = weekday;
        this._startTime = startTime;
        this._endTime = endTime;
        this._subject = subject;
        if (uuid) {
            this._uuid = uuid;
        }
        else {
            this._uuid = UUIDUtils.generateUUID();
        }
    }
    get uuid() {
        return this._uuid;
    }
    get isDoubleLesson() {
        return this._isDoubleLesson;
    }
    get weekday() {
        return this._weekday;
    }
    get startTime() {
        return this._startTime;
    }
    get endTime() {
        return this._endTime;
    }
    get handsUpCount() {
        return this._handsUpCount;
    }
    get takenCount() {
        return this._takenCount;
    }
    get isRunning() {
        return this._isRunning;
    }
    get goalReached() {
        return this._goalReached;
    }
    get subject() {
        return this._subject;
    }
    startLesson() {
        this._isRunning = true;
    }
    finishLesson() {
        this._isRunning = false;
    }
    lessonInTimeframe(date) {
        //In Same Day
        if (!this.lessonInSameDay(date)) {
            return false;
        }
        // Extract the hours and minutes from the Dates
        const targetHours = date.getHours();
        const targetMinutes = date.getMinutes() + targetHours * 60;
        const startHours = this._startTime.getHours();
        const startMinutes = this._startTime.getMinutes() + startHours * 60;
        const endHours = this._endTime.getHours();
        const endMinutes = this._endTime.getMinutes() + endHours * 60;
        // Compare the times
        return (targetMinutes >= startMinutes) && (targetMinutes <= endMinutes);
    }
    timeframeAfterLesson(date) {
        // Extract the hours and minutes from the Dates
        const targetHours = date.getHours();
        const targetMinutes = date.getMinutes() + targetHours * 60;
        const endHours = this._endTime.getHours();
        const endMinutes = this._endTime.getMinutes() + endHours * 60;
        // Compare the times
        return (targetMinutes > endMinutes);
    }
    timeframeBeforeLesson(date) {
        // Extract the hours and minutes from the Dates
        const targetHours = date.getHours();
        const targetMinutes = date.getMinutes() + targetHours * 60;
        const startHours = this._startTime.getHours();
        const startMinutes = this._startTime.getMinutes() + startHours * 60;
        return targetMinutes < startMinutes;
    }
    lessonInSameDay(date) {
        let weekdayCurrent = date.getDay() - 1;
        return weekdayCurrent == this._weekday;
    }
    addTaken() {
        this._takenCount++;
    }
    addHandsUp() {
        this._handsUpCount++;
        let goal = this.subject.handsUpGoal;
        if (this._handsUpCount >= goal) {
            this._goalReached = true;
        }
    }
    resetGoalReached() {
        this._goalReached = false;
    }
    toJSON() {
        let json = {
            uuid: this._uuid,
            isDoubleLesson: this._isDoubleLesson,
            weekday: this._weekday,
            startTime: this._startTime,
            endTime: this._endTime,
            subjectUUID: this._subject.uuid
        };
        return json;
    }
}
//# sourceMappingURL=Lesson.js.map