class Button extends HTMLElement{
    constructor() {
        super();
    }
    connectedCallback(){
        this.render();
    }

    static get observedAttributes(){
        return ['text']
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string){
        switch (name) {
            case "text":
                this.textAttributeChanged(newValue);
                break;
        }
    }

    private textAttributeChanged(newValue: string): void {
        if (!(this.getElementsByTagName("input").length > 0)) return;
        this.getElementsByTagName("input")[0].setAttribute("value", newValue);
    }

    private render(): void{
        fetch("../../elements/button/button.html").then((response: Response) => {
            response.text().then((text: string) => {
                this.innerHTML = text;

                try{
                    const TEXT: string = this.getAttribute("text");
                    this.getElementsByTagName("input")[0].setAttribute("value",TEXT);
                }catch (e){}
            })
        });
    }
}
window.customElements.define('hu-button', Button);