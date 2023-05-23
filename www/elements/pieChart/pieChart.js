class PieChart extends HTMLElement {
    constructor() {
        super();
        this._percentage = 0;
    }
    connectedCallback() {
        this.render();
    }
    static get observedAttributes() {
        return ['percentage'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "percentage":
                this.percentageAttributeChanged(newValue);
                break;
        }
    }
    get percentage() {
        return this._percentage;
    }
    set percentage(value) {
        if (value > 100) {
            this.percentageAttributeChanged("100");
        }
        else if (value < 0) {
            this.percentageAttributeChanged("0");
        }
        else {
            this.percentageAttributeChanged(value.toString());
        }
    }
    percentageAttributeChanged(newValue) {
        this._percentage = Number(newValue);
        this.renderChartRelation();
    }
    render() {
        fetch("../../elements/pieChart/pieChart.html").then((response) => {
            response.text().then((text) => {
                this.innerHTML = text;
                this.renderChartRelation();
            });
        });
    }
    calculateAngelFromPercentage(percentage) {
        return (percentage / 100) * 360;
    }
    renderChartRelation() {
        const REGEX_PERCENTAGE = /(\d+)\%/g;
        const CHART = this.querySelector(".hu-chart");
        const CHART_BAR = this.querySelector(".hu-separator-Two");
        if (CHART === null)
            return;
        let currentBackground = window.getComputedStyle(CHART).backgroundImage;
        let iterator = 0;
        currentBackground = currentBackground.replace(REGEX_PERCENTAGE, (match) => {
            iterator++;
            if (iterator != 2 && iterator != 3)
                return match;
            match = this._percentage + "%";
            return match;
        });
        //currentBackground += " ";
        CHART.style.setProperty("background-image", currentBackground);
        let angel = this.calculateAngelFromPercentage(this._percentage);
        console.log(angel);
        CHART_BAR.style.setProperty("transform", "rotate(" + angel.toString() + "deg)");
    }
}
window.customElements.define('hu-piechart', PieChart);
//# sourceMappingURL=pieChart.js.map