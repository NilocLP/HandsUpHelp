class Button extends HTMLElement{

    private _rendered: boolean = false;

    constructor() {
        super();
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

    static get observedAttributes(){
        return []
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string){
        switch (name) {

        }
    }

    private async render(): Promise<void> {
        const response = await fetch("/elements/button/button.html")
        const text = await response.text()

        const content = this.innerHTML;
        this.innerHTML = text;
        this.querySelector("button").innerHTML = content;
        //const shadow = this.attachShadow({mode: "open"});
        //const content = document.createElement('span');
        //content.textContent = this.textContent; // Zugriff auf den Inhalt zwischen den Tags
        //shadow.appendChild(content);

    }
}

// @ts-ignore
function init() {
    if(window.customElements.get("hu-button") === undefined) {
        window.customElements.define('hu-button', Button);
    }
}

init();