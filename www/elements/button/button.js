var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Button extends HTMLElement {
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
        return [];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
        }
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/elements/button/button.html");
            const text = yield response.text();
            const content = this.innerHTML;
            this.innerHTML = text;
            this.querySelector("button").innerHTML = content;
            //const shadow = this.attachShadow({mode: "open"});
            //const content = document.createElement('span');
            //content.textContent = this.textContent; // Zugriff auf den Inhalt zwischen den Tags
            //shadow.appendChild(content);
        });
    }
}
// @ts-ignore
function init() {
    if (window.customElements.get("hu-button") === undefined) {
        window.customElements.define('hu-button', Button);
    }
}
init();
//# sourceMappingURL=button.js.map