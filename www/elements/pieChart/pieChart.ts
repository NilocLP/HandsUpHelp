
class PieChart extends HTMLElement{

    private _percentage:number = 0;
    private _rendered: boolean = false;


    constructor() {
        super();
    }
    async connectedCallback(){
        await this.render();

        this._rendered = true;
        const event = new CustomEvent('objectRendered');
        this.dispatchEvent(event);
    }

    get rendered(){
        return this._rendered;
    }

    static get observedAttributes(){
        return ['percentage']
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string){
        switch (name) {
            case "percentage":
                this.percentageAttributeChanged(newValue);
                break;
        }
    }

    get percentage(){
        return this._percentage;
    }

    set percentage(value: number){
        if(value > 100){
            this.percentageAttributeChanged("100");
        }else if(value < 0){
            this.percentageAttributeChanged("0");
        }else {
            this.percentageAttributeChanged(value.toString());
        }
    }

    private percentageAttributeChanged(newValue: string): void {
        this._percentage = Number(newValue);
        this.renderChartRelation();
    }

    private async render(): Promise<void> {
        const response = await fetch("/elements/pieChart/pieChart.html");
        const text = await response.text();

        this.innerHTML = text;
        this.renderChartRelation()

    }

    private calculateAngelFromPercentage(percentage){
        return (percentage / 100) * 360;
    }

    private renderChartRelation(): void{
        const REGEX_PERCENTAGE = /(\d+)\%/g;
        const CHART = this.querySelector(".hu-chart") as HTMLElement | null;
        const CHART_BAR = this.querySelector(".hu-separator-Two") as HTMLElement | null;
        if(CHART === null) return;
        let currentBackground = window.getComputedStyle(CHART).backgroundImage;

        let iterator = 0;
        currentBackground = currentBackground.replace(REGEX_PERCENTAGE,(match) => {
            iterator++;
            if(iterator != 2 && iterator != 3) return match;
            match = this._percentage + "%";
            return match;
        })
        //currentBackground += " ";
        CHART.style.setProperty("background-image", currentBackground);

        let angel = this.calculateAngelFromPercentage(this._percentage);
        console.log(angel);
        CHART_BAR.style.setProperty("transform", "rotate(" + angel.toString() + "deg)");

    }

}
// @ts-ignore
function init() {
    if(window.customElements.get("hu-piechart") === undefined) {
        window.customElements.define('hu-piechart', PieChart);
    }
}

init();