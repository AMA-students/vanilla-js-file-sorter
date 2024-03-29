import CSV from './js/classes/Csv.js';
import STATUS from './js/classes/Status.js';
import TableController from './js/classes/TableController.js';

/*============================={ side effect funtions }=============================*/

import setDataPoints from './js/functions/sideEffectes/setDataPoints.js';
import { downloadCSVFile } from './js/functions/sideEffectes/htmlToCSV.js';


const form = document.querySelector("#getfile");
const selectGroup = document.querySelector('#sort-select-group')
const sortingMethodGroup = document.querySelector('.settings-selection');
const select = document.querySelector('#select');
const table = document.querySelector('table')

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

/*============================={ dataRecorder maps }=============================*/

import { dataRecordersMap } from './js/maps/dataRecorderMaps.js';
import { recordType } from './js/factory-functions/fileContentRecord.js';

/*============================={ class instances }=============================*/

const csv = new CSV(table)
const tableController = new TableController(table);
const Status = new STATUS(document.querySelector('#status'));

/*============================={ settings }=============================*/

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

  if(e.target.value === '') {
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

const parseHandler = (cb) => {
  if(!selectedFile) return;
  
  var reader = new FileReader();

  reader.readAsText(selectedFile)

  reader.onload = async function (e) {
    var data = e.target.result

    const dataRecorder = dataRecordersMap(selectedFile.name, 'v2');
    dataRecorder.fileName = selectedFile.name;
    dataRecorder.initializeFileContent(data)

    dataRecorder.initializeParsedFileContent()

    setDataPoints(dataRecorder.parsedFileContentHeader, select)
    displayMethod(dataRecorder.parsedFileContentHeader, dataRecorder.parsedFileContentBody) 
    cb(dataRecorder)
  }
}

/*============================={ on display state }=============================*/

displayBtn.onclick = () => {

  Status.setStatus(statusConfigOnDisplay);

  /*============================={ on update state }=============================*/
  parseHandler(dataRecorder => {
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

  const headerColumn = dataRecorder.parsedFileContentHeader;

  dataRecorder.initializeFileContentRecords()

  dataRecorder.initializeDatapointIndex(headerIndex)

  if(!document.querySelector('input[name=sorting-method]:checked')) {

    Status.setStatusText('Please select a sorting method from the settings first');
    return;
  }

  const algorithmName = document.querySelector('input[name=sorting-method]:checked').value;

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

    dataRecorder = Object.assign(
      dataRecordersMap(dataRecorder.fileName, 'v2'),
      dataRecorder
    )

    const fileType = dataRecorder.type;
    dataRecorder.fileContentRecords.forEach(record => {
      record = Object.assign(
        recordType[fileType](),
        record
      )

    })
    
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
      downloadCSVFile(dataRecorder.sortedFileContent.join("\n"), `Sorted-by-${select[headerIndex].value}-${selectedFile.name}`)
    }

  }
}