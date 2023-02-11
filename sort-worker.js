
import { selectionSort } from './js/functions/data-based-sorters/selectionSort.js';

import quickSort from './js/functions/data-based-sorters/quickSort.js';

import {mergeSort} from './js/functions/data-based-sorters/mergeSort.js';


import bubbleSort from './js/functions/data-based-sorters/bubbleSort.js';

import { CSVRecorder } from './js/classes/FileRecorders.js';

import { FileContentRecord } from "./js/classes/DataRecorder.js";



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
    
    const dataRecorder = JSON.parse(JSONdataRecorder);

    dataRecorder.__proto__ = CSVRecorder.prototype;
    dataRecorder.fileContentRecords.forEach(record => {
        record.__proto__ = FileContentRecord.prototype;
    })

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

    postMessage(dataRecorder);

    console.timeEnd('algorithm')
}