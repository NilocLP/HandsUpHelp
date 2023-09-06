class Subject{

    private readonly _uuid:string;
    private _name:string;
    private _handsUpGoal:number;
    private _color:SubjectColor;

    constructor( name: string, handsUpGoal: number, color: SubjectColor, uuid?:string) {
        if(uuid){
            this._uuid = uuid;
        }else{
            this._uuid = UUIDUtils.generateUUID();
        }
        this._name = name;
        this._handsUpGoal = handsUpGoal;
        this._color = color;
    }

    get uuid(): string {
        return this._uuid;
    }

    get name(): string {
        return this._name;
    }

    get handsUpGoal(): number {
        return this._handsUpGoal;
    }

    get color(): SubjectColor {
        return this._color;
    }

    public updateSettings(name: string, handsUpGoal: number, color: SubjectColor):void{
        this._name = name;
        this._handsUpGoal = handsUpGoal;
        this._color = color;
    }

    public toJSON(){
        let json = {
            uuid: this._uuid,
            name: this._name,
            handsUpGoal: this._handsUpGoal,
            color: this._color
        }
        return json;
    }


}