class CalenderVisual extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.renderCalender();
    }
    /**
     * It fetches the HTML file, then it renders the HTML file, then it renders the lessons
     */
    renderCalender() {
        fetch("/elements/calenderVisual/calenderVisual.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;
                for (let i = 0; i < 50; i++) {
                    //TODO Render Lessons correctly by using Calender Class and Lesson Class values
                    let placeholder = document.createElement("div");
                    if (i < 5) {
                        placeholder.classList.add("placeholder");
                    }
                    else {
                        placeholder.classList.add("notUsed");
                    }
                    placeholder.appendChild(document.createElement("div"));
                    placeholder.addEventListener("click", () => { this.renderInput(null); });
                    this.querySelector(".body").appendChild(placeholder);
                }
            });
        });
    }
    //TODO Uncomment Type, when Lesson class exists
    renderInput(lesson /*: Lesson*/) {
        fetch("/elements/calenderVisual/calenderVisualInput.html").then((response) => {
            response.text().then((text) => {
                const visualInput = document.createElement("section");
                visualInput.setAttribute("id", "hu-calender-input");
                visualInput.innerHTML = text;
                document.querySelector("body").insertBefore(visualInput, document.querySelector("main"));
                document.querySelector("#hu-calender-input-save").addEventListener("click", () => { this.handelInputSubmit(); });
                //TODO Render Data provided by the Lesson
            });
        });
    }
    handelInputSubmit() {
        //TODO Safe Data in Lesson
        this.removeInput();
    }
    removeInput() {
        document.getElementById("hu-calender-input").remove();
    }
}
window.customElements.define('hu-calender', CalenderVisual);
//# sourceMappingURL=calenderVisual.js.map