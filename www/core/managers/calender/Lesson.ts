class Lesson{

    private readonly _uuid:string = self.crypto.randomUUID();
    private _isDoubleLesson: boolean;
    private _weekday: number;
    private _startTime: Date;
    private _endTime: Date;
    private _handsUpCount: number;
    private _takenCount: number ;
    private _isRunning: boolean;
    private _goalReached: boolean;
    private _subject: Subject;


    constructor(isDoubleLesson: boolean, weekday: number, startTime: Date, endTime: Date, subject: Subject) {
        this._isDoubleLesson = isDoubleLesson;
        this._weekday = weekday;
        this._startTime = startTime;
        this._endTime = endTime;
        this._subject = subject;
    }

    get uuid(): string {
        return this._uuid;
    }

    get isDoubleLesson(): boolean {
        return this._isDoubleLesson;
    }

    get weekday(): number {
        return this._weekday;
    }

    get startTime(): Date {
        return this._startTime;
    }

    get endTime(): Date {
        return this._endTime;
    }

    get handsUpCount(): number {
        return this._handsUpCount;
    }

    get takenCount(): number {
        return this._takenCount;
    }

    get isRunning(): boolean {
        return this._isRunning;
    }

    get goalReached(): boolean {
        return this._goalReached;
    }

    get subject(): Subject {
        return this._subject;
    }

    protected startLesson(){
        this._isRunning = true;
    }

    protected finishLesson(){
        this._isRunning = false;

        this._subject.addSubjectEntry(this._weekday,this._handsUpCount,this._takenCount);
    }

    public addTaken(){
        this._takenCount++;
    }

    public addHandsUp(){
        this._handsUpCount++;
        let goal = this.subject.handsUpGoal;
        if(this._handsUpCount >= goal){
            this._goalReached = true;
        }

    }

    public resetGoalReached(){
        this._goalReached = false;
    }
}