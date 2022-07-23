export default class {
    constructor() {
        
    }

    init() {
        const ctx = document.getElementById('myChart').getContext('2d');
        const arr = []
        for(let i = 0; i< 100; i++) {
            arr.push(i)
        }

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: arr,
                datasets: [{
                    label: '# of Votes',
                    data: arr,
                    backgroundColor: [
                        // 'rgba(255, 99, 132, 0.2)',
                        // 'rgba(54, 162, 235, 0.2)',
                        // 'rgba(255, 206, 86, 0.2)',
                        // 'rgba(75, 192, 192, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        // 'rgba(255, 99, 132, 1)',
                        // 'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return {ctx, myChart}
    }

    onDisplay = (chart, array) =>{
        this.displayChart(chart, array);
    }

    onUpdate = (chart, array) => {
        this.updateChart(chart, array)
    }

    displayChart(chart, array) {
        const labels = []
        for(let i = 1; i < array.length + 1; i++) {
            labels.push(i+ 1)
        }
        const colors = []
        for(let i = 0; i < array.length; i++) {
            colors.push('gray')
        }
        console.log(chart)
        chart.data.datasets[0].data = array
        chart.data.datasets[0].backgroundColor = colors
        chart.data.datasets[0].backgroundColor[100] = 'green'
        chart.data.labels = labels
        chart.update()
    }

    updateChart (chart, array) {
        // const labels = []
        // for(let i = 1; i < array.length + 1; i++) {
        //     labels.push(i+ 1)
        // }
        // chart.data.labels = labels
        chart.data.datasets[0].data = array
        // chart.data.datasets[0].backgroundColor[100] = "yellow"
        // chart.data.datasets[0].borderColor[100] = "yellow"
        // chart.data.datasets[0].data[100] = 10000000000
        
        chart.update()
    }

    getVariables() {
        return {ctx, myChart}
    }
}

