class Calender{

    private _currentWeek: Date;
    private _lessons: Map<string,Lesson> = new Map<string, Lesson>();


    constructor() {

    }

    public addLesson(lesson: Lesson){
        this._lessons.set(lesson.uuid,lesson);
    }

    public removeLessonByUUID(uuid:string){
        this._lessons.delete(uuid);
    }

    public removeLessonByObject(lesson: Lesson):boolean{
        for (let currentLesson of this._lessons.values()) {
            if(lesson === currentLesson){
                this._lessons.delete(lesson.uuid);
                return true;
            }
        }
        return false;

    }

    public getLessonByUUID(uuid:string){
        this._lessons.get(uuid);
    }

    private resetGoals(){
        for (let lesson of this._lessons.values()) {
            lesson.resetGoalReached();
        }
    }

}