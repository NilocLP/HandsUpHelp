class SubjectEntry {
    constructor(date, handsUpCount, takenCount) {
        this._uuid = self.crypto.randomUUID();
        this._date = date;
        this._handsUpCount = handsUpCount;
        this._takenCount = takenCount;
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
}
//# sourceMappingURL=SubjectEntry.js.map