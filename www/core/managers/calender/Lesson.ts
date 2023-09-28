class Lesson{

    private _uuid:string;
    private _isDoubleLesson: boolean;
    private _weekday: number;
    private _startTime: Date;
    private _endTime: Date;
    private _handsUpCount: number = 0;
    private _takenCount: number = 0;
    private _isRunning: boolean;
    private _goalReached: boolean;
    private _subject: Subject;



    constructor(isDoubleLesson: boolean, weekday: number, startTime: Date, endTime: Date, subject: Subject, uuid?:string, handsUpCount?: number, takenCount?: number, goalReached?:boolean) {
        this._isDoubleLesson = isDoubleLesson;
        this._weekday = weekday;
        this._startTime = startTime;
        this._endTime = endTime;
        this._subject = subject;
        if(handsUpCount) this._handsUpCount = handsUpCount;
        if(takenCount) this._takenCount = takenCount;
        if(goalReached) this._goalReached = goalReached;
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


    set handsUpCount(value: number) {
        this._handsUpCount = value;
    }

    set takenCount(value: number) {
        this._takenCount = value;
    }

    set isRunning(value: boolean) {
        this._isRunning = value;
    }

    set goalReached(value: boolean) {
        this._goalReached = value;
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
        console.log(`Lesson: ${this._subject.name} is in timeframe: ${(targetMinutes >= startMinutes) && (targetMinutes <= endMinutes)}`)
        return(targetMinutes >= startMinutes) && (targetMinutes <= endMinutes)

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
        if(!this.isRunning){
            return;
        }
        this._takenCount++;
    }

    public addHandsUp(){
        if(!this.isRunning){
            return;
        }
        this._handsUpCount++;
        let goal = this.subject.handsUpGoal;
        if(this._handsUpCount == goal){
            this._goalReached = true;
            let lessonGoalReachedEvent = new CustomEvent("lessonGoal");
            window.dispatchEvent(lessonGoalReachedEvent);
        }

    }

    public resetGoalReached(){
        this._goalReached = false;
        this._handsUpCount = 0;
        this._takenCount = 0;
    }

    public toJSON(){
        let json = {
            uuid: this._uuid,
            isDoubleLesson: this._isDoubleLesson,
            weekday: this._weekday,
            startTime: this._startTime,
            endTime: this._endTime,
            handsUpCount: this.handsUpCount,
            takenCount: this.takenCount,
            isRunning: this.isRunning,
            goalReached: this.goalReached,
            subjectUUID: this._subject.uuid
        }

        return json;
    }
}