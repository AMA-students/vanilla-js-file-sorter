// import '/style.css';
import fileParse from './functions/getFile.js'
import CSV from './classes/Csv.js';
import STATUS from './classes/Status.js';
import { bubbleSort} from './functions/algorithms.js';
import quickSort from './functions/algo/quickSort.js';

const form = document.querySelector("#getfile");
const selectGroup = document.querySelector('#sort-select-group')
const select = document.querySelector('#select');

//buttons
const inputFile = document.querySelector("#file");
const submitBtn = document.querySelector("#submit");
const displayBtn = document.querySelector('#display')
const clearBtn = document.querySelector('#clear')
const stopBtn = document.querySelector('#stop')

let parsedCsvFile;

const Status = new STATUS(document.querySelector('#status'));

const csv = new CSV(document.querySelector('table'))

// status options
const allBtns = [clearBtn, displayBtn, stopBtn, inputFile, submitBtn];

const onChooseFileOptions = {
    hideBtn:[clearBtn, displayBtn, stopBtn],
}

const onDoneOptions = {
    hideBtn:[displayBtn, stopBtn],
    showBtn: [clearBtn]
}

const onSetFileOptions = {
    hideBtn:[clearBtn, stopBtn],
    showBtn: [displayBtn, selectGroup]
}

const onLoadingOptions = {
    hideBtn:[clearBtn, displayBtn]
}

Status.onChooseFile();
Status.Options.hide([selectGroup]);
Status.Options.disable([stopBtn, clearBtn ,displayBtn]);


//buttons on click

// on submit
form.onsubmit = async e => {
    e.preventDefault();
    const firstFile = inputFile.files[0];

    if(!firstFile) return;
    csv.clear();
    Status.onSetFile(firstFile.name, onSetFileOptions);

    parsedCsvFile = await fileParse(firstFile.name);

    const csvHeaders = parsedCsvFile.data[0].map(element => `<option>${element}</option>`);

    select.innerHTML = csvHeaders.join('');
    Status.Options.disable([stopBtn, clearBtn])

    Status.Options.show([selectGroup])
    Status.Options.enable([displayBtn])
    form.reset();
}

// on loading
displayBtn.onclick = () => {
    Status.onLoading(onLoadingOptions);
    const csvBody = parsedCsvFile.data.slice(1);
    const bodyData = removeUndefined(csvBody);
    const controlVar = select.selectedIndex;

    
    // console.log(bodyData)
    const converted = bodyData.map( elem => {
        // console.log(elem[controlVar], isNaN(elem[controlVar]) )
        if( !isNaN(elem[controlVar]) ) {
            elem[controlVar] = parseFloat(elem[controlVar])
        }
        // console.log(elem)
        return elem
    })

    const convertedc = bodyData.map( elem => {
        // console.log(elem[controlVar], isNaN(elem[controlVar]) )
        if( isNaN(elem[controlVar]) ) {
            elem[controlVar] = parseFloat(elem[controlVar].replace(',', ''))
        }
        // console.log(elem)
        return elem
    })

    const sorted = convertedc.sort( (a,b) => {
        return a[controlVar] - b[controlVar]
    })
    
    const config = {
        array: converted,
        isAscending: true,
        controlVar: controlVar
    }

    // const algoParams = {array: converted, isAscending: true, controlVar: controlVar};

    // console.log(converted)
    // console.log(bubbleSort(converted, true, controlVar))
    // console.log(quicksort(converted, true, controlVar))
    // csv.update(parsedCsvFile.data[0], bubbleSort(converted, true, controlVar) );
    // csv.update(parsedCsvFile.data[0], config.array );

    // displayChart(myChart, config.array.map(elem => elem[controlVar]))

    Status.Options.hide([selectGroup])
    Status.Options.disable([clearBtn, displayBtn, submitBtn, inputFile])
    
    Status.Options.enable([stopBtn])


    // document.querySelector('#update').onclick = () => {
    //     // console.log(myChart.type)
    //     // myChart.type = 'line'
    //     // myChart.data.labels = 
    //     // myChart.data.datasets[0].data = [100]
    //     // myChart.update();
    
    //     displayChart(myChart, quickSort(config).map(elem => elem[controlVar]))
    // }
};



// on clear
clearBtn.onclick = () => {
    csv.clear();
    Status.onChooseFile(onChooseFileOptions);
    Status.Options.hide([selectGroup])
    Status.Options.disable([clearBtn, stopBtn])
    select.innerHTML = '';
}



const removeUndefined = data => data.filter(element => element !== undefined && element != '');

const displayChart = (chart, array) => {
    const labels = []
    for(let i = 1; i < array.length + 1; i++) {
        labels.push(i+ 1)
    }
    chart.data.datasets[0].data = array
    chart.data.labels = labels
    chart.update()
}

const updateChart = (chart, array) => {
    // const labels = []
    // for(let i = 1; i < array.length + 1; i++) {
    //     labels.push(i+ 1)
    // }
    // chart.data.labels = labels
    chart.data.datasets[0].data = array
    chart.update()
}

// const actions = [
//     {
//       name: 'No decimation (default)',
//       handler(chart) {
//         chart.options.plugins.decimation.enabled = false;
//         chart.update();
//       }
//     },
//     {
//       name: 'min-max decimation',
//       handler(chart) {
//         chart.options.plugins.decimation.algorithm = 'min-max';
//         chart.options.plugins.decimation.enabled = true;
//         chart.update();
//       },
//     },
//     {
//       name: 'LTTB decimation (50 samples)',
//       handler(chart) {
//         chart.options.plugins.decimation.algorithm = 'lttb';
//         chart.options.plugins.decimation.enabled = true;
//         chart.options.plugins.decimation.samples = 50;
//         chart.update();
//       }
//     },
//     {
//       name: 'LTTB decimation (500 samples)',
//       handler(chart) {
//         chart.options.plugins.decimation.algorithm = 'lttb';
//         chart.options.plugins.decimation.enabled = true;
//         chart.options.plugins.decimation.samples = 500;
//         chart.update();
//       }
//     }
//   ];