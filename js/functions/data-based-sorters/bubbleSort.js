import {alphanumericComparator, isValidNumberButWithCommaValidator} from "../../classes/utility.js";

import DataRecorder from "../../classes/DataRecorder.js";
const bubbleSort = (dataRecorder, dataPointIndex) => {

    const array = dataRecorder.parsedFileContentBody;
    
    if (array.length <= 1) return array;

    let isAscending = true;

    let aux; 

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    for(let x = 0; x < array.length; x++) {
        
        for(let y = 0; y < array.length; y++) {

            const [currentX, currentY] = mode(array[x], array[y], dataPointIndex);

            const someString = typeof(currentY) === 'string' || typeof(currentX) === 'string';
             
            const comparison = [x,y]

            if(someString) {


                dataRecorder.comparisonHistoryRecorder(comparison)

                if(alphanumericComparator(currentY, currentX, collator)) {

                    comparison.push(true)

                    aux = array[y]
                    array[y] = array[x]
                    array[x] = aux

                    aux = dataRecorder.fileContentRecords[y]

                    dataRecorder.fileContentRecords[y].moveHistoryRecorder(x)
                    dataRecorder.fileContentRecords[y] = dataRecorder.fileContentRecords[x]

                    dataRecorder.fileContentRecords[x].moveHistoryRecorder(y)
                    dataRecorder.fileContentRecords[x] = aux

                }
                continue;

            }

            // isAscending
            if(isAscending) {

                dataRecorder.comparisonHistoryRecorder(comparison)

                if( currentX < currentY ) {

                    comparison.push(true)

                    aux = array[y]
                    array[y] = array[x]
                    array[x] = aux

                    aux = dataRecorder.fileContentRecords[y]

                    dataRecorder.fileContentRecords[y].moveHistoryRecorder(x)
                    dataRecorder.fileContentRecords[y] = dataRecorder.fileContentRecords[x]

                    dataRecorder.fileContentRecords[x].moveHistoryRecorder(y)
                    dataRecorder.fileContentRecords[x] = aux
                }
                continue;

            }

            // !isAscending
            if(isAscending) return;

            dataRecorder.comparisonHistoryRecorder(comparison)

            if( currentX < currentY ) {

                comparison.push(true)

                aux = array[y]
                array[y] = array[x]
                array[x] = aux
              
                aux = dataRecorder.fileContentRecords[y]

                dataRecorder.fileContentRecords[y].moveHistoryRecorder(x)
                dataRecorder.fileContentRecords[y] = dataRecorder.fileContentRecords[x]

                dataRecorder.fileContentRecords[x].moveHistoryRecorder(y)
                dataRecorder.fileContentRecords[x] = aux
            }


        }
    }

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

export default bubbleSort;