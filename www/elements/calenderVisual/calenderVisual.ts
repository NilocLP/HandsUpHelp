class CalenderVisual extends HTMLElement{

    private _rendered: boolean = false;

    constructor() {
        super();
    }
    async connectedCallback() {
        await this.renderCalender();

        this._rendered = true;
        const event = new CustomEvent('objectRendered');
        this.dispatchEvent(event);
    }

    get rendered(){
        return this._rendered;
    }

    /**
     * It fetches the HTML file, then it renders the HTML file, then it renders the lessons
     */
    private async renderCalender(): Promise<void> {
        const response = await fetch("/elements/calenderVisual/calenderVisual.html")
        const text = await   response.text();

        this.innerHTML = text;

        for (let i = 0; i < 50; i++) {
            //TODO Render Lessons correctly by using Calender Class and Lesson Class values
            let placeholder = document.createElement("div");

            //TODO Add checks to identify lesson
            placeholder.classList.add("notUsed")

            placeholder.appendChild(document.createElement("div"))
            placeholder.addEventListener("click", () => {
                this.renderInput(null);
            })
            this.querySelector(".body").appendChild(placeholder);
        }


    }

    private async renderInput(lesson: Lesson): Promise<void> {
        const response = await fetch("/elements/calenderVisual/calenderVisualInput.html")
        const text = await response.text()

        const visualInput = document.createElement("section");
        visualInput.setAttribute("id", "hu-calender-input");
        visualInput.innerHTML = text;
        document.querySelector("body").insertBefore(visualInput, document.querySelector("main"));

        document.querySelector("#hu-calender-input-save").addEventListener("click", () => {
            this.handelInputSubmit();
        })
        //TODO Render Data provided by the Lesson

    }
    private handelInputSubmit(): void{
        //TODO Safe Data in Lesson

        this.removeInput();
    }

    private removeInput():void {
        document.getElementById("hu-calender-input").remove();

    }

}

// @ts-ignore
function init() {
    if(window.customElements.get("hu-calender") === undefined) {
        window.customElements.define('hu-calender', CalenderVisual);
    }
}

init();