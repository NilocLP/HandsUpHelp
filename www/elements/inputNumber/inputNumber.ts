class InputNumber extends HTMLElement{

    private _maxNumber:number;
    private _numberBackup:string;

    constructor() {
        super();
    }
    connectedCallback(){
        this.render();
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
    private render(): void{
        fetch("/elements/inputNumber/inputNumber.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;
                this.querySelector("input").addEventListener("input",this.handleMaxInput.bind(this));
                //ReRender Placeholder
                if(this.getAttribute("placeholder")) this.placeholderAttributeChanged(this.getAttribute("placeholder"))
                if(this.getAttribute("maxValue")) this.maxValueAttributeChanged(this.getAttribute("maxValue"))

            })
        });

    }
    private renderNewTitle(placeholder: string): void{
        if(this.querySelector("input") === null) return;
        this.querySelector("input").setAttribute("placeholder", placeholder);
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
window.customElements.define('hu-inputnumber', InputNumber);
