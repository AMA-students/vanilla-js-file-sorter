import CSV from './js/classes/Csv.js';
import STATUS from './js/classes/Status.js';
import State from './js/classes/state.js';
import TableController from './js/classes/TableController.js';

/*============================={ algorithms }=============================*/

import { selectionSortCSV as selectionSort } from './js/functions/algo/selectionSort.js';
import quickSort from './js/functions/algo/quickSort.test copy.js';
import { mergeSortTest as mergeSort } from './js/functions/algo/mergeSort.js';
import bubbleSort from './js/functions/algo/bubbleSort.js';

/*============================={ side effect funtions }=============================*/

import setDataPoints from './js/functions/sideEffectes/setDataPoints.js';
import htmlToCSV, {arrayToCsv, downloadCSVFile } from './js/functions/sideEffectes/htmlToCSV.js';
 
/*============================={ parsers }=============================*/

import { CSVParsing, JSONParsing } from './js/parsingMethods.js';

const form = document.querySelector("#getfile");
const selectGroup = document.querySelector('#sort-select-group')
const sortingMethodGroup = document.querySelector('.settings-selection');
const select = document.querySelector('#select');
const table = document.querySelector('table')

/*============================={ class instances }=============================*/

const state = new State();
const csv = new CSV(table)
const tableController = new TableController(table);
const Status = new STATUS(document.querySelector('#status'));

/*============================={ buttons }=============================*/

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

import { removeUndefined } from './js/classes/utility.js';

const settingsCover = document.querySelector('#settings-cover');
const parsingMethods = document.querySelectorAll('input[name=parsing-method]');

/*============================={ initial state }=============================*/

const statusConfigOnInitial = {
  setStatusText: 'Choose your file',
  hide: [selectGroup],
  disable: [stopBtn, clearBtn, displayBtn, updateBtn, downloadBtn, submitBtn]
}

Status.setStatus(statusConfigOnInitial)

