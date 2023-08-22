var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class InputText extends HTMLElement {
    constructor() {
        super();
        this._rendered = false;
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.render();
            this._rendered = true;
            const event = new CustomEvent('objectRendered');
            this.dispatchEvent(event);
        });
    }
    get rendered() {
        return this._rendered;
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
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/elements/inputText/inputText.html");
            const text = yield response.text();
            this.innerHTML = text;
            //ReRender Placeholder
            if (this.getAttribute("placeholder"))
                this.placeholderAttributeChanged(this.getAttribute("placeholder"));
            if (this.getAttribute("length"))
                this.maxLengthAttributeChanged(this.getAttribute("length"));
        });
    }
    renderNewTitle(placeholder) {
        if (this.querySelector("input") === null)
            return;
        this.querySelector("input").setAttribute("placeholder", placeholder);
    }
}
function init() {
    if (window.customElements.get("hu-inputtext") === undefined) {
        window.customElements.define('hu-inputtext', InputText);
    }
}
init();
//# sourceMappingURL=inputText.js.map