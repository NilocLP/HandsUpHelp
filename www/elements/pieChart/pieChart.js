var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PieChart extends HTMLElement {
    constructor() {
        super();
        this._percentage = 0;
        this._rendered = false;
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.render();
            this._rendered = true;
            const event = new CustomEvent('objectRendered');
            this.dispatchEvent(event);
        });
    }
    get rendered() {
        return this._rendered;
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
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/elements/pieChart/pieChart.html");
            const text = yield response.text();
            this.innerHTML = text;
            this.renderChartRelation();
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
// @ts-ignore
function init() {
    if (window.customElements.get("hu-piechart") === undefined) {
        window.customElements.define('hu-piechart', PieChart);
    }
}
init();
//# sourceMappingURL=pieChart.js.map