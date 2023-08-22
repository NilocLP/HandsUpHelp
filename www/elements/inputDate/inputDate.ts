class InputDate extends HTMLElement{

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

    /**
     * It fetches the HTML file and then renders it.
     */
    private async render(): Promise<void> {
        const response = await fetch("/elements/inputDate/inputDate.html")
        const text = await response.text()

        this.innerHTML = text;


    }

}
// @ts-ignore
function init() {
    if(window.customElements.get("hu-inputdate") === undefined) {
        window.customElements.define('hu-inputdate', InputDate);
    }
}

init();