class Calender{

    private _uuid:string;
    private _currentWeek: number;
    private _calenderSlots: Map<number,Lesson> = new Map<number, Lesson>();


    constructor(currentWeek:number, uuid?:string) {
        this._currentWeek = currentWeek;
        if(uuid){
            this._uuid = uuid;
        }else {
            this._uuid = UUIDUtils.generateUUID();
        }
    }

    public addLessonToSlot(timeSlot:number,lesson: Lesson){
        //Check if TimeSlot is free and time is valid
        let slotsFree = this.checkLessonSlotsFree(timeSlot,lesson);
        let timeEntered = this.checkTimeEntered(lesson);
        let timeValid = this.checkTimespanValid(lesson);
        if(!slotsFree){
            return 1;
        }
        if(!timeEntered){
            return 2;
        }
        if(!timeValid){
            return 3;
        }

        this._calenderSlots.set(timeSlot,lesson);
        if(lesson.isDoubleLesson){
            this._calenderSlots.set(timeSlot+1,lesson);
        }
        return 0;
    }

    private checkTimeEntered(lesson: Lesson){
        let startNumber = lesson.startTime.getTime();
        let endNumber = lesson.startTime.getTime();
        return !(isNaN(startNumber) || isNaN(endNumber));
    }

    private checkTimespanValid(lesson:Lesson){
        let timeInvalid = lesson.startTime.getTime() >= lesson.endTime.getTime();
        return !timeInvalid;
    }

    private checkLessonSlotsFree(timeSlot:number, lesson:Lesson){
        if(this._calenderSlots.get(timeSlot)){
            return false;
        }
        if(timeSlot >= 50){
            return false;
        }
        if(lesson.isDoubleLesson){
            if(this._calenderSlots.get(timeSlot + 1)){
                return false;
            }
            if(timeSlot + 1 >= 50){
                return false;
            }
            if(this.isDoubleTimeSlotNotInSameDay(timeSlot)){
                return false;
            }
        }
        return true;
    }


    private isDoubleTimeSlotNotInSameDay(timeSlot){
        let timeSlotString = timeSlot.toString();
        return timeSlotString.charAt(timeSlotString.length - 1) === '9'
    }

    public removeLessonFromSlot(timeSlot:number){
        let lesson: Lesson = this._calenderSlots.get(timeSlot);
        if(!lesson){
            return;
        }
        if(lesson.isDoubleLesson){
            this._calenderSlots.delete(timeSlot+1);
        }
        this._calenderSlots.delete(timeSlot);
    }

    public getLessonFromSlot(timeSlot:number){
        return this._calenderSlots.get(timeSlot);
    }

    public getCurrentLesson(date:Date){
        for(const [, lesson] of this._calenderSlots){
            if(!lesson.lessonInTimeframe(date)){
                continue;
            }
            return lesson;
        }
        return null;
    }

    public getUpcomingLesson(date:Date){
        let nextLesson:Lesson = null;
        for(const [, lesson] of this._calenderSlots){
            if(!lesson.lessonInSameDay(date)){
                continue;
            }
            if(lesson.timeframeAfterLesson(date)){
                continue;
            }
            if(lesson.timeframeBeforeLesson(date)){
                if(nextLesson === null){
                    nextLesson = lesson
                    continue;
                }

                if(DateUtils.getTimeDifferenceHours(nextLesson.startTime, lesson.startTime) <= 0){
                    continue;
                }
                nextLesson = lesson;
            }
        }
        return nextLesson;
    }

    public updateCurrentWeek(newCurrentWeek:number){
        this._currentWeek = newCurrentWeek;
        this.resetGoals();
    }

    private resetGoals(){
        for (let lesson of this._calenderSlots.values()) {
            lesson.resetGoalReached();
        }
    }

    public toJSON(){
        let calender = {
            uuid: this._uuid,
            currentWeek: this._currentWeek,
            lessons: []
        }
        this._calenderSlots.forEach((value, key) => {
            let lesson = {
                timeSlot: key,
                data: value.toJSON()
            }
            calender.lessons.push(lesson);
        })

        return calender;
    }

}