import CSV from './js/classes/Csv.js';
import STATUS from './js/classes/Status.js';
import TableController from './js/classes/TableController.js';
import { CSVRecorder, dataRecorderSetter } from './js/classes/FileRecorders.js';
import { FileContentRecord } from './js/classes/DataRecorder.js';

import { CSVDataRecorder } from './js/factory-functions/dataRecorder.js';
import { CSVFileRecord } from './js/factory-functions/fileContentRecord.js';
/*============================={ algorithms }=============================*/

import { selectionSort } from './js/functions/data-based-sorters/selectionSort.js';


import quickSort from './js/functions/data-based-sorters/quickSort.js';

import {mergeSort} from './js/functions/data-based-sorters/mergeSort.js';


import bubbleSort from './js/functions/data-based-sorters/bubbleSort.js';

/*============================={ side effect funtions }=============================*/

import setDataPoints from './js/functions/sideEffectes/setDataPoints.js';
import { downloadCSVFile } from './js/functions/sideEffectes/htmlToCSV.js';

/*============================={ parsers }=============================*/

import { CSVParsing, JSONParsing } from './js/parsingMethods.js';

const form = document.querySelector("#getfile");
const selectGroup = document.querySelector('#sort-select-group')
const sortingMethodGroup = document.querySelector('.settings-selection');
const select = document.querySelector('#select');
const table = document.querySelector('table')

/*============================={ class instances }=============================*/

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
    mergeSort: (...args) => mergeSort(...args),
    // mergeSort: (...args) => {
    //   const [dataRecorder, dataPointIndex] = args

    //   // mergeSort(...args)
    //   return mergeSort(
    //     dataRecorder.fileContentRecords,
    //     dataPointIndex,
    //     dataRecorder
    //   )
    // },

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
let headerIndex = 0;

const updateBtnWithoutClass = () => {
  Status.dynamicElementObserver(
    `thead th`,
    headerColumns =>{
      headerColumns.forEach(column => {
        column.classList.add('header-clickable')
      })

      delegateClickEvent(headerColumns)
    },
    500
  )

  function delegateClickEvent(headerColumns) {
    Status.delegateOnclickEvent(
      {
        elements:[select, sortingMethodGroup,...headerColumns],

        func: (e)=>{
          
          if(updateClicked === true) return;

          const selectedSortingMethod = document.querySelector('input[name=sorting-method]:checked').value;

          if(e.target.tagName === 'TH') {
            headerIndex = Array.from(headerColumns).indexOf(e.target)
          }
          tableController.headerHighlighter(headerIndex)

          Status.setStatusText(
            `Sort {${select[headerIndex].value}} using {${selectedSortingMethod}}`
          )

        }

      }
    ) 
  }
  
}
let updateClicked = false;

const updateBtnDisabledObserverConfig = {
  elements:[updateBtn],
  classToObserve: 'disabled',
  withClass: () => {

    Status.dynamicElementObserver(
      `thead th`,
      (headerColumns)=>{
        Status.removeElementOnclickEvent([select, sortingMethodGroup, ...headerColumns])
      },
      1000
    )
  },
  withoutClass: () => {

    updateClicked = false;
    
    updateBtnWithoutClass()
  }
}
Status.delegateClassMutationObserver(updateBtnDisabledObserverConfig)

const statusConfigOnDisplay = {

  setStatusText: 'Loading...',
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

    // const dataRecorder = new CSVRecorder();
    // const dataRecorder = dataRecorderSetter(selectedFile.name);
    const dataRecorder = CSVDataRecorder();


    dataRecorder.initializeFileContent(data)
    console.log(dataRecorder);
    const [headerColumn, dataBody] = parser(dataRecorder);

    if(dataRecorder.type === 'JSON') {
      console.log('JSON test');
      dataRecorder.initializeParsedFileContent(headerColumn, dataBody, (err) => {
        console.log(err);
        Status.setStatusText('failed to parse the JSON file. Make sure that it is a JSON array file')
      })  
    } 
    else {
      dataRecorder.initializeParsedFileContent([headerColumn, ...dataBody])
    }
    
    console.log(dataRecorder);
    setDataPoints(headerColumn, select)
    displayMethod(headerColumn, dataBody)  

    cb(dataRecorder)
  }
}

/*============================={ on display state }=============================*/

displayBtn.onclick = () => {
  const parsingMethod = document.querySelector('input[name=parsing-method]:checked').value;

  Status.setStatus(statusConfigOnDisplay);

  parsingMethodSelector(parsingMethod, (dataRecorder) => {

    /*============================={ on update state }=============================*/

    updateBtn.onclick = () => {

      updateClicked = true;

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

  // const dataBody = [...dataRecorder.parsedFileContentBody];

  const headerColumn = dataRecorder.parsedFileContentHeader;

  dataRecorder.initializeFileContentRecords()

  dataRecorder.initializeDatapointIndex(headerIndex)

  if(!document.querySelector('input[name=sorting-method]:checked')) {

    Status.setStatusText('Please select a sorting method from the settings first');
    return;
  }

  const algorithmName = document.querySelector('input[name=sorting-method]:checked').value;

  // const columnToSort = dataBody.map(row => row[select.selectedIndex])

  Status.setStatus({
    ...statusConfigOnUpdate,
    restrictSettings: sortingAlgorithms
  })
  
  const sortWorker = new Worker('./sort-worker.js', {type: 'module'});

  sortWorker.postMessage(
    {
      algorithmName: algorithmName,
      headerIndex: headerIndex,
      JSONdataRecorder: JSON.stringify(dataRecorder)
    }
  )
  
  const finalHeaderIndex = headerIndex;
  sortWorker.onmessage = function(message) {

    if(message.data === null) {
      csv.clear();
      Status.setStatus({
        ...statusConfigOnClear,
        setStatusText: `The ${algorithmName} failed to sort your data. Choose another file or a different algorithm`
      })
      select.innerHTML = '';

      return;
    }

    dataRecorder = message.data;

    console.log(dataRecorder);

    dataRecorder = Object.assign(
      CSVDataRecorder(),
      dataRecorder
    )

    dataRecorder.fileContentRecords.forEach(record => {
      // record.__proto__ = FileContentRecord.prototype;
      record = Object.assign(
        CSVFileRecord(),
        record
      )

    })
    console.log(dataRecorder.fileContentRecords[0]);

    dataRecorder.initializeSortedFileContent()
    dataRecorder.initializeSortedParsedFileContent()

    Status.setStatusText('displaying ...')
    displayMethod(headerColumn, dataRecorder.sortedParsedFileContent.slice(1))

    Status.dynamicElementObserver(
      `table :nth-child(${finalHeaderIndex + 1}):not(tr):not(thead)`,
      sortedColumn => {

        sortedColumn.forEach( elem => {
          if(elem.tagName === 'TH') {
            elem.classList.add('outline');
            return;
          }
          elem.classList.add('highlight');
          elem.classList.add('outline');
        })
      }, 5000
    )

    downloadBtn.onclick = () => {
      if(dataRecorder.type === "JSON") {
        downloadCSVFile(dataRecorder.sortedFileContent.join("\n"), `Sorted-by-${select[headerIndex].value}-${selectedFile.name}`)
      }
      console.log(dataRecorder);
      downloadCSVFile(dataRecorder.sortedFileContent.join("\n"), `Sorted-by-${select[headerIndex].value}-${selectedFile.name}`)
    }

  }
}