class Navbar extends HTMLElement {
    constructor() {
        super();

        this.clickHandler = this.clickHandler.bind(this);
    }

    connectedCallback() {
        this.render();
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

    private render(): void {
        fetch("/elements/navbar/navbar.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;

                try {
                    const ACTIVE_PAGE = this.getAttribute("activePage");
                    this.getElementsByClassName("navbar_icons")[0].getElementsByTagName("div")[ACTIVE_PAGE].classList.add("current");
                } catch (e) {}

                this.querySelector("#navbar_stats").addEventListener('click',this.clickHandler);
                this.querySelector("#navbar_calender").addEventListener('click',this.clickHandler);
                this.querySelector("#navbar_settings").addEventListener('click',this.clickHandler);

            })
        });
    }

    private clickHandler(e){

        const clickedElement = e.target;
        const navbarUsed = new CustomEvent("navbarused", {
            detail: {
                id: clickedElement.id,
            },
        });

        this.dispatchEvent(navbarUsed);
    }
}

window.customElements.define('hu-navbar', Navbar);