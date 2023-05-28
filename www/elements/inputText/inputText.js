class InputText extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }
    static get observedAttributes() {
        return ['placeholder', 'length'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
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
    placeholderAttributeChanged(newValue) {
        this.renderNewTitle(newValue);
    }
    maxLengthAttributeChanged(newValue) {
        if (this.querySelector("input") === null)
            return;
        let valueInt = parseInt(newValue);
        if (isNaN(valueInt))
            throw new Error("length Attribute needs to be a number");
        this.querySelector("input").setAttribute("maxlength", valueInt.toString());
    }
    /**
     * It fetches the HTML file and then renders it.
     */
    render() {
        fetch("../../elements/inputText/inputText.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;
                //ReRender Placeholder
                if (this.getAttribute("placeholder"))
                    this.placeholderAttributeChanged(this.getAttribute("placeholder"));
                if (this.getAttribute("length"))
                    this.maxLengthAttributeChanged(this.getAttribute("length"));
            });
        });
    }
    renderNewTitle(placeholder) {
        if (this.querySelector("input") === null)
            return;
        this.querySelector("input").setAttribute("placeholder", placeholder);
    }
}
window.customElements.define('hu-inputtext', InputText);
//# sourceMappingURL=inputText.js.map