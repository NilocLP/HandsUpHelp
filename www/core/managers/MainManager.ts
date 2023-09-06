class MainManager{

    private static mainMangerInstance: MainManager = null;

    private _mainCalender:Calender;
    private _subjects:Subject[] ;
    private _currentSubjectEntry:SubjectEntry;

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
            this.run()
        });

    }

    private run() {

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

    get currentSubjectEntry() {
        return this._currentSubjectEntry;
    }

    set currentSubjectEntry(value) {
        this._currentSubjectEntry = value;
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
                let lesson = new Lesson(lessonData.data.isDoubleLesson,lessonData.data.weekday,lessonData.data.startTime,lessonData.data.endTime,subject,lessonData.data.uuid);
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