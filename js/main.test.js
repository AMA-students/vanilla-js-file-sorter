// import '/style.css';

// import CSV from './classes/Chart.js';
import CSV from './classes/Csv.js';
import STATUS from './classes/Status.js';
// import { bubbleSort} from './functions/algorithms.js';
// import { ctx, myChart } from './chart.js'
// import chartTest from './prototypes/chart.test.js';
import Animate from './classes/Animate.js';
// import Test from './prototypes/Test.js';

// algorithms
import quickSort from './functions/algo/quickSort.js';

// side effect funtions
import setDataPoints from './functions/sideEffectes/setDataPoints.js';

// pure functions
// import fileParse from './functions/getFile.js'

const form = document.querySelector("#getfile");
const selectGroup = document.querySelector('#sort-select-group')
const select = document.querySelector('#select');

//buttons
const inputFile = document.querySelector("#file");
const submitBtn = document.querySelector("#submit");
const displayBtn = document.querySelector('#display')
const clearBtn = document.querySelector('#clear')
const stopBtn = document.querySelector('#stop')

let results;

// class instance
const Status = new STATUS(document.querySelector('#status'));
const csv = new CSV(document.querySelector('table'))
// const csv = new CSV(document.querySelector('#chart'))
const animate = new Animate(document.querySelector('#chart'))

// test class
// const testChart = new chartTest()
// const {ctx, myChart } = testChart.init()

// const test = new Test(testChart);

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


let firstFile;

// buttons on click

// on submit
form.onsubmit = async e => {
    e.preventDefault();
    firstFile = inputFile.files[0];

    if(!firstFile) return;
    csv.clear();
    Status.onSetFile(firstFile.name, onSetFileOptions);

    Papa.parse(firstFile, {
        complete: function(results) {
            setDataPoints(results, select);
        }
    });

    // results = await fileParse(firstFile);

    Status.Options.disable([stopBtn, clearBtn])

    Status.Options.show([selectGroup])
    Status.Options.enable([displayBtn])
    form.reset();
}

// on loading
displayBtn.onclick = () => {

    Status.onLoading(onLoadingOptions);

    Papa.parse(firstFile, {
        worker: true,
        // Header: true,
        complete: function(results) {
            const csvBody = results.data.slice(1)

            const bodyData = removeUndefined(csvBody)

            const dataPointIndex = select.selectedIndex
            
            const converted = bodyData.map( elem => {
                // console.log(elem[dataPointIndex], isNaN(elem[dataPointIndex]) )
                if( !isNaN(elem[dataPointIndex]) ) {
                    elem[dataPointIndex] = parseFloat(elem[dataPointIndex])
                }
                // console.log(elem)
                return elem
            })

            const convertedc = bodyData.map( elem => {
                // console.log(elem[dataPointIndex], isNaN(elem[dataPointIndex]) )
                if( isNaN(elem[dataPointIndex]) ) {
                    elem[dataPointIndex] = parseFloat(elem[dataPointIndex].replace(',', ''))
                }
                // console.log(elem)
                return elem
            })
        
            const sorted = convertedc.sort( (a,b) => {
                return a[dataPointIndex] - b[dataPointIndex]
            })
            
            const config = {
                array: converted,
                isAscending: true,
                dataPointIndex: dataPointIndex
            }

            Status.Options.hide([selectGroup])
            Status.Options.disable([clearBtn, displayBtn, submitBtn, inputFile])
            
            Status.Options.enable([stopBtn])

            //display unsorted table
            csv.onDisplay( results.data[0], config.array );

            // on update
            document.querySelector('#update').onclick = () => {

                csv.onUpdate(results.data[0], quickSort(config))

                console.log('test')
                
                // test download button
                // only works when csv table is rendered
                if(!document.querySelector('.downloadBtn')){
                    const downloadBtn = document.createElement('button')
                    downloadBtn.classList.add('downloadBtn')
                    downloadBtn.innerHTML = "download"
                    downloadBtn.after(document.querySelector('#update'))
                    document.querySelector('#update').after(downloadBtn)
                };
                
                downloadBtn.onclick = () => {
                    var html = document.querySelector("table").outerHTML;
                    console.log(html, document.querySelectorAll("table tr"))
                    // htmlToCSV(html, "students.csv");
                }
            }
        }
    });
    
};

function htmlToCSV(html, filename) {
	var data = [];
	var rows = document.querySelectorAll("table tr");

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
    if(document.querySelector('.downloadBtn')) {
        document.querySelector('.downloadBtn').remove()
    }
    csv.clear();
    Status.onChooseFile(onChooseFileOptions);
    Status.Options.hide([selectGroup])
    Status.Options.disable([clearBtn, stopBtn])
    select.innerHTML = '';
}

const removeUndefined = data => data.filter(element => element !== undefined && element != '');