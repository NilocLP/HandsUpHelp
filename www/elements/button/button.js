class Button extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }
    static get observedAttributes() {
        return ['text'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "text":
                this.textAttributeChanged(newValue);
                break;
        }
    }
    textAttributeChanged(newValue) {
        if (!(this.getElementsByTagName("input").length > 0))
            return;
        this.getElementsByTagName("input")[0].setAttribute("value", newValue);
    }
    render() {
        fetch("../../elements/button/button.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;
                try {
                    const TEXT = this.getAttribute("text");
                    this.getElementsByTagName("input")[0].setAttribute("value", TEXT);
                }
                catch (e) { }
            });
        });
    }
}
window.customElements.define('hu-button', Button);
//# sourceMappingURL=button.js.map