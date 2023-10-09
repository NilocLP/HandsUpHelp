class Lesson {
    constructor(isDoubleLesson, weekday, startTime, endTime, subject, uuid, handsUpCount, takenCount, goalReached, messageId) {
        this._handsUpCount = 0;
        this._takenCount = 0;
        this._isDoubleLesson = isDoubleLesson;
        this._weekday = weekday;
        this._startTime = startTime;
        this._endTime = endTime;
        this._subject = subject;
        if (handsUpCount)
            this._handsUpCount = handsUpCount;
        if (takenCount)
            this._takenCount = takenCount;
        if (goalReached)
            this._goalReached = goalReached;
        if (uuid) {
            this._uuid = uuid;
        }
        else {
            this._uuid = UUIDUtils.generateUUID();
        }
        if (messageId) {
            this._notificationManager = new NotificationLessonManager(this, messageId);
            this._sameNotification = true;
        }
        else {
            this._notificationManager = new NotificationLessonManager(this);
            this._sameNotification = false;
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
    get notificationManager() {
        return this._notificationManager;
    }
    set handsUpCount(value) {
        this._handsUpCount = value;
    }
    set takenCount(value) {
        this._takenCount = value;
    }
    set isRunning(value) {
        this._isRunning = value;
    }
    set goalReached(value) {
        this._goalReached = value;
    }
    startLesson() {
        console.log(this._sameNotification);
        console.log(this._notificationManager.messageID);
        this._isRunning = true;
        const mainManager = MainManager.getMainManager();
        const settingsManager = mainManager.settingsManager;
        if (settingsManager.notificationCounter) {
            this._notificationManager.showNotification();
        }
    }
    finishLesson() {
        this._isRunning = false;
        this._notificationManager.removeNotification();
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
        if (!this.isRunning) {
            return;
        }
        this._takenCount++;
        this.notificationManager.updateNotification();
    }
    addHandsUp() {
        if (!this.isRunning) {
            return;
        }
        this._handsUpCount++;
        this.notificationManager.updateNotification();
        let goal = this.subject.handsUpGoal;
        if (this._handsUpCount == goal) {
            this._goalReached = true;
            let lessonGoalReachedEvent = new CustomEvent("lessonGoal");
            window.dispatchEvent(lessonGoalReachedEvent);
        }
    }
    resetGoalReached() {
        this._goalReached = false;
        this._handsUpCount = 0;
        this._takenCount = 0;
    }
    toJSON() {
        let json = {
            uuid: this._uuid,
            isDoubleLesson: this._isDoubleLesson,
            weekday: this._weekday,
            startTime: this._startTime,
            endTime: this._endTime,
            handsUpCount: this.handsUpCount,
            takenCount: this.takenCount,
            isRunning: this.isRunning,
            goalReached: this.goalReached,
            subjectUUID: this._subject.uuid,
            notificationId: this._notificationManager.messageID,
        };
        return json;
    }
}
//# sourceMappingURL=Lesson.js.map