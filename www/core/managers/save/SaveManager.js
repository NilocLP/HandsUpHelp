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
 * Handels the communication with the database for Storing and Getting Objects
 */
class SaveManager {
    constructor(databaseManager) {
        this._dbManager = null;
        this._dbManager = databaseManager;
    }
    get dbManager() {
        return this._dbManager;
    }
    getCalenderByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const calenderStore = db.transaction('calenders', 'readonly').objectStore('calenders');
            return this.getByUUID(calenderStore, uuid);
        });
    }
    getAllCalenders() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const calenderStore = db.transaction('calenders', 'readonly').objectStore('calenders');
            return this.getAll(calenderStore);
        });
    }
    addCalender(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
            return this.add(calenderStore, data);
        });
    }
    updateCalender(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
            return this.update(calenderStore, data);
        });
    }
    deleteCalenderByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
            return this.deleteByUUID(calenderStore, uuid);
        });
    }
    getSubjectEntryByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectEntryStore = db.transaction('subjectEntries', 'readonly').objectStore('subjectEntries');
            return this.getByUUID(subjectEntryStore, uuid);
        });
    }
    getAllSubjectEntries() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectEntryStore = db.transaction('subjectEntries', 'readonly').objectStore('subjectEntries');
            return this.getAll(subjectEntryStore);
        });
    }
    getSubjectEntriesByTakenCount(takenCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjectEntries', 'readonly').objectStore('subjectEntries');
            let keyRange = IDBKeyRange.only(takenCount);
            return this.searchWithCursor(takenCount, keyRange, subjectStore, "takenCount", true);
        });
    }
    getSubjectEntriesByHandsUpCount(handsUpCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjectEntries', 'readonly').objectStore('subjectEntries');
            let keyRange = IDBKeyRange.only(handsUpCount);
            return this.searchWithCursor(handsUpCount, keyRange, subjectStore, "handsUpCount", true);
        });
    }
    getSubjectEntriesByAssignedSubject(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjectEntries', 'readonly').objectStore('subjectEntries');
            let keyRange = IDBKeyRange.only(subjectId);
            return this.searchWithCursor(subjectId, keyRange, subjectStore, "assignedSubject", true);
        });
    }
    getSubjectEntriesByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjectEntries', 'readonly').objectStore('subjectEntries');
            let keyRange = IDBKeyRange.only(date);
            return this.searchWithCursor(date, keyRange, subjectStore, "date", true);
        });
    }
    getSubjectEntriesByDateRange(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjectEntries', 'readonly').objectStore('subjectEntries');
            let keyRange = IDBKeyRange.bound(startDate, endDate);
            return this.searchWithCursor(null, keyRange, subjectStore, "date", true);
        });
    }
    addSubjectEntry(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectEntryStore = db.transaction('subjectEntries', 'readwrite').objectStore('subjectEntries');
            return this.add(subjectEntryStore, data);
        });
    }
    updateSubjectEntry(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectEntryStore = db.transaction('subjectEntries', 'readwrite').objectStore('subjectEntries');
            return this.update(subjectEntryStore, data);
        });
    }
    deleteSubjectEntryByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectEntryStore = db.transaction('subjectEntries', 'readwrite').objectStore('subjectEntries');
            return this.deleteByUUID(subjectEntryStore, uuid);
        });
    }
    getSubjectByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'readonly').objectStore('subjects');
            return this.getByUUID(subjectStore, uuid);
        });
    }
    getSubjectByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'readonly').objectStore('subjects');
            let keyRange = IDBKeyRange.only(name);
            return this.searchWithCursor(name, keyRange, subjectStore, "name");
        });
    }
    getAllSubjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'readonly').objectStore('subjects');
            return this.getAll(subjectStore);
        });
    }
    addSubject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
            return this.add(subjectStore, data);
        });
    }
    updateSubject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
            return this.update(subjectStore, data);
        });
    }
    deleteSubjectByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
            return this.deleteByUUID(subjectStore, uuid);
        });
    }
    getByUUID(objectStore, uuid) {
        return new Promise((resolve, reject) => {
            const request = objectStore.get(uuid);
            request.onsuccess = (e) => {
                resolve(e.target.result);
            };
            request.onerror = (e) => {
                reject(e.target.error);
            };
        });
    }
    getAll(objectStore) {
        return new Promise((resolve, reject) => {
            const request = objectStore.openCursor();
            let resultArray = [];
            request.onsuccess = (e) => {
                let cursor = e.target.result;
                if (!cursor) {
                    resolve(resultArray);
                    return;
                }
                let result = {
                    id: cursor.key,
                    value: cursor.value
                };
                resultArray.push(result);
                cursor.continue();
            };
            request.onerror = (e) => {
                reject(e.target.error);
                return;
            };
        });
    }
    add(objectStore, data) {
        return new Promise((resolve, reject) => {
            const request = objectStore.add(data);
            request.onsuccess = (e) => {
                resolve(e.target.result);
            };
            request.onerror = (e) => {
                reject(e.target.error);
            };
        });
    }
    update(objectStore, data) {
        return new Promise((resolve, reject) => {
            const request = objectStore.put(data);
            request.onsuccess = (e) => {
                // @ts-ignore
                resolve(e.target.result);
            };
            request.onerror = (e) => {
                // @ts-ignore
                reject(e.target.error);
            };
        });
    }
    deleteByUUID(objectStore, uuid) {
        return new Promise((resolve, reject) => {
            const request = objectStore.delete(uuid);
            request.onsuccess = (e) => {
                resolve(e.target.result);
            };
            request.onerror = (e) => {
                reject(e.target.error);
            };
        });
    }
    /**
     * Async Search through specific ObjectStore, looking for a specific searchValue
     * @param searchValue The value to search for (if null, all values in the range are valid)
     * @param range The range in which should be searched
     * @param objectStore The objectStore(Datasheet) in which should be searched
     * @param indexName The index(parameter), in which the value should be searched
     * @param multiSearch If the cursor should look for more then one index value matching the search criteria -> Results in an Array as return value
     */
    searchWithCursor(searchValue, range, objectStore, indexName, multiSearch = false) {
        return new Promise((resolve, reject) => {
            let index = objectStore.index(indexName);
            let cursor;
            //If multisearch is on, this is used to store all results
            let resultArray = [];
            if (range) {
                cursor = index.openCursor(range, 'next');
            }
            else {
                cursor = index.openCursor();
            }
            cursor.onsuccess = (ev) => {
                let request = ev.target;
                let cursor = request.result;
                if (!cursor) {
                    if (multiSearch) {
                        resolve(resultArray);
                        return;
                    }
                    else {
                        reject("searchValue can't be found");
                        return;
                    }
                }
                //Enter if statement, when the search Value is not null and not match the cursor key
                if (cursor.key != searchValue && searchValue != null) {
                    cursor.continue();
                }
                let id = cursor.primaryKey;
                let idObject = { id: id };
                let resultObject = Object.assign(idObject, cursor.value);
                if (multiSearch) {
                    resultArray.push(resultObject);
                    cursor.continue();
                }
                else {
                    resolve(resultObject);
                    return;
                }
            };
            cursor.onerror = (e) => {
                let request = e.target;
                reject(request.error);
                return;
            };
        });
    }
}
//# sourceMappingURL=SaveManager.js.map