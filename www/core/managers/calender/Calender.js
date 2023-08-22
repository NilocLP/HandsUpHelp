class Calender {
    constructor() {
        this._lessons = new Map();
    }
    addLesson(lesson) {
        this._lessons.set(lesson.uuid, lesson);
    }
    removeLessonByUUID(uuid) {
        this._lessons.delete(uuid);
    }
    removeLessonByObject(lesson) {
        for (let currentLesson of this._lessons.values()) {
            if (lesson === currentLesson) {
                this._lessons.delete(lesson.uuid);
                return true;
            }
        }
        return false;
    }
    getLessonByUUID(uuid) {
        this._lessons.get(uuid);
    }
    resetGoals() {
        for (let lesson of this._lessons.values()) {
            lesson.resetGoalReached();
        }
    }
}
//# sourceMappingURL=Calender.js.map