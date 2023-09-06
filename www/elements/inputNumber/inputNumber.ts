class InputNumber extends HTMLElement{

    private _maxNumber:number;
    private _numberBackup:string;
    private _rendered: boolean = false;


    constructor() {
        super();
    }
    async connectedCallback() {
        await this.render();

        this._rendered = true;
        const event = new CustomEvent('objectRendered');
        this.dispatchEvent(event);
    }

    get rendered(){
        return this._rendered;
    }

    static get observedAttributes(){
        return ['placeholder','maxvalue']
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string){
        switch (name) {
            case "placeholder":
                this.placeholderAttributeChanged(newValue);
                break;
            case "maxvalue":
                this.maxValueAttributeChanged(newValue);
                break;
        }
    }

    /**
     * > When the placeholder attribute changes, render a new title with the new value
     * @param newValue - The new value of the attribute.
     */
    private placeholderAttributeChanged(newValue:string): void{
        this.renderNewTitle(newValue)
    }

    private maxValueAttributeChanged(newValue:string): void{
        if(this.querySelector("input") === null) return;
        let valueInt = parseInt(newValue);
        if(isNaN(valueInt)) throw new Error("maxValue Attribute needs to be a number");
        this._maxNumber = valueInt;
        this.querySelector("input").setAttribute("max", valueInt.toString());
    }

    /**
     * It fetches the HTML file and then renders it.
     */
    private async render(): Promise<void> {
        const response = await fetch("/elements/inputNumber/inputNumber.html")
        const text = await response.text();

        this.innerHTML = text;
        this.querySelector("input").addEventListener("input", this.handleMaxInput.bind(this));
        this.querySelector("input").addEventListener("input", this.handleValueChanged.bind(this));

        //ReRender Placeholder
        if (this.getAttribute("placeholder")) this.placeholderAttributeChanged(this.getAttribute("placeholder"))
        if (this.getAttribute("maxValue")) this.maxValueAttributeChanged(this.getAttribute("maxValue"))
    }
    private renderNewTitle(placeholder: string): void{
        if(this.querySelector("input") === null) return;
        this.querySelector("input").setAttribute("placeholder", placeholder);
    }

    private handleValueChanged(event){
        let value = event.currentTarget.value;
        const toggleEvent = new CustomEvent("inputChanged", { detail: value });
        this.dispatchEvent(toggleEvent);
    }

    public setValue(value: number){
        let inputElement = this.querySelector("input");
        inputElement.value = value.toString();
    }

    private handleMaxInput(){
        if(this._maxNumber == undefined) return;
        if(this._maxNumber == -1) return;
        let enteredValue = this.querySelector("input").value;
        let enteredNumber = parseInt(enteredValue);
        if(enteredNumber > this._maxNumber){
            this.querySelector("input").value = this._numberBackup;
        }
        this._numberBackup = this.querySelector("input").value
    }
}
// @ts-ignore
function init() {
    if(window.customElements.get("hu-inputnumber") === undefined) {
        window.customElements.define('hu-inputnumber', InputNumber);
    }
}

init();