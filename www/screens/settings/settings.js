// @ts-ignore
function init() {
    const mainManager = MainManager.getMainManager();
    /*let dropdown:Dropdown = document.querySelector("#settings-setting-language-dropdown");
    dropdown.addOption("English", false, "#000")
    dropdown.addOption("German", false, "#000")*/
    loadSettings();
    document.getElementById("settings-setting-infoText-button").addEventListener("click", () => {
        mainManager.screenManager.changeScreen(3);
    });
    document.querySelector("#settings-setting-notify .settings-setting-element").addEventListener("toggleChange", handleNotificationCountingUpdate);
    document.querySelector("#settings-setting-countZero .settings-setting-element").addEventListener("toggleChange", handleCountingZerosUpdate);
    //document.querySelector("#settings-setting-length-input").addEventListener("inputChanged",handleLessonLengthUpdate)
    //document.querySelector("#settings-setting-language-dropdown").addEventListener("hu-selectionChange",handleLanguageUpdate)
    document.querySelector("#settings-resetButton").addEventListener("click", handleResetData);
}
function loadSettings() {
    let mainManager = MainManager.getMainManager();
    let notificationCounter = mainManager.settingsManager.notificationCounter;
    let zeroCounter = mainManager.settingsManager.countZeroLessons;
    //let length = mainManager.settingsManager.lessonLength;
    //let language = mainManager.settingsManager.language;
    document.querySelector("#settings-setting-notify .settings-setting-element").setAttribute("checked", notificationCounter.toString());
    document.querySelector("#settings-setting-countZero .settings-setting-element").setAttribute("checked", zeroCounter.toString());
    //let inputNumber:InputNumber = document.querySelector("#settings-setting-length-input")
    //inputNumber.setValue(length)
    /*let dropdown:Dropdown = document.querySelector("#settings-setting-language-dropdown")
    switch (language){
        case "en":
            dropdown.currentOption = "0";
            break;
        case "de":
            dropdown.currentOption = "1";
            break;
    }*/
}
function handleNotificationCountingUpdate(event) {
    cordova.plugins.notification.local.hasPermission((granted) => {
        if (granted === true) {
            let mainManager = MainManager.getMainManager();
            mainManager.settingsManager.notificationCounter = event.detail;
            if (!mainManager.currentLesson)
                return;
            mainManager.currentLesson.notificationManager.updateNotificationEnabledStatus();
            console.log(event.detail);
            if (event.detail === true) {
                mainManager.currentLesson.notificationManager.showNotification();
            }
            else {
                mainManager.currentLesson.notificationManager.removeNotification();
            }
        }
        else {
            navigator.notification.alert("Please allow the app to send notifications in the settings of your device:\n\n Apps -> HandsUpHelp -> Permissions -> Notifications -> Allow", () => { }, "Permission required");
            event.target.setAttribute("checked", (!event.detail).toString());
        }
    });
}
function handleCountingZerosUpdate(event) {
    let mainManager = MainManager.getMainManager();
    mainManager.settingsManager.countZeroLessons = event.detail;
}
/*function handleLessonLengthUpdate(event){
    let mainManager = MainManager.getMainManager();
    mainManager.settingsManager.lessonLength = event.detail;
}*/
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
function handleResetData(event) {
    navigator.notification.beep(1);
    navigator.notification.prompt("Are you sure you want to reset all data? \n\nThis Action can't be undone!\nType:'reset' to confirm", handleResetDataConfirm, "Reset Data", ["Confirm Reset", "Cancel"]);
}
function handleResetDataConfirm(results) {
    if (results.input1 !== "reset")
        return;
    if (results.buttonIndex !== 1)
        return;
    let mainManager = MainManager.getMainManager();
    mainManager.saveManager.dbManager.deleteDatabase().then(() => {
        window.location.reload();
        navigator.notification.alert("All data has been reset", () => { }, "Reset Data");
    });
}
//# sourceMappingURL=settings.js.map