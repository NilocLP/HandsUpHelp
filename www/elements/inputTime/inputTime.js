class InputTime extends HTMLElement {
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
        fetch("../../elements/inputTime/inputTime.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;
            });
        });
    }
}
window.customElements.define('hu-inputtime', InputTime);
//# sourceMappingURL=inputTime.js.map