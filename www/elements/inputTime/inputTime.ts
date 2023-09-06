class InputTime extends HTMLElement{

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

    public valueAsDateTime(){
        let inputElement:HTMLInputElement = this.querySelector(".hu-input");
        let timeValue = inputElement.value;
        let [hours, minutes] = timeValue.split(":").map(Number);
        let currentDate = new Date();
        let dateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes);
        return dateTime;
    }

    public setValue(date: Date){
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let timeValue = `${hours}:${minutes}`;
        let inputElement:HTMLInputElement = this.querySelector(".hu-input");
        inputElement.value = timeValue;
    }

    public clearValue(){
        let inputElement:HTMLInputElement = this.querySelector(".hu-input");
        inputElement.value = "";
    }

    /**
     * It fetches the HTML file and then renders it.
     */
    private async render(): Promise<void> {
        const response = await fetch("/elements/inputTime/inputTime.html")
        const text = await response.text()

        this.innerHTML = text;
    }

}
// @ts-ignore
function init() {
    if(window.customElements.get("hu-inputtime") === undefined) {
        window.customElements.define('hu-inputtime', InputTime);
    }
}

init();
