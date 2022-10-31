import CSV from './js/classes/Csv.js';
import STATUS from './js/classes/Status.js';
import State from './js/classes/state.js';

// algorithms
// import quickSort from './js/functions/algo/quickSort.test.js';
import quickSort from './js/functions/algo/quickSort.test copy.js';
import bubbleSort from './js/functions/algo/bubbleSort.js';

// side effect funtions
import setDataPoints from './js/functions/sideEffectes/setDataPoints.js';
import htmlToCSV, {arrayToCsv, downloadCSVFile } from './js/functions/sideEffectes/htmlToCSV.js';

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
  stopBtn,
  clearBtn,
  inputFile,
  submitBtn,
  updateBtn,
  displayBtn,
  settingsBtn,
  downloadBtn,
} from './js/buttons.js';

import { 
  testParser, 
  getRealValues, 
  removeUndefined, 
  arrayStringToNumber, 
} from './js/classes/utility.js';

const modal = document.querySelector('.modal');

const settingsCover = document.querySelector('#settings-cover');

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
  // return bubbleSort(...args)
};

// addToConfig -> settings for the maximum limit before non summarized display
const MAX_ELEMENT_LIMIT = 10000

const displayMethod = (...args) => {
  if(args[1].length > MAX_ELEMENT_LIMIT) {
    csv.onSummarize(...args)
    return
  }

  csv.onDisplay(...args)
}

let selectedFile;

// buttons on click

settingsBtn.onclick = () => {
  // modal.classList.toggle('hidden')
  settingsCover.classList.toggle('hidden')
}

settingsCover.onclick = (e) => {

  if(e.target.id !== "settings-cover") return;
  settingsCover.classList.toggle('hidden')
  
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

      const headerColumn = results.data[0];
      const csvBody = results.data.slice(1)
      const bodyData = removeUndefined(csvBody)

      // addToConfig -> settings for what algorithm to use
      displayMethod(headerColumn, bodyData)

      const algorithmConfig = {

      }

      let testStringToNum = arrayStringToNumber(bodyData, select.selectedIndex)
      console.log(testStringToNum)
      console.log(getRealValues(testStringToNum, select.selectedIndex))
      
      // button state handling
      Status.Options.hide([selectGroup])
      Status.Options.disable([clearBtn, displayBtn, submitBtn, inputFile])
      Status.Options.enable([stopBtn, updateBtn])

      updateBtn.onclick = () => {
        onUpdate(headerColumn, bodyData)
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
  Status.Options.disable([clearBtn, stopBtn, updateBtn, downloadBtn])
  select.innerHTML = '';

}

const onUpdate = (headerColumn, dataBody) => {

  // console.log(converteddataBody)
  // console.log(quickSort(config))
  // let sorted = quickSort(config)
  // csv.summarize(results.data[0], sorted)
  console.time('algorithm')
  let sorted = sortingAlgorithm(dataBody, select.selectedIndex);
  console.timeEnd('algorithm')
  // console.log(sorted)
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