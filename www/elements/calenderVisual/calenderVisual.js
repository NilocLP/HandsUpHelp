var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CalenderVisual extends HTMLElement {
    constructor() {
        super();
        this._rendered = false;
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.renderCalender();
            this._rendered = true;
            const event = new CustomEvent('objectRendered');
            this.dispatchEvent(event);
        });
    }
    get rendered() {
        return this._rendered;
    }
    /**
     * It fetches the HTML file, then it renders the HTML file, then it renders the lessons
     */
    renderCalender() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/elements/calenderVisual/calenderVisual.html");
            const text = yield response.text();
            this.innerHTML = text;
            for (let i = 0; i < 50; i++) {
                //TODO Render Lessons correctly by using Calender Class and Lesson Class values
                let placeholder = document.createElement("div");
                //TODO Add checks to identify lesson
                placeholder.classList.add("notUsed");
                placeholder.appendChild(document.createElement("div"));
                placeholder.addEventListener("click", () => {
                    this.renderInput(null);
                });
                this.querySelector(".body").appendChild(placeholder);
            }
        });
    }
    renderInput(lesson) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/elements/calenderVisual/calenderVisualInput.html");
            const text = yield response.text();
            const visualInput = document.createElement("section");
            visualInput.setAttribute("id", "hu-calender-input");
            visualInput.innerHTML = text;
            document.querySelector("body").insertBefore(visualInput, document.querySelector("main"));
            document.querySelector("#hu-calender-input-save").addEventListener("click", () => {
                this.handelInputSubmit();
            });
            //TODO Render Data provided by the Lesson
        });
    }
    handelInputSubmit() {
        //TODO Safe Data in Lesson
        this.removeInput();
    }
    removeInput() {
        document.getElementById("hu-calender-input").remove();
    }
}
// @ts-ignore
function init() {
    if (window.customElements.get("hu-calender") === undefined) {
        window.customElements.define('hu-calender', CalenderVisual);
    }
}
init();
//# sourceMappingURL=calenderVisual.js.map