class SubjectEntry {

    private readonly _uuid:string;
    private readonly _date:Date;
    private _handsUpCount:number;
    private _takenCount:number;
    private _assignedSubject: Subject;

    constructor(date: Date, handsUpCount: number, takenCount: number, subject: Subject, uuid?:string) {
        if(uuid){
            this._uuid = uuid;
        }else {
            this._uuid = UUIDUtils.generateUUID();
        }
        this._date = date;
        this._handsUpCount = handsUpCount;
        this._takenCount = takenCount;
        this._assignedSubject = subject
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

    get assignedSubject(): Subject {
        return this._assignedSubject;
    }

    set assignedSubject(value: Subject) {
        this._assignedSubject = value;
    }

    public toJSON(){
        let json = {
            uuid: this._uuid,
            date: this._date,
            handsUpCount: this._handsUpCount,
            takenCount: this._takenCount,
            subjectId: this._assignedSubject
        }
        return json;
    }
}