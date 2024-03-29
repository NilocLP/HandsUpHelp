var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class InputDate extends HTMLElement {
    constructor() {
        super();
        this._rendered = false;
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.render();
            this.querySelector(".hu-input").addEventListener("input", (e) => {
                const event = new CustomEvent('hu-dateChanged');
                this.dispatchEvent(event);
            });
            this._rendered = true;
            const event = new CustomEvent('objectRendered');
            this.dispatchEvent(event);
        });
    }
    get rendered() {
        return this._rendered;
    }
    get value() {
        let input = this.querySelector(".hu-input");
        return input.value;
    }
    set value(value) {
        let input = this.querySelector(".hu-input");
        input.value = value;
    }
    /**
     * It fetches the HTML file and then renders it.
     */
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/elements/inputDate/inputDate.html");
            const text = yield response.text();
            this.innerHTML = text;
        });
    }
}
// @ts-ignore
function init() {
    if (window.customElements.get("hu-inputdate") === undefined) {
        window.customElements.define('hu-inputdate', InputDate);
    }
}
init();
//# sourceMappingURL=inputDate.js.map