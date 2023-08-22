class MainManager {
    constructor() {
        this._screenManager = undefined;
    }
    run() {
    }
    start() {
        //TODO: Replace with Loading of Config
    }
    createScreenManager(screenElement) {
        if (this._screenManager !== undefined) {
            throw new Error("ScreenManager already exists");
        }
        this._screenManager = new ScreenManager(screenElement);
    }
    get screenManager() {
        return this._screenManager;
    }
    static getMainManager() {
        if (this.mainMangerInstance == null) {
            this.mainMangerInstance = new MainManager();
        }
        return this.mainMangerInstance;
    }
    //TODO: Remove Later on
    static dummyCalender() {
        let dummyCalender = new Calender();
        let dummySubjectOne = new Subject("Mathe", 10, SubjectColor.BLUE);
        let dummySubjectTwo = new Subject("Deutsch", 10, SubjectColor.RED);
        let dummySubjectThree = new Subject("English", 10, SubjectColor.GREEN);
        let dummyLessonOne = new Lesson(true, 0, new Date(0, 0, 0, 10, 0, 0, 0), new Date(0, 0, 0, 11, 0, 0, 0), dummySubjectOne);
        let dummyLessonTwo = new Lesson(true, 0, new Date(0, 0, 0, 11, 30, 0, 0), new Date(0, 0, 0, 12, 0, 0, 0), dummySubjectTwo);
        let dummyLessonThree = new Lesson(true, 0, new Date(0, 0, 0, 12, 30, 0, 0), new Date(0, 0, 0, 13, 0, 0, 0), dummySubjectThree);
        dummyCalender.addLesson(dummyLessonOne);
        dummyCalender.addLesson(dummyLessonTwo);
        dummyCalender.addLesson(dummyLessonThree);
        return {
            calender: dummyCalender,
            subjects: [dummySubjectOne, dummySubjectTwo, dummySubjectThree],
            lessons: [dummyLessonOne, dummyLessonTwo, dummyLessonThree],
        };
    }
}
MainManager.mainMangerInstance = null;
//# sourceMappingURL=MainManager.js.map