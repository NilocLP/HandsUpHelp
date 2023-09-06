var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function init() {
    const mainManager = MainManager.getMainManager();
    document.getElementById("subjectList-addButton").addEventListener("click", () => {
        let data = { subjectUUID: undefined };
        mainManager.screenManager.changeScreen(4, data).then();
    });
    loadSubjects().then();
}
function loadSubjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const mainManager = MainManager.getMainManager();
        let subjects;
        if (!mainManager.subjects) {
            subjects = yield mainManager.saveManager.getAllSubjects();
            let subjectObjects = [];
            subjects.forEach((subject) => {
                let subjectObject = new Subject(subject.value.name, subject.value.handsUpGoal, subject.value.color, subject.value.uuid);
                subjectObjects.push(subjectObject);
            });
            mainManager.subjects = subjectObjects;
            subjects = subjectObjects;
        }
        else {
            subjects = mainManager.subjects;
        }
        let subjectList = document.getElementById("subjectList");
        subjects.forEach((subject) => {
            let subjectElement = buildSubjectListElement(subject.uuid, subject.name, subject.color);
            let subjectSettingsButton = subjectElement.querySelector(".subjectList-subject-settings");
            subjectSettingsButton.addEventListener('click', openConfigureListener);
            subjectList.appendChild(subjectElement);
        });
    });
}
function openConfigureListener(e) {
    let target = e.currentTarget;
    let subjectElement = target.parentElement;
    let subjectUUID = subjectElement.id.substring(8);
    let mainManager = MainManager.getMainManager();
    let data = { subjectUUID: subjectUUID };
    mainManager.screenManager.changeScreen(4, data).then();
}
function buildSubjectListElement(subjectId, subjectName, subjectColor) {
    if (!subjectColor) {
        subjectColor = "";
    }
    //Create Elements
    let subjectElement = document.createElement("div");
    subjectElement.classList.add("subjectList-subject-element");
    subjectElement.id = `subject-${subjectId}`;
    let subjectDataElement = document.createElement("div");
    subjectDataElement.classList.add("subjectList-subject-data");
    let subjectColorElement = document.createElement("div");
    subjectColorElement.classList.add("subjectList-subject-color");
    subjectColorElement.classList.add(`subjectList-color-${subjectColor.toLowerCase()}`);
    let subjectTextElement = document.createElement("span");
    subjectTextElement.classList.add("subjectList-subject-text");
    subjectTextElement.innerText = subjectName;
    let subjectButonElement = document.createElement("hu-button");
    subjectButonElement.classList.add("subjectList-subject-settings");
    let subjectButonImageElement = document.createElement("img");
    subjectButonImageElement.src = "/core/assets/svg/settings.svg";
    subjectButonImageElement.alt = "Gear";
    //Connect Elements
    subjectElement.appendChild(subjectDataElement);
    subjectElement.appendChild(subjectButonElement);
    subjectDataElement.appendChild(subjectColorElement);
    subjectDataElement.appendChild(subjectTextElement);
    subjectButonElement.appendChild(subjectButonImageElement);
    return subjectElement;
}
//# sourceMappingURL=configureSubjects.js.map