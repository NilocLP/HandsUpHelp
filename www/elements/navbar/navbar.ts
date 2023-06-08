class Navbar extends HTMLElement {
    constructor() {
        super();
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
            })
        });
    }
}

window.customElements.define('hu-navbar', Navbar);