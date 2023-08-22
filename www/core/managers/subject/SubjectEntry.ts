class SubjectEntry {

    private readonly _uuid:string  = self.crypto.randomUUID();
    private readonly _date:Date;
    private _handsUpCount:number;
    private _takenCount:number;

    constructor(date: Date, handsUpCount: number, takenCount: number) {
        this._date = date;
        this._handsUpCount = handsUpCount;
        this._takenCount = takenCount;
    }

    get uuid(): string {
        return this._uuid;
    }

    get date(): Date {
        return this._date;
    }

    get handsUpCount(): number {
        return this._handsUpCount;
    }

    set handsUpCount(value: number) {
        this._handsUpCount = value;
    }

    get takenCount(): number {
        return this._takenCount;
    }

    set takenCount(value: number) {
        this._takenCount = value;
    }

}