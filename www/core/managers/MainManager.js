class MainManager {
    constructor() {
        this._screenManager = null;
        this._dbManager = null;
        this._saveManager = null;
        this._dbManager = new DatabaseManager("handsUpHelperData");
        this._saveManager = new SaveManager(this._dbManager);
    }
    run() {
        this._dbManager.getDatabase().then((db) => {
            console.log("database is open");
        });
    }
    createScreenManager(screenElement) {
        if (this._screenManager !== null) {
            throw new Error("ScreenManager already exists");
        }
        this._screenManager = new ScreenManager(screenElement);
    }
    get screenManager() {
        return this._screenManager;
    }
    get saveManager() {
        return this._saveManager;
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