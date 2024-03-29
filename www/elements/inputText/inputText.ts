class InputText extends HTMLElement{

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
        return ['placeholder','length']
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string){
        switch (name) {
            case "placeholder":
                this.placeholderAttributeChanged(newValue);
                break;
            case "length":
                this.maxLengthAttributeChanged(newValue);
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

    private maxLengthAttributeChanged(newValue:string): void{
        if(this.querySelector("input") === null) return;
        let valueInt = parseInt(newValue);
        if(isNaN(valueInt)) throw new Error("length Attribute needs to be a number");
        this.querySelector("input").setAttribute("maxlength", valueInt.toString());
    }

    /**
     * It fetches the HTML file and then renders it.
     */
    private async render(): Promise<void> {
        const response = await fetch("/elements/inputText/inputText.html")
        const text = await response.text()

        this.innerHTML = text;

        //ReRender Placeholder
        if (this.getAttribute("placeholder")) this.placeholderAttributeChanged(this.getAttribute("placeholder"))
        if (this.getAttribute("length")) this.maxLengthAttributeChanged(this.getAttribute("length"))

    }
    private renderNewTitle(placeholder: string): void{
        if(this.querySelector("input") === null) return;
        this.querySelector("input").setAttribute("placeholder", placeholder);
    }
}
function init() {
    if(window.customElements.get("hu-inputtext") === undefined) {
        window.customElements.define('hu-inputtext', InputText);
    }
}

init();
