class Subject {
    constructor(name, handsUpGoal, color, uuid) {
        if (uuid) {
            this._uuid = uuid;
        }
        else {
            this._uuid = UUIDUtils.generateUUID();
        }
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
    updateSettings(name, handsUpGoal, color) {
        this._name = name;
        this._handsUpGoal = handsUpGoal;
        this._color = color;
    }
    toJSON() {
        let json = {
            uuid: this._uuid,
            name: this._name,
            handsUpGoal: this._handsUpGoal,
            color: this._color
        };
        return json;
    }
}
//# sourceMappingURL=Subject.js.map