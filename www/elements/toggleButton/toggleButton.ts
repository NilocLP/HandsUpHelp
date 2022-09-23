class ToggleButton extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        this.render();

        this.addEventListener("click", this.toggleChange);
    }

    static get observedAttributes() {
        return ['checked']
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch (name) {
            case "checked":
                this.checkedAttributeChanged(newValue);
                break;
        }
    }

    private checkedAttributeChanged(newValue: string): void {
        if (!(this.getElementsByClassName("togglebutton").length > 0)) return;
        if (newValue === "true") {
            this.getElementsByClassName("togglebutton")[0].classList.add("toggled");
        } else if (newValue === "false") {
            if (!this.getElementsByClassName("togglebutton")[0].classList.contains("toggled")) return;
            this.getElementsByClassName("togglebutton")[0].classList.remove("toggled");
        }
    }

    private toggleChange(event: any): void{
        if (event.currentTarget.getAttribute("checked") === "true") {
            event.currentTarget.setAttribute("checked", "false");

        }else if (event.currentTarget.getAttribute("checked") === "false") {
            event.currentTarget.setAttribute("checked", "true");

        }
    }

    private render(): void {
        fetch("../../elements/toggleButton/toggleButton.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;

                const CHECKED = this.getAttribute("checked");
                this.checkedAttributeChanged(CHECKED);
            })
        });
    }


}

window.customElements.define('hu-togglebutton', ToggleButton);