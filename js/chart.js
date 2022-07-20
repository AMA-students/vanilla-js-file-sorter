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
export {
    ctx, myChart
}






// const ctx = document.getElementById('myChart').getContext('2d');

// const arr = []

// for(let i = 0; i< 100; i++) {
//     arr.push(Math.floor(Math.random() * (1000 - -1000) + -1000))
// }

// async function test(cb) {
//     await cb()
// }

// test(async ()  => {
//     for(let i = 0; i< 100000; i++) {
//         arr.push(Math.floor(Math.random() * (1000 - -1000) + -1000))
//     }
// });

// const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: arr,
//         datasets: [{
//             label: '# of Votes',
//             data: arr,
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 2
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         },
//         plugins: {
//             decimation: {
//                 algorithm: 'min-max',
//                 enabled: true,
//                 samples: 500
//             }
//         }
//     },

// });

