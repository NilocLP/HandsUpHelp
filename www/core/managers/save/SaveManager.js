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
    getCalenderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const calenderStore = db.transaction('calenders', 'read').objectStore('calenders');
            return this.getById(calenderStore, id);
        });
    }
    addCalender(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
            return this.add(calenderStore, data);
        });
    }
    updateCalender(dataPlusId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
            return this.update(calenderStore, dataPlusId);
        });
    }
    deleteCalenderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
            return this.deleteById(calenderStore, id);
        });
    }
    getSubjectEntryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectEntryStore = db.transaction('subjectEntries', 'read').objectStore('subjectEntries');
            return this.getById(subjectEntryStore, id);
        });
    }
    getSubjectEntrysByTakenCount(takenCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
            let keyRange = IDBKeyRange.only(takenCount);
            return this.searchWithCursor(takenCount, keyRange, subjectStore, "takenCount", true);
        });
    }
    getSubjectEntrysByHandsUpCount(handsUpCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
            let keyRange = IDBKeyRange.only(handsUpCount);
            return this.searchWithCursor(handsUpCount, keyRange, subjectStore, "handsUpCount", true);
        });
    }
    getSubjectEntrysByAssignedSubject(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
            let keyRange = IDBKeyRange.only(subjectId);
            return this.searchWithCursor(subjectId, keyRange, subjectStore, "assignedSubject", true);
        });
    }
    getSubjectEntrysByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
            let keyRange = IDBKeyRange.only(date);
            return this.searchWithCursor(date, keyRange, subjectStore, "date", true);
        });
    }
    getSubjectEntrysByDateRange(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
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
    updateSubjectEntry(dataPlusId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectEntryStore = db.transaction('subjectEntries', 'readwrite').objectStore('subjectEntries');
            return this.update(subjectEntryStore, dataPlusId);
        });
    }
    deleteSubjectEntryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectEntryStore = db.transaction('subjectEntries', 'readwrite').objectStore('subjectEntries');
            return this.deleteById(subjectEntryStore, id);
        });
    }
    getSubjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
            return this.getById(subjectStore, id);
        });
    }
    getSubjectByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
            let keyRange = IDBKeyRange.only(name);
            return this.searchWithCursor(name, keyRange, subjectStore, "name");
        });
    }
    addSubject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
            return this.add(subjectStore, data);
        });
    }
    updateSubject(dataPlusId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
            return this.update(subjectStore, dataPlusId);
        });
    }
    deleteSubjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this._dbManager.getDatabase();
            const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
            return this.deleteById(subjectStore, id);
        });
    }
    getById(objectStore, id) {
        return new Promise((resolve, reject) => {
            const request = objectStore.get(id);
            request.onsuccess = (e) => {
                resolve(e.target.result);
            };
            request.onerror = (e) => {
                reject(e.target.error);
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
            const request = objectStore.update(data);
            request.onsuccess = (e) => {
                resolve(e.target.result);
            };
            request.onerror = (e) => {
                reject(e.target.error);
            };
        });
    }
    deleteById(objectStore, id) {
        return new Promise((resolve, reject) => {
            const request = objectStore.delete(id);
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
                    }
                    else {
                        reject("searchValue can't be found");
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
                }
            };
            cursor.onerror = (e) => {
                let request = e.target;
                reject(request.error);
            };
        });
    }
}
//# sourceMappingURL=SaveManager.js.map