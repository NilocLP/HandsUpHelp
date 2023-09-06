class SettingsManager {
    constructor() {
        this.initializeSettings();
    }
    /**
     * Load Settings and if the Setting doesn't exist, create  it
     * @private
     */
    initializeSettings() {
        let notificationCounter = localStorage.getItem("setting_notificationCounter");
        let countZeroLessons = localStorage.getItem("setting_countZeroLessons");
        let lessonLength = localStorage.getItem("setting_lessonLength");
        let language = localStorage.getItem("setting_language");
        if (!notificationCounter) {
            localStorage.setItem("setting_notificationCounter", "true");
            notificationCounter = "true";
        }
        if (!countZeroLessons) {
            localStorage.setItem("setting_countZeroLessons", "false");
            countZeroLessons = "false";
        }
        if (!lessonLength) {
            localStorage.setItem("setting_lessonLength", "45");
            lessonLength = "45";
        }
        if (!language) {
            localStorage.setItem("setting_language", "en");
            language = "en";
        }
        this._notificationCounter = (notificationCounter === "true");
        this._countZeroLessons = (countZeroLessons === "true");
        this._lessonLength = parseInt(lessonLength);
        this._language = language;
    }
    get notificationCounter() {
        return this._notificationCounter;
    }
    set notificationCounter(value) {
        this._notificationCounter = value;
        localStorage.setItem("setting_notificationCounter", value.toString());
    }
    get countZeroLessons() {
        return this._countZeroLessons;
    }
    set countZeroLessons(value) {
        this._countZeroLessons = value;
        localStorage.setItem("setting_countZeroLessons", value.toString());
    }
    get lessonLength() {
        return this._lessonLength;
    }
    set lessonLength(value) {
        this._lessonLength = value;
        localStorage.setItem("setting_lessonLength", value.toString());
    }
    get language() {
        return this._language;
    }
    set language(value) {
        this._language = value;
        localStorage.setItem("setting_language", value.toString());
    }
}
//# sourceMappingURL=SettingsManager.js.map