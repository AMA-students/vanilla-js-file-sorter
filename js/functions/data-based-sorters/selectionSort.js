import { alphanumericComparator, sortingMode, removeUndefined } from "../../classes/utility.js"

import { CSVRecorder } from "../../classes/FileRecorders.js"

import { CSVParser, fileParse } from "../../classes/CSVParser.js"

function selectionSort(arr, dataPointIndex, dataRecorder) {

  for (let i = 0; i < arr.length; i++) {

    // base lowest
    let lowest = i

    const option = { numeric: true, sensitivity: 'base' };
    const collator = new Intl.Collator(undefined, option);

    // for loop for determining the actual lowest
    for (let j = i + 1; j < arr.length; j++) {
    
    let currentValue, currentLowest;

    [currentValue, currentLowest] = sortingMode(
        arr[j],
        arr[lowest],
        dataPointIndex,
        dataRecorder
    );



    //   const [currentValue, currentLowest] = sortingMode(arr[j], arr[lowest], dataPointIndex);

    if(typeof(currentValue) === 'string' || typeof(currentLowest) === 'string') {

        if(alphanumericComparator(currentLowest, currentValue, collator)) {
          lowest = j
        }

            continue;
        }

        if ( currentValue < currentLowest ) {
            lowest = j
        }
    }

    
    if (lowest !== i) {
        // Swap
        [arr[i], arr[lowest]] = [arr[lowest], arr[i]]
    }
  }

  dataRecorder?.initializeSortedParsedFileContent()
  return arr
}

// console.log(selectionSort([3, 5, 1, 2])) // [1, 2, 3, 5]
const unsorted2 = [[45, 16],[23,42], [37, 3], [22,43]];

const unsorted3 = unsorted2.map(elem => elem[1]);

// console.log(selectionSort(unsorted2, 1));

if(true) {
    fileParse('./8.csv','\n').then(data => {

        data = removeUndefined(data)
    
        const dataRecorder = new CSVRecorder();
    
        let CSV = removeUndefined(CSVParser(data))
    
        dataRecorder.initializeFileContent(data.join('\n'))
    
        dataRecorder.initializeParsedFileContent(CSV)
    
        dataRecorder.initializeFileContentRecords()
    
        dataRecorder.initializeDatapointIndex(0)
    
        const array = [...dataRecorder.parsedFileContentBody];
    
        const dataPointIndex = 0;
    
        console.log(
            selectionSort(dataRecorder.fileContentRecords, dataPointIndex, dataRecorder)
        );
            
        dataRecorder.initializeSortedFileContent()

    });
}

export {
  selectionSort,
}