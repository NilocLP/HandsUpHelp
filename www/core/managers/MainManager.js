class MainManager {
    constructor() {
        this._screenManager = undefined;
    }
    run() {
    }
    start() {
        //TODO: Replace with Loading of Config
    }
    createScreenManager(screenElement) {
        if (this._screenManager !== undefined) {
            throw new Error("ScreenManager already exists");
        }
        this._screenManager = new ScreenManager(screenElement);
    }
    get screenManager() {
        return this._screenManager;
    }
    static getMainManager() {
        if (this.mainMangerInstance == null) {
            this.mainMangerInstance = new MainManager();
        }
        return this.mainMangerInstance;
    }
}
MainManager.mainMangerInstance = null;
//# sourceMappingURL=MainManager.js.map