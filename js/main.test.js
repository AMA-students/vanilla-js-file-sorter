// import '/style.css';
import fileParse from './functions/getFile.js'
import CSV from './classes/Csv.js';
import STATUS from './classes/Status.js';
import { bubbleSort } from './functions/algorithms.js';

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
        console.log(elem[controlVar], isNaN(elem[controlVar]) )
        if( !isNaN(elem[controlVar]) ) {
            elem[controlVar] = parseFloat(elem[controlVar])
        }
        console.log(elem)
        return elem
    })
    
    console.log(converted)
    // console.log(bubbleSort(converted, true, controlVar))

    csv.update(parsedCsvFile.data[0], bubbleSort(converted, false, controlVar) );

    Status.Options.hide([selectGroup])
    Status.Options.disable([clearBtn, displayBtn, submitBtn, inputFile])
    
    Status.Options.enable([stopBtn])
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