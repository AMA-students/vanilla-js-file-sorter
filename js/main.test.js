// import '/style.css';
import fileParse from './functions/getFile.js'
import CSV from './classes/Csv.js';
import STATUS from './classes/Status.js';

const form = document.querySelector("#getfile");
const inputFile = document.querySelector("#file");
const select = document.querySelector('#select');
const displayBtn = document.querySelector('#display')
const clearBtn = document.querySelector('#clear')
const selectGroup = document.querySelector('#sort-select-group')

let parsedCsvFile;

displayBtn.style.display = 'none';
clearBtn.style.display = 'none';
selectGroup.style.display = 'none';

const Status = new STATUS(document.querySelector('#status'));

const csv = new CSV(document.querySelector('table'))

// status options
const onChooseFileOptions = {
    hideBtn:[clearBtn, displayBtn],
}

const onDoneOptions = {
    hideBtn:[displayBtn],
    showBtn: [clearBtn]
}

const onSetFileOptions = {
    hideBtn:[clearBtn],
    showBtn: [displayBtn]
}

const onLoadingOptions = {
    hideBtn:[clearBtn, displayBtn]
}

form.onsubmit = async e => {
    e.preventDefault();
    const firstFile = inputFile.files[0];

    if(!firstFile) return;
    csv.clear();
    Status.onSetFile(firstFile.name, onSetFileOptions);

    parsedCsvFile = await fileParse(firstFile.name);
    // parsedCsvFile = await fileParse('test2.csv');
    // parsedCsvFile = await fileParse('test.csv');
    
    const csvHeaders = parsedCsvFile.data[0].map(element => `<option>${element}</option>`);

    select.innerHTML = csvHeaders.join('');
    displayBtn.style.display = 'block';
    selectGroup.style.display = 'block';
    form.reset();
}

displayBtn.onclick = () => {
    Status.onLoading(onLoadingOptions);
    const csvBody = parsedCsvFile.data.slice(1);
    const bodyData = removeUndefined(csvBody);

    csv.update(parsedCsvFile.data[0], bodyData );
    // csv.render2(bodyData)
    // displayData(parsedCsvFile.data)
    // Status.onDone(onDoneOptions);
    clearBtn.style.display = 'block';
};

clearBtn.onclick = () => {
    csv.clear();
    Status.onChooseFile(onChooseFileOptions);
}

const removeUndefined = data => data.filter(element => element !== undefined && element != '');