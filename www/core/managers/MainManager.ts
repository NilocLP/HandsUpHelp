class MainManager{

    private static mainMangerInstance: MainManager = null;

    private _mainCalender;
    private _subjects;
    private _subjectEntry;

    private _screenManager:ScreenManager = null;
    private readonly _dbManager:DatabaseManager = null;
    private _saveManager:SaveManager = null;


    private constructor() {
        this._dbManager = new DatabaseManager("handsUpHelperData");
        this._saveManager = new SaveManager(this._dbManager);
    }

    public run(){
        this._dbManager.getDatabase().then((db) => {
            console.log("database is open")

        })
    }

    public createScreenManager(screenElement: HTMLElement){
        if(this._screenManager !== null){
            throw new Error("ScreenManager already exists");
        }
        this._screenManager = new ScreenManager(screenElement);
    }

    get screenManager(){
        return this._screenManager;
    }


    get saveManager(): SaveManager {
        return this._saveManager;
    }

    public static getMainManager(){
        if(this.mainMangerInstance == null){
            this.mainMangerInstance = new MainManager();
        }
        return this.mainMangerInstance;
    }

}