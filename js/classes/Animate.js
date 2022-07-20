export default class {
    constructor(chart) {
        this.chart = chart;
    }

    table = {
        table: this.chart,
        highlight(elems) {
            elems.map(elem => {
                elem.style.backgroundColor = "yellow";
            })
        },
    }

    chart = {
        chart: this.chart,
        highlight() {
            chart.data.datasets[0].data = array
        },
    }
}

