class Navbar extends HTMLElement {
    constructor() {
        super();
        this._locations = {
            stats: "../../screens/statistics/statistics.html",
            calender: "../../screens/calender/calender.html",
            settings: "../../screens/settings/settings.html"
        };
        this.clickHandler = this.clickHandler.bind(this);
    }
    get locations() {
        return this._locations;
    }
    set locations(value) {
        this._locations = value;
    }
    connectedCallback() {
        this.render();
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
        fetch("/elements/navbar/navbar.html").then((response) => {
            response.text().then((text) => {
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
        });
    }
    clickHandler(e) {
        const clickedElement = e.target;
        switch (clickedElement.id) {
            case "navbar_stats":
                if (!this.validLocation(this._locations.stats))
                    return;
                window.location.href = this._locations.stats;
                break;
            case "navbar_settings":
                if (!this.validLocation(this._locations.settings))
                    return;
                window.location.href = this._locations.settings;
                break;
            case "navbar_calender":
                if (!this.validLocation(this._locations.calender))
                    return;
                window.location.href = this._locations.calender;
                break;
        }
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
window.customElements.define('hu-navbar', Navbar);
//# sourceMappingURL=navbar.js.map