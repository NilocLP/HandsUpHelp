var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ToggleButton extends HTMLElement {
    constructor() {
        super();
        this._rendered = false;
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.render();
            this.addEventListener("click", this.toggleChange);
            this._rendered = true;
            const event = new CustomEvent('objectRendered');
            this.dispatchEvent(event);
        });
    }
    get rendered() {
        return this._rendered;
    }
    static get observedAttributes() {
        return ['checked'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "checked":
                this.checkedAttributeChanged(newValue);
                break;
        }
    }
    checkedAttributeChanged(newValue) {
        if (!(this.getElementsByClassName("togglebutton").length > 0))
            return;
        if (newValue === "true") {
            this.getElementsByClassName("togglebutton")[0].classList.add("toggled");
        }
        else if (newValue === "false") {
            if (!this.getElementsByClassName("togglebutton")[0].classList.contains("toggled"))
                return;
            this.getElementsByClassName("togglebutton")[0].classList.remove("toggled");
        }
    }
    toggleChange(event) {
        let checked;
        if (event.currentTarget.getAttribute("checked") === "true") {
            event.currentTarget.setAttribute("checked", "false");
            checked = false;
        }
        else if (event.currentTarget.getAttribute("checked") === "false") {
            event.currentTarget.setAttribute("checked", "true");
            checked = true;
        }
        const toggleEvent = new CustomEvent("toggleChange", { detail: checked });
        this.dispatchEvent(toggleEvent);
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/elements/toggleButton/toggleButton.html");
            const text = yield response.text();
            this.innerHTML = text;
            const CHECKED = this.getAttribute("checked");
            this.checkedAttributeChanged(CHECKED);
        });
    }
}
// @ts-ignore
function init() {
    if (window.customElements.get("hu-togglebutton") === undefined) {
        window.customElements.define('hu-togglebutton', ToggleButton);
    }
}
init();
//# sourceMappingURL=toggleButton.js.map