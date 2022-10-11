import CSV from './js/classes/Csv.js';
import STATUS from './js/classes/Status.js';
import State from './js/classes/state.js';

// algorithms
import quickSort from './js/functions/algo/quickSort.test.js';

// side effect funtions
import setDataPoints from './js/functions/sideEffectes/setDataPoints.js';
import htmlToCSV, {test, downloadCSVFile } from './js/functions/sideEffectes/htmlToCSV.js';

// pure functions
// import onDisplay from './js/functions/sideEffectes/onDisplay.js';
// import { realValParser } from './js/functions/parsing/numbers.js';

const form = document.querySelector("#getfile");
const selectGroup = document.querySelector('#sort-select-group')
const select = document.querySelector('#select');

// class instance
const state = new State();
const csv = new CSV(document.querySelector('table'))
const Status = new STATUS(document.querySelector('#status'));

//buttons
import {
  clearBtn,
  displayBtn,
  stopBtn,
  inputFile,
  submitBtn,
  updateBtn,
  downloadBtn,
  settingsBtn
} from './js/buttons.js';

const modal = document.querySelector('.modal');

// predefined options
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

// initial state
Status.onChooseFile();
Status.Options.hide([selectGroup]);
Status.Options.disable([stopBtn, clearBtn, displayBtn, updateBtn, downloadBtn]);

// configs

const sortingAlgorithm = (...args) => {
  return quickSort(...args)
};

const displayMethod = (...args) => {
  csv.onSummarize(...args)
}

let selectedFile;

// buttons on click

settingsBtn.onclick = () => {
  modal.classList.toggle('hidden')
}


// on submit state
form.onsubmit = async e => {

  e.preventDefault();

  selectedFile = inputFile.files[0];

  if(!selectedFile) return;

  csv.clear();

  Status.onSetFile(selectedFile.name, onSetFileOptions);

  Papa.parse(selectedFile, {

    complete: results => {
      setDataPoints(results, select);
    }

  });

  // results = await fileParse(selectedFile);

  Status.Options.disable([stopBtn, clearBtn])

  Status.Options.show([selectGroup])

  Status.Options.enable([displayBtn])
  
  form.reset();
}

// displayBtn initiate's the loading state
displayBtn.onclick = () => {
  Status.onLoading(onLoadingOptions);

  Papa.parse(selectedFile, {
    worker: true,

    // Header: true,

    complete: results => {
      const removeUndefined = data => data.filter(element => element !== undefined && element != '');

      
      const headerColumn = results.data[0];
      
      const csvBody = results.data.slice(1)

      const bodyData = removeUndefined(csvBody)  

      // addToConfig -> settings for what algorithm to use
      displayMethod(headerColumn, csvBody)

      const algorithmConfig = {

      }
      
      // button state handling
      Status.Options.hide([selectGroup])
      Status.Options.disable([clearBtn, displayBtn, submitBtn, inputFile])
      Status.Options.enable([stopBtn, updateBtn])

      updateBtn.onclick = () => {
        onUpdate(headerColumn, csvBody)
        Status.Options.enable([downloadBtn]);
      }
    }

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

const onUpdate = (headerColumn, csvBody) => {

  // console.log(convertedBodyData)
  // console.log(quickSort(config))
  // let sorted = quickSort(config)
  // csv.summarize(results.data[0], sorted)
  let sorted = sortingAlgorithm(csvBody, select.selectedIndex);
  console.log(sorted)
  displayMethod(headerColumn, sorted)


          
  // test download button
  if(document.querySelector('.downloadBtn')) return;

  downloadBtn.onclick = () => {
    var html = document.querySelector("table").outerHTML;
    // console.log(results.data[0].join(","))
    // test(results.data[0],sorted, `Sorted-by-${select.value}-${firstFile.name}`, downloadCSVFile);

    test(headerColumn, sorted, `Sorted-by-${select.value}-${selectedFile.name}`, downloadCSVFile);
  } 
}