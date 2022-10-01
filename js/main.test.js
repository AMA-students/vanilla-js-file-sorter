import CSV from './classes/Csv.js';
import STATUS from './classes/Status.js';
import Animate from './classes/Animate.js';


// algorithms
import quickSort from './functions/algo/quickSort.js';

// side effect funtions
import setDataPoints from './functions/sideEffectes/setDataPoints.js';
import htmlToCSV, {test, downloadCSVFile } from './functions/sideEffectes/htmlToCSV.js';

// pure functions
// import fileParse from './functions/getFile.js'

const form = document.querySelector("#getfile");
const selectGroup = document.querySelector('#sort-select-group')
const select = document.querySelector('#select');

//buttons
import {
    clearBtn,
    displayBtn,
    stopBtn,
    inputFile,
    submitBtn,
    updateBtn,
    downloadBtn
} from './buttons.js';

// class instance
const Status = new STATUS(document.querySelector('#status'));
const csv = new CSV(document.querySelector('table'))
// const csv = new CSV(document.querySelector('#chart'))
const animate = new Animate(document.querySelector('#chart'))



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
Status.Options.disable([stopBtn, clearBtn ,displayBtn, updateBtn, downloadBtn]);


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
        complete: results => onDisplay(results)
    });
    
};

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

const onDisplay = results => {
    const csvBody = results.data.slice(1)

    const bodyData = removeUndefined(csvBody)

    const dataPointIndex = select.selectedIndex
    
    const converted = bodyData.map( elem => {

        if( !isNaN(elem[dataPointIndex]) ) {
            elem[dataPointIndex] = parseFloat(elem[dataPointIndex])
        }

        return elem
    })

    const convertedc = bodyData.map( elem => {

        if( isNaN(elem[dataPointIndex]) ) {
            elem[dataPointIndex] = parseFloat(elem[dataPointIndex].replace(',', ''))
        }

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
    
    Status.Options.enable([stopBtn, updateBtn])

    //display unsorted table
    // csv.onDisplay( results.data[0], config.array );
    csv.onSummarize( results.data[0], config.array );

    // on update
    updateBtn.onclick = () => {
        onUpdate(results, config)
        Status.Options.enable([downloadBtn]);
    }
}

const onUpdate = (results, config) => {
    console.log(quickSort(config))
    let sorted = quickSort(config)
    csv.summarize(results.data[0], sorted)
            
    // test download button
    // only works when csv table is rendered
    if(document.querySelector('.downloadBtn')) return;

    downloadBtn.onclick = () => {
        var html = document.querySelector("table").outerHTML;
        console.log(results.data[0].join(","))
        test(results.data[0],sorted, `Sorted-by-${select.value}-${firstFile.name}`, downloadCSVFile);
    } 
}

const removeUndefined = data => data.filter(element => element !== undefined && element != '');