var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Navbar extends HTMLElement {
    constructor() {
        super();
        this._rendered = false;
        this.clickHandler = this.clickHandler.bind(this);
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
        return ['activepage'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "activepage":
                this.activePageChanged(newValue);
                break;
        }
    }
    activePageChanged(newValue) {
        if (!(this.getElementsByClassName("current").length > 0))
            return;
        this.getElementsByClassName("current")[0].classList.remove("current");
        this.getElementsByClassName("navbar_icons")[0].getElementsByTagName("div")[newValue].classList.add("current");
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/elements/navbar/navbar.html");
            const text = yield response.text();
            this.innerHTML = text;
            try {
                const ACTIVE_PAGE = this.getAttribute("activePage");
                this.getElementsByClassName("navbar_icons")[0].getElementsByTagName("div")[ACTIVE_PAGE].classList.add("current");
            }
            catch (e) {
            }
            this.querySelector("#navbar_stats").addEventListener('click', this.clickHandler);
            this.querySelector("#navbar_calender").addEventListener('click', this.clickHandler);
            this.querySelector("#navbar_settings").addEventListener('click', this.clickHandler);
        });
    }
    clickHandler(e) {
        const clickedElement = e.target;
        let page = -1;
        switch (clickedElement.id) {
            case "navbar_stats":
                page = 0;
                break;
            case "navbar_calender":
                page = 1;
                break;
            case "navbar_settings":
                page = 2;
                break;
        }
        //If page to switch to already selected -> abort
        const activePage = parseInt(this.getAttribute("activePage"));
        if (activePage === page) {
            return;
        }
        this.setAttribute("activePage", String(page));
        const event = new CustomEvent('pageSwitch', {
            detail: {
                page: page,
            },
        });
        this.dispatchEvent(event);
    }
    validLocation(location) {
        if (location === undefined)
            return false;
        if (location === null)
            return false;
        if (location === "")
            return false;
        return true;
    }
}
// @ts-ignore
function init() {
    if (window.customElements.get("hu-navbar") === undefined) {
        window.customElements.define('hu-navbar', Navbar);
    }
}
init();
//# sourceMappingURL=navbar.js.map