import bubbleSort from "./bubbleSort.js";
import { selectionSort } from "./selectionSort.js";
import { mergeSort } from "./mergeSort.js";
import quickSort from "./quickSort.js";

import { removeUndefined } from "../../classes/utility.js"

import { CSVRecorder } from "../../classes/FileRecorders.js"

import { CSVParser, fileParse } from "../../classes/CSVParser.js"

let [arrayTest, basicTest, dementionalArrayTest] = [false, false, false]
let fileTest = true;

[arrayTest, basicTest, dementionalArrayTest] = [true, true, true]
fileTest = false;

[arrayTest, basicTest, dementionalArrayTest] = [false, false, false]
fileTest = false;

const sortingMethod = mergeSort;

if(arrayTest) {
    
    const unsorted2 = [[45, 16],[23,42], [37, 3], [22,43]];

    const unsorted3 = unsorted2.map(elem => elem[1]);

    const unsorted4 = [3, 3, 9, 43, 21, 54, '123a', 'xcv', 'a123', 12, '123b', 'a123','12a',13,'12b','b12',,"", 4.2, 43]

    if(basicTest) {
        console.log(
            `initial: ${[3, 5, 1, 2]}`,
            `sorted: ${sortingMethod([3, 5, 1, 2])}`
        ) // [1, 2, 3, 5]

        console.log(
            `initial: ${[...unsorted3]}`,
            `sorted: ${sortingMethod([...unsorted3])}`
        );

        console.log(
            "initial", [...unsorted4],
            "sorted", sortingMethod([...unsorted4])
        );
    }
    
    if(dementionalArrayTest) {
        console.table(
            {
                initial: [...unsorted2],
                sorted: sortingMethod([...unsorted2], 0)
            }
            
        );

        console.table(
            {
                initial: [...unsorted2],
                sorted: sortingMethod([...unsorted2], 1)
            }
        );

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
        
        const dataBody = [...dataRecorder.fileContentRecords]

        console.log(
            sortingMethod(dataRecorder.fileContentRecords, dataPointIndex, dataRecorder)
        );

        console.log(dataRecorder);
            
        dataRecorder.initializeSortedFileContent()
        dataRecorder.initializeSortedParsedFileContent()

        console.log(dataRecorder.sortedParsedFileContent, dataRecorder.sortedFileContent);

    });
}