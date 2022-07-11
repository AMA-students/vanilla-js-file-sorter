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

// displayBtn.style.display = 'none';
// clearBtn.style.display = 'none';
// stopBtn.style.display = 'none';
// selectGroup.style.display = 'none';

const Status = new STATUS(document.querySelector('#status'));

const csv = new CSV(document.querySelector('table'))

// status options
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
    // csv.render2(bodyData)
    // displayData(parsedCsvFile.data)
    // Status.onDone(onDoneOptions);
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

// stopBtn.onclick = () => {
//     console.log('yeet')
//     Status.Options.show([clearBtn])
// }

const removeUndefined = data => data.filter(element => element !== undefined && element != '');