class InputDate extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }
    /**
     * It fetches the HTML file and then renders it.
     */
    render() {
        fetch("../../elements/inputDate/inputDate.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;
            });
        });
    }
}
window.customElements.define('hu-inputdate', InputDate);
//# sourceMappingURL=inputDate.js.map