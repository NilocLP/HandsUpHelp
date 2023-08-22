class Navbar extends HTMLElement {

    private _rendered: boolean = false;

    constructor() {
        super();

        this.clickHandler = this.clickHandler.bind(this);
    }

    async connectedCallback() {
        await this.render();

        this._rendered = true;
        const event = new CustomEvent('objectRendered');
        this.dispatchEvent(event);
    }

    get rendered(){
        return this._rendered;
    }

    static get observedAttributes() {
        return ['activepage']
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case "activepage":
                this.activePageChanged(newValue);
                break;
        }
    }

    private activePageChanged(newValue: string): void {
        if (!(this.getElementsByClassName("current").length > 0)) return;
        this.getElementsByClassName("current")[0].classList.remove("current");
        this.getElementsByClassName("navbar_icons")[0].getElementsByTagName("div")[newValue].classList.add("current");

    }

    private async render(): Promise<void> {
        const response = await fetch("/elements/navbar/navbar.html")
        const text = await response.text()

        this.innerHTML = text;

        try {
            const ACTIVE_PAGE = this.getAttribute("activePage");
            this.getElementsByClassName("navbar_icons")[0].getElementsByTagName("div")[ACTIVE_PAGE].classList.add("current");
        } catch (e) {
        }

        this.querySelector("#navbar_stats").addEventListener('click', this.clickHandler);
        this.querySelector("#navbar_calender").addEventListener('click', this.clickHandler);
        this.querySelector("#navbar_settings").addEventListener('click', this.clickHandler);


    }

    private clickHandler(e) {

        const clickedElement = e.target;
        let page = -1;

        switch (clickedElement.id) {
            case "navbar_stats":
                page = 0
                break;
            case "navbar_calender":
                page = 1
                break;
            case "navbar_settings":
                page = 2
                break;

        }

        //If page to switch to already selected -> abort
        const activePage = parseInt(this.getAttribute("activePage"));
        if(activePage === page){
            return
        }

        this.setAttribute("activePage", String(page));

        const event = new CustomEvent('pageSwitch', {
            detail: {
                page: page,
            },
        });

        this.dispatchEvent(event);
    }

    private validLocation(location: string): boolean {
        if (location === undefined) return false;
        if (location === null) return false;
        if (location === "") return false;
        return true;
    }
}
// @ts-ignore
function init() {
    if(window.customElements.get("hu-navbar") === undefined) {
        window.customElements.define('hu-navbar', Navbar);
    }
}

init();