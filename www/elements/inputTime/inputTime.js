var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class InputTime extends HTMLElement {
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
    valueAsDateTime() {
        let inputElement = this.querySelector(".hu-input");
        let timeValue = inputElement.value;
        let [hours, minutes] = timeValue.split(":").map(Number);
        let currentDate = new Date();
        let dateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes);
        return dateTime;
    }
    setValue(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let timeValue = `${hours}:${minutes}`;
        let inputElement = this.querySelector(".hu-input");
        inputElement.value = timeValue;
    }
    clearValue() {
        let inputElement = this.querySelector(".hu-input");
        inputElement.value = "";
    }
    /**
     * It fetches the HTML file and then renders it.
     */
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/elements/inputTime/inputTime.html");
            const text = yield response.text();
            this.innerHTML = text;
        });
    }
}
// @ts-ignore
function init() {
    if (window.customElements.get("hu-inputtime") === undefined) {
        window.customElements.define('hu-inputtime', InputTime);
    }
}
init();
//# sourceMappingURL=inputTime.js.map