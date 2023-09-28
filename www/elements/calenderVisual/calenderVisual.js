var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CalenderVisual extends HTMLElement {
    constructor() {
        super();
        this._rendered = false;
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.renderCalender();
            yield this.renderInput();
            this._rendered = true;
            const event = new CustomEvent('objectRendered');
            this.dispatchEvent(event);
        });
    }
    get rendered() {
        return this._rendered;
    }
    /**
     * It fetches the HTML file, then it renders the HTML file, then it renders the lessons
     */
    renderCalender() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/elements/calenderVisual/calenderVisual.html");
            const text = yield response.text();
            this.innerHTML = text;
        });
    }
    renderInput() {
        return __awaiter(this, void 0, void 0, function* () {
            //Insert HTML
            const response = yield fetch("/elements/calenderVisual/calenderVisualInput.html");
            const text = yield response.text();
            const visualInput = document.createElement("section");
            visualInput.setAttribute("id", "hu-calender-input");
            visualInput.innerHTML = text;
            document.querySelector("main").insertBefore(visualInput, null);
            document.querySelector("#hu-calender-input-save").addEventListener("click", () => {
                this.handelInputSubmit();
            });
            visualInput.classList.add("hu-calender-input-hidden");
        });
    }
    openInput(calenderSlot) {
        this._opendCalenderSlot = calenderSlot;
        const mainManger = MainManager.getMainManager();
        let calenderSlotLesson = this._assignedCalender.getLessonFromSlot(calenderSlot);
        //Check if Lesson is running
        if (calenderSlotLesson) {
            if (calenderSlotLesson.isRunning) {
                this.showInputSubmitError("It's not allowed to edit a running lesson");
                return;
            }
        }
        //Reset dropdown
        const inputDropdown = document.querySelector("#hu-calender-input hu-dropdown");
        inputDropdown.removeOptions();
        inputDropdown.clearCurrentOption();
        mainManger.subjects.forEach((subject) => {
            let subjectColorCode = SubjectColorUtils.subjectColorToColorCode(subject.color);
            inputDropdown.addOption(subject.name, true, subjectColorCode, subject.uuid);
            if (!calenderSlotLesson) {
                return;
            }
            if (calenderSlotLesson.subject === subject) {
                let currentOptionNumber = inputDropdown.options.length - 1;
                inputDropdown.currentOption = currentOptionNumber.toString();
            }
        });
        //Reset other
        const toggleButton = document.querySelector("#hu-calender-input .hu-calender-input-time-button");
        const inputTimeStart = document.querySelector("#hu-calender-input-time-start-element");
        const inputTimeEnd = document.querySelector("#hu-calender-input-time-end-element");
        toggleButton.setAttribute("checked", "false");
        inputTimeStart.clearValue();
        inputTimeEnd.clearValue();
        document.getElementById("hu-calender-input").classList.remove("hu-calender-input-hidden");
        if (!calenderSlotLesson) {
            return;
        }
        let isDoubleLesson = calenderSlotLesson.isDoubleLesson;
        let startTime = calenderSlotLesson.startTime;
        let endTime = calenderSlotLesson.endTime;
        toggleButton.setAttribute("checked", String(isDoubleLesson));
        inputTimeStart.setValue(startTime);
        inputTimeEnd.setValue(endTime);
    }
    handelInputSubmit() {
        const inputDropdown = document.querySelector("#hu-calender-input hu-dropdown");
        const toggleButton = document.querySelector("#hu-calender-input .hu-calender-input-time-button");
        const inputTimeStart = document.querySelector("#hu-calender-input-time-start-element");
        const inputTimeEnd = document.querySelector("#hu-calender-input-time-end-element");
        let currentSlot = this._opendCalenderSlot;
        let calender = this._assignedCalender;
        let mainManager = MainManager.getMainManager();
        //Get Subject
        let currentOption = parseInt(inputDropdown.currentOption);
        let subjectUUID = inputDropdown.options[currentOption].id;
        let subject = mainManager.subjects.filter((subject) => subject.uuid === subjectUUID)[0];
        let isDoubleLesson = toggleButton.getAttribute("checked");
        let weekday = Math.floor(currentSlot / 10);
        let startTime = inputTimeStart.valueAsDateTime();
        let endTime = inputTimeEnd.valueAsDateTime();
        let lessonToUpdate = this._assignedCalender.getLessonFromSlot(this._opendCalenderSlot);
        let lesson;
        lesson = new Lesson(JSON.parse(isDoubleLesson), weekday, startTime, endTime, subject);
        calender.removeLessonFromSlot(currentSlot);
        let addCode = calender.addLessonToSlot(currentSlot, lesson);
        switch (addCode) {
            case 1:
                this.showInputSubmitError("It is not possible to create a double-lesson here");
                return;
            case 2:
                this.showInputSubmitError("No start or end time defined");
                return;
            case 3:
                this.showInputSubmitError("End time is before start time or equal to it, which is not allowed");
                return;
        }
        if (lessonToUpdate) {
            if (lessonToUpdate.subject.uuid == subject.uuid) {
                let newLesson = calender.getLessonFromSlot(currentSlot);
                newLesson.handsUpCount = lessonToUpdate.handsUpCount;
                newLesson.takenCount = lessonToUpdate.takenCount;
                newLesson.isRunning = lessonToUpdate.isRunning;
                newLesson.goalReached = lessonToUpdate.goalReached;
            }
        }
        mainManager.saveManager.updateCalender(mainManager.mainCalender.toJSON()).then(r => {
            this.hideInput();
            this.renderTimeSlots();
            mainManager.runPhase();
        });
    }
    showInputSubmitError(message) {
        navigator.notification.alert(message, () => { }, "Invalid Inputs");
    }
    hideInput() {
        document.getElementById("hu-calender-input").classList.add("hu-calender-input-hidden");
    }
    renderTimeSlots() {
        let noCalender = !this._assignedCalender;
        if (noCalender)
            return;
        let childNodes = Array.from(this.querySelector(".body").childNodes);
        childNodes.forEach((node) => {
            node.remove();
        });
        let previousWasDoubleLesson = false;
        for (let i = 0; i < 50; i++) {
            let calenderSlotLesson = this._assignedCalender.getLessonFromSlot(i);
            let timeSlot = document.createElement("div");
            if (!calenderSlotLesson) {
                timeSlot.classList.add("notUsed");
                timeSlot.appendChild(document.createElement("div"));
            }
            else {
                let subject = calenderSlotLesson.subject;
                let color = subject.color;
                let initialLetter = subject.name.charAt(0);
                timeSlot.classList.add(`calender-color-${color}`);
                timeSlot.innerText = initialLetter;
                if (calenderSlotLesson.goalReached) {
                    timeSlot.classList.add("calender-goalReached");
                }
                else {
                    timeSlot.classList.add("calender-notGoalReached");
                }
                if (!calenderSlotLesson.isRunning) {
                    timeSlot.classList.add("calender-notRunning");
                }
                if (calenderSlotLesson.isDoubleLesson) {
                    if (previousWasDoubleLesson) {
                        previousWasDoubleLesson = false;
                        timeSlot.classList.add("calender-doubleLessonSecond");
                    }
                    else {
                        previousWasDoubleLesson = true;
                        timeSlot.classList.add("calender-doubleLesson");
                    }
                }
            }
            timeSlot.id = `timeslot-${i}`;
            timeSlot.addEventListener("click", () => {
                this.openInput(i);
            });
            this.querySelector(".body").appendChild(timeSlot);
        }
    }
    assignCalender(calender) {
        this._assignedCalender = calender;
        this.renderTimeSlots();
    }
}
// @ts-ignore
function init() {
    if (window.customElements.get("hu-calender") === undefined) {
        window.customElements.define('hu-calender', CalenderVisual);
    }
}
init();
//# sourceMappingURL=calenderVisual.js.map