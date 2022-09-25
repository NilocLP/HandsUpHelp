class InputText extends HTMLElement{

    constructor() {
        super();
    }
    connectedCallback(){
        this.render();
    }

    static get observedAttributes(){
        return ['placeholder']
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string){
        switch (name) {
            case "placeholder":
                this.placeholderAttributeChanged(newValue);
                break;
        }
    }

    /**
     * > When the placeholder attribute changes, render a new title with the new value
     * @param newValue - The new value of the attribute.
     */
    private placeholderAttributeChanged(newValue:String): void{
        this.renderNewTitle(<string>newValue)
    }

    /**
     * It fetches the HTML file and then renders it.
     */
    private render(): void{
        fetch("../../elements/inputText/inputText.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;

                //ReRender Placeholder
                if(this.getAttribute("placeholder")) this.placeholderAttributeChanged(this.getAttribute("placeholder"))
            })
        });

    }
    private renderNewTitle(placeholder: string): void{
        if(this.querySelector("input") === null) return;
        this.querySelector("input").setAttribute("placeholder", placeholder);
    }
}
window.customElements.define('hu-inputtext', InputText);
