// import {alphanumericComparator, isValidNumberButWithCommaValidator} from "../../classes/utility.js";

import DataRecorder from "../../classes/DataRecorder.js";

import { alphanumericComparator, sortingMode, removeUndefined } from "../../classes/utility.js"

import { CSVRecorder } from "../../classes/FileRecorders.js"

import { CSVParser, fileParse } from "../../classes/CSVParser.js"

const bubbleSort = (array, dataPointIndex, dataRecorder) => {
    
    if (array.length <= 1) return array;

    let isAscending = true;

    let aux; 

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    for(let x = 0; x < array.length; x++) {
        
        for(let y = 0; y < array.length; y++) {

            const [currentX, currentY] = sortingMode(array[x], array[y], dataPointIndex, dataRecorder);

            const someString = typeof(currentY) === 'string' || typeof(currentX) === 'string';
             
            const comparison = {
                left: currentX, 
                right: currentY,
                comparison: false 
            }

            if(someString) {


                dataRecorder.comparisonHistoryRecorder(comparison)

                if(alphanumericComparator(currentY, currentX, collator)) {

                    comparison.comparison = true

                    aux = array[y]

                    array[y]?.moveHistoryRecorder(x)
                    array[y] = array[x]

                    array[x]?.moveHistoryRecorder(y)
                    array[x] = aux

                }
                continue;

            }

            // isAscending
            if(isAscending) {

                dataRecorder.comparisonHistoryRecorder(comparison)

                if( currentX < currentY ) {

                    comparison.comparison = true

                    aux = array[y]

                    array[y]?.moveHistoryRecorder(x)
                    array[y] = array[x]

                    array[x]?.moveHistoryRecorder(y)
                    array[x] = aux

                }
                continue;

            }

            // !isAscending
            if(isAscending) return;

            dataRecorder.comparisonHistoryRecorder(comparison)

            if( currentX < currentY ) {

                comparison.comparison = true

                aux = array[y]

                array[y]?.moveHistoryRecorder(x)
                array[y] = array[x]

                array[x]?.moveHistoryRecorder(y)
                array[x] = aux
              
            }


        }
    }

    dataRecorder?.initializeSortedParsedFileContent();
    console.log(dataRecorder);
    return array

}

const mode = (currentX, currentY, dataPointIndex) => {

    if(dataPointIndex == null) {

        return [
            currentX,
            currentY
        ] = isValidNumberButWithCommaValidator(currentX, currentY);
    }


    return [
        currentX,
        currentY
    ] = isValidNumberButWithCommaValidator(currentX[dataPointIndex], currentY[dataPointIndex]);
}

// const [arrayTest, basicTest, dementionalArrayTest] = false
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

export default bubbleSort;