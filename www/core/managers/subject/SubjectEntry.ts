class SubjectEntry {

    private readonly _uuid:string;
    private readonly _date:Date;
    private _handsUpCount:number;
    private _takenCount:number;
    private _assignedSubjectUUID: string;

    constructor(date: Date, handsUpCount: number, takenCount: number, subjectUUID: string, uuid?:string) {
        if(uuid){
            this._uuid = uuid;
        }else {
            this._uuid = UUIDUtils.generateUUID();
        }
        this._date = date;
        this._handsUpCount = handsUpCount;
        this._takenCount = takenCount;
        this._assignedSubjectUUID = subjectUUID
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

    get assignedSubject(): string {
        return this._assignedSubjectUUID;
    }

    set assignedSubject(value: string) {
        this._assignedSubjectUUID = value;
    }

    public toJSON(){
        let json = {
            uuid: this._uuid,
            date: this._date,
            handsUpCount: this._handsUpCount,
            takenCount: this._takenCount,
            subjectId: this._assignedSubjectUUID
        }
        return json;
    }
}