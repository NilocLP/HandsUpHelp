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

    public async getCalenderById(id: number) {
        const db = await this._dbManager.getDatabase()
        const calenderStore = db.transaction('calenders', 'read').objectStore('calenders');
        return this.getById(calenderStore, id);
    }

    public async addCalender(data: {}) {
        const db = await this._dbManager.getDatabase()
        const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
        return this.add(calenderStore, data);
    }

    public async updateCalender(dataPlusId: {}) {
        const db = await this._dbManager.getDatabase()
        const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
        return this.update(calenderStore, dataPlusId);
    }

    public async deleteCalenderById(id: number) {
        const db = await this._dbManager.getDatabase()
        const calenderStore = db.transaction('calenders', 'readwrite').objectStore('calenders');
        return this.deleteById(calenderStore, id);
    }

    public async getSubjectEntryById(id: number) {
        const db = await this._dbManager.getDatabase()
        const subjectEntryStore = db.transaction('subjectEntries', 'read').objectStore('subjectEntries');
        return this.getById(subjectEntryStore, id);
    }

    public async getSubjectEntrysByTakenCount(takenCount: number) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
        let keyRange: IDBKeyRange = IDBKeyRange.only(takenCount);
        return this.searchWithCursor(takenCount, keyRange, subjectStore, "takenCount", true);
    }

    public async getSubjectEntrysByHandsUpCount(handsUpCount: number) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
        let keyRange: IDBKeyRange = IDBKeyRange.only(handsUpCount);
        return this.searchWithCursor(handsUpCount, keyRange, subjectStore, "handsUpCount", true);
    }

    public async getSubjectEntrysByAssignedSubject(subjectId: number) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
        let keyRange = IDBKeyRange.only(subjectId)
        return this.searchWithCursor(subjectId, keyRange, subjectStore, "assignedSubject", true);
    }

    public async getSubjectEntrysByDate(date: string) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
        let keyRange = IDBKeyRange.only(date)
        return this.searchWithCursor(date, keyRange, subjectStore, "date", true);
    }

    public async getSubjectEntrysByDateRange(startDate: string, endDate: string) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
        let keyRange = IDBKeyRange.bound(startDate, endDate)
        return this.searchWithCursor(null, keyRange, subjectStore, "date", true);

    }

    public async addSubjectEntry(data: {}) {
        const db = await this._dbManager.getDatabase()
        const subjectEntryStore = db.transaction('subjectEntries', 'readwrite').objectStore('subjectEntries');
        return this.add(subjectEntryStore, data);
    }

    public async updateSubjectEntry(dataPlusId: {}) {
        const db = await this._dbManager.getDatabase()
        const subjectEntryStore = db.transaction('subjectEntries', 'readwrite').objectStore('subjectEntries');
        return this.update(subjectEntryStore, dataPlusId);
    }

    public async deleteSubjectEntryById(id: number) {
        const db = await this._dbManager.getDatabase()
        const subjectEntryStore = db.transaction('subjectEntries', 'readwrite').objectStore('subjectEntries');
        return this.deleteById(subjectEntryStore, id);
    }

    public async getSubjectById(id: number) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
        return this.getById(subjectStore, id);
    }

    public async getSubjectByName(name: string) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'read').objectStore('subjects');
        let keyRange: IDBKeyRange = IDBKeyRange.only(name);
        return this.searchWithCursor(name, keyRange, subjectStore, "name");
    }

    public async addSubject(data: {}) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
        return this.add(subjectStore, data);
    }

    public async updateSubject(dataPlusId: {}) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
        return this.update(subjectStore, dataPlusId);
    }

    public async deleteSubjectById(id: number) {
        const db = await this._dbManager.getDatabase()
        const subjectStore = db.transaction('subjects', 'readwrite').objectStore('subjects');
        return this.deleteById(subjectStore, id);
    }


    private getById(objectStore, id){
        return new Promise((resolve, reject) => {

            const request = objectStore.get(id);

            request.onsuccess = (e) => {
                resolve(e.target.result)
            }

            request.onerror = (e) => {
                reject(e.target.error)
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

    private update(objectStore, data){
        return new Promise((resolve, reject) => {

            const request = objectStore.update(data);

            request.onsuccess = (e) => {
                resolve(e.target.result)
            }

            request.onerror = (e) => {
                reject(e.target.error)
            }

        });
    }

    private deleteById(objectStore, id){
        return new Promise((resolve, reject) => {

            const request = objectStore.delete(id);

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
    public searchWithCursor(searchValue: any, range: IDBKeyRange, objectStore: IDBObjectStore, indexName: string, multiSearch: boolean = false){
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
                    }else {
                        reject("searchValue can't be found")
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
                }
            }

            cursor.onerror = (e) => {
                let request:IDBRequest = e.target as IDBRequest;
                reject(request.error);
            }
        });
    }
}