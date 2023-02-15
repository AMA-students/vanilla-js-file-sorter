
import { selectionSort } from './js/functions/data-based-sorters/selectionSort.js';

import quickSort from './js/functions/data-based-sorters/quickSort.js';

import {mergeSort} from './js/functions/data-based-sorters/mergeSort.js';


import bubbleSort from './js/functions/data-based-sorters/bubbleSort.js';

import { CSVRecorder, JSONRecorder } from './js/classes/FileRecorders.js';

import { FileContentRecord } from "./js/classes/DataRecorder.js";

import { CSVDataRecorder } from './js/factory-functions/dataRecorder.js';
import { recordType } from './js/factory-functions/fileContentRecord.js';

// importScripts('./js/classes/FileRecorders.js');

const sortingAlgorithm = (algo, args) => {

    const algos = {
  
      quickSort: (...args) => quickSort(...args),
      bubbleSort: (...args) => bubbleSort(...args),
      mergeSort: (...args) => mergeSort(...args),
      selectionSort: (...args) => selectionSort(...args),
  
    }
  
    return algos[algo](...args)
  
};

onmessage = (message) => {
    
    const data = message.data;

    const {algorithmName, headerIndex, JSONdataRecorder} = data;
    
    let dataRecorder = JSON.parse(JSONdataRecorder);

    if(dataRecorder.type === "JSON") {
        dataRecorder.__proto__ = JSONRecorder.prototype;
    }
    else {
        // dataRecorder.__proto__ = CSVRecorder.prototype;

        dataRecorder = Object.assign(
            CSVDataRecorder(),
            dataRecorder
        )
    }

    // dataRecorder.fileContentRecords.forEach(record => {
    //     record.__proto__ = FileContentRecord.prototype;
    // })

    const fileType = dataRecorder.type;

    dataRecorder.fileContentRecords = dataRecorder.fileContentRecords.map(record => {
        return record = Object.assign(
            recordType[fileType](),
            record
        )
    })

    console.log(dataRecorder.fileContentRecords);
    console.time('algorithm')

    try {
        sortingAlgorithm(
            algorithmName, 
    
            [
                dataRecorder.fileContentRecords,
                headerIndex,
                dataRecorder
            ]
        )
    
    } catch (error) {
        console.log(error);    
        postMessage(null);
        return
    }

    dataRecorder = JSON.stringify(dataRecorder)

    postMessage(JSON.parse(dataRecorder));

    console.timeEnd('algorithm')
}