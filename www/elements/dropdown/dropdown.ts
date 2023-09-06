class Dropdown extends HTMLElement{

    private _options: Array<{id:string, name:string, hasIcon:boolean, iconColor:string}> = [];
    private _menuOpen: boolean = false;
    private _currentOption: string;
    private _rendered: boolean = false;


    constructor() {
        super();
    }
    async connectedCallback() {
        await this.render();
        this.closeMenu()

        this.addEventListener("hu-selectionChange", evt => {
            this.renderNewTitle(this._options[this._currentOption]);
            this.closeMenu();
        });

        this._rendered = true;
        const event = new CustomEvent('objectRendered');
        this.dispatchEvent(event);
    }

    get rendered(){
        return this._rendered;
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

    get options():{id:string, name:string, hasIcon:boolean, iconColor:string}[]{
        return this._options;
    }
    get menuOpen(){
        return this._menuOpen;
    }
    get currentOption(){
        return this._currentOption;
    }

    set currentOption(optionId:string){
        this.renderNewTitle(this._options[parseInt(optionId)]);
        this._currentOption = optionId.toString();
    }

    /**
     * It adds a new option to the dropdown menu
     * @param optionName - The name of the option.
     * @param hasIcon - boolean
     * @param iconColor - The color of the icon.
     * @param id - OPTIONAL - The identifier of the option (if not defined, it gets assigned)
     */
    public addOption(optionName:string, hasIcon: boolean, iconColor: string, id?:string): void{
        if(typeof optionName !== "string" || typeof iconColor !== "string" || typeof hasIcon !== "boolean"){
            return;
        }
        const OPTION:{id:string, name:string, hasIcon:boolean, iconColor:string} = {
            id: id,
            name: optionName,
            hasIcon: hasIcon,
            iconColor: iconColor
        }
        if(!id){
            OPTION.id = UUIDUtils.generateUUID();
        }
        this._options.push(OPTION);
        let node = this.renderNewOption(OPTION);
        node.addEventListener("click", ev => {
            this._currentOption = node.getAttribute("hu-option");
            const event = new CustomEvent("hu-selectionChange");
            this.dispatchEvent(event);
        })
    }
    /**
     * It removes an option from the _options object and then calls the renderRemoveOption function to remove the option
     * from the DOM
     * @param id - The id of the option to remove.
     */
    public removeOption(id: number) {
        delete this._options[id];
        this.renderRemoveOption(id);
    }

    /**
     * It removes all option from the _options object and calls the renderRemoveOptions function to remove the option
     * from the DOM
     * @param id - The id of the option to remove.
     */
    public removeOptions() {
        for (let i = 0; i < this._options.length; i++) {
            this.renderRemoveOption(i);
        }
        this._options = [];
    }

    /**
     * Clears the current selected Option by going back to the placeholder value
     */
    public clearCurrentOption(){
        this._currentOption = undefined;
        this.placeholderAttributeChanged(this.getAttribute("placeholder"))
    }

    /**
     * If the menu is already open, do nothing. Otherwise, set the _menuOpen variable to true and display the _options'
     * container.
     */
    public openMenu(): void{
        if(this._menuOpen){
            return;
        }
        this._menuOpen = true;
        const OPTIONS_CONTAINER: HTMLElement | null = this.querySelector(".hu-dropdown-options-container");
        OPTIONS_CONTAINER.style.display = "block";
    }
    /**
     * If the menu is open, close it
     */
    public closeMenu(): void{
        if(!this._menuOpen){
            return;
        }
        this._menuOpen = false;
        const OPTIONS_CONTAINER: HTMLElement | null = this.querySelector(".hu-dropdown-options-container");
        OPTIONS_CONTAINER.style.display = "none";
    }

    /**
     * > When the placeholder attribute changes, render a new title with the new value
     * @param newValue - The new value of the attribute.
     */
    private placeholderAttributeChanged(newValue:String): void{
        const OPTIONS = {
            name: newValue,
            hasIcon: false,
            iconColor: "#ffffff"
        }
        this.renderNewTitle(OPTIONS)
    }

    /**
     * It creates a new option node, sets its attributes, and appends it to the dropdown
     * @param option - The option object that is being rendered.
     * @returns The node that was created.
     */
    private renderNewOption(option:any){
        let node = document.createElement("div");
        let colorDiv = document.createElement("div");
        let textSpan = document.createElement("span");
        colorDiv.style.backgroundColor = option.iconColor;
        colorDiv.style.display = option.hasIcon ? "inline-block" : "none";
        textSpan.innerText = option.name
        node.appendChild(colorDiv);
        node.appendChild(textSpan);
        node.setAttribute("hu-option", (this._options.length - 1).toString());
        //console.log(this);
        //console.log(this.getElementsByClassName("div.hu-dropdown-options")[0])
        this.querySelector("div.hu-dropdown-options").appendChild(node);
        return node;
    }
    /**
     * It removes an option from the dropdown menu
     * @param id - The id of the option to remove.
     */
    private renderRemoveOption(id: number){
        this.querySelector(`div.hu-dropdown-frame div.hu-dropdown-options [hu-option="${id}"]`).remove();
    }
    /**
     * It fetches the HTML file and then renders it.
     */
    private async render(): Promise<void> {
        const response = await fetch("/elements/dropdown/dropdown.html")
        const text = await response.text()

        this.innerHTML = text;
        //ReRender Placeholder
        if (this.getAttribute("placeholder")) this.placeholderAttributeChanged(this.getAttribute("placeholder"))

        this.querySelector(".hu-dropdown-title").addEventListener("click", evt => {
            this.openMenu();
        })


    }
    /**
     * It renders the title of the dropdown.
     * @param option - The option object that was selected.
     */
    private renderNewTitle(option:any): void{
        if(this.querySelector(".hu-dropdown-title .hu-dropdown-title-text") === null) return;
        this.querySelector(".hu-dropdown-title .hu-dropdown-title-text").textContent = option.name;
        const TITLE_COLOR_BOX = this.querySelector(".hu-dropdown-title div .hu-dropdown-title-color") as HTMLElement | null;
        TITLE_COLOR_BOX.style.display = option.hasIcon ? "inline-block" : "none";
        TITLE_COLOR_BOX.style.backgroundColor = option.iconColor;
    }
}
// @ts-ignore
function init() {
    if(window.customElements.get("hu-dropdown") === undefined) {
        window.customElements.define('hu-dropdown', Dropdown);
    }
}

init();