class Lesson {
    constructor(isDoubleLesson, weekday, startTime, endTime, subject) {
        this._uuid = self.crypto.randomUUID();
        this._isDoubleLesson = isDoubleLesson;
        this._weekday = weekday;
        this._startTime = startTime;
        this._endTime = endTime;
        this._subject = subject;
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
        this._subject.addSubjectEntry(this._weekday, this._handsUpCount, this._takenCount);
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
}
//# sourceMappingURL=Lesson.js.map