import CSV from './js/classes/Csv.js';
import STATUS from './js/classes/Status.js';
import State from './js/classes/state.js';

// algorithms
import quickSort from './js/functions/algo/quickSort.test copy.js';
import mergeSortTest from './js/functions/algo/mergeSort.js';
import bubbleSort from './js/functions/algo/bubbleSort.js';

// side effect funtions
import setDataPoints from './js/functions/sideEffectes/setDataPoints.js';
import htmlToCSV, {arrayToCsv, downloadCSVFile } from './js/functions/sideEffectes/htmlToCSV.js';

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

// initial state
const statusConfigOnInitial = {
  setStatusText: 'Choose your file',
  hide: [selectGroup],
  disable: [stopBtn, clearBtn, displayBtn, updateBtn, downloadBtn, submitBtn]
}

Status.setStatus(statusConfigOnInitial)
// Status.Options.hide([selectGroup]);
// Status.Options.disable([stopBtn, clearBtn, displayBtn, updateBtn, downloadBtn, submitBtn]);

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

inputFile.addEventListener('change', (e)=> {
  console.log(e.target.value, e.target.value === "")
  if(e.target.value === '') {
    console.log('yeet')
    Status.Options.disable([submitBtn])
    return;
  }

  Status.Options.enable([submitBtn])
})

// on submit state
form.onsubmit = async e => {

  Status.Options.disable([submitBtn])
  
  if(!inputFile.files[0]) return;

  e.preventDefault();
  selectedFile = inputFile.files[0];
  if(!selectedFile) return;
  csv.clear();

  Papa.parse(selectedFile, {

    complete: results => {
      setDataPoints(results, select);
    }

  });

  Status.setStatus({
    ...onSubmitStatusConfig,
    setStatusText: selectedFile.name
  });

  form.reset();

}

const onDisplayStatusConfig = {

  setStatusText: 'Loading...',
  show: [selectGroup],
  hide: [selectGroup],
  enable: [stopBtn, updateBtn],
  disable: [clearBtn, displayBtn, submitBtn, inputFile],

}

// displayBtn initiate's the loading state
displayBtn.onclick = () => {

  if(!selectedFile) return;

  Status.setStatus(onDisplayStatusConfig);

  Papa.parse(selectedFile, {
    worker: true,
    // Header: true,
    complete: results => {

      const headerColumn = results.data[0];
      const csvBody = results.data.slice(1)
      const dataBody = removeUndefined(csvBody)

      // addToConfig -> settings for what algorithm to use
      displayMethod(headerColumn, dataBody)

      const statusConfigOnUpdate = {

        setStatusText: "sorting...",
        hide: [selectGroup],
        enable: [downloadBtn],
        disable: [displayBtn, updateBtn],

      }

      updateBtn.onclick = () => {
        onUpdate(headerColumn, dataBody)
        Status.setStatus(statusConfigOnUpdate)
      }

    }

  });

};

const statusConfigOnClear = {
  setStatusText: "Choose your file",
  hide: [selectGroup],
  disable: [clearBtn, stopBtn, updateBtn, downloadBtn],
}

// on clear
clearBtn.onclick = () => {

  if(document.querySelector('.downloadBtn')) {
    document.querySelector('.downloadBtn').remove()
  }

  csv.clear();
  Status.setStatus(statusConfigOnClear)
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
    document.querySelectorAll(`table :nth-child(${select.selectedIndex + 1}):not(tr):not(thead)`).forEach( elem => {
      if(elem.tagName === 'TH') {
        elem.classList.add('outline');
        return;
      }
      elem.classList.add('highlight');
      elem.classList.add('outline');
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