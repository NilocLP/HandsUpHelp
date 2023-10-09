class UUIDUtils{

    public static generateUUID() {
        let uuid = '', i: number, random: number;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                .toString(16);
        }
        return uuid;
    }

    public static generateNumberID(): number{
        return Math.floor(Math.random() * 100000000000000);
    }
}