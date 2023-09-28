
function init() {
    loadDropdown()
    let dropdown:Dropdown = document.getElementById("selection-dropdown") as Dropdown;
    dropdown.addEventListener("hu-selectionChange", handleFilterChange);

    let calenderStart:InputDate = document.getElementById("selection-date-start") as InputDate;
    let calenderEnd:InputDate = document.getElementById("selection-date-end") as InputDate;
    calenderStart.addEventListener("hu-dateChanged",handleFilterChange);
    calenderEnd.addEventListener("hu-dateChanged",handleFilterChange);

}

function loadDropdown(){
    let mainManager = MainManager.getMainManager();
    let dropdown:Dropdown = document.getElementById("selection-dropdown") as Dropdown;
    dropdown.removeOptions();
    dropdown.clearCurrentOption();
    mainManager.subjects.forEach((subject) => {
        let subjectColorCode = SubjectColorUtils.subjectColorToColorCode(subject.color)
        dropdown.addOption(subject.name,true,subjectColorCode,subject.uuid);
    })
}

function handleFilterChange(){
    let filled = checkAllFiltersFilled();
    switch (filled) {
        case 4:
            navigator.notification.confirm(
                "The second Date can't be before the first Date. Should Second Date be changed automatically?",
                ()=>fixDate(),
                "Invalid Date",
                ["Change Date", "Abort"]
            )
            break;
        case 0:
            insertData();
            break;
    }
}


function checkAllFiltersFilled():number{
    let dropdown:Dropdown = document.getElementById("selection-dropdown") as Dropdown;
    let calenderStart:InputDate = document.getElementById("selection-date-start") as InputDate;
    let calenderEnd:InputDate = document.getElementById("selection-date-end") as InputDate;

    if(calenderStart.value === "") return 2;
    if(calenderEnd.value === "") return 3;
    let startDate = new Date(calenderStart.value);
    let endDate = new Date(calenderEnd.value);
    if(startDate.getTime() > endDate.getTime()) return 4;

    if(!dropdown.currentOption) return 1;
    return 0;
}

function fixDate(){
    let calenderStart:InputDate = document.getElementById("selection-date-start") as InputDate;
    let calenderEnd:InputDate = document.getElementById("selection-date-end") as InputDate;
    let startDate = new Date(calenderStart.value);
    let endDate = new Date(startDate.getTime() + 1000*60*60*24);
    calenderEnd.value = endDate.toISOString().split("T")[0];
}

async function insertData() {
    const mainManager = MainManager.getMainManager();
    const subjectEntries:{}[] = await grapSubjectEntriesFromForm();
    const validSubjectEntries:SubjectEntry[] = [];
    subjectEntries.forEach((subjectEntry) => {
        let subjectEntryObject = new SubjectEntry(
            subjectEntry["date"],
            subjectEntry["handsUpCount"],
            subjectEntry["takenCount"],
            subjectEntry["subjectId"],
            subjectEntry["uuid"]
        );
        validSubjectEntries.push(subjectEntryObject);
    });

    let handsUpCount = 0;
    let takenCount = 0;
    validSubjectEntries.forEach((subjectEntry) => {
        handsUpCount += subjectEntry.handsUpCount;
        takenCount += subjectEntry.takenCount;
    });
    let takenPercentage = (takenCount / handsUpCount * 100).toFixed(2);
    let averageHandsUp = handsUpCount / validSubjectEntries.length;
    let averageTaken = takenCount / validSubjectEntries.length;
    let participatedLessons = validSubjectEntries.length;

    document.getElementById("stats-data-handsup").innerText = handsUpCount.toString();
    document.getElementById("stats-data-taken").innerText = takenCount.toString();
    document.getElementById("stats-data-takenPercent").innerText = takenPercentage.toString();
    document.getElementById("stats-data-average-handsup").innerText = averageHandsUp.toString();
    document.getElementById("stats-data-average-taken").innerText = averageTaken.toString();
    document.getElementById("stats-data-participated").innerText = participatedLessons.toString();

    document.getElementById("stats-diagram-visual").setAttribute("percentage", takenPercentage.toString().split(".")[0]);
    document.getElementById("statistics").classList.remove("statisticsHidden");

}

async function grapSubjectEntriesFromForm(){
    const mainManager = MainManager.getMainManager();
    const saveManager = mainManager.saveManager;
    let calenderStart: InputDate = document.getElementById("selection-date-start") as InputDate;
    let calenderEnd: InputDate = document.getElementById("selection-date-end") as InputDate;
    let subjectEntries:{}[] = await saveManager.getSubjectEntriesByDateRange(new Date(calenderStart.value), new Date(calenderEnd.value)) as {}[];
    let dropdown:Dropdown = document.getElementById("selection-dropdown") as Dropdown;
    let subjectOption = parseInt(dropdown.currentOption)
    let subjectId = MainManager.getMainManager().subjects[subjectOption].uuid;
    subjectEntries = subjectEntries.filter((subjectEntry) => {
        return subjectEntry["subjectId"] === subjectId;
    });
    return subjectEntries;
}

//TODO: Bux fixen, dass wenn der Tag wechselt, der Kalender nicht weiter geht(Basis Funktionen sind dann soweit fertig)

