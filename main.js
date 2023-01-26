import CSV from './js/classes/Csv.js';
import STATUS from './js/classes/Status.js';
import State from './js/classes/state.js';
import TableController from './js/classes/TableController.js';
import DataRecorder from './js/classes/DataRecorder.js';
import { CSVRecorder } from './js/classes/FileRecorders.js';

// import {scaleLinear} from "https://cdn.skypack.dev/d3-scale@4";
// import {max} from "https://cdn.skypack.dev/d3-array@3";

/*============================={ algorithms }=============================*/

import { selectionSortCSV as selectionSort } from './js/functions/algo/selectionSort.js';
import quickSort from './js/functions/algo/quickSort.test copy.js';
// import { mergeSort } from './js/functions/algo/mergeSort.js';
import {mergeSort} from './js/functions/data-based-sorters/mergeSort.js';

// import bubbleSort from './js/functions/algo/bubbleSort.js';
import bubbleSort from './js/functions/data-based-sorters/bubbleSort.js';

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

import { removeUndefined, arrayOrderMapper } from './js/classes/utility.js';

const settingsCover = document.querySelector('#settings-cover');
const parsingMethods = document.querySelectorAll('input[name=parsing-method]');
const sortingAlgorithms =  document.querySelectorAll('input[name=sorting-method]')

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
    // mergeSort: (...args) => mergeSort(...args),
    mergeSort: (...args) => {
      const [dataRecorder, dataPointIndex] = args

      // mergeSort(...args)
      return mergeSort(
        dataRecorder.fileContentRecords,
        dataPointIndex,
        dataRecorder
      )
    },

    selectionSort: (...args) => selectionSort(...args),

  }

  return algos[algo](...args)

};

const parsingMethodSelector = (method, cb) => {

  const methods = {
    CSV: () => {
      parseHandler(data => CSVParsing(data), cb)
    },
    JSON: () => {
      parseHandler(data => JSONParsing(data), cb)
    },
    papaparse: () => {
      if(!selectedFile) return;
  
      var reader = new FileReader();

      reader.readAsText(selectedFile)

      reader.onload = async function (e) {
        var data = e.target.result
        
        // const dataRecorder = new DataRecorder()
        // dataRecorder.setFileContent(data)
        // dataRecorder.fileContentSplitter('\n')

        const dataRecorder = new CSVRecorder()
        dataRecorder.initializeFileContent(data)

        papaparseParse(dataRecorder, cb)
      }

    }
  }

  return methods[method]()

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

  settingsCover.classList.toggle('hidden')

}

// displayBtn initiate's the loading state

const papaparseParse = (dataRecorder, cb) => {
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

      dataRecorder.initializeParsedFileContent(results.data)

      cb(dataRecorder)

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
  console.log(selectedFile);
  reader.onload = async function (e) {
    var data = e.target.result

    // const  dataRecorder = new DataRecorder();
    // dataRecorder.setFileContent(data)
    // dataRecorder.fileContentSplitter('\n');

    const dataRecorder = new CSVRecorder();

    dataRecorder.initializeFileContent(data)

    const [headerColumn, dataBody] = parser(dataRecorder);

    // dataRecorder.setParsedFileContent([headerColumn, ...dataBody])

    dataRecorder.initializeParsedFileContent([headerColumn, ...dataBody])

    console.log(dataRecorder);
    setDataPoints(headerColumn, select)
    displayMethod(headerColumn, dataBody)  

    cb(dataRecorder)
  }
}

displayBtn.onclick = () => {
  const parsingMethod = document.querySelector('input[name=parsing-method]:checked').value;

  Status.setStatus(statusConfigOnDisplay);

  parsingMethodSelector(parsingMethod, (dataRecorder) => {

    updateBtn.onclick = () => {

      onUpdate(dataRecorder)

    }

  })
}

const statusConfigOnClear = {

  setStatusText: "Choose your file",
  hide: [selectGroup],
  enable: [inputFile],
  disable: [clearBtn, stopBtn, updateBtn, downloadBtn, submitBtn, displayBtn],
  unrestrictSettings: [...parsingMethods, ...sortingAlgorithms]

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

const onUpdate = (dataRecorder) => {

  const data = dataRecorder.fileContent;

  const dataBody = [...dataRecorder.parsedFileContentBody];

  console.log(dataBody);

  const headerColumn = dataRecorder.parsedFileContentHeader;

  dataRecorder.initializeFileContentRecords()

  dataRecorder.initializeDatapointIndex(select.selectedIndex)

  if(!document.querySelector('input[name=sorting-method]:checked')) {

    Status.setStatusText('Please select a sorting method from the settings first');
    return;
  }

  const algorithmName = document.querySelector('input[name=sorting-method]:checked').value;
  console.log(dataBody);
  const columnToSort = dataBody.map(row => row[select.selectedIndex])

  Status.setStatus({
    ...statusConfigOnUpdate,
    restrictSettings: sortingAlgorithms
  })
  
  console.time('algorithm')
  let sorted = sortingAlgorithm( algorithmName, [dataRecorder, select.selectedIndex]);
  console.timeEnd('algorithm')

  console.log(sorted); // should be a sorted parsedFileContentBody

  if(dataRecorder.fileContentRecords.length < 1) {
   dataRecorder.fileContentRecords = sorted;
   sorted = sorted.map(records => records.parsedFileContentLine)
  }

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

      setTimeout(()=>{
        observer.disconnect();
      },5000)

    }
  )

  const sortedData = dataRecorder.fileContentRecords.map(record => {
    return record.fileContentLine;
  })
  
  dataRecorder.initializeSortedFileContent();
  
  const  sortedFileContent = arrayOrderMapper(columnToSort, [dataRecorder.fileContentHeader,...sortedData]).organized;

  console.log(dataRecorder);
  downloadBtn.onclick = () => {
    // downloadCSVFile(sortedFileContent.join("\n"), `Sorted-by-${select.value}-${selectedFile.name}`)
    downloadCSVFile(sortedFileContent.join("\n"), `Sorted-by-${select.value}-${selectedFile.name}`)
  }

}