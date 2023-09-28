class MainManager{

    private static mainMangerInstance: MainManager = null;

    private _mainCalender:Calender;
    private _subjects:Subject[] ;
    private _currentLesson:Lesson;
    private _nextLessonTimeout;

    private _screenManager:ScreenManager = null;
    private readonly _dbManager:DatabaseManager = null;
    private readonly _saveManager:SaveManager = null;
    private readonly _settingsManager:SettingsManager = null;


    private constructor() {
        this._dbManager = new DatabaseManager("handsUpHelperData");
        this._saveManager = new SaveManager(this._dbManager);
        this._settingsManager = new SettingsManager();
        this.loadUpData().then(() => {
            const loadUpEvent = new CustomEvent('mainManagerLoadedUp');
            document.dispatchEvent(loadUpEvent);
            this.runPhase()
        });

    }

    public runPhase() {
        console.log("-----");
        let time = this.timeUntilPhaseSwitch();
        console.log("time: " + time);
        if(time == null){
            let noLessonLeftEvent = new CustomEvent("mainManagerLessonNoLeft");
            window.dispatchEvent(noLessonLeftEvent);
            return;
        }
        //Check if Lesson should run but is not registered (Triggers for example on Start)
        if(this._currentLesson === undefined){
            let currentDate = new Date();
            let currentLesson = this._mainCalender.getCurrentLesson(currentDate);
            if(currentLesson){
                this.startLesson(currentLesson);
            }
        }

        if(time < 0) return;

        //Clear Lesson Timer to allow reset
        if(this._nextLessonTimeout) {
            clearTimeout(this._nextLessonTimeout);
        }

        this._nextLessonTimeout = setTimeout(this.switchPhase.bind(this), time);
    }

    private switchPhase(){
        let currentLesson = this._currentLesson;
        if(currentLesson){
            this.finishCurrentLesson().then(r => {
                this.runPhase();
            });
        }else{
            let currentDate = new Date();
            currentLesson = this._mainCalender.getCurrentLesson(currentDate);
            this.startLesson(currentLesson);
        }
    }

    private startLesson(lesson:Lesson){
        if(lesson.isRunning){
            return
        }

        this._currentLesson = lesson;
        lesson.startLesson();

        let lessonStartEvent = new CustomEvent("mainManagerLessonStart", {
            detail: {
                lesson: this._currentLesson,
            },
        });
        window.dispatchEvent(lessonStartEvent);
        this.runPhase();
    }

    private async finishCurrentLesson() {
        this._currentLesson.finishLesson();
        let lessonEndEvent = new CustomEvent("mainManagerLessonEnd");
        window.dispatchEvent(lessonEndEvent);
        let subjectEntry = new SubjectEntry(new Date(), this._currentLesson.handsUpCount, this._currentLesson.takenCount, this._currentLesson.subject.uuid)
        await this.saveManager.addSubjectEntry(subjectEntry.toJSON());
        this._currentLesson = null;
        await this.saveManager.updateCalender(this._mainCalender.toJSON());
    }

    private timeUntilPhaseSwitch():number{
        let currentDate = new Date();
        let currentLesson = this._mainCalender.getCurrentLesson(currentDate);
        let timeUntilSwitch: number;
        console.log("current lesson search")
        if(currentLesson){
            console.log(currentLesson)
            timeUntilSwitch = DateUtils.getTimeDifferenceHours(currentLesson.endTime, currentDate);
            if(timeUntilSwitch > 0) return timeUntilSwitch;
        }
        console.log("next lesson search")
        let nextLesson = this._mainCalender.getUpcomingLesson(currentDate);
        if(nextLesson){
            console.log(nextLesson);
            timeUntilSwitch = DateUtils.getTimeDifferenceHours(nextLesson.startTime, currentDate);
            return timeUntilSwitch;
        }
        return null;
    }


    public createScreenManager(screenElement: HTMLElement){
        if(this._screenManager !== null){
            throw new Error("ScreenManager already exists");
        }
        this._screenManager = new ScreenManager(screenElement);
    }


    get mainCalender() {
        return this._mainCalender;
    }

    set mainCalender(value) {
        this._mainCalender = value;
    }

    get subjects() {
        return this._subjects;
    }

    set subjects(value) {
        this._subjects = value;
    }

    get currentLesson() {
        return this._currentLesson;
    }

    get screenManager(){
        return this._screenManager;
    }

    get saveManager(): SaveManager {
        return this._saveManager;
    }

    get settingsManager(): SettingsManager {
        return this._settingsManager;
    }

    private async loadUpData() {
        //Load Subjects
        let subjects:any = await this.saveManager.getAllSubjects();
        let subjectObjects = []
        subjects.forEach((subject) => {
            let subjectObject = new Subject(subject.value.name, subject.value.handsUpGoal, subject.value.color, subject.value.uuid)
            subjectObjects.push(subjectObject);
        })
        this._subjects = subjectObjects;

        //Load Calender
        let calenders:any = await this.saveManager.getAllCalenders();
        let calender:Calender;
        let currentWeekNumber = DateUtils.getWeekNumber(new Date())
        if(calenders.length <= 0){
            calender = new Calender(currentWeekNumber);
            await this.saveManager.addCalender(calender.toJSON())
        }else{
            calender = new Calender(calenders[0].value.currentWeek, calenders[0].value.uuid);
            calenders[0].value.lessons.forEach((lessonData) => {
                let subject:Subject = this._subjects.find((subject) => {
                    return subject.uuid === lessonData.data.subjectUUID;
                })
                let lesson = new Lesson(lessonData.data.isDoubleLesson,
                    lessonData.data.weekday,
                    lessonData.data.startTime,
                    lessonData.data.endTime,subject,
                    lessonData.data.uuid,
                    lessonData.data.handsUpCount,
                    lessonData.data.takenCount,
                    lessonData.data.goalReached);
                calender.addLessonToSlot(lessonData.timeSlot, lesson);
            })

            if(calenders[0].value.currentWeek != currentWeekNumber){
                calender.updateCurrentWeek(currentWeekNumber);
                await this.saveManager.updateCalender(calender.toJSON())
            }
        }
        this._mainCalender = calender;
    };

    public static getMainManager(){
        if(this.mainMangerInstance == null){
            this.mainMangerInstance = new MainManager();
        }
        return this.mainMangerInstance;
    }



}