const sortingAlgorithm = (algo, args) => {

  const algos = {

    quickSort: (...args) => quickSort(...args),
    bubbleSort: (...args) => bubbleSort(...args),
    mergeSort: (...args) => mergeSort(...args),
    selectionSort: (...args) => selectionSort(...args),

    test: (...args) => {
      console.log(...args)
    }
    
  }

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

/*============================={ buttons on click }=============================*/

settingsBtn.onclick = () => {
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

const statusConfigOnSubmit = {
  disable: [stopBtn, updateBtn, downloadBtn, inputFile],
  enable: [displayBtn, clearBtn]
}

/*============================={ on submit state- }=============================*/

form.onsubmit = async e => {

  Status.Options.disable([submitBtn])
  
  if(!inputFile.files[0]) return;

  e.preventDefault();
  selectedFile = inputFile.files[0];

  if(!selectedFile) return;
  csv.clear();

  Status.setStatus({
    ...statusConfigOnSubmit,
    setStatusText: selectedFile.name
  });

  form.reset();

}

// displayBtn initiate's the loading state

const papaparseParse = () => {
  console.time('papaparse')

  if(!selectedFile) return;

  Papa.parse(selectedFile, {
    worker: true,
    // Header: true,

    complete: results => {

      const headerColumn = results.data[0];
      const csvBody = results.data.slice(1)
      const dataBody = removeUndefined(csvBody)

      // addToConfig -> settings for what algorithm to use
      displayMethod(headerColumn, dataBody)      
      setDataPoints(headerColumn, select)

      updateBtn.onclick = () => {
        onUpdate(headerColumn, dataBody)
      }

    }

  });
  console.timeEnd('papaparse')

};

const updateBtnWithoutClass = () => {
  Status.delegateOnclickEvent(
    {
      elements:[select, sortingMethodGroup],

      func: ()=>{
        const selectedSortingMethod = document.querySelector('input[name=sorting-method]:checked').value;
        const headerIndexToHighlight = select.selectedIndex
        tableController.headerHighlighter(headerIndexToHighlight)

        Status.setStatusText(
          `Sort {${select.value}} using {${selectedSortingMethod}}`
        )

      }

    }
  ) 
}

const updateBtnDisabledObserverConfig = {
  elements:[updateBtn],
  classToObserve: 'disabled',
  withClass: () => {
    Status.removeElementOnclickEvent([select, sortingMethodGroup])
  },
  withoutClass: () => {
    updateBtnWithoutClass()
  }
}
Status.delegateClassMutationObserver(updateBtnDisabledObserverConfig)

const statusConfigOnDisplay = {

  setStatusText: 'Loading...',
  show: [selectGroup],
  enable: [clearBtn, updateBtn],
  disable: [submitBtn, displayBtn, inputFile],
  restrictSettings: parsingMethods
}

const parseHandler = (parser, cb) => {
  if(!selectedFile) return;
  
  var reader = new FileReader();

  reader.readAsText(selectedFile)

  reader.onload = async function (e) {
    var data = e.target.result

    const [headerColumn, dataBody] = parser(data);    

    setDataPoints(headerColumn, select)
    displayMethod(headerColumn, dataBody)   

    updateBtn.onclick = () => {
      onUpdate(headerColumn, dataBody)
    }
  }
}

displayBtn.onclick = () => {
  const parsingMethod = document.querySelector('input[name=parsing-method]:checked').value;

  Status.setStatus(statusConfigOnDisplay);

  if(parsingMethod === "CSV") {

    parseHandler( 
      data => CSVParsing(data)
    )

  } else if (parsingMethod === "JSON") {
    
    parseHandler(
      data => JSONParsing(data)
    )

  } else {
    papaparseParse()
  }

}

const statusConfigOnClear = {

  setStatusText: "Choose your file",
  hide: [selectGroup],
  enable: [inputFile],
  disable: [clearBtn, stopBtn, updateBtn, downloadBtn, submitBtn, displayBtn],
  unrestrictSettings: parsingMethods

}

/*============================={ on clear }=============================*/

clearBtn.onclick = () => {

  if(document.querySelector('.downloadBtn')) {
    document.querySelector('.downloadBtn').remove()
  }

  csv.clear();
  Status.setStatus(statusConfigOnClear)
  select.innerHTML = '';
  
}

const statusConfigOnUpdate = {

  setStatusText: "sorting...",
  hide: [selectGroup],
  enable: [downloadBtn],
  disable: [displayBtn, updateBtn],

}

const onUpdate = (headerColumn, dataBody) => {
  // const algorithmName = 'quickSort'
  // let algorithmName;

  if(!document.querySelector('input[name=sorting-method]:checked')) {

    Status.setStatusText('Please select a sorting method from the settings first');
    return;
  }

  const algorithmName = document.querySelector('input[name=sorting-method]:checked').value;
  // const algorithmName = 'mergeSortTest'

  Status.setStatus(statusConfigOnUpdate)
  
  console.time('algorithm')
  let sorted = sortingAlgorithm( algorithmName,[dataBody, select.selectedIndex]);
  console.timeEnd('algorithm')
  console.log(sorted)
  displayMethod(headerColumn, sorted)

  Status.dynamicElementObserver(
    `table :nth-child(${select.selectedIndex + 1}):not(tr):not(thead)`,

    (sortedColumn, observer) => {

      sortedColumn.forEach( elem => {
        if(elem.tagName === 'TH') {
          elem.classList.add('outline');
          return;
        }
        elem.classList.add('highlight');
        elem.classList.add('outline');
      })
      observer.disconnect();
    }
  )
  

  // test download button
  if(document.querySelector('.downloadBtn')) return;

  downloadBtn.onclick = () => {

    var html = document.querySelector("table").outerHTML;
    arrayToCsv(headerColumn, sorted, `Sorted-by-${select.value}-${selectedFile.name}`, downloadCSVFile);

  } 

  console.log(3);
}