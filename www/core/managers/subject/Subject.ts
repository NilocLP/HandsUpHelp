class Subject{

    private readonly _uuid:string = self.crypto.randomUUID();
    private _name:string;
    private _handsUpGoal:number;
    private _color:SubjectColor;
    private _subjectEntries:Map<string, SubjectEntry> = new Map<string, SubjectEntry>();

    constructor(name: string, handsUpGoal: number, color: SubjectColor) {
        this._name = name;
        this._handsUpGoal = handsUpGoal;
        this._color = color;
    }

    get uuid(): string {
        return this._uuid;
    }

    get name(): string {
        return this._name;
    }

    get handsUpGoal(): number {
        return this._handsUpGoal;
    }

    get color(): SubjectColor {
        return this._color;
    }

    get subjectEntries():Map<string, SubjectEntry> {
        return this._subjectEntries;
    }

    public updateSettings(name: string, handsUpGoal: number, color: SubjectColor):void{
        this._name = name;
        this._handsUpGoal = handsUpGoal;
        this._color = color;
    }

    public addSubjectEntry(weekday: number, handsUpCount: number, takenCount: number){
        let date = new Date(Date.now());
        let subjectEntry = new SubjectEntry(date, handsUpCount, takenCount);
        this._subjectEntries.set(subjectEntry.uuid, subjectEntry);
    }

}