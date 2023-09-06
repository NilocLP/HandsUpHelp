/**
 * Handels the connection of the database
 * Opens the Database connection and Updates it
 */
class DatabaseManager {

    private _dbName: string;
    private _dbVersion = 1;
    private _db = null;
    private _dbOpenPromise: Promise<unknown>;

    constructor(dbName) {
        this._dbName = dbName;
        this._dbOpenPromise = this.openDatabase();
    }

    private openDatabase(){
        return new Promise((resolve, reject) => {
            const openRequest = window.indexedDB.open(this._dbName, this._dbVersion);
            openRequest.addEventListener("error", (e) => this.openError(e, reject));
            openRequest.addEventListener("success", (e) => this.openSuccess(e,resolve));
            openRequest.addEventListener("upgradeneeded", this.openUpgradeNeeded);
        });
    }

    private openError(event, promiseReject){
        promiseReject(event.target.error);
    }

    private openSuccess(event, promiseResolve){
        this._db = event.target.result;
        promiseResolve(this._db);
    }

    /**
     * Runs when the Database isn't created or the version number changed
     * @param event
     * @private
     */
    private openUpgradeNeeded(event){
        const db = event.target.result;

        db.createObjectStore("calenders", {keyPath:"uuid"})

        const subjectStore = db.createObjectStore("subjects", {keyPath:"uuid"})
        subjectStore.createIndex("name", "name");

        const subjectEntryStore = db.createObjectStore("subjectEntries", {keyPath:"uuid"})
        subjectEntryStore.createIndex("date", "date");
        subjectEntryStore.createIndex("handsUpCount", "handsUpCount");
        subjectEntryStore.createIndex("takenCount", "takenCount");
        subjectEntryStore.createIndex("assignedSubject", "assignedSubject");

    }

    public async getDatabase() {
        if (this._db) {
            return this._db
        }
        await this._dbOpenPromise;
        return this._db;
    }


}




