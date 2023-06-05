class Button extends HTMLElement{
    constructor() {
        super();
    }
    connectedCallback(){
        this.render();
    }

    static get observedAttributes(){
        return []
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string){
        switch (name) {

        }
    }

    private render(): void{
        fetch("../../elements/button/button.html").then((response: Response) => {
            response.text().then((text: string) => {
                const content = this.innerHTML;
                this.innerHTML = text;
                this.querySelector("button").innerHTML = content;
                //const shadow = this.attachShadow({mode: "open"});
                //const content = document.createElement('span');
                //content.textContent = this.textContent; // Zugriff auf den Inhalt zwischen den Tags
                //shadow.appendChild(content);

            })
        });
    }
}
window.customElements.define('hu-button', Button);