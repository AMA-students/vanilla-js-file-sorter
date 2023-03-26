
// import { selectionSort } from './js/functions/data-based-sorters/selectionSort.js';

// import quickSort from './js/functions/data-based-sorters/quickSort.js';



import bubbleSort from '../js/functions/data-based-sorters/bubbleSort.js';

import { mergeSort } from "../js/functions/data-based-sorters/mergeSort.js";

import { CSVRecorder } from '../js/classes/FileRecorders.js';

import DataRecorder, { FileContentRecord } from "../js/classes/DataRecorder.js";


import { CSVDataRecorder } from '../js/factory-functions/dataRecorder.js';
import { recordType } from '../js/factory-functions/fileContentRecord.js';

onmessage = (worker) => {
    
    console.log('test');
    let data = worker.data;

    data[1] = JSON.parse(data[1]);

    // data[1].__proto__ = CSVRecorder.prototype;
    // console.log(DataRecorder.prototype);

    data[1] = Object.assign(
        CSVDataRecorder(),
        data[1]
    )

    const fileType = data[1].type;
    data[1].fileContentRecords = data[1].fileContentRecords.map(record => {
        return record = Object.assign(
            recordType[fileType](),
            record
        )
    })

    data = [data[1].fileContentRecords, ...data]

    console.log(data);

    // console.log(mergeSort(...data));
    // console.log(bubbleSort(...data));
}