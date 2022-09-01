function bubbleSort() {  
    let labels = chart.data.labels;
    let data = chart.data.datasets[0].data;
    let colors = chart.data.datasets[0].backgroundColor;
    let swapped;
    let timeout = 0;
    do {
      swapped = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i] > data[i + 1]) {        
          swap(labels, i);
          swap(data, i);
          swap(colors, i);
          timeout += 50;
          this.updateChartDelayed(labels.slice(0), data.slice(0), colors.slice(0), timeout);
          swapped = true;
        }
      }
    } while (swapped);
  }
  
  function swap(arr, i) {
    let tmp = arr[i];
    arr[i] = arr[i + 1];
    arr[i + 1] = tmp;
  }
  
  function updateChartDelayed(labels, data, colors, timeout) {
    setTimeout(() => {
      chart.data.labels = labels;
      chart.data.datasets[0].data = data;
      chart.data.datasets[0].backgroundColor = colors;
      chart.update();
    }, timeout);
  }
  
  const labels = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  const chart = new Chart('myChart', {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: labels.map(() => Math.random()),
        backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF4D4D'],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  
  setTimeout(() => bubbleSort(), 1000);