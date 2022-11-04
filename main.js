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
import mergeSortTest from './js/functions/algo/mergeSort.js';

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

const sortingAlgorithm = (algo, args) => {

  // const [dataBody, dataPointIndex] = args

  const algos = {

    quickSort: (...args) => quickSort(...args),
    bubbleSort: (...args) => bubbleSort(...args),
    mergeSortTest: (...args) => mergeSortTest(...args),

    test: (...args) => {
      console.log(...args)
    }
    
  }

  // return quickSort(...args)
  // return mergeSortTest(...args)
  // return bubbleSort(...args)

  return algos[algo](...args)

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
  Status.Options.disable([stopBtn, clearBtn, updateBtn, downloadBtn])
  // Status.Options.show([selectGroup])
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
      const dataBody = removeUndefined(csvBody)

      
      // addToConfig -> settings for what algorithm to use
      displayMethod(headerColumn, dataBody)

      const algorithmConfig = {

      }

      // let testStringToNum = arrayStringToNumber(dataBody, select.selectedIndex)
      // console.log(testStringToNum)
      // console.log(getRealValues(testStringToNum, select.selectedIndex).sort((a,b) => a - b))
      // console.log(getRealValues(testStringToNum, select.selectedIndex).filter(elem => elem < 1))
      
      // console.log(dataBody)
      // arrayToCsv(headerColumn, dataBody, `Sorted-by-${select.value}-${selectedFile.name}`, );

      // button state handling
      Status.Options.hide([selectGroup])
      Status.Options.disable([clearBtn, displayBtn, submitBtn, inputFile])
      Status.Options.enable([stopBtn, updateBtn])
      Status.Options.show([selectGroup])
      updateBtn.onclick = async () => {
        Status.Options.hide([selectGroup])
        Status.Options.disable([displayBtn, updateBtn]);
        onUpdate(headerColumn, dataBody)
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
  let sorted = sortingAlgorithm( 'quickSort',[dataBody, select.selectedIndex]);
  console.timeEnd('algorithm')
  console.log(sorted)
  displayMethod(headerColumn, sorted)
  setTimeout( () => {
    document.querySelectorAll(`table td:nth-child(${select.selectedIndex + 1})`).forEach( elem => {
      elem.classList.add('highlight');
    })
  }, 2000)
  // test download button
  if(document.querySelector('.downloadBtn')) return;

  downloadBtn.onclick = () => {

    var html = document.querySelector("table").outerHTML;
    // console.log(results.data[0].join(","))
    // arrayToCsv(results.data[0],sorted, `Sorted-by-${select.value}-${firstFile.name}`, downloadCSVFile);
    arrayToCsv(headerColumn, sorted, `Sorted-by-${select.value}-${selectedFile.name}`, downloadCSVFile);

  } 
  console.log(3);
}