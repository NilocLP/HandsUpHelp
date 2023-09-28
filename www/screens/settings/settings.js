// @ts-ignore
function init() {
    const mainManager = MainManager.getMainManager();
    let dropdown = document.querySelector("#settings-setting-language-dropdown");
    dropdown.addOption("English", false, "#000");
    dropdown.addOption("German", false, "#000");
    loadSettings();
    document.getElementById("settings-setting-infoText-button").addEventListener("click", () => {
        mainManager.screenManager.changeScreen(3);
    });
    document.querySelector("#settings-setting-notify .settings-setting-element").addEventListener("toggleChange", handleNotificationCountingUpdate);
    document.querySelector("#settings-setting-countZero .settings-setting-element").addEventListener("toggleChange", handleCountingZerosUpdate);
    document.querySelector("#settings-setting-length-input").addEventListener("inputChanged", handleLessonLengthUpdate);
    document.querySelector("#settings-setting-language-dropdown").addEventListener("hu-selectionChange", handleLanguageUpdate);
}
function loadSettings() {
    let mainManager = MainManager.getMainManager();
    let notificationCounter = mainManager.settingsManager.notificationCounter;
    let zeroCounter = mainManager.settingsManager.countZeroLessons;
    let length = mainManager.settingsManager.lessonLength;
    let language = mainManager.settingsManager.language;
    document.querySelector("#settings-setting-notify .settings-setting-element").setAttribute("checked", notificationCounter.toString());
    document.querySelector("#settings-setting-countZero .settings-setting-element").setAttribute("checked", zeroCounter.toString());
    let inputNumber = document.querySelector("#settings-setting-length-input");
    inputNumber.setValue(length);
    let dropdown = document.querySelector("#settings-setting-language-dropdown");
    switch (language) {
        case "en":
            dropdown.currentOption = "0";
            break;
        case "de":
            dropdown.currentOption = "1";
            break;
    }
}
function handleNotificationCountingUpdate(event) {
    let mainManager = MainManager.getMainManager();
    mainManager.settingsManager.notificationCounter = event.detail;
}
function handleCountingZerosUpdate(event) {
    let mainManager = MainManager.getMainManager();
    mainManager.settingsManager.countZeroLessons = event.detail;
}
function handleLessonLengthUpdate(event) {
    let mainManager = MainManager.getMainManager();
    mainManager.settingsManager.lessonLength = event.detail;
}
function handleLanguageUpdate(event) {
    let mainManager = MainManager.getMainManager();
    let dropdown = event.currentTarget;
    let value = dropdown.options[dropdown.currentOption].name;
    switch (value) {
        case "English":
            mainManager.settingsManager.language = "en";
            break;
        case "German":
            mainManager.settingsManager.language = "de";
            break;
    }
}
//# sourceMappingURL=settings.js.map