class Lesson{

    private _uuid:string;
    private _isDoubleLesson: boolean;
    private _weekday: number;
    private _startTime: Date;
    private _endTime: Date;
    private _handsUpCount: number;
    private _takenCount: number ;
    private _isRunning: boolean;
    private _goalReached: boolean;
    private _subject: Subject;



    constructor(isDoubleLesson: boolean, weekday: number, startTime: Date, endTime: Date, subject: Subject, uuid?:string) {
        this._isDoubleLesson = isDoubleLesson;
        this._weekday = weekday;
        this._startTime = startTime;
        this._endTime = endTime;
        this._subject = subject;
        if(uuid){
            this._uuid = uuid;
        }else{
            this._uuid = UUIDUtils.generateUUID();
        }

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

    public startLesson(){
        this._isRunning = true;
    }

    public finishLesson(){
        this._isRunning = false;
    }

    public lessonInTimeframe(date:Date){
        //In Same Day
        if(!this.lessonInSameDay(date)){
            return false;
        }

        // Extract the hours and minutes from the Dates
        const targetHours = date.getHours();
        const targetMinutes = date.getMinutes() + targetHours * 60;

        const startHours = this._startTime.getHours();
        const startMinutes = this._startTime.getMinutes() + startHours * 60;

        const endHours = this._endTime.getHours();
        const endMinutes = this._endTime.getMinutes() + endHours * 60;

        // Compare the times
        return (targetMinutes >= startMinutes) && (targetMinutes <= endMinutes)

    }

    public timeframeAfterLesson(date:Date){
        // Extract the hours and minutes from the Dates
        const targetHours = date.getHours();
        const targetMinutes = date.getMinutes() + targetHours * 60;

        const endHours = this._endTime.getHours();
        const endMinutes = this._endTime.getMinutes() + endHours * 60;

        // Compare the times
        return (targetMinutes > endMinutes)
    }

    public timeframeBeforeLesson(date:Date){
        // Extract the hours and minutes from the Dates
        const targetHours = date.getHours();
        const targetMinutes = date.getMinutes() + targetHours * 60;

        const startHours = this._startTime.getHours();
        const startMinutes = this._startTime.getMinutes() + startHours * 60;

        return targetMinutes < startMinutes;
    }

    public lessonInSameDay(date:Date){
        let weekdayCurrent = date.getDay() - 1;
        return weekdayCurrent == this._weekday;
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

    public toJSON(){
        let json = {
            uuid: this._uuid,
            isDoubleLesson: this._isDoubleLesson,
            weekday: this._weekday,
            startTime: this._startTime,
            endTime: this._endTime,
            subjectUUID: this._subject.uuid
        }

        return json;
    }
}