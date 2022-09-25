class InputTime extends HTMLElement{

    constructor() {
        super();
    }
    connectedCallback(){
        this.render();
    }

    /**
     * It fetches the HTML file and then renders it.
     */
    private render(): void{
        fetch("../../elements/inputTime/inputTime.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;
            })
        });
    }

}
window.customElements.define('hu-inputtime', InputTime);
