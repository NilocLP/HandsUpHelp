var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//@ts-ignore
function init(data) {
    if (data.subjectUUID) {
        fillInSubjectInformations(data.subjectUUID);
    }
    document.querySelectorAll(".subject-color").forEach((element) => {
        element.addEventListener("click", handleColorSwitch);
    });
    document.getElementById("subject-save").addEventListener("click", () => handleSubjectSave(data));
}
function fillInSubjectInformations(subjectUUID) {
    let subjects = MainManager.getMainManager().subjects;
    let subject = subjects.filter((value) => {
        return value.uuid == subjectUUID;
    })[0];
    let nameElement = document.querySelector("hu-inputtext").firstElementChild;
    nameElement.setAttribute("value", subject.name);
    let goalElement = document.querySelector("hu-inputnumber").firstElementChild;
    goalElement.setAttribute("value", String(subject.handsUpGoal));
    removeActiveColor();
    setActiveColor(subject.color);
}
function removeActiveColor() {
    let colorElements = document.querySelector("#subject-colors").children;
    let colorElementsArray = Array.from(colorElements);
    for (let colorElement of colorElementsArray) {
        if (colorElement.classList.contains("subject-color-active")) {
            colorElement.classList.remove("subject-color-active");
        }
    }
}
function setActiveColor(color) {
    if (!color) {
        return;
    }
    let colorElements = document.querySelector("#subject-colors").children;
    let colorElementsArray = Array.from(colorElements);
    for (let colorElement of colorElementsArray) {
        let matchedElement = colorElement.classList.contains(`subject-color-${color.toLowerCase()}`);
        if (matchedElement) {
            colorElement.classList.add("subject-color-active");
        }
    }
}
function getActiveColor() {
    let colorElements = document.querySelector("#subject-colors").children;
    let colorElementsArray = Array.from(colorElements);
    let color;
    for (let colorElement of colorElementsArray) {
        if (!colorElement.classList.contains("subject-color-active")) {
            continue;
        }
        colorElement.classList.forEach((value, key, parent) => {
            if (!value.startsWith("subject-color-")) {
                return;
            }
            if (value === "subject-color-active") {
                return;
            }
            color = value.substring(14);
        });
    }
    return color;
}
function handleColorSwitch(e) {
    let targetElement = e.currentTarget;
    removeActiveColor();
    targetElement.classList.add("subject-color-active");
}
function handleSubjectSave(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let nameElement = document.querySelector("hu-inputtext").firstElementChild;
        let goalElement = document.querySelector("hu-inputnumber").firstElementChild;
        let name = nameElement.value;
        let goal = parseInt(goalElement.value);
        let color = getActiveColor();
        if (name == "" || isNaN(goal) || color == undefined) {
            navigator.notification.alert("You need to fill out every field to save the subject", () => { }, "Missing Values");
            return;
        }
        let mainManager = MainManager.getMainManager();
        let subjects = mainManager.subjects;
        let subject = subjects.filter((value, index) => {
            return value.uuid == data.subjectUUID;
        })[0];
        if (subject) {
            subject.updateSettings(name, goal, color);
            yield mainManager.saveManager.updateSubject(subject.toJSON());
            mainManager.screenManager.changeScreen(3).then();
        }
        else {
            let subject = new Subject(name, goal, color);
            yield mainManager.saveManager.addSubject(subject.toJSON());
            mainManager.subjects.push(subject);
            mainManager.screenManager.changeScreen(3).then();
        }
    });
}
//# sourceMappingURL=configureSubject.js.map