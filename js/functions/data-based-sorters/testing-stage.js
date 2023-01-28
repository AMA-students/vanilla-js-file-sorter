import bubbleSort from "./bubbleSort.js";
import { selectionSort } from "./selectionSort.js";
import { mergeSort } from "./mergeSort.js";

import { removeUndefined } from "../../classes/utility.js"

import { CSVRecorder } from "../../classes/FileRecorders.js"

import { CSVParser, fileParse } from "../../classes/CSVParser.js"

const [arrayTest, basicTest, dementionalArrayTest] = [false, false, false]

const fileTest = true;

const sortingMethod = bubbleSort;

if(arrayTest) {
    
    const unsorted2 = [[45, 16],[23,42], [37, 3], [22,43]];

    const unsorted3 = unsorted2.map(elem => elem[1]);

    if(basicTest) {
        console.log(sortingMethod([3, 5, 1, 2])) // [1, 2, 3, 5]
        console.log(sortingMethod(unsorted3));
    }

    
    
    if(dementionalArrayTest) {
        console.log(sortingMethod(unsorted2, 0));
        console.log(sortingMethod(unsorted2, 1));
    }

}

if(fileTest) {
    fileParse('./8.csv','\n').then(data => {

        data = removeUndefined(data)
    
        const dataRecorder = new CSVRecorder();
    
        let CSV = removeUndefined(CSVParser(data))
    
        dataRecorder.initializeFileContent(data.join('\n'))
    
        dataRecorder.initializeParsedFileContent(CSV)
    
        dataRecorder.initializeFileContentRecords()
    
        dataRecorder.initializeDatapointIndex(0)
    
        const dataPointIndex = 0;
    
        console.log(
            sortingMethod(dataRecorder.fileContentRecords, dataPointIndex, dataRecorder)
        );
            
        dataRecorder.initializeSortedFileContent()

    });
}