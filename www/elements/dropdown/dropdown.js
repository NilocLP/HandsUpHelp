class Dropdown extends HTMLElement {
    constructor() {
        super();
        this._options = [];
        this._menuOpen = false;
    }
    connectedCallback() {
        this.render();
        this.closeMenu();
        this.addEventListener("hu-selectionChange", evt => {
            this.renderNewTitle(this._options[this._currentOption]);
            this.closeMenu();
        });
    }
    static get observedAttributes() {
        return ['placeholder'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "placeholder":
                this.placeholderAttributeChanged(newValue);
                break;
        }
    }
    get options() {
        return this._options;
    }
    get menuOpen() {
        return this._menuOpen;
    }
    get currentOption() {
        return this._currentOption;
    }
    /**
     * It adds a new option to the dropdown menu
     * @param optionName - The name of the option.
     * @param hasIcon - boolean
     * @param iconColor - The color of the icon.
     */
    addOption(optionName, hasIcon, iconColor) {
        if (typeof optionName !== "string" || typeof iconColor !== "string" || typeof hasIcon !== "boolean") {
            return;
        }
        const OPTION = {
            name: optionName,
            hasIcon: hasIcon,
            iconColor: iconColor
        };
        this._options.push(OPTION);
        let node = this.renderNewOption(OPTION);
        node.addEventListener("click", ev => {
            this._currentOption = node.getAttribute("hu-option");
            const event = new CustomEvent("hu-selectionChange");
            this.dispatchEvent(event);
        });
    }
    /**
     * It removes an option from the _options object and then calls the renderRemoveOption function to remove the option
     * from the DOM
     * @param id - The id of the option to remove.
     */
    removeOption(id) {
        delete this._options[id];
        this.renderRemoveOption(id);
    }
    /**
     * If the menu is already open, do nothing. Otherwise, set the _menuOpen variable to true and display the _options'
     * container.
     */
    openMenu() {
        if (this._menuOpen) {
            return;
        }
        this._menuOpen = true;
        const OPTIONS_CONTAINER = this.querySelector(".hu-dropdown-options-container");
        OPTIONS_CONTAINER.style.display = "block";
    }
    /**
     * If the menu is open, close it
     */
    closeMenu() {
        if (!this._menuOpen) {
            return;
        }
        this._menuOpen = false;
        const OPTIONS_CONTAINER = this.querySelector(".hu-dropdown-options-container");
        OPTIONS_CONTAINER.style.display = "none";
    }
    /**
     * > When the placeholder attribute changes, render a new title with the new value
     * @param newValue - The new value of the attribute.
     */
    placeholderAttributeChanged(newValue) {
        const OPTIONS = {
            name: newValue,
            hasIcon: false,
            iconColor: "#ffffff"
        };
        this.renderNewTitle(OPTIONS);
    }
    /**
     * It creates a new option node, sets its attributes, and appends it to the dropdown
     * @param option - The option object that is being rendered.
     * @returns The node that was created.
     */
    renderNewOption(option) {
        let node = document.createElement("div");
        let colorDiv = document.createElement("div");
        let textSpan = document.createElement("span");
        colorDiv.style.backgroundColor = option.iconColor;
        colorDiv.style.display = option.hasIcon ? "inline-block" : "none";
        textSpan.innerText = option.name;
        node.appendChild(colorDiv);
        node.appendChild(textSpan);
        node.setAttribute("hu-option", (this._options.length - 1).toString());
        this.querySelector("div.hu-dropdown-frame div.hu-dropdown-options").appendChild(node);
        return node;
    }
    /**
     * It removes an option from the dropdown menu
     * @param id - The id of the option to remove.
     */
    renderRemoveOption(id) {
        this.querySelector(`div.hu-dropdown-frame div.hu-dropdown-options [hu-option="${id}"]`).remove();
    }
    /**
     * It fetches the HTML file and then renders it.
     */
    render() {
        fetch("../../elements/dropdown/dropdown.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;
                //ReRender Placeholder
                if (this.getAttribute("placeholder"))
                    this.placeholderAttributeChanged(this.getAttribute("placeholder"));
                this.querySelector(".hu-dropdown-title").addEventListener("click", evt => {
                    this.openMenu();
                });
            });
        });
    }
    /**
     * It renders the title of the dropdown.
     * @param option - The option object that was selected.
     */
    renderNewTitle(option) {
        if (this.querySelector(".hu-dropdown-title .hu-dropdown-title-text") === null)
            return;
        this.querySelector(".hu-dropdown-title .hu-dropdown-title-text").textContent = option.name;
        const TITLE_COLOR_BOX = this.querySelector(".hu-dropdown-title div .hu-dropdown-title-color");
        TITLE_COLOR_BOX.style.display = option.hasIcon ? "inline-block" : "none";
        TITLE_COLOR_BOX.style.backgroundColor = option.iconColor;
    }
}
window.customElements.define('hu-dropdown', Dropdown);
//# sourceMappingURL=dropdown.js.map