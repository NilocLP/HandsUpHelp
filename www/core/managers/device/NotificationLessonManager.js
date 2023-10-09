class NotificationLessonManager {
    constructor(forLesson, notificationId) {
        this._actionsVisible = false;
        this._assignedLesson = forLesson;
        if (notificationId) {
            this._messageID = notificationId;
        }
        else {
            this._messageID = UUIDUtils.generateNumberID();
        }
        cordova.plugins.notification.local.hasPermission((granted) => {
            this._notificationEnabled = granted;
        });
    }
    get messageID() {
        return this._messageID;
    }
    updateNotificationEnabledStatus() {
        cordova.plugins.notification.local.hasPermission((granted) => {
            this._notificationEnabled = granted;
        });
    }
    showNotification() {
        cordova.plugins.notification.local.cancel(this._messageID, () => { });
        cordova.plugins.notification.local.clear(this._messageID, () => { });
        this._actionsVisible = false;
        this.scheduleNotification(true);
        return true;
    }
    updateNotification() {
        this.scheduleNotification(false);
    }
    scheduleNotification(withActions) {
        if (!this._notificationEnabled)
            return false;
        if (!this._actionsVisible) {
            cordova.plugins.notification.local.on(`${this._messageID}-handsUp`, this.handleNotificationHandsUpAction.bind(this));
            cordova.plugins.notification.local.on(`${this._messageID}-taken`, this.handleNotificationTakenAction.bind(this));
        }
        const handsUpCount = this._assignedLesson.handsUpCount;
        const handsUpGoal = this._assignedLesson.subject.handsUpGoal;
        let handsUpPercentage = (handsUpCount / handsUpGoal) * 100;
        if (handsUpPercentage >= 100) {
            handsUpPercentage = 100;
        }
        let notificationData = {
            id: this._messageID,
            title: `Running Lesson: ${this._assignedLesson.subject.name}`,
            text: `You put your hand, ${handsUpCount} out of ${handsUpGoal} times up`,
            progressBar: { value: handsUpPercentage },
            foreground: false,
            launch: false,
            lockscreen: true,
            sticky: true,
            sound: null,
        };
        if (withActions && !this._actionsVisible) {
            notificationData["actions"] = [
                { id: `${this._messageID}-handsUp`, title: "Put hand up", launch: false },
                { id: `${this._messageID}-taken`, title: "Taken", launch: false }
            ];
            this._actionsVisible = true;
        }
        cordova.plugins.notification.local.schedule(notificationData);
    }
    removeNotification() {
        if (!this._notificationEnabled)
            return false;
        cordova.plugins.notification.local.un(`${this._messageID}-handsUp`, this.handleNotificationHandsUpAction);
        cordova.plugins.notification.local.un(`${this._messageID}-taken`, this.handleNotificationTakenAction);
        cordova.plugins.notification.local.cancel(this._messageID, () => { });
        cordova.plugins.notification.local.clear(this._messageID, () => { });
        return true;
    }
    handleNotificationHandsUpAction(notification, eopts) {
        this._assignedLesson.addHandsUp();
        const mainManager = MainManager.getMainManager();
        mainManager.saveManager.updateCalender(mainManager.mainCalender.toJSON()).then(() => { });
    }
    handleNotificationTakenAction(notification, eopts) {
        this._assignedLesson.addTaken();
        this._assignedLesson.addHandsUp();
        const mainManager = MainManager.getMainManager();
        mainManager.saveManager.updateCalender(mainManager.mainCalender.toJSON()).then(() => { });
    }
}
//# sourceMappingURL=NotificationLessonManager.js.map