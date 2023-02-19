
import { selectionSort } from './js/functions/data-based-sorters/selectionSort.js';

import quickSort from './js/functions/data-based-sorters/quickSort.js';

import {mergeSort} from './js/functions/data-based-sorters/mergeSort.js';

import bubbleSort from './js/functions/data-based-sorters/bubbleSort.js';

import { recordType } from './js/factory-functions/fileContentRecord.js';

import { dataRecordersMap } from './js/maps/dataRecorderMaps.js';

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


    dataRecorder = Object.assign(
        dataRecordersMap(dataRecorder.fileName, 'v2'),
        dataRecorder
    )

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
        return null
    }

    dataRecorder = JSON.stringify(dataRecorder)

    postMessage(JSON.parse(dataRecorder));

    console.timeEnd('algorithm')
}