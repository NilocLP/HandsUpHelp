/**
 * Handels the communication with the database for Storing and Getting Objects
 */
class SaveManager {


    private readonly _dbManager:DatabaseManager = null;

    constructor(databaseManager: DatabaseManager) {
        this._dbManager = databaseManager;
    }


    get dbManager(): DatabaseManager {
        return this._dbManager;
    }

    public async getCalenderByUUID(uuid: string) {
        const db = await this._dbManager.getDatabase()
        const calenderStore = db.transaction('calenders', 'readonly').objectStore('calenders');
        return this.getByUUID(calenderStore, uuid);
    }

    public async getAllCalenders() {
        const db = await this._dbManager.getDatabase()
        const calenderStore = db.transaction('calenders', 'readonly').objectStore('calenders');
        return this.getAll(calenderStore);
    }

    public async addCalender(data: {}) {
        const db = await this._dbManager.getDatabase()
        const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
        return this.add(calenderStore, data);
    }

    public async updateCalender(data: {}) {
        const db = await this._dbManager.getDatabase()
        const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
        return this.update(calenderStore, data);
    }

    public async deleteCalenderByUUID(uuid: string) {
        const db = await this._dbManager.getDatabase()
        const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
        return this.deleteByUUID(calenderStore, uuid);
    }

    public async getSubjectEntryByUUID(uuid: string) {
        const db = await this._dbManager.getDatabase()
        const subjectEntryStore = db.transaction('subjectEntries', 'readonly').objectStore('subjectEntries');
        return this.getByUUID(subjectEntryStore, uuid);
    }

    public async getAllSubjectEntrys() {
        const db = await this._dbManager.getDatabase()
        const subjectEntryStore = db.transaction('subjectEntries', 'readonly').objectStore('subjectEntries');
        return this.getAll(subjectEntryStore);
    }

