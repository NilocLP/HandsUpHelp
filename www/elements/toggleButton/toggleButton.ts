class ToggleButton extends HTMLElement {

    private _rendered: boolean = false;

    constructor() {
        super();

    }

    async connectedCallback() {
        await this.render();

        this.addEventListener("click", this.toggleChange);

        this._rendered = true;
        const event = new CustomEvent('objectRendered');
        this.dispatchEvent(event);
    }

    get rendered(){
        return this._rendered;
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
        let checked: boolean;
        if (event.currentTarget.getAttribute("checked") === "true") {
            event.currentTarget.setAttribute("checked", "false");
            checked = false;
        }else if (event.currentTarget.getAttribute("checked") === "false") {
            event.currentTarget.setAttribute("checked", "true");
            checked = true;
        }
        const toggleEvent = new CustomEvent("toggleChange", { detail: checked });
        this.dispatchEvent(toggleEvent);
    }

    private async render(): Promise<void> {
        const response = await fetch("/elements/toggleButton/toggleButton.html")
        const text = await response.text()

        this.innerHTML = text;

        const CHECKED = this.getAttribute("checked");
        this.checkedAttributeChanged(CHECKED);

    }


}
// @ts-ignore
function init() {
    if(window.customElements.get("hu-togglebutton") === undefined) {
        window.customElements.define('hu-togglebutton', ToggleButton);
    }
}

init();