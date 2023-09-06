class Calender {
    constructor(currentWeek, uuid) {
        this._calenderSlots = new Map();
        this._currentWeek = currentWeek;
        if (uuid) {
            this._uuid = uuid;
        }
        else {
            this._uuid = UUIDUtils.generateUUID();
        }
    }
    addLessonToSlot(timeSlot, lesson) {
        //Check if TimeSlot is free and time is valid
        let slotsFree = this.checkLessonSlotsFree(timeSlot, lesson);
        let timeEntered = this.checkTimeEntered(lesson);
        let timeValid = this.checkTimespanValid(lesson);
        if (!slotsFree) {
            return 1;
        }
        if (!timeEntered) {
            return 2;
        }
        if (!timeValid) {
            return 3;
        }
        this._calenderSlots.set(timeSlot, lesson);
        if (lesson.isDoubleLesson) {
            this._calenderSlots.set(timeSlot + 1, lesson);
        }
        return 0;
    }
    checkTimeEntered(lesson) {
        let startNumber = lesson.startTime.getTime();
        let endNumber = lesson.startTime.getTime();
        return !(isNaN(startNumber) || isNaN(endNumber));
    }
    checkTimespanValid(lesson) {
        let timeInvalid = lesson.startTime.getTime() >= lesson.endTime.getTime();
        return !timeInvalid;
    }
    checkLessonSlotsFree(timeSlot, lesson) {
        if (this._calenderSlots.get(timeSlot)) {
            return false;
        }
        if (timeSlot >= 50) {
            return false;
        }
        if (lesson.isDoubleLesson) {
            if (this._calenderSlots.get(timeSlot + 1)) {
                return false;
            }
            if (timeSlot + 1 >= 50) {
                return false;
            }
            if (this.isDoubleTimeSlotNotInSameDay(timeSlot)) {
                return false;
            }
        }
        return true;
    }
    isDoubleTimeSlotNotInSameDay(timeSlot) {
        let timeSlotString = timeSlot.toString();
        return timeSlotString.charAt(timeSlotString.length - 1) === '9';
    }
    removeLessonFromSlot(timeSlot) {
        let lesson = this._calenderSlots.get(timeSlot);
        if (!lesson) {
            return;
        }
        if (lesson.isDoubleLesson) {
            this._calenderSlots.delete(timeSlot + 1);
        }
        this._calenderSlots.delete(timeSlot);
    }
    getLessonFromSlot(timeSlot) {
        return this._calenderSlots.get(timeSlot);
    }
    getCurrentLesson(date) {
        for (const [, lesson] of this._calenderSlots) {
            if (!lesson.lessonInTimeframe(date)) {
                continue;
            }
            return lesson;
        }
        return null;
    }
    /*
        TODO: aktuelle Lessons und kommende können ermittelt werden. Jetzt muss das System implementiert werden im Main Manager, was den Zyklus regelt und die Einträge
         erstellt.
     */
    getUpcomingLesson(date) {
        for (const [, lesson] of this._calenderSlots) {
            if (!lesson.lessonInSameDay(date)) {
                continue;
            }
            if (lesson.timeframeAfterLesson(date)) {
                continue;
            }
            if (lesson.timeframeBeforeLesson(date)) {
                return lesson;
            }
        }
        return null;
    }
    updateCurrentWeek(newCurrentWeek) {
        this._currentWeek = newCurrentWeek;
        this.resetGoals();
    }
    resetGoals() {
        for (let lesson of this._calenderSlots.values()) {
            lesson.resetGoalReached();
        }
    }
    toJSON() {
        let calender = {
            uuid: this._uuid,
            currentWeek: this._currentWeek,
            lessons: []
        };
        this._calenderSlots.forEach((value, key) => {
            let lesson = {
                timeSlot: key,
                data: value.toJSON()
            };
            calender.lessons.push(lesson);
        });
        return calender;
    }
}
//# sourceMappingURL=Calender.js.map