    public async getSubjectEntrysByTakenCount(takenCount: number) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readonly').objectStore('subjects');
        let keyRange: IDBKeyRange = IDBKeyRange.only(takenCount);
        return this.searchWithCursor(takenCount, keyRange, subjectStore, "takenCount", true);
    }

    public async getSubjectEntrysByHandsUpCount(handsUpCount: number) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readonly').objectStore('subjects');
        let keyRange: IDBKeyRange = IDBKeyRange.only(handsUpCount);
        return this.searchWithCursor(handsUpCount, keyRange, subjectStore, "handsUpCount", true);
    }

    public async getSubjectEntrysByAssignedSubject(subjectId: number) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readonly').objectStore('subjects');
        let keyRange = IDBKeyRange.only(subjectId)
        return this.searchWithCursor(subjectId, keyRange, subjectStore, "assignedSubject", true);
    }

    public async getSubjectEntrysByDate(date: string) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readonly').objectStore('subjects');
        let keyRange = IDBKeyRange.only(date)
        return this.searchWithCursor(date, keyRange, subjectStore, "date", true);
    }

    public async getSubjectEntrysByDateRange(startDate: string, endDate: string) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readonly').objectStore('subjects');
        let keyRange = IDBKeyRange.bound(startDate, endDate)
        return this.searchWithCursor(null, keyRange, subjectStore, "date", true);

    }

    public async addSubjectEntry(data: {}) {
        const db = await this._dbManager.getDatabase()
        const subjectEntryStore = db.transaction('subjectEntries', 'readwrite').objectStore('subjectEntries');
        return this.add(subjectEntryStore, data);
    }

    public async updateSubjectEntry(data: {}) {
        const db = await this._dbManager.getDatabase()
        const subjectEntryStore = db.transaction('subjectEntries', 'readwrite').objectStore('subjectEntries');
        return this.update(subjectEntryStore, data);
    }

    public async deleteSubjectEntryByUUID(uuid: string) {
        const db = await this._dbManager.getDatabase()
        const subjectEntryStore = db.transaction('subjectEntries', 'readwrite').objectStore('subjectEntries');
        return this.deleteByUUID(subjectEntryStore, uuid);
    }

    public async getSubjectByUUID(uuid: string) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readonly').objectStore('subjects');
        return this.getByUUID(subjectStore, uuid);
    }

    public async getSubjectByName(name: string) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readonly').objectStore('subjects');
        let keyRange: IDBKeyRange = IDBKeyRange.only(name);
        return this.searchWithCursor(name, keyRange, subjectStore, "name");
    }

    public async getAllSubjects() {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readonly').objectStore('subjects');
        return this.getAll(subjectStore);
    }

    public async addSubject(data: {}) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
        return this.add(subjectStore, data);
    }

    public async updateSubject(data: {}) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
        return this.update(subjectStore, data);
    }

    public async deleteSubjectByUUID(uuid: string) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
        return this.deleteByUUID(subjectStore, uuid);
    }


    private getByUUID(objectStore, uuid){
        return new Promise((resolve, reject) => {

            const request = objectStore.get(uuid);

            request.onsuccess = (e) => {
                resolve(e.target.result)
            }

            request.onerror = (e) => {
                reject(e.target.error)
            }

        });
    }

    private getAll(objectStore){
        return new Promise((resolve, reject) => {

            const request = objectStore.openCursor();
            let resultArray = [];

            request.onsuccess = (e) => {
                let cursor:IDBCursorWithValue = e.target.result
                if(!cursor){
                    resolve(resultArray);
                    return;
                }

                let result = {
                    id: cursor.key,
                    value: cursor.value
                }
                resultArray.push(result)
                cursor.continue();
            }

            request.onerror = (e) => {
                reject(e.target.error)
                return;
            }

        });
    }

    private add(objectStore, data){
        return new Promise((resolve, reject) => {

            const request = objectStore.add(data);

            request.onsuccess = (e) => {
                resolve(e.target.result)
            }

            request.onerror = (e) => {
                reject(e.target.error)
            }

        });
    }

    private update(objectStore: IDBObjectStore, data){
        return new Promise((resolve, reject) => {
            const request = objectStore.put(data);

            request.onsuccess = (e) => {
                // @ts-ignore
                resolve(e.target.result)
            }

            request.onerror = (e) => {
                // @ts-ignore
                reject(e.target.error)
            }

        });
    }

    private deleteByUUID(objectStore, uuid){
        return new Promise((resolve, reject) => {

            const request = objectStore.delete(uuid);

            request.onsuccess = (e) => {
                resolve(e.target.result)
            }

            request.onerror = (e) => {
                reject(e.target.error)
            }

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
    private searchWithCursor(searchValue: any, range: IDBKeyRange, objectStore: IDBObjectStore, indexName: string, multiSearch: boolean = false){
        return new Promise((resolve, reject) => {
            let index = objectStore.index(indexName);
            let cursor;
            //If multisearch is on, this is used to store all results
            let resultArray = [];

            if(range){
                cursor = index.openCursor(range, 'next');
            }else{
                cursor = index.openCursor();
            }

            cursor.onsuccess = (ev) => {
                let request:IDBRequest = ev.target as IDBRequest;
                let cursor:IDBCursorWithValue = request.result;

                if(!cursor){
                    if(multiSearch){
                        resolve(resultArray);
                        return;
                    }else {
                        reject("searchValue can't be found")
                        return;
                    }
                }
                //Enter if statement, when the search Value is not null and not match the cursor key
                if(cursor.key != searchValue && searchValue != null){
                    cursor.continue();
                }
                
                let id = cursor.primaryKey;
                let idObject = {id: id}
                let resultObject = Object.assign(idObject, cursor.value);

                if(multiSearch){
                    resultArray.push(resultObject);
                    cursor.continue();
                }else{
                    resolve(resultObject);
                    return;
                }
            }

            cursor.onerror = (e) => {
                let request:IDBRequest = e.target as IDBRequest;
                reject(request.error);
                return;
            }
        });
    }
}