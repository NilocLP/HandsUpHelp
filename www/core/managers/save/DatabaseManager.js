var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Handels the connection of the database
 * Opens the Database connection and Updates it
 */
class DatabaseManager {
    constructor(dbName) {
        this._dbVersion = 1;
        this._db = null;
        this._dbName = dbName;
        this._dbOpenPromise = this.openDatabase();
    }
    openDatabase() {
        return new Promise((resolve, reject) => {
            const openRequest = window.indexedDB.open(this._dbName, this._dbVersion);
            openRequest.addEventListener("error", (e) => this.openError(e, reject));
            openRequest.addEventListener("success", (e) => this.openSuccess(e, resolve));
            openRequest.addEventListener("upgradeneeded", this.openUpgradeNeeded);
        });
    }
    openError(event, promiseReject) {
        promiseReject(event.target.error);
    }
    openSuccess(event, promiseResolve) {
        this._db = event.target.result;
        promiseResolve(this._db);
    }
    /**
     * Runs when the Database isn't created or the version number changed
     * @param event
     * @private
     */
    openUpgradeNeeded(event) {
        const db = event.target.result;
        db.createObjectStore("calenders", { keyPath: "uuid" });
        const subjectStore = db.createObjectStore("subjects", { keyPath: "uuid" });
        subjectStore.createIndex("name", "name");
        const subjectEntryStore = db.createObjectStore("subjectEntries", { keyPath: "uuid" });
        subjectEntryStore.createIndex("date", "date");
        subjectEntryStore.createIndex("handsUpCount", "handsUpCount");
        subjectEntryStore.createIndex("takenCount", "takenCount");
        subjectEntryStore.createIndex("assignedSubject", "assignedSubject");
    }
    getDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._db) {
                return this._db;
            }
            yield this._dbOpenPromise;
            return this._db;
        });
    }
    deleteDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._dbOpenPromise;
            const deleteRequest = window.indexedDB.deleteDatabase(this._dbName);
            deleteRequest.addEventListener("success", (e) => { });
        });
    }
}
//# sourceMappingURL=DatabaseManager.js.map