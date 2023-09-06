class SubjectEntry {
    constructor(date, handsUpCount, takenCount, subject, uuid) {
        if (uuid) {
            this._uuid = uuid;
        }
        else {
            this._uuid = UUIDUtils.generateUUID();
        }
        this._date = date;
        this._handsUpCount = handsUpCount;
        this._takenCount = takenCount;
        this._assignedSubject = subject;
    }
    get uuid() {
        return this._uuid;
    }
    get date() {
        return this._date;
    }
    get handsUpCount() {
        return this._handsUpCount;
    }
    set handsUpCount(value) {
        this._handsUpCount = value;
    }
    get takenCount() {
        return this._takenCount;
    }
    set takenCount(value) {
        this._takenCount = value;
    }
    get assignedSubject() {
        return this._assignedSubject;
    }
    set assignedSubject(value) {
        this._assignedSubject = value;
    }
    toJSON() {
        let json = {
            uuid: this._uuid,
            date: this._date,
            handsUpCount: this._handsUpCount,
            takenCount: this._takenCount,
            subjectId: this._assignedSubject
        };
        return json;
    }
}
//# sourceMappingURL=SubjectEntry.js.map