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
const stopBtn = document.querySelector('#stop')

let parsedCsvFile;

const Status = new STATUS(document.querySelector('#status'));

const csv = new CSV(document.querySelector('table'))

// status options
const allBtn = [clearBtn, displayBtn, stopBtn];

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

displayBtn.onclick = () => {
    Status.onLoading(onLoadingOptions);
    const csvBody = parsedCsvFile.data.slice(1);
    const bodyData = removeUndefined(csvBody);

    csv.update(parsedCsvFile.data[0], bodyData );

    Status.Options.hide([selectGroup])
    Status.Options.disable([clearBtn, displayBtn])
    
    Status.Options.show([stopBtn])
    Status.Options.enable([stopBtn])
};

clearBtn.onclick = () => {
    csv.clear();
    Status.onChooseFile(onChooseFileOptions);
    Status.Options.hide([selectGroup])
    Status.Options.disable([clearBtn, stopBtn])
    select.innerHTML = '';
}

const removeUndefined = data => data.filter(element => element !== undefined && element != '');