// import '/style.css';
import fileParse from './functions/getFile.js'
// import CSV from './classes/Csv.js';
import CSV from './classes/Csv.js';
import STATUS from './classes/Status.js';
import { bubbleSort} from './functions/algorithms.js';
import quickSort from './functions/algo/quickSort.js';
// import { ctx, myChart } from './chart.js'
import Animate from './classes/Animate.js';


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

// class instance
const Status = new STATUS(document.querySelector('#status'));
const csv = new CSV(document.querySelector('table'))
// const csv = new CSV(document.querySelector('#chart'))
const animate = new Animate(document.querySelector('#chart'))

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
    csv.update( parsedCsvFile.data[0], config.array );

    
    Status.Options.hide([selectGroup])
    Status.Options.disable([clearBtn, displayBtn, submitBtn, inputFile])
    
    Status.Options.enable([stopBtn])
    
    // displayChart(myChart, config.array.map(elem => elem[controlVar]))
    // let test = config.array.map(elem => elem[controlVar])
    document.querySelector('#update').onclick = () => {
        // console.log(myChart.type)
        // myChart.type = 'line'
        // myChart.data.labels = 
        // myChart.data.datasets[0].data = [100]
        // myChart.update();
        // function switchPos(array, el1, el2) {
        //     let aux = array[el1];
        //     array[el1] = array[el2];
        //     array[el2] = aux;
        //     return array
        // }
        // updateChart(myChart, quickSort(config))
        // config.array.sort((a,b) => {
        //     a[controlVar].after(b[controlVar]) 
        //     return a[controlVar] - b[controlVar]
        // })
        
        csv.update(parsedCsvFile.data[0], quickSort(config))

        
	    
        
        // test
        const downloadBtn = document.createElement('button')
        downloadBtn.innerHTML = "download"
        downloadBtn.after(document.querySelector('#update'))
        document.querySelector('#update').after(displayBtn)
        downloadBtn.onclick = () => {
            var html = document.querySelector("table").outerHTML;
            console.log(html, document.querySelectorAll("table tr"))
            htmlToCSV(html, "students.csv");
        }
    }
};

function htmlToCSV(html, filename) {
	var data = [];
	var rows = document.querySelectorAll("table tr");
    console.log()
	for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td, th");
				
		for (var j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
        }
		        
		data.push(row.join(",")); 		
	}
    console.log(rows)
	downloadCSVFile(data.join("\n"), filename);
}

function downloadCSVFile(csv, filename) {
	var csv_file, download_link;

	csv_file = new Blob([csv], {type: "text/csv"});

	download_link = document.createElement("a");

	download_link.download = filename;

	download_link.href = window.URL.createObjectURL(csv_file);

	download_link.style.display = "none";

	document.body.appendChild(download_link);

	download_link.click();
}

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
    const colors = []
    for(let i = 0; i < array.length; i++) {
        colors.push('gray')
    }
    chart.data.datasets[0].backgroundColor = colors
    chart.data.datasets[0].backgroundColor[100] = 'green'
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
    chart.data.datasets[0].backgroundColor[100] = "yellow"
    chart.data.datasets[0].borderColor[100] = "yellow"
    
    chart.update()
}