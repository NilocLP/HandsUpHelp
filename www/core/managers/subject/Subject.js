class Subject {
    constructor(name, handsUpGoal, color) {
        this._uuid = self.crypto.randomUUID();
        this._subjectEntries = new Map();
        this._name = name;
        this._handsUpGoal = handsUpGoal;
        this._color = color;
    }
    get uuid() {
        return this._uuid;
    }
    get name() {
        return this._name;
    }
    get handsUpGoal() {
        return this._handsUpGoal;
    }
    get color() {
        return this._color;
    }
    get subjectEntries() {
        return this._subjectEntries;
    }
    updateSettings(name, handsUpGoal, color) {
        this._name = name;
        this._handsUpGoal = handsUpGoal;
        this._color = color;
    }
    addSubjectEntry(weekday, handsUpCount, takenCount) {
        let date = new Date(Date.now());
        let subjectEntry = new SubjectEntry(date, handsUpCount, takenCount);
        this._subjectEntries.set(subjectEntry.uuid, subjectEntry);
    }
}
//# sourceMappingURL=Subject.js